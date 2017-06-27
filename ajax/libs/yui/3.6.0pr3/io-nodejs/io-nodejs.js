YUI.add('io-nodejs', function(Y) {

/*global Y: false, Buffer: false, clearInterval: false, clearTimeout: false, console: false, exports: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, __filename: false, __dirname: false */   

    /**
    * Passthru to the NodeJS <a href="https://github.com/mikeal/request">request</a> module.
    * This method is return of `require('request')` so you can use it inside NodeJS without
    * the IO abstraction.
    * @method request
    * @static
    */
    if (!Y.IO.request) {
        Y.IO.request = require('request');
    }

    var codes = require('http').STATUS_CODES;


    /**
    NodeJS IO transport, uses the NodeJS <a href="https://github.com/mikeal/request">request</a>
    module under the hood to perform all network IO.
    @method transports.nodejs
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

    var flatten = function(o) {
        var str = [];
        Object.keys(o).forEach(function(name) {
            str.push(name + ': ' + o[name]);
        });
        return str.join('\n');
    };

    Y.IO.transports.nodejs = function() {
        return {
            send: function (transaction, uri, config) {

                config.notify('start', transaction, config);
                config.method = config.method || 'GET';
                config.method = config.method.toUpperCase();

                var rconf = {
                    method: config.method,
                    uri: uri
                };

                if (config.data) {
                    if (Y.Lang.isObject(config.data)) {
                        if (Y.QueryString && Y.QueryString.stringify) {
                            rconf.body = Y.QueryString.stringify(config.data);
                        } else {
                        }
                    } else if (Y.Lang.isString(config.data)) {
                        rconf.body = config.data;
                    }
                    if (rconf.method === 'GET') {
                        rconf.uri += (rconf.uri.indexOf('?') > -1 ? '&' : '?') + rconf.body;
                        rconf.body = '';
                    }
                }
                if (config.headers) {
                    rconf.headers = config.headers;
                }
                if (config.timeout) {
                    rconf.timeout = config.timeout;
                }
                if (config.request) {
                    Y.mix(rconf, config.request);
                }
                Y.IO.request(rconf, function(err, data) {

                    if (err) {
                        transaction.c = err;
                        config.notify(((err.code === 'ETIMEDOUT') ? 'timeout' : 'failure'), transaction, config);
                        return;
                    }
                    if (data) {
                        transaction.c = {
                            status: data.statusCode,
                            statusCode: data.statusCode,
                            statusText: codes[data.statusCode],
                            headers: data.headers,
                            responseText: data.body,
                            responseXML: null,
                            getResponseHeader: function(name) {
                                return this.headers[name];
                            },
                            getAllResponseHeaders: function() {
                                return flatten(this.headers);
                            }
                        };
                    }

                    config.notify('complete', transaction, config);
                    config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);
                });
                
                var ret = {
                    io: transaction
                };
                return ret;
            }
        };
    };

    Y.IO.defaultTransport('nodejs');



}, '@VERSION@' ,{requires:['io-base']});
