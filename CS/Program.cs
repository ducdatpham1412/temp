// using System.Diagnostics;
// using System.Net.Http.Headers;
// using Newtonsoft.Json;
// using Newtonsoft.Json.Linq;
// using Newtonsoft.Json.Linq;

// class Program {
//     public class Response {
//         public bool success;
//         public object data;
//     }


//     public static void Main(string[] args) {
//         Check();
//     }

//     static async void Check() {
//         Console.Write(0);
//         Response res = await ApiManager.GET<Response>("/common/resource");
//     }
// }

// JObject res = await ApiManager.GET("/common/resource");
// Console.Write(res);


using System;
using System.Diagnostics;
using System.Threading.Tasks;

// public class Program {
//     public static async Task Main(string[] args) {
//         // Simulate creating a task
//         Task taskToWait = PerformTaskAsync();

//         // Pass the task to the HandleError function
//         await HandleError(taskToWait);

//         Console.WriteLine("Mission completed!");
//     }

//     // Function to simulate a task
//     private static async Task PerformTaskAsync() {
//         Console.WriteLine("Task started...");
//         await Task.Delay(2000); // Simulate some work
//         Console.WriteLine("Task completed.");
//     }

//     // HandleError function that accepts a Task
//     private static async Task HandleError(Task task) {
//         try {
//             // Await the task passed as a parameter
//             await task;

//             // Handle the mission completion logic after the task finishes
//             Console.WriteLine("Handling the mission completion after task...");
//         }
//         catch (Exception ex) {
//             // Handle any potential errors in the task
//             Console.WriteLine($"An error occurred: {ex.Message}");
//         }
//     }
// }

try {
    Console.Write("Start running\n");
    await ApiManager.POST("/auth/login", data: new Dictionary<string, object>{
        {"username", "1"},
        {"password", "123"}
    });
}
catch (Exception ex) {
    Console.WriteLine($"Error: {ex.Message}");
}