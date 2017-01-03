<?php
date_default_timezone_set('UTC');

echo json_encode(array(
    'type'=>'event',
    'name'=>'message',
    'data'=>'Successfully polled at: '. date('g:i:s a') . ' UTC'
));
