<?php

include '../connection.php';

try {
    $params = json_decode(file_get_contents('php://input'));

    $statement = $db->prepare('update task set title = :title, list_id = :list_id, due = :due, reminder = :reminder, done = :done, note = :note where id = :id');

    foreach($params as $key => &$value) {
        $statement->bindParam(":$key", $value);
    }

    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $jsonResult = array(
        'success' => true,
        'tasks' => $params
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?> 