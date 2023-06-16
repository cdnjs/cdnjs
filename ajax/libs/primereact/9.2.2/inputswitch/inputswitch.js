this.primereact = this.primereact || {};
this.primereact.inputswitch = (function (exports, React, tooltip, utils) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var InputSwitchBase = {
    defaultProps: {
      __TYPE: 'InputSwitch',
      checked: false,
      className: null,
      disabled: false,
      falseValue: false,
      id: null,
      inputId: null,
      inputRef: null,
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
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, InputSwitchBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, InputSwitchBase.defaultProps);
    }
  };

  var InputSwitch = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = InputSwitchBase.getProps(inProps);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var checked = props.checked === props.trueValue;
    var onClick = function onClick(event) {
      if (props.disabled) {
        return;
      }
      toggle(event);
      utils.DomHandler.focus(inputRef.current);
      event.preventDefault();
    };
    var toggle = function toggle(event) {
      if (props.onChange) {
        var value = checked ? props.falseValue : props.trueValue;
        props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };
    var onFocus = function onFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };
    var onBlur = function onBlur(event) {
      setFocusedState(false);
      props.onBlur && props.onBlur(event);
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
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputSwitchBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-inputswitch p-component', {
      'p-inputswitch-checked': checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    }, props.className);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick,
      role: "checkbox",
      "aria-checked": checked
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef,
      type: "checkbox",
      id: props.inputId,
      name: props.name,
      checked: checked,
      onChange: toggle,
      onFocus: onFocus,
      onBlur: onBlur,
      disabled: props.disabled,
      role: "switch",
      tabIndex: props.tabIndex,
      "aria-checked": checked
    }, ariaProps))), /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-inputswitch-slider"
    })), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  InputSwitch.displayName = 'InputSwitch';

  exports.InputSwitch = InputSwitch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.tooltip, primereact.utils);
