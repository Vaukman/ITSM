<?php
// Replace "adminpassword" with your desired admin password
$password = "admin";

// Generate hash
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Hashed password: " . $hash;
