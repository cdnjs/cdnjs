(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["placesAutocompleteDataset"] = factory();
	else
		root["placesAutocompleteDataset"] = factory();
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
	
	var _createAutocompleteDataset = __webpack_require__(50);
	
	var _createAutocompleteDataset2 = _interopRequireDefault(_createAutocompleteDataset);
	
	__webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// must use module.exports to be commonJS compatible
	module.exports = _createAutocompleteDataset2.default;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createAutocompleteDataset;
	
	var _createAutocompleteSource = __webpack_require__(51);
	
	var _createAutocompleteSource2 = _interopRequireDefault(_createAutocompleteSource);
	
	var _defaultTemplates = __webpack_require__(56);
	
	var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createAutocompleteDataset(options) {
	  var templates = _extends({}, _defaultTemplates2.default, options.templates);
	
	  return {
	    source: (0, _createAutocompleteSource2.default)(_extends({}, options, {
	      formatInputValue: templates.value
	    })),
	    templates: templates,
	    displayKey: 'value',
	    name: 'places'
	  };
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createAutocompleteSource;
	
	var _formatHit = __webpack_require__(52);
	
	var _formatHit2 = _interopRequireDefault(_formatHit);
	
	var _version = __webpack_require__(55);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createAutocompleteSource(_ref) {
	  var algoliasearch = _ref.algoliasearch;
	  var apiKey = _ref.apiKey;
	  var appId = _ref.appId;
	  var aroundLatLng = _ref.aroundLatLng;
	  var aroundRadius = _ref.aroundRadius;
	  var aroundLatLngViaIP = _ref.aroundLatLngViaIP;
	  var countries = _ref.countries;
	  var formatInputValue = _ref.formatInputValue;
	  var _ref$language = _ref.language;
	  var language = _ref$language === undefined ? navigator.language.split('-')[0] : _ref$language;
	  var _ref$onHits = _ref.onHits;
	  var onHits = _ref$onHits === undefined ? function () {} : _ref$onHits;
	  var type = _ref.type;
	
	  var placesClient = algoliasearch.initPlaces(apiKey, appId);
	  placesClient.as.setExtraHeader('targetIndexingIndexes', true);
	  placesClient.as.addAlgoliaAgent('Algolia Places ' + _version2.default);
	
	  var defaultQueryParams = {
	    countries: countries,
	    hitsPerPage: 5,
	    language: language,
	    type: type
	  };
	
	  if (aroundLatLng) {
	    defaultQueryParams.aroundLatLng = aroundLatLng;
	  } else if (typeof aroundLatLngViaIP !== 'undefined') {
	    defaultQueryParams.aroundLatLngViaIP = aroundLatLngViaIP;
	  }
	
	  if (aroundRadius) {
	    defaultQueryParams.aroundRadius = aroundRadius;
	  }
	
	  return function (query, cb) {
	    return placesClient.search(_extends({}, defaultQueryParams, {
	      query: query
	    })).then(function (content) {
	      var hits = content.hits.map(function (hit, hitIndex) {
	        return (0, _formatHit2.default)({
	          formatInputValue: formatInputValue,
	          hit: hit,
	          hitIndex: hitIndex,
	          query: query,
	          rawAnswer: content
	        });
	      });
	
	      onHits({
	        hits: hits,
	        query: query,
	        rawAnswer: content
	      });
	
	      return hits;
	    }).then(cb);
	  };
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = formatHit;
	
	var _findCountryCode = __webpack_require__(53);
	
	var _findCountryCode2 = _interopRequireDefault(_findCountryCode);
	
	var _findType = __webpack_require__(54);
	
	var _findType2 = _interopRequireDefault(_findType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function formatHit(_ref) {
	  var formatInputValue = _ref.formatInputValue;
	  var hit = _ref.hit;
	  var hitIndex = _ref.hitIndex;
	  var query = _ref.query;
	  var rawAnswer = _ref.rawAnswer;
	
	  try {
	    var name = hit.locale_names[0];
	    var country = hit.country;
	    var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
	    var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
	
	    var suggestion = {
	      name: name,
	      administrative: administrative,
	      city: city,
	      country: country,
	      countryCode: (0, _findCountryCode2.default)(hit._tags),
	      type: (0, _findType2.default)(hit._tags),
	      latlng: {
	        lat: hit._geoloc.lat,
	        lng: hit._geoloc.lng
	      },
	      postcode: hit.postcode && hit.postcode[0]
	    };
	
	    // this is the value to put inside the <input value=
	    var value = formatInputValue(suggestion);
	
	    return _extends({}, suggestion, {
	      hit: hit,
	      hitIndex: hitIndex,
	      query: query,
	      rawAnswer: rawAnswer,
	      value: value
	    });
	  } catch (e) {
	    /* eslint no-console: 0 */
	    console.error('Could not parse object', hit);
	    console.error(e);
	    return {
	      value: 'Could not parse object'
	    };
	  }
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findCountryCode;
	function findCountryCode(tags) {
	  for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
	    var tag = tags[tagIndex];
	    var find = tag.match(/country\/(.*)?/);
	    if (find) {
	      return find[1];
	    }
	  }
	}

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findType;
	function findType(tags) {
	  var types = ['country', 'city', 'address'];
	
	  for (var typeIndex = 0; typeIndex < types.length; typeIndex++) {
	    var type = types[typeIndex];
	    if (tags.indexOf(type) !== -1) {
	      return type;
	    }
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '0.25.0';

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _formatInputValue = __webpack_require__(57);
	
	var _formatInputValue2 = _interopRequireDefault(_formatInputValue);
	
	var _formatDropdownValue = __webpack_require__(58);
	
	var _formatDropdownValue2 = _interopRequireDefault(_formatDropdownValue);
	
	var _algolia = __webpack_require__(62);
	
	var _algolia2 = _interopRequireDefault(_algolia);
	
	var _osm = __webpack_require__(63);
	
	var _osm2 = _interopRequireDefault(_osm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  footer: '<div class="ap-footer">\n  Built by <a href="https://www.algolia.com/?utm_source=places&utm_medium=link&utm_term=footer&utm_campaign=' + location.hostname + '" title="Search by Algolia" class="ap-footer-algolia">' + _algolia2.default.trim() + '</a>\n  using <a href="https://community.algolia.com/places/documentation.html#license" class="ap-footer-osm" title="Algolia Places data © OpenStreetMap contributors">' + _osm2.default.trim() + ' <span>data</span></a>\n  </div>',
	  value: _formatInputValue2.default,
	  suggestion: _formatDropdownValue2.default
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatInputValue;
	function formatInputValue(_ref) {
	  var administrative = _ref.administrative;
	  var city = _ref.city;
	  var country = _ref.country;
	  var name = _ref.name;
	
	  var out = (name + '\n ' + (city ? city + ',' : '') + '\n ' + (administrative ? administrative + ',' : '') + '\n ' + (country ? '' + country : '')).replace(/\s*\n\s*/g, ' ').trim();
	  return out;
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatDropdownValue;
	
	var _address = __webpack_require__(59);
	
	var _address2 = _interopRequireDefault(_address);
	
	var _city = __webpack_require__(60);
	
	var _city2 = _interopRequireDefault(_city);
	
	var _country = __webpack_require__(61);
	
	var _country2 = _interopRequireDefault(_country);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var icons = {
	  address: _address2.default,
	  city: _city2.default,
	  country: _country2.default
	};
	
	function formatDropdownValue(options) {
	  var administrative = options.administrative;
	  var city = options.city;
	  var country = options.country;
	  var type = options.type;
	  var hit = options.hit;
	
	
	  var name = hit._highlightResult.locale_names[0].value;
	  city = city ? hit._highlightResult.city[0].value : undefined;
	  administrative = administrative ? hit._highlightResult.administrative[0].value : undefined;
	  country = country ? hit._highlightResult.country.value : undefined;
	
	  var out = ('<span class="ap-suggestion-icon">' + icons[type].trim() + '</span>\n<span class="ap-name">' + name + '</span>\n<span class="ap-address">\n  ' + (city ? city + ',' : '') + '\n  ' + (administrative ? administrative + ',' : '') + '\n  ' + (country ? '' + country : '') + '\n</span>').replace(/\s*\n\s*/g, ' ');
	  return out;
	}

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n"

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"19\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n"

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n"

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"38px\" height=\"12px\" viewBox=\"0 0 38 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 3.7 (28169) - http://www.bohemiancoding.com/sketch -->\n    <title>Group</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Group\">\n            <path d=\"M22.7598077,4.31665385 L22.2614231,6.11142308 L23.8669231,5.21769231 C23.6330769,4.78288462 23.2355385,4.45476923 22.7598077,4.31738462 L22.7598077,4.31665385 Z M18.8246154,6.14942308 C18.8246154,8.07134615 20.3563077,9.63080769 22.2482692,9.63080769 C24.1387692,9.63080769 25.6719231,8.06696154 25.6719231,6.14503846 C25.6719231,4.22311538 24.1387692,2.66657692 22.2482692,2.66657692 C20.3555769,2.66657692 18.8238846,4.22311538 18.8238846,6.14503846 L18.8246154,6.14942308 Z M22.2482692,3.66261538 C23.5958077,3.66261538 24.6941538,4.77776923 24.6941538,6.14723077 C24.6941538,7.51815385 23.5950769,8.63403846 22.2460769,8.63403846 C20.8992692,8.63403846 19.8016538,7.51815385 19.8016538,6.14942308 C19.8016538,4.77776923 20.8992692,3.66261538 22.2497308,3.66261538 L22.2482692,3.66261538 Z M23.4284615,2.23615385 C23.4284615,2.21642308 23.4321154,2.204 23.4321154,2.19084615 L23.4321154,1.87661538 C23.4321154,1.5295 23.1573462,1.24815385 22.8182692,1.24815385 L21.7425769,1.24815385 C21.4027692,1.24815385 21.1287308,1.52365385 21.1287308,1.86930769 L21.1287308,2.17842308 C21.4707308,2.07611538 21.8317308,2.02496154 22.2029615,2.02496154 C22.6311923,2.02496154 23.0418846,2.09073077 23.4284615,2.22957692 L23.4284615,2.23615385 Z M19.6737692,2.84561538 C19.4340769,2.60153846 19.0453077,2.60153846 18.8056154,2.84561538 L18.696,2.95523077 C18.4570385,3.19857692 18.4570385,3.59684615 18.696,3.84092308 L18.8114615,3.95638462 C19.0599231,3.55226923 19.3741538,3.19857692 19.7358846,2.90407692 L19.6745,2.83830769 L19.6737692,2.84561538 Z\" id=\"Shape\" fill=\"#00B7E5\"></path>\n            <path d=\"M6.68653846,9.28076923 C6.54476923,8.91757692 6.41323077,8.56096154 6.29046154,8.21019231 L5.90461538,7.13961538 L2.02934615,7.13961538 L1.24961538,9.28076923 L0,9.28076923 C0.328846154,8.39434615 0.638692308,7.57369231 0.926615385,6.821 C1.216,6.06684615 1.49661538,5.35215385 1.77284615,4.67546154 C2.05053846,3.99584615 2.32676923,3.35276923 2.59715385,2.73673077 C2.87046154,2.12069231 3.15253846,1.5105 3.45215385,0.900307692 L4.5505,0.900307692 C4.84573077,1.50392308 5.13146154,2.11338462 5.40257692,2.73015385 C5.67515385,3.34619231 5.94846154,3.98853846 6.22469231,4.66888462 C6.50019231,5.34119231 6.783,6.05734615 7.07238462,6.81003846 C7.35957692,7.56273077 7.66869231,8.38119231 7.999,9.26542308 L6.688,9.26542308 L6.68580769,9.25811538 L6.68653846,9.28076923 Z M5.56115385,6.175 C5.29515385,5.47346154 5.035,4.79384615 4.77557692,4.13907692 C4.51834615,3.48138462 4.24942308,2.85146154 3.96661538,2.24638462 C3.67723077,2.85438462 3.40757692,3.48430769 3.1445,4.14053846 C2.88873077,4.79823077 2.6315,5.47565385 2.37426923,6.17719231 L5.56042308,6.17719231 L5.56042308,6.175 L5.56115385,6.175 Z M11.2648077,9.69876923 C10.5603462,9.68196154 10.0605,9.53069231 9.76526923,9.24569231 C9.47003846,8.96069231 9.32315385,8.51346154 9.32315385,7.90984615 L9.32315385,0.266 L10.469,0.0686923077 L10.469,7.72715385 C10.469,7.91423077 10.4836154,8.06915385 10.5157692,8.19192308 C10.5486538,8.31396154 10.602,8.41115385 10.6750769,8.48715385 C10.7518077,8.55876923 10.8548462,8.61576923 10.9768846,8.65084615 C11.1011154,8.68592308 11.2545769,8.71661538 11.4372692,8.74219231 L11.2765,9.6995 L11.2648077,9.69876923 Z M16.5380385,8.78092308 C16.4430385,8.84669231 16.2530385,8.92853846 15.9753462,9.03084615 C15.6976538,9.13315385 15.3688077,9.18211538 14.9888077,9.18211538 C14.6088077,9.18211538 14.2434231,9.12365385 13.9072692,9.00088462 C13.5711154,8.87884615 13.2715,8.68957692 13.0230385,8.43234615 C12.7745769,8.17657692 12.5772692,7.85503846 12.4311154,7.47503846 C12.2849615,7.09503846 12.2118846,6.63465385 12.2118846,6.1085 C12.2118846,5.64080769 12.2776538,5.21696154 12.4165,4.83696154 C12.5553462,4.44965385 12.7599615,4.1135 13.0230385,3.83580769 C13.2861154,3.55080769 13.6076538,3.33157692 13.9949615,3.17811538 C14.3749615,3.01734615 14.8061154,2.93696154 15.2884231,2.93696154 C15.8145769,2.93696154 16.2749615,2.9735 16.6768846,3.05388462 C17.0693077,3.12696154 17.4032692,3.20734615 17.6729231,3.27311538 L17.6729231,8.93657692 C17.6729231,9.9085 17.4171538,10.6246538 16.9129231,11.0631154 C16.4050385,11.5015769 15.6413846,11.7208077 14.6139231,11.7208077 C14.2171154,11.7208077 13.8393077,11.6842692 13.4848846,11.6258077 C13.1268077,11.5600385 12.8257308,11.4796538 12.5619231,11.3919615 L12.768,10.3981154 C12.9908846,10.4858077 13.2722308,10.5661923 13.6010769,10.6319615 C13.9299231,10.6977308 14.2748462,10.7415769 14.6278077,10.7415769 C15.3001154,10.7415769 15.7897308,10.6100385 16.0842308,10.3396538 C16.3809231,10.0692692 16.5336538,9.63811538 16.5336538,9.0535 L16.5336538,8.77580769 L16.5380385,8.78092308 Z M16.0703462,3.97538462 C15.8803462,3.94615385 15.6245769,3.93153846 15.2957308,3.93153846 C14.6891923,3.93153846 14.2141923,4.13176923 13.8853462,4.53076923 C13.5565,4.92903846 13.3957308,5.45884615 13.3957308,6.11653846 C13.3957308,6.48411538 13.4395769,6.79615385 13.5345769,7.05923077 C13.6295769,7.32230769 13.7538077,7.53934615 13.9145769,7.70669231 C14.0753462,7.87988462 14.2580385,8.0085 14.4626538,8.08523077 C14.6745769,8.16853846 14.8865,8.20726923 15.1057308,8.20726923 C15.4053462,8.20726923 15.6830385,8.17073077 15.9388077,8.08303846 C16.1945769,8.00265385 16.3918846,7.90765385 16.5380385,7.79073077 L16.5380385,4.07038462 C16.4284231,4.03823077 16.2749615,4.00753846 16.0776538,3.97903846 L16.0703462,3.97538462 Z M28.4568846,9.69876923 C27.7553462,9.68196154 27.2511154,9.53069231 26.9588077,9.24569231 C26.6665,8.96069231 26.5203462,8.51346154 26.5203462,7.90984615 L26.5203462,0.266 L27.6676538,0.0686923077 L27.6676538,7.72715385 C27.6676538,7.91423077 27.6822692,8.06915385 27.7188077,8.19192308 C27.7553462,8.31396154 27.8065,8.41115385 27.8722692,8.48423077 C27.9453462,8.56242308 28.0476538,8.61357692 28.1718846,8.65230769 C28.2961154,8.69103846 28.4495769,8.721 28.6322692,8.74365385 L28.4715,9.6995 L28.4568846,9.69876923 Z M30.7222692,1.52730769 C30.4884231,1.52730769 30.2911154,1.45788462 30.1303462,1.31976923 C29.9622692,1.18092308 29.8818846,0.996038462 29.8818846,0.762923077 C29.8818846,0.529076923 29.9622692,0.342730769 30.1303462,0.205346154 C30.2911154,0.0738076923 30.4884231,0.000730769231 30.7222692,0.000730769231 C30.9561154,0.000730769231 31.1534231,0.0738076923 31.3215,0.205346154 C31.4822692,0.344192308 31.5699615,0.534192308 31.5699615,0.768038462 C31.5699615,1.00188462 31.4895769,1.19188462 31.3215,1.32342308 C31.1607308,1.46226923 30.9561154,1.53534615 30.7281154,1.53534615 L30.7222692,1.52730769 Z M30.0865,2.70238462 L31.3872692,2.70238462 L31.3872692,9.21061538 L30.0791923,9.21061538 L30.0791923,2.70238462 L30.0865,2.70238462 Z M35.3918846,2.51238462 C35.8595769,2.51238462 36.2468846,2.57523077 36.5684231,2.70092308 C36.8899615,2.82807692 37.1457308,3.00638462 37.3430385,3.23730769 C37.5330385,3.46238462 37.6791923,3.73788462 37.7595769,4.05869231 C37.8472692,4.37292308 37.8838077,4.72661538 37.8838077,5.111 L37.8838077,9.36188462 L37.4672692,9.43496154 C37.2918846,9.4715 37.0799615,9.49342308 36.8607308,9.52265385 C36.6415,9.55188462 36.3930385,9.57380769 36.1299615,9.59573077 C35.8668846,9.61765385 35.6038077,9.63226923 35.3480385,9.63226923 C34.9826538,9.63226923 34.6450385,9.59573077 34.3373846,9.51534615 C34.0304615,9.44226923 33.7659231,9.31073077 33.5408462,9.14265385 C33.3186923,8.97457692 33.1462308,8.74803846 33.0183462,8.46303846 C32.8911923,8.18534615 32.8283462,7.84919231 32.8283462,7.45457692 C32.8283462,7.07457692 32.9014231,6.75303846 33.0475769,6.48996154 C33.1915385,6.21957692 33.3888462,6.00034615 33.6395,5.83957692 C33.8901538,5.67880769 34.1802692,5.55457692 34.5127692,5.47419231 C34.8438077,5.40111538 35.1923846,5.35726923 35.5577692,5.35726923 C35.6746923,5.35726923 35.796,5.36457692 35.9231538,5.377 C36.0473846,5.39161538 36.1643077,5.40988462 36.2761154,5.42815385 L36.5698846,5.48661538 L36.7416154,5.52680769 L36.7416154,5.18334615 C36.7416154,4.98603846 36.7226154,4.78142308 36.6802308,4.58630769 C36.6363846,4.389 36.5618462,4.21361538 36.4536923,4.06234615 C36.3440769,3.91107692 36.1979231,3.78830769 36.0137692,3.69696154 C35.8193846,3.60561538 35.5753077,3.55811538 35.2800769,3.55811538 C34.8949615,3.55811538 34.561,3.591 34.2738077,3.64580769 C33.9888077,3.70426923 33.7695769,3.76273077 33.6307308,3.82557692 L33.4940769,2.82442308 C33.6446154,2.75134615 33.8916154,2.68557692 34.2467692,2.61980769 C34.5902308,2.55257692 34.9702308,2.5175 35.3794615,2.5175 L35.3838462,2.5175 L35.3918846,2.51238462 Z M35.4941923,8.60992308 C35.7718846,8.60992308 36.0130385,8.60115385 36.2249615,8.58946154 C36.4368846,8.5785 36.6122692,8.55438462 36.7511154,8.52003846 L36.7511154,6.48923077 C36.6707308,6.44538462 36.5318846,6.40884615 36.3418846,6.37815385 C36.1591923,6.34746154 35.9253462,6.33211538 35.6622692,6.33211538 C35.4941923,6.33211538 35.3041923,6.34526923 35.1141923,6.37084615 C34.9241923,6.39788462 34.7415,6.45123077 34.5734231,6.53526923 C34.4126538,6.61857692 34.2738077,6.73111538 34.1715,6.87507692 C34.0618846,7.01903846 34.0092692,7.20903846 34.0092692,7.44507692 C34.0092692,7.88061538 34.1466538,8.18315385 34.4111923,8.35342308 C34.6742692,8.5215 35.0396538,8.60919231 35.4978462,8.60919231 L35.4934615,8.60919231 L35.4941923,8.60992308 Z\" id=\"Shape\" fill=\"#2B395C\"></path>\n        </g>\n    </g>\n</svg>"

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n"

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(65);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(67)(content, {"insertAt":"top"});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./places.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./places.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(66)();
	// imports
	
	
	// module
	exports.push([module.id, ".algolia-places {\n  width: 100%; }\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px; }\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa; }\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden; }\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden; }\n  .ap-suggestion em {\n    font-weight: bold;\n    font-style: normal; }\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa; }\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle; }\n  .ap-suggestion-icon svg {\n    transform: scale(0.9) translateY(2px);\n    fill: #cfcfcf; }\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none; }\n  .ap-input-icon svg {\n    fill: #cfcfcf;\n    position: absolute;\n    top: 50%;\n    right: 0;\n    transform: translateY(-50%); }\n\n.ap-cursor {\n  background: #efefef; }\n  .ap-cursor .ap-suggestion-icon svg {\n    transform: scale(1);\n    fill: #aaaaaa; }\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px; }\n  .ap-footer a {\n    color: inherit;\n    text-decoration: none; }\n    .ap-footer a svg {\n      vertical-align: middle; }\n  .ap-footer:hover {\n    opacity: 1; }\n", ""]);
	
	// exports


/***/ },
/* 66 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=placesAutocompleteDataset.js.map