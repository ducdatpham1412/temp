func cong(a: Int, b: Int) async -> Int {
   return a + b
}

func nhan(a: Int, b: Int) async -> Int {
   return a * b
}

func congComplete(a: Int, b: Int, completion: @escaping (Int) -> Void) {
    completion(a + b);
}


let check = [1, 2, 3];

let A = 10
let B = 20


func tinh(a: Int, b: Int) async -> Int {
    let res = await withCheckedContinuation {continuation in
        continuation.resume(returning: a + b)
    }
    return res;
}

Task {
    // congComplete(a: A, b: B) { result in
    //     print("Result: ", result);
    // }
    let res = await tinh(a: A, b: B);
    print("Res: ", res)
}