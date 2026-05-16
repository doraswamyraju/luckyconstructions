<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'] ?? '';
$action = $input['action'] ?? '';
$itemData = $input['data'] ?? [];
$id = $input['id'] ?? null;

$dataFile = '../data.json';
if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'error' => 'Data file not found']);
    exit;
}

$data = json_decode(file_get_contents($dataFile), true);

if (!isset($data[$type])) {
    echo json_encode(['success' => false, 'error' => 'Invalid type']);
    exit;
}

switch ($action) {
    case 'add':
        $itemData['id'] = time(); // Simple ID generation
        $data[$type][] = $itemData;
        break;
    case 'update':
        foreach ($data[$type] as &$item) {
            if ($item['id'] == $itemData['id']) {
                $item = array_merge($item, $itemData);
                break;
            }
        }
        break;
    case 'delete':
        $data[$type] = array_filter($data[$type], function($item) use ($id) {
            return $item['id'] != $id;
        });
        $data[$type] = array_values($data[$type]); // Re-index array
        break;
    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
        exit;
}

if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save data']);
}
?>
