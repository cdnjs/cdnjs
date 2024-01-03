(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("react-dom")) : typeof define === "function" && define.amd ? define(["exports", "react", "react-dom"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.antdMobile = {}, global2.React, global2.ReactDOM));
})(this, function(exports2, React$1, ReactDOM) {
  "use strict";
  function _interopNamespaceDefault(e2) {
    const n2 = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e2) {
      for (const k in e2) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e2, k);
          Object.defineProperty(n2, k, d.get ? d : {
            enumerable: true,
            get: () => e2[k]
          });
        }
      }
    }
    n2.default = e2;
    return Object.freeze(n2);
  }
  const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React$1);
  const ReactDOM__namespace = /* @__PURE__ */ _interopNamespaceDefault(ReactDOM);
  const canUseDom$1 = !!(typeof window !== "undefined" && typeof document !== "undefined" && window.document && window.document.createElement);
  if (canUseDom$1) {
    document.addEventListener("touchstart", () => {
    }, true);
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s = arguments[i2];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e2) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i2 = 0, p = Object.getOwnPropertySymbols(s); i2 < p.length; i2++) {
        if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i2]))
          t[p[i2]] = s[p[i2]];
      }
    return t;
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n2) {
      return function(v) {
        return step([n2, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e2) {
          op = [6, e2];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i2 >= o.length)
            o = void 0;
          return { value: o && o[i2++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n2) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i2 = m.call(o), r, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r = i2.next()).done)
        ar.push(r.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r && !r.done && (m = i2["return"]))
          m.call(i2);
      } finally {
        if (e2)
          throw e2.error;
      }
    }
    return ar;
  }
  function __spreadArray(to2, from, pack) {
    if (pack || arguments.length === 2)
      for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
        if (ar || !(i2 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
        }
      }
    return to2.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e2 = new Error(message);
    return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
  };
  function mergeLocale(base2, patch) {
    function merge2(a, b) {
      if (typeof a !== "object" || typeof b !== "object" || Array.isArray(a) || Array.isArray(b)) {
        return b !== void 0 ? b : a;
      }
      const result = {};
      for (const key in a) {
        if (a.hasOwnProperty(key)) {
          result[key] = merge2(a[key], b[key]);
        }
      }
      return result;
    }
    return merge2(base2, patch);
  }
  const typeTemplate$2 = "${label} is not a valid ${type}";
  const base = {
    locale: "en",
    common: {
      confirm: "Confirm",
      cancel: "Cancel",
      loading: "Loading",
      close: "Close"
    },
    Calendar: {
      title: "Date selection",
      confirm: "Confirm",
      start: "start",
      end: "end",
      today: "today",
      markItems: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      yearAndMonth: "${year}/${month}"
    },
    Cascader: {
      placeholder: "Selecting"
    },
    Dialog: {
      ok: "OK"
    },
    DatePicker: {
      tillNow: "Till Now"
    },
    ErrorBlock: {
      default: {
        title: "Oops, something went wrong",
        description: "Please wait a minute and try again"
      },
      busy: {
        title: "Oops, not loading",
        description: "Try to refresh the page"
      },
      disconnected: {
        title: "Network is busy",
        description: "Try to refresh the page"
      },
      empty: {
        title: "Hmm, couldn't find that...",
        description: "Want to try a new search?"
      }
    },
    Form: {
      required: "Required",
      optional: "Optional",
      defaultValidateMessages: {
        default: "Field validation error for ${label}",
        required: "Please enter ${label}",
        enum: "${label} must be one of [${enum}]",
        whitespace: "${label} cannot be a blank character",
        date: {
          format: "${label} date format is invalid",
          parse: "${label} cannot be converted to a date",
          invalid: "${label} is an invalid date"
        },
        types: {
          string: typeTemplate$2,
          method: typeTemplate$2,
          array: typeTemplate$2,
          object: typeTemplate$2,
          number: typeTemplate$2,
          date: typeTemplate$2,
          boolean: typeTemplate$2,
          integer: typeTemplate$2,
          float: typeTemplate$2,
          regexp: typeTemplate$2,
          email: typeTemplate$2,
          url: typeTemplate$2,
          hex: typeTemplate$2
        },
        string: {
          len: "${label} must be ${len} characters",
          min: "${label} must be at least ${min} characters",
          max: "${label} must be up to ${max} characters",
          range: "${label} must be between ${min}-${max} characters"
        },
        number: {
          len: "${label} must be equal to ${len}",
          min: "${label} must be minimum ${min}",
          max: "${label} must be maximum ${max}",
          range: "${label} must be between ${min}-${max}"
        },
        array: {
          len: "Must be ${len} ${label}",
          min: "At least ${min} ${label}",
          max: "At most ${max} ${label}",
          range: "The amount of ${label} must be between ${min}-${max}"
        },
        pattern: {
          mismatch: "${label} does not match the pattern ${pattern}"
        }
      }
    },
    ImageUploader: {
      uploading: "Uploading...",
      upload: "Upload"
    },
    InfiniteScroll: {
      noMore: "No more",
      failedToLoad: "Failed to load",
      retry: "Retry"
    },
    Input: {
      clear: "clear"
    },
    Mask: {
      name: "Mask"
    },
    Modal: {
      ok: "OK"
    },
    PasscodeInput: {
      name: "Passcode Input"
    },
    PullToRefresh: {
      pulling: "Scroll down to refresh",
      canRelease: "Release to refresh immediately",
      complete: "Refresh successful"
    },
    SearchBar: {
      name: "Search Bar"
    },
    Slider: {
      name: "Slider"
    },
    Stepper: {
      decrease: "decrease",
      increase: "increase"
    },
    Switch: {
      name: "Switch"
    },
    Selector: {
      name: "Selector"
    }
  };
  const typeTemplate$1 = "${label}不是一个有效的${type}";
  const zhCN = mergeLocale(base, {
    locale: "zh-CH",
    common: {
      confirm: "确定",
      cancel: "取消",
      loading: "加载中",
      close: "关闭"
    },
    Calendar: {
      title: "日期选择",
      confirm: "确认",
      start: "开始",
      end: "结束",
      today: "今日",
      markItems: ["一", "二", "三", "四", "五", "六", "日"],
      yearAndMonth: "${year}年${month}月"
    },
    Cascader: {
      placeholder: "请选择"
    },
    Dialog: {
      ok: "我知道了"
    },
    DatePicker: {
      tillNow: "至今"
    },
    ErrorBlock: {
      default: {
        title: "页面遇到一些小问题",
        description: "待会来试试"
      },
      busy: {
        title: "前方拥堵",
        description: "刷新试试"
      },
      disconnected: {
        title: "网络有点忙",
        description: "动动手指帮忙修复"
      },
      empty: {
        title: "没有找到你需要的东西",
        description: "找找其他的吧"
      }
    },
    Form: {
      required: "必填",
      optional: "选填",
      defaultValidateMessages: {
        default: "字段验证错误${label}",
        required: "请输入${label}",
        enum: "${label}必须是其中一个[${enum}]",
        whitespace: "${label}不能为空字符",
        date: {
          format: "${label}日期格式无效",
          parse: "${label}不能转换为日期",
          invalid: "${label}是一个无效日期"
        },
        types: {
          string: typeTemplate$1,
          method: typeTemplate$1,
          array: typeTemplate$1,
          object: typeTemplate$1,
          number: typeTemplate$1,
          date: typeTemplate$1,
          boolean: typeTemplate$1,
          integer: typeTemplate$1,
          float: typeTemplate$1,
          regexp: typeTemplate$1,
          email: typeTemplate$1,
          url: typeTemplate$1,
          hex: typeTemplate$1
        },
        string: {
          len: "${label}须为${len}个字符",
          min: "${label}最少${min}个字符",
          max: "${label}最多${max}个字符",
          range: "${label}须在${min}-${max}字符之间"
        },
        number: {
          len: "${label}必须等于${len}",
          min: "${label}最小值为${min}",
          max: "${label}最大值为${max}",
          range: "${label}须在${min}-${max}之间"
        },
        array: {
          len: "须为${len}个${label}",
          min: "最少${min}个${label}",
          max: "最多${max}个${label}",
          range: "${label}数量须在${min}-${max}之间"
        },
        pattern: {
          mismatch: "${label}与模式不匹配${pattern}"
        }
      }
    },
    ImageUploader: {
      uploading: "上传中...",
      upload: "上传"
    },
    InfiniteScroll: {
      noMore: "没有更多了",
      failedToLoad: "加载失败",
      retry: "重新加载"
    },
    Input: {
      clear: "清除"
    },
    Mask: {
      name: "背景蒙层"
    },
    Modal: {
      ok: "我知道了"
    },
    PasscodeInput: {
      name: "密码输入框"
    },
    PullToRefresh: {
      pulling: "下拉刷新",
      canRelease: "释放立即刷新",
      complete: "刷新成功"
    },
    SearchBar: {
      name: "搜索框"
    },
    Slider: {
      name: "滑动输入条"
    },
    Stepper: {
      decrease: "减少",
      increase: "增加"
    },
    Switch: {
      name: "开关"
    },
    Selector: {
      name: "选择组"
    }
  });
  const zhCN$1 = zhCN;
  const defaultConfigRef = {
    current: {
      locale: zhCN$1
    }
  };
  function setDefaultConfig(config2) {
    defaultConfigRef.current = config2;
  }
  function getDefaultConfig() {
    return defaultConfigRef.current;
  }
  const ConfigContext = React$1.createContext(null);
  const ConfigProvider = (props) => {
    const {
      children
    } = props, config2 = __rest(props, ["children"]);
    const parentConfig = useConfig();
    return React$1.createElement(ConfigContext.Provider, {
      value: Object.assign(Object.assign({}, parentConfig), config2)
    }, children);
  };
  function useConfig() {
    var _a;
    return (_a = React$1.useContext(ConfigContext)) !== null && _a !== void 0 ? _a : getDefaultConfig();
  }
  function attachPropertiesToComponent(component, properties) {
    const ret = component;
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        ret[key] = properties[key];
      }
    }
    return ret;
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var classnames = { exports: {} };
  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
  (function(module2) {
    (function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames2() {
        var classes = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames2.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (module2.exports) {
        classNames2.default = classNames2;
        module2.exports = classNames2;
      } else {
        window.classNames = classNames2;
      }
    })();
  })(classnames);
  var classnamesExports = classnames.exports;
  const classNames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
  function withNativeProps(props, element) {
    const p = Object.assign({}, element.props);
    if (props.className) {
      p.className = classNames(element.props.className, props.className);
    }
    if (props.style) {
      p.style = Object.assign(Object.assign({}, p.style), props.style);
    }
    if (props.tabIndex !== void 0) {
      p.tabIndex = props.tabIndex;
    }
    for (const key in props) {
      if (!props.hasOwnProperty(key))
        continue;
      if (key.startsWith("data-") || key.startsWith("aria-")) {
        p[key] = props[key];
      }
    }
    return React$1.cloneElement(element, p);
  }
  var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal$1;
  var freeGlobal = _freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root$9 = freeGlobal || freeSelf || Function("return this")();
  var _root = root$9;
  var root$8 = _root;
  var Symbol$4 = root$8.Symbol;
  var _Symbol = Symbol$4;
  var Symbol$3 = _Symbol;
  var objectProto$e = Object.prototype;
  var hasOwnProperty$b = objectProto$e.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$e.toString;
  var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e2) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var _getRawTag = getRawTag$1;
  var objectProto$d = Object.prototype;
  var nativeObjectToString = objectProto$d.toString;
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }
  var _objectToString = objectToString$1;
  var Symbol$2 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag$6(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  var _baseGetTag = baseGetTag$6;
  function isObject$b(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_1 = isObject$b;
  var baseGetTag$5 = _baseGetTag, isObject$a = isObject_1;
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$4(value) {
    if (!isObject$a(value)) {
      return false;
    }
    var tag = baseGetTag$5(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_1 = isFunction$4;
  var root$7 = _root;
  var coreJsData$1 = root$7["__core-js_shared__"];
  var _coreJsData = coreJsData$1;
  var coreJsData = _coreJsData;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked$1(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var _isMasked = isMasked$1;
  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource$2(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e2) {
      }
    }
    return "";
  }
  var _toSource = toSource$2;
  var isFunction$3 = isFunction_1, isMasked = _isMasked, isObject$9 = isObject_1, toSource$1 = _toSource;
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype, objectProto$c = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative$1(value) {
    if (!isObject$9(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$3(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource$1(value));
  }
  var _baseIsNative = baseIsNative$1;
  function getValue$3(object, key) {
    return object == null ? void 0 : object[key];
  }
  var _getValue = getValue$3;
  var baseIsNative = _baseIsNative, getValue$2 = _getValue;
  function getNative$7(object, key) {
    var value = getValue$2(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var _getNative = getNative$7;
  var getNative$6 = _getNative;
  var defineProperty$2 = function() {
    try {
      var func = getNative$6(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e2) {
    }
  }();
  var _defineProperty$2 = defineProperty$2;
  var defineProperty$1 = _defineProperty$2;
  function baseAssignValue$3(object, key, value) {
    if (key == "__proto__" && defineProperty$1) {
      defineProperty$1(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var _baseAssignValue = baseAssignValue$3;
  function eq$5(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_1 = eq$5;
  var baseAssignValue$2 = _baseAssignValue, eq$4 = eq_1;
  var objectProto$b = Object.prototype;
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
  function assignValue$1(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$9.call(object, key) && eq$4(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue$2(object, key, value);
    }
  }
  var _assignValue = assignValue$1;
  var assignValue = _assignValue, baseAssignValue$1 = _baseAssignValue;
  function copyObject$2(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue$1(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  var _copyObject = copyObject$2;
  function identity$3(value) {
    return value;
  }
  var identity_1 = identity$3;
  function apply$2(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  var _apply = apply$2;
  var apply$1 = _apply;
  var nativeMax$1 = Math.max;
  function overRest$1(func, start2, transform) {
    start2 = nativeMax$1(start2 === void 0 ? func.length - 1 : start2, 0);
    return function() {
      var args = arguments, index2 = -1, length = nativeMax$1(args.length - start2, 0), array = Array(length);
      while (++index2 < length) {
        array[index2] = args[start2 + index2];
      }
      index2 = -1;
      var otherArgs = Array(start2 + 1);
      while (++index2 < start2) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start2] = transform(array);
      return apply$1(func, this, otherArgs);
    };
  }
  var _overRest = overRest$1;
  function constant$1(value) {
    return function() {
      return value;
    };
  }
  var constant_1 = constant$1;
  var constant = constant_1, defineProperty = _defineProperty$2, identity$2 = identity_1;
  var baseSetToString$1 = !defineProperty ? identity$2 : function(func, string2) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string2),
      "writable": true
    });
  };
  var _baseSetToString = baseSetToString$1;
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut$1(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  var _shortOut = shortOut$1;
  var baseSetToString = _baseSetToString, shortOut = _shortOut;
  var setToString$1 = shortOut(baseSetToString);
  var _setToString = setToString$1;
  var identity$1 = identity_1, overRest = _overRest, setToString = _setToString;
  function baseRest$1(func, start2) {
    return setToString(overRest(func, start2, identity$1), func + "");
  }
  var _baseRest = baseRest$1;
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  function isLength$2(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }
  var isLength_1 = isLength$2;
  var isFunction$2 = isFunction_1, isLength$1 = isLength_1;
  function isArrayLike$4(value) {
    return value != null && isLength$1(value.length) && !isFunction$2(value);
  }
  var isArrayLike_1 = isArrayLike$4;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex$2(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var _isIndex = isIndex$2;
  var eq$3 = eq_1, isArrayLike$3 = isArrayLike_1, isIndex$1 = _isIndex, isObject$8 = isObject_1;
  function isIterateeCall$1(value, index2, object) {
    if (!isObject$8(object)) {
      return false;
    }
    var type = typeof index2;
    if (type == "number" ? isArrayLike$3(object) && isIndex$1(index2, object.length) : type == "string" && index2 in object) {
      return eq$3(object[index2], value);
    }
    return false;
  }
  var _isIterateeCall = isIterateeCall$1;
  var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
  function createAssigner$2(assigner) {
    return baseRest(function(object, sources) {
      var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index2 < length) {
        var source = sources[index2];
        if (source) {
          assigner(object, source, index2, customizer);
        }
      }
      return object;
    });
  }
  var _createAssigner = createAssigner$2;
  function baseTimes$1(n2, iteratee) {
    var index2 = -1, result = Array(n2);
    while (++index2 < n2) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  var _baseTimes = baseTimes$1;
  function isObjectLike$7(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_1 = isObjectLike$7;
  var baseGetTag$4 = _baseGetTag, isObjectLike$6 = isObjectLike_1;
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments$1(value) {
    return isObjectLike$6(value) && baseGetTag$4(value) == argsTag$2;
  }
  var _baseIsArguments = baseIsArguments$1;
  var baseIsArguments = _baseIsArguments, isObjectLike$5 = isObjectLike_1;
  var objectProto$a = Object.prototype;
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
  var isArguments$2 = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike$5(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  var isArguments_1 = isArguments$2;
  var isArray$4 = Array.isArray;
  var isArray_1 = isArray$4;
  var isBuffer$3 = { exports: {} };
  function stubFalse() {
    return false;
  }
  var stubFalse_1 = stubFalse;
  isBuffer$3.exports;
  (function(module2, exports3) {
    var root2 = _root, stubFalse2 = stubFalse_1;
    var freeExports = exports3 && !exports3.nodeType && exports3;
    var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root2.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse2;
    module2.exports = isBuffer2;
  })(isBuffer$3, isBuffer$3.exports);
  var isBufferExports = isBuffer$3.exports;
  var baseGetTag$3 = _baseGetTag, isLength = isLength_1, isObjectLike$4 = isObjectLike_1;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
  function baseIsTypedArray$1(value) {
    return isObjectLike$4(value) && isLength(value.length) && !!typedArrayTags[baseGetTag$3(value)];
  }
  var _baseIsTypedArray = baseIsTypedArray$1;
  function baseUnary$1(func) {
    return function(value) {
      return func(value);
    };
  }
  var _baseUnary = baseUnary$1;
  var _nodeUtil = { exports: {} };
  _nodeUtil.exports;
  (function(module2, exports3) {
    var freeGlobal2 = _freeGlobal;
    var freeExports = exports3 && !exports3.nodeType && exports3;
    var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal2.process;
    var nodeUtil2 = function() {
      try {
        var types2 = freeModule && freeModule.require && freeModule.require("util").types;
        if (types2) {
          return types2;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    module2.exports = nodeUtil2;
  })(_nodeUtil, _nodeUtil.exports);
  var _nodeUtilExports = _nodeUtil.exports;
  var baseIsTypedArray = _baseIsTypedArray, baseUnary = _baseUnary, nodeUtil = _nodeUtilExports;
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray$3 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var isTypedArray_1 = isTypedArray$3;
  var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$3 = isArray_1, isBuffer$2 = isBufferExports, isIndex = _isIndex, isTypedArray$2 = isTypedArray_1;
  var objectProto$9 = Object.prototype;
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  function arrayLikeKeys$2(value, inherited) {
    var isArr = isArray$3(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var _arrayLikeKeys = arrayLikeKeys$2;
  var objectProto$8 = Object.prototype;
  function isPrototype$3(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
    return value === proto;
  }
  var _isPrototype = isPrototype$3;
  function overArg$2(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var _overArg = overArg$2;
  var overArg$1 = _overArg;
  var nativeKeys$1 = overArg$1(Object.keys, Object);
  var _nativeKeys = nativeKeys$1;
  var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  function baseKeys$1(object) {
    if (!isPrototype$2(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var _baseKeys = baseKeys$1;
  var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$2 = isArrayLike_1;
  function keys$2(object) {
    return isArrayLike$2(object) ? arrayLikeKeys$1(object) : baseKeys(object);
  }
  var keys_1 = keys$2;
  var copyObject$1 = _copyObject, createAssigner$1 = _createAssigner, keys$1 = keys_1;
  var assignWith = createAssigner$1(function(object, source, srcIndex, customizer) {
    copyObject$1(source, keys$1(source), object, customizer);
  });
  var assignWith_1 = assignWith;
  const assignWith$1 = /* @__PURE__ */ getDefaultExportFromCjs(assignWith_1);
  function mergeProps(...items) {
    function customizer(objValue, srcValue) {
      return srcValue === void 0 ? objValue : srcValue;
    }
    let ret = Object.assign({}, items[0]);
    for (let i2 = 1; i2 < items.length; i2++) {
      ret = assignWith$1(ret, items[i2], customizer);
    }
    return ret;
  }
  var createUpdateEffect = function(hook) {
    return function(effect, deps) {
      var isMounted = React$1.useRef(false);
      hook(function() {
        return function() {
          isMounted.current = false;
        };
      }, []);
      hook(function() {
        if (!isMounted.current) {
          isMounted.current = true;
        } else {
          return effect();
        }
      }, deps);
    };
  };
  var isFunction$1 = function(value) {
    return typeof value === "function";
  };
  var isNumber = function(value) {
    return typeof value === "number";
  };
  var isDev = true;
  const isDev$1 = isDev;
  function useMemoizedFn(fn) {
    if (isDev$1) {
      if (!isFunction$1(fn)) {
        console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof fn));
      }
    }
    var fnRef = React$1.useRef(fn);
    fnRef.current = React$1.useMemo(function() {
      return fn;
    }, [fn]);
    var memoizedFn = React$1.useRef();
    if (!memoizedFn.current) {
      memoizedFn.current = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fnRef.current.apply(this, args);
      };
    }
    return memoizedFn.current;
  }
  const useUpdateEffect = createUpdateEffect(React$1.useEffect);
  function depsAreSame(oldDeps, deps) {
    if (oldDeps === deps)
      return true;
    for (var i2 = 0; i2 < oldDeps.length; i2++) {
      if (!Object.is(oldDeps[i2], deps[i2]))
        return false;
    }
    return true;
  }
  function useLatest(value) {
    var ref = React$1.useRef(value);
    ref.current = value;
    return ref;
  }
  var useUnmount = function(fn) {
    if (isDev$1) {
      if (!isFunction$1(fn)) {
        console.error("useUnmount expected parameter is a function, got ".concat(typeof fn));
      }
    }
    var fnRef = useLatest(fn);
    React$1.useEffect(function() {
      return function() {
        fnRef.current();
      };
    }, []);
  };
  const useUnmount$1 = useUnmount;
  var root$6 = _root;
  var now$1 = function() {
    return root$6.Date.now();
  };
  var now_1 = now$1;
  var reWhitespace = /\s/;
  function trimmedEndIndex$1(string2) {
    var index2 = string2.length;
    while (index2-- && reWhitespace.test(string2.charAt(index2))) {
    }
    return index2;
  }
  var _trimmedEndIndex = trimmedEndIndex$1;
  var trimmedEndIndex = _trimmedEndIndex;
  var reTrimStart = /^\s+/;
  function baseTrim$1(string2) {
    return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
  }
  var _baseTrim = baseTrim$1;
  var baseGetTag$2 = _baseGetTag, isObjectLike$3 = isObjectLike_1;
  var symbolTag$1 = "[object Symbol]";
  function isSymbol$1(value) {
    return typeof value == "symbol" || isObjectLike$3(value) && baseGetTag$2(value) == symbolTag$1;
  }
  var isSymbol_1 = isSymbol$1;
  var baseTrim = _baseTrim, isObject$7 = isObject_1, isSymbol = isSymbol_1;
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber$1(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$7(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$7(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_1 = toNumber$1;
  var isObject$6 = isObject_1, now = now_1, toNumber = toNumber_1;
  var FUNC_ERROR_TEXT$2 = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce$1(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$2);
    }
    wait = toNumber(wait) || 0;
    if (isObject$6(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush2() {
      return timerId === void 0 ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush2;
    return debounced;
  }
  var debounce_1 = debounce$1;
  const debounce$2 = /* @__PURE__ */ getDefaultExportFromCjs(debounce_1);
  var isBrowser$2 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  const isBrowser$3 = isBrowser$2;
  var debounce = debounce_1, isObject$5 = isObject_1;
  var FUNC_ERROR_TEXT$1 = "Expected a function";
  function throttle$1(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    if (isObject$5(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      "leading": leading,
      "maxWait": wait,
      "trailing": trailing
    });
  }
  var throttle_1 = throttle$1;
  const throttle$2 = /* @__PURE__ */ getDefaultExportFromCjs(throttle_1);
  var useMount = function(fn) {
    if (isDev$1) {
      if (!isFunction$1(fn)) {
        console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof fn, '".'));
      }
    }
    React$1.useEffect(function() {
      fn === null || fn === void 0 ? void 0 : fn();
    }, []);
  };
  const useMount$1 = useMount;
  var useUpdate = function() {
    var _a = __read(React$1.useState({}), 2), setState = _a[1];
    return React$1.useCallback(function() {
      return setState({});
    }, []);
  };
  const useUpdate$1 = useUpdate;
  function getTargetElement(target, defaultElement) {
    if (!isBrowser$3) {
      return void 0;
    }
    if (!target) {
      return defaultElement;
    }
    var targetElement;
    if (isFunction$1(target)) {
      targetElement = target();
    } else if ("current" in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    return targetElement;
  }
  var checkIfAllInShadow = function(targets) {
    return targets.every(function(item) {
      var targetElement = getTargetElement(item);
      if (!targetElement)
        return false;
      if (targetElement.getRootNode() instanceof ShadowRoot)
        return true;
    });
  };
  var getShadow = function(node) {
    if (!node) {
      return document;
    }
    return node.getRootNode();
  };
  var getDocumentOrShadow = function(target) {
    if (!target || !document.getRootNode) {
      return document;
    }
    var targets = Array.isArray(target) ? target : [target];
    if (checkIfAllInShadow(targets)) {
      return getShadow(getTargetElement(targets[0]));
    }
    return document;
  };
  const getDocumentOrShadow$1 = getDocumentOrShadow;
  var createEffectWithTarget = function(useEffectType) {
    var useEffectWithTarget2 = function(effect, deps, target) {
      var hasInitRef = React$1.useRef(false);
      var lastElementRef = React$1.useRef([]);
      var lastDepsRef = React$1.useRef([]);
      var unLoadRef = React$1.useRef();
      useEffectType(function() {
        var _a;
        var targets = Array.isArray(target) ? target : [target];
        var els = targets.map(function(item) {
          return getTargetElement(item);
        });
        if (!hasInitRef.current) {
          hasInitRef.current = true;
          lastElementRef.current = els;
          lastDepsRef.current = deps;
          unLoadRef.current = effect();
          return;
        }
        if (els.length !== lastElementRef.current.length || !depsAreSame(els, lastElementRef.current) || !depsAreSame(deps, lastDepsRef.current)) {
          (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
          lastElementRef.current = els;
          lastDepsRef.current = deps;
          unLoadRef.current = effect();
        }
      });
      useUnmount$1(function() {
        var _a;
        (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
        hasInitRef.current = false;
      });
    };
    return useEffectWithTarget2;
  };
  const createEffectWithTarget$1 = createEffectWithTarget;
  var useEffectWithTarget$1 = createEffectWithTarget$1(React$1.useEffect);
  const useEffectWithTarget$2 = useEffectWithTarget$1;
  function useClickAway(onClickAway, target, eventName) {
    if (eventName === void 0) {
      eventName = "click";
    }
    var onClickAwayRef = useLatest(onClickAway);
    useEffectWithTarget$2(function() {
      var handler = function(event) {
        var targets = Array.isArray(target) ? target : [target];
        if (targets.some(function(item) {
          var targetElement = getTargetElement(item);
          return !targetElement || targetElement.contains(event.target);
        })) {
          return;
        }
        onClickAwayRef.current(event);
      };
      var documentOrShadow = getDocumentOrShadow$1(target);
      var eventNames = Array.isArray(eventName) ? eventName : [eventName];
      eventNames.forEach(function(event) {
        return documentOrShadow.addEventListener(event, handler);
      });
      return function() {
        eventNames.forEach(function(event) {
          return documentOrShadow.removeEventListener(event, handler);
        });
      };
    }, Array.isArray(eventName) ? eventName : [eventName], target);
  }
  var dayjs_min = { exports: {} };
  (function(module2, exports3) {
    !function(t, e2) {
      module2.exports = e2();
    }(commonjsGlobal, function() {
      var t = 1e3, e2 = 6e4, n2 = 36e5, r = "millisecond", i2 = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e3 = ["th", "st", "nd", "rd"], n3 = t2 % 100;
        return "[" + t2 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
      } }, m = function(t2, e3, n3) {
        var r2 = String(t2);
        return !r2 || r2.length >= e3 ? t2 : "" + Array(e3 + 1 - r2.length).join(n3) + t2;
      }, v = { s: m, z: function(t2) {
        var e3 = -t2.utcOffset(), n3 = Math.abs(e3), r2 = Math.floor(n3 / 60), i3 = n3 % 60;
        return (e3 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i3, 2, "0");
      }, m: function t2(e3, n3) {
        if (e3.date() < n3.date())
          return -t2(n3, e3);
        var r2 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r2, c), s2 = n3 - i3 < 0, u2 = e3.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n3 - i3) / (s2 ? i3 - u2 : u2 - i3)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i2, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = function(t2) {
        return t2 instanceof b;
      }, S = function t2(e3, n3, r2) {
        var i3;
        if (!e3)
          return g;
        if ("string" == typeof e3) {
          var s2 = e3.toLowerCase();
          D[s2] && (i3 = s2), n3 && (D[s2] = n3, i3 = s2);
          var u2 = e3.split("-");
          if (!i3 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e3.name;
          D[a2] = e3, i3 = a2;
        }
        return !r2 && i3 && (g = i3), i3 || !r2 && g;
      }, w = function(t2, e3) {
        if (p(t2))
          return t2.clone();
        var n3 = "object" == typeof e3 ? e3 : {};
        return n3.date = t2, n3.args = arguments, new b(n3);
      }, O = v;
      O.l = S, O.i = p, O.w = function(t2, e3) {
        return w(t2, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var b = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e3 = t3.date, n3 = t3.utc;
            if (null === e3)
              return /* @__PURE__ */ new Date(NaN);
            if (O.u(e3))
              return /* @__PURE__ */ new Date();
            if (e3 instanceof Date)
              return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r2 = e3.match($);
              if (r2) {
                var i3 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e3);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e3) {
          var n3 = w(t2);
          return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
        }, m2.isAfter = function(t2, e3) {
          return w(t2) < this.startOf(e3);
        }, m2.isBefore = function(t2, e3) {
          return this.endOf(e3) < w(t2);
        }, m2.$g = function(t2, e3, n3) {
          return O.u(t2) ? this[e3] : this.set(n3, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e3) {
          var n3 = this, r2 = !!O.u(e3) || e3, f2 = O.p(t2), l2 = function(t3, e4) {
            var i3 = O.w(n3.$u ? Date.UTC(n3.$y, e4, t3) : new Date(n3.$y, e4, t3), n3);
            return r2 ? i3 : i3.endOf(a);
          }, $2 = function(t3, e4) {
            return O.w(n3.toDate()[t3].apply(n3.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i2:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e3) {
          var n3, o2 = O.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n3 = {}, n3[a] = f2 + "Date", n3[d] = f2 + "Date", n3[c] = f2 + "Month", n3[h] = f2 + "FullYear", n3[u] = f2 + "Hours", n3[s] = f2 + "Minutes", n3[i2] = f2 + "Seconds", n3[r] = f2 + "Milliseconds", n3)[o2], $2 = o2 === a ? this.$D + (e3 - this.$W) : e3;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e3) {
          return this.clone().$set(t2, e3);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = O.p(f2), y2 = function(t2) {
            var e3 = w(l2);
            return O.w(e3.date(e3.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c)
            return this.set(c, this.$M + r2);
          if ($2 === h)
            return this.set(h, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e2, d2[u] = n2, d2[i2] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e3) {
          return this.add(-1 * t2, e3);
        }, m2.format = function(t2) {
          var e3 = this, n3 = this.$locale();
          if (!this.isValid())
            return n3.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i3 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n3.weekdays, c6 = n3.months, f2 = n3.meridiem, h2 = function(t3, n4, i4, s3) {
            return t3 && (t3[n4] || t3(e3, r2)) || i4[n4].slice(0, s3);
          }, d2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e4, n4) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n4 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return O.s(e3.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return O.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n3.monthsShort, a2, c6, 3);
                case "MMMM":
                  return h2(c6, a2);
                case "D":
                  return e3.$D;
                case "DD":
                  return O.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h2(n3.weekdaysMin, e3.$W, o2, 2);
                case "ddd":
                  return h2(n3.weekdaysShort, e3.$W, o2, 3);
                case "dddd":
                  return o2[e3.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return O.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return O.s(u2, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return O.s(e3.$s, 2, "0");
                case "SSS":
                  return O.s(e3.$ms, 3, "0");
                case "Z":
                  return i3;
              }
              return null;
            }(t3) || i3.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e2, g2 = this - m3, D2 = function() {
            return O.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n2;
              break;
            case s:
              $2 = g2 / e2;
              break;
            case i2:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : O.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e3) {
          if (!t2)
            return this.$L;
          var n3 = this.clone(), r2 = S(t2, e3, true);
          return r2 && (n3.$L = r2), n3;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), _ = b.prototype;
      return w.prototype = _, [["$ms", r], ["$s", i2], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        _[t2[1]] = function(e3) {
          return this.$g(e3, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e3) {
        return t2.$i || (t2(e3, b, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[g], w.Ls = D, w.p = {}, w;
    });
  })(dayjs_min);
  var dayjs_minExports = dayjs_min.exports;
  const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
  function useDebounceFn(fn, options) {
    var _a;
    if (isDev$1) {
      if (!isFunction$1(fn)) {
        console.error("useDebounceFn expected parameter is a function, got ".concat(typeof fn));
      }
    }
    var fnRef = useLatest(fn);
    var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1e3;
    var debounced = React$1.useMemo(function() {
      return debounce$2(function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fnRef.current.apply(fnRef, __spreadArray([], __read(args), false));
      }, wait, options);
    }, []);
    useUnmount$1(function() {
      debounced.cancel();
    });
    return {
      run: debounced,
      cancel: debounced.cancel,
      flush: debounced.flush
    };
  }
  function useDebounceEffect(effect, deps, options) {
    var _a = __read(React$1.useState({}), 2), flag = _a[0], setFlag = _a[1];
    var run = useDebounceFn(function() {
      setFlag({});
    }, options).run;
    React$1.useEffect(function() {
      return run();
    }, deps);
    useUpdateEffect(effect, [flag]);
  }
  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }
  var _listCacheClear = listCacheClear$1;
  var eq$2 = eq_1;
  function assocIndexOf$4(array, key) {
    var length = array.length;
    while (length--) {
      if (eq$2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var _assocIndexOf = assocIndexOf$4;
  var assocIndexOf$3 = _assocIndexOf;
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete$1(key) {
    var data = this.__data__, index2 = assocIndexOf$3(data, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index2 == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index2, 1);
    }
    --this.size;
    return true;
  }
  var _listCacheDelete = listCacheDelete$1;
  var assocIndexOf$2 = _assocIndexOf;
  function listCacheGet$1(key) {
    var data = this.__data__, index2 = assocIndexOf$2(data, key);
    return index2 < 0 ? void 0 : data[index2][1];
  }
  var _listCacheGet = listCacheGet$1;
  var assocIndexOf$1 = _assocIndexOf;
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }
  var _listCacheHas = listCacheHas$1;
  var assocIndexOf = _assocIndexOf;
  function listCacheSet$1(key, value) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index2][1] = value;
    }
    return this;
  }
  var _listCacheSet = listCacheSet$1;
  var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
  function ListCache$4(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache$4.prototype.clear = listCacheClear;
  ListCache$4.prototype["delete"] = listCacheDelete;
  ListCache$4.prototype.get = listCacheGet;
  ListCache$4.prototype.has = listCacheHas;
  ListCache$4.prototype.set = listCacheSet;
  var _ListCache = ListCache$4;
  var ListCache$3 = _ListCache;
  function stackClear$1() {
    this.__data__ = new ListCache$3();
    this.size = 0;
  }
  var _stackClear = stackClear$1;
  function stackDelete$1(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var _stackDelete = stackDelete$1;
  function stackGet$1(key) {
    return this.__data__.get(key);
  }
  var _stackGet = stackGet$1;
  function stackHas$1(key) {
    return this.__data__.has(key);
  }
  var _stackHas = stackHas$1;
  var getNative$5 = _getNative, root$5 = _root;
  var Map$4 = getNative$5(root$5, "Map");
  var _Map = Map$4;
  var getNative$4 = _getNative;
  var nativeCreate$4 = getNative$4(Object, "create");
  var _nativeCreate = nativeCreate$4;
  var nativeCreate$3 = _nativeCreate;
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }
  var _hashClear = hashClear$1;
  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var _hashDelete = hashDelete$1;
  var nativeCreate$2 = _nativeCreate;
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  function hashGet$1(key) {
    var data = this.__data__;
    if (nativeCreate$2) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
  }
  var _hashGet = hashGet$1;
  var nativeCreate$1 = _nativeCreate;
  var objectProto$5 = Object.prototype;
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
  }
  var _hashHas = hashHas$1;
  var nativeCreate = _nativeCreate;
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
    return this;
  }
  var _hashSet = hashSet$1;
  var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
  function Hash$1(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  Hash$1.prototype.clear = hashClear;
  Hash$1.prototype["delete"] = hashDelete;
  Hash$1.prototype.get = hashGet;
  Hash$1.prototype.has = hashHas;
  Hash$1.prototype.set = hashSet;
  var _Hash = Hash$1;
  var Hash = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$3 || ListCache$2)(),
      "string": new Hash()
    };
  }
  var _mapCacheClear = mapCacheClear$1;
  function isKeyable$1(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var _isKeyable = isKeyable$1;
  var isKeyable = _isKeyable;
  function getMapData$4(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var _getMapData = getMapData$4;
  var getMapData$3 = _getMapData;
  function mapCacheDelete$1(key) {
    var result = getMapData$3(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var _mapCacheDelete = mapCacheDelete$1;
  var getMapData$2 = _getMapData;
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }
  var _mapCacheGet = mapCacheGet$1;
  var getMapData$1 = _getMapData;
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }
  var _mapCacheHas = mapCacheHas$1;
  var getMapData = _getMapData;
  function mapCacheSet$1(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var _mapCacheSet = mapCacheSet$1;
  var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
  function MapCache$3(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache$3.prototype.clear = mapCacheClear;
  MapCache$3.prototype["delete"] = mapCacheDelete;
  MapCache$3.prototype.get = mapCacheGet;
  MapCache$3.prototype.has = mapCacheHas;
  MapCache$3.prototype.set = mapCacheSet;
  var _MapCache = MapCache$3;
  var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$2 = _MapCache;
  var LARGE_ARRAY_SIZE = 200;
  function stackSet$1(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache$1) {
      var pairs = data.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache$2(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var _stackSet = stackSet$1;
  var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
  function Stack$2(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack$2.prototype.clear = stackClear;
  Stack$2.prototype["delete"] = stackDelete;
  Stack$2.prototype.get = stackGet;
  Stack$2.prototype.has = stackHas;
  Stack$2.prototype.set = stackSet;
  var _Stack = Stack$2;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd$1(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  var _setCacheAdd = setCacheAdd$1;
  function setCacheHas$1(value) {
    return this.__data__.has(value);
  }
  var _setCacheHas = setCacheHas$1;
  var MapCache$1 = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
  function SetCache$1(values) {
    var index2 = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache$1();
    while (++index2 < length) {
      this.add(values[index2]);
    }
  }
  SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
  SetCache$1.prototype.has = setCacheHas;
  var _SetCache = SetCache$1;
  function arraySome$1(array, predicate) {
    var index2 = -1, length = array == null ? 0 : array.length;
    while (++index2 < length) {
      if (predicate(array[index2], index2, array)) {
        return true;
      }
    }
    return false;
  }
  var _arraySome = arraySome$1;
  function cacheHas$1(cache, key) {
    return cache.has(key);
  }
  var _cacheHas = cacheHas$1;
  var SetCache = _SetCache, arraySome = _arraySome, cacheHas = _cacheHas;
  var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
  function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index2 < arrLength) {
      var arrValue = array[index2], othValue = other[index2];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  var _equalArrays = equalArrays$2;
  var root$4 = _root;
  var Uint8Array$2 = root$4.Uint8Array;
  var _Uint8Array = Uint8Array$2;
  function mapToArray$1(map) {
    var index2 = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index2] = [key, value];
    });
    return result;
  }
  var _mapToArray = mapToArray$1;
  function setToArray$1(set2) {
    var index2 = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index2] = value;
    });
    return result;
  }
  var _setToArray = setToArray$1;
  var Symbol$1 = _Symbol, Uint8Array$1 = _Uint8Array, eq$1 = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray = _setToArray;
  var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag$1 = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]";
  var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq$1(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag$1:
        var convert = mapToArray;
      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  var _equalByTag = equalByTag$1;
  function arrayPush$1(array, values) {
    var index2 = -1, length = values.length, offset2 = array.length;
    while (++index2 < length) {
      array[offset2 + index2] = values[index2];
    }
    return array;
  }
  var _arrayPush = arrayPush$1;
  var arrayPush = _arrayPush, isArray$2 = isArray_1;
  function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  var _baseGetAllKeys = baseGetAllKeys$1;
  function arrayFilter$1(array, predicate) {
    var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index2 < length) {
      var value = array[index2];
      if (predicate(value, index2, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var _arrayFilter = arrayFilter$1;
  function stubArray$1() {
    return [];
  }
  var stubArray_1 = stubArray$1;
  var arrayFilter = _arrayFilter, stubArray = stubArray_1;
  var objectProto$4 = Object.prototype;
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols$1 = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  var _getSymbols = getSymbols$1;
  var baseGetAllKeys = _baseGetAllKeys, getSymbols = _getSymbols, keys = keys_1;
  function getAllKeys$1(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  var _getAllKeys = getAllKeys$1;
  var getAllKeys = _getAllKeys;
  var COMPARE_PARTIAL_FLAG$1 = 1;
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index2 = objLength;
    while (index2--) {
      var key = objProps[index2];
      if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index2 < objLength) {
      key = objProps[index2];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var _equalObjects = equalObjects$1;
  var getNative$3 = _getNative, root$3 = _root;
  var DataView$1 = getNative$3(root$3, "DataView");
  var _DataView = DataView$1;
  var getNative$2 = _getNative, root$2 = _root;
  var Promise$2 = getNative$2(root$2, "Promise");
  var _Promise = Promise$2;
  var getNative$1 = _getNative, root$1 = _root;
  var Set$2 = getNative$1(root$1, "Set");
  var _Set = Set$2;
  var getNative = _getNative, root = _root;
  var WeakMap$2 = getNative(root, "WeakMap");
  var _WeakMap = WeakMap$2;
  var DataView = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
  var mapTag = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
  var getTag$1 = baseGetTag$1;
  if (DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag$1(new Map$1()) != mapTag || Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag || Set$1 && getTag$1(new Set$1()) != setTag || WeakMap$1 && getTag$1(new WeakMap$1()) != weakMapTag) {
    getTag$1 = function(value) {
      var result = baseGetTag$1(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  var _getTag = getTag$1;
  var Stack$1 = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag = _getTag, isArray$1 = isArray_1, isBuffer$1 = isBufferExports, isTypedArray$1 = isTypedArray_1;
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag$1 = "[object Object]";
  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag$1 : objTag;
    othTag = othTag == argsTag ? objectTag$1 : othTag;
    var objIsObj = objTag == objectTag$1, othIsObj = othTag == objectTag$1, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer$1(object)) {
      if (!isBuffer$1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack$1());
      return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack$1());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack$1());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  var _baseIsEqualDeep = baseIsEqualDeep$1;
  var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike$2 = isObjectLike_1;
  function baseIsEqual$1(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike$2(value) && !isObjectLike$2(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$1, stack);
  }
  var _baseIsEqual = baseIsEqual$1;
  var baseIsEqual = _baseIsEqual;
  function isEqual$1(value, other) {
    return baseIsEqual(value, other);
  }
  var isEqual_1 = isEqual$1;
  const isEqual$2 = /* @__PURE__ */ getDefaultExportFromCjs(isEqual_1);
  function useGetState(initialState) {
    var _a = __read(React$1.useState(initialState), 2), state = _a[0], setState = _a[1];
    var stateRef = React$1.useRef(state);
    stateRef.current = state;
    var getState = React$1.useCallback(function() {
      return stateRef.current;
    }, []);
    return [state, setState, getState];
  }
  (function() {
    if (typeof window !== "object") {
      return;
    }
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
        Object.defineProperty(
          window.IntersectionObserverEntry.prototype,
          "isIntersecting",
          {
            get: function() {
              return this.intersectionRatio > 0;
            }
          }
        );
      }
      return;
    }
    function getFrameElement(doc) {
      try {
        return doc.defaultView && doc.defaultView.frameElement || null;
      } catch (e2) {
        return null;
      }
    }
    var document2 = function(startDoc) {
      var doc = startDoc;
      var frame = getFrameElement(doc);
      while (frame) {
        doc = frame.ownerDocument;
        frame = getFrameElement(doc);
      }
      return doc;
    }(window.document);
    var registry = [];
    var crossOriginUpdater = null;
    var crossOriginRect = null;
    function IntersectionObserverEntry(entry) {
      this.time = entry.time;
      this.target = entry.target;
      this.rootBounds = ensureDOMRect(entry.rootBounds);
      this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
      this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
      this.isIntersecting = !!entry.intersectionRect;
      var targetRect = this.boundingClientRect;
      var targetArea = targetRect.width * targetRect.height;
      var intersectionRect = this.intersectionRect;
      var intersectionArea = intersectionRect.width * intersectionRect.height;
      if (targetArea) {
        this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
      } else {
        this.intersectionRatio = this.isIntersecting ? 1 : 0;
      }
    }
    function IntersectionObserver2(callback, opt_options) {
      var options = opt_options || {};
      if (typeof callback != "function") {
        throw new Error("callback must be a function");
      }
      if (options.root && options.root.nodeType != 1 && options.root.nodeType != 9) {
        throw new Error("root must be a Document or Element");
      }
      this._checkForIntersections = throttle2(
        this._checkForIntersections.bind(this),
        this.THROTTLE_TIMEOUT
      );
      this._callback = callback;
      this._observationTargets = [];
      this._queuedEntries = [];
      this._rootMarginValues = this._parseRootMargin(options.rootMargin);
      this.thresholds = this._initThresholds(options.threshold);
      this.root = options.root || null;
      this.rootMargin = this._rootMarginValues.map(function(margin) {
        return margin.value + margin.unit;
      }).join(" ");
      this._monitoringDocuments = [];
      this._monitoringUnsubscribes = [];
    }
    IntersectionObserver2.prototype.THROTTLE_TIMEOUT = 100;
    IntersectionObserver2.prototype.POLL_INTERVAL = null;
    IntersectionObserver2.prototype.USE_MUTATION_OBSERVER = true;
    IntersectionObserver2._setupCrossOriginUpdater = function() {
      if (!crossOriginUpdater) {
        crossOriginUpdater = function(boundingClientRect, intersectionRect) {
          if (!boundingClientRect || !intersectionRect) {
            crossOriginRect = getEmptyRect();
          } else {
            crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
          }
          registry.forEach(function(observer) {
            observer._checkForIntersections();
          });
        };
      }
      return crossOriginUpdater;
    };
    IntersectionObserver2._resetCrossOriginUpdater = function() {
      crossOriginUpdater = null;
      crossOriginRect = null;
    };
    IntersectionObserver2.prototype.observe = function(target) {
      var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
        return item.element == target;
      });
      if (isTargetAlreadyObserved) {
        return;
      }
      if (!(target && target.nodeType == 1)) {
        throw new Error("target must be an Element");
      }
      this._registerInstance();
      this._observationTargets.push({ element: target, entry: null });
      this._monitorIntersections(target.ownerDocument);
      this._checkForIntersections();
    };
    IntersectionObserver2.prototype.unobserve = function(target) {
      this._observationTargets = this._observationTargets.filter(function(item) {
        return item.element != target;
      });
      this._unmonitorIntersections(target.ownerDocument);
      if (this._observationTargets.length == 0) {
        this._unregisterInstance();
      }
    };
    IntersectionObserver2.prototype.disconnect = function() {
      this._observationTargets = [];
      this._unmonitorAllIntersections();
      this._unregisterInstance();
    };
    IntersectionObserver2.prototype.takeRecords = function() {
      var records = this._queuedEntries.slice();
      this._queuedEntries = [];
      return records;
    };
    IntersectionObserver2.prototype._initThresholds = function(opt_threshold) {
      var threshold = opt_threshold || [0];
      if (!Array.isArray(threshold))
        threshold = [threshold];
      return threshold.sort().filter(function(t, i2, a) {
        if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) {
          throw new Error("threshold must be a number between 0 and 1 inclusively");
        }
        return t !== a[i2 - 1];
      });
    };
    IntersectionObserver2.prototype._parseRootMargin = function(opt_rootMargin) {
      var marginString = opt_rootMargin || "0px";
      var margins = marginString.split(/\s+/).map(function(margin) {
        var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
        if (!parts) {
          throw new Error("rootMargin must be specified in pixels or percent");
        }
        return { value: parseFloat(parts[1]), unit: parts[2] };
      });
      margins[1] = margins[1] || margins[0];
      margins[2] = margins[2] || margins[0];
      margins[3] = margins[3] || margins[1];
      return margins;
    };
    IntersectionObserver2.prototype._monitorIntersections = function(doc) {
      var win = doc.defaultView;
      if (!win) {
        return;
      }
      if (this._monitoringDocuments.indexOf(doc) != -1) {
        return;
      }
      var callback = this._checkForIntersections;
      var monitoringInterval = null;
      var domObserver = null;
      if (this.POLL_INTERVAL) {
        monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
      } else {
        addEvent(win, "resize", callback, true);
        addEvent(doc, "scroll", callback, true);
        if (this.USE_MUTATION_OBSERVER && "MutationObserver" in win) {
          domObserver = new win.MutationObserver(callback);
          domObserver.observe(doc, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
      this._monitoringDocuments.push(doc);
      this._monitoringUnsubscribes.push(function() {
        var win2 = doc.defaultView;
        if (win2) {
          if (monitoringInterval) {
            win2.clearInterval(monitoringInterval);
          }
          removeEvent(win2, "resize", callback, true);
        }
        removeEvent(doc, "scroll", callback, true);
        if (domObserver) {
          domObserver.disconnect();
        }
      });
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      if (doc != rootDoc) {
        var frame = getFrameElement(doc);
        if (frame) {
          this._monitorIntersections(frame.ownerDocument);
        }
      }
    };
    IntersectionObserver2.prototype._unmonitorIntersections = function(doc) {
      var index2 = this._monitoringDocuments.indexOf(doc);
      if (index2 == -1) {
        return;
      }
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      var hasDependentTargets = this._observationTargets.some(function(item) {
        var itemDoc = item.element.ownerDocument;
        if (itemDoc == doc) {
          return true;
        }
        while (itemDoc && itemDoc != rootDoc) {
          var frame2 = getFrameElement(itemDoc);
          itemDoc = frame2 && frame2.ownerDocument;
          if (itemDoc == doc) {
            return true;
          }
        }
        return false;
      });
      if (hasDependentTargets) {
        return;
      }
      var unsubscribe = this._monitoringUnsubscribes[index2];
      this._monitoringDocuments.splice(index2, 1);
      this._monitoringUnsubscribes.splice(index2, 1);
      unsubscribe();
      if (doc != rootDoc) {
        var frame = getFrameElement(doc);
        if (frame) {
          this._unmonitorIntersections(frame.ownerDocument);
        }
      }
    };
    IntersectionObserver2.prototype._unmonitorAllIntersections = function() {
      var unsubscribes = this._monitoringUnsubscribes.slice(0);
      this._monitoringDocuments.length = 0;
      this._monitoringUnsubscribes.length = 0;
      for (var i2 = 0; i2 < unsubscribes.length; i2++) {
        unsubscribes[i2]();
      }
    };
    IntersectionObserver2.prototype._checkForIntersections = function() {
      if (!this.root && crossOriginUpdater && !crossOriginRect) {
        return;
      }
      var rootIsInDom = this._rootIsInDom();
      var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
      this._observationTargets.forEach(function(item) {
        var target = item.element;
        var targetRect = getBoundingClientRect2(target);
        var rootContainsTarget = this._rootContainsTarget(target);
        var oldEntry = item.entry;
        var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);
        var rootBounds = null;
        if (!this._rootContainsTarget(target)) {
          rootBounds = getEmptyRect();
        } else if (!crossOriginUpdater || this.root) {
          rootBounds = rootRect;
        }
        var newEntry = item.entry = new IntersectionObserverEntry({
          time: now2(),
          target,
          boundingClientRect: targetRect,
          rootBounds,
          intersectionRect
        });
        if (!oldEntry) {
          this._queuedEntries.push(newEntry);
        } else if (rootIsInDom && rootContainsTarget) {
          if (this._hasCrossedThreshold(oldEntry, newEntry)) {
            this._queuedEntries.push(newEntry);
          }
        } else {
          if (oldEntry && oldEntry.isIntersecting) {
            this._queuedEntries.push(newEntry);
          }
        }
      }, this);
      if (this._queuedEntries.length) {
        this._callback(this.takeRecords(), this);
      }
    };
    IntersectionObserver2.prototype._computeTargetAndRootIntersection = function(target, targetRect, rootRect) {
      if (window.getComputedStyle(target).display == "none")
        return;
      var intersectionRect = targetRect;
      var parent = getParentNode2(target);
      var atRoot = false;
      while (!atRoot && parent) {
        var parentRect = null;
        var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
        if (parentComputedStyle.display == "none")
          return null;
        if (parent == this.root || parent.nodeType == /* DOCUMENT */
        9) {
          atRoot = true;
          if (parent == this.root || parent == document2) {
            if (crossOriginUpdater && !this.root) {
              if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
                parent = null;
                parentRect = null;
                intersectionRect = null;
              } else {
                parentRect = crossOriginRect;
              }
            } else {
              parentRect = rootRect;
            }
          } else {
            var frame = getParentNode2(parent);
            var frameRect = frame && getBoundingClientRect2(frame);
            var frameIntersect = frame && this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
            if (frameRect && frameIntersect) {
              parent = frame;
              parentRect = convertFromParentRect(frameRect, frameIntersect);
            } else {
              parent = null;
              intersectionRect = null;
            }
          }
        } else {
          var doc = parent.ownerDocument;
          if (parent != doc.body && parent != doc.documentElement && parentComputedStyle.overflow != "visible") {
            parentRect = getBoundingClientRect2(parent);
          }
        }
        if (parentRect) {
          intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        }
        if (!intersectionRect)
          break;
        parent = parent && getParentNode2(parent);
      }
      return intersectionRect;
    };
    IntersectionObserver2.prototype._getRootRect = function() {
      var rootRect;
      if (this.root && !isDoc(this.root)) {
        rootRect = getBoundingClientRect2(this.root);
      } else {
        var doc = isDoc(this.root) ? this.root : document2;
        var html = doc.documentElement;
        var body = doc.body;
        rootRect = {
          top: 0,
          left: 0,
          right: html.clientWidth || body.clientWidth,
          width: html.clientWidth || body.clientWidth,
          bottom: html.clientHeight || body.clientHeight,
          height: html.clientHeight || body.clientHeight
        };
      }
      return this._expandRectByRootMargin(rootRect);
    };
    IntersectionObserver2.prototype._expandRectByRootMargin = function(rect) {
      var margins = this._rootMarginValues.map(function(margin, i2) {
        return margin.unit == "px" ? margin.value : margin.value * (i2 % 2 ? rect.width : rect.height) / 100;
      });
      var newRect = {
        top: rect.top - margins[0],
        right: rect.right + margins[1],
        bottom: rect.bottom + margins[2],
        left: rect.left - margins[3]
      };
      newRect.width = newRect.right - newRect.left;
      newRect.height = newRect.bottom - newRect.top;
      return newRect;
    };
    IntersectionObserver2.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
      var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
      var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
      if (oldRatio === newRatio)
        return;
      for (var i2 = 0; i2 < this.thresholds.length; i2++) {
        var threshold = this.thresholds[i2];
        if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
          return true;
        }
      }
    };
    IntersectionObserver2.prototype._rootIsInDom = function() {
      return !this.root || containsDeep(document2, this.root);
    };
    IntersectionObserver2.prototype._rootContainsTarget = function(target) {
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      return containsDeep(rootDoc, target) && (!this.root || rootDoc == target.ownerDocument);
    };
    IntersectionObserver2.prototype._registerInstance = function() {
      if (registry.indexOf(this) < 0) {
        registry.push(this);
      }
    };
    IntersectionObserver2.prototype._unregisterInstance = function() {
      var index2 = registry.indexOf(this);
      if (index2 != -1)
        registry.splice(index2, 1);
    };
    function now2() {
      return window.performance && performance.now && performance.now();
    }
    function throttle2(fn, timeout) {
      var timer = null;
      return function() {
        if (!timer) {
          timer = setTimeout(function() {
            fn();
            timer = null;
          }, timeout);
        }
      };
    }
    function addEvent(node, event, fn, opt_useCapture) {
      if (typeof node.addEventListener == "function") {
        node.addEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.attachEvent == "function") {
        node.attachEvent("on" + event, fn);
      }
    }
    function removeEvent(node, event, fn, opt_useCapture) {
      if (typeof node.removeEventListener == "function") {
        node.removeEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.detachEvent == "function") {
        node.detachEvent("on" + event, fn);
      }
    }
    function computeRectIntersection(rect1, rect2) {
      var top = Math.max(rect1.top, rect2.top);
      var bottom = Math.min(rect1.bottom, rect2.bottom);
      var left = Math.max(rect1.left, rect2.left);
      var right = Math.min(rect1.right, rect2.right);
      var width = right - left;
      var height = bottom - top;
      return width >= 0 && height >= 0 && {
        top,
        bottom,
        left,
        right,
        width,
        height
      } || null;
    }
    function getBoundingClientRect2(el) {
      var rect;
      try {
        rect = el.getBoundingClientRect();
      } catch (err) {
      }
      if (!rect)
        return getEmptyRect();
      if (!(rect.width && rect.height)) {
        rect = {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
        };
      }
      return rect;
    }
    function getEmptyRect() {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      };
    }
    function ensureDOMRect(rect) {
      if (!rect || "x" in rect) {
        return rect;
      }
      return {
        top: rect.top,
        y: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        x: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      };
    }
    function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
      var top = parentIntersectionRect.top - parentBoundingRect.top;
      var left = parentIntersectionRect.left - parentBoundingRect.left;
      return {
        top,
        left,
        height: parentIntersectionRect.height,
        width: parentIntersectionRect.width,
        bottom: top + parentIntersectionRect.height,
        right: left + parentIntersectionRect.width
      };
    }
    function containsDeep(parent, child) {
      var node = child;
      while (node) {
        if (node == parent)
          return true;
        node = getParentNode2(node);
      }
      return false;
    }
    function getParentNode2(node) {
      var parent = node.parentNode;
      if (node.nodeType == /* DOCUMENT */
      9 && node != document2) {
        return getFrameElement(node);
      }
      if (parent && parent.assignedSlot) {
        parent = parent.assignedSlot.parentNode;
      }
      if (parent && parent.nodeType == 11 && parent.host) {
        return parent.host;
      }
      return parent;
    }
    function isDoc(node) {
      return node && node.nodeType === 9;
    }
    window.IntersectionObserver = IntersectionObserver2;
    window.IntersectionObserverEntry = IntersectionObserverEntry;
  })();
  function useInViewport(target, options) {
    var _a = __read(React$1.useState(), 2), state = _a[0], setState = _a[1];
    var _b = __read(React$1.useState(), 2), ratio = _b[0], setRatio = _b[1];
    useEffectWithTarget$2(function() {
      var el = getTargetElement(target);
      if (!el) {
        return;
      }
      var observer = new IntersectionObserver(function(entries) {
        var e_1, _a2;
        try {
          for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var entry = entries_1_1.value;
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (entries_1_1 && !entries_1_1.done && (_a2 = entries_1.return))
              _a2.call(entries_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }, __assign(__assign({}, options), {
        root: getTargetElement(options === null || options === void 0 ? void 0 : options.root)
      }));
      observer.observe(el);
      return function() {
        observer.disconnect();
      };
    }, [options === null || options === void 0 ? void 0 : options.rootMargin, options === null || options === void 0 ? void 0 : options.threshold], target);
    return [state, ratio];
  }
  var useIsomorphicLayoutEffect$1 = isBrowser$3 ? React$1.useLayoutEffect : React$1.useEffect;
  const useIsomorphicLayoutEffect$2 = useIsomorphicLayoutEffect$1;
  function useLockFn(fn) {
    var _this = this;
    var lockRef = React$1.useRef(false);
    return React$1.useCallback(function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var ret, e_1;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (lockRef.current)
                return [
                  2
                  /*return*/
                ];
              lockRef.current = true;
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [4, fn.apply(void 0, __spreadArray([], __read(args), false))];
            case 2:
              ret = _a.sent();
              lockRef.current = false;
              return [2, ret];
            case 3:
              e_1 = _a.sent();
              lockRef.current = false;
              throw e_1;
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, [fn]);
  }
  function useRafState(initialState) {
    var ref = React$1.useRef(0);
    var _a = __read(React$1.useState(initialState), 2), state = _a[0], setState = _a[1];
    var setRafState = React$1.useCallback(function(value) {
      cancelAnimationFrame(ref.current);
      ref.current = requestAnimationFrame(function() {
        setState(value);
      });
    }, []);
    useUnmount$1(function() {
      cancelAnimationFrame(ref.current);
    });
    return [state, setRafState];
  }
  var overArg = _overArg;
  var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
  var _getPrototype = getPrototype$2;
  var baseGetTag = _baseGetTag, getPrototype$1 = _getPrototype, isObjectLike$1 = isObjectLike_1;
  var objectTag = "[object Object]";
  var funcProto = Function.prototype, objectProto$1 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject$1(value) {
    if (!isObjectLike$1(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  var isPlainObject_1 = isPlainObject$1;
  var useUnmountedRef = function() {
    var unmountedRef = React$1.useRef(false);
    React$1.useEffect(function() {
      unmountedRef.current = false;
      return function() {
        unmountedRef.current = true;
      };
    }, []);
    return unmountedRef;
  };
  const useUnmountedRef$1 = useUnmountedRef;
  var MapShim = function() {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function(entry, index2) {
        if (entry[0] === key) {
          result = index2;
          return true;
        }
        return false;
      });
      return result;
    }
    return (
      /** @class */
      function() {
        function class_1() {
          this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
          /**
           * @returns {boolean}
           */
          get: function() {
            return this.__entries__.length;
          },
          enumerable: true,
          configurable: true
        });
        class_1.prototype.get = function(key) {
          var index2 = getIndex(this.__entries__, key);
          var entry = this.__entries__[index2];
          return entry && entry[1];
        };
        class_1.prototype.set = function(key, value) {
          var index2 = getIndex(this.__entries__, key);
          if (~index2) {
            this.__entries__[index2][1] = value;
          } else {
            this.__entries__.push([key, value]);
          }
        };
        class_1.prototype.delete = function(key) {
          var entries = this.__entries__;
          var index2 = getIndex(entries, key);
          if (~index2) {
            entries.splice(index2, 1);
          }
        };
        class_1.prototype.has = function(key) {
          return !!~getIndex(this.__entries__, key);
        };
        class_1.prototype.clear = function() {
          this.__entries__.splice(0);
        };
        class_1.prototype.forEach = function(callback, ctx2) {
          if (ctx2 === void 0) {
            ctx2 = null;
          }
          for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
            var entry = _a[_i];
            callback.call(ctx2, entry[1], entry[0]);
          }
        };
        return class_1;
      }()
    );
  }();
  var isBrowser$1 = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  var global$1 = function() {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    return Function("return this")();
  }();
  var requestAnimationFrame$1 = function() {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function(callback) {
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  }();
  var trailingTimeout = 2;
  function throttle(callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = (
    /** @class */
    function() {
      function ResizeObserverController2() {
        this.connected_ = false;
        this.mutationEventsAdded_ = false;
        this.mutationsObserver_ = null;
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      ResizeObserverController2.prototype.addObserver = function(observer) {
        if (!~this.observers_.indexOf(observer)) {
          this.observers_.push(observer);
        }
        if (!this.connected_) {
          this.connect_();
        }
      };
      ResizeObserverController2.prototype.removeObserver = function(observer) {
        var observers2 = this.observers_;
        var index2 = observers2.indexOf(observer);
        if (~index2) {
          observers2.splice(index2, 1);
        }
        if (!observers2.length && this.connected_) {
          this.disconnect_();
        }
      };
      ResizeObserverController2.prototype.refresh = function() {
        var changesDetected = this.updateObservers_();
        if (changesDetected) {
          this.refresh();
        }
      };
      ResizeObserverController2.prototype.updateObservers_ = function() {
        var activeObservers = this.observers_.filter(function(observer) {
          return observer.gatherActive(), observer.hasActive();
        });
        activeObservers.forEach(function(observer) {
          return observer.broadcastActive();
        });
        return activeObservers.length > 0;
      };
      ResizeObserverController2.prototype.connect_ = function() {
        if (!isBrowser$1 || this.connected_) {
          return;
        }
        document.addEventListener("transitionend", this.onTransitionEnd_);
        window.addEventListener("resize", this.refresh);
        if (mutationObserverSupported) {
          this.mutationsObserver_ = new MutationObserver(this.refresh);
          this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        } else {
          document.addEventListener("DOMSubtreeModified", this.refresh);
          this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
      };
      ResizeObserverController2.prototype.disconnect_ = function() {
        if (!isBrowser$1 || !this.connected_) {
          return;
        }
        document.removeEventListener("transitionend", this.onTransitionEnd_);
        window.removeEventListener("resize", this.refresh);
        if (this.mutationsObserver_) {
          this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
          document.removeEventListener("DOMSubtreeModified", this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
      };
      ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
        var isReflowProperty = transitionKeys.some(function(key) {
          return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
          this.refresh();
        }
      };
      ResizeObserverController2.getInstance = function() {
        if (!this.instance_) {
          this.instance_ = new ResizeObserverController2();
        }
        return this.instance_;
      };
      ResizeObserverController2.instance_ = null;
      return ResizeObserverController2;
    }()
  );
  var defineConfigurable = function(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  };
  var getWindowOf = function(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  };
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
    };
  }();
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  function getContentRect(target) {
    if (!isBrowser$1) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return { x, y, width, height };
  }
  var ResizeObservation = (
    /** @class */
    function() {
      function ResizeObservation2(target) {
        this.broadcastWidth = 0;
        this.broadcastHeight = 0;
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
      }
      ResizeObservation2.prototype.isActive = function() {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
      };
      ResizeObservation2.prototype.broadcastRect = function() {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
      };
      return ResizeObservation2;
    }()
  );
  var ResizeObserverEntry = (
    /** @class */
    /* @__PURE__ */ function() {
      function ResizeObserverEntry2(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        defineConfigurable(this, { target, contentRect });
      }
      return ResizeObserverEntry2;
    }()
  );
  var ResizeObserverSPI = (
    /** @class */
    function() {
      function ResizeObserverSPI2(callback, controller, callbackCtx) {
        this.activeObservations_ = [];
        this.observations_ = new MapShim();
        if (typeof callback !== "function") {
          throw new TypeError("The callback provided as parameter 1 is not a function.");
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
      }
      ResizeObserverSPI2.prototype.observe = function(target) {
        if (!arguments.length) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        if (typeof Element === "undefined" || !(Element instanceof Object)) {
          return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
          throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        if (observations.has(target)) {
          return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        this.controller_.refresh();
      };
      ResizeObserverSPI2.prototype.unobserve = function(target) {
        if (!arguments.length) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        if (typeof Element === "undefined" || !(Element instanceof Object)) {
          return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
          throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        if (!observations.has(target)) {
          return;
        }
        observations.delete(target);
        if (!observations.size) {
          this.controller_.removeObserver(this);
        }
      };
      ResizeObserverSPI2.prototype.disconnect = function() {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
      };
      ResizeObserverSPI2.prototype.gatherActive = function() {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function(observation) {
          if (observation.isActive()) {
            _this.activeObservations_.push(observation);
          }
        });
      };
      ResizeObserverSPI2.prototype.broadcastActive = function() {
        if (!this.hasActive()) {
          return;
        }
        var ctx2 = this.callbackCtx_;
        var entries = this.activeObservations_.map(function(observation) {
          return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx2, entries, ctx2);
        this.clearActive();
      };
      ResizeObserverSPI2.prototype.clearActive = function() {
        this.activeObservations_.splice(0);
      };
      ResizeObserverSPI2.prototype.hasActive = function() {
        return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI2;
    }()
  );
  var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
  var ResizeObserver$1 = (
    /** @class */
    /* @__PURE__ */ function() {
      function ResizeObserver2(callback) {
        if (!(this instanceof ResizeObserver2)) {
          throw new TypeError("Cannot call a class as a function.");
        }
        if (!arguments.length) {
          throw new TypeError("1 argument required, but only 0 present.");
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
      }
      return ResizeObserver2;
    }()
  );
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver$1.prototype[method] = function() {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });
  var index$j = function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver$1;
  }();
  var useEffectWithTarget = createEffectWithTarget$1(React$1.useLayoutEffect);
  const useLayoutEffectWithTarget = useEffectWithTarget;
  var useIsomorphicLayoutEffectWithTarget = isBrowser$3 ? useLayoutEffectWithTarget : useEffectWithTarget$2;
  const useIsomorphicLayoutEffectWithTarget$1 = useIsomorphicLayoutEffectWithTarget;
  function useSize(target) {
    var _a = __read(useRafState(function() {
      var el = getTargetElement(target);
      return el ? {
        width: el.clientWidth,
        height: el.clientHeight
      } : void 0;
    }), 2), state = _a[0], setState = _a[1];
    useIsomorphicLayoutEffectWithTarget$1(function() {
      var el = getTargetElement(target);
      if (!el) {
        return;
      }
      var resizeObserver = new index$j(function(entries) {
        entries.forEach(function(entry) {
          var _a2 = entry.target, clientWidth = _a2.clientWidth, clientHeight = _a2.clientHeight;
          setState({
            width: clientWidth,
            height: clientHeight
          });
        });
      });
      resizeObserver.observe(el);
      return function() {
        resizeObserver.disconnect();
      };
    }, [], target);
    return state;
  }
  function useThrottleFn(fn, options) {
    var _a;
    if (isDev$1) {
      if (!isFunction$1(fn)) {
        console.error("useThrottleFn expected parameter is a function, got ".concat(typeof fn));
      }
    }
    var fnRef = useLatest(fn);
    var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1e3;
    var throttled = React$1.useMemo(function() {
      return throttle$2(function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fnRef.current.apply(fnRef, __spreadArray([], __read(args), false));
      }, wait, options);
    }, []);
    useUnmount$1(function() {
      throttled.cancel();
    });
    return {
      run: throttled,
      cancel: throttled.cancel,
      flush: throttled.flush
    };
  }
  var useTimeout = function(fn, delay) {
    var timerCallback = useMemoizedFn(fn);
    var timerRef = React$1.useRef(null);
    var clear2 = React$1.useCallback(function() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }, []);
    React$1.useEffect(function() {
      if (!isNumber(delay) || delay < 0) {
        return;
      }
      timerRef.current = setTimeout(timerCallback, delay);
      return clear2;
    }, [delay]);
    return clear2;
  };
  const useTimeout$1 = useTimeout;
  const MIN_DISTANCE = 10;
  function getDirection(x, y) {
    if (x > y && x > MIN_DISTANCE) {
      return "horizontal";
    }
    if (y > x && y > MIN_DISTANCE) {
      return "vertical";
    }
    return "";
  }
  function useTouch() {
    const startX = React$1.useRef(0);
    const startY = React$1.useRef(0);
    const deltaX = React$1.useRef(0);
    const deltaY = React$1.useRef(0);
    const offsetX = React$1.useRef(0);
    const offsetY = React$1.useRef(0);
    const direction = React$1.useRef("");
    const isVertical = () => direction.current === "vertical";
    const isHorizontal = () => direction.current === "horizontal";
    const reset = () => {
      deltaX.current = 0;
      deltaY.current = 0;
      offsetX.current = 0;
      offsetY.current = 0;
      direction.current = "";
    };
    const start2 = (event) => {
      reset();
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
    };
    const move2 = (event) => {
      const touch = event.touches[0];
      deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current;
      deltaY.current = touch.clientY - startY.current;
      offsetX.current = Math.abs(deltaX.current);
      offsetY.current = Math.abs(deltaY.current);
      if (!direction.current) {
        direction.current = getDirection(offsetX.current, offsetY.current);
      }
    };
    return {
      move: move2,
      start: start2,
      reset,
      startX,
      startY,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      direction,
      isVertical,
      isHorizontal
    };
  }
  const defaultRoot = canUseDom$1 ? window : void 0;
  const overflowStylePatterns = ["scroll", "auto", "overlay"];
  function isElement$1(node) {
    const ELEMENT_NODE_TYPE = 1;
    return node.nodeType === ELEMENT_NODE_TYPE;
  }
  function getScrollParent(el, root2 = defaultRoot) {
    let node = el;
    while (node && node !== root2 && isElement$1(node)) {
      if (node === document.body) {
        return root2;
      }
      const {
        overflowY
      } = window.getComputedStyle(node);
      if (overflowStylePatterns.includes(overflowY) && node.scrollHeight > node.clientHeight) {
        return node;
      }
      node = node.parentNode;
    }
    return root2;
  }
  let supportsPassive = false;
  if (canUseDom$1) {
    try {
      const opts = {};
      Object.defineProperty(opts, "passive", {
        get() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test-passive", null, opts);
    } catch (e2) {
    }
  }
  let totalLockCount = 0;
  const BODY_LOCK_CLASS = "adm-overflow-hidden";
  function getScrollableElement(el) {
    let current = el === null || el === void 0 ? void 0 : el.parentElement;
    while (current) {
      if (current.clientHeight < current.scrollHeight) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function useLockScroll(rootRef, shouldLock) {
    const touch = useTouch();
    const onTouchMove = (event) => {
      touch.move(event);
      const direction = touch.deltaY.current > 0 ? "10" : "01";
      const el = getScrollParent(event.target, rootRef.current);
      if (!el)
        return;
      if (shouldLock === "strict") {
        const scrollableParent = getScrollableElement(event.target);
        if (scrollableParent === document.body || scrollableParent === document.documentElement) {
          event.preventDefault();
          return;
        }
      }
      const {
        scrollHeight,
        offsetHeight,
        scrollTop
      } = el;
      const {
        height
      } = el.getBoundingClientRect();
      let status = "11";
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? "00" : "01";
      } else if (scrollHeight <= Math.round(height + scrollTop)) {
        status = "10";
      }
      if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
        if (event.cancelable && supportsPassive) {
          event.preventDefault();
        }
      }
    };
    const lock = () => {
      document.addEventListener("touchstart", touch.start);
      document.addEventListener("touchmove", onTouchMove, supportsPassive ? {
        passive: false
      } : false);
      if (!totalLockCount) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }
      totalLockCount++;
    };
    const unlock = () => {
      if (totalLockCount) {
        document.removeEventListener("touchstart", touch.start);
        document.removeEventListener("touchmove", onTouchMove);
        totalLockCount--;
        if (!totalLockCount) {
          document.body.classList.remove(BODY_LOCK_CLASS);
        }
      }
    };
    React$1.useEffect(() => {
      if (shouldLock) {
        lock();
        return () => {
          unlock();
        };
      }
    }, [shouldLock]);
  }
  let updateQueue = makeQueue();
  const raf = (fn) => schedule(fn, updateQueue);
  let writeQueue = makeQueue();
  raf.write = (fn) => schedule(fn, writeQueue);
  let onStartQueue = makeQueue();
  raf.onStart = (fn) => schedule(fn, onStartQueue);
  let onFrameQueue = makeQueue();
  raf.onFrame = (fn) => schedule(fn, onFrameQueue);
  let onFinishQueue = makeQueue();
  raf.onFinish = (fn) => schedule(fn, onFinishQueue);
  let timeouts = [];
  raf.setTimeout = (handler, ms) => {
    let time = raf.now() + ms;
    let cancel = () => {
      let i2 = timeouts.findIndex((t) => t.cancel == cancel);
      if (~i2)
        timeouts.splice(i2, 1);
      pendingCount -= ~i2 ? 1 : 0;
    };
    let timeout = {
      time,
      handler,
      cancel
    };
    timeouts.splice(findTimeout(time), 0, timeout);
    pendingCount += 1;
    start();
    return timeout;
  };
  let findTimeout = (time) => ~(~timeouts.findIndex((t) => t.time > time) || ~timeouts.length);
  raf.cancel = (fn) => {
    onStartQueue.delete(fn);
    onFrameQueue.delete(fn);
    onFinishQueue.delete(fn);
    updateQueue.delete(fn);
    writeQueue.delete(fn);
  };
  raf.sync = (fn) => {
    sync = true;
    raf.batchedUpdates(fn);
    sync = false;
  };
  raf.throttle = (fn) => {
    let lastArgs;
    function queuedFn() {
      try {
        fn(...lastArgs);
      } finally {
        lastArgs = null;
      }
    }
    function throttled(...args) {
      lastArgs = args;
      raf.onStart(queuedFn);
    }
    throttled.handler = fn;
    throttled.cancel = () => {
      onStartQueue.delete(queuedFn);
      lastArgs = null;
    };
    return throttled;
  };
  let nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : () => {
  };
  raf.use = (impl) => nativeRaf = impl;
  raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;
  raf.batchedUpdates = (fn) => fn();
  raf.catch = console.error;
  raf.frameLoop = "always";
  raf.advance = () => {
    if (raf.frameLoop !== "demand") {
      console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand");
    } else {
      update();
    }
  };
  let ts = -1;
  let pendingCount = 0;
  let sync = false;
  function schedule(fn, queue) {
    if (sync) {
      queue.delete(fn);
      fn(0);
    } else {
      queue.add(fn);
      start();
    }
  }
  function start() {
    if (ts < 0) {
      ts = 0;
      if (raf.frameLoop !== "demand") {
        nativeRaf(loop);
      }
    }
  }
  function stop() {
    ts = -1;
  }
  function loop() {
    if (~ts) {
      nativeRaf(loop);
      raf.batchedUpdates(update);
    }
  }
  function update() {
    let prevTs = ts;
    ts = raf.now();
    let count = findTimeout(ts);
    if (count) {
      eachSafely(timeouts.splice(0, count), (t) => t.handler());
      pendingCount -= count;
    }
    if (!pendingCount) {
      stop();
      return;
    }
    onStartQueue.flush();
    updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
    onFrameQueue.flush();
    writeQueue.flush();
    onFinishQueue.flush();
  }
  function makeQueue() {
    let next = /* @__PURE__ */ new Set();
    let current = next;
    return {
      add(fn) {
        pendingCount += current == next && !next.has(fn) ? 1 : 0;
        next.add(fn);
      },
      delete(fn) {
        pendingCount -= current == next && next.has(fn) ? 1 : 0;
        return next.delete(fn);
      },
      flush(arg) {
        if (current.size) {
          next = /* @__PURE__ */ new Set();
          pendingCount -= current.size;
          eachSafely(current, (fn) => fn(arg) && next.add(fn));
          pendingCount += next.size;
          current = next;
        }
      }
    };
  }
  function eachSafely(values, each2) {
    values.forEach((value) => {
      try {
        each2(value);
      } catch (e2) {
        raf.catch(e2);
      }
    });
  }
  function noop$1() {
  }
  const defineHidden = (obj, key, value) => Object.defineProperty(obj, key, {
    value,
    writable: true,
    configurable: true
  });
  const is = {
    arr: Array.isArray,
    obj: (a) => !!a && a.constructor.name === "Object",
    fun: (a) => typeof a === "function",
    str: (a) => typeof a === "string",
    num: (a) => typeof a === "number",
    und: (a) => a === void 0
  };
  function isEqual(a, b) {
    if (is.arr(a)) {
      if (!is.arr(b) || a.length !== b.length)
        return false;
      for (let i2 = 0; i2 < a.length; i2++) {
        if (a[i2] !== b[i2])
          return false;
      }
      return true;
    }
    return a === b;
  }
  const each = (obj, fn) => obj.forEach(fn);
  function eachProp(obj, fn, ctx2) {
    if (is.arr(obj)) {
      for (let i2 = 0; i2 < obj.length; i2++) {
        fn.call(ctx2, obj[i2], `${i2}`);
      }
      return;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(ctx2, obj[key], key);
      }
    }
  }
  const toArray$3 = (a) => is.und(a) ? [] : is.arr(a) ? a : [a];
  function flush(queue, iterator) {
    if (queue.size) {
      const items = Array.from(queue);
      queue.clear();
      each(items, iterator);
    }
  }
  const flushCalls = (queue, ...args) => flush(queue, (fn) => fn(...args));
  const isSSR = () => typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
  let createStringInterpolator$1;
  let to$1;
  let colors$1 = null;
  let skipAnimation = false;
  let willAdvance = noop$1;
  const assign = (globals2) => {
    if (globals2.to)
      to$1 = globals2.to;
    if (globals2.now)
      raf.now = globals2.now;
    if (globals2.colors !== void 0)
      colors$1 = globals2.colors;
    if (globals2.skipAnimation != null)
      skipAnimation = globals2.skipAnimation;
    if (globals2.createStringInterpolator)
      createStringInterpolator$1 = globals2.createStringInterpolator;
    if (globals2.requestAnimationFrame)
      raf.use(globals2.requestAnimationFrame);
    if (globals2.batchedUpdates)
      raf.batchedUpdates = globals2.batchedUpdates;
    if (globals2.willAdvance)
      willAdvance = globals2.willAdvance;
    if (globals2.frameLoop)
      raf.frameLoop = globals2.frameLoop;
  };
  var globals = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    get createStringInterpolator() {
      return createStringInterpolator$1;
    },
    get to() {
      return to$1;
    },
    get colors() {
      return colors$1;
    },
    get skipAnimation() {
      return skipAnimation;
    },
    get willAdvance() {
      return willAdvance;
    },
    assign
  });
  const startQueue = /* @__PURE__ */ new Set();
  let currentFrame = [];
  let prevFrame = [];
  let priority = 0;
  const frameLoop = {
    get idle() {
      return !startQueue.size && !currentFrame.length;
    },
    start(animation) {
      if (priority > animation.priority) {
        startQueue.add(animation);
        raf.onStart(flushStartQueue);
      } else {
        startSafely(animation);
        raf(advance);
      }
    },
    advance,
    sort(animation) {
      if (priority) {
        raf.onFrame(() => frameLoop.sort(animation));
      } else {
        const prevIndex = currentFrame.indexOf(animation);
        if (~prevIndex) {
          currentFrame.splice(prevIndex, 1);
          startUnsafely(animation);
        }
      }
    },
    clear() {
      currentFrame = [];
      startQueue.clear();
    }
  };
  function flushStartQueue() {
    startQueue.forEach(startSafely);
    startQueue.clear();
    raf(advance);
  }
  function startSafely(animation) {
    if (!currentFrame.includes(animation))
      startUnsafely(animation);
  }
  function startUnsafely(animation) {
    currentFrame.splice(findIndex(currentFrame, (other) => other.priority > animation.priority), 0, animation);
  }
  function advance(dt) {
    const nextFrame = prevFrame;
    for (let i2 = 0; i2 < currentFrame.length; i2++) {
      const animation = currentFrame[i2];
      priority = animation.priority;
      if (!animation.idle) {
        willAdvance(animation);
        animation.advance(dt);
        if (!animation.idle) {
          nextFrame.push(animation);
        }
      }
    }
    priority = 0;
    prevFrame = currentFrame;
    prevFrame.length = 0;
    currentFrame = nextFrame;
    return currentFrame.length > 0;
  }
  function findIndex(arr, test) {
    const index2 = arr.findIndex(test);
    return index2 < 0 ? arr.length : index2;
  }
  const clamp$2 = (min2, max2, v) => Math.min(Math.max(v, min2), max2);
  const colors = {
    transparent: 0,
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  const NUMBER = "[-+]?\\d*\\.?\\d+";
  const PERCENTAGE = NUMBER + "%";
  function call$3(...parts) {
    return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  const rgb = new RegExp("rgb" + call$3(NUMBER, NUMBER, NUMBER));
  const rgba = new RegExp("rgba" + call$3(NUMBER, NUMBER, NUMBER, NUMBER));
  const hsl = new RegExp("hsl" + call$3(NUMBER, PERCENTAGE, PERCENTAGE));
  const hsla = new RegExp("hsla" + call$3(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
  const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  const hex6 = /^#([0-9a-fA-F]{6})$/;
  const hex8 = /^#([0-9a-fA-F]{8})$/;
  function normalizeColor(color) {
    let match;
    if (typeof color === "number") {
      return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
    }
    if (match = hex6.exec(color))
      return parseInt(match[1] + "ff", 16) >>> 0;
    if (colors$1 && colors$1[color] !== void 0) {
      return colors$1[color];
    }
    if (match = rgb.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
    }
    if (match = rgba.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    }
    if (match = hex3.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
    }
    if (match = hex8.exec(color))
      return parseInt(match[1], 16) >>> 0;
    if (match = hex4.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    }
    if (match = hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
    }
    if (match = hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    }
    return null;
  }
  function hue2rgb(p, q, t) {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p + (q - p) * 6 * t;
    if (t < 1 / 2)
      return q;
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0)
      return 0;
    if (int > 255)
      return 255;
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0)
      return 0;
    if (num > 1)
      return 255;
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = parseFloat(str);
    if (int < 0)
      return 0;
    if (int > 100)
      return 1;
    return int / 100;
  }
  function colorToRgba(input) {
    let int32Color = normalizeColor(input);
    if (int32Color === null)
      return input;
    int32Color = int32Color || 0;
    let r = (int32Color & 4278190080) >>> 24;
    let g = (int32Color & 16711680) >>> 16;
    let b = (int32Color & 65280) >>> 8;
    let a = (int32Color & 255) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  const createInterpolator = (range2, output, extrapolate) => {
    if (is.fun(range2)) {
      return range2;
    }
    if (is.arr(range2)) {
      return createInterpolator({
        range: range2,
        output,
        extrapolate
      });
    }
    if (is.str(range2.output[0])) {
      return createStringInterpolator$1(range2);
    }
    const config2 = range2;
    const outputRange = config2.output;
    const inputRange = config2.range || [0, 1];
    const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || "extend";
    const extrapolateRight = config2.extrapolateRight || config2.extrapolate || "extend";
    const easing = config2.easing || ((t) => t);
    return (input) => {
      const range3 = findRange(input, inputRange);
      return interpolate(input, inputRange[range3], inputRange[range3 + 1], outputRange[range3], outputRange[range3 + 1], easing, extrapolateLeft, extrapolateRight, config2.map);
    };
  };
  function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    let result = map ? map(input) : input;
    if (result < inputMin) {
      if (extrapolateLeft === "identity")
        return result;
      else if (extrapolateLeft === "clamp")
        result = inputMin;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity")
        return result;
      else if (extrapolateRight === "clamp")
        result = inputMax;
    }
    if (outputMin === outputMax)
      return outputMin;
    if (inputMin === inputMax)
      return input <= inputMin ? outputMin : outputMax;
    if (inputMin === -Infinity)
      result = -result;
    else if (inputMax === Infinity)
      result = result - inputMin;
    else
      result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    if (outputMin === -Infinity)
      result = -result;
    else if (outputMax === Infinity)
      result = result + outputMin;
    else
      result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange(input, inputRange) {
    for (var i2 = 1; i2 < inputRange.length - 1; ++i2)
      if (inputRange[i2] >= input)
        break;
    return i2 - 1;
  }
  const steps = (steps2, direction = "end") => (progress) => {
    progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 1e-3);
    const expanded = progress * steps2;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp$2(0, 1, rounded / steps2);
  };
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  const c3 = c1 + 1;
  const c4 = 2 * Math.PI / 3;
  const c5 = 2 * Math.PI / 4.5;
  const bounceOut = (x) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  };
  const easings = {
    linear: (x) => x,
    easeInQuad: (x) => x * x,
    easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
    easeInOutQuad: (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    easeInCubic: (x) => x * x * x,
    easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),
    easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeInQuart: (x) => x * x * x * x,
    easeOutQuart: (x) => 1 - Math.pow(1 - x, 4),
    easeInOutQuart: (x) => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
    easeInQuint: (x) => x * x * x * x * x,
    easeOutQuint: (x) => 1 - Math.pow(1 - x, 5),
    easeInOutQuint: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
    easeInSine: (x) => 1 - Math.cos(x * Math.PI / 2),
    easeOutSine: (x) => Math.sin(x * Math.PI / 2),
    easeInOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
    easeInExpo: (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10),
    easeOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
    easeInOutExpo: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
    easeInCirc: (x) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
    easeOutCirc: (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
    easeInOutCirc: (x) => x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
    easeInBack: (x) => c3 * x * x * x - c1 * x * x,
    easeOutBack: (x) => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2),
    easeInOutBack: (x) => x < 0.5 ? Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
    easeInElastic: (x) => x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4),
    easeOutElastic: (x) => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1,
    easeInOutElastic: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5) / 2 + 1,
    easeInBounce: (x) => 1 - bounceOut(1 - x),
    easeOutBounce: bounceOut,
    easeInOutBounce: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2,
    steps
  };
  function _extends$4() {
    _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$4.apply(this, arguments);
  }
  const $get = Symbol.for("FluidValue.get");
  const $observers = Symbol.for("FluidValue.observers");
  const hasFluidValue = (arg) => Boolean(arg && arg[$get]);
  const getFluidValue = (arg) => arg && arg[$get] ? arg[$get]() : arg;
  const getFluidObservers = (target) => target[$observers] || null;
  function callFluidObserver(observer, event) {
    if (observer.eventObserved) {
      observer.eventObserved(event);
    } else {
      observer(event);
    }
  }
  function callFluidObservers(target, event) {
    let observers2 = target[$observers];
    if (observers2) {
      observers2.forEach((observer) => {
        callFluidObserver(observer, event);
      });
    }
  }
  class FluidValue {
    constructor(get2) {
      this[$get] = void 0;
      this[$observers] = void 0;
      if (!get2 && !(get2 = this.get)) {
        throw Error("Unknown getter");
      }
      setFluidGetter(this, get2);
    }
  }
  const setFluidGetter = (target, get2) => setHidden(target, $get, get2);
  function addFluidObserver(target, observer) {
    if (target[$get]) {
      let observers2 = target[$observers];
      if (!observers2) {
        setHidden(target, $observers, observers2 = /* @__PURE__ */ new Set());
      }
      if (!observers2.has(observer)) {
        observers2.add(observer);
        if (target.observerAdded) {
          target.observerAdded(observers2.size, observer);
        }
      }
    }
    return observer;
  }
  function removeFluidObserver(target, observer) {
    let observers2 = target[$observers];
    if (observers2 && observers2.has(observer)) {
      const count = observers2.size - 1;
      if (count) {
        observers2.delete(observer);
      } else {
        target[$observers] = null;
      }
      if (target.observerRemoved) {
        target.observerRemoved(count, observer);
      }
    }
  }
  const setHidden = (target, key, value) => Object.defineProperty(target, key, {
    value,
    writable: true,
    configurable: true
  });
  const numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
  const unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
  const rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
  const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
  const variableToRgba = (input) => {
    const [token, fallback] = parseCSSVariable(input);
    if (!token || isSSR()) {
      return input;
    }
    const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
    if (value) {
      return value.trim();
    } else if (fallback && fallback.startsWith("--")) {
      const _value = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
      if (_value) {
        return _value;
      } else {
        return input;
      }
    } else if (fallback && cssVariableRegex.test(fallback)) {
      return variableToRgba(fallback);
    } else if (fallback) {
      return fallback;
    }
    return input;
  };
  const parseCSSVariable = (current) => {
    const match = cssVariableRegex.exec(current);
    if (!match)
      return [,];
    const [, token, fallback] = match;
    return [token, fallback];
  };
  let namedColorRegex;
  const rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
  const createStringInterpolator = (config2) => {
    if (!namedColorRegex)
      namedColorRegex = colors$1 ? new RegExp(`(${Object.keys(colors$1).join("|")})(?!\\w)`, "g") : /^\b$/;
    const output = config2.output.map((value) => {
      return getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba);
    });
    const keyframes = output.map((value) => value.match(numberRegex).map(Number));
    const outputRanges = keyframes[0].map((_, i2) => keyframes.map((values) => {
      if (!(i2 in values)) {
        throw Error('The arity of each "output" value must be equal');
      }
      return values[i2];
    }));
    const interpolators = outputRanges.map((output2) => createInterpolator(_extends$4({}, config2, {
      output: output2
    })));
    return (input) => {
      var _output$find;
      const missingUnit = !unitRegex.test(output[0]) && ((_output$find = output.find((value) => unitRegex.test(value))) == null ? void 0 : _output$find.replace(numberRegex, ""));
      let i2 = 0;
      return output[0].replace(numberRegex, () => `${interpolators[i2++](input)}${missingUnit || ""}`).replace(rgbaRegex, rgbaRound);
    };
  };
  const prefix = "react-spring: ";
  const once = (fn) => {
    const func = fn;
    let called = false;
    if (typeof func != "function") {
      throw new TypeError(`${prefix}once requires a function parameter`);
    }
    return (...args) => {
      if (!called) {
        func(...args);
        called = true;
      }
    };
  };
  const warnInterpolate = once(console.warn);
  function deprecateInterpolate() {
    warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
  }
  const warnDirectCall = once(console.warn);
  function deprecateDirectCall() {
    warnDirectCall(`${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
  }
  function isAnimatedString(value) {
    return is.str(value) && (value[0] == "#" || /\d/.test(value) || !isSSR() && cssVariableRegex.test(value) || value in (colors$1 || {}));
  }
  const useIsomorphicLayoutEffect = isSSR() ? React$1.useEffect : React$1.useLayoutEffect;
  const useIsMounted = () => {
    const isMounted = React$1.useRef(false);
    useIsomorphicLayoutEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);
    return isMounted;
  };
  function useForceUpdate() {
    const update2 = React$1.useState()[1];
    const isMounted = useIsMounted();
    return () => {
      if (isMounted.current) {
        update2(Math.random());
      }
    };
  }
  function useMemoOne(getResult, inputs) {
    const [initial] = React$1.useState(() => ({
      inputs,
      result: getResult()
    }));
    const committed = React$1.useRef();
    const prevCache = committed.current;
    let cache = prevCache;
    if (cache) {
      const useCache = Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs));
      if (!useCache) {
        cache = {
          inputs,
          result: getResult()
        };
      }
    } else {
      cache = initial;
    }
    React$1.useEffect(() => {
      committed.current = cache;
      if (prevCache == initial) {
        initial.inputs = initial.result = void 0;
      }
    }, [cache]);
    return cache.result;
  }
  function areInputsEqual(next, prev) {
    if (next.length !== prev.length) {
      return false;
    }
    for (let i2 = 0; i2 < next.length; i2++) {
      if (next[i2] !== prev[i2]) {
        return false;
      }
    }
    return true;
  }
  const useOnce = (effect) => React$1.useEffect(effect, emptyDeps);
  const emptyDeps = [];
  function usePrev(value) {
    const prevRef = React$1.useRef();
    React$1.useEffect(() => {
      prevRef.current = value;
    });
    return prevRef.current;
  }
  const $node = Symbol.for("Animated:node");
  const isAnimated = (value) => !!value && value[$node] === value;
  const getAnimated = (owner) => owner && owner[$node];
  const setAnimated = (owner, node) => defineHidden(owner, $node, node);
  const getPayload = (owner) => owner && owner[$node] && owner[$node].getPayload();
  class Animated {
    constructor() {
      this.payload = void 0;
      setAnimated(this, this);
    }
    getPayload() {
      return this.payload || [];
    }
  }
  class AnimatedValue extends Animated {
    constructor(_value) {
      super();
      this.done = true;
      this.elapsedTime = void 0;
      this.lastPosition = void 0;
      this.lastVelocity = void 0;
      this.v0 = void 0;
      this.durationProgress = 0;
      this._value = _value;
      if (is.num(this._value)) {
        this.lastPosition = this._value;
      }
    }
    static create(value) {
      return new AnimatedValue(value);
    }
    getPayload() {
      return [this];
    }
    getValue() {
      return this._value;
    }
    setValue(value, step) {
      if (is.num(value)) {
        this.lastPosition = value;
        if (step) {
          value = Math.round(value / step) * step;
          if (this.done) {
            this.lastPosition = value;
          }
        }
      }
      if (this._value === value) {
        return false;
      }
      this._value = value;
      return true;
    }
    reset() {
      const {
        done
      } = this;
      this.done = false;
      if (is.num(this._value)) {
        this.elapsedTime = 0;
        this.durationProgress = 0;
        this.lastPosition = this._value;
        if (done)
          this.lastVelocity = null;
        this.v0 = null;
      }
    }
  }
  class AnimatedString extends AnimatedValue {
    constructor(value) {
      super(0);
      this._string = null;
      this._toString = void 0;
      this._toString = createInterpolator({
        output: [value, value]
      });
    }
    static create(value) {
      return new AnimatedString(value);
    }
    getValue() {
      let value = this._string;
      return value == null ? this._string = this._toString(this._value) : value;
    }
    setValue(value) {
      if (is.str(value)) {
        if (value == this._string) {
          return false;
        }
        this._string = value;
        this._value = 1;
      } else if (super.setValue(value)) {
        this._string = null;
      } else {
        return false;
      }
      return true;
    }
    reset(goal) {
      if (goal) {
        this._toString = createInterpolator({
          output: [this.getValue(), goal]
        });
      }
      this._value = 0;
      super.reset();
    }
  }
  const TreeContext = {
    dependencies: null
  };
  class AnimatedObject extends Animated {
    constructor(source) {
      super();
      this.source = source;
      this.setValue(source);
    }
    getValue(animated2) {
      const values = {};
      eachProp(this.source, (source, key) => {
        if (isAnimated(source)) {
          values[key] = source.getValue(animated2);
        } else if (hasFluidValue(source)) {
          values[key] = getFluidValue(source);
        } else if (!animated2) {
          values[key] = source;
        }
      });
      return values;
    }
    setValue(source) {
      this.source = source;
      this.payload = this._makePayload(source);
    }
    reset() {
      if (this.payload) {
        each(this.payload, (node) => node.reset());
      }
    }
    _makePayload(source) {
      if (source) {
        const payload = /* @__PURE__ */ new Set();
        eachProp(source, this._addToPayload, payload);
        return Array.from(payload);
      }
    }
    _addToPayload(source) {
      if (TreeContext.dependencies && hasFluidValue(source)) {
        TreeContext.dependencies.add(source);
      }
      const payload = getPayload(source);
      if (payload) {
        each(payload, (node) => this.add(node));
      }
    }
  }
  class AnimatedArray extends AnimatedObject {
    constructor(source) {
      super(source);
    }
    static create(source) {
      return new AnimatedArray(source);
    }
    getValue() {
      return this.source.map((node) => node.getValue());
    }
    setValue(source) {
      const payload = this.getPayload();
      if (source.length == payload.length) {
        return payload.map((node, i2) => node.setValue(source[i2])).some(Boolean);
      }
      super.setValue(source.map(makeAnimated));
      return true;
    }
  }
  function makeAnimated(value) {
    const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
    return nodeType.create(value);
  }
  function getAnimatedType(value) {
    const parentNode = getAnimated(value);
    return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
  }
  function _extends$3() {
    _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$3.apply(this, arguments);
  }
  const withAnimated = (Component, host2) => {
    const hasInstance = !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
    return React$1.forwardRef((givenProps, givenRef) => {
      const instanceRef = React$1.useRef(null);
      const ref = hasInstance && React$1.useCallback((value) => {
        instanceRef.current = updateRef(givenRef, value);
      }, [givenRef]);
      const [props, deps] = getAnimatedState(givenProps, host2);
      const forceUpdate = useForceUpdate();
      const callback = () => {
        const instance = instanceRef.current;
        if (hasInstance && !instance) {
          return;
        }
        const didUpdate = instance ? host2.applyAnimatedValues(instance, props.getValue(true)) : false;
        if (didUpdate === false) {
          forceUpdate();
        }
      };
      const observer = new PropsObserver(callback, deps);
      const observerRef = React$1.useRef();
      useIsomorphicLayoutEffect(() => {
        observerRef.current = observer;
        each(deps, (dep) => addFluidObserver(dep, observer));
        return () => {
          if (observerRef.current) {
            each(observerRef.current.deps, (dep) => removeFluidObserver(dep, observerRef.current));
            raf.cancel(observerRef.current.update);
          }
        };
      });
      React$1.useEffect(callback, []);
      useOnce(() => () => {
        const observer2 = observerRef.current;
        each(observer2.deps, (dep) => removeFluidObserver(dep, observer2));
      });
      const usedProps = host2.getComponentProps(props.getValue());
      return React__namespace.createElement(Component, _extends$3({}, usedProps, {
        ref
      }));
    });
  };
  class PropsObserver {
    constructor(update2, deps) {
      this.update = update2;
      this.deps = deps;
    }
    eventObserved(event) {
      if (event.type == "change") {
        raf.write(this.update);
      }
    }
  }
  function getAnimatedState(props, host2) {
    const dependencies = /* @__PURE__ */ new Set();
    TreeContext.dependencies = dependencies;
    if (props.style)
      props = _extends$3({}, props, {
        style: host2.createAnimatedStyle(props.style)
      });
    props = new AnimatedObject(props);
    TreeContext.dependencies = null;
    return [props, dependencies];
  }
  function updateRef(ref, value) {
    if (ref) {
      if (is.fun(ref))
        ref(value);
      else
        ref.current = value;
    }
    return value;
  }
  const cacheKey = Symbol.for("AnimatedComponent");
  const createHost = (components, {
    applyAnimatedValues: _applyAnimatedValues = () => false,
    createAnimatedStyle: _createAnimatedStyle = (style) => new AnimatedObject(style),
    getComponentProps: _getComponentProps = (props) => props
  } = {}) => {
    const hostConfig = {
      applyAnimatedValues: _applyAnimatedValues,
      createAnimatedStyle: _createAnimatedStyle,
      getComponentProps: _getComponentProps
    };
    const animated2 = (Component) => {
      const displayName = getDisplayName(Component) || "Anonymous";
      if (is.str(Component)) {
        Component = animated2[Component] || (animated2[Component] = withAnimated(Component, hostConfig));
      } else {
        Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
      }
      Component.displayName = `Animated(${displayName})`;
      return Component;
    };
    eachProp(components, (Component, key) => {
      if (is.arr(components)) {
        key = getDisplayName(Component);
      }
      animated2[key] = animated2(Component);
    });
    return {
      animated: animated2
    };
  };
  const getDisplayName = (arg) => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;
  function _extends$2() {
    _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$2.apply(this, arguments);
  }
  function callProp(value, ...args) {
    return is.fun(value) ? value(...args) : value;
  }
  const matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray$3(value).includes(key)));
  const resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;
  const getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;
  const noopTransform = (value) => value;
  const getDefaultProps = (props, transform = noopTransform) => {
    let keys2 = DEFAULT_PROPS;
    if (props.default && props.default !== true) {
      props = props.default;
      keys2 = Object.keys(props);
    }
    const defaults2 = {};
    for (const key of keys2) {
      const value = transform(props[key], key);
      if (!is.und(value)) {
        defaults2[key] = value;
      }
    }
    return defaults2;
  };
  const DEFAULT_PROPS = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"];
  const RESERVED_PROPS = {
    config: 1,
    from: 1,
    to: 1,
    ref: 1,
    loop: 1,
    reset: 1,
    pause: 1,
    cancel: 1,
    reverse: 1,
    immediate: 1,
    default: 1,
    delay: 1,
    onProps: 1,
    onStart: 1,
    onChange: 1,
    onPause: 1,
    onResume: 1,
    onRest: 1,
    onResolve: 1,
    items: 1,
    trail: 1,
    sort: 1,
    expires: 1,
    initial: 1,
    enter: 1,
    update: 1,
    leave: 1,
    children: 1,
    onDestroyed: 1,
    keys: 1,
    callId: 1,
    parentId: 1
  };
  function getForwardProps(props) {
    const forward = {};
    let count = 0;
    eachProp(props, (value, prop) => {
      if (!RESERVED_PROPS[prop]) {
        forward[prop] = value;
        count++;
      }
    });
    if (count) {
      return forward;
    }
  }
  function inferTo(props) {
    const to2 = getForwardProps(props);
    if (to2) {
      const out = {
        to: to2
      };
      eachProp(props, (val, key) => key in to2 || (out[key] = val));
      return out;
    }
    return _extends$2({}, props);
  }
  function computeGoal(value) {
    value = getFluidValue(value);
    return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals.createStringInterpolator({
      range: [0, 1],
      output: [value, value]
    })(1) : value;
  }
  function hasProps(props) {
    for (const _ in props)
      return true;
    return false;
  }
  function isAsyncTo(to2) {
    return is.fun(to2) || is.arr(to2) && is.obj(to2[0]);
  }
  function detachRefs(ctrl, ref) {
    var _ctrl$ref;
    (_ctrl$ref = ctrl.ref) == null ? void 0 : _ctrl$ref.delete(ctrl);
    ref == null ? void 0 : ref.delete(ctrl);
  }
  function replaceRef(ctrl, ref) {
    if (ref && ctrl.ref !== ref) {
      var _ctrl$ref2;
      (_ctrl$ref2 = ctrl.ref) == null ? void 0 : _ctrl$ref2.delete(ctrl);
      ref.add(ctrl);
      ctrl.ref = ref;
    }
  }
  const config$1 = {
    default: {
      tension: 170,
      friction: 26
    },
    gentle: {
      tension: 120,
      friction: 14
    },
    wobbly: {
      tension: 180,
      friction: 12
    },
    stiff: {
      tension: 210,
      friction: 20
    },
    slow: {
      tension: 280,
      friction: 60
    },
    molasses: {
      tension: 280,
      friction: 120
    }
  };
  const defaults = _extends$2({}, config$1.default, {
    mass: 1,
    damping: 1,
    easing: easings.linear,
    clamp: false
  });
  class AnimationConfig {
    constructor() {
      this.tension = void 0;
      this.friction = void 0;
      this.frequency = void 0;
      this.damping = void 0;
      this.mass = void 0;
      this.velocity = 0;
      this.restVelocity = void 0;
      this.precision = void 0;
      this.progress = void 0;
      this.duration = void 0;
      this.easing = void 0;
      this.clamp = void 0;
      this.bounce = void 0;
      this.decay = void 0;
      this.round = void 0;
      Object.assign(this, defaults);
    }
  }
  function mergeConfig(config2, newConfig, defaultConfig) {
    if (defaultConfig) {
      defaultConfig = _extends$2({}, defaultConfig);
      sanitizeConfig(defaultConfig, newConfig);
      newConfig = _extends$2({}, defaultConfig, newConfig);
    }
    sanitizeConfig(config2, newConfig);
    Object.assign(config2, newConfig);
    for (const key in defaults) {
      if (config2[key] == null) {
        config2[key] = defaults[key];
      }
    }
    let {
      mass,
      frequency,
      damping
    } = config2;
    if (!is.und(frequency)) {
      if (frequency < 0.01)
        frequency = 0.01;
      if (damping < 0)
        damping = 0;
      config2.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
      config2.friction = 4 * Math.PI * damping * mass / frequency;
    }
    return config2;
  }
  function sanitizeConfig(config2, props) {
    if (!is.und(props.decay)) {
      config2.duration = void 0;
    } else {
      const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
      if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
        config2.duration = void 0;
        config2.decay = void 0;
      }
      if (isTensionConfig) {
        config2.frequency = void 0;
      }
    }
  }
  const emptyArray = [];
  class Animation {
    constructor() {
      this.changed = false;
      this.values = emptyArray;
      this.toValues = null;
      this.fromValues = emptyArray;
      this.to = void 0;
      this.from = void 0;
      this.config = new AnimationConfig();
      this.immediate = false;
    }
  }
  function scheduleProps(callId, {
    key,
    props,
    defaultProps: defaultProps2,
    state,
    actions
  }) {
    return new Promise((resolve, reject) => {
      var _props$cancel;
      let delay;
      let timeout;
      let cancel = matchProp((_props$cancel = props.cancel) != null ? _props$cancel : defaultProps2 == null ? void 0 : defaultProps2.cancel, key);
      if (cancel) {
        onStart();
      } else {
        if (!is.und(props.pause)) {
          state.paused = matchProp(props.pause, key);
        }
        let pause = defaultProps2 == null ? void 0 : defaultProps2.pause;
        if (pause !== true) {
          pause = state.paused || matchProp(pause, key);
        }
        delay = callProp(props.delay || 0, key);
        if (pause) {
          state.resumeQueue.add(onResume);
          actions.pause();
        } else {
          actions.resume();
          onResume();
        }
      }
      function onPause() {
        state.resumeQueue.add(onResume);
        state.timeouts.delete(timeout);
        timeout.cancel();
        delay = timeout.time - raf.now();
      }
      function onResume() {
        if (delay > 0 && !globals.skipAnimation) {
          state.delayed = true;
          timeout = raf.setTimeout(onStart, delay);
          state.pauseQueue.add(onPause);
          state.timeouts.add(timeout);
        } else {
          onStart();
        }
      }
      function onStart() {
        if (state.delayed) {
          state.delayed = false;
        }
        state.pauseQueue.delete(onPause);
        state.timeouts.delete(timeout);
        if (callId <= (state.cancelId || 0)) {
          cancel = true;
        }
        try {
          actions.start(_extends$2({}, props, {
            callId,
            cancel
          }), resolve);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
  const getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some((result) => result.cancelled) ? getCancelledResult(target.get()) : results.every((result) => result.noop) ? getNoopResult(target.get()) : getFinishedResult(target.get(), results.every((result) => result.finished));
  const getNoopResult = (value) => ({
    value,
    noop: true,
    finished: true,
    cancelled: false
  });
  const getFinishedResult = (value, finished, cancelled = false) => ({
    value,
    finished,
    cancelled
  });
  const getCancelledResult = (value) => ({
    value,
    cancelled: true,
    finished: false
  });
  function runAsync(to2, props, state, target) {
    const {
      callId,
      parentId,
      onRest
    } = props;
    const {
      asyncTo: prevTo,
      promise: prevPromise
    } = state;
    if (!parentId && to2 === prevTo && !props.reset) {
      return prevPromise;
    }
    return state.promise = (async () => {
      state.asyncId = callId;
      state.asyncTo = to2;
      const defaultProps2 = getDefaultProps(props, (value, key) => key === "onRest" ? void 0 : value);
      let preventBail;
      let bail;
      const bailPromise = new Promise((resolve, reject) => (preventBail = resolve, bail = reject));
      const bailIfEnded = (bailSignal) => {
        const bailResult = callId <= (state.cancelId || 0) && getCancelledResult(target) || callId !== state.asyncId && getFinishedResult(target, false);
        if (bailResult) {
          bailSignal.result = bailResult;
          bail(bailSignal);
          throw bailSignal;
        }
      };
      const animate = (arg1, arg2) => {
        const bailSignal = new BailSignal();
        const skipAnimationSignal = new SkipAnimationSignal();
        return (async () => {
          if (globals.skipAnimation) {
            stopAsync(state);
            skipAnimationSignal.result = getFinishedResult(target, false);
            bail(skipAnimationSignal);
            throw skipAnimationSignal;
          }
          bailIfEnded(bailSignal);
          const props2 = is.obj(arg1) ? _extends$2({}, arg1) : _extends$2({}, arg2, {
            to: arg1
          });
          props2.parentId = callId;
          eachProp(defaultProps2, (value, key) => {
            if (is.und(props2[key])) {
              props2[key] = value;
            }
          });
          const result2 = await target.start(props2);
          bailIfEnded(bailSignal);
          if (state.paused) {
            await new Promise((resume) => {
              state.resumeQueue.add(resume);
            });
          }
          return result2;
        })();
      };
      let result;
      if (globals.skipAnimation) {
        stopAsync(state);
        return getFinishedResult(target, false);
      }
      try {
        let animating;
        if (is.arr(to2)) {
          animating = (async (queue) => {
            for (const props2 of queue) {
              await animate(props2);
            }
          })(to2);
        } else {
          animating = Promise.resolve(to2(animate, target.stop.bind(target)));
        }
        await Promise.all([animating.then(preventBail), bailPromise]);
        result = getFinishedResult(target.get(), true, false);
      } catch (err) {
        if (err instanceof BailSignal) {
          result = err.result;
        } else if (err instanceof SkipAnimationSignal) {
          result = err.result;
        } else {
          throw err;
        }
      } finally {
        if (callId == state.asyncId) {
          state.asyncId = parentId;
          state.asyncTo = parentId ? prevTo : void 0;
          state.promise = parentId ? prevPromise : void 0;
        }
      }
      if (is.fun(onRest)) {
        raf.batchedUpdates(() => {
          onRest(result, target, target.item);
        });
      }
      return result;
    })();
  }
  function stopAsync(state, cancelId) {
    flush(state.timeouts, (t) => t.cancel());
    state.pauseQueue.clear();
    state.resumeQueue.clear();
    state.asyncId = state.asyncTo = state.promise = void 0;
    if (cancelId)
      state.cancelId = cancelId;
  }
  class BailSignal extends Error {
    constructor() {
      super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
      this.result = void 0;
    }
  }
  class SkipAnimationSignal extends Error {
    constructor() {
      super("SkipAnimationSignal");
      this.result = void 0;
    }
  }
  const isFrameValue = (value) => value instanceof FrameValue;
  let nextId$1 = 1;
  class FrameValue extends FluidValue {
    constructor(...args) {
      super(...args);
      this.id = nextId$1++;
      this.key = void 0;
      this._priority = 0;
    }
    get priority() {
      return this._priority;
    }
    set priority(priority2) {
      if (this._priority != priority2) {
        this._priority = priority2;
        this._onPriorityChange(priority2);
      }
    }
    get() {
      const node = getAnimated(this);
      return node && node.getValue();
    }
    to(...args) {
      return globals.to(this, args);
    }
    interpolate(...args) {
      deprecateInterpolate();
      return globals.to(this, args);
    }
    toJSON() {
      return this.get();
    }
    observerAdded(count) {
      if (count == 1)
        this._attach();
    }
    observerRemoved(count) {
      if (count == 0)
        this._detach();
    }
    _attach() {
    }
    _detach() {
    }
    _onChange(value, idle = false) {
      callFluidObservers(this, {
        type: "change",
        parent: this,
        value,
        idle
      });
    }
    _onPriorityChange(priority2) {
      if (!this.idle) {
        frameLoop.sort(this);
      }
      callFluidObservers(this, {
        type: "priority",
        parent: this,
        priority: priority2
      });
    }
  }
  const $P = Symbol.for("SpringPhase");
  const HAS_ANIMATED = 1;
  const IS_ANIMATING = 2;
  const IS_PAUSED = 4;
  const hasAnimated = (target) => (target[$P] & HAS_ANIMATED) > 0;
  const isAnimating = (target) => (target[$P] & IS_ANIMATING) > 0;
  const isPaused = (target) => (target[$P] & IS_PAUSED) > 0;
  const setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
  const setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;
  class SpringValue extends FrameValue {
    constructor(arg1, arg2) {
      super();
      this.key = void 0;
      this.animation = new Animation();
      this.queue = void 0;
      this.defaultProps = {};
      this._state = {
        paused: false,
        delayed: false,
        pauseQueue: /* @__PURE__ */ new Set(),
        resumeQueue: /* @__PURE__ */ new Set(),
        timeouts: /* @__PURE__ */ new Set()
      };
      this._pendingCalls = /* @__PURE__ */ new Set();
      this._lastCallId = 0;
      this._lastToId = 0;
      this._memoizedDuration = 0;
      if (!is.und(arg1) || !is.und(arg2)) {
        const props = is.obj(arg1) ? _extends$2({}, arg1) : _extends$2({}, arg2, {
          from: arg1
        });
        if (is.und(props.default)) {
          props.default = true;
        }
        this.start(props);
      }
    }
    get idle() {
      return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
    }
    get goal() {
      return getFluidValue(this.animation.to);
    }
    get velocity() {
      const node = getAnimated(this);
      return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node2) => node2.lastVelocity || 0);
    }
    get hasAnimated() {
      return hasAnimated(this);
    }
    get isAnimating() {
      return isAnimating(this);
    }
    get isPaused() {
      return isPaused(this);
    }
    get isDelayed() {
      return this._state.delayed;
    }
    advance(dt) {
      let idle = true;
      let changed = false;
      const anim = this.animation;
      let {
        config: config2,
        toValues
      } = anim;
      const payload = getPayload(anim.to);
      if (!payload && hasFluidValue(anim.to)) {
        toValues = toArray$3(getFluidValue(anim.to));
      }
      anim.values.forEach((node2, i2) => {
        if (node2.done)
          return;
        const to2 = node2.constructor == AnimatedString ? 1 : payload ? payload[i2].lastPosition : toValues[i2];
        let finished = anim.immediate;
        let position = to2;
        if (!finished) {
          position = node2.lastPosition;
          if (config2.tension <= 0) {
            node2.done = true;
            return;
          }
          let elapsed = node2.elapsedTime += dt;
          const from = anim.fromValues[i2];
          const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config2.velocity) ? config2.velocity[i2] : config2.velocity;
          let velocity;
          const precision = config2.precision || (from == to2 ? 5e-3 : Math.min(1, Math.abs(to2 - from) * 1e-3));
          if (!is.und(config2.duration)) {
            let p = 1;
            if (config2.duration > 0) {
              if (this._memoizedDuration !== config2.duration) {
                this._memoizedDuration = config2.duration;
                if (node2.durationProgress > 0) {
                  node2.elapsedTime = config2.duration * node2.durationProgress;
                  elapsed = node2.elapsedTime += dt;
                }
              }
              p = (config2.progress || 0) + elapsed / this._memoizedDuration;
              p = p > 1 ? 1 : p < 0 ? 0 : p;
              node2.durationProgress = p;
            }
            position = from + config2.easing(p) * (to2 - from);
            velocity = (position - node2.lastPosition) / dt;
            finished = p == 1;
          } else if (config2.decay) {
            const decay = config2.decay === true ? 0.998 : config2.decay;
            const e2 = Math.exp(-(1 - decay) * elapsed);
            position = from + v0 / (1 - decay) * (1 - e2);
            finished = Math.abs(node2.lastPosition - position) <= precision;
            velocity = v0 * e2;
          } else {
            velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
            const restVelocity = config2.restVelocity || precision / 10;
            const bounceFactor = config2.clamp ? 0 : config2.bounce;
            const canBounce = !is.und(bounceFactor);
            const isGrowing = from == to2 ? node2.v0 > 0 : from < to2;
            let isMoving;
            let isBouncing = false;
            const step = 1;
            const numSteps = Math.ceil(dt / step);
            for (let n2 = 0; n2 < numSteps; ++n2) {
              isMoving = Math.abs(velocity) > restVelocity;
              if (!isMoving) {
                finished = Math.abs(to2 - position) <= precision;
                if (finished) {
                  break;
                }
              }
              if (canBounce) {
                isBouncing = position == to2 || position > to2 == isGrowing;
                if (isBouncing) {
                  velocity = -velocity * bounceFactor;
                  position = to2;
                }
              }
              const springForce = -config2.tension * 1e-6 * (position - to2);
              const dampingForce = -config2.friction * 1e-3 * velocity;
              const acceleration = (springForce + dampingForce) / config2.mass;
              velocity = velocity + acceleration * step;
              position = position + velocity * step;
            }
          }
          node2.lastVelocity = velocity;
          if (Number.isNaN(position)) {
            console.warn(`Got NaN while animating:`, this);
            finished = true;
          }
        }
        if (payload && !payload[i2].done) {
          finished = false;
        }
        if (finished) {
          node2.done = true;
        } else {
          idle = false;
        }
        if (node2.setValue(position, config2.round)) {
          changed = true;
        }
      });
      const node = getAnimated(this);
      const currVal = node.getValue();
      if (idle) {
        const finalVal = getFluidValue(anim.to);
        if ((currVal !== finalVal || changed) && !config2.decay) {
          node.setValue(finalVal);
          this._onChange(finalVal);
        } else if (changed && config2.decay) {
          this._onChange(currVal);
        }
        this._stop();
      } else if (changed) {
        this._onChange(currVal);
      }
    }
    set(value) {
      raf.batchedUpdates(() => {
        this._stop();
        this._focus(value);
        this._set(value);
      });
      return this;
    }
    pause() {
      this._update({
        pause: true
      });
    }
    resume() {
      this._update({
        pause: false
      });
    }
    finish() {
      if (isAnimating(this)) {
        const {
          to: to2,
          config: config2
        } = this.animation;
        raf.batchedUpdates(() => {
          this._onStart();
          if (!config2.decay) {
            this._set(to2, false);
          }
          this._stop();
        });
      }
      return this;
    }
    update(props) {
      const queue = this.queue || (this.queue = []);
      queue.push(props);
      return this;
    }
    start(to2, arg2) {
      let queue;
      if (!is.und(to2)) {
        queue = [is.obj(to2) ? to2 : _extends$2({}, arg2, {
          to: to2
        })];
      } else {
        queue = this.queue || [];
        this.queue = [];
      }
      return Promise.all(queue.map((props) => {
        const up = this._update(props);
        return up;
      })).then((results) => getCombinedResult(this, results));
    }
    stop(cancel) {
      const {
        to: to2
      } = this.animation;
      this._focus(this.get());
      stopAsync(this._state, cancel && this._lastCallId);
      raf.batchedUpdates(() => this._stop(to2, cancel));
      return this;
    }
    reset() {
      this._update({
        reset: true
      });
    }
    eventObserved(event) {
      if (event.type == "change") {
        this._start();
      } else if (event.type == "priority") {
        this.priority = event.priority + 1;
      }
    }
    _prepareNode(props) {
      const key = this.key || "";
      let {
        to: to2,
        from
      } = props;
      to2 = is.obj(to2) ? to2[key] : to2;
      if (to2 == null || isAsyncTo(to2)) {
        to2 = void 0;
      }
      from = is.obj(from) ? from[key] : from;
      if (from == null) {
        from = void 0;
      }
      const range2 = {
        to: to2,
        from
      };
      if (!hasAnimated(this)) {
        if (props.reverse)
          [to2, from] = [from, to2];
        from = getFluidValue(from);
        if (!is.und(from)) {
          this._set(from);
        } else if (!getAnimated(this)) {
          this._set(to2);
        }
      }
      return range2;
    }
    _update(_ref, isLoop) {
      let props = _extends$2({}, _ref);
      const {
        key,
        defaultProps: defaultProps2
      } = this;
      if (props.default)
        Object.assign(defaultProps2, getDefaultProps(props, (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value));
      mergeActiveFn(this, props, "onProps");
      sendEvent(this, "onProps", props, this);
      const range2 = this._prepareNode(props);
      if (Object.isFrozen(this)) {
        throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
      }
      const state = this._state;
      return scheduleProps(++this._lastCallId, {
        key,
        props,
        defaultProps: defaultProps2,
        state,
        actions: {
          pause: () => {
            if (!isPaused(this)) {
              setPausedBit(this, true);
              flushCalls(state.pauseQueue);
              sendEvent(this, "onPause", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
            }
          },
          resume: () => {
            if (isPaused(this)) {
              setPausedBit(this, false);
              if (isAnimating(this)) {
                this._resume();
              }
              flushCalls(state.resumeQueue);
              sendEvent(this, "onResume", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
            }
          },
          start: this._merge.bind(this, range2)
        }
      }).then((result) => {
        if (props.loop && result.finished && !(isLoop && result.noop)) {
          const nextProps = createLoopUpdate(props);
          if (nextProps) {
            return this._update(nextProps, true);
          }
        }
        return result;
      });
    }
    _merge(range2, props, resolve) {
      if (props.cancel) {
        this.stop(true);
        return resolve(getCancelledResult(this));
      }
      const hasToProp = !is.und(range2.to);
      const hasFromProp = !is.und(range2.from);
      if (hasToProp || hasFromProp) {
        if (props.callId > this._lastToId) {
          this._lastToId = props.callId;
        } else {
          return resolve(getCancelledResult(this));
        }
      }
      const {
        key,
        defaultProps: defaultProps2,
        animation: anim
      } = this;
      const {
        to: prevTo,
        from: prevFrom
      } = anim;
      let {
        to: to2 = prevTo,
        from = prevFrom
      } = range2;
      if (hasFromProp && !hasToProp && (!props.default || is.und(to2))) {
        to2 = from;
      }
      if (props.reverse)
        [to2, from] = [from, to2];
      const hasFromChanged = !isEqual(from, prevFrom);
      if (hasFromChanged) {
        anim.from = from;
      }
      from = getFluidValue(from);
      const hasToChanged = !isEqual(to2, prevTo);
      if (hasToChanged) {
        this._focus(to2);
      }
      const hasAsyncTo = isAsyncTo(props.to);
      const {
        config: config2
      } = anim;
      const {
        decay,
        velocity
      } = config2;
      if (hasToProp || hasFromProp) {
        config2.velocity = 0;
      }
      if (props.config && !hasAsyncTo) {
        mergeConfig(config2, callProp(props.config, key), props.config !== defaultProps2.config ? callProp(defaultProps2.config, key) : void 0);
      }
      let node = getAnimated(this);
      if (!node || is.und(to2)) {
        return resolve(getFinishedResult(this, true));
      }
      const reset = is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key);
      const value = reset ? from : this.get();
      const goal = computeGoal(to2);
      const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
      const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps2.immediate || props.immediate, key));
      if (hasToChanged) {
        const nodeType = getAnimatedType(to2);
        if (nodeType !== node.constructor) {
          if (immediate) {
            node = this._set(goal);
          } else
            throw Error(`Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`);
        }
      }
      const goalType = node.constructor;
      let started = hasFluidValue(to2);
      let finished = false;
      if (!started) {
        const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
        if (hasToChanged || hasValueChanged) {
          finished = isEqual(computeGoal(value), goal);
          started = !finished;
        }
        if (!isEqual(anim.immediate, immediate) && !immediate || !isEqual(config2.decay, decay) || !isEqual(config2.velocity, velocity)) {
          started = true;
        }
      }
      if (finished && isAnimating(this)) {
        if (anim.changed && !reset) {
          started = true;
        } else if (!started) {
          this._stop(prevTo);
        }
      }
      if (!hasAsyncTo) {
        if (started || hasFluidValue(prevTo)) {
          anim.values = node.getPayload();
          anim.toValues = hasFluidValue(to2) ? null : goalType == AnimatedString ? [1] : toArray$3(goal);
        }
        if (anim.immediate != immediate) {
          anim.immediate = immediate;
          if (!immediate && !reset) {
            this._set(prevTo);
          }
        }
        if (started) {
          const {
            onRest
          } = anim;
          each(ACTIVE_EVENTS, (type) => mergeActiveFn(this, props, type));
          const result = getFinishedResult(this, checkFinished(this, prevTo));
          flushCalls(this._pendingCalls, result);
          this._pendingCalls.add(resolve);
          if (anim.changed)
            raf.batchedUpdates(() => {
              anim.changed = !reset;
              onRest == null ? void 0 : onRest(result, this);
              if (reset) {
                callProp(defaultProps2.onRest, result);
              } else {
                anim.onStart == null ? void 0 : anim.onStart(result, this);
              }
            });
        }
      }
      if (reset) {
        this._set(value);
      }
      if (hasAsyncTo) {
        resolve(runAsync(props.to, props, this._state, this));
      } else if (started) {
        this._start();
      } else if (isAnimating(this) && !hasToChanged) {
        this._pendingCalls.add(resolve);
      } else {
        resolve(getNoopResult(value));
      }
    }
    _focus(value) {
      const anim = this.animation;
      if (value !== anim.to) {
        if (getFluidObservers(this)) {
          this._detach();
        }
        anim.to = value;
        if (getFluidObservers(this)) {
          this._attach();
        }
      }
    }
    _attach() {
      let priority2 = 0;
      const {
        to: to2
      } = this.animation;
      if (hasFluidValue(to2)) {
        addFluidObserver(to2, this);
        if (isFrameValue(to2)) {
          priority2 = to2.priority + 1;
        }
      }
      this.priority = priority2;
    }
    _detach() {
      const {
        to: to2
      } = this.animation;
      if (hasFluidValue(to2)) {
        removeFluidObserver(to2, this);
      }
    }
    _set(arg, idle = true) {
      const value = getFluidValue(arg);
      if (!is.und(value)) {
        const oldNode = getAnimated(this);
        if (!oldNode || !isEqual(value, oldNode.getValue())) {
          const nodeType = getAnimatedType(value);
          if (!oldNode || oldNode.constructor != nodeType) {
            setAnimated(this, nodeType.create(value));
          } else {
            oldNode.setValue(value);
          }
          if (oldNode) {
            raf.batchedUpdates(() => {
              this._onChange(value, idle);
            });
          }
        }
      }
      return getAnimated(this);
    }
    _onStart() {
      const anim = this.animation;
      if (!anim.changed) {
        anim.changed = true;
        sendEvent(this, "onStart", getFinishedResult(this, checkFinished(this, anim.to)), this);
      }
    }
    _onChange(value, idle) {
      if (!idle) {
        this._onStart();
        callProp(this.animation.onChange, value, this);
      }
      callProp(this.defaultProps.onChange, value, this);
      super._onChange(value, idle);
    }
    _start() {
      const anim = this.animation;
      getAnimated(this).reset(getFluidValue(anim.to));
      if (!anim.immediate) {
        anim.fromValues = anim.values.map((node) => node.lastPosition);
      }
      if (!isAnimating(this)) {
        setActiveBit(this, true);
        if (!isPaused(this)) {
          this._resume();
        }
      }
    }
    _resume() {
      if (globals.skipAnimation) {
        this.finish();
      } else {
        frameLoop.start(this);
      }
    }
    _stop(goal, cancel) {
      if (isAnimating(this)) {
        setActiveBit(this, false);
        const anim = this.animation;
        each(anim.values, (node) => {
          node.done = true;
        });
        if (anim.toValues) {
          anim.onChange = anim.onPause = anim.onResume = void 0;
        }
        callFluidObservers(this, {
          type: "idle",
          parent: this
        });
        const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal != null ? goal : anim.to));
        flushCalls(this._pendingCalls, result);
        if (anim.changed) {
          anim.changed = false;
          sendEvent(this, "onRest", result, this);
        }
      }
    }
  }
  function checkFinished(target, to2) {
    const goal = computeGoal(to2);
    const value = computeGoal(target.get());
    return isEqual(value, goal);
  }
  function createLoopUpdate(props, loop2 = props.loop, to2 = props.to) {
    let loopRet = callProp(loop2);
    if (loopRet) {
      const overrides = loopRet !== true && inferTo(loopRet);
      const reverse = (overrides || props).reverse;
      const reset = !overrides || overrides.reset;
      return createUpdate(_extends$2({}, props, {
        loop: loop2,
        default: false,
        pause: void 0,
        to: !reverse || isAsyncTo(to2) ? to2 : void 0,
        from: reset ? props.from : void 0,
        reset
      }, overrides));
    }
  }
  function createUpdate(props) {
    const {
      to: to2,
      from
    } = props = inferTo(props);
    const keys2 = /* @__PURE__ */ new Set();
    if (is.obj(to2))
      findDefined(to2, keys2);
    if (is.obj(from))
      findDefined(from, keys2);
    props.keys = keys2.size ? Array.from(keys2) : null;
    return props;
  }
  function declareUpdate(props) {
    const update2 = createUpdate(props);
    if (is.und(update2.default)) {
      update2.default = getDefaultProps(update2);
    }
    return update2;
  }
  function findDefined(values, keys2) {
    eachProp(values, (value, key) => value != null && keys2.add(key));
  }
  const ACTIVE_EVENTS = ["onStart", "onRest", "onChange", "onPause", "onResume"];
  function mergeActiveFn(target, props, type) {
    target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
  }
  function sendEvent(target, type, ...args) {
    var _target$animation$typ, _target$animation, _target$defaultProps$, _target$defaultProps;
    (_target$animation$typ = (_target$animation = target.animation)[type]) == null ? void 0 : _target$animation$typ.call(_target$animation, ...args);
    (_target$defaultProps$ = (_target$defaultProps = target.defaultProps)[type]) == null ? void 0 : _target$defaultProps$.call(_target$defaultProps, ...args);
  }
  const BATCHED_EVENTS = ["onStart", "onChange", "onRest"];
  let nextId = 1;
  let Controller$1 = class Controller {
    constructor(props, flush2) {
      this.id = nextId++;
      this.springs = {};
      this.queue = [];
      this.ref = void 0;
      this._flush = void 0;
      this._initialProps = void 0;
      this._lastAsyncId = 0;
      this._active = /* @__PURE__ */ new Set();
      this._changed = /* @__PURE__ */ new Set();
      this._started = false;
      this._item = void 0;
      this._state = {
        paused: false,
        pauseQueue: /* @__PURE__ */ new Set(),
        resumeQueue: /* @__PURE__ */ new Set(),
        timeouts: /* @__PURE__ */ new Set()
      };
      this._events = {
        onStart: /* @__PURE__ */ new Map(),
        onChange: /* @__PURE__ */ new Map(),
        onRest: /* @__PURE__ */ new Map()
      };
      this._onFrame = this._onFrame.bind(this);
      if (flush2) {
        this._flush = flush2;
      }
      if (props) {
        this.start(_extends$2({
          default: true
        }, props));
      }
    }
    get idle() {
      return !this._state.asyncTo && Object.values(this.springs).every((spring) => {
        return spring.idle && !spring.isDelayed && !spring.isPaused;
      });
    }
    get item() {
      return this._item;
    }
    set item(item) {
      this._item = item;
    }
    get() {
      const values = {};
      this.each((spring, key) => values[key] = spring.get());
      return values;
    }
    set(values) {
      for (const key in values) {
        const value = values[key];
        if (!is.und(value)) {
          this.springs[key].set(value);
        }
      }
    }
    update(props) {
      if (props) {
        this.queue.push(createUpdate(props));
      }
      return this;
    }
    start(props) {
      let {
        queue
      } = this;
      if (props) {
        queue = toArray$3(props).map(createUpdate);
      } else {
        this.queue = [];
      }
      if (this._flush) {
        return this._flush(this, queue);
      }
      prepareKeys(this, queue);
      return flushUpdateQueue(this, queue);
    }
    stop(arg, keys2) {
      if (arg !== !!arg) {
        keys2 = arg;
      }
      if (keys2) {
        const springs = this.springs;
        each(toArray$3(keys2), (key) => springs[key].stop(!!arg));
      } else {
        stopAsync(this._state, this._lastAsyncId);
        this.each((spring) => spring.stop(!!arg));
      }
      return this;
    }
    pause(keys2) {
      if (is.und(keys2)) {
        this.start({
          pause: true
        });
      } else {
        const springs = this.springs;
        each(toArray$3(keys2), (key) => springs[key].pause());
      }
      return this;
    }
    resume(keys2) {
      if (is.und(keys2)) {
        this.start({
          pause: false
        });
      } else {
        const springs = this.springs;
        each(toArray$3(keys2), (key) => springs[key].resume());
      }
      return this;
    }
    each(iterator) {
      eachProp(this.springs, iterator);
    }
    _onFrame() {
      const {
        onStart,
        onChange,
        onRest
      } = this._events;
      const active = this._active.size > 0;
      const changed = this._changed.size > 0;
      if (active && !this._started || changed && !this._started) {
        this._started = true;
        flush(onStart, ([onStart2, result]) => {
          result.value = this.get();
          onStart2(result, this, this._item);
        });
      }
      const idle = !active && this._started;
      const values = changed || idle && onRest.size ? this.get() : null;
      if (changed && onChange.size) {
        flush(onChange, ([onChange2, result]) => {
          result.value = values;
          onChange2(result, this, this._item);
        });
      }
      if (idle) {
        this._started = false;
        flush(onRest, ([onRest2, result]) => {
          result.value = values;
          onRest2(result, this, this._item);
        });
      }
    }
    eventObserved(event) {
      if (event.type == "change") {
        this._changed.add(event.parent);
        if (!event.idle) {
          this._active.add(event.parent);
        }
      } else if (event.type == "idle") {
        this._active.delete(event.parent);
      } else
        return;
      raf.onFrame(this._onFrame);
    }
  };
  function flushUpdateQueue(ctrl, queue) {
    return Promise.all(queue.map((props) => flushUpdate(ctrl, props))).then((results) => getCombinedResult(ctrl, results));
  }
  async function flushUpdate(ctrl, props, isLoop) {
    const {
      keys: keys2,
      to: to2,
      from,
      loop: loop2,
      onRest,
      onResolve
    } = props;
    const defaults2 = is.obj(props.default) && props.default;
    if (loop2) {
      props.loop = false;
    }
    if (to2 === false)
      props.to = null;
    if (from === false)
      props.from = null;
    const asyncTo = is.arr(to2) || is.fun(to2) ? to2 : void 0;
    if (asyncTo) {
      props.to = void 0;
      props.onRest = void 0;
      if (defaults2) {
        defaults2.onRest = void 0;
      }
    } else {
      each(BATCHED_EVENTS, (key) => {
        const handler = props[key];
        if (is.fun(handler)) {
          const queue = ctrl["_events"][key];
          props[key] = ({
            finished,
            cancelled
          }) => {
            const result2 = queue.get(handler);
            if (result2) {
              if (!finished)
                result2.finished = false;
              if (cancelled)
                result2.cancelled = true;
            } else {
              queue.set(handler, {
                value: null,
                finished: finished || false,
                cancelled: cancelled || false
              });
            }
          };
          if (defaults2) {
            defaults2[key] = props[key];
          }
        }
      });
    }
    const state = ctrl["_state"];
    if (props.pause === !state.paused) {
      state.paused = props.pause;
      flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
    } else if (state.paused) {
      props.pause = true;
    }
    const promises = (keys2 || Object.keys(ctrl.springs)).map((key) => ctrl.springs[key].start(props));
    const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
    if (asyncTo || cancel && state.asyncId) {
      promises.push(scheduleProps(++ctrl["_lastAsyncId"], {
        props,
        state,
        actions: {
          pause: noop$1,
          resume: noop$1,
          start(props2, resolve) {
            if (cancel) {
              stopAsync(state, ctrl["_lastAsyncId"]);
              resolve(getCancelledResult(ctrl));
            } else {
              props2.onRest = onRest;
              resolve(runAsync(asyncTo, props2, state, ctrl));
            }
          }
        }
      }));
    }
    if (state.paused) {
      await new Promise((resume) => {
        state.resumeQueue.add(resume);
      });
    }
    const result = getCombinedResult(ctrl, await Promise.all(promises));
    if (loop2 && result.finished && !(isLoop && result.noop)) {
      const nextProps = createLoopUpdate(props, loop2, to2);
      if (nextProps) {
        prepareKeys(ctrl, [nextProps]);
        return flushUpdate(ctrl, nextProps, true);
      }
    }
    if (onResolve) {
      raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
    }
    return result;
  }
  function getSprings(ctrl, props) {
    const springs = _extends$2({}, ctrl.springs);
    if (props) {
      each(toArray$3(props), (props2) => {
        if (is.und(props2.keys)) {
          props2 = createUpdate(props2);
        }
        if (!is.obj(props2.to)) {
          props2 = _extends$2({}, props2, {
            to: void 0
          });
        }
        prepareSprings(springs, props2, (key) => {
          return createSpring(key);
        });
      });
    }
    setSprings(ctrl, springs);
    return springs;
  }
  function setSprings(ctrl, springs) {
    eachProp(springs, (spring, key) => {
      if (!ctrl.springs[key]) {
        ctrl.springs[key] = spring;
        addFluidObserver(spring, ctrl);
      }
    });
  }
  function createSpring(key, observer) {
    const spring = new SpringValue();
    spring.key = key;
    if (observer) {
      addFluidObserver(spring, observer);
    }
    return spring;
  }
  function prepareSprings(springs, props, create2) {
    if (props.keys) {
      each(props.keys, (key) => {
        const spring = springs[key] || (springs[key] = create2(key));
        spring["_prepareNode"](props);
      });
    }
  }
  function prepareKeys(ctrl, queue) {
    each(queue, (props) => {
      prepareSprings(ctrl.springs, props, (key) => {
        return createSpring(key, ctrl);
      });
    });
  }
  function _objectWithoutPropertiesLoose$3(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  const _excluded$6 = ["children"];
  const SpringContext = (_ref) => {
    let {
      children
    } = _ref, props = _objectWithoutPropertiesLoose$3(_ref, _excluded$6);
    const inherited = React$1.useContext(ctx);
    const pause = props.pause || !!inherited.pause, immediate = props.immediate || !!inherited.immediate;
    props = useMemoOne(() => ({
      pause,
      immediate
    }), [pause, immediate]);
    const {
      Provider
    } = ctx;
    return React__namespace.createElement(Provider, {
      value: props
    }, children);
  };
  const ctx = makeContext(SpringContext, {});
  SpringContext.Provider = ctx.Provider;
  SpringContext.Consumer = ctx.Consumer;
  function makeContext(target, init) {
    Object.assign(target, React__namespace.createContext(init));
    target.Provider._context = target;
    target.Consumer._context = target;
    return target;
  }
  const SpringRef = () => {
    const current = [];
    const SpringRef2 = function SpringRef3(props) {
      deprecateDirectCall();
      const results = [];
      each(current, (ctrl, i2) => {
        if (is.und(props)) {
          results.push(ctrl.start());
        } else {
          const update2 = _getProps(props, ctrl, i2);
          if (update2) {
            results.push(ctrl.start(update2));
          }
        }
      });
      return results;
    };
    SpringRef2.current = current;
    SpringRef2.add = function(ctrl) {
      if (!current.includes(ctrl)) {
        current.push(ctrl);
      }
    };
    SpringRef2.delete = function(ctrl) {
      const i2 = current.indexOf(ctrl);
      if (~i2)
        current.splice(i2, 1);
    };
    SpringRef2.pause = function() {
      each(current, (ctrl) => ctrl.pause(...arguments));
      return this;
    };
    SpringRef2.resume = function() {
      each(current, (ctrl) => ctrl.resume(...arguments));
      return this;
    };
    SpringRef2.set = function(values) {
      each(current, (ctrl) => ctrl.set(values));
    };
    SpringRef2.start = function(props) {
      const results = [];
      each(current, (ctrl, i2) => {
        if (is.und(props)) {
          results.push(ctrl.start());
        } else {
          const update2 = this._getProps(props, ctrl, i2);
          if (update2) {
            results.push(ctrl.start(update2));
          }
        }
      });
      return results;
    };
    SpringRef2.stop = function() {
      each(current, (ctrl) => ctrl.stop(...arguments));
      return this;
    };
    SpringRef2.update = function(props) {
      each(current, (ctrl, i2) => ctrl.update(this._getProps(props, ctrl, i2)));
      return this;
    };
    const _getProps = function _getProps2(arg, ctrl, index2) {
      return is.fun(arg) ? arg(index2, ctrl) : arg;
    };
    SpringRef2._getProps = _getProps;
    return SpringRef2;
  };
  function useSprings(length, props, deps) {
    const propsFn = is.fun(props) && props;
    if (propsFn && !deps)
      deps = [];
    const ref = React$1.useMemo(() => propsFn || arguments.length == 3 ? SpringRef() : void 0, []);
    const layoutId = React$1.useRef(0);
    const forceUpdate = useForceUpdate();
    const state = React$1.useMemo(() => ({
      ctrls: [],
      queue: [],
      flush(ctrl, updates2) {
        const springs2 = getSprings(ctrl, updates2);
        const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key) => !ctrl.springs[key]);
        return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise((resolve) => {
          setSprings(ctrl, springs2);
          state.queue.push(() => {
            resolve(flushUpdateQueue(ctrl, updates2));
          });
          forceUpdate();
        });
      }
    }), []);
    const ctrls = React$1.useRef([...state.ctrls]);
    const updates = [];
    const prevLength = usePrev(length) || 0;
    React$1.useMemo(() => {
      each(ctrls.current.slice(length, prevLength), (ctrl) => {
        detachRefs(ctrl, ref);
        ctrl.stop(true);
      });
      ctrls.current.length = length;
      declareUpdates(prevLength, length);
    }, [length]);
    React$1.useMemo(() => {
      declareUpdates(0, Math.min(prevLength, length));
    }, deps);
    function declareUpdates(startIndex, endIndex) {
      for (let i2 = startIndex; i2 < endIndex; i2++) {
        const ctrl = ctrls.current[i2] || (ctrls.current[i2] = new Controller$1(null, state.flush));
        const update2 = propsFn ? propsFn(i2, ctrl) : props[i2];
        if (update2) {
          updates[i2] = declareUpdate(update2);
        }
      }
    }
    const springs = ctrls.current.map((ctrl, i2) => getSprings(ctrl, updates[i2]));
    const context = React$1.useContext(SpringContext);
    const prevContext = usePrev(context);
    const hasContext = context !== prevContext && hasProps(context);
    useIsomorphicLayoutEffect(() => {
      layoutId.current++;
      state.ctrls = ctrls.current;
      const {
        queue
      } = state;
      if (queue.length) {
        state.queue = [];
        each(queue, (cb) => cb());
      }
      each(ctrls.current, (ctrl, i2) => {
        ref == null ? void 0 : ref.add(ctrl);
        if (hasContext) {
          ctrl.start({
            default: context
          });
        }
        const update2 = updates[i2];
        if (update2) {
          replaceRef(ctrl, update2.ref);
          if (ctrl.ref) {
            ctrl.queue.push(update2);
          } else {
            ctrl.start(update2);
          }
        }
      });
    });
    useOnce(() => () => {
      each(state.ctrls, (ctrl) => ctrl.stop(true));
    });
    const values = springs.map((x) => _extends$2({}, x));
    return ref ? [values, ref] : values;
  }
  function useSpring(props, deps) {
    const isFn = is.fun(props);
    const [[values], ref] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
    return isFn || arguments.length == 2 ? [values, ref] : values;
  }
  let TransitionPhase;
  (function(TransitionPhase2) {
    TransitionPhase2["MOUNT"] = "mount";
    TransitionPhase2["ENTER"] = "enter";
    TransitionPhase2["UPDATE"] = "update";
    TransitionPhase2["LEAVE"] = "leave";
  })(TransitionPhase || (TransitionPhase = {}));
  class Interpolation extends FrameValue {
    constructor(source, args) {
      super();
      this.key = void 0;
      this.idle = true;
      this.calc = void 0;
      this._active = /* @__PURE__ */ new Set();
      this.source = source;
      this.calc = createInterpolator(...args);
      const value = this._get();
      const nodeType = getAnimatedType(value);
      setAnimated(this, nodeType.create(value));
    }
    advance(_dt) {
      const value = this._get();
      const oldValue = this.get();
      if (!isEqual(value, oldValue)) {
        getAnimated(this).setValue(value);
        this._onChange(value, this.idle);
      }
      if (!this.idle && checkIdle(this._active)) {
        becomeIdle(this);
      }
    }
    _get() {
      const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray$3(getFluidValue(this.source));
      return this.calc(...inputs);
    }
    _start() {
      if (this.idle && !checkIdle(this._active)) {
        this.idle = false;
        each(getPayload(this), (node) => {
          node.done = false;
        });
        if (globals.skipAnimation) {
          raf.batchedUpdates(() => this.advance());
          becomeIdle(this);
        } else {
          frameLoop.start(this);
        }
      }
    }
    _attach() {
      let priority2 = 1;
      each(toArray$3(this.source), (source) => {
        if (hasFluidValue(source)) {
          addFluidObserver(source, this);
        }
        if (isFrameValue(source)) {
          if (!source.idle) {
            this._active.add(source);
          }
          priority2 = Math.max(priority2, source.priority + 1);
        }
      });
      this.priority = priority2;
      this._start();
    }
    _detach() {
      each(toArray$3(this.source), (source) => {
        if (hasFluidValue(source)) {
          removeFluidObserver(source, this);
        }
      });
      this._active.clear();
      becomeIdle(this);
    }
    eventObserved(event) {
      if (event.type == "change") {
        if (event.idle) {
          this.advance();
        } else {
          this._active.add(event.parent);
          this._start();
        }
      } else if (event.type == "idle") {
        this._active.delete(event.parent);
      } else if (event.type == "priority") {
        this.priority = toArray$3(this.source).reduce((highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1), 0);
      }
    }
  }
  function isIdle(source) {
    return source.idle !== false;
  }
  function checkIdle(active) {
    return !active.size || Array.from(active).every(isIdle);
  }
  function becomeIdle(self2) {
    if (!self2.idle) {
      self2.idle = true;
      each(getPayload(self2), (node) => {
        node.done = true;
      });
      callFluidObservers(self2, {
        type: "idle",
        parent: self2
      });
    }
  }
  const to = (source, ...args) => new Interpolation(source, args);
  globals.assign({
    createStringInterpolator,
    to: (source, args) => new Interpolation(source, args)
  });
  function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  const _excluded$2$1 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"];
  const isCustomPropRE = /^--/;
  function dangerousStyleValue(name, value) {
    if (value == null || typeof value === "boolean" || value === "")
      return "";
    if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]))
      return value + "px";
    return ("" + value).trim();
  }
  const attributeCache = {};
  function applyAnimatedValues(instance, props) {
    if (!instance.nodeType || !instance.setAttribute) {
      return false;
    }
    const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
    const _ref = props, {
      style,
      children,
      scrollTop,
      scrollLeft,
      viewBox
    } = _ref, attributes = _objectWithoutPropertiesLoose$2(_ref, _excluded$2$1);
    const values = Object.values(attributes);
    const names = Object.keys(attributes).map((name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, (n2) => "-" + n2.toLowerCase())));
    if (children !== void 0) {
      instance.textContent = children;
    }
    for (let name in style) {
      if (style.hasOwnProperty(name)) {
        const value = dangerousStyleValue(name, style[name]);
        if (isCustomPropRE.test(name)) {
          instance.style.setProperty(name, value);
        } else {
          instance.style[name] = value;
        }
      }
    }
    names.forEach((name, i2) => {
      instance.setAttribute(name, values[i2]);
    });
    if (scrollTop !== void 0) {
      instance.scrollTop = scrollTop;
    }
    if (scrollLeft !== void 0) {
      instance.scrollLeft = scrollLeft;
    }
    if (viewBox !== void 0) {
      instance.setAttribute("viewBox", viewBox);
    }
  }
  let isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  const prefixKey = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
  const prefixes = ["Webkit", "Ms", "Moz", "O"];
  isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
    prefixes.forEach((prefix2) => acc[prefixKey(prefix2, prop)] = acc[prop]);
    return acc;
  }, isUnitlessNumber);
  const _excluded$1$1 = ["x", "y", "z"];
  const domTransforms = /^(matrix|translate|scale|rotate|skew)/;
  const pxTransforms = /^(translate)/;
  const degTransforms = /^(rotate|skew)/;
  const addUnit = (value, unit) => is.num(value) && value !== 0 ? value + unit : value;
  const isValueIdentity = (value, id) => is.arr(value) ? value.every((v) => isValueIdentity(v, id)) : is.num(value) ? value === id : parseFloat(value) === id;
  class AnimatedStyle extends AnimatedObject {
    constructor(_ref) {
      let {
        x,
        y,
        z
      } = _ref, style = _objectWithoutPropertiesLoose$2(_ref, _excluded$1$1);
      const inputs = [];
      const transforms = [];
      if (x || y || z) {
        inputs.push([x || 0, y || 0, z || 0]);
        transforms.push((xyz) => [`translate3d(${xyz.map((v) => addUnit(v, "px")).join(",")})`, isValueIdentity(xyz, 0)]);
      }
      eachProp(style, (value, key) => {
        if (key === "transform") {
          inputs.push([value || ""]);
          transforms.push((transform) => [transform, transform === ""]);
        } else if (domTransforms.test(key)) {
          delete style[key];
          if (is.und(value))
            return;
          const unit = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
          inputs.push(toArray$3(value));
          transforms.push(key === "rotate3d" ? ([x2, y2, z2, deg]) => [`rotate3d(${x2},${y2},${z2},${addUnit(deg, unit)})`, isValueIdentity(deg, 0)] : (input) => [`${key}(${input.map((v) => addUnit(v, unit)).join(",")})`, isValueIdentity(input, key.startsWith("scale") ? 1 : 0)]);
        }
      });
      if (inputs.length) {
        style.transform = new FluidTransform(inputs, transforms);
      }
      super(style);
    }
  }
  class FluidTransform extends FluidValue {
    constructor(inputs, transforms) {
      super();
      this._value = null;
      this.inputs = inputs;
      this.transforms = transforms;
    }
    get() {
      return this._value || (this._value = this._get());
    }
    _get() {
      let transform = "";
      let identity2 = true;
      each(this.inputs, (input, i2) => {
        const arg1 = getFluidValue(input[0]);
        const [t, id] = this.transforms[i2](is.arr(arg1) ? arg1 : input.map(getFluidValue));
        transform += " " + t;
        identity2 = identity2 && id;
      });
      return identity2 ? "none" : transform;
    }
    observerAdded(count) {
      if (count == 1)
        each(this.inputs, (input) => each(input, (value) => hasFluidValue(value) && addFluidObserver(value, this)));
    }
    observerRemoved(count) {
      if (count == 0)
        each(this.inputs, (input) => each(input, (value) => hasFluidValue(value) && removeFluidObserver(value, this)));
    }
    eventObserved(event) {
      if (event.type == "change") {
        this._value = null;
      }
      callFluidObservers(this, event);
    }
  }
  const primitives = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"];
  const _excluded$4 = ["scrollTop", "scrollLeft"];
  globals.assign({
    batchedUpdates: ReactDOM.unstable_batchedUpdates,
    createStringInterpolator,
    colors
  });
  const host = createHost(primitives, {
    applyAnimatedValues,
    createAnimatedStyle: (style) => new AnimatedStyle(style),
    getComponentProps: (_ref) => {
      let props = _objectWithoutPropertiesLoose$2(_ref, _excluded$4);
      return props;
    }
  });
  const animated = host.animated;
  function resolveContainer(getContainer) {
    const container = typeof getContainer === "function" ? getContainer() : getContainer;
    return container || document.body;
  }
  function renderToContainer(getContainer, node) {
    if (canUseDom$1 && getContainer) {
      const container = resolveContainer(getContainer);
      return ReactDOM.createPortal(node, container);
    }
    return node;
  }
  function useInitialized(check) {
    const initializedRef = React$1.useRef(check);
    if (check) {
      initializedRef.current = true;
    }
    return !!initializedRef.current;
  }
  const ShouldRender = (props) => {
    const shouldRender = useShouldRender(props.active, props.forceRender, props.destroyOnClose);
    return shouldRender ? props.children : null;
  };
  function useShouldRender(active, forceRender, destroyOnClose) {
    const initialized = useInitialized(active);
    if (forceRender)
      return true;
    if (active)
      return true;
    if (!initialized)
      return false;
    return !destroyOnClose;
  }
  const eventToPropRecord$1 = {
    "click": "onClick"
  };
  function withStopPropagation(events, element) {
    const props = Object.assign({}, element.props);
    for (const key of events) {
      const prop = eventToPropRecord$1[key];
      props[prop] = function(e2) {
        var _a, _b;
        e2.stopPropagation();
        (_b = (_a = element.props)[prop]) === null || _b === void 0 ? void 0 : _b.call(_a, e2);
      };
    }
    return React$1.cloneElement(element, props);
  }
  const classPrefix$1p = `adm-mask`;
  const opacityRecord = {
    default: 0.55,
    thin: 0.35,
    thick: 0.75
  };
  const colorRecord$4 = {
    black: "0, 0, 0",
    white: "255, 255, 255"
  };
  const defaultProps$15 = {
    visible: true,
    destroyOnClose: false,
    forceRender: false,
    color: "black",
    opacity: "default",
    disableBodyScroll: true,
    getContainer: null,
    stopPropagation: ["click"]
  };
  const Mask = (p) => {
    const props = mergeProps(defaultProps$15, p);
    const {
      locale
    } = useConfig();
    const ref = React$1.useRef(null);
    useLockScroll(ref, props.visible && props.disableBodyScroll);
    const background = React$1.useMemo(() => {
      var _a;
      const opacity2 = (_a = opacityRecord[props.opacity]) !== null && _a !== void 0 ? _a : props.opacity;
      const rgb2 = colorRecord$4[props.color];
      return rgb2 ? `rgba(${rgb2}, ${opacity2})` : props.color;
    }, [props.color, props.opacity]);
    const [active, setActive] = React$1.useState(props.visible);
    const unmountedRef = useUnmountedRef$1();
    const {
      opacity
    } = useSpring({
      opacity: props.visible ? 1 : 0,
      config: {
        precision: 0.01,
        mass: 1,
        tension: 250,
        friction: 30,
        clamp: true
      },
      onStart: () => {
        setActive(true);
      },
      onRest: () => {
        var _a, _b;
        if (unmountedRef.current)
          return;
        setActive(props.visible);
        if (props.visible) {
          (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
        } else {
          (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      }
    });
    const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement(animated.div, {
      className: classPrefix$1p,
      ref,
      "aria-hidden": true,
      style: Object.assign(Object.assign({}, props.style), {
        background,
        opacity,
        display: active ? void 0 : "none"
      }),
      onClick: (e2) => {
        var _a;
        if (e2.target === e2.currentTarget) {
          (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props, e2);
        }
      }
    }, props.onMaskClick && React$1.createElement("div", {
      className: `${classPrefix$1p}-aria-button`,
      role: "button",
      "aria-label": locale.Mask.name,
      onClick: props.onMaskClick
    }), React$1.createElement("div", {
      className: `${classPrefix$1p}-content`
    }, props.children))));
    return React$1.createElement(ShouldRender, {
      active,
      forceRender: props.forceRender,
      destroyOnClose: props.destroyOnClose
    }, renderToContainer(props.getContainer, node));
  };
  function AddOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "AddOutline-AddOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "AddOutline-add"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "AddOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
      id: "AddOutline-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function CheckCircleFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CheckCircleFill-CheckCircleFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CheckCircleFill-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "CheckCircleFill-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
      id: "CheckCircleFill-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function CheckOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CheckOutline-CheckOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CheckOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "CheckOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
      id: "CheckOutline-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function ClockCircleFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "ClockCircleFill-ClockCircleFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "ClockCircleFill-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "ClockCircleFill-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
      id: "ClockCircleFill-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function CloseCircleFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CloseCircleFill-CloseCircleFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CloseCircleFill-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "CloseCircleFill-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
      id: "CloseCircleFill-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function CloseOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CloseOutline-CloseOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "CloseOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "CloseOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
      id: "CloseOutline-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function DownFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "DownFill-DownFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "DownFill-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "DownFill-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
      id: "DownFill-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function DownOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "DownOutline-DownOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", null, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "DownOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
      id: "DownOutline-down",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function ExclamationCircleFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "ExclamationCircleFill-ExclamationCircleFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", null, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "ExclamationCircleFill-矩形",
      fill: "#D76060",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
      id: "ExclamationCircleFill-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function InformationCircleFill(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "InformationCircleFill-InformationCircleFill",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "InformationCircleFill-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "InformationCircleFill-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
      id: "InformationCircleFill-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function LeftOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "LeftOutline-LeftOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "LeftOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "LeftOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
      id: "LeftOutline-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function MinusOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "MinusOutline-MinusOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "MinusOutline-add"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "MinusOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
      id: "MinusOutline-路径",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function QuestionCircleOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "QuestionCircleOutline-QuestionCircleOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "QuestionCircleOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "QuestionCircleOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
      id: "QuestionCircleOutline-形状",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function RightOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "RightOutline-RightOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "RightOutline-RightOutlined"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "RightOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
      id: "RightOutline-right",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function SearchOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "SearchOutline-SearchOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "SearchOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "SearchOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
      id: "SearchOutline-形状",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function SoundOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "SoundOutline-SoundOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "SoundOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "SoundOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
      id: "SoundOutline-形状",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  function TextDeletionOutline(props) {
    return /* @__PURE__ */ React__namespace.createElement("svg", Object.assign({
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props, {
      style: Object.assign({
        verticalAlign: "-0.125em"
      }, props.style),
      className: ["antd-mobile-icon", props.className].filter(Boolean).join(" ")
    }), /* @__PURE__ */ React__namespace.createElement("g", {
      id: "TextDeletionOutline-TextDeletionOutline",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, /* @__PURE__ */ React__namespace.createElement("g", {
      id: "TextDeletionOutline-编组"
    }, /* @__PURE__ */ React__namespace.createElement("rect", {
      id: "TextDeletionOutline-矩形",
      fill: "#FFFFFF",
      opacity: 0,
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }), /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
      id: "TextDeletionOutline-形状结合",
      fill: "currentColor",
      fillRule: "nonzero"
    }))));
  }
  const defaultPopupBaseProps = {
    closeOnMaskClick: false,
    destroyOnClose: false,
    disableBodyScroll: true,
    forceRender: false,
    getContainer: () => document.body,
    mask: true,
    showCloseButton: false,
    stopPropagation: ["click"],
    visible: false
  };
  function useInnerVisible(outerVisible) {
    const [innerVisible, setInnerVisible] = React$1.useState(outerVisible);
    useIsomorphicLayoutEffect$2(() => {
      setInnerVisible(outerVisible);
    }, [outerVisible]);
    return innerVisible;
  }
  function clamp$1(v, min2, max2) {
    return Math.max(min2, Math.min(v, max2));
  }
  const V = {
    toVector(v, fallback) {
      if (v === void 0)
        v = fallback;
      return Array.isArray(v) ? v : [v, v];
    },
    add(v1, v2) {
      return [v1[0] + v2[0], v1[1] + v2[1]];
    },
    sub(v1, v2) {
      return [v1[0] - v2[0], v1[1] - v2[1]];
    },
    addTo(v1, v2) {
      v1[0] += v2[0];
      v1[1] += v2[1];
    },
    subTo(v1, v2) {
      v1[0] -= v2[0];
      v1[1] -= v2[1];
    }
  };
  function rubberband$1(distance, dimension, constant2) {
    if (dimension === 0 || Math.abs(dimension) === Infinity)
      return Math.pow(distance, constant2 * 5);
    return distance * dimension * constant2 / (dimension + constant2 * distance);
  }
  function rubberbandIfOutOfBounds$1(position, min2, max2, constant2 = 0.15) {
    if (constant2 === 0)
      return clamp$1(position, min2, max2);
    if (position < min2)
      return -rubberband$1(min2 - position, max2 - min2, constant2) + min2;
    if (position > max2)
      return +rubberband$1(position - max2, max2 - min2, constant2) + max2;
    return position;
  }
  function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
    const [[X0, X1], [Y0, Y1]] = bounds;
    return [rubberbandIfOutOfBounds$1(Vx, X0, X1, Rx), rubberbandIfOutOfBounds$1(Vy, Y0, Y1, Ry)];
  }
  function _toPrimitive$1(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey$1(arg) {
    var key = _toPrimitive$1(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _defineProperty$1(obj, key, value) {
    key = _toPropertyKey$1(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys$1(e2, r) {
    var t = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e2);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2$1(e2) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
        _defineProperty$1(e2, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
        Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e2;
  }
  const EVENT_TYPE_MAP = {
    pointer: {
      start: "down",
      change: "move",
      end: "up"
    },
    mouse: {
      start: "down",
      change: "move",
      end: "up"
    },
    touch: {
      start: "start",
      change: "move",
      end: "end"
    },
    gesture: {
      start: "start",
      change: "change",
      end: "end"
    }
  };
  function capitalize(string2) {
    if (!string2)
      return "";
    return string2[0].toUpperCase() + string2.slice(1);
  }
  const actionsWithoutCaptureSupported = ["enter", "leave"];
  function hasCapture(capture = false, actionKey) {
    return capture && !actionsWithoutCaptureSupported.includes(actionKey);
  }
  function toHandlerProp(device, action = "", capture = false) {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return "on" + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? "Capture" : "");
  }
  const pointerCaptureEvents = ["gotpointercapture", "lostpointercapture"];
  function parseProp(prop) {
    let eventKey = prop.substring(2).toLowerCase();
    const passive = !!~eventKey.indexOf("passive");
    if (passive)
      eventKey = eventKey.replace("passive", "");
    const captureKey = pointerCaptureEvents.includes(eventKey) ? "capturecapture" : "capture";
    const capture = !!~eventKey.indexOf(captureKey);
    if (capture)
      eventKey = eventKey.replace("capture", "");
    return {
      device: eventKey,
      capture,
      passive
    };
  }
  function toDomEventType(device, action = "") {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return device + actionKey;
  }
  function isTouch(event) {
    return "touches" in event;
  }
  function getPointerType(event) {
    if (isTouch(event))
      return "touch";
    if ("pointerType" in event)
      return event.pointerType;
    return "mouse";
  }
  function getCurrentTargetTouchList(event) {
    return Array.from(event.touches).filter((e2) => {
      var _event$currentTarget, _event$currentTarget$;
      return e2.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 || (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e2.target));
    });
  }
  function getTouchList(event) {
    return event.type === "touchend" || event.type === "touchcancel" ? event.changedTouches : event.targetTouches;
  }
  function getValueEvent(event) {
    return isTouch(event) ? getTouchList(event)[0] : event;
  }
  function distanceAngle(P1, P2) {
    try {
      const dx = P2.clientX - P1.clientX;
      const dy = P2.clientY - P1.clientY;
      const cx = (P2.clientX + P1.clientX) / 2;
      const cy = (P2.clientY + P1.clientY) / 2;
      const distance = Math.hypot(dx, dy);
      const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
      const origin = [cx, cy];
      return {
        angle,
        distance,
        origin
      };
    } catch (_unused) {
    }
    return null;
  }
  function touchIds(event) {
    return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
  }
  function touchDistanceAngle(event, ids) {
    const [P1, P2] = Array.from(event.touches).filter((touch) => ids.includes(touch.identifier));
    return distanceAngle(P1, P2);
  }
  function pointerId(event) {
    const valueEvent = getValueEvent(event);
    return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
  }
  function pointerValues(event) {
    const valueEvent = getValueEvent(event);
    return [valueEvent.clientX, valueEvent.clientY];
  }
  const LINE_HEIGHT = 40;
  const PAGE_HEIGHT = 800;
  function wheelValues(event) {
    let {
      deltaX,
      deltaY,
      deltaMode
    } = event;
    if (deltaMode === 1) {
      deltaX *= LINE_HEIGHT;
      deltaY *= LINE_HEIGHT;
    } else if (deltaMode === 2) {
      deltaX *= PAGE_HEIGHT;
      deltaY *= PAGE_HEIGHT;
    }
    return [deltaX, deltaY];
  }
  function getEventDetails(event) {
    const payload = {};
    if ("buttons" in event)
      payload.buttons = event.buttons;
    if ("shiftKey" in event) {
      const {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      } = event;
      Object.assign(payload, {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      });
    }
    return payload;
  }
  function call$2(v, ...args) {
    if (typeof v === "function") {
      return v(...args);
    } else {
      return v;
    }
  }
  function noop() {
  }
  function chain(...fns) {
    if (fns.length === 0)
      return noop;
    if (fns.length === 1)
      return fns[0];
    return function() {
      let result;
      for (const fn of fns) {
        result = fn.apply(this, arguments) || result;
      }
      return result;
    };
  }
  function assignDefault(value, fallback) {
    return Object.assign({}, fallback, value || {});
  }
  const BEFORE_LAST_KINEMATICS_DELAY = 32;
  class Engine {
    constructor(ctrl, args, key) {
      this.ctrl = ctrl;
      this.args = args;
      this.key = key;
      if (!this.state) {
        this.state = {};
        this.computeValues([0, 0]);
        this.computeInitial();
        if (this.init)
          this.init();
        this.reset();
      }
    }
    get state() {
      return this.ctrl.state[this.key];
    }
    set state(state) {
      this.ctrl.state[this.key] = state;
    }
    get shared() {
      return this.ctrl.state.shared;
    }
    get eventStore() {
      return this.ctrl.gestureEventStores[this.key];
    }
    get timeoutStore() {
      return this.ctrl.gestureTimeoutStores[this.key];
    }
    get config() {
      return this.ctrl.config[this.key];
    }
    get sharedConfig() {
      return this.ctrl.config.shared;
    }
    get handler() {
      return this.ctrl.handlers[this.key];
    }
    reset() {
      const {
        state,
        shared,
        ingKey,
        args
      } = this;
      shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
      state._step = [false, false];
      state.intentional = false;
      state._movement = [0, 0];
      state._distance = [0, 0];
      state._direction = [0, 0];
      state._delta = [0, 0];
      state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
      state.args = args;
      state.axis = void 0;
      state.memo = void 0;
      state.elapsedTime = state.timeDelta = 0;
      state.direction = [0, 0];
      state.distance = [0, 0];
      state.overflow = [0, 0];
      state._movementBound = [false, false];
      state.velocity = [0, 0];
      state.movement = [0, 0];
      state.delta = [0, 0];
      state.timeStamp = 0;
    }
    start(event) {
      const state = this.state;
      const config2 = this.config;
      if (!state._active) {
        this.reset();
        this.computeInitial();
        state._active = true;
        state.target = event.target;
        state.currentTarget = event.currentTarget;
        state.lastOffset = config2.from ? call$2(config2.from, state) : state.offset;
        state.offset = state.lastOffset;
        state.startTime = state.timeStamp = event.timeStamp;
      }
    }
    computeValues(values) {
      const state = this.state;
      state._values = values;
      state.values = this.config.transform(values);
    }
    computeInitial() {
      const state = this.state;
      state._initial = state._values;
      state.initial = state.values;
    }
    compute(event) {
      const {
        state,
        config: config2,
        shared
      } = this;
      state.args = this.args;
      let dt = 0;
      if (event) {
        state.event = event;
        if (config2.preventDefault && event.cancelable)
          state.event.preventDefault();
        state.type = event.type;
        shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
        shared.locked = !!document.pointerLockElement;
        Object.assign(shared, getEventDetails(event));
        shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
        dt = event.timeStamp - state.timeStamp;
        state.timeStamp = event.timeStamp;
        state.elapsedTime = state.timeStamp - state.startTime;
      }
      if (state._active) {
        const _absoluteDelta = state._delta.map(Math.abs);
        V.addTo(state._distance, _absoluteDelta);
      }
      if (this.axisIntent)
        this.axisIntent(event);
      const [_m0, _m1] = state._movement;
      const [t0, t1] = config2.threshold;
      const {
        _step,
        values
      } = state;
      if (config2.hasCustomTransform) {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && values[0];
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && values[1];
      } else {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
      }
      state.intentional = _step[0] !== false || _step[1] !== false;
      if (!state.intentional)
        return;
      const movement = [0, 0];
      if (config2.hasCustomTransform) {
        const [v0, v1] = values;
        movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
      } else {
        movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
      }
      if (this.restrictToAxis && !state._blocked)
        this.restrictToAxis(movement);
      const previousOffset = state.offset;
      const gestureIsActive = state._active && !state._blocked || state.active;
      if (gestureIsActive) {
        state.first = state._active && !state.active;
        state.last = !state._active && state.active;
        state.active = shared[this.ingKey] = state._active;
        if (event) {
          if (state.first) {
            if ("bounds" in config2)
              state._bounds = call$2(config2.bounds, state);
            if (this.setup)
              this.setup();
          }
          state.movement = movement;
          this.computeOffset();
        }
      }
      const [ox, oy] = state.offset;
      const [[x0, x1], [y0, y1]] = state._bounds;
      state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
      state._movementBound[0] = state.overflow[0] ? state._movementBound[0] === false ? state._movement[0] : state._movementBound[0] : false;
      state._movementBound[1] = state.overflow[1] ? state._movementBound[1] === false ? state._movement[1] : state._movementBound[1] : false;
      const rubberband2 = state._active ? config2.rubberband || [0, 0] : [0, 0];
      state.offset = computeRubberband(state._bounds, state.offset, rubberband2);
      state.delta = V.sub(state.offset, previousOffset);
      this.computeMovement();
      if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
        state.delta = V.sub(state.offset, previousOffset);
        const absoluteDelta = state.delta.map(Math.abs);
        V.addTo(state.distance, absoluteDelta);
        state.direction = state.delta.map(Math.sign);
        state._direction = state._delta.map(Math.sign);
        if (!state.first && dt > 0) {
          state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
          state.timeDelta = dt;
        }
      }
    }
    emit() {
      const state = this.state;
      const shared = this.shared;
      const config2 = this.config;
      if (!state._active)
        this.clean();
      if ((state._blocked || !state.intentional) && !state._force && !config2.triggerAllEvents)
        return;
      const memo = this.handler(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, shared), state), {}, {
        [this.aliasKey]: state.values
      }));
      if (memo !== void 0)
        state.memo = memo;
    }
    clean() {
      this.eventStore.clean();
      this.timeoutStore.clean();
    }
  }
  function selectAxis([dx, dy], threshold) {
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > absDy && absDx > threshold) {
      return "x";
    }
    if (absDy > absDx && absDy > threshold) {
      return "y";
    }
    return void 0;
  }
  class CoordinatesEngine extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty$1(this, "aliasKey", "xy");
    }
    reset() {
      super.reset();
      this.state.axis = void 0;
    }
    init() {
      this.state.offset = [0, 0];
      this.state.lastOffset = [0, 0];
    }
    computeOffset() {
      this.state.offset = V.add(this.state.lastOffset, this.state.movement);
    }
    computeMovement() {
      this.state.movement = V.sub(this.state.offset, this.state.lastOffset);
    }
    axisIntent(event) {
      const state = this.state;
      const config2 = this.config;
      if (!state.axis && event) {
        const threshold = typeof config2.axisThreshold === "object" ? config2.axisThreshold[getPointerType(event)] : config2.axisThreshold;
        state.axis = selectAxis(state._movement, threshold);
      }
      state._blocked = (config2.lockDirection || !!config2.axis) && !state.axis || !!config2.axis && config2.axis !== state.axis;
    }
    restrictToAxis(v) {
      if (this.config.axis || this.config.lockDirection) {
        switch (this.state.axis) {
          case "x":
            v[1] = 0;
            break;
          case "y":
            v[0] = 0;
            break;
        }
      }
    }
  }
  const identity = (v) => v;
  const DEFAULT_RUBBERBAND = 0.15;
  const commonConfigResolver = {
    enabled(value = true) {
      return value;
    },
    eventOptions(value, _k, config2) {
      return _objectSpread2$1(_objectSpread2$1({}, config2.shared.eventOptions), value);
    },
    preventDefault(value = false) {
      return value;
    },
    triggerAllEvents(value = false) {
      return value;
    },
    rubberband(value = 0) {
      switch (value) {
        case true:
          return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
        case false:
          return [0, 0];
        default:
          return V.toVector(value);
      }
    },
    from(value) {
      if (typeof value === "function")
        return value;
      if (value != null)
        return V.toVector(value);
    },
    transform(value, _k, config2) {
      const transform = value || config2.shared.transform;
      this.hasCustomTransform = !!transform;
      {
        const originalTransform = transform || identity;
        return (v) => {
          const r = originalTransform(v);
          if (!isFinite(r[0]) || !isFinite(r[1])) {
            console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${r[0]},${[1]}]`);
          }
          return r;
        };
      }
    },
    threshold(value) {
      return V.toVector(value, 0);
    }
  };
  {
    Object.assign(commonConfigResolver, {
      domTarget(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
        }
        return NaN;
      },
      lockDirection(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``);
        }
        return NaN;
      },
      initial(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`);
        }
        return NaN;
      }
    });
  }
  const DEFAULT_AXIS_THRESHOLD = 0;
  const coordinatesConfigResolver = _objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
    axis(_v, _k, {
      axis
    }) {
      this.lockDirection = axis === "lock";
      if (!this.lockDirection)
        return axis;
    },
    axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
      return value;
    },
    bounds(value = {}) {
      if (typeof value === "function") {
        return (state) => coordinatesConfigResolver.bounds(value(state));
      }
      if ("current" in value) {
        return () => value.current;
      }
      if (typeof HTMLElement === "function" && value instanceof HTMLElement) {
        return value;
      }
      const {
        left = -Infinity,
        right = Infinity,
        top = -Infinity,
        bottom = Infinity
      } = value;
      return [[left, right], [top, bottom]];
    }
  });
  const KEYS_DELTA_MAP = {
    ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
    ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
    ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
    ArrowDown: (displacement, factor = 1) => [0, displacement * factor]
  };
  class DragEngine extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty$1(this, "ingKey", "dragging");
    }
    reset() {
      super.reset();
      const state = this.state;
      state._pointerId = void 0;
      state._pointerActive = false;
      state._keyboardActive = false;
      state._preventScroll = false;
      state._delayed = false;
      state.swipe = [0, 0];
      state.tap = false;
      state.canceled = false;
      state.cancel = this.cancel.bind(this);
    }
    setup() {
      const state = this.state;
      if (state._bounds instanceof HTMLElement) {
        const boundRect = state._bounds.getBoundingClientRect();
        const targetRect = state.currentTarget.getBoundingClientRect();
        const _bounds = {
          left: boundRect.left - targetRect.left + state.offset[0],
          right: boundRect.right - targetRect.right + state.offset[0],
          top: boundRect.top - targetRect.top + state.offset[1],
          bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
        };
        state._bounds = coordinatesConfigResolver.bounds(_bounds);
      }
    }
    cancel() {
      const state = this.state;
      if (state.canceled)
        return;
      state.canceled = true;
      state._active = false;
      setTimeout(() => {
        this.compute();
        this.emit();
      }, 0);
    }
    setActive() {
      this.state._active = this.state._pointerActive || this.state._keyboardActive;
    }
    clean() {
      this.pointerClean();
      this.state._pointerActive = false;
      this.state._keyboardActive = false;
      super.clean();
    }
    pointerDown(event) {
      const config2 = this.config;
      const state = this.state;
      if (event.buttons != null && (Array.isArray(config2.pointerButtons) ? !config2.pointerButtons.includes(event.buttons) : config2.pointerButtons !== -1 && config2.pointerButtons !== event.buttons))
        return;
      const ctrlIds = this.ctrl.setEventIds(event);
      if (config2.pointerCapture) {
        event.target.setPointerCapture(event.pointerId);
      }
      if (ctrlIds && ctrlIds.size > 1 && state._pointerActive)
        return;
      this.start(event);
      this.setupPointer(event);
      state._pointerId = pointerId(event);
      state._pointerActive = true;
      this.computeValues(pointerValues(event));
      this.computeInitial();
      if (config2.preventScrollAxis && getPointerType(event) !== "mouse") {
        state._active = false;
        this.setupScrollPrevention(event);
      } else if (config2.delay > 0) {
        this.setupDelayTrigger(event);
        if (config2.triggerAllEvents) {
          this.compute(event);
          this.emit();
        }
      } else {
        this.startPointerDrag(event);
      }
    }
    startPointerDrag(event) {
      const state = this.state;
      state._active = true;
      state._preventScroll = true;
      state._delayed = false;
      this.compute(event);
      this.emit();
    }
    pointerMove(event) {
      const state = this.state;
      const config2 = this.config;
      if (!state._pointerActive)
        return;
      const id = pointerId(event);
      if (state._pointerId !== void 0 && id !== state._pointerId)
        return;
      const _values = pointerValues(event);
      if (document.pointerLockElement === event.target) {
        state._delta = [event.movementX, event.movementY];
      } else {
        state._delta = V.sub(_values, state._values);
        this.computeValues(_values);
      }
      V.addTo(state._movement, state._delta);
      this.compute(event);
      if (state._delayed && state.intentional) {
        this.timeoutStore.remove("dragDelay");
        state.active = false;
        this.startPointerDrag(event);
        return;
      }
      if (config2.preventScrollAxis && !state._preventScroll) {
        if (state.axis) {
          if (state.axis === config2.preventScrollAxis || config2.preventScrollAxis === "xy") {
            state._active = false;
            this.clean();
            return;
          } else {
            this.timeoutStore.remove("startPointerDrag");
            this.startPointerDrag(event);
            return;
          }
        } else {
          return;
        }
      }
      this.emit();
    }
    pointerUp(event) {
      this.ctrl.setEventIds(event);
      try {
        if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
          ;
          event.target.releasePointerCapture(event.pointerId);
        }
      } catch (_unused) {
        {
          console.warn(`[@use-gesture]: If you see this message, it's likely that you're using an outdated version of \`@react-three/fiber\`. 

Please upgrade to the latest version.`);
        }
      }
      const state = this.state;
      const config2 = this.config;
      if (!state._active || !state._pointerActive)
        return;
      const id = pointerId(event);
      if (state._pointerId !== void 0 && id !== state._pointerId)
        return;
      this.state._pointerActive = false;
      this.setActive();
      this.compute(event);
      const [dx, dy] = state._distance;
      state.tap = dx <= config2.tapsThreshold && dy <= config2.tapsThreshold;
      if (state.tap && config2.filterTaps) {
        state._force = true;
      } else {
        const [_dx, _dy] = state._delta;
        const [_mx, _my] = state._movement;
        const [svx, svy] = config2.swipe.velocity;
        const [sx, sy] = config2.swipe.distance;
        const sdt = config2.swipe.duration;
        if (state.elapsedTime < sdt) {
          const _vx = Math.abs(_dx / state.timeDelta);
          const _vy = Math.abs(_dy / state.timeDelta);
          if (_vx > svx && Math.abs(_mx) > sx)
            state.swipe[0] = Math.sign(_dx);
          if (_vy > svy && Math.abs(_my) > sy)
            state.swipe[1] = Math.sign(_dy);
        }
      }
      this.emit();
    }
    pointerClick(event) {
      if (!this.state.tap && event.detail > 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    setupPointer(event) {
      const config2 = this.config;
      const device = config2.device;
      {
        try {
          if (device === "pointer" && config2.preventScrollDelay === void 0) {
            const currentTarget = "uv" in event ? event.sourceEvent.currentTarget : event.currentTarget;
            const style = window.getComputedStyle(currentTarget);
            if (style.touchAction === "auto") {
              console.warn(`[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.

This message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`, currentTarget);
            }
          }
        } catch (_unused2) {
        }
      }
      if (config2.pointerLock) {
        event.currentTarget.requestPointerLock();
      }
      if (!config2.pointerCapture) {
        this.eventStore.add(this.sharedConfig.window, device, "change", this.pointerMove.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "end", this.pointerUp.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "cancel", this.pointerUp.bind(this));
      }
    }
    pointerClean() {
      if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
        document.exitPointerLock();
      }
    }
    preventScroll(event) {
      if (this.state._preventScroll && event.cancelable) {
        event.preventDefault();
      }
    }
    setupScrollPrevention(event) {
      this.state._preventScroll = false;
      persistEvent(event);
      const remove = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
        passive: false
      });
      this.eventStore.add(this.sharedConfig.window, "touch", "end", remove);
      this.eventStore.add(this.sharedConfig.window, "touch", "cancel", remove);
      this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
    }
    setupDelayTrigger(event) {
      this.state._delayed = true;
      this.timeoutStore.add("dragDelay", () => {
        this.state._step = [0, 0];
        this.startPointerDrag(event);
      }, this.config.delay);
    }
    keyDown(event) {
      const deltaFn = KEYS_DELTA_MAP[event.key];
      if (deltaFn) {
        const state = this.state;
        const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
        this.start(event);
        state._delta = deltaFn(this.config.keyboardDisplacement, factor);
        state._keyboardActive = true;
        V.addTo(state._movement, state._delta);
        this.compute(event);
        this.emit();
      }
    }
    keyUp(event) {
      if (!(event.key in KEYS_DELTA_MAP))
        return;
      this.state._keyboardActive = false;
      this.setActive();
      this.compute(event);
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      bindFunction(device, "start", this.pointerDown.bind(this));
      if (this.config.pointerCapture) {
        bindFunction(device, "change", this.pointerMove.bind(this));
        bindFunction(device, "end", this.pointerUp.bind(this));
        bindFunction(device, "cancel", this.pointerUp.bind(this));
        bindFunction("lostPointerCapture", "", this.pointerUp.bind(this));
      }
      if (this.config.keys) {
        bindFunction("key", "down", this.keyDown.bind(this));
        bindFunction("key", "up", this.keyUp.bind(this));
      }
      if (this.config.filterTaps) {
        bindFunction("click", "", this.pointerClick.bind(this), {
          capture: true,
          passive: false
        });
      }
    }
  }
  function persistEvent(event) {
    "persist" in event && typeof event.persist === "function" && event.persist();
  }
  const isBrowser = typeof window !== "undefined" && window.document && window.document.createElement;
  function supportsTouchEvents() {
    return isBrowser && "ontouchstart" in window;
  }
  function isTouchScreen() {
    return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
  }
  function supportsPointerEvents() {
    return isBrowser && "onpointerdown" in window;
  }
  function supportsPointerLock() {
    return isBrowser && "exitPointerLock" in window.document;
  }
  function supportsGestureEvents() {
    try {
      return "constructor" in GestureEvent;
    } catch (e2) {
      return false;
    }
  }
  const SUPPORT = {
    isBrowser,
    gesture: supportsGestureEvents(),
    touch: supportsTouchEvents(),
    touchscreen: isTouchScreen(),
    pointer: supportsPointerEvents(),
    pointerLock: supportsPointerLock()
  };
  const DEFAULT_PREVENT_SCROLL_DELAY = 250;
  const DEFAULT_DRAG_DELAY = 180;
  const DEFAULT_SWIPE_VELOCITY = 0.5;
  const DEFAULT_SWIPE_DISTANCE = 50;
  const DEFAULT_SWIPE_DURATION = 250;
  const DEFAULT_KEYBOARD_DISPLACEMENT = 10;
  const DEFAULT_DRAG_AXIS_THRESHOLD = {
    mouse: 0,
    touch: 0,
    pen: 8
  };
  const dragConfigResolver = _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
    device(_v, _k, {
      pointer: {
        touch = false,
        lock = false,
        mouse = false
      } = {}
    }) {
      this.pointerLock = lock && SUPPORT.pointerLock;
      if (SUPPORT.touch && touch)
        return "touch";
      if (this.pointerLock)
        return "mouse";
      if (SUPPORT.pointer && !mouse)
        return "pointer";
      if (SUPPORT.touch)
        return "touch";
      return "mouse";
    },
    preventScrollAxis(value, _k, {
      preventScroll
    }) {
      this.preventScrollDelay = typeof preventScroll === "number" ? preventScroll : preventScroll || preventScroll === void 0 && value ? DEFAULT_PREVENT_SCROLL_DELAY : void 0;
      if (!SUPPORT.touchscreen || preventScroll === false)
        return void 0;
      return value ? value : preventScroll !== void 0 ? "y" : void 0;
    },
    pointerCapture(_v, _k, {
      pointer: {
        capture = true,
        buttons = 1,
        keys: keys2 = true
      } = {}
    }) {
      this.pointerButtons = buttons;
      this.keys = keys2;
      return !this.pointerLock && this.device === "pointer" && capture;
    },
    threshold(value, _k, {
      filterTaps = false,
      tapsThreshold = 3,
      axis = void 0
    }) {
      const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
      this.filterTaps = filterTaps;
      this.tapsThreshold = tapsThreshold;
      return threshold;
    },
    swipe({
      velocity = DEFAULT_SWIPE_VELOCITY,
      distance = DEFAULT_SWIPE_DISTANCE,
      duration = DEFAULT_SWIPE_DURATION
    } = {}) {
      return {
        velocity: this.transform(V.toVector(velocity)),
        distance: this.transform(V.toVector(distance)),
        duration
      };
    },
    delay(value = 0) {
      switch (value) {
        case true:
          return DEFAULT_DRAG_DELAY;
        case false:
          return 0;
        default:
          return value;
      }
    },
    axisThreshold(value) {
      if (!value)
        return DEFAULT_DRAG_AXIS_THRESHOLD;
      return _objectSpread2$1(_objectSpread2$1({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
    },
    keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
      return value;
    }
  });
  {
    Object.assign(dragConfigResolver, {
      useTouch(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`);
        }
        return NaN;
      },
      experimental_preventWindowScrollY(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`);
        }
        return NaN;
      },
      swipeVelocity(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`);
        }
        return NaN;
      },
      swipeDistance(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`);
        }
        return NaN;
      },
      swipeDuration(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`);
        }
        return NaN;
      }
    });
  }
  function clampStateInternalMovementToBounds(state) {
    const [ox, oy] = state.overflow;
    const [dx, dy] = state._delta;
    const [dirx, diry] = state._direction;
    if (ox < 0 && dx > 0 && dirx < 0 || ox > 0 && dx < 0 && dirx > 0) {
      state._movement[0] = state._movementBound[0];
    }
    if (oy < 0 && dy > 0 && diry < 0 || oy > 0 && dy < 0 && diry > 0) {
      state._movement[1] = state._movementBound[1];
    }
  }
  const SCALE_ANGLE_RATIO_INTENT_DEG = 30;
  const PINCH_WHEEL_RATIO = 100;
  class PinchEngine extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty$1(this, "ingKey", "pinching");
      _defineProperty$1(this, "aliasKey", "da");
    }
    init() {
      this.state.offset = [1, 0];
      this.state.lastOffset = [1, 0];
      this.state._pointerEvents = /* @__PURE__ */ new Map();
    }
    reset() {
      super.reset();
      const state = this.state;
      state._touchIds = [];
      state.canceled = false;
      state.cancel = this.cancel.bind(this);
      state.turns = 0;
    }
    computeOffset() {
      const {
        type,
        movement,
        lastOffset
      } = this.state;
      if (type === "wheel") {
        this.state.offset = V.add(movement, lastOffset);
      } else {
        this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
      }
    }
    computeMovement() {
      const {
        offset: offset2,
        lastOffset
      } = this.state;
      this.state.movement = [offset2[0] / lastOffset[0], offset2[1] - lastOffset[1]];
    }
    axisIntent() {
      const state = this.state;
      const [_m0, _m1] = state._movement;
      if (!state.axis) {
        const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m1);
        if (axisMovementDifference < 0)
          state.axis = "angle";
        else if (axisMovementDifference > 0)
          state.axis = "scale";
      }
    }
    restrictToAxis(v) {
      if (this.config.lockDirection) {
        if (this.state.axis === "scale")
          v[1] = 0;
        else if (this.state.axis === "angle")
          v[0] = 0;
      }
    }
    cancel() {
      const state = this.state;
      if (state.canceled)
        return;
      setTimeout(() => {
        state.canceled = true;
        state._active = false;
        this.compute();
        this.emit();
      }, 0);
    }
    touchStart(event) {
      this.ctrl.setEventIds(event);
      const state = this.state;
      const ctrlTouchIds = this.ctrl.touchIds;
      if (state._active) {
        if (state._touchIds.every((id) => ctrlTouchIds.has(id)))
          return;
      }
      if (ctrlTouchIds.size < 2)
        return;
      this.start(event);
      state._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
      const payload = touchDistanceAngle(event, state._touchIds);
      if (!payload)
        return;
      this.pinchStart(event, payload);
    }
    pointerStart(event) {
      if (event.buttons != null && event.buttons % 2 !== 1)
        return;
      this.ctrl.setEventIds(event);
      event.target.setPointerCapture(event.pointerId);
      const state = this.state;
      const _pointerEvents = state._pointerEvents;
      const ctrlPointerIds = this.ctrl.pointerIds;
      if (state._active) {
        if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id)))
          return;
      }
      if (_pointerEvents.size < 2) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (state._pointerEvents.size < 2)
        return;
      this.start(event);
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      if (!payload)
        return;
      this.pinchStart(event, payload);
    }
    pinchStart(event, payload) {
      const state = this.state;
      state.origin = payload.origin;
      this.computeValues([payload.distance, payload.angle]);
      this.computeInitial();
      this.compute(event);
      this.emit();
    }
    touchMove(event) {
      if (!this.state._active)
        return;
      const payload = touchDistanceAngle(event, this.state._touchIds);
      if (!payload)
        return;
      this.pinchMove(event, payload);
    }
    pointerMove(event) {
      const _pointerEvents = this.state._pointerEvents;
      if (_pointerEvents.has(event.pointerId)) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (!this.state._active)
        return;
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      if (!payload)
        return;
      this.pinchMove(event, payload);
    }
    pinchMove(event, payload) {
      const state = this.state;
      const prev_a = state._values[1];
      const delta_a = payload.angle - prev_a;
      let delta_turns = 0;
      if (Math.abs(delta_a) > 270)
        delta_turns += Math.sign(delta_a);
      this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
      state.origin = payload.origin;
      state.turns = delta_turns;
      state._movement = [state._values[0] / state._initial[0] - 1, state._values[1] - state._initial[1]];
      this.compute(event);
      this.emit();
    }
    touchEnd(event) {
      this.ctrl.setEventIds(event);
      if (!this.state._active)
        return;
      if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
        this.state._active = false;
        this.compute(event);
        this.emit();
      }
    }
    pointerEnd(event) {
      const state = this.state;
      this.ctrl.setEventIds(event);
      try {
        event.target.releasePointerCapture(event.pointerId);
      } catch (_unused) {
      }
      if (state._pointerEvents.has(event.pointerId)) {
        state._pointerEvents.delete(event.pointerId);
      }
      if (!state._active)
        return;
      if (state._pointerEvents.size < 2) {
        state._active = false;
        this.compute(event);
        this.emit();
      }
    }
    gestureStart(event) {
      if (event.cancelable)
        event.preventDefault();
      const state = this.state;
      if (state._active)
        return;
      this.start(event);
      this.computeValues([event.scale, event.rotation]);
      state.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    gestureMove(event) {
      if (event.cancelable)
        event.preventDefault();
      if (!this.state._active)
        return;
      const state = this.state;
      this.computeValues([event.scale, event.rotation]);
      state.origin = [event.clientX, event.clientY];
      const _previousMovement = state._movement;
      state._movement = [event.scale - 1, event.rotation];
      state._delta = V.sub(state._movement, _previousMovement);
      this.compute(event);
      this.emit();
    }
    gestureEnd(event) {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
    wheel(event) {
      const modifierKey = this.config.modifierKey;
      if (modifierKey && (Array.isArray(modifierKey) ? !modifierKey.find((k) => event[k]) : !event[modifierKey]))
        return;
      if (!this.state._active)
        this.wheelStart(event);
      else
        this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelStart(event) {
      this.start(event);
      this.wheelChange(event);
    }
    wheelChange(event) {
      const isR3f = "uv" in event;
      if (!isR3f) {
        if (event.cancelable) {
          event.preventDefault();
        }
        if (!event.defaultPrevented) {
          console.warn(`[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option.

This message will only appear in development mode.`);
        }
      }
      const state = this.state;
      state._delta = [-wheelValues(event)[1] / PINCH_WHEEL_RATIO * state.offset[0], 0];
      V.addTo(state._movement, state._delta);
      clampStateInternalMovementToBounds(state);
      this.state.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      if (!!device) {
        bindFunction(device, "start", this[device + "Start"].bind(this));
        bindFunction(device, "change", this[device + "Move"].bind(this));
        bindFunction(device, "end", this[device + "End"].bind(this));
        bindFunction(device, "cancel", this[device + "End"].bind(this));
        bindFunction("lostPointerCapture", "", this[device + "End"].bind(this));
      }
      if (this.config.pinchOnWheel) {
        bindFunction("wheel", "", this.wheel.bind(this), {
          passive: false
        });
      }
    }
  }
  const pinchConfigResolver = _objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
    device(_v, _k, {
      shared,
      pointer: {
        touch = false
      } = {}
    }) {
      const sharedConfig = shared;
      if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture)
        return "gesture";
      if (SUPPORT.touch && touch)
        return "touch";
      if (SUPPORT.touchscreen) {
        if (SUPPORT.pointer)
          return "pointer";
        if (SUPPORT.touch)
          return "touch";
      }
    },
    bounds(_v, _k, {
      scaleBounds = {},
      angleBounds = {}
    }) {
      const _scaleBounds = (state) => {
        const D = assignDefault(call$2(scaleBounds, state), {
          min: -Infinity,
          max: Infinity
        });
        return [D.min, D.max];
      };
      const _angleBounds = (state) => {
        const A = assignDefault(call$2(angleBounds, state), {
          min: -Infinity,
          max: Infinity
        });
        return [A.min, A.max];
      };
      if (typeof scaleBounds !== "function" && typeof angleBounds !== "function")
        return [_scaleBounds(), _angleBounds()];
      return (state) => [_scaleBounds(state), _angleBounds(state)];
    },
    threshold(value, _k, config2) {
      this.lockDirection = config2.axis === "lock";
      const threshold = V.toVector(value, this.lockDirection ? [0.1, 3] : 0);
      return threshold;
    },
    modifierKey(value) {
      if (value === void 0)
        return "ctrlKey";
      return value;
    },
    pinchOnWheel(value = true) {
      return value;
    }
  });
  _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  class WheelEngine extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty$1(this, "ingKey", "wheeling");
    }
    wheel(event) {
      if (!this.state._active)
        this.start(event);
      this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelChange(event) {
      const state = this.state;
      state._delta = wheelValues(event);
      V.addTo(state._movement, state._delta);
      clampStateInternalMovementToBounds(state);
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("wheel", "", this.wheel.bind(this));
    }
  }
  const wheelConfigResolver = coordinatesConfigResolver;
  _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  const EngineMap = /* @__PURE__ */ new Map();
  const ConfigResolverMap = /* @__PURE__ */ new Map();
  function registerAction(action) {
    EngineMap.set(action.key, action.engine);
    ConfigResolverMap.set(action.key, action.resolver);
  }
  const dragAction = {
    key: "drag",
    engine: DragEngine,
    resolver: dragConfigResolver
  };
  const pinchAction = {
    key: "pinch",
    engine: PinchEngine,
    resolver: pinchConfigResolver
  };
  const wheelAction = {
    key: "wheel",
    engine: WheelEngine,
    resolver: wheelConfigResolver
  };
  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties$1(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose$1(source, excluded);
    var key, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key = sourceSymbolKeys[i2];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  const sharedConfigResolver = {
    target(value) {
      if (value) {
        return () => "current" in value ? value.current : value;
      }
      return void 0;
    },
    enabled(value = true) {
      return value;
    },
    window(value = SUPPORT.isBrowser ? window : void 0) {
      return value;
    },
    eventOptions({
      passive = true,
      capture = false
    } = {}) {
      return {
        passive,
        capture
      };
    },
    transform(value) {
      return value;
    }
  };
  const _excluded$3 = ["target", "eventOptions", "window", "enabled", "transform"];
  function resolveWith(config2 = {}, resolvers) {
    const result = {};
    for (const [key, resolver] of Object.entries(resolvers)) {
      switch (typeof resolver) {
        case "function":
          {
            const r = resolver.call(result, config2[key], key, config2);
            if (!Number.isNaN(r))
              result[key] = r;
          }
          break;
        case "object":
          result[key] = resolveWith(config2[key], resolver);
          break;
        case "boolean":
          if (resolver)
            result[key] = config2[key];
          break;
      }
    }
    return result;
  }
  function parse(newConfig, gestureKey, _config = {}) {
    const _ref = newConfig, {
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    } = _ref, rest = _objectWithoutProperties$1(_ref, _excluded$3);
    _config.shared = resolveWith({
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    }, sharedConfigResolver);
    if (gestureKey) {
      const resolver = ConfigResolverMap.get(gestureKey);
      _config[gestureKey] = resolveWith(_objectSpread2$1({
        shared: _config.shared
      }, rest), resolver);
    } else {
      for (const key in rest) {
        const resolver = ConfigResolverMap.get(key);
        if (resolver) {
          _config[key] = resolveWith(_objectSpread2$1({
            shared: _config.shared
          }, rest[key]), resolver);
        } else {
          if (!["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(key)) {
            if (key === "domTarget") {
              throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
            }
            console.warn(`[@use-gesture]: Unknown config key \`${key}\` was used. Please read the documentation for further information.`);
          }
        }
      }
    }
    return _config;
  }
  class EventStore {
    constructor(ctrl, gestureKey) {
      _defineProperty$1(this, "_listeners", /* @__PURE__ */ new Set());
      this._ctrl = ctrl;
      this._gestureKey = gestureKey;
    }
    add(element, device, action, handler, options) {
      const listeners = this._listeners;
      const type = toDomEventType(device, action);
      const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
      const eventOptions = _objectSpread2$1(_objectSpread2$1({}, _options), options);
      element.addEventListener(type, handler, eventOptions);
      const remove = () => {
        element.removeEventListener(type, handler, eventOptions);
        listeners.delete(remove);
      };
      listeners.add(remove);
      return remove;
    }
    clean() {
      this._listeners.forEach((remove) => remove());
      this._listeners.clear();
    }
  }
  class TimeoutStore {
    constructor() {
      _defineProperty$1(this, "_timeouts", /* @__PURE__ */ new Map());
    }
    add(key, callback, ms = 140, ...args) {
      this.remove(key);
      this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
    }
    remove(key) {
      const timeout = this._timeouts.get(key);
      if (timeout)
        window.clearTimeout(timeout);
    }
    clean() {
      this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
      this._timeouts.clear();
    }
  }
  class Controller {
    constructor(handlers) {
      _defineProperty$1(this, "gestures", /* @__PURE__ */ new Set());
      _defineProperty$1(this, "_targetEventStore", new EventStore(this));
      _defineProperty$1(this, "gestureEventStores", {});
      _defineProperty$1(this, "gestureTimeoutStores", {});
      _defineProperty$1(this, "handlers", {});
      _defineProperty$1(this, "config", {});
      _defineProperty$1(this, "pointerIds", /* @__PURE__ */ new Set());
      _defineProperty$1(this, "touchIds", /* @__PURE__ */ new Set());
      _defineProperty$1(this, "state", {
        shared: {
          shiftKey: false,
          metaKey: false,
          ctrlKey: false,
          altKey: false
        }
      });
      resolveGestures(this, handlers);
    }
    setEventIds(event) {
      if (isTouch(event)) {
        this.touchIds = new Set(touchIds(event));
        return this.touchIds;
      } else if ("pointerId" in event) {
        if (event.type === "pointerup" || event.type === "pointercancel")
          this.pointerIds.delete(event.pointerId);
        else if (event.type === "pointerdown")
          this.pointerIds.add(event.pointerId);
        return this.pointerIds;
      }
    }
    applyHandlers(handlers, nativeHandlers) {
      this.handlers = handlers;
      this.nativeHandlers = nativeHandlers;
    }
    applyConfig(config2, gestureKey) {
      this.config = parse(config2, gestureKey, this.config);
    }
    clean() {
      this._targetEventStore.clean();
      for (const key of this.gestures) {
        this.gestureEventStores[key].clean();
        this.gestureTimeoutStores[key].clean();
      }
    }
    effect() {
      if (this.config.shared.target)
        this.bind();
      return () => this._targetEventStore.clean();
    }
    bind(...args) {
      const sharedConfig = this.config.shared;
      const props = {};
      let target;
      if (sharedConfig.target) {
        target = sharedConfig.target();
        if (!target)
          return;
      }
      if (sharedConfig.enabled) {
        for (const gestureKey of this.gestures) {
          const gestureConfig = this.config[gestureKey];
          const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
          if (gestureConfig.enabled) {
            const Engine2 = EngineMap.get(gestureKey);
            new Engine2(this, args, gestureKey).bind(bindFunction);
          }
        }
        const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
        for (const eventKey in this.nativeHandlers) {
          nativeBindFunction(eventKey, "", (event) => this.nativeHandlers[eventKey](_objectSpread2$1(_objectSpread2$1({}, this.state.shared), {}, {
            event,
            args
          })), void 0, true);
        }
      }
      for (const handlerProp in props) {
        props[handlerProp] = chain(...props[handlerProp]);
      }
      if (!target)
        return props;
      for (const handlerProp in props) {
        const {
          device,
          capture,
          passive
        } = parseProp(handlerProp);
        this._targetEventStore.add(target, device, "", props[handlerProp], {
          capture,
          passive
        });
      }
    }
  }
  function setupGesture(ctrl, gestureKey) {
    ctrl.gestures.add(gestureKey);
    ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
    ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
  }
  function resolveGestures(ctrl, internalHandlers) {
    if (internalHandlers.drag)
      setupGesture(ctrl, "drag");
    if (internalHandlers.wheel)
      setupGesture(ctrl, "wheel");
    if (internalHandlers.scroll)
      setupGesture(ctrl, "scroll");
    if (internalHandlers.move)
      setupGesture(ctrl, "move");
    if (internalHandlers.pinch)
      setupGesture(ctrl, "pinch");
    if (internalHandlers.hover)
      setupGesture(ctrl, "hover");
  }
  const bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
    var _options$capture, _options$passive;
    const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
    const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
    let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
    if (withPassiveOption && passive)
      handlerProp += "Passive";
    props[handlerProp] = props[handlerProp] || [];
    props[handlerProp].push(handler);
  };
  const RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
  function sortHandlers(_handlers) {
    const native = {};
    const handlers = {};
    const actions = /* @__PURE__ */ new Set();
    for (let key in _handlers) {
      if (RE_NOT_NATIVE.test(key)) {
        actions.add(RegExp.lastMatch);
        handlers[key] = _handlers[key];
      } else {
        native[key] = _handlers[key];
      }
    }
    return [handlers, native, actions];
  }
  function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config2) {
    if (!actions.has(handlerKey))
      return;
    if (!EngineMap.has(key)) {
      {
        console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${key}\` gesture but isn't properly configured.

Please add \`${key}Action\` when creating your handler.`);
      }
      return;
    }
    const startKey = handlerKey + "Start";
    const endKey = handlerKey + "End";
    const fn = (state) => {
      let memo = void 0;
      if (state.first && startKey in handlers)
        handlers[startKey](state);
      if (handlerKey in handlers)
        memo = handlers[handlerKey](state);
      if (state.last && endKey in handlers)
        handlers[endKey](state);
      return memo;
    };
    internalHandlers[key] = fn;
    config2[key] = config2[key] || {};
  }
  function parseMergedHandlers(mergedHandlers, mergedConfig) {
    const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
    const internalHandlers = {};
    registerGesture(actions, handlers, "onDrag", "drag", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onWheel", "wheel", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onScroll", "scroll", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onPinch", "pinch", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onMove", "move", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onHover", "hover", internalHandlers, mergedConfig);
    return {
      handlers: internalHandlers,
      config: mergedConfig,
      nativeHandlers
    };
  }
  function useRecognizers(handlers, config2 = {}, gestureKey, nativeHandlers) {
    const ctrl = React$1.useMemo(() => new Controller(handlers), []);
    ctrl.applyHandlers(handlers, nativeHandlers);
    ctrl.applyConfig(config2, gestureKey);
    React$1.useEffect(ctrl.effect.bind(ctrl));
    React$1.useEffect(() => {
      return ctrl.clean.bind(ctrl);
    }, []);
    if (config2.target === void 0) {
      return ctrl.bind.bind(ctrl);
    }
    return void 0;
  }
  function useDrag(handler, config2) {
    registerAction(dragAction);
    return useRecognizers({
      drag: handler
    }, config2 || {}, "drag");
  }
  function useWheel(handler, config2) {
    registerAction(wheelAction);
    return useRecognizers({
      wheel: handler
    }, config2 || {}, "wheel");
  }
  function createUseGesture(actions) {
    actions.forEach(registerAction);
    return function useGesture(_handlers, _config) {
      const {
        handlers,
        nativeHandlers,
        config: config2
      } = parseMergedHandlers(_handlers, _config || {});
      return useRecognizers(handlers, config2, void 0, nativeHandlers);
    };
  }
  const classPrefix$1o = `adm-popup`;
  const defaultProps$14 = Object.assign(Object.assign({}, defaultPopupBaseProps), {
    closeOnSwipe: false,
    position: "bottom"
  });
  const Popup = (p) => {
    const props = mergeProps(defaultProps$14, p);
    const bodyCls = classNames(`${classPrefix$1o}-body`, props.bodyClassName, `${classPrefix$1o}-body-position-${props.position}`);
    const {
      locale
    } = useConfig();
    const [active, setActive] = React$1.useState(props.visible);
    const ref = React$1.useRef(null);
    useLockScroll(ref, props.disableBodyScroll && active ? "strict" : false);
    useIsomorphicLayoutEffect$2(() => {
      if (props.visible) {
        setActive(true);
      }
    }, [props.visible]);
    const unmountedRef = useUnmountedRef$1();
    const {
      percent
    } = useSpring({
      percent: props.visible ? 0 : 100,
      config: {
        precision: 0.1,
        mass: 0.4,
        tension: 300,
        friction: 30
      },
      onRest: () => {
        var _a, _b;
        if (unmountedRef.current)
          return;
        setActive(props.visible);
        if (props.visible) {
          (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
        } else {
          (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      }
    });
    const bind = useDrag(({
      swipe: [, swipeY]
    }) => {
      var _a;
      if (!props.closeOnSwipe)
        return;
      if (swipeY === 1 && props.position === "bottom" || swipeY === -1 && props.position === "top") {
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    }, {
      axis: "y",
      enabled: ["top", "bottom"].includes(props.position)
    });
    const maskVisible = useInnerVisible(active && props.visible);
    const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", Object.assign({
      className: classPrefix$1o,
      onClick: props.onClick,
      style: {
        display: active ? void 0 : "none",
        touchAction: ["top", "bottom"].includes(props.position) ? "none" : "auto"
      }
    }, bind()), props.mask && React$1.createElement(Mask, {
      visible: maskVisible,
      forceRender: props.forceRender,
      destroyOnClose: props.destroyOnClose,
      onMaskClick: (e2) => {
        var _a, _b;
        (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props, e2);
        if (props.closeOnMaskClick) {
          (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      },
      className: props.maskClassName,
      style: props.maskStyle,
      disableBodyScroll: false,
      stopPropagation: props.stopPropagation
    }), React$1.createElement(animated.div, {
      className: bodyCls,
      style: Object.assign(Object.assign({}, props.bodyStyle), {
        pointerEvents: percent.to((v) => v === 0 ? "unset" : "none"),
        transform: percent.to((v) => {
          if (props.position === "bottom") {
            return `translate(0, ${v}%)`;
          }
          if (props.position === "top") {
            return `translate(0, -${v}%)`;
          }
          if (props.position === "left") {
            return `translate(-${v}%, 0)`;
          }
          if (props.position === "right") {
            return `translate(${v}%, 0)`;
          }
          return "none";
        })
      }),
      ref
    }, props.showCloseButton && React$1.createElement("a", {
      className: classNames(`${classPrefix$1o}-close-icon`, "adm-plain-anchor"),
      onClick: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      role: "button",
      "aria-label": locale.common.close
    }, React$1.createElement(CloseOutline, null)), props.children))));
    return React$1.createElement(ShouldRender, {
      active,
      forceRender: props.forceRender,
      destroyOnClose: props.destroyOnClose
    }, renderToContainer(props.getContainer, node));
  };
  const classPrefix$1n = "adm-safe-area";
  const SafeArea = (props) => {
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$1n, `${classPrefix$1n}-position-${props.position}`)
    }));
  };
  const fullClone = Object.assign({}, ReactDOM__namespace);
  const {
    version,
    render: reactRender,
    unmountComponentAtNode
  } = fullClone;
  let createRoot;
  try {
    const mainVersion = Number((version || "").split(".")[0]);
    if (mainVersion >= 18 && fullClone.createRoot) {
      createRoot = fullClone.createRoot;
    }
  } catch (e2) {
  }
  function toggleWarning(skip) {
    const {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    } = fullClone;
    if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === "object") {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
    }
  }
  const MARK = "__antd_mobile_root__";
  function legacyRender(node, container) {
    reactRender(node, container);
  }
  function concurrentRender(node, container) {
    toggleWarning(true);
    const root2 = container[MARK] || createRoot(container);
    toggleWarning(false);
    root2.render(node);
    container[MARK] = root2;
  }
  function render(node, container) {
    if (createRoot) {
      concurrentRender(node, container);
      return;
    }
    legacyRender(node, container);
  }
  function legacyUnmount(container) {
    return unmountComponentAtNode(container);
  }
  function concurrentUnmount(container) {
    return __awaiter(this, void 0, void 0, function* () {
      return Promise.resolve().then(() => {
        var _a;
        (_a = container[MARK]) === null || _a === void 0 ? void 0 : _a.unmount();
        delete container[MARK];
      });
    });
  }
  function unmount(container) {
    if (createRoot) {
      return concurrentUnmount(container);
    }
    return legacyUnmount(container);
  }
  function renderToBody(element) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    function unmount$1() {
      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
    render(element, container);
    return unmount$1;
  }
  function renderImperatively(element) {
    const Wrapper2 = React$1.forwardRef((_, ref) => {
      const [visible, setVisible] = React$1.useState(false);
      const closedRef = React$1.useRef(false);
      const [elementToRender, setElementToRender] = React$1.useState(element);
      const keyRef = React$1.useRef(0);
      React$1.useEffect(() => {
        if (!closedRef.current) {
          setVisible(true);
        } else {
          afterClose();
        }
      }, []);
      function onClose() {
        var _a, _b;
        closedRef.current = true;
        setVisible(false);
        (_b = (_a = elementToRender.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
      function afterClose() {
        var _a, _b;
        unmount2();
        (_b = (_a = elementToRender.props).afterClose) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
      React$1.useImperativeHandle(ref, () => ({
        close: onClose,
        replace: (element2) => {
          var _a, _b;
          keyRef.current++;
          (_b = (_a = elementToRender.props).afterClose) === null || _b === void 0 ? void 0 : _b.call(_a);
          setElementToRender(element2);
        }
      }));
      return React$1.cloneElement(elementToRender, Object.assign(Object.assign({}, elementToRender.props), {
        key: keyRef.current,
        visible,
        onClose,
        afterClose
      }));
    });
    const wrapperRef = React$1.createRef();
    const unmount2 = renderToBody(React$1.createElement(Wrapper2, {
      ref: wrapperRef
    }));
    return {
      close: () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!wrapperRef.current) {
          unmount2();
        } else {
          (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.close();
        }
      }),
      replace: (element2) => {
        var _a;
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.replace(element2);
      }
    };
  }
  const classPrefix$1m = `adm-action-sheet`;
  const defaultProps$13 = {
    visible: false,
    actions: [],
    cancelText: "",
    closeOnAction: false,
    closeOnMaskClick: true,
    safeArea: true,
    destroyOnClose: false,
    forceRender: false
  };
  const ActionSheet = (p) => {
    const props = mergeProps(defaultProps$13, p);
    const {
      styles
    } = props;
    return React$1.createElement(Popup, {
      visible: props.visible,
      onMaskClick: () => {
        var _a, _b;
        (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props);
        if (props.closeOnMaskClick) {
          (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      },
      afterClose: props.afterClose,
      className: classNames(`${classPrefix$1m}-popup`, props.popupClassName),
      style: props.popupStyle,
      getContainer: props.getContainer,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender,
      bodyStyle: styles === null || styles === void 0 ? void 0 : styles.body,
      maskStyle: styles === null || styles === void 0 ? void 0 : styles.mask
    }, withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$1m
    }, props.extra && React$1.createElement("div", {
      className: `${classPrefix$1m}-extra`
    }, props.extra), React$1.createElement("div", {
      className: `${classPrefix$1m}-button-list`
    }, props.actions.map((action, index2) => React$1.createElement("div", {
      key: action.key,
      className: `${classPrefix$1m}-button-item-wrapper`
    }, React$1.createElement("a", {
      className: classNames("adm-plain-anchor", `${classPrefix$1m}-button-item`, {
        [`${classPrefix$1m}-button-item-danger`]: action.danger,
        [`${classPrefix$1m}-button-item-disabled`]: action.disabled,
        [`${classPrefix$1m}-button-item-bold`]: action.bold
      }),
      onClick: () => {
        var _a, _b, _c;
        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action);
        (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index2);
        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      },
      role: "option",
      "aria-disabled": action.disabled
    }, React$1.createElement("div", {
      className: `${classPrefix$1m}-button-item-name`
    }, action.text), action.description && React$1.createElement("div", {
      className: `${classPrefix$1m}-button-item-description`
    }, action.description))))), props.cancelText && React$1.createElement("div", {
      className: `${classPrefix$1m}-cancel`,
      role: "option",
      "aria-label": props.cancelText
    }, React$1.createElement("div", {
      className: `${classPrefix$1m}-button-item-wrapper`
    }, React$1.createElement("a", {
      className: classNames("adm-plain-anchor", `${classPrefix$1m}-button-item`),
      onClick: props.onClose
    }, React$1.createElement("div", {
      className: `${classPrefix$1m}-button-item-name`
    }, props.cancelText)))), props.safeArea && React$1.createElement(SafeArea, {
      position: "bottom"
    }))));
  };
  function showActionSheet(props) {
    return renderImperatively(React$1.createElement(ActionSheet, Object.assign({}, props)));
  }
  const index$i = attachPropertiesToComponent(ActionSheet, {
    show: showActionSheet
  });
  const classPrefix$1l = "adm-auto-center";
  const AutoCenter = (props) => withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$1l
  }, React$1.createElement("div", {
    className: `${classPrefix$1l}-content`
  }, props.children)));
  const Fallback = React$1.memo(() => React$1.createElement("svg", {
    className: "adm-avatar-fallback",
    width: "88px",
    height: "88px",
    viewBox: "0 0 88 88",
    version: "1.1"
  }, React$1.createElement("title", null, "编组 3"), React$1.createElement("defs", null, React$1.createElement("polygon", {
    id: "path-1",
    points: "0 0 88 0 88 88 0 88"
  })), React$1.createElement("g", {
    id: "页面-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    id: "语雀",
    transform: "translate(-495.000000, -71.000000)"
  }, React$1.createElement("g", {
    id: "编组-3",
    transform: "translate(495.000000, 71.000000)"
  }, React$1.createElement("mask", {
    id: "mask-2",
    fill: "white"
  }, React$1.createElement("use", {
    xlinkHref: "#path-1"
  })), React$1.createElement("use", {
    id: "Mask",
    fill: "#EEEEEE",
    fillRule: "nonzero",
    xlinkHref: "#path-1"
  }), React$1.createElement("path", {
    d: "M44.5707528,16 L43.4292117,16 L42.9575197,16.0086403 L42.9575195,16.0086403 C36.5215787,16.2615464 31.4341803,21.5678078 31.4344832,28.0273864 L31.4344832,34.7776551 L31.4495601,35.3716788 L31.4495593,35.3716628 C31.599687,38.5368723 32.9422041,41.5269327 35.2058513,43.7376716 L38.2147759,46.6775505 L38.4086219,46.8913989 C38.7747759,47.3385365 38.9750835,47.9001589 38.9750835,48.4833848 L38.9750835,48.8938006 L38.9556989,49.1897326 L38.9556989,49.1897325 C38.8577746,49.9812662 38.3754713,50.67284 37.667703,51.036605 L18.7375269,60.7440265 L18.4101421,60.9276334 L18.4101423,60.9276333 C16.9141658,61.8418636 16.0009389,63.4714674 16,65.2283758 L16,66.070809 L16.0129231,66.3948217 C16.1766149,68.4123376 17.860922,70 19.91569,70 L68.0843101,70 L68.08431,70 C70.2460467,70 71.9988087,68.243122 72,66.0751224 L72,65.2326893 C72,63.3382982 70.9446194,61.6037466 69.2624598,60.7440295 L50.3322837,51.036608 L50.3322835,51.0366079 C49.5291218,50.6249082 49.0240448,49.7962466 49.024903,48.8916436 L49.024903,48.4812278 C49.024903,47.8029608 49.3005955,47.1527756 49.7852106,46.6775603 L52.7941352,43.7376813 L52.7941354,43.7376811 C55.204308,41.3832325 56.5636029,38.151975 56.5633606,34.7776456 L56.5633606,28.0273769 L56.5633606,28.0273774 C56.5633606,21.3848531 51.1940878,16 44.5707524,16 L44.5707528,16 Z",
    id: "形状",
    fill: "#CCCCCC",
    fillRule: "nonzero",
    mask: "url(#mask-2)"
  }))))));
  var stagedComponents = {};
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(stagedComponents, "__esModule", { value: true });
  var staged_1 = stagedComponents.staged = void 0;
  const react_1 = __importDefault(React$1);
  function processNext(next) {
    if (typeof next === "function") {
      return react_1.default.createElement(Stage, { stage: next });
    } else {
      return next;
    }
  }
  function Stage(props) {
    const next = props.stage();
    return processNext(next);
  }
  function staged(stage) {
    return function Staged(props, ref) {
      const next = stage(props, ref);
      return processNext(next);
    };
  }
  staged_1 = stagedComponents.staged = staged;
  function toCSSLength(val) {
    return typeof val === "number" ? `${val}px` : val;
  }
  const LazyDetector = (props) => {
    const ref = React$1.useRef(null);
    const [inViewport] = useInViewport(ref);
    React$1.useEffect(() => {
      if (inViewport) {
        props.onActive();
      }
    }, [inViewport]);
    return React$1.createElement("div", {
      ref
    });
  };
  const useIsomorphicUpdateLayoutEffect = createUpdateEffect(useIsomorphicLayoutEffect$2);
  const ImageIcon = () => React$1.createElement("svg", {
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, React$1.createElement("path", {
    d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
    fill: "#DBDBDB",
    fillRule: "nonzero"
  }));
  const BrokenImageIcon = () => React$1.createElement("svg", {
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, React$1.createElement("path", {
    d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
    fill: "#DBDBDB",
    fillRule: "nonzero"
  }));
  const classPrefix$1k = `adm-image`;
  const defaultProps$12 = {
    fit: "fill",
    placeholder: React$1.createElement("div", {
      className: `${classPrefix$1k}-tip`
    }, React$1.createElement(ImageIcon, null)),
    fallback: React$1.createElement("div", {
      className: `${classPrefix$1k}-tip`
    }, React$1.createElement(BrokenImageIcon, null)),
    lazy: false,
    draggable: false
  };
  const Image$1 = staged_1((p) => {
    const props = mergeProps(defaultProps$12, p);
    const [loaded, setLoaded] = React$1.useState(false);
    const [failed, setFailed] = React$1.useState(false);
    const ref = React$1.useRef(null);
    const imgRef = React$1.useRef(null);
    let src = props.src;
    let srcSet = props.srcSet;
    const [initialized, setInitialized] = React$1.useState(!props.lazy);
    src = initialized ? props.src : void 0;
    srcSet = initialized ? props.srcSet : void 0;
    useIsomorphicUpdateLayoutEffect(() => {
      setLoaded(false);
      setFailed(false);
    }, [src]);
    React$1.useEffect(() => {
      var _a;
      if ((_a = imgRef.current) === null || _a === void 0 ? void 0 : _a.complete) {
        setLoaded(true);
      }
    }, []);
    function renderInner() {
      if (failed) {
        return React$1.createElement(React$1.Fragment, null, props.fallback);
      }
      const img = React$1.createElement("img", {
        ref: imgRef,
        id: props.id,
        className: `${classPrefix$1k}-img`,
        src,
        alt: props.alt,
        onClick: props.onClick,
        onLoad: (e2) => {
          var _a;
          setLoaded(true);
          (_a = props.onLoad) === null || _a === void 0 ? void 0 : _a.call(props, e2);
        },
        onError: (e2) => {
          var _a;
          setFailed(true);
          (_a = props.onError) === null || _a === void 0 ? void 0 : _a.call(props, e2);
        },
        style: {
          objectFit: props.fit,
          display: loaded ? "block" : "none"
        },
        crossOrigin: props.crossOrigin,
        decoding: props.decoding,
        loading: props.loading,
        referrerPolicy: props.referrerPolicy,
        sizes: props.sizes,
        srcSet,
        useMap: props.useMap,
        draggable: props.draggable
      });
      return React$1.createElement(React$1.Fragment, null, !loaded && props.placeholder, img);
    }
    const style = {};
    if (props.width) {
      style["--width"] = toCSSLength(props.width);
      style["width"] = toCSSLength(props.width);
    }
    if (props.height) {
      style["--height"] = toCSSLength(props.height);
      style["height"] = toCSSLength(props.height);
    }
    return withNativeProps(props, React$1.createElement("div", {
      ref,
      className: classPrefix$1k,
      style,
      onClick: props.onContainerClick
    }, props.lazy && !initialized && React$1.createElement(LazyDetector, {
      onActive: () => {
        setInitialized(true);
      }
    }), renderInner()));
  });
  const classPrefix$1j = "adm-avatar";
  const defaultProps$11 = {
    fallback: React$1.createElement(Fallback, null),
    fit: "cover"
  };
  const Avatar = (p) => {
    const props = mergeProps(defaultProps$11, p);
    return withNativeProps(props, React$1.createElement(Image$1, {
      className: classPrefix$1j,
      src: props.src,
      fallback: props.fallback,
      placeholder: props.fallback,
      alt: props.alt,
      lazy: props.lazy,
      fit: props.fit,
      onClick: props.onClick,
      onError: props.onError,
      onLoad: props.onLoad
    }));
  };
  const classPrefix$1i = `adm-badge`;
  const dot = React$1.createElement(React$1.Fragment, null);
  const Badge$1 = (props) => {
    const {
      content,
      color,
      children
    } = props;
    const isDot = content === dot;
    const badgeClass = classNames(classPrefix$1i, {
      [`${classPrefix$1i}-fixed`]: !!children,
      [`${classPrefix$1i}-dot`]: isDot,
      [`${classPrefix$1i}-bordered`]: props.bordered
    });
    const element = content || content === 0 ? withNativeProps(props, React$1.createElement("div", {
      className: badgeClass,
      style: {
        "--color": color
      }
    }, !isDot && React$1.createElement("div", {
      className: `${classPrefix$1i}-content`
    }, content))) : null;
    return children ? React$1.createElement("div", {
      className: classNames(`${classPrefix$1i}-wrapper`, props.wrapperClassName),
      style: props.wrapperStyle
    }, children, element) : element;
  };
  const Badge = attachPropertiesToComponent(Badge$1, {
    dot
  });
  const classPrefix$1h = `adm-dot-loading`;
  const colorRecord$3 = {
    default: "var(--adm-color-weak)",
    primary: "var(--adm-color-primary)",
    white: "var(--adm-color-white)"
  };
  const defaultProps$10 = {
    color: "default"
  };
  const DotLoading = React$1.memo((p) => {
    var _a;
    const props = mergeProps(defaultProps$10, p);
    return withNativeProps(props, React$1.createElement("div", {
      style: {
        color: (_a = colorRecord$3[props.color]) !== null && _a !== void 0 ? _a : props.color
      },
      className: classNames("adm-loading", classPrefix$1h)
    }, React$1.createElement("svg", {
      height: "1em",
      viewBox: "0 0 100 40",
      style: {
        verticalAlign: "-0.125em"
      }
    }, React$1.createElement("g", {
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd"
    }, React$1.createElement("g", {
      transform: "translate(-100.000000, -71.000000)"
    }, React$1.createElement("g", {
      transform: "translate(95.000000, 71.000000)"
    }, React$1.createElement("g", {
      transform: "translate(5.000000, 0.000000)"
    }, [0, 1, 2].map((i2) => React$1.createElement("rect", {
      key: i2,
      fill: "currentColor",
      x: 20 + i2 * 26,
      y: "16",
      width: "8",
      height: "8",
      rx: "2"
    }, React$1.createElement("animate", {
      attributeName: "y",
      from: "16",
      to: "16",
      dur: "2s",
      begin: `${i2 * 0.2}s`,
      repeatCount: "indefinite",
      values: "16; 6; 26; 16; 16",
      keyTimes: "0; 0.1; 0.3; 0.4; 1"
    }))))))))));
  });
  function isPromise(obj) {
    return !!obj && typeof obj === "object" && typeof obj.then === "function";
  }
  function isIOS() {
    return canUseDom$1 ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
  }
  const classPrefix$1g = `adm-button`;
  const defaultProps$$ = {
    color: "default",
    fill: "solid",
    block: false,
    loading: false,
    loadingIcon: React$1.createElement(DotLoading, {
      color: "currentColor"
    }),
    type: "button",
    shape: "default",
    size: "middle"
  };
  const Button = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$$, p);
    const [innerLoading, setInnerLoading] = React$1.useState(false);
    const nativeButtonRef = React$1.useRef(null);
    const loading = props.loading === "auto" ? innerLoading : props.loading;
    const disabled = props.disabled || loading;
    React$1.useImperativeHandle(ref, () => ({
      get nativeElement() {
        return nativeButtonRef.current;
      }
    }));
    const handleClick = (e2) => __awaiter(void 0, void 0, void 0, function* () {
      if (!props.onClick)
        return;
      const promise = props.onClick(e2);
      if (isPromise(promise)) {
        try {
          setInnerLoading(true);
          yield promise;
          setInnerLoading(false);
        } catch (e3) {
          setInnerLoading(false);
          throw e3;
        }
      }
    });
    return withNativeProps(props, React$1.createElement("button", {
      ref: nativeButtonRef,
      type: props.type,
      onClick: handleClick,
      className: classNames(classPrefix$1g, {
        [`${classPrefix$1g}-${props.color}`]: props.color,
        [`${classPrefix$1g}-block`]: props.block,
        [`${classPrefix$1g}-disabled`]: disabled,
        [`${classPrefix$1g}-fill-outline`]: props.fill === "outline",
        [`${classPrefix$1g}-fill-none`]: props.fill === "none",
        [`${classPrefix$1g}-mini`]: props.size === "mini",
        [`${classPrefix$1g}-small`]: props.size === "small",
        [`${classPrefix$1g}-large`]: props.size === "large",
        [`${classPrefix$1g}-loading`]: loading
      }, `${classPrefix$1g}-shape-${props.shape}`),
      disabled,
      onMouseDown: props.onMouseDown,
      onMouseUp: props.onMouseUp,
      onTouchStart: props.onTouchStart,
      onTouchEnd: props.onTouchEnd
    }, loading ? React$1.createElement("div", {
      className: `${classPrefix$1g}-loading-wrapper`
    }, props.loadingIcon, props.loadingText) : React$1.createElement("span", null, props.children)));
  });
  const ArrowLeft = () => {
    return React$1.createElement("svg", {
      height: "1em",
      viewBox: "0 0 44 44"
    }, React$1.createElement("g", {
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd"
    }, React$1.createElement("g", {
      transform: "translate(-100.000000, -22.000000)"
    }, React$1.createElement("g", {
      transform: "translate(100.000000, 22.000000)"
    }, React$1.createElement("rect", {
      x: "0",
      y: "0",
      width: "44",
      height: "44"
    }), React$1.createElement("g", {
      transform: "translate(12.000000, 4.000000)",
      fill: "currentColor",
      fillRule: "nonzero"
    }, React$1.createElement("path", {
      d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
    }))))));
  };
  const ArrowLeftDouble = () => {
    return React$1.createElement("svg", {
      height: "1em",
      viewBox: "0 0 44 44"
    }, React$1.createElement("g", {
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd"
    }, React$1.createElement("g", {
      transform: "translate(-24.000000, -22.000000)"
    }, React$1.createElement("g", {
      transform: "translate(24.000000, 22.000000)"
    }, React$1.createElement("rect", {
      x: "0",
      y: "0",
      width: "44",
      height: "44"
    }), React$1.createElement("g", {
      transform: "translate(7.000000, 4.000000)",
      fill: "currentColor",
      fillRule: "nonzero"
    }, React$1.createElement("path", {
      d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
    }), React$1.createElement("path", {
      d: "M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z"
    }))))));
  };
  var isoWeek$1 = { exports: {} };
  (function(module2, exports3) {
    !function(e2, t) {
      module2.exports = t();
    }(commonjsGlobal, function() {
      var e2 = "day";
      return function(t, i2, s) {
        var a = function(t2) {
          return t2.add(4 - t2.isoWeekday(), e2);
        }, d = i2.prototype;
        d.isoWeekYear = function() {
          return a(this).year();
        }, d.isoWeek = function(t2) {
          if (!this.$utils().u(t2))
            return this.add(7 * (t2 - this.isoWeek()), e2);
          var i3, d2, n3, o, r = a(this), u = (i3 = this.isoWeekYear(), d2 = this.$u, n3 = (d2 ? s.utc : s)().year(i3).startOf("year"), o = 4 - n3.isoWeekday(), n3.isoWeekday() > 4 && (o += 7), n3.add(o, e2));
          return r.diff(u, "week") + 1;
        }, d.isoWeekday = function(e3) {
          return this.$utils().u(e3) ? this.day() || 7 : this.day(this.day() % 7 ? e3 : e3 - 7);
        };
        var n2 = d.startOf;
        d.startOf = function(e3, t2) {
          var i3 = this.$utils(), s2 = !!i3.u(t2) || t2;
          return "isoweek" === i3.p(e3) ? s2 ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : n2.bind(this)(e3, t2);
        };
      };
    });
  })(isoWeek$1);
  var isoWeekExports = isoWeek$1.exports;
  const isoWeek = /* @__PURE__ */ getDefaultExportFromCjs(isoWeekExports);
  function usePropsValue(options) {
    const {
      value,
      defaultValue,
      onChange
    } = options;
    const update2 = useUpdate$1();
    const stateRef = React$1.useRef(value !== void 0 ? value : defaultValue);
    if (value !== void 0) {
      stateRef.current = value;
    }
    const setState = useMemoizedFn((v, forceTrigger = false) => {
      const nextValue = typeof v === "function" ? v(stateRef.current) : v;
      if (!forceTrigger && nextValue === stateRef.current)
        return;
      stateRef.current = nextValue;
      update2();
      return onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
    });
    return [stateRef.current, setState];
  }
  function replaceMessage$1(template, kv) {
    return template.replace(/\$\{\w+\}/g, (str) => {
      const key = str.slice(2, -1);
      return kv[key];
    });
  }
  function devWarning(component, message) {
    {
      console.warn(`[antd-mobile: ${component}] ${message}`);
    }
  }
  function devError(component, message) {
    {
      console.error(`[antd-mobile: ${component}] ${message}`);
    }
  }
  function convertValueToRange$1(selectionMode, value) {
    if (selectionMode === void 0 || value === null)
      return null;
    if (Array.isArray(value)) {
      return value;
    }
    return [value, value];
  }
  function convertPageToDayjs$1(page) {
    return dayjs().year(page.year).month(page.month - 1).date(1);
  }
  dayjs.extend(isoWeek);
  const classPrefix$1f = "adm-calendar";
  const defaultProps$_ = {
    weekStartsOn: "Sunday",
    defaultValue: null,
    allowClear: true,
    prevMonthButton: React$1.createElement(ArrowLeft, null),
    prevYearButton: React$1.createElement(ArrowLeftDouble, null),
    nextMonthButton: React$1.createElement(ArrowLeft, null),
    nextYearButton: React$1.createElement(ArrowLeftDouble, null)
  };
  const Calendar = React$1.forwardRef((p, ref) => {
    const today = dayjs();
    const props = mergeProps(defaultProps$_, p);
    const {
      locale
    } = useConfig();
    const markItems = [...locale.Calendar.markItems];
    if (props.weekStartsOn === "Sunday") {
      const item = markItems.pop();
      if (item)
        markItems.unshift(item);
    }
    const [dateRange, setDateRange] = usePropsValue({
      value: props.value === void 0 ? void 0 : convertValueToRange$1(props.selectionMode, props.value),
      defaultValue: convertValueToRange$1(props.selectionMode, props.defaultValue),
      onChange: (v) => {
        var _a, _b;
        if (props.selectionMode === "single") {
          (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v ? v[0] : null);
        } else if (props.selectionMode === "range") {
          (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, v);
        }
      }
    });
    const [intermediate, setIntermediate] = React$1.useState(false);
    const [current, setCurrent] = React$1.useState(() => dayjs(dateRange ? dateRange[0] : today).date(1));
    useUpdateEffect(() => {
      var _a;
      (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, current.year(), current.month() + 1);
    }, [current]);
    React$1.useImperativeHandle(ref, () => ({
      jumpTo: (pageOrPageGenerator) => {
        let page;
        if (typeof pageOrPageGenerator === "function") {
          page = pageOrPageGenerator({
            year: current.year(),
            month: current.month() + 1
          });
        } else {
          page = pageOrPageGenerator;
        }
        setCurrent(convertPageToDayjs$1(page));
      },
      jumpToToday: () => {
        setCurrent(dayjs().date(1));
      }
    }));
    const handlePageChange = (action, num, type) => {
      const nxtCurrent = current[action](num, type);
      if (action === "subtract" && props.minPage) {
        const minPage = convertPageToDayjs$1(props.minPage);
        if (nxtCurrent.isBefore(minPage, type)) {
          return;
        }
      }
      if (action === "add" && props.maxPage) {
        const maxPage = convertPageToDayjs$1(props.maxPage);
        if (nxtCurrent.isAfter(maxPage, type)) {
          return;
        }
      }
      setCurrent(nxtCurrent);
    };
    const header = React$1.createElement("div", {
      className: `${classPrefix$1f}-header`
    }, React$1.createElement("a", {
      className: `${classPrefix$1f}-arrow-button ${classPrefix$1f}-arrow-button-year`,
      onClick: () => {
        handlePageChange("subtract", 1, "year");
      }
    }, props.prevYearButton), React$1.createElement("a", {
      className: `${classPrefix$1f}-arrow-button ${classPrefix$1f}-arrow-button-month`,
      onClick: () => {
        handlePageChange("subtract", 1, "month");
      }
    }, props.prevMonthButton), React$1.createElement("div", {
      className: `${classPrefix$1f}-title`
    }, replaceMessage$1(locale.Calendar.yearAndMonth, {
      year: current.year().toString(),
      month: (current.month() + 1).toString()
    })), React$1.createElement("a", {
      className: classNames(`${classPrefix$1f}-arrow-button`, `${classPrefix$1f}-arrow-button-right`, `${classPrefix$1f}-arrow-button-right-month`),
      onClick: () => {
        handlePageChange("add", 1, "month");
      }
    }, props.nextMonthButton), React$1.createElement("a", {
      className: classNames(`${classPrefix$1f}-arrow-button`, `${classPrefix$1f}-arrow-button-right`, `${classPrefix$1f}-arrow-button-right-year`),
      onClick: () => {
        handlePageChange("add", 1, "year");
      }
    }, props.nextYearButton));
    const maxDay = React$1.useMemo(() => props.max && dayjs(props.max), [props.max]);
    const minDay = React$1.useMemo(() => props.min && dayjs(props.min), [props.min]);
    function renderCells() {
      var _a;
      const cells = [];
      let iterator = current.subtract(current.isoWeekday(), "day");
      if (props.weekStartsOn === "Monday") {
        iterator = iterator.add(1, "day");
      }
      while (cells.length < 6 * 7) {
        const d = iterator;
        let isSelect = false;
        let isBegin = false;
        let isEnd = false;
        let isSelectRowBegin = false;
        let isSelectRowEnd = false;
        if (dateRange) {
          const [begin, end] = dateRange;
          isBegin = d.isSame(begin, "day");
          isEnd = d.isSame(end, "day");
          isSelect = isBegin || isEnd || d.isAfter(begin, "day") && d.isBefore(end, "day");
          if (isSelect) {
            isSelectRowBegin = (cells.length % 7 === 0 || d.isSame(d.startOf("month"), "day")) && !isBegin;
            isSelectRowEnd = (cells.length % 7 === 6 || d.isSame(d.endOf("month"), "day")) && !isEnd;
          }
        }
        const inThisMonth = d.month() === current.month();
        const disabled = props.shouldDisableDate ? props.shouldDisableDate(d.toDate()) : maxDay && d.isAfter(maxDay, "day") || minDay && d.isBefore(minDay, "day");
        cells.push(React$1.createElement("div", {
          key: d.valueOf(),
          className: classNames(`${classPrefix$1f}-cell`, (disabled || !inThisMonth) && `${classPrefix$1f}-cell-disabled`, inThisMonth && {
            [`${classPrefix$1f}-cell-today`]: d.isSame(today, "day"),
            [`${classPrefix$1f}-cell-selected`]: isSelect,
            [`${classPrefix$1f}-cell-selected-begin`]: isBegin,
            [`${classPrefix$1f}-cell-selected-end`]: isEnd,
            [`${classPrefix$1f}-cell-selected-row-begin`]: isSelectRowBegin,
            [`${classPrefix$1f}-cell-selected-row-end`]: isSelectRowEnd
          }),
          onClick: () => {
            if (!props.selectionMode)
              return;
            if (disabled)
              return;
            const date = d.toDate();
            if (!inThisMonth) {
              setCurrent(d.clone().date(1));
            }
            function shouldClear() {
              if (!props.allowClear)
                return false;
              if (!dateRange)
                return false;
              const [begin, end] = dateRange;
              return d.isSame(begin, "date") && d.isSame(end, "day");
            }
            if (props.selectionMode === "single") {
              if (props.allowClear && shouldClear()) {
                setDateRange(null);
                return;
              }
              setDateRange([date, date]);
            } else if (props.selectionMode === "range") {
              if (!dateRange) {
                setDateRange([date, date]);
                setIntermediate(true);
                return;
              }
              if (shouldClear()) {
                setDateRange(null);
                setIntermediate(false);
                return;
              }
              if (intermediate) {
                const another = dateRange[0];
                setDateRange(another > date ? [date, another] : [another, date]);
                setIntermediate(false);
              } else {
                setDateRange([date, date]);
                setIntermediate(true);
              }
            }
          }
        }, React$1.createElement("div", {
          className: `${classPrefix$1f}-cell-top`
        }, props.renderDate ? props.renderDate(d.toDate()) : d.date()), React$1.createElement("div", {
          className: `${classPrefix$1f}-cell-bottom`
        }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
        iterator = iterator.add(1, "day");
      }
      return cells;
    }
    const body = React$1.createElement("div", {
      className: `${classPrefix$1f}-cells`
    }, renderCells());
    const mark = React$1.createElement("div", {
      className: `${classPrefix$1f}-mark`
    }, markItems.map((item, index2) => React$1.createElement("div", {
      key: index2,
      className: `${classPrefix$1f}-mark-cell`
    }, item)));
    {
      React$1.useEffect(() => {
        devWarning("Calendar", "Calendar will be removed in the future, please use CalendarPickerView instead.");
      }, []);
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$1f
    }, header, mark, body));
  });
  const classPrefix$1e = `adm-divider`;
  const defaultProps$Z = {
    contentPosition: "center",
    direction: "horizontal"
  };
  const Divider = (p) => {
    const props = mergeProps(defaultProps$Z, p);
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$1e, `${classPrefix$1e}-${props.direction}`, `${classPrefix$1e}-${props.contentPosition}`)
    }, props.children && React$1.createElement("div", {
      className: `${classPrefix$1e}-content`
    }, props.children)));
  };
  var isSameOrBefore$1 = { exports: {} };
  (function(module2, exports3) {
    !function(e2, i2) {
      module2.exports = i2();
    }(commonjsGlobal, function() {
      return function(e2, i2) {
        i2.prototype.isSameOrBefore = function(e3, i3) {
          return this.isSame(e3, i3) || this.isBefore(e3, i3);
        };
      };
    });
  })(isSameOrBefore$1);
  var isSameOrBeforeExports = isSameOrBefore$1.exports;
  const isSameOrBefore = /* @__PURE__ */ getDefaultExportFromCjs(isSameOrBeforeExports);
  function convertValueToRange(selectionMode, value) {
    if (selectionMode === void 0 || value === null)
      return null;
    if (Array.isArray(value)) {
      return value;
    }
    return [value, value];
  }
  function convertPageToDayjs(page) {
    return dayjs().year(page.year).month(page.month - 1).date(1);
  }
  dayjs.extend(isoWeek);
  dayjs.extend(isSameOrBefore);
  const classPrefix$1d = "adm-calendar-picker-view";
  const defaultProps$Y = {
    weekStartsOn: "Sunday",
    defaultValue: null,
    allowClear: true,
    usePopup: true,
    selectionMode: "single"
  };
  const CalendarPickerView = React$1.forwardRef((p, ref) => {
    var _a;
    const today = dayjs();
    const props = mergeProps(defaultProps$Y, p);
    const {
      locale
    } = useConfig();
    const markItems = [...locale.Calendar.markItems];
    if (props.weekStartsOn === "Sunday") {
      const item = markItems.pop();
      if (item)
        markItems.unshift(item);
    }
    const [dateRange, setDateRange] = usePropsValue({
      value: props.value === void 0 ? void 0 : convertValueToRange(props.selectionMode, props.value),
      defaultValue: convertValueToRange(props.selectionMode, props.defaultValue),
      onChange: (v) => {
        var _a2, _b;
        if (props.selectionMode === "single") {
          (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v ? v[0] : null);
        } else if (props.selectionMode === "range") {
          (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, v);
        }
      }
    });
    const [intermediate, setIntermediate] = React$1.useState(false);
    const [current, setCurrent] = React$1.useState(() => dayjs(dateRange ? dateRange[0] : today).date(1));
    React$1.useImperativeHandle(ref, () => ({
      jumpTo: (pageOrPageGenerator) => {
        let page;
        if (typeof pageOrPageGenerator === "function") {
          page = pageOrPageGenerator({
            year: current.year(),
            month: current.month() + 1
          });
        } else {
          page = pageOrPageGenerator;
        }
        setCurrent(convertPageToDayjs(page));
      },
      jumpToToday: () => {
        setCurrent(dayjs().date(1));
      },
      getDateRange: () => dateRange
    }));
    const header = React$1.createElement("div", {
      className: `${classPrefix$1d}-header`
    }, React$1.createElement("div", {
      className: `${classPrefix$1d}-title`
    }, (_a = props.title) !== null && _a !== void 0 ? _a : locale.Calendar.title));
    const maxDay = React$1.useMemo(() => props.max ? dayjs(props.max) : current.add(6, "month"), [props.max, current]);
    const minDay = React$1.useMemo(() => props.min ? dayjs(props.min) : current, [props.min, current]);
    function renderBody() {
      var _a2;
      const cells = [];
      let monthIterator = minDay;
      while (monthIterator.isSameOrBefore(maxDay, "month")) {
        const year = monthIterator.year();
        const month = monthIterator.month();
        const renderMap = {
          year,
          month: month + 1
        };
        cells.push(React$1.createElement("div", {
          key: `${year}-${month}`
        }, React$1.createElement("div", {
          className: `${classPrefix$1d}-title`
        }, (_a2 = locale.Calendar.yearAndMonth) === null || _a2 === void 0 ? void 0 : _a2.replace(/\${(.*?)}/g, (_, variable) => {
          var _a3;
          return (_a3 = renderMap[variable]) === null || _a3 === void 0 ? void 0 : _a3.toString();
        })), React$1.createElement("div", {
          className: `${classPrefix$1d}-cells`
        }, Array(props.weekStartsOn === "Monday" ? monthIterator.date(1).isoWeekday() - 1 : monthIterator.date(1).isoWeekday()).fill(null).map((_, index2) => React$1.createElement("div", {
          key: index2,
          className: `${classPrefix$1d}-cell`
        })), Array(monthIterator.daysInMonth()).fill(null).map((_, index2) => {
          var _a3;
          const d = monthIterator.date(index2 + 1);
          let isSelect = false;
          let isBegin = false;
          let isEnd = false;
          let isSelectRowBegin = false;
          let isSelectRowEnd = false;
          if (dateRange) {
            const [begin, end] = dateRange;
            isBegin = d.isSame(begin, "day");
            isEnd = d.isSame(end, "day");
            isSelect = isBegin || isEnd || d.isAfter(begin, "day") && d.isBefore(end, "day");
            if (isSelect) {
              isSelectRowBegin = (cells.length % 7 === 0 || d.isSame(d.startOf("month"), "day")) && !isBegin;
              isSelectRowEnd = (cells.length % 7 === 6 || d.isSame(d.endOf("month"), "day")) && !isEnd;
            }
          }
          const disabled = props.shouldDisableDate ? props.shouldDisableDate(d.toDate()) : maxDay && d.isAfter(maxDay, "day") || minDay && d.isBefore(minDay, "day");
          const renderTop = () => {
            var _a4;
            const top = (_a4 = props.renderTop) === null || _a4 === void 0 ? void 0 : _a4.call(props, d.toDate());
            if (top) {
              return top;
            }
            if (props.selectionMode === "range") {
              if (isBegin) {
                return locale.Calendar.start;
              }
              if (isEnd) {
                return locale.Calendar.end;
              }
            }
            if (d.isSame(today, "day") && !isSelect) {
              return locale.Calendar.today;
            }
          };
          return React$1.createElement("div", {
            key: d.valueOf(),
            className: classNames(`${classPrefix$1d}-cell`, {
              [`${classPrefix$1d}-cell-today`]: d.isSame(today, "day"),
              [`${classPrefix$1d}-cell-selected`]: isSelect,
              [`${classPrefix$1d}-cell-selected-begin`]: isBegin,
              [`${classPrefix$1d}-cell-selected-end`]: isEnd,
              [`${classPrefix$1d}-cell-selected-row-begin`]: isSelectRowBegin,
              [`${classPrefix$1d}-cell-selected-row-end`]: isSelectRowEnd,
              [`${classPrefix$1d}-cell-disabled`]: !!disabled
            }),
            onClick: () => {
              if (!props.selectionMode)
                return;
              if (disabled)
                return;
              const date = d.toDate();
              function shouldClear() {
                if (!props.allowClear)
                  return false;
                if (!dateRange)
                  return false;
                const [begin, end] = dateRange;
                return d.isSame(begin, "date") && d.isSame(end, "day");
              }
              if (props.selectionMode === "single") {
                if (props.allowClear && shouldClear()) {
                  setDateRange(null);
                  return;
                }
                setDateRange([date, date]);
              } else if (props.selectionMode === "range") {
                if (!dateRange) {
                  setDateRange([date, date]);
                  setIntermediate(true);
                  return;
                }
                if (shouldClear()) {
                  setDateRange(null);
                  setIntermediate(false);
                  return;
                }
                if (intermediate) {
                  const another = dateRange[0];
                  setDateRange(another > date ? [date, another] : [another, date]);
                  setIntermediate(false);
                } else {
                  setDateRange([date, date]);
                  setIntermediate(true);
                }
              }
            }
          }, React$1.createElement("div", {
            className: `${classPrefix$1d}-cell-top`
          }, renderTop()), React$1.createElement("div", {
            className: `${classPrefix$1d}-cell-date`
          }, props.renderDate ? props.renderDate(d.toDate()) : d.date()), React$1.createElement("div", {
            className: `${classPrefix$1d}-cell-bottom`
          }, (_a3 = props.renderBottom) === null || _a3 === void 0 ? void 0 : _a3.call(props, d.toDate())));
        }))));
        monthIterator = monthIterator.add(1, "month");
      }
      return cells;
    }
    const body = React$1.createElement("div", {
      className: `${classPrefix$1d}-body`
    }, renderBody());
    const mark = React$1.createElement("div", {
      className: `${classPrefix$1d}-mark`
    }, markItems.map((item, index2) => React$1.createElement("div", {
      key: index2,
      className: `${classPrefix$1d}-mark-cell`
    }, item)));
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$1d
    }, header, mark, body));
  });
  const classPrefix$1c = "adm-calendar-picker";
  const defaultProps$X = {
    weekStartsOn: "Sunday",
    defaultValue: null,
    allowClear: true,
    usePopup: true,
    selectionMode: "single"
  };
  const CalendarPicker = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$X, p);
    const {
      locale
    } = useConfig();
    const calendarRef = ref !== null && ref !== void 0 ? ref : React$1.useRef(null);
    const {
      visible,
      confirmText,
      popupClassName,
      popupStyle,
      popupBodyStyle,
      forceRender,
      closeOnMaskClick,
      onClose,
      onConfirm,
      onMaskClick,
      getContainer
    } = props, calendarViewProps = __rest(props, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]);
    const footer = React$1.createElement("div", {
      className: `${classPrefix$1c}-footer`
    }, React$1.createElement(Divider, null), React$1.createElement("div", {
      className: `${classPrefix$1c}-footer-bottom`
    }, React$1.createElement(Button, {
      color: "primary",
      onClick: () => {
        var _a, _b, _c, _d;
        const dateRange = (_b = (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.getDateRange()) !== null && _b !== void 0 ? _b : null;
        if (props.selectionMode === "single") {
          (_c = props.onConfirm) === null || _c === void 0 ? void 0 : _c.call(props, dateRange ? dateRange[0] : null);
        } else if (props.selectionMode === "range") {
          (_d = props.onConfirm) === null || _d === void 0 ? void 0 : _d.call(props, dateRange);
        }
        onClose === null || onClose === void 0 ? void 0 : onClose();
      }
    }, confirmText !== null && confirmText !== void 0 ? confirmText : locale.Calendar.confirm)));
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$1c
    }, React$1.createElement(Popup, {
      visible,
      className: classNames(`${classPrefix$1c}-popup`, popupClassName),
      showCloseButton: true,
      forceRender: ref ? true : forceRender,
      style: popupStyle,
      bodyStyle: Object.assign({
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        minHeight: "80vh",
        overflow: "auto"
      }, popupBodyStyle),
      onClose,
      onMaskClick: () => {
        onMaskClick === null || onMaskClick === void 0 ? void 0 : onMaskClick();
        if (closeOnMaskClick) {
          onClose === null || onClose === void 0 ? void 0 : onClose();
        }
      },
      getContainer
    }, React$1.createElement(CalendarPickerView, Object.assign({
      ref: calendarRef
    }, calendarViewProps)), footer)));
  });
  function useResizeEffect(effect, targetRef) {
    const fn = useMemoizedFn(effect);
    useIsomorphicLayoutEffect$2(() => {
      const target = targetRef.current;
      if (!target)
        return;
      if (window.ResizeObserver) {
        let animationFrame;
        const observer = new ResizeObserver(() => {
          animationFrame = window.requestAnimationFrame(() => fn(target));
        });
        observer.observe(target);
        return () => {
          window.cancelAnimationFrame(animationFrame);
          observer.disconnect();
        };
      } else {
        fn(target);
      }
    }, [targetRef]);
  }
  function useMutationEffect(effect, targetRef, options) {
    const fn = useMemoizedFn(effect);
    React$1.useEffect(() => {
      const observer = new MutationObserver(() => {
        fn();
      });
      if (!targetRef.current)
        return;
      observer.observe(targetRef.current, options);
      return () => {
        observer.disconnect();
      };
    }, [targetRef]);
  }
  function bound(position, min2, max2) {
    let ret = position;
    if (min2 !== void 0) {
      ret = Math.max(position, min2);
    }
    if (max2 !== void 0) {
      ret = Math.min(ret, max2);
    }
    return ret;
  }
  const useTabListScroll = (targetRef, activeIndex) => {
    const [{
      scrollLeft
    }, api] = useSpring(() => ({
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    }));
    function animate(immediate = false) {
      const container = targetRef.current;
      if (!container)
        return;
      if (activeIndex === void 0)
        return;
      const activeTabWrapper = container.children.item(activeIndex);
      const activeTab = activeTabWrapper.children.item(0);
      const activeTabLeft = activeTab.offsetLeft;
      const activeTabWidth = activeTab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const containerScrollWidth = container.scrollWidth;
      const containerScrollLeft = container.scrollLeft;
      const maxScrollDistance = containerScrollWidth - containerWidth;
      if (maxScrollDistance <= 0)
        return;
      const nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
      api.start({
        scrollLeft: nextScrollLeft,
        from: {
          scrollLeft: containerScrollLeft
        },
        immediate: immediate && !scrollLeft.isAnimating
      });
    }
    useIsomorphicLayoutEffect$2(() => {
      animate(true);
    }, []);
    useIsomorphicUpdateLayoutEffect(() => {
      animate();
    }, [activeIndex]);
    useMutationEffect(() => {
      animate(true);
    }, targetRef, {
      subtree: true,
      childList: true,
      characterData: true
    });
    return {
      scrollLeft,
      animate
    };
  };
  const classPrefix$1b = `adm-scroll-mask`;
  const ScrollMask = (props) => {
    const maskRef = React$1.useRef(null);
    const [{
      leftMaskOpacity,
      rightMaskOpacity
    }, api] = useSpring(() => ({
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    }));
    const {
      run: updateMask
    } = useThrottleFn((immediate = false) => {
      const mask = maskRef.current;
      if (!mask)
        return;
      const scrollEl = props.scrollTrackRef.current;
      if (!scrollEl)
        return;
      const scrollLeft = scrollEl.scrollLeft;
      const showLeftMask = scrollLeft > 0;
      const showRightMask = scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth;
      api.start({
        leftMaskOpacity: showLeftMask ? 1 : 0,
        rightMaskOpacity: showRightMask ? 1 : 0,
        immediate
      });
    }, {
      wait: 100,
      trailing: true,
      leading: true
    });
    React$1.useEffect(() => {
      updateMask(true);
    }, []);
    React$1.useEffect(() => {
      const scrollEl = props.scrollTrackRef.current;
      if (!scrollEl)
        return;
      scrollEl.addEventListener("scroll", updateMask);
      return () => scrollEl.removeEventListener("scroll", updateMask);
    }, []);
    return React$1.createElement(React$1.Fragment, null, React$1.createElement(animated.div, {
      ref: maskRef,
      className: classNames(classPrefix$1b, `${classPrefix$1b}-left`),
      style: {
        opacity: leftMaskOpacity
      }
    }), React$1.createElement(animated.div, {
      className: classNames(classPrefix$1b, `${classPrefix$1b}-right`),
      style: {
        opacity: rightMaskOpacity
      }
    }));
  };
  var reactIs = { exports: {} };
  var reactIs_development = {};
  /**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_SERVER_CONTEXT_TYPE:
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element2 = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      var hasWarnedAboutDeprecatedIsConcurrentMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isConcurrentMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
            hasWarnedAboutDeprecatedIsConcurrentMode = true;
            console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement2(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      function isSuspenseList(object) {
        return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
      }
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element2;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.SuspenseList = SuspenseList;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement2;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isSuspenseList = isSuspenseList;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }
  {
    reactIs.exports = reactIs_development;
  }
  var reactIsExports = reactIs.exports;
  function traverseReactNode(children, fn) {
    let i2 = 0;
    function handle(target) {
      React$1.Children.forEach(target, (child) => {
        if (!reactIsExports.isFragment(child)) {
          fn(child, i2);
          i2 += 1;
        } else {
          handle(child.props.children);
        }
      });
    }
    handle(children);
  }
  const classPrefix$1a = `adm-capsule-tabs`;
  const CapsuleTab = () => null;
  const CapsuleTabs = (props) => {
    var _a;
    const tabListContainerRef = React$1.useRef(null);
    const rootRef = React$1.useRef(null);
    const keyToIndexRecord = {};
    let firstActiveKey = null;
    const panes = [];
    traverseReactNode(props.children, (child, index2) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      if (index2 === 0) {
        firstActiveKey = key;
      }
      const length = panes.push(child);
      keyToIndexRecord[key] = length - 1;
    });
    const [activeKey, setActiveKey] = usePropsValue({
      value: props.activeKey,
      defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
      onChange: (v) => {
        var _a2;
        if (v === null)
          return;
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
      }
    });
    const {
      scrollLeft,
      animate
    } = useTabListScroll(tabListContainerRef, keyToIndexRecord[activeKey]);
    useResizeEffect(() => {
      animate(true);
    }, rootRef);
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$1a,
      ref: rootRef
    }, React$1.createElement("div", {
      className: `${classPrefix$1a}-header`
    }, React$1.createElement(ScrollMask, {
      scrollTrackRef: tabListContainerRef
    }), React$1.createElement(animated.div, {
      className: `${classPrefix$1a}-tab-list`,
      ref: tabListContainerRef,
      scrollLeft
    }, panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
      key: pane.key,
      className: `${classPrefix$1a}-tab-wrapper`
    }, React$1.createElement("div", {
      onClick: () => {
        const {
          key
        } = pane;
        if (pane.props.disabled)
          return;
        if (key === void 0 || key === null) {
          return;
        }
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$1a}-tab`, {
        [`${classPrefix$1a}-tab-active`]: pane.key === activeKey,
        [`${classPrefix$1a}-tab-disabled`]: pane.props.disabled
      })
    }, pane.props.title)))))), panes.map((pane) => {
      if (pane.props.children === void 0) {
        return null;
      }
      const active = pane.key === activeKey;
      return React$1.createElement(ShouldRender, {
        key: pane.key,
        active,
        forceRender: pane.props.forceRender,
        destroyOnClose: pane.props.destroyOnClose
      }, React$1.createElement("div", {
        className: `${classPrefix$1a}-content`,
        style: {
          display: active ? "block" : "none"
        }
      }, pane.props.children));
    })));
  };
  const index$h = attachPropertiesToComponent(CapsuleTabs, {
    Tab: CapsuleTab
  });
  const classPrefix$19 = `adm-card`;
  const Card = (props) => {
    const renderHeader = () => {
      if (!(props.title || props.extra)) {
        return null;
      }
      return React$1.createElement("div", {
        className: classNames(`${classPrefix$19}-header`, props.headerClassName),
        style: props.headerStyle,
        onClick: props.onHeaderClick
      }, React$1.createElement("div", {
        className: `${classPrefix$19}-header-title`
      }, props.title), props.extra);
    };
    const renderBody = () => {
      if (!props.children) {
        return null;
      }
      return React$1.createElement("div", {
        className: classNames(`${classPrefix$19}-body`, props.bodyClassName),
        style: props.bodyStyle,
        onClick: props.onBodyClick
      }, props.children);
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$19,
      onClick: props.onClick
    }, renderHeader(), renderBody()));
  };
  function rubberband(distance, dimension, constant2) {
    return distance * dimension * constant2 / (dimension + constant2 * distance);
  }
  function rubberbandIfOutOfBounds(position, min2, max2, dimension, constant2 = 0.15) {
    if (constant2 === 0)
      return bound(position, min2, max2);
    if (position < min2)
      return -rubberband(min2 - position, dimension, constant2) + min2;
    if (position > max2)
      return +rubberband(position - max2, dimension, constant2) + max2;
    return position;
  }
  function measureCSSLength(raw) {
    if (raw === null || raw === void 0 || raw === "") {
      {
        devError("Global", "Something went wrong when calculating CSS length. Please report an issue at https://github.com/ant-design/ant-design-mobile/issues/new/choose");
      }
      return 0;
    }
    const withUnit = raw.trim();
    if (withUnit.endsWith("px")) {
      return parseFloat(withUnit);
    } else if (withUnit.endsWith("rem")) {
      return parseFloat(withUnit) * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    } else if (withUnit.endsWith("vw")) {
      return parseFloat(withUnit) * window.innerWidth / 100;
    } else {
      {
        devError("Global", `You are using a not supported CSS unit in \`${raw}\`. Only \`px\` \`rem\` and \`vw\` are supported.`);
      }
      return 0;
    }
  }
  const classPrefix$18 = `adm-picker-view`;
  const Wheel = React$1.memo((props) => {
    const {
      value,
      column,
      renderLabel
    } = props;
    function onSelect(val) {
      props.onSelect(val, props.index);
    }
    const [{
      y
    }, api] = useSpring(() => ({
      from: {
        y: 0
      },
      config: {
        tension: 400,
        mass: 0.8
      }
    }));
    const draggingRef = React$1.useRef(false);
    const rootRef = React$1.useRef(null);
    const itemHeightMeasureRef = React$1.useRef(null);
    const itemHeight = React$1.useRef(34);
    useIsomorphicLayoutEffect$2(() => {
      const itemHeightMeasure = itemHeightMeasureRef.current;
      if (!itemHeightMeasure)
        return;
      itemHeight.current = measureCSSLength(window.getComputedStyle(itemHeightMeasure).getPropertyValue("height"));
    });
    useIsomorphicLayoutEffect$2(() => {
      if (draggingRef.current)
        return;
      if (value === null)
        return;
      const targetIndex = column.findIndex((item) => item.value === value);
      if (targetIndex < 0)
        return;
      const finalPosition = targetIndex * -itemHeight.current;
      api.start({
        y: finalPosition,
        immediate: y.goal !== finalPosition
      });
    }, [value, column]);
    useIsomorphicLayoutEffect$2(() => {
      if (column.length === 0) {
        if (value !== null) {
          onSelect(null);
        }
      } else {
        if (!column.some((item) => item.value === value)) {
          const firstItem = column[0];
          onSelect(firstItem.value);
        }
      }
    }, [column, value]);
    function scrollSelect(index2) {
      const finalPosition = index2 * -itemHeight.current;
      api.start({
        y: finalPosition
      });
      const item = column[index2];
      if (!item)
        return;
      onSelect(item.value);
    }
    const handleGestureState = (state) => {
      const {
        direction: [, direction],
        distance: [, distance],
        velocity: [, velocity],
        offset: [, offset2],
        last
      } = state;
      return {
        direction,
        distance,
        velocity,
        offset: offset2,
        last
      };
    };
    const handleDrag = (state) => {
      draggingRef.current = true;
      const min2 = -((column.length - 1) * itemHeight.current);
      const max2 = 0;
      const {
        direction,
        last,
        velocity,
        offset: offset2
      } = handleGestureState(state);
      if (last) {
        draggingRef.current = false;
        const position = offset2 + velocity * direction * 50;
        const boundNum = bound(position, min2, max2);
        const targetIndex = -Math.round(boundNum / itemHeight.current);
        scrollSelect(targetIndex);
      } else {
        const position = offset2;
        api.start({
          y: rubberbandIfOutOfBounds(position, min2, max2, itemHeight.current * 50, 0.2)
        });
      }
    };
    const handleWheel = (state) => {
      draggingRef.current = true;
      const min2 = -((column.length - 1) * itemHeight.current);
      const max2 = 0;
      const {
        direction,
        last,
        velocity,
        distance
      } = handleGestureState(state);
      const whellDir = -direction;
      const scrollY = y.get();
      if (last) {
        draggingRef.current = false;
        const speed = velocity * whellDir * 50;
        const position = scrollY + distance * whellDir + speed;
        const boundNum = bound(position, min2, max2);
        const targetIndex = -Math.round(boundNum / itemHeight.current);
        scrollSelect(targetIndex);
      } else {
        const position = scrollY + distance * whellDir;
        api.start({
          y: rubberbandIfOutOfBounds(position, min2, max2, itemHeight.current * 50, 0.2)
        });
      }
    };
    useDrag((state) => {
      state.event.stopPropagation();
      handleDrag(state);
    }, {
      axis: "y",
      from: () => [0, y.get()],
      filterTaps: true,
      pointer: {
        touch: true
      },
      target: rootRef
    });
    useWheel((state) => {
      state.event.stopPropagation();
      handleWheel(state);
    }, {
      target: props.mouseWheel ? rootRef : void 0,
      axis: "y",
      from: () => [0, y.get()],
      preventDefault: true,
      eventOptions: supportsPassive ? {
        passive: false
      } : void 0
    });
    let selectedIndex = null;
    function renderAccessible() {
      if (selectedIndex === null) {
        return null;
      }
      const current = column[selectedIndex];
      const previousIndex = selectedIndex - 1;
      const nextIndex = selectedIndex + 1;
      const previous = column[previousIndex];
      const next = column[nextIndex];
      return React$1.createElement("div", {
        className: `${classPrefix$18}-column-accessible`
      }, React$1.createElement("div", {
        className: `${classPrefix$18}-column-accessible-current`,
        role: "button",
        "aria-label": current ? `当前选择的是：${current.label}` : "当前未选择"
      }, "-"), React$1.createElement("div", {
        className: `${classPrefix$18}-column-accessible-button`,
        onClick: () => {
          if (!previous)
            return;
          scrollSelect(previousIndex);
        },
        role: previous ? "button" : "text",
        "aria-label": !previous ? "没有上一项" : `选择上一项：${previous.label}`
      }, "-"), React$1.createElement("div", {
        className: `${classPrefix$18}-column-accessible-button`,
        onClick: () => {
          if (!next)
            return;
          scrollSelect(nextIndex);
        },
        role: next ? "button" : "text",
        "aria-label": !next ? "没有下一项" : `选择下一项：${next.label}`
      }, "-"));
    }
    return React$1.createElement("div", {
      className: `${classPrefix$18}-column`
    }, React$1.createElement("div", {
      className: `${classPrefix$18}-item-height-measure`,
      ref: itemHeightMeasureRef
    }), React$1.createElement(animated.div, {
      ref: rootRef,
      style: {
        translateY: y
      },
      className: `${classPrefix$18}-column-wheel`,
      "aria-hidden": true
    }, column.map((item, index2) => {
      var _a;
      const selected = props.value === item.value;
      if (selected)
        selectedIndex = index2;
      function handleClick() {
        draggingRef.current = false;
        scrollSelect(index2);
      }
      return React$1.createElement("div", {
        key: (_a = item.key) !== null && _a !== void 0 ? _a : item.value,
        "data-selected": item.value === value,
        className: `${classPrefix$18}-column-item`,
        onClick: handleClick,
        "aria-hidden": !selected,
        "aria-label": selected ? "active" : ""
      }, React$1.createElement("div", {
        className: `${classPrefix$18}-column-item-label`
      }, renderLabel(item)));
    })), renderAccessible());
  }, (prev, next) => {
    if (prev.index !== next.index)
      return false;
    if (prev.value !== next.value)
      return false;
    if (prev.onSelect !== next.onSelect)
      return false;
    if (prev.renderLabel !== next.renderLabel)
      return false;
    if (prev.mouseWheel !== next.mouseWheel)
      return false;
    if (!isEqual$2(prev.column, next.column))
      return false;
    return true;
  });
  Wheel.displayName = "Wheel";
  function withCache(generate) {
    let cache = null;
    return () => {
      if (cache === null) {
        cache = generate();
      }
      return cache;
    };
  }
  function generateColumnsExtend(rawColumns, val) {
    const columns = withCache(() => {
      const c = typeof rawColumns === "function" ? rawColumns(val) : rawColumns;
      return c.map((column) => column.map((item) => typeof item === "string" ? {
        label: item,
        value: item
      } : item));
    });
    const items = withCache(() => {
      return val.map((v, index2) => {
        var _a;
        const column = columns()[index2];
        if (!column)
          return null;
        return (_a = column.find((item) => item.value === v)) !== null && _a !== void 0 ? _a : null;
      });
    });
    const extend = {
      get columns() {
        return columns();
      },
      get items() {
        return items();
      }
    };
    return extend;
  }
  function useColumnsExtend(rawColumns, value) {
    return React$1.useMemo(() => generateColumnsExtend(rawColumns, value), [rawColumns, value]);
  }
  const defaultRenderLabel = (item) => item.label;
  var shim = { exports: {} };
  var useSyncExternalStoreShim_development = {};
  /**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      }
      var React2 = React$1;
      var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format2) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format2, args);
          }
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();
          if (stack !== "") {
            format2 += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format2);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function is2(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is === "function" ? Object.is : is2;
      var useState = React2.useState, useEffect = React2.useEffect, useLayoutEffect2 = React2.useLayoutEffect, useDebugValue = React2.useDebugValue;
      var didWarnOld18Alpha = false;
      var didWarnUncachedGetSnapshot = false;
      function useSyncExternalStore(subscribe2, getSnapshot, getServerSnapshot) {
        {
          if (!didWarnOld18Alpha) {
            if (React2.startTransition !== void 0) {
              didWarnOld18Alpha = true;
              error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
            }
          }
        }
        var value = getSnapshot();
        {
          if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            if (!objectIs(value, cachedValue)) {
              error("The result of getSnapshot should be cached to avoid an infinite loop");
              didWarnUncachedGetSnapshot = true;
            }
          }
        }
        var _useState = useState({
          inst: {
            value,
            getSnapshot
          }
        }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect2(function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
        }, [subscribe2, value, getSnapshot]);
        useEffect(function() {
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
          var handleStoreChange = function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          };
          return subscribe2(handleStoreChange);
        }, [subscribe2]);
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        var prevValue = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(prevValue, nextValue);
        } catch (error2) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe2, getSnapshot, getServerSnapshot) {
        return getSnapshot();
      }
      var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
      var isServerEnvironment = !canUseDOM;
      var shim2 = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
      var useSyncExternalStore$2 = React2.useSyncExternalStore !== void 0 ? React2.useSyncExternalStore : shim2;
      useSyncExternalStoreShim_development.useSyncExternalStore = useSyncExternalStore$2;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }
    })();
  }
  {
    shim.exports = useSyncExternalStoreShim_development;
  }
  var shimExports = shim.exports;
  let reduced = false;
  const subscribers = /* @__PURE__ */ new Set();
  function notify() {
    subscribers.forEach((subscriber) => {
      subscriber();
    });
  }
  function reduceMotion() {
    reduced = true;
    notify();
    globals.assign({
      skipAnimation: true
    });
  }
  function restoreMotion() {
    reduced = false;
    notify();
    globals.assign({
      skipAnimation: false
    });
  }
  function isMotionReduced() {
    return reduced;
  }
  function subscribe(onStoreChange) {
    subscribers.add(onStoreChange);
    return () => {
      subscribers.delete(onStoreChange);
    };
  }
  function useMotionReduced() {
    return shimExports.useSyncExternalStore(subscribe, isMotionReduced, isMotionReduced);
  }
  const classPrefix$17 = "adm-spin-loading";
  const colorRecord$2 = {
    default: "var(--adm-color-weak)",
    primary: "var(--adm-color-primary)",
    white: "var(--adm-color-white)"
  };
  const defaultProps$W = {
    color: "default"
  };
  const circumference = 15 * 3.14159265358979 * 2;
  const SpinLoading = React$1.memo((p) => {
    var _a;
    const props = mergeProps(defaultProps$W, p);
    const motionReduced = useMotionReduced();
    const {
      percent
    } = useSpring({
      cancel: motionReduced,
      loop: {
        reverse: true
      },
      from: {
        percent: 80
      },
      to: {
        percent: 30
      },
      config: {
        duration: 1200
      }
    });
    return withNativeProps(props, React$1.createElement(animated.div, {
      className: classPrefix$17,
      style: {
        "--color": (_a = colorRecord$2[props.color]) !== null && _a !== void 0 ? _a : props.color,
        "--percent": percent
      }
    }, React$1.createElement("svg", {
      className: `${classPrefix$17}-svg`,
      viewBox: "0 0 32 32"
    }, React$1.createElement(animated.circle, {
      className: `${classPrefix$17}-fill`,
      fill: "transparent",
      strokeWidth: "2",
      strokeDasharray: circumference,
      strokeDashoffset: percent,
      strokeLinecap: "square",
      r: 15,
      cx: 16,
      cy: 16
    }))));
  });
  const classPrefix$16 = `adm-picker-view`;
  const defaultProps$V = {
    defaultValue: [],
    renderLabel: defaultRenderLabel,
    mouseWheel: false,
    loadingContent: React$1.createElement("div", {
      className: `${classPrefix$16}-loading-content`
    }, React$1.createElement(SpinLoading, null))
  };
  const PickerView = React$1.memo((p) => {
    const props = mergeProps(defaultProps$V, p);
    const [innerValue, setInnerValue] = React$1.useState(props.value === void 0 ? props.defaultValue : props.value);
    React$1.useEffect(() => {
      if (props.value === void 0)
        return;
      if (props.value === innerValue)
        return;
      setInnerValue(props.value);
    }, [props.value]);
    React$1.useEffect(() => {
      if (props.value === innerValue)
        return;
      const timeout = window.setTimeout(() => {
        if (props.value !== void 0 && props.value !== innerValue) {
          setInnerValue(props.value);
        }
      }, 1e3);
      return () => {
        window.clearTimeout(timeout);
      };
    }, [props.value, innerValue]);
    const extend = useColumnsExtend(props.columns, innerValue);
    const columns = extend.columns;
    useDebounceEffect(() => {
      var _a;
      if (props.value === innerValue)
        return;
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, innerValue, extend);
    }, [innerValue], {
      wait: 0,
      leading: false,
      trailing: true
    });
    const handleSelect = React$1.useCallback((val, index2) => {
      setInnerValue((prev) => {
        const next = [...prev];
        next[index2] = val;
        return next;
      });
    }, []);
    return withNativeProps(props, React$1.createElement("div", {
      className: `${classPrefix$16}`
    }, props.loading ? props.loadingContent : React$1.createElement(React$1.Fragment, null, columns.map((column, index2) => React$1.createElement(Wheel, {
      key: index2,
      index: index2,
      column,
      value: innerValue[index2],
      onSelect: handleSelect,
      renderLabel: props.renderLabel,
      mouseWheel: props.mouseWheel
    })), React$1.createElement("div", {
      className: `${classPrefix$16}-mask`
    }, React$1.createElement("div", {
      className: `${classPrefix$16}-mask-top`
    }), React$1.createElement("div", {
      className: `${classPrefix$16}-mask-middle`
    }), React$1.createElement("div", {
      className: `${classPrefix$16}-mask-bottom`
    })))));
  });
  PickerView.displayName = "PickerView";
  const classPrefix$15 = `adm-picker`;
  const defaultProps$U = {
    defaultValue: [],
    closeOnMaskClick: true,
    renderLabel: defaultRenderLabel,
    destroyOnClose: false,
    forceRender: false
  };
  const Picker$1 = React$1.memo(React$1.forwardRef((p, ref) => {
    var _a;
    const {
      locale
    } = useConfig();
    const props = mergeProps(defaultProps$U, {
      confirmText: locale.common.confirm,
      cancelText: locale.common.cancel
    }, p);
    const [visible, setVisible] = usePropsValue({
      value: props.visible,
      defaultValue: false,
      onChange: (v) => {
        var _a2;
        if (v === false) {
          (_a2 = props.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        }
      }
    });
    const actions = {
      toggle: () => {
        setVisible((v) => !v);
      },
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      }
    };
    React$1.useImperativeHandle(ref, () => actions);
    const [value, setValue2] = usePropsValue(Object.assign(Object.assign({}, props), {
      onChange: (val) => {
        var _a2;
        const extend2 = generateColumnsExtend(props.columns, val);
        (_a2 = props.onConfirm) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, extend2);
      }
    }));
    const extend = useColumnsExtend(props.columns, value);
    const [innerValue, setInnerValue] = React$1.useState(value);
    React$1.useEffect(() => {
      if (innerValue !== value) {
        setInnerValue(value);
      }
    }, [visible]);
    React$1.useEffect(() => {
      if (!visible) {
        setInnerValue(value);
      }
    }, [value]);
    const onChange = useMemoizedFn((val, ext) => {
      var _a2;
      setInnerValue(val);
      if (visible) {
        (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, ext);
      }
    });
    const pickerElement = withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$15
    }, React$1.createElement("div", {
      className: `${classPrefix$15}-header`
    }, React$1.createElement("a", {
      role: "button",
      className: `${classPrefix$15}-header-button`,
      onClick: () => {
        var _a2;
        (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        setVisible(false);
      }
    }, props.cancelText), React$1.createElement("div", {
      className: `${classPrefix$15}-header-title`
    }, props.title), React$1.createElement("a", {
      role: "button",
      className: classNames(`${classPrefix$15}-header-button`, props.loading && `${classPrefix$15}-header-button-disabled`),
      onClick: () => {
        if (props.loading)
          return;
        setValue2(innerValue, true);
        setVisible(false);
      },
      "aria-disabled": props.loading
    }, props.confirmText)), React$1.createElement("div", {
      className: `${classPrefix$15}-body`
    }, React$1.createElement(PickerView, {
      loading: props.loading,
      loadingContent: props.loadingContent,
      columns: props.columns,
      renderLabel: props.renderLabel,
      value: innerValue,
      mouseWheel: props.mouseWheel,
      onChange
    }))));
    const popupElement = React$1.createElement(Popup, {
      style: props.popupStyle,
      className: classNames(`${classPrefix$15}-popup`, props.popupClassName),
      visible,
      position: "bottom",
      onMaskClick: () => {
        var _a2;
        if (!props.closeOnMaskClick)
          return;
        (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        setVisible(false);
      },
      getContainer: props.getContainer,
      destroyOnClose: props.destroyOnClose,
      afterShow: props.afterShow,
      afterClose: props.afterClose,
      onClick: props.onClick,
      forceRender: props.forceRender,
      stopPropagation: props.stopPropagation
    }, pickerElement, React$1.createElement(SafeArea, {
      position: "bottom"
    }));
    return React$1.createElement(React$1.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, extend.items, actions));
  }));
  Picker$1.displayName = "Picker";
  function prompt$3(props) {
    return new Promise((resolve) => {
      const Wrapper2 = () => {
        const [visible, setVisible] = React$1.useState(false);
        React$1.useEffect(() => {
          setVisible(true);
        }, []);
        return React$1.createElement(Picker$1, Object.assign({}, props, {
          visible,
          onConfirm: (val, extend) => {
            var _a;
            (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
            resolve(val);
          },
          onClose: () => {
            var _a;
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
            setVisible(false);
            resolve(null);
          },
          afterClose: () => {
            var _a;
            (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
            unmount2();
          }
        }));
      };
      const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
    });
  }
  const Picker = attachPropertiesToComponent(Picker$1, {
    prompt: prompt$3
  });
  function useColumnsFn(options) {
    const depth = React$1.useMemo(() => {
      let depth2 = 0;
      function traverse(options2, currentDepth) {
        if (currentDepth > depth2)
          depth2 = currentDepth;
        const nextDepth = currentDepth + 1;
        options2.forEach((option) => {
          if (option.children) {
            traverse(option.children, nextDepth);
          }
        });
      }
      traverse(options, 1);
      return depth2;
    }, [options]);
    return (selected) => {
      const columns = [];
      let currentOptions = options;
      let i2 = 0;
      while (true) {
        columns.push(currentOptions.map((option) => ({
          label: option.label,
          value: option.value
        })));
        const x = selected[i2];
        const targetOptions = currentOptions.find((option) => option.value === x);
        if (!targetOptions || !targetOptions.children)
          break;
        currentOptions = targetOptions.children;
        i2++;
      }
      while (i2 < depth - 1) {
        columns.push([]);
        i2++;
      }
      return columns;
    };
  }
  const CascadePicker = React$1.forwardRef((props, ref) => {
    const {
      options
    } = props, pickerProps = __rest(props, ["options"]);
    const columnsFn = useColumnsFn(options);
    return React$1.createElement(Picker, Object.assign({}, pickerProps, {
      ref,
      columns: columnsFn
    }));
  });
  function prompt$2(props) {
    return new Promise((resolve) => {
      const Wrapper2 = () => {
        const [visible, setVisible] = React$1.useState(false);
        React$1.useEffect(() => {
          setVisible(true);
        }, []);
        return React$1.createElement(CascadePicker, Object.assign({}, props, {
          visible,
          onConfirm: (val, extend) => {
            var _a;
            (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
            resolve(val);
          },
          onClose: () => {
            var _a;
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
            setVisible(false);
            resolve(null);
          },
          afterClose: () => {
            var _a;
            (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
            unmount2();
          }
        }));
      };
      const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
    });
  }
  const index$g = attachPropertiesToComponent(CascadePicker, {
    prompt: prompt$2
  });
  const CascadePickerView = (props) => {
    const {
      options
    } = props, pickerProps = __rest(props, ["options"]);
    const columnsFn = useColumnsFn(options);
    return React$1.createElement(PickerView, Object.assign({}, pickerProps, {
      columns: columnsFn
    }));
  };
  const classPrefix$14 = `adm-tabs`;
  const Tab = () => {
    return null;
  };
  const defaultProps$T = {
    activeLineMode: "auto",
    stretch: true,
    direction: "ltr"
  };
  const Tabs$1 = (p) => {
    var _a;
    const props = mergeProps(defaultProps$T, p);
    const tabListContainerRef = React$1.useRef(null);
    const activeLineRef = React$1.useRef(null);
    const keyToIndexRecord = {};
    let firstActiveKey = null;
    const panes = [];
    const isRTL2 = props.direction === "rtl";
    traverseReactNode(props.children, (child, index2) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      if (index2 === 0) {
        firstActiveKey = key;
      }
      const length = panes.push(child);
      keyToIndexRecord[key] = length - 1;
    });
    const [activeKey, setActiveKey] = usePropsValue({
      value: props.activeKey,
      defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
      onChange: (v) => {
        var _a2;
        if (v === null)
          return;
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
      }
    });
    const [{
      x,
      width
    }, inkApi] = useSpring(() => ({
      x: 0,
      width: 0,
      config: {
        tension: 300,
        clamp: true
      }
    }));
    const [{
      scrollLeft
    }, scrollApi] = useSpring(() => ({
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    }));
    const [{
      leftMaskOpacity,
      rightMaskOpacity
    }, maskApi] = useSpring(() => ({
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    }));
    function animate(immediate = false, fromMutation = false) {
      const container = tabListContainerRef.current;
      if (!container)
        return;
      const activeIndex = keyToIndexRecord[activeKey];
      if (activeIndex === void 0) {
        inkApi.start({
          x: 0,
          width: 0,
          immediate: true
        });
        return;
      }
      const activeLine = activeLineRef.current;
      if (!activeLine)
        return;
      const activeTabWrapper = container.children.item(activeIndex + 1);
      const activeTab = activeTabWrapper.children.item(0);
      const activeTabLeft = activeTab.offsetLeft;
      const activeTabWidth = activeTab.offsetWidth;
      const activeTabWrapperLeft = activeTabWrapper.offsetLeft;
      const activeTabWrapperWidth = activeTabWrapper.offsetWidth;
      const containerWidth = container.offsetWidth;
      const containerScrollWidth = container.scrollWidth;
      const containerScrollLeft = container.scrollLeft;
      const activeLineWidth = activeLine.offsetWidth;
      let x2 = 0;
      let width2 = 0;
      if (props.activeLineMode === "auto") {
        x2 = activeTabLeft;
        width2 = activeTabWidth;
      } else if (props.activeLineMode === "full") {
        x2 = activeTabWrapperLeft;
        width2 = activeTabWrapperWidth;
      } else {
        x2 = activeTabLeft + (activeTabWidth - activeLineWidth) / 2;
      }
      if (isRTL2) {
        const w = ["auto", "full"].includes(props.activeLineMode) ? width2 : activeLineWidth;
        x2 = -(containerWidth - x2 - w);
      }
      inkApi.start({
        x: x2,
        width: width2,
        immediate
      });
      const maxScrollDistance = containerScrollWidth - containerWidth;
      if (maxScrollDistance <= 0)
        return;
      let nextScrollLeft = 0;
      if (isRTL2) {
        nextScrollLeft = -bound(containerWidth / 2 - activeTabLeft + activeTabWidth / 2 - activeLineWidth, 0, maxScrollDistance);
      } else {
        nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, maxScrollDistance);
      }
      if (!fromMutation || props.autoScroll !== false) {
        scrollApi.start({
          scrollLeft: nextScrollLeft,
          from: {
            scrollLeft: containerScrollLeft
          },
          immediate
        });
      }
    }
    useIsomorphicLayoutEffect$2(() => {
      animate(!x.isAnimating);
    }, []);
    useIsomorphicUpdateLayoutEffect(() => {
      animate();
    }, [activeKey]);
    useResizeEffect(() => {
      animate(!x.isAnimating);
    }, tabListContainerRef);
    useMutationEffect(() => {
      animate(!x.isAnimating, true);
    }, tabListContainerRef, {
      subtree: true,
      childList: true,
      characterData: true
    });
    const {
      run: updateMask
    } = useThrottleFn((immediate = false) => {
      const container = tabListContainerRef.current;
      if (!container)
        return;
      const scrollLeft2 = container.scrollLeft;
      let showLeftMask = false;
      let showRightMask = false;
      if (isRTL2) {
        showLeftMask = Math.round(-scrollLeft2) + container.offsetWidth < container.scrollWidth;
        showRightMask = scrollLeft2 < 0;
      } else {
        showLeftMask = scrollLeft2 > 0;
        showRightMask = scrollLeft2 + container.offsetWidth < container.scrollWidth;
      }
      maskApi.start({
        leftMaskOpacity: showLeftMask ? 1 : 0,
        rightMaskOpacity: showRightMask ? 1 : 0,
        immediate
      });
    }, {
      wait: 100,
      trailing: true,
      leading: true
    });
    useIsomorphicLayoutEffect$2(() => {
      updateMask(true);
    }, []);
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$14,
      style: {
        direction: props.direction
      }
    }, React$1.createElement("div", {
      className: `${classPrefix$14}-header`
    }, React$1.createElement(animated.div, {
      className: classNames(`${classPrefix$14}-header-mask`, `${classPrefix$14}-header-mask-left`),
      style: {
        opacity: leftMaskOpacity
      }
    }), React$1.createElement(animated.div, {
      className: classNames(`${classPrefix$14}-header-mask`, `${classPrefix$14}-header-mask-right`),
      style: {
        opacity: rightMaskOpacity
      }
    }), React$1.createElement(animated.div, {
      className: `${classPrefix$14}-tab-list`,
      ref: tabListContainerRef,
      scrollLeft,
      onScroll: updateMask,
      role: "tablist"
    }, React$1.createElement(animated.div, {
      ref: activeLineRef,
      className: `${classPrefix$14}-tab-line`,
      style: {
        width: props.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : width,
        x
      }
    }), panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
      key: pane.key,
      className: classNames(`${classPrefix$14}-tab-wrapper`, {
        [`${classPrefix$14}-tab-wrapper-stretch`]: props.stretch
      })
    }, React$1.createElement("div", {
      onClick: () => {
        const {
          key
        } = pane;
        if (pane.props.disabled)
          return;
        if (key === void 0 || key === null) {
          return;
        }
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$14}-tab`, {
        [`${classPrefix$14}-tab-active`]: pane.key === activeKey,
        [`${classPrefix$14}-tab-disabled`]: pane.props.disabled
      }),
      role: "tab",
      "aria-selected": pane.key === activeKey
    }, pane.props.title)))))), panes.map((pane) => {
      if (pane.props.children === void 0) {
        return null;
      }
      const active = pane.key === activeKey;
      return React$1.createElement(ShouldRender, {
        key: pane.key,
        active,
        forceRender: pane.props.forceRender,
        destroyOnClose: pane.props.destroyOnClose
      }, React$1.createElement("div", {
        className: `${classPrefix$14}-content`,
        style: {
          display: active ? "block" : "none"
        }
      }, pane.props.children));
    })));
  };
  const Tabs = attachPropertiesToComponent(Tabs$1, {
    Tab
  });
  const classPrefix$13 = `adm-list`;
  const defaultProps$S = {
    mode: "default"
  };
  const List$2 = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$S, p);
    const nativeElementRef = React$1.useRef(null);
    React$1.useImperativeHandle(ref, () => ({
      get nativeElement() {
        return nativeElementRef.current;
      }
    }));
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$13, `${classPrefix$13}-${props.mode}`),
      ref: nativeElementRef
    }, props.header && React$1.createElement("div", {
      className: `${classPrefix$13}-header`
    }, props.header), React$1.createElement("div", {
      className: `${classPrefix$13}-body`
    }, React$1.createElement("div", {
      className: `${classPrefix$13}-body-inner`
    }, props.children))));
  });
  function isNodeWithContent(node) {
    return node !== void 0 && node !== null && node !== false;
  }
  const classPrefix$12 = `adm-list-item`;
  const ListItem = (props) => {
    var _a;
    const clickable = (_a = props.clickable) !== null && _a !== void 0 ? _a : !!props.onClick;
    const arrow2 = props.arrow === void 0 ? clickable : props.arrow;
    const content = React$1.createElement("div", {
      className: `${classPrefix$12}-content`
    }, isNodeWithContent(props.prefix) && React$1.createElement("div", {
      className: `${classPrefix$12}-content-prefix`
    }, props.prefix), React$1.createElement("div", {
      className: `${classPrefix$12}-content-main`
    }, isNodeWithContent(props.title) && React$1.createElement("div", {
      className: `${classPrefix$12}-title`
    }, props.title), props.children, isNodeWithContent(props.description) && React$1.createElement("div", {
      className: `${classPrefix$12}-description`
    }, props.description)), isNodeWithContent(props.extra) && React$1.createElement("div", {
      className: `${classPrefix$12}-content-extra`
    }, props.extra), isNodeWithContent(arrow2) && React$1.createElement("div", {
      className: `${classPrefix$12}-content-arrow`
    }, arrow2 === true ? React$1.createElement(RightOutline, null) : arrow2));
    return withNativeProps(props, React$1.createElement(clickable ? "a" : "div", {
      className: classNames(`${classPrefix$12}`, clickable ? ["adm-plain-anchor"] : [], props.disabled && `${classPrefix$12}-disabled`),
      onClick: props.disabled ? void 0 : props.onClick
    }, content));
  };
  const List$1 = attachPropertiesToComponent(List$2, {
    Item: ListItem
  });
  const CheckListContext = React$1.createContext(null);
  const classPrefix$11 = "adm-check-list";
  const defaultProps$R = {
    multiple: false,
    defaultValue: [],
    activeIcon: React$1.createElement(CheckOutline, null)
  };
  const CheckList$1 = (p) => {
    const props = mergeProps(defaultProps$R, p);
    const [value, setValue2] = usePropsValue(props);
    function check(val) {
      if (props.multiple) {
        setValue2([...value, val]);
      } else {
        setValue2([val]);
      }
    }
    function uncheck(val) {
      setValue2(value.filter((item) => item !== val));
    }
    const {
      activeIcon,
      extra,
      disabled,
      readOnly
    } = props;
    return React$1.createElement(CheckListContext.Provider, {
      value: {
        value,
        check,
        uncheck,
        activeIcon,
        extra,
        disabled,
        readOnly
      }
    }, withNativeProps(props, React$1.createElement(List$1, {
      mode: props.mode,
      className: classPrefix$11
    }, props.children)));
  };
  const classPrefix$10 = `adm-check-list-item`;
  const CheckListItem = (props) => {
    const context = React$1.useContext(CheckListContext);
    if (context === null) {
      devWarning("CheckList.Item", "CheckList.Item can only be used inside CheckList.");
      return null;
    }
    const active = context.value.includes(props.value);
    const readOnly = props.readOnly || context.readOnly;
    const defaultExtra = active ? context.activeIcon : null;
    const renderExtra = context.extra ? context.extra(active) : defaultExtra;
    const extra = React$1.createElement("div", {
      className: `${classPrefix$10}-extra`
    }, renderExtra);
    return withNativeProps(props, React$1.createElement(List$1.Item, {
      title: props.title,
      className: classNames(classPrefix$10, readOnly && `${classPrefix$10}-readonly`, active && `${classPrefix$10}-active`),
      description: props.description,
      prefix: props.prefix,
      onClick: (e2) => {
        var _a;
        if (readOnly)
          return;
        if (active) {
          context.uncheck(props.value);
        } else {
          context.check(props.value);
        }
        (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      arrow: false,
      clickable: !readOnly,
      extra,
      disabled: props.disabled || context.disabled
    }, props.children));
  };
  const CheckList = attachPropertiesToComponent(CheckList$1, {
    Item: CheckListItem
  });
  var MapCache = _MapCache;
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  var memoize_1 = memoize;
  const memoize$1 = /* @__PURE__ */ getDefaultExportFromCjs(memoize_1);
  function useCascaderValueExtend(options, fieldNames) {
    const {
      valueName,
      childrenName
    } = fieldNames;
    const generateItems = React$1.useMemo(() => {
      return memoize$1((val) => {
        const ret = [];
        let currentOptions = options;
        for (const v of val) {
          const target = currentOptions.find((option) => option[valueName] === v);
          if (!target) {
            break;
          }
          ret.push(target);
          if (!target[childrenName])
            break;
          currentOptions = target[childrenName];
        }
        return ret;
      }, (val) => JSON.stringify(val));
    }, [options]);
    const generateIsLeaf = React$1.useMemo(() => {
      return memoize$1((val) => {
        const children = val.reduce((currentOptions, v) => {
          var _a;
          return ((_a = currentOptions.find((option) => option[valueName] === v)) === null || _a === void 0 ? void 0 : _a[childrenName]) || [];
        }, options);
        return children.length === 0;
      }, (val) => JSON.stringify(val));
    }, [options]);
    function generateValueExtend(val) {
      return {
        get items() {
          return generateItems(val);
        },
        get isLeaf() {
          return generateIsLeaf(val);
        }
      };
    }
    return generateValueExtend;
  }
  const optionSkeleton = [];
  function generateIntArray(from, to2) {
    const array = [];
    for (let i2 = from; i2 <= to2; i2++) {
      array.push(i2);
    }
    return array;
  }
  const classPrefix$$ = "adm-skeleton";
  const Skeleton$1 = (props) => {
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$$, {
        [`${classPrefix$$}-animated`]: props.animated
      })
    }));
  };
  const SkeletonTitle = (props) => {
    return withNativeProps(props, React$1.createElement(Skeleton$1, {
      animated: props.animated,
      className: `${classPrefix$$}-title`
    }));
  };
  const defaultSkeletonParagraphProps = {
    lineCount: 3
  };
  const SkeletonParagraph = (p) => {
    const props = mergeProps(defaultSkeletonParagraphProps, p);
    const keys2 = generateIntArray(1, props.lineCount);
    const node = React$1.createElement("div", {
      className: `${classPrefix$$}-paragraph`
    }, keys2.map((key) => React$1.createElement(Skeleton$1, {
      key,
      animated: props.animated,
      className: `${classPrefix$$}-paragraph-line`
    })));
    return withNativeProps(props, node);
  };
  const Skeleton = attachPropertiesToComponent(Skeleton$1, {
    Title: SkeletonTitle,
    Paragraph: SkeletonParagraph
  });
  const useFieldNames = (fieldNames = {}) => {
    const fields = React$1.useMemo(() => {
      const {
        label = "label",
        value = "value",
        disabled = "disabled",
        children = "children"
      } = fieldNames;
      return [label, value, children, disabled];
    }, [JSON.stringify(fieldNames)]);
    return fields;
  };
  const classPrefix$_ = `adm-cascader-view`;
  const defaultProps$Q = {
    defaultValue: []
  };
  const CascaderView$1 = (p) => {
    const props = mergeProps(defaultProps$Q, p);
    const {
      locale
    } = useConfig();
    const [labelName, valueName, childrenName, disabledName] = useFieldNames(props.fieldNames);
    const generateValueExtend = useCascaderValueExtend(props.options, {
      valueName,
      childrenName
    });
    const [value, setValue2] = usePropsValue(Object.assign(Object.assign({}, props), {
      onChange: (val) => {
        var _a;
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
      }
    }));
    const [tabActiveIndex, setTabActiveIndex] = React$1.useState(0);
    const levels = React$1.useMemo(() => {
      const ret = [];
      let currentOptions = props.options;
      let reachedEnd = false;
      for (const v of value) {
        const target = currentOptions.find((option) => option[valueName] === v);
        ret.push({
          selected: target,
          options: currentOptions
        });
        if (!target || !target[childrenName]) {
          reachedEnd = true;
          break;
        }
        currentOptions = target[childrenName];
      }
      if (!reachedEnd) {
        ret.push({
          selected: void 0,
          options: currentOptions
        });
      }
      return ret;
    }, [value, props.options]);
    useUpdateEffect(() => {
      var _a;
      (_a = props.onTabsChange) === null || _a === void 0 ? void 0 : _a.call(props, tabActiveIndex);
    }, [tabActiveIndex]);
    React$1.useEffect(() => {
      setTabActiveIndex(levels.length - 1);
    }, [value]);
    React$1.useEffect(() => {
      const max2 = levels.length - 1;
      if (tabActiveIndex > max2) {
        setTabActiveIndex(max2);
      }
    }, [tabActiveIndex, levels]);
    const onItemSelect = (selectValue, depth) => {
      const next = value.slice(0, depth);
      if (selectValue !== void 0) {
        next[depth] = selectValue;
      }
      setValue2(next);
    };
    const whetherLoading = (options) => props.loading || options === optionSkeleton;
    const placeholder = props.placeholder || locale.Cascader.placeholder;
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$_
    }, React$1.createElement(Tabs, {
      activeKey: tabActiveIndex.toString(),
      onChange: (key) => {
        const activeIndex = parseInt(key);
        setTabActiveIndex(activeIndex);
      },
      stretch: false,
      className: `${classPrefix$_}-tabs`
    }, levels.map((level, index2) => {
      const selected = level.selected;
      return React$1.createElement(Tabs.Tab, {
        key: index2.toString(),
        title: React$1.createElement("div", {
          className: `${classPrefix$_}-header-title`
        }, selected ? selected[labelName] : typeof placeholder === "function" ? placeholder(index2) : placeholder),
        forceRender: true
      }, React$1.createElement("div", {
        className: `${classPrefix$_}-content`
      }, whetherLoading(level.options) ? React$1.createElement("div", {
        className: `${classPrefix$_}-skeleton`
      }, React$1.createElement(Skeleton, {
        className: `${classPrefix$_}-skeleton-line-1`,
        animated: true
      }), React$1.createElement(Skeleton, {
        className: `${classPrefix$_}-skeleton-line-2`,
        animated: true
      }), React$1.createElement(Skeleton, {
        className: `${classPrefix$_}-skeleton-line-3`,
        animated: true
      }), React$1.createElement(Skeleton, {
        className: `${classPrefix$_}-skeleton-line-4`,
        animated: true
      })) : React$1.createElement(CheckList, {
        value: [value[index2]],
        onChange: (selectValue) => onItemSelect(selectValue[0], index2),
        activeIcon: props.activeIcon
      }, level.options.map((option) => {
        const active = value[index2] === option[valueName];
        return React$1.createElement(CheckList.Item, {
          value: option[valueName],
          key: option[valueName],
          disabled: option[disabledName],
          className: classNames(`${classPrefix$_}-item`, {
            [`${classPrefix$_}-item-active`]: active
          })
        }, option[labelName]);
      }))));
    }))));
  };
  const CascaderView = attachPropertiesToComponent(CascaderView$1, {
    optionSkeleton
  });
  const classPrefix$Z = `adm-cascader`;
  const defaultProps$P = {
    defaultValue: [],
    destroyOnClose: true,
    forceRender: false
  };
  const Cascader = React$1.forwardRef((p, ref) => {
    var _a;
    const {
      locale
    } = useConfig();
    const props = mergeProps(defaultProps$P, {
      confirmText: locale.common.confirm,
      cancelText: locale.common.cancel,
      placeholder: locale.Cascader.placeholder
    }, p);
    const [visible, setVisible] = usePropsValue({
      value: props.visible,
      defaultValue: false,
      onChange: (v) => {
        var _a2;
        if (v === false) {
          (_a2 = props.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        }
      }
    });
    const actions = {
      toggle: () => {
        setVisible((v) => !v);
      },
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      }
    };
    React$1.useImperativeHandle(ref, () => actions);
    const [value, setValue2] = usePropsValue(Object.assign(Object.assign({}, props), {
      onChange: (val) => {
        var _a2;
        (_a2 = props.onConfirm) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, generateValueExtend(val));
      }
    }));
    const [, valueName, childrenName] = useFieldNames(props.fieldNames);
    const generateValueExtend = useCascaderValueExtend(props.options, {
      valueName,
      childrenName
    });
    const [innerValue, setInnerValue] = React$1.useState(value);
    React$1.useEffect(() => {
      if (!visible) {
        setInnerValue(value);
      }
    }, [visible, value]);
    const cascaderElement = withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$Z
    }, React$1.createElement("div", {
      className: `${classPrefix$Z}-header`
    }, React$1.createElement("a", {
      className: `${classPrefix$Z}-header-button`,
      onClick: () => {
        var _a2;
        (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        setVisible(false);
      }
    }, props.cancelText), React$1.createElement("div", {
      className: `${classPrefix$Z}-header-title`
    }, props.title), React$1.createElement("a", {
      className: `${classPrefix$Z}-header-button`,
      onClick: () => {
        setValue2(innerValue, true);
        setVisible(false);
      }
    }, props.confirmText)), React$1.createElement("div", {
      className: `${classPrefix$Z}-body`
    }, React$1.createElement(CascaderView, Object.assign({}, props, {
      value: innerValue,
      onChange: (val, ext) => {
        var _a2;
        setInnerValue(val);
        if (visible) {
          (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, ext);
        }
      }
    })))));
    const popupElement = React$1.createElement(Popup, {
      visible,
      position: "bottom",
      onMaskClick: () => {
        var _a2;
        (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
        setVisible(false);
      },
      getContainer: props.getContainer,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender,
      afterShow: props.afterShow,
      afterClose: props.afterClose,
      onClick: props.onClick,
      stopPropagation: props.stopPropagation
    }, cascaderElement);
    return React$1.createElement(React$1.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items, actions));
  });
  function prompt$1(props) {
    return new Promise((resolve) => {
      const Wrapper2 = () => {
        const [visible, setVisible] = React$1.useState(false);
        React$1.useEffect(() => {
          setVisible(true);
        }, []);
        return React$1.createElement(Cascader, Object.assign({}, props, {
          visible,
          onConfirm: (val, extend) => {
            var _a;
            (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
            resolve(val);
          },
          onClose: () => {
            var _a;
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
            setVisible(false);
            resolve(null);
          },
          afterClose: () => {
            var _a;
            (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
            unmount2();
          }
        }));
      };
      const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
    });
  }
  const index$f = attachPropertiesToComponent(Cascader, {
    prompt: prompt$1,
    optionSkeleton
  });
  const classPrefix$Y = "adm-center-popup";
  const defaultProps$O = Object.assign(Object.assign({}, defaultPopupBaseProps), {
    getContainer: null
  });
  const CenterPopup = (p) => {
    const props = mergeProps(defaultProps$O, p);
    const unmountedRef = useUnmountedRef$1();
    const style = useSpring({
      scale: props.visible ? 1 : 0.8,
      opacity: props.visible ? 1 : 0,
      config: {
        mass: 1.2,
        tension: 200,
        friction: 25,
        clamp: true
      },
      onRest: () => {
        var _a, _b;
        if (unmountedRef.current)
          return;
        setActive(props.visible);
        if (props.visible) {
          (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
        } else {
          (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      }
    });
    const [active, setActive] = React$1.useState(props.visible);
    useIsomorphicLayoutEffect$2(() => {
      if (props.visible) {
        setActive(true);
      }
    }, [props.visible]);
    const ref = React$1.useRef(null);
    useLockScroll(ref, props.disableBodyScroll && active);
    const maskVisible = useInnerVisible(active && props.visible);
    const body = React$1.createElement("div", {
      className: classNames(`${classPrefix$Y}-body`, props.bodyClassName),
      style: props.bodyStyle
    }, props.children);
    const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$Y,
      style: {
        display: active ? void 0 : "none",
        pointerEvents: active ? void 0 : "none"
      }
    }, props.mask && React$1.createElement(Mask, {
      visible: maskVisible,
      forceRender: props.forceRender,
      destroyOnClose: props.destroyOnClose,
      onMaskClick: (e2) => {
        var _a, _b;
        (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props, e2);
        if (props.closeOnMaskClick) {
          (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      },
      style: props.maskStyle,
      className: classNames(`${classPrefix$Y}-mask`, props.maskClassName),
      disableBodyScroll: false,
      stopPropagation: props.stopPropagation
    }), React$1.createElement("div", {
      className: `${classPrefix$Y}-wrap`,
      role: props.role,
      "aria-label": props["aria-label"]
    }, React$1.createElement(animated.div, {
      style: Object.assign(Object.assign({}, style), {
        pointerEvents: style.opacity.to((v) => v === 1 ? "unset" : "none")
      }),
      ref
    }, props.showCloseButton && React$1.createElement("a", {
      className: classNames(`${classPrefix$Y}-close`, "adm-plain-anchor"),
      onClick: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    }, React$1.createElement(CloseOutline, null)), body)))));
    return React$1.createElement(ShouldRender, {
      active,
      forceRender: props.forceRender,
      destroyOnClose: props.destroyOnClose
    }, renderToContainer(props.getContainer, node));
  };
  const CheckboxGroupContext = React$1.createContext(null);
  const defaultProps$N = {
    disabled: false,
    defaultValue: []
  };
  const Group$1 = (p) => {
    const props = mergeProps(defaultProps$N, p);
    const [value, setValue2] = usePropsValue(props);
    return React$1.createElement(
      CheckboxGroupContext.Provider,
      {
        // TODO: 性能优化
        value: {
          value,
          disabled: props.disabled,
          check: (v) => {
            setValue2([...value, v]);
          },
          uncheck: (v) => {
            setValue2(value.filter((item) => item !== v));
          }
        }
      },
      props.children
    );
  };
  const CheckIcon = React$1.memo((props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      viewBox: "0 0 40 40"
    }, React$1.createElement("path", {
      d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
      fill: "currentColor"
    })));
  });
  const IndeterminateIcon = React$1.memo((props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      viewBox: "0 0 40 40"
    }, React$1.createElement("path", {
      d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
      fill: "currentColor"
    })));
  });
  const NativeInput = (props) => {
    const inputRef = React$1.useRef(null);
    const handleClick = useMemoizedFn((e2) => {
      e2.stopPropagation();
      e2.stopImmediatePropagation();
      const latestChecked = e2.target.checked;
      if (latestChecked === props.checked)
        return;
      props.onChange(latestChecked);
    });
    React$1.useEffect(() => {
      if (props.disabled)
        return;
      if (!inputRef.current)
        return;
      const input = inputRef.current;
      input.addEventListener("click", handleClick);
      return () => {
        input.removeEventListener("click", handleClick);
      };
    }, [props.disabled, props.onChange]);
    return React$1.createElement("input", {
      ref: inputRef,
      type: props.type,
      checked: props.checked,
      onChange: () => {
      },
      disabled: props.disabled,
      id: props.id
    });
  };
  const classPrefix$X = `adm-checkbox`;
  const defaultProps$M = {
    defaultChecked: false,
    indeterminate: false
  };
  const Checkbox$1 = React$1.forwardRef((p, ref) => {
    const groupContext = React$1.useContext(CheckboxGroupContext);
    const props = mergeProps(defaultProps$M, p);
    let [checked, setChecked] = usePropsValue({
      value: props.checked,
      defaultValue: props.defaultChecked,
      onChange: props.onChange
    });
    let disabled = props.disabled;
    const {
      value
    } = props;
    if (groupContext && value !== void 0) {
      {
        if (p.checked !== void 0) {
          devWarning("Checkbox", "When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work.");
        }
        if (p.defaultChecked !== void 0) {
          devWarning("Checkbox", "When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.");
        }
      }
      checked = groupContext.value.includes(value);
      setChecked = (checked2) => {
        var _a;
        if (checked2) {
          groupContext.check(value);
        } else {
          groupContext.uncheck(value);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, checked2);
      };
      disabled = disabled || groupContext.disabled;
    }
    React$1.useImperativeHandle(ref, () => ({
      check: () => {
        setChecked(true);
      },
      uncheck: () => {
        setChecked(false);
      },
      toggle: () => {
        setChecked(!checked);
      }
    }));
    const renderIcon = () => {
      if (props.icon) {
        return React$1.createElement("div", {
          className: `${classPrefix$X}-custom-icon`
        }, props.icon(checked, props.indeterminate));
      }
      return React$1.createElement("div", {
        className: `${classPrefix$X}-icon`
      }, props.indeterminate ? React$1.createElement(IndeterminateIcon, null) : checked && React$1.createElement(CheckIcon, null));
    };
    return withNativeProps(props, React$1.createElement("label", {
      onClick: props.onClick,
      className: classNames(classPrefix$X, {
        [`${classPrefix$X}-checked`]: checked && !props.indeterminate,
        [`${classPrefix$X}-indeterminate`]: props.indeterminate,
        [`${classPrefix$X}-disabled`]: disabled,
        [`${classPrefix$X}-block`]: props.block
      })
    }, React$1.createElement(NativeInput, {
      type: "checkbox",
      checked,
      onChange: setChecked,
      disabled,
      id: props.id
    }), renderIcon(), props.children && React$1.createElement("div", {
      className: `${classPrefix$X}-content`
    }, props.children)));
  });
  const Checkbox = attachPropertiesToComponent(Checkbox$1, {
    Group: Group$1
  });
  const classPrefix$W = `adm-collapse`;
  const CollapsePanel = () => {
    return null;
  };
  const CollapsePanelContent = (props) => {
    const {
      visible
    } = props;
    const innerRef = React$1.useRef(null);
    const shouldRender = useShouldRender(visible, props.forceRender, props.destroyOnClose);
    const [{
      height
    }, api] = useSpring(() => ({
      from: {
        height: 0
      },
      config: {
        precision: 0.01,
        mass: 1,
        tension: 200,
        friction: 25,
        clamp: true
      }
    }));
    useMount$1(() => {
      if (!visible)
        return;
      const inner = innerRef.current;
      if (!inner)
        return;
      api.start({
        height: inner.offsetHeight,
        immediate: true
      });
    });
    useIsomorphicUpdateLayoutEffect(() => {
      const inner = innerRef.current;
      if (!inner)
        return;
      if (visible) {
        api.start({
          height: inner.offsetHeight
        });
      } else {
        api.start({
          height: inner.offsetHeight,
          immediate: true
        });
        api.start({
          height: 0
        });
      }
    }, [visible]);
    return React$1.createElement(animated.div, {
      className: classNames(`${classPrefix$W}-panel-content`, {
        [`${classPrefix$W}-panel-content-active`]: visible
      }),
      style: {
        height: height.to((v) => {
          if (height.idle && visible) {
            return "auto";
          } else {
            return v;
          }
        })
      }
    }, React$1.createElement("div", {
      className: `${classPrefix$W}-panel-content-inner`,
      ref: innerRef
    }, React$1.createElement(List$1.Item, null, shouldRender && props.children)));
  };
  const Collapse = (props) => {
    const panels = [];
    traverseReactNode(props.children, (child) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      panels.push(child);
    });
    const handlePropsValue = () => {
      var _a;
      if (!props.accordion) {
        return {
          value: props.activeKey,
          defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : [],
          onChange: props.onChange
        };
      }
      const initValue = {
        value: [],
        defaultValue: [],
        onChange: (v) => {
          var _a2, _b;
          (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, (_b = v[0]) !== null && _b !== void 0 ? _b : null);
        }
      };
      if (props.activeKey === void 0) {
        initValue.value = void 0;
      } else if (props.activeKey !== null) {
        initValue.value = [props.activeKey];
      }
      if (![null, void 0].includes(props.defaultActiveKey)) {
        initValue.defaultValue = [props.defaultActiveKey];
      }
      return initValue;
    };
    const [activeKey, setActiveKey] = usePropsValue(handlePropsValue());
    const activeKeyList = activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$W
    }, React$1.createElement(List$1, null, panels.map((panel) => {
      const key = panel.key;
      const active = activeKeyList.includes(key);
      function handleClick(event) {
        var _a, _b;
        if (props.accordion) {
          if (active) {
            setActiveKey([]);
          } else {
            setActiveKey([key]);
          }
        } else {
          if (active) {
            setActiveKey(activeKeyList.filter((v) => v !== key));
          } else {
            setActiveKey([...activeKeyList, key]);
          }
        }
        (_b = (_a = panel.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      }
      const renderArrow = () => {
        let arrow2 = React$1.createElement(DownOutline, null);
        if (props.arrow !== void 0) {
          arrow2 = props.arrow;
        }
        if (panel.props.arrow !== void 0) {
          arrow2 = panel.props.arrow;
        }
        return typeof arrow2 === "function" ? arrow2(active) : React$1.createElement("div", {
          className: classNames(`${classPrefix$W}-arrow`, {
            [`${classPrefix$W}-arrow-active`]: active
          })
        }, arrow2);
      };
      return React$1.createElement(React$1.Fragment, {
        key
      }, withNativeProps(panel.props, React$1.createElement(List$1.Item, {
        className: `${classPrefix$W}-panel-header`,
        onClick: handleClick,
        disabled: panel.props.disabled,
        arrow: renderArrow()
      }, panel.props.title)), React$1.createElement(CollapsePanelContent, {
        visible: active,
        forceRender: !!panel.props.forceRender,
        destroyOnClose: !!panel.props.destroyOnClose
      }, panel.props.children));
    }))));
  };
  const index$e = attachPropertiesToComponent(Collapse, {
    Panel: CollapsePanel
  });
  var isoWeeksInYear$1 = { exports: {} };
  (function(module2, exports3) {
    !function(e2, n2) {
      module2.exports = n2();
    }(commonjsGlobal, function() {
      return function(e2, n2) {
        n2.prototype.isoWeeksInYear = function() {
          var e3 = this.isLeapYear(), n3 = this.endOf("y").day();
          return 4 === n3 || e3 && 5 === n3 ? 53 : 52;
        };
      };
    });
  })(isoWeeksInYear$1);
  var isoWeeksInYearExports = isoWeeksInYear$1.exports;
  const isoWeeksInYear = /* @__PURE__ */ getDefaultExportFromCjs(isoWeeksInYearExports);
  var isLeapYear$1 = { exports: {} };
  (function(module2, exports3) {
    !function(e2, t) {
      module2.exports = t();
    }(commonjsGlobal, function() {
      return function(e2, t) {
        t.prototype.isLeapYear = function() {
          return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
        };
      };
    });
  })(isLeapYear$1);
  var isLeapYearExports = isLeapYear$1.exports;
  const isLeapYear = /* @__PURE__ */ getDefaultExportFromCjs(isLeapYearExports);
  const TILL_NOW = "TILL_NOW";
  dayjs.extend(isoWeek);
  dayjs.extend(isoWeeksInYear);
  dayjs.extend(isLeapYear);
  const precisionRankRecord$1 = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
  };
  function generateDatePickerColumns$2(selected, min2, max2, precision, renderLabel, filter, tillNow) {
    const ret = [];
    const minYear = min2.getFullYear();
    const minMonth = min2.getMonth() + 1;
    const minDay = min2.getDate();
    const minHour = min2.getHours();
    const minMinute = min2.getMinutes();
    const minSecond = min2.getSeconds();
    const maxYear = max2.getFullYear();
    const maxMonth = max2.getMonth() + 1;
    const maxDay = max2.getDate();
    const maxHour = max2.getHours();
    const maxMinute = max2.getMinutes();
    const maxSecond = max2.getSeconds();
    const rank = precisionRankRecord$1[precision];
    const selectedYear = parseInt(selected[0]);
    const firstDayInSelectedMonth = dayjs(convertStringArrayToDate$2([selected[0], selected[1], "1"]));
    const selectedMonth = parseInt(selected[1]);
    const selectedDay = parseInt(selected[2]);
    const selectedHour = parseInt(selected[3]);
    const selectedMinute = parseInt(selected[4]);
    const isInMinYear = selectedYear === minYear;
    const isInMaxYear = selectedYear === maxYear;
    const isInMinMonth = isInMinYear && selectedMonth === minMonth;
    const isInMaxMonth = isInMaxYear && selectedMonth === maxMonth;
    const isInMinDay = isInMinMonth && selectedDay === minDay;
    const isInMaxDay = isInMaxMonth && selectedDay === maxDay;
    const isInMinHour = isInMinDay && selectedHour === minHour;
    const isInMaxHour = isInMaxDay && selectedHour === maxHour;
    const isInMinMinute = isInMinHour && selectedMinute === minMinute;
    const isInMaxMinute = isInMaxHour && selectedMinute === maxMinute;
    const generateColumn = (from, to2, precision2) => {
      let column = [];
      for (let i2 = from; i2 <= to2; i2++) {
        column.push(i2);
      }
      const prefix2 = selected.slice(0, precisionRankRecord$1[precision2]);
      const currentFilter = filter === null || filter === void 0 ? void 0 : filter[precision2];
      if (currentFilter && typeof currentFilter === "function") {
        column = column.filter((i2) => currentFilter(i2, {
          get date() {
            const stringArray = [...prefix2, i2.toString()];
            return convertStringArrayToDate$2(stringArray);
          }
        }));
      }
      return column;
    };
    if (rank >= precisionRankRecord$1.year) {
      const lower = minYear;
      const upper = maxYear;
      const years = generateColumn(lower, upper, "year");
      ret.push(years.map((v) => ({
        label: renderLabel("year", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord$1.month) {
      const lower = isInMinYear ? minMonth : 1;
      const upper = isInMaxYear ? maxMonth : 12;
      const months = generateColumn(lower, upper, "month");
      ret.push(months.map((v) => ({
        label: renderLabel("month", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord$1.day) {
      const lower = isInMinMonth ? minDay : 1;
      const upper = isInMaxMonth ? maxDay : firstDayInSelectedMonth.daysInMonth();
      const days = generateColumn(lower, upper, "day");
      ret.push(days.map((v) => ({
        label: renderLabel("day", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord$1.hour) {
      const lower = isInMinDay ? minHour : 0;
      const upper = isInMaxDay ? maxHour : 23;
      const hours = generateColumn(lower, upper, "hour");
      ret.push(hours.map((v) => ({
        label: renderLabel("hour", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord$1.minute) {
      const lower = isInMinHour ? minMinute : 0;
      const upper = isInMaxHour ? maxMinute : 59;
      const minutes = generateColumn(lower, upper, "minute");
      ret.push(minutes.map((v) => ({
        label: renderLabel("minute", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord$1.second) {
      const lower = isInMinMinute ? minSecond : 0;
      const upper = isInMaxMinute ? maxSecond : 59;
      const seconds = generateColumn(lower, upper, "second");
      ret.push(seconds.map((v) => ({
        label: renderLabel("second", v),
        value: v.toString()
      })));
    }
    if (tillNow) {
      ret[0].push({
        label: renderLabel("now", null),
        value: TILL_NOW
      });
      if (TILL_NOW === (selected === null || selected === void 0 ? void 0 : selected[0])) {
        for (let i2 = 1; i2 < ret.length; i2 += 1) {
          ret[i2] = [];
        }
      }
    }
    return ret;
  }
  function convertDateToStringArray$2(date) {
    if (!date)
      return [];
    return [date.getFullYear().toString(), (date.getMonth() + 1).toString(), date.getDate().toString(), date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
  }
  function convertStringArrayToDate$2(value) {
    var _a, _b, _c, _d, _e, _f;
    const yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : "1900";
    const monthString = (_b = value[1]) !== null && _b !== void 0 ? _b : "1";
    const dateString = (_c = value[2]) !== null && _c !== void 0 ? _c : "1";
    const hourString = (_d = value[3]) !== null && _d !== void 0 ? _d : "0";
    const minuteString = (_e = value[4]) !== null && _e !== void 0 ? _e : "0";
    const secondString = (_f = value[5]) !== null && _f !== void 0 ? _f : "0";
    return new Date(parseInt(yearString), parseInt(monthString) - 1, parseInt(dateString), parseInt(hourString), parseInt(minuteString), parseInt(secondString));
  }
  dayjs.extend(isoWeek);
  dayjs.extend(isoWeeksInYear);
  dayjs.extend(isLeapYear);
  const precisionRankRecord = {
    year: 0,
    week: 1,
    "week-day": 2
  };
  function generateDatePickerColumns$1(selected, min2, max2, precision, renderLabel, filter) {
    const ret = [];
    const minYear = min2.getFullYear();
    const maxYear = max2.getFullYear();
    const rank = precisionRankRecord[precision];
    const selectedYear = parseInt(selected[0]);
    const isInMinYear = selectedYear === minYear;
    const isInMaxYear = selectedYear === maxYear;
    const minDay = dayjs(min2);
    const maxDay = dayjs(max2);
    const minWeek = minDay.isoWeek();
    const maxWeek = maxDay.isoWeek();
    const minWeekday = minDay.isoWeekday();
    const maxWeekday = maxDay.isoWeekday();
    const selectedWeek = parseInt(selected[1]);
    const isInMinWeek = isInMinYear && selectedWeek === minWeek;
    const isInMaxWeek = isInMaxYear && selectedWeek === maxWeek;
    const selectedYearWeeks = dayjs(`${selectedYear}-01-01`).isoWeeksInYear();
    const generateColumn = (from, to2, precision2) => {
      let column = [];
      for (let i2 = from; i2 <= to2; i2++) {
        column.push(i2);
      }
      const prefix2 = selected.slice(0, precisionRankRecord[precision2]);
      const currentFilter = filter === null || filter === void 0 ? void 0 : filter[precision2];
      if (currentFilter && typeof currentFilter === "function") {
        column = column.filter((i2) => currentFilter(i2, {
          get date() {
            const stringArray = [...prefix2, i2.toString()];
            return convertStringArrayToDate$1(stringArray);
          }
        }));
      }
      return column;
    };
    if (rank >= precisionRankRecord.year) {
      const lower = minYear;
      const upper = maxYear;
      const years = generateColumn(lower, upper, "year");
      ret.push(years.map((v) => ({
        label: renderLabel("year", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord.week) {
      const lower = isInMinYear ? minWeek : 1;
      const upper = isInMaxYear ? maxWeek : selectedYearWeeks;
      const weeks = generateColumn(lower, upper, "week");
      ret.push(weeks.map((v) => ({
        label: renderLabel("week", v),
        value: v.toString()
      })));
    }
    if (rank >= precisionRankRecord["week-day"]) {
      const lower = isInMinWeek ? minWeekday : 1;
      const upper = isInMaxWeek ? maxWeekday : 7;
      const weeks = generateColumn(lower, upper, "week-day");
      ret.push(weeks.map((v) => ({
        label: renderLabel("week-day", v),
        value: v.toString()
      })));
    }
    return ret;
  }
  function convertDateToStringArray$1(date) {
    if (!date)
      return [];
    const day = dayjs(date);
    return [day.isoWeekYear().toString(), day.isoWeek().toString(), day.isoWeekday().toString()];
  }
  function convertStringArrayToDate$1(value) {
    var _a, _b, _c;
    const yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : "1900";
    const weekString = (_b = value[1]) !== null && _b !== void 0 ? _b : "1";
    const weekdayString = (_c = value[2]) !== null && _c !== void 0 ? _c : "1";
    const day = dayjs().year(parseInt(yearString)).isoWeek(parseInt(weekString)).isoWeekday(parseInt(weekdayString)).hour(0).minute(0).second(0);
    return day.toDate();
  }
  const precisionLengthRecord = {
    year: 1,
    month: 2,
    day: 3,
    hour: 4,
    minute: 5,
    second: 6
  };
  const convertDateToStringArray = (date, precision) => {
    if (precision.includes("week")) {
      return convertDateToStringArray$1(date);
    } else {
      const datePrecision = precision;
      const stringArray = convertDateToStringArray$2(date);
      return stringArray.slice(0, precisionLengthRecord[datePrecision]);
    }
  };
  const convertStringArrayToDate = (value, precision) => {
    if ((value === null || value === void 0 ? void 0 : value[0]) === TILL_NOW) {
      const now2 = /* @__PURE__ */ new Date();
      now2.tillNow = true;
      return now2;
    }
    if (precision.includes("week")) {
      return convertStringArrayToDate$1(value);
    } else {
      return convertStringArrayToDate$2(value);
    }
  };
  const generateDatePickerColumns = (selected, min2, max2, precision, renderLabel, filter, tillNow) => {
    if (precision.startsWith("week")) {
      return generateDatePickerColumns$1(selected, min2, max2, precision, renderLabel, filter);
    } else {
      return generateDatePickerColumns$2(selected, min2, max2, precision, renderLabel, filter, tillNow);
    }
  };
  function useRenderLabel(renderLabel) {
    const {
      locale
    } = useConfig();
    return React$1.useCallback((type, data) => {
      if (renderLabel) {
        return renderLabel(type, data);
      }
      switch (type) {
        case "minute":
        case "second":
        case "hour":
          return ("0" + data.toString()).slice(-2);
        case "now":
          return locale.DatePicker.tillNow;
        default:
          return data.toString();
      }
    }, [renderLabel]);
  }
  const thisYear$1 = (/* @__PURE__ */ new Date()).getFullYear();
  const defaultProps$L = {
    min: new Date((/* @__PURE__ */ new Date()).setFullYear(thisYear$1 - 10)),
    max: new Date((/* @__PURE__ */ new Date()).setFullYear(thisYear$1 + 10)),
    precision: "day",
    defaultValue: null
  };
  const DatePicker = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$L, p);
    const {
      renderLabel
    } = props;
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: props.defaultValue,
      onChange: (v) => {
        var _a;
        if (v === null)
          return;
        (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, v);
      }
    });
    const now2 = React$1.useMemo(() => /* @__PURE__ */ new Date(), []);
    const mergedRenderLabel = useRenderLabel(renderLabel);
    const pickerValue = React$1.useMemo(() => {
      let date = value !== null && value !== void 0 ? value : now2;
      if (date.tillNow) {
        return [TILL_NOW];
      }
      date = new Date(bound(date.getTime(), props.min.getTime(), props.max.getTime()));
      return convertDateToStringArray(date, props.precision);
    }, [value, props.precision, props.min, props.max]);
    const onConfirm = React$1.useCallback((val) => {
      const date = convertStringArrayToDate(val, props.precision);
      setValue2(date, true);
    }, [setValue2, props.precision]);
    const onSelect = useMemoizedFn((val) => {
      var _a;
      const date = convertStringArrayToDate(val, props.precision);
      (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
    });
    const columns = React$1.useCallback((selected) => generateDatePickerColumns(selected, props.min, props.max, props.precision, mergedRenderLabel, props.filter, props.tillNow), [props.min, props.max, props.precision, mergedRenderLabel, props.tillNow]);
    return withNativeProps(props, React$1.createElement(Picker, {
      ref,
      columns,
      value: pickerValue,
      onCancel: props.onCancel,
      onClose: props.onClose,
      closeOnMaskClick: props.closeOnMaskClick,
      visible: props.visible,
      confirmText: props.confirmText,
      cancelText: props.cancelText,
      onConfirm,
      onSelect,
      getContainer: props.getContainer,
      loading: props.loading,
      loadingContent: props.loadingContent,
      afterShow: props.afterShow,
      afterClose: props.afterClose,
      onClick: props.onClick,
      title: props.title,
      stopPropagation: props.stopPropagation,
      mouseWheel: props.mouseWheel,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender
    }, (_, actions) => {
      var _a;
      return (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, value, actions);
    }));
  });
  function prompt(props) {
    return new Promise((resolve) => {
      const Wrapper2 = () => {
        const [visible, setVisible] = React$1.useState(false);
        React$1.useEffect(() => {
          setVisible(true);
        }, []);
        return React$1.createElement(DatePicker, Object.assign({}, props, {
          visible,
          onConfirm: (val) => {
            var _a;
            (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val);
            resolve(val);
          },
          onClose: () => {
            var _a;
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
            setVisible(false);
            resolve(null);
          },
          afterClose: () => {
            var _a;
            (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
            unmount2();
          }
        }));
      };
      const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
    });
  }
  const index$d = attachPropertiesToComponent(DatePicker, {
    prompt,
    DATE_NOW: TILL_NOW
  });
  const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
  const defaultProps$K = {
    min: new Date((/* @__PURE__ */ new Date()).setFullYear(thisYear - 10)),
    max: new Date((/* @__PURE__ */ new Date()).setFullYear(thisYear + 10)),
    precision: "day"
  };
  const DatePickerView = (p) => {
    var _a;
    const props = mergeProps(defaultProps$K, p);
    const {
      renderLabel
    } = props;
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null
    });
    const mergedRenderLabel = useRenderLabel(renderLabel);
    const pickerValue = React$1.useMemo(() => {
      if (value === null || value === void 0 ? void 0 : value.tillNow) {
        return [TILL_NOW, null, null];
      }
      return convertDateToStringArray(value, props.precision);
    }, [value, props.precision]);
    const onChange = React$1.useCallback((val) => {
      var _a2;
      const date = convertStringArrayToDate(val, props.precision);
      if (date) {
        setValue2(date);
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, date);
      }
    }, [props.onChange, props.precision]);
    return withNativeProps(props, React$1.createElement(PickerView, {
      columns: (selected) => generateDatePickerColumns(selected, props.min, props.max, props.precision, mergedRenderLabel, props.filter, props.tillNow),
      loading: props.loading,
      loadingContent: props.loadingContent,
      value: pickerValue,
      mouseWheel: props.mouseWheel,
      onChange
    }));
  };
  const DialogActionButton = (props) => {
    const {
      action
    } = props;
    return withNativeProps(props.action, React$1.createElement(Button, {
      key: action.key,
      onClick: props.onAction,
      className: classNames("adm-dialog-button", {
        "adm-dialog-button-bold": action.bold
      }),
      fill: "none",
      shape: "rectangular",
      block: true,
      color: action.danger ? "danger" : "primary",
      loading: "auto",
      disabled: action.disabled
    }, action.text));
  };
  const defaultProps$J = {
    actions: [],
    closeOnAction: false,
    closeOnMaskClick: false,
    getContainer: null
  };
  const Dialog = (p) => {
    const props = mergeProps(defaultProps$J, p);
    const element = React$1.createElement(React$1.Fragment, null, !!props.image && React$1.createElement("div", {
      className: cls$1("image-container")
    }, React$1.createElement(Image$1, {
      src: props.image,
      alt: "dialog header image",
      width: "100%"
    })), !!props.header && React$1.createElement("div", {
      className: cls$1("header")
    }, React$1.createElement(AutoCenter, null, props.header)), !!props.title && React$1.createElement("div", {
      className: cls$1("title")
    }, props.title), React$1.createElement("div", {
      className: classNames(cls$1("content"), !props.content && cls$1("content-empty"))
    }, typeof props.content === "string" ? React$1.createElement(AutoCenter, null, props.content) : props.content), React$1.createElement("div", {
      className: cls$1("footer")
    }, props.actions.map((row, index2) => {
      const actions = Array.isArray(row) ? row : [row];
      return React$1.createElement("div", {
        className: cls$1("action-row"),
        key: index2
      }, actions.map((action, index3) => React$1.createElement(DialogActionButton, {
        key: action.key,
        action,
        onAction: () => __awaiter(void 0, void 0, void 0, function* () {
          var _a, _b, _c;
          yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index3)]);
          if (props.closeOnAction) {
            (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
          }
        })
      })));
    })));
    return React$1.createElement(CenterPopup, {
      className: classNames(cls$1(), props.className),
      style: props.style,
      afterClose: props.afterClose,
      afterShow: props.afterShow,
      onMaskClick: props.closeOnMaskClick ? () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      } : void 0,
      visible: props.visible,
      getContainer: props.getContainer,
      bodyStyle: props.bodyStyle,
      bodyClassName: classNames(cls$1("body"), props.image && cls$1("with-image"), props.bodyClassName),
      maskStyle: props.maskStyle,
      maskClassName: props.maskClassName,
      stopPropagation: props.stopPropagation,
      disableBodyScroll: props.disableBodyScroll,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender,
      role: "dialog",
      "aria-label": props["aria-label"]
    }, element);
  };
  function cls$1(name = "") {
    return "adm-dialog" + (name && "-") + name;
  }
  const closeFnSet$1 = /* @__PURE__ */ new Set();
  function show$2(props) {
    const handler = renderImperatively(React$1.createElement(Dialog, Object.assign({}, props, {
      afterClose: () => {
        var _a;
        closeFnSet$1.delete(handler.close);
        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    })));
    closeFnSet$1.add(handler.close);
    return handler;
  }
  function alert$1(p) {
    const defaultProps2 = {
      confirmText: getDefaultConfig().locale.Dialog.ok
    };
    const props = mergeProps(defaultProps2, p);
    return new Promise((resolve) => {
      show$2(Object.assign(Object.assign({}, props), {
        closeOnAction: true,
        actions: [{
          key: "confirm",
          text: props.confirmText
        }],
        onAction: props.onConfirm,
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve();
        }
      }));
    });
  }
  const defaultProps$I = {
    confirmText: "确认",
    cancelText: "取消"
  };
  function confirm$1(p) {
    const {
      locale
    } = getDefaultConfig();
    const props = mergeProps(defaultProps$I, {
      confirmText: locale.common.confirm,
      cancelText: locale.common.cancel
    }, p);
    return new Promise((resolve) => {
      show$2(Object.assign(Object.assign({}, props), {
        closeOnAction: true,
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve(false);
        },
        actions: [[{
          key: "cancel",
          text: props.cancelText,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
            resolve(false);
          })
        }, {
          key: "confirm",
          text: props.confirmText,
          bold: true,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            yield (_b = props.onConfirm) === null || _b === void 0 ? void 0 : _b.call(props);
            resolve(true);
          })
        }]]
      }));
    });
  }
  function clear$2() {
    closeFnSet$1.forEach((close) => {
      close();
    });
  }
  const index$c = attachPropertiesToComponent(Dialog, {
    show: show$2,
    alert: alert$1,
    confirm: confirm$1,
    clear: clear$2
  });
  const classPrefix$V = `adm-dropdown-item`;
  const Item = (props) => {
    var _a;
    const cls2 = classNames(classPrefix$V, {
      [`${classPrefix$V}-active`]: props.active,
      [`${classPrefix$V}-highlight`]: (_a = props.highlight) !== null && _a !== void 0 ? _a : props.active
    });
    return withNativeProps(props, React$1.createElement("div", {
      className: cls2,
      onClick: props.onClick
    }, React$1.createElement("div", {
      className: `${classPrefix$V}-title`
    }, React$1.createElement("span", {
      className: `${classPrefix$V}-title-text`
    }, props.title), React$1.createElement("span", {
      className: classNames(`${classPrefix$V}-title-arrow`, {
        [`${classPrefix$V}-title-arrow-active`]: props.active
      })
    }, props.arrow === void 0 ? React$1.createElement(DownFill, null) : props.arrow))));
  };
  const Item$1 = Item;
  const ItemChildrenWrap = (props) => {
    const {
      active = false
    } = props;
    const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
    const cls2 = classNames(`${classPrefix$V}-content`, {
      [`${classPrefix$V}-content-hidden`]: !active
    });
    return shouldRender ? React$1.createElement("div", {
      className: cls2,
      onClick: props.onClick
    }, props.children) : null;
  };
  const classPrefix$U = `adm-dropdown`;
  const defaultProps$H = {
    defaultActiveKey: null,
    closeOnMaskClick: true,
    closeOnClickAway: false,
    getContainer: defaultPopupBaseProps["getContainer"]
  };
  const Dropdown = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$H, p);
    const [value, setValue2] = usePropsValue({
      value: props.activeKey,
      defaultValue: props.defaultActiveKey,
      onChange: props.onChange
    });
    const navRef = React$1.useRef(null);
    const contentRef = React$1.useRef(null);
    useClickAway(() => {
      if (!props.closeOnClickAway)
        return;
      setValue2(null);
    }, [navRef, contentRef]);
    const [top, setTop] = React$1.useState();
    const containerRef = React$1.useRef(null);
    React$1.useEffect(() => {
      const container = containerRef.current;
      if (!container)
        return;
      if (value) {
        const rect = container.getBoundingClientRect();
        setTop(rect.bottom);
      }
    }, [value]);
    const changeActive = (key) => {
      if (value === key) {
        setValue2(null);
      } else {
        setValue2(key);
      }
    };
    let popupForceRender = false;
    const items = [];
    const navs = React$1.Children.map(props.children, (child) => {
      if (React$1.isValidElement(child)) {
        const childProps = Object.assign(Object.assign({}, child.props), {
          onClick: (event) => {
            var _a, _b;
            changeActive(child.key);
            (_b = (_a = child.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
          },
          active: child.key === value,
          arrow: child.props.arrow === void 0 ? props.arrow : child.props.arrow
        });
        items.push(child);
        if (child.props.forceRender)
          popupForceRender = true;
        return React$1.cloneElement(child, childProps);
      } else {
        return child;
      }
    });
    React$1.useImperativeHandle(ref, () => ({
      close: () => {
        setValue2(null);
      }
    }), [setValue2]);
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$U, {
        [`${classPrefix$U}-open`]: !!value
      }),
      ref: containerRef
    }, React$1.createElement("div", {
      className: `${classPrefix$U}-nav`,
      ref: navRef
    }, navs), React$1.createElement(Popup, {
      visible: !!value,
      position: "top",
      getContainer: props.getContainer,
      className: `${classPrefix$U}-popup`,
      maskClassName: `${classPrefix$U}-popup-mask`,
      bodyClassName: `${classPrefix$U}-popup-body`,
      style: {
        top
      },
      forceRender: popupForceRender,
      onMaskClick: props.closeOnMaskClick ? () => {
        changeActive(null);
      } : void 0
    }, React$1.createElement("div", {
      ref: contentRef
    }, items.map((item) => {
      const isActive = item.key === value;
      return React$1.createElement(ItemChildrenWrap, {
        key: item.key,
        active: isActive,
        forceRender: item.props.forceRender,
        destroyOnClose: item.props.destroyOnClose
      }, item.props.children);
    })))));
  });
  const Dropdown$1 = Dropdown;
  const index$b = attachPropertiesToComponent(Dropdown$1, {
    Item: Item$1
  });
  var i;
  !function(i2) {
    i2[i2.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", i2[i2.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", i2[i2.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", i2[i2.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", i2[i2.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", i2[i2.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", i2[i2.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", i2[i2.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", i2[i2.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", i2[i2.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", i2[i2.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", i2[i2.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", i2[i2.TAGS_START = 917504] = "TAGS_START", i2[i2.TAGS_END = 917631] = "TAGS_END", i2[i2.ZWJ = 8205] = "ZWJ";
  }(i || (i = {}));
  const e = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  var n;
  function runes(i2) {
    if ("string" != typeof i2)
      throw new TypeError("string cannot be undefined or null");
    const e2 = [];
    let n2 = 0, t = 0;
    for (; n2 < i2.length; )
      t += nextUnits(n2 + t, i2), isGrapheme(i2[n2 + t]) && t++, isVariationSelector(i2[n2 + t]) && t++, isDiacriticalMark(i2[n2 + t]) && t++, isZeroWidthJoiner(i2[n2 + t]) ? t++ : (e2.push(i2.substring(n2, n2 + t)), n2 += t, t = 0);
    return e2;
  }
  function nextUnits(i2, e2) {
    const n2 = e2[i2];
    if (!isFirstOfSurrogatePair(n2) || i2 === e2.length - 1)
      return 1;
    const t = n2 + e2[i2 + 1];
    let r = e2.substring(i2 + 2, i2 + 5);
    return isRegionalIndicator(t) && isRegionalIndicator(r) ? 4 : isSubdivisionFlag(t) && isSupplementarySpecialpurposePlane(r) ? e2.slice(i2).indexOf(String.fromCodePoint(917631)) + 2 : isFitzpatrickModifier(r) ? 4 : 2;
  }
  function isFirstOfSurrogatePair(i2) {
    return i2 && betweenInclusive(i2[0].charCodeAt(0), 55296, 56319);
  }
  function isRegionalIndicator(i2) {
    return betweenInclusive(codePointFromSurrogatePair(i2), 127462, 127487);
  }
  function isSubdivisionFlag(i2) {
    return betweenInclusive(codePointFromSurrogatePair(i2), 127988, 127988);
  }
  function isFitzpatrickModifier(i2) {
    return betweenInclusive(codePointFromSurrogatePair(i2), 127995, 127999);
  }
  function isVariationSelector(i2) {
    return "string" == typeof i2 && betweenInclusive(i2.charCodeAt(0), 65024, 65039);
  }
  function isDiacriticalMark(i2) {
    return "string" == typeof i2 && betweenInclusive(i2.charCodeAt(0), 8400, 8447);
  }
  function isSupplementarySpecialpurposePlane(i2) {
    const e2 = i2.codePointAt(0);
    return "string" == typeof i2 && "number" == typeof e2 && betweenInclusive(e2, 917504, 917631);
  }
  function isGrapheme(i2) {
    return "string" == typeof i2 && e.includes(i2.charCodeAt(0));
  }
  function isZeroWidthJoiner(i2) {
    return "string" == typeof i2 && 8205 === i2.charCodeAt(0);
  }
  function codePointFromSurrogatePair(i2) {
    return (i2.charCodeAt(0) - 55296 << 10) + (i2.charCodeAt(1) - 56320) + 65536;
  }
  function betweenInclusive(i2, e2, n2) {
    return i2 >= e2 && i2 <= n2;
  }
  !function(i2) {
    i2[i2.unit_1 = 1] = "unit_1", i2[i2.unit_2 = 2] = "unit_2", i2[i2.unit_4 = 4] = "unit_4";
  }(n || (n = {}));
  const classPrefix$T = `adm-ellipsis`;
  const defaultProps$G = {
    direction: "end",
    rows: 1,
    expandText: "",
    content: "",
    collapseText: "",
    stopPropagationForActionButtons: [],
    onContentClick: () => {
    },
    defaultExpanded: false
  };
  const Ellipsis = (p) => {
    const props = mergeProps(defaultProps$G, p);
    const rootRef = React$1.useRef(null);
    const expandElRef = React$1.useRef(null);
    const collapseElRef = React$1.useRef(null);
    const [ellipsised, setEllipsised] = React$1.useState({});
    const [expanded, setExpanded] = React$1.useState(props.defaultExpanded);
    const [exceeded, setExceeded] = React$1.useState(false);
    const chars = React$1.useMemo(() => runes(props.content), [props.content]);
    function getSubString(start2, end) {
      return chars.slice(start2, end).join("");
    }
    function calcEllipsised() {
      var _a, _b;
      const root2 = rootRef.current;
      if (!root2)
        return;
      const originDisplay = root2.style.display;
      root2.style.display = "block";
      const originStyle = window.getComputedStyle(root2);
      const container = document.createElement("div");
      const styleNames = Array.prototype.slice.apply(originStyle);
      styleNames.forEach((name) => {
        container.style.setProperty(name, originStyle.getPropertyValue(name));
      });
      root2.style.display = originDisplay;
      container.style.height = "auto";
      container.style.minHeight = "auto";
      container.style.maxHeight = "auto";
      container.style.textOverflow = "clip";
      container.style.webkitLineClamp = "unset";
      container.style.display = "block";
      const lineHeight = pxToNumber(originStyle.lineHeight);
      const maxHeight = Math.floor(lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
      container.innerText = props.content;
      document.body.appendChild(container);
      if (container.offsetHeight <= maxHeight) {
        setExceeded(false);
      } else {
        let check = function(left, right) {
          if (right - left <= 1) {
            if (props.direction === "end") {
              return {
                leading: getSubString(0, left) + "..."
              };
            } else {
              return {
                tailing: "..." + getSubString(right, end)
              };
            }
          }
          const middle2 = Math.round((left + right) / 2);
          if (props.direction === "end") {
            container.innerHTML = getSubString(0, middle2) + "..." + actionText;
          } else {
            container.innerHTML = actionText + "..." + getSubString(middle2, end);
          }
          if (container.offsetHeight <= maxHeight) {
            if (props.direction === "end") {
              return check(middle2, right);
            } else {
              return check(left, middle2);
            }
          } else {
            if (props.direction === "end") {
              return check(left, middle2);
            } else {
              return check(middle2, right);
            }
          }
        }, checkMiddle = function(leftPart, rightPart) {
          if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
            return {
              leading: getSubString(0, leftPart[0]) + "...",
              tailing: "..." + getSubString(rightPart[1], end)
            };
          }
          const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
          const rightPartMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);
          container.innerHTML = getSubString(0, leftPartMiddle) + "..." + actionText + "..." + getSubString(rightPartMiddle, end);
          if (container.offsetHeight <= maxHeight) {
            return checkMiddle([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
          } else {
            return checkMiddle([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
          }
        };
        setExceeded(true);
        const end = props.content.length;
        const collapseEl = typeof props.collapseText === "string" ? props.collapseText : (_a = collapseElRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML;
        const expandEl = typeof props.expandText === "string" ? props.expandText : (_b = expandElRef.current) === null || _b === void 0 ? void 0 : _b.innerHTML;
        const actionText = expanded ? collapseEl : expandEl;
        const middle = Math.floor((0 + end) / 2);
        const ellipsised2 = props.direction === "middle" ? checkMiddle([0, middle], [middle, end]) : check(0, end);
        setEllipsised(ellipsised2);
      }
      document.body.removeChild(container);
    }
    useResizeEffect(calcEllipsised, rootRef);
    useIsomorphicLayoutEffect$2(() => {
      calcEllipsised();
    }, [props.content, props.direction, props.rows, props.expandText, props.collapseText]);
    const expandActionElement = !!props.expandText && withStopPropagation(props.stopPropagationForActionButtons, React$1.createElement("a", {
      ref: expandElRef,
      onClick: () => {
        setExpanded(true);
      }
    }, props.expandText));
    const collapseActionElement = !!props.collapseText && withStopPropagation(props.stopPropagationForActionButtons, React$1.createElement("a", {
      ref: collapseElRef,
      onClick: () => {
        setExpanded(false);
      }
    }, props.collapseText));
    const renderContent = () => {
      if (!exceeded)
        return props.content;
      if (expanded)
        return React$1.createElement(React$1.Fragment, null, props.content, collapseActionElement);
      return React$1.createElement(React$1.Fragment, null, ellipsised.leading, expandActionElement, ellipsised.tailing);
    };
    return withNativeProps(props, React$1.createElement("div", {
      ref: rootRef,
      className: classPrefix$T,
      onClick: (e2) => {
        if (e2.target === e2.currentTarget) {
          props.onContentClick(e2);
        }
      }
    }, renderContent()));
  };
  function pxToNumber(value) {
    if (!value)
      return 0;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
  }
  const EmptyIcon = (props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      viewBox: "0 0 64 41"
    }, React$1.createElement("g", {
      transform: "translate(0 1)",
      fill: "none",
      fillRule: "evenodd"
    }, React$1.createElement("ellipse", {
      fill: "#f5f5f5",
      cx: "32",
      cy: "33",
      rx: "32",
      ry: "7"
    }), React$1.createElement("g", {
      stroke: "#d9d9d9"
    }, React$1.createElement("path", {
      d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
    }), React$1.createElement("path", {
      d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
      fill: "#fafafa"
    })))));
  };
  const classPrefix$S = `adm-empty`;
  const Empty = (props) => {
    function renderImageNode() {
      const {
        image
      } = props;
      if (image === void 0) {
        return React$1.createElement(EmptyIcon, {
          className: `${classPrefix$S}-image`,
          style: props.imageStyle
        });
      }
      if (typeof image === "string") {
        return React$1.createElement("img", {
          className: `${classPrefix$S}-image`,
          style: props.imageStyle,
          src: image,
          alt: "empty"
        });
      }
      return image;
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$S
    }, React$1.createElement("div", {
      className: `${classPrefix$S}-image-container`
    }, renderImageNode()), props.description && React$1.createElement("div", {
      className: classNames(`${classPrefix$S}-description`)
    }, props.description)));
  };
  const classPrefix$R = `adm-error-block`;
  const defaultProps$F = {
    status: "default"
  };
  function createErrorBlock(imageRecord2) {
    const ErrorBlock2 = (p) => {
      var _a;
      const props = mergeProps(defaultProps$F, p);
      const {
        locale
      } = useConfig();
      const contentPack = locale.ErrorBlock[props.status];
      const desc = "description" in props ? props.description : contentPack.description;
      const title = "title" in props ? props.title : contentPack.title;
      const image = (_a = props.image) !== null && _a !== void 0 ? _a : imageRecord2[props.status];
      const imageNode = typeof image === "string" ? React$1.createElement("img", {
        src: image,
        alt: "error block image"
      }) : image;
      return withNativeProps(props, React$1.createElement("div", {
        className: classNames(classPrefix$R, {
          [`${classPrefix$R}-full-page`]: props.fullPage
        })
      }, React$1.createElement("div", {
        className: `${classPrefix$R}-image`
      }, imageNode), React$1.createElement("div", {
        className: `${classPrefix$R}-description`
      }, ![void 0, null].includes(title) && React$1.createElement("div", {
        className: `${classPrefix$R}-description-title`
      }, title), ![void 0, null].includes(desc) && React$1.createElement("div", {
        className: `${classPrefix$R}-description-subtitle`
      }, desc)), props.children && React$1.createElement("div", {
        className: `${classPrefix$R}-content`
      }, props.children)));
    };
    return ErrorBlock2;
  }
  const defaultImage = React$1.createElement("svg", {
    viewBox: "0 0 200 200",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
    x1: "50%",
    y1: "-116.862%",
    x2: "50%",
    y2: "90.764%",
    id: "error-block-image-default-a"
  }, React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.207,
    offset: "0%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.115,
    offset: "80.072%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0,
    offset: "100%"
  })), React$1.createElement("circle", {
    id: "error-block-image-default-d",
    cx: 18.823,
    cy: 18.823,
    r: 18.823
  }), React$1.createElement("rect", {
    id: "error-block-image-default-b",
    x: 3.5,
    y: 9,
    width: 51.429,
    height: 88,
    rx: 4.571
  })), React$1.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("path", {
    d: "M73.557.004c19.435-.311 38.696 17.016 51.523 35.287 8.708-10.822 17.127-16.233 25.255-16.233 13.333 0 28.35 14.274 45.053 42.822 1.769 3.024-3.582 7.435-16.054 13.231l-41.322 1.37c-7.343 5.872-31.225.626-69.152 1.234-27.79.445-45.759-1.234-53.908-5.037C3.2 71.143-1.625 68.686.48 65.308 27.371 22.12 51.73.353 73.557.003Zm93.098 49.53a1.125 1.125 0 0 0-.401.072l-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.283 1.719 4.153 3.898 4.314l.026.001v3.805c0 .39.25.705.56.705.31 0 .56-.316.56-.705l.001-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734Zm-100-5a1.125 1.125 0 0 0-.331.05l-.035.01-.035.012-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.212 1.613 4.036 3.695 4.294l.203.02.026.001v3.805c0 .39.25.705.56.705.282 0 .515-.26.555-.6l.006-.105v-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734ZM52.64 38.348l-.15.008-.149.023-.032.007-.032.008-.078.022-.045.015-.045.016-.06.023-.038.017-.038.017-.058.028-.022.011a2.201 2.201 0 0 0-.323.204l-.05.038-.05.04-.025.02-.025.021a3.742 3.742 0 0 0-.31.294l-.036.04c-.035.037-.07.076-.105.116-.01.012-.02.025-.031.036a3.275 3.275 0 0 0-.081.098l-.063.078c-2.031 2.583-3.48 8.692-3.48 11.027 0 2.636 1.846 4.832 4.292 5.323l.224.04-.064-.012.105.018.103.014v4.618c0 .47.299.85.667.85.337 0 .615-.32.659-.735l.006-.115v-4.618c.18-.023.355-.054.527-.094l.256-.067.196-.06c2.136-.706 3.68-2.75 3.68-5.162 0-2.996-2.383-12.207-5.325-12.207Z",
    transform: "translate(2.286 22.286)",
    fill: "url(#error-block-image-default-a)"
  }), React$1.createElement("g", {
    transform: "rotate(-90 102.429 55.357)"
  }, React$1.createElement("path", {
    d: "M6.857 0H52a6.857 6.857 0 0 1 6.857 6.857v92A6.857 6.857 0 0 1 52 105.714H6.857A6.857 6.857 0 0 1 0 98.857v-92A6.857 6.857 0 0 1 6.857 0Z",
    fill: "#7EACFF"
  }), React$1.createElement("mask", {
    id: "error-block-image-default-c",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-default-b"
  })), React$1.createElement("use", {
    fill: "#377EFF",
    xlinkHref: "#error-block-image-default-b"
  }), React$1.createElement("path", {
    d: "M11.838 91.8a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-2.858 0a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.16-2.305a.64.64 0 0 1 .628.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-2.982-.04a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm5.268-.531a.64.64 0 0 1 .628.651.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.858-1.143a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-6.37-.917c.209 0 .377.175.377.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm3.512-.798.093.007a.644.644 0 0 1 .535.645.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.652.627-.652Zm5.715 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-11.429 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.261.241c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm11.833-.812a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.628-.651c0-.36.281-.652.628-.652Zm-4.851.399c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm10.313-2.056a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-2.354-.128a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.652.628-.652Zm-13.798.311c.207 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.377-.39c0-.217.169-.392.377-.392Zm11.832-.812a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-6.285 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm3.428 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-6.118.24c.208 0 .376.176.376.392a.384.384 0 0 1-.376.39.384.384 0 0 1-.377-.39c0-.216.169-.391.377-.391Zm11.261-2.525a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm-3.557.484c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.478-.555a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.512-.26c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.857 0c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-4.571 0c.207 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm14.898-1.835a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-8.027-.245c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.169-.391.376-.391Zm6.271-1.349c.208 0 .377.175.377.391a.384.384 0 0 1-.377.391.384.384 0 0 1-.376-.39c0-.217.169-.392.376-.392Zm-11.484-.481c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm15.103-.972c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.39c0-.217.168-.392.376-.392Zm-9.333-1.404c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-6.819-.405c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Z",
    fill: "#003CFF",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-c)",
    transform: "rotate(116 12.367 83.503)"
  }), React$1.createElement("path", {
    stroke: "#FFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M36.774 5.474H21.523"
  }), React$1.createElement("path", {
    d: "m67.818 94.025-4.996 3.913m4.996 11.91-4.996-3.912m-1.142 9.145-1.143-6.288m10.71-6.768h-7.262",
    stroke: "#4486FE",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), React$1.createElement("circle", {
    cx: 8.571,
    cy: 8.571,
    r: 8.571,
    transform: "translate(22.857 142)",
    fill: "#FFCD6B",
    fillRule: "nonzero"
  }), React$1.createElement("g", {
    transform: "translate(132.857 124)"
  }, React$1.createElement("mask", {
    id: "error-block-image-default-e",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-default-d"
  })), React$1.createElement("use", {
    fill: "#FBBE47",
    fillRule: "nonzero",
    xlinkHref: "#error-block-image-default-d"
  }), React$1.createElement("circle", {
    fill: "#FFCD6B",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 13.886,
    cy: 15.12,
    r: 18.823
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 23.4,
    cy: 29.057,
    r: 1
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 30.343,
    cy: 29.829,
    r: 1
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 18.771,
    cy: 32.657,
    r: 1.286
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 29.571,
    cy: 25.971,
    r: 1.286
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 19.286,
    cy: 7.971,
    r: 1.286
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 26.486,
    cy: 5.914,
    r: 1.286
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 11.057,
    cy: 6.943,
    r: 1
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 30.086,
    cy: 15.686,
    r: 1.286
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    fillRule: "nonzero",
    mask: "url(#error-block-image-default-e)",
    cx: 22.886,
    cy: 14.657,
    r: 1
  })), React$1.createElement("path", {
    d: "m87.429 135.123 6.591-9.378v-.08h-5.99v-2.559h10.038v1.787l-6.44 9.254v.082h6.56v2.557h-10.76v-1.663Zm12.185-5.889 4.948-7.047v-.056h-4.498v-1.917h7.536v1.34l-4.849 6.942v.059h4.923v1.92h-8.06v-1.24Zm10.345.702 3.708-5.274v-.045h-3.372v-1.437h5.648v1.003l-3.628 5.206v.045H116v1.438h-6.041v-.936Z",
    fill: "#FFF",
    fillRule: "nonzero"
  })));
  const disconnectedImage = React$1.createElement("svg", {
    viewBox: "0 0 400 400",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, React$1.createElement("title", null, "@反馈/异常/网络服务异常"), React$1.createElement("defs", null, React$1.createElement("linearGradient", {
    x1: "50%",
    y1: "-116.862%",
    x2: "50%",
    y2: "90.764%",
    id: "error-block-image-disconnected-c"
  }, React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.207,
    offset: "0%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.115,
    offset: "80.072%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0,
    offset: "100%"
  })), React$1.createElement("circle", {
    id: "error-block-image-disconnected-d",
    cx: 22.309,
    cy: 22.309,
    r: 22.309
  }), React$1.createElement("path", {
    id: "error-block-image-disconnected-a",
    d: "M0 0h400v400H0z"
  })), React$1.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("mask", {
    id: "error-block-image-disconnected-b",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-disconnected-a"
  })), React$1.createElement("g", {
    mask: "url(#error-block-image-disconnected-b)",
    fill: "url(#error-block-image-disconnected-c)"
  }, React$1.createElement("path", {
    d: "M151.686 45.58c38.869-.623 77.391 34.03 103.046 70.573 17.416-21.644 34.253-32.465 50.51-32.465 26.666 0 56.701 28.548 90.105 85.643 3.539 6.05-7.164 14.87-32.107 26.462l-82.643 2.741c-14.686 11.745-62.45 1.252-138.305 2.467-55.58.89-91.518-2.468-107.816-10.074-23.505-3.07-33.154-7.983-28.946-14.74C59.313 89.813 108.03 46.278 151.686 45.58Zm186.195 99.06-.127.003-.126.01a2.32 2.32 0 0 0-.465.103l-.032.01-.031.01a2.364 2.364 0 0 0-.181.071 2.52 2.52 0 0 0-.116.054l-.133.067-.042.024-.036.02a2.946 2.946 0 0 0-.133.08l-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024a4.906 4.906 0 0 0-.31.27l-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.108.008v7.608c0 .779.502 1.41 1.121 1.41.62 0 1.121-.632 1.121-1.41v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-200-10-.127.003-.126.01a2.32 2.32 0 0 0-.368.073l-.049.014-.048.016-.032.01-.031.01a2.364 2.364 0 0 0-.181.071l-.058.026-.058.028-.133.067-.042.024-.036.02-.066.039-.067.041-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024l-.156.13-.154.14-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.054.004.054.004v7.608c0 .779.502 1.41 1.121 1.41.58 0 1.058-.556 1.115-1.266l.006-.144v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-28.029-12.373-.107.002-.106.006a2.978 2.978 0 0 0-.551.095 3.444 3.444 0 0 0-.323.104 3.962 3.962 0 0 0-.61.297c-.076.045-.15.092-.226.141-4.964 3.312-8.728 18.445-8.728 23.77 0 5.434 3.922 9.935 9.04 10.726l.28.04v9.236c0 .886.532 1.614 1.21 1.692l.121.007.122-.007c.638-.074 1.147-.723 1.204-1.538l.006-.155v-9.235c5.254-.668 9.32-5.234 9.32-10.767 0-5.993-4.77-24.414-10.652-24.414Z"
  })), React$1.createElement("g", {
    mask: "url(#error-block-image-disconnected-b)"
  }, React$1.createElement("g", {
    transform: "translate(85.858 150.644)"
  }, React$1.createElement("path", {
    d: "M116.26 28.467c1.352 0 2.703.018 4.054.054 3.923.385 10.188 4.248 9.267 11.061-.878 6.496-5.836 9.089-8.962 9.529a130.762 130.762 0 0 0-4.36-.072c-28.567 0-60.654 10.149-96.22 30.676l-2.227 1.297c-.744.437-1.49.878-2.236 1.323-4.878 2.911-11.193 1.316-14.103-3.562C-1.438 73.894.157 67.58 5.035 64.67 45.34 40.62 82.4 28.467 116.26 28.467Zm22 11.63c1.03-5.942 6.376-8.618 11.084-8.08C172.14 36.91 194.83 46.86 217.37 61.794c4.735 3.138 6.03 9.52 2.893 14.255-3.138 4.736-9.52 6.031-14.256 2.893-20.111-13.325-40.075-22.165-59.935-26.584a9.974 9.974 0 0 0-.325-.088c-3.987-1.015-8.602-5.738-7.487-12.175ZM116.26 77.418c22.777 0 45.4 7.057 67.73 20.988 4.82 3.007 6.289 9.351 3.282 14.17-3.007 4.82-9.351 6.29-14.17 3.283-19.194-11.974-38.095-17.87-56.842-17.87s-37.648 5.896-56.842 17.87c-4.82 3.007-11.164 1.537-14.17-3.282-3.007-4.82-1.538-11.164 3.282-14.171 22.33-13.931 44.953-20.988 67.73-20.988ZM117.974 124.67c9.85 0 17.303 1.69 25.687 5.082l.82.337 2.9 1.231 3.008 1.252.77.305.107.04c5.326 1.976 8.042 7.895 6.066 13.221-1.976 5.326-7.895 8.042-13.221 6.067l-.713-.27-.726-.285-.763-.31-1.263-.527-2.944-1.26-1.125-.473c-6.393-2.648-11.433-3.838-18.603-3.838-8.223 0-16.532 2.126-25.028 6.475-5.056 2.588-11.254.587-13.842-4.47-2.589-5.056-.588-11.253 4.47-13.842 11.313-5.791 22.814-8.735 34.4-8.735ZM118.235 197.047c7.15 0 13.77-.897 19.841-2.721 5.44-1.635 8.526-7.37 6.892-12.81-1.635-5.44-7.37-8.526-12.81-6.892-4.072 1.224-8.707 1.851-13.923 1.851-4.36 0-8.79-1.045-13.373-3.21l-.626-.301c-5.095-2.512-11.262-.418-13.773 4.678-2.512 5.095-.418 11.261 4.678 13.773 7.559 3.727 15.288 5.632 23.094 5.632Z",
    fill: "#377EFF",
    fillRule: "nonzero"
  }), React$1.createElement("path", {
    d: "M198.35 62.413c2.755-4.967 9.016-6.76 13.984-4.004 13.068 7.25 19.124 18.535 17.615 30.952-1.157 9.515-6.83 18.757-14.096 24.352-13.364 10.29-34.915 9.401-49.363-1.91-4.472-3.502-5.26-9.967-1.758-14.44 3.436-4.388 9.724-5.229 14.185-1.952l.255.194c7.283 5.702 18.475 6.164 24.13 1.809 3.072-2.366 5.766-6.754 6.226-10.536.467-3.844-1.21-7.07-6.796-10.267l-.378-.213c-4.967-2.756-6.76-9.017-4.004-13.985ZM61.35 103.092c-2.84-4.92-9.13-6.607-14.05-3.768-20.662 11.922-21.772 35.751-6.018 51.69 13.752 13.914 33.192 13.447 50.507 1.158 4.633-3.288 5.723-9.708 2.436-14.34-3.288-4.633-9.709-5.724-14.341-2.436-9.763 6.928-18.07 7.128-23.97 1.158-6.761-6.84-6.498-14.501 1.35-19.225l.317-.187c4.92-2.84 6.608-9.13 3.769-14.05ZM129.103 135.702c1.688-5.424 7.454-8.453 12.878-6.764 14.776 4.599 23.437 13.727 25.259 25.58 1.316 8.561-1.228 17.533-5.58 24.052-3.132 4.688-7.388 8.287-12.504 11.112-3.03 1.673-5.75 2.811-9.37 4.066l-1.4.477c-5.387 1.806-11.217-1.097-13.022-6.484-1.805-5.386 1.098-11.216 6.484-13.02l1.09-.374c6.032-2.112 9.602-4.19 11.613-7.201 1.693-2.535 2.818-6.502 2.356-9.503-.564-3.673-3.432-6.696-11.04-9.063-5.424-1.689-8.452-7.454-6.764-12.878Z",
    fill: "#377EFF",
    fillRule: "nonzero"
  }), React$1.createElement("path", {
    d: "M148.072 181.58c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.236-9.096-10.275-9.707",
    stroke: "#FFF",
    strokeWidth: 0.571,
    strokeLinecap: "round"
  }), React$1.createElement("ellipse", {
    fill: "#7EACFF",
    transform: "rotate(10 147 41.933)",
    cx: 147,
    cy: 41.933,
    rx: 9.143,
    ry: 10.286
  }), React$1.createElement("path", {
    d: "M210.422 107.472c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.668-9.883-11.572-12.067M51.604 131.769c-3.15-6.8-3.537-12.694-1.161-17.685 2.376-4.99 5.57-8.136 9.583-9.438",
    stroke: "#003CFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React$1.createElement("path", {
    d: "M21.53 64.408c4.946-3.389 9.817-6.026 14.612-7.912",
    stroke: "#FFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React$1.createElement("path", {
    d: "m113.243 15.444 9.588 8.314M144.31 9.405l-5.775 11.3m18.389-1.246-11.907 4.643M127.64 5.66l2.77 14.255",
    stroke: "#4486FE",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), React$1.createElement("g", {
    mask: "url(#error-block-image-disconnected-b)"
  }, React$1.createElement("g", {
    transform: "translate(275.143 302.571)"
  }, React$1.createElement("mask", {
    id: "error-block-image-disconnected-e",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-disconnected-d"
  })), React$1.createElement("use", {
    fill: "#FBBE47",
    fillRule: "nonzero",
    xlinkHref: "#error-block-image-disconnected-d"
  }), React$1.createElement("circle", {
    fill: "#FFCD6B",
    fillRule: "nonzero",
    mask: "url(#error-block-image-disconnected-e)",
    cx: 16.457,
    cy: 17.92,
    r: 22.309
  }), React$1.createElement("circle", {
    fill: "#FFF",
    fillRule: "nonzero",
    mask: "url(#error-block-image-disconnected-e)",
    cx: 14.263,
    cy: 12.069,
    r: 2.194
  }))), React$1.createElement("g", {
    mask: "url(#error-block-image-disconnected-b)",
    fill: "#FBBE47",
    fillRule: "nonzero"
  }, React$1.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 12,
    transform: "translate(84 297.714)"
  }))));
  const emptyImage = React$1.createElement("svg", {
    viewBox: "0 0 400 400",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
    x1: "50%",
    y1: "-116.862%",
    x2: "50%",
    y2: "90.764%",
    id: "error-block-image-empty-a"
  }, React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.207,
    offset: "0%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.115,
    offset: "80.072%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0,
    offset: "100%"
  })), React$1.createElement("path", {
    d: "M146.183 18.461c31.705 23.336 33.349 71.85 4.93 96.614-.252.22 6.172 5.602 13.577 11.414l.686.537.69.54.695.54.348.27.698.54a341.27 341.27 0 0 0 8.806 6.596c1.114.802 4.643-.853 10.587-4.965l-.532 12.218a1.2 1.2 0 0 1-.481.91l-10.868 8.111c-1.405 1.048-3.32 1.185-4.854.072l-35.578-25.834c-33.414 17.333-79.913 15-109.804-7-33.444-24.616-33.444-75.95 0-100.563 33.443-24.615 87.657-24.615 121.1 0Zm-60.469 7.653C51.63 26.114 24 44.534 24 67.257S51.63 108.4 85.714 108.4s61.715-18.42 61.715-41.143c0-22.722-27.63-41.143-61.715-41.143Z",
    id: "error-block-image-empty-b"
  })), React$1.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("path", {
    d: "M157.964 244.661H0L3.806 100.13a4.572 4.572 0 0 1 4.353-4.446l.217-.006h45.588V68.2a4.572 4.572 0 0 1 4.356-4.567l.216-.005h65.498l2.554-58.689a4.571 4.571 0 0 1 4.779-4.367l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.212 3.146 69.652L301.634 64.9a4.571 4.571 0 0 1 5.628 4.231l.005.215v43.955l56.162.001v130.264h-56.163v.001h-82.383v-.004h-66.919v1.098ZM89.503 160.03h-9.968v8.436h9.968v-8.436Zm0-14.507h-9.968v8.435h9.968v-8.435Zm197.985-5.15h-9.967v8.432h9.967v-8.431Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.436h9.967v-8.436Zm-84.643-3.29h-30.8v8.436h30.8v-8.436Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
    transform: "translate(18.286 50.286)",
    fill: "url(#error-block-image-empty-a)"
  }), React$1.createElement("g", {
    transform: "translate(108.571 189.886)"
  }, React$1.createElement("mask", {
    id: "error-block-image-empty-c",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-empty-b"
  })), React$1.createElement("use", {
    fill: "#377EFF",
    xlinkHref: "#error-block-image-empty-b"
  }), React$1.createElement("path", {
    d: "M131.429 134.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM128 133.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM120 128.971a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.142.125.006a1.143 1.143 0 1 1-.125-.006Zm11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-22.857 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm17.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM136 125.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-13.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm18.857-2.286a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-37.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm13.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm18.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-28 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm17.715-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-4.571a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.428 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.143 1.142a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-9.143 0a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm30.286-3.429a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM124 109.543a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.858-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-11.428-3.429a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM124 99.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM49.143 55.829a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-9.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM52 52.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-19.429-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-1.142a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-13.143 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM64 44.4a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.125.007a1.143 1.143 0 1 1-.125-.007Zm11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.858 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM30.286 44.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM44 43.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM72 38.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-28 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm5.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM56 37.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM60.57 32.97a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM44 34.114a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm30.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-15.429 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.857-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-11.429-3.428a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM41.714 20.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Z",
    fill: "#003CFF",
    fillRule: "nonzero",
    mask: "url(#error-block-image-empty-c)"
  })), React$1.createElement("path", {
    d: "M295.213 319.24c.744.546.745 1.433.002 1.98l-11.806 8.81c-1.069.799-3.326.474-4.853-.609l-35.622-25.241c-33.375 17.037-79.545 14.615-109.28-7.271-33.443-24.615-33.443-64.521 0-89.133 33.443-24.616 87.657-24.616 121.1 0 31.706 23.336 33.35 60.42 4.931 85.185-.543.473 35.528 26.278 35.528 26.278ZM148.06 220.015c-25.44 17.853-25.44 46.8 0 64.652 25.44 17.85 66.689 17.85 92.129 0 25.436-17.853 25.436-46.799 0-64.652-25.44-17.853-66.688-17.853-92.129 0Z",
    fill: "#5D96FE"
  }), React$1.createElement("path", {
    d: "M123.514 233.021c2.185-5.241 5.67-9.735 10.453-13.482M264.967 271.54c-2.185 5.24-5.67 9.734-10.453 13.481",
    stroke: "#FFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React$1.createElement("path", {
    d: "M81.143 252.571c7.574 0 13.714 23.88 13.714 31.649 0 6.97-4.942 12.755-11.429 13.871v11.672c0 1.235-.767 2.237-1.713 2.237-.904 0-1.644-.912-1.71-2.07l-.005-.167v-11.526c-7.04-.595-12.571-6.644-12.571-14.017 0-7.024 5.02-27.222 11.581-31.027l.096-.053c.027-.016.055-.03.082-.045l.067-.035.066-.033.1-.05.094-.041a3.34 3.34 0 0 1 .224-.093l.11-.042.097-.032c.038-.013.077-.025.115-.036l.053-.016.053-.014a3.351 3.351 0 0 1 .23-.055l.085-.016a3.95 3.95 0 0 1 .441-.054l.11-.005.11-.002Z",
    fill: "#FFCD6B",
    fillRule: "nonzero"
  }), React$1.createElement("g", {
    transform: "translate(283.429 177.143)",
    fillRule: "nonzero"
  }, React$1.createElement("path", {
    d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.49 0-2.707-1.46-2.79-3.301l-.004-.2-.001-19.018C8.659 71.92.13 62.518.13 51.123.13 40.071 8.154 8.49 18.694 2.015l.054-.031a5.94 5.94 0 0 1 .214-.128l.088-.048c.213-.12.427-.228.642-.326l.135-.06.18-.075.135-.053a5.796 5.796 0 0 1 .464-.16 4.44 4.44 0 0 1 .33-.092l.124-.03a7.122 7.122 0 0 1 .31-.065l.018-.003a6.305 6.305 0 0 1 .756-.088l.165-.007.166-.002Z",
    fill: "#FFCD6B"
  }), React$1.createElement("path", {
    d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.543 0-2.794-1.566-2.794-3.5V73.295C8.659 71.921.13 62.518.13 51.123.13 38.783 10.134.847 22.475.847Z",
    fill: "#FFCD6B"
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 26.4,
    cy: 56.869,
    r: 1.45
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 39.453,
    cy: 58.319,
    r: 1
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 17.698,
    cy: 63.637,
    r: 2.417
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 38.002,
    cy: 51.068,
    r: 2.417
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 18.665,
    cy: 17.228,
    r: 2.417
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 32.201,
    cy: 13.36,
    r: 2.417
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 26.83,
    cy: 20.666,
    r: 1.45
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 38.969,
    cy: 31.731,
    r: 2.417
  }), React$1.createElement("circle", {
    fill: "#FFB400",
    cx: 25.433,
    cy: 29.797,
    r: 1.45
  }), React$1.createElement("path", {
    d: "M34.197 53.033c0 9.825-6.934 18.017-16.172 19.987a22.44 22.44 0 0 0 4.45.448c12.34 0 22.344-10.004 22.344-22.345C44.82 38.783 34.815.847 22.475.847c8.947 14.03 11.722 40.891 11.722 52.186Z",
    fill: "#FBBE47"
  }))));
  const busyImage = React$1.createElement("svg", {
    viewBox: "0 0 400 400",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
    x1: "50%",
    y1: "-116.862%",
    x2: "50%",
    y2: "90.764%",
    id: "error-block-image-busy-a"
  }, React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.207,
    offset: "0%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0.115,
    offset: "80.072%"
  }), React$1.createElement("stop", {
    stopColor: "#72A7FD",
    stopOpacity: 0,
    offset: "100%"
  })), React$1.createElement("circle", {
    id: "error-block-image-busy-b",
    cx: 34.857,
    cy: 34.857,
    r: 34.857
  })), React$1.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("path", {
    d: "M157.964 243.667H0L3.806 99.134a4.572 4.572 0 0 1 4.353-4.446l.217-.005h45.588V67.205a4.572 4.572 0 0 1 4.356-4.566l.216-.005 65.498-.001 2.554-58.688a4.571 4.571 0 0 1 4.779-4.368l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.213 3.146 69.652 74.976-17.906a4.571 4.571 0 0 1 5.628 4.23l.005.216v43.955h56.162v130.265l-56.163-.001v.002h-82.383v-.004h-66.919v1.098Zm-68.461-84.631h-9.968v8.435h9.968v-8.435Zm0-14.508h-9.968v8.436h9.968v-8.436Zm197.985-5.149h-9.967v8.432h9.967v-8.432Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.435h9.967v-8.435Zm-84.643-3.29h-30.8v8.435h30.8v-8.435Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
    transform: "translate(18.286 51.286)",
    fill: "url(#error-block-image-busy-a)"
  }), React$1.createElement("path", {
    d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l.958-.01c-.376 7.363 3.679 59.93 34.894 62.659 4.203.367 7.432.39 7.475 4.609.042 4.218-3.176 4.307-7.37 4.76-34.593 3.737-34.136 56.004-33.61 63.357l-.957.01c-5.276.053-9.51 4.373-9.455 9.649.053 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.054 9.508-4.374 9.455-9.648-.055-5.276-4.374-9.51-9.65-9.455l-.958.01c.377-7.363-.729-59.672-34.894-62.66-4.202-.367-7.432-.39-7.474-4.608-.043-4.219 3.175-4.308 7.369-4.76 31.276-3.377 34.136-56.004 33.61-63.357l.958-.01c5.276-.053 9.508-4.373 9.455-9.649-.055-5.276-4.374-9.509-9.65-9.454Z",
    fill: "#377EFF"
  }), React$1.createElement("path", {
    d: "M233.524 314.422c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.894-5.644c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.149 17.865c.108.684.773 1.147 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm-2.144-8.182c.109.684.773 1.148 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-1.586-4.694c.108.684.772 1.148 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.013-5.88c.109.685.773 1.148 1.484 1.036.71-.113 1.2-.759 1.09-1.443-.107-.684-.772-1.148-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm.236 15.575c.108.685.772 1.148 1.483 1.035.71-.112 1.2-.758 1.09-1.442-.107-.685-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.442Zm-.4 4.494c.108.684.772 1.147 1.483 1.035.71-.113 1.2-.759 1.091-1.443-.108-.684-.773-1.148-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-3.88-8.601c.108.684.772 1.147 1.483 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-.524-7.186c.065.41.463.688.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-2.265-4.102c.109.684.773 1.148 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.147-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm-.545-6.518c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm2.098 23.629c.109.684.773 1.147 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.443Zm-.756-9.65c.043.274.309.46.593.414a.512.512 0 0 0 .437-.577.512.512 0 0 0-.594-.414.512.512 0 0 0-.436.577Zm-.808 20.96c.109.684.773 1.147 1.484 1.034.71-.112 1.2-.758 1.09-1.442-.108-.685-.772-1.148-1.483-1.036-.71.113-1.199.759-1.09 1.443Zm-4.691-31.966c.065.41.463.689.89.621.426-.068.72-.455.654-.866-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm2.098 23.628c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.967-12.416c.109.684.773 1.147 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm1.073 6.772c.108.685.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.036-.711.113-1.2.759-1.091 1.443Zm-.009-3.131c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.43-9.03c.065.41.463.688.89.62.426-.067.72-.454.655-.865-.065-.41-.464-.689-.89-.62-.427.067-.72.454-.655.865ZM214.5 333.38c.108.685.772 1.148 1.483 1.036.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.711.112-1.2.758-1.091 1.442Zm-.156-7.178c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm-1.871-4.72c.108.684.773 1.147 1.483 1.034.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.035-.71.112-1.2.758-1.091 1.442Zm-1.614-6.857c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-.894-5.644c.065.41.464.689.89.621.427-.067.72-.455.655-.866-.065-.41-.463-.688-.89-.62-.427.067-.72.455-.655.865Zm-1.43-9.03c.065.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.958 14.225c.065.41.463.689.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-.703 12.81c.065.41.464.688.89.62.427-.067.72-.455.655-.865-.065-.41-.463-.689-.89-.621-.427.067-.72.455-.655.866Zm-4.543-22.536c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm2.806 30.138c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm-5.694-17.996c.065.41.463.688.89.62.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.866Zm-2.935-13.343c.066.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.463-.689-.89-.621-.426.068-.72.455-.655.866Z",
    fill: "#003CFF",
    fillRule: "nonzero"
  }), React$1.createElement("path", {
    d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l101.963-1.04c5.276-.052 9.508-4.372 9.455-9.648-.055-5.276-4.374-9.509-9.65-9.454ZM252.64 331.241l-101.964 1.038c-5.275.054-9.508 4.374-9.454 9.65.054 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.053 9.507-4.373 9.454-9.649-.054-5.275-4.374-9.508-9.649-9.454Z",
    fill: "#7EACFF"
  }), React$1.createElement("path", {
    stroke: "#003CFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m196.824 197.298 52.216-.506M193.329 330.5h52.215"
  }), React$1.createElement("path", {
    d: "M167.367 228.041c-4.091-10.787-6.086-20.934-5.985-30.44",
    stroke: "#FFF",
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React$1.createElement("circle", {
    cx: 14.857,
    cy: 14.857,
    r: 14.857,
    transform: "translate(106.857 248.571)",
    fill: "#FFCD6B",
    fillRule: "nonzero"
  }), React$1.createElement("g", {
    transform: "translate(236.571 284.571)"
  }, React$1.createElement("mask", {
    id: "error-block-image-busy-c",
    fill: "#fff"
  }, React$1.createElement("use", {
    xlinkHref: "#error-block-image-busy-b"
  })), React$1.createElement("use", {
    fill: "#FBBE47",
    fillRule: "nonzero",
    xlinkHref: "#error-block-image-busy-b"
  }), React$1.createElement("circle", {
    fill: "#FFCD6B",
    fillRule: "nonzero",
    mask: "url(#error-block-image-busy-c)",
    cx: 25.714,
    cy: 28,
    r: 34.857
  }), React$1.createElement("circle", {
    fill: "#FFF",
    fillRule: "nonzero",
    mask: "url(#error-block-image-busy-c)",
    cx: 22.286,
    cy: 18.857,
    r: 3.429
  }))));
  const imageRecord = {
    "default": defaultImage,
    "disconnected": disconnectedImage,
    "empty": emptyImage,
    "busy": busyImage
  };
  const ErrorBlock = createErrorBlock(imageRecord);
  const classPrefix$Q = `adm-floating-bubble`;
  const defaultProps$E = {
    axis: "y",
    defaultOffset: {
      x: 0,
      y: 0
    }
  };
  const FloatingBubble = (p) => {
    const props = mergeProps(defaultProps$E, p);
    const boundaryRef = React$1.useRef(null);
    const buttonRef = React$1.useRef(null);
    const [innerValue, setInnerValue] = React$1.useState(props.offset === void 0 ? props.defaultOffset : props.offset);
    React$1.useEffect(() => {
      if (props.offset === void 0)
        return;
      api.start({
        x: props.offset.x,
        y: props.offset.y
      });
    }, [props.offset]);
    const [{
      x,
      y,
      opacity
    }, api] = useSpring(() => ({
      x: innerValue.x,
      y: innerValue.y,
      opacity: 1
    }));
    const bind = useDrag((state) => {
      var _a;
      let nextX = state.offset[0];
      let nextY = state.offset[1];
      if (state.last && props.magnetic) {
        const boundary = boundaryRef.current;
        const button = buttonRef.current;
        if (!boundary || !button)
          return;
        const boundaryRect = boundary.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        if (props.magnetic === "x") {
          const compensation = x.goal - x.get();
          const leftDistance = buttonRect.left + compensation - boundaryRect.left;
          const rightDistance = boundaryRect.right - (buttonRect.right + compensation);
          if (rightDistance <= leftDistance) {
            nextX += rightDistance;
          } else {
            nextX -= leftDistance;
          }
        } else if (props.magnetic === "y") {
          const compensation = y.goal - y.get();
          const topDistance = buttonRect.top + compensation - boundaryRect.top;
          const bottomDistance = boundaryRect.bottom - (buttonRect.bottom + compensation);
          if (bottomDistance <= topDistance) {
            nextY += bottomDistance;
          } else {
            nextY -= topDistance;
          }
        }
      }
      const nextOffest = {
        x: nextX,
        y: nextY
      };
      if (props.offset === void 0) {
        api.start(nextOffest);
      } else {
        setInnerValue(nextOffest);
      }
      (_a = props.onOffsetChange) === null || _a === void 0 ? void 0 : _a.call(props, nextOffest);
      api.start({
        opacity: state.active ? 0.8 : 1
      });
    }, {
      axis: props.axis === "xy" ? void 0 : props.axis,
      pointer: {
        touch: true
      },
      // the component won't trigger drag logic if the user just clicked on the component.
      filterTaps: true,
      // set constraints to the user gesture
      bounds: boundaryRef,
      from: () => [x.get(), y.get()]
    });
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$Q
    }, React$1.createElement("div", {
      className: `${classPrefix$Q}-boundary-outer`
    }, React$1.createElement("div", {
      className: `${classPrefix$Q}-boundary`,
      ref: boundaryRef
    })), React$1.createElement(animated.div, Object.assign({}, bind(), {
      style: {
        opacity,
        transform: to([x, y], (x2, y2) => `translate(${x2}px, ${y2}px)`)
      },
      onClick: props.onClick,
      className: `${classPrefix$Q}-button`,
      ref: buttonRef
    }), props.children)));
  };
  function nearest(arr, target) {
    return arr.reduce((pre, cur) => {
      return Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur;
    });
  }
  const classPrefix$P = "adm-floating-panel";
  const defaultProps$D = {
    handleDraggingOfContent: true
  };
  const FloatingPanel = React$1.forwardRef((p, ref) => {
    var _a, _b;
    const props = mergeProps(defaultProps$D, p);
    const {
      anchors
    } = props;
    const maxHeight = (_a = anchors[anchors.length - 1]) !== null && _a !== void 0 ? _a : window.innerHeight;
    const possibles = anchors.map((x) => -x);
    const elementRef = React$1.useRef(null);
    const headerRef = React$1.useRef(null);
    const contentRef = React$1.useRef(null);
    const [pulling, setPulling] = React$1.useState(false);
    const pullingRef = React$1.useRef(false);
    const bounds = {
      top: possibles[possibles.length - 1],
      bottom: possibles[0]
    };
    const onHeightChange = useMemoizedFn((_b = props.onHeightChange) !== null && _b !== void 0 ? _b : () => {
    });
    const [{
      y
    }, api] = useSpring(() => ({
      y: bounds.bottom,
      config: {
        tension: 300
      },
      onChange: (result) => {
        onHeightChange(-result.value.y, y.isAnimating);
      }
    }));
    useDrag((state) => {
      const [, offsetY] = state.offset;
      if (state.first) {
        const target = state.event.target;
        const header = headerRef.current;
        if (header === target || (header === null || header === void 0 ? void 0 : header.contains(target))) {
          pullingRef.current = true;
        } else {
          if (!props.handleDraggingOfContent)
            return;
          const reachedTop = y.goal <= bounds.top;
          const content = contentRef.current;
          if (!content)
            return;
          if (reachedTop) {
            if (content.scrollTop <= 0 && state.direction[1] > 0) {
              pullingRef.current = true;
            }
          } else {
            pullingRef.current = true;
          }
        }
      }
      setPulling(pullingRef.current);
      if (!pullingRef.current)
        return;
      const {
        event
      } = state;
      if (event.cancelable && supportsPassive) {
        event.preventDefault();
      }
      event.stopPropagation();
      let nextY = offsetY;
      if (state.last) {
        pullingRef.current = false;
        setPulling(false);
        nextY = nearest(possibles, offsetY);
      }
      api.start({
        y: nextY
      });
    }, {
      axis: "y",
      bounds,
      rubberband: true,
      from: () => [0, y.get()],
      pointer: {
        touch: true
      },
      target: elementRef,
      eventOptions: supportsPassive ? {
        passive: false
      } : void 0
    });
    React$1.useImperativeHandle(ref, () => ({
      setHeight: (height, options) => {
        api.start({
          y: -height,
          immediate: options === null || options === void 0 ? void 0 : options.immediate
        });
      }
    }), [api]);
    useLockScroll(elementRef, true);
    return withNativeProps(props, React$1.createElement(animated.div, {
      ref: elementRef,
      className: classPrefix$P,
      style: {
        height: Math.round(maxHeight),
        translateY: y.to((y2) => `calc(100% + (${Math.round(y2)}px))`)
      }
    }, React$1.createElement("div", {
      className: `${classPrefix$P}-mask`,
      style: {
        display: pulling ? "block" : "none"
      }
    }), React$1.createElement("div", {
      className: `${classPrefix$P}-header`,
      ref: headerRef
    }, React$1.createElement("div", {
      className: `${classPrefix$P}-bar`
    })), React$1.createElement("div", {
      className: `${classPrefix$P}-content`,
      ref: contentRef
    }, props.children)));
  });
  function _extends$1() {
    _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$1.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key = sourceSymbolKeys[i2];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _typeof$1(o) {
    "@babel/helpers - typeof";
    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof$1(o);
  }
  function _toPrimitive(input, hint) {
    if (_typeof$1(input) !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof$1(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof$1(key) === "symbol" ? key : String(key);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(e2, r) {
    var t = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e2);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e2) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e2, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e2;
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
      arr2[i2] = arr[i2];
    return arr2;
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n2 = Object.prototype.toString.call(o).slice(8, -1);
    if (n2 === "Object" && o.constructor)
      n2 = o.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o, minLen);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf$1(o, p);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf$1(subClass, superClass);
  }
  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf$1(o);
  }
  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e2) {
      return false;
    }
  }
  function _possibleConstructorReturn(self2, call2) {
    if (call2 && (_typeof$1(call2) === "object" || typeof call2 === "function")) {
      return call2;
    } else if (call2 !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf$1(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$1(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function toArray$2(children) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var ret = [];
    React$1.Children.forEach(children, function(child) {
      if ((child === void 0 || child === null) && !option.keepEmpty) {
        return;
      }
      if (Array.isArray(child)) {
        ret = ret.concat(toArray$2(child));
      } else if (reactIsExports.isFragment(child) && child.props) {
        ret = ret.concat(toArray$2(child.props.children, option));
      } else {
        ret.push(child);
      }
    });
    return ret;
  }
  var warned$1 = {};
  var preWarningFns$1 = [];
  var preMessage$1 = function preMessage2(fn) {
    preWarningFns$1.push(fn);
  };
  function warning$3(valid, message) {
    if (!valid && console !== void 0) {
      var finalMessage = preWarningFns$1.reduce(function(msg, preMessageFn) {
        return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
      }, message);
      if (finalMessage) {
        console.error("Warning: ".concat(finalMessage));
      }
    }
  }
  function note$1(valid, message) {
    if (!valid && console !== void 0) {
      var finalMessage = preWarningFns$1.reduce(function(msg, preMessageFn) {
        return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
      }, message);
      if (finalMessage) {
        console.warn("Note: ".concat(finalMessage));
      }
    }
  }
  function resetWarned$1() {
    warned$1 = {};
  }
  function call$1(method, valid, message) {
    if (!valid && !warned$1[message]) {
      method(false, message);
      warned$1[message] = true;
    }
  }
  function warningOnce$1(valid, message) {
    call$1(warning$3, valid, message);
  }
  function noteOnce$1(valid, message) {
    call$1(note$1, valid, message);
  }
  warningOnce$1.preMessage = preMessage$1;
  warningOnce$1.resetWarned = resetWarned$1;
  warningOnce$1.noteOnce = noteOnce$1;
  var HOOK_MARK$1 = "RC_FORM_INTERNAL_HOOKS";
  var warningFunc$1 = function warningFunc2() {
    warningOnce$1(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
  };
  var Context$1 = /* @__PURE__ */ React__namespace.createContext({
    getFieldValue: warningFunc$1,
    getFieldsValue: warningFunc$1,
    getFieldError: warningFunc$1,
    getFieldWarning: warningFunc$1,
    getFieldsError: warningFunc$1,
    isFieldsTouched: warningFunc$1,
    isFieldTouched: warningFunc$1,
    isFieldValidating: warningFunc$1,
    isFieldsValidating: warningFunc$1,
    resetFields: warningFunc$1,
    setFields: warningFunc$1,
    setFieldValue: warningFunc$1,
    setFieldsValue: warningFunc$1,
    validateFields: warningFunc$1,
    submit: warningFunc$1,
    getInternalHooks: function getInternalHooks() {
      warningFunc$1();
      return {
        dispatch: warningFunc$1,
        initEntityValue: warningFunc$1,
        registerField: warningFunc$1,
        useSubscribe: warningFunc$1,
        setInitialValues: warningFunc$1,
        destroyForm: warningFunc$1,
        setCallbacks: warningFunc$1,
        registerWatch: warningFunc$1,
        getFields: warningFunc$1,
        setValidateMessages: warningFunc$1,
        setPreserve: warningFunc$1,
        getInitialValue: warningFunc$1
      };
    }
  });
  function toArray$1(value) {
    if (value === void 0 || value === null) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function _regeneratorRuntime2() {
      return e2;
    };
    var t, e2 = {}, r = Object.prototype, n2 = r.hasOwnProperty, o = Object.defineProperty || function(t2, e3, r2) {
      t2[e3] = r2.value;
    }, i2 = "function" == typeof Symbol ? Symbol : {}, a = i2.iterator || "@@iterator", c = i2.asyncIterator || "@@asyncIterator", u = i2.toStringTag || "@@toStringTag";
    function define2(t2, e3, r2) {
      return Object.defineProperty(t2, e3, {
        value: r2,
        enumerable: true,
        configurable: true,
        writable: true
      }), t2[e3];
    }
    try {
      define2({}, "");
    } catch (t2) {
      define2 = function define3(t3, e3, r2) {
        return t3[e3] = r2;
      };
    }
    function wrap(t2, e3, r2, n3) {
      var i3 = e3 && e3.prototype instanceof Generator ? e3 : Generator, a2 = Object.create(i3.prototype), c6 = new Context2(n3 || []);
      return o(a2, "_invoke", {
        value: makeInvokeMethod(t2, r2, c6)
      }), a2;
    }
    function tryCatch(t2, e3, r2) {
      try {
        return {
          type: "normal",
          arg: t2.call(e3, r2)
        };
      } catch (t3) {
        return {
          type: "throw",
          arg: t3
        };
      }
    }
    e2.wrap = wrap;
    var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var p = {};
    define2(p, a, function() {
      return this;
    });
    var d = Object.getPrototypeOf, v = d && d(d(values([])));
    v && v !== r && n2.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t2) {
      ["next", "throw", "return"].forEach(function(e3) {
        define2(t2, e3, function(t3) {
          return this._invoke(e3, t3);
        });
      });
    }
    function AsyncIterator(t2, e3) {
      function invoke(r3, o2, i3, a2) {
        var c6 = tryCatch(t2[r3], t2, o2);
        if ("throw" !== c6.type) {
          var u2 = c6.arg, h2 = u2.value;
          return h2 && "object" == _typeof$1(h2) && n2.call(h2, "__await") ? e3.resolve(h2.__await).then(function(t3) {
            invoke("next", t3, i3, a2);
          }, function(t3) {
            invoke("throw", t3, i3, a2);
          }) : e3.resolve(h2).then(function(t3) {
            u2.value = t3, i3(u2);
          }, function(t3) {
            return invoke("throw", t3, i3, a2);
          });
        }
        a2(c6.arg);
      }
      var r2;
      o(this, "_invoke", {
        value: function value(t3, n3) {
          function callInvokeWithMethodAndArg() {
            return new e3(function(e4, r3) {
              invoke(t3, n3, e4, r3);
            });
          }
          return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e3, r2, n3) {
      var o2 = h;
      return function(i3, a2) {
        if (o2 === f)
          throw new Error("Generator is already running");
        if (o2 === s) {
          if ("throw" === i3)
            throw a2;
          return {
            value: t,
            done: true
          };
        }
        for (n3.method = i3, n3.arg = a2; ; ) {
          var c6 = n3.delegate;
          if (c6) {
            var u2 = maybeInvokeDelegate(c6, n3);
            if (u2) {
              if (u2 === y)
                continue;
              return u2;
            }
          }
          if ("next" === n3.method)
            n3.sent = n3._sent = n3.arg;
          else if ("throw" === n3.method) {
            if (o2 === h)
              throw o2 = s, n3.arg;
            n3.dispatchException(n3.arg);
          } else
            "return" === n3.method && n3.abrupt("return", n3.arg);
          o2 = f;
          var p2 = tryCatch(e3, r2, n3);
          if ("normal" === p2.type) {
            if (o2 = n3.done ? s : l, p2.arg === y)
              continue;
            return {
              value: p2.arg,
              done: n3.done
            };
          }
          "throw" === p2.type && (o2 = s, n3.method = "throw", n3.arg = p2.arg);
        }
      };
    }
    function maybeInvokeDelegate(e3, r2) {
      var n3 = r2.method, o2 = e3.iterator[n3];
      if (o2 === t)
        return r2.delegate = null, "throw" === n3 && e3.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e3, r2), "throw" === r2.method) || "return" !== n3 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n3 + "' method")), y;
      var i3 = tryCatch(o2, e3.iterator, r2.arg);
      if ("throw" === i3.type)
        return r2.method = "throw", r2.arg = i3.arg, r2.delegate = null, y;
      var a2 = i3.arg;
      return a2 ? a2.done ? (r2[e3.resultName] = a2.value, r2.next = e3.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
    }
    function pushTryEntry(t2) {
      var e3 = {
        tryLoc: t2[0]
      };
      1 in t2 && (e3.catchLoc = t2[1]), 2 in t2 && (e3.finallyLoc = t2[2], e3.afterLoc = t2[3]), this.tryEntries.push(e3);
    }
    function resetTryEntry(t2) {
      var e3 = t2.completion || {};
      e3.type = "normal", delete e3.arg, t2.completion = e3;
    }
    function Context2(t2) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t2.forEach(pushTryEntry, this), this.reset(true);
    }
    function values(e3) {
      if (e3 || "" === e3) {
        var r2 = e3[a];
        if (r2)
          return r2.call(e3);
        if ("function" == typeof e3.next)
          return e3;
        if (!isNaN(e3.length)) {
          var o2 = -1, i3 = function next() {
            for (; ++o2 < e3.length; )
              if (n2.call(e3, o2))
                return next.value = e3[o2], next.done = false, next;
            return next.value = t, next.done = true, next;
          };
          return i3.next = i3;
        }
      }
      throw new TypeError(_typeof$1(e3) + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: true
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: true
    }), GeneratorFunction.displayName = define2(GeneratorFunctionPrototype, u, "GeneratorFunction"), e2.isGeneratorFunction = function(t2) {
      var e3 = "function" == typeof t2 && t2.constructor;
      return !!e3 && (e3 === GeneratorFunction || "GeneratorFunction" === (e3.displayName || e3.name));
    }, e2.mark = function(t2) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define2(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
    }, e2.awrap = function(t2) {
      return {
        __await: t2
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define2(AsyncIterator.prototype, c, function() {
      return this;
    }), e2.AsyncIterator = AsyncIterator, e2.async = function(t2, r2, n3, o2, i3) {
      void 0 === i3 && (i3 = Promise);
      var a2 = new AsyncIterator(wrap(t2, r2, n3, o2), i3);
      return e2.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
        return t3.done ? t3.value : a2.next();
      });
    }, defineIteratorMethods(g), define2(g, u, "Generator"), define2(g, a, function() {
      return this;
    }), define2(g, "toString", function() {
      return "[object Generator]";
    }), e2.keys = function(t2) {
      var e3 = Object(t2), r2 = [];
      for (var n3 in e3)
        r2.push(n3);
      return r2.reverse(), function next() {
        for (; r2.length; ) {
          var t3 = r2.pop();
          if (t3 in e3)
            return next.value = t3, next.done = false, next;
        }
        return next.done = true, next;
      };
    }, e2.values = values, Context2.prototype = {
      constructor: Context2,
      reset: function reset(e3) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e3)
          for (var r2 in this)
            "t" === r2.charAt(0) && n2.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
      },
      stop: function stop2() {
        this.done = true;
        var t2 = this.tryEntries[0].completion;
        if ("throw" === t2.type)
          throw t2.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e3) {
        if (this.done)
          throw e3;
        var r2 = this;
        function handle(n3, o3) {
          return a2.type = "throw", a2.arg = e3, r2.next = n3, o3 && (r2.method = "next", r2.arg = t), !!o3;
        }
        for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
          var i3 = this.tryEntries[o2], a2 = i3.completion;
          if ("root" === i3.tryLoc)
            return handle("end");
          if (i3.tryLoc <= this.prev) {
            var c6 = n2.call(i3, "catchLoc"), u2 = n2.call(i3, "finallyLoc");
            if (c6 && u2) {
              if (this.prev < i3.catchLoc)
                return handle(i3.catchLoc, true);
              if (this.prev < i3.finallyLoc)
                return handle(i3.finallyLoc);
            } else if (c6) {
              if (this.prev < i3.catchLoc)
                return handle(i3.catchLoc, true);
            } else {
              if (!u2)
                throw new Error("try statement without catch or finally");
              if (this.prev < i3.finallyLoc)
                return handle(i3.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t2, e3) {
        for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
          var o2 = this.tryEntries[r2];
          if (o2.tryLoc <= this.prev && n2.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
            var i3 = o2;
            break;
          }
        }
        i3 && ("break" === t2 || "continue" === t2) && i3.tryLoc <= e3 && e3 <= i3.finallyLoc && (i3 = null);
        var a2 = i3 ? i3.completion : {};
        return a2.type = t2, a2.arg = e3, i3 ? (this.method = "next", this.next = i3.finallyLoc, y) : this.complete(a2);
      },
      complete: function complete(t2, e3) {
        if ("throw" === t2.type)
          throw t2.arg;
        return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e3 && (this.next = e3), y;
      },
      finish: function finish(t2) {
        for (var e3 = this.tryEntries.length - 1; e3 >= 0; --e3) {
          var r2 = this.tryEntries[e3];
          if (r2.finallyLoc === t2)
            return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
        }
      },
      "catch": function _catch(t2) {
        for (var e3 = this.tryEntries.length - 1; e3 >= 0; --e3) {
          var r2 = this.tryEntries[e3];
          if (r2.tryLoc === t2) {
            var n3 = r2.completion;
            if ("throw" === n3.type) {
              var o2 = n3.arg;
              resetTryEntry(r2);
            }
            return o2;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(e3, r2, n3) {
        return this.delegate = {
          iterator: values(e3),
          resultName: r2,
          nextLoc: n3
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e2;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e2) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper2);
      }
      function Wrapper2() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper2.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper2,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper2, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning$2 = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning$2 = function warning3(type4, errors) {
      if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
        if (errors.every(function(e2) {
          return typeof e2 === "string";
        })) {
          console.warn(type4, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format(template) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var i2 = 0;
    var len = args.length;
    if (typeof template === "function") {
      return template.apply(null, args);
    }
    if (typeof template === "string") {
      var str = template.replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i2 >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i2++]);
          case "%d":
            return Number(args[i2++]);
          case "%j":
            try {
              return JSON.stringify(args[i2++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      return str;
    }
    return template;
  }
  function isNativeStringType(type4) {
    return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
  }
  function isEmptyValue(value, type4) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type4 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type4) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors || []);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func(a, count);
    });
  }
  function asyncSerialArray(arr, func, callback) {
    var index2 = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index2;
      index2 = index2 + 1;
      if (original < arrLength) {
        func(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k] || []);
    });
    return ret;
  }
  var AsyncValidationError = /* @__PURE__ */ function(_Error) {
    _inheritsLoose(AsyncValidationError2, _Error);
    function AsyncValidationError2(errors, fields) {
      var _this;
      _this = _Error.call(this, "Async Validation Error") || this;
      _this.errors = errors;
      _this.fields = fields;
      return _this;
    }
    return AsyncValidationError2;
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  function asyncMap(objArr, option, func, callback, source) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func, next);
      });
      _pending["catch"](function(e2) {
        return e2;
      });
      return _pending;
    }
    var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve(source);
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    });
    pending["catch"](function(e2) {
      return e2;
    });
    return pending;
  }
  function isErrorObj(obj) {
    return !!(obj && obj.message !== void 0);
  }
  function getValue$1(value, path) {
    var v = value;
    for (var i2 = 0; i2 < path.length; i2++) {
      if (v == void 0) {
        return v;
      }
      v = v[path[i2]];
    }
    return v;
  }
  function complementError(rule, source) {
    return function(oe) {
      var fieldValue;
      if (rule.fullFields) {
        fieldValue = getValue$1(source, rule.fullFields);
      } else {
        fieldValue = source[oe.field || rule.fullField];
      }
      if (isErrorObj(oe)) {
        oe.field = oe.field || rule.fullField;
        oe.fieldValue = fieldValue;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        fieldValue,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  var required$1 = function required(rule, value, source, errors, options, type4) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  };
  var whitespace = function whitespace2(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  };
  var urlReg;
  var getUrlRegex = function() {
    if (urlReg) {
      return urlReg;
    }
    var word = "[a-fA-F\\d:]";
    var b = function b2(options) {
      return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
    };
    var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
    var v6seg = "[a-fA-F\\d]{1,4}";
    var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
    var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
    var v4exact = new RegExp("^" + v4 + "$");
    var v6exact = new RegExp("^" + v6 + "$");
    var ip = function ip2(options) {
      return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
    };
    ip.v4 = function(options) {
      return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
    };
    ip.v6 = function(options) {
      return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
    };
    var protocol = "(?:(?:[a-z]+:)?//)";
    var auth = "(?:\\S+(?::\\S*)?@)?";
    var ipv4 = ip.v4().source;
    var ipv6 = ip.v6().source;
    var host2 = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
    var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
    var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
    var port = "(?::\\d{2,5})?";
    var path = '(?:[/?#][^\\s"]*)?';
    var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host2 + domain + tld + ")" + port + path;
    urlReg = new RegExp("(?:^" + regex + "$)", "i");
    return urlReg;
  };
  var pattern$2 = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    // url: new RegExp(
    //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    //   'i',
    // ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array(value) {
      return Array.isArray(value);
    },
    regexp: function regexp(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e2) {
        return false;
      }
    },
    date: function date(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
    },
    number: function number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    object: function object(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method(value) {
      return typeof value === "function";
    },
    email: function email(value) {
      return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
    },
    url: function url(value) {
      return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern$2.hex);
    }
  };
  var type$1 = function type(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required$1(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  };
  var range = function range2(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min2 = typeof rule.min === "number";
    var max2 = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min2 && !max2 && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max2 && !min2 && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min2 && max2 && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  };
  var ENUM$1 = "enum";
  var enumerable$1 = function enumerable(rule, value, source, errors, options) {
    rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
    if (rule[ENUM$1].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
    }
  };
  var pattern$1 = function pattern(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  };
  var rules = {
    required: required$1,
    whitespace,
    type: type$1,
    range,
    "enum": enumerable$1,
    pattern: pattern$1
  };
  var string = function string2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  };
  var method2 = function method3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var number2 = function number3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var _boolean = function _boolean2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var regexp2 = function regexp3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var integer2 = function integer3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var floatFn = function floatFn2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var array2 = function array3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if ((value === void 0 || value === null) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (value !== void 0 && value !== null) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var object2 = function object3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var ENUM = "enum";
  var enumerable2 = function enumerable3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM](rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var pattern2 = function pattern3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var date2 = function date3(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "date") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "date")) {
        var dateObject;
        if (value instanceof Date) {
          dateObject = value;
        } else {
          dateObject = new Date(value);
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  };
  var required2 = function required3(rule, value, callback, source, options) {
    var errors = [];
    var type4 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type4);
    callback(errors);
  };
  var type2 = function type3(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var any = function any2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  };
  var validators = {
    string,
    method: method2,
    number: number2,
    "boolean": _boolean,
    regexp: regexp2,
    integer: integer2,
    "float": floatFn,
    array: array2,
    object: object2,
    "enum": enumerable2,
    pattern: pattern2,
    date: date2,
    url: type2,
    hex: type2,
    email: type2,
    required: required2,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  var Schema = /* @__PURE__ */ function() {
    function Schema2(descriptor) {
      this.rules = null;
      this._messages = messages;
      this.define(descriptor);
    }
    var _proto = Schema2.prototype;
    _proto.define = function define2(rules2) {
      var _this = this;
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      Object.keys(rules2).forEach(function(name) {
        var item = rules2[name];
        _this.rules[name] = Array.isArray(item) ? item : [item];
      });
    };
    _proto.messages = function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    };
    _proto.validate = function validate(source_, o, oc) {
      var _this2 = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback(null, source);
        }
        return Promise.resolve(source);
      }
      function complete(results) {
        var errors = [];
        var fields = {};
        function add(e2) {
          if (Array.isArray(e2)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e2);
          } else {
            errors.push(e2);
          }
        }
        for (var i2 = 0; i2 < results.length; i2++) {
          add(results[i2]);
        }
        if (!errors.length) {
          callback(null, source);
        } else {
          fields = convertFieldsError(errors);
          callback(errors, fields);
        }
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var series = {};
      var keys2 = options.keys || Object.keys(this.rules);
      keys2.forEach(function(z) {
        var arr = _this2.rules[z];
        var value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this2.getValidationMethod(rule);
          if (!rule.validator) {
            return;
          }
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this2.getType(rule);
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullField(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key,
            fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
          });
        }
        function cb(e2) {
          if (e2 === void 0) {
            e2 = [];
          }
          var errorList = Array.isArray(e2) ? e2 : [e2];
          if (!options.suppressWarning && errorList.length) {
            Schema2.warning("async-validator:", errorList);
          }
          if (errorList.length && rule.message !== void 0) {
            errorList = [].concat(rule.message);
          }
          var filledErrors = errorList.map(complementError(rule, source));
          if (options.first && filledErrors.length) {
            errorFields[rule.field] = 1;
            return doIt(filledErrors);
          }
          if (!deep) {
            doIt(filledErrors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message !== void 0) {
                filledErrors = [].concat(rule.message).map(complementError(rule, source));
              } else if (options.error) {
                filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
              }
              return doIt(filledErrors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              Object.keys(data.value).map(function(key) {
                fieldsSchema[key] = rule.defaultField;
              });
            }
            fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
            var paredFieldsSchema = {};
            Object.keys(fieldsSchema).forEach(function(field) {
              var fieldSchema = fieldsSchema[field];
              var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
              paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
            });
            var schema = new Schema2(paredFieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (filledErrors && filledErrors.length) {
                finalErrors.push.apply(finalErrors, filledErrors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          try {
            res = rule.validator(rule, data.value, cb, data.source, options);
          } catch (error) {
            console.error == null ? void 0 : console.error(error);
            if (!options.suppressValidatorError) {
              setTimeout(function() {
                throw error;
              }, 0);
            }
            cb(error.message);
          }
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e2) {
            return cb(e2);
          });
        }
      }, function(results) {
        complete(results);
      }, source);
    };
    _proto.getType = function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    };
    _proto.getValidationMethod = function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys2 = Object.keys(rule);
      var messageIndex = keys2.indexOf("message");
      if (messageIndex !== -1) {
        keys2.splice(messageIndex, 1);
      }
      if (keys2.length === 1 && keys2[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || void 0;
    };
    return Schema2;
  }();
  Schema.register = function register(type4, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type4] = validator;
  };
  Schema.warning = warning$2;
  Schema.messages = messages;
  Schema.validators = validators;
  var typeTemplate = "'${name}' is not a valid ${type}";
  var defaultValidateMessages = {
    default: "Validation error on field '${name}'",
    required: "'${name}' is required",
    enum: "'${name}' must be one of [${enum}]",
    whitespace: "'${name}' cannot be empty",
    date: {
      format: "'${name}' is invalid for format date",
      parse: "'${name}' could not be parsed as date",
      invalid: "'${name}' is invalid date"
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate
    },
    string: {
      len: "'${name}' must be exactly ${len} characters",
      min: "'${name}' must be at least ${min} characters",
      max: "'${name}' cannot be longer than ${max} characters",
      range: "'${name}' must be between ${min} and ${max} characters"
    },
    number: {
      len: "'${name}' must equal ${len}",
      min: "'${name}' cannot be less than ${min}",
      max: "'${name}' cannot be greater than ${max}",
      range: "'${name}' must be between ${min} and ${max}"
    },
    array: {
      len: "'${name}' must be exactly ${len} in length",
      min: "'${name}' cannot be less than ${min} in length",
      max: "'${name}' cannot be greater than ${max} in length",
      range: "'${name}' must be between ${min} and ${max} in length"
    },
    pattern: {
      mismatch: "'${name}' does not match pattern ${pattern}"
    }
  };
  function get(entity, path) {
    var current = entity;
    for (var i2 = 0; i2 < path.length; i2 += 1) {
      if (current === null || current === void 0) {
        return void 0;
      }
      current = current[path[i2]];
    }
    return current;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function internalSet(entity, paths, value, removeIfUndefined) {
    if (!paths.length) {
      return value;
    }
    var _paths = _toArray(paths), path = _paths[0], restPath = _paths.slice(1);
    var clone;
    if (!entity && typeof path === "number") {
      clone = [];
    } else if (Array.isArray(entity)) {
      clone = _toConsumableArray(entity);
    } else {
      clone = _objectSpread2({}, entity);
    }
    if (removeIfUndefined && value === void 0 && restPath.length === 1) {
      delete clone[path][restPath[0]];
    } else {
      clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
    }
    return clone;
  }
  function set(entity, paths, value) {
    var removeIfUndefined = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (paths.length && removeIfUndefined && value === void 0 && !get(entity, paths.slice(0, -1))) {
      return entity;
    }
    return internalSet(entity, paths, value, removeIfUndefined);
  }
  function cloneDeep(val) {
    if (Array.isArray(val)) {
      return cloneArrayDeep(val);
    } else if (_typeof$1(val) === "object" && val !== null) {
      return cloneObjectDeep(val);
    }
    return val;
  }
  function cloneObjectDeep(val) {
    if (Object.getPrototypeOf(val) === Object.prototype) {
      var res = {};
      for (var key in val) {
        res[key] = cloneDeep(val[key]);
      }
      return res;
    }
    return val;
  }
  function cloneArrayDeep(val) {
    return val.map(function(item) {
      return cloneDeep(item);
    });
  }
  function getNamePath(path) {
    return toArray$1(path);
  }
  function getValue(store, namePath) {
    var value = get(store, namePath);
    return value;
  }
  function setValue(store, namePath, value) {
    var removeIfUndefined = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    var newStore = set(store, namePath, value, removeIfUndefined);
    return newStore;
  }
  function cloneByNamePathList(store, namePathList) {
    var newStore = {};
    namePathList.forEach(function(namePath) {
      var value = getValue(store, namePath);
      newStore = setValue(newStore, namePath, value);
    });
    return newStore;
  }
  function containsNamePath(namePathList, namePath) {
    return namePathList && namePathList.some(function(path) {
      return matchNamePath(path, namePath);
    });
  }
  function isObject$4(obj) {
    return _typeof$1(obj) === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
  }
  function internalSetValues(store, values) {
    var newStore = Array.isArray(store) ? _toConsumableArray(store) : _objectSpread2({}, store);
    if (!values) {
      return newStore;
    }
    Object.keys(values).forEach(function(key) {
      var prevValue = newStore[key];
      var value = values[key];
      var recursive = isObject$4(prevValue) && isObject$4(value);
      newStore[key] = recursive ? internalSetValues(prevValue, value || {}) : cloneDeep(value);
    });
    return newStore;
  }
  function setValues(store) {
    for (var _len = arguments.length, restValues = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      restValues[_key - 1] = arguments[_key];
    }
    return restValues.reduce(function(current, newStore) {
      return internalSetValues(current, newStore);
    }, store);
  }
  function matchNamePath(namePath, changedNamePath) {
    if (!namePath || !changedNamePath || namePath.length !== changedNamePath.length) {
      return false;
    }
    return namePath.every(function(nameUnit, i2) {
      return changedNamePath[i2] === nameUnit;
    });
  }
  function isSimilar(source, target) {
    if (source === target) {
      return true;
    }
    if (!source && target || source && !target) {
      return false;
    }
    if (!source || !target || _typeof$1(source) !== "object" || _typeof$1(target) !== "object") {
      return false;
    }
    var sourceKeys = Object.keys(source);
    var targetKeys = Object.keys(target);
    var keys2 = new Set([].concat(sourceKeys, targetKeys));
    return _toConsumableArray(keys2).every(function(key) {
      var sourceValue = source[key];
      var targetValue = target[key];
      if (typeof sourceValue === "function" && typeof targetValue === "function") {
        return true;
      }
      return sourceValue === targetValue;
    });
  }
  function defaultGetValueFromEvent(valuePropName) {
    var event = arguments.length <= 1 ? void 0 : arguments[1];
    if (event && event.target && _typeof$1(event.target) === "object" && valuePropName in event.target) {
      return event.target[valuePropName];
    }
    return event;
  }
  function move(array, moveIndex, toIndex) {
    var length = array.length;
    if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
      return array;
    }
    var item = array[moveIndex];
    var diff = moveIndex - toIndex;
    if (diff > 0) {
      return [].concat(_toConsumableArray(array.slice(0, toIndex)), [item], _toConsumableArray(array.slice(toIndex, moveIndex)), _toConsumableArray(array.slice(moveIndex + 1, length)));
    }
    if (diff < 0) {
      return [].concat(_toConsumableArray(array.slice(0, moveIndex)), _toConsumableArray(array.slice(moveIndex + 1, toIndex + 1)), [item], _toConsumableArray(array.slice(toIndex + 1, length)));
    }
    return array;
  }
  var AsyncValidator = Schema;
  function replaceMessage(template, kv) {
    return template.replace(/\$\{\w+\}/g, function(str) {
      var key = str.slice(2, -1);
      return kv[key];
    });
  }
  var CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
  function validateRule(_x, _x2, _x3, _x4, _x5) {
    return _validateRule.apply(this, arguments);
  }
  function _validateRule() {
    _validateRule = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(name, value, rule, options, messageVariables) {
      var cloneRule, originValidator, subRuleField, validator, messages2, result, subResults, kv, fillVariableResult;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1)
          switch (_context2.prev = _context2.next) {
            case 0:
              cloneRule = _objectSpread2({}, rule);
              delete cloneRule.ruleIndex;
              if (cloneRule.validator) {
                originValidator = cloneRule.validator;
                cloneRule.validator = function() {
                  try {
                    return originValidator.apply(void 0, arguments);
                  } catch (error) {
                    console.error(error);
                    return Promise.reject(CODE_LOGIC_ERROR);
                  }
                };
              }
              subRuleField = null;
              if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
                subRuleField = cloneRule.defaultField;
                delete cloneRule.defaultField;
              }
              validator = new AsyncValidator(_defineProperty({}, name, [cloneRule]));
              messages2 = setValues({}, defaultValidateMessages, options.validateMessages);
              validator.messages(messages2);
              result = [];
              _context2.prev = 9;
              _context2.next = 12;
              return Promise.resolve(validator.validate(_defineProperty({}, name, value), _objectSpread2({}, options)));
            case 12:
              _context2.next = 17;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](9);
              if (_context2.t0.errors) {
                result = _context2.t0.errors.map(function(_ref4, index2) {
                  var message = _ref4.message;
                  var mergedMessage = message === CODE_LOGIC_ERROR ? messages2.default : message;
                  return /* @__PURE__ */ React__namespace.isValidElement(mergedMessage) ? (
                    // Wrap ReactNode with `key`
                    React__namespace.cloneElement(mergedMessage, {
                      key: "error_".concat(index2)
                    })
                  ) : mergedMessage;
                });
              }
            case 17:
              if (!(!result.length && subRuleField)) {
                _context2.next = 22;
                break;
              }
              _context2.next = 20;
              return Promise.all(value.map(function(subValue, i2) {
                return validateRule("".concat(name, ".").concat(i2), subValue, subRuleField, options, messageVariables);
              }));
            case 20:
              subResults = _context2.sent;
              return _context2.abrupt("return", subResults.reduce(function(prev, errors) {
                return [].concat(_toConsumableArray(prev), _toConsumableArray(errors));
              }, []));
            case 22:
              kv = _objectSpread2(_objectSpread2({}, rule), {}, {
                name,
                enum: (rule.enum || []).join(", ")
              }, messageVariables);
              fillVariableResult = result.map(function(error) {
                if (typeof error === "string") {
                  return replaceMessage(error, kv);
                }
                return error;
              });
              return _context2.abrupt("return", fillVariableResult);
            case 25:
            case "end":
              return _context2.stop();
          }
      }, _callee2, null, [[9, 14]]);
    }));
    return _validateRule.apply(this, arguments);
  }
  function validateRules(namePath, value, rules2, options, validateFirst, messageVariables) {
    var name = namePath.join(".");
    var filledRules = rules2.map(function(currentRule, ruleIndex) {
      var originValidatorFunc = currentRule.validator;
      var cloneRule = _objectSpread2(_objectSpread2({}, currentRule), {}, {
        ruleIndex
      });
      if (originValidatorFunc) {
        cloneRule.validator = function(rule, val, callback) {
          var hasPromise = false;
          var wrappedCallback = function wrappedCallback2() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            Promise.resolve().then(function() {
              warningOnce$1(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
              if (!hasPromise) {
                callback.apply(void 0, args);
              }
            });
          };
          var promise = originValidatorFunc(rule, val, wrappedCallback);
          hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
          warningOnce$1(hasPromise, "`callback` is deprecated. Please return a promise instead.");
          if (hasPromise) {
            promise.then(function() {
              callback();
            }).catch(function(err) {
              callback(err || " ");
            });
          }
        };
      }
      return cloneRule;
    }).sort(function(_ref, _ref2) {
      var w1 = _ref.warningOnly, i1 = _ref.ruleIndex;
      var w2 = _ref2.warningOnly, i2 = _ref2.ruleIndex;
      if (!!w1 === !!w2) {
        return i1 - i2;
      }
      if (w1) {
        return 1;
      }
      return -1;
    });
    var summaryPromise;
    if (validateFirst === true) {
      summaryPromise = new Promise(/* @__PURE__ */ function() {
        var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(resolve, reject) {
          var i2, rule, errors;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch (_context.prev = _context.next) {
                case 0:
                  i2 = 0;
                case 1:
                  if (!(i2 < filledRules.length)) {
                    _context.next = 12;
                    break;
                  }
                  rule = filledRules[i2];
                  _context.next = 5;
                  return validateRule(name, value, rule, options, messageVariables);
                case 5:
                  errors = _context.sent;
                  if (!errors.length) {
                    _context.next = 9;
                    break;
                  }
                  reject([{
                    errors,
                    rule
                  }]);
                  return _context.abrupt("return");
                case 9:
                  i2 += 1;
                  _context.next = 1;
                  break;
                case 12:
                  resolve([]);
                case 13:
                case "end":
                  return _context.stop();
              }
          }, _callee);
        }));
        return function(_x6, _x7) {
          return _ref3.apply(this, arguments);
        };
      }());
    } else {
      var rulePromises = filledRules.map(function(rule) {
        return validateRule(name, value, rule, options, messageVariables).then(function(errors) {
          return {
            errors,
            rule
          };
        });
      });
      summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then(function(errors) {
        return Promise.reject(errors);
      });
    }
    summaryPromise.catch(function(e2) {
      return e2;
    });
    return summaryPromise;
  }
  function finishOnAllFailed(_x8) {
    return _finishOnAllFailed.apply(this, arguments);
  }
  function _finishOnAllFailed() {
    _finishOnAllFailed = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(rulePromises) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1)
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", Promise.all(rulePromises).then(function(errorsList) {
                var _ref5;
                var errors = (_ref5 = []).concat.apply(_ref5, _toConsumableArray(errorsList));
                return errors;
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
      }, _callee3);
    }));
    return _finishOnAllFailed.apply(this, arguments);
  }
  function finishOnFirstFailed(_x9) {
    return _finishOnFirstFailed.apply(this, arguments);
  }
  function _finishOnFirstFailed() {
    _finishOnFirstFailed = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(rulePromises) {
      var count;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1)
          switch (_context4.prev = _context4.next) {
            case 0:
              count = 0;
              return _context4.abrupt("return", new Promise(function(resolve) {
                rulePromises.forEach(function(promise) {
                  promise.then(function(ruleError) {
                    if (ruleError.errors.length) {
                      resolve([ruleError]);
                    }
                    count += 1;
                    if (count === rulePromises.length) {
                      resolve([]);
                    }
                  });
                });
              }));
            case 2:
            case "end":
              return _context4.stop();
          }
      }, _callee4);
    }));
    return _finishOnFirstFailed.apply(this, arguments);
  }
  var _excluded$2 = ["name"];
  var EMPTY_ERRORS = [];
  function requireUpdate(shouldUpdate, prev, next, prevValue, nextValue, info) {
    if (typeof shouldUpdate === "function") {
      return shouldUpdate(prev, next, "source" in info ? {
        source: info.source
      } : {});
    }
    return prevValue !== nextValue;
  }
  var Field = /* @__PURE__ */ function(_React$Component) {
    _inherits(Field2, _React$Component);
    var _super = _createSuper(Field2);
    function Field2(props) {
      var _this;
      _classCallCheck(this, Field2);
      _this = _super.call(this, props);
      _this.state = {
        resetCount: 0
      };
      _this.cancelRegisterFunc = null;
      _this.mounted = false;
      _this.touched = false;
      _this.dirty = false;
      _this.validatePromise = null;
      _this.prevValidating = void 0;
      _this.errors = EMPTY_ERRORS;
      _this.warnings = EMPTY_ERRORS;
      _this.cancelRegister = function() {
        var _this$props = _this.props, preserve = _this$props.preserve, isListField = _this$props.isListField, name = _this$props.name;
        if (_this.cancelRegisterFunc) {
          _this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
        }
        _this.cancelRegisterFunc = null;
      };
      _this.getNamePath = function() {
        var _this$props2 = _this.props, name = _this$props2.name, fieldContext = _this$props2.fieldContext;
        var _fieldContext$prefixN = fieldContext.prefixName, prefixName = _fieldContext$prefixN === void 0 ? [] : _fieldContext$prefixN;
        return name !== void 0 ? [].concat(_toConsumableArray(prefixName), _toConsumableArray(name)) : [];
      };
      _this.getRules = function() {
        var _this$props3 = _this.props, _this$props3$rules = _this$props3.rules, rules2 = _this$props3$rules === void 0 ? [] : _this$props3$rules, fieldContext = _this$props3.fieldContext;
        return rules2.map(function(rule) {
          if (typeof rule === "function") {
            return rule(fieldContext);
          }
          return rule;
        });
      };
      _this.refresh = function() {
        if (!_this.mounted)
          return;
        _this.setState(function(_ref) {
          var resetCount = _ref.resetCount;
          return {
            resetCount: resetCount + 1
          };
        });
      };
      _this.triggerMetaEvent = function(destroy) {
        var onMetaChange = _this.props.onMetaChange;
        onMetaChange === null || onMetaChange === void 0 ? void 0 : onMetaChange(_objectSpread2(_objectSpread2({}, _this.getMeta()), {}, {
          destroy
        }));
      };
      _this.onStoreChange = function(prevStore, namePathList, info) {
        var _this$props4 = _this.props, shouldUpdate = _this$props4.shouldUpdate, _this$props4$dependen = _this$props4.dependencies, dependencies = _this$props4$dependen === void 0 ? [] : _this$props4$dependen, onReset = _this$props4.onReset;
        var store = info.store;
        var namePath = _this.getNamePath();
        var prevValue = _this.getValue(prevStore);
        var curValue = _this.getValue(store);
        var namePathMatch = namePathList && containsNamePath(namePathList, namePath);
        if (info.type === "valueUpdate" && info.source === "external" && prevValue !== curValue) {
          _this.touched = true;
          _this.dirty = true;
          _this.validatePromise = null;
          _this.errors = EMPTY_ERRORS;
          _this.warnings = EMPTY_ERRORS;
          _this.triggerMetaEvent();
        }
        switch (info.type) {
          case "reset":
            if (!namePathList || namePathMatch) {
              _this.touched = false;
              _this.dirty = false;
              _this.validatePromise = null;
              _this.errors = EMPTY_ERRORS;
              _this.warnings = EMPTY_ERRORS;
              _this.triggerMetaEvent();
              onReset === null || onReset === void 0 ? void 0 : onReset();
              _this.refresh();
              return;
            }
            break;
          case "remove": {
            if (shouldUpdate) {
              _this.reRender();
              return;
            }
            break;
          }
          case "setField": {
            if (namePathMatch) {
              var data = info.data;
              if ("touched" in data) {
                _this.touched = data.touched;
              }
              if ("validating" in data && !("originRCField" in data)) {
                _this.validatePromise = data.validating ? Promise.resolve([]) : null;
              }
              if ("errors" in data) {
                _this.errors = data.errors || EMPTY_ERRORS;
              }
              if ("warnings" in data) {
                _this.warnings = data.warnings || EMPTY_ERRORS;
              }
              _this.dirty = true;
              _this.triggerMetaEvent();
              _this.reRender();
              return;
            }
            if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
              _this.reRender();
              return;
            }
            break;
          }
          case "dependenciesUpdate": {
            var dependencyList = dependencies.map(getNamePath);
            if (dependencyList.some(function(dependency) {
              return containsNamePath(info.relatedFields, dependency);
            })) {
              _this.reRender();
              return;
            }
            break;
          }
          default:
            if (namePathMatch || (!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
              _this.reRender();
              return;
            }
            break;
        }
        if (shouldUpdate === true) {
          _this.reRender();
        }
      };
      _this.validateRules = function(options) {
        var namePath = _this.getNamePath();
        var currentValue = _this.getValue();
        var rootPromise = Promise.resolve().then(function() {
          if (!_this.mounted) {
            return [];
          }
          var _this$props5 = _this.props, _this$props5$validate = _this$props5.validateFirst, validateFirst = _this$props5$validate === void 0 ? false : _this$props5$validate, messageVariables = _this$props5.messageVariables;
          var _ref2 = options || {}, triggerName = _ref2.triggerName;
          var filteredRules = _this.getRules();
          if (triggerName) {
            filteredRules = filteredRules.filter(function(rule) {
              return rule;
            }).filter(function(rule) {
              var validateTrigger = rule.validateTrigger;
              if (!validateTrigger) {
                return true;
              }
              var triggerList = toArray$1(validateTrigger);
              return triggerList.includes(triggerName);
            });
          }
          var promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);
          promise.catch(function(e2) {
            return e2;
          }).then(function() {
            var ruleErrors = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : EMPTY_ERRORS;
            if (_this.validatePromise === rootPromise) {
              var _ruleErrors$forEach;
              _this.validatePromise = null;
              var nextErrors = [];
              var nextWarnings = [];
              (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref3) {
                var warningOnly = _ref3.rule.warningOnly, _ref3$errors = _ref3.errors, errors = _ref3$errors === void 0 ? EMPTY_ERRORS : _ref3$errors;
                if (warningOnly) {
                  nextWarnings.push.apply(nextWarnings, _toConsumableArray(errors));
                } else {
                  nextErrors.push.apply(nextErrors, _toConsumableArray(errors));
                }
              });
              _this.errors = nextErrors;
              _this.warnings = nextWarnings;
              _this.triggerMetaEvent();
              _this.reRender();
            }
          });
          return promise;
        });
        _this.validatePromise = rootPromise;
        _this.dirty = true;
        _this.errors = EMPTY_ERRORS;
        _this.warnings = EMPTY_ERRORS;
        _this.triggerMetaEvent();
        _this.reRender();
        return rootPromise;
      };
      _this.isFieldValidating = function() {
        return !!_this.validatePromise;
      };
      _this.isFieldTouched = function() {
        return _this.touched;
      };
      _this.isFieldDirty = function() {
        if (_this.dirty || _this.props.initialValue !== void 0) {
          return true;
        }
        var fieldContext = _this.props.fieldContext;
        var _fieldContext$getInte = fieldContext.getInternalHooks(HOOK_MARK$1), getInitialValue = _fieldContext$getInte.getInitialValue;
        if (getInitialValue(_this.getNamePath()) !== void 0) {
          return true;
        }
        return false;
      };
      _this.getErrors = function() {
        return _this.errors;
      };
      _this.getWarnings = function() {
        return _this.warnings;
      };
      _this.isListField = function() {
        return _this.props.isListField;
      };
      _this.isList = function() {
        return _this.props.isList;
      };
      _this.isPreserve = function() {
        return _this.props.preserve;
      };
      _this.getMeta = function() {
        _this.prevValidating = _this.isFieldValidating();
        var meta = {
          touched: _this.isFieldTouched(),
          validating: _this.prevValidating,
          errors: _this.errors,
          warnings: _this.warnings,
          name: _this.getNamePath()
        };
        return meta;
      };
      _this.getOnlyChild = function(children) {
        if (typeof children === "function") {
          var meta = _this.getMeta();
          return _objectSpread2(_objectSpread2({}, _this.getOnlyChild(children(_this.getControlled(), meta, _this.props.fieldContext))), {}, {
            isFunction: true
          });
        }
        var childList = toArray$2(children);
        if (childList.length !== 1 || !/* @__PURE__ */ React__namespace.isValidElement(childList[0])) {
          return {
            child: childList,
            isFunction: false
          };
        }
        return {
          child: childList[0],
          isFunction: false
        };
      };
      _this.getValue = function(store) {
        var getFieldsValue = _this.props.fieldContext.getFieldsValue;
        var namePath = _this.getNamePath();
        return getValue(store || getFieldsValue(true), namePath);
      };
      _this.getControlled = function() {
        var childProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _this$props6 = _this.props, trigger = _this$props6.trigger, validateTrigger = _this$props6.validateTrigger, getValueFromEvent = _this$props6.getValueFromEvent, normalize2 = _this$props6.normalize, valuePropName = _this$props6.valuePropName, getValueProps = _this$props6.getValueProps, fieldContext = _this$props6.fieldContext;
        var mergedValidateTrigger = validateTrigger !== void 0 ? validateTrigger : fieldContext.validateTrigger;
        var namePath = _this.getNamePath();
        var getInternalHooks2 = fieldContext.getInternalHooks, getFieldsValue = fieldContext.getFieldsValue;
        var _getInternalHooks = getInternalHooks2(HOOK_MARK$1), dispatch = _getInternalHooks.dispatch;
        var value = _this.getValue();
        var mergedGetValueProps = getValueProps || function(val) {
          return _defineProperty({}, valuePropName, val);
        };
        var originTriggerFunc = childProps[trigger];
        var control = _objectSpread2(_objectSpread2({}, childProps), mergedGetValueProps(value));
        control[trigger] = function() {
          _this.touched = true;
          _this.dirty = true;
          _this.triggerMetaEvent();
          var newValue;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          if (getValueFromEvent) {
            newValue = getValueFromEvent.apply(void 0, args);
          } else {
            newValue = defaultGetValueFromEvent.apply(void 0, [valuePropName].concat(args));
          }
          if (normalize2) {
            newValue = normalize2(newValue, value, getFieldsValue(true));
          }
          dispatch({
            type: "updateValue",
            namePath,
            value: newValue
          });
          if (originTriggerFunc) {
            originTriggerFunc.apply(void 0, args);
          }
        };
        var validateTriggerList = toArray$1(mergedValidateTrigger || []);
        validateTriggerList.forEach(function(triggerName) {
          var originTrigger = control[triggerName];
          control[triggerName] = function() {
            if (originTrigger) {
              originTrigger.apply(void 0, arguments);
            }
            var rules2 = _this.props.rules;
            if (rules2 && rules2.length) {
              dispatch({
                type: "validateField",
                namePath,
                triggerName
              });
            }
          };
        });
        return control;
      };
      if (props.fieldContext) {
        var getInternalHooks = props.fieldContext.getInternalHooks;
        var _getInternalHooks2 = getInternalHooks(HOOK_MARK$1), initEntityValue = _getInternalHooks2.initEntityValue;
        initEntityValue(_assertThisInitialized(_this));
      }
      return _this;
    }
    _createClass(Field2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props7 = this.props, shouldUpdate = _this$props7.shouldUpdate, fieldContext = _this$props7.fieldContext;
        this.mounted = true;
        if (fieldContext) {
          var getInternalHooks = fieldContext.getInternalHooks;
          var _getInternalHooks3 = getInternalHooks(HOOK_MARK$1), registerField = _getInternalHooks3.registerField;
          this.cancelRegisterFunc = registerField(this);
        }
        if (shouldUpdate === true) {
          this.reRender();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.cancelRegister();
        this.triggerMetaEvent(true);
        this.mounted = false;
      }
    }, {
      key: "reRender",
      value: function reRender() {
        if (!this.mounted)
          return;
        this.forceUpdate();
      }
    }, {
      key: "render",
      value: function render2() {
        var resetCount = this.state.resetCount;
        var children = this.props.children;
        var _this$getOnlyChild = this.getOnlyChild(children), child = _this$getOnlyChild.child, isFunction2 = _this$getOnlyChild.isFunction;
        var returnChildNode;
        if (isFunction2) {
          returnChildNode = child;
        } else if (/* @__PURE__ */ React__namespace.isValidElement(child)) {
          returnChildNode = /* @__PURE__ */ React__namespace.cloneElement(child, this.getControlled(child.props));
        } else {
          warningOnce$1(!child, "`children` of Field is not validate ReactElement.");
          returnChildNode = child;
        }
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, {
          key: resetCount
        }, returnChildNode);
      }
    }]);
    return Field2;
  }(React__namespace.Component);
  Field.contextType = Context$1;
  Field.defaultProps = {
    trigger: "onChange",
    valuePropName: "value"
  };
  function WrapperField(_ref5) {
    var name = _ref5.name, restProps = _objectWithoutProperties(_ref5, _excluded$2);
    var fieldContext = React__namespace.useContext(Context$1);
    var namePath = name !== void 0 ? getNamePath(name) : void 0;
    var key = "keep";
    if (!restProps.isListField) {
      key = "_".concat((namePath || []).join("_"));
    }
    if (restProps.preserve === false && restProps.isListField && namePath.length <= 1) {
      warningOnce$1(false, "`preserve` should not apply on Form.List fields.");
    }
    return /* @__PURE__ */ React__namespace.createElement(Field, _extends$1({
      key,
      name: namePath
    }, restProps, {
      fieldContext
    }));
  }
  var ListContext = /* @__PURE__ */ React__namespace.createContext(null);
  var List = function List2(_ref) {
    var name = _ref.name, initialValue = _ref.initialValue, children = _ref.children, rules2 = _ref.rules, validateTrigger = _ref.validateTrigger;
    var context = React__namespace.useContext(Context$1);
    var keyRef = React__namespace.useRef({
      keys: [],
      id: 0
    });
    var keyManager = keyRef.current;
    var prefixName = React__namespace.useMemo(function() {
      var parentPrefixName = getNamePath(context.prefixName) || [];
      return [].concat(_toConsumableArray(parentPrefixName), _toConsumableArray(getNamePath(name)));
    }, [context.prefixName, name]);
    var fieldContext = React__namespace.useMemo(function() {
      return _objectSpread2(_objectSpread2({}, context), {}, {
        prefixName
      });
    }, [context, prefixName]);
    var listContext = React__namespace.useMemo(function() {
      return {
        getKey: function getKey(namePath) {
          var len = prefixName.length;
          var pathName = namePath[len];
          return [keyManager.keys[pathName], namePath.slice(len + 1)];
        }
      };
    }, [prefixName]);
    if (typeof children !== "function") {
      warningOnce$1(false, "Form.List only accepts function as children.");
      return null;
    }
    var shouldUpdate = function shouldUpdate2(prevValue, nextValue, _ref2) {
      var source = _ref2.source;
      if (source === "internal") {
        return false;
      }
      return prevValue !== nextValue;
    };
    return /* @__PURE__ */ React__namespace.createElement(ListContext.Provider, {
      value: listContext
    }, /* @__PURE__ */ React__namespace.createElement(Context$1.Provider, {
      value: fieldContext
    }, /* @__PURE__ */ React__namespace.createElement(WrapperField, {
      name: [],
      shouldUpdate,
      rules: rules2,
      validateTrigger,
      initialValue,
      isList: true
    }, function(_ref3, meta) {
      var _ref3$value = _ref3.value, value = _ref3$value === void 0 ? [] : _ref3$value, onChange = _ref3.onChange;
      var getFieldValue = context.getFieldValue;
      var getNewValue = function getNewValue2() {
        var values = getFieldValue(prefixName || []);
        return values || [];
      };
      var operations = {
        add: function add(defaultValue, index2) {
          var newValue = getNewValue();
          if (index2 >= 0 && index2 <= newValue.length) {
            keyManager.keys = [].concat(_toConsumableArray(keyManager.keys.slice(0, index2)), [keyManager.id], _toConsumableArray(keyManager.keys.slice(index2)));
            onChange([].concat(_toConsumableArray(newValue.slice(0, index2)), [defaultValue], _toConsumableArray(newValue.slice(index2))));
          } else {
            if (index2 < 0 || index2 > newValue.length) {
              warningOnce$1(false, "The second parameter of the add function should be a valid positive number.");
            }
            keyManager.keys = [].concat(_toConsumableArray(keyManager.keys), [keyManager.id]);
            onChange([].concat(_toConsumableArray(newValue), [defaultValue]));
          }
          keyManager.id += 1;
        },
        remove: function remove(index2) {
          var newValue = getNewValue();
          var indexSet = new Set(Array.isArray(index2) ? index2 : [index2]);
          if (indexSet.size <= 0) {
            return;
          }
          keyManager.keys = keyManager.keys.filter(function(_, keysIndex) {
            return !indexSet.has(keysIndex);
          });
          onChange(newValue.filter(function(_, valueIndex) {
            return !indexSet.has(valueIndex);
          }));
        },
        move: function move$1(from, to2) {
          if (from === to2) {
            return;
          }
          var newValue = getNewValue();
          if (from < 0 || from >= newValue.length || to2 < 0 || to2 >= newValue.length) {
            return;
          }
          keyManager.keys = move(keyManager.keys, from, to2);
          onChange(move(newValue, from, to2));
        }
      };
      var listValue = value || [];
      if (!Array.isArray(listValue)) {
        listValue = [];
        {
          warningOnce$1(false, "Current value of '".concat(prefixName.join(" > "), "' is not an array type."));
        }
      }
      return children(listValue.map(function(__, index2) {
        var key = keyManager.keys[index2];
        if (key === void 0) {
          keyManager.keys[index2] = keyManager.id;
          key = keyManager.keys[index2];
          keyManager.id += 1;
        }
        return {
          name: index2,
          key,
          isListField: true
        };
      }), operations, meta);
    })));
  };
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e2, n2, i2, u, a = [], f = true, o = false;
      try {
        if (i2 = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t)
            return;
          f = false;
        } else
          for (; !(f = (e2 = i2.call(t)).done) && (a.push(e2.value), a.length !== l); f = true)
            ;
      } catch (r2) {
        o = true, n2 = r2;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
            return;
        } finally {
          if (o)
            throw n2;
        }
      }
      return a;
    }
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function allPromiseFinish(promiseList) {
    var hasError = false;
    var count = promiseList.length;
    var results = [];
    if (!promiseList.length) {
      return Promise.resolve([]);
    }
    return new Promise(function(resolve, reject) {
      promiseList.forEach(function(promise, index2) {
        promise.catch(function(e2) {
          hasError = true;
          return e2;
        }).then(function(result) {
          count -= 1;
          results[index2] = result;
          if (count > 0) {
            return;
          }
          if (hasError) {
            reject(results);
          }
          resolve(results);
        });
      });
    });
  }
  var SPLIT = "__@field_split__";
  function normalize(namePath) {
    return namePath.map(function(cell) {
      return "".concat(_typeof$1(cell), ":").concat(cell);
    }).join(SPLIT);
  }
  var NameMap = /* @__PURE__ */ function() {
    function NameMap2() {
      _classCallCheck(this, NameMap2);
      this.kvs = /* @__PURE__ */ new Map();
    }
    _createClass(NameMap2, [{
      key: "set",
      value: function set2(key, value) {
        this.kvs.set(normalize(key), value);
      }
    }, {
      key: "get",
      value: function get2(key) {
        return this.kvs.get(normalize(key));
      }
    }, {
      key: "update",
      value: function update2(key, updater) {
        var origin = this.get(key);
        var next = updater(origin);
        if (!next) {
          this.delete(key);
        } else {
          this.set(key, next);
        }
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        this.kvs.delete(normalize(key));
      }
      // Since we only use this in test, let simply realize this
    }, {
      key: "map",
      value: function map(callback) {
        return _toConsumableArray(this.kvs.entries()).map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
          var cells = key.split(SPLIT);
          return callback({
            key: cells.map(function(cell) {
              var _cell$match = cell.match(/^([^:]*):(.*)$/), _cell$match2 = _slicedToArray(_cell$match, 3), type = _cell$match2[1], unit = _cell$match2[2];
              return type === "number" ? Number(unit) : unit;
            }),
            value
          });
        });
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var json = {};
        this.map(function(_ref3) {
          var key = _ref3.key, value = _ref3.value;
          json[key.join(".")] = value;
          return null;
        });
        return json;
      }
    }]);
    return NameMap2;
  }();
  var _excluded$1 = ["name", "errors"];
  var FormStore = /* @__PURE__ */ _createClass(function FormStore2(forceRootUpdate) {
    var _this = this;
    _classCallCheck(this, FormStore2);
    this.formHooked = false;
    this.forceRootUpdate = void 0;
    this.subscribable = true;
    this.store = {};
    this.fieldEntities = [];
    this.initialValues = {};
    this.callbacks = {};
    this.validateMessages = null;
    this.preserve = null;
    this.lastValidatePromise = null;
    this.getForm = function() {
      return {
        getFieldValue: _this.getFieldValue,
        getFieldsValue: _this.getFieldsValue,
        getFieldError: _this.getFieldError,
        getFieldWarning: _this.getFieldWarning,
        getFieldsError: _this.getFieldsError,
        isFieldsTouched: _this.isFieldsTouched,
        isFieldTouched: _this.isFieldTouched,
        isFieldValidating: _this.isFieldValidating,
        isFieldsValidating: _this.isFieldsValidating,
        resetFields: _this.resetFields,
        setFields: _this.setFields,
        setFieldValue: _this.setFieldValue,
        setFieldsValue: _this.setFieldsValue,
        validateFields: _this.validateFields,
        submit: _this.submit,
        _init: true,
        getInternalHooks: _this.getInternalHooks
      };
    };
    this.getInternalHooks = function(key) {
      if (key === HOOK_MARK$1) {
        _this.formHooked = true;
        return {
          dispatch: _this.dispatch,
          initEntityValue: _this.initEntityValue,
          registerField: _this.registerField,
          useSubscribe: _this.useSubscribe,
          setInitialValues: _this.setInitialValues,
          destroyForm: _this.destroyForm,
          setCallbacks: _this.setCallbacks,
          setValidateMessages: _this.setValidateMessages,
          getFields: _this.getFields,
          setPreserve: _this.setPreserve,
          getInitialValue: _this.getInitialValue,
          registerWatch: _this.registerWatch
        };
      }
      warningOnce$1(false, "`getInternalHooks` is internal usage. Should not call directly.");
      return null;
    };
    this.useSubscribe = function(subscribable) {
      _this.subscribable = subscribable;
    };
    this.prevWithoutPreserves = null;
    this.setInitialValues = function(initialValues, init) {
      _this.initialValues = initialValues || {};
      if (init) {
        var _this$prevWithoutPres;
        var nextStore = setValues({}, initialValues, _this.store);
        (_this$prevWithoutPres = _this.prevWithoutPreserves) === null || _this$prevWithoutPres === void 0 ? void 0 : _this$prevWithoutPres.map(function(_ref) {
          var namePath = _ref.key;
          nextStore = setValue(nextStore, namePath, getValue(initialValues, namePath));
        });
        _this.prevWithoutPreserves = null;
        _this.updateStore(nextStore);
      }
    };
    this.destroyForm = function() {
      var prevWithoutPreserves = new NameMap();
      _this.getFieldEntities(true).forEach(function(entity) {
        if (!_this.isMergedPreserve(entity.isPreserve())) {
          prevWithoutPreserves.set(entity.getNamePath(), true);
        }
      });
      _this.prevWithoutPreserves = prevWithoutPreserves;
    };
    this.getInitialValue = function(namePath) {
      var initValue = getValue(_this.initialValues, namePath);
      return namePath.length ? cloneDeep(initValue) : initValue;
    };
    this.setCallbacks = function(callbacks) {
      _this.callbacks = callbacks;
    };
    this.setValidateMessages = function(validateMessages) {
      _this.validateMessages = validateMessages;
    };
    this.setPreserve = function(preserve) {
      _this.preserve = preserve;
    };
    this.watchList = [];
    this.registerWatch = function(callback) {
      _this.watchList.push(callback);
      return function() {
        _this.watchList = _this.watchList.filter(function(fn) {
          return fn !== callback;
        });
      };
    };
    this.notifyWatch = function() {
      var namePath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      if (_this.watchList.length) {
        var values = _this.getFieldsValue();
        _this.watchList.forEach(function(callback) {
          callback(values, namePath);
        });
      }
    };
    this.timeoutId = null;
    this.warningUnhooked = function() {
      if (!_this.timeoutId && typeof window !== "undefined") {
        _this.timeoutId = setTimeout(function() {
          _this.timeoutId = null;
          if (!_this.formHooked) {
            warningOnce$1(false, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
          }
        });
      }
    };
    this.updateStore = function(nextStore) {
      _this.store = nextStore;
    };
    this.getFieldEntities = function() {
      var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (!pure) {
        return _this.fieldEntities;
      }
      return _this.fieldEntities.filter(function(field) {
        return field.getNamePath().length;
      });
    };
    this.getFieldsMap = function() {
      var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var cache = new NameMap();
      _this.getFieldEntities(pure).forEach(function(field) {
        var namePath = field.getNamePath();
        cache.set(namePath, field);
      });
      return cache;
    };
    this.getFieldEntitiesForNamePathList = function(nameList) {
      if (!nameList) {
        return _this.getFieldEntities(true);
      }
      var cache = _this.getFieldsMap(true);
      return nameList.map(function(name) {
        var namePath = getNamePath(name);
        return cache.get(namePath) || {
          INVALIDATE_NAME_PATH: getNamePath(name)
        };
      });
    };
    this.getFieldsValue = function(nameList, filterFunc) {
      _this.warningUnhooked();
      if (nameList === true && !filterFunc) {
        return _this.store;
      }
      var fieldEntities = _this.getFieldEntitiesForNamePathList(Array.isArray(nameList) ? nameList : null);
      var filteredNameList = [];
      fieldEntities.forEach(function(entity) {
        var _entity$isListField;
        var namePath = "INVALIDATE_NAME_PATH" in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();
        if (!nameList && ((_entity$isListField = entity.isListField) === null || _entity$isListField === void 0 ? void 0 : _entity$isListField.call(entity))) {
          return;
        }
        if (!filterFunc) {
          filteredNameList.push(namePath);
        } else {
          var meta = "getMeta" in entity ? entity.getMeta() : null;
          if (filterFunc(meta)) {
            filteredNameList.push(namePath);
          }
        }
      });
      return cloneByNamePathList(_this.store, filteredNameList.map(getNamePath));
    };
    this.getFieldValue = function(name) {
      _this.warningUnhooked();
      var namePath = getNamePath(name);
      return getValue(_this.store, namePath);
    };
    this.getFieldsError = function(nameList) {
      _this.warningUnhooked();
      var fieldEntities = _this.getFieldEntitiesForNamePathList(nameList);
      return fieldEntities.map(function(entity, index2) {
        if (entity && !("INVALIDATE_NAME_PATH" in entity)) {
          return {
            name: entity.getNamePath(),
            errors: entity.getErrors(),
            warnings: entity.getWarnings()
          };
        }
        return {
          name: getNamePath(nameList[index2]),
          errors: [],
          warnings: []
        };
      });
    };
    this.getFieldError = function(name) {
      _this.warningUnhooked();
      var namePath = getNamePath(name);
      var fieldError = _this.getFieldsError([namePath])[0];
      return fieldError.errors;
    };
    this.getFieldWarning = function(name) {
      _this.warningUnhooked();
      var namePath = getNamePath(name);
      var fieldError = _this.getFieldsError([namePath])[0];
      return fieldError.warnings;
    };
    this.isFieldsTouched = function() {
      _this.warningUnhooked();
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var arg0 = args[0], arg1 = args[1];
      var namePathList;
      var isAllFieldsTouched = false;
      if (args.length === 0) {
        namePathList = null;
      } else if (args.length === 1) {
        if (Array.isArray(arg0)) {
          namePathList = arg0.map(getNamePath);
          isAllFieldsTouched = false;
        } else {
          namePathList = null;
          isAllFieldsTouched = arg0;
        }
      } else {
        namePathList = arg0.map(getNamePath);
        isAllFieldsTouched = arg1;
      }
      var fieldEntities = _this.getFieldEntities(true);
      var isFieldTouched = function isFieldTouched2(field) {
        return field.isFieldTouched();
      };
      if (!namePathList) {
        return isAllFieldsTouched ? fieldEntities.every(isFieldTouched) : fieldEntities.some(isFieldTouched);
      }
      var map = new NameMap();
      namePathList.forEach(function(shortNamePath) {
        map.set(shortNamePath, []);
      });
      fieldEntities.forEach(function(field) {
        var fieldNamePath = field.getNamePath();
        namePathList.forEach(function(shortNamePath) {
          if (shortNamePath.every(function(nameUnit, i2) {
            return fieldNamePath[i2] === nameUnit;
          })) {
            map.update(shortNamePath, function(list) {
              return [].concat(_toConsumableArray(list), [field]);
            });
          }
        });
      });
      var isNamePathListTouched = function isNamePathListTouched2(entities) {
        return entities.some(isFieldTouched);
      };
      var namePathListEntities = map.map(function(_ref2) {
        var value = _ref2.value;
        return value;
      });
      return isAllFieldsTouched ? namePathListEntities.every(isNamePathListTouched) : namePathListEntities.some(isNamePathListTouched);
    };
    this.isFieldTouched = function(name) {
      _this.warningUnhooked();
      return _this.isFieldsTouched([name]);
    };
    this.isFieldsValidating = function(nameList) {
      _this.warningUnhooked();
      var fieldEntities = _this.getFieldEntities();
      if (!nameList) {
        return fieldEntities.some(function(testField) {
          return testField.isFieldValidating();
        });
      }
      var namePathList = nameList.map(getNamePath);
      return fieldEntities.some(function(testField) {
        var fieldNamePath = testField.getNamePath();
        return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
      });
    };
    this.isFieldValidating = function(name) {
      _this.warningUnhooked();
      return _this.isFieldsValidating([name]);
    };
    this.resetWithFieldInitialValue = function() {
      var info = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var cache = new NameMap();
      var fieldEntities = _this.getFieldEntities(true);
      fieldEntities.forEach(function(field) {
        var initialValue = field.props.initialValue;
        var namePath = field.getNamePath();
        if (initialValue !== void 0) {
          var records = cache.get(namePath) || /* @__PURE__ */ new Set();
          records.add({
            entity: field,
            value: initialValue
          });
          cache.set(namePath, records);
        }
      });
      var resetWithFields = function resetWithFields2(entities) {
        entities.forEach(function(field) {
          var initialValue = field.props.initialValue;
          if (initialValue !== void 0) {
            var namePath = field.getNamePath();
            var formInitialValue = _this.getInitialValue(namePath);
            if (formInitialValue !== void 0) {
              warningOnce$1(false, "Form already set 'initialValues' with path '".concat(namePath.join("."), "'. Field can not overwrite it."));
            } else {
              var records = cache.get(namePath);
              if (records && records.size > 1) {
                warningOnce$1(false, "Multiple Field with path '".concat(namePath.join("."), "' set 'initialValue'. Can not decide which one to pick."));
              } else if (records) {
                var originValue = _this.getFieldValue(namePath);
                if (!info.skipExist || originValue === void 0) {
                  _this.updateStore(setValue(_this.store, namePath, _toConsumableArray(records)[0].value));
                }
              }
            }
          }
        });
      };
      var requiredFieldEntities;
      if (info.entities) {
        requiredFieldEntities = info.entities;
      } else if (info.namePathList) {
        requiredFieldEntities = [];
        info.namePathList.forEach(function(namePath) {
          var records = cache.get(namePath);
          if (records) {
            var _requiredFieldEntitie;
            (_requiredFieldEntitie = requiredFieldEntities).push.apply(_requiredFieldEntitie, _toConsumableArray(_toConsumableArray(records).map(function(r) {
              return r.entity;
            })));
          }
        });
      } else {
        requiredFieldEntities = fieldEntities;
      }
      resetWithFields(requiredFieldEntities);
    };
    this.resetFields = function(nameList) {
      _this.warningUnhooked();
      var prevStore = _this.store;
      if (!nameList) {
        _this.updateStore(setValues({}, _this.initialValues));
        _this.resetWithFieldInitialValue();
        _this.notifyObservers(prevStore, null, {
          type: "reset"
        });
        _this.notifyWatch();
        return;
      }
      var namePathList = nameList.map(getNamePath);
      namePathList.forEach(function(namePath) {
        var initialValue = _this.getInitialValue(namePath);
        _this.updateStore(setValue(_this.store, namePath, initialValue));
      });
      _this.resetWithFieldInitialValue({
        namePathList
      });
      _this.notifyObservers(prevStore, namePathList, {
        type: "reset"
      });
      _this.notifyWatch(namePathList);
    };
    this.setFields = function(fields) {
      _this.warningUnhooked();
      var prevStore = _this.store;
      var namePathList = [];
      fields.forEach(function(fieldData) {
        var name = fieldData.name;
        fieldData.errors;
        var data = _objectWithoutProperties(fieldData, _excluded$1);
        var namePath = getNamePath(name);
        namePathList.push(namePath);
        if ("value" in data) {
          _this.updateStore(setValue(_this.store, namePath, data.value));
        }
        _this.notifyObservers(prevStore, [namePath], {
          type: "setField",
          data: fieldData
        });
      });
      _this.notifyWatch(namePathList);
    };
    this.getFields = function() {
      var entities = _this.getFieldEntities(true);
      var fields = entities.map(function(field) {
        var namePath = field.getNamePath();
        var meta = field.getMeta();
        var fieldData = _objectSpread2(_objectSpread2({}, meta), {}, {
          name: namePath,
          value: _this.getFieldValue(namePath)
        });
        Object.defineProperty(fieldData, "originRCField", {
          value: true
        });
        return fieldData;
      });
      return fields;
    };
    this.initEntityValue = function(entity) {
      var initialValue = entity.props.initialValue;
      if (initialValue !== void 0) {
        var namePath = entity.getNamePath();
        var prevValue = getValue(_this.store, namePath);
        if (prevValue === void 0) {
          _this.updateStore(setValue(_this.store, namePath, initialValue));
        }
      }
    };
    this.isMergedPreserve = function(fieldPreserve) {
      var mergedPreserve = fieldPreserve !== void 0 ? fieldPreserve : _this.preserve;
      return mergedPreserve !== null && mergedPreserve !== void 0 ? mergedPreserve : true;
    };
    this.registerField = function(entity) {
      _this.fieldEntities.push(entity);
      var namePath = entity.getNamePath();
      _this.notifyWatch([namePath]);
      if (entity.props.initialValue !== void 0) {
        var prevStore = _this.store;
        _this.resetWithFieldInitialValue({
          entities: [entity],
          skipExist: true
        });
        _this.notifyObservers(prevStore, [entity.getNamePath()], {
          type: "valueUpdate",
          source: "internal"
        });
      }
      return function(isListField, preserve) {
        var subNamePath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        _this.fieldEntities = _this.fieldEntities.filter(function(item) {
          return item !== entity;
        });
        if (!_this.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
          var defaultValue = isListField ? void 0 : _this.getInitialValue(namePath);
          if (namePath.length && _this.getFieldValue(namePath) !== defaultValue && _this.fieldEntities.every(function(field) {
            return (
              // Only reset when no namePath exist
              !matchNamePath(field.getNamePath(), namePath)
            );
          })) {
            var _prevStore = _this.store;
            _this.updateStore(setValue(_prevStore, namePath, defaultValue, true));
            _this.notifyObservers(_prevStore, [namePath], {
              type: "remove"
            });
            _this.triggerDependenciesUpdate(_prevStore, namePath);
          }
        }
        _this.notifyWatch([namePath]);
      };
    };
    this.dispatch = function(action) {
      switch (action.type) {
        case "updateValue": {
          var namePath = action.namePath, value = action.value;
          _this.updateValue(namePath, value);
          break;
        }
        case "validateField": {
          var _namePath = action.namePath, triggerName = action.triggerName;
          _this.validateFields([_namePath], {
            triggerName
          });
          break;
        }
      }
    };
    this.notifyObservers = function(prevStore, namePathList, info) {
      if (_this.subscribable) {
        var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, {
          store: _this.getFieldsValue(true)
        });
        _this.getFieldEntities().forEach(function(_ref3) {
          var onStoreChange = _ref3.onStoreChange;
          onStoreChange(prevStore, namePathList, mergedInfo);
        });
      } else {
        _this.forceRootUpdate();
      }
    };
    this.triggerDependenciesUpdate = function(prevStore, namePath) {
      var childrenFields = _this.getDependencyChildrenFields(namePath);
      if (childrenFields.length) {
        _this.validateFields(childrenFields);
      }
      _this.notifyObservers(prevStore, childrenFields, {
        type: "dependenciesUpdate",
        relatedFields: [namePath].concat(_toConsumableArray(childrenFields))
      });
      return childrenFields;
    };
    this.updateValue = function(name, value) {
      var namePath = getNamePath(name);
      var prevStore = _this.store;
      _this.updateStore(setValue(_this.store, namePath, value));
      _this.notifyObservers(prevStore, [namePath], {
        type: "valueUpdate",
        source: "internal"
      });
      _this.notifyWatch([namePath]);
      var childrenFields = _this.triggerDependenciesUpdate(prevStore, namePath);
      var onValuesChange = _this.callbacks.onValuesChange;
      if (onValuesChange) {
        var changedValues = cloneByNamePathList(_this.store, [namePath]);
        onValuesChange(changedValues, _this.getFieldsValue());
      }
      _this.triggerOnFieldsChange([namePath].concat(_toConsumableArray(childrenFields)));
    };
    this.setFieldsValue = function(store) {
      _this.warningUnhooked();
      var prevStore = _this.store;
      if (store) {
        var nextStore = setValues(_this.store, store);
        _this.updateStore(nextStore);
      }
      _this.notifyObservers(prevStore, null, {
        type: "valueUpdate",
        source: "external"
      });
      _this.notifyWatch();
    };
    this.setFieldValue = function(name, value) {
      _this.setFields([{
        name,
        value
      }]);
    };
    this.getDependencyChildrenFields = function(rootNamePath) {
      var children = /* @__PURE__ */ new Set();
      var childrenFields = [];
      var dependencies2fields = new NameMap();
      _this.getFieldEntities().forEach(function(field) {
        var dependencies = field.props.dependencies;
        (dependencies || []).forEach(function(dependency) {
          var dependencyNamePath = getNamePath(dependency);
          dependencies2fields.update(dependencyNamePath, function() {
            var fields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
            fields.add(field);
            return fields;
          });
        });
      });
      var fillChildren = function fillChildren2(namePath) {
        var fields = dependencies2fields.get(namePath) || /* @__PURE__ */ new Set();
        fields.forEach(function(field) {
          if (!children.has(field)) {
            children.add(field);
            var fieldNamePath = field.getNamePath();
            if (field.isFieldDirty() && fieldNamePath.length) {
              childrenFields.push(fieldNamePath);
              fillChildren2(fieldNamePath);
            }
          }
        });
      };
      fillChildren(rootNamePath);
      return childrenFields;
    };
    this.triggerOnFieldsChange = function(namePathList, filedErrors) {
      var onFieldsChange = _this.callbacks.onFieldsChange;
      if (onFieldsChange) {
        var fields = _this.getFields();
        if (filedErrors) {
          var cache = new NameMap();
          filedErrors.forEach(function(_ref4) {
            var name = _ref4.name, errors = _ref4.errors;
            cache.set(name, errors);
          });
          fields.forEach(function(field) {
            field.errors = cache.get(field.name) || field.errors;
          });
        }
        var changedFields = fields.filter(function(_ref5) {
          var fieldName = _ref5.name;
          return containsNamePath(namePathList, fieldName);
        });
        onFieldsChange(changedFields, fields);
      }
    };
    this.validateFields = function(nameList, options) {
      _this.warningUnhooked();
      var provideNameList = !!nameList;
      var namePathList = provideNameList ? nameList.map(getNamePath) : [];
      var promiseList = [];
      _this.getFieldEntities(true).forEach(function(field) {
        if (!provideNameList) {
          namePathList.push(field.getNamePath());
        }
        if ((options === null || options === void 0 ? void 0 : options.recursive) && provideNameList) {
          var namePath = field.getNamePath();
          if (
            // nameList[i] === undefined 说明是以 nameList 开头的
            // ['name'] -> ['name','list']
            namePath.every(function(nameUnit, i2) {
              return nameList[i2] === nameUnit || nameList[i2] === void 0;
            })
          ) {
            namePathList.push(namePath);
          }
        }
        if (!field.props.rules || !field.props.rules.length) {
          return;
        }
        var fieldNamePath = field.getNamePath();
        if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
          var promise = field.validateRules(_objectSpread2({
            validateMessages: _objectSpread2(_objectSpread2({}, defaultValidateMessages), _this.validateMessages)
          }, options));
          promiseList.push(promise.then(function() {
            return {
              name: fieldNamePath,
              errors: [],
              warnings: []
            };
          }).catch(function(ruleErrors) {
            var _ruleErrors$forEach;
            var mergedErrors = [];
            var mergedWarnings = [];
            (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref6) {
              var warningOnly = _ref6.rule.warningOnly, errors = _ref6.errors;
              if (warningOnly) {
                mergedWarnings.push.apply(mergedWarnings, _toConsumableArray(errors));
              } else {
                mergedErrors.push.apply(mergedErrors, _toConsumableArray(errors));
              }
            });
            if (mergedErrors.length) {
              return Promise.reject({
                name: fieldNamePath,
                errors: mergedErrors,
                warnings: mergedWarnings
              });
            }
            return {
              name: fieldNamePath,
              errors: mergedErrors,
              warnings: mergedWarnings
            };
          }));
        }
      });
      var summaryPromise = allPromiseFinish(promiseList);
      _this.lastValidatePromise = summaryPromise;
      summaryPromise.catch(function(results) {
        return results;
      }).then(function(results) {
        var resultNamePathList = results.map(function(_ref7) {
          var name = _ref7.name;
          return name;
        });
        _this.notifyObservers(_this.store, resultNamePathList, {
          type: "validateFinish"
        });
        _this.triggerOnFieldsChange(resultNamePathList, results);
      });
      var returnPromise = summaryPromise.then(function() {
        if (_this.lastValidatePromise === summaryPromise) {
          return Promise.resolve(_this.getFieldsValue(namePathList));
        }
        return Promise.reject([]);
      }).catch(function(results) {
        var errorList = results.filter(function(result) {
          return result && result.errors.length;
        });
        return Promise.reject({
          values: _this.getFieldsValue(namePathList),
          errorFields: errorList,
          outOfDate: _this.lastValidatePromise !== summaryPromise
        });
      });
      returnPromise.catch(function(e2) {
        return e2;
      });
      return returnPromise;
    };
    this.submit = function() {
      _this.warningUnhooked();
      _this.validateFields().then(function(values) {
        var onFinish = _this.callbacks.onFinish;
        if (onFinish) {
          try {
            onFinish(values);
          } catch (err) {
            console.error(err);
          }
        }
      }).catch(function(e2) {
        var onFinishFailed = _this.callbacks.onFinishFailed;
        if (onFinishFailed) {
          onFinishFailed(e2);
        }
      });
    };
    this.forceRootUpdate = forceRootUpdate;
  });
  function useForm(form) {
    var formRef = React__namespace.useRef();
    var _React$useState = React__namespace.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
    if (!formRef.current) {
      if (form) {
        formRef.current = form;
      } else {
        var forceReRender = function forceReRender2() {
          forceUpdate({});
        };
        var formStore = new FormStore(forceReRender);
        formRef.current = formStore.getForm();
      }
    }
    return [formRef.current];
  }
  var FormContext$1 = /* @__PURE__ */ React__namespace.createContext({
    triggerFormChange: function triggerFormChange() {
    },
    triggerFormFinish: function triggerFormFinish() {
    },
    registerForm: function registerForm() {
    },
    unregisterForm: function unregisterForm() {
    }
  });
  var FormProvider = function FormProvider2(_ref) {
    var validateMessages = _ref.validateMessages, onFormChange = _ref.onFormChange, onFormFinish = _ref.onFormFinish, children = _ref.children;
    var formContext = React__namespace.useContext(FormContext$1);
    var formsRef = React__namespace.useRef({});
    return /* @__PURE__ */ React__namespace.createElement(FormContext$1.Provider, {
      value: _objectSpread2(_objectSpread2({}, formContext), {}, {
        validateMessages: _objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages),
        // =========================================================
        // =                  Global Form Control                  =
        // =========================================================
        triggerFormChange: function triggerFormChange(name, changedFields) {
          if (onFormChange) {
            onFormChange(name, {
              changedFields,
              forms: formsRef.current
            });
          }
          formContext.triggerFormChange(name, changedFields);
        },
        triggerFormFinish: function triggerFormFinish(name, values) {
          if (onFormFinish) {
            onFormFinish(name, {
              values,
              forms: formsRef.current
            });
          }
          formContext.triggerFormFinish(name, values);
        },
        registerForm: function registerForm(name, form) {
          if (name) {
            formsRef.current = _objectSpread2(_objectSpread2({}, formsRef.current), {}, _defineProperty({}, name, form));
          }
          formContext.registerForm(name, form);
        },
        unregisterForm: function unregisterForm(name) {
          var newForms = _objectSpread2({}, formsRef.current);
          delete newForms[name];
          formsRef.current = newForms;
          formContext.unregisterForm(name);
        }
      })
    }, children);
  };
  var _excluded = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"];
  var Form$1 = function Form2(_ref, ref) {
    var name = _ref.name, initialValues = _ref.initialValues, fields = _ref.fields, form = _ref.form, preserve = _ref.preserve, children = _ref.children, _ref$component = _ref.component, Component = _ref$component === void 0 ? "form" : _ref$component, validateMessages = _ref.validateMessages, _ref$validateTrigger = _ref.validateTrigger, validateTrigger = _ref$validateTrigger === void 0 ? "onChange" : _ref$validateTrigger, onValuesChange = _ref.onValuesChange, _onFieldsChange = _ref.onFieldsChange, _onFinish = _ref.onFinish, onFinishFailed = _ref.onFinishFailed, restProps = _objectWithoutProperties(_ref, _excluded);
    var formContext = React__namespace.useContext(FormContext$1);
    var _useForm = useForm(form), _useForm2 = _slicedToArray(_useForm, 1), formInstance = _useForm2[0];
    var _formInstance$getInte = formInstance.getInternalHooks(HOOK_MARK$1), useSubscribe = _formInstance$getInte.useSubscribe, setInitialValues = _formInstance$getInte.setInitialValues, setCallbacks = _formInstance$getInte.setCallbacks, setValidateMessages = _formInstance$getInte.setValidateMessages, setPreserve = _formInstance$getInte.setPreserve, destroyForm = _formInstance$getInte.destroyForm;
    React__namespace.useImperativeHandle(ref, function() {
      return formInstance;
    });
    React__namespace.useEffect(function() {
      formContext.registerForm(name, formInstance);
      return function() {
        formContext.unregisterForm(name);
      };
    }, [formContext, formInstance, name]);
    setValidateMessages(_objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages));
    setCallbacks({
      onValuesChange,
      onFieldsChange: function onFieldsChange(changedFields) {
        formContext.triggerFormChange(name, changedFields);
        if (_onFieldsChange) {
          for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }
          _onFieldsChange.apply(void 0, [changedFields].concat(rest));
        }
      },
      onFinish: function onFinish(values2) {
        formContext.triggerFormFinish(name, values2);
        if (_onFinish) {
          _onFinish(values2);
        }
      },
      onFinishFailed
    });
    setPreserve(preserve);
    var mountRef = React__namespace.useRef(null);
    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) {
      mountRef.current = true;
    }
    React__namespace.useEffect(
      function() {
        return destroyForm;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    var childrenNode;
    var childrenRenderProps = typeof children === "function";
    if (childrenRenderProps) {
      var values = formInstance.getFieldsValue(true);
      childrenNode = children(values, formInstance);
    } else {
      childrenNode = children;
    }
    useSubscribe(!childrenRenderProps);
    var prevFieldsRef = React__namespace.useRef();
    React__namespace.useEffect(function() {
      if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
        formInstance.setFields(fields || []);
      }
      prevFieldsRef.current = fields;
    }, [fields, formInstance]);
    var formContextValue = React__namespace.useMemo(function() {
      return _objectSpread2(_objectSpread2({}, formInstance), {}, {
        validateTrigger
      });
    }, [formInstance, validateTrigger]);
    var wrapperNode = /* @__PURE__ */ React__namespace.createElement(Context$1.Provider, {
      value: formContextValue
    }, childrenNode);
    if (Component === false) {
      return wrapperNode;
    }
    return /* @__PURE__ */ React__namespace.createElement(Component, _extends$1({}, restProps, {
      onSubmit: function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      },
      onReset: function onReset(event) {
        var _restProps$onReset;
        event.preventDefault();
        formInstance.resetFields();
        (_restProps$onReset = restProps.onReset) === null || _restProps$onReset === void 0 ? void 0 : _restProps$onReset.call(restProps, event);
      }
    }), wrapperNode);
  };
  function stringify(value) {
    try {
      return JSON.stringify(value);
    } catch (err) {
      return Math.random();
    }
  }
  var useWatchWarning = function(namePath) {
    var fullyStr = namePath.join("__RC_FIELD_FORM_SPLIT__");
    var nameStrRef = React$1.useRef(fullyStr);
    warningOnce$1(nameStrRef.current === fullyStr, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
  };
  function useWatch() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var _args$ = args[0], dependencies = _args$ === void 0 ? [] : _args$, form = args[1];
    var _useState = React$1.useState(), _useState2 = _slicedToArray(_useState, 2), value = _useState2[0], setValue2 = _useState2[1];
    var valueStr = React$1.useMemo(function() {
      return stringify(value);
    }, [value]);
    var valueStrRef = React$1.useRef(valueStr);
    valueStrRef.current = valueStr;
    var fieldContext = React$1.useContext(Context$1);
    var formInstance = form || fieldContext;
    var isValidForm = formInstance && formInstance._init;
    {
      warningOnce$1(args.length === 2 ? form ? isValidForm : true : isValidForm, "useWatch requires a form instance since it can not auto detect from context.");
    }
    var namePath = getNamePath(dependencies);
    var namePathRef = React$1.useRef(namePath);
    namePathRef.current = namePath;
    useWatchWarning(namePath);
    React$1.useEffect(
      function() {
        if (!isValidForm) {
          return;
        }
        var getFieldsValue = formInstance.getFieldsValue, getInternalHooks = formInstance.getInternalHooks;
        var _getInternalHooks = getInternalHooks(HOOK_MARK$1), registerWatch = _getInternalHooks.registerWatch;
        var cancelRegister = registerWatch(function(store) {
          var newValue = getValue(store, namePathRef.current);
          var nextValueStr = stringify(newValue);
          if (valueStrRef.current !== nextValueStr) {
            valueStrRef.current = nextValueStr;
            setValue2(newValue);
          }
        });
        var initialValue = getValue(getFieldsValue(), namePathRef.current);
        setValue2(initialValue);
        return cancelRegister;
      },
      // We do not need re-register since namePath content is the same
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isValidForm]
    );
    return value;
  }
  var InternalForm = /* @__PURE__ */ React__namespace.forwardRef(Form$1);
  var RefForm = InternalForm;
  RefForm.FormProvider = FormProvider;
  RefForm.Field = WrapperField;
  RefForm.List = List;
  RefForm.useForm = useForm;
  RefForm.useWatch = useWatch;
  const defaultFormContext = {
    name: void 0,
    hasFeedback: true,
    layout: "vertical",
    requiredMarkStyle: "asterisk",
    disabled: false
  };
  const FormContext = React$1.createContext(defaultFormContext);
  const NoStyleItemContext = React$1.createContext(null);
  const Header = () => null;
  var baseAssignValue = _baseAssignValue, eq = eq_1;
  function assignMergeValue$2(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  var _assignMergeValue = assignMergeValue$2;
  function createBaseFor$1(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var _createBaseFor = createBaseFor$1;
  var createBaseFor = _createBaseFor;
  var baseFor$1 = createBaseFor();
  var _baseFor = baseFor$1;
  var _cloneBuffer = { exports: {} };
  _cloneBuffer.exports;
  (function(module2, exports3) {
    var root2 = _root;
    var freeExports = exports3 && !exports3.nodeType && exports3;
    var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer2(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module2.exports = cloneBuffer2;
  })(_cloneBuffer, _cloneBuffer.exports);
  var _cloneBufferExports = _cloneBuffer.exports;
  var Uint8Array = _Uint8Array;
  function cloneArrayBuffer$1(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }
  var _cloneArrayBuffer = cloneArrayBuffer$1;
  var cloneArrayBuffer = _cloneArrayBuffer;
  function cloneTypedArray$1(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var _cloneTypedArray = cloneTypedArray$1;
  function copyArray$1(source, array) {
    var index2 = -1, length = source.length;
    array || (array = Array(length));
    while (++index2 < length) {
      array[index2] = source[index2];
    }
    return array;
  }
  var _copyArray = copyArray$1;
  var isObject$3 = isObject_1;
  var objectCreate = Object.create;
  var baseCreate$1 = /* @__PURE__ */ function() {
    function object() {
    }
    return function(proto) {
      if (!isObject$3(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  }();
  var _baseCreate = baseCreate$1;
  var baseCreate = _baseCreate, getPrototype = _getPrototype, isPrototype$1 = _isPrototype;
  function initCloneObject$1(object) {
    return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate(getPrototype(object)) : {};
  }
  var _initCloneObject = initCloneObject$1;
  var isArrayLike$1 = isArrayLike_1, isObjectLike = isObjectLike_1;
  function isArrayLikeObject$1(value) {
    return isObjectLike(value) && isArrayLike$1(value);
  }
  var isArrayLikeObject_1 = isArrayLikeObject$1;
  function safeGet$2(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  var _safeGet = safeGet$2;
  function nativeKeysIn$1(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var _nativeKeysIn = nativeKeysIn$1;
  var isObject$2 = isObject_1, isPrototype = _isPrototype, nativeKeysIn = _nativeKeysIn;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeysIn$1(object) {
    if (!isObject$2(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var _baseKeysIn = baseKeysIn$1;
  var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike = isArrayLike_1;
  function keysIn$2(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  var keysIn_1 = keysIn$2;
  var copyObject = _copyObject, keysIn$1 = keysIn_1;
  function toPlainObject$1(value) {
    return copyObject(value, keysIn$1(value));
  }
  var toPlainObject_1 = toPlainObject$1;
  var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBufferExports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer = isBufferExports, isFunction = isFunction_1, isObject$1 = isObject_1, isPlainObject = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
  function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue$1(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject$1(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue$1(object, key, newValue);
  }
  var _baseMergeDeep = baseMergeDeep$1;
  var Stack = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
  function baseMerge$1(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack());
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  var _baseMerge = baseMerge$1;
  var baseMerge = _baseMerge, createAssigner = _createAssigner;
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  var merge_1 = merge;
  const merge$1 = /* @__PURE__ */ getDefaultExportFromCjs(merge_1);
  const FormArray = (props) => {
    return React$1.createElement(List, {
      name: props.name,
      initialValue: props.initialValue
    }, (rcFields, operation) => {
      const fields = rcFields.map((field) => ({
        index: field.name,
        key: field.key
      }));
      const children = props.children(fields, operation).map((child, index2) => {
        var _a;
        return React$1.createElement(List$1, {
          key: fields[index2].key,
          mode: "card",
          header: (_a = props.renderHeader) === null || _a === void 0 ? void 0 : _a.call(props, fields[index2], operation)
        }, child);
      });
      if (props.renderAdd) {
        children.push(React$1.createElement(List$1, {
          key: "add",
          mode: "card"
        }, React$1.createElement(List$1.Item, {
          className: "adm-form-list-operation",
          onClick: () => {
            props.onAdd ? props.onAdd(operation) : operation.add();
          },
          arrow: false
        }, props.renderAdd())));
      }
      return React$1.createElement(React$1.Fragment, null, children);
    });
  };
  const classPrefix$O = "adm-form";
  const defaultProps$C = defaultFormContext;
  const Form = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$C, p);
    const {
      className,
      style,
      hasFeedback,
      children,
      layout,
      footer,
      mode,
      disabled,
      requiredMarkStyle
    } = props, formProps = __rest(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]);
    const {
      locale
    } = useConfig();
    const validateMessages = React$1.useMemo(() => merge$1({}, locale.Form.defaultValidateMessages, formProps.validateMessages), [locale.Form.defaultValidateMessages, formProps.validateMessages]);
    const lists = [];
    let currentHeader = null;
    let items = [];
    let count = 0;
    function collect() {
      if (items.length === 0)
        return;
      count += 1;
      lists.push(React$1.createElement(List$1, {
        header: currentHeader,
        key: count,
        mode
      }, items));
      items = [];
    }
    traverseReactNode(props.children, (child) => {
      if (React$1.isValidElement(child)) {
        if (child.type === Header) {
          collect();
          currentHeader = child.props.children;
          return;
        }
        if (child.type === FormArray) {
          collect();
          lists.push(child);
          return;
        }
      }
      items.push(child);
    });
    collect();
    return React$1.createElement(RefForm, Object.assign({
      className: classNames(classPrefix$O, className),
      style,
      ref
    }, formProps, {
      validateMessages
    }), React$1.createElement(FormContext.Provider, {
      value: {
        name: formProps.name,
        hasFeedback,
        layout,
        requiredMarkStyle,
        disabled
      }
    }, lists), footer && React$1.createElement("div", {
      className: `${classPrefix$O}-footer`
    }, footer));
  });
  var FieldContext = {};
  var interopRequireWildcard = { exports: {} };
  var _typeof = { exports: {} };
  (function(module2) {
    function _typeof2(o) {
      "@babel/helpers - typeof";
      return module2.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _typeof2(o);
    }
    module2.exports = _typeof2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  })(_typeof);
  var _typeofExports = _typeof.exports;
  (function(module2) {
    var _typeof2 = _typeofExports["default"];
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard2(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
        return {
          "default": obj
        };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    module2.exports = _interopRequireWildcard2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  })(interopRequireWildcard);
  var interopRequireWildcardExports = interopRequireWildcard.exports;
  var interopRequireDefault = { exports: {} };
  (function(module2) {
    function _interopRequireDefault2(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    module2.exports = _interopRequireDefault2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  })(interopRequireDefault);
  var interopRequireDefaultExports = interopRequireDefault.exports;
  var warning$1 = {};
  Object.defineProperty(warning$1, "__esModule", {
    value: true
  });
  warning$1.call = call;
  warning$1.default = void 0;
  warning$1.note = note;
  warning$1.noteOnce = noteOnce;
  warning$1.preMessage = void 0;
  warning$1.resetWarned = resetWarned;
  warning$1.warning = warning;
  warning$1.warningOnce = warningOnce;
  var warned = {};
  var preWarningFns = [];
  var preMessage = warning$1.preMessage = function preMessage2(fn) {
    preWarningFns.push(fn);
  };
  function warning(valid, message) {
    if (!valid && console !== void 0) {
      var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
        return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
      }, message);
      if (finalMessage) {
        console.error("Warning: ".concat(finalMessage));
      }
    }
  }
  function note(valid, message) {
    if (!valid && console !== void 0) {
      var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
        return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
      }, message);
      if (finalMessage) {
        console.warn("Note: ".concat(finalMessage));
      }
    }
  }
  function resetWarned() {
    warned = {};
  }
  function call(method, valid, message) {
    if (!valid && !warned[message]) {
      method(false, message);
      warned[message] = true;
    }
  }
  function warningOnce(valid, message) {
    call(warning, valid, message);
  }
  function noteOnce(valid, message) {
    call(note, valid, message);
  }
  warningOnce.preMessage = preMessage;
  warningOnce.resetWarned = resetWarned;
  warningOnce.noteOnce = noteOnce;
  warning$1.default = warningOnce;
  var _interopRequireWildcard = interopRequireWildcardExports.default;
  var _interopRequireDefault = interopRequireDefaultExports.default;
  Object.defineProperty(FieldContext, "__esModule", {
    value: true
  });
  var default_1 = FieldContext.default = FieldContext.HOOK_MARK = void 0;
  var _warning = _interopRequireDefault(warning$1);
  var React = _interopRequireWildcard(React$1);
  var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
  FieldContext.HOOK_MARK = HOOK_MARK;
  var warningFunc = function warningFunc2() {
    (0, _warning.default)(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
  };
  var Context = /* @__PURE__ */ React.createContext({
    getFieldValue: warningFunc,
    getFieldsValue: warningFunc,
    getFieldError: warningFunc,
    getFieldWarning: warningFunc,
    getFieldsError: warningFunc,
    isFieldsTouched: warningFunc,
    isFieldTouched: warningFunc,
    isFieldValidating: warningFunc,
    isFieldsValidating: warningFunc,
    resetFields: warningFunc,
    setFields: warningFunc,
    setFieldValue: warningFunc,
    setFieldsValue: warningFunc,
    validateFields: warningFunc,
    submit: warningFunc,
    getInternalHooks: function getInternalHooks() {
      warningFunc();
      return {
        dispatch: warningFunc,
        initEntityValue: warningFunc,
        registerField: warningFunc,
        useSubscribe: warningFunc,
        setInitialValues: warningFunc,
        destroyForm: warningFunc,
        setCallbacks: warningFunc,
        registerWatch: warningFunc,
        getFields: warningFunc,
        setValidateMessages: warningFunc,
        setPreserve: warningFunc,
        getInitialValue: warningFunc
      };
    }
  });
  var _default = Context;
  default_1 = FieldContext.default = _default;
  function toArray(candidate) {
    if (candidate === void 0 || candidate === false)
      return [];
    return Array.isArray(candidate) ? candidate : [candidate];
  }
  function shouldConstruct(Component) {
    const prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }
  function isSimpleFunctionComponent(type) {
    return typeof type === "function" && !shouldConstruct(type) && type.defaultProps === void 0;
  }
  function isSafeSetRefComponent(component) {
    if (reactIsExports.isFragment(component))
      return false;
    if (reactIsExports.isMemo(component))
      return isSafeSetRefComponent(component.type);
    return !isSimpleFunctionComponent(component.type);
  }
  const Arrow = React$1.memo((props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      viewBox: "0 0 30 16"
    }, React$1.createElement("g", {
      fill: "currentColor"
    }, React$1.createElement("path", {
      d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
    }))));
  });
  const sides = ["top", "right", "bottom", "left"];
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = (v) => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  const oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start2, value, end) {
    return max(start2, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ["left", "right"];
    const rl = ["right", "left"];
    const tb = ["top", "bottom"];
    const bt = ["bottom", "top"];
    switch (side) {
      case "top":
      case "bottom":
        if (rtl)
          return isStart ? rl : lr;
        return isStart ? lr : rl;
      case "left":
      case "right":
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  const computePosition$1 = async (reference, floating, config2) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config2;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i2 = 0; i2 < validMiddleware.length; i2++) {
      const {
        name,
        fn
      } = validMiddleware[i2];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i2 = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      ...rects.floating,
      x,
      y
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  const arrow = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center != offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset2,
          centerOffset: center - offset2 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  const flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$map$so;
                const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some((side) => overflow[side] >= 0);
  }
  const hide = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "hide",
      options,
      async fn(state) {
        const {
          rects
        } = state;
        const {
          strategy = "referenceHidden",
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: "reference"
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      }
    };
  };
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  const offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        const {
          x,
          y
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
    };
  };
  const shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  const limitShift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset: offset2 = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset2, state);
        const computedOffset = typeof rawOffset === "number" ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === "y" ? "height" : "width";
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === "y" ? "width" : "height";
          const isOriginSide = ["top", "left"].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const webkit = isWebKit();
    const css = getComputedStyle(element);
    return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports)
      return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  function isLastTraversableNode(node) {
    return ["html", "body", "#document"].includes(getNodeName(node));
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getCssDimensions(element) {
    const css = getComputedStyle(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  const noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale2 = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale2 = getScale(offsetParent);
        }
      } else {
        scale2 = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale2.x;
    let y = (clientRect.top + visualOffsets.y) / scale2.y;
    let width = clientRect.width / scale2.x;
    let height = clientRect.height / scale2.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale2 = createCoords(1);
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale2 = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale2.x,
      height: rect.height * scale2.y,
      x: rect.x * scale2.x - scroll.scrollLeft * scale2.x + offsets.x,
      y: rect.y * scale2.y - scroll.scrollTop * scale2.y + offsets.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale2 = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale2.x;
    const height = element.clientHeight * scale2.y;
    const x = left * scale2.x;
    const y = top * scale2.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    return getCssDimensions(element);
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
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
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const window2 = getWindow(element);
    if (!isHTMLElement(element)) {
      return window2;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  const getElementRects = async function(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(floating)
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle(element).direction === "rtl";
  }
  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root2 = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root2.clientWidth - (left + width));
      const insetBottom = floor(root2.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root2.ownerDocument
        });
      } catch (e2) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }
  function autoUpdate(reference, floating, update2, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update2, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update2);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            resizeObserver && resizeObserver.observe(floating);
          });
        }
        update2();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop2();
    }
    function frameLoop2() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update2();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop2);
    }
    update2();
    return () => {
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update2);
        ancestorResize && ancestor.removeEventListener("resize", update2);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  const computePosition = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };
  class Wrapper extends React$1.Component {
    constructor() {
      super(...arguments);
      this.element = null;
    }
    componentDidMount() {
      this.componentDidUpdate();
    }
    componentDidUpdate() {
      const node = ReactDOM.findDOMNode(this);
      if (node instanceof Element) {
        this.element = node;
      } else {
        this.element = null;
      }
    }
    render() {
      return React$1.Children.only(this.props.children);
    }
  }
  const record = {
    "topLeft": "top-start",
    "topRight": "top-end",
    "bottomLeft": "bottom-start",
    "bottomRight": "bottom-end",
    "leftTop": "left-start",
    "leftBottom": "left-end",
    "rightTop": "right-start",
    "rightBottom": "right-end"
  };
  function normalizePlacement(placement) {
    var _a;
    return (_a = record[placement]) !== null && _a !== void 0 ? _a : placement;
  }
  let tenPxTester = null;
  let tester = null;
  if (canUseDom$1) {
    tenPxTester = document.createElement("div");
    tenPxTester.className = "adm-px-tester";
    tenPxTester.style.setProperty("--size", "10");
    document.body.appendChild(tenPxTester);
    tester = document.createElement("div");
    tester.className = "adm-px-tester";
    document.body.appendChild(tester);
    {
      if (window.getComputedStyle(tester).position !== "fixed") {
        devError("Global", "The px tester is not rendering properly. Please make sure you have imported `antd-mobile/es/global`.");
      }
    }
  }
  function convertPx(px) {
    if (tenPxTester === null || tester === null)
      return px;
    if (tenPxTester.getBoundingClientRect().height === 10) {
      return px;
    }
    tester.style.setProperty("--size", px.toString());
    return tester.getBoundingClientRect().height;
  }
  const classPrefix$N = `adm-popover`;
  const defaultProps$B = {
    placement: "top",
    defaultVisible: false,
    stopPropagation: ["click"],
    getContainer: () => document.body,
    mode: "light"
  };
  const Popover$1 = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$B, p);
    const placement = normalizePlacement(props.placement);
    const [visible, setVisible] = usePropsValue({
      value: props.visible,
      defaultValue: props.defaultVisible,
      onChange: props.onVisibleChange
    });
    React$1.useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
      visible
    }), [visible]);
    const targetRef = React$1.useRef(null);
    const floatingRef = React$1.useRef(null);
    const arrowRef = React$1.useRef(null);
    const floating = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$N, `${classPrefix$N}-${props.mode}`, {
        [`${classPrefix$N}-hidden`]: !visible
      }),
      ref: floatingRef
    }, React$1.createElement("div", {
      className: `${classPrefix$N}-arrow`,
      ref: arrowRef
    }, React$1.createElement(Arrow, {
      className: `${classPrefix$N}-arrow-icon`
    })), React$1.createElement("div", {
      className: `${classPrefix$N}-inner`
    }, React$1.createElement("div", {
      className: `${classPrefix$N}-inner-content`
    }, props.content)))));
    const [targetElement, setTargetElement] = React$1.useState(null);
    function update2() {
      var _a, _b, _c;
      return __awaiter(this, void 0, void 0, function* () {
        const target = (_b = (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null;
        const floating2 = floatingRef.current;
        const arrowElement = arrowRef.current;
        setTargetElement(target);
        if (!target || !floating2 || !arrowElement)
          return;
        const {
          x,
          y,
          placement: realPlacement,
          middlewareData
        } = yield computePosition(target, floating2, {
          placement,
          middleware: [offset(convertPx(12)), shift({
            padding: convertPx(4),
            crossAxis: false,
            limiter: limitShift()
          }), flip(), hide(), arrow({
            element: arrowElement,
            padding: convertPx(12)
          })]
        });
        Object.assign(floating2.style, {
          left: `${x}px`,
          top: `${y}px`
        });
        const side = realPlacement.split("-")[0];
        const arrowSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[side];
        const {
          x: arrowX,
          y: arrowY
        } = (_c = middlewareData.arrow) !== null && _c !== void 0 ? _c : {};
        Object.assign(arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [arrowSide]: "calc(var(--arrow-size) * -1)"
        });
        const arrowRotate = {
          top: "0deg",
          bottom: "180deg",
          left: "270deg",
          right: "90deg"
        }[side];
        arrowElement.style.setProperty("--arrow-icon-rotate", arrowRotate);
      });
    }
    useIsomorphicLayoutEffect$2(() => {
      update2();
    });
    React$1.useEffect(() => {
      if (!targetElement)
        return;
      if (!props.trigger)
        return;
      function handleClick() {
        setVisible((v) => !v);
      }
      targetElement.addEventListener("click", handleClick);
      return () => {
        targetElement.removeEventListener("click", handleClick);
      };
    }, [targetElement, props.trigger]);
    React$1.useEffect(() => {
      const floatingElement = floatingRef.current;
      if (!targetElement || !floatingElement)
        return;
      return autoUpdate(targetElement, floatingElement, update2, {
        elementResize: typeof ResizeObserver !== "undefined"
      });
    }, [targetElement]);
    useClickAway(() => {
      if (!props.trigger)
        return;
      setVisible(false);
    }, [() => {
      var _a;
      return (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element;
    }, floatingRef], ["click", "touchmove"]);
    const shouldRender = useShouldRender(visible, false, props.destroyOnHide);
    return React$1.createElement(React$1.Fragment, null, React$1.createElement(Wrapper, {
      ref: targetRef
    }, props.children), shouldRender && renderToContainer(props.getContainer, floating));
  });
  const classPrefix$M = `adm-popover-menu`;
  const PopoverMenu = React$1.forwardRef((props, ref) => {
    const innerRef = React$1.useRef(null);
    React$1.useImperativeHandle(ref, () => innerRef.current, []);
    const onClick = React$1.useCallback((e2) => {
      var _a;
      const {
        onAction
      } = props;
      if (onAction) {
        onAction(e2);
      }
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.hide();
    }, [props.onAction]);
    const overlay = React$1.useMemo(() => {
      const whetherScroll = (props === null || props === void 0 ? void 0 : props.maxCount) && props.actions.length > (props === null || props === void 0 ? void 0 : props.maxCount);
      const innerHeight = (props === null || props === void 0 ? void 0 : props.maxCount) && (props === null || props === void 0 ? void 0 : props.maxCount) * 48;
      return React$1.createElement("div", {
        className: `${classPrefix$M}-list`
      }, React$1.createElement("div", {
        className: classNames(`${classPrefix$M}-list-inner`, {
          [`${classPrefix$M}-list-scroll`]: whetherScroll
        }),
        style: {
          height: innerHeight
        }
      }, props.actions.map((action, index2) => {
        var _a;
        return React$1.createElement("a", {
          key: (_a = action.key) !== null && _a !== void 0 ? _a : index2,
          className: classNames(`${classPrefix$M}-item`, "adm-plain-anchor", {
            [`${classPrefix$M}-item-disabled`]: action.disabled
          }),
          onClick: () => {
            var _a2;
            if (action.disabled)
              return;
            onClick(action);
            (_a2 = action.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(action);
          }
        }, action.icon && React$1.createElement("div", {
          className: `${classPrefix$M}-item-icon`
        }, action.icon), React$1.createElement("div", {
          className: `${classPrefix$M}-item-text`
        }, action.text));
      })));
    }, [props.actions, onClick]);
    return React$1.createElement(Popover$1, Object.assign({
      ref: innerRef
    }, props, {
      className: classNames(classPrefix$M, props.className),
      content: overlay
    }), props.children);
  });
  const Popover = attachPropertiesToComponent(Popover$1, {
    Menu: PopoverMenu
  });
  function undefinedFallback(...items) {
    let i2;
    for (i2 = 0; i2 < items.length; i2++) {
      if (items[i2] !== void 0)
        break;
    }
    return items[i2];
  }
  const NAME_SPLIT = "__SPLIT__";
  const classPrefix$L = `adm-form-item`;
  const MemoInput = React$1.memo(({
    children
  }) => children, (prev, next) => prev.value === next.value && prev.update === next.update);
  const FormItemLayout = (props) => {
    var _a;
    const {
      style,
      extra,
      label,
      help,
      required,
      children,
      htmlFor,
      hidden,
      arrow: arrow2,
      childElementPosition = "normal"
    } = props;
    const context = React$1.useContext(FormContext);
    const {
      locale
    } = useConfig();
    const hasFeedback = props.hasFeedback !== void 0 ? props.hasFeedback : context.hasFeedback;
    const layout = props.layout || context.layout;
    const disabled = (_a = props.disabled) !== null && _a !== void 0 ? _a : context.disabled;
    const requiredMark = (() => {
      const {
        requiredMarkStyle
      } = context;
      switch (requiredMarkStyle) {
        case "asterisk":
          return required && React$1.createElement("span", {
            className: `${classPrefix$L}-required-asterisk`
          }, "*");
        case "text-required":
          return required && React$1.createElement("span", {
            className: `${classPrefix$L}-required-text`
          }, "(", locale.Form.required, ")");
        case "text-optional":
          return !required && React$1.createElement("span", {
            className: `${classPrefix$L}-required-text`
          }, "(", locale.Form.optional, ")");
        case "none":
          return null;
        default:
          return null;
      }
    })();
    const labelElement = !!label && React$1.createElement("label", {
      className: `${classPrefix$L}-label`,
      htmlFor
    }, label, requiredMark, help && React$1.createElement(Popover, {
      content: help,
      mode: "dark",
      trigger: "click"
    }, React$1.createElement("span", {
      className: `${classPrefix$L}-label-help`,
      onClick: (e2) => {
        e2.preventDefault();
      }
    }, React$1.createElement(QuestionCircleOutline, null))));
    const description = (!!props.description || hasFeedback) && React$1.createElement(React$1.Fragment, null, props.description, hasFeedback && React$1.createElement(React$1.Fragment, null, props.errors.map((error, index2) => React$1.createElement("div", {
      key: `error-${index2}`,
      className: `${classPrefix$L}-feedback-error`
    }, error)), props.warnings.map((warning2, index2) => React$1.createElement("div", {
      key: `warning-${index2}`,
      className: `${classPrefix$L}-feedback-warning`
    }, warning2))));
    return withNativeProps(props, React$1.createElement(List$1.Item, {
      style,
      title: layout === "vertical" && labelElement,
      prefix: layout === "horizontal" && labelElement,
      extra,
      description,
      className: classNames(classPrefix$L, `${classPrefix$L}-${layout}`, {
        [`${classPrefix$L}-hidden`]: hidden,
        [`${classPrefix$L}-has-error`]: props.errors.length
      }),
      disabled,
      onClick: props.onClick,
      clickable: props.clickable,
      arrow: arrow2
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$L}-child`, `${classPrefix$L}-child-position-${childElementPosition}`)
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$L}-child-inner`)
    }, children))));
  };
  const FormItem = (props) => {
    const {
      // 样式相关
      style,
      // FormItem 相关
      label,
      help,
      extra,
      hasFeedback,
      name,
      required,
      noStyle,
      hidden,
      layout,
      childElementPosition,
      description,
      // Field 相关
      disabled,
      rules: rules2,
      children,
      messageVariables,
      trigger = "onChange",
      validateTrigger = trigger,
      onClick,
      shouldUpdate,
      dependencies,
      clickable,
      arrow: arrow2
    } = props, fieldProps = __rest(props, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]);
    const {
      name: formName
    } = React$1.useContext(FormContext);
    const {
      validateTrigger: contextValidateTrigger
    } = React$1.useContext(default_1);
    const mergedValidateTrigger = undefinedFallback(validateTrigger, contextValidateTrigger, trigger);
    const widgetRef = React$1.useRef(null);
    const updateRef2 = React$1.useRef(0);
    updateRef2.current += 1;
    const [subMetas, setSubMetas] = React$1.useState({});
    const onSubMetaChange = React$1.useCallback((subMeta, namePath) => {
      setSubMetas((prevSubMetas) => {
        const nextSubMetas = Object.assign({}, prevSubMetas);
        const nameKey = namePath.join(NAME_SPLIT);
        if (subMeta.destroy) {
          delete nextSubMetas[nameKey];
        } else {
          nextSubMetas[nameKey] = subMeta;
        }
        return nextSubMetas;
      });
    }, [setSubMetas]);
    function renderLayout(baseChildren, fieldId, meta, isRequired) {
      var _a, _b;
      if (noStyle && !hidden) {
        return baseChildren;
      }
      const curErrors = (_a = meta === null || meta === void 0 ? void 0 : meta.errors) !== null && _a !== void 0 ? _a : [];
      const errors = Object.keys(subMetas).reduce((subErrors, key) => {
        var _a2, _b2;
        const errors2 = (_b2 = (_a2 = subMetas[key]) === null || _a2 === void 0 ? void 0 : _a2.errors) !== null && _b2 !== void 0 ? _b2 : [];
        if (errors2.length) {
          subErrors = [...subErrors, ...errors2];
        }
        return subErrors;
      }, curErrors);
      const curWarnings = (_b = meta === null || meta === void 0 ? void 0 : meta.warnings) !== null && _b !== void 0 ? _b : [];
      const warnings = Object.keys(subMetas).reduce((subWarnings, key) => {
        var _a2, _b2;
        const warnings2 = (_b2 = (_a2 = subMetas[key]) === null || _a2 === void 0 ? void 0 : _a2.warnings) !== null && _b2 !== void 0 ? _b2 : [];
        if (warnings2.length) {
          subWarnings = [...subWarnings, ...warnings2];
        }
        return subWarnings;
      }, curWarnings);
      return withNativeProps(props, React$1.createElement(FormItemLayout, {
        style,
        label,
        extra,
        help,
        description,
        required: isRequired,
        disabled,
        hasFeedback,
        htmlFor: fieldId,
        errors,
        warnings,
        onClick: onClick && ((e2) => onClick(e2, widgetRef)),
        hidden,
        layout,
        childElementPosition,
        clickable,
        arrow: arrow2
      }, React$1.createElement(NoStyleItemContext.Provider, {
        value: onSubMetaChange
      }, baseChildren)));
    }
    const isRenderProps = typeof children === "function";
    if (!name && !isRenderProps && !props.dependencies) {
      return renderLayout(children);
    }
    let Variables = {};
    Variables.label = typeof label === "string" ? label : "";
    if (messageVariables) {
      Variables = Object.assign(Object.assign({}, Variables), messageVariables);
    }
    const notifyParentMetaChange = React$1.useContext(NoStyleItemContext);
    const onMetaChange = (meta) => {
      if (noStyle && notifyParentMetaChange) {
        const namePath = meta.name;
        notifyParentMetaChange(meta, namePath);
      }
    };
    return React$1.createElement(WrapperField, Object.assign({}, fieldProps, {
      name,
      shouldUpdate,
      dependencies,
      rules: rules2,
      trigger,
      validateTrigger: mergedValidateTrigger,
      onMetaChange,
      messageVariables: Variables
    }), (control, meta, context) => {
      let childNode = null;
      const isRequired = required !== void 0 ? required : rules2 && rules2.some((rule) => !!(rule && typeof rule === "object" && rule.required));
      const nameList = toArray(name).length && meta ? meta.name : [];
      const fieldId = (nameList.length > 0 && formName ? [formName, ...nameList] : nameList).join("_");
      if (shouldUpdate && dependencies) {
        devWarning("Form.Item", "`shouldUpdate` and `dependencies` shouldn't be used together.");
      }
      if (isRenderProps) {
        if ((shouldUpdate || dependencies) && !name) {
          childNode = children(context);
        } else {
          if (!(shouldUpdate || dependencies)) {
            devWarning("Form.Item", "`children` of render props only work with `shouldUpdate` or `dependencies`.");
          }
          if (name) {
            devWarning("Form.Item", "Do not use `name` with `children` of render props since it's not a field.");
          }
        }
      } else if (dependencies && !name) {
        devWarning("Form.Item", "Must set `name` or use render props when `dependencies` is set.");
      } else if (React$1.isValidElement(children)) {
        if (children.props.defaultValue) {
          devWarning("Form.Item", "`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.");
        }
        const childProps = Object.assign(Object.assign({}, children.props), control);
        if (isSafeSetRefComponent(children)) {
          childProps.ref = (instance) => {
            const originRef = children.ref;
            if (originRef) {
              if (typeof originRef === "function") {
                originRef(instance);
              }
              if ("current" in originRef) {
                originRef.current = instance;
              }
            }
            widgetRef.current = instance;
          };
        }
        if (!childProps.id) {
          childProps.id = fieldId;
        }
        const triggers = /* @__PURE__ */ new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);
        triggers.forEach((eventName) => {
          childProps[eventName] = (...args) => {
            var _a, _b, _c;
            (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
            (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
          };
        });
        childNode = React$1.createElement(MemoInput, {
          value: control[props.valuePropName || "value"],
          update: updateRef2.current
        }, React$1.cloneElement(children, childProps));
      } else {
        if (name) {
          devWarning("Form.Item", "`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.");
        }
        childNode = children;
      }
      return renderLayout(childNode, fieldId, meta, isRequired);
    });
  };
  const FormSubscribe = (props) => {
    const update2 = useUpdate$1();
    const form = React$1.useContext(Context$1);
    const value = form.getFieldsValue(props.to);
    const childNode = React$1.useMemo(() => props.children(value, form), [JSON.stringify(value), props.children]);
    return React$1.createElement(React$1.Fragment, null, childNode, props.to.map((namePath) => React$1.createElement(Watcher, {
      key: namePath.toString(),
      form,
      namePath,
      onChange: update2
    })));
  };
  const Watcher = React$1.memo((props) => {
    const value = useWatch(props.namePath, props.form);
    useIsomorphicUpdateLayoutEffect(() => {
      props.onChange();
    }, [value]);
    return null;
  });
  const index$a = attachPropertiesToComponent(Form, {
    Item: FormItem,
    Subscribe: FormSubscribe,
    Header,
    Array: FormArray,
    useForm,
    useWatch
  });
  const classPrefix$K = `adm-grid`;
  const Grid$1 = (props) => {
    const style = {
      "--columns": props.columns.toString()
    };
    const {
      gap
    } = props;
    if (gap !== void 0) {
      if (Array.isArray(gap)) {
        style["--gap-horizontal"] = toCSSLength(gap[0]);
        style["--gap-vertical"] = toCSSLength(gap[1]);
      } else {
        style["--gap"] = toCSSLength(gap);
      }
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$K,
      style
    }, props.children));
  };
  const GridItem = (p) => {
    const props = mergeProps({
      span: 1
    }, p);
    const itemStyle = {
      "--item-span": props.span
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: `${classPrefix$K}-item`,
      style: itemStyle,
      onClick: props.onClick
    }, props.children));
  };
  const Grid = attachPropertiesToComponent(Grid$1, {
    Item: GridItem
  });
  const useDragAndPinch = createUseGesture([dragAction, pinchAction]);
  const create = () => {
    return [1, 0, 0, 1, 0, 0];
  };
  const getTranslateX = (m) => {
    return m[4];
  };
  const getTranslateY = (m) => {
    return m[5];
  };
  const getScaleX = (m) => {
    return m[0];
  };
  const translate = (m, x, y) => {
    return multiply([1, 0, 0, 1, x, y], m);
  };
  const scale = (m, scaleX, scaleY = scaleX) => {
    return multiply([scaleX, 0, 0, scaleY, 0, 0], m);
  };
  const apply = (m, [ox, oy]) => {
    return [m[0] * ox + m[2] * oy + m[4], m[1] * ox + m[3] * oy + m[5]];
  };
  const multiply = (m1, m2) => {
    return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
  };
  const classPrefix$J = `adm-image-viewer`;
  const Slide = (props) => {
    const {
      dragLockRef,
      maxZoom
    } = props;
    const initialMartix = React$1.useRef([]);
    const controlRef = React$1.useRef(null);
    const imgRef = React$1.useRef(null);
    const [{
      matrix
    }, api] = useSpring(() => ({
      matrix: create(),
      config: {
        tension: 200
      }
    }));
    const controlSize = useSize(controlRef);
    const imgSize = useSize(imgRef);
    const pinchLockRef = React$1.useRef(false);
    const getMinAndMax = (nextMatrix) => {
      if (!controlSize || !imgSize)
        return {
          x: {
            position: 0,
            minX: 0,
            maxX: 0
          },
          y: {
            position: 0,
            minY: 0,
            maxY: 0
          }
        };
      const controlLeft = -controlSize.width / 2;
      const controlTop = -controlSize.height / 2;
      const imgLeft = -imgSize.width / 2;
      const imgTop = -imgSize.height / 2;
      const zoom = getScaleX(nextMatrix);
      const scaledImgWidth = zoom * imgSize.width;
      const scaledImgHeight = zoom * imgSize.height;
      const minX = controlLeft - (scaledImgWidth - controlSize.width);
      const maxX = controlLeft;
      const minY = controlTop - (scaledImgHeight - controlSize.height);
      const maxY = controlTop;
      const [x, y] = apply(nextMatrix, [imgLeft, imgTop]);
      return {
        x: {
          position: x,
          minX,
          maxX
        },
        y: {
          position: y,
          minY,
          maxY
        }
      };
    };
    const getReachBound = (position, min2, max2, buffer = 0) => {
      return [position <= min2 - buffer, position >= max2 + buffer];
    };
    const boundMatrix = (nextMatrix, type, last = false) => {
      if (!controlSize || !imgSize)
        return nextMatrix;
      const zoom = getScaleX(nextMatrix);
      const scaledImgWidth = zoom * imgSize.width;
      const scaledImgHeight = zoom * imgSize.height;
      const {
        x: {
          position: x,
          minX,
          maxX
        },
        y: {
          position: y,
          minY,
          maxY
        }
      } = getMinAndMax(nextMatrix);
      if (type === "translate") {
        let boundedX = x;
        let boundedY = y;
        if (scaledImgWidth > controlSize.width) {
          boundedX = last ? bound(x, minX, maxX) : rubberbandIfOutOfBounds(x, minX, maxX, zoom * 50);
        } else {
          boundedX = -scaledImgWidth / 2;
        }
        if (scaledImgHeight > controlSize.height) {
          boundedY = last ? bound(y, minY, maxY) : rubberbandIfOutOfBounds(y, minY, maxY, zoom * 50);
        } else {
          boundedY = -scaledImgHeight / 2;
        }
        return translate(nextMatrix, boundedX - x, boundedY - y);
      }
      if (type === "scale" && last) {
        const [boundedX, boundedY] = [scaledImgWidth > controlSize.width ? bound(x, minX, maxX) : -scaledImgWidth / 2, scaledImgHeight > controlSize.height ? bound(y, minY, maxY) : -scaledImgHeight / 2];
        return translate(nextMatrix, boundedX - x, boundedY - y);
      }
      return nextMatrix;
    };
    useDragAndPinch({
      onDrag: (state) => {
        var _a;
        if (state.first) {
          const {
            x: {
              position: x,
              minX,
              maxX
            }
          } = getMinAndMax(matrix.get());
          initialMartix.current = getReachBound(x, minX, maxX);
          return;
        }
        if (state.pinching)
          return state.cancel();
        if (state.tap && state.elapsedTime > 0 && state.elapsedTime < 1e3) {
          (_a = props.onTap) === null || _a === void 0 ? void 0 : _a.call(props);
          return;
        }
        const currentZoom = getScaleX(matrix.get());
        if (dragLockRef) {
          dragLockRef.current = currentZoom !== 1;
        }
        if (!pinchLockRef.current && currentZoom <= 1) {
          api.start({
            matrix: create()
          });
        } else {
          const currentMatrix = matrix.get();
          const offset2 = [state.offset[0] - getTranslateX(currentMatrix), state.offset[1] - getTranslateY(currentMatrix)];
          const nextMatrix = translate(currentMatrix, ...state.last ? [offset2[0] + state.velocity[0] * state.direction[0] * 200, offset2[1] + state.velocity[1] * state.direction[1] * 200] : offset2);
          api.start({
            matrix: boundMatrix(nextMatrix, "translate", state.last),
            immediate: !state.last
          });
          const {
            x: {
              position: x,
              minX,
              maxX
            }
          } = getMinAndMax(nextMatrix);
          if (state.last && initialMartix.current.some((i2) => i2) && getReachBound(x, minX, maxX).some((i2) => i2)) {
            if (dragLockRef) {
              dragLockRef.current = false;
            }
            api.start({
              matrix: create()
            });
          }
        }
      },
      onPinch: (state) => {
        var _a;
        pinchLockRef.current = !state.last;
        const [d] = state.offset;
        if (d < 0)
          return;
        let mergedMaxZoom;
        if (maxZoom === "auto") {
          mergedMaxZoom = controlSize && imgSize ? Math.max(controlSize.height / imgSize.height, controlSize.width / imgSize.width) : 1;
        } else {
          mergedMaxZoom = maxZoom;
        }
        const nextZoom = state.last ? bound(d, 1, mergedMaxZoom) : d;
        (_a = props.onZoomChange) === null || _a === void 0 ? void 0 : _a.call(props, nextZoom);
        if (state.last && nextZoom <= 1) {
          api.start({
            matrix: create()
          });
          if (dragLockRef) {
            dragLockRef.current = false;
          }
        } else {
          if (!controlSize)
            return;
          const currentMatrix = matrix.get();
          const currentZoom = getScaleX(currentMatrix);
          const originOffsetX = state.origin[0] - controlSize.width / 2;
          const originOffsetY = state.origin[1] - controlSize.height / 2;
          let nextMatrix = translate(currentMatrix, -originOffsetX, -originOffsetY);
          nextMatrix = scale(nextMatrix, nextZoom / currentZoom);
          nextMatrix = translate(nextMatrix, originOffsetX, originOffsetY);
          api.start({
            matrix: boundMatrix(nextMatrix, "scale", state.last),
            immediate: !state.last
          });
          if (dragLockRef) {
            dragLockRef.current = true;
          }
        }
      }
    }, {
      target: controlRef,
      drag: {
        from: () => [getTranslateX(matrix.get()), getTranslateY(matrix.get())],
        pointer: {
          touch: true
        }
      },
      pinch: {
        from: () => [getScaleX(matrix.get()), 0],
        pointer: {
          touch: true
        }
      }
    });
    return React$1.createElement("div", {
      className: `${classPrefix$J}-slide`
    }, React$1.createElement("div", {
      className: `${classPrefix$J}-control`,
      ref: controlRef
    }, React$1.createElement(animated.div, {
      className: `${classPrefix$J}-image-wrapper`,
      style: {
        matrix
      }
    }, React$1.createElement("img", {
      ref: imgRef,
      src: props.image,
      draggable: false,
      alt: props.image
    }))));
  };
  const classPrefix$I = `adm-image-viewer`;
  const Slides = React$1.forwardRef((props, ref) => {
    const slideWidth = window.innerWidth + convertPx(16);
    const [{
      x
    }, api] = useSpring(() => ({
      x: props.defaultIndex * slideWidth,
      config: {
        tension: 250,
        clamp: true
      }
    }));
    const count = props.images.length;
    function swipeTo(index2, immediate = false) {
      var _a;
      const i2 = bound(index2, 0, count - 1);
      (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, i2);
      api.start({
        x: i2 * slideWidth,
        immediate
      });
    }
    React$1.useImperativeHandle(ref, () => ({
      swipeTo
    }));
    const dragLockRef = React$1.useRef(false);
    const bind = useDrag((state) => {
      if (dragLockRef.current)
        return;
      const [offsetX] = state.offset;
      if (state.last) {
        const minIndex = Math.floor(offsetX / slideWidth);
        const maxIndex = minIndex + 1;
        const velocityOffset = Math.min(state.velocity[0] * 2e3, slideWidth) * state.direction[0];
        swipeTo(bound(Math.round((offsetX + velocityOffset) / slideWidth), minIndex, maxIndex));
      } else {
        api.start({
          x: offsetX,
          immediate: true
        });
      }
    }, {
      transform: ([x2, y]) => [-x2, y],
      from: () => [x.get(), 0],
      bounds: () => ({
        left: 0,
        right: (count - 1) * slideWidth
      }),
      rubberband: true,
      axis: "x",
      pointer: {
        touch: true
      }
    });
    return React$1.createElement("div", Object.assign({
      className: `${classPrefix$I}-slides`
    }, bind()), React$1.createElement(animated.div, {
      className: `${classPrefix$I}-indicator`
    }, x.to((v) => {
      const index2 = bound(Math.round(v / slideWidth), 0, count - 1);
      return `${index2 + 1} / ${count}`;
    })), React$1.createElement(animated.div, {
      className: `${classPrefix$I}-slides-inner`,
      style: {
        x: x.to((x2) => -x2)
      }
    }, props.images.map((image, index2) => React$1.createElement(Slide, {
      key: index2,
      image,
      onTap: props.onTap,
      maxZoom: props.maxZoom,
      onZoomChange: (zoom) => {
        if (zoom !== 1) {
          const index3 = Math.round(x.get() / slideWidth);
          api.start({
            x: index3 * slideWidth
          });
        }
      },
      dragLockRef
    }))));
  });
  const classPrefix$H = `adm-image-viewer`;
  const defaultProps$A = {
    maxZoom: 3,
    getContainer: null,
    visible: false
  };
  const ImageViewer$1 = (p) => {
    var _a, _b, _c;
    const props = mergeProps(defaultProps$A, p);
    const node = React$1.createElement(Mask, {
      visible: props.visible,
      disableBodyScroll: false,
      opacity: "thick",
      afterClose: props.afterClose,
      destroyOnClose: true,
      className: (_a = props === null || props === void 0 ? void 0 : props.classNames) === null || _a === void 0 ? void 0 : _a.mask
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$H}-content`, (_b = props === null || props === void 0 ? void 0 : props.classNames) === null || _b === void 0 ? void 0 : _b.body)
    }, props.image && React$1.createElement(Slide, {
      image: props.image,
      onTap: props.onClose,
      maxZoom: props.maxZoom
    })), props.image && React$1.createElement("div", {
      className: `${classPrefix$H}-footer`
    }, (_c = props.renderFooter) === null || _c === void 0 ? void 0 : _c.call(props, props.image), React$1.createElement(SafeArea, {
      position: "bottom"
    })));
    return renderToContainer(props.getContainer, node);
  };
  const multiDefaultProps = Object.assign(Object.assign({}, defaultProps$A), {
    defaultIndex: 0
  });
  const MultiImageViewer = React$1.forwardRef((p, ref) => {
    var _a, _b, _c;
    const props = mergeProps(multiDefaultProps, p);
    const [index2, setIndex] = React$1.useState(props.defaultIndex);
    const slidesRef = React$1.useRef(null);
    React$1.useImperativeHandle(ref, () => ({
      swipeTo: (index3, immediate) => {
        var _a2;
        setIndex(index3);
        (_a2 = slidesRef.current) === null || _a2 === void 0 ? void 0 : _a2.swipeTo(index3, immediate);
      }
    }));
    const onSlideChange = React$1.useCallback((newIndex) => {
      var _a2;
      if (newIndex === index2)
        return;
      setIndex(newIndex);
      (_a2 = props.onIndexChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, newIndex);
    }, [props.onIndexChange, index2]);
    const node = React$1.createElement(Mask, {
      visible: props.visible,
      disableBodyScroll: false,
      opacity: "thick",
      afterClose: props.afterClose,
      destroyOnClose: true,
      className: (_a = props === null || props === void 0 ? void 0 : props.classNames) === null || _a === void 0 ? void 0 : _a.mask
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$H}-content`, (_b = props === null || props === void 0 ? void 0 : props.classNames) === null || _b === void 0 ? void 0 : _b.body)
    }, props.images && React$1.createElement(Slides, {
      ref: slidesRef,
      defaultIndex: index2,
      onIndexChange: onSlideChange,
      images: props.images,
      onTap: props.onClose,
      maxZoom: props.maxZoom
    })), props.images && React$1.createElement("div", {
      className: `${classPrefix$H}-footer`
    }, (_c = props.renderFooter) === null || _c === void 0 ? void 0 : _c.call(props, props.images[index2], index2), React$1.createElement(SafeArea, {
      position: "bottom"
    })));
    return renderToContainer(props.getContainer, node);
  });
  const handlerSet = /* @__PURE__ */ new Set();
  function showImageViewer(props) {
    clearImageViewer();
    const handler = renderImperatively(React$1.createElement(ImageViewer$1, Object.assign({}, props, {
      afterClose: () => {
        var _a;
        handlerSet.delete(handler);
        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    })));
    handlerSet.add(handler);
    return handler;
  }
  function showMultiImageViewer(props) {
    clearImageViewer();
    const handler = renderImperatively(React$1.createElement(MultiImageViewer, Object.assign({}, props, {
      afterClose: () => {
        var _a;
        handlerSet.delete(handler);
        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    })));
    handlerSet.add(handler);
    return handler;
  }
  function clearImageViewer() {
    handlerSet.forEach((handler) => {
      handler.close();
    });
    handlerSet.clear();
  }
  const Multi = attachPropertiesToComponent(MultiImageViewer, {
    show: showMultiImageViewer
  });
  const ImageViewer = attachPropertiesToComponent(ImageViewer$1, {
    Multi,
    show: showImageViewer,
    clear: clearImageViewer
  });
  const classPrefix$G = `adm-image-uploader`;
  const PreviewItem = (props) => {
    const {
      locale
    } = useConfig();
    const {
      url,
      file,
      deletable,
      deleteIcon,
      onDelete,
      imageFit
    } = props;
    const src = React$1.useMemo(() => {
      if (url) {
        return url;
      }
      if (file) {
        return URL.createObjectURL(file);
      }
      return "";
    }, [url, file]);
    React$1.useEffect(() => {
      return () => {
        if (file)
          URL.revokeObjectURL(src);
      };
    }, [src, file]);
    function renderLoading() {
      return props.status === "pending" && React$1.createElement("div", {
        className: `${classPrefix$G}-cell-mask`
      }, React$1.createElement("span", {
        className: `${classPrefix$G}-cell-loading`
      }, React$1.createElement(SpinLoading, {
        color: "white"
      }), React$1.createElement("span", {
        className: `${classPrefix$G}-cell-mask-message`
      }, locale.ImageUploader.uploading)));
    }
    function renderDelete() {
      return deletable && React$1.createElement("span", {
        className: `${classPrefix$G}-cell-delete`,
        onClick: onDelete
      }, deleteIcon);
    }
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$G}-cell`, props.status === "fail" && `${classPrefix$G}-cell-fail`)
    }, React$1.createElement(Image$1, {
      className: `${classPrefix$G}-cell-image`,
      src,
      fit: imageFit,
      onClick: props.onClick
    }), renderLoading(), renderDelete());
  };
  const PreviewItem$1 = PreviewItem;
  const classPrefix$F = `adm-space`;
  const defaultProps$z = {
    direction: "horizontal"
  };
  const Space = (p) => {
    const props = mergeProps(defaultProps$z, p);
    const {
      direction,
      onClick
    } = props;
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$F, {
        [`${classPrefix$F}-wrap`]: props.wrap,
        [`${classPrefix$F}-block`]: props.block,
        [`${classPrefix$F}-${direction}`]: true,
        [`${classPrefix$F}-align-${props.align}`]: !!props.align,
        [`${classPrefix$F}-justify-${props.justify}`]: !!props.justify
      }),
      onClick
    }, React$1.Children.map(props.children, (child) => {
      return child !== null && child !== void 0 && React$1.createElement("div", {
        className: `${classPrefix$F}-item`
      }, child);
    })));
  };
  const classPrefix$E = `adm-image-uploader`;
  const defaultProps$y = {
    disableUpload: false,
    deletable: true,
    deleteIcon: React$1.createElement(CloseOutline, {
      className: `${classPrefix$E}-cell-delete-icon`
    }),
    showUpload: true,
    multiple: false,
    maxCount: 0,
    defaultValue: [],
    accept: "image/*",
    preview: true,
    showFailed: true,
    imageFit: "cover"
  };
  const ImageUploader = React$1.forwardRef((p, ref) => {
    const {
      locale
    } = useConfig();
    const props = mergeProps(defaultProps$y, p);
    const {
      columns
    } = props;
    const [value, setValue2] = usePropsValue(props);
    const [tasks, setTasks] = React$1.useState([]);
    const containerRef = React$1.useRef(null);
    const containerSize = useSize(containerRef);
    const gapMeasureRef = React$1.useRef(null);
    const [cellSize, setCellSize] = React$1.useState(80);
    const inputRef = React$1.useRef(null);
    useIsomorphicLayoutEffect$2(() => {
      const gapMeasure = gapMeasureRef.current;
      if (columns && containerSize && gapMeasure) {
        const width = containerSize.width;
        const gap = measureCSSLength(window.getComputedStyle(gapMeasure).getPropertyValue("height"));
        setCellSize((width - gap * (columns - 1)) / columns);
      }
    }, [containerSize === null || containerSize === void 0 ? void 0 : containerSize.width]);
    const style = {
      "--cell-size": cellSize + "px"
    };
    useIsomorphicLayoutEffect$2(() => {
      setTasks((prev) => prev.filter((task) => {
        if (task.url === void 0)
          return true;
        return !value.some((fileItem) => fileItem.url === task.url);
      }));
    }, [value]);
    useIsomorphicLayoutEffect$2(() => {
      var _a;
      (_a = props.onUploadQueueChange) === null || _a === void 0 ? void 0 : _a.call(props, tasks.map((item) => ({
        id: item.id,
        status: item.status
      })));
    }, [tasks]);
    const idCountRef = React$1.useRef(0);
    const {
      maxCount,
      onPreview,
      renderItem
    } = props;
    function processFile(file, fileList) {
      return __awaiter(this, void 0, void 0, function* () {
        const {
          beforeUpload
        } = props;
        let transformedFile = file;
        transformedFile = yield beforeUpload === null || beforeUpload === void 0 ? void 0 : beforeUpload(file, fileList);
        return transformedFile;
      });
    }
    function getFinalTasks(tasks2) {
      return props.showFailed ? tasks2 : tasks2.filter((task) => task.status !== "fail");
    }
    function onChange(e2) {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        e2.persist();
        const {
          files: rawFiles
        } = e2.target;
        if (!rawFiles)
          return;
        let files = [].slice.call(rawFiles);
        e2.target.value = "";
        if (props.beforeUpload) {
          const postFiles = files.map((file) => processFile(file, files));
          yield Promise.all(postFiles).then((filesList) => {
            files = filesList.filter(Boolean);
          });
        }
        if (files.length === 0) {
          return;
        }
        if (maxCount > 0) {
          const exceed = value.length + files.length - maxCount;
          if (exceed > 0) {
            files = files.slice(0, files.length - exceed);
            (_a = props.onCountExceed) === null || _a === void 0 ? void 0 : _a.call(props, exceed);
          }
        }
        const newTasks = files.map((file) => ({
          id: idCountRef.current++,
          status: "pending",
          file
        }));
        setTasks((prev) => [...getFinalTasks(prev), ...newTasks]);
        const newVal = [];
        yield Promise.all(newTasks.map((currentTask, index2) => __awaiter(this, void 0, void 0, function* () {
          try {
            const result = yield props.upload(currentTask.file);
            newVal[index2] = result;
            setTasks((prev) => {
              return prev.map((task) => {
                if (task.id === currentTask.id) {
                  return Object.assign(Object.assign({}, task), {
                    status: "success",
                    url: result.url
                  });
                }
                return task;
              });
            });
          } catch (e3) {
            setTasks((prev) => {
              return prev.map((task) => {
                if (task.id === currentTask.id) {
                  return Object.assign(Object.assign({}, task), {
                    status: "fail"
                  });
                }
                return task;
              });
            });
            throw e3;
          }
        }))).catch((error) => console.error(error));
        setValue2((prev) => prev.concat(newVal));
      });
    }
    const imageViewerHandlerRef = React$1.useRef(null);
    function previewImage(index2) {
      imageViewerHandlerRef.current = ImageViewer.Multi.show({
        images: value.map((fileItem) => fileItem.url),
        defaultIndex: index2,
        onClose: () => {
          imageViewerHandlerRef.current = null;
        }
      });
    }
    useUnmount$1(() => {
      var _a;
      (_a = imageViewerHandlerRef.current) === null || _a === void 0 ? void 0 : _a.close();
    });
    const finalTasks = getFinalTasks(tasks);
    const showUpload = props.showUpload && (maxCount === 0 || value.length + finalTasks.length < maxCount);
    const renderImages = () => {
      return value.map((fileItem, index2) => {
        var _a, _b;
        const originNode = React$1.createElement(PreviewItem$1, {
          key: (_a = fileItem.key) !== null && _a !== void 0 ? _a : index2,
          url: (_b = fileItem.thumbnailUrl) !== null && _b !== void 0 ? _b : fileItem.url,
          deletable: props.deletable,
          deleteIcon: props.deleteIcon,
          imageFit: props.imageFit,
          onClick: () => {
            if (props.preview) {
              previewImage(index2);
            }
            onPreview && onPreview(index2, fileItem);
          },
          onDelete: () => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            const canDelete = yield (_c = props.onDelete) === null || _c === void 0 ? void 0 : _c.call(props, fileItem);
            if (canDelete === false)
              return;
            setValue2(value.filter((x, i2) => i2 !== index2));
          })
        });
        return renderItem ? renderItem(originNode, fileItem, value) : originNode;
      });
    };
    const contentNode = React$1.createElement(React$1.Fragment, null, renderImages(), tasks.map((task) => {
      if (!props.showFailed && task.status === "fail") {
        return null;
      }
      return React$1.createElement(PreviewItem$1, {
        key: task.id,
        file: task.file,
        deletable: task.status !== "pending",
        deleteIcon: props.deleteIcon,
        status: task.status,
        imageFit: props.imageFit,
        onDelete: () => {
          setTasks(tasks.filter((x) => x.id !== task.id));
        }
      });
    }), React$1.createElement("div", {
      className: `${classPrefix$E}-upload-button-wrap`,
      style: showUpload ? void 0 : {
        display: "none"
      }
    }, props.children || React$1.createElement("span", {
      className: `${classPrefix$E}-cell ${classPrefix$E}-upload-button`,
      role: "button",
      "aria-label": locale.ImageUploader.upload
    }, React$1.createElement("span", {
      className: `${classPrefix$E}-upload-button-icon`
    }, React$1.createElement(AddOutline, null))), !props.disableUpload && React$1.createElement("input", {
      ref: inputRef,
      capture: props.capture,
      accept: props.accept,
      multiple: props.multiple,
      type: "file",
      className: `${classPrefix$E}-input`,
      onChange,
      "aria-hidden": true
    })));
    React$1.useImperativeHandle(ref, () => ({
      get nativeElement() {
        return inputRef.current;
      }
    }));
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$E,
      ref: containerRef
    }, columns ? React$1.createElement(Grid, {
      className: `${classPrefix$E}-grid`,
      columns,
      style
    }, React$1.createElement("div", {
      className: `${classPrefix$E}-gap-measure`,
      ref: gapMeasureRef
    }), contentNode.props.children) : React$1.createElement(Space, {
      className: `${classPrefix$E}-space`,
      wrap: true,
      block: true
    }, contentNode.props.children)));
  });
  const Panel = () => null;
  const classPrefix$D = `adm-index-bar`;
  const Sidebar = (props) => {
    const [interacting, setInteracting] = React$1.useState(false);
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$D}-sidebar`, {
        [`${classPrefix$D}-sidebar-interacting`]: interacting
      }),
      onMouseDown: () => {
        setInteracting(true);
      },
      onMouseUp: () => {
        setInteracting(false);
      },
      onTouchStart: () => {
        setInteracting(true);
      },
      onTouchEnd: () => {
        setInteracting(false);
      },
      onTouchMove: (e2) => {
        if (!interacting)
          return;
        const {
          clientX,
          clientY
        } = e2.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (!target)
          return;
        const index2 = target.dataset["index"];
        if (index2) {
          props.onActive(index2);
        }
      }
    }, props.indexItems.map(({
      index: index2,
      brief
    }) => {
      const active = index2 === props.activeIndex;
      return React$1.createElement("div", {
        className: `${classPrefix$D}-sidebar-row`,
        onMouseDown: () => {
          props.onActive(index2);
        },
        onTouchStart: () => {
          props.onActive(index2);
        },
        onMouseEnter: () => {
          if (interacting) {
            props.onActive(index2);
          }
        },
        "data-index": index2,
        key: index2
      }, interacting && active && React$1.createElement("div", {
        className: `${classPrefix$D}-sidebar-bubble`
      }, brief), React$1.createElement("div", {
        className: classNames(`${classPrefix$D}-sidebar-item`, {
          [`${classPrefix$D}-sidebar-item-active`]: active
        }),
        "data-index": index2
      }, React$1.createElement("div", null, brief)));
    }));
  };
  const classPrefix$C = `adm-index-bar`;
  const defaultProps$x = {
    sticky: true
  };
  const IndexBar = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$x, p);
    const titleHeight = convertPx(35);
    const bodyRef = React$1.useRef(null);
    const indexItems = [];
    const panels = [];
    traverseReactNode(props.children, (child) => {
      var _a;
      if (!React$1.isValidElement(child))
        return;
      if (child.type !== Panel) {
        devWarning("IndexBar", "The children of `IndexBar` must be `IndexBar.Panel` components.");
        return;
      }
      indexItems.push({
        index: child.props.index,
        brief: (_a = child.props.brief) !== null && _a !== void 0 ? _a : child.props.index.charAt(0)
      });
      panels.push(withNativeProps(child.props, React$1.createElement("div", {
        key: child.props.index,
        "data-index": child.props.index,
        className: `${classPrefix$C}-anchor`
      }, React$1.createElement("div", {
        className: `${classPrefix$C}-anchor-title`
      }, child.props.title || child.props.index), child.props.children)));
    });
    const [activeIndex, setActiveIndex] = React$1.useState(() => {
      const firstItem = indexItems[0];
      return firstItem ? firstItem.index : null;
    });
    React$1.useImperativeHandle(ref, () => ({
      scrollTo
    }));
    function scrollTo(index2) {
      var _a;
      const body = bodyRef.current;
      if (!body)
        return;
      const children = body.children;
      for (let i2 = 0; i2 < children.length; i2++) {
        const panel = children.item(i2);
        if (!panel)
          continue;
        const panelIndex = panel.dataset["index"];
        if (panelIndex === index2) {
          body.scrollTop = panel.offsetTop;
          setActiveIndex(index2);
          activeIndex !== index2 && ((_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, index2));
          return;
        }
      }
    }
    const {
      run: checkActiveIndex
    } = useThrottleFn(() => {
      var _a;
      const body = bodyRef.current;
      if (!body)
        return;
      const scrollTop = body.scrollTop;
      const elements = body.getElementsByClassName(`${classPrefix$C}-anchor`);
      for (let i2 = 0; i2 < elements.length; i2++) {
        const panel = elements.item(i2);
        if (!panel)
          continue;
        const panelIndex = panel.dataset["index"];
        if (!panelIndex)
          continue;
        if (panel.offsetTop + panel.clientHeight - titleHeight > scrollTop) {
          setActiveIndex(panelIndex);
          activeIndex !== panelIndex && ((_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, panelIndex));
          return;
        }
      }
    }, {
      wait: 50,
      trailing: true,
      leading: true
    });
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(`${classPrefix$C}`, {
        [`${classPrefix$C}-sticky`]: props.sticky
      })
    }, React$1.createElement(Sidebar, {
      indexItems,
      activeIndex,
      onActive: (index2) => {
        scrollTo(index2);
      }
    }), React$1.createElement("div", {
      className: `${classPrefix$C}-body`,
      ref: bodyRef,
      onScroll: checkActiveIndex
    }, panels)));
  });
  const index$9 = attachPropertiesToComponent(IndexBar, {
    Panel
  });
  function isWindow(element) {
    return element === window;
  }
  const classPrefix$B = `adm-infinite-scroll`;
  const defaultProps$w = {
    threshold: 250,
    children: (hasMore, failed, retry) => React$1.createElement(InfiniteScrollContent, {
      hasMore,
      failed,
      retry
    })
  };
  const InfiniteScroll = (p) => {
    const props = mergeProps(defaultProps$w, p);
    const [failed, setFailed] = React$1.useState(false);
    const doLoadMore = useLockFn((isRetry) => __awaiter(void 0, void 0, void 0, function* () {
      try {
        yield props.loadMore(isRetry);
      } catch (e2) {
        setFailed(true);
        throw e2;
      }
    }));
    const elementRef = React$1.useRef(null);
    const [flag, setFlag] = React$1.useState({});
    const nextFlagRef = React$1.useRef(flag);
    const [scrollParent, setScrollParent] = React$1.useState();
    const {
      run: check
    } = useThrottleFn(() => __awaiter(void 0, void 0, void 0, function* () {
      if (nextFlagRef.current !== flag)
        return;
      if (!props.hasMore)
        return;
      const element = elementRef.current;
      if (!element)
        return;
      if (!element.offsetParent)
        return;
      const parent = getScrollParent(element);
      setScrollParent(parent);
      if (!parent)
        return;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;
      if (current >= elementTop - props.threshold) {
        const nextFlag = {};
        nextFlagRef.current = nextFlag;
        yield doLoadMore(false);
        setFlag(nextFlag);
      }
    }), {
      wait: 100,
      leading: true,
      trailing: true
    });
    React$1.useEffect(() => {
      check();
    });
    React$1.useEffect(() => {
      const element = elementRef.current;
      if (!element)
        return;
      if (!scrollParent)
        return;
      function onScroll() {
        check();
      }
      scrollParent.addEventListener("scroll", onScroll);
      return () => {
        scrollParent.removeEventListener("scroll", onScroll);
      };
    }, [scrollParent]);
    function retry() {
      return __awaiter(this, void 0, void 0, function* () {
        setFailed(false);
        yield doLoadMore(true);
        setFlag(nextFlagRef.current);
      });
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$B,
      ref: elementRef
    }, typeof props.children === "function" ? props.children(props.hasMore, failed, retry) : props.children));
  };
  const InfiniteScrollContent = (props) => {
    const {
      locale
    } = useConfig();
    if (!props.hasMore) {
      return React$1.createElement("span", null, locale.InfiniteScroll.noMore);
    }
    if (props.failed) {
      return React$1.createElement("span", null, React$1.createElement("span", {
        className: `${classPrefix$B}-failed-text`
      }, locale.InfiniteScroll.failedToLoad), React$1.createElement("a", {
        onClick: () => {
          props.retry();
        }
      }, locale.InfiniteScroll.retry));
    }
    return React$1.createElement(React$1.Fragment, null, React$1.createElement("span", null, locale.common.loading), React$1.createElement(DotLoading, null));
  };
  const classPrefix$A = `adm-input`;
  const defaultProps$v = {
    defaultValue: "",
    onlyShowClearWhenFocus: true
  };
  const Input = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$v, p);
    const [value, setValue2] = usePropsValue(props);
    const [hasFocus, setHasFocus] = React$1.useState(false);
    const compositionStartRef = React$1.useRef(false);
    const nativeInputRef = React$1.useRef(null);
    const {
      locale
    } = useConfig();
    React$1.useImperativeHandle(ref, () => ({
      clear: () => {
        setValue2("");
      },
      focus: () => {
        var _a;
        (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      get nativeElement() {
        return nativeInputRef.current;
      }
    }));
    const handleKeydown = (e2) => {
      var _a;
      if (props.onEnterPress && (e2.code === "Enter" || e2.keyCode === 13)) {
        props.onEnterPress(e2);
      }
      (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e2);
    };
    useIsomorphicLayoutEffect$2(() => {
      var _a;
      if (!props.enterKeyHint)
        return;
      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("enterkeyhint", props.enterKeyHint);
      return () => {
        var _a2;
        (_a2 = nativeInputRef.current) === null || _a2 === void 0 ? void 0 : _a2.removeAttribute("enterkeyhint");
      };
    }, [props.enterKeyHint]);
    function checkValue() {
      let nextValue = value;
      if (props.type === "number") {
        const boundValue = nextValue && bound(parseFloat(nextValue), props.min, props.max).toString();
        if (Number(nextValue) !== Number(boundValue)) {
          nextValue = boundValue;
        }
      }
      if (nextValue !== value) {
        setValue2(nextValue);
      }
    }
    const shouldShowClear = (() => {
      if (!props.clearable || !value || props.readOnly)
        return false;
      if (props.onlyShowClearWhenFocus) {
        return hasFocus;
      } else {
        return true;
      }
    })();
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(`${classPrefix$A}`, props.disabled && `${classPrefix$A}-disabled`)
    }, React$1.createElement("input", {
      ref: nativeInputRef,
      className: `${classPrefix$A}-element`,
      value,
      onChange: (e2) => {
        setValue2(e2.target.value);
      },
      onFocus: (e2) => {
        var _a;
        setHasFocus(true);
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onBlur: (e2) => {
        var _a;
        setHasFocus(false);
        checkValue();
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      id: props.id,
      placeholder: props.placeholder,
      disabled: props.disabled,
      readOnly: props.readOnly,
      maxLength: props.maxLength,
      minLength: props.minLength,
      max: props.max,
      min: props.min,
      autoComplete: props.autoComplete,
      autoFocus: props.autoFocus,
      pattern: props.pattern,
      inputMode: props.inputMode,
      type: props.type,
      name: props.name,
      autoCapitalize: props.autoCapitalize,
      autoCorrect: props.autoCorrect,
      onKeyDown: handleKeydown,
      onKeyUp: props.onKeyUp,
      onCompositionStart: (e2) => {
        var _a;
        compositionStartRef.current = true;
        (_a = props.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onCompositionEnd: (e2) => {
        var _a;
        compositionStartRef.current = false;
        (_a = props.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onClick: props.onClick,
      step: props.step,
      role: props.role,
      "aria-valuenow": props["aria-valuenow"],
      "aria-valuemax": props["aria-valuemax"],
      "aria-valuemin": props["aria-valuemin"],
      "aria-label": props["aria-label"]
    }), shouldShowClear && React$1.createElement("div", {
      className: `${classPrefix$A}-clear`,
      onMouseDown: (e2) => {
        e2.preventDefault();
      },
      onClick: () => {
        var _a, _b;
        setValue2("");
        (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
        if (isIOS() && compositionStartRef.current) {
          compositionStartRef.current = false;
          (_b = nativeInputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
      },
      "aria-label": locale.Input.clear
    }, React$1.createElement(CloseCircleFill, null))));
  });
  const classPrefix$z = `adm-jumbo-tabs`;
  const JumboTab = () => {
    return null;
  };
  const JumboTabs = (props) => {
    var _a;
    const tabListContainerRef = React$1.useRef(null);
    const rootRef = React$1.useRef(null);
    const keyToIndexRecord = {};
    let firstActiveKey = null;
    const panes = [];
    traverseReactNode(props.children, (child, index2) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      if (index2 === 0) {
        firstActiveKey = key;
      }
      const length = panes.push(child);
      keyToIndexRecord[key] = length - 1;
    });
    const [activeKey, setActiveKey] = usePropsValue({
      value: props.activeKey,
      defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
      onChange: (v) => {
        var _a2;
        if (v === null)
          return;
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
      }
    });
    const {
      scrollLeft,
      animate
    } = useTabListScroll(tabListContainerRef, keyToIndexRecord[activeKey]);
    useResizeEffect(() => {
      animate(true);
    }, rootRef);
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$z,
      ref: rootRef
    }, React$1.createElement("div", {
      className: `${classPrefix$z}-header`
    }, React$1.createElement(ScrollMask, {
      scrollTrackRef: tabListContainerRef
    }), React$1.createElement(animated.div, {
      className: `${classPrefix$z}-tab-list`,
      ref: tabListContainerRef,
      scrollLeft
    }, panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
      key: pane.key,
      className: `${classPrefix$z}-tab-wrapper`
    }, React$1.createElement("div", {
      onClick: () => {
        const {
          key
        } = pane;
        if (pane.props.disabled)
          return;
        if (key === void 0 || key === null) {
          return;
        }
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$z}-tab`, {
        [`${classPrefix$z}-tab-active`]: pane.key === activeKey,
        [`${classPrefix$z}-tab-disabled`]: pane.props.disabled
      })
    }, React$1.createElement("div", {
      className: `${classPrefix$z}-tab-title`
    }, pane.props.title), React$1.createElement("div", {
      className: `${classPrefix$z}-tab-description`
    }, pane.props.description))))))), panes.map((pane) => {
      if (pane.props.children === void 0) {
        return null;
      }
      const active = pane.key === activeKey;
      return React$1.createElement(ShouldRender, {
        key: pane.key,
        active,
        forceRender: pane.props.forceRender,
        destroyOnClose: pane.props.destroyOnClose
      }, React$1.createElement("div", {
        className: `${classPrefix$z}-content`,
        style: {
          display: active ? "block" : "none"
        }
      }, pane.props.children));
    })));
  };
  const index$8 = attachPropertiesToComponent(JumboTabs, {
    Tab: JumboTab
  });
  const ModalActionButton = (props) => {
    const {
      action
    } = props;
    return withNativeProps(props.action, React$1.createElement(Button, {
      key: action.key,
      onClick: props.onAction,
      className: classNames("adm-modal-button", {
        "adm-modal-button-primary": props.action.primary
      }),
      fill: props.action.primary ? "solid" : "none",
      size: props.action.primary ? "large" : "middle",
      block: true,
      color: action.danger ? "danger" : "primary",
      loading: "auto",
      disabled: action.disabled
    }, action.text));
  };
  const defaultProps$u = {
    actions: [],
    closeOnAction: false,
    closeOnMaskClick: false,
    getContainer: null
  };
  const Modal = (p) => {
    const props = mergeProps(defaultProps$u, p);
    const element = React$1.createElement(React$1.Fragment, null, !!props.image && React$1.createElement("div", {
      className: cls("image-container")
    }, React$1.createElement(Image$1, {
      src: props.image,
      alt: "modal header image",
      width: "100%"
    })), !!props.header && React$1.createElement("div", {
      className: cls("header")
    }, React$1.createElement(AutoCenter, null, props.header)), !!props.title && React$1.createElement("div", {
      className: cls("title")
    }, props.title), React$1.createElement("div", {
      className: cls("content")
    }, typeof props.content === "string" ? React$1.createElement(AutoCenter, null, props.content) : props.content), React$1.createElement(Space, {
      direction: "vertical",
      block: true,
      className: classNames(cls("footer"), props.actions.length === 0 && cls("footer-empty"))
    }, props.actions.map((action, index2) => React$1.createElement(ModalActionButton, {
      key: action.key,
      action,
      onAction: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index2)]);
        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    }))));
    return React$1.createElement(CenterPopup, {
      className: classNames(cls(), props.className),
      style: props.style,
      afterClose: props.afterClose,
      afterShow: props.afterShow,
      showCloseButton: props.showCloseButton,
      closeOnMaskClick: props.closeOnMaskClick,
      onClose: props.onClose,
      visible: props.visible,
      getContainer: props.getContainer,
      bodyStyle: props.bodyStyle,
      bodyClassName: classNames(cls("body"), props.image && cls("with-image"), props.bodyClassName),
      maskStyle: props.maskStyle,
      maskClassName: props.maskClassName,
      stopPropagation: props.stopPropagation,
      disableBodyScroll: props.disableBodyScroll,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender
    }, element);
  };
  function cls(name = "") {
    return "adm-modal" + (name && "-") + name;
  }
  const closeFnSet = /* @__PURE__ */ new Set();
  function show$1(props) {
    const handler = renderImperatively(React$1.createElement(Modal, Object.assign({}, props, {
      afterClose: () => {
        var _a;
        closeFnSet.delete(handler.close);
        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    })));
    closeFnSet.add(handler.close);
    return handler;
  }
  function alert(p) {
    const defaultProps2 = {
      confirmText: getDefaultConfig().locale.Modal.ok
    };
    const props = mergeProps(defaultProps2, p);
    return new Promise((resolve) => {
      show$1(Object.assign(Object.assign({}, props), {
        closeOnAction: true,
        actions: [{
          key: "confirm",
          text: props.confirmText,
          primary: true
        }],
        onAction: props.onConfirm,
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve();
        }
      }));
    });
  }
  const defaultProps$t = {
    confirmText: "确认",
    cancelText: "取消"
  };
  function confirm(p) {
    const {
      locale
    } = getDefaultConfig();
    const props = mergeProps(defaultProps$t, {
      confirmText: locale.common.confirm,
      cancelText: locale.common.cancel
    }, p);
    return new Promise((resolve) => {
      show$1(Object.assign(Object.assign({}, props), {
        closeOnAction: true,
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve(false);
        },
        actions: [{
          key: "confirm",
          text: props.confirmText,
          primary: true,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props);
            resolve(true);
          })
        }, {
          key: "cancel",
          text: props.cancelText,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            yield (_b = props.onCancel) === null || _b === void 0 ? void 0 : _b.call(props);
            resolve(false);
          })
        }]
      }));
    });
  }
  function clear$1() {
    closeFnSet.forEach((close) => {
      close();
    });
  }
  const index$7 = attachPropertiesToComponent(Modal, {
    show: show$1,
    alert,
    confirm,
    clear: clear$1
  });
  const classPrefix$y = `adm-nav-bar`;
  const defaultProps$s = {
    backArrow: true
  };
  const NavBar = (p) => {
    const props = mergeProps(defaultProps$s, p);
    const {
      back,
      backArrow
    } = props;
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$y)
    }, React$1.createElement("div", {
      className: `${classPrefix$y}-left`,
      role: "button"
    }, back !== null && React$1.createElement("div", {
      className: `${classPrefix$y}-back`,
      onClick: props.onBack
    }, backArrow && React$1.createElement("span", {
      className: `${classPrefix$y}-back-arrow`
    }, backArrow === true ? React$1.createElement(LeftOutline, null) : backArrow), React$1.createElement("span", {
      "aria-hidden": "true"
    }, back)), props.left), React$1.createElement("div", {
      className: `${classPrefix$y}-title`
    }, props.children), React$1.createElement("div", {
      className: `${classPrefix$y}-right`
    }, props.right)));
  };
  const classPrefix$x = `adm-notice-bar`;
  const defaultProps$r = {
    color: "default",
    delay: 2e3,
    speed: 50,
    wrap: false,
    icon: React$1.createElement(SoundOutline, null)
  };
  const NoticeBar = React$1.memo((p) => {
    const props = mergeProps(defaultProps$r, p);
    const containerRef = React$1.useRef(null);
    const textRef = React$1.useRef(null);
    const [visible, setVisible] = React$1.useState(true);
    const speed = props.speed;
    const delayLockRef = React$1.useRef(true);
    const animatingRef = React$1.useRef(false);
    function start2() {
      if (delayLockRef.current || props.wrap)
        return;
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text)
        return;
      if (container.offsetWidth >= text.offsetWidth) {
        animatingRef.current = false;
        text.style.removeProperty("transition-duration");
        text.style.removeProperty("transform");
        return;
      }
      if (animatingRef.current)
        return;
      const initial = !text.style.transform;
      text.style.transitionDuration = "0s";
      if (initial) {
        text.style.transform = "translateX(0)";
      } else {
        text.style.transform = `translateX(${container.offsetWidth}px)`;
      }
      const distance = initial ? text.offsetWidth : container.offsetWidth + text.offsetWidth;
      animatingRef.current = true;
      text.style.transitionDuration = `${Math.round(distance / speed)}s`;
      text.style.transform = `translateX(-${text.offsetWidth}px)`;
    }
    useTimeout$1(() => {
      delayLockRef.current = false;
      start2();
    }, props.delay);
    useResizeEffect(() => {
      start2();
    }, containerRef);
    useMutationEffect(() => {
      start2();
    }, textRef, {
      subtree: true,
      childList: true,
      characterData: true
    });
    if (!visible)
      return null;
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$x, `${classPrefix$x}-${props.color}`, {
        [`${classPrefix$x}-wrap`]: props.wrap
      }),
      onClick: props.onClick
    }, props.icon && React$1.createElement("span", {
      className: `${classPrefix$x}-left`
    }, props.icon), React$1.createElement("span", {
      ref: containerRef,
      className: `${classPrefix$x}-content`
    }, React$1.createElement("span", {
      onTransitionEnd: () => {
        animatingRef.current = false;
        start2();
      },
      ref: textRef,
      className: `${classPrefix$x}-content-inner`
    }, props.content)), (props.closeable || props.extra) && React$1.createElement("span", {
      className: `${classPrefix$x}-right`
    }, props.extra, props.closeable && React$1.createElement("div", {
      className: `${classPrefix$x}-close`,
      onClick: () => {
        var _a;
        setVisible(false);
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    }, React$1.createElement(CloseOutline, {
      className: `${classPrefix$x}-close-icon`
    })))));
  });
  function shuffle(array) {
    const result = [...array];
    for (let i2 = result.length; i2 > 0; i2--) {
      const j = Math.floor(Math.random() * i2);
      [result[i2 - 1], result[j]] = [result[j], result[i2 - 1]];
    }
    return result;
  }
  const classPrefix$w = "adm-number-keyboard";
  const defaultProps$q = {
    defaultVisible: false,
    randomOrder: false,
    showCloseButton: true,
    confirmText: null,
    closeOnConfirm: true,
    safeArea: true,
    destroyOnClose: false,
    forceRender: false
  };
  const NumberKeyboard = (p) => {
    const props = mergeProps(defaultProps$q, p);
    const {
      visible,
      title,
      getContainer,
      confirmText,
      customKey,
      randomOrder,
      showCloseButton,
      onInput
    } = props;
    const {
      locale
    } = useConfig();
    const keyboardRef = React$1.useRef(null);
    const keys2 = React$1.useMemo(() => {
      const defaultKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const keyList = randomOrder ? shuffle(defaultKeys) : defaultKeys;
      const customKeys = Array.isArray(customKey) ? customKey : [customKey];
      keyList.push("0");
      if (confirmText) {
        if (customKeys.length === 2) {
          keyList.splice(9, 0, customKeys.pop());
        }
        keyList.push(customKeys[0] || "");
      } else {
        keyList.splice(9, 0, customKeys[0] || "");
        keyList.push(customKeys[1] || "BACKSPACE");
      }
      return keyList;
    }, [customKey, confirmText, randomOrder, randomOrder && visible]);
    const timeoutRef = React$1.useRef(-1);
    const intervalRef = React$1.useRef(-1);
    const onDelete = useMemoizedFn(() => {
      var _a;
      (_a = props.onDelete) === null || _a === void 0 ? void 0 : _a.call(props);
    });
    const onBackspacePressStart = () => {
      timeoutRef.current = window.setTimeout(() => {
        onDelete();
        intervalRef.current = window.setInterval(onDelete, 150);
      }, 700);
    };
    const onBackspacePressEnd = () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
    const onKeyPress = (e2, key) => {
      var _a, _b;
      e2.preventDefault();
      switch (key) {
        case "BACKSPACE":
          onDelete === null || onDelete === void 0 ? void 0 : onDelete();
          break;
        case "OK":
          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props);
          if (props.closeOnConfirm) {
            (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
          }
          break;
        default:
          if (key !== "")
            onInput === null || onInput === void 0 ? void 0 : onInput(key);
          break;
      }
    };
    const renderHeader = () => {
      if (!showCloseButton && !title)
        return null;
      return React$1.createElement("div", {
        className: classNames(`${classPrefix$w}-header`, {
          [`${classPrefix$w}-header-with-title`]: !!title
        })
      }, !!title && React$1.createElement("div", {
        className: `${classPrefix$w}-title`,
        "aria-label": title
      }, title), showCloseButton && React$1.createElement("span", {
        className: `${classPrefix$w}-header-close-button`,
        onClick: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        },
        role: "button",
        title: locale.common.close,
        tabIndex: -1
      }, React$1.createElement(DownOutline, null)));
    };
    const renderKey = (key, index2) => {
      const isNumberKey = /^\d$/.test(key);
      const className = classNames(`${classPrefix$w}-key`, {
        [`${classPrefix$w}-key-number`]: isNumberKey,
        [`${classPrefix$w}-key-sign`]: !isNumberKey && key,
        [`${classPrefix$w}-key-mid`]: index2 === 9 && !!confirmText && keys2.length < 12
      });
      const ariaProps = key ? {
        role: "button",
        title: key,
        tabIndex: -1
      } : void 0;
      return React$1.createElement("div", Object.assign({
        key,
        className,
        onTouchStart: () => {
          if (key === "BACKSPACE") {
            onBackspacePressStart();
          }
        },
        onTouchEnd: (e2) => {
          onKeyPress(e2, key);
          if (key === "BACKSPACE") {
            onBackspacePressEnd();
          }
        }
      }, ariaProps), key === "BACKSPACE" ? React$1.createElement(TextDeletionOutline, null) : key);
    };
    return React$1.createElement(Popup, {
      visible,
      getContainer,
      mask: false,
      afterClose: props.afterClose,
      afterShow: props.afterShow,
      className: `${classPrefix$w}-popup`,
      stopPropagation: props.stopPropagation,
      destroyOnClose: props.destroyOnClose,
      forceRender: props.forceRender
    }, withNativeProps(props, React$1.createElement("div", {
      ref: keyboardRef,
      className: classPrefix$w,
      onMouseDown: (e2) => {
        e2.preventDefault();
      }
    }, renderHeader(), React$1.createElement("div", {
      className: `${classPrefix$w}-wrapper`
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$w}-main`, {
        [`${classPrefix$w}-main-confirmed-style`]: !!confirmText
      })
    }, keys2.map(renderKey)), !!confirmText && React$1.createElement("div", {
      className: `${classPrefix$w}-confirm`
    }, React$1.createElement("div", {
      className: `${classPrefix$w}-key ${classPrefix$w}-key-extra ${classPrefix$w}-key-bs`,
      onTouchStart: () => {
        onBackspacePressStart();
      },
      onTouchEnd: (e2) => {
        onKeyPress(e2, "BACKSPACE");
        onBackspacePressEnd();
      },
      onContextMenu: (e2) => {
        e2.preventDefault();
      },
      title: locale.Input.clear,
      role: "button",
      tabIndex: -1
    }, React$1.createElement(TextDeletionOutline, null)), React$1.createElement("div", {
      className: `${classPrefix$w}-key ${classPrefix$w}-key-extra ${classPrefix$w}-key-ok`,
      onTouchEnd: (e2) => onKeyPress(e2, "OK"),
      role: "button",
      tabIndex: -1,
      "aria-label": confirmText
    }, confirmText))), props.safeArea && React$1.createElement("div", {
      className: `${classPrefix$w}-footer`
    }, React$1.createElement(SafeArea, {
      position: "bottom"
    })))));
  };
  const classPrefix$v = `adm-page-indicator`;
  const defaultProps$p = {
    color: "primary",
    direction: "horizontal"
  };
  const PageIndicator = React$1.memo((p) => {
    const props = mergeProps(defaultProps$p, p);
    const dots = [];
    for (let i2 = 0; i2 < props.total; i2++) {
      dots.push(React$1.createElement("div", {
        key: i2,
        className: classNames(`${classPrefix$v}-dot`, {
          [`${classPrefix$v}-dot-active`]: props.current === i2
        })
      }));
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$v, `${classPrefix$v}-${props.direction}`, `${classPrefix$v}-color-${props.color}`)
    }, dots));
  });
  const classPrefix$u = "adm-passcode-input";
  const defaultProps$o = {
    defaultValue: "",
    length: 6,
    plain: false,
    error: false,
    seperated: false,
    caret: true
  };
  const PasscodeInput = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$o, p);
    const cellLength = props.length > 0 && props.length < Infinity ? Math.floor(props.length) : defaultProps$o.length;
    const {
      locale
    } = useConfig();
    const [focused, setFocused] = React$1.useState(false);
    const [value, setValue2] = usePropsValue(props);
    const rootRef = React$1.useRef(null);
    const nativeInputRef = React$1.useRef(null);
    React$1.useEffect(() => {
      var _a;
      if (value.length >= cellLength) {
        (_a = props.onFill) === null || _a === void 0 ? void 0 : _a.call(props, value);
      }
    }, [value, cellLength]);
    const onFocus = () => {
      var _a, _b;
      if (!props.keyboard) {
        (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      }
      setFocused(true);
      (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props);
    };
    React$1.useEffect(() => {
      if (!focused)
        return;
      const timeout = window.setTimeout(() => {
        var _a;
        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "smooth"
        });
      }, 100);
      return () => {
        window.clearTimeout(timeout);
      };
    }, [focused]);
    const onBlur = () => {
      var _a;
      setFocused(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    React$1.useImperativeHandle(ref, () => ({
      focus: () => {
        var _a;
        return (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a, _b;
        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        (_b = nativeInputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
      }
    }));
    const renderCells = () => {
      const cells = [];
      const chars = value.split("");
      const caretIndex = chars.length;
      const focusedIndex = bound(chars.length, 0, cellLength - 1);
      for (let i2 = 0; i2 < cellLength; i2++) {
        cells.push(React$1.createElement("div", {
          className: classNames(`${classPrefix$u}-cell`, {
            [`${classPrefix$u}-cell-caret`]: props.caret && caretIndex === i2 && focused,
            [`${classPrefix$u}-cell-focused`]: focusedIndex === i2 && focused,
            [`${classPrefix$u}-cell-dot`]: !props.plain && chars[i2]
          }),
          key: i2
        }, chars[i2] && props.plain ? chars[i2] : ""));
      }
      return cells;
    };
    const cls2 = classNames(classPrefix$u, {
      [`${classPrefix$u}-focused`]: focused,
      [`${classPrefix$u}-error`]: props.error,
      [`${classPrefix$u}-seperated`]: props.seperated
    });
    return React$1.createElement(React$1.Fragment, null, withNativeProps(props, React$1.createElement("div", {
      ref: rootRef,
      tabIndex: 0,
      className: cls2,
      onFocus,
      onBlur,
      role: "button",
      "aria-label": locale.PasscodeInput.name
    }, React$1.createElement("div", {
      className: `${classPrefix$u}-cell-container`
    }, renderCells()), React$1.createElement("input", {
      ref: nativeInputRef,
      className: `${classPrefix$u}-native-input`,
      value,
      type: "text",
      pattern: "[0-9]*",
      inputMode: "numeric",
      onChange: (e2) => {
        setValue2(e2.target.value.slice(0, props.length));
      },
      "aria-hidden": true
    }))), props.keyboard && React$1.cloneElement(props.keyboard, {
      visible: focused,
      onInput: (v) => {
        if (value.length < cellLength) {
          setValue2((value + v).slice(0, props.length));
        }
      },
      onDelete: () => {
        setValue2(value.slice(0, -1));
      },
      onClose: () => {
        var _a;
        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    }));
  });
  const classPrefix$t = `adm-progress-bar`;
  const defaultProps$n = {
    percent: 0,
    rounded: true,
    text: false
  };
  const ProgressBar = (p) => {
    const props = mergeProps(defaultProps$n, p);
    const fillStyle = {
      width: `${props.percent}%`
    };
    const textElement = function() {
      if (props.text === true) {
        return `${props.percent}%`;
      }
      if (typeof props.text === "function") {
        return props.text(props.percent);
      }
      return props.text;
    }();
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$t, props.rounded && `${classPrefix$t}-rounded`)
    }, React$1.createElement("div", {
      className: `${classPrefix$t}-trail`
    }, React$1.createElement("div", {
      className: `${classPrefix$t}-fill`,
      style: fillStyle
    })), isNodeWithContent(textElement) && React$1.createElement("div", {
      className: `${classPrefix$t}-text`
    }, textElement)));
  };
  const classPrefix$s = `adm-progress-circle`;
  const ProgressCircle = (p) => {
    const props = mergeProps({
      percent: 0
    }, p);
    const style = {
      "--percent": props.percent.toString()
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: `${classPrefix$s}`,
      style
    }, React$1.createElement("div", {
      className: `${classPrefix$s}-content`
    }, React$1.createElement("svg", {
      className: `${classPrefix$s}-svg`
    }, React$1.createElement("circle", {
      className: `${classPrefix$s}-track`,
      fill: "transparent"
    }), React$1.createElement("circle", {
      className: `${classPrefix$s}-fill`,
      fill: "transparent"
    })), React$1.createElement("div", {
      className: `${classPrefix$s}-info`
    }, props.children))));
  };
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const classPrefix$r = `adm-pull-to-refresh`;
  const defaultProps$m = {
    pullingText: "下拉刷新",
    canReleaseText: "释放立即刷新",
    refreshingText: "加载中...",
    completeText: "刷新成功",
    completeDelay: 500,
    disabled: false,
    onRefresh: () => {
    }
  };
  const PullToRefresh = (p) => {
    var _a, _b;
    const {
      locale
    } = useConfig();
    const props = mergeProps(defaultProps$m, {
      refreshingText: `${locale.common.loading}...`,
      pullingText: locale.PullToRefresh.pulling,
      canReleaseText: locale.PullToRefresh.canRelease,
      completeText: locale.PullToRefresh.complete
    }, p);
    const headHeight = (_a = props.headHeight) !== null && _a !== void 0 ? _a : convertPx(40);
    const threshold = (_b = props.threshold) !== null && _b !== void 0 ? _b : convertPx(60);
    const [status, setStatus] = React$1.useState("pulling");
    const [springStyles, api] = useSpring(() => ({
      from: {
        height: 0
      },
      config: {
        tension: 300,
        friction: 30,
        round: true,
        clamp: true
      }
    }));
    const elementRef = React$1.useRef(null);
    const pullingRef = React$1.useRef(false);
    React$1.useEffect(() => {
      var _a2;
      (_a2 = elementRef.current) === null || _a2 === void 0 ? void 0 : _a2.addEventListener("touchmove", () => {
      });
    }, []);
    const reset = () => {
      return new Promise((resolve) => {
        api.start({
          to: {
            height: 0
          },
          onResolve() {
            setStatus("pulling");
            resolve();
          }
        });
      });
    };
    function doRefresh() {
      return __awaiter(this, void 0, void 0, function* () {
        api.start({
          height: headHeight
        });
        setStatus("refreshing");
        try {
          yield props.onRefresh();
          setStatus("complete");
        } catch (e2) {
          reset();
          throw e2;
        }
        if (props.completeDelay > 0) {
          yield sleep(props.completeDelay);
        }
        reset();
      });
    }
    useDrag((state) => {
      if (status === "refreshing" || status === "complete")
        return;
      const {
        event
      } = state;
      if (state.last) {
        pullingRef.current = false;
        if (status === "canRelease") {
          doRefresh();
        } else {
          api.start({
            height: 0
          });
        }
        return;
      }
      const [, y] = state.movement;
      const parsedY = Math.ceil(y);
      if (state.first && parsedY > 0) {
        let getScrollTop = function(element) {
          return "scrollTop" in element ? element.scrollTop : element.scrollY;
        };
        const target = state.event.target;
        if (!target || !(target instanceof Element))
          return;
        let scrollParent = getScrollParent(target);
        while (true) {
          if (!scrollParent)
            return;
          const scrollTop = getScrollTop(scrollParent);
          if (scrollTop > 0) {
            return;
          }
          if (scrollParent instanceof Window) {
            break;
          }
          scrollParent = getScrollParent(scrollParent.parentNode);
        }
        pullingRef.current = true;
      }
      if (!pullingRef.current)
        return;
      if (event.cancelable) {
        event.preventDefault();
      }
      event.stopPropagation();
      const height = Math.max(rubberbandIfOutOfBounds(parsedY, 0, 0, headHeight * 5, 0.5), 0);
      api.start({
        height
      });
      setStatus(height > threshold ? "canRelease" : "pulling");
    }, {
      pointer: {
        touch: true
      },
      axis: "y",
      target: elementRef,
      enabled: !props.disabled,
      eventOptions: supportsPassive ? {
        passive: false
      } : void 0
    });
    const renderStatusText = () => {
      var _a2;
      if (props.renderText) {
        return (_a2 = props.renderText) === null || _a2 === void 0 ? void 0 : _a2.call(props, status);
      }
      if (status === "pulling")
        return props.pullingText;
      if (status === "canRelease")
        return props.canReleaseText;
      if (status === "refreshing")
        return props.refreshingText;
      if (status === "complete")
        return props.completeText;
    };
    return React$1.createElement(animated.div, {
      ref: elementRef,
      className: classPrefix$r
    }, React$1.createElement(animated.div, {
      style: springStyles,
      className: `${classPrefix$r}-head`
    }, React$1.createElement("div", {
      className: `${classPrefix$r}-head-content`,
      style: {
        height: headHeight
      }
    }, renderStatusText())), React$1.createElement("div", {
      className: `${classPrefix$r}-content`
    }, props.children));
  };
  const RadioGroupContext = React$1.createContext(null);
  const defaultProps$l = {
    disabled: false,
    defaultValue: null
  };
  const Group = (p) => {
    const props = mergeProps(defaultProps$l, p);
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: props.defaultValue,
      onChange: (v) => {
        var _a;
        if (v === null)
          return;
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
      }
    });
    return React$1.createElement(
      RadioGroupContext.Provider,
      {
        // TODO: 性能优化
        value: {
          value: value === null ? [] : [value],
          check: (v) => {
            setValue2(v);
          },
          uncheck: () => {
          },
          disabled: props.disabled
        }
      },
      props.children
    );
  };
  const classPrefix$q = `adm-radio`;
  const defaultProps$k = {
    defaultChecked: false
  };
  const Radio = (p) => {
    const props = mergeProps(defaultProps$k, p);
    const groupContext = React$1.useContext(RadioGroupContext);
    let [checked, setChecked] = usePropsValue({
      value: props.checked,
      defaultValue: props.defaultChecked,
      onChange: props.onChange
    });
    let disabled = props.disabled;
    const {
      value
    } = props;
    if (groupContext && value !== void 0) {
      {
        if (p.checked !== void 0) {
          devWarning("Radio", "When used within `Radio.Group`, the `checked` prop of `Radio` will not work.");
        }
        if (p.defaultChecked !== void 0) {
          devWarning("Radio", "When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.");
        }
      }
      checked = groupContext.value.includes(value);
      setChecked = (innerChecked) => {
        var _a;
        if (innerChecked) {
          groupContext.check(value);
        } else {
          groupContext.uncheck(value);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, innerChecked);
      };
      disabled = disabled || groupContext.disabled;
    }
    const renderIcon = () => {
      if (props.icon) {
        return React$1.createElement("div", {
          className: `${classPrefix$q}-custom-icon`
        }, props.icon(checked));
      }
      return React$1.createElement("div", {
        className: `${classPrefix$q}-icon`
      }, checked && React$1.createElement(CheckIcon, null));
    };
    return withNativeProps(props, React$1.createElement("label", {
      onClick: props.onClick,
      className: classNames(classPrefix$q, {
        [`${classPrefix$q}-checked`]: checked,
        [`${classPrefix$q}-disabled`]: disabled,
        [`${classPrefix$q}-block`]: props.block
      })
    }, React$1.createElement(NativeInput, {
      type: "radio",
      checked,
      onChange: setChecked,
      disabled,
      id: props.id
    }), renderIcon(), props.children && React$1.createElement("div", {
      className: `${classPrefix$q}-content`
    }, props.children)));
  };
  const index$6 = attachPropertiesToComponent(Radio, {
    Group
  });
  const Star = () => {
    return React$1.createElement("svg", {
      viewBox: "0 0 42 40",
      height: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        verticalAlign: "-0.125em"
      }
    }, React$1.createElement("path", {
      d: "m21 34-10.52 5.53a2 2 0 0 1-2.902-2.108l2.01-11.714-8.511-8.296a2 2 0 0 1 1.108-3.411l11.762-1.71 5.26-10.657a2 2 0 0 1 3.586 0l5.26 10.658L39.815 14a2 2 0 0 1 1.108 3.411l-8.51 8.296 2.009 11.714a2 2 0 0 1-2.902 2.109L21 34Z",
      fill: "currentColor",
      fillRule: "evenodd"
    }));
  };
  const classPrefix$p = `adm-rate`;
  const defaultProps$j = {
    count: 5,
    allowHalf: false,
    character: React$1.createElement(Star, null),
    defaultValue: 0,
    readOnly: false,
    allowClear: true
  };
  const Rate = (p) => {
    const props = mergeProps(defaultProps$j, p);
    const [value, setValue2] = usePropsValue(props);
    const containerRef = React$1.useRef(null);
    const starList = Array(props.count).fill(null);
    function renderStar(v, half) {
      return React$1.createElement("div", {
        className: classNames(`${classPrefix$p}-star`, {
          [`${classPrefix$p}-star-active`]: value >= v,
          [`${classPrefix$p}-star-half`]: half,
          [`${classPrefix$p}-star-readonly`]: props.readOnly
        }),
        role: "radio",
        "aria-checked": value >= v,
        "aria-label": "" + v
      }, props.character);
    }
    const bind = useDrag((state) => {
      if (props.readOnly)
        return;
      const {
        xy: [clientX],
        tap
      } = state;
      const container = containerRef.current;
      if (!container)
        return;
      const rect = container.getBoundingClientRect();
      const rawValue = (clientX - rect.left) / rect.width * props.count;
      const ceiledValue = props.allowHalf ? Math.ceil(rawValue * 2) / 2 : Math.ceil(rawValue);
      const boundValue = bound(ceiledValue, 0, props.count);
      if (tap) {
        if (props.allowClear && boundValue === value) {
          setValue2(0);
          return;
        }
      }
      setValue2(boundValue);
    }, {
      axis: "x",
      pointer: {
        touch: true
      },
      filterTaps: true
    });
    return withNativeProps(props, React$1.createElement("div", Object.assign({
      className: classNames(classPrefix$p, {
        [`${classPrefix$p}-half`]: props.allowHalf
      }),
      role: "radiogroup",
      "aria-readonly": props.readOnly,
      ref: containerRef
    }, bind()), starList.map((_, i2) => React$1.createElement("div", {
      key: i2,
      className: classNames(`${classPrefix$p}-box`)
    }, props.allowHalf && renderStar(i2 + 0.5, true), renderStar(i2 + 1, false)))));
  };
  const classPrefix$o = `adm-result`;
  const iconRecord$1 = {
    success: CheckCircleFill,
    error: CloseCircleFill,
    info: InformationCircleFill,
    waiting: ClockCircleFill,
    warning: ExclamationCircleFill
  };
  const defaultProps$i = {
    status: "info"
  };
  const Result = (p) => {
    const props = mergeProps(defaultProps$i, p);
    const {
      status,
      title,
      description,
      icon
    } = props;
    if (!status)
      return null;
    const resultIcon = icon || React$1.createElement(iconRecord$1[status]);
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$o, `${classPrefix$o}-${status}`)
    }, React$1.createElement("div", {
      className: `${classPrefix$o}-icon`
    }, resultIcon), React$1.createElement("div", {
      className: `${classPrefix$o}-title`
    }, title), !!description && React$1.createElement("div", {
      className: `${classPrefix$o}-description`
    }, description)));
  };
  const classPrefix$n = `adm-result-page`;
  const iconRecord = {
    success: CheckCircleFill,
    error: CloseCircleFill,
    info: InformationCircleFill,
    waiting: ClockCircleFill,
    warning: ExclamationCircleFill
  };
  const defaultProps$h = {
    status: "info",
    details: []
  };
  const ResultPage = (p) => {
    const props = mergeProps(defaultProps$h, p);
    const {
      status,
      title,
      description,
      details,
      icon,
      primaryButtonText,
      secondaryButtonText,
      onPrimaryButtonClick,
      onSecondaryButtonClick
    } = props;
    const resultIcon = icon || React$1.createElement(iconRecord[status]);
    const [collapse, setCollapse] = React$1.useState(true);
    const showSecondaryButton = isNodeWithContent(secondaryButtonText);
    const showPrimaryButton = isNodeWithContent(primaryButtonText);
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$n
    }, React$1.createElement("div", {
      className: `${classPrefix$n}-header`
    }, React$1.createElement("div", {
      className: `${classPrefix$n}-icon`
    }, resultIcon), React$1.createElement("div", {
      className: `${classPrefix$n}-title`
    }, title), isNodeWithContent(description) ? React$1.createElement("div", {
      className: `${classPrefix$n}-description`
    }, description) : null, (details === null || details === void 0 ? void 0 : details.length) ? React$1.createElement("div", {
      className: `${classPrefix$n}-details`
    }, (collapse ? details.slice(0, 3) : details).map((detail, index2) => {
      return React$1.createElement("div", {
        className: classNames(`${classPrefix$n}-detail`, detail.bold && `${classPrefix$n}-detail-bold`),
        key: index2
      }, React$1.createElement("span", null, detail.label), React$1.createElement("span", null, detail.value));
    }), details.length > 3 && React$1.createElement("div", {
      onClick: () => setCollapse((prev) => !prev)
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$n}-collapse`, !collapse && `${classPrefix$n}-collapse-active`)
    }))) : null, React$1.createElement("div", {
      className: `${classPrefix$n}-bgWrapper`
    }, React$1.createElement("div", {
      className: `${classPrefix$n}-bg`
    }))), React$1.createElement("div", {
      className: `${classPrefix$n}-content`
    }, props.children), (showPrimaryButton || showSecondaryButton) && React$1.createElement("div", {
      className: `${classPrefix$n}-footer`
    }, showSecondaryButton && React$1.createElement(Button, {
      block: true,
      color: "default",
      fill: "solid",
      size: "large",
      onClick: onSecondaryButtonClick,
      className: `${classPrefix$n}-footer-btn`
    }, secondaryButtonText), showPrimaryButton && showSecondaryButton && React$1.createElement("div", {
      className: `${classPrefix$n}-footer-space`
    }), showPrimaryButton && React$1.createElement(Button, {
      block: true,
      color: "primary",
      fill: "solid",
      size: "large",
      onClick: onPrimaryButtonClick,
      className: `${classPrefix$n}-footer-btn`
    }, primaryButtonText))));
  };
  const classPrefix$m = `adm-result-page-card`;
  const ResultPageCard = (props) => {
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(`${classPrefix$m}`)
    }, props.children));
  };
  const index$5 = attachPropertiesToComponent(ResultPage, {
    Card: ResultPageCard
  });
  const classPrefix$l = `adm-search-bar`;
  const defaultProps$g = {
    clearable: true,
    onlyShowClearWhenFocus: false,
    showCancelButton: false,
    defaultValue: "",
    clearOnCancel: true,
    icon: React$1.createElement(SearchOutline, null)
  };
  const SearchBar = React$1.forwardRef((p, ref) => {
    const {
      locale
    } = useConfig();
    const props = mergeProps(defaultProps$g, {
      cancelText: locale.common.cancel
    }, p);
    const [value, setValue2] = usePropsValue(props);
    const [hasFocus, setHasFocus] = React$1.useState(false);
    const inputRef = React$1.useRef(null);
    const composingRef = React$1.useRef(false);
    React$1.useImperativeHandle(ref, () => ({
      clear: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
      },
      focus: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      get nativeElement() {
        var _a, _b;
        return (_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.nativeElement) !== null && _b !== void 0 ? _b : null;
      }
    }));
    const renderCancelButton = () => {
      let isShowCancel;
      if (typeof props.showCancelButton === "function") {
        isShowCancel = props.showCancelButton(hasFocus, value);
      } else {
        isShowCancel = props.showCancelButton && hasFocus;
      }
      return isShowCancel && React$1.createElement("div", {
        className: `${classPrefix$l}-suffix`
      }, React$1.createElement(Button, {
        fill: "none",
        className: `${classPrefix$l}-cancel-button`,
        onClick: () => {
          var _a, _b, _c;
          if (props.clearOnCancel) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
          }
          (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
          (_c = props.onCancel) === null || _c === void 0 ? void 0 : _c.call(props);
        },
        onMouseDown: (e2) => {
          e2.preventDefault();
        }
      }, props.cancelText));
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$l, {
        [`${classPrefix$l}-active`]: hasFocus
      })
    }, React$1.createElement("div", {
      className: `${classPrefix$l}-input-box`
    }, props.icon && React$1.createElement("div", {
      className: `${classPrefix$l}-input-box-icon`
    }, props.icon), React$1.createElement(Input, {
      ref: inputRef,
      className: classNames(`${classPrefix$l}-input`, {
        [`${classPrefix$l}-input-without-icon`]: !props.icon
      }),
      value,
      onChange: setValue2,
      maxLength: props.maxLength,
      placeholder: props.placeholder,
      clearable: props.clearable,
      onlyShowClearWhenFocus: props.onlyShowClearWhenFocus,
      onFocus: (e2) => {
        var _a;
        setHasFocus(true);
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onBlur: (e2) => {
        var _a;
        setHasFocus(false);
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onClear: props.onClear,
      type: "search",
      enterKeyHint: "search",
      onEnterPress: () => {
        var _a, _b;
        if (!composingRef.current) {
          (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
          (_b = props.onSearch) === null || _b === void 0 ? void 0 : _b.call(props, value);
        }
      },
      "aria-label": locale.SearchBar.name,
      onCompositionStart: (e2) => {
        var _a;
        composingRef.current = true;
        (_a = props.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onCompositionEnd: (e2) => {
        var _a;
        composingRef.current = false;
        (_a = props.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      }
    })), renderCancelButton()));
  });
  const CheckMark = React$1.memo(() => {
    return React$1.createElement("svg", {
      width: "17px",
      height: "13px",
      viewBox: "0 0 17 13",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, React$1.createElement("g", {
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React$1.createElement("g", {
      transform: "translate(-2832.000000, -1103.000000)",
      stroke: "#FFFFFF",
      strokeWidth: "3"
    }, React$1.createElement("g", {
      transform: "translate(2610.000000, 955.000000)"
    }, React$1.createElement("g", {
      transform: "translate(24.000000, 91.000000)"
    }, React$1.createElement("g", {
      transform: "translate(179.177408, 36.687816)"
    }, React$1.createElement("polyline", {
      points: "34.2767388 22 24.797043 31.4796958 21 27.6826527"
    })))))));
  });
  const classPrefix$k = `adm-selector`;
  const defaultProps$f = {
    multiple: false,
    defaultValue: [],
    showCheckMark: true
  };
  const Selector = (p) => {
    const props = mergeProps(defaultProps$f, p);
    const [labelName, valueName, , disabledName] = useFieldNames(props.fieldNames);
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: props.defaultValue,
      onChange: (val) => {
        var _a;
        const extend = {
          get items() {
            return props.options.filter((option) => val.includes(option[valueName]));
          }
        };
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
      }
    });
    const {
      locale
    } = useConfig();
    const items = props.options.map((option) => {
      const active = (value || []).includes(option[valueName]);
      const disabled = option[disabledName] || props.disabled;
      const itemCls = classNames(`${classPrefix$k}-item`, {
        [`${classPrefix$k}-item-active`]: active && !props.multiple,
        [`${classPrefix$k}-item-multiple-active`]: active && props.multiple,
        [`${classPrefix$k}-item-disabled`]: disabled
      });
      return React$1.createElement("div", {
        key: option[valueName],
        className: itemCls,
        onClick: () => {
          if (disabled) {
            return;
          }
          if (props.multiple) {
            const val = active ? value.filter((v) => v !== option[valueName]) : [...value, option[valueName]];
            setValue2(val);
          } else {
            const val = active ? [] : [option[valueName]];
            setValue2(val);
          }
        },
        role: "option",
        "aria-selected": active && !props.multiple || active && props.multiple
      }, option[labelName], option.description && React$1.createElement("div", {
        className: `${classPrefix$k}-item-description`
      }, option.description), active && props.showCheckMark && React$1.createElement("div", {
        className: `${classPrefix$k}-check-mark-wrapper`
      }, React$1.createElement(CheckMark, null)));
    });
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$k,
      role: "listbox",
      "aria-label": locale.Selector.name
    }, props.columns ? React$1.createElement(Grid, {
      columns: props.columns
    }, items) : React$1.createElement(Space, {
      wrap: true
    }, items)));
  };
  const Corner = React$1.memo((props) => withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 30 30"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("path", {
    d: "M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z",
    fill: "var(--adm-color-background)",
    transform: "translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) "
  })))));
  const classPrefix$j = `adm-side-bar`;
  const SideBarItem = () => {
    return null;
  };
  const SideBar = (props) => {
    var _a;
    let firstActiveKey = null;
    const items = [];
    traverseReactNode(props.children, (child, index2) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      if (index2 === 0) {
        firstActiveKey = key;
      }
      items.push(child);
    });
    const [activeKey, setActiveKey] = usePropsValue({
      value: props.activeKey,
      defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
      onChange: (v) => {
        var _a2;
        if (v === null)
          return;
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
      }
    });
    const lastItem = items[items.length - 1];
    const isLastItemActive = lastItem && lastItem.key === activeKey;
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$j
    }, React$1.createElement("div", {
      className: `${classPrefix$j}-items`
    }, items.map((item, index2) => {
      const active = item.key === activeKey;
      const isActiveNextSibling = items[index2 - 1] && items[index2 - 1].key === activeKey;
      const isActivePreviousSibling = items[index2 + 1] && items[index2 + 1].key === activeKey;
      return withNativeProps(item.props, React$1.createElement("div", {
        key: item.key,
        onClick: () => {
          const {
            key
          } = item;
          if (key === void 0 || key === null || item.props.disabled)
            return;
          setActiveKey(key.toString());
        },
        className: classNames(`${classPrefix$j}-item`, {
          [`${classPrefix$j}-item-active`]: active,
          [`${classPrefix$j}-item-disabled`]: item.props.disabled
        })
      }, React$1.createElement(React$1.Fragment, null, isActiveNextSibling && React$1.createElement(Corner, {
        className: `${classPrefix$j}-item-corner ${classPrefix$j}-item-corner-top`
      }), isActivePreviousSibling && React$1.createElement(Corner, {
        className: `${classPrefix$j}-item-corner ${classPrefix$j}-item-corner-bottom`
      })), React$1.createElement(Badge, {
        content: item.props.badge,
        className: `${classPrefix$j}-badge`
      }, React$1.createElement("div", {
        className: `${classPrefix$j}-item-title`
      }, active && React$1.createElement("div", {
        className: `${classPrefix$j}-item-highlight`
      }), item.props.title))));
    })), React$1.createElement("div", {
      className: classNames(`${classPrefix$j}-extra-space`, isLastItemActive && `${classPrefix$j}-item-active-next-sibling`)
    }, isLastItemActive && React$1.createElement(Corner, {
      className: `${classPrefix$j}-item-corner ${classPrefix$j}-item-corner-top`
    }))));
  };
  const index$4 = attachPropertiesToComponent(SideBar, {
    Item: SideBarItem
  });
  const classPrefix$i = `adm-slider`;
  const Ticks = ({
    points,
    max: max2,
    min: min2,
    upperBound,
    lowerBound
  }) => {
    const range2 = max2 - min2;
    const elements = points.map((point) => {
      const offset2 = `${Math.abs(point - min2) / range2 * 100}%`;
      const isActived = point <= upperBound && point >= lowerBound;
      const style = {
        left: offset2
      };
      const pointClassName = classNames({
        [`${classPrefix$i}-tick`]: true,
        [`${classPrefix$i}-tick-active`]: isActived
      });
      return React$1.createElement("span", {
        className: pointClassName,
        style,
        key: point
      });
    });
    return React$1.createElement("div", {
      className: `${classPrefix$i}-ticks`
    }, elements);
  };
  const Ticks$1 = Ticks;
  const classPrefix$h = `adm-slider-mark`;
  const Marks = ({
    marks,
    upperBound,
    lowerBound,
    max: max2,
    min: min2
  }) => {
    const marksKeys = Object.keys(marks);
    const range2 = max2 - min2;
    const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).filter((point) => point >= min2 && point <= max2).map((point) => {
      const markPoint = marks[point];
      if (!markPoint && markPoint !== 0) {
        return null;
      }
      const isActive = point <= upperBound && point >= lowerBound;
      const markClassName = classNames({
        [`${classPrefix$h}-text`]: true,
        [`${classPrefix$h}-text-active`]: isActive
      });
      const style = {
        left: `${(point - min2) / range2 * 100}%`
      };
      return React$1.createElement("span", {
        className: markClassName,
        style,
        key: point
      }, markPoint);
    });
    return React$1.createElement("div", {
      className: classPrefix$h
    }, elements);
  };
  const Marks$1 = Marks;
  function supportBigInt() {
    return typeof BigInt === "function";
  }
  function isEmpty(value) {
    return !value && value !== 0 && !Number.isNaN(value) || !String(value).trim();
  }
  function trimNumber(numStr) {
    var str = numStr.trim();
    var negative = str.startsWith("-");
    if (negative) {
      str = str.slice(1);
    }
    str = str.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, "");
    if (str.startsWith(".")) {
      str = "0".concat(str);
    }
    var trimStr = str || "0";
    var splitNumber = trimStr.split(".");
    var integerStr = splitNumber[0] || "0";
    var decimalStr = splitNumber[1] || "0";
    if (integerStr === "0" && decimalStr === "0") {
      negative = false;
    }
    var negativeStr = negative ? "-" : "";
    return {
      negative,
      negativeStr,
      trimStr,
      integerStr,
      decimalStr,
      fullStr: "".concat(negativeStr).concat(trimStr)
    };
  }
  function isE(number) {
    var str = String(number);
    return !Number.isNaN(Number(str)) && str.includes("e");
  }
  function getNumberPrecision(number) {
    var numStr = String(number);
    if (isE(number)) {
      var precision = Number(numStr.slice(numStr.indexOf("e-") + 2));
      var decimalMatch = numStr.match(/\.(\d+)/);
      if (decimalMatch !== null && decimalMatch !== void 0 && decimalMatch[1]) {
        precision += decimalMatch[1].length;
      }
      return precision;
    }
    return numStr.includes(".") && validateNumber(numStr) ? numStr.length - numStr.indexOf(".") - 1 : 0;
  }
  function num2str(number) {
    var numStr = String(number);
    if (isE(number)) {
      if (number > Number.MAX_SAFE_INTEGER) {
        return String(supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER);
      }
      if (number < Number.MIN_SAFE_INTEGER) {
        return String(supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER);
      }
      numStr = number.toFixed(getNumberPrecision(numStr));
    }
    return trimNumber(numStr).fullStr;
  }
  function validateNumber(num) {
    if (typeof num === "number") {
      return !Number.isNaN(num);
    }
    if (!num) {
      return false;
    }
    return (
      // Normal type: 11.28
      /^\s*-?\d+(\.\d+)?\s*$/.test(num) || // Pre-number: 1.
      /^\s*-?\d+\.\s*$/.test(num) || // Post-number: .1
      /^\s*-?\.\d+\s*$/.test(num)
    );
  }
  var BigIntDecimal = /* @__PURE__ */ function() {
    function BigIntDecimal2(value) {
      _classCallCheck(this, BigIntDecimal2);
      _defineProperty(this, "origin", "");
      _defineProperty(this, "negative", void 0);
      _defineProperty(this, "integer", void 0);
      _defineProperty(this, "decimal", void 0);
      _defineProperty(this, "decimalLen", void 0);
      _defineProperty(this, "empty", void 0);
      _defineProperty(this, "nan", void 0);
      if (isEmpty(value)) {
        this.empty = true;
        return;
      }
      this.origin = String(value);
      if (value === "-" || Number.isNaN(value)) {
        this.nan = true;
        return;
      }
      var mergedValue = value;
      if (isE(mergedValue)) {
        mergedValue = Number(mergedValue);
      }
      mergedValue = typeof mergedValue === "string" ? mergedValue : num2str(mergedValue);
      if (validateNumber(mergedValue)) {
        var trimRet = trimNumber(mergedValue);
        this.negative = trimRet.negative;
        var numbers = trimRet.trimStr.split(".");
        this.integer = BigInt(numbers[0]);
        var decimalStr = numbers[1] || "0";
        this.decimal = BigInt(decimalStr);
        this.decimalLen = decimalStr.length;
      } else {
        this.nan = true;
      }
    }
    _createClass(BigIntDecimal2, [{
      key: "getMark",
      value: function getMark() {
        return this.negative ? "-" : "";
      }
    }, {
      key: "getIntegerStr",
      value: function getIntegerStr() {
        return this.integer.toString();
      }
      /**
       * @private get decimal string
       */
    }, {
      key: "getDecimalStr",
      value: function getDecimalStr() {
        return this.decimal.toString().padStart(this.decimalLen, "0");
      }
      /**
       * @private Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
       * This is used for add function only.
       */
    }, {
      key: "alignDecimal",
      value: function alignDecimal(decimalLength) {
        var str = "".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(decimalLength, "0"));
        return BigInt(str);
      }
    }, {
      key: "negate",
      value: function negate() {
        var clone = new BigIntDecimal2(this.toString());
        clone.negative = !clone.negative;
        return clone;
      }
    }, {
      key: "cal",
      value: function cal(offset2, calculator, calDecimalLen) {
        var maxDecimalLength = Math.max(this.getDecimalStr().length, offset2.getDecimalStr().length);
        var myAlignedDecimal = this.alignDecimal(maxDecimalLength);
        var offsetAlignedDecimal = offset2.alignDecimal(maxDecimalLength);
        var valueStr = calculator(myAlignedDecimal, offsetAlignedDecimal).toString();
        var nextDecimalLength = calDecimalLen(maxDecimalLength);
        var _trimNumber = trimNumber(valueStr), negativeStr = _trimNumber.negativeStr, trimStr = _trimNumber.trimStr;
        var hydrateValueStr = "".concat(negativeStr).concat(trimStr.padStart(nextDecimalLength + 1, "0"));
        return new BigIntDecimal2("".concat(hydrateValueStr.slice(0, -nextDecimalLength), ".").concat(hydrateValueStr.slice(-nextDecimalLength)));
      }
    }, {
      key: "add",
      value: function add(value) {
        if (this.isInvalidate()) {
          return new BigIntDecimal2(value);
        }
        var offset2 = new BigIntDecimal2(value);
        if (offset2.isInvalidate()) {
          return this;
        }
        return this.cal(offset2, function(num1, num2) {
          return num1 + num2;
        }, function(len) {
          return len;
        });
      }
    }, {
      key: "multi",
      value: function multi(value) {
        var target = new BigIntDecimal2(value);
        if (this.isInvalidate() || target.isInvalidate()) {
          return new BigIntDecimal2(NaN);
        }
        return this.cal(target, function(num1, num2) {
          return num1 * num2;
        }, function(len) {
          return len * 2;
        });
      }
    }, {
      key: "isEmpty",
      value: function isEmpty2() {
        return this.empty;
      }
    }, {
      key: "isNaN",
      value: function isNaN2() {
        return this.nan;
      }
    }, {
      key: "isInvalidate",
      value: function isInvalidate() {
        return this.isEmpty() || this.isNaN();
      }
    }, {
      key: "equals",
      value: function equals(target) {
        return this.toString() === (target === null || target === void 0 ? void 0 : target.toString());
      }
    }, {
      key: "lessEquals",
      value: function lessEquals(target) {
        return this.add(target.negate().toString()).toNumber() <= 0;
      }
    }, {
      key: "toNumber",
      value: function toNumber2() {
        if (this.isNaN()) {
          return NaN;
        }
        return Number(this.toString());
      }
    }, {
      key: "toString",
      value: function toString() {
        var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        if (!safe) {
          return this.origin;
        }
        if (this.isInvalidate()) {
          return "";
        }
        return trimNumber("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr;
      }
    }]);
    return BigIntDecimal2;
  }();
  var NumberDecimal = /* @__PURE__ */ function() {
    function NumberDecimal2(value) {
      _classCallCheck(this, NumberDecimal2);
      _defineProperty(this, "origin", "");
      _defineProperty(this, "number", void 0);
      _defineProperty(this, "empty", void 0);
      if (isEmpty(value)) {
        this.empty = true;
        return;
      }
      this.origin = String(value);
      this.number = Number(value);
    }
    _createClass(NumberDecimal2, [{
      key: "negate",
      value: function negate() {
        return new NumberDecimal2(-this.toNumber());
      }
    }, {
      key: "add",
      value: function add(value) {
        if (this.isInvalidate()) {
          return new NumberDecimal2(value);
        }
        var target = Number(value);
        if (Number.isNaN(target)) {
          return this;
        }
        var number = this.number + target;
        if (number > Number.MAX_SAFE_INTEGER) {
          return new NumberDecimal2(Number.MAX_SAFE_INTEGER);
        }
        if (number < Number.MIN_SAFE_INTEGER) {
          return new NumberDecimal2(Number.MIN_SAFE_INTEGER);
        }
        var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
        return new NumberDecimal2(number.toFixed(maxPrecision));
      }
    }, {
      key: "multi",
      value: function multi(value) {
        var target = Number(value);
        if (this.isInvalidate() || Number.isNaN(target)) {
          return new NumberDecimal2(NaN);
        }
        var number = this.number * target;
        if (number > Number.MAX_SAFE_INTEGER) {
          return new NumberDecimal2(Number.MAX_SAFE_INTEGER);
        }
        if (number < Number.MIN_SAFE_INTEGER) {
          return new NumberDecimal2(Number.MIN_SAFE_INTEGER);
        }
        var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
        return new NumberDecimal2(number.toFixed(maxPrecision));
      }
    }, {
      key: "isEmpty",
      value: function isEmpty2() {
        return this.empty;
      }
    }, {
      key: "isNaN",
      value: function isNaN2() {
        return Number.isNaN(this.number);
      }
    }, {
      key: "isInvalidate",
      value: function isInvalidate() {
        return this.isEmpty() || this.isNaN();
      }
    }, {
      key: "equals",
      value: function equals(target) {
        return this.toNumber() === (target === null || target === void 0 ? void 0 : target.toNumber());
      }
    }, {
      key: "lessEquals",
      value: function lessEquals(target) {
        return this.add(target.negate().toString()).toNumber() <= 0;
      }
    }, {
      key: "toNumber",
      value: function toNumber2() {
        return this.number;
      }
    }, {
      key: "toString",
      value: function toString() {
        var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        if (!safe) {
          return this.origin;
        }
        if (this.isInvalidate()) {
          return "";
        }
        return num2str(this.number);
      }
    }]);
    return NumberDecimal2;
  }();
  function getMiniDecimal(value) {
    if (supportBigInt()) {
      return new BigIntDecimal(value);
    }
    return new NumberDecimal(value);
  }
  function toFixed(numStr, separatorStr, precision) {
    var cutOnly = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (numStr === "") {
      return "";
    }
    var _trimNumber = trimNumber(numStr), negativeStr = _trimNumber.negativeStr, integerStr = _trimNumber.integerStr, decimalStr = _trimNumber.decimalStr;
    var precisionDecimalStr = "".concat(separatorStr).concat(decimalStr);
    var numberWithoutDecimal = "".concat(negativeStr).concat(integerStr);
    if (precision >= 0) {
      var advancedNum = Number(decimalStr[precision]);
      if (advancedNum >= 5 && !cutOnly) {
        var advancedDecimal = getMiniDecimal(numStr).add("".concat(negativeStr, "0.").concat("0".repeat(precision)).concat(10 - advancedNum));
        return toFixed(advancedDecimal.toString(), separatorStr, precision, cutOnly);
      }
      if (precision === 0) {
        return numberWithoutDecimal;
      }
      return "".concat(numberWithoutDecimal).concat(separatorStr).concat(decimalStr.padEnd(precision, "0").slice(0, precision));
    }
    if (precisionDecimalStr === ".0") {
      return numberWithoutDecimal;
    }
    return "".concat(numberWithoutDecimal).concat(precisionDecimalStr);
  }
  const ThumbIcon = (props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, React$1.createElement("g", {
      fill: "currentColor",
      fillRule: "evenodd"
    }, React$1.createElement("rect", {
      x: 10,
      width: 4,
      height: 24,
      rx: 2
    }), React$1.createElement("rect", {
      y: 4,
      width: 4,
      height: 16,
      rx: 2
    }), React$1.createElement("rect", {
      x: 20,
      y: 4,
      width: 4,
      height: 16,
      rx: 2
    }))));
  };
  const classPrefix$g = `adm-slider`;
  const Thumb = (props) => {
    const {
      value,
      min: min2,
      max: max2,
      disabled,
      icon,
      residentPopover,
      onDrag
    } = props;
    const prevValue = React$1.useRef(value);
    const {
      locale
    } = useConfig();
    const currentPosition = () => {
      return {
        left: `${(value - min2) / (max2 - min2) * 100}%`,
        right: "auto"
      };
    };
    const [dragging, setDragging] = React$1.useState(false);
    const bind = useDrag((state) => {
      var _a;
      if (disabled)
        return;
      if (state.first) {
        prevValue.current = value;
      }
      const x = state.xy[0] - state.initial[0];
      const sliderOffsetWith = (_a = props.trackRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
      if (!sliderOffsetWith)
        return;
      const diff = x / Math.ceil(sliderOffsetWith) * (max2 - min2);
      onDrag(prevValue.current + diff, state.first, state.last);
      setDragging(!state.last);
    }, {
      axis: "x",
      pointer: {
        touch: true
      }
    });
    const renderPopoverContent = typeof props.popover === "function" ? props.popover : props.popover ? (value2) => value2.toString() : null;
    const thumbElement = React$1.createElement("div", {
      className: `${classPrefix$g}-thumb`
    }, icon ? icon : React$1.createElement(ThumbIcon, {
      className: `${classPrefix$g}-thumb-icon`
    }));
    return React$1.createElement("div", Object.assign({
      className: `${classPrefix$g}-thumb-container`,
      style: currentPosition()
    }, bind(), {
      role: "slider",
      "aria-label": props["aria-label"] || locale.Slider.name,
      "aria-valuemax": max2,
      "aria-valuemin": min2,
      "aria-valuenow": value,
      "aria-disabled": disabled
    }), renderPopoverContent ? React$1.createElement(Popover, {
      content: renderPopoverContent(value),
      placement: "top",
      visible: residentPopover || dragging,
      getContainer: null,
      mode: "dark"
    }, thumbElement) : thumbElement);
  };
  const Thumb$1 = Thumb;
  const classPrefix$f = `adm-slider`;
  const defaultProps$e = {
    min: 0,
    max: 100,
    step: 1,
    ticks: false,
    range: false,
    disabled: false,
    popover: false,
    residentPopover: false
  };
  const Slider = (p) => {
    var _a;
    const props = mergeProps(defaultProps$e, p);
    const {
      min: min2,
      max: max2,
      disabled,
      marks,
      ticks,
      step,
      icon
    } = props;
    function sortValue(val) {
      return val.sort((a, b) => a - b);
    }
    function convertValue(value) {
      return props.range ? value : [props.min, value];
    }
    function alignValue(value, decimalLen) {
      const decimal = getMiniDecimal(value);
      const fixedStr = toFixed(decimal.toString(), ".", decimalLen);
      return getMiniDecimal(fixedStr).toNumber();
    }
    function reverseValue(value) {
      const mergedDecimalLen = Math.max(getDecimalLen(step), getDecimalLen(value[0]), getDecimalLen(value[1]));
      return props.range ? value.map((v) => alignValue(v, mergedDecimalLen)) : alignValue(value[1], mergedDecimalLen);
    }
    function getDecimalLen(n2) {
      return (`${n2}`.split(".")[1] || "").length;
    }
    function onAfterChange(value) {
      var _a2;
      (_a2 = props.onAfterChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, reverseValue(value));
    }
    let propsValue = props.value;
    if (props.range && typeof props.value === "number") {
      devWarning("Slider", "When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]");
      propsValue = [0, props.value];
    }
    const [rawValue, setRawValue] = usePropsValue({
      value: propsValue,
      defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : props.range ? [min2, min2] : min2,
      onChange: props.onChange
    });
    const sliderValue = sortValue(convertValue(rawValue));
    function setSliderValue(value) {
      const next = sortValue(value);
      const current = sliderValue;
      if (next[0] === current[0] && next[1] === current[1])
        return;
      setRawValue(reverseValue(next));
    }
    const trackRef = React$1.useRef(null);
    const fillSize = `${100 * (sliderValue[1] - sliderValue[0]) / (max2 - min2)}%`;
    const fillStart = `${100 * (sliderValue[0] - min2) / (max2 - min2)}%`;
    const pointList = React$1.useMemo(() => {
      if (marks) {
        return Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
      } else if (ticks) {
        const points = [];
        for (let i2 = getMiniDecimal(min2); i2.lessEquals(getMiniDecimal(max2)); i2 = i2.add(step)) {
          points.push(i2.toNumber());
        }
        return points;
      }
      return [];
    }, [marks, ticks, step, min2, max2]);
    function getValueByPosition(position) {
      const newPosition = position < min2 ? min2 : position > max2 ? max2 : position;
      let value = min2;
      if (pointList.length) {
        value = nearest(pointList, newPosition);
      } else {
        const cell = Math.round((newPosition - min2) / step);
        const nextVal = getMiniDecimal(cell).multi(step);
        value = getMiniDecimal(min2).add(nextVal.toString()).toNumber();
      }
      return value;
    }
    const dragLockRef = React$1.useRef(0);
    const onTrackClick = (event) => {
      if (dragLockRef.current > 0)
        return;
      event.stopPropagation();
      if (disabled)
        return;
      const track = trackRef.current;
      if (!track)
        return;
      const sliderOffsetLeft = track.getBoundingClientRect().left;
      const position = (event.clientX - sliderOffsetLeft) / Math.ceil(track.offsetWidth) * (max2 - min2) + min2;
      const targetValue = getValueByPosition(position);
      let nextSliderValue;
      if (props.range) {
        if (Math.abs(targetValue - sliderValue[0]) > Math.abs(targetValue - sliderValue[1])) {
          nextSliderValue = [sliderValue[0], targetValue];
        } else {
          nextSliderValue = [targetValue, sliderValue[1]];
        }
      } else {
        nextSliderValue = [props.min, targetValue];
      }
      setSliderValue(nextSliderValue);
      onAfterChange(nextSliderValue);
    };
    const valueBeforeDragRef = React$1.useRef();
    const renderThumb = (index2) => {
      return React$1.createElement(Thumb$1, {
        key: index2,
        value: sliderValue[index2],
        min: min2,
        max: max2,
        disabled,
        trackRef,
        icon,
        popover: props.popover,
        residentPopover: props.residentPopover,
        onDrag: (position, first, last) => {
          if (first) {
            dragLockRef.current += 1;
            valueBeforeDragRef.current = sliderValue;
          }
          const val = getValueByPosition(position);
          const valueBeforeDrag = valueBeforeDragRef.current;
          if (!valueBeforeDrag)
            return;
          const next = [...valueBeforeDrag];
          next[index2] = val;
          setSliderValue(next);
          if (last) {
            onAfterChange(next);
            window.setTimeout(() => {
              dragLockRef.current -= 1;
            }, 100);
          }
        },
        "aria-label": props["aria-label"]
      });
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$f, {
        [`${classPrefix$f}-disabled`]: disabled
      })
    }, React$1.createElement("div", {
      className: `${classPrefix$f}-track-container`,
      onClick: onTrackClick
    }, React$1.createElement("div", {
      className: `${classPrefix$f}-track`,
      onClick: onTrackClick,
      ref: trackRef
    }, React$1.createElement("div", {
      className: `${classPrefix$f}-fill`,
      style: {
        width: fillSize,
        left: fillStart
      }
    }), props.ticks && React$1.createElement(Ticks$1, {
      points: pointList,
      min: min2,
      max: max2,
      lowerBound: sliderValue[0],
      upperBound: sliderValue[1]
    }), props.range && renderThumb(0), renderThumb(1))), marks && React$1.createElement(Marks$1, {
      min: min2,
      max: max2,
      marks,
      lowerBound: sliderValue[0],
      upperBound: sliderValue[1]
    })));
  };
  function useEvent(callback) {
    var fnRef = React__namespace.useRef();
    fnRef.current = callback;
    var memoFn = React__namespace.useCallback(function() {
      var _fnRef$current;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_fnRef$current = fnRef.current) === null || _fnRef$current === void 0 ? void 0 : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
    }, []);
    return memoFn;
  }
  function canUseDom() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
  var useInternalLayoutEffect = canUseDom() ? React__namespace.useLayoutEffect : React__namespace.useEffect;
  var useLayoutEffect = function useLayoutEffect2(callback, deps) {
    var firstMountRef = React__namespace.useRef(true);
    useInternalLayoutEffect(function() {
      return callback(firstMountRef.current);
    }, deps);
    useInternalLayoutEffect(function() {
      firstMountRef.current = false;
      return function() {
        firstMountRef.current = true;
      };
    }, []);
  };
  var useLayoutUpdateEffect = function useLayoutUpdateEffect2(callback, deps) {
    useLayoutEffect(function(firstMount) {
      if (!firstMount) {
        return callback();
      }
    }, deps);
  };
  function useSafeState(defaultValue) {
    var destroyRef = React__namespace.useRef(false);
    var _React$useState = React__namespace.useState(defaultValue), _React$useState2 = _slicedToArray(_React$useState, 2), value = _React$useState2[0], setValue2 = _React$useState2[1];
    React__namespace.useEffect(function() {
      destroyRef.current = false;
      return function() {
        destroyRef.current = true;
      };
    }, []);
    function safeSetState(updater, ignoreDestroy) {
      if (ignoreDestroy && destroyRef.current) {
        return;
      }
      setValue2(updater);
    }
    return [value, safeSetState];
  }
  function hasValue(value) {
    return value !== void 0;
  }
  function useMergedState(defaultStateValue, option) {
    var _ref = option || {}, defaultValue = _ref.defaultValue, value = _ref.value, onChange = _ref.onChange, postState = _ref.postState;
    var _useState = useSafeState(function() {
      if (hasValue(value)) {
        return value;
      } else if (hasValue(defaultValue)) {
        return typeof defaultValue === "function" ? defaultValue() : defaultValue;
      } else {
        return typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
      }
    }), _useState2 = _slicedToArray(_useState, 2), innerValue = _useState2[0], setInnerValue = _useState2[1];
    var mergedValue = value !== void 0 ? value : innerValue;
    var postMergedValue = postState ? postState(mergedValue) : mergedValue;
    var onChangeFn = useEvent(onChange);
    var _useState3 = useSafeState([mergedValue]), _useState4 = _slicedToArray(_useState3, 2), prevValue = _useState4[0], setPrevValue = _useState4[1];
    useLayoutUpdateEffect(function() {
      var prev = prevValue[0];
      if (innerValue !== prev) {
        onChangeFn(innerValue, prev);
      }
    }, [prevValue]);
    useLayoutUpdateEffect(function() {
      if (!hasValue(value)) {
        setInnerValue(value);
      }
    }, [value]);
    var triggerChange = useEvent(function(updater, ignoreDestroy) {
      setInnerValue(updater, ignoreDestroy);
      setPrevValue([mergedValue], ignoreDestroy);
    });
    return [postMergedValue, triggerChange];
  }
  const classPrefix$e = `adm-stepper`;
  const defaultProps$d = {
    step: 1,
    disabled: false,
    allowEmpty: false
  };
  function InnerStepper(p, ref) {
    const props = mergeProps(defaultProps$d, p);
    const {
      defaultValue = 0,
      value,
      onChange,
      disabled,
      step,
      max: max2,
      min: min2,
      inputReadOnly,
      digits,
      stringMode,
      formatter,
      parser
    } = props;
    const {
      locale
    } = useConfig();
    React$1.useImperativeHandle(ref, () => ({
      focus: () => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      get nativeElement() {
        var _a, _b;
        return (_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.nativeElement) !== null && _b !== void 0 ? _b : null;
      }
    }));
    const fixedValue = (value2) => {
      const fixedValue2 = digits !== void 0 ? toFixed(value2.toString(), ".", digits) : value2;
      return fixedValue2.toString();
    };
    const getValueAsType = (value2) => stringMode ? value2.toString() : value2.toNumber();
    const parseValue = (text) => {
      if (text === "")
        return null;
      if (parser) {
        return String(parser(text));
      }
      const decimal = getMiniDecimal(text);
      return decimal.isInvalidate() ? null : decimal.toString();
    };
    const formatValue = (value2) => {
      if (value2 === null)
        return "";
      return formatter ? formatter(value2) : fixedValue(value2);
    };
    const [mergedValue, setMergedValue] = useMergedState(defaultValue, {
      value,
      onChange: (nextValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
      }
    });
    const [inputValue, setInputValue] = React$1.useState(() => formatValue(mergedValue));
    function setValueWithCheck(nextValue) {
      if (nextValue.isNaN())
        return;
      let target = nextValue;
      if (min2 !== void 0) {
        const minDecimal = getMiniDecimal(min2);
        if (target.lessEquals(minDecimal)) {
          target = minDecimal;
        }
      }
      if (max2 !== void 0) {
        const maxDecimal = getMiniDecimal(max2);
        if (maxDecimal.lessEquals(target)) {
          target = maxDecimal;
        }
      }
      if (digits !== void 0) {
        target = getMiniDecimal(fixedValue(getValueAsType(target)));
      }
      setMergedValue(getValueAsType(target));
    }
    const handleInputChange = (v) => {
      setInputValue(v);
      const valueStr = parseValue(v);
      if (valueStr === null) {
        if (props.allowEmpty) {
          setMergedValue(null);
        } else {
          setMergedValue(defaultValue);
        }
      } else {
        setValueWithCheck(getMiniDecimal(valueStr));
      }
    };
    const [focused, setFocused] = React$1.useState(false);
    const inputRef = React$1.useRef(null);
    function triggerFocus(nextFocus) {
      setFocused(nextFocus);
      if (nextFocus) {
        setInputValue(mergedValue !== null && mergedValue !== void 0 ? String(mergedValue) : "");
      }
    }
    React$1.useEffect(() => {
      var _a, _b, _c;
      if (focused) {
        (_c = (_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.nativeElement) === null || _b === void 0 ? void 0 : _b.select) === null || _c === void 0 ? void 0 : _c.call(_b);
      }
    }, [focused]);
    React$1.useEffect(() => {
      if (!focused) {
        setInputValue(formatValue(mergedValue));
      }
    }, [focused, mergedValue, digits]);
    const handleOffset = (positive) => {
      let stepValue = getMiniDecimal(step);
      if (!positive) {
        stepValue = stepValue.negate();
      }
      setValueWithCheck(getMiniDecimal(mergedValue !== null && mergedValue !== void 0 ? mergedValue : 0).add(stepValue.toString()));
    };
    const handleMinus = () => {
      handleOffset(false);
    };
    const handlePlus = () => {
      handleOffset(true);
    };
    const minusDisabled = () => {
      if (disabled)
        return true;
      if (mergedValue === null)
        return false;
      if (min2 !== void 0) {
        return mergedValue <= min2;
      }
      return false;
    };
    const plusDisabled = () => {
      if (disabled)
        return true;
      if (mergedValue === null)
        return false;
      if (max2 !== void 0) {
        return mergedValue >= max2;
      }
      return false;
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$e, {
        [`${classPrefix$e}-active`]: focused
      })
    }, React$1.createElement(Button, {
      className: `${classPrefix$e}-minus`,
      onClick: handleMinus,
      disabled: minusDisabled(),
      fill: "none",
      shape: "rectangular",
      color: "primary",
      "aria-label": locale.Stepper.decrease
    }, React$1.createElement(MinusOutline, null)), React$1.createElement("div", {
      className: `${classPrefix$e}-middle`
    }, React$1.createElement(Input, {
      ref: inputRef,
      className: `${classPrefix$e}-input`,
      onFocus: (e2) => {
        var _a;
        triggerFocus(true);
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      value: inputValue,
      onChange: (val) => {
        disabled || handleInputChange(val);
      },
      disabled,
      onBlur: (e2) => {
        var _a;
        triggerFocus(false);
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      readOnly: inputReadOnly,
      role: "spinbutton",
      "aria-valuenow": Number(inputValue),
      "aria-valuemax": Number(max2),
      "aria-valuemin": Number(min2),
      inputMode: "decimal"
    })), React$1.createElement(Button, {
      className: `${classPrefix$e}-plus`,
      onClick: handlePlus,
      disabled: plusDisabled(),
      fill: "none",
      shape: "rectangular",
      color: "primary",
      "aria-label": locale.Stepper.increase
    }, React$1.createElement(AddOutline, null))));
  }
  const Stepper = React$1.forwardRef(InnerStepper);
  const classPrefix$d = `adm-step`;
  const Step = (props) => {
    const {
      title,
      description,
      icon,
      status = "wait"
    } = props;
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(`${classPrefix$d}`, `${classPrefix$d}-status-${status}`)
    }, React$1.createElement("div", {
      className: `${classPrefix$d}-indicator`
    }, React$1.createElement("div", {
      className: `${classPrefix$d}-icon-container`
    }, icon)), React$1.createElement("div", {
      className: `${classPrefix$d}-content`
    }, React$1.createElement("div", {
      className: `${classPrefix$d}-title`
    }, title), !!description && React$1.createElement("div", {
      className: `${classPrefix$d}-description`
    }, description))));
  };
  const classPrefix$c = `adm-steps`;
  const stepClassPrefix = `adm-step`;
  const defaultIcon = React$1.createElement("span", {
    className: `${stepClassPrefix}-icon-dot`
  });
  const defaultProps$c = {
    current: 0,
    direction: "horizontal"
  };
  const Steps = (p) => {
    const props = mergeProps(defaultProps$c, p);
    const {
      direction,
      current
    } = props;
    const classString = classNames(classPrefix$c, `${classPrefix$c}-${direction}`);
    return withNativeProps(props, React$1.createElement("div", {
      className: classString
    }, React$1.Children.map(props.children, (child, index2) => {
      var _a;
      if (!React$1.isValidElement(child)) {
        return child;
      }
      const childProps = child.props;
      let status = childProps.status || "wait";
      if (index2 < current) {
        status = childProps.status || "finish";
      } else if (index2 === current) {
        status = childProps.status || "process";
      }
      const icon = (_a = childProps.icon) !== null && _a !== void 0 ? _a : defaultIcon;
      return React$1.cloneElement(child, {
        status,
        icon
      });
    })));
  };
  const index$3 = attachPropertiesToComponent(Steps, {
    Step
  });
  const classPrefix$b = `adm-swipe-action`;
  const defaultProps$b = {
    rightActions: [],
    leftActions: [],
    closeOnTouchOutside: true,
    closeOnAction: true,
    stopPropagation: []
  };
  const SwipeAction = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$b, p);
    const rootRef = React$1.useRef(null);
    const leftRef = React$1.useRef(null);
    const rightRef = React$1.useRef(null);
    function getWidth(ref2) {
      const element = ref2.current;
      if (!element)
        return 0;
      return element.offsetWidth;
    }
    function getLeftWidth() {
      return getWidth(leftRef);
    }
    function getRightWidth() {
      return getWidth(rightRef);
    }
    const [{
      x
    }, api] = useSpring(() => ({
      x: 0,
      config: {
        tension: 200,
        friction: 30
      }
    }), []);
    const draggingRef = React$1.useRef(false);
    const dragCancelRef = React$1.useRef(null);
    function forceCancelDrag() {
      var _a;
      (_a = dragCancelRef.current) === null || _a === void 0 ? void 0 : _a.call(dragCancelRef);
      draggingRef.current = false;
    }
    const bind = useDrag((state) => {
      var _a;
      dragCancelRef.current = state.cancel;
      if (!state.intentional)
        return;
      if (state.down) {
        draggingRef.current = true;
      }
      if (!draggingRef.current)
        return;
      const [offsetX] = state.offset;
      if (state.last) {
        const leftWidth = getLeftWidth();
        const rightWidth = getRightWidth();
        let position = offsetX + state.velocity[0] * state.direction[0] * 50;
        if (offsetX > 0) {
          position = Math.max(0, position);
        } else if (offsetX < 0) {
          position = Math.min(0, position);
        } else {
          position = 0;
        }
        const targetX = nearest([-rightWidth, 0, leftWidth], position);
        api.start({
          x: targetX
        });
        if (targetX !== 0) {
          (_a = p.onActionsReveal) === null || _a === void 0 ? void 0 : _a.call(p, targetX > 0 ? "left" : "right");
        }
        window.setTimeout(() => {
          draggingRef.current = false;
        });
      } else {
        api.start({
          x: offsetX,
          immediate: true
        });
      }
    }, {
      from: () => [x.get(), 0],
      bounds: () => {
        const leftWidth = getLeftWidth();
        const rightWidth = getRightWidth();
        return {
          left: -rightWidth,
          right: leftWidth
        };
      },
      axis: "x",
      preventScroll: true,
      pointer: {
        touch: true
      },
      triggerAllEvents: true
    });
    function close() {
      api.start({
        x: 0
      });
      forceCancelDrag();
    }
    React$1.useImperativeHandle(ref, () => ({
      show: (side = "right") => {
        var _a;
        if (side === "right") {
          api.start({
            x: -getRightWidth()
          });
        } else if (side === "left") {
          api.start({
            x: getLeftWidth()
          });
        }
        (_a = p.onActionsReveal) === null || _a === void 0 ? void 0 : _a.call(p, side);
      },
      close
    }));
    React$1.useEffect(() => {
      if (!props.closeOnTouchOutside)
        return;
      function handle(e2) {
        if (x.get() === 0) {
          return;
        }
        const root2 = rootRef.current;
        if (root2 && !root2.contains(e2.target)) {
          close();
        }
      }
      document.addEventListener("touchstart", handle);
      return () => {
        document.removeEventListener("touchstart", handle);
      };
    }, [props.closeOnTouchOutside]);
    function renderAction(action) {
      var _a, _b;
      const color = (_a = action.color) !== null && _a !== void 0 ? _a : "light";
      return React$1.createElement(Button, {
        key: action.key,
        className: `${classPrefix$b}-action-button`,
        style: {
          "--background-color": (_b = colorRecord$1[color]) !== null && _b !== void 0 ? _b : color
        },
        onClick: (e2) => {
          var _a2, _b2;
          if (props.closeOnAction) {
            close();
          }
          (_a2 = action.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(action, e2);
          (_b2 = props.onAction) === null || _b2 === void 0 ? void 0 : _b2.call(props, action, e2);
        }
      }, action.text);
    }
    return withNativeProps(props, React$1.createElement("div", Object.assign({
      className: classPrefix$b
    }, bind(), {
      ref: rootRef,
      onClickCapture: (e2) => {
        if (draggingRef.current) {
          e2.stopPropagation();
          e2.preventDefault();
        }
      }
    }), React$1.createElement(animated.div, {
      className: `${classPrefix$b}-track`,
      style: {
        x
      }
    }, withStopPropagation(props.stopPropagation, React$1.createElement("div", {
      className: `${classPrefix$b}-actions ${classPrefix$b}-actions-left`,
      ref: leftRef
    }, props.leftActions.map(renderAction))), React$1.createElement("div", {
      className: `${classPrefix$b}-content`,
      onClickCapture: (e2) => {
        if (x.goal !== 0) {
          e2.preventDefault();
          e2.stopPropagation();
          close();
        }
      }
    }, React$1.createElement(animated.div, {
      style: {
        pointerEvents: x.to((v) => v !== 0 && x.goal !== 0 ? "none" : "auto")
      }
    }, props.children)), withStopPropagation(props.stopPropagation, React$1.createElement("div", {
      className: `${classPrefix$b}-actions ${classPrefix$b}-actions-right`,
      ref: rightRef
    }, props.rightActions.map(renderAction))))));
  });
  const colorRecord$1 = {
    light: "var(--adm-color-light)",
    weak: "var(--adm-color-weak)",
    primary: "var(--adm-color-primary)",
    success: "var(--adm-color-success)",
    warning: "var(--adm-color-warning)",
    danger: "var(--adm-color-danger)"
  };
  const SwiperItem = (props) => {
    return withNativeProps(props, React$1.createElement("div", {
      className: "adm-swiper-item",
      onClick: props.onClick
    }, props.children));
  };
  function useRefState(initialState) {
    const [state, setState] = React$1.useState(initialState);
    const ref = React$1.useRef(state);
    React$1.useEffect(() => {
      ref.current = state;
    }, [state]);
    return [state, setState, ref];
  }
  function mergeFuncProps(p1, p2) {
    const p1Keys = Object.keys(p1);
    const p2Keys = Object.keys(p2);
    const keys2 = /* @__PURE__ */ new Set([...p1Keys, ...p2Keys]);
    const res = {};
    keys2.forEach((key) => {
      const p1Value = p1[key];
      const p2Value = p2[key];
      if (typeof p1Value === "function" && typeof p2Value === "function") {
        res[key] = function(...args) {
          p1Value(...args);
          p2Value(...args);
        };
      } else {
        res[key] = p1Value || p2Value;
      }
    });
    return res;
  }
  const classPrefix$a = `adm-swiper`;
  const eventToPropRecord = {
    "mousedown": "onMouseDown",
    "mousemove": "onMouseMove",
    "mouseup": "onMouseUp"
  };
  const defaultProps$a = {
    defaultIndex: 0,
    allowTouchMove: true,
    autoplay: false,
    autoplayInterval: 3e3,
    loop: false,
    direction: "horizontal",
    slideSize: 100,
    trackOffset: 0,
    stuckAtBoundary: true,
    rubberband: true,
    stopPropagation: []
  };
  let currentUid;
  const Swiper = React$1.forwardRef(staged_1((p, ref) => {
    const props = mergeProps(defaultProps$a, p);
    const {
      direction,
      total,
      children,
      indicator
    } = props;
    const [uid] = React$1.useState({});
    const timeoutRef = React$1.useRef(null);
    const isVertical = direction === "vertical";
    const slideRatio = props.slideSize / 100;
    const offsetRatio = props.trackOffset / 100;
    const {
      validChildren,
      count,
      renderChildren
    } = React$1.useMemo(() => {
      let count2 = 0;
      let renderChildren2 = void 0;
      let validChildren2 = void 0;
      if (typeof children === "function") {
        renderChildren2 = children;
      } else {
        validChildren2 = React$1.Children.map(children, (child) => {
          if (!React$1.isValidElement(child))
            return null;
          if (child.type !== SwiperItem) {
            devWarning("Swiper", "The children of `Swiper` must be `Swiper.Item` components.");
            return null;
          }
          count2++;
          return child;
        });
      }
      return {
        renderChildren: renderChildren2,
        validChildren: validChildren2,
        count: count2
      };
    }, [children]);
    const mergedTotal = total !== null && total !== void 0 ? total : count;
    if (mergedTotal === 0 || !validChildren && !renderChildren) {
      devWarning("Swiper", "`Swiper` needs at least one child.");
      return null;
    }
    return () => {
      let loop2 = props.loop;
      if (slideRatio * (mergedTotal - 1) < 1) {
        loop2 = false;
      }
      const trackRef = React$1.useRef(null);
      function getSlidePixels() {
        const track = trackRef.current;
        if (!track)
          return 0;
        const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
        return trackPixels * props.slideSize / 100;
      }
      const [current, setCurrent, getCurrent] = useGetState(props.defaultIndex);
      const [dragging, setDragging, draggingRef] = useRefState(false);
      function boundIndex(current2) {
        let min2 = 0;
        let max2 = mergedTotal - 1;
        if (props.stuckAtBoundary) {
          min2 += offsetRatio / slideRatio;
          max2 -= (1 - slideRatio - offsetRatio) / slideRatio;
        }
        return bound(current2, min2, max2);
      }
      const [{
        position
      }, api] = useSpring(() => ({
        position: boundIndex(current) * 100,
        config: {
          tension: 200,
          friction: 30
        },
        onRest: () => {
          if (draggingRef.current)
            return;
          if (!loop2)
            return;
          const rawX = position.get();
          const totalWidth = 100 * mergedTotal;
          const standardPosition = modulus(rawX, totalWidth);
          if (standardPosition === rawX)
            return;
          api.start({
            position: standardPosition,
            immediate: true
          });
        }
      }), [mergedTotal]);
      const dragCancelRef = React$1.useRef(null);
      function forceCancelDrag() {
        var _a;
        (_a = dragCancelRef.current) === null || _a === void 0 ? void 0 : _a.call(dragCancelRef);
        draggingRef.current = false;
      }
      const bind = useDrag((state) => {
        dragCancelRef.current = state.cancel;
        if (!state.intentional)
          return;
        if (state.first && !currentUid) {
          currentUid = uid;
        }
        if (currentUid !== uid)
          return;
        currentUid = state.last ? void 0 : uid;
        const slidePixels = getSlidePixels();
        if (!slidePixels)
          return;
        const paramIndex = isVertical ? 1 : 0;
        const offset2 = state.offset[paramIndex];
        const direction2 = state.direction[paramIndex];
        const velocity = state.velocity[paramIndex];
        setDragging(true);
        if (!state.last) {
          api.start({
            position: offset2 * 100 / slidePixels,
            immediate: true
          });
        } else {
          const minIndex = Math.floor(offset2 / slidePixels);
          const maxIndex = minIndex + 1;
          const index2 = Math.round((offset2 + velocity * 2e3 * direction2) / slidePixels);
          swipeTo(bound(index2, minIndex, maxIndex));
          window.setTimeout(() => {
            setDragging(false);
          });
        }
      }, {
        transform: ([x, y]) => [-x, -y],
        from: () => {
          const slidePixels = getSlidePixels();
          return [position.get() / 100 * slidePixels, position.get() / 100 * slidePixels];
        },
        triggerAllEvents: true,
        bounds: () => {
          if (loop2)
            return {};
          const slidePixels = getSlidePixels();
          const lowerBound = boundIndex(0) * slidePixels;
          const upperBound = boundIndex(mergedTotal - 1) * slidePixels;
          return isVertical ? {
            top: lowerBound,
            bottom: upperBound
          } : {
            left: lowerBound,
            right: upperBound
          };
        },
        rubberband: props.rubberband,
        axis: isVertical ? "y" : "x",
        preventScroll: !isVertical,
        pointer: {
          touch: true
        }
      });
      function swipeTo(index2, immediate = false) {
        var _a;
        const roundedIndex = Math.round(index2);
        const targetIndex = loop2 ? modulus(roundedIndex, mergedTotal) : bound(roundedIndex, 0, mergedTotal - 1);
        if (targetIndex !== getCurrent()) {
          (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, targetIndex);
        }
        setCurrent(targetIndex);
        api.start({
          position: (loop2 ? roundedIndex : boundIndex(roundedIndex)) * 100,
          immediate
        });
      }
      function swipeNext() {
        swipeTo(Math.round(position.get() / 100) + 1);
      }
      function swipePrev() {
        swipeTo(Math.round(position.get() / 100) - 1);
      }
      React$1.useImperativeHandle(ref, () => ({
        swipeTo,
        swipeNext,
        swipePrev
      }));
      useIsomorphicLayoutEffect$2(() => {
        const maxIndex = mergedTotal - 1;
        if (current > maxIndex) {
          swipeTo(maxIndex, true);
        }
      });
      const {
        autoplay,
        autoplayInterval
      } = props;
      const runTimeSwiper = () => {
        timeoutRef.current = window.setTimeout(() => {
          swipeNext();
          runTimeSwiper();
        }, autoplayInterval);
      };
      React$1.useEffect(() => {
        if (!autoplay || dragging)
          return;
        runTimeSwiper();
        return () => {
          if (timeoutRef.current)
            window.clearTimeout(timeoutRef.current);
        };
      }, [autoplay, autoplayInterval, dragging, mergedTotal]);
      function renderItem(index2, child) {
        let itemStyle = {};
        if (loop2) {
          itemStyle = {
            [isVertical ? "y" : "x"]: position.to((position2) => {
              let finalPosition = -position2 + index2 * 100;
              const totalWidth = mergedTotal * 100;
              const flagWidth = totalWidth / 2;
              finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
              return `${finalPosition}%`;
            }),
            [isVertical ? "top" : "left"]: `-${index2 * 100}%`
          };
        }
        return React$1.createElement(animated.div, {
          className: classNames(`${classPrefix$a}-slide`, {
            [`${classPrefix$a}-slide-active`]: current === index2
          }),
          style: itemStyle,
          key: index2
        }, child);
      }
      function renderItems() {
        if (renderChildren && total) {
          const offsetCount = 2;
          const startIndex = Math.max(current - offsetCount, 0);
          const endIndex = Math.min(current + offsetCount, total - 1);
          const items = [];
          for (let index2 = startIndex; index2 <= endIndex; index2 += 1) {
            items.push(renderItem(index2, renderChildren(index2)));
          }
          return React$1.createElement(React$1.Fragment, null, React$1.createElement("div", {
            className: `${classPrefix$a}-slide-placeholder`,
            style: {
              width: `${startIndex * 100}%`
            }
          }), items);
        }
        return React$1.Children.map(validChildren, (child, index2) => {
          return renderItem(index2, child);
        });
      }
      function renderTrackInner() {
        if (loop2) {
          return React$1.createElement("div", {
            className: `${classPrefix$a}-track-inner`
          }, renderItems());
        } else {
          return React$1.createElement(animated.div, {
            className: `${classPrefix$a}-track-inner`,
            style: {
              [isVertical ? "y" : "x"]: position.to((position2) => `${-position2}%`)
            }
          }, renderItems());
        }
      }
      const style = {
        "--slide-size": `${props.slideSize}%`,
        "--track-offset": `${props.trackOffset}%`
      };
      const dragProps = Object.assign({}, props.allowTouchMove ? bind() : {});
      const stopPropagationProps = {};
      for (const key of props.stopPropagation) {
        const prop = eventToPropRecord[key];
        stopPropagationProps[prop] = function(e2) {
          e2.stopPropagation();
        };
      }
      const mergedProps = mergeFuncProps(dragProps, stopPropagationProps);
      let indicatorNode = null;
      if (typeof indicator === "function") {
        indicatorNode = indicator(mergedTotal, current);
      } else if (indicator !== false) {
        indicatorNode = React$1.createElement("div", {
          className: `${classPrefix$a}-indicator`
        }, React$1.createElement(PageIndicator, Object.assign({}, props.indicatorProps, {
          total: mergedTotal,
          current,
          direction
        })));
      }
      return withNativeProps(props, React$1.createElement("div", {
        className: classNames(classPrefix$a, `${classPrefix$a}-${direction}`),
        style
      }, React$1.createElement("div", Object.assign({
        ref: trackRef,
        className: classNames(`${classPrefix$a}-track`, {
          [`${classPrefix$a}-track-allow-touch-move`]: props.allowTouchMove
        }),
        onClickCapture: (e2) => {
          if (draggingRef.current) {
            e2.stopPropagation();
          }
          forceCancelDrag();
        }
      }, mergedProps), renderTrackInner()), indicatorNode));
    };
  }));
  function modulus(value, division) {
    const remainder = value % division;
    return remainder < 0 ? remainder + division : remainder;
  }
  const index$2 = attachPropertiesToComponent(Swiper, {
    Item: SwiperItem
  });
  const SpinIcon = React$1.memo((props) => {
    return withNativeProps(props, React$1.createElement("svg", {
      width: "28px",
      height: "28px",
      viewBox: "0 0 28 28"
    }, React$1.createElement("g", {
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd"
    }, React$1.createElement("g", {
      transform: "translate(-137.000000, -840.000000)",
      fill: "#1576FE"
    }, React$1.createElement("g", {
      transform: "translate(80.000000, 823.000000)"
    }, React$1.createElement("g", {
      transform: "translate(53.000000, 13.000000)"
    }, React$1.createElement("path", {
      d: "M17.9996753,31.5 C10.5556724,31.5 4.5,25.4443275 4.5,18.0003247 C4.5,10.5563219 10.5556724,4.5 17.9996753,4.5 C18.5355492,4.5 18.9702974,4.93474816 18.9702974,5.47062208 C18.9702974,6.006496 18.5355492,6.44124416 17.9996753,6.44124416 C11.6261524,6.44124416 6.44124416,11.6267709 6.44124416,18.0002938 C6.44124416,24.3738167 11.6261524,29.5587249 17.9996753,29.5587249 C24.3731982,29.5587249 29.5587249,24.3738167 29.5587249,18.0002938 C29.5587249,14.7964616 28.2778291,11.8169616 25.9523687,9.61220279 C25.5637302,9.24317094 25.5473089,8.62893223 25.9157222,8.23967523 C26.2841356,7.84976878 26.8989928,7.83461537 27.2882498,8.20302872 C30.0042351,10.7787368 31.5,14.2580826 31.5,18.0002938 C31.5,25.4443275 25.4436781,31.5 17.9996753,31.5 Z"
    })))))));
  });
  const classPrefix$9 = `adm-switch`;
  const defaultProps$9 = {
    defaultChecked: false
  };
  const Switch = (p) => {
    const props = mergeProps(defaultProps$9, p);
    const disabled = props.disabled || props.loading || false;
    const [changing, setChanging] = React$1.useState(false);
    const {
      locale
    } = useConfig();
    const [checked, setChecked] = usePropsValue({
      value: props.checked,
      defaultValue: props.defaultChecked,
      onChange: props.onChange
    });
    function onClick() {
      return __awaiter(this, void 0, void 0, function* () {
        if (disabled || props.loading || changing) {
          return;
        }
        const nextChecked = !checked;
        if (props.beforeChange) {
          setChanging(true);
          try {
            yield props.beforeChange(nextChecked);
            setChanging(false);
          } catch (e2) {
            setChanging(false);
            throw e2;
          }
        }
        const result = setChecked(nextChecked);
        if (isPromise(result)) {
          setChanging(true);
          try {
            yield result;
            setChanging(false);
          } catch (e2) {
            setChanging(false);
            throw e2;
          }
        }
      });
    }
    return withNativeProps(props, React$1.createElement("div", {
      onClick,
      className: classNames(classPrefix$9, {
        [`${classPrefix$9}-checked`]: checked,
        [`${classPrefix$9}-disabled`]: disabled || changing
      }),
      role: "switch",
      "aria-label": locale.Switch.name,
      "aria-checked": checked,
      "aria-disabled": disabled
    }, React$1.createElement("div", {
      className: `${classPrefix$9}-checkbox`
    }, React$1.createElement("div", {
      className: `${classPrefix$9}-handle`
    }, (props.loading || changing) && React$1.createElement(SpinIcon, {
      className: `${classPrefix$9}-spin-icon`
    })), React$1.createElement("div", {
      className: `${classPrefix$9}-inner`
    }, checked ? props.checkedText : props.uncheckedText))));
  };
  const TabBarItem = () => {
    return null;
  };
  const classPrefix$8 = `adm-tab-bar`;
  const defaultProps$8 = {
    safeArea: false
  };
  const TabBar = (p) => {
    var _a;
    const props = mergeProps(defaultProps$8, p);
    let firstActiveKey = null;
    const items = [];
    traverseReactNode(props.children, (child, index2) => {
      if (!React$1.isValidElement(child))
        return;
      const key = child.key;
      if (typeof key !== "string")
        return;
      if (index2 === 0) {
        firstActiveKey = key;
      }
      items.push(child);
    });
    const [activeKey, setActiveKey] = usePropsValue({
      value: props.activeKey,
      defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
      onChange: (v) => {
        var _a2;
        if (v === null)
          return;
        (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
      }
    });
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$8
    }, React$1.createElement("div", {
      className: `${classPrefix$8}-wrap`
    }, items.map((item) => {
      const active = item.key === activeKey;
      function renderContent() {
        const iconElement = item.props.icon && React$1.createElement("div", {
          className: `${classPrefix$8}-item-icon`
        }, typeof item.props.icon === "function" ? item.props.icon(active) : item.props.icon);
        const titleElement = item.props.title && React$1.createElement("div", {
          className: classNames(`${classPrefix$8}-item-title`, Boolean(iconElement) && `${classPrefix$8}-item-title-with-icon`)
        }, typeof item.props.title === "function" ? item.props.title(active) : item.props.title);
        if (iconElement) {
          return React$1.createElement(React$1.Fragment, null, React$1.createElement(Badge, {
            content: item.props.badge,
            className: `${classPrefix$8}-icon-badge`
          }, iconElement), titleElement);
        } else if (titleElement) {
          return React$1.createElement(Badge, {
            content: item.props.badge,
            className: `${classPrefix$8}-title-badge`
          }, titleElement);
        }
        return null;
      }
      return withNativeProps(item.props, React$1.createElement("div", {
        key: item.key,
        onClick: () => {
          const {
            key
          } = item;
          if (key === void 0 || key === null)
            return;
          setActiveKey(key.toString());
        },
        className: classNames(`${classPrefix$8}-item`, {
          [`${classPrefix$8}-item-active`]: active
        })
      }, renderContent()));
    })), props.safeArea && React$1.createElement(SafeArea, {
      position: "bottom"
    })));
  };
  const index$1 = attachPropertiesToComponent(TabBar, {
    Item: TabBarItem
  });
  const classPrefix$7 = `adm-tag`;
  const colorRecord = {
    default: "var(--adm-color-text-secondary, #666666)",
    primary: "var(--adm-color-primary, #1677ff)",
    success: "var(--adm-color-success, #00b578)",
    warning: "var(--adm-color-warning, #ff8f1f)",
    danger: "var(--adm-color-danger, #ff3141)"
  };
  const defaultProps$7 = {
    color: "default",
    fill: "solid",
    round: false
  };
  const Tag = (p) => {
    var _a;
    const props = mergeProps(defaultProps$7, p);
    const color = (_a = colorRecord[props.color]) !== null && _a !== void 0 ? _a : props.color;
    const style = {
      "--border-color": color,
      "--text-color": props.fill === "outline" ? color : "#ffffff",
      "--background-color": props.fill === "outline" ? "transparent" : color
    };
    return withNativeProps(props, React$1.createElement("span", {
      style,
      onClick: props.onClick,
      className: classNames(classPrefix$7, {
        [`${classPrefix$7}-round`]: props.round
      })
    }, props.children));
  };
  const classPrefix$6 = "adm-text-area";
  const defaultProps$6 = {
    rows: 2,
    showCount: false,
    autoSize: false,
    defaultValue: ""
  };
  const TextArea = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$6, p);
    const {
      autoSize,
      showCount,
      maxLength
    } = props;
    const [value, setValue2] = usePropsValue(Object.assign(Object.assign({}, props), {
      value: props.value === null ? "" : props.value
    }));
    if (props.value === null) {
      devError("TextArea", "`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.");
    }
    const nativeTextAreaRef = React$1.useRef(null);
    const heightRef = React$1.useRef("auto");
    const hiddenTextAreaRef = React$1.useRef(null);
    React$1.useImperativeHandle(ref, () => ({
      clear: () => {
        setValue2("");
      },
      focus: () => {
        var _a;
        (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      },
      get nativeElement() {
        return nativeTextAreaRef.current;
      }
    }));
    useIsomorphicLayoutEffect$2(() => {
      if (!autoSize)
        return;
      const textArea = nativeTextAreaRef.current;
      const hiddenTextArea = hiddenTextAreaRef.current;
      if (!textArea)
        return;
      textArea.style.height = heightRef.current;
      if (!hiddenTextArea)
        return;
      let height = hiddenTextArea.scrollHeight;
      if (typeof autoSize === "object") {
        const computedStyle = window.getComputedStyle(textArea);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        if (autoSize.minRows) {
          height = Math.max(height, autoSize.minRows * lineHeight);
        }
        if (autoSize.maxRows) {
          height = Math.min(height, autoSize.maxRows * lineHeight);
        }
      }
      heightRef.current = `${height}px`;
      textArea.style.height = `${height}px`;
    }, [value, autoSize]);
    const compositingRef = React$1.useRef(false);
    let count;
    const valueLength = runes(value).length;
    if (typeof showCount === "function") {
      count = showCount(valueLength, maxLength);
    } else if (showCount) {
      count = React$1.createElement("div", {
        className: `${classPrefix$6}-count`
      }, maxLength === void 0 ? valueLength : valueLength + "/" + maxLength);
    }
    let rows = props.rows;
    if (typeof autoSize === "object") {
      if (autoSize.maxRows && rows > autoSize.maxRows) {
        rows = autoSize.maxRows;
      }
      if (autoSize.minRows && rows < autoSize.minRows) {
        rows = autoSize.minRows;
      }
    }
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$6
    }, React$1.createElement("textarea", {
      ref: nativeTextAreaRef,
      className: `${classPrefix$6}-element`,
      rows,
      value,
      placeholder: props.placeholder,
      onChange: (e2) => {
        let v = e2.target.value;
        if (maxLength && !compositingRef.current) {
          v = runes(v).slice(0, maxLength).join("");
        }
        setValue2(v);
      },
      id: props.id,
      onCompositionStart: (e2) => {
        var _a;
        compositingRef.current = true;
        (_a = props.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      onCompositionEnd: (e2) => {
        var _a;
        compositingRef.current = false;
        if (maxLength) {
          const v = e2.target.value;
          setValue2(runes(v).slice(0, maxLength).join(""));
        }
        (_a = props.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(props, e2);
      },
      autoComplete: props.autoComplete,
      autoFocus: props.autoFocus,
      disabled: props.disabled,
      readOnly: props.readOnly,
      name: props.name,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onClick: props.onClick
    }), count, autoSize && React$1.createElement("textarea", {
      ref: hiddenTextAreaRef,
      className: `${classPrefix$6}-element ${classPrefix$6}-element-hidden`,
      value,
      rows,
      "aria-hidden": true,
      readOnly: true
    })));
  });
  TextArea.defaultProps = defaultProps$6;
  const classPrefix$5 = `adm-toast`;
  const defaultProps$5 = {
    maskClickable: true,
    stopPropagation: ["click"]
  };
  const InternalToast = (p) => {
    const props = mergeProps(defaultProps$5, p);
    const {
      maskClickable,
      content,
      icon,
      position
    } = props;
    const iconElement = React$1.useMemo(() => {
      if (icon === null || icon === void 0)
        return null;
      switch (icon) {
        case "success":
          return React$1.createElement(CheckOutline, {
            className: `${classPrefix$5}-icon-success`
          });
        case "fail":
          return React$1.createElement(CloseOutline, {
            className: `${classPrefix$5}-icon-fail`
          });
        case "loading":
          return React$1.createElement(SpinLoading, {
            color: "white",
            className: `${classPrefix$5}-loading`
          });
        default:
          return icon;
      }
    }, [icon]);
    const top = React$1.useMemo(() => {
      switch (position) {
        case "top":
          return "20%";
        case "bottom":
          return "80%";
        default:
          return "50%";
      }
    }, [position]);
    return React$1.createElement(Mask, {
      visible: props.visible,
      destroyOnClose: true,
      opacity: 0,
      disableBodyScroll: !maskClickable,
      getContainer: props.getContainer,
      afterClose: props.afterClose,
      style: Object.assign({
        pointerEvents: maskClickable ? "none" : "auto"
      }, props.maskStyle),
      className: classNames(`${classPrefix$5}-mask`, props.maskClassName),
      stopPropagation: props.stopPropagation
    }, React$1.createElement("div", {
      className: classNames(`${classPrefix$5}-wrap`)
    }, React$1.createElement("div", {
      style: {
        top
      },
      className: classNames(`${classPrefix$5}-main`, icon ? `${classPrefix$5}-main-icon` : `${classPrefix$5}-main-text`)
    }, iconElement && React$1.createElement("div", {
      className: `${classPrefix$5}-icon`
    }, iconElement), React$1.createElement(AutoCenter, null, content))));
  };
  let currentHandler = null;
  let currentTimeout = null;
  const defaultProps$4 = {
    duration: 2e3,
    position: "center",
    maskClickable: true
  };
  const ToastInner = (props) => React$1.createElement(InternalToast, Object.assign({}, props));
  function show(p) {
    const props = mergeProps(defaultProps$4, typeof p === "string" ? {
      content: p
    } : p);
    const element = React$1.createElement(ToastInner, Object.assign({}, props, {
      onClose: () => {
        currentHandler = null;
      }
    }));
    if (currentHandler) {
      currentHandler.replace(element);
    } else {
      currentHandler = renderImperatively(element);
    }
    if (currentTimeout) {
      window.clearTimeout(currentTimeout);
    }
    if (props.duration !== 0) {
      currentTimeout = window.setTimeout(() => {
        clear();
      }, props.duration);
    }
    return currentHandler;
  }
  function clear() {
    currentHandler === null || currentHandler === void 0 ? void 0 : currentHandler.close();
    currentHandler = null;
  }
  function config(val) {
    if (val.duration !== void 0) {
      defaultProps$4.duration = val.duration;
    }
    if (val.position !== void 0) {
      defaultProps$4.position = val.position;
    }
    if (val.maskClickable !== void 0) {
      defaultProps$4.maskClickable = val.maskClickable;
    }
  }
  const Toast = {
    show,
    clear,
    config
  };
  const Toast$1 = Toast;
  function getTreeDeep(treeData, childrenName = "children") {
    const walker = (tree) => {
      let deep = 0;
      tree.forEach((item) => {
        if (item[childrenName]) {
          deep = Math.max(deep, walker(item[childrenName]) + 1);
        } else {
          deep = Math.max(deep, 1);
        }
      });
      return deep;
    };
    return walker(treeData);
  }
  const classPrefix$4 = `adm-tree-select`;
  const defaultProps$3 = {
    options: [],
    fieldNames: {},
    defaultValue: []
  };
  const TreeSelect = (p) => {
    const props = mergeProps(defaultProps$3, p);
    const [labelName, valueName, childrenName] = useFieldNames(props.fieldNames);
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: props.defaultValue
    });
    const [deep, optionsMap, optionsParentMap] = React$1.useMemo(() => {
      const deep2 = getTreeDeep(props.options, childrenName);
      const optionsMap2 = /* @__PURE__ */ new Map();
      const optionsParentMap2 = /* @__PURE__ */ new Map();
      function traverse(current, children) {
        children.forEach((item) => {
          optionsParentMap2.set(item[valueName], current);
          optionsMap2.set(item[valueName], item);
          if (item[childrenName]) {
            traverse(item, item[childrenName]);
          }
        });
      }
      traverse(void 0, props.options);
      return [deep2, optionsMap2, optionsParentMap2];
    }, [props.options]);
    const onItemSelect = (node) => {
      var _a;
      const parentNodes = [];
      let current = node;
      while (current) {
        parentNodes.push(current);
        const next = optionsParentMap.get(current[valueName]);
        current = next;
      }
      const values = parentNodes.reverse().map((i2) => i2[valueName]);
      setValue2(values);
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, values, {
        options: parentNodes
      });
    };
    const renderItems = (columnOptions = [], index2) => {
      return columnOptions.map((item) => {
        const isActive = item[valueName] === value[index2];
        return React$1.createElement("div", {
          key: item[valueName],
          className: classNames(`${classPrefix$4}-item`, {
            [`${classPrefix$4}-item-active`]: isActive
          }),
          onClick: () => {
            if (!isActive) {
              onItemSelect(item);
            }
          }
        }, item[labelName]);
      });
    };
    const renderColumns = () => {
      var _a;
      const columns = [];
      for (let i2 = 0; i2 < deep; i2++) {
        let width = `${100 / deep}%`;
        if (deep === 2 && i2 === 0) {
          width = `33.33%`;
        }
        if (deep === 2 && i2 === 1) {
          width = `66.67%`;
        }
        const column = React$1.createElement("div", {
          key: i2,
          className: classNames(`${classPrefix$4}-column`),
          style: {
            width
          }
        }, renderItems(i2 === 0 ? props.options : (_a = optionsMap.get(value[i2 - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i2));
        columns.push(column);
      }
      return columns;
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$4
    }, renderColumns()));
  };
  const classPrefix$3 = `adm-tree-select-multiple`;
  const Multiple = (p) => {
    const props = mergeProps({
      options: [],
      fieldNames: {},
      allSelectText: [],
      defaultExpandKeys: [],
      defaultValue: []
    }, p);
    React$1.useEffect(() => {
      devWarning("TreeSelect", "TreeSelect.Multiple has been deprecated.");
    }, []);
    const [labelName, valueName, childrenName] = useFieldNames(props.fieldNames);
    const [expandKeys, setExpandKeys] = usePropsValue({
      value: props.expandKeys,
      defaultValue: props.defaultExpandKeys
    });
    const [value, setValue2] = usePropsValue({
      value: props.value,
      defaultValue: props.defaultValue
    });
    const getLeafKeys = (option) => {
      const keys2 = [];
      const walker = (op) => {
        var _a;
        if (!op) {
          return;
        }
        if ((_a = op[childrenName]) === null || _a === void 0 ? void 0 : _a.length) {
          op[childrenName].forEach((i2) => walker(i2));
        } else {
          keys2.push(op[valueName]);
        }
      };
      walker(option);
      return keys2;
    };
    const [deep, optionsMap, optionsParentMap] = React$1.useMemo(() => {
      const deep2 = getTreeDeep(props.options, childrenName);
      const optionsMap2 = /* @__PURE__ */ new Map();
      const optionsParentMap2 = /* @__PURE__ */ new Map();
      function traverse(current, children) {
        children.forEach((item) => {
          optionsParentMap2.set(item[valueName], current);
          optionsMap2.set(item[valueName], item);
          if (item[childrenName]) {
            traverse(item, item[childrenName]);
          }
        });
      }
      traverse(void 0, props.options);
      return [deep2, optionsMap2, optionsParentMap2];
    }, [props.options]);
    const allSelectedLeafKeys = React$1.useMemo(() => {
      let leafKeys = [];
      value.forEach((v) => {
        const option = optionsMap.get(v);
        leafKeys = leafKeys.concat(getLeafKeys(option));
      });
      return leafKeys;
    }, [value, optionsMap]);
    const dotMap = React$1.useMemo(() => {
      const map = /* @__PURE__ */ new Map();
      const walker = (key) => {
        const parentOption = optionsParentMap.get(key);
        if (!parentOption) {
          return;
        }
        map.set(parentOption[valueName], true);
        walker(parentOption[valueName]);
      };
      allSelectedLeafKeys.forEach((key) => {
        map.set(key, true);
        walker(key);
      });
      return map;
    }, [optionsParentMap, value]);
    const onChange = (targetKeys) => {
      var _a;
      let groupKeys = [...targetKeys];
      let unusedKeys = [];
      const walker = (keys2) => {
        keys2.forEach((key) => {
          var _a2;
          if (unusedKeys.includes(key)) {
            return;
          }
          const parent = optionsParentMap.get(key);
          if (!parent) {
            return;
          }
          const childrenKeys = ((_a2 = parent[childrenName]) === null || _a2 === void 0 ? void 0 : _a2.map((i2) => i2[valueName])) || [];
          if (childrenKeys.every((i2) => groupKeys.includes(i2))) {
            groupKeys.push(parent[valueName]);
            unusedKeys = unusedKeys.concat(childrenKeys);
          }
        });
      };
      for (let i2 = 0; i2 < deep; i2++) {
        walker(groupKeys);
      }
      groupKeys = groupKeys.filter((i2) => !unusedKeys.includes(i2));
      const groupOptions = groupKeys.map((i2) => optionsMap.get(i2));
      setValue2(groupKeys);
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, groupKeys, groupOptions);
    };
    const onItemSelect = (option) => {
      var _a;
      const parentNodes = [];
      let current = option;
      while (current) {
        parentNodes.unshift(current);
        const next = optionsParentMap.get(current[valueName]);
        current = next;
      }
      const keys2 = parentNodes.map((i2) => i2[valueName]);
      setExpandKeys(keys2);
      (_a = props.onExpand) === null || _a === void 0 ? void 0 : _a.call(props, keys2, parentNodes);
    };
    const renderSelectAllItem = (columnOptions, index2) => {
      var _a;
      const text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index2];
      if (!text) {
        return;
      }
      let currentLeafKeys = [];
      columnOptions.forEach((option) => {
        currentLeafKeys = currentLeafKeys.concat(getLeafKeys(option));
      });
      const allSelected = currentLeafKeys.every((i2) => allSelectedLeafKeys.includes(i2));
      return React$1.createElement("div", {
        onClick: () => {
          if (allSelected) {
            onChange(allSelectedLeafKeys.filter((i2) => !currentLeafKeys.includes(i2)));
          } else {
            onChange(allSelectedLeafKeys.concat(currentLeafKeys));
          }
        },
        className: `${classPrefix$3}-item`
      }, text);
    };
    const renderSelectAllLeafItem = (columnOptions, index2) => {
      var _a;
      const text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index2];
      if (!text) {
        return;
      }
      const currentLeafKeys = columnOptions.map((i2) => i2[valueName]);
      const allSelected = currentLeafKeys.every((i2) => allSelectedLeafKeys.includes(i2));
      const halfSelected = allSelected ? false : currentLeafKeys.some((i2) => allSelectedLeafKeys.includes(i2));
      return React$1.createElement("div", {
        onClick: () => {
          if (allSelected) {
            onChange(allSelectedLeafKeys.filter((i2) => !currentLeafKeys.includes(i2)));
          } else {
            onChange(allSelectedLeafKeys.concat(currentLeafKeys));
          }
        },
        className: classNames(`${classPrefix$3}-item`, `${classPrefix$3}-item-leaf`)
      }, React$1.createElement(Checkbox, {
        className: `${classPrefix$3}-item-checkbox`,
        checked: allSelected,
        indeterminate: halfSelected
      }), text);
    };
    const renderItem = (option) => {
      const isExpand = expandKeys.includes(option[valueName]);
      return React$1.createElement("div", {
        key: option[valueName],
        onClick: () => {
          if (!isExpand) {
            onItemSelect(option);
          }
        },
        className: classNames(`${classPrefix$3}-item`, {
          [`${classPrefix$3}-item-expand`]: isExpand
        })
      }, option[labelName], !!dotMap.get(option[valueName]) && React$1.createElement("div", {
        className: `${classPrefix$3}-dot`
      }));
    };
    const renderLeafItem = (option) => {
      const isSelected = allSelectedLeafKeys.includes(option[valueName]);
      return React$1.createElement("div", {
        key: option[valueName],
        onClick: () => {
          if (isSelected) {
            onChange(allSelectedLeafKeys.filter((val) => val !== option[valueName]));
          } else {
            onChange([...allSelectedLeafKeys, option[valueName]]);
          }
        },
        className: classNames(`${classPrefix$3}-item`, `${classPrefix$3}-item-leaf`)
      }, React$1.createElement(Checkbox, {
        className: `${classPrefix$3}-item-checkbox`,
        checked: isSelected
      }), option[labelName]);
    };
    const renderItems = (columnOptions = [], index2) => {
      if (columnOptions.length === 0) {
        return;
      }
      const isLeaf = deep === index2 + 1;
      if (isLeaf) {
        return React$1.createElement(React$1.Fragment, null, renderSelectAllLeafItem(columnOptions, index2), columnOptions.map((option) => renderLeafItem(option)));
      }
      return React$1.createElement(React$1.Fragment, null, renderSelectAllItem(columnOptions, index2), columnOptions.map((option) => renderItem(option)));
    };
    const renderColumns = () => {
      var _a;
      const columns = [];
      for (let i2 = 0; i2 < deep; i2++) {
        let width = `${100 / deep}%`;
        if (deep === 2 && i2 === 0) {
          width = `33.33%`;
        }
        if (deep === 2 && i2 === 1) {
          width = `66.67%`;
        }
        const column = React$1.createElement("div", {
          key: i2,
          className: classNames(`${classPrefix$3}-column`),
          style: {
            width
          }
        }, renderItems(i2 === 0 ? props.options : (_a = optionsMap.get(expandKeys[i2 - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i2));
        columns.push(column);
      }
      return columns;
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classPrefix$3
    }, renderColumns()));
  };
  const index = attachPropertiesToComponent(TreeSelect, {
    Multiple
  });
  const classPrefix$2 = "adm-virtual-input";
  const defaultProps$2 = {
    defaultValue: ""
  };
  const VirtualInput = React$1.forwardRef((p, ref) => {
    const props = mergeProps(defaultProps$2, p);
    const [value, setValue2] = usePropsValue(props);
    const rootRef = React$1.useRef(null);
    const contentRef = React$1.useRef(null);
    const [hasFocus, setHasFocus] = React$1.useState(false);
    const {
      locale
    } = useConfig();
    function scrollToEnd() {
      const root2 = rootRef.current;
      if (!root2)
        return;
      if (document.activeElement !== root2) {
        return;
      }
      const content = contentRef.current;
      if (!content)
        return;
      content.scrollLeft = content.clientWidth;
    }
    useIsomorphicLayoutEffect$2(() => {
      scrollToEnd();
    }, [value]);
    React$1.useEffect(() => {
      if (hasFocus) {
        scrollToEnd();
      }
    }, [hasFocus]);
    React$1.useImperativeHandle(ref, () => ({
      focus: () => {
        var _a;
        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    }));
    function onFocus() {
      var _a;
      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    function onBlur() {
      var _a;
      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    const keyboard = props.keyboard;
    const keyboardElement = keyboard && React$1.cloneElement(keyboard, {
      onInput: (v) => {
        var _a, _b;
        setValue2(value + v);
        (_b = (_a = keyboard.props).onInput) === null || _b === void 0 ? void 0 : _b.call(_a, v);
      },
      onDelete: () => {
        var _a, _b;
        setValue2(value.slice(0, -1));
        (_b = (_a = keyboard.props).onDelete) === null || _b === void 0 ? void 0 : _b.call(_a);
      },
      visible: hasFocus,
      onClose: () => {
        var _a, _b, _c, _d;
        const activeElement = document.activeElement;
        if (activeElement && ((_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.contains(activeElement))) {
          activeElement.blur();
        } else {
          (_b = rootRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
        (_d = (_c = keyboard.props).onClose) === null || _d === void 0 ? void 0 : _d.call(_c);
      },
      getContainer: null
    });
    return withNativeProps(props, React$1.createElement("div", {
      ref: rootRef,
      className: classNames(classPrefix$2, {
        [`${classPrefix$2}-disabled`]: props.disabled
      }),
      tabIndex: props.disabled ? void 0 : 0,
      role: "textbox",
      onFocus,
      onBlur,
      onClick: props.onClick
    }, React$1.createElement("div", {
      className: `${classPrefix$2}-content`,
      ref: contentRef,
      "aria-disabled": props.disabled,
      "aria-label": props.placeholder
    }, value, React$1.createElement("div", {
      className: `${classPrefix$2}-caret-container`
    }, hasFocus && React$1.createElement("div", {
      className: `${classPrefix$2}-caret`
    }))), props.clearable && !!value && hasFocus && React$1.createElement("div", {
      className: `${classPrefix$2}-clear`,
      onClick: (e2) => {
        var _a;
        e2.stopPropagation();
        setValue2("");
        (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      role: "button",
      "aria-label": locale.Input.clear
    }, React$1.createElement(CloseCircleFill, null)), [void 0, null, ""].includes(value) && React$1.createElement("div", {
      className: `${classPrefix$2}-placeholder`
    }, props.placeholder), keyboardElement));
  });
  const classPrefix$1 = `adm-water-mark`;
  const defaultProps$1 = {
    fullPage: true
  };
  const WaterMark = (p) => {
    const props = mergeProps(defaultProps$1, p);
    const {
      zIndex,
      gapX = 24,
      gapY = 48,
      width = 120,
      height = 64,
      rotate = -22,
      image,
      imageWidth = 120,
      imageHeight = 64,
      content,
      fontStyle = "normal",
      fontWeight = "normal",
      fontColor = "rgba(0,0,0,.15)",
      fontSize = 14,
      fontFamily = "sans-serif"
    } = props;
    const [base64Url, setBase64Url] = React$1.useState("");
    React$1.useEffect(() => {
      const canvas = document.createElement("canvas");
      const ratio = window.devicePixelRatio;
      const ctx2 = canvas.getContext("2d");
      const canvasWidth = `${(gapX + width) * ratio}px`;
      const canvasHeight = `${(gapY + height) * ratio}px`;
      const markWidth = width * ratio;
      const markHeight = height * ratio;
      canvas.setAttribute("width", canvasWidth);
      canvas.setAttribute("height", canvasHeight);
      if (ctx2) {
        if (image) {
          ctx2.translate(markWidth / 2, markHeight / 2);
          ctx2.rotate(Math.PI / 180 * Number(rotate));
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.referrerPolicy = "no-referrer";
          img.onload = () => {
            ctx2.drawImage(img, -imageWidth * ratio / 2, -imageHeight * ratio / 2, imageWidth * ratio, imageHeight * ratio);
            ctx2.restore();
            setBase64Url(canvas.toDataURL());
          };
          img.src = image;
        } else if (content) {
          ctx2.textBaseline = "middle";
          ctx2.textAlign = "center";
          ctx2.translate(markWidth / 2, markHeight / 2);
          ctx2.rotate(Math.PI / 180 * Number(rotate));
          const markSize = Number(fontSize) * ratio;
          ctx2.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
          ctx2.fillStyle = fontColor;
          if (Array.isArray(content)) {
            content.forEach((item, index2) => ctx2.fillText(item, 0, index2 * markSize));
          } else {
            ctx2.fillText(content, 0, 0);
          }
          ctx2.restore();
          setBase64Url(canvas.toDataURL());
        }
      } else {
        throw new Error("Canvas is not supported in the current environment");
      }
    }, [gapX, gapY, rotate, fontStyle, fontWeight, width, height, fontFamily, fontColor, image, content, fontSize]);
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix$1, {
        [`${classPrefix$1}-full-page`]: props.fullPage
      }),
      style: {
        zIndex,
        backgroundSize: `${gapX + width}px`,
        // Not give `url` if its empty. Which will cause 404 error.
        backgroundImage: base64Url === "" ? void 0 : `url('${base64Url}')`
      }
    }));
  };
  const classPrefix = `adm-footer`;
  const defaultProps = {
    label: "",
    links: [],
    content: "",
    chips: []
  };
  const Footer = (p) => {
    const props = mergeProps(defaultProps, p);
    const {
      label,
      links,
      content,
      chips,
      onChipClick,
      onLinkClick
    } = props;
    const clickChipItem = (item, index2) => {
      if ((chips === null || chips === void 0 ? void 0 : chips.length) && item.type === "link") {
        onChipClick === null || onChipClick === void 0 ? void 0 : onChipClick(item, index2);
      }
    };
    const clickLinkItem = (item, index2, e2) => {
      if (onLinkClick) {
        e2.preventDefault();
        onLinkClick(item, index2);
      }
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames(classPrefix)
    }, label && React$1.createElement("div", {
      className: `${classPrefix}-label`
    }, React$1.createElement(Divider, null, label)), !!(links === null || links === void 0 ? void 0 : links.length) && React$1.createElement("div", {
      className: `${classPrefix}-links`
    }, links.map((link, index2) => React$1.createElement(React$1.Fragment, {
      key: index2
    }, React$1.createElement("a", {
      href: link.href,
      rel: "noopener noreferrer",
      onClick: (event) => clickLinkItem(link, index2, event)
    }, link.text), index2 !== links.length - 1 && React$1.createElement(Divider, {
      direction: "vertical"
    })))), content && React$1.createElement("div", {
      className: `${classPrefix}-content`
    }, content), chips && chips.length > 0 && React$1.createElement("div", {
      className: `${classPrefix}-chips`
    }, chips.map((chip, index2) => React$1.createElement("div", {
      key: index2,
      onClick: () => clickChipItem(chip, index2),
      className: classNames(`${classPrefix}-chip`, {
        [`${classPrefix}-chip-link`]: chip.type === "link"
      })
    }, chip.text)))));
  };
  exports2.ActionSheet = index$i;
  exports2.AutoCenter = AutoCenter;
  exports2.Avatar = Avatar;
  exports2.Badge = Badge;
  exports2.Button = Button;
  exports2.Calendar = Calendar;
  exports2.CalendarPicker = CalendarPicker;
  exports2.CalendarPickerView = CalendarPickerView;
  exports2.CapsuleTabs = index$h;
  exports2.Card = Card;
  exports2.CascadePicker = index$g;
  exports2.CascadePickerView = CascadePickerView;
  exports2.Cascader = index$f;
  exports2.CascaderView = CascaderView;
  exports2.CenterPopup = CenterPopup;
  exports2.CheckList = CheckList;
  exports2.Checkbox = Checkbox;
  exports2.Collapse = index$e;
  exports2.ConfigProvider = ConfigProvider;
  exports2.DatePicker = index$d;
  exports2.DatePickerView = DatePickerView;
  exports2.Dialog = index$c;
  exports2.Divider = Divider;
  exports2.DotLoading = DotLoading;
  exports2.Dropdown = index$b;
  exports2.Ellipsis = Ellipsis;
  exports2.Empty = Empty;
  exports2.ErrorBlock = ErrorBlock;
  exports2.FloatingBubble = FloatingBubble;
  exports2.FloatingPanel = FloatingPanel;
  exports2.Footer = Footer;
  exports2.Form = index$a;
  exports2.Grid = Grid;
  exports2.Image = Image$1;
  exports2.ImageUploader = ImageUploader;
  exports2.ImageViewer = ImageViewer;
  exports2.IndexBar = index$9;
  exports2.InfiniteScroll = InfiniteScroll;
  exports2.Input = Input;
  exports2.JumboTabs = index$8;
  exports2.List = List$1;
  exports2.Loading = DotLoading;
  exports2.Mask = Mask;
  exports2.Modal = index$7;
  exports2.NavBar = NavBar;
  exports2.NoticeBar = NoticeBar;
  exports2.NumberKeyboard = NumberKeyboard;
  exports2.PageIndicator = PageIndicator;
  exports2.PasscodeInput = PasscodeInput;
  exports2.Picker = Picker;
  exports2.PickerView = PickerView;
  exports2.Popover = Popover;
  exports2.Popup = Popup;
  exports2.ProgressBar = ProgressBar;
  exports2.ProgressCircle = ProgressCircle;
  exports2.PullToRefresh = PullToRefresh;
  exports2.Radio = index$6;
  exports2.Rate = Rate;
  exports2.Result = Result;
  exports2.ResultPage = index$5;
  exports2.SafeArea = SafeArea;
  exports2.ScrollMask = ScrollMask;
  exports2.SearchBar = SearchBar;
  exports2.Selector = Selector;
  exports2.SideBar = index$4;
  exports2.Skeleton = Skeleton;
  exports2.Slider = Slider;
  exports2.Space = Space;
  exports2.SpinLoading = SpinLoading;
  exports2.Stepper = Stepper;
  exports2.Steps = index$3;
  exports2.SwipeAction = SwipeAction;
  exports2.Swiper = index$2;
  exports2.Switch = Switch;
  exports2.TabBar = index$1;
  exports2.Tabs = Tabs;
  exports2.Tag = Tag;
  exports2.TextArea = TextArea;
  exports2.Toast = Toast$1;
  exports2.TreeSelect = index;
  exports2.VirtualInput = VirtualInput;
  exports2.WaterMark = WaterMark;
  exports2.createErrorBlock = createErrorBlock;
  exports2.reduceMotion = reduceMotion;
  exports2.restoreMotion = restoreMotion;
  exports2.setDefaultConfig = setDefaultConfig;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
