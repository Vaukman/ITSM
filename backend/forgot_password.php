<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include '../database/connection.php';


$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

if (!$email) {
    echo json_encode(['error' => 'Email is required.']);
    exit;
}

// Check if email exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(['error' => 'Email not found.']);
    $stmt->close();
    exit;
}

// Generate reset token
$token = bin2hex(random_bytes(16));
$expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

// Save token and expiry in a table (you’ll need to create `password_resets`)
$stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $email, $token, $expiry);
$stmt->execute();
$stmt->close();

// Send email with reset link (use mail() or a library like PHPMailer)
$reset_link = "http://localhost:3000/reset-password?token=$token";
mail($email, "Password Reset", "Click here to reset your password: $reset_link");

echo json_encode(['success' => 'Password reset link sent to your email.']);
$conn->close();
?>
