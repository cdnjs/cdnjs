Summary
=======
A simple node.js library for communicating with the [HipChat](http://hipchat.com/) REST API.
Supports full Hipchat API

You can also install via npm:

	npm install node-hipchat


Methods implemented:
====================

`rooms/create`  
`rooms/delete`  
`rooms/history`  
`rooms/list`  
`rooms/message`  
`rooms/show`  
  
`users/create`  
`users/delete`  
`users/list`  
`users/show`  
`users/update`  


# Examples

First make sure you have an [Admin API Key](https://www.hipchat.com/admin/api).

## Send a message to a room

    var hipchat = require('node-hipchat');

    var HC = new hipchat('YOUR_API_KEY');

    HC.listRooms(function(data) {
      console.log(data); // These are all the rooms
    });

    var params = {
      room: 123456, // Found in the JSON response from the call above
      from: 'FunkyMonkey',
      message: 'Some HTML <strong>formatted</strong> string',
      color: 'yellow'
    };

    HC.postMessage(params, function(data) {
      // Message has been sent!
    });
