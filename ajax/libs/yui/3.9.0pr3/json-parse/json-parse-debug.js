YUI.add('json-parse', function (Y, NAME) {

var _JSON = Y.config.global.JSON;

Y.namespace('JSON').parse = function () {
    return _JSON.parse.apply(_JSON, arguments);
};

}, '@VERSION@', {"requires": ["yui-base"]});
