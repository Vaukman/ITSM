<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

session_start();
header('Content-Type: application/json');

include '../database/connection.php';

// Require login
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$stmt = $conn->prepare("
    SELECT 
        t.id, t.title, t.description, t.created_at, t.updated_at,
        u.email AS created_by,
        a.email AS assigned_to_email,
        s.name AS status,
        p.name AS priority,
        c.name AS category
    FROM tickets t
    LEFT JOIN users u ON t.user_id = u.id
    LEFT JOIN users a ON t.assigned_to = a.id
    LEFT JOIN user_status s ON t.status_id = s.id
    LEFT JOIN ticket_priority p ON t.priority_id = p.id
    LEFT JOIN categories c ON t.category_id = c.id
    ORDER BY t.created_at DESC
");
$stmt->execute();
$result = $stmt->get_result();

$tickets = [];
while ($row = $result->fetch_assoc()) $tickets[] = $row;

echo json_encode($tickets);

$stmt->close();
$conn->close();
