<?php

include '../connection.php';

try {
    $statement = $db->prepare('select * from list order by lft asc');

    if(!$statement->execute()) {
        throw new Exception(implode(', ', $statement->errorInfo()));
    }

    // fetch the flat result set from the database
    $lists = $statement->fetchAll(PDO::FETCH_ASSOC);

    // convert list result set to nested tree structure.
    // create a dummy root node that will be the base of our tree structure
    $root = array(
        // all nodes in the result set should fall within these left/right bounds
        'lft' => 0,
        'rgt' => PHP_INT_MAX,
        'children' => array()
    );

    $listStack = array(&$root);
    $listCount = count($lists);
    for($i = 0; $i < $listCount; $i++) {
        $list = &$lists[$i];

        $parent = &$listStack[count($listStack) - 1];

        while($list['rgt'] > $parent['rgt']) {
            // if the current list is not a child of parent, pop lists off the stack until we get to a list that is its parent
            array_pop($listStack);
            $parent = &$listStack[count($listStack) - 1];
        }
        // add the node to its parent node's "children" array
        $parent['children'][] = &$list;

        if($list['rgt'] - $list['lft'] > 2) { // if the node has children
            $list['expanded'] = "1"; // nodes that have children are expanded by default
            $list['children'] = array();
            $listStack[] = &$list; // push the node on to the stack
        } else if(empty($list['leaf'])) {
            // for non leaf nodes that do not have any children we have to set "loaded" to true
            // This prevents the TreeStore from trying to dynamically load content for these nodes when they are expanded
            $list['loaded'] = "1";
            unset($list['leaf']); // no need to return "leaf: null" to the client for non leaf nodes
        }
    }

    // remove properties that are not needed by the UI (lft and rgt)
    function removeTreeProperties(&$list) {
        unset($list['lft']);
        unset($list['rgt']);
        if(isset($list['children'])) {
            foreach($list['children'] as &$child) {
                removeTreeProperties(&$child);
            }
        }
    }
    removeTreeProperties(&$root);

    $jsonResult = array(
        'success' => true,
        'children' => $root['children']
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>