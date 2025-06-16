this.primereact = this.primereact || {};
this.primereact.tristatecheckbox = (function (exports, React, api, componentbase, hooks, check, times, tooltip, utils) {
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
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
        context = _ref.context;
      return utils.classNames('p-tristatecheckbox p-checkbox p-component', {
        'p-highlight': props.value !== '' && props.value !== null,
        'p-disabled': props.disabled,
        'p-invalid': props.invalid,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    checkIcon: 'p-checkbox-icon p-c',
    box: 'p-checkbox-box',
    input: 'p-checkbox-input'
  };
  var TriStateCheckboxBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'TriStateCheckbox',
      autoFocus: false,
      checkIcon: null,
      className: null,
      disabled: false,
      id: null,
      invalid: false,
      variant: null,
      onChange: null,
      readOnly: false,
      style: null,
      tabIndex: '0',
      tooltip: null,
      tooltipOptions: null,
      uncheckIcon: null,
      value: '',
      children: undefined
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var TriStateCheckbox = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TriStateCheckboxBase.getProps(inProps, context);
    var _useState = React.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      checkBoxValue = _useState2[0],
      setCheckBoxValue = _useState2[1];
    var elementRef = React__namespace.useRef(null);
    var _TriStateCheckboxBase = TriStateCheckboxBase.setMetaData({
        props: props
      }),
      ptm = _TriStateCheckboxBase.ptm,
      cx = _TriStateCheckboxBase.cx,
      isUnstyled = _TriStateCheckboxBase.isUnstyled;
    componentbase.useHandleStyle(TriStateCheckboxBase.css.styles, isUnstyled, {
      name: 'tristatecheckbox'
    });
    React.useEffect(function () {
      if ([true, false, ''].includes(props.value)) {
        setCheckBoxValue(props.value);
      } else {
        setCheckBoxValue('');
      }
    }, [props.value]);
    var onChange = function onChange(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      var newValue;
      if (checkBoxValue === '') {
        newValue = true;
      } else if (checkBoxValue === true) {
        newValue = false;
      } else if (checkBoxValue === false) {
        newValue = '';
      }
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: newValue,
          stopPropagation: function stopPropagation() {
            event === null || event === void 0 || event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event === null || event === void 0 || event.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: newValue
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
    var onKeyDown = function onKeyDown(e) {
      if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space') {
        onChange(e);
        e.preventDefault();
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focusFirstElement(elementRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focusFirstElement(elementRef.current);
      }
    });
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = TriStateCheckboxBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var checkIconProps = mergeProps({
      className: cx('checkIcon')
    }, ptm('checkIcon'));
    var uncheckIconProps = mergeProps({
      className: cx('checkIcon')
    }, ptm('uncheckIcon'));
    var icon;
    if (checkBoxValue === false) {
      icon = props.uncheckIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, uncheckIconProps);
    } else if (checkBoxValue === true) {
      icon = props.checkIcon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, checkIconProps);
    }
    var checkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, checkIconProps), {
      props: props
    });
    var ariaValueLabel = checkBoxValue ? api.ariaLabel('trueLabel') : checkBoxValue === false ? api.ariaLabel('falseLabel') : api.ariaLabel('nullLabel');
    var ariaChecked = checkBoxValue ? 'true' : 'false';
    var boxProps = mergeProps(_objectSpread({
      className: cx('box'),
      tabIndex: props.disabled ? '-1' : props.tabIndex,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      role: 'checkbox',
      'aria-checked': ariaChecked
    }, ariaProps), ptm('box'));
    var srOnlyAriaProps = mergeProps({
      className: 'p-hidden-accessible',
      'aria-live': 'polite'
    }, ptm('srOnlyAria'));
    var rootProps = mergeProps({
      className: utils.classNames(props.className, cx('root', {
        context: context
      })),
      style: props.style,
      'data-p-disabled': props.disabled
    }, TriStateCheckboxBase.getOtherProps(props), ptm('root'));
    var inputProps = mergeProps({
      id: props.inputId,
      className: cx('input'),
      type: 'checkbox',
      'aria-invalid': props.invalid,
      disabled: props.disabled,
      readOnly: props.readOnly,
      value: checkBoxValue,
      checked: checkBoxValue,
      onChange: onChange
    }, ptm('input'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef
    }, rootProps), /*#__PURE__*/React__namespace.createElement("input", inputProps), /*#__PURE__*/React__namespace.createElement("span", srOnlyAriaProps, ariaValueLabel), /*#__PURE__*/React__namespace.createElement("div", boxProps, checkIcon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  TriStateCheckbox.displayName = 'TriStateCheckbox';

  exports.TriStateCheckbox = TriStateCheckbox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.icons.check, primereact.icons.times, primereact.tooltip, primereact.utils);
