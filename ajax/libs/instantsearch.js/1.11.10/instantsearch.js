(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["instantsearch"] = factory();
	else
		root["instantsearch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _main = __webpack_require__(1);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = _main2.default; // we need to export using commonjs for ease of usage in all
	// JavaScript environments
	
	/* eslint-disable import/no-commonjs */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	var _toFactory = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"to-factory\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _toFactory2 = _interopRequireDefault(_toFactory);
	
	var _algoliasearchHelper = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"algoliasearch-helper\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);
	
	var _InstantSearch = __webpack_require__(4);
	
	var _InstantSearch2 = _interopRequireDefault(_InstantSearch);
	
	var _version = __webpack_require__(131);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _index = __webpack_require__(151);
	
	var connectors = _interopRequireWildcard(_index);
	
	var _index2 = __webpack_require__(221);
	
	var widgets = _interopRequireWildcard(_index2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @typedef {Object} UrlSyncOptions
	 * @property {Object} [mapping] Object used to define replacement query
	 * parameter to use in place of another. Keys are current query parameters
	 * and value the new value, e.g. `{ q: 'query' }`.
	 * @property {number} [threshold] Idle time in ms after which a new
	 * state is created in the browser history. The default value is 700. The url is always updated at each keystroke
	 * but we only create a "previous search state" (activated when click on back button) every 700ms of idle time.
	 * @property {string[]} [trackedParameters] Parameters that will
	 * be synchronized in the URL. Default value is `['query', 'attribute:*',
	 * 'index', 'page', 'hitsPerPage']`. `attribute:*` means all the faceting attributes will be tracked. You
	 * can track only some of them by using [..., 'attribute:color', 'attribute:categories']. All other possible
	 * values are all the [attributes of the Helper SearchParameters](https://community.algolia.com/algoliasearch-helper-js/reference.html#searchparameters).
	 *
	 * There's a special `is_v` parameter that will get added everytime, it tracks the version of instantsearch.js
	 * linked to the url.
	 * @property {boolean} [useHash] If set to true, the url will be
	 * hash based. Otherwise, it'll use the query parameters using the modern
	 * history API.
	 * @property {function} [getHistoryState] Pass this function to override the
	 * default history API state we set to `null`. For example this could be used to force passing
	 * {turbolinks: true} to the history API every time we update it.
	 */
	
	/**
	 * @typedef {Object} InstantSearchOptions
	 * @property {string} appId The Algolia application ID
	 * @property {string} apiKey The Algolia search-only API key
	 * @property {string} indexName The name of the main index
	 * @property {string} [numberLocale] The locale used to display numbers. This will be passed
	 * to [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
	 * @property {function} [searchFunction] A hook that will be called each time a search needs to be done, with the
	 * helper as a parameter. It's your responsibility to call helper.search(). This option allows you to avoid doing
	 * searches at page load for example.
	 * @property  {function} [createAlgoliaClient] Allows you to provide your own algolia client instead of
	 * the one instantiated internally by instantsearch.js. Useful in situations where you need
	 * to setup complex mechanism on the client or if you need to share it easily.
	 * Usage:
	 * ```javascript
	 * instantsearch({
	 *   // other parameters
	 *   createAlgoliaClient: function(algoliasearch, appId, apiKey) {
	 *     return anyCustomClient;
	 *   }
	 * });
	 * ```
	 * We forward `algoliasearch` which is the original algoliasearch module imported inside instantsearch.js
	 * @property {object} [searchParameters] Additional parameters to pass to
	 * the Algolia API.
	 * [Full documentation](https://community.algolia.com/algoliasearch-helper-js/reference.html#searchparameters)
	 * @property {boolean|UrlSyncOptions} [urlSync] Url synchronization configuration.
	 * Setting to `true` will synchronize the needed search parameters with the browser url.
	 */
	
	/**
	 * InstantSearch is the main component of InstantSearch.js. This object
	 * manages the widget and let you add new ones.
	 *
	 * Three parameters are required to get you started with instantsearch.js:
	 *  - `appId`: your algolia application id
	 *  - `apiKey`: the search key associated with your application
	 *  - `indexName`: the main index that you will use for your new search UI
	 *
	 * Those parameters can be found in your [Algolia dashboard](https://www.algolia.com/api-keys).
	 * If you want to get up and running quickly with InstantSearch.js, have a
	 * look at the [getting started](getting-started.html).
	 *
	 * @function instantsearch
	 * @param {InstantSearchOptions} $0 The options
	 * @return {InstantSearch} the instantsearch instance
	 */
	/** @module module:instantsearch */
	/**
	 * @external SearchParameters
	 * @see https://community.algolia.com/algoliasearch-helper-js/reference.html#searchparameters
	 */
	// required for browsers not supporting Object.freeze (helper requirement)
	var instantsearch = Object.assign((0, _toFactory2.default)(_InstantSearch2.default), {
	  createQueryString: _algoliasearchHelper2.default.url.getQueryStringFromState,
	  connectors: connectors,
	  widgets: widgets,
	  version: _version2.default
	});
	
	// required for IE <= 10 since move to babel6
	exports.default = instantsearch;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/es-shims/es5-shim/blob/bf48788c724f255275a801a371c4a3adc304b34c/es5-sham.js#L473
	// Object.freeze is used in various places in our code and is not polyfilled by
	// polyfill.io (because not doable): https://github.com/Financial-Times/polyfill-service/issues/232
	// So we "sham" it, which means that the API is here but it just returns the object.
	if (!Object.freeze) {
	  Object.freeze = function freeze(object) {
	    if (Object(object) !== object) {
	      throw new TypeError('Object.freeze can only be called on Objects.');
	    }
	    // this is misleading and breaks feature-detection, but
	    // allows "securable" code to "gracefully" degrade to working
	    // but insecure code.
	    return object;
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/* eslint-disable */
	
	// FIX IE <= 10 babel6:
	// - https://phabricator.babeljs.io/T3041
	// - https://phabricator.babeljs.io/T3041#70671
	var testObject = {};
	
	if (!(Object.setPrototypeOf || testObject.__proto__)) {
	  (function () {
	    var nativeGetPrototypeOf = Object.getPrototypeOf;
	
	    Object.getPrototypeOf = function (object) {
	      if (object.__proto__) {
	        return object.__proto__;
	      } else {
	        return nativeGetPrototypeOf.call(Object, object);
	      }
	    };
	  })();
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _algoliasearchLite = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"algoliasearch/src/browser/builds/algoliasearchLite.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _algoliasearchLite2 = _interopRequireDefault(_algoliasearchLite);
	
	var _algoliasearchHelper = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"algoliasearch-helper\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);
	
	var _forEach = __webpack_require__(5);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _mergeWith = __webpack_require__(43);
	
	var _mergeWith2 = _interopRequireDefault(_mergeWith);
	
	var _union = __webpack_require__(110);
	
	var _union2 = _interopRequireDefault(_union);
	
	var _isPlainObject = __webpack_require__(94);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _events = __webpack_require__(129);
	
	var _urlSync = __webpack_require__(130);
	
	var _urlSync2 = _interopRequireDefault(_urlSync);
	
	var _version = __webpack_require__(131);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _createHelpers = __webpack_require__(150);
	
	var _createHelpers2 = _interopRequireDefault(_createHelpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // we use the fullpath to the lite build to solve a meteor.js issue:
	// https://github.com/algolia/instantsearch.js/issues/1024#issuecomment-221618284
	
	
	function defaultCreateURL() {
	  return '#';
	}
	var defaultCreateAlgoliaClient = function defaultCreateAlgoliaClient(defaultAlgoliasearch, appId, apiKey) {
	  return defaultAlgoliasearch(appId, apiKey);
	};
	
	/**
	 * Widgets are the building blocks of InstantSearch.js. Any
	 * valid widget must have at least a `render` or a `init` function.
	 * @typedef {Object} Widget
	 * @property {function} [render] Called after each search response has been received
	 * @property {function} [getConfiguration] Let the widget update the configuration
	 * of the search with new parameters
	 * @property {function} [init] Called once before the first search
	 */
	
	/**
	 * The actual implementation of the InstantSearch. This is
	 * created using the `instantsearch` factory function.
	 * @fires Instantsearch#render This event is triggered each time a render is done
	 */
	
	var InstantSearch = function (_EventEmitter) {
	  _inherits(InstantSearch, _EventEmitter);
	
	  function InstantSearch(_ref) {
	    var _ref$appId = _ref.appId,
	        appId = _ref$appId === undefined ? null : _ref$appId,
	        _ref$apiKey = _ref.apiKey,
	        apiKey = _ref$apiKey === undefined ? null : _ref$apiKey,
	        _ref$indexName = _ref.indexName,
	        indexName = _ref$indexName === undefined ? null : _ref$indexName,
	        numberLocale = _ref.numberLocale,
	        _ref$searchParameters = _ref.searchParameters,
	        searchParameters = _ref$searchParameters === undefined ? {} : _ref$searchParameters,
	        _ref$urlSync = _ref.urlSync,
	        urlSync = _ref$urlSync === undefined ? null : _ref$urlSync,
	        searchFunction = _ref.searchFunction,
	        _ref$createAlgoliaCli = _ref.createAlgoliaClient,
	        createAlgoliaClient = _ref$createAlgoliaCli === undefined ? defaultCreateAlgoliaClient : _ref$createAlgoliaCli;
	
	    _classCallCheck(this, InstantSearch);
	
	    var _this = _possibleConstructorReturn(this, (InstantSearch.__proto__ || Object.getPrototypeOf(InstantSearch)).call(this));
	
	    if (appId === null || apiKey === null || indexName === null) {
	      var usage = '\nUsage: instantsearch({\n  appId: \'my_application_id\',\n  apiKey: \'my_search_api_key\',\n  indexName: \'my_index_name\'\n});';
	      throw new Error(usage);
	    }
	
	    var client = createAlgoliaClient(_algoliasearchLite2.default, appId, apiKey);
	    client.addAlgoliaAgent('instantsearch.js ' + _version2.default);
	
	    _this.client = client;
	    _this.helper = null;
	    _this.indexName = indexName;
	    _this.searchParameters = _extends({}, searchParameters, { index: indexName });
	    _this.widgets = [];
	    _this.templatesConfig = {
	      helpers: (0, _createHelpers2.default)({ numberLocale: numberLocale }),
	      compileOptions: {}
	    };
	
	    if (searchFunction) {
	      _this._searchFunction = searchFunction;
	    }
	
	    _this.urlSync = urlSync === true ? {} : urlSync;
	    return _this;
	  }
	
	  /**
	   * Add a widget
	   * @param  {Widget} widget The widget to add to InstantSearch. Widgets are simple objects
	   * that have methods that map the search lifecycle in a UI perspective. Usually widgets are
	   * created by [widget factories](widgets.html) like the one provided with InstantSearch.js.
	   * @return {undefined} This method does not return anything
	   */
	
	
	  _createClass(InstantSearch, [{
	    key: 'addWidget',
	    value: function addWidget(widget) {
	      // Add the widget to the list of widget
	      if (widget.render === undefined && widget.init === undefined) {
	        throw new Error('Widget definition missing render or init method');
	      }
	
	      this.widgets.push(widget);
	    }
	
	    /**
	     * The start methods ends the initialization of InstantSearch.js and triggers the
	     * first search. This method should be called after all widgets have been added
	     * to the instance of InstantSearch.js
	     *
	     * @return {undefined} Does not return anything
	     */
	
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;
	
	      if (!this.widgets) throw new Error('No widgets were added to instantsearch.js');
	
	      var searchParametersFromUrl = void 0;
	
	      if (this.urlSync) {
	        var syncWidget = (0, _urlSync2.default)(this.urlSync);
	        this._createURL = syncWidget.createURL.bind(syncWidget);
	        this._createAbsoluteURL = function (relative) {
	          return _this2._createURL(relative, { absolute: true });
	        };
	        this._onHistoryChange = syncWidget.onHistoryChange.bind(syncWidget);
	        this.widgets.push(syncWidget);
	        searchParametersFromUrl = syncWidget.searchParametersFromUrl;
	      } else {
	        this._createURL = defaultCreateURL;
	        this._createAbsoluteURL = defaultCreateURL;
	        this._onHistoryChange = function () {};
	      }
	
	      this.searchParameters = this.widgets.reduce(enhanceConfiguration(searchParametersFromUrl), this.searchParameters);
	
	      var helper = (0, _algoliasearchHelper2.default)(this.client, this.searchParameters.index || this.indexName, this.searchParameters);
	
	      if (this._searchFunction) {
	        this.helper = Object.create(helper);
	        this.helper.search = function () {
	          helper.setState(_this2.helper.state);
	          _this2._searchFunction(helper);
	        };
	        this._init(helper.state, this.helper);
	        helper.on('result', this._render.bind(this, this.helper));
	      } else {
	        this.helper = helper;
	        this._init(helper.state, this.helper);
	        this.helper.on('result', this._render.bind(this, this.helper));
	      }
	
	      this.helper.search();
	    }
	  }, {
	    key: 'createURL',
	    value: function createURL(params) {
	      if (!this._createURL) {
	        throw new Error('You need to call start() before calling createURL()');
	      }
	      return this._createURL(this.helper.state.setQueryParameters(params));
	    }
	  }, {
	    key: '_render',
	    value: function _render(helper, results, state) {
	      var _this3 = this;
	
	      (0, _forEach2.default)(this.widgets, function (widget) {
	        if (!widget.render) {
	          return;
	        }
	        widget.render({
	          templatesConfig: _this3.templatesConfig,
	          results: results,
	          state: state,
	          helper: helper,
	          createURL: _this3._createAbsoluteURL,
	          instantSearchInstance: _this3
	        });
	      });
	
	      /**
	       * Render is triggered when the rendering of the widgets has been completed
	       * after a search.
	       * @event IntantSearch#render
	       */
	      this.emit('render');
	    }
	  }, {
	    key: '_init',
	    value: function _init(state, helper) {
	      var _this4 = this;
	
	      (0, _forEach2.default)(this.widgets, function (widget) {
	        if (widget.init) {
	          widget.init({
	            state: state,
	            helper: helper,
	            templatesConfig: _this4.templatesConfig,
	            createURL: _this4._createAbsoluteURL,
	            onHistoryChange: _this4._onHistoryChange,
	            instantSearchInstance: _this4
	          });
	        }
	      });
	    }
	  }]);
	
	  return InstantSearch;
	}(_events.EventEmitter);
	
	function enhanceConfiguration(searchParametersFromUrl) {
	  return function (configuration, widgetDefinition) {
	    if (!widgetDefinition.getConfiguration) return configuration;
	
	    // Get the relevant partial configuration asked by the widget
	    var partialConfiguration = widgetDefinition.getConfiguration(configuration, searchParametersFromUrl);
	
	    var customizer = function customizer(a, b) {
	      // always create a unified array for facets refinements
	      if (Array.isArray(a)) {
	        return (0, _union2.default)(a, b);
	      }
	
	      // avoid mutating objects
	      if ((0, _isPlainObject2.default)(a)) {
	        return (0, _mergeWith2.default)({}, a, b, customizer);
	      }
	
	      return undefined;
	    };
	
	    return (0, _mergeWith2.default)({}, configuration, partialConfiguration, customizer);
	  };
	}
	
	exports.default = InstantSearch;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(6),
	    baseEach = __webpack_require__(7),
	    castFunction = __webpack_require__(41),
	    isArray = __webpack_require__(23);
	
	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}
	
	module.exports = forEach;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(8),
	    createBaseEach = __webpack_require__(40);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(9),
	    keys = __webpack_require__(11);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(10);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(12),
	    baseKeys = __webpack_require__(33),
	    isArrayLike = __webpack_require__(37);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
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
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(13),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isBuffer = __webpack_require__(24),
	    isIndex = __webpack_require__(27),
	    isTypedArray = __webpack_require__(28);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 13 */
/***/ function(module, exports) {

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
	
	module.exports = baseTimes;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(15),
	    isObjectLike = __webpack_require__(22);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	module.exports = isArguments;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	
	module.exports = baseIsArguments;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    getRawTag = __webpack_require__(20),
	    objectToString = __webpack_require__(21);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(19);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
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
	
	module.exports = objectToString;


/***/ },
/* 22 */
/***/ function(module, exports) {

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
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
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
	
	module.exports = isArray;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(18),
	    stubFalse = __webpack_require__(26);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)(module)))

/***/ },
/* 25 */
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


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
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
	
	module.exports = isIndex;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(29),
	    baseUnary = __webpack_require__(31),
	    nodeUtil = __webpack_require__(32);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isLength = __webpack_require__(30),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
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
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	
	module.exports = isLength;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(19);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)(module)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(34),
	    nativeKeys = __webpack_require__(35);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
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
	
	module.exports = isPrototype;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(36);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 36 */
/***/ function(module, exports) {

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


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(38),
	    isLength = __webpack_require__(30);
	
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
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObject = __webpack_require__(39);
	
	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
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
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(37);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(42);
	
	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}
	
	module.exports = castFunction;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(44),
	    createAssigner = __webpack_require__(101);
	
	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});
	
	module.exports = mergeWith;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(45),
	    assignMergeValue = __webpack_require__(81),
	    baseFor = __webpack_require__(9),
	    baseMergeDeep = __webpack_require__(84),
	    isObject = __webpack_require__(39),
	    keysIn = __webpack_require__(98);
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;
	
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}
	
	module.exports = baseMerge;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(46),
	    stackClear = __webpack_require__(54),
	    stackDelete = __webpack_require__(55),
	    stackGet = __webpack_require__(56),
	    stackHas = __webpack_require__(57),
	    stackSet = __webpack_require__(58);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(47),
	    listCacheDelete = __webpack_require__(48),
	    listCacheGet = __webpack_require__(51),
	    listCacheHas = __webpack_require__(52),
	    listCacheSet = __webpack_require__(53);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}
	
	module.exports = listCacheClear;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(49);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
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
	  --this.size;
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(50);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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
	
	module.exports = assocIndexOf;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
	
	module.exports = eq;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(49);
	
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
	
	module.exports = listCacheGet;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(49);
	
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
	
	module.exports = listCacheHas;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(49);
	
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
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(46);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	
	module.exports = stackClear;


/***/ },
/* 55 */
/***/ function(module, exports) {

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
	  var data = this.__data__,
	      result = data['delete'](key);
	
	  this.size = data.size;
	  return result;
	}
	
	module.exports = stackDelete;


/***/ },
/* 56 */
/***/ function(module, exports) {

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
	
	module.exports = stackGet;


/***/ },
/* 57 */
/***/ function(module, exports) {

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
	
	module.exports = stackHas;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(46),
	    Map = __webpack_require__(59),
	    MapCache = __webpack_require__(66);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
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
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(18);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(61),
	    getValue = __webpack_require__(65);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(38),
	    isMasked = __webpack_require__(62),
	    isObject = __webpack_require__(39),
	    toSource = __webpack_require__(64);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(63);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
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
	
	module.exports = toSource;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(67),
	    mapCacheDelete = __webpack_require__(75),
	    mapCacheGet = __webpack_require__(78),
	    mapCacheHas = __webpack_require__(79),
	    mapCacheSet = __webpack_require__(80);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(68),
	    ListCache = __webpack_require__(46),
	    Map = __webpack_require__(59);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(69),
	    hashDelete = __webpack_require__(71),
	    hashGet = __webpack_require__(72),
	    hashHas = __webpack_require__(73),
	    hashSet = __webpack_require__(74);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(70);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	
	module.exports = hashClear;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 71 */
/***/ function(module, exports) {

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
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = hashDelete;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(70);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
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
	
	module.exports = hashGet;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(70);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
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
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(70);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
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
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);
	
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
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(77);
	
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
	
	module.exports = getMapData;


/***/ },
/* 77 */
/***/ function(module, exports) {

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
	
	module.exports = isKeyable;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);
	
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
	
	module.exports = mapCacheGet;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);
	
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
	
	module.exports = mapCacheHas;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(76);
	
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
	  var data = getMapData(this, key),
	      size = data.size;
	
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(82),
	    eq = __webpack_require__(50);
	
	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	
	module.exports = assignMergeValue;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(83);
	
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}
	
	module.exports = baseAssignValue;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60);
	
	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());
	
	module.exports = defineProperty;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(81),
	    cloneBuffer = __webpack_require__(85),
	    cloneTypedArray = __webpack_require__(86),
	    copyArray = __webpack_require__(89),
	    initCloneObject = __webpack_require__(90),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isArrayLikeObject = __webpack_require__(93),
	    isBuffer = __webpack_require__(24),
	    isFunction = __webpack_require__(38),
	    isObject = __webpack_require__(39),
	    isPlainObject = __webpack_require__(94),
	    isTypedArray = __webpack_require__(28),
	    toPlainObject = __webpack_require__(95);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	
	  var isCommon = newValue === undefined;
	
	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
	
	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(18);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
	
	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	
	  buffer.copy(result);
	  return result;
	}
	
	module.exports = cloneBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)(module)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(87);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.exports = cloneTypedArray;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(88);
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	module.exports = cloneArrayBuffer;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(18);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = copyArray;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(91),
	    getPrototype = __webpack_require__(92),
	    isPrototype = __webpack_require__(34);
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}
	
	module.exports = initCloneObject;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39);
	
	/** Built-in value references. */
	var objectCreate = Object.create;
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());
	
	module.exports = baseCreate;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(36);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(37),
	    isObjectLike = __webpack_require__(22);
	
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
	
	module.exports = isArrayLikeObject;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    getPrototype = __webpack_require__(92),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
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
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	
	module.exports = isPlainObject;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    keysIn = __webpack_require__(98);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(97),
	    baseAssignValue = __webpack_require__(82);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(82),
	    eq = __webpack_require__(50);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(12),
	    baseKeysIn = __webpack_require__(99),
	    isArrayLike = __webpack_require__(37);
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	module.exports = keysIn;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39),
	    isPrototype = __webpack_require__(34),
	    nativeKeysIn = __webpack_require__(100);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(102),
	    isIterateeCall = __webpack_require__(109);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(42),
	    overRest = __webpack_require__(103),
	    setToString = __webpack_require__(105);
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}
	
	module.exports = baseRest;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(104);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = overRest;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(106),
	    shortOut = __webpack_require__(108);
	
	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);
	
	module.exports = setToString;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(107),
	    defineProperty = __webpack_require__(83),
	    identity = __webpack_require__(42);
	
	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	
	module.exports = baseSetToString;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	
	module.exports = constant;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;
	
	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;
	
	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}
	
	module.exports = shortOut;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(50),
	    isArrayLike = __webpack_require__(37),
	    isIndex = __webpack_require__(27),
	    isObject = __webpack_require__(39);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(111),
	    baseRest = __webpack_require__(102),
	    baseUniq = __webpack_require__(114),
	    isArrayLikeObject = __webpack_require__(93);
	
	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2], [1, 2]);
	 * // => [2, 1]
	 */
	var union = baseRest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});
	
	module.exports = union;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(112),
	    isFlattenable = __webpack_require__(113);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	
	  predicate || (predicate = isFlattenable);
	  result || (result = []);
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23);
	
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
	
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	
	module.exports = isFlattenable;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(115),
	    arrayIncludes = __webpack_require__(118),
	    arrayIncludesWith = __webpack_require__(123),
	    cacheHas = __webpack_require__(124),
	    createSet = __webpack_require__(125),
	    setToArray = __webpack_require__(128);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;
	
	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(66),
	    setCacheAdd = __webpack_require__(116),
	    setCacheHas = __webpack_require__(117);
	
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
	      length = values == null ? 0 : values.length;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
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
	
	module.exports = setCacheAdd;


/***/ },
/* 117 */
/***/ function(module, exports) {

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
	
	module.exports = setCacheHas;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(119);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(120),
	    baseIsNaN = __webpack_require__(121),
	    strictIndexOf = __webpack_require__(122);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}
	
	module.exports = baseIsNaN;


/***/ },
/* 122 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = strictIndexOf;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(126),
	    noop = __webpack_require__(127),
	    setToArray = __webpack_require__(128);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};
	
	module.exports = createSet;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(18);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 128 */
/***/ function(module, exports) {

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
	
	module.exports = setToArray;


/***/ },
/* 129 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _algoliasearchHelper = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"algoliasearch-helper\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);
	
	var _version = __webpack_require__(131);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _url = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"algoliasearch-helper/src/url\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _url2 = _interopRequireDefault(_url);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _assign = __webpack_require__(149);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AlgoliaSearchHelper = _algoliasearchHelper2.default.AlgoliaSearchHelper;
	var majorVersionNumber = _version2.default.split('.')[0];
	var firstRender = true;
	
	function timerMaker(t0) {
	  var t = t0;
	  return function timer() {
	    var now = Date.now();
	    var delta = now - t;
	    t = now;
	    return delta;
	  };
	}
	
	/**
	 * @typedef {object} UrlUtil
	 * @property {string} character the character used in the url
	 * @property {function} onpopstate add an event listener for the URL change
	 * @property {function} pushState creates a new entry in the browser history
	 * @property {function} readUrl reads the query string of the parameters
	 */
	
	/**
	 * Handles the legacy browsers
	 * @type {UrlUtil}
	 */
	var hashUrlUtils = {
	  ignoreNextPopState: false,
	  character: '#',
	  onpopstate: function onpopstate(cb) {
	    var _this = this;
	
	    window.addEventListener('hashchange', function (hash) {
	      if (_this.ignoreNextPopState) {
	        _this.ignoreNextPopState = false;
	        return;
	      }
	
	      cb(hash);
	    });
	  },
	  pushState: function pushState(qs) {
	    // hash change or location assign does trigger an hashchange event
	    // so everytime we change it manually, we inform the code
	    // to ignore the next hashchange event
	    // see https://github.com/algolia/instantsearch.js/issues/2012
	    this.ignoreNextPopState = true;
	    window.location.assign(getFullURL(this.createURL(qs)));
	  },
	  createURL: function createURL(qs) {
	    return window.location.search + this.character + qs;
	  },
	  readUrl: function readUrl() {
	    return window.location.hash.slice(1);
	  }
	};
	
	/**
	 * Handles the modern API
	 * @type {UrlUtil}
	 */
	var modernUrlUtils = {
	  character: '?',
	  onpopstate: function onpopstate(cb) {
	    window.addEventListener('popstate', cb);
	  },
	  pushState: function pushState(qs, _ref) {
	    var getHistoryState = _ref.getHistoryState;
	
	    window.history.pushState(getHistoryState(), '', getFullURL(this.createURL(qs)));
	  },
	  createURL: function createURL(qs) {
	    return this.character + qs + document.location.hash;
	  },
	  readUrl: function readUrl() {
	    return window.location.search.slice(1);
	  }
	};
	
	// we always push the full url to the url bar. Not a relative one.
	// So that we handle cases like using a <base href>, see
	// https://github.com/algolia/instantsearch.js/issues/790 for the original issue
	function getFullURL(relative) {
	  return getLocationOrigin() + window.location.pathname + relative;
	}
	
	// IE <= 11 has no location.origin or buggy
	function getLocationOrigin() {
	  // eslint-disable-next-line max-len
	  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	}
	
	// see InstantSearch.js file for urlSync options
	
	var URLSync = function () {
	  function URLSync(urlUtils, options) {
	    _classCallCheck(this, URLSync);
	
	    this.urlUtils = urlUtils;
	    this.originalConfig = null;
	    this.timer = timerMaker(Date.now());
	    this.mapping = options.mapping || {};
	    this.getHistoryState = options.getHistoryState || function () {
	      return null;
	    };
	    this.threshold = options.threshold || 700;
	    this.trackedParameters = options.trackedParameters || ['query', 'attribute:*', 'index', 'page', 'hitsPerPage'];
	
	    this.searchParametersFromUrl = AlgoliaSearchHelper.getConfigurationFromQueryString(this.urlUtils.readUrl(), { mapping: this.mapping });
	  }
	
	  _createClass(URLSync, [{
	    key: 'getConfiguration',
	    value: function getConfiguration(currentConfiguration) {
	      // we need to create a REAL helper to then get its state. Because some parameters
	      // like hierarchicalFacet.rootPath are then triggering a default refinement that would
	      // be not present if it was not going trough the SearchParameters constructor
	      this.originalConfig = (0, _algoliasearchHelper2.default)({
	        addAlgoliaAgent: function addAlgoliaAgent() {}
	      }, currentConfiguration.index, currentConfiguration).state;
	      return this.searchParametersFromUrl;
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref2) {
	      var _this2 = this;
	
	      var helper = _ref2.helper;
	
	      if (firstRender) {
	        firstRender = false;
	        this.onHistoryChange(this.onPopState.bind(this, helper));
	        helper.on('search', function (state) {
	          return _this2.renderURLFromState(state);
	        });
	      }
	    }
	  }, {
	    key: 'onPopState',
	    value: function onPopState(helper, fullState) {
	      clearTimeout(this.urlUpdateTimeout);
	      // compare with helper.state
	      var partialHelperState = helper.getState(this.trackedParameters);
	      var fullHelperState = (0, _assign2.default)({}, this.originalConfig, partialHelperState);
	
	      if ((0, _isEqual2.default)(fullHelperState, fullState)) return;
	
	      helper.overrideStateWithoutTriggeringChangeEvent(fullState).search();
	    }
	  }, {
	    key: 'renderURLFromState',
	    value: function renderURLFromState(state) {
	      var _this3 = this;
	
	      var currentQueryString = this.urlUtils.readUrl();
	      var foreignConfig = AlgoliaSearchHelper.getForeignConfigurationInQueryString(currentQueryString, { mapping: this.mapping });
	      // eslint-disable-next-line camelcase
	      foreignConfig.is_v = majorVersionNumber;
	
	      var qs = _url2.default.getQueryStringFromState(state.filter(this.trackedParameters), {
	        moreAttributes: foreignConfig,
	        mapping: this.mapping,
	        safe: true
	      });
	
	      clearTimeout(this.urlUpdateTimeout);
	      this.urlUpdateTimeout = setTimeout(function () {
	        _this3.urlUtils.pushState(qs, { getHistoryState: _this3.getHistoryState });
	      }, this.threshold);
	    }
	
	    // External API's
	
	  }, {
	    key: 'createURL',
	    value: function createURL(state, _ref3) {
	      var absolute = _ref3.absolute;
	
	      var currentQueryString = this.urlUtils.readUrl();
	      var filteredState = state.filter(this.trackedParameters);
	      var foreignConfig = _algoliasearchHelper2.default.url.getUnrecognizedParametersInQueryString(currentQueryString, { mapping: this.mapping });
	      // Add instantsearch version to reconciliate old url with newer versions
	      // eslint-disable-next-line camelcase
	      foreignConfig.is_v = majorVersionNumber;
	      var relative = this.urlUtils.createURL(_algoliasearchHelper2.default.url.getQueryStringFromState(filteredState, { mapping: this.mapping }));
	
	      return absolute ? getFullURL(relative) : relative;
	    }
	  }, {
	    key: 'onHistoryChange',
	    value: function onHistoryChange(fn) {
	      var _this4 = this;
	
	      this.urlUtils.onpopstate(function () {
	        var qs = _this4.urlUtils.readUrl();
	        var partialState = AlgoliaSearchHelper.getConfigurationFromQueryString(qs, { mapping: _this4.mapping });
	        var fullState = (0, _assign2.default)({}, _this4.originalConfig, partialState);
	        fn(fullState);
	      });
	    }
	  }]);
	
	  return URLSync;
	}();
	
	/**
	 * Instanciate a url sync widget. This widget let you synchronize the search
	 * parameters with the URL. It can operate with legacy API and hash or it can use
	 * the modern history API. By default, it will use the modern API, but if you are
	 * looking for compatibility with IE8 and IE9, then you should set 'useHash' to
	 * true.
	 * @param {object} options all the parameters to configure the URL synchronization. It
	 * may contain the following keys :
	 *  - threshold:number time in ms after which a new state is created in the browser
	 * history. The default value is 700.
	 *  - trackedParameters:string[] parameters that will be synchronized in the
	 * URL. By default, it will track the query, all the refinable attribute (facets and numeric
	 * filters), the index and the page.
	 *  - useHash:boolean if set to true, the url will be hash based. Otherwise,
	 * it'll use the query parameters using the modern history API.
	 * @return {object} the widget instance
	 */
	
	
	function urlSync() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var useHash = options.useHash || false;
	
	  var urlUtils = useHash ? hashUrlUtils : modernUrlUtils;
	
	  return new URLSync(urlUtils, options);
	}
	
	exports.default = urlSync;

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '1.11.7';

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(133);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
	
	module.exports = isEqual;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(134),
	    isObjectLike = __webpack_require__(22);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(45),
	    equalArrays = __webpack_require__(135),
	    equalByTag = __webpack_require__(137),
	    equalObjects = __webpack_require__(139),
	    getTag = __webpack_require__(145),
	    isArray = __webpack_require__(23),
	    isBuffer = __webpack_require__(24),
	    isTypedArray = __webpack_require__(28);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);
	
	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;
	
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(115),
	    arraySome = __webpack_require__(136),
	    cacheHas = __webpack_require__(124);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
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
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    Uint8Array = __webpack_require__(88),
	    eq = __webpack_require__(50),
	    equalArrays = __webpack_require__(135),
	    mapToArray = __webpack_require__(138),
	    setToArray = __webpack_require__(128);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
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
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
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
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 138 */
/***/ function(module, exports) {

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
	
	module.exports = mapToArray;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(140);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	
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
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
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
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(141),
	    getSymbols = __webpack_require__(142),
	    keys = __webpack_require__(11);
	
	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}
	
	module.exports = getAllKeys;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(112),
	    isArray = __webpack_require__(23);
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	module.exports = baseGetAllKeys;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(143),
	    stubArray = __webpack_require__(144);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};
	
	module.exports = getSymbols;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	module.exports = stubArray;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(146),
	    Map = __webpack_require__(59),
	    Promise = __webpack_require__(147),
	    Set = __webpack_require__(126),
	    WeakMap = __webpack_require__(148),
	    baseGetTag = __webpack_require__(16),
	    toSource = __webpack_require__(64);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';
	
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
	
	module.exports = getTag;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(18);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(18);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(60),
	    root = __webpack_require__(18);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(97),
	    copyObject = __webpack_require__(96),
	    createAssigner = __webpack_require__(101),
	    isArrayLike = __webpack_require__(37),
	    isPrototype = __webpack_require__(34),
	    keys = __webpack_require__(11);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 150 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var numberLocale = _ref.numberLocale;
	
	  return {
	    formatNumber: function formatNumber(number, render) {
	      return Number(render(number)).toLocaleString(numberLocale);
	    }
	  };
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _connectClearAll = __webpack_require__(152);
	
	Object.defineProperty(exports, 'connectClearAll', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectClearAll).default;
	  }
	});
	
	var _connectCurrentRefinedValues = __webpack_require__(191);
	
	Object.defineProperty(exports, 'connectCurrentRefinedValues', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectCurrentRefinedValues).default;
	  }
	});
	
	var _connectHierarchicalMenu = __webpack_require__(199);
	
	Object.defineProperty(exports, 'connectHierarchicalMenu', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectHierarchicalMenu).default;
	  }
	});
	
	var _connectHits = __webpack_require__(200);
	
	Object.defineProperty(exports, 'connectHits', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectHits).default;
	  }
	});
	
	var _connectHitsPerPage = __webpack_require__(201);
	
	Object.defineProperty(exports, 'connectHitsPerPage', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectHitsPerPage).default;
	  }
	});
	
	var _connectInfiniteHits = __webpack_require__(204);
	
	Object.defineProperty(exports, 'connectInfiniteHits', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectInfiniteHits).default;
	  }
	});
	
	var _connectMenu = __webpack_require__(205);
	
	Object.defineProperty(exports, 'connectMenu', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectMenu).default;
	  }
	});
	
	var _connectNumericRefinementList = __webpack_require__(206);
	
	Object.defineProperty(exports, 'connectNumericRefinementList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectNumericRefinementList).default;
	  }
	});
	
	var _connectNumericSelector = __webpack_require__(210);
	
	Object.defineProperty(exports, 'connectNumericSelector', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectNumericSelector).default;
	  }
	});
	
	var _connectPagination = __webpack_require__(211);
	
	Object.defineProperty(exports, 'connectPagination', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectPagination).default;
	  }
	});
	
	var _connectPriceRanges = __webpack_require__(212);
	
	Object.defineProperty(exports, 'connectPriceRanges', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectPriceRanges).default;
	  }
	});
	
	var _connectRangeSlider = __webpack_require__(214);
	
	Object.defineProperty(exports, 'connectRangeSlider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectRangeSlider).default;
	  }
	});
	
	var _connectRefinementList = __webpack_require__(215);
	
	Object.defineProperty(exports, 'connectRefinementList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectRefinementList).default;
	  }
	});
	
	var _connectSearchBox = __webpack_require__(216);
	
	Object.defineProperty(exports, 'connectSearchBox', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectSearchBox).default;
	  }
	});
	
	var _connectSortBySelector = __webpack_require__(217);
	
	Object.defineProperty(exports, 'connectSortBySelector', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectSortBySelector).default;
	  }
	});
	
	var _connectStarRating = __webpack_require__(218);
	
	Object.defineProperty(exports, 'connectStarRating', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectStarRating).default;
	  }
	});
	
	var _connectStats = __webpack_require__(219);
	
	Object.defineProperty(exports, 'connectStats', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectStats).default;
	  }
	});
	
	var _connectToggle = __webpack_require__(220);
	
	Object.defineProperty(exports, 'connectToggle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connectToggle).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectClearAll;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customClearAll = connectClearAll(function render(params, isFirstRendering) {\n  // params = {\n  //   refine,\n  //   hasRefinements,\n  //   createURL,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customClearAll({\n    [ excludeAttributes = [] ],\n    [ clearsQuery = false ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectClearAll.html\n';
	
	var refine = function refine(_ref) {
	  var helper = _ref.helper,
	      clearAttributes = _ref.clearAttributes,
	      hasRefinements = _ref.hasRefinements,
	      clearsQuery = _ref.clearsQuery;
	  return function () {
	    if (hasRefinements) {
	      (0, _utils.clearRefinementsAndSearch)(helper, clearAttributes, clearsQuery);
	    }
	  };
	};
	
	/**
	 * @typedef {Object} CustomClearAllWidgetOptions
	 * @property {string[]} [excludeAttributes = []] Every attributes that should not be removed when calling `refine()`.
	 * @property {boolean} [clearsQuery = false] If `true`, `refine()` also clears the current search query.
	 */
	
	/**
	 * @typedef {Object} ClearAllRenderingOptions
	 * @property {function} refine Triggers the clear of all the currently refined values.
	 * @property {boolean} hasRefinements Indicates if search state is refined.
	 * @property {function} createURL Creates a url for the next state when refinements are cleared.
	 * @property {Object} widgetParams All original `CustomClearAllWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **ClearAll** connector provides the logic to build a custom widget that will give the user
	 * the ability to reset the search state.
	 *
	 * This connector provides a `refine` function to remove the current refined facets.
	 *
	 * The behaviour of this function can be changed with widget options. If `clearsQuery`
	 * is set to `true`, `refine` will also clear the query and `excludeAttributes` can
	 * prevent certain attributes from being cleared.
	 *
	 * @type {Connector}
	 * @param {function(ClearAllRenderingOptions, boolean)} renderFn Rendering function for the custom **ClearAll** widget.
	 * @return {function(CustomClearAllWidgetOptions)} Re-usable widget factory for a custom **ClearAll** widget.
	 * @example
	 * // custom `renderFn` to render the custom ClearAll widget
	 * function renderFn(ClearAllRenderingOptions, isFirstRendering) {
	 *   var containerNode = ClearAllRenderingOptions.widgetParams.containerNode;
	 *   if (isFirstRendering) {
	 *     var markup = $('<button id="custom-clear-all">Clear All</button>');
	 *     containerNode.append(markup);
	 *
	 *     markup.on('click', function(event) {
	 *       event.preventDefault();
	 *       ClearAllRenderingOptions.refine();
	 *     })
	 *   }
	 *
	 *   var clearAllCTA = containerNode.find('#custom-clear-all');
	 *   clearAllCTA.attr('disabled', !ClearAllRenderingOptions.hasRefinements)
	 * };
	 *
	 * // connect `renderFn` to ClearAll logic
	 * var customClearAllWidget = instantsearch.connectors.connectClearAll(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customClearAllWidget({
	 *     containerNode: $('#custom-clear-all-container'),
	 *   })
	 * );
	 */
	function connectClearAll(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var _widgetParams$exclude = widgetParams.excludeAttributes,
	        excludeAttributes = _widgetParams$exclude === undefined ? [] : _widgetParams$exclude,
	        _widgetParams$clearsQ = widgetParams.clearsQuery,
	        clearsQuery = _widgetParams$clearsQ === undefined ? false : _widgetParams$clearsQ;
	
	
	    return {
	      // Provide the same function to the `renderFn` so that way the user
	      // has to only bind it once when `isFirstRendering` for instance
	      _refine: function _refine() {},
	      _cachedRefine: function _cachedRefine() {
	        this._refine();
	      },
	      init: function init(_ref2) {
	        var helper = _ref2.helper,
	            instantSearchInstance = _ref2.instantSearchInstance,
	            createURL = _ref2.createURL;
	
	        this._cachedRefine = this._cachedRefine.bind(this);
	
	        var clearAttributes = (0, _utils.getRefinements)({}, helper.state).map(function (one) {
	          return one.attributeName;
	        }).filter(function (one) {
	          return excludeAttributes.indexOf(one) === -1;
	        });
	
	        var hasRefinements = clearsQuery ? clearAttributes.length !== 0 || helper.state.query !== '' : clearAttributes.length !== 0;
	        var preparedCreateURL = function preparedCreateURL() {
	          return createURL((0, _utils.clearRefinementsFromState)(helper.state, [], clearsQuery));
	        };
	
	        this._refine = refine({ helper: helper, clearAttributes: clearAttributes, hasRefinements: hasRefinements, clearsQuery: clearsQuery });
	
	        renderFn({
	          refine: this._cachedRefine,
	          hasRefinements: hasRefinements,
	          createURL: preparedCreateURL,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            state = _ref3.state,
	            createURL = _ref3.createURL,
	            helper = _ref3.helper,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        var clearAttributes = (0, _utils.getRefinements)(results, state).map(function (one) {
	          return one.attributeName;
	        }).filter(function (one) {
	          return excludeAttributes.indexOf(one) === -1;
	        });
	
	        var hasRefinements = clearsQuery ? clearAttributes.length !== 0 || helper.state.query !== '' : clearAttributes.length !== 0;
	        var preparedCreateURL = function preparedCreateURL() {
	          return createURL((0, _utils.clearRefinementsFromState)(state, [], clearsQuery));
	        };
	
	        this._refine = refine({ helper: helper, clearAttributes: clearAttributes, hasRefinements: hasRefinements, clearsQuery: clearsQuery });
	
	        renderFn({
	          refine: this._cachedRefine,
	          hasRefinements: hasRefinements,
	          createURL: preparedCreateURL,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isReactElement = exports.checkRendering = exports.unescapeRefinement = exports.escapeRefinement = exports.prefixKeys = exports.clearRefinementsAndSearch = exports.clearRefinementsFromState = exports.getRefinements = exports.isDomElement = exports.isSpecialClick = exports.prepareTemplateProps = exports.bemHelper = exports.getContainerNode = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reduce = __webpack_require__(154);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _forEach = __webpack_require__(5);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _find = __webpack_require__(182);
	
	var _find2 = _interopRequireDefault(_find);
	
	var _get = __webpack_require__(163);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _isEmpty = __webpack_require__(188);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _keys = __webpack_require__(11);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _uniq = __webpack_require__(189);
	
	var _uniq2 = _interopRequireDefault(_uniq);
	
	var _mapKeys = __webpack_require__(190);
	
	var _mapKeys2 = _interopRequireDefault(_mapKeys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.getContainerNode = getContainerNode;
	exports.bemHelper = bemHelper;
	exports.prepareTemplateProps = prepareTemplateProps;
	exports.isSpecialClick = isSpecialClick;
	exports.isDomElement = isDomElement;
	exports.getRefinements = getRefinements;
	exports.clearRefinementsFromState = clearRefinementsFromState;
	exports.clearRefinementsAndSearch = clearRefinementsAndSearch;
	exports.prefixKeys = prefixKeys;
	exports.escapeRefinement = escapeRefinement;
	exports.unescapeRefinement = unescapeRefinement;
	exports.checkRendering = checkRendering;
	exports.isReactElement = isReactElement;
	
	/**
	 * Return the container. If it's a string, it is considered a
	 * css selector and retrieves the first matching element. Otherwise
	 * test if it validates that it's a correct DOMElement.
	 * @param {string|DOMElement} selectorOrHTMLElement a selector or a node
	 * @return {DOMElement} The resolved DOMElement
	 * @throws Error when the type is not correct
	 */
	
	function getContainerNode(selectorOrHTMLElement) {
	  var isFromString = typeof selectorOrHTMLElement === 'string';
	  var domElement = void 0;
	  if (isFromString) {
	    domElement = document.querySelector(selectorOrHTMLElement);
	  } else {
	    domElement = selectorOrHTMLElement;
	  }
	
	  if (!isDomElement(domElement)) {
	    var errorMessage = 'Container must be `string` or `HTMLElement`.';
	    if (isFromString) {
	      errorMessage += ' Unable to find ' + selectorOrHTMLElement;
	    }
	    throw new Error(errorMessage);
	  }
	
	  return domElement;
	}
	
	/**
	 * Returns true if the parameter is a DOMElement.
	 * @param {any} o the value to test
	 * @return {boolean} true if o is a DOMElement
	 */
	function isDomElement(o) {
	  return o instanceof window.HTMLElement || Boolean(o) && o.nodeType > 0;
	}
	
	function isSpecialClick(event) {
	  var isMiddleClick = event.button === 1;
	  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	}
	
	/**
	 * Creates BEM class name according the vanilla BEM style.
	 * @param {string} block the main block
	 * @return {function} function that takes up to 2 parameters
	 * that determine the element and the modifier of the BEM class.
	 */
	function bemHelper(block) {
	  return function (element, modifier) {
	    // block--element
	    if (element && !modifier) {
	      return block + '--' + element;
	    }
	    // block--element__modifier
	    if (element && modifier) {
	      return block + '--' + element + '__' + modifier;
	    }
	    // block__modifier
	    if (!element && modifier) {
	      return block + '__' + modifier;
	    }
	
	    return block;
	  };
	}
	
	/**
	 * Prepares an object to be passed to the Template widget
	 * @param {object} unknownBecauseES6 an object with the following attributes:
	 *  - transformData
	 *  - defaultTemplate
	 *  - templates
	 *  - templatesConfig
	 * @return {object} the configuration with the attributes:
	 *  - transformData
	 *  - defaultTemplate
	 *  - templates
	 *  - useCustomCompileOptions
	 */
	function prepareTemplateProps(_ref) {
	  var transformData = _ref.transformData,
	      defaultTemplates = _ref.defaultTemplates,
	      templates = _ref.templates,
	      templatesConfig = _ref.templatesConfig;
	
	  var preparedTemplates = prepareTemplates(defaultTemplates, templates);
	
	  return _extends({
	    transformData: transformData,
	    templatesConfig: templatesConfig
	  }, preparedTemplates);
	}
	
	function prepareTemplates() {
	  var defaultTemplates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var templates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var allKeys = (0, _uniq2.default)([].concat(_toConsumableArray((0, _keys2.default)(defaultTemplates)), _toConsumableArray((0, _keys2.default)(templates))));
	
	  return (0, _reduce2.default)(allKeys, function (config, key) {
	    var defaultTemplate = defaultTemplates[key];
	    var customTemplate = templates[key];
	    var isCustomTemplate = customTemplate !== undefined && customTemplate !== defaultTemplate;
	
	    config.templates[key] = isCustomTemplate ? customTemplate : defaultTemplate;
	    config.useCustomCompileOptions[key] = isCustomTemplate;
	
	    return config;
	  }, { templates: {}, useCustomCompileOptions: {} });
	}
	
	function getRefinement(state, type, attributeName, name, resultsFacets) {
	  var res = { type: type, attributeName: attributeName, name: name };
	  var facet = (0, _find2.default)(resultsFacets, { name: attributeName });
	  var count = void 0;
	  if (type === 'hierarchical') {
	    var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
	    var splitted = name.split(facetDeclaration.separator);
	    res.name = splitted[splitted.length - 1];
	    for (var i = 0; facet !== undefined && i < splitted.length; ++i) {
	      facet = (0, _find2.default)(facet.data, { name: splitted[i] });
	    }
	    count = (0, _get2.default)(facet, 'count');
	  } else {
	    count = (0, _get2.default)(facet, 'data["' + res.name + '"]');
	  }
	  var exhaustive = (0, _get2.default)(facet, 'exhaustive');
	  if (count !== undefined) {
	    res.count = count;
	  }
	  if (exhaustive !== undefined) {
	    res.exhaustive = exhaustive;
	  }
	  return res;
	}
	
	function getRefinements(results, state) {
	  var res = [];
	
	  (0, _forEach2.default)(state.facetsRefinements, function (refinements, attributeName) {
	    (0, _forEach2.default)(refinements, function (name) {
	      res.push(getRefinement(state, 'facet', attributeName, name, results.facets));
	    });
	  });
	
	  (0, _forEach2.default)(state.facetsExcludes, function (refinements, attributeName) {
	    (0, _forEach2.default)(refinements, function (name) {
	      res.push({ type: 'exclude', attributeName: attributeName, name: name, exclude: true });
	    });
	  });
	
	  (0, _forEach2.default)(state.disjunctiveFacetsRefinements, function (refinements, attributeName) {
	    (0, _forEach2.default)(refinements, function (name) {
	      res.push(getRefinement(state, 'disjunctive', attributeName,
	      // we unescapeRefinement any disjunctive refined value since they can be escaped
	      // when negative numeric values search `escapeRefinement` usage in code
	      unescapeRefinement(name), results.disjunctiveFacets));
	    });
	  });
	
	  (0, _forEach2.default)(state.hierarchicalFacetsRefinements, function (refinements, attributeName) {
	    (0, _forEach2.default)(refinements, function (name) {
	      res.push(getRefinement(state, 'hierarchical', attributeName, name, results.hierarchicalFacets));
	    });
	  });
	
	  (0, _forEach2.default)(state.numericRefinements, function (operators, attributeName) {
	    (0, _forEach2.default)(operators, function (values, operator) {
	      (0, _forEach2.default)(values, function (value) {
	        res.push({
	          type: 'numeric',
	          attributeName: attributeName,
	          name: '' + value,
	          numericValue: value,
	          operator: operator
	        });
	      });
	    });
	  });
	
	  (0, _forEach2.default)(state.tagRefinements, function (name) {
	    res.push({ type: 'tag', attributeName: '_tags', name: name });
	  });
	
	  return res;
	}
	
	function clearRefinementsFromState(inputState, attributeNames) {
	  var clearsQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	  var state = inputState;
	
	  if (clearsQuery) {
	    state = state.setQuery('');
	  }
	
	  if ((0, _isEmpty2.default)(attributeNames)) {
	    state = state.clearTags();
	    state = state.clearRefinements();
	    return state;
	  }
	
	  (0, _forEach2.default)(attributeNames, function (attributeName) {
	    if (attributeName === '_tags') {
	      state = state.clearTags();
	    } else {
	      state = state.clearRefinements(attributeName);
	    }
	  });
	
	  return state;
	}
	
	function clearRefinementsAndSearch(helper, attributeNames) {
	  var clearsQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	  helper.setState(clearRefinementsFromState(helper.state, attributeNames, clearsQuery)).search();
	}
	
	function prefixKeys(prefix, obj) {
	  if (obj) {
	    return (0, _mapKeys2.default)(obj, function (v, k) {
	      return prefix + k;
	    });
	  }
	
	  return undefined;
	}
	
	function escapeRefinement(value) {
	  if (typeof value === 'number' && value < 0) {
	    value = String(value).replace(/^-/, '\\-');
	  }
	
	  return value;
	}
	
	function unescapeRefinement(value) {
	  return String(value).replace(/^\\-/, '-');
	}
	
	function checkRendering(rendering, usage) {
	  if (rendering === undefined || typeof rendering !== 'function') {
	    throw new Error(usage);
	  }
	}
	
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
	
	function isReactElement(object) {
	  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(155),
	    baseEach = __webpack_require__(7),
	    baseIteratee = __webpack_require__(156),
	    baseReduce = __webpack_require__(181),
	    isArray = __webpack_require__(23);
	
	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;
	
	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}
	
	module.exports = reduce;


/***/ },
/* 155 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(157),
	    baseMatchesProperty = __webpack_require__(162),
	    identity = __webpack_require__(42),
	    isArray = __webpack_require__(23),
	    property = __webpack_require__(178);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(158),
	    getMatchData = __webpack_require__(159),
	    matchesStrictComparable = __webpack_require__(161);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(45),
	    baseIsEqual = __webpack_require__(133);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(160),
	    keys = __webpack_require__(11);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 161 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(133),
	    get = __webpack_require__(163),
	    hasIn = __webpack_require__(175),
	    isKey = __webpack_require__(166),
	    isStrictComparable = __webpack_require__(160),
	    matchesStrictComparable = __webpack_require__(161),
	    toKey = __webpack_require__(174);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(164);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(165),
	    toKey = __webpack_require__(174);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    isKey = __webpack_require__(166),
	    stringToPath = __webpack_require__(168),
	    toString = __webpack_require__(171);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}
	
	module.exports = castPath;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    isSymbol = __webpack_require__(167);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(169);
	
	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(170);
	
	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;
	
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });
	
	  var cache = result.cache;
	  return result;
	}
	
	module.exports = memoizeCapped;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(66);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Expose `MapCache`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(172);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17),
	    arrayMap = __webpack_require__(173),
	    isArray = __webpack_require__(23),
	    isSymbol = __webpack_require__(167);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(167);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(176),
	    hasPath = __webpack_require__(177);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(165),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(27),
	    isLength = __webpack_require__(30),
	    toKey = __webpack_require__(174);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);
	
	  var index = -1,
	      length = path.length,
	      result = false;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(179),
	    basePropertyDeep = __webpack_require__(180),
	    isKey = __webpack_require__(166),
	    toKey = __webpack_require__(174);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 179 */
/***/ function(module, exports) {

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
	
	module.exports = baseProperty;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(164);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 181 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}
	
	module.exports = baseReduce;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(183),
	    findIndex = __webpack_require__(184);
	
	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);
	
	module.exports = find;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(156),
	    isArrayLike = __webpack_require__(37),
	    keys = __webpack_require__(11);
	
	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}
	
	module.exports = createFind;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(120),
	    baseIteratee = __webpack_require__(156),
	    toInteger = __webpack_require__(185);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}
	
	module.exports = findIndex;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(186);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(187);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39),
	    isSymbol = __webpack_require__(167);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(33),
	    getTag = __webpack_require__(145),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isArrayLike = __webpack_require__(37),
	    isBuffer = __webpack_require__(24),
	    isPrototype = __webpack_require__(34),
	    isTypedArray = __webpack_require__(28);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = isEmpty;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(114);
	
	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each element
	 * is kept. The order of result values is determined by the order they occur
	 * in the array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length) ? baseUniq(array) : [];
	}
	
	module.exports = uniq;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(82),
	    baseForOwn = __webpack_require__(8),
	    baseIteratee = __webpack_require__(156);
	
	/**
	 * The opposite of `_.mapValues`; this method creates an object with the
	 * same values as `object` and keys generated by running each own enumerable
	 * string keyed property of `object` thru `iteratee`. The iteratee is invoked
	 * with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.8.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapValues
	 * @example
	 *
	 * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   return key + value;
	 * });
	 * // => { 'a1': 1, 'b2': 2 }
	 */
	function mapKeys(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);
	
	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, iteratee(value, key, object), value);
	  });
	  return result;
	}
	
	module.exports = mapKeys;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectCurrentRefinedValues;
	
	var _isUndefined = __webpack_require__(192);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _isBoolean = __webpack_require__(193);
	
	var _isBoolean2 = _interopRequireDefault(_isBoolean);
	
	var _isString = __webpack_require__(194);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _isArray = __webpack_require__(23);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isPlainObject = __webpack_require__(94);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _isFunction = __webpack_require__(38);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isEmpty = __webpack_require__(188);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _map = __webpack_require__(195);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _reduce = __webpack_require__(154);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _filter = __webpack_require__(197);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var usage = 'Usage:\nvar customCurrentRefinedValues = connectCurrentRefinedValues(function renderFn(params, isFirstRendering) {\n  // params = {\n  //   attributes,\n  //   clearAllClick,\n  //   clearAllPosition,\n  //   clearAllURL,\n  //   refine,\n  //   createURL,\n  //   refinements,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customCurrentRefinedValues({\n    [ attributes = [] ],\n    [ onlyListedAttributes = false ],\n    [ clearsQuery = false ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectCurrentRefinedValues.html\n';
	
	/**
	 * @typedef {Object} CurrentRefinedValuesRenderingOptions
	 * @property {Object.<string, object>} attributes Original `CurrentRefinedValuesWidgetOptions.attributes` mapped by keys.
	 * @property {function} clearAllClick Clears all the currently refined values.
	 * @property {function} clearAllURL Generate a URL which leads to a state where all the refinements have been cleared.
	 * @property {function(item)} refine Clears a single refinement.
	 * @property {function(item): string} createURL Creates an individual url where a single refinement is cleared.
	 * @property {Object[]} refinements All the current refinements.
	 * @property {Object} widgetParams All original `CustomCurrentRefinedValuesWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * @typedef {Object} CurrentRefinedValuesAttributes
	 * @property {string} name Mandatory field which is the name of the attribute.
	 * @property {string} label The label to apply on a refinement per attribute.
	 */
	
	/**
	 * @typedef {Object} CustomCurrentRefinedValuesWidgetOptions
	 * @property {CurrentRefinedValuesAttributes[]} [attributes = []] Specification for the display of
	 * refinements per attribute (default: `[]`). By default, the widget will display all the filters
	 * set with no special treatment for the label.
	 * @property {boolean} [onlyListedAttributes = false] Limit the displayed refinement to the list specified.
	 * @property {boolean} [clearsQuery = false] Clears also the active search query when using clearAll.
	 */
	
	/**
	 * **CurrentRefinedValues** connector provides the logic to build a widget that will give
	 * the user the ability to see all the currently aplied filters and, remove some or all of
	 * them.
	 *
	 * This provides a `refine(item)` function to remove a selected refinement and a `clearAllClick`
	 * function to clear all the filters. Those functions can see their behaviour change based on
	 * the widget options used.
	 * @type {Connector}
	 * @param {function(CurrentRefinedValuesRenderingOptions)} renderFn Rendering function for the custom **CurrentRefinedValues** widget.
	 * @return {function(CustomCurrentRefinedValuesWidgetOptions)} Re-usable widget factory for a custom **CurrentRefinedValues** widget.
	 * @example
	 * // custom `renderFn` to render the custom ClearAll widget
	 * function renderFn(CurrentRefinedValuesRenderingOptions, isFirstRendering) {
	 *   var containerNode = CurrentRefinedValuesRenderingOptions.widgetParams.containerNode;
	 *   if (isFirstRendering) {
	 *     containerNode
	 *       .html('<ul id="refiments"></ul><div id="cta-container"></div>');
	 *   }
	 *
	 *   containerNode
	 *     .find('#cta-container > a')
	 *     .off('click');
	 *
	 *   containerNode
	 *     .find('li > a')
	 *     .each(function() { $(this).off('click') });
	 *
	 *   if (CurrentRefinedValuesRenderingOptions.refinements
	 *       && CurrentRefinedValuesRenderingOptions.refinements.length > 0) {
	 *     containerNode
	 *       .find('#cta-container')
	 *       .html('<a href="' + CurrentRefinedValuesRenderingOptions.clearAllURL + '">Clear all </a>');
	 *
	 *     containerNode
	 *       .find('#cta-container > a')
	 *       .on('click', function(event) {
	 *         event.preventDefault();
	 *         CurrentRefinedValuesRenderingOptions.clearAllClick();
	 *       });
	 *
	 *     var list = CurrentRefinedValuesRenderingOptions.refinements.map(function(refinement) {
	 *       return '<li><a href="' + CurrentRefinedValuesRenderingOptions.createURL(refinement) + '">'
	 *         + refinement.computedLabel + ' ' + refinement.count + '</a></li>';
	 *     });
	 *
	 *     CurrentRefinedValuesRenderingOptions.find('ul').html(list);
	 *     CurrentRefinedValuesRenderingOptions.find('li > a').each(function(index) {
	 *       $(this).on('click', function(event) {
	 *         event.preventDefault();
	 *
	 *         var refinement = CurrentRefinedValuesRenderingOptions.refinements[index];
	 *         CurrentRefinedValuesRenderingOptions.refine(refinement);
	 *       });
	 *     });
	 *   } else {
	 *     containerNode.find('#cta-container').html('');
	 *     containerNode.find('ul').html('');
	 *   }
	 * }
	 *
	 * // connect `renderFn` to CurrentRefinedValues logic
	 * var customCurrentRefinedValues = instantsearch.connectors.connectCurrentRefinedValues(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customCurrentRefinedValues({
	 *     containerNode: $('#custom-crv-container'),
	 *   })
	 * );
	 */
	function connectCurrentRefinedValues(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var _widgetParams$attribu = widgetParams.attributes,
	        attributes = _widgetParams$attribu === undefined ? [] : _widgetParams$attribu,
	        _widgetParams$onlyLis = widgetParams.onlyListedAttributes,
	        onlyListedAttributes = _widgetParams$onlyLis === undefined ? false : _widgetParams$onlyLis,
	        _widgetParams$clearsQ = widgetParams.clearsQuery,
	        clearsQuery = _widgetParams$clearsQ === undefined ? false : _widgetParams$clearsQ;
	
	
	    var attributesOK = (0, _isArray2.default)(attributes) && (0, _reduce2.default)(attributes, function (res, val) {
	      return res && (0, _isPlainObject2.default)(val) && (0, _isString2.default)(val.name) && ((0, _isUndefined2.default)(val.label) || (0, _isString2.default)(val.label)) && ((0, _isUndefined2.default)(val.template) || (0, _isString2.default)(val.template) || (0, _isFunction2.default)(val.template)) && ((0, _isUndefined2.default)(val.transformData) || (0, _isFunction2.default)(val.transformData));
	    }, true);
	
	    var showUsage = false || !(0, _isArray2.default)(attributes) || !attributesOK || !(0, _isBoolean2.default)(onlyListedAttributes);
	
	    if (showUsage) {
	      throw new Error(usage);
	    }
	
	    var attributeNames = (0, _map2.default)(attributes, function (attribute) {
	      return attribute.name;
	    });
	    var restrictedTo = onlyListedAttributes ? attributeNames : [];
	
	    var attributesObj = (0, _reduce2.default)(attributes, function (res, attribute) {
	      res[attribute.name] = attribute;
	      return res;
	    }, {});
	
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            createURL = _ref.createURL,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._clearRefinementsAndSearch = _utils.clearRefinementsAndSearch.bind(null, helper, restrictedTo, clearsQuery);
	
	        var clearAllURL = createURL((0, _utils.clearRefinementsFromState)(helper.state, restrictedTo, clearsQuery));
	
	        var refinements = getFilteredRefinements({}, helper.state, attributeNames, onlyListedAttributes);
	
	        var _createURL = function _createURL(refinement) {
	          return createURL(clearRefinementFromState(helper.state, refinement));
	        };
	        var _clearRefinement = function _clearRefinement(refinement) {
	          return clearRefinement(helper, refinement);
	        };
	
	        renderFn({
	          attributes: attributesObj,
	          clearAllClick: this._clearRefinementsAndSearch,
	          clearAllURL: clearAllURL,
	          refine: _clearRefinement,
	          createURL: _createURL,
	          refinements: refinements,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var results = _ref2.results,
	            helper = _ref2.helper,
	            state = _ref2.state,
	            createURL = _ref2.createURL,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        var clearAllURL = createURL((0, _utils.clearRefinementsFromState)(state, restrictedTo, clearsQuery));
	
	        var refinements = getFilteredRefinements(results, state, attributeNames, onlyListedAttributes);
	
	        var _createURL = function _createURL(refinement) {
	          return createURL(clearRefinementFromState(helper.state, refinement));
	        };
	        var _clearRefinement = function _clearRefinement(refinement) {
	          return clearRefinement(helper, refinement);
	        };
	
	        renderFn({
	          attributes: attributesObj,
	          clearAllClick: this._clearRefinementsAndSearch,
	          clearAllURL: clearAllURL,
	          refine: _clearRefinement,
	          createURL: _createURL,
	          refinements: refinements,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}
	
	function getRestrictedIndexForSort(attributeNames, otherAttributeNames, attributeName) {
	  var idx = attributeNames.indexOf(attributeName);
	  if (idx !== -1) {
	    return idx;
	  }
	  return attributeNames.length + otherAttributeNames.indexOf(attributeName);
	}
	
	function compareRefinements(attributeNames, otherAttributeNames, a, b) {
	  var idxa = getRestrictedIndexForSort(attributeNames, otherAttributeNames, a.attributeName);
	  var idxb = getRestrictedIndexForSort(attributeNames, otherAttributeNames, b.attributeName);
	  if (idxa === idxb) {
	    if (a.name === b.name) {
	      return 0;
	    }
	    return a.name < b.name ? -1 : 1;
	  }
	  return idxa < idxb ? -1 : 1;
	}
	
	function getFilteredRefinements(results, state, attributeNames, onlyListedAttributes) {
	  var refinements = (0, _utils.getRefinements)(results, state);
	  var otherAttributeNames = (0, _reduce2.default)(refinements, function (res, refinement) {
	    if (attributeNames.indexOf(refinement.attributeName) === -1 && res.indexOf(refinement.attributeName === -1)) {
	      res.push(refinement.attributeName);
	    }
	    return res;
	  }, []);
	  refinements = refinements.sort(compareRefinements.bind(null, attributeNames, otherAttributeNames));
	  if (onlyListedAttributes && !(0, _isEmpty2.default)(attributeNames)) {
	    refinements = (0, _filter2.default)(refinements, function (refinement) {
	      return attributeNames.indexOf(refinement.attributeName) !== -1;
	    });
	  }
	  return refinements.map(computeLabel);
	}
	
	function clearRefinementFromState(state, refinement) {
	  switch (refinement.type) {
	    case 'facet':
	      return state.removeFacetRefinement(refinement.attributeName, refinement.name);
	    case 'disjunctive':
	      return state.removeDisjunctiveFacetRefinement(refinement.attributeName, refinement.name);
	    case 'hierarchical':
	      return state.clearRefinements(refinement.attributeName);
	    case 'exclude':
	      return state.removeExcludeRefinement(refinement.attributeName, refinement.name);
	    case 'numeric':
	      return state.removeNumericRefinement(refinement.attributeName, refinement.operator, refinement.numericValue);
	    case 'tag':
	      return state.removeTagRefinement(refinement.name);
	    default:
	      throw new Error('clearRefinement: type ' + refinement.type + ' is not handled');
	  }
	}
	
	function clearRefinement(helper, refinement) {
	  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
	}
	
	function computeLabel(value) {
	  // default to `value.name` if no operators
	  value.computedLabel = value.name;
	
	  if (value.hasOwnProperty('operator') && typeof value.operator === 'string') {
	    var displayedOperator = value.operator;
	    if (value.operator === '>=') displayedOperator = '≥';
	    if (value.operator === '<=') displayedOperator = '≤';
	    value.computedLabel = displayedOperator + ' ' + value.name;
	  }
	
	  return value;
	}

/***/ },
/* 192 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}
	
	module.exports = isUndefined;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';
	
	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && baseGetTag(value) == boolTag);
	}
	
	module.exports = isBoolean;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(16),
	    isArray = __webpack_require__(23),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
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
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(173),
	    baseIteratee = __webpack_require__(156),
	    baseMap = __webpack_require__(196),
	    isArray = __webpack_require__(23);
	
	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = map;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(7),
	    isArrayLike = __webpack_require__(37);
	
	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(143),
	    baseFilter = __webpack_require__(198),
	    baseIteratee = __webpack_require__(156),
	    isArray = __webpack_require__(23);
	
	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}
	
	module.exports = filter;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}
	
	module.exports = baseFilter;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = connectHierarchicalMenu;
	
	var _utils = __webpack_require__(153);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var usage = 'Usage:\nvar customHierarchicalMenu = connectHierarchicalMenu(function renderFn(params, isFirstRendering) {\n  // params = {\n  //   createURL,\n  //   items,\n  //   refine,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customHierarchicalMenu({\n    attributes,\n    [ separator = \' > \' ],\n    [ rootPath = null ],\n    [ showParentLevel = true ],\n    [ limit = 10 ],\n    [ sortBy = [\'name:asc\'] ],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectHierarchicalMenu.html\n';
	
	/**
	 * @typedef {Object} HierarchicalMenuItem
	 * @property {string} value Value of the menu item.
	 * @property {string} label Human-readable value of the menu item.
	 * @property {number} count Number of matched results after refinement is applied.
	 * @property {isRefined} boolean Indicates if the refinement is applied.
	 * @property {Object} [data = undefined] n+1 level of items, same structure HierarchicalMenuItem (default: `undefined`).
	 */
	
	/**
	 * @typedef {Object} CustomHierarchicalMenuWidgetOptions
	 * @property {string[]} attributesof Attributes to use to generate the hierarchy of the menu.
	 * @property {string} [separator = '>'] Separator used in the attributes to separate level values.
	 * @property {string} [rootPath = null] Prefix path to use if the first level is not the root level.
	 * @property {string} [showParentLevel = true] Shows the parent level of the current refined value.
	 * @property {number} [limit = 10] Max number of value to display.
	 * @property  {string[]|function} [sortBy = ['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
	 *
	 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
	 */
	
	/**
	 * @typedef {Object} HierarchicalMenuRenderingOptions
	 * @property {function(item.value): string} createURL Creates an url for the next state for a clicked item.
	 * @property {HierarchicalMenuItem[]} items Values to be rendered.
	 * @property {function(item.value)} refine Sets the path of the hierarchical filter and triggers a new search.
	 * @property {Object} widgetParams All original `CustomHierarchicalMenuWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **HierarchicalMenu** connector provides the logic to build a custom widget
	 * that will give the user the ability to explore facets in a tree-like structure.
	 *
	 * This is commonly used for multi-level categorization of products on e-commerce
	 * websites. From a UX point of view, we suggest not displaying more than two
	 * levels deep.
	 *
	 * There's a complete example available on how to write a custom **HierarchicalMenu**:
	 *  [hierarchicalMenu.js](https://github.com/algolia/instantsearch.js/blob/feat/instantsearch.js/v2/dev/app/custom-widgets/jquery/hierarchicalMenu.js)
	 * @type {Connector}
	 * @param {function(HierarchicalMenuRenderingOptions)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
	 * @return {function(CustomHierarchicalMenuWidgetOptions)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
	 */
	function connectHierarchicalMenu(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributes = widgetParams.attributes,
	        _widgetParams$separat = widgetParams.separator,
	        separator = _widgetParams$separat === undefined ? ' > ' : _widgetParams$separat,
	        _widgetParams$rootPat = widgetParams.rootPath,
	        rootPath = _widgetParams$rootPat === undefined ? null : _widgetParams$rootPat,
	        _widgetParams$showPar = widgetParams.showParentLevel,
	        showParentLevel = _widgetParams$showPar === undefined ? true : _widgetParams$showPar,
	        _widgetParams$limit = widgetParams.limit,
	        limit = _widgetParams$limit === undefined ? 10 : _widgetParams$limit,
	        _widgetParams$sortBy = widgetParams.sortBy,
	        sortBy = _widgetParams$sortBy === undefined ? ['name:asc'] : _widgetParams$sortBy;
	
	
	    if (!attributes || !attributes.length) {
	      throw new Error(usage);
	    }
	
	    // we need to provide a hierarchicalFacet name for the search state
	    // so that we can always map $hierarchicalFacetName => real attributes
	    // we use the first attribute name
	
	    var _attributes = _slicedToArray(attributes, 1),
	        hierarchicalFacetName = _attributes[0];
	
	    return {
	      getConfiguration: function getConfiguration(currentConfiguration) {
	        return {
	          hierarchicalFacets: [{
	            name: hierarchicalFacetName,
	            attributes: attributes,
	            separator: separator,
	            rootPath: rootPath,
	            showParentLevel: showParentLevel
	          }],
	          maxValuesPerFacet: currentConfiguration.maxValuesPerFacet !== undefined ? Math.max(currentConfiguration.maxValuesPerFacet, limit) : limit
	        };
	      },
	
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            createURL = _ref.createURL,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._refine = function (facetValue) {
	          return helper.toggleRefinement(hierarchicalFacetName, facetValue).search();
	        };
	
	        // Bind createURL to this specific attribute
	        function _createURL(facetValue) {
	          return createURL(helper.state.toggleRefinement(hierarchicalFacetName, facetValue));
	        }
	
	        renderFn({
	          createURL: _createURL,
	          items: [],
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      _prepareFacetValues: function _prepareFacetValues(facetValues, state) {
	        var _this = this;
	
	        return facetValues.slice(0, limit).map(function (_ref2) {
	          var label = _ref2.name,
	              value = _ref2.path,
	              subValue = _objectWithoutProperties(_ref2, ['name', 'path']);
	
	          if (Array.isArray(subValue.data)) {
	            subValue.data = _this._prepareFacetValues(subValue.data, state);
	          }
	          return _extends({}, subValue, { label: label, value: value });
	        });
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            state = _ref3.state,
	            createURL = _ref3.createURL,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        var items = this._prepareFacetValues(results.getFacetValues(hierarchicalFacetName, { sortBy: sortBy }).data || [], state);
	
	        // Bind createURL to this specific attribute
	        function _createURL(facetValue) {
	          return createURL(state.toggleRefinement(hierarchicalFacetName, facetValue));
	        }
	
	        renderFn({
	          createURL: _createURL,
	          items: items,
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectHits;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customHits = connectHits(function render(params, isFirstRendering) {\n  // params = {\n  //   hits,\n  //   results,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(customHits());\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectHits.html\n';
	
	/**
	 * @typedef {Object} HitsRenderingOptions
	 * @property {Object[]} hits The matched hits from Algolia API.
	 * @property {Object} results The complete results response from Algolia API.
	 * @property {Object} widgetParams All original widget options forwarded to the `renderFn`.
	 */
	
	/**
	 * **Hits** connector provides the logic to create custom widgets that will render the results retrieved from Algolia.
	 * @type {Connector}
	 * @param {function(HitsRenderingOptions, boolean)} renderFn Rendering function for the custom **Hits** widget.
	 * @return {function} Re-usable widget factory for a custom **Hits** widget.
	 * @example
	 * // custom `renderFn` to render the custom Hits widget
	 * function renderFn(HitsRenderingOptions) {
	 *   HitsRenderingOptions.widgetParams.containerNode.html(
	 *     HitsRenderingOptions.hits.map(function(hit) {
	 *       return '<div>' + hit._highlightResult.name.value + '</div>';
	 *     })
	 *   );
	 * }
	 *
	 * // connect `renderFn` to Hits logic
	 * var customHits = instantsearch.connectors.connectHits(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customHits({
	 *     containerNode: $('#custom-hits-container'),
	 *   })
	 * );
	 */
	function connectHits(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    return {
	      init: function init(_ref) {
	        var instantSearchInstance = _ref.instantSearchInstance;
	
	        renderFn({
	          hits: [],
	          results: undefined,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var results = _ref2.results,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        renderFn({
	          hits: results.hits,
	          results: results,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = connectHitsPerPage;
	
	var _some = __webpack_require__(202);
	
	var _some2 = _interopRequireDefault(_some);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var usage = 'Usage:\nvar customHitsPerPage = connectHitsPerPage(function render(params, isFirstRendering) {\n  // params = {\n  //   items,\n  //   refine,\n  //   hasNoResults,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customHitsPerPage({\n    items: [\n      {value: 10, label: \'10 results per page\'},\n      {value: 42, label: \'42 results per page\'},\n    ],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectHitsPerPage.html\n';
	
	/**
	 * @typedef {Object} HitsPerPageRenderingOptionsItem
	 * @property {number} value Number of hits to display per page.
	 * @property {string} label Label to display in the option.
	 * @property {boolean} isRefined Indicates if it's the current refined value.
	 */
	
	/**
	* @typedef {Object} HitsPerPageWidgetOptionsItem
	* @property {number} value Number of hits to display per page.
	* @property {string} label Label to display in the option.
	*/
	
	/**
	 * @typedef {Object} HitsPerPageRenderingOptions
	 * @property {HitsPerPageRenderingOptionsItem[]} items Array of objects defining the different values and labels.
	 * @property {function(number)} refine Sets the number of hits per page and trigger a search.
	 * @property {boolean} hasNoResults `true` if the last search contains no result.
	 * @property {Object} widgetParams Original `HitsPerPageWidgetOptions` forwarded to `renderFn`.
	 */
	
	/**
	 * @typedef {Object} HitsPerPageWidgetOptions
	 * @property {HitsPerPageWidgetOptionsItem[]} items Array of objects defining the different values and labels.
	 */
	
	/**
	 * **HitsPerPage** connector provides the logic to create custom widget that will
	 * allow a user to choose to display more or less results from Algolia.
	 *
	 * This connector provides a `refine()` function to change the hits per page configuration and trigger a new search.
	 * @type {Connector}
	 * @param {function(HitsPerPageRenderingOptions, boolean)} renderFn Rendering function for the custom **HitsPerPage** widget.
	 * @return {function(HitsPerPageWidgetOptions)} Re-usable widget factory for a custom **HitsPerPage** widget.
	 * @example
	 * // custom `renderFn` to render the custom HitsPerPage widget
	 * function renderFn(HitsPerPageRenderingOptions, isFirstRendering) {
	 *   var containerNode = HitsPerPageRenderingOptions.widgetParams.containerNode
	 *   var items = HitsPerPageRenderingOptions.items
	 *   var refine = HitsPerPageRenderingOptions.refine
	 *
	 *   if (isFirstRendering) {
	 *     var markup = '<select></select>';
	 *     containerNode.append(markup);
	 *   }
	 *
	 *   const itemsHTML = items.map(({value, label, isRefined}) => `
	 *     <option
	 *       value="${value}"
	 *       ${isRefined ? 'selected' : ''}
	 *     >
	 *       ${label}
	 *     </option>
	 *   `);
	 *
	 *   containerNode
	 *     .find('select')
	 *     .html(itemsHTML);
	 *
	 *   containerNode
	 *     .find('select')
	 *     .off('change')
	 *     .on('change', e => { refine(e.target.value); });
	 * }
	 *
	 * // connect `renderFn` to HitsPerPage logic
	 * var customHitsPerPage = instantsearch.connectors.connectHitsPerPage(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customHitsPerPage({
	 *     containerNode: $('#custom-hits-per-page-container'),
	 *     items: [
	 *       {value: 6, label: '6 per page'},
	 *       {value: 12, label: '12 per page'},
	 *       {value: 24, label: '24 per page'},
	 *     ],
	 *   })
	 * );
	 */
	function connectHitsPerPage(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var userItems = widgetParams.items;
	
	    var items = userItems;
	
	    if (!items) {
	      throw new Error(usage);
	    }
	
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            state = _ref.state,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        var isCurrentInOptions = (0, _some2.default)(items, function (item) {
	          return Number(state.hitsPerPage) === Number(item.value);
	        });
	
	        if (!isCurrentInOptions) {
	          if (state.hitsPerPage === undefined) {
	            if (window.console) {
	              window.console.warn('[Warning][hitsPerPageSelector] hitsPerPage not defined.\n  You should probably set the value `hitsPerPage`\n  using the searchParameters attribute of the instantsearch constructor.');
	            }
	          } else if (window.console) {
	            window.console.warn('[Warning][hitsPerPageSelector] No item in `items`\n  with `value: hitsPerPage` (hitsPerPage: ' + state.hitsPerPage + ')');
	          }
	
	          items = [{ value: undefined, label: '' }].concat(_toConsumableArray(items));
	        }
	
	        this.setHitsPerPage = function (value) {
	          return helper.setQueryParameter('hitsPerPage', value).search();
	        };
	
	        renderFn({
	          items: this._transformItems(state),
	          refine: this.setHitsPerPage,
	          hasNoResults: true,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, true);
	      },
	      render: function render(_ref2) {
	        var state = _ref2.state,
	            results = _ref2.results,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        var hasNoResults = results.nbHits === 0;
	
	        renderFn({
	          items: this._transformItems(state),
	          refine: this.setHitsPerPage,
	          hasNoResults: hasNoResults,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      },
	      _transformItems: function _transformItems(_ref3) {
	        var hitsPerPage = _ref3.hitsPerPage;
	
	        return items.map(function (item) {
	          return _extends({}, item, { isRefined: Number(item.value) === Number(hitsPerPage) });
	        });
	      }
	    };
	  };
	}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(136),
	    baseIteratee = __webpack_require__(156),
	    baseSome = __webpack_require__(203),
	    isArray = __webpack_require__(23),
	    isIterateeCall = __webpack_require__(109);
	
	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}
	
	module.exports = some;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;
	
	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}
	
	module.exports = baseSome;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectInfiniteHits;
	
	var _utils = __webpack_require__(153);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var usage = 'Usage:\nvar customInfiniteHits = connectInfiniteHits(function render(params, isFirstRendering) {\n  // params = {\n  //   hits,\n  //   results,\n  //   showMore,\n  //   isLastPage,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customInfiniteHits()\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectInfiniteHits.html\n';
	
	/**
	 * @typedef {Object} InfiniteHitsRenderingOptions
	 * @property {Array<Object>} hits The aggregated matched hits from Algolia API of all pages.
	 * @property {Object} results The complete results response from Algolia API.
	 * @property {function} showMore Loads the next page of hits.
	 * @property {boolean} isLastPage Indicates if the last page of hits has been reached.
	 * @property {Object} widgetParams All original widget options forwarded to the `renderFn`.
	 */
	
	/**
	 * **InfiniteHits** connector provides the logic to create custom widgets that will render an continuous list of results retrieved from Algolia.
	 *
	 * This connector provides a `InfiniteHitsRenderingOptions.showMore()` function to load next page of matched results.
	 * @type {Connector}
	 * @param {function(InfiniteHitsRenderingOptions, boolean)} renderFn Rendering function for the custom **InfiniteHits** widget.
	 * @return {function(object)} Re-usable widget factory for a custom **InfiniteHits** widget.
	 * @example
	 * // custom `renderFn` to render the custom InfiniteHits widget
	 * function renderFn(InfiniteHitsRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     InfiniteHitsRenderingOptions.widgetParams.containerNode
	 *       .html('<div id="hits"></div><button id="show-more">Load more</button>');
	 *
	 *     InfiniteHitsRenderingOptions.widgetParams.containerNode
	 *       .find('#show-more')
	 *       .on('click', function(event) {
	 *         event.preventDefault();
	 *         InfiniteHitsRenderingOptions.showMore();
	 *       });
	 *   }
	 *
	 *   InfiniteHitsRenderingOptions.widgetParams.containerNode.find('#hits').html(
	 *     InfiniteHitsRenderingOptions.hits.map(function(hit) {
	 *       return '<div>' + hit._highlightResult.name.value + '</div>';
	 *     })
	 *   );
	 * };
	 *
	 * // connect `renderFn` to InfiniteHits logic
	 * var customInfiniteHits = instantsearch.connectors.connectInfiniteHits(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customInfiniteHits({
	 *     containerNode: $('#custom-infinite-hits-container'),
	 *   })
	 * );
	 */
	function connectInfiniteHits(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    var hitsCache = [];
	    var getShowMore = function getShowMore(helper) {
	      return function () {
	        return helper.nextPage().search();
	      };
	    };
	
	    return {
	      init: function init(_ref) {
	        var instantSearchInstance = _ref.instantSearchInstance,
	            helper = _ref.helper;
	
	        this.showMore = getShowMore(helper);
	
	        renderFn({
	          hits: hitsCache,
	          results: undefined,
	          showMore: this.showMore,
	          isLastPage: true,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var results = _ref2.results,
	            state = _ref2.state,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        if (state.page === 0) {
	          hitsCache = [];
	        }
	
	        hitsCache = [].concat(_toConsumableArray(hitsCache), _toConsumableArray(results.hits));
	
	        var isLastPage = results.nbPages <= results.page + 1;
	
	        renderFn({
	          hits: hitsCache,
	          results: results,
	          showMore: this.showMore,
	          isLastPage: isLastPage,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = connectMenu;
	
	var _utils = __webpack_require__(153);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var usage = 'Usage:\nvar customMenu = connectMenu(function render(params, isFirstRendering) {\n  // params = {\n  //   items,\n  //   createURL,\n  //   refine,\n  //   instantSearchInstance,\n  //   canRefine,\n  //   widgetParams,\n  //   isShowingMore,\n  //   toggleShowMore\n  // }\n});\nsearch.addWidget(\n  customMenu({\n    attributeName,\n    [ limit ],\n    [ showMoreLimit ]\n    [ sortBy = [\'name:asc\'] ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectMenu.html\n';
	
	/**
	 * @typedef {Object} MenuItem
	 * @property {string} value The value of the menu item.
	 * @property {string} label Human-readable value of the menu item.
	 * @property {number} count Number of results matched after refinement is applied.
	 * @property {isRefined} boolean Indicates if the refinement is applied.
	 */
	
	/**
	 * @typedef {Object} CustomMenuWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
	 * @property {number} [limit = 10] How many facets values to retrieve.
	 * @property {number} [showMoreLimit = undefined] How many facets values to retrieve when `toggleShowMore` is called, this value is meant to be greater than `limit` option.
	 * @property {string[]|function} [sortBy = ['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
	 *
	 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
	 */
	
	/**
	 * @typedef {Object} MenuRenderingOptions
	 * @property {MenuItem[]} items The elements that can be refined for the current search results.
	 * @property {function(item.value): string} createURL Creates the URL for a single item name in the list.
	 * @property {function(item.value)} refine Filter the search to item value.
	 * @property {boolean} canRefine True if refinement can be applied.
	 * @property {Object} widgetParams All original `CustomMenuWidgetOptions` forwarded to the `renderFn`.
	 * @property {boolean} isShowingMore True if the menu is displaying all the menu items.
	 * @property {function} toggleShowMore Toggles the number of values displayed between `limit` and `showMore.limit`.
	 */
	
	/**
	 * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
	 *
	 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
	 * function to select an item. While selecting a new element, the `refine` will also unselect the
	 * one that is currently selected.
	 *
	* **Requirement:** the attribute passed as `attributeName` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
	 * @type {Connector}
	 * @param {function(MenuRenderingOptions, boolean)} renderFn Rendering function for the custom **Menu** widget. widget.
	 * @return {function(CustomMenuWidgetOptions)} Re-usable widget factory for a custom **Menu** widget.
	 * @example
	 * // custom `renderFn` to render the custom Menu widget
	 * function renderFn(MenuRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     MenuRenderingOptions.widgetParams.containerNode
	 *       .html('<select></select');
	 *
	 *     MenuRenderingOptions.widgetParams.containerNode
	 *       .find('select')
	 *       .on('change', function(event) {
	 *         MenuRenderingOptions.refine(event.target.value);
	 *       });
	 *   }
	 *
	 *   var options = MenuRenderingOptions.items.map(function(item) {
	 *     return item.isRefined
	 *       ? '<option value="' + item.value + '" selected>' + item.label + '</option>'
	 *       : '<option value="' + item.value + '">' + item.label + '</option>';
	 *   });
	 *
	 *   MenuRenderingOptions.widgetParams.containerNode
	 *     .find('select')
	 *     .html(options);
	 * }
	 *
	 * // connect `renderFn` to Menu logic
	 * var customMenu = instantsearch.connectors.connectMenu(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customMenu({
	 *     containerNode: $('#custom-menu-container'),
	 *     attributeName: 'categories',
	 *     limit: 10,
	 *   })
	 * );
	 */
	function connectMenu(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        _widgetParams$limit = widgetParams.limit,
	        limit = _widgetParams$limit === undefined ? 10 : _widgetParams$limit,
	        _widgetParams$sortBy = widgetParams.sortBy,
	        sortBy = _widgetParams$sortBy === undefined ? ['name:asc'] : _widgetParams$sortBy,
	        showMoreLimit = widgetParams.showMoreLimit;
	
	
	    if (!attributeName || !isNaN(showMoreLimit) && showMoreLimit < limit) {
	      throw new Error(usage);
	    }
	
	    return {
	      isShowingMore: false,
	
	      // Provide the same function to the `renderFn` so that way the user
	      // has to only bind it once when `isFirstRendering` for instance
	      toggleShowMore: function toggleShowMore() {},
	      cachedToggleShowMore: function cachedToggleShowMore() {
	        this.toggleShowMore();
	      },
	      createToggleShowMore: function createToggleShowMore(_ref) {
	        var _this = this;
	
	        var results = _ref.results,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        return function () {
	          _this.isShowingMore = !_this.isShowingMore;
	          _this.render({ results: results, instantSearchInstance: instantSearchInstance });
	        };
	      },
	      getLimit: function getLimit() {
	        return this.isShowingMore ? showMoreLimit : limit;
	      },
	      getConfiguration: function getConfiguration(configuration) {
	        var widgetConfiguration = {
	          hierarchicalFacets: [{
	            name: attributeName,
	            attributes: [attributeName]
	          }]
	        };
	
	        var currentMaxValuesPerFacet = configuration.maxValuesPerFacet || 0;
	        widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMoreLimit || limit);
	
	        return widgetConfiguration;
	      },
	      init: function init(_ref2) {
	        var helper = _ref2.helper,
	            createURL = _ref2.createURL,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        this.cachedToggleShowMore = this.cachedToggleShowMore.bind(this);
	
	        this._createURL = function (facetValue) {
	          return createURL(helper.state.toggleRefinement(attributeName, facetValue));
	        };
	
	        this._refine = function (facetValue) {
	          return helper.toggleRefinement(attributeName, facetValue).search();
	        };
	
	        renderFn({
	          items: [],
	          createURL: this._createURL,
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          canRefine: false,
	          widgetParams: widgetParams,
	          isShowingMore: this.isShowingMore,
	          toggleShowMore: this.cachedToggleShowMore
	        }, true);
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        var items = (results.getFacetValues(attributeName, { sortBy: sortBy }).data || []).slice(0, this.getLimit()).map(function (_ref4) {
	          var label = _ref4.name,
	              value = _ref4.path,
	              item = _objectWithoutProperties(_ref4, ['name', 'path']);
	
	          return _extends({}, item, { label: label, value: value });
	        });
	
	        this.toggleShowMore = this.createToggleShowMore({ results: results, instantSearchInstance: instantSearchInstance });
	
	        renderFn({
	          items: items,
	          createURL: this._createURL,
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          canRefine: items.length > 0,
	          widgetParams: widgetParams,
	          isShowingMore: this.isShowingMore,
	          toggleShowMore: this.cachedToggleShowMore
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectNumericRefinementList;
	
	var _includes = __webpack_require__(207);
	
	var _includes2 = _interopRequireDefault(_includes);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var usage = 'Usage:\nvar customNumericRefinementList = connectNumericRefinementList(function renderFn(params, isFirstRendering) {\n  // params = {\n  //   createURL,\n  //   items,\n  //   hasNoResults,\n  //   refine,\n  //   instantSearchInstance,\n  //   widgetParams,\n  //  }\n});\nsearch.addWidget(\n  customNumericRefinementList({\n    attributeName,\n    options,\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectNumericRefinementList.html\n';
	
	/**
	 * @typedef {Object} NumericRefinementListOption
	 * @property {string} name Name of the option.
	 * @property {number} start Lower bound of the option (>=).
	 * @property {number} end Higher bound of the option (<=).
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListItem
	 * @property {string} name Name of the option.
	 * @property {number} start Lower bound of the option (>=).
	 * @property {number} end Higher bound of the option (<=).
	 * @property {boolean} isRefined True if the value is selected.
	 * @property {string} attributeName The name of the attribute in the records.
	 */
	
	/**
	 * @typedef {Object} CustomNumericRefinementListWidgetOptions
	 * @property {string} attributeName Name of the attribute for filtering.
	 * @property {NumericRefinementListOption[]} options List of all the options.
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListRenderingOptions
	 * @property {function(item.value): string} createURL Creates URL's for the next state, the string is the name of the selected option.
	 * @property {NumericRefinementListItem[]} items The list of available choices.
	 * @property {boolean} hasNoResults `true` if the last search contains no result.
	 * @property {function(item.value)} refine Sets the selected value and trigger a new search.
	 * @property {Object} widgetParams All original `CustomNumericRefinementListWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **NumericRefinementList** connector provides the logic to build a custom widget that will give the user the ability to choose a range on to refine the search results.
	 *
	 * It provides a `refine(item)` function to refine on the selected range.
	 *
	 * **Requirement:** the attribute passed as `attributeName` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
	 * @function connectNumericRefinementList
	 * @type {Connector}
	 * @param {function(NumericRefinementListRenderingOptions, boolean)} renderFn Rendering function for the custom **NumericRefinementList** widget.
	 * @return {function(CustomNumericRefinementListWidgetOptions)} Re-usable widget factory for a custom **NumericRefinementList** widget.
	 * @example
	 * // custom `renderFn` to render the custom NumericRefinementList widget
	 * function renderFn(NumericRefinementListRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     NumericRefinementListRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
	 *   }
	 *
	 *   NumericRefinementListRenderingOptions.widgetParams.containerNode
	 *     .find('li[data-refine-value]')
	 *     .each(function() { $(this).off('click'); });
	 *
	 *   var list = NumericRefinementListRenderingOptions.items.map(function(item) {
	 *     return '<li data-refine-value="' + item.value + '">' +
	 *       '<input type="radio"' + (item.isRefined ? ' checked' : '') + '/> ' +
	 *       item.label + '</li>';
	 *   });
	 *
	 *   NumericRefinementListRenderingOptions.widgetParams.containerNode.find('ul').html(list);
	 *   NumericRefinementListRenderingOptions.widgetParams.containerNode
	 *     .find('li[data-refine-value]')
	 *     .each(function() {
	 *       $(this).on('click', function(event) {
	 *         event.preventDefault();
	 *         event.stopPropagation();
	 *         NumericRefinementListRenderingOptions.refine($(this).data('refine-value'));
	 *       });
	 *     });
	 * }
	 *
	 * // connect `renderFn` to NumericRefinementList logic
	 * var customNumericRefinementList = instantsearch.connectors.connectNumericRefinementList(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customNumericRefinementList({
	 *     containerNode: $('#custom-numeric-refinement-container'),
	 *     attributeName: 'price',
	 *     operator: 'or',
	 *     options: [
	 *       {name: 'All'},
	 *       {end: 4, name: 'less than 4'},
	 *       {start: 4, end: 4, name: '4'},
	 *       {start: 5, end: 10, name: 'between 5 and 10'},
	 *       {start: 10, name: 'more than 10'},
	 *     ],
	 *   })
	 * );
	 */
	function connectNumericRefinementList(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        options = widgetParams.options;
	
	
	    if (!attributeName || !options) {
	      throw new Error(usage);
	    }
	
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            createURL = _ref.createURL,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._refine = function (facetValue) {
	          var refinedState = refine(helper.state, attributeName, options, facetValue);
	          helper.setState(refinedState).search();
	        };
	
	        this._createURL = function (state) {
	          return function (facetValue) {
	            return createURL(refine(state, attributeName, options, facetValue));
	          };
	        };
	        this._prepareItems = function (state) {
	          return options.map(function (_ref2) {
	            var start = _ref2.start,
	                end = _ref2.end,
	                label = _ref2.name;
	            return {
	              label: label,
	              value: window.encodeURI(JSON.stringify({ start: start, end: end })),
	              isRefined: isRefined(state, attributeName, { start: start, end: end })
	            };
	          });
	        };
	
	        renderFn({
	          createURL: this._createURL(helper.state),
	          items: this._prepareItems(helper.state),
	          hasNoResults: true,
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            state = _ref3.state,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        renderFn({
	          createURL: this._createURL(state),
	          items: this._prepareItems(state),
	          hasNoResults: results.nbHits === 0,
	          refine: this._refine,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}
	
	function isRefined(state, attributeName, option) {
	  var currentRefinements = state.getNumericRefinements(attributeName);
	
	  if (option.start !== undefined && option.end !== undefined) {
	    if (option.start === option.end) {
	      return hasNumericRefinement(currentRefinements, '=', option.start);
	    }
	  }
	
	  if (option.start !== undefined) {
	    return hasNumericRefinement(currentRefinements, '>=', option.start);
	  }
	
	  if (option.end !== undefined) {
	    return hasNumericRefinement(currentRefinements, '<=', option.end);
	  }
	
	  if (option.start === undefined && option.end === undefined) {
	    return Object.keys(currentRefinements).length === 0;
	  }
	
	  return undefined;
	}
	
	function refine(state, attributeName, options, facetValue) {
	  var resolvedState = state;
	
	  var refinedOption = JSON.parse(window.decodeURI(facetValue));
	
	  var currentRefinements = resolvedState.getNumericRefinements(attributeName);
	
	  if (refinedOption.start === undefined && refinedOption.end === undefined) {
	    return resolvedState.clearRefinements(attributeName);
	  }
	
	  if (!isRefined(resolvedState, attributeName, refinedOption)) {
	    resolvedState = resolvedState.clearRefinements(attributeName);
	  }
	
	  if (refinedOption.start !== undefined && refinedOption.end !== undefined) {
	    if (refinedOption.start > refinedOption.end) {
	      throw new Error('option.start should be > to option.end');
	    }
	
	    if (refinedOption.start === refinedOption.end) {
	      if (hasNumericRefinement(currentRefinements, '=', refinedOption.start)) {
	        resolvedState = resolvedState.removeNumericRefinement(attributeName, '=', refinedOption.start);
	      } else {
	        resolvedState = resolvedState.addNumericRefinement(attributeName, '=', refinedOption.start);
	      }
	      return resolvedState;
	    }
	  }
	
	  if (refinedOption.start !== undefined) {
	    if (hasNumericRefinement(currentRefinements, '>=', refinedOption.start)) {
	      resolvedState = resolvedState.removeNumericRefinement(attributeName, '>=', refinedOption.start);
	    } else {
	      resolvedState = resolvedState.addNumericRefinement(attributeName, '>=', refinedOption.start);
	    }
	  }
	
	  if (refinedOption.end !== undefined) {
	    if (hasNumericRefinement(currentRefinements, '<=', refinedOption.end)) {
	      resolvedState = resolvedState.removeNumericRefinement(attributeName, '<=', refinedOption.end);
	    } else {
	      resolvedState = resolvedState.addNumericRefinement(attributeName, '<=', refinedOption.end);
	    }
	  }
	
	  return resolvedState;
	}
	
	function hasNumericRefinement(currentRefinements, operator, value) {
	  var hasOperatorRefinements = currentRefinements[operator] !== undefined;
	  var includesValue = (0, _includes2.default)(currentRefinements[operator], value);
	
	  return hasOperatorRefinements && includesValue;
	}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(119),
	    isArrayLike = __webpack_require__(37),
	    isString = __webpack_require__(194),
	    toInteger = __webpack_require__(185),
	    values = __webpack_require__(208);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;
	
	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}
	
	module.exports = includes;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(209),
	    keys = __webpack_require__(11);
	
	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}
	
	module.exports = values;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(173);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectNumericSelector;
	
	var _utils = __webpack_require__(153);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var usage = 'Usage:\nvar customNumericSelector = connectNumericSelector(function renderFn(params, isFirstRendering) {\n  // params = {\n  //   currentRefinement,\n  //   options,\n  //   refine,\n  //   hasNoResults,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customNumericSelector({\n    attributeName,\n    options,\n    [ operator = \'=\' ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectNumericSelector.html\n';
	
	/**
	 * @typedef {Object} NumericSelectorOption
	 * @property {number} value The numerical value to refine with.
	 * @property {string} label Label to display in the option.
	 */
	
	/**
	 * @typedef {Object} CustomNumericSelectorWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
	 * @property {NumericSelectorOption[]} options Array of objects defining the different values and labels.
	 * @property {string} [operator = '='] The operator to use to refine.
	 */
	
	/**
	 * @typedef {Object} NumericSelectorRenderingOptions
	 * @property {string} currentRefinement The currently selected value.
	 * @property {NumericSelectorOption[]} options The different values and labels of the selector.
	 * @property {function(option.value)} refine Updates the results with the selected value.
	 * @property {boolean} hasNoResults `true` if the last search contains no result.
	 * @property {Object} widgetParams All original `CustomNumericSelectorWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **NumericSelector** connector provides the logic to build a custom widget that will let the
	 * user filter the results based on a list of numerical filters.
	 *
	 * It provides a `refine(value)` function to trigger a new search with selected option.
	 * @type {Connector}
	 * @param {function(NumericSelectorRenderingOptions, boolean)} renderFn Rendering function for the custom **NumericSelector** widget.
	 * @return {function(CustomNumericSelectorWidgetOptions)} Re-usable widget factory for a custom **NumericSelector** widget.
	 * @example
	 * // custom `renderFn` to render the custom NumericSelector widget
	 * function renderFn(NumericSelectorRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     NumericSelectorRenderingOptions.widgetParams.containerNode.html('<select></select>');
	 *     NumericSelectorRenderingOptions.widgetParams.containerNode
	 *       .find('select')
	 *       .on('change', function(event) {
	 *         NumericSelectorRenderingOptions.refine(event.target.value);
	 *       })
	 *   }
	 *
	 *   var optionsHTML = NumericSelectorRenderingOptions.options.map(function(option) {
	 *     return '<option value="' + option.value + '"' +
	 *       (NumericSelectorRenderingOptions.currentRefinement === option.value ? ' selected' : '') + '>' +
	 *       option.label + '</option>';
	 *   });
	 *
	 *   NumericSelectorRenderingOptions.widgetParams.containerNode
	 *     .find('select')
	 *     .html(optionsHTML);
	 * }
	 *
	 * // connect `renderFn` to NumericSelector logic
	 * var customNumericSelector = instantsearch.connectors.connectNumericSelector(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customNumericSelector({
	 *     containerNode: $('#custom-numeric-selector-container'),
	 *     operator: '>=',
	 *     attributeName: 'popularity',
	 *     options: [
	 *       {label: 'Default', value: 0},
	 *       {label: 'Top 10', value: 9991},
	 *       {label: 'Top 100', value: 9901},
	 *       {label: 'Top 500', value: 9501},
	 *     ],
	 *   })
	 * );
	 */
	function connectNumericSelector(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        options = widgetParams.options,
	        _widgetParams$operato = widgetParams.operator,
	        operator = _widgetParams$operato === undefined ? '=' : _widgetParams$operato;
	
	
	    if (!attributeName || !options) {
	      throw new Error(usage);
	    }
	
	    return {
	      getConfiguration: function getConfiguration(currentSearchParameters, searchParametersFromUrl) {
	        return {
	          numericRefinements: _defineProperty({}, attributeName, _defineProperty({}, operator, [this._getRefinedValue(searchParametersFromUrl)]))
	        };
	      },
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._refine = function (value) {
	          helper.clearRefinements(attributeName);
	          if (value !== undefined) {
	            helper.addNumericRefinement(attributeName, operator, value);
	          }
	          helper.search();
	        };
	
	        renderFn({
	          currentRefinement: this._getRefinedValue(helper.state),
	          options: options,
	          refine: this._refine,
	          hasNoResults: true,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var helper = _ref2.helper,
	            results = _ref2.results,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        renderFn({
	          currentRefinement: this._getRefinedValue(helper.state),
	          options: options,
	          refine: this._refine,
	          hasNoResults: results.nbHits === 0,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      },
	      _getRefinedValue: function _getRefinedValue(state) {
	        // This is reimplementing state.getNumericRefinement
	        // But searchParametersFromUrl is not an actual SearchParameters object
	        // It's only the object structure without the methods, because getStateFromQueryString
	        // is not sending a SearchParameters. There's no way given how we built the helper
	        // to initialize a true partial state where only the refinements are present
	        return state && state.numericRefinements && state.numericRefinements[attributeName] !== undefined && state.numericRefinements[attributeName][operator] !== undefined && state.numericRefinements[attributeName][operator][0] !== undefined ? // could be 0
	        state.numericRefinements[attributeName][operator][0] : options[0].value;
	      }
	    };
	  };
	}

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectPagination;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customPagination = connectPagination(function render(params, isFirstRendering) {\n  // params = {\n  //   createURL,\n  //   currentRefinement,\n  //   nbHits,\n  //   nbPages,\n  //   refine,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customPagination({\n    [ maxPages ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectPagination.html\n';
	
	/**
	 * @typedef {Object} CustomPaginationWidgetOptions
	 * @property {number} [maxPages] The max number of pages to browse.
	 */
	
	/**
	 * @typedef {Object} PaginationRenderingOptions
	 * @property {function(page): string} createURL Creates URL's for the next state, the number is the page to generate the URL for.
	 * @property {number} currentRefinement The number of the page currently displayed.
	 * @property {number} nbHits The number of hits computed for the last query (can be approximated).
	 * @property {number} nbPages The number of pages for the result set.
	 * @property {function(page)} refine Sets the current page and trigger a search.
	 * @property {Object} widgetParams All original `CustomPaginationWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **Pagination** connector provides the logic to build a widget that will let the user
	 * choose the current page of the results.
	 *
	 * @type {Connector}
	 * @param {function(PaginationRenderingOptions, boolean)} renderFn Rendering function for the custom **Pagination** widget.
	 * @return {function(CustomPaginationWidgetOptions)} Re-usable widget factory for a custom **Pagination** widget.
	 * @example
	 * // custom `renderFn` to render the custom Pagination widget
	 * function renderFn(PaginationRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     PaginationRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
	 *   }
	 *
	 *   // remove event listeners before replacing markup
	 *   PaginationRenderingOptions.widgetParams.containerNode
	 *     .find('a[data-page]')
	 *     .each(function() { $(this).off('click'); });
	 *
	 *   var pages = Array.apply(null, {length: PaginationRenderingOptions.nbPages})
	 *     .map(Number.call, Number)
	 *     .map(function(page) {
	 *       return '<li style="display: inline-block; margin-right: 10px;">' +
	 *         '<a href="' + PaginationRenderingOptions.createURL(page) + '" data-page="' + page + '">' +
	 *         (parseInt(page) + 1) + '</a></li>';
	 *     });
	 *
	 *   PaginationRenderingOptions.widgetParams.containerNode
	 *     .find('ul')
	 *     .html(pages);
	 *
	 *   PaginationRenderingOptions.widgetParams.containerNode
	 *     .find('a[data-page]')
	 *     .each(function() {
	 *       $(this).on('click', function(event) {
	 *         event.preventDefault();
	 *         PaginationRenderingOptions.refine($(this).data('page'));
	 *       });
	 *     });
	 * }
	 *
	 * // connect `renderFn` to Pagination logic
	 * var customPagination = instantsearch.connectors.connectPagination(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customPagination({
	 *     containerNode: $('#custom-pagination-container'),
	 *     maxPages: 20,
	 *   })
	 * );
	 */
	function connectPagination(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var maxPages = widgetParams.maxPages;
	
	
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            createURL = _ref.createURL,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this.refine = function (page) {
	          helper.setPage(page);
	          helper.search();
	        };
	
	        this.createURL = function (state) {
	          return function (page) {
	            return createURL(state.setPage(page));
	          };
	        };
	
	        renderFn({
	          createURL: this.createURL(helper.state),
	          currentRefinement: helper.getPage() || 0,
	          nbHits: 0,
	          nbPages: 0,
	          refine: this.refine,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, true);
	      },
	      getMaxPage: function getMaxPage(_ref2) {
	        var nbPages = _ref2.nbPages;
	
	        return maxPages !== undefined ? Math.min(maxPages, nbPages) : nbPages;
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            state = _ref3.state,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        renderFn({
	          createURL: this.createURL(state),
	          currentRefinement: state.page,
	          refine: this.refine,
	          nbHits: results.nbHits,
	          nbPages: this.getMaxPage(results),
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectPriceRanges;
	
	var _utils = __webpack_require__(153);
	
	var _generateRanges2 = __webpack_require__(213);
	
	var _generateRanges3 = _interopRequireDefault(_generateRanges2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var usage = 'Usage:\nvar customPriceRanges = connectToggle(function render(params, isFirstRendering) {\n  // params = {\n  //   items,\n  //   refine,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customPriceRanges({\n    attributeName,\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectPriceRanges.html\n';
	
	/**
	 * @typedef {Object} PriceRangesItem
	 * @property {number} [from] Lower bound of the price range.
	 * @property {number} [to] Higher bound of the price range.
	 */
	
	/**
	 * @typedef {Object} CustomPriceRangesWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting.
	 */
	
	/**
	 * @typedef {Object} PriceRangesRenderingOptions
	 * @property {PriceRangesItem[]} items The prices ranges to display.
	 * @property {function(PriceRangesItem)} refine Selects or unselects a price range and trigger a search.
	 * @property {Object} widgetParams All original `CustomPriceRangesWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **PriceRanges** connector provides the logic to build a custom widget that will let
	 * the user refine results based on price ranges.
	 *
	 * @type {Connector}
	 * @param {function(PriceRangesRenderingOptions, boolean)} renderFn Rendering function for the custom **PriceRanges** widget.
	 * @return {function(CustomPriceRangesWidgetOptions)} Re-usable widget factory for a custom **PriceRanges** widget.
	 * @example
	 * function getLabel(item) {
	 *   var from = item.from;
	 *   var to = item.to;
	 *
	 *   if (to === undefined) return '≥ $' + from;
	 *   if (from === undefined) return '≤ $' + to;
	 *   return '$' + from + ' - $' + to;
	 * }
	 *
	 * // custom `renderFn` to render the custom PriceRanges widget
	 * function renderFn(PriceRangesRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     PriceRangesRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
	 *   }
	 *
	 *   PriceRangesRenderingOptions.widgetParams.containerNode
	 *     .find('ul > li')
	 *     .each(function() { $(this).off('click'); });
	 *
	 *   var list = PriceRangesRenderingOptions.items.map(function(item) {
	 *     return '<li><a href="' + item.url + '">' + getLabel(item) + '</a></li>';
	 *   });
	 *
	 *   PriceRangesRenderingOptions.widgetParams.containerNode
	 *     .find('ul')
	 *     .html(list);
	 *
	 *   PriceRangesRenderingOptions.widgetParams.containerNode
	 *     .find('li')
	 *     .each(function(index) {
	 *       $(this).on('click', function(event) {
	 *         event.stopPropagation();
	 *         event.preventDefault();
	 *
	 *         PriceRangesRenderingOptions.refine(
	 *           PriceRangesRenderingOptions.items[index]
	 *         );
	 *       });
	 *     });
	 * }
	 *
	 * // connect `renderFn` to PriceRanges logic
	 * var customPriceRanges = instantsearch.connectors.connectPriceRanges(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customPriceRanges({
	 *     containerNode: $('#custom-price-ranges-container'),
	 *     attributeName: 'price',
	 *   })
	 * );
	 */
	function connectPriceRanges(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName;
	
	
	    if (!attributeName) {
	      throw new Error(usage);
	    }
	
	    return {
	      getConfiguration: function getConfiguration() {
	        return { facets: [attributeName] };
	      },
	      _generateRanges: function _generateRanges(results) {
	        var stats = results.getFacetStats(attributeName);
	        return (0, _generateRanges3.default)(stats);
	      },
	      _extractRefinedRange: function _extractRefinedRange(helper) {
	        var refinements = helper.getRefinements(attributeName);
	        var from = void 0;
	        var to = void 0;
	
	        if (refinements.length === 0) {
	          return [];
	        }
	
	        refinements.forEach(function (v) {
	          if (v.operator.indexOf('>') !== -1) {
	            from = Math.floor(v.value[0]);
	          } else if (v.operator.indexOf('<') !== -1) {
	            to = Math.ceil(v.value[0]);
	          }
	        });
	        return [{ from: from, to: to, isRefined: true }];
	      },
	      _refine: function _refine(helper, _ref) {
	        var from = _ref.from,
	            to = _ref.to;
	
	        var facetValues = this._extractRefinedRange(helper);
	
	        helper.clearRefinements(attributeName);
	        if (facetValues.length === 0 || facetValues[0].from !== from || facetValues[0].to !== to) {
	          if (typeof from !== 'undefined') {
	            helper.addNumericRefinement(attributeName, '>=', Math.floor(from));
	          }
	          if (typeof to !== 'undefined') {
	            helper.addNumericRefinement(attributeName, '<=', Math.ceil(to));
	          }
	        }
	
	        helper.search();
	      },
	      init: function init(_ref2) {
	        var helper = _ref2.helper,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        this._refine = this._refine.bind(this, helper);
	
	        renderFn({
	          instantSearchInstance: instantSearchInstance,
	          items: [],
	          refine: this._refine,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref3) {
	        var results = _ref3.results,
	            helper = _ref3.helper,
	            state = _ref3.state,
	            createURL = _ref3.createURL,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        var facetValues = void 0;
	
	        if (results && results.hits && results.hits.length > 0) {
	          facetValues = this._extractRefinedRange(helper);
	
	          if (facetValues.length === 0) {
	            facetValues = this._generateRanges(results);
	          }
	        } else {
	          facetValues = [];
	        }
	
	        facetValues.map(function (facetValue) {
	          var newState = state.clearRefinements(attributeName);
	          if (!facetValue.isRefined) {
	            if (facetValue.from !== undefined) {
	              newState = newState.addNumericRefinement(attributeName, '>=', Math.floor(facetValue.from));
	            }
	            if (facetValue.to !== undefined) {
	              newState = newState.addNumericRefinement(attributeName, '<=', Math.ceil(facetValue.to));
	            }
	          }
	          facetValue.url = createURL(newState);
	          return facetValue;
	        });
	
	        renderFn({
	          items: facetValues,
	          refine: this._refine,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 213 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function round(v, precision) {
	  var res = Math.round(v / precision) * precision;
	  if (res < 1) {
	    res = 1;
	  }
	  return res;
	}
	
	function generateRanges(stats) {
	  // cannot compute any range
	  if (stats.min === stats.max) {
	    return [];
	  }
	
	  var precision = void 0;
	  if (stats.avg < 100) {
	    precision = 1;
	  } else if (stats.avg < 1000) {
	    precision = 10;
	  } else {
	    precision = 100;
	  }
	  var avg = round(Math.round(stats.avg), precision);
	  var min = Math.ceil(stats.min);
	  var max = round(Math.floor(stats.max), precision);
	  while (max > stats.max) {
	    max -= precision;
	  }
	
	  var next = void 0;
	  var from = void 0;
	  var facetValues = [];
	  if (min !== max) {
	    next = min;
	
	    facetValues.push({
	      to: next
	    });
	
	    while (next < avg) {
	      from = facetValues[facetValues.length - 1].to;
	      next = round(from + (avg - min) / 3, precision);
	      if (next <= from) {
	        next = from + 1;
	      }
	      facetValues.push({
	        from: from,
	        to: next
	      });
	    }
	    while (next < max) {
	      from = facetValues[facetValues.length - 1].to;
	      next = round(from + (max - avg) / 3, precision);
	      if (next <= from) {
	        next = from + 1;
	      }
	      facetValues.push({
	        from: from,
	        to: next
	      });
	    }
	
	    if (facetValues.length === 1) {
	      if (next !== avg) {
	        facetValues.push({
	          from: next,
	          to: avg
	        });
	        next = avg;
	      }
	    }
	
	    if (facetValues.length === 1) {
	      facetValues[0].from = stats.min;
	      facetValues[0].to = stats.max;
	    } else {
	      delete facetValues[facetValues.length - 1].to;
	    }
	  }
	  return facetValues;
	}
	
	exports.default = generateRanges;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectRangeSlider;
	
	var _utils = __webpack_require__(153);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var usage = 'Usage:\nvar customRangeSlider = connectRangeSlider(function render(params, isFirstRendering) {\n  // params = {\n  //   refine,\n  //   range,\n  //   start,\n  //   format,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customRangeSlider({\n    attributeName,\n    [ min ],\n    [ max ],\n    [ precision = 2 ],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectRangeSlider.html\n';
	
	/**
	 * @typedef {Object} CustomRangeSliderWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting.
	 * @property {number} [min = undefined] Minimal slider value, default to automatically computed from the result set.
	 * @property {number} [max = undefined] Maximal slider value, default to automatically computed from the result set.
	 * @property {number} [precision = 2] Number of digits after decimal point to use.
	 */
	
	/**
	 * @typedef {Object} RangeSliderRenderingOptions
	 * @property {function({min: number, max: number})} refine Sets a range to filter the results on. Both values
	 * are optional, and will default to the higher and lower bounds.
	 * @property {{min: number, max: number}} numeric Results bounds without the current range filter.
	 * @property {Array<number, number>} start Current numeric bounds of the search.
	 * @property {{from: function, to: function}} formatter Transform for the rendering `from` and/or `to` values.
	 * Both functions take a `number` as input and should output a `string`.
	 * @property {Object} widgetParams All original `CustomRangeSliderWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **RangeSlider** connector provides the logic to create custom widget that will let
	 * the user refine results using a numeric range.
	 *
	 * Thic connectors provides a `refine()` function that accepts bounds. It will also provide
	 * information about the min and max bounds for the current result set.
	 * @type {Connector}
	 * @param {function(RangeSliderRenderingOptions, boolean)} renderFn Rendering function for the custom **RangeSlider** widget.
	 * @return {function(CustomRangeSliderWidgetOptions)} Re-usable widget factory for a custom **RangeSlider** widget.
	 */
	function connectRangeSlider(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        userMin = widgetParams.min,
	        userMax = widgetParams.max,
	        _widgetParams$precisi = widgetParams.precision,
	        precision = _widgetParams$precisi === undefined ? 2 : _widgetParams$precisi;
	
	
	    if (!attributeName) {
	      throw new Error(usage);
	    }
	
	    var formatToNumber = function formatToNumber(v) {
	      return Number(Number(v).toFixed(precision));
	    };
	
	    var sliderFormatter = {
	      from: function from(v) {
	        return v;
	      },
	      to: function to(v) {
	        return formatToNumber(v).toLocaleString();
	      }
	    };
	
	    return {
	      getConfiguration: function getConfiguration(originalConf) {
	        var conf = {
	          disjunctiveFacets: [attributeName]
	        };
	
	        var hasUserBounds = userMin !== undefined || userMax !== undefined;
	        var boundsNotAlreadyDefined = !originalConf || originalConf.numericRefinements && originalConf.numericRefinements[attributeName] === undefined;
	
	        if (hasUserBounds && boundsNotAlreadyDefined) {
	          conf.numericRefinements = _defineProperty({}, attributeName, {});
	          if (userMin !== undefined) conf.numericRefinements[attributeName]['>='] = [userMin];
	          if (userMax !== undefined) conf.numericRefinements[attributeName]['<='] = [userMax];
	        }
	
	        return conf;
	      },
	
	      _getCurrentRefinement: function _getCurrentRefinement(helper) {
	        var min = helper.state.getNumericRefinement(attributeName, '>=');
	        var max = helper.state.getNumericRefinement(attributeName, '<=');
	
	        if (min && min.length) {
	          min = min[0];
	        } else {
	          min = -Infinity;
	        }
	
	        if (max && max.length) {
	          max = max[0];
	        } else {
	          max = Infinity;
	        }
	
	        return {
	          min: min,
	          max: max
	        };
	      },
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._refine = function (bounds) {
	          return function (newValues) {
	            helper.clearRefinements(attributeName);
	            if (!bounds.min || newValues[0] > bounds.min) {
	              helper.addNumericRefinement(attributeName, '>=', formatToNumber(newValues[0]));
	            }
	            if (!bounds.max || newValues[1] < bounds.max) {
	              helper.addNumericRefinement(attributeName, '<=', formatToNumber(newValues[1]));
	            }
	            helper.search();
	          };
	        };
	
	        var stats = {
	          min: userMin || null,
	          max: userMax || null
	        };
	        var currentRefinement = this._getCurrentRefinement(helper);
	
	        renderFn({
	          refine: this._refine(stats),
	          range: { min: Math.floor(stats.min), max: Math.ceil(stats.max) },
	          start: [currentRefinement.min, currentRefinement.max],
	          format: sliderFormatter,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, true);
	      },
	      render: function render(_ref2) {
	        var results = _ref2.results,
	            helper = _ref2.helper,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        var facet = (results.disjunctiveFacets || []).find(function (_ref3) {
	          var name = _ref3.name;
	          return name === attributeName;
	        });
	        var stats = facet !== undefined && facet.stats !== undefined ? facet.stats : {
	          min: null,
	          max: null
	        };
	
	        if (userMin !== undefined) stats.min = userMin;
	        if (userMax !== undefined) stats.max = userMax;
	
	        var currentRefinement = this._getCurrentRefinement(helper);
	
	        renderFn({
	          refine: this._refine(stats),
	          range: { min: Math.floor(stats.min), max: Math.ceil(stats.max) },
	          start: [currentRefinement.min, currentRefinement.max],
	          format: sliderFormatter,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkUsage = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = connectRefinementList;
	
	var _utils = __webpack_require__(153);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var usage = 'Usage:\nvar customRefinementList = connectRefinementList(function render(params) {\n  // params = {\n  //   isFromSearch,\n  //   createURL,\n  //   items,\n  //   refine,\n  //   searchForItems,\n  //   instantSearchInstance,\n  //   canRefine,\n  //   toggleShowMore,\n  //   isShowingMore,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customRefinementList({\n    attributeName,\n    [ operator = \'or\' ],\n    [ limit ],\n    [ showMoreLimit ],\n    [ sortBy = [\'isRefined\', \'count:desc\', \'name:asc\']],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectRefinementList.html\n';
	
	var checkUsage = exports.checkUsage = function checkUsage(_ref) {
	  var attributeName = _ref.attributeName,
	      operator = _ref.operator,
	      usageMessage = _ref.usageMessage,
	      showMoreLimit = _ref.showMoreLimit,
	      limit = _ref.limit;
	
	  var noAttributeName = attributeName === undefined;
	  var invalidOperator = !/^(and|or)$/.test(operator);
	  var invalidShowMoreLimit = showMoreLimit !== undefined ? isNaN(showMoreLimit) || showMoreLimit < limit : false;
	
	  if (noAttributeName || invalidOperator || invalidShowMoreLimit) {
	    throw new Error(usageMessage);
	  }
	};
	
	/**
	 * @typedef {Object} RefinementListItem
	 * @property {string} value The value of the refinement list item.
	 * @property {string} label Human-readable value of the refinement list item.
	 * @property {number} count Number of matched results after refinement is applied.
	 * @property {boolean} isRefined Indicates if the list item is refined.
	 */
	
	/**
	 * @typedef {Object} CustomRefinementListWidgetOptions
	 * @property {string} attributeName The name of the attribute in the records.
	 * @property {"and"|"or"} [operator = 'or'] How the filters are combined together.
	 * @property {number} [limit = undefined] The max number of items to display when
	 * `showMoreLimit` is not or if the widget is showing less value.
	 * @property {number} [showMoreLimit] The max number of items to display if the widget
	 * is showing more items.
	 * @property {string[]|function} [sortBy = ['isRefined', 'count:desc', 'name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
	 */
	
	/**
	 * @typedef {Object} RefinementListRenderingOptions
	 * @property {RefinementListItem[]} items The list of filtering values returned from Algolia API.
	 * @property {function(item.value): string} createURL Creates the next state url for a selected refinement.
	 * @property {function(item.value)} refine Action to apply selected refinements.
	 * @property {function} searchForItems Searches for values inside the list.
	 * @property {boolean} isFromSearch `true` if the values are from an index search.
	 * @property {boolean} canRefine `true` if a refinement can be applied.
	 * @property {Object} widgetParams All original `CustomRefinementListWidgetOptions` forwarded to the `renderFn`.
	 * @property {boolean} isShowingMore True if the menu is displaying all the menu items.
	 * @property {function} toggleShowMore Toggles the number of values displayed between `limit` and `showMoreLimit`.
	 */
	
	/**
	 * **RefinementList** connector provides the logic to build a custom widget that will let the
	 * user filter the results based on the values of a specific facet.
	 *
	  * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
	  * function to select an item.
	 * @type {Connector}
	 * @param {function(RefinementListRenderingOptions, boolean)} renderFn Rendering function for the custom **RefinementList** widget.
	 * @return {function(CustomRefinementListWidgetOptions)} Re-usable widget factory for a custom **RefinementList** widget.
	 * @example
	 * // custom `renderFn` to render the custom RefinementList widget
	 * function renderFn(RefinementListRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     RefinementListRenderingOptions.widgetParams.containerNode
	 *       .html('<ul></ul>')
	 *   }
	 *
	 *     RefinementListRenderingOptions.widgetParams.containerNode
	 *       .find('li[data-refine-value]')
	 *       .each(function() { $(this).off('click'); });
	 *
	 *   if (RefinementListRenderingOptions.canRefine) {
	 *     var list = RefinementListRenderingOptions.items.map(function(item) {
	 *       return `
	 *         <li data-refine-value="${item.value}">
	 *           <input type="checkbox" value="${item.value}" ${item.isRefined ? 'checked' : ''} />
	 *           <a href="${RefinementListRenderingOptions.createURL(item.value)}">
	 *             ${item.label} (${item.count})
	 *           </a>
	 *         </li>
	 *       `;
	 *     });
	 *
	 *     RefinementListRenderingOptions.widgetParams.containerNode.find('ul').html(list);
	 *     RefinementListRenderingOptions.widgetParams.containerNode
	 *       .find('li[data-refine-value]')
	 *       .each(function() {
	 *         $(this).on('click', function(event) {
	 *           event.stopPropagation();
	 *           event.preventDefault();
	 *
	 *           RefinementListRenderingOptions.refine($(this).data('refine-value'));
	 *         });
	 *       });
	 *   } else {
	 *     RefinementListRenderingOptions.widgetParams.containerNode.find('ul').html('');
	 *   }
	 * }
	 *
	 * // connect `renderFn` to RefinementList logic
	 * var customRefinementList = instantsearch.connectors.connectRefinementList(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customRefinementList({
	 *     containerNode: $('#custom-refinement-list-container'),
	 *     attributeName: 'categories',
	 *     limit: 10,
	 *   })
	 * );
	 */
	function connectRefinementList(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        _widgetParams$operato = widgetParams.operator,
	        operator = _widgetParams$operato === undefined ? 'or' : _widgetParams$operato,
	        limit = widgetParams.limit,
	        showMoreLimit = widgetParams.showMoreLimit,
	        _widgetParams$sortBy = widgetParams.sortBy,
	        sortBy = _widgetParams$sortBy === undefined ? ['isRefined', 'count:desc', 'name:asc'] : _widgetParams$sortBy;
	
	
	    checkUsage({ attributeName: attributeName, operator: operator, usage: usage, limit: limit, showMoreLimit: showMoreLimit });
	
	    var formatItems = function formatItems(_ref2) {
	      var label = _ref2.name,
	          item = _objectWithoutProperties(_ref2, ['name']);
	
	      return _extends({}, item, { label: label, value: label, highlighted: label });
	    };
	
	    var _render = function _render(_ref3) {
	      var items = _ref3.items,
	          state = _ref3.state,
	          createURL = _ref3.createURL,
	          helperSpecializedSearchFacetValues = _ref3.helperSpecializedSearchFacetValues,
	          refine = _ref3.refine,
	          isFromSearch = _ref3.isFromSearch,
	          isFirstSearch = _ref3.isFirstSearch,
	          isShowingMore = _ref3.isShowingMore,
	          toggleShowMore = _ref3.toggleShowMore,
	          hasExhaustiveItems = _ref3.hasExhaustiveItems,
	          instantSearchInstance = _ref3.instantSearchInstance;
	
	      // Compute a specific createURL method able to link to any facet value state change
	      var _createURL = function _createURL(facetValue) {
	        return createURL(state.toggleRefinement(attributeName, facetValue));
	      };
	
	      // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
	      // function
	      var searchFacetValues = helperSpecializedSearchFacetValues && helperSpecializedSearchFacetValues(state, createURL, helperSpecializedSearchFacetValues, refine, instantSearchInstance);
	
	      renderFn({
	        createURL: _createURL,
	        items: items,
	        refine: refine,
	        searchForItems: searchFacetValues,
	        instantSearchInstance: instantSearchInstance,
	        isFromSearch: isFromSearch,
	        canRefine: isFromSearch || items.length > 0,
	        widgetParams: widgetParams,
	        isShowingMore: isShowingMore,
	        toggleShowMore: toggleShowMore,
	        hasExhaustiveItems: hasExhaustiveItems
	      }, isFirstSearch);
	    };
	
	    var lastResultsFromMainSearch = void 0;
	    var searchForFacetValues = void 0;
	    var refine = void 0;
	
	    var createSearchForFacetValues = function createSearchForFacetValues(helper) {
	      return function (state, createURL, helperSpecializedSearchFacetValues, toggleRefinement, instantSearchInstance) {
	        return function (query) {
	          if (query === '' && lastResultsFromMainSearch) {
	            // render with previous data from the helper.
	            _render({
	              items: lastResultsFromMainSearch,
	              state: state,
	              createURL: createURL,
	              helperSpecializedSearchFacetValues: helperSpecializedSearchFacetValues,
	              refine: toggleRefinement,
	              isFromSearch: false,
	              isFirstSearch: false,
	              instantSearchInstance: instantSearchInstance,
	              hasExhaustiveItems: false });
	          } else {
	            helper.searchForFacetValues(attributeName, query).then(function (results) {
	              var facetValues = results.facetHits;
	
	              _render({
	                items: facetValues,
	                state: state,
	                createURL: createURL,
	                helperSpecializedSearchFacetValues: helperSpecializedSearchFacetValues,
	                refine: toggleRefinement,
	                isFromSearch: true,
	                isFirstSearch: false,
	                instantSearchInstance: instantSearchInstance,
	                hasExhaustiveItems: false });
	            });
	          }
	        };
	      };
	    };
	
	    return {
	      isShowingMore: false,
	
	      // Provide the same function to the `renderFn` so that way the user
	      // has to only bind it once when `isFirstRendering` for instance
	      toggleShowMore: function toggleShowMore() {},
	      cachedToggleShowMore: function cachedToggleShowMore() {
	        this.toggleShowMore();
	      },
	      createToggleShowMore: function createToggleShowMore(renderOptions) {
	        var _this = this;
	
	        return function () {
	          _this.isShowingMore = !_this.isShowingMore;
	          _this.render(renderOptions);
	        };
	      },
	      getLimit: function getLimit() {
	        return this.isShowingMore ? showMoreLimit : limit;
	      },
	
	
	      getConfiguration: function getConfiguration() {
	        var configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        var widgetConfiguration = _defineProperty({}, operator === 'and' ? 'facets' : 'disjunctiveFacets', [attributeName]);
	
	        if (limit !== undefined) {
	          var currentMaxValuesPerFacet = configuration.maxValuesPerFacet || 0;
	          if (showMoreLimit === undefined) {
	            widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, limit);
	          } else {
	            widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, limit, showMoreLimit);
	          }
	        }
	
	        return widgetConfiguration;
	      },
	      init: function init(_ref4) {
	        var helper = _ref4.helper,
	            createURL = _ref4.createURL,
	            instantSearchInstance = _ref4.instantSearchInstance;
	
	        this.cachedToggleShowMore = this.cachedToggleShowMore.bind(this);
	
	        refine = function refine(facetValue) {
	          return helper.toggleRefinement(attributeName, facetValue).search();
	        };
	
	        searchForFacetValues = createSearchForFacetValues(helper);
	
	        _render({
	          items: [],
	          state: helper.state,
	          createURL: createURL,
	          helperSpecializedSearchFacetValues: searchForFacetValues,
	          refine: refine,
	          isFromSearch: false,
	          isFirstSearch: true,
	          instantSearchInstance: instantSearchInstance,
	          isShowingMore: this.isShowingMore,
	          toggleShowMore: this.cachedToggleShowMore,
	          hasExhaustiveItems: true
	        });
	      },
	      render: function render(renderOptions) {
	        var results = renderOptions.results,
	            state = renderOptions.state,
	            createURL = renderOptions.createURL,
	            instantSearchInstance = renderOptions.instantSearchInstance;
	
	        var items = results.getFacetValues(attributeName, { sortBy: sortBy }).slice(0, this.getLimit()).map(formatItems);
	
	        var hasExhaustiveItems = items.length < this.getLimit();
	
	        lastResultsFromMainSearch = items;
	
	        this.toggleShowMore = this.createToggleShowMore(renderOptions);
	
	        _render({
	          items: items,
	          state: state,
	          createURL: createURL,
	          helperSpecializedSearchFacetValues: searchForFacetValues,
	          refine: refine,
	          isFromSearch: false,
	          isFirstSearch: false,
	          instantSearchInstance: instantSearchInstance,
	          isShowingMore: this.isShowingMore,
	          toggleShowMore: this.cachedToggleShowMore,
	          hasExhaustiveItems: hasExhaustiveItems
	        });
	      }
	    };
	  };
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectSearchBox;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customSearchBox = connectSearchBox(function render(params, isFirstRendering) {\n  // params = {\n  //   query,\n  //   onHistoryChange,\n  //   search,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customSearchBox({\n    [ queryHook ],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectSearchBox.html\n';
	
	/**
	 * @typedef {Object} CustomSearchBoxWidgetOptions
	 * @property {function(string, function(string))} [queryHook = undefined] A function that will be called every time
	 * a new value for the query is set. The first parameter is the query and the second is a
	 * function to actually trigger the search. The function takes the query as the parameter.
	 *
	 * This queryHook can be used to debounce the number of searches done from the searchBox.
	 */
	
	/**
	 * @typedef {Object} SearchBoxRenderingOptions
	 * @property {string} query The query from the last search.
	 * @property {function(SearchParameters)} onHistoryChange Registers a callback when the browser history changes.
	 * @property {function(string)} refine Sets a new query and searches.
	 * @property {Object} widgetParams All original `CustomSearchBoxWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
	 *
	 * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
	 * may be impacted by the `queryHook` widget parameter.
	 * @type {Connector}
	 * @param {function(SearchBoxRenderingOptions, boolean)} renderFn Rendering function for the custom **SearchBox** widget.
	 * @return {function(CustomSearchBoxWidgetOptions)} Re-usable widget factory for a custom **SearchBox** widget.
	 * @example
	 * // custom `renderFn` to render the custom SearchBox widget
	 * function renderFn(SearchBoxRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     SearchBoxRenderingOptions.widgetParams.containerNode.html('<input type="text" />');
	 *     SearchBoxRenderingOptions.widgetParams.containerNode
	 *       .find('input')
	 *       .on('keyup', function() {
	 *         SearchBoxRenderingOptions.refine($(this).val());
	 *       });
	 *     SearchBoxRenderingOptions.widgetParams.containerNode
	 *       .find('input')
	 *       .val(SearchBoxRenderingOptions.query);
	 *   }
	 * }
	 *
	 * // connect `renderFn` to SearchBox logic
	 * var customSearchBox = instantsearch.connectors.connectSearchBox(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customSearchBox({
	 *     containerNode: $('#custom-searchbox'),
	 *   })
	 * );
	 */
	function connectSearchBox(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var queryHook = widgetParams.queryHook;
	
	
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            onHistoryChange = _ref.onHistoryChange,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._refine = function () {
	          var previousQuery = void 0;
	
	          var setQueryAndSearch = function setQueryAndSearch(q) {
	            var doSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            if (q !== helper.state.query) {
	              previousQuery = helper.state.query;
	              helper.setQuery(q);
	            }
	            if (doSearch && previousQuery !== undefined && previousQuery !== q) helper.search();
	          };
	
	          return queryHook ? function (q) {
	            return queryHook(q, setQueryAndSearch);
	          } : setQueryAndSearch;
	        }();
	
	        this._onHistoryChange = onHistoryChange;
	
	        renderFn({
	          query: helper.state.query,
	          onHistoryChange: this._onHistoryChange,
	          refine: this._refine,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, true);
	      },
	      render: function render(_ref2) {
	        var helper = _ref2.helper,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        renderFn({
	          query: helper.state.query,
	          onHistoryChange: this._onHistoryChange,
	          refine: this._refine,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectSortBySelector;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customSortBySelector = connectSortBySelector(function render(params, isFirstRendering) {\n  // params = {\n  //   currentRefinement,\n  //   options,\n  //   refine,\n  //   hasNoResults,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customSortBySelector({ indices })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectSortBySelector.html\n';
	
	/**
	 * @typedef {Object} SortBySelectorIndices
	 * @property {string} name Name of the index to target.
	 * @property {string} label Label to display for the targettded index.
	 */
	
	/**
	 * @typedef {Object} CustomSortBySelectorWidgetOptions
	 * @property {SortBySelectorIndices[]} indices Array of objects defining the different indices to choose from.
	 */
	
	/**
	 * @typedef {Object} SortBySelectorRenderingOptions
	 * @property {string} currentRefinement The currently selected index.
	 * @property {SortBySelectorIndices[]} options All the available indices
	 * @property {function(string)} refine Switches indices and triggers a new search.
	 * @property {boolean} hasNoResults `true` if the last search contains no result.
	 * @property {Object} widgetParams All original `CustomSortBySelectorWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * The **SortBySelector** connector provides the logic to build a custom widget that will display a
	 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
	 * a user to change how the hits are being sorted.
	 *
	 * This connector provides the `refine` function that allows to switch indices.
	 * The connector provides to the rendering: `refine()` to swith the current index and
	 * `options` that are the values that can be selected. `refine` should be used
	 * with `options.value`.
	 * @type {Connector}
	 * @param {function(SortBySelectorRenderingOptions, boolean)} renderFn Rendering function for the custom **SortBySelector** widget.
	 * @return {function(CustomSortBySelectorWidgetOptions)} Re-usable widget factory for a custom **SortBySelector** widget.
	 * @example
	 * // custom `renderFn` to render the custom SortBySelector widget
	 * function renderFn(SortBySelectorRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     SortBySelectorRenderingOptions.widgetParams.containerNode.html('<select></select>');
	 *     SortBySelectorRenderingOptions.widgetParams.containerNode
	 *       .find('select')
	 *       .on('change', function(event) {
	 *         SortBySelectorRenderingOptions.refine(event.target.value);
	 *       });
	 *   }
	 *
	 *   var optionsHTML = SortBySelectorRenderingOptions.options.map(function(option) {
	 *     return `
	 *       <option
	 *         value="${option.value}"
	 *         ${SortBySelectorRenderingOptions.currentRefinement === option.value ? 'selected' : ''}
	 *       >
	 *         ${option.label}
	 *       </option>
	 *     `;
	 *   });
	 *
	 *   SortBySelectorRenderingOptions.widgetParams.containerNode
	 *     .find('select')
	 *     .html(optionsHTML);
	 * }
	 *
	 * // connect `renderFn` to SortBySelector logic
	 * var customSortBySelector = instantsearch.connectors.connectSortBySelector(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customSortBySelector({
	 *     containerNode: $('#custom-sortby-selector-container'),
	 *     indices: [
	 *       {name: 'instant_search', label: 'Most relevant'},
	 *       {name: 'instant_search_price_asc', label: 'Lowest price'},
	 *       {name: 'instant_search_price_desc', label: 'Highest price'},
	 *     ],
	 *   })
	 * );
	 */
	function connectSortBySelector(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var indices = widgetParams.indices;
	
	
	    if (!indices) {
	      throw new Error(usage);
	    }
	
	    var selectorOptions = indices.map(function (_ref) {
	      var label = _ref.label,
	          name = _ref.name;
	      return { label: label, value: name };
	    });
	
	    return {
	      init: function init(_ref2) {
	        var helper = _ref2.helper,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        var currentIndex = helper.getIndex();
	        var isIndexInList = indices.find(function (_ref3) {
	          var name = _ref3.name;
	          return name === currentIndex;
	        });
	
	        if (!isIndexInList) {
	          throw new Error('[sortBySelector]: Index ' + currentIndex + ' not present in `indices`');
	        }
	
	        this.setIndex = function (indexName) {
	          return helper.setIndex(indexName).search();
	        };
	
	        renderFn({
	          currentRefinement: currentIndex,
	          options: selectorOptions,
	          refine: this.setIndex,
	          hasNoResults: true,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, true);
	      },
	      render: function render(_ref4) {
	        var helper = _ref4.helper,
	            results = _ref4.results,
	            instantSearchInstance = _ref4.instantSearchInstance;
	
	        renderFn({
	          currentRefinement: helper.getIndex(),
	          options: selectorOptions,
	          refine: this.setIndex,
	          hasNoResults: results.nbHits === 0,
	          widgetParams: widgetParams,
	          instantSearchInstance: instantSearchInstance
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectStarRating;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customStarRating = connectStarRating(function render(params, isFirstRendering) {\n  // params = {\n  //   items,\n  //   createURL,\n  //   refine,\n  //   instantSearchInstance,\n  //   hasNoResults,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customStarRatingI({\n    attributeName,\n    [ max=5 ],\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectStarRating.html\n';
	
	/**
	 * @typedef {Object} StarRatingItems
	 * @property {string} name Name corresponding to the number of stars.
	 * @property {string} value Number of stars as string.
	 * @property {number} count Count of matched results corresponding to the number of stars.
	 * @property {boolean[]} stars Array of length of maximum rating value with stars to display or not.
	 * @property {boolean} isRefined Indicates if star rating refinement is applied.
	 */
	
	/**
	 * @typedef {Object} CustomStarRatingWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
	 * @property {number} [max = 5] The maximum rating value.
	 */
	
	/**
	 * @typedef {Object} StarRatingRenderingOptions
	 * @property {StarRatingItems[]} items Possible star ratings the user can apply.
	 * @property {function(string): string} createURL Creates an URL for the next
	 * state (takes the item value as parameter). Takes the value of an item as parameter.
	 * @property {function(string)} refine Selects a rating to filter the results
	 * (takes the filter value as parameter). Takes the value of an item as parameter.
	 * @property {boolean} hasNoResults `true` if the last search contains no result.
	 * @property {Object} widgetParams All original `CustomStarRatingWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **StarRating** connector provides the logic to build a custom widget that will let
	 * the user refine search results based on ratings.
	 *
	 * The connector provides to the rendering: `refine()` to select a value and
	 * `items` that are the values that can be selected. `refine` should be used
	 * with `items.value`.
	 * @type {Connector}
	 * @param {function(StarRatingRenderingOptions, boolean)} renderFn Rendering function for the custom **StarRating** widget.
	 * @return {function(CustomStarRatingWidgetOptions)} Re-usable widget factory for a custom **StarRating** widget.
	 * @example
	 * // custom `renderFn` to render the custom StarRating widget
	 * function renderFn(StarRatingRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) {
	 *     StarRatingRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
	 *   }
	 *
	 *   StarRatingRenderingOptions.widgetParams.containerNode
	 *     .find('li[data-refine-value]')
	 *     .each(function() { $(this).off('click'); });
	 *
	 *   var listHTML = StarRatingRenderingOptions.items.map(function(item) {
	 *     return '<li data-refine-value="' + item.value + '">' +
	 *       '<a href="' + StarRatingRenderingOptions.createURL(item.value) + '">' +
	 *       item.stars.map(function(star) { return star === false ? '☆' : '★'; }).join(' ') +
	 *       '& up (' + item.count + ')' +
	 *       '</a></li>';
	 *   });
	 *
	 *   StarRatingRenderingOptions.widgetParams.containerNode
	 *     .find('ul')
	 *     .html(listHTML);
	 *
	 *   StarRatingRenderingOptions.widgetParams.containerNode
	 *     .find('li[data-refine-value]')
	 *     .each(function() {
	 *       $(this).on('click', function(event) {
	 *         event.preventDefault();
	 *         event.stopPropagation();
	 *
	 *         StarRatingRenderingOptions.refine($(this).data('refine-value'));
	 *       });
	 *     });
	 * }
	 *
	 * // connect `renderFn` to StarRating logic
	 * var customStarRating = instantsearch.connectors.connectStarRating(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customStarRating({
	 *     containerNode: $('#custom-star-rating-container'),
	 *     attributeName: 'rating',
	 *     max: 5,
	 *   })
	 * );
	 */
	function connectStarRating(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        _widgetParams$max = widgetParams.max,
	        max = _widgetParams$max === undefined ? 5 : _widgetParams$max;
	
	
	    if (!attributeName) {
	      throw new Error(usage);
	    }
	
	    return {
	      getConfiguration: function getConfiguration() {
	        return { disjunctiveFacets: [attributeName] };
	      },
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            createURL = _ref.createURL,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        this._toggleRefinement = this._toggleRefinement.bind(this, helper);
	        this._createURL = function (state) {
	          return function (facetValue) {
	            return createURL(state.toggleRefinement(attributeName, facetValue));
	          };
	        };
	
	        renderFn({
	          instantSearchInstance: instantSearchInstance,
	          items: [],
	          hasNoResults: true,
	          refine: this._toggleRefinement,
	          createURL: this._createURL(helper.state),
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var helper = _ref2.helper,
	            results = _ref2.results,
	            state = _ref2.state,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        var facetValues = [];
	        var allValues = {};
	        for (var v = max; v >= 0; --v) {
	          allValues[v] = 0;
	        }
	        results.getFacetValues(attributeName).forEach(function (facet) {
	          var val = Math.round(facet.name);
	          if (!val || val > max) {
	            return;
	          }
	          for (var _v = val; _v >= 1; --_v) {
	            allValues[_v] += facet.count;
	          }
	        });
	        var refinedStar = this._getRefinedStar(helper);
	        for (var star = max - 1; star >= 1; --star) {
	          var count = allValues[star];
	          if (refinedStar && star !== refinedStar && count === 0) {
	            // skip count==0 when at least 1 refinement is enabled
	            // eslint-disable-next-line no-continue
	            continue;
	          }
	          var stars = [];
	          for (var i = 1; i <= max; ++i) {
	            stars.push(i <= star);
	          }
	          facetValues.push({
	            stars: stars,
	            name: String(star),
	            value: String(star),
	            count: count,
	            isRefined: refinedStar === star
	          });
	        }
	
	        renderFn({
	          instantSearchInstance: instantSearchInstance,
	          items: facetValues,
	          hasNoResults: results.nbHits === 0,
	          refine: this._toggleRefinement,
	          createURL: this._createURL(state),
	          widgetParams: widgetParams
	        }, false);
	      },
	      _toggleRefinement: function _toggleRefinement(helper, facetValue) {
	        var isRefined = this._getRefinedStar(helper) === Number(facetValue);
	        helper.clearRefinements(attributeName);
	        if (!isRefined) {
	          for (var val = Number(facetValue); val <= max; ++val) {
	            helper.addDisjunctiveFacetRefinement(attributeName, val);
	          }
	        }
	        helper.search();
	      },
	      _getRefinedStar: function _getRefinedStar(helper) {
	        var refinedStar = undefined;
	        var refinements = helper.getRefinements(attributeName);
	        refinements.forEach(function (r) {
	          if (!refinedStar || Number(r.value) < refinedStar) {
	            refinedStar = Number(r.value);
	          }
	        });
	        return refinedStar;
	      }
	    };
	  };
	}

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectStats;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customStats = connectState(function render(params, isFirstRendering) {\n  // params = {\n  //   instantSearchInstance,\n  //   hitsPerPage,\n  //   nbHits,\n  //   nbPages,\n  //   page,\n  //   processingTimeMS,\n  //   query,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(customStats());\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectStats.html';
	
	/**
	 * @typedef {Object} StatsRenderingOptions
	 * @property {number} hitsPerPage The maximum number of hits per page returned by Algolia.
	 * @property {number} nbHits The number of hits in the result set.
	 * @property {number} nbPages The number of pages computed for the result set.
	 * @property {number} page The current page.
	 * @property {number} processingTimeMS The time taken to compute the results inside the Algolia engine.
	 * @property {string} query The query used for the current search.
	 * @property {object} widgetParams All original `CustomStatsWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **Stats** connector provides the logic to build a custom widget that will displays
	 * search statistics (hits number and processing time).
	 *
	 * @type {Connector}
	 * @param {function(StatsRenderingOptions, boolean)} renderFn Rendering function for the custom **Stats** widget.
	 * @return {function} Re-usable widget factory for a custom **Stats** widget.
	 * @example
	 * // custom `renderFn` to render the custom Stats widget
	 * function renderFn(StatsRenderingOptions, isFirstRendering) {
	 *   if (isFirstRendering) return;
	 *
	 *   StatsRenderingOptions.widgetParams.containerNode
	 *     .html(StatsRenderingOptions.nbHits + ' results found in ' + StatsRenderingOptions.processingTimeMS);
	 * }
	 *
	 * // connect `renderFn` to Stats logic
	 * var customStatsWidget = instantsearch.connectors.connectStats(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customStatsWidget({
	 *     containerNode: $('#custom-stats-container'),
	 *   })
	 * );
	 */
	function connectStats(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    return {
	      init: function init(_ref) {
	        var helper = _ref.helper,
	            instantSearchInstance = _ref.instantSearchInstance;
	
	        renderFn({
	          instantSearchInstance: instantSearchInstance,
	          hitsPerPage: helper.state.hitsPerPage,
	          nbHits: 0,
	          nbPages: 0,
	          page: helper.state.page,
	          processingTimeMS: -1,
	          query: helper.state.query,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref2) {
	        var results = _ref2.results,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        renderFn({
	          instantSearchInstance: instantSearchInstance,
	          hitsPerPage: results.hitsPerPage,
	          nbHits: results.nbHits,
	          nbPages: results.nbPages,
	          page: results.page,
	          processingTimeMS: results.processingTimeMS,
	          query: results.query,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = connectToggle;
	
	var _utils = __webpack_require__(153);
	
	var usage = 'Usage:\nvar customToggle = connectToggle(function render(params, isFirstRendering) {\n  // params = {\n  //   value,\n  //   createURL,\n  //   refine,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customToggle({\n    attributeName,\n    label,\n    [ values = {on: true, off: undefined} ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/connectors/connectToggle.html\n';
	
	/**
	 * @typedef {Object} ToggleValue
	 * @property {string} name Human-readable name of the filter.
	 * @property {boolean} isRefined `true` if the toggle is on.
	 * @property {number} count Number of results matched after applying the toggle refinement.
	 * @property {Object} onFacetValue Value of the toggle when it's on.
	 * @property {Object} offFacetValue Value of the toggle when it's off.
	 */
	
	/**
	 * @typedef {Object} CustomToggleWidgetOptions
	 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
	 * @property {string} label Human-readable name of the filter (eg. "Free Shipping").
	 * @property {Object} [values = {on: true, off: undefined}] Values to filter on when toggling.
	 */
	
	/**
	 * @typedef {Object} ToggleRenderingOptions
	 * @property {ToggleValue} value The current toggle value.
	 * @property {function(): string} createURL Creates an URL for the next state.
	 * @property {function(value)} refine Updates to the next state by applying the toggle refinement.
	 * @property {Object} widgetParams All original `CustomToggleWidgetOptions` forwarded to the `renderFn`.
	 */
	
	/**
	 * **Toggle** connector provides the logic to build a custom widget that will provide
	 * an on/off filtering feature based on an attribute value or values.
	 *
	 * Two modes are implemented in the custom widget:
	 *  - with or without the value filtered
	 *  - switch between two values.
	 *
	 * @type {Connector}
	 * @param {function(ToggleRenderingOptions, boolean)} renderFn Rendering function for the custom **Toggle** widget.
	 * @return {function(CustomToggleWidgetOptions)} Re-usable widget factory for a custom **Toggle** widget.
	 * @example
	 * // custom `renderFn` to render the custom ClearAll widget
	 * function renderFn(ToggleRenderingOptions, isFirstRendering) {
	 *   ToggleRenderingOptions.widgetParams.containerNode
	 *     .find('a')
	 *     .off('click');
	 *
	 *   var buttonHTML = `
	 *     <a href="${ToggleRenderingOptions.createURL()}">
	 *       <input
	 *         type="checkbox"
	 *         value="${ToggleRenderingOptions.value.name}"
	 *         ${ToggleRenderingOptions.value.isRefined ? 'checked' : ''}
	 *       />
	 *       ${ToggleRenderingOptions.value.name} (${ToggleRenderingOptions.value.count})
	 *     </a>
	 *   `;
	 *
	 *   ToggleRenderingOptions.widgetParams.containerNode.html(buttonHTML);
	 *   ToggleRenderingOptions.widgetParams.containerNode
	 *     .find('a')
	 *     .on('click', function(event) {
	 *       event.preventDefault();
	 *       event.stopPropagation();
	 *
	 *       ToggleRenderingOptions.refine(ToggleRenderingOptions.value);
	 *     });
	 * }
	 *
	 * // connect `renderFn` to Toggle logic
	 * var customToggle = instantsearch.connectors.connectToggle(renderFn);
	 *
	 * // mount widget on the page
	 * search.addWidget(
	 *   customToggle({
	 *     containerNode: $('#custom-toggle-container'),
	 *     attributeName: 'free_shipping',
	 *     label: 'Free Shipping (toggle single value)',
	 *   })
	 * );
	 */
	function connectToggle(renderFn) {
	  (0, _utils.checkRendering)(renderFn, usage);
	
	  return function () {
	    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var attributeName = widgetParams.attributeName,
	        label = widgetParams.label,
	        _widgetParams$values = widgetParams.values,
	        userValues = _widgetParams$values === undefined ? { on: true, off: undefined } : _widgetParams$values;
	
	
	    if (!attributeName || !label) {
	      throw new Error(usage);
	    }
	
	    var hasAnOffValue = userValues.off !== undefined;
	    var on = userValues ? (0, _utils.escapeRefinement)(userValues.on) : undefined;
	    var off = userValues ? (0, _utils.escapeRefinement)(userValues.off) : undefined;
	
	    return {
	      getConfiguration: function getConfiguration() {
	        return {
	          disjunctiveFacets: [attributeName]
	        };
	      },
	      toggleRefinement: function toggleRefinement(helper) {
	        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	            isRefined = _ref.isRefined;
	
	        // Checking
	        if (!isRefined) {
	          if (hasAnOffValue) {
	            helper.removeDisjunctiveFacetRefinement(attributeName, off);
	          }
	          helper.addDisjunctiveFacetRefinement(attributeName, on);
	        } else {
	          // Unchecking
	          helper.removeDisjunctiveFacetRefinement(attributeName, on);
	          if (hasAnOffValue) {
	            helper.addDisjunctiveFacetRefinement(attributeName, off);
	          }
	        }
	
	        helper.search();
	      },
	      init: function init(_ref2) {
	        var state = _ref2.state,
	            helper = _ref2.helper,
	            createURL = _ref2.createURL,
	            instantSearchInstance = _ref2.instantSearchInstance;
	
	        this._createURL = function (isCurrentlyRefined) {
	          return function () {
	            return createURL(state.removeDisjunctiveFacetRefinement(attributeName, isCurrentlyRefined ? on : off).addDisjunctiveFacetRefinement(attributeName, isCurrentlyRefined ? off : on));
	          };
	        };
	
	        this.toggleRefinement = this.toggleRefinement.bind(this, helper);
	
	        var isRefined = state.isDisjunctiveFacetRefined(attributeName, on);
	
	        // no need to refine anything at init if no custom off values
	        if (hasAnOffValue) {
	          // Add filtering on the 'off' value if set
	          if (!isRefined) {
	            helper.addDisjunctiveFacetRefinement(attributeName, off);
	          }
	        }
	
	        var onFacetValue = {
	          name: label,
	          isRefined: isRefined,
	          count: 0
	        };
	
	        var offFacetValue = {
	          name: label,
	          isRefined: hasAnOffValue && !isRefined,
	          count: 0
	        };
	
	        var value = {
	          name: label,
	          isRefined: isRefined,
	          count: null,
	          onFacetValue: onFacetValue,
	          offFacetValue: offFacetValue
	        };
	
	        renderFn({
	          value: value,
	          createURL: this._createURL(value.isRefined),
	          refine: this.toggleRefinement,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, true);
	      },
	      render: function render(_ref3) {
	        var helper = _ref3.helper,
	            results = _ref3.results,
	            state = _ref3.state,
	            instantSearchInstance = _ref3.instantSearchInstance;
	
	        var isRefined = helper.state.isDisjunctiveFacetRefined(attributeName, on);
	        var offValue = off === undefined ? false : off;
	        var allFacetValues = results.getFacetValues(attributeName);
	
	        var onData = allFacetValues.find(function (_ref4) {
	          var name = _ref4.name;
	          return name === (0, _utils.unescapeRefinement)(on);
	        });
	        var onFacetValue = {
	          name: label,
	          isRefined: onData !== undefined ? onData.isRefined : false,
	          count: onData === undefined ? null : onData.count
	        };
	
	        var offData = hasAnOffValue ? allFacetValues.find(function (_ref5) {
	          var name = _ref5.name;
	          return name === (0, _utils.unescapeRefinement)(offValue);
	        }) : undefined;
	        var offFacetValue = {
	          name: label,
	          isRefined: offData !== undefined ? offData.isRefined : false,
	          count: offData === undefined ? allFacetValues.reduce(function (total, _ref6) {
	            var count = _ref6.count;
	            return total + count;
	          }, 0) : offData.count
	        };
	
	        // what will we show by default,
	        // if checkbox is not checked, show: [ ] free shipping (countWhenChecked)
	        // if checkbox is checked, show: [x] free shipping (countWhenNotChecked)
	        var nextRefinement = isRefined ? offFacetValue : onFacetValue;
	
	        var value = {
	          name: label,
	          isRefined: isRefined,
	          count: nextRefinement === undefined ? null : nextRefinement.count,
	          onFacetValue: onFacetValue,
	          offFacetValue: offFacetValue
	        };
	
	        renderFn({
	          value: value,
	          state: state,
	          createURL: this._createURL(value.isRefined),
	          refine: this.toggleRefinement,
	          helper: helper,
	          instantSearchInstance: instantSearchInstance,
	          widgetParams: widgetParams
	        }, false);
	      }
	    };
	  };
	}

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _clearAll = __webpack_require__(222);
	
	Object.defineProperty(exports, 'clearAll', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_clearAll).default;
	  }
	});
	
	var _currentRefinedValues = __webpack_require__(278);
	
	Object.defineProperty(exports, 'currentRefinedValues', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_currentRefinedValues).default;
	  }
	});
	
	var _hierarchicalMenu = __webpack_require__(281);
	
	Object.defineProperty(exports, 'hierarchicalMenu', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_hierarchicalMenu).default;
	  }
	});
	
	var _hits = __webpack_require__(286);
	
	Object.defineProperty(exports, 'hits', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_hits).default;
	  }
	});
	
	var _hitsPerPageSelector = __webpack_require__(291);
	
	Object.defineProperty(exports, 'hitsPerPageSelector', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_hitsPerPageSelector).default;
	  }
	});
	
	var _infiniteHits = __webpack_require__(293);
	
	Object.defineProperty(exports, 'infiniteHits', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_infiniteHits).default;
	  }
	});
	
	var _menu = __webpack_require__(296);
	
	Object.defineProperty(exports, 'menu', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_menu).default;
	  }
	});
	
	var _refinementList = __webpack_require__(300);
	
	Object.defineProperty(exports, 'refinementList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_refinementList).default;
	  }
	});
	
	var _numericRefinementList = __webpack_require__(302);
	
	Object.defineProperty(exports, 'numericRefinementList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_numericRefinementList).default;
	  }
	});
	
	var _numericSelector = __webpack_require__(304);
	
	Object.defineProperty(exports, 'numericSelector', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_numericSelector).default;
	  }
	});
	
	var _pagination = __webpack_require__(305);
	
	Object.defineProperty(exports, 'pagination', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_pagination).default;
	  }
	});
	
	var _priceRanges = __webpack_require__(317);
	
	Object.defineProperty(exports, 'priceRanges', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_priceRanges).default;
	  }
	});
	
	var _searchBox = __webpack_require__(321);
	
	Object.defineProperty(exports, 'searchBox', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_searchBox).default;
	  }
	});
	
	var _rangeSlider = __webpack_require__(323);
	
	Object.defineProperty(exports, 'rangeSlider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_rangeSlider).default;
	  }
	});
	
	var _sortBySelector = __webpack_require__(333);
	
	Object.defineProperty(exports, 'sortBySelector', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sortBySelector).default;
	  }
	});
	
	var _starRating = __webpack_require__(334);
	
	Object.defineProperty(exports, 'starRating', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_starRating).default;
	  }
	});
	
	var _stats = __webpack_require__(337);
	
	Object.defineProperty(exports, 'stats', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_stats).default;
	  }
	});
	
	var _toggle = __webpack_require__(340);
	
	Object.defineProperty(exports, 'toggle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_toggle).default;
	  }
	});
	
	var _analytics = __webpack_require__(342);
	
	Object.defineProperty(exports, 'analytics', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_analytics).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = clearAll;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ClearAll = __webpack_require__(223);
	
	var _ClearAll2 = _interopRequireDefault(_ClearAll);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utils = __webpack_require__(153);
	
	var _connectClearAll = __webpack_require__(152);
	
	var _connectClearAll2 = _interopRequireDefault(_connectClearAll);
	
	var _defaultTemplates = __webpack_require__(277);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-clear-all');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      renderState = _ref.renderState,
	      templates = _ref.templates;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        hasRefinements = _ref2.hasRefinements,
	        createURL = _ref2.createURL,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && !hasRefinements;
	
	    _reactDom2.default.render(_react2.default.createElement(_ClearAll2.default, {
	      refine: refine,
	      collapsible: collapsible,
	      cssClasses: cssClasses,
	      hasRefinements: hasRefinements,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps,
	      url: createURL()
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nclearAll({\n  container,\n  [ cssClasses.{root,header,body,footer,link}={} ],\n  [ templates.{header,link,footer}={link: \'Clear all\'} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n  [ excludeAttributes=[] ]\n})';
	/**
	 * @typedef {Object} ClearAllCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [link] CSS class to add to the link element.
	 */
	
	/**
	 * @typedef {Object} ClearAllTemplates
	 * @property {string|function(object):string} [header] Header template.
	 * @property {string|function(object):string} [link] Link template.
	 * @property {string|function(object):string} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} ClearAllWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string[]} [excludeAttributes] List of attributes names to exclude from clear actions.
	 * @property {ClearAllTemplates} [templates] Templates to use for the widget.
	 * @property {boolean} [autoHideContainer=true] Hide the container when there are no refinements to clear.
	 * @property {ClearAllCSSClasses} [cssClasses] CSS classes to be added.
	 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then.
	 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
	 * property is `true`, then the widget is hidden during the first rendering.
	 * @property {boolean} [clearsQuery = false] If true, the widget will also clear the query.
	 */
	
	/**
	 * The clear all widget gives the user the ability to clear all the refinements currently
	 * applied on the results. It is equivalent to the reset button of a form.
	 *
	 * The current refined values widget can display a button that has the same behavior.
	 * @type {WidgetFactory}
	 * @param {ClearAllWidgetOptions} $0 The ClearAll widget options.
	 * @returns {Widget} A new instance of the ClearAll widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.clearAll({
	 *     container: '#clear-all',
	 *     templates: {
	 *       link: 'Reset everything'
	 *     },
	 *     autoHideContainer: false,
	 *     clearsQuery: true,
	 *   })
	 * );
	 */
	function clearAll(_ref3) {
	  var container = _ref3.container,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$excludeAttribut = _ref3.excludeAttributes,
	      excludeAttributes = _ref3$excludeAttribut === undefined ? [] : _ref3$excludeAttribut,
	      _ref3$clearsQuery = _ref3.clearsQuery,
	      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: templates
	  });
	
	  try {
	    var makeWidget = (0, _connectClearAll2.default)(specializedRenderer);
	    return makeWidget({ excludeAttributes: excludeAttributes, clearsQuery: clearsQuery });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawClearAll = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _utils = __webpack_require__(153);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawClearAll = exports.RawClearAll = function (_React$Component) {
	  _inherits(RawClearAll, _React$Component);
	
	  function RawClearAll() {
	    _classCallCheck(this, RawClearAll);
	
	    return _possibleConstructorReturn(this, (RawClearAll.__proto__ || Object.getPrototypeOf(RawClearAll)).apply(this, arguments));
	  }
	
	  _createClass(RawClearAll, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleClick = this.handleClick.bind(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.url !== nextProps.url || this.props.hasRefinements !== nextProps.hasRefinements;
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      if ((0, _utils.isSpecialClick)(e)) {
	        // do not alter the default browser behavior
	        // if one special key is down
	        return;
	      }
	      e.preventDefault();
	      this.props.refine();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = {
	        hasRefinements: this.props.hasRefinements
	      };
	
	      return _react2.default.createElement(
	        'a',
	        {
	          className: this.props.cssClasses.link,
	          href: this.props.url,
	          onClick: this.handleClick
	        },
	        _react2.default.createElement(_Template2.default, _extends({
	          data: data,
	          templateKey: 'link'
	        }, this.props.templateProps))
	      );
	    }
	  }]);
	
	  return RawClearAll;
	}(_react2.default.Component);
	
	RawClearAll.propTypes = {
	  refine: _react2.default.PropTypes.func.isRequired,
	  cssClasses: _react2.default.PropTypes.shape({
	    link: _react2.default.PropTypes.string
	  }),
	  hasRefinements: _react2.default.PropTypes.bool.isRequired,
	  templateProps: _react2.default.PropTypes.object.isRequired,
	  url: _react2.default.PropTypes.string.isRequired
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawClearAll));

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PureTemplate = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hogan = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"hogan.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _hogan2 = _interopRequireDefault(_hogan);
	
	var _curry = __webpack_require__(225);
	
	var _curry2 = _interopRequireDefault(_curry);
	
	var _cloneDeep = __webpack_require__(256);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	var _mapValues = __webpack_require__(273);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PureTemplate = exports.PureTemplate = function (_React$Component) {
	  _inherits(PureTemplate, _React$Component);
	
	  function PureTemplate() {
	    _classCallCheck(this, PureTemplate);
	
	    return _possibleConstructorReturn(this, (PureTemplate.__proto__ || Object.getPrototypeOf(PureTemplate)).apply(this, arguments));
	  }
	
	  _createClass(PureTemplate, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props.data, nextProps.data) || this.props.templateKey !== nextProps.templateKey;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var useCustomCompileOptions = this.props.useCustomCompileOptions[this.props.templateKey];
	      var compileOptions = useCustomCompileOptions ? this.props.templatesConfig.compileOptions : {};
	
	      var content = renderTemplate({
	        templates: this.props.templates,
	        templateKey: this.props.templateKey,
	        compileOptions: compileOptions,
	        helpers: this.props.templatesConfig.helpers,
	        data: this.props.data
	      });
	
	      if (content === null) {
	        // Adds a noscript to the DOM but virtual DOM is null
	        // See http://facebook.github.io/react/docs/component-specs.html#render
	        return null;
	      }
	
	      if ((0, _utils.isReactElement)(content)) {
	        throw new Error('Support for templates as React elements has been removed, please use react-instantsearch');
	      }
	
	      return _react2.default.createElement('div', _extends({}, this.props.rootProps, { dangerouslySetInnerHTML: { __html: content } }));
	    }
	  }]);
	
	  return PureTemplate;
	}(_react2.default.Component);
	
	PureTemplate.propTypes = {
	  data: _react2.default.PropTypes.object,
	  rootProps: _react2.default.PropTypes.object,
	  templateKey: _react2.default.PropTypes.string,
	  templates: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])),
	  templatesConfig: _react2.default.PropTypes.shape({
	    helpers: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.func),
	    // https://github.com/twitter/hogan.js/#compilation-options
	    compileOptions: _react2.default.PropTypes.shape({
	      asString: _react2.default.PropTypes.bool,
	      sectionTags: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	        o: _react2.default.PropTypes.string,
	        c: _react2.default.PropTypes.string
	      })),
	      delimiters: _react2.default.PropTypes.string,
	      disableLambda: _react2.default.PropTypes.bool
	    })
	  }),
	  transformData: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.objectOf(_react2.default.PropTypes.func)]),
	  useCustomCompileOptions: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.bool)
	};
	
	PureTemplate.defaultProps = {
	  data: {},
	  useCustomCompileOptions: {},
	  templates: {},
	  templatesConfig: {}
	};
	
	function transformData(fn, templateKey, originalData) {
	  if (!fn) {
	    return originalData;
	  }
	
	  var clonedData = (0, _cloneDeep2.default)(originalData);
	
	  var data = void 0;
	  var typeFn = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);
	  if (typeFn === 'function') {
	    data = fn(clonedData);
	  } else if (typeFn === 'object') {
	    // ex: transformData: {hit, empty}
	    if (fn[templateKey]) {
	      data = fn[templateKey](clonedData);
	    } else {
	      // if the templateKey doesn't exist, just use the
	      // original data
	      data = originalData;
	    }
	  } else {
	    throw new Error('transformData must be a function or an object, was ' + typeFn + ' (key : ' + templateKey + ')');
	  }
	
	  var dataType = typeof data === 'undefined' ? 'undefined' : _typeof(data);
	  var expectedType = typeof originalData === 'undefined' ? 'undefined' : _typeof(originalData);
	  if (dataType !== expectedType) {
	    throw new Error('`transformData` must return a `' + expectedType + '`, got `' + dataType + '`.');
	  }
	  return data;
	}
	
	function renderTemplate(_ref) {
	  var templates = _ref.templates,
	      templateKey = _ref.templateKey,
	      compileOptions = _ref.compileOptions,
	      helpers = _ref.helpers,
	      data = _ref.data;
	
	  var template = templates[templateKey];
	  var templateType = typeof template === 'undefined' ? 'undefined' : _typeof(template);
	  var isTemplateString = templateType === 'string';
	  var isTemplateFunction = templateType === 'function';
	
	  if (!isTemplateString && !isTemplateFunction) {
	    throw new Error('Template must be \'string\' or \'function\', was \'' + templateType + '\' (key: ' + templateKey + ')');
	  } else if (isTemplateFunction) {
	    return template(data);
	  } else {
	    var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);
	    var preparedData = _extends({}, data, { helpers: transformedHelpers });
	    return _hogan2.default.compile(template, compileOptions).render(preparedData);
	  }
	}
	
	// We add all our template helper methods to the template as lambdas. Note
	// that lambdas in Mustache are supposed to accept a second argument of
	// `render` to get the rendered value, not the literal `{{value}}`. But
	// this is currently broken (see
	// https://github.com/twitter/hogan.js/issues/222).
	function transformHelpersToHogan(helpers, compileOptions, data) {
	  return (0, _mapValues2.default)(helpers, function (method) {
	    return (0, _curry2.default)(function (text) {
	      var _this2 = this;
	
	      var render = function render(value) {
	        return _hogan2.default.compile(value, compileOptions).render(_this2);
	      };
	      return method.call(data, text, render);
	    });
	  });
	}
	
	// Resolve transformData before Template, so transformData is always called
	// even if the data is the same. Allowing you to dynamically inject conditions in
	// transformData that will force re-rendering
	var withTransformData = function withTransformData(TemplateToWrap) {
	  return function (props) {
	    var data = props.data === undefined ? {} : props.data; // eslint-disable-line react/prop-types
	    return _react2.default.createElement(TemplateToWrap, _extends({}, props, {
	      data: transformData(props.transformData, props.templateKey, data) // eslint-disable-line react/prop-types
	    }));
	  };
	};
	
	exports.default = withTransformData(PureTemplate);

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var createWrap = __webpack_require__(226);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_CURRY_FLAG = 8;
	
	/**
	 * Creates a function that accepts arguments of `func` and either invokes
	 * `func` returning its result, if at least `arity` number of arguments have
	 * been provided, or returns a function that accepts the remaining `func`
	 * arguments, and so on. The arity of `func` may be specified if `func.length`
	 * is not sufficient.
	 *
	 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for provided arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of curried functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Function
	 * @param {Function} func The function to curry.
	 * @param {number} [arity=func.length] The arity of `func`.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new curried function.
	 * @example
	 *
	 * var abc = function(a, b, c) {
	 *   return [a, b, c];
	 * };
	 *
	 * var curried = _.curry(abc);
	 *
	 * curried(1)(2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2, 3);
	 * // => [1, 2, 3]
	 *
	 * // Curried with placeholders.
	 * curried(1)(_, 3)(2);
	 * // => [1, 2, 3]
	 */
	function curry(func, arity, guard) {
	  arity = guard ? undefined : arity;
	  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	  result.placeholder = curry.placeholder;
	  return result;
	}
	
	// Assign default placeholders.
	curry.placeholder = {};
	
	module.exports = curry;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(227),
	    createBind = __webpack_require__(229),
	    createCurry = __webpack_require__(231),
	    createHybrid = __webpack_require__(232),
	    createPartial = __webpack_require__(254),
	    getData = __webpack_require__(240),
	    mergeData = __webpack_require__(255),
	    setData = __webpack_require__(246),
	    setWrapToString = __webpack_require__(247),
	    toInteger = __webpack_require__(185);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags.
	 *    1 - `_.bind`
	 *    2 - `_.bindKey`
	 *    4 - `_.curry` or `_.curryRight` of a bound function
	 *    8 - `_.curry`
	 *   16 - `_.curryRight`
	 *   32 - `_.partial`
	 *   64 - `_.partialRight`
	 *  128 - `_.rearg`
	 *  256 - `_.ary`
	 *  512 - `_.flip`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;
	
	  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;
	
	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func);
	
	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];
	
	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] === undefined
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);
	
	  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setWrapToString(setter(result, newData), func, bitmask);
	}
	
	module.exports = createWrap;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(42),
	    metaMap = __webpack_require__(228);
	
	/**
	 * The base implementation of `setData` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};
	
	module.exports = baseSetData;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap = __webpack_require__(148);
	
	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;
	
	module.exports = metaMap;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var createCtor = __webpack_require__(230),
	    root = __webpack_require__(18);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = createCtor(func);
	
	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}
	
	module.exports = createBind;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(91),
	    isObject = __webpack_require__(39);
	
	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);
	
	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}
	
	module.exports = createCtor;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(104),
	    createCtor = __webpack_require__(230),
	    createHybrid = __webpack_require__(232),
	    createRecurry = __webpack_require__(236),
	    getHolder = __webpack_require__(251),
	    replaceHolders = __webpack_require__(253),
	    root = __webpack_require__(18);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);
	
	    length -= holders.length;
	    if (length < arity) {
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createCurry;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(233),
	    composeArgsRight = __webpack_require__(234),
	    countHolders = __webpack_require__(235),
	    createCtor = __webpack_require__(230),
	    createRecurry = __webpack_require__(236),
	    getHolder = __webpack_require__(251),
	    reorder = __webpack_require__(252),
	    replaceHolders = __webpack_require__(253),
	    root = __webpack_require__(18);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_ARY_FLAG = 128,
	    WRAP_FLIP_FLAG = 512;
	
	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & WRAP_ARY_FLAG,
	      isBind = bitmask & WRAP_BIND_FLAG,
	      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
	      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
	      isFlip = bitmask & WRAP_FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length;
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;
	
	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}
	
	module.exports = createHybrid;


/***/ },
/* 233 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;
	
	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}
	
	module.exports = composeArgs;


/***/ },
/* 234 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;
	
	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}
	
	module.exports = composeArgsRight;


/***/ },
/* 235 */
/***/ function(module, exports) {

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;
	
	  while (length--) {
	    if (array[length] === placeholder) {
	      ++result;
	    }
	  }
	  return result;
	}
	
	module.exports = countHolders;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(237),
	    setData = __webpack_require__(246),
	    setWrapToString = __webpack_require__(247);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_BOUND_FLAG = 4,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & WRAP_CURRY_FLAG,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;
	
	  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
	
	  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
	    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
	  }
	  var newData = [
	    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	    newHoldersRight, argPos, ary, arity
	  ];
	
	  var result = wrapFunc.apply(undefined, newData);
	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return setWrapToString(result, func, bitmask);
	}
	
	module.exports = createRecurry;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(238),
	    getData = __webpack_require__(240),
	    getFuncName = __webpack_require__(241),
	    lodash = __webpack_require__(243);
	
	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];
	
	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}
	
	module.exports = isLaziable;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(91),
	    baseLodash = __webpack_require__(239);
	
	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;
	
	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}
	
	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;
	
	module.exports = LazyWrapper;


/***/ },
/* 239 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}
	
	module.exports = baseLodash;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(228),
	    noop = __webpack_require__(127);
	
	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};
	
	module.exports = getData;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(242);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;
	
	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}
	
	module.exports = getFuncName;


/***/ },
/* 242 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};
	
	module.exports = realNames;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(238),
	    LodashWrapper = __webpack_require__(244),
	    baseLodash = __webpack_require__(239),
	    isArray = __webpack_require__(23),
	    isObjectLike = __webpack_require__(22),
	    wrapperClone = __webpack_require__(245);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array and iteratees accept only
	 * one argument. The heuristic for whether a section qualifies for shortcut
	 * fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	 * `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}
	
	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;
	
	module.exports = lodash;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(91),
	    baseLodash = __webpack_require__(239);
	
	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}
	
	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;
	
	module.exports = LodashWrapper;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(238),
	    LodashWrapper = __webpack_require__(244),
	    copyArray = __webpack_require__(89);
	
	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}
	
	module.exports = wrapperClone;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(227),
	    shortOut = __webpack_require__(108);
	
	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity
	 * function to avoid garbage collection pauses in V8. See
	 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = shortOut(baseSetData);
	
	module.exports = setData;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var getWrapDetails = __webpack_require__(248),
	    insertWrapDetails = __webpack_require__(249),
	    setToString = __webpack_require__(105),
	    updateWrapDetails = __webpack_require__(250);
	
	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	function setWrapToString(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
	}
	
	module.exports = setWrapToString;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;
	
	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}
	
	module.exports = getWrapDetails;


/***/ },
/* 249 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
	
	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length;
	  if (!length) {
	    return source;
	  }
	  var lastIndex = length - 1;
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}
	
	module.exports = insertWrapDetails;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(6),
	    arrayIncludes = __webpack_require__(118);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256,
	    WRAP_FLIP_FLAG = 512;
	
	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', WRAP_ARY_FLAG],
	  ['bind', WRAP_BIND_FLAG],
	  ['bindKey', WRAP_BIND_KEY_FLAG],
	  ['curry', WRAP_CURRY_FLAG],
	  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
	  ['flip', WRAP_FLIP_FLAG],
	  ['partial', WRAP_PARTIAL_FLAG],
	  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
	  ['rearg', WRAP_REARG_FLAG]
	];
	
	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}
	
	module.exports = updateWrapDetails;


/***/ },
/* 251 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}
	
	module.exports = getHolder;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(89),
	    isIndex = __webpack_require__(27);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);
	
	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}
	
	module.exports = reorder;


/***/ },
/* 253 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}
	
	module.exports = replaceHolders;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(104),
	    createCtor = __webpack_require__(230),
	    root = __webpack_require__(18);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = createCtor(func);
	
	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	
	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createPartial;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(233),
	    composeArgsRight = __webpack_require__(234),
	    replaceHolders = __webpack_require__(253);
	
	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_BOUND_FLAG = 4,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and
	 * `_.rearg` modify function arguments, making the order in which they are
	 * executed important, preventing the merging of metadata. However, we make
	 * an exception for a safe combined case where curried functions have `_.ary`
	 * and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
	
	  var isCombo =
	    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
	    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
	    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));
	
	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & WRAP_BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = value;
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & WRAP_ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;
	
	  return data;
	}
	
	module.exports = mergeData;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(257);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;
	
	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}
	
	module.exports = cloneDeep;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(45),
	    arrayEach = __webpack_require__(6),
	    assignValue = __webpack_require__(97),
	    baseAssign = __webpack_require__(258),
	    baseAssignIn = __webpack_require__(259),
	    cloneBuffer = __webpack_require__(85),
	    copyArray = __webpack_require__(89),
	    copySymbols = __webpack_require__(260),
	    copySymbolsIn = __webpack_require__(261),
	    getAllKeys = __webpack_require__(140),
	    getAllKeysIn = __webpack_require__(263),
	    getTag = __webpack_require__(145),
	    initCloneArray = __webpack_require__(264),
	    initCloneByTag = __webpack_require__(265),
	    initCloneObject = __webpack_require__(90),
	    isArray = __webpack_require__(23),
	    isBuffer = __webpack_require__(24),
	    isObject = __webpack_require__(39),
	    keys = __webpack_require__(11);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;
	
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
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;
	
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);
	
	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}
	
	module.exports = baseClone;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    keys = __webpack_require__(11);
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    keysIn = __webpack_require__(98);
	
	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}
	
	module.exports = baseAssignIn;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    getSymbols = __webpack_require__(142);
	
	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	module.exports = copySymbols;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    getSymbolsIn = __webpack_require__(262);
	
	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}
	
	module.exports = copySymbolsIn;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(112),
	    getPrototype = __webpack_require__(92),
	    getSymbols = __webpack_require__(142),
	    stubArray = __webpack_require__(144);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};
	
	module.exports = getSymbolsIn;


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(141),
	    getSymbolsIn = __webpack_require__(262),
	    keysIn = __webpack_require__(98);
	
	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}
	
	module.exports = getAllKeysIn;


/***/ },
/* 264 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(87),
	    cloneDataView = __webpack_require__(266),
	    cloneMap = __webpack_require__(267),
	    cloneRegExp = __webpack_require__(269),
	    cloneSet = __webpack_require__(270),
	    cloneSymbol = __webpack_require__(272),
	    cloneTypedArray = __webpack_require__(86);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
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
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case dataViewTag:
	      return cloneDataView(object, isDeep);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(87);
	
	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}
	
	module.exports = cloneDataView;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(268),
	    arrayReduce = __webpack_require__(155),
	    mapToArray = __webpack_require__(138);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}
	
	module.exports = cloneMap;


/***/ },
/* 268 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	module.exports = addMapEntry;


/***/ },
/* 269 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	module.exports = cloneRegExp;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(271),
	    arrayReduce = __webpack_require__(155),
	    setToArray = __webpack_require__(128);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}
	
	module.exports = cloneSet;


/***/ },
/* 271 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}
	
	module.exports = addSetEntry;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(17);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	module.exports = cloneSymbol;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(82),
	    baseForOwn = __webpack_require__(8),
	    baseIteratee = __webpack_require__(156);
	
	/**
	 * Creates an object with the same keys as `object` and values generated
	 * by running each own enumerable string keyed property of `object` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapKeys
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);
	
	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, key, iteratee(value, key, object));
	  });
	  return result;
	}
	
	module.exports = mapValues;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ComposedComponent) {
	  var _class, _temp;
	
	  return _temp = _class = function (_Component) {
	    _inherits(AutoHide, _Component);
	
	    function AutoHide() {
	      _classCallCheck(this, AutoHide);
	
	      return _possibleConstructorReturn(this, (AutoHide.__proto__ || Object.getPrototypeOf(AutoHide)).apply(this, arguments));
	    }
	
	    _createClass(AutoHide, [{
	      key: 'render',
	      value: function render() {
	        var shouldAutoHideContainer = this.props.shouldAutoHideContainer;
	
	        return _react2.default.createElement(
	          'div',
	          { style: { display: shouldAutoHideContainer ? 'none' : '' } },
	          _react2.default.createElement(ComposedComponent, this.props)
	        );
	      }
	    }]);
	
	    return AutoHide;
	  }(_react.Component), _class.displayName = ComposedComponent.name + '-AutoHide', _class.propTypes = { shouldAutoHideContainer: _react.PropTypes.bool.isRequired }, _temp;
	};
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _get = __webpack_require__(163);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Issue with eslint + high-order components like decorators
	/* eslint react/prop-types: 0 */
	
	function headerFooter(ComposedComponent) {
	  var HeaderFooter = function (_React$Component) {
	    _inherits(HeaderFooter, _React$Component);
	
	    function HeaderFooter(props) {
	      _classCallCheck(this, HeaderFooter);
	
	      var _this = _possibleConstructorReturn(this, (HeaderFooter.__proto__ || Object.getPrototypeOf(HeaderFooter)).call(this, props));
	
	      _this.handleHeaderClick = _this.handleHeaderClick.bind(_this);
	      _this.state = {
	        collapsed: props.collapsible && props.collapsible.collapsed
	      };
	
	      _this._cssClasses = {
	        root: (0, _classnames2.default)('ais-root', _this.props.cssClasses.root),
	        body: (0, _classnames2.default)('ais-body', _this.props.cssClasses.body)
	      };
	
	      _this._footerElement = _this._getElement({ type: 'footer' });
	      return _this;
	    }
	
	    _createClass(HeaderFooter, [{
	      key: '_getElement',
	      value: function _getElement(_ref) {
	        var type = _ref.type,
	            _ref$handleClick = _ref.handleClick,
	            handleClick = _ref$handleClick === undefined ? null : _ref$handleClick;
	
	        var templates = this.props.templateProps && this.props.templateProps.templates;
	        if (!templates || !templates[type]) {
	          return null;
	        }
	        var className = (0, _classnames2.default)(this.props.cssClasses[type], 'ais-' + type);
	
	        var templateData = (0, _get2.default)(this.props, 'headerFooterData.' + type);
	
	        return _react2.default.createElement(_Template2.default, _extends({}, this.props.templateProps, {
	          data: templateData,
	          rootProps: { className: className, onClick: handleClick },
	          templateKey: type,
	          transformData: null
	        }));
	      }
	    }, {
	      key: 'handleHeaderClick',
	      value: function handleHeaderClick() {
	        this.setState({
	          collapsed: !this.state.collapsed
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var rootCssClasses = [this._cssClasses.root];
	
	        if (this.props.collapsible) {
	          rootCssClasses.push('ais-root__collapsible');
	        }
	
	        if (this.state.collapsed) {
	          rootCssClasses.push('ais-root__collapsed');
	        }
	
	        var cssClasses = _extends({}, this._cssClasses, {
	          root: (0, _classnames2.default)(rootCssClasses)
	        });
	
	        var headerElement = this._getElement({
	          type: 'header',
	          handleClick: this.props.collapsible ? this.handleHeaderClick : null
	        });
	
	        return _react2.default.createElement(
	          'div',
	          { className: cssClasses.root },
	          headerElement,
	          _react2.default.createElement(
	            'div',
	            {
	              className: cssClasses.body
	            },
	            _react2.default.createElement(ComposedComponent, this.props)
	          ),
	          this._footerElement
	        );
	      }
	    }]);
	
	    return HeaderFooter;
	  }(_react2.default.Component);
	
	  HeaderFooter.propTypes = {
	    collapsible: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.shape({
	      collapsed: _react2.default.PropTypes.bool
	    })]),
	    cssClasses: _react2.default.PropTypes.shape({
	      root: _react2.default.PropTypes.string,
	      header: _react2.default.PropTypes.string,
	      body: _react2.default.PropTypes.string,
	      footer: _react2.default.PropTypes.string
	    }),
	    templateProps: _react2.default.PropTypes.object
	  };
	
	  HeaderFooter.defaultProps = {
	    cssClasses: {},
	    collapsible: false
	  };
	
	  // precise displayName for ease of debugging (react dev tool, react warnings)
	  HeaderFooter.displayName = ComposedComponent.name + '-HeaderFooter';
	
	  return HeaderFooter;
	}
	
	exports.default = headerFooter;

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 277 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  link: 'Clear all',
	  footer: ''
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = currentRefinedValues;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _isUndefined = __webpack_require__(192);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _isBoolean = __webpack_require__(193);
	
	var _isBoolean2 = _interopRequireDefault(_isBoolean);
	
	var _isString = __webpack_require__(194);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _isArray = __webpack_require__(23);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isPlainObject = __webpack_require__(94);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _isFunction = __webpack_require__(38);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _reduce = __webpack_require__(154);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _CurrentRefinedValues = __webpack_require__(279);
	
	var _CurrentRefinedValues2 = _interopRequireDefault(_CurrentRefinedValues);
	
	var _connectCurrentRefinedValues = __webpack_require__(191);
	
	var _connectCurrentRefinedValues2 = _interopRequireDefault(_connectCurrentRefinedValues);
	
	var _defaultTemplates = __webpack_require__(280);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-current-refined-values');
	
	var renderer = function renderer(_ref) {
	  var autoHideContainer = _ref.autoHideContainer,
	      clearAllPosition = _ref.clearAllPosition,
	      collapsible = _ref.collapsible,
	      containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      renderState = _ref.renderState,
	      transformData = _ref.transformData,
	      templates = _ref.templates;
	  return function (_ref2, isFirstRendering) {
	    var attributes = _ref2.attributes,
	        clearAllClick = _ref2.clearAllClick,
	        clearAllURL = _ref2.clearAllURL,
	        refine = _ref2.refine,
	        createURL = _ref2.createURL,
	        refinements = _ref2.refinements,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && refinements && refinements.length === 0;
	
	    var clearRefinementClicks = refinements.map(function (refinement) {
	      return refine.bind(null, refinement);
	    });
	    var clearRefinementURLs = refinements.map(function (refinement) {
	      return createURL(refinement);
	    });
	
	    _reactDom2.default.render(_react2.default.createElement(_CurrentRefinedValues2.default, {
	      attributes: attributes,
	      clearAllClick: clearAllClick,
	      clearAllPosition: clearAllPosition,
	      clearAllURL: clearAllURL,
	      clearRefinementClicks: clearRefinementClicks,
	      clearRefinementURLs: clearRefinementURLs,
	      collapsible: collapsible,
	      cssClasses: cssClasses,
	      refinements: refinements,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\ncurrentRefinedValues({\n  container,\n  [ attributes: [{name[, label, template, transformData]}] ],\n  [ onlyListedAttributes = false ],\n  [ clearAll = \'before\' ] // One of [\'before\', \'after\', false]\n  [ templates.{header,item,clearAll,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer = true ],\n  [ cssClasses.{root, header, body, clearAll, list, item, link, count, footer} = {} ],\n  [ collapsible = false ]\n  [ clearsQuery = false ]\n})';
	
	/**
	 * @typedef {Object} CurrentRefinedValuesCSSClasses
	 * @property {string} [root] CSS classes added to the root element.
	 * @property {string} [header] CSS classes added to the header element.
	 * @property {string} [body] CSS classes added to the body element.
	 * @property {string} [clearAll] CSS classes added to the clearAll element.
	 * @property {string} [list] CSS classes added to the list element.
	 * @property {string} [item] CSS classes added to the item element.
	 * @property {string} [link] CSS classes added to the link element.
	 * @property {string} [count] CSS classes added to the count element.
	 * @property {string} [footer] CSS classes added to the footer element.
	 */
	
	/**
	 * @typedef {Object} CurrentRefinedValuesAttributes
	 * @property {string} name Required attribute name.
	 * @property {string} label Attribute label (passed to the item template).
	 * @property {string|function(object):string} template Attribute specific template.
	 * @property {function(object):object} transformData Attribute specific transformData.
	 */
	
	/**
	 * @typedef {Object} CurrentRefinedValuesTemplates
	 * @property {string|function(object):string} [header] Header template.
	 * @property {string|function(object):string} [item] Item template.
	 * @property {string|function(object):string} [clearAll] Clear all template.
	 * @property {string|function(object):string} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} CurrentRefinedValuesTransforms
	 * @property {function(object):object} [item] Method to change the object passed to the `item` template.
	 */
	
	/**
	 * @typedef {Object} CurrentRefinedValuesWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget
	 * @property {CurrentRefinedValuesAttributes[]} [attributes = []] Label definitions for the
	 * different filters.
	 * @property {boolean} [onlyListedAttributes=false] Only use the declared attributes. By default, the widget
	 * displays the refinements for the whole search state. If true, the list of attributes in `attributes` is used.
	 * @property {'before'|'after'|boolean} [clearAll='before'] Defines the clear all button position.
	 * By default, it is placed before the set of current filters. If the value is false, the button
	 * won't be added in the widget.
	 * @property {CurrentRefinedValuesTemplates} [templates] Templates to use for the widget.
	 * @property {CurrentRefinedValuesTransforms} [transformData] Set of functions to transform
	 * the data passed to the templates.
	 * @property {boolean} [autoHideContainer=true] Hides the widget when there are no current refinements.
	 * @property {CurrentRefinedValuesCSSClasses} [cssClasses] CSS classes to be added.
	 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then
	 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
	 * property is `true`, then the widget is hidden during the first rendering.
	 * @property {boolean} [clearsQuery=false] If true, the clear all button also clears the active search query.
	 */
	
	/**
	 * The current refined values widget has two purposes:
	 *
	 *  - give the user a synthetic view of the current filters.
	 *  - give the user the ability to remove a filter.
	 *
	 * This widget is usually in the top part of the search UI.
	 * @type {WidgetFactory}
	 * @param {CurrentRefinedValuesWidgetOptions} $0 The CurrentRefinedValues widget options.
	 * @returns {Object} A new CurrentRefinedValues widget instance.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.currentRefinedValues({
	 *     container: '#current-refined-values',
	 *     clearAll: 'after',
	 *     clearsQuery: true,
	 *   })
	 * );
	 */
	function currentRefinedValues(_ref3) {
	  var container = _ref3.container,
	      _ref3$attributes = _ref3.attributes,
	      attributes = _ref3$attributes === undefined ? [] : _ref3$attributes,
	      _ref3$onlyListedAttri = _ref3.onlyListedAttributes,
	      onlyListedAttributes = _ref3$onlyListedAttri === undefined ? false : _ref3$onlyListedAttri,
	      _ref3$clearAll = _ref3.clearAll,
	      clearAll = _ref3$clearAll === undefined ? 'before' : _ref3$clearAll,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      _ref3$clearsQuery = _ref3.clearsQuery,
	      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;
	
	  var transformDataOK = (0, _isUndefined2.default)(transformData) || (0, _isFunction2.default)(transformData) || (0, _isPlainObject2.default)(transformData) && (0, _isFunction2.default)(transformData.item);
	
	  var templatesKeys = ['header', 'item', 'clearAll', 'footer'];
	  var templatesOK = (0, _isPlainObject2.default)(templates) && (0, _reduce2.default)(templates, function (res, val, key) {
	    return res && templatesKeys.indexOf(key) !== -1 && ((0, _isString2.default)(val) || (0, _isFunction2.default)(val));
	  }, true);
	
	  var userCssClassesKeys = ['root', 'header', 'body', 'clearAll', 'list', 'item', 'link', 'count', 'footer'];
	  var userCssClassesOK = (0, _isPlainObject2.default)(userCssClasses) && (0, _reduce2.default)(userCssClasses, function (res, val, key) {
	    return res && userCssClassesKeys.indexOf(key) !== -1 && (0, _isString2.default)(val) || (0, _isArray2.default)(val);
	  }, true);
	
	  var showUsage = false || !((0, _isString2.default)(container) || (0, _utils.isDomElement)(container)) || !(0, _isArray2.default)(attributes) || !(0, _isBoolean2.default)(onlyListedAttributes) || [false, 'before', 'after'].indexOf(clearAll) === -1 || !(0, _isPlainObject2.default)(templates) || !templatesOK || !transformDataOK || !(0, _isBoolean2.default)(autoHideContainer) || !userCssClassesOK;
	
	  if (showUsage) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    clearAll: (0, _classnames2.default)(bem('clear-all'), userCssClasses.clearAll),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    clearAllPosition: clearAll,
	    collapsible: collapsible,
	    cssClasses: cssClasses,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: templates,
	    transformData: transformData
	  });
	
	  try {
	    var makeCurrentRefinedValues = (0, _connectCurrentRefinedValues2.default)(specializedRenderer);
	    return makeCurrentRefinedValues({ attributes: attributes, onlyListedAttributes: onlyListedAttributes, clearAll: clearAll, clearsQuery: clearsQuery });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawCurrentRefinedValues = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _utils = __webpack_require__(153);
	
	var _map = __webpack_require__(195);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _cloneDeep = __webpack_require__(256);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawCurrentRefinedValues = exports.RawCurrentRefinedValues = function (_React$Component) {
	  _inherits(RawCurrentRefinedValues, _React$Component);
	
	  function RawCurrentRefinedValues() {
	    _classCallCheck(this, RawCurrentRefinedValues);
	
	    return _possibleConstructorReturn(this, (RawCurrentRefinedValues.__proto__ || Object.getPrototypeOf(RawCurrentRefinedValues)).apply(this, arguments));
	  }
	
	  _createClass(RawCurrentRefinedValues, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props.refinements, nextProps.refinements);
	    }
	  }, {
	    key: '_clearAllElement',
	    value: function _clearAllElement(position, requestedPosition) {
	      if (requestedPosition !== position) {
	        return undefined;
	      }
	      return _react2.default.createElement(
	        'a',
	        {
	          className: this.props.cssClasses.clearAll,
	          href: this.props.clearAllURL,
	          onClick: handleClick(this.props.clearAllClick)
	        },
	        _react2.default.createElement(_Template2.default, _extends({ templateKey: 'clearAll' }, this.props.templateProps))
	      );
	    }
	  }, {
	    key: '_refinementElement',
	    value: function _refinementElement(refinement, i) {
	      var attribute = this.props.attributes[refinement.attributeName] || {};
	      var templateData = getTemplateData(attribute, refinement, this.props.cssClasses);
	      var customTemplateProps = getCustomTemplateProps(attribute);
	      var key = refinement.attributeName + (refinement.operator ? refinement.operator : ':') + (refinement.exclude ? refinement.exclude : '') + refinement.name;
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.props.cssClasses.item,
	          key: key
	        },
	        _react2.default.createElement(
	          'a',
	          {
	            className: this.props.cssClasses.link,
	            href: this.props.clearRefinementURLs[i],
	            onClick: handleClick(this.props.clearRefinementClicks[i])
	          },
	          _react2.default.createElement(_Template2.default, _extends({ data: templateData, templateKey: 'item' }, this.props.templateProps, customTemplateProps))
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this._clearAllElement('before', this.props.clearAllPosition),
	        _react2.default.createElement(
	          'div',
	          { className: this.props.cssClasses.list },
	          (0, _map2.default)(this.props.refinements, this._refinementElement.bind(this))
	        ),
	        this._clearAllElement('after', this.props.clearAllPosition)
	      );
	    }
	  }]);
	
	  return RawCurrentRefinedValues;
	}(_react2.default.Component);
	
	function getCustomTemplateProps(attribute) {
	  var customTemplateProps = {};
	  if (attribute.template !== undefined) {
	    customTemplateProps.templates = {
	      item: attribute.template
	    };
	  }
	  if (attribute.transformData !== undefined) {
	    customTemplateProps.transformData = attribute.transformData;
	  }
	  return customTemplateProps;
	}
	
	function getTemplateData(attribute, _refinement, cssClasses) {
	  var templateData = (0, _cloneDeep2.default)(_refinement);
	
	  templateData.cssClasses = cssClasses;
	  if (attribute.label !== undefined) {
	    templateData.label = attribute.label;
	  }
	  if (templateData.operator !== undefined) {
	    templateData.displayOperator = templateData.operator;
	    if (templateData.operator === '>=') {
	      templateData.displayOperator = '&ge;';
	    }
	    if (templateData.operator === '<=') {
	      templateData.displayOperator = '&le;';
	    }
	  }
	
	  return templateData;
	}
	
	function handleClick(cb) {
	  return function (e) {
	    if ((0, _utils.isSpecialClick)(e)) {
	      // do not alter the default browser behavior
	      // if one special key is down
	      return;
	    }
	    e.preventDefault();
	    cb();
	  };
	}
	
	RawCurrentRefinedValues.propTypes = {
	  attributes: _react2.default.PropTypes.object,
	  clearAllClick: _react2.default.PropTypes.func,
	  clearAllPosition: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.bool]),
	  clearAllURL: _react2.default.PropTypes.string,
	  clearRefinementClicks: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
	  clearRefinementURLs: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	  cssClasses: _react2.default.PropTypes.shape({
	    clearAll: _react2.default.PropTypes.string,
	    list: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    link: _react2.default.PropTypes.string,
	    count: _react2.default.PropTypes.string
	  }).isRequired,
	  refinements: _react2.default.PropTypes.array,
	  templateProps: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawCurrentRefinedValues));

/***/ },
/* 280 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  item: '' + '{{#label}}' + '{{label}}' + '{{^operator}}:{{/operator}}' + ' ' + '{{/label}}' + '{{#operator}}{{{displayOperator}}} {{/operator}}' + '{{#exclude}}-{{/exclude}}' + '{{name}} <span class="{{cssClasses.count}}">{{count}}</span>',
	  clearAll: 'Clear all',
	  footer: ''
	};

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hierarchicalMenu;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _connectHierarchicalMenu = __webpack_require__(199);
	
	var _connectHierarchicalMenu2 = _interopRequireDefault(_connectHierarchicalMenu);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _defaultTemplates = __webpack_require__(285);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-hierarchical-menu');
	
	var renderer = function renderer(_ref) {
	  var autoHideContainer = _ref.autoHideContainer,
	      collapsible = _ref.collapsible,
	      cssClasses = _ref.cssClasses,
	      containerNode = _ref.containerNode,
	      transformData = _ref.transformData,
	      templates = _ref.templates,
	      renderState = _ref.renderState;
	  return function (_ref2, isFirstRendering) {
	    var createURL = _ref2.createURL,
	        items = _ref2.items,
	        refine = _ref2.refine,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && items.length === 0;
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: items,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps,
	      toggleRefinement: refine
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nhierarchicalMenu({\n  container,\n  attributes,\n  [ separator=\' > \' ],\n  [ rootPath ],\n  [ showParentLevel=true ],\n  [ limit=10 ],\n  [ sortBy=[\'name:asc\'] ],\n  [ cssClasses.{root , header, body, footer, list, depth, item, active, link}={} ],\n  [ templates.{header, item, footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';
	/**
	 * @typedef {Object} HierarchicalMenuCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [list] CSS class to add to the list element.
	 * @property {string|string[]} [item] CSS class to add to each item element.
	 * @property {string|string[]} [depth] CSS class to add to each item element to denote its depth. The actual level will be appended to the given class name (ie. if `depth` is given, the widget will add `depth0`, `depth1`, ... according to the level of each item).
	 * @property {string|string[]} [active] CSS class to add to each active element.
	 * @property {string|string[]} [link] CSS class to add to each link (when using the default template).
	 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
	 */
	
	/**
	 * @typedef {Object} HierarchicalMenuTemplates
	 * @property {string|function(object):string} [header=''] Header template (root level only).
	 * @property {string|function(object):string} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
	 * @property {string|function(object):string} [footer=''] Footer template (root level only).
	 */
	
	/**
	 * @typedef {Object} HierarchicalMenuTransforms
	 * @property {function(object):object} [item] Method to change the object passed to the `item`. template
	 */
	
	/**
	 * @typedef {Object} HierarchicalMenuWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string[]} attributes Array of attributes to use to generate the hierarchy of the menu.
	 * @property {number} [limit=10] How much facet values to get [*].
	 * @property {string} [separator=" > "] Separator used in the attributes to separate level values. [*].
	 * @property {string} [rootPath] Prefix path to use if the first level is not the root level.
	 * @property {string} [showParentLevel=false] Show the parent level of the current refined value.
	 * @property {string[]|function} [sortBy=['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
	 *
	 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
	 * @property {HierarchicalMenuTemplates} [templates] Templates to use for the widget.
	 * @property {HierarchicalMenuTransforms} [transformData] Set of functions to transform the data passed to the templates.
	 * @property {boolean} [autoHideContainer=true] Hide the container when there are no items in the menu.
	 * @property {HierarchicalMenuCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
	 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then
	 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
	 * property is `true`, then the widget is hidden during the first rendering.
	 */
	
	/**
	 * The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
	 *
	 * It is commonly used for categories with subcategories.
	 *
	 * This widget requires the data to be formatted in a specific way. Each level should be represented
	 * as a single attribute. Each attribute represent a path in the hierarchy. Example:
	 *
	 * ```javascript
	 * {
	 *   "objectID": "123",
	 *   "name": "orange",
	 *   "categories": {
	 *     "lvl0": "fruits",
	 *     "lvl1": "fruits > citrus"
	 *   }
	 * }
	 * ```
	 *
	 * By default, the separator is ` > ` but it can be different and specified with the `separator` option.
	 * @type {WidgetFactory}
	 * @param {HierarchicalMenuWidgetOptions} $0 The HierarchicalMenu widget options.
	 * @return {Widget} A new HierarchicalMenu widget instance.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.hierarchicalMenu({
	 *     container: '#hierarchical-categories',
	 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
	 *     templates: {
	 *       header: 'Hierarchical categories'
	 *     }
	 *   })
	 * );
	 */
	function hierarchicalMenu() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributes = _ref3.attributes,
	      _ref3$separator = _ref3.separator,
	      separator = _ref3$separator === undefined ? ' > ' : _ref3$separator,
	      _ref3$rootPath = _ref3.rootPath,
	      rootPath = _ref3$rootPath === undefined ? null : _ref3$rootPath,
	      _ref3$showParentLevel = _ref3.showParentLevel,
	      showParentLevel = _ref3$showParentLevel === undefined ? true : _ref3$showParentLevel,
	      _ref3$limit = _ref3.limit,
	      limit = _ref3$limit === undefined ? 10 : _ref3$limit,
	      _ref3$sortBy = _ref3.sortBy,
	      sortBy = _ref3$sortBy === undefined ? ['name:asc'] : _ref3$sortBy,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData;
	
	  if (!container || !attributes || !attributes.length) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    depth: bem('list', 'lvl'),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
	  };
	
	  var specializedRenderer = renderer({
	    autoHideContainer: autoHideContainer,
	    collapsible: collapsible,
	    cssClasses: cssClasses,
	    containerNode: containerNode,
	    transformData: transformData,
	    templates: templates,
	    renderState: {}
	  });
	
	  try {
	    var makeHierarchicalMenu = (0, _connectHierarchicalMenu2.default)(specializedRenderer);
	    return makeHierarchicalMenu({
	      attributes: attributes,
	      separator: separator,
	      rootPath: rootPath,
	      showParentLevel: showParentLevel,
	      limit: limit,
	      sortBy: sortBy
	    });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawRefinementList = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utils = __webpack_require__(153);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _RefinementListItem = __webpack_require__(283);
	
	var _RefinementListItem2 = _interopRequireDefault(_RefinementListItem);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _SearchBox = __webpack_require__(284);
	
	var _SearchBox2 = _interopRequireDefault(_SearchBox);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawRefinementList = exports.RawRefinementList = function (_React$Component) {
	  _inherits(RawRefinementList, _React$Component);
	
	  function RawRefinementList(props) {
	    _classCallCheck(this, RawRefinementList);
	
	    var _this = _possibleConstructorReturn(this, (RawRefinementList.__proto__ || Object.getPrototypeOf(RawRefinementList)).call(this, props));
	
	    _this.handleItemClick = _this.handleItemClick.bind(_this);
	    return _this;
	  }
	
	  _createClass(RawRefinementList, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var isStateDifferent = nextState !== this.state;
	      var isFacetValuesDifferent = !(0, _isEqual2.default)(this.props.facetValues, nextProps.facetValues);
	      var shouldUpdate = isStateDifferent || isFacetValuesDifferent;
	      return shouldUpdate;
	    }
	  }, {
	    key: 'refine',
	    value: function refine(facetValueToRefine, isRefined) {
	      this.props.toggleRefinement(facetValueToRefine, isRefined);
	    }
	  }, {
	    key: '_generateFacetItem',
	    value: function _generateFacetItem(facetValue) {
	      var subItems = void 0;
	      var hasChildren = facetValue.data && facetValue.data.length > 0;
	      if (hasChildren) {
	        subItems = _react2.default.createElement(RawRefinementList, _extends({}, this.props, {
	          depth: this.props.depth + 1,
	          facetValues: facetValue.data
	        }));
	      }
	
	      var url = this.props.createURL(facetValue.value);
	      var templateData = _extends({}, facetValue, { url: url, cssClasses: this.props.cssClasses });
	
	      var cssClassItem = (0, _classnames2.default)(this.props.cssClasses.item, _defineProperty({}, this.props.cssClasses.active, facetValue.isRefined));
	
	      var key = facetValue.value;
	
	      if (facetValue.isRefined !== undefined) {
	        key += '/' + facetValue.isRefined;
	      }
	
	      if (facetValue.count !== undefined) {
	        key += '/' + facetValue.count;
	      }
	
	      return _react2.default.createElement(_RefinementListItem2.default, {
	        facetValueToRefine: facetValue.value,
	        handleClick: this.handleItemClick,
	        isRefined: facetValue.isRefined,
	        itemClassName: cssClassItem,
	        key: key,
	        subItems: subItems,
	        templateData: templateData,
	        templateKey: 'item',
	        templateProps: this.props.templateProps
	      });
	    }
	
	    // Click events on DOM tree like LABEL > INPUT will result in two click events
	    // instead of one.
	    // No matter the framework, see https://www.google.com/search?q=click+label+twice
	    //
	    // Thus making it hard to distinguish activation from deactivation because both click events
	    // are very close. Debounce is a solution but hacky.
	    //
	    // So the code here checks if the click was done on or in a LABEL. If this LABEL
	    // has a checkbox inside, we ignore the first click event because we will get another one.
	    //
	    // We also check if the click was done inside a link and then e.preventDefault() because we already
	    // handle the url
	    //
	    // Finally, we always stop propagation of the event to avoid multiple levels RefinementLists to fail: click
	    // on child would click on parent also
	
	  }, {
	    key: 'handleItemClick',
	    value: function handleItemClick(_ref) {
	      var facetValueToRefine = _ref.facetValueToRefine,
	          originalEvent = _ref.originalEvent,
	          isRefined = _ref.isRefined;
	
	      if ((0, _utils.isSpecialClick)(originalEvent)) {
	        // do not alter the default browser behavior
	        // if one special key is down
	        return;
	      }
	
	      if (originalEvent.target.tagName === 'INPUT') {
	        this.refine(facetValueToRefine, isRefined);
	        return;
	      }
	
	      var parent = originalEvent.target;
	
	      while (parent !== originalEvent.currentTarget) {
	        if (parent.tagName === 'LABEL' && (parent.querySelector('input[type="checkbox"]') || parent.querySelector('input[type="radio"]'))) {
	          return;
	        }
	
	        if (parent.tagName === 'A' && parent.href) {
	          originalEvent.preventDefault();
	        }
	
	        parent = parent.parentNode;
	      }
	
	      originalEvent.stopPropagation();
	
	      this.refine(facetValueToRefine, isRefined);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.searchbox && !nextProps.isFromSearch) {
	        this.searchbox.clearInput();
	      }
	    }
	  }, {
	    key: 'refineFirstValue',
	    value: function refineFirstValue() {
	      var firstValue = this.props.facetValues[0];
	      if (firstValue) {
	        var actualValue = firstValue.value;
	        this.props.toggleRefinement(actualValue);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      // Adding `-lvl0` classes
	      var cssClassList = [this.props.cssClasses.list];
	      if (this.props.cssClasses.depth) {
	        cssClassList.push('' + this.props.cssClasses.depth + this.props.depth);
	      }
	
	      var showMoreBtn = this.props.showMore === true ? _react2.default.createElement(_Template2.default, _extends({
	        rootProps: { onClick: this.props.toggleShowMore },
	        templateKey: 'show-more-' + (this.props.isShowingMore ? 'active' : 'inactive')
	      }, this.props.templateProps)) : undefined;
	
	      var searchInput = this.props.searchFacetValues ? _react2.default.createElement(_SearchBox2.default, { ref: function ref(i) {
	          _this2.searchbox = i;
	        },
	        placeholder: this.props.searchPlaceholder,
	        onChange: this.props.searchFacetValues,
	        onValidate: function onValidate() {
	          return _this2.refineFirstValue();
	        },
	        disabled: this.props.hasExhaustiveItems }) : null;
	
	      var noResults = this.props.searchFacetValues && this.props.isFromSearch && this.props.facetValues.length === 0 ? _react2.default.createElement(_Template2.default, _extends({
	        templateKey: 'noResults'
	      }, this.props.templateProps)) : null;
	
	      return _react2.default.createElement(
	        'div',
	        { className: (0, _classnames2.default)(cssClassList) },
	        searchInput,
	        this.props.facetValues.map(this._generateFacetItem, this),
	        noResults,
	        showMoreBtn
	      );
	    }
	  }]);
	
	  return RawRefinementList;
	}(_react2.default.Component);
	
	RawRefinementList.propTypes = {
	  Template: _react2.default.PropTypes.func,
	  createURL: _react2.default.PropTypes.func,
	  cssClasses: _react2.default.PropTypes.shape({
	    active: _react2.default.PropTypes.string,
	    depth: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    list: _react2.default.PropTypes.string
	  }),
	  depth: _react2.default.PropTypes.number,
	  facetValues: _react2.default.PropTypes.array,
	  templateProps: _react2.default.PropTypes.object.isRequired,
	  toggleRefinement: _react2.default.PropTypes.func.isRequired,
	  searchFacetValues: _react2.default.PropTypes.func,
	  searchPlaceholder: _react2.default.PropTypes.string,
	  isFromSearch: _react2.default.PropTypes.bool,
	  showMore: _react2.default.PropTypes.bool,
	  toggleShowMore: _react2.default.PropTypes.func,
	  isShowingMore: _react2.default.PropTypes.bool,
	  hasExhaustiveItems: _react2.default.PropTypes.bool
	};
	
	RawRefinementList.defaultProps = {
	  cssClasses: {},
	  depth: 0
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawRefinementList));

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RefinementListItem = function (_React$Component) {
	  _inherits(RefinementListItem, _React$Component);
	
	  function RefinementListItem() {
	    _classCallCheck(this, RefinementListItem);
	
	    return _possibleConstructorReturn(this, (RefinementListItem.__proto__ || Object.getPrototypeOf(RefinementListItem)).apply(this, arguments));
	  }
	
	  _createClass(RefinementListItem, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleClick = this.handleClick.bind(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props, nextProps);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(originalEvent) {
	      this.props.handleClick({
	        facetValueToRefine: this.props.facetValueToRefine,
	        isRefined: this.props.isRefined,
	        originalEvent: originalEvent
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.props.itemClassName,
	          onClick: this.handleClick
	        },
	        _react2.default.createElement(_Template2.default, _extends({
	          data: this.props.templateData,
	          templateKey: this.props.templateKey
	        }, this.props.templateProps)),
	        this.props.subItems
	      );
	    }
	  }]);
	
	  return RefinementListItem;
	}(_react2.default.Component);
	
	RefinementListItem.propTypes = {
	  facetValueToRefine: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  handleClick: _react2.default.PropTypes.func.isRequired,
	  isRefined: _react2.default.PropTypes.bool.isRequired,
	  itemClassName: _react2.default.PropTypes.string,
	  subItems: _react2.default.PropTypes.object,
	  templateData: _react2.default.PropTypes.object.isRequired,
	  templateKey: _react2.default.PropTypes.string.isRequired,
	  templateProps: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = RefinementListItem;

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable max-len, no-extra-parens */
	
	
	var SearchBox = function (_React$Component) {
	  _inherits(SearchBox, _React$Component);
	
	  function SearchBox() {
	    _classCallCheck(this, SearchBox);
	
	    return _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).apply(this, arguments));
	  }
	
	  _createClass(SearchBox, [{
	    key: 'clearInput',
	    value: function clearInput() {
	      if (this.input) {
	        this.input.value = '';
	      }
	    }
	  }, {
	    key: 'validateSearch',
	    value: function validateSearch(e) {
	      e.preventDefault();
	      if (this.input) {
	        var inputValue = this.input.value;
	        if (inputValue) this.props.onValidate();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          placeholder = _props.placeholder,
	          _onChange = _props.onChange;
	
	      var inputCssClasses = this.props.disabled ? 'sbx-sffv__input sbx-sffv__input-disabled' : 'sbx-sffv__input';
	      var formCssClasses = this.props.disabled ? 'searchbox sbx-sffv sbx-sffv-disabled' : 'searchbox sbx-sffv';
	
	      return _react2.default.createElement(
	        'form',
	        { noValidate: 'novalidate',
	          className: formCssClasses,
	          onReset: function onReset() {
	            _onChange('');
	          },
	          onSubmit: function onSubmit(e) {
	            return _this2.validateSearch(e);
	          }
	        },
	        _react2.default.createElement(
	          'svg',
	          { xmlns: 'http://www.w3.org/2000/svg', style: { display: 'none' } },
	          _react2.default.createElement(
	            'symbol',
	            { xmlns: 'http://www.w3.org/2000/svg', id: 'sbx-icon-search-12', viewBox: '0 0 40 41' },
	            _react2.default.createElement('path', { d: 'M30.967 27.727l-.03-.03c-.778-.777-2.038-.777-2.815 0l-1.21 1.21c-.78.78-.778 2.04 0 2.817l.03.03 4.025-4.027zm1.083 1.084L39.24 36c.778.778.78 2.037 0 2.816l-1.21 1.21c-.777.778-2.038.78-2.816 0l-7.19-7.19 4.026-4.025zM15.724 31.45c8.684 0 15.724-7.04 15.724-15.724C31.448 7.04 24.408 0 15.724 0 7.04 0 0 7.04 0 15.724c0 8.684 7.04 15.724 15.724 15.724zm0-3.93c6.513 0 11.793-5.28 11.793-11.794 0-6.513-5.28-11.793-11.793-11.793C9.21 3.93 3.93 9.21 3.93 15.725c0 6.513 5.28 11.793 11.794 11.793z',
	              fillRule: 'evenodd' })
	          ),
	          _react2.default.createElement(
	            'symbol',
	            { xmlns: 'http://www.w3.org/2000/svg', id: 'sbx-icon-clear-2', viewBox: '0 0 20 20' },
	            _react2.default.createElement('path', { d: 'M8.96 10L.52 1.562 0 1.042 1.04 0l.522.52L10 8.96 18.438.52l.52-.52L20 1.04l-.52.522L11.04 10l8.44 8.438.52.52L18.96 20l-.522-.52L10 11.04l-8.438 8.44-.52.52L0 18.96l.52-.522L8.96 10z', fillRule: 'evenodd' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { role: 'search', className: 'sbx-sffv__wrapper' },
	          _react2.default.createElement('input', { type: 'search', name: 'search', placeholder: placeholder, autoComplete: 'off', required: 'required', className: inputCssClasses, onChange: function onChange(e) {
	              return _onChange(e.target.value);
	            }, ref: function ref(i) {
	              _this2.input = i;
	            }, disabled: this.props.disabled }),
	          _react2.default.createElement(
	            'button',
	            { type: 'submit', title: 'Submit your search query.', className: 'sbx-sffv__submit' },
	            _react2.default.createElement(
	              'svg',
	              { role: 'img', 'aria-label': 'Search' },
	              _react2.default.createElement('use', { xlinkHref: '#sbx-icon-search-12' })
	            )
	          ),
	          _react2.default.createElement(
	            'button',
	            { type: 'reset', title: 'Clear the search query.', className: 'sbx-sffv__reset' },
	            _react2.default.createElement(
	              'svg',
	              { role: 'img', 'aria-label': 'Reset' },
	              _react2.default.createElement('use', { xlinkHref: '#sbx-icon-clear-2' })
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return SearchBox;
	}(_react2.default.Component);
	
	SearchBox.propTypes = {
	  placeholder: _react2.default.PropTypes.string.isRequired,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onValidate: _react2.default.PropTypes.func.isRequired,
	  disabled: _react2.default.PropTypes.bool
	};
	exports.default = SearchBox;

/***/ },
/* 285 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable max-len */
	exports.default = {
	  header: '',
	  item: '<a class="{{cssClasses.link}}" href="{{url}}">{{label}} <span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
	  footer: ''
	};

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hits;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Hits = __webpack_require__(287);
	
	var _Hits2 = _interopRequireDefault(_Hits);
	
	var _connectHits = __webpack_require__(200);
	
	var _connectHits2 = _interopRequireDefault(_connectHits);
	
	var _defaultTemplates = __webpack_require__(290);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-hits');
	
	var renderer = function renderer(_ref) {
	  var renderState = _ref.renderState,
	      cssClasses = _ref.cssClasses,
	      containerNode = _ref.containerNode,
	      transformData = _ref.transformData,
	      templates = _ref.templates;
	  return function (_ref2, isFirstRendering) {
	    var hits = _ref2.hits,
	        results = _ref2.results,
	        templateProps = _ref2.templateProps,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    _reactDom2.default.render(_react2.default.createElement(_Hits2.default, {
	      cssClasses: cssClasses,
	      hits: hits,
	      results: results,
	      templateProps: renderState.templateProps
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nhits({\n  container,\n  [ cssClasses.{root,empty,item}={} ],\n  [ templates.{empty,item} | templates.{empty, allItems} ],\n  [ transformData.{empty,item} | transformData.{empty, allItems} ],\n})';
	
	/**
	 * @typedef {Object} HitsCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the wrapping element.
	 * @property {string|string[]} [empty] CSS class to add to the wrapping element when no results.
	 * @property {string|string[]} [item] CSS class to add to each result.
	 */
	
	/**
	 * @typedef {Object} HitsTemplates
	 * @property {string|function(object):string} [empty=''] Template to use when there are no results.
	 * @property {string|function(object):string} [item=''] Template to use for each result. This template will receive an object containing a single record.
	 * @property {string|function(object):string} [allItems=''] Template to use for the list of all results. (Can't be used with `item` template). This template will receive a complete SearchResults result object, this object contains the key hits that contains all the records retrieved.
	 */
	
	/**
	 * @typedef {Object} HitsTransforms
	 * @property {function(object):object} [empty] Method used to change the object passed to the `empty` template.
	 * @property {function(object):object} [item] Method used to change the object passed to the `item` template.
	 * @property {function(object):object} [allItems] Method used to change the object passed to the `allItems` template.
	 */
	
	/**
	 * @typedef {Object} HitsWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {HitsTemplates} [templates] Templates to use for the widget.
	 * @property {HitsTransforms} [transformData] Method to change the object passed to the templates.
	 * @property {HitsCSSClasses} [cssClasses] CSS classes to add.
	 */
	
	/**
	 * Display the list of results (hits) from the current search.
	 *
	 * This is a traditional display of the hits. It has to be implemented
	 * together with a pagination widget, to let the user browse the results
	 * beyond the first page.
	 * @type {WidgetFactory}
	 * @param {HitsWidgetOptions} $0 Options of the Hits widget.
	 * @return {Widget} A new instance of Hits widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.hits({
	 *     container: '#hits-container',
	 *     templates: {
	 *       empty: 'No results',
	 *       item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
	 *     },
	 *     hitsPerPage: 6
	 *   })
	 * );
	 */
	function hits(_ref3) {
	  var container = _ref3.container,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      transformData = _ref3.transformData;
	
	  if (!container) {
	    throw new Error('Must provide a container.' + usage);
	  }
	
	  if (templates.item && templates.allItems) {
	    throw new Error('Must contain only allItems OR item template.' + usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    empty: (0, _classnames2.default)(bem(null, 'empty'), userCssClasses.empty)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    renderState: {},
	    transformData: transformData,
	    templates: templates
	  });
	
	  try {
	    var makeHits = (0, _connectHits2.default)(specializedRenderer);
	    return makeHits();
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _map = __webpack_require__(195);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _has = __webpack_require__(288);
	
	var _has2 = _interopRequireDefault(_has);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Hits = function (_React$Component) {
	  _inherits(Hits, _React$Component);
	
	  function Hits() {
	    _classCallCheck(this, Hits);
	
	    return _possibleConstructorReturn(this, (Hits.__proto__ || Object.getPrototypeOf(Hits)).apply(this, arguments));
	  }
	
	  _createClass(Hits, [{
	    key: 'renderWithResults',
	    value: function renderWithResults() {
	      var _this2 = this;
	
	      var renderedHits = (0, _map2.default)(this.props.hits, function (hit, position) {
	        var data = _extends({}, hit, {
	          __hitIndex: position
	        });
	        return _react2.default.createElement(_Template2.default, _extends({
	          data: data,
	          key: data.objectID,
	          rootProps: { className: _this2.props.cssClasses.item },
	          templateKey: 'item'
	        }, _this2.props.templateProps));
	      });
	
	      return _react2.default.createElement(
	        'div',
	        { className: this.props.cssClasses.root },
	        renderedHits
	      );
	    }
	  }, {
	    key: 'renderAllResults',
	    value: function renderAllResults() {
	      var className = (0, _classnames2.default)(this.props.cssClasses.root, this.props.cssClasses.allItems);
	
	      return _react2.default.createElement(_Template2.default, _extends({
	        data: this.props.results,
	        rootProps: { className: className },
	        templateKey: 'allItems'
	      }, this.props.templateProps));
	    }
	  }, {
	    key: 'renderNoResults',
	    value: function renderNoResults() {
	      var className = (0, _classnames2.default)(this.props.cssClasses.root, this.props.cssClasses.empty);
	      return _react2.default.createElement(_Template2.default, _extends({
	        data: this.props.results,
	        rootProps: { className: className },
	        templateKey: 'empty'
	      }, this.props.templateProps));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var hasResults = this.props.results.hits.length > 0;
	      var hasAllItemsTemplate = (0, _has2.default)(this.props, 'templateProps.templates.allItems');
	
	      if (!hasResults) {
	        return this.renderNoResults();
	      }
	
	      // If a allItems template is defined, it takes precedence over our looping
	      // through hits
	      if (hasAllItemsTemplate) {
	        return this.renderAllResults();
	      }
	
	      return this.renderWithResults();
	    }
	  }]);
	
	  return Hits;
	}(_react2.default.Component);
	
	Hits.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    root: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    allItems: _react2.default.PropTypes.string,
	    empty: _react2.default.PropTypes.string
	  }),
	  hits: _react2.default.PropTypes.array,
	  results: _react2.default.PropTypes.object,
	  templateProps: _react2.default.PropTypes.object.isRequired
	};
	
	Hits.defaultProps = {
	  results: { hits: [] }
	};
	
	exports.default = Hits;

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(289),
	    hasPath = __webpack_require__(177);
	
	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}
	
	module.exports = has;


/***/ },
/* 289 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}
	
	module.exports = baseHas;


/***/ },
/* 290 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  empty: 'No results',
	  item: function item(data) {
	    return JSON.stringify(data, null, 2);
	  }
	};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hitsPerPageSelector;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Selector = __webpack_require__(292);
	
	var _Selector2 = _interopRequireDefault(_Selector);
	
	var _connectHitsPerPage = __webpack_require__(201);
	
	var _connectHitsPerPage2 = _interopRequireDefault(_connectHitsPerPage);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-hits-per-page-selector');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      autoHideContainer = _ref.autoHideContainer;
	  return function (_ref2, isFirstRendering) {
	    var items = _ref2.items,
	        refine = _ref2.refine,
	        hasNoResults = _ref2.hasNoResults;
	
	    if (isFirstRendering) return;
	
	    var _ref3 = items.find(function (_ref4) {
	      var isRefined = _ref4.isRefined;
	      return isRefined;
	    }) || {},
	        currentValue = _ref3.value;
	
	    _reactDom2.default.render(_react2.default.createElement(_Selector2.default, {
	      cssClasses: cssClasses,
	      currentValue: currentValue,
	      options: items,
	      setValue: refine,
	      shouldAutoHideContainer: autoHideContainer && hasNoResults
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nhitsPerPageSelector({\n  container,\n  items,\n  [ cssClasses.{root,item}={} ],\n  [ autoHideContainer=false ]\n})';
	
	/**
	 * @typedef {Object} HitsPerPageSelectorCSSClasses
	 * @property {string|string[]} [root] CSS classes added to the parent `<select>`.
	 * @property {string|string[]} [item] CSS classes added to each `<option>`.
	 */
	
	/**
	 * @typedef {Object} HitsPerPageSelectorItems
	 * @property {number} value number of hits to display per page.
	 * @property {string} label Label to display in the option.
	 */
	
	/**
	 * @typedef {Object} HitsPerPageSelectorWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {HitsPerPageSelectorItems[]} items Array of objects defining the different values and labels.
	 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
	 * @property {HitsPerPageSelectorCSSClasses} [cssClasses] CSS classes to be added.
	 */
	
	/**
	 * The hitsPerPageSelector widget gives the user the ability to change the number of results
	 * displayed in the hits widget.
	 * @type {WidgetFactory}
	 * @param {HitsPerPageSelectorWidgetOptions} $0 The options of the HitPerPageSelector widget.
	 * @return {Widget} A new instance of the HitPerPageSelector widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.hitsPerPageSelector({
	 *     container: '#hits-per-page-selector',
	 *     items: [
	 *       {value: 3, label: '3 per page'},
	 *       {value: 6, label: '6 per page'},
	 *       {value: 12, label: '12 per page'},
	 *     ]
	 *   })
	 * );
	 */
	function hitsPerPageSelector() {
	  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref5.container,
	      items = _ref5.items,
	      _ref5$cssClasses = _ref5.cssClasses,
	      userCssClasses = _ref5$cssClasses === undefined ? {} : _ref5$cssClasses,
	      _ref5$autoHideContain = _ref5.autoHideContainer,
	      autoHideContainer = _ref5$autoHideContain === undefined ? false : _ref5$autoHideContain;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    autoHideContainer: autoHideContainer
	  });
	
	  try {
	    var makeHitsPerPageSelector = (0, _connectHitsPerPage2.default)(specializedRenderer);
	    return makeHitsPerPageSelector({ items: items });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawSelector = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawSelector = exports.RawSelector = function (_React$Component) {
	  _inherits(RawSelector, _React$Component);
	
	  function RawSelector() {
	    _classCallCheck(this, RawSelector);
	
	    return _possibleConstructorReturn(this, (RawSelector.__proto__ || Object.getPrototypeOf(RawSelector)).apply(this, arguments));
	  }
	
	  _createClass(RawSelector, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleChange = this.handleChange.bind(this);
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(event) {
	      this.props.setValue(event.target.value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          currentValue = _props.currentValue,
	          options = _props.options;
	
	
	      return _react2.default.createElement(
	        'select',
	        {
	          className: this.props.cssClasses.root,
	          onChange: this.handleChange,
	          value: currentValue
	        },
	        options.map(function (option) {
	          return _react2.default.createElement(
	            'option',
	            {
	              className: _this2.props.cssClasses.item,
	              key: option.label + option.value,
	              value: option.value },
	            option.label
	          );
	        })
	      );
	    }
	  }]);
	
	  return RawSelector;
	}(_react2.default.Component);
	
	RawSelector.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    root: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
	    item: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)])
	  }),
	  currentValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    label: _react2.default.PropTypes.string.isRequired
	  })).isRequired,
	  setValue: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawSelector));

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = infiniteHits;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _InfiniteHits = __webpack_require__(294);
	
	var _InfiniteHits2 = _interopRequireDefault(_InfiniteHits);
	
	var _defaultTemplates = __webpack_require__(295);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _connectInfiniteHits = __webpack_require__(204);
	
	var _connectInfiniteHits2 = _interopRequireDefault(_connectInfiniteHits);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-infinite-hits');
	
	var renderer = function renderer(_ref) {
	  var cssClasses = _ref.cssClasses,
	      containerNode = _ref.containerNode,
	      renderState = _ref.renderState,
	      templates = _ref.templates,
	      transformData = _ref.transformData,
	      showMoreLabel = _ref.showMoreLabel;
	  return function (_ref2, isFirstRendering) {
	    var hits = _ref2.hits,
	        results = _ref2.results,
	        showMore = _ref2.showMore,
	        isLastPage = _ref2.isLastPage,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    _reactDom2.default.render(_react2.default.createElement(_InfiniteHits2.default, {
	      cssClasses: cssClasses,
	      hits: hits,
	      results: results,
	      showMore: showMore,
	      showMoreLabel: showMoreLabel,
	      templateProps: renderState.templateProps,
	      isLastPage: isLastPage
	    }), containerNode);
	  };
	};
	
	var usage = '\nUsage:\ninfiniteHits({\n  container,\n  [ showMoreLabel ],\n  [ cssClasses.{root,empty,item}={} ],\n  [ templates.{empty,item} | templates.{empty} ],\n  [ transformData.{empty,item} | transformData.{empty} ],\n})';
	
	/**
	 * @typedef {Object} InfiniteHitsTemplates
	 * @property  {string|function} [empty=""] Template used when there are no results.
	 * @property  {string|function} [item=""] Template used for each result. This template will receive an object containing a single record.
	 */
	
	/**
	 * @typedef {Object} InfiniteHitsTransforms
	 * @property  {function} [empty] Method used to change the object passed to the `empty` template.
	 * @property  {function} [item] Method used to change the object passed to the `item` template.
	 */
	
	/**
	 * @typedef {object} InfiniteHitsCSSClasses
	 * @property  {string|string[]} [root] CSS class to add to the wrapping element.
	 * @property  {string|string[]} [empty] CSS class to add to the wrapping element when no results.
	 * @property  {string|string[]} [item] CSS class to add to each result.
	 */
	
	/**
	 * @typedef {Object} InfiniteHitsWidgetOptions
	 * @property  {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property  {InfiniteHitsTemplates} [templates] Templates to use for the widget.
	 * @property  {string} [showMoreLabel="Show more results"] label used on the show more button.
	 * @property  {InfiniteHitsTransforms} [transformData] Method to change the object passed to the templates.
	 * @property  {InfiniteHitsCSSClasses} [cssClasses] CSS classes to add.
	 */
	
	/**
	 * Display the list of results (hits) from the current search.
	 *
	 * This widget uses the infinite hits pattern. It contains a button that
	 * will let the user load more results to the list. This is particularly
	 * handy on mobile implementations.
	 * @type {WidgetFactory}
	 * @param {InfiniteHitsWidgetOptions} $0 The options for the InfiniteHits widget.
	 * @return {Widget} Creates a new instance of the InfiniteHits widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.infiniteHits({
	 *     container: '#infinite-hits-container',
	 *     templates: {
	 *       empty: 'No results',
	 *       item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
	 *     },
	 *     hitsPerPage: 3
	 *   })
	 * );
	 */
	function infiniteHits() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$showMoreLabel = _ref3.showMoreLabel,
	      showMoreLabel = _ref3$showMoreLabel === undefined ? 'Show more results' : _ref3$showMoreLabel,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      transformData = _ref3.transformData;
	
	  if (!container) {
	    throw new Error('Must provide a container.' + usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    empty: (0, _classnames2.default)(bem(null, 'empty'), userCssClasses.empty),
	    showmore: (0, _classnames2.default)(bem('showmore'), userCssClasses.showmore)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    transformData: transformData,
	    templates: templates,
	    showMoreLabel: showMoreLabel,
	    renderState: {}
	  });
	
	  try {
	    var makeInfiniteHits = (0, _connectInfiniteHits2.default)(specializedRenderer);
	    return makeInfiniteHits();
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Hits = __webpack_require__(287);
	
	var _Hits2 = _interopRequireDefault(_Hits);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InfiniteHits = function (_React$Component) {
	  _inherits(InfiniteHits, _React$Component);
	
	  function InfiniteHits() {
	    _classCallCheck(this, InfiniteHits);
	
	    return _possibleConstructorReturn(this, (InfiniteHits.__proto__ || Object.getPrototypeOf(InfiniteHits)).apply(this, arguments));
	  }
	
	  _createClass(InfiniteHits, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          cssClasses = _props.cssClasses,
	          hits = _props.hits,
	          results = _props.results,
	          showMore = _props.showMore,
	          showMoreLabel = _props.showMoreLabel,
	          templateProps = _props.templateProps;
	
	      var btn = this.props.isLastPage ? _react2.default.createElement(
	        'button',
	        { disabled: true },
	        showMoreLabel
	      ) : _react2.default.createElement(
	        'button',
	        { onClick: showMore },
	        showMoreLabel
	      );
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_Hits2.default, {
	          cssClasses: cssClasses,
	          hits: hits,
	          results: results,
	          templateProps: templateProps
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: cssClasses.showmore },
	          btn
	        )
	      );
	    }
	  }]);
	
	  return InfiniteHits;
	}(_react2.default.Component);
	
	InfiniteHits.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    root: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    allItems: _react2.default.PropTypes.string,
	    empty: _react2.default.PropTypes.string,
	    showmore: _react2.default.PropTypes.string
	  }),
	  hits: _react2.default.PropTypes.array,
	  results: _react2.default.PropTypes.object,
	  showMore: _react2.default.PropTypes.func,
	  showMoreLabel: _react2.default.PropTypes.string,
	  templateProps: _react2.default.PropTypes.object.isRequired,
	  isLastPage: _react2.default.PropTypes.bool.isRequired
	};
	
	exports.default = InfiniteHits;

/***/ },
/* 295 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  empty: 'No results',
	  item: function item(data) {
	    return JSON.stringify(data, null, 2);
	  }
	};

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = menu;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _defaultTemplates = __webpack_require__(297);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _getShowMoreConfig = __webpack_require__(298);
	
	var _getShowMoreConfig2 = _interopRequireDefault(_getShowMoreConfig);
	
	var _connectMenu = __webpack_require__(205);
	
	var _connectMenu2 = _interopRequireDefault(_connectMenu);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-menu');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      renderState = _ref.renderState,
	      templates = _ref.templates,
	      transformData = _ref.transformData,
	      showMoreConfig = _ref.showMoreConfig;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        items = _ref2.items,
	        createURL = _ref2.createURL,
	        canRefine = _ref2.canRefine,
	        instantSearchInstance = _ref2.instantSearchInstance,
	        isShowingMore = _ref2.isShowingMore,
	        toggleShowMore = _ref2.toggleShowMore;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var facetValues = items.map(function (facetValue) {
	      return _extends({}, facetValue, { url: createURL(facetValue.name) });
	    });
	    var shouldAutoHideContainer = autoHideContainer && !canRefine;
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: facetValues,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      showMore: showMoreConfig !== null,
	      templateProps: renderState.templateProps,
	      toggleRefinement: refine,
	      toggleShowMore: toggleShowMore,
	      isShowingMore: isShowingMore
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nmenu({\n  container,\n  attributeName,\n  [ sortBy=[\'name:asc\'] ],\n  [ limit=10 ],\n  [ cssClasses.{root,list,item} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer ],\n  [ showMore.{templates: {active, inactive}, limit} ],\n  [ collapsible=false ]\n})';
	
	/**
	 * @typedef {Object} MenuCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [list] CSS class to add to the list element.
	 * @property {string|string[]} [item] CSS class to add to each item element.
	 * @property {string|string[]} [active] CSS class to add to each active element.
	 * @property {string|string[]} [link] CSS class to add to each link (when using the default template).
	 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
	 */
	
	/**
	 * @typedef {Object} MenuTemplates
	 * @property {string|Function} [header] Header template.
	 * @property {string|Function(name: string, count: number, isRefined: boolean)} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
	 * @property {string|Function} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} MenuShowMoreOptions
	 * @property {MenuShowMoreTemplates} [templates] Templates to use for showMore.
	 * @property {number} [limit] Max number of facets values to display when showMore is clicked.
	 */
	
	/**
	 * @typedef {Object} MenuShowMoreTemplates
	 * @property {string} [active] Template used when showMore was clicked.
	 * @property {string} [inactive] Template used when showMore not clicked.
	 */
	
	/**
	 * @typedef {Object} MenuTransforms
	 * @property {function} [item] Method to change the object passed to the `item` template.
	 */
	
	/**
	 * @typedef {Object} MenuWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string} attributeName Name of the attribute for faceting/
	 * @property {string[]|function} [sortBy=['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
	 *
	 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax). [*]
	 * @property {string} [limit=10] How many facets values to retrieve [*].
	 * @property {boolean|MenuShowMoreOptions} [showMore=false] Limit the number of results and display a showMore button.
	 * @property {MenuShowMoreTemplates} [templates] Templates to use for the widget.
	 * @property {MenuTransforms} [transformData] Set of functions to update the data before passing them to the templates.
	 * @property {boolean} [autoHideContainer=true] Hide the container when there are no items in the menu.
	 * @property {MenuCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
	 * @property {boolean|{collapsible: boolean}} [collapsible=false] Hide the widget body and footer when clicking on header.
	 */
	
	/**
	 * Create a menu out of a facet
	 * @type {WidgetFactory}
	 * @param {MenuWidgetOptions} $0 The Menu widget options.
	 * @return {Widget} Creates a new instance of the Menu widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.menu({
	 *     container: '#categories',
	 *     attributeName: 'hierarchicalCategories.lvl0',
	 *     limit: 10,
	 *     templates: {
	 *       header: 'Categories'
	 *     }
	 *   })
	 * );
	 */
	function menu(_ref3) {
	  var container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      _ref3$sortBy = _ref3.sortBy,
	      sortBy = _ref3$sortBy === undefined ? ['name:asc'] : _ref3$sortBy,
	      _ref3$limit = _ref3.limit,
	      limit = _ref3$limit === undefined ? 10 : _ref3$limit,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$showMore = _ref3.showMore,
	      showMore = _ref3$showMore === undefined ? false : _ref3$showMore;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var showMoreConfig = (0, _getShowMoreConfig2.default)(showMore);
	  if (showMoreConfig && showMoreConfig.limit < limit) {
	    throw new Error('showMore.limit configuration should be > than the limit in the main configuration'); // eslint-disable-line
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var showMoreLimit = showMoreConfig && showMoreConfig.limit || undefined;
	  var showMoreTemplates = showMoreConfig && (0, _utils.prefixKeys)('show-more-', showMoreConfig.templates);
	  var allTemplates = showMoreTemplates ? _extends({}, templates, showMoreTemplates) : templates;
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: allTemplates,
	    transformData: transformData,
	    showMoreConfig: showMoreConfig
	  });
	
	  try {
	    var makeWidget = (0, _connectMenu2.default)(specializedRenderer);
	    return makeWidget({ attributeName: attributeName, limit: limit, sortBy: sortBy, showMoreLimit: showMoreLimit });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 297 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable max-len */
	exports.default = {
	  header: '',
	  item: '<a class="{{cssClasses.link}}" href="{{url}}">{{label}} <span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
	  footer: ''
	};

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = getShowMoreConfig;
	
	var _defaultShowMoreTemplates = __webpack_require__(299);
	
	var _defaultShowMoreTemplates2 = _interopRequireDefault(_defaultShowMoreTemplates);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultShowMoreConfig = {
	  templates: _defaultShowMoreTemplates2.default,
	  limit: 100
	};
	
	function getShowMoreConfig(showMoreOptions) {
	  if (!showMoreOptions) return null;
	
	  if (showMoreOptions === true) {
	    return defaultShowMoreConfig;
	  }
	
	  var config = _extends({}, showMoreOptions);
	  if (!showMoreOptions.templates) {
	    config.templates = defaultShowMoreConfig.templates;
	  }
	  if (!showMoreOptions.limit) {
	    config.limit = defaultShowMoreConfig.limit;
	  }
	  return config;
	}

/***/ },
/* 299 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  active: '<a class="ais-show-more ais-show-more__active">Show less</a>',
	  inactive: '<a class="ais-show-more ais-show-more__inactive">Show more</a>'
	};

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = refinementList;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _filter = __webpack_require__(197);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _connectRefinementList = __webpack_require__(215);
	
	var _connectRefinementList2 = _interopRequireDefault(_connectRefinementList);
	
	var _defaultTemplates = __webpack_require__(301);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _getShowMoreConfig = __webpack_require__(298);
	
	var _getShowMoreConfig2 = _interopRequireDefault(_getShowMoreConfig);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-refinement-list');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      transformData = _ref.transformData,
	      templates = _ref.templates,
	      renderState = _ref.renderState,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      showMoreConfig = _ref.showMoreConfig,
	      searchForFacetValues = _ref.searchForFacetValues;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        items = _ref2.items,
	        createURL = _ref2.createURL,
	        searchForItems = _ref2.searchForItems,
	        isFromSearch = _ref2.isFromSearch,
	        instantSearchInstance = _ref2.instantSearchInstance,
	        canRefine = _ref2.canRefine,
	        toggleShowMore = _ref2.toggleShowMore,
	        isShowingMore = _ref2.isShowingMore,
	        hasExhaustiveItems = _ref2.hasExhaustiveItems;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    // Pass count of currently selected items to the header template
	    var headerFooterData = {
	      header: { refinedFacetsCount: (0, _filter2.default)(items, { isRefined: true }).length }
	    };
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: items,
	      headerFooterData: headerFooterData,
	      shouldAutoHideContainer: autoHideContainer && canRefine === false,
	      templateProps: renderState.templateProps,
	      toggleRefinement: refine,
	      searchFacetValues: searchForFacetValues ? searchForItems : undefined,
	      searchPlaceholder: searchForFacetValues.placeholder || 'Search for other...',
	      isFromSearch: isFromSearch,
	      showMore: showMoreConfig !== null,
	      toggleShowMore: toggleShowMore,
	      isShowingMore: isShowingMore,
	      hasExhaustiveItems: hasExhaustiveItems
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nrefinementList({\n  container,\n  attributeName,\n  [ operator=\'or\' ],\n  [ sortBy=[\'isRefined\', \'count:desc\', \'name:asc\'] ],\n  [ limit=10 ],\n  [ cssClasses.{root, header, body, footer, list, item, active, label, checkbox, count}],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n  [ showMore.{templates: {active, inactive}, limit} ],\n  [ collapsible=false ],\n  [ searchForFacetValues.{placeholder, templates: {noResults}}],\n})';
	
	/**
	 * @typedef {Object} SearchForFacetTemplates
	 * @property {string} [noResults] Templates to use for search for facet values.
	 */
	
	/**
	 * @typedef {Object} SearchForFacetOptions
	 * @property {string} [placeholder] Value of the search field placeholder.
	 * @property {SearchForFacetTemplates} [templates] Templates to use for search for facet values.
	 */
	
	/**
	 * @typedef {Object} RefinementListShowMoreTemplates
	 * @property {string} [active] Template used when showMore was clicked.
	 * @property {string} [inactive] Template used when showMore not clicked.
	 */
	
	/**
	 * @typedef {Object} RefinementListShowMoreOptions
	 * @property {RefinementListShowMoreTemplates} [templates] Templates to use for showMore.
	 * @property {number} [limit] Max number of facets values to display when showMore is clicked.
	 */
	
	/**
	 * @typedef {Object} RefinementListTemplates
	 * @property  {string|function(object):string} [header] Header template, provided with `refinedFacetsCount` data property.
	 * @property  {string|function(RefinementListItemData):string} [item] Item template, provided with `label`, `highlighted`, `value`, `count`, `isRefined`, `url` data properties.
	 * @property  {string|function} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} RefinementListItemData
	 * @property {number} count The number of occurences of the facet in the result set.
	 * @property {boolean} isRefined True if the value is selected.
	 * @property {string} label The label to display.
	 * @property {string} value The value used for refining.
	 * @property {string} highlighted The label highlighted (when using search for facet values).
	 * @property {string} url The url with this refinement selected.
	 * @property {object} cssClasses Object containing all the classes computed for the item.
	 */
	
	/**
	 * @typedef {Object} RefinementListTransforms
	 * @property {function} [item] Function to change the object passed to the `item` template.
	 */
	
	/**
	 * @typedef {Object} RefinementListCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [list] CSS class to add to the list element.
	 * @property {string|string[]} [item] CSS class to add to each item element.
	 * @property {string|string[]} [active] CSS class to add to each active element.
	 * @property {string|string[]} [label] CSS class to add to each label element (when using the default template).
	 * @property {string|string[]} [checkbox] CSS class to add to each checkbox element (when using the default template).
	 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
	 */
	
	/**
	 * @typedef {Object} RefinementListCollapsibleOptions
	 * @property {boolean} [collapsed] Initial collapsed state of a collapsible widget.
	 */
	
	/**
	 * @typedef {Object} RefinementListWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string} attributeName Name of the attribute for faceting.
	 * @property {"and"|"or"} [operator="or"] How to apply refinements. Possible values: `or`, `and`
	 * @property {string[]|function} [sortBy=["isRefined", "count:desc", "name:asc"]] How to sort refinements. Possible values: `count:asc` `count:desc` `name:asc` `name:desc` `isRefined`.
	 *
	 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
	 * @property {number} [limit=10] How much facet values to get. When the show more feature is activated this is the minimum number of facets requested (the show more button is not in active state).
	 * @property {SearchForFacetOptions|boolean} [searchForFacetValues=false] Add a search input to let the user search for more facet values.
	 * @property {RefinementListShowMoreOptions|boolean} [showMore=false] Limit the number of results and display a showMore button.
	 * @property {RefinementListTemplates} [templates] Templates to use for the widget.
	 * @property {RefinementListTransforms} [transformData] Functions to update the values before applying the templates.
	 * @property {boolean} [autoHideContainer=true] Hide the container when no items in the refinement list.
	 * @property {RefinementListCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
	 * @property {RefinementListCollapsibleOptions|boolean} [collapsible=false] If true, the user can collapse the widget. If the use clicks on the header, itwill hide the content and the footer.
	 */
	
	/**
	 * The refinement list widget is one of the most common widget that you can find
	 * in a search UI. With this widget, the user can filter the dataset based on facets.
	 *
	 * The refinement list displays only the most relevant facets for the current search
	 * context. The sort option only affects the facet that are returned by the engine,
	 * not which facets are returned.
	 *
	 * This widget also implements search for facet values, which is a mini search inside the
	 * values of the facets. This makes easy to deal with uncommon facet values.
	 * @type {WidgetFactory}
	 * @param {RefinementListWidgetOptions} $0 The RefinementList widget options that you use to customize the widget.
	 * @return {Widget} Creates a new instance of the RefinementList widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.refinementList({
	 *     container: '#brands',
	 *     attributeName: 'brand',
	 *     operator: 'or',
	 *     limit: 10,
	 *     templates: {
	 *       header: 'Brands'
	 *     }
	 *   })
	 * );
	 */
	function refinementList() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      _ref3$operator = _ref3.operator,
	      operator = _ref3$operator === undefined ? 'or' : _ref3$operator,
	      _ref3$sortBy = _ref3.sortBy,
	      sortBy = _ref3$sortBy === undefined ? ['isRefined', 'count:desc', 'name:asc'] : _ref3$sortBy,
	      _ref3$limit = _ref3.limit,
	      limit = _ref3$limit === undefined ? 10 : _ref3$limit,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$showMore = _ref3.showMore,
	      showMore = _ref3$showMore === undefined ? false : _ref3$showMore,
	      _ref3$searchForFacetV = _ref3.searchForFacetValues,
	      searchForFacetValues = _ref3$searchForFacetV === undefined ? false : _ref3$searchForFacetV;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var showMoreConfig = (0, _getShowMoreConfig2.default)(showMore);
	  if (showMoreConfig && showMoreConfig.limit < limit) {
	    throw new Error('showMore.limit configuration should be > than the limit in the main configuration'); // eslint-disable-line
	  }
	
	  var showMoreLimit = showMoreConfig && showMoreConfig.limit || limit;
	  var containerNode = (0, _utils.getContainerNode)(container);
	  var showMoreTemplates = showMoreConfig ? (0, _utils.prefixKeys)('show-more-', showMoreConfig.templates) : {};
	  var searchForValuesTemplates = searchForFacetValues ? searchForFacetValues.templates : {};
	  var allTemplates = _extends({}, templates, showMoreTemplates, searchForValuesTemplates);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
	    checkbox: (0, _classnames2.default)(bem('checkbox'), userCssClasses.checkbox),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    transformData: transformData,
	    templates: allTemplates,
	    renderState: {},
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    showMoreConfig: showMoreConfig,
	    searchForFacetValues: searchForFacetValues
	  });
	
	  try {
	    var makeWidget = (0, _connectRefinementList2.default)(specializedRenderer);
	    return makeWidget({
	      attributeName: attributeName,
	      operator: operator,
	      limit: limit,
	      showMoreLimit: showMoreLimit,
	      sortBy: sortBy
	    });
	  } catch (e) {
	    throw new Error(e);
	  }
	}

/***/ },
/* 301 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  item: '<label class="{{cssClasses.label}}">\n  <input type="checkbox"\n         class="{{cssClasses.checkbox}}"\n         value="{{value}}"\n         {{#isRefined}}checked{{/isRefined}} />\n      {{{highlighted}}}\n  <span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span>\n</label>',
	  footer: ''
	};

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = numericRefinementList;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _connectNumericRefinementList = __webpack_require__(206);
	
	var _connectNumericRefinementList2 = _interopRequireDefault(_connectNumericRefinementList);
	
	var _defaultTemplates = __webpack_require__(303);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-refinement-list');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      cssClasses = _ref.cssClasses,
	      renderState = _ref.renderState,
	      transformData = _ref.transformData,
	      templates = _ref.templates;
	  return function (_ref2, isFirstRendering) {
	    var createURL = _ref2.createURL,
	        instantSearchInstance = _ref2.instantSearchInstance,
	        refine = _ref2.refine,
	        items = _ref2.items,
	        hasNoResults = _ref2.hasNoResults;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: items,
	      shouldAutoHideContainer: autoHideContainer && hasNoResults,
	      templateProps: renderState.templateProps,
	      toggleRefinement: refine
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nnumericRefinementList({\n  container,\n  attributeName,\n  options,\n  [ cssClasses.{root,header,body,footer,list,item,active,label,radio,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer ],\n  [ collapsible=false ]\n})';
	
	/**
	 * @typedef {Object} NumericRefinementListCSSClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [list] CSS class to add to the list element.
	 * @property {string|string[]} [label] CSS class to add to each link element.
	 * @property {string|string[]} [item] CSS class to add to each item element.
	 * @property {string|string[]} [radio] CSS class to add to each radio element (when using the default template).
	 * @property {string|string[]} [active] CSS class to add to each active element.
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListTemplates
	 * @property {string|function} [header] Header template.
	 * @property {string|function} [item] Item template, provided with `name`, `isRefined`, `url` data properties.
	 * @property {string|function} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListOption
	 * @property {string} name Name of the option.
	 * @property {number} [start] Low bound of the option (>=).
	 * @property {number} [end] High bound of the option (<=).
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListTransforms
	 * @property {function({name: string, isRefined: boolean, url: string}):object} item Transforms the data for a single item to render.
	 */
	
	/**
	 * @typedef {Object} NumericRefinementListWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string} attributeName Name of the attribute for filtering.
	 * @property {NumericRefinementListOption[]} options List of all the options.
	 * @property {NumericRefinementListTemplates} [templates] Templates to use for the widget.
	 * @property {NumericRefinementListTransforms} [transformData] Functions to change the data passes to the templates. Only item can be set.
	 * @property {boolean} [autoHideContainer=true] Hide the container when no results match.
	 * @property {NumericRefinementListCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
	 * @property {boolean|{collapsible: boolean}} [collapsible=false] Hide the widget body and footer when clicking on header.
	 */
	
	/**
	 * The numeric refinement list is a widget that display a list of numeric filters in a list. Those numeric filters
	 * are pre-configured with creating the widget.
	 * @type {WidgetFactory}
	 * @param {NumericRefinementListWidgetOptions} $0 The NumericRefinementList widget options
	 * @return {Widget} Creates a new instance of the NumericRefinementList widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.numericRefinementList({
	 *     container: '#popularity',
	 *     attributeName: 'popularity',
	 *     options: [
	 *       {name: 'All'},
	 *       {end: 500, name: 'less than 500'},
	 *       {start: 500, end: 2000, name: 'between 500 and 2000'},
	 *       {start: 2000, name: 'more than 2000'}
	 *     ],
	 *     templates: {
	 *       header: 'Popularity'
	 *     }
	 *   })
	 * );
	 */
	function numericRefinementList() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      options = _ref3.options,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;
	
	  if (!container || !attributeName || !options) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
	    radio: (0, _classnames2.default)(bem('radio'), userCssClasses.radio),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    cssClasses: cssClasses,
	    renderState: {},
	    transformData: transformData,
	    templates: templates
	  });
	  try {
	    var makeNumericRefinementList = (0, _connectNumericRefinementList2.default)(specializedRenderer);
	    return makeNumericRefinementList({ attributeName: attributeName, options: options });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 303 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable max-len */
	exports.default = {
	  header: '',
	  item: '<label class="{{cssClasses.label}}">\n  <input type="radio" class="{{cssClasses.radio}}" name="{{attributeName}}" {{#isRefined}}checked{{/isRefined}} />{{label}}\n</label>',
	  footer: ''
	};

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = numericSelector;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Selector = __webpack_require__(292);
	
	var _Selector2 = _interopRequireDefault(_Selector);
	
	var _connectNumericSelector = __webpack_require__(210);
	
	var _connectNumericSelector2 = _interopRequireDefault(_connectNumericSelector);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-numeric-selector');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      autoHideContainer = _ref.autoHideContainer,
	      cssClasses = _ref.cssClasses;
	  return function (_ref2, isFirstRendering) {
	    var currentRefinement = _ref2.currentRefinement,
	        refine = _ref2.refine,
	        hasNoResults = _ref2.hasNoResults,
	        options = _ref2.options;
	
	    if (isFirstRendering) return;
	
	    _reactDom2.default.render(_react2.default.createElement(_Selector2.default, {
	      cssClasses: cssClasses,
	      currentValue: currentRefinement,
	      options: options,
	      setValue: refine,
	      shouldAutoHideContainer: autoHideContainer && hasNoResults
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage: numericSelector({\n  container,\n  attributeName,\n  options,\n  cssClasses.{root,item},\n  autoHideContainer\n})';
	
	/**
	 * @typedef {Object} NumericOption
	 * @property {number} value The numerical value to refine with.
	 * @property {string} label Label to display in the option.
	 */
	
	/**
	 * @typedef {Object} NumericSelectorCSSClasses
	 * @property {string|string[]} [root] CSS classes added to the parent `<select>`.
	 * @property {string|string[]} [item] CSS classes added to each `<option>`.
	 */
	
	/**
	 * @typedef {Object} NumericSelectorWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {string} attributeName Name of the numeric attribute to use.
	 * @property {NumericOption[]} options Array of objects defining the different values and labels.
	 * @property {string} [operator='='] The operator to use to refine.
	 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
	 * @property {NumericSelectorCSSClasses} [cssClasses] CSS classes to be added.
	 */
	
	/**
	 * Instantiate a dropdown element to choose the number of hits to display per page.
	 * @type {WidgetFactory}
	 * @param {NumericSelectorWidgetOptions} $0 The NumericSelector widget options.
	 * @return {Widget} A new instance of NumericSelector widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.numericSelector({
	 *     container: '#popularity-selector',
	 *     attributeName: 'popularity',
	 *     operator: '>=',
	 *     options: [
	 *       {label: 'Top 10', value: 9900},
	 *       {label: 'Top 100', value: 9800},
	 *       {label: 'Top 500', value: 9700}
	 *     ]
	 *   })
	 * );
	 */
	function numericSelector(_ref3) {
	  var container = _ref3.container,
	      _ref3$operator = _ref3.operator,
	      operator = _ref3$operator === undefined ? '=' : _ref3$operator,
	      attributeName = _ref3.attributeName,
	      options = _ref3.options,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? false : _ref3$autoHideContain;
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	  if (!container || !options || options.length === 0 || !attributeName) {
	    throw new Error(usage);
	  }
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item)
	  };
	
	  var specializedRenderer = renderer({ autoHideContainer: autoHideContainer, containerNode: containerNode, cssClasses: cssClasses });
	
	  try {
	    var makeNumericSelector = (0, _connectNumericSelector2.default)(specializedRenderer);
	    return makeNumericSelector({ operator: operator, attributeName: attributeName, options: options });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pagination;
	
	var _defaults = __webpack_require__(306);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Pagination = __webpack_require__(309);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	var _connectPagination = __webpack_require__(211);
	
	var _connectPagination2 = _interopRequireDefault(_connectPagination);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultLabels = {
	  previous: '‹',
	  next: '›',
	  first: '«',
	  last: '»'
	};
	
	var bem = (0, _utils.bemHelper)('ais-pagination');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      labels = _ref.labels,
	      showFirstLast = _ref.showFirstLast,
	      padding = _ref.padding,
	      autoHideContainer = _ref.autoHideContainer,
	      scrollToNode = _ref.scrollToNode;
	  return function (_ref2, isFirstRendering) {
	    var createURL = _ref2.createURL,
	        currentRefinement = _ref2.currentRefinement,
	        nbHits = _ref2.nbHits,
	        nbPages = _ref2.nbPages,
	        refine = _ref2.refine;
	
	    if (isFirstRendering) return;
	
	    var setCurrrentPage = function setCurrrentPage(pageNumber) {
	      refine(pageNumber);
	
	      if (scrollToNode !== false) {
	        scrollToNode.scrollIntoView();
	      }
	    };
	
	    var shouldAutoHideContainer = autoHideContainer && nbHits === 0;
	
	    _reactDom2.default.render(_react2.default.createElement(_Pagination2.default, {
	      createURL: createURL,
	      cssClasses: cssClasses,
	      currentPage: currentRefinement,
	      labels: labels,
	      nbHits: nbHits,
	      nbPages: nbPages,
	      padding: padding,
	      setCurrentPage: setCurrrentPage,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      showFirstLast: showFirstLast
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\npagination({\n  container,\n  [ cssClasses.{root,item,page,previous,next,first,last,active,disabled}={} ],\n  [ labels.{previous,next,first,last} ],\n  [ maxPages ],\n  [ padding=3 ],\n  [ showFirstLast=true ],\n  [ autoHideContainer=true ],\n  [ scrollTo=\'body\' ]\n})';
	
	/**
	 * @typedef {Object} PaginationCSSClasses
	 * @property  {string|string[]} [root] CSS classes added to the parent `<ul>`.
	 * @property  {string|string[]} [item] CSS classes added to each `<li>`.
	 * @property  {string|string[]} [link] CSS classes added to each link.
	 * @property  {string|string[]} [page] CSS classes added to page `<li>`.
	 * @property  {string|string[]} [previous] CSS classes added to the previous `<li>`.
	 * @property  {string|string[]} [next] CSS classes added to the next `<li>`.
	 * @property  {string|string[]} [first] CSS classes added to the first `<li>`.
	 * @property  {string|string[]} [last] CSS classes added to the last `<li>`.
	 * @property  {string|string[]} [active] CSS classes added to the active `<li>`.
	 * @property  {string|string[]} [disabled] CSS classes added to the disabled `<li>`.
	 */
	
	/**
	 * @typedef {Object} PaginationLabels
	 * @property  {string} [previous] Label for the Previous link.
	 * @property  {string} [next] Label for the Next link.
	 * @property  {string} [first] Label for the First link.
	 * @property  {string} [last] Label for the Last link.
	 */
	
	/**
	 * @typedef {Object} PaginationWidgetOptions
	 * @property  {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property  {number} [maxPages] The max number of pages to browse.
	 * @property  {number} [padding=3] The number of pages to display on each side of the current page.
	 * @property  {string|HTMLElement|boolean} [scrollTo='body'] Where to scroll after a click, set to `false` to disable.
	 * @property  {boolean} [showFirstLast=true] Define if the First and Last links should be displayed.
	 * @property  {boolean} [autoHideContainer=true] Hide the container when no results match.
	 * @property  {PaginationLabels} [labels] Text to display in the various links (prev, next, first, last).
	 * @property  {PaginationCSSClasses} [cssClasses] CSS classes to be added.
	 */
	
	/**
	 * The pagination widget allow the user to switch between pages of the results.
	 *
	 * This is an alternative to using the *show more* pattern, that allows the user
	 * only to display more items. The *show more* pattern is usually prefered
	 * because it is simpler to use, and it is more convenient in a mobile context.
	 * See the infinite hits widget, for more informations.
	 * @type {WidgetFactory}
	 * @param {PaginationWidgetOptions} $0 Options for the Pagination widget.
	 * @return {Widget} A new instance of Pagination widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.pagination({
	 *     container: '#pagination-container',
	 *     maxPages: 20,
	 *     // default is to scroll to 'body', here we disable this behavior
	 *     scrollTo: false,
	 *     showFirstLast: false,
	 *   })
	 * );
	 */
	function pagination() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      _ref3$labels = _ref3.labels,
	      userLabels = _ref3$labels === undefined ? defaultLabels : _ref3$labels,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      maxPages = _ref3.maxPages,
	      _ref3$padding = _ref3.padding,
	      padding = _ref3$padding === undefined ? 3 : _ref3$padding,
	      _ref3$showFirstLast = _ref3.showFirstLast,
	      showFirstLast = _ref3$showFirstLast === undefined ? true : _ref3$showFirstLast,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$scrollTo = _ref3.scrollTo,
	      userScrollTo = _ref3$scrollTo === undefined ? 'body' : _ref3$scrollTo;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var scrollTo = userScrollTo === true ? 'body' : userScrollTo;
	  var scrollToNode = scrollTo !== false ? (0, _utils.getContainerNode)(scrollTo) : false;
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    page: (0, _classnames2.default)(bem('item', 'page'), userCssClasses.page),
	    previous: (0, _classnames2.default)(bem('item', 'previous'), userCssClasses.previous),
	    next: (0, _classnames2.default)(bem('item', 'next'), userCssClasses.next),
	    first: (0, _classnames2.default)(bem('item', 'first'), userCssClasses.first),
	    last: (0, _classnames2.default)(bem('item', 'last'), userCssClasses.last),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    disabled: (0, _classnames2.default)(bem('item', 'disabled'), userCssClasses.disabled)
	  };
	
	  var labels = (0, _defaults2.default)(userLabels, defaultLabels);
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    labels: labels,
	    showFirstLast: showFirstLast,
	    padding: padding,
	    autoHideContainer: autoHideContainer,
	    scrollToNode: scrollToNode
	  });
	
	  try {
	    var makeWidget = (0, _connectPagination2.default)(specializedRenderer);
	    return makeWidget({ maxPages: maxPages });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(104),
	    assignInWith = __webpack_require__(307),
	    baseRest = __webpack_require__(102),
	    customDefaultsAssignIn = __webpack_require__(308);
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
	 * @example
	 *
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(args) {
	  args.push(undefined, customDefaultsAssignIn);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(96),
	    createAssigner = __webpack_require__(101),
	    keysIn = __webpack_require__(98);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(50);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
	 * of source objects to the destination object for all destination properties
	 * that resolve to `undefined`.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function customDefaultsAssignIn(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}
	
	module.exports = customDefaultsAssignIn;


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _forEach = __webpack_require__(5);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _defaultsDeep = __webpack_require__(310);
	
	var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);
	
	var _utils = __webpack_require__(153);
	
	var _Paginator = __webpack_require__(312);
	
	var _Paginator2 = _interopRequireDefault(_Paginator);
	
	var _PaginationLink = __webpack_require__(316);
	
	var _PaginationLink2 = _interopRequireDefault(_PaginationLink);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pagination = function (_React$Component) {
	  _inherits(Pagination, _React$Component);
	
	  function Pagination(props) {
	    _classCallCheck(this, Pagination);
	
	    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, (0, _defaultsDeep2.default)(props, Pagination.defaultProps)));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  _createClass(Pagination, [{
	    key: 'pageLink',
	    value: function pageLink(_ref) {
	      var label = _ref.label,
	          ariaLabel = _ref.ariaLabel,
	          pageNumber = _ref.pageNumber,
	          _ref$additionalClassN = _ref.additionalClassName,
	          additionalClassName = _ref$additionalClassN === undefined ? null : _ref$additionalClassN,
	          _ref$isDisabled = _ref.isDisabled,
	          isDisabled = _ref$isDisabled === undefined ? false : _ref$isDisabled,
	          _ref$isActive = _ref.isActive,
	          isActive = _ref$isActive === undefined ? false : _ref$isActive,
	          createURL = _ref.createURL;
	
	      var cssClasses = {
	        item: (0, _classnames2.default)(this.props.cssClasses.item, additionalClassName),
	        link: (0, _classnames2.default)(this.props.cssClasses.link)
	      };
	      if (isDisabled) {
	        cssClasses.item = (0, _classnames2.default)(cssClasses.item, this.props.cssClasses.disabled);
	      } else if (isActive) {
	        cssClasses.item = (0, _classnames2.default)(cssClasses.item, this.props.cssClasses.active);
	      }
	
	      var url = createURL && !isDisabled ? createURL(pageNumber) : '#';
	
	      return _react2.default.createElement(_PaginationLink2.default, {
	        ariaLabel: ariaLabel,
	        cssClasses: cssClasses,
	        handleClick: this.handleClick,
	        isDisabled: isDisabled,
	        key: label + pageNumber,
	        label: label,
	        pageNumber: pageNumber,
	        url: url
	      });
	    }
	  }, {
	    key: 'previousPageLink',
	    value: function previousPageLink(pager, createURL) {
	      return this.pageLink({
	        ariaLabel: 'Previous',
	        additionalClassName: this.props.cssClasses.previous,
	        isDisabled: pager.isFirstPage(),
	        label: this.props.labels.previous,
	        pageNumber: pager.currentPage - 1,
	        createURL: createURL
	      });
	    }
	  }, {
	    key: 'nextPageLink',
	    value: function nextPageLink(pager, createURL) {
	      return this.pageLink({
	        ariaLabel: 'Next',
	        additionalClassName: this.props.cssClasses.next,
	        isDisabled: pager.isLastPage(),
	        label: this.props.labels.next,
	        pageNumber: pager.currentPage + 1,
	        createURL: createURL
	      });
	    }
	  }, {
	    key: 'firstPageLink',
	    value: function firstPageLink(pager, createURL) {
	      return this.pageLink({
	        ariaLabel: 'First',
	        additionalClassName: this.props.cssClasses.first,
	        isDisabled: pager.isFirstPage(),
	        label: this.props.labels.first,
	        pageNumber: 0,
	        createURL: createURL
	      });
	    }
	  }, {
	    key: 'lastPageLink',
	    value: function lastPageLink(pager, createURL) {
	      return this.pageLink({
	        ariaLabel: 'Last',
	        additionalClassName: this.props.cssClasses.last,
	        isDisabled: pager.isLastPage(),
	        label: this.props.labels.last,
	        pageNumber: pager.total - 1,
	        createURL: createURL
	      });
	    }
	  }, {
	    key: 'pages',
	    value: function pages(pager, createURL) {
	      var _this2 = this;
	
	      var pages = [];
	
	      (0, _forEach2.default)(pager.pages(), function (pageNumber) {
	        var isActive = pageNumber === pager.currentPage;
	
	        pages.push(_this2.pageLink({
	          ariaLabel: pageNumber + 1,
	          additionalClassName: _this2.props.cssClasses.page,
	          isActive: isActive,
	          label: pageNumber + 1,
	          pageNumber: pageNumber,
	          createURL: createURL
	        }));
	      });
	
	      return pages;
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(pageNumber, event) {
	      if ((0, _utils.isSpecialClick)(event)) {
	        // do not alter the default browser behavior
	        // if one special key is down
	        return;
	      }
	      event.preventDefault();
	      this.props.setCurrentPage(pageNumber);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var pager = new _Paginator2.default({
	        currentPage: this.props.currentPage,
	        total: this.props.nbPages,
	        padding: this.props.padding
	      });
	
	      var createURL = this.props.createURL;
	
	      return _react2.default.createElement(
	        'ul',
	        { className: this.props.cssClasses.root },
	        this.props.showFirstLast ? this.firstPageLink(pager, createURL) : null,
	        this.previousPageLink(pager, createURL),
	        this.pages(pager, createURL),
	        this.nextPageLink(pager, createURL),
	        this.props.showFirstLast ? this.lastPageLink(pager, createURL) : null
	      );
	    }
	  }]);
	
	  return Pagination;
	}(_react2.default.Component);
	
	Pagination.propTypes = {
	  createURL: _react2.default.PropTypes.func,
	  cssClasses: _react2.default.PropTypes.shape({
	    root: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    link: _react2.default.PropTypes.string,
	    page: _react2.default.PropTypes.string,
	    previous: _react2.default.PropTypes.string,
	    next: _react2.default.PropTypes.string,
	    first: _react2.default.PropTypes.string,
	    last: _react2.default.PropTypes.string,
	    active: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.string
	  }),
	  currentPage: _react2.default.PropTypes.number,
	  labels: _react2.default.PropTypes.shape({
	    first: _react2.default.PropTypes.string,
	    last: _react2.default.PropTypes.string,
	    next: _react2.default.PropTypes.string,
	    previous: _react2.default.PropTypes.string
	  }),
	  nbHits: _react2.default.PropTypes.number,
	  nbPages: _react2.default.PropTypes.number,
	  padding: _react2.default.PropTypes.number,
	  setCurrentPage: _react2.default.PropTypes.func.isRequired,
	  showFirstLast: _react2.default.PropTypes.bool
	};
	
	Pagination.defaultProps = {
	  nbHits: 0,
	  currentPage: 0,
	  nbPages: 0
	};
	
	exports.default = Pagination;

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(104),
	    baseRest = __webpack_require__(102),
	    customDefaultsMerge = __webpack_require__(311),
	    mergeWith = __webpack_require__(43);
	
	/**
	 * This method is like `_.defaults` except that it recursively assigns
	 * default properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaults
	 * @example
	 *
	 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	 * // => { 'a': { 'b': 2, 'c': 3 } }
	 */
	var defaultsDeep = baseRest(function(args) {
	  args.push(undefined, customDefaultsMerge);
	  return apply(mergeWith, undefined, args);
	});
	
	module.exports = defaultsDeep;


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(44),
	    isObject = __webpack_require__(39);
	
	/**
	 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	 * objects into destination objects that are passed thru.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to merge.
	 * @param {Object} object The parent object of `objValue`.
	 * @param {Object} source The parent object of `srcValue`.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 * @returns {*} Returns the value to assign.
	 */
	function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	  if (isObject(objValue) && isObject(srcValue)) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, objValue);
	    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
	    stack['delete'](srcValue);
	  }
	  return objValue;
	}
	
	module.exports = customDefaultsMerge;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _range = __webpack_require__(313);
	
	var _range2 = _interopRequireDefault(_range);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paginator = function () {
	  function Paginator(params) {
	    _classCallCheck(this, Paginator);
	
	    this.currentPage = params.currentPage;
	    this.total = params.total;
	    this.padding = params.padding;
	  }
	
	  _createClass(Paginator, [{
	    key: 'pages',
	    value: function pages() {
	      var total = this.total,
	          currentPage = this.currentPage,
	          padding = this.padding;
	
	
	      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
	      if (totalDisplayedPages === total) return (0, _range2.default)(0, total);
	
	      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
	      var paddingRight = totalDisplayedPages - paddingLeft;
	
	      var first = currentPage - paddingLeft;
	      var last = currentPage + paddingRight;
	
	      return (0, _range2.default)(first, last);
	    }
	  }, {
	    key: 'nbPagesDisplayed',
	    value: function nbPagesDisplayed(padding, total) {
	      return Math.min(2 * padding + 1, total);
	    }
	  }, {
	    key: 'calculatePaddingLeft',
	    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
	      if (current <= padding) {
	        return current;
	      }
	
	      if (current >= total - padding) {
	        return totalDisplayedPages - (total - current);
	      }
	
	      return padding;
	    }
	  }, {
	    key: 'isLastPage',
	    value: function isLastPage() {
	      return this.currentPage === this.total - 1;
	    }
	  }, {
	    key: 'isFirstPage',
	    value: function isFirstPage() {
	      return this.currentPage === 0;
	    }
	  }]);
	
	  return Paginator;
	}();
	
	exports.default = Paginator;

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(314);
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();
	
	module.exports = range;


/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(315),
	    isIterateeCall = __webpack_require__(109),
	    toFinite = __webpack_require__(186);
	
	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toFinite(start);
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toFinite(end);
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	module.exports = createRange;


/***/ },
/* 315 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = baseRange;


/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PaginationLink = function (_React$Component) {
	  _inherits(PaginationLink, _React$Component);
	
	  function PaginationLink() {
	    _classCallCheck(this, PaginationLink);
	
	    return _possibleConstructorReturn(this, (PaginationLink.__proto__ || Object.getPrototypeOf(PaginationLink)).apply(this, arguments));
	  }
	
	  _createClass(PaginationLink, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleClick = this.handleClick.bind(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props, nextProps);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      this.props.handleClick(this.props.pageNumber, e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          cssClasses = _props.cssClasses,
	          label = _props.label,
	          ariaLabel = _props.ariaLabel,
	          url = _props.url,
	          isDisabled = _props.isDisabled;
	
	
	      var tagName = 'span';
	      var attributes = {
	        className: cssClasses.link,
	        dangerouslySetInnerHTML: {
	          __html: label
	        }
	      };
	
	      // "Enable" the element, by making it a link
	      if (!isDisabled) {
	        tagName = 'a';
	        attributes = _extends({}, attributes, {
	          'aria-label': ariaLabel,
	          'href': url,
	          'onClick': this.handleClick
	        });
	      }
	
	      var element = _react2.default.createElement(tagName, attributes);
	
	      return _react2.default.createElement(
	        'li',
	        { className: cssClasses.item },
	        element
	      );
	    }
	  }]);
	
	  return PaginationLink;
	}(_react2.default.Component);
	
	PaginationLink.propTypes = {
	  ariaLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
	  cssClasses: _react2.default.PropTypes.shape({
	    item: _react2.default.PropTypes.string,
	    link: _react2.default.PropTypes.string
	  }),
	  handleClick: _react2.default.PropTypes.func.isRequired,
	  isDisabled: _react2.default.PropTypes.bool,
	  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
	  pageNumber: _react2.default.PropTypes.number,
	  url: _react2.default.PropTypes.string
	};
	
	exports.default = PaginationLink;

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = priceRanges;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _PriceRanges = __webpack_require__(318);
	
	var _PriceRanges2 = _interopRequireDefault(_PriceRanges);
	
	var _connectPriceRanges = __webpack_require__(212);
	
	var _connectPriceRanges2 = _interopRequireDefault(_connectPriceRanges);
	
	var _defaultTemplates = __webpack_require__(320);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-price-ranges');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      templates = _ref.templates,
	      renderState = _ref.renderState,
	      collapsible = _ref.collapsible,
	      cssClasses = _ref.cssClasses,
	      labels = _ref.labels,
	      currency = _ref.currency,
	      autoHideContainer = _ref.autoHideContainer;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        items = _ref2.items,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && items.length === 0;
	
	    _reactDom2.default.render(_react2.default.createElement(_PriceRanges2.default, {
	      collapsible: collapsible,
	      cssClasses: cssClasses,
	      currency: currency,
	      facetValues: items,
	      labels: labels,
	      refine: refine,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\npriceRanges({\n  container,\n  attributeName,\n  [ currency=$ ],\n  [ cssClasses.{root,header,body,list,item,active,link,form,label,input,currency,separator,button,footer} ],\n  [ templates.{header,item,footer} ],\n  [ labels.{currency,separator,button} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';
	
	/**
	 * @typedef {Object} PriceRangeClasses
	 * @property  {string|string[]} [root] CSS class to add to the root element.
	 * @property  {string|string[]} [header] CSS class to add to the header element.
	 * @property  {string|string[]} [body] CSS class to add to the body element.
	 * @property  {string|string[]} [list] CSS class to add to the wrapping list element.
	 * @property  {string|string[]} [item] CSS class to add to each item element.
	 * @property  {string|string[]} [active] CSS class to add to the active item element.
	 * @property  {string|string[]} [link] CSS class to add to each link element.
	 * @property  {string|string[]} [form] CSS class to add to the form element.
	 * @property  {string|string[]} [label] CSS class to add to each wrapping label of the form.
	 * @property  {string|string[]} [input] CSS class to add to each input of the form.
	 * @property  {string|string[]} [currency] CSS class to add to each currency element of the form.
	 * @property  {string|string[]} [separator] CSS class to add to the separator of the form.
	 * @property  {string|string[]} [button] CSS class to add to the submit button of the form.
	 * @property  {string|string[]} [footer] CSS class to add to the footer element.
	 */
	
	/**
	 * @typedef {Object} PriceRangeLabels
	 * @property  {string} [separator] Separator label, between min and max.
	 * @property  {string} [button] Button label.
	 */
	
	/**
	 * @typedef {Object} PriceRangeTemplates
	 * @property  {string|function({from: number, to: number, currency: string})} [item] Item template. Template data: `from`, `to` and `currency`
	 */
	
	/**
	 * @typedef {Object} PriceRangeWidgetOptions
	 * @property  {string|HTMLElement} container Valid CSS Selector as a string or DOMElement.
	 * @property  {string} attributeName Name of the attribute for faceting.
	 * @property  {PriceRangeTemplates} [templates] Templates to use for the widget.
	 * @property  {string} [currency='$'] The currency to display.
	 * @property  {PriceRangeLabels} [labels] Labels to use for the widget.
	 * @property  {boolean} [autoHideContainer=true] Hide the container when no refinements available.
	 * @property  {PriceRangeClasses} [cssClasses] CSS classes to add.
	 * @property  {boolean|{collapsed: boolean}} [collapsible=false] Hide the widget body and footer when clicking on header.
	 */
	
	/**
	 * Price ranges widget let the user choose from of a set of predefined ranges. The ranges are
	 * displayed in a list.
	 *
	 * @type {WidgetFactory}
	 * @param {PriceRangeWidgetOptions} $0 The PriceRanges widget options.
	 * @return {Widget} A new instance of PriceRanges widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.priceRanges({
	 *     container: '#price-ranges',
	 *     attributeName: 'price',
	 *     labels: {
	 *       currency: '$',
	 *       separator: 'to',
	 *       button: 'Go'
	 *     },
	 *     templates: {
	 *       header: 'Price'
	 *     }
	 *   })
	 * );
	 */
	function priceRanges() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      _ref3$labels = _ref3.labels,
	      userLabels = _ref3$labels === undefined ? {} : _ref3$labels,
	      _ref3$currency = _ref3.currency,
	      userCurrency = _ref3$currency === undefined ? '$' : _ref3$currency,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var labels = _extends({
	    button: 'Go',
	    separator: 'to'
	  }, userLabels);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    form: (0, _classnames2.default)(bem('form'), userCssClasses.form),
	    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
	    input: (0, _classnames2.default)(bem('input'), userCssClasses.input),
	    currency: (0, _classnames2.default)(bem('currency'), userCssClasses.currency),
	    button: (0, _classnames2.default)(bem('button'), userCssClasses.button),
	    separator: (0, _classnames2.default)(bem('separator'), userCssClasses.separator),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer)
	  };
	
	  // before we had opts.currency, you had to pass labels.currency
	  var currency = userLabels.currency !== undefined ? userLabels.currency : userCurrency;
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    templates: templates,
	    renderState: {},
	    collapsible: collapsible,
	    cssClasses: cssClasses,
	    labels: labels,
	    currency: currency,
	    autoHideContainer: autoHideContainer
	  });
	
	  try {
	    var makeWidget = (0, _connectPriceRanges2.default)(specializedRenderer);
	    return makeWidget({ attributeName: attributeName });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawPriceRanges = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _PriceRangesForm = __webpack_require__(319);
	
	var _PriceRangesForm2 = _interopRequireDefault(_PriceRangesForm);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawPriceRanges = exports.RawPriceRanges = function (_React$Component) {
	  _inherits(RawPriceRanges, _React$Component);
	
	  function RawPriceRanges() {
	    _classCallCheck(this, RawPriceRanges);
	
	    return _possibleConstructorReturn(this, (RawPriceRanges.__proto__ || Object.getPrototypeOf(RawPriceRanges)).apply(this, arguments));
	  }
	
	  _createClass(RawPriceRanges, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.refine = this.refine.bind(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props.facetValues, nextProps.facetValues);
	    }
	  }, {
	    key: 'getForm',
	    value: function getForm() {
	      var labels = _extends({
	        currency: this.props.currency
	      }, this.props.labels);
	
	      var currentRefinement = void 0;
	      if (this.props.facetValues.length === 1) {
	        currentRefinement = {
	          from: this.props.facetValues[0].from !== undefined ? this.props.facetValues[0].from : '',
	          to: this.props.facetValues[0].to !== undefined ? this.props.facetValues[0].to : ''
	        };
	      } else {
	        currentRefinement = { from: '', to: '' };
	      }
	
	      return _react2.default.createElement(_PriceRangesForm2.default, {
	        cssClasses: this.props.cssClasses,
	        currentRefinement: currentRefinement,
	        labels: labels,
	        refine: this.refine
	      });
	    }
	  }, {
	    key: 'getItemFromFacetValue',
	    value: function getItemFromFacetValue(facetValue) {
	      var cssClassItem = (0, _classnames2.default)(this.props.cssClasses.item, _defineProperty({}, this.props.cssClasses.active, facetValue.isRefined));
	      var key = facetValue.from + '_' + facetValue.to;
	      var handleClick = this.refine.bind(this, facetValue);
	      var data = _extends({
	        currency: this.props.currency
	      }, facetValue);
	      return _react2.default.createElement(
	        'div',
	        { className: cssClassItem, key: key },
	        _react2.default.createElement(
	          'a',
	          {
	            className: this.props.cssClasses.link,
	            href: facetValue.url,
	            onClick: handleClick
	          },
	          _react2.default.createElement(_Template2.default, _extends({ data: data, templateKey: 'item' }, this.props.templateProps))
	        )
	      );
	    }
	  }, {
	    key: 'refine',
	    value: function refine(range, event) {
	      event.preventDefault();
	      this.props.refine(range);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: this.props.cssClasses.list },
	          this.props.facetValues.map(function (facetValue) {
	            return _this2.getItemFromFacetValue(facetValue);
	          })
	        ),
	        this.getForm()
	      );
	    }
	  }]);
	
	  return RawPriceRanges;
	}(_react2.default.Component);
	
	RawPriceRanges.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    active: _react2.default.PropTypes.string,
	    button: _react2.default.PropTypes.string,
	    form: _react2.default.PropTypes.string,
	    input: _react2.default.PropTypes.string,
	    item: _react2.default.PropTypes.string,
	    label: _react2.default.PropTypes.string,
	    link: _react2.default.PropTypes.string,
	    list: _react2.default.PropTypes.string,
	    separator: _react2.default.PropTypes.string
	  }),
	  currency: _react2.default.PropTypes.string,
	  facetValues: _react2.default.PropTypes.array,
	  labels: _react2.default.PropTypes.shape({
	    button: _react2.default.PropTypes.string,
	    to: _react2.default.PropTypes.string
	  }),
	  refine: _react2.default.PropTypes.func.isRequired,
	  templateProps: _react2.default.PropTypes.object.isRequired
	};
	
	RawPriceRanges.defaultProps = {
	  cssClasses: {}
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawPriceRanges));

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PriceRangesForm = function (_React$Component) {
	  _inherits(PriceRangesForm, _React$Component);
	
	  function PriceRangesForm(props) {
	    _classCallCheck(this, PriceRangesForm);
	
	    var _this = _possibleConstructorReturn(this, (PriceRangesForm.__proto__ || Object.getPrototypeOf(PriceRangesForm)).call(this, props));
	
	    _this.state = {
	      from: props.currentRefinement.from,
	      to: props.currentRefinement.to
	    };
	    return _this;
	  }
	
	  _createClass(PriceRangesForm, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleSubmit = this.handleSubmit.bind(this);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      this.setState({
	        from: props.currentRefinement.from,
	        to: props.currentRefinement.to
	      });
	    }
	  }, {
	    key: 'getInput',
	    value: function getInput(type) {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'label',
	        { className: this.props.cssClasses.label },
	        _react2.default.createElement(
	          'span',
	          { className: this.props.cssClasses.currency },
	          this.props.labels.currency,
	          ' '
	        ),
	        _react2.default.createElement('input', {
	          className: this.props.cssClasses.input,
	          onChange: function onChange(e) {
	            return _this2.setState(_defineProperty({}, type, e.target.value));
	          },
	          ref: type,
	          type: 'number',
	          value: this.state[type]
	        })
	      );
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(event) {
	      var from = this.refs.from.value !== '' ? parseInt(this.refs.from.value, 10) : undefined;
	      var to = this.refs.to.value !== '' ? parseInt(this.refs.to.value, 10) : undefined;
	      this.props.refine(from, to, event);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var fromInput = this.getInput('from');
	      var toInput = this.getInput('to');
	      var onSubmit = this.handleSubmit;
	      return _react2.default.createElement(
	        'form',
	        { className: this.props.cssClasses.form, onSubmit: onSubmit, ref: 'form' },
	        fromInput,
	        _react2.default.createElement(
	          'span',
	          { className: this.props.cssClasses.separator },
	          ' ',
	          this.props.labels.separator,
	          ' '
	        ),
	        toInput,
	        _react2.default.createElement(
	          'button',
	          { className: this.props.cssClasses.button, type: 'submit' },
	          this.props.labels.button
	        )
	      );
	    }
	  }]);
	
	  return PriceRangesForm;
	}(_react2.default.Component);
	
	PriceRangesForm.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    button: _react2.default.PropTypes.string,
	    currency: _react2.default.PropTypes.string,
	    form: _react2.default.PropTypes.string,
	    input: _react2.default.PropTypes.string,
	    label: _react2.default.PropTypes.string,
	    separator: _react2.default.PropTypes.string
	  }),
	  currentRefinement: _react2.default.PropTypes.shape({
	    from: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    to: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
	  }),
	  labels: _react2.default.PropTypes.shape({
	    button: _react2.default.PropTypes.string,
	    currency: _react2.default.PropTypes.string,
	    separator: _react2.default.PropTypes.string
	  }),
	  refine: _react2.default.PropTypes.func.isRequired
	};
	
	PriceRangesForm.defaultProps = {
	  cssClasses: {},
	  labels: {}
	};
	
	exports.default = PriceRangesForm;

/***/ },
/* 320 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  item: '\n    {{#from}}\n      {{^to}}\n        &ge;\n      {{/to}}\n      {{currency}}{{#helpers.formatNumber}}{{from}}{{/helpers.formatNumber}}\n    {{/from}}\n    {{#to}}\n      {{#from}}\n        -\n      {{/from}}\n      {{^from}}\n        &le;\n      {{/from}}\n      {{#helpers.formatNumber}}{{to}}{{/helpers.formatNumber}}\n    {{/to}}\n  ',
	  footer: ''
	};

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = searchBox;
	
	var _forEach = __webpack_require__(5);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _isString = __webpack_require__(194);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _isFunction = __webpack_require__(38);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _hogan = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"hogan.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _hogan2 = _interopRequireDefault(_hogan);
	
	var _connectSearchBox = __webpack_require__(216);
	
	var _connectSearchBox2 = _interopRequireDefault(_connectSearchBox);
	
	var _defaultTemplates = __webpack_require__(322);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-search-box');
	var KEY_ENTER = 13;
	var KEY_SUPPRESS = 8;
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      placeholder = _ref.placeholder,
	      poweredBy = _ref.poweredBy,
	      templates = _ref.templates,
	      autofocus = _ref.autofocus,
	      searchOnEnterKeyPressOnly = _ref.searchOnEnterKeyPressOnly,
	      wrapInput = _ref.wrapInput;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        query = _ref2.query,
	        onHistoryChange = _ref2.onHistoryChange;
	
	    if (isFirstRendering) {
	      (function () {
	        var INPUT_EVENT = window.addEventListener ? 'input' : 'propertychange';
	        var input = createInput(containerNode);
	        var isInputTargeted = input === containerNode;
	        if (isInputTargeted) {
	          // To replace the node, we need to create an intermediate node
	          var placeholderNode = document.createElement('div');
	          input.parentNode.insertBefore(placeholderNode, input);
	          var parentNode = input.parentNode;
	          var wrappedInput = wrapInput ? wrapInputFn(input, cssClasses) : input;
	          parentNode.replaceChild(wrappedInput, placeholderNode);
	        } else {
	          var _wrappedInput = wrapInput ? wrapInputFn(input, cssClasses) : input;
	          containerNode.appendChild(_wrappedInput);
	        }
	        addDefaultAttributesToInput(placeholder, input, query, cssClasses);
	        // Optional "powered by Algolia" widget
	        if (poweredBy) {
	          addPoweredBy(input, poweredBy, templates);
	        }
	        // When the page is coming from BFCache
	        // (https://developer.mozilla.org/en-US/docs/Working_with_BFCache)
	        // then we force the input value to be the current query
	        // Otherwise, this happens:
	        // - <input> autocomplete = off (default)
	        // - search $query
	        // - navigate away
	        // - use back button
	        // - input query is empty (because <input> autocomplete = off)
	        window.addEventListener('pageshow', function () {
	          input.value = query;
	        });
	
	        // Update value when query change outside of the input
	        onHistoryChange(function (fullState) {
	          input.value = fullState.query || '';
	        });
	
	        if (autofocus === true || autofocus === 'auto' && query === '') {
	          input.focus();
	          input.setSelectionRange(query.length, query.length);
	        }
	
	        // search on enter
	        if (searchOnEnterKeyPressOnly) {
	          addListener(input, INPUT_EVENT, function (e) {
	            refine(getValue(e), false);
	          });
	          addListener(input, 'keyup', function (e) {
	            if (e.keyCode === KEY_ENTER) refine(getValue(e));
	          });
	        } else {
	          addListener(input, INPUT_EVENT, getInputValueAndCall(refine));
	
	          // handle IE8 weirdness where BACKSPACE key will not trigger an input change..
	          // can be removed as soon as we remove support for it
	          if (INPUT_EVENT === 'propertychange' || window.attachEvent) {
	            addListener(input, 'keyup', ifKey(KEY_SUPPRESS, getInputValueAndCall(refine)));
	          }
	        }
	      })();
	    } else {
	      var input = getInput(containerNode);
	      var isFocused = document.activeElement === input;
	      if (!isFocused && query !== input.value) {
	        input.value = query;
	      }
	    }
	  };
	};
	
	var usage = 'Usage:\nsearchBox({\n  container,\n  [ placeholder ],\n  [ cssClasses.{input,poweredBy} ],\n  [ poweredBy=false || poweredBy.{template, cssClasses.{root,link}} ],\n  [ wrapInput ],\n  [ autofocus ],\n  [ searchOnEnterKeyPressOnly ],\n  [ queryHook ]\n})';
	
	/**
	 * @typedef {Object} SearchBoxPoweredByCSSClasses
	 * @property  {string|string[]} [root] CSS class to add to the root element.
	 * @property  {string|string[]} [link] CSS class to add to the link element.
	 */
	
	/**
	 * @typedef {Object} SearchBoxPoweredByOption
	 * @property {function|string} template Template used for displaying the link. Can accept a function or a Hogan string.
	 * @property {SearchBoxPoweredByCSSClasses} [cssClasses] CSS classes added to the powered-by badge.
	 */
	
	/**
	 * @typedef {Object} SearchBoxCSSClasses
	 * @property  {string|string[]} [root] CSS class to add to the
	 * wrapping `<div>` (if `wrapInput` set to `true`).
	 * @property  {string|string[]} [input] CSS class to add to the input.
	 */
	
	/**
	 * @typedef {Object} SearchBoxWidgetOptions
	 * @property  {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property  {string} [placeholder] Input's placeholder.
	 * @property  {boolean|SearchBoxPoweredByOption} [poweredBy=false] Define if a "powered by Algolia" link should be added near the input.
	 * @property  {boolean} [wrapInput=true] Wrap the input in a `div.ais-search-box`.
	 * @property  {boolean|string} [autofocus="auto"] autofocus on the input.
	 * @property  {boolean} [searchOnEnterKeyPressOnly=false] If set, trigger the search
	 * once `<Enter>` is pressed only.
	 * @property  {SearchBoxCSSClasses} [cssClasses] CSS classes to add.
	 * @property  {function} [queryHook] A function that will be called every time a new search would be done. You
	 * will get the query as first parameter and a search(query) function to call as the second parameter.
	 * This queryHook can be used to debounce the number of searches done from the searchBox.
	 */
	
	/**
	 * The searchbox widget is used to let the user set a text based query.
	 *
	 * This is usually the  main entry point to start the search in an instantsearch context. For that
	 * reason is usually placed on top, and not hidden so that the user can start searching right
	 * away.
	 *
	 * @type {WidgetFactory}
	 * @param {SearchBoxWidgetOptions} $0 Options used to configure a SearchBox widget.
	 * @return {Widget} Creates a new instance of the SearchBox widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.searchBox({
	 *     container: '#q',
	 *     placeholder: 'Search for products',
	 *     autofocus: false,
	 *     poweredBy: true
	 *   })
	 * );
	 */
	function searchBox() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      _ref3$placeholder = _ref3.placeholder,
	      placeholder = _ref3$placeholder === undefined ? '' : _ref3$placeholder,
	      _ref3$cssClasses = _ref3.cssClasses,
	      cssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$poweredBy = _ref3.poweredBy,
	      poweredBy = _ref3$poweredBy === undefined ? false : _ref3$poweredBy,
	      _ref3$wrapInput = _ref3.wrapInput,
	      wrapInput = _ref3$wrapInput === undefined ? true : _ref3$wrapInput,
	      _ref3$autofocus = _ref3.autofocus,
	      autofocus = _ref3$autofocus === undefined ? 'auto' : _ref3$autofocus,
	      _ref3$searchOnEnterKe = _ref3.searchOnEnterKeyPressOnly,
	      searchOnEnterKeyPressOnly = _ref3$searchOnEnterKe === undefined ? false : _ref3$searchOnEnterKe,
	      queryHook = _ref3.queryHook;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  // Only possible values are 'auto', true and false
	  if (typeof autofocus !== 'boolean') {
	    autofocus = 'auto';
	  }
	
	  // Convert to object if only set to true
	  if (poweredBy === true) {
	    poweredBy = {};
	  }
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    placeholder: placeholder,
	    poweredBy: poweredBy,
	    templates: _defaultTemplates2.default,
	    autofocus: autofocus,
	    searchOnEnterKeyPressOnly: searchOnEnterKeyPressOnly,
	    wrapInput: wrapInput
	  });
	
	  try {
	    var makeWidget = (0, _connectSearchBox2.default)(specializedRenderer);
	    return makeWidget({ queryHook: queryHook });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}
	
	// the 'input' event is triggered when the input value changes
	// in any case: typing, copy pasting with mouse..
	// 'onpropertychange' is the IE8 alternative until we support IE8
	// but it's flawed: http://help.dottoro.com/ljhxklln.php
	
	function createInput(containerNode) {
	  // Returns reference to targeted input if present, or create a new one
	  if (containerNode.tagName === 'INPUT') {
	    return containerNode;
	  }
	  return document.createElement('input');
	}
	
	function getInput(containerNode) {
	  // Returns reference to targeted input if present, or look for it inside
	  if (containerNode.tagName === 'INPUT') {
	    return containerNode;
	  }
	  return containerNode.querySelector('input');
	}
	
	function wrapInputFn(input, cssClasses) {
	  // Wrap input in a .ais-search-box div
	  var wrapper = document.createElement('div');
	  var CSSClassesToAdd = (0, _classnames2.default)(bem(null), cssClasses.root).split(' ');
	  CSSClassesToAdd.forEach(function (cssClass) {
	    return wrapper.classList.add(cssClass);
	  });
	  wrapper.appendChild(input);
	  return wrapper;
	}
	
	function addListener(el, type, fn) {
	  if (el.addEventListener) {
	    el.addEventListener(type, fn);
	  } else {
	    el.attachEvent('on' + type, fn);
	  }
	}
	
	function getValue(e) {
	  return (e.currentTarget ? e.currentTarget : e.srcElement).value;
	}
	
	function ifKey(expectedKeyCode, func) {
	  return function (actualEvent) {
	    return actualEvent.keyCode === expectedKeyCode && func(actualEvent);
	  };
	}
	
	function getInputValueAndCall(func) {
	  return function (actualEvent) {
	    return func(getValue(actualEvent));
	  };
	}
	
	function addDefaultAttributesToInput(placeholder, input, query, cssClasses) {
	  var defaultAttributes = {
	    autocapitalize: 'off',
	    autocomplete: 'off',
	    autocorrect: 'off',
	    placeholder: placeholder,
	    role: 'textbox',
	    spellcheck: 'false',
	    type: 'text',
	    value: query
	  };
	
	  // Overrides attributes if not already set
	  (0, _forEach2.default)(defaultAttributes, function (value, key) {
	    if (input.hasAttribute(key)) {
	      return;
	    }
	    input.setAttribute(key, value);
	  });
	
	  // Add classes
	  var CSSClassesToAdd = (0, _classnames2.default)(bem('input'), cssClasses.input).split(' ');
	  CSSClassesToAdd.forEach(function (cssClass) {
	    return input.classList.add(cssClass);
	  });
	}
	
	function addPoweredBy(input, poweredBy, templates) {
	  // Default values
	  poweredBy = _extends({
	    cssClasses: {},
	    template: templates.poweredBy
	  }, poweredBy);
	
	  var poweredByCSSClasses = {
	    root: (0, _classnames2.default)(bem('powered-by'), poweredBy.cssClasses.root),
	    link: (0, _classnames2.default)(bem('powered-by-link'), poweredBy.cssClasses.link)
	  };
	
	  var url = 'https://www.algolia.com/?' + 'utm_source=instantsearch.js&' + 'utm_medium=website&' + ('utm_content=' + location.hostname + '&') + 'utm_campaign=poweredby';
	
	  var templateData = {
	    cssClasses: poweredByCSSClasses,
	    url: url
	  };
	
	  var template = poweredBy.template;
	  var stringNode = void 0;
	
	  if ((0, _isString2.default)(template)) {
	    stringNode = _hogan2.default.compile(template).render(templateData);
	  }
	  if ((0, _isFunction2.default)(template)) {
	    stringNode = template(templateData);
	  }
	
	  // Crossbrowser way to create a DOM node from a string. We wrap in
	  // a `span` to make sure we have one and only one node.
	  var tmpNode = document.createElement('div');
	  tmpNode.innerHTML = '<span>' + stringNode.trim() + '</span>';
	  var htmlNode = tmpNode.firstChild;
	
	  input.parentNode.insertBefore(htmlNode, input.nextSibling);
	}

/***/ },
/* 322 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  poweredBy: "\n<div class=\"{{cssClasses.root}}\">\n  Search by\n  <a class=\"{{cssClasses.link}}\" href=\"{{url}}\" target=\"_blank\">Algolia</a>\n</div>"
	};

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rangeSlider;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Slider = __webpack_require__(324);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _connectRangeSlider = __webpack_require__(214);
	
	var _connectRangeSlider2 = _interopRequireDefault(_connectRangeSlider);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultTemplates = {
	  header: '',
	  footer: ''
	};
	
	var bem = (0, _utils.bemHelper)('ais-range-slider');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      tooltips = _ref.tooltips,
	      renderState = _ref.renderState,
	      autoHideContainer = _ref.autoHideContainer,
	      pips = _ref.pips,
	      step = _ref.step,
	      collapsible = _ref.collapsible,
	      templates = _ref.templates;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        range = _ref2.range,
	        start = _ref2.start,
	        instantSearchInstance = _ref2.instantSearchInstance,
	        format = _ref2.format;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        defaultTemplates: defaultTemplates,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && range.min === range.max;
	
	    if (tooltips.format !== undefined) {
	      tooltips = [{ to: tooltips.format }, { to: tooltips.format }];
	    }
	
	    _reactDom2.default.render(_react2.default.createElement(_Slider2.default, {
	      collapsible: collapsible,
	      cssClasses: cssClasses,
	      onChange: refine,
	      pips: pips,
	      range: range,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      start: start,
	      step: step,
	      templateProps: renderState.templateProps,
	      tooltips: tooltips,
	      format: format
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nrangeSlider({\n  container,\n  attributeName,\n  [ tooltips=true ],\n  [ templates.{header, footer} ],\n  [ cssClasses.{root, header, body, footer} ],\n  [ step=1 ],\n  [ pips=true ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n  [ min ],\n  [ max ]\n});\n';
	
	/**
	 * @typedef {Object} RangeSliderTemplates
	 * @property  {string|function} [header=""] Header template.
	 * @property  {string|function} [footer=""] Footer template.
	 */
	
	/**
	 * @typedef {Object} RangeSliderCssClasses
	 * @property  {string|string[]} [root] CSS class to add to the root element.
	 * @property  {string|string[]} [header] CSS class to add to the header element.
	 * @property  {string|string[]} [body] CSS class to add to the body element.
	 * @property  {string|string[]} [footer] CSS class to add to the footer element.
	 */
	
	/**
	 * @typedef {Object} RangeSliderTooltipOptions
	 * @property {function(number):string} format The function takes the raw value as input, and should return
	 * a string for the label that should be used for this value.
	 * `format: function(rawValue) {return '$' + Math.round(rawValue).toLocaleString()}`
	 */
	
	/**
	 * @typedef {Object} RangeSliderCollapsibleOptions
	 * @property  {boolean} [collapsed] Initially collapsed state of a collapsible widget.
	 */
	
	/**
	 * @typedef {Object} RangeSliderWidgetOptions
	 * @property  {string|HTMLElement} container CSS Selector or DOMElement to insert the widget.
	 * @property  {string} attributeName Name of the attribute for faceting.
	 * @property  {boolean|RangeSliderTooltipOptions} [tooltips=true] Should we show tooltips or not.
	 * The default tooltip will show the raw value.
	 * You can also provide an object with a format function as an attribute.
	 * So that you can format the tooltip display value as you want
	 * @property  {RangeSliderTemplates} [templates] Templates to use for the widget.
	 * @property  {boolean} [autoHideContainer=true] Hide the container when no refinements available.
	 * @property  {RangeSliderCssClasses} [cssClasses] CSS classes to add to the wrapping elements.
	 * @property  {boolean} [pips=true] Show slider pips.
	 * @property  {number} [step=1] Every handle move will jump that number of steps.
	 * @property  {boolean|RangeSliderCollapsibleOptions} [collapsible=false] Hide the widget body and footer when clicking on header.
	 * @property  {number} [min] Minimal slider value, default to automatically computed from the result set.
	 * @property  {number} [max] Maximal slider value, defaults to automatically computed from the result set.
	 */
	
	/**
	 * The range slider is a widget which provides a user-friendly way to filter the
	 * results based on a single numeric range.
	 *
	 * @type {WidgetFactory}
	 * @param {RangeSliderWidgetOptions} $0 RangeSlider widget options.
	 * @return {Widget} A new RangeSlider widget instance.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.rangeSlider({
	 *     container: '#price',
	 *     attributeName: 'price',
	 *     templates: {
	 *       header: 'Price'
	 *     },
	 *     tooltips: {
	 *       format: function(rawValue) {
	 *         return '$' + Math.round(rawValue).toLocaleString();
	 *       }
	 *     }
	 *   })
	 * );
	 */
	function rangeSlider() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      _ref3$tooltips = _ref3.tooltips,
	      tooltips = _ref3$tooltips === undefined ? true : _ref3$tooltips,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$step = _ref3.step,
	      step = _ref3$step === undefined ? 1 : _ref3$step,
	      _ref3$pips = _ref3.pips,
	      pips = _ref3$pips === undefined ? true : _ref3$pips,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      min = _ref3.min,
	      max = _ref3.max,
	      _ref3$precision = _ref3.precision,
	      precision = _ref3$precision === undefined ? 2 : _ref3$precision;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    tooltips: tooltips,
	    templates: templates,
	    renderState: {},
	    collapsible: collapsible,
	    step: step,
	    pips: pips,
	    autoHideContainer: autoHideContainer
	  });
	
	  try {
	    var makeWidget = (0, _connectRangeSlider2.default)(specializedRenderer);
	    return makeWidget({ attributeName: attributeName, min: min, max: max, precision: precision });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawSlider = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _omit = __webpack_require__(325);
	
	var _omit2 = _interopRequireDefault(_omit);
	
	var _reactNouislider = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-nouislider\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactNouislider2 = _interopRequireDefault(_reactNouislider);
	
	var _isEqual = __webpack_require__(132);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var cssPrefix = 'ais-range-slider--';
	
	var RawSlider = exports.RawSlider = function (_React$Component) {
	  _inherits(RawSlider, _React$Component);
	
	  function RawSlider() {
	    _classCallCheck(this, RawSlider);
	
	    return _possibleConstructorReturn(this, (RawSlider.__proto__ || Object.getPrototypeOf(RawSlider)).apply(this, arguments));
	  }
	
	  _createClass(RawSlider, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleChange = this.handleChange.bind(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _isEqual2.default)(this.props.range, nextProps.range) || !(0, _isEqual2.default)(this.props.start, nextProps.start);
	    }
	
	    // we are only interested in rawValues
	
	  }, {
	    key: 'handleChange',
	    value: function handleChange(formattedValues, handleId, rawValues) {
	      this.props.onChange(rawValues);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // display a `disabled` state of the `NoUiSlider` when range.min === range.max
	      var _props$range = this.props.range,
	          min = _props$range.min,
	          max = _props$range.max;
	
	      var isDisabled = min === max;
	
	      // when range.min === range.max, we only want to add a little more to the max
	      // to display the same value in the UI, but the `NoUiSlider` wont
	      // throw an error since they are not the same value.
	      var range = isDisabled ? { min: min, max: min + 0.0001 } : { min: min, max: max };
	
	      // setup pips
	      var pips = void 0;
	      if (this.props.pips === false) {
	        pips = undefined;
	      } else if (this.props.pips === true || typeof this.props.pips === 'undefined') {
	        pips = {
	          mode: 'positions',
	          density: 3,
	          values: [0, 50, 100],
	          stepped: true
	        };
	      } else {
	        pips = this.props.pips;
	      }
	
	      return _react2.default.createElement(_reactNouislider2.default
	      // NoUiSlider also accepts a cssClasses prop, but we don't want to
	      // provide one.
	      , _extends({}, (0, _omit2.default)(this.props, ['cssClasses', 'range']), {
	        animate: false,
	        behaviour: 'snap',
	        connect: true,
	        cssPrefix: cssPrefix,
	        onChange: this.handleChange,
	        range: range,
	        disabled: isDisabled,
	        pips: pips
	      }));
	    }
	  }]);
	
	  return RawSlider;
	}(_react2.default.Component);
	
	RawSlider.propTypes = {
	  onChange: _react2.default.PropTypes.func,
	  onSlide: _react2.default.PropTypes.func,
	  pips: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.object]),
	  range: _react2.default.PropTypes.object.isRequired,
	  start: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
	  tooltips: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    to: _react2.default.PropTypes.func
	  }))])
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawSlider));

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(173),
	    baseClone = __webpack_require__(257),
	    baseUnset = __webpack_require__(326),
	    castPath = __webpack_require__(165),
	    copyObject = __webpack_require__(96),
	    customOmitClone = __webpack_require__(330),
	    flatRest = __webpack_require__(331),
	    getAllKeysIn = __webpack_require__(263);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable property paths of `object` that are not omitted.
	 *
	 * **Note:** This method is considerably slower than `_.pick`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, paths) {
	  var result = {};
	  if (object == null) {
	    return result;
	  }
	  var isDeep = false;
	  paths = arrayMap(paths, function(path) {
	    path = castPath(path, object);
	    isDeep || (isDeep = path.length > 1);
	    return path;
	  });
	  copyObject(object, getAllKeysIn(object), result);
	  if (isDeep) {
	    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	  }
	  var length = paths.length;
	  while (length--) {
	    baseUnset(result, paths[length]);
	  }
	  return result;
	});
	
	module.exports = omit;


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(165),
	    last = __webpack_require__(327),
	    parent = __webpack_require__(328),
	    toKey = __webpack_require__(174);
	
	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */
	function baseUnset(object, path) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}
	
	module.exports = baseUnset;


/***/ },
/* 327 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(164),
	    baseSlice = __webpack_require__(329);
	
	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}
	
	module.exports = parent;


/***/ },
/* 329 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var isPlainObject = __webpack_require__(94);
	
	/**
	 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	 * objects.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {string} key The key of the property to inspect.
	 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	 */
	function customOmitClone(value) {
	  return isPlainObject(value) ? undefined : value;
	}
	
	module.exports = customOmitClone;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(332),
	    overRest = __webpack_require__(103),
	    setToString = __webpack_require__(105);
	
	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}
	
	module.exports = flatRest;


/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(111);
	
	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}
	
	module.exports = flatten;


/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sortBySelector;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Selector = __webpack_require__(292);
	
	var _Selector2 = _interopRequireDefault(_Selector);
	
	var _connectSortBySelector = __webpack_require__(217);
	
	var _connectSortBySelector2 = _interopRequireDefault(_connectSortBySelector);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-sort-by-selector');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      autoHideContainer = _ref.autoHideContainer;
	  return function (_ref2, isFirstRendering) {
	    var currentRefinement = _ref2.currentRefinement,
	        options = _ref2.options,
	        refine = _ref2.refine,
	        hasNoResults = _ref2.hasNoResults;
	
	    if (isFirstRendering) return;
	
	    var shouldAutoHideContainer = autoHideContainer && hasNoResults;
	
	    _reactDom2.default.render(_react2.default.createElement(_Selector2.default, {
	      cssClasses: cssClasses,
	      currentValue: currentRefinement,
	      options: options,
	      setValue: refine,
	      shouldAutoHideContainer: shouldAutoHideContainer
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nsortBySelector({\n  container,\n  indices,\n  [cssClasses.{root,item}={}],\n  [autoHideContainer=false]\n})';
	
	/**
	 * @typedef {Object} SortByWidgetCssClasses
	 * @property {string|string[]} [root] CSS classes added to the parent `<select>`.
	 * @property {string|string[]} [item] CSS classes added to each `<option>`.
	 */
	
	/**
	 * @typedef {Object} SortByIndexDefinition
	 * @property {string} name The name of the index in Algolia.
	 * @property {string} label The name of the index, for user usage.
	 */
	
	/**
	 * @typedef {Object} SortByWidgetOptions
	 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
	 * @property {SortByIndexDefinition[]} indices Array of objects defining the different indices to choose from.
	 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
	 * @property {SortByWidgetCssClasses} [cssClasses] CSS classes to be added.
	 */
	
	/**
	 * Sort by selector is a widget used for letting the user choose between different
	 * indices that contains the same data with a different order / ranking formula.
	 *
	 * For the users it is like they are selecting a new sort order.
	 * @type {WidgetFactory}
	 * @param {SortByWidgetOptions} $0 Options for the SortBySelector widget
	 * @return {Widget} Creates a new instance of the SortBySelector widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.sortBySelector({
	 *     container: '#sort-by-container',
	 *     indices: [
	 *       {name: 'instant_search', label: 'Most relevant'},
	 *       {name: 'instant_search_price_asc', label: 'Lowest price'},
	 *       {name: 'instant_search_price_desc', label: 'Highest price'}
	 *     ]
	 *   })
	 * );
	 */
	function sortBySelector() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      indices = _ref3.indices,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? false : _ref3$autoHideContain;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    autoHideContainer: autoHideContainer
	  });
	
	  try {
	    var makeWidget = (0, _connectSortBySelector2.default)(specializedRenderer);
	    return makeWidget({ indices: indices });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = starRating;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _connectStarRating = __webpack_require__(218);
	
	var _connectStarRating2 = _interopRequireDefault(_connectStarRating);
	
	var _defaultTemplates = __webpack_require__(335);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _defaultLabels = __webpack_require__(336);
	
	var _defaultLabels2 = _interopRequireDefault(_defaultLabels);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-star-rating');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      templates = _ref.templates,
	      collapsible = _ref.collapsible,
	      transformData = _ref.transformData,
	      autoHideContainer = _ref.autoHideContainer,
	      renderState = _ref.renderState,
	      labels = _ref.labels;
	  return function (_ref2, isFirstRendering) {
	    var refine = _ref2.refine,
	        items = _ref2.items,
	        createURL = _ref2.createURL,
	        instantSearchInstance = _ref2.instantSearchInstance,
	        hasNoResults = _ref2.hasNoResults;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && hasNoResults;
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: items.map(function (item) {
	        return _extends({}, item, { labels: labels });
	      }),
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps,
	      toggleRefinement: refine
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nstarRating({\n  container,\n  attributeName,\n  [ max=5 ],\n  [ cssClasses.{root,header,body,footer,list,item,active,link,disabledLink,star,emptyStar,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ labels.{andUp} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';
	
	/**
	 * @typedef {Object} StarWidgetLabels
	 * @property {string} [andUp] Label used to suffix the ratings.
	 */
	
	/**
	 * @typedef {Object} StarWidgetTemplates
	 * @property  {string|function} [header] Header template.
	 * @property  {string|function} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
	 * @property  {string|function} [footer] Footer template.
	 */
	
	/**
	 * @typedef {Object} StarWidgetCssClasses
	 * @property  {string|string[]} [root] CSS class to add to the root element.
	 * @property  {string|string[]} [header] CSS class to add to the header element.
	 * @property  {string|string[]} [body] CSS class to add to the body element.
	 * @property  {string|string[]} [footer] CSS class to add to the footer element.
	 * @property  {string|string[]} [list] CSS class to add to the list element.
	 * @property  {string|string[]} [item] CSS class to add to each item element.
	 * @property  {string|string[]} [link] CSS class to add to each link element.
	 * @property  {string|string[]} [disabledLink] CSS class to add to each disabled link (when using the default template).
	 * @property  {string|string[]} [count] CSS class to add to each counters
	 * @property  {string|string[]} [star] CSS class to add to each star element (when using the default template).
	 * @property  {string|string[]} [emptyStar] CSS class to add to each empty star element (when using the default template).
	 * @property  {string|string[]} [active] CSS class to add to each active element.
	 */
	
	/**
	 * @typedef {Object} StarWidgetCollapsibleOption
	 * @property {boolean} collapsed If set to true, the widget will be collapsed at first rendering.
	 */
	
	/**
	 * @typedef {Object} StarWidgetTransforms
	 * @property  {function} [item] Function to change the object passed to the `item` template.
	 */
	
	/**
	 * @typedef {Object} StarWidgetOptions
	 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
	 * @property {string} attributeName Name of the attribute in your records that contains the ratings.
	 * @property {number} [max=5] The maximum rating value.
	 * @property {StarWidgetLabels} [labels] Labels used by the default template.
	 * @property {StarWidgetTemplates} [templates] Templates to use for the widget.
	 * @property {StarWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
	 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
	 * @property {StarWidgetCssClasses} [cssClasses] CSS classes to add.
	 * @property {boolean|StarWidgetCollapsibleOption} [collapsible=false] If set to true, the widget can be collapsed. This parameter can also be
	 */
	
	/**
	 * Star rating is used for displaying grade like filters. The values are normalized within boundaries.
	 *
	 * The values must be **integers** in your records. Even though, the maximum value can be set (with `max`), the minimum is
	 * always 0.
	 * @type {WidgetFactory}
	 * @param {StarWidgetOptions} $0 StarRating widget options.
	 * @return {Widget} A new StarRating widget instance.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.starRating({
	 *     container: '#stars',
	 *     attributeName: 'rating',
	 *     max: 5,
	 *     labels: {
	 *       andUp: '& Up'
	 *     }
	 *   })
	 * );
	 */
	function starRating() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      _ref3$max = _ref3.max,
	      max = _ref3$max === undefined ? 5 : _ref3$max,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$labels = _ref3.labels,
	      labels = _ref3$labels === undefined ? _defaultLabels2.default : _ref3$labels,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
	    disabledLink: (0, _classnames2.default)(bem('link', 'disabled'), userCssClasses.disabledLink),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count),
	    star: (0, _classnames2.default)(bem('star'), userCssClasses.star),
	    emptyStar: (0, _classnames2.default)(bem('star', 'empty'), userCssClasses.emptyStar),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: templates,
	    transformData: transformData,
	    labels: labels
	  });
	
	  try {
	    var makeWidget = (0, _connectStarRating2.default)(specializedRenderer);
	    return makeWidget({ attributeName: attributeName, max: max });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 335 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable max-len */
	exports.default = {
	  header: '',
	  item: '<a class="{{cssClasses.link}}{{^count}} {{cssClasses.disabledLink}}{{/count}}" {{#count}}href="{{href}}"{{/count}}>\n  {{#stars}}<span class="{{#.}}{{cssClasses.star}}{{/.}}{{^.}}{{cssClasses.emptyStar}}{{/.}}"></span>{{/stars}}\n  {{labels.andUp}}\n  {{#count}}<span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span>{{/count}}\n</a>',
	  footer: ''
	};

/***/ },
/* 336 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  andUp: '& Up'
	};

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stats;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Stats = __webpack_require__(338);
	
	var _Stats2 = _interopRequireDefault(_Stats);
	
	var _connectStats = __webpack_require__(219);
	
	var _connectStats2 = _interopRequireDefault(_connectStats);
	
	var _defaultTemplates = __webpack_require__(339);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-stats');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      renderState = _ref.renderState,
	      templates = _ref.templates,
	      transformData = _ref.transformData;
	  return function (_ref2, isFirstRendering) {
	    var hitsPerPage = _ref2.hitsPerPage,
	        nbHits = _ref2.nbHits,
	        nbPages = _ref2.nbPages,
	        page = _ref2.page,
	        processingTimeMS = _ref2.processingTimeMS,
	        query = _ref2.query,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && nbHits === 0;
	
	    _reactDom2.default.render(_react2.default.createElement(_Stats2.default, {
	      collapsible: collapsible,
	      cssClasses: cssClasses,
	      hitsPerPage: hitsPerPage,
	      nbHits: nbHits,
	      nbPages: nbPages,
	      page: page,
	      processingTimeMS: processingTimeMS,
	      query: query,
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\nstats({\n  container,\n  [ templates.{header, body, footer} ],\n  [ transformData.{body} ],\n  [ autoHideContainer=true ],\n  [ cssClasses.{root, header, body, footer, time} ],\n})';
	
	/**
	 * @typedef {Object} StatsWidgetTemplates
	 * @property {string|function} [header=''] Header template.
	 * @property {string|function} [body] Body template, provided with `hasManyResults`,
	 * `hasNoResults`, `hasOneResult`, `hitsPerPage`, `nbHits`, `nbPages`, `page`, `processingTimeMS`, `query`.
	 * @property {string|function} [footer=''] Footer template.
	 */
	
	/**
	 * @typedef {Object} StatsWidgetCssClasses
	 * @property {string|string[]} [root] CSS class to add to the root element.
	 * @property {string|string[]} [header] CSS class to add to the header element.
	 * @property {string|string[]} [body] CSS class to add to the body element.
	 * @property {string|string[]} [footer] CSS class to add to the footer element.
	 * @property {string|string[]} [time] CSS class to add to the element wrapping the time processingTimeMs.
	 */
	
	/**
	 * @typedef {Object} StatsWidgetTransforms
	 * @property {function(StatsBodyData):object} [body] Updates the content of object passed to the `body` template.
	 */
	
	/**
	 * @typedef {Object} StatsBodyData
	 * @property {boolean} hasManyResults True if the result set has more than one result.
	 * @property {boolean} hasNoResults True if the result set has no result.
	 * @property {boolean} hasOneResult True if the result set has exactly one result.
	 * @property {number} hitsPerPage Number of hits per page.
	 * @property {number} nbHits Number of hit in the result set.
	 * @property {number} nbPages Number of pages in the result set with regard to the hitsPerPage and number of hits.
	 * @property {number} page Number of the current page. First page is 0.
	 * @property {number} processingTimeMS Time taken to compute the results inside the engine.
	 * @property {string} query Text query currently used.
	 */
	
	/**
	 * @typedef {Object} StatsWidgetOptions
	 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
	 * @property {StatsWidgetTemplates} [templates] Templates to use for the widget.
	 * @property {StatsWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
	 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
	 * @property {StatsWidgetCssClasses} [cssClasses] CSS classes to add.
	 */
	
	/**
	 * The `stats` widget is used to display useful insights about the current results.
	 *
	 * By default, it will display the **number of hits** and the time taken to compute the
	 * results inside the engine.
	 * @type {WidgetFactory}
	 * @param {StatsWidgetOptions} $0 Stats widget options. Some keys are mandatories: `container`,
	 * @return {Widget} A new stats widget instance
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.stats({
	 *     container: '#stats-container'
	 *   })
	 * );
	 */
	function stats() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      transformData = _ref3.transformData,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    time: (0, _classnames2.default)(bem('time'), userCssClasses.time)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: templates,
	    transformData: transformData
	  });
	
	  try {
	    var makeWidget = (0, _connectStats2.default)(specializedRenderer);
	    return makeWidget();
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RawStats = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Template = __webpack_require__(224);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _autoHideContainer = __webpack_require__(274);
	
	var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);
	
	var _headerFooter = __webpack_require__(275);
	
	var _headerFooter2 = _interopRequireDefault(_headerFooter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RawStats = exports.RawStats = function (_React$Component) {
	  _inherits(RawStats, _React$Component);
	
	  function RawStats() {
	    _classCallCheck(this, RawStats);
	
	    return _possibleConstructorReturn(this, (RawStats.__proto__ || Object.getPrototypeOf(RawStats)).apply(this, arguments));
	  }
	
	  _createClass(RawStats, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.nbHits !== nextProps.hits || this.props.processingTimeMS !== nextProps.processingTimeMS;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = {
	        hasManyResults: this.props.nbHits > 1,
	        hasNoResults: this.props.nbHits === 0,
	        hasOneResult: this.props.nbHits === 1,
	        hitsPerPage: this.props.hitsPerPage,
	        nbHits: this.props.nbHits,
	        nbPages: this.props.nbPages,
	        page: this.props.page,
	        processingTimeMS: this.props.processingTimeMS,
	        query: this.props.query,
	        cssClasses: this.props.cssClasses
	      };
	
	      return _react2.default.createElement(_Template2.default, _extends({ data: data, templateKey: 'body' }, this.props.templateProps));
	    }
	  }]);
	
	  return RawStats;
	}(_react2.default.Component);
	
	RawStats.propTypes = {
	  cssClasses: _react2.default.PropTypes.shape({
	    time: _react2.default.PropTypes.string
	  }),
	  hitsPerPage: _react2.default.PropTypes.number,
	  nbHits: _react2.default.PropTypes.number,
	  nbPages: _react2.default.PropTypes.number,
	  page: _react2.default.PropTypes.number,
	  processingTimeMS: _react2.default.PropTypes.number,
	  query: _react2.default.PropTypes.string,
	  templateProps: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawStats));

/***/ },
/* 339 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  body: '{{#hasNoResults}}No results{{/hasNoResults}}\n  {{#hasOneResult}}1 result{{/hasOneResult}}\n  {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}\n  <span class="{{cssClasses.time}}">found in {{processingTimeMS}}ms</span>',
	  footer: ''
	};

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toggle;
	
	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(276);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _defaultTemplates = __webpack_require__(341);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	var _RefinementList = __webpack_require__(282);
	
	var _RefinementList2 = _interopRequireDefault(_RefinementList);
	
	var _connectToggle = __webpack_require__(220);
	
	var _connectToggle2 = _interopRequireDefault(_connectToggle);
	
	var _utils = __webpack_require__(153);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bem = (0, _utils.bemHelper)('ais-toggle');
	
	var renderer = function renderer(_ref) {
	  var containerNode = _ref.containerNode,
	      cssClasses = _ref.cssClasses,
	      collapsible = _ref.collapsible,
	      autoHideContainer = _ref.autoHideContainer,
	      renderState = _ref.renderState,
	      templates = _ref.templates,
	      transformData = _ref.transformData;
	  return function (_ref2, isFirstRendering) {
	    var value = _ref2.value,
	        createURL = _ref2.createURL,
	        refine = _ref2.refine,
	        instantSearchInstance = _ref2.instantSearchInstance;
	
	    if (isFirstRendering) {
	      renderState.templateProps = (0, _utils.prepareTemplateProps)({
	        transformData: transformData,
	        defaultTemplates: _defaultTemplates2.default,
	        templatesConfig: instantSearchInstance.templatesConfig,
	        templates: templates
	      });
	      return;
	    }
	
	    var shouldAutoHideContainer = autoHideContainer && (value.count === 0 || value.count === null);
	
	    _reactDom2.default.render(_react2.default.createElement(_RefinementList2.default, {
	      collapsible: collapsible,
	      createURL: createURL,
	      cssClasses: cssClasses,
	      facetValues: [value],
	      shouldAutoHideContainer: shouldAutoHideContainer,
	      templateProps: renderState.templateProps,
	      toggleRefinement: function toggleRefinement(name, isRefined) {
	        return refine({ isRefined: isRefined });
	      }
	    }), containerNode);
	  };
	};
	
	var usage = 'Usage:\ntoggle({\n  container,\n  attributeName,\n  label,\n  [ values={on: true, off: undefined} ],\n  [ cssClasses.{root,header,body,footer,list,item,active,label,checkbox,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';
	
	/**
	 * @typedef {Object} ToggleWidgetCSSClasses
	 * @property  {string|string[]} [root] CSS class to add to the root element.
	 * @property  {string|string[]} [header] CSS class to add to the header element.
	 * @property  {string|string[]} [body] CSS class to add to the body element.
	 * @property  {string|string[]} [footer] CSS class to add to the footer element.
	 * @property  {string|string[]} [list] CSS class to add to the list element.
	 * @property  {string|string[]} [item] CSS class to add to each item element.
	 * @property  {string|string[]} [active] CSS class to add to each active element.
	 * @property  {string|string[]} [label] CSS class to add to each
	 * label element (when using the default template).
	 * @property  {string|string[]} [checkbox] CSS class to add to each
	 * checkbox element (when using the default template).
	 * @property  {string|string[]} [count] CSS class to add to each count.
	 */
	
	/**
	 * @typedef {Object} ToggleWidgetTransforms
	 * @property  {function(Object):Object} item Function to change the object passed to the `item`. template
	 */
	
	/**
	 * @typedef {Object} ToggleWidgetTemplates
	 * @property  {string|function} header Header template.
	 * @property  {string|function} item Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
	 * count is always the number of hits that would be shown if you toggle the widget. We also provide
	 * `onFacetValue` and `offFacetValue` objects with according counts.
	 * @property  {string|function} footer Footer template.
	 */
	
	/**
	 * @typedef {Object} ToggleWidgetValues
	 * @property  {string|number|boolean} on Value to filter on when checked.
	 * @property  {string|number|boolean} off Value to filter on when unchecked.
	 * element (when using the default template). By default when switching to `off`, no refinement will be asked. So you
	 * will get both `true` and `false` results. If you set the off value to `false` then you will get only objects
	 * having `false` has a value for the selected attribute.
	 */
	
	/**
	 * @typedef {Object} ToggleWidgetCollapsibleOption
	 * @property {boolean} collapsed If set to true, the widget will be collapsed at first rendering.
	 */
	
	/**
	 * @typedef {Object} ToggleWidgetOptions
	 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
	 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
	 * @property {string} label Human-readable name of the filter (eg. "Free Shipping").
	 * @property {ToggleWidgetValues} [values={on: true, off: undefined}] Values that the widget can set.
	 * @property {ToggleWidgetTemplates} [templates] Templates to use for the widget.
	 * @property {ToggleWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
	 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
	 * @property {ToggleWidgetCSSClasses} [cssClasses] CSS classes to add.
	 * @property {boolean|ToggleWidgetCollapsibleOption} collapsible If set to true, the widget can be collapsed. This parameter can also be
	 * an object, with the property collapsed, if you want the toggle to be collapsed initially.
	 */
	
	/**
	 * The toggle widget lets the user either:
	 *  - switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
	 *  - toggle a faceted value on and off (only 'canon' for brands)
	 *
	 * This widget is particularly useful if you have a boolean value in the records.
	 *
	 * The attribute has to in the list of attributes for faceting in the dashboard.
	 * @type {WidgetFactory}
	 * @param {ToggleWidgetOptions} $0 Options for the Toggle widget.
	 * @return {Widget} A new instance of the Toggle widget
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.toggle({
	 *     container: '#free-shipping',
	 *     attributeName: 'free_shipping',
	 *     label: 'Free Shipping',
	 *     values: {
	 *       on: true,
	 *       off: false
	 *     },
	 *     templates: {
	 *       header: 'Shipping'
	 *     }
	 *   })
	 * );
	 */
	function toggle() {
	  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      container = _ref3.container,
	      attributeName = _ref3.attributeName,
	      label = _ref3.label,
	      _ref3$cssClasses = _ref3.cssClasses,
	      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
	      _ref3$templates = _ref3.templates,
	      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
	      transformData = _ref3.transformData,
	      _ref3$autoHideContain = _ref3.autoHideContainer,
	      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
	      _ref3$collapsible = _ref3.collapsible,
	      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
	      _ref3$values = _ref3.values,
	      userValues = _ref3$values === undefined ? { on: true, off: undefined } : _ref3$values;
	
	  if (!container) {
	    throw new Error(usage);
	  }
	
	  var containerNode = (0, _utils.getContainerNode)(container);
	
	  var cssClasses = {
	    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
	    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
	    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
	    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
	    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
	    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
	    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
	    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
	    checkbox: (0, _classnames2.default)(bem('checkbox'), userCssClasses.checkbox),
	    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
	  };
	
	  var specializedRenderer = renderer({
	    containerNode: containerNode,
	    cssClasses: cssClasses,
	    collapsible: collapsible,
	    autoHideContainer: autoHideContainer,
	    renderState: {},
	    templates: templates,
	    transformData: transformData
	  });
	
	  try {
	    var makeWidget = (0, _connectToggle2.default)(specializedRenderer);
	    return makeWidget({ attributeName: attributeName, label: label, values: userValues });
	  } catch (e) {
	    throw new Error(usage);
	  }
	}

/***/ },
/* 341 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  header: '',
	  item: '<label class="{{cssClasses.label}}">\n  <input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}\n  <span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span>\n</label>',
	  footer: ''
	};

/***/ },
/* 342 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var usage = 'Usage:\nanalytics({\n  pushFunction,\n  [ delay=3000 ],\n  [ triggerOnUIInteraction=false ],\n  [ pushInitialSearch=true ]\n})';
	
	/**
	 * @typedef {Object} AnalyticsWidgetOptions
	 * @property {function(qs: string, state: SearchParameters, results: SearchResults)} pushFunction
	 * Function called when data are ready to be pushed. It should push the data to your analytics platform.
	 * The `qs` parameter contains the parameters serialized as a query string. The `state` contains the
	 * whole search state, and the `results` the last results received.
	 * @property {number} [delay=3000] Number of milliseconds between last search key stroke and calling pushFunction.
	 * @property {boolean} [triggerOnUIInteraction=false] Trigger pushFunction after click on page or. redirecting the page
	 * @property {boolean} [pushInitialSearch=true] Trigger pushFunction after the initial search.
	 */
	
	/**
	 * The analytics widget pushes the current state of the search to the analytics platform of your
	 * choice. It requires the implementation of a function that will push the data.
	 *
	 * This is a headless widget, which means that it does not have a rendered output in the
	 * UI.
	 * @type {WidgetFactory}
	 * @param {AnalyticsWidgetOptions} $0 The Analytics widget options.
	 * @return {Widget} A new instance of the Analytics widget.
	 * @example
	 * search.addWidget(
	 *   instantsearch.widgets.analytics({
	 *     pushFunction: function(formattedParameters, state, results) {
	 *       // Google Analytics
	 *       // window.ga('set', 'page', '/search/query/?query=' + state.query + '&' + formattedParameters + '&numberOfHits=' + results.nbHits);
	 *       // window.ga('send', 'pageView');
	 *
	 *       // GTM
	 *       // dataLayer.push({'event': 'search', 'Search Query': state.query, 'Facet Parameters': formattedParameters, 'Number of Hits': results.nbHits});
	 *
	 *       // Segment.io
	 *       // analytics.page( '[SEGMENT] instantsearch', { path: '/instantsearch/?query=' + state.query + '&' + formattedParameters });
	 *
	 *       // Kissmetrics
	 *       // var objParams = JSON.parse('{"' + decodeURI(formattedParameters.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
	 *       // var arrParams = $.map(objParams, function(value, index) {
	 *       //   return [value];
	 *       // });
	 *       //
	 *       // _kmq.push(['record', '[KM] Viewed Result page', {
	 *       //   'Query': state.query ,
	 *       //   'Number of Hits': results.nbHits,
	 *       //   'Search Params': arrParams
	 *       // }]);
	 *
	 *       // any other analytics service
	 *     }
	 *   })
	 * );
	 */
	function analytics() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      pushFunction = _ref.pushFunction,
	      _ref$delay = _ref.delay,
	      delay = _ref$delay === undefined ? 3000 : _ref$delay,
	      _ref$triggerOnUIInter = _ref.triggerOnUIInteraction,
	      triggerOnUIInteraction = _ref$triggerOnUIInter === undefined ? false : _ref$triggerOnUIInter,
	      _ref$pushInitialSearc = _ref.pushInitialSearch,
	      pushInitialSearch = _ref$pushInitialSearc === undefined ? true : _ref$pushInitialSearc;
	
	  if (!pushFunction) {
	    throw new Error(usage);
	  }
	
	  var cachedState = null;
	
	  var serializeRefinements = function serializeRefinements(obj) {
	    var str = [];
	    for (var p in obj) {
	      if (obj.hasOwnProperty(p)) {
	        var values = obj[p].join('+');
	        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(p) + '_' + encodeURIComponent(values));
	      }
	    }
	
	    return str.join('&');
	  };
	
	  var serializeNumericRefinements = function serializeNumericRefinements(numericRefinements) {
	    var numericStr = [];
	
	    for (var attr in numericRefinements) {
	      if (numericRefinements.hasOwnProperty(attr)) {
	        var filter = numericRefinements[attr];
	
	        if (filter.hasOwnProperty('>=') && filter.hasOwnProperty('<=')) {
	          if (filter['>='][0] === filter['<='][0]) {
	            numericStr.push(attr + '=' + attr + '_' + filter['>=']);
	          } else {
	            numericStr.push(attr + '=' + attr + '_' + filter['>='] + 'to' + filter['<=']);
	          }
	        } else if (filter.hasOwnProperty('>=')) {
	          numericStr.push(attr + '=' + attr + '_from' + filter['>=']);
	        } else if (filter.hasOwnProperty('<=')) {
	          numericStr.push(attr + '=' + attr + '_to' + filter['<=']);
	        } else if (filter.hasOwnProperty('=')) {
	          var equals = [];
	          for (var equal in filter['=']) {
	            if (filter['='].hasOwnProperty(equal)) {
	              // eslint-disable-line max-depth
	              equals.push(filter['='][equal]);
	            }
	          }
	
	          numericStr.push(attr + '=' + attr + '_' + equals.join('-'));
	        }
	      }
	    }
	
	    return numericStr.join('&');
	  };
	
	  var lastSentData = '';
	  var sendAnalytics = function sendAnalytics(state) {
	    if (state === null) {
	      return;
	    }
	
	    var formattedParams = [];
	
	    var serializedRefinements = serializeRefinements(Object.assign({}, state.state.disjunctiveFacetsRefinements, state.state.facetsRefinements, state.state.hierarchicalFacetsRefinements));
	
	    var serializedNumericRefinements = serializeNumericRefinements(state.state.numericRefinements);
	
	    if (serializedRefinements !== '') {
	      formattedParams.push(serializedRefinements);
	    }
	
	    if (serializedNumericRefinements !== '') {
	      formattedParams.push(serializedNumericRefinements);
	    }
	
	    formattedParams = formattedParams.join('&');
	
	    var dataToSend = 'Query: ' + state.state.query + ', ' + formattedParams;
	
	    if (lastSentData !== dataToSend) {
	      pushFunction(formattedParams, state.state, state.results);
	
	      lastSentData = dataToSend;
	    }
	  };
	
	  var pushTimeout = void 0;
	
	  var isInitialSearch = true;
	  if (pushInitialSearch === true) {
	    isInitialSearch = false;
	  }
	
	  return {
	    init: function init() {
	      if (triggerOnUIInteraction === true) {
	        document.addEventListener('click', function () {
	          sendAnalytics(cachedState);
	        });
	
	        window.addEventListener('beforeunload', function () {
	          sendAnalytics(cachedState);
	        });
	      }
	    },
	    render: function render(_ref2) {
	      var results = _ref2.results,
	          state = _ref2.state;
	
	      if (isInitialSearch === true) {
	        isInitialSearch = false;
	
	        return;
	      }
	
	      cachedState = { results: results, state: state };
	
	      if (pushTimeout) {
	        clearTimeout(pushTimeout);
	      }
	
	      pushTimeout = setTimeout(function () {
	        return sendAnalytics(cachedState);
	      }, delay);
	    }
	  };
	}
	
	exports.default = analytics;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=instantsearch.js.map