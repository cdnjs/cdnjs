<?php

include '../connection.php';

try {
    $params = json_decode(file_get_contents('php://input'));
     
    $db->beginTransaction();

    // if the node is being appended to the root node, change relatedId and position so that the node will be appended after the last node in the db
    // this is necessary because we do not store the actual root node in the db
    if($params->relatedId == -1) {
        $statement = $db->prepare("select id from list where rgt = (select max(rgt) from list)");
        if(!$statement->execute()) {
            throw new Exception(implode(', ', $statement->errorInfo()));
        }
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        $params->relatedId = $result['id'];
        $params->position = 'after';
    }

    // Step 1: figure out how much space the node to be moved takes up (nodeSize)
    $statement = $db->prepare("select lft, rgt from list where id = $params->id");
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $nodeBounds = $statement->fetch(PDO::FETCH_ASSOC);
    $nodeSize = $nodeBounds['rgt'] - $nodeBounds['lft'] + 1;

    // Step 2: calculate the insertion point where the node is being moved to.
    // this will be the left bound of the node after it is moved
    $statement = $db->prepare("select lft, rgt from list where id = $params->relatedId");
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $relatedNodeBounds = $statement->fetch(PDO::FETCH_ASSOC);
    if($params->position == 'after') {
        $insertionPoint = $relatedNodeBounds['rgt'] + 1;
    } else if($params->position == 'before') {
        $insertionPoint = $relatedNodeBounds['lft'];
    } else if($params->position == 'append') {
        $insertionPoint = $relatedNodeBounds['rgt'];
    }
    
    // Step 3: before moving the node and its descendants, make room at the insertion point
    // this is done by incrementing by nodeSize the left/right values for all nodes to the right of the insertion point
    $statement = $db->prepare("update list set lft = lft + $nodeSize where lft >= $insertionPoint");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $statement = $db->prepare("update list set rgt = rgt + $nodeSize where rgt >= $insertionPoint");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    // Step 4: calculate how far the node has to move to get to the insertion point
    // to do this, we need to first recalculate the node's bounds, since they may have changed in Step 3
    // if the node's existing position is to the right of the insertion point
    $statement = $db->prepare("select lft, rgt from list where id = $params->id");
    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $nodeBounds = $statement->fetch(PDO::FETCH_ASSOC);
    $leftBound = $nodeBounds['lft'];
    $rightBound = $nodeBounds['rgt'];
    $distance = $insertionPoint - $nodeBounds['lft'];

    // Step 5: "move" the node to the insertion point by incrementing by $distance
    // the left/right values for the node being moved and all its descendants
    $statement = $db->prepare("update list set lft = lft + $distance, rgt = rgt + $distance where lft >= $leftBound and rgt <= $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    // Step 6: decrement the left/right values for all the nodes to the right of the empty space left by the node that was moved
    $statement = $db->prepare("update list set lft = lft - $nodeSize where lft > $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }
    $statement = $db->prepare("update list set rgt = rgt - $nodeSize where rgt > $rightBound");
    if(!$statement->execute()) {
        $db->rollBack();
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    $jsonResult = array('success' => true);
    $db->commit();
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>