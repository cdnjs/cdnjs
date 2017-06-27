if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/io-nodejs/io-nodejs.js",
    code: []
};
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"].code=["YUI.add('io-nodejs', function(Y) {","","/*global Y: false, Buffer: false, clearInterval: false, clearTimeout: false, console: false, exports: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, __filename: false, __dirname: false */   ","    /**","    * Node.js override for IO, methods are mixed into `Y.IO`","    * @module io-nodejs","    * @main io-nodejs","    */","    /**","    * Passthru to the NodeJS <a href=\"https://github.com/mikeal/request\">request</a> module.","    * This method is return of `require('request')` so you can use it inside NodeJS without","    * the IO abstraction.","    * @method request","    * @static","    * @for IO","    */","    if (!Y.IO.request) {","        Y.IO.request = require('request');","    }","","    var codes = require('http').STATUS_CODES;","    ","    /**","    Flatten headers object","    @method flatten","    @protected","    @for IO","    @param {Object} o The headers object","    @return {String} The flattened headers object","    */","    var flatten = function(o) {","        var str = [];","        Object.keys(o).forEach(function(name) {","            str.push(name + ': ' + o[name]);","        });","        return str.join('\\n');","    };","","","    /**","    NodeJS IO transport, uses the NodeJS <a href=\"https://github.com/mikeal/request\">request</a>","    module under the hood to perform all network IO.","    @method transports.nodejs","    @for IO","    @static","    @returns {Object} This object contains only a `send` method that accepts a","    `transaction object`, `uri` and the `config object`.","    @example","        ","        Y.io('https://somedomain.com/url', {","            method: 'PUT',","            data: '?foo=bar',","            //Extra request module config options.","            request: {","                maxRedirects: 100,","                strictSSL: true,","                multipart: [","                    {","                        'content-type': 'application/json',","                        body: JSON.stringify({","                            foo: 'bar',","                            _attachments: {","                                'message.txt': {","                                    follows: true,","                                    length: 18,","                                    'content_type': 'text/plain'","                                }","                            }","                        })","                    },","                    {","                        body: 'I am an attachment'","                    }","                ] ","            },","            on: {","                success: function(id, e) {","                }","            }","        });","    */","","    Y.IO.transports.nodejs = function() {","        return {","            send: function (transaction, uri, config) {","","                config.notify('start', transaction, config);","                config.method = config.method || 'GET';","                config.method = config.method.toUpperCase();","","                var rconf = {","                    method: config.method,","                    uri: uri","                };","","                if (config.data) {","                    if (Y.Lang.isObject(config.data)) {","                        if (Y.QueryString && Y.QueryString.stringify) {","                            rconf.body = Y.QueryString.stringify(config.data);","                        } else {","                        }","                    } else if (Y.Lang.isString(config.data)) {","                        rconf.body = config.data;","                    }","                    if (rconf.method === 'GET') {","                        rconf.uri += (rconf.uri.indexOf('?') > -1 ? '&' : '?') + rconf.body;","                        rconf.body = '';","                    }","                }","                if (config.headers) {","                    rconf.headers = config.headers;","                }","                if (config.timeout) {","                    rconf.timeout = config.timeout;","                }","                if (config.request) {","                    Y.mix(rconf, config.request);","                }","                Y.IO.request(rconf, function(err, data) {","","                    if (err) {","                        transaction.c = err;","                        config.notify(((err.code === 'ETIMEDOUT') ? 'timeout' : 'failure'), transaction, config);","                        return;","                    }","                    if (data) {","                        transaction.c = {","                            status: data.statusCode,","                            statusCode: data.statusCode,","                            statusText: codes[data.statusCode],","                            headers: data.headers,","                            responseText: data.body,","                            responseXML: null,","                            getResponseHeader: function(name) {","                                return this.headers[name];","                            },","                            getAllResponseHeaders: function() {","                                return flatten(this.headers);","                            }","                        };","                    }","","                    config.notify('complete', transaction, config);","                    config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);","                });","                ","                var ret = {","                    io: transaction","                };","                return ret;","            }","        };","    };","","    Y.IO.defaultTransport('nodejs');","","","","}, '@VERSION@' ,{requires:['io-base']});"];
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"].lines = {"1":0,"17":0,"18":0,"21":0,"31":0,"32":0,"33":0,"34":0,"36":0,"83":0,"84":0,"87":0,"88":0,"89":0,"91":0,"96":0,"97":0,"98":0,"99":0,"102":0,"103":0,"105":0,"106":0,"107":0,"110":0,"111":0,"113":0,"114":0,"116":0,"117":0,"119":0,"121":0,"122":0,"123":0,"124":0,"126":0,"127":0,"135":0,"138":0,"143":0,"144":0,"147":0,"150":0,"155":0};
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"].functions = {"(anonymous 2):33":0,"flatten:31":0,"getResponseHeader:134":0,"getAllResponseHeaders:137":0,"(anonymous 3):119":0,"send:85":0,"nodejs:83":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"].coveredLines = 44;
_yuitest_coverage["/build/io-nodejs/io-nodejs.js"].coveredFunctions = 8;
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 1);
YUI.add('io-nodejs', function(Y) {

/*global Y: false, Buffer: false, clearInterval: false, clearTimeout: false, console: false, exports: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, __filename: false, __dirname: false */   
    /**
    * Node.js override for IO, methods are mixed into `Y.IO`
    * @module io-nodejs
    * @main io-nodejs
    */
    /**
    * Passthru to the NodeJS <a href="https://github.com/mikeal/request">request</a> module.
    * This method is return of `require('request')` so you can use it inside NodeJS without
    * the IO abstraction.
    * @method request
    * @static
    * @for IO
    */
    _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 17);
if (!Y.IO.request) {
        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 18);
Y.IO.request = require('request');
    }

    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 21);
