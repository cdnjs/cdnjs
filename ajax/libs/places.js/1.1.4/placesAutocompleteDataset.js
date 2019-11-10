/*!  1.1.4 | © Algolia | github.com/algolia/places */
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createAutocompleteDataset = __webpack_require__(50);
	
	var _createAutocompleteDataset2 = _interopRequireDefault(_createAutocompleteDataset);
	
	var _places = __webpack_require__(65);
	
	var _places2 = _interopRequireDefault(_places);
	
	var _insertCss = __webpack_require__(66);
	
	var _insertCss2 = _interopRequireDefault(_insertCss);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _insertCss2.default)(_places2.default, { prepend: true });
	
	// must use module.exports to be commonJS compatible
	module.exports = _createAutocompleteDataset2.default;

/***/ },

/***/ 50:
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

/***/ 51:
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function createAutocompleteSource(_ref) {
	  var algoliasearch = _ref.algoliasearch;
	  var clientOptions = _ref.clientOptions;
	  var apiKey = _ref.apiKey;
	  var appId = _ref.appId;
	  var aroundLatLng = _ref.aroundLatLng;
	  var aroundRadius = _ref.aroundRadius;
	  var aroundLatLngViaIP = _ref.aroundLatLngViaIP;
	  var countries = _ref.countries;
	  var formatInputValue = _ref.formatInputValue;
	  var _ref$computeQueryPara = _ref.computeQueryParams;
	  var computeQueryParams = _ref$computeQueryPara === undefined ? function (params) {
	    return params;
	  } : _ref$computeQueryPara;
	  var _ref$useDeviceLocatio = _ref.useDeviceLocation;
	  var useDeviceLocation = _ref$useDeviceLocatio === undefined ? false : _ref$useDeviceLocatio;
	  var _ref$language = _ref.language;
	  var language = _ref$language === undefined ? navigator.language.split('-')[0] : _ref$language;
	  var _ref$onHits = _ref.onHits;
	  var onHits = _ref$onHits === undefined ? function () {} : _ref$onHits;
	  var type = _ref.type;
	
	  var placesClient = algoliasearch.initPlaces(apiKey, appId, clientOptions);
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
	
	  var userCoords = void 0;
	  if (useDeviceLocation) {
	    navigator.geolocation.watchPosition(function (_ref2) {
	      var coords = _ref2.coords;
	      return userCoords = coords.latitude + ',' + coords.longitude;
	    });
	  }
	
	  return function (query, cb) {
	    var _extends2;
	
	    return placesClient.search(computeQueryParams(_extends({}, defaultQueryParams, (_extends2 = {}, _defineProperty(_extends2, userCoords ? 'aroundLatLng' : undefined, userCoords), _defineProperty(_extends2, 'query', query), _extends2)))).then(function (content) {
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

/***/ 52:
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
	    /* eslint-disable no-console */
	    console.error('Could not parse object', hit);
	    console.error(e);
	    /* eslint-enable no-console */
	    return {
	      value: 'Could not parse object'
	    };
	  }
	}

/***/ },

/***/ 53:
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

/***/ 54:
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

/***/ 55:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '1.1.4';

/***/ },

/***/ 56:
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
	  footer: '<div class="ap-footer">\n  Built by <a href="https://www.algolia.com/places" title="Search by Algolia" class="ap-footer-algolia">' + _algolia2.default.trim() + '</a>\n  using <a href="https://community.algolia.com/places/documentation.html#license" class="ap-footer-osm" title="Algolia Places data © OpenStreetMap contributors">' + _osm2.default.trim() + ' <span>data</span></a>\n  </div>',
	  value: _formatInputValue2.default,
	  suggestion: _formatDropdownValue2.default
	};

/***/ },

/***/ 57:
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
	  var type = _ref.type;
	
	  var out = ('' + name + (type !== 'country' ? ',' : '') + '\n ' + (city ? city + ',' : '') + '\n ' + (administrative ? administrative + ',' : '') + '\n ' + (country ? '' + country : '')).replace(/\s*\n\s*/g, ' ').trim();
	  return out;
	}

