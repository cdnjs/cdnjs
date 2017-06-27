(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(70);


/***/ },

/***/ 4:
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

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTheme = __webpack_require__(71);
	
	var _mdTheme2 = _interopRequireDefault(_mdTheme);
	
	var _mdInkRipple = __webpack_require__(76);
	
	var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);
	
	var _core = __webpack_require__(80);
	
	var _core2 = _interopRequireDefault(_core);
	
	__webpack_require__(81);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Code Components */
	function install(Vue) {
	  if (install.installed) {
	    console.warn('Vue Material is already installed.');
	
	    return;
	  }
	
	  install.installed = true;
	
	  Vue.use(_mdTheme2.default);
	  Vue.use(_mdInkRipple2.default);
	  Vue.material.styles.push(_core2.default);
	}
	
	/* Core Stylesheets */
	module.exports = exports['default'];

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _palette = __webpack_require__(72);
	
	var _palette2 = _interopRequireDefault(_palette);
	
	var _rgba = __webpack_require__(73);
	
	var _rgba2 = _interopRequireDefault(_rgba);
	
	var _MdTheme = __webpack_require__(74);
	
	var _MdTheme2 = _interopRequireDefault(_MdTheme);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VALID_THEME_TYPE = ['primary', 'accent', 'background', 'warn', 'hue-1', 'hue-2', 'hue-3'];
	var DEFAULT_THEME_COLORS = {
	  primary: 'indigo',
	  accent: 'pink',
	  background: 'grey',
	  warn: 'deep-orange'
	};
	/*const DEFAULT_HUES = {
	  accent: {
	    'hue-1': 'A100',
	    'hue-2': 'A400',
	    'hue-3': 'A700'
	  },
	  background: {
	    'hue-1': 'A100',
	    'hue-2': '100',
	    'hue-3': '300'
	  }
	};*/
	
	var createNewStyleElement = function createNewStyleElement(style, name) {
	  var head = document.head;
	  var styleId = 'md-theme-' + name;
	  var styleElement = head.querySelector('#' + styleId);
	
	  if (!styleElement) {
	    var newTag = document.createElement('style');
	
	    style = style.replace(/THEME_NAME/g, styleId);
	
	    newTag.type = 'text/css';
	    newTag.id = styleId;
	    newTag.textContent = style;
	
	    head.appendChild(newTag);
	  } else {
	    styleElement.textContent = style;
	  }
	};
	
	var registeredThemes = [];
	
	var parseStyle = function parseStyle(style, theme) {
	  VALID_THEME_TYPE.forEach(function (type) {
	    style = style.replace(RegExp('(' + type.toUpperCase() + ')-(COLOR|CONTRAST)-?(A?\\d*)-?(\\d*\\.?\\d+)?', 'g'), function (match, paletteType, colorType, hue, opacity) {
	      var color = void 0;
	      var colorVariant = +hue === 0 ? 500 : hue;
	
	      if (theme[type]) {
	        if (typeof theme[type] === 'string') {
	          color = _palette2.default[theme[type]];
	        } else {
	          color = _palette2.default[theme[type].color] || _palette2.default[DEFAULT_THEME_COLORS[type]];
	          colorVariant = +hue === 0 ? theme[type].hue : hue;
	        }
	      } else {
	        color = _palette2.default[DEFAULT_THEME_COLORS[type]];
	      }
	
	      if (colorType === 'COLOR') {
	        var isDefault = _palette2.default[theme[type]];
	
	        if (!hue && !isDefault) {
	          if (type === 'accent') {
	            colorVariant = 'A200';
	          } else if (type === 'background') {
	            colorVariant = 50;
	          }
	        }
	
	        if (opacity) {
	          return (0, _rgba2.default)(color[colorVariant], opacity);
	        }
	
	        return color[colorVariant];
	      }
	
	      if (color.darkText.indexOf(colorVariant) >= 0) {
	        if (opacity) {
	          return (0, _rgba2.default)('#000', opacity);
	        }
	
	        return 'rgba(0, 0, 0, .87)';
	      }
	
	      if (opacity) {
	        return (0, _rgba2.default)('#fff', opacity);
	      }
	
	      return 'rgba(255, 255, 255, .87)';
	    });
	  });
	
	  return style;
	};
	
	var registerTheme = function registerTheme(theme, name, themeStyles) {
	  var parsedStyle = [];
	
	  themeStyles.forEach(function (style) {
	    parsedStyle.push(parseStyle(style, theme));
	  });
	
	  createNewStyleElement(parsedStyle.join('\n'), name);
	};
	
	var registerAllThemes = function registerAllThemes(themes, themeStyles) {
	  var themeNames = themes ? Object.keys(themes) : [];
	
	  themeNames.forEach(function (name) {
	    registerTheme(themes[name], name, themeStyles);
	    registeredThemes.push(name);
	  });
	};
	
	function install(Vue) {
	  Vue.material = new Vue({
	    data: function data() {
	      return {
	        styles: [],
	        currentTheme: null
	      };
	    },
	    methods: {
	      registerTheme: function registerTheme(name, spec) {
	        var theme = {};
	
	        if (typeof name === 'string') {
	          theme[name] = spec;
	        } else {
	          theme = name;
	        }
	
	        registerAllThemes(theme, this.styles);
	      },
	      applyCurrentTheme: function applyCurrentTheme(themeName) {
	        document.body.classList.remove('md-theme-' + this.currentTheme);
	        document.body.classList.add('md-theme-' + themeName);
	        this.currentTheme = themeName;
	      },
	      setCurrentTheme: function setCurrentTheme(themeName) {
	        if (registeredThemes.indexOf(themeName) >= 0) {
	          this.applyCurrentTheme(themeName);
	        } else {
	          if (registeredThemes.indexOf('default') === -1) {
	            this.registerTheme('default', DEFAULT_THEME_COLORS);
	          } else {
	            console.warn('The theme \'' + themeName + '\' doesn\'t exists. You need to register it first in order to use.');
	          }
	
	          this.applyCurrentTheme('default');
	        }
	      }
	    }
	  });
	
	  Vue.component('md-theme', _MdTheme2.default);
	
	  Vue.prototype.$material = Vue.material;
	}
	module.exports = exports['default'];

