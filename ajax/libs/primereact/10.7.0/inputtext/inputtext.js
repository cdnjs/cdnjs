this.primereact = this.primereact || {};
this.primereact.inputtext = (function (exports, React, api, componentbase, hooks, keyfilter, tooltip, utils) {
  'use strict';

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

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        isFilled = _ref.isFilled,
        context = _ref.context;
      return utils.classNames('p-inputtext p-component', {
        'p-disabled': props.disabled,
        'p-filled': isFilled,
        'p-invalid': props.invalid,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    }
  };
  var InputTextBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputText',
      __parentMetadata: null,
      children: undefined,
      className: null,
      invalid: false,
      variant: null,
      keyfilter: null,
      onBeforeInput: null,
      onInput: null,
      onKeyDown: null,
      onPaste: null,
      tooltip: null,
      tooltipOptions: null,
      validateOnly: false
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var InputText = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InputTextBase.getProps(inProps, context);
    var _InputTextBase$setMet = InputTextBase.setMetaData(_objectSpread(_objectSpread({
        props: props
      }, props.__parentMetadata), {}, {
        context: {
          disabled: props.disabled
        }
      })),
      ptm = _InputTextBase$setMet.ptm,
      cx = _InputTextBase$setMet.cx,
      isUnstyled = _InputTextBase$setMet.isUnstyled;
    componentbase.useHandleStyle(InputTextBase.css.styles, isUnstyled, {
      name: 'inputtext',
      styled: true
    });
    var elementRef = React__namespace.useRef(ref);
    var onKeyDown = function onKeyDown(event) {
      props.onKeyDown && props.onKeyDown(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
      }
    };
    var onBeforeInput = function onBeforeInput(event) {
      props.onBeforeInput && props.onBeforeInput(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      var target = event.target;
      var validatePattern = true;
      if (props.keyfilter && props.validateOnly) {
        validatePattern = keyfilter.KeyFilter.validate(event, props.keyfilter);
      }
      props.onInput && props.onInput(event, validatePattern);

      // for uncontrolled changes
      utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
    };
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue);
    }, [props.value, props.defaultValue]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var rootProps = mergeProps({
      className: utils.classNames(props.className, cx('root', {
        context: context,
        isFilled: isFilled
      })),
      onBeforeInput: onBeforeInput,
      onInput: onInput,
      onKeyDown: onKeyDown,
      onPaste: onPaste
    }, InputTextBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: elementRef
    }, rootProps)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  InputText.displayName = 'InputText';

  exports.InputText = InputText;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.keyfilter, primereact.tooltip, primereact.utils);
