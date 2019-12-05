window.postRobot = (function() {

    function noop() {}

    if (!window.addEventListener || !window.postMessage) {

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

            destroy: noop
        };
    }

    var POST_MESSAGE_REQUEST = 'post_message_request';
    var POST_MESSAGE_RESPONSE = 'post_message_response';
    var POST_MESSAGE_ACK = 'post_message_ack';

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
        var called = false;
        return function onceWrapper() {
            if (!called) {
                called = true;
                return method.apply(this, arguments);
            }
        }
    }

    function sendMessage(context, message) {
        context.postMessage(JSON.stringify(message), '*');
    }

    function postMessageRequest(options) {

        if (!options.window) {
            throw new Error('Expected options.window');
        }

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (!options.response) {
            throw new Error('Expected options.response');
        }

        options.response = once(options.response);

        var hash = Math.random().toString();
        responseHandlers[hash] = options;

        options.respond = once(function(err, response) {
            delete responseHandlers[hash];
            return options.response(err, response);
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
                return options.respond(new Error('No ack for postMessage'));
            }
        });
    }

    function quickPostMessageRequest(window, name, data, callback) {

        if (!callback) {
            callback = data;
            data = {};
        }

        return postMessageRequest({
            window: window,
            name: name,
            response: callback
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

        requestListeners[options.name] = options;

        if (options.window) {
            var interval = setInterval(function() {
                if (options.window.closed) {
                    clearInterval(interval);
                    delete requestListeners[options.name];

                    if (options.successOnClose) {
                        options.handler(null, null, noop);
                    } else {
                        options.handler(new Error('Post message target window is closed'), null, noop);
                    }
                }
            }, 50);
        }
    }

    function postMessageListenOnce(options) {
        return postMessageListen(options);
    }

    function quickPostMessageListen(name, callback) {
        return postMessageListen({
            name: name,
            handler: callback
        });
    }

    function quickPostMessageListenOnce(name, callback) {
        return postMessageListen({
            name: name,
            handler: callback,
            once: true
        });
    }

    function postMessageListener(event) {

        for (var i=0; i<proxies.length; i++) {
            if (event.source === proxies[i].from) {
                return proxies[i].to.postMessage(event.data, '*');
            }
        }

        var message;

        try {
            message = JSON.parse(event.data);
        } catch (err) {
            return;
        }

        if (!message || !message.type) {
            return;
        }

        if (message.type === POST_MESSAGE_ACK) {

            var options = responseHandlers[message.hash];

            if (!options) {
                throw new Error('No handler found for post message ack');
            }

            options.ack = true;

        } else if (message.type === POST_MESSAGE_REQUEST) {

            var successResponse = once(function successResponse(response) {
                return sendMessage(event.source, {
                    type: POST_MESSAGE_RESPONSE,
                    ack: POST_MESSAGE_RESPONSE_ACK_SUCCESS,
                    hash: message.hash,
                    name: message.name,
                    response: response || {}
                });
            });

            var errorResponse = once(function errorResponse(err) {
                return sendMessage(event.source, {
                    type: POST_MESSAGE_RESPONSE,
                    ack: POST_MESSAGE_RESPONSE_ACK_ERROR,
                    hash: message.hash,
                    name: message.name,
                    error: err.stack || err.toString()
                });
            });

            var listener = requestListeners[message.name];

            if (!listener) {
                return errorResponse(new Error('No postmessage request handler for ' + message.name));
            }

            if (listener.window && listener.window !== window) {
                return;
            }

            sendMessage(event.source, {
                type: POST_MESSAGE_ACK,
                hash: message.hash
            });

            if (listener.once) {
                delete requestListeners[message.name];
            }

            var result;

            try {

                result = listener.handler(null, message.data, function(err, response) {
                    return err ? errorResponse(err) : successResponse(response);
                });

            } catch (err) {
                return errorResponse(err);
            }

            if (result) {
                return successResponse(result);
            }

        } else if (message.type === POST_MESSAGE_RESPONSE) {

            var handler = responseHandlers[message.hash];

            if (!handler) {
                throw new Error('No handler found for post message response');
            }

            if (message.ack === POST_MESSAGE_RESPONSE_ACK_ERROR) {
                return handler.respond(message.error);
            } else if (message.ack === POST_MESSAGE_RESPONSE_ACK_SUCCESS) {
                return handler.respond(null, message.response);
            }
        }
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

    window.addEventListener('message', postMessageListener);

    function postMessageDestroy() {
        window.removeEventListener('message', postMessageListener);
    }

    return {
        request: postMessageRequest,
        listen: postMessageListen,

        send: quickPostMessageRequest,
        on: quickPostMessageListen,
        once: quickPostMessageListenOnce,

        proxy: proxy,

        destroy: postMessageDestroy,
        parent: parent
    };
})();