<?php
require_once __DIR__ . '/config.php';

session_name('dahawi_admin_session');
session_start();

if (empty($_SESSION['admin_authenticated'])) {
    http_response_code(401);
    echo json_encode(['error' => 'unauthorized']);
    exit;
}