/***/ },

/***/ 72:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  red: {
	    50: '#ffebee',
	    100: '#ffcdd2',
	    200: '#ef9a9a',
	    300: '#e57373',
	    400: '#ef5350',
	    500: '#f44336',
	    600: '#e53935',
	    700: '#d32f2f',
	    800: '#c62828',
	    900: '#b71c1c',
	    A100: '#ff8a80',
	    A200: '#ff5252',
	    A400: '#ff1744',
	    A700: '#d50000',
	    darkText: [50, 100, 200, 300, 'A100']
	  },
	  pink: {
	    50: '#fce4ec',
	    100: '#f8bbd0',
	    200: '#f48fb1',
	    300: '#f06292',
	    400: '#ec407a',
	    500: '#e91e63',
	    600: '#d81b60',
	    700: '#c2185b',
	    800: '#ad1457',
	    900: '#880e4f',
	    A100: '#ff80ab',
	    A200: '#ff4081',
	    A400: '#f50057',
	    A700: '#c51162',
	    darkText: [50, 100, 200, 'A100']
	  },
	  purple: {
	    50: '#f3e5f5',
	    100: '#e1bee7',
	    200: '#ce93d8',
	    300: '#ba68c8',
	    400: '#ab47bc',
	    500: '#9c27b0',
	    600: '#8e24aa',
	    700: '#7b1fa2',
	    800: '#6a1b9a',
	    900: '#4a148c',
	    A100: '#ea80fc',
	    A200: '#e040fb',
	    A400: '#d500f9',
	    A700: '#aa00ff',
	    darkText: [50, 100, 200, 'A100']
	  },
	  'deep-purple': {
	    50: '#ede7f6',
	    100: '#d1c4e9',
	    200: '#b39ddb',
	    300: '#9575cd',
	    400: '#7e57c2',
	    500: '#673ab7',
	    600: '#5e35b1',
	    700: '#512da8',
	    800: '#4527a0',
	    900: '#311b92',
	    A100: '#b388ff',
	    A200: '#7c4dff',
	    A400: '#651fff',
	    A700: '#6200ea',
	    darkText: [50, 100, 200, 'A100']
	  },
	  indigo: {
	    50: '#e8eaf6',
	    100: '#c5cae9',
	    200: '#9fa8da',
	    300: '#7986cb',
	    400: '#5c6bc0',
	    500: '#3f51b5',
	    600: '#3949ab',
	    700: '#303f9f',
	    800: '#283593',
	    900: '#1a237e',
	    A100: '#8c9eff',
	    A200: '#536dfe',
	    A400: '#3d5afe',
	    A700: '#304ffe',
	    darkText: [50, 100, 200, 'A100']
	  },
	  blue: {
	    50: '#e3f2fd',
	    100: '#bbdefb',
	    200: '#90caf9',
	    300: '#64b5f6',
	    400: '#42a5f5',
	    500: '#2196f3',
	    600: '#1e88e5',
	    700: '#1976d2',
	    800: '#1565c0',
	    900: '#0d47a1',
	    A100: '#82b1ff',
	    A200: '#448aff',
	    A400: '#2979ff',
	    A700: '#2962ff',
	    darkText: [50, 100, 200, 300, 400, 'A100']
	  },
	  'light-blue': {
	    50: '#e1f5fe',
	    100: '#b3e5fc',
	    200: '#81d4fa',
	    300: '#4fc3f7',
	    400: '#29b6f6',
	    500: '#03a9f4',
	    600: '#039be5',
	    700: '#0288d1',
	    800: '#0277bd',
	    900: '#01579b',
	    A100: '#80d8ff',
	    A200: '#40c4ff',
	    A400: '#00b0ff',
	    A700: '#0091ea',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300']
	  },
	  cyan: {
	    50: '#e0f7fa',
	    100: '#b2ebf2',
	    200: '#80deea',
	    300: '#4dd0e1',
	    400: '#26c6da',
	    500: '#00bcd4',
	    600: '#00acc1',
	    700: '#0097a7',
	    800: '#00838f',
	    900: '#006064',
	    A100: '#84ffff',
	    A200: '#18ffff',
	    A400: '#00e5ff',
	    A700: '#00b8d4',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
	  },
	  teal: {
	    50: '#e0f2f1',
	    100: '#b2dfdb',
	    200: '#80cbc4',
	    300: '#4db6ac',
	    400: '#26a69a',
	    500: '#009688',
	    600: '#00897b',
	    700: '#00796b',
	    800: '#00695c',
	    900: '#004d40',
	    A100: '#a7ffeb',
	    A200: '#64ffda',
	    A400: '#1de9b6',
	    A700: '#00bfa5',
	    darkText: [50, 100, 200, 300, 400, 'A100', 'A200', 'A300', 'A400']
	  },
	  green: {
	    50: '#e8f5e9',
	    100: '#c8e6c9',
	    200: '#a5d6a7',
	    300: '#81c784',
	    400: '#66bb6a',
	    500: '#4caf50',
	    600: '#43a047',
	    700: '#388e3c',
	    800: '#2e7d32',
	    900: '#1b5e20',
	    A100: '#b9f6ca',
	    A200: '#69f0ae',
	    A400: '#00e676',
	    A700: '#00c853',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300', 'A400']
	  },
	  'light-green': {
	    50: '#f1f8e9',
	    100: '#dcedc8',
	    200: '#c5e1a5',
	    300: '#aed581',
	    400: '#9ccc65',
	    500: '#8bc34a',
	    600: '#7cb342',
	    700: '#689f38',
	    800: '#558b2f',
	    900: '#33691e',
	    A100: '#ccff90',
	    A200: '#b2ff59',
	    A400: '#76ff03',
	    A700: '#64dd17',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
	  },
	  lime: {
	    50: '#f9fbe7',
	    100: '#f0f4c3',
	    200: '#e6ee9c',
	    300: '#dce775',
	    400: '#d4e157',
	    500: '#cddc39',
	    600: '#c0ca33',
	    700: '#afb42b',
	    800: '#9e9d24',
	    900: '#827717',
	    A100: '#f4ff81',
	    A200: '#eeff41',
	    A400: '#c6ff00',
	    A700: '#aeea00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 'A100', 'A200', 'A300', 'A400']
	  },
	  yellow: {
	    50: '#fffde7',
	    100: '#fff9c4',
	    200: '#fff59d',
	    300: '#fff176',
	    400: '#ffee58',
	    500: '#ffeb3b',
	    600: '#fdd835',
	    700: '#fbc02d',
	    800: '#f9a825',
	    900: '#f57f17',
	    A100: '#ffff8d',
	    A200: '#ffff00',
	    A400: '#ffea00',
	    A700: '#ffd600',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  amber: {
	    50: '#fff8e1',
	    100: '#ffecb3',
	    200: '#ffe082',
	    300: '#ffd54f',
	    400: '#ffca28',
	    500: '#ffc107',
	    600: '#ffb300',
	    700: '#ffa000',
	    800: '#ff8f00',
	    900: '#ff6f00',
	    A100: '#ffe57f',
	    A200: '#ffd740',
	    A400: '#ffc400',
	    A700: '#ffab00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  orange: {
	    50: '#fff3e0',
	    100: '#ffe0b2',
	    200: '#ffcc80',
	    300: '#ffb74d',
	    400: '#ffa726',
	    500: '#ff9800',
	    600: '#fb8c00',
	    700: '#f57c00',
	    800: '#ef6c00',
	    900: '#e65100',
	    A100: '#ffd180',
	    A200: '#ffab40',
	    A400: '#ff9100',
	    A700: '#ff6d00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 'A100', 'A200', 'A300', 'A400']
	  },
	  'deep-orange': {
	    50: '#fbe9e7',
	    100: '#ffccbc',
	    200: '#ffab91',
	    300: '#ff8a65',
	    400: '#ff7043',
	    500: '#ff5722',
	    600: '#f4511e',
	    700: '#e64a19',
	    800: '#d84315',
	    900: '#bf360c',
	    A100: '#ff9e80',
	    A200: '#ff6e40',
	    A400: '#ff3d00',
	    A700: '#dd2c00',
	    darkText: [50, 100, 200, 300, 400, 'A100', 'A200']
	  },
	  brown: {
	    50: '#efebe9',
	    100: '#d7ccc8',
	    200: '#bcaaa4',
	    300: '#a1887f',
	    400: '#8d6e63',
	    500: '#795548',
	    600: '#6d4c41',
	    700: '#5d4037',
	    800: '#4e342e',
	    900: '#3e2723',
	    A100: '#d7ccc8',
	    A200: '#bcaaa4',
	    A400: '#8d6e63',
	    A700: '#5d4037',
	    darkText: [50, 100, 200, 'A100', 'A200', 'A300', 'A400']
	  },
	  grey: {
	    50: '#fafafa',
	    100: '#f5f5f5',
	    200: '#eeeeee',
	    300: '#e0e0e0',
	    400: '#bdbdbd',
	    500: '#9e9e9e',
	    600: '#757575',
	    700: '#616161',
	    800: '#424242',
	    900: '#212121',
	    A100: '#fff',
	    A200: '#000000',
	    A400: '#303030',
	    A700: '#616161',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100']
	  },
	  'blue-grey': {
	    50: '#eceff1',
	    100: '#cfd8dc',
	    200: '#b0bec5',
	    300: '#90a4ae',
	    400: '#78909c',
	    500: '#607d8b',
	    600: '#546e7a',
	    700: '#455a64',
	    800: '#37474f',
	    900: '#263238',
	    A100: '#cfd8dc',
	    A200: '#b0bec5',
	    A400: '#78909c',
	    A700: '#455a64',
	    darkText: [50, 100, 200, 300, 'A100', 'A200', 'A300', 'A400']
	  },
	  white: {
	    50: '#fff',
	    100: '#fff',
	    200: '#fff',
	    300: '#fff',
	    400: '#fff',
	    500: '#fff',
	    600: '#fff',
	    700: '#fff',
	    800: '#fff',
	    900: '#fff',
	    A100: '#fff',
	    A200: '#fff',
	    A400: '#fff',
	    A700: '#fff',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  black: {
	    50: '#000',
	    100: '#000',
	    200: '#000',
	    300: '#000',
	    400: '#000',
	    500: '#000',
	    600: '#000',
	    700: '#000',
	    800: '#000',
	    900: '#000',
	    A100: '#000',
	    A200: '#000',
	    A400: '#000',
	    A700: '#000',
	    darkText: []
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 73:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (hex, opacity) {
	  var r = '';
	  var g = '';
	  var b = '';
	  var match = hex.toString().match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);
	
	  if (!match) {
	    throw new Error('Invalid color' + hex);
	  }
	
	  hex = match[1];
	
	  if (hex.length === 6) {
	    r = parseInt(hex.substring(0, 2), 16);
	    g = parseInt(hex.substring(2, 4), 16);
	    b = parseInt(hex.substring(4, 6), 16);
	  } else if (hex.length === 3) {
	    var rSubstring = hex.substring(0, 1);
	    var gSubstring = hex.substring(1, 2);
	    var bSubstring = hex.substring(2, 3);
	
	    r = parseInt(rSubstring + rSubstring, 16);
	    g = parseInt(gSubstring + gSubstring, 16);
	    b = parseInt(bSubstring + bSubstring, 16);
	  }
	
	  if (opacity) {
	    if (opacity > 1) {
	      opacity = opacity / 100;
	    }
	
	    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
	  }
	
	  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	};
	
	module.exports = exports['default'];

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(75)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/core/components/mdTheme/MdTheme.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7108c965", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7108c965", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] MdTheme.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 75:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    mdTag: String,
	    mdName: {
	      type: String,
	      default: 'default'
	    }
	  },
	  data: function data() {
	    return {
	      name: 'md-theme'
	    };
	  },
	  render: function render(_render) {
	    if (this.mdTag || this.$slots.default.length > 1) {
	      return _render(this.mdTag || 'div', {
	        staticClass: 'md-theme'
	      }, this.$slots.default);
	    }
	
	    return this.$slots.default[0];
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	__webpack_require__(77);
	
	__webpack_require__(78);
	
	function install(Vue) {
	  var rippleParentClass = 'md-ink-ripple';
	  var rippleClass = 'md-ripple';
	  var rippleActiveClass = 'md-active';
	  var registeredMouseFunction = void 0;
	  var referenceElement = void 0;
	
	  var unregisterMouseEvent = function unregisterMouseEvent() {
	    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : referenceElement;
	
	    el.removeEventListener('mousedown', registeredMouseFunction);
	  };
	
	  var registerMouseEvent = function registerMouseEvent(element, holder) {
	    if (holder) {
	      (function () {
	        var ripple = holder.querySelector(':scope > .' + rippleParentClass + '> .' + rippleClass);
	
	        if (ripple) {
	          registeredMouseFunction = function registeredMouseFunction(event) {
	            var rect = holder.getBoundingClientRect();
	
	            event.stopPropagation();
	
	            ripple.classList.remove(rippleActiveClass);
	
	            var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
	            var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
	
	            ripple.style.top = top + 'px';
	            ripple.style.left = left + 'px';
	
	            ripple.classList.add(rippleActiveClass);
	          };
	
	          element.removeEventListener('mousedown', registeredMouseFunction);
	          element.addEventListener('mousedown', registeredMouseFunction);
	        }
	      })();
	    }
	  };
	
	  var createElement = function createElement(ripple, className, size) {
	    ripple = document.createElement('div');
	    ripple.className = className;
	
	    if (size) {
	      ripple.style.width = size;
	      ripple.style.height = size;
	    }
	
	    return ripple;
	  };
	
	  var checkAvailablePositions = function checkAvailablePositions(element) {
	    var availablePositions = ['relative', 'absolute', 'fixed'];
	
	    return availablePositions.indexOf(getComputedStyle(element).position) > -1;
	  };
	
	  var getClosestParent = function getClosestParent(element) {
	    var found = false;
	    var parent = element;
	
	    if (!element) {
	      return false;
	    }
	
	    if (checkAvailablePositions(element)) {
	      return element;
	    }
	
	    while (!found) {
	      parent = parent.parentNode;
	
	      if (!parent || parent.tagName.toLowerCase() === 'body') {
	        break;
	      }
	
	      if (parent && checkAvailablePositions(parent)) {
	        found = parent;
	      }
	    }
	
	    return found;
	  };
	
	  var createRipple = function createRipple(element, currentRipple) {
	    var holder = getClosestParent(element);
	
	    if (holder) {
	      var ripple = holder.querySelector(':scope > .' + rippleParentClass + '> .' + rippleClass);
	
	      if (!ripple) {
	        var elementSize = Math.round(Math.max(holder.offsetWidth, holder.offsetHeight)) + 'px';
	        var rippleParent = currentRipple || createElement(ripple, rippleParentClass);
	        var rippleElement = createElement(ripple, rippleClass, elementSize);
	
	        rippleParent.appendChild(rippleElement);
	        holder.appendChild(rippleParent);
	      }
	
	      if (holder !== element || !ripple) {
	        referenceElement = element;
	        registerMouseEvent(element, holder);
	      }
	    }
	  };
	
	  Vue.directive('mdInkRipple', function (el, bindings) {
	    Vue.nextTick(function () {
	      if (!bindings.value) {
	        createRipple(el);
	      } else {
	        unregisterMouseEvent(el);
	      }
	    });
	  });
	
	  Vue.component('md-ink-ripple', {
	    props: {
	      mdDisabled: Boolean
	    },
	    render: function render(createElement) {
	      return createElement('div', {
	        staticClass: 'md-ink-ripple'
	      });
	    },
	
	    watch: {
	      mdDisabled: function mdDisabled() {
	        if (this.mdDisabled) {
	          unregisterMouseEvent(this.$el.parentNode);
	        } else {
	          createRipple(this.$el.parentNode, this.$el);
	        }
	      }
	    },
	    mounted: function mounted() {
	      if (!this.mdDisabled) {
	        createRipple(this.$el.parentNode, this.$el);
	      }
	    },
	    destroyed: function destroyed() {
	      unregisterMouseEvent(this.$el.parentNode);
	    }
	  });
	}
	module.exports = exports['default'];

/***/ },

