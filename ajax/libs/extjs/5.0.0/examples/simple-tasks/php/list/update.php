<?php

include '../connection.php';

try {
    $params = json_decode(file_get_contents('php://input'));

    $statement = $db->prepare("update list set name = '$params->name' where id = $params->id");

    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $jsonResult = array(
        'success' => true,
        'children' => $params
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>