this.primereact = this.primereact || {};
this.primereact.inputswitch = (function (exports, React, api, componentbase, hooks, tooltip, utils) {
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
        checked = _ref.checked;
      return utils.classNames('p-inputswitch p-component', {
        'p-highlight': checked,
        'p-disabled': props.disabled,
        'p-invalid': props.invalid
      });
    },
    input: 'p-inputswitch-input',
    slider: 'p-inputswitch-slider'
  };
  var InputSwitchBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputSwitch',
      autoFocus: false,
      checked: false,
      className: null,
      disabled: false,
      falseValue: false,
      id: null,
      inputId: null,
      inputRef: null,
      invalid: false,
      name: null,
      onBlur: null,
      onChange: null,
      onFocus: null,
      style: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      trueValue: true,
      children: undefined
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var InputSwitch = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InputSwitchBase.getProps(inProps, context);
    var _InputSwitchBase$setM = InputSwitchBase.setMetaData({
        props: props
      }),
      ptm = _InputSwitchBase$setM.ptm,
      cx = _InputSwitchBase$setM.cx,
      isUnstyled = _InputSwitchBase$setM.isUnstyled;
    componentbase.useHandleStyle(InputSwitchBase.css.styles, isUnstyled, {
      name: 'inputswitch'
    });
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var checked = props.checked === props.trueValue;
    var onChange = function onChange(event) {
      if (props.onChange) {
        var value = checked ? props.falseValue : props.trueValue;
        props.onChange({
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
    var onFocus = function onFocus(event) {
      var _props$onFocus;
      props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
    };
    var onBlur = function onBlur(event) {
      var _props$onBlur;
      props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
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
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focus(inputRef.current, props.autoFocus);
      }
    });
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputSwitchBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var rootProps = mergeProps({
      className: utils.classNames(props.className, cx('root', {
        checked: checked
      })),
      style: props.style,
      role: 'checkbox',
      'aria-checked': checked,
      'data-p-highlight': checked,
      'data-p-disabled': props.disabled
    }, otherProps, ptm('root'));
    var inputProps = mergeProps(_objectSpread({
      type: 'checkbox',
      id: props.inputId,
      name: props.name,
      checked: checked,
      onChange: onChange,
      onFocus: onFocus,
      onBlur: onBlur,
      disabled: props.disabled,
      role: 'switch',
      tabIndex: props.tabIndex,
      'aria-checked': checked,
      className: cx('input')
    }, ariaProps), ptm('input'));
    var sliderProps = mergeProps({
      className: cx('slider')
    }, ptm('slider'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef
    }, rootProps), /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef
    }, inputProps)), /*#__PURE__*/React__namespace.createElement("span", sliderProps)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  InputSwitch.displayName = 'InputSwitch';

  exports.InputSwitch = InputSwitch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.tooltip, primereact.utils);
