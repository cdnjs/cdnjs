!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.ReduxSearch = factory() : root.ReduxSearch = factory();
}(this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.INDEX_MODES = exports.SearchApi = exports.createSearchAction = exports.reduxSearch = exports.reducer = exports.getSearchSelectors = exports.defaultSearchStateSelector = void 0;
        var _jsWorkerSearch = __webpack_require__(1);
        Object.defineProperty(exports, "INDEX_MODES", {
            enumerable: !0,
            get: function() {
                return _jsWorkerSearch.INDEX_MODES;
            }
        });
        var _selectors = __webpack_require__(2), _actions = __webpack_require__(3), _reduxSearch = __webpack_require__(5), _reduxSearch2 = _interopRequireDefault(_reduxSearch), _reducer = __webpack_require__(113), _reducer2 = _interopRequireDefault(_reducer), _SearchApi = __webpack_require__(87), _SearchApi2 = _interopRequireDefault(_SearchApi);
        exports.default = _reduxSearch2.default, exports.defaultSearchStateSelector = _selectors.defaultSearchStateSelector, 
        exports.getSearchSelectors = _selectors.getSearchSelectors, exports.reducer = _reducer2.default, 
        exports.reduxSearch = _reduxSearch2.default, exports.createSearchAction = _actions.search, 
        exports.SearchApi = _SearchApi2.default;
    }, /* 1 */
    /***/
    function(module, exports) {
        module.exports = /******/
        function(modules) {
            /******/
            /******/
            // The require function
            /******/
            function __webpack_require__(moduleId) {
                /******/
                /******/
                // Check if module is in cache
                /******/
                if (installedModules[moduleId]) /******/
                return installedModules[moduleId].exports;
                /******/
                /******/
                // Create a new module (and put it into the cache)
                /******/
                var module = installedModules[moduleId] = {
                    /******/
                    exports: {},
                    /******/
                    id: moduleId,
                    /******/
                    loaded: !1
                };
                /******/
                /******/
                // Return the exports of the module
                /******/
                /******/
                /******/
                // Execute the module function
                /******/
                /******/
                /******/
                // Flag the module as loaded
                /******/
                return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
                module.loaded = !0, module.exports;
            }
            // webpackBootstrap
            /******/
            // The module cache
            /******/
            var installedModules = {};
            /******/
            /******/
            // Load entry module and return exports
            /******/
            /******/
            /******/
            /******/
            // expose the modules object (__webpack_modules__)
            /******/
            /******/
            /******/
            // expose the module cache
            /******/
            /******/
            /******/
            // __webpack_public_path__
            /******/
            return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
            __webpack_require__.p = "", __webpack_require__(0);
        }([ /* 0 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(1);
        }, /* 1 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.INDEX_MODES = void 0;
            var _SearchApi = __webpack_require__(2), _SearchApi2 = _interopRequireDefault(_SearchApi), _util = __webpack_require__(3);
            exports.default = _SearchApi2.default, exports.INDEX_MODES = _util.INDEX_MODES;
        }, /* 2 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _util = __webpack_require__(3), _worker = __webpack_require__(7), _worker2 = _interopRequireDefault(_worker), SearchApi = // TODO
            function SearchApi() {
                var _this = this, _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, caseSensitive = _ref.caseSensitive, indexMode = _ref.indexMode, matchAnyToken = _ref.matchAnyToken, tokenizePattern = _ref.tokenizePattern;
                _classCallCheck(this, SearchApi), this.indexDocument = function(uid, text) {
                    return _this._search.indexDocument(uid, text), _this;
                }, this.search = function(query) {
                    // Promise.resolve handles both synchronous and web-worker Search utilities
                    return _this._search.search(query);
                }, this.terminate = function() {
                    _this._search.terminate();
                }, // Based on https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
                // But with added check for Node environment
                "undefined" != typeof window && window.Worker ? this._search = new _worker2.default({
                    indexMode: indexMode,
                    matchAnyToken: matchAnyToken,
                    tokenizePattern: tokenizePattern,
                    caseSensitive: caseSensitive
                }) : this._search = new _util.SearchUtility({
                    indexMode: indexMode,
                    matchAnyToken: matchAnyToken,
                    tokenizePattern: tokenizePattern,
                    caseSensitive: caseSensitive
                });
            };
            exports.default = SearchApi;
        }, /* 3 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.SearchUtility = exports.INDEX_MODES = void 0;
            var _SearchUtility = __webpack_require__(4), _SearchUtility2 = _interopRequireDefault(_SearchUtility), _constants = __webpack_require__(5);
            exports.default = _SearchUtility2.default, exports.INDEX_MODES = _constants.INDEX_MODES, 
            exports.SearchUtility = _SearchUtility2.default;
        }, /* 4 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
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
            }(), _constants = __webpack_require__(5), _SearchIndex = __webpack_require__(6), _SearchIndex2 = _interopRequireDefault(_SearchIndex), SearchUtility = function() {
                /**
		   * Constructor.
		   *
		   * @param indexMode See #setIndexMode
		   * @param tokenizePattern See #setTokenizePattern
		   * @param caseSensitive See #setCaseSensitive
		   * @param matchAnyToken See #setMatchAnyToken
		   */
                function SearchUtility() {
                    var _this = this, _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = void 0 !== _ref$caseSensitive && _ref$caseSensitive, _ref$indexMode = _ref.indexMode, indexMode = void 0 === _ref$indexMode ? _constants.INDEX_MODES.ALL_SUBSTRINGS : _ref$indexMode, _ref$matchAnyToken = _ref.matchAnyToken, matchAnyToken = void 0 !== _ref$matchAnyToken && _ref$matchAnyToken, _ref$tokenizePattern = _ref.tokenizePattern, tokenizePattern = void 0 === _ref$tokenizePattern ? /\s+/ : _ref$tokenizePattern;
                    _classCallCheck(this, SearchUtility), this.indexDocument = function(uid, text) {
                        _this._uids[uid] = !0;
                        var fieldTokens = _this._tokenize(_this._sanitize(text));
                        return fieldTokens.forEach(function(fieldToken) {
                            var expandedTokens = _this._expandToken(fieldToken);
                            expandedTokens.forEach(function(expandedToken) {
                                _this._searchIndex.indexDocument(expandedToken, uid);
                            });
                        }), _this;
                    }, this.search = function(query) {
                        if (query) {
                            var tokens = _this._tokenize(_this._sanitize(query));
                            return _this._searchIndex.search(tokens, _this._matchAnyToken);
                        }
                        return Object.keys(_this._uids);
                    }, this.terminate = function() {}, this._caseSensitive = caseSensitive, this._indexMode = indexMode, 
                    this._matchAnyToken = matchAnyToken, this._tokenizePattern = tokenizePattern, this._searchIndex = new _SearchIndex2.default(), 
                    this._uids = {};
                }
                /**
		   * Returns a constant representing the current case-sensitive bit.
		   */
                return _createClass(SearchUtility, [ {
                    key: "getCaseSensitive",
                    value: function() {
                        return this._caseSensitive;
                    }
                }, {
                    key: "getIndexMode",
                    value: function() {
                        return this._indexMode;
                    }
                }, {
                    key: "getMatchAnyToken",
                    value: function() {
                        return this._matchAnyToken;
                    }
                }, {
                    key: "getTokenizePattern",
                    value: function() {
                        return this._tokenizePattern;
                    }
                }, {
                    key: "setCaseSensitive",
                    /**
		     * Sets a new case-sensitive bit
		     */
                    value: function(caseSensitive) {
                        this._caseSensitive = caseSensitive;
                    }
                }, {
                    key: "setIndexMode",
                    value: function(indexMode) {
                        if (Object.keys(this._uids).length > 0) throw Error("indexMode cannot be changed once documents have been indexed");
                        this._indexMode = indexMode;
                    }
                }, {
                    key: "setMatchAnyToken",
                    value: function(matchAnyToken) {
                        this._matchAnyToken = matchAnyToken;
                    }
                }, {
                    key: "setTokenizePattern",
                    value: function(pattern) {
                        this._tokenizePattern = pattern;
                    }
                }, {
                    key: "_expandToken",
                    /**
		     * Index strategy based on 'all-substrings-index-strategy.ts' in github.com/bvaughn/js-search/
		     *
		     * @private
		     */
                    value: function(token) {
                        switch (this._indexMode) {
                          case _constants.INDEX_MODES.EXACT_WORDS:
                            return [ token ];

                          case _constants.INDEX_MODES.PREFIXES:
                            return this._expandPrefixTokens(token);

                          case _constants.INDEX_MODES.ALL_SUBSTRINGS:
                          default:
                            return this._expandAllSubstringTokens(token);
                        }
                    }
                }, {
                    key: "_expandAllSubstringTokens",
                    value: function(token) {
                        var expandedTokens = [];
                        // String.prototype.charAt() may return surrogate halves instead of whole characters.
                        // When this happens in the context of a web-worker it can cause Chrome to crash.
                        // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
                        // Resources:
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
                        // https://mathiasbynens.be/notes/javascript-unicode
                        try {
                            for (var i = 0, length = token.length; i < length; ++i) for (var substring = "", j = i; j < length; ++j) substring += token.charAt(j), 
                            expandedTokens.push(substring);
                        } catch (error) {
                            console.error('Unable to parse token "' + token + '" ' + error);
                        }
                        return expandedTokens;
                    }
                }, {
                    key: "_expandPrefixTokens",
                    value: function(token) {
                        var expandedTokens = [];
                        // String.prototype.charAt() may return surrogate halves instead of whole characters.
                        // When this happens in the context of a web-worker it can cause Chrome to crash.
                        // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
                        // Resources:
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
                        // https://mathiasbynens.be/notes/javascript-unicode
                        try {
                            for (var i = 0, length = token.length; i < length; ++i) expandedTokens.push(token.substr(0, i + 1));
                        } catch (error) {
                            console.error('Unable to parse token "' + token + '" ' + error);
                        }
                        return expandedTokens;
                    }
                }, {
                    key: "_sanitize",
                    value: function(string) {
                        return this._caseSensitive ? string.trim() : string.trim().toLocaleLowerCase();
                    }
                }, {
                    key: "_tokenize",
                    value: function(text) {
                        return text.split(this._tokenizePattern).filter(function(text) {
                            return text;
                        });
                    }
                } ]), SearchUtility;
            }();
            exports.default = SearchUtility;
        }, /* 5 */
        /***/
        function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.INDEX_MODES = {
                // Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").
                // Based on 'all-substrings-index-strategy' from js-search;
                // github.com/bvaughn/js-search/blob/master/source/index-strategy/all-substrings-index-strategy.ts
                ALL_SUBSTRINGS: "ALL_SUBSTRINGS",
                // Indexes for exact word matches only.
                // Based on 'exact-word-index-strategy' from js-search;
                // github.com/bvaughn/js-search/blob/master/source/index-strategy/exact-word-index-strategy.ts
                EXACT_WORDS: "EXACT_WORDS",
                // Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).
                // Based on 'prefix-index-strategy' from js-search;
                // github.com/bvaughn/js-search/blob/master/source/index-strategy/prefix-index-strategy.ts
                PREFIXES: "PREFIXES"
            };
        }, /* 6 */
        /***/
        function(module, exports) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
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
            }(), SearchIndex = function() {
                function SearchIndex() {
                    _classCallCheck(this, SearchIndex), this.tokenToUidMap = {};
                }
                /**
		   * Maps the specified token to a uid.
		   *
		   * @param token Searchable token (e.g. "road")
		   * @param uid Identifies a document within the searchable corpus
		   */
                return _createClass(SearchIndex, [ {
                    key: "indexDocument",
                    value: function(token, uid) {
                        this.tokenToUidMap[token] || (this.tokenToUidMap[token] = {}), this.tokenToUidMap[token][uid] = uid;
                    }
                }, {
                    key: "search",
                    value: function(tokens, matchAnyToken) {
                        var _this = this, uidMap = {}, uidMatches = {}, initialized = !1;
                        tokens.forEach(function(token) {
                            var currentUidMap = _this.tokenToUidMap[token] || {};
                            if (initialized) // Delete existing matches if using and AND query (the default)
                            // Otherwise add new results to the matches
                            if (matchAnyToken) for (var _uid3 in currentUidMap) uidMap[_uid3] = currentUidMap[_uid3], 
                            uidMatches[_uid3] = (uidMatches[_uid3] || 0) + 1; else for (var _uid2 in uidMap) currentUidMap[_uid2] || delete uidMap[_uid2]; else {
                                initialized = !0;
                                for (var _uid in currentUidMap) uidMap[_uid] = currentUidMap[_uid], uidMatches[_uid] = 1;
                            }
                        });
                        var uids = [];
                        for (var _uid4 in uidMap) uids.push(uidMap[_uid4]);
                        // Sort according to most matches, if match any token is set.
                        return matchAnyToken && uids.sort(function(a, b) {
                            return uidMatches[b] - uidMatches[a];
                        }), uids;
                    }
                } ]), SearchIndex;
            }();
            exports.default = SearchIndex;
        }, /* 7 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _SearchWorkerLoader = __webpack_require__(8), _SearchWorkerLoader2 = _interopRequireDefault(_SearchWorkerLoader);
            exports.default = _SearchWorkerLoader2.default;
        }, /* 8 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
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
            }(), _uuid = __webpack_require__(9), _uuid2 = _interopRequireDefault(_uuid), SearchWorkerLoader = function() {
                /**
		   * Constructor.
		   */
                function SearchWorkerLoader() {
                    var _this = this, _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, caseSensitive = _ref.caseSensitive, indexMode = _ref.indexMode, matchAnyToken = _ref.matchAnyToken, tokenizePattern = _ref.tokenizePattern, WorkerClass = _ref.WorkerClass;
                    _classCallCheck(this, SearchWorkerLoader), this.indexDocument = function(uid, text) {
                        return _this._worker.postMessage({
                            method: "indexDocument",
                            text: text,
                            uid: uid
                        }), _this;
                    }, this.search = function(query) {
                        return new Promise(function(resolve, reject) {
                            var callbackId = _uuid2.default.v4(), data = {
                                callbackId: callbackId,
                                complete: !1,
                                error: null,
                                reject: reject,
                                resolve: resolve,
                                results: null
                            };
                            _this._worker.postMessage({
                                method: "search",
                                query: query,
                                callbackId: callbackId
                            }), _this._callbackQueue.push(data), _this._callbackIdMap[callbackId] = data;
                        });
                    }, this.terminate = function() {
                        _this._worker.terminate();
                    }, // Defer worker import until construction to avoid testing error:
                    // Error: Cannot find module 'worker!./[workername]'
                    WorkerClass || (// $FlowFixMe eslint-disable-next-line
                    WorkerClass = __webpack_require__(11)), this._callbackQueue = [], this._callbackIdMap = {}, 
                    this._worker = new WorkerClass(), this._worker.onerror = function(event) {
                        if (event.data) {
                            var _event$data = event.data, _callbackId = _event$data.callbackId, _error = _event$data.error;
                            _this._updateQueue({
                                callbackId: _callbackId,
                                error: _error
                            });
                        } else console.error(event);
                    }, this._worker.onmessage = function(event) {
                        var _event$data2 = event.data, callbackId = _event$data2.callbackId, results = _event$data2.results;
                        _this._updateQueue({
                            callbackId: callbackId,
                            results: results
                        });
                    }, // Override default :caseSensitive bit if a specific one has been requested
                    caseSensitive && this._worker.postMessage({
                        method: "setCaseSensitive",
                        caseSensitive: caseSensitive
                    }), // Override default :indexMode if a specific one has been requested
                    indexMode && this._worker.postMessage({
                        method: "setIndexMode",
                        indexMode: indexMode
                    }), // Override default :matchAnyToken bit if a specific one has been requested
                    matchAnyToken && this._worker.postMessage({
                        method: "setMatchAnyToken",
                        matchAnyToken: matchAnyToken
                    }), // Override default :tokenizePattern if a specific one has been requested
                    tokenizePattern && this._worker.postMessage({
                        method: "setTokenizePattern",
                        tokenizePattern: tokenizePattern
                    });
                }
                /**
		   * Adds or updates a uid in the search index and associates it with the specified text.
		   * Note that at this time uids can only be added or updated in the index, not removed.
		   *
		   * @param uid Uniquely identifies a searchable object
		   * @param text Text to associate with uid
		   */
                /**
		   * Searches the current index for the specified query text.
		   * Only uids matching all of the words within the text will be accepted.
		   * If an empty query string is provided all indexed uids will be returned.
		   *
		   * Document searches are case-insensitive (e.g. "search" will match "Search").
		   * Document searches use substring matching (e.g. "na" and "me" will both match "name").
		   *
		   * @param query Searchable query text
		   * @return Promise to be resolved with an array of uids
		   */
                /**
		   *  Stops and retires the worker. Used for cleanup.
		   */
                return _createClass(SearchWorkerLoader, [ {
                    key: "_updateQueue",
                    /**
		     * Updates the queue and flushes any completed promises that are ready.
		     */
                    value: function(_ref2) {
                        var callbackId = _ref2.callbackId, error = _ref2.error, results = _ref2.results, target = this._callbackIdMap[callbackId];
                        for (target.complete = !0, target.error = error, target.results = results; this._callbackQueue.length; ) {
                            var data = this._callbackQueue[0];
                            if (!data.complete) break;
                            this._callbackQueue.shift(), delete this._callbackIdMap[data.callbackId], data.error ? data.reject(data.error) : // This type will always be defined in this case;
                            // This casting lets Flow know it's safe.
                            data.resolve(data.results);
                        }
                    }
                } ]), SearchWorkerLoader;
            }();
            exports.default = SearchWorkerLoader;
        }, /* 9 */
        /***/
        function(module, exports, __webpack_require__) {
            // **`parse()` - Parse a UUID into it's component bytes**
            function parse(s, buf, offset) {
                var i = buf && offset || 0, ii = 0;
                // Zero out remaining bytes if string was short
                for (buf = buf || [], s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
                    ii < 16 && (// Don't overflow!
                    buf[i + ii++] = _hexToByte[oct]);
                }); ii < 16; ) buf[i + ii++] = 0;
                return buf;
            }
            // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
            function unparse(buf, offset) {
                var i = offset || 0, bth = _byteToHex;
                return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
            }
            // See https://github.com/broofa/node-uuid for API details
            function v1(options, buf, offset) {
                var i = buf && offset || 0, b = buf || [];
                options = options || {};
                var clockseq = void 0 !== options.clockseq ? options.clockseq : _clockseq, msecs = void 0 !== options.msecs ? options.msecs : new Date().getTime(), nsecs = void 0 !== options.nsecs ? options.nsecs : _lastNSecs + 1, dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
                // Per 4.2.1.2 Throw error if too many uuids are requested
                if (// Per 4.2.1.2, Bump clockseq on clock regression
                dt < 0 && void 0 === options.clockseq && (clockseq = clockseq + 1 & 16383), // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
                // time interval
                (dt < 0 || msecs > _lastMSecs) && void 0 === options.nsecs && (nsecs = 0), nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                _lastMSecs = msecs, _lastNSecs = nsecs, _clockseq = clockseq, // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
                msecs += 122192928e5;
                // `time_low`
                var tl = (1e4 * (268435455 & msecs) + nsecs) % 4294967296;
                b[i++] = tl >>> 24 & 255, b[i++] = tl >>> 16 & 255, b[i++] = tl >>> 8 & 255, b[i++] = 255 & tl;
                // `time_mid`
                var tmh = msecs / 4294967296 * 1e4 & 268435455;
                b[i++] = tmh >>> 8 & 255, b[i++] = 255 & tmh, // `time_high_and_version`
                b[i++] = tmh >>> 24 & 15 | 16, // include version
                b[i++] = tmh >>> 16 & 255, // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
                b[i++] = clockseq >>> 8 | 128, // `clock_seq_low`
                b[i++] = 255 & clockseq;
                for (var node = options.node || _nodeId, n = 0; n < 6; n++) b[i + n] = node[n];
                return buf ? buf : unparse(b);
            }
            // **`v4()` - Generate random UUID**
            // See https://github.com/broofa/node-uuid for API details
            function v4(options, buf, offset) {
                // Deprecated - 'format' argument, as supported in v1.2
                var i = buf && offset || 0;
                "string" == typeof options && (buf = "binary" == options ? new Array(16) : null, 
                options = null), options = options || {};
                var rnds = options.random || (options.rng || _rng)();
                // Copy bytes to buffer, if provided
                if (// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
                rnds[6] = 15 & rnds[6] | 64, rnds[8] = 63 & rnds[8] | 128, buf) for (var ii = 0; ii < 16; ii++) buf[i + ii] = rnds[ii];
                return buf || unparse(rnds);
            }
            for (var _rng = __webpack_require__(10), _byteToHex = [], _hexToByte = {}, i = 0; i < 256; i++) _byteToHex[i] = (i + 256).toString(16).substr(1), 
            _hexToByte[_byteToHex[i]] = i;
            // **`v1()` - Generate time-based UUID**
            //
            // Inspired by https://github.com/LiosK/UUID.js
            // and http://docs.python.org/library/uuid.html
            // random #'s we need to init node and clockseq
            var _seedBytes = _rng(), _nodeId = [ 1 | _seedBytes[0], _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5] ], _clockseq = 16383 & (_seedBytes[6] << 8 | _seedBytes[7]), _lastMSecs = 0, _lastNSecs = 0, uuid = v4;
            uuid.v1 = v1, uuid.v4 = v4, uuid.parse = parse, uuid.unparse = unparse, module.exports = uuid;
        }, /* 10 */
        /***/
        function(module, exports) {
            /* WEBPACK VAR INJECTION */
            (function(global) {
                var rng, crypto = global.crypto || global.msCrypto;
                // for IE 11
                if (crypto && crypto.getRandomValues) {
                    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
                    // Moderately fast, high quality
                    var _rnds8 = new Uint8Array(16);
                    rng = function() {
                        return crypto.getRandomValues(_rnds8), _rnds8;
                    };
                }
                if (!rng) {
                    // Math.random()-based (RNG)
                    //
                    // If all else fails, use Math.random().  It's fast, but is of unspecified
                    // quality.
                    var _rnds = new Array(16);
                    rng = function() {
                        for (var r, i = 0; i < 16; i++) 0 === (3 & i) && (r = 4294967296 * Math.random()), 
                        _rnds[i] = r >>> ((3 & i) << 3) & 255;
                        return _rnds;
                    };
                }
                module.exports = rng;
            }).call(exports, function() {
                return this;
            }());
        }, /* 11 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = function() {
                return __webpack_require__(12)('/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = "";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t"use strict";\n\t\n\tvar _util = __webpack_require__(1);\n\t\n\t/**\n\t * Search entry point to web worker.\n\t * Builds search index and performs searches on separate thread from the ui.\n\t */\n\t\n\tvar searchUtility = new _util.SearchUtility();\n\t\n\tself.addEventListener("message", function (event) {\n\t  var data = event.data;\n\t  var method = data.method;\n\t\n\t\n\t  switch (method) {\n\t    case "indexDocument":\n\t      var uid = data.uid,\n\t          text = data.text;\n\t\n\t\n\t      searchUtility.indexDocument(uid, text);\n\t      break;\n\t    case "search":\n\t      var callbackId = data.callbackId,\n\t          query = data.query;\n\t\n\t\n\t      var results = searchUtility.search(query);\n\t\n\t      self.postMessage({ callbackId: callbackId, results: results });\n\t      break;\n\t    case "setCaseSensitive":\n\t      var caseSensitive = data.caseSensitive;\n\t\n\t\n\t      searchUtility.setCaseSensitive(caseSensitive);\n\t      break;\n\t    case "setIndexMode":\n\t      var indexMode = data.indexMode;\n\t\n\t\n\t      searchUtility.setIndexMode(indexMode);\n\t      break;\n\t    case "setMatchAnyToken":\n\t      var matchAnyToken = data.matchAnyToken;\n\t\n\t\n\t      searchUtility.setMatchAnyToken(matchAnyToken);\n\t      break;\n\t    case "setTokenizePattern":\n\t      var tokenizePattern = data.tokenizePattern;\n\t\n\t\n\t      searchUtility.setTokenizePattern(tokenizePattern);\n\t      break;\n\t  }\n\t}, false);\n\n/***/ },\n/* 1 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t"use strict";\n\t\n\tObject.defineProperty(exports, "__esModule", {\n\t  value: true\n\t});\n\texports.SearchUtility = exports.INDEX_MODES = undefined;\n\t\n\tvar _SearchUtility = __webpack_require__(2);\n\t\n\tvar _SearchUtility2 = _interopRequireDefault(_SearchUtility);\n\t\n\tvar _constants = __webpack_require__(3);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\texports.default = _SearchUtility2.default;\n\texports.INDEX_MODES = _constants.INDEX_MODES;\n\texports.SearchUtility = _SearchUtility2.default;\n\n/***/ },\n/* 2 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t"use strict";\n\t\n\tObject.defineProperty(exports, "__esModule", {\n\t  value: true\n\t});\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _constants = __webpack_require__(3);\n\t\n\tvar _SearchIndex = __webpack_require__(4);\n\t\n\tvar _SearchIndex2 = _interopRequireDefault(_SearchIndex);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\t\n\t/**\n\t * Synchronous client-side full-text search utility.\n\t * Forked from JS search (github.com/bvaughn/js-search).\n\t */\n\tvar SearchUtility = function () {\n\t\n\t  /**\n\t   * Constructor.\n\t   *\n\t   * @param indexMode See #setIndexMode\n\t   * @param tokenizePattern See #setTokenizePattern\n\t   * @param caseSensitive See #setCaseSensitive\n\t   * @param matchAnyToken See #setMatchAnyToken\n\t   */\n\t  function SearchUtility() {\n\t    var _this = this;\n\t\n\t    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n\t        _ref$caseSensitive = _ref.caseSensitive,\n\t        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,\n\t        _ref$indexMode = _ref.indexMode,\n\t        indexMode = _ref$indexMode === undefined ? _constants.INDEX_MODES.ALL_SUBSTRINGS : _ref$indexMode,\n\t        _ref$matchAnyToken = _ref.matchAnyToken,\n\t        matchAnyToken = _ref$matchAnyToken === undefined ? false : _ref$matchAnyToken,\n\t        _ref$tokenizePattern = _ref.tokenizePattern,\n\t        tokenizePattern = _ref$tokenizePattern === undefined ? /\\s+/ : _ref$tokenizePattern;\n\t\n\t    _classCallCheck(this, SearchUtility);\n\t\n\t    this.indexDocument = function (uid, text) {\n\t      _this._uids[uid] = true;\n\t\n\t      var fieldTokens = _this._tokenize(_this._sanitize(text));\n\t\n\t      fieldTokens.forEach(function (fieldToken) {\n\t        var expandedTokens = _this._expandToken(fieldToken);\n\t\n\t        expandedTokens.forEach(function (expandedToken) {\n\t          _this._searchIndex.indexDocument(expandedToken, uid);\n\t        });\n\t      });\n\t\n\t      return _this;\n\t    };\n\t\n\t    this.search = function (query) {\n\t      if (!query) {\n\t        return Object.keys(_this._uids);\n\t      } else {\n\t        var tokens = _this._tokenize(_this._sanitize(query));\n\t\n\t        return _this._searchIndex.search(tokens, _this._matchAnyToken);\n\t      }\n\t    };\n\t\n\t    this.terminate = function () {};\n\t\n\t    this._caseSensitive = caseSensitive;\n\t    this._indexMode = indexMode;\n\t    this._matchAnyToken = matchAnyToken;\n\t    this._tokenizePattern = tokenizePattern;\n\t\n\t    this._searchIndex = new _SearchIndex2.default();\n\t    this._uids = {};\n\t  }\n\t\n\t  /**\n\t   * Returns a constant representing the current case-sensitive bit.\n\t   */\n\t\n\t\n\t  _createClass(SearchUtility, [{\n\t    key: "getCaseSensitive",\n\t    value: function getCaseSensitive() {\n\t      return this._caseSensitive;\n\t    }\n\t\n\t    /**\n\t     * Returns a constant representing the current index mode.\n\t     */\n\t\n\t  }, {\n\t    key: "getIndexMode",\n\t    value: function getIndexMode() {\n\t      return this._indexMode;\n\t    }\n\t\n\t    /**\n\t     * Returns a constant representing the current match-any-token bit.\n\t     */\n\t\n\t  }, {\n\t    key: "getMatchAnyToken",\n\t    value: function getMatchAnyToken() {\n\t      return this._matchAnyToken;\n\t    }\n\t\n\t    /**\n\t     * Returns a constant representing the current tokenize pattern.\n\t     */\n\t\n\t  }, {\n\t    key: "getTokenizePattern",\n\t    value: function getTokenizePattern() {\n\t      return this._tokenizePattern;\n\t    }\n\t\n\t    /**\n\t     * Adds or updates a uid in the search index and associates it with the specified text.\n\t     * Note that at this time uids can only be added or updated in the index, not removed.\n\t     *\n\t     * @param uid Uniquely identifies a searchable object\n\t     * @param text Text to associate with uid\n\t     */\n\t\n\t\n\t    /**\n\t     * Searches the current index for the specified query text.\n\t     * Only uids matching all of the words within the text will be accepted,\n\t     * unless matchAny is set to true.\n\t     * If an empty query string is provided all indexed uids will be returned.\n\t     *\n\t     * Document searches are case-insensitive by default (e.g. "search" will match "Search").\n\t     * Document searches use substring matching by default (e.g. "na" and "me" will both match "name").\n\t     *\n\t     * @param query Searchable query text\n\t     * @return Array of uids\n\t     */\n\t\n\t  }, {\n\t    key: "setCaseSensitive",\n\t\n\t\n\t    /**\n\t     * Sets a new case-sensitive bit\n\t     */\n\t    value: function setCaseSensitive(caseSensitive) {\n\t      this._caseSensitive = caseSensitive;\n\t    }\n\t\n\t    /**\n\t     * Sets a new index mode.\n\t     * See util/constants/INDEX_MODES\n\t     */\n\t\n\t  }, {\n\t    key: "setIndexMode",\n\t    value: function setIndexMode(indexMode) {\n\t      if (Object.keys(this._uids).length > 0) {\n\t        throw Error("indexMode cannot be changed once documents have been indexed");\n\t      }\n\t\n\t      this._indexMode = indexMode;\n\t    }\n\t\n\t    /**\n\t     * Sets a new match-any-token bit\n\t     */\n\t\n\t  }, {\n\t    key: "setMatchAnyToken",\n\t    value: function setMatchAnyToken(matchAnyToken) {\n\t      this._matchAnyToken = matchAnyToken;\n\t    }\n\t\n\t    /**\n\t     * Sets a new tokenize pattern (regular expression)\n\t     */\n\t\n\t  }, {\n\t    key: "setTokenizePattern",\n\t    value: function setTokenizePattern(pattern) {\n\t      this._tokenizePattern = pattern;\n\t    }\n\t\n\t    /**\n\t     *  Added to make class adhere to interface. Add cleanup code as needed.\n\t     */\n\t\n\t  }, {\n\t    key: "_expandToken",\n\t\n\t\n\t    /**\n\t     * Index strategy based on \'all-substrings-index-strategy.ts\' in github.com/bvaughn/js-search/\n\t     *\n\t     * @private\n\t     */\n\t    value: function _expandToken(token) {\n\t      switch (this._indexMode) {\n\t        case _constants.INDEX_MODES.EXACT_WORDS:\n\t          return [token];\n\t        case _constants.INDEX_MODES.PREFIXES:\n\t          return this._expandPrefixTokens(token);\n\t        case _constants.INDEX_MODES.ALL_SUBSTRINGS:\n\t        default:\n\t          return this._expandAllSubstringTokens(token);\n\t      }\n\t    }\n\t  }, {\n\t    key: "_expandAllSubstringTokens",\n\t    value: function _expandAllSubstringTokens(token) {\n\t      var expandedTokens = [];\n\t\n\t      // String.prototype.charAt() may return surrogate halves instead of whole characters.\n\t      // When this happens in the context of a web-worker it can cause Chrome to crash.\n\t      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.\n\t      // Resources:\n\t      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt\n\t      // https://mathiasbynens.be/notes/javascript-unicode\n\t      try {\n\t        for (var i = 0, length = token.length; i < length; ++i) {\n\t          var substring = "";\n\t\n\t          for (var j = i; j < length; ++j) {\n\t            substring += token.charAt(j);\n\t            expandedTokens.push(substring);\n\t          }\n\t        }\n\t      } catch (error) {\n\t        console.error("Unable to parse token \\"" + token + "\\" " + error);\n\t      }\n\t\n\t      return expandedTokens;\n\t    }\n\t  }, {\n\t    key: "_expandPrefixTokens",\n\t    value: function _expandPrefixTokens(token) {\n\t      var expandedTokens = [];\n\t\n\t      // String.prototype.charAt() may return surrogate halves instead of whole characters.\n\t      // When this happens in the context of a web-worker it can cause Chrome to crash.\n\t      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.\n\t      // Resources:\n\t      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt\n\t      // https://mathiasbynens.be/notes/javascript-unicode\n\t      try {\n\t        for (var i = 0, length = token.length; i < length; ++i) {\n\t          expandedTokens.push(token.substr(0, i + 1));\n\t        }\n\t      } catch (error) {\n\t        console.error("Unable to parse token \\"" + token + "\\" " + error);\n\t      }\n\t\n\t      return expandedTokens;\n\t    }\n\t\n\t    /**\n\t     * @private\n\t     */\n\t\n\t  }, {\n\t    key: "_sanitize",\n\t    value: function _sanitize(string) {\n\t      return this._caseSensitive ? string.trim() : string.trim().toLocaleLowerCase();\n\t    }\n\t\n\t    /**\n\t     * @private\n\t     */\n\t\n\t  }, {\n\t    key: "_tokenize",\n\t    value: function _tokenize(text) {\n\t      return text.split(this._tokenizePattern).filter(function (text) {\n\t        return text;\n\t      }); // Remove empty tokens\n\t    }\n\t  }]);\n\t\n\t  return SearchUtility;\n\t}();\n\t\n\texports.default = SearchUtility;\n\n/***/ },\n/* 3 */\n/***/ function(module, exports) {\n\n\t"use strict";\n\t\n\tObject.defineProperty(exports, "__esModule", {\n\t  value: true\n\t});\n\tvar INDEX_MODES = exports.INDEX_MODES = {\n\t  // Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").\n\t  // Based on \'all-substrings-index-strategy\' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/all-substrings-index-strategy.ts\n\t  ALL_SUBSTRINGS: "ALL_SUBSTRINGS",\n\t\n\t  // Indexes for exact word matches only.\n\t  // Based on \'exact-word-index-strategy\' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/exact-word-index-strategy.ts\n\t  EXACT_WORDS: "EXACT_WORDS",\n\t\n\t  // Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).\n\t  // Based on \'prefix-index-strategy\' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/prefix-index-strategy.ts\n\t  PREFIXES: "PREFIXES"\n\t};\n\n/***/ },\n/* 4 */\n/***/ function(module, exports) {\n\n\t"use strict";\n\t\n\tObject.defineProperty(exports, "__esModule", {\n\t  value: true\n\t});\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\t\n\t/**\n\t * Maps search tokens to uids using a trie structure.\n\t */\n\tvar SearchIndex = function () {\n\t  function SearchIndex() {\n\t    _classCallCheck(this, SearchIndex);\n\t\n\t    this.tokenToUidMap = {};\n\t  }\n\t\n\t  /**\n\t   * Maps the specified token to a uid.\n\t   *\n\t   * @param token Searchable token (e.g. "road")\n\t   * @param uid Identifies a document within the searchable corpus\n\t   */\n\t\n\t\n\t  _createClass(SearchIndex, [{\n\t    key: "indexDocument",\n\t    value: function indexDocument(token, uid) {\n\t      if (!this.tokenToUidMap[token]) {\n\t        this.tokenToUidMap[token] = {};\n\t      }\n\t\n\t      this.tokenToUidMap[token][uid] = uid;\n\t    }\n\t\n\t    /**\n\t     * Finds uids that have been mapped to the set of tokens specified.\n\t     * Only uids that have been mapped to all tokens will be returned.\n\t     *\n\t     * @param tokens Array of searchable tokens (e.g. ["long", "road"])\n\t     * @param matchAnyToken Whether to match any token. Default is false.\n\t     * @return Array of uids that have been associated with the set of search tokens\n\t     */\n\t\n\t  }, {\n\t    key: "search",\n\t    value: function search(tokens, matchAnyToken) {\n\t      var _this = this;\n\t\n\t      var uidMap = {};\n\t      var uidMatches = {};\n\t      var initialized = false;\n\t\n\t      tokens.forEach(function (token) {\n\t        var currentUidMap = _this.tokenToUidMap[token] || {};\n\t\n\t        if (!initialized) {\n\t          initialized = true;\n\t\n\t          for (var _uid in currentUidMap) {\n\t            uidMap[_uid] = currentUidMap[_uid];\n\t            uidMatches[_uid] = 1;\n\t          }\n\t        } else {\n\t          // Delete existing matches if using and AND query (the default)\n\t          // Otherwise add new results to the matches\n\t          if (!matchAnyToken) {\n\t            for (var _uid2 in uidMap) {\n\t              if (!currentUidMap[_uid2]) {\n\t                delete uidMap[_uid2];\n\t              }\n\t            }\n\t          } else {\n\t            for (var _uid3 in currentUidMap) {\n\t              uidMap[_uid3] = currentUidMap[_uid3];\n\t              uidMatches[_uid3] = (uidMatches[_uid3] || 0) + 1;\n\t            }\n\t          }\n\t        }\n\t      });\n\t\n\t      var uids = [];\n\t      for (var _uid4 in uidMap) {\n\t        uids.push(uidMap[_uid4]);\n\t      }\n\t\n\t      // Sort according to most matches, if match any token is set.\n\t      if (matchAnyToken) {\n\t        uids.sort(function (a, b) {\n\t          return uidMatches[b] - uidMatches[a];\n\t        });\n\t      }\n\t\n\t      return uids;\n\t    }\n\t  }]);\n\t\n\t  return SearchIndex;\n\t}();\n\t\n\texports.default = SearchIndex;\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=5cafaba60d6eb1f43c8f.worker.js.map', __webpack_require__.p + "5cafaba60d6eb1f43c8f.worker.js");
            };
        }, /* 12 */
        /***/
        function(module, exports) {
            // http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
            var URL = window.URL || window.webkitURL;
            module.exports = function(content, url) {
                try {
                    try {
                        var blob;
                        try {
                            // BlobBuilder = Deprecated, but widely implemented
                            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                            blob = new BlobBuilder(), blob.append(content), blob = blob.getBlob();
                        } catch (e) {
                            // The proposed API
                            blob = new Blob([ content ]);
                        }
                        return new Worker(URL.createObjectURL(blob));
                    } catch (e) {
                        return new Worker("data:application/javascript," + encodeURIComponent(content));
                    }
                } catch (e) {
                    if (!url) throw Error("Inline worker is not supported");
                    return new Worker(url);
                }
            };
        } ]);
    }, /* 2 */
    /***/
    function(module, exports) {
        "use strict";
        function defaultSearchStateSelector(state) {
            return state.search;
        }
        function getSearchSelectors(_ref) {
            var filterFunction = _ref.filterFunction, resourceName = _ref.resourceName, resourceSelector = _ref.resourceSelector, _ref$searchStateSelec = _ref.searchStateSelector, searchStateSelector = void 0 === _ref$searchStateSelec ? defaultSearchStateSelector : _ref$searchStateSelec;
            return {
                text: getTextSelector({
                    resourceName: resourceName,
                    searchStateSelector: searchStateSelector
                }),
                result: getResultSelector({
                    filterFunction: filterFunction,
                    resourceName: resourceName,
                    resourceSelector: resourceSelector,
                    searchStateSelector: searchStateSelector
                }),
                unfilteredResult: getUnfilteredResultSelector({
                    resourceName: resourceName,
                    searchStateSelector: searchStateSelector
                })
            };
        }
        function getTextSelector(_ref2) {
            var resourceName = _ref2.resourceName, _ref2$searchStateSele = _ref2.searchStateSelector, searchStateSelector = void 0 === _ref2$searchStateSele ? defaultSearchStateSelector : _ref2$searchStateSele;
            return function(state) {
                return searchStateSelector(state)[resourceName].text;
            };
        }
        function createFilterFunction(resource) {
            return resource.has instanceof Function ? function(id) {
                return resource.has(id);
            } : function(id) {
                return resource[id];
            };
        }
        function getResultSelector(_ref3) {
            var filterFunction = _ref3.filterFunction, resourceName = _ref3.resourceName, resourceSelector = _ref3.resourceSelector, _ref3$searchStateSele = _ref3.searchStateSelector, searchStateSelector = void 0 === _ref3$searchStateSele ? defaultSearchStateSelector : _ref3$searchStateSele, unfilteredResultSelector = getUnfilteredResultSelector({
                resourceName: resourceName,
                searchStateSelector: searchStateSelector
            });
            return function(state) {
                var result = unfilteredResultSelector(state), resource = resourceSelector(resourceName, state);
                return result.filter(filterFunction || createFilterFunction(resource));
            };
        }
        function getUnfilteredResultSelector(_ref4) {
            var resourceName = _ref4.resourceName, _ref4$searchStateSele = _ref4.searchStateSelector, searchStateSelector = void 0 === _ref4$searchStateSele ? defaultSearchStateSelector : _ref4$searchStateSele;
            return function(state) {
                return searchStateSelector(state)[resourceName].result;
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.defaultSearchStateSelector = defaultSearchStateSelector, exports.getSearchSelectors = getSearchSelectors, 
        exports.getTextSelector = getTextSelector, exports.getResultSelector = getResultSelector, 
        exports.getUnfilteredResultSelector = getUnfilteredResultSelector;
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function searchAPI(method) {
            return function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return {
                    type: _constants.SEARCH_API,
                    payload: {
                        method: method,
                        args: args
                    }
                };
            };
        }
        function search(resourceName) {
            return function(text) {
                return {
                    type: _constants.ACTION,
                    payload: {
                        api: performSearch(resourceName, text),
                        action: {
                            type: _constants.SEARCH,
                            payload: {
                                resourceName: resourceName,
                                text: text
                            }
                        }
                    }
                };
            };
        }
        function receiveResult(resourceName) {
            return function(result) {
                return {
                    type: _constants.RECEIVE_RESULT,
                    payload: {
                        resourceName: resourceName,
                        result: result
                    }
                };
            };
        }
        function initializeResources(resourceNames) {
            return {
                type: _constants.INITIALIZE_RESOURCES,
                payload: {
                    resourceNames: resourceNames
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.performSearch = exports.indexResource = exports.defineIndex = void 0, 
        exports.searchAPI = searchAPI, exports.search = search, exports.receiveResult = receiveResult, 
        exports.initializeResources = initializeResources;
        var _constants = __webpack_require__(4), performSearch = (exports.defineIndex = searchAPI("defineIndex"), 
        exports.indexResource = searchAPI("indexResource"), exports.performSearch = searchAPI("performSearch"));
    }, /* 4 */
    /***/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        exports.SEARCH_API = "@@reduxSearch/API", exports.SEARCH_STATE_SELECTOR = "@@reduxSearch/searchStateSelector", 
        exports.ACTION = "@@reduxSearch/action", exports.INITIALIZE_RESOURCES = "@@reduxSearch/initializeResources", 
        exports.RECEIVE_RESULT = "@@reduxSearch/receiveResult", exports.SEARCH = "@@reduxSearch/search";
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function reduxSearch() {
            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$resourceIndexes = _ref.resourceIndexes, resourceIndexes = void 0 === _ref$resourceIndexes ? {} : _ref$resourceIndexes, resourceSelector = _ref.resourceSelector, _ref$searchApi = _ref.searchApi, searchApi = void 0 === _ref$searchApi ? new _SearchApi2.default() : _ref$searchApi, _ref$searchStateSelec = _ref.searchStateSelector, searchStateSelector = void 0 === _ref$searchStateSelec ? _selectors.defaultSearchStateSelector : _ref$searchStateSelec;
            return function(createStore) {
                return function(reducer, initialState) {
                    var store = (0, _redux.applyMiddleware)((0, _searchMiddleware2.default)(searchApi))(createStore)(reducer, initialState);
                    store.search = searchApi, store[_constants.SEARCH_STATE_SELECTOR] = searchStateSelector;
                    var resourceNames = (0, _keys2.default)(resourceIndexes);
                    if (store.dispatch(actions.initializeResources(resourceNames)), searchApi.subscribe(function(_ref2) {
                        var result = _ref2.result, resourceName = _ref2.resourceName;
                        _ref2.text;
                        store.dispatch(actions.receiveResult(resourceName)(result));
                    }, function(error) {
                        throw error;
                    }), resourceSelector) {
                        var currentResources = {};
                        store.subscribe(function() {
                            var nextState = store.getState(), searchState = store[_constants.SEARCH_STATE_SELECTOR](nextState);
                            for (var resourceName in resourceIndexes) {
                                var resource = resourceSelector(resourceName, nextState);
                                if (currentResources[resourceName] !== resource) {
                                    currentResources[resourceName] = resource;
                                    var resourceIndex = resourceIndexes[resourceName], searchString = searchState[resourceName].text;
                                    store.dispatch(actions.indexResource({
                                        fieldNamesOrIndexFunction: resourceIndex,
                                        resourceName: resourceName,
                                        resources: resource,
                                        state: nextState
                                    })), store.dispatch(actions.search(resourceName)(searchString));
                                }
                            }
                        });
                    }
                    return store;
                };
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _keys = __webpack_require__(6), _keys2 = _interopRequireDefault(_keys);
        exports.default = reduxSearch;
        var _redux = __webpack_require__(41), _selectors = __webpack_require__(2), _actions = __webpack_require__(3), actions = _interopRequireWildcard(_actions), _constants = __webpack_require__(4), _searchMiddleware = __webpack_require__(63), _searchMiddleware2 = _interopRequireDefault(_searchMiddleware), _SearchApi = __webpack_require__(87), _SearchApi2 = _interopRequireDefault(_SearchApi);
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(7),
            __esModule: !0
        };
    }, /* 7 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(8), module.exports = __webpack_require__(28).Object.keys;
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 Object.keys(O)
        var toObject = __webpack_require__(9), $keys = __webpack_require__(11);
        __webpack_require__(26)("keys", function() {
            return function(it) {
                return $keys(toObject(it));
            };
        });
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(10);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, /* 10 */
    /***/
    function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(12), enumBugKeys = __webpack_require__(25);
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, /* 12 */
    /***/
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(13), toIObject = __webpack_require__(14), arrayIndexOf = __webpack_require__(17)(!1), IE_PROTO = __webpack_require__(21)("IE_PROTO");
        module.exports = function(object, names) {
            var key, O = toIObject(object), i = 0, result = [];
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, /* 13 */
    /***/
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, /* 14 */
    /***/
    function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(15), defined = __webpack_require__(10);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, /* 15 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(16);
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, /* 16 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(14), toLength = __webpack_require__(18), toIndex = __webpack_require__(20);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var value, O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length);
                // Array#includes uses SameValueZero equality algorithm
                if (IS_INCLUDES && el != el) {
                    for (;length > index; ) if (value = O[index++], value != value) return !0;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, /* 18 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(19), min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, /* 19 */
    /***/
    function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil, floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, /* 20 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(19), max = Math.max, min = Math.min;
        module.exports = function(index, length) {
            return index = toInteger(index), index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(22)("keys"), uid = __webpack_require__(24);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, /* 22 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(23), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, /* 23 */
    /***/
    function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, /* 24 */
    /***/
    function(module, exports) {
        var id = 0, px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, /* 25 */
    /***/
    function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 26 */
    /***/
    function(module, exports, __webpack_require__) {
        // most Object methods by ES6 should accept primitives
        var $export = __webpack_require__(27), core = __webpack_require__(28), fails = __webpack_require__(37);
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
            exp[KEY] = exec(fn), $export($export.S + $export.F * fails(function() {
                fn(1);
            }), "Object", exp);
        };
    }, /* 27 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(23), core = __webpack_require__(28), ctx = __webpack_require__(29), hide = __webpack_require__(31), PROTOTYPE = "prototype", $export = function(type, name, source) {
            var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
            IS_GLOBAL && (source = name);
            for (key in source) // contains in native
            own = !IS_FORCED && target && void 0 !== target[key], own && key in exports || (// export native or passed
            out = own ? target[key] : source[key], // prevent global pollution for namespaces
            exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                return F[PROTOTYPE] = C[PROTOTYPE], F;
            }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
            IS_PROTO && ((exports.virtual || (exports.virtual = {}))[key] = out, // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            type & $export.R && expProto && !expProto[key] && hide(expProto, key, out)));
        };
        // type bitmap
        $export.F = 1, // forced
        $export.G = 2, // global
        $export.S = 4, // static
        $export.P = 8, // proto
        $export.B = 16, // bind
        $export.W = 32, // wrap
        $export.U = 64, // safe
        $export.R = 128, // real proto method for `library` 
        module.exports = $export;
    }, /* 28 */
    /***/
    function(module, exports) {
        var core = module.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = core);
    }, /* 29 */
    /***/
    function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(30);
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, /* 30 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(32), createDesc = __webpack_require__(40);
        module.exports = __webpack_require__(36) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            return object[key] = value, object;
        };
    }, /* 32 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(33), IE8_DOM_DEFINE = __webpack_require__(35), toPrimitive = __webpack_require__(39), dP = Object.defineProperty;
        exports.f = __webpack_require__(36) ? Object.defineProperty : function(O, P, Attributes) {
            if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            return "value" in Attributes && (O[P] = Attributes.value), O;
        };
    }, /* 33 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(34);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, /* 34 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it;
        };
    }, /* 35 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(36) && !__webpack_require__(37)(function() {
            return 7 != Object.defineProperty(__webpack_require__(38)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 36 */
    /***/
    function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(37)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 37 */
    /***/
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return !0;
            }
        };
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(34), document = __webpack_require__(23).document, is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, /* 39 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(34);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 40 */
    /***/
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, /* 41 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            /*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
            function isCrushed() {}
            exports.__esModule = !0, exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = void 0;
            var _createStore = __webpack_require__(43), _createStore2 = _interopRequireDefault(_createStore), _combineReducers = __webpack_require__(58), _combineReducers2 = _interopRequireDefault(_combineReducers), _bindActionCreators = __webpack_require__(60), _bindActionCreators2 = _interopRequireDefault(_bindActionCreators), _applyMiddleware = __webpack_require__(61), _applyMiddleware2 = _interopRequireDefault(_applyMiddleware), _compose = __webpack_require__(62), _compose2 = _interopRequireDefault(_compose), _warning = __webpack_require__(59), _warning2 = _interopRequireDefault(_warning);
            "production" !== process.env.NODE_ENV && "string" == typeof isCrushed.name && "isCrushed" !== isCrushed.name && (0, 
            _warning2.default)("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build."), 
            exports.createStore = _createStore2.default, exports.combineReducers = _combineReducers2.default, 
            exports.bindActionCreators = _bindActionCreators2.default, exports.applyMiddleware = _applyMiddleware2.default, 
            exports.compose = _compose2.default;
        }).call(exports, __webpack_require__(42));
    }, /* 42 */
    /***/
    function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
            return setTimeout(fun, 0);
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
            return clearTimeout(marker);
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        // shim for using process in browser
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", // empty string to avoid regexp issues
        process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, 
        process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, /* 43 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        /**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
        function createStore(reducer, preloadedState, enhancer) {
            function ensureCanMutateNextListeners() {
                nextListeners === currentListeners && (nextListeners = currentListeners.slice());
            }
            /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
            function getState() {
                return currentState;
            }
            /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
            function subscribe(listener) {
                if ("function" != typeof listener) throw new Error("Expected listener to be a function.");
                var isSubscribed = !0;
                return ensureCanMutateNextListeners(), nextListeners.push(listener), function() {
                    if (isSubscribed) {
                        isSubscribed = !1, ensureCanMutateNextListeners();
                        var index = nextListeners.indexOf(listener);
                        nextListeners.splice(index, 1);
                    }
                };
            }
            /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
            function dispatch(action) {
                if (!(0, _isPlainObject2.default)(action)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                if ("undefined" == typeof action.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                if (isDispatching) throw new Error("Reducers may not dispatch actions.");
                try {
                    isDispatching = !0, currentState = currentReducer(currentState, action);
                } finally {
                    isDispatching = !1;
                }
                for (var listeners = currentListeners = nextListeners, i = 0; i < listeners.length; i++) listeners[i]();
                return action;
            }
            /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
            function replaceReducer(nextReducer) {
                if ("function" != typeof nextReducer) throw new Error("Expected the nextReducer to be a function.");
                currentReducer = nextReducer, dispatch({
                    type: ActionTypes.INIT
                });
            }
            /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
            function observable() {
                var _ref, outerSubscribe = subscribe;
                return _ref = {
                    /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
                    subscribe: function(observer) {
                        function observeState() {
                            observer.next && observer.next(getState());
                        }
                        if ("object" != typeof observer) throw new TypeError("Expected the observer to be an object.");
                        observeState();
                        var unsubscribe = outerSubscribe(observeState);
                        return {
                            unsubscribe: unsubscribe
                        };
                    }
                }, _ref[_symbolObservable2.default] = function() {
                    return this;
                }, _ref;
            }
            var _ref2;
            if ("function" == typeof preloadedState && "undefined" == typeof enhancer && (enhancer = preloadedState, 
            preloadedState = void 0), "undefined" != typeof enhancer) {
                if ("function" != typeof enhancer) throw new Error("Expected the enhancer to be a function.");
                return enhancer(createStore)(reducer, preloadedState);
            }
            if ("function" != typeof reducer) throw new Error("Expected the reducer to be a function.");
            var currentReducer = reducer, currentState = preloadedState, currentListeners = [], nextListeners = currentListeners, isDispatching = !1;
            // When a store is created, an "INIT" action is dispatched so that every
            // reducer returns their initial state. This effectively populates
            // the initial state tree.
            return dispatch({
                type: ActionTypes.INIT
            }), _ref2 = {
                dispatch: dispatch,
                subscribe: subscribe,
                getState: getState,
                replaceReducer: replaceReducer
            }, _ref2[_symbolObservable2.default] = observable, _ref2;
        }
        exports.__esModule = !0, exports.ActionTypes = void 0, exports.default = createStore;
        var _isPlainObject = __webpack_require__(44), _isPlainObject2 = _interopRequireDefault(_isPlainObject), _symbolObservable = __webpack_require__(54), _symbolObservable2 = _interopRequireDefault(_symbolObservable), ActionTypes = exports.ActionTypes = {
            INIT: "@@redux/INIT"
        };
    }, /* 44 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
        function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) return !1;
            var proto = getPrototype(value);
            if (null === proto) return !0;
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var baseGetTag = __webpack_require__(45), getPrototype = __webpack_require__(51), isObjectLike = __webpack_require__(53), objectTag = "[object Object]", funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, objectCtorString = funcToString.call(Object);
        module.exports = isPlainObject;
    }, /* 45 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
        function baseGetTag(value) {
            return null == value ? void 0 === value ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
        }
        var Symbol = __webpack_require__(46), getRawTag = __webpack_require__(49), objectToString = __webpack_require__(50), nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol ? Symbol.toStringTag : void 0;
        module.exports = baseGetTag;
    }, /* 46 */
    /***/
    function(module, exports, __webpack_require__) {
        var root = __webpack_require__(47), Symbol = root.Symbol;
        module.exports = Symbol;
    }, /* 47 */
    /***/
    function(module, exports, __webpack_require__) {
        var freeGlobal = __webpack_require__(48), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
        module.exports = root;
    }, /* 48 */
    /***/
    function(module, exports) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /** Detect free variable `global` from Node.js. */
            var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
            module.exports = freeGlobal;
        }).call(exports, function() {
            return this;
        }());
    }, /* 49 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
        function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
                value[symToStringTag] = void 0;
                var unmasked = !0;
            } catch (e) {}
            var result = nativeObjectToString.call(value);
            return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
            result;
        }
        var Symbol = __webpack_require__(46), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
        module.exports = getRawTag;
    }, /* 50 */
    /***/
    function(module, exports) {
        /**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
        function objectToString(value) {
            return nativeObjectToString.call(value);
        }
        /** Used for built-in method references. */
        var objectProto = Object.prototype, nativeObjectToString = objectProto.toString;
        module.exports = objectToString;
    }, /* 51 */
    /***/
    function(module, exports, __webpack_require__) {
        var overArg = __webpack_require__(52), getPrototype = overArg(Object.getPrototypeOf, Object);
        module.exports = getPrototype;
    }, /* 52 */
    /***/
    function(module, exports) {
        /**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg));
            };
        }
        module.exports = overArg;
    }, /* 53 */
    /***/
    function(module, exports) {
        /**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
        function isObjectLike(value) {
            return null != value && "object" == typeof value;
        }
        module.exports = isObjectLike;
    }, /* 54 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(55);
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global, module) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var root, _ponyfill = __webpack_require__(57), _ponyfill2 = _interopRequireDefault(_ponyfill);
            /* global window */
            root = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : module;
            var result = (0, _ponyfill2.default)(root);
            exports.default = result;
        }).call(exports, function() {
            return this;
        }(), __webpack_require__(56)(module));
    }, /* 56 */
    /***/
    function(module, exports) {
        module.exports = function(module) {
            // module.parent = undefined by default
            return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
            module.children = [], module.webpackPolyfill = 1), module;
        };
    }, /* 57 */
    /***/
    function(module, exports) {
        "use strict";
        function symbolObservablePonyfill(root) {
            var result, _Symbol = root.Symbol;
            return "function" == typeof _Symbol ? _Symbol.observable ? result = _Symbol.observable : (result = _Symbol("observable"), 
            _Symbol.observable = result) : result = "@@observable", result;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = symbolObservablePonyfill;
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function getUndefinedStateErrorMessage(key, action) {
                var actionType = action && action.type, actionName = actionType && '"' + actionType.toString() + '"' || "an action";
                return "Given action " + actionName + ', reducer "' + key + '" returned undefined. To ignore an action, you must explicitly return the previous state.';
            }
            function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
                var reducerKeys = Object.keys(reducers), argumentName = action && action.type === _createStore.ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
                if (0 === reducerKeys.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
                if (!(0, _isPlainObject2.default)(inputState)) return "The " + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
                var unexpectedKeys = Object.keys(inputState).filter(function(key) {
                    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
                });
                return unexpectedKeys.forEach(function(key) {
                    unexpectedKeyCache[key] = !0;
                }), unexpectedKeys.length > 0 ? "Unexpected " + (unexpectedKeys.length > 1 ? "keys" : "key") + " " + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.') : void 0;
            }
            function assertReducerSanity(reducers) {
                Object.keys(reducers).forEach(function(key) {
                    var reducer = reducers[key], initialState = reducer(void 0, {
                        type: _createStore.ActionTypes.INIT
                    });
                    if ("undefined" == typeof initialState) throw new Error('Reducer "' + key + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
                    var type = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
                    if ("undefined" == typeof reducer(void 0, {
                        type: type
                    })) throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.");
                });
            }
            /**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
            function combineReducers(reducers) {
                for (var reducerKeys = Object.keys(reducers), finalReducers = {}, i = 0; i < reducerKeys.length; i++) {
                    var key = reducerKeys[i];
                    "production" !== process.env.NODE_ENV && "undefined" == typeof reducers[key] && (0, 
                    _warning2.default)('No reducer provided for key "' + key + '"'), "function" == typeof reducers[key] && (finalReducers[key] = reducers[key]);
                }
                var finalReducerKeys = Object.keys(finalReducers);
                if ("production" !== process.env.NODE_ENV) var unexpectedKeyCache = {};
                var sanityError;
                try {
                    assertReducerSanity(finalReducers);
                } catch (e) {
                    sanityError = e;
                }
                return function() {
                    var state = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], action = arguments[1];
                    if (sanityError) throw sanityError;
                    if ("production" !== process.env.NODE_ENV) {
                        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
                        warningMessage && (0, _warning2.default)(warningMessage);
                    }
                    for (var hasChanged = !1, nextState = {}, i = 0; i < finalReducerKeys.length; i++) {
                        var key = finalReducerKeys[i], reducer = finalReducers[key], previousStateForKey = state[key], nextStateForKey = reducer(previousStateForKey, action);
                        if ("undefined" == typeof nextStateForKey) {
                            var errorMessage = getUndefinedStateErrorMessage(key, action);
                            throw new Error(errorMessage);
                        }
                        nextState[key] = nextStateForKey, hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                    }
                    return hasChanged ? nextState : state;
                };
            }
            exports.__esModule = !0, exports.default = combineReducers;
            var _createStore = __webpack_require__(43), _isPlainObject = __webpack_require__(44), _isPlainObject2 = _interopRequireDefault(_isPlainObject), _warning = __webpack_require__(59), _warning2 = _interopRequireDefault(_warning);
        }).call(exports, __webpack_require__(42));
    }, /* 59 */
    /***/
    function(module, exports) {
        "use strict";
        /**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
        function warning(message) {
            /* eslint-disable no-console */
            "undefined" != typeof console && "function" == typeof console.error && console.error(message);
            /* eslint-enable no-console */
            try {
                // This error was thrown as a convenience so that if you enable
                // "break on all exceptions" in your console,
                // it would pause the execution at this line.
                throw new Error(message);
            } catch (e) {}
        }
        exports.__esModule = !0, exports.default = warning;
    }, /* 60 */
    /***/
    function(module, exports) {
        "use strict";
        function bindActionCreator(actionCreator, dispatch) {
            return function() {
                return dispatch(actionCreator.apply(void 0, arguments));
            };
        }
        /**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
        function bindActionCreators(actionCreators, dispatch) {
            if ("function" == typeof actionCreators) return bindActionCreator(actionCreators, dispatch);
            if ("object" != typeof actionCreators || null === actionCreators) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === actionCreators ? "null" : typeof actionCreators) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
            for (var keys = Object.keys(actionCreators), boundActionCreators = {}, i = 0; i < keys.length; i++) {
                var key = keys[i], actionCreator = actionCreators[key];
                "function" == typeof actionCreator && (boundActionCreators[key] = bindActionCreator(actionCreator, dispatch));
            }
            return boundActionCreators;
        }
        exports.__esModule = !0, exports.default = bindActionCreators;
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        /**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
        function applyMiddleware() {
            for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) middlewares[_key] = arguments[_key];
            return function(createStore) {
                return function(reducer, preloadedState, enhancer) {
                    var store = createStore(reducer, preloadedState, enhancer), _dispatch = store.dispatch, chain = [], middlewareAPI = {
                        getState: store.getState,
                        dispatch: function(action) {
                            return _dispatch(action);
                        }
                    };
                    return chain = middlewares.map(function(middleware) {
                        return middleware(middlewareAPI);
                    }), _dispatch = _compose2.default.apply(void 0, chain)(store.dispatch), _extends({}, store, {
                        dispatch: _dispatch
                    });
                };
            };
        }
        exports.__esModule = !0;
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.default = applyMiddleware;
        var _compose = __webpack_require__(62), _compose2 = _interopRequireDefault(_compose);
    }, /* 62 */
    /***/
    function(module, exports) {
        "use strict";
        /**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
        function compose() {
            for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) funcs[_key] = arguments[_key];
            if (0 === funcs.length) return function(arg) {
                return arg;
            };
            if (1 === funcs.length) return funcs[0];
            var last = funcs[funcs.length - 1], rest = funcs.slice(0, -1);
            return function() {
                return rest.reduceRight(function(composed, f) {
                    return f(composed);
                }, last.apply(void 0, arguments));
            };
        }
        exports.__esModule = !0, exports.default = compose;
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function searchMiddleware(search) {
            return function(_ref) {
                var dispatch = _ref.dispatch;
                return function(next) {
                    return function(action) {
                        var payload = action.payload;
                        if (action.type === _constants.SEARCH_API) {
                            var method = payload.method, args = payload.args;
                            return search[method].apply(search, (0, _toConsumableArray3.default)(args));
                        }
                        return action.type === _constants.ACTION ? (next(payload.action), dispatch(payload.api)) : next(action);
                    };
                };
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _toConsumableArray2 = __webpack_require__(64), _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
        exports.default = searchMiddleware;
        var _constants = __webpack_require__(4);
    }, /* 64 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _from = __webpack_require__(65), _from2 = _interopRequireDefault(_from);
        exports.default = function(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return (0, _from2.default)(arr);
        };
    }, /* 65 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(66),
            __esModule: !0
        };
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(67), __webpack_require__(80), module.exports = __webpack_require__(28).Array.from;
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $at = __webpack_require__(68)(!0);
        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(69)(String, "String", function(iterated) {
            this._t = String(iterated), // target
            this._i = 0;
        }, function() {
            var point, O = this._t, index = this._i;
            return index >= O.length ? {
                value: void 0,
                done: !0
            } : (point = $at(O, index), this._i += point.length, {
                value: point,
                done: !1
            });
        });
    }, /* 68 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(19), defined = __webpack_require__(10);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
                return i < 0 || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i), a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536);
            };
        };
    }, /* 69 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var LIBRARY = __webpack_require__(70), $export = __webpack_require__(27), redefine = __webpack_require__(71), hide = __webpack_require__(31), has = __webpack_require__(13), Iterators = __webpack_require__(72), $iterCreate = __webpack_require__(73), setToStringTag = __webpack_require__(77), getPrototypeOf = __webpack_require__(79), ITERATOR = __webpack_require__(78)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values", returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var methods, key, IteratorPrototype, getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case KEYS:
                    return function() {
                        return new Constructor(this, kind);
                    };

                  case VALUES:
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            }, TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0, $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            if (// Fix native
            $anyNative && (IteratorPrototype = getPrototypeOf($anyNative.call(new Base())), 
            IteratorPrototype !== Object.prototype && (// Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, !0), // fix for some old engines
            LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis))), 
            // fix Array#{values, @@iterator}.name in V8 / FF
            DEF_VALUES && $native && $native.name !== VALUES && (VALUES_BUG = !0, $default = function() {
                return $native.call(this);
            }), // Define iterator
            LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
            // Plug for library
            Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            return methods;
        };
    }, /* 70 */
    /***/
    function(module, exports) {
        module.exports = !0;
    }, /* 71 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(31);
    }, /* 72 */
    /***/
    function(module, exports) {
        module.exports = {};
    }, /* 73 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var create = __webpack_require__(74), descriptor = __webpack_require__(40), setToStringTag = __webpack_require__(77), IteratorPrototype = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(31)(IteratorPrototype, __webpack_require__(78)("iterator"), function() {
            return this;
        }), module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            }), setToStringTag(Constructor, NAME + " Iterator");
        };
    }, /* 74 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(33), dPs = __webpack_require__(75), enumBugKeys = __webpack_require__(25), IE_PROTO = __webpack_require__(21)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype", createDict = function() {
            // Thrash, waste and sodomy: IE GC bug
            var iframeDocument, iframe = __webpack_require__(38)("iframe"), i = enumBugKeys.length, lt = "<", gt = ">";
            for (iframe.style.display = "none", __webpack_require__(76).appendChild(iframe), 
            iframe.src = "javascript:", // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt), 
            iframeDocument.close(), createDict = iframeDocument.F; i--; ) delete createDict[PROTOTYPE][enumBugKeys[i]];
            return createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            // add "__proto__" for Object.getPrototypeOf polyfill
            return null !== O ? (Empty[PROTOTYPE] = anObject(O), result = new Empty(), Empty[PROTOTYPE] = null, 
            result[IE_PROTO] = O) : result = createDict(), void 0 === Properties ? result : dPs(result, Properties);
        };
    }, /* 75 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(32), anObject = __webpack_require__(33), getKeys = __webpack_require__(11);
        module.exports = __webpack_require__(36) ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            for (var P, keys = getKeys(Properties), length = keys.length, i = 0; length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, /* 76 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(23).document && document.documentElement;
    }, /* 77 */
    /***/
    function(module, exports, __webpack_require__) {
        var def = __webpack_require__(32).f, has = __webpack_require__(13), TAG = __webpack_require__(78)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            });
        };
    }, /* 78 */
    /***/
    function(module, exports, __webpack_require__) {
        var store = __webpack_require__(22)("wks"), uid = __webpack_require__(24), Symbol = __webpack_require__(23).Symbol, USE_SYMBOL = "function" == typeof Symbol, $exports = module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
        };
        $exports.store = store;
    }, /* 79 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(13), toObject = __webpack_require__(9), IE_PROTO = __webpack_require__(21)("IE_PROTO"), ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectProto : null;
        };
    }, /* 80 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var ctx = __webpack_require__(29), $export = __webpack_require__(27), toObject = __webpack_require__(9), call = __webpack_require__(81), isArrayIter = __webpack_require__(82), toLength = __webpack_require__(18), createProperty = __webpack_require__(83), getIterFn = __webpack_require__(84);
        $export($export.S + $export.F * !__webpack_require__(86)(function(iter) {
            Array.from(iter);
        }), "Array", {
            // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
            from: function(arrayLike) {
                var length, result, step, iterator, O = toObject(arrayLike), C = "function" == typeof this ? this : Array, aLen = arguments.length, mapfn = aLen > 1 ? arguments[1] : void 0, mapping = void 0 !== mapfn, index = 0, iterFn = getIterFn(O);
                // if object isn't iterable or it's array with default iterator - use simple case
                if (mapping && (mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : void 0, 2)), void 0 == iterFn || C == Array && isArrayIter(iterFn)) for (length = toLength(O.length), 
                result = new C(length); length > index; index++) createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]); else for (iterator = iterFn.call(O), 
                result = new C(); !(step = iterator.next()).done; index++) createProperty(result, index, mapping ? call(iterator, mapfn, [ step.value, index ], !0) : step.value);
                return result.length = index, result;
            }
        });
    }, /* 81 */
    /***/
    function(module, exports, __webpack_require__) {
        // call something on iterator step with safe closing on error
        var anObject = __webpack_require__(33);
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator.return;
                throw void 0 !== ret && anObject(ret.call(iterator)), e;
            }
        };
    }, /* 82 */
    /***/
    function(module, exports, __webpack_require__) {
        // check on default Array iterator
        var Iterators = __webpack_require__(72), ITERATOR = __webpack_require__(78)("iterator"), ArrayProto = Array.prototype;
        module.exports = function(it) {
            return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        };
    }, /* 83 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $defineProperty = __webpack_require__(32), createDesc = __webpack_require__(40);
        module.exports = function(object, index, value) {
            index in object ? $defineProperty.f(object, index, createDesc(0, value)) : object[index] = value;
        };
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(85), ITERATOR = __webpack_require__(78)("iterator"), Iterators = __webpack_require__(72);
        module.exports = __webpack_require__(28).getIteratorMethod = function(it) {
            if (void 0 != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var cof = __webpack_require__(16), TAG = __webpack_require__(78)("toStringTag"), ARG = "Arguments" == cof(function() {
            return arguments;
        }()), tryGet = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        };
        module.exports = function(it) {
            var O, T, B;
            return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = tryGet(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
        };
    }, /* 86 */
    /***/
    function(module, exports, __webpack_require__) {
        var ITERATOR = __webpack_require__(78)("iterator"), SAFE_CLOSING = !1;
        try {
            var riter = [ 7 ][ITERATOR]();
            riter.return = function() {
                SAFE_CLOSING = !0;
            }, Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING) return !1;
            var safe = !1;
            try {
                var arr = [ 7 ], iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = !0
                    };
                }, arr[ITERATOR] = function() {
                    return iter;
                }, exec(arr);
            } catch (e) {}
            return safe;
        };
    }, /* 87 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _regenerator = __webpack_require__(88), _regenerator2 = _interopRequireDefault(_regenerator), _asyncToGenerator2 = __webpack_require__(91), _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2), _classCallCheck2 = __webpack_require__(108), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = __webpack_require__(109), _createClass3 = _interopRequireDefault(_createClass2), _jsWorkerSearch = __webpack_require__(1), _jsWorkerSearch2 = _interopRequireDefault(_jsWorkerSearch), SubscribableSearchApi = function() {
            function SubscribableSearchApi() {
                var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, caseSensitive = _ref.caseSensitive, indexMode = _ref.indexMode, matchAnyToken = _ref.matchAnyToken, tokenizePattern = _ref.tokenizePattern;
                (0, _classCallCheck3.default)(this, SubscribableSearchApi), this._caseSensitive = caseSensitive, 
                this._indexMode = indexMode, this._matchAnyToken = matchAnyToken, this._tokenizePattern = tokenizePattern, 
                this._resourceToSearchMap = {}, this._onErrorSubscribers = [], this._onNextSubscribers = [];
            }
            return (0, _createClass3.default)(SubscribableSearchApi, [ {
                key: "subscribe",
                value: function(onNext, onError) {
                    return this._onNextSubscribers.push(onNext), this._onErrorSubscribers.push(onError), 
                    function() {
                        this._onNextSubscribers = this._onNextSubscribers.filter(function(subscriber) {
                            return subscriber !== onNext;
                        }), this._onErrorSubscribers = this._onErrorSubscribers.filter(function(subscriber) {
                            return subscriber !== onError;
                        });
                    };
                }
            }, {
                key: "indexResource",
                value: function(_ref2) {
                    var fieldNamesOrIndexFunction = _ref2.fieldNamesOrIndexFunction, resourceName = _ref2.resourceName, resources = _ref2.resources, state = _ref2.state, previousSearch = this._resourceToSearchMap[resourceName];
                    void 0 !== previousSearch && previousSearch.terminate();
                    var search = new _jsWorkerSearch2.default({
                        caseSensitive: this._caseSensitive,
                        indexMode: this._indexMode,
                        matchAnyToken: this._matchAnyToken,
                        tokenizePattern: this._tokenizePattern
                    });
                    if (Array.isArray(fieldNamesOrIndexFunction)) if (resources.forEach instanceof Function) resources.forEach(function(resource) {
                        fieldNamesOrIndexFunction.forEach(function(field) {
                            search.indexDocument(resource.id, resource[field] || "");
                        });
                    }); else {
                        var _loop = function() {
                            var resource = resources[key];
                            fieldNamesOrIndexFunction.forEach(function(field) {
                                search.indexDocument(resource.id, resource[field] || "");
                            });
                        };
                        for (var key in resources) _loop();
                    } else {
                        if (!(fieldNamesOrIndexFunction instanceof Function)) throw Error("Expected resource index to be either an Array of fields or an index function");
                        fieldNamesOrIndexFunction({
                            indexDocument: search.indexDocument,
                            resources: resources,
                            state: state
                        });
                    }
                    this._resourceToSearchMap[resourceName] = search;
                }
            }, {
                key: "performSearch",
                value: function() {
                    function performSearch(_x2, _x3) {
                        return _ref3.apply(this, arguments);
                    }
                    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resourceName, text) {
                        var search, result;
                        return _regenerator2.default.wrap(function(_context) {
                            for (;;) switch (_context.prev = _context.next) {
                              case 0:
                                return _context.prev = 0, search = this._resourceToSearchMap[resourceName], _context.next = 4, 
                                search.search(text);

                              case 4:
                                return result = _context.sent, this._notifyNext({
                                    result: result,
                                    text: text,
                                    resourceName: resourceName
                                }), _context.abrupt("return", result);

                              case 9:
                                throw _context.prev = 9, _context.t0 = _context.catch(0), this._notifyError(_context.t0), 
                                _context.t0;

                              case 13:
                              case "end":
                                return _context.stop();
                            }
                        }, _callee, this, [ [ 0, 9 ] ]);
                    }));
                    return performSearch;
                }()
            }, {
                key: "_notifyError",
                value: function(error) {
                    this._onErrorSubscribers.forEach(function(subscriber) {
                        return subscriber(error);
                    });
                }
            }, {
                key: "_notifyNext",
                value: function(data) {
                    this._onNextSubscribers.forEach(function(subscriber) {
                        return subscriber(data);
                    });
                }
            } ]), SubscribableSearchApi;
        }();
        exports.default = SubscribableSearchApi;
    }, /* 88 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(89);
    }, /* 89 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            // This method of obtaining a reference to the global object needs to be
            // kept identical to the way it is obtained in runtime.js
            var g = "object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this, hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0, oldRuntime = hadRuntime && g.regeneratorRuntime;
            if (// Force reevalutation of runtime.js.
            g.regeneratorRuntime = void 0, module.exports = __webpack_require__(90), hadRuntime) // Restore the original runtime.
            g.regeneratorRuntime = oldRuntime; else // Remove the global property added by runtime.js.
            try {
                delete g.regeneratorRuntime;
            } catch (e) {
                g.regeneratorRuntime = void 0;
            }
        }).call(exports, function() {
            return this;
        }());
    }, /* 90 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global, process) {
            /**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
            !function(global) {
                "use strict";
                function wrap(innerFn, outerFn, self, tryLocsList) {
                    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
                    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
                    // The ._invoke method unifies the implementations of the .next,
                    // .throw, and .return methods.
                    return generator._invoke = makeInvokeMethod(innerFn, self, context), generator;
                }
                // Try/catch helper to minimize deoptimizations. Returns a completion
                // record like context.tryEntries[i].completion. This interface could
                // have been (and was previously) designed to take a closure to be
                // invoked without arguments, but in all the cases we care about we
                // already have an existing method we want to call, so there's no need
                // to create a new function object. We can even get away with assuming
                // the method takes exactly one argument, since that happens to be true
                // in every case, so we don't have to touch the arguments object. The
                // only additional allocation required is the completion record, which
                // has a stable shape and so hopefully should be cheap to allocate.
                function tryCatch(fn, obj, arg) {
                    try {
                        return {
                            type: "normal",
                            arg: fn.call(obj, arg)
                        };
                    } catch (err) {
                        return {
                            type: "throw",
                            arg: err
                        };
                    }
                }
                // Dummy constructor functions that we use as the .constructor and
                // .constructor.prototype properties for functions that return Generator
                // objects. For full spec compliance, you may wish to configure your
                // minifier not to mangle the names of these two functions.
                function Generator() {}
                function GeneratorFunction() {}
                function GeneratorFunctionPrototype() {}
                // Helper for defining the .next, .throw, and .return methods of the
                // Iterator interface in terms of a single ._invoke method.
                function defineIteratorMethods(prototype) {
                    [ "next", "throw", "return" ].forEach(function(method) {
                        prototype[method] = function(arg) {
                            return this._invoke(method, arg);
                        };
                    });
                }
                function AsyncIterator(generator) {
                    function invoke(method, arg, resolve, reject) {
                        var record = tryCatch(generator[method], generator, arg);
                        if ("throw" !== record.type) {
                            var result = record.arg, value = result.value;
                            return value && "object" == typeof value && hasOwn.call(value, "__await") ? Promise.resolve(value.__await).then(function(value) {
                                invoke("next", value, resolve, reject);
                            }, function(err) {
                                invoke("throw", err, resolve, reject);
                            }) : Promise.resolve(value).then(function(unwrapped) {
                                // When a yielded Promise is resolved, its final value becomes
                                // the .value of the Promise<{value,done}> result for the
                                // current iteration. If the Promise is rejected, however, the
                                // result for this iteration will be rejected with the same
                                // reason. Note that rejections of yielded Promises are not
                                // thrown back into the generator function, as is the case
                                // when an awaited Promise is rejected. This difference in
                                // behavior between yield and await is important, because it
                                // allows the consumer to decide what to do with the yielded
                                // rejection (swallow it and continue, manually .throw it back
                                // into the generator, abandon iteration, whatever). With
                                // await, by contrast, there is no opportunity to examine the
                                // rejection reason outside the generator function, so the
                                // only option is to throw it from the await expression, and
                                // let the generator function handle the exception.
                                result.value = unwrapped, resolve(result);
                            }, reject);
                        }
                        reject(record.arg);
                    }
                    function enqueue(method, arg) {
                        function callInvokeWithMethodAndArg() {
                            return new Promise(function(resolve, reject) {
                                invoke(method, arg, resolve, reject);
                            });
                        }
                        // If enqueue has been called before, then we want to wait until
                        // all previous Promises have been resolved before calling invoke,
                        // so that results are always delivered in the correct order. If
                        // enqueue has not been called before, then it is important to
                        // call invoke immediately, without waiting on a callback to fire,
                        // so that the async generator function has the opportunity to do
                        // any necessary setup in a predictable way. This predictability
                        // is why the Promise constructor synchronously invokes its
                        // executor callback, and why async functions synchronously
                        // execute code before the first await. Since we implement simple
                        // async functions in terms of async generators, it is especially
                        // important to get this right, even though it requires care.
                        // Avoid propagating failures to Promises returned by later
                        // invocations of the iterator.
                        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                    }
                    "object" == typeof process && process.domain && (invoke = process.domain.bind(invoke));
                    var previousPromise;
                    // Define the unified helper method that is used to implement .next,
                    // .throw, and .return (see defineIteratorMethods).
                    this._invoke = enqueue;
                }
                function makeInvokeMethod(innerFn, self, context) {
                    var state = GenStateSuspendedStart;
                    return function(method, arg) {
                        if (state === GenStateExecuting) throw new Error("Generator is already running");
                        if (state === GenStateCompleted) {
                            if ("throw" === method) throw arg;
                            // Be forgiving, per 25.3.3.3.3 of the spec:
                            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                            return doneResult();
                        }
                        for (context.method = method, context.arg = arg; ;) {
                            var delegate = context.delegate;
                            if (delegate) {
                                var delegateResult = maybeInvokeDelegate(delegate, context);
                                if (delegateResult) {
                                    if (delegateResult === ContinueSentinel) continue;
                                    return delegateResult;
                                }
                            }
                            if ("next" === context.method) // Setting context._sent for legacy support of Babel's
                            // function.sent implementation.
                            context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                                if (state === GenStateSuspendedStart) throw state = GenStateCompleted, context.arg;
                                context.dispatchException(context.arg);
                            } else "return" === context.method && context.abrupt("return", context.arg);
                            state = GenStateExecuting;
                            var record = tryCatch(innerFn, self, context);
                            if ("normal" === record.type) {
                                if (// If an exception is thrown from innerFn, we leave state ===
                                // GenStateExecuting and loop back for another invocation.
                                state = context.done ? GenStateCompleted : GenStateSuspendedYield, record.arg === ContinueSentinel) continue;
                                return {
                                    value: record.arg,
                                    done: context.done
                                };
                            }
                            "throw" === record.type && (state = GenStateCompleted, // Dispatch the exception by looping back around to the
                            // context.dispatchException(context.arg) call above.
                            context.method = "throw", context.arg = record.arg);
                        }
                    };
                }
                // Call delegate.iterator[context.method](context.arg) and handle the
                // result, either by returning a { value, done } result from the
                // delegate iterator, or by modifying context.method and context.arg,
                // setting context.delegate to null, and returning the ContinueSentinel.
                function maybeInvokeDelegate(delegate, context) {
                    var method = delegate.iterator[context.method];
                    if (method === undefined) {
                        if (// A .throw or .return when the delegate iterator has no .throw
                        // method always terminates the yield* loop.
                        context.delegate = null, "throw" === context.method) {
                            if (delegate.iterator.return && (// If the delegate iterator has a return method, give it a
                            // chance to clean up.
                            context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), 
                            "throw" === context.method)) // If maybeInvokeDelegate(context) changed context.method from
                            // "return" to "throw", let that override the TypeError below.
                            return ContinueSentinel;
                            context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
                        }
                        return ContinueSentinel;
                    }
                    var record = tryCatch(method, delegate.iterator, context.arg);
                    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
                    context.delegate = null, ContinueSentinel;
                    var info = record.arg;
                    // Assign the result of the finished delegate to the temporary
                    // variable specified by delegate.resultName (see delegateYield).
                    // Resume execution at the desired location (see delegateYield).
                    // If context.method was "throw" but the delegate handled the
                    // exception, let the outer generator proceed normally. If
                    // context.method was "next", forget context.arg since it has been
                    // "consumed" by the delegate iterator. If context.method was
                    // "return", allow the original .return call to continue in the
                    // outer generator.
                    // The delegate iterator is finished, so forget it and continue with
                    // the outer generator.
                    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
                    "return" !== context.method && (context.method = "next", context.arg = undefined), 
                    context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
                    context.delegate = null, ContinueSentinel);
                }
                function pushTryEntry(locs) {
                    var entry = {
                        tryLoc: locs[0]
                    };
                    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
                    entry.afterLoc = locs[3]), this.tryEntries.push(entry);
                }
                function resetTryEntry(entry) {
                    var record = entry.completion || {};
                    record.type = "normal", delete record.arg, entry.completion = record;
                }
                function Context(tryLocsList) {
                    // The root entry object (effectively a try statement without a catch
                    // or a finally block) gives us a place to store values thrown from
                    // locations where there is no enclosing try statement.
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
                }
                function values(iterable) {
                    if (iterable) {
                        var iteratorMethod = iterable[iteratorSymbol];
                        if (iteratorMethod) return iteratorMethod.call(iterable);
                        if ("function" == typeof iterable.next) return iterable;
                        if (!isNaN(iterable.length)) {
                            var i = -1, next = function next() {
                                for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
                                next.done = !1, next;
                                return next.value = undefined, next.done = !0, next;
                            };
                            return next.next = next;
                        }
                    }
                    // Return an iterator with no values.
                    return {
                        next: doneResult
                    };
                }
                function doneResult() {
                    return {
                        value: undefined,
                        done: !0
                    };
                }
                var undefined, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag", inModule = "object" == typeof module, runtime = global.regeneratorRuntime;
                if (runtime) // Don't bother evaluating the rest of this file if the runtime was
                // already defined globally.
                // If regeneratorRuntime is defined globally and we're in a module,
                // make the exports object identical to regeneratorRuntime.
                return void (inModule && (module.exports = runtime));
                // Define the runtime globally (as expected by generated code) as either
                // module.exports (if we're in a module) or a new, empty object.
                runtime = global.regeneratorRuntime = inModule ? module.exports : {}, runtime.wrap = wrap;
                var GenStateSuspendedStart = "suspendedStart", GenStateSuspendedYield = "suspendedYield", GenStateExecuting = "executing", GenStateCompleted = "completed", ContinueSentinel = {}, IteratorPrototype = {};
                IteratorPrototype[iteratorSymbol] = function() {
                    return this;
                };
                var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
                NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (// This environment has a native %IteratorPrototype%; use it instead
                // of the polyfill.
                IteratorPrototype = NativeIteratorPrototype);
                var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
                GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype, GeneratorFunctionPrototype.constructor = GeneratorFunction, 
                GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction", 
                runtime.isGeneratorFunction = function(genFun) {
                    var ctor = "function" == typeof genFun && genFun.constructor;
                    // For the native GeneratorFunction constructor, the best we can
                    // do is to check its .name property.
                    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
                }, runtime.mark = function(genFun) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
                    toStringTagSymbol in genFun || (genFun[toStringTagSymbol] = "GeneratorFunction")), 
                    genFun.prototype = Object.create(Gp), genFun;
                }, // Within the body of any async function, `await x` is transformed to
                // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
                // `hasOwn.call(value, "__await")` to determine if the yielded value is
                // meant to be awaited.
                runtime.awrap = function(arg) {
                    return {
                        __await: arg
                    };
                }, defineIteratorMethods(AsyncIterator.prototype), runtime.AsyncIterator = AsyncIterator, 
                // Note that simple async functions are implemented on top of
                // AsyncIterator objects; they just return a Promise for the value of
                // the final result produced by the iterator.
                runtime.async = function(innerFn, outerFn, self, tryLocsList) {
                    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
                    return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                        return result.done ? result.value : iter.next();
                    });
                }, // Define Generator.prototype.{next,throw,return} in terms of the
                // unified ._invoke helper method.
                defineIteratorMethods(Gp), Gp[toStringTagSymbol] = "Generator", Gp.toString = function() {
                    return "[object Generator]";
                }, runtime.keys = function(object) {
                    var keys = [];
                    for (var key in object) keys.push(key);
                    // Rather than returning an object with a next method, we keep
                    // things simple and return the next function itself.
                    return keys.reverse(), function next() {
                        for (;keys.length; ) {
                            var key = keys.pop();
                            if (key in object) return next.value = key, next.done = !1, next;
                        }
                        // To avoid creating an additional object, we just hang the .value
                        // and .done properties off the next function object itself. This
                        // also ensures that the minifier will not anonymize the function.
                        return next.done = !0, next;
                    };
                }, runtime.values = values, Context.prototype = {
                    constructor: Context,
                    reset: function(skipTempReset) {
                        if (this.prev = 0, this.next = 0, // Resetting context._sent for legacy support of Babel's
                        // function.sent implementation.
                        this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", 
                        this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) // Not sure about the optimal order of these conditions:
                        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
                    },
                    stop: function() {
                        this.done = !0;
                        var rootEntry = this.tryEntries[0], rootRecord = rootEntry.completion;
                        if ("throw" === rootRecord.type) throw rootRecord.arg;
                        return this.rval;
                    },
                    dispatchException: function(exception) {
                        function handle(loc, caught) {
                            // If the dispatched exception was caught by a catch block,
                            // then let that catch block handle the exception normally.
                            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
                            context.arg = undefined), !!caught;
                        }
                        if (this.done) throw exception;
                        for (var context = this, i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i], record = entry.completion;
                            if ("root" === entry.tryLoc) // Exception thrown outside of any try block that could handle
                            // it, so set the completion value of the entire function to
                            // throw the exception.
                            return handle("end");
                            if (entry.tryLoc <= this.prev) {
                                var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                                if (hasCatch && hasFinally) {
                                    if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                                    if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                                } else if (hasCatch) {
                                    if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                                } else {
                                    if (!hasFinally) throw new Error("try statement without catch or finally");
                                    if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(type, arg) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                                var finallyEntry = entry;
                                break;
                            }
                        }
                        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (// Ignore the finally entry if control is not jumping to a
                        // location outside the try/catch block.
                        finallyEntry = null);
                        var record = finallyEntry ? finallyEntry.completion : {};
                        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
                        this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
                    },
                    complete: function(record, afterLoc) {
                        if ("throw" === record.type) throw record.arg;
                        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
                        this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
                        ContinueSentinel;
                    },
                    finish: function(finallyLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
                            resetTryEntry(entry), ContinueSentinel;
                        }
                    },
                    catch: function(tryLoc) {
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var entry = this.tryEntries[i];
                            if (entry.tryLoc === tryLoc) {
                                var record = entry.completion;
                                if ("throw" === record.type) {
                                    var thrown = record.arg;
                                    resetTryEntry(entry);
                                }
                                return thrown;
                            }
                        }
                        // The context.catch method must only be called with a location
                        // argument that corresponds to a known catch block.
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(iterable, resultName, nextLoc) {
                        // Deliberately forget the last sent value so that we don't
                        // accidentally pass it on to the delegate.
                        return this.delegate = {
                            iterator: values(iterable),
                            resultName: resultName,
                            nextLoc: nextLoc
                        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
                    }
                };
            }(// Among the various tricks for obtaining a reference to the global
            // object, this seems to be the most reliable technique that does not
            // use indirect eval (which violates Content Security Policy).
            "object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this);
        }).call(exports, function() {
            return this;
        }(), __webpack_require__(42));
    }, /* 91 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _promise = __webpack_require__(92), _promise2 = _interopRequireDefault(_promise);
        exports.default = function(fn) {
            return function() {
                var gen = fn.apply(this, arguments);
                return new _promise2.default(function(resolve, reject) {
                    function step(key, arg) {
                        try {
                            var info = gen[key](arg), value = info.value;
                        } catch (error) {
                            return void reject(error);
                        }
                        return info.done ? void resolve(value) : _promise2.default.resolve(value).then(function(value) {
                            step("next", value);
                        }, function(err) {
                            step("throw", err);
                        });
                    }
                    return step("next");
                });
            };
        };
    }, /* 92 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(93),
            __esModule: !0
        };
    }, /* 93 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(94), __webpack_require__(67), __webpack_require__(95), __webpack_require__(99), 
        module.exports = __webpack_require__(28).Promise;
    }, /* 94 */
    /***/
    function(module, exports) {}, /* 95 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(96);
        for (var global = __webpack_require__(23), hide = __webpack_require__(31), Iterators = __webpack_require__(72), TO_STRING_TAG = __webpack_require__(78)("toStringTag"), collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
            var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
            proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array;
        }
    }, /* 96 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var addToUnscopables = __webpack_require__(97), step = __webpack_require__(98), Iterators = __webpack_require__(72), toIObject = __webpack_require__(14);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(69)(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated), // target
            this._i = 0, // next index
            this._k = kind;
        }, function() {
            var O = this._t, kind = this._k, index = this._i++;
            return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == kind ? step(0, index) : "values" == kind ? step(0, O[index]) : step(0, [ index, O[index] ]);
        }, "values"), // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), 
        addToUnscopables("entries");
    }, /* 97 */
    /***/
    function(module, exports) {
        module.exports = function() {};
    }, /* 98 */
    /***/
    function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, /* 99 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var Internal, GenericPromiseCapability, Wrapper, LIBRARY = __webpack_require__(70), global = __webpack_require__(23), ctx = __webpack_require__(29), classof = __webpack_require__(85), $export = __webpack_require__(27), isObject = __webpack_require__(34), aFunction = __webpack_require__(30), anInstance = __webpack_require__(100), forOf = __webpack_require__(101), speciesConstructor = __webpack_require__(102), task = __webpack_require__(103).set, microtask = __webpack_require__(105)(), PROMISE = "Promise", TypeError = global.TypeError, process = global.process, $Promise = global[PROMISE], process = global.process, isNode = "process" == classof(process), empty = function() {}, USE_NATIVE = !!function() {
            try {
                // correct subclassing with @@species support
                var promise = $Promise.resolve(1), FakePromise = (promise.constructor = {})[__webpack_require__(78)("species")] = function(exec) {
                    exec(empty, empty);
                };
                // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
                return (isNode || "function" == typeof PromiseRejectionEvent) && promise.then(empty) instanceof FakePromise;
            } catch (e) {}
        }(), sameConstructor = function(a, b) {
            // with library wrapper special case
            return a === b || a === $Promise && b === Wrapper;
        }, isThenable = function(it) {
            var then;
            return !(!isObject(it) || "function" != typeof (then = it.then)) && then;
        }, newPromiseCapability = function(C) {
            return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
        }, PromiseCapability = GenericPromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
                if (void 0 !== resolve || void 0 !== reject) throw TypeError("Bad Promise constructor");
                resolve = $$resolve, reject = $$reject;
            }), this.resolve = aFunction(resolve), this.reject = aFunction(reject);
        }, perform = function(exec) {
            try {
                exec();
            } catch (e) {
                return {
                    error: e
                };
            }
        }, notify = function(promise, isReject) {
            if (!promise._n) {
                promise._n = !0;
                var chain = promise._c;
                microtask(function() {
                    for (var value = promise._v, ok = 1 == promise._s, i = 0, run = function(reaction) {
                        var result, then, handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject, domain = reaction.domain;
                        try {
                            handler ? (ok || (2 == promise._h && onHandleUnhandled(promise), promise._h = 1), 
                            handler === !0 ? result = value : (domain && domain.enter(), result = handler(value), 
                            domain && domain.exit()), result === reaction.promise ? reject(TypeError("Promise-chain cycle")) : (then = isThenable(result)) ? then.call(result, resolve, reject) : resolve(result)) : reject(value);
                        } catch (e) {
                            reject(e);
                        }
                    }; chain.length > i; ) run(chain[i++]);
                    // variable length - can't use forEach
                    promise._c = [], promise._n = !1, isReject && !promise._h && onUnhandled(promise);
                });
            }
        }, onUnhandled = function(promise) {
            task.call(global, function() {
                var abrupt, handler, console, value = promise._v;
                if (isUnhandled(promise) && (abrupt = perform(function() {
                    isNode ? process.emit("unhandledRejection", value, promise) : (handler = global.onunhandledrejection) ? handler({
                        promise: promise,
                        reason: value
                    }) : (console = global.console) && console.error && console.error("Unhandled promise rejection", value);
                }), // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                promise._h = isNode || isUnhandled(promise) ? 2 : 1), promise._a = void 0, abrupt) throw abrupt.error;
            });
        }, isUnhandled = function(promise) {
            if (1 == promise._h) return !1;
            for (var reaction, chain = promise._a || promise._c, i = 0; chain.length > i; ) if (reaction = chain[i++], 
            reaction.fail || !isUnhandled(reaction.promise)) return !1;
            return !0;
        }, onHandleUnhandled = function(promise) {
            task.call(global, function() {
                var handler;
                isNode ? process.emit("rejectionHandled", promise) : (handler = global.onrejectionhandled) && handler({
                    promise: promise,
                    reason: promise._v
                });
            });
        }, $reject = function(value) {
            var promise = this;
            promise._d || (promise._d = !0, promise = promise._w || promise, // unwrap
            promise._v = value, promise._s = 2, promise._a || (promise._a = promise._c.slice()), 
            notify(promise, !0));
        }, $resolve = function(value) {
            var then, promise = this;
            if (!promise._d) {
                promise._d = !0, promise = promise._w || promise;
                // unwrap
                try {
                    if (promise === value) throw TypeError("Promise can't be resolved itself");
                    (then = isThenable(value)) ? microtask(function() {
                        var wrapper = {
                            _w: promise,
                            _d: !1
                        };
                        // wrap
                        try {
                            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                        } catch (e) {
                            $reject.call(wrapper, e);
                        }
                    }) : (promise._v = value, promise._s = 1, notify(promise, !1));
                } catch (e) {
                    $reject.call({
                        _w: promise,
                        _d: !1
                    }, e);
                }
            }
        };
        // constructor polyfill
        USE_NATIVE || (// 25.4.3.1 Promise(executor)
        $Promise = function(executor) {
            anInstance(this, $Promise, PROMISE, "_h"), aFunction(executor), Internal.call(this);
            try {
                executor(ctx($resolve, this, 1), ctx($reject, this, 1));
            } catch (err) {
                $reject.call(this, err);
            }
        }, Internal = function(executor) {
            this._c = [], // <- awaiting reactions
            this._a = void 0, // <- checked in isUnhandled reactions
            this._s = 0, // <- state
            this._d = !1, // <- done
            this._v = void 0, // <- value
            this._h = 0, // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
            this._n = !1;
        }, Internal.prototype = __webpack_require__(106)($Promise.prototype, {
            // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
            then: function(onFulfilled, onRejected) {
                var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                return reaction.ok = "function" != typeof onFulfilled || onFulfilled, reaction.fail = "function" == typeof onRejected && onRejected, 
                reaction.domain = isNode ? process.domain : void 0, this._c.push(reaction), this._a && this._a.push(reaction), 
                this._s && notify(this, !1), reaction.promise;
            },
            // 25.4.5.1 Promise.prototype.catch(onRejected)
            catch: function(onRejected) {
                return this.then(void 0, onRejected);
            }
        }), PromiseCapability = function() {
            var promise = new Internal();
            this.promise = promise, this.resolve = ctx($resolve, promise, 1), this.reject = ctx($reject, promise, 1);
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Promise: $Promise
        }), __webpack_require__(77)($Promise, PROMISE), __webpack_require__(107)(PROMISE), 
        Wrapper = __webpack_require__(28)[PROMISE], // statics
        $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
            // 25.4.4.5 Promise.reject(r)
            reject: function(r) {
                var capability = newPromiseCapability(this), $$reject = capability.reject;
                return $$reject(r), capability.promise;
            }
        }), $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
            // 25.4.4.6 Promise.resolve(x)
            resolve: function(x) {
                // instanceof instead of internal slot check because we should fix it without replacement native Promise core
                if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
                var capability = newPromiseCapability(this), $$resolve = capability.resolve;
                return $$resolve(x), capability.promise;
            }
        }), $export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function(iter) {
            $Promise.all(iter).catch(empty);
        })), PROMISE, {
            // 25.4.4.1 Promise.all(iterable)
            all: function(iterable) {
                var C = this, capability = newPromiseCapability(C), resolve = capability.resolve, reject = capability.reject, abrupt = perform(function() {
                    var values = [], index = 0, remaining = 1;
                    forOf(iterable, !1, function(promise) {
                        var $index = index++, alreadyCalled = !1;
                        values.push(void 0), remaining++, C.resolve(promise).then(function(value) {
                            alreadyCalled || (alreadyCalled = !0, values[$index] = value, --remaining || resolve(values));
                        }, reject);
                    }), --remaining || resolve(values);
                });
                return abrupt && reject(abrupt.error), capability.promise;
            },
            // 25.4.4.4 Promise.race(iterable)
            race: function(iterable) {
                var C = this, capability = newPromiseCapability(C), reject = capability.reject, abrupt = perform(function() {
                    forOf(iterable, !1, function(promise) {
                        C.resolve(promise).then(capability.resolve, reject);
                    });
                });
                return abrupt && reject(abrupt.error), capability.promise;
            }
        });
    }, /* 100 */
    /***/
    function(module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
            return it;
        };
    }, /* 101 */
    /***/
    function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(29), call = __webpack_require__(81), isArrayIter = __webpack_require__(82), anObject = __webpack_require__(33), toLength = __webpack_require__(18), getIterFn = __webpack_require__(84), BREAK = {}, RETURN = {}, exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
            var length, step, iterator, result, iterFn = ITERATOR ? function() {
                return iterable;
            } : getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0;
            if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
            // fast case for arrays with default iterator
            if (isArrayIter(iterFn)) {
                for (length = toLength(iterable.length); length > index; index++) if (result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]), 
                result === BREAK || result === RETURN) return result;
            } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) if (result = call(iterator, f, step.value, entries), 
            result === BREAK || result === RETURN) return result;
        };
        exports.BREAK = BREAK, exports.RETURN = RETURN;
    }, /* 102 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.3.20 SpeciesConstructor(O, defaultConstructor)
        var anObject = __webpack_require__(33), aFunction = __webpack_require__(30), SPECIES = __webpack_require__(78)("species");
        module.exports = function(O, D) {
            var S, C = anObject(O).constructor;
            return void 0 === C || void 0 == (S = anObject(C)[SPECIES]) ? D : aFunction(S);
        };
    }, /* 103 */
    /***/
    function(module, exports, __webpack_require__) {
        var defer, channel, port, ctx = __webpack_require__(29), invoke = __webpack_require__(104), html = __webpack_require__(76), cel = __webpack_require__(38), global = __webpack_require__(23), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, counter = 0, queue = {}, ONREADYSTATECHANGE = "onreadystatechange", run = function() {
            var id = +this;
            if (queue.hasOwnProperty(id)) {
                var fn = queue[id];
                delete queue[id], fn();
            }
        }, listener = function(event) {
            run.call(event.data);
        };
        // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
        setTask && clearTask || (setTask = function(fn) {
            for (var args = [], i = 1; arguments.length > i; ) args.push(arguments[i++]);
            return queue[++counter] = function() {
                invoke("function" == typeof fn ? fn : Function(fn), args);
            }, defer(counter), counter;
        }, clearTask = function(id) {
            delete queue[id];
        }, // Node.js 0.8-
        "process" == __webpack_require__(16)(process) ? defer = function(id) {
            process.nextTick(ctx(run, id, 1));
        } : MessageChannel ? (channel = new MessageChannel(), port = channel.port2, channel.port1.onmessage = listener, 
        defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(id) {
            global.postMessage(id + "", "*");
        }, global.addEventListener("message", listener, !1)) : defer = ONREADYSTATECHANGE in cel("script") ? function(id) {
            html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
                html.removeChild(this), run.call(id);
            };
        } : function(id) {
            setTimeout(ctx(run, id, 1), 0);
        }), module.exports = {
            set: setTask,
            clear: clearTask
        };
    }, /* 104 */
    /***/
    function(module, exports) {
        // fast apply, http://jsperf.lnkit.com/fast-apply/5
        module.exports = function(fn, args, that) {
            var un = void 0 === that;
            switch (args.length) {
              case 0:
                return un ? fn() : fn.call(that);

              case 1:
                return un ? fn(args[0]) : fn.call(that, args[0]);

              case 2:
                return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

              case 3:
                return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

              case 4:
                return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
            }
            return fn.apply(that, args);
        };
    }, /* 105 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(23), macrotask = __webpack_require__(103).set, Observer = global.MutationObserver || global.WebKitMutationObserver, process = global.process, Promise = global.Promise, isNode = "process" == __webpack_require__(16)(process);
        module.exports = function() {
            var head, last, notify, flush = function() {
                var parent, fn;
                for (isNode && (parent = process.domain) && parent.exit(); head; ) {
                    fn = head.fn, head = head.next;
                    try {
                        fn();
                    } catch (e) {
                        throw head ? notify() : last = void 0, e;
                    }
                }
                last = void 0, parent && parent.enter();
            };
            // Node.js
            if (isNode) notify = function() {
                process.nextTick(flush);
            }; else if (Observer) {
                var toggle = !0, node = document.createTextNode("");
                new Observer(flush).observe(node, {
                    characterData: !0
                }), // eslint-disable-line no-new
                notify = function() {
                    node.data = toggle = !toggle;
                };
            } else if (Promise && Promise.resolve) {
                var promise = Promise.resolve();
                notify = function() {
                    promise.then(flush);
                };
            } else notify = function() {
                // strange IE + webpack dev server bug - use .call(global)
                macrotask.call(global, flush);
            };
            return function(fn) {
                var task = {
                    fn: fn,
                    next: void 0
                };
                last && (last.next = task), head || (head = task, notify()), last = task;
            };
        };
    }, /* 106 */
    /***/
    function(module, exports, __webpack_require__) {
        var hide = __webpack_require__(31);
        module.exports = function(target, src, safe) {
            for (var key in src) safe && target[key] ? target[key] = src[key] : hide(target, key, src[key]);
            return target;
        };
    }, /* 107 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(23), core = __webpack_require__(28), dP = __webpack_require__(32), DESCRIPTORS = __webpack_require__(36), SPECIES = __webpack_require__(78)("species");
        module.exports = function(KEY) {
            var C = "function" == typeof core[KEY] ? core[KEY] : global[KEY];
            DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, /* 108 */
    /***/
    function(module, exports) {
        "use strict";
        exports.__esModule = !0, exports.default = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        };
    }, /* 109 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _defineProperty = __webpack_require__(110), _defineProperty2 = _interopRequireDefault(_defineProperty);
        exports.default = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), (0, _defineProperty2.default)(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
    }, /* 110 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(111),
            __esModule: !0
        };
    }, /* 111 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(112);
        var $Object = __webpack_require__(28).Object;
        module.exports = function(it, key, desc) {
            return $Object.defineProperty(it, key, desc);
        };
    }, /* 112 */
    /***/
    function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(27);
        // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
        $export($export.S + $export.F * !__webpack_require__(36), "Object", {
            defineProperty: __webpack_require__(32).f
        });
    }, /* 113 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function searchReducer() {
            var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, payload = _ref.payload, type = _ref.type;
            return handlers.hasOwnProperty(type) ? handlers[type](state, payload) : state;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.handlers = void 0;
        var _handlers, _defineProperty2 = __webpack_require__(114), _defineProperty3 = _interopRequireDefault(_defineProperty2), _extends4 = __webpack_require__(115), _extends5 = _interopRequireDefault(_extends4);
        exports.default = searchReducer;
        var _constants = __webpack_require__(4), handlers = exports.handlers = (_handlers = {}, 
        (0, _defineProperty3.default)(_handlers, _constants.INITIALIZE_RESOURCES, function(state, _ref2) {
            var resourceNames = _ref2.resourceNames;
            return resourceNames.reduce(function(result, resourceName) {
                return result[resourceName] = {
                    isSearching: !1,
                    result: [],
                    text: ""
                }, result;
            }, (0, _extends5.default)({}, state));
        }), (0, _defineProperty3.default)(_handlers, _constants.RECEIVE_RESULT, function(state, _ref3) {
            var resourceName = _ref3.resourceName, result = _ref3.result;
            return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, resourceName, (0, 
            _extends5.default)({}, state[resourceName], {
                isSearching: !1,
                result: result
            })));
        }), (0, _defineProperty3.default)(_handlers, _constants.SEARCH, function(state, _ref4) {
            var resourceName = _ref4.resourceName, text = _ref4.text;
            return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, resourceName, (0, 
            _extends5.default)({}, state[resourceName], {
                isSearching: !0,
                text: text
            })));
        }), _handlers);
    }, /* 114 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _defineProperty = __webpack_require__(110), _defineProperty2 = _interopRequireDefault(_defineProperty);
        exports.default = function(obj, key, value) {
            return key in obj ? (0, _defineProperty2.default)(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        };
    }, /* 115 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _assign = __webpack_require__(116), _assign2 = _interopRequireDefault(_assign);
        exports.default = _assign2.default || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
    }, /* 116 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(117),
            __esModule: !0
        };
    }, /* 117 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(118), module.exports = __webpack_require__(28).Object.assign;
    }, /* 118 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.3.1 Object.assign(target, source)
        var $export = __webpack_require__(27);
        $export($export.S + $export.F, "Object", {
            assign: __webpack_require__(119)
        });
    }, /* 119 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // 19.1.2.1 Object.assign(target, source, ...)
        var getKeys = __webpack_require__(11), gOPS = __webpack_require__(120), pIE = __webpack_require__(121), toObject = __webpack_require__(9), IObject = __webpack_require__(15), $assign = Object.assign;
        // should work with symbols and should have deterministic property order (V8 bug)
        module.exports = !$assign || __webpack_require__(37)(function() {
            var A = {}, B = {}, S = Symbol(), K = "abcdefghijklmnopqrst";
            return A[S] = 7, K.split("").forEach(function(k) {
                B[k] = k;
            }), 7 != $assign({}, A)[S] || Object.keys($assign({}, B)).join("") != K;
        }) ? function(target, source) {
            for (// eslint-disable-line no-unused-vars
            var T = toObject(target), aLen = arguments.length, index = 1, getSymbols = gOPS.f, isEnum = pIE.f; aLen > index; ) for (var key, S = IObject(arguments[index++]), keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S), length = keys.length, j = 0; length > j; ) isEnum.call(S, key = keys[j++]) && (T[key] = S[key]);
            return T;
        } : $assign;
    }, /* 120 */
    /***/
    function(module, exports) {
        exports.f = Object.getOwnPropertySymbols;
    }, /* 121 */
    /***/
    function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    } ]);
});
//# sourceMappingURL=redux-search.js.map