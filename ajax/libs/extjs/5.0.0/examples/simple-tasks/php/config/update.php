<?php

include '../connection.php';

try {
    $key = $_POST['key'];
    $value = $_POST['value'];

    // first read the config table to see if a config already exists for this key
    $statement = $db->prepare("select value from config where key = '$key'");
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    if(!$statement->fetch(PDO::FETCH_COLUMN)) {
        $sql = "insert into config (key, value) values('$key', '$value')";
    } else {
        $sql = "update config set value = '$value' where key = '$key'";
    }

    $statement = $db->prepare($sql);
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $jsonResult = array('success' => true);
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?> 