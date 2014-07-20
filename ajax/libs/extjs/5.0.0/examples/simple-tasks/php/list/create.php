<?php

include '../connection.php';

try {
    $params = json_decode(file_get_contents('php://input'));
    unset($params->id);

    $db->beginTransaction();

    if($params->parentId > 0) {
        // find the list's parent node
        $statement = $db->prepare("select * from list where id = $params->parentId");
        if($statement->execute()) {
            $parent = $statement->fetch(PDO::FETCH_ASSOC);
            if(!$parent) {
                throw new Exception('parent node could not be found');
            }
        } else {
            throw new Exception(implode(', ', $statement->errorInfo()));
        }
        // the left bound of the new node is it's parent's right bound (append node to end of parent's child nodes)
        $leftBound = $parent['rgt'];
        // the right bound of the new node is leftBound + 1, because the new node has no children
        $rightBound = $leftBound + 1;

        // before we can insert a new node we need to increment by 2 the left and right values for all nodes to the right of where the new node is being inserted
        $statement = $db->prepare("update list set lft = lft + 2 where lft >= $rightBound");
        if(!$statement->execute()) {
            $db->rollBack();
            throw new Exception(implode(', ', $statement->errorInfo()));
        }
        $statement = $db->prepare("update list set rgt = rgt + 2 where rgt >= $leftBound");
        if(!$statement->execute()) {
            $db->rollBack();
            throw new Exception(implode(', ', $statement->errorInfo()));
        }
    } else {
        // if there is no parent, append the new node as a root node at the very end
        $statement = $db->prepare('select max(rgt) from list');
        if($statement->execute()) {
            // the left bound of the new node is right after the right bound of the node with the highest right bound in the table
            $leftBound = $statement->fetch(PDO::FETCH_COLUMN) + 1;
            // the right bound of the new node is leftBound + 1, because the new node has no children
            $rightBound = $leftBound + 1;
        } else {
            throw new Exception(implode(', ', $statement->errorInfo()));
        }

    }

    // insert the new list node into the database
    $statement = $db->prepare("insert into list (name, leaf, lft, rgt) values('$params->name', " . intval($params->leaf) . ", $leftBound, $rightBound)");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $params->id = $db->lastInsertId();
    $jsonResult = array(
        'success' => true,
        'children' => (array)$params
    );
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