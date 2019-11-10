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
/******/ 	return __webpack_require__(__webpack_require__.s = 223);
/******/ })
/************************************************************************/
/******/ ({

/***/ 121:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 122:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(121)
__webpack_require__(122)

/* script */
__vue_exports__ = __webpack_require__(63)

/* template */
var __vue_template__ = __webpack_require__(192)
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

/***/ 192:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "mint-msgbox-wrapper"
  }, [_h('transition', {
    attrs: {
      "name": "msgbox-bounce"
    }
  }, [_h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (value),
      expression: "value"
    }],
    staticClass: "mint-msgbox"
  }, [(title !== '') ? _h('div', {
    staticClass: "mint-msgbox-header"
  }, [_h('div', {
    staticClass: "mint-msgbox-title"
  }, [_s(title)])]) : _e(), " ", (message !== '') ? _h('div', {
    staticClass: "mint-msgbox-content"
  }, [_h('div', {
    staticClass: "mint-msgbox-message"
  }, [_h('p', [_s(message)])]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (showInput),
      expression: "showInput"
    }],
    staticClass: "mint-msgbox-input"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (inputValue),
      expression: "inputValue"
    }],
    ref: "input",
    attrs: {
      "placeholder": inputPlaceholder
    },
    domProps: {
      "value": _s(inputValue)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        inputValue = $event.target.value
      }
    }
  }), " ", _h('div', {
    staticClass: "mint-msgbox-errormsg",
    style: ({
      visibility: !!editorErrorMessage ? 'visible' : 'hidden'
    })
  }, [_s(editorErrorMessage)])])]) : _e(), " ", _h('div', {
    staticClass: "mint-msgbox-btns"
  }, [_h('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (showCancelButton),
      expression: "showCancelButton"
    }],
    class: [cancelButtonClasses],
    on: {
      "click": function($event) {
        handleAction('cancel')
      }
    }
  }, [_s(cancelButtonText)]), " ", _h('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (showConfirmButton),
      expression: "showConfirmButton"
    }],
    class: [confirmButtonClasses],
    on: {
      "click": function($event) {
        handleAction('confirm')
      }
    }
  }, [_s(confirmButtonText)])])])])])
}},staticRenderFns: []}

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_message_box_js__ = __webpack_require__(88);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_message_box_js__["a" /* default */];


/***/ },

/***/ 5:
/***/ function(module, exports) {

module.exports = require("vue-popup");

/***/ },

/***/ 6:
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_popup__);
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
//
//
//
//
//

var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';



/* harmony default export */ exports["default"] = {
  mixins: [ __WEBPACK_IMPORTED_MODULE_0_vue_popup___default.a ],

  props: {
    modal: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    confirmButtonClasses: function confirmButtonClasses() {
      var classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass;
      if (this.confirmButtonHighlight) {
        classes += ' mint-msgbox-confirm-highlight';
      }
      return classes;
    },
    cancelButtonClasses: function cancelButtonClasses() {
      var classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass;
      if (this.cancelButtonHighlight) {
        classes += ' mint-msgbox-cancel-highlight';
      }
      return classes;
    }
  },

  methods: {
    doClose: function doClose() {
      var this$1 = this;

      this.value = false;
      this._closing = true;

      this.onClose && this.onClose();

      setTimeout(function () {
        if (this$1.modal && this$1.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this$1.bodyOverflow;
          document.body.style.paddingRight = this$1.bodyPaddingRight;
        }
        this$1.bodyOverflow = null;
        this$1.bodyPaddingRight = null;
      }, 200);
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    handleAction: function handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      var callback = this.callback;
      this.value = false;
      callback(action);
    },

    validate: function validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
          this.$refs.input.classList.add('invalid');
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      this.$refs.input.classList.remove('invalid');
      return true;
    },

    handleInputType: function handleInputType(val) {
      if (val === 'range' || !this.$refs.input) return;
      this.$refs.input.type = val;
    }
  },

  watch: {
    inputValue: function inputValue() {
      if (this.$type === 'prompt') {
        this.validate();
      }
    },

    value: function value(val) {
      var this$1 = this;

      this.handleInputType(this.inputType);
      if (val && this.$type === 'prompt') {
        setTimeout(function () {
          if (this$1.$refs.input) {
            this$1.$refs.input.focus();
          }
        }, 500);
      }
    },

    inputType: function inputType(val) {
      this.handleInputType(val);
    }
  },

  data: function data() {
    return {
      title: '',
      message: '',
      type: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null
    };
  }
};


/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_box_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__message_box_vue__);
/* unused harmony export MessageBox */
var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var defaults = {
  title: '提示',
  message: '',
  type: '',
  showInput: false,
  showClose: true,
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  inputValue: null,
  inputPlaceholder: '',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: ''
};




var merge = function(target) {
  var arguments$1 = arguments;

  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments$1[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

var MessageBoxConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__message_box_vue___default.a);

var currentMsg, instance;
var msgQueue = [];

var initInstance = function() {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });

  instance.callback = function(action) {
    if (currentMsg) {
      var callback = currentMsg.callback;
      if (typeof callback === 'function') {
        if (instance.showInput) {
          callback(instance.inputValue, action);
        } else {
          callback(action);
        }
      }
      if (currentMsg.resolve) {
        var $type = currentMsg.options.$type;
        if ($type === 'confirm' || $type === 'prompt') {
          if (action === 'confirm') {
            if (instance.showInput) {
              currentMsg.resolve({ value: instance.inputValue, action: action });
            } else {
              currentMsg.resolve(action);
            }
          } else if (action === 'cancel' && currentMsg.reject) {
            currentMsg.reject(action);
          }
        } else {
          currentMsg.resolve(action);
        }
      }
    }
  };
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }

  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(function (prop) {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);

      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.nextTick(function () {
        instance.value = true;
      });
    }
  }
};

var MessageBox = function(options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, MessageBox.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, MessageBox.defaults || {}, options),
      callback: callback
    });

    showNextMsg();
  }
};

MessageBox.setDefaults = function(defaults) {
  MessageBox.defaults = defaults;
};

MessageBox.alert = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

MessageBox.confirm = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};

MessageBox.prompt = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true,
    $type: 'prompt'
  }, options));
};

MessageBox.close = function() {
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

/* harmony default export */ exports["a"] = MessageBox;



/***/ }

/******/ });