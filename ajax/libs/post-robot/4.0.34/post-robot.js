(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("postRobot", [], factory);
	else if(typeof exports === 'object')
		exports["postRobot"] = factory();
	else
		root["postRobot"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Promise = undefined;
	exports.init = init;
	exports.reset = reset;

	var _interface = __webpack_require__(1);

	Object.keys(_interface).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _interface[key];
	        }
	    });
	});

	var _lib = __webpack_require__(8);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _drivers = __webpack_require__(6);

	var _global = __webpack_require__(15);

	var _bridge = __webpack_require__(24);

	function init() {

	    if (!_global.global.initialized) {
	        (0, _drivers.listenForMessages)();
	        (0, _bridge.openTunnelToOpener)();
	        (0, _lib.initOnReady)();
	        (0, _lib.listenForMethods)();
	    }

	    _global.global.initialized = true;
	}

	init();

	function reset() {
	    return _global.global.clean.all().then(function () {
	        _global.global.initialized = false;
	        return init();
	    });
	}

	exports['default'] = module.exports;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.winutil = exports.util = exports.destroyBridges = exports.openTunnelToOpener = exports.needsBridgeForDomain = exports.needsBridgeForWin = exports.needsBridgeForBrowser = exports.needsBridge = exports.isBridge = exports.linkUrl = exports.openBridge = exports.parent = undefined;

	var _client = __webpack_require__(2);

	Object.keys(_client).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _client[key];
	    }
	  });
	});

	var _server = __webpack_require__(30);

	Object.keys(_server).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _server[key];
	    }
	  });
	});

	var _config = __webpack_require__(31);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _bridge = __webpack_require__(24);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});
	Object.defineProperty(exports, 'linkUrl', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.linkUrl;
	  }
	});
	Object.defineProperty(exports, 'isBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.isBridge;
	  }
	});
	Object.defineProperty(exports, 'needsBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridge;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForBrowser', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForBrowser;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForWin', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForWin;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForDomain', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForDomain;
	  }
	});
	Object.defineProperty(exports, 'openTunnelToOpener', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openTunnelToOpener;
	  }
	});
	Object.defineProperty(exports, 'destroyBridges', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.destroyBridges;
	  }
	});

	var _util = __webpack_require__(12);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});

	var _windows = __webpack_require__(14);

	var windowUtil = _interopRequireWildcard(_windows);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var parent = exports.parent = (0, _windows.getAncestor)();

	var winutil = exports.winutil = windowUtil;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.send = undefined;
	exports.request = request;
	exports.sendToParent = sendToParent;
	exports.client = client;

	var _conf = __webpack_require__(3);

	var _drivers = __webpack_require__(6);

	var _global = __webpack_require__(15);

	var _lib = __webpack_require__(8);

	function request(options) {

	    return _lib.promise.nodeify(new _lib.promise.Promise(function (resolve, reject) {

	        if (!options.name) {
	            throw new Error('Expected options.name');
	        }

	        if (!options.window) {
	            throw new Error('Expected options.window');
	        }

	        if (_conf.CONFIG.MOCK_MODE) {
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

	        options.domain = options.domain || '*';

	        var hash = options.name + '_' + _lib.util.uniqueID();
	        _global.global.clean.setItem(_global.global.listeners.response, hash, options);

	        if ((0, _lib.isWindowClosed)(options.window)) {
	            throw new Error('Target window is closed');
	        }

	        var hasResult = false;

	        options.respond = function (err, result) {
	            if (!err) {
	                hasResult = true;
	            }

	            return err ? reject(err) : resolve(result);
	        };

	        return _lib.promise.run(function () {

	            if ((0, _lib.isAncestor)(window, options.window)) {
	                return (0, _lib.onWindowReady)(options.window);
	            }
	        }).then(function () {

	            (0, _drivers.sendMessage)(options.window, {
	                hash: hash,
	                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
	                name: options.name,
	                data: options.data,
	                fireAndForget: options.fireAndForget
	            }, options.domain)['catch'](reject);

	            if (options.fireAndForget) {
	                return resolve();
	            }

	            var ackTimeout = _lib.util.intervalTimeout(_conf.CONFIG.ACK_TIMEOUT, 100, function (remaining) {

	                if (options.ack || (0, _lib.isWindowClosed)(options.window)) {
	                    return ackTimeout.cancel();
	                }

	                if (!remaining) {
	                    return reject(new Error('No ack for postMessage ' + options.name + ' in ' + _conf.CONFIG.ACK_TIMEOUT + 'ms'));
	                }
	            });

	            if (options.timeout) {
	                (function () {
	                    var timeout = _lib.util.intervalTimeout(options.timeout, 100, function (remaining) {

	                        if (hasResult || (0, _lib.isWindowClosed)(options.window)) {
	                            return timeout.cancel();
	                        }

	                        if (!remaining) {
	                            return reject(new Error('Post message response timed out after ' + options.timeout + ' ms'));
	                        }
	                    }, options.timeout);
	                })();
	            }
	        })['catch'](reject);
	    }), options.callback);
	}

	function _send(window, name, data, options, callback) {

	    if (!callback) {
	        if (!options && typeof data === 'function') {
	            callback = data;
	            options = {};
	            data = {};
	        } else if (typeof options === 'function') {
	            callback = options;
	            options = {};
	        }
	    }

	    options = options || {};
	    options.window = window;
	    options.name = name;
	    options.data = data;
	    options.callback = callback;

	    return request(options);
	}

	exports.send = _send;
	function sendToParent(name, data, options, callback) {

	    var win = (0, _lib.getAncestor)();

	    if (!win) {
	        return new _lib.promise.Promise(function (resolve, reject) {
	            return reject(new Error('Window does not have a parent'));
	        });
	    }

	    return _send(win, name, data, options, callback);
	}

	function client() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	    if (!options.window) {
	        throw new Error('Expected options.window');
	    }

	    return {
	        send: function send(name, data, callback) {
	            return _send(options.window, name, data, options, callback);
	        }
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(4);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _constants = __webpack_require__(5);

	Object.keys(_constants).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _constants[key];
	    }
	  });
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CONFIG = undefined;

	var _ALLOWED_POST_MESSAGE;

	var _constants = __webpack_require__(5);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP:  false ? false : true,

	    LOG_LEVEL: 'info',

	    BRIDGE_TIMEOUT: 5000,
	    ACK_TIMEOUT: 1000,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, true), _ALLOWED_POST_MESSAGE)
	};

	if (window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) === 0) {
	    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONSTANTS = exports.CONSTANTS = {

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
	        METHOD: 'postrobot_method',
	        READY: 'postrobot_ready',
	        OPEN_TUNNEL: 'postrobot_open_tunnel'
	    },

	    WINDOW_TYPES: {
	        FULLPAGE: 'fullpage',
	        POPUP: 'popup',
	        IFRAME: 'iframe'
	    },

	    WINDOW_PROPS: {
	        POSTROBOT: '__postRobot__'
	    },

	    SERIALIZATION_TYPES: {
	        METHOD: 'postrobot_method',
	        ERROR: 'postrobot_error'
	    },

	    SEND_STRATEGIES: {
	        POST_MESSAGE: 'postrobot_post_message',
	        BRIDGE: 'postrobot_bridge',
	        GLOBAL: 'postrobot_global'
	    },

	    MOCK_PROTOCOL: 'mock:',
	    FILE_PROTOCOL: 'file:',

	    BRIDGE_NAME_PREFIX: '__postrobot_bridge__',
	    POSTROBOT_PROXY: '__postrobot_proxy__'
	};

	var POST_MESSAGE_NAMES_LIST = exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function (key) {
	    return CONSTANTS.POST_MESSAGE_NAMES[key];
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(7);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(22);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(29);

	Object.keys(_listeners).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _listeners[key];
	    }
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.receiveMessage = receiveMessage;
	exports.messageListener = messageListener;
	exports.listenForMessages = listenForMessages;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _compat = __webpack_require__(19);

	var _global = __webpack_require__(15);

	var _types = __webpack_require__(21);

	_global.global.receivedMessages = _global.global.receivedMessages || [];

	function parseMessage(message) {

	    try {
	        message = (0, _lib.jsonParse)(message);
	    } catch (err) {
	        return;
	    }

	    if (!message) {
	        return;
	    }

	    message = message[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

	    if (!message) {
	        return;
	    }

	    if (!message.type) {
	        return;
	    }

	    if (!_types.RECEIVE_MESSAGE_TYPES[message.type]) {
	        return;
	    }

	    return message;
	}

	function receiveMessage(event) {

	    if (!window || window.closed) {
	        throw new Error('Message recieved in closed window');
	    }

	    try {
	        if (!event.source) {
	            return;
	        }
	    } catch (err) {
	        return;
	    }

	    var source = event.source;
	    var origin = event.origin;
	    var data = event.data;


	    var message = parseMessage(data);

	    if (!message) {
	        return;
	    }

	    if (message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0 || message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
	        origin = message.sourceDomain;
	    }

	    if (_global.global.receivedMessages.indexOf(message.id) === -1) {
	        _global.global.clean.push(_global.global.receivedMessages, message.id);
	    } else {
	        return;
	    }

	    var level = void 0;

	    if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
	        level = 'debug';
	    } else if (message.ack === 'error') {
	        level = 'error';
	    } else {
	        level = 'info';
	    }

	    _lib.log.logLevel(level, ['\n\n\t', '#receive', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', origin, '\n\n', message]);

	    if ((0, _lib.isWindowClosed)(source)) {
	        return _lib.log.debug('Source window is closed - can not send ' + message.type + ' ' + message.name);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(source, origin, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
	}

	function messageListener(event) {

	    try {
	        event.source; // eslint-disable-line
	    } catch (err) {
	        return;
	    }

	    event = {
	        source: event.source || event.sourceElement,
	        origin: event.origin || event.originalEvent.origin,
	        data: event.data
	    };

	    try {
	        (0, _compat.emulateIERestrictions)(event.source, window);
	    } catch (err) {
	        return;
	    }

	    receiveMessage(event);
	}

	function listenForMessages() {
	    var listener = _lib.util.listen(window, 'message', messageListener);

	    _global.global.clean.register('listener', function () {
	        listener.cancel();
	    });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(9);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(12);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _log = __webpack_require__(13);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
	    }
	  });
	});

	var _windows = __webpack_require__(14);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

	var _methods = __webpack_require__(17);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

	var _tick = __webpack_require__(11);

	Object.keys(_tick).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tick[key];
	    }
	  });
	});

	var _ready = __webpack_require__(18);

	Object.keys(_ready).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ready[key];
	    }
	  });
	});

	var _cleanup = __webpack_require__(16);

	Object.keys(_cleanup).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cleanup[key];
	    }
	  });
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(10);

	var _tick = __webpack_require__(11);

	var Promise = exports.Promise = _promise.SyncPromise;

	var promise = exports.promise = {

	    Promise: Promise,

	    run: function run(method) {
	        return Promise.resolve().then(method);
	    },
	    nextTick: function nextTick(method) {
	        return new Promise(function (resolve, reject) {
	            (0, _tick.nextTick)(function () {
	                return promise.run(method).then(resolve, reject);
	            });
	        });
	    },
	    method: function method(_method) {
	        return function promiseWrapper() {
	            var _this = this,
	                _arguments = arguments;

	            return Promise.resolve().then(function () {
	                return _method.apply(_this, _arguments);
	            });
	        };
	    },
	    nodeify: function nodeify(prom, callback) {
	        if (!callback) {
	            return prom;
	        }
	        prom.then(function (result) {
	            callback(null, result);
	        }, function (err) {
	            callback(err);
	        });
	    },
	    deNodeify: function deNodeify(method) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        return new Promise(function (resolve, reject) {
	            try {
	                if (args.length < method.length) {
	                    return method.apply(undefined, args.concat([function (err, result) {
	                        return err ? reject(err) : resolve(result);
	                    }]));
	                }

	                return promise.run(function () {
	                    return method.apply(undefined, args);
	                }).then(resolve, reject);
	            } catch (err) {
	                return reject(err);
	            }
	        });
	    },
	    map: function map(items, method) {

	        var results = [];

	        var _loop = function _loop(i) {
	            results.push(promise.run(function () {
	                return method(items[i]);
	            }));
	        };

	        for (var i = 0; i < items.length; i++) {
	            _loop(i);
	        }
	        return Promise.all(results);
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.patchPromise = patchPromise;

	function trycatch(method, successHandler, errorHandler) {

	    var isCalled = false;
	    var isSuccess = false;
	    var isError = false;
	    var err, res;

	    function flush() {
	        if (isCalled) {
	            if (isError) {
	                return errorHandler(err);
	            } else if (isSuccess) {
	                return successHandler(res);
	            }
	        }
	    }

	    try {
	        method(function (result) {
	            res = result;
	            isSuccess = true;
	            flush();
	        }, function (error) {
	            err = error;
	            isError = true;
	            flush();
	        });
	    } catch (error) {
	        return errorHandler(error);
	    }

	    isCalled = true;
	    flush();
	}

	var possiblyUnhandledPromiseHandlers = [];
	var possiblyUnhandledPromises = [];
	var possiblyUnhandledPromiseTimeout;

	function addPossiblyUnhandledPromise(promise) {
	    possiblyUnhandledPromises.push(promise);
	    possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
	}

	function flushPossiblyUnhandledPromises() {
	    possiblyUnhandledPromiseTimeout = null;
	    var promises = possiblyUnhandledPromises;
	    possiblyUnhandledPromises = [];
	    for (var i = 0; i < promises.length; i++) {
	        var promise = promises[i];

	        if (!promise.hasHandlers) {
	            promise.handlers.push({
	                onError: function onError(err) {
	                    if (!promise.hasHandlers) {
	                        logError(err);

	                        for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) {
	                            possiblyUnhandledPromiseHandlers[j](promise.value);
	                        }
	                    }
	                }
	            });

	            promise.dispatch();
	        }
	    }
	}

	var loggedErrors = [];

	function logError(err) {

	    if (loggedErrors.indexOf(err) !== -1) {
	        return;
	    }

	    loggedErrors.push(err);

	    setTimeout(function () {
	        throw err;
	    }, 1);
	}

	var toString = {}.toString;

	function isPromise(item) {
	    try {
	        if (!item) {
	            return false;
	        }

	        if (window.Window && item instanceof window.Window) {
	            return false;
	        }

	        if (window.constructor && item instanceof window.constructor) {
	            return false;
	        }

	        if (toString) {
	            var name = toString.call(item);

	            if (name === '[object Window]' || name === '[object global]' || name === '[object DOMWindow]') {
	                return false;
	            }
	        }

	        if (item && item.then instanceof Function) {
	            return true;
	        }
	    } catch (err) {
	        return false;
	    }

	    return false;
	}

	var SyncPromise = exports.SyncPromise = function SyncPromise(handler) {

	    this.resolved = false;
	    this.rejected = false;

	    this.hasHandlers = false;

	    this.handlers = [];

	    addPossiblyUnhandledPromise(this);

	    if (!handler) {
	        return;
	    }

	    var self = this;

	    trycatch(handler, function (res) {
	        return self.resolve(res);
	    }, function (err) {
	        return self.reject(err);
	    });
	};

	SyncPromise.resolve = function SyncPromiseResolve(value) {

	    if (isPromise(value)) {
	        return value;
	    }

	    return new SyncPromise().resolve(value);
	};

	SyncPromise.reject = function SyncPromiseResolve(error) {
	    return new SyncPromise().reject(error);
	};

	SyncPromise.prototype.resolve = function (result) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (isPromise(result)) {
	        throw new Error('Can not resolve promise with another promise');
	    }

	    this.resolved = true;
	    this.value = result;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.reject = function (error) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (isPromise(error)) {
	        throw new Error('Can not reject promise with another promise');
	    }

	    this.rejected = true;
	    this.value = error;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.asyncReject = function (error) {
	    this.hasHandlers = true;
	    return this.reject(error);
	};

	SyncPromise.prototype.dispatch = function () {
	    var _this = this;

	    if (!this.resolved && !this.rejected) {
	        return;
	    }

	    var _loop = function _loop() {

	        var handler = _this.handlers.shift();

	        try {
	            if (_this.resolved) {
	                result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value;
	            } else {
	                if (handler.onError) {
	                    result = handler.onError(_this.value);
	                } else {
	                    error = _this.value;
	                }
	            }
	        } catch (err) {
	            error = err;
	        }

	        if (result === _this) {
	            throw new Error('Can not return a promise from the the then handler of the same promise');
	        }

	        if (!handler.promise) {
	            return 'continue';
	        }

	        if (error) {
	            handler.promise.reject(error);
	        } else if (isPromise(result)) {
	            result.then(function (res) {
	                handler.promise.resolve(res);
	            }, function (err) {
	                handler.promise.reject(err);
	            });
	        } else {
	            handler.promise.resolve(result);
	        }
	    };

	    while (this.handlers.length) {
	        var result, error;

	        var _ret = _loop();

	        if (_ret === 'continue') continue;
	    }
	};

	SyncPromise.prototype.then = function (onSuccess, onError) {

	    if (onSuccess && typeof onSuccess !== 'function' && !onSuccess.call) {
	        throw new Error('Promise.then expected a function for success handler');
	    }

	    if (onError && typeof onError !== 'function' && !onError.call) {
	        throw new Error('Promise.then expected a function for error handler');
	    }

	    var promise = new SyncPromise(null, this);

	    this.handlers.push({
	        promise: promise,
	        onSuccess: onSuccess,
	        onError: onError
	    });

	    this.hasHandlers = true;

	    this.dispatch();

	    return promise;
	};

	SyncPromise.prototype['catch'] = function (onError) {
	    return this.then(null, onError);
	};

	SyncPromise.prototype['finally'] = function (handler) {
	    return this.then(function (result) {
	        return SyncPromise['try'](handler).then(function () {
	            return result;
	        });
	    }, function (err) {
	        return SyncPromise['try'](handler).then(function () {
	            throw err;
	        });
	    });
	};

	SyncPromise.all = function (promises) {

	    var promise = new SyncPromise();
	    var count = promises.length;
	    var results = [];

	    var _loop2 = function _loop2(i) {

	        var prom = isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i]);

	        prom.then(function (result) {
	            results[i] = result;
	            count -= 1;
	            if (count === 0) {
	                promise.resolve(results);
	            }
	        }, function (err) {
	            promise.reject(err);
	        });
	    };

	    for (var i = 0; i < promises.length; i++) {
	        _loop2(i);
	    }

	    if (!count) {
	        promise.resolve(results);
	    }

	    return promise;
	};

	SyncPromise.onPossiblyUnhandledException = function syncPromiseOnPossiblyUnhandledException(handler) {
	    possiblyUnhandledPromiseHandlers.push(handler);
	};

	SyncPromise['try'] = function syncPromiseTry(method) {
	    return SyncPromise.resolve().then(method);
	};

	SyncPromise.delay = function syncPromiseDelay(delay) {
	    return new SyncPromise(function (resolve) {
	        setTimeout(resolve, delay);
	    });
	};

	SyncPromise.hash = function (obj) {

	    var results = {};
	    var promises = [];

	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            promises.push(SyncPromise.resolve(obj[key]).then(function (result) {
	                results[key] = result;
	            }));
	        }
	    }

	    return SyncPromise.all(promises).then(function () {
	        return results;
	    });
	};

	function patchPromise() {
	    window.Promise = SyncPromise;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = nextTick;

	var _util = __webpack_require__(12);

	var tickMessageName = '__nextTick__postRobot__' + _util.util.uniqueID();
	var queue = [];

	window.addEventListener('message', function (event) {
	    if (event.data === tickMessageName) {
	        var method = queue.shift();
	        method.call();
	    }
	});

	function nextTick(method) {

	    queue.push(method);
	    window.postMessage(tickMessageName, '*');
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.util = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _conf = __webpack_require__(3);

	var util = exports.util = {
	    once: function once(method) {
	        if (!method) {
	            return method;
	        }
	        var called = false;
	        return function onceWrapper() {
	            if (!called) {
	                called = true;
	                return method.apply(this, arguments);
	            }
	        };
	    },
	    noop: function noop() {},
	    // eslint-disable-line no-empty-function

	    safeHasProp: function safeHasProp(obj, name) {
	        try {
	            if (obj[name]) {
	                return true;
	            } else {
	                return false;
	            }
	        } catch (err) {
	            return false;
	        }
	    },
	    safeGetProp: function safeGetProp(obj, name) {
	        try {
	            return obj[name];
	        } catch (err) {
	            return;
	        }
	    },
	    listen: function listen(win, event, handler) {
	        if (win.addEventListener) {
	            win.addEventListener(event, handler);
	        } else {
	            win.attachEvent('on' + event, handler);
	        }

	        return {
	            cancel: function cancel() {
	                if (win.removeEventListener) {
	                    win.removeEventListener(event, handler);
	                } else {
	                    win.detachEvent('on' + event, handler);
	                }
	            }
	        };
	    },
	    apply: function apply(method, context, args) {
	        if (typeof method.apply === 'function') {
	            return method.apply(context, args);
	        }
	        return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
	    },
	    find: function find(collection, method, def) {
	        if (!collection) {
	            return def;
	        }
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return collection[i];
	            }
	        }
	        return def;
	    },
	    map: function map(collection, method) {
	        var results = [];
	        for (var i = 0; i < collection.length; i++) {
	            results.push(method(collection[i]));
	        }
	        return results;
	    },
	    some: function some(collection, method) {
	        method = method || Boolean;
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return true;
	            }
	        }
	        return false;
	    },
	    keys: function keys(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(key);
	            }
	        }
	        return result;
	    },
	    values: function values(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(mapping[key]);
	            }
	        }
	        return result;
	    },
	    getByValue: function getByValue(mapping, value) {
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key) && mapping[key] === value) {
	                return key;
	            }
	        }
	    },
	    uniqueID: function uniqueID() {

	        var chars = '0123456789abcdef';

	        return 'xxxxxxxxxx'.replace(/./g, function () {
	            return chars.charAt(Math.floor(Math.random() * chars.length));
	        });
	    },
	    memoize: function memoize(method) {

	        var results = {};

	        return function memoized() {
	            var args = JSON.stringify(Array.prototype.slice.call(arguments));
	            if (!results.hasOwnProperty(args)) {
	                results[args] = method.apply(this, arguments);
	            }
	            return results[args];
	        };
	    },
	    extend: function extend(obj, source) {
	        if (!source) {
	            return obj;
	        }

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                obj[key] = source[key];
	            }
	        }

	        return obj;
	    },
	    each: function each(obj, callback) {
	        if (Array.isArray(obj)) {
	            for (var i = 0; i < obj.length; i++) {
	                callback(obj[i], i);
	            }
	        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    callback(obj[key], key);
	                }
	            }
	        }
	    },
	    replaceObject: function replaceObject(obj, callback) {
	        var depth = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];


	        if (depth >= 100) {
	            throw new Error('Self-referential object passed, or object contained too many layers');
	        }

	        var newobj = Array.isArray(obj) ? [] : {};

	        util.each(obj, function (item, key) {

	            var result = callback(item, key);

	            if (result !== undefined) {
	                newobj[key] = result;
	            } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	                newobj[key] = util.replaceObject(item, callback, depth + 1);
	            } else {
	                newobj[key] = item;
	            }
	        });

	        return newobj;
	    },
	    safeInterval: function safeInterval(method, time) {
	        var timeout = void 0;

	        function runInterval() {
	            timeout = setTimeout(runInterval, time);
	            method.call();
	        }

	        timeout = setTimeout(runInterval, time);

	        return {
	            cancel: function cancel() {
	                clearTimeout(timeout);
	            }
	        };
	    },
	    intervalTimeout: function intervalTimeout(time, interval, method) {

	        var safeInterval = util.safeInterval(function () {
	            time -= interval;

	            time = time <= 0 ? 0 : time;

	            if (time === 0) {
	                safeInterval.cancel();
	            }

	            method(time);
	        }, interval);

	        return safeInterval;
	    },
	    getDomain: function getDomain(win) {

	        win = win || window;

	        if (win.mockDomain && win.mockDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	            return win.mockDomain;
	        }

	        if (!win.location.protocol) {
	            throw new Error('Can not read window protocol');
	        }

	        if (win.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) {
	            return win.location.protocol + '//' + win.location.host;
	        }

	        if (!win.location.host) {
	            throw new Error('Can not read window host');
	        }

	        return win.location.protocol + '//' + win.location.host;
	    },
	    getDomainFromUrl: function getDomainFromUrl(url) {

	        var domain = void 0;

	        if (url.match(/^(https?|mock|file):\/\//)) {
	            domain = url;
	        } else {
	            return this.getDomain();
	        }

	        domain = domain.split('/').slice(0, 3).join('/');

	        return domain;
	    },
	    safeGet: function safeGet(obj, prop) {

	        var result = void 0;

	        try {
	            result = obj[prop];
	        } catch (err) {
	            // pass
	        }

	        return result;
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.log = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _util = __webpack_require__(12);

	var _windows = __webpack_require__(14);

	var _conf = __webpack_require__(3);

	var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

	if (Function.prototype.bind && window.console && _typeof(console.log) === 'object') {
	    ['log', 'info', 'warn', 'error'].forEach(function (method) {
	        console[method] = this.bind(console[method], console);
	    }, Function.prototype.call);
	}

	var log = exports.log = {
	    clearLogs: function clearLogs() {

	        if (window.console && window.console.clear) {
	            window.console.clear();
	        }

	        if (_conf.CONFIG.LOG_TO_PAGE) {
	            var container = document.getElementById('postRobotLogs');

	            if (container) {
	                container.parentNode.removeChild(container);
	            }
	        }
	    },
	    writeToPage: function writeToPage(level, args) {
	        setTimeout(function () {
	            var container = document.getElementById('postRobotLogs');

	            if (!container) {
	                container = document.createElement('div');
	                container.id = 'postRobotLogs';
	                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
	                document.body.appendChild(container);
	            }

	            var el = document.createElement('div');

	            var date = new Date().toString().split(' ')[4];

	            var payload = _util.util.map(args, function (item) {
	                if (typeof item === 'string') {
	                    return item;
	                }
	                if (!item) {
	                    return Object.prototype.toString.call(item);
	                }
	                var json = void 0;
	                try {
	                    json = (0, _windows.jsonStringify)(item, 0, 2);
	                } catch (e) {
	                    json = '[object]';
	                }

	                return '\n\n' + json + '\n\n';
	            }).join(' ');

	            var msg = date + ' ' + level + ' ' + payload;
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
	    logLevel: function logLevel(level, args) {

	        try {
	            if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(_conf.CONFIG.LOG_LEVEL)) {
	                return;
	            }

	            args = Array.prototype.slice.call(args);

	            args.unshift('' + window.location.host + window.location.pathname);
	            args.unshift('::');
	            args.unshift('' + (0, _windows.getWindowType)().toLowerCase());
	            args.unshift('[post-robot]');

	            if (_conf.CONFIG.LOG_TO_PAGE) {
	                log.writeToPage(level, args);
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
	        } catch (err) {
	            // pass
	        }
	    },
	    debug: function debug() {
	        log.logLevel('debug', arguments);
	    },
	    info: function info() {
	        log.logLevel('info', arguments);
	    },
	    warn: function warn() {
	        log.logLevel('warn', arguments);
	    },
	    error: function error() {
	        log.logLevel('error', arguments);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isSameDomain = isSameDomain;
	exports.getOpener = getOpener;
	exports.getParent = getParent;
	exports.getParents = getParents;
	exports.isAncestorParent = isAncestorParent;
	exports.getFrames = getFrames;
	exports.getAllChildFrames = getAllChildFrames;
	exports.getAllFramesInWindow = getAllFramesInWindow;
	exports.getTop = getTop;
	exports.isWindowClosed = isWindowClosed;
	exports.getUserAgent = getUserAgent;
	exports.getFrameByName = getFrameByName;
	exports.findChildFrameByName = findChildFrameByName;
	exports.findFrameByName = findFrameByName;
	exports.isParent = isParent;
	exports.isOpener = isOpener;
	exports.getAncestor = getAncestor;
	exports.getAncestors = getAncestors;
	exports.isAncestor = isAncestor;
	exports.isPopup = isPopup;
	exports.isIframe = isIframe;
	exports.isFullpage = isFullpage;
	exports.getWindowType = getWindowType;
	exports.isSameTopWindow = isSameTopWindow;
	exports.jsonStringify = jsonStringify;
	exports.jsonParse = jsonParse;

	var _util = __webpack_require__(12);

	var _global = __webpack_require__(15);

	var _conf = __webpack_require__(3);

	_global.global.domainMatches = _global.global.domainMatches || [];

	var domainMatchTimeout = void 0;

	function isSameDomain(win) {

	    for (var _iterator = _global.global.domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var _match = _ref;

	        if (_match.win === win) {
	            return _match.match;
	        }
	    }

	    var match = void 0;

	    try {
	        if (_util.util.getDomain(window) === _util.util.getDomain(win)) {
	            match = true;
	        } else {
	            match = false;
	        }
	    } catch (err) {
	        match = false;
	    }

	    _global.global.clean.push(_global.global.domainMatches, { win: win, match: match });

	    if (!domainMatchTimeout) {
	        domainMatchTimeout = setTimeout(function () {
	            _global.global.domainMatches = [];
	            domainMatchTimeout = null;
	        }, 1);
	    }

	    return match;
	}

	function getOpener(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        return win.opener;
	    } catch (err) {
	        return;
	    }
	}

	function getParent(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        if (win.parent && win.parent !== win) {
	            return win.parent;
	        }
	    } catch (err) {
	        return;
	    }
	}

	function getParents(win) {

	    var result = [];

	    try {

	        while (win.parent !== win) {
	            result.push(win.parent);
	            win = win.parent;
	        }
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	function isAncestorParent(parent, child) {

	    if (!parent || !child) {
	        return false;
	    }

	    var childParent = getParent(child);

	    if (childParent) {
	        return childParent === parent;
	    }

	    if (getParents(child).indexOf(parent) !== -1) {
	        return true;
	    }

	    return false;
	}

	function getFrames(win) {

	    var result = [];

	    var frames = void 0;

	    try {
	        frames = win.frames;
	    } catch (err) {
	        frames = win;
	    }

	    var len = void 0;

	    try {
	        len = frames.length;
	    } catch (err) {
	        // pass
	    }

	    if (len === 0) {
	        return result;
	    }

	    if (len) {
	        for (var i = 0; i < len; i++) {

	            var frame = void 0;

	            try {
	                frame = frames[i];
	            } catch (err) {
	                continue;
	            }

	            result.push(frame);
	        }

	        return result;
	    }

	    for (var _i2 = 0; _i2 < 100; _i2++) {
	        var _frame = void 0;

	        try {
	            _frame = frames[_i2];
	        } catch (err) {
	            return result;
	        }

	        if (!_frame) {
	            return result;
	        }

	        result.push(_frame);
	    }

	    return result;
	}

	function getAllChildFrames(win) {

	    var result = [];

	    for (var _iterator2 = getFrames(win), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i3 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i3++];
	        } else {
	            _i3 = _iterator2.next();
	            if (_i3.done) break;
	            _ref2 = _i3.value;
	        }

	        var frame = _ref2;

	        result.push(frame);

	        for (var _iterator3 = getAllChildFrames(frame), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	            var _ref3;

	            if (_isArray3) {
	                if (_i4 >= _iterator3.length) break;
	                _ref3 = _iterator3[_i4++];
	            } else {
	                _i4 = _iterator3.next();
	                if (_i4.done) break;
	                _ref3 = _i4.value;
	            }

	            var childFrame = _ref3;

	            result.push(childFrame);
	        }
	    }

	    return result;
	}

	function getAllFramesInWindow(win) {

	    var result = getAllChildFrames(win);

	    result.push(win);

	    for (var _iterator4 = getParents(win), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;

	        if (_isArray4) {
	            if (_i5 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i5++];
	        } else {
	            _i5 = _iterator4.next();
	            if (_i5.done) break;
	            _ref4 = _i5.value;
	        }

	        var parent = _ref4;


	        result.push(parent);

	        for (var _iterator5 = getFrames(parent), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	            var _ref5;

	            if (_isArray5) {
	                if (_i6 >= _iterator5.length) break;
	                _ref5 = _iterator5[_i6++];
	            } else {
	                _i6 = _iterator5.next();
	                if (_i6.done) break;
	                _ref5 = _i6.value;
	            }

	            var frame = _ref5;


	            if (result.indexOf(frame) === -1) {
	                result.push(frame);
	            }
	        }
	    }

	    return result;
	}

	function getTop(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        if (win.top) {
	            return win.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    if (getParent(win) === win) {
	        return win;
	    }

	    try {
	        if (isAncestorParent(window, win)) {
	            return window.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    try {
	        if (isAncestorParent(win, window)) {
	            return window.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    for (var _iterator6 = getAllChildFrames(win), _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	        var _ref6;

	        if (_isArray6) {
	            if (_i7 >= _iterator6.length) break;
	            _ref6 = _iterator6[_i7++];
	        } else {
	            _i7 = _iterator6.next();
	            if (_i7.done) break;
	            _ref6 = _i7.value;
	        }

	        var frame = _ref6;

	        try {
	            if (frame.top) {
	                return frame.top;
	            }
	        } catch (err) {
	            // pass
	        }

	        if (getParent(frame) === frame) {
	            return frame;
	        }
	    }
	}

	function isWindowClosed(win) {
	    var allowMock = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


	    if (win === window) {
	        return false;
	    }

	    try {
	        if (!win) {
	            return true;
	        }
	    } catch (err) {
	        return true;
	    }

	    try {
	        if (win.closed) {
	            return true;
	        }
	    } catch (err) {

	        // I love you so much IE

	        if (err && err.message === 'Call was rejected by callee.\r\n') {
	            return false;
	        }

	        return true;
	    }

	    if (allowMock && isSameDomain(win) && _util.util.safeGet(win, 'mockclosed')) {
	        return true;
	    }

	    /*
	     // IE9... don't even ask. If an iframe is removed from the parent page, .closed does not get set to true
	     try {
	        if (win.parent === win && !getOpener(win) && win !== getTop(window)) {
	            // return true;
	        }
	    } catch (err) {
	        // pass
	    }
	     */

	    return false;
	}

	function getUserAgent(win) {
	    win = win || window;
	    return win.navigator.mockUserAgent || win.navigator.userAgent;
	}

	function getFrameByName(win, name) {

	    var winFrames = getFrames(win);

	    for (var _iterator7 = winFrames, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
	        var _ref7;

	        if (_isArray7) {
	            if (_i8 >= _iterator7.length) break;
	            _ref7 = _iterator7[_i8++];
	        } else {
	            _i8 = _iterator7.next();
	            if (_i8.done) break;
	            _ref7 = _i8.value;
	        }

	        var childFrame = _ref7;

	        try {
	            if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) {
	                return childFrame;
	            }
	        } catch (err) {
	            // pass
	        }
	    }

	    try {
	        if (winFrames.indexOf(win.frames[name]) !== -1) {
	            return win.frames[name];
	        }
	    } catch (err) {
	        // pass
	    }

	    try {
	        if (winFrames.indexOf(win[name]) !== -1) {
	            return win[name];
	        }
	    } catch (err) {
	        // pass
	    }
	}

	function findChildFrameByName(win, name) {

	    var frame = getFrameByName(win, name);

	    if (frame) {
	        return frame;
	    }

	    for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
	        var _ref8;

	        if (_isArray8) {
	            if (_i9 >= _iterator8.length) break;
	            _ref8 = _iterator8[_i9++];
	        } else {
	            _i9 = _iterator8.next();
	            if (_i9.done) break;
	            _ref8 = _i9.value;
	        }

	        var childFrame = _ref8;

	        var namedFrame = findChildFrameByName(childFrame, name);

	        if (namedFrame) {
	            return namedFrame;
	        }
	    }
	}

	function findFrameByName(win, name) {

	    var frame = void 0;

	    frame = getFrameByName(win, name);

	    if (frame) {
	        return frame;
	    }

	    return findChildFrameByName(getTop(win), name);
	}

	function isParent(win, frame) {

	    var frameParent = getParent(frame);

	    if (frameParent) {
	        return frameParent === win;
	    }

	    for (var _iterator9 = getFrames(win), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
	        var _ref9;

	        if (_isArray9) {
	            if (_i10 >= _iterator9.length) break;
	            _ref9 = _iterator9[_i10++];
	        } else {
	            _i10 = _iterator9.next();
	            if (_i10.done) break;
	            _ref9 = _i10.value;
	        }

	        var childFrame = _ref9;

	        if (childFrame === frame) {
	            return true;
	        }
	    }

	    return false;
	}

	function isOpener(parent, child) {

	    return parent === getOpener(child);
	}

	function getAncestor(win) {
	    win = win || window;

	    var opener = getOpener(win);

	    if (opener) {
	        return opener;
	    }

	    var parent = getParent(win);

	    if (parent) {
	        return parent;
	    }
	}

	function getAncestors(win) {

	    var results = [];

	    var ancestor = win;

	    while (ancestor) {
	        ancestor = getAncestor(ancestor);
	        if (ancestor) {
	            results.push(ancestor);
	        }
	    }

	    return results;
	}

	function isAncestor(parent, child) {

	    var actualParent = getAncestor(child);

	    if (actualParent) {
	        if (actualParent === parent) {
	            return true;
	        }

	        return false;
	    }

	    if (child === parent) {
	        return false;
	    }

	    if (getTop(child) === child) {
	        return false;
	    }

	    for (var _iterator10 = getFrames(parent), _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
	        var _ref10;

	        if (_isArray10) {
	            if (_i11 >= _iterator10.length) break;
	            _ref10 = _iterator10[_i11++];
	        } else {
	            _i11 = _iterator10.next();
	            if (_i11.done) break;
	            _ref10 = _i11.value;
	        }

	        var frame = _ref10;

	        if (frame === child) {
	            return true;
	        }
	    }

	    return false;
	}

	function isPopup() {
	    return Boolean(getOpener(window));
	}

	function isIframe() {
	    return Boolean(getParent(window));
	}

	function isFullpage() {
	    return Boolean(!isIframe() && !isPopup());
	}

	function getWindowType() {
	    if (isPopup()) {
	        return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	    }
	    if (isIframe()) {
	        return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	    }
	    return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
	}

	function anyMatch(collection1, collection2) {

	    for (var _iterator11 = collection1, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
	        var _ref11;

	        if (_isArray11) {
	            if (_i12 >= _iterator11.length) break;
	            _ref11 = _iterator11[_i12++];
	        } else {
	            _i12 = _iterator11.next();
	            if (_i12.done) break;
	            _ref11 = _i12.value;
	        }

	        var item1 = _ref11;

	        for (var _iterator12 = collection2, _isArray12 = Array.isArray(_iterator12), _i13 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
	            var _ref12;

	            if (_isArray12) {
	                if (_i13 >= _iterator12.length) break;
	                _ref12 = _iterator12[_i13++];
	            } else {
	                _i13 = _iterator12.next();
	                if (_i13.done) break;
	                _ref12 = _i13.value;
	            }

	            var item2 = _ref12;

	            if (item1 === item2) {
	                return true;
	            }
	        }
	    }
	}

	function isSameTopWindow(win1, win2) {

	    var top1 = getTop(win1);
	    var top2 = getTop(win2);

	    try {
	        if (top1 && top2) {
	            if (top1 === top2) {
	                return true;
	            }

	            return false;
	        }
	    } catch (err) {
	        // pass
	    }

	    var allFrames1 = getAllFramesInWindow(win1);
	    var allFrames2 = getAllFramesInWindow(win2);

	    if (anyMatch(allFrames1, allFrames2)) {
	        return true;
	    }

	    var opener1 = getOpener(top1);
	    var opener2 = getOpener(top2);

	    if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) {
	        return false;
	    }

	    if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) {
	        return false;
	    }
	}

	function jsonStringify() {

	    var objectToJSON = void 0;
	    var arrayToJSON = void 0;

	    try {
	        if (JSON.stringify({}) !== '{}') {
	            objectToJSON = Object.prototype.toJSON;
	            delete Object.prototype.toJSON;
	        }

	        if (JSON.stringify({}) !== '{}') {
	            throw new Error('Can not correctly serialize JSON objects');
	        }

	        if (JSON.stringify([]) !== '[]') {
	            arrayToJSON = Array.prototype.toJSON;
	            delete Array.prototype.toJSON;
	        }

	        if (JSON.stringify([]) !== '[]') {
	            throw new Error('Can not correctly serialize JSON objects');
	        }
	    } catch (err) {
	        throw new Error('Can not repair JSON.stringify: ' + err.message);
	    }

	    var result = JSON.stringify.apply(this, arguments);

	    try {
	        if (objectToJSON) {
	            Object.prototype.toJSON = objectToJSON; // eslint-disable-line
	        }

	        if (arrayToJSON) {
	            Array.prototype.toJSON = arrayToJSON; // eslint-disable-line
	        }
	    } catch (err) {
	        throw new Error('Can not repair JSON.stringify: ' + err.message);
	    }

	    return result;
	}

	function jsonParse() {
	    return JSON.parse.apply(this, arguments);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.global = undefined;

	var _conf = __webpack_require__(3);

	var _cleanup = __webpack_require__(16);

	var global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

	global.clean = global.clean || (0, _cleanup.cleanup)(global);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cleanup = cleanup;

	var _promise = __webpack_require__(10);

	function cleanup(obj) {

	    var tasks = [];

	    return {

	        getters: {
	            array: function array() {
	                return [];
	            },
	            object: function object() {
	                return {};
	            }
	        },

	        set: function set(name, item) {
	            obj[name] = item;
	            this.register(function () {
	                delete obj[name];
	            });
	            return item;
	        },
	        push: function push(collection, item) {
	            collection.push(item);
	            this.register(function () {
	                var index = collection.indexOf(item);
	                if (index !== -1) {
	                    collection.splice(index, 1);
	                }
	            });
	            return item;
	        },
	        setItem: function setItem(mapping, key, item) {
	            mapping[key] = item;
	            this.register(function () {
	                delete mapping[key];
	            });
	            return item;
	        },
	        register: function register(name, method) {

	            if (!method) {
	                method = name;
	                name = undefined;
	            }

	            tasks.push({
	                complete: false,

	                name: name,

	                run: function run() {

	                    if (this.complete) {
	                        return;
	                    }

	                    this.complete = true;

	                    return method();
	                }
	            });
	        },
	        hasTasks: function hasTasks() {
	            return Boolean(tasks.filter(function (item) {
	                return !item.complete;
	            }).length);
	        },
	        all: function all() {
	            var results = [];

	            while (tasks.length) {
	                results.push(tasks.pop().run());
	            }

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
	        },
	        run: function run(name) {
	            var results = [];
	            var toClean = [];

	            for (var _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;

	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }

	                var item = _ref;

	                if (item.name === name) {
	                    toClean.push(item);
	                    results.push(item.run());
	                }
	            }

	            for (var _iterator2 = toClean, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                var _ref2;

	                if (_isArray2) {
	                    if (_i2 >= _iterator2.length) break;
	                    _ref2 = _iterator2[_i2++];
	                } else {
	                    _i2 = _iterator2.next();
	                    if (_i2.done) break;
	                    _ref2 = _i2.value;
	                }

	                var _item = _ref2;

	                tasks.splice(tasks.indexOf(_item), 1);
	            }

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
	        }
	    };
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listenForMethods = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.serializeMethod = serializeMethod;
	exports.serializeMethods = serializeMethods;
	exports.deserializeMethod = deserializeMethod;
	exports.deserializeError = deserializeError;
	exports.deserializeMethods = deserializeMethods;

	var _conf = __webpack_require__(3);

	var _util = __webpack_require__(12);

	var _interface = __webpack_require__(1);

	var _log = __webpack_require__(13);

	var _promise = __webpack_require__(9);

	var _global = __webpack_require__(15);

	_global.global.methods = _global.global.methods || {};

	var listenForMethods = exports.listenForMethods = _util.util.once(function () {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, { window: '*', origin: '*' }, function (_ref) {
	        var source = _ref.source;
	        var origin = _ref.origin;
	        var data = _ref.data;


	        var meth = _global.global.methods[data.id];

	        if (!meth) {
	            throw new Error('Could not find method with id: ' + data.id);
	        }

	        if (meth.destination !== source) {
	            throw new Error('Method window does not match');
	        }

	        if (meth.domain && meth.domain !== '*' && origin !== meth.domain) {
	            throw new Error('Method domain ' + meth.domain + ' does not match origin ' + origin);
	        }

	        _log.log.debug('Call local method', data.name, data.args);

	        return _promise.promise.run(function () {
	            return meth.method.apply({ source: source, origin: origin, data: data }, data.args);
	        }).then(function (result) {

	            return {
	                result: result,
	                id: data.id,
	                name: data.name
	            };
	        });
	    });
	});

	function isSerialized(item, type) {
	    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null && item.__type__ === type;
	}

	function serializeMethod(destination, domain, method, name) {

	    var id = _util.util.uniqueID();

	    _global.global.clean.setItem(_global.global.methods, id, { destination: destination, domain: domain, method: method });

	    return {
	        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
	        __id__: id,
	        __name__: name
	    };
	}

	function serializeError(err) {
	    return {
	        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
	        __message__: err.stack || err.message || err.toString()
	    };
	}

	function serializeMethods(destination, domain, obj) {

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {
	        if (typeof item === 'function') {
	            return serializeMethod(destination, domain, item, key);
	        }

	        if (item instanceof Error) {
	            return serializeError(item);
	        }
	    }).obj;
	}

	function deserializeMethod(source, origin, obj) {

	    function wrapper() {
	        var args = Array.prototype.slice.call(arguments);
	        _log.log.debug('Call foreign method', obj.__name__, args);
	        return (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
	            id: obj.__id__,
	            name: obj.__name__,
	            args: args

	        }, { domain: origin }).then(function (_ref2) {
	            var data = _ref2.data;


	            _log.log.debug('Got foreign method result', obj.__name__, data.result);
	            return data.result;
	        });
	    }

	    wrapper.__name__ = obj.__name__;
	    wrapper.source = source;
	    wrapper.origin = origin;

	    return wrapper;
	}

	function deserializeError(source, origin, obj) {
	    return new Error(obj.__message__);
	}

	function deserializeMethods(source, origin, obj) {

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {

	        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
	            return deserializeMethod(source, origin, item);
	        }

	        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
	            return deserializeError(source, origin, item);
	        }
	    }).obj;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initOnReady = initOnReady;
	exports.onWindowReady = onWindowReady;

	var _conf = __webpack_require__(3);

	var _windows = __webpack_require__(14);

	var _interface = __webpack_require__(1);

	var _log = __webpack_require__(13);

	var _promise = __webpack_require__(10);

	var _global = __webpack_require__(15);

	_global.global.readyPromises = _global.global.readyPromises || [];

	function initOnReady() {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, { window: '*', domain: '*' }, function (event) {

	        for (var _iterator = _global.global.readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var item = _ref;

	            if (item.win === event.source) {
	                item.promise.resolve(event);
	                return;
	            }
	        }

	        _global.global.clean.push(_global.global.readyPromises, {
	            win: event.source,
	            promise: new _promise.SyncPromise().resolve(event)
	        });
	    });

	    var parent = (0, _windows.getAncestor)();

	    if (parent) {
	        (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, { domain: '*' })['catch'](function (err) {
	            _log.log.debug(err.stack || err.toString());
	        });
	    }
	}

	function onWindowReady(win) {
	    var timeout = arguments.length <= 1 || arguments[1] === undefined ? 5000 : arguments[1];
	    var name = arguments.length <= 2 || arguments[2] === undefined ? 'Window' : arguments[2];


	    for (var _iterator2 = _global.global.readyPromises, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var item = _ref2;

	        if (item.win === win) {
	            return item.promise;
	        }
	    }

	    var promise = new _promise.SyncPromise();

	    _global.global.clean.push(_global.global.readyPromises, { win: win, promise: promise });

	    setTimeout(function () {
	        return promise.reject(new Error(name + ' did not load after ' + timeout + 'ms'));
	    }, timeout);

	    return promise;
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ie = __webpack_require__(20);

	Object.keys(_ie).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ie[key];
	    }
	  });
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        if ((0, _lib.isSameTopWindow)(sourceWindow, targetWindow) === false) {
	            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
	        }
	    }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RECEIVE_MESSAGE_TYPES = undefined;

	var _RECEIVE_MESSAGE_TYPE;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _send = __webpack_require__(22);

	var _listeners = __webpack_require__(29);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function matchDomain(domain, origin) {

	    if (typeof domain === 'string') {
	        return domain === '*' || origin === domain;
	    }

	    if (Object.prototype.toString.call(domain) === '[object RegExp]') {
	        return origin.match(domain);
	    }

	    if (Array.isArray(domain)) {
	        return domain.indexOf(origin) !== -1;
	    }

	    return false;
	}

	var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function (source, origin, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message ack for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	    }

	    if (!matchDomain(options.domain, origin)) {
	        throw new Error('Ack origin ' + origin + ' does not match domain ' + options.domain);
	    }

	    options.ack = true;
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function (source, origin, message) {

	    var options = (0, _listeners.getRequestListener)(message.name, source, origin);

	    function respond(data) {

	        if (message.fireAndForget || (0, _lib.isWindowClosed)(source)) {
	            return _lib.promise.Promise.resolve();
	        }

	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource,
	            hash: message.hash,
	            name: message.name
	        }, data), origin);
	    }

	    return _lib.promise.Promise.all([respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
	    }), _lib.promise.run(function () {

	        if (!options) {
	            throw new Error('No handler found for post message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	        }

	        if (!matchDomain(options.domain, origin)) {
	            throw new Error('Request origin ' + origin + ' does not match domain ' + options.domain);
	        }

	        var data = message.data;

	        return _lib.promise.deNodeify(options.handler, { source: source, origin: origin, data: data });
	    }).then(function (data) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
	            data: data
	        });
	    }, function (err) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
	            error: err.stack ? err.message + '\n' + err.stack : err.toString()
	        });
	    })])['catch'](function (err) {

	        if (options && options.handleError) {
	            return options.handleError(err);
	        } else {
	            _lib.log.error(err.stack || err.toString());
	        }
	    });
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function (source, origin, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message response for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	    }

	    if (!matchDomain(options.domain, origin)) {
	        throw new Error('Response origin ' + origin + ' does not match domain ' + options.domain);
	    }

	    delete _listeners.listeners.response[message.hash];

	    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
	        return options.respond(new Error(message.error));
	    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
	        var data = message.data || message.response;

	        return options.respond(null, { source: source, origin: origin, data: data });
	    }
	}), _RECEIVE_MESSAGE_TYPE);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.buildMessage = buildMessage;
	exports.sendMessage = sendMessage;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _strategies = __webpack_require__(23);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function buildMessage(win, message) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    var id = _lib.util.uniqueID();
	    var type = (0, _lib.getWindowType)();
	    var sourceDomain = _lib.util.getDomain(window);

	    return _extends({}, message, options, {
	        sourceDomain: sourceDomain,
	        id: message.id || id,
	        windowType: type
	    });
	}

	function sendMessage(win, message, domain) {
	    return _lib.promise.run(function () {

	        message = buildMessage(win, message, {
	            data: (0, _lib.serializeMethods)(win, domain, message.data),
	            domain: domain
	        });

	        var level = void 0;

	        if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
	            level = 'debug';
	        } else if (message.ack === 'error') {
	            level = 'error';
	        } else {
	            level = 'info';
	        }

	        _lib.log.logLevel(level, ['\n\n\t', '#send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || '*', '\n\n', message]);

	        if (_conf.CONFIG.MOCK_MODE) {
	            delete message.target;
	            return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	                origin: _lib.util.getDomain(window),
	                source: window,
	                data: (0, _lib.jsonStringify)(message, 0, 2)
	            });
	        }

	        if (win === window) {
	            throw new Error('Attemping to send message to self');
	        }

	        if ((0, _lib.isWindowClosed)(win)) {
	            throw new Error('Window is closed');
	        }

	        _lib.log.debug('Running send message strategies', message);

	        var messages = [];

	        var serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), 0, 2);

	        return _lib.promise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _lib.promise.run(function () {

	                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
	                    throw new Error('Strategy disallowed: ' + strategyName);
	                }

	                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
	            }).then(function () {
	                messages.push(strategyName + ': success');
	                return true;
	            }, function (err) {
	                messages.push(strategyName + ': ' + (err.stack || err.toString()) + '\n');
	                return false;
	            });
	        }).then(function (results) {

	            var success = _lib.util.some(results);
	            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

	            _lib.log.debug(status);

	            if (!success) {
	                throw new Error(status);
	            }
	        });
	    });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SEND_MESSAGE_STRATEGIES = undefined;

	var _SEND_MESSAGE_STRATEG;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _compat = __webpack_require__(19);

	var _bridge = __webpack_require__(24);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, function (win, serializedMessage, domain) {

	    (0, _compat.emulateIERestrictions)(window, win);

	    if (domain && domain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	        domain = win.location.protocol + '//' + win.location.host;
	    }

	    if (domain && domain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
	        domain = '*';
	    }

	    return win.postMessage(serializedMessage, domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.BRIDGE, function (win, serializedMessage, domain) {

	    if ((0, _lib.isSameDomain)(win)) {
	        throw new Error('Post message through bridge disabled between same domain windows');
	    }

	    if ((0, _lib.isSameTopWindow)(window, win) !== false) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    return (0, _bridge.sendBridgeMessage)(win, serializedMessage, domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.GLOBAL, function (win, serializedMessage, domain) {

	    if (!(0, _lib.isSameDomain)(win)) {
	        throw new Error('Post message through global disabled between different domain windows');
	    }

	    if ((0, _lib.isSameTopWindow)(window, win) !== false) {
	        throw new Error('Can only use global to communicate between two different windows, not between frames');
	    }

	    var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

	    if (!foreignGlobal) {
	        throw new Error('Can not find postRobot global on foreign window');
	    }

	    return foreignGlobal.receiveMessage({
	        source: window,
	        origin: domain,
	        data: serializedMessage
	    });
	}), _SEND_MESSAGE_STRATEG);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bridge = __webpack_require__(25);

	Object.keys(_bridge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bridge[key];
	    }
	  });
	});

	var _child = __webpack_require__(26);

	Object.keys(_child).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _child[key];
	    }
	  });
	});

	var _common = __webpack_require__(27);

	Object.keys(_common).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _common[key];
	    }
	  });
	});

	var _parent = __webpack_require__(28);

	Object.keys(_parent).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _parent[key];
	    }
	  });
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _global = __webpack_require__(15);

	var _interface = __webpack_require__(1);

	_global.global.openTunnelToParent = function openTunnelToParent(_ref) {
	    var name = _ref.name;
	    var source = _ref.source;
	    var canary = _ref.canary;
	    var _sendMessage = _ref.sendMessage;


	    var remoteWindow = (0, _lib.getParent)(window);

	    if (!remoteWindow) {
	        throw new Error('No parent window found to open tunnel to');
	    }

	    return (0, _interface.send)(remoteWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
	        name: name,
	        sendMessage: function sendMessage() {

	            if ((0, _lib.isWindowClosed)(source)) {
	                return;
	            }

	            try {
	                canary();
	            } catch (err) {
	                return;
	            }

	            _sendMessage.apply(this, arguments);
	        }
	    }, { domain: '*' });
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.openTunnelToOpener = openTunnelToOpener;

	var _promise = __webpack_require__(10);

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _drivers = __webpack_require__(6);

	var _common = __webpack_require__(27);

	function getRemoteBridgeForWindow(win) {
	    return _promise.SyncPromise['try'](function () {
	        for (var _iterator = (0, _lib.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var _frame = _ref;

	            try {
	                if (_frame && _frame !== window && (0, _lib.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return _frame;
	                }
	            } catch (err) {
	                continue;
	            }
	        }

	        try {
	            var _ret = function () {
	                var frame = (0, _lib.getFrameByName)(win, (0, _common.getBridgeName)(_lib.util.getDomain()));

	                if (!frame) {
	                    return {
	                        v: void 0
	                    };
	                }

	                if ((0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return {
	                        v: frame
	                    };
	                }

	                return {
	                    v: new _promise.SyncPromise(function (resolve) {

	                        var interval = void 0;
	                        var timeout = void 0;

	                        interval = setInterval(function () {
	                            if ((0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                                clearInterval(interval);
	                                clearTimeout(timeout);
	                                return resolve(frame);
	                            }

	                            setTimeout(function () {
	                                clearInterval(interval);
	                                return resolve();
	                            }, 2000);
	                        }, 100);
	                    })
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } catch (err) {
	            return;
	        }
	    });
	}

	function openTunnelToOpener() {
	    return _promise.SyncPromise['try'](function () {

	        var opener = (0, _lib.getOpener)(window);

	        if (!opener) {
	            return;
	        }

	        if (!(0, _common.needsBridge)({ win: opener })) {
	            return;
	        }

	        (0, _common.registerRemoteWindow)(opener);

	        return getRemoteBridgeForWindow(opener).then(function (bridge) {

	            if (!bridge) {
	                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: no bridge found in opener'));
	            }

	            if (!window.name) {
	                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: window does not have a name'));
	            }

	            return bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

	                name: window.name,

	                source: window,

	                canary: function canary() {
	                    // pass
	                },
	                sendMessage: function sendMessage(message) {

	                    if (!window || window.closed) {
	                        return;
	                    }

	                    (0, _drivers.receiveMessage)({
	                        data: message,
	                        origin: this.origin,
	                        source: this.source
	                    });
	                }
	            }).then(function (_ref2) {
	                var source = _ref2.source;
	                var origin = _ref2.origin;
	                var data = _ref2.data;


	                if (source !== opener) {
	                    throw new Error('Source does not match opener');
	                }

	                (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
	            })['catch'](function (err) {

	                (0, _common.rejectRemoteSendMessage)(opener, err);
	                throw err;
	            });
	        });
	    });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.documentBodyReady = undefined;
	exports.needsBridgeForBrowser = needsBridgeForBrowser;
	exports.needsBridgeForWin = needsBridgeForWin;
	exports.needsBridgeForDomain = needsBridgeForDomain;
	exports.needsBridge = needsBridge;
	exports.getBridgeName = getBridgeName;
	exports.isBridge = isBridge;
	exports.registerRemoteWindow = registerRemoteWindow;
	exports.findRemoteWindow = findRemoteWindow;
	exports.registerRemoteSendMessage = registerRemoteSendMessage;
	exports.rejectRemoteSendMessage = rejectRemoteSendMessage;
	exports.sendBridgeMessage = sendBridgeMessage;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _global = __webpack_require__(15);

	var _drivers = __webpack_require__(6);

	function needsBridgeForBrowser() {

	    if ((0, _lib.getUserAgent)(window).match(/MSIE|trident|edge/i)) {
	        return true;
	    }

	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {
	        return true;
	    }

	    return false;
	}

	function needsBridgeForWin(win) {

	    if (win && (0, _lib.isSameTopWindow)(window, win)) {
	        return false;
	    }

	    if (win && (0, _lib.isSameDomain)(win)) {
	        return false;
	    }

	    return true;
	}

	function needsBridgeForDomain(domain) {

	    if (domain && _lib.util.getDomain() === _lib.util.getDomainFromUrl(domain)) {
	        return false;
	    }

	    return true;
	}

	function needsBridge(_ref) {
	    var win = _ref.win;
	    var domain = _ref.domain;

	    return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
	}

	function getBridgeName(domain) {

	    domain = domain || _lib.util.getDomainFromUrl(domain);

	    var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

	    var id = _conf.CONSTANTS.BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

	    return id;
	}

	function isBridge() {
	    return window.name && window.name === getBridgeName(_lib.util.getDomain());
	}

	var documentBodyReady = exports.documentBodyReady = new _lib.promise.Promise(function (resolve) {

	    if (window.document && window.document.body) {
	        return resolve(window.document.body);
	    }

	    var interval = setInterval(function () {
	        if (window.document && window.document.body) {
	            clearInterval(interval);
	            return resolve(window.document.body);
	        }
	    }, 10);
	});

	_global.global.remoteWindows = _global.global.remoteWindows || [];

	function registerRemoteWindow(win) {
	    var timeout = arguments.length <= 1 || arguments[1] === undefined ? _conf.CONFIG.BRIDGE_TIMEOUT : arguments[1];

	    var sendMessagePromise = new _lib.promise.Promise();
	    _global.global.clean.push(_global.global.remoteWindows, { win: win, sendMessagePromise: sendMessagePromise });
	}

	function findRemoteWindow(win) {
	    for (var i = 0; i < _global.global.remoteWindows.length; i++) {
	        if (_global.global.remoteWindows[i].win === win) {
	            return _global.global.remoteWindows[i];
	        }
	    }
	}

	function registerRemoteSendMessage(win, domain, sendMessage) {

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found to register sendMessage to');
	    }

	    var sendMessageWrapper = function sendMessageWrapper(remoteWin, message, remoteDomain) {

	        if (remoteWin !== win) {
	            throw new Error('Remote window does not match window');
	        }

	        if (remoteDomain !== '*' && remoteDomain !== domain) {
	            throw new Error('Remote domain ' + remoteDomain + ' does not match domain ' + domain);
	        }

	        sendMessage(message);
	    };

	    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
	    remoteWindow.sendMessagePromise = _lib.promise.Promise.resolve(sendMessageWrapper);
	}

	function rejectRemoteSendMessage(win, err) {

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found on which to reject sendMessage');
	    }

	    remoteWindow.sendMessagePromise.asyncReject(err);
	}

	function sendBridgeMessage(win, message, domain) {

	    var messagingChild = (0, _lib.isOpener)(window, win);
	    var messagingParent = (0, _lib.isOpener)(win, window);

	    if (!messagingChild && !messagingParent) {
	        throw new Error('Can only send messages to and from parent and popup windows');
	    }

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found to send message to');
	    }

	    return remoteWindow.sendMessagePromise.then(function (sendMessage) {
	        return sendMessage(win, message, domain);
	    });
	}

	_global.global.receiveMessage = function (event) {
	    return (0, _drivers.receiveMessage)(event);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.openBridge = openBridge;
	exports.destroyBridges = destroyBridges;
	exports.linkUrl = linkUrl;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _global = __webpack_require__(15);

	var _interface = __webpack_require__(1);

	var _drivers = __webpack_require__(6);

	var _common = __webpack_require__(27);

	_global.global.bridges = _global.global.bridges || {};

	function listenForRegister(source, domain) {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { source: source, domain: domain }, function (_ref) {
	        var origin = _ref.origin;
	        var data = _ref.data;


	        if (origin !== domain) {
	            throw new Error('Domain ' + domain + ' does not match origin ' + origin);
	        }

	        if (!data.name) {
	            throw new Error('Register window expected to be passed window name');
	        }

	        if (!data.sendMessage) {
	            throw new Error('Register window expected to be passed sendMessage method');
	        }

	        var winDetails = _global.global.popupWindows[data.name];

	        if (!winDetails) {
	            throw new Error('Window with name ' + data.name + ' does not exist, or was not opened by this window');
	        }

	        if (!winDetails.domain) {
	            throw new Error('We do not have a registered domain for window ' + data.name);
	        }

	        if (winDetails.domain !== origin) {
	            throw new Error('Message origin ' + origin + ' does not matched registered window origin ' + winDetails.domain);
	        }

	        (0, _common.registerRemoteSendMessage)(winDetails.win, domain, data.sendMessage);

	        return {
	            sendMessage: function sendMessage(message) {

	                if (!window || window.closed) {
	                    return;
	                }

	                (0, _drivers.receiveMessage)({
	                    data: message,
	                    origin: winDetails.domain,
	                    source: winDetails.win
	                });
	            }
	        };
	    });
	}

	function openBridgeFrame(name, url) {

	    _lib.log.debug('Opening bridge:', name, url);

	    var iframe = document.createElement('iframe');

	    iframe.setAttribute('name', name);
	    iframe.setAttribute('id', name);

	    iframe.setAttribute('style', 'display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;');
	    iframe.setAttribute('frameborder', '0');
	    iframe.setAttribute('border', '0');
	    iframe.setAttribute('scrolling', 'no');
	    iframe.setAttribute('allowTransparency', 'true');

	    iframe.setAttribute('tabindex', '-1');
	    iframe.setAttribute('hidden', 'true');
	    iframe.setAttribute('title', '');
	    iframe.setAttribute('role', 'presentation');

	    iframe.src = url;

	    return iframe;
	}

	function openBridge(url, domain) {

	    domain = domain || _lib.util.getDomainFromUrl(url);

	    if (_global.global.bridges[domain]) {
	        return _global.global.bridges[domain];
	    }

	    return _global.global.clean.setItem(_global.global.bridges, domain, _lib.promise.run(function () {

	        if (_lib.util.getDomain() === domain) {
	            throw new Error('Can not open bridge on the same domain as current domain: ' + domain);
	        }

	        var name = (0, _common.getBridgeName)(domain);
	        var frame = (0, _lib.getFrameByName)(window, name);

	        if (frame) {
	            throw new Error('Frame with name ' + name + ' already exists on page');
	        }

	        var iframe = openBridgeFrame(name, url);

	        return _common.documentBodyReady.then(function (body) {

	            return new _lib.promise.Promise(function (resolve, reject) {

	                setTimeout(resolve, 1);
	            }).then(function () {

	                body.appendChild(iframe);

	                _global.global.clean.register('bridgeFrames', function () {
	                    body.removeChild(iframe);
	                    delete _global.global.bridges[domain];
	                });

	                var bridge = iframe.contentWindow;

	                listenForRegister(bridge, domain);

	                return new _lib.promise.Promise(function (resolve, reject) {

	                    iframe.onload = resolve;
	                    iframe.onerror = reject;
	                }).then(function () {

	                    return (0, _lib.onWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, 'Bridge ' + url);
	                }).then(function () {

	                    return bridge;
	                });
	            });
	        });
	    }));
	}

	function destroyBridges() {
	    return _global.global.clean.run('bridgeFrames');
	}

	_global.global.popupWindows = _global.global.popupWindows || {};

	var windowOpen = window.open;

	window.open = function (url, name, options, last) {

	    var domain = url;

	    if (url && url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	        var _url$split = url.split('|');

	        var _url$split2 = _slicedToArray(_url$split, 2);

	        domain = _url$split2[0];
	        url = _url$split2[1];
	    }

	    if (domain) {
	        domain = _lib.util.getDomainFromUrl(domain);
	    }

	    var win = windowOpen.call(this, url, name, options, last);

	    if (url) {
	        (0, _common.registerRemoteWindow)(win);
	    }

	    if (name) {
	        _global.global.clean.setItem(_global.global.popupWindows, name, { win: win, domain: domain });
	    }

	    return win;
	};

	function linkUrl(win, url) {

	    for (var _iterator = Object.keys(_global.global.popupWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref2 = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref2 = _i.value;
	        }

	        var name = _ref2;

	        var winOptions = _global.global.popupWindows[name];

	        if (winOptions.win === win) {
	            winOptions.domain = _lib.util.getDomainFromUrl(url);

	            (0, _common.registerRemoteWindow)(win);

	            break;
	        }
	    }
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listeners = undefined;
	exports.resetListeners = resetListeners;
	exports.getRequestListener = getRequestListener;
	exports.removeRequestListener = removeRequestListener;
	exports.addRequestListener = addRequestListener;

	var _global = __webpack_require__(15);

	_global.global.listeners = _global.global.listeners || {
	    request: [],
	    response: []
	};

	var listeners = exports.listeners = _global.global.listeners;

	function resetListeners() {
	    _global.global.listeners.request = [];
	    _global.global.listeners.response = [];
	}

	function isRegex(item) {
	    return Object.prototype.toString.call(item) === '[object RegExp]';
	}

	function matchDomain(domain, origin) {

	    if (typeof domain === 'string') {

	        if (isRegex(origin)) {
	            return false;
	        }

	        if (Array.isArray(origin)) {
	            return false;
	        }

	        return domain === '*' || origin === domain;
	    }

	    if (isRegex(domain)) {

	        if (isRegex(origin)) {
	            return domain.toString() === origin.toString();
	        }

	        if (Array.isArray(origin)) {
	            return false;
	        }

	        return origin.match(domain);
	    }

	    if (Array.isArray(domain)) {

	        if (isRegex(origin)) {
	            return false;
	        }

	        if (Array.isArray(origin)) {
	            return JSON.stringify(domain) === JSON.stringify(origin);
	        }

	        return domain.indexOf(origin) !== -1;
	    }

	    return false;
	}

	function getRequestListener(name, win, domain) {

	    var result = {};

	    for (var _iterator = _global.global.listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var requestListener = _ref;


	        if (requestListener.name !== name) {
	            continue;
	        }

	        var specifiedWin = requestListener.win && requestListener.win !== '*';
	        var specifiedDomain = requestListener.domain && requestListener.domain !== '*';

	        var matchedWin = specifiedWin && requestListener.win === win;
	        var matchedDomain = specifiedDomain && matchDomain(requestListener.domain, domain);

	        if (specifiedWin && specifiedDomain) {
	            if (matchedWin && matchedDomain) {
	                result.all = result.all || requestListener.options;
	            }
	        } else if (specifiedDomain) {
	            if (matchedDomain) {
	                result.domain = result.domain || requestListener.options;
	            }
	        } else if (specifiedWin) {
	            if (matchedWin) {
	                result.win = result.win || requestListener.options;
	            }
	        } else {
	            result.name = result.name || requestListener.options;
	        }
	    }

	    return result.all || result.domain || result.win || result.name;
	}

	function removeRequestListener(options) {

	    for (var _iterator2 = _global.global.listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var listener = _ref2;

	        if (listener.options === options) {
	            _global.global.listeners.request.splice(_global.global.listeners.request.indexOf(listener), 1);
	        }
	    }
	}

	function addRequestListener(name, win, domain, options, override) {

	    var listener = getRequestListener(name, win, domain);

	    if (listener) {
	        if (override) {
	            removeRequestListener(listener);
	        } else {

	            if (win) {
	                throw new Error('Request listener already exists for ' + name + ' on domain ' + domain + ' for specified window: ' + (listener.win === win));
	            }

	            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain);
	        }
	    }

	    _global.global.clean.push(_global.global.listeners.request, { name: name, win: win, domain: domain, options: options });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.on = undefined;
	exports.listen = listen;
	exports.once = once;
	exports.listener = listener;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _drivers = __webpack_require__(6);

	function listen(options) {

	    if (!options.name) {
	        throw new Error('Expected options.name');
	    }

	    options.handler = options.handler || _lib.util.noop;

	    options.errorHandler = options.errorHandler || function (err) {
	        throw err;
	    };

	    if (options.once) {
	        (function () {
	            var handler = options.handler;
	            options.handler = _lib.util.once(function () {
	                (0, _drivers.removeRequestListener)(options);
	                return handler.apply(this, arguments);
	            });
	        })();
	    }

	    var override = options.override || _conf.CONFIG.MOCK_MODE;

	    if (options.source) {
	        options.window = options.source;
	    }

	    options.domain = options.domain || '*';

	    (0, _drivers.addRequestListener)(options.name, options.window, options.domain, options, override);

	    options.handleError = function (err) {
	        // removeRequestListener(options);
	        options.errorHandler(err);
	    };

	    if (options.window && options.errorOnClose) {
	        (function () {
	            var interval = _lib.util.safeInterval(function () {
	                if ((0, _lib.isWindowClosed)(options.window)) {
	                    interval.cancel();
	                    options.handleError(new Error('Post message target window is closed'));
	                }
	            }, 50);
	        })();
	    }

	    return {
	        cancel: function cancel() {
	            (0, _drivers.removeRequestListener)(options);
	        }
	    };
	}

	function _on(name, options, handler, errorHandler) {

	    if (typeof options === 'function') {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options = options || {};

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;

	    return listen(options);
	}

	exports.on = _on;
	function once(name, options, handler, errorHandler) {

	    if (typeof options === 'function') {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options = options || {};

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;
	    options.once = true;

	    var prom = new _lib.promise.Promise(function (resolve, reject) {
	        options.handler = options.handler || function (event) {
	            return resolve(event);
	        };
	        options.errorHandler = options.errorHandler || reject;
	    });

	    var myListener = listen(options);

	    _lib.util.extend(prom, myListener);

	    return prom;
	}

	function listener() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	    return {
	        on: function on(name, handler, errorHandler) {
	            return _on(name, options, handler, errorHandler);
	        }
	    };
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CONSTANTS = exports.CONFIG = undefined;
	exports.enableMockMode = enableMockMode;
	exports.disableMockMode = disableMockMode;

	var _conf = __webpack_require__(3);

	Object.defineProperty(exports, 'CONFIG', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONFIG;
	    }
	});
	Object.defineProperty(exports, 'CONSTANTS', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONSTANTS;
	    }
	});
	exports.disable = disable;

	var _drivers = __webpack_require__(6);

	function enableMockMode() {
	    _conf.CONFIG.MOCK_MODE = true;
	}

	function disableMockMode() {
	    _conf.CONFIG.MOCK_MODE = false;
	}

	function disable() {
	    delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
	    window.removeEventListener('message', _drivers.messageListener);
	}

/***/ }
/******/ ])
});
;