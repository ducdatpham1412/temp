using System.Collections.Concurrent;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


public static class ApiManager {
    private static HttpClient Client = new() {
        // BaseAddress = new Uri("http://localhost:8000")
    };
    private static string BaseAddress = "http://localhost:8000/api/v1";
    private static ConcurrentQueue<TaskCompletionSource<string>> taskQueue = new ConcurrentQueue<TaskCompletionSource<string>>();
    private static bool isRefreshing = false;

    static ApiManager() {
        Client.DefaultRequestHeaders.Accept.Clear();
        Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "");
    }


    public static string AppendQueryParameters(string url, Dictionary<string, string>? parameters) {
        if (parameters == null) {
            return url;
        }

        var uriBuilder = new UriBuilder(url);
        var query = System.Web.HttpUtility.ParseQueryString(uriBuilder.Query);

        foreach (var param in parameters) {
            query[param.Key] = param.Value;
        }

        uriBuilder.Query = query.ToString();
        return uriBuilder.ToString();
    }

    private static async Task<JObject> HandleError(HttpResponseMessage res, Task<JObject> PendingTask, bool isRetried) {
        string strError = await res.Content.ReadAsStringAsync();
        JObject errObject = JObject.Parse(strError);
        string errMsg = errObject["error_msg"].ToString();


        if (errMsg == "token_expired" && !isRetried) {
            if (isRefreshing) {
                var tcs = new TaskCompletionSource<string>();
                taskQueue.Enqueue(tcs);
                await tcs.Task;
                return await PendingTask;
            }

            isRefreshing = true;
            string refreshToken = "refresh_token";
            Client.DefaultRequestHeaders.Remove("Authorization");
            try {
                JObject refreshRes = await POST(
                path: "/auth/refresh-token",
                data: new Dictionary<string, object> { { "refresh", refreshToken } }, isRetried: true
            );
                string newToken = refreshRes["access"].ToString();
                Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", newToken);

                // TODO: Save new token to storage

                while (!taskQueue.IsEmpty) {
                    if (taskQueue.TryDequeue(out var tcs)) {
                        tcs.SetResult("Done");
                    }
                }

                return await PendingTask;
            }
            catch (Exception ex) {
                if (ex.Message == "token_blacklisted") {
                    JObject resLogin = await POST("/auth/login", data: new Dictionary<string, object> { { "device_id", "-----" } });

                    string token = resLogin["token"].ToString();
                    string refresh_token = resLogin["refresh_token"].ToString();
                    // TODO: Save to storage
                    Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    while (!taskQueue.IsEmpty) {
                        if (taskQueue.TryDequeue(out var tcs)) {
                            tcs.SetResult("Done");
                        }
                    }

                    return await PendingTask;
                }
                else {
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
        else {
            throw new InvalidOperationException(errMsg);
        }
    }

    public static async Task<JObject> GET(
        string path,
        Dictionary<string, string>? parameters = null,
        bool isRetried = false
    ) {
        string url = AppendQueryParameters($"{BaseAddress}{path}", parameters);
        HttpResponseMessage res = await Client.GetAsync(url);

        if (!res.IsSuccessStatusCode) {
            return await HandleError(
                res,
                PendingTask: GET(path, parameters, isRetried: true),
                isRetried
            );
        }

        string strContent = await res.Content.ReadAsStringAsync();
        JObject jsonObject = JObject.Parse(strContent);
        return JObject.Parse(jsonObject["data"].ToString());
    }


    public static async Task<JObject> POST(
        string path,
        Dictionary<string, object>? data = null,
        Dictionary<string, string>? parameters = null,
        bool isRetried = false
    ) {
        string url = AppendQueryParameters($"{BaseAddress}{path}", parameters);
        HttpContent? content = null;
        if (data != null) {
            var json = JsonConvert.SerializeObject(data);
            content = new StringContent(json, Encoding.UTF8, "application/json");
        }
        HttpResponseMessage res = await Client.PostAsync(url, content);

        if (!res.IsSuccessStatusCode) {
            return await HandleError(
                res,
                PendingTask: POST(path, data, parameters, isRetried: true),
                isRetried
            );
        }

        string strContent = await res.Content.ReadAsStringAsync();
        JObject jsonObject = JObject.Parse(strContent);
        return JObject.Parse(jsonObject["data"].ToString());
    }


    public static async Task<JObject> PUT(
        string path,
        Dictionary<string, string>? data = null,
        Dictionary<string, string>? parameters = null,
        bool isRetried = false
    ) {
        string url = AppendQueryParameters($"{BaseAddress}{path}", parameters);
        HttpContent? content = null;
        if (data != null) {
            var json = JsonConvert.SerializeObject(data);
            content = new StringContent(json, Encoding.UTF8, "application/json");
        }
        HttpResponseMessage res = await Client.PutAsync(url, content);

        if (!res.IsSuccessStatusCode) {
            return await HandleError(
                res,
                PendingTask: PUT(path, data, parameters, isRetried: true),
                isRetried
            );
        }

        string strContent = await res.Content.ReadAsStringAsync();
        JObject jsonObject = JObject.Parse(strContent);
        return JObject.Parse(jsonObject["data"].ToString());
    }


    public static async Task<JObject> DELETE(
       string path,
       Dictionary<string, string>? parameters = null,
       bool isRetried = false
   ) {
        string url = AppendQueryParameters($"{BaseAddress}{path}", parameters);
        HttpResponseMessage res = await Client.DeleteAsync(url);

        if (!res.IsSuccessStatusCode) {
            return await HandleError(
                res,
                PendingTask: DELETE(path, parameters, isRetried: true),
                isRetried
            );
        }

        string strContent = await res.Content.ReadAsStringAsync();
        JObject jsonObject = JObject.Parse(strContent);
        return JObject.Parse(jsonObject["data"].ToString());
    }
}