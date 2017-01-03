<?php

include '../connection.php';

try {
    $key = $_POST['key'];
    $statement = $db->prepare("select value from config where key = '$key'");

    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $jsonResult = array(
        'success' => true,
        'value' => $statement->fetch(PDO::FETCH_COLUMN)
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>