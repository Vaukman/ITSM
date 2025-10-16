<?php
// Error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');

// CORS headers
$allowedOrigin = "http://localhost:3000";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// JSON response
header('Content-Type: application/json');
session_start();

// Include DB connection
include '../database/connection.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$first_name = trim($data['firstName'] ?? '');
$last_name = trim($data['lastName'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirm_password = $data['confirmPassword'] ?? '';

// Validate required fields
if (!$first_name || !$last_name || !$email) {
    echo json_encode(['error' => 'First name, last name, and email are required.']);
    exit;
}

// Generate password automatically if empty
if (empty($password)) {
    $password = bin2hex(random_bytes(5)); // 10-character password
    $confirm_password = $password;
}

if ($password !== $confirm_password) {
    echo json_encode(['error' => 'Passwords do not match.']);
    exit;
}

// Check for existing email
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(['error' => 'Email already registered.']);
    $stmt->close();
    exit;
}
$stmt->close();

// Set default role/status
$role_id = 4;  // first clearance
$id_status = 1; // active

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare(
    "INSERT INTO users (first_name, last_name, email, password, role_id, id_status) VALUES (?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param("ssssii", $first_name, $last_name, $email, $hashed_password, $role_id, $id_status);

if ($stmt->execute()) {
    echo json_encode([
        'success' => 'Registration successful.',
        'hashedPassword' => $hashed_password
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed: ' . $stmt->error]);
}


$stmt->close();
$conn->close();
?>
