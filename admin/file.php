<?php
header('Content-Type: application/json');

require_once __DIR__ . '/auth.php';

$input = json_decode(file_get_contents('php://input'), true) ?: [];
if(empty($input['path'])){ http_response_code(400); echo json_encode(['error'=>'no path']); exit; }

$projectRoot = realpath(__DIR__ . '/..');
$requested = $input['path'];
$allowed = ['html','php','css','js','sql','txt','json','md'];

if(strpos($requested, "..") !== false || preg_match('#(^|/|\\\\)admin(/|\\\\|$)#i',$requested)){
    http_response_code(400);
    echo json_encode(['error'=>'invalid path']);
    exit;
}

$ext = strtolower(pathinfo($requested, PATHINFO_EXTENSION));
if(!in_array($ext, $allowed)){
    http_response_code(400);
    echo json_encode(['error'=>'invalid file type']);
    exit;
}

$target = realpath($projectRoot . DIRECTORY_SEPARATOR . $requested);
if($target === false || strpos($target, $projectRoot) !== 0){ http_response_code(400); echo json_encode(['error'=>'invalid target']); exit; }

$content = file_get_contents($target);
if($content === false){ http_response_code(500); echo json_encode(['error'=>'read failed']); exit; }

echo json_encode(['content'=>$content]);
