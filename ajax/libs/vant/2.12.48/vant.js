(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("vant", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["vant"] = factory(require("vue"));
	else
		root["vant"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return inBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isEmpty; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);



var inBrowser = typeof window !== 'undefined';
var isServer = vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$isServer; // eslint-disable-next-line @typescript-eslint/no-empty-function

function noop() {}
function isDef(val) {
  return val !== undefined && val !== null;
}
function isFunction(val) {
  return typeof val === 'function';
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    var _result$key;

    result = (_result$key = result[key]) != null ? _result$key : '';
  });
  return result;
}
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
 * @function isEmpty
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

  if (typeof value !== 'object') {
    return true;
  }

  return Object.keys(value).length === 0;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _extends() {
  return _extends = Object.assign || function (a) {
    for (var b, c = 1; c < arguments.length; c++) {
      for (var d in b = arguments[c], b) {
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
      }
    }

    return a;
  }, _extends.apply(this, arguments);
}

var normalMerge = ["attrs", "props", "domProps"],
    toArrayMerge = ["class", "style", "directives"],
    functionalMerge = ["on", "nativeOn"],
    mergeJsxProps = function mergeJsxProps(a) {
  return a.reduce(function (c, a) {
    for (var b in a) {
      if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]],
            e = a[b] instanceof Array ? a[b] : [a[b]];
        c[b] = d.concat(e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a[b]) {
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
            c[b][f] = g.concat(h);
          } else c[b][f] = a[b][f];
        }
      } else if ("hook" == b) for (var i in a[b]) {
        c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
      } else c[b] = a[b];
    }

    return c;
  }, {});
},
    mergeFn = function mergeFn(a, b) {
  return function () {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
};

module.exports = mergeJsxProps;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return padZero; });
var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }

  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return doubleRaf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cancelRaf; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/**
 * requestAnimationFrame polyfill
 */

var prev = Date.now();
/* istanbul ignore next */

function fallback(fn) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}
/* istanbul ignore next */


var root = ___WEBPACK_IMPORTED_MODULE_0__[/* isServer */ "h"] ? global : window;
/* istanbul ignore next */

var iRaf = root.requestAnimationFrame || fallback;
/* istanbul ignore next */

var iCancel = root.cancelAnimationFrame || root.clearTimeout;
function raf(fn) {
  return iRaf.call(root, fn);
} // double raf for animation

function doubleRaf(fn) {
  raf(function () {
    raf(fn);
  });
}
function cancelRaf(id) {
  iCancel.call(root, id);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isNaN; });
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  } // eslint-disable-next-line no-self-compare


  return val !== val;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return unitToPx; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _validate_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function addUnit(value) {
  if (!Object(___WEBPACK_IMPORTED_MODULE_0__[/* isDef */ "c"])(value)) {
    return undefined;
  }

  value = String(value);
  return Object(_validate_number__WEBPACK_IMPORTED_MODULE_1__[/* isNumeric */ "b"])(value) ? value + "px" : value;
} // cache

var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return +value * window.innerWidth / 100;
}

function convertVh(value) {
  value = value.replace(/vh/g, '');
  return +value * window.innerHeight / 100;
}

function unitToPx(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (___WEBPACK_IMPORTED_MODULE_0__[/* inBrowser */ "b"]) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }

    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }

    if (value.indexOf('vh') !== -1) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(3);
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default = /*#__PURE__*/__webpack_require__.n(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_);

// EXTERNAL MODULE: ./es/utils/index.js
var utils = __webpack_require__(0);

// CONCATENATED MODULE: ./es/utils/deep-assign.js

var deep_assign_hasOwnProperty = Object.prototype.hasOwnProperty;

function assignKey(to, from, key) {
  var val = from[key];

  if (!Object(utils["c" /* isDef */])(val)) {
    return;
  }

  if (!deep_assign_hasOwnProperty.call(to, key) || !Object(utils["f" /* isObject */])(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

function deepAssign(to, from) {
  Object.keys(from).forEach(function (key) {
    assignKey(to, from, key);
  });
  return to;
}
// CONCATENATED MODULE: ./es/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    confirm: '确定',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929";
    }
  },
  vanCascader: {
    select: '请选择'
  },
  vanContactCard: {
    addText: '添加联系人'
  },
  vanContactList: {
    addText: '新建联系人'
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...'
  },
  vanSubmitBar: {
    label: '合计：'
  },
  vanCoupon: {
    unlimited: '无使用门槛',
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    }
  },
  vanCouponList: {
    empty: '暂无优惠券',
    exchange: '兑换',
    close: '不使用优惠券',
    enable: '可用',
    disabled: '不可用',
    placeholder: '请输入优惠码'
  },
  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: '设为默认收货地址',
    telPlaceholder: '收货人手机号',
    namePlaceholder: '收货人姓名',
    areaPlaceholder: '选择省 / 市 / 区'
  },
  vanAddressEditDetail: {
    label: '详细地址',
    placeholder: '街道门牌、楼层房间号等信息'
  },
  vanAddressList: {
    add: '新增地址'
  }
});
// CONCATENATED MODULE: ./es/locale/index.js



var proto = external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.prototype;
var defineReactive = external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.util.defineReactive;
defineReactive(proto, '$vantLang', 'zh-CN');
defineReactive(proto, '$vantMessages', {
  'zh-CN': zh_CN
});
/* harmony default export */ var locale = __webpack_exports__["a"] = ({
  messages: function messages() {
    return proto.$vantMessages[proto.$vantLang];
  },
  use: function use(lang, messages) {
    var _this$add;

    proto.$vantLang = lang;
    this.add((_this$add = {}, _this$add[lang] = messages, _this$add));
  },
  add: function add(messages) {
    if (messages === void 0) {
      messages = {};
    }

    deepAssign(proto.$vantMessages, messages);
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ createNamespace; });

// CONCATENATED MODULE: ./es/utils/create/bem.js
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function gen(name, mods) {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return " " + name + "--" + mods;
  }

  if (Array.isArray(mods)) {
    return mods.reduce(function (ret, item) {
      return ret + gen(name, item);
    }, '');
  }

  return Object.keys(mods).reduce(function (ret, key) {
    return ret + (mods[key] ? gen(name, key) : '');
  }, '');
}

function createBEM(name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
}
// EXTERNAL MODULE: ./es/utils/index.js
var utils = __webpack_require__(0);

// EXTERNAL MODULE: ./es/utils/format/string.js
var string = __webpack_require__(2);

// CONCATENATED MODULE: ./es/mixins/slots.js
/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
var SlotsMixin = {
  methods: {
    slots: function slots(name, props) {
      if (name === void 0) {
        name = 'default';
      }

      var $slots = this.$slots,
          $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];

      if (scopedSlot) {
        return scopedSlot(props);
      }

      return $slots[name];
    }
  }
};
// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(3);

// CONCATENATED MODULE: ./es/utils/create/component.js
/**
 * Create a basic component with common options
 */






function install(Vue) {
  var name = this.name;
  Vue.component(name, this);
  Vue.component(Object(string["a" /* camelize */])("-" + name), this);
} // unify slots & scopedSlots


function unifySlots(context) {
  // use data.scopedSlots in lower Vue version
  var scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  var slots = context.slots();
  Object.keys(slots).forEach(function (key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function () {
        return slots[key];
      };
    }
  });
  return scopedSlots;
} // should be removed after Vue 3

function transformFunctionComponent(pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: function render(h, context) {
      return pure(h, context.props, unifySlots(context), context);
    }
  };
}

function createComponent(name) {
  return function (sfc) {
    if (Object(utils["e" /* isFunction */])(sfc)) {
      sfc = transformFunctionComponent(sfc);
    }

    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(SlotsMixin);
    }

    sfc.name = name;
    sfc.install = install;
    return sfc;
  };
}
// EXTERNAL MODULE: ./es/locale/index.js + 2 modules
var locale = __webpack_require__(7);

// CONCATENATED MODULE: ./es/utils/create/i18n.js



function createI18N(name) {
  var prefix = Object(string["a" /* camelize */])(name) + '.';
  return function (path) {
    var messages = locale["a" /* default */].messages();
    var message = Object(utils["a" /* get */])(messages, prefix + path) || Object(utils["a" /* get */])(messages, path);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return Object(utils["e" /* isFunction */])(message) ? message.apply(void 0, args) : message;
  };
}
// CONCATENATED MODULE: ./es/utils/create/index.js



function createNamespace(name) {
  name = 'van-' + name;
  return [createComponent(name), createBEM(name), createI18N(name)];
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Vue-Lazyload.js v1.2.3
 * (c) 2018 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!function (e, t) {
   true ? module.exports = t() : undefined;
}(this, function () {
  "use strict";

  function e(e) {
    return e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
  }

  function t(e) {
    e = e || {};
    var t = arguments.length,
        i = 0;
    if (1 === t) return e;

    for (; ++i < t;) {
      var o = arguments[i];
      g(e) && (e = o), r(o) && n(e, o);
    }

    return e;
  }

  function n(e, n) {
    m(e, n);

    for (var o in n) {
      if ("__proto__" !== o && i(n, o)) {
        var a = n[o];
        r(a) ? ("undefined" === L(e[o]) && "function" === L(a) && (e[o] = a), e[o] = t(e[o] || {}, a)) : e[o] = a;
      }
    }

    return e;
  }

  function r(e) {
    return "object" === L(e) || "function" === L(e);
  }

  function i(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }

  function o(e, t) {
    if (e.length) {
      var n = e.indexOf(t);
      return n > -1 ? e.splice(n, 1) : void 0;
    }
  }

  function a(e, t) {
    for (var n = !1, r = 0, i = e.length; r < i; r++) {
      if (t(e[r])) {
        n = !0;
        break;
      }
    }

    return n;
  }

  function s(e, t) {
    if ("IMG" === e.tagName && e.getAttribute("data-srcset")) {
      var n = e.getAttribute("data-srcset"),
          r = [],
          i = e.parentNode,
          o = i.offsetWidth * t,
          a = void 0,
          s = void 0,
          u = void 0;
      n = n.trim().split(","), n.map(function (e) {
        e = e.trim(), a = e.lastIndexOf(" "), -1 === a ? (s = e, u = 999998) : (s = e.substr(0, a), u = parseInt(e.substr(a + 1, e.length - a - 2), 10)), r.push([u, s]);
      }), r.sort(function (e, t) {
        if (e[0] < t[0]) return -1;
        if (e[0] > t[0]) return 1;

        if (e[0] === t[0]) {
          if (-1 !== t[1].indexOf(".webp", t[1].length - 5)) return 1;
          if (-1 !== e[1].indexOf(".webp", e[1].length - 5)) return -1;
        }

        return 0;
      });

      for (var l = "", d = void 0, c = r.length, h = 0; h < c; h++) {
        if (d = r[h], d[0] >= o) {
          l = d[1];
          break;
        }
      }

      return l;
    }
  }

  function u(e, t) {
    for (var n = void 0, r = 0, i = e.length; r < i; r++) {
      if (t(e[r])) {
        n = e[r];
        break;
      }
    }

    return n;
  }

  function l() {
    if (!k) return !1;
    var e = !0,
        t = document;

    try {
      var n = t.createElement("object");
      n.type = "image/webp", n.style.visibility = "hidden", n.innerHTML = "!", t.body.appendChild(n), e = !n.offsetWidth, t.body.removeChild(n);
    } catch (t) {
      e = !1;
    }

    return e;
  }

  function d(e, t) {
    var n = null,
        r = 0;
    return function () {
      if (!n) {
        var i = Date.now() - r,
            o = this,
            a = arguments,
            s = function s() {
          r = Date.now(), n = !1, e.apply(o, a);
        };

        i >= t ? s() : n = setTimeout(s, t);
      }
    };
  }

  function c(e) {
    return null !== e && "object" === (void 0 === e ? "undefined" : p(e));
  }

  function h(e) {
    if (!(e instanceof Object)) return [];
    if (Object.keys) return Object.keys(e);
    var t = [];

    for (var n in e) {
      e.hasOwnProperty(n) && t.push(n);
    }

    return t;
  }

  function f(e) {
    for (var t = e.length, n = [], r = 0; r < t; r++) {
      n.push(e[r]);
    }

    return n;
  }

  function v() {}

  var p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
      b = function b(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      y = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(),
      g = function g(e) {
    return null == e || "function" != typeof e && "object" !== (void 0 === e ? "undefined" : p(e));
  },
      m = function m(e, t) {
    if (null === e || void 0 === e) throw new TypeError("expected first argument to be an object.");
    if (void 0 === t || "undefined" == typeof Symbol) return e;
    if ("function" != typeof Object.getOwnPropertySymbols) return e;

    for (var n = Object.prototype.propertyIsEnumerable, r = Object(e), i = arguments.length, o = 0; ++o < i;) {
      for (var a = Object(arguments[o]), s = Object.getOwnPropertySymbols(a), u = 0; u < s.length; u++) {
        var l = s[u];
        n.call(a, l) && (r[l] = a[l]);
      }
    }

    return r;
  },
      w = Object.prototype.toString,
      L = function L(t) {
    var n = void 0 === t ? "undefined" : p(t);
    return "undefined" === n ? "undefined" : null === t ? "null" : !0 === t || !1 === t || t instanceof Boolean ? "boolean" : "string" === n || t instanceof String ? "string" : "number" === n || t instanceof Number ? "number" : "function" === n || t instanceof Function ? void 0 !== t.constructor.name && "Generator" === t.constructor.name.slice(0, 9) ? "generatorfunction" : "function" : void 0 !== Array.isArray && Array.isArray(t) ? "array" : t instanceof RegExp ? "regexp" : t instanceof Date ? "date" : (n = w.call(t), "[object RegExp]" === n ? "regexp" : "[object Date]" === n ? "date" : "[object Arguments]" === n ? "arguments" : "[object Error]" === n ? "error" : "[object Promise]" === n ? "promise" : e(t) ? "buffer" : "[object Set]" === n ? "set" : "[object WeakSet]" === n ? "weakset" : "[object Map]" === n ? "map" : "[object WeakMap]" === n ? "weakmap" : "[object Symbol]" === n ? "symbol" : "[object Map Iterator]" === n ? "mapiterator" : "[object Set Iterator]" === n ? "setiterator" : "[object String Iterator]" === n ? "stringiterator" : "[object Array Iterator]" === n ? "arrayiterator" : "[object Int8Array]" === n ? "int8array" : "[object Uint8Array]" === n ? "uint8array" : "[object Uint8ClampedArray]" === n ? "uint8clampedarray" : "[object Int16Array]" === n ? "int16array" : "[object Uint16Array]" === n ? "uint16array" : "[object Int32Array]" === n ? "int32array" : "[object Uint32Array]" === n ? "uint32array" : "[object Float32Array]" === n ? "float32array" : "[object Float64Array]" === n ? "float64array" : "object");
  },
      _ = t,
      k = "undefined" != typeof window,
      E = k && "IntersectionObserver" in window,
      A = {
    event: "event",
    observer: "observer"
  },
      j = function () {
    function e(e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }

    if (k) return "function" == typeof window.CustomEvent ? window.CustomEvent : (e.prototype = window.Event.prototype, e);
  }(),
      z = function z() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    return k ? window.devicePixelRatio || e : e;
  },
      T = function () {
    if (k) {
      var e = !1;

      try {
        var t = Object.defineProperty({}, "passive", {
          get: function get() {
            e = !0;
          }
        });
        window.addEventListener("test", null, t);
      } catch (e) {}

      return e;
    }
  }(),
      O = {
    on: function on(e, t, n) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      T ? e.addEventListener(t, n, {
        capture: r,
        passive: !0
      }) : e.addEventListener(t, n, r);
    },
    off: function off(e, t, n) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      e.removeEventListener(t, n, r);
    }
  },
      I = function I(e, t, n) {
    var r = new Image();
    r.src = e.src, r.onload = function () {
      t({
        naturalHeight: r.naturalHeight,
        naturalWidth: r.naturalWidth,
        src: r.src
      });
    }, r.onerror = function (e) {
      n(e);
    };
  },
      x = function x(e, t) {
    return "undefined" != typeof getComputedStyle ? getComputedStyle(e, null).getPropertyValue(t) : e.style[t];
  },
      S = function S(e) {
    return x(e, "overflow") + x(e, "overflow-y") + x(e, "overflow-x");
  },
      $ = function $(e) {
    if (k) {
      if (!(e instanceof HTMLElement)) return window;

      for (var t = e; t && t !== document.body && t !== document.documentElement && t.parentNode;) {
        if (/(scroll|auto)/.test(S(t))) return t;
        t = t.parentNode;
      }

      return window;
    }
  },
      H = {},
      Q = function () {
    function e(t) {
      var n = t.el,
          r = t.src,
          i = t.error,
          o = t.loading,
          a = t.bindType,
          s = t.$parent,
          u = t.options,
          l = t.elRenderer;
      b(this, e), this.el = n, this.src = r, this.error = i, this.loading = o, this.bindType = a, this.attempt = 0, this.naturalHeight = 0, this.naturalWidth = 0, this.options = u, this.rect = null, this.$parent = s, this.elRenderer = l, this.performanceData = {
        init: Date.now(),
        loadStart: 0,
        loadEnd: 0
      }, this.filter(), this.initState(), this.render("loading", !1);
    }

    return y(e, [{
      key: "initState",
      value: function value() {
        this.el.dataset.src = this.src, this.state = {
          error: !1,
          loaded: !1,
          rendered: !1
        };
      }
    }, {
      key: "record",
      value: function value(e) {
        this.performanceData[e] = Date.now();
      }
    }, {
      key: "update",
      value: function value(e) {
        var t = e.src,
            n = e.loading,
            r = e.error,
            i = this.src;
        this.src = t, this.loading = n, this.error = r, this.filter(), i !== this.src && (this.attempt = 0, this.initState());
      }
    }, {
      key: "getRect",
      value: function value() {
        this.rect = this.el.getBoundingClientRect();
      }
    }, {
      key: "checkInView",
      value: function value() {
        return this.getRect(), this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
      }
    }, {
      key: "filter",
      value: function value() {
        var e = this;
        h(this.options.filter).map(function (t) {
          e.options.filter[t](e, e.options);
        });
      }
    }, {
      key: "renderLoading",
      value: function value(e) {
        var t = this;
        I({
          src: this.loading
        }, function (n) {
          t.render("loading", !1), e();
        }, function () {
          e(), t.options.silent || console.warn("VueLazyload log: load failed with loading image(" + t.loading + ")");
        });
      }
    }, {
      key: "load",
      value: function value() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v;
        return this.attempt > this.options.attempt - 1 && this.state.error ? (this.options.silent || console.log("VueLazyload log: " + this.src + " tried too more than " + this.options.attempt + " times"), void t()) : this.state.loaded || H[this.src] ? (this.state.loaded = !0, t(), this.render("loaded", !0)) : void this.renderLoading(function () {
          e.attempt++, e.record("loadStart"), I({
            src: e.src
          }, function (n) {
            e.naturalHeight = n.naturalHeight, e.naturalWidth = n.naturalWidth, e.state.loaded = !0, e.state.error = !1, e.record("loadEnd"), e.render("loaded", !1), H[e.src] = 1, t();
          }, function (t) {
            !e.options.silent && console.error(t), e.state.error = !0, e.state.loaded = !1, e.render("error", !1);
          });
        });
      }
    }, {
      key: "render",
      value: function value(e, t) {
        this.elRenderer(this, e, t);
      }
    }, {
      key: "performance",
      value: function value() {
        var e = "loading",
            t = 0;
        return this.state.loaded && (e = "loaded", t = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3), this.state.error && (e = "error"), {
          src: this.src,
          state: e,
          time: t
        };
      }
    }, {
      key: "destroy",
      value: function value() {
        this.el = null, this.src = null, this.error = null, this.loading = null, this.bindType = null, this.attempt = 0;
      }
    }]), e;
  }(),
      C = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      R = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"],
      W = {
    rootMargin: "0px",
    threshold: 0
  },
      D = function D(e) {
    return function () {
      function t(e) {
        var n = e.preLoad,
            r = e.error,
            i = e.throttleWait,
            o = e.preLoadTop,
            a = e.dispatchEvent,
            s = e.loading,
            u = e.attempt,
            c = e.silent,
            h = void 0 === c || c,
            f = e.scale,
            v = e.listenEvents,
            p = (e.hasbind, e.filter),
            y = e.adapter,
            g = e.observer,
            m = e.observerOptions;
        b(this, t), this.version = "1.2.3", this.mode = A.event, this.ListenerQueue = [], this.TargetIndex = 0, this.TargetQueue = [], this.options = {
          silent: h,
          dispatchEvent: !!a,
          throttleWait: i || 200,
          preLoad: n || 1.3,
          preLoadTop: o || 0,
          error: r || C,
          loading: s || C,
          attempt: u || 3,
          scale: f || z(f),
          ListenEvents: v || R,
          hasbind: !1,
          supportWebp: l(),
          filter: p || {},
          adapter: y || {},
          observer: !!g,
          observerOptions: m || W
        }, this._initEvent(), this.lazyLoadHandler = d(this._lazyLoadHandler.bind(this), this.options.throttleWait), this.setMode(this.options.observer ? A.observer : A.event);
      }

      return y(t, [{
        key: "config",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

          _(this.options, e);
        }
      }, {
        key: "performance",
        value: function value() {
          var e = [];
          return this.ListenerQueue.map(function (t) {
            e.push(t.performance());
          }), e;
        }
      }, {
        key: "addLazyBox",
        value: function value(e) {
          this.ListenerQueue.push(e), k && (this._addListenerTarget(window), this._observer && this._observer.observe(e.el), e.$el && e.$el.parentNode && this._addListenerTarget(e.$el.parentNode));
        }
      }, {
        key: "add",
        value: function value(t, n, r) {
          var i = this;
          if (a(this.ListenerQueue, function (e) {
            return e.el === t;
          })) return this.update(t, n), e.nextTick(this.lazyLoadHandler);

          var o = this._valueFormatter(n.value),
              u = o.src,
              l = o.loading,
              d = o.error;

          e.nextTick(function () {
            u = s(t, i.options.scale) || u, i._observer && i._observer.observe(t);
            var o = Object.keys(n.modifiers)[0],
                a = void 0;
            o && (a = r.context.$refs[o], a = a ? a.$el || a : document.getElementById(o)), a || (a = $(t));
            var c = new Q({
              bindType: n.arg,
              $parent: a,
              el: t,
              loading: l,
              error: d,
              src: u,
              elRenderer: i._elRenderer.bind(i),
              options: i.options
            });
            i.ListenerQueue.push(c), k && (i._addListenerTarget(window), i._addListenerTarget(a)), i.lazyLoadHandler(), e.nextTick(function () {
              return i.lazyLoadHandler();
            });
          });
        }
      }, {
        key: "update",
        value: function value(t, n) {
          var r = this,
              i = this._valueFormatter(n.value),
              o = i.src,
              a = i.loading,
              l = i.error;

          o = s(t, this.options.scale) || o;
          var d = u(this.ListenerQueue, function (e) {
            return e.el === t;
          });
          d && d.update({
            src: o,
            loading: a,
            error: l
          }), this._observer && (this._observer.unobserve(t), this._observer.observe(t)), this.lazyLoadHandler(), e.nextTick(function () {
            return r.lazyLoadHandler();
          });
        }
      }, {
        key: "remove",
        value: function value(e) {
          if (e) {
            this._observer && this._observer.unobserve(e);
            var t = u(this.ListenerQueue, function (t) {
              return t.el === e;
            });
            t && (this._removeListenerTarget(t.$parent), this._removeListenerTarget(window), o(this.ListenerQueue, t) && t.destroy());
          }
        }
      }, {
        key: "removeComponent",
        value: function value(e) {
          e && (o(this.ListenerQueue, e), this._observer && this._observer.unobserve(e.el), e.$parent && e.$el.parentNode && this._removeListenerTarget(e.$el.parentNode), this._removeListenerTarget(window));
        }
      }, {
        key: "setMode",
        value: function value(e) {
          var t = this;
          E || e !== A.observer || (e = A.event), this.mode = e, e === A.event ? (this._observer && (this.ListenerQueue.forEach(function (e) {
            t._observer.unobserve(e.el);
          }), this._observer = null), this.TargetQueue.forEach(function (e) {
            t._initListen(e.el, !0);
          })) : (this.TargetQueue.forEach(function (e) {
            t._initListen(e.el, !1);
          }), this._initIntersectionObserver());
        }
      }, {
        key: "_addListenerTarget",
        value: function value(e) {
          if (e) {
            var t = u(this.TargetQueue, function (t) {
              return t.el === e;
            });
            return t ? t.childrenCount++ : (t = {
              el: e,
              id: ++this.TargetIndex,
              childrenCount: 1,
              listened: !0
            }, this.mode === A.event && this._initListen(t.el, !0), this.TargetQueue.push(t)), this.TargetIndex;
          }
        }
      }, {
        key: "_removeListenerTarget",
        value: function value(e) {
          var t = this;
          this.TargetQueue.forEach(function (n, r) {
            n.el === e && (--n.childrenCount || (t._initListen(n.el, !1), t.TargetQueue.splice(r, 1), n = null));
          });
        }
      }, {
        key: "_initListen",
        value: function value(e, t) {
          var n = this;
          this.options.ListenEvents.forEach(function (r) {
            return O[t ? "on" : "off"](e, r, n.lazyLoadHandler);
          });
        }
      }, {
        key: "_initEvent",
        value: function value() {
          var e = this;
          this.Event = {
            listeners: {
              loading: [],
              loaded: [],
              error: []
            }
          }, this.$on = function (t, n) {
            e.Event.listeners[t].push(n);
          }, this.$once = function (t, n) {
            function r() {
              i.$off(t, r), n.apply(i, arguments);
            }

            var i = e;
            e.$on(t, r);
          }, this.$off = function (t, n) {
            if (!n) return void (e.Event.listeners[t] = []);
            o(e.Event.listeners[t], n);
          }, this.$emit = function (t, n, r) {
            e.Event.listeners[t].forEach(function (e) {
              return e(n, r);
            });
          };
        }
      }, {
        key: "_lazyLoadHandler",
        value: function value() {
          var e = this,
              t = !1;
          this.ListenerQueue.forEach(function (n, r) {
            n.state.loaded || (t = n.checkInView()) && n.load(function () {
              !n.error && n.loaded && e.ListenerQueue.splice(r, 1);
            });
          });
        }
      }, {
        key: "_initIntersectionObserver",
        value: function value() {
          var e = this;
          E && (this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions), this.ListenerQueue.length && this.ListenerQueue.forEach(function (t) {
            e._observer.observe(t.el);
          }));
        }
      }, {
        key: "_observerHandler",
        value: function value(e, t) {
          var n = this;
          e.forEach(function (e) {
            e.isIntersecting && n.ListenerQueue.forEach(function (t) {
              if (t.el === e.target) {
                if (t.state.loaded) return n._observer.unobserve(t.el);
                t.load();
              }
            });
          });
        }
      }, {
        key: "_elRenderer",
        value: function value(e, t, n) {
          if (e.el) {
            var r = e.el,
                i = e.bindType,
                o = void 0;

            switch (t) {
              case "loading":
                o = e.loading;
                break;

              case "error":
                o = e.error;
                break;

              default:
                o = e.src;
            }

            if (i ? r.style[i] = 'url("' + o + '")' : r.getAttribute("src") !== o && r.setAttribute("src", o), r.setAttribute("lazy", t), this.$emit(t, e, n), this.options.adapter[t] && this.options.adapter[t](e, this.options), this.options.dispatchEvent) {
              var a = new j(t, {
                detail: e
              });
              r.dispatchEvent(a);
            }
          }
        }
      }, {
        key: "_valueFormatter",
        value: function value(e) {
          var t = e,
              n = this.options.loading,
              r = this.options.error;
          return c(e) && (e.src || this.options.silent || console.error("Vue Lazyload warning: miss src with " + e), t = e.src, n = e.loading || this.options.loading, r = e.error || this.options.error), {
            src: t,
            loading: n,
            error: r
          };
        }
      }]), t;
    }();
  },
      B = function B(e) {
    return {
      props: {
        tag: {
          type: String,
          default: "div"
        }
      },
      render: function render(e) {
        return !1 === this.show ? e(this.tag) : e(this.tag, null, this.$slots.default);
      },
      data: function data() {
        return {
          el: null,
          state: {
            loaded: !1
          },
          rect: {},
          show: !1
        };
      },
      mounted: function mounted() {
        this.el = this.$el, e.addLazyBox(this), e.lazyLoadHandler();
      },
      beforeDestroy: function beforeDestroy() {
        e.removeComponent(this);
      },
      methods: {
        getRect: function getRect() {
          this.rect = this.$el.getBoundingClientRect();
        },
        checkInView: function checkInView() {
          return this.getRect(), k && this.rect.top < window.innerHeight * e.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * e.options.preLoad && this.rect.right > 0;
        },
        load: function load() {
          this.show = !0, this.state.loaded = !0, this.$emit("show", this);
        }
      }
    };
  },
      V = function () {
    function e(t) {
      var n = t.lazy;
      b(this, e), this.lazy = n, n.lazyContainerMananger = this, this._queue = [];
    }

    return y(e, [{
      key: "bind",
      value: function value(e, t, n) {
        var r = new N({
          el: e,
          binding: t,
          vnode: n,
          lazy: this.lazy
        });

        this._queue.push(r);
      }
    }, {
      key: "update",
      value: function value(e, t, n) {
        var r = u(this._queue, function (t) {
          return t.el === e;
        });
        r && r.update({
          el: e,
          binding: t,
          vnode: n
        });
      }
    }, {
      key: "unbind",
      value: function value(e, t, n) {
        var r = u(this._queue, function (t) {
          return t.el === e;
        });
        r && (r.clear(), o(this._queue, r));
      }
    }]), e;
  }(),
      M = {
    selector: "img"
  },
      N = function () {
    function e(t) {
      var n = t.el,
          r = t.binding,
          i = t.vnode,
          o = t.lazy;
      b(this, e), this.el = null, this.vnode = i, this.binding = r, this.options = {}, this.lazy = o, this._queue = [], this.update({
        el: n,
        binding: r
      });
    }

    return y(e, [{
      key: "update",
      value: function value(e) {
        var t = this,
            n = e.el,
            r = e.binding;
        this.el = n, this.options = _({}, M, r.value), this.getImgs().forEach(function (e) {
          t.lazy.add(e, _({}, t.binding, {
            value: {
              src: e.dataset.src,
              error: e.dataset.error,
              loading: e.dataset.loading
            }
          }), t.vnode);
        });
      }
    }, {
      key: "getImgs",
      value: function value() {
        return f(this.el.querySelectorAll(this.options.selector));
      }
    }, {
      key: "clear",
      value: function value() {
        var e = this;
        this.getImgs().forEach(function (t) {
          return e.lazy.remove(t);
        }), this.vnode = null, this.binding = null, this.lazy = null;
      }
    }]), e;
  }();

  return {
    install: function install(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = D(e),
          r = new n(t),
          i = new V({
        lazy: r
      }),
          o = "2" === e.version.split(".")[0];
      e.prototype.$Lazyload = r, t.lazyComponent && e.component("lazy-component", B(r)), o ? (e.directive("lazy", {
        bind: r.add.bind(r),
        update: r.update.bind(r),
        componentUpdated: r.lazyLoadHandler.bind(r),
        unbind: r.remove.bind(r)
      }), e.directive("lazy-container", {
        bind: i.bind.bind(i),
        update: i.update.bind(i),
        unbind: i.unbind.bind(i)
      })) : (e.directive("lazy", {
        bind: r.lazyLoadHandler.bind(r),
        update: function update(e, t) {
          _(this.vm.$refs, this.vm.$els), r.add(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: e,
            oldValue: t
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          r.remove(this.el);
        }
      }), e.directive("lazy-container", {
        update: function update(e, t) {
          i.update(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: e,
            oldValue: t
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          i.unbind(this.el);
        }
      }));
    }
  };
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* binding */ install; });
__webpack_require__.d(__webpack_exports__, "version", function() { return /* binding */ version; });
__webpack_require__.d(__webpack_exports__, "ActionSheet", function() { return /* reexport */ action_sheet; });
__webpack_require__.d(__webpack_exports__, "AddressEdit", function() { return /* reexport */ address_edit; });
__webpack_require__.d(__webpack_exports__, "AddressList", function() { return /* reexport */ address_list; });
__webpack_require__.d(__webpack_exports__, "Area", function() { return /* reexport */ es_area; });
__webpack_require__.d(__webpack_exports__, "Badge", function() { return /* reexport */ badge; });
__webpack_require__.d(__webpack_exports__, "Button", function() { return /* reexport */ es_button; });
__webpack_require__.d(__webpack_exports__, "Calendar", function() { return /* reexport */ calendar; });
__webpack_require__.d(__webpack_exports__, "Card", function() { return /* reexport */ card; });
__webpack_require__.d(__webpack_exports__, "Cascader", function() { return /* reexport */ cascader; });
__webpack_require__.d(__webpack_exports__, "Cell", function() { return /* reexport */ cell; });
__webpack_require__.d(__webpack_exports__, "CellGroup", function() { return /* reexport */ cell_group; });
__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return /* reexport */ es_checkbox; });
__webpack_require__.d(__webpack_exports__, "CheckboxGroup", function() { return /* reexport */ checkbox_group; });
__webpack_require__.d(__webpack_exports__, "Circle", function() { return /* reexport */ circle; });
__webpack_require__.d(__webpack_exports__, "Col", function() { return /* reexport */ col; });
__webpack_require__.d(__webpack_exports__, "Collapse", function() { return /* reexport */ collapse; });
__webpack_require__.d(__webpack_exports__, "CollapseItem", function() { return /* reexport */ collapse_item; });
__webpack_require__.d(__webpack_exports__, "ContactCard", function() { return /* reexport */ contact_card; });
__webpack_require__.d(__webpack_exports__, "ContactEdit", function() { return /* reexport */ contact_edit; });
__webpack_require__.d(__webpack_exports__, "ContactList", function() { return /* reexport */ contact_list; });
__webpack_require__.d(__webpack_exports__, "CountDown", function() { return /* reexport */ count_down; });
__webpack_require__.d(__webpack_exports__, "Coupon", function() { return /* reexport */ es_coupon; });
__webpack_require__.d(__webpack_exports__, "CouponCell", function() { return /* reexport */ coupon_cell; });
__webpack_require__.d(__webpack_exports__, "CouponList", function() { return /* reexport */ coupon_list; });
__webpack_require__.d(__webpack_exports__, "DatetimePicker", function() { return /* reexport */ datetime_picker; });
__webpack_require__.d(__webpack_exports__, "Dialog", function() { return /* reexport */ dialog; });
__webpack_require__.d(__webpack_exports__, "Divider", function() { return /* reexport */ divider; });
__webpack_require__.d(__webpack_exports__, "DropdownItem", function() { return /* reexport */ dropdown_item; });
__webpack_require__.d(__webpack_exports__, "DropdownMenu", function() { return /* reexport */ dropdown_menu; });
__webpack_require__.d(__webpack_exports__, "Empty", function() { return /* reexport */ empty; });
__webpack_require__.d(__webpack_exports__, "Field", function() { return /* reexport */ es_field; });
__webpack_require__.d(__webpack_exports__, "Form", function() { return /* reexport */ es_form; });
__webpack_require__.d(__webpack_exports__, "GoodsAction", function() { return /* reexport */ goods_action; });
__webpack_require__.d(__webpack_exports__, "GoodsActionButton", function() { return /* reexport */ goods_action_button; });
__webpack_require__.d(__webpack_exports__, "GoodsActionIcon", function() { return /* reexport */ goods_action_icon; });
__webpack_require__.d(__webpack_exports__, "Grid", function() { return /* reexport */ grid; });
__webpack_require__.d(__webpack_exports__, "GridItem", function() { return /* reexport */ grid_item; });
__webpack_require__.d(__webpack_exports__, "Icon", function() { return /* reexport */ es_icon; });
__webpack_require__.d(__webpack_exports__, "Image", function() { return /* reexport */ es_image; });
__webpack_require__.d(__webpack_exports__, "ImagePreview", function() { return /* reexport */ image_preview; });
__webpack_require__.d(__webpack_exports__, "IndexAnchor", function() { return /* reexport */ index_anchor; });
__webpack_require__.d(__webpack_exports__, "IndexBar", function() { return /* reexport */ index_bar; });
__webpack_require__.d(__webpack_exports__, "Info", function() { return /* reexport */ es_info; });
__webpack_require__.d(__webpack_exports__, "Lazyload", function() { return /* reexport */ lazyload; });
__webpack_require__.d(__webpack_exports__, "List", function() { return /* reexport */ es_list; });
__webpack_require__.d(__webpack_exports__, "Loading", function() { return /* reexport */ es_loading; });
__webpack_require__.d(__webpack_exports__, "Locale", function() { return /* reexport */ locale["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "NavBar", function() { return /* reexport */ nav_bar; });
__webpack_require__.d(__webpack_exports__, "NoticeBar", function() { return /* reexport */ notice_bar; });
__webpack_require__.d(__webpack_exports__, "Notify", function() { return /* reexport */ notify; });
__webpack_require__.d(__webpack_exports__, "NumberKeyboard", function() { return /* reexport */ number_keyboard; });
__webpack_require__.d(__webpack_exports__, "Overlay", function() { return /* reexport */ es_overlay; });
__webpack_require__.d(__webpack_exports__, "Pagination", function() { return /* reexport */ pagination; });
__webpack_require__.d(__webpack_exports__, "Panel", function() { return /* reexport */ panel; });
__webpack_require__.d(__webpack_exports__, "PasswordInput", function() { return /* reexport */ password_input; });
__webpack_require__.d(__webpack_exports__, "Picker", function() { return /* reexport */ es_picker; });
__webpack_require__.d(__webpack_exports__, "Popover", function() { return /* reexport */ popover; });
__webpack_require__.d(__webpack_exports__, "Popup", function() { return /* reexport */ popup; });
__webpack_require__.d(__webpack_exports__, "Progress", function() { return /* reexport */ es_progress; });
__webpack_require__.d(__webpack_exports__, "PullRefresh", function() { return /* reexport */ pull_refresh; });
__webpack_require__.d(__webpack_exports__, "Radio", function() { return /* reexport */ es_radio; });
__webpack_require__.d(__webpack_exports__, "RadioGroup", function() { return /* reexport */ radio_group; });
__webpack_require__.d(__webpack_exports__, "Rate", function() { return /* reexport */ es_rate; });
__webpack_require__.d(__webpack_exports__, "Row", function() { return /* reexport */ row; });
__webpack_require__.d(__webpack_exports__, "Search", function() { return /* reexport */ search; });
__webpack_require__.d(__webpack_exports__, "ShareSheet", function() { return /* reexport */ share_sheet; });
__webpack_require__.d(__webpack_exports__, "Sidebar", function() { return /* reexport */ sidebar; });
__webpack_require__.d(__webpack_exports__, "SidebarItem", function() { return /* reexport */ sidebar_item; });
__webpack_require__.d(__webpack_exports__, "Skeleton", function() { return /* reexport */ skeleton; });
__webpack_require__.d(__webpack_exports__, "Sku", function() { return /* reexport */ es_sku; });
__webpack_require__.d(__webpack_exports__, "Slider", function() { return /* reexport */ slider; });
__webpack_require__.d(__webpack_exports__, "Step", function() { return /* reexport */ es_step; });
__webpack_require__.d(__webpack_exports__, "Stepper", function() { return /* reexport */ stepper; });
__webpack_require__.d(__webpack_exports__, "Steps", function() { return /* reexport */ steps; });
__webpack_require__.d(__webpack_exports__, "Sticky", function() { return /* reexport */ es_sticky; });
__webpack_require__.d(__webpack_exports__, "SubmitBar", function() { return /* reexport */ submit_bar; });
__webpack_require__.d(__webpack_exports__, "Swipe", function() { return /* reexport */ swipe; });
__webpack_require__.d(__webpack_exports__, "SwipeCell", function() { return /* reexport */ swipe_cell; });
__webpack_require__.d(__webpack_exports__, "SwipeItem", function() { return /* reexport */ swipe_item; });
__webpack_require__.d(__webpack_exports__, "Switch", function() { return /* reexport */ es_switch; });
__webpack_require__.d(__webpack_exports__, "SwitchCell", function() { return /* reexport */ switch_cell; });
__webpack_require__.d(__webpack_exports__, "Tab", function() { return /* reexport */ tab; });
__webpack_require__.d(__webpack_exports__, "Tabbar", function() { return /* reexport */ tabbar; });
__webpack_require__.d(__webpack_exports__, "TabbarItem", function() { return /* reexport */ tabbar_item; });
__webpack_require__.d(__webpack_exports__, "Tabs", function() { return /* reexport */ tabs; });
__webpack_require__.d(__webpack_exports__, "Tag", function() { return /* reexport */ es_tag; });
__webpack_require__.d(__webpack_exports__, "Toast", function() { return /* reexport */ es_toast; });
__webpack_require__.d(__webpack_exports__, "TreeSelect", function() { return /* reexport */ tree_select; });
__webpack_require__.d(__webpack_exports__, "Uploader", function() { return /* reexport */ uploader; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// EXTERNAL MODULE: ./node_modules/@vue/babel-helper-vue-jsx-merge-props/dist/helper.js
var helper = __webpack_require__(1);
var helper_default = /*#__PURE__*/__webpack_require__.n(helper);

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(3);
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default = /*#__PURE__*/__webpack_require__.n(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_);

// EXTERNAL MODULE: ./es/utils/create/index.js + 4 modules
var create = __webpack_require__(8);

// CONCATENATED MODULE: ./es/utils/functional.js


var inheritKey = ['ref', 'key', 'style', 'class', 'attrs', 'refInFor', 'nativeOn', 'directives', 'staticClass', 'staticStyle'];
var mapInheritKey = {
  nativeOn: 'on'
}; // inherit partial context, map nativeOn to on

function inherit(context, inheritListeners) {
  var result = inheritKey.reduce(function (obj, key) {
    if (context.data[key]) {
      obj[mapInheritKey[key] || key] = context.data[key];
    }

    return obj;
  }, {});

  if (inheritListeners) {
    result.on = result.on || {};

    _extends(result.on, context.data.on);
  }

  return result;
} // emit event

function functional_emit(context, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var listeners = context.listeners[eventName];

  if (listeners) {
    if (Array.isArray(listeners)) {
      listeners.forEach(function (listener) {
        listener.apply(void 0, args);
      });
    } else {
      listeners.apply(void 0, args);
    }
  }
} // mount functional component

function mount(Component, data) {
  var instance = new external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a({
    el: document.createElement('div'),
    props: Component.props,
    render: function render(h) {
      return h(Component, _extends({
        props: this.$props
      }, data));
    }
  });
  document.body.appendChild(instance.$el);
  return instance;
}
// CONCATENATED MODULE: ./es/mixins/popup/context.js
var context_context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function (item) {
      return item.vm === vm;
    })[0];
  },
  remove: function remove(vm) {
    var item = this.find(vm);
    if (!item) return;
    item.vm = null;
    item.overlay = null;
    var index = this.stack.indexOf(item);
    this.stack.splice(index, 1);
  }
};
// EXTERNAL MODULE: ./es/utils/index.js
var utils = __webpack_require__(0);

// CONCATENATED MODULE: ./es/utils/dom/event.js
 // eslint-disable-next-line import/no-mutable-exports

var supportsPassive = false;

if (!utils["h" /* isServer */]) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function event_on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  if (!utils["h" /* isServer */]) {
    target.addEventListener(event, handler, supportsPassive ? {
      capture: false,
      passive: passive
    } : false);
  }
}
function off(target, event, handler) {
  if (!utils["h" /* isServer */]) {
    target.removeEventListener(event, handler);
  }
}
function event_stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    event_stopPropagation(event);
  }
}
// CONCATENATED MODULE: ./es/overlay/index.js

 // Utils



 // Types

var _createNamespace = Object(create["a" /* createNamespace */])('overlay'),
    createComponent = _createNamespace[0],
    overlay_bem = _createNamespace[1];

function preventTouchMove(event) {
  preventDefault(event, true);
}

function Overlay(h, props, slots, ctx) {
  var style = _extends({
    zIndex: props.zIndex
  }, props.customStyle);

  if (Object(utils["c" /* isDef */])(props.duration)) {
    style.animationDuration = props.duration + "s";
  }

  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", helper_default()([{
    "directives": [{
      name: "show",
      value: props.show
    }],
    "style": style,
    "class": [overlay_bem(), props.className],
    "on": {
      "touchmove": props.lockScroll ? preventTouchMove : utils["i" /* noop */]
    }
  }, inherit(ctx, true)]), [slots.default == null ? void 0 : slots.default()])]);
}

Overlay.props = {
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  className: null,
  customStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true
  }
};
/* harmony default export */ var es_overlay = (createComponent(Overlay));
// CONCATENATED MODULE: ./es/utils/dom/node.js
function removeNode(el) {
  var parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}
// CONCATENATED MODULE: ./es/mixins/popup/overlay.js





var defaultConfig = {
  className: '',
  customStyle: {}
};

function mountOverlay(vm) {
  return mount(es_overlay, {
    on: {
      // close popup when overlay clicked & closeOnClickOverlay is true
      click: function click() {
        vm.$emit('click-overlay');

        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      }
    }
  });
}

function updateOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    var el = vm.$el;
    var config = item.config,
        overlay = item.overlay;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }

    _extends(overlay, defaultConfig, config, {
      show: true
    });
  }
}
function openOverlay(vm, config) {
  var item = context_context.find(vm);

  if (item) {
    item.config = config;
  } else {
    var overlay = mountOverlay(vm);
    context_context.stack.push({
      vm: vm,
      config: config,
      overlay: overlay
    });
  }

  updateOverlay(vm);
}
function closeOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    item.overlay.show = false;
  }
}
function removeOverlay(vm) {
  var item = context_context.find(vm);

  if (item) {
    removeNode(item.overlay.$el);
    context_context.remove(vm);
  }
}
// CONCATENATED MODULE: ./es/utils/dom/scroll.js
function isWindow(val) {
  return val === window;
} // get nearest scroll element
// https://github.com/youzan/vant/issues/3823


var overflowScrollReg = /scroll|auto|overlay/i;
function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }

  var node = el;

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
function getScrollTop(el) {
  var top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset; // iOS scroll bounce cause minus scrollTop

  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
} // get distance from element top to page top or scroller top

function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }

  var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }

  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }

  return el.getBoundingClientRect().top;
}
// CONCATENATED MODULE: ./es/mixins/touch.js


function getDirection(x, y) {
  if (x > y) {
    return 'horizontal';
  }

  if (y > x) {
    return 'vertical';
  }

  return '';
}

var TouchMixin = {
  data: function data() {
    return {
      direction: ''
    };
  },
  methods: {
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0]; // safari back will set clientX to negative number

      this.deltaX = touch.clientX < 0 ? 0 : touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY); // lock direction when distance is greater than a certain value

      var LOCK_DIRECTION_DISTANCE = 10;

      if (!this.direction || this.offsetX < LOCK_DIRECTION_DISTANCE && this.offsetY < LOCK_DIRECTION_DISTANCE) {
        this.direction = getDirection(this.offsetX, this.offsetY);
      }
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    // avoid Vue 2.6 event bubble issues by manually binding events
    // https://github.com/youzan/vant/issues/3015
    bindTouchEvent: function bindTouchEvent(el) {
      var onTouchStart = this.onTouchStart,
          onTouchMove = this.onTouchMove,
          onTouchEnd = this.onTouchEnd;
      event_on(el, 'touchstart', onTouchStart);
      event_on(el, 'touchmove', onTouchMove);

      if (onTouchEnd) {
        event_on(el, 'touchend', onTouchEnd);
        event_on(el, 'touchcancel', onTouchEnd);
      }
    }
  }
};
// CONCATENATED MODULE: ./es/mixins/portal.js
function getElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector();
}

function PortalMixin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      ref = _ref.ref,
      afterPortal = _ref.afterPortal;

  return {
    props: {
      getContainer: [String, Function]
    },
    watch: {
      getContainer: 'portal'
    },
    mounted: function mounted() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal: function portal() {
        var getContainer = this.getContainer;
        var el = ref ? this.$refs[ref] : this.$el;
        var container;

        if (getContainer) {
          container = getElement(getContainer);
        } else if (this.$parent) {
          container = this.$parent.$el;
        }

        if (container && container !== el.parentNode) {
          container.appendChild(el);
        }

        if (afterPortal) {
          afterPortal.call(this);
        }
      }
    }
  };
}
// CONCATENATED MODULE: ./es/mixins/bind-event.js
/**
 * Bind event when mounted or activated
 */

var uid = 0;
function BindEventMixin(handler) {
  var key = "binded_" + uid++;

  function bind() {
    if (!this[key]) {
      handler.call(this, event_on, true);
      this[key] = true;
    }
  }

  function unbind() {
    if (this[key]) {
      handler.call(this, off, false);
      this[key] = false;
    }
  }

  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind
  };
}
// CONCATENATED MODULE: ./es/mixins/close-on-popstate.js


var CloseOnPopstateMixin = {
  mixins: [BindEventMixin(function (bind, isBind) {
    this.handlePopstate(isBind && this.closeOnPopstate);
  })],
  props: {
    closeOnPopstate: Boolean
  },
  data: function data() {
    return {
      bindStatus: false
    };
  },
  watch: {
    closeOnPopstate: function closeOnPopstate(val) {
      this.handlePopstate(val);
    }
  },
  methods: {
    onPopstate: function onPopstate() {
      this.close();
      this.shouldReopen = false;
    },
    handlePopstate: function handlePopstate(bind) {
      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        var action = bind ? event_on : off;
        action(window, 'popstate', this.onPopstate);
      }
    }
  }
};
// CONCATENATED MODULE: ./es/mixins/popup/index.js
// Context

 // Utils



 // Mixins




var popupMixinProps = {
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to show popup
  value: Boolean,
  // whether to show overlay
  overlay: Boolean,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: String,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: Boolean,
  // z-index
  zIndex: [Number, String],
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true
  }
};
function PopupMixin(options) {
  if (options === void 0) {
    options = {};
  }

  return {
    mixins: [TouchMixin, CloseOnPopstateMixin, PortalMixin({
      afterPortal: function afterPortal() {
        if (this.overlay) {
          updateOverlay();
        }
      }
    })],
    provide: function provide() {
      return {
        vanPopup: this
      };
    },
    props: popupMixinProps,
    data: function data() {
      this.onReopenCallback = [];
      return {
        inited: this.value
      };
    },
    computed: {
      shouldRender: function shouldRender() {
        return this.inited || !this.lazyRender;
      }
    },
    watch: {
      value: function value(val) {
        var type = val ? 'open' : 'close';
        this.inited = this.inited || this.value;
        this[type]();

        if (!options.skipToggleEvent) {
          this.$emit(type);
        }
      },
      overlay: 'renderOverlay'
    },
    mounted: function mounted() {
      if (this.value) {
        this.open();
      }
    },

    /* istanbul ignore next */
    activated: function activated() {
      if (this.shouldReopen) {
        this.$emit('input', true);
        this.shouldReopen = false;
      }
    },
    beforeDestroy: function beforeDestroy() {
      removeOverlay(this);

      if (this.opened) {
        this.removeLock();
      }

      if (this.getContainer) {
        removeNode(this.$el);
      }
    },

    /* istanbul ignore next */
    deactivated: function deactivated() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },
    methods: {
      open: function open() {
        /* istanbul ignore next */
        if (this.$isServer || this.opened) {
          return;
        } // cover default zIndex


        if (this.zIndex !== undefined) {
          context_context.zIndex = this.zIndex;
        }

        this.opened = true;
        this.renderOverlay();
        this.addLock();
        this.onReopenCallback.forEach(function (callback) {
          callback();
        });
      },
      addLock: function addLock() {
        if (this.lockScroll) {
          event_on(document, 'touchstart', this.touchStart);
          event_on(document, 'touchmove', this.onTouchMove);

          if (!context_context.lockCount) {
            document.body.classList.add('van-overflow-hidden');
          }

          context_context.lockCount++;
        }
      },
      removeLock: function removeLock() {
        if (this.lockScroll && context_context.lockCount) {
          context_context.lockCount--;
          off(document, 'touchstart', this.touchStart);
          off(document, 'touchmove', this.onTouchMove);

          if (!context_context.lockCount) {
            document.body.classList.remove('van-overflow-hidden');
          }
        }
      },
      close: function close() {
        if (!this.opened) {
          return;
        }

        closeOverlay(this);
        this.opened = false;
        this.removeLock();
        this.$emit('input', false);
      },
      onTouchMove: function onTouchMove(event) {
        this.touchMove(event);
        var direction = this.deltaY > 0 ? '10' : '01';
        var el = getScroller(event.target, this.$el);
        var scrollHeight = el.scrollHeight,
            offsetHeight = el.offsetHeight,
            scrollTop = el.scrollTop;
        var status = '11';
        /* istanbul ignore next */

        if (scrollTop === 0) {
          status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          status = '10';
        }
        /* istanbul ignore next */


        if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2))) {
          preventDefault(event, true);
        }
      },
      renderOverlay: function renderOverlay() {
        var _this = this;

        if (this.$isServer || !this.value) {
          return;
        }

        this.$nextTick(function () {
          _this.updateZIndex(_this.overlay ? 1 : 0);

          if (_this.overlay) {
            openOverlay(_this, {
              zIndex: context_context.zIndex++,
              duration: _this.duration,
              className: _this.overlayClass,
              customStyle: _this.overlayStyle
            });
          } else {
            closeOverlay(_this);
          }
        });
      },
      updateZIndex: function updateZIndex(value) {
        if (value === void 0) {
          value = 0;
        }

        this.$el.style.zIndex = ++context_context.zIndex + value;
      },
      onReopen: function onReopen(callback) {
        this.onReopenCallback.push(callback);
      }
    }
  };
}
// EXTERNAL MODULE: ./es/utils/format/unit.js
var unit = __webpack_require__(6);

// CONCATENATED MODULE: ./es/info/index.js
 // Utils


 // Types

var info_createNamespace = Object(create["a" /* createNamespace */])('info'),
    info_createComponent = info_createNamespace[0],
    info_bem = info_createNamespace[1];

function info_Info(h, props, slots, ctx) {
  var dot = props.dot,
      info = props.info;
  var showInfo = Object(utils["c" /* isDef */])(info) && info !== '';

  if (!dot && !showInfo) {
    return;
  }

  return h("div", helper_default()([{
    "class": info_bem({
      dot: dot
    })
  }, inherit(ctx, true)]), [dot ? '' : props.info]);
}

info_Info.props = {
  dot: Boolean,
  info: [Number, String]
};
/* harmony default export */ var es_info = (info_createComponent(info_Info));
// CONCATENATED MODULE: ./es/icon/index.js
 // Utils


 // Components

 // Types

var icon_createNamespace = Object(create["a" /* createNamespace */])('icon'),
    icon_createComponent = icon_createNamespace[0],
    icon_bem = icon_createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
} // compatible with legacy usage, should be removed in next major version


var LEGACY_MAP = {
  medel: 'medal',
  'medel-o': 'medal-o',
  'calender-o': 'calendar-o'
};

function correctName(name) {
  return name && LEGACY_MAP[name] || name;
}

function Icon(h, props, slots, ctx) {
  var _props$badge;

  var name = correctName(props.name);
  var imageIcon = isImage(name);

  if (false) {}

  return h(props.tag, helper_default()([{
    "class": [props.classPrefix, imageIcon ? '' : props.classPrefix + "-" + name],
    "style": {
      color: props.color,
      fontSize: Object(unit["a" /* addUnit */])(props.size)
    }
  }, inherit(ctx, true)]), [slots.default && slots.default(), imageIcon && h("img", {
    "class": icon_bem('image'),
    "attrs": {
      "src": name
    }
  }), h(es_info, {
    "attrs": {
      "dot": props.dot,
      "info": (_props$badge = props.badge) != null ? _props$badge : props.info
    }
  })]);
}

Icon.props = {
  dot: Boolean,
  name: String,
  size: [Number, String],
  // @deprecated
  // should be removed in next major version
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: icon_bem()
  }
};
/* harmony default export */ var es_icon = (icon_createComponent(Icon));
// CONCATENATED MODULE: ./es/popup/index.js




var popup_createNamespace = Object(create["a" /* createNamespace */])('popup'),
    popup_createComponent = popup_createNamespace[0],
    popup_bem = popup_createNamespace[1];

/* harmony default export */ var popup = (popup_createComponent({
  mixins: [PopupMixin()],
  props: {
    round: Boolean,
    duration: [Number, String],
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    closeIcon: {
      type: String,
      default: 'cross'
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    },
    position: {
      type: String,
      default: 'center'
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate: function beforeCreate() {
    var _this = this;

    var createEmitter = function createEmitter(eventName) {
      return function (event) {
        return _this.$emit(eventName, event);
      };
    };

    this.onClick = createEmitter('click');
    this.onOpened = createEmitter('opened');
    this.onClosed = createEmitter('closed');
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon(event) {
      this.$emit('click-close-icon', event);
      this.close();
    }
  },
  render: function render() {
    var _bem;

    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    var round = this.round,
        position = this.position,
        duration = this.duration;
    var isCenter = position === 'center';
    var transitionName = this.transition || (isCenter ? 'van-fade' : "van-popup-slide-" + position);
    var style = {};

    if (Object(utils["c" /* isDef */])(duration)) {
      var key = isCenter ? 'animationDuration' : 'transitionDuration';
      style[key] = duration + "s";
    }

    return h("transition", {
      "attrs": {
        "appear": this.transitionAppear,
        "name": transitionName
      },
      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "style": style,
      "class": popup_bem((_bem = {
        round: round
      }, _bem[position] = position, _bem['safe-area-inset-bottom'] = this.safeAreaInsetBottom, _bem)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots(), this.closeable && h(es_icon, {
      "attrs": {
        "role": "button",
        "tabindex": "0",
        "name": this.closeIcon
      },
      "class": popup_bem('close-icon', this.closeIconPosition),
      "on": {
        "click": this.onClickCloseIcon
      }
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/loading/index.js
 // Utils


 // Types

var loading_createNamespace = Object(create["a" /* createNamespace */])('loading'),
    loading_createComponent = loading_createNamespace[0],
    loading_bem = loading_createNamespace[1];

function LoadingIcon(h, props) {
  if (props.type === 'spinner') {
    var Spin = [];

    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }

    return Spin;
  }

  return h("svg", {
    "class": loading_bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
}

function LoadingText(h, props, slots) {
  if (slots.default) {
    var _props$textColor;

    var style = {
      fontSize: Object(unit["a" /* addUnit */])(props.textSize),
      color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
    };
    return h("span", {
      "class": loading_bem('text'),
      "style": style
    }, [slots.default()]);
  }
}

function Loading(h, props, slots, ctx) {
  var color = props.color,
      size = props.size,
      type = props.type;
  var style = {
    color: color
  };

  if (size) {
    var iconSize = Object(unit["a" /* addUnit */])(size);
    style.width = iconSize;
    style.height = iconSize;
  }

  return h("div", helper_default()([{
    "class": loading_bem([type, {
      vertical: props.vertical
    }])
  }, inherit(ctx, true)]), [h("span", {
    "class": loading_bem('spinner', type),
    "style": style
  }, [LoadingIcon(h, props)]), LoadingText(h, props, slots)]);
}

Loading.props = {
  color: String,
  size: [Number, String],
  vertical: Boolean,
  textSize: [Number, String],
  textColor: String,
  type: {
    type: String,
    default: 'circular'
  }
};
/* harmony default export */ var es_loading = (loading_createComponent(Loading));
// CONCATENATED MODULE: ./es/action-sheet/index.js


 // Utils


 // Mixins

 // Components



 // Types

var action_sheet_createNamespace = Object(create["a" /* createNamespace */])('action-sheet'),
    action_sheet_createComponent = action_sheet_createNamespace[0],
    action_sheet_bem = action_sheet_createNamespace[1];

function ActionSheet(h, props, slots, ctx) {
  var title = props.title,
      cancelText = props.cancelText,
      closeable = props.closeable;

  function onCancel() {
    functional_emit(ctx, 'input', false);
    functional_emit(ctx, 'cancel');
  }

  function Header() {
    if (title) {
      return h("div", {
        "class": action_sheet_bem('header')
      }, [title, closeable && h(es_icon, {
        "attrs": {
          "name": props.closeIcon
        },
        "class": action_sheet_bem('close'),
        "on": {
          "click": onCancel
        }
      })]);
    }
  }

  function Option(item, index) {
    var disabled = item.disabled,
        loading = item.loading,
        callback = item.callback;

    function onClickOption(event) {
      event.stopPropagation();

      if (disabled || loading) {
        return;
      }

      if (callback) {
        callback(item);
      }

      if (props.closeOnClickAction) {
        functional_emit(ctx, 'input', false);
      }

      external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.nextTick(function () {
        functional_emit(ctx, 'select', item, index);
      });
    }

    function OptionContent() {
      if (loading) {
        return h(es_loading, {
          "class": action_sheet_bem('loading-icon')
        });
      }

      return [h("span", {
        "class": action_sheet_bem('name')
      }, [item.name]), item.subname && h("div", {
        "class": action_sheet_bem('subname')
      }, [item.subname])];
    }

    return h("button", {
      "attrs": {
        "type": "button"
      },
      "class": [action_sheet_bem('item', {
        disabled: disabled,
        loading: loading
      }), item.className],
      "style": {
        color: item.color
      },
      "on": {
        "click": onClickOption
      }
    }, [OptionContent()]);
  }

  function CancelText() {
    if (cancelText) {
      return [h("div", {
        "class": action_sheet_bem('gap')
      }), h("button", {
        "attrs": {
          "type": "button"
        },
        "class": action_sheet_bem('cancel'),
        "on": {
          "click": onCancel
        }
      }, [cancelText])];
    }
  }

  function Description() {
    var description = (slots.description == null ? void 0 : slots.description()) || props.description;

    if (description) {
      return h("div", {
        "class": action_sheet_bem('description')
      }, [description]);
    }
  }

  return h(popup, helper_default()([{
    "class": action_sheet_bem(),
    "attrs": {
      "position": "bottom",
      "round": props.round,
      "value": props.value,
      "overlay": props.overlay,
      "duration": props.duration,
      "lazyRender": props.lazyRender,
      "lockScroll": props.lockScroll,
      "getContainer": props.getContainer,
      "closeOnPopstate": props.closeOnPopstate,
      "closeOnClickOverlay": props.closeOnClickOverlay,
      "safeAreaInsetBottom": props.safeAreaInsetBottom
    }
  }, inherit(ctx, true)]), [Header(), Description(), h("div", {
    "class": action_sheet_bem('content')
  }, [props.actions && props.actions.map(Option), slots.default == null ? void 0 : slots.default()]), CancelText()]);
}

ActionSheet.props = _extends({}, popupMixinProps, {
  title: String,
  actions: Array,
  duration: [Number, String],
  cancelText: String,
  description: String,
  getContainer: [String, Function],
  closeOnPopstate: Boolean,
  closeOnClickAction: Boolean,
  round: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: true
  },
  closeIcon: {
    type: String,
    default: 'cross'
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
});
/* harmony default export */ var action_sheet = (action_sheet_createComponent(ActionSheet));
// CONCATENATED MODULE: ./es/utils/validate/mobile.js
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
// CONCATENATED MODULE: ./es/picker/shared.js
var DEFAULT_ITEM_HEIGHT = 44;
var pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  itemHeight: [Number, String],
  showToolbar: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  allowHtml: {
    type: Boolean,
    default: true
  },
  visibleItemCount: {
    type: [Number, String],
    default: 6
  },
  swipeDuration: {
    type: [Number, String],
    default: 1000
  }
};
// CONCATENATED MODULE: ./es/utils/constant.js
// color
var RED = '#ee0a24'; // border

var BORDER = 'van-hairline';
var BORDER_TOP = BORDER + "--top";
var BORDER_LEFT = BORDER + "--left";
var BORDER_BOTTOM = BORDER + "--bottom";
var BORDER_SURROUND = BORDER + "--surround";
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
// CONCATENATED MODULE: ./es/utils/deep-clone.js

function deepClone(obj) {
  if (!Object(utils["c" /* isDef */])(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return deepClone(item);
    });
  }

  if (typeof obj === 'object') {
    var to = {};
    Object.keys(obj).forEach(function (key) {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }

  return obj;
}
// CONCATENATED MODULE: ./es/utils/format/number.js
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, _char, regExp) {
  var index = value.indexOf(_char);
  var prefix = '';

  if (index === -1) {
    return value;
  }

  if (_char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  if (_char === '.' && value.match(/^(\.|-\.)/)) {
    prefix = index ? '-0' : '0';
  }

  return prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

function number_formatNumber(value, allowDot, allowMinus) {
  if (allowDot === void 0) {
    allowDot = true;
  }

  if (allowMinus === void 0) {
    allowMinus = true;
  }

  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
} // add num and avoid float number

function addNumber(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
// CONCATENATED MODULE: ./es/picker/PickerColumn.js







var DEFAULT_DURATION = 200; // 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动

var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;

var PickerColumn_createNamespace = Object(create["a" /* createNamespace */])('picker-column'),
    PickerColumn_createComponent = PickerColumn_createNamespace[0],
    PickerColumn_bem = PickerColumn_createNamespace[1];

function getElementTranslateY(element) {
  var style = window.getComputedStyle(element);
  var transform = style.transform || style.webkitTransform;
  var translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}

function isOptionDisabled(option) {
  return Object(utils["f" /* isObject */])(option) && option.disabled;
} // use standard WheelEvent:
// https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent


var supportMousewheel = utils["b" /* inBrowser */] && 'onwheel' in window;
var mousewheelTimer = null;
/* harmony default export */ var PickerColumn = (PickerColumn_createComponent({
  mixins: [TouchMixin],
  props: {
    valueKey: String,
    readonly: Boolean,
    allowHtml: Boolean,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    swipeDuration: [Number, String],
    visibleItemCount: [Number, String],
    initialOptions: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      offset: 0,
      duration: 0,
      options: deepClone(this.initialOptions),
      currentIndex: this.defaultIndex
    };
  },
  created: function created() {
    if (this.$parent.children) {
      this.$parent.children.push(this);
    }

    this.setIndex(this.currentIndex);
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);

    if (supportMousewheel) {
      event_on(this.$el, 'wheel', this.onMouseWheel, false);
    }
  },
  destroyed: function destroyed() {
    var children = this.$parent.children;

    if (children) {
      children.splice(children.indexOf(this), 1);
    }

    if (supportMousewheel) {
      off(this.$el, 'wheel');
    }
  },
  watch: {
    initialOptions: 'setOptions',
    defaultIndex: function defaultIndex(val) {
      this.setIndex(val);
    }
  },
  computed: {
    count: function count() {
      return this.options.length;
    },
    baseOffset: function baseOffset() {
      return this.itemHeight * (this.visibleItemCount - 1) / 2;
    }
  },
  methods: {
    setOptions: function setOptions(options) {
      if (JSON.stringify(options) !== JSON.stringify(this.options)) {
        this.options = deepClone(options);
        this.setIndex(this.defaultIndex);
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.readonly) {
        return;
      }

      this.touchStart(event);

      if (this.moving) {
        var translateY = getElementTranslateY(this.$refs.wrapper);
        this.offset = Math.min(0, translateY - this.baseOffset);
        this.startOffset = this.offset;
      } else {
        this.startOffset = this.offset;
      }

      this.duration = 0;
      this.transitionEndTrigger = null;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;
    },
    onTouchMove: function onTouchMove(event) {
      if (this.readonly) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'vertical') {
        this.moving = true;
        preventDefault(event, true);
      }

      this.offset = range(this.startOffset + this.deltaY, -(this.count * this.itemHeight), this.itemHeight);
      var now = Date.now();

      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.readonly) {
        return;
      }

      var distance = this.offset - this.momentumOffset;
      var duration = Date.now() - this.touchStartTime;
      var allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }

      var index = this.getIndexByOffset(this.offset);
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true); // compatible with desktop scenario
      // use setTimeout to skip the click event Emitted after touchstart

      setTimeout(function () {
        _this.moving = false;
      }, 0);
    },
    onMouseWheel: function onMouseWheel(event) {
      var _this2 = this;

      if (this.readonly) {
        return;
      }

      preventDefault(event, true); // simply combine touchstart and touchmove

      var translateY = getElementTranslateY(this.$refs.wrapper);
      this.startOffset = Math.min(0, translateY - this.baseOffset);
      this.momentumOffset = this.startOffset;
      this.transitionEndTrigger = null; // directly use deltaY, see https://caniuse.com/?search=deltaY
      // use deltaY to detect direction for not special setting device
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event

      var deltaY = event.deltaY;

      if (this.startOffset === 0 && deltaY < 0) {
        return;
      } // get offset
      // if necessary, can adjust distance value to make scrolling smoother


      var distance = -deltaY;
      this.offset = range(this.startOffset + distance, -(this.count * this.itemHeight), this.itemHeight);

      if (mousewheelTimer) {
        clearTimeout(mousewheelTimer);
      }

      mousewheelTimer = setTimeout(function () {
        _this2.onTouchEnd();

        _this2.touchStartTime = 0;
      }, MOMENTUM_LIMIT_TIME);
    },
    onTransitionEnd: function onTransitionEnd() {
      this.stopMomentum();
    },
    onClickItem: function onClickItem(index) {
      if (this.moving || this.readonly) {
        return;
      }

      this.transitionEndTrigger = null;
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true);
    },
    adjustIndex: function adjustIndex(index) {
      index = range(index, 0, this.count);

      for (var i = index; i < this.count; i++) {
        if (!isOptionDisabled(this.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!isOptionDisabled(this.options[_i])) return _i;
      }
    },
    getOptionText: function getOptionText(option) {
      if (Object(utils["f" /* isObject */])(option) && this.valueKey in option) {
        return option[this.valueKey];
      }

      return option;
    },
    setIndex: function setIndex(index, emitChange) {
      var _this3 = this;

      index = this.adjustIndex(index) || 0;
      var offset = -index * this.itemHeight;

      var trigger = function trigger() {
        if (index !== _this3.currentIndex) {
          _this3.currentIndex = index;

          if (emitChange) {
            _this3.$emit('change', index);
          }
        }
      }; // trigger the change event after transitionend when moving


      if (this.moving && offset !== this.offset) {
        this.transitionEndTrigger = trigger;
      } else {
        trigger();
      }

      this.offset = offset;
    },
    setValue: function setValue(value) {
      var options = this.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
    },
    getValue: function getValue() {
      return this.options[this.currentIndex];
    },
    getIndexByOffset: function getIndexByOffset(offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    momentum: function momentum(distance, duration) {
      var speed = Math.abs(distance / duration);
      distance = this.offset + speed / 0.003 * (distance < 0 ? -1 : 1);
      var index = this.getIndexByOffset(distance);
      this.duration = +this.swipeDuration;
      this.setIndex(index, true);
    },
    stopMomentum: function stopMomentum() {
      this.moving = false;
      this.duration = 0;

      if (this.transitionEndTrigger) {
        this.transitionEndTrigger();
        this.transitionEndTrigger = null;
      }
    },
    genOptions: function genOptions() {
      var _this4 = this;

      var h = this.$createElement;
      var optionStyle = {
        height: this.itemHeight + "px"
      };
      return this.options.map(function (option, index) {
        var _domProps;

        var text = _this4.getOptionText(option);

        var disabled = isOptionDisabled(option);
        var data = {
          style: optionStyle,
          attrs: {
            role: 'button',
            tabindex: disabled ? -1 : 0
          },
          class: [PickerColumn_bem('item', {
            disabled: disabled,
            selected: index === _this4.currentIndex
          })],
          on: {
            click: function click() {
              _this4.onClickItem(index);
            }
          }
        };
        var childData = {
          class: 'van-ellipsis',
          domProps: (_domProps = {}, _domProps[_this4.allowHtml ? 'innerHTML' : 'textContent'] = text, _domProps)
        };
        return h("li", helper_default()([{}, data]), [_this4.slots('option', option) || h("div", helper_default()([{}, childData]))]);
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(0, " + (this.offset + this.baseOffset) + "px, 0)",
      transitionDuration: this.duration + "ms",
      transitionProperty: this.duration ? 'all' : 'none'
    };
    return h("div", {
      "class": [PickerColumn_bem(), this.className]
    }, [h("ul", {
      "ref": "wrapper",
      "style": wrapperStyle,
      "class": PickerColumn_bem('wrapper'),
      "on": {
        "transitionend": this.onTransitionEnd
      }
    }, [this.genOptions()])]);
  }
}));
// CONCATENATED MODULE: ./es/picker/index.js
 // Utils





 // Components




var picker_createNamespace = Object(create["a" /* createNamespace */])('picker'),
    picker_createComponent = picker_createNamespace[0],
    picker_bem = picker_createNamespace[1],
    t = picker_createNamespace[2];

/* harmony default export */ var es_picker = (picker_createComponent({
  props: _extends({}, pickerProps, {
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  }),
  data: function data() {
    return {
      children: [],
      formattedColumns: []
    };
  },
  computed: {
    itemPxHeight: function itemPxHeight() {
      return this.itemHeight ? Object(unit["b" /* unitToPx */])(this.itemHeight) : DEFAULT_ITEM_HEIGHT;
    },
    dataType: function dataType() {
      var columns = this.columns;
      var firstColumn = columns[0] || {};

      if (firstColumn.children) {
        return 'cascade';
      }

      if (firstColumn.values) {
        return 'object';
      }

      return 'text';
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true
    }
  },
  methods: {
    format: function format() {
      var columns = this.columns,
          dataType = this.dataType;

      if (dataType === 'text') {
        this.formattedColumns = [{
          values: columns
        }];
      } else if (dataType === 'cascade') {
        this.formatCascade();
      } else {
        this.formattedColumns = columns;
      }
    },
    formatCascade: function formatCascade() {
      var formatted = [];
      var cursor = {
        children: this.columns
      };

      while (cursor && cursor.children) {
        var _cursor$defaultIndex;

        var _cursor = cursor,
            children = _cursor.children;
        var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +this.defaultIndex;

        while (children[defaultIndex] && children[defaultIndex].disabled) {
          if (defaultIndex < children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }

        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex: defaultIndex
        });
        cursor = children[defaultIndex];
      }

      this.formattedColumns = formatted;
    },
    emit: function emit(event) {
      var _this = this;

      if (this.dataType === 'text') {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this.valueKey];
          });
        }

        this.$emit(event, values, this.getIndexes());
      }
    },
    onCascadeChange: function onCascadeChange(columnIndex) {
      var cursor = {
        children: this.columns
      };
      var indexes = this.getIndexes();

      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]];
      }

      while (cursor && cursor.children) {
        columnIndex++;
        this.setColumnValues(columnIndex, cursor.children);
        cursor = cursor.children[cursor.defaultIndex || 0];
      }
    },
    onChange: function onChange(columnIndex) {
      var _this2 = this;

      if (this.dataType === 'cascade') {
        this.onCascadeChange(columnIndex);
      }

      if (this.dataType === 'text') {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this2.valueKey];
          });
        }

        this.$emit('change', this, values, columnIndex);
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // @exposed-api
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // @exposed-api
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);

      if (column) {
        column.setValue(value);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(index);
        }
      }
    },
    // @exposed-api
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // @exposed-api
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(columnIndex);
        }
      }
    },
    // @exposed-api
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // @exposed-api
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column) {
        column.setOptions(options);
      }
    },
    // @exposed-api
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // @exposed-api
    // set values of all columns
    setValues: function setValues(values) {
      var _this3 = this;

      values.forEach(function (value, index) {
        _this3.setColumnValue(index, value);
      });
    },
    // @exposed-api
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.currentIndex;
      });
    },
    // @exposed-api
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this4 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this4.setColumnIndex(columnIndex, optionIndex);
      });
    },
    // @exposed-api
    confirm: function confirm() {
      this.children.forEach(function (child) {
        return child.stopMomentum();
      });
      this.emit('confirm');
    },
    cancel: function cancel() {
      this.emit('cancel');
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var titleSlot = this.slots('title');

      if (titleSlot) {
        return titleSlot;
      }

      if (this.title) {
        return h("div", {
          "class": ['van-ellipsis', picker_bem('title')]
        }, [this.title]);
      }
    },
    genCancel: function genCancel() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button"
        },
        "class": picker_bem('cancel'),
        "on": {
          "click": this.cancel
        }
      }, [this.slots('cancel') || this.cancelButtonText || t('cancel')]);
    },
    genConfirm: function genConfirm() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button"
        },
        "class": picker_bem('confirm'),
        "on": {
          "click": this.confirm
        }
      }, [this.slots('confirm') || this.confirmButtonText || t('confirm')]);
    },
    genToolbar: function genToolbar() {
      var h = this.$createElement;

      if (this.showToolbar) {
        return h("div", {
          "class": picker_bem('toolbar')
        }, [this.slots() || [this.genCancel(), this.genTitle(), this.genConfirm()]]);
      }
    },
    genColumns: function genColumns() {
      var h = this.$createElement;
      var itemPxHeight = this.itemPxHeight;
      var wrapHeight = itemPxHeight * this.visibleItemCount;
      var frameStyle = {
        height: itemPxHeight + "px"
      };
      var columnsStyle = {
        height: wrapHeight + "px"
      };
      var maskStyle = {
        backgroundSize: "100% " + (wrapHeight - itemPxHeight) / 2 + "px"
      };
      return h("div", {
        "class": picker_bem('columns'),
        "style": columnsStyle,
        "on": {
          "touchmove": preventDefault
        }
      }, [this.genColumnItems(), h("div", {
        "class": picker_bem('mask'),
        "style": maskStyle
      }), h("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, picker_bem('frame')],
        "style": frameStyle
      })]);
    },
    genColumnItems: function genColumnItems() {
      var _this5 = this;

      var h = this.$createElement;
      return this.formattedColumns.map(function (item, columnIndex) {
        var _item$defaultIndex;

        return h(PickerColumn, {
          "attrs": {
            "readonly": _this5.readonly,
            "valueKey": _this5.valueKey,
            "allowHtml": _this5.allowHtml,
            "className": item.className,
            "itemHeight": _this5.itemPxHeight,
            "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +_this5.defaultIndex,
            "swipeDuration": _this5.swipeDuration,
            "visibleItemCount": _this5.visibleItemCount,
            "initialOptions": item.values
          },
          "scopedSlots": {
            option: _this5.$scopedSlots.option
          },
          "on": {
            "change": function change() {
              _this5.onChange(columnIndex);
            }
          }
        });
      });
    }
  },
  render: function render(h) {
    return h("div", {
      "class": picker_bem()
    }, [this.toolbarPosition === 'top' ? this.genToolbar() : h(), this.loading ? h(es_loading, {
      "class": picker_bem('loading')
    }) : h(), this.slots('columns-top'), this.genColumns(), this.slots('columns-bottom'), this.toolbarPosition === 'bottom' ? this.genToolbar() : h()]);
  }
}));
// CONCATENATED MODULE: ./es/area/index.js





var area_createNamespace = Object(create["a" /* createNamespace */])('area'),
    area_createComponent = area_createNamespace[0],
    area_bem = area_createNamespace[1];

var PLACEHOLDER_CODE = '000000';

function isOverseaCode(code) {
  return code[0] === '9';
}

function pickSlots(instance, keys) {
  var $slots = instance.$slots,
      $scopedSlots = instance.$scopedSlots;
  var scopedSlots = {};
  keys.forEach(function (key) {
    if ($scopedSlots[key]) {
      scopedSlots[key] = $scopedSlots[key];
    } else if ($slots[key]) {
      scopedSlots[key] = function () {
        return $slots[key];
      };
    }
  });
  return scopedSlots;
}

/* harmony default export */ var es_area = (area_createComponent({
  props: _extends({}, pickerProps, {
    value: String,
    areaList: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    columnsNum: {
      type: [Number, String],
      default: 3
    },
    isOverseaCode: {
      type: Function,
      default: isOverseaCode
    },
    columnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }),
  data: function data() {
    return {
      code: this.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    };
  },
  computed: {
    province: function province() {
      return this.areaList.province_list || {};
    },
    city: function city() {
      return this.areaList.city_list || {};
    },
    county: function county() {
      return this.areaList.county_list || {};
    },
    displayColumns: function displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    },
    placeholderMap: function placeholderMap() {
      return {
        province: this.columnsPlaceholder[0] || '',
        city: this.columnsPlaceholder[1] || '',
        county: this.columnsPlaceholder[2] || ''
      };
    }
  },
  watch: {
    value: function value(val) {
      this.code = val;
      this.setValues();
    },
    areaList: {
      deep: true,
      handler: 'setValues'
    },
    columnsNum: function columnsNum() {
      var _this = this;

      this.$nextTick(function () {
        _this.setValues();
      });
    }
  },
  mounted: function mounted() {
    this.setValues();
  },
  methods: {
    // get list by code
    getList: function getList(type, code) {
      var result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      var list = this[type];
      result = Object.keys(list).map(function (listCode) {
        return {
          code: listCode,
          name: list[listCode]
        };
      });

      if (code) {
        // oversea code
        if (this.isOverseaCode(code) && type === 'city') {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      if (this.placeholderMap[type] && result.length) {
        // set columns placeholder
        var codeFill = '';

        if (type === 'city') {
          codeFill = PLACEHOLDER_CODE.slice(2, 4);
        } else if (type === 'county') {
          codeFill = PLACEHOLDER_CODE.slice(4, 6);
        }

        result.unshift({
          code: "" + code + codeFill,
          name: this.placeholderMap[type]
        });
      }

      return result;
    },
    // get index by code
    getIndex: function getIndex(type, code) {
      var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2)); // oversea code

      if (this.isOverseaCode(code) && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    // parse output columns data
    parseOutputValues: function parseOutputValues(values) {
      var _this2 = this;

      return values.map(function (value, index) {
        // save undefined value
        if (!value) return value;
        value = JSON.parse(JSON.stringify(value));

        if (!value.code || value.name === _this2.columnsPlaceholder[index]) {
          value.code = '';
          value.name = '';
        }

        return value;
      });
    },
    onChange: function onChange(picker, values, index) {
      this.code = values[index].code;
      this.setValues();
      var parsedValues = this.parseOutputValues(picker.getValues());
      this.$emit('change', picker, parsedValues, index);
    },
    onConfirm: function onConfirm(values, index) {
      values = this.parseOutputValues(values);
      this.setValues();
      this.$emit('confirm', values, index);
    },
    getDefaultCode: function getDefaultCode() {
      if (this.columnsPlaceholder.length) {
        return PLACEHOLDER_CODE;
      }

      var countyCodes = Object.keys(this.county);

      if (countyCodes[0]) {
        return countyCodes[0];
      }

      var cityCodes = Object.keys(this.city);

      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    },
    setValues: function setValues() {
      var code = this.code;

      if (!code) {
        code = this.getDefaultCode();
      }

      var picker = this.$refs.picker;
      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));

      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (city.length && code.slice(2, 4) === '00' && !this.isOverseaCode(code)) {
        code = city[0].code;
      }

      picker.setColumnValues(2, this.getList('county', code.slice(0, 4)));
      picker.setIndexes([this.getIndex('province', code), this.getIndex('city', code), this.getIndex('county', code)]);
    },
    getValues: function getValues() {
      var picker = this.$refs.picker;
      var getValues = picker ? picker.getValues().filter(function (value) {
        return !!value;
      }) : [];
      getValues = this.parseOutputValues(getValues);
      return getValues;
    },
    getArea: function getArea() {
      var values = this.getValues();
      var area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: ''
      };

      if (!values.length) {
        return area;
      }

      var names = values.map(function (item) {
        return item.name;
      });
      var validValues = values.filter(function (value) {
        return !!value.code;
      });
      area.code = validValues.length ? validValues[validValues.length - 1].code : '';

      if (this.isOverseaCode(area.code)) {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    },
    // @exposed-api
    reset: function reset(code) {
      this.code = code || '';
      this.setValues();
    }
  },
  render: function render() {
    var h = arguments[0];

    var on = _extends({}, this.$listeners, {
      change: this.onChange,
      confirm: this.onConfirm
    });

    return h(es_picker, {
      "ref": "picker",
      "class": area_bem(),
      "attrs": {
        "showToolbar": true,
        "valueKey": "name",
        "title": this.title,
        "columns": this.displayColumns,
        "loading": this.loading,
        "readonly": this.readonly,
        "itemHeight": this.itemHeight,
        "swipeDuration": this.swipeDuration,
        "visibleItemCount": this.visibleItemCount,
        "cancelButtonText": this.cancelButtonText,
        "confirmButtonText": this.confirmButtonText
      },
      "scopedSlots": pickSlots(this, ['title', 'columns-top', 'columns-bottom']),
      "on": _extends({}, on)
    });
  }
}));
// CONCATENATED MODULE: ./es/utils/router.js
/**
 * Vue Router support
 */
function isRedundantNavigation(err) {
  return err.name === 'NavigationDuplicated' || // compatible with vue-router@3.3
  err.message && err.message.indexOf('redundant navigation') !== -1;
}

function route(router, config) {
  var to = config.to,
      url = config.url,
      replace = config.replace;

  if (to && router) {
    var promise = router[replace ? 'replace' : 'push'](to);
    /* istanbul ignore else */

    if (promise && promise.catch) {
      promise.catch(function (err) {
        if (err && !isRedundantNavigation(err)) {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function functionalRoute(context) {
  route(context.parent && context.parent.$router, context.props);
}
var routeProps = {
  url: String,
  replace: Boolean,
  to: [String, Object]
};
// CONCATENATED MODULE: ./es/cell/shared.js
var cellProps = {
  icon: String,
  size: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  iconPrefix: String,
  titleStyle: null,
  titleClass: null,
  valueClass: null,
  labelClass: null,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  arrowDirection: String,
  border: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: null
  }
};
// CONCATENATED MODULE: ./es/cell/index.js

 // Utils




 // Components

 // Types

var cell_createNamespace = Object(create["a" /* createNamespace */])('cell'),
    cell_createComponent = cell_createNamespace[0],
    cell_bem = cell_createNamespace[1];

function Cell(h, props, slots, ctx) {
  var _props$clickable;

  var icon = props.icon,
      size = props.size,
      title = props.title,
      label = props.label,
      value = props.value,
      isLink = props.isLink;
  var showTitle = slots.title || Object(utils["c" /* isDef */])(title);

  function Label() {
    var showLabel = slots.label || Object(utils["c" /* isDef */])(label);

    if (showLabel) {
      return h("div", {
        "class": [cell_bem('label'), props.labelClass]
      }, [slots.label ? slots.label() : label]);
    }
  }

  function Title() {
    if (showTitle) {
      return h("div", {
        "class": [cell_bem('title'), props.titleClass],
        "style": props.titleStyle
      }, [slots.title ? slots.title() : h("span", [title]), Label()]);
    }
  }

  function Value() {
    var showValue = slots.default || Object(utils["c" /* isDef */])(value);

    if (showValue) {
      return h("div", {
        "class": [cell_bem('value', {
          alone: !showTitle
        }), props.valueClass]
      }, [slots.default ? slots.default() : h("span", [value])]);
    }
  }

  function LeftIcon() {
    if (slots.icon) {
      return slots.icon();
    }

    if (icon) {
      return h(es_icon, {
        "class": cell_bem('left-icon'),
        "attrs": {
          "name": icon,
          "classPrefix": props.iconPrefix
        }
      });
    }
  }

  function RightIcon() {
    var rightIconSlot = slots['right-icon'];

    if (rightIconSlot) {
      return rightIconSlot();
    }

    if (isLink) {
      var arrowDirection = props.arrowDirection;
      return h(es_icon, {
        "class": cell_bem('right-icon'),
        "attrs": {
          "name": arrowDirection ? "arrow-" + arrowDirection : 'arrow'
        }
      });
    }
  }

  function onClick(event) {
    functional_emit(ctx, 'click', event);
    functionalRoute(ctx);
  }

  var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : isLink;
  var classes = {
    clickable: clickable,
    center: props.center,
    required: props.required,
    borderless: !props.border
  };

  if (size) {
    classes[size] = size;
  }

  return h("div", helper_default()([{
    "class": cell_bem(classes),
    "attrs": {
      "role": clickable ? 'button' : null,
      "tabindex": clickable ? 0 : null
    },
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [LeftIcon(), Title(), Value(), RightIcon(), slots.extra == null ? void 0 : slots.extra()]);
}

Cell.props = _extends({}, cellProps, routeProps);
/* harmony default export */ var cell = (cell_createComponent(Cell));
// CONCATENATED MODULE: ./es/utils/validate/system.js

function isAndroid() {
  /* istanbul ignore next */
  return utils["h" /* isServer */] ? false : /android/.test(navigator.userAgent.toLowerCase());
}
function isIOS() {
  /* istanbul ignore next */
  return utils["h" /* isServer */] ? false : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
// CONCATENATED MODULE: ./es/utils/dom/reset-scroll.js
/**
 * Hack for iOS12 page scroll
 * https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
 */


var reset_scroll_isIOS = isIOS();
/* istanbul ignore next */

function resetScroll() {
  if (reset_scroll_isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
// CONCATENATED MODULE: ./es/field/index.js


 // Utils





 // Components





var field_createNamespace = Object(create["a" /* createNamespace */])('field'),
    field_createComponent = field_createNamespace[0],
    field_bem = field_createNamespace[1];

/* harmony default export */ var es_field = (field_createComponent({
  inheritAttrs: false,
  provide: function provide() {
    return {
      vanField: this
    };
  },
  inject: {
    vanForm: {
      default: null
    }
  },
  props: _extends({}, cellProps, {
    name: String,
    rules: Array,
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    },
    autosize: [Boolean, Object],
    leftIcon: String,
    rightIcon: String,
    clearable: Boolean,
    formatter: Function,
    maxlength: [Number, String],
    labelWidth: [Number, String],
    labelClass: null,
    labelAlign: String,
    inputAlign: String,
    placeholder: String,
    errorMessage: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    value: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: Boolean,
      default: null
    },
    colon: {
      type: Boolean,
      default: null
    },
    clearTrigger: {
      type: String,
      default: 'focus'
    },
    formatTrigger: {
      type: String,
      default: 'onChange'
    }
  }),
  data: function data() {
    return {
      focused: false,
      validateFailed: false,
      validateMessage: ''
    };
  },
  watch: {
    value: function value() {
      this.updateValue(this.value);
      this.resetValidation();
      this.validateWithTrigger('onChange');
      this.$nextTick(this.adjustSize);
    }
  },
  mounted: function mounted() {
    this.updateValue(this.value, this.formatTrigger);
    this.$nextTick(this.adjustSize);

    if (this.vanForm) {
      this.vanForm.addField(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.vanForm) {
      this.vanForm.removeField(this);
    }
  },
  computed: {
    showClear: function showClear() {
      var readonly = this.getProp('readonly');

      if (this.clearable && !readonly) {
        var hasValue = Object(utils["c" /* isDef */])(this.value) && this.value !== '';
        var trigger = this.clearTrigger === 'always' || this.clearTrigger === 'focus' && this.focused;
        return hasValue && trigger;
      }
    },
    showError: function showError() {
      if (this.error !== null) {
        return this.error;
      }

      if (this.vanForm && this.vanForm.showError && this.validateFailed) {
        return true;
      }
    },
    listeners: function listeners() {
      return _extends({}, this.$listeners, {
        blur: this.onBlur,
        focus: this.onFocus,
        input: this.onInput,
        click: this.onClickInput,
        keypress: this.onKeypress
      });
    },
    labelStyle: function labelStyle() {
      var labelWidth = this.getProp('labelWidth');

      if (labelWidth) {
        return {
          width: Object(unit["a" /* addUnit */])(labelWidth)
        };
      }
    },
    formValue: function formValue() {
      if (this.children && (this.$scopedSlots.input || this.$slots.input)) {
        return this.children.value;
      }

      return this.value;
    }
  },
  methods: {
    // @exposed-api
    focus: function focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    // @exposed-api
    blur: function blur() {
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    runValidator: function runValidator(value, rule) {
      return new Promise(function (resolve) {
        var returnVal = rule.validator(value, rule);

        if (Object(utils["g" /* isPromise */])(returnVal)) {
          return returnVal.then(resolve);
        }

        resolve(returnVal);
      });
    },
    isEmptyValue: function isEmptyValue(value) {
      if (Array.isArray(value)) {
        return !value.length;
      }

      if (value === 0) {
        return false;
      }

      return !value;
    },
    runSyncRule: function runSyncRule(value, rule) {
      if (rule.required && this.isEmptyValue(value)) {
        return false;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return false;
      }

      return true;
    },
    getRuleMessage: function getRuleMessage(value, rule) {
      var message = rule.message;

      if (Object(utils["e" /* isFunction */])(message)) {
        return message(value, rule);
      }

      return message;
    },
    runRules: function runRules(rules) {
      var _this = this;

      return rules.reduce(function (promise, rule) {
        return promise.then(function () {
          if (_this.validateFailed) {
            return;
          }

          var value = _this.formValue;

          if (rule.formatter) {
            value = rule.formatter(value, rule);
          }

          if (!_this.runSyncRule(value, rule)) {
            _this.validateFailed = true;
            _this.validateMessage = _this.getRuleMessage(value, rule);
            return;
          }

          if (rule.validator) {
            return _this.runValidator(value, rule).then(function (result) {
              if (result === false) {
                _this.validateFailed = true;
                _this.validateMessage = _this.getRuleMessage(value, rule);
              }
            });
          }
        });
      }, Promise.resolve());
    },
    validate: function validate(rules) {
      var _this2 = this;

      if (rules === void 0) {
        rules = this.rules;
      }

      return new Promise(function (resolve) {
        if (!rules) {
          resolve();
        }

        _this2.resetValidation();

        _this2.runRules(rules).then(function () {
          if (_this2.validateFailed) {
            resolve({
              name: _this2.name,
              message: _this2.validateMessage
            });
          } else {
            resolve();
          }
        });
      });
    },
    validateWithTrigger: function validateWithTrigger(trigger) {
      if (this.vanForm && this.rules) {
        var defaultTrigger = this.vanForm.validateTrigger === trigger;
        var rules = this.rules.filter(function (rule) {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });

        if (rules.length) {
          this.validate(rules);
        }
      }
    },
    resetValidation: function resetValidation() {
      if (this.validateFailed) {
        this.validateFailed = false;
        this.validateMessage = '';
      }
    },
    updateValue: function updateValue(value, trigger) {
      if (trigger === void 0) {
        trigger = 'onChange';
      }

      value = Object(utils["c" /* isDef */])(value) ? String(value) : ''; // native maxlength have incorrect line-break counting
      // see: https://github.com/youzan/vant/issues/5033

      var maxlength = this.maxlength;

      if (Object(utils["c" /* isDef */])(maxlength) && value.length > maxlength) {
        if (this.value && this.value.length === +maxlength) {
          value = this.value;
        } else {
          value = value.slice(0, maxlength);
        }
      }

      if (this.type === 'number' || this.type === 'digit') {
        var isNumber = this.type === 'number';
        value = number_formatNumber(value, isNumber, isNumber);
      }

      if (this.formatter && trigger === this.formatTrigger) {
        value = this.formatter(value);
      }

      var input = this.$refs.input;

      if (input && value !== input.value) {
        input.value = value;
      }

      if (value !== this.value) {
        this.$emit('input', value);
      }
    },
    onInput: function onInput(event) {
      // not update v-model when composing
      if (event.target.composing) {
        return;
      }

      this.updateValue(event.target.value);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event); // https://github.com/youzan/vant/issues/9715

      this.$nextTick(this.adjustSize); // readonly not work in legacy mobile safari

      /* istanbul ignore if */

      if (this.getProp('readonly')) {
        this.blur();
      }
    },
    onBlur: function onBlur(event) {
      if (this.getProp('readonly')) {
        return;
      }

      this.focused = false;
      this.updateValue(this.value, 'onBlur');
      this.$emit('blur', event);
      this.validateWithTrigger('onBlur');
      this.$nextTick(this.adjustSize);
      resetScroll();
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    },
    onClickInput: function onClickInput(event) {
      this.$emit('click-input', event);
    },
    onClickLeftIcon: function onClickLeftIcon(event) {
      this.$emit('click-left-icon', event);
    },
    onClickRightIcon: function onClickRightIcon(event) {
      this.$emit('click-right-icon', event);
    },
    onClear: function onClear(event) {
      preventDefault(event);
      this.$emit('input', '');
      this.$emit('clear', event);
    },
    onKeypress: function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = this.getProp('submitOnEnter');

        if (!submitOnEnter && this.type !== 'textarea') {
          preventDefault(event);
        } // trigger blur after click keyboard search button


        if (this.type === 'search') {
          this.blur();
        }
      }

      this.$emit('keypress', event);
    },
    adjustSize: function adjustSize() {
      var input = this.$refs.input;

      if (!(this.type === 'textarea' && this.autosize) || !input) {
        return;
      }

      var scrollTop = getRootScrollTop();
      input.style.height = 'auto';
      var height = input.scrollHeight;

      if (Object(utils["f" /* isObject */])(this.autosize)) {
        var _this$autosize = this.autosize,
            maxHeight = _this$autosize.maxHeight,
            minHeight = _this$autosize.minHeight;

        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }

        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = height + 'px'; // https://github.com/youzan/vant/issues/9178

        setRootScrollTop(scrollTop);
      }
    },
    genInput: function genInput() {
      var h = this.$createElement;
      var type = this.type;
      var disabled = this.getProp('disabled');
      var readonly = this.getProp('readonly');
      var inputSlot = this.slots('input');
      var inputAlign = this.getProp('inputAlign');

      if (inputSlot) {
        return h("div", {
          "class": field_bem('control', [inputAlign, 'custom']),
          "on": {
            "click": this.onClickInput
          }
        }, [inputSlot]);
      }

      var inputProps = {
        ref: 'input',
        class: field_bem('control', inputAlign),
        domProps: {
          value: this.value
        },
        attrs: _extends({}, this.$attrs, {
          name: this.name,
          disabled: disabled,
          readonly: readonly,
          placeholder: this.placeholder
        }),
        on: this.listeners,
        // add model directive to skip IME composition
        directives: [{
          name: 'model',
          value: this.value
        }]
      };

      if (type === 'textarea') {
        return h("textarea", helper_default()([{}, inputProps]));
      }

      var inputType = type;
      var inputMode; // type="number" is weird in iOS, and can't prevent dot in Android
      // so use inputmode to set keyboard in modern browsers

      if (type === 'number') {
        inputType = 'text';
        inputMode = 'decimal';
      }

      if (type === 'digit') {
        inputType = 'tel';
        inputMode = 'numeric';
      }

      return h("input", helper_default()([{
        "attrs": {
          "type": inputType,
          "inputmode": inputMode
        }
      }, inputProps]));
    },
    genLeftIcon: function genLeftIcon() {
      var h = this.$createElement;
      var showLeftIcon = this.slots('left-icon') || this.leftIcon;

      if (showLeftIcon) {
        return h("div", {
          "class": field_bem('left-icon'),
          "on": {
            "click": this.onClickLeftIcon
          }
        }, [this.slots('left-icon') || h(es_icon, {
          "attrs": {
            "name": this.leftIcon,
            "classPrefix": this.iconPrefix
          }
        })]);
      }
    },
    genRightIcon: function genRightIcon() {
      var h = this.$createElement;
      var slots = this.slots;
      var showRightIcon = slots('right-icon') || this.rightIcon;

      if (showRightIcon) {
        return h("div", {
          "class": field_bem('right-icon'),
          "on": {
            "click": this.onClickRightIcon
          }
        }, [slots('right-icon') || h(es_icon, {
          "attrs": {
            "name": this.rightIcon,
            "classPrefix": this.iconPrefix
          }
        })]);
      }
    },
    genWordLimit: function genWordLimit() {
      var h = this.$createElement;

      if (this.showWordLimit && this.maxlength) {
        var count = (this.value || '').length;
        return h("div", {
          "class": field_bem('word-limit')
        }, [h("span", {
          "class": field_bem('word-num')
        }, [count]), "/", this.maxlength]);
      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;

      if (this.vanForm && this.vanForm.showErrorMessage === false) {
        return;
      }

      var message = this.errorMessage || this.validateMessage;

      if (message) {
        var errorMessageAlign = this.getProp('errorMessageAlign');
        return h("div", {
          "class": field_bem('error-message', errorMessageAlign)
        }, [message]);
      }
    },
    getProp: function getProp(key) {
      if (Object(utils["c" /* isDef */])(this[key])) {
        return this[key];
      }

      if (this.vanForm && Object(utils["c" /* isDef */])(this.vanForm[key])) {
        return this.vanForm[key];
      }
    },
    genLabel: function genLabel() {
      var h = this.$createElement;
      var colon = this.getProp('colon') ? ':' : '';

      if (this.slots('label')) {
        return [this.slots('label'), colon];
      }

      if (this.label) {
        return h("span", [this.label + colon]);
      }
    }
  },
  render: function render() {
    var _bem;

    var h = arguments[0];
    var slots = this.slots;
    var disabled = this.getProp('disabled');
    var labelAlign = this.getProp('labelAlign');
    var scopedSlots = {
      icon: this.genLeftIcon
    };
    var Label = this.genLabel();

    if (Label) {
      scopedSlots.title = function () {
        return Label;
      };
    }

    var extra = this.slots('extra');

    if (extra) {
      scopedSlots.extra = function () {
        return extra;
      };
    }

    return h(cell, {
      "attrs": {
        "icon": this.leftIcon,
        "size": this.size,
        "center": this.center,
        "border": this.border,
        "isLink": this.isLink,
        "required": this.required,
        "clickable": this.clickable,
        "titleStyle": this.labelStyle,
        "valueClass": field_bem('value'),
        "titleClass": [field_bem('label', labelAlign), this.labelClass],
        "arrowDirection": this.arrowDirection
      },
      "scopedSlots": scopedSlots,
      "class": field_bem((_bem = {
        error: this.showError,
        disabled: disabled
      }, _bem["label-" + labelAlign] = labelAlign, _bem['min-height'] = this.type === 'textarea' && !this.autosize, _bem)),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": field_bem('body')
    }, [this.genInput(), this.showClear && h(es_icon, {
      "attrs": {
        "name": "clear"
      },
      "class": field_bem('clear'),
      "on": {
        "touchstart": this.onClear
      }
    }), this.genRightIcon(), slots('button') && h("div", {
      "class": field_bem('button')
    }, [slots('button')])]), this.genWordLimit(), this.genMessage()]);
  }
}));
// CONCATENATED MODULE: ./es/toast/lock-click.js
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('van-toast--unclickable');
    }

    lockCount++;
  } else {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('van-toast--unclickable');
    }
  }
}
// CONCATENATED MODULE: ./es/toast/Toast.js
// Utils

 // Mixins

 // Components




var Toast_createNamespace = Object(create["a" /* createNamespace */])('toast'),
    Toast_createComponent = Toast_createNamespace[0],
    Toast_bem = Toast_createNamespace[1];

/* harmony default export */ var Toast = (Toast_createComponent({
  mixins: [PopupMixin()],
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    transition: {
      type: String,
      default: 'van-fade'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      clickable: false
    };
  },
  mounted: function mounted() {
    this.toggleClickable();
  },
  destroyed: function destroyed() {
    this.toggleClickable();
  },
  watch: {
    value: 'toggleClickable',
    forbidClick: 'toggleClickable'
  },
  methods: {
    onClick: function onClick() {
      if (this.closeOnClick) {
        this.close();
      }
    },
    toggleClickable: function toggleClickable() {
      var clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },

    /* istanbul ignore next */
    onAfterEnter: function onAfterEnter() {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },
    onAfterLeave: function onAfterLeave() {
      this.$emit('closed');
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var icon = this.icon,
          type = this.type,
          iconPrefix = this.iconPrefix,
          loadingType = this.loadingType;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return h(es_icon, {
          "class": Toast_bem('icon'),
          "attrs": {
            "classPrefix": iconPrefix,
            "name": icon || type
          }
        });
      }

      if (type === 'loading') {
        return h(es_loading, {
          "class": Toast_bem('loading'),
          "attrs": {
            "type": loadingType
          }
        });
      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;
      var type = this.type,
          message = this.message;

      if (!Object(utils["c" /* isDef */])(message) || message === '') {
        return;
      }

      if (type === 'html') {
        return h("div", {
          "class": Toast_bem('text'),
          "domProps": {
            "innerHTML": message
          }
        });
      }

      return h("div", {
        "class": Toast_bem('text')
      }, [message]);
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterEnter": this.onAfterEnter,
        "afterLeave": this.onAfterLeave
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [Toast_bem([this.position, (_ref = {}, _ref[this.type] = !this.icon, _ref)]), this.className],
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.genMessage()])]);
  }
}));
// CONCATENATED MODULE: ./es/toast/index.js





var toast_defaultOptions = {
  icon: '',
  type: 'text',
  // @deprecated
  mask: false,
  value: true,
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  getContainer: 'body',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
}; // default options of specific type

var defaultOptionsMap = {};
var queue = [];
var toast_multiple = false;

var currentOptions = _extends({}, toast_defaultOptions);

function parseOptions(message) {
  if (Object(utils["f" /* isObject */])(message)) {
    return message;
  }

  return {
    message: message
  };
}

function isInDocument(element) {
  return document.body.contains(element);
}

function createInstance() {
  /* istanbul ignore if */
  if (utils["h" /* isServer */]) {
    return {};
  }

  queue = queue.filter(function (item) {
    return !item.$el.parentNode || isInDocument(item.$el);
  });

  if (!queue.length || toast_multiple) {
    var toast = new (external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend(Toast))({
      el: document.createElement('div')
    });
    toast.$on('input', function (value) {
      toast.value = value;
    });
    queue.push(toast);
  }

  return queue[queue.length - 1];
} // transform toast options to popup props


function transformOptions(options) {
  return _extends({}, options, {
    overlay: options.mask || options.overlay,
    mask: undefined,
    duration: undefined
  });
}

function toast_Toast(options) {
  if (options === void 0) {
    options = {};
  }

  var toast = createInstance(); // should add z-index if previous toast has not disappeared

  if (toast.value) {
    toast.updateZIndex();
  }

  options = parseOptions(options);
  options = _extends({}, currentOptions, defaultOptionsMap[options.type || currentOptions.type], options);

  if (false) {}

  options.clear = function () {
    toast.value = false;

    if (options.onClose) {
      options.onClose();
      options.onClose = null;
    }

    if (toast_multiple && !utils["h" /* isServer */]) {
      toast.$on('closed', function () {
        clearTimeout(toast.timer);
        queue = queue.filter(function (item) {
          return item !== toast;
        });
        removeNode(toast.$el);
        toast.$destroy();
      });
    }
  };

  _extends(toast, transformOptions(options));

  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
    }, options.duration);
  }

  return toast;
}

var toast_createMethod = function createMethod(type) {
  return function (options) {
    return toast_Toast(_extends({
      type: type
    }, parseOptions(options)));
  };
};

['loading', 'success', 'fail'].forEach(function (method) {
  toast_Toast[method] = toast_createMethod(method);
});

toast_Toast.clear = function (all) {
  if (queue.length) {
    if (all) {
      queue.forEach(function (toast) {
        toast.clear();
      });
      queue = [];
    } else if (!toast_multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

toast_Toast.setDefaultOptions = function (type, options) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    _extends(currentOptions, type);
  }
};

toast_Toast.resetDefaultOptions = function (type) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = _extends({}, toast_defaultOptions);
    defaultOptionsMap = {};
  }
};

toast_Toast.allowMultiple = function (value) {
  if (value === void 0) {
    value = true;
  }

  toast_multiple = value;
};

toast_Toast.install = function () {
  external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.use(Toast);
};

external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.prototype.$toast = toast_Toast;
/* harmony default export */ var es_toast = (toast_Toast);
// CONCATENATED MODULE: ./es/button/index.js

 // Utils




 // Components


 // Types

var button_createNamespace = Object(create["a" /* createNamespace */])('button'),
    button_createComponent = button_createNamespace[0],
    button_bem = button_createNamespace[1];

function Button(h, props, slots, ctx) {
  var _ref;

  var tag = props.tag,
      icon = props.icon,
      type = props.type,
      color = props.color,
      plain = props.plain,
      disabled = props.disabled,
      loading = props.loading,
      hairline = props.hairline,
      loadingText = props.loadingText,
      iconPosition = props.iconPosition;
  var style = {};

  if (color) {
    style.color = plain ? color : 'white';

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color;
    } // hide border when color is linear-gradient


    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  function onClick(event) {
    if (props.loading) {
      event.preventDefault();
    }

    if (!loading && !disabled) {
      functional_emit(ctx, 'click', event);
      functionalRoute(ctx);
    }
  }

  function onTouchstart(event) {
    functional_emit(ctx, 'touchstart', event);
  }

  var classes = [button_bem([type, props.size, {
    plain: plain,
    loading: loading,
    disabled: disabled,
    hairline: hairline,
    block: props.block,
    round: props.round,
    square: props.square
  }]), (_ref = {}, _ref[BORDER_SURROUND] = hairline, _ref)];

  function renderIcon() {
    if (loading) {
      return slots.loading ? slots.loading() : h(es_loading, {
        "class": button_bem('loading'),
        "attrs": {
          "size": props.loadingSize,
          "type": props.loadingType,
          "color": "currentColor"
        }
      });
    }

    if (slots.icon) {
      return h("div", {
        "class": button_bem('icon')
      }, [slots.icon()]);
    }

    if (icon) {
      return h(es_icon, {
        "attrs": {
          "name": icon,
          "classPrefix": props.iconPrefix
        },
        "class": button_bem('icon')
      });
    }
  }

  function renderContent() {
    var content = [];

    if (iconPosition === 'left') {
      content.push(renderIcon());
    }

    var text;

    if (loading) {
      text = loadingText;
    } else {
      text = slots.default ? slots.default() : props.text;
    }

    if (text) {
      content.push(h("span", {
        "class": button_bem('text')
      }, [text]));
    }

    if (iconPosition === 'right') {
      content.push(renderIcon());
    }

    return content;
  }

  return h(tag, helper_default()([{
    "style": style,
    "class": classes,
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled
    },
    "on": {
      "click": onClick,
      "touchstart": onTouchstart
    }
  }, inherit(ctx)]), [h("div", {
    "class": button_bem('content')
  }, [renderContent()])]);
}

Button.props = _extends({}, routeProps, {
  text: String,
  icon: String,
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: String,
  loadingText: String,
  loadingType: String,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  },
  iconPosition: {
    type: String,
    default: 'left'
  }
});
/* harmony default export */ var es_button = (button_createComponent(Button));
// CONCATENATED MODULE: ./es/utils/vnodes.js
function flattenVNodes(vnodes) {
  var result = [];

  function traverse(vnodes) {
    vnodes.forEach(function (vnode) {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map(function (item) {
          return item.$vnode;
        }));
      }

      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
} // sort children instances by vnodes order


function sortChildren(children, parent) {
  var componentOptions = parent.$vnode.componentOptions;

  if (!componentOptions || !componentOptions.children) {
    return;
  }

  var vnodes = flattenVNodes(componentOptions.children);
  children.sort(function (a, b) {
    return vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode);
  });
}
// CONCATENATED MODULE: ./es/mixins/relation.js

function ChildrenMixin(_parent, options) {
  var _inject, _computed;

  if (options === void 0) {
    options = {};
  }

  var indexKey = options.indexKey || 'index';
  return {
    inject: (_inject = {}, _inject[_parent] = {
      default: null
    }, _inject),
    computed: (_computed = {
      parent: function parent() {
        if (this.disableBindRelation) {
          return null;
        }

        return this[_parent];
      }
    }, _computed[indexKey] = function () {
      this.bindRelation();

      if (this.parent) {
        return this.parent.children.indexOf(this);
      }

      return null;
    }, _computed),
    watch: {
      disableBindRelation: function disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      }
    },
    mounted: function mounted() {
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;

      if (this.parent) {
        this.parent.children = this.parent.children.filter(function (item) {
          return item !== _this;
        });
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }

        var children = [].concat(this.parent.children, [this]);
        sortChildren(children, this.parent);
        this.parent.children = children;
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide: function provide() {
      var _ref;

      return _ref = {}, _ref[parent] = this, _ref;
    },
    data: function data() {
      return {
        children: []
      };
    }
  };
}
// CONCATENATED MODULE: ./es/goods-action/index.js



var goods_action_createNamespace = Object(create["a" /* createNamespace */])('goods-action'),
    goods_action_createComponent = goods_action_createNamespace[0],
    goods_action_bem = goods_action_createNamespace[1];

/* harmony default export */ var goods_action = (goods_action_createComponent({
  mixins: [ParentMixin('vanGoodsAction')],
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": goods_action_bem({
        unfit: !this.safeAreaInsetBottom
      })
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/goods-action-button/index.js






var goods_action_button_createNamespace = Object(create["a" /* createNamespace */])('goods-action-button'),
    goods_action_button_createComponent = goods_action_button_createNamespace[0],
    goods_action_button_bem = goods_action_button_createNamespace[1];

/* harmony default export */ var goods_action_button = (goods_action_button_createComponent({
  mixins: [ChildrenMixin('vanGoodsAction')],
  props: _extends({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }),
  computed: {
    isFirst: function isFirst() {
      var prev = this.parent && this.parent.children[this.index - 1];
      return !prev || prev.$options.name !== this.$options.name;
    },
    isLast: function isLast() {
      var next = this.parent && this.parent.children[this.index + 1];
      return !next || next.$options.name !== this.$options.name;
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      route(this.$router, this);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(es_button, {
      "class": goods_action_button_bem([{
        first: this.isFirst,
        last: this.isLast
      }, this.type]),
      "attrs": {
        "size": "large",
        "type": this.type,
        "icon": this.icon,
        "color": this.color,
        "loading": this.loading,
        "disabled": this.disabled
      },
      "on": {
        "click": this.onClick
      }
    }, [this.slots() || this.text]);
  }
}));
// CONCATENATED MODULE: ./es/dialog/Dialog.js








var Dialog_createNamespace = Object(create["a" /* createNamespace */])('dialog'),
    Dialog_createComponent = Dialog_createNamespace[0],
    Dialog_bem = Dialog_createNamespace[1],
    Dialog_t = Dialog_createNamespace[2];

/* harmony default export */ var Dialog = (Dialog_createComponent({
  mixins: [PopupMixin()],
  props: {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    className: null,
    callback: Function,
    beforeClose: Function,
    messageAlign: String,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    showCancelButton: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    allowHtml: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'van-dialog-bounce'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.handleAction('overlay');
    },
    handleAction: function handleAction(action) {
      var _this = this;

      this.$emit(action); // show not trigger close event when hidden

      if (!this.value) {
        return;
      }

      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, function (state) {
          if (state !== false && _this.loading[action]) {
            _this.onClose(action);
          }

          _this.loading.confirm = false;
          _this.loading.cancel = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose: function onClose(action) {
      this.close();

      if (this.callback) {
        this.callback(action);
      }
    },
    onOpened: function onOpened() {
      var _this2 = this;

      this.$emit('opened');
      this.$nextTick(function () {
        var _this2$$refs$dialog;

        (_this2$$refs$dialog = _this2.$refs.dialog) == null ? void 0 : _this2$$refs$dialog.focus();
      });
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    onKeydown: function onKeydown(event) {
      var _this3 = this;

      if (event.key === 'Escape' || event.key === 'Enter') {
        // skip keyboard events of child elements
        if (event.target !== this.$refs.dialog) {
          return;
        }

        var onEventType = {
          Enter: this.showConfirmButton ? function () {
            return _this3.handleAction('confirm');
          } : utils["i" /* noop */],
          Escape: this.showCancelButton ? function () {
            return _this3.handleAction('cancel');
          } : utils["i" /* noop */]
        };
        onEventType[event.key]();
        this.$emit('keydown', event);
      }
    },
    genRoundButtons: function genRoundButtons() {
      var _this4 = this;

      var h = this.$createElement;
      return h(goods_action, {
        "class": Dialog_bem('footer')
      }, [this.showCancelButton && h(goods_action_button, {
        "attrs": {
          "size": "large",
          "type": "warning",
          "text": this.cancelButtonText || Dialog_t('cancel'),
          "color": this.cancelButtonColor,
          "loading": this.loading.cancel
        },
        "class": Dialog_bem('cancel'),
        "on": {
          "click": function click() {
            _this4.handleAction('cancel');
          }
        }
      }), this.showConfirmButton && h(goods_action_button, {
        "attrs": {
          "size": "large",
          "type": "danger",
          "text": this.confirmButtonText || Dialog_t('confirm'),
          "color": this.confirmButtonColor,
          "loading": this.loading.confirm
        },
        "class": Dialog_bem('confirm'),
        "on": {
          "click": function click() {
            _this4.handleAction('confirm');
          }
        }
      })]);
    },
    genButtons: function genButtons() {
      var _this5 = this,
          _ref;

      var h = this.$createElement;
      var multiple = this.showCancelButton && this.showConfirmButton;
      return h("div", {
        "class": [BORDER_TOP, Dialog_bem('footer')]
      }, [this.showCancelButton && h(es_button, {
        "attrs": {
          "size": "large",
          "loading": this.loading.cancel,
          "text": this.cancelButtonText || Dialog_t('cancel'),
          "nativeType": "button"
        },
        "class": Dialog_bem('cancel'),
        "style": {
          color: this.cancelButtonColor
        },
        "on": {
          "click": function click() {
            _this5.handleAction('cancel');
          }
        }
      }), this.showConfirmButton && h(es_button, {
        "attrs": {
          "size": "large",
          "loading": this.loading.confirm,
          "text": this.confirmButtonText || Dialog_t('confirm'),
          "nativeType": "button"
        },
        "class": [Dialog_bem('confirm'), (_ref = {}, _ref[BORDER_LEFT] = multiple, _ref)],
        "style": {
          color: this.confirmButtonColor
        },
        "on": {
          "click": function click() {
            _this5.handleAction('confirm');
          }
        }
      })]);
    },
    genContent: function genContent(hasTitle, messageSlot) {
      var h = this.$createElement;

      if (messageSlot) {
        return h("div", {
          "class": Dialog_bem('content')
        }, [messageSlot]);
      }

      var message = this.message,
          messageAlign = this.messageAlign;

      if (message) {
        var _bem, _domProps;

        var data = {
          class: Dialog_bem('message', (_bem = {
            'has-title': hasTitle
          }, _bem[messageAlign] = messageAlign, _bem)),
          domProps: (_domProps = {}, _domProps[this.allowHtml ? 'innerHTML' : 'textContent'] = message, _domProps)
        };
        return h("div", {
          "class": Dialog_bem('content', {
            isolated: !hasTitle
          })
        }, [h("div", helper_default()([{}, data]))]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    var message = this.message;
    var messageSlot = this.slots();
    var title = this.slots('title') || this.title;
    var Title = title && h("div", {
      "class": Dialog_bem('header', {
        isolated: !message && !messageSlot
      })
    }, [title]);
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "attrs": {
        "role": "dialog",
        "aria-labelledby": this.title || message,
        "tabIndex": 0
      },
      "class": [Dialog_bem([this.theme]), this.className],
      "style": {
        width: Object(unit["a" /* addUnit */])(this.width)
      },
      "ref": "dialog",
      "on": {
        "keydown": this.onKeydown
      }
    }, [Title, this.genContent(title, messageSlot), this.theme === 'round-button' ? this.genRoundButtons() : this.genButtons()])]);
  }
}));
// CONCATENATED MODULE: ./es/dialog/index.js




var dialog_instance;

function dialog_isInDocument(element) {
  return document.body.contains(element);
}

function dialog_initInstance() {
  if (dialog_instance) {
    dialog_instance.$destroy();
  }

  dialog_instance = new (external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend(Dialog))({
    el: document.createElement('div'),
    // avoid missing animation when first rendered
    propsData: {
      lazyRender: false
    }
  });
  dialog_instance.$on('input', function (value) {
    dialog_instance.value = value;
  });
}

function dialog_Dialog(options) {
  /* istanbul ignore if */
  if (utils["h" /* isServer */]) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    if (!dialog_instance || !dialog_isInDocument(dialog_instance.$el)) {
      dialog_initInstance();
    }

    _extends(dialog_instance, dialog_Dialog.currentOptions, options, {
      resolve: resolve,
      reject: reject
    });
  });
}

dialog_Dialog.defaultOptions = {
  value: true,
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  className: '',
  allowHtml: true,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  getContainer: 'body',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
  callback: function callback(action) {
    dialog_instance[action === 'confirm' ? 'resolve' : 'reject'](action);
  }
};
dialog_Dialog.alert = dialog_Dialog;

dialog_Dialog.confirm = function (options) {
  return dialog_Dialog(_extends({
    showCancelButton: true
  }, options));
};

dialog_Dialog.close = function () {
  if (dialog_instance) {
    dialog_instance.value = false;
  }
};

dialog_Dialog.setDefaultOptions = function (options) {
  _extends(dialog_Dialog.currentOptions, options);
};

dialog_Dialog.resetDefaultOptions = function () {
  dialog_Dialog.currentOptions = _extends({}, dialog_Dialog.defaultOptions);
};

dialog_Dialog.resetDefaultOptions();

dialog_Dialog.install = function () {
  external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.use(Dialog);
};

dialog_Dialog.Component = Dialog;
external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.prototype.$dialog = dialog_Dialog;
/* harmony default export */ var dialog = (dialog_Dialog);
// CONCATENATED MODULE: ./es/address-edit/Detail.js
 // Utils


 // Components




var Detail_createNamespace = Object(create["a" /* createNamespace */])('address-edit-detail'),
    Detail_createComponent = Detail_createNamespace[0],
    Detail_bem = Detail_createNamespace[1],
    Detail_t = Detail_createNamespace[2];

var android = isAndroid();
/* harmony default export */ var Detail = (Detail_createComponent({
  props: {
    value: String,
    errorMessage: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean
  },
  computed: {
    shouldShowSearchResult: function shouldShowSearchResult() {
      return this.focused && this.searchResult && this.showSearchResult;
    }
  },
  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    },
    onFinish: function onFinish() {
      this.$refs.field.blur();
    },
    genFinish: function genFinish() {
      var h = this.$createElement;
      var show = this.value && this.focused && android;

      if (show) {
        return h("div", {
          "class": Detail_bem('finish'),
          "on": {
            "click": this.onFinish
          }
        }, [Detail_t('complete')]);
      }
    },
    genSearchResult: function genSearchResult() {
      var _this = this;

      var h = this.$createElement;
      var value = this.value,
          shouldShowSearchResult = this.shouldShowSearchResult,
          searchResult = this.searchResult;

      if (shouldShowSearchResult) {
        return searchResult.map(function (express) {
          return h(cell, {
            "key": express.name + express.address,
            "attrs": {
              "clickable": true,
              "border": false,
              "icon": "location-o",
              "label": express.address
            },
            "class": Detail_bem('search-item'),
            "on": {
              "click": function click() {
                _this.onSelect(express);
              }
            },
            "scopedSlots": {
              title: function title() {
                if (express.name) {
                  var text = express.name.replace(value, "<span class=" + Detail_bem('keyword') + ">" + value + "</span>");
                  return h("div", {
                    "domProps": {
                      "innerHTML": text
                    }
                  });
                }
              }
            }
          });
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(cell, {
      "class": Detail_bem()
    }, [h(es_field, {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "value": this.value,
        "errorMessage": this.errorMessage,
        "border": !this.shouldShowSearchResult,
        "label": Detail_t('label'),
        "maxlength": this.detailMaxlength,
        "placeholder": Detail_t('placeholder')
      },
      "ref": "field",
      "scopedSlots": {
        icon: this.genFinish
      },
      "on": _extends({}, this.$listeners)
    }), this.genSearchResult()]);
  }
}));
// CONCATENATED MODULE: ./es/switch/shared.js
/**
 * Common Switch Props
 */
var switchProps = {
  size: [Number, String],
  value: null,
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: null,
    default: true
  },
  inactiveValue: {
    type: null,
    default: false
  }
};
// CONCATENATED MODULE: ./es/mixins/field.js
var FieldMixin = {
  inject: {
    vanField: {
      default: null
    }
  },
  watch: {
    value: function value() {
      var field = this.vanField;

      if (field) {
        field.resetValidation();
        field.validateWithTrigger('onChange');
      }
    }
  },
  created: function created() {
    var field = this.vanField;

    if (field && !field.children) {
      field.children = this;
    }
  }
};
// CONCATENATED MODULE: ./es/switch/index.js
// Utils

 // Mixins

 // Components



var switch_createNamespace = Object(create["a" /* createNamespace */])('switch'),
    switch_createComponent = switch_createNamespace[0],
    switch_bem = switch_createNamespace[1];

/* harmony default export */ var es_switch = (switch_createComponent({
  mixins: [FieldMixin],
  props: switchProps,
  computed: {
    checked: function checked() {
      return this.value === this.activeValue;
    },
    style: function style() {
      return {
        fontSize: Object(unit["a" /* addUnit */])(this.size),
        backgroundColor: this.checked ? this.activeColor : this.inactiveColor
      };
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);

      if (!this.disabled && !this.loading) {
        var newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
    genLoading: function genLoading() {
      var h = this.$createElement;

      if (this.loading) {
        var color = this.checked ? this.activeColor : this.inactiveColor;
        return h(es_loading, {
          "class": switch_bem('loading'),
          "attrs": {
            "color": color
          }
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var checked = this.checked,
        loading = this.loading,
        disabled = this.disabled;
    return h("div", {
      "class": switch_bem({
        on: checked,
        loading: loading,
        disabled: disabled
      }),
      "attrs": {
        "role": "switch",
        "aria-checked": String(checked)
      },
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": switch_bem('node')
    }, [this.genLoading()])]);
  }
}));
// CONCATENATED MODULE: ./es/address-edit/index.js
 // Utils


 // Components











var address_edit_createNamespace = Object(create["a" /* createNamespace */])('address-edit'),
    address_edit_createComponent = address_edit_createNamespace[0],
    address_edit_bem = address_edit_createNamespace[1],
    address_edit_t = address_edit_createNamespace[2];

var defaultData = {
  name: '',
  tel: '',
  country: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  postalCode: '',
  addressDetail: '',
  isDefault: false
};

function isPostal(value) {
  return /^\d{6}$/.test(value);
}

/* harmony default export */ var address_edit = (address_edit_createComponent({
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    searchResult: Array,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    disableArea: Boolean,
    detailRows: {
      type: [Number, String],
      default: 1
    },
    detailMaxlength: {
      type: [Number, String],
      default: 200
    },
    addressInfo: {
      type: Object,
      default: function _default() {
        return _extends({}, defaultData);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    },
    postalValidator: {
      type: Function,
      default: isPostal
    },
    areaColumnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: ''
      }
    };
  },
  computed: {
    areaListLoaded: function areaListLoaded() {
      return Object(utils["f" /* isObject */])(this.areaList) && Object.keys(this.areaList).length;
    },
    areaText: function areaText() {
      var _this$data = this.data,
          country = _this$data.country,
          province = _this$data.province,
          city = _this$data.city,
          county = _this$data.county,
          areaCode = _this$data.areaCode;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(function (text) {
          return text;
        }).join('/');
      }

      return '';
    },
    // hide bottom field when use search && detail get focused
    hideBottomFields: function hideBottomFields() {
      var searchResult = this.searchResult;
      return searchResult && searchResult.length && this.detailFocused;
    }
  },
  watch: {
    addressInfo: {
      handler: function handler(val) {
        this.data = _extends({}, defaultData, val);
        this.setAreaCode(val.areaCode);
      },
      deep: true,
      immediate: true
    },
    areaList: function areaList() {
      this.setAreaCode(this.data.areaCode);
    }
  },
  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = '';
      this.detailFocused = key === 'addressDetail';
      this.$emit('focus', key);
    },
    onChangeDetail: function onChangeDetail(val) {
      this.data.addressDetail = val;
      this.$emit('change-detail', val);
    },
    onAreaConfirm: function onAreaConfirm(values) {
      values = values.filter(function (value) {
        return !!value;
      });

      if (values.some(function (value) {
        return !value.code;
      })) {
        es_toast(address_edit_t('areaEmpty'));
        return;
      }

      this.showAreaPopup = false;
      this.assignAreaValues();
      this.$emit('change-area', values);
    },
    assignAreaValues: function assignAreaValues() {
      var area = this.$refs.area;

      if (area) {
        var detail = area.getArea();
        detail.areaCode = detail.code;
        delete detail.code;

        _extends(this.data, detail);
      }
    },
    onSave: function onSave() {
      var _this = this;

      var items = ['name', 'tel'];

      if (this.showArea) {
        items.push('areaCode');
      }

      if (this.showDetail) {
        items.push('addressDetail');
      }

      if (this.showPostal) {
        items.push('postalCode');
      }

      var isValid = items.every(function (item) {
        var msg = _this.getErrorMessage(item);

        if (msg) {
          _this.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.data);
      }
    },
    getErrorMessage: function getErrorMessage(key) {
      var value = String(this.data[key] || '').trim();

      if (this.validator) {
        var message = this.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : address_edit_t('nameEmpty');

        case 'tel':
          return this.telValidator(value) ? '' : address_edit_t('telInvalid');

        case 'areaCode':
          return value ? '' : address_edit_t('areaEmpty');

        case 'addressDetail':
          return value ? '' : address_edit_t('addressEmpty');

        case 'postalCode':
          return value && !this.postalValidator(value) ? address_edit_t('postalEmpty') : '';
      }
    },
    onDelete: function onDelete() {
      var _this2 = this;

      dialog.confirm({
        title: address_edit_t('confirmDelete')
      }).then(function () {
        _this2.$emit('delete', _this2.data);
      }).catch(function () {
        _this2.$emit('cancel-delete', _this2.data);
      });
    },
    // get values of area component
    getArea: function getArea() {
      return this.$refs.area ? this.$refs.area.getValues() : [];
    },
    // set area code to area component
    setAreaCode: function setAreaCode(code) {
      this.data.areaCode = code || '';

      if (code) {
        this.$nextTick(this.assignAreaValues);
      }
    },
    // @exposed-api
    setAddressDetail: function setAddressDetail(value) {
      this.data.addressDetail = value;
    },
    onDetailBlur: function onDetailBlur() {
      var _this3 = this; // await for click search event


      setTimeout(function () {
        _this3.detailFocused = false;
      });
    },
    genSetDefaultCell: function genSetDefaultCell(h) {
      var _this4 = this;

      if (this.showSetDefault) {
        var slots = {
          'right-icon': function rightIcon() {
            return h(es_switch, {
              "attrs": {
                "size": "24"
              },
              "on": {
                "change": function change(event) {
                  _this4.$emit('change-default', event);
                }
              },
              "model": {
                value: _this4.data.isDefault,
                callback: function callback($$v) {
                  _this4.$set(_this4.data, "isDefault", $$v);
                }
              }
            });
          }
        };
        return h(cell, {
          "directives": [{
            name: "show",
            value: !this.hideBottomFields
          }],
          "attrs": {
            "center": true,
            "title": address_edit_t('defaultAddress')
          },
          "class": address_edit_bem('default'),
          "scopedSlots": slots
        });
      }

      return h();
    }
  },
  render: function render(h) {
    var _this5 = this;

    var data = this.data,
        errorInfo = this.errorInfo,
        disableArea = this.disableArea,
        hideBottomFields = this.hideBottomFields;

    var onFocus = function onFocus(name) {
      return function () {
        return _this5.onFocus(name);
      };
    };

    return h("div", {
      "class": address_edit_bem()
    }, [h("div", {
      "class": address_edit_bem('fields')
    }, [h(es_field, {
      "attrs": {
        "clearable": true,
        "label": address_edit_t('name'),
        "placeholder": address_edit_t('namePlaceholder'),
        "errorMessage": errorInfo.name
      },
      "on": {
        "focus": onFocus('name')
      },
      "model": {
        value: data.name,
        callback: function callback($$v) {
          _this5.$set(data, "name", $$v);
        }
      }
    }), h(es_field, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": address_edit_t('tel'),
        "maxlength": this.telMaxlength,
        "placeholder": address_edit_t('telPlaceholder'),
        "errorMessage": errorInfo.tel
      },
      "on": {
        "focus": onFocus('tel')
      },
      "model": {
        value: data.tel,
        callback: function callback($$v) {
          _this5.$set(data, "tel", $$v);
        }
      }
    }), h(es_field, {
      "directives": [{
        name: "show",
        value: this.showArea
      }],
      "attrs": {
        "readonly": true,
        "clickable": !disableArea,
        "label": address_edit_t('area'),
        "placeholder": this.areaPlaceholder || address_edit_t('areaPlaceholder'),
        "errorMessage": errorInfo.areaCode,
        "rightIcon": !disableArea ? 'arrow' : null,
        "value": this.areaText
      },
      "on": {
        "focus": onFocus('areaCode'),
        "click": function click() {
          _this5.$emit('click-area');

          _this5.showAreaPopup = !disableArea;
        }
      }
    }), h(Detail, {
      "directives": [{
        name: "show",
        value: this.showDetail
      }],
      "attrs": {
        "focused": this.detailFocused,
        "value": data.addressDetail,
        "errorMessage": errorInfo.addressDetail,
        "detailRows": this.detailRows,
        "detailMaxlength": this.detailMaxlength,
        "searchResult": this.searchResult,
        "showSearchResult": this.showSearchResult
      },
      "on": {
        "focus": onFocus('addressDetail'),
        "blur": this.onDetailBlur,
        "input": this.onChangeDetail,
        "select-search": function selectSearch(event) {
          _this5.$emit('select-search', event);
        }
      }
    }), this.showPostal && h(es_field, {
      "directives": [{
        name: "show",
        value: !hideBottomFields
      }],
      "attrs": {
        "type": "tel",
        "maxlength": "6",
        "label": address_edit_t('postal'),
        "placeholder": address_edit_t('postal'),
        "errorMessage": errorInfo.postalCode
      },
      "on": {
        "focus": onFocus('postalCode')
      },
      "model": {
        value: data.postalCode,
        callback: function callback($$v) {
          _this5.$set(data, "postalCode", $$v);
        }
      }
    }), this.slots()]), this.genSetDefaultCell(h), h("div", {
      "directives": [{
        name: "show",
        value: !hideBottomFields
      }],
      "class": address_edit_bem('buttons')
    }, [h(es_button, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isSaving,
        "type": "danger",
        "text": this.saveButtonText || address_edit_t('save')
      },
      "on": {
        "click": this.onSave
      }
    }), this.showDelete && h(es_button, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isDeleting,
        "text": this.deleteButtonText || address_edit_t('delete')
      },
      "on": {
        "click": this.onDelete
      }
    })]), h(popup, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "lazyRender": false,
        "getContainer": "body"
      },
      "model": {
        value: _this5.showAreaPopup,
        callback: function callback($$v) {
          _this5.showAreaPopup = $$v;
        }
      }
    }, [h(es_area, {
      "ref": "area",
      "attrs": {
        "value": data.areaCode,
        "loading": !this.areaListLoaded,
        "areaList": this.areaList,
        "columnsPlaceholder": this.areaColumnsPlaceholder
      },
      "on": {
        "confirm": this.onAreaConfirm,
        "cancel": function cancel() {
          _this5.showAreaPopup = false;
        }
      }
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/radio-group/index.js




var radio_group_createNamespace = Object(create["a" /* createNamespace */])('radio-group'),
    radio_group_createComponent = radio_group_createNamespace[0],
    radio_group_bem = radio_group_createNamespace[1];

/* harmony default export */ var radio_group = (radio_group_createComponent({
  mixins: [ParentMixin('vanRadio'), FieldMixin],
  props: {
    value: null,
    disabled: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String]
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": radio_group_bem([this.direction]),
      "attrs": {
        "role": "radiogroup"
      }
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/tag/index.js
 // Utils


 // Components

 // Types

var tag_createNamespace = Object(create["a" /* createNamespace */])('tag'),
    tag_createComponent = tag_createNamespace[0],
    tag_bem = tag_createNamespace[1];

function Tag(h, props, slots, ctx) {
  var _style;

  var type = props.type,
      mark = props.mark,
      plain = props.plain,
      color = props.color,
      round = props.round,
      size = props.size,
      textColor = props.textColor;
  var key = plain ? 'color' : 'backgroundColor';
  var style = (_style = {}, _style[key] = color, _style);

  if (plain) {
    style.color = textColor || color;
    style.borderColor = color;
  } else {
    style.color = textColor;
    style.background = color;
  }

  var classes = {
    mark: mark,
    plain: plain,
    round: round
  };

  if (size) {
    classes[size] = size;
  }

  var CloseIcon = props.closeable && h(es_icon, {
    "attrs": {
      "name": "cross"
    },
    "class": tag_bem('close'),
    "on": {
      "click": function click(event) {
        event.stopPropagation();
        functional_emit(ctx, 'close');
      }
    }
  });
  return h("transition", {
    "attrs": {
      "name": props.closeable ? 'van-fade' : null
    }
  }, [h("span", helper_default()([{
    "key": "content",
    "style": style,
    "class": tag_bem([classes, type])
  }, inherit(ctx, true)]), [slots.default == null ? void 0 : slots.default(), CloseIcon])]);
}

Tag.props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
  type: {
    type: String,
    default: 'default'
  }
};
/* harmony default export */ var es_tag = (tag_createComponent(Tag));
// CONCATENATED MODULE: ./es/mixins/checkbox.js
/**
 * Common part of Checkbox & Radio
 */




var checkbox_CheckboxMixin = function CheckboxMixin(_ref) {
  var parent = _ref.parent,
      bem = _ref.bem,
      role = _ref.role;
  return {
    mixins: [ChildrenMixin(parent), FieldMixin],
    props: {
      name: null,
      value: null,
      disabled: Boolean,
      iconSize: [Number, String],
      checkedColor: String,
      labelPosition: String,
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: 'round'
      },
      bindGroup: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      disableBindRelation: function disableBindRelation() {
        return !this.bindGroup;
      },
      isDisabled: function isDisabled() {
        return this.parent && this.parent.disabled || this.disabled;
      },
      direction: function direction() {
        return this.parent && this.parent.direction || null;
      },
      iconStyle: function iconStyle() {
        var checkedColor = this.checkedColor || this.parent && this.parent.checkedColor;

        if (checkedColor && this.checked && !this.isDisabled) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      },
      tabindex: function tabindex() {
        if (this.isDisabled || role === 'radio' && !this.checked) {
          return -1;
        }

        return 0;
      }
    },
    methods: {
      onClick: function onClick(event) {
        var _this = this;

        var target = event.target;
        var icon = this.$refs.icon;
        var iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));

        if (!this.isDisabled && (iconClicked || !this.labelDisabled)) {
          this.toggle(); // wait for toggle method to complete
          // so we can get the changed value in the click event listener

          setTimeout(function () {
            _this.$emit('click', event);
          });
        } else {
          this.$emit('click', event);
        }
      },
      genIcon: function genIcon() {
        var h = this.$createElement;
        var checked = this.checked;
        var iconSize = this.iconSize || this.parent && this.parent.iconSize;
        return h("div", {
          "ref": "icon",
          "class": bem('icon', [this.shape, {
            disabled: this.isDisabled,
            checked: checked
          }]),
          "style": {
            fontSize: Object(unit["a" /* addUnit */])(iconSize)
          }
        }, [this.slots('icon', {
          checked: checked
        }) || h(es_icon, {
          "attrs": {
            "name": "success"
          },
          "style": this.iconStyle
        })]);
      },
      genLabel: function genLabel() {
        var h = this.$createElement;
        var slot = this.slots();

        if (slot) {
          return h("span", {
            "class": bem('label', [this.labelPosition, {
              disabled: this.isDisabled
            }])
          }, [slot]);
        }
      }
    },
    render: function render() {
      var h = arguments[0];
      var Children = [this.genIcon()];

      if (this.labelPosition === 'left') {
        Children.unshift(this.genLabel());
      } else {
        Children.push(this.genLabel());
      }

      return h("div", {
        "attrs": {
          "role": role,
          "tabindex": this.tabindex,
          "aria-checked": String(this.checked)
        },
        "class": bem([{
          disabled: this.isDisabled,
          'label-disabled': this.labelDisabled
        }, this.direction]),
        "on": {
          "click": this.onClick
        }
      }, [Children]);
    }
  };
};
// CONCATENATED MODULE: ./es/radio/index.js



var radio_createNamespace = Object(create["a" /* createNamespace */])('radio'),
    radio_createComponent = radio_createNamespace[0],
    radio_bem = radio_createNamespace[1];

/* harmony default export */ var es_radio = (radio_createComponent({
  mixins: [checkbox_CheckboxMixin({
    bem: radio_bem,
    role: 'radio',
    parent: 'vanRadio'
  })],
  computed: {
    currentValue: {
      get: function get() {
        return this.parent ? this.parent.value : this.value;
      },
      set: function set(val) {
        (this.parent || this).$emit('input', val);
      }
    },
    checked: function checked() {
      return this.currentValue === this.name;
    }
  },
  methods: {
    toggle: function toggle() {
      this.currentValue = this.name;
    }
  }
}));
// CONCATENATED MODULE: ./es/address-list/Item.js

 // Utils


 // Components




 // Types

var Item_createNamespace = Object(create["a" /* createNamespace */])('address-item'),
    Item_createComponent = Item_createNamespace[0],
    Item_bem = Item_createNamespace[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
      switchable = props.switchable;

  function onClick() {
    if (switchable) {
      functional_emit(ctx, 'select');
    }

    functional_emit(ctx, 'click');
  }

  var genRightIcon = function genRightIcon() {
    return h(es_icon, {
      "attrs": {
        "name": "edit"
      },
      "class": Item_bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          functional_emit(ctx, 'edit');
          functional_emit(ctx, 'click');
        }
      }
    });
  };

  function genTag() {
    if (slots.tag) {
      return slots.tag(_extends({}, props.data));
    }

    if (props.data.isDefault && props.defaultTagText) {
      return h(es_tag, {
        "attrs": {
          "type": "danger",
          "round": true
        },
        "class": Item_bem('tag')
      }, [props.defaultTagText]);
    }
  }

  function genContent() {
    var data = props.data;
    var Info = [h("div", {
      "class": Item_bem('name')
    }, [data.name + " " + data.tel, genTag()]), h("div", {
      "class": Item_bem('address')
    }, [data.address])];

    if (switchable && !disabled) {
      return h(es_radio, {
        "attrs": {
          "name": data.id,
          "iconSize": 18
        }
      }, [Info]);
    }

    return Info;
  }

  return h("div", {
    "class": Item_bem({
      disabled: disabled
    }),
    "on": {
      "click": onClick
    }
  }, [h(cell, helper_default()([{
    "attrs": {
      "border": false,
      "valueClass": Item_bem('value')
    },
    "scopedSlots": {
      default: genContent,
      'right-icon': genRightIcon
    }
  }, inherit(ctx)])), slots.bottom == null ? void 0 : slots.bottom(_extends({}, props.data, {
    disabled: disabled
  }))]);
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean,
  defaultTagText: String
};
/* harmony default export */ var Item = (Item_createComponent(AddressItem));
// CONCATENATED MODULE: ./es/address-list/index.js
 // Utils


 // Components



 // Types

var address_list_createNamespace = Object(create["a" /* createNamespace */])('address-list'),
    address_list_createComponent = address_list_createNamespace[0],
    address_list_bem = address_list_createNamespace[1],
    address_list_t = address_list_createNamespace[2];

function AddressList(h, props, slots, ctx) {
  function genList(list, disabled) {
    if (!list) {
      return;
    }

    return list.map(function (item, index) {
      return h(Item, {
        "attrs": {
          "data": item,
          "disabled": disabled,
          "switchable": props.switchable,
          "defaultTagText": props.defaultTagText
        },
        "key": item.id,
        "scopedSlots": {
          bottom: slots['item-bottom'],
          tag: slots.tag
        },
        "on": {
          "select": function select() {
            functional_emit(ctx, disabled ? 'select-disabled' : 'select', item, index);

            if (!disabled) {
              functional_emit(ctx, 'input', item.id);
            }
          },
          "edit": function edit() {
            functional_emit(ctx, disabled ? 'edit-disabled' : 'edit', item, index);
          },
          "click": function click() {
            functional_emit(ctx, 'click-item', item, index);
          }
        }
      });
    });
  }

  var List = genList(props.list);
  var DisabledList = genList(props.disabledList, true);
  return h("div", helper_default()([{
    "class": address_list_bem()
  }, inherit(ctx)]), [slots.top == null ? void 0 : slots.top(), h(radio_group, {
    "attrs": {
      "value": props.value
    }
  }, [List]), props.disabledText && h("div", {
    "class": address_list_bem('disabled-text')
  }, [props.disabledText]), DisabledList, slots.default == null ? void 0 : slots.default(), h("div", {
    "class": address_list_bem('bottom')
  }, [h(es_button, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addButtonText || address_list_t('add')
    },
    "class": address_list_bem('add'),
    "on": {
      "click": function click() {
        functional_emit(ctx, 'add');
      }
    }
  })])]);
}

AddressList.props = {
  list: Array,
  value: [Number, String],
  disabledList: Array,
  disabledText: String,
  addButtonText: String,
  defaultTagText: String,
  switchable: {
    type: Boolean,
    default: true
  }
};
/* harmony default export */ var address_list = (address_list_createComponent(AddressList));
// EXTERNAL MODULE: ./es/utils/validate/number.js
var number = __webpack_require__(5);

// CONCATENATED MODULE: ./es/badge/index.js



var badge_createNamespace = Object(create["a" /* createNamespace */])('badge'),
    badge_createComponent = badge_createNamespace[0],
    badge_bem = badge_createNamespace[1];

/* harmony default export */ var badge = (badge_createComponent({
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    content: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },
  methods: {
    hasContent: function hasContent() {
      return !!(this.$scopedSlots.content || Object(utils["c" /* isDef */])(this.content) && this.content !== '');
    },
    renderContent: function renderContent() {
      var dot = this.dot,
          max = this.max,
          content = this.content;

      if (!dot && this.hasContent()) {
        if (this.$scopedSlots.content) {
          return this.$scopedSlots.content();
        }

        if (Object(utils["c" /* isDef */])(max) && Object(number["b" /* isNumeric */])(content) && +content > max) {
          return max + "+";
        }

        return content;
      }
    },
    renderBadge: function renderBadge() {
      var h = this.$createElement;

      if (this.hasContent() || this.dot) {
        return h("div", {
          "class": badge_bem({
            dot: this.dot,
            fixed: !!this.$scopedSlots.default
          }),
          "style": {
            background: this.color
          }
        }, [this.renderContent()]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    if (this.$scopedSlots.default) {
      var tag = this.tag;
      return h(tag, {
        "class": badge_bem('wrapper')
      }, [this.$scopedSlots.default(), this.renderBadge()]);
    }

    return this.renderBadge();
  }
}));
// EXTERNAL MODULE: ./es/utils/dom/raf.js
var raf = __webpack_require__(4);

// CONCATENATED MODULE: ./es/utils/validate/date.js

function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !Object(number["a" /* isNaN */])(val.getTime());
}
// CONCATENATED MODULE: ./es/calendar/utils.js


var utils_createNamespace = Object(create["a" /* createNamespace */])('calendar'),
    utils_createComponent = utils_createNamespace[0],
    utils_bem = utils_createNamespace[1],
    utils_t = utils_createNamespace[2];


function formatMonthTitle(date) {
  return utils_t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}
function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}
function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}
function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
function getNextDay(date) {
  return getDayByOffset(date, 1);
}
function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
function copyDate(dates) {
  return new Date(dates);
}
function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map(function (date) {
      if (date === null) {
        return date;
      }

      return copyDate(date);
    });
  }

  return copyDate(dates);
}
// CONCATENATED MODULE: ./es/datetime-picker/utils.js

function times(n, iteratee) {
  if (n < 0) {
    return [];
  }

  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }

  while (Object(number["a" /* isNaN */])(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }

  return parseInt(value, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
// CONCATENATED MODULE: ./es/calendar/components/Month.js





var Month_createNamespace = Object(create["a" /* createNamespace */])('calendar-month'),
    Month_createComponent = Month_createNamespace[0];

/* harmony default export */ var Month = (Month_createComponent({
  props: {
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  },
  data: function data() {
    return {
      visible: false
    };
  },
  computed: {
    title: function title() {
      return formatMonthTitle(this.date);
    },
    rowHeightWithUnit: function rowHeightWithUnit() {
      return Object(unit["a" /* addUnit */])(this.rowHeight);
    },
    offset: function offset() {
      var firstDayOfWeek = this.firstDayOfWeek;
      var realDay = this.date.getDay();

      if (!firstDayOfWeek) {
        return realDay;
      }

      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
    totalDay: function totalDay() {
      return getMonthEndDay(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    shouldRender: function shouldRender() {
      return this.visible || !this.lazyRender;
    },
    placeholders: function placeholders() {
      var rows = [];
      var count = Math.ceil((this.totalDay + this.offset) / 7);

      for (var day = 1; day <= count; day++) {
        rows.push({
          type: 'placeholder'
        });
      }

      return rows;
    },
    days: function days() {
      var days = [];
      var year = this.date.getFullYear();
      var month = this.date.getMonth();

      for (var day = 1; day <= this.totalDay; day++) {
        var date = new Date(year, month, day);
        var type = this.getDayType(date);
        var config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: this.getBottomInfo(type)
        };

        if (this.formatter) {
          config = this.formatter(config);
        }

        days.push(config);
      }

      return days;
    }
  },
  methods: {
    getHeight: function getHeight() {
      var _this$$el;

      return ((_this$$el = this.$el) == null ? void 0 : _this$$el.getBoundingClientRect().height) || 0;
    },
    scrollIntoView: function scrollIntoView(body) {
      var _this$$refs = this.$refs,
          days = _this$$refs.days,
          month = _this$$refs.month;
      var el = this.showSubtitle ? days : month;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      setScrollTop(body, scrollTop);
    },
    getMultipleDayType: function getMultipleDayType(day) {
      var _this = this;

      var isSelected = function isSelected(date) {
        return _this.currentDate.some(function (item) {
          return compareDay(item, date) === 0;
        });
      };

      if (isSelected(day)) {
        var prevDay = getPrevDay(day);
        var nextDay = getNextDay(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }

        if (prevSelected) {
          return 'end';
        }

        return nextSelected ? 'start' : 'multiple-selected';
      }

      return '';
    },
    getRangeDayType: function getRangeDayType(day) {
      var _this$currentDate = this.currentDate,
          startDay = _this$currentDate[0],
          endDay = _this$currentDate[1];

      if (!startDay) {
        return '';
      }

      var compareToStart = compareDay(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }

      var compareToEnd = compareDay(day, endDay);

      if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
        return 'start-end';
      }

      if (compareToStart === 0) {
        return 'start';
      }

      if (compareToEnd === 0) {
        return 'end';
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
    },
    getDayType: function getDayType(day) {
      var type = this.type,
          minDate = this.minDate,
          maxDate = this.maxDate,
          currentDate = this.currentDate;

      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled';
      }

      if (currentDate === null) {
        return;
      }

      if (type === 'single') {
        return compareDay(day, currentDate) === 0 ? 'selected' : '';
      }

      if (type === 'multiple') {
        return this.getMultipleDayType(day);
      }
      /* istanbul ignore else */


      if (type === 'range') {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function getBottomInfo(type) {
      if (this.type === 'range') {
        if (type === 'start' || type === 'end') {
          return utils_t(type);
        }

        if (type === 'start-end') {
          return utils_t('startEnd');
        }
      }
    },
    getDayStyle: function getDayStyle(type, index) {
      var style = {
        height: this.rowHeightWithUnit
      };

      if (type === 'placeholder') {
        style.width = '100%';
        return style;
      }

      if (index === 0) {
        style.marginLeft = 100 * this.offset / 7 + "%";
      }

      if (this.color) {
        if (type === 'start' || type === 'end' || type === 'start-end' || type === 'multiple-selected' || type === 'multiple-middle') {
          style.background = this.color;
        } else if (type === 'middle') {
          style.color = this.color;
        }
      }

      return style;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showMonthTitle) {
        return h("div", {
          "class": utils_bem('month-title')
        }, [this.title]);
      }
    },
    genMark: function genMark() {
      var h = this.$createElement;

      if (this.showMark && this.shouldRender) {
        return h("div", {
          "class": utils_bem('month-mark')
        }, [this.date.getMonth() + 1]);
      }
    },
    genDays: function genDays() {
      var h = this.$createElement;
      var days = this.shouldRender ? this.days : this.placeholders;
      return h("div", {
        "ref": "days",
        "attrs": {
          "role": "grid"
        },
        "class": utils_bem('days')
      }, [this.genMark(), days.map(this.genDay)]);
    },
    genTopInfo: function genTopInfo(item) {
      var h = this.$createElement;
      var slot = this.$scopedSlots['top-info'];

      if (item.topInfo || slot) {
        return h("div", {
          "class": utils_bem('top-info')
        }, [slot ? slot(item) : item.topInfo]);
      }
    },
    genBottomInfo: function genBottomInfo(item) {
      var h = this.$createElement;
      var slot = this.$scopedSlots['bottom-info'];

      if (item.bottomInfo || slot) {
        return h("div", {
          "class": utils_bem('bottom-info')
        }, [slot ? slot(item) : item.bottomInfo]);
      }
    },
    genDay: function genDay(item, index) {
      var _this2 = this;

      var h = this.$createElement;
      var type = item.type;
      var style = this.getDayStyle(type, index);
      var disabled = type === 'disabled';

      var onClick = function onClick() {
        if (!disabled) {
          _this2.$emit('click', item);
        }
      };

      if (type === 'selected') {
        return h("div", {
          "attrs": {
            "role": "gridcell",
            "tabindex": -1
          },
          "style": style,
          "class": [utils_bem('day'), item.className],
          "on": {
            "click": onClick
          }
        }, [h("div", {
          "class": utils_bem('selected-day'),
          "style": {
            width: this.rowHeightWithUnit,
            height: this.rowHeightWithUnit,
            background: this.color
          }
        }, [this.genTopInfo(item), item.text, this.genBottomInfo(item)])]);
      }

      return h("div", {
        "attrs": {
          "role": "gridcell",
          "tabindex": disabled ? null : -1
        },
        "style": style,
        "class": [utils_bem('day', type), item.className],
        "on": {
          "click": onClick
        }
      }, [this.genTopInfo(item), item.text, this.genBottomInfo(item)]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": utils_bem('month'),
      "ref": "month"
    }, [this.genTitle(), this.genDays()]);
  }
}));
// CONCATENATED MODULE: ./es/calendar/components/Header.js



var Header_createNamespace = Object(create["a" /* createNamespace */])('calendar-header'),
    Header_createComponent = Header_createNamespace[0];

/* harmony default export */ var components_Header = (Header_createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  methods: {
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showTitle) {
        var title = this.slots('title') || this.title || utils_t('title');
        return h("div", {
          "class": utils_bem('header-title')
        }, [title]);
      }
    },
    genSubtitle: function genSubtitle() {
      var h = this.$createElement;

      if (this.showSubtitle) {
        return h("div", {
          "class": utils_bem('header-subtitle')
        }, [this.subtitle]);
      }
    },
    genWeekDays: function genWeekDays() {
      var h = this.$createElement;
      var weekdays = utils_t('weekdays');
      var firstDayOfWeek = this.firstDayOfWeek;
      var renderWeekDays = [].concat(weekdays.slice(firstDayOfWeek, 7), weekdays.slice(0, firstDayOfWeek));
      return h("div", {
        "class": utils_bem('weekdays')
      }, [renderWeekDays.map(function (item) {
        return h("span", {
          "class": utils_bem('weekday')
        }, [item]);
      })]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": utils_bem('header')
    }, [this.genTitle(), this.genSubtitle(), this.genWeekDays()]);
  }
}));
// CONCATENATED MODULE: ./es/calendar/index.js
// Utils



 // Components






/* harmony default export */ var calendar = (utils_createComponent({
  props: {
    title: String,
    color: String,
    value: Boolean,
    readonly: Boolean,
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    defaultDate: [Date, Array],
    getContainer: [String, Function],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single'
    },
    round: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    poppable: {
      type: Boolean,
      default: true
    },
    maxRange: {
      type: [Number, String],
      default: null
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    showMark: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: function _default() {
        return new Date();
      }
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default: function _default() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: function validator(val) {
        return val >= 0 && val <= 6;
      }
    }
  },
  inject: {
    vanPopup: {
      default: null
    }
  },
  data: function data() {
    return {
      subtitle: '',
      currentDate: this.getInitialDate()
    };
  },
  computed: {
    months: function months() {
      var months = [];
      var cursor = new Date(this.minDate);
      cursor.setDate(1);

      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, this.maxDate) !== 1);

      return months;
    },
    buttonDisabled: function buttonDisabled() {
      var type = this.type,
          currentDate = this.currentDate;

      if (currentDate) {
        if (type === 'range') {
          return !currentDate[0] || !currentDate[1];
        }

        if (type === 'multiple') {
          return !currentDate.length;
        }
      }

      return !currentDate;
    },
    dayOffset: function dayOffset() {
      return this.firstDayOfWeek ? this.firstDayOfWeek % 7 : 0;
    }
  },
  watch: {
    value: 'init',
    type: function type() {
      this.reset();
    },
    defaultDate: function defaultDate(val) {
      this.currentDate = val;
      this.scrollIntoView();
    }
  },
  mounted: function mounted() {
    var _this$vanPopup;

    this.init(); // https://github.com/youzan/vant/issues/9845

    (_this$vanPopup = this.vanPopup) == null ? void 0 : _this$vanPopup.$on('opened', this.onScroll);
  },

  /* istanbul ignore next */
  activated: function activated() {
    this.init();
  },
  methods: {
    // @exposed-api
    reset: function reset(date) {
      if (date === void 0) {
        date = this.getInitialDate();
      }

      this.currentDate = date;
      this.scrollIntoView();
    },
    init: function init() {
      var _this = this;

      if (this.poppable && !this.value) {
        return;
      }

      this.$nextTick(function () {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        _this.bodyHeight = Math.floor(_this.$refs.body.getBoundingClientRect().height);

        _this.onScroll();

        _this.scrollIntoView();
      });
    },
    // @exposed-api
    scrollToDate: function scrollToDate(targetDate) {
      var _this2 = this;

      Object(raf["c" /* raf */])(function () {
        var displayed = _this2.value || !_this2.poppable;
        /* istanbul ignore if */

        if (!targetDate || !displayed) {
          return;
        }

        _this2.months.some(function (month, index) {
          if (compareMonth(month, targetDate) === 0) {
            var _this2$$refs = _this2.$refs,
                body = _this2$$refs.body,
                months = _this2$$refs.months;
            months[index].scrollIntoView(body);
            return true;
          }

          return false;
        });

        _this2.onScroll();
      });
    },
    // scroll to current month
    scrollIntoView: function scrollIntoView() {
      var currentDate = this.currentDate;

      if (currentDate) {
        var targetDate = this.type === 'single' ? currentDate : currentDate[0];
        this.scrollToDate(targetDate);
      }
    },
    getInitialDate: function getInitialDate() {
      var type = this.type,
          minDate = this.minDate,
          maxDate = this.maxDate,
          defaultDate = this.defaultDate;

      if (defaultDate === null) {
        return defaultDate;
      }

      var defaultVal = new Date();

      if (compareDay(defaultVal, minDate) === -1) {
        defaultVal = minDate;
      } else if (compareDay(defaultVal, maxDate) === 1) {
        defaultVal = maxDate;
      }

      if (type === 'range') {
        var _ref = defaultDate || [],
            startDay = _ref[0],
            endDay = _ref[1];

        return [startDay || defaultVal, endDay || getNextDay(defaultVal)];
      }

      if (type === 'multiple') {
        return defaultDate || [defaultVal];
      }

      return defaultDate || defaultVal;
    },
    // calculate the position of the elements
    // and find the elements that needs to be rendered
    onScroll: function onScroll() {
      var _this$$refs = this.$refs,
          body = _this$$refs.body,
          months = _this$$refs.months;
      var top = getScrollTop(body);
      var bottom = top + this.bodyHeight;
      var heights = months.map(function (item) {
        return item.getHeight();
      });
      var heightSum = heights.reduce(function (a, b) {
        return a + b;
      }, 0); // iOS scroll bounce may exceed the range

      if (bottom > heightSum && top > 0) {
        return;
      }

      var height = 0;
      var currentMonth;
      var visibleRange = [-1, -1];

      for (var i = 0; i < months.length; i++) {
        var visible = height <= bottom && height + heights[i] >= top;

        if (visible) {
          visibleRange[1] = i;

          if (!currentMonth) {
            currentMonth = months[i];
            visibleRange[0] = i;
          }

          if (!months[i].showed) {
            months[i].showed = true;
            this.$emit('month-show', {
              date: months[i].date,
              title: months[i].title
            });
          }
        }

        height += heights[i];
      }

      months.forEach(function (month, index) {
        month.visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
      });
      /* istanbul ignore else */

      if (currentMonth) {
        this.subtitle = currentMonth.title;
      }
    },
    onClickDay: function onClickDay(item) {
      if (this.readonly) {
        return;
      }

      var date = item.date;
      var type = this.type,
          currentDate = this.currentDate;

      if (type === 'range') {
        if (!currentDate) {
          this.select([date, null]);
          return;
        }

        var startDay = currentDate[0],
            endDay = currentDate[1];

        if (startDay && !endDay) {
          var compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (this.allowSameDay) {
            this.select([date, date], true);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === 'multiple') {
        if (!currentDate) {
          this.select([date]);
          return;
        }

        var selectedIndex;
        var selected = this.currentDate.some(function (dateItem, index) {
          var equal = compareDay(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          var _currentDate$splice = currentDate.splice(selectedIndex, 1),
              unselectedDate = _currentDate$splice[0];

          this.$emit('unselect', copyDate(unselectedDate));
        } else if (this.maxRange && currentDate.length >= this.maxRange) {
          es_toast(this.rangePrompt || utils_t('rangePrompt', this.maxRange));
        } else {
          this.select([].concat(currentDate, [date]));
        }
      } else {
        this.select(date, true);
      }
    },
    togglePopup: function togglePopup(val) {
      this.$emit('input', val);
    },
    select: function select(date, complete) {
      var _this3 = this;

      var emit = function emit(date) {
        _this3.currentDate = date;

        _this3.$emit('select', copyDates(_this3.currentDate));
      };

      if (complete && this.type === 'range') {
        var valid = this.checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.showConfirm) {
            emit([date[0], getDayByOffset(date[0], this.maxRange - 1)]);
          } else {
            emit(date);
          }

          return;
        }
      }

      emit(date);

      if (complete && !this.showConfirm) {
        this.onConfirm();
      }
    },
    checkRange: function checkRange(date) {
      var maxRange = this.maxRange,
          rangePrompt = this.rangePrompt;

      if (maxRange && calcDateNum(date) > maxRange) {
        es_toast(rangePrompt || utils_t('rangePrompt', maxRange));
        return false;
      }

      return true;
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', copyDates(this.currentDate));
    },
    genMonth: function genMonth(date, index) {
      var h = this.$createElement;
      var showMonthTitle = index !== 0 || !this.showSubtitle;
      return h(Month, {
        "ref": "months",
        "refInFor": true,
        "attrs": {
          "date": date,
          "type": this.type,
          "color": this.color,
          "minDate": this.minDate,
          "maxDate": this.maxDate,
          "showMark": this.showMark,
          "formatter": this.formatter,
          "rowHeight": this.rowHeight,
          "lazyRender": this.lazyRender,
          "currentDate": this.currentDate,
          "showSubtitle": this.showSubtitle,
          "allowSameDay": this.allowSameDay,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": this.dayOffset
        },
        "scopedSlots": {
          'top-info': this.$scopedSlots['top-info'],
          'bottom-info': this.$scopedSlots['bottom-info']
        },
        "on": {
          "click": this.onClickDay
        }
      });
    },
    genFooterContent: function genFooterContent() {
      var h = this.$createElement;
      var slot = this.slots('footer');

      if (slot) {
        return slot;
      }

      if (this.showConfirm) {
        var text = this.buttonDisabled ? this.confirmDisabledText : this.confirmText;
        return h(es_button, {
          "attrs": {
            "round": true,
            "block": true,
            "type": "danger",
            "color": this.color,
            "disabled": this.buttonDisabled,
            "nativeType": "button"
          },
          "class": utils_bem('confirm'),
          "on": {
            "click": this.onConfirm
          }
        }, [text || utils_t('confirm')]);
      }
    },
    genFooter: function genFooter() {
      var h = this.$createElement;
      return h("div", {
        "class": utils_bem('footer', {
          unfit: !this.safeAreaInsetBottom
        })
      }, [this.genFooterContent()]);
    },
    genCalendar: function genCalendar() {
      var _this4 = this;

      var h = this.$createElement;
      return h("div", {
        "class": utils_bem()
      }, [h(components_Header, {
        "attrs": {
          "title": this.title,
          "showTitle": this.showTitle,
          "subtitle": this.subtitle,
          "showSubtitle": this.showSubtitle,
          "firstDayOfWeek": this.dayOffset
        },
        "scopedSlots": {
          title: function title() {
            return _this4.slots('title');
          }
        }
      }), h("div", {
        "ref": "body",
        "class": utils_bem('body'),
        "on": {
          "scroll": this.onScroll
        }
      }, [this.months.map(this.genMonth)]), this.genFooter()]);
    }
  },
  render: function render() {
    var _this5 = this;

    var h = arguments[0];

    if (this.poppable) {
      var _attrs;

      var createListener = function createListener(name) {
        return function () {
          return _this5.$emit(name);
        };
      };

      return h(popup, {
        "attrs": (_attrs = {
          "round": true,
          "value": this.value
        }, _attrs["round"] = this.round, _attrs["position"] = this.position, _attrs["closeable"] = this.showTitle || this.showSubtitle, _attrs["getContainer"] = this.getContainer, _attrs["closeOnPopstate"] = this.closeOnPopstate, _attrs["closeOnClickOverlay"] = this.closeOnClickOverlay, _attrs),
        "class": utils_bem('popup'),
        "on": {
          "input": this.togglePopup,
          "open": createListener('open'),
          "opened": createListener('opened'),
          "close": createListener('close'),
          "closed": createListener('closed')
        }
      }, [this.genCalendar()]);
    }

    return this.genCalendar();
  }
}));
// CONCATENATED MODULE: ./es/image/index.js





var image_createNamespace = Object(create["a" /* createNamespace */])('image'),
    image_createComponent = image_createNamespace[0],
    image_bem = image_createNamespace[1];

/* harmony default export */ var es_image = (image_createComponent({
  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'photo-fail'
    },
    loadingIcon: {
      type: String,
      default: 'photo'
    }
  },
  data: function data() {
    return {
      loading: true,
      error: false
    };
  },
  watch: {
    src: function src() {
      this.loading = true;
      this.error = false;
    }
  },
  computed: {
    style: function style() {
      var style = {};

      if (Object(utils["c" /* isDef */])(this.width)) {
        style.width = Object(unit["a" /* addUnit */])(this.width);
      }

      if (Object(utils["c" /* isDef */])(this.height)) {
        style.height = Object(unit["a" /* addUnit */])(this.height);
      }

      if (Object(utils["c" /* isDef */])(this.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = Object(unit["a" /* addUnit */])(this.radius);
      }

      return style;
    }
  },
  created: function created() {
    var $Lazyload = this.$Lazyload;

    if ($Lazyload && utils["b" /* inBrowser */]) {
      $Lazyload.$on('loaded', this.onLazyLoaded);
      $Lazyload.$on('error', this.onLazyLoadError);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $Lazyload = this.$Lazyload;

    if ($Lazyload) {
      $Lazyload.$off('loaded', this.onLazyLoaded);
      $Lazyload.$off('error', this.onLazyLoadError);
    }
  },
  methods: {
    onLoad: function onLoad(event) {
      this.loading = false;
      this.$emit('load', event);
    },
    onLazyLoaded: function onLazyLoaded(_ref) {
      var el = _ref.el;

      if (el === this.$refs.image && this.loading) {
        this.onLoad();
      }
    },
    onLazyLoadError: function onLazyLoadError(_ref2) {
      var el = _ref2.el;

      if (el === this.$refs.image && !this.error) {
        this.onError();
      }
    },
    onError: function onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit('error', event);
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    },
    genPlaceholder: function genPlaceholder() {
      var h = this.$createElement;

      if (this.loading && this.showLoading) {
        return h("div", {
          "class": image_bem('loading')
        }, [this.slots('loading') || h(es_icon, {
          "attrs": {
            "name": this.loadingIcon,
            "classPrefix": this.iconPrefix
          },
          "class": image_bem('loading-icon')
        })]);
      }

      if (this.error && this.showError) {
        return h("div", {
          "class": image_bem('error')
        }, [this.slots('error') || h(es_icon, {
          "attrs": {
            "name": this.errorIcon,
            "classPrefix": this.iconPrefix
          },
          "class": image_bem('error-icon')
        })]);
      }
    },
    genImage: function genImage() {
      var h = this.$createElement;
      var imgData = {
        class: image_bem('img'),
        attrs: {
          alt: this.alt
        },
        style: {
          objectFit: this.fit
        }
      };

      if (this.error) {
        return;
      }

      if (this.lazyLoad) {
        return h("img", helper_default()([{
          "ref": "image",
          "directives": [{
            name: "lazy",
            value: this.src
          }]
        }, imgData]));
      }

      return h("img", helper_default()([{
        "attrs": {
          "src": this.src
        },
        "on": {
          "load": this.onLoad,
          "error": this.onError
        }
      }, imgData]));
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": image_bem({
        round: this.round
      }),
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [this.genImage(), this.genPlaceholder(), this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/card/index.js
 // Utils


 // Components


 // Types

var card_createNamespace = Object(create["a" /* createNamespace */])('card'),
    card_createComponent = card_createNamespace[0],
    card_bem = card_createNamespace[1];

function Card(h, props, slots, ctx) {
  var _slots$priceTop;

  var thumb = props.thumb;
  var showNum = slots.num || Object(utils["c" /* isDef */])(props.num);
  var showPrice = slots.price || Object(utils["c" /* isDef */])(props.price);
  var showOriginPrice = slots['origin-price'] || Object(utils["c" /* isDef */])(props.originPrice);
  var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;

  function onThumbClick(event) {
    functional_emit(ctx, 'click-thumb', event);
  }

  function ThumbTag() {
    if (slots.tag || props.tag) {
      return h("div", {
        "class": card_bem('tag')
      }, [slots.tag ? slots.tag() : h(es_tag, {
        "attrs": {
          "mark": true,
          "type": "danger"
        }
      }, [props.tag])]);
    }
  }

  function Thumb() {
    if (slots.thumb || thumb) {
      return h("a", {
        "attrs": {
          "href": props.thumbLink
        },
        "class": card_bem('thumb'),
        "on": {
          "click": onThumbClick
        }
      }, [slots.thumb ? slots.thumb() : h(es_image, {
        "attrs": {
          "src": thumb,
          "width": "100%",
          "height": "100%",
          "fit": "cover",
          "lazy-load": props.lazyLoad
        }
      }), ThumbTag()]);
    }
  }

  function Title() {
    if (slots.title) {
      return slots.title();
    }

    if (props.title) {
      return h("div", {
        "class": [card_bem('title'), 'van-multi-ellipsis--l2']
      }, [props.title]);
    }
  }

  function Desc() {
    if (slots.desc) {
      return slots.desc();
    }

    if (props.desc) {
      return h("div", {
        "class": [card_bem('desc'), 'van-ellipsis']
      }, [props.desc]);
    }
  }

  function PriceContent() {
    var priceArr = props.price.toString().split('.');
    return h("div", [h("span", {
      "class": card_bem('price-currency')
    }, [props.currency]), h("span", {
      "class": card_bem('price-integer')
    }, [priceArr[0]]), ".", h("span", {
      "class": card_bem('price-decimal')
    }, [priceArr[1]])]);
  }

  function Price() {
    if (showPrice) {
      return h("div", {
        "class": card_bem('price')
      }, [slots.price ? slots.price() : PriceContent()]);
    }
  }

  function OriginPrice() {
    if (showOriginPrice) {
      var slot = slots['origin-price'];
      return h("div", {
        "class": card_bem('origin-price')
      }, [slot ? slot() : props.currency + " " + props.originPrice]);
    }
  }

  function Num() {
    if (showNum) {
      return h("div", {
        "class": card_bem('num')
      }, [slots.num ? slots.num() : "x" + props.num]);
    }
  }

  function Footer() {
    if (slots.footer) {
      return h("div", {
        "class": card_bem('footer')
      }, [slots.footer()]);
    }
  }

  return h("div", helper_default()([{
    "class": card_bem()
  }, inherit(ctx, true)]), [h("div", {
    "class": card_bem('header')
  }, [Thumb(), h("div", {
    "class": card_bem('content', {
      centered: props.centered
    })
  }, [h("div", [Title(), Desc(), slots.tags == null ? void 0 : slots.tags()]), showBottom && h("div", {
    "class": "van-card__bottom"
  }, [(_slots$priceTop = slots['price-top']) == null ? void 0 : _slots$priceTop.call(slots), Price(), OriginPrice(), Num(), slots.bottom == null ? void 0 : slots.bottom()])])]), Footer()]);
}

Card.props = {
  tag: String,
  desc: String,
  thumb: String,
  title: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  num: [Number, String],
  price: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥'
  }
};
/* harmony default export */ var card = (card_createComponent(Card));
// CONCATENATED MODULE: ./es/tab/index.js





var tab_createNamespace = Object(create["a" /* createNamespace */])('tab'),
    tab_createComponent = tab_createNamespace[0],
    tab_bem = tab_createNamespace[1];

/* harmony default export */ var tab = (tab_createComponent({
  mixins: [ChildrenMixin('vanTabs')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    name: [Number, String],
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    titleClass: null,
    disabled: Boolean
  }),
  data: function data() {
    return {
      inited: false
    };
  },
  computed: {
    computedName: function computedName() {
      var _this$name;

      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    isActive: function isActive() {
      var active = this.computedName === this.parent.currentName;

      if (active) {
        this.inited = true;
      }

      return active;
    }
  },
  watch: {
    title: function title() {
      this.parent.setLine();
      this.parent.scrollIntoView();
    },
    inited: function inited(val) {
      var _this = this;

      if (this.parent.lazyRender && val) {
        this.$nextTick(function () {
          _this.parent.$emit('rendered', _this.computedName, _this.title);
        });
      }
    }
  },
  render: function render(h) {
    var slots = this.slots,
        parent = this.parent,
        isActive = this.isActive;
    var slotContent = slots();

    if (false) {}

    if (!slotContent && !parent.animated) {
      return;
    }

    var show = parent.scrollspy || isActive;
    var shouldRender = this.inited || parent.scrollspy || !parent.lazyRender;
    var Content = shouldRender ? slotContent : h();

    if (parent.animated) {
      return h("div", {
        "attrs": {
          "role": "tabpanel",
          "aria-hidden": !isActive
        },
        "class": tab_bem('pane-wrapper', {
          inactive: !isActive
        })
      }, [h("div", {
        "class": tab_bem('pane')
      }, [Content])]);
    }

    return h("div", {
      "directives": [{
        name: "show",
        value: show
      }],
      "attrs": {
        "role": "tabpanel"
      },
      "class": tab_bem('pane')
    }, [Content]);
  }
}));
// CONCATENATED MODULE: ./es/tabs/utils.js


function scrollLeftTo(scroller, to, duration) {
  var count = 0;
  var from = scroller.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      Object(raf["c" /* raf */])(animate);
    }
  }

  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  var current = getScrollTop(scroller);
  var isDown = current < to;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  var step = (to - current) / frames;

  function animate() {
    current += step;

    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }

    setScrollTop(scroller, current);

    if (isDown && current < to || !isDown && current > to) {
      Object(raf["c" /* raf */])(animate);
    } else if (callback) {
      Object(raf["c" /* raf */])(callback);
    }
  }

  animate();
}
// CONCATENATED MODULE: ./es/utils/dom/style.js
function isHidden(el) {
  var style = window.getComputedStyle(el);
  var hidden = style.display === 'none'; // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed

  var parentHidden = el.offsetParent === null && style.position !== 'fixed';
  return hidden || parentHidden;
}
// CONCATENATED MODULE: ./es/utils/interceptor.js

function callInterceptor(options) {
  var interceptor = options.interceptor,
      args = options.args,
      done = options.done;

  if (interceptor) {
    var returnVal = interceptor.apply(void 0, args);

    if (Object(utils["g" /* isPromise */])(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        }
      }).catch(utils["i" /* noop */]);
    } else if (returnVal) {
      done();
    }
  } else {
    done();
  }
}
// CONCATENATED MODULE: ./es/tabs/Title.js



var Title_createNamespace = Object(create["a" /* createNamespace */])('tab'),
    Title_createComponent = Title_createNamespace[0],
    Title_bem = Title_createNamespace[1];

/* harmony default export */ var tabs_Title = (Title_createComponent({
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String
  },
  computed: {
    style: function style() {
      var style = {};
      var color = this.color,
          isActive = this.isActive;
      var isCard = this.type === 'card'; // card theme color

      if (color && isCard) {
        style.borderColor = color;

        if (!this.disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      var titleColor = isActive ? this.activeColor : this.inactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
    },
    genText: function genText() {
      var h = this.$createElement;
      var Text = h("span", {
        "class": Title_bem('text', {
          ellipsis: !this.scrollable
        })
      }, [this.slots() || this.title]);

      if (this.dot || Object(utils["c" /* isDef */])(this.info) && this.info !== '') {
        return h("span", {
          "class": Title_bem('text-wrapper')
        }, [Text, h(es_info, {
          "attrs": {
            "dot": this.dot,
            "info": this.info
          }
        })]);
      }

      return Text;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "tab",
        "aria-selected": this.isActive
      },
      "class": [Title_bem({
        active: this.isActive,
        disabled: this.disabled
      })],
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [this.genText()]);
  }
}));
// CONCATENATED MODULE: ./es/sticky/index.js






var sticky_createNamespace = Object(create["a" /* createNamespace */])('sticky'),
    sticky_createComponent = sticky_createNamespace[0],
    sticky_bem = sticky_createNamespace[1];

/* harmony default export */ var es_sticky = (sticky_createComponent({
  mixins: [BindEventMixin(function (bind, isBind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }

    if (this.observer) {
      var method = isBind ? 'observe' : 'unobserve';
      this.observer[method](this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll, true);
    this.onScroll();
  })],
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      fixed: false,
      height: 0,
      transform: 0
    };
  },
  computed: {
    offsetTopPx: function offsetTopPx() {
      return Object(unit["b" /* unitToPx */])(this.offsetTop);
    },
    style: function style() {
      if (!this.fixed) {
        return;
      }

      var style = {};

      if (Object(utils["c" /* isDef */])(this.zIndex)) {
        style.zIndex = this.zIndex;
      }

      if (this.offsetTopPx && this.fixed) {
        style.top = this.offsetTopPx + "px";
      }

      if (this.transform) {
        style.transform = "translate3d(0, " + this.transform + "px, 0)";
      }

      return style;
    }
  },
  watch: {
    fixed: function fixed(isFixed) {
      this.$emit('change', isFixed);
    }
  },
  created: function created() {
    var _this = this; // compatibility: https://caniuse.com/#feat=intersectionobserver


    if (!utils["h" /* isServer */] && window.IntersectionObserver) {
      this.observer = new IntersectionObserver(function (entries) {
        // trigger scroll when visibility changed
        if (entries[0].intersectionRatio > 0) {
          _this.onScroll();
        }
      }, {
        root: document.body
      });
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this2 = this;

      if (isHidden(this.$el)) {
        return;
      }

      this.height = this.$el.offsetHeight;
      var container = this.container,
          offsetTopPx = this.offsetTopPx;
      var scrollTop = getScrollTop(window);
      var topToPageTop = getElementTop(this.$el);

      var emitScrollEvent = function emitScrollEvent() {
        _this2.$emit('scroll', {
          scrollTop: scrollTop,
          isFixed: _this2.fixed
        });
      }; // The sticky component should be kept inside the container element


      if (container) {
        var bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTopPx + this.height > bottomToPageTop) {
          var distanceToBottom = this.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTopPx);
          } else {
            this.fixed = false;
          }

          emitScrollEvent();
          return;
        }
      }

      if (scrollTop + offsetTopPx > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }

      emitScrollEvent();
    }
  },
  render: function render() {
    var h = arguments[0];
    var fixed = this.fixed;
    var style = {
      height: fixed ? this.height + "px" : null
    };
    return h("div", {
      "style": style
    }, [h("div", {
      "class": sticky_bem({
        fixed: fixed
      }),
      "style": this.style
    }, [this.slots()])]);
  }
}));
// CONCATENATED MODULE: ./es/tabs/Content.js




var Content_createNamespace = Object(create["a" /* createNamespace */])('tabs'),
    Content_createComponent = Content_createNamespace[0],
    Content_bem = Content_createNamespace[1];

var MIN_SWIPE_DISTANCE = 50;
/* harmony default export */ var tabs_Content = (Content_createComponent({
  mixins: [TouchMixin],
  props: {
    count: Number,
    duration: [Number, String],
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number
  },
  computed: {
    style: function style() {
      if (this.animated) {
        return {
          transform: "translate3d(" + -1 * this.currentIndex * 100 + "%, 0, 0)",
          transitionDuration: this.duration + "s"
        };
      }
    },
    listeners: function listeners() {
      if (this.swipeable) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd
        };
      }
    }
  },
  methods: {
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      var direction = this.direction,
          deltaX = this.deltaX,
          currentIndex = this.currentIndex;
      /* istanbul ignore else */

      if (direction === 'horizontal' && this.offsetX >= MIN_SWIPE_DISTANCE) {
        /* istanbul ignore else */
        if (deltaX > 0 && currentIndex !== 0) {
          this.$emit('change', currentIndex - 1);
        } else if (deltaX < 0 && currentIndex !== this.count - 1) {
          this.$emit('change', currentIndex + 1);
        }
      }
    },
    genChildren: function genChildren() {
      var h = this.$createElement;

      if (this.animated) {
        return h("div", {
          "class": Content_bem('track'),
          "style": this.style
        }, [this.slots()]);
      }

      return this.slots();
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": Content_bem('content', {
        animated: this.animated
      }),
      "on": _extends({}, this.listeners)
    }, [this.genChildren()]);
  }
}));
// CONCATENATED MODULE: ./es/tabs/index.js
// Utils








 // Mixins


 // Components





var tabs_createNamespace = Object(create["a" /* createNamespace */])('tabs'),
    tabs_createComponent = tabs_createNamespace[0],
    tabs_bem = tabs_createNamespace[1];

/* harmony default export */ var tabs = (tabs_createComponent({
  mixins: [ParentMixin('vanTabs'), BindEventMixin(function (bind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }

    bind(window, 'resize', this.resize, true);

    if (this.scrollspy) {
      bind(this.scroller, 'scroll', this.onScroll, true);
    }
  })],
  inject: {
    vanPopup: {
      default: null
    }
  },
  model: {
    prop: 'active'
  },
  props: {
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: 'line'
    },
    active: {
      type: [Number, String],
      default: 0
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.3
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    swipeThreshold: {
      type: [Number, String],
      default: 5
    }
  },
  data: function data() {
    return {
      position: '',
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color
      }
    };
  },
  computed: {
    // whether the nav is scrollable
    scrollable: function scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color,
        background: this.background
      };
    },
    currentName: function currentName() {
      var activeTab = this.children[this.currentIndex];

      if (activeTab) {
        return activeTab.computedName;
      }
    },
    offsetTopPx: function offsetTopPx() {
      return Object(unit["b" /* unitToPx */])(this.offsetTop);
    },
    scrollOffset: function scrollOffset() {
      if (this.sticky) {
        return this.offsetTopPx + this.tabHeight;
      }

      return 0;
    }
  },
  watch: {
    color: 'setLine',
    active: function active(name) {
      if (name !== this.currentName) {
        this.setCurrentIndexByName(name);
      }
    },
    children: function children() {
      var _this = this;

      this.setCurrentIndexByName(this.active);
      this.setLine();
      this.$nextTick(function () {
        _this.scrollIntoView(true);
      });
    },
    currentIndex: function currentIndex() {
      this.scrollIntoView();
      this.setLine(); // scroll to correct position

      if (this.stickyFixed && !this.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(this.$el) - this.offsetTopPx));
      }
    },
    scrollspy: function scrollspy(val) {
      if (val) {
        event_on(this.scroller, 'scroll', this.onScroll, true);
      } else {
        off(this.scroller, 'scroll', this.onScroll);
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.init(); // https://github.com/youzan/vant/issues/7959

    if (this.vanPopup) {
      this.vanPopup.onReopen(function () {
        _this2.setLine();
      });
    }
  },
  activated: function activated() {
    this.init();
    this.setLine();
  },
  methods: {
    // @exposed-api
    resize: function resize() {
      this.setLine();
    },
    init: function init() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.inited = true;
        _this3.tabHeight = getVisibleHeight(_this3.$refs.wrap);

        _this3.scrollIntoView(true);
      });
    },
    // update nav bar style
    setLine: function setLine() {
      var _this4 = this;

      var shouldAnimate = this.inited;
      this.$nextTick(function () {
        var titles = _this4.$refs.titles;

        if (!titles || !titles[_this4.currentIndex] || _this4.type !== 'line' || isHidden(_this4.$el)) {
          return;
        }

        var title = titles[_this4.currentIndex].$el;
        var lineWidth = _this4.lineWidth,
            lineHeight = _this4.lineHeight;
        var left = title.offsetLeft + title.offsetWidth / 2;
        var lineStyle = {
          width: Object(unit["a" /* addUnit */])(lineWidth),
          backgroundColor: _this4.color,
          transform: "translateX(" + left + "px) translateX(-50%)"
        };

        if (shouldAnimate) {
          lineStyle.transitionDuration = _this4.duration + "s";
        }

        if (Object(utils["c" /* isDef */])(lineHeight)) {
          var height = Object(unit["a" /* addUnit */])(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        _this4.lineStyle = lineStyle;
      });
    },
    // correct the index of active tab
    setCurrentIndexByName: function setCurrentIndexByName(name) {
      var matched = this.children.filter(function (tab) {
        return tab.computedName === name;
      });
      var defaultIndex = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex);
    },
    setCurrentIndex: function setCurrentIndex(currentIndex) {
      var newIndex = this.findAvailableTab(currentIndex);

      if (!Object(utils["c" /* isDef */])(newIndex)) {
        return;
      }

      var newTab = this.children[newIndex];
      var newName = newTab.computedName;
      var shouldEmitChange = this.currentIndex !== null;
      this.currentIndex = newIndex;

      if (newName !== this.active) {
        this.$emit('input', newName);

        if (shouldEmitChange) {
          this.$emit('change', newName, newTab.title);
        }
      }
    },
    findAvailableTab: function findAvailableTab(index) {
      var diff = index < this.currentIndex ? -1 : 1;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    // emit event when clicked
    onClick: function onClick(item, index) {
      var _this5 = this;

      var _this$children$index = this.children[index],
          title = _this$children$index.title,
          disabled = _this$children$index.disabled,
          computedName = _this$children$index.computedName;

      if (disabled) {
        this.$emit('disabled', computedName, title);
      } else {
        callInterceptor({
          interceptor: this.beforeChange,
          args: [computedName],
          done: function done() {
            _this5.setCurrentIndex(index);

            _this5.scrollToCurrentContent();
          }
        });
        this.$emit('click', computedName, title);
        route(item.$router, item);
      }
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var titles = this.$refs.titles;

      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }

      var nav = this.$refs.nav;
      var title = titles[this.currentIndex].$el;
      var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +this.duration);
    },
    onSticktScroll: function onSticktScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit('scroll', params);
    },
    // @exposed-api
    scrollTo: function scrollTo(name) {
      var _this6 = this;

      this.$nextTick(function () {
        _this6.setCurrentIndexByName(name);

        _this6.scrollToCurrentContent(true);
      });
    },
    scrollToCurrentContent: function scrollToCurrentContent(immediate) {
      var _this7 = this;

      if (immediate === void 0) {
        immediate = false;
      }

      if (this.scrollspy) {
        var target = this.children[this.currentIndex];
        var el = target == null ? void 0 : target.$el;

        if (el) {
          var to = getElementTop(el, this.scroller) - this.scrollOffset;
          this.lockScroll = true;
          scrollTopTo(this.scroller, to, immediate ? 0 : +this.duration, function () {
            _this7.lockScroll = false;
          });
        }
      }
    },
    onScroll: function onScroll() {
      if (this.scrollspy && !this.lockScroll) {
        var index = this.getCurrentIndexOnScroll();
        this.setCurrentIndex(index);
      }
    },
    getCurrentIndexOnScroll: function getCurrentIndexOnScroll() {
      var children = this.children;

      for (var index = 0; index < children.length; index++) {
        var top = getVisibleTop(children[index].$el);

        if (top > this.scrollOffset) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    }
  },
  render: function render() {
    var _this8 = this,
        _ref;

    var h = arguments[0];
    var type = this.type,
        animated = this.animated,
        scrollable = this.scrollable;
    var Nav = this.children.map(function (item, index) {
      var _item$badge;

      return h(tabs_Title, {
        "ref": "titles",
        "refInFor": true,
        "attrs": {
          "type": type,
          "dot": item.dot,
          "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
          "title": item.title,
          "color": _this8.color,
          "isActive": index === _this8.currentIndex,
          "disabled": item.disabled,
          "scrollable": scrollable,
          "activeColor": _this8.titleActiveColor,
          "inactiveColor": _this8.titleInactiveColor
        },
        "style": item.titleStyle,
        "class": item.titleClass,
        "scopedSlots": {
          default: function _default() {
            return item.slots('title');
          }
        },
        "on": {
          "click": function click() {
            _this8.onClick(item, index);
          }
        }
      });
    });
    var Wrap = h("div", {
      "ref": "wrap",
      "class": [tabs_bem('wrap', {
        scrollable: scrollable
      }), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = type === 'line' && this.border, _ref)]
    }, [h("div", {
      "ref": "nav",
      "attrs": {
        "role": "tablist"
      },
      "class": tabs_bem('nav', [type, {
        complete: this.scrollable
      }]),
      "style": this.navStyle
    }, [this.slots('nav-left'), Nav, type === 'line' && h("div", {
      "class": tabs_bem('line'),
      "style": this.lineStyle
    }), this.slots('nav-right')])]);
    return h("div", {
      "class": tabs_bem([type])
    }, [this.sticky ? h(es_sticky, {
      "attrs": {
        "container": this.$el,
        "offsetTop": this.offsetTop
      },
      "on": {
        "scroll": this.onSticktScroll
      }
    }, [Wrap]) : Wrap, h(tabs_Content, {
      "attrs": {
        "count": this.children.length,
        "animated": animated,
        "duration": this.duration,
        "swipeable": this.swipeable,
        "currentIndex": this.currentIndex
      },
      "on": {
        "change": this.setCurrentIndex
      }
    }, [this.slots()])]);
  }
}));
// CONCATENATED MODULE: ./es/cascader/index.js





var cascader_createNamespace = Object(create["a" /* createNamespace */])('cascader'),
    cascader_createComponent = cascader_createNamespace[0],
    cascader_bem = cascader_createNamespace[1],
    cascader_t = cascader_createNamespace[2];

/* harmony default export */ var cascader = (cascader_createComponent({
  props: {
    title: String,
    value: [Number, String],
    fieldNames: Object,
    placeholder: String,
    activeColor: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    closeable: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tabs: [],
      activeTab: 0
    };
  },
  computed: {
    textKey: function textKey() {
      var _this$fieldNames;

      return ((_this$fieldNames = this.fieldNames) == null ? void 0 : _this$fieldNames.text) || 'text';
    },
    valueKey: function valueKey() {
      var _this$fieldNames2;

      return ((_this$fieldNames2 = this.fieldNames) == null ? void 0 : _this$fieldNames2.value) || 'value';
    },
    childrenKey: function childrenKey() {
      var _this$fieldNames3;

      return ((_this$fieldNames3 = this.fieldNames) == null ? void 0 : _this$fieldNames3.children) || 'children';
    }
  },
  watch: {
    options: {
      deep: true,
      handler: 'updateTabs'
    },
    value: function value(_value) {
      var _this = this;

      if (_value || _value === 0) {
        var values = this.tabs.map(function (tab) {
          var _tab$selectedOption;

          return (_tab$selectedOption = tab.selectedOption) == null ? void 0 : _tab$selectedOption[_this.valueKey];
        });

        if (values.indexOf(_value) !== -1) {
          return;
        }
      }

      this.updateTabs();
    }
  },
  created: function created() {
    this.updateTabs();
  },
  methods: {
    getSelectedOptionsByValue: function getSelectedOptionsByValue(options, value) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option[this.valueKey] === value) {
          return [option];
        }

        if (option[this.childrenKey]) {
          var selectedOptions = this.getSelectedOptionsByValue(option[this.childrenKey], value);

          if (selectedOptions) {
            return [option].concat(selectedOptions);
          }
        }
      }
    },
    updateTabs: function updateTabs() {
      var _this2 = this;

      if (this.value || this.value === 0) {
        var selectedOptions = this.getSelectedOptionsByValue(this.options, this.value);

        if (selectedOptions) {
          var optionsCursor = this.options;
          this.tabs = selectedOptions.map(function (option) {
            var tab = {
              options: optionsCursor,
              selectedOption: option
            };
            var next = optionsCursor.filter(function (item) {
              return item[_this2.valueKey] === option[_this2.valueKey];
            });

            if (next.length) {
              optionsCursor = next[0][_this2.childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null
            });
          }

          this.$nextTick(function () {
            _this2.activeTab = _this2.tabs.length - 1;
          });
          return;
        }
      }

      this.tabs = [{
        options: this.options,
        selectedOption: null
      }];
    },
    onSelect: function onSelect(option, tabIndex) {
      var _this3 = this;

      this.tabs[tabIndex].selectedOption = option;

      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }

      if (option[this.childrenKey]) {
        var nextTab = {
          options: option[this.childrenKey],
          selectedOption: null
        };

        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }

        this.$nextTick(function () {
          _this3.activeTab++;
        });
      }

      var selectedOptions = this.tabs.map(function (tab) {
        return tab.selectedOption;
      }).filter(function (item) {
        return !!item;
      });
      var eventParams = {
        value: option[this.valueKey],
        tabIndex: tabIndex,
        selectedOptions: selectedOptions
      };
      this.$emit('input', option[this.valueKey]);
      this.$emit('change', eventParams);

      if (!option[this.childrenKey]) {
        this.$emit('finish', eventParams);
      }
    },
    onClose: function onClose() {
      this.$emit('close');
    },
    renderHeader: function renderHeader() {
      var h = this.$createElement;

      if (this.showHeader) {
        return h("div", {
          "class": cascader_bem('header')
        }, [h("h2", {
          "class": cascader_bem('title')
        }, [this.slots('title') || this.title]), this.closeable ? h(es_icon, {
          "attrs": {
            "name": "cross"
          },
          "class": cascader_bem('close-icon'),
          "on": {
            "click": this.onClose
          }
        }) : null]);
      }
    },
    renderOptions: function renderOptions(options, selectedOption, tabIndex) {
      var _this4 = this;

      var h = this.$createElement;

      var renderOption = function renderOption(option) {
        var isSelected = selectedOption && option[_this4.valueKey] === selectedOption[_this4.valueKey];
        var Text = _this4.slots('option', {
          option: option,
          selected: isSelected
        }) || h("span", [option[_this4.textKey]]);
        return h("li", {
          "class": cascader_bem('option', {
            selected: isSelected
          }),
          "style": {
            color: isSelected ? _this4.activeColor : null
          },
          "on": {
            "click": function click() {
              _this4.onSelect(option, tabIndex);
            }
          }
        }, [Text, isSelected ? h(es_icon, {
          "attrs": {
            "name": "success"
          },
          "class": cascader_bem('selected-icon')
        }) : null]);
      };

      return h("ul", {
        "class": cascader_bem('options')
      }, [options.map(renderOption)]);
    },
    renderTab: function renderTab(item, tabIndex) {
      var h = this.$createElement;
      var options = item.options,
          selectedOption = item.selectedOption;
      var title = selectedOption ? selectedOption[this.textKey] : this.placeholder || cascader_t('select');
      return h(tab, {
        "attrs": {
          "title": title,
          "titleClass": cascader_bem('tab', {
            unselected: !selectedOption
          })
        }
      }, [this.renderOptions(options, selectedOption, tabIndex)]);
    },
    renderTabs: function renderTabs() {
      var _this5 = this;

      var h = this.$createElement;
      return h(tabs, {
        "attrs": {
          "animated": true,
          "swipeable": true,
          "swipeThreshold": 0,
          "color": this.activeColor
        },
        "class": cascader_bem('tabs'),
        "model": {
          value: _this5.activeTab,
          callback: function callback($$v) {
            _this5.activeTab = $$v;
          }
        }
      }, [this.tabs.map(this.renderTab)]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": cascader_bem()
    }, [this.renderHeader(), this.renderTabs()]);
  }
}));
// CONCATENATED MODULE: ./es/cell-group/index.js
 // Utils



 // Types

var cell_group_createNamespace = Object(create["a" /* createNamespace */])('cell-group'),
    cell_group_createComponent = cell_group_createNamespace[0],
    cell_group_bem = cell_group_createNamespace[1];

function CellGroup(h, props, slots, ctx) {
  var _ref;

  var Group = h("div", helper_default()([{
    "class": [cell_group_bem({
      inset: props.inset
    }), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = props.border, _ref)]
  }, inherit(ctx, true)]), [slots.default == null ? void 0 : slots.default()]);

  if (props.title || slots.title) {
    return h("div", {
      "key": ctx.data.key
    }, [h("div", {
      "class": cell_group_bem('title', {
        inset: props.inset
      })
    }, [slots.title ? slots.title() : props.title]), Group]);
  }

  return Group;
}

CellGroup.props = {
  title: String,
  inset: Boolean,
  border: {
    type: Boolean,
    default: true
  }
};
/* harmony default export */ var cell_group = (cell_group_createComponent(CellGroup));
// CONCATENATED MODULE: ./es/checkbox/index.js



var checkbox_createNamespace = Object(create["a" /* createNamespace */])('checkbox'),
    checkbox_createComponent = checkbox_createNamespace[0],
    checkbox_bem = checkbox_createNamespace[1];

/* harmony default export */ var es_checkbox = (checkbox_createComponent({
  mixins: [checkbox_CheckboxMixin({
    bem: checkbox_bem,
    role: 'checkbox',
    parent: 'vanCheckbox'
  })],
  computed: {
    checked: {
      get: function get() {
        if (this.parent) {
          return this.parent.value.indexOf(this.name) !== -1;
        }

        return this.value;
      },
      set: function set(val) {
        if (this.parent) {
          this.setParentValue(val);
        } else {
          this.$emit('input', val);
        }
      }
    }
  },
  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },
  methods: {
    // @exposed-api
    toggle: function toggle(checked) {
      var _this = this;

      if (checked === void 0) {
        checked = !this.checked;
      } // When toggle method is called multiple times at the same time,
      // only the last call is valid.
      // This is a hack for usage inside Cell.


      clearTimeout(this.toggleTask);
      this.toggleTask = setTimeout(function () {
        _this.checked = checked;
      });
    },
    setParentValue: function setParentValue(val) {
      var parent = this.parent;
      var value = parent.value.slice();

      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }
        /* istanbul ignore else */


        if (value.indexOf(this.name) === -1) {
          value.push(this.name);
          parent.$emit('input', value);
        }
      } else {
        var index = value.indexOf(this.name);
        /* istanbul ignore else */

        if (index !== -1) {
          value.splice(index, 1);
          parent.$emit('input', value);
        }
      }
    }
  }
}));
// CONCATENATED MODULE: ./es/checkbox-group/index.js




var checkbox_group_createNamespace = Object(create["a" /* createNamespace */])('checkbox-group'),
    checkbox_group_createComponent = checkbox_group_createNamespace[0],
    checkbox_group_bem = checkbox_group_createNamespace[1];

/* harmony default export */ var checkbox_group = (checkbox_group_createComponent({
  mixins: [ParentMixin('vanCheckbox'), FieldMixin],
  props: {
    max: [Number, String],
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },
  methods: {
    // @exposed-api
    toggleAll: function toggleAll(options) {
      if (options === void 0) {
        options = {};
      }

      if (typeof options === 'boolean') {
        options = {
          checked: options
        };
      }

      var _options = options,
          checked = _options.checked,
          skipDisabled = _options.skipDisabled;
      var children = this.children.filter(function (item) {
        if (item.disabled && skipDisabled) {
          return item.checked;
        }

        return checked != null ? checked : !item.checked;
      });
      var names = children.map(function (item) {
        return item.name;
      });
      this.$emit('input', names);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": checkbox_group_bem([this.direction])
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/circle/index.js



var circle_createNamespace = Object(create["a" /* createNamespace */])('circle'),
    circle_createComponent = circle_createNamespace[0],
    circle_bem = circle_createNamespace[1];

var PERIMETER = 3140;
var circle_uid = 0;

function circle_format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}

/* harmony default export */ var circle = (circle_createComponent({
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    layerColor: String,
    strokeLinecap: String,
    value: {
      type: Number,
      default: 0
    },
    speed: {
      type: [Number, String],
      default: 0
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate: function beforeCreate() {
    this.uid = "van-circle-gradient-" + circle_uid++;
  },
  computed: {
    style: function style() {
      var size = Object(unit["a" /* addUnit */])(this.size);
      return {
        width: size,
        height: size
      };
    },
    path: function path() {
      return getPath(this.clockwise, this.viewBoxSize);
    },
    viewBoxSize: function viewBoxSize() {
      return +this.strokeWidth + 1000;
    },
    layerStyle: function layerStyle() {
      return {
        fill: "" + this.fill,
        stroke: "" + this.layerColor,
        strokeWidth: this.strokeWidth + "px"
      };
    },
    hoverStyle: function hoverStyle() {
      var offset = PERIMETER * this.value / 100;
      return {
        stroke: "" + (this.gradient ? "url(#" + this.uid + ")" : this.color),
        strokeWidth: +this.strokeWidth + 1 + "px",
        strokeLinecap: this.strokeLinecap,
        strokeDasharray: offset + "px " + PERIMETER + "px"
      };
    },
    gradient: function gradient() {
      return Object(utils["f" /* isObject */])(this.color);
    },
    LinearGradient: function LinearGradient() {
      var _this = this;

      var h = this.$createElement;

      if (!this.gradient) {
        return;
      }

      var Stops = Object.keys(this.color).sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      }).map(function (key, index) {
        return h("stop", {
          "key": index,
          "attrs": {
            "offset": key,
            "stop-color": _this.color[key]
          }
        });
      });
      return h("defs", [h("linearGradient", {
        "attrs": {
          "id": this.uid,
          "x1": "100%",
          "y1": "0%",
          "x2": "0%",
          "y2": "0%"
        }
      }, [Stops])]);
    }
  },
  watch: {
    rate: {
      handler: function handler(rate) {
        this.startTime = Date.now();
        this.startRate = this.value;
        this.endRate = circle_format(rate);
        this.increase = this.endRate > this.startRate;
        this.duration = Math.abs((this.startRate - this.endRate) * 1000 / this.speed);

        if (this.speed) {
          Object(raf["a" /* cancelRaf */])(this.rafId);
          this.rafId = Object(raf["c" /* raf */])(this.animate);
        } else {
          this.$emit('input', this.endRate);
        }
      },
      immediate: true
    }
  },
  methods: {
    animate: function animate() {
      var now = Date.now();
      var progress = Math.min((now - this.startTime) / this.duration, 1);
      var rate = progress * (this.endRate - this.startRate) + this.startRate;
      this.$emit('input', circle_format(parseFloat(rate.toFixed(1))));

      if (this.increase ? rate < this.endRate : rate > this.endRate) {
        this.rafId = Object(raf["c" /* raf */])(this.animate);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": circle_bem(),
      "style": this.style
    }, [h("svg", {
      "attrs": {
        "viewBox": "0 0 " + this.viewBoxSize + " " + this.viewBoxSize
      }
    }, [this.LinearGradient, h("path", {
      "class": circle_bem('layer'),
      "style": this.layerStyle,
      "attrs": {
        "d": this.path
      }
    }), h("path", {
      "attrs": {
        "d": this.path
      },
      "class": circle_bem('hover'),
      "style": this.hoverStyle
    })]), this.slots() || this.text && h("div", {
      "class": circle_bem('text')
    }, [this.text])]);
  }
}));
// CONCATENATED MODULE: ./es/col/index.js



var col_createNamespace = Object(create["a" /* createNamespace */])('col'),
    col_createComponent = col_createNamespace[0],
    col_bem = col_createNamespace[1];

/* harmony default export */ var col = (col_createComponent({
  mixins: [ChildrenMixin('vanRow')],
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    style: function style() {
      var index = this.index;

      var _ref = this.parent || {},
          spaces = _ref.spaces;

      if (spaces && spaces[index]) {
        var _spaces$index = spaces[index],
            left = _spaces$index.left,
            right = _spaces$index.right;
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null
        };
      }
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  render: function render() {
    var _bem;

    var h = arguments[0];
    var span = this.span,
        offset = this.offset;
    return h(this.tag, {
      "style": this.style,
      "class": col_bem((_bem = {}, _bem[span] = span, _bem["offset-" + offset] = offset, _bem)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/collapse/index.js




var collapse_createNamespace = Object(create["a" /* createNamespace */])('collapse'),
    collapse_createComponent = collapse_createNamespace[0],
    collapse_bem = collapse_createNamespace[1];

/* harmony default export */ var collapse = (collapse_createComponent({
  mixins: [ParentMixin('vanCollapse')],
  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    switch: function _switch(name, expanded) {
      if (!this.accordion) {
        name = expanded ? this.value.concat(name) : this.value.filter(function (activeName) {
          return activeName !== name;
        });
      }

      this.$emit('change', name);
      this.$emit('input', name);
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("div", {
      "class": [collapse_bem(), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = this.border, _ref)]
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/collapse-item/index.js
 // Utils


 // Mixins

 // Components




var collapse_item_createNamespace = Object(create["a" /* createNamespace */])('collapse-item'),
    collapse_item_createComponent = collapse_item_createNamespace[0],
    collapse_item_bem = collapse_item_createNamespace[1];

var CELL_SLOTS = ['title', 'icon', 'right-icon'];
/* harmony default export */ var collapse_item = (collapse_item_createComponent({
  mixins: [ChildrenMixin('vanCollapse')],
  props: _extends({}, cellProps, {
    name: [Number, String],
    disabled: Boolean,
    lazyRender: {
      type: Boolean,
      default: true
    },
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  data: function data() {
    return {
      show: null,
      inited: null
    };
  },
  computed: {
    currentName: function currentName() {
      var _this$name;

      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    expanded: function expanded() {
      var _this = this;

      if (!this.parent) {
        return null;
      }

      var _this$parent = this.parent,
          value = _this$parent.value,
          accordion = _this$parent.accordion;

      if (false) {}

      return accordion ? value === this.currentName : value.some(function (name) {
        return name === _this.currentName;
      });
    }
  },
  created: function created() {
    this.show = this.expanded;
    this.inited = this.expanded;
  },
  watch: {
    expanded: function expanded(_expanded, prev) {
      var _this2 = this;

      if (prev === null) {
        return;
      }

      if (_expanded) {
        this.show = true;
        this.inited = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var nextTick = _expanded ? this.$nextTick : raf["c" /* raf */];
      nextTick(function () {
        var _this2$$refs = _this2.$refs,
            content = _this2$$refs.content,
            wrapper = _this2$$refs.wrapper;

        if (!content || !wrapper) {
          return;
        }

        var offsetHeight = content.offsetHeight;

        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapper.style.height = _expanded ? 0 : contentHeight; // use double raf to ensure animation can start

          Object(raf["b" /* doubleRaf */])(function () {
            wrapper.style.height = _expanded ? contentHeight : 0;
          });
        } else {
          _this2.onTransitionEnd();
        }
      });
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.toggle();
      }
    },
    // @exposed-api
    toggle: function toggle(expanded) {
      if (expanded === void 0) {
        expanded = !this.expanded;
      }

      var parent = this.parent,
          currentName = this.currentName;
      var close = parent.accordion && currentName === parent.value;
      var name = close ? '' : currentName;
      this.parent.switch(name, expanded);
    },
    onTransitionEnd: function onTransitionEnd() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = '';
      }
    },
    genTitle: function genTitle() {
      var _this3 = this;

      var h = this.$createElement;
      var border = this.border,
          disabled = this.disabled,
          expanded = this.expanded;
      var titleSlots = CELL_SLOTS.reduce(function (slots, name) {
        if (_this3.slots(name)) {
          slots[name] = function () {
            return _this3.slots(name);
          };
        }

        return slots;
      }, {});

      if (this.slots('value')) {
        titleSlots.default = function () {
          return _this3.slots('value');
        };
      }

      return h(cell, {
        "attrs": {
          "role": "button",
          "tabindex": disabled ? -1 : 0,
          "aria-expanded": String(expanded)
        },
        "class": collapse_item_bem('title', {
          disabled: disabled,
          expanded: expanded,
          borderless: !border
        }),
        "on": {
          "click": this.onClick
        },
        "scopedSlots": titleSlots,
        "props": _extends({}, this.$props)
      });
    },
    genContent: function genContent() {
      var h = this.$createElement;

      if (this.inited || !this.lazyRender) {
        return h("div", {
          "directives": [{
            name: "show",
            value: this.show
          }],
          "ref": "wrapper",
          "class": collapse_item_bem('wrapper'),
          "on": {
            "transitionend": this.onTransitionEnd
          }
        }, [h("div", {
          "ref": "content",
          "class": collapse_item_bem('content')
        }, [this.slots()])]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [collapse_item_bem({
        border: this.index && this.border
      })]
    }, [this.genTitle(), this.genContent()]);
  }
}));
// CONCATENATED MODULE: ./es/contact-card/index.js
 // Utils


 // Components

 // Types

var contact_card_createNamespace = Object(create["a" /* createNamespace */])('contact-card'),
    contact_card_createComponent = contact_card_createNamespace[0],
    contact_card_bem = contact_card_createNamespace[1],
    contact_card_t = contact_card_createNamespace[2];

function ContactCard(h, props, slots, ctx) {
  var type = props.type,
      editable = props.editable;

  function onClick(event) {
    if (editable) {
      functional_emit(ctx, 'click', event);
    }
  }

  function Content() {
    if (type === 'add') {
      return props.addText || contact_card_t('addText');
    }

    return [h("div", [contact_card_t('name') + "\uFF1A" + props.name]), h("div", [contact_card_t('tel') + "\uFF1A" + props.tel])];
  }

  return h(cell, helper_default()([{
    "attrs": {
      "center": true,
      "border": false,
      "isLink": editable,
      "valueClass": contact_card_bem('value'),
      "icon": type === 'edit' ? 'contact' : 'add-square'
    },
    "class": contact_card_bem([type]),
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [Content()]);
}

ContactCard.props = {
  tel: String,
  name: String,
  addText: String,
  editable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'add'
  }
};
/* harmony default export */ var contact_card = (contact_card_createComponent(ContactCard));
// CONCATENATED MODULE: ./es/contact-edit/index.js
 // Utils


 // Components







var contact_edit_createNamespace = Object(create["a" /* createNamespace */])('contact-edit'),
    contact_edit_createComponent = contact_edit_createNamespace[0],
    contact_edit_bem = contact_edit_createNamespace[1],
    contact_edit_t = contact_edit_createNamespace[2];

var defaultContact = {
  tel: '',
  name: ''
};
/* harmony default export */ var contact_edit = (contact_edit_createComponent({
  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    showSetDefault: Boolean,
    setDefaultLabel: String,
    contactInfo: {
      type: Object,
      default: function _default() {
        return _extends({}, defaultContact);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    }
  },
  data: function data() {
    return {
      data: _extends({}, defaultContact, this.contactInfo),
      errorInfo: {
        name: '',
        tel: ''
      }
    };
  },
  watch: {
    contactInfo: function contactInfo(val) {
      this.data = _extends({}, defaultContact, val);
    }
  },
  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = '';
    },
    getErrorMessageByKey: function getErrorMessageByKey(key) {
      var value = this.data[key].trim();

      switch (key) {
        case 'name':
          return value ? '' : contact_edit_t('nameInvalid');

        case 'tel':
          return this.telValidator(value) ? '' : contact_edit_t('telInvalid');
      }
    },
    onSave: function onSave() {
      var _this = this;

      var isValid = ['name', 'tel'].every(function (item) {
        var msg = _this.getErrorMessageByKey(item);

        if (msg) {
          _this.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.data);
      }
    },
    onDelete: function onDelete() {
      var _this2 = this;

      dialog.confirm({
        title: contact_edit_t('confirmDelete')
      }).then(function () {
        _this2.$emit('delete', _this2.data);
      });
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var data = this.data,
        errorInfo = this.errorInfo;

    var onFocus = function onFocus(name) {
      return function () {
        return _this3.onFocus(name);
      };
    };

    return h("div", {
      "class": contact_edit_bem()
    }, [h("div", {
      "class": contact_edit_bem('fields')
    }, [h(es_field, {
      "attrs": {
        "clearable": true,
        "maxlength": "30",
        "label": contact_edit_t('name'),
        "placeholder": contact_edit_t('nameEmpty'),
        "errorMessage": errorInfo.name
      },
      "on": {
        "focus": onFocus('name')
      },
      "model": {
        value: data.name,
        callback: function callback($$v) {
          _this3.$set(data, "name", $$v);
        }
      }
    }), h(es_field, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": contact_edit_t('tel'),
        "placeholder": contact_edit_t('telEmpty'),
        "errorMessage": errorInfo.tel
      },
      "on": {
        "focus": onFocus('tel')
      },
      "model": {
        value: data.tel,
        callback: function callback($$v) {
          _this3.$set(data, "tel", $$v);
        }
      }
    })]), this.showSetDefault && h(cell, {
      "attrs": {
        "title": this.setDefaultLabel,
        "border": false
      },
      "class": contact_edit_bem('switch-cell')
    }, [h(es_switch, {
      "attrs": {
        "size": 24
      },
      "slot": "right-icon",
      "on": {
        "change": function change(event) {
          _this3.$emit('change-default', event);
        }
      },
      "model": {
        value: data.isDefault,
        callback: function callback($$v) {
          _this3.$set(data, "isDefault", $$v);
        }
      }
    })]), h("div", {
      "class": contact_edit_bem('buttons')
    }, [h(es_button, {
      "attrs": {
        "block": true,
        "round": true,
        "type": "danger",
        "text": contact_edit_t('save'),
        "loading": this.isSaving
      },
      "on": {
        "click": this.onSave
      }
    }), this.isEdit && h(es_button, {
      "attrs": {
        "block": true,
        "round": true,
        "text": contact_edit_t('delete'),
        "loading": this.isDeleting
      },
      "on": {
        "click": this.onDelete
      }
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/contact-list/index.js
 // Utils



 // Components






 // Types

var contact_list_createNamespace = Object(create["a" /* createNamespace */])('contact-list'),
    contact_list_createComponent = contact_list_createNamespace[0],
    contact_list_bem = contact_list_createNamespace[1],
    contact_list_t = contact_list_createNamespace[2];

function ContactList(h, props, slots, ctx) {
  var List = props.list && props.list.map(function (item, index) {
    function onClick() {
      functional_emit(ctx, 'input', item.id);
      functional_emit(ctx, 'select', item, index);
    }

    function RightIcon() {
      return h(es_radio, {
        "attrs": {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": RED
        },
        "on": {
          "click": onClick
        }
      });
    }

    function LeftIcon() {
      return h(es_icon, {
        "attrs": {
          "name": "edit"
        },
        "class": contact_list_bem('edit'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();
            functional_emit(ctx, 'edit', item, index);
          }
        }
      });
    }

    function Content() {
      var nodes = [item.name + "\uFF0C" + item.tel];

      if (item.isDefault && props.defaultTagText) {
        nodes.push(h(es_tag, {
          "attrs": {
            "type": "danger",
            "round": true
          },
          "class": contact_list_bem('item-tag')
        }, [props.defaultTagText]));
      }

      return nodes;
    }

    return h(cell, {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "center": true,
        "valueClass": contact_list_bem('item-value')
      },
      "class": contact_list_bem('item'),
      "scopedSlots": {
        icon: LeftIcon,
        default: Content,
        'right-icon': RightIcon
      },
      "on": {
        "click": onClick
      }
    });
  });
  return h("div", helper_default()([{
    "class": contact_list_bem()
  }, inherit(ctx)]), [h(radio_group, {
    "attrs": {
      "value": props.value
    },
    "class": contact_list_bem('group')
  }, [List]), h("div", {
    "class": contact_list_bem('bottom')
  }, [h(es_button, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addText || contact_list_t('addText')
    },
    "class": contact_list_bem('add'),
    "on": {
      "click": function click() {
        functional_emit(ctx, 'add');
      }
    }
  })])]);
}

ContactList.props = {
  value: null,
  list: Array,
  addText: String,
  defaultTagText: String
};
/* harmony default export */ var contact_list = (contact_list_createComponent(ContactList));
// EXTERNAL MODULE: ./es/utils/format/string.js
var string = __webpack_require__(2);

// CONCATENATED MODULE: ./es/count-down/utils.js

var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTimeData(time) {
  var days = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}
function parseFormat(format, timeData) {
  var days = timeData.days;
  var hours = timeData.hours,
      minutes = timeData.minutes,
      seconds = timeData.seconds,
      milliseconds = timeData.milliseconds;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', Object(string["b" /* padZero */])(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', Object(string["b" /* padZero */])(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', Object(string["b" /* padZero */])(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', Object(string["b" /* padZero */])(seconds));
  }

  if (format.indexOf('S') !== -1) {
    var ms = Object(string["b" /* padZero */])(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
// CONCATENATED MODULE: ./es/count-down/index.js




var count_down_createNamespace = Object(create["a" /* createNamespace */])('count-down'),
    count_down_createComponent = count_down_createNamespace[0],
    count_down_bem = count_down_createNamespace[1];

/* harmony default export */ var count_down = (count_down_createComponent({
  props: {
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      remain: 0
    };
  },
  computed: {
    timeData: function timeData() {
      return parseTimeData(this.remain);
    },
    formattedTime: function formattedTime() {
      return parseFormat(this.format, this.timeData);
    }
  },
  watch: {
    time: {
      immediate: true,
      handler: 'reset'
    }
  },
  activated: function activated() {
    if (this.keepAlivePaused) {
      this.counting = true;
      this.keepAlivePaused = false;
      this.tick();
    }
  },
  deactivated: function deactivated() {
    if (this.counting) {
      this.pause();
      this.keepAlivePaused = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.pause();
  },
  methods: {
    // @exposed-api
    start: function start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },
    // @exposed-api
    pause: function pause() {
      this.counting = false;
      Object(raf["a" /* cancelRaf */])(this.rafId);
    },
    // @exposed-api
    reset: function reset() {
      this.pause();
      this.remain = +this.time;

      if (this.autoStart) {
        this.start();
      }
    },
    tick: function tick() {
      // should not start counting in server
      // see: https://github.com/youzan/vant/issues/7807
      if (!utils["b" /* inBrowser */]) {
        return;
      }

      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick: function microTick() {
      var _this = this;

      this.rafId = Object(raf["c" /* raf */])(function () {
        /* istanbul ignore if */
        // in case of call reset immediately after finish
        if (!_this.counting) {
          return;
        }

        _this.setRemain(_this.getRemain());

        if (_this.remain > 0) {
          _this.microTick();
        }
      });
    },
    macroTick: function macroTick() {
      var _this2 = this;

      this.rafId = Object(raf["c" /* raf */])(function () {
        /* istanbul ignore if */
        // in case of call reset immediately after finish
        if (!_this2.counting) {
          return;
        }

        var remain = _this2.getRemain();

        if (!isSameSecond(remain, _this2.remain) || remain === 0) {
          _this2.setRemain(remain);
        }

        if (_this2.remain > 0) {
          _this2.macroTick();
        }
      });
    },
    getRemain: function getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setRemain: function setRemain(remain) {
      this.remain = remain;
      this.$emit('change', this.timeData);

      if (remain === 0) {
        this.pause();
        this.$emit('finish');
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": count_down_bem()
    }, [this.slots('default', this.timeData) || this.formattedTime]);
  }
}));
// CONCATENATED MODULE: ./es/coupon/index.js





var coupon_createNamespace = Object(create["a" /* createNamespace */])('coupon'),
    coupon_createComponent = coupon_createNamespace[0],
    coupon_bem = coupon_createNamespace[1],
    coupon_t = coupon_createNamespace[2];

function formatTimeStamp(timeStamp) {
  // compatible when the timestamp is seconds
  if (timeStamp < Math.pow(10, 12)) {
    return timeStamp * 1000;
  }

  return +timeStamp;
}

function getDate(timeStamp) {
  var date = new Date(formatTimeStamp(timeStamp));
  return date.getFullYear() + "." + Object(string["b" /* padZero */])(date.getMonth() + 1) + "." + Object(string["b" /* padZero */])(date.getDate());
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}

/* harmony default export */ var es_coupon = (coupon_createComponent({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: '¥'
    }
  },
  computed: {
    validPeriod: function validPeriod() {
      var _this$coupon = this.coupon,
          startAt = _this$coupon.startAt,
          endAt = _this$coupon.endAt,
          customValidPeriod = _this$coupon.customValidPeriod;
      return customValidPeriod || getDate(startAt) + " - " + getDate(endAt);
    },
    faceAmount: function faceAmount() {
      var coupon = this.coupon;

      if (coupon.valueDesc) {
        return coupon.valueDesc + "<span>" + (coupon.unitDesc || '') + "</span>";
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return "<span>" + this.currency + "</span> " + denominations;
      }

      if (coupon.discount) {
        return coupon_t('discount', formatDiscount(coupon.discount));
      }

      return '';
    },
    conditionMessage: function conditionMessage() {
      var condition = formatAmount(this.coupon.originCondition);
      return condition === '0' ? coupon_t('unlimited') : coupon_t('condition', condition);
    }
  },
  render: function render() {
    var h = arguments[0];
    var coupon = this.coupon,
        disabled = this.disabled;
    var description = disabled && coupon.reason || coupon.description;
    return h("div", {
      "class": coupon_bem({
        disabled: disabled
      })
    }, [h("div", {
      "class": coupon_bem('content')
    }, [h("div", {
      "class": coupon_bem('head')
    }, [h("h2", {
      "class": coupon_bem('amount'),
      "domProps": {
        "innerHTML": this.faceAmount
      }
    }), h("p", {
      "class": coupon_bem('condition')
    }, [this.coupon.condition || this.conditionMessage])]), h("div", {
      "class": coupon_bem('body')
    }, [h("p", {
      "class": coupon_bem('name')
    }, [coupon.name]), h("p", {
      "class": coupon_bem('valid')
    }, [this.validPeriod]), !this.disabled && h(es_checkbox, {
      "attrs": {
        "size": 18,
        "value": this.chosen,
        "checkedColor": RED
      },
      "class": coupon_bem('corner')
    })])]), description && h("p", {
      "class": coupon_bem('description')
    }, [description])]);
  }
}));
// CONCATENATED MODULE: ./es/coupon-cell/index.js
 // Utils


 // Components

 // Types

var coupon_cell_createNamespace = Object(create["a" /* createNamespace */])('coupon-cell'),
    coupon_cell_createComponent = coupon_cell_createNamespace[0],
    coupon_cell_bem = coupon_cell_createNamespace[1],
    coupon_cell_t = coupon_cell_createNamespace[2];

function coupon_cell_formatValue(props) {
  var coupons = props.coupons,
      chosenCoupon = props.chosenCoupon,
      currency = props.currency;
  var coupon = coupons[+chosenCoupon];

  if (coupon) {
    var value = 0;

    if (Object(utils["c" /* isDef */])(coupon.value)) {
      value = coupon.value;
    } else if (Object(utils["c" /* isDef */])(coupon.denominations)) {
      value = coupon.denominations;
    }

    return "-" + currency + " " + (value / 100).toFixed(2);
  }

  return coupons.length === 0 ? coupon_cell_t('tips') : coupon_cell_t('count', coupons.length);
}

function CouponCell(h, props, slots, ctx) {
  var selected = props.coupons[+props.chosenCoupon];
  var value = coupon_cell_formatValue(props);
  return h(cell, helper_default()([{
    "class": coupon_cell_bem(),
    "attrs": {
      "value": value,
      "title": props.title || coupon_cell_t('title'),
      "border": props.border,
      "isLink": props.editable,
      "valueClass": coupon_cell_bem('value', {
        selected: selected
      })
    }
  }, inherit(ctx, true)]));
}

CouponCell.model = {
  prop: 'chosenCoupon'
};
CouponCell.props = {
  title: String,
  coupons: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  currency: {
    type: String,
    default: '¥'
  },
  border: {
    type: Boolean,
    default: true
  },
  editable: {
    type: Boolean,
    default: true
  },
  chosenCoupon: {
    type: [Number, String],
    default: -1
  }
};
/* harmony default export */ var coupon_cell = (coupon_cell_createComponent(CouponCell));
// CONCATENATED MODULE: ./es/coupon-list/index.js
// Utils
 // Components







var coupon_list_createNamespace = Object(create["a" /* createNamespace */])('coupon-list'),
    coupon_list_createComponent = coupon_list_createNamespace[0],
    coupon_list_bem = coupon_list_createNamespace[1],
    coupon_list_t = coupon_list_createNamespace[2];

var EMPTY_IMAGE = 'https://img01.yzcdn.cn/vant/coupon-empty.png';
/* harmony default export */ var coupon_list = (coupon_list_createComponent({
  model: {
    prop: 'code'
  },
  props: {
    code: String,
    closeButtonText: String,
    inputPlaceholder: String,
    enabledTitle: String,
    disabledTitle: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showCount: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '¥'
    },
    emptyImage: {
      type: String,
      default: EMPTY_IMAGE
    }
  },
  data: function data() {
    return {
      tab: 0,
      winHeight: window.innerHeight,
      currentCode: this.code || ''
    };
  },
  computed: {
    buttonDisabled: function buttonDisabled() {
      return !this.exchangeButtonLoading && (this.exchangeButtonDisabled || !this.currentCode || this.currentCode.length < this.exchangeMinLength);
    },
    listStyle: function listStyle() {
      return {
        height: this.winHeight - (this.showExchangeBar ? 140 : 94) + 'px'
      };
    }
  },
  watch: {
    code: function code(_code) {
      this.currentCode = _code;
    },
    currentCode: function currentCode(code) {
      this.$emit('input', code);
    },
    displayedCouponIndex: 'scrollToShowCoupon'
  },
  mounted: function mounted() {
    this.scrollToShowCoupon(this.displayedCouponIndex);
  },
  methods: {
    onClickExchangeButton: function onClickExchangeButton() {
      this.$emit('exchange', this.currentCode); // auto clear currentCode when not use vModel

      if (!this.code) {
        this.currentCode = '';
      }
    },
    // scroll to show specific coupon
    scrollToShowCoupon: function scrollToShowCoupon(index) {
      var _this = this;

      if (index === -1) {
        return;
      }

      this.$nextTick(function () {
        var _this$$refs = _this.$refs,
            card = _this$$refs.card,
            list = _this$$refs.list;
        /* istanbul ignore next */

        if (list && card && card[index]) {
          list.scrollTop = card[index].$el.offsetTop - 100;
        }
      });
    },
    genEmpty: function genEmpty() {
      var h = this.$createElement;
      return h("div", {
        "class": coupon_list_bem('empty')
      }, [h("img", {
        "attrs": {
          "src": this.emptyImage
        }
      }), h("p", [coupon_list_t('empty')])]);
    },
    genExchangeButton: function genExchangeButton() {
      var h = this.$createElement;
      return h(es_button, {
        "attrs": {
          "plain": true,
          "type": "danger",
          "text": this.exchangeButtonText || coupon_list_t('exchange'),
          "loading": this.exchangeButtonLoading,
          "disabled": this.buttonDisabled
        },
        "class": coupon_list_bem('exchange'),
        "on": {
          "click": this.onClickExchangeButton
        }
      });
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var coupons = this.coupons,
        disabledCoupons = this.disabledCoupons;
    var count = this.showCount ? " (" + coupons.length + ")" : '';
    var title = (this.enabledTitle || coupon_list_t('enable')) + count;
    var disabledCount = this.showCount ? " (" + disabledCoupons.length + ")" : '';
    var disabledTitle = (this.disabledTitle || coupon_list_t('disabled')) + disabledCount;
    var ExchangeBar = this.showExchangeBar && h("div", {
      "class": coupon_list_bem('exchange-bar')
    }, [h(es_field, {
      "attrs": {
        "clearable": true,
        "border": false,
        "placeholder": this.inputPlaceholder || coupon_list_t('placeholder'),
        "maxlength": "20"
      },
      "class": coupon_list_bem('field'),
      "model": {
        value: _this2.currentCode,
        callback: function callback($$v) {
          _this2.currentCode = $$v;
        }
      }
    }), this.genExchangeButton()]);

    var onChange = function onChange(index) {
      return function () {
        return _this2.$emit('change', index);
      };
    };

    var CouponTab = h(tab, {
      "attrs": {
        "title": title
      }
    }, [h("div", {
      "class": coupon_list_bem('list', {
        'with-bottom': this.showCloseButton
      }),
      "style": this.listStyle
    }, [coupons.map(function (coupon, index) {
      return h(es_coupon, {
        "ref": "card",
        "key": coupon.id,
        "attrs": {
          "coupon": coupon,
          "currency": _this2.currency,
          "chosen": index === _this2.chosenCoupon
        },
        "nativeOn": {
          "click": onChange(index)
        }
      });
    }), !coupons.length && this.genEmpty(), this.slots('list-footer')])]);
    var DisabledCouponTab = h(tab, {
      "attrs": {
        "title": disabledTitle
      }
    }, [h("div", {
      "class": coupon_list_bem('list', {
        'with-bottom': this.showCloseButton
      }),
      "style": this.listStyle
    }, [disabledCoupons.map(function (coupon) {
      return h(es_coupon, {
        "attrs": {
          "disabled": true,
          "coupon": coupon,
          "currency": _this2.currency
        },
        "key": coupon.id
      });
    }), !disabledCoupons.length && this.genEmpty(), this.slots('disabled-list-footer')])]);
    return h("div", {
      "class": coupon_list_bem()
    }, [ExchangeBar, h(tabs, {
      "class": coupon_list_bem('tab'),
      "attrs": {
        "border": false
      },
      "model": {
        value: _this2.tab,
        callback: function callback($$v) {
          _this2.tab = $$v;
        }
      }
    }, [CouponTab, DisabledCouponTab]), h("div", {
      "class": coupon_list_bem('bottom')
    }, [h(es_button, {
      "directives": [{
        name: "show",
        value: this.showCloseButton
      }],
      "attrs": {
        "round": true,
        "type": "danger",
        "block": true,
        "text": this.closeButtonText || coupon_list_t('close')
      },
      "class": coupon_list_bem('close'),
      "on": {
        "click": onChange(-1)
      }
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/datetime-picker/shared.js





var sharedProps = _extends({}, pickerProps, {
  value: null,
  filter: Function,
  columnsOrder: Array,
  showToolbar: {
    type: Boolean,
    default: true
  },
  formatter: {
    type: Function,
    default: function _default(type, value) {
      return value;
    }
  }
});
var TimePickerMixin = {
  data: function data() {
    return {
      innerValue: this.formatValue(this.value)
    };
  },
  computed: {
    originColumns: function originColumns() {
      var _this = this;

      return this.ranges.map(function (_ref) {
        var type = _ref.type,
            rangeArr = _ref.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          var value = Object(string["b" /* padZero */])(rangeArr[0] + index);
          return value;
        });

        if (_this.filter) {
          values = _this.filter(type, values);
        }

        return {
          type: type,
          values: values
        };
      });
    },
    columns: function columns() {
      var _this2 = this;

      return this.originColumns.map(function (column) {
        return {
          values: column.values.map(function (value) {
            return _this2.formatter(column.type, value);
          })
        };
      });
    }
  },
  watch: {
    columns: 'updateColumnValue',
    innerValue: function innerValue(val, oldVal) {
      if (!oldVal) {
        this.$emit('input', null);
      } else {
        this.$emit('input', val);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.updateColumnValue();
    this.$nextTick(function () {
      _this3.updateInnerValue();
    });
  },
  methods: {
    getPicker: function getPicker() {
      return this.$refs.picker;
    },
    // https://github.com/youzan/vant/issues/10013
    getProxiedPicker: function getProxiedPicker() {
      var _this4 = this;

      var picker = this.$refs.picker;

      if (picker) {
        var proxy = function proxy(fn) {
          return function () {
            picker[fn].apply(picker, arguments);

            _this4.updateInnerValue();
          };
        };

        return _extends({}, picker, {
          setValues: proxy('setValues'),
          setIndexes: proxy('setIndexes'),
          setColumnIndex: proxy('setColumnIndex'),
          setColumnValue: proxy('setColumnValue')
        });
      }
    },
    onConfirm: function onConfirm() {
      this.$emit('input', this.innerValue);
      this.$emit('confirm', this.innerValue);
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    }
  },
  render: function render() {
    var _this5 = this;

    var h = arguments[0];
    var props = {};
    Object.keys(pickerProps).forEach(function (key) {
      props[key] = _this5[key];
    });
    return h(es_picker, {
      "ref": "picker",
      "attrs": {
        "columns": this.columns,
        "readonly": this.readonly
      },
      "scopedSlots": this.$scopedSlots,
      "on": {
        "change": this.onChange,
        "confirm": this.onConfirm,
        "cancel": this.onCancel
      },
      "props": _extends({}, props)
    });
  }
};
// CONCATENATED MODULE: ./es/datetime-picker/TimePicker.js






var TimePicker_createNamespace = Object(create["a" /* createNamespace */])('time-picker'),
    TimePicker_createComponent = TimePicker_createNamespace[0];

/* harmony default export */ var TimePicker = (TimePicker_createComponent({
  mixins: [TimePickerMixin],
  props: _extends({}, sharedProps, {
    minHour: {
      type: [Number, String],
      default: 0
    },
    maxHour: {
      type: [Number, String],
      default: 23
    },
    minMinute: {
      type: [Number, String],
      default: 0
    },
    maxMinute: {
      type: [Number, String],
      default: 59
    }
  }),
  computed: {
    ranges: function ranges() {
      return [{
        type: 'hour',
        range: [+this.minHour, +this.maxHour]
      }, {
        type: 'minute',
        range: [+this.minMinute, +this.maxMinute]
      }];
    }
  },
  watch: {
    filter: 'updateInnerValue',
    minHour: function minHour() {
      var _this = this;

      this.$nextTick(function () {
        _this.updateInnerValue();
      });
    },
    maxHour: function maxHour(value) {
      var _this$innerValue$spli = this.innerValue.split(':'),
          hour = _this$innerValue$spli[0],
          minute = _this$innerValue$spli[1];

      if (hour >= value) {
        this.innerValue = this.formatValue(value + ":" + minute);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    minMinute: 'updateInnerValue',
    maxMinute: function maxMinute(value) {
      var _this$innerValue$spli2 = this.innerValue.split(':'),
          hour = _this$innerValue$spli2[0],
          minute = _this$innerValue$spli2[1];

      if (minute >= value) {
        this.innerValue = this.formatValue(hour + ":" + value);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    value: function value(val) {
      val = this.formatValue(val);

      if (val !== this.innerValue) {
        this.innerValue = val;
        this.updateColumnValue();
      }
    }
  },
  methods: {
    formatValue: function formatValue(value) {
      if (!value) {
        value = Object(string["b" /* padZero */])(this.minHour) + ":" + Object(string["b" /* padZero */])(this.minMinute);
      }

      var _value$split = value.split(':'),
          hour = _value$split[0],
          minute = _value$split[1];

      hour = Object(string["b" /* padZero */])(range(hour, this.minHour, this.maxHour));
      minute = Object(string["b" /* padZero */])(range(minute, this.minMinute, this.maxMinute));
      return hour + ":" + minute;
    },
    updateInnerValue: function updateInnerValue() {
      var _this$getPicker$getIn = this.getPicker().getIndexes(),
          hourIndex = _this$getPicker$getIn[0],
          minuteIndex = _this$getPicker$getIn[1];

      var _this$originColumns = this.originColumns,
          hourColumn = _this$originColumns[0],
          minuteColumn = _this$originColumns[1];
      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      this.innerValue = this.formatValue(hour + ":" + minute);
      this.updateColumnValue();
    },
    onChange: function onChange(picker) {
      var _this2 = this;

      this.updateInnerValue();
      this.$nextTick(function () {
        _this2.$nextTick(function () {
          // https://github.com/youzan/vant/issues/9775
          _this2.updateInnerValue();

          _this2.$emit('change', picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue() {
      var _this3 = this;

      var formatter = this.formatter;
      var pair = this.innerValue.split(':');
      var values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
      this.$nextTick(function () {
        _this3.getPicker().setValues(values);
      });
    }
  }
}));
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/construct.js


function construct_construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    construct_construct = Reflect.construct;
  } else {
    construct_construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return construct_construct.apply(null, arguments);
}
// CONCATENATED MODULE: ./es/datetime-picker/DatePicker.js







var currentYear = new Date().getFullYear();

var DatePicker_createNamespace = Object(create["a" /* createNamespace */])('date-picker'),
    DatePicker_createComponent = DatePicker_createNamespace[0];

/* harmony default export */ var DatePicker = (DatePicker_createComponent({
  mixins: [TimePickerMixin],
  props: _extends({}, sharedProps, {
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear - 10, 0, 1);
      },
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear + 10, 11, 31);
      },
      validator: isDate
    }
  }),
  watch: {
    filter: 'updateInnerValue',
    minDate: function minDate() {
      var _this = this;

      this.$nextTick(function () {
        _this.updateInnerValue();
      });
    },
    maxDate: function maxDate(value) {
      if (this.innerValue.valueOf() >= value.valueOf()) {
        this.innerValue = value;
      } else {
        this.updateInnerValue();
      }
    },
    value: function value(val) {
      val = this.formatValue(val);

      if (val && val.valueOf() !== this.innerValue.valueOf()) {
        this.innerValue = val;
      }
    }
  },
  computed: {
    ranges: function ranges() {
      var _this$getBoundary = this.getBoundary('max', this.innerValue ? this.innerValue : this.minDate),
          maxYear = _this$getBoundary.maxYear,
          maxDate = _this$getBoundary.maxDate,
          maxMonth = _this$getBoundary.maxMonth,
          maxHour = _this$getBoundary.maxHour,
          maxMinute = _this$getBoundary.maxMinute;

      var _this$getBoundary2 = this.getBoundary('min', this.innerValue ? this.innerValue : this.minDate),
          minYear = _this$getBoundary2.minYear,
          minDate = _this$getBoundary2.minDate,
          minMonth = _this$getBoundary2.minMonth,
          minHour = _this$getBoundary2.minHour,
          minMinute = _this$getBoundary2.minMinute;

      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];

      switch (this.type) {
        case 'date':
          result = result.slice(0, 3);
          break;

        case 'year-month':
          result = result.slice(0, 2);
          break;

        case 'month-day':
          result = result.slice(1, 3);
          break;

        case 'datehour':
          result = result.slice(0, 4);
          break;
      }

      if (this.columnsOrder) {
        var columnsOrder = this.columnsOrder.concat(result.map(function (column) {
          return column.type;
        }));
        result.sort(function (a, b) {
          return columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type);
        });
      }

      return result;
    }
  },
  methods: {
    formatValue: function formatValue(value) {
      var _this2 = this;

      if (!isDate(value)) {
        return null;
      }

      var minDate = new Date(this.minDate);
      var maxDate = new Date(this.maxDate);
      var dateMethods = {
        year: 'getFullYear',
        month: 'getMonth',
        day: 'getDate',
        hour: 'getHours',
        minute: 'getMinutes'
      };

      if (this.originColumns) {
        var dateColumns = this.originColumns.map(function (_ref, index) {
          var type = _ref.type,
              values = _ref.values;
          var range = _this2.ranges[index].range;
          var minDateVal = minDate[dateMethods[type]]();
          var maxDateVal = maxDate[dateMethods[type]]();
          var min = type === 'month' ? +values[0] - 1 : +values[0];
          var max = type === 'month' ? +values[values.length - 1] - 1 : +values[values.length - 1];
          return {
            type: type,
            values: [minDateVal < range[0] ? Math.max(minDateVal, min) : min || minDateVal, maxDateVal > range[1] ? Math.min(maxDateVal, max) : max || maxDateVal]
          };
        });

        if (this.type === 'month-day') {
          var year = (this.innerValue || this.minDate).getFullYear();
          dateColumns.unshift({
            type: 'year',
            values: [year, year]
          });
        }

        var dates = Object.keys(dateMethods).map(function (type) {
          var _dateColumns$filter$;

          return (_dateColumns$filter$ = dateColumns.filter(function (item) {
            return item.type === type;
          })[0]) == null ? void 0 : _dateColumns$filter$.values;
        }).filter(function (item) {
          return item;
        });
        minDate = construct_construct(Date, dates.map(function (val) {
          return getTrueValue(val[0]);
        }));
        maxDate = construct_construct(Date, dates.map(function (val) {
          return getTrueValue(val[1]);
        }));
      }

      value = Math.max(value, minDate.getTime());
      value = Math.min(value, maxDate.getTime());
      return new Date(value);
    },
    getBoundary: function getBoundary(type, value) {
      var _ref2;

      var boundary = this[type + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return _ref2 = {}, _ref2[type + "Year"] = year, _ref2[type + "Month"] = month, _ref2[type + "Date"] = date, _ref2[type + "Hour"] = hour, _ref2[type + "Minute"] = minute, _ref2;
    },
    updateInnerValue: function updateInnerValue() {
      var _this3 = this;

      var type = this.type;
      var indexes = this.getPicker().getIndexes();

      var getValue = function getValue(type) {
        var index = 0;

        _this3.originColumns.forEach(function (column, columnIndex) {
          if (type === column.type) {
            index = columnIndex;
          }
        });

        var values = _this3.originColumns[index].values;
        return getTrueValue(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = (this.innerValue || this.minDate).getFullYear();
        month = getValue('month');
        day = getValue('day');
      } else {
        year = getValue('year');
        month = getValue('month');
        day = type === 'year-month' ? 1 : getValue('day');
      }

      var maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;

      if (type === 'datehour') {
        hour = getValue('hour');
      }

      if (type === 'datetime') {
        hour = getValue('hour');
        minute = getValue('minute');
      }

      var value = new Date(year, month - 1, day, hour, minute);
      this.innerValue = this.formatValue(value);
    },
    onChange: function onChange(picker) {
      var _this4 = this;

      this.updateInnerValue();
      this.$nextTick(function () {
        _this4.$nextTick(function () {
          // https://github.com/youzan/vant/issues/9775
          _this4.updateInnerValue();

          _this4.$emit('change', picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue() {
      var _this5 = this;

      var value = this.innerValue ? this.innerValue : this.minDate;
      var formatter = this.formatter;
      var values = this.originColumns.map(function (column) {
        switch (column.type) {
          case 'year':
            return formatter('year', "" + value.getFullYear());

          case 'month':
            return formatter('month', Object(string["b" /* padZero */])(value.getMonth() + 1));

          case 'day':
            return formatter('day', Object(string["b" /* padZero */])(value.getDate()));

          case 'hour':
            return formatter('hour', Object(string["b" /* padZero */])(value.getHours()));

          case 'minute':
            return formatter('minute', Object(string["b" /* padZero */])(value.getMinutes()));

          default:
            // no default
            return null;
        }
      });
      this.$nextTick(function () {
        _this5.getPicker().setValues(values);
      });
    }
  }
}));
// CONCATENATED MODULE: ./es/datetime-picker/index.js





var datetime_picker_createNamespace = Object(create["a" /* createNamespace */])('datetime-picker'),
    datetime_picker_createComponent = datetime_picker_createNamespace[0],
    datetime_picker_bem = datetime_picker_createNamespace[1];

/* harmony default export */ var datetime_picker = (datetime_picker_createComponent({
  props: _extends({}, TimePicker.props, DatePicker.props),
  methods: {
    // @exposed-api
    getPicker: function getPicker() {
      return this.$refs.root.getProxiedPicker();
    }
  },
  render: function render() {
    var h = arguments[0];
    var Component = this.type === 'time' ? TimePicker : DatePicker;
    return h(Component, {
      "ref": "root",
      "class": datetime_picker_bem(),
      "scopedSlots": this.$scopedSlots,
      "props": _extends({}, this.$props),
      "on": _extends({}, this.$listeners)
    });
  }
}));
// CONCATENATED MODULE: ./es/divider/index.js
 // Utils


 // Types

var divider_createNamespace = Object(create["a" /* createNamespace */])('divider'),
    divider_createComponent = divider_createNamespace[0],
    divider_bem = divider_createNamespace[1];

function Divider(h, props, slots, ctx) {
  var _bem;

  return h("div", helper_default()([{
    "attrs": {
      "role": "separator"
    },
    "style": {
      borderColor: props.borderColor
    },
    "class": divider_bem((_bem = {
      dashed: props.dashed,
      hairline: props.hairline
    }, _bem["content-" + props.contentPosition] = slots.default, _bem))
  }, inherit(ctx, true)]), [slots.default && slots.default()]);
}

Divider.props = {
  dashed: Boolean,
  hairline: {
    type: Boolean,
    default: true
  },
  contentPosition: {
    type: String,
    default: 'center'
  }
};
/* harmony default export */ var divider = (divider_createComponent(Divider));
// CONCATENATED MODULE: ./es/dropdown-item/index.js
// Utils

 // Mixins


 // Components





var dropdown_item_createNamespace = Object(create["a" /* createNamespace */])('dropdown-item'),
    dropdown_item_createComponent = dropdown_item_createNamespace[0],
    dropdown_item_bem = dropdown_item_createNamespace[1];

/* harmony default export */ var dropdown_item = (dropdown_item_createComponent({
  mixins: [PortalMixin({
    ref: 'wrapper'
  }), ChildrenMixin('vanDropdownMenu')],
  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    lazyRender: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false
    };
  },
  computed: {
    displayTitle: function displayTitle() {
      var _this = this;

      if (this.title) {
        return this.title;
      }

      var match = this.options.filter(function (option) {
        return option.value === _this.value;
      });
      return match.length ? match[0].text : '';
    }
  },
  watch: {
    showPopup: function showPopup(val) {
      this.bindScroll(val);
    }
  },
  beforeCreate: function beforeCreate() {
    var _this2 = this;

    var createEmitter = function createEmitter(eventName) {
      return function () {
        return _this2.$emit(eventName);
      };
    };

    this.onOpen = createEmitter('open');
    this.onClose = createEmitter('close');
    this.onOpened = createEmitter('opened');
  },
  methods: {
    // @exposed-api
    toggle: function toggle(show, options) {
      if (show === void 0) {
        show = !this.showPopup;
      }

      if (options === void 0) {
        options = {};
      }

      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;

      if (show) {
        this.parent.updateOffset();
        this.showWrapper = true;
      }
    },
    bindScroll: function bindScroll(bind) {
      var scroller = this.parent.scroller;
      var action = bind ? event_on : off;
      action(scroller, 'scroll', this.onScroll, true);
    },
    onScroll: function onScroll() {
      this.parent.updateOffset();
    },
    onClickWrapper: function onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when use get-contaienr
      if (this.getContainer) {
        event.stopPropagation();
      }
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var _this$parent = this.parent,
        zIndex = _this$parent.zIndex,
        offset = _this$parent.offset,
        overlay = _this$parent.overlay,
        duration = _this$parent.duration,
        direction = _this$parent.direction,
        activeColor = _this$parent.activeColor,
        closeOnClickOverlay = _this$parent.closeOnClickOverlay;
    var Options = this.options.map(function (option) {
      var active = option.value === _this3.value;
      return h(cell, {
        "attrs": {
          "clickable": true,
          "icon": option.icon,
          "title": option.text
        },
        "key": option.value,
        "class": dropdown_item_bem('option', {
          active: active
        }),
        "style": {
          color: active ? activeColor : ''
        },
        "on": {
          "click": function click() {
            _this3.showPopup = false;

            if (option.value !== _this3.value) {
              _this3.$emit('input', option.value);

              _this3.$emit('change', option.value);
            }
          }
        }
      }, [active && h(es_icon, {
        "class": dropdown_item_bem('icon'),
        "attrs": {
          "color": activeColor,
          "name": "success"
        }
      })]);
    });
    var style = {
      zIndex: zIndex
    };

    if (direction === 'down') {
      style.top = offset + "px";
    } else {
      style.bottom = offset + "px";
    }

    return h("div", [h("div", {
      "directives": [{
        name: "show",
        value: this.showWrapper
      }],
      "ref": "wrapper",
      "style": style,
      "class": dropdown_item_bem([direction]),
      "on": {
        "click": this.onClickWrapper
      }
    }, [h(popup, {
      "attrs": {
        "overlay": overlay,
        "position": direction === 'down' ? 'top' : 'bottom',
        "duration": this.transition ? duration : 0,
        "lazyRender": this.lazyRender,
        "overlayStyle": {
          position: 'absolute'
        },
        "closeOnClickOverlay": closeOnClickOverlay
      },
      "class": dropdown_item_bem('content'),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "opened": this.onOpened,
        "closed": function closed() {
          _this3.showWrapper = false;

          _this3.$emit('closed');
        }
      },
      "model": {
        value: _this3.showPopup,
        callback: function callback($$v) {
          _this3.showPopup = $$v;
        }
      }
    }, [Options, this.slots('default')])])]);
  }
}));
// CONCATENATED MODULE: ./es/mixins/click-outside.js
/**
 * Listen to click outside event
 */

var click_outside_ClickOutsideMixin = function ClickOutsideMixin(config) {
  return {
    props: {
      closeOnClickOutside: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      var _this = this;

      var clickOutsideHandler = function clickOutsideHandler(event) {
        if (_this.closeOnClickOutside && !_this.$el.contains(event.target)) {
          _this[config.method]();
        }
      };

      return {
        clickOutsideHandler: clickOutsideHandler
      };
    },
    mounted: function mounted() {
      event_on(document, config.event, this.clickOutsideHandler);
    },
    beforeDestroy: function beforeDestroy() {
      off(document, config.event, this.clickOutsideHandler);
    }
  };
};
// CONCATENATED MODULE: ./es/dropdown-menu/index.js
// Utils

 // Mixins




var dropdown_menu_createNamespace = Object(create["a" /* createNamespace */])('dropdown-menu'),
    dropdown_menu_createComponent = dropdown_menu_createNamespace[0],
    dropdown_menu_bem = dropdown_menu_createNamespace[1];

/* harmony default export */ var dropdown_menu = (dropdown_menu_createComponent({
  mixins: [ParentMixin('vanDropdownMenu'), click_outside_ClickOutsideMixin({
    event: 'click',
    method: 'onClickOutside'
  })],
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: 'down'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      offset: 0
    };
  },
  computed: {
    scroller: function scroller() {
      return getScroller(this.$el);
    },
    opened: function opened() {
      return this.children.some(function (item) {
        return item.showWrapper;
      });
    },
    barStyle: function barStyle() {
      if (this.opened && Object(utils["c" /* isDef */])(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex
        };
      }
    }
  },
  methods: {
    updateOffset: function updateOffset() {
      if (!this.$refs.bar) {
        return;
      }

      var rect = this.$refs.bar.getBoundingClientRect();

      if (this.direction === 'down') {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }
    },
    toggleItem: function toggleItem(active) {
      this.children.forEach(function (item, index) {
        if (index === active) {
          item.toggle();
        } else if (item.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    },
    onClickOutside: function onClickOutside() {
      this.children.forEach(function (item) {
        item.toggle(false);
      });
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var Titles = this.children.map(function (item, index) {
      return h("div", {
        "attrs": {
          "role": "button",
          "tabindex": item.disabled ? -1 : 0
        },
        "class": dropdown_menu_bem('item', {
          disabled: item.disabled
        }),
        "on": {
          "click": function click() {
            if (!item.disabled) {
              _this.toggleItem(index);
            }
          }
        }
      }, [h("span", {
        "class": [dropdown_menu_bem('title', {
          active: item.showPopup,
          down: item.showPopup === (_this.direction === 'down')
        }), item.titleClass],
        "style": {
          color: item.showPopup ? _this.activeColor : ''
        }
      }, [h("div", {
        "class": "van-ellipsis"
      }, [item.slots('title') || item.displayTitle])])]);
    });
    return h("div", {
      "class": dropdown_menu_bem()
    }, [h("div", {
      "ref": "bar",
      "style": this.barStyle,
      "class": dropdown_menu_bem('bar', {
        opened: this.opened
      })
    }, [Titles]), this.slots('default')]);
  }
}));
// CONCATENATED MODULE: ./es/empty/Network.js
var prefix = 'van-empty-network-';
/* harmony default export */ var Network = ({
  render: function render() {
    var h = arguments[0];

    var genStop = function genStop(color, offset, opacity) {
      return h("stop", {
        "attrs": {
          "stop-color": color,
          "offset": offset + "%",
          "stop-opacity": opacity
        }
      });
    };

    return h("svg", {
      "attrs": {
        "viewBox": "0 0 160 160",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("defs", [h("linearGradient", {
      "attrs": {
        "id": prefix + "1",
        "x1": "64.022%",
        "y1": "100%",
        "x2": "64.022%",
        "y2": "0%"
      }
    }, [genStop('#FFF', 0, 0.5), genStop('#F2F3F5', 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "2",
        "x1": "50%",
        "y1": "0%",
        "x2": "50%",
        "y2": "84.459%"
      }
    }, [genStop('#EBEDF0', 0), genStop('#DCDEE0', 100, 0)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "3",
        "x1": "100%",
        "y1": "0%",
        "x2": "100%",
        "y2": "100%"
      }
    }, [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "4",
        "x1": "100%",
        "y1": "100%",
        "x2": "100%",
        "y2": "0%"
      }
    }, [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "5",
        "x1": "0%",
        "y1": "43.982%",
        "x2": "100%",
        "y2": "54.703%"
      }
    }, [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "6",
        "x1": "94.535%",
        "y1": "43.837%",
        "x2": "5.465%",
        "y2": "54.948%"
      }
    }, [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("radialGradient", {
      "attrs": {
        "id": prefix + "7",
        "cx": "50%",
        "cy": "0%",
        "fx": "50%",
        "fy": "0%",
        "r": "100%",
        "gradientTransform": "matrix(0 1 -.54835 0 .5 -.5)"
      }
    }, [genStop('#EBEDF0', 0), genStop('#FFF', 100, 0)])]), h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("g", {
      "attrs": {
        "opacity": ".8"
      }
    }, [h("path", {
      "attrs": {
        "d": "M0 124V46h20v20h14v58H0z",
        "fill": "url(#" + prefix + "1)",
        "transform": "matrix(-1 0 0 1 36 7)"
      }
    }), h("path", {
      "attrs": {
        "d": "M121 8h22.231v14H152v77.37h-31V8z",
        "fill": "url(#" + prefix + "1)",
        "transform": "translate(2 7)"
      }
    })]), h("path", {
      "attrs": {
        "fill": "url(#" + prefix + "7)",
        "d": "M0 139h160v21H0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
        "fill": "url(#" + prefix + "2)",
        "fill-rule": "nonzero",
        "transform": "translate(43 36)"
      }
    }), h("g", {
      "attrs": {
        "opacity": ".6",
        "stroke-linecap": "round",
        "stroke-width": "7"
      }
    }, [h("path", {
      "attrs": {
        "d": "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#" + prefix + "3)",
        "transform": "translate(43 36)"
      }
    }), h("path", {
      "attrs": {
        "d": "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#" + prefix + "3)",
        "transform": "translate(43 36)"
      }
    }), h("path", {
      "attrs": {
        "d": "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#" + prefix + "4)",
        "transform": "rotate(-180 76.483 42.257)"
      }
    }), h("path", {
      "attrs": {
        "d": "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#" + prefix + "4)",
        "transform": "rotate(-180 89.791 42.146)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(31 105)",
        "fill-rule": "nonzero"
      }
    }, [h("rect", {
      "attrs": {
        "fill": "url(#" + prefix + "5)",
        "width": "98",
        "height": "34",
        "rx": "2"
      }
    }), h("rect", {
      "attrs": {
        "fill": "#FFF",
        "x": "9",
        "y": "8",
        "width": "80",
        "height": "18",
        "rx": "1.114"
      }
    }), h("rect", {
      "attrs": {
        "fill": "url(#" + prefix + "6)",
        "x": "15",
        "y": "12",
        "width": "18",
        "height": "6",
        "rx": "1.114"
      }
    })])])]);
  }
});
// CONCATENATED MODULE: ./es/empty/index.js



var empty_createNamespace = Object(create["a" /* createNamespace */])('empty'),
    empty_createComponent = empty_createNamespace[0],
    empty_bem = empty_createNamespace[1];

var PRESETS = ['error', 'search', 'default'];
/* harmony default export */ var empty = (empty_createComponent({
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    genImageContent: function genImageContent() {
      var h = this.$createElement;
      var slots = this.slots('image');

      if (slots) {
        return slots;
      }

      if (this.image === 'network') {
        return h(Network);
      }

      var image = this.image;

      if (PRESETS.indexOf(image) !== -1) {
        image = "https://img01.yzcdn.cn/vant/empty-image-" + image + ".png";
      }

      return h("img", {
        "attrs": {
          "src": image
        }
      });
    },
    genImage: function genImage() {
      var h = this.$createElement;
      var imageStyle = {
        width: Object(unit["a" /* addUnit */])(this.imageSize),
        height: Object(unit["a" /* addUnit */])(this.imageSize)
      };
      return h("div", {
        "class": empty_bem('image'),
        "style": imageStyle
      }, [this.genImageContent()]);
    },
    genDescription: function genDescription() {
      var h = this.$createElement;
      var description = this.slots('description') || this.description;

      if (description) {
        return h("p", {
          "class": empty_bem('description')
        }, [description]);
      }
    },
    genBottom: function genBottom() {
      var h = this.$createElement;
      var slot = this.slots();

      if (slot) {
        return h("div", {
          "class": empty_bem('bottom')
        }, [slot]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": empty_bem()
    }, [this.genImage(), this.genDescription(), this.genBottom()]);
  }
}));
// CONCATENATED MODULE: ./es/form/index.js



var form_createNamespace = Object(create["a" /* createNamespace */])('form'),
    form_createComponent = form_createNamespace[0],
    form_bem = form_createNamespace[1];

/* harmony default export */ var es_form = (form_createComponent({
  props: {
    colon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    validateTrigger: {
      type: String,
      default: 'onBlur'
    },
    showError: {
      type: Boolean,
      default: true
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },
  provide: function provide() {
    return {
      vanForm: this
    };
  },
  data: function data() {
    return {
      fields: []
    };
  },
  methods: {
    getFieldsByNames: function getFieldsByNames(names) {
      if (names) {
        return this.fields.filter(function (field) {
          return names.indexOf(field.name) !== -1;
        });
      }

      return this.fields;
    },
    validateSeq: function validateSeq(names) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var errors = [];

        var fields = _this.getFieldsByNames(names);

        fields.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function () {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    validateFields: function validateFields(names) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var fields = _this2.getFieldsByNames(names);

        Promise.all(fields.map(function (item) {
          return item.validate();
        })).then(function (errors) {
          errors = errors.filter(function (item) {
            return item;
          });

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    // @exposed-api
    validate: function validate(name) {
      if (name && !Array.isArray(name)) {
        return this.validateField(name);
      }

      return this.validateFirst ? this.validateSeq(name) : this.validateFields(name);
    },
    validateField: function validateField(name) {
      var matched = this.fields.filter(function (item) {
        return item.name === name;
      });

      if (matched.length) {
        return new Promise(function (resolve, reject) {
          matched[0].validate().then(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    },
    // @exposed-api
    resetValidation: function resetValidation(name) {
      if (name && !Array.isArray(name)) {
        name = [name];
      }

      var fields = this.getFieldsByNames(name);
      fields.forEach(function (item) {
        item.resetValidation();
      });
    },
    // @exposed-api
    scrollToField: function scrollToField(name, options) {
      this.fields.some(function (item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }

        return false;
      });
    },
    addField: function addField(field) {
      this.fields.push(field);
      sortChildren(this.fields, this);
    },
    removeField: function removeField(field) {
      this.fields = this.fields.filter(function (item) {
        return item !== field;
      });
    },
    getValues: function getValues() {
      return this.fields.reduce(function (form, field) {
        form[field.name] = field.formValue;
        return form;
      }, {});
    },
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      this.submit();
    },
    // @exposed-api
    submit: function submit() {
      var _this3 = this;

      var values = this.getValues();
      this.validate().then(function () {
        _this3.$emit('submit', values);
      }).catch(function (errors) {
        _this3.$emit('failed', {
          values: values,
          errors: errors
        });

        if (_this3.scrollToError) {
          _this3.scrollToField(errors[0].name);
        }
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("form", {
      "class": form_bem(),
      "on": {
        "submit": this.onSubmit
      }
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/goods-action-icon/index.js







var goods_action_icon_createNamespace = Object(create["a" /* createNamespace */])('goods-action-icon'),
    goods_action_icon_createComponent = goods_action_icon_createNamespace[0],
    goods_action_icon_bem = goods_action_icon_createNamespace[1];

/* harmony default export */ var goods_action_icon = (goods_action_icon_createComponent({
  mixins: [ChildrenMixin('vanGoodsAction')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    iconClass: null
  }),
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      route(this.$router, this);
    },
    genIcon: function genIcon() {
      var _this$badge;

      var h = this.$createElement;
      var slot = this.slots('icon');
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;

      if (false) {}

      if (slot) {
        return h("div", {
          "class": goods_action_icon_bem('icon')
        }, [slot, h(es_info, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }

      return h(es_icon, {
        "class": [goods_action_icon_bem('icon'), this.iconClass],
        "attrs": {
          "tag": "div",
          "dot": this.dot,
          "name": this.icon,
          "badge": info,
          "color": this.color
        }
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": goods_action_icon_bem(),
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.slots() || this.text]);
  }
}));
// CONCATENATED MODULE: ./es/grid/index.js




var grid_createNamespace = Object(create["a" /* createNamespace */])('grid'),
    grid_createComponent = grid_createNamespace[0],
    grid_bem = grid_createNamespace[1];

/* harmony default export */ var grid = (grid_createComponent({
  mixins: [ParentMixin('vanGrid')],
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style: function style() {
      var gutter = this.gutter;

      if (gutter) {
        return {
          paddingLeft: Object(unit["a" /* addUnit */])(gutter)
        };
      }
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("div", {
      "style": this.style,
      "class": [grid_bem(), (_ref = {}, _ref[BORDER_TOP] = this.border && !this.gutter, _ref)]
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/grid-item/index.js
 // Utils



 // Mixins

 // Components




var grid_item_createNamespace = Object(create["a" /* createNamespace */])('grid-item'),
    grid_item_createComponent = grid_item_createNamespace[0],
    grid_item_bem = grid_item_createNamespace[1];

/* harmony default export */ var grid_item = (grid_item_createComponent({
  mixins: [ChildrenMixin('vanGrid')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    iconPrefix: String,
    // @deprecated
    info: [Number, String],
    badge: [Number, String]
  }),
  computed: {
    style: function style() {
      var _this$parent = this.parent,
          square = _this$parent.square,
          gutter = _this$parent.gutter,
          columnNum = _this$parent.columnNum;
      var percent = 100 / columnNum + "%";
      var style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = Object(unit["a" /* addUnit */])(gutter);
        style.paddingRight = gutterValue;

        if (this.index >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    },
    contentStyle: function contentStyle() {
      var _this$parent2 = this.parent,
          square = _this$parent2.square,
          gutter = _this$parent2.gutter;

      if (square && gutter) {
        var gutterValue = Object(unit["a" /* addUnit */])(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      route(this.$router, this);
    },
    genIcon: function genIcon() {
      var _this$badge;

      var h = this.$createElement;
      var iconSlot = this.slots('icon');
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;

      if (false) {}

      if (iconSlot) {
        return h("div", {
          "class": grid_item_bem('icon-wrapper')
        }, [iconSlot, h(es_info, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }

      if (this.icon) {
        return h(es_icon, {
          "attrs": {
            "name": this.icon,
            "dot": this.dot,
            "badge": info,
            "size": this.parent.iconSize,
            "classPrefix": this.iconPrefix
          },
          "class": grid_item_bem('icon')
        });
      }
    },
    getText: function getText() {
      var h = this.$createElement;
      var textSlot = this.slots('text');

      if (textSlot) {
        return textSlot;
      }

      if (this.text) {
        return h("span", {
          "class": grid_item_bem('text')
        }, [this.text]);
      }
    },
    genContent: function genContent() {
      var slot = this.slots();

      if (slot) {
        return slot;
      }

      return [this.genIcon(), this.getText()];
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var _this$parent3 = this.parent,
        center = _this$parent3.center,
        border = _this$parent3.border,
        square = _this$parent3.square,
        gutter = _this$parent3.gutter,
        direction = _this$parent3.direction,
        clickable = _this$parent3.clickable;
    return h("div", {
      "class": [grid_item_bem({
        square: square
      })],
      "style": this.style
    }, [h("div", {
      "style": this.contentStyle,
      "attrs": {
        "role": clickable ? 'button' : null,
        "tabindex": clickable ? 0 : null
      },
      "class": [grid_item_bem('content', [direction, {
        center: center,
        square: square,
        clickable: clickable,
        surround: border && gutter
      }]), (_ref = {}, _ref[BORDER] = border, _ref)],
      "on": {
        "click": this.onClick
      }
    }, [this.genContent()])]);
  }
}));
// CONCATENATED MODULE: ./es/image-preview/shared.js


var shared_createNamespace = Object(create["a" /* createNamespace */])('image-preview'),
    shared_createComponent = shared_createNamespace[0],
    shared_bem = shared_createNamespace[1];


// CONCATENATED MODULE: ./es/swipe/index.js
// Utils




 // Mixins





var swipe_createNamespace = Object(create["a" /* createNamespace */])('swipe'),
    swipe_createComponent = swipe_createNamespace[0],
    swipe_bem = swipe_createNamespace[1];

/* harmony default export */ var swipe = (swipe_createComponent({
  mixins: [TouchMixin, ParentMixin('vanSwipe'), BindEventMixin(function (bind, isBind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
    bind(window, 'visibilitychange', this.onVisibilityChange);

    if (isBind) {
      this.initialize();
    } else {
      this.clear();
    }
  })],
  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    touchable: {
      type: Boolean,
      default: true
    },
    initialSwipe: {
      type: [Number, String],
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      rect: null,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swiping: false,
      computedWidth: 0,
      computedHeight: 0
    };
  },
  watch: {
    children: function children() {
      this.initialize();
    },
    initialSwipe: function initialSwipe() {
      this.initialize();
    },
    autoplay: function autoplay(_autoplay) {
      if (_autoplay > 0) {
        this.autoPlay();
      } else {
        this.clear();
      }
    }
  },
  computed: {
    count: function count() {
      return this.children.length;
    },
    maxCount: function maxCount() {
      return Math.ceil(Math.abs(this.minOffset) / this.size);
    },
    delta: function delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size: function size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },
    trackSize: function trackSize() {
      return this.count * this.size;
    },
    activeIndicator: function activeIndicator() {
      return (this.active + this.count) % this.count;
    },
    isCorrectDirection: function isCorrectDirection() {
      var expect = this.vertical ? 'vertical' : 'horizontal';
      return this.direction === expect;
    },
    trackStyle: function trackStyle() {
      var style = {
        transitionDuration: (this.swiping ? 0 : this.duration) + "ms",
        transform: "translate" + (this.vertical ? 'Y' : 'X') + "(" + this.offset + "px)"
      };

      if (this.size) {
        var mainAxis = this.vertical ? 'height' : 'width';
        var crossAxis = this.vertical ? 'width' : 'height';
        style[mainAxis] = this.trackSize + "px";
        style[crossAxis] = this[crossAxis] ? this[crossAxis] + "px" : '';
      }

      return style;
    },
    indicatorStyle: function indicatorStyle() {
      return {
        backgroundColor: this.indicatorColor
      };
    },
    minOffset: function minOffset() {
      return (this.vertical ? this.rect.height : this.rect.width) - this.size * this.count;
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$refs.track);
  },
  methods: {
    // initialize swipe position
    initialize: function initialize(active) {
      if (active === void 0) {
        active = +this.initialSwipe;
      }

      if (!this.$el || isHidden(this.$el)) {
        return;
      }

      clearTimeout(this.timer);
      var rect = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };
      this.rect = rect;
      this.swiping = true;
      this.active = active;
      this.computedWidth = +this.width || rect.width;
      this.computedHeight = +this.height || rect.height;
      this.offset = this.getTargetOffset(active);
      this.children.forEach(function (swipe) {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    // @exposed-api
    resize: function resize() {
      this.initialize(this.activeIndicator);
    },
    onVisibilityChange: function onVisibilityChange() {
      if (document.hidden) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.touchable) return;
      this.clear();
      this.touchStartTime = Date.now();
      this.touchStart(event);
      this.correctPosition();
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.touchable || !this.swiping) return;
      this.touchMove(event);

      if (this.isCorrectDirection) {
        preventDefault(event, this.stopPropagation);
        this.move({
          offset: this.delta
        });
      }
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.touchable || !this.swiping) return;
      var size = this.size,
          delta = this.delta;
      var duration = Date.now() - this.touchStartTime;
      var speed = delta / duration;
      var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2;

      if (shouldSwipe && this.isCorrectDirection) {
        var offset = this.vertical ? this.offsetY : this.offsetX;
        var pace = 0;

        if (this.loop) {
          pace = offset > 0 ? delta > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta > 0 ? 'ceil' : 'floor'](delta / size);
        }

        this.move({
          pace: pace,
          emitChange: true
        });
      } else if (delta) {
        this.move({
          pace: 0
        });
      }

      this.swiping = false;
      this.autoPlay();
    },
    getTargetActive: function getTargetActive(pace) {
      var active = this.active,
          count = this.count,
          maxCount = this.maxCount;

      if (pace) {
        if (this.loop) {
          return range(active + pace, -1, count);
        }

        return range(active + pace, 0, maxCount);
      }

      return active;
    },
    getTargetOffset: function getTargetOffset(targetActive, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var currentPosition = targetActive * this.size;

      if (!this.loop) {
        currentPosition = Math.min(currentPosition, -this.minOffset);
      }

      var targetOffset = offset - currentPosition;

      if (!this.loop) {
        targetOffset = range(targetOffset, this.minOffset, 0);
      }

      return targetOffset;
    },
    move: function move(_ref) {
      var _ref$pace = _ref.pace,
          pace = _ref$pace === void 0 ? 0 : _ref$pace,
          _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset,
          emitChange = _ref.emitChange;
      var loop = this.loop,
          count = this.count,
          active = this.active,
          children = this.children,
          trackSize = this.trackSize,
          minOffset = this.minOffset;

      if (count <= 1) {
        return;
      }

      var targetActive = this.getTargetActive(pace);
      var targetOffset = this.getTargetOffset(targetActive, offset); // auto move first and last swipe in loop mode

      if (loop) {
        if (children[0] && targetOffset !== minOffset) {
          var outRightBound = targetOffset < minOffset;
          children[0].offset = outRightBound ? trackSize : 0;
        }

        if (children[count - 1] && targetOffset !== 0) {
          var outLeftBound = targetOffset > 0;
          children[count - 1].offset = outLeftBound ? -trackSize : 0;
        }
      }

      this.active = targetActive;
      this.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        this.$emit('change', this.activeIndicator);
      }
    },
    // @exposed-api
    prev: function prev() {
      var _this = this;

      this.correctPosition();
      this.resetTouchStatus();
      Object(raf["b" /* doubleRaf */])(function () {
        _this.swiping = false;

        _this.move({
          pace: -1,
          emitChange: true
        });
      });
    },
    // @exposed-api
    next: function next() {
      var _this2 = this;

      this.correctPosition();
      this.resetTouchStatus();
      Object(raf["b" /* doubleRaf */])(function () {
        _this2.swiping = false;

        _this2.move({
          pace: 1,
          emitChange: true
        });
      });
    },
    // @exposed-api
    swipeTo: function swipeTo(index, options) {
      var _this3 = this;

      if (options === void 0) {
        options = {};
      }

      this.correctPosition();
      this.resetTouchStatus();
      Object(raf["b" /* doubleRaf */])(function () {
        var targetIndex;

        if (_this3.loop && index === _this3.count) {
          targetIndex = _this3.active === 0 ? 0 : index;
        } else {
          targetIndex = index % _this3.count;
        }

        if (options.immediate) {
          Object(raf["b" /* doubleRaf */])(function () {
            _this3.swiping = false;
          });
        } else {
          _this3.swiping = false;
        }

        _this3.move({
          pace: targetIndex - _this3.active,
          emitChange: true
        });
      });
    },
    correctPosition: function correctPosition() {
      this.swiping = true;

      if (this.active <= -1) {
        this.move({
          pace: this.count
        });
      }

      if (this.active >= this.count) {
        this.move({
          pace: -this.count
        });
      }
    },
    clear: function clear() {
      clearTimeout(this.timer);
    },
    autoPlay: function autoPlay() {
      var _this4 = this;

      var autoplay = this.autoplay;

      if (autoplay > 0 && this.count > 1) {
        this.clear();
        this.timer = setTimeout(function () {
          _this4.next();

          _this4.autoPlay();
        }, autoplay);
      }
    },
    genIndicator: function genIndicator() {
      var _this5 = this;

      var h = this.$createElement;
      var count = this.count,
          activeIndicator = this.activeIndicator;
      var slot = this.slots('indicator');

      if (slot) {
        return slot;
      }

      if (this.showIndicators && count > 1) {
        return h("div", {
          "class": swipe_bem('indicators', {
            vertical: this.vertical
          })
        }, [Array.apply(void 0, Array(count)).map(function (empty, index) {
          return h("i", {
            "class": swipe_bem('indicator', {
              active: index === activeIndicator
            }),
            "style": index === activeIndicator ? _this5.indicatorStyle : null
          });
        })]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": swipe_bem()
    }, [h("div", {
      "ref": "track",
      "style": this.trackStyle,
      "class": swipe_bem('track', {
        vertical: this.vertical
      })
    }, [this.slots()]), this.genIndicator()]);
  }
}));
// CONCATENATED MODULE: ./es/swipe-item/index.js




var swipe_item_createNamespace = Object(create["a" /* createNamespace */])('swipe-item'),
    swipe_item_createComponent = swipe_item_createNamespace[0],
    swipe_item_bem = swipe_item_createNamespace[1];

/* harmony default export */ var swipe_item = (swipe_item_createComponent({
  mixins: [ChildrenMixin('vanSwipe')],
  data: function data() {
    return {
      offset: 0,
      inited: false,
      mounted: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.mounted = true;
    });
  },
  computed: {
    style: function style() {
      var style = {};
      var _this$parent = this.parent,
          size = _this$parent.size,
          vertical = _this$parent.vertical;

      if (size) {
        style[vertical ? 'height' : 'width'] = size + "px";
      }

      if (this.offset) {
        style.transform = "translate" + (vertical ? 'Y' : 'X') + "(" + this.offset + "px)";
      }

      return style;
    },
    shouldRender: function shouldRender() {
      var index = this.index,
          inited = this.inited,
          parent = this.parent,
          mounted = this.mounted;

      if (!parent.lazyRender || inited) {
        return true;
      } // wait for all item to mount, so we can get the exact count


      if (!mounted) {
        return false;
      }

      var active = parent.activeIndicator;
      var maxActive = parent.count - 1;
      var prevActive = active === 0 && parent.loop ? maxActive : active - 1;
      var nextActive = active === maxActive && parent.loop ? 0 : active + 1;
      var shouldRender = index === active || index === prevActive || index === nextActive;

      if (shouldRender) {
        this.inited = true;
      }

      return shouldRender;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": swipe_item_bem(),
      "style": this.style,
      "on": _extends({}, this.$listeners)
    }, [this.shouldRender && this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/image-preview/ImagePreviewItem.js
// Utils


 // Mixins

 // Component





function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

/* harmony default export */ var ImagePreviewItem = ({
  mixins: [TouchMixin],
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    rootWidth: Number,
    rootHeight: Number
  },
  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    };
  },
  computed: {
    vertical: function vertical() {
      var rootWidth = this.rootWidth,
          rootHeight = this.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return this.imageRatio > rootRatio;
    },
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        var offsetX = this.moveX / scale;
        var offsetY = this.moveY / scale;
        style.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
      }

      return style;
    },
    maxMoveX: function maxMoveX() {
      if (this.imageRatio) {
        var displayWidth = this.vertical ? this.rootHeight / this.imageRatio : this.rootWidth;
        return Math.max(0, (this.scale * displayWidth - this.rootWidth) / 2);
      }

      return 0;
    },
    maxMoveY: function maxMoveY() {
      if (this.imageRatio) {
        var displayHeight = this.vertical ? this.rootHeight : this.rootWidth * this.imageRatio;
        return Math.max(0, (this.scale * displayHeight - this.rootHeight) / 2);
      }

      return 0;
    }
  },
  watch: {
    active: 'resetScale',
    show: function show(val) {
      if (!val) {
        this.resetScale();
      }
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    resetScale: function resetScale() {
      this.setScale(1);
      this.moveX = 0;
      this.moveY = 0;
    },
    setScale: function setScale(scale) {
      scale = range(scale, +this.minZoom, +this.maxZoom);

      if (scale !== this.scale) {
        this.scale = scale;
        this.$emit('scale', {
          scale: this.scale,
          index: this.active
        });
      }
    },
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.setScale(scale);
      this.moveX = 0;
      this.moveY = 0;
    },
    onTouchStart: function onTouchStart(event) {
      var touches = event.touches;
      var _this$offsetX = this.offsetX,
          offsetX = _this$offsetX === void 0 ? 0 : _this$offsetX;
      this.touchStart(event);
      this.touchStartTime = new Date();
      this.fingerNum = touches.length;
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.moving = this.fingerNum === 1 && this.scale !== 1;
      this.zooming = this.fingerNum === 2 && !offsetX;

      if (this.zooming) {
        this.startScale = this.scale;
        this.startDistance = getDistance(event.touches);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var touches = event.touches;
      this.touchMove(event);

      if (this.moving || this.zooming) {
        preventDefault(event, true);
      }

      if (this.moving) {
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.setScale(scale);
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      var stopPropagation = false;
      /* istanbul ignore else */

      if (this.moving || this.zooming) {
        stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (this.zooming) {
            this.moveX = range(this.moveX, -this.maxMoveX, this.maxMoveX);
            this.moveY = range(this.moveY, -this.maxMoveY, this.maxMoveY);
            this.zooming = false;
          }

          this.moving = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }
      } // eliminate tap delay on safari


      preventDefault(event, stopPropagation);
      this.checkTap();
      this.resetTouchStatus();
    },
    checkTap: function checkTap() {
      var _this = this;

      if (this.fingerNum > 1) {
        return;
      }

      var _this$offsetX2 = this.offsetX,
          offsetX = _this$offsetX2 === void 0 ? 0 : _this$offsetX2,
          _this$offsetY = this.offsetY,
          offsetY = _this$offsetY === void 0 ? 0 : _this$offsetY;
      var deltaTime = new Date() - this.touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 5;

      if (offsetX < TAP_OFFSET && offsetY < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (this.doubleTapTimer) {
          clearTimeout(this.doubleTapTimer);
          this.doubleTapTimer = null;
          this.toggleScale();
        } else {
          this.doubleTapTimer = setTimeout(function () {
            _this.$emit('close');

            _this.doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    },
    onLoad: function onLoad(event) {
      var _event$target = event.target,
          naturalWidth = _event$target.naturalWidth,
          naturalHeight = _event$target.naturalHeight;
      this.imageRatio = naturalHeight / naturalWidth;
    }
  },
  render: function render() {
    var h = arguments[0];
    var imageSlots = {
      loading: function loading() {
        return h(es_loading, {
          "attrs": {
            "type": "spinner"
          }
        });
      }
    };
    return h(swipe_item, {
      "class": shared_bem('swipe-item')
    }, [h(es_image, {
      "attrs": {
        "src": this.src,
        "fit": "contain"
      },
      "class": shared_bem('image', {
        vertical: this.vertical
      }),
      "style": this.imageStyle,
      "scopedSlots": imageSlots,
      "on": {
        "load": this.onLoad
      }
    })]);
  }
});
// CONCATENATED MODULE: ./es/image-preview/ImagePreview.js
// Utils
 // Mixins



 // Components




/* harmony default export */ var image_preview_ImagePreview = (shared_createComponent({
  mixins: [TouchMixin, PopupMixin({
    skipToggleEvent: true
  }), BindEventMixin(function (bind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
  })],
  props: {
    className: null,
    closeable: Boolean,
    asyncClose: Boolean,
    overlayStyle: Object,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
    },
    transition: {
      type: String,
      default: 'van-fade'
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 300
    },
    startPosition: {
      type: [Number, String],
      default: 0
    },
    overlayClass: {
      type: String,
      default: shared_bem('overlay')
    },
    closeIcon: {
      type: String,
      default: 'clear'
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  },
  data: function data() {
    return {
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      doubleClickTimer: null
    };
  },
  mounted: function mounted() {
    this.resize();
  },
  watch: {
    startPosition: 'setActive',
    value: function value(val) {
      var _this = this;

      if (val) {
        this.setActive(+this.startPosition);
        this.$nextTick(function () {
          _this.resize();

          _this.$refs.swipe.swipeTo(+_this.startPosition, {
            immediate: true
          });
        });
      } else {
        this.$emit('close', {
          index: this.active,
          url: this.images[this.active]
        });
      }
    }
  },
  methods: {
    resize: function resize() {
      if (this.$el && this.$el.getBoundingClientRect) {
        var rect = this.$el.getBoundingClientRect();
        this.rootWidth = rect.width;
        this.rootHeight = rect.height;
      }
    },
    emitClose: function emitClose() {
      if (!this.asyncClose) {
        this.$emit('input', false);
      }
    },
    emitScale: function emitScale(args) {
      this.$emit('scale', args);
    },
    setActive: function setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
    genIndex: function genIndex() {
      var h = this.$createElement;

      if (this.showIndex) {
        return h("div", {
          "class": shared_bem('index')
        }, [this.slots('index', {
          index: this.active
        }) || this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots('cover');

      if (cover) {
        return h("div", {
          "class": shared_bem('cover')
        }, [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;

      var h = this.$createElement;
      return h(swipe, {
        "ref": "swipe",
        "attrs": {
          "lazyRender": true,
          "loop": this.loop,
          "duration": this.swipeDuration,
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators,
          "indicatorColor": "white"
        },
        "class": shared_bem('swipe'),
        "on": {
          "change": this.setActive
        }
      }, [this.images.map(function (image) {
        return h(ImagePreviewItem, {
          "attrs": {
            "src": image,
            "show": _this2.value,
            "active": _this2.active,
            "maxZoom": _this2.maxZoom,
            "minZoom": _this2.minZoom,
            "rootWidth": _this2.rootWidth,
            "rootHeight": _this2.rootHeight
          },
          "on": {
            "scale": _this2.emitScale,
            "close": _this2.emitClose
          }
        });
      })]);
    },
    genClose: function genClose() {
      var h = this.$createElement;

      if (this.closeable) {
        return h(es_icon, {
          "attrs": {
            "role": "button",
            "name": this.closeIcon
          },
          "class": shared_bem('close-icon', this.closeIconPosition),
          "on": {
            "click": this.emitClose
          }
        });
      }
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    // @exposed-api
    swipeTo: function swipeTo(index, options) {
      if (this.$refs.swipe) {
        this.$refs.swipe.swipeTo(index, options);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterLeave": this.onClosed
      }
    }, [this.shouldRender ? h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [shared_bem(), this.className]
    }, [this.genClose(), this.genImages(), this.genIndex(), this.genCover()]) : null]);
  }
}));
// CONCATENATED MODULE: ./es/image-preview/index.js




var image_preview_instance;
var image_preview_defaultConfig = {
  loop: true,
  value: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onClose: null,
  onChange: null,
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  asyncClose: false,
  transition: 'van-fade',
  getContainer: 'body',
  overlayStyle: null,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right'
};

var image_preview_initInstance = function initInstance() {
  image_preview_instance = new (external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend(image_preview_ImagePreview))({
    el: document.createElement('div')
  });
  document.body.appendChild(image_preview_instance.$el);
  image_preview_instance.$on('change', function (index) {
    if (image_preview_instance.onChange) {
      image_preview_instance.onChange(index);
    }
  });
  image_preview_instance.$on('scale', function (data) {
    if (image_preview_instance.onScale) {
      image_preview_instance.onScale(data);
    }
  });
};

var es_image_preview_ImagePreview = function ImagePreview(images, startPosition) {
  if (startPosition === void 0) {
    startPosition = 0;
  }
  /* istanbul ignore if */


  if (utils["h" /* isServer */]) {
    return;
  }

  if (!image_preview_instance) {
    image_preview_initInstance();
  }

  var options = Array.isArray(images) ? {
    images: images,
    startPosition: startPosition
  } : images;

  _extends(image_preview_instance, image_preview_defaultConfig, options);

  image_preview_instance.$once('input', function (show) {
    image_preview_instance.value = show;
  });
  image_preview_instance.$once('closed', function () {
    image_preview_instance.images = [];
  });

  if (options.onClose) {
    image_preview_instance.$off('close');
    image_preview_instance.$once('close', options.onClose);
  }

  return image_preview_instance;
};

es_image_preview_ImagePreview.Component = image_preview_ImagePreview;

es_image_preview_ImagePreview.install = function () {
  external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.use(image_preview_ImagePreview);
};

/* harmony default export */ var image_preview = (es_image_preview_ImagePreview);
// CONCATENATED MODULE: ./es/index-anchor/index.js





var index_anchor_createNamespace = Object(create["a" /* createNamespace */])('index-anchor'),
    index_anchor_createComponent = index_anchor_createNamespace[0],
    index_anchor_bem = index_anchor_createNamespace[1];

/* harmony default export */ var index_anchor = (index_anchor_createComponent({
  mixins: [ChildrenMixin('vanIndexBar', {
    indexKey: 'childrenIndex'
  })],
  props: {
    index: [Number, String]
  },
  data: function data() {
    return {
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    };
  },
  computed: {
    sticky: function sticky() {
      return this.active && this.parent.sticky;
    },
    anchorStyle: function anchorStyle() {
      if (this.sticky) {
        return {
          zIndex: "" + this.parent.zIndex,
          left: this.left ? this.left + "px" : null,
          width: this.width ? this.width + "px" : null,
          transform: "translate3d(0, " + this.top + "px, 0)",
          color: this.parent.highlightColor
        };
      }
    }
  },
  mounted: function mounted() {
    var rect = this.$el.getBoundingClientRect();
    this.rect.height = rect.height;
  },
  methods: {
    scrollIntoView: function scrollIntoView() {
      this.$el.scrollIntoView();
    },
    getRect: function getRect(scroller, scrollerRect) {
      var el = this.$el;
      var elRect = el.getBoundingClientRect();
      this.rect.height = elRect.height;

      if (scroller === window || scroller === document.body) {
        this.rect.top = elRect.top + getRootScrollTop();
      } else {
        this.rect.top = elRect.top + getScrollTop(scroller) - scrollerRect.top;
      }

      return this.rect;
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var sticky = this.sticky;
    return h("div", {
      "style": {
        height: sticky ? this.rect.height + "px" : null
      }
    }, [h("div", {
      "style": this.anchorStyle,
      "class": [index_anchor_bem({
        sticky: sticky
      }), (_ref = {}, _ref[BORDER_BOTTOM] = sticky, _ref)]
    }, [this.slots('default') || this.index])]);
  }
}));
// CONCATENATED MODULE: ./es/index-bar/index.js
// Utils



 // Mixins





function genAlphabet() {
  var indexList = [];
  var charCodeOfA = 'A'.charCodeAt(0);

  for (var i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

var index_bar_createNamespace = Object(create["a" /* createNamespace */])('index-bar'),
    index_bar_createComponent = index_bar_createNamespace[0],
    index_bar_bem = index_bar_createNamespace[1];

/* harmony default export */ var index_bar = (index_bar_createComponent({
  mixins: [TouchMixin, ParentMixin('vanIndexBar'), BindEventMixin(function (bind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll);
  })],
  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true
    },
    stickyOffsetTop: {
      type: Number,
      default: 0
    },
    indexList: {
      type: Array,
      default: genAlphabet
    }
  },
  data: function data() {
    return {
      activeAnchorIndex: null
    };
  },
  computed: {
    sidebarStyle: function sidebarStyle() {
      if (Object(utils["c" /* isDef */])(this.zIndex)) {
        return {
          zIndex: this.zIndex + 1
        };
      }
    },
    highlightStyle: function highlightStyle() {
      var highlightColor = this.highlightColor;

      if (highlightColor) {
        return {
          color: highlightColor
        };
      }
    }
  },
  watch: {
    indexList: function indexList() {
      this.$nextTick(this.onScroll);
    },
    activeAnchorIndex: function activeAnchorIndex(value) {
      if (value) {
        this.$emit('change', value);
      }
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this = this;

      if (isHidden(this.$el)) {
        return;
      }

      var scrollTop = getScrollTop(this.scroller);
      var scrollerRect = this.getScrollerRect();
      var rects = this.children.map(function (item) {
        return item.getRect(_this.scroller, scrollerRect);
      });
      var active = this.getActiveAnchorIndex(scrollTop, rects);
      this.activeAnchorIndex = this.indexList[active];

      if (this.sticky) {
        this.children.forEach(function (item, index) {
          if (index === active || index === active - 1) {
            var rect = item.$el.getBoundingClientRect();
            item.left = rect.left;
            item.width = rect.width;
          } else {
            item.left = null;
            item.width = null;
          }

          if (index === active) {
            item.active = true;
            item.top = Math.max(_this.stickyOffsetTop, rects[index].top - scrollTop) + scrollerRect.top;
          } else if (index === active - 1) {
            var activeItemTop = rects[active].top - scrollTop;
            item.active = activeItemTop > 0;
            item.top = activeItemTop + scrollerRect.top - rects[index].height;
          } else {
            item.active = false;
          }
        });
      }
    },
    getScrollerRect: function getScrollerRect() {
      if (this.scroller.getBoundingClientRect) {
        return this.scroller.getBoundingClientRect();
      }

      return {
        top: 0,
        left: 0
      };
    },
    getActiveAnchorIndex: function getActiveAnchorIndex(scrollTop, rects) {
      for (var i = this.children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = this.sticky ? prevHeight + this.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    },
    onClick: function onClick(event) {
      this.scrollToElement(event.target);
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction === 'vertical') {
        preventDefault(event);
        var _event$touches$ = event.touches[0],
            clientX = _event$touches$.clientX,
            clientY = _event$touches$.clientY;
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var index = target.dataset.index;
          /* istanbul ignore else */

          if (this.touchActiveIndex !== index) {
            this.touchActiveIndex = index;
            this.scrollToElement(target);
          }
        }
      }
    },
    scrollTo: function scrollTo(index) {
      var match = this.children.filter(function (item) {
        return String(item.index) === index;
      });

      if (match[0]) {
        match[0].scrollIntoView();

        if (this.sticky && this.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - this.stickyOffsetTop);
        }

        this.$emit('select', match[0].index);
      }
    },
    scrollToElement: function scrollToElement(element) {
      var index = element.dataset.index;
      this.scrollTo(index);
    },
    onTouchEnd: function onTouchEnd() {
      this.active = null;
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var Indexes = this.indexList.map(function (index) {
      var active = index === _this2.activeAnchorIndex;
      return h("span", {
        "class": index_bar_bem('index', {
          active: active
        }),
        "style": active ? _this2.highlightStyle : null,
        "attrs": {
          "data-index": index
        }
      }, [index]);
    });
    return h("div", {
      "class": index_bar_bem()
    }, [h("div", {
      "class": index_bar_bem('sidebar'),
      "style": this.sidebarStyle,
      "on": {
        "click": this.onClick,
        "touchstart": this.touchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [Indexes]), this.slots('default')]);
  }
}));
// EXTERNAL MODULE: ./node_modules/vue-lazyload/vue-lazyload.js
var vue_lazyload = __webpack_require__(9);
var vue_lazyload_default = /*#__PURE__*/__webpack_require__.n(vue_lazyload);

// CONCATENATED MODULE: ./es/lazyload/index.js

/* harmony default export */ var lazyload = (vue_lazyload_default.a);
// CONCATENATED MODULE: ./es/list/index.js
// Utils


 // Mixins

 // Components



var list_createNamespace = Object(create["a" /* createNamespace */])('list'),
    list_createComponent = list_createNamespace[0],
    list_bem = list_createNamespace[1],
    list_t = list_createNamespace[2];

/* harmony default export */ var es_list = (list_createComponent({
  mixins: [BindEventMixin(function (bind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }

    bind(this.scroller, 'scroll', this.check);
  })],
  model: {
    prop: 'loading'
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    }
  },
  data: function data() {
    return {
      // use sync innerLoading state to avoid repeated loading in some edge cases
      innerLoading: this.loading
    };
  },
  updated: function updated() {
    this.innerLoading = this.loading;
  },
  mounted: function mounted() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  watch: {
    loading: 'check',
    finished: 'check'
  },
  methods: {
    // @exposed-api
    check: function check() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.innerLoading || _this.finished || _this.error) {
          return;
        }

        var el = _this.$el,
            scroller = _this.scroller,
            offset = _this.offset,
            direction = _this.direction;
        var scrollerRect;

        if (scroller.getBoundingClientRect) {
          scrollerRect = scroller.getBoundingClientRect();
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller.innerHeight
          };
        }

        var scrollerHeight = scrollerRect.bottom - scrollerRect.top;
        /* istanbul ignore next */

        if (!scrollerHeight || isHidden(el)) {
          return false;
        }

        var isReachEdge = false;

        var placeholderRect = _this.$refs.placeholder.getBoundingClientRect();

        if (direction === 'up') {
          isReachEdge = scrollerRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= offset;
        }

        if (isReachEdge) {
          _this.innerLoading = true;

          _this.$emit('input', true);

          _this.$emit('load');
        }
      });
    },
    clickErrorText: function clickErrorText() {
      this.$emit('update:error', false);
      this.check();
    },
    genLoading: function genLoading() {
      var h = this.$createElement;

      if (this.innerLoading && !this.finished) {
        return h("div", {
          "key": "loading",
          "class": list_bem('loading')
        }, [this.slots('loading') || h(es_loading, {
          "attrs": {
            "size": "16"
          }
        }, [this.loadingText || list_t('loading')])]);
      }
    },
    genFinishedText: function genFinishedText() {
      var h = this.$createElement;

      if (this.finished) {
        var text = this.slots('finished') || this.finishedText;

        if (text) {
          return h("div", {
            "class": list_bem('finished-text')
          }, [text]);
        }
      }
    },
    genErrorText: function genErrorText() {
      var h = this.$createElement;

      if (this.error) {
        var text = this.slots('error') || this.errorText;

        if (text) {
          return h("div", {
            "on": {
              "click": this.clickErrorText
            },
            "class": list_bem('error-text')
          }, [text]);
        }
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var Placeholder = h("div", {
      "ref": "placeholder",
      "key": "placeholder",
      "class": list_bem('placeholder')
    });
    return h("div", {
      "class": list_bem(),
      "attrs": {
        "role": "feed",
        "aria-busy": this.innerLoading
      }
    }, [this.direction === 'down' ? this.slots() : Placeholder, this.genLoading(), this.genFinishedText(), this.genErrorText(), this.direction === 'up' ? this.slots() : Placeholder]);
  }
}));
// EXTERNAL MODULE: ./es/locale/index.js + 2 modules
var locale = __webpack_require__(7);

// CONCATENATED MODULE: ./es/nav-bar/index.js
// Utils

 // Components



var nav_bar_createNamespace = Object(create["a" /* createNamespace */])('nav-bar'),
    nav_bar_createComponent = nav_bar_createNamespace[0],
    nav_bar_bem = nav_bar_createNamespace[1];

/* harmony default export */ var nav_bar = (nav_bar_createComponent({
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      height: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.placeholder && this.fixed) {
      var setHeight = function setHeight() {
        _this.height = _this.$refs.navBar.getBoundingClientRect().height;
      };

      setHeight(); // https://github.com/youzan/vant/issues/10131

      setTimeout(setHeight, 100);
    }
  },
  methods: {
    genLeft: function genLeft() {
      var h = this.$createElement;
      var leftSlot = this.slots('left');

      if (leftSlot) {
        return leftSlot;
      }

      return [this.leftArrow && h(es_icon, {
        "class": nav_bar_bem('arrow'),
        "attrs": {
          "name": "arrow-left"
        }
      }), this.leftText && h("span", {
        "class": nav_bar_bem('text')
      }, [this.leftText])];
    },
    genRight: function genRight() {
      var h = this.$createElement;
      var rightSlot = this.slots('right');

      if (rightSlot) {
        return rightSlot;
      }

      if (this.rightText) {
        return h("span", {
          "class": nav_bar_bem('text')
        }, [this.rightText]);
      }
    },
    genNavBar: function genNavBar() {
      var _ref;

      var h = this.$createElement;
      return h("div", {
        "ref": "navBar",
        "style": {
          zIndex: this.zIndex
        },
        "class": [nav_bar_bem({
          fixed: this.fixed,
          'safe-area-inset-top': this.safeAreaInsetTop
        }), (_ref = {}, _ref[BORDER_BOTTOM] = this.border, _ref)]
      }, [h("div", {
        "class": nav_bar_bem('content')
      }, [this.hasLeft() && h("div", {
        "class": nav_bar_bem('left'),
        "on": {
          "click": this.onClickLeft
        }
      }, [this.genLeft()]), h("div", {
        "class": [nav_bar_bem('title'), 'van-ellipsis']
      }, [this.slots('title') || this.title]), this.hasRight() && h("div", {
        "class": nav_bar_bem('right'),
        "on": {
          "click": this.onClickRight
        }
      }, [this.genRight()])])]);
    },
    hasLeft: function hasLeft() {
      return this.leftArrow || this.leftText || this.slots('left');
    },
    hasRight: function hasRight() {
      return this.rightText || this.slots('right');
    },
    onClickLeft: function onClickLeft(event) {
      this.$emit('click-left', event);
    },
    onClickRight: function onClickRight(event) {
      this.$emit('click-right', event);
    }
  },
  render: function render() {
    var h = arguments[0];

    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": nav_bar_bem('placeholder'),
        "style": {
          height: this.height + "px"
        }
      }, [this.genNavBar()]);
    }

    return this.genNavBar();
  }
}));
// CONCATENATED MODULE: ./es/notice-bar/index.js





var notice_bar_createNamespace = Object(create["a" /* createNamespace */])('notice-bar'),
    notice_bar_createComponent = notice_bar_createNamespace[0],
    notice_bar_bem = notice_bar_createNamespace[1];

/* harmony default export */ var notice_bar = (notice_bar_createComponent({
  mixins: [BindEventMixin(function (bind) {
    // fix cache issues with forwards and back history in safari
    // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/
    bind(window, 'pageshow', this.reset);
  })],
  inject: {
    vanPopup: {
      default: null
    }
  },
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    speed: {
      type: [Number, String],
      default: 60
    }
  },
  data: function data() {
    return {
      show: true,
      offset: 0,
      duration: 0,
      wrapWidth: 0,
      contentWidth: 0
    };
  },
  watch: {
    scrollable: 'reset',
    text: {
      handler: 'reset',
      immediate: true
    }
  },
  created: function created() {
    // https://github.com/youzan/vant/issues/8634
    if (this.vanPopup) {
      this.vanPopup.onReopen(this.reset);
    }
  },
  activated: function activated() {
    this.reset();
  },
  methods: {
    onClickIcon: function onClickIcon(event) {
      if (this.mode === 'closeable') {
        this.show = false;
        this.$emit('close', event);
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      var _this = this;

      this.offset = this.wrapWidth;
      this.duration = 0; // wait for Vue to render offset
      // using nextTick won't work in iOS14

      Object(raf["c" /* raf */])(function () {
        // use double raf to ensure animation can start
        Object(raf["b" /* doubleRaf */])(function () {
          _this.offset = -_this.contentWidth;
          _this.duration = (_this.contentWidth + _this.wrapWidth) / _this.speed;

          _this.$emit('replay');
        });
      });
    },
    // not an exposed-api, but may used by some users
    start: function start() {
      this.reset();
    },
    // @exposed-api
    reset: function reset() {
      var _this2 = this;

      var delay = Object(utils["c" /* isDef */])(this.delay) ? this.delay * 1000 : 0;
      this.offset = 0;
      this.duration = 0;
      this.wrapWidth = 0;
      this.contentWidth = 0;
      clearTimeout(this.startTimer);
      this.startTimer = setTimeout(function () {
        var _this2$$refs = _this2.$refs,
            wrap = _this2$$refs.wrap,
            content = _this2$$refs.content;

        if (!wrap || !content || _this2.scrollable === false) {
          return;
        }

        var wrapWidth = wrap.getBoundingClientRect().width;
        var contentWidth = content.getBoundingClientRect().width;

        if (_this2.scrollable || contentWidth > wrapWidth) {
          Object(raf["b" /* doubleRaf */])(function () {
            _this2.offset = -contentWidth;
            _this2.duration = contentWidth / _this2.speed;
            _this2.wrapWidth = wrapWidth;
            _this2.contentWidth = contentWidth;
          });
        }
      }, delay);
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var slots = this.slots,
        mode = this.mode,
        leftIcon = this.leftIcon,
        onClickIcon = this.onClickIcon;
    var barStyle = {
      color: this.color,
      background: this.background
    };
    var contentStyle = {
      transform: this.offset ? "translateX(" + this.offset + "px)" : '',
      transitionDuration: this.duration + 's'
    };

    function LeftIcon() {
      var slot = slots('left-icon');

      if (slot) {
        return slot;
      }

      if (leftIcon) {
        return h(es_icon, {
          "class": notice_bar_bem('left-icon'),
          "attrs": {
            "name": leftIcon
          }
        });
      }
    }

    function RightIcon() {
      var slot = slots('right-icon');

      if (slot) {
        return slot;
      }

      var iconName;

      if (mode === 'closeable') {
        iconName = 'cross';
      } else if (mode === 'link') {
        iconName = 'arrow';
      }

      if (iconName) {
        return h(es_icon, {
          "class": notice_bar_bem('right-icon'),
          "attrs": {
            "name": iconName
          },
          "on": {
            "click": onClickIcon
          }
        });
      }
    }

    return h("div", {
      "attrs": {
        "role": "alert"
      },
      "directives": [{
        name: "show",
        value: this.show
      }],
      "class": notice_bar_bem({
        wrapable: this.wrapable
      }),
      "style": barStyle,
      "on": {
        "click": function click(event) {
          _this3.$emit('click', event);
        }
      }
    }, [LeftIcon(), h("div", {
      "ref": "wrap",
      "class": notice_bar_bem('wrap'),
      "attrs": {
        "role": "marquee"
      }
    }, [h("div", {
      "ref": "content",
      "class": [notice_bar_bem('content'), {
        'van-ellipsis': this.scrollable === false && !this.wrapable
      }],
      "style": contentStyle,
      "on": {
        "transitionend": this.onTransitionEnd
      }
    }, [this.slots() || this.text])]), RightIcon()]);
  }
}));
// CONCATENATED MODULE: ./es/notify/Notify.js

 // Utils


 // Mixins

 // Components

 // Types

var Notify_createNamespace = Object(create["a" /* createNamespace */])('notify'),
    Notify_createComponent = Notify_createNamespace[0],
    Notify_bem = Notify_createNamespace[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background
  };
  return h(popup, helper_default()([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "duration": 0.2,
      "lockScroll": false
    },
    "style": style,
    "class": [Notify_bem([props.type]), props.className]
  }, inherit(ctx, true)]), [(slots.default == null ? void 0 : slots.default()) || props.message]);
}

Notify.props = _extends({}, popupMixinProps, {
  color: String,
  message: [Number, String],
  duration: [Number, String],
  className: null,
  background: String,
  getContainer: [String, Function],
  type: {
    type: String,
    default: 'danger'
  }
});
/* harmony default export */ var notify_Notify = (Notify_createComponent(Notify));
// CONCATENATED MODULE: ./es/notify/index.js





var timer;
var notify_instance;

function notify_parseOptions(message) {
  return Object(utils["f" /* isObject */])(message) ? message : {
    message: message
  };
}

function es_notify_Notify(options) {
  /* istanbul ignore if */
  if (utils["h" /* isServer */]) {
    return;
  }

  if (!notify_instance) {
    notify_instance = mount(notify_Notify, {
      on: {
        click: function click(event) {
          if (notify_instance.onClick) {
            notify_instance.onClick(event);
          }
        },
        close: function close() {
          if (notify_instance.onClose) {
            notify_instance.onClose();
          }
        },
        opened: function opened() {
          if (notify_instance.onOpened) {
            notify_instance.onOpened();
          }
        }
      }
    });
  }

  options = _extends({}, es_notify_Notify.currentOptions, notify_parseOptions(options));

  _extends(notify_instance, options);

  clearTimeout(timer);

  if (options.duration && options.duration > 0) {
    timer = setTimeout(es_notify_Notify.clear, options.duration);
  }

  return notify_instance;
}

function notify_defaultOptions() {
  return {
    type: 'danger',
    value: true,
    message: '',
    color: undefined,
    background: undefined,
    duration: 3000,
    className: '',
    onClose: null,
    onClick: null,
    onOpened: null
  };
}

es_notify_Notify.clear = function () {
  if (notify_instance) {
    notify_instance.value = false;
  }
};

es_notify_Notify.currentOptions = notify_defaultOptions();

es_notify_Notify.setDefaultOptions = function (options) {
  _extends(es_notify_Notify.currentOptions, options);
};

es_notify_Notify.resetDefaultOptions = function () {
  es_notify_Notify.currentOptions = notify_defaultOptions();
};

es_notify_Notify.install = function () {
  external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.use(notify_Notify);
};

es_notify_Notify.Component = notify_Notify;
external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.prototype.$notify = es_notify_Notify;
/* harmony default export */ var notify = (es_notify_Notify);
// CONCATENATED MODULE: ./es/number-keyboard/DeleteIcon.js
/* harmony default export */ var number_keyboard_DeleteIcon = ({
  render: function render() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 32 22",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("path", {
      "attrs": {
        "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
        "fill": "currentColor"
      }
    })]);
  }
});
// CONCATENATED MODULE: ./es/number-keyboard/CollapseIcon.js
/* harmony default export */ var CollapseIcon = ({
  render: function render() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 30 24",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("path", {
      "attrs": {
        "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
        "fill": "currentColor"
      }
    })]);
  }
});
// CONCATENATED MODULE: ./es/number-keyboard/Key.js






var Key_createNamespace = Object(create["a" /* createNamespace */])('key'),
    Key_createComponent = Key_createNamespace[0],
    Key_bem = Key_createNamespace[1];

/* harmony default export */ var Key = (Key_createComponent({
  mixins: [TouchMixin],
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      // compatible with Vue 2.6 event bubble bug
      event.stopPropagation();
      this.touchStart(event);
      this.active = true;
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction) {
        this.active = false;
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      if (this.active) {
        // eliminate tap delay on safari
        // see: https://github.com/youzan/vant/issues/6836
        if (!this.slots('default')) {
          event.preventDefault();
        }

        this.active = false;
        this.$emit('press', this.text, this.type);
      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var isExtra = this.type === 'extra';
      var isDelete = this.type === 'delete';
      var text = this.slots('default') || this.text;

      if (this.loading) {
        return h(es_loading, {
          "class": Key_bem('loading-icon')
        });
      }

      if (isDelete) {
        return text || h(number_keyboard_DeleteIcon, {
          "class": Key_bem('delete-icon')
        });
      }

      if (isExtra) {
        return text || h(CollapseIcon, {
          "class": Key_bem('collapse-icon')
        });
      }

      return text;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": Key_bem('wrapper', {
        wider: this.wider
      })
    }, [h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": Key_bem([this.color, {
        large: this.large,
        active: this.active,
        delete: this.type === 'delete'
      }])
    }, [this.genContent()])]);
  }
}));
// CONCATENATED MODULE: ./es/number-keyboard/index.js






var number_keyboard_createNamespace = Object(create["a" /* createNamespace */])('number-keyboard'),
    number_keyboard_createComponent = number_keyboard_createNamespace[0],
    number_keyboard_bem = number_keyboard_createNamespace[1];

/* harmony default export */ var number_keyboard = (number_keyboard_createComponent({
  mixins: [PortalMixin(), BindEventMixin(function (bind) {
    if (this.hideOnClickOutside) {
      bind(document.body, 'touchstart', this.onBlur);
    }
  })],
  model: {
    event: 'update:value'
  },
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    value: {
      type: String,
      default: ''
    },
    extraKey: {
      type: [String, Array],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: function show(val) {
      if (!this.transition) {
        this.$emit(val ? 'show' : 'hide');
      }
    }
  },
  computed: {
    keys: function keys() {
      if (this.theme === 'custom') {
        return this.genCustomKeys();
      }

      return this.genDefaultKeys();
    }
  },
  methods: {
    genBasicKeys: function genBasicKeys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i
        });
      }

      if (this.randomKeyOrder) {
        keys.sort(function () {
          return Math.random() > 0.5 ? 1 : -1;
        });
      }

      return keys;
    },
    genDefaultKeys: function genDefaultKeys() {
      return [].concat(this.genBasicKeys(), [{
        text: this.extraKey,
        type: 'extra'
      }, {
        text: 0
      }, {
        text: this.showDeleteKey ? this.deleteButtonText : '',
        type: this.showDeleteKey ? 'delete' : ''
      }]);
    },
    genCustomKeys: function genCustomKeys() {
      var keys = this.genBasicKeys();
      var extraKey = this.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

      if (extraKeys.length === 1) {
        keys.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: 'extra'
        });
      } else if (extraKeys.length === 2) {
        keys.push({
          text: extraKeys[0],
          type: 'extra'
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: 'extra'
        });
      }

      return keys;
    },
    onBlur: function onBlur() {
      this.show && this.$emit('blur');
    },
    onClose: function onClose() {
      this.$emit('close');
      this.onBlur();
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onPress: function onPress(text, type) {
      if (text === '') {
        if (type === 'extra') {
          this.onBlur();
        }

        return;
      }

      var value = this.value;

      if (type === 'delete') {
        this.$emit('delete');
        this.$emit('update:value', value.slice(0, value.length - 1));
      } else if (type === 'close') {
        this.onClose();
      } else if (value.length < this.maxlength) {
        this.$emit('input', text);
        this.$emit('update:value', value + text);
      }
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var title = this.title,
          theme = this.theme,
          closeButtonText = this.closeButtonText;
      var titleLeft = this.slots('title-left');
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || titleLeft;

      if (!showTitle) {
        return;
      }

      return h("div", {
        "class": number_keyboard_bem('header')
      }, [titleLeft && h("span", {
        "class": number_keyboard_bem('title-left')
      }, [titleLeft]), title && h("h2", {
        "class": number_keyboard_bem('title')
      }, [title]), showClose && h("button", {
        "attrs": {
          "type": "button"
        },
        "class": number_keyboard_bem('close'),
        "on": {
          "click": this.onClose
        }
      }, [closeButtonText])]);
    },
    genKeys: function genKeys() {
      var _this = this;

      var h = this.$createElement;
      return this.keys.map(function (key) {
        return h(Key, {
          "key": key.text,
          "attrs": {
            "text": key.text,
            "type": key.type,
            "wider": key.wider,
            "color": key.color
          },
          "on": {
            "press": _this.onPress
          }
        }, [key.type === 'delete' && _this.slots('delete'), key.type === 'extra' && _this.slots('extra-key')]);
      });
    },
    genSidebar: function genSidebar() {
      var h = this.$createElement;

      if (this.theme === 'custom') {
        return h("div", {
          "class": number_keyboard_bem('sidebar')
        }, [this.showDeleteKey && h(Key, {
          "attrs": {
            "large": true,
            "text": this.deleteButtonText,
            "type": "delete"
          },
          "on": {
            "press": this.onPress
          }
        }, [this.slots('delete')]), h(Key, {
          "attrs": {
            "large": true,
            "text": this.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": this.closeButtonLoading
          },
          "on": {
            "press": this.onPress
          }
        })]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var Title = this.genTitle();
    return h("transition", {
      "attrs": {
        "name": this.transition ? 'van-slide-up' : ''
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.show
      }],
      "style": {
        zIndex: this.zIndex
      },
      "class": number_keyboard_bem({
        unfit: !this.safeAreaInsetBottom,
        'with-title': Title
      }),
      "on": {
        "touchstart": event_stopPropagation,
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [Title, h("div", {
      "class": number_keyboard_bem('body')
    }, [h("div", {
      "class": number_keyboard_bem('keys')
    }, [this.genKeys()]), this.genSidebar()])])]);
  }
}));
// CONCATENATED MODULE: ./es/pagination/index.js



var pagination_createNamespace = Object(create["a" /* createNamespace */])('pagination'),
    pagination_createComponent = pagination_createNamespace[0],
    pagination_bem = pagination_createNamespace[1],
    pagination_t = pagination_createNamespace[2];

function makePage(number, text, active) {
  return {
    number: number,
    text: text,
    active: active
  };
}

/* harmony default export */ var pagination = (pagination_createComponent({
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi'
    },
    value: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: [Number, String],
      default: 0
    },
    totalItems: {
      type: [Number, String],
      default: 0
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    },
    showPageSize: {
      type: [Number, String],
      default: 5
    }
  },
  computed: {
    count: function count() {
      var count = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count);
    },
    pages: function pages() {
      var pages = [];
      var pageCount = this.count;
      var showPageSize = +this.showPageSize;

      if (this.mode !== 'multi') {
        return pages;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(this.value - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === this.value);
        pages.push(page);
      } // Add links to move between page sets


      if (isMaxSized && showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          var previousPageSet = makePage(startPage - 1, '...', false);
          pages.unshift(previousPageSet);
        }

        if (endPage < pageCount) {
          var nextPageSet = makePage(endPage + 1, '...', false);
          pages.push(nextPageSet);
        }
      }

      return pages;
    }
  },
  watch: {
    value: {
      handler: function handler(page) {
        this.select(page || this.value);
      },
      immediate: true
    }
  },
  methods: {
    select: function select(page, emitChange) {
      page = Math.min(this.count, Math.max(1, page));

      if (this.value !== page) {
        this.$emit('input', page);

        if (emitChange) {
          this.$emit('change', page);
        }
      }
    }
  },
  render: function render() {
    var _this = this,
        _this$slots,
        _this$slots3;

    var h = arguments[0];
    var value = this.value;
    var simple = this.mode !== 'multi';

    var onSelect = function onSelect(value) {
      return function () {
        _this.select(value, true);
      };
    };

    return h("ul", {
      "class": pagination_bem({
        simple: simple
      })
    }, [h("li", {
      "class": [pagination_bem('item', {
        disabled: value === 1
      }), pagination_bem('prev'), BORDER],
      "on": {
        "click": onSelect(value - 1)
      }
    }, [((_this$slots = this.slots('prev-text')) != null ? _this$slots : this.prevText) || pagination_t('prev')]), this.pages.map(function (page) {
      var _this$slots2;

      return h("li", {
        "class": [pagination_bem('item', {
          active: page.active
        }), pagination_bem('page'), BORDER],
        "on": {
          "click": onSelect(page.number)
        }
      }, [(_this$slots2 = _this.slots('page', page)) != null ? _this$slots2 : page.text]);
    }), simple && h("li", {
      "class": pagination_bem('page-desc')
    }, [this.slots('pageDesc') || value + "/" + this.count]), h("li", {
      "class": [pagination_bem('item', {
        disabled: value === this.count
      }), pagination_bem('next'), BORDER],
      "on": {
        "click": onSelect(value + 1)
      }
    }, [((_this$slots3 = this.slots('next-text')) != null ? _this$slots3 : this.nextText) || pagination_t('next')])]);
  }
}));
// CONCATENATED MODULE: ./es/panel/index.js
 // Utils



 // Components


 // Types

var panel_createNamespace = Object(create["a" /* createNamespace */])('panel'),
    panel_createComponent = panel_createNamespace[0],
    panel_bem = panel_createNamespace[1];

function Panel(h, props, slots, ctx) {
  var Content = function Content() {
    return [slots.header ? slots.header() : h(cell, {
      "attrs": {
        "icon": props.icon,
        "label": props.desc,
        "title": props.title,
        "value": props.status,
        "valueClass": panel_bem('header-value')
      },
      "class": panel_bem('header')
    }), h("div", {
      "class": panel_bem('content')
    }, [slots.default && slots.default()]), slots.footer && h("div", {
      "class": [panel_bem('footer'), BORDER_TOP]
    }, [slots.footer()])];
  };

  return h(cell_group, helper_default()([{
    "class": panel_bem(),
    "scopedSlots": {
      default: Content
    }
  }, inherit(ctx, true)]));
}

Panel.props = {
  icon: String,
  desc: String,
  title: String,
  status: String
};
/* harmony default export */ var panel = (panel_createComponent(Panel));
// CONCATENATED MODULE: ./es/password-input/index.js
 // Utils



 // Types

var password_input_createNamespace = Object(create["a" /* createNamespace */])('password-input'),
    password_input_createComponent = password_input_createNamespace[0],
    password_input_bem = password_input_createNamespace[1];

function PasswordInput(h, props, slots, ctx) {
  var _ref2;

  var mask = props.mask,
      value = props.value,
      length = props.length,
      gutter = props.gutter,
      focused = props.focused,
      errorInfo = props.errorInfo;
  var info = errorInfo || props.info;
  var Points = [];

  for (var i = 0; i < length; i++) {
    var _ref;

    var _char = value[i];
    var showBorder = i !== 0 && !gutter;
    var showCursor = focused && i === value.length;
    var style = void 0;

    if (i !== 0 && gutter) {
      style = {
        marginLeft: Object(unit["a" /* addUnit */])(gutter)
      };
    }

    Points.push(h("li", {
      "class": [(_ref = {}, _ref[BORDER_LEFT] = showBorder, _ref), password_input_bem('item', {
        focus: showCursor
      })],
      "style": style
    }, [mask ? h("i", {
      "style": {
        visibility: _char ? 'visible' : 'hidden'
      }
    }) : _char, showCursor && h("div", {
      "class": password_input_bem('cursor')
    })]));
  }

  return h("div", {
    "class": password_input_bem()
  }, [h("ul", helper_default()([{
    "class": [password_input_bem('security'), (_ref2 = {}, _ref2[BORDER_SURROUND] = !gutter, _ref2)],
    "on": {
      "touchstart": function touchstart(event) {
        event.stopPropagation();
        functional_emit(ctx, 'focus', event);
      }
    }
  }, inherit(ctx, true)]), [Points]), info && h("div", {
    "class": password_input_bem(errorInfo ? 'error-info' : 'info')
  }, [info])]);
}

PasswordInput.props = {
  info: String,
  gutter: [Number, String],
  focused: Boolean,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: ''
  },
  length: {
    type: [Number, String],
    default: 6
  }
};
/* harmony default export */ var password_input = (password_input_createComponent(PasswordInput));
// CONCATENATED MODULE: ./node_modules/@vant/popperjs/dist/esm/index.js


function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
} // Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
} // means it doesn't take into account transforms.


function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}
/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/


function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var esm_top = 'top';
var esm_bottom = 'bottom';
var right = 'right';
var esm_left = 'left';
var auto = 'auto';
var basePlacements = [esm_top, esm_bottom, right, esm_left];
var start = 'start';
var end = 'end';
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function esm_format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];

function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(esm_format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? _extends({}, existing, current, {
      options: _extends({}, existing.options, current.options),
      data: _extends({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var esm_round = Math.round;

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case esm_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case esm_bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case esm_left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: _extends({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = _extends({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = _extends({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var esm_passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, esm_passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, esm_passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, esm_passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, esm_passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: esm_round(esm_round(x * dpr) / dpr) || 0,
    y: esm_round(esm_round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = esm_left;
  var sideY = esm_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === esm_top) {
      sideY = esm_bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === esm_left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = _extends({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return _extends({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return _extends({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = _extends({}, state.styles.popper, mapToStyles(_extends({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = _extends({}, state.styles.arrow, mapToStyles(_extends({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = _extends({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
}; // and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    _extends(element.style, style);

    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };

  _extends(state.elements.popper.style, initialStyles.popper);

  state.styles = initialStyles;

  if (state.elements.arrow) {
    _extends(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      _extends(element.style, style);

      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};
var esm_defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var esm_createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: esm_defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [esm_left, esm_top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(_extends({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [esm_left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function esm_offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: esm_offset
};

// CONCATENATED MODULE: ./es/popover/index.js



 // Mixins

 // Components




var popover_createNamespace = Object(create["a" /* createNamespace */])('popover'),
    popover_createComponent = popover_createNamespace[0],
    popover_bem = popover_createNamespace[1];

/* harmony default export */ var popover = (popover_createComponent({
  mixins: [click_outside_ClickOutsideMixin({
    event: 'touchstart',
    method: 'onClickOutside'
  })],
  props: {
    value: Boolean,
    trigger: String,
    overlay: Boolean,
    offset: {
      type: Array,
      default: function _default() {
        return [0, 8];
      }
    },
    theme: {
      type: String,
      default: 'light'
    },
    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    getContainer: {
      type: [String, Function],
      default: 'body'
    },
    closeOnClickAction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: 'updateLocation',
    placement: 'updateLocation'
  },
  mounted: function mounted() {
    this.updateLocation();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },
  methods: {
    createPopper: function createPopper() {
      return esm_createPopper(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, _extends({}, offset$1, {
          options: {
            offset: this.offset
          }
        })]
      });
    },
    updateLocation: function updateLocation() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.value) {
          return;
        }

        if (!_this.popper) {
          _this.popper = _this.createPopper();
        } else {
          _this.popper.setOptions({
            placement: _this.placement
          });
        }
      });
    },
    renderAction: function renderAction(action, index) {
      var _this2 = this;

      var h = this.$createElement;
      var icon = action.icon,
          text = action.text,
          disabled = action.disabled,
          className = action.className;
      return h("div", {
        "attrs": {
          "role": "menuitem"
        },
        "class": [popover_bem('action', {
          disabled: disabled,
          'with-icon': icon
        }), className],
        "on": {
          "click": function click() {
            return _this2.onClickAction(action, index);
          }
        }
      }, [icon && h(es_icon, {
        "attrs": {
          "name": icon
        },
        "class": popover_bem('action-icon')
      }), h("div", {
        "class": [popover_bem('action-text'), BORDER_BOTTOM]
      }, [text])]);
    },
    onToggle: function onToggle(value) {
      this.$emit('input', value);
    },
    onClickWrapper: function onClickWrapper() {
      if (this.trigger === 'click') {
        this.onToggle(!this.value);
      }
    },
    onTouchstart: function onTouchstart(event) {
      event.stopPropagation();
      this.$emit('touchstart', event);
    },
    onClickAction: function onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      this.$emit('select', action, index);

      if (this.closeOnClickAction) {
        this.$emit('input', false);
      }
    },
    onClickOutside: function onClickOutside() {
      this.$emit('input', false);
    },
    onOpen: function onOpen() {
      this.$emit('open');
    },

    /* istanbul ignore next */
    onOpened: function onOpened() {
      this.$emit('opened');
    },
    onClose: function onClose() {
      this.$emit('close');
    },

    /* istanbul ignore next */
    onClosed: function onClosed() {
      this.$emit('closed');
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("span", {
      "ref": "wrapper",
      "class": popover_bem('wrapper'),
      "on": {
        "click": this.onClickWrapper
      }
    }, [h(popup, {
      "ref": "popover",
      "attrs": {
        "value": this.value,
        "overlay": this.overlay,
        "position": null,
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "getContainer": this.getContainer
      },
      "class": popover_bem([this.theme]),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "input": this.onToggle,
        "opened": this.onOpened,
        "closed": this.onClosed
      },
      "nativeOn": {
        "touchstart": this.onTouchstart
      }
    }, [h("div", {
      "class": popover_bem('arrow')
    }), h("div", {
      "class": popover_bem('content'),
      "attrs": {
        "role": "menu"
      }
    }, [this.slots('default') || this.actions.map(this.renderAction)])]), this.slots('reference')]);
  }
}));
// CONCATENATED MODULE: ./es/progress/index.js



var progress_createNamespace = Object(create["a" /* createNamespace */])('progress'),
    progress_createComponent = progress_createNamespace[0],
    progress_bem = progress_createNamespace[1];

/* harmony default export */ var es_progress = (progress_createComponent({
  mixins: [BindEventMixin(function (bind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
  })],
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },
  mounted: function mounted() {
    this.resize();
  },
  watch: {
    showPivot: 'resize',
    pivotText: 'resize'
  },
  methods: {
    // @exposed-api
    resize: function resize() {
      var _this = this;

      this.$nextTick(function () {
        _this.progressWidth = _this.$el.offsetWidth;
        _this.pivotWidth = _this.$refs.pivot ? _this.$refs.pivot.offsetWidth : 0;
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    var pivotText = this.pivotText,
        percentage = this.percentage;
    var text = pivotText != null ? pivotText : percentage + '%';
    var showPivot = this.showPivot && text;
    var background = this.inactive ? '#cacaca' : this.color;
    var pivotStyle = {
      color: this.textColor,
      left: (this.progressWidth - this.pivotWidth) * percentage / 100 + "px",
      background: this.pivotColor || background
    };
    var portionStyle = {
      background: background,
      width: this.progressWidth * percentage / 100 + 'px'
    };
    var wrapperStyle = {
      background: this.trackColor,
      height: Object(unit["a" /* addUnit */])(this.strokeWidth)
    };
    return h("div", {
      "class": progress_bem(),
      "style": wrapperStyle
    }, [h("span", {
      "class": progress_bem('portion'),
      "style": portionStyle
    }, [showPivot && h("span", {
      "ref": "pivot",
      "style": pivotStyle,
      "class": progress_bem('pivot')
    }, [text])])]);
  }
}));
// CONCATENATED MODULE: ./es/pull-refresh/index.js
// Utils


 // Mixins

 // Components



var pull_refresh_createNamespace = Object(create["a" /* createNamespace */])('pull-refresh'),
    pull_refresh_createComponent = pull_refresh_createNamespace[0],
    pull_refresh_bem = pull_refresh_createNamespace[1],
    pull_refresh_t = pull_refresh_createNamespace[2];

var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ['pulling', 'loosing', 'success'];
/* harmony default export */ var pull_refresh = (pull_refresh_createComponent({
  mixins: [TouchMixin],
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    pullDistance: [Number, String],
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT
    }
  },
  data: function data() {
    return {
      status: 'normal',
      distance: 0,
      duration: 0
    };
  },
  computed: {
    touchable: function touchable() {
      return this.status !== 'loading' && this.status !== 'success' && !this.disabled;
    },
    headStyle: function headStyle() {
      if (this.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: this.headHeight + "px"
        };
      }
    }
  },
  watch: {
    value: function value(loading) {
      this.duration = this.animationDuration;

      if (loading) {
        this.setStatus(+this.headHeight, true);
      } else if (this.slots('success') || this.successText) {
        this.showSuccessTip();
      } else {
        this.setStatus(0, false);
      }
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$refs.track);
    this.scrollEl = getScroller(this.$el);
  },
  methods: {
    checkPullStart: function checkPullStart(event) {
      this.ceiling = getScrollTop(this.scrollEl) === 0;

      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        this.checkPullStart(event);
      }

      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
        preventDefault(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === 'loosing') {
          this.setStatus(+this.headHeight, true);
          this.$emit('input', true); // ensure value change can be watched

          this.$nextTick(function () {
            _this.$emit('refresh');
          });
        } else {
          this.setStatus(0);
        }
      }
    },
    ease: function ease(distance) {
      var pullDistance = +(this.pullDistance || this.headHeight);

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }

      return Math.round(distance);
    },
    setStatus: function setStatus(distance, isLoading) {
      var status;

      if (isLoading) {
        status = 'loading';
      } else if (distance === 0) {
        status = 'normal';
      } else {
        status = distance < (this.pullDistance || this.headHeight) ? 'pulling' : 'loosing';
      }

      this.distance = distance;

      if (status !== this.status) {
        this.status = status;
      }
    },
    genStatus: function genStatus() {
      var h = this.$createElement;
      var status = this.status,
          distance = this.distance;
      var slot = this.slots(status, {
        distance: distance
      });

      if (slot) {
        return slot;
      }

      var nodes = [];
      var text = this[status + "Text"] || pull_refresh_t(status);

      if (TEXT_STATUS.indexOf(status) !== -1) {
        nodes.push(h("div", {
          "class": pull_refresh_bem('text')
        }, [text]));
      }

      if (status === 'loading') {
        nodes.push(h(es_loading, {
          "attrs": {
            "size": "16"
          }
        }, [text]));
      }

      return nodes;
    },
    showSuccessTip: function showSuccessTip() {
      var _this2 = this;

      this.status = 'success';
      setTimeout(function () {
        _this2.setStatus(0);
      }, this.successDuration);
    }
  },
  render: function render() {
    var h = arguments[0];
    var trackStyle = {
      transitionDuration: this.duration + "ms",
      transform: this.distance ? "translate3d(0," + this.distance + "px, 0)" : ''
    };
    return h("div", {
      "class": pull_refresh_bem()
    }, [h("div", {
      "ref": "track",
      "class": pull_refresh_bem('track'),
      "style": trackStyle
    }, [h("div", {
      "class": pull_refresh_bem('head'),
      "style": this.headStyle
    }, [this.genStatus()]), this.slots()])]);
  }
}));
// CONCATENATED MODULE: ./es/rate/index.js
// Utils

 // Mixins


 // Components



var rate_createNamespace = Object(create["a" /* createNamespace */])('rate'),
    rate_createComponent = rate_createNamespace[0],
    rate_bem = rate_createNamespace[1];

function getRateStatus(value, index, allowHalf) {
  if (value >= index) {
    return 'full';
  }

  if (value + 0.5 >= index && allowHalf) {
    return 'half';
  }

  return 'void';
}

/* harmony default export */ var es_rate = (rate_createComponent({
  mixins: [TouchMixin, FieldMixin],
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    iconPrefix: String,
    disabledColor: String,
    value: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    count: {
      type: [Number, String],
      default: 5
    },
    touchable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    list: function list() {
      var list = [];

      for (var i = 1; i <= this.count; i++) {
        list.push(getRateStatus(this.value, i, this.allowHalf));
      }

      return list;
    },
    sizeWithUnit: function sizeWithUnit() {
      return Object(unit["a" /* addUnit */])(this.size);
    },
    gutterWithUnit: function gutterWithUnit() {
      return Object(unit["a" /* addUnit */])(this.gutter);
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    select: function select(index) {
      if (!this.disabled && !this.readonly && index !== this.value) {
        this.$emit('input', index);
        this.$emit('change', index);
      }
    },
    onTouchStart: function onTouchStart(event) {
      var _this = this;

      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }

      this.touchStart(event);
      var rects = this.$refs.items.map(function (item) {
        return item.getBoundingClientRect();
      });
      var ranges = [];
      rects.forEach(function (rect, index) {
        if (_this.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left
          });
        }
      });
      this.ranges = ranges;
    },
    onTouchMove: function onTouchMove(event) {
      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        preventDefault(event);
        var clientX = event.touches[0].clientX;
        this.select(this.getScoreByPosition(clientX));
      }
    },
    getScoreByPosition: function getScoreByPosition(x) {
      for (var i = this.ranges.length - 1; i > 0; i--) {
        if (x > this.ranges[i].left) {
          return this.ranges[i].score;
        }
      }

      return this.allowHalf ? 0.5 : 1;
    },
    genStar: function genStar(status, index) {
      var _this2 = this;

      var h = this.$createElement;
      var icon = this.icon,
          color = this.color,
          count = this.count,
          voidIcon = this.voidIcon,
          disabled = this.disabled,
          voidColor = this.voidColor,
          disabledColor = this.disabledColor;
      var score = index + 1;
      var isFull = status === 'full';
      var isVoid = status === 'void';
      var style;

      if (this.gutterWithUnit && score !== +count) {
        style = {
          paddingRight: this.gutterWithUnit
        };
      }

      return h("div", {
        "ref": "items",
        "refInFor": true,
        "key": index,
        "attrs": {
          "role": "radio",
          "tabindex": "0",
          "aria-setsize": count,
          "aria-posinset": score,
          "aria-checked": String(!isVoid)
        },
        "style": style,
        "class": rate_bem('item')
      }, [h(es_icon, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isFull ? icon : voidIcon,
          "color": disabled ? disabledColor : isFull ? color : voidColor,
          "classPrefix": this.iconPrefix,
          "data-score": score
        },
        "class": rate_bem('icon', {
          disabled: disabled,
          full: isFull
        }),
        "on": {
          "click": function click() {
            _this2.select(score);
          }
        }
      }), this.allowHalf && h(es_icon, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isVoid ? voidIcon : icon,
          "color": disabled ? disabledColor : isVoid ? voidColor : color,
          "classPrefix": this.iconPrefix,
          "data-score": score - 0.5
        },
        "class": rate_bem('icon', ['half', {
          disabled: disabled,
          full: !isVoid
        }]),
        "on": {
          "click": function click() {
            _this2.select(score - 0.5);
          }
        }
      })]);
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    return h("div", {
      "class": rate_bem({
        readonly: this.readonly,
        disabled: this.disabled
      }),
      "attrs": {
        "tabindex": "0",
        "role": "radiogroup"
      }
    }, [this.list.map(function (status, index) {
      return _this3.genStar(status, index);
    })]);
  }
}));
// CONCATENATED MODULE: ./es/row/index.js



var row_createNamespace = Object(create["a" /* createNamespace */])('row'),
    row_createComponent = row_createNamespace[0],
    row_bem = row_createNamespace[1];

/* harmony default export */ var row = (row_createComponent({
  mixins: [ParentMixin('vanRow')],
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    spaces: function spaces() {
      var gutter = Number(this.gutter);

      if (!gutter) {
        return;
      }

      var spaces = [];
      var groups = [[]];
      var totalSpan = 0;
      this.children.forEach(function (item, index) {
        totalSpan += Number(item.span);

        if (totalSpan > 24) {
          groups.push([index]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index);
        }
      });
      groups.forEach(function (group) {
        var averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach(function (item, index) {
          if (index === 0) {
            spaces.push({
              right: averagePadding
            });
          } else {
            var left = gutter - spaces[item - 1].right;
            var right = averagePadding - left;
            spaces.push({
              left: left,
              right: right
            });
          }
        });
      });
      return spaces;
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  render: function render() {
    var _bem;

    var h = arguments[0];
    var align = this.align,
        justify = this.justify;
    var flex = this.type === 'flex';
    return h(this.tag, {
      "class": row_bem((_bem = {
        flex: flex
      }, _bem["align-" + align] = flex && align, _bem["justify-" + justify] = flex && justify, _bem)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/search/index.js


 // Utils



 // Components

 // Types

var search_createNamespace = Object(create["a" /* createNamespace */])('search'),
    search_createComponent = search_createNamespace[0],
    search_bem = search_createNamespace[1],
    search_t = search_createNamespace[2];

function Search(h, props, slots, ctx) {
  function Label() {
    if (slots.label || props.label) {
      return h("div", {
        "class": search_bem('label')
      }, [slots.label ? slots.label() : props.label]);
    }
  }

  function Action() {
    if (!props.showAction) {
      return;
    }

    function onCancel() {
      if (slots.action) {
        return;
      }

      functional_emit(ctx, 'input', '');
      functional_emit(ctx, 'cancel');
    }

    return h("div", {
      "class": search_bem('action'),
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "on": {
        "click": onCancel
      }
    }, [slots.action ? slots.action() : props.actionText || search_t('cancel')]);
  }

  var fieldData = {
    attrs: ctx.data.attrs,
    on: _extends({}, ctx.listeners, {
      keypress: function keypress(event) {
        // press enter
        if (event.keyCode === 13) {
          preventDefault(event);
          functional_emit(ctx, 'search', props.value);
        }

        functional_emit(ctx, 'keypress', event);
      }
    })
  };
  var inheritData = inherit(ctx);
  inheritData.attrs = undefined;
  return h("div", helper_default()([{
    "class": search_bem({
      'show-action': props.showAction
    }),
    "style": {
      background: props.background
    }
  }, inheritData]), [slots.left == null ? void 0 : slots.left(), h("div", {
    "class": search_bem('content', props.shape)
  }, [Label(), h(es_field, helper_default()([{
    "attrs": {
      "type": "search",
      "border": false,
      "value": props.value,
      "leftIcon": props.leftIcon,
      "rightIcon": props.rightIcon,
      "clearable": props.clearable,
      "clearTrigger": props.clearTrigger
    },
    "scopedSlots": {
      'left-icon': slots['left-icon'],
      'right-icon': slots['right-icon']
    }
  }, fieldData]))]), Action()]);
}

Search.props = {
  value: String,
  label: String,
  rightIcon: String,
  actionText: String,
  background: String,
  showAction: Boolean,
  clearTrigger: String,
  shape: {
    type: String,
    default: 'square'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  leftIcon: {
    type: String,
    default: 'search'
  }
};
/* harmony default export */ var search = (search_createComponent(Search));
// CONCATENATED MODULE: ./es/share-sheet/index.js
 // Utils

 // Mixins

 // Components


var PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];

var share_sheet_createNamespace = Object(create["a" /* createNamespace */])('share-sheet'),
    share_sheet_createComponent = share_sheet_createNamespace[0],
    share_sheet_bem = share_sheet_createNamespace[1],
    share_sheet_t = share_sheet_createNamespace[2];

/* harmony default export */ var share_sheet = (share_sheet_createComponent({
  props: _extends({}, popupMixinProps, {
    title: String,
    duration: String,
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  }),
  methods: {
    onCancel: function onCancel() {
      this.toggle(false);
      this.$emit('cancel');
    },
    onSelect: function onSelect(option, index) {
      this.$emit('select', option, index);
    },
    toggle: function toggle(val) {
      this.$emit('input', val);
    },
    getIconURL: function getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return "https://img01.yzcdn.cn/vant/share-sheet-" + icon + ".png";
      }

      return icon;
    },
    genHeader: function genHeader() {
      var h = this.$createElement;
      var title = this.slots('title') || this.title;
      var description = this.slots('description') || this.description;

      if (!title && !description) {
        return;
      }

      return h("div", {
        "class": share_sheet_bem('header')
      }, [title && h("h2", {
        "class": share_sheet_bem('title')
      }, [title]), description && h("span", {
        "class": share_sheet_bem('description')
      }, [description])]);
    },
    genOptions: function genOptions(options, showBorder) {
      var _this = this;

      var h = this.$createElement;
      return h("div", {
        "class": share_sheet_bem('options', {
          border: showBorder
        })
      }, [options.map(function (option, index) {
        return h("div", {
          "attrs": {
            "role": "button",
            "tabindex": "0"
          },
          "class": [share_sheet_bem('option'), option.className],
          "on": {
            "click": function click() {
              _this.onSelect(option, index);
            }
          }
        }, [h("img", {
          "attrs": {
            "src": _this.getIconURL(option.icon)
          },
          "class": share_sheet_bem('icon')
        }), option.name && h("span", {
          "class": share_sheet_bem('name')
        }, [option.name]), option.description && h("span", {
          "class": share_sheet_bem('option-description')
        }, [option.description])]);
      })]);
    },
    genRows: function genRows() {
      var _this2 = this;

      var options = this.options;

      if (Array.isArray(options[0])) {
        return options.map(function (item, index) {
          return _this2.genOptions(item, index !== 0);
        });
      }

      return this.genOptions(options);
    },
    genCancelText: function genCancelText() {
      var _this$cancelText;

      var h = this.$createElement;
      var cancelText = (_this$cancelText = this.cancelText) != null ? _this$cancelText : share_sheet_t('cancel');

      if (cancelText) {
        return h("button", {
          "attrs": {
            "type": "button"
          },
          "class": share_sheet_bem('cancel'),
          "on": {
            "click": this.onCancel
          }
        }, [cancelText]);
      }
    },
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(popup, {
      "attrs": {
        "round": true,
        "value": this.value,
        "position": "bottom",
        "overlay": this.overlay,
        "duration": this.duration,
        "lazyRender": this.lazyRender,
        "lockScroll": this.lockScroll,
        "getContainer": this.getContainer,
        "closeOnPopstate": this.closeOnPopstate,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom
      },
      "class": share_sheet_bem(),
      "on": {
        "input": this.toggle,
        "click-overlay": this.onClickOverlay
      }
    }, [this.genHeader(), this.genRows(), this.genCancelText()]);
  }
}));
// CONCATENATED MODULE: ./es/sidebar/index.js



var sidebar_createNamespace = Object(create["a" /* createNamespace */])('sidebar'),
    sidebar_createComponent = sidebar_createNamespace[0],
    sidebar_bem = sidebar_createNamespace[1];

/* harmony default export */ var sidebar = (sidebar_createComponent({
  mixins: [ParentMixin('vanSidebar')],
  model: {
    prop: 'activeKey'
  },
  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      index: +this.activeKey
    };
  },
  watch: {
    activeKey: function activeKey() {
      this.setIndex(+this.activeKey);
    }
  },
  methods: {
    setIndex: function setIndex(index) {
      if (index !== this.index) {
        this.index = index;
        this.$emit('change', index);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": sidebar_bem()
    }, [this.slots()]);
  }
}));
// CONCATENATED MODULE: ./es/sidebar-item/index.js






var sidebar_item_createNamespace = Object(create["a" /* createNamespace */])('sidebar-item'),
    sidebar_item_createComponent = sidebar_item_createNamespace[0],
    sidebar_item_bem = sidebar_item_createNamespace[1];

/* harmony default export */ var sidebar_item = (sidebar_item_createComponent({
  mixins: [ChildrenMixin('vanSidebar')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    title: String,
    disabled: Boolean
  }),
  computed: {
    select: function select() {
      return this.index === +this.parent.activeKey;
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled) {
        return;
      }

      this.$emit('click', this.index);
      this.parent.$emit('input', this.index);
      this.parent.setIndex(this.index);
      route(this.$router, this);
    }
  },
  render: function render() {
    var _this$slots, _this$badge;

    var h = arguments[0];

    if (false) {}

    return h("a", {
      "class": sidebar_item_bem({
        select: this.select,
        disabled: this.disabled
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": sidebar_item_bem('text')
    }, [(_this$slots = this.slots('title')) != null ? _this$slots : this.title, h(es_info, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info
      },
      "class": sidebar_item_bem('info')
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/skeleton/index.js
 // Utils


 // Types

var skeleton_createNamespace = Object(create["a" /* createNamespace */])('skeleton'),
    skeleton_createComponent = skeleton_createNamespace[0],
    skeleton_bem = skeleton_createNamespace[1];

var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';

function Skeleton(h, props, slots, ctx) {
  if (!props.loading) {
    return slots.default && slots.default();
  }

  function Title() {
    if (props.title) {
      return h("h3", {
        "class": skeleton_bem('title'),
        "style": {
          width: Object(unit["a" /* addUnit */])(props.titleWidth)
        }
      });
    }
  }

  function Rows() {
    var Rows = [];
    var rowWidth = props.rowWidth;

    function getRowWidth(index) {
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    }

    for (var i = 0; i < props.row; i++) {
      Rows.push(h("div", {
        "class": skeleton_bem('row'),
        "style": {
          width: Object(unit["a" /* addUnit */])(getRowWidth(i))
        }
      }));
    }

    return Rows;
  }

  function Avatar() {
    if (props.avatar) {
      var size = Object(unit["a" /* addUnit */])(props.avatarSize);
      return h("div", {
        "class": skeleton_bem('avatar', props.avatarShape),
        "style": {
          width: size,
          height: size
        }
      });
    }
  }

  return h("div", helper_default()([{
    "class": skeleton_bem({
      animate: props.animate,
      round: props.round
    })
  }, inherit(ctx)]), [Avatar(), h("div", {
    "class": skeleton_bem('content')
  }, [Title(), Rows()])]);
}

Skeleton.props = {
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  titleWidth: [Number, String],
  avatarSize: [Number, String],
  row: {
    type: [Number, String],
    default: 0
  },
  loading: {
    type: Boolean,
    default: true
  },
  animate: {
    type: Boolean,
    default: true
  },
  avatarShape: {
    type: String,
    default: 'round'
  },
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
/* harmony default export */ var skeleton = (skeleton_createComponent(Skeleton));
// CONCATENATED MODULE: ./es/sku/lang.js
/**
 * Sku only provide zh-CN lang by default
 */
/* harmony default export */ var lang = ({
  'zh-CN': {
    vanSku: {
      select: '请选择',
      selected: '已选',
      selectSku: '请先选择商品规格',
      soldout: '库存不足',
      originPrice: '原价',
      minusTip: '至少选择一件',
      minusStartTip: function minusStartTip(start) {
        return start + "\u4EF6\u8D77\u552E";
      },
      unavailable: '商品已经无法购买啦',
      stock: '剩余',
      stockUnit: '件',
      quotaTip: function quotaTip(quota) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaUsedTip: function quotaUsedTip(quota, count) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6\uFF0C\u4F60\u5DF2\u8D2D\u4E70" + count + "\u4EF6";
      }
    },
    vanSkuActions: {
      buy: '立即购买',
      addCart: '加入购物车'
    },
    vanSkuImgUploader: {
      oversize: function oversize(maxSize) {
        return "\u6700\u5927\u53EF\u4E0A\u4F20\u56FE\u7247\u4E3A" + maxSize + "MB\uFF0C\u8BF7\u5C1D\u8BD5\u538B\u7F29\u56FE\u7247\u5C3A\u5BF8";
      },
      fail: '上传失败',
      uploading: '上传中...'
    },
    vanSkuStepper: {
      quotaLimit: function quotaLimit(quota) {
        return "\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaStart: function quotaStart(start) {
        return start + "\u4EF6\u8D77\u552E";
      },
      comma: '，',
      num: '购买数量'
    },
    vanSkuMessages: {
      fill: '请填写',
      upload: '请上传',
      imageLabel: '仅限一张',
      invalid: {
        tel: '请填写正确的数字格式留言',
        mobile: '手机号长度为6-20位数字',
        email: '请填写正确的邮箱',
        id_no: '请填写正确的身份证号码'
      },
      placeholder: {
        id_no: '请填写身份证号',
        text: '请填写留言',
        tel: '请填写数字',
        email: '请填写邮箱',
        date: '请选择日期',
        time: '请选择时间',
        textarea: '请填写留言',
        mobile: '请填写手机号'
      }
    },
    vanSkuRow: {
      multiple: '可多选'
    },
    vanSkuDatetimeField: {
      title: {
        date: '选择年月日',
        time: '选择时间',
        datetime: '选择日期时间'
      },
      format: {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }
    }
  }
});
// CONCATENATED MODULE: ./es/sku/constants.js
var LIMIT_TYPE = {
  QUOTA_LIMIT: 0,
  STOCK_LIMIT: 1
};
var UNSELECTED_SKU_VALUE_ID = '';
/* harmony default export */ var constants = ({
  LIMIT_TYPE: LIMIT_TYPE,
  UNSELECTED_SKU_VALUE_ID: UNSELECTED_SKU_VALUE_ID
});
// CONCATENATED MODULE: ./es/sku/utils/sku-helper.js


/*
  normalize sku tree

  [
    {
      count: 2,
      k: "品种", // 规格名称 skuKeyName
      k_id: "1200", // skuKeyId
      k_s: "s1" // skuKeyStr
      v: [ // skuValues
        { // skuValue
          id: "1201", // skuValueId
          name: "萌" // 具体的规格值 skuValueName
        }, {
          id: "973",
          name: "帅"
        }
      ]
    },
    ...
  ]
                |
                v
  {
    s1: [{
      id: "1201",
      name: "萌"
    }, {
      id: "973",
      name: "帅"
    }],
    ...
  }
 */

var normalizeSkuTree = function normalizeSkuTree(skuTree) {
  var normalizedTree = {};
  skuTree.forEach(function (treeItem) {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};
var normalizePropList = function normalizePropList(propList) {
  var normalizedProp = {};
  propList.forEach(function (item) {
    var itemObj = {};
    item.v.forEach(function (it) {
      itemObj[it.id] = it;
    });
    normalizedProp[item.k_id] = itemObj;
  });
  return normalizedProp;
}; // 判断是否所有的sku都已经选中

var sku_helper_isAllSelected = function isAllSelected(skuTree, selectedSku) {
  // 筛选selectedSku对象中key值不为空的值
  var selected = Object.keys(selectedSku).filter(function (skuKeyStr) {
    return selectedSku[skuKeyStr] !== UNSELECTED_SKU_VALUE_ID;
  });
  return skuTree.length === selected.length;
}; // 根据已选择的 sku 获取 skuComb

var getSkuComb = function getSkuComb(skuList, selectedSku) {
  var skuComb = skuList.filter(function (item) {
    return Object.keys(selectedSku).every(function (skuKeyStr) {
      return String(item[skuKeyStr]) === String(selectedSku[skuKeyStr]);
    });
  });
  return skuComb[0];
}; // 获取已选择的sku名称

var sku_helper_getSelectedSkuValues = function getSelectedSkuValues(skuTree, selectedSku) {
  var normalizedTree = normalizeSkuTree(skuTree);
  return Object.keys(selectedSku).reduce(function (selectedValues, skuKeyStr) {
    var skuValues = normalizedTree[skuKeyStr] || [];
    var skuValueId = selectedSku[skuKeyStr];

    if (skuValueId !== UNSELECTED_SKU_VALUE_ID && skuValues.length > 0) {
      var skuValue = skuValues.filter(function (value) {
        return value.id === skuValueId;
      })[0];
      skuValue && selectedValues.push(skuValue);
    }

    return selectedValues;
  }, []);
}; // 判断sku是否可选

var sku_helper_isSkuChoosable = function isSkuChoosable(skuList, selectedSku, skuToChoose) {
  var _extends2;

  var key = skuToChoose.key,
      valueId = skuToChoose.valueId; // 先假设sku已选中，拼入已选中sku对象中

  var matchedSku = _extends({}, selectedSku, (_extends2 = {}, _extends2[key] = valueId, _extends2)); // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中


  var skusToCheck = Object.keys(matchedSku).filter(function (skuKey) {
    return matchedSku[skuKey] !== UNSELECTED_SKU_VALUE_ID;
  });
  var filteredSku = skuList.filter(function (sku) {
    return skusToCheck.every(function (skuKey) {
      return String(matchedSku[skuKey]) === String(sku[skuKey]);
    });
  });
  var stock = filteredSku.reduce(function (total, sku) {
    total += sku.stock_num;
    return total;
  }, 0);
  return stock > 0;
};
var sku_helper_getSelectedPropValues = function getSelectedPropValues(propList, selectedProp) {
  var normalizeProp = normalizePropList(propList);
  return Object.keys(selectedProp).reduce(function (acc, cur) {
    selectedProp[cur].forEach(function (it) {
      acc.push(_extends({}, normalizeProp[cur][it]));
    });
    return acc;
  }, []);
};
var sku_helper_getSelectedProperties = function getSelectedProperties(propList, selectedProp) {
  var list = [];
  (propList || []).forEach(function (prop) {
    if (selectedProp[prop.k_id] && selectedProp[prop.k_id].length > 0) {
      var v = [];
      prop.v.forEach(function (it) {
        if (selectedProp[prop.k_id].indexOf(it.id) > -1) {
          v.push(_extends({}, it));
        }
      });
      list.push(_extends({}, prop, {
        v: v
      }));
    }
  });
  return list;
};
/* harmony default export */ var sku_helper = ({
  normalizeSkuTree: normalizeSkuTree,
  getSkuComb: getSkuComb,
  getSelectedSkuValues: sku_helper_getSelectedSkuValues,
  isAllSelected: sku_helper_isAllSelected,
  isSkuChoosable: sku_helper_isSkuChoosable,
  getSelectedPropValues: sku_helper_getSelectedPropValues,
  getSelectedProperties: sku_helper_getSelectedProperties
});
// CONCATENATED MODULE: ./es/sku/components/SkuHeader.js

 // Utils



 // Components

 // Types

var SkuHeader_createNamespace = Object(create["a" /* createNamespace */])('sku-header'),
    SkuHeader_createComponent = SkuHeader_createNamespace[0],
    SkuHeader_bem = SkuHeader_createNamespace[1];

function getSkuImgValue(sku, selectedSku) {
  var imgValue;
  sku.tree.some(function (item) {
    var id = selectedSku[item.k_s];

    if (id && item.v) {
      var matchedSku = item.v.filter(function (skuValue) {
        return skuValue.id === id;
      })[0] || {};
      var img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;

      if (img) {
        imgValue = _extends({}, matchedSku, {
          ks: item.k_s,
          imgUrl: img
        });
        return true;
      }
    }

    return false;
  });
  return imgValue;
}

function SkuHeader(h, props, slots, ctx) {
  var _slots$skuHeaderIma;

  var sku = props.sku,
      goods = props.goods,
      skuEventBus = props.skuEventBus,
      selectedSku = props.selectedSku,
      _props$showHeaderImag = props.showHeaderImage,
      showHeaderImage = _props$showHeaderImag === void 0 ? true : _props$showHeaderImag;
  var selectedValue = getSkuImgValue(sku, selectedSku);
  var imgUrl = selectedValue ? selectedValue.imgUrl : goods.picture;

  var previewImage = function previewImage() {
    skuEventBus.$emit('sku:previewImage', selectedValue);
  };

  return h("div", helper_default()([{
    "class": [SkuHeader_bem(), BORDER_BOTTOM]
  }, inherit(ctx)]), [showHeaderImage && h(es_image, {
    "attrs": {
      "fit": "cover",
      "src": imgUrl
    },
    "class": SkuHeader_bem('img-wrap'),
    "on": {
      "click": previewImage
    }
  }, [(_slots$skuHeaderIma = slots['sku-header-image-extra']) == null ? void 0 : _slots$skuHeaderIma.call(slots)]), h("div", {
    "class": SkuHeader_bem('goods-info')
  }, [slots.default == null ? void 0 : slots.default()])]);
}

SkuHeader.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object,
  showHeaderImage: Boolean
};
/* harmony default export */ var components_SkuHeader = (SkuHeader_createComponent(SkuHeader));
// CONCATENATED MODULE: ./es/sku/components/SkuHeaderItem.js
 // Utils


 // Types

var SkuHeaderItem_createNamespace = Object(create["a" /* createNamespace */])('sku-header-item'),
    SkuHeaderItem_createComponent = SkuHeaderItem_createNamespace[0],
    SkuHeaderItem_bem = SkuHeaderItem_createNamespace[1];

function SkuHeaderItem_SkuHeader(h, props, slots, ctx) {
  return h("div", helper_default()([{
    "class": SkuHeaderItem_bem()
  }, inherit(ctx)]), [slots.default && slots.default()]);
}

/* harmony default export */ var SkuHeaderItem = (SkuHeaderItem_createComponent(SkuHeaderItem_SkuHeader));
// CONCATENATED MODULE: ./es/sku/components/SkuRow.js
// Utils

 // Mixins




var SkuRow_createNamespace = Object(create["a" /* createNamespace */])('sku-row'),
    SkuRow_createComponent = SkuRow_createNamespace[0],
    SkuRow_bem = SkuRow_createNamespace[1],
    SkuRow_t = SkuRow_createNamespace[2];


/* harmony default export */ var SkuRow = (SkuRow_createComponent({
  mixins: [ParentMixin('vanSkuRows'), BindEventMixin(function (bind) {
    if (this.scrollable && this.$refs.scroller) {
      bind(this.$refs.scroller, 'scroll', this.onScroll);
    }
  })],
  props: {
    skuRow: Object
  },
  data: function data() {
    return {
      progress: 0
    };
  },
  computed: {
    scrollable: function scrollable() {
      return this.skuRow.largeImageMode && this.skuRow.v.length > 6;
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this$$refs = this.$refs,
          scroller = _this$$refs.scroller,
          row = _this$$refs.row;
      var distance = row.offsetWidth - scroller.offsetWidth;
      this.progress = scroller.scrollLeft / distance;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      return h("div", {
        "class": SkuRow_bem('title')
      }, [this.skuRow.k, this.skuRow.is_multiple && h("span", {
        "class": SkuRow_bem('title-multiple')
      }, ["\uFF08", SkuRow_t('multiple'), "\uFF09"])]);
    },
    genIndicator: function genIndicator() {
      var h = this.$createElement;

      if (this.scrollable) {
        var style = {
          transform: "translate3d(" + this.progress * 20 + "px, 0, 0)"
        };
        return h("div", {
          "class": SkuRow_bem('indicator-wrapper')
        }, [h("div", {
          "class": SkuRow_bem('indicator')
        }, [h("div", {
          "class": SkuRow_bem('indicator-slider'),
          "style": style
        })])]);
      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var nodes = this.slots();

      if (this.skuRow.largeImageMode) {
        var top = [];
        var bottom = [];
        nodes.forEach(function (node, index) {
          var group = Math.floor(index / 3) % 2 === 0 ? top : bottom;
          group.push(node);
        });
        return h("div", {
          "class": SkuRow_bem('scroller'),
          "ref": "scroller"
        }, [h("div", {
          "class": SkuRow_bem('row'),
          "ref": "row"
        }, [top]), bottom.length ? h("div", {
          "class": SkuRow_bem('row')
        }, [bottom]) : null]);
      }

      return nodes;
    },
    centerItem: function centerItem(selectSkuId) {
      if (!this.skuRow.largeImageMode || !selectSkuId) {
        return;
      }

      var _this$children = this.children,
          children = _this$children === void 0 ? [] : _this$children;
      var _this$$refs2 = this.$refs,
          scroller = _this$$refs2.scroller,
          row = _this$$refs2.row;
      var child = children.find(function (it) {
        return +it.skuValue.id === +selectSkuId;
      });

      if (scroller && row && child && child.$el) {
        var target = child.$el;
        var to = target.offsetLeft - (scroller.offsetWidth - target.offsetWidth) / 2;
        scroller.scrollLeft = to;
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [SkuRow_bem(), BORDER_BOTTOM]
    }, [this.genTitle(), this.genContent(), this.genIndicator()]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuRowItem.js








var SkuRowItem_createNamespace = Object(create["a" /* createNamespace */])('sku-row-item'),
    SkuRowItem_createComponent = SkuRowItem_createNamespace[0];

/* harmony default export */ var SkuRowItem = (SkuRowItem_createComponent({
  mixins: [ChildrenMixin('vanSkuRows')],
  props: {
    lazyLoad: Boolean,
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedSku: Object,
    largeImageMode: Boolean,
    disableSoldoutSku: Boolean,
    skuList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    imgUrl: function imgUrl() {
      var url = this.skuValue.imgUrl || this.skuValue.img_url;
      return this.largeImageMode ? url || 'https://img01.yzcdn.cn/upload_files/2020/06/24/FmKWDg0bN9rMcTp9ne8MXiQWGtLn.png' : url;
    },
    choosable: function choosable() {
      if (!this.disableSoldoutSku) {
        return true;
      }

      return sku_helper_isSkuChoosable(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect() {
      if (this.choosable) {
        this.skuEventBus.$emit('sku:select', _extends({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    },
    onPreviewImg: function onPreviewImg(event) {
      event.stopPropagation();
      var skuValue = this.skuValue,
          skuKeyStr = this.skuKeyStr;
      this.skuEventBus.$emit('sku:previewImage', _extends({}, skuValue, {
        ks: skuKeyStr,
        imgUrl: skuValue.imgUrl || skuValue.img_url
      }));
    },
    genImage: function genImage(classPrefix) {
      var h = this.$createElement;

      if (this.imgUrl) {
        return h(es_image, {
          "attrs": {
            "fit": "cover",
            "src": this.imgUrl,
            "lazyLoad": this.lazyLoad
          },
          "class": classPrefix + "-img"
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var choosed = this.skuValue.id === this.selectedSku[this.skuKeyStr];
    var classPrefix = this.largeImageMode ? SkuRow_bem('image-item') : SkuRow_bem('item');
    return h("span", {
      "class": [classPrefix, choosed ? classPrefix + "--active" : '', !this.choosable ? classPrefix + "--disabled" : ''],
      "on": {
        "click": this.onSelect
      }
    }, [this.genImage(classPrefix), h("div", {
      "class": classPrefix + "-name"
    }, [this.largeImageMode ? h("span", {
      "class": {
        'van-multi-ellipsis--l2': this.largeImageMode
      }
    }, [this.skuValue.name]) : this.skuValue.name]), this.largeImageMode && h(es_icon, {
      "attrs": {
        "name": "enlarge"
      },
      "class": classPrefix + "-img-icon",
      "on": {
        "click": this.onPreviewImg
      }
    })]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuRowPropItem.js



var SkuRowPropItem_createNamespace = Object(create["a" /* createNamespace */])('sku-row-prop-item'),
    SkuRowPropItem_createComponent = SkuRowPropItem_createNamespace[0];

/* harmony default export */ var SkuRowPropItem = (SkuRowPropItem_createComponent({
  props: {
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedProp: Object,
    multiple: Boolean
  },
  computed: {
    choosed: function choosed() {
      var selectedProp = this.selectedProp,
          skuKeyStr = this.skuKeyStr,
          skuValue = this.skuValue;

      if (selectedProp && selectedProp[skuKeyStr]) {
        return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
      }

      return false;
    }
  },
  methods: {
    onSelect: function onSelect() {
      this.skuEventBus.$emit('sku:propSelect', _extends({}, this.skuValue, {
        skuKeyStr: this.skuKeyStr,
        multiple: this.multiple
      }));
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("span", {
      "class": ['van-sku-row__item', {
        'van-sku-row__item--active': this.choosed
      }],
      "on": {
        "click": this.onSelect
      }
    }, [h("span", {
      "class": "van-sku-row__item-name"
    }, [this.skuValue.name])]);
  }
}));
// CONCATENATED MODULE: ./es/stepper/index.js









var stepper_createNamespace = Object(create["a" /* createNamespace */])('stepper'),
    stepper_createComponent = stepper_createNamespace[0],
    stepper_bem = stepper_createNamespace[1];

var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200;

function stepper_equal(value1, value2) {
  return String(value1) === String(value2);
}

/* harmony default export */ var stepper = (stepper_createComponent({
  mixins: [FieldMixin],
  props: {
    value: null,
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: Boolean,
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    asyncChange: Boolean,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    decimalLength: [Number, String],
    name: {
      type: [Number, String],
      default: ''
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    step: {
      type: [Number, String],
      default: 1
    },
    defaultValue: {
      type: [Number, String],
      default: 1
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: true
    },
    longPress: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    var _this$value;

    var defaultValue = (_this$value = this.value) != null ? _this$value : this.defaultValue;
    var value = this.format(defaultValue);

    if (!stepper_equal(value, this.value)) {
      this.$emit('input', value);
    }

    return {
      currentValue: value
    };
  },
  computed: {
    minusDisabled: function minusDisabled() {
      return this.disabled || this.disableMinus || this.currentValue <= +this.min;
    },
    plusDisabled: function plusDisabled() {
      return this.disabled || this.disablePlus || this.currentValue >= +this.max;
    },
    inputStyle: function inputStyle() {
      var style = {};

      if (this.inputWidth) {
        style.width = Object(unit["a" /* addUnit */])(this.inputWidth);
      }

      if (this.buttonSize) {
        style.height = Object(unit["a" /* addUnit */])(this.buttonSize);
      }

      return style;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size = Object(unit["a" /* addUnit */])(this.buttonSize);
        return {
          width: size,
          height: size
        };
      }
    }
  },
  watch: {
    max: 'check',
    min: 'check',
    integer: 'check',
    decimalLength: 'check',
    value: function value(val) {
      if (!stepper_equal(val, this.currentValue)) {
        this.currentValue = this.format(val);
      }
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
      this.$emit('change', val, {
        name: this.name
      });
    }
  },
  methods: {
    check: function check() {
      var val = this.format(this.currentValue);

      if (!stepper_equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },
    // formatNumber illegal characters
    formatNumber: function formatNumber(value) {
      return number_formatNumber(String(value), !this.integer);
    },
    format: function format(value) {
      if (this.allowEmpty && value === '') {
        return value;
      }

      value = this.formatNumber(value); // format range

      value = value === '' ? 0 : +value;
      value = Object(number["a" /* isNaN */])(value) ? this.min : value;
      value = Math.max(Math.min(this.max, value), this.min); // format decimal

      if (Object(utils["c" /* isDef */])(this.decimalLength)) {
        value = value.toFixed(this.decimalLength);
      }

      return value;
    },
    onInput: function onInput(event) {
      var value = event.target.value;
      var formatted = this.formatNumber(value); // limit max decimal length

      if (Object(utils["c" /* isDef */])(this.decimalLength) && formatted.indexOf('.') !== -1) {
        var pair = formatted.split('.');
        formatted = pair[0] + "." + pair[1].slice(0, this.decimalLength);
      }

      if (!stepper_equal(value, formatted)) {
        event.target.value = formatted;
      } // prefer number type


      if (formatted === String(+formatted)) {
        formatted = +formatted;
      }

      this.emitChange(formatted);
    },
    emitChange: function emitChange(value) {
      if (this.asyncChange) {
        this.$emit('input', value);
        this.$emit('change', value, {
          name: this.name
        });
      } else {
        this.currentValue = value;
      }
    },
    onChange: function onChange() {
      var type = this.type;

      if (this[type + "Disabled"]) {
        this.$emit('overlimit', type);
        return;
      }

      var diff = type === 'minus' ? -this.step : +this.step;
      var value = this.format(addNumber(+this.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },
    onFocus: function onFocus(event) {
      // readonly not work in legacy mobile safari
      if (this.disableInput && this.$refs.input) {
        this.$refs.input.blur();
      } else {
        this.$emit('focus', event);
      }
    },
    onBlur: function onBlur(event) {
      var value = this.format(event.target.value);
      event.target.value = value;
      this.emitChange(value);
      this.$emit('blur', event);
      resetScroll();
    },
    longPressStep: function longPressStep() {
      var _this = this;

      this.longPressTimer = setTimeout(function () {
        _this.onChange();

        _this.longPressStep(_this.type);
      }, LONG_PRESS_INTERVAL);
    },
    onTouchStart: function onTouchStart() {
      var _this2 = this;

      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      this.isLongPress = false;
      this.longPressTimer = setTimeout(function () {
        _this2.isLongPress = true;

        _this2.onChange();

        _this2.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd: function onTouchEnd(event) {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);

      if (this.isLongPress) {
        preventDefault(event);
      }
    },
    onMousedown: function onMousedown(event) {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (this.disableInput) {
        event.preventDefault();
      }
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];

    var createListeners = function createListeners(type) {
      return {
        on: {
          click: function click(e) {
            // disable double tap scrolling on mobile safari
            e.preventDefault();
            _this3.type = type;

            _this3.onChange();
          },
          touchstart: function touchstart() {
            _this3.type = type;

            _this3.onTouchStart();
          },
          touchend: _this3.onTouchEnd,
          touchcancel: _this3.onTouchEnd
        }
      };
    };

    return h("div", {
      "class": stepper_bem([this.theme])
    }, [h("button", helper_default()([{
      "directives": [{
        name: "show",
        value: this.showMinus
      }],
      "attrs": {
        "type": "button"
      },
      "style": this.buttonStyle,
      "class": stepper_bem('minus', {
        disabled: this.minusDisabled
      })
    }, createListeners('minus')])), h("input", {
      "directives": [{
        name: "show",
        value: this.showInput
      }],
      "ref": "input",
      "attrs": {
        "type": this.integer ? 'tel' : 'text',
        "role": "spinbutton",
        "disabled": this.disabled,
        "readonly": this.disableInput,
        "inputmode": this.integer ? 'numeric' : 'decimal',
        "placeholder": this.placeholder,
        "aria-valuemax": this.max,
        "aria-valuemin": this.min,
        "aria-valuenow": this.currentValue
      },
      "class": stepper_bem('input'),
      "domProps": {
        "value": this.currentValue
      },
      "style": this.inputStyle,
      "on": {
        "input": this.onInput,
        "focus": this.onFocus,
        "blur": this.onBlur,
        "mousedown": this.onMousedown
      }
    }), h("button", helper_default()([{
      "directives": [{
        name: "show",
        value: this.showPlus
      }],
      "attrs": {
        "type": "button"
      },
      "style": this.buttonStyle,
      "class": stepper_bem('plus', {
        disabled: this.plusDisabled
      })
    }, createListeners('plus')]))]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuStepper.js



var namespace = Object(create["a" /* createNamespace */])('sku-stepper');
var SkuStepper_createComponent = namespace[0];
var SkuStepper_t = namespace[2];
var QUOTA_LIMIT = LIMIT_TYPE.QUOTA_LIMIT,
    STOCK_LIMIT = LIMIT_TYPE.STOCK_LIMIT;
/* harmony default export */ var SkuStepper = (SkuStepper_createComponent({
  props: {
    stock: Number,
    skuEventBus: Object,
    skuStockNum: Number,
    selectedNum: Number,
    stepperTitle: String,
    disableStepperInput: Boolean,
    customStepperConfig: Object,
    hideQuotaText: Boolean,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    startSaleNum: {
      type: Number,
      default: 1
    }
  },
  data: function data() {
    return {
      currentNum: this.selectedNum,
      // 购买限制类型: 限购/库存
      limitType: STOCK_LIMIT
    };
  },
  watch: {
    currentNum: function currentNum(num) {
      var intValue = parseInt(num, 10);

      if (intValue >= this.stepperMinLimit && intValue <= this.stepperLimit) {
        this.skuEventBus.$emit('sku:numChange', intValue);
      }
    },
    stepperLimit: function stepperLimit(limit) {
      if (limit < this.currentNum && this.stepperMinLimit <= limit) {
        this.currentNum = limit;
      }

      this.checkState(this.stepperMinLimit, limit);
    },
    stepperMinLimit: function stepperMinLimit(start) {
      if (start > this.currentNum || start > this.stepperLimit) {
        this.currentNum = start;
      }

      this.checkState(start, this.stepperLimit);
    }
  },
  computed: {
    stepperLimit: function stepperLimit() {
      var quotaLimit = this.quota - this.quotaUsed;
      var limit; // 无限购时直接取库存，有限购时取限购数和库存数中小的那个

      if (this.quota > 0 && quotaLimit <= this.stock) {
        // 修正负的limit
        limit = quotaLimit < 0 ? 0 : quotaLimit;
        this.limitType = QUOTA_LIMIT;
      } else {
        limit = this.stock;
        this.limitType = STOCK_LIMIT;
      }

      return limit;
    },
    stepperMinLimit: function stepperMinLimit() {
      return this.startSaleNum < 1 ? 1 : this.startSaleNum;
    },
    quotaText: function quotaText() {
      var _this$customStepperCo = this.customStepperConfig,
          quotaText = _this$customStepperCo.quotaText,
          hideQuotaText = _this$customStepperCo.hideQuotaText;
      if (hideQuotaText) return '';
      var text = '';

      if (quotaText) {
        text = quotaText;
      } else {
        var textArr = [];

        if (this.startSaleNum > 1) {
          textArr.push(SkuStepper_t('quotaStart', this.startSaleNum));
        }

        if (this.quota > 0) {
          textArr.push(SkuStepper_t('quotaLimit', this.quota));
        }

        text = textArr.join(SkuStepper_t('comma'));
      }

      return text;
    }
  },
  created: function created() {
    this.checkState(this.stepperMinLimit, this.stepperLimit);
  },
  methods: {
    setCurrentNum: function setCurrentNum(num) {
      this.currentNum = num;
      this.checkState(this.stepperMinLimit, this.stepperLimit);
    },
    onOverLimit: function onOverLimit(action) {
      this.skuEventBus.$emit('sku:overLimit', {
        action: action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum
      });
    },
    onChange: function onChange(currentValue) {
      var intValue = parseInt(currentValue, 10);
      var handleStepperChange = this.customStepperConfig.handleStepperChange;
      handleStepperChange && handleStepperChange(intValue);
      this.$emit('change', intValue);
    },
    checkState: function checkState(min, max) {
      // 如果选择小于起售，则强制变为起售
      if (this.currentNum < min || min > max) {
        this.currentNum = min;
      } else if (this.currentNum > max) {
        // 当前选择数量大于最大可选时，需要重置已选数量
        this.currentNum = max;
      }

      this.skuEventBus.$emit('sku:stepperState', {
        valid: min <= max,
        min: min,
        max: max,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum
      });
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h("div", {
      "class": "van-sku-stepper-stock"
    }, [h("div", {
      "class": "van-sku__stepper-title"
    }, [this.stepperTitle || SkuStepper_t('num')]), h(stepper, {
      "attrs": {
        "integer": true,
        "min": this.stepperMinLimit,
        "max": this.stepperLimit,
        "disableInput": this.disableStepperInput
      },
      "class": "van-sku__stepper",
      "on": {
        "overlimit": this.onOverLimit,
        "change": this.onChange
      },
      "model": {
        value: _this.currentNum,
        callback: function callback($$v) {
          _this.currentNum = $$v;
        }
      }
    }), !this.hideQuotaText && this.quotaText && h("span", {
      "class": "van-sku__stepper-quota"
    }, ["(", this.quotaText, ")"])]);
  }
}));
// CONCATENATED MODULE: ./es/utils/validate/email.js
/* eslint-disable */
function isEmail(value) {
  var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return reg.test(value.trim());
}
// CONCATENATED MODULE: ./es/uploader/utils.js

function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
function utils_readFile(file, resultType) {
  return new Promise(function (resolve) {
    if (resultType === 'file') {
      resolve(null);
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  });
}
function isOversize(files, maxSize) {
  return toArray(files).some(function (file) {
    if (file) {
      if (Object(utils["e" /* isFunction */])(maxSize)) {
        return maxSize(file);
      }

      return file.size > maxSize;
    }

    return false;
  });
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item) {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}
// CONCATENATED MODULE: ./es/uploader/index.js
 // Utils


 // Mixins

 // Components






var uploader_createNamespace = Object(create["a" /* createNamespace */])('uploader'),
    uploader_createComponent = uploader_createNamespace[0],
    uploader_bem = uploader_createNamespace[1];

/* harmony default export */ var uploader = (uploader_createComponent({
  inheritAttrs: false,
  mixins: [FieldMixin],
  model: {
    prop: 'fileList'
  },
  props: {
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    fileList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    maxSize: {
      type: [Number, String, Function],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: 'cover'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    uploadIcon: {
      type: String,
      default: 'photograph'
    }
  },
  computed: {
    previewSizeWithUnit: function previewSizeWithUnit() {
      return Object(unit["a" /* addUnit */])(this.previewSize);
    },
    // for form
    value: function value() {
      return this.fileList;
    }
  },
  created: function created() {
    this.urls = [];
  },
  beforeDestroy: function beforeDestroy() {
    this.urls.forEach(function (url) {
      return URL.revokeObjectURL(url);
    });
  },
  methods: {
    getDetail: function getDetail(index) {
      if (index === void 0) {
        index = this.fileList.length;
      }

      return {
        name: this.name,
        index: index
      };
    },
    onChange: function onChange(event) {
      var _this = this;

      var files = event.target.files;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        var response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if (Object(utils["g" /* isPromise */])(response)) {
          response.then(function (data) {
            if (data) {
              _this.readFile(data);
            } else {
              _this.readFile(files);
            }
          }).catch(this.resetInput);
          return;
        }
      }

      this.readFile(files);
    },
    readFile: function readFile(files) {
      var _this2 = this;

      var oversize = isOversize(files, this.maxSize);

      if (Array.isArray(files)) {
        var maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(function (file) {
          return utils_readFile(file, _this2.resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            var result = {
              file: file,
              status: '',
              message: ''
            };

            if (contents[index]) {
              result.content = contents[index];
            }

            return result;
          });

          _this2.onAfterRead(fileList, oversize);
        });
      } else {
        utils_readFile(files, this.resultType).then(function (content) {
          var result = {
            file: files,
            status: '',
            message: ''
          };

          if (content) {
            result.content = content;
          }

          _this2.onAfterRead(result, oversize);
        });
      }
    },
    onAfterRead: function onAfterRead(files, oversize) {
      var _this3 = this;

      this.resetInput();
      var validFiles = files;

      if (oversize) {
        var oversizeFiles = files;

        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach(function (item) {
            if (item.file) {
              if (isOversize(item.file, _this3.maxSize)) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }

        this.$emit('oversize', oversizeFiles, this.getDetail());
      }

      var isValidFiles = Array.isArray(validFiles) ? Boolean(validFiles.length) : Boolean(validFiles);

      if (isValidFiles) {
        this.$emit('input', [].concat(this.fileList, toArray(validFiles)));

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
      }
    },
    onDelete: function onDelete(file, index) {
      var _file$beforeDelete,
          _this4 = this;

      var beforeDelete = (_file$beforeDelete = file.beforeDelete) != null ? _file$beforeDelete : this.beforeDelete;

      if (beforeDelete) {
        var response = beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if (Object(utils["g" /* isPromise */])(response)) {
          response.then(function () {
            _this4.deleteFile(file, index);
          }).catch(utils["i" /* noop */]);
          return;
        }
      }

      this.deleteFile(file, index);
    },
    deleteFile: function deleteFile(file, index) {
      var fileList = this.fileList.slice(0);
      fileList.splice(index, 1);
      this.$emit('input', fileList);
      this.$emit('delete', file, this.getDetail(index));
    },
    resetInput: function resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },
    onClickUpload: function onClickUpload(event) {
      this.$emit('click-upload', event);
    },
    onPreviewImage: function onPreviewImage(item) {
      var _this5 = this;

      if (!this.previewFullImage) {
        return;
      }

      var imageFiles = this.fileList.filter(function (item) {
        return isImageFile(item);
      });
      var imageContents = imageFiles.map(function (item) {
        if (item.file && !item.url) {
          item.url = URL.createObjectURL(item.file);

          _this5.urls.push(item.url);
        }

        return item.url;
      });
      this.imagePreview = image_preview(_extends({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: function onClose() {
          _this5.$emit('close-preview');
        }
      }, this.previewOptions));
    },
    // @exposed-api
    closeImagePreview: function closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },
    // @exposed-api
    chooseFile: function chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */


      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },
    genPreviewMask: function genPreviewMask(item) {
      var h = this.$createElement;
      var status = item.status,
          message = item.message;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? h(es_icon, {
          "attrs": {
            "name": "close"
          },
          "class": uploader_bem('mask-icon')
        }) : h(es_loading, {
          "class": uploader_bem('loading')
        });
        var showMessage = Object(utils["c" /* isDef */])(message) && message !== '';
        return h("div", {
          "class": uploader_bem('mask')
        }, [MaskIcon, showMessage && h("div", {
          "class": uploader_bem('mask-message')
        }, [message])]);
      }
    },
    genPreviewItem: function genPreviewItem(item, index) {
      var _item$deletable,
          _this6 = this,
          _item$previewSize,
          _item$imageFit;

      var h = this.$createElement;
      var deleteAble = (_item$deletable = item.deletable) != null ? _item$deletable : this.deletable;
      var showDelete = item.status !== 'uploading' && deleteAble;
      var DeleteIcon = showDelete && h("div", {
        "class": uploader_bem('preview-delete'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();

            _this6.onDelete(item, index);
          }
        }
      }, [h(es_icon, {
        "attrs": {
          "name": "cross"
        },
        "class": uploader_bem('preview-delete-icon')
      })]);
      var PreviewCoverContent = this.slots('preview-cover', _extends({
        index: index
      }, item));
      var PreviewCover = PreviewCoverContent && h("div", {
        "class": uploader_bem('preview-cover')
      }, [PreviewCoverContent]);
      var previewSize = (_item$previewSize = item.previewSize) != null ? _item$previewSize : this.previewSize;
      var imageFit = (_item$imageFit = item.imageFit) != null ? _item$imageFit : this.imageFit;
      var Preview = isImageFile(item) ? h(es_image, {
        "attrs": {
          "fit": imageFit,
          "src": item.content || item.url,
          "width": previewSize,
          "height": previewSize,
          "lazyLoad": this.lazyLoad
        },
        "class": uploader_bem('preview-image'),
        "on": {
          "click": function click() {
            _this6.onPreviewImage(item);
          }
        }
      }, [PreviewCover]) : h("div", {
        "class": uploader_bem('file'),
        "style": {
          width: this.previewSizeWithUnit,
          height: this.previewSizeWithUnit
        }
      }, [h(es_icon, {
        "class": uploader_bem('file-icon'),
        "attrs": {
          "name": "description"
        }
      }), h("div", {
        "class": [uploader_bem('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), PreviewCover]);
      return h("div", {
        "class": uploader_bem('preview'),
        "on": {
          "click": function click() {
            _this6.$emit('click-preview', item, _this6.getDetail(index));
          }
        }
      }, [Preview, this.genPreviewMask(item), DeleteIcon]);
    },
    genPreviewList: function genPreviewList() {
      if (this.previewImage) {
        return this.fileList.map(this.genPreviewItem);
      }
    },
    genUpload: function genUpload() {
      var h = this.$createElement;

      if (this.fileList.length >= this.maxCount || !this.showUpload) {
        return;
      }

      var slot = this.slots();
      var Input = this.readonly ? null : h("input", {
        "attrs": _extends({}, this.$attrs, {
          "type": "file",
          "accept": this.accept,
          "disabled": this.disabled
        }),
        "ref": "input",
        "class": uploader_bem('input'),
        "on": {
          "change": this.onChange
        }
      });

      if (slot) {
        return h("div", {
          "class": uploader_bem('input-wrapper'),
          "key": "input-wrapper",
          "on": {
            "click": this.onClickUpload
          }
        }, [slot, Input]);
      }

      var style;

      if (this.previewSize) {
        var size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size
        };
      }

      return h("div", {
        "class": uploader_bem('upload', {
          readonly: this.readonly
        }),
        "style": style,
        "on": {
          "click": this.onClickUpload
        }
      }, [h(es_icon, {
        "attrs": {
          "name": this.uploadIcon
        },
        "class": uploader_bem('upload-icon')
      }), this.uploadText && h("span", {
        "class": uploader_bem('upload-text')
      }, [this.uploadText]), Input]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": uploader_bem()
    }, [h("div", {
      "class": uploader_bem('wrapper', {
        disabled: this.disabled
      })
    }, [this.genPreviewList(), this.genUpload()])]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuImgUploader.js
// Utils
 // Components


var SkuImgUploader_namespace = Object(create["a" /* createNamespace */])('sku-img-uploader');
var SkuImgUploader_createComponent = SkuImgUploader_namespace[0];
var SkuImgUploader_t = SkuImgUploader_namespace[2];
/* harmony default export */ var SkuImgUploader = (SkuImgUploader_createComponent({
  props: {
    value: String,
    uploadImg: Function,
    customUpload: Function,
    maxSize: {
      type: Number,
      default: 6
    }
  },
  data: function data() {
    return {
      fileList: []
    };
  },
  watch: {
    value: function value(val) {
      if (val) {
        this.fileList = [{
          url: val,
          isImage: true
        }];
      } else {
        this.fileList = [];
      }
    }
  },
  methods: {
    afterReadFile: function afterReadFile(file) {
      var _this = this;

      file.status = 'uploading';
      file.message = SkuImgUploader_t('uploading');
      this.uploadImg(file.file, file.content).then(function (img) {
        file.status = 'done';

        _this.$emit('input', img);
      }).catch(function () {
        file.status = 'failed';
        file.message = SkuImgUploader_t('fail');
      });
    },
    onOversize: function onOversize() {
      this.$toast(SkuImgUploader_t('oversize', this.maxSize));
    },
    onDelete: function onDelete() {
      this.$emit('input', '');
    },
    onClickUpload: function onClickUpload() {
      var _this2 = this;

      if (this.customUpload) {
        this.customUpload().then(function (url) {
          _this2.fileList.push({
            url: url
          });

          _this2.$emit('input', url);
        });
      }
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    return h(uploader, {
      "attrs": {
        "maxCount": 1,
        "readonly": !!this.customUpload,
        "maxSize": this.maxSize * 1024 * 1024,
        "afterRead": this.afterReadFile
      },
      "on": {
        "oversize": this.onOversize,
        "delete": this.onDelete,
        "click-upload": this.onClickUpload
      },
      "model": {
        value: _this3.fileList,
        callback: function callback($$v) {
          _this3.fileList = $$v;
        }
      }
    });
  }
}));
// CONCATENATED MODULE: ./es/sku/utils/time-helper.js
 // 字符串转 Date
// 只处理 YYYY-MM-DD 或者 YYYY-MM-DD HH:MM 格式

function stringToDate(timeString) {
  if (!timeString) {
    return null;
  }

  return new Date(timeString.replace(/-/g, '/'));
} // Date 转字符串
// type: date or datetime

function dateToString(date, type) {
  if (type === void 0) {
    type = 'date';
  }

  if (!date) {
    return '';
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var timeString = year + "-" + Object(string["b" /* padZero */])(month) + "-" + Object(string["b" /* padZero */])(day);

  if (type === 'datetime') {
    var hours = date.getHours();
    var minute = date.getMinutes();
    timeString += " " + Object(string["b" /* padZero */])(hours) + ":" + Object(string["b" /* padZero */])(minute);
  }

  return timeString;
}
// CONCATENATED MODULE: ./es/sku/components/SkuDateTimeField.js
// Utils

 // Components




var SkuDateTimeField_namespace = Object(create["a" /* createNamespace */])('sku-datetime-field');
var SkuDateTimeField_createComponent = SkuDateTimeField_namespace[0];
var SkuDateTimeField_t = SkuDateTimeField_namespace[2];
/* harmony default export */ var SkuDateTimeField = (SkuDateTimeField_createComponent({
  props: {
    value: String,
    label: String,
    required: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: 'date'
    }
  },
  data: function data() {
    return {
      showDatePicker: false,
      currentDate: this.type === 'time' ? '' : new Date(),
      minDate: new Date(new Date().getFullYear() - 60, 0, 1)
    };
  },
  watch: {
    value: function value(val) {
      switch (this.type) {
        case 'time':
          this.currentDate = val;
          break;

        case 'date':
        case 'datetime':
          this.currentDate = stringToDate(val) || new Date();
          break;
      }
    }
  },
  computed: {
    title: function title() {
      return SkuDateTimeField_t("title." + this.type);
    }
  },
  methods: {
    onClick: function onClick() {
      this.showDatePicker = true;
    },
    onConfirm: function onConfirm(val) {
      var data = val;

      if (this.type !== 'time') {
        data = dateToString(val, this.type);
      }

      this.$emit('input', data);
      this.showDatePicker = false;
    },
    onCancel: function onCancel() {
      this.showDatePicker = false;
    },
    formatter: function formatter(type, val) {
      var word = SkuDateTimeField_t("format." + type);
      return "" + val + word;
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h(es_field, {
      "attrs": {
        "readonly": true,
        "is-link": true,
        "center": true,
        "value": this.value,
        "label": this.label,
        "required": this.required,
        "placeholder": this.placeholder
      },
      "on": {
        "click": this.onClick
      }
    }, [h(popup, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "getContainer": "body"
      },
      "slot": "extra",
      "model": {
        value: _this.showDatePicker,
        callback: function callback($$v) {
          _this.showDatePicker = $$v;
        }
      }
    }, [h(datetime_picker, {
      "attrs": {
        "type": this.type,
        "title": this.title,
        "value": this.currentDate,
        "minDate": this.minDate,
        "formatter": this.formatter
      },
      "on": {
        "cancel": this.onCancel,
        "confirm": this.onConfirm
      }
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuMessages.js
// Utils


 // Components






var SkuMessages_createNamespace = Object(create["a" /* createNamespace */])('sku-messages'),
    SkuMessages_createComponent = SkuMessages_createNamespace[0],
    SkuMessages_bem = SkuMessages_createNamespace[1],
    SkuMessages_t = SkuMessages_createNamespace[2];

/* harmony default export */ var SkuMessages = (SkuMessages_createComponent({
  props: {
    messageConfig: Object,
    goodsId: [Number, String],
    messages: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      messageValues: this.resetMessageValues(this.messages)
    };
  },
  watch: {
    messages: function messages(val) {
      this.messageValues = this.resetMessageValues(val);
    }
  },
  methods: {
    resetMessageValues: function resetMessageValues(messages) {
      var messageConfig = this.messageConfig;
      var _messageConfig$initia = messageConfig.initialMessages,
          initialMessages = _messageConfig$initia === void 0 ? {} : _messageConfig$initia;
      return (messages || []).map(function (message) {
        return {
          value: initialMessages[message.name] || ''
        };
      });
    },
    getType: function getType(message) {
      if (+message.multiple === 1) {
        return 'textarea';
      }

      if (message.type === 'id_no') {
        return 'text';
      }

      return message.datetime > 0 ? 'datetime' : message.type;
    },
    getMessages: function getMessages() {
      var messages = {};
      this.messageValues.forEach(function (item, index) {
        messages["message_" + index] = item.value;
      });
      return messages;
    },
    getCartMessages: function getCartMessages() {
      var _this = this;

      var messages = {};
      this.messageValues.forEach(function (item, index) {
        var message = _this.messages[index];
        messages[message.name] = item.value;
      });
      return messages;
    },
    getPlaceholder: function getPlaceholder(message) {
      var type = +message.multiple === 1 ? 'textarea' : message.type;
      var map = this.messageConfig.placeholderMap || {};
      return message.placeholder || map[type] || SkuMessages_t("placeholder." + type);
    },
    validateMessages: function validateMessages() {
      var values = this.messageValues;

      for (var i = 0; i < values.length; i++) {
        var value = values[i].value;
        var message = this.messages[i];

        if (value === '') {
          // 必填字段的校验
          if (String(message.required) === '1') {
            var textType = SkuMessages_t(message.type === 'image' ? 'upload' : 'fill');
            return textType + message.name;
          }
        } else {
          if (message.type === 'tel' && !Object(number["b" /* isNumeric */])(value)) {
            return SkuMessages_t('invalid.tel');
          }

          if (message.type === 'mobile' && !/^\d{6,20}$/.test(value)) {
            return SkuMessages_t('invalid.mobile');
          }

          if (message.type === 'email' && !isEmail(value)) {
            return SkuMessages_t('invalid.email');
          }

          if (message.type === 'id_no' && (value.length < 15 || value.length > 18)) {
            return SkuMessages_t('invalid.id_no');
          }
        }
      }
    },

    /**
     * The phone number copied from IOS mobile phone address book
     * will add spaces and invisible Unicode characters
     * which cannot pass the /^\d+$/ verification
     * so keep numbers and dots
     */
    getFormatter: function getFormatter(message) {
      return function formatter(value) {
        if (message.type === 'mobile' || message.type === 'tel') {
          return value.replace(/[^\d.]/g, '');
        }

        return value;
      };
    },
    getExtraDesc: function getExtraDesc(message) {
      var h = this.$createElement;
      var extraDesc = message.extraDesc;

      if (extraDesc) {
        return h("div", {
          "class": SkuMessages_bem('extra-message')
        }, [extraDesc]);
      }
    },
    genMessage: function genMessage(message, index) {
      var _this2 = this;

      var h = this.$createElement;

      if (message.type === 'image') {
        return h(cell, {
          "key": this.goodsId + "-" + index,
          "attrs": {
            "title": message.name,
            "required": String(message.required) === '1',
            "valueClass": SkuMessages_bem('image-cell-value')
          },
          "class": SkuMessages_bem('image-cell')
        }, [h(SkuImgUploader, {
          "attrs": {
            "maxSize": this.messageConfig.uploadMaxSize,
            "uploadImg": this.messageConfig.uploadImg,
            "customUpload": this.messageConfig.customUpload
          },
          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            }
          }
        }), h("div", {
          "class": SkuMessages_bem('image-cell-label')
        }, [SkuMessages_t('imageLabel')])]);
      } // 时间和日期使用的vant选择器


      var isDateOrTime = ['date', 'time'].indexOf(message.type) > -1;

      if (isDateOrTime) {
        return h(SkuDateTimeField, {
          "attrs": {
            "label": message.name,
            "required": String(message.required) === '1',
            "placeholder": this.getPlaceholder(message),
            "type": this.getType(message)
          },
          "key": this.goodsId + "-" + index,
          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            }
          }
        });
      }

      return h("div", {
        "class": SkuMessages_bem('cell-block')
      }, [h(es_field, {
        "attrs": {
          "maxlength": "200",
          "center": !message.multiple,
          "label": message.name,
          "required": String(message.required) === '1',
          "placeholder": this.getPlaceholder(message),
          "type": this.getType(message),
          "formatter": this.getFormatter(message),
          "border": false
        },
        "key": this.goodsId + "-" + index,
        "model": {
          value: _this2.messageValues[index].value,
          callback: function callback($$v) {
            _this2.$set(_this2.messageValues[index], "value", $$v);
          }
        }
      }), this.getExtraDesc(message)]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": SkuMessages_bem()
    }, [this.messages.map(this.genMessage)]);
  }
}));
// CONCATENATED MODULE: ./es/sku/components/SkuActions.js
 // Utils


 // Components

 // Types

var SkuActions_createNamespace = Object(create["a" /* createNamespace */])('sku-actions'),
    SkuActions_createComponent = SkuActions_createNamespace[0],
    SkuActions_bem = SkuActions_createNamespace[1],
    SkuActions_t = SkuActions_createNamespace[2];

function SkuActions(h, props, slots, ctx) {
  var createEmitter = function createEmitter(name) {
    return function () {
      props.skuEventBus.$emit(name);
    };
  };

  return h("div", helper_default()([{
    "class": SkuActions_bem()
  }, inherit(ctx)]), [props.showAddCartBtn && h(es_button, {
    "attrs": {
      "size": "large",
      "type": "warning",
      "text": props.addCartText || SkuActions_t('addCart')
    },
    "on": {
      "click": createEmitter('sku:addCart')
    }
  }), h(es_button, {
    "attrs": {
      "size": "large",
      "type": "danger",
      "text": props.buyText || SkuActions_t('buy')
    },
    "on": {
      "click": createEmitter('sku:buy')
    }
  })]);
}

SkuActions.props = {
  buyText: String,
  addCartText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean
};
/* harmony default export */ var components_SkuActions = (SkuActions_createComponent(SkuActions));
// CONCATENATED MODULE: ./es/sku/Sku.js
















var Sku_namespace = Object(create["a" /* createNamespace */])('sku');
var Sku_createComponent = Sku_namespace[0],
    Sku_bem = Sku_namespace[1],
    Sku_t = Sku_namespace[2];
var Sku_QUOTA_LIMIT = LIMIT_TYPE.QUOTA_LIMIT;
/* harmony default export */ var Sku = (Sku_createComponent({
  props: {
    sku: Object,
    goods: Object,
    value: Boolean,
    buyText: String,
    goodsId: [Number, String],
    priceTag: String,
    lazyLoad: Boolean,
    hideStock: Boolean,
    properties: Array,
    addCartText: String,
    stepperTitle: String,
    getContainer: [String, Function],
    hideQuotaText: Boolean,
    hideSelectedText: Boolean,
    resetStepperOnHide: Boolean,
    customSkuValidator: Function,
    disableStepperInput: Boolean,
    resetSelectedSkuOnHide: Boolean,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    startSaleNum: {
      type: Number,
      default: 1
    },
    initialSku: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    stockThreshold: {
      type: Number,
      default: 50
    },
    showSoldoutSku: {
      type: Boolean,
      default: true
    },
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    disableSoldoutSku: {
      type: Boolean,
      default: true
    },
    customStepperConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    showHeaderImage: {
      type: Boolean,
      default: true
    },
    previewOnClickImage: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    bodyOffsetTop: {
      type: Number,
      default: 200
    },
    messageConfig: {
      type: Object,
      default: function _default() {
        return {
          initialMessages: {},
          placeholderMap: {},
          uploadImg: function uploadImg() {
            return Promise.resolve();
          },
          uploadMaxSize: 5
        };
      }
    }
  },
  data: function data() {
    return {
      selectedSku: {},
      selectedProp: {},
      selectedNum: 1,
      show: this.value
    };
  },
  watch: {
    show: function show(val) {
      this.$emit('input', val);

      if (!val) {
        this.$emit('sku-close', {
          selectedSkuValues: this.selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });

        if (this.resetStepperOnHide) {
          this.resetStepper();
        }

        if (this.resetSelectedSkuOnHide) {
          this.resetSelectedSku();
        }
      }
    },
    value: function value(val) {
      this.show = val;
    },
    skuTree: 'resetSelectedSku',
    initialSku: function initialSku() {
      this.resetStepper();
      this.resetSelectedSku();
    }
  },
  computed: {
    skuGroupClass: function skuGroupClass() {
      return ['van-sku-group-container', {
        'van-sku-group-container--hide-soldout': !this.showSoldoutSku
      }];
    },
    bodyStyle: function bodyStyle() {
      if (this.$isServer) {
        return;
      }

      var maxHeight = window.innerHeight - this.bodyOffsetTop;
      return {
        maxHeight: maxHeight + 'px'
      };
    },
    isSkuCombSelected: function isSkuCombSelected() {
      var _this = this; // SKU 未选完


      if (this.hasSku && !sku_helper_isAllSelected(this.skuTree, this.selectedSku)) {
        return false;
      } // 属性未全选


      return !this.propList.filter(function (i) {
        return i.is_necessary !== false;
      }).some(function (i) {
        return (_this.selectedProp[i.k_id] || []).length === 0;
      });
    },
    isSkuEmpty: function isSkuEmpty() {
      return Object.keys(this.sku).length === 0;
    },
    hasSku: function hasSku() {
      return !this.sku.none_sku;
    },
    hasSkuOrAttr: function hasSkuOrAttr() {
      return this.hasSku || this.propList.length > 0;
    },
    selectedSkuComb: function selectedSkuComb() {
      var skuComb = null;

      if (this.isSkuCombSelected) {
        if (this.hasSku) {
          skuComb = getSkuComb(this.skuList, this.selectedSku);
        } else {
          skuComb = {
            id: this.sku.collection_id,
            price: Math.round(this.sku.price * 100),
            stock_num: this.sku.stock_num
          };
        }

        if (skuComb) {
          skuComb.properties = sku_helper_getSelectedProperties(this.propList, this.selectedProp);
          skuComb.property_price = this.selectedPropValues.reduce(function (acc, cur) {
            return acc + (cur.price || 0);
          }, 0);
        }
      }

      return skuComb;
    },
    selectedSkuValues: function selectedSkuValues() {
      return sku_helper_getSelectedSkuValues(this.skuTree, this.selectedSku);
    },
    selectedPropValues: function selectedPropValues() {
      return sku_helper_getSelectedPropValues(this.propList, this.selectedProp);
    },
    price: function price() {
      if (this.selectedSkuComb) {
        return ((this.selectedSkuComb.price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      } // sku.price是一个格式化好的价格区间


      return this.sku.price;
    },
    originPrice: function originPrice() {
      if (this.selectedSkuComb && this.selectedSkuComb.origin_price) {
        return ((this.selectedSkuComb.origin_price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      }

      return this.sku.origin_price;
    },
    skuTree: function skuTree() {
      return this.sku.tree || [];
    },
    skuList: function skuList() {
      return this.sku.list || [];
    },
    propList: function propList() {
      return this.properties || [];
    },
    imageList: function imageList() {
      var imageList = [this.goods.picture];

      if (this.skuTree.length > 0) {
        this.skuTree.forEach(function (treeItem) {
          if (!treeItem.v) {
            return;
          }

          treeItem.v.forEach(function (vItem) {
            var imgUrl = vItem.previewImgUrl || vItem.imgUrl || vItem.img_url;

            if (imgUrl && imageList.indexOf(imgUrl) === -1) {
              imageList.push(imgUrl);
            }
          });
        });
      }

      return imageList;
    },
    stock: function stock() {
      var stockNum = this.customStepperConfig.stockNum;

      if (stockNum !== undefined) {
        return stockNum;
      }

      if (this.selectedSkuComb) {
        return this.selectedSkuComb.stock_num;
      }

      return this.sku.stock_num;
    },
    stockText: function stockText() {
      var h = this.$createElement;
      var stockFormatter = this.customStepperConfig.stockFormatter;

      if (stockFormatter) {
        return stockFormatter(this.stock);
      }

      return [Sku_t('stock') + " ", h("span", {
        "class": Sku_bem('stock-num', {
          highlight: this.stock < this.stockThreshold
        })
      }, [this.stock]), " " + Sku_t('stockUnit')];
    },
    selectedText: function selectedText() {
      var _this2 = this;

      if (this.selectedSkuComb) {
        var values = this.selectedSkuValues.concat(this.selectedPropValues);
        return Sku_t('selected') + " " + values.map(function (item) {
          return item.name;
        }).join(' ');
      }

      var unselectedSku = this.skuTree.filter(function (item) {
        return _this2.selectedSku[item.k_s] === UNSELECTED_SKU_VALUE_ID;
      }).map(function (item) {
        return item.k;
      });
      var unselectedProp = this.propList.filter(function (item) {
        return (_this2.selectedProp[item.k_id] || []).length < 1;
      }).map(function (item) {
        return item.k;
      });
      return Sku_t('select') + " " + unselectedSku.concat(unselectedProp).join(' ');
    }
  },
  created: function created() {
    var skuEventBus = new external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a();
    this.skuEventBus = skuEventBus;
    skuEventBus.$on('sku:select', this.onSelect);
    skuEventBus.$on('sku:propSelect', this.onPropSelect);
    skuEventBus.$on('sku:numChange', this.onNumChange);
    skuEventBus.$on('sku:previewImage', this.onPreviewImage);
    skuEventBus.$on('sku:overLimit', this.onOverLimit);
    skuEventBus.$on('sku:stepperState', this.onStepperState);
    skuEventBus.$on('sku:addCart', this.onAddCart);
    skuEventBus.$on('sku:buy', this.onBuy);
    this.resetStepper();
    this.resetSelectedSku(); // 组件初始化后的钩子，抛出skuEventBus

    this.$emit('after-sku-create', skuEventBus);
  },
  methods: {
    resetStepper: function resetStepper() {
      var skuStepper = this.$refs.skuStepper;
      var selectedNum = this.initialSku.selectedNum;
      var num = selectedNum != null ? selectedNum : this.startSaleNum; // 用来缓存不合法的情况

      this.stepperError = null;

      if (skuStepper) {
        skuStepper.setCurrentNum(num);
      } else {
        // 当首次加载（skuStepper 为空）时，传入数量如果不合法，可能会存在问题
        this.selectedNum = num;
      }
    },
    // @exposed-api
    resetSelectedSku: function resetSelectedSku() {
      var _this3 = this;

      this.selectedSku = {}; // 重置 selectedSku

      this.skuTree.forEach(function (item) {
        _this3.selectedSku[item.k_s] = UNSELECTED_SKU_VALUE_ID;
      });
      this.skuTree.forEach(function (item) {
        var key = item.k_s; // 规格值只有1个时，优先判断

        var valueId = item.v.length === 1 ? item.v[0].id : _this3.initialSku[key];

        if (valueId && sku_helper_isSkuChoosable(_this3.skuList, _this3.selectedSku, {
          key: key,
          valueId: valueId
        })) {
          _this3.selectedSku[key] = valueId;
        }
      });
      var skuValues = this.selectedSkuValues;

      if (skuValues.length > 0) {
        this.$nextTick(function () {
          _this3.$emit('sku-selected', {
            skuValue: skuValues[skuValues.length - 1],
            selectedSku: _this3.selectedSku,
            selectedSkuComb: _this3.selectedSkuComb
          });
        });
      } // 重置商品属性


      this.selectedProp = {};
      var _this$initialSku$sele = this.initialSku.selectedProp,
          selectedProp = _this$initialSku$sele === void 0 ? {} : _this$initialSku$sele; // 选中外部传入信息

      this.propList.forEach(function (item) {
        if (selectedProp[item.k_id]) {
          _this3.selectedProp[item.k_id] = selectedProp[item.k_id];
        }
      });

      if (Object(utils["d" /* isEmpty */])(this.selectedProp)) {
        this.propList.forEach(function (item) {
          var _item$v; // 没有加价的属性，默认选中第一个


          if ((item == null ? void 0 : (_item$v = item.v) == null ? void 0 : _item$v.length) > 0) {
            var v = item.v,
                k_id = item.k_id;
            var isHasConfigPrice = v.some(function (i) {
              return +i.price !== 0;
            });

            if (!isHasConfigPrice) {
              _this3.selectedProp[k_id] = [v[0].id];
            }
          }
        });
      }

      var propValues = this.selectedPropValues;

      if (propValues.length > 0) {
        this.$emit('sku-prop-selected', {
          propValue: propValues[propValues.length - 1],
          selectedProp: this.selectedProp,
          selectedSkuComb: this.selectedSkuComb
        });
      } // 抛出重置事件


      this.$emit('sku-reset', {
        selectedSku: this.selectedSku,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb
      });
      this.centerInitialSku();
    },
    getSkuMessages: function getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages: function getSkuCartMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getCartMessages() : {};
    },
    validateSkuMessages: function validateSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : '';
    },
    validateSku: function validateSku() {
      if (this.selectedNum === 0) {
        return Sku_t('unavailable');
      }

      if (this.isSkuCombSelected) {
        return this.validateSkuMessages();
      } // 自定义sku校验


      if (this.customSkuValidator) {
        var err = this.customSkuValidator(this);
        if (err) return err;
      }

      return Sku_t('selectSku');
    },
    onSelect: function onSelect(skuValue) {
      var _extends2, _extends3; // 点击已选中的sku时则取消选中


      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id ? _extends({}, this.selectedSku, (_extends2 = {}, _extends2[skuValue.skuKeyStr] = UNSELECTED_SKU_VALUE_ID, _extends2)) : _extends({}, this.selectedSku, (_extends3 = {}, _extends3[skuValue.skuKeyStr] = skuValue.id, _extends3));
      this.$emit('sku-selected', {
        skuValue: skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onPropSelect: function onPropSelect(propValue) {
      var _extends4;

      var arr = this.selectedProp[propValue.skuKeyStr] || [];
      var pos = arr.indexOf(propValue.id);

      if (pos > -1) {
        arr.splice(pos, 1);
      } else if (propValue.multiple) {
        arr.push(propValue.id);
      } else {
        arr.splice(0, 1, propValue.id);
      }

      this.selectedProp = _extends({}, this.selectedProp, (_extends4 = {}, _extends4[propValue.skuKeyStr] = arr, _extends4));
      this.$emit('sku-prop-selected', {
        propValue: propValue,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onNumChange: function onNumChange(num) {
      this.selectedNum = num;
    },
    onPreviewImage: function onPreviewImage(selectedValue) {
      var _this4 = this;

      var imageList = this.imageList;
      var index = 0;
      var indexImage = imageList[0];

      if (selectedValue && selectedValue.imgUrl) {
        this.imageList.some(function (image, pos) {
          if (image === selectedValue.imgUrl) {
            index = pos;
            return true;
          }

          return false;
        });
        indexImage = selectedValue.imgUrl;
      }

      var params = _extends({}, selectedValue, {
        index: index,
        imageList: this.imageList,
        indexImage: indexImage
      });

      this.$emit('open-preview', params);

      if (!this.previewOnClickImage) {
        return;
      }

      image_preview({
        images: this.imageList,
        startPosition: index,
        onClose: function onClose() {
          _this4.$emit('close-preview', params);
        }
      });
    },
    onOverLimit: function onOverLimit(data) {
      var action = data.action,
          limitType = data.limitType,
          quota = data.quota,
          quotaUsed = data.quotaUsed;
      var handleOverLimit = this.customStepperConfig.handleOverLimit;

      if (handleOverLimit) {
        handleOverLimit(data);
        return;
      }

      if (action === 'minus') {
        if (this.startSaleNum > 1) {
          es_toast(Sku_t('minusStartTip', this.startSaleNum));
        } else {
          es_toast(Sku_t('minusTip'));
        }
      } else if (action === 'plus') {
        if (limitType === Sku_QUOTA_LIMIT) {
          if (quotaUsed > 0) {
            es_toast(Sku_t('quotaUsedTip', quota, quotaUsed));
          } else {
            es_toast(Sku_t('quotaTip', quota));
          }
        } else {
          es_toast(Sku_t('soldout'));
        }
      }
    },
    onStepperState: function onStepperState(data) {
      this.stepperError = data.valid ? null : _extends({}, data, {
        action: 'plus'
      });
    },
    onAddCart: function onAddCart() {
      this.onBuyOrAddCart('add-cart');
    },
    onBuy: function onBuy() {
      this.onBuyOrAddCart('buy-clicked');
    },
    onBuyOrAddCart: function onBuyOrAddCart(type) {
      // sku 不符合购买条件
      if (this.stepperError) {
        return this.onOverLimit(this.stepperError);
      }

      var error = this.validateSku();

      if (error) {
        es_toast(error);
      } else {
        this.$emit(type, this.getSkuData());
      }
    },
    // @exposed-api
    getSkuData: function getSkuData() {
      return {
        goodsId: this.goodsId,
        messages: this.getSkuMessages(),
        selectedNum: this.selectedNum,
        cartMessages: this.getSkuCartMessages(),
        selectedSkuComb: this.selectedSkuComb
      };
    },
    // 当 popup 完全打开后执行
    onOpened: function onOpened() {
      this.centerInitialSku();
    },
    centerInitialSku: function centerInitialSku() {
      var _this5 = this;

      (this.$refs.skuRows || []).forEach(function (it) {
        var _ref = it.skuRow || {},
            k_s = _ref.k_s;

        it.centerItem(_this5.initialSku[k_s]);
      });
    }
  },
  render: function render() {
    var _this6 = this;

    var h = arguments[0];

    if (this.isSkuEmpty) {
      return;
    }

    var sku = this.sku,
        skuList = this.skuList,
        goods = this.goods,
        price = this.price,
        lazyLoad = this.lazyLoad,
        originPrice = this.originPrice,
        skuEventBus = this.skuEventBus,
        selectedSku = this.selectedSku,
        selectedProp = this.selectedProp,
        selectedNum = this.selectedNum,
        stepperTitle = this.stepperTitle,
        selectedSkuComb = this.selectedSkuComb,
        showHeaderImage = this.showHeaderImage,
        disableSoldoutSku = this.disableSoldoutSku;
    var slotsProps = {
      price: price,
      originPrice: originPrice,
      selectedNum: selectedNum,
      skuEventBus: skuEventBus,
      selectedSku: selectedSku,
      selectedSkuComb: selectedSkuComb
    };

    var slots = function slots(name) {
      return _this6.slots(name, slotsProps);
    };

    var Header = slots('sku-header') || h(components_SkuHeader, {
      "attrs": {
        "sku": sku,
        "goods": goods,
        "skuEventBus": skuEventBus,
        "selectedSku": selectedSku,
        "showHeaderImage": showHeaderImage
      }
    }, [h("template", {
      "slot": "sku-header-image-extra"
    }, [slots('sku-header-image-extra')]), slots('sku-header-price') || h("div", {
      "class": "van-sku__goods-price"
    }, [h("span", {
      "class": "van-sku__price-symbol"
    }, ["\uFFE5"]), h("span", {
      "class": "van-sku__price-num"
    }, [price]), this.priceTag && h("span", {
      "class": "van-sku__price-tag"
    }, [this.priceTag])]), slots('sku-header-origin-price') || originPrice && h(SkuHeaderItem, [Sku_t('originPrice'), " \uFFE5", originPrice]), !this.hideStock && h(SkuHeaderItem, [h("span", {
      "class": "van-sku__stock"
    }, [this.stockText])]), this.hasSkuOrAttr && !this.hideSelectedText && h(SkuHeaderItem, [this.selectedText]), slots('sku-header-extra')]);
    var Group = slots('sku-group') || this.hasSkuOrAttr && h("div", {
      "class": this.skuGroupClass
    }, [this.skuTree.map(function (skuTreeItem) {
      return h(SkuRow, {
        "attrs": {
          "skuRow": skuTreeItem
        },
        "ref": "skuRows",
        "refInFor": true
      }, [skuTreeItem.v.map(function (skuValue) {
        return h(SkuRowItem, {
          "attrs": {
            "skuList": skuList,
            "lazyLoad": lazyLoad,
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_s,
            "selectedSku": selectedSku,
            "skuEventBus": skuEventBus,
            "disableSoldoutSku": disableSoldoutSku,
            "largeImageMode": skuTreeItem.largeImageMode
          }
        });
      })]);
    }), this.propList.map(function (skuTreeItem) {
      return h(SkuRow, {
        "attrs": {
          "skuRow": skuTreeItem
        }
      }, [skuTreeItem.v.map(function (skuValue) {
        return h(SkuRowPropItem, {
          "attrs": {
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_id + '',
            "selectedProp": selectedProp,
            "skuEventBus": skuEventBus,
            "multiple": skuTreeItem.is_multiple
          }
        });
      })]);
    })]);
    var Stepper = slots('sku-stepper') || h(SkuStepper, {
      "ref": "skuStepper",
      "attrs": {
        "stock": this.stock,
        "quota": this.quota,
        "quotaUsed": this.quotaUsed,
        "startSaleNum": this.startSaleNum,
        "skuEventBus": skuEventBus,
        "selectedNum": selectedNum,
        "stepperTitle": stepperTitle,
        "skuStockNum": sku.stock_num,
        "disableStepperInput": this.disableStepperInput,
        "customStepperConfig": this.customStepperConfig,
        "hideQuotaText": this.hideQuotaText
      },
      "on": {
        "change": function change(event) {
          _this6.$emit('stepper-change', event);
        }
      }
    });
    var Messages = slots('sku-messages') || h(SkuMessages, {
      "ref": "skuMessages",
      "attrs": {
        "goodsId": this.goodsId,
        "messageConfig": this.messageConfig,
        "messages": sku.messages
      }
    });
    var Actions = slots('sku-actions') || h(components_SkuActions, {
      "attrs": {
        "buyText": this.buyText,
        "skuEventBus": skuEventBus,
        "addCartText": this.addCartText,
        "showAddCartBtn": this.showAddCartBtn
      }
    });
    return h(popup, {
      "attrs": {
        "round": true,
        "closeable": true,
        "position": "bottom",
        "getContainer": this.getContainer,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom
      },
      "class": "van-sku-container",
      "on": {
        "opened": this.onOpened
      },
      "model": {
        value: _this6.show,
        callback: function callback($$v) {
          _this6.show = $$v;
        }
      }
    }, [Header, h("div", {
      "class": "van-sku-body",
      "style": this.bodyStyle
    }, [slots('sku-body-top'), Group, slots('extra-sku-group'), Stepper, Messages]), slots('sku-actions-top'), Actions]);
  }
}));
// CONCATENATED MODULE: ./es/sku/index.js
// Utils


 // Components











locale["a" /* default */].add(lang);
Sku.SkuActions = components_SkuActions;
Sku.SkuHeader = components_SkuHeader;
Sku.SkuHeaderItem = SkuHeaderItem;
Sku.SkuMessages = SkuMessages;
Sku.SkuStepper = SkuStepper;
Sku.SkuRow = SkuRow;
Sku.SkuRowItem = SkuRowItem;
Sku.SkuRowPropItem = SkuRowPropItem;
Sku.skuHelper = sku_helper;
Sku.skuConstants = constants;
/* harmony default export */ var es_sku = (Sku);
// CONCATENATED MODULE: ./es/slider/index.js







var slider_createNamespace = Object(create["a" /* createNamespace */])('slider'),
    slider_createComponent = slider_createNamespace[0],
    slider_bem = slider_createNamespace[1];

var isSameValue = function isSameValue(newValue, oldValue) {
  return JSON.stringify(newValue) === JSON.stringify(oldValue);
};

/* harmony default export */ var slider = (slider_createComponent({
  mixins: [TouchMixin, FieldMixin],
  props: {
    disabled: Boolean,
    vertical: Boolean,
    range: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    value: {
      type: [Number, Array],
      default: 0
    }
  },
  data: function data() {
    return {
      dragStatus: ''
    };
  },
  computed: {
    scope: function scope() {
      return this.max - this.min;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size = Object(unit["a" /* addUnit */])(this.buttonSize);
        return {
          width: size,
          height: size
        };
      }
    }
  },
  created: function created() {
    // format initial value
    this.updateValue(this.value);
  },
  mounted: function mounted() {
    if (this.range) {
      this.bindTouchEvent(this.$refs.wrapper0);
      this.bindTouchEvent(this.$refs.wrapper1);
    } else {
      this.bindTouchEvent(this.$refs.wrapper);
    }
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.touchStart(event);
      this.currentValue = this.value;

      if (this.range) {
        this.startValue = this.value.map(this.format);
      } else {
        this.startValue = this.format(this.value);
      }

      this.dragStatus = 'start';
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      preventDefault(event, true);
      this.touchMove(event);
      this.dragStatus = 'draging';
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? this.deltaY : this.deltaX;
      var total = this.vertical ? rect.height : rect.width;
      var diff = delta / total * this.scope;

      if (this.range) {
        this.currentValue[this.index] = this.startValue[this.index] + diff;
      } else {
        this.currentValue = this.startValue + diff;
      }

      this.updateValue(this.currentValue);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'draging') {
        this.updateValue(this.currentValue, true);
        this.$emit('drag-end');
      }

      this.dragStatus = '';
    },
    onClick: function onClick(event) {
      event.stopPropagation();
      if (this.disabled) return;
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = this.vertical ? rect.height : rect.width;
      var value = +this.min + delta / total * this.scope;

      if (this.range) {
        var _this$value = this.value,
            left = _this$value[0],
            right = _this$value[1];
        var middle = (left + right) / 2;

        if (value <= middle) {
          left = value;
        } else {
          right = value;
        }

        value = [left, right];
      }

      this.startValue = this.value;
      this.updateValue(value, true);
    },
    // 处理两个滑块重叠之后的情况
    handleOverlap: function handleOverlap(value) {
      if (value[0] > value[1]) {
        value = deepClone(value);
        return value.reverse();
      }

      return value;
    },
    updateValue: function updateValue(value, end) {
      if (this.range) {
        value = this.handleOverlap(value).map(this.format);
      } else {
        value = this.format(value);
      }

      if (!isSameValue(value, this.value)) {
        this.$emit('input', value);
      }

      if (end && !isSameValue(value, this.startValue)) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      var min = +this.min;
      var max = +this.max;
      var step = +this.step;
      value = range(value, min, max);
      var diff = Math.round((value - min) / step) * step;
      return addNumber(min, diff);
    }
  },
  render: function render() {
    var _wrapperStyle,
        _this = this,
        _barStyle;

    var h = arguments[0];
    var vertical = this.vertical;
    var mainAxis = vertical ? 'height' : 'width';
    var crossAxis = vertical ? 'width' : 'height';
    var wrapperStyle = (_wrapperStyle = {
      background: this.inactiveColor
    }, _wrapperStyle[crossAxis] = Object(unit["a" /* addUnit */])(this.barHeight), _wrapperStyle); // 计算选中条的长度百分比

    var calcMainAxis = function calcMainAxis() {
      var value = _this.value,
          min = _this.min,
          range = _this.range,
          scope = _this.scope;

      if (range) {
        return (value[1] - value[0]) * 100 / scope + "%";
      }

      return (value - min) * 100 / scope + "%";
    }; // 计算选中条的开始位置的偏移量


    var calcOffset = function calcOffset() {
      var value = _this.value,
          min = _this.min,
          range = _this.range,
          scope = _this.scope;

      if (range) {
        return (value[0] - min) * 100 / scope + "%";
      }

      return null;
    };

    var barStyle = (_barStyle = {}, _barStyle[mainAxis] = calcMainAxis(), _barStyle.left = this.vertical ? null : calcOffset(), _barStyle.top = this.vertical ? calcOffset() : null, _barStyle.background = this.activeColor, _barStyle);

    if (this.dragStatus) {
      barStyle.transition = 'none';
    }

    var renderButton = function renderButton(i) {
      var map = ['left', 'right'];
      var isNumber = typeof i === 'number';
      var current = isNumber ? _this.value[i] : _this.value;

      var getClassName = function getClassName() {
        if (isNumber) {
          return "button-wrapper-" + map[i];
        }

        return "button-wrapper";
      };

      var getRefName = function getRefName() {
        if (isNumber) {
          return "wrapper" + i;
        }

        return "wrapper";
      };

      var renderButtonContent = function renderButtonContent() {
        if (isNumber) {
          var slot = _this.slots(i === 0 ? 'left-button' : 'right-button', {
            value: current
          });

          if (slot) {
            return slot;
          }
        }

        if (_this.slots('button')) {
          return _this.slots('button');
        }

        return h("div", {
          "class": slider_bem('button'),
          "style": _this.buttonStyle
        });
      };

      return h("div", {
        "ref": getRefName(),
        "attrs": {
          "role": "slider",
          "tabindex": _this.disabled ? -1 : 0,
          "aria-valuemin": _this.min,
          "aria-valuenow": _this.value,
          "aria-valuemax": _this.max,
          "aria-orientation": _this.vertical ? 'vertical' : 'horizontal'
        },
        "class": slider_bem(getClassName()),
        "on": {
          "touchstart": function touchstart() {
            if (isNumber) {
              // 保存当前按钮的索引
              _this.index = i;
            }
          },
          "click": function click(e) {
            return e.stopPropagation();
          }
        }
      }, [renderButtonContent()]);
    };

    return h("div", {
      "style": wrapperStyle,
      "class": slider_bem({
        disabled: this.disabled,
        vertical: vertical
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": slider_bem('bar'),
      "style": barStyle
    }, [this.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
}));
// CONCATENATED MODULE: ./es/step/index.js





var step_createNamespace = Object(create["a" /* createNamespace */])('step'),
    step_createComponent = step_createNamespace[0],
    step_bem = step_createNamespace[1];

/* harmony default export */ var es_step = (step_createComponent({
  mixins: [ChildrenMixin('vanSteps')],
  computed: {
    status: function status() {
      if (this.index < this.parent.active) {
        return 'finish';
      }

      if (this.index === +this.parent.active) {
        return 'process';
      }
    },
    active: function active() {
      return this.status === 'process';
    },
    lineStyle: function lineStyle() {
      var _this$parent = this.parent,
          activeColor = _this$parent.activeColor,
          inactiveColor = _this$parent.inactiveColor,
          center = _this$parent.center,
          direction = _this$parent.direction;
      var style = {
        background: this.status === 'finish' ? activeColor : inactiveColor
      };

      if (center && direction === 'vertical') {
        style.top = '50%';
      }

      return style;
    },
    circleContainerStyle: function circleContainerStyle() {
      if (this.parent.center && this.parent.direction === 'vertical') {
        return {
          top: '50%'
        };
      }
    },
    titleStyle: function titleStyle() {
      if (this.active) {
        return {
          color: this.parent.activeColor
        };
      }

      if (!this.status) {
        return {
          color: this.parent.inactiveColor
        };
      }
    }
  },
  methods: {
    genCircle: function genCircle() {
      var h = this.$createElement;
      var _this$parent2 = this.parent,
          activeIcon = _this$parent2.activeIcon,
          iconPrefix = _this$parent2.iconPrefix,
          activeColor = _this$parent2.activeColor,
          finishIcon = _this$parent2.finishIcon,
          inactiveIcon = _this$parent2.inactiveIcon;

      if (this.active) {
        return this.slots('active-icon') || h(es_icon, {
          "class": step_bem('icon', 'active'),
          "attrs": {
            "name": activeIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }
        });
      }

      var finishIconSlot = this.slots('finish-icon');

      if (this.status === 'finish' && (finishIcon || finishIconSlot)) {
        return finishIconSlot || h(es_icon, {
          "class": step_bem('icon', 'finish'),
          "attrs": {
            "name": finishIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }
        });
      }

      var inactiveIconSlot = this.slots('inactive-icon');

      if (inactiveIcon || inactiveIconSlot) {
        return inactiveIconSlot || h(es_icon, {
          "class": step_bem('icon'),
          "attrs": {
            "name": inactiveIcon,
            "classPrefix": iconPrefix
          }
        });
      }

      return h("i", {
        "class": step_bem('circle'),
        "style": this.lineStyle
      });
    },
    onClickStep: function onClickStep() {
      this.parent.$emit('click-step', this.index);
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var status = this.status,
        active = this.active;
    var direction = this.parent.direction;
    return h("div", {
      "class": [BORDER, step_bem([direction, (_ref = {}, _ref[status] = status, _ref)])]
    }, [h("div", {
      "class": step_bem('title', {
        active: active
      }),
      "style": this.titleStyle,
      "on": {
        "click": this.onClickStep
      }
    }, [this.slots()]), h("div", {
      "class": step_bem('circle-container'),
      "on": {
        "click": this.onClickStep
      },
      "style": this.circleContainerStyle
    }, [this.genCircle()]), h("div", {
      "class": step_bem('line'),
      "style": this.lineStyle
    })]);
  }
}));
// CONCATENATED MODULE: ./es/steps/index.js



var steps_createNamespace = Object(create["a" /* createNamespace */])('steps'),
    steps_createComponent = steps_createNamespace[0],
    steps_bem = steps_createNamespace[1];

/* harmony default export */ var steps = (steps_createComponent({
  mixins: [ParentMixin('vanSteps')],
  props: {
    center: Boolean,
    iconPrefix: String,
    finishIcon: String,
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeIcon: {
      type: String,
      default: 'checked'
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": steps_bem([this.direction])
    }, [h("div", {
      "class": steps_bem('items')
    }, [this.slots()])]);
  }
}));
// CONCATENATED MODULE: ./es/submit-bar/index.js
 // Utils


 // Components


 // Types

var submit_bar_createNamespace = Object(create["a" /* createNamespace */])('submit-bar'),
    submit_bar_createComponent = submit_bar_createNamespace[0],
    submit_bar_bem = submit_bar_createNamespace[1],
    submit_bar_t = submit_bar_createNamespace[2];

function SubmitBar(h, props, slots, ctx) {
  var tip = props.tip,
      price = props.price,
      tipIcon = props.tipIcon;

  function Text() {
    if (typeof price === 'number') {
      var priceArr = (price / 100).toFixed(props.decimalLength).split('.');
      var decimalStr = props.decimalLength ? "." + priceArr[1] : '';
      return h("div", {
        "style": {
          textAlign: props.textAlign ? props.textAlign : ''
        },
        "class": submit_bar_bem('text')
      }, [h("span", [props.label || submit_bar_t('label')]), h("span", {
        "class": submit_bar_bem('price')
      }, [props.currency, h("span", {
        "class": submit_bar_bem('price', 'integer')
      }, [priceArr[0]]), decimalStr]), props.suffixLabel && h("span", {
        "class": submit_bar_bem('suffix-label')
      }, [props.suffixLabel])]);
    }
  }

  function Tip() {
    if (slots.tip || tip) {
      return h("div", {
        "class": submit_bar_bem('tip')
      }, [tipIcon && h(es_icon, {
        "class": submit_bar_bem('tip-icon'),
        "attrs": {
          "name": tipIcon
        }
      }), tip && h("span", {
        "class": submit_bar_bem('tip-text')
      }, [tip]), slots.tip && slots.tip()]);
    }
  }

  return h("div", helper_default()([{
    "class": submit_bar_bem({
      unfit: !props.safeAreaInsetBottom
    })
  }, inherit(ctx)]), [slots.top && slots.top(), Tip(), h("div", {
    "class": submit_bar_bem('bar')
  }, [slots.default && slots.default(), Text(), slots.button ? slots.button() : h(es_button, {
    "attrs": {
      "round": true,
      "type": props.buttonType,
      "text": props.loading ? '' : props.buttonText,
      "color": props.buttonColor,
      "loading": props.loading,
      "disabled": props.disabled
    },
    "class": submit_bar_bem('button', props.buttonType),
    "on": {
      "click": function click() {
        functional_emit(ctx, 'submit');
      }
    }
  })])]);
}

SubmitBar.props = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonColor: String,
  suffixLabel: String,
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  decimalLength: {
    type: [Number, String],
    default: 2
  },
  currency: {
    type: String,
    default: '¥'
  },
  buttonType: {
    type: String,
    default: 'danger'
  }
};
/* harmony default export */ var submit_bar = (submit_bar_createComponent(SubmitBar));
// CONCATENATED MODULE: ./es/swipe-cell/index.js
// Utils


 // Mixins




var swipe_cell_createNamespace = Object(create["a" /* createNamespace */])('swipe-cell'),
    swipe_cell_createComponent = swipe_cell_createNamespace[0],
    swipe_cell_bem = swipe_cell_createNamespace[1];

var THRESHOLD = 0.15;
/* harmony default export */ var swipe_cell = (swipe_cell_createComponent({
  mixins: [TouchMixin, click_outside_ClickOutsideMixin({
    event: 'touchstart',
    method: 'onClick'
  })],
  props: {
    // @deprecated
    // should be removed in next major version, use beforeClose instead
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: ''
    }
  },
  data: function data() {
    return {
      offset: 0,
      dragging: false
    };
  },
  computed: {
    computedLeftWidth: function computedLeftWidth() {
      return +this.leftWidth || this.getWidthByRef('left');
    },
    computedRightWidth: function computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef('right');
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    getWidthByRef: function getWidthByRef(ref) {
      if (this.$refs[ref]) {
        var rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },
    // @exposed-api
    open: function open(position) {
      var offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.opened = true;
      this.offset = offset;
      this.$emit('open', {
        position: position,
        name: this.name,
        // @deprecated
        // should be removed in next major version
        detail: this.name
      });
    },
    // @exposed-api
    close: function close(position) {
      this.offset = 0;

      if (this.opened) {
        this.opened = false;
        this.$emit('close', {
          position: position,
          name: this.name
        });
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;
        var isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.offset = range(this.deltaX + this.startOffset, -this.computedRightWidth, this.computedLeftWidth);
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false; // compatible with desktop scenario

        setTimeout(function () {
          _this.lockClick = false;
        }, 0);
      }
    },
    toggle: function toggle(direction) {
      var offset = Math.abs(this.offset);
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      var computedLeftWidth = this.computedLeftWidth,
          computedRightWidth = this.computedRightWidth;

      if (computedRightWidth && direction === 'right' && offset > computedRightWidth * threshold) {
        this.open('right');
      } else if (computedLeftWidth && direction === 'left' && offset > computedLeftWidth * threshold) {
        this.open('left');
      } else {
        this.close();
      }
    },
    onClick: function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      this.$emit('click', position);

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position: position,
            name: this.name,
            instance: this
          });
        } else if (this.onClose) {
          this.onClose(position, this, {
            name: this.name
          });
        } else {
          this.close(position);
        }
      }
    },
    getClickHandler: function getClickHandler(position, stop) {
      var _this2 = this;

      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        _this2.onClick(position);
      };
    },
    genLeftPart: function genLeftPart() {
      var h = this.$createElement;
      var content = this.slots('left');

      if (content) {
        return h("div", {
          "ref": "left",
          "class": swipe_cell_bem('left'),
          "on": {
            "click": this.getClickHandler('left', true)
          }
        }, [content]);
      }
    },
    genRightPart: function genRightPart() {
      var h = this.$createElement;
      var content = this.slots('right');

      if (content) {
        return h("div", {
          "ref": "right",
          "class": swipe_cell_bem('right'),
          "on": {
            "click": this.getClickHandler('right', true)
          }
        }, [content]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? '0s' : '.6s'
    };
    return h("div", {
      "class": swipe_cell_bem(),
      "on": {
        "click": this.getClickHandler('cell')
      }
    }, [h("div", {
      "class": swipe_cell_bem('wrapper'),
      "style": wrapperStyle
    }, [this.genLeftPart(), this.slots(), this.genRightPart()])]);
  }
}));
// CONCATENATED MODULE: ./es/switch-cell/index.js

 // Utils


 // Components



 // Types

var switch_cell_createNamespace = Object(create["a" /* createNamespace */])('switch-cell'),
    switch_cell_createComponent = switch_cell_createNamespace[0],
    switch_cell_bem = switch_cell_createNamespace[1];

function SwitchCell(h, props, slots, ctx) {
  if (false) {}

  return h(cell, helper_default()([{
    "attrs": {
      "center": true,
      "size": props.cellSize,
      "title": props.title,
      "border": props.border
    },
    "class": switch_cell_bem([props.cellSize])
  }, inherit(ctx)]), [h(es_switch, {
    "props": _extends({}, props),
    "on": _extends({}, ctx.listeners)
  })]);
}

SwitchCell.props = _extends({}, switchProps, {
  title: String,
  cellSize: String,
  border: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: '24px'
  }
});
/* harmony default export */ var switch_cell = (switch_cell_createComponent(SwitchCell));
// CONCATENATED MODULE: ./es/tabbar/index.js





var tabbar_createNamespace = Object(create["a" /* createNamespace */])('tabbar'),
    tabbar_createComponent = tabbar_createNamespace[0],
    tabbar_bem = tabbar_createNamespace[1];

/* harmony default export */ var tabbar = (tabbar_createComponent({
  mixins: [ParentMixin('vanTabbar')],
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },
  data: function data() {
    return {
      height: null
    };
  },
  computed: {
    fit: function fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      } // enable safe-area-inset-bottom by default when fixed


      return this.fixed;
    }
  },
  watch: {
    value: 'setActiveItem',
    children: 'setActiveItem'
  },
  mounted: function mounted() {
    var _this = this;

    if (this.placeholder && this.fixed) {
      var setHeight = function setHeight() {
        _this.height = _this.$refs.tabbar.getBoundingClientRect().height;
      };

      setHeight(); // https://github.com/youzan/vant/issues/10131

      setTimeout(setHeight, 100);
    }
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this2 = this;

      this.children.forEach(function (item, index) {
        item.nameMatched = item.name === _this2.value || index === _this2.value;
      });
    },
    triggerChange: function triggerChange(active, afterChange) {
      var _this3 = this;

      callInterceptor({
        interceptor: this.beforeChange,
        args: [active],
        done: function done() {
          _this3.$emit('input', active);

          _this3.$emit('change', active);

          afterChange();
        }
      });
    },
    genTabbar: function genTabbar() {
      var _ref;

      var h = this.$createElement;
      return h("div", {
        "ref": "tabbar",
        "style": {
          zIndex: this.zIndex
        },
        "class": [(_ref = {}, _ref[BORDER_TOP_BOTTOM] = this.border, _ref), tabbar_bem({
          unfit: !this.fit,
          fixed: this.fixed
        })]
      }, [this.slots()]);
    }
  },
  render: function render() {
    var h = arguments[0];

    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": tabbar_bem('placeholder'),
        "style": {
          height: this.height + "px"
        }
      }, [this.genTabbar()]);
    }

    return this.genTabbar();
  }
}));
// CONCATENATED MODULE: ./es/tabbar-item/index.js
 // Utils


 // Mixins

 // Components




var tabbar_item_createNamespace = Object(create["a" /* createNamespace */])('tabbar-item'),
    tabbar_item_createComponent = tabbar_item_createNamespace[0],
    tabbar_item_bem = tabbar_item_createNamespace[1];

/* harmony default export */ var tabbar_item = (tabbar_item_createComponent({
  mixins: [ChildrenMixin('vanTabbar')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  data: function data() {
    return {
      nameMatched: false
    };
  },
  computed: {
    active: function active() {
      var routeMode = this.parent.route;

      if (routeMode && '$route' in this) {
        var to = this.to,
            $route = this.$route;
        var config = Object(utils["f" /* isObject */])(to) ? to : {
          path: to
        };
        return !!$route.matched.find(function (r) {
          // vue-router 3.x $route.matched[0].path is empty in / and its children paths
          var path = r.path === '' ? '/' : r.path;
          var pathMatched = config.path === path;
          var nameMatched = Object(utils["c" /* isDef */])(config.name) && config.name === r.name;
          return pathMatched || nameMatched;
        });
      }

      return this.nameMatched;
    }
  },
  methods: {
    onClick: function onClick(event) {
      var _this = this;

      if (!this.active) {
        this.parent.triggerChange(this.name || this.index, function () {
          route(_this.$router, _this);
        });
      }

      this.$emit('click', event);
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var slot = this.slots('icon', {
        active: this.active
      });

      if (slot) {
        return slot;
      }

      if (this.icon) {
        return h(es_icon, {
          "attrs": {
            "name": this.icon,
            "classPrefix": this.iconPrefix
          }
        });
      }
    }
  },
  render: function render() {
    var _this$badge;

    var h = arguments[0];
    var active = this.active;
    var color = this.parent[active ? 'activeColor' : 'inactiveColor'];

    if (false) {}

    return h("div", {
      "class": tabbar_item_bem({
        active: active
      }),
      "style": {
        color: color
      },
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": tabbar_item_bem('icon')
    }, [this.genIcon(), h(es_info, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info
      }
    })]), h("div", {
      "class": tabbar_item_bem('text')
    }, [this.slots('default', {
      active: active
    })])]);
  }
}));
// CONCATENATED MODULE: ./es/tree-select/index.js
 // Utils


 // Components



 // Types

var tree_select_createNamespace = Object(create["a" /* createNamespace */])('tree-select'),
    tree_select_createComponent = tree_select_createNamespace[0],
    tree_select_bem = tree_select_createNamespace[1];

function TreeSelect(h, props, slots, ctx) {
  var items = props.items,
      height = props.height,
      activeId = props.activeId,
      selectedIcon = props.selectedIcon,
      mainActiveIndex = props.mainActiveIndex;

  if (false) {}

  var selectedItem = items[+mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  var isMultiple = Array.isArray(activeId);

  function isActiveItem(id) {
    return isMultiple ? activeId.indexOf(id) !== -1 : activeId === id;
  }

  var Navs = items.map(function (item) {
    var _item$badge;

    return h(sidebar_item, {
      "attrs": {
        "dot": item.dot,
        "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
        "title": item.text,
        "disabled": item.disabled
      },
      "class": [tree_select_bem('nav-item'), item.className]
    });
  });

  function Content() {
    if (slots.content) {
      return slots.content();
    }

    return subItems.map(function (item) {
      return h("div", {
        "key": item.id,
        "class": ['van-ellipsis', tree_select_bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "on": {
          "click": function click() {
            if (!item.disabled) {
              var newActiveId = item.id;

              if (isMultiple) {
                newActiveId = activeId.slice();
                var index = newActiveId.indexOf(item.id);

                if (index !== -1) {
                  newActiveId.splice(index, 1);
                } else if (newActiveId.length < props.max) {
                  newActiveId.push(item.id);
                }
              }

              functional_emit(ctx, 'update:active-id', newActiveId);
              functional_emit(ctx, 'click-item', item); // compatible with legacy usage, should be removed in next major version

              functional_emit(ctx, 'itemclick', item);
            }
          }
        }
      }, [item.text, isActiveItem(item.id) && h(es_icon, {
        "attrs": {
          "name": selectedIcon
        },
        "class": tree_select_bem('selected')
      })]);
    });
  }

  return h("div", helper_default()([{
    "class": tree_select_bem(),
    "style": {
      height: Object(unit["a" /* addUnit */])(height)
    }
  }, inherit(ctx)]), [h(sidebar, {
    "class": tree_select_bem('nav'),
    "attrs": {
      "activeKey": mainActiveIndex
    },
    "on": {
      "change": function change(index) {
        functional_emit(ctx, 'update:main-active-index', index);
        functional_emit(ctx, 'click-nav', index); // compatible with legacy usage, should be removed in next major version

        functional_emit(ctx, 'navclick', index);
      }
    }
  }, [Navs]), h("div", {
    "class": tree_select_bem('content')
  }, [Content()])]);
}

TreeSelect.props = {
  max: {
    type: [Number, String],
    default: Infinity
  },
  items: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  height: {
    type: [Number, String],
    default: 300
  },
  activeId: {
    type: [Number, String, Array],
    default: 0
  },
  selectedIcon: {
    type: String,
    default: 'success'
  },
  mainActiveIndex: {
    type: [Number, String],
    default: 0
  }
};
/* harmony default export */ var tree_select = (tree_select_createComponent(TreeSelect));
// CONCATENATED MODULE: ./es/index.js

























































































var version = '2.12.48';

function install(Vue) {
  var components = [action_sheet, address_edit, address_list, es_area, badge, es_button, calendar, card, cascader, cell, cell_group, es_checkbox, checkbox_group, circle, col, collapse, collapse_item, contact_card, contact_edit, contact_list, count_down, es_coupon, coupon_cell, coupon_list, datetime_picker, dialog, divider, dropdown_item, dropdown_menu, empty, es_field, es_form, goods_action, goods_action_button, goods_action_icon, grid, grid_item, es_icon, es_image, image_preview, index_anchor, index_bar, es_info, es_list, es_loading, locale["a" /* default */], nav_bar, notice_bar, notify, number_keyboard, es_overlay, pagination, panel, password_input, es_picker, popover, popup, es_progress, pull_refresh, es_radio, radio_group, es_rate, row, search, share_sheet, sidebar, sidebar_item, skeleton, es_sku, slider, es_step, stepper, steps, es_sticky, submit_bar, swipe, swipe_cell, swipe_item, es_switch, switch_cell, tab, tabbar, tabbar_item, tabs, es_tag, es_toast, tree_select, uploader];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


/* harmony default export */ var es = __webpack_exports__["default"] = ({
  install: install,
  version: version
});

/***/ })
/******/ ]);
});