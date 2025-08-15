this.primereact = this.primereact || {};
this.primereact.inputnumber = (function (exports, React, PrimeReact, componentbase, hooks, angledown, angleup, inputtext, ripple, tooltip, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

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
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        focusedState = _ref.focusedState,
        stacked = _ref.stacked,
        horizontal = _ref.horizontal,
        vertical = _ref.vertical;
      return utils.classNames('p-inputnumber p-component p-inputwrapper', {
        'p-inputwrapper-filled': props.value != null && props.value.toString().length > 0,
        'p-inputwrapper-focus': focusedState,
        'p-inputnumber-buttons-stacked': stacked,
        'p-inputnumber-buttons-horizontal': horizontal,
        'p-inputnumber-buttons-vertical': vertical,
        'p-invalid': props.invalid
      });
    },
    input: function input(_ref2) {
      var props = _ref2.props,
        context = _ref2.context;
      return utils.classNames('p-inputnumber-input', {
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    buttonGroup: 'p-inputnumber-button-group',
    incrementButton: function incrementButton(_ref3) {
      var props = _ref3.props;
      return utils.classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
        'p-disabled': props.disabled
      });
    },
    incrementIcon: 'p-button-icon',
    decrementButton: function decrementButton(_ref4) {
      var props = _ref4.props;
      return utils.classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
        'p-disabled': props.disabled
      });
    },
    decrementIcon: 'p-button-icon'
  };
  var styles = "\n@layer primereact {\n    .p-inputnumber {\n        display: inline-flex;\n    }\n    \n    .p-inputnumber-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex: 0 0 auto;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,\n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label {\n        display: none;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        padding: 0;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-inputnumber-input {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down {\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        border-bottom-left-radius: 0;\n        padding: 0;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-inputnumber-button-group {\n        display: flex;\n        flex-direction: column;\n    }\n    \n    .p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {\n        flex: 1 1 auto;\n    }\n    \n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up {\n        order: 3;\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n    \n    .p-inputnumber-buttons-horizontal .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n    }\n    \n    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down {\n        order: 1;\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n    \n    .p-inputnumber-buttons-vertical {\n        flex-direction: column;\n    }\n    \n    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up {\n        order: 1;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n        width: 100%;\n    }\n    \n    .p-inputnumber-buttons-vertical .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n        text-align: center;\n    }\n    \n    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down {\n        order: 3;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        width: 100%;\n    }\n    \n    .p-inputnumber-input {\n        flex: 1 1 auto;\n    }\n    \n    .p-fluid .p-inputnumber {\n        width: 100%;\n    }\n    \n    .p-fluid .p-inputnumber .p-inputnumber-input {\n        width: 1%;\n    }\n    \n    .p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input {\n        width: 100%;\n    }\n}\n";
  var InputNumberBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputNumber',
      __parentMetadata: null,
      allowEmpty: true,
      ariaLabelledBy: null,
      autoFocus: false,
      buttonLayout: 'stacked',
      className: null,
      currency: undefined,
      currencyDisplay: undefined,
      decrementButtonClassName: null,
      decrementButtonIcon: null,
      disabled: false,
      format: true,
      id: null,
      incrementButtonClassName: null,
      incrementButtonIcon: null,
      inputClassName: null,
      inputId: null,
      inputMode: null,
      inputRef: null,
      inputStyle: null,
      invalid: false,
      variant: null,
      locale: undefined,
      localeMatcher: undefined,
      max: null,
      maxFractionDigits: undefined,
      maxLength: null,
      min: null,
      minFractionDigits: undefined,
      mode: 'decimal',
      name: null,
      onBlur: null,
      onChange: null,
      onFocus: null,
      onKeyDown: null,
      onKeyUp: null,
      onValueChange: null,
      pattern: null,
      placeholder: null,
      prefix: null,
      readOnly: false,
      required: false,
      roundingMode: undefined,
      showButtons: false,
      size: null,
      step: 1,
      style: null,
      suffix: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      type: 'text',
      useGrouping: true,
      value: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var InputNumber = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = InputNumberBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var metaData = _objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      state: {
        focused: focusedState
      }
    });
    var _InputNumberBase$setM = InputNumberBase.setMetaData(metaData),
      ptm = _InputNumberBase$setM.ptm,
      cx = _InputNumberBase$setM.cx,
      isUnstyled = _InputNumberBase$setM.isUnstyled;
    componentbase.useHandleStyle(InputNumberBase.css.styles, isUnstyled, {
      name: 'inputnumber'
    });
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(null);
    var timer = React__namespace.useRef(null);
    var lastValue = React__namespace.useRef(null);
    var numberFormat = React__namespace.useRef(null);
    var groupChar = React__namespace.useRef(null);
    var prefixChar = React__namespace.useRef(null);
    var suffixChar = React__namespace.useRef(null);
    var isSpecialChar = React__namespace.useRef(null);
    var _numeral = React__namespace.useRef(null);
    var _group = React__namespace.useRef(null);
    var _minusSign = React__namespace.useRef(null);
    var _currency = React__namespace.useRef(null);
    var _decimal = React__namespace.useRef(null);
    var _decimalSeparator = React__namespace.useRef(null);
    var _suffix = React__namespace.useRef(null);
    var _prefix = React__namespace.useRef(null);
    var _index = React__namespace.useRef(null);
    var isFocusedByClick = React__namespace.useRef(false);
    var _locale = props.locale || context && context.locale || PrimeReact__default["default"].locale;
    var stacked = props.showButtons && props.buttonLayout === 'stacked';
    var horizontal = props.showButtons && props.buttonLayout === 'horizontal';
    var vertical = props.showButtons && props.buttonLayout === 'vertical';
    var inputMode = props.inputMode || (props.mode === 'decimal' && !props.minFractionDigits && !props.maxFractionDigits ? 'numeric' : 'decimal');
    var getOptions = function getOptions() {
      var _props$minFractionDig, _props$maxFractionDig;
      return {
        localeMatcher: props.localeMatcher,
        style: props.mode,
        currency: props.currency,
        currencyDisplay: props.currencyDisplay,
        useGrouping: props.useGrouping,
        minimumFractionDigits: (_props$minFractionDig = props.minFractionDigits) !== null && _props$minFractionDig !== void 0 ? _props$minFractionDig : undefined,
        maximumFractionDigits: (_props$maxFractionDig = props.maxFractionDigits) !== null && _props$maxFractionDig !== void 0 ? _props$maxFractionDig : undefined,
        roundingMode: props.roundingMode
      };
    };
    var constructParser = function constructParser() {
      numberFormat.current = new Intl.NumberFormat(_locale, getOptions());
      var numerals = _toConsumableArray(new Intl.NumberFormat(_locale, {
        useGrouping: false
      }).format(9876543210)).reverse();
      var index = new Map(numerals.map(function (d, i) {
        return [d, i];
      }));
      _numeral.current = new RegExp("[".concat(numerals.join(''), "]"), 'g');
      _group.current = getGroupingExpression(); // regular expression /[,]/g, /[.]/g
      _minusSign.current = getMinusSignExpression(); // regular expression /[-]/g
      _currency.current = getCurrencyExpression(); // regular expression for currency (e.g. /[$]/g, /[€]/g, /[]/g and more)
      _decimal.current = getDecimalExpression(); // regular expression /[,]/g, /[.]/g, /[]/g
      _decimalSeparator.current = getDecimalSeparator(); // current decimal separator  '.', ','
      _suffix.current = getSuffixExpression(); // regular expression for suffix (e.g. /℃/g)
      _prefix.current = getPrefixExpression(); // regular expression for prefix (e.g. /\ days/g)
      _index.current = function (d) {
        return index.get(d);
      };
    };
    var escapeRegExp = function escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

    /**
     * get decimal separator in current locale
     */
    var getDecimalSeparator = function getDecimalSeparator() {
      return new Intl.NumberFormat(_locale, {
        useGrouping: false
      }).format(1.1).trim().replace(_numeral.current, '');
    };
    var getDecimalExpression = function getDecimalExpression() {
      var formatter = new Intl.NumberFormat(_locale, _objectSpread(_objectSpread({}, getOptions()), {}, {
        useGrouping: false
      }));
      return new RegExp("[".concat(formatter.format(1.1).replace(_currency.current, '').trim().replace(_numeral.current, ''), "]"), 'g');
    };
    var getGroupingExpression = function getGroupingExpression() {
      var formatter = new Intl.NumberFormat(_locale, {
        useGrouping: true
      });
      groupChar.current = formatter.format(1000000).trim().replace(_numeral.current, '').charAt(0);
      return new RegExp("[".concat(groupChar.current, "]"), 'g');
    };
    var getMinusSignExpression = function getMinusSignExpression() {
      var formatter = new Intl.NumberFormat(_locale, {
        useGrouping: false
      });
      return new RegExp("[".concat(formatter.format(-1).trim().replace(_numeral.current, ''), "]"), 'g');
    };
    var getCurrencyExpression = function getCurrencyExpression() {
      if (props.currency) {
        var formatter = new Intl.NumberFormat(_locale, {
          style: 'currency',
          currency: props.currency,
          currencyDisplay: props.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          roundingMode: props.roundingMode
        });
        return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(_numeral.current, '').replace(_group.current, ''), "]"), 'g');
      }
      return new RegExp('[]', 'g');
    };
    var getPrefixExpression = function getPrefixExpression() {
      if (props.prefix) {
        prefixChar.current = props.prefix;
      } else {
        var formatter = new Intl.NumberFormat(_locale, {
          style: props.mode,
          currency: props.currency,
          currencyDisplay: props.currencyDisplay
        });
        prefixChar.current = formatter.format(1).split('1')[0];
      }
      return new RegExp("".concat(escapeRegExp(prefixChar.current || '')), 'g');
    };
    var getSuffixExpression = function getSuffixExpression() {
      if (props.suffix) {
        suffixChar.current = props.suffix;
      } else {
        var formatter = new Intl.NumberFormat(_locale, {
          style: props.mode,
          currency: props.currency,
          currencyDisplay: props.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          roundingMode: props.roundingMode
        });
        suffixChar.current = formatter.format(1).split('1')[1];
      }
      return new RegExp("".concat(escapeRegExp(suffixChar.current || '')), 'g');
    };
    var formatValue = function formatValue(value) {
      if (value != null) {
        if (value === '-') {
          // Minus sign
          return value;
        }
        if (props.format) {
          var formatter = new Intl.NumberFormat(_locale, getOptions());
          var _formattedValue = formatter.format(value);
          if (props.prefix) {
            _formattedValue = props.prefix + _formattedValue;
          }
          if (props.suffix) {
            _formattedValue = _formattedValue + props.suffix;
          }
          return _formattedValue;
        }
        return value.toString();
      }
      return '';
    };
    var parseValue = function parseValue(text) {
      var filteredText = text.replace(_suffix.current, '').replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '').replace(_group.current, '').replace(_minusSign.current, '-').replace(_decimal.current, '.').replace(_numeral.current, _index.current);
      if (filteredText) {
        if (filteredText === '-') {
          // Minus sign
          return filteredText;
        }
        var parsedValue = +filteredText;
        return isNaN(parsedValue) ? null : parsedValue;
      }
      return null;
    };
    var addWithPrecision = function addWithPrecision(base, increment) {
      var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      return Math.round((base + increment) * precision) / precision;
    };
    var _repeat = function repeat(event, interval, dir) {
      var i = interval || 500;
      clearTimer();
      timer.current = setTimeout(function () {
        _repeat(event, 40, dir);
      }, i);
      spin(event, dir);
    };
    var spin = function spin(event, dir) {
      if (inputRef.current) {
        var step = props.step * dir;
        var currentValue = parseValue(inputRef.current.value) || 0;
        var newValue = validateValue(addWithPrecision(currentValue, step));
        if (props.maxLength && props.maxLength < formatValue(newValue).length) {
          return;
        }

        // #3913 onChange should be called before onValueChange
        handleOnChange(event, currentValue, newValue);
        // touch devices trigger the keyboard to display because of setSelectionRange
        !utils.DomHandler.isTouchDevice() && updateInput(newValue, null, 'spin');
        updateModel(event, newValue);
      }
    };
    var onUpButtonMouseDown = function onUpButtonMouseDown(event) {
      if (!props.disabled && !props.readOnly) {
        if (!utils.DomHandler.isTouchDevice()) {
          utils.DomHandler.focus(inputRef.current, props.autoFocus);
        }
        _repeat(event, null, 1);
        event.preventDefault();
      }
    };
    var onUpButtonMouseUp = function onUpButtonMouseUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonMouseLeave = function onUpButtonMouseLeave() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonKeyUp = function onUpButtonKeyUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonKeyDown = function onUpButtonKeyDown(event) {
      if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
        _repeat(event, null, 1);
      }
    };
    var onDownButtonMouseDown = function onDownButtonMouseDown(event) {
      if (!props.disabled && !props.readOnly) {
        if (!utils.DomHandler.isTouchDevice()) {
          utils.DomHandler.focus(inputRef.current, props.autoFocus);
        }
        _repeat(event, null, -1);
        event.preventDefault();
      }
    };
    var onDownButtonMouseUp = function onDownButtonMouseUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonMouseLeave = function onDownButtonMouseLeave() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonKeyUp = function onDownButtonKeyUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonKeyDown = function onDownButtonKeyDown(event) {
      if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
        _repeat(event, null, -1);
      }
    };
    var onInput = function onInput(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      if (isSpecialChar.current) {
        event.target.value = lastValue.current;
        isSpecialChar.current = false;
      }
      if (utils.DomHandler.isAndroid()) {
        return;
      }

      // #6324 Chrome is allowing accent-dead characters through...
      var inputType = event.nativeEvent.inputType;
      var data = event.nativeEvent.data;
      if (inputType === 'insertText' && /\D/.test(data)) {
        event.target.value = lastValue.current;
      }
    };
    var onInputAndroidKey = function onInputAndroidKey(event) {
      if (!utils.DomHandler.isAndroid() || props.disabled || props.readOnly) {
        return;
      }
      if (props.onKeyUp) {
        props.onKeyUp(event);

        // do not continue if the user defined event wants to prevent
        if (event.defaultPrevented) {
          return;
        }
      }
      var code = event.which || event.keyCode;
      if (code !== 13) {
        // to submit a form
        event.preventDefault();
      }
      var _char = String.fromCharCode(code);
      var _isDecimalSign = isDecimalSign(_char);
      var _isMinusSign = isMinusSign(_char);
      if (48 <= code && code <= 57 || _isMinusSign || _isDecimalSign) {
        insert(event, _char, {
          isDecimalSign: _isDecimalSign,
          isMinusSign: _isMinusSign
        });
      } else {
        updateValue(event, event.target.value, null, 'delete-single');
      }
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) {
        // #7039 Treat cut as normal character
        if (event.key.toLowerCase() === 'x' && (event.ctrlKey || event.metaKey)) {
          isSpecialChar.current = false;
        } else {
          isSpecialChar.current = true;
        }
        return;
      }
      if (props.onKeyDown) {
        props.onKeyDown(event);

        // Do not continue if the user-defined event wants to prevent
        if (event.defaultPrevented) {
          return;
        }
      }
      lastValue.current = event.target.value;

      // Android is handled specially in onInputAndroidKey
      if (utils.DomHandler.isAndroid()) {
        return;
      }
      var selectionStart = event.target.selectionStart;
      var selectionEnd = event.target.selectionEnd;
      var inputValue = event.target.value;
      var newValueStr = null;
      switch (event.code) {
        //up
        case 'ArrowUp':
          spin(event, 1);
          event.preventDefault();
          break;

        //down
        case 'ArrowDown':
          spin(event, -1);
          event.preventDefault();
          break;

        //left
        case 'ArrowLeft':
          if (!isNumeralChar(inputValue.charAt(selectionStart - 1))) {
            event.preventDefault();
          }
          break;

        //right
        case 'ArrowRight':
          if (!isNumeralChar(inputValue.charAt(selectionStart))) {
            event.preventDefault();
          }
          break;

        //enter and tab
        case 'Tab':
        case 'Enter':
        case 'NumpadEnter':
          newValueStr = validateValue(parseValue(inputValue));
          inputRef.current.value = formatValue(newValueStr);
          inputRef.current.setAttribute('aria-valuenow', newValueStr);
          updateModel(event, newValueStr);
          break;

        //backspace
        case 'Backspace':
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            var deleteChar = inputValue.charAt(selectionStart - 1);
            if (isNumeralChar(deleteChar)) {
              var _getDecimalCharIndexe = getDecimalCharIndexes(inputValue),
                decimalCharIndex = _getDecimalCharIndexe.decimalCharIndex,
                decimalCharIndexWithoutPrefix = _getDecimalCharIndexe.decimalCharIndexWithoutPrefix;
              var decimalLength = getDecimalLength(inputValue);
              if (_group.current.test(deleteChar)) {
                _group.current.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
              } else if (_decimal.current.test(deleteChar)) {
                _decimal.current.lastIndex = 0;
                if (decimalLength) {
                  inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                var insertedText = isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? '' : '0';
                newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            } else if (_currency.current.test(deleteChar)) {
              var _getCharIndexes = getCharIndexes(inputValue),
                minusCharIndex = _getCharIndexes.minusCharIndex,
                currencyCharIndex = _getCharIndexes.currencyCharIndex;
              if (minusCharIndex === currencyCharIndex - 1) {
                newValueStr = inputValue.slice(0, minusCharIndex) + inputValue.slice(selectionStart);
              }
            }
            updateValue(event, newValueStr, null, 'delete-single');
          } else {
            newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
            updateValue(event, newValueStr, null, 'delete-range');
          }
          break;

        // del
        case 'Delete':
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            var _deleteChar = inputValue.charAt(selectionStart);
            var _getDecimalCharIndexe2 = getDecimalCharIndexes(inputValue),
              _decimalCharIndex = _getDecimalCharIndexe2.decimalCharIndex,
              _decimalCharIndexWithoutPrefix = _getDecimalCharIndexe2.decimalCharIndexWithoutPrefix;
            if (isNumeralChar(_deleteChar)) {
              var _decimalLength = getDecimalLength(inputValue);
              if (_group.current.test(_deleteChar)) {
                _group.current.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
              } else if (_decimal.current.test(_deleteChar)) {
                _decimal.current.lastIndex = 0;
                if (_decimalLength) {
                  inputRef.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                }
              } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
                var _insertedText = isDecimalMode() && (props.minFractionDigits || 0) < _decimalLength ? '' : '0';
                newValueStr = inputValue.slice(0, selectionStart) + _insertedText + inputValue.slice(selectionStart + 1);
              } else if (_decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            }
            updateValue(event, newValueStr, null, 'delete-back-single');
          } else {
            newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
            updateValue(event, newValueStr, null, 'delete-range');
          }
          break;
        case 'End':
          event.preventDefault();
          if (!utils.ObjectUtils.isEmpty(props.max)) {
            updateModel(event, props.max);
          }
          break;
        case 'Home':
          event.preventDefault();
          if (!utils.ObjectUtils.isEmpty(props.min)) {
            updateModel(event, props.min);
          }
          break;
        default:
          event.preventDefault();
          var _char2 = event.key;
          if (_char2) {
            // get decimal separator in current locale
            if (_char2 === '.') {
              _char2 = _decimalSeparator.current;
            }
            var _isDecimalSign = isDecimalSign(_char2);
            var _isMinusSign = isMinusSign(_char2);
            if (Number(_char2) >= 0 && Number(_char2) <= 9 || _isMinusSign || _isDecimalSign) {
              insert(event, _char2, {
                isDecimalSign: _isDecimalSign,
                isMinusSign: _isMinusSign
              });
            }
          }
          break;
      }
    };
    var onPaste = function onPaste(event) {
      event.preventDefault();
      if (props.disabled || props.readOnly) {
        return;
      }
      var data = (event.clipboardData || window.clipboardData).getData('Text');
      if (data) {
        var filteredData = parseValue(data);
        if (filteredData != null) {
          if (isFloat(filteredData)) {
            var _formattedValue2 = formatValue(filteredData);
            inputRef.current.value = _formattedValue2;
            updateModel(event, filteredData);
          } else {
            insert(event, filteredData.toString());
          }
        }
      }
    };
    var allowMinusSign = function allowMinusSign() {
      return utils.ObjectUtils.isEmpty(props.min) || props.min < 0;
    };
    var isMinusSign = function isMinusSign(_char3) {
      if (_minusSign.current.test(_char3) || _char3 === '-') {
        _minusSign.current.lastIndex = 0;
        return true;
      }
      return false;
    };
    var replaceDecimalSeparator = function replaceDecimalSeparator(val) {
      if (isFloat(val)) {
        return val.toString().replace(/\.(?=[^.]*$)/, _decimalSeparator.current);
      }
      return val;
    };
    var isDecimalSign = function isDecimalSign(_char4) {
      if (_decimal.current.test(_char4) || isFloat(_char4)) {
        _decimal.current.lastIndex = 0;
        return true;
      }
      return false;
    };
    var isDecimalMode = function isDecimalMode() {
      return props.mode === 'decimal';
    };
    var isFloat = function isFloat(val) {
      var formatter = new Intl.NumberFormat(_locale, getOptions());
      var parseVal = parseValue(formatter.format(val));
      if (parseVal === null) {
        return false;
      }
      return parseVal % 1 !== 0;
    };
    var getDecimalCharIndexes = function getDecimalCharIndexes(val) {
      var decimalCharIndex = val.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      var filteredVal = val.replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '');
      var decimalCharIndexWithoutPrefix = filteredVal.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      return {
        decimalCharIndex: decimalCharIndex,
        decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix
      };
    };
    var getCharIndexes = function getCharIndexes(val) {
      var decimalCharIndex = val.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      var minusCharIndex = val.search(_minusSign.current);
      _minusSign.current.lastIndex = 0;
      var suffixCharIndex = val.search(_suffix.current);
      _suffix.current.lastIndex = 0;
      var currencyCharIndex = val.search(_currency.current);
      if (currencyCharIndex === 0 && prefixChar.current && prefixChar.current.length > 1) {
        currencyCharIndex = prefixChar.current.trim().length;
      }
      _currency.current.lastIndex = 0;
      return {
        decimalCharIndex: decimalCharIndex,
        minusCharIndex: minusCharIndex,
        suffixCharIndex: suffixCharIndex,
        currencyCharIndex: currencyCharIndex
      };
    };
    var insert = function insert(event, text) {
      var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        isDecimalSign: false,
        isMinusSign: false
      };
      var minusCharIndexOnText = text.search(_minusSign.current);
      _minusSign.current.lastIndex = 0;
      if (!allowMinusSign() && minusCharIndexOnText !== -1) {
        return;
      }
      var selectionStart = inputRef.current.selectionStart;
      var selectionEnd = inputRef.current.selectionEnd;
      var inputValue = inputRef.current.value.trim();
      var _getCharIndexes2 = getCharIndexes(inputValue),
        decimalCharIndex = _getCharIndexes2.decimalCharIndex,
        minusCharIndex = _getCharIndexes2.minusCharIndex,
        suffixCharIndex = _getCharIndexes2.suffixCharIndex,
        currencyCharIndex = _getCharIndexes2.currencyCharIndex;
      var maxFractionDigits = numberFormat.current.resolvedOptions().maximumFractionDigits;
      var hasBoundOrAffix = props.min || props.max || props.suffix || props.prefix; //only exception
      var newValueStr;
      if (sign.isMinusSign) {
        var isNewMinusSign = minusCharIndex === -1;

        // #6522 - Selected negative value can't be overwritten with a minus ('-') symbol
        if (selectionStart === 0 || selectionStart === currencyCharIndex + 1) {
          newValueStr = inputValue;
          if (isNewMinusSign || selectionEnd !== 0) {
            newValueStr = insertText(inputValue, text, 0, selectionEnd);
          }
          updateValue(event, newValueStr, text, 'insert');
        }
      } else if (sign.isDecimalSign) {
        if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
          updateValue(event, inputValue, text, 'insert');
        } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
          newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
          updateValue(event, newValueStr, text, 'insert');
        } else if (decimalCharIndex === -1 && (maxFractionDigits || props.maxFractionDigits)) {
          var allowedDecimal = inputMode !== 'numeric' || inputMode === 'numeric' && hasBoundOrAffix;
          if (allowedDecimal) {
            newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
            updateValue(event, newValueStr, text, 'insert');
          }
        }
      } else {
        var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
          if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
            var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
            updateValue(event, newValueStr, text, operation);
          }
        } else {
          newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
          updateValue(event, newValueStr, text, operation);
        }
      }
    };
    var replaceSuffix = function replaceSuffix(value) {
      return value ? value.replace(_suffix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '') : value;
    };
    var insertText = function insertText(value, text, start, end) {
      var textSplit = isDecimalSign(text) ? text : text.split(_decimal.current);
      if (textSplit.length === 2) {
        var decimalCharIndex = value.slice(start, end).search(_decimal.current);
        _decimal.current.lastIndex = 0;
        return decimalCharIndex > 0 ? value.slice(0, start) + formatValue(text) + replaceSuffix(value).slice(end) : value || formatValue(text);
      } else if (isDecimalSign(text) && value.length === 0) {
        return formatValue('0.');
      } else if (end - start === value.length) {
        return formatValue(text);
      } else if (start === 0) {
        var suffix = utils.ObjectUtils.isLetter(value[end]) ? end - 1 : end;
        return text + value.slice(suffix);
      } else if (end === value.length) {
        return value.slice(0, start) + text;
      }
      var selectionValue = value.slice(start, end);
      // Fix: if the suffix starts with a space, the input will be cleared after pasting
      var space = /\s$/.test(selectionValue) ? ' ' : '';
      return value.slice(0, start) + text + space + value.slice(end);
    };
    var deleteRange = function deleteRange(value, start, end) {
      var newValueStr;
      if (end - start === value.length) {
        newValueStr = '';
      } else if (start === 0) {
        newValueStr = value.slice(end);
      } else if (end === value.length) {
        newValueStr = value.slice(0, start);
      } else {
        newValueStr = value.slice(0, start) + value.slice(end);
      }
      return newValueStr;
    };
    var initCursor = function initCursor() {
      var selectionStart = inputRef.current.selectionStart;
      var inputValue = inputRef.current.value;
      var valueLength = inputValue.length;
      var index = null;

      // remove prefix
      var prefixLength = (prefixChar.current || '').length;
      inputValue = inputValue.replace(_prefix.current, '');
      selectionStart = selectionStart - prefixLength;
      var _char5 = inputValue.charAt(selectionStart);
      if (isNumeralChar(_char5)) {
        return selectionStart + prefixLength;
      }

      //left
      var i = selectionStart - 1;
      while (i >= 0) {
        _char5 = inputValue.charAt(i);
        if (isNumeralChar(_char5)) {
          index = i + prefixLength;
          break;
        } else {
          i--;
        }
      }
      if (index !== null) {
        inputRef.current.setSelectionRange(index + 1, index + 1);
      } else {
        i = selectionStart;
        while (i < valueLength) {
          _char5 = inputValue.charAt(i);
          if (isNumeralChar(_char5)) {
            index = i + prefixLength;
            break;
          } else {
            i++;
          }
        }
        if (index !== null) {
          inputRef.current.setSelectionRange(index, index);
        }
      }
      return index || 0;
    };
    var onInputPointerDown = function onInputPointerDown() {
      isFocusedByClick.current = true;
    };
    var onInputClick = function onInputClick() {
      initCursor();
    };
    var isNumeralChar = function isNumeralChar(_char6) {
      if (_char6.length === 1 && (_numeral.current.test(_char6) || _decimal.current.test(_char6) || _group.current.test(_char6) || _minusSign.current.test(_char6))) {
        resetRegex();
        return true;
      }
      return false;
    };
    var resetRegex = function resetRegex() {
      _numeral.current.lastIndex = 0;
      _decimal.current.lastIndex = 0;
      _group.current.lastIndex = 0;
      _minusSign.current.lastIndex = 0;
    };
    var updateValue = function updateValue(event, valueStr, insertedValueStr, operation) {
      var currentValue = inputRef.current.value;
      var newValue = null;
      if (valueStr != null) {
        newValue = evaluateEmpty(parseValue(valueStr));
        updateInput(newValue, insertedValueStr, operation, valueStr);
        handleOnChange(event, currentValue, newValue);
      }
    };
    var evaluateEmpty = function evaluateEmpty(newValue) {
      return !newValue && !props.allowEmpty ? props.min || 0 : newValue;
    };
    var handleOnChange = function handleOnChange(event, currentValue, newValue) {
      if (props.onChange && isValueChanged(currentValue, newValue)) {
        props.onChange({
          originalEvent: event,
          value: newValue
        });
      }
    };
    var isValueChanged = function isValueChanged(currentValue, newValue) {
      if (newValue === null && currentValue !== null) {
        return true;
      }
      if (newValue != null) {
        var parsedCurrentValue = typeof currentValue === 'string' ? parseValue(currentValue) : currentValue;
        return newValue !== parsedCurrentValue;
      }
      return false;
    };
    var validateValue = function validateValue(value) {
      if (value === '-') {
        return null;
      }
      return validateValueByLimit(value);
    };
    var validateValueByLimit = function validateValueByLimit(value) {
      if (utils.ObjectUtils.isEmpty(value)) {
        return null;
      }
      if (props.min !== null && value < props.min) {
        return props.min;
      }
      if (props.max !== null && value > props.max) {
        return props.max;
      }
      return value;
    };
    var updateInput = function updateInput(value, insertedValueStr, operation, valueStr) {
      insertedValueStr = insertedValueStr || '';
      var inputEl = inputRef.current;
      var inputValue = inputEl.value;
      var newValue = formatValue(value);
      var currentLength = inputValue.length;
      if (newValue !== valueStr) {
        newValue = concatValues(newValue, valueStr);
      }
      if (currentLength === 0) {
        inputEl.value = newValue;
        inputEl.setSelectionRange(0, 0);
        var index = initCursor();
        var selectionEnd = index + insertedValueStr.length + (isDecimalSign(insertedValueStr) ? 1 : 0);
        inputEl.setSelectionRange(selectionEnd, selectionEnd);
      } else {
        var selectionStart = inputEl.selectionStart;
        var _selectionEnd = inputEl.selectionEnd;
        if (props.maxLength && props.maxLength < newValue.length) {
          return;
        }
        inputEl.value = newValue;
        var newLength = newValue.length;
        if (operation === 'range-insert') {
          var startValue = parseValue((inputValue || '').slice(0, selectionStart));
          var startValueStr = startValue !== null ? startValue.toString() : '';
          var startExpr = startValueStr.split('').join("(".concat(groupChar.current, ")?"));
          var sRegex = new RegExp(startExpr, 'g');
          sRegex.test(newValue);
          var tExpr = insertedValueStr.split('').join("(".concat(groupChar.current, ")?"));
          var tRegex = new RegExp(tExpr, 'g');
          tRegex.test(newValue.slice(sRegex.lastIndex));
          _selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
          inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (newLength === currentLength) {
          if (operation === 'insert' || operation === 'delete-back-single') {
            var newSelectionEnd = _selectionEnd;
            if (insertedValueStr === '0') {
              newSelectionEnd = _selectionEnd + 1;
            } else {
              newSelectionEnd = newSelectionEnd + Number(isDecimalSign(value) || isDecimalSign(insertedValueStr));
            }
            inputEl.setSelectionRange(newSelectionEnd, newSelectionEnd);
          } else if (operation === 'delete-single') {
            inputEl.setSelectionRange(_selectionEnd - 1, _selectionEnd - 1);
          } else if (operation === 'delete-range' || operation === 'spin') {
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          }
        } else if (operation === 'delete-back-single') {
          var prevChar = inputValue.charAt(_selectionEnd - 1);
          var nextChar = inputValue.charAt(_selectionEnd);
          var diff = currentLength - newLength;
          var isGroupChar = _group.current.test(nextChar);
          if (isGroupChar && diff === 1) {
            _selectionEnd = _selectionEnd + 1;
          } else if (!isGroupChar && isNumeralChar(prevChar)) {
            _selectionEnd = _selectionEnd + (-1 * diff + 1);
          }
          _group.current.lastIndex = 0;
          inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (inputValue === '-' && operation === 'insert') {
          inputEl.setSelectionRange(0, 0);
          var _index2 = initCursor();
          var _selectionEnd2 = _index2 + insertedValueStr.length + 1;
          inputEl.setSelectionRange(_selectionEnd2, _selectionEnd2);
        } else {
          _selectionEnd = _selectionEnd + (newLength - currentLength);
          inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        }
      }
      inputEl.setAttribute('aria-valuenow', value);
    };
    var updateInputValue = function updateInputValue(newValue) {
      newValue = evaluateEmpty(newValue);
      var inputEl = inputRef.current;
      var value = inputEl.value;
      var _formattedValue = formattedValue(newValue);
      if (value !== _formattedValue) {
        inputEl.value = _formattedValue;
        inputEl.setAttribute('aria-valuenow', newValue);
      }
    };
    var formattedValue = function formattedValue(val) {
      return formatValue(evaluateEmpty(val));
    };
    var concatValues = function concatValues(val1, val2) {
      if (val1 && val2) {
        var decimalCharIndex = val2.search(_decimal.current);
        _decimal.current.lastIndex = 0;
        var newVal1 = replaceDecimalSeparator(val1).split(_decimal.current)[0].replace(_suffix.current, '').trim();
        return decimalCharIndex !== -1 ? newVal1 + val2.slice(decimalCharIndex) : val1;
      }
      return val1;
    };
    var getDecimalLength = function getDecimalLength(value) {
      if (value) {
        var valueSplit = value.split(_decimal.current);
        if (valueSplit.length === 2) {
          return replaceSuffix(valueSplit[1]).length;
        }
      }
      return 0;
    };
    var updateModel = function updateModel(event, value) {
      if (props.onValueChange) {
        props.onValueChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {
            event === null || event === void 0 || event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event === null || event === void 0 || event.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };
    var onInputFocus = function onInputFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
      if ((props.suffix || props.currency || props.prefix) && inputRef.current && !isFocusedByClick.current) {
        // GitHub #1866,#5537
        var inputValue = inputRef.current.value;
        var prefixLength = (prefixChar.current || '').length;
        var suffixLength = (suffixChar.current || '').length;
        var end = inputValue.length === 0 ? 0 : inputValue.length - suffixLength;
        inputRef.current.setSelectionRange(prefixLength, end);
      }
    };
    var onInputBlur = function onInputBlur(event) {
      setFocusedState(false);
      isFocusedByClick.current = false;
      if (inputRef.current) {
        var currentValue = inputRef.current.value;
        if (isValueChanged(currentValue, props.value)) {
          var newValue = validateValue(parseValue(currentValue));
          updateInputValue(newValue);
          updateModel(event, newValue);
        }
      }
      props.onBlur && props.onBlur(event);
    };
    var clearTimer = function clearTimer() {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
    var changeValue = function changeValue() {
      var val = validateValueByLimit(props.value);
      updateInputValue(props.format ? val : replaceDecimalSeparator(val));
      var newValue = validateValue(props.value);
      if (props.value !== null && props.value !== newValue) {
        updateModel(null, newValue);
      }
    };
    var getFormatter = function getFormatter() {
      return numberFormat.current;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getFormatter: getFormatter,
        getElement: function getElement() {
          return elementRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUnmountEffect(function () {
      clearTimer();
    });
    hooks.useMountEffect(function () {
      constructParser();
      var newValue = validateValue(props.value);
      if (props.value !== null && props.value !== newValue) {
        updateModel(null, newValue);
      }
    });
    hooks.useUpdateEffect(function () {
      constructParser();
      changeValue();
    }, [_locale, props.locale, props.localeMatcher, props.mode, props.currency, props.currencyDisplay, props.useGrouping, props.minFractionDigits, props.maxFractionDigits, props.suffix, props.prefix]);
    hooks.useUpdateEffect(function () {
      changeValue();
    }, [props.value]);
    hooks.useUpdateEffect(function () {
      // #5245 prevent infinite loop
      if (props.disabled) {
        clearTimer();
      }
    }, [props.disabled]);
    var createInputElement = function createInputElement() {
      var className = utils.classNames(props.inputClassName, cx('input', {
        context: context
      }));
      var valueToRender = formattedValue(props.value);
      return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
        ref: inputRef,
        id: props.inputId,
        style: props.inputStyle,
        role: "spinbutton",
        className: className,
        defaultValue: valueToRender,
        type: props.type,
        size: props.size,
        tabIndex: props.tabIndex,
        inputMode: inputMode,
        maxLength: props.maxLength,
        disabled: props.disabled,
        required: props.required,
        pattern: props.pattern,
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        name: props.name,
        autoFocus: props.autoFocus,
        onKeyDown: onInputKeyDown,
        onKeyPress: onInputAndroidKey,
        onInput: onInput,
        onClick: onInputClick,
        onPointerDown: onInputPointerDown,
        onBlur: onInputBlur,
        onFocus: onInputFocus,
        onPaste: onPaste,
        min: props.min,
        max: props.max,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.value
      }, ariaProps, dataProps, {
        pt: ptm('input'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: metaData
        }
      }));
    };
    var createUpButton = function createUpButton() {
      var incrementIconProps = mergeProps({
        className: cx('incrementIcon')
      }, ptm('incrementIcon'));
      var icon = props.incrementButtonIcon || /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, incrementIconProps);
      var upButton = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, incrementIconProps), {
        props: props
      });
      var incrementButtonProps = mergeProps({
        type: 'button',
        className: utils.classNames(props.incrementButtonClassName, cx('incrementButton')),
        onPointerLeave: onUpButtonMouseLeave,
        onPointerDown: function onPointerDown(e) {
          return onUpButtonMouseDown(e);
        },
        onPointerUp: onUpButtonMouseUp,
        onKeyDown: function onKeyDown(e) {
          return onUpButtonKeyDown(e);
        },
        onKeyUp: onUpButtonKeyUp,
        disabled: props.disabled,
        tabIndex: -1,
        'aria-hidden': true
      }, ptm('incrementButton'));
      return /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, upButton, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createDownButton = function createDownButton() {
      var decrementIconProps = mergeProps({
        className: cx('decrementIcon')
      }, ptm('decrementIcon'));
      var icon = props.decrementButtonIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, decrementIconProps);
      var downButton = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, decrementIconProps), {
        props: props
      });
      var decrementButtonProps = mergeProps({
        type: 'button',
        className: utils.classNames(props.decrementButtonClassName, cx('decrementButton')),
        onPointerLeave: onDownButtonMouseLeave,
        onPointerDown: function onPointerDown(e) {
          return onDownButtonMouseDown(e);
        },
        onPointerUp: onDownButtonMouseUp,
        onKeyDown: function onKeyDown(e) {
          return onDownButtonKeyDown(e);
        },
        onKeyUp: onDownButtonKeyUp,
        disabled: props.disabled,
        tabIndex: -1,
        'aria-hidden': true
      }, ptm('decrementButton'));
      return /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, downButton, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createButtonGroup = function createButtonGroup() {
      var upButton = props.showButtons && createUpButton();
      var downButton = props.showButtons && createDownButton();
      var buttonGroupProps = mergeProps({
        className: cx('buttonGroup')
      }, ptm('buttonGroup'));
      if (stacked) {
        return /*#__PURE__*/React__namespace.createElement("span", buttonGroupProps, upButton, downButton);
      }
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, upButton, downButton);
    };
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputNumberBase.getOtherProps(props);
    var dataProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.DATA_PROPS);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var inputElement = createInputElement();
    var buttonGroup = createButtonGroup();
    var rootProps = mergeProps({
      id: props.id,
      className: utils.classNames(props.className, cx('root', {
        focusedState: focusedState,
        stacked: stacked,
        horizontal: horizontal,
        vertical: vertical
      })),
      style: props.style
    }, otherProps, ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", _extends({
      ref: elementRef
    }, rootProps), inputElement, buttonGroup), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  InputNumber.displayName = 'InputNumber';

  exports.InputNumber = InputNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.icons.angledown, primereact.icons.angleup, primereact.inputtext, primereact.ripple, primereact.tooltip, primereact.utils);
