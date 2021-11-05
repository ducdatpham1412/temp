

func fetchUserID(from server: String) async -> Int {
    // try await Task.sleep(for: .seconds(3));

    if server == "primary" {
        return 97
    }
    return 501
}


func fetchUsername(from server: String) async -> String {
    let userID = await fetchUserID(from: server)
    if userID == 501 {
        return "John Appleseed"
    }
    return "Guest"
}


func connectUser(to server: String) async {
    async let userID = fetchUserID(from: server)
    async let username = fetchUsername(from: server)
    let greeting = await "Hello \(username), user ID \(userID)"
    print(greeting)
}


// let userIds = await withTaskGroup(of: String.self) { group in 
//     for server in ["primary", "secondary", "development"] {
//         group.addTask {
//             return await fetchUsername(from: server)
//         }
//     }

//     var results: [String] = [];

//     for await result in group {
//         results.append(result);
//     }

//     return results;
// }

// print(userIds)


var a = [1, 2, 3]

a.reverse()

print(a)