/***/ 77:
/***/ function(module, exports) {

	/* scopeQuerySelectorShim.js
	*
	* Copyright (C) 2015 Larry Davis
	* All rights reserved.
	*
	* This software may be modified and distributed under the terms
	* of the BSD license.  See the LICENSE file for details.
	*/
	(function() {
	    if (!HTMLElement.prototype.querySelectorAll) {
	        throw new Error("rootedQuerySelectorAll: This polyfill can only be used with browsers that support querySelectorAll");
	    }
	    // A temporary element to query against for elements not currently in the DOM
	    // We'll also use this element to test for :scope support
	    var container = document.createElement("div");
	    // Check if the browser supports :scope
	    try {
	        // Browser supports :scope, do nothing
	        container.querySelectorAll(":scope *");
	    } catch (e) {
	        // Match usage of scope
	        var scopeRE = /^\s*:scope/gi;
	        // Overrides
	        function overrideNodeMethod(prototype, methodName) {
	            // Store the old method for use later
	            var oldMethod = prototype[methodName];
	            // Override the method
	            prototype[methodName] = function(query) {
	                var nodeList, gaveId = false, gaveContainer = false;
	                if (query.match(scopeRE)) {
	                    // Remove :scope
	                    query = query.replace(scopeRE, "");
	                    if (!this.parentNode) {
	                        // Add to temporary container
	                        container.appendChild(this);
	                        gaveContainer = true;
	                    }
	                    parentNode = this.parentNode;
	                    if (!this.id) {
	                        // Give temporary ID
	                        this.id = "rootedQuerySelector_id_" + new Date().getTime();
	                        gaveId = true;
	                    }
	                    // Find elements against parent node
	                    nodeList = oldMethod.call(parentNode, "#" + this.id + " " + query);
	                    // Reset the ID
	                    if (gaveId) {
	                        this.id = "";
	                    }
	                    // Remove from temporary container
	                    if (gaveContainer) {
	                        container.removeChild(this);
	                    }
	                    return nodeList;
	                } else {
	                    // No immediate child selector used
	                    return oldMethod.call(this, query);
	                }
	            };
	        }
	        // Browser doesn't support :scope, add polyfill
	        overrideNodeMethod(HTMLElement.prototype, "querySelector");
	        overrideNodeMethod(HTMLElement.prototype, "querySelectorAll");
	    }
	})();

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(79)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/core/components/mdInkRipple/mdInkRipple.vue"
	if (__vue_options__.functional) {console.error("[vue-loader] mdInkRipple.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 79:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 80:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME :not(input):not(textarea)::selection {\n  background: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n\n.THEME_NAME a:not(.md-button) {\n  color: ACCENT-COLOR; }\n  .THEME_NAME a:not(.md-button):hover {\n    color: ACCENT-COLOR-800; }\n\nbody.THEME_NAME {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST-0.87; }\n\n/* Typography */\n.THEME_NAME .md-caption,\n.THEME_NAME .md-display-1,\n.THEME_NAME .md-display-2,\n.THEME_NAME .md-display-3,\n.THEME_NAME .md-display-4 {\n  color: BACKGROUND-CONTRAST-0.57; }\n\n.THEME_NAME code:not(.hljs) {\n  background-color: ACCENT-COLOR-A100-0.2;\n  color: ACCENT-COLOR-800; }\n"

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(83)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./core.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./core.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/* Common */\n/* Responsive Breakpoints */\n/* Transitions - Based on Angular Material */\n/* Elevation - Based on Angular Material */\n/*  Structure\n   ========================================================================== */\nhtml {\n  height: 100%;\n  box-sizing: border-box; }\n  html *,\n  html *:before,\n  html *:after {\n    box-sizing: inherit; }\n\nbody {\n  min-height: 100%;\n  margin: 0;\n  position: relative;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.87);\n  font-family: Roboto, \"Noto Sans\", Noto, sans-serif; }\n\n[tabindex='-1']:focus {\n  outline: none; }\n\n/*  Fluid Media\n   ========================================================================== */\naudio,\nimg,\nsvg,\nobject,\nembed,\ncanvas,\nvideo,\niframe {\n  max-width: 100%;\n  height: auto;\n  font-style: italic;\n  vertical-align: middle; }\n\n/*  Suppress the focus outline on links that cannot be accessed via keyboard.\n    This prevents an unwanted focus outline from appearing around elements\n    that might still respond to pointer events.\n   ========================================================================== */\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\n.md-scrollbar::-webkit-scrollbar,\n.md-scrollbar ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.12);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  background-color: rgba(0, 0, 0, 0.05); }\n  .md-scrollbar::-webkit-scrollbar:hover,\n  .md-scrollbar ::-webkit-scrollbar:hover {\n    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.038);\n    background-color: rgba(0, 0, 0, 0.087); }\n\n.md-scrollbar::-webkit-scrollbar-button,\n.md-scrollbar ::-webkit-scrollbar-button {\n  display: none; }\n\n.md-scrollbar::-webkit-scrollbar-corner,\n.md-scrollbar ::-webkit-scrollbar-corner {\n  background-color: transparent; }\n\n.md-scrollbar::-webkit-scrollbar-thumb,\n.md-scrollbar ::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.26);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.087);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n\n/*  Text and Titles\n   ========================================================================== */\n.md-caption {\n  font-size: 12px;\n  font-weight: 400;\n  letter-spacing: .02em;\n  line-height: 17px; }\n\n.md-body-1, body {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-subheading {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: .005em;\n  line-height: 26px; }\n\n.md-headline {\n  font-size: 24px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 32px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 40px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 48px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -.005em;\n  line-height: 58px; }\n\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -.01em;\n  line-height: 112px; }\n\n/*  Links & Buttons\n   ========================================================================== */\na:not(.md-button):not(.md-bottom-bar-item) {\n  text-decoration: none; }\n  a:not(.md-button):not(.md-bottom-bar-item):hover {\n    text-decoration: underline; }\n\nbutton:focus {\n  outline: none; }\n", ""]);
	
	// exports


/***/ },

/***/ 83:
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
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
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
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map