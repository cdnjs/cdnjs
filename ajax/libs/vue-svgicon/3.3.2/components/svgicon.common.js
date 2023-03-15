module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0d780e6f-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SvgIcon.vue?vue&type=template&id=b14dbbd2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{class:_vm.clazz,style:(_vm.style),attrs:{"version":"1.1","viewBox":_vm.box},domProps:{"innerHTML":_vm._s(_vm.path)},on:{"click":_vm.onClick}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SvgIcon.vue?vue&type=template&id=b14dbbd2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SvgIcon.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
var icons = {};
var notLoadedIcons = [];
var defaultWidth = '';
var defaultHeight = '';
var classPrefix = 'svg';
var isStroke = false;
var isOriginalDefault = false;
/* harmony default export */ var SvgIconvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loaded: false
    };
  },
  props: {
    icon: String,
    name: String,
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    scale: String,
    dir: String,
    fill: {
      type: Boolean,
      default: function _default() {
        return !isStroke;
      }
    },
    color: String,
    original: {
      type: Boolean,
      default: function _default() {
        return isOriginalDefault;
      }
    },
    title: String
  },
  computed: {
    clazz: function clazz() {
      var clazz = "".concat(classPrefix, "-icon");

      if (this.fill) {
        clazz += " ".concat(classPrefix, "-fill");
      }

      if (this.dir) {
        clazz += " ".concat(classPrefix, "-").concat(this.dir);
      }

      return clazz;
    },
    iconName: function iconName() {
      return this.name || this.icon;
    },
    iconData: function iconData() {
      var iconData = icons[this.iconName];

      if (iconData || this.loaded) {
        return iconData;
      }

      return null;
    },
    colors: function colors() {
      if (this.color) {
        return this.color.split(' ');
      }

      return [];
    },
    path: function path() {
      var pathData = '';

      if (this.iconData) {
        pathData = this.iconData.data;
        pathData = this.setTitle(pathData); // use original color

        if (this.original) {
          pathData = this.addOriginalColor(pathData);
        }

        if (this.colors.length > 0) {
          pathData = this.addColor(pathData);
        }
      } else {
        // if no iconData, push to notLoadedIcons
        notLoadedIcons.push({
          name: this.iconName,
          component: this
        });
      }

      return this.getValidPathData(pathData);
    },
    box: function box() {
      var width = this.width || 16;
      var height = this.width || 16;

      if (this.iconData) {
        if (this.iconData.viewBox) {
          return this.iconData.viewBox;
        }

        return "0 0 ".concat(this.iconData.width, " ").concat(this.iconData.height);
      }

      return "0 0 ".concat(parseFloat(width), " ").concat(parseFloat(height));
    },
    style: function style() {
      var digitReg = /^\d+$/;
      var scale = Number(this.scale);
      var width;
      var height; // apply scale

      if (!isNaN(scale) && this.iconData) {
        width = Number(this.iconData.width) * scale + 'px';
        height = Number(this.iconData.height) * scale + 'px';
      } else {
        width = digitReg.test(this.width) ? this.width + 'px' : this.width || defaultWidth;
        height = digitReg.test(this.height) ? this.height + 'px' : this.height || defaultWidth;
      }

      var style = {};

      if (width) {
        style.width = width;
      }

      if (height) {
        style.height = height;
      }

      return style;
    }
  },
  created: function created() {
    if (icons[this.iconName]) {
      this.loaded = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    var _this = this;

    var index = notLoadedIcons.findIndex(function (v) {
      return v.name === _this.iconName;
    });

    if (index >= 0) {
      notLoadedIcons.splice(index, 1);
    }
  },
  methods: {
    addColor: function addColor(data) {
      var _this2 = this;

      var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi;
      var i = 0;
      return data.replace(reg, function (match) {
        var color = _this2.colors[i++] || _this2.colors[_this2.colors.length - 1];
        var fill = _this2.fill; // if color is '_', ignore it

        if (color && color === '_') {
          return match;
        } // if color start with 'r-', reverse the fill value


        if (color && /^r-/.test(color)) {
          fill = !fill; // color = color.split('r-')[1]

          color = color.substr(2);
        }

        var style = fill ? 'fill' : 'stroke';
        var reverseStyle = fill ? 'stroke' : 'fill';
        return match + "".concat(style, "=\"").concat(color, "\" ").concat(reverseStyle, "=\"none\" ");
      });
    },
    addOriginalColor: function addOriginalColor(data) {
      var styleReg = /_fill="|_stroke="/gi;
      return data.replace(styleReg, function (styleName) {
        return styleName && styleName.slice(1);
      });
    },
    getValidPathData: function getValidPathData(pathData) {
      // If use original and colors, clear double fill or stroke
      if (this.original && this.colors.length > 0) {
        var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)(\sfill|\sstroke)([="\w\s\.\-\+#\$\&>]+)(fill|stroke)/gi;
        pathData = pathData.replace(reg, function (match, p1, p2, p3, p4) {
          return "<".concat(p1).concat(p2).concat(p3, "_").concat(p4);
        });
      }

      return pathData;
    },
    setTitle: function setTitle(pathData) {
      if (this.title) {
        var title = this.title.replace(/\</gi, '&lt;').replace(/>/gi, '&gt;').replace(/&/g, '&amp;');
        return "<title>".concat(title, "</title>") + pathData;
      }

      return pathData;
    },
    onClick: function onClick(e) {
      this.$emit('click', e);
    }
  },
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var tagName = options.tagName || 'svgicon';

    if (options.classPrefix) {
      classPrefix = options.classPrefix;
    }

    isStroke = !!options.isStroke;
    isOriginalDefault = !!options.isOriginalDefault; // default size

    options.defaultWidth && (defaultWidth = options.defaultWidth);
    options.defaultHeight && (defaultHeight = options.defaultHeight);
    Vue.component(tagName, this);
  },
  // register icons
  register: function register(data) {
    var _loop = function _loop(name) {
      if (!icons[name]) {
        icons[name] = data[name];
      } // check new register icon is not loaded, and set loaded to true


      notLoadedIcons = notLoadedIcons.filter(function (v, ix) {
        if (v.name === name) {
          v.component.$set(v.component, 'loaded', true);
        }

        return v.name !== name;
      });
    };

    for (var name in data) {
      _loop(name);
    }
  },
  icons: icons
});
// CONCATENATED MODULE: ./src/components/SvgIcon.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SvgIconvue_type_script_lang_js_ = (SvgIconvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/SvgIcon.vue





/* normalize component */

var component = normalizeComponent(
  components_SvgIconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SvgIcon = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (SvgIcon);



/***/ })

/******/ })["default"];
//# sourceMappingURL=svgicon.common.js.map