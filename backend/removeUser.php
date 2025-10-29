    <?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

    session_start();
    include '../database/connection.php';

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    // Get current user role
    $currentUserId = $_SESSION['user_id'];
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

    if (!$currentUser || strtolower($currentUser['role_name']) !== 'admin') {
        echo json_encode(['error' => 'Only admins can remove users']);
        exit;
    }

    // Decode JSON input
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['userId'] ?? null;

    if (!$userId) {
        echo json_encode(['error' => 'Missing userId']);
        exit;
    }

    // Cannot remove yourself
    if ($userId == $currentUserId) {
        echo json_encode(['error' => 'Cannot remove yourself']);
        exit;
    }

    // Remove user
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to remove user']);
    }

    $stmt->close();
    $conn->close();
