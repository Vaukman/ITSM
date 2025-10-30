<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

session_start();
header('Content-Type: application/json');

include '../database/connection.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST requests are allowed.']);
    exit;
}

// Get form data from React
$data = json_decode(file_get_contents('php://input'), true);

$title = trim($data['title'] ?? '');
$description = trim($data['description'] ?? '');
$assigned_to = $data['assigned_to'] ?: null;
$status_id = $data['status_id'] ?? 1;
$priority_id = $data['priority_id'] ?? 1;
$category_id = $data['category_id'] ?? 1;

// Validation
if (!$title || !$description) {
    echo json_encode(['error' => 'Title and description are required.']);
    exit;
}

// Insert ticket
$stmt = $conn->prepare("
    INSERT INTO tickets
    (title, description, user_id, assigned_to, status_id, priority_id, category_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
");
$stmt->bind_param(
    "ssiiiii",
    $title,
    $description,
    $_SESSION['user_id'],
    $assigned_to,
    $status_id,
    $priority_id,
    $category_id
);


if ($stmt->execute()) {
    echo json_encode([
        'success' => 'Ticket created successfully',
        'ticket_id' => $stmt->insert_id
    ]);
} else {
    echo json_encode(['error' => 'Failed to create ticket']);
}

$stmt->close();
$conn->close();
