import * as React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames } from 'primereact/utils';

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

var RadioButtonBase = {
  defaultProps: {
    __TYPE: 'RadioButton',
    id: null,
    inputRef: null,
    inputId: null,
    name: null,
    value: null,
    checked: false,
    style: null,
    className: null,
    disabled: false,
    required: false,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, RadioButtonBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, RadioButtonBase.defaultProps);
  }
};

var RadioButton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = RadioButtonBase.getProps(inProps);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var select = function select(e) {
    onClick(e);
  };
  var onClick = function onClick(e) {
    if (!props.disabled && props.onChange) {
      var checked = props.checked;
      var radioClicked = e.target instanceof HTMLDivElement;
      var inputClicked = e.target === inputRef.current;
      var isInputToggled = inputClicked && e.target.checked !== checked;
      var isRadioToggled = radioClicked && (DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
      if (isInputToggled || isRadioToggled) {
        var value = !checked;
        props.onChange({
          originalEvent: e,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            type: 'radio',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        });
        if (isRadioToggled) {
          inputRef.current.checked = value;
        }
      }
      DomHandler.focus(inputRef.current);
      e.preventDefault();
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space' || event.key === ' ') {
      // event.key is for Android support
      onClick(event);
    }
  };
  React.useEffect(function () {
    if (inputRef.current) {
      inputRef.current.checked = props.checked;
    }
  }, [props.checked]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      select: select,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = RadioButtonBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-radiobutton p-component', {
    'p-radiobutton-checked': props.checked,
    'p-radiobutton-disabled': props.disabled,
    'p-radiobutton-focused': focusedState
  }, props.className);
  var boxClassName = classNames('p-radiobutton-box', {
    'p-highlight': props.checked,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef,
    id: props.inputId,
    type: "radio",
    name: props.name,
    defaultChecked: props.checked,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    disabled: props.disabled,
    required: props.required,
    tabIndex: props.tabIndex
  }, ariaProps))), /*#__PURE__*/React.createElement("div", {
    className: boxClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-radiobutton-icon"
  }))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
RadioButton.displayName = 'RadioButton';

export { RadioButton };
