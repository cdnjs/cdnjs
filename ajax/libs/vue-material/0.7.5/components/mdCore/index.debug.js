(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, (function() {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 481);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdTheme = __webpack_require__(121);

var _mdTheme2 = _interopRequireDefault(_mdTheme);

var _mdInkRipple = __webpack_require__(119);

var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);

var _core = __webpack_require__(295);

var _core2 = _interopRequireDefault(_core);

__webpack_require__(229);

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

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdInkRipple = __webpack_require__(370);

var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-ink-ripple', _mdInkRipple2.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var changeHtmlMetaColor = exports.changeHtmlMetaColor = undefined;
var createNewStyleElement = exports.createNewStyleElement = undefined;

if (process.env.VUE_ENV !== 'server') {
  exports.changeHtmlMetaColor = changeHtmlMetaColor = function changeHtmlMetaColor(color, themeClass, previousClass) {
    var elem = document.querySelector('meta[name="theme-color"]');

    if (elem) {
      elem.setAttribute('content', color);
    } else {
      elem = document.createElement('meta');
      elem.setAttribute('name', 'theme-color');
      elem.setAttribute('content', color);

      document.head.appendChild(elem);
    }

    document.body.classList.remove(previousClass);
    document.body.classList.add(themeClass);
  };

  exports.createNewStyleElement = createNewStyleElement = function createNewStyleElement(style, styleId) {
    var head = document.head;
    var styleElement = head.querySelector('#' + styleId);

    if (!styleElement) {
      var newTag = document.createElement('style');

      newTag.type = 'text/css';
      newTag.id = styleId;
      newTag.textContent = style;

      head.appendChild(newTag);
    } else {
      styleElement.textContent = style;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(265)))

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(38);

var _keys2 = _interopRequireDefault(_keys);

exports.default = install;

var _palette = __webpack_require__(122);

var _palette2 = _interopRequireDefault(_palette);

var _rgba = __webpack_require__(123);

var _rgba2 = _interopRequireDefault(_rgba);

var _mdTheme = __webpack_require__(371);

var _mdTheme2 = _interopRequireDefault(_mdTheme);

var _dom = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_THEME_TYPE = ['primary', 'accent', 'background', 'warn', 'hue-1', 'hue-2', 'hue-3'];
var TYPE_REGEX = new RegExp('(' + VALID_THEME_TYPE.join('|').toUpperCase() + ')-(COLOR|CONTRAST)-?(A?\\d*)-?(\\d*\\.?\\d+)?', 'g');
var DEFAULT_THEME_COLORS = {
  primary: 'indigo',
  accent: 'pink',
  background: 'white',
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

var registeredPrimaryColor = {};
var injectedStyles = {};

var parseStyle = function parseStyle(style, theme, name) {
  return style.replace(TYPE_REGEX, (function (match, type, colorType, hue, opacity) {
    var color = void 0;
    var colorVariant = +hue === 0 ? 500 : hue;

    type = type.toLowerCase();

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

      if (!colorVariant && !isDefault) {
        if (type === 'accent') {
          colorVariant = 'A200';
        } else if (type === 'background') {
          colorVariant = 50;
        }
      }

      if (type === 'primary') {
        registeredPrimaryColor[name] = color[colorVariant];
      }

      if (opacity) {
        return (0, _rgba2.default)(color[colorVariant], opacity);
      }

      return color[colorVariant];
    }

    var isDarkText = color.darkText.indexOf(colorVariant) >= 0;

    if (theme[type] && typeof theme[type] !== 'string' && theme[type].textColor) {
      if (theme[type].textColor === 'black') {
        isDarkText = true;
      } else if (theme[type].textColor === 'white') {
        isDarkText = false;
      }
    }

    if (isDarkText) {
      if (opacity) {
        return (0, _rgba2.default)('#000', opacity);
      }

      return 'rgba(0, 0, 0, .87)';
    }

    if (opacity) {
      return (0, _rgba2.default)('#fff', opacity);
    }

    return 'rgba(255, 255, 255, .87)';
  }));
};

function warnNotFound(themeName) {
  console.warn('The theme \'' + themeName + '\' doesn\'t exists. You need to register' + ' it first in order to use.');
}

function injectStyle(style, spec, name, styleId) {
  if (_dom.createNewStyleElement) {
    style = parseStyle(style, spec, name);
    style = style.replace(/THEME_NAME/g, styleId);

    (0, _dom.createNewStyleElement)(style, styleId);
  }
}

function install(Vue) {
  Vue.material = new Vue({
    data: {
      currentTheme: null,
      inkRipple: true,
      prefix: 'md-theme-',
      styles: [],
      themes: {
        default: DEFAULT_THEME_COLORS
      }
    },
    watch: {
      styles: function styles() {
        this.refreshInjectedStyles();
      }
    },
    methods: {
      registerPalette: function registerPalette(name, spec) {
        _palette2.default[name] = spec;
      },
      useTheme: function useTheme(name) {
        if (name in injectedStyles) {
          return;
        }
        var spec = this.themes[name];

        if (!spec) {
          return warnNotFound(name);
        }

        injectStyle(this.styles.join('\n'), spec, name, this.prefix + name);

        return injectedStyles[name] = true;
      },
      refreshInjectedStyles: function refreshInjectedStyles() {
        var _this = this;

        var styles = this.styles.join('\n');
        var prefix = this.prefix;

        (0, _keys2.default)(injectedStyles).forEach((function (name) {
          var spec = _this.themes[name];

          injectStyle(styles, spec, name, prefix + name);
        }));
      },
      registerTheme: function registerTheme(name, spec) {
        var _this2 = this;

        if (typeof name === 'string') {
          this.themes[name] = spec;
        } else {
          (0, _keys2.default)(name).forEach((function (k) {
            return _this2.themes[k] = name[k];
          }));
        }
      },
      setCurrentTheme: function setCurrentTheme(name) {
        if (name === this.currentTheme) {
          return;
        }

        var prefix = this.prefix;

        this.useTheme(name);

        if (_dom.changeHtmlMetaColor) {
          (0, _dom.changeHtmlMetaColor)(registeredPrimaryColor[name], prefix + name, prefix + this.currentTheme);
        }

        this.currentTheme = name;
      }
    },
    created: function created() {
      // set the default theme by default
      this.setCurrentTheme('default');
    }
  });

  Vue.component('md-theme', _mdTheme2.default);

  Vue.prototype.$material = Vue.material;
}
module.exports = exports['default'];

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(28)
  , hide      = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(31)
  , enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys')
  , uid    = __webpack_require__(20);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

var addEvent = function addEvent(target, type, handler) {
  if (type === 'start') {
    target.addEventListener('mousedown', handler);
    target.addEventListener('touchstart', handler);
  } else {
    target.addEventListener('mouseup', handler);
    target.addEventListener('touchend', handler);
  }
};
var removeEvent = function removeEvent(target, type, handler) {
  if (type === 'start') {
    target.removeEventListener('mousedown', handler);
    target.removeEventListener('touchstart', handler);
  } else {
    target.removeEventListener('mouseup', handler);
    target.removeEventListener('touchend', handler);
  }
};

exports.default = {
  name: 'md-ink-ripple',
  props: {
    mdDisabled: Boolean
  },
  data: function data() {
    return {
      mounted: false,
      rippleElement: null,
      parentElement: null,
      parentDimensions: {
        width: null,
        height: null,
        top: null,
        left: null
      },
      awaitingComplete: false,
      hasCompleted: false,
      fadeOut: false,
      active: false
    };
  },
  computed: {
    classes: function classes() {
      return {
        'md-fadeout': this.fadeOut,
        'md-active': this.active
      };
    },
    styles: function styles() {
      return {
        width: this.parentDimensions.width,
        height: this.parentDimensions.height,
        top: this.parentDimensions.top,
        left: this.parentDimensions.left
      };
    },
    disabled: function disabled() {
      return this.mdDisabled || !this.$material.inkRipple;
    }
  },
  watch: {
    disabled: function disabled(_disabled) {
      if (!_disabled) {
        this.init();
      } else {
        this.destroy();
      }
    }
  },
  methods: {
    checkAvailablePositions: function checkAvailablePositions(element) {
      var availablePositions = ['relative', 'absolute', 'fixed'];

      return availablePositions.indexOf(getComputedStyle(element).position) > -1;
    },
    getClosestPositionedParent: function getClosestPositionedParent(element) {
      var parent = element && element.parentNode;

      if (!parent || parent.tagName.toLowerCase() === 'body') {
        return false;
      }

      if (this.checkAvailablePositions(element)) {
        return element;
      }

      return this.getClosestPositionedParent(parent);
    },
    getParentSize: function getParentSize() {
      var parent = this.parentElement;

      return Math.round(Math.max(parent.offsetWidth, parent.offsetHeight)) + 'px';
    },
    getClickPosition: function getClickPosition(event) {
      if (this.$refs.ripple) {
        var rect = this.parentElement.getBoundingClientRect();
        var top = event.pageY;
        var left = event.pageX;

        if (event.type === 'touchstart') {
          top = event.changedTouches[0].pageY;
          left = event.changedTouches[0].pageX;
        }

        return {
          top: top - rect.top - this.$refs.ripple.offsetHeight / 2 - document.body.scrollTop + 'px',
          left: left - rect.left - this.$refs.ripple.offsetWidth / 2 - document.body.scrollLeft + 'px'
        };
      }

      return false;
    },
    setDimensions: function setDimensions() {
      var size = this.getParentSize();

      this.parentDimensions.width = size;
      this.parentDimensions.height = size;
    },
    setPositions: function setPositions(event) {
      var positions = this.getClickPosition(event);

      if (positions) {
        this.parentDimensions.top = positions.top;
        this.parentDimensions.left = positions.left;
      }
    },
    clearState: function clearState() {
      this.active = false;
      this.fadeOut = false;
      this.hasCompleted = false;
      this.setDimensions();
      window.clearTimeout(this.awaitingComplete);
      removeEvent(document.body, 'end', this.endRipple);
    },
    startRipple: function startRipple(event) {
      var _this = this;

      if (event.type === 'touchstart') {
        this.previous.push('touch');
      } else {
        this.previous.push('mouse');
      }

      this.previous = this.previous.splice(this.previous.length - 2, this.previous.length);

      if (this.previous.length >= 2 && this.previous[1] === 'touch' && this.previous[0] === 'mouse') {
        return;
      }

      this.clearState();
      this.awaitingComplete = window.setTimeout((function () {
        _this.hasCompleted = true;
      }), 400);

      addEvent(document.body, 'end', this.endRipple);

      this.$nextTick((function () {
        _this.setPositions(event);
        _this.active = true;
      }));
    },
    endRipple: function endRipple() {
      var _this2 = this;

      if (this.hasCompleted) {
        this.fadeOut = true;
      } else {
        this.awaitingComplete = window.setTimeout((function () {
          _this2.fadeOut = true;
        }), 200);
      }

      removeEvent(document.body, 'end', this.endRipple);
    },
    registerTriggerEvent: function registerTriggerEvent() {
      addEvent(this.parentElement, 'start', this.startRipple);
    },
    unregisterTriggerEvent: function unregisterTriggerEvent() {
      if (this.parentElement) {
        removeEvent(this.parentElement, 'start', this.startRipple);
      }
    },
    init: function init() {
      this.rippleElement = this.$el;
      this.parentElement = this.getClosestPositionedParent(this.$el.parentNode);
      this.previous = ['mouse'];

      if (this.parentElement) {
        this.rippleElement.parentNode.removeChild(this.rippleElement);

        if (this.parentElement.querySelectorAll('.md-ink-ripple').length > 0) {
          this.$destroy();
        } else {
          this.parentElement.appendChild(this.rippleElement);
          this.registerTriggerEvent();
          this.setDimensions();
        }
      } else {
        this.$destroy();
      }
    },
    destroy: function destroy() {
      if (this.rippleElement && this.rippleElement.parentNode) {
        this.unregisterTriggerEvent();
        this.rippleElement.parentNode.removeChild(this.rippleElement);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    window.setTimeout((function () {
      if (!_this3.disabled) {
        _this3.init();
      } else {
        _this3.destroy();
      }

      _this3.$nextTick((function () {
        _this3.mounted = true;
      }));
    }), 100);
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'md-theme',
  props: {
    mdTag: String,
    mdName: {
      type: String,
      default: 'default'
    }
  },
  render: function render(createElement) {
    if (this.mdTag || this.$slots.default.length > 1) {
      return createElement(this.mdTag || 'div', {
        staticClass: this.$material.prefix + this.mdName
      }, this.$slots.default);
    }

    return this.$slots.default[0];
  },

  watch: {
    mdName: function mdName(value) {
      this.$material.useTheme(value);
    }
  },
  beforeMount: function beforeMount() {
    var localTheme = this.mdName;

    if (localTheme) {
      this.$material.useTheme(localTheme);
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(14);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 265:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 295:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME :not(input):not(textarea)::selection {\n  background: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n\n.THEME_NAME a:not(.md-button) {\n  color: ACCENT-COLOR; }\n  .THEME_NAME a:not(.md-button):hover {\n    color: ACCENT-COLOR-800; }\n\nbody.THEME_NAME {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST-0.87; }\n\n/* Typography */\n.THEME_NAME .md-caption,\n.THEME_NAME .md-display-1,\n.THEME_NAME .md-display-2,\n.THEME_NAME .md-display-3,\n.THEME_NAME .md-display-4 {\n  color: BACKGROUND-CONTRAST-0.57; }\n\n.THEME_NAME code:not(.hljs) {\n  background-color: ACCENT-COLOR-A100-0.2;\n  color: ACCENT-COLOR-800; }\n"

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)((function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(5)((function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(8)
  , toIObject    = __webpack_require__(7)
  , arrayIndexOf = __webpack_require__(34)(false)
  , IE_PROTO     = __webpack_require__(19)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7)
  , toLength  = __webpack_require__(29)
  , toIndex   = __webpack_require__(35);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(426),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/core/components/mdInkRipple/mdInkRipple.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdInkRipple.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62c1a2f0", Component.options)
  } else {
    hotAPI.reload("data-v-62c1a2f0", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(201),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/core/components/mdTheme/mdTheme.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78f39aae", Component.options)
  } else {
    hotAPI.reload("data-v-78f39aae", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.mounted || !_vm.disabled) ? _c('div', {
    staticClass: "md-ink-ripple"
  }, [_c('div', {
    ref: "ripple",
    staticClass: "md-ripple",
    class: _vm.classes,
    style: (_vm.styles)
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62c1a2f0", module.exports)
  }
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(4).Object.keys;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(16)
  , core    = __webpack_require__(4)
  , fails   = __webpack_require__(5);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails((function(){ fn(1); })), 'Object', exp);
};

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(114);


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21)
  , $keys    = __webpack_require__(18);

__webpack_require__(47)('keys', (function(){
  return function keys(it){
    return $keys(toObject(it));
  };
}));

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(26)
  , defined = __webpack_require__(14);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(30)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ })

/******/ });
}));