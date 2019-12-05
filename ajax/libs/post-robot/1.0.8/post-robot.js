
(function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){G=t}function r(t){Q=t}function o(){return function(){process.nextTick(a)}}function i(){return function(){B(a)}}function s(){var t=0,e=new X(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){t.port2.postMessage(0)}}function c(){return function(){setTimeout(a,1)}}function a(){for(var t=0;J>t;t+=2){var e=tt[t],n=tt[t+1];e(n),tt[t]=void 0,tt[t+1]=void 0}J=0}function f(){try{var t=require,e=t("vertx");return B=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[rt]&&k(r);var o=n._state;if(o){var i=arguments[o-1];Q(function(){x(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(e){return ut.error=e,ut}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){Q(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===it?S(t,e._result):e._state===st?j(t,e._result):E(e,void 0,function(e){g(t,e)},function(e){j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===et&&constructor.resolve===nt?b(t,n):r===ut?j(t,ut.error):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,_()):t(n)?w(e,n,v(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===ot&&(t._result=e,t._state=it,0!==t._subscribers.length&&Q(T,t))}function j(t,e){t._state===ot&&(t._state=st,t._result=e,Q(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+it]=n,o[i+st]=r,0===i&&t._state&&Q(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ct.error=n,ct}}function x(t,n,r,o){var i,s,u,c,a=e(r);if(a){if(i=P(r,o),i===ct?(c=!0,s=i.error,i=null):u=!0,n===i)return void j(n,d())}else i=o,u=!0;n._state!==ot||(a&&u?g(n,i):c?j(n,s):t===it?S(n,i):t===st&&j(n,i))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return at++}function k(t){t[rt]=at++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t){return new _t(this,t).promise}function q(t){var e=this;return new e(I(t)?function(n,r){for(var o=t.length,i=0;o>i;i++)e.resolve(t[i]).then(n,r)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(t){this[rt]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&D(),this instanceof L?C(this,t):K())}function N(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[rt]||k(this.promise),Array.isArray(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,U())}function U(){return new Error("Array Methods must be provided an Array")}function W(){var t;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=pt)}var z;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B,G,H,I=z,J=0,Q=function(t,e){tt[J]=t,tt[J+1]=e,J+=2,2===J&&(G?G(a):H())},R="undefined"!=typeof window?window:void 0,V=R||{},X=V.MutationObserver||V.WebKitMutationObserver,Z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,tt=new Array(1e3);H=Z?o():X?s():$?u():void 0===R&&"function"==typeof require?f():c();var et=l,nt=h,rt=Math.random().toString(36).substring(16),ot=void 0,it=1,st=2,ut=new M,ct=new M,at=0,ft=Y,lt=q,ht=F,pt=L;L.all=ft,L.race=lt,L.resolve=nt,L.reject=ht,L._setScheduler=n,L._setAsap=r,L._asap=Q,L.prototype={constructor:L,then:et,"catch":function(t){return this.then(null,t)}};var _t=N;N.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===ot&&t>n;n++)this._eachEntry(e[n],n)},N.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===nt){var o=v(t);if(o===et&&t._state!==ot)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===pt){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){e(t)}),e)}else this._willSettleAt(r(t),e)},N.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===ot&&(this._remaining--,t===st?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},N.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){n._settledAt(it,e,t)},function(t){n._settledAt(st,e,t)})};var dt=W,vt={Promise:pt,polyfill:dt};"function"==typeof define&&define.amd?define(function(){return vt}):"undefined"!=typeof module&&module.exports?module.exports=vt:"undefined"!=typeof this&&(this.ES6Promise=vt),dt()}).call(this);

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.postRobot = factory();
    }
}(this, function () {

    var CONFIG = (function() {

        return {
            ALLOW_POSTMESSAGE_POPUP: true,
            DEBUG: false,
            ACK_TIMEOUT: 3000,
            LOG_TO_PAGE: false
        };
    })();

    var CONSTANTS = (function() {

        return {

            POST_MESSAGE_TYPE: {
                REQUEST: 'postrobot_message_request',
                RESPONSE: 'postrobot_message_response',
                ACK: 'postrobot_message_ack'
            },

            POST_MESSAGE_ACK: {
                SUCCESS: 'success',
                ERROR: 'error'
            },

            POST_MESSAGE_NAMES: {
                IDENTIFY: 'identify'
            },

            WINDOW_TYPES: {
                FULLPAGE: 'fullpage',
                POPUP: 'popup',
                IFRAME: 'iframe'
            },

            WINDOW_PROPS: {
                POSTROBOT: '__postRobot__'
            }
        };
    })();

    if (window[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
        throw new Error('Attempting to load postRobot twice on the same window');
    }

    var util = (function() {

        return {
            isPopup: function() {
                return Boolean(window.opener);
            },

            isIframe: function() {
                return Boolean(window.parent && window !== window.parent);
            },

            isFullpage: function() {
                return Boolean(!this.isIframe() && !this.isPopup());
            },


            windowReady: new Promise(function(resolve, reject) {
                if (document.readyState === 'complete') {
                    return resolve();
                }

                window.addEventListener('load', resolve);
            }),

            getType: function() {
                return this.isPopup() ? CONSTANTS.WINDOW_TYPES.POPUP : this.isIframe() ? CONSTANTS.WINDOW_TYPES.IFRAME : CONSTANTS.WINDOW_TYPES.FULLPAGE;
            },

            once: function(method) {
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
            },

            getParent: function() {
                if (this.isPopup()) {
                    return window.opener;
                }
                if (this.isIframe()) {
                    return window.parent;
                }
            },

            eachParent: function(method) {

                var win = window;

                while (true) {
                    var parent = win.opener || win.parent;

                    if (win === parent) {
                        return;
                    }

                    win = parent;

                    method(win);
                }
            },

            noop: function() {},

            getDomain: function() {
                return window.location.host;
            },

            clearLogs: function() {

                if (window.console && window.console.clear) {
                    window.console.clear();
                }

                if (CONFIG.LOG_TO_PAGE) {
                    var container = document.getElementById('postRobotLogs');

                    if (container) {
                        container.parentNode.removeChild(container);
                    }
                }
            },

            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById('postRobotLogs');

                    if (!container) {
                        var container = document.createElement('div');
                        container.id = 'postRobotLogs';
                        container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
                        document.body.appendChild(container);
                    }

                    var el = document.createElement('div');
                    var msg = (new Date()).toString().split(' ')[4] + ' ' + level + ' ' + util.map(args, function(item) {
                            if (typeof item === 'string') {
                                return item;
                            }
                            if (!item) {
                                return toString.call(item)
                            }
                            var json;
                            try {
                                json = JSON.stringify(item, 0, 2);
                            } catch(e) {
                                json = '[object]';
                            }

                            return '\n\n' + json + '\n\n';
                        }).join(' ');
                    el.innerHTML = msg;

                    var color = {
                        log: '#ddd',
                        warn: 'orange',
                        error: 'red',
                        info: 'blue',
                        debug: '#aaa'
                    }[level];

                    el.style.cssText = 'margin-top: 10px; color: ' + color + ';';

                    if (!container.childNodes.length) {
                        container.appendChild(el);
                    } else {
                        container.insertBefore(el, container.childNodes[0]);
                    }

                });
            },

            logLevel: function(level, args) {

                args = Array.prototype.slice.call(args);

                args.unshift(this.getDomain());
                args.unshift(this.getType().toLowerCase());
                args.unshift('[post-robot]');

                if (CONFIG.LOG_TO_PAGE) {
                    this.writeToPage(level, args);
                }

                if (!window.console) {
                    return;
                }

                if (!window.console[level]) {
                    level = 'log';
                }

                if (!window.console[level]) {
                    return;
                }

                window.console[level].apply(window.console, args);
            },

            log: function() {
                this.logLevel('info', arguments);
            },

            debug: function() {
                if (CONFIG.DEBUG) {
                    this.logLevel('debug', arguments);
                }
            },

            debugError: function() {
                if (CONFIG.DEBUG) {
                    this.logLevel('error', arguments);
                }
            },

            safeHasProp: function(obj, name) {
                try {
                    if (obj[name]) {
                        return true;
                    } else {
                        return false;
                    }
                } catch(err) {
                    return false;
                }
            },

            warn: function() {
                this.logLevel('warn', arguments);
            },

            error: function() {
                this.logLevel('error', arguments);
            },

            listen: function(win, event, handler) {
                if (win.addEventListener) {
                    win.addEventListener(event, handler);
                } else {
                    win.attachEvent('on' + event, handler)
                }

                return {
                    cancel: function() {
                        if (win.removeEventListener) {
                            win.removeEventListener(event, handler);
                        } else {
                            win.detachEvent('on' + event, handler);
                        }
                    }
                };
            },

            apply: function(method, context, args) {
                if (method.apply instanceof Function) {
                    return method.apply(context, args);
                }
                return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
            },

            find: function(collection, method, def) {
                if (!collection) {
                    return def;
                }
                for (var i=0; i<collection.length; i++) {
                    if (method(collection[i])) {
                        return collection[i];
                    }
                }
                return def;
            },

            map: function(collection, method) {
                var results = [];
                for (var i=0; i<collection.length; i++) {
                    results.push(method(collection[i]));
                }
                return results;
            },

            some: function(collection, method) {
                method = method || Boolean;
                for (var i=0; i<collection.length; i++) {
                    if (method(collection[i])) {
                        return true;
                    }
                }
                return false;
            },

            keys: function(mapping) {
                var result = [];
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key)) {
                        result.push(key);
                    };
                }
                return result;
            },

            values: function(mapping) {
                var result = [];
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key)) {
                        result.push(mapping[key]);
                    };
                }
                return result;
            },

            getByValue: function(mapping, value) {
                for (var key in mapping) {
                    if (mapping.hasOwnProperty(key) && mapping[key] === value) {
                        return key;
                    }
                }
            },

            uniqueID: function() {

                var chars = '0123456789abcdef';

                return 'xxxxxxxxxx'.replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            },

            isFrameOwnedBy: function(win, frame) {

                try {
                    if (frame.parent === win) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (err) {

                    try {
                        for (var i=0; i<win.frames.length; i++) {
                            if (win.frames[i] === frame) {
                                return true;
                            }
                        }
                    } catch(err2) {
                        return false;
                    }
                }

                return false;
            }
        };
    })();

    var promise = (function() {

        return {
            asyncPromise: function(method) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        try {
                            return method(resolve, reject);
                        } catch (err) {
                            return reject(err);
                        }
                    });
                });
            },

            run: function(method) {
                return Promise.resolve().then(method);
            },

            method: function(method) {
                return function promiseWrapper() {
                    var context = this;
                    var args = arguments;
                    return Promise.resolve().then(function() {
                        return method.apply(context, args);
                    });
                }
            },

            nodeify: function(promise, callback) {
                if (!callback) {
                    return promise;
                }
                promise.then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                });
            }
        }
    })();


    if (!window.postMessage) {

        util.warn('Browser does not support window.postMessage');

        return {
            request: util.noop,
            listen: util.noop,

            send: util.noop,
            on: util.noop,
            once: util.noop,

            proxy: util.noop,
            unproxy: util.noop,

            destroy: util.noop
        };
    }

    var windowID = window.name || util.uniqueID();
    util.debug('ID', windowID)

    var requestListeners = {};
    var responseHandlers = {};
    var proxies = [];
    var receivedMessages = [];

    var bridge;

    var mockMode = false;



    var childWindows = (function() {

        var windows = [];

        function getMap(key, value) {
            return util.find(windows, function(map) {
                return map[key] === value;
            }, {});
        };

        var lib = {

            getWindowId: function(win) {
                return getMap('win', win).id;
            },

            getWindowById: function(id) {
                return getMap('id', id).win;
            },

            getWindowType: function(win) {
                var map = getMap('win', win);

                if (map && map.type) {
                    return map.type;
                }

                if (util.safeHasProp(win, 'parent') && win.parent !== win) {
                    return CONSTANTS.WINDOW_TYPES.IFRAME;
                }

                if (util.safeHasProp(win, 'opener')) {
                    return CONSTANTS.WINDOW_TYPES.POPUP;
                }

                var isFrame = util.some(windows, function(win) {
                    return util.isFrameOwnedBy(win.win, win);
                });

                if (isFrame) {
                    return CONSTANTS.WINDOW_TYPES.IFRAME;
                }

                return;
            },

            register: function(id, win, type) {

                var existing = util.find(windows, function(map) {
                    return map.id === id && map.win === win;
                });

                if (existing) {
                    return;
                }

                util.debug('Registering window:', type, id, win);

                windows.push({
                    id: id,
                    win: win,
                    type: type
                });

                windows[id] = windows[id] || win;
            }
        };

        lib.register(windowID, window, util.getType());

        var openWindow = window.open;

        window.open = function(url, name, x, y) {

            if (!name) {
                name = util.uniqueID();
                arguments[1] = name;
            }

            var win = util.apply(openWindow, this, arguments);

            lib.register(name, win, CONSTANTS.WINDOW_TYPES.POPUP);
            return win
        };

        return lib
    })();



    function emulateIERestrictions(sourceWindow, targetWindow) {
        if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {

            var isIframeMessagingParent = childWindows.getWindowType(sourceWindow) === CONSTANTS.WINDOW_TYPES.IFRAME && util.isFrameOwnedBy(targetWindow, sourceWindow);
            var isParentMessagingIframe = childWindows.getWindowType(targetWindow) === CONSTANTS.WINDOW_TYPES.IFRAME && util.isFrameOwnedBy(sourceWindow, targetWindow);

            if (!isIframeMessagingParent && !isParentMessagingIframe) {
                if (sourceWindow === window) {
                    throw new Error('Can not send post messages to another window (disabled by config to emulate IE)');
                } else {
                    throw new Error('Can not receive post messages sent from another window (disabled by config to emulate IE)');
                }
            }
        }
    }




    var messageListener = util.listen(window, 'message', function messageListener(event) {

        try {
            emulateIERestrictions(event.source || event.sourceElement, window);
        } catch(err) {
            return util.error(err.stack || err.toString(), '\n\n', event.data);
        }

        receiveMessage(event.source || event.sourceElement, event.data);
    });

    function postMessageDestroy() {
        messageListener.cancel();
    }

    window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = {

        registerSelf: function(id, win, type) {
            childWindows.register(id, win, type);
        },

        postMessage: promise.method(function postMessage(source, data) {
            receiveMessage(source, data);
        }),

        postMessageParent: promise.method(function postMessageParent(source, message) {
            window.parent.postMessage(message, '*');
        })
    };



    function getBridge(win) {

        try {
            if (!win || !win.frames || !win.frames.length) {
                return;
            }

            for (var i=0; i<win.frames.length; i++) {
                try {
                    var frame = win.frames[i];

                    if (frame && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        return frame;
                    }

                } catch (err) {
                    continue;
                }
            }
        } catch (err) {
            return;
        }
    }


    function receiveMessage(source, data) {

        var message = parseMessage(data);

        if (!message) {
            return;
        }

        if (mockMode) {
            util.log('#receive', message.type, message.name, message);
            return POST_MESSAGE_HANDLERS[message.type](source, message);
        }

        if (allowProxy(message)) {
            for (var i=0; i<proxies.length; i++) {
                var proxy = proxies[i];

                if (source === proxy.from) {
                    delete message.target;
                    return sendMessage(proxy.to, message, true);
                }
            }
        }

        childWindows.register(message.source, source, message.windowType);

        if (receivedMessages.indexOf(message.id) === -1) {
            receivedMessages.push(message.id);
        } else {
            return;
        }

        if (message && message.target) {

            var win;

            if (message.target === 'parent.opener') {
                delete message.target;
                try {

                    win = window.parent.opener;
                    if (!win) {
                        throw new Error('window.parent.opener not found');
                    }

                } catch (err) {
                    util.error('Can not proxy to parent.opener');
                    throw err;
                }

            } else if (message.target !== windowID) {

                win = childWindows.getWindowById(message.target);

                if (!win) {
                    return util.warn('Unable to find window to proxy message to:', message.target, message);
                }
            }

            if (win) {
                return sendMessage(win, message, true);
            }
        }

        util.log('#receive', message.type, message.name, message);

        try {
            POST_MESSAGE_HANDLERS[message.type](source, message);
        } catch (err) {
            util.error(err.stack || err.toString());
        }
    }


    var sendMessage = promise.method(function sendMessage(win, message, isProxy) {

        message.id = message.id || util.uniqueID();
        message.source = windowID;
        message.originalSource = message.originalSource || windowID;
        message.windowType = util.getType();
        message.originalWindowType = message.originalWindowType || util.getType();

        if (!message.target) {
            message.target = childWindows.getWindowId(win);
        }

        util.log(isProxy ? '#proxy' : '#send', message.type, message.name, message);

        if (mockMode) {
            delete message.target;
            return receiveMessage(window, JSON.stringify(message));
        }

        if (win === window) {
            throw new Error('Attemping to send message to self');
        }

        util.debug('Waiting for window to be ready');

        return util.windowReady.then(function() {

            util.debug('Running send message strategies', message);

            return Promise.all(util.map(util.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {

                return SEND_MESSAGE_STRATEGIES[strategyName](win, message).then(function() {
                    util.debug(strategyName, 'success');
                    return true;
                }, function(err) {
                    util.debugError(strategyName, 'error\n\n', err.stack || err.toString());
                    return false;
                });

            })).then(function(results) {

                if (!util.some(results)) {
                    throw new Error('No post-message strategy succeeded');
                }
            });
        });
    });

    var SEND_MESSAGE_STRATEGIES = {

        POST_MESSAGE: promise.method(function postMessage(win, message) {

            emulateIERestrictions(window, win);

            return win.postMessage(JSON.stringify(message, 0, 2), '*');
        }),

        POST_MESSAGE_GLOBAL_METHOD: promise.method(function postMessageGlobalMethod(win, message) {

            if (!win[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                throw new Error('postRobot not found on window');
            }

            return win[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage(window, JSON.stringify(message, 0, 2));
        }),

        POST_MESSAGE_UP_THROUGH_BRIDGE: promise.method(function postMessageUpThroughBridge(win, message) {

            var frame = getBridge(win);

            if (!frame) {
                throw new Error('No bridge available in window');
            }

            return frame[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2));
        }),

        POST_MESSAGE_DOWN_THROUGH_BRIDGE: promise.method(function postMessageDownThroughBridge(win, message) {

            if (!bridge) {
                throw new Error('Bridge not initialized');
            }

            if (win === bridge.contentWindow) {
                throw new Error('Message target is bridge');
            }

            if (!message.target) {

                if (win === window.opener) {
                    message.target = 'parent.opener';
                } else {
                    throw new Error('Can not post message down through bridge without target');
                }
            }

            return bridge.then(function(iframe) {
                iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), '*');
            });
        })
    };




    function openBridge(url) {
        bridge = bridge || new window.Promise(function(resolve, reject) {

                util.debug('Opening bridge:', url);

                var iframe = document.createElement('iframe');

                iframe.setAttribute('id', 'postRobotBridge');

                iframe.setAttribute('style', 'margin: 0; padding: 0; border: 0px none; overflow: hidden;');
                iframe.setAttribute('frameborder', 0);
                iframe.setAttribute('border', 0);
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('allowTransparency', true);

                iframe.setAttribute('tabindex', -1);
                iframe.setAttribute('hidden', true);
                iframe.setAttribute('title', '');
                iframe.setAttribute('role', 'presentation');

                iframe.onload = function() {
                    resolve(iframe);
                };

                iframe.onerror = reject;

                iframe.src = url;
                document.body.appendChild(iframe);
            });

        return bridge;
    }




    function postMessageRequest(options) {

        return promise.nodeify(new Promise(function(resolve, reject) {

            if (!options.name) {
                throw new Error('Expected options.name');
            }

            if (!options.window) {
                throw new Error('Expected options.window');
            }


            if (mockMode) {
                options.window = window;

            } else if (typeof options.window === 'string') {
                var el = document.getElementById(options.window);

                if (!el) {
                    throw new Error('Expected options.window ' + options.window + ' to be a valid element id');
                }

                if (el.tagName.toLowerCase() !== 'iframe') {
                    throw new Error('Expected options.window ' + options.window + ' to be an iframe');
                }

                options.window = el.contentWindow;

                if (!options.window) {
                    throw new Error('Expected options.window');
                }
            }

            var hash = options.name + '_' + util.uniqueID();
            responseHandlers[hash] = options;

            if (options.window.closed) {
                throw new Error('Target window is closed');
            }

            if (options.timeout) {
                setTimeout(function() {
                    return reject(new Error('Post message response timed out after ' + options.timeout + ' ms'));
                }, options.timeout);
            }

            options.respond = function(err, result) {
                return err ? reject(err) : resolve(result);
            };

            sendMessage(options.window, {
                type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                hash: hash,
                name: options.name,
                data: options.data || {}
            })['catch'](reject);

            setTimeout(function() {
                if (!options.ack) {
                    return reject(new Error('No ack for postMessage ' + options.name));
                }
            }, CONFIG.ACK_TIMEOUT);

        }), options.callback);
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

        if (requestListeners[options.name] && !options.override && !mockMode) {
            throw new Error('Post message response handler already registered: ' + options.name);
        }

        if (!options.handler) {
            throw new Error('Expected options.handler');
        }

        options.errorHandler = options.errorHandler || util.noop;

        if (options.once) {
            options.handler = util.once(options.handler);
        }

        requestListeners[options.name] = options;

        options.handleError = function(err) {
            delete requestListeners[options.name];
            options.errorHandler(err);
        }

        if (options.window && options.errorOnClose) {
            var interval = setInterval(function() {
                if (options.window.closed) {
                    clearInterval(interval);
                    options.handleError(new Error('Post message target window is closed'));
                }
            }, 50);
        }

        return {
            cancel: function() {
                delete requestListeners[options.name];
            }
        };
    }

    function quickPostMessageListen(name, options, handler, errorHandler) {

        if (options instanceof Function) {
            errorHandler = handler;
            handler = options;
            options = {};
        }

        options.name = name;
        options.handler = handler || options.handler;
        options.errorHandler = errorHandler || options.errorHandler;

        return postMessageListen(options);
    }

    function quickPostMessageListenOnce(name, options, handler, errorHandler) {

        if (options instanceof Function) {
            errorHandler = handler;
            handler = options;
            options = {};
        }

        options.name = name;
        options.handler = handler || options.handler;
        options.errorHandler = errorHandler || options.errorHandler;
        options.once = true;

        return postMessageListen(options);
    }

    var POST_MESSAGE_HANDLERS = {};

    POST_MESSAGE_HANDLERS[CONSTANTS.POST_MESSAGE_TYPE.ACK] = function(source, message) {

        var options = responseHandlers[message.hash];

        if (!options) {
            throw new Error('No handler found for post message ack for message: ' + message.name + ' in ' + window.location.href);
        }

        options.ack = true;
    };

    POST_MESSAGE_HANDLERS[CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function(source, message) {

        var options = requestListeners[message.name];

        var target = childWindows.getWindowId(source);

        if (message.originalSource) {
            target = message.originalSource;
        }

        var successResponse = util.once(function successResponse(data) {

            try {
                return sendMessage(source, {
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    hash: message.hash,
                    name: message.name,
                    response: data || {},
                    target: target
                });
            } catch (err) {
                if (options) {
                    return options.handleError(err);
                } else {
                    throw err;
                }
            }
        });

        var errorResponse = util.once(function errorResponse(err) {

            return sendMessage(source, {
                type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                ack: CONSTANTS.POST_MESSAGE_ACK.ERROR,
                hash: message.hash,
                name: message.name,
                error: err.stack || err.toString(),
                target: target
            })['catch'](function(err) {
                if (options) {
                    return options.handleError(err);
                } else {
                    throw err;
                }
            });
        });

        if (!options) {
            return errorResponse(new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href));
        }

        if (options.window && source && options.window !== source) {
            return;
        }

        sendMessage(source, {
            type: CONSTANTS.POST_MESSAGE_TYPE.ACK,
            hash: message.hash,
            name: message.name,
            target: target
        })['catch'](function(err) {
            return options.handleError(err);
        });

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

    POST_MESSAGE_HANDLERS[CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function(source, message) {

        var options = responseHandlers[message.hash];

        if (!options) {
            throw new Error('No response handler found for post message response ' + message.name + ' in ' + window.location.href);
        }

        delete responseHandlers[message.hash];

        if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
            return options.respond(message.error);
        } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
            return options.respond(null, message.response);
        }
    };

    function parseMessage(message) {

        try {
            message = JSON.parse(message);
        } catch (err) {
            return;
        }

        if (!message.type) {
            return;
        }

        if (!POST_MESSAGE_HANDLERS[message.type]) {
            return;
        }

        return message;
    }

    function allowProxy(message) {

        if (mockMode) {
            return false;
        }

        if (!message) {
            return true;
        }

        if (message.type === CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && requestListeners[message.name] && requestListeners[message.name].proxy === false) {
            return false;
        }

        return true;
    }

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

    function reset() {
        requestListeners = {};
        responseHandlers = {};
        proxies = [];
    }

    function enableMockMode() {
        mockMode = true;
    }

    var propagate = (function() {

        return {
            init: function() {
                quickPostMessageListen(CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, function(err, data, callback) {
                    return {
                        id: windowID
                    };
                });

                var parent = util.getParent();

                if (parent) {
                    quickPostMessageRequest(parent, CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
                        id: windowID,
                        type: util.getType()
                    }).then(function(data) {
                        childWindows.register(data.id, parent, data.type);
                    }, function(err) {
                        util.error('Error sending identify:', err.stack || err.toString());
                    });
                }

                util.eachParent(function(parent) {

                    if (util.safeHasProp(parent, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                        parent[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(windowID, window, util.getType())
                    }

                    var parentBridge = getBridge(window.opener);

                    if (parentBridge && util.safeHasProp(parentBridge, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                        parentBridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(windowID, window, util.getType());
                    }
                });
            }
        }
    })();


    propagate.init();

    return {
        request: postMessageRequest,
        listen: postMessageListen,

        send: quickPostMessageRequest,
        on: quickPostMessageListen,
        once: quickPostMessageListenOnce,

        sendToParent: function(name, data, callback) {
            if (!util.getParent()) {
                throw new Error('Window does not have a parent');
            }

            return this.send(util.getParent(), name, data, callback);
        },

        proxy: proxy,
        unproxy: unproxy,

        enableMockMode: enableMockMode,

        reset: reset,

        openBridge: openBridge,

        destroy: postMessageDestroy,
        parent: util.getParent(),

        util: util
    };
}));
