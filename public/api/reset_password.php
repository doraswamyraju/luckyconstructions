<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';

$dataFile = '../data.json';
if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'error' => 'Data file not found']);
    exit;
}

$data = json_decode(file_get_contents($dataFile), true);
$admin = $data['admin'] ?? null;

if ($admin && $admin['email'] === $email) {
    echo json_encode([
        'success' => true,
        'message' => 'Password reset link has been sent to your email.'
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Email not found']);
}
?>
