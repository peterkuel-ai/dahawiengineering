<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$password = trim($input['password'] ?? '');
if ($password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'password required']);
    exit;
}

if (!password_verify($password, ADMIN_PASSWORD_HASH)) {
    http_response_code(401);
    echo json_encode(['error' => 'invalid password']);
    exit;
}

session_name('dahawi_admin_session');
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict']);
session_start();
session_regenerate_id(true);

$_SESSION['admin_authenticated'] = true;

echo json_encode(['success' => true]);
