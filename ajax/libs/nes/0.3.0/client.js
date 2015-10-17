/*
    hapi-nes WebSocket Client
    Copyright (c) 2015, Eran Hammer <eran@hammer.io> and other contributors
    BSD Licensed
*/


(function (root, factory) {

    // Export if used as a module

    // $lab:coverage:off$
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
    else if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof exports === 'object') {
        exports.nes = factory();
    }
    else {
        root.nes = factory();
    }
    // $lab:coverage:on$
})(this, function () {

    var ignore = function () { };

    // $lab:coverage:off$
    var WS = (typeof WebSocket === 'undefined' ? require('ws') : WebSocket);        // Using require vs proper UMD binding as we assume WebSocket is available through native bindings in all environments
    // $lab:coverage:on$

    var Client = function (url, options) {

        // Configuration

        this._url = url;
        this._settings = options;                   // node.js only

        // State

        this._ws = null;
        this._reconnection = null;
        this._ids = 0;                              // Id counter
        this._requests = {};                        // id -> callback
        this._subscriptions = {};                   // path -> [callbacks]

        // Events

        this.onError = console.error;               // General error callback (only when an error cannot be associated with a request)
        this.onConnect = ignore;                    // Called whenever a connection is established
        this.onBroadcast = ignore;
    };

    Client.prototype.connect = function (options, callback) {

        if (typeof options === 'function') {
            callback = arguments[0];
            options = {};
        }

        if (options.reconnect !== false) {                  // Defaults to true
            this._reconnection = {                          // Options: reconnect, delay, maxDelay
                wait: 0,
                delay: options.delay || 1000,               // 1 second
                maxDelay: options.maxDelay || 5000,         // 5 seconds
                auth: options.auth
            };
        }
        else {
            this._reconnection = null;
        }

        this._connect(options.auth, callback);
    };

    Client.prototype._connect = function (auth, callback) {

        var self = this;

        var ws = new WS(this._url, this._settings);         // Settings used by node.js only
        this._ws = ws;

        var sentCallback = false;
        ws.onopen = function () {

            if (!sentCallback) {
                sentCallback = true;
                return self._hello(auth, function (err) {

                    if (err) {
                        self.disconnect();                  // Stop reconnection when the hello message returns error
                        return callback(err);
                    }

                    self.onConnect();
                    return callback();
                });
            }
        };

        ws.onerror = function (err) {

            if (!sentCallback) {
                sentCallback = true;
                return callback(err);
            }

            return self.onError(err);
        };

        ws.onclose = function () {

            return self._onClose();
        };

        ws.onmessage = function (message) {

            return self._onMessage(message);
        };
    };

    Client.prototype.disconnect = function () {

        this._reconnection = null;

        if (!this._ws) {
            return;
        }

        if (this._ws.readyState === WS.OPEN ||
            this._ws.readyState === WS.CONNECTING) {

            this._ws.close();
        }
    };

    Client.prototype._onClose = function () {

        this._ws = null;

        // Flush pending requests

        var error = new Error('Request failed - server disconnected');

        var ids = Object.keys(this._requests);
        for (var i = 0, il = ids.length; i < il; ++i) {
            var id = ids[i];
            var callback = this._requests[id];
            delete this._requests[id];
            callback(error);
        }

        this._reconnect();
    };

    Client.prototype._reconnect = function () {

        var self = this;

        // Reconnect

        if (this._reconnection) {
            this._reconnection.wait += this._reconnection.delay;

            var timeout = Math.min(this._reconnection.wait, this._reconnection.maxDelay);
            setTimeout(function () {

                if (!self._reconnection) {
                    return;
                }

                self._connect(self._reconnection.auth, function (err) {

                    if (err) {
                        self.onError(err);
                        return self._reconnect();
                    }
                });
            }, timeout);
        }
    };

    Client.prototype.request = function (options, callback) {

        if (typeof options === 'string') {
            options = {
                method: 'GET',
                path: options
            };
        }

        var request = {
            type: 'request',
            method: options.method || 'GET',
            path: options.path,
            headers: options.headers,
            payload: options.payload
        };

        return this._send(request, callback);
    };

    Client.prototype.message = function (data, callback) {

        var request = {
            type: 'message',
            data: data
        };

        return this._send(request, callback);
    };

    Client.prototype._send = function (request, callback) {

        var self = this;

        callback = callback || ignore;

        if (!this._ws ||
            this._ws.readyState !== WS.OPEN) {

            return callback(new Error('Failed to send message - server disconnected'));
        }

        request.id = ++self._ids;
        stringify(request, function (err, encoded) {

            if (err) {
                return callback(err);
            }

            self._requests[request.id] = callback;

            try {
                self._ws.send(encoded);
            }
            catch (err) {
                delete self._requests[request.id];
                return callback(err);
            }
        });
    };

    Client.prototype.authenticate = function (auth, next) {

        if (!auth) {
            return next(new Error('Authentication missing credentials'));
        }

        return this._hello(auth, next);
    };

    Client.prototype._hello = function (auth, callback) {

        var request = {
            type: 'hello'
        };

        if (auth) {
            request.auth = auth;
        }

        var subs = this.subscriptions();
        if (subs.length) {
            request.subs = subs;
        }

        return this._send(request, callback);
    };

    Client.prototype.subscriptions = function () {

        return Object.keys(this._subscriptions);
    };

    Client.prototype.subscribe = function (path, handler) {

        var self = this;

        if (!path ||
            path[0] !== '/') {

            return handler(new Error('Invalid path'));
        }

        var subs = this._subscriptions[path];
        if (subs) {
            if (subs.indexOf(handler) === -1) {
                subs.push(handler);
            }

            return;
        }

        this._subscriptions[path] = [handler];

        if (!this._ws ||
            this._ws.readyState !== WS.OPEN) {

            return;
        }

        var request = {
            type: 'sub',
            path: path
        };

        return this._send(request, function (err) {

            return handler(err);                                // Only called if send failed to transmit
        });
    };

    Client.prototype.unsubscribe = function (path, handler) {

        var self = this;

        if (!path ||
            path[0] !== '/') {

            return handler(new Error('Invalid path'));
        }

        var subs = this._subscriptions[path];
        if (!subs) {
            return;
        }

        var sync = false;
        if (!handler) {
            delete this._subscriptions[path];
            sync = true;
        }
        else {
            var pos = subs.indexOf(handler);
            if (pos === -1) {
                return;
            }

            subs.splice(pos, 1);
            if (!subs.length) {
                delete this._subscriptions[path];
                sync = true;
            }
        }

        if (!sync ||
            !this._ws ||
            this._ws.readyState !== WS.OPEN) {

            return;
        }

        var request = {
            type: 'unsub',
            path: path
        };

        return this._send(request);         // Ignoring errors as the subscription handlers are already removed
    };

    Client.prototype._onMessage = function (message) {

        var self = this;

        parse(message.data, function (err, update) {

            if (err) {
                return self.onError(err);
            }

            // Broadcast

            if (update.type === 'broadcast') {
                return self.onBroadcast(update.message);
            }

            // Publish

            if (update.type === 'pub') {
                var handlers = self._subscriptions[update.path];
                if (handlers) {
                    for (var i = 0, il = handlers.length; i < il; ++i) {
                        handlers[i](null, update.message);
                    }
                }

                return;
            }

            // Lookup callback (message must include an id from this point)

            var callback = self._requests[update.id];
            delete self._requests[update.id];
            if (!callback) {
                return self.onError(new Error('Received response for missing request'));
            }

            // Subscriptions

            if (update.type === 'sub') {
                if (update.error) {
                    self._processSubscribeErrors(update);
                }

                return;
            }

            // Response

            if (update.type === 'response') {
                var error = (update.statusCode >= 400 && update.statusCode <= 599 ? new Error(update.payload.message) : null);
                return callback(error, update.payload, update.statusCode, update.headers);
            }

            // Custom message

            if (update.type === 'message') {
                return callback(update.error ? new Error(update.error) : null, update.data);
            }

            // Authentication

            if (update.type === 'hello') {
                if (update.subs) {
                    self._processSubscribeErrors(update.subs);
                }

                return callback(update.error ? new Error(update.error) : null);
            }

            return self.onError(new Error('Received unknown response type: ' + update.type));
        });
    };

    Client.prototype._processSubscribeErrors = function (updates) {

        updates = [].concat(updates);
        for (var u = 0, ul = updates.length; u < ul; ++u) {
            var update = updates[u];
            var handlers = this._subscriptions[update.path];
            if (handlers) {
                delete this._subscriptions[update.path];                        // Error means no longer subscribed

                for (var i = 0, il = handlers.length; i < il; ++i) {
                    handlers[i](new Error(update.error));
                }
            }
        }
    };

    var parse = function (message, next) {

        var obj = null;
        var error = null;

        try {
            obj = JSON.parse(message);
        }
        catch (err) {
            error = err;
        }

        return next(error, obj);
    };

    var stringify = function (message, next) {

        var string = null;
        var error = null;

        try {
            string = JSON.stringify(message);
        }
        catch (err) {
            error = err;
        }

        return next(error, string);
    };


    // Declare namespace

    var nes = {
        Client: Client
    };

    return nes;
});
