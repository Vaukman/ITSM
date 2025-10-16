<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "itsm";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error); // log instead of echo
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}
?>
