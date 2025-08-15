this.primereact = this.primereact || {};
this.primereact.radiobutton = (function (exports, React, api, componentbase, hooks, tooltip, utils) {
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
        context = _ref.context;
      return utils.classNames('p-radiobutton p-component', {
        'p-highlight': props.checked,
        'p-disabled': props.disabled,
        'p-invalid': props.invalid,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    box: 'p-radiobutton-box',
    input: 'p-radiobutton-input',
    icon: 'p-radiobutton-icon'
  };
  var RadioButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'RadioButton',
      autoFocus: false,
      checked: false,
      className: null,
      disabled: false,
      id: null,
      inputId: null,
      inputRef: null,
      invalid: false,
      variant: null,
      name: null,
      onChange: null,
      onClick: null,
      required: false,
      style: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      value: null,
      children: undefined
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var RadioButton = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = RadioButtonBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var _RadioButtonBase$setM = RadioButtonBase.setMetaData({
        props: props
      }),
      ptm = _RadioButtonBase$setM.ptm,
      cx = _RadioButtonBase$setM.cx,
      isUnstyled = _RadioButtonBase$setM.isUnstyled;
    componentbase.useHandleStyle(RadioButtonBase.css.styles, isUnstyled, {
      name: 'radiobutton'
    });
    var select = function select(event) {
      onChange(event);
    };
    var onChange = function onChange(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      if (props.onChange) {
        var checked = props.checked;
        var radioClicked = event.target instanceof HTMLDivElement;
        var inputClicked = event.target === inputRef.current;
        var isInputToggled = inputClicked && event.target.checked !== checked;
        var isRadioToggled = radioClicked && (utils.DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
        var value = !checked;
        var eventData = {
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {
            event === null || event === void 0 || event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event === null || event === void 0 || event.preventDefault();
          },
          target: {
            type: 'radio',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        };
        if (isInputToggled || isRadioToggled) {
          var _props$onChange;
          props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

          // do not continue if the user defined click wants to prevent
          if (event.defaultPrevented) {
            return;
          }
          if (isRadioToggled) {
            inputRef.current.checked = value;
          }
        }
        utils.DomHandler.focus(inputRef.current);
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
        select: select,
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
      if (inputRef.current) {
        inputRef.current.checked = props.checked;
      }
    }, [props.checked]);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focus(inputRef.current, props.autoFocus);
      }
    });
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = RadioButtonBase.getOtherProps(props);
    var rootProps = mergeProps({
      id: props.id,
      className: utils.classNames(props.className, cx('root', {
        context: context
      })),
      style: props.style,
      'data-p-checked': props.checked
    }, otherProps, ptm('root'));
    delete rootProps.input;
    delete rootProps.box;
    delete rootProps.icon;
    var createInputElement = function createInputElement() {
      var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
      var inputProps = mergeProps(_objectSpread({
        id: props.inputId,
        type: 'radio',
        name: props.name,
        defaultChecked: props.checked,
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        disabled: props.disabled,
        readOnly: props.readOnly,
        required: props.required,
        tabIndex: props.tabIndex,
        className: cx('input')
      }, ariaProps), inProps.input, ptm('input'));
      return /*#__PURE__*/React__namespace.createElement("input", _extends({
        ref: inputRef
      }, inputProps));
    };
    var createBoxElement = function createBoxElement() {
      var boxProps = mergeProps({
        className: cx('box')
      }, inProps.box, ptm('box'));
      var iconProps = mergeProps({
        className: cx('icon')
      }, inProps.icon, ptm('icon'));
      return /*#__PURE__*/React__namespace.createElement("div", boxProps, /*#__PURE__*/React__namespace.createElement("div", iconProps));
    };
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef
    }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  RadioButton.displayName = 'RadioButton';

  exports.RadioButton = RadioButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.tooltip, primereact.utils);