var codes = require('http').STATUS_CODES;
    
    /**
    Flatten headers object
    @method flatten
    @protected
    @for IO
    @param {Object} o The headers object
    @return {String} The flattened headers object
    */
    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 31);
var flatten = function(o) {
        _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "flatten", 31);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 32);
var str = [];
        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 33);
Object.keys(o).forEach(function(name) {
            _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "(anonymous 2)", 33);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 34);
str.push(name + ': ' + o[name]);
        });
        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 36);
return str.join('\n');
    };


    /**
    NodeJS IO transport, uses the NodeJS <a href="https://github.com/mikeal/request">request</a>
    module under the hood to perform all network IO.
    @method transports.nodejs
    @for IO
    @static
    @returns {Object} This object contains only a `send` method that accepts a
    `transaction object`, `uri` and the `config object`.
    @example
        
        Y.io('https://somedomain.com/url', {
            method: 'PUT',
            data: '?foo=bar',
            //Extra request module config options.
            request: {
                maxRedirects: 100,
                strictSSL: true,
                multipart: [
                    {
                        'content-type': 'application/json',
                        body: JSON.stringify({
                            foo: 'bar',
                            _attachments: {
                                'message.txt': {
                                    follows: true,
                                    length: 18,
                                    'content_type': 'text/plain'
                                }
                            }
                        })
                    },
                    {
                        body: 'I am an attachment'
                    }
                ] 
            },
            on: {
                success: function(id, e) {
                }
            }
        });
    */

    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 83);
Y.IO.transports.nodejs = function() {
        _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "nodejs", 83);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 84);
return {
            send: function (transaction, uri, config) {

                _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "send", 85);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 87);
config.notify('start', transaction, config);
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 88);
config.method = config.method || 'GET';
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 89);
config.method = config.method.toUpperCase();

                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 91);
var rconf = {
                    method: config.method,
                    uri: uri
                };

                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 96);
if (config.data) {
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 97);
if (Y.Lang.isObject(config.data)) {
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 98);
if (Y.QueryString && Y.QueryString.stringify) {
                            _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 99);
rconf.body = Y.QueryString.stringify(config.data);
                        } else {
                        }
                    } else {_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 102);
if (Y.Lang.isString(config.data)) {
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 103);
rconf.body = config.data;
                    }}
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 105);
if (rconf.method === 'GET') {
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 106);
rconf.uri += (rconf.uri.indexOf('?') > -1 ? '&' : '?') + rconf.body;
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 107);
rconf.body = '';
                    }
                }
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 110);
if (config.headers) {
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 111);
rconf.headers = config.headers;
                }
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 113);
if (config.timeout) {
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 114);
rconf.timeout = config.timeout;
                }
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 116);
if (config.request) {
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 117);
Y.mix(rconf, config.request);
                }
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 119);
Y.IO.request(rconf, function(err, data) {

                    _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "(anonymous 3)", 119);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 121);
if (err) {
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 122);
transaction.c = err;
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 123);
config.notify(((err.code === 'ETIMEDOUT') ? 'timeout' : 'failure'), transaction, config);
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 124);
return;
                    }
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 126);
if (data) {
                        _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 127);
transaction.c = {
                            status: data.statusCode,
                            statusCode: data.statusCode,
                            statusText: codes[data.statusCode],
                            headers: data.headers,
                            responseText: data.body,
                            responseXML: null,
                            getResponseHeader: function(name) {
                                _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "getResponseHeader", 134);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 135);
return this.headers[name];
                            },
                            getAllResponseHeaders: function() {
                                _yuitest_coverfunc("/build/io-nodejs/io-nodejs.js", "getAllResponseHeaders", 137);
_yuitest_coverline("/build/io-nodejs/io-nodejs.js", 138);
return flatten(this.headers);
                            }
                        };
                    }

                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 143);
config.notify('complete', transaction, config);
                    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 144);
config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);
                });
                
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 147);
var ret = {
                    io: transaction
                };
                _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 150);
return ret;
            }
        };
    };

    _yuitest_coverline("/build/io-nodejs/io-nodejs.js", 155);
Y.IO.defaultTransport('nodejs');



}, '@VERSION@' ,{requires:['io-base']});
