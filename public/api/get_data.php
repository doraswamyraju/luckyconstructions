<?php
header('Content-Type: application/json');

$type = $_GET['type'] ?? '';
$dataFile = '../data.json';

if (!file_exists($dataFile)) {
    // Initialize with some default data if file doesn't exist
    $initialData = [
        'projects' => [],
        'testimonials' => [],
        'leads' => [],
        'blogs' => [],
        'admin' => [
            'username' => 'admin',
            'password' => 'admin123',
            'email' => 'admin@luckyconstructions.com'
        ]
    ];
    file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

$data = json_decode(file_get_contents($dataFile), true);

if (isset($data[$type])) {
    echo json_encode($data[$type]);
} else {
    echo json_encode(['error' => 'Invalid type']);
}
?>
