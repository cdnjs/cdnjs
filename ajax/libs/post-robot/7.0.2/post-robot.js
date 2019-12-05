!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("postRobot", [], factory) : "object" == typeof exports ? exports.postRobot = factory() : root.postRobot = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 26);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _config = __webpack_require__(22);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _constants = __webpack_require__(10);
        Object.keys(_constants).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _constants[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function getActualDomain(win) {
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return "file://";
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            win = win || window;
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
        }
        function isActuallySameDomain(win) {
            try {
                var desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }
        function isSameDomain(win) {
            if (!isActuallySameDomain(win)) return !1;
            try {
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParents(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
        }
        function getFrames(win) {
            var result = [], frames = void 0;
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            var len = void 0;
            try {
                len = frames.length;
            } catch (err) {}
            if (0 === len) return result;
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
            for (var _i = 0; _i < 100; _i++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i2 >= _iterator.length) break;
                    _ref = _iterator[_i2++];
                } else {
                    if (_i2 = _iterator.next(), _i2.done) break;
                    _ref = _i2.value;
                }
                var frame = _ref;
                result.push(frame);
                for (var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i3++];
                    } else {
                        if (_i3 = _iterator2.next(), _i3.done) break;
                        _ref2 = _i3.value;
                    }
                    var childFrame = _ref2;
                    result.push(childFrame);
                }
            }
            return result;
        }
        function getAllFramesInWindow(win) {
            var result = getAllChildFrames(win);
            result.push(win);
            for (var _iterator3 = getParents(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i4 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i4++];
                } else {
                    if (_i4 = _iterator3.next(), _i4.done) break;
                    _ref3 = _i4.value;
                }
                var parent = _ref3;
                result.push(parent);
                for (var _iterator4 = getFrames(parent), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i5 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i5++];
                    } else {
                        if (_i5 = _iterator4.next(), _i5.done) break;
                        _ref4 = _i5.value;
                    }
                    var frame = _ref4;
                    -1 === result.indexOf(frame) && result.push(frame);
                }
            }
            return result;
        }
        function getTop(win) {
            if (win) {
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win)) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window)) return window.top;
                } catch (err) {}
                for (var _iterator5 = getAllChildFrames(win), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray5) {
                        if (_i6 >= _iterator5.length) break;
                        _ref5 = _iterator5[_i6++];
                    } else {
                        if (_i6 = _iterator5.next(), _i6.done) break;
                        _ref5 = _i6.value;
                    }
                    var frame = _ref5;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function isWindowClosed(win) {
            var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || "Call was rejected by callee.\r\n" !== err.message;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            return !1;
        }
        function getUserAgent(win) {
            return win = win || window, win.navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _iterator6 = winFrames, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                var _ref6;
                if (_isArray6) {
                    if (_i7 >= _iterator6.length) break;
                    _ref6 = _iterator6[_i7++];
                } else {
                    if (_i7 = _iterator6.next(), _i7.done) break;
                    _ref6 = _i7.value;
                }
                var childFrame = _ref6;
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame)) return childFrame;
                } catch (err) {}
            }
            try {
                if (-1 !== winFrames.indexOf(win.frames[name])) return win.frames[name];
            } catch (err) {}
            try {
                if (-1 !== winFrames.indexOf(win[name])) return win[name];
            } catch (err) {}
        }
        function findChildFrameByName(win, name) {
            var frame = getFrameByName(win, name);
            if (frame) return frame;
            for (var _iterator7 = getFrames(win), _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i8 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i8++];
                } else {
                    if (_i8 = _iterator7.next(), _i8.done) break;
                    _ref7 = _i8.value;
                }
                var childFrame = _ref7, namedFrame = findChildFrameByName(childFrame, name);
                if (namedFrame) return namedFrame;
            }
        }
        function findFrameByName(win, name) {
            return getFrameByName(win, name) || findChildFrameByName(getTop(win), name);
        }
        function isParent(win, frame) {
            var frameParent = getParent(frame);
            if (frameParent) return frameParent === win;
            for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray8) {
                    if (_i9 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i9++];
                } else {
                    if (_i9 = _iterator8.next(), _i9.done) break;
                    _ref8 = _i9.value;
                }
                if (_ref8 === frame) return !0;
            }
            return !1;
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent || void 0;
        }
        function getAncestors(win) {
            for (var results = [], ancestor = win; ancestor; ) (ancestor = getAncestor(ancestor)) && results.push(ancestor);
            return results;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator9 = getFrames(parent), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                var _ref9;
                if (_isArray9) {
                    if (_i10 >= _iterator9.length) break;
                    _ref9 = _iterator9[_i10++];
                } else {
                    if (_i10 = _iterator9.next(), _i10.done) break;
                    _ref9 = _i10.value;
                }
                if (_ref9 === child) return !0;
            }
            return !1;
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
        function anyMatch(collection1, collection2) {
            for (var _iterator10 = collection1, _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator](); ;) {
                var _ref10;
                if (_isArray10) {
                    if (_i11 >= _iterator10.length) break;
                    _ref10 = _iterator10[_i11++];
                } else {
                    if (_i11 = _iterator10.next(), _i11.done) break;
                    _ref10 = _i11.value;
                }
                for (var item1 = _ref10, _iterator11 = collection2, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator](); ;) {
                    var _ref11;
                    if (_isArray11) {
                        if (_i12 >= _iterator11.length) break;
                        _ref11 = _iterator11[_i12++];
                    } else {
                        if (_i12 = _iterator11.next(), _i12.done) break;
                        _ref11 = _i12.value;
                    }
                    if (item1 === _ref11) return !0;
                }
            }
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1), top2 = getTop(win2);
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && ((!opener2 || !anyMatch(getAllFramesInWindow(opener2), allFrames1)) && void 0);
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                if ((0, _util.isRegex)(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return (0, _util.isRegex)(pattern) ? (0, _util.isRegex)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !(0, 
            _util.isRegex)(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function getDomainFromUrl(url) {
            var domain = void 0;
            return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : getDomain();
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getActualDomain = getActualDomain, exports.getDomain = getDomain, exports.isActuallySameDomain = isActuallySameDomain, 
        exports.isSameDomain = isSameDomain, exports.getParent = getParent, exports.getOpener = getOpener, 
        exports.getParents = getParents, exports.isAncestorParent = isAncestorParent, exports.getFrames = getFrames, 
        exports.getAllChildFrames = getAllChildFrames, exports.getAllFramesInWindow = getAllFramesInWindow, 
        exports.getTop = getTop, exports.isWindowClosed = isWindowClosed, exports.getUserAgent = getUserAgent, 
        exports.getFrameByName = getFrameByName, exports.findChildFrameByName = findChildFrameByName, 
        exports.findFrameByName = findFrameByName, exports.isParent = isParent, exports.isOpener = isOpener, 
        exports.getAncestor = getAncestor, exports.getAncestors = getAncestors, exports.isAncestor = isAncestor, 
        exports.isPopup = isPopup, exports.isIframe = isIframe, exports.isFullpage = isFullpage, 
        exports.isSameTopWindow = isSameTopWindow, exports.matchDomain = matchDomain, exports.getDomainFromUrl = getDomainFromUrl;
        var _util = __webpack_require__(17), CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _promise = __webpack_require__(19);
        Object.defineProperty(exports, "ZalgoPromise", {
            enumerable: !0,
            get: function() {
                return _promise.ZalgoPromise;
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.global = void 0;
        var _conf = __webpack_require__(0);
        (exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {}).registerSelf = function() {};
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _promise = __webpack_require__(28);
        Object.keys(_promise).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(7);
        Object.keys(_util).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _util[key];
                }
            });
        });
        var _log = __webpack_require__(9);
        Object.keys(_log).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _log[key];
                }
            });
        });
        var _methods = __webpack_require__(27);
        Object.keys(_methods).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _methods[key];
                }
            });
        });
        var _ready = __webpack_require__(29);
        Object.keys(_ready).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ready[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(13);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }(_interface);
        exports.default = INTERFACE;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _receive = __webpack_require__(23);
        Object.keys(_receive).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _receive[key];
                }
            });
        });
        var _send = __webpack_require__(12);
        Object.keys(_send).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _send[key];
                }
            });
        });
        var _listeners = __webpack_require__(11);
        Object.keys(_listeners).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _listeners[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function stringifyError(err) {
            return err ? err instanceof Error ? err.stack : "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err) : "<unknown error: " + Object.prototype.toString.call(err) + ">";
        }
        function noop() {}
        function addEventListener(obj, event, handler) {
            return obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler), 
            {
                cancel: function() {
                    obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                }
            };
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function eachArray(item, callback) {
            for (var i = 0; i < item.length; i++) callback(item[i], i);
        }
        function eachObject(item, callback) {
            for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
        }
        function each(item, callback) {
            Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
        }
        function replaceObject(item, callback) {
            var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            var newobj = void 0;
            if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                if (!Array.isArray(item)) throw new Error("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                newobj = [];
            } else newobj = {};
            return each(item, function(childItem, key) {
                var result = callback(childItem, key);
                void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
            }), newobj;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time), method.call();
            }
            var timeout = void 0;
            return timeout = setTimeout(runInterval, time), {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function getWindowType() {
            return (0, _src2.isPopup)() ? _conf.CONSTANTS.WINDOW_TYPES.POPUP : (0, _src2.isIframe)() ? _conf.CONSTANTS.WINDOW_TYPES.IFRAME : _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify(obj, replacer, indent) {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({}) && (objectToJSON = Object.prototype.toJSON, delete Object.prototype.toJSON), 
                "{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([]) && (arrayToJSON = Array.prototype.toJSON, delete Array.prototype.toJSON), 
                "[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.call(this, obj, replacer, indent);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON), arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse(item) {
            return JSON.parse(item);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.weakMapMemoize = exports.once = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.stringifyError = stringifyError, exports.noop = noop, exports.addEventListener = addEventListener, 
        exports.uniqueID = uniqueID, exports.eachArray = eachArray, exports.eachObject = eachObject, 
        exports.each = each, exports.replaceObject = replaceObject, exports.safeInterval = safeInterval, 
        exports.isRegex = isRegex, exports.getWindowType = getWindowType, exports.jsonStringify = jsonStringify, 
        exports.jsonParse = jsonParse;
        var _src = __webpack_require__(5), _src2 = __webpack_require__(1), _conf = __webpack_require__(0);
        exports.once = function(method) {
            if (!method) return method;
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        }, exports.weakMapMemoize = function(method) {
            var weakmap = new _src.WeakMap();
            return function(arg) {
                var result = weakmap.get(arg);
                return void 0 !== result ? result : (result = method.call(this, arg), void 0 !== result && weakmap.set(arg, result), 
                result);
            };
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function init() {
            _global.global.initialized || ((0, _drivers.listenForMessages)(), (0, _lib.initOnReady)(), 
            (0, _lib.listenForMethods)()), _global.global.initialized = !0;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Promise = exports.cleanUpWindow = void 0;
        var _clean = __webpack_require__(21);
        Object.defineProperty(exports, "cleanUpWindow", {
            enumerable: !0,
            get: function() {
                return _clean.cleanUpWindow;
            }
        }), exports.init = init;
        var _public = __webpack_require__(32);
        Object.keys(_public).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _public[key];
                }
            });
        });
        var _src = __webpack_require__(2);
        Object.defineProperty(exports, "Promise", {
            enumerable: !0,
            get: function() {
                return _src.ZalgoPromise;
            }
        });
        var _lib = __webpack_require__(4), _drivers = __webpack_require__(6), _global = __webpack_require__(3);
        init();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.log = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _util = __webpack_require__(7), _conf = __webpack_require__(0), LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = exports.log = {
            clearLogs: function() {
                if (window.console && window.console.clear && window.console.clear(), _conf.CONFIG.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    container || (container = document.createElement("div"), container.id = "postRobotLogs", 
                    container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;", 
                    document.body && document.body.appendChild(container));
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = (0, _util.jsonStringify)(item, null, 2);
                        } catch (e) {
                            json = "[object]";
                        }
                        return "\n\n" + json + "\n\n";
                    }).join(" "), msg = date + " " + level + " " + payload;
                    el.innerHTML = msg;
                    var color = {
                        log: "#ddd",
                        warn: "orange",
                        error: "red",
                        info: "blue",
                        debug: "#aaa"
                    }[level];
                    el.style.cssText = "margin-top: 10px; color: " + color + ";", container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                });
            },
            logLevel: function(level, args) {
                setTimeout(function() {
                    try {
                        var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                        args.unshift("::"), args.unshift("" + (0, _util.getWindowType)().toLowerCase()), 
                        args.unshift("[post-robot]"), _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args), 
                        !window.console) return;
                        if (window.console[level] || (level = "log"), !window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                log.logLevel("debug", args);
            },
            info: function() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                log.logLevel("info", args);
            },
            warn: function() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                log.logLevel("warn", args);
            },
            error: function() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
                log.logLevel("error", args);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var CONSTANTS = exports.CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error"
            },
            POST_MESSAGE_NAMES: {
                METHOD: "postrobot_method",
                READY: "postrobot_ready",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe"
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__"
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method",
                ERROR: "postrobot_error"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*"
        };
        exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function resetListeners() {
            _global.global.responseListeners = {}, _global.global.requestListeners = {};
        }
        function addResponseListener(hash, listener) {
            _global.global.responseListeners[hash] = listener;
        }
        function getResponseListener(hash) {
            return _global.global.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete _global.global.responseListeners[hash];
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            if (win === _conf.CONSTANTS.WILDCARD && (win = null), domain === _conf.CONSTANTS.WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            var nameListeners = _global.global.requestListeners[name];
            if (nameListeners) for (var _arr = [ win, _global.global.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                if (winListeners) {
                    for (var _arr2 = [ domain, _conf.CONSTANTS.WILDCARD ], _i2 = 0; _i2 < _arr2.length; _i2++) {
                        var domainQualifier = _arr2[_i2];
                        if (domainQualifier && (domainQualifier = domainQualifier.toString(), winListeners[domainQualifier])) return winListeners[domainQualifier];
                    }
                    if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray) {
                            if (_i3 >= _iterator.length) break;
                            _ref3 = _iterator[_i3++];
                        } else {
                            if (_i3 = _iterator.next(), _i3.done) break;
                            _ref3 = _i3.value;
                        }
                        var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                        if ((0, _src2.matchDomain)(regex, domain)) return listener;
                    }
                }
            }
        }
        function addRequestListener(_ref5, listener) {
            var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
            if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
            if (console.warn("adding request listener:", name), Array.isArray(win)) {
                for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray2) {
                        if (_i4 >= _iterator2.length) break;
                        _ref6 = _iterator2[_i4++];
                    } else {
                        if (_i4 = _iterator2.next(), _i4.done) break;
                        _ref6 = _i4.value;
                    }
                    var item = _ref6;
                    listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref7;
                            if (_isArray3) {
                                if (_i5 >= _iterator3.length) break;
                                _ref7 = _iterator3[_i5++];
                            } else {
                                if (_i5 = _iterator3.next(), _i5.done) break;
                                _ref7 = _i5.value;
                            }
                            _ref7.cancel();
                        }
                    }
                };
            }
            if (Array.isArray(domain)) {
                for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray4) {
                        if (_i6 >= _iterator4.length) break;
                        _ref8 = _iterator4[_i6++];
                    } else {
                        if (_i6 = _iterator4.next(), _i6.done) break;
                        _ref8 = _i6.value;
                    }
                    var _item = _ref8;
                    _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                            var _ref9;
                            if (_isArray5) {
                                if (_i7 >= _iterator5.length) break;
                                _ref9 = _iterator5[_i7++];
                            } else {
                                if (_i7 = _iterator5.next(), _i7.done) break;
                                _ref9 = _i7.value;
                            }
                            _ref9.cancel();
                        }
                    }
                };
            }
            var existingListener = getRequestListener({
                name: name,
                win: win,
                domain: domain
            });
            if (win && win !== _conf.CONSTANTS.WILDCARD || (win = _global.global.WINDOW_WILDCARD), 
            domain = domain || _conf.CONSTANTS.WILDCARD, existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain + " for specified window") : win ? new Error("Request listener already exists for " + name + " for specified window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain) : new Error("Request listener already exists for " + name);
            var requestListeners = _global.global.requestListeners, nameListeners = requestListeners[name];
            nameListeners || (nameListeners = new _src.WeakMap(), requestListeners[name] = nameListeners);
            var winListeners = nameListeners.get(win);
            winListeners || (winListeners = {}, nameListeners.set(win, winListeners));
            var strDomain = domain.toString();
            winListeners[strDomain] = listener;
            var regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
            return (0, _lib.isRegex)(domain) && (regexListeners || (regexListeners = [], winListeners[__DOMAIN_REGEX__] = regexListeners), 
            regexListener = {
                regex: domain,
                listener: listener
            }, regexListeners.push(regexListener)), {
                cancel: function() {
                    winListeners && (delete winListeners[strDomain], win && 0 === Object.keys(winListeners).length && nameListeners.delete(win), 
                    regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1)));
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.resetListeners = resetListeners, exports.addResponseListener = addResponseListener, 
        exports.getResponseListener = getResponseListener, exports.deleteResponseListener = deleteResponseListener, 
        exports.getRequestListener = getRequestListener, exports.addRequestListener = addRequestListener, 
        __webpack_require__(2);
        var _src = __webpack_require__(5), _src2 = __webpack_require__(1), _global = __webpack_require__(3), _lib = __webpack_require__(4), _conf = __webpack_require__(0);
        _global.global.responseListeners = _global.global.responseListeners || {}, _global.global.requestListeners = _global.global.requestListeners || {}, 
        _global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function() {}();
        var __DOMAIN_REGEX__ = "__domain_regex__";
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = (0, 
            _lib.uniqueID)(), type = (0, _lib.getWindowType)(), sourceDomain = (0, _src.getDomain)(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return _src2.ZalgoPromise.try(function() {
                message = buildMessage(win, message, {
                    data: (0, _lib.serializeMethods)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                if (level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message ]), 
                win === window) throw new Error("Attemping to send message to self");
                if ((0, _src.isWindowClosed)(win)) throw new Error("Window is closed");
                _lib.log.debug("Running send message strategies", message);
                var messages = [], serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), null, 2);
                return (0, _lib.promiseMap)(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return _src2.ZalgoPromise.try(function() {
                        if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        return messages.push(strategyName + ": success"), !0;
                    }, function(err) {
                        return messages.push(strategyName + ": " + (err.stack || err.toString()) + "\n"), 
                        !1;
                    });
                }).then(function(results) {
                    var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    if (_lib.log.debug(status), !success) throw new Error(status);
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.sendMessage = sendMessage;
        var _src = __webpack_require__(1), _src2 = __webpack_require__(2), _conf = __webpack_require__(0), _lib = __webpack_require__(4), _strategies = __webpack_require__(25);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _weakmap = __webpack_require__(16);
        Object.defineProperty(exports, "WeakMap", {
            enumerable: !0,
            get: function() {
                return _weakmap.CrossDomainSafeWeakMap;
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function hasNativeWeakMap() {
            if (!window.WeakMap) return !1;
            if (!window.Object.freeze) return !1;
            try {
                var testWeakMap = new window.WeakMap(), testKey = {};
                return window.Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), 
                "__testvalue__" === testWeakMap.get(testKey);
            } catch (err) {
                return !1;
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.hasNativeWeakMap = hasNativeWeakMap;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isWindow(obj) {
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {}
            return !1;
        }
        function isClosedWindow(obj) {
            try {
                if (obj && obj !== window && obj.closed) return !0;
            } catch (err) {
                return !err || "Call was rejected by callee.\r\n" !== err.message;
            }
            return !1;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isWindow = isWindow, exports.isClosedWindow = isClosedWindow;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CrossDomainSafeWeakMap = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _util = __webpack_require__(15), _native = __webpack_require__(14), defineProperty = Object.defineProperty, counter = Date.now() % 1e9;
        exports.CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                if (_classCallCheck(this, CrossDomainSafeWeakMap), counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
                (0, _native.hasNativeWeakMap)()) try {
                    this.weakmap = new window.WeakMap();
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            return _createClass(CrossDomainSafeWeakMap, [ {
                key: "_cleanupClosedWindows",
                value: function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if ((0, _util.isClosedWindow)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                        }
                    }
                }
            }, {
                key: "set",
                value: function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if ((0, _util.isWindow)(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, values = this.values, index = keys.indexOf(key);
                        -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
                    } else {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                    }
                }
            }, {
                key: "get",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if ((0, _util.isWindow)(key)) {
                        var keys = this.keys, index = keys.indexOf(key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                }
            }, {
                key: "delete",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if ((0, _util.isWindow)(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = keys.indexOf(key);
                        -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
                    } else {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    }
                }
            }, {
                key: "has",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        return weakmap.has(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if ((0, _util.isWindow)(key)) return this._cleanupClosedWindows(), -1 !== this.keys.indexOf(key);
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                }
            } ]), CrossDomainSafeWeakMap;
        }();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isRegex = isRegex;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function dispatchPossiblyUnhandledError(err) {
            if (-1 === dispatchedErrors.indexOf(err)) {
                dispatchedErrors.push(err), setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function onPossiblyUnhandledException(handler) {
            return possiblyUnhandledPromiseHandlers.push(handler), {
                cancel: function() {
                    possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.dispatchPossiblyUnhandledError = dispatchPossiblyUnhandledError, exports.onPossiblyUnhandledException = onPossiblyUnhandledException;
        var possiblyUnhandledPromiseHandlers = [], dispatchedErrors = [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ZalgoPromise = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _utils = __webpack_require__(20), _exceptions = __webpack_require__(18), ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                if (_classCallCheck(this, ZalgoPromise), this.resolved = !1, this.rejected = !1, 
                this.errorHandled = !1, this.handlers = [], handler) {
                    var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                    try {
                        handler(function(res) {
                            isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                        }, function(err) {
                            isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                        });
                    } catch (err) {
                        return void this.reject(err);
                    }
                    isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            return _createClass(ZalgoPromise, [ {
                key: "resolve",
                value: function(result) {
                    if (this.resolved || this.rejected) return this;
                    if ((0, _utils.isPromise)(result)) throw new Error("Can not resolve promise with another promise");
                    return this.resolved = !0, this.value = result, this.dispatch(), this;
                }
            }, {
                key: "reject",
                value: function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if ((0, _utils.isPromise)(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || (0, _exceptions.dispatchPossiblyUnhandledError)(error);
                    }, 1), this.dispatch(), this;
                }
            }, {
                key: "asyncReject",
                value: function(error) {
                    this.errorHandled = !0, this.reject(error);
                }
            }, {
                key: "dispatch",
                value: function() {
                    var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (resolved || rejected) for (;handlers.length; ) {
                        (function() {
                            var _handlers$shift = handlers.shift(), onSuccess = _handlers$shift.onSuccess, onError = _handlers$shift.onError, promise = _handlers$shift.promise, result = void 0;
                            if (resolved) try {
                                result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                            } catch (err) {
                                return promise.reject(err), "continue";
                            } else if (rejected) {
                                if (!onError) return promise.reject(_this3.error), "continue";
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    return promise.reject(err), "continue";
                                }
                            }
                            (0, _utils.isPromise)(result) ? result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        })();
                    }
                }
            }, {
                key: "then",
                value: function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    return this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    }), this.errorHandled = !0, this.dispatch(), promise;
                }
            }, {
                key: "catch",
                value: function(onError) {
                    return this.then(void 0, onError);
                }
            }, {
                key: "finally",
                value: function(handler) {
                    return this.then(function(result) {
                        return ZalgoPromise.try(handler).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(handler).then(function() {
                            throw err;
                        });
                    });
                }
            }, {
                key: "toPromise",
                value: function() {
                    if (!window.Promise) throw new Error("Could not find window.Promise");
                    return window.Promise.resolve(this);
                }
            } ], [ {
                key: "resolve",
                value: function(value) {
                    return (0, _utils.isPromise)(value) || value instanceof ZalgoPromise ? value : new ZalgoPromise().resolve(value);
                }
            }, {
                key: "reject",
                value: function(error) {
                    return new ZalgoPromise().reject(error);
                }
            }, {
                key: "all",
                value: function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) return promise.resolve(results), promise;
                    for (var i = 0; i < promises.length; i++) !function(i) {
                        ZalgoPromise.resolve(promises[i]).then(function(result) {
                            results[i] = result, 0 === (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }(i);
                    return promise;
                }
            }, {
                key: "onPossiblyUnhandledException",
                value: function(handler) {
                    return (0, _exceptions.onPossiblyUnhandledException)(handler);
                }
            }, {
                key: "try",
                value: function(method) {
                    return ZalgoPromise.resolve().then(method);
                }
            }, {
                key: "delay",
                value: function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                }
            }, {
                key: "hash",
                value: function(obj) {
                    var results = {}, promises = [];
                    for (var key in obj) !function(key) {
                        obj.hasOwnProperty(key) && promises.push(ZalgoPromise.resolve(obj[key]).then(function(result) {
                            results[key] = result;
                        }));
                    }(key);
                    return ZalgoPromise.all(promises).then(function() {
                        return results;
                    });
                }
            } ]), ZalgoPromise;
        }();
        exports.ZalgoPromise = ZalgoPromise, new ZalgoPromise().resolve(void 0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (toString) {
                    var name = toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if (item && item.then instanceof Function) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isPromise = isPromise;
        var toString = {}.toString;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function cleanUpWindow(win) {
            var requestPromises = _global.global.requestPromises.get(win);
            if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var promise = _ref;
                promise.reject(new Error("No response from window - cleaned up"));
            }
            _global.global.popupWindowsByWin && _global.global.popupWindowsByWin.delete(win), 
            _global.global.remoteWindows && _global.global.remoteWindows.delete(win), _global.global.requestPromises.delete(win), 
            _global.global.methods.delete(win), _global.global.readyPromises.delete(win);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.cleanUpWindow = cleanUpWindow;
        var _global = __webpack_require__(3);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONFIG = void 0;
        var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__(10), CONFIG = exports.CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            RES_TIMEOUT: 1e4,
            LOG_TO_PAGE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            var parsedMessage = void 0;
            try {
                parsedMessage = (0, _lib.jsonParse)(message);
            } catch (err) {
                return;
            }
            if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && _types.RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message) {
                if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                if (0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain), 
                -1 === _global.global.receivedMessages.indexOf(message.id)) {
                    _global.global.receivedMessages.push(message.id);
                    var level = void 0;
                    if (level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                    _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                    (0, _src.isWindowClosed)(source)) return void _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                    message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data)), 
                    _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                }
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            var messageEvent = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent && event.originalEvent.origin,
                data: event.data
            };
            receiveMessage(messageEvent);
        }
        function listenForMessages() {
            (0, _lib.addEventListener)(window, "message", messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.receiveMessage = receiveMessage, exports.messageListener = messageListener, 
        exports.listenForMessages = listenForMessages;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(4), _global = __webpack_require__(3), _types = __webpack_require__(24);
        _global.global.receivedMessages = _global.global.receivedMessages || [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.RECEIVE_MESSAGE_TYPES = void 0;
        var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _src = __webpack_require__(2), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(4), _send = __webpack_require__(12), _listeners = __webpack_require__(11);
        exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = (0, _listeners.getResponseListener)(message.hash);
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain);
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || (0, _src2.isWindowClosed)(source) ? _src.ZalgoPromise.resolve() : (0, 
                _send.sendMessage)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = (0, _listeners.getRequestListener)({
                name: message.name,
                win: source,
                domain: origin
            });
            return _src.ZalgoPromise.all([ respond({
                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
            }), _src.ZalgoPromise.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain);
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var stack = err.stack, errmessage = err.message, error = void 0;
                return stack ? (error = errmessage && -1 === stack.indexOf(errmessage) ? errmessage + "\n" + stack : stack, 
                error = error.replace(/^Error: /, "")) : error = errmessage, respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: error
                });
            }) ]).then(_lib.noop).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                _lib.log.error((0, _lib.stringifyError)(err));
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = (0, _listeners.getResponseListener)(message.hash);
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            if ((0, _listeners.deleteResponseListener)(message.hash), message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error), null);
            if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SEND_MESSAGE_STRATEGIES = void 0;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0), SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ _conf.CONSTANTS.WILDCARD ], 
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                    if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) return _conf.CONSTANTS.WILDCARD;
                    if (!(0, _src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return (0, _src.getActualDomain)(win);
                }
                return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
            }), domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(8);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }(_interface);
        exports.default = INTERFACE;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = (0, _util.uniqueID)(), methods = _global.global.methods.get(destination);
            return methods || (methods = {}, _global.global.methods.set(destination, methods)), 
            methods[id] = {
                domain: domain,
                method: method
            }, {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                __message__: (0, _util.stringifyError)(err)
            };
        }
        function serializeMethods(destination, domain, obj) {
            return (0, _util.replaceObject)({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return _log.log.debug("Call foreign method", obj.__name__, args), (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return _log.log.debug("Got foreign method result", obj.__name__, data.result), data.result;
                }, function(err) {
                    throw _log.log.debug("Got foreign method error", (0, _util.stringifyError)(err)), 
                    err;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.__xdomain__ = !0, wrapper.source = source, 
            wrapper.origin = origin, wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeMethods(source, origin, obj) {
            return (0, _util.replaceObject)({
                obj: obj
            }, function(item, key) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : void 0;
            }).obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listenForMethods = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.serializeMethod = serializeMethod, exports.serializeMethods = serializeMethods, 
        exports.deserializeMethod = deserializeMethod, exports.deserializeError = deserializeError, 
        exports.deserializeMethods = deserializeMethods;
        var _src = __webpack_require__(5), _src2 = __webpack_require__(1), _src3 = __webpack_require__(2), _conf = __webpack_require__(0), _util = __webpack_require__(7), _interface = __webpack_require__(8), _log = __webpack_require__(9), _global = __webpack_require__(3);
        _global.global.methods = _global.global.methods || new _src.WeakMap();
        exports.listenForMethods = (0, _util.once)(function() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                window: _conf.CONSTANTS.WILDCARD,
                origin: _conf.CONSTANTS.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = _global.global.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!(0, _src2.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return _log.log.debug("Call local method", data.name, data.args), _src3.ZalgoPromise.try(function() {
                    return meth.method.apply({
                        source: source,
                        origin: origin,
                        data: data
                    }, data.args);
                }).then(function(result) {
                    return {
                        result: result,
                        id: data.id,
                        name: data.name
                    };
                });
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function promiseMap(items, method) {
            for (var results = [], i = 0; i < items.length; i++) !function(i) {
                results.push(_src.ZalgoPromise.try(function() {
                    return method(items[i]);
                }));
            }(i);
            return _src.ZalgoPromise.all(results);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.promiseMap = promiseMap;
        var _src = __webpack_require__(2);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function initOnReady() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {
                window: _conf.CONSTANTS.WILDCARD,
                domain: _conf.CONSTANTS.WILDCARD
            }, function(event) {
                var win = event.source, promise = _global.global.readyPromises.get(win);
                promise ? promise.resolve(event) : (promise = new _src3.ZalgoPromise().resolve(event), 
                _global.global.readyPromises.set(win, promise));
            });
            var parent = (0, _src2.getAncestor)();
            parent && (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, {
                domain: _conf.CONSTANTS.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                _log.log.debug((0, _util.stringifyError)(err));
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = _global.global.readyPromises.get(win);
            return promise || (promise = new _src3.ZalgoPromise(), _global.global.readyPromises.set(win, promise), 
            setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.initOnReady = initOnReady, exports.onWindowReady = onWindowReady;
        var _src = __webpack_require__(5), _src2 = __webpack_require__(1), _src3 = __webpack_require__(2), _conf = __webpack_require__(0), _interface = __webpack_require__(8), _log = __webpack_require__(9), _global = __webpack_require__(3), _util = __webpack_require__(7);
        _global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function request(options) {
            return _src2.ZalgoPromise.try(function() {
                if (!options.name) throw new Error("Expected options.name");
                var name = options.name, win = options.window, domain = void 0;
                if ("string" == typeof win) {
                    var el = document.getElementById(win);
                    if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    win = el.contentWindow;
                } else if (win instanceof HTMLElement) {
                    if ("iframe" !== win.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                    if (win && !win.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    win && win.contentWindow && (win = win.contentWindow);
                }
                if (!win) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                domain = options.domain || _conf.CONSTANTS.WILDCARD;
                var hash = options.name + "_" + (0, _lib.uniqueID)();
                if ((0, _src3.isWindowClosed)(win)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = _global.global.requestPromises.get(win);
                requestPromises || (requestPromises = [], _global.global.requestPromises.set(win, requestPromises));
                var requestPromise = _src2.ZalgoPromise.try(function() {
                    if ((0, _src3.isAncestor)(window, win)) return (0, _lib.onWindowReady)(win);
                }).then(function() {
                    return new _src2.ZalgoPromise(function(resolve, reject) {
                        var responseListener = {
                            name: name,
                            window: win,
                            domain: domain,
                            respond: function(err, result) {
                                err || (hasResult = !0, requestPromises.splice(requestPromises.indexOf(requestPromise, 1))), 
                                err ? reject(err) : resolve(result);
                            }
                        };
                        if ((0, _drivers.addResponseListener)(hash, responseListener), (0, _drivers.sendMessage)(win, {
                            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                            hash: hash,
                            name: name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, domain).catch(reject), options.fireAndForget) return resolve();
                        var ackTimeout = _conf.CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT, interval = (0, 
                        _lib.safeInterval)(function() {
                            return options.ack && hasResult ? interval.cancel() : (0, _src3.isWindowClosed)(win) ? (interval.cancel(), 
                            reject(options.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"))) : (ackTimeout -= 100, 
                            resTimeout -= 100, ackTimeout <= 0 && !options.ack ? (interval.cancel(), reject(new Error("No ack for postMessage " + name + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"))) : resTimeout <= 0 && !hasResult ? (interval.cancel(), 
                            reject(new Error("No response for postMessage " + name + " in " + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + "ms"))) : void 0);
                        }, 100);
                    });
                });
                return requestPromise.catch(function() {
                    (0, _drivers.deleteResponseListener)(hash);
                }), requestPromises.push(requestPromise), requestPromise;
            });
        }
        function _send(window, name, data, options) {
            return options = options || {}, options.window = window, options.name = name, options.data = data, 
            request(options);
        }
        function sendToParent(name, data, options) {
            var win = (0, _src3.getAncestor)();
            return win ? _send(win, name, data, options) : new _src2.ZalgoPromise(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            return {
                send: function(name, data) {
                    return _send(options.window, name, data, options);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.send = void 0, exports.request = request, exports.sendToParent = sendToParent, 
        exports.client = client;
        var _src = __webpack_require__(5), _src2 = __webpack_require__(2), _src3 = __webpack_require__(1), _conf = __webpack_require__(0), _drivers = __webpack_require__(6), _lib = __webpack_require__(4), _global = __webpack_require__(3);
        _global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap(), 
        exports.send = _send;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function disable() {
            delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", _drivers.messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONSTANTS = exports.CONFIG = void 0;
        var _conf = __webpack_require__(0);
        Object.defineProperty(exports, "CONFIG", {
            enumerable: !0,
            get: function() {
                return _conf.CONFIG;
            }
        }), Object.defineProperty(exports, "CONSTANTS", {
            enumerable: !0,
            get: function() {
                return _conf.CONSTANTS;
            }
        }), exports.disable = disable;
        var _drivers = __webpack_require__(6);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.bridge = exports.parent = void 0;
        var _client = __webpack_require__(30);
        Object.keys(_client).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(33);
        Object.keys(_server).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _server[key];
                }
            });
        });
        var _config = __webpack_require__(31);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _src = __webpack_require__(1);
        exports.parent = (0, _src.getAncestor)(), exports.bridge = void 0;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (!options.handler) throw new Error("Expected options.handler");
            var listenerOptions = {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: options.window,
                domain: options.domain || _conf.CONSTANTS.WILDCARD,
                name: options.name
            }, requestListener = (0, _drivers.addRequestListener)({
                name: listenerOptions.name,
                win: listenerOptions.window,
                domain: listenerOptions.domain
            }, listenerOptions);
            if (options.once) {
                var _handler = listenerOptions.handler;
                listenerOptions.handler = (0, _lib.once)(function() {
                    return requestListener.cancel(), _handler.apply(this, arguments);
                });
            }
            if (listenerOptions.window && options.errorOnClose) var interval = (0, _lib.safeInterval)(function() {
                (0, _src.isWindowClosed)(listenerOptions.window) && (interval.cancel(), listenerOptions.handleError(new Error("Post message target window is closed")));
            }, 50);
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function _on(name, options, handler) {
            return "function" == typeof options && (handler = options, options = {}), options = options || {}, 
            options.name = name, options.handler = handler || options.handler, listen(options);
        }
        function once(name, options, handler) {
            "function" == typeof options && (handler = options, options = {}), options = options || {}, 
            options.name = name, options.handler = handler || options.handler, options.once = !0;
            var prom = new _src2.ZalgoPromise(function(resolve, reject) {
                options.handler = options.handler || function(event) {
                    return resolve(event);
                }, options.errorHandler = options.errorHandler || reject;
            }), myListener = listen(options);
            return prom.cancel = myListener.cancel, prom;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler) {
                    return _on(name, options, handler);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.on = void 0, exports.listen = listen, exports.once = once, exports.listener = listener;
        var _src = __webpack_require__(1), _src2 = __webpack_require__(2), _lib = __webpack_require__(4), _drivers = __webpack_require__(6), _conf = __webpack_require__(0);
        exports.on = _on;
    } ]);
});
//# sourceMappingURL=post-robot.js.map