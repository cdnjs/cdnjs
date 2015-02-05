/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('yql-nodejs', function (Y, NAME) {

/**
* NodeJS plugin for YQL to use native request to make requests instead of JSONP.
* Not required by the user, it's conditionally loaded and should "just work".
* @module yql
* @submodule yql-nodejs
*/

var request = require('request');

//Over writes Y.YQLRequest._send to use request instead of JSONP
Y.YQLRequest.prototype._send = function (url, o) {
    request(url, {
        method: 'GET',
        timeout: o.timeout || (30 * 1000)
    }, function(err, res) {
        if (err) {
            //The signature that YQL requires
            o.on.success({
                error: err
            });
        } else {
            o.on.success(JSON.parse(res.body));
        }
    });
};


}, '3.17.1', {"requires": ["yql"]});
