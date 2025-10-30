<?php
// Show all errors for debugging (optional)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers — MUST come before session_start() and output
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Start session
session_start();

// Include DB connection
include '../database/connection.php';

// Require user to be logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Fetch all users with role
$stmt = $conn->prepare("
    SELECT u.id, u.first_name, u.last_name, u.email, u.role_id, r.name AS role_name,
           u.id_status, u.created
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    ORDER BY u.role_id ASC
");

$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);

$stmt->close();
$conn->close();
