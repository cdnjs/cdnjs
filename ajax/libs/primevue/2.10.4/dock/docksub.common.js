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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d94e389a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/dock/DockSub.vue?vue&type=template&id=77d6d77e
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "p-dock-list-container"
  }, [_c('ul', {
    ref: "list",
    staticClass: "p-dock-list",
    attrs: {
      "role": "menu"
    },
    on: {
      "mouseleave": _vm.onListMouseLeave
    }
  }, _vm._l(_vm.model, function (item, index) {
    return _c('li', {
      key: index,
      class: _vm.itemClass(index),
      attrs: {
        "role": "none"
      },
      on: {
        "mouseenter": function mouseenter($event) {
          return _vm.onItemMouseEnter(index);
        }
      }
    }, [_vm.templates['item'] ? _c('DockSubTemplate', {
      attrs: {
        "item": item,
        "template": _vm.templates['item']
      }
    }) : [item.to && !_vm.disabled(item) ? _c('router-link', {
      attrs: {
        "to": item.to,
        "custom": ""
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(_ref) {
          var navigate = _ref.navigate,
            href = _ref.href,
            isActive = _ref.isActive,
            isExactActive = _ref.isExactActive;
          return [_c('a', {
            directives: [{
              name: "tooltip",
              rawName: "v-tooltip:[tooltipOptions]",
              value: {
                value: item.label,
                disabled: !_vm.tooltipOptions
              },
              expression: "{value: item.label, disabled: !tooltipOptions}",
              arg: _vm.tooltipOptions
            }],
            class: _vm.linkClass(item, {
              isActive: isActive,
              isExactActive: isExactActive
            }),
            attrs: {
              "href": href,
              "role": "menuitem",
              "target": item.target
            },
            on: {
              "click": function click($event) {
                return _vm.onItemClick($event, item, navigate);
              }
            }
          }, [typeof item.icon === 'string' ? [_c('span', {
            directives: [{
              name: "ripple",
              rawName: "v-ripple"
            }],
            class: ['p-dock-action-icon', item.icon]
          })] : _c('DockSubIconTemplate', {
            attrs: {
              "icon": item.icon
            }
          })], 2)];
        }
      }], null, true)
    }) : _c('a', {
      directives: [{
        name: "tooltip",
        rawName: "v-tooltip:[tooltipOptions]",
        value: {
          value: item.label,
          disabled: !_vm.tooltipOptions
        },
        expression: "{value: item.label, disabled: !tooltipOptions}",
        arg: _vm.tooltipOptions
      }],
      class: _vm.linkClass(item),
      attrs: {
        "href": item.url,
        "role": "menuitem",
        "target": item.target,
        "tabindex": _vm.disabled(item) ? null : '0'
      },
      on: {
        "click": function click($event) {
          return _vm.onItemClick($event, item);
        }
      }
    }, [typeof item.icon === 'string' ? [_c('span', {
      directives: [{
        name: "ripple",
        rawName: "v-ripple"
      }],
      class: ['p-dock-action-icon', item.icon]
    })] : _c('DockSubIconTemplate', {
      attrs: {
        "icon": item.icon
      }
    })], 2)]], 2);
  }), 0)]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/dock/DockSub.vue?vue&type=template&id=77d6d77e

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/dock/DockSub.vue?vue&type=script&lang=js
var DockSubIconTemplate = {
  functional: true,
  props: {
    icon: {
      type: null,
      default: null
    }
  },
  render: function render(createElement, context) {
    return [context.props['icon']()];
  }
};
var DockSubTemplate = {
  functional: true,
  props: {
    item: {
      type: null,
      default: null
    },
    template: {
      type: null,
      default: null
    }
  },
  render: function render(createElement, context) {
    var content = context.props.template({
      'item': context.props.item
    });
    return [content];
  }
};
/* harmony default export */ var DockSubvue_type_script_lang_js = ({
  name: 'DockSub',
  props: {
    model: {
      type: Array,
      default: null
    },
    templates: {
      type: null,
      default: null
    },
    tooltipOptions: null,
    exact: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      currentIndex: -3
    };
  },
  methods: {
    onListMouseLeave: function onListMouseLeave() {
      this.currentIndex = -3;
    },
    onItemMouseEnter: function onItemMouseEnter(index) {
      this.currentIndex = index;
    },
    onItemClick: function onItemClick(event, item) {
      if (this.disabled(item)) {
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      event.preventDefault();
    },
    itemClass: function itemClass(index) {
      return ['p-dock-item', {
        'p-dock-item-second-prev': this.currentIndex - 2 === index,
        'p-dock-item-prev': this.currentIndex - 1 === index,
        'p-dock-item-current': this.currentIndex === index,
        'p-dock-item-next': this.currentIndex + 1 === index,
        'p-dock-item-second-next': this.currentIndex + 2 === index
      }];
    },
    linkClass: function linkClass(item, routerProps) {
      return ['p-dock-action', {
        'p-disabled': this.disabled(item),
        'router-link-active': routerProps && routerProps.isActive,
        'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
      }];
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }
  },
  components: {
    'DockSubIconTemplate': DockSubIconTemplate,
    'DockSubTemplate': DockSubTemplate
  }
});
// CONCATENATED MODULE: ./src/components/dock/DockSub.vue?vue&type=script&lang=js
 /* harmony default export */ var dock_DockSubvue_type_script_lang_js = (DockSubvue_type_script_lang_js); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

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
  if (moduleIdentifier) {
    // server build
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
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/dock/DockSub.vue





/* normalize component */

var component = normalizeComponent(
  dock_DockSubvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DockSub = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (DockSub);



/***/ })

/******/ })["default"];