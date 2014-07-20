<?php

include '../connection.php';

try {
    $params = json_decode(file_get_contents('php://input'));

    $db->beginTransaction();

    // get the left and right bounds of the node so we can delete it and all its descendants
    $statement = $db->prepare("select lft, rgt from list where id = $params->id");
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $bounds = $statement->fetch(PDO::FETCH_ASSOC);
    $leftBound = $bounds['lft'];
    $rightBound = $bounds['rgt'];

    // delete the node and all its descendants
    $statement = $db->prepare("delete from list where lft >= $leftBound and rgt <= $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    // calculate the amount of empty space left after deleting the nodes.
    $emptySpace = $rightBound - $leftBound + 1;

    // decrement by the empty space amount the lft and rgt values for all nodes that come after the nodes that were deleted.
    $statement = $db->prepare("update list set lft = lft - $emptySpace where lft > $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }


    $statement = $db->prepare("update list set rgt = rgt - $emptySpace where rgt > $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    $jsonResult = array('success' => true);
    $db->commit();
} catch(Exception $e) {
    $db->rollBack();
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>
