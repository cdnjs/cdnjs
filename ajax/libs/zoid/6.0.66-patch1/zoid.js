!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("zoid", [], factory) : "object" == typeof exports ? exports.zoid = factory() : root.zoid = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/beaver-logger/client/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "track", function() {
                return _track;
            });
            __webpack_require__.d(interface_namespaceObject, "buffer", function() {
                return buffer;
            });
            __webpack_require__.d(interface_namespaceObject, "tracking", function() {
                return tracking;
            });
            __webpack_require__.d(interface_namespaceObject, "getTransport", function() {
                return getTransport;
            });
            __webpack_require__.d(interface_namespaceObject, "setTransport", function() {
                return setTransport;
            });
            __webpack_require__.d(interface_namespaceObject, "print", function() {
                return print;
            });
            __webpack_require__.d(interface_namespaceObject, "immediateFlush", function() {
                return immediateFlush;
            });
            __webpack_require__.d(interface_namespaceObject, "flush", function() {
                return _flush;
            });
            __webpack_require__.d(interface_namespaceObject, "log", function() {
                return log;
            });
            __webpack_require__.d(interface_namespaceObject, "prefix", function() {
                return prefix;
            });
            __webpack_require__.d(interface_namespaceObject, "debug", function() {
                return debug;
            });
            __webpack_require__.d(interface_namespaceObject, "info", function() {
                return info;
            });
            __webpack_require__.d(interface_namespaceObject, "warn", function() {
                return warn;
            });
            __webpack_require__.d(interface_namespaceObject, "error", function() {
                return error;
            });
            __webpack_require__.d(interface_namespaceObject, "init", function() {
                return init;
            });
            __webpack_require__.d(interface_namespaceObject, "startTransition", function() {
                return startTransition;
            });
            __webpack_require__.d(interface_namespaceObject, "endTransition", function() {
                return endTransition;
            });
            __webpack_require__.d(interface_namespaceObject, "transition", function() {
                return transition;
            });
            __webpack_require__.d(interface_namespaceObject, "payloadBuilders", function() {
                return payloadBuilders;
            });
            __webpack_require__.d(interface_namespaceObject, "metaBuilders", function() {
                return metaBuilders;
            });
            __webpack_require__.d(interface_namespaceObject, "trackingBuilders", function() {
                return trackingBuilders;
            });
            __webpack_require__.d(interface_namespaceObject, "headerBuilders", function() {
                return headerBuilders;
            });
            __webpack_require__.d(interface_namespaceObject, "addPayloadBuilder", function() {
                return addPayloadBuilder;
            });
            __webpack_require__.d(interface_namespaceObject, "addMetaBuilder", function() {
                return addMetaBuilder;
            });
            __webpack_require__.d(interface_namespaceObject, "addTrackingBuilder", function() {
                return addTrackingBuilder;
            });
            __webpack_require__.d(interface_namespaceObject, "addHeaderBuilder", function() {
                return addHeaderBuilder;
            });
            __webpack_require__.d(interface_namespaceObject, "config", function() {
                return config;
            });
            __webpack_require__.d(interface_namespaceObject, "logLevels", function() {
                return logLevels;
            });
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            function extend(dest, src) {
                var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                dest = dest || {};
                src = src || {};
                for (var i in src) src.hasOwnProperty(i) && (!over && dest.hasOwnProperty(i) || (dest[i] = src[i]));
                return dest;
            }
            var windowReady = new src.a(function(resolve) {
                "undefined" != typeof document && "complete" === document.readyState && resolve();
                window.addEventListener && window.addEventListener("load", resolve);
            });
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            var payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
            function addPayloadBuilder(builder) {
                payloadBuilders.push(builder);
            }
            function addMetaBuilder(builder) {
                metaBuilders.push(builder);
            }
            function addTrackingBuilder(builder) {
                trackingBuilders.push(builder);
            }
            function addHeaderBuilder(builder) {
                headerBuilders.push(builder);
            }
            var config = {
                uri: "",
                prefix: "",
                initial_state_name: "init",
                flushInterval: 6e5,
                debounceInterval: 10,
                sizeLimit: 300,
                silent: !1,
                heartbeat: !0,
                heartbeatConsoleLog: !0,
                heartbeatInterval: 5e3,
                heartbeatTooBusy: !1,
                heartbeatTooBusyThreshold: 1e4,
                logLevel: "warn",
                autoLog: [ "warn", "error" ],
                logUnload: !0,
                logPerformance: !0
            }, logLevels = [ "error", "warn", "info", "debug" ], _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, buffer = [], tracking = [];
            Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var logger_transport = function(headers, data, options) {
                return function(method, url) {
                    var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _ref$fireAndForget = (arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}).fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
                    return new src.a(function(resolve) {
                        var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                        if (window.XDomainRequest && !function(url) {
                            var match = url.match(/https?:\/\/[^/]+/);
                            return !match || match[0] === window.location.protocol + "//" + window.location.host;
                        }(url)) {
                            if (!function(url) {
                                return window.location.protocol === url.split("/")[0];
                            }(url)) return resolve();
                            XRequest = window.XDomainRequest;
                        }
                        var req = new XRequest("MSXML2.XMLHTTP.3.0");
                        req.open(method.toUpperCase(), url, !0);
                        if ("function" == typeof req.setRequestHeader) {
                            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            req.setRequestHeader("Content-type", "application/json");
                            for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                        }
                        fireAndForget ? resolve() : req.onreadystatechange = function() {
                            req.readyState > 3 && resolve();
                        };
                        req.send(JSON.stringify(data).replace(/&/g, "%26"));
                    });
                }("post", config.uri, headers, data, options);
            };
            function getTransport() {
                return logger_transport;
            }
            function setTransport(newTransport) {
                logger_transport = newTransport;
            }
            var loaded = !1;
            setTimeout(function() {
                loaded = !0;
            }, 1);
            function print(level, event, payload) {
                if (!loaded) return setTimeout(function() {
                    return print(level, event, payload);
                }, 1);
                if (window.console && window.console.log) {
                    var logLevel = window.LOG_LEVEL || config.logLevel;
                    if (!(logLevels.indexOf(level) > logLevels.indexOf(logLevel))) {
                        payload = payload || {};
                        var args = [ event ];
                        Boolean(window.document.documentMode) && (payload = JSON.stringify(payload));
                        args.push(payload);
                        (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
            }
            function immediateFlush() {
                var _ref$fireAndForget = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
                if (config.uri) {
                    var hasBuffer = buffer.length, hasTracking = tracking.length;
                    if (hasBuffer || hasTracking) {
                        for (var meta = {}, _i2 = 0, _length2 = null == metaBuilders ? 0 : metaBuilders.length; _i2 < _length2; _i2++) {
                            var builder = metaBuilders[_i2];
                            try {
                                extend(meta, builder(meta), !1);
                            } catch (err) {
                                console.error("Error in custom meta builder:", err.stack || err.toString());
                            }
                        }
                        for (var headers = {}, _i4 = 0, _length4 = null == headerBuilders ? 0 : headerBuilders.length; _i4 < _length4; _i4++) {
                            var _builder = headerBuilders[_i4];
                            try {
                                extend(headers, _builder(headers), !1);
                            } catch (err) {
                                console.error("Error in custom header builder:", err.stack || err.toString());
                            }
                        }
                        var req = logger_transport(headers, {
                            events: buffer,
                            meta: meta,
                            tracking: tracking
                        }, {
                            fireAndForget: fireAndForget
                        });
                        buffer = [];
                        tracking = [];
                        return req;
                    }
                }
            }
            var method, interval, debounce, _flush = (method = immediateFlush, interval = config.debounceInterval, 
            debounce = {}, function() {
                var args = arguments;
                if (debounce.timeout) {
                    clearTimeout(debounce.timeout);
                    delete debounce.timeout;
                }
                debounce.timeout = setTimeout(function() {
                    var resolver = debounce.resolver, rejector = debounce.rejector;
                    delete debounce.promise;
                    delete debounce.resolver;
                    delete debounce.rejector;
                    delete debounce.timeout;
                    return src.a.resolve().then(function() {
                        return method.apply(null, args);
                    }).then(resolver, rejector);
                }, interval);
                debounce.promise = debounce.promise || new src.a(function(resolver, rejector) {
                    debounce.resolver = resolver;
                    debounce.rejector = rejector;
                });
                return debounce.promise;
            });
            function enqueue(level, event, payload) {
                buffer.push({
                    level: level,
                    event: event,
                    payload: payload
                });
                config.autoLog.indexOf(level) > -1 && _flush();
            }
            function log(level, event, payload) {
                config.prefix && (event = config.prefix + "_" + event);
                "string" == typeof (payload = payload || {}) ? payload = {
                    message: payload
                } : payload instanceof Error && (payload = {
                    error: payload.stack || payload.toString()
                });
                try {
                    JSON.stringify(payload);
                } catch (err) {
                    return;
                }
                payload.timestamp = Date.now();
                for (var _i6 = 0, _length6 = null == payloadBuilders ? 0 : payloadBuilders.length; _i6 < _length6; _i6++) {
                    var builder = payloadBuilders[_i6];
                    try {
                        extend(payload, builder(payload), !1);
                    } catch (err) {
                        console.error("Error in custom payload builder:", err.stack || err.toString());
                    }
                }
                config.silent || print(level, event, payload);
                buffer.length === config.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < config.sizeLimit && enqueue(level, event, payload);
            }
            function prefix(name) {
                return {
                    debug: function(event, payload) {
                        return log("debug", name + "_" + event, payload);
                    },
                    info: function(event, payload) {
                        return log("info", name + "_" + event, payload);
                    },
                    warn: function(event, payload) {
                        return log("warn", name + "_" + event, payload);
                    },
                    error: function(event, payload) {
                        return log("error", name + "_" + event, payload);
                    },
                    track: function(payload) {
                        return _track(payload);
                    },
                    flush: function() {
                        return _flush();
                    }
                };
            }
            function debug(event, payload) {
                return log("debug", event, payload);
            }
            function info(event, payload) {
                return log("info", event, payload);
            }
            function warn(event, payload) {
                return log("warn", event, payload);
            }
            function error(event, payload) {
                return log("error", event, payload);
            }
            function _track(payload) {
                if (payload) {
                    try {
                        JSON.stringify(payload);
                    } catch (err) {
                        return;
                    }
                    for (var _i8 = 0, _length8 = null == trackingBuilders ? 0 : trackingBuilders.length; _i8 < _length8; _i8++) {
                        var builder = trackingBuilders[_i8];
                        try {
                            extend(payload, builder(payload), !1);
                        } catch (err) {
                            console.error("Error in custom tracking builder:", err.stack || err.toString());
                        }
                    }
                    print("debug", "tracking", payload);
                    tracking.push(payload);
                }
            }
            var enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0;
            function now() {
                return enablePerformance ? performance.now() : Date.now();
            }
            function timer(startTime) {
                return {
                    startTime: startTime = void 0 !== startTime ? startTime : now(),
                    elapsed: function() {
                        return parseInt(now() - startTime, 10);
                    },
                    reset: function() {
                        startTime = now();
                    }
                };
            }
            function reqStartElapsed() {
                if (enablePerformance) {
                    var timing = window.performance.timing;
                    return parseInt(timing.connectEnd - timing.navigationStart, 10);
                }
            }
            var clientTimer = timer(), reqTimer = timer(reqStartElapsed());
            var initiated = !1;
            function init(conf) {
                extend(config, conf || {});
                if (!initiated) {
                    initiated = !0;
                    config.logPerformance && function() {
                        if (!enablePerformance) return info("no_performance_data");
                        addPayloadBuilder(function() {
                            var payload = {};
                            payload.client_elapsed = clientTimer.elapsed();
                            enablePerformance && (payload.req_elapsed = reqTimer.elapsed());
                            return payload;
                        });
                        windowReady.then(function() {
                            var timing = {};
                            [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ].forEach(function(key) {
                                timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                            });
                            var offset = timing.connectEnd - timing.navigationStart;
                            timing.connectEnd && Object.keys(timing).forEach(function(name) {
                                var time = timing[name];
                                time && info("timing_" + name, {
                                    client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                                    req_elapsed: parseInt(time - timing.connectEnd, 10)
                                });
                            });
                            info("timing", timing);
                            info("memory", window.performance.memory);
                            info("navigation", window.performance.navigation);
                            window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                                [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && info(resource.initiatorType, resource);
                            });
                        });
                    }();
                    config.heartbeat && (heartBeatTimer = timer(), heartbeatCount = 0, time = config.heartbeatInterval, 
                    function loop() {
                        setTimeout(function() {
                            !function() {
                                if (!(config.heartbeatMaxThreshold && heartbeatCount > config.heartbeatMaxThreshold)) {
                                    heartbeatCount += 1;
                                    var elapsed = heartBeatTimer.elapsed(), lag = elapsed - config.heartbeatInterval, heartbeatPayload = {
                                        count: heartbeatCount,
                                        elapsed: elapsed
                                    };
                                    if (config.heartbeatTooBusy) {
                                        heartbeatPayload.lag = lag;
                                        lag >= config.heartbeatTooBusyThreshold && info("toobusy", heartbeatPayload, config.heartbeatConsoleLog);
                                    }
                                    info("heartbeat", heartbeatPayload, config.heartbeatConsoleLog);
                                }
                            }();
                            loop();
                        }, time);
                    }());
                    if (config.logUnload) {
                        window.addEventListener("beforeunload", function() {
                            info("window_beforeunload");
                            immediateFlush({
                                fireAndForget: !0
                            });
                        });
                        window.addEventListener("unload", function() {
                            info("window_unload");
                            immediateFlush({
                                fireAndForget: !0
                            });
                        });
                    }
                    config.flushInterval && setInterval(_flush, config.flushInterval);
                    if (window.beaverLogQueue) {
                        window.beaverLogQueue.forEach(function(payload) {
                            log(payload.level, payload.event, payload);
                        });
                        delete window.beaverLogQueue;
                    }
                }
                var time, heartBeatTimer, heartbeatCount;
            }
            var windowID = uniqueID(), pageID = uniqueID(), currentState = config.initial_state_name, startTime = void 0;
            function startTransition() {
                startTime = now();
            }
            function endTransition(toState) {
                startTime = startTime || reqStartElapsed();
                var currentTime = now(), elapsedTime = void 0;
                void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
                var transitionName = "transition_" + currentState + "_to_" + toState;
                info(transitionName, {
                    duration: elapsedTime
                });
                _track({
                    transition: transitionName,
                    transition_time: elapsedTime
                });
                immediateFlush();
                startTime = currentTime;
                currentState = toState;
                pageID = uniqueID();
            }
            function transition(toState) {
                startTransition();
                endTransition(toState);
            }
            addPayloadBuilder(function() {
                return {
                    windowID: windowID,
                    pageID: pageID
                };
            });
            addMetaBuilder(function() {
                return {
                    state: "ui_" + currentState
                };
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return _track;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return buffer;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return tracking;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getTransport;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return setTransport;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return print;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return immediateFlush;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return _flush;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return log;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return prefix;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return debug;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return info;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return warn;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return error;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return init;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return startTransition;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return endTransition;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return transition;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return payloadBuilders;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return metaBuilders;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return trackingBuilders;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return headerBuilders;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return addPayloadBuilder;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return addMetaBuilder;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return addTrackingBuilder;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return addHeaderBuilder;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return config;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return logLevels;
            });
        },
        "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d({}, "WeakMap", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            function safeIndexOf(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }
            var defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof CrossDomainSafeWeakMap)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if (function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var testWeakMap = new WeakMap(), testKey = {};
                            Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return "__testvalue__" === testWeakMap.get(testKey);
                        } catch (err) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (Object(src.isWindow)(value) && Object(src.isWindowClosed)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function(key) {
                    if (Object(src.isWindow)(key)) return !1;
                    try {
                        key && key.self;
                        key && key[this.name];
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                };
                CrossDomainSafeWeakMap.prototype.set = function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
                        if (-1 === index) {
                            keys.push(key);
                            values.push(value);
                        } else values[index] = value;
                    }
                };
                CrossDomainSafeWeakMap.prototype.get = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        var index = safeIndexOf(this.keys, key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                };
                CrossDomainSafeWeakMap.prototype.delete = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = safeIndexOf(keys, key);
                        if (-1 !== index) {
                            keys.splice(index, 1);
                            this.values.splice(index, 1);
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.has = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return !0;
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    }
                    this._cleanupClosedWindows();
                    return -1 !== safeIndexOf(this.keys, key);
                };
                CrossDomainSafeWeakMap.prototype.getOrSet = function(key, getter) {
                    if (this.has(key)) return this.get(key);
                    var value = getter();
                    this.set(key, value);
                    return value;
                };
                return CrossDomainSafeWeakMap;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
        },
        "./node_modules/cross-domain-utils/src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return PROTOCOL;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return WILDCARD;
            });
            var PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:",
                ABOUT: "about:"
            }, WILDCARD = "*";
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            __webpack_require__.d(__webpack_exports__, "findFrameByName", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getActualDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getAllFramesInWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.c;
            });
            __webpack_require__.d(__webpack_exports__, "getAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getDistanceFromTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.e;
            });
            __webpack_require__.d(__webpack_exports__, "getDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.f;
            });
            __webpack_require__.d(__webpack_exports__, "getDomainFromUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.g;
            });
            __webpack_require__.d(__webpack_exports__, "getFrameByName", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.h;
            });
            __webpack_require__.d(__webpack_exports__, "getFrames", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.i;
            });
            __webpack_require__.d(__webpack_exports__, "getNthParentFromTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.j;
            });
            __webpack_require__.d(__webpack_exports__, "getOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.k;
            });
            __webpack_require__.d(__webpack_exports__, "getParent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.l;
            });
            __webpack_require__.d(__webpack_exports__, "getTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.m;
            });
            __webpack_require__.d(__webpack_exports__, "getUserAgent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.n;
            });
            __webpack_require__.d(__webpack_exports__, "isActuallySameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.o;
            });
            __webpack_require__.d(__webpack_exports__, "isAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.p;
            });
            __webpack_require__.d(__webpack_exports__, "isIframe", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.q;
            });
            __webpack_require__.d(__webpack_exports__, "isOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.r;
            });
            __webpack_require__.d(__webpack_exports__, "isPopup", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.s;
            });
            __webpack_require__.d(__webpack_exports__, "isSameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.t;
            });
            __webpack_require__.d(__webpack_exports__, "isSameTopWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.u;
            });
            __webpack_require__.d(__webpack_exports__, "isTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.v;
            });
            __webpack_require__.d(__webpack_exports__, "isWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.w;
            });
            __webpack_require__.d(__webpack_exports__, "isWindowClosed", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.x;
            });
            __webpack_require__.d(__webpack_exports__, "linkFrameWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.y;
            });
            __webpack_require__.d(__webpack_exports__, "matchDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.z;
            });
            __webpack_require__.d(__webpack_exports__, "onCloseWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.A;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyDomainPattern", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.B;
            });
            var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__), __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
        "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            var constants = __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
            __webpack_exports__.l = getParent;
            __webpack_exports__.k = getOpener;
            __webpack_exports__.b = getActualDomain;
            __webpack_exports__.f = getDomain;
            __webpack_exports__.o = isActuallySameDomain;
            __webpack_exports__.t = isSameDomain;
            __webpack_exports__.i = getFrames;
            __webpack_exports__.m = getTop;
            __webpack_exports__.c = getAllFramesInWindow;
            __webpack_exports__.v = function(win) {
                return win === getTop(win);
            };
            __webpack_exports__.x = isWindowClosed;
            __webpack_exports__.y = function(frame) {
                !function() {
                    for (var i = 0; i < iframeWindows.length; i++) {
                        var closed = !1;
                        try {
                            closed = iframeWindows[i].closed;
                        } catch (err) {}
                        if (closed) {
                            iframeFrames.splice(i, 1);
                            iframeWindows.splice(i, 1);
                        }
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            };
            __webpack_exports__.n = function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            };
            __webpack_exports__.h = getFrameByName;
            __webpack_exports__.a = function(win, name) {
                var frame;
                return (frame = getFrameByName(win, name)) ? frame : function findChildFrameByName(win, name) {
                    var frame = getFrameByName(win, name);
                    if (frame) return frame;
                    for (var _i11 = 0, _getFrames4 = getFrames(win), _length10 = null == _getFrames4 ? 0 : _getFrames4.length; _i11 < _length10; _i11++) {
                        var namedFrame = findChildFrameByName(_getFrames4[_i11], name);
                        if (namedFrame) return namedFrame;
                    }
                }(getTop(win) || win, name);
            };
            __webpack_exports__.r = function(parent, child) {
                return parent === getOpener(child);
            };
            __webpack_exports__.d = getAncestor;
            __webpack_exports__.p = function(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _i15 = 0, _getFrames8 = getFrames(parent), _length14 = null == _getFrames8 ? 0 : _getFrames8.length; _i15 < _length14; _i15++) if (_getFrames8[_i15] === child) return !0;
                return !1;
            };
            __webpack_exports__.s = function() {
                return Boolean(getOpener(window));
            };
            __webpack_exports__.q = function() {
                return Boolean(getParent(window));
            };
            __webpack_exports__.e = getDistanceFromTop;
            __webpack_exports__.j = function(win) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return function(win) {
                    for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                        if (!parent) return;
                        parent = getParent(parent);
                    }
                    return parent;
                }(win, getDistanceFromTop(win) - n);
            };
            __webpack_exports__.u = function(win1, win2) {
                var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
                1));
            };
            __webpack_exports__.z = function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === constants.b || origin === pattern;
                    if (isRegex(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                }));
            };
            __webpack_exports__.B = function(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
            };
            __webpack_exports__.g = function(url) {
                return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : getDomain();
            };
            __webpack_exports__.A = function(win, callback) {
                var delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, maxtime = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0, timeout = void 0;
                !function check() {
                    if (isWindowClosed(win)) {
                        timeout && clearTimeout(timeout);
                        return callback();
                    }
                    if (maxtime <= 0) clearTimeout(timeout); else {
                        maxtime -= delay;
                        timeout = setTimeout(check, delay);
                    }
                }();
                return {
                    cancel: function() {
                        timeout && clearTimeout(timeout);
                    }
                };
            };
            __webpack_exports__.w = function(obj) {
                try {
                    if (obj === window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if ("[object Window]" === Object.prototype.toString.call(obj)) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (window.Window && obj instanceof window.Window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.self === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.parent === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.top === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    obj && obj.__cross_domain_utils_window_check__;
                } catch (err) {
                    return !0;
                }
                return !1;
            };
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === constants.a.ABOUT;
            }
            function getParent(win) {
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
            function getOpener(win) {
                if (win && !getParent(win)) try {
                    return win.opener;
                } catch (err) {}
            }
            function canReadFromWindow(win) {
                try {
                    win && win.location && win.location.href;
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain(win) {
                var location = (win = win || window).location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === constants.a.FILE) return constants.a.FILE + "//";
                if (protocol === constants.a.ABOUT) {
                    var parent = getParent(win);
                    return parent && canReadFromWindow(parent) ? getActualDomain(parent) : constants.a.ABOUT + "//";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function getDomain(win) {
                var domain = getActualDomain(win = win || window);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(constants.a.MOCK) ? win.mockDomain : domain;
            }
            function isActuallySameDomain(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }
            function isSameDomain(win) {
                if (!isActuallySameDomain(win)) return !1;
                try {
                    if (win === window) return !0;
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                    if (getDomain(window) === getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : -1 !== function(win) {
                    var result = [];
                    try {
                        for (;win.parent !== win; ) {
                            result.push(win.parent);
                            win = win.parent;
                        }
                    } catch (err) {}
                    return result;
                }(child).indexOf(parent);
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
                for (var result = [], _i3 = 0, _getFrames2 = getFrames(win), _length2 = null == _getFrames2 ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
                    var frame = _getFrames2[_i3];
                    result.push(frame);
                    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = null == _getAllChildFrames2 ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
                        var childFrame = _getAllChildFrames2[_i5];
                        result.push(childFrame);
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
                        if (isAncestorParent(window, win) && window.top) return window.top;
                    } catch (err) {}
                    try {
                        if (isAncestorParent(win, window) && window.top) return window.top;
                    } catch (err) {}
                    for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win), _length6 = null == _getAllChildFrames4 ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
                        var frame = _getAllChildFrames4[_i7];
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (getParent(frame) === frame) return frame;
                    }
                }
            }
            function getAllFramesInWindow(win) {
                var top = getTop(win);
                if (!top) throw new Error("Can not determine top window");
                return [].concat(getAllChildFrames(top), [ top ]);
            }
            var iframeWindows = [], iframeFrames = [];
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
                    return !err || err.message !== IE_WIN_ACCESS_ERROR;
                }
                if (allowMock && isSameDomain(win)) try {
                    if (win.mockclosed) return !0;
                } catch (err) {}
                try {
                    if (!win.parent || !win.top) return !0;
                } catch (err) {}
                var iframeIndex = function(collection, item) {
                    for (var i = 0; i < collection.length; i++) try {
                        if (collection[i] === item) return i;
                    } catch (err) {}
                    return -1;
                }(iframeWindows, win);
                if (-1 !== iframeIndex) {
                    var frame = iframeFrames[iframeIndex];
                    if (frame && function(frame) {
                        if (!frame.contentWindow) return !0;
                        if (!frame.parentNode) return !0;
                        var doc = frame.ownerDocument;
                        return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                    }(frame)) return !0;
                }
                return !1;
            }
            function getFrameByName(win, name) {
                for (var winFrames = getFrames(win), _i9 = 0, _length8 = null == winFrames ? 0 : winFrames.length; _i9 < _length8; _i9++) {
                    var childFrame = winFrames[_i9];
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
            function getAncestor(win) {
                return getOpener(win = win || window) || getParent(win) || void 0;
            }
            function anyMatch(collection1, collection2) {
                for (var _i17 = 0, _length16 = null == collection1 ? 0 : collection1.length; _i17 < _length16; _i17++) for (var item1 = collection1[_i17], _i19 = 0, _length18 = null == collection2 ? 0 : collection2.length; _i19 < _length18; _i19++) if (item1 === collection2[_i19]) return !0;
                return !1;
            }
            function getDistanceFromTop() {
                for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent; ) (parent = getParent(parent)) && (distance += 1);
                return distance;
            }
        },
        "./node_modules/hi-base32/src/base32.js": function(module, exports, __webpack_require__) {
            (function(module) {
                var __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                !function() {
                    "use strict";
                    var root = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) ? window : {};
                    !root.HI_BASE32_NO_NODE_JS && "object" === ("undefined" == typeof process ? "undefined" : _typeof(process)) && process.versions && process.versions.node && (root = window);
                    var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && "object" === _typeof(module) && module.exports, AMD = __webpack_require__("./node_modules/webpack/buildin/amd-options.js"), BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""), BASE32_DECODE_CHAR = {
                        A: 0,
                        B: 1,
                        C: 2,
                        D: 3,
                        E: 4,
                        F: 5,
                        G: 6,
                        H: 7,
                        I: 8,
                        J: 9,
                        K: 10,
                        L: 11,
                        M: 12,
                        N: 13,
                        O: 14,
                        P: 15,
                        Q: 16,
                        R: 17,
                        S: 18,
                        T: 19,
                        U: 20,
                        V: 21,
                        W: 22,
                        X: 23,
                        Y: 24,
                        Z: 25,
                        2: 26,
                        3: 27,
                        4: 28,
                        5: 29,
                        6: 30,
                        7: 31
                    }, blocks = [ 0, 0, 0, 0, 0, 0, 0, 0 ], throwInvalidUtf8 = function(position, partial) {
                        partial.length > 10 && (partial = "..." + partial.substr(-10));
                        var err = new Error("Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading " + position + " bytes: " + partial + " <-");
                        err.position = position;
                        throw err;
                    }, decodeAsBytes = function(base32Str) {
                        if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                        for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = (base32Str = base32Str.replace(/=/g, "")).length, i = 0, count = length >> 3 << 3; i < count; ) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                            bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                            bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                            bytes[index++] = 255 & (v7 << 5 | v8);
                        }
                        var remain = length - count;
                        if (2 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        } else if (4 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        } else if (5 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                            bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        } else if (7 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                            bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                            bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                        }
                        return bytes;
                    }, decode = function(base32Str, asciiOnly) {
                        if (!asciiOnly) return function(bytes) {
                            for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) if ((b = bytes[i++]) <= 127) str += String.fromCharCode(b); else {
                                if (b > 191 && b <= 223) {
                                    c = 31 & b;
                                    followingChars = 1;
                                } else if (b <= 239) {
                                    c = 15 & b;
                                    followingChars = 2;
                                } else if (b <= 247) {
                                    c = 7 & b;
                                    followingChars = 3;
                                } else throwInvalidUtf8(i, str);
                                for (var j = 0; j < followingChars; ++j) {
                                    ((b = bytes[i++]) < 128 || b > 191) && throwInvalidUtf8(i, str);
                                    c <<= 6;
                                    c += 63 & b;
                                }
                                c >= 55296 && c <= 57343 && throwInvalidUtf8(i, str);
                                c > 1114111 && throwInvalidUtf8(i, str);
                                if (c <= 65535) str += String.fromCharCode(c); else {
                                    c -= 65536;
                                    str += String.fromCharCode(55296 + (c >> 10));
                                    str += String.fromCharCode(56320 + (1023 & c));
                                }
                            }
                            return str;
                        }(decodeAsBytes(base32Str));
                        if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                        var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                        -1 === length && (length = base32Str.length);
                        for (var i = 0, count = length >> 3 << 3; i < count; ) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                        }
                        var remain = length - count;
                        if (2 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2));
                        } else if (4 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4));
                        } else if (5 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1));
                        } else if (7 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3));
                        }
                        return str;
                    }, exports = {
                        encode: function(input, asciiOnly) {
                            var notString = "string" != typeof input;
                            notString && input.constructor === ArrayBuffer && (input = new Uint8Array(input));
                            return notString ? function(bytes) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i++];
                                    v5 = bytes[i++];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                var remain = length - count;
                                if (1 === remain) {
                                    v1 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                                } else if (2 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                } else if (3 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                } else if (4 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                }
                                return base32Str;
                            }(input) : asciiOnly ? function(str) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i++);
                                    v5 = str.charCodeAt(i++);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                var remain = length - count;
                                if (1 === remain) {
                                    v1 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                                } else if (2 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                } else if (3 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                } else if (4 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                }
                                return base32Str;
                            }(input) : function(str) {
                                var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, length = str.length;
                                do {
                                    blocks[0] = blocks[5];
                                    blocks[1] = blocks[6];
                                    blocks[2] = blocks[7];
                                    for (i = start; index < length && i < 5; ++index) if ((code = str.charCodeAt(index)) < 128) blocks[i++] = code; else if (code < 2048) {
                                        blocks[i++] = 192 | code >> 6;
                                        blocks[i++] = 128 | 63 & code;
                                    } else if (code < 55296 || code >= 57344) {
                                        blocks[i++] = 224 | code >> 12;
                                        blocks[i++] = 128 | code >> 6 & 63;
                                        blocks[i++] = 128 | 63 & code;
                                    } else {
                                        code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index));
                                        blocks[i++] = 240 | code >> 18;
                                        blocks[i++] = 128 | code >> 12 & 63;
                                        blocks[i++] = 128 | code >> 6 & 63;
                                        blocks[i++] = 128 | 63 & code;
                                    }
                                    start = i - 5;
                                    index === length && ++index;
                                    index > length && i < 6 && (end = !0);
                                    v1 = blocks[0];
                                    if (i > 4) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        v5 = blocks[4];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                    } else if (1 === i) base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======"; else if (2 === i) {
                                        v2 = blocks[1];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                    } else if (3 === i) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                    } else {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                    }
                                } while (!end);
                                return base32Str;
                            }(input);
                        },
                        decode: decode
                    };
                    decode.asBytes = decodeAsBytes;
                    if (COMMON_JS) module.exports = exports; else {
                        root.base32 = exports;
                        AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                            return exports;
                        }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
                    }
                }();
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module));
        },
        "./node_modules/post-robot/src/bridge/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js");
            global.a.tunnelWindows = global.a.tunnelWindows || {};
            global.a.tunnelWindowId = 0;
            function deleteTunnelWindow(id) {
                try {
                    global.a.tunnelWindows[id] && delete global.a.tunnelWindows[id].source;
                } catch (err) {}
                delete global.a.tunnelWindows[id];
            }
            global.a.openTunnelToParent = function(_ref2) {
                var name = _ref2.name, source = _ref2.source, canary = _ref2.canary, sendMessage = _ref2.sendMessage, parentWindow = Object(cross_domain_utils_src.getParent)(window);
                if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                var id = function(_ref) {
                    var name = _ref.name, source = _ref.source, canary = _ref.canary, sendMessage = _ref.sendMessage;
                    !function() {
                        for (var tunnelWindows = global.a.tunnelWindows, _i2 = 0, _Object$keys2 = Object.keys(tunnelWindows), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                            var key = _Object$keys2[_i2], tunnelWindow = tunnelWindows[key];
                            try {
                                Object(lib.j)(tunnelWindow.source);
                            } catch (err) {
                                deleteTunnelWindow(key);
                                continue;
                            }
                            Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source) && deleteTunnelWindow(key);
                        }
                    }();
                    global.a.tunnelWindowId += 1;
                    global.a.tunnelWindows[global.a.tunnelWindowId] = {
                        name: name,
                        source: source,
                        canary: canary,
                        sendMessage: sendMessage
                    };
                    return global.a.tunnelWindowId;
                }({
                    name: name,
                    source: source,
                    canary: canary,
                    sendMessage: sendMessage
                });
                return global.a.send(parentWindow, conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                    name: name,
                    sendMessage: function() {
                        var tunnelWindow = function(id) {
                            return global.a.tunnelWindows[id];
                        }(id);
                        try {
                            Object(lib.j)(tunnelWindow && tunnelWindow.source);
                        } catch (err) {
                            deleteTunnelWindow(id);
                            return;
                        }
                        if (tunnelWindow && tunnelWindow.source && !Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source)) {
                            try {
                                tunnelWindow.canary();
                            } catch (err) {
                                return;
                            }
                            tunnelWindow.sendMessage.apply(this, arguments);
                        }
                    }
                }, {
                    domain: conf.b.WILDCARD
                });
            };
            var cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
            function needsBridgeForBrowser() {
                return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.a.ALLOW_POSTMESSAGE_POPUP;
            }
            function needsBridgeForWin(win) {
                return !Object(cross_domain_utils_src.isSameTopWindow)(window, win);
            }
            function needsBridgeForDomain(domain, win) {
                if (domain) {
                    if (Object(cross_domain_utils_src.getDomain)() !== Object(cross_domain_utils_src.getDomainFromUrl)(domain)) return !0;
                } else if (win && !Object(cross_domain_utils_src.isSameDomain)(win)) return !0;
                return !1;
            }
            function needsBridge(_ref) {
                var win = _ref.win, domain = _ref.domain;
                return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
            }
            function getBridgeName(domain) {
                var sanitizedDomain = (domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
                return conf.b.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
            }
            function isBridge() {
                return Boolean(window.name && window.name === getBridgeName(Object(cross_domain_utils_src.getDomain)()));
            }
            var documentBodyReady = new src.a(function(resolve) {
                if (window.document && window.document.body) return resolve(window.document.body);
                var interval = setInterval(function() {
                    if (window.document && window.document.body) {
                        clearInterval(interval);
                        return resolve(window.document.body);
                    }
                }, 10);
            });
            global.a.remoteWindows = global.a.remoteWindows || new cross_domain_safe_weakmap_src.a();
            function registerRemoteWindow(win) {
                global.a.remoteWindows.set(win, {
                    sendMessagePromise: new src.a()
                });
            }
            function findRemoteWindow(win) {
                return global.a.remoteWindows.get(win);
            }
            function registerRemoteSendMessage(win, domain, sendMessage) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
                var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                    if (remoteWin !== win) throw new Error("Remote window does not match window");
                    if (!Object(cross_domain_utils_src.matchDomain)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                    sendMessage(message);
                };
                remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
                remoteWindow.sendMessagePromise = src.a.resolve(sendMessageWrapper);
            }
            function rejectRemoteSendMessage(win, err) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
                remoteWindow.sendMessagePromise.asyncReject(err);
            }
            function sendBridgeMessage(win, message, domain) {
                var messagingChild = Object(cross_domain_utils_src.isOpener)(window, win), messagingParent = Object(cross_domain_utils_src.isOpener)(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to send message to");
                return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                    return sendMessage(win, message, domain);
                });
            }
            var awaitRemoteBridgeForWindow = Object(lib.r)(function(win) {
                return src.a.try(function() {
                    for (var _i2 = 0, _getFrames2 = Object(cross_domain_utils_src.getFrames)(win), _length2 = null == _getFrames2 ? 0 : _getFrames2.length; _i2 < _length2; _i2++) {
                        var frame = _getFrames2[_i2];
                        try {
                            if (frame && frame !== window && Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.b.WINDOW_PROPS.POSTROBOT]) return frame;
                        } catch (err) {
                            continue;
                        }
                    }
                    try {
                        var _frame = Object(cross_domain_utils_src.getFrameByName)(win, getBridgeName(Object(cross_domain_utils_src.getDomain)()));
                        if (!_frame) return;
                        return Object(cross_domain_utils_src.isSameDomain)(_frame) && _frame[conf.b.WINDOW_PROPS.POSTROBOT] ? _frame : new src.a(function(resolve) {
                            var interval = void 0, timeout = void 0;
                            interval = setInterval(function() {
                                if (_frame && Object(cross_domain_utils_src.isSameDomain)(_frame) && _frame[conf.b.WINDOW_PROPS.POSTROBOT]) {
                                    clearInterval(interval);
                                    clearTimeout(timeout);
                                    return resolve(_frame);
                                }
                            }, 100);
                            timeout = setTimeout(function() {
                                clearInterval(interval);
                                return resolve();
                            }, 2e3);
                        });
                    } catch (err) {}
                });
            });
            function openTunnelToOpener() {
                return src.a.try(function() {
                    var opener = Object(cross_domain_utils_src.getOpener)(window);
                    if (opener && needsBridge({
                        win: opener
                    })) {
                        registerRemoteWindow(opener);
                        return awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                            return bridge ? window.name ? bridge[conf.b.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                                name: window.name,
                                source: window,
                                canary: function() {},
                                sendMessage: function(message) {
                                    try {
                                        Object(lib.j)(window);
                                    } catch (err) {
                                        return;
                                    }
                                    if (window && !window.closed) try {
                                        global.a.receiveMessage({
                                            data: message,
                                            origin: this.origin,
                                            source: this.source
                                        });
                                    } catch (err) {
                                        src.a.reject(err);
                                    }
                                }
                            }).then(function(_ref) {
                                var source = _ref.source, origin = _ref.origin, data = _ref.data;
                                if (source !== opener) throw new Error("Source does not match opener");
                                registerRemoteSendMessage(source, origin, data.sendMessage);
                            }).catch(function(err) {
                                rejectRemoteSendMessage(opener, err);
                                throw err;
                            }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                        });
                    }
                });
            }
            global.a.bridges = global.a.bridges || {};
            global.a.bridgeFrames = global.a.bridgeFrames || {};
            global.a.popupWindowsByWin = global.a.popupWindowsByWin || new cross_domain_safe_weakmap_src.a();
            global.a.popupWindowsByName = global.a.popupWindowsByName || {};
            function hasBridge(url, domain) {
                domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
                return Boolean(global.a.bridges[domain]);
            }
            function openBridge(url, domain) {
                domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
                if (global.a.bridges[domain]) return global.a.bridges[domain];
                global.a.bridges[domain] = src.a.try(function() {
                    if (Object(cross_domain_utils_src.getDomain)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                    var name = getBridgeName(domain);
                    if (Object(cross_domain_utils_src.getFrameByName)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                    var iframe = function(name, url) {
                        var iframe = document.createElement("iframe");
                        iframe.setAttribute("name", name);
                        iframe.setAttribute("id", name);
                        iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;");
                        iframe.setAttribute("frameborder", "0");
                        iframe.setAttribute("border", "0");
                        iframe.setAttribute("scrolling", "no");
                        iframe.setAttribute("allowTransparency", "true");
                        iframe.setAttribute("tabindex", "-1");
                        iframe.setAttribute("hidden", "true");
                        iframe.setAttribute("title", "");
                        iframe.setAttribute("role", "presentation");
                        iframe.src = url;
                        return iframe;
                    }(name, url);
                    global.a.bridgeFrames[domain] = iframe;
                    return documentBodyReady.then(function(body) {
                        body.appendChild(iframe);
                        var bridge = iframe.contentWindow;
                        !function(source, domain) {
                            global.a.on(conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                                window: source,
                                domain: domain
                            }, function(_ref) {
                                var origin = _ref.origin, data = _ref.data;
                                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                                if (!data.name) throw new Error("Register window expected to be passed window name");
                                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                                if (!global.a.popupWindowsByName[data.name]) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                                if (!global.a.popupWindowsByName[data.name].domain) throw new Error("We do not have a registered domain for window " + data.name);
                                if (global.a.popupWindowsByName[data.name].domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + global.a.popupWindowsByName[data.name].domain);
                                registerRemoteSendMessage(global.a.popupWindowsByName[data.name].win, domain, data.sendMessage);
                                return {
                                    sendMessage: function(message) {
                                        if (window && !window.closed) {
                                            var winDetails = global.a.popupWindowsByName[data.name];
                                            if (winDetails) try {
                                                global.a.receiveMessage({
                                                    data: message,
                                                    origin: winDetails.domain,
                                                    source: winDetails.win
                                                });
                                            } catch (err) {
                                                src.a.reject(err);
                                            }
                                        }
                                    }
                                };
                            });
                        }(bridge, domain);
                        return new src.a(function(resolve, reject) {
                            iframe.onload = resolve;
                            iframe.onerror = reject;
                        }).then(function() {
                            return Object(lib.k)(bridge, conf.a.BRIDGE_TIMEOUT, "Bridge " + url);
                        }).then(function() {
                            return bridge;
                        });
                    });
                });
                return global.a.bridges[domain];
            }
            var windowOpen = window.open;
            window.open = function(url, name, options, last) {
                var domain = url;
                if (url && 0 === url.indexOf(conf.b.MOCK_PROTOCOL)) {
                    var _url$split = url.split("|");
                    domain = _url$split[0];
                    url = _url$split[1];
                }
                domain && (domain = Object(cross_domain_utils_src.getDomainFromUrl)(domain));
                var win = windowOpen.call(this, url, name, options, last);
                if (!win) return win;
                url && registerRemoteWindow(win);
                for (var _i2 = 0, _Object$keys2 = Object.keys(global.a.popupWindowsByName), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                    var winName = _Object$keys2[_i2];
                    Object(cross_domain_utils_src.isWindowClosed)(global.a.popupWindowsByName[winName].win) && delete global.a.popupWindowsByName[winName];
                }
                if (name && win) {
                    var winOptions = global.a.popupWindowsByWin.get(win) || global.a.popupWindowsByName[name] || {};
                    winOptions.name = winOptions.name || name;
                    winOptions.win = winOptions.win || win;
                    winOptions.domain = winOptions.domain || domain;
                    global.a.popupWindowsByWin.set(win, winOptions);
                    global.a.popupWindowsByName[name] = winOptions;
                }
                return win;
            };
            function linkUrl(win, url) {
                var winOptions = global.a.popupWindowsByWin.get(win);
                if (winOptions) {
                    winOptions.domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                    registerRemoteWindow(win);
                }
            }
            function destroyBridges() {
                for (var _i4 = 0, _Object$keys4 = Object.keys(global.a.bridgeFrames), _length4 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                    var domain = _Object$keys4[_i4], frame = global.a.bridgeFrames[domain];
                    frame.parentNode && frame.parentNode.removeChild(frame);
                }
                global.a.bridgeFrames = {};
                global.a.bridges = {};
            }
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "getBridgeName", function() {
                return getBridgeName;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "documentBodyReady", function() {
                return documentBodyReady;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteWindow", function() {
                return registerRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "findRemoteWindow", function() {
                return findRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteSendMessage", function() {
                return registerRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "rejectRemoteSendMessage", function() {
                return rejectRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
                return sendBridgeMessage;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return destroyBridges;
            });
        },
        "./node_modules/post-robot/src/bridge/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.destroyBridges;
            });
        },
        "./node_modules/post-robot/src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            function emulateIERestrictions(sourceWindow, targetWindow) {
                if (!conf.a.ALLOW_POSTMESSAGE_POPUP && !1 === Object(src.isSameTopWindow)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
            }
            __webpack_require__.d(__webpack_exports__, "emulateIERestrictions", function() {
                return emulateIERestrictions;
            });
        },
        "./node_modules/post-robot/src/conf/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var _ALLOWED_POST_MESSAGE, CONSTANTS = {
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
                    HELLO: "postrobot_ready",
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
                    ERROR: "postrobot_error",
                    PROMISE: "postrobot_promise",
                    ZALGO_PROMISE: "postrobot_zalgo_promise",
                    REGEX: "regex"
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
            }, POST_MESSAGE_NAMES = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            }, POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(function(key) {
                return POST_MESSAGE_NAMES[key];
            }), CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 1e4 : 2e3,
                RES_TIMEOUT: -1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0, 
                _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0, 
                _ALLOWED_POST_MESSAGE),
                ALLOW_SAME_ORIGIN: !1
            };
            0 === window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return CONFIG;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return CONSTANTS;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return POST_MESSAGE_NAMES;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return POST_MESSAGE_NAMES_LIST;
            });
        },
        "./node_modules/post-robot/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return global;
            });
            var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] || {};
            global.registerSelf = function() {};
        },
        "./node_modules/post-robot/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(interface_namespaceObject, "Promise", function() {
                return zalgo_promise_src.a;
            });
            __webpack_require__.d(interface_namespaceObject, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(interface_namespaceObject, "init", function() {
                return init;
            });
            __webpack_require__.d(interface_namespaceObject, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(interface_namespaceObject, "send", function() {
                return _send;
            });
            __webpack_require__.d(interface_namespaceObject, "request", function() {
                return request;
            });
            __webpack_require__.d(interface_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(interface_namespaceObject, "client", function() {
                return client;
            });
            __webpack_require__.d(interface_namespaceObject, "on", function() {
                return _on;
            });
            __webpack_require__.d(interface_namespaceObject, "listen", function() {
                return listen;
            });
            __webpack_require__.d(interface_namespaceObject, "once", function() {
                return once;
            });
            __webpack_require__.d(interface_namespaceObject, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(interface_namespaceObject, "CONFIG", function() {
                return conf.a;
            });
            __webpack_require__.d(interface_namespaceObject, "CONSTANTS", function() {
                return conf.b;
            });
            __webpack_require__.d(interface_namespaceObject, "disable", function() {
                return disable;
            });
            var lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js"), zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
                try {
                    __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(window, win);
                } catch (err) {
                    return;
                }
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ conf.b.WILDCARD ]).map(function(dom) {
                    if (0 === dom.indexOf(conf.b.MOCK_PROTOCOL)) {
                        if (window.location.protocol === conf.b.FILE_PROTOCOL) return conf.b.WILDCARD;
                        if (!Object(src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return Object(src.getActualDomain)(win);
                    }
                    return 0 === dom.indexOf(conf.b.FILE_PROTOCOL) ? conf.b.WILDCARD : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _require = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), sendBridgeMessage = _require.sendBridgeMessage, needsBridgeForBrowser = _require.needsBridgeForBrowser, isBridge = _require.isBridge;
            SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.BRIDGE] = function(win, serializedMessage, domain) {
                if (needsBridgeForBrowser() || isBridge()) {
                    if (Object(src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                    if (!1 !== Object(src.isSameTopWindow)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                    return sendBridgeMessage(win, serializedMessage, domain);
                }
            };
            SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.GLOBAL] = function(win, serializedMessage) {
                if (Object(lib.i)()) {
                    if (!Object(src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
                    if (!1 !== Object(src.isSameTopWindow)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                    var foreignGlobal = win[conf.b.WINDOW_PROPS.POSTROBOT];
                    if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                    return foreignGlobal.receiveMessage({
                        source: window,
                        origin: Object(src.getDomain)(),
                        data: serializedMessage
                    });
                }
            };
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function sendMessage(win, message, domain) {
                return zalgo_promise_src.a.try(function() {
                    var _jsonStringify;
                    message = function(win, message) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = Object(lib.q)(), type = Object(lib.c)(), sourceDomain = Object(src.getDomain)(window);
                        return _extends({}, message, options, {
                            sourceDomain: sourceDomain,
                            id: message.id || id,
                            windowType: type
                        });
                    }(win, message, {
                        data: Object(lib.o)(win, domain, message.data),
                        domain: domain
                    });
                    if (win === window && !conf.a.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                    if (Object(src.isWindowClosed)(win)) throw new Error("Window is closed");
                    var messages = [], serializedMessage = Object(lib.g)(((_jsonStringify = {})[conf.b.WINDOW_PROPS.POSTROBOT] = message, 
                    _jsonStringify), null, 2);
                    return zalgo_promise_src.a.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return zalgo_promise_src.a.try(function() {
                            if (!conf.a.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + Object(lib.p)(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        if (!success) throw new Error(status);
                    });
                });
            }
            var cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
            global.a.responseListeners = global.a.responseListeners || {};
            global.a.requestListeners = global.a.requestListeners || {};
            global.a.WINDOW_WILDCARD = global.a.WINDOW_WILDCARD || new function() {}();
            global.a.erroredResponseListeners = global.a.erroredResponseListeners || {};
            var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
            function getResponseListener(hash) {
                return global.a.responseListeners[hash];
            }
            function deleteResponseListener(hash) {
                delete global.a.responseListeners[hash];
            }
            function isResponseListenerErrored(hash) {
                return Boolean(global.a.erroredResponseListeners[hash]);
            }
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === conf.b.WILDCARD && (win = null);
                domain === conf.b.WILDCARD && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                var nameListeners = global.a.requestListeners[name];
                if (nameListeners) for (var _i2 = 0, _ref3 = [ win, global.a.WINDOW_WILDCARD ], _length2 = null == _ref3 ? 0 : _ref3.length; _i2 < _length2; _i2++) {
                    var winQualifier = _ref3[_i2], winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        if (domain && "string" == typeof domain) {
                            if (winListeners[domain]) return winListeners[domain];
                            if (winListeners[__DOMAIN_REGEX__]) for (var _i4 = 0, _winListeners$__DOMAI2 = winListeners[__DOMAIN_REGEX__], _length4 = null == _winListeners$__DOMAI2 ? 0 : _winListeners$__DOMAI2.length; _i4 < _length4; _i4++) {
                                var _ref5 = _winListeners$__DOMAI2[_i4], regex = _ref5.regex, listener = _ref5.listener;
                                if (Object(src.matchDomain)(regex, domain)) return listener;
                            }
                        }
                        if (winListeners[conf.b.WILDCARD]) return winListeners[conf.b.WILDCARD];
                    }
                }
            }
            var types__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[conf.b.POST_MESSAGE_TYPE.ACK] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }, _RECEIVE_MESSAGE_TYPE[conf.b.POST_MESSAGE_TYPE.REQUEST] = function(source, origin, message) {
                var options = getRequestListener({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function respond(data) {
                    return message.fireAndForget || Object(src.isWindowClosed)(source) ? zalgo_promise_src.a.resolve() : sendMessage(source, types__extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                return zalgo_promise_src.a.all([ respond({
                    type: conf.b.POST_MESSAGE_TYPE.ACK
                }), zalgo_promise_src.a.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return respond({
                        type: conf.b.POST_MESSAGE_TYPE.RESPONSE,
                        ack: conf.b.POST_MESSAGE_ACK.SUCCESS,
                        data: data
                    });
                }, function(err) {
                    var error = Object(lib.p)(err).replace(/^Error: /, ""), code = err.code;
                    return respond({
                        type: conf.b.POST_MESSAGE_TYPE.RESPONSE,
                        ack: conf.b.POST_MESSAGE_ACK.ERROR,
                        error: error,
                        code: code
                    });
                }) ]).then(lib.j).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    throw err;
                });
            }, _RECEIVE_MESSAGE_TYPE[conf.b.POST_MESSAGE_TYPE.RESPONSE] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + Object(src.stringifyDomainPattern)(options.domain));
                    deleteResponseListener(message.hash);
                    if (message.ack === conf.b.POST_MESSAGE_ACK.ERROR) {
                        var err = new Error(message.error);
                        message.code && (err.code = message.code);
                        return options.respond(err, null);
                    }
                    if (message.ack === conf.b.POST_MESSAGE_ACK.SUCCESS) {
                        var data = message.data || message.response;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }, _RECEIVE_MESSAGE_TYPE), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.a.receivedMessages = global.a.receivedMessages || [];
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, message = function(message) {
                    var parsedMessage = void 0;
                    try {
                        parsedMessage = Object(lib.f)(message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[conf.b.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data);
                if (message) {
                    if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                    0 !== message.sourceDomain.indexOf(conf.b.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(conf.b.FILE_PROTOCOL) || (origin = message.sourceDomain);
                    if (-1 === global.a.receivedMessages.indexOf(message.id)) {
                        global.a.receivedMessages.push(message.id);
                        if (!Object(src.isWindowClosed)(source) || message.fireAndForget) {
                            message.data && (message.data = Object(lib.b)(source, origin, message.data));
                            RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                        }
                    }
                }
            }
            function messageListener(event) {
                try {
                    Object(lib.j)(event.source);
                } catch (err) {
                    return;
                }
                var messageEvent = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                };
                try {
                    __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(messageEvent.source, window);
                } catch (err) {
                    return;
                }
                receiveMessage(messageEvent);
            }
            global.a.receiveMessage = receiveMessage;
            global.a.requestPromises = global.a.requestPromises || new cross_domain_safe_weakmap_src.a();
            function request(options) {
                return zalgo_promise_src.a.try(function() {
                    if (!options.name) throw new Error("Expected options.name");
                    var name = options.name, targetWindow = void 0, domain = void 0;
                    if ("string" == typeof options.window) {
                        var el = document.getElementById(options.window);
                        if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        targetWindow = el.contentWindow;
                    } else if (options.window instanceof HTMLIFrameElement) {
                        if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                    } else targetWindow = options.window;
                    if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    var win = targetWindow;
                    domain = options.domain || conf.b.WILDCARD;
                    var hash = options.name + "_" + Object(lib.q)();
                    if (Object(src.isWindowClosed)(win)) throw new Error("Target window is closed");
                    var hasResult = !1, requestPromises = global.a.requestPromises.get(win);
                    if (!requestPromises) {
                        requestPromises = [];
                        global.a.requestPromises.set(win, requestPromises);
                    }
                    var requestPromise = zalgo_promise_src.a.try(function() {
                        if (Object(src.isAncestor)(window, win)) return Object(lib.k)(win, options.timeout || conf.a.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if (Object(lib.e)(domain) && !origin) return Object(lib.n)(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if (Object(lib.e)(domain)) {
                            if (!Object(src.matchDomain)(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new zalgo_promise_src.a(function(resolve, reject) {
                            var responseListener = void 0;
                            options.fireAndForget || function(hash, listener) {
                                global.a.responseListeners[hash] = listener;
                            }(hash, responseListener = {
                                name: name,
                                window: win,
                                domain: actualDomain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            });
                            sendMessage(win, {
                                type: conf.b.POST_MESSAGE_TYPE.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: options.fireAndForget
                            }, actualDomain).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var ackTimeout = conf.a.ACK_TIMEOUT, resTimeout = options.timeout || conf.a.RES_TIMEOUT, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if (Object(src.isWindowClosed)(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                    -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                    if (responseListener.ack) {
                                        if (-1 === resTimeout) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (0 === ackTimeout) return reject(new Error("No ack for postMessage " + name + " in " + Object(src.getDomain)() + " in " + conf.a.ACK_TIMEOUT + "ms"));
                                        if (0 === resTimeout) return reject(new Error("No response for postMessage " + name + " in " + Object(src.getDomain)() + " in " + (options.timeout || conf.a.RES_TIMEOUT) + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        !function(hash) {
                            global.a.erroredResponseListeners[hash] = !0;
                        }(hash);
                        deleteResponseListener(hash);
                    });
                    requestPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            function sendToParent(name, data, options) {
                var win = Object(src.getAncestor)();
                return win ? _send(win, name, data, options) : new zalgo_promise_src.a(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            }
            global.a.send = _send;
            var server__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || conf.b.WILDCARD,
                    name: name
                }, requestListener = function addRequestListener(_ref6, listener) {
                    var name = _ref6.name, win = _ref6.win, domain = _ref6.domain;
                    if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _i6 = 0, _win2 = win, _length6 = null == _win2 ? 0 : _win2.length; _i6 < _length6; _i6++) {
                            var item = _win2[_i6];
                            listenersCollection.push(addRequestListener({
                                name: name,
                                domain: domain,
                                win: item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i8 = 0, _length8 = null == listenersCollection ? 0 : listenersCollection.length; _i8 < _length8; _i8++) listenersCollection[_i8].cancel();
                            }
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _i10 = 0, _domain2 = domain, _length10 = null == _domain2 ? 0 : _domain2.length; _i10 < _length10; _i10++) {
                            var _item = _domain2[_i10];
                            _listenersCollection.push(addRequestListener({
                                name: name,
                                win: win,
                                domain: _item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i12 = 0, _length12 = null == _listenersCollection ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) _listenersCollection[_i12].cancel();
                            }
                        };
                    }
                    var existingListener = getRequestListener({
                        name: name,
                        win: win,
                        domain: domain
                    });
                    win && win !== conf.b.WILDCARD || (win = global.a.WINDOW_WILDCARD);
                    domain = domain || conf.b.WILDCARD;
                    if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                    var requestListeners = global.a.requestListeners, nameListeners = requestListeners[name];
                    if (!nameListeners) {
                        nameListeners = new cross_domain_safe_weakmap_src.a();
                        requestListeners[name] = nameListeners;
                    }
                    var winListeners = nameListeners.get(win);
                    if (!winListeners) {
                        winListeners = {};
                        nameListeners.set(win, winListeners);
                    }
                    var strDomain = domain.toString(), regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
                    if (Object(lib.e)(domain)) {
                        if (!regexListeners) {
                            regexListeners = [];
                            winListeners[__DOMAIN_REGEX__] = regexListeners;
                        }
                        regexListener = {
                            regex: domain,
                            listener: listener
                        };
                        regexListeners.push(regexListener);
                    } else winListeners[strDomain] = listener;
                    return {
                        cancel: function() {
                            if (winListeners) {
                                delete winListeners[strDomain];
                                win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                                regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                            }
                        }
                    };
                }({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = Object(lib.l)(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = Object(lib.m)(function() {
                    if (win && "object" === (void 0 === win ? "undefined" : server__typeof(win)) && Object(src.isWindowClosed)(win)) {
                        interval.cancel();
                        listenerOptions.handleError(new Error("Post message target window is closed"));
                    }
                }, 50);
                return {
                    cancel: function() {
                        requestListener.cancel();
                    }
                };
            }
            function _on(name, options, handler) {
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                (options = options || {}).name = name;
                options.handler = handler || options.handler;
                return listen(options);
            }
            function once(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new zalgo_promise_src.a(function(resolve, reject) {
                    (options = options || {}).name = name;
                    options.once = !0;
                    options.handler = function(event) {
                        resolve(event);
                        if (handler) return handler(event);
                    };
                    options.errorHandler = function(err) {
                        reject(err);
                        if (errorHandler) return errorHandler(err);
                    };
                }), onceListener = listen(options);
                promise.cancel = onceListener.cancel;
                return promise;
            }
            function server_listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            }
            global.a.on = _on;
            function disable() {
                delete window[conf.b.WINDOW_PROPS.POSTROBOT];
                window.removeEventListener("message", messageListener);
            }
            var public_parent = Object(src.getAncestor)();
            function cleanUpWindow(win) {
                var requestPromises = global.a.requestPromises.get(win);
                if (requestPromises) for (var _i2 = 0, _length2 = null == requestPromises ? 0 : requestPromises.length; _i2 < _length2; _i2++) requestPromises[_i2].reject(new Error("No response from window - cleaned up"));
                global.a.popupWindowsByWin && global.a.popupWindowsByWin.delete(win);
                global.a.remoteWindows && global.a.remoteWindows.delete(win);
                global.a.requestPromises.delete(win);
                global.a.methods.delete(win);
                global.a.readyPromises.delete(win);
            }
            var bridge = __webpack_require__("./node_modules/post-robot/src/bridge/interface.js");
            function init() {
                if (!global.a.initialized) {
                    Object(lib.a)(window, "message", messageListener);
                    __webpack_require__("./node_modules/post-robot/src/bridge/index.js").openTunnelToOpener();
                    Object(lib.d)();
                    Object(lib.h)({
                        on: _on,
                        send: _send
                    });
                }
                global.a.initialized = !0;
            }
            init();
            __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return zalgo_promise_src.a;
            });
            __webpack_require__.d(__webpack_exports__, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(__webpack_exports__, "init", function() {
                return init;
            });
            __webpack_require__.d(__webpack_exports__, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(__webpack_exports__, "send", function() {
                return _send;
            });
            __webpack_require__.d(__webpack_exports__, "request", function() {
                return request;
            });
            __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(__webpack_exports__, "client", function() {
                return client;
            });
            __webpack_require__.d(__webpack_exports__, "on", function() {
                return _on;
            });
            __webpack_require__.d(__webpack_exports__, "listen", function() {
                return listen;
            });
            __webpack_require__.d(__webpack_exports__, "once", function() {
                return once;
            });
            __webpack_require__.d(__webpack_exports__, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
                return conf.a;
            });
            __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return conf.b;
            });
            __webpack_require__.d(__webpack_exports__, "disable", function() {
                return disable;
            });
            __webpack_exports__.default = interface_namespaceObject;
        },
        "./node_modules/post-robot/src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function stringifyError(err) {
                var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack, message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            }
            var once = function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            function noop() {}
            function addEventListener(obj, event, handler) {
                obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
                return {
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
                    if (!Array.isArray(item)) throw new TypeError("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                    newobj = [];
                } else newobj = {};
                each(item, function(childItem, key) {
                    var result = callback(childItem, key);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                });
                return newobj;
            }
            function safeInterval(method, time) {
                var timeout = void 0;
                timeout = setTimeout(function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            var util_weakMapMemoize = function(method) {
                var weakmap = new src.a();
                return function(arg) {
                    var result = weakmap.get(arg);
                    if (void 0 !== result) return result;
                    void 0 !== (result = method.call(this, arg)) && weakmap.set(arg, result);
                    return result;
                };
            };
            function getWindowType() {
                return Object(cross_domain_utils_src.isPopup)() ? conf.b.WINDOW_TYPES.POPUP : Object(cross_domain_utils_src.isIframe)() ? conf.b.WINDOW_TYPES.IFRAME : conf.b.WINDOW_TYPES.FULLPAGE;
            }
            function jsonStringify(obj, replacer, indent) {
                var objectToJSON = void 0, arrayToJSON = void 0;
                try {
                    if ("{}" !== JSON.stringify({})) {
                        objectToJSON = Object.prototype.toJSON;
                        delete Object.prototype.toJSON;
                    }
                    if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                    if ("[]" !== JSON.stringify([])) {
                        arrayToJSON = Array.prototype.toJSON;
                        delete Array.prototype.toJSON;
                    }
                    if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                var result = JSON.stringify.call(this, obj, replacer, indent);
                try {
                    objectToJSON && (Object.prototype.toJSON = objectToJSON);
                    arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                return result;
            }
            function jsonParse(item) {
                return JSON.parse(item);
            }
            function needsGlobalMessagingForBrowser() {
                return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.a.ALLOW_POSTMESSAGE_POPUP;
            }
            var zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js"), serialize__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.a.methods = global.a.methods || new src.a();
            var listenForMethods = once(function() {
                global.a.on(conf.b.POST_MESSAGE_NAMES.METHOD, {
                    origin: conf.b.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = global.a.methods.get(source);
                    if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                    var meth = methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (!Object(cross_domain_utils_src.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    return zalgo_promise_src.a.try(function() {
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
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = uniqueID(), methods = global.a.methods.get(destination);
                if (!methods) {
                    methods = {};
                    global.a.methods.set(destination, methods);
                }
                methods[id] = {
                    domain: domain,
                    method: method
                };
                return {
                    __type__: conf.b.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function serializeMethods(destination, domain, obj) {
                return replaceObject({
                    obj: obj
                }, function(item, key) {
                    return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item, 
                    {
                        __type__: conf.b.SERIALIZATION_TYPES.ERROR,
                        __message__: stringifyError(err),
                        __code__: err.code
                    }) : window.Promise && item instanceof window.Promise ? function(destination, domain, promise, name) {
                        return {
                            __type__: conf.b.SERIALIZATION_TYPES.PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : zalgo_promise_src.a.isPromise(item) ? function(destination, domain, promise, name) {
                        return {
                            __type__: conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : isRegex(item) ? (regex = item, {
                        __type__: conf.b.SERIALIZATION_TYPES.REGEX,
                        __source__: regex.source
                    }) : void 0;
                    var err, regex;
                }).obj;
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    return global.a.send(source, conf.b.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin,
                        timeout: -1
                    }).then(function(_ref2) {
                        return _ref2.data.result;
                    }, function(err) {
                        throw err;
                    });
                }
                wrapper.__name__ = obj.__name__;
                wrapper.__xdomain__ = !0;
                wrapper.source = source;
                wrapper.origin = origin;
                return wrapper;
            }
            function deserializeError(source, origin, obj) {
                var err = new Error(obj.__message__);
                obj.__code__ && (err.code = obj.__code__);
                return err;
            }
            function deserializeZalgoPromise(source, origin, prom) {
                return new zalgo_promise_src.a(function(resolve, reject) {
                    return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                });
            }
            function deserializePromise(source, origin, prom) {
                return window.Promise ? new window.Promise(function(resolve, reject) {
                    return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                }) : deserializeZalgoPromise(source, origin, prom);
            }
            function deserializeRegex(source, origin, item) {
                return new RegExp(item.__source__);
            }
            function deserializeMethods(source, origin, obj) {
                return replaceObject({
                    obj: obj
                }, function(item) {
                    if ("object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item) return isSerialized(item, conf.b.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ERROR) ? deserializeError(0, 0, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(0, 0, item) : void 0;
                }).obj;
            }
            global.a.readyPromises = global.a.readyPromises || new src.a();
            function onHello(handler) {
                global.a.on(conf.b.POST_MESSAGE_NAMES.HELLO, {
                    domain: conf.b.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin;
                    return handler({
                        source: source,
                        origin: origin
                    });
                });
            }
            function sayHello(win) {
                return global.a.send(win, conf.b.POST_MESSAGE_NAMES.HELLO, {}, {
                    domain: conf.b.WILDCARD,
                    timeout: -1
                }).then(function(_ref2) {
                    return {
                        origin: _ref2.origin
                    };
                });
            }
            function initOnReady() {
                onHello(function(_ref3) {
                    var source = _ref3.source, origin = _ref3.origin, promise = global.a.readyPromises.get(source) || new zalgo_promise_src.a();
                    promise.resolve({
                        origin: origin
                    });
                    global.a.readyPromises.set(source, promise);
                });
                var parent = Object(cross_domain_utils_src.getAncestor)();
                parent && sayHello(parent).catch(noop);
            }
            function onChildWindowReady(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = global.a.readyPromises.get(win);
                if (promise) return promise;
                promise = new zalgo_promise_src.a();
                global.a.readyPromises.set(win, promise);
                -1 !== timeout && setTimeout(function() {
                    return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                }, timeout);
                return promise;
            }
            __webpack_require__.d(__webpack_exports__, "p", function() {
                return stringifyError;
            });
            __webpack_require__.d(__webpack_exports__, "l", function() {
                return once;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return noop;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return addEventListener;
            });
            __webpack_require__.d(__webpack_exports__, "q", function() {
                return uniqueID;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return eachArray;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return eachObject;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return each;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return replaceObject;
            });
            __webpack_require__.d(__webpack_exports__, "m", function() {
                return safeInterval;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return isRegex;
            });
            __webpack_require__.d(__webpack_exports__, "r", function() {
                return util_weakMapMemoize;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return getWindowType;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return jsonStringify;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return jsonParse;
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return needsGlobalMessagingForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return listenForMethods;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return serializeMethod;
            });
            __webpack_require__.d(__webpack_exports__, "o", function() {
                return serializeMethods;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return deserializeMethod;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return deserializeError;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return deserializeZalgoPromise;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return deserializePromise;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return deserializeRegex;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return deserializeMethods;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return onHello;
            });
            __webpack_require__.d(__webpack_exports__, "n", function() {
                return sayHello;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return initOnReady;
            });
            __webpack_require__.d(__webpack_exports__, "k", function() {
                return onChildWindowReady;
            });
        },
        "./node_modules/webpack/buildin/amd-options.js": function(module, exports) {
            (function(__webpack_amd_options__) {
                module.exports = __webpack_amd_options__;
            }).call(exports, {});
        },
        "./node_modules/webpack/buildin/module.js": function(module, exports) {
            module.exports = function(module) {
                if (!module.webpackPolyfill) {
                    module.deprecate = function() {};
                    module.paths = [];
                    module.children || (module.children = []);
                    Object.defineProperty(module, "loaded", {
                        enumerable: !0,
                        get: function() {
                            return module.l;
                        }
                    });
                    Object.defineProperty(module, "id", {
                        enumerable: !0,
                        get: function() {
                            return module.i;
                        }
                    });
                    module.webpackPolyfill = 1;
                }
                return module;
            };
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
                    var _toString = {}.toString;
                    if (_toString) {
                        var name = _toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if ("function" == typeof item.then) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function getGlobal() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if ("undefined" == typeof window) throw new TypeError("Can not find global");
                    glob = window;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                return zalgoGlobal;
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                        try {
                            handler(function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }, function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            });
                        } catch (err) {
                            this.reject(err);
                            return;
                        }
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                }
                ZalgoPromise.prototype.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                getGlobal().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }, 1);
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                    return this;
                };
                ZalgoPromise.prototype.dispatch = function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        getGlobal().activeCount += 1;
                        for (var _loop = function(i) {
                            var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                            if (resolved) try {
                                result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                            } catch (err) {
                                promise.reject(err);
                                return "continue";
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(_this3.error);
                                    return "continue";
                                }
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            }
                            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                result.errorHandled = !0;
                            } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        }, i = 0; i < handlers.length; i++) _loop(i);
                        handlers.length = 0;
                        this.dispatching = !1;
                        getGlobal().activeCount -= 1;
                        0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    }
                };
                ZalgoPromise.prototype.then = function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                };
                ZalgoPromise.prototype.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                ZalgoPromise.prototype.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then(function(result) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            throw err;
                        });
                    });
                };
                ZalgoPromise.prototype.timeout = function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                };
                ZalgoPromise.prototype.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return new ZalgoPromise().reject(error);
                };
                ZalgoPromise.asyncReject = function(error) {
                    return new ZalgoPromise().asyncReject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var _loop2 = function(i) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            0 == (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) _loop2(i);
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    var promise = new ZalgoPromise();
                    getGlobal().flushPromises.push(promise);
                    0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                };
                ZalgoPromise.flushQueue = function() {
                    var promisesToFlush = getGlobal().flushPromises;
                    getGlobal().flushPromises = [];
                    for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
                };
                return ZalgoPromise;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return promise_ZalgoPromise;
            });
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            __webpack_require__.d(__webpack_exports__, "ZOID", function() {
                return ZOID;
            });
            __webpack_require__.d(__webpack_exports__, "__ZOID__", function() {
                return __ZOID__;
            });
            __webpack_require__.d(__webpack_exports__, "POST_MESSAGE", function() {
                return POST_MESSAGE;
            });
            __webpack_require__.d(__webpack_exports__, "PROP_TYPES", function() {
                return PROP_TYPES;
            });
            __webpack_require__.d(__webpack_exports__, "INITIAL_PROPS", function() {
                return INITIAL_PROPS;
            });
            __webpack_require__.d(__webpack_exports__, "WINDOW_REFERENCES", function() {
                return WINDOW_REFERENCES;
            });
            __webpack_require__.d(__webpack_exports__, "PROP_TYPES_LIST", function() {
                return PROP_TYPES_LIST;
            });
            __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES", function() {
                return CONTEXT_TYPES;
            });
            __webpack_require__.d(__webpack_exports__, "CLASS_NAMES", function() {
                return CLASS_NAMES;
            });
            __webpack_require__.d(__webpack_exports__, "EVENTS", function() {
                return EVENTS;
            });
            __webpack_require__.d(__webpack_exports__, "ATTRIBUTES", function() {
                return ATTRIBUTES;
            });
            __webpack_require__.d(__webpack_exports__, "ANIMATION_NAMES", function() {
                return ANIMATION_NAMES;
            });
            __webpack_require__.d(__webpack_exports__, "EVENT_NAMES", function() {
                return EVENT_NAMES;
            });
            __webpack_require__.d(__webpack_exports__, "CLOSE_REASONS", function() {
                return CLOSE_REASONS;
            });
            __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES_LIST", function() {
                return CONTEXT_TYPES_LIST;
            });
            __webpack_require__.d(__webpack_exports__, "DELEGATE", function() {
                return DELEGATE;
            });
            __webpack_require__.d(__webpack_exports__, "WILDCARD", function() {
                return WILDCARD;
            });
            __webpack_require__.d(__webpack_exports__, "DEFAULT_DIMENSIONS", function() {
                return DEFAULT_DIMENSIONS;
            });
            var ZOID = "zoid", __ZOID__ = "__" + ZOID + "__", POST_MESSAGE = {
                INIT: ZOID + "_init",
                PROPS: ZOID + "_props",
                PROP_CALLBACK: ZOID + "_prop_callback",
                CLOSE: ZOID + "_close",
                CHECK_CLOSE: ZOID + "_check_close",
                REDIRECT: ZOID + "_redirect",
                RESIZE: ZOID + "_resize",
                ONRESIZE: ZOID + "_onresize",
                DELEGATE: ZOID + "_delegate",
                ALLOW_DELEGATE: ZOID + "_allow_delegate",
                ERROR: ZOID + "_error",
                HIDE: ZOID + "_hide",
                SHOW: ZOID + "_show"
            }, PROP_TYPES = {
                STRING: "string",
                OBJECT: "object",
                FUNCTION: "function",
                BOOLEAN: "boolean",
                NUMBER: "number"
            }, INITIAL_PROPS = {
                RAW: "raw",
                UID: "uid"
            }, WINDOW_REFERENCES = {
                OPENER: "opener",
                TOP: "top",
                PARENT: "parent",
                GLOBAL: "global"
            }, PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function(key) {
                return PROP_TYPES[key];
            }), CONTEXT_TYPES = {
                IFRAME: "iframe",
                POPUP: "popup"
            }, CLASS_NAMES = {
                ZOID: "" + ZOID,
                OUTLET: ZOID + "-outlet",
                COMPONENT_FRAME: ZOID + "-component-frame",
                PRERENDER_FRAME: ZOID + "-prerender-frame",
                VISIBLE: ZOID + "-visible",
                INVISIBLE: ZOID + "-invisible"
            }, EVENTS = {
                CLOSE: ZOID + "-close"
            }, ATTRIBUTES = {
                IFRAME_PLACEHOLDER: "data-zoid-" + ZOID + "-placeholder"
            }, ANIMATION_NAMES = {
                SHOW_CONTAINER: ZOID + "-show-container",
                SHOW_COMPONENT: ZOID + "-show-component",
                HIDE_CONTAINER: ZOID + "-hide-container",
                HIDE_COMPONENT: ZOID + "-hide-component"
            }, EVENT_NAMES = {
                CLICK: "click"
            }, CLOSE_REASONS = {
                PARENT_CALL: "parent_call",
                CHILD_CALL: "child_call",
                CLOSE_DETECTED: "close_detected",
                USER_CLOSED: "user_closed",
                PARENT_CLOSE_DETECTED: "parent_close_detected"
            }, CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function(key) {
                return CONTEXT_TYPES[key];
            }), DELEGATE = {
                CALL_ORIGINAL: "call_original",
                CALL_DELEGATE: "call_delegate"
            }, WILDCARD = "*", DEFAULT_DIMENSIONS = {
                WIDTH: 300,
                HEIGHT: 150
            };
        },
        "./src/drivers/angular.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return angular;
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./src/lib/index.js"), angular = {
                global: function() {
                    return window.angular;
                },
                register: function(component, ng) {
                    return ng.module(component.tag, []).directive(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.i)(component.tag), function() {
                        for (var scope = {}, _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                            var key = _component$getPropNam2[_i2];
                            scope[key] = "=";
                        }
                        component.looseProps && (scope.props = "=");
                        return {
                            scope: scope,
                            restrict: "E",
                            controller: [ "$scope", "$element", function($scope, $element) {
                                if (component.looseProps && !$scope.props) throw new Error("For angular bindings to work, prop definitions must be passed to zoid.create");
                                component.log("instantiate_angular_component");
                                var getProps = function() {
                                    var scopeProps = void 0;
                                    if ($scope.props) scopeProps = $scope.props; else {
                                        scopeProps = {};
                                        for (var _i4 = 0, _Object$keys2 = Object.keys(scope), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                                            var _key = _Object$keys2[_i4];
                                            void 0 !== $scope[_key] && (scopeProps[_key] = $scope[_key]);
                                        }
                                    }
                                    return Object(__WEBPACK_IMPORTED_MODULE_0__lib__.Q)(scopeProps, {
                                        function: function(value) {
                                            return function() {
                                                var result = value.apply(this, arguments);
                                                !function() {
                                                    if ("$apply" !== $scope.$root.$$phase && "$digest" !== $scope.$root.$$phase) try {
                                                        $scope.$apply();
                                                    } catch (err) {}
                                                }();
                                                return result;
                                            };
                                        }
                                    });
                                }, parent = component.init(getProps(), null, $element[0]);
                                parent.render($element[0]);
                                $scope.$watch(function() {
                                    parent.updateProps(getProps());
                                });
                            } ]
                        };
                    });
                }
            };
        },
        "./src/drivers/angular2.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return angular2;
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./src/lib/index.js"), _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, angular2 = {
                global: function() {},
                register: function(zoid, _ref) {
                    var AngularComponent = _ref.Component, NgModule = _ref.NgModule, ElementRef = _ref.ElementRef, NgZone = _ref.NgZone;
                    zoid.log("initializing angular2 component");
                    var getProps = function(component) {
                        return Object(__WEBPACK_IMPORTED_MODULE_0__lib__.Q)(_extends({}, component.internalProps, component.props), {
                            function: function(value) {
                                if ("function" == typeof value) return function() {
                                    var _this = this, _arguments = arguments;
                                    return component.zone.run(function() {
                                        return value.apply(_this, _arguments);
                                    });
                                };
                            }
                        });
                    }, ComponentInstance = AngularComponent({
                        selector: zoid.tag,
                        template: "<div></div>",
                        inputs: [ "props" ]
                    }).Class({
                        constructor: [ ElementRef, NgZone, function(elementRef, zone) {
                            this.elementRef = elementRef;
                            this.zone = zone;
                        } ],
                        ngOnInit: function() {
                            var targetElement = this.elementRef.nativeElement, parent = zoid.init(getProps(this), null, targetElement);
                            parent.render(targetElement);
                            this.parent = parent;
                        },
                        ngOnChanges: function() {
                            this.parent && this.parent.updateProps(getProps(this));
                        }
                    });
                    return NgModule({
                        declarations: [ ComponentInstance ],
                        exports: [ ComponentInstance ]
                    }).Class({
                        constructor: function() {}
                    });
                }
            };
        },
        "./src/drivers/ember.js": function(module, exports) {},
        "./src/drivers/glimmer.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return glimmer;
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, glimmer = {
                global: function() {},
                register: function(component, GlimmerComponent) {
                    return function(_GlimmerComponent) {
                        !function(subClass, superClass) {
                            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                            subClass.prototype = Object.create(superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            });
                            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                        }(_class, _GlimmerComponent);
                        function _class() {
                            !function(instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this);
                            return function(self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || "object" != typeof call && "function" != typeof call ? self : call;
                            }(this, _GlimmerComponent.apply(this, arguments));
                        }
                        _class.prototype.didInsertElement = function() {
                            component.render(_extends({}, this.args), this.element);
                        };
                        return _class;
                    }(GlimmerComponent);
                }
            };
        },
        "./src/drivers/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__script__ = __webpack_require__("./src/drivers/script.js");
            __webpack_require__.d(__webpack_exports__, "script", function() {
                return __WEBPACK_IMPORTED_MODULE_0__script__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__react__ = __webpack_require__("./src/drivers/react.js");
            __webpack_require__.d(__webpack_exports__, "react", function() {
                return __WEBPACK_IMPORTED_MODULE_1__react__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__vue__ = __webpack_require__("./src/drivers/vue.js");
            __webpack_require__.d(__webpack_exports__, "vue", function() {
                return __WEBPACK_IMPORTED_MODULE_2__vue__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__angular__ = __webpack_require__("./src/drivers/angular.js");
            __webpack_require__.d(__webpack_exports__, "angular", function() {
                return __WEBPACK_IMPORTED_MODULE_3__angular__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_4__ember__ = __webpack_require__("./src/drivers/ember.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ember__);
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "angular2") && __webpack_require__.d(__webpack_exports__, "angular2", function() {
                return __WEBPACK_IMPORTED_MODULE_4__ember__.angular2;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "glimmer") && __webpack_require__.d(__webpack_exports__, "glimmer", function() {
                return __WEBPACK_IMPORTED_MODULE_4__ember__.glimmer;
            });
            var __WEBPACK_IMPORTED_MODULE_5__glimmer__ = __webpack_require__("./src/drivers/glimmer.js");
            __webpack_require__.d(__webpack_exports__, "glimmer", function() {
                return __WEBPACK_IMPORTED_MODULE_5__glimmer__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_6__angular2__ = __webpack_require__("./src/drivers/angular2.js");
            __webpack_require__.d(__webpack_exports__, "angular2", function() {
                return __WEBPACK_IMPORTED_MODULE_6__angular2__.a;
            });
        },
        "./src/drivers/react.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return react;
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./src/lib/index.js"), react = {
                global: function() {
                    if (window.React && window.ReactDOM) return {
                        React: window.React,
                        ReactDOM: window.ReactDOM
                    };
                },
                register: function(component, _ref) {
                    var React = _ref.React, ReactDOM = _ref.ReactDOM;
                    React.createClass ? component.react = React.createClass({
                        render: function() {
                            return React.createElement("div", null);
                        },
                        componentDidMount: function() {
                            component.log("instantiate_react_component");
                            var el = ReactDOM.findDOMNode(this), parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        },
                        componentDidUpdate: function() {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.props));
                        },
                        componentWillUnmount: function() {
                            this.state && this.state.parent && this.state.parent.destroy();
                        }
                    }) : component.react = function(_React$Component) {
                        !function(subClass, superClass) {
                            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                            subClass.prototype = Object.create(superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            });
                            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                        }(_class, _React$Component);
                        function _class() {
                            !function(instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this);
                            return function(self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || "object" != typeof call && "function" != typeof call ? self : call;
                            }(this, _React$Component.apply(this, arguments));
                        }
                        _class.prototype.render = function() {
                            return React.createElement("div", null);
                        };
                        _class.prototype.componentDidMount = function() {
                            component.log("instantiate_react_component");
                            var el = ReactDOM.findDOMNode(this), parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        };
                        _class.prototype.componentDidUpdate = function() {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.props));
                        };
                        _class.prototype.componentWillUnmount = function() {
                            this.state && this.state.parent && this.state.parent.destroy();
                        };
                        return _class;
                    }(React.Component);
                    return component.react;
                }
            };
        },
        "./src/drivers/script.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return script;
            });
            var script = {
                global: function() {
                    return window.document;
                },
                register: function(component, document) {
                    function render(element) {
                        if (element && element.tagName && "script" === element.tagName.toLowerCase() && element.attributes.type && "application/x-component" === element.attributes.type.value && element.parentNode) {
                            var tag = element.getAttribute("data-component");
                            if (tag && tag === component.tag) {
                                component.log("instantiate_script_component_error");
                                throw new Error("\n               'x-component' script type is no longer supported.  \n               Please migrate to another integration pattern.\n            ");
                            }
                        }
                    }
                    function scan() {
                        for (var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _i2 = 0, _length2 = null == scriptTags ? 0 : scriptTags.length; _i2 < _length2; _i2++) render(scriptTags[_i2]);
                    }
                    scan();
                    document.addEventListener("DOMContentLoaded", scan);
                    window.addEventListener("load", scan);
                    document.addEventListener("DOMNodeInserted", function(event) {
                        render(event.target);
                    });
                }
            };
        },
        "./src/drivers/vue.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return vue;
            });
            var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./src/lib/index.js"), vue = {
                global: function() {},
                register: function(component) {
                    return {
                        render: function(createElement) {
                            return createElement("div");
                        },
                        inheritAttrs: !1,
                        mounted: function() {
                            var el = this.$el;
                            this.parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.$attrs), null, el);
                            this.parent.render(el);
                        },
                        beforeUpdate: function() {
                            this.parent && this.$attrs && this.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.t)({}, this.$attrs));
                        }
                    };
                }
            };
        },
        "./src/error.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.b = PopupOpenError;
            __webpack_exports__.a = IntegrationError;
            __webpack_exports__.c = RenderError;
            function PopupOpenError(message) {
                this.message = message;
            }
            PopupOpenError.prototype = Object.create(Error.prototype);
            function IntegrationError(message) {
                this.message = message;
            }
            IntegrationError.prototype = Object.create(Error.prototype);
            function RenderError(message) {
                this.message = message;
            }
            RenderError.prototype = Object.create(Error.prototype);
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "create", function() {
                return create;
            });
            __webpack_require__.d(interface_namespaceObject, "getByTag", function() {
                return getByTag;
            });
            __webpack_require__.d(interface_namespaceObject, "getCurrentScriptDir", function() {
                return lib.w;
            });
            __webpack_require__.d(interface_namespaceObject, "destroyAll", function() {
                return interface_destroyAll;
            });
            __webpack_require__.d(interface_namespaceObject, "postRobot", function() {
                return postRobot;
            });
            __webpack_require__.d(interface_namespaceObject, "CONSTANTS", function() {
                return CONSTANTS;
            });
            __webpack_require__.d(interface_namespaceObject, "PopupOpenError", function() {
                return src_error.b;
            });
            __webpack_require__.d(interface_namespaceObject, "IntegrationError", function() {
                return src_error.a;
            });
            __webpack_require__.d(interface_namespaceObject, "RenderError", function() {
                return src_error.c;
            });
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), post_robot_src = __webpack_require__("./node_modules/post-robot/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), lib = __webpack_require__("./src/lib/index.js"), base_BaseComponent = function() {
                function BaseComponent() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof BaseComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.clean = (obj = this, tasks = [], cleaned = !1, {
                        set: function(name, item) {
                            if (cleaned) return item;
                            obj[name] = item;
                            this.register(function() {
                                delete obj[name];
                            });
                            return item;
                        },
                        register: function(name, method) {
                            if ("function" == typeof name) {
                                method = name;
                                name = "<anonymous-cleanup-handler>";
                            }
                            if ("function" != typeof method) throw new TypeError("Expected to be passed function to clean.register");
                            cleaned ? method() : tasks.push({
                                complete: !1,
                                name: name,
                                run: function() {
                                    if (!this.complete) {
                                        this.complete = !0;
                                        method && method();
                                    }
                                }
                            });
                        },
                        hasTasks: function() {
                            return Boolean(tasks.filter(function(item) {
                                return !item.complete;
                            }).length);
                        },
                        all: function() {
                            var results = [];
                            cleaned = !0;
                            for (;tasks.length; ) results.push(tasks.pop().run());
                            return src.a.all(results).then(function() {});
                        },
                        run: function(name) {
                            for (var results = [], _i2 = 0, _length2 = null == tasks ? 0 : tasks.length; _i2 < _length2; _i2++) {
                                var item = tasks[_i2];
                                item.name === name && results.push(item.run());
                            }
                            return src.a.all(results).then(lib.I);
                        }
                    });
                    var obj, tasks, cleaned;
                    this.event = Object(lib.s)();
                }
                BaseComponent.prototype.addProp = function(options, name, def) {
                    Object(lib.g)(options, this, name, def);
                };
                BaseComponent.prototype.on = function(eventName, handler) {
                    return this.event.on(eventName, handler);
                };
                BaseComponent.prototype.listeners = function() {
                    throw new Error("Expected listeners to be implemented");
                };
                BaseComponent.prototype.error = function(err) {
                    throw new Error("Expected error to be implemented - got " + Object(lib.X)(err));
                };
                BaseComponent.prototype.listen = function(win, domain) {
                    var _this = this;
                    if (!win) throw this.component.createError("window to listen to not set");
                    if (!domain) throw new Error("Must pass domain to listen to");
                    if (this.listeners) for (var listeners = this.listeners(), _loop = function(_i4, _Object$keys2, _length4) {
                        var listenerName = _Object$keys2[_i4], name = listenerName.replace(/^zoid_/, ""), errorHandler = function(err) {
                            _this.error(err);
                        }, listener = Object(post_robot_src.on)(listenerName, {
                            window: win,
                            domain: domain,
                            errorHandler: errorHandler
                        }, function(_ref) {
                            var source = _ref.source, data = _ref.data;
                            _this.component.log("listener_" + name);
                            return listeners[listenerName].call(_this, source, data);
                        }), errorListener = Object(post_robot_src.on)(listenerName, {
                            window: win,
                            errorHandler: errorHandler
                        }, function(_ref2) {
                            var origin = _ref2.origin;
                            _this.component.logError("unexpected_listener_" + name, {
                                origin: origin,
                                domain: domain.toString()
                            });
                            _this.error(new Error("Unexpected " + name + " message from domain " + origin + " -- expected message from " + domain.toString()));
                        });
                        _this.clean.register(function() {
                            listener.cancel();
                            errorListener.cancel();
                        });
                    }, _i4 = 0, _Object$keys2 = Object.keys(listeners), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) _loop(_i4, _Object$keys2);
                };
                return BaseComponent;
            }(), client = __webpack_require__("./node_modules/beaver-logger/client/index.js"), base32 = __webpack_require__("./node_modules/hi-base32/src/base32.js"), base32_default = __webpack_require__.n(base32), constants = __webpack_require__("./src/constants.js");
            function normalize(str) {
                return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_");
            }
            var isZoidComponentWindow = Object(lib.G)(function() {
                return !!window.name && "xcomponent" === window.name.split("__")[0];
            }), getComponentMeta = Object(lib.G)(function() {
                if (!window.name) throw new Error("Can not get component meta without window name");
                var _window$name$split2 = window.name.split("__"), zoidcomp = _window$name$split2[0], name = _window$name$split2[1], version = _window$name$split2[2], encodedOptions = _window$name$split2[3];
                if ("xcomponent" !== zoidcomp) throw new Error("Window not rendered by zoid - got " + zoidcomp);
                var str, componentMeta = void 0;
                try {
                    componentMeta = JSON.parse((str = encodedOptions, base32_default.a.decode(str.toUpperCase())));
                } catch (err) {
                    throw new Error("Can not decode component-meta: " + encodedOptions + " " + Object(lib.X)(err));
                }
                componentMeta.name = name;
                componentMeta.version = version.replace(/_/g, ".");
                return componentMeta;
            });
            function window_getParentDomain() {
                return getComponentMeta().domain;
            }
            function getWindowByRef(_ref) {
                var ref = _ref.ref, uid = _ref.uid, distance = _ref.distance, result = void 0;
                ref === constants.WINDOW_REFERENCES.OPENER ? result = Object(cross_domain_utils_src.getOpener)(window) : ref === constants.WINDOW_REFERENCES.TOP ? result = Object(cross_domain_utils_src.getTop)(window) : ref === constants.WINDOW_REFERENCES.PARENT && (result = distance ? Object(cross_domain_utils_src.getNthParentFromTop)(window, distance) : Object(cross_domain_utils_src.getParent)(window));
                if (ref === constants.WINDOW_REFERENCES.GLOBAL) {
                    var ancestor = Object(cross_domain_utils_src.getAncestor)(window);
                    if (ancestor) for (var _i2 = 0, _getAllFramesInWindow2 = Object(cross_domain_utils_src.getAllFramesInWindow)(ancestor), _length2 = null == _getAllFramesInWindow2 ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                        var frame = _getAllFramesInWindow2[_i2], global = Object(lib.z)(frame);
                        if (global && global.windows && global.windows[uid]) {
                            result = global.windows[uid];
                            break;
                        }
                    }
                }
                if (!result) throw new Error("Unable to find window by ref");
                return result;
            }
            var window_getParentComponentWindow = Object(lib.G)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
                return getWindowByRef(componentMeta.componentParent);
            }), window_getParentRenderWindow = Object(lib.G)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
                return getWindowByRef(componentMeta.renderParent);
            }), src_error = __webpack_require__("./src/error.js");
            function normalizeChildProp(component, props, key, value) {
                var prop = component.getProp(key);
                return prop ? "function" == typeof prop.childDecorate ? prop.childDecorate(value) : value : component.looseProps ? value : void 0;
            }
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            var child_ChildComponent = function(_BaseComponent) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(ChildComponent, _BaseComponent);
                function ChildComponent(component) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof ChildComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));
                    _this.component = component;
                    if (!_this.hasValidParentDomain()) {
                        _this.error(new src_error.c("Can not be rendered by domain: " + _this.getParentDomain()));
                        return _possibleConstructorReturn(_this);
                    }
                    _this.component.log("construct_child");
                    _this.onPropHandlers = [];
                    for (var _loop = function(_i2, _ref2, _length2) {
                        for (var item = _ref2[_i2], _loop2 = function(_i4, _ref4, _length4) {
                            var _ref4$_i = _ref4[_i4], name = _ref4$_i[0], getter = _ref4$_i[1];
                            Object.defineProperty(item, name, {
                                configurable: !0,
                                get: function() {
                                    _this.props || _this.setProps(_this.getInitialProps(), window_getParentDomain());
                                    delete item[name];
                                    item[name] = getter();
                                    return item[name];
                                }
                            });
                        }, _i4 = 0, _ref4 = [ [ "xchild", function() {
                            return _this;
                        } ], [ "xprops", function() {
                            return _this.props;
                        } ] ], _length4 = null == _ref4 ? 0 : _ref4.length; _i4 < _length4; _i4++) _loop2(_i4, _ref4);
                    }, _i2 = 0, _ref2 = [ _this.component, window ], _length2 = null == _ref2 ? 0 : _ref2.length; _i2 < _length2; _i2++) _loop(_i2, _ref2);
                    _this.component.log("init_child");
                    _this.setWindows();
                    _this.listenForResize();
                    _this.onInit = _this.sendToParent(constants.POST_MESSAGE.INIT, {
                        exports: _this.exports()
                    }).then(function(_ref5) {
                        var origin = _ref5.origin, data = _ref5.data;
                        _this.context = data.context;
                        _this.setProps(data.props, origin);
                        _this.watchForResize();
                        return _this;
                    }).catch(function(err) {
                        _this.error(err);
                        throw err;
                    });
                    return _this;
                }
                ChildComponent.prototype.listenForResize = function() {
                    var _this2 = this;
                    if (this.component.listenForResize) {
                        this.sendToParent(constants.POST_MESSAGE.ONRESIZE, {}, {
                            fireAndForget: !0
                        });
                        window.addEventListener("resize", function() {
                            _this2.sendToParent(constants.POST_MESSAGE.ONRESIZE, {}, {
                                fireAndForget: !0
                            });
                        });
                    }
                };
                ChildComponent.prototype.hasValidParentDomain = function() {
                    return Object(cross_domain_utils_src.matchDomain)(this.component.allowedParentDomains, this.getParentDomain());
                };
                ChildComponent.prototype.init = function() {
                    return this.onInit;
                };
                ChildComponent.prototype.getParentDomain = function() {
                    return window_getParentDomain();
                };
                ChildComponent.prototype.onProps = function(handler) {
                    this.onPropHandlers.push(handler);
                };
                ChildComponent.prototype.getParentComponentWindow = function() {
                    return window_getParentComponentWindow();
                };
                ChildComponent.prototype.getParentRenderWindow = function() {
                    return window_getParentRenderWindow();
                };
                ChildComponent.prototype.getInitialProps = function() {
                    var _this3 = this, componentMeta = getComponentMeta(), props = componentMeta.props;
                    if (props.type === constants.INITIAL_PROPS.RAW) props = props.value; else {
                        if (props.type !== constants.INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                        var parentComponentWindow = window_getParentComponentWindow();
                        if (!Object(cross_domain_utils_src.isSameDomain)(parentComponentWindow)) {
                            if ("file:" === window.location.protocol) throw new Error("Can not get props from file:// domain");
                            throw new Error("Parent component window is on a different domain - expected " + Object(cross_domain_utils_src.getDomain)() + " - can not retrieve props");
                        }
                        var global = Object(lib.z)(parentComponentWindow);
                        if (!global) throw new Error("Can not find global for parent component - can not retrieve props");
                        props = JSON.parse(global.props[componentMeta.uid]);
                    }
                    if (!props) throw new Error("Initial props not found");
                    return Object(lib.k)(props, function(_ref6) {
                        var fullKey = _ref6.fullKey, self = _ref6.self, args = _ref6.args;
                        return _this3.onInit.then(function() {
                            var func = Object(lib.v)(_this3.props, fullKey);
                            if ("function" != typeof func) throw new TypeError("Expected " + fullKey + " to be function, got " + (void 0 === func ? "undefined" : _typeof(func)));
                            return func.apply(self, args);
                        });
                    });
                };
                ChildComponent.prototype.setProps = function(props, origin) {
                    var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    this.props = this.props || {};
                    var normalizedProps = function(component, props, origin) {
                        for (var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                            var key = _Object$keys2[_i2], prop = component.getProp(key), value = props[key];
                            if (!prop || !prop.sameDomain || origin === Object(cross_domain_utils_src.getDomain)(window)) {
                                result[key] = normalizeChildProp(component, 0, key, value);
                                prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                            }
                        }
                        if (required) for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                            var _key = _component$getPropNam2[_i4];
                            props.hasOwnProperty(_key) || (result[_key] = normalizeChildProp(component, 0, _key, props[_key]));
                        }
                        return result;
                    }(this.component, props, origin, required);
                    Object(lib.t)(this.props, normalizedProps);
                    this.props.logLevel && Object(lib.S)(this.props.logLevel);
                    for (var _i6 = 0, _onPropHandlers2 = this.onPropHandlers, _length6 = null == _onPropHandlers2 ? 0 : _onPropHandlers2.length; _i6 < _length6; _i6++) _onPropHandlers2[_i6].call(this, this.props);
                };
                ChildComponent.prototype.sendToParent = function(name) {
                    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, parentWindow = window_getParentComponentWindow();
                    if (!parentWindow) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return Object(post_robot_src.send)(parentWindow, name, data, _extends({
                        domain: window_getParentDomain()
                    }, options));
                };
                ChildComponent.prototype.setWindows = function() {
                    if (window.__activeZoidComponent__) throw this.component.createError("Can not attach multiple components to the same window");
                    window.__activeZoidComponent__ = this;
                    if (!window_getParentComponentWindow()) throw this.component.createError("Can not find parent window");
                    var componentMeta = getComponentMeta();
                    if (componentMeta.tag !== this.component.tag) throw this.component.createError("Parent is " + componentMeta.tag + " - can not attach " + this.component.tag);
                    this.watchForClose();
                };
                ChildComponent.prototype.watchForClose = function() {
                    var _this4 = this;
                    window.addEventListener("unload", function() {
                        return _this4.checkClose();
                    });
                };
                ChildComponent.prototype.enableAutoResize = function() {
                    var _ref7 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref7$width = _ref7.width, width = void 0 === _ref7$width || _ref7$width, _ref7$height = _ref7.height, height = void 0 === _ref7$height || _ref7$height;
                    this.autoResize = {
                        width: width,
                        height: height
                    };
                    this.watchForResize();
                };
                ChildComponent.prototype.getAutoResize = function() {
                    var width = !1, height = !1, autoResize = this.autoResize || this.component.autoResize;
                    if ("object" === (void 0 === autoResize ? "undefined" : _typeof(autoResize))) {
                        width = Boolean(autoResize.width);
                        height = Boolean(autoResize.height);
                    } else if (autoResize) {
                        width = !0;
                        height = !0;
                    }
                    return {
                        width: width,
                        height: height,
                        element: autoResize.element ? Object(lib.x)(autoResize.element) : window.navigator.userAgent.match(/MSIE (9|10)\./) ? document.body : document.documentElement
                    };
                };
                ChildComponent.prototype.watchForResize = function() {
                    var _this5 = this, _getAutoResize = this.getAutoResize(), width = _getAutoResize.width, height = _getAutoResize.height, element = _getAutoResize.element;
                    if ((width || height) && this.context !== constants.CONTEXT_TYPES.POPUP && !this.watchingForResize) {
                        this.watchingForResize = !0;
                        return src.a.try(function() {
                            return lib.n;
                        }).then(function() {
                            if (!Object(lib.m)(element, {
                                width: width,
                                height: height
                            })) return _this5.resizeToElement(element, {
                                width: width,
                                height: height
                            });
                        }).then(function() {
                            return Object(lib.h)(function() {
                                return Object(lib.K)(element, {
                                    width: width,
                                    height: height
                                }).then(function() {
                                    return _this5.resizeToElement(element, {
                                        width: width,
                                        height: height
                                    });
                                });
                            });
                        });
                    }
                };
                ChildComponent.prototype.exports = function() {
                    var self = this;
                    return {
                        updateProps: function(props) {
                            var _this6 = this;
                            return src.a.try(function() {
                                return self.setProps(props, _this6.origin, !1);
                            });
                        },
                        close: function() {
                            return src.a.try(function() {
                                return self.destroy();
                            });
                        }
                    };
                };
                ChildComponent.prototype.resize = function(width, height) {
                    var _this7 = this;
                    return src.a.resolve().then(function() {
                        _this7.component.log("resize", {
                            width: Object(lib.W)(width),
                            height: Object(lib.W)(height)
                        });
                        if (_this7.context !== constants.CONTEXT_TYPES.POPUP) return _this7.sendToParent(constants.POST_MESSAGE.RESIZE, {
                            width: width,
                            height: height
                        }).then(lib.I);
                    });
                };
                ChildComponent.prototype.resizeToElement = function(el, _ref8) {
                    var _this8 = this, width = _ref8.width, height = _ref8.height, history = [];
                    return function resize() {
                        return src.a.try(function() {
                            for (var tracker = Object(lib.Z)(el, {
                                width: width,
                                height: height
                            }), dimensions = tracker.check().dimensions, _i8 = 0, _length8 = null == history ? 0 : history.length; _i8 < _length8; _i8++) {
                                var size = history[_i8], widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
                                if (widthMatch && heightMatch) return;
                            }
                            history.push({
                                width: dimensions.width,
                                height: dimensions.height
                            });
                            return _this8.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function() {
                                if (tracker.check().changed) return resize();
                            });
                        });
                    }();
                };
                ChildComponent.prototype.hide = function() {
                    return this.sendToParent(constants.POST_MESSAGE.HIDE).then(lib.I);
                };
                ChildComponent.prototype.show = function() {
                    return this.sendToParent(constants.POST_MESSAGE.SHOW).then(lib.I);
                };
                ChildComponent.prototype.userClose = function() {
                    return this.close(constants.CLOSE_REASONS.USER_CLOSED);
                };
                ChildComponent.prototype.close = function() {
                    var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.CHILD_CALL;
                    this.component.log("close_child");
                    this.sendToParent(constants.POST_MESSAGE.CLOSE, {
                        reason: reason
                    });
                };
                ChildComponent.prototype.checkClose = function() {
                    this.sendToParent(constants.POST_MESSAGE.CHECK_CLOSE, {}, {
                        fireAndForget: !0
                    });
                };
                ChildComponent.prototype.destroy = function() {
                    return Object(client.c)().then(function() {
                        window.close();
                    });
                };
                ChildComponent.prototype.focus = function() {
                    this.component.log("focus");
                    window.focus();
                };
                ChildComponent.prototype.error = function(err) {
                    var stringifiedError = Object(lib.X)(err);
                    this.component.logError("error", {
                        error: stringifiedError
                    });
                    return this.sendToParent(constants.POST_MESSAGE.ERROR, {
                        error: stringifiedError
                    }).then(lib.I);
                };
                return ChildComponent;
            }(base_BaseComponent), drivers__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RENDER_DRIVERS = {};
            RENDER_DRIVERS[constants.CONTEXT_TYPES.IFRAME] = {
                focusable: !1,
                renderedIntoContainerTemplate: !0,
                allowResize: !0,
                openOnClick: !1,
                needsBridge: !1,
                open: function(url) {
                    var _this = this, attributes = this.component.attributes.iframe || {};
                    this.iframe = Object(lib.B)({
                        url: url,
                        attributes: drivers__extends({
                            name: this.childWindowName,
                            title: this.component.name,
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ constants.CLASS_NAMES.COMPONENT_FRAME, constants.CLASS_NAMES.INVISIBLE ]
                    }, this.element);
                    return Object(lib.f)(this.iframe).then(function(frameWindow) {
                        _this.window = frameWindow;
                        var detectClose = function() {
                            return src.a.try(function() {
                                return _this.props.onClose(constants.CLOSE_REASONS.CLOSE_DETECTED);
                            }).finally(function() {
                                return _this.destroy();
                            });
                        }, iframeWatcher = Object(lib._2)(_this.iframe, detectClose), elementWatcher = Object(lib._2)(_this.element, detectClose);
                        _this.clean.register("destroyWindow", function() {
                            iframeWatcher.cancel();
                            elementWatcher.cancel();
                            Object(post_robot_src.cleanUpWindow)(_this.window);
                            delete _this.window;
                            if (_this.iframe) {
                                Object(lib.l)(_this.iframe);
                                delete _this.iframe;
                            }
                        });
                    });
                },
                openPrerender: function() {
                    var _this2 = this, attributes = this.component.attributes.iframe || {};
                    this.prerenderIframe = Object(lib.B)({
                        attributes: drivers__extends({
                            name: "__prerender__" + this.childWindowName,
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ constants.CLASS_NAMES.PRERENDER_FRAME, constants.CLASS_NAMES.VISIBLE ]
                    }, this.element);
                    return Object(lib.f)(this.prerenderIframe).then(function(prerenderFrameWindow) {
                        _this2.prerenderWindow = prerenderFrameWindow;
                        _this2.clean.register("destroyPrerender", function() {
                            if (_this2.prerenderIframe) {
                                Object(lib.l)(_this2.prerenderIframe);
                                delete _this2.prerenderIframe;
                            }
                        });
                    });
                },
                switchPrerender: function() {
                    var _this3 = this;
                    Object(lib.a)(this.prerenderIframe, constants.CLASS_NAMES.INVISIBLE);
                    Object(lib.P)(this.prerenderIframe, constants.CLASS_NAMES.VISIBLE);
                    Object(lib.a)(this.iframe, constants.CLASS_NAMES.VISIBLE);
                    Object(lib.P)(this.iframe, constants.CLASS_NAMES.INVISIBLE);
                    setTimeout(function() {
                        _this3.prerenderIframe && Object(lib.l)(_this3.prerenderIframe);
                    }, 1e3);
                },
                delegateOverrides: {
                    openContainer: constants.DELEGATE.CALL_DELEGATE,
                    destroyComponent: constants.DELEGATE.CALL_DELEGATE,
                    destroyContainer: constants.DELEGATE.CALL_DELEGATE,
                    cancelContainerEvents: constants.DELEGATE.CALL_DELEGATE,
                    createPrerenderTemplate: constants.DELEGATE.CALL_DELEGATE,
                    elementReady: constants.DELEGATE.CALL_DELEGATE,
                    showContainer: constants.DELEGATE.CALL_DELEGATE,
                    showComponent: constants.DELEGATE.CALL_DELEGATE,
                    hideContainer: constants.DELEGATE.CALL_DELEGATE,
                    hideComponent: constants.DELEGATE.CALL_DELEGATE,
                    hide: constants.DELEGATE.CALL_DELEGATE,
                    show: constants.DELEGATE.CALL_DELEGATE,
                    resize: constants.DELEGATE.CALL_DELEGATE,
                    loadUrl: constants.DELEGATE.CALL_DELEGATE,
                    hijackSubmit: constants.DELEGATE.CALL_DELEGATE,
                    openPrerender: constants.DELEGATE.CALL_DELEGATE,
                    switchPrerender: constants.DELEGATE.CALL_DELEGATE,
                    renderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                    openContainerFrame: constants.DELEGATE.CALL_ORIGINAL,
                    getOutlet: constants.DELEGATE.CALL_ORIGINAL,
                    open: function(original, override) {
                        return function() {
                            var _this4 = this;
                            return override.apply(this, arguments).then(function() {
                                _this4.clean.set("window", Object(cross_domain_utils_src.findFrameByName)(window_getParentComponentWindow(), _this4.childWindowName));
                                if (!_this4.window) throw new Error("Unable to find parent component iframe window");
                            });
                        };
                    }
                },
                resize: function(width, height) {
                    if (width) {
                        this.container.style.width = Object(lib.Y)(width);
                        this.element.style.width = Object(lib.Y)(width);
                    }
                    if (height) {
                        this.container.style.height = Object(lib.Y)(height);
                        this.element.style.height = Object(lib.Y)(height);
                    }
                },
                show: function() {
                    Object(lib.V)(this.element);
                },
                hide: function() {
                    Object(lib.A)(this.element);
                },
                loadUrl: function(url) {
                    this.iframe.setAttribute("src", url);
                }
            };
            RENDER_DRIVERS[constants.CONTEXT_TYPES.POPUP] = {
                focusable: !0,
                renderedIntoContainerTemplate: !1,
                allowResize: !1,
                openOnClick: !0,
                needsBridge: !0,
                open: function() {
                    var _this5 = this, url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return src.a.try(function() {
                        var _ref = _this5.component.dimensions || {}, _ref$width = _ref.width, width = void 0 === _ref$width ? constants.DEFAULT_DIMENSIONS.WIDTH : _ref$width, _ref$height = _ref.height, height = void 0 === _ref$height ? constants.DEFAULT_DIMENSIONS.HEIGHT : _ref$height, _getPosition = function(_ref2) {
                            var width = _ref2.width, height = _ref2.height, x = 0, y = 0;
                            width && (window.outerWidth ? x = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (x = Math.round((window.screen.width - width) / 2)));
                            height && (window.outerHeight ? y = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (y = Math.round((window.screen.height - height) / 2)));
                            return {
                                x: x,
                                y: y
                            };
                        }({
                            width: width = Object(lib.J)(width, window.outerWidth),
                            height: height = Object(lib.J)(height, window.outerWidth)
                        }), x = _getPosition.x, y = _getPosition.y, attributes = _this5.component.attributes.popup || {};
                        _this5.window = Object(lib.M)(url || "", drivers__extends({
                            name: _this5.childWindowName,
                            width: width,
                            height: height,
                            top: y,
                            left: x,
                            status: 1,
                            toolbar: 0,
                            menubar: 0,
                            resizable: 1,
                            scrollbars: 1
                        }, attributes));
                        _this5.prerenderWindow = _this5.window;
                        _this5.clean.register("destroyWindow", function() {
                            if (_this5.window) {
                                _this5.window.close();
                                Object(post_robot_src.cleanUpWindow)(_this5.window);
                                delete _this5.window;
                                delete _this5.prerenderWindow;
                            }
                        });
                        _this5.resize(width, height);
                    });
                },
                openPrerender: function() {
                    return src.a.try(lib.I);
                },
                resize: function() {},
                hide: function() {
                    throw new Error("Can not hide popup");
                },
                show: function() {
                    throw new Error("Can not show popup");
                },
                delegateOverrides: {
                    openContainer: constants.DELEGATE.CALL_DELEGATE,
                    destroyContainer: constants.DELEGATE.CALL_DELEGATE,
                    elementReady: constants.DELEGATE.CALL_DELEGATE,
                    showContainer: constants.DELEGATE.CALL_DELEGATE,
                    showComponent: constants.DELEGATE.CALL_DELEGATE,
                    hideContainer: constants.DELEGATE.CALL_DELEGATE,
                    hideComponent: constants.DELEGATE.CALL_DELEGATE,
                    hide: constants.DELEGATE.CALL_DELEGATE,
                    show: constants.DELEGATE.CALL_DELEGATE,
                    cancelContainerEvents: constants.DELEGATE.CALL_DELEGATE,
                    open: constants.DELEGATE.CALL_ORIGINAL,
                    loadUrl: constants.DELEGATE.CALL_ORIGINAL,
                    createPrerenderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                    destroyComponent: constants.DELEGATE.CALL_ORIGINAL,
                    resize: constants.DELEGATE.CALL_ORIGINAL,
                    renderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                    openContainerFrame: constants.DELEGATE.CALL_ORIGINAL,
                    getOutlet: constants.DELEGATE.CALL_ORIGINAL
                },
                loadUrl: function(url) {
                    if (Object(cross_domain_utils_src.isSameDomain)(this.window)) try {
                        if (this.window.location && this.window.location.replace) {
                            this.window.location.replace(url);
                            return;
                        }
                    } catch (err) {}
                    this.window.location = url;
                }
            };
            var validate__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function validateProp(prop, key, value, props) {
                var required = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                if (null !== value && void 0 !== value && "" !== value) {
                    if (!value || "function" != typeof value.then || !prop.promise) {
                        if ("function" === prop.type) {
                            if ("function" != typeof value) throw new TypeError("Prop is not of type function: " + key);
                        } else if ("string" === prop.type) {
                            if ("string" != typeof value) throw new TypeError("Prop is not of type string: " + key);
                        } else if ("object" === prop.type) try {
                            JSON.stringify(value);
                        } catch (err) {
                            throw new Error("Unable to serialize prop: " + key);
                        } else if ("number" === prop.type && isNaN(parseInt(value, 10))) throw new TypeError("Prop is not a number: " + key);
                        "function" == typeof prop.validate && value && prop.validate(value, props);
                    }
                } else if (required && !1 !== prop.required && !prop.hasOwnProperty("def")) throw new Error("Prop is required: " + key);
            }
            var props__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function normalizeProp(component, instance, props, key, value) {
                var prop = component.getProp(key), resultValue = void 0;
                !(resultValue = prop.value ? prop.value : !prop.def || props.hasOwnProperty(key) && function(value) {
                    return null !== value && void 0 !== value && "" !== value;
                }(value) ? value : prop.def.call(component, props)) && prop.alias && props[prop.alias] && (resultValue = props[prop.alias]);
                var decorated = !1;
                if (prop.decorate && null !== resultValue && void 0 !== resultValue) {
                    resultValue = prop.decorate.call(instance, resultValue, props);
                    decorated = !0;
                }
                var type = prop.type;
                if ("boolean" === type) resultValue = Boolean(resultValue); else if ("function" === type) {
                    if (!resultValue && prop.noop) {
                        resultValue = lib.I;
                        !decorated && prop.decorate && (resultValue = prop.decorate.call(instance, lib.I, props));
                    }
                    if (resultValue && "function" == typeof resultValue) {
                        resultValue = resultValue.bind(instance);
                        prop.denodeify && (resultValue = Object(lib.j)(resultValue));
                        prop.promisify && (resultValue = Object(lib.O)(resultValue));
                        var original = resultValue;
                        resultValue = function() {
                            component.log("call_prop_" + key);
                            return original.apply(this, arguments);
                        };
                        prop.once && (resultValue = Object(lib.L)(resultValue));
                        prop.memoize && (resultValue = Object(lib.G)(resultValue));
                    }
                } else "string" === type || "object" === type || "number" === type && void 0 !== resultValue && (resultValue = parseInt(resultValue, 10));
                return resultValue;
            }
            var _class, parent__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, parent__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
                var desc = {};
                Object.keys(descriptor).forEach(function(key) {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;
                ("value" in desc || desc.initializer) && (desc.writable = !0);
                desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                    return decorator(target, property, desc) || desc;
                }, desc);
                if (context && void 0 !== desc.initializer) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = void 0;
                }
                if (void 0 === desc.initializer) {
                    Object.defineProperty(target, property, desc);
                    desc = null;
                }
                return desc;
            }
            lib.y.props = lib.y.props || {};
            lib.y.windows = lib.y.windows || {};
            var parent_ParentComponent = (_applyDecoratedDescriptor((_class = function(_BaseComponent) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(ParentComponent, _BaseComponent);
                function ParentComponent(component, context, _ref) {
                    var props = _ref.props;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ParentComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    _this.component = component;
                    _this.validateParentDomain();
                    _this.context = context;
                    _this.setProps(props);
                    _this.props.logLevel && Object(lib.S)(_this.props.logLevel);
                    _this.childWindowName = _this.buildChildWindowName({
                        renderTo: window
                    });
                    _this.registerActiveComponent();
                    _this.component.log("construct_parent");
                    _this.watchForUnload();
                    _this.onInit = new src.a();
                    _this.onInit.catch(function(err) {
                        return _this.error(err);
                    });
                    return _this;
                }
                ParentComponent.prototype.render = function(element) {
                    var _this2 = this, loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return this.tryInit(function() {
                        _this2.component.log("render_" + _this2.context, {
                            context: _this2.context,
                            element: element,
                            loadUrl: Object(lib.W)(loadUrl)
                        });
                        var tasks = {};
                        tasks.onRender = _this2.props.onRender();
                        tasks.getDomain = _this2.getDomain();
                        tasks.elementReady = src.a.try(function() {
                            if (element) return _this2.elementReady(element);
                        });
                        tasks.openContainer = tasks.elementReady.then(function() {
                            return _this2.openContainer(element);
                        });
                        tasks.showContainer = tasks.openContainer.then(function() {
                            return _this2.showContainer();
                        });
                        tasks.openPrerender = tasks.openContainer.then(function() {
                            return _this2.openPrerender();
                        });
                        tasks.switchPrerender = src.a.all([ tasks.openPrerender, _this2.onInit ]).then(function() {
                            return _this2.switchPrerender();
                        });
                        tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function() {
                            return _this2.open();
                        });
                        tasks.listen = src.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref2) {
                            var domain = _ref2[0];
                            _this2.listen(_this2.window, domain);
                        });
                        tasks.watchForClose = tasks.open.then(function() {
                            return _this2.watchForClose();
                        });
                        tasks.linkDomain = src.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref3) {
                            var domain = _ref3[0];
                            if (post_robot_src.bridge && "string" == typeof domain) return post_robot_src.bridge.linkUrl(_this2.window, domain);
                        });
                        if (!_this2.html) {
                            tasks.createPrerenderTemplate = tasks.openPrerender.then(function() {
                                return _this2.createPrerenderTemplate();
                            });
                            tasks.showComponent = tasks.createPrerenderTemplate.then(function() {
                                return _this2.showComponent();
                            });
                        }
                        tasks.openBridge = src.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref4) {
                            var domain = _ref4[0];
                            return _this2.openBridge("string" == typeof domain ? domain : null);
                        });
                        if (_this2.html) tasks.loadHTML = tasks.open.then(function() {
                            return _this2.loadHTML();
                        }); else if (loadUrl) {
                            tasks.buildUrl = _this2.buildUrl();
                            tasks.loadUrl = src.a.all([ tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate ]).then(function(_ref5) {
                                var url = _ref5[0];
                                return _this2.loadUrl(url);
                            });
                            tasks.runTimeout = tasks.loadUrl.then(function() {
                                return _this2.runTimeout();
                            });
                        }
                        return src.a.hash(tasks);
                    }).then(function() {
                        return _this2.props.onEnter();
                    }).then(function() {
                        return _this2;
                    });
                };
                ParentComponent.prototype.getOutlet = function() {
                    var outlet = document.createElement("div");
                    Object(lib.a)(outlet, constants.CLASS_NAMES.OUTLET);
                    return outlet;
                };
                ParentComponent.prototype.validateParentDomain = function() {
                    var domain = Object(cross_domain_utils_src.getDomain)();
                    if (!Object(cross_domain_utils_src.matchDomain)(this.component.allowedParentDomains, domain)) throw new src_error.c("Can not be rendered by domain: " + domain);
                };
                ParentComponent.prototype.renderTo = function(win, element) {
                    var _this3 = this;
                    return this.tryInit(function() {
                        if (win === window) return _this3.render(element);
                        if (!Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only renderTo an adjacent frame");
                        if (element && "string" != typeof element) throw new Error("Element passed to renderTo must be a string selector, got " + (void 0 === element ? "undefined" : parent__typeof(element)) + " " + element);
                        _this3.checkAllowRenderTo(win);
                        _this3.component.log("render_" + _this3.context + "_to_win", {
                            element: Object(lib.W)(element),
                            context: _this3.context
                        });
                        _this3.childWindowName = _this3.buildChildWindowName({
                            renderTo: win
                        });
                        _this3.delegate(win);
                        return _this3.render(element);
                    });
                };
                ParentComponent.prototype.prefetch = function() {
                    var _this4 = this;
                    return src.a.try(function() {
                        _this4.html = _this4.buildUrl().then(function(url) {
                            return Object(lib.N)(url).then(function(html) {
                                return '\n                        <base href="' + url.split("/").slice(0, 3).join("/") + '">\n\n                        ' + html + "\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, '', '/" + url.split("/").slice(3).join("/") + "');\n                            }\n                        <\/script>\n                    ";
                            });
                        });
                    });
                };
                ParentComponent.prototype.loadHTML = function() {
                    var _this5 = this;
                    return src.a.try(function() {
                        if (!_this5.html) throw new Error("Html not prefetched");
                        return _this5.html.then(function(html) {
                            return Object(lib._4)(_this5.window, html);
                        });
                    });
                };
                ParentComponent.prototype.checkAllowRenderTo = function(win) {
                    if (!win) throw this.component.createError("Must pass window to renderTo");
                    if (!Object(cross_domain_utils_src.isSameDomain)(win)) {
                        var origin = Object(cross_domain_utils_src.getDomain)(), domain = this.component.getDomain(null, this.props.env);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error("Can not render remotely to " + domain.toString() + " - can only render to " + origin);
                    }
                };
                ParentComponent.prototype.registerActiveComponent = function() {
                    var _this6 = this;
                    ParentComponent.activeComponents.push(this);
                    this.clean.register(function() {
                        ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
                    });
                };
                ParentComponent.prototype.getComponentParentRef = function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (this.context === constants.CONTEXT_TYPES.POPUP) return {
                        ref: constants.WINDOW_REFERENCES.OPENER
                    };
                    if (renderToWindow === window) return Object(cross_domain_utils_src.isTop)(window) ? {
                        ref: constants.WINDOW_REFERENCES.TOP
                    } : {
                        ref: constants.WINDOW_REFERENCES.PARENT,
                        distance: Object(cross_domain_utils_src.getDistanceFromTop)(window)
                    };
                    var uid = Object(lib._0)();
                    lib.y.windows[uid] = window;
                    this.clean.register(function() {
                        delete lib.y.windows[uid];
                    });
                    return {
                        ref: constants.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                };
                ParentComponent.prototype.getRenderParentRef = function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (renderToWindow === window) return this.getComponentParentRef(renderToWindow);
                    var uid = Object(lib._0)();
                    lib.y.windows[uid] = renderToWindow;
                    this.clean.register(function() {
                        delete lib.y.windows[uid];
                    });
                    return {
                        ref: constants.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                };
                ParentComponent.prototype.buildChildWindowName = function() {
                    var _ref6$renderTo = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).renderTo, renderTo = void 0 === _ref6$renderTo ? window : _ref6$renderTo, sameDomain = Object(cross_domain_utils_src.isSameDomain)(renderTo), uid = Object(lib._0)(), tag = this.component.tag, sProps = Object(lib.R)(this.getPropsForChild()), componentParent = this.getComponentParentRef(renderTo), renderParent = this.getRenderParentRef(renderTo), props = sameDomain || this.component.unsafeRenderTo ? {
                        type: constants.INITIAL_PROPS.RAW,
                        value: sProps
                    } : {
                        type: constants.INITIAL_PROPS.UID,
                        uid: uid
                    };
                    if (props.type === constants.INITIAL_PROPS.UID) {
                        lib.y.props[uid] = JSON.stringify(sProps);
                        this.clean.register(function() {
                            delete lib.y.props[uid];
                        });
                    }
                    return function(name, version) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        options.id = Object(lib._0)();
                        options.domain = Object(cross_domain_utils_src.getDomain)(window);
                        var str, encodedName = normalize(name), encodedVersion = normalize(version), encodedOptions = (str = JSON.stringify(options), 
                        base32_default.a.encode(str).replace(/\=/g, "").toLowerCase());
                        if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
                        if (!encodedVersion) throw new Error("Invalid version: " + version + " - must contain alphanumeric characters");
                        return [ "xcomponent", encodedName, encodedVersion, encodedOptions, "" ].join("__");
                    }(this.component.name, this.component.version, {
                        uid: uid,
                        tag: tag,
                        componentParent: componentParent,
                        renderParent: renderParent,
                        props: props
                    });
                };
                ParentComponent.prototype.sendToParent = function(name, data) {
                    if (!window_getParentComponentWindow()) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return Object(post_robot_src.send)(window_getParentComponentWindow(), name, data, {
                        domain: window_getParentDomain()
                    });
                };
                ParentComponent.prototype.setProps = function(props) {
                    var required = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    !function(component, props) {
                        var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        if ((props = props || {}).env && "object" === validate__typeof(component.url) && !component.url[props.env]) throw new Error("Invalid env: " + props.env);
                        for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                            var key = _component$getPropNam2[_i2], prop = component.getProp(key);
                            if (prop.alias && props.hasOwnProperty(prop.alias)) {
                                var value = props[prop.alias];
                                delete props[prop.alias];
                                props[key] || (props[key] = value);
                            }
                        }
                        for (var _i4 = 0, _Object$keys2 = Object.keys(props), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                            var _key = _Object$keys2[_i4], _prop = component.getProp(_key), _value = props[_key];
                            _prop && validateProp(_prop, _key, _value, props, required);
                        }
                        for (var _i6 = 0, _component$getPropNam4 = component.getPropNames(), _length6 = null == _component$getPropNam4 ? 0 : _component$getPropNam4.length; _i6 < _length6; _i6++) {
                            var _key2 = _component$getPropNam4[_i6], _prop2 = component.getProp(_key2), _value2 = props[_key2];
                            _prop2 && !props.hasOwnProperty(_key2) && validateProp(_prop2, _key2, _value2, props, required);
                        }
                    }(this.component, props, required);
                    this.component.validate && this.component.validate(this.component, props);
                    this.props = this.props || {};
                    Object(lib.t)(this.props, function(component, instance, props) {
                        var result = {};
                        props = props || {};
                        for (var _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                            var key = _Object$keys2[_i2];
                            -1 !== component.getPropNames().indexOf(key) ? result[key] = normalizeProp(component, instance, props, key, props[key]) : result[key] = props[key];
                        }
                        for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                            var _key = _component$getPropNam2[_i4];
                            if (!(props.hasOwnProperty(_key) || instance.props && instance.props.hasOwnProperty(_key))) {
                                var normalizedProp = normalizeProp(component, instance, props, _key, props[_key]);
                                void 0 !== normalizedProp && (result[_key] = normalizedProp);
                            }
                        }
                        return result;
                    }(this.component, this, props));
                };
                ParentComponent.prototype.buildUrl = function() {
                    var propsDef, props, params, _this7 = this, propUrl = this.props.url;
                    return src.a.all([ propUrl, (propsDef = parent__extends({}, this.component.props, this.component.builtinProps), 
                    props = this.props, params = {}, src.a.all(Object.keys(props).map(function(key) {
                        var prop = propsDef[key];
                        if (prop) return src.a.resolve().then(function() {
                            var value = props[key];
                            if (value && prop.queryParam) return value;
                        }).then(function(value) {
                            if (value) return src.a.all([ function(prop, key, value) {
                                return src.a.try(function() {
                                    return "function" == typeof prop.queryParam ? prop.queryParam(value) : "string" == typeof prop.queryParam ? prop.queryParam : key;
                                });
                            }(prop, key, value), function(prop, key, value) {
                                return src.a.try(function() {
                                    return "function" == typeof prop.queryValue ? prop.queryValue(value) : value;
                                });
                            }(prop, 0, value) ]).then(function(_ref) {
                                var queryParam = _ref[0], queryValue = _ref[1], result = void 0;
                                if ("boolean" == typeof queryValue) result = "1"; else if ("string" == typeof queryValue) result = queryValue.toString(); else {
                                    if ("function" == typeof queryValue) return;
                                    if ("object" === (void 0 === queryValue ? "undefined" : props__typeof(queryValue)) && null !== queryValue) {
                                        if ("json" !== prop.serialization) {
                                            result = Object(lib.o)(queryValue, key);
                                            for (var _i6 = 0, _Object$keys4 = Object.keys(result), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                                                var dotkey = _Object$keys4[_i6];
                                                params[dotkey] = result[dotkey];
                                            }
                                            return;
                                        }
                                        result = JSON.stringify(queryValue);
                                    } else "number" == typeof queryValue && (result = queryValue.toString());
                                }
                                params[queryParam] = result;
                            });
                        });
                    })).then(function() {
                        Object.keys(params).forEach(function(key) {
                            params[key] = escape(params[key]);
                        });
                        return params;
                    })) ]).then(function(_ref7) {
                        var url = _ref7[0], query = _ref7[1];
                        return url && !_this7.component.getValidDomain(url) ? url : src.a.try(function() {
                            return url || _this7.component.getUrl(_this7.props.env, _this7.props);
                        }).then(function(finalUrl) {
                            query.xcomponent = "1";
                            return Object(lib.u)(finalUrl, {
                                query: query
                            });
                        });
                    });
                };
                ParentComponent.prototype.getDomain = function() {
                    var _this8 = this;
                    return src.a.try(function() {
                        return _this8.props.url;
                    }).then(function(url) {
                        return _this8.component.getDomain(url, _this8.props.env) || (_this8.component.buildUrl ? src.a.try(function() {
                            return _this8.component.buildUrl(_this8.props);
                        }).then(function(builtUrl) {
                            return _this8.component.getDomain(builtUrl, _this8.props.env);
                        }) : void 0);
                    }).then(function(domain) {
                        if (!domain) throw new Error("Could not determine domain");
                        return domain;
                    });
                };
                ParentComponent.prototype.getPropsForChild = function() {
                    for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        var key = _Object$keys2[_i2], prop = this.component.getProp(key);
                        prop && !1 === prop.sendToChild || (result[key] = this.props[key]);
                    }
                    return result;
                };
                ParentComponent.prototype.updateProps = function(props) {
                    var _this9 = this;
                    this.setProps(props, !1);
                    return this.onInit.then(function() {
                        if (_this9.childExports) return _this9.childExports.updateProps(_this9.getPropsForChild());
                        throw new Error("Child exports were not available");
                    });
                };
                ParentComponent.prototype.openBridge = function(domain) {
                    var _this10 = this;
                    return src.a.try(function() {
                        if (post_robot_src.bridge && _this10.driver.needsBridge) {
                            var needsBridgeParams = {
                                win: _this10.window
                            };
                            domain && (needsBridgeParams.domain = domain);
                            var needsBridge = post_robot_src.bridge.needsBridge(needsBridgeParams), bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);
                            if (bridgeUrl) {
                                bridgeUrl = Object(lib.u)(bridgeUrl, {
                                    query: {
                                        version: _this10.component.version
                                    }
                                });
                                var bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);
                                if (!bridgeDomain) throw new Error("Can not determine domain for bridge");
                                return needsBridge ? post_robot_src.bridge.openBridge(bridgeUrl, bridgeDomain).then(function(result) {
                                    if (result) return result;
                                }) : void 0;
                            }
                            if (needsBridge && domain && !post_robot_src.bridge.hasBridge(domain, domain)) throw new Error("Bridge url needed to render " + _this10.context);
                        }
                    });
                };
                ParentComponent.prototype.open = function() {
                    var _this11 = this;
                    return src.a.try(function() {
                        _this11.component.log("open_" + _this11.context, {
                            windowName: _this11.childWindowName
                        });
                        return _this11.driver.open.call(_this11);
                    });
                };
                ParentComponent.prototype.openPrerender = function() {
                    var _this12 = this;
                    return src.a.try(function() {
                        if (_this12.component.prerenderTemplate) return _this12.driver.openPrerender.call(_this12);
                    });
                };
                ParentComponent.prototype.switchPrerender = function() {
                    var _this13 = this;
                    return src.a.try(function() {
                        if (_this13.prerenderWindow && _this13.driver.switchPrerender) return _this13.driver.switchPrerender.call(_this13);
                    });
                };
                ParentComponent.prototype.elementReady = function(element) {
                    return Object(lib.p)(element).then(lib.I);
                };
                ParentComponent.prototype.delegate = function(win) {
                    var _this14 = this;
                    this.component.log("delegate_" + this.context);
                    for (var props = {
                        uid: this.props.uid,
                        dimensions: this.props.dimensions,
                        onClose: this.props.onClose,
                        onDisplay: this.props.onDisplay
                    }, _i4 = 0, _component$getPropNam2 = this.component.getPropNames(), _length4 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                        var propName = _component$getPropNam2[_i4];
                        this.component.getProp(propName).allowDelegate && (props[propName] = this.props[propName]);
                    }
                    for (var delegate = Object(post_robot_src.send)(win, constants.POST_MESSAGE.DELEGATE + "_" + this.component.name, {
                        context: this.context,
                        env: this.props.env,
                        options: {
                            context: this.context,
                            childWindowName: this.childWindowName,
                            props: props,
                            overrides: {
                                focus: function() {
                                    return _this14.focus();
                                },
                                userClose: function() {
                                    return _this14.userClose();
                                },
                                getDomain: function() {
                                    return _this14.getDomain();
                                },
                                error: function(err) {
                                    return _this14.error(err);
                                },
                                on: function(eventName, handler) {
                                    return _this14.on(eventName, handler);
                                }
                            }
                        }
                    }).then(function(_ref8) {
                        var data = _ref8.data;
                        _this14.clean.register(data.destroy);
                        return data;
                    }).catch(function(err) {
                        throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + Object(lib.X)(err));
                    }), overrides = this.driver.delegateOverrides, _loop = function(_i6, _Object$keys4, _length6) {
                        var key = _Object$keys4[_i6], val = overrides[key];
                        if (val === constants.DELEGATE.CALL_ORIGINAL) return "continue";
                        var original = _this14[key];
                        _this14[key] = function() {
                            var _this15 = this, _arguments = arguments;
                            return delegate.then(function(data) {
                                var override = data.overrides[key];
                                if (val === constants.DELEGATE.CALL_DELEGATE) return override.apply(_this15, _arguments);
                                if ("function" == typeof val) return val(original, override).apply(_this15, _arguments);
                                throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                            });
                        };
                    }, _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
                };
                ParentComponent.prototype.watchForClose = function() {
                    var _this16 = this, closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.window, function() {
                        _this16.component.log("detect_close_child");
                        return src.a.try(function() {
                            return _this16.props.onClose(constants.CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this16.destroy();
                        });
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                ParentComponent.prototype.watchForUnload = function() {
                    var _this17 = this, onunload = Object(lib.L)(function() {
                        _this17.component.log("navigate_away");
                        Object(client.c)();
                        _this17.destroyComponent();
                    }), unloadWindowListener = Object(lib.b)(window, "unload", onunload);
                    this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                };
                ParentComponent.prototype.loadUrl = function(url) {
                    var _this18 = this;
                    return src.a.try(function() {
                        _this18.component.log("load_url");
                        if (window.location.href.split("#")[0] === url.split("#")[0]) {
                            var _query;
                            url = Object(lib.u)(url, {
                                query: (_query = {}, _query[Object(lib._0)()] = "1", _query)
                            });
                        }
                        return _this18.driver.loadUrl.call(_this18, url);
                    });
                };
                ParentComponent.prototype.hijack = function(targetElement) {
                    targetElement.target = this.childWindowName;
                };
                ParentComponent.prototype.runTimeout = function() {
                    var _this19 = this, timeout = this.props.timeout;
                    if (timeout) {
                        var _id = this.timeout = setTimeout(function() {
                            _this19.component.log("timed_out", {
                                timeout: timeout.toString()
                            });
                            var error = _this19.component.createError("Loading component timed out after " + timeout + " milliseconds");
                            _this19.onInit.reject(error);
                            _this19.props.onTimeout(error);
                        }, timeout);
                        this.clean.register(function() {
                            clearTimeout(_id);
                            delete _this19.timeout;
                        });
                    }
                };
                ParentComponent.prototype.listeners = function() {
                    var _ref9;
                    return (_ref9 = {})[constants.POST_MESSAGE.INIT] = function(source, data) {
                        this.childExports = data.exports;
                        this.onInit.resolve(this);
                        this.timeout && clearTimeout(this.timeout);
                        return {
                            props: this.getPropsForChild(),
                            context: this.context
                        };
                    }, _ref9[constants.POST_MESSAGE.CLOSE] = function(source, data) {
                        this.close(data.reason);
                    }, _ref9[constants.POST_MESSAGE.CHECK_CLOSE] = function() {
                        this.checkClose();
                    }, _ref9[constants.POST_MESSAGE.RESIZE] = function(source, data) {
                        var _this20 = this;
                        return src.a.try(function() {
                            if (_this20.driver.allowResize) return _this20.resize(data.width, data.height);
                        });
                    }, _ref9[constants.POST_MESSAGE.ONRESIZE] = function() {
                        this.event.trigger("resize");
                    }, _ref9[constants.POST_MESSAGE.HIDE] = function() {
                        this.hide();
                    }, _ref9[constants.POST_MESSAGE.SHOW] = function() {
                        this.show();
                    }, _ref9[constants.POST_MESSAGE.ERROR] = function(source, data) {
                        this.error(new Error(data.error));
                    }, _ref9;
                };
                ParentComponent.prototype.resize = function(width, height) {
                    var _this21 = this, _ref10$waitForTransit = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).waitForTransition, waitForTransition = void 0 === _ref10$waitForTransit || _ref10$waitForTransit;
                    return src.a.try(function() {
                        _this21.component.log("resize", {
                            height: Object(lib.W)(height),
                            width: Object(lib.W)(width)
                        });
                        _this21.driver.resize.call(_this21, width, height);
                        if (waitForTransition && (_this21.element || _this21.iframe)) {
                            var overflow = void 0;
                            _this21.element && (overflow = Object(lib.T)(_this21.element, "hidden"));
                            return Object(lib.q)(_this21.element || _this21.iframe).then(function() {
                                overflow && overflow.reset();
                            });
                        }
                    });
                };
                ParentComponent.prototype.hide = function() {
                    this.container && Object(lib.A)(this.container);
                    return this.driver.hide.call(this);
                };
                ParentComponent.prototype.show = function() {
                    this.container && Object(lib.V)(this.container);
                    return this.driver.show.call(this);
                };
                ParentComponent.prototype.checkClose = function() {
                    var _this22 = this, closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.window, function() {
                        _this22.userClose();
                    }, 50, 500);
                    this.clean.register(closeWindowListener.cancel);
                };
                ParentComponent.prototype.userClose = function() {
                    return this.close(constants.CLOSE_REASONS.USER_CLOSED);
                };
                ParentComponent.prototype.close = function() {
                    var _this23 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL;
                    return src.a.try(function() {
                        _this23.component.log("close", {
                            reason: reason
                        });
                        _this23.event.triggerOnce(constants.EVENTS.CLOSE);
                        return _this23.props.onClose(reason);
                    }).then(function() {
                        return src.a.all([ _this23.closeComponent(), _this23.closeContainer() ]);
                    }).then(function() {
                        return _this23.destroy();
                    });
                };
                ParentComponent.prototype.closeContainer = function() {
                    var _this24 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL;
                    return src.a.try(function() {
                        _this24.event.triggerOnce(constants.EVENTS.CLOSE);
                        return _this24.props.onClose(reason);
                    }).then(function() {
                        return src.a.all([ _this24.closeComponent(reason), _this24.hideContainer() ]);
                    }).then(function() {
                        return _this24.destroyContainer();
                    });
                };
                ParentComponent.prototype.destroyContainer = function() {
                    var _this25 = this;
                    return src.a.try(function() {
                        _this25.clean.run("destroyContainerEvents");
                        _this25.clean.run("destroyContainerTemplate");
                    });
                };
                ParentComponent.prototype.closeComponent = function() {
                    var _this26 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL, win = this.window;
                    return src.a.try(function() {
                        return _this26.cancelContainerEvents();
                    }).then(function() {
                        _this26.event.triggerOnce(constants.EVENTS.CLOSE);
                        return _this26.props.onClose(reason);
                    }).then(function() {
                        return _this26.hideComponent();
                    }).then(function() {
                        return _this26.destroyComponent();
                    }).then(function() {
                        _this26.childExports && _this26.context === constants.CONTEXT_TYPES.POPUP && !Object(cross_domain_utils_src.isWindowClosed)(win) && _this26.childExports.close().catch(lib.I);
                    });
                };
                ParentComponent.prototype.destroyComponent = function() {
                    this.clean.run("destroyUnloadWindowListener");
                    this.clean.run("destroyCloseWindowListener");
                    this.clean.run("destroyContainerEvents");
                    this.clean.run("destroyWindow");
                };
                ParentComponent.prototype.showContainer = function() {
                    var _this27 = this;
                    return src.a.try(function() {
                        if (_this27.props.onDisplay) return _this27.props.onDisplay();
                    }).then(function() {
                        if (_this27.container) return Object(lib.U)(_this27.container, constants.ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
                    });
                };
                ParentComponent.prototype.showComponent = function() {
                    var _this28 = this;
                    return src.a.try(function() {
                        if (_this28.props.onDisplay) return _this28.props.onDisplay();
                    }).then(function() {
                        if (_this28.element) return Object(lib.U)(_this28.element, constants.ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
                    });
                };
                ParentComponent.prototype.hideContainer = function() {
                    var _this29 = this;
                    return src.a.try(function() {
                        return _this29.container ? Object(lib.c)(_this29.container, constants.ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register) : src.a.resolve();
                    });
                };
                ParentComponent.prototype.hideComponent = function() {
                    var _this30 = this;
                    return src.a.try(function() {
                        return _this30.element ? Object(lib.c)(_this30.element, constants.ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register) : src.a.resolve();
                    });
                };
                ParentComponent.prototype.focus = function() {
                    if (!this.window || Object(cross_domain_utils_src.isWindowClosed)(this.window)) throw new Error("No window to focus");
                    this.component.log("focus");
                    this.window.focus();
                };
                ParentComponent.prototype.createPrerenderTemplate = function() {
                    var _this31 = this;
                    return src.a.try(function() {
                        return _this31.component.prerenderTemplate ? src.a.try(function() {
                            return _this31.prerenderIframe ? Object(lib.e)(_this31.prerenderIframe).then(function() {
                                return _this31.prerenderWindow;
                            }) : _this31.prerenderWindow;
                        }).then(function(win) {
                            var doc = void 0;
                            try {
                                doc = win.document;
                            } catch (err) {
                                return;
                            }
                            var el = void 0;
                            try {
                                el = _this31.renderTemplate(_this31.component.prerenderTemplate, {
                                    jsxDom: lib.F.bind(doc),
                                    document: doc
                                });
                            } catch (err) {
                                _this31.component.logError("preprender_error", {
                                    err: err.stack ? err.stack : err.toString()
                                });
                                console.error(err.stack ? err.stack : err);
                                return;
                            }
                            try {
                                Object(lib._3)(win, el);
                            } catch (err) {
                                _this31.component.logError("preprender_error", {
                                    err: err.stack ? err.stack : err.toString()
                                });
                                console.error(err.stack ? err.stack : err);
                            }
                        }) : src.a.resolve();
                    });
                };
                ParentComponent.prototype.renderTemplate = function(renderer) {
                    var _this32 = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref11 = this.component.dimensions || {}, _ref11$width = _ref11.width, width = void 0 === _ref11$width ? constants.DEFAULT_DIMENSIONS.WIDTH + "px" : _ref11$width, _ref11$height = _ref11.height, height = void 0 === _ref11$height ? constants.DEFAULT_DIMENSIONS.HEIGHT + "px" : _ref11$height;
                    return renderer.call(this, parent__extends({
                        id: constants.CLASS_NAMES.ZOID + "-" + this.component.tag + "-" + this.props.uid,
                        props: renderer.__xdomain__ ? null : this.props,
                        tag: this.component.tag,
                        context: this.context,
                        outlet: this.getOutlet(),
                        CLASS: constants.CLASS_NAMES,
                        ANIMATION: constants.ANIMATION_NAMES,
                        CONTEXT: constants.CONTEXT_TYPES,
                        EVENT: constants.EVENTS,
                        actions: {
                            close: function() {
                                return _this32.userClose();
                            },
                            focus: function() {
                                return _this32.focus();
                            }
                        },
                        on: function(eventName, handler) {
                            return _this32.on(eventName, handler);
                        },
                        jsxDom: lib.F,
                        document: document,
                        dimensions: {
                            width: width,
                            height: height
                        }
                    }, options));
                };
                ParentComponent.prototype.openContainer = function(element) {
                    var _this33 = this;
                    return src.a.try(function() {
                        var el;
                        if (!(el = element ? Object(lib.x)(element) : document.body)) throw new Error("Could not find element to open container into");
                        if (_this33.component.containerTemplate) {
                            var container = _this33.renderTemplate(_this33.component.containerTemplate, {
                                container: el
                            });
                            _this33.container = container;
                            Object(lib.A)(_this33.container);
                            Object(lib.d)(el, _this33.container);
                            if (_this33.driver.renderedIntoContainerTemplate) {
                                _this33.element = _this33.getOutlet();
                                Object(lib.A)(_this33.element);
                                if (!_this33.element) throw new Error("Could not find element to render component into");
                                Object(lib.A)(_this33.element);
                            }
                            _this33.clean.register("destroyContainerTemplate", function() {
                                _this33.container && _this33.container.parentNode && _this33.container.parentNode.removeChild(_this33.container);
                                delete _this33.container;
                            });
                        } else if (_this33.driver.renderedIntoContainerTemplate) throw new Error("containerTemplate needed to render " + _this33.context);
                    });
                };
                ParentComponent.prototype.cancelContainerEvents = function() {
                    this.clean.run("destroyContainerEvents");
                };
                ParentComponent.prototype.destroy = function() {
                    var _this34 = this;
                    return src.a.try(function() {
                        if (_this34.clean.hasTasks()) {
                            _this34.component.log("destroy");
                            Object(client.c)();
                            return _this34.clean.all();
                        }
                    });
                };
                ParentComponent.prototype.tryInit = function(method) {
                    var _this35 = this;
                    return src.a.try(method).catch(function(err) {
                        _this35.onInit.reject(err);
                    }).then(function() {
                        return _this35.onInit;
                    });
                };
                ParentComponent.prototype.error = function(err) {
                    var _this36 = this;
                    return src.a.try(function() {
                        _this36.handledErrors = _this36.handledErrors || [];
                        if (-1 === _this36.handledErrors.indexOf(err)) {
                            _this36.handledErrors.push(err);
                            _this36.onInit.reject(err);
                            return _this36.destroy();
                        }
                    }).then(function() {
                        if (_this36.props.onError) return _this36.props.onError(err);
                    }).catch(function(errErr) {
                        throw new Error("An error was encountered while handling error:\n\n " + Object(lib.X)(err) + "\n\n" + Object(lib.X)(errErr));
                    }).then(function() {
                        if (!_this36.props.onError) throw err;
                    });
                };
                ParentComponent.destroyAll = function() {
                    for (var results = []; ParentComponent.activeComponents.length; ) results.push(ParentComponent.activeComponents[0].destroy());
                    return src.a.all(results).then(lib.I);
                };
                _createClass(ParentComponent, [ {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return RENDER_DRIVERS[this.context];
                    }
                } ]);
                return ParentComponent;
            }(base_BaseComponent)).prototype, "getOutlet", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "getOutlet"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "prefetch", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "prefetch"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "loadHTML", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "loadHTML"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "buildUrl", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "buildUrl"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "open", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "openPrerender", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "openPrerender"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "switchPrerender", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "switchPrerender"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "close", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showContainer", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showComponent", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "createPrerenderTemplate", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "createPrerenderTemplate"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "openContainer", [ lib.H ], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype), 
            _class);
            parent_ParentComponent.activeComponents = [];
            var delegate__createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), delegate_DelegateComponent = function(_BaseComponent) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(DelegateComponent, _BaseComponent);
                function DelegateComponent(component, source, options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof DelegateComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    _this.component = component;
                    _this.clean.set("source", source);
                    _this.context = options.context;
                    _this.props = {
                        uid: options.props.uid,
                        dimensions: options.props.dimensions,
                        onClose: options.props.onClose,
                        onDisplay: options.props.onDisplay
                    };
                    for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                        var propName = _component$getPropNam2[_i2];
                        _this.component.getProp(propName).allowDelegate && (_this.props[propName] = options.props[propName]);
                    }
                    _this.focus = function() {
                        return options.overrides.focus.call(_this);
                    };
                    _this.clean.register("destroyFocusOverride", function() {
                        _this.focus = lib.I;
                    });
                    _this.userClose = options.overrides.userClose;
                    _this.getDomain = options.overrides.getDomain;
                    _this.error = options.overrides.error;
                    _this.on = options.overrides.on;
                    for (var delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides, _i4 = 0, _Object$keys2 = Object.keys(delegateOverrides), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                        var key = _Object$keys2[_i4];
                        _this[key] = parent_ParentComponent.prototype[key];
                    }
                    _this.childWindowName = options.childWindowName;
                    parent_ParentComponent.prototype.registerActiveComponent.call(_this);
                    _this.watchForClose();
                    return _this;
                }
                DelegateComponent.prototype.watchForClose = function() {
                    var _this2 = this, closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.source, function() {
                        return _this2.destroy();
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                DelegateComponent.prototype.getOverrides = function(context) {
                    for (var delegateOverrides = RENDER_DRIVERS[context].delegateOverrides, overrides = {}, self = this, _loop = function(_i6, _Object$keys4, _length6) {
                        var key = _Object$keys4[_i6];
                        overrides[key] = function() {
                            return parent_ParentComponent.prototype[key].apply(self, arguments);
                        };
                    }, _i6 = 0, _Object$keys4 = Object.keys(delegateOverrides), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
                    return overrides;
                };
                DelegateComponent.prototype.destroy = function() {
                    return this.clean.all();
                };
                delegate__createClass(DelegateComponent, [ {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return RENDER_DRIVERS[this.context];
                    }
                } ]);
                return DelegateComponent;
            }(base_BaseComponent), drivers = __webpack_require__("./src/drivers/index.js"), component_validate__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function defaultContainerTemplate(_ref) {
                var id = _ref.id, tag = _ref.tag, context = _ref.context, CLASS = _ref.CLASS, outlet = _ref.outlet, jsxDom = _ref.jsxDom, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
                return jsxDom("div", {
                    id: id,
                    class: CLASS.ZOID + " " + CLASS.ZOID + "-tag-" + tag + " " + CLASS.ZOID + "-context-" + context
                }, jsxDom("style", null, "\n                    #" + id + ", #" + id + " > ." + CLASS.OUTLET + " {\n                        width: " + width + ";\n                        height: " + height + ";\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " {\n                        display: inline-block;\n                        position: relative;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe {\n                        height: 100%;\n                        width: 100%;\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        transition: opacity .2s ease-in-out;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.VISIBLE + " {\n                        opacity: 1;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.INVISIBLE + " {\n                        opacity: 0;\n                    }\n                "), outlet);
            }
            function defaultPrerenderTemplate(_ref) {
                var jsxDom = _ref.jsxDom;
                return jsxDom("html", null, jsxDom("head", null, jsxDom("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), jsxDom("body", null, jsxDom("div", {
                    class: "spinner"
                }, jsxDom("div", {
                    id: "loader",
                    class: "loader"
                }))));
            }
            __webpack_require__("./src/types.js");
            var component__class, component__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, component_drivers = {
                angular: drivers.angular,
                angular2: drivers.angular2,
                glimmer: drivers.glimmer,
                react: drivers.react,
                vue: drivers.vue,
                script: drivers.script
            }, component_Component = (function(target, property, decorators, descriptor, context) {
                var desc = {};
                Object.keys(descriptor).forEach(function(key) {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;
                ("value" in desc || desc.initializer) && (desc.writable = !0);
                desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                    return decorator(target, "getPropNames", desc) || desc;
                }, desc);
                if (context && void 0 !== desc.initializer) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = void 0;
                }
                if (void 0 === desc.initializer) {
                    Object.defineProperty(target, "getPropNames", desc);
                    desc = null;
                }
            }((component__class = function(_BaseComponent) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(Component, _BaseComponent);
                function Component(options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Component)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    !function(options) {
                        if (!options) throw new Error("Expected options to be passed");
                        if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                        !function(options) {
                            if (options.props && "object" !== component_validate__typeof(options.props)) throw new Error("Expected options.props to be an object");
                            if (options.props) for (var _i2 = 0, _Object$keys2 = Object.keys(options.props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                                var key = _Object$keys2[_i2], prop = options.props[key];
                                if (!prop || "object" !== (void 0 === prop ? "undefined" : component_validate__typeof(prop))) throw new Error("Expected options.props." + key + " to be an object");
                                if (!prop.type) throw new Error("Expected prop.type");
                                if (-1 === constants.PROP_TYPES_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + constants.PROP_TYPES_LIST.join(", "));
                                if (prop.required && prop.def) throw new Error("Required prop can not have a default value");
                            }
                        }(options);
                        if (options.dimensions) {
                            if (options.dimensions && !Object(lib.E)(options.dimensions.width) && !Object(lib.D)(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                            if (options.dimensions && !Object(lib.E)(options.dimensions.height) && !Object(lib.D)(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                        }
                        if (options.contexts) {
                            options.contexts.popup;
                            for (var anyEnabled = !1, _i4 = 0, _Object$keys4 = Object.keys(options.contexts), _length4 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                                var context = _Object$keys4[_i4];
                                if (-1 === constants.CONTEXT_TYPES_LIST.indexOf(context)) throw new Error("Unsupported context type: " + context);
                                (options.contexts && options.contexts[context] || options.contexts && void 0 === options.contexts[context]) && (anyEnabled = !0);
                            }
                            if (!anyEnabled) throw new Error("No context type is enabled");
                        }
                        if (options.defaultContext) {
                            if (-1 === constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext)) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                            if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) throw new Error("Disallowed default context type: " + (options.defaultContext || "unknown"));
                        }
                        if (options.url && options.buildUrl) throw new Error("Can not pass both options.url and options.buildUrl");
                        if (options.defaultEnv) {
                            if ("string" != typeof options.defaultEnv) throw new TypeError("Expected options.defaultEnv to be a string");
                            if (!options.buildUrl && "object" !== component_validate__typeof(options.url)) throw new Error("Expected options.url to be an object mapping env->url");
                            if (options.url && "object" === component_validate__typeof(options.url) && !options.url[options.defaultEnv]) throw new Error("No url found for default env: " + options.defaultEnv);
                        }
                        if (options.url && "object" === component_validate__typeof(options.url)) {
                            if (!options.defaultEnv) throw new Error("Must pass options.defaultEnv with env->url mapping");
                            for (var _i6 = 0, _Object$keys6 = Object.keys(options.url), _length6 = null == _Object$keys6 ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                                var env = _Object$keys6[_i6];
                                if (!options.url[env]) throw new Error("No url specified for env: " + env);
                            }
                        }
                        if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
                        if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
                    }(options);
                    _this.addProp(options, "tag");
                    _this.addProp(options, "defaultLogLevel", "info");
                    _this.addProp(options, "allowedParentDomains", constants.WILDCARD);
                    Object(lib.S)(_this.defaultLogLevel);
                    if (Component.components[_this.tag]) throw new Error("Can not register multiple components with the same tag");
                    _this.addProp(options, "name", _this.tag.replace(/-/g, "_"));
                    _this.builtinProps = {
                        env: {
                            type: "string",
                            required: !1,
                            queryParam: !0,
                            def: function() {
                                return this.defaultEnv;
                            }
                        },
                        uid: {
                            type: "string",
                            def: function() {
                                return Object(lib._0)();
                            },
                            queryParam: !0
                        },
                        logLevel: {
                            type: "string",
                            required: !1,
                            queryParam: !0,
                            def: function() {
                                return this.defaultLogLevel;
                            }
                        },
                        url: {
                            type: "string",
                            required: !1,
                            promise: !0,
                            sendToChild: !1
                        },
                        dimensions: {
                            type: "object",
                            required: !1
                        },
                        version: {
                            type: "string",
                            required: !1,
                            queryParam: !0,
                            def: function() {
                                return this.version;
                            }
                        },
                        timeout: {
                            type: "number",
                            required: !1,
                            sendToChild: !1
                        },
                        onDisplay: {
                            type: "function",
                            required: !1,
                            noop: !0,
                            promisify: !0,
                            memoize: !0,
                            sendToChild: !1
                        },
                        onEnter: {
                            type: "function",
                            required: !1,
                            noop: !0,
                            promisify: !0,
                            sendToChild: !1
                        },
                        onRender: {
                            type: "function",
                            required: !1,
                            noop: !0,
                            promisify: !0,
                            sendToChild: !1
                        },
                        onClose: {
                            type: "function",
                            required: !1,
                            noop: !0,
                            once: !0,
                            promisify: !0,
                            sendToChild: !1
                        },
                        onTimeout: {
                            type: "function",
                            required: !1,
                            memoize: !0,
                            promisify: !0,
                            sendToChild: !1,
                            def: function() {
                                return function(err) {
                                    if (this.props.onError) return this.props.onError(err);
                                    throw err;
                                };
                            }
                        },
                        onError: {
                            type: "function",
                            required: !1,
                            promisify: !0,
                            sendToChild: !0,
                            once: !0,
                            def: function() {
                                return function(err) {
                                    setTimeout(function() {
                                        throw err;
                                    });
                                };
                            }
                        }
                    };
                    _this.props = options.props || {};
                    options.props || (_this.looseProps = !0);
                    _this.addProp(options, "dimensions");
                    _this.addProp(options, "scrolling");
                    _this.addProp(options, "listenForResize");
                    _this.addProp(options, "version", "latest");
                    _this.addProp(options, "defaultEnv");
                    _this.addProp(options, "buildUrl");
                    _this.addProp(options, "url");
                    _this.addProp(options, "domain");
                    _this.addProp(options, "bridgeUrl");
                    _this.addProp(options, "bridgeDomain");
                    _this.addProp(options, "attributes", {});
                    _this.addProp(options, "contexts", {
                        iframe: !0,
                        popup: !1
                    });
                    _this.addProp(options, "defaultContext");
                    _this.addProp(options, "autoResize", !1);
                    _this.addProp(options, "containerTemplate", defaultContainerTemplate);
                    _this.addProp(options, "prerenderTemplate", defaultPrerenderTemplate);
                    _this.addProp(options, "validate");
                    _this.addProp(options, "unsafeRenderTo", !1);
                    Component.components[_this.tag] = _this;
                    _this.registerDrivers();
                    _this.registerChild();
                    _this.listenDelegate();
                    return _this;
                }
                Component.prototype.getPropNames = function() {
                    for (var props = Object.keys(this.props), _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        var key = _Object$keys2[_i2];
                        -1 === props.indexOf(key) && props.push(key);
                    }
                    return props;
                };
                Component.prototype.getProp = function(name) {
                    return this.props[name] || this.builtinProps[name];
                };
                Component.prototype.registerDrivers = function() {
                    this.driverCache = {};
                    for (var _i4 = 0, _Object$keys4 = Object.keys(component_drivers), _length4 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                        var driverName = _Object$keys4[_i4];
                        if (0 !== driverName.indexOf("_")) {
                            var glob = component_drivers[driverName].global();
                            glob && this.driver(driverName, glob);
                        }
                    }
                };
                Component.prototype.driver = function(name, dep) {
                    if (!component_drivers[name]) throw new Error("Could not find driver for framework: " + name);
                    this.driverCache[name] || (this.driverCache[name] = component_drivers[name].register(this, dep));
                    return this.driverCache[name];
                };
                Component.prototype.registerChild = function() {
                    var _this2 = this;
                    return src.a.try(function() {
                        if (_this2.isChild()) return new child_ChildComponent(_this2);
                    });
                };
                Component.prototype.listenDelegate = function() {
                    var _this3 = this;
                    Object(post_robot_src.on)(constants.POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name, function() {
                        return !0;
                    });
                    Object(post_robot_src.on)(constants.POST_MESSAGE.DELEGATE + "_" + this.name, function(_ref) {
                        var source = _ref.source, origin = _ref.origin, data = _ref.data, domain = _this3.getDomain(null, data.env || _this3.defaultEnv);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error("Can not render from " + origin + " - expected " + domain.toString());
                        var delegate = _this3.delegate(source, data.options);
                        return {
                            overrides: delegate.getOverrides(data.context),
                            destroy: function() {
                                return delegate.destroy();
                            }
                        };
                    });
                };
                Component.prototype.canRenderTo = function(win) {
                    return Object(post_robot_src.send)(win, constants.POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name).then(function(_ref2) {
                        return _ref2.data;
                    }).catch(function() {
                        return !1;
                    });
                };
                Component.prototype.getValidDomain = function(url) {
                    if (url) {
                        var domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                        if ("string" == typeof this.domain && domain === this.domain) return domain;
                        var domains = this.domain;
                        if (domains && "object" === (void 0 === domains ? "undefined" : component__typeof(domains)) && !(domains instanceof RegExp)) for (var _i6 = 0, _Object$keys6 = Object.keys(domains), _length6 = null == _Object$keys6 ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                            var env = _Object$keys6[_i6];
                            if ("test" !== env && domain === domains[env]) return domain;
                        }
                    }
                };
                Component.prototype.getDomain = function(url, env) {
                    var domain = this.getForEnv(this.domain, env);
                    if (domain) return domain;
                    if (domain = this.getValidDomain(url)) return domain;
                    var envUrl = this.getForEnv(this.url, env);
                    return envUrl ? Object(cross_domain_utils_src.getDomainFromUrl)(envUrl) : url ? Object(cross_domain_utils_src.getDomainFromUrl)(url) : void 0;
                };
                Component.prototype.getBridgeUrl = function(env) {
                    return this.getForEnv(this.bridgeUrl, env);
                };
                Component.prototype.getForEnv = function(item, env) {
                    if (item) {
                        if ("string" == typeof item || item instanceof RegExp) return item;
                        env || (env = this.defaultEnv);
                        if (env) return env && "object" === (void 0 === item ? "undefined" : component__typeof(item)) && item[env] ? item[env] : void 0;
                    }
                };
                Component.prototype.getBridgeDomain = function(env) {
                    var bridgeDomain = this.getForEnv(this.bridgeDomain, env);
                    if (bridgeDomain) return bridgeDomain;
                    var bridgeUrl = this.getBridgeUrl(env);
                    return bridgeUrl ? Object(cross_domain_utils_src.getDomainFromUrl)(bridgeUrl) : void 0;
                };
                Component.prototype.getUrl = function(env, props) {
                    var url = this.getForEnv(this.url, env);
                    if (url) return url;
                    if (this.buildUrl) return this.buildUrl(props);
                    throw new Error("Unable to get url");
                };
                Component.prototype.isZoidComponent = function() {
                    return isZoidComponentWindow();
                };
                Component.prototype.isChild = function() {
                    return isZoidComponentWindow() && getComponentMeta().tag === this.tag;
                };
                Component.prototype.createError = function(message, tag) {
                    return new Error("[" + (tag || this.tag) + "] " + message);
                };
                Component.prototype.init = function(props, context, element) {
                    return new parent_ParentComponent(this, this.getRenderContext(context, element), {
                        props: props
                    });
                };
                Component.prototype.delegate = function(source, options) {
                    return new delegate_DelegateComponent(this, source, options);
                };
                Component.prototype.validateRenderContext = function(context, element) {
                    if (context && !this.contexts[context]) throw new Error("[" + this.tag + "] Can not render to " + context);
                    if (!element && context === constants.CONTEXT_TYPES.IFRAME) throw new Error("[" + this.tag + "] Context type " + constants.CONTEXT_TYPES.IFRAME + " requires an element selector");
                };
                Component.prototype.getDefaultContext = function() {
                    if (this.defaultContext) return this.defaultContext;
                    if (this.contexts[constants.CONTEXT_TYPES.IFRAME]) return constants.CONTEXT_TYPES.IFRAME;
                    if (this.contexts[constants.CONTEXT_TYPES.POPUP]) return constants.CONTEXT_TYPES.POPUP;
                    throw new Error("Can not determine default context");
                };
                Component.prototype.getRenderContext = function(context, element) {
                    context = context || this.getDefaultContext();
                    this.validateRenderContext(context, element);
                    return context;
                };
                Component.prototype.render = function(props, element) {
                    var _this4 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this4, _this4.getRenderContext(null, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderIframe = function(props, element) {
                    var _this5 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this5, _this5.getRenderContext(constants.CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderPopup = function(props) {
                    var _this6 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this6, _this6.getRenderContext(constants.CONTEXT_TYPES.POPUP), {
                            props: props
                        }).render();
                    });
                };
                Component.prototype.renderTo = function(win, props, element) {
                    var _this7 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this7, _this7.getRenderContext(null, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderIframeTo = function(win, props, element) {
                    var _this8 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this8, _this8.getRenderContext(constants.CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderPopupTo = function(win, props) {
                    var _this9 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this9, _this9.getRenderContext(constants.CONTEXT_TYPES.POPUP), {
                            props: props
                        }).renderTo(win);
                    });
                };
                Component.prototype.prerender = function(props, element) {
                    var instance = new parent_ParentComponent(this, this.getRenderContext(null, element), {
                        props: props
                    });
                    instance.prefetch();
                    return {
                        render: function(innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.render(innerElement);
                        },
                        renderTo: function(win, innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.renderTo(win, innerElement);
                        },
                        get html() {
                            return instance.html;
                        },
                        set html(value) {
                            instance.html = value;
                        }
                    };
                };
                Component.prototype.log = function(event) {
                    var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    Object(lib.C)(this.name, event, payload);
                };
                Component.prototype.logWarning = function(event, payload) {
                    Object(lib._1)(this.name, event, payload);
                };
                Component.prototype.logError = function(event, payload) {
                    Object(lib.r)(this.name, event, payload);
                };
                Component.getByTag = function(tag) {
                    return Component.components[tag];
                };
                return Component;
            }(base_BaseComponent)).prototype, 0, [ lib.G ], Object.getOwnPropertyDescriptor(component__class.prototype, "getPropNames"), component__class.prototype), 
            component__class);
            component_Component.components = {};
            function create(options) {
                return new component_Component(options);
            }
            function getByTag(tag) {
                return component_Component.getByTag(tag);
            }
            function interface_destroyAll() {
                return parent_ParentComponent.destroyAll();
            }
            var postRobot = post_robot_src, CONSTANTS = constants;
            __webpack_require__.d(__webpack_exports__, "create", function() {
                return create;
            });
            __webpack_require__.d(__webpack_exports__, "getByTag", function() {
                return getByTag;
            });
            __webpack_require__.d(__webpack_exports__, "getCurrentScriptDir", function() {
                return lib.w;
            });
            __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return interface_destroyAll;
            });
            __webpack_require__.d(__webpack_exports__, "postRobot", function() {
                return postRobot;
            });
            __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return CONSTANTS;
            });
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return src_error.b;
            });
            __webpack_require__.d(__webpack_exports__, "IntegrationError", function() {
                return src_error.a;
            });
            __webpack_require__.d(__webpack_exports__, "RenderError", function() {
                return src_error.c;
            });
            __webpack_exports__.default = interface_namespaceObject;
        },
        "./src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), error = __webpack_require__("./src/error.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function urlEncode(str) {
                return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
            }
            function camelToDasherize(string) {
                return string.replace(/([A-Z])/g, function(g) {
                    return "-" + g.toLowerCase();
                });
            }
            function dasherizeToCamel(string) {
                return string.replace(/-([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
            }
            function extend(obj, source) {
                if (!source) return obj;
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            }
            function values(obj) {
                var results = [];
                for (var key in obj) obj.hasOwnProperty(key) && results.push(obj[key]);
                return results;
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function stringifyWithFunctions(obj) {
                return JSON.stringify(obj, function(key, val) {
                    return "function" == typeof val ? val.toString() : val;
                });
            }
            function safeGet(obj, prop) {
                var result = void 0;
                try {
                    result = obj[prop];
                } catch (err) {}
                return result;
            }
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }
            function get(item, path, def) {
                if (!path) return def;
                for (var pathParts = path.split("."), i = 0; i < pathParts.length; i++) {
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) return def;
                    item = item[pathParts[i]];
                }
                return void 0 === item ? def : item;
            }
            function safeInterval(method, time) {
                var timeout = void 0;
                timeout = setTimeout(function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            function safeTimeout(method, time) {
                var interval = safeInterval(function() {
                    if ((time -= 100) <= 0) {
                        interval.cancel();
                        method();
                    }
                }, 100);
            }
            function each(item, callback) {
                if (item) if (Array.isArray(item)) for (var len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ("object" === (void 0 === item ? "undefined" : _typeof(item))) for (var keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                    var key = keys[_i];
                    callback(item[key], key);
                }
            }
            function replaceObject(item, replacers) {
                var fullKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                if (Array.isArray(item)) {
                    var _ret = function() {
                        for (var length = item.length, result = [], _loop = function(i) {
                            Object.defineProperty(result, i, {
                                configurable: !0,
                                enumerable: !0,
                                get: function() {
                                    var itemKey = fullKey ? fullKey + "." + i : "" + i, child = item[i], type = void 0 === child ? "undefined" : _typeof(child), replacer = replacers[type];
                                    if (replacer) {
                                        var replaced = replacer(child, i, itemKey);
                                        if (void 0 !== replaced) {
                                            result[i] = replaced;
                                            return result[i];
                                        }
                                    }
                                    if ("object" === (void 0 === child ? "undefined" : _typeof(child)) && null !== child) {
                                        result[i] = replaceObject(child, replacers, itemKey);
                                        return result[i];
                                    }
                                    result[i] = child;
                                    return result[i];
                                },
                                set: function(value) {
                                    delete result[i];
                                    result[i] = value;
                                }
                            });
                        }, i = 0; i < length; i++) _loop(i);
                        return {
                            v: result
                        };
                    }();
                    if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                } else {
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) throw new Error("Pass an object or array");
                    var _ret3 = function() {
                        var result = {}, _loop2 = function(key) {
                            if (!item.hasOwnProperty(key)) return "continue";
                            Object.defineProperty(result, key, {
                                configurable: !0,
                                enumerable: !0,
                                get: function() {
                                    var itemKey = fullKey ? fullKey + "." + key : "" + key, child = item[key], type = void 0 === child ? "undefined" : _typeof(child), replacer = replacers[type];
                                    if (replacer) {
                                        var replaced = replacer(child, key, itemKey);
                                        if (void 0 !== replaced) {
                                            result[key] = replaced;
                                            return result[key];
                                        }
                                    }
                                    if ("object" === (void 0 === child ? "undefined" : _typeof(child)) && null !== child) {
                                        result[key] = replaceObject(child, replacers, itemKey);
                                        return result[key];
                                    }
                                    result[key] = child;
                                    return result[key];
                                },
                                set: function(value) {
                                    delete result[key];
                                    result[key] = value;
                                }
                            });
                        };
                        for (var key in item) _loop2(key);
                        return {
                            v: result
                        };
                    }();
                    if ("object" === (void 0 === _ret3 ? "undefined" : _typeof(_ret3))) return _ret3.v;
                }
            }
            function copyProp(source, target, name, def) {
                if (source.hasOwnProperty(name)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, name);
                    Object.defineProperty(target, name, descriptor);
                } else target[name] = def;
            }
            function dotify(obj) {
                var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                prefix = prefix ? prefix + "." : prefix;
                for (var key in obj) void 0 !== obj[key] && null !== obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                    return "object" !== (void 0 === val ? "undefined" : _typeof(val));
                }) ? newobj["" + prefix + key] = obj[key].join(",") : obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                return newobj;
            }
            var objectIDs = new cross_domain_safe_weakmap_src.a();
            function getObjectID(obj) {
                if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
                var uid = objectIDs.get(obj);
                if (!uid) {
                    uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID();
                    objectIDs.set(obj, uid);
                }
                return uid;
            }
            function regex(pattern, string) {
                var start = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                "string" == typeof pattern && (pattern = new RegExp(pattern));
                var result = string.slice(start).match(pattern);
                if (result) {
                    var index = result.index, match = result[0];
                    return {
                        text: match,
                        groups: result.slice(1),
                        start: start + index,
                        end: start + index + match.length,
                        length: match.length,
                        replace: function(text) {
                            return match ? "" + match.slice(0, start + index) + text + match.slice(index + match.length) : "";
                        }
                    };
                }
            }
            function regexAll(pattern, string) {
                for (var matches = [], start = 0; ;) {
                    var match = regex(pattern, string, start);
                    if (!match) break;
                    matches.push(match);
                    start = match.end;
                }
                return matches;
            }
            function count(str, substr) {
                for (var startIndex = 0, itemCount = 0; ;) {
                    var index = str.indexOf(substr, startIndex);
                    if (-1 === index) break;
                    startIndex = index;
                    itemCount += 1;
                }
                return itemCount;
            }
            function stringify(item) {
                return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
            }
            function stringifyError(err) {
                if (err) {
                    var stack = err.stack, message = err.message;
                    if ("string" == typeof stack) return stack;
                    if ("string" == typeof message) return message;
                }
                return stringify(err);
            }
            function eventEmitter() {
                var triggered = {}, handlers = {};
                return {
                    on: function(eventName, handler) {
                        var handlerList = handlers[eventName] = handlers[eventName] || [];
                        handlerList.push(handler);
                        var cancelled = !1;
                        return {
                            cancel: function() {
                                if (!cancelled) {
                                    cancelled = !0;
                                    handlerList.splice(handlerList.indexOf(handler), 1);
                                }
                            }
                        };
                    },
                    once: function(eventName, handler) {
                        var listener = this.on(eventName, function() {
                            listener.cancel();
                            handler();
                        });
                        return listener;
                    },
                    trigger: function(eventName) {
                        var handlerList = handlers[eventName];
                        if (handlerList) for (var _i3 = 0, _length2 = null == handlerList ? 0 : handlerList.length; _i3 < _length2; _i3++) (0, 
                        handlerList[_i3])();
                    },
                    triggerOnce: function(eventName) {
                        if (!triggered[eventName]) {
                            triggered[eventName] = !0;
                            this.trigger(eventName);
                        }
                    }
                };
            }
            function noop() {}
            function once(method) {
                var called = !1, result = void 0;
                return function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    if (called) return result;
                    called = !0;
                    return result = method.apply(this, arguments);
                };
            }
            function memoize(method) {
                var results = {};
                return function() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    var cacheKey = void 0;
                    try {
                        cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function(key, val) {
                            return "function" == typeof val ? "zoid:memoize[" + getObjectID(val) + "]" : val;
                        });
                    } catch (err) {
                        throw new Error("Arguments not serializable -- can not be used to memoize");
                    }
                    results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments));
                    return results[cacheKey];
                };
            }
            function debounce(method) {
                var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
                return function() {
                    var _this = this, _arguments = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        return method.apply(_this, _arguments);
                    }, time);
                };
            }
            function serializeFunctions(obj) {
                return replaceObject(obj, {
                    function: function() {
                        return {
                            __type__: "__function__"
                        };
                    }
                });
            }
            function deserializeFunctions(obj, handler) {
                return replaceObject(obj, {
                    object: function(value, key, fullKey) {
                        if (value && "__function__" === value.__type__) return function() {
                            return handler({
                                key: key,
                                fullKey: fullKey,
                                self: this,
                                args: arguments
                            });
                        };
                    }
                });
            }
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, dom__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function appendChild(container, child) {
                container.appendChild(child);
            }
            function querySelectorAll(el, selector) {
                return Array.prototype.slice.call(el.querySelectorAll(selector));
            }
            function getElementSafe(id) {
                if (function(element) {
                    return element instanceof window.Element || null !== element && "object" === (void 0 === element ? "undefined" : dom__typeof(element)) && 1 === element.nodeType && "object" === dom__typeof(element.style) && "object" === dom__typeof(element.ownerDocument);
                }(id)) return id;
                if ("string" == typeof id) {
                    var element = document.getElementById(id);
                    if (element) return element;
                    document.querySelector && (element = document.querySelector(id));
                    if (element) return element;
                }
            }
            function getElement(id) {
                var element = getElementSafe(id);
                if (element) return element;
                throw new Error("Can not find element: " + stringify(id));
            }
            var documentReady = new zalgo_promise_src.a(function(resolve) {
                if ("complete" === window.document.readyState) return resolve(window.document);
                var interval = setInterval(function() {
                    if ("complete" === window.document.readyState) {
                        clearInterval(interval);
                        return resolve(window.document);
                    }
                }, 10);
            });
            function isDocumentReady() {
                return "complete" === window.document.readyState;
            }
            function elementReady(id) {
                return new zalgo_promise_src.a(function(resolve, reject) {
                    var name = stringify(id), el = getElementSafe(id);
                    if (el) return resolve(el);
                    if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                    var interval = setInterval(function() {
                        if (el = getElementSafe(id)) {
                            clearInterval(interval);
                            return resolve(el);
                        }
                        if (isDocumentReady()) {
                            clearInterval(interval);
                            return reject(new Error("Document is ready and element " + name + " does not exist"));
                        }
                    }, 10);
                });
            }
            function popup(url, options) {
                var params = Object.keys(options).map(function(key) {
                    if (options[key]) return key + "=" + stringify(options[key]);
                }).filter(Boolean).join(","), win = void 0;
                try {
                    win = window.open(url, options.name, params, !0);
                } catch (err) {
                    throw new error.b("Can not open popup window - " + (err.stack || err.message));
                }
                if (Object(src.isWindowClosed)(win)) {
                    var err;
                    throw new error.b("Can not open popup window - blocked");
                }
                return win;
            }
            function writeToWindow(win, html) {
                try {
                    win.document.open();
                    win.document.write(html);
                    win.document.close();
                } catch (err) {
                    try {
                        win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                    } catch (err2) {}
                }
            }
            function writeElementToWindow(win, el) {
                var tag = el.tagName.toLowerCase();
                if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length; ) documentElement.removeChild(documentElement.children[0]);
                for (;el.children.length; ) documentElement.appendChild(el.children[0]);
            }
            function setStyle(el, styleText) {
                var doc = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document;
                el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
            }
            function createElement() {
                var tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div", options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, container = arguments[2];
                tag = tag.toLowerCase();
                var element = document.createElement(tag);
                options.style && extend(element.style, options.style);
                options.class && (element.className = options.class.join(" "));
                if (options.attributes) for (var _i2 = 0, _Object$keys2 = Object.keys(options.attributes), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                    var key = _Object$keys2[_i2];
                    element.setAttribute(key, options.attributes[key]);
                }
                options.styleSheet && setStyle(element, options.styleSheet);
                container && appendChild(container, element);
                if (options.html) if ("iframe" === tag) {
                    if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    writeToWindow(element.contentWindow, options.html);
                } else element.innerHTML = options.html;
                return element;
            }
            var awaitFrameLoadPromises = new cross_domain_safe_weakmap_src.a();
            function awaitFrameLoad(frame) {
                if (awaitFrameLoadPromises.has(frame)) {
                    var _promise = awaitFrameLoadPromises.get(frame);
                    if (_promise) return _promise;
                }
                var promise = new zalgo_promise_src.a(function(resolve, reject) {
                    frame.addEventListener("load", function() {
                        Object(src.linkFrameWindow)(frame);
                        resolve(frame);
                    });
                    frame.addEventListener("error", function(err) {
                        frame.contentWindow ? resolve(frame) : reject(err);
                    });
                });
                awaitFrameLoadPromises.set(frame, promise);
                return promise;
            }
            function awaitFrameWindow(frame) {
                return frame.contentWindow ? zalgo_promise_src.a.resolve(frame.contentWindow) : awaitFrameLoad(frame).then(function(loadedFrame) {
                    if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                    return loadedFrame.contentWindow;
                });
            }
            function iframe() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, el = getElement(arguments[1]), attributes = options.attributes || {}, style = options.style || {}, frame = createElement("iframe", {
                    attributes: _extends({
                        frameBorder: "0",
                        allowTransparency: "true"
                    }, attributes),
                    style: _extends({
                        backgroundColor: "transparent"
                    }, style),
                    html: options.html,
                    class: options.class
                });
                awaitFrameLoad(frame);
                el.appendChild(frame);
                (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) && frame.setAttribute("src", options.url || "about:blank");
                return frame;
            }
            function addEventListener(obj, event, handler) {
                obj.addEventListener(event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            }
            function scanForJavascript(str) {
                if (!str) return str;
                if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) throw new Error("HTML contains potential javascript: " + str);
                return str;
            }
            var parseQuery = memoize(function(queryString) {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
                for (var _i4 = 0, _queryString$split2 = queryString.split("&"), _length4 = null == _queryString$split2 ? 0 : _queryString$split2.length; _i4 < _length4; _i4++) {
                    var pair = _queryString$split2[_i4];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            });
            function getQueryParam(name) {
                return parseQuery(window.location.search.slice(1))[name];
            }
            function formatQuery() {
                var obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Object.keys(obj).filter(function(key) {
                    return "string" == typeof obj[key];
                }).map(function(key) {
                    return urlEncode(key) + "=" + urlEncode(obj[key]);
                }).join("&");
            }
            function extendQuery(originalQuery) {
                var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
            }
            function extendUrl(url) {
                var originalHash, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, _url$split = url.split("#");
                originalUrl = _url$split[0];
                originalHash = _url$split[1];
                var _originalUrl$split = originalUrl.split("?");
                originalUrl = _originalUrl$split[0];
                var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
                queryString && (originalUrl = originalUrl + "?" + queryString);
                hashString && (originalUrl = originalUrl + "#" + hashString);
                return originalUrl;
            }
            function elementStoppedMoving(element) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
                return new zalgo_promise_src.a(function(resolve, reject) {
                    var el = getElement(element), start = el.getBoundingClientRect(), interval = void 0, timer = void 0;
                    interval = setInterval(function() {
                        var end = el.getBoundingClientRect();
                        if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                            clearTimeout(timer);
                            clearInterval(interval);
                            return resolve();
                        }
                        start = end;
                    }, 50);
                    timer = setTimeout(function() {
                        clearInterval(interval);
                        reject(new Error("Timed out waiting for element to stop animating after " + timeout + "ms"));
                    }, timeout);
                });
            }
            function getCurrentDimensions(el) {
                return {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                };
            }
            function changeStyle(el, styles) {
                return new zalgo_promise_src.a(function(resolve) {
                    for (var _i6 = 0, _Object$keys4 = Object.keys(styles), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                        var key = _Object$keys4[_i6];
                        el.style[key] = styles[key];
                    }
                    setTimeout(resolve, 1);
                });
            }
            function setOverflow(el) {
                var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto", _el$style = el.style, overflow = _el$style.overflow, overflowX = _el$style.overflowX, overflowY = _el$style.overflowY;
                el.style.overflow = el.style.overflowX = el.style.overflowY = value;
                return {
                    reset: function() {
                        el.style.overflow = overflow;
                        el.style.overflowX = overflowX;
                        el.style.overflowY = overflowY;
                    }
                };
            }
            function trackDimensions(el, _ref2) {
                var _ref2$width = _ref2.width, width = void 0 === _ref2$width || _ref2$width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$threshold = _ref2.threshold, threshold = void 0 === _ref2$threshold ? 0 : _ref2$threshold, currentDimensions = getCurrentDimensions(el);
                return {
                    check: function() {
                        var newDimensions = getCurrentDimensions(el);
                        return {
                            changed: function(one, two, _ref) {
                                var _ref$width = _ref.width, _ref$height = _ref.height, height = void 0 === _ref$height || _ref$height, _ref$threshold = _ref.threshold, threshold = void 0 === _ref$threshold ? 0 : _ref$threshold;
                                return !(void 0 !== _ref$width && !_ref$width || !(Math.abs(one.width - two.width) > threshold)) || !!(height && Math.abs(one.height - two.height) > threshold);
                            }(currentDimensions, newDimensions, {
                                width: width,
                                height: height,
                                threshold: threshold
                            }),
                            dimensions: newDimensions
                        };
                    },
                    reset: function() {
                        currentDimensions = getCurrentDimensions(el);
                    }
                };
            }
            function onDimensionsChange(el, _ref3) {
                var _ref3$width = _ref3.width, width = void 0 === _ref3$width || _ref3$width, _ref3$height = _ref3.height, height = void 0 === _ref3$height || _ref3$height, _ref3$delay = _ref3.delay, delay = void 0 === _ref3$delay ? 50 : _ref3$delay, _ref3$threshold = _ref3.threshold, threshold = void 0 === _ref3$threshold ? 0 : _ref3$threshold;
                return new zalgo_promise_src.a(function(resolve) {
                    var tracker = trackDimensions(el, {
                        width: width,
                        height: height,
                        threshold: threshold
                    }), interval = void 0, resolver = debounce(function(dimensions) {
                        clearInterval(interval);
                        return resolve(dimensions);
                    }, 4 * delay);
                    interval = setInterval(function() {
                        var _tracker$check = tracker.check(), changed = _tracker$check.changed, dimensions = _tracker$check.dimensions;
                        if (changed) {
                            tracker.reset();
                            return resolver(dimensions);
                        }
                    }, delay);
                    window.addEventListener("resize", function onWindowResize() {
                        var _tracker$check2 = tracker.check(), changed = _tracker$check2.changed, dimensions = _tracker$check2.dimensions;
                        if (changed) {
                            tracker.reset();
                            window.removeEventListener("resize", onWindowResize);
                            resolver(dimensions);
                        }
                    });
                });
            }
            function dimensionsMatchViewport(el, _ref4) {
                var width = _ref4.width, height = _ref4.height, dimensions = getCurrentDimensions(el);
                return !(width && dimensions.width !== window.innerWidth || height && dimensions.height !== window.innerHeight);
            }
            function bindEvents(element, eventNames, handler) {
                handler = once(handler);
                for (var _i8 = 0, _length8 = null == eventNames ? 0 : eventNames.length; _i8 < _length8; _i8++) {
                    var eventName = eventNames[_i8];
                    element.addEventListener(eventName, handler);
                }
                return {
                    cancel: once(function() {
                        for (var _i10 = 0, _length10 = null == eventNames ? 0 : eventNames.length; _i10 < _length10; _i10++) {
                            var _eventName = eventNames[_i10];
                            element.removeEventListener(_eventName, handler);
                        }
                    })
                };
            }
            var VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ];
            function setVendorCSS(element, name, value) {
                element.style[name] = value;
                for (var capitalizedName = capitalizeFirstLetter(name), _i12 = 0, _length12 = null == VENDOR_PREFIXES ? 0 : VENDOR_PREFIXES.length; _i12 < _length12; _i12++) {
                    var prefix = VENDOR_PREFIXES[_i12];
                    element.style["" + prefix + capitalizedName] = value;
                }
            }
            var CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE, ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ];
            function animate(element, name, clean) {
                var timeout = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1e3;
                return new zalgo_promise_src.a(function(resolve, reject) {
                    var el = getElement(element);
                    if (!el || !function(element, name) {
                        var stylesheets = el.ownerDocument.styleSheets;
                        try {
                            for (var i = 0; i < stylesheets.length; i++) {
                                var cssRules = stylesheets[i].cssRules;
                                if (cssRules) for (var j = 0; j < cssRules.length; j++) {
                                    var cssRule = cssRules[j];
                                    if (cssRule && cssRule.type === KEYFRAMES_RULE && cssRule.name === name) return !0;
                                }
                            }
                        } catch (err) {
                            return !1;
                        }
                        return !1;
                    }(0, name)) return resolve();
                    var hasStarted = !1, startTimeout = void 0, endTimeout = void 0, startEvent = void 0, endEvent = void 0;
                    function cleanUp() {
                        setVendorCSS(el, "animationName", "");
                        clearTimeout(startTimeout);
                        clearTimeout(endTimeout);
                        startEvent.cancel();
                        endEvent.cancel();
                    }
                    startEvent = bindEvents(el, ANIMATION_START_EVENTS, function(event) {
                        if (event.target === el && event.animationName === name) {
                            clearTimeout(startTimeout);
                            event.stopPropagation();
                            startEvent.cancel();
                            hasStarted = !0;
                            endTimeout = setTimeout(function() {
                                cleanUp();
                                resolve();
                            }, timeout);
                        }
                    });
                    endEvent = bindEvents(el, ANIMATION_END_EVENTS, function(event) {
                        if (event.target === el && event.animationName === name) {
                            cleanUp();
                            return "string" == typeof event.animationName && event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : resolve();
                        }
                    });
                    setVendorCSS(el, "animationName", name);
                    startTimeout = setTimeout(function() {
                        if (!hasStarted) {
                            cleanUp();
                            return resolve();
                        }
                    }, 200);
                    clean && clean(cleanUp);
                });
            }
            var STYLE = {
                DISPLAY: {
                    NONE: "none",
                    BLOCK: "block"
                },
                VISIBILITY: {
                    VISIBLE: "visible",
                    HIDDEN: "hidden"
                },
                IMPORTANT: "important"
            };
            function makeElementVisible(element) {
                element.style.setProperty("visibility", "");
            }
            function makeElementInvisible(element) {
                element.style.setProperty("visibility", STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
            }
            function showElement(element) {
                element.style.setProperty("display", "");
            }
            function hideElement(element) {
                element.style.setProperty("display", STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
            }
            function destroyElement(element) {
                element.parentNode && element.parentNode.removeChild(element);
            }
            function showAndAnimate(element, name, clean) {
                var animation = animate(element, name, clean);
                showElement(element);
                return animation;
            }
            function animateAndHide(element, name, clean) {
                return animate(element, name, clean).then(function() {
                    hideElement(element);
                });
            }
            function addClass(element, name) {
                element.classList ? element.classList.add(name) : -1 === element.className.split(/\s+/).indexOf(name) && (element.className += " " + name);
            }
            function removeClass(element, name) {
                element.classList ? element.classList.remove(name) : -1 !== element.className.split(/\s+/).indexOf(name) && (element.className = element.className.replace(name, ""));
            }
            function getCurrentScriptDir() {
                console.warn("Do not use zoid.getCurrentScriptDir() in production -- browser support is limited");
                return document.currentScript ? document.currentScript.src.split("/").slice(0, -1).join("/") : ".";
            }
            function getElementName(element) {
                if ("string" == typeof element) return element;
                if (!element || !element.tagName) return "<unknown>";
                var name = element.tagName.toLowerCase();
                element.id ? name += "#" + element.id : element.className && (name += "." + element.className.split(" ").join("."));
                return name;
            }
            function isElementClosed(el) {
                return !el || !el.parentNode;
            }
            function watchElementForClose(element, handler) {
                handler = once(handler);
                var interval = void 0;
                isElementClosed(element) ? handler() : interval = safeInterval(function() {
                    if (isElementClosed(element)) {
                        interval.cancel();
                        handler();
                    }
                }, 50);
                return {
                    cancel: function() {
                        interval && interval.cancel();
                    }
                };
            }
            function getHttpType(contentType, url) {
                return new zalgo_promise_src.a(function(resolve, reject) {
                    var req = new window.XMLHttpRequest();
                    req.open("GET", url);
                    req.setRequestHeader("Accept", contentType);
                    req.send(null);
                    req.onload = function() {
                        resolve(req.responseText);
                    };
                    req.onerror = function() {
                        return reject(new Error("prefetch failed"));
                    };
                });
            }
            function getHTML(url) {
                return getHttpType("text/html", url);
            }
            function getCSS(url) {
                return getHttpType("text/css", url);
            }
            function getScript(url) {
                return getHttpType("*/*", url);
            }
            function prefetchPage(url) {
                return getHTML(url);
            }
            var JSX_EVENTS = {
                onClick: "click"
            };
            function fixScripts(el) {
                for (var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document, _i14 = 0, _querySelectorAll2 = querySelectorAll(el, "script"), _length14 = null == _querySelectorAll2 ? 0 : _querySelectorAll2.length; _i14 < _length14; _i14++) {
                    var script = _querySelectorAll2[_i14], newScript = doc.createElement("script");
                    newScript.text = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                }
            }
            function jsxDom(name, props, content) {
                name = name.toLowerCase();
                var doc = this && this.createElement ? this : window.document, el = doc.createElement(name);
                for (var prop in props) if (prop in JSX_EVENTS) el.addEventListener(JSX_EVENTS[prop], props[prop]); else if ("innerHTML" === prop) {
                    el.innerHTML = props[prop];
                    fixScripts(el, doc);
                } else el.setAttribute(prop, props[prop]);
                if ("style" === name) {
                    if ("string" != typeof content) throw new TypeError("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : dom__typeof(content)));
                    if (arguments.length > 3) throw new Error("Expected only text content for " + name + " tag");
                    setStyle(el, content, doc);
                } else if ("iframe" === name) {
                    if (arguments.length > 3) throw new Error("Expected only single child node for iframe");
                    el.addEventListener("load", function() {
                        var win = el.contentWindow;
                        if (!win) throw new Error("Expected frame to have contentWindow");
                        "string" == typeof content ? writeToWindow(win, content) : writeElementToWindow(win, content);
                    });
                } else if ("script" === name) {
                    if ("string" != typeof content) throw new TypeError("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : dom__typeof(content)));
                    if (arguments.length > 3) throw new Error("Expected only text content for " + name + " tag");
                    el.text = content;
                } else for (var i = 2; i < arguments.length; i++) if ("string" == typeof arguments[i]) {
                    var textNode = doc.createTextNode(arguments[i]);
                    appendChild(el, textNode);
                } else appendChild(el, arguments[i]);
                return el;
            }
            function denodeify(method) {
                return function() {
                    var self = this, args = Array.prototype.slice.call(arguments);
                    return args.length >= method.length ? zalgo_promise_src.a.resolve(method.apply(self, args)) : new zalgo_promise_src.a(function(resolve, reject) {
                        args.push(function(err, result) {
                            if (err && !(err instanceof Error)) throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                            return err ? reject(err) : resolve(result);
                        });
                        method.apply(self, args);
                    });
                };
            }
            function promisify(method) {
                return function() {
                    var _this = this, _arguments = arguments;
                    return zalgo_promise_src.a.try(function() {
                        return method.apply(_this, _arguments);
                    });
                };
            }
            function promise_delay() {
                var time = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                return new zalgo_promise_src.a(function(resolve) {
                    setTimeout(resolve, time);
                });
            }
            function cycle(method) {
                return zalgo_promise_src.a.try(method).then(function() {
                    return cycle(method);
                });
            }
            function isPerc(str) {
                return "string" == typeof str && /^[0-9]+%$/.test(str);
            }
            function isPx(str) {
                return "string" == typeof str && /^[0-9]+px$/.test(str);
            }
            function toNum(val) {
                if ("number" == typeof val) return val;
                var match = val.match(/^([0-9]+)(px|%)$/);
                if (!match) throw new Error("Could not match css value from " + val);
                return parseInt(match[1], 10);
            }
            function toPx(val) {
                return toNum(val) + "px";
            }
            function toCSS(val) {
                return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
            }
            function percOf(num, perc) {
                return parseInt(num * toNum(perc) / 100, 10);
            }
            function normalizeDimension(dim, max) {
                if ("number" == typeof dim) return dim;
                if (isPerc(dim)) return percOf(max, dim);
                if (isPx(dim)) return toNum(dim);
                throw new Error("Can not normalize dimension: " + dim);
            }
            function memoized(target, name, descriptor) {
                var method = descriptor.value;
                descriptor.value = function() {
                    this.__memoized__ = this.__memoized__ || {};
                    this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments));
                    return this.__memoized__[name];
                };
                descriptor.value.displayName = name + ":memoized";
            }
            function decorators_promise(target, name, descriptor) {
                var method = descriptor.value;
                descriptor.value = function() {
                    return zalgo_promise_src.a.try(method, this, arguments);
                };
                descriptor.value.displayName = name + ":promisified";
            }
            var post_robot_src = __webpack_require__("./node_modules/post-robot/src/index.js"), client = __webpack_require__("./node_modules/beaver-logger/client/index.js");
            function setLogLevel(logLevel) {
                if (-1 === client.e.indexOf(logLevel)) throw new Error("Invalid logLevel: " + logLevel);
                client.a.logLevel = logLevel;
                post_robot_src.CONFIG.LOG_LEVEL = logLevel;
                window.LOG_LEVEL = logLevel;
            }
            function info(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Object(client.d)("xc_" + name + "_" + event, payload);
            }
            function warn(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Object(client.f)("xc_" + name + "_" + event, payload);
            }
            function logger_error(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Object(client.b)("xc_" + name + "_" + event, payload);
            }
            var constants = __webpack_require__("./src/constants.js");
            function globalFor(win) {
                if (Object(src.isSameDomain)(win)) {
                    win[constants.__ZOID__] || (win[constants.__ZOID__] = {});
                    return win[constants.__ZOID__];
                }
            }
            function localGlobal() {
                var global = globalFor(window);
                if (!global) throw new Error("Could not get local global");
                return global;
            }
            var global = localGlobal();
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return appendChild;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return querySelectorAll;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getElementSafe;
            });
            __webpack_require__.d(__webpack_exports__, "x", function() {
                return getElement;
            });
            __webpack_require__.d(__webpack_exports__, "n", function() {
                return documentReady;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return isDocumentReady;
            });
            __webpack_require__.d(__webpack_exports__, "p", function() {
                return elementReady;
            });
            __webpack_require__.d(__webpack_exports__, "M", function() {
                return popup;
            });
            __webpack_require__.d(__webpack_exports__, "_4", function() {
                return writeToWindow;
            });
            __webpack_require__.d(__webpack_exports__, "_3", function() {
                return writeElementToWindow;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return setStyle;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return createElement;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return awaitFrameLoad;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return awaitFrameWindow;
            });
            __webpack_require__.d(__webpack_exports__, "B", function() {
                return iframe;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return addEventListener;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return scanForJavascript;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return parseQuery;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getQueryParam;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return formatQuery;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return extendQuery;
            });
            __webpack_require__.d(__webpack_exports__, "u", function() {
                return extendUrl;
            });
            __webpack_require__.d(__webpack_exports__, "q", function() {
                return elementStoppedMoving;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getCurrentDimensions;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return changeStyle;
            });
            __webpack_require__.d(__webpack_exports__, "T", function() {
                return setOverflow;
            });
            __webpack_require__.d(__webpack_exports__, "Z", function() {
                return trackDimensions;
            });
            __webpack_require__.d(__webpack_exports__, "K", function() {
                return onDimensionsChange;
            });
            __webpack_require__.d(__webpack_exports__, "m", function() {
                return dimensionsMatchViewport;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return bindEvents;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return setVendorCSS;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return animate;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return makeElementVisible;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return makeElementInvisible;
            });
            __webpack_require__.d(__webpack_exports__, "V", function() {
                return showElement;
            });
            __webpack_require__.d(__webpack_exports__, "A", function() {
                return hideElement;
            });
            __webpack_require__.d(__webpack_exports__, "l", function() {
                return destroyElement;
            });
            __webpack_require__.d(__webpack_exports__, "U", function() {
                return showAndAnimate;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return animateAndHide;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return addClass;
            });
            __webpack_require__.d(__webpack_exports__, "P", function() {
                return removeClass;
            });
            __webpack_require__.d(__webpack_exports__, "w", function() {
                return getCurrentScriptDir;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getElementName;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return isElementClosed;
            });
            __webpack_require__.d(__webpack_exports__, "_2", function() {
                return watchElementForClose;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getHttpType;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getHTML;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getCSS;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getScript;
            });
            __webpack_require__.d(__webpack_exports__, "N", function() {
                return prefetchPage;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return fixScripts;
            });
            __webpack_require__.d(__webpack_exports__, "F", function() {
                return jsxDom;
            });
            __webpack_require__.d(__webpack_exports__, "I", function() {
                return noop;
            });
            __webpack_require__.d(__webpack_exports__, "L", function() {
                return once;
            });
            __webpack_require__.d(__webpack_exports__, "G", function() {
                return memoize;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return debounce;
            });
            __webpack_require__.d(__webpack_exports__, "R", function() {
                return serializeFunctions;
            });
            __webpack_require__.d(__webpack_exports__, "k", function() {
                return deserializeFunctions;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return denodeify;
            });
            __webpack_require__.d(__webpack_exports__, "O", function() {
                return promisify;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return promise_delay;
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return cycle;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return urlEncode;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return camelToDasherize;
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return dasherizeToCamel;
            });
            __webpack_require__.d(__webpack_exports__, "t", function() {
                return extend;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return values;
            });
            __webpack_require__.d(__webpack_exports__, "_0", function() {
                return uniqueID;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return stringifyWithFunctions;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return safeGet;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return capitalizeFirstLetter;
            });
            __webpack_require__.d(__webpack_exports__, "v", function() {
                return get;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return safeInterval;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return safeTimeout;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return each;
            });
            __webpack_require__.d(__webpack_exports__, "Q", function() {
                return replaceObject;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return copyProp;
            });
            __webpack_require__.d(__webpack_exports__, "o", function() {
                return dotify;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return getObjectID;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return regex;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return regexAll;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return count;
            });
            __webpack_require__.d(__webpack_exports__, "W", function() {
                return stringify;
            });
            __webpack_require__.d(__webpack_exports__, "X", function() {
                return stringifyError;
            });
            __webpack_require__.d(__webpack_exports__, "s", function() {
                return eventEmitter;
            });
            __webpack_require__.d(__webpack_exports__, "D", function() {
                return isPerc;
            });
            __webpack_require__.d(__webpack_exports__, "E", function() {
                return isPx;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return toNum;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return toPx;
            });
            __webpack_require__.d(__webpack_exports__, "Y", function() {
                return toCSS;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return percOf;
            });
            __webpack_require__.d(__webpack_exports__, "J", function() {
                return normalizeDimension;
            });
            __webpack_require__.d(__webpack_exports__, "H", function() {
                return memoized;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return decorators_promise;
            });
            __webpack_require__.d(__webpack_exports__, "S", function() {
                return setLogLevel;
            });
            __webpack_require__.d(__webpack_exports__, "C", function() {
                return info;
            });
            __webpack_require__.d(__webpack_exports__, "_1", function() {
                return warn;
            });
            __webpack_require__.d(__webpack_exports__, "r", function() {
                return logger_error;
            });
            __webpack_require__.d(__webpack_exports__, "z", function() {
                return globalFor;
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return localGlobal;
            });
            __webpack_require__.d(__webpack_exports__, "y", function() {
                return global;
            });
        },
        "./src/types.js": function(module, exports) {}
    });
});
//# sourceMappingURL=zoid.js.map