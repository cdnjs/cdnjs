<?php
    require('remote/init.php');

    // Get Request
    $request = new Request(array('restful' => false));

    //echo "<P>request: " . $request->to_string();

    // Get Controller
    require('remote/app/controllers/' . $request->controller . '.php');
    $controller_name = ucfirst($request->controller);
    $controller = new $controller_name;
    $callback = $_GET['callback'];

    // Dispatch request
    $result = $controller->dispatch($request);
    if ($callback) {
        $result = $callback . '(' . $result . ');';
    }
    echo $result;

