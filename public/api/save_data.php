<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $dataFile = '../data.json';
    if (!file_exists($dataFile)) {
        file_put_contents($dataFile, json_encode(['projects' => [], 'testimonials' => [], 'blogs' => [], 'leads' => []]));
    }

    $input = file_get_contents('php://input');
    $request = json_decode($input, true);

    if (!$request) {
        throw new Exception('Invalid JSON input: ' . $input);
    }

    $type = $request['type'] ?? '';
    $action = $request['action'] ?? '';
    $id = $request['id'] ?? ($request['data']['id'] ?? null);
    $dataToSave = $request['data'] ?? null;

    $json = file_get_contents($dataFile);
    $allData = json_decode($json, true);

    if (!$allData) {
        $allData = ['projects' => [], 'testimonials' => [], 'blogs' => [], 'leads' => []];
    }

    if ($action === 'delete') {
        if (!isset($allData[$type])) {
            throw new Exception('Invalid type for deletion: ' . $type);
        }
        $allData[$type] = array_values(array_filter($allData[$type], function($item) use ($id) {
            return $item['id'] != $id;
        }));
    } else if ($action === 'add') {
        if ($dataToSave) {
            $dataToSave['id'] = time();
            $allData[$type][] = $dataToSave;
        }
    } else if ($action === 'update') {
        if ($dataToSave) {
            $found = false;
            foreach ($allData[$type] as &$item) {
                if ($item['id'] == $id) {
                    $item = array_merge($item, $dataToSave);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $dataToSave['id'] = $id ?: time();
                $allData[$type][] = $dataToSave;
            }
        }
    }

    if (file_put_contents($dataFile, json_encode($allData, JSON_PRETTY_PRINT)) === false) {
        throw new Exception('Failed to write to data.json. Check folder permissions.');
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
