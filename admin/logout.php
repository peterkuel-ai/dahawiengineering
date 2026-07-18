<?php
header('Content-Type: application/json');

session_name('dahawi_admin_session');
session_start();
$_SESSION = [];
setcookie(session_name(), '', time() - 3600, '/');
session_destroy();

echo json_encode(['success' => true]);
