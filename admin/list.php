<?php
header('Content-Type: application/json');

require_once __DIR__ . '/auth.php';

$projectRoot = realpath(__DIR__ . '/..');
$allowed = ['html','php','css','js','sql','txt','json','md'];

$files = [];
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($projectRoot));
foreach($it as $file){
    if($file->isDir()) continue;
    $path = $file->getRealPath();
    if(strpos($path, DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR) !== false) continue;
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    if(!in_array(strtolower($ext), $allowed)) continue;
    $rel = substr($path, strlen($projectRoot)+1);
    $files[] = str_replace(DIRECTORY_SEPARATOR, '/', $rel);
}

sort($files);
echo json_encode(['files'=>$files]);