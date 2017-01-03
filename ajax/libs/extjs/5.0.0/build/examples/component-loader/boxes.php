<?php
$total = $_POST["total"];
$items = array();
for ($i = 1; $i <= $total; ++$i) {
    array_push($items, array(
        'style'=>"border-width:1px;border-style:solid",
        'bodyStyle'=>"border-width:0",
        'flex'=>1,
        'html'=>"Item $i"
    ));
}
echo json_encode($items);
?>