/***/ },

/***/ 58:
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

/***/ 59:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n"

/***/ },

/***/ 60:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n"

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n"

/***/ },

/***/ 62:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"38\" height=\"12\" viewBox=\"0 0 38 12\">\n  <g fill=\"none\" fill-rule=\"evenodd\">\n    <path fill=\"#00B7E5\" d=\"M22.76 4.317l-.5 1.794 1.607-.89c-.234-.43-.63-.76-1.107-.9zM18.825 6.15c0 1.92 1.53 3.48 3.423 3.48 1.89 0 3.424-1.563 3.424-3.485s-1.533-3.478-3.424-3.478c-1.892 0-3.424 1.556-3.424 3.478v.004zm3.423-2.487c1.348 0 2.446 1.115 2.446 2.484 0 1.37-1.1 2.487-2.448 2.487-1.347 0-2.444-1.116-2.444-2.485 0-1.38 1.097-2.49 2.448-2.49h-.002zm1.18-1.427c0-.02.004-.032.004-.045v-.31c0-.34-.275-.63-.614-.63h-1.075c-.34 0-.614.28-.614.63v.31c.34-.1.7-.15 1.07-.15.43 0 .84.07 1.22.21v.01zm-3.754.61c-.24-.244-.63-.244-.868 0l-.11.11c-.24.243-.24.64 0 .885l.115.12c.25-.4.57-.75.93-1.05l-.06-.06v.01z\"/>\n    <path fill=\"#2B395C\" d=\"M6.687 9.28c-.142-.362-.274-.72-.397-1.07l-.385-1.07H2.03l-.78 2.14H0c.33-.886.64-1.706.927-2.46.29-.753.57-1.468.846-2.145.278-.68.554-1.322.824-1.938.273-.616.556-1.227.855-1.837h1.1c.294.604.58 1.213.85 1.83.273.616.546 1.26.823 1.94.275.67.558 1.387.847 2.14.288.753.597 1.57.927 2.455H6.68l-.002-.007v.023zM5.56 6.176c-.265-.702-.525-1.38-.784-2.036-.258-.66-.527-1.29-.81-1.894-.29.608-.558 1.238-.822 1.895-.255.66-.513 1.34-.77 2.04H5.56zM11.266 9.7c-.705-.018-1.205-.17-1.5-.454-.295-.285-.442-.733-.442-1.336V.266L10.47.07v7.657c0 .187.014.342.046.465.033.122.086.22.16.295.076.072.18.13.3.164.125.04.28.07.46.1l-.16.96h-.01zm5.273-.92c-.1.067-.29.15-.57.25-.28.103-.61.152-.99.152s-.75-.058-1.09-.18c-.34-.123-.64-.312-.89-.57-.25-.255-.45-.577-.6-.957-.15-.38-.22-.84-.22-1.366 0-.47.07-.9.203-1.28.14-.39.345-.73.61-1 .26-.29.582-.51.97-.66.38-.16.81-.24 1.292-.24.525 0 .985.03 1.39.11.39.07.723.15.993.22v5.67c0 .97-.26 1.69-.76 2.12-.51.44-1.275.66-2.3.66-.4 0-.777-.04-1.13-.1-.36-.06-.66-.14-.925-.23l.207-.99c.223.09.504.17.833.23.33.07.676.11 1.03.11.67 0 1.16-.13 1.457-.4.3-.27.45-.7.45-1.29v-.28h.006zm-.47-4.805c-.19-.03-.45-.043-.78-.043-.61 0-1.08.2-1.41.6-.33.397-.49.927-.49 1.585 0 .367.04.68.14.942.09.26.22.48.38.64.16.17.34.3.54.38.21.08.42.12.64.12.3 0 .57-.04.83-.13.25-.08.45-.18.59-.29V4.07c-.11-.032-.26-.062-.46-.09l-.01-.005zM28.45 9.7c-.702-.018-1.206-.17-1.498-.454-.296-.285-.44-.733-.44-1.336V.266l1.15-.196v7.657c0 .187.013.342.05.465.036.122.087.22.153.292.074.078.177.13.3.168.125.04.28.07.46.092l-.16.956h-.014zm2.265-8.173c-.234 0-.43-.07-.59-.207-.17-.14-.25-.324-.25-.557 0-.234.08-.42.25-.558.16-.13.36-.204.593-.204.235 0 .43.08.6.21.16.14.25.33.25.57 0 .24-.08.43-.247.56-.16.14-.36.21-.59.21v-.01zm-.636 1.175h1.3v6.51h-1.3V2.7zm5.3-.19c.47 0 .85.063 1.18.19.32.126.57.304.77.535.19.225.33.5.41.822.08.31.12.66.12 1.05v4.25l-.42.07c-.18.03-.39.06-.61.09-.216.03-.465.05-.73.07-.26.02-.52.03-.78.03-.365 0-.7-.04-1.01-.12-.31-.08-.57-.21-.797-.37-.22-.17-.394-.4-.52-.68s-.19-.62-.19-1.01c0-.38.074-.7.22-.97.145-.27.34-.49.59-.65.253-.16.543-.29.876-.37.33-.07.68-.12 1.043-.12.12 0 .24.01.37.02l.35.05.292.06.17.04v-.34c0-.2-.02-.4-.06-.6-.05-.2-.12-.37-.23-.53-.11-.15-.26-.27-.44-.363-.198-.09-.44-.14-.737-.14-.38 0-.72.032-1 .09-.288.055-.507.114-.646.18l-.122-1c.15-.074.4-.14.75-.205.344-.07.724-.11 1.133-.11h.002v-.01zm.1 6.098c.28 0 .52-.01.73-.02.21-.01.39-.036.52-.07V6.49c-.08-.045-.22-.08-.41-.112-.19-.03-.42-.046-.68-.046-.17 0-.36.013-.55.04-.19.026-.37.08-.54.163-.16.084-.3.196-.4.34-.11.144-.17.334-.17.57 0 .436.14.738.4.908.265.168.63.256 1.09.256h-.006z\"/>\n  </g>\n</svg>\n"

