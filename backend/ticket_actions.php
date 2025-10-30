<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

session_start();
include '../database/connection.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['error' => 'Unauthorized']);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Create ticket
  $stmt = $conn->prepare("
    INSERT INTO tickets (title, description, user_id, assigned_to, status_id, priority_id, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  ");
  $stmt->bind_param(
    "ssiiiii",
    $data['title'],
    $data['description'],
    $user_id,
    $data['assigned_to'],
    $data['status_id'],
    $data['priority_id'],
    $data['category_id']
  );
  $stmt->execute();
  echo json_encode(['success' => true, 'id' => $conn->insert_id]);
  $stmt->close();

} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // Edit ticket
  $stmt = $conn->prepare("
    UPDATE tickets
    SET title = ?, description = ?, assigned_to = ?, status_id = ?, priority_id = ?, category_id = ?
    WHERE id = ?
  ");
  $stmt->bind_param(
    "ssiiiii",
    $data['title'],
    $data['description'],
    $data['assigned_to'],
    $data['status_id'],
    $data['priority_id'],
    $data['category_id'],
    $data['id']
  );
  $stmt->execute();
  echo json_encode(['success' => true]);
  $stmt->close();
}

$conn->close();
?>
