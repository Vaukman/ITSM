<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


session_start();
include '../database/connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$result = $conn->query("SELECT id, name FROM user_status");
$statuses = [];
while ($row = $result->fetch_assoc()) {
    $statuses[] = $row;
}

echo json_encode($statuses);
$conn->close();
?>