/***/ },

/***/ 63:
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n"

/***/ },

/***/ 65:
/***/ function(module, exports) {

	module.exports = ".algolia-places {\n  width: 100%; }\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit; }\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa; }\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden; }\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden; }\n  .ap-suggestion em {\n    font-weight: bold;\n    font-style: normal; }\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa; }\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle; }\n  .ap-suggestion-icon svg {\n    transform: scale(0.9) translateY(2px);\n    fill: #cfcfcf; }\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none; }\n  .ap-input-icon.ap-input-icon-pin {\n    cursor: initial; }\n  .ap-input-icon svg {\n    fill: #cfcfcf;\n    position: absolute;\n    top: 50%;\n    right: 0;\n    transform: translateY(-50%); }\n\n.ap-cursor {\n  background: #efefef; }\n  .ap-cursor .ap-suggestion-icon svg {\n    transform: scale(1) translateY(2px);\n    fill: #aaaaaa; }\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px; }\n  .ap-footer a {\n    color: inherit;\n    text-decoration: none; }\n    .ap-footer a svg {\n      vertical-align: middle; }\n  .ap-footer:hover {\n    opacity: 1; }\n"

/***/ },

/***/ 66:
/***/ function(module, exports) {

	var inserted = {};
	
	module.exports = function (css, options) {
	    if (inserted[css]) return;
	    inserted[css] = true;
	    
	    var elem = document.createElement('style');
	    elem.setAttribute('type', 'text/css');
	
	    if ('textContent' in elem) {
	      elem.textContent = css;
	    } else {
	      elem.styleSheet.cssText = css;
	    }
	    
	    var head = document.getElementsByTagName('head')[0];
	    if (options && options.prepend) {
	        head.insertBefore(elem, head.childNodes[0]);
	    } else {
	        head.appendChild(elem);
	    }
	};


/***/ }

/******/ })
});
;
//# sourceMappingURL=placesAutocompleteDataset.js.map