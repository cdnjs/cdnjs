module.exports =
/******/ (function(modules) { // webpackBootstrap
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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 214);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 120:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(120)

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(191)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },

/***/ 191:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('x-cell', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: (doCloseActive),
      expression: "doCloseActive"
    }],
    staticClass: "mint-field",
    class: [{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }],
    attrs: {
      "title": label
    }
  }, [(type === 'textarea') ? _h('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (currentValue),
      expression: "currentValue"
    }],
    ref: "textarea",
    staticClass: "mint-field-core",
    attrs: {
      "placeholder": placeholder,
      "rows": rows,
      "disabled": disabled,
      "readonly": readonly
    },
    domProps: {
      "value": _s(currentValue)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        currentValue = $event.target.value
      }
    }
  }) : _h('input', {
    ref: "input",
    staticClass: "mint-field-core",
    attrs: {
      "placeholder": placeholder,
      "number": type === 'number',
      "type": type,
      "disabled": disabled,
      "readonly": readonly
    },
    domProps: {
      "value": currentValue
    },
    on: {
      "focus": function($event) {
        active = true
      },
      "input": handleInput
    }
  }), " ", " ", (!disableClear) ? _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (currentValue && type !== 'textarea' && active),
      expression: "currentValue && type !== 'textarea' && active"
    }],
    staticClass: "mint-field-clear",
    on: {
      "click": handleClear
    }
  }, [_m(0)]) : _e(), " ", (state) ? _h('span', {
    staticClass: "mint-field-state",
    class: ['is-' + state]
  }, [_h('i', {
    staticClass: "mintui",
    class: ['mintui-field-' + state]
  })]) : _e(), " ", _h('div', {
    staticClass: "mint-field-other"
  }, [_t("default")])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "mintui mintui-field-error"
  })
}}]}

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_field_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_field_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_field_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_field_vue___default.a;


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_clickoutside__ = __webpack_require__(9);
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
//
//
//



if (true) {
  __webpack_require__(1);
}

/**
 * mt-field
 * @desc 编辑器，依赖 cell
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 * <mt-field v-model="value" label="用户名"></mt-field>
 * <mt-field v-model="value" label="密码" placeholder="请输入密码"></mt-field>
 * <mt-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
 * <mt-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></mt-field>
 */
/* harmony default export */ exports["default"] = {
  name: 'mt-field',

  data: function data() {
    return {
      active: false,
      currentValue: this.value
    };
  },

  directives: {
    Clickoutside: __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_clickoutside__["a" /* default */]
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    rows: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    state: {
      type: String,
      default: 'default'
    },
    value: {},
    attr: Object
  },

  components: { XCell: __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js___default.a },

  methods: {
    doCloseActive: function doCloseActive() {
      this.active = false;
    },

    handleInput: function handleInput(evt) {
      this.currentValue = evt.target.value;
    },

    handleClear: function handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = '';
    }
  },

  watch: {
    value: function value(val) {
      this.currentValue = val;
    },

    currentValue: function currentValue(val) {
      this.$emit('input', val);
    },

    attr: {
      immediate: true,
      handler: function handler(attrs) {
        var this$1 = this;

        this.$nextTick(function () {
          var target = [this$1.$refs.input, this$1.$refs.textarea];
          target.forEach(function (el) {
            if (!el || !attrs) return;
            Object.keys(attrs).map(function (name) { return el.setAttribute(name, attrs[name]); });
          });
        });
      }
    }
  }
};


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
var clickoutsideContext = '@@clickoutsideContext';

/* harmony default export */ exports["a"] = {
  bind: function bind(el, binding, vnode) {
    var documentHandler = function(e) {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[clickoutsideContext].methodName]();
      }
    };
    el[clickoutsideContext] = {
      documentHandler: documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    };
    document.addEventListener(el[clickoutsideContext].arg, documentHandler);
  },

  update: function update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression;
  },

  unbind: function unbind(el) {
    document.removeEventListener(
      el[clickoutsideContext].arg,
      el[clickoutsideContext].documentHandler);
  },

  install: function install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    });
  }
};


/***/ }

/******/ });