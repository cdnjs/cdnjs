(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"));
	else
		root["GyreJS"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	// Import sub libraries
	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _store = __webpack_require__(15);

	var _store2 = _interopRequireDefault(_store);

	var _gyresLocalFactory = __webpack_require__(5);

	var _gyresLocalFactory2 = _interopRequireDefault(_gyresLocalFactory);

	var _gyresSmartRestFactory = __webpack_require__(9);

	var _gyresSmartRestFactory2 = _interopRequireDefault(_gyresSmartRestFactory);

	// Middleware

	var _middleWareDispatchLogger = __webpack_require__(13);

	var _middleWareDispatchLogger2 = _interopRequireDefault(_middleWareDispatchLogger);

	var _middleWareInjectDispatch = __webpack_require__(14);

	var _middleWareInjectDispatch2 = _interopRequireDefault(_middleWareInjectDispatch);

	var middleWare = {
	  dispatchLogger: _middleWareDispatchLogger2["default"],
	  injectDispatch: _middleWareInjectDispatch2["default"]
	};

	// Private variables
	var gyres = new Map();
	var store = _store2["default"]();

	// Public functions
	/**
	 * createGyre()
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @param {Object} [options] Options object for gyre.
	 * @returns {Object} Gyre instance.
	 */
	var createGyre = function createGyre(id, options) {
	  if (!gyres.has(id)) {
	    console.warn(">> GyreJS: Gyre factory '" + id + "' not registered.");
	  }

	  return gyres.get(id)(store, Object.assign({}, { NS: id + "-" + Date.now() }, options));
	};

	/**
	 * registerGyreFactory()
	 *
	 * @param {String} id Id of to register gyre.
	 * @param {Function} factory Gyre factory function.
	 * @returns {void}
	 */
	var registerGyreFactory = function registerGyreFactory(id, factory) {
	  gyres.set(id, factory);
	};

	// Register standard gyres
	registerGyreFactory("local", _gyresLocalFactory2["default"]);
	registerGyreFactory("smartRest", _gyresSmartRestFactory2["default"]);

	exports.createGyre = createGyre;
	exports.middleWare = middleWare;
	exports.registerGyreFactory = registerGyreFactory;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _actionHandler = __webpack_require__(4);

	var _actionHandler2 = _interopRequireDefault(_actionHandler);

	/**
	 * gyreFactory()
	 *
	 * @param {Function} Reducer Reducer factory.
	 * @param {Function} ReactHoC React HoC factory.
	 * @param {Function} [actions] Default actions object.
	 * @param {Immutable.Map|Object} [state] Initial state object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory(Reducer, ReactHoC) {
	  var actions = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	  var state = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	  return function (store, options) {
	    // Private variables
	    var AH = _actionHandler2["default"](store, options);

	    // Public functions
	    /**
	     * getReducer() Getter for reducer
	     *
	     * @param {String} matcher Matcher
	     * @param {Function} cb Callback
	     * @returns {Function} Reducer factory
	     */
	    var getReducer = function getReducer(matcher, cb) {
	      return Reducer(store, AH.dispatch, matcher, cb, options);
	    };

	    /**
	     * setState()
	     *
	     * @param {Object|Immutable.Map} tState The state to set to this gyre.
	     * @returns {Immutable.Map} Current store state.
	     */
	    var setState = function setState(tState) {
	      return store.setState(tState, options.NS);
	    };

	    /**
	     * getState()
	     *
	     * @returns {Immutable.Map} Current store state.
	     */
	    var getState = function getState() {
	      return store.getState.get(options.NS);
	    };

	    /**
	     * reactHoC()
	     *
	     * @param {Object} react React instance.
	     * @return {Function} HoC factory function.
	     */
	    var reactHoC = ReactHoC(getReducer);

	    // Setup
	    AH.addActions(actions(options));
	    setState(state);

	    // API
	    return {
	      addAction: AH.addAction,
	      addActions: AH.addActions,
	      dispatch: AH.dispatch,
	      getState: getState,
	      getReducer: getReducer,
	      reactHoC: reactHoC,
	      setState: setState,
	      use: AH.use
	    };
	  };
	};

	exports["default"] = gyreFactory;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * extractEndpoints()
	 *
	 * @param {Object} query Query object.
	 * @returns {Object[]} Array of endpoints.
	 */
	"use strict";

	exports.__esModule = true;
	var extractEndpoints = function extractEndpoints(query) {
	  var marked1$0 = [processQuery].map(regeneratorRuntime.mark);

	  function processQuery(q, root, branch) {
	    var _iterator, _isArray, _i, _ref, i, val, tBranch, rV, _iterator2, _isArray2, _i2, _ref2, idVal;

	    return regeneratorRuntime.wrap(function processQuery$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          _iterator = Object.keys(q), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

	        case 1:
	          if (!_isArray) {
	            context$2$0.next = 7;
	            break;
	          }

	          if (!(_i >= _iterator.length)) {
	            context$2$0.next = 4;
	            break;
	          }

	          return context$2$0.abrupt("break", 36);

	        case 4:
	          _ref = _iterator[_i++];
	          context$2$0.next = 11;
	          break;

	        case 7:
	          _i = _iterator.next();

	          if (!_i.done) {
	            context$2$0.next = 10;
	            break;
	          }

	          return context$2$0.abrupt("break", 36);

	        case 10:
	          _ref = _i.value;

	        case 11:
	          i = _ref;
	          val = q[i];
	          tBranch = branch ? branch.concat([i]) : [i];
	          rV = {
	            name: root ? root + "/" + i : i,
	            branch: tBranch,
	            id: val.id ? val.id : null,
	            fields: val.fields ? val.fields : null
	          };

	          if (!(rV.fields || rV.id && !val.children)) {
	            context$2$0.next = 18;
	            break;
	          }

	          context$2$0.next = 18;
	          return rV;

	        case 18:
	          if (!val.children) {
	            context$2$0.next = 34;
	            break;
	          }

	          _iterator2 = Array.isArray(val.id) ? val.id : [val.id], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();

	        case 20:
	          if (!_isArray2) {
	            context$2$0.next = 26;
	            break;
	          }

	          if (!(_i2 >= _iterator2.length)) {
	            context$2$0.next = 23;
	            break;
	          }

	          return context$2$0.abrupt("break", 34);

	        case 23:
	          _ref2 = _iterator2[_i2++];
	          context$2$0.next = 30;
	          break;

	        case 26:
	          _i2 = _iterator2.next();

	          if (!_i2.done) {
	            context$2$0.next = 29;
	            break;
	          }

	          return context$2$0.abrupt("break", 34);

	        case 29:
	          _ref2 = _i2.value;

	        case 30:
	          idVal = _ref2;
	          return context$2$0.delegateYield(processQuery(val.children, idVal ? i + "/" + idVal : i, tBranch), "t0", 32);

	        case 32:
	          context$2$0.next = 20;
	          break;

	        case 34:
	          context$2$0.next = 1;
	          break;

	        case 36:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, marked1$0[0], this);
	  }

	  var it = processQuery(query);
	  var res = it.next();
	  var urlDefs = [];
	  while (!res.done) {
	    urlDefs.push(res.value);
	    res = it.next();
	  }
	  return urlDefs;
	};

	/**
	 * createUrls()
	 * Creates urls from query
	 *
	 * @param {Object}query Query object.
	 * @returns {String[]} Array of urls.
	 */
	var createUrls = function createUrls(query) {
	  var urlDefs = extractEndpoints(query);
	  return urlDefs.map(function (urlDef) {
	    var urlString = urlDef.name;
	    if (urlDef.hasOwnProperty("id") && urlDef.id !== null) {
	      urlString = urlString + "/" + urlDef.id;
	    }

	    if (Array.isArray(urlDef.fields) && urlDef.fields.length > 0) {
	      urlString = urlString + "?fields=" + urlDef.fields.toString();
	    }

	    return {
	      path: urlString,
	      type: urlDef.branch[urlDef.branch.length - 1],
	      root: urlDef.name
	    };
	  });
	};

	/**
	 * checkStatusAndParse()
	 *
	 * @param {Object} response Fetch response.
	 * @returns {Object} Parsed response.
	 */
	var checkStatusAndParse = function checkStatusAndParse(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response.json().then(function (data) {
	      return {
	        success: true,
	        data: data
	      };
	    });
	  }
	  return new Promise(function (resolve) {
	    return resolve({
	      success: false,
	      msg: response,
	      code: response.status
	    });
	  });
	};

	/**
	 * parse()
	 *
	 * @param {Immutable.Map} endpoint
	 * @returns {*}
	 */
	var transform = function transform(endpoint) {
	  return function (response) {
	    if (response.success) {
	      var _ret = (function () {
	        var rData = Array.isArray(response.data) ? response.data : [response.data];

	        // Get idList and map data
	        var idList = {};
	        var data = {};
	        idList[endpoint.get("root")] = [];
	        data[endpoint.get("type")] = {};

	        rData.forEach(function (entry) {
	          idList[endpoint.get("root")].push(entry.id.toString());
	          data[endpoint.get("type")][entry.id.toString()] = entry;
	        });

	        return {
	          v: {
	            success: true,
	            data: data,
	            idList: idList
	          }
	        };
	      })();

	      if (typeof _ret === "object") return _ret.v;
	    }
	    return response;
	  };
	};

	/**
	 * fetchUrl()
	 *
	 * @param {String} host Endpoint host.
	 * @param {Immutable.Map} endpoint Endpoint options.
	 * @returns {Promise} Promise of fetch.
	 */
	var fetchUrl = function fetchUrl(host, endpoint) {
	  var hostName = host || location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");

	  // Fetch data
	  return fetch(hostName + "/" + endpoint.get("path")).then(checkStatusAndParse).then(transform(endpoint));
	};

	/**
	 * hash()
	 * Simple hash from string
	 *
	 * @param {String} str string
	 * @returns {Number} hash Hash of string.
	 */
	var hash = function hash(str) {
	  var len = str.length;
	  var h = 0;

	  if (str.length === 0) {
	    return h;
	  }
	  for (var i = 0; i < len; i++) {
	    var chr = str.charCodeAt(i);
	    h = (h << 5) - h + chr;
	    h |= 0;
	  }
	  return h;
	};

	/**
	 * hashQueryObject()
	 * Simple query hash from object
	 *
	 * @param {Object} obj Query object
	 * @returns {Number} hash Hash of query.
	 */
	var hashQueryObject = function hashQueryObject(obj) {
	  return hash(JSON.stringify(obj));
	};

	// Helper functions
	var helpers = {
	  createUrls: createUrls,
	  fetchUrl: fetchUrl,
	  hashQueryObject: hashQueryObject
	};
	exports["default"] = helpers;
	module.exports = exports["default"];

	// If it has fields, OR an id and no children, return as endpoint.

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * actionHandler()
	 *
	 * @param {Object} store instance.
	 * @param {Object} options Options object.
	 * @returns {{addAction: Function, dispatch: Function}} API.
	 */
	"use strict";

	exports.__esModule = true;
	var actionHandler = function actionHandler(store, options) {
	  // Private variables
	  var actionMap = new Map();
	  var middleWare = [];

	  // Public functions
	  /**
	   * dispatch()
	   *
	   * @param {String} id Id
	   * @param {Array} args Function arguments.
	   * @returns {void}
	   */
	  var dispatch = function dispatch(id) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (actionMap.has(id)) {
	      // Invoke all registered middleWare before running the final action.
	      middleWare.reduce(function (prev, next) {
	        return function () {
	          return next(options.NS, id, args, prev, dispatch);
	        };
	      }, function () {
	        return actionMap.get(id)(args);
	      })();
	    } else {
	      console.warn(">> GyreJS-'" + options.NS + "'-gyre: Unregistered action dispatched: '" + id + "' with arguments:", args, ". (This is a no-op)");
	    }
	  };

	  /**
	   * addAction()
	   *
	   * @param {String} id Action ID.
	   * @param {Function} func Reducer function.
	   * the actions.
	   * @returns {void}
	   */
	  var addAction = function addAction(id, func) {
	    return actionMap.set(id, function (args) {
	      store.updateState(options.NS, func, args);
	    });
	  };

	  /**
	   * addActions()
	   *
	   * @param {Object} actions Key/func object of actions.
	   * the actions.
	   * @returns {void}
	   */
	  var addActions = function addActions(actions) {
	    Object.keys(actions).forEach(function (action) {
	      addAction(action, actions[action]);
	    });
	  };

	  /**
	   * use()
	   *
	   * @param {Function} mware Middleware function.
	   * @returns {void}
	   */
	  var use = function use(mware) {
	    middleWare.unshift(mware);
	  };

	  // API
	  return {
	    addAction: addAction,
	    addActions: addActions,
	    dispatch: dispatch,
	    use: use
	  };
	};

	exports["default"] = actionHandler;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _gyreFactory = __webpack_require__(2);

	var _gyreFactory2 = _interopRequireDefault(_gyreFactory);

	var _reducer = __webpack_require__(7);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reactHoC = __webpack_require__(6);

	var _reactHoC2 = _interopRequireDefault(_reactHoC);

	exports["default"] = _gyreFactory2["default"](_reducer2["default"], _reactHoC2["default"]);
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Higher order Component factory for local gyre.
	 *
	 * @param {Function} reducer Reducer factory.
	 * @returns {Function} HoC Factory.
	 */
	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var localHoCFactory = function localHoCFactory(reducer) {
	  /**
	   * localHoC()
	   *
	   * @param {String} matcher Matcher.
	   * @param {Object} DefaultComponent Default component.
	   * @param {*} initialData Initial state.
	   * @returns {Object} React class
	   */
	  return function (matcher, DefaultComponent) {
	    return React.createClass({
	      displayName: "GyreJS-localHoC",
	      getInitialState: function getInitialState() {
	        return {
	          data: null
	        };
	      },
	      componentWillMount: function componentWillMount() {
	        this.unRegisterReducer = reducer(matcher, this.handleNewData);
	      },
	      shouldComponentUpdate: function shouldComponentUpdate(nextState) {
	        return this.state.data !== nextState.data;
	      },
	      componentWillUnmount: function componentWillUnmount() {
	        this.unRegisterReducer();
	      },
	      handleNewData: function handleNewData(data) {
	        this.setState({
	          data: data
	        });
	      },
	      render: function render() {
	        return typeof this.state.data !== "undefined" ? React.createElement(DefaultComponent, _extends({}, this.props, this.state.data)) : false;
	      }
	    });
	  };
	};

	exports["default"] = localHoCFactory;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * reducer()
	 *
	 * @param {Object} store Store instance
	 * @param {Function} dispatch Dispatch
	 * @param {Array|String} matcher Matcher
	 * @param {Function} cb Callback
	 * @param {Object} options Options object.
	 * @returns {Function} Un-register function
	 */
	"use strict";

	exports.__esModule = true;
	var reducer = function reducer(store, dispatch, matcher, cb, options) {
	  // Private functions
	  var update = function update(stateVar) {
	    var state = stateVar.get(options.NS);
	    var matchValue = Array.isArray(matcher) ? matcher : [matcher];

	    if (state) {
	      cb(matchValue.reduce(function (memo, val) {
	        memo[val] = state.get(val);
	        return memo;
	      }, {}));
	    } else {
	      cb(void 0);
	    }
	  };

	  // Return the un-register function right away.
	  return store.addReducer(update);
	};

	exports["default"] = reducer;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _helpers = __webpack_require__(3);

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var IMap = _immutable2["default"].Map;
	var IList = _immutable2["default"].List;

	// Status constants
	var STATUS_COMPLETED = "COMPLETED";
	var STATUS_LOADING = "LOADING";
	// const STATUS_CREATING = "CREATING";
	var STATUS_UPDATING = "UPDATING";
	// const STATUS_REMOVING = "REMOVING";
	var STATUS_ERROR = "ERROR";

	// Actions
	var actions = {};
	var ADD_QUERY = "ADD_QUERY";
	var FETCH_QUERY = "FETCH_QUERY";
	var COMPLETE_QUERY = "COMPLETE_QUERY";
	var FAIL_QUERY = "FAIL_QUERY";
	var CREATE = "CREATE";

	/*
	const UPDATE = "UPDATE";
	const DELETE = "DELETE";
	*/

	// Misc
	var newQuery = IMap({
	  status: null,
	  count: 0
	});

	exports["default"] = function (_ref) {
	  var hostname = _ref.hostname;

	  /**
	   * Action: ADD_QUERY
	   *
	   * @param state
	   * @param query
	   * @param hash
	   * @param dispatch
	   */
	  actions[ADD_QUERY] = function (state, query, hash, dispatch) {
	    return state.reduce(function (memo, value, key) {
	      if (key === "queries") {
	        memo = memo.set("queries", value.set(hash, newQuery.merge(value.get(hash)).merge({
	          hash: hash,
	          urls: _helpers.createUrls(query)
	        }).map(function (qvVal, qvKey) {
	          switch (qvKey) {
	            case "count":
	              {
	                return qvVal + 1;
	              }
	            case "status":
	              {
	                return qvVal === STATUS_COMPLETED ? STATUS_UPDATING : qvVal;
	              }
	            default:
	              return qvVal;
	          }
	        })).map(function (qVal, qKey) {
	          if (qKey === hash) {
	            if ([STATUS_LOADING, STATUS_UPDATING].indexOf(qVal.get("status")) === -1) {
	              dispatch(FETCH_QUERY, qVal);
	            }
	          }
	          return qVal.set("status", qVal.get("status") || STATUS_LOADING);
	        }));
	      }
	      return memo;
	    }, state);
	  };

	  /**
	   * Action: FETCH_QUERY
	   *
	   * @param state
	   * @param query
	   * @param dispatch
	   */
	  actions[FETCH_QUERY] = function (state, query, dispatch) {
	    // Fetch urls
	    var promiseArray = query.get("urls").map(function (endpoint) {
	      return _helpers.fetchUrl(hostname, endpoint);
	    });

	    Promise.all(promiseArray).then(function (resultArray) {
	      var fetchResult = resultArray.reduce(function (memo, _ref2) {
	        var success = _ref2.success;
	        var msg = _ref2.msg;

	        if (!success) {
	          memo.success = false;
	          memo.msgList = memo.msgList.push(msg);
	        }
	        return memo;
	      }, { success: true, msgList: IList([]) });

	      if (fetchResult.success) {
	        dispatch(COMPLETE_QUERY, resultArray, query);
	      } else {
	        dispatch(FAIL_QUERY, fetchResult.msgList, query);
	      }
	    })["catch"](function (error) {
	      dispatch(FAIL_QUERY, [error], query);
	    });
	  };

	  /**
	   * Action: COMPLETE_QUERY
	   *
	   * @param state
	   * @param resultArray
	   * @param query
	   */
	  actions[COMPLETE_QUERY] = function (state, resultArray, query) {
	    return state.reduce(function (memo, value, key) {
	      if (key === "queries") {
	        memo = memo.set("queries", value.map(function (qr, ky) {
	          var qry = qr;

	          if (ky === query.get("hash")) {
	            qry = qry.merge({
	              "status": STATUS_COMPLETED,
	              "idList": resultArray.reduce(function (prev, next) {
	                return prev.merge(next.idList);
	              }, IMap({}))
	            });
	          }
	          return qry;
	        }));
	      }

	      if (key === "data") {
	        memo = memo.set("data", resultArray.reduce(function (prev, result) {
	          return prev.mergeDeep(result.data);
	        }, memo.get("data")));
	      }

	      return memo;
	    }, state);
	  };

	  /**
	   * Action: FAIL_QUERY
	   *
	   * @param state
	   * @param msgList
	   * @param query
	   */
	  actions[FAIL_QUERY] = function (state, msgList, query) {
	    return state.reduce(function (memo, value, key) {
	      if (key === "queries") {
	        memo = memo.set("queries", value.map(function (qr, ky) {
	          var qry = qr;

	          if (ky === query.get("hash")) {
	            qry = qry.merge({
	              "status": STATUS_ERROR,
	              "msg": msgList
	            });
	          }
	          return qry;
	        }));
	      }

	      return memo;
	    }, state);
	  };

	  actions[CREATE] = function (state, type, data) {
	    return state.reduce(function (memo, value, key) {
	      if (key === "data") {
	        var id = Date.now();
	        memo = memo.setIn(["data", type, id], _immutable2["default"].fromJS(data));
	      }
	      return memo;
	    }, state);
	  };

	  return actions;
	};

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _gyreFactory = __webpack_require__(2);

	var _gyreFactory2 = _interopRequireDefault(_gyreFactory);

	var _reducer = __webpack_require__(11);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reactHoC = __webpack_require__(10);

	var _reactHoC2 = _interopRequireDefault(_reactHoC);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	var _state = __webpack_require__(12);

	var _state2 = _interopRequireDefault(_state);

	exports["default"] = _gyreFactory2["default"](_reducer2["default"], _reactHoC2["default"], _actions2["default"], _state2["default"]);
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	/**
	 * Higher order Component factory for local gyre.
	 *
	 * @param {Function} reducer Reducer factory.
	 * @returns {Function} HoC Factory.
	 */
	var reactHoCFactory = function reactHoCFactory(reducer) {
	  /**
	   * reactHoC()
	   *
	   * @param {String} matcher Matcher.
	   * @param {Object} DefaultComponent Default component.
	   * @param {Object} LoadingComponent Loading component.
	   * @param {Object} ErrorComponent Error component.
	   * @returns {Object} React class
	   */
	  return function (matcher, DefaultComponent, LoadingComponent, ErrorComponent) {
	    return React.createClass({
	      displayName: "GyreJS-localHoC",
	      getInitialState: function getInitialState() {
	        return {
	          data: null
	        };
	      },
	      componentWillMount: function componentWillMount() {
	        this.unRegisterReducer = reducer(matcher, this.handleNewData);
	      },
	      shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        if (this.state.status !== nextState.status) {
	          return true;
	        }

	        if (nextState.data) {
	          return !_immutable2["default"].is(nextState.data, this.state.data);
	        }
	        return true;
	      },
	      componentWillUnmount: function componentWillUnmount() {
	        this.unRegisterReducer();
	      },
	      handleNewData: function handleNewData(status, data) {
	        this.setState({
	          data: data,
	          status: status
	        });
	      },
	      render: function render() {
	        // Render wrapped component with current props and state as props.
	        if (!this.state || !this.state.status) {
	          return false;
	        }

	        var Component = undefined;
	        switch (this.state.status) {
	          case "LOADING":
	            {
	              Component = LoadingComponent;
	              break;
	            }
	          case "ERROR":
	            {
	              Component = ErrorComponent;
	              break;
	            }
	          default:
	            {
	              Component = DefaultComponent;
	            }
	        }
	        return Component ? React.createElement(Component, _extends({}, this.props, this.state)) : false;
	      }
	    });
	  };
	};

	exports["default"] = reactHoCFactory;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _helpers = __webpack_require__(3);

	var IMap = _immutable2["default"].Map;

	/**
	 * reducer()
	 *
	 * @param {Object} store Store instance
	 * @param {Function} dispatch Dispatch
	 * @param {Array|String} matcher Matcher
	 * @param {Function} cb Callback
	 * @param {Object} NS NameSpace from Options object.
	 * @returns {Function} Un-register function
	 */
	var reducer = function reducer(store, dispatch, matcher, cb, _ref) {
	  var NS = _ref.NS;

	  var queryHash = _helpers.hashQueryObject(matcher);

	  var update = function update(state) {
	    var queryResult = state.getIn([NS, "queries", queryHash, "idList"]);
	    var queryInfo = state.getIn([NS, "queries", queryHash]);

	    if (queryResult) {
	      cb(queryInfo.get("status"), queryResult.reduce(function (mm, value, key) {
	        var memo = mm;

	        // Create path
	        var path = key.split("/").reduce(function (mem, val, index) {
	          if (index % 2 === 0 && index) {
	            mem.push("children");
	          }
	          mem.push(val);
	          return mem;
	        }, []);

	        // Add to reducer result
	        var type = key.split("/");
	        type = type[type.length - 1];
	        value.forEach(function (val) {
	          memo = memo.mergeDeepIn(path.concat(val), state.getIn([NS, "data", type, val]));
	        });

	        return memo;
	      }, IMap({})));
	    } else {
	      cb(queryInfo.get("status"));
	    }
	  };

	  // Emit action to add query
	  dispatch("ADD_QUERY", matcher, queryHash);

	  // Return the un-register function right away.
	  return store.addReducer(update);
	};

	exports["default"] = reducer;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var IMap = _immutable2["default"].Map;

	exports["default"] = IMap({
	  queries: IMap({}),
	  data: IMap({})
	});
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * dispatchLogger()
	 *
	 * @param {String} nameSpace Gyre namespace.
	 * @param {String} id Action Id.
	 * @param {Array} args Action arguments array.
	 * @param {Function} next Call next function in chain.
	 * @returns {void}
	 */
	"use strict";

	exports.__esModule = true;
	var dispatchLogger = function dispatchLogger(nameSpace, id, args, next) {
	  console.log(">> GyreJS-'" + nameSpace + "'-gyre: Applying action '" + id + "' with arguments: ", args);
	  next();
	};

	exports["default"] = dispatchLogger;
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * injectDispatch()
	 *
	 * @param {String} nameSpace Gyre namespace.
	 * @param {String} id Action Id.
	 * @param {Array} args Action arguments array.
	 * @param {Function} next Call next function in chain.
	 * @param {Function} dispatch Action handler dispatcher.
	 * @returns {void}
	 */
	"use strict";

	exports.__esModule = true;
	var injectDispatch = function injectDispatch(nameSpace, id, args, next, dispatch) {
	  args.push(dispatch);
	  next();
	};

	exports["default"] = injectDispatch;
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var IMap = _immutable2["default"].Map;

	/**
	 * Store() Factory function
	 *
	 * @returns {{addReducer: Function, getState: Function, setState: Function, updateState: Function}} API
	 */
	var store = function store() {
	  // Private variables
	  var state = IMap({});
	  var reducerList = [];

	  // Private functions
	  /**
	   * Send update to all registered reducers
	   *
	   * @returns {void}
	   */
	  var sendUpdate = function sendUpdate() {
	    return reducerList.forEach(function (reducer) {
	      return reducer(state);
	    });
	  };

	  /**
	   * removeReducer() - Factory
	   * Remove reducer from the store
	   *
	   * @param {Function} cb Reducer callback.
	   * @returns {Function} removal function.
	   */
	  var removeReducer = function removeReducer(cb) {
	    return function () {
	      return reducerList = reducerList.filter(function (reducer) {
	        return reducer !== cb;
	      });
	    };
	  };

	  /**
	   * setState() Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {Immutable.Map} newState New state.
	   * @param {String} nameSpace Namespace.
	   * @returns {Immutable.Map} state Current state
	   */
	  var setNewState = function setNewState(newState, nameSpace) {
	    if (state.get(nameSpace) !== newState) {
	      state = state.set(nameSpace, newState);
	      sendUpdate();
	    }
	    return state;
	  };

	  // Public functions
	  /**
	   * Register a faucet with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @returns {Function} un-register function.
	   */
	  var addReducer = function addReducer(cb) {
	    // Save to local register
	    reducerList.push(cb);

	    // Send state to reducer
	    cb(state);

	    // Return remover
	    return removeReducer(cb);
	  };

	  /**
	   * getState() returns the current state.
	   *
	   * @returns {Immutable.Map} Current state
	   */
	  var getState = function getState() {
	    return state;
	  };

	  /**
	   * setState()
	   *
	   * @param {Immutable.Map|Object} nState State.
	   * @param {String} [nameSpace] Namespace.
	   * @returns {Immutable.Map} New state.
	   */
	  var setState = function setState(nState, nameSpace) {
	    return setNewState(IMap.isMap(nState) ? nState : IMap(nState), nameSpace);
	  };

	  /**
	   * updateState() applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   *
	   * @param {String} nameSpace Namespace.
	   * @param {Function} func Reducer function.
	   * @param {Array} args Reducer function arguments.
	   * @returns {Immutable.Map} state New state.
	   */
	  var updateState = function updateState(nameSpace, func, args) {
	    setNewState(func.apply(undefined, [state.get(nameSpace)].concat(args)) || state.get(nameSpace), nameSpace);
	    return state;
	  };

	  // API
	  return {
	    addReducer: addReducer,
	    getState: getState,
	    setState: setState,
	    updateState: updateState
	  };
	};

	exports["default"] = store;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;