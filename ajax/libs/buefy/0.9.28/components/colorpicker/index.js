/*! Buefy v0.9.28 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Colorpicker = {}));
})(this, (function (exports) { 'use strict';

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    try {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    } catch (e) {
      return typeof fn === "function";
    }
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultIconPrev: 'chevron-left',
    defaultIconNext: 'chevron-right',
    defaultLocale: undefined,
    defaultDialogConfirmText: null,
    defaultDialogCancelText: null,
    defaultSnackbarDuration: 3500,
    defaultSnackbarPosition: null,
    defaultToastDuration: 2000,
    defaultToastPosition: null,
    defaultNotificationDuration: 2000,
    defaultNotificationPosition: null,
    defaultTooltipType: 'is-primary',
    defaultTooltipDelay: null,
    defaultTooltipCloseDelay: null,
    defaultSidebarDelay: null,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null,
    defaultDateCreator: null,
    defaultTimeCreator: null,
    defaultDayNames: null,
    defaultMonthNames: null,
    defaultFirstDayOfWeek: null,
    defaultUnselectableDaysOfWeek: null,
    defaultTimeFormatter: null,
    defaultTimeParser: null,
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
    defaultModalScroll: null,
    defaultDatepickerMobileNative: true,
    defaultTimepickerMobileNative: true,
    defaultTimepickerMobileModal: true,
    defaultNoticeQueue: true,
    defaultInputHasCounter: true,
    defaultTaginputHasCounter: true,
    defaultUseHtml5Validation: true,
    defaultDropdownMobileModal: true,
    defaultFieldLabelPosition: null,
    defaultDatepickerYearsRange: [-100, 10],
    defaultDatepickerNearbyMonthDays: true,
    defaultDatepickerNearbySelectableMonthDays: false,
    defaultDatepickerShowWeekNumber: false,
    defaultDatepickerWeekNumberClickable: false,
    defaultDatepickerMobileModal: true,
    defaultTrapFocus: true,
    defaultAutoFocus: true,
    defaultButtonRounded: false,
    defaultSwitchRounded: true,
    defaultCarouselInterval: 3500,
    defaultTabsExpanded: false,
    defaultTabsAnimated: true,
    defaultTabsType: null,
    defaultStatusIcon: true,
    defaultProgrammaticPromise: false,
    defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
    defaultImageWebpFallback: null,
    defaultImageLazy: true,
    defaultImageResponsive: true,
    defaultImageRatio: null,
    defaultImageSrcsetFormatter: null,
    defaultBreadcrumbTag: 'a',
    defaultBreadcrumbAlign: 'is-left',
    defaultBreadcrumbSeparator: '',
    defaultBreadcrumbSize: 'is-medium',
    customIconPacks: null
  };

  /**
   * Checks if the flag is set
   * @param val
   * @param flag
   * @returns {boolean}
   */
  function hasFlag(val, flag) {
    return (val & flag) === flag;
  }

  /**
   * Merge function to replace Object.assign with deep merging possibility
   */
  var isObject = function isObject(item) {
    return _typeof(item) === 'object' && !Array.isArray(item);
  };
  var mergeFn = function mergeFn(target, source) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (deep || !Object.assign) {
      var isDeep = function isDeep(prop) {
        return isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop]);
      };
      var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
        return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
      }).reduce(function (a, b) {
        return _objectSpread2(_objectSpread2({}, a), b);
      }, {});
      return _objectSpread2(_objectSpread2({}, target), replaced);
    } else {
      return Object.assign(target, source);
    }
  };
  var merge = mergeFn;

  /**
   * Mobile detection
   * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
   */
  var isMobile = {
    Android: function Android() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return typeof window !== 'undefined' && (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    },
    Opera: function Opera() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
  function createAbsoluteElement(el) {
    var root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.left = '0px';
    root.style.top = '0px';
    root.style.width = '100%';
    var wrapper = document.createElement('div');
    root.appendChild(wrapper);
    wrapper.appendChild(el);
    document.body.appendChild(root);
    return root;
  }
  function isVueComponent(c) {
    return c && c._isVue;
  }
  function toCssWidth(width) {
    return width === undefined ? null : isNaN(width) ? width : width + 'px';
  }
  function isCustomElement(vm) {
    return 'shadowRoot' in vm.$root.$options;
  }

  var FormElementMixin = {
    props: {
      size: String,
      expanded: Boolean,
      loading: Boolean,
      rounded: Boolean,
      icon: String,
      iconPack: String,
      // Native options to use in HTML5 validation
      autocomplete: String,
      maxlength: [Number, String],
      useHtml5Validation: {
        type: Boolean,
        default: function _default() {
          return config.defaultUseHtml5Validation;
        }
      },
      validationMessage: String,
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      },
      statusIcon: {
        type: Boolean,
        default: function _default() {
          return config.defaultStatusIcon;
        }
      }
    },
    data: function data() {
      return {
        isValid: true,
        isFocused: false,
        newIconPack: this.iconPack || config.defaultIconPack
      };
    },
    computed: {
      /**
       * Find parent Field, max 3 levels deep.
       */
      parentField: function parentField() {
        var parent = this.$parent;
        for (var i = 0; i < 3; i++) {
          if (parent && !parent.$data._isField) {
            parent = parent.$parent;
          }
        }
        return parent;
      },
      /**
       * Get the type prop from parent if it's a Field.
       */
      statusType: function statusType() {
        var _ref = this.parentField || {},
          newType = _ref.newType;
        if (!newType) return;
        if (typeof newType === 'string') {
          return newType;
        } else {
          for (var key in newType) {
            if (newType[key]) {
              return key;
            }
          }
        }
      },
      /**
       * Get the message prop from parent if it's a Field.
       */
      statusMessage: function statusMessage() {
        if (!this.parentField) return;
        return this.parentField.newMessage || this.parentField.$slots.message;
      },
      /**
       * Fix icon size for inputs, large was too big
       */
      iconSize: function iconSize() {
        switch (this.size) {
          case 'is-small':
            return this.size;
          case 'is-medium':
            return;
          case 'is-large':
            return this.newIconPack === 'mdi' ? 'is-medium' : '';
        }
      }
    },
    methods: {
      /**
       * Focus method that work dynamically depending on the component.
       */
      focus: function focus() {
        var el = this.getElement();
        if (el === undefined) return;
        this.$nextTick(function () {
          if (el) el.focus();
        });
      },
      onBlur: function onBlur($event) {
        this.isFocused = false;
        this.$emit('blur', $event);
        this.checkHtml5Validity();
      },
      onFocus: function onFocus($event) {
        this.isFocused = true;
        this.$emit('focus', $event);
      },
      getElement: function getElement() {
        var el = this.$refs[this.$data._elementRef];
        while (isVueComponent(el)) {
          el = el.$refs[el.$data._elementRef];
        }
        return el;
      },
      setInvalid: function setInvalid() {
        var type = 'is-danger';
        var message = this.validationMessage || this.getElement().validationMessage;
        this.setValidity(type, message);
      },
      setValidity: function setValidity(type, message) {
        var _this = this;
        this.$nextTick(function () {
          if (_this.parentField) {
            // Set type only if not defined
            if (!_this.parentField.type) {
              _this.parentField.newType = type;
            }
            // Set message only if not defined
            if (!_this.parentField.message) {
              _this.parentField.newMessage = message;
            }
          }
        });
      },
      /**
       * Check HTML5 validation, set isValid property.
       * If validation fail, send 'is-danger' type,
       * and error message to parent if it's a Field.
       */
      checkHtml5Validity: function checkHtml5Validity() {
        if (!this.useHtml5Validation) return;
        var el = this.getElement();
        if (el === undefined) return;
        if (!el.checkValidity()) {
          this.setInvalid();
          this.isValid = false;
        } else {
          this.setValidity(null, null);
          this.isValid = true;
        }
        return this.isValid;
      }
    }
  };

  var colorChannels = ['red', 'green', 'blue', 'alpha'];
  var colorsNammed = {
    transparent: '#00000000',
    black: '#000000',
    silver: '#c0c0c0',
    gray: '#808080',
    white: '#ffffff',
    maroon: '#800000',
    red: '#ff0000',
    purple: '#800080',
    fuchsia: '#ff00ff',
    green: '#008000',
    lime: '#00ff00',
    olive: '#808000',
    yellow: '#ffff00',
    navy: '#000080',
    blue: '#0000ff',
    teal: '#008080',
    aqua: '#00ffff',
    orange: '#ffa500',
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    blanchedalmond: '#ffebcd',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    oldlace: '#fdf5e6',
    olivedrab: '#6b8e23',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    whitesmoke: '#f5f5f5',
    yellowgreen: '#9acd32',
    rebeccapurple: '#663399'
  };
  var ColorTypeError = /*#__PURE__*/function (_Error) {
    _inherits(ColorTypeError, _Error);
    var _super = _createSuper(ColorTypeError);
    function ColorTypeError() {
      _classCallCheck(this, ColorTypeError);
      return _super.call(this, 'ColorTypeError: type must be hex(a), rgb(a) or hsl(a)');
    }
    return _createClass(ColorTypeError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var Color = /*#__PURE__*/function (_Symbol$toString) {
    function Color() {
      var _this = this;
      _classCallCheck(this, Color);
      if (arguments.length > 0) {
        return Color.parse.apply(Color, arguments);
      }
      this.$channels = new Uint8Array(colorChannels.length);
      colorChannels.forEach(function (channel, index) {
        Object.defineProperty(_this, channel, {
          get: function get() {
            return _this.$channels[index];
          },
          set: function set(byte) {
            if (!Number.isNaN(byte / 1)) {
              _this.$channels[index] = Math.min(255, Math.max(0, byte));
            }
          },
          enumerable: true,
          configurable: true
        });
      })
      // Required for observability
      ;
      ['hue', 'saturation', 'lightness'].forEach(function (name) {
        var capitalizedName = name.replace(/^./, function (m) {
          return m.toUpperCase();
        });
        Object.defineProperty(_this, name, {
          get: function get() {
            return _this["get".concat(capitalizedName)]();
          },
          set: function set(value) {
            if (!Number.isNaN(value / 1)) {
              _this["set".concat(capitalizedName)](value);
            }
          },
          enumerable: true,
          configurable: true
        });
      });
    }
    _createClass(Color, [{
      key: "getHue",
      value: function getHue() {
        var _Array$from$map = Array.from(this.$channels).map(function (c) {
            return c / 255;
          }),
          _Array$from$map2 = _slicedToArray(_Array$from$map, 3),
          red = _Array$from$map2[0],
          green = _Array$from$map2[1],
          blue = _Array$from$map2[2];
        var _ref = [Math.min(red, green, blue), Math.max(red, green, blue)],
          min = _ref[0],
          max = _ref[1];
        var delta = max - min;
        var hue = 0;
        if (delta === 0) {
          return hue;
        }
        if (red === max) {
          hue = (green - blue) / delta % 6;
        } else if (green === max) {
          hue = (blue - red) / delta + 2;
        } else {
          hue = (red - green) / delta + 4;
        }
        hue *= 60;
        while (hue !== -Infinity && hue < 0) hue += 360;
        return Math.round(hue % 360);
      }
    }, {
      key: "setHue",
      value: function setHue(value) {
        var color = Color.fromHSL(value, this.saturation, this.lightness, this.alpha / 255);
        for (var i = 0; i < this.$channels.length; i++) {
          this.$channels[i] = Number(color.$channels[i]);
        }
      }
    }, {
      key: "getSaturation",
      value: function getSaturation() {
        var _Array$from$map3 = Array.from(this.$channels).map(function (c) {
            return c / 255;
          }),
          _Array$from$map4 = _slicedToArray(_Array$from$map3, 3),
          red = _Array$from$map4[0],
          green = _Array$from$map4[1],
          blue = _Array$from$map4[2];
        var _ref2 = [Math.min(red, green, blue), Math.max(red, green, blue)],
          min = _ref2[0],
          max = _ref2[1];
        var delta = max - min;
        return delta !== 0 ? Math.round(delta / (1 - Math.abs(2 * this.lightness - 1)) * 100) / 100 : 0;
      }
    }, {
      key: "setSaturation",
      value: function setSaturation(value) {
        var _this2 = this;
        var color = Color.fromHSL(this.hue, value, this.lightness, this.alpha / 255);
        colorChannels.forEach(function (_, i) {
          return _this2.$channels[i] = color.$channels[i];
        });
      }
    }, {
      key: "getLightness",
      value: function getLightness() {
        var _Array$from$map5 = Array.from(this.$channels).map(function (c) {
            return c / 255;
          }),
          _Array$from$map6 = _slicedToArray(_Array$from$map5, 3),
          red = _Array$from$map6[0],
          green = _Array$from$map6[1],
          blue = _Array$from$map6[2];
        var _ref3 = [Math.min(red, green, blue), Math.max(red, green, blue)],
          min = _ref3[0],
          max = _ref3[1];
        return Math.round((max + min) / 2 * 100) / 100;
      }
    }, {
      key: "setLightness",
      value: function setLightness(value) {
        var _this3 = this;
        var color = Color.fromHSL(this.hue, this.lightness, value, this.alpha / 255);
        colorChannels.forEach(function (_, i) {
          return _this3.$channels[i] = color.$channels[i];
        });
      }
    }, {
      key: "clone",
      value: function clone() {
        var _this4 = this;
        var color = new Color();
        colorChannels.forEach(function (_, i) {
          return color.$channels[i] = _this4.$channels[i];
        });
        return color;
      }
    }, {
      key: "toString",
      value: function toString() {
        var _this5 = this;
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hex';
        switch (String(type).toLowerCase()) {
          case 'hex':
            return '#' + colorChannels.slice(0, 3).map(function (channel) {
              return _this5[channel].toString(16).padStart(2, '0');
            }).join('');
          case 'hexa':
            return '#' + colorChannels.map(function (channel) {
              return _this5[channel].toString(16).padStart(2, '0');
            }).join('');
          case 'rgb':
            return "rgb(".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ")");
          case 'rgba':
            return "rgba(".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ", ").concat(Math.round(this.alpha / 2.55) / 100, ")");
          case 'hsl':
            return "hsl(".concat(Math.round(this.hue), "deg, ").concat(Math.round(this.saturation * 100), "%, ").concat(Math.round(this.lightness * 100), "%)");
          case 'hsla':
            return "hsla(".concat(Math.round(this.hue), "deg, ").concat(Math.round(this.saturation * 100), "%, ").concat(Math.round(this.lightness * 100), "%, ").concat(Math.round(this.alpha / 2.55) / 100, ")");
          default:
            throw new ColorTypeError();
        }
      }
    }, {
      key: _Symbol$toString,
      get: function get() {
        return this.toString('hex');
      }
    }], [{
      key: "parse",
      value: function parse() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (_typeof(args[0]) === 'object') {
          return Color.parseObject(args[0]);
        } else if (args.every(function (arg) {
          return !Number.isNaN(arg / 1);
        })) {
          var color = new Color();
          if (args.length > 3) {
            color.red = args[0];
            color.green = args[1];
            color.blue = args[2];
            if (args[3]) {
              color.alpha = args[3];
            }
          } else if (args.length === 1) {
            var index = Number(args[0]);
            return Color.parseIndex(index, index > Math.pow(2, 24) ? 3 : 4);
          }
        } else if (typeof args[0] === 'string') {
          var match = null;
          if (typeof colorsNammed[args[0].toLowerCase()] === 'string') {
            return Color.parseHex(colorsNammed[args[0].toLowerCase()]);
          } else if ((match = args[0].match(/^(#|&h|0x)?(([a-f0-9]{3,4}){1,2})$/i)) !== null) {
            return Color.parseHex(match[2]);
          } else if ((match = args[0].match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(\s*,\s*(\d*\.?\d+))?\s*\)$/i)) !== null) {
            var channels = [match[1], match[2], match[3], typeof match[5] !== 'undefined' ? match[5] : 1];
            return Color.fromRGB.apply(Color, _toConsumableArray(channels.map(function (value) {
              return Number(value);
            })));
          } else if (args[0].match(/^(h(sl|wb)a?|lab|color|cmyk)\(/i)) {
            throw new Error('Color expression not implemented yet');
          }
        }
        throw new Error('Invalid color expression');
      }
    }, {
      key: "parseObject",
      value: function parseObject(object) {
        var color = new Color();
        if (object === null || _typeof(object) !== 'object') {
          return color;
        }
        if (Color.isColor(object)) {
          return object.clone();
        }
        colorChannels.forEach(function (channel) {
          if (!Number.isNaN(object[channel])) {
            color[channel] = object[channel];
          }
        });
        return color;
      }
    }, {
      key: "parseHex",
      value: function parseHex(hex) {
        if (typeof hex !== 'string') {
          throw new Error('Hex expression must be a string');
        }
        hex = hex.trim().replace(/^(0x|&h|#)/i, '');
        if (hex.length === 3 || hex.length === 4) {
          hex = hex.split('').map(function (c) {
            return c.repeat(2);
          }).join('');
        }
        if (!(hex.length === 6 || hex.length === 8)) {
          throw new Error('Incorrect Hex expression length');
        }
        var chans = hex.split(/(..)/).filter(function (value) {
          return value;
        }).map(function (value) {
          return Number.parseInt(value, 16);
        });
        if (typeof chans[3] === 'number') {
          chans[3] /= 255;
        }
        return Color.fromRGB.apply(Color, _toConsumableArray(chans));
      }
    }, {
      key: "parseIndex",
      value: function parseIndex(value) {
        var channels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        var color = new Color();
        for (var i = 0; i < 4; i++) {
          color[colorChannels[i]] = value >> (channels - i) * 8 && 0xff;
        }
        return color;
      }
    }, {
      key: "fromRGB",
      value: function fromRGB(red, green, blue) {
        var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        if ([red, green, blue, alpha].some(function (arg) {
          return Number.isNaN(arg / 1);
        })) {
          throw new Error('Invalid arguments');
        }
        alpha *= 255;
        var color = new Color();
        [red, green, blue, alpha].forEach(function (value, index) {
          color[colorChannels[index]] = value;
        });
        return color;
      }
    }, {
      key: "fromHSL",
      value: function fromHSL(hue, saturation, lightness) {
        var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        if ([hue, saturation, lightness, alpha].some(function (arg) {
          return Number.isNaN(arg);
        })) {
          throw new Error('Invalid arguments');
        }
        while (hue < 0 && hue !== -Infinity) hue += 360;
        hue = hue % 360;
        saturation = Math.max(0, Math.min(1, saturation));
        lightness = Math.max(0, Math.min(1, lightness));
        alpha = Math.max(0, Math.min(1, alpha));
        var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        var x = c * (1 - Math.abs(hue / 60 % 2 - 1));
        var m = lightness - c / 2;
        var _ref4 = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x],
          _ref5 = _slicedToArray(_ref4, 3),
          r = _ref5[0],
          g = _ref5[1],
          b = _ref5[2];
        return Color.fromRGB((r + m) * 255, (g + m) * 255, (b + m) * 255, alpha);
      }
    }, {
      key: "isColor",
      value: function isColor(arg) {
        return arg instanceof Color;
      }
    }]);
    return Color;
  }(Symbol.toString);
  var Color$1 = Color;

  var findFocusable = function findFocusable(element) {
    var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!element) {
      return null;
    }
    if (programmatic) {
      return element.querySelectorAll("*[tabindex=\"-1\"]");
    }
    return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
  };
  var onKeyDown;
  var bind = function bind(el, _ref) {
    var _ref$value = _ref.value,
      value = _ref$value === void 0 ? true : _ref$value;
    if (value) {
      var focusable = findFocusable(el);
      var focusableProg = findFocusable(el, true);
      if (focusable && focusable.length > 0) {
        onKeyDown = function onKeyDown(event) {
          // Need to get focusable each time since it can change between key events
          // ex. changing month in a datepicker
          focusable = findFocusable(el);
          focusableProg = findFocusable(el, true);
          var firstFocusable = focusable[0];
          var lastFocusable = focusable[focusable.length - 1];
          if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            lastFocusable.focus();
          } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            firstFocusable.focus();
          }
        };
        el.addEventListener('keydown', onKeyDown);
      }
    }
  };
  var unbind = function unbind(el) {
    el.removeEventListener('keydown', onKeyDown);
  };
  var directive = {
    bind: bind,
    unbind: unbind
  };
  var trapFocus = directive;

  var items = 1;
  var sorted$1 = 3;
  var ProviderParentMixin = (function (itemName) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mixin = {
      provide: function provide() {
        return _defineProperty({}, 'b' + itemName, this);
      }
    };
    if (hasFlag(flags, items)) {
      mixin.data = function () {
        return {
          childItems: []
        };
      };
      mixin.methods = {
        _registerItem: function _registerItem(item) {
          this.childItems.push(item);
        },
        _unregisterItem: function _unregisterItem(item) {
          this.childItems = this.childItems.filter(function (i) {
            return i !== item;
          });
        }
      };
      if (hasFlag(flags, sorted$1)) {
        mixin.watch = {
          /**
           * When items are added/removed deep search in the elements default's slot
           * And mark the items with their index
           */
          childItems: function childItems(items) {
            if (items.length > 0 && this.$scopedSlots.default) {
              var tag = items[0].$vnode.tag;
              var index = 0;
              var deepSearch = function deepSearch(children) {
                var _iterator = _createForOfIteratorHelper(children),
                  _step;
                try {
                  var _loop = function _loop() {
                    var child = _step.value;
                    if (child.tag === tag) {
                      // An item with the same tag will for sure be found
                      var it = items.find(function (i) {
                        return i.$vnode === child;
                      });
                      if (it) {
                        it.index = index++;
                      }
                    } else if (child.tag) {
                      var sub = child.componentInstance ? child.componentInstance.$scopedSlots.default ? child.componentInstance.$scopedSlots.default() : child.componentInstance.$children : child.children;
                      if (Array.isArray(sub) && sub.length > 0) {
                        deepSearch(sub.map(function (e) {
                          return e.$vnode;
                        }));
                      }
                    }
                  };
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                return false;
              };
              deepSearch(this.$scopedSlots.default());
            }
          }
        };
        mixin.computed = {
          /**
           * When items are added/removed sort them according to their position
           */
          sortedItems: function sortedItems() {
            return this.childItems.slice().sort(function (i1, i2) {
              return i1.index - i2.index;
            });
          }
        };
      }
    }
    return mixin;
  });

  var DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];
  var script$b = {
    name: 'BDropdown',
    directives: {
      trapFocus: trapFocus
    },
    mixins: [ProviderParentMixin('dropdown')],
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
        default: null
      },
      disabled: Boolean,
      inline: Boolean,
      scrollable: Boolean,
      maxHeight: {
        type: [String, Number],
        default: 200
      },
      position: {
        type: String,
        validator: function validator(value) {
          return ['is-top-right', 'is-top-left', 'is-bottom-left', 'is-bottom-right'].indexOf(value) > -1;
        }
      },
      triggers: {
        type: Array,
        default: function _default() {
          return ['click'];
        }
      },
      mobileModal: {
        type: Boolean,
        default: function _default() {
          return config.defaultDropdownMobileModal;
        }
      },
      ariaRole: {
        type: String,
        validator: function validator(value) {
          return ['menu', 'list', 'dialog'].indexOf(value) > -1;
        },
        default: null
      },
      animation: {
        type: String,
        default: 'fade'
      },
      multiple: Boolean,
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      canClose: {
        type: [Array, Boolean],
        default: true
      },
      expanded: Boolean,
      appendToBody: Boolean,
      appendToBodyCopyParent: Boolean,
      triggerTabindex: {
        type: Number,
        default: 0
      }
    },
    data: function data() {
      return {
        selected: this.value,
        style: {},
        isActive: false,
        isHoverable: false,
        maybeTap: false,
        isTouchEnabled: false,
        _bodyEl: undefined,
        // Used to append to body
        timeOutID: null,
        timeOutID2: null
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [this.position, {
          'is-disabled': this.disabled,
          'is-hoverable': this.hoverable,
          'is-inline': this.inline,
          'is-active': this.isActive || this.inline,
          'is-mobile-modal': this.isMobileModal,
          'is-expanded': this.expanded,
          'is-touch-enabled': this.isTouchEnabled
        }];
      },
      isMobileModal: function isMobileModal() {
        return this.mobileModal && !this.inline;
      },
      cancelOptions: function cancelOptions() {
        return typeof this.canClose === 'boolean' ? this.canClose ? DEFAULT_CLOSE_OPTIONS : [] : this.canClose;
      },
      contentStyle: function contentStyle() {
        return {
          maxHeight: this.scrollable ? toCssWidth(this.maxHeight) : null,
          overflow: this.scrollable ? 'auto' : null
        };
      },
      hoverable: function hoverable() {
        return this.triggers.indexOf('hover') >= 0;
      }
    },
    watch: {
      /**
      * When v-model is changed set the new selected item.
      */
      value: function value(_value) {
        this.selected = _value;
      },
      /**
      * Emit event when isActive value is changed.
      *
      * Also resets `isTouchEnabled` when it turns inactive.
      */
      isActive: function isActive(value) {
        var _this = this;
        this.$emit('active-change', value);
        if (!value) {
          // delays to reset the touch enabled flag until the dropdown
          // menu disappears to avoid glitches
          // also takes care of chattering, e.g., repeated quick taps,
          // otherwise the flag may become inconsistent with the actual
          // state of the dropdown menu
          this.timeOutID = setTimeout(function () {
            if (!_this.isActive) {
              _this.isTouchEnabled = false;
            }
          }, 250);
        }
        this.handleScroll();
        if (this.appendToBody) {
          this.$nextTick(function () {
            _this.updateAppendToBody();
          });
        }
      },
      isHoverable: function isHoverable(value) {
        if (this.hoverable) {
          this.$emit('active-change', value);
        }
      }
    },
    methods: {
      handleScroll: function handleScroll() {
        if (typeof window === 'undefined') return;
        if (this.isMobileModal) {
          if (this.isActive) {
            document.documentElement.classList.add('is-clipped-touch');
          } else {
            document.documentElement.classList.remove('is-clipped-touch');
          }
        }
      },
      /**
       * Click listener from DropdownItem.
       *   1. Set new selected item.
       *   2. Emit input event to update the user v-model.
       *   3. Close the dropdown.
       */
      selectItem: function selectItem(value) {
        if (this.multiple) {
          if (this.selected) {
            if (this.selected.indexOf(value) === -1) {
              // Add value
              this.selected = [].concat(_toConsumableArray(this.selected), [value]);
            } else {
              // Remove value
              this.selected = this.selected.filter(function (val) {
                return val !== value;
              });
            }
          } else {
            this.selected = [value];
          }
          this.$emit('change', this.selected);
        } else {
          if (this.selected !== value) {
            this.selected = value;
            this.$emit('change', this.selected);
          }
        }
        this.$emit('input', this.selected);
        if (!this.multiple) {
          this.isActive = !this.closeOnClick;
          if (this.hoverable && this.closeOnClick) {
            this.isHoverable = false;
          }
        }
      },
      /**
      * White-listed items to not close when clicked.
      */
      isInWhiteList: function isInWhiteList(el) {
        if (el === this.$refs.dropdownMenu) return true;
        if (el === this.$refs.trigger) return true;
        // All chidren from dropdown
        if (this.$refs.dropdownMenu !== undefined) {
          var children = this.$refs.dropdownMenu.querySelectorAll('*');
          var _iterator = _createForOfIteratorHelper(children),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var child = _step.value;
              if (el === child) {
                return true;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        // All children from trigger
        if (this.$refs.trigger !== undefined) {
          var _children = this.$refs.trigger.querySelectorAll('*');
          var _iterator2 = _createForOfIteratorHelper(_children),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _child = _step2.value;
              if (el === _child) {
                return true;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        return false;
      },
      /**
      * Close dropdown if clicked outside.
      */
      clickedOutside: function clickedOutside(event) {
        if (this.cancelOptions.indexOf('outside') < 0) return;
        if (this.inline) return;
        var target = isCustomElement(this) ? event.composedPath()[0] : event.target;
        if (!this.isInWhiteList(target)) this.isActive = false;
      },
      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;
        if (this.isActive && (key === 'Escape' || key === 'Esc')) {
          if (this.cancelOptions.indexOf('escape') < 0) return;
          this.isActive = false;
        }
      },
      onClick: function onClick() {
        // hover precedes
        if (this.triggers.indexOf('hover') !== -1) return;
        if (this.triggers.indexOf('click') < 0) return;
        this.toggle();
      },
      onContextMenu: function onContextMenu() {
        if (this.triggers.indexOf('contextmenu') < 0) return;
        this.toggle();
      },
      onHover: function onHover() {
        if (this.triggers.indexOf('hover') < 0) return;
        // touch precedes
        if (this.isTouchEnabled) return;
        this.isHoverable = true;
      },
      // takes care of touch-enabled devices
      // - does nothing if hover trigger is disabled
      // - suppresses hover trigger by setting isTouchEnabled
      // - handles only a tap; i.e., touchstart on the trigger immediately
      //   folowed by touchend
      onTouchStart: function onTouchStart() {
        this.maybeTap = true;
      },
      onTouchMove: function onTouchMove() {
        this.maybeTap = false;
      },
      onTouchEnd: function onTouchEnd(e) {
        if (this.triggers.indexOf('hover') === -1) return;
        if (!this.maybeTap) return;
        // tap on dropdown contents may happen without preventDefault
        e.preventDefault();
        this.maybeTap = false;
        this.isTouchEnabled = true;
        this.toggle();
      },
      onFocus: function onFocus() {
        if (this.triggers.indexOf('focus') < 0) return;
        this.toggle();
      },
      /**
      * Toggle dropdown if it's not disabled.
      */
      toggle: function toggle() {
        var _this2 = this;
        if (this.disabled) return;
        if (!this.isActive) {
          // if not active, toggle after clickOutside event
          // this fixes toggling programmatic
          this.$nextTick(function () {
            var value = !_this2.isActive;
            _this2.isActive = value;
            // Vue 2.6.x ???
            _this2.timeOutID2 = setTimeout(function () {
              return _this2.isActive = value;
            });
          });
        } else {
          this.isActive = !this.isActive;
        }
      },
      updateAppendToBody: function updateAppendToBody() {
        var dropdown = this.$refs.dropdown;
        var dropdownMenu = this.$refs.dropdownMenu;
        var trigger = this.$refs.trigger;
        if (dropdownMenu && trigger) {
          // update wrapper dropdown
          var dropdownWrapper = this.$data._bodyEl.children[0];
          dropdownWrapper.classList.forEach(function (item) {
            return dropdownWrapper.classList.remove(item);
          });
          dropdownWrapper.classList.add('dropdown');
          dropdownWrapper.classList.add('dropdown-menu-animation');
          if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
            dropdownWrapper.classList.add(this.$vnode.data.staticClass);
          }
          this.rootClasses.forEach(function (item) {
            // skip position prop
            if (item && _typeof(item) === 'object') {
              for (var key in item) {
                if (item[key]) {
                  dropdownWrapper.classList.add(key);
                }
              }
            }
          });
          if (this.appendToBodyCopyParent) {
            var parentNode = this.$refs.dropdown.parentNode;
            var parent = this.$data._bodyEl;
            parent.classList.forEach(function (item) {
              return parent.classList.remove(item);
            });
            parentNode.classList.forEach(function (item) {
              parent.classList.add(item);
            });
          }
          var rect = trigger.getBoundingClientRect();
          var top = rect.top + window.scrollY;
          var left = rect.left + window.scrollX;
          if (!this.position || this.position.indexOf('bottom') >= 0) {
            top += trigger.clientHeight;
          } else {
            top -= dropdownMenu.clientHeight;
          }
          if (this.position && this.position.indexOf('left') >= 0) {
            left -= dropdownMenu.clientWidth - trigger.clientWidth;
          }
          this.style = {
            position: 'absolute',
            top: "".concat(top, "px"),
            left: "".concat(left, "px"),
            zIndex: '99',
            width: this.expanded ? "".concat(dropdown.offsetWidth, "px") : undefined
          };
        }
      }
    },
    mounted: function mounted() {
      if (this.appendToBody) {
        this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
        this.updateAppendToBody();
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);
        document.removeEventListener('keyup', this.keyPress);
      }
      if (this.appendToBody) {
        removeElement(this.$data._bodyEl);
      }
      clearTimeout(this.timeOutID);
      clearTimeout(this.timeOutID2);
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__$b = script$b;

  /* template */
  var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",staticClass:"dropdown dropdown-menu-animation",class:_vm.rootClasses,on:{"mouseleave":function($event){_vm.isHoverable = false;}}},[(!_vm.inline)?_c('div',{ref:"trigger",staticClass:"dropdown-trigger",attrs:{"tabindex":_vm.disabled ? false : _vm.triggerTabindex,"aria-haspopup":"true"},on:{"click":_vm.onClick,"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)},"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)},"touchstart":_vm.onTouchStart,"touchmove":_vm.onTouchMove,"touchend":_vm.onTouchEnd}},[_vm._t("trigger",null,{"active":_vm.isActive})],2):_vm._e(),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"background",attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",staticClass:"dropdown-menu",style:(_vm.style),attrs:{"aria-hidden":!_vm.isActive}},[_c('div',{staticClass:"dropdown-content",style:(_vm.contentStyle),attrs:{"role":_vm.ariaRole,"aria-modal":!_vm.inline}},[_vm._t("default")],2)])])],1)};
  var __vue_staticRenderFns__$a = [];

    /* style */
    const __vue_inject_styles__$b = undefined;
    /* scoped */
    const __vue_scope_id__$b = undefined;
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$b = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      undefined,
      undefined,
      undefined
    );

    var Dropdown = __vue_component__$b;

  var sorted = 1;
  var optional = 2;
  var InjectedChildMixin = (function (parentItemName) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mixin = {
      inject: {
        parent: {
          from: 'b' + parentItemName,
          default: false
        }
      },
      created: function created() {
        if (!this.parent) {
          if (!hasFlag(flags, optional)) {
            this.$destroy();
            throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
          }
        } else if (this.parent._registerItem) {
          this.parent._registerItem(this);
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (this.parent && this.parent._unregisterItem) {
          this.parent._unregisterItem(this);
        }
      }
    };
    if (hasFlag(flags, sorted)) {
      mixin.data = function () {
        return {
          index: null
        };
      };
    }
    return mixin;
  });

  //
  var script$a = {
    name: 'BDropdownItem',
    mixins: [InjectedChildMixin('dropdown')],
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
        default: null
      },
      separator: Boolean,
      disabled: Boolean,
      custom: Boolean,
      focusable: {
        type: Boolean,
        default: true
      },
      paddingless: Boolean,
      hasLink: Boolean,
      ariaRole: {
        type: String,
        default: ''
      }
    },
    computed: {
      anchorClasses: function anchorClasses() {
        return {
          'is-disabled': this.parent.disabled || this.disabled,
          'is-paddingless': this.paddingless,
          'is-active': this.isActive
        };
      },
      itemClasses: function itemClasses() {
        return {
          'dropdown-item': !this.hasLink,
          'is-disabled': this.disabled,
          'is-paddingless': this.paddingless,
          'is-active': this.isActive,
          'has-link': this.hasLink
        };
      },
      ariaRoleItem: function ariaRoleItem() {
        return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
      },
      isClickable: function isClickable() {
        return !this.parent.disabled && !this.separator && !this.disabled && !this.custom;
      },
      isActive: function isActive() {
        if (this.parent.selected === null) return false;
        if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0;
        return this.value === this.parent.selected;
      },
      isFocusable: function isFocusable() {
        return this.hasLink ? false : this.focusable;
      }
    },
    methods: {
      /**
      * Click listener, select the item.
      */
      selectItem: function selectItem() {
        if (!this.isClickable) return;
        this.parent.selectItem(this.value);
        this.$emit('click');
      }
    }
  };

  /* script */
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.separator)?_c('hr',{staticClass:"dropdown-divider"}):(!_vm.custom && !_vm.hasLink)?_c('a',{staticClass:"dropdown-item",class:_vm.anchorClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2):_c('div',{class:_vm.itemClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$9 = [];

    /* style */
    const __vue_inject_styles__$a = undefined;
    /* scoped */
    const __vue_scope_id__$a = undefined;
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      undefined,
      undefined,
      undefined
    );

    var DropdownItem = __vue_component__$a;

  var mdiIcons = {
    sizes: {
      'default': 'mdi-24px',
      'is-small': null,
      'is-medium': 'mdi-36px',
      'is-large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
  };
  var faIcons = function faIcons() {
    var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
    return {
      sizes: {
        'default': null,
        'is-small': null,
        'is-medium': faIconPrefix + 'lg',
        'is-large': faIconPrefix + '2x'
      },
      iconPrefix: faIconPrefix,
      internalIcons: {
        'information': 'info-circle',
        'alert': 'exclamation-triangle',
        'alert-circle': 'exclamation-circle',
        'chevron-right': 'angle-right',
        'chevron-left': 'angle-left',
        'chevron-down': 'angle-down',
        'eye-off': 'eye-slash',
        'menu-down': 'caret-down',
        'menu-up': 'caret-up',
        'close-circle': 'times-circle'
      }
    };
  };
  var getIcons = function getIcons() {
    var icons = {
      mdi: mdiIcons,
      fa: faIcons(),
      fas: faIcons(),
      far: faIcons(),
      fad: faIcons(),
      fab: faIcons(),
      fal: faIcons(),
      'fa-solid': faIcons(),
      'fa-regular': faIcons(),
      'fa-light': faIcons(),
      'fa-thin': faIcons(),
      'fa-duotone': faIcons(),
      'fa-brands': faIcons()
    };
    if (config && config.customIconPacks) {
      icons = merge(icons, config.customIconPacks, true);
    }
    return icons;
  };
  var getIcons$1 = getIcons;

  var script$9 = {
    name: 'BIcon',
    props: {
      type: [String, Object],
      component: String,
      pack: String,
      icon: String,
      size: String,
      customSize: String,
      customClass: String,
      both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
      iconConfig: function iconConfig() {
        var allIcons = getIcons$1();
        return allIcons[this.newPack];
      },
      iconPrefix: function iconPrefix() {
        if (this.iconConfig && this.iconConfig.iconPrefix) {
          return this.iconConfig.iconPrefix;
        }
        return '';
      },
      /**
      * Internal icon name based on the pack.
      * If pack is 'fa', gets the equivalent FA icon name of the MDI,
      * internal icons are always MDI.
      */
      newIcon: function newIcon() {
        return "".concat(this.iconPrefix).concat(this.getEquivalentIconOf(this.icon));
      },
      newPack: function newPack() {
        return this.pack || config.defaultIconPack;
      },
      newType: function newType() {
        if (!this.type) return;
        var splitType = [];
        if (typeof this.type === 'string') {
          splitType = this.type.split('-');
        } else {
          for (var key in this.type) {
            if (this.type[key]) {
              splitType = key.split('-');
              break;
            }
          }
        }
        if (splitType.length <= 1) return;
        var _splitType = splitType,
          _splitType2 = _toArray(_splitType),
          type = _splitType2.slice(1);
        return "has-text-".concat(type.join('-'));
      },
      newCustomSize: function newCustomSize() {
        return this.customSize || this.customSizeByPack;
      },
      customSizeByPack: function customSizeByPack() {
        if (this.iconConfig && this.iconConfig.sizes) {
          if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
            return this.iconConfig.sizes[this.size];
          } else if (this.iconConfig.sizes.default) {
            return this.iconConfig.sizes.default;
          }
        }
        return null;
      },
      useIconComponent: function useIconComponent() {
        return this.component || config.defaultIconComponent;
      }
    },
    methods: {
      /**
      * Equivalent icon name of the MDI.
      */
      getEquivalentIconOf: function getEquivalentIconOf(value) {
        // Only transform the class if the both prop is set to true
        if (!this.both) {
          return value;
        }
        if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
          return this.iconConfig.internalIcons[value];
        }
        return value;
      }
    }
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
  var __vue_staticRenderFns__$8 = [];

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      undefined,
      undefined,
      undefined
    );

    var Icon = __vue_component__$9;

  var script$8 = {
    name: 'BInput',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: [Number, String],
      type: {
        type: String,
        default: 'text'
      },
      lazy: {
        type: Boolean,
        default: false
      },
      passwordReveal: Boolean,
      iconClickable: Boolean,
      hasCounter: {
        type: Boolean,
        default: function _default() {
          return config.defaultInputHasCounter;
        }
      },
      customClass: {
        type: String,
        default: ''
      },
      iconRight: String,
      iconRightClickable: Boolean,
      iconRightType: String
    },
    data: function data() {
      return {
        newValue: this.value,
        newType: this.type,
        newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
        isPasswordVisible: false,
        _elementRef: this.type === 'textarea' ? 'textarea' : 'input'
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          this.newValue = value;
          this.$emit('input', value);
        }
      },
      rootClasses: function rootClasses() {
        return [this.iconPosition, this.size, {
          'is-expanded': this.expanded,
          'is-loading': this.loading,
          'is-clearfix': !this.hasMessage
        }];
      },
      inputClasses: function inputClasses() {
        return [this.statusType, this.size, {
          'is-rounded': this.rounded
        }];
      },
      hasIconRight: function hasIconRight() {
        return this.passwordReveal || this.loading || this.statusIcon && this.statusTypeIcon || this.iconRight;
      },
      rightIcon: function rightIcon() {
        if (this.passwordReveal) {
          return this.passwordVisibleIcon;
        } else if (this.iconRight) {
          return this.iconRight;
        }
        return this.statusTypeIcon;
      },
      rightIconType: function rightIconType() {
        if (this.passwordReveal) {
          return 'is-primary';
        } else if (this.iconRight) {
          return this.iconRightType || null;
        }
        return this.statusType;
      },
      /**
      * Position of the icon or if it's both sides.
      */
      iconPosition: function iconPosition() {
        var iconClasses = '';
        if (this.icon) {
          iconClasses += 'has-icons-left ';
        }
        if (this.hasIconRight) {
          iconClasses += 'has-icons-right';
        }
        return iconClasses;
      },
      /**
      * Icon name (MDI) based on the type.
      */
      statusTypeIcon: function statusTypeIcon() {
        switch (this.statusType) {
          case 'is-success':
            return 'check';
          case 'is-danger':
            return 'alert-circle';
          case 'is-info':
            return 'information';
          case 'is-warning':
            return 'alert';
        }
      },
      /**
      * Check if have any message prop from parent if it's a Field.
      */
      hasMessage: function hasMessage() {
        return !!this.statusMessage;
      },
      /**
      * Current password-reveal icon name.
      */
      passwordVisibleIcon: function passwordVisibleIcon() {
        return !this.isPasswordVisible ? 'eye' : 'eye-off';
      },
      /**
      * Get value length
      */
      valueLength: function valueLength() {
        if (typeof this.computedValue === 'string') {
          return Array.from(this.computedValue).length;
        } else if (typeof this.computedValue === 'number') {
          return this.computedValue.toString().length;
        }
        return 0;
      }
    },
    watch: {
      /**
      * When v-model is changed:
      *   1. Set internal value.
      *   2. Validate it if the value came from outside;
      *      i.e., not equal to computedValue
      */
      value: function value(_value) {
        var _this = this;
        var fromOutside = this.computedValue != _value; // eslint-disable-line eqeqeq
        this.newValue = _value;
        if (fromOutside) {
          // validation must wait for DOM updated
          this.$nextTick(function () {
            !_this.isValid && _this.checkHtml5Validity();
          });
        }
      },
      type: function type(_type) {
        this.newType = _type;
      }
    },
    methods: {
      /**
      * Toggle the visibility of a password-reveal input
      * by changing the type and focus the input right away.
      */
      togglePasswordVisibility: function togglePasswordVisibility() {
        var _this2 = this;
        this.isPasswordVisible = !this.isPasswordVisible;
        this.newType = this.isPasswordVisible ? 'text' : 'password';
        this.$nextTick(function () {
          _this2.focus();
        });
      },
      iconClick: function iconClick(emit, event) {
        var _this3 = this;
        this.$emit(emit, event);
        this.$nextTick(function () {
          _this3.focus();
        });
      },
      rightIconClick: function rightIconClick(event) {
        if (this.passwordReveal) {
          this.togglePasswordVisibility();
        } else if (this.iconRightClickable) {
          this.iconClick('icon-right-click', event);
        }
      },
      onInput: function onInput(event) {
        if (!this.lazy) {
          var value = event.target.value;
          this.updateValue(value);
        }
      },
      onChange: function onChange(event) {
        if (this.lazy) {
          var value = event.target.value;
          this.updateValue(value);
        }
      },
      updateValue: function updateValue(value) {
        this.computedValue = value;
        !this.isValid && this.checkHtml5Validity();
      }
    }
  };

  /* script */
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:_vm.rootClasses},[(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",staticClass:"input",class:[_vm.inputClasses, _vm.customClass],attrs:{"type":_vm.newType,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({ref:"textarea",staticClass:"textarea",class:[_vm.inputClasses, _vm.customClass],attrs:{"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('b-icon',{staticClass:"is-left",class:{'is-clickable': _vm.iconClickable},attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(!_vm.loading && _vm.hasIconRight)?_c('b-icon',{staticClass:"is-right",class:{ 'is-clickable': _vm.passwordReveal || _vm.iconRightClickable },attrs:{"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.iconSize,"type":_vm.rightIconType,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.type !== 'number')?_c('small',{staticClass:"help counter",class:{ 'is-invisible': !_vm.isFocused }},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
  var __vue_staticRenderFns__$7 = [];

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

    var Input = __vue_component__$8;

  var script$7 = {
    name: 'BFieldBody',
    props: {
      message: {
        type: [String, Array]
      },
      type: {
        type: [String, Object]
      }
    },
    render: function render(createElement) {
      var _this = this;
      var first = true;
      return createElement('div', {
        attrs: {
          'class': 'field-body'
        }
      }, this.$slots.default.map(function (element) {
        // skip returns and comments
        if (!element.tag) {
          return element;
        }
        var message;
        if (first) {
          message = _this.message;
          first = false;
        }
        return createElement('b-field', {
          attrs: {
            type: _this.type,
            message: message
          }
        }, [element]);
      }));
    }
  };

  /* script */
  const __vue_script__$7 = script$7;

  /* template */

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
      undefined,
      undefined
    );

    var FieldBody = __vue_component__$7;

  var script$6 = {
    name: 'BField',
    components: _defineProperty({}, FieldBody.name, FieldBody),
    provide: function provide() {
      return {
        'BField': this
      };
    },
    inject: {
      parent: {
        from: 'BField',
        default: false
      }
    },
    // Used internally only when using Field in Field
    props: {
      type: [String, Object],
      label: String,
      labelFor: String,
      message: [String, Array, Object],
      grouped: Boolean,
      groupMultiline: Boolean,
      position: String,
      expanded: Boolean,
      horizontal: Boolean,
      addons: {
        type: Boolean,
        default: true
      },
      customClass: String,
      labelPosition: {
        type: String,
        default: function _default() {
          return config.defaultFieldLabelPosition;
        }
      }
    },
    data: function data() {
      return {
        newType: this.type,
        newMessage: this.message,
        fieldLabelSize: null,
        _isField: true // Used internally by Input and Select
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [{
          'is-expanded': this.expanded,
          'is-horizontal': this.horizontal,
          'is-floating-in-label': this.hasLabel && !this.horizontal && this.labelPosition === 'inside',
          'is-floating-label': this.hasLabel && !this.horizontal && this.labelPosition === 'on-border'
        }, this.numberInputClasses];
      },
      innerFieldClasses: function innerFieldClasses() {
        return [this.fieldType(), this.newPosition, {
          'is-grouped-multiline': this.groupMultiline
        }];
      },
      hasInnerField: function hasInnerField() {
        return this.grouped || this.groupMultiline || this.hasAddons();
      },
      /**
      * Correct Bulma class for the side of the addon or group.
      *
      * This is not kept like the others (is-small, etc.),
      * because since 'has-addons' is set automatically it
      * doesn't make sense to teach users what addons are exactly.
      */
      newPosition: function newPosition() {
        if (this.position === undefined) return;
        var position = this.position.split('-');
        if (position.length < 1) return;
        var prefix = this.grouped ? 'is-grouped-' : 'has-addons-';
        if (this.position) return prefix + position[1];
      },
      /**
      * Formatted message in case it's an array
      * (each element is separated by <br> tag)
      */
      formattedMessage: function formattedMessage() {
        if (this.parent && this.parent.hasInnerField) {
          return ''; // Message will be displayed in parent field
        }
        if (typeof this.newMessage === 'string') {
          return [this.newMessage];
        }
        var messages = [];
        if (Array.isArray(this.newMessage)) {
          this.newMessage.forEach(function (message) {
            if (typeof message === 'string') {
              messages.push(message);
            } else {
              for (var key in message) {
                if (message[key]) {
                  messages.push(key);
                }
              }
            }
          });
        } else {
          for (var key in this.newMessage) {
            if (this.newMessage[key]) {
              messages.push(key);
            }
          }
        }
        return messages.filter(function (m) {
          if (m) return m;
        });
      },
      hasLabel: function hasLabel() {
        return this.label || this.$slots.label;
      },
      hasMessage: function hasMessage() {
        return (!this.parent || !this.parent.hasInnerField) && this.newMessage || this.$slots.message;
      },
      numberInputClasses: function numberInputClasses() {
        if (this.$slots.default) {
          var numberinput = this.$slots.default.filter(function (node) {
            return node.tag && node.tag.toLowerCase().indexOf('numberinput') >= 0;
          })[0];
          if (numberinput) {
            var classes = ['has-numberinput'];
            var controlsPosition = numberinput.componentOptions.propsData.controlsPosition;
            var size = numberinput.componentOptions.propsData.size;
            if (controlsPosition) {
              classes.push("has-numberinput-".concat(controlsPosition));
            }
            if (size) {
              classes.push("has-numberinput-".concat(size));
            }
            return classes;
          }
        }
        return null;
      }
    },
    watch: {
      /**
      * Set internal type when prop change.
      */
      type: function type(value) {
        this.newType = value;
      },
      /**
      * Set internal message when prop change.
      */
      message: function message(value) {
        this.newMessage = value;
      },
      /**
      * Set parent message if we use Field in Field.
      */
      newMessage: function newMessage(value) {
        if (this.parent && this.parent.hasInnerField) {
          if (!this.parent.type) {
            this.parent.newType = this.newType;
          }
          if (!this.parent.message) {
            this.parent.newMessage = value;
          }
        }
      }
    },
    methods: {
      /**
      * Field has addons if there are more than one slot
      * (element / component) in the Field.
      * Or is grouped when prop is set.
      * Is a method to be called when component re-render.
      */
      fieldType: function fieldType() {
        if (this.grouped) return 'is-grouped';
        if (this.hasAddons()) return 'has-addons';
      },
      hasAddons: function hasAddons() {
        var renderedNode = 0;
        if (this.$slots.default) {
          renderedNode = this.$slots.default.reduce(function (i, node) {
            return node.tag ? i + 1 : i;
          }, 0);
        }
        return renderedNode > 1 && this.addons && !this.horizontal;
      }
    },
    mounted: function mounted() {
      if (this.horizontal) {
        // Bulma docs: .is-normal for any .input or .button
        var elements = this.$el.querySelectorAll('.input, .select, .button, .textarea, .b-slider');
        if (elements.length > 0) {
          this.fieldLabelSize = 'is-normal';
        }
      }
    }
  };

  /* script */
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field",class:_vm.rootClasses},[(_vm.horizontal)?_c('div',{staticClass:"field-label",class:[_vm.customClass, _vm.fieldLabelSize]},[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()]):[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()],(_vm.horizontal)?_c('b-field-body',{attrs:{"message":_vm.newMessage ? _vm.formattedMessage : '',"type":_vm.newType}},[_vm._t("default")],2):(_vm.hasInnerField)?_c('div',{staticClass:"field-body"},[_c('b-field',{class:_vm.innerFieldClasses,attrs:{"addons":false,"type":_vm.type}},[_vm._t("default")],2)],1):[_vm._t("default")],(_vm.hasMessage && !_vm.horizontal)?_c('p',{staticClass:"help",class:_vm.newType},[(_vm.$slots.message)?_vm._t("message",null,{"messages":_vm.formattedMessage}):[_vm._l((_vm.formattedMessage),function(mess,i){return [_vm._v(" "+_vm._s(mess)+" "),((i + 1) < _vm.formattedMessage.length)?_c('br',{key:i}):_vm._e()]})]],2):_vm._e()],2)};
  var __vue_staticRenderFns__$6 = [];

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

    var Field = __vue_component__$6;

  var script$5 = {
    name: 'BSelect',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function, Date],
        default: null
      },
      placeholder: String,
      multiple: Boolean,
      nativeSize: [String, Number]
    },
    data: function data() {
      return {
        selected: this.value,
        _elementRef: 'select'
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.selected;
        },
        set: function set(value) {
          this.selected = value;
          this.$emit('input', value);
          !this.isValid && this.checkHtml5Validity();
        }
      },
      spanClasses: function spanClasses() {
        return [this.size, this.statusType, {
          'is-fullwidth': this.expanded,
          'is-loading': this.loading,
          'is-multiple': this.multiple,
          'is-rounded': this.rounded,
          'is-empty': this.selected === null
        }];
      }
    },
    watch: {
      /**
      * When v-model is changed:
      *   1. Set the selected option.
      *   2. If it's invalid, validate again.
      */
      value: function value(_value) {
        this.selected = _value;
        !this.isValid && this.checkHtml5Validity();
      }
    }
  };

  /* script */
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:{ 'is-expanded': _vm.expanded, 'has-icons-left': _vm.icon }},[_c('span',{staticClass:"select",class:_vm.spanClasses},[_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",attrs:{"multiple":_vm.multiple,"size":_vm.nativeSize},on:{"blur":function($event){_vm.$emit('blur', $event) && _vm.checkHtml5Validity();},"focus":function($event){return _vm.$emit('focus', $event)},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.computedValue == null)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2)]),(_vm.icon)?_c('b-icon',{staticClass:"is-left",attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize}}):_vm._e()],1)};
  var __vue_staticRenderFns__$5 = [];

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

    var Select = __vue_component__$5;

  //
  var cos30 = 0.86602540378;
  var sin30 = 0.5;
  var id = 0;
  var script$4 = {
    name: 'BColorpickerHSLRepresentationTriangle',
    props: {
      value: {
        type: Object,
        required: true,
        validator: function validator(value) {
          return typeof value.hue === 'number' && typeof value.saturation === 'number' && typeof value.lightness === 'number';
        }
      },
      size: {
        type: Number,
        default: 200
      },
      thickness: {
        type: Number,
        default: 20
      }
    },
    data: function data() {
      return {
        id: id++,
        hue: this.value.hue,
        saturation: this.value.saturation,
        lightness: this.value.lightness,
        captureMouse: false,
        captureType: 'hue',
        clientOffset: {
          cx: -1,
          cy: -1,
          width: 0,
          height: 0
        },
        cos30: cos30,
        sin30: sin30,
        debounce: 0
      };
    },
    computed: {
      viewBox: function viewBox() {
        var size = this.size;
        return "0 0 ".concat(size, " ").concat(size);
      },
      internalRadius: function internalRadius() {
        return this.size / 2 - this.thickness;
      },
      haloPath: function haloPath() {
        var size = this.size,
          thickness = this.thickness;
        var radius = size / 2 - 2; // 2px padding
        var thicknessRadius = radius - thickness;
        var center = size / 2;
        return "M".concat(center - radius, " ").concat(center, "a").concat(radius, "  ").concat(radius, "  0 1 1 ").concat(2 * radius, " 0") + "h".concat(-thickness) + "a".concat(-thicknessRadius, "  ").concat(thicknessRadius, "  0 1 0 ").concat(-2 * thicknessRadius, " 0") + "a".concat(thicknessRadius, "  ").concat(thicknessRadius, "  0 1 0 ").concat(2 * thicknessRadius, " 0") + "h".concat(thickness) + "a".concat(radius, "  ").concat(radius, "  0 1 1 ").concat(-2 * radius, " 0z");
      },
      trianglePath: function trianglePath() {
        var size = this.size,
          thickness = this.thickness;
        var radius = size - 4;
        var thicknessRadius = (radius - 2 * thickness) / 2;
        return "M0 ".concat(-thicknessRadius) + "L".concat(cos30 * thicknessRadius, " ").concat(sin30 * thicknessRadius) + "H".concat(-cos30 * thicknessRadius, "z");
      }
    },
    watch: {
      captureMouse: function captureMouse(newValue, oldValue) {
        if (oldValue === false && newValue !== false) {
          var rect = this.$el.getBoundingClientRect();
          // Caching offset
          this.clientOffset.cx = rect.x + rect.width / 2;
          this.clientOffset.cy = rect.y + rect.height / 2;
          this.clientOffset.width = rect.width;
          this.clientOffset.height = rect.height;
        }
      },
      value: {
        deep: true,
        handler: function handler(newColor) {
          var _this = this;
          var hue = newColor.hue,
            saturation = newColor.saturation,
            lightness = newColor.lightness;
          window.clearTimeout(this.debounce);
          this.debounce = window.setTimeout(function () {
            if (lightness >= 0.03 && lightness <= 0.97 && saturation > 0) {
              _this.hue = hue;
            }
            _this.saturation = saturation;
            _this.lightness = lightness;
          }, 200);
        }
      }
    },
    methods: {
      increaseHue: function increaseHue() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.hue = (this.hue + value) % 360;
      },
      decreaseHue: function decreaseHue() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.hue = (360 + this.hue - value) % 360;
      },
      increaseSaturation: function increaseSaturation() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.saturation = Math.min(1, Math.max(0, this.saturation + value));
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
      },
      decreaseSaturation: function decreaseSaturation() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.saturation = Math.min(1, Math.max(0, this.saturation - value));
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
      },
      increaseLightness: function increaseLightness() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness + value));
      },
      decreaseLightness: function decreaseLightness() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness - value));
      },
      hueKeyPress: function hueKeyPress(event) {
        var handled = false;
        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            this.increaseHue();
            handled = true;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            this.decreaseHue();
            handled = true;
            break;
          case 'Home':
            this.increaseHue(360 - this.hue);
            handled = true;
            break;
          case 'End':
            this.decreaseHue(this.hue);
            handled = true;
            break;
          case 'PageUp':
            this.increaseHue(60 - this.hue % 60);
            handled = true;
            break;
          case 'PageDown':
            this.decreaseHue(60 + this.hue % 60);
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
          this.emitColor();
        }
      },
      slKeyPress: function slKeyPress(event) {
        var handled = false;
        switch (event.key) {
          case 'ArrowRight':
            this.decreaseLightness();
            handled = true;
            break;
          case 'ArrowUp':
            this.increaseSaturation();
            handled = true;
            break;
          case 'ArrowLeft':
            this.increaseLightness();
            handled = true;
            break;
          case 'ArrowDown':
            this.decreaseSaturation();
            handled = true;
            break;
          case 'Home':
            this.increaseLightness(1 - this.lightness);
            handled = true;
            break;
          case 'End':
            this.decreaseLightness(this.lightness);
            handled = true;
            break;
          case 'PageUp':
            this.increaseSaturation(1 - this.saturation);
            handled = true;
            break;
          case 'PageDown':
            this.decreaseSaturation(this.saturation);
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
          this.emitColor();
        }
      },
      clickHue: function clickHue(event) {
        this.startMouseCapture(event);
        this.trackMouse(event);
        this.stopMouseCapture(event);
        this.$refs.hueCursor.focus();
      },
      clickSL: function clickSL(event) {
        this.startMouseCapture(event);
        this.trackMouse(event);
        this.stopMouseCapture(event);
        this.$refs.slCursor.focus();
      },
      trackMouse: function trackMouse(event) {
        if (this.captureMouse === false) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        var mouseX = 0,
          mouseY = 0;
        if (typeof event.touches !== 'undefined' && event.touches.length) {
          var _ref = [event.touches[0].clientX, event.touches[0].clientY];
          mouseX = _ref[0];
          mouseY = _ref[1];
        } else {
          var _ref2 = [event.clientX, event.clientY];
          mouseX = _ref2[0];
          mouseY = _ref2[1];
        }
        var angle = Math.atan2(mouseY - this.clientOffset.cy, mouseX - this.clientOffset.cx);
        if (this.captureType === 'sl') {
          var d = Math.sqrt(Math.pow(mouseX - this.clientOffset.cx, 2) + Math.pow(mouseY - this.clientOffset.cy, 2));
          var ratio = this.size / this.clientOffset.width;
          var dx = d * Math.cos(angle - this.hue / 180 * Math.PI) * ratio;
          var dy = d * Math.sin(angle - this.hue / 180 * Math.PI) * ratio;
          var radius = this.internalRadius;
          var saturation = 1 - (Math.min(radius * sin30, Math.max(-radius, dy)) + radius) / (radius + radius * sin30);
          var lightness = (Math.min(radius * cos30 * (1 - saturation), Math.max(-radius * cos30 * (1 - saturation), dx)) + radius * cos30) / (radius * 2 * cos30);
          this.saturation = Math.round(saturation * 1000) / 1000;
          this.lightness = 1 - Math.round(lightness * 1000) / 1000;
        } else {
          this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
        }
        this.emitColor();
      },
      startMouseCapture: function startMouseCapture(event) {
        event.stopPropagation();
        this.captureMouse = true;
        if (event.target.closest('.colorpicker-triangle-slider-sl') !== null) {
          this.captureType = 'sl';
        } else {
          this.captureType = 'hue';
        }
      },
      stopMouseCapture: function stopMouseCapture(event) {
        if (this.captureMouse !== false) {
          event.preventDefault();
          event.stopPropagation();
          this.$refs[this.captureType === 'sl' ? 'slCursor' : 'hueCursor'].focus();
        }
        this.captureMouse = false;
      },
      emitColor: function emitColor() {
        var hue = this.hue,
          saturation = this.saturation,
          lightness = this.lightness;
        this.$emit('input', Color$1.fromHSL(hue, saturation, lightness));
        window.clearTimeout(this.debounce);
      }
    },
    mounted: function mounted() {
      window.addEventListener('mousemove', this.trackMouse);
      window.addEventListener('touchmove', this.trackMouse, {
        passive: false
      });
      window.addEventListener('mouseup', this.stopMouseCapture);
      window.addEventListener('touchend', this.stopMouseCapture);
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('mousemove', this.trackMouse);
      window.removeEventListener('touchmove', this.trackMouse);
      window.removeEventListener('mouseup', this.stopMouseCapture);
      window.removeEventListener('touchend', this.stopMouseCapture);
      clearTimeout(this.debounce);
    }
  };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"b-colorpicker-triangle",attrs:{"viewBox":_vm.viewBox}},[_c('defs',[_c('linearGradient',{attrs:{"id":("cp-triangle-gradient-ligthness-" + _vm.id),"x1":"0","y1":"0","x2":"1","y2":"0"}},[_c('stop',{attrs:{"offset":"0%","stop-color":"#fff"}}),_c('stop',{attrs:{"offset":"100%","stop-color":"#000"}})],1),_c('linearGradient',{attrs:{"id":("cp-triangle-gradient-saturation-" + _vm.id),"x1":"0","y1":"0","x2":"0","y2":"1"}},[_c('stop',{attrs:{"offset":"0%","stop-color":("hsl(" + _vm.hue + "deg, 100%, 50%)"),"stop-opacity":"1"}}),_c('stop',{attrs:{"offset":"100%","stop-color":("hsl(" + _vm.hue + "deg, 100%, 50%)"),"stop-opacity":"0"}})],1),_c('clipPath',{attrs:{"id":("cp-triangle-clip-" + _vm.id)}},[_c('path',{attrs:{"d":_vm.haloPath}})])],1),_c('g',{staticClass:"colorpicker-triangle-slider-hue"},[_c('foreignObject',{attrs:{"x":0,"y":0,"width":_vm.size,"height":_vm.size,"clip-path":("url(#cp-triangle-clip-" + _vm.id + ")")}},[_c('div',{staticClass:"colorpicker-triangle-hue",on:{"click":_vm.clickHue,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})]),_c('g',{style:(("transform: rotate(" + _vm.hue + "deg)"))},[_c('foreignObject',{attrs:{"x":_vm.size / 2 - 4,"y":0,"width":"8","height":_vm.thickness + 4}},[_c('div',{ref:"hueCursor",staticClass:"hue-range-thumb",style:(("background-color: hsl(" + _vm.hue + "deg, 100%, 50%)")),attrs:{"role":"slider","tabindex":"0","aria-label":"Hue","aria-valuemin":"0","aria-valuenow":_vm.hue,"aria-valuemax":"360"},on:{"click":_vm.clickHue,"keydown":_vm.hueKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])],1)],1),_c('g',{staticClass:"colorpicker-triangle-slider-sl",style:(("transform: rotate(" + _vm.hue + "deg) translate(50%, 50%)")),attrs:{"role":"graphics-datagroup","aria-datascales":"lightness, saturation"}},[_c('path',{attrs:{"d":_vm.trianglePath,"fill":("url(#cp-triangle-gradient-ligthness-" + _vm.id + ")")}}),_c('path',{staticStyle:{"mix-blend-mode":"overlay"},attrs:{"d":_vm.trianglePath,"fill":("url(#cp-triangle-gradient-saturation-" + _vm.id + ")")},on:{"click":_vm.clickSL,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}}),_c('foreignObject',{attrs:{"x":((_vm.internalRadius - 3) * _vm.cos30) * (-_vm.lightness + 0.5) * 2 - 6,"y":-_vm.internalRadius + (1 - _vm.saturation) * (_vm.internalRadius - 3) * 1.5 - 3,"width":"12","height":"12"}},[_c('div',{ref:"slCursor",staticClass:"sl-range-thumb",style:({
                      backgroundColor: ("hsl(" + _vm.hue + "deg, " + (_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%)")
                  }),attrs:{"tabindex":"0","aria-datavalues":((_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%")},on:{"click":_vm.clickSL,"keydown":_vm.slKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])],1)])};
  var __vue_staticRenderFns__$4 = [];

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

    var ColorpickerHSLRepresentationTriangle = __vue_component__$4;

  var _templateObject, _templateObject2, _templateObject3;
  var precision = function precision(strs) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }
    var tmp = [];
    strs.forEach(function (str, i) {
      tmp.push(str);
      if (values[i]) {
        tmp.push(Number.isNaN(values[i] / 1) ? values[i] : Math.round(values * 10) / 10);
      }
    });
    return tmp.join('');
  };
  var script$3 = {
    name: 'BColorpickerHSLRepresentationSquare',
    props: {
      value: {
        type: Object,
        required: true,
        validator: function validator(value) {
          return typeof value.hue === 'number' && typeof value.saturation === 'number' && typeof value.lightness === 'number';
        }
      },
      size: {
        type: Number,
        default: 200
      },
      thickness: {
        type: Number,
        default: 20
      }
    },
    data: function data() {
      return {
        hue: this.value.hue,
        saturation: this.value.saturation,
        lightness: this.value.lightness,
        captureMouse: false,
        captureType: 'hue',
        clientOffset: {
          cx: -1,
          cy: -1,
          width: 0,
          height: 0
        },
        debounce: 0
      };
    },
    computed: {
      hueThumbStyle: function hueThumbStyle() {
        var hue = this.hue,
          size = this.size,
          thickness = this.thickness;
        var side = size - thickness;
        var offset = size / 2;
        var angle = (hue + 720 + 90) % 360 / 180 * Math.PI;
        var ciq = 1 / Math.cos(Math.PI / 4);
        var _x$y = {
            x: -Math.min(1, Math.max(-1, ciq * Math.cos(angle))) / 2 * side + offset,
            y: -Math.min(1, Math.max(-1, ciq * Math.sin(angle))) / 2 * side + offset
          },
          x = _x$y.x,
          y = _x$y.y;
        return {
          background: "hsl(".concat(hue, "deg, 100%, 50%)"),
          left: precision(_templateObject || (_templateObject = _taggedTemplateLiteral(["", "px"])), x),
          top: precision(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", "px"])), y),
          width: precision(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["", "px"])), thickness - 2)
        };
      },
      slThumbStyle: function slThumbStyle() {
        var hue = this.hue,
          saturation = this.saturation,
          lightness = this.lightness;
        saturation = Math.max(0, Math.min(1, saturation));
        lightness = Math.max(0, Math.min(1, lightness));
        return {
          background: "hsl(".concat(hue, "deg, ").concat(saturation * 100, "%, ").concat(lightness * 100, "%)"),
          left: "".concat(saturation * 100, "%"),
          top: "".concat((1 - lightness) * 100, "%")
        };
      },
      SLBackground: function SLBackground() {
        var hue = this.hue;
        return "linear-gradient(90deg, hsl(".concat(hue, "deg, 0%, 50%), hsl(").concat(hue, "deg, 100%, 50%))");
      }
    },
    watch: {
      captureMouse: function captureMouse(newValue, oldValue) {
        if (oldValue === false && newValue !== false) {
          var rect = this.$el.getBoundingClientRect();
          // Caching offset
          this.clientOffset.cx = rect.x + rect.width / 2;
          this.clientOffset.cy = rect.y + rect.height / 2;
          this.clientOffset.width = rect.width;
          this.clientOffset.height = rect.height;
        }
      },
      value: {
        deep: true,
        handler: function handler(newColor) {
          var _this = this;
          var hue = newColor.hue,
            saturation = newColor.saturation,
            lightness = newColor.lightness;
          window.clearTimeout(this.debounce);
          this.debounce = window.setTimeout(function () {
            _this.hue = hue;
            _this.saturation = saturation;
            _this.lightness = lightness;
          }, 200);
        }
      }
    },
    methods: {
      increaseHue: function increaseHue() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.hue = (this.hue + value) % 360;
      },
      decreaseHue: function decreaseHue() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.hue = (360 + this.hue - value) % 360;
      },
      increaseSaturation: function increaseSaturation() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.saturation = Math.min(1, Math.max(0, this.saturation + value));
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
      },
      decreaseSaturation: function decreaseSaturation() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.saturation = Math.min(1, Math.max(0, this.saturation - value));
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
      },
      increaseLightness: function increaseLightness() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness + value));
      },
      decreaseLightness: function decreaseLightness() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness - value));
      },
      hueKeyPress: function hueKeyPress(event) {
        var handled = false;
        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            this.increaseHue();
            handled = true;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            this.decreaseHue();
            handled = true;
            break;
          case 'Home':
            this.increaseHue(360 - this.hue);
            handled = true;
            break;
          case 'End':
            this.decreaseHue(this.hue);
            handled = true;
            break;
          case 'PageUp':
            this.increaseHue(60 - this.hue % 60);
            handled = true;
            break;
          case 'PageDown':
            this.decreaseHue(60 + this.hue % 60);
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
          this.emitColor();
        }
      },
      slKeyPress: function slKeyPress(event) {
        var handled = false;
        switch (event.key) {
          case 'ArrowRight':
            this.increaseSaturation();
            handled = true;
            break;
          case 'ArrowUp':
            this.increaseLightness();
            handled = true;
            break;
          case 'ArrowLeft':
            this.decreaseSaturation();
            handled = true;
            break;
          case 'ArrowDown':
            this.decreaseLightness();
            handled = true;
            break;
          case 'Home':
            this.increaseLightness(1 - this.lightness);
            handled = true;
            break;
          case 'End':
            this.decreaseLightness(this.lightness);
            handled = true;
            break;
          case 'PageUp':
            this.increaseSaturation(1 - this.saturation);
            handled = true;
            break;
          case 'PageDown':
            this.decreaseSaturation(this.saturation);
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
          this.emitColor();
        }
      },
      startMouseCapture: function startMouseCapture(event) {
        event.stopPropagation();
        this.captureMouse = true;
        if (event.target.closest('.colorpicker-square-slider-sl') !== null) {
          this.captureType = 'sl';
        } else {
          this.captureType = 'hue';
        }
      },
      stopMouseCapture: function stopMouseCapture(event) {
        if (this.captureMouse !== false) {
          event.preventDefault();
          event.stopPropagation();
          this.$refs[this.captureType === 'sl' ? 'slCursor' : 'hueCursor'].focus();
        }
        this.captureMouse = false;
      },
      clickHue: function clickHue(event) {
        this.startMouseCapture(event);
        this.trackMouse(event);
        this.stopMouseCapture(event);
        this.$refs.hueCursor.focus();
      },
      clickSL: function clickSL(event) {
        this.startMouseCapture(event);
        this.trackMouse(event);
        this.stopMouseCapture(event);
        this.$refs.slCursor.focus();
      },
      trackMouse: function trackMouse(event) {
        if (this.captureMouse === false) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        var mouseX = 0,
          mouseY = 0;
        if (typeof event.touches !== 'undefined' && event.touches.length) {
          var _ref = [event.touches[0].clientX, event.touches[0].clientY];
          mouseX = _ref[0];
          mouseY = _ref[1];
        } else {
          var _ref2 = [event.clientX, event.clientY];
          mouseX = _ref2[0];
          mouseY = _ref2[1];
        }
        var angle = Math.atan2(mouseY - this.clientOffset.cy, mouseX - this.clientOffset.cx);
        if (this.captureType === 'sl') {
          var saturation = (mouseX - this.clientOffset.cx) / (this.clientOffset.width - this.thickness * 2) + 0.5;
          var lightness = (mouseY - this.clientOffset.cy) / (this.clientOffset.height - this.thickness * 2) + 0.5;
          this.saturation = Math.round(Math.min(1, Math.max(0, saturation)) * 1000) / 1000;
          this.lightness = 1 - Math.round(Math.min(1, Math.max(0, lightness)) * 1000) / 1000;
        } else {
          this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
        }
        this.emitColor();
      },
      emitColor: function emitColor() {
        var hue = this.hue,
          saturation = this.saturation,
          lightness = this.lightness;
        this.$emit('input', Color$1.fromHSL(hue, saturation, lightness));
        window.clearTimeout(this.debounce);
      }
    },
    mounted: function mounted() {
      window.addEventListener('mousemove', this.trackMouse);
      window.addEventListener('touchmove', this.trackMouse, {
        passive: false
      });
      window.addEventListener('mouseup', this.stopMouseCapture);
      window.addEventListener('touchend', this.stopMouseCapture);
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('mousemove', this.trackMouse);
      window.removeEventListener('touchmove', this.trackMouse);
      window.removeEventListener('mouseup', this.stopMouseCapture);
      window.removeEventListener('touchend', this.stopMouseCapture);
      clearTimeout(this.debounce);
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-colorpicker-square",style:({ width: (_vm.size + "px") })},[_c('div',{staticClass:"colorpicker-square-slider-hue",on:{"click":_vm.clickHue,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"hueCursor",staticClass:"hue-range-thumb",style:(_vm.hueThumbStyle),attrs:{"role":"slider","tabindex":"0","aria-label":"Hue","aria-valuemin":"0","aria-valuemax":"359"}})]),_c('div',{staticClass:"colorpicker-square-slider-sl",style:({
              background: _vm.SLBackground,
              margin: (_vm.thickness + "px")
          }),attrs:{"aria-datascales":"lightness, saturation"},on:{"click":_vm.clickSL,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"slCursor",staticClass:"sl-range-thumb",style:(_vm.slThumbStyle),attrs:{"role":"slider","tabindex":"0","aria-datavalues":((_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%")},on:{"click":_vm.clickSL,"keydown":_vm.slKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])])};
  var __vue_staticRenderFns__$3 = [];

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

    var ColorpickerHSLRepresentationSquare = __vue_component__$3;

  var script$2 = {
    name: 'BTooltip',
    props: {
      active: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: function _default() {
          return config.defaultTooltipType;
        }
      },
      label: String,
      delay: {
        type: Number,
        default: function _default() {
          return config.defaultTooltipDelay;
        }
      },
      closeDelay: {
        type: Number,
        default: function _default() {
          return config.defaultTooltipCloseDelay;
        }
      },
      position: {
        type: String,
        default: 'is-top',
        validator: function validator(value) {
          return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1;
        }
      },
      triggers: {
        type: Array,
        default: function _default() {
          return ['hover'];
        }
      },
      always: Boolean,
      square: Boolean,
      dashed: Boolean,
      multilined: Boolean,
      size: {
        type: String,
        default: 'is-medium'
      },
      appendToBody: Boolean,
      animated: {
        type: Boolean,
        default: true
      },
      animation: {
        type: String,
        default: 'fade'
      },
      contentClass: String,
      autoClose: {
        type: [Array, Boolean],
        default: true
      }
    },
    data: function data() {
      return {
        isActive: false,
        triggerStyle: {},
        timer: null,
        _bodyEl: undefined,
        // Used to append to body
        resizeObserver: undefined,
        resizeListener: undefined,
        timeOutID: null
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return ['b-tooltip', this.type, this.position, this.size, {
          'is-square': this.square,
          'is-always': this.always,
          'is-multiline': this.multilined,
          'is-dashed': this.dashed
        }];
      },
      newAnimation: function newAnimation() {
        return this.animated ? this.animation : undefined;
      }
    },
    watch: {
      isActive: function isActive() {
        this.$emit(this.isActive ? 'open' : 'close');
        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      }
    },
    methods: {
      updateAppendToBody: function updateAppendToBody() {
        var tooltip = this.$refs.tooltip;
        var trigger = this.$refs.trigger;
        if (tooltip && trigger) {
          // update wrapper tooltip
          var tooltipEl = this.$data._bodyEl.children[0];
          tooltipEl.classList.forEach(function (item) {
            return tooltipEl.classList.remove(item);
          });
          if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
            tooltipEl.classList.add(this.$vnode.data.staticClass);
          }
          this.rootClasses.forEach(function (item) {
            if (_typeof(item) === 'object') {
              for (var key in item) {
                if (item[key]) {
                  tooltipEl.classList.add(key);
                }
              }
            } else {
              tooltipEl.classList.add(item);
            }
          });
          var rect = trigger.getBoundingClientRect();
          var top = rect.top + window.scrollY;
          var left = rect.left + window.scrollX;

          // `tooltipEl` will be placed relative to `wrapper`
          // because `wrapper` should create a stacking context
          // as its z-index is non-auto
          tooltipEl.style.position = 'absolute';
          switch (this.position) {
            case 'is-top':
              tooltipEl.style.width = "".concat(trigger.clientWidth, "px");
              tooltipEl.style.height = '0px';
              tooltipEl.style.top = '0px';
              tooltipEl.style.left = '0px';
              break;
            case 'is-bottom':
              tooltipEl.style.width = "".concat(trigger.clientWidth, "px");
              tooltipEl.style.height = '0px';
              tooltipEl.style.top = "".concat(trigger.clientHeight, "px");
              tooltipEl.style.left = '0px';
              break;
            case 'is-left':
              tooltipEl.style.width = '0px';
              tooltipEl.style.height = "".concat(trigger.clientHeight, "px");
              tooltipEl.style.top = '0px';
              tooltipEl.style.left = '0px';
              break;
            case 'is-right':
              tooltipEl.style.width = '0px';
              tooltipEl.style.height = "".concat(trigger.clientHeight, "px");
              tooltipEl.style.top = '0px';
              tooltipEl.style.left = "".concat(trigger.clientWidth, "px");
              break;
          }
          var wrapper = this.$data._bodyEl;
          wrapper.style.position = 'absolute';
          wrapper.style.top = "".concat(top, "px");
          wrapper.style.left = "".concat(left, "px");
          wrapper.style.width = '0px';
          wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1';
          this.triggerStyle = {
            zIndex: this.isActive || this.always ? '100' : undefined
          };
        }
      },
      onClick: function onClick() {
        var _this = this;
        if (this.triggers.indexOf('click') < 0) return;
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        this.$nextTick(function () {
          _this.timeOutID = setTimeout(function () {
            return _this.open();
          });
        });
      },
      onHover: function onHover() {
        if (this.triggers.indexOf('hover') < 0) return;
        this.open();
      },
      onContextMenu: function onContextMenu(e) {
        if (this.triggers.indexOf('contextmenu') < 0) return;
        e.preventDefault();
        this.open();
      },
      onFocus: function onFocus() {
        if (this.triggers.indexOf('focus') < 0) return;
        this.open();
      },
      open: function open() {
        var _this2 = this;
        if (this.delay) {
          this.timer = setTimeout(function () {
            _this2.isActive = true;
            _this2.timer = null;
          }, this.delay);
        } else {
          this.isActive = true;
        }
      },
      close: function close() {
        var _this3 = this;
        if (typeof this.autoClose === 'boolean') {
          if (this.autoClose && this.timer) clearTimeout(this.timer);
          if (this.closeDelay) {
            this.timer = setTimeout(function () {
              _this3.isActive = !_this3.autoClose;
              _this3.timer = null;
            }, this.closeDelay);
          } else {
            this.isActive = !this.autoClose;
          }
        }
      },
      /**
      * Close tooltip if clicked outside.
      */
      clickedOutside: function clickedOutside(event) {
        if (this.isActive) {
          if (Array.isArray(this.autoClose)) {
            if (this.autoClose.includes('outside')) {
              if (!this.isInWhiteList(event.target)) {
                this.isActive = false;
                return;
              }
            }
            if (this.autoClose.includes('inside')) {
              if (this.isInWhiteList(event.target)) this.isActive = false;
            }
          }
        }
      },
      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;
        if (this.isActive && (key === 'Escape' || key === 'Esc')) {
          if (Array.isArray(this.autoClose)) {
            if (this.autoClose.indexOf('escape') >= 0) this.isActive = false;
          }
        }
      },
      /**
      * White-listed items to not close when clicked.
      */
      isInWhiteList: function isInWhiteList(el) {
        if (el === this.$refs.content) return true;
        // All chidren from content
        if (this.$refs.content !== undefined) {
          var children = this.$refs.content.querySelectorAll('*');
          var _iterator = _createForOfIteratorHelper(children),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var child = _step.value;
              if (el === child) {
                return true;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        return false;
      }
    },
    mounted: function mounted() {
      var _this4 = this;
      this.controller = new window.AbortController();
      if (this.appendToBody && typeof window !== 'undefined') {
        this.$data._bodyEl = createAbsoluteElement(this.$refs.content);
        this.updateAppendToBody();
        // updates the tooltip position if the tooltip is inside
        // `.animation-content`
        var animation = this.$el.closest('.animation-content');
        if (animation != null) {
          var listener = function listener() {
            _this4.updateAppendToBody();
            animation.removeEventListener('transitionend', listener);
          };
          animation.addEventListener('transitionend', listener, {
            signal: this.controller.signal
          });
        }
        // observes changes in the window size
        this.resizeListener = function () {
          return _this4.updateAppendToBody();
        };
        window.addEventListener('resize', this.resizeListener);
        // observes changes in the size of the immediate parent
        this.resizeObserver = new ResizeObserver(this.resizeListener);
        if (this.$el.parentNode != null && this.$el.parentNode.nodeType === Node.ELEMENT_NODE) {
          this.resizeObserver.observe(this.$el.parentNode);
        }
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);
        document.removeEventListener('keyup', this.keyPress);
      }
      if (this.resizeListener != null) {
        window.removeEventListener('resize', this.resizeListener);
      }
      if (this.resizeObserver != null) {
        this.resizeObserver.disconnect();
      }
      if (this.appendToBody) {
        removeElement(this.$data._bodyEl);
      }
      this.controller.abort();
      clearTimeout(this.timer);
      clearTimeout(this.timeOutID);
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"tooltip",class:_vm.rootClasses},[_c('transition',{attrs:{"name":_vm.newAnimation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active && (_vm.isActive || _vm.always)),expression:"active && (isActive || always)"}],ref:"content",class:['tooltip-content', _vm.contentClass]},[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:(_vm.$slots.content)?[_vm._t("content")]:_vm._e()],2)]),_c('div',{ref:"trigger",staticClass:"tooltip-trigger",style:(_vm.triggerStyle),on:{"click":_vm.onClick,"contextmenu":_vm.onContextMenu,"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)},"!blur":function($event){return _vm.close($event)},"mouseleave":_vm.close}},[_vm._t("default")],2)],1)};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

    var Tooltip = __vue_component__$2;

  var script$1 = {
    name: 'BColorpickerAlphaSlider',
    components: _defineProperty({}, Tooltip.name, Tooltip),
    props: {
      value: {
        type: Number,
        validator: function validator(value) {
          return value >= 0 && value < 256;
        }
      },
      color: [String, Object]
    },
    data: function data() {
      var color = Color$1.parse(this.color);
      color.alpha = 0;
      return {
        startColor: color.toString('hex'),
        endColor: color.toString('hexa'),
        percent: Math.round((1 - this.value / 255) * 100),
        captureMouse: false,
        clientOffset: {
          cx: -1,
          cy: -1,
          width: 0,
          height: 0
        }
      };
    },
    computed: {
      style: function style() {
        return {
          backgroundImage: "linear-gradient(90deg, ".concat(this.startColor, " 0%, ").concat(this.endColor, " 100%),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)"),
          backgroundSize: '100% 100%, 1em 1em, 1em 1em',
          backgroundPosition: '0 0, .5em .5em, 0 0'
        };
      }
    },
    watch: {
      value: function value(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.percent = Math.round((1 - newValue / 255) * 100);
        }
      },
      color: function color(newColor) {
        var color = Color$1.parse(newColor);
        color.alpha = 0;
        this.startColor = color.toString('hex');
        this.endColor = color.toString('hexa');
      },
      captureMouse: function captureMouse(newValue, oldValue) {
        if (oldValue === false && newValue !== false) {
          var rect = this.$el.getBoundingClientRect();
          // Caching offset
          this.clientOffset.cx = rect.x + rect.width / 2;
          this.clientOffset.cy = rect.y + rect.height / 2;
          this.clientOffset.width = rect.width;
          this.clientOffset.height = rect.height;
        }
      }
    },
    methods: {
      increaseAlpha: function increaseAlpha() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.percent = Math.max(0, Math.min(100, this.percent + value));
      },
      decreaseAlpha: function decreaseAlpha() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
        this.increaseAlpha(-value);
      },
      alphaKeyPress: function alphaKeyPress(event) {
        var handled = false;
        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            this.increaseAlpha();
            handled = true;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            this.decreaseAlpha();
            handled = true;
            break;
          case 'Home':
            this.decreaseAlpha(this.percent);
            handled = true;
            break;
          case 'End':
            this.increaseAlpha(100 - this.percent);
            handled = true;
            break;
          case 'PageUp':
            this.increaseAlpha(10 - this.percent % 10);
            handled = true;
            break;
          case 'PageDown':
            this.decreaseAlpha(this.percent % 10);
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
          this.emitAlpha();
        }
      },
      clickAlpha: function clickAlpha(event) {
        this.startMouseCapture(event);
        this.trackMouse(event);
        this.stopMouseCapture(event);
        this.$refs.alphaCursor.focus();
      },
      startMouseCapture: function startMouseCapture(event) {
        event.stopPropagation();
        this.captureMouse = true;
      },
      trackMouse: function trackMouse(event) {
        if (this.captureMouse === false) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        var _ref = [0, 0],
          mouseX = _ref[0];
        if (typeof event.touches !== 'undefined' && event.touches.length) {
          var _ref2 = [event.touches[0].clientX];
          mouseX = _ref2[0];
        } else {
          var _ref3 = [event.clientX];
          mouseX = _ref3[0];
        }
        var ratio = 0.5 + (this.clientOffset.cx - mouseX) / this.clientOffset.width;
        this.percent = Math.round(100 - Math.max(0, Math.min(1, ratio)) * 100);
        this.emitAlpha();
      },
      stopMouseCapture: function stopMouseCapture(event) {
        if (this.captureMouse !== false) {
          event.preventDefault();
          event.stopPropagation();
          this.$refs.alphaCursor.focus();
        }
        this.captureMouse = false;
      },
      emitAlpha: function emitAlpha() {
        this.$emit('input', (1 - this.percent / 100) * 255);
      }
    },
    mounted: function mounted() {
      window.addEventListener('mousemove', this.trackMouse);
      window.addEventListener('touchmove', this.trackMouse, {
        passive: false
      });
      window.addEventListener('mouseup', this.stopMouseCapture);
      window.addEventListener('touchend', this.stopMouseCapture);
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('mousemove', this.trackMouse);
      window.removeEventListener('touchmove', this.trackMouse);
      window.removeEventListener('mouseup', this.stopMouseCapture);
      window.removeEventListener('touchend', this.stopMouseCapture);
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-colorpicker-alpha-slider",style:(_vm.style),on:{"click":_vm.clickAlpha,"keydown":_vm.alphaKeyPress,"mousedown":_vm.startMouseCapture,"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"alphaCursor",staticClass:"alpha-range-thumb",style:({ left: (_vm.percent + "%") }),attrs:{"role":"slider","tabindex":"0","aria-label":"Tranparency","aria-valuemin":"0","aria-valuenow":_vm.percent,"aria-valuemax":"100"}},[_c('b-tooltip',{attrs:{"label":(_vm.percent + "%"),"always":_vm.captureMouse}})],1)])};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

    var ColorpickerAlphaSlider = __vue_component__$1;

  var defaultColorFormatter = function defaultColorFormatter(color, vm) {
    if (color.alpha < 1) {
      return color.toString('hexa');
    } else {
      return color.toString('hex');
    }
  };
  var defaultColorParser = function defaultColorParser(color, vm) {
    return Color$1.parse(color);
  };
  var script = {
    name: 'BColorpicker',
    components: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ColorpickerHSLRepresentationTriangle.name, ColorpickerHSLRepresentationTriangle), ColorpickerHSLRepresentationSquare.name, ColorpickerHSLRepresentationSquare), ColorpickerAlphaSlider.name, ColorpickerAlphaSlider), Input.name, Input), Field.name, Field), Select.name, Select), Icon.name, Icon), Dropdown.name, Dropdown), DropdownItem.name, DropdownItem),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        $colorpicker: this
      };
    },
    props: {
      value: {
        type: [String, Object],
        validator: function validator(value) {
          return typeof value === 'string' || _typeof(value) === 'object' && typeof value.red === 'number' && typeof value.green === 'number' && typeof value.blue === 'number';
        }
      },
      representation: {
        type: String,
        default: 'triangle',
        value: function value(_value) {
          return ['triangle', 'square'].some(function (r) {
            return r === _value;
          });
        }
      },
      inline: Boolean,
      disabled: Boolean,
      horizontalColorPicker: {
        type: Boolean,
        default: false
      },
      colorFormatter: {
        type: Function,
        default: function _default(color, vm) {
          if (typeof config.defaultColorFormatter === 'function') {
            return config.defaultColorFormatter(color);
          } else {
            return defaultColorFormatter(color);
          }
        }
      },
      colorParser: {
        type: Function,
        default: function _default(color, vm) {
          if (typeof config.defaultColorParser === 'function') {
            return config.defaultColorParser(color);
          } else {
            return defaultColorParser(color);
          }
        }
      },
      alpha: {
        type: Boolean,
        default: false
      },
      expanded: Boolean,
      position: String,
      mobileModal: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerMobileModal;
        }
      },
      focusable: {
        type: Boolean,
        default: true
      },
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      appendToBody: Boolean
    },
    data: function data() {
      return {
        color: this.parseColor(this.value)
      };
    },
    computed: {
      computedValue: {
        set: function set(value) {
          this.color = this.parseColor(value);
        },
        get: function get() {
          return this.color;
        }
      },
      background: function background() {
        if (this.alpha) {
          return "linear-gradient(\n                    45deg,\n                    ".concat(this.computedValue.toString('hex'), " 50%,\n                    ").concat(this.computedValue.toString('hexa'), " 50%\n                )");
        } else {
          var hex = this.computedValue.toString('hex');
          return "linear-gradient(\n                    45deg,\n                    ".concat(hex, " 50%,\n                    ").concat(hex, " 50%\n                )");
        }
      },
      triggerStyle: function triggerStyle() {
        var _this$computedValue = this.computedValue,
          red = _this$computedValue.red,
          green = _this$computedValue.green,
          blue = _this$computedValue.blue;
        var light = red * 0.299 + green * 0.587 + blue * 0.114 > 186;
        return {
          backgroundColor: '#ffffff',
          backgroundImage: "\n                    ".concat(this.background, ",\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)\n                "),
          backgroundSize: '100% 100%, 16px 16px, 16px 16px',
          backgroundPosition: '0 0, 8px 8px, 0 0',
          color: light ? '#000000' : '#FFFFFF',
          textShadow: "0 0 2px ".concat(light ? '#FFFFFFAA' : '#000000AA')
        };
      },
      isMobile: function isMobile$1() {
        return this.mobileNative && isMobile.any();
      },
      ariaRole: function ariaRole() {
        if (!this.inline) {
          return 'dialog';
        }
      }
    },
    watch: {
      value: function value(_value2) {
        this.computedValue = new Color$1(_value2);
      }
    },
    methods: {
      parseColor: function parseColor(color) {
        try {
          return this.colorParser(color);
        } catch (e) {
          return new Color$1();
        }
      },
      updateColor: function updateColor(value) {
        value.alpha = this.computedValue.alpha;
        this.computedValue = value;
        this.$emit('input', value);
      },
      updateAlpha: function updateAlpha(alpha) {
        this.computedValue.alpha = alpha;
        this.$emit('input', this.computedValue);
      },
      updateRGB: function updateRGB() {
        this.$emit('input', this.computedValue);
      },
      /*
       * Format color into string
       */
      formatValue: function formatValue(value) {
        return value ? this.colorFormatter(value, this) : null;
      },
      /*
       * Toggle datepicker
       */
      togglePicker: function togglePicker(active) {
        if (this.$refs.dropdown) {
          var isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
          if (isActive) {
            this.$refs.dropdown.isActive = isActive;
          } else if (this.closeOnClick) {
            this.$refs.dropdown.isActive = isActive;
          }
        }
      },
      /*
       * Call default onFocus method and show datepicker
       */
      handleOnFocus: function handleOnFocus(event) {
        this.onFocus(event);
        if (this.openOnFocus) {
          this.togglePicker(true);
        }
      },
      /*
       * Toggle dropdown
       */
      toggle: function toggle() {
        if (this.mobileNative && this.isMobile) {
          var input = this.$refs.input.$refs.input;
          input.focus();
          input.click();
          return;
        }
        this.$refs.dropdown.toggle();
      },
      /*
       * Avoid dropdown toggle when is already visible
       */
      onInputClick: function onInputClick(event) {
        if (this.$refs.dropdown.isActive) {
          event.stopPropagation();
        }
      },
      /**
       * Keypress event that is bound to the document.
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;
        if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
          this.togglePicker(false);
        }
      },
      /**
       * Emit 'blur' event on dropdown is not active (closed)
       */
      onActiveChange: function onActiveChange(value) {
        if (!value) {
          this.onBlur();
        }
        /*
         * Emit 'active-change' when on dropdown active state change
         */
        this.$emit('active-change', value);
      }
    }
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"colorpicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"expanded":_vm.expanded,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-button',{style:(_vm.triggerStyle),attrs:{"expanded":_vm.expanded,"disabled":_vm.disabled}},[_c('span',{staticClass:"color-name"},[_vm._v(_vm._s(_vm.colorFormatter(_vm.computedValue)))])])])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{class:{'dropdown-horizontal-colorpicker': _vm.horizontalColorPicker},attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('div',[_c('header',{staticClass:"colorpicker-header"},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_vm._e()],2),_c('div',{staticClass:"colorpicker-content"},[(_vm.representation === 'square')?_c('b-colorpicker-h-s-l-representation-square',{attrs:{"value":_vm.computedValue},on:{"input":_vm.updateColor}}):_c('b-colorpicker-h-s-l-representation-triangle',{attrs:{"value":_vm.computedValue},on:{"input":_vm.updateColor}})],1)]),_c('footer',{staticClass:"colorpicker-footer"},[(_vm.alpha)?_c('b-colorpicker-alpha-slider',{attrs:{"value":_vm.computedValue.alpha,"color":_vm.computedValue},on:{"input":_vm.updateAlpha}}):_vm._e(),_vm._t("footer",[_c('b-field',{staticClass:"colorpicker-fields",attrs:{"grouped":""}},[_c('b-field',{attrs:{"horizontal":"","label":"R"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Red"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.red),callback:function ($$v) {_vm.$set(_vm.computedValue, "red", _vm._n($$v));},expression:"computedValue.red"}})],1),_c('b-field',{attrs:{"horizontal":"","label":"G"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Green"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.green),callback:function ($$v) {_vm.$set(_vm.computedValue, "green", _vm._n($$v));},expression:"computedValue.green"}})],1),_c('b-field',{attrs:{"horizontal":"","label":"B"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Blue"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.blue),callback:function ($$v) {_vm.$set(_vm.computedValue, "blue", _vm._n($$v));},expression:"computedValue.blue"}})],1)],1)],{"color":_vm.computedValue})],2)])],1):_vm._e()],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

    var Colorpicker = __vue_component__;

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, Colorpicker);
    }
  };
  use(Plugin);

  exports.BColorpicker = Colorpicker;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
