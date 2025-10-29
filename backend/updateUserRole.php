<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

session_start();
include '../database/connection.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$currentUserId = $_SESSION['user_id'];

// Get current user info
$stmt = $conn->prepare("
    SELECT u.role_id, r.name AS role_name
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?
");
$stmt->bind_param("i", $currentUserId);
$stmt->execute();
$result = $stmt->get_result();
$currentUser = $result->fetch_assoc();
$stmt->close();

if (!$currentUser || $currentUser['role_id'] != 1) {
    echo json_encode(['error' => 'Only admins can change roles']);
    exit;
}

// Decode input
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'] ?? null;
$newRoleId = $data['newRoleId'] ?? null;

// Validate input
if (!$userId || !$newRoleId || !is_numeric($userId) || !is_numeric($newRoleId)) {
    echo json_encode(['error' => 'Invalid parameters']);
    exit;
}

// Prevent updating own role
if ($userId == $currentUserId) {
    echo json_encode(['error' => 'Cannot change your own role']);
    exit;
}

// Prevent promoting to Admin (role_id = 1)
if ($newRoleId == 1) {
    echo json_encode(['error' => 'Cannot promote other users to Admin']);
    exit;
}

// Make sure target user exists
$stmt = $conn->prepare("SELECT id, role_id FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$targetUser = $result->fetch_assoc();
$stmt->close();

if (!$targetUser) {
    echo json_encode(['error' => 'User not found']);
    exit;
}

// Update role
$stmt = $conn->prepare("UPDATE users SET role_id = ? WHERE id = ?");
$stmt->bind_param("ii", $newRoleId, $userId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'No changes made or failed to update']);
}

$stmt->close();
$conn->close();
?>
