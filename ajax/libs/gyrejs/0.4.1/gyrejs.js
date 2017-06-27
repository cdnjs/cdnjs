(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory();
	else
		root["GyreJS"] = factory();
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

	"use strict";

	var _main = __webpack_require__(11);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _main2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Reducer factory
	 *
	 * @param {Object|Function} reducer Reducer object or function.
	 * @returns {{applyEvent, initialValue: Function}} Reducer API.
	 */

	var _initialValue = function _initialValue(reducer) {
	  return typeof reducer === "function" ? reducer(void 0, { type: null }) : reducer.initialState();
	};

	var _applyEvent = function _applyEvent(reducer) {
	  if (typeof reducer === "function") {
	    return function (state, evt) {
	      return evt.type === "__RESET__" ? _initialValue(reducer) : reducer(state, evt);
	    };
	  }
	  return function (state, evt) {
	    // Reset returns the initial value of the reducer.
	    if (evt.type === "__RESET__") {
	      return _initialValue(reducer);
	    }

	    // If there is a direct match between the event type and specified events; use that.
	    if (typeof reducer.events[evt.type] === "function") {
	      return reducer.events[evt.type](state, evt);
	    }

	    // If no match has been found yet, check for events specified as regex.
	    for (var i = 0; i < Object.keys(reducer.events).length; i++) {
	      var evtName = Object.keys(reducer.events)[i];
	      var re = new RegExp(evtName);

	      if (evt.type.match(re)) {
	        return reducer.events[evtName](state, evt);
	      }
	    }
	    return state;
	  };
	};

	module.exports = function (reducer) {
	  return {
	    applyEvent: function applyEvent() {
	      return _applyEvent(reducer).apply(undefined, arguments);
	    },
	    initialValue: function initialValue() {
	      return _initialValue(reducer);
	    }
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _aggregates = __webpack_require__(3);

	var _aggregates2 = _interopRequireDefault(_aggregates);

	var _reducers = __webpack_require__(1);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isEqual = __webpack_require__(13);

	var AggregateCache = function AggregateCache(_internal, _ref) {
	  var _ref$cacheSize = _ref.cacheSize;
	  var cacheSize = _ref$cacheSize === undefined ? 5 : _ref$cacheSize;

	  var aggregates = {};
	  var cache = {};

	  _internal.getAggregates = function () {
	    return aggregates;
	  };

	  var addAggregate = function addAggregate(id, aggregateDefinition, replace) {
	    if (!Object.prototype.hasOwnProperty.call(aggregates, id) || replace) {
	      var aggDef = Object.assign({}, aggregateDefinition);
	      aggDef.reducer = (0, _reducers2.default)(aggregateDefinition.reducer);
	      aggregates[id] = (0, _aggregates2.default)(_internal, aggDef);
	    } else {
	      console.warn(">> GyreJS-gyre: addAggregate -> Aggregate with id: '" + id + "' already exists."); // eslint-disable-line no-console
	    }
	  };

	  var getAggregate = function getAggregate(id) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    // Check if aggregate factory exists
	    if (!Object.prototype.hasOwnProperty.call(aggregates, id)) {
	      return null;
	    }

	    // Check cache
	    if (Object.prototype.hasOwnProperty.call(cache, id)) {
	      var cacheIndex = null;
	      cache[id].aggregatorOptions.forEach(function (aggOption, index) {
	        if (isEqual(aggOption, options)) {
	          cacheIndex = index;
	        }
	      });

	      // Found
	      if (cacheIndex !== null) {
	        // Move instance to top
	        cache[id].aggregatorOptions.splice(0, 0, cache[id].aggregatorOptions.splice(cacheIndex, 1)[0]);
	        cache[id].aggregatorInstances.splice(0, 0, cache[id].aggregatorInstances.splice(cacheIndex, 1)[0]);

	        // Return instance but bring it up to date first
	        return cache[id].aggregatorInstances[0].__update();
	      }
	    }

	    // Not in cache, instantiate aggregate
	    var aggregate = aggregates[id](options);

	    // If no cache exists already for this type of aggregate, create it.
	    if (!Object.prototype.hasOwnProperty.call(cache, id)) {
	      cache[id] = {
	        aggregatorOptions: [],
	        aggregatorInstances: []
	      };
	    }

	    // Add aggregate instance to the top.
	    cache[id].aggregatorOptions.unshift(options);
	    cache[id].aggregatorInstances.unshift(aggregate);

	    // If cache becomes too large, remove last entry.
	    if (cache[id].aggregatorOptions.length > cacheSize && cacheSize >= 0) {
	      cache[id].aggregatorOptions.pop();
	      cache[id].aggregatorInstances.pop();
	    }

	    return aggregate;
	  };

	  return {
	    addAggregate: addAggregate,
	    getAggregate: getAggregate
	  };
	};

	exports.default = AggregateCache;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var aggregateFactory = function aggregateFactory(_internal, _ref) {
	  var reducer = _ref.reducer;
	  var eventFilter = _ref.eventFilter;
	  var _ref$methods = _ref.methods;
	  var methods = _ref$methods === undefined ? {} : _ref$methods;
	  return function (options) {
	    var API = {};
	    var state = reducer.initialValue();
	    var evtOffset = 0;

	    /**
	     *
	     * @param evt
	     */
	    var applyEvent = function applyEvent(evt) {
	      state = reducer.applyEvent(state, evt);
	    };

	    /**
	     *
	     * @param id
	     * @param args
	     */
	    var trigger = function trigger(id) {
	      var _internal$dispatcher;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      (_internal$dispatcher = _internal.dispatcher).triggerEvent.apply(_internal$dispatcher, [id].concat(args));
	    };

	    var getEventsFromBus = function getEventsFromBus() {
	      var events = _internal.bus.getEvents(evtOffset);
	      evtOffset += events.length;

	      if (eventFilter) {
	        events = events.filter(function (event) {
	          // Always allow reset event
	          if (event.type === "__RESET__") {
	            return true;
	          }

	          // Support string (single event)
	          if (typeof eventFilter === "string" || typeof eventFilter === "number") {
	            return event.type === eventFilter;
	          }

	          // Support filter functions
	          if (typeof eventFilter === "function") {
	            return eventFilter(event);
	          }

	          // Support array of strings. Should be exact match
	          if (Array.isArray(eventFilter)) {
	            return eventFilter.indexOf(event.type) !== -1;
	          }

	          // Support regex
	          if (eventFilter instanceof RegExp) {
	            return event.type.match(eventFilter);
	          }
	          return true;
	        });
	      }

	      // Allow filtering by attribute. E.g.: Useful for aggregates for a single model.
	      if (options.attributeFilter && options.attributeFilter.attributeName && options.attributeFilter.value) {
	        (function () {
	          var _options$attributeFil = options.attributeFilter;
	          var attributeName = _options$attributeFil.attributeName;
	          var value = _options$attributeFil.value;

	          events = events.filter(function (event) {
	            if (Object.prototype.hasOwnProperty.call(event, attributeName)) {
	              // Support string (single event)
	              if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
	                return event[attributeName] === value;
	              }

	              // Support filter functions
	              if (typeof value === "function") {
	                return value(event[attributeName]);
	              }

	              // Support array of strings. Should be exact match
	              if (Array.isArray(value)) {
	                return value.indexOf(event[attributeName]) !== -1;
	              }

	              // Support regex
	              if (value instanceof RegExp) {
	                return event[attributeName].match(value);
	              }
	            }
	            return true;
	          });
	        })();
	      }
	      return events;
	    };

	    var update = function update() {
	      getEventsFromBus().forEach(function (evt) {
	        return applyEvent(evt);
	      });
	      return API;
	    };

	    /*
	     Setup
	     */
	    update();

	    // Methods for internal use
	    Object.defineProperty(API, "__update", {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: update
	    });

	    // Bind provided methods to aggregate
	    Object.keys(methods).reduce(function (prev, key) {
	      prev[key] = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        methods[key].apply(null, [state, { trigger: trigger, issue: _internal.dispatcher.issue }].concat(args, [options]));
	      };
	      return prev;
	    }, API);

	    return API;
	  };
	};

	exports.default = aggregateFactory;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var busFactory = function busFactory(_ref) {
	  var volatile = _ref.volatile;

	  var newEvents = [];
	  var eventList = [];
	  var projections = [];

	  /**
	   * Send update to all registered selectors.
	   *
	   * @param {Function} [cb] Specific callback to solely invoke.
	   * @returns {Function} sendUpdate function for a namespace.
	   */
	  var sendUpdate = function sendUpdate(cb) {
	    // After new evnets processed, concat to eventlist
	    eventList = eventList.concat(newEvents);

	    if (typeof cb === "function") {
	      eventList.forEach(function (event) {
	        return cb(event);
	      });
	    } else {
	      newEvents.forEach(function (event) {
	        projections.forEach(function (projection) {
	          return projection(event);
	        });
	      });
	      newEvents = [];
	    }
	  };

	  /**
	   * Remove selector from the store
	   *
	   * @param {Function} cb Selector callback.
	   * @returns {Function} removal function.
	   */
	  var removeProjection = function removeProjection(cb) {
	    return function () {
	      return projections.splice(projections.indexOf(cb), 1);
	    };
	  };

	  /**
	   * Register a selector with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @param {Boolean} playAll Play all existing events to this topology.
	   * @returns {Function} un-register function.
	   */
	  var addProjection = function addProjection(cb, playAll) {
	    // Save to local register
	    projections.push(cb);

	    if (playAll) {
	      sendUpdate(cb);
	    }

	    // Return function to remove selector from store.
	    return removeProjection(cb);
	  };

	  /**
	   * Triggers an event on the bus.
	   *
	   * @param {Object} evt Event.
	   * @returns {Object}
	   */
	  var trigger = function trigger(evt) {
	    if (!volatile) {
	      newEvents.push(evt);
	    }
	    sendUpdate();
	    return evt;
	  };

	  /**
	   * @returns {Array} Array of events.
	   */
	  var getEvents = function getEvents() {
	    var offset = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    return eventList.concat(newEvents).slice(offset);
	  };

	  return {
	    addProjection: addProjection,
	    getEvents: getEvents,
	    trigger: trigger
	  };
	};

	exports.default = busFactory;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Create commands and events
	 * @param {Object} aggregateCache Object containing the aggregates.
	 * @param {Object} dispatcher Dispatcher instance.
	 * @param {Function} fetch Fetch instance.
	 * @returns {Function} Command factory function.
	 */
	var commandFactory = function commandFactory(_internal) {
	  var aggregateCache = _internal.aggregateCache;
	  var dispatcher = _internal.dispatcher;
	  var getAggregate = aggregateCache.getAggregate;

	  /**
	   * @param {Function|String} func Command function or aggregate method name.
	   * @param {String} [id] Aggregate method name.
	   * @returns {Object} Command object
	   */

	  return function (func, id) {
	    /**
	     * Allow direct method calling on aggregates.
	     * Assumes a 1:1 mapping of command name -> aggregate method.
	     */
	    if (typeof func === "string" || Array.isArray(func)) {
	      return function () {
	        var aName = Array.isArray(func) ? func[0] : func;
	        var options = Array.isArray(func) && func.length > 1 ? func[1] : void 0;

	        var aggregate = getAggregate(aName, options);
	        if (!aggregate) {
	          throw new Error("GyreJS (Command): Cannot find aggregate " + aName + "; needed for command " + id);
	        }
	        if (Object.prototype.hasOwnProperty.call(aggregate, id) && typeof aggregate[id] === "function") {
	          return aggregate[id].apply(aggregate, arguments);
	        }
	        throw new Error("GyreJS (addCommand): Method " + func + " does not exist on aggregate " + id);
	      };
	    }

	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return func.apply(null, [{
	        getAggregate: getAggregate,
	        issue: dispatcher.issueCommand,
	        trigger: dispatcher.triggerEvent,
	        fetch: _internal.fetch || function () {
	          throw new Error("GyreJS: Fetch not defined globally. You may need a polyfill if you'd like to call fetch from the command handlers.");
	        }
	      }].concat(args));
	    };
	  };
	};

	exports.default = commandFactory;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dispatcherFactory = function dispatcherFactory(_internal, commands, events) {
	  /*
	    Public
	   */
	  var triggerEvent = function triggerEvent(evtId) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (typeof events[evtId] !== "function") {
	      console.error("GyreJS [" + _internal.id + "] (triggerEvent): Event " + evtId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    return _internal.bus.trigger(events[evtId].apply(events, args));
	  };

	  var issueCommand = function issueCommand(cmdId) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    if (typeof commands[cmdId] !== "function") {
	      console.error("GyreJS [" + _internal.id + "] (issueCommand): Command " + cmdId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    commands[cmdId].apply(commands, args);
	    return true;
	  };

	  var getEventInstance = function getEventInstance(evtId) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    if (typeof events[evtId] !== "function") {
	      console.error("GyreJS [" + _internal.id + "] (getEventInstance): Event " + evtId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    return events[evtId].apply(events, args);
	  };

	  return {
	    getEventInstance: getEventInstance,
	    issueCommand: issueCommand,
	    triggerEvent: triggerEvent
	  };
	};

	exports.default = dispatcherFactory;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Create events
	 * @param {String} id Id of event.
	 * @param {Function} func Event factory function.
	 * @returns {Function|Array} Event factory function.
	 */
	var eventFactory = function eventFactory(id, func) {
	  return(
	    /**
	     * @param {Object} values Properties
	     * @returns {Object} Event object
	     */
	    function () {
	      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	        values[_key] = arguments[_key];
	      }

	      if (typeof func === "function") {
	        return Object.freeze(Object.assign({}, func.apply(undefined, values), { type: id }));
	      }

	      // Assume func is an array
	      if (values.length > func.length) {
	        throw new Error("GyreJS (Event creation): instantiated event \n        " + id + " is provided more values (" + values.length + ") \n        than configured (" + func.length + ").");
	      }
	      var eventProperties = values.reduce(function (obj, value, index) {
	        obj[func[index]] = value;
	        return obj;
	      }, {});
	      return Object.freeze(Object.assign({}, eventProperties, { type: id }));
	    }
	  );
	};

	exports.default = eventFactory;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _bus = __webpack_require__(4);

	var _bus2 = _interopRequireDefault(_bus);

	var _dispatcher = __webpack_require__(6);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _commands2 = __webpack_require__(5);

	var _commands3 = _interopRequireDefault(_commands2);

	var _events2 = __webpack_require__(7);

	var _events3 = _interopRequireDefault(_events2);

	var _listeners = __webpack_require__(9);

	var _listeners2 = _interopRequireDefault(_listeners);

	var _aggregateCache = __webpack_require__(2);

	var _aggregateCache2 = _interopRequireDefault(_aggregateCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Gyre Factory
	 *
	 * @param {String} [id] Gyre ID.
	 * @param {Object} [commands] Commands object.
	 * @param {Object} [events] Events object.
	 * @param {Object} [aggregates] Aggregates object.
	 * @param {Object} [projections] Projections object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var id = _ref.id;
	  var _ref$commands = _ref.commands;
	  var commands = _ref$commands === undefined ? {} : _ref$commands;
	  var _ref$events = _ref.events;
	  var events = _ref$events === undefined ? {} : _ref$events;
	  var _ref$aggregates = _ref.aggregates;
	  var aggregates = _ref$aggregates === undefined ? {} : _ref$aggregates;
	  var _ref$projections = _ref.projections;
	  var projections = _ref$projections === undefined ? {} : _ref$projections;
	  return function (options) {
	    // Private variables
	    var API = {};
	    var _commands = {};
	    var _events = {};

	    // Id error checking
	    if (typeof id !== "string") {
	      throw new Error("GyreJS: Gyre should be instantiated with a valid 'id' (string).");
	    }

	    // Gyre internal instances
	    var _internal = {};
	    _internal.bus = (0, _bus2.default)(options.volatile || true);
	    _internal.dispatcher = (0, _dispatcher2.default)(_internal, _commands, _events);
	    _internal.listenerHandler = (0, _listeners2.default)(_internal);
	    _internal.aggregateCache = (0, _aggregateCache2.default)(_internal, options.aggregateCache || {});
	    _internal.id = id;
	    _internal.getCommands = function () {
	      return _commands;
	    };
	    _internal.getEvents = function () {
	      return _events;
	    };
	    _internal.fetch = fetch;
	    var commandFactory = (0, _commands3.default)(_internal);

	    // Public methods
	    /**
	     *
	     * @type {Function}
	     */
	    var addCommand = function addCommand(cId, cFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_commands, cId) || replace) {
	        _commands[cId] = commandFactory(cFunction, cId);
	      } else {
	        console.warn(">> GyreJS-gyre: AddCommand -> Selector with id: '" + cId + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addCommands = API.addCommands = function (commandsObj, replace) {
	      if ((typeof commandsObj === "undefined" ? "undefined" : _typeof(commandsObj)) !== "object") {
	        throw new Error("GyreJS (addSelectors): first argument (selectors) should be an object.");
	      }

	      Object.keys(commandsObj).forEach(function (command) {
	        addCommand(command, commandsObj[command], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addEvent = function addEvent(eId, eFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_events, eId) || replace) {
	        _events[eId] = (0, _events3.default)(eId, eFunction);
	      } else {
	        console.warn(">> GyreJS-gyre: addEvent -> Selector with id: '" + eId + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addEvents = API.addEvents = function (eventsObj, replace) {
	      if ((typeof eventsObj === "undefined" ? "undefined" : _typeof(eventsObj)) !== "object") {
	        throw new Error("GyreJS (addEvents): first argument (selectors) should be an object.");
	      }

	      Object.keys(eventsObj).forEach(function (event) {
	        addEvent(event, eventsObj[event], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addAggregate = function addAggregate() {
	      var _internal$aggregateCa;

	      (_internal$aggregateCa = _internal.aggregateCache).addAggregate.apply(_internal$aggregateCa, arguments);
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addAggregates = API.addAggregates = function (aggregatesObj, replace) {
	      if ((typeof aggregatesObj === "undefined" ? "undefined" : _typeof(aggregatesObj)) !== "object") {
	        throw new Error("GyreJS (addEvents): first argument (selectors) should be an object.");
	      }

	      Object.keys(aggregatesObj).forEach(function (aId) {
	        if (!aggregatesObj[aId].name) {
	          aggregatesObj[aId].name = aId;
	        }
	        addAggregate(aId, aggregatesObj[aId], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addProjection = function addProjection() {
	      var _internal$listenerHan;

	      return (_internal$listenerHan = _internal.listenerHandler).addProjection.apply(_internal$listenerHan, arguments) && API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addProjections = API.addProjections = function (projectionsObj, replace) {
	      if ((typeof projectionsObj === "undefined" ? "undefined" : _typeof(projectionsObj)) !== "object") {
	        throw new Error("GyreJS (addProjections): first argument should be an object.");
	      }

	      Object.keys(projectionsObj).forEach(function (pId) {
	        if (!projectionsObj[pId].name) {
	          projectionsObj[pId].name = pId;
	        }
	        addProjection(pId, projectionsObj[pId], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var removeProjection = API.removeProjection = function (pId) {
	      return _internal.listenerHandler.removeProjection(pId);
	    };

	    /**
	     *
	     * @param lId
	     * @param callback
	     * @returns {Function}
	     */
	    var addListener = function addListener(lId, callback) {
	      return _internal.listenerHandler.addListener(lId, callback);
	    };

	    /**
	     *
	     * @param pId
	     * @returns {*}
	     */
	    var value = function value(pId) {
	      return _internal.listenerHandler.getProjection(pId).getState();
	    };

	    /**
	     * Issue a registered command.
	     *
	     * @param {Array} args Arguments.
	     * @returns {Object} API Chainable gyre instance.
	     */
	    var issue = function issue() {
	      var _internal$dispatcher;

	      (_internal$dispatcher = _internal.dispatcher).issueCommand.apply(_internal$dispatcher, arguments);
	      return API;
	    };

	    /**
	     * Trigger a registered event.
	     *
	     * @param {Array} args Arguments.
	     * @returns {Object} API Chainable gyre instance.
	     */
	    var trigger = function trigger() {
	      var _internal$dispatcher2;

	      (_internal$dispatcher2 = _internal.dispatcher).triggerEvent.apply(_internal$dispatcher2, arguments);
	      return API;
	    };

	    // Setup
	    addCommands(commands);
	    addEvents(events);
	    addAggregates(aggregates);
	    addProjections(projections);

	    // Gyre API
	    Object.assign(API, {
	      addCommands: addCommands,
	      addEvents: addEvents,
	      addAggregates: addAggregates,
	      addProjections: addProjections,
	      removeProjection: removeProjection,
	      addListener: addListener,
	      value: value,
	      issue: issue,
	      trigger: trigger
	    });

	    // being explicit
	    Object.defineProperty(API, "_internal", {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: _internal
	    });

	    return Object.freeze(API);
	  };
	};

	exports.default = gyreFactory;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reducers = __webpack_require__(1);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _projections = __webpack_require__(10);

	var _projections2 = _interopRequireDefault(_projections);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ListenerHandler = function ListenerHandler(_internal) {
	  var listeners = function () {
	    var list = {};

	    return {
	      get: function get(id) {
	        return !list.hasOwnProperty(id) ? (list[id] = []) && list[id] : list[id];
	      },
	      getAll: function getAll() {
	        return list;
	      }
	    };
	  }();
	  var projections = {};

	  _internal.getProjections = function () {
	    return projections;
	  };
	  _internal.getListeners = function () {
	    return listeners.getAll();
	  };

	  /**
	   * Send update to all registered selectors.
	   *
	   * @param {String} id Id of projection.
	   * @param {Function} [cb] Specific callback to solely invoke.
	   * @returns {Function} sendUpdate function for a namespace.
	   */
	  var sendUpdate = function sendUpdate(id, cb) {
	    return cb ? cb(projections[id].getState()) : listeners.get(id).forEach(function (listener) {
	      return listener(projections[id].getState());
	    });
	  };

	  /**
	   *
	   * @type {Function}
	   */
	  var addProjection = function addProjection(id, reducer, replace) {
	    // TODO: check for function or object. If object, should have initial state and events properties.
	    if (!Object.prototype.hasOwnProperty.call(projections, id) || replace) {
	      projections[id] = (0, _projections2.default)(_internal, (0, _reducers2.default)(reducer), function () {
	        _internal.listenerHandler.sendUpdate(id);
	      });
	    } else {
	      console.warn(">> GyreJS-gyre: addProjection -> Projection with id: '" + id + "' already exists."); // eslint-disable-line no-console
	    }
	  };

	  var getProjection = function getProjection(id) {
	    return projections[id];
	  };

	  /**
	   *
	   * @type {Function}
	   */
	  var removeProjection = function removeProjection(id) {
	    if (!projections.hasOwnProperty(id)) {
	      console.warn(">> GyreJS: (removeProjection) A projection with id:'" + id + "' is not registered."); // eslint-disable-line no-console
	      return false;
	    }

	    if (projections[id].destroy(id)) {
	      delete projections[id];
	      return true;
	    }
	    return false;
	  };

	  /**
	   * Remove selector from the store
	   *
	   * @param {String} id Id of projection.
	   * @param {Function} cb Selector callback.
	   * @returns {Function} removal function.
	   */
	  var removeListener = function removeListener(id, cb) {
	    return function () {
	      return listeners.get(id).splice(listeners.get(id).indexOf(cb), 1);
	    };
	  };

	  /**
	   * Register a selector with the store and send initial data.
	   *
	   * @param {String} id Id of projection.
	   * @param {Function} cb callback.
	   * @returns {Function} un-register function.
	   */
	  var addListener = function addListener(id, cb) {
	    if (!projections.hasOwnProperty(id)) {
	      console.warn(">> GyreJS: (addListener) A projection with id:'" + id + "' is not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    if (typeof cb !== "function") {
	      throw new Error("GyreJS (addListener): The second argument, callback, should be a function.");
	    }

	    // Save to local register
	    listeners.get(id).push(cb);

	    // Request update to make sure the new filter gets data asap.
	    sendUpdate(id, cb);

	    // Return function to remove selector from store.
	    return removeListener(id, cb);
	  };

	  return {
	    addListener: addListener,
	    addProjection: addProjection,
	    getProjection: getProjection,
	    removeProjection: removeProjection,
	    sendUpdate: sendUpdate
	  };
	};

	exports.default = ListenerHandler;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Projection factory
	 *
	 * @param {Object} _internal Object with gyre internal instances.
	 * @param {Function} reducer Object
	 * @param {Function} notifyStateUpdate Listener update callback.
	 * @returns {{addSelector: Function, getState: Function, setState: Function, setTicker: Function, update: Function}} API
	 */
	var projectionFactory = function projectionFactory(_internal, reducer, notifyStateUpdate) {
	  // Private variables
	  var state = reducer.initialValue();

	  /**
	   * Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {*} newState New state.
	   * @returns {*} state Current state
	   */
	  var setNewState = function setNewState(newState) {
	    state = newState;
	    notifyStateUpdate(state);
	  };

	  // Public methods
	  /**
	   * Applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   * If nothing is returned, the original state is kept.
	   *
	   * @param {String} evt Event name.
	   * @returns {Object} state New state.
	   */
	  var update = function update(evt) {
	    return setNewState(reducer.applyEvent(state, evt));
	  };

	  /**
	   *
	   * @type {Function}
	   */
	  var destroy = function (removeProjectionFromBus) {
	    return function () {
	      return removeProjectionFromBus() && true;
	    };
	  }(_internal.bus.addProjection(update, true));

	  return {
	    destroy: destroy,
	    update: update,
	    getState: function getState() {
	      return state;
	    }
	  };
	};

	exports.default = projectionFactory;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _gyres = __webpack_require__(8);

	var _gyres2 = _interopRequireDefault(_gyres);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createGyre = function createGyre(definition) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if ((typeof definition === "undefined" ? "undefined" : _typeof(definition)) !== "object") {
	    throw new Error("GyreJS (createGyre): First argument should be an object containing the gyre definition.");
	  }

	  return (0, _gyres2.default)(Object.assign({}, definition))(options);
	};

	module.exports = {
	  createGyre: createGyre
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module), (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var keys = __webpack_require__(14),
	    root = __webpack_require__(12);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);

	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent,
	 *  else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

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
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isEqual;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    stringTag = '[object String]';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf,
	    nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

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
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;