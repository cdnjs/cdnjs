(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.postRobot = factory();
    }
}(this, function () {

    function noop() {}

    if (!window.postMessage) {

        if (window.console && window.console.warn) {
            console.warn('Browser does not support window.postMessage');
        }

        return {
            request: noop,
            listen: noop,

            send: noop,
            on: noop,
            once: noop,

            proxy: noop,
            unproxy: noop,

            destroy: noop
        };
    }

    var POST_MESSAGE_REQUEST = 'postrobot_message_request';
    var POST_MESSAGE_RESPONSE = 'postrobot_message_response';
    var POST_MESSAGE_ACK = 'postrobot_message_ack';
    var POST_MESSAGE_PING = 'postrobot_message_ping';
    var POST_MESSAGE_PONG = 'postrobot_message_pong';

    var POST_MESSAGE_RESPONSE_ACK_SUCCESS = 'success';
    var POST_MESSAGE_RESPONSE_ACK_ERROR = 'error';

    var requestListeners = {};
    var responseHandlers = {};
    var proxies = [];

    var parent;

    if (window.opener) {
        parent = window.opener
    } else if (window.parent && window !== window.parent) {
        parent = window.parent;
    }

    function once(method) {
        if (!method) {
            return method;
        }
        var called = false;
        return function onceWrapper() {
            if (!called) {
                called = true;
                return method.apply(this, arguments);
            }
        }
    }

    function sendMessage(win, message) {
        console.error('%% send', message);

        win.postMessage(JSON.stringify(message), '*');
    }

    function postMessageRequest(options) {

        if (!options.window) {
            throw new Error('Expected options.window');
        }

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (typeof options.window === 'string') {
            var el = document.getElementById(options.window);

            if (!el) {
                throw new Error('Expected options.window ' + options.window + ' to be a valid element id');
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error('Expected options.window ' + options.window + ' to be an iframe');
            }

            options.window = el.contentWindow;
        }

        options.callback = once(options.callback);

        var promise;

        if (!options.callback && window.Promise) {
            promise = new window.Promise(function(resolve, reject) {
                options.callback = function(err, result) {
                    return err ? reject(err) : resolve(result);
                };
            });
        }

        var hash = options.name + '_' + Math.random().toString();
        responseHandlers[hash] = options;

        options.respond = once(function(err, response) {
            return options.callback(err, response);
        });

        if (!options.window.postMessage) {
            return options.respond(new Error('Target window does not have postMessage handler'));
        }

        if (options.window.closed) {
            return options.respond(new Error('Target window is closed'));
        }

        if (options.timeout) {
            setTimeout(function() {
                options.respond(new Error('Post message response timed out after ' + options.timeout + ' ms'));
            }, options.timeout);
        }

        try {
            sendMessage(options.window, {
                type: POST_MESSAGE_REQUEST,
                hash: hash,
                name: options.name,
                data: options.data || {}
            });
        } catch (err) {
            options.respond(err);
        }

        setTimeout(function() {
            if (!options.ack) {
                return options.respond(new Error('No ack for postMessage ' + options.name));
            }
        }, 50);

        return promise;
    }

    function quickPostMessageRequest(window, name, data, callback) {

        if (!callback && data instanceof Function) {
            callback = data;
            data = {};
        }

        return postMessageRequest({
            window: window,
            name: name,
            data: data,
            callback: callback
        });
    }

    function postMessageListen(options) {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (requestListeners[options.name]) {
            throw new Error('Post message response handler already registered: ' + options.name);
        }

        if (!options.handler) {
            throw new Error('Expected options.handler');
        }

        if (options.once) {
            options.handler = once(options.handler);
        }

        requestListeners[options.name] = options;

        if (options.window && options.errorOnClose) {
            var interval = setInterval(function() {
                if (options.window.closed) {
                    clearInterval(interval);
                    delete requestListeners[options.name];
                    options.handler(new Error('Post message target window is closed'), null, noop);
                }
            }, 50);
        }
    }

    function quickPostMessageListen(name, options, callback) {

        if (!callback && options instanceof Function) {
            callback = options;
            options = {};
        }

        options.name = name;
        options.handler = options.handler || callback;

        postMessageListen(options);
    }

    function quickPostMessageListenOnce(name, options, callback) {

        if (!callback && options instanceof Function) {
            callback = options;
            options = {};
        }

        options.once = true;

        quickPostMessageListen(name, options, callback);
    }

    var POST_MESSAGE_HANDLERS = {};

    POST_MESSAGE_HANDLERS[POST_MESSAGE_PING] = function(event, message) {

        sendMessage(event.source, {
            type: POST_MESSAGE_PONG,
            hash: message.hash
        });
    }

    POST_MESSAGE_HANDLERS[POST_MESSAGE_PONG] = function(event, message) {

    }

    POST_MESSAGE_HANDLERS[POST_MESSAGE_ACK] = function(event, message) {

        var options = responseHandlers[message.hash];

        if (!options) {
            throw new Error('No handler found for post message ack for message: ' + message.name + ' in ' + window.location.href);
        }

        options.ack = true;
    }

    POST_MESSAGE_HANDLERS[POST_MESSAGE_REQUEST] = function(event, message) {

        var proxy;

        var successResponse = once(function successResponse(response) {
            return sendMessage(event.source, {
                type: POST_MESSAGE_RESPONSE,
                ack: POST_MESSAGE_RESPONSE_ACK_SUCCESS,
                hash: message.hash,
                name: message.name,
                response: response || {},
                proxy: proxy
            });
        });

        var errorResponse = once(function errorResponse(err) {
            return sendMessage(event.source, {
                type: POST_MESSAGE_RESPONSE,
                ack: POST_MESSAGE_RESPONSE_ACK_ERROR,
                hash: message.hash,
                name: message.name,
                error: err.stack || err.toString(),
                proxy: proxy
            });
        });

        var options = requestListeners[message.name];

        if (!options) {
            return errorResponse(new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href));
        }

        if (options.window && options.window !== event.source) {
            return;
        }

        proxy = options.proxy;

        sendMessage(event.source, {
            type: POST_MESSAGE_ACK,
            hash: message.hash,
            name: message.name,
            proxy: proxy
        });

        if (options.once) {
            delete requestListeners[message.name];
        }

        var result;

        try {

            result = options.handler(null, message.data, function(err, response) {
                return err ? errorResponse(err) : successResponse(response);
            });

        } catch (err) {
            return errorResponse(err);
        }

        if (result && result.then instanceof Function) {
            return result.then(successResponse, errorResponse);

        } else if (options.handler.length <= 2) {
            return successResponse(result);
        }
    }

    POST_MESSAGE_HANDLERS[POST_MESSAGE_RESPONSE] = function(event, message) {

        var options = responseHandlers[message.hash];

        if (!options) {
            throw new Error('No response handler found for post message response ' + message.name + ' in ' + window.location.href);
        }

        delete responseHandlers[message.hash];

        if (message.ack === POST_MESSAGE_RESPONSE_ACK_ERROR) {
            return options.respond(message.error);
        } else if (message.ack === POST_MESSAGE_RESPONSE_ACK_SUCCESS) {
            return options.respond(null, message.response);
        }
    }

    function parseMessage(message) {

        try {
            message = JSON.parse(message);
        } catch (err) {
            return;
        }

        if (!message || !message.type) {
            return;
        }

        if (!POST_MESSAGE_HANDLERS[message.type]) {
            return;
        }

        return message;
    }

    function allowProxy(message) {

        if (!message) {
            return true;
        }

        if (message.proxy === false) {
            return false;
        }

        if (message.type === POST_MESSAGE_REQUEST && message.name && requestListeners[message.name] && requestListeners[message.name].proxy === false) {
            return false;
        }

        return true;
    }

    function postMessageListener(event) {

        var message = parseMessage(event.data);

        if (allowProxy(message)) {
            for (var i=0; i<proxies.length; i++) {
                if (event.source === proxies[i].from) {
                    return proxies[i].to.postMessage(event.data, '*');
                }
            }
        }

        if (!message) {
            return;
        }

        console.error('!! message', window.name, window.location.href, message.name, message);

        POST_MESSAGE_HANDLERS[message.type](event, message);
    };

    function proxy(window1, window2) {

        proxies.push({
            from: window1,
            to: window2
        });

        proxies.push({
            from: window2,
            to: window1
        });
    }

    function unproxy(window1, window2) {

        var toRemove = [];

        for (var i=0; i<proxies.length; i++) {
            var proxy = proxies[i];
            if ((proxy.to === window1 && proxy.from === window2) || (proxy.to === window2 && proxy.from === window1)) {
                toRemove.push(proxy);
            }
        }

        for (var i=0; i<toRemove.length; i++) {
            proxies.splice(proxies.indexOf(toRemove[i]), 1);
        }
    }

    if (window.addEventListener) {
        window.addEventListener('message', postMessageListener);
    } else {
        window.attachEvent('onmessage', postMessageListener)
    }

    function postMessageDestroy() {
        window.removeEventListener('message', postMessageListener);
    }

    return {
        request: postMessageRequest,
        listen: postMessageListen,

        send: quickPostMessageRequest,
        on: quickPostMessageListen,
        once: quickPostMessageListenOnce,

        sendToParent: function(name, data, callback) {
            return this.send(parent, name, data, callback);
        },

        proxy: proxy,
        unproxy: unproxy,

        destroy: postMessageDestroy,
        parent: parent
    };
}));
