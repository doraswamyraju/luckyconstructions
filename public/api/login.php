<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

$dataFile = '../data.json';
if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'error' => 'Data file not found']);
    exit;
}

$data = json_decode(file_get_contents($dataFile), true);
$admin = $data['admin'] ?? null;

if ($admin && $admin['username'] === $username && $admin['password'] === $password) {
    echo json_encode([
        'success' => true,
        'user' => [
            'username' => $admin['username'],
            'email' => $admin['email']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
}
?>
