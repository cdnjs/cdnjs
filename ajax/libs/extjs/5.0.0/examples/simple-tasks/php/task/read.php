<?php

include '../connection.php';

try {
    $statement = $db->prepare('select * from task');

    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $jsonResult = array(
        'success' => true,
        'tasks' => $statement->fetchAll(PDO::FETCH_ASSOC)
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>