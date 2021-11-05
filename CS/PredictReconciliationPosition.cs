// using Unity.Netcode;
// using UnityEngine;

// public class EggMovementController : NetworkBehaviour {
//     public float moveSpeed = 5f; // Constant speed of the egg
//     private Vector3 moveDirection; // Direction of movement

//     private bool isMoving = false;
//     private Vector3 predictedPosition;
//     private Vector3 serverPosition;

//     void Update() {
//         if (IsOwner) {
//             HandleInput();
//             PredictMovement();
//         }
//         else {
//             InterpolateToServerPosition();
//         }
//     }

//     void HandleInput() {
//         if (Input.GetMouseButtonDown(0)) {
//             Vector3 mousePosition = Input.mousePosition;
//             if (mousePosition.x < Screen.width / 2) {
//                 moveDirection = Vector3.left; // Move left
//             }
//             else {
//                 moveDirection = Vector3.right; // Move right
//             }

//             isMoving = true;
//             SendMoveDirectionToServerRpc(moveDirection);
//         }
//     }

//     void PredictMovement() {
//         // Predict the new position based on constant speed
//         if (isMoving) {
//             predictedPosition += moveDirection * moveSpeed * Time.deltaTime;
//             transform.position = predictedPosition;
//         }
//     }

//     void InterpolateToServerPosition() {
//         // Smoothly interpolate the current position to the server's authoritative position
//         transform.position = Vector3.Lerp(transform.position, serverPosition, Time.deltaTime * 10f);
//     }

//     [ServerRpc]
//     void SendMoveDirectionToServerRpc(Vector3 direction) {
//         // Update the move direction on the server
//         moveDirection = direction;
//         isMoving = true;
//         serverPosition = transform.position;

//         // Notify all clients about the movement direction and start the movement
//         StartMovementClientRpc(serverPosition, direction);
//     }

//     [ClientRpc]
//     void StartMovementClientRpc(Vector3 newServerPosition, Vector3 direction) {
//         // Update the direction and start moving on clients
//         moveDirection = direction;
//         isMoving = true;

//         transform.position += moveDirection * moveSpeed * Time.deltaTime;
//         serverPosition = transform.position;

//         // Reconcile predicted position with server's authoritative position
//         serverPosition = newServerPosition;
//         float positionError = Vector3.Distance(predictedPosition, serverPosition);

//         if (positionError > 0.1f) // Tolerance for position error
//         {
//             // Correct position if the error is significant
//             transform.position = serverPosition;
//             predictedPosition = serverPosition;
//         }
//     }
// }
