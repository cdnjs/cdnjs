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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(115);


/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = require("vue-popup");

/***/ },

/***/ 86:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(116);

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _src = __webpack_require__(117);

	var _src2 = _interopRequireDefault(_src);

	__webpack_require__(125);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _src2.default;

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MessageBox = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _vue = __webpack_require__(86);

	var _vue2 = _interopRequireDefault(_vue);

	var _msgbox = __webpack_require__(118);

	var _msgbox2 = _interopRequireDefault(_msgbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';

	var defaults = {
	  title: '',
	  message: '',
	  type: '',
	  inputType: 'text',
	  showInput: false,
	  lockScroll: false,
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

	var merge = function merge(target) {
	  for (var i = 1, j = arguments.length; i < j; i++) {
	    var source = arguments[i];
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

	var MessageBoxConstructor = _vue2.default.extend(_msgbox2.default);

	var currentMsg, instance;
	var msgQueue = [];

	var defaultCallback = function defaultCallback(action) {
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

	var initInstance = function initInstance() {
	  instance = new MessageBoxConstructor({
	    el: document.createElement('div')
	  });

	  instance.callback = defaultCallback;
	};

	var showNextMsg = function showNextMsg() {
	  if (!instance) {
	    initInstance();
	  }

	  if (!instance.visible || instance.closeTimer) {
	    if (msgQueue.length > 0) {
	      currentMsg = msgQueue.shift();

	      var options = currentMsg.options;
	      for (var prop in options) {
	        if (options.hasOwnProperty(prop)) {
	          instance[prop] = options[prop];
	        }
	      }
	      if (options.callback === undefined) {
	        instance.callback = defaultCallback;
	      }
	      instance.$appendTo(document.body);

	      _vue2.default.nextTick(function () {
	        instance.visible = true;
	      });
	    }
	  }
	};

	var MessageBox = function MessageBox(options, callback) {
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
	    return new Promise(function (resolve, reject) {
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

	MessageBox.setDefaults = function (defaults) {
	  MessageBox.defaults = defaults;
	};

	MessageBox.alert = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    $type: 'alert'
	  }, options));
	};

	MessageBox.confirm = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
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

	MessageBox.prompt = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
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

	MessageBox.close = function () {
	  instance.visible = false;
	  msgQueue = [];
	  currentMsg = null;
	};

	exports.default = MessageBox;
	exports.MessageBox = MessageBox;

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(119)
	__webpack_require__(121)
	__vue_script__ = __webpack_require__(123)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vue-msgbox/src/msgbox.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(124)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 119:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 121:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vuePopup = __webpack_require__(8);

	var _vuePopup2 = _interopRequireDefault(_vuePopup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <div class="msgbox-wrapper">
	//     <div class="msgbox" v-if="rendered" v-show="visible" transition="pop-bounce">
	//       <div class="msgbox-header" v-if="title !== ''">
	//         <div class="msgbox-title">{{ title }}</div>
	//         <!--<div class="msgbox-close d-icon icon-close" @click="handleAction('close')"></div>-->
	//       </div>
	//       <div class="msgbox-content" v-if="message !== ''">
	//         <div class="msgbox-status d-icon {{ type ? 'icon-' + type : '' }}"></div>
	//         <div class="msgbox-message">{{{ message }}}</div>
	//         <div class="msgbox-input" v-show="showInput">
	//           <input :type="inputType" v-model="inputValue" :placeholder="inputPlaceholder" v-el:input />
	//           <div class="msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{editorErrorMessage}}</div>
	//         </div>
	//       </div>
	//       <div class="msgbox-btns" :class="{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }">
	//         <button class="{{ cancelButtonClasses }}" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
	//         <button class="{{ confirmButtonClasses }}" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <style>
	//   .msgbox {
	//     position: fixed;
	//     top: 50%;
	//     left: 50%;
	//     -webkit-transform: translate3d(-50%, -50%, 0);
	//     transform: translate3d(-50%, -50%, 0);
	//     background-color: #fff;
	//     width: 85%;
	//     border-radius: 3px;
	//     font-size: 16px;
	//     -webkit-user-select: none;
	//     overflow: hidden;
	//     opacity: 1;
	//     backface-visibility: hidden;
	//   }
	//
	//   .msgbox-header{
	//     padding: 15px 20px 5px 10px;
	//     border-bottom: 1px solid #ddd;
	//   }
	//
	//   .msgbox-content {
	//     padding: 10px 20px;
	//     min-height: 36px;
	//     position: relative;
	//     border-bottom: 1px solid #ddd;
	//   }
	//
	//   .msgbox-close {
	//     display: inline-block;
	//     position: absolute;
	//     top: 14px;
	//     right: 15px;
	//     width: 20px;
	//     height: 20px;
	//     cursor: pointer;
	//     line-height: 20px;
	//     text-align: center;
	//   }
	//
	//   .msgbox-input > input {
	//     border: 1px solid #dedede;
	//     border-radius: 5px;
	//     padding: 4px 5px;
	//     width: 100%;
	//     -webkit-appearance: none;
	//     -moz-appearance: none;
	//     appearance: none;
	//     outline: none;
	//   }
	//
	//   .msgbox-errormsg {
	//     color: red;
	//     font-size: 12px;
	//     min-height: 16px;
	//   }
	//
	//   .msgbox-title {
	//     padding-left: 10px;
	//     font-size: 16px;
	//     font-weight: bold;
	//     color: #333;
	//     margin-bottom: 8px;
	//   }
	//
	//   .msgbox-status {
	//     float: left;
	//     width: 36px;
	//     height: 36px;
	//     font-size: 36px !important;
	//   }
	//
	//   .msgbox-status.icon-success {
	//     color: #94c852;
	//   }
	//
	//   .msgbox-status.icon-warning {
	//     color: #ff9c00;
	//   }
	//
	//   .msgbox-status.icon-error {
	//     color: #ff4248;
	//   }
	//
	//   .msgbox-message {
	//     color: #333;
	//     font-size: 16px;
	//     line-height: 36px;
	//     margin-left: 36px;
	//     margin-right: 36px;
	//     text-align: center;
	//   }
	//
	//   .msgbox-btns {
	//     display: flex;
	//     height: 40px;
	//     line-height: 40px;
	//     text-align: center;
	//     font-size: 16px;
	//   }
	//
	//   .msgbox-btn {
	//     display: block;
	//     background-color: #fff;
	//     border: 0;
	//     flex: 1;
	//     margin: 0;
	//     border-radius: 0;
	//   }
	//
	//   .msgbox-btn:active {
	//     background-color: #3492e9;
	//     color: #fff;
	//     outline: none;
	//   }
	//
	//   .msgbox-btn:focus {
	//     outline: none;
	//   }
	//
	//   .msgbox-confirm {
	//     width: 50%;
	//   }
	//
	//   .msgbox-cancel {
	//     width: 50%;
	//     border-right: 1px solid #ddd;
	//   }
	//
	//   .msgbox-confirm-highlight,
	//   .msgbox-cancel-highlight {
	//     font-weight: 800;
	//   }
	//
	//   .msgbox-btns-reverse {
	//     -webkit-box-direction: reverse;
	//   }
	//
	//   .msgbox-btns-reverse .msgbox-confirm {
	//     border-right: 1px solid #ddd;
	//   }
	//
	//   .msgbox-btns-reverse .msgbox-cancel {
	//     border-right: 0;
	//   }
	//
	//   .pop-bounce-transition {
	//     transition: .2s .1s;
	//   }
	//
	//   .pop-bounce-enter {
	//     opacity: 0;
	//     transform: translate3d(-50%, -50%, 0) scale(0.7);
	//   }
	//
	//   .pop-bounce-leave {
	//     opacity: 0;
	//     transform: translate3d(-50%, -50%, 0) scale(0.9);
	//   }
	// </style>
	// <style src="vue-popup/lib/popup.css"></style>
	//
	// <script type="text/ecmascript-6" lang="babel">
	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';

	exports.default = {
	  mixins: [_vuePopup2.default],

	  props: {
	    modal: {
	      default: true
	    },
	    lockScroll: {
	      default: false
	    },
	    closeOnPressEscape: {
	      default: true
	    }
	  },

	  computed: {
	    confirmButtonClasses: function confirmButtonClasses() {
	      var classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
	      if (this.confirmButtonHighlight) {
	        classes += ' msgbox-confirm-highlight';
	      }
	      return classes;
	    },
	    cancelButtonClasses: function cancelButtonClasses() {
	      var classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
	      if (this.cancelButtonHighlight) {
	        classes += ' msgbox-cancel-highlight';
	      }
	      return classes;
	    }
	  },

	  methods: {
	    handleAction: function handleAction(action) {
	      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
	        return;
	      }
	      var callback = this.callback;
	      this.visible = false;
	      callback(action);
	    },
	    validate: function validate() {
	      if (this.$type === 'prompt') {
	        var inputPattern = this.inputPattern;
	        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
	          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	          return false;
	        }
	        var inputValidator = this.inputValidator;
	        if (typeof inputValidator === 'function') {
	          var validateResult = inputValidator(this.inputValue);
	          if (validateResult === false) {
	            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	            return false;
	          }
	          if (typeof validateResult === 'string') {
	            this.editorErrorMessage = validateResult;
	            return false;
	          }
	        }
	      }
	      this.editorErrorMessage = '';
	      return true;
	    }
	  },

	  watch: {
	    inputValue: function inputValue() {
	      if (this.$type === 'prompt') {
	        this.validate();
	      }
	    },
	    visible: function visible(val) {
	      var _this = this;

	      if (val && this.$type === 'prompt') {
	        setTimeout(function () {
	          if (_this.$els.input) {
	            _this.$els.input.focus();
	          }
	        }, 500);
	      }
	    }
	  },

	  data: function data() {
	    return {
	      title: '',
	      message: '',
	      type: '',
	      showInput: false,
	      inputValue: null,
	      inputType: 'text',
	      inputPlaceholder: '',
	      inputPattern: null,
	      inputValidator: null,
	      inputErrorMessage: '',
	      showConfirmButton: true,
	      showCancelButton: false,
	      confirmButtonText: CONFIRM_TEXT,
	      cancelButtonText: CANCEL_TEXT,
	      confirmButtonPosition: 'right',
	      confirmButtonHighlight: false,
	      confirmButtonClass: '',
	      confirmButtonDisabled: false,
	      cancelButtonClass: '',
	      cancelButtonHighlight: false,

	      editorErrorMessage: null,
	      callback: null
	    };
	  }
	};
	// </script>

/***/ },

/***/ 124:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"msgbox-wrapper\">\n  <div class=\"msgbox\" v-if=\"rendered\" v-show=\"visible\" transition=\"pop-bounce\">\n    <div class=\"msgbox-header\" v-if=\"title !== ''\">\n      <div class=\"msgbox-title\">{{ title }}</div>\n      <!--<div class=\"msgbox-close d-icon icon-close\" @click=\"handleAction('close')\"></div>-->\n    </div>\n    <div class=\"msgbox-content\" v-if=\"message !== ''\">\n      <div class=\"msgbox-status d-icon {{ type ? 'icon-' + type : '' }}\"></div>\n      <div class=\"msgbox-message\">{{{ message }}}</div>\n      <div class=\"msgbox-input\" v-show=\"showInput\">\n        <input :type=\"inputType\" v-model=\"inputValue\" :placeholder=\"inputPlaceholder\" v-el:input />\n        <div class=\"msgbox-errormsg\" :style=\"{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }\">{{editorErrorMessage}}</div>\n      </div>\n    </div>\n    <div class=\"msgbox-btns\" :class=\"{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }\">\n      <button class=\"{{ cancelButtonClasses }}\" v-show=\"showCancelButton\" @click=\"handleAction('cancel')\">{{ cancelButtonText }}</button>\n      <button class=\"{{ confirmButtonClasses }}\" v-show=\"showConfirmButton\" @click=\"handleAction('confirm')\">{{ confirmButtonText }}</button>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 125:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });