this.primereact = this.primereact || {};
this.primereact.inputtextarea = (function (exports, React, api, componentbase, hooks, keyfilter, tooltip, utils) {
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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        context = _ref.context,
        isFilled = _ref.isFilled;
      return utils.classNames('p-inputtextarea p-inputtext p-component', {
        'p-disabled': props.disabled,
        'p-filled': isFilled,
        'p-inputtextarea-resizable': props.autoResize,
        'p-invalid': props.invalid,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-inputtextarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n    \n    .p-fluid .p-inputtextarea {\n        width: 100%;\n    }\n}\n";
  var InputTextareaBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputTextarea',
      __parentMetadata: null,
      autoResize: false,
      invalid: false,
      variant: null,
      keyfilter: null,
      onBlur: null,
      onFocus: null,
      onBeforeInput: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onPaste: null,
      tooltip: null,
      tooltipOptions: null,
      validateOnly: false,
      children: undefined,
      className: null
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var InputTextarea = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InputTextareaBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(ref);
    var cachedScrollHeight = React__namespace.useRef(0);
    var _InputTextareaBase$se = InputTextareaBase.setMetaData(_objectSpread(_objectSpread({
        props: props
      }, props.__parentMetadata), {}, {
        context: {
          disabled: props.disabled
        }
      })),
      ptm = _InputTextareaBase$se.ptm,
      cx = _InputTextareaBase$se.cx,
      isUnstyled = _InputTextareaBase$se.isUnstyled;
    componentbase.useHandleStyle(InputTextareaBase.css.styles, isUnstyled, {
      name: 'inputtextarea'
    });
    var onFocus = function onFocus(event) {
      if (props.autoResize) {
        resize();
      }
      props.onFocus && props.onFocus(event);
    };
    var onBlur = function onBlur(event) {
      if (props.autoResize) {
        resize();
      }
      props.onBlur && props.onBlur(event);
    };
    var onKeyUp = function onKeyUp(event) {
      if (props.autoResize) {
        resize();
      }
      props.onKeyUp && props.onKeyUp(event);
    };
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
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      var target = event.target;
      if (props.autoResize) {
        resize(utils.ObjectUtils.isEmpty(target.value));
      }
      props.onInput && props.onInput(event);
      utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
    };
    var resize = function resize(initial) {
      var inputEl = elementRef.current;
      if (inputEl && isVisible()) {
        if (!cachedScrollHeight.current) {
          cachedScrollHeight.current = inputEl.scrollHeight;
          inputEl.style.overflow = 'hidden';
        }
        if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
          inputEl.style.height = '';
          inputEl.style.height = inputEl.scrollHeight + 'px';
          if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
            inputEl.style.overflowY = 'scroll';
            inputEl.style.height = inputEl.style.maxHeight;
          } else {
            inputEl.style.overflow = 'hidden';
          }
          cachedScrollHeight.current = inputEl.scrollHeight;
        }
      }
    };
    var isVisible = function isVisible() {
      if (utils.DomHandler.isVisible(elementRef.current)) {
        var rect = elementRef.current.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }
      return false;
    };
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    React__namespace.useEffect(function () {
      if (props.autoResize) {
        resize(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.autoResize, props.value]);
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue);
    }, [props.value, props.defaultValue]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root', {
        context: context,
        isFilled: isFilled
      })),
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyUp: onKeyUp,
      onKeyDown: onKeyDown,
      onBeforeInput: onBeforeInput,
      onInput: onInput,
      onPaste: onPaste
    }, InputTextareaBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("textarea", rootProps), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  InputTextarea.displayName = 'InputTextarea';

  exports.InputTextarea = InputTextarea;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.keyfilter, primereact.tooltip, primereact.utils);
