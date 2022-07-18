import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

function _defineProperty(obj, key, value) {
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

function _extends() {
  _extends = Object.assign || function (target) {
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ProgressBar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);

  var createLabel = function createLabel() {
    if (props.showValue && props.value != null) {
      var label = props.displayValueTemplate ? props.displayValueTemplate(props.value) : props.value + props.unit;
      return /*#__PURE__*/React.createElement("div", {
        className: "p-progressbar-label"
      }, label);
    }

    return null;
  };

  var createDeterminate = function createDeterminate() {
    var otherProps = ObjectUtils.findDiffKeys(props, ProgressBar.defaultProps);
    var className = classNames('p-progressbar p-component p-progressbar-determinate', props.className);
    var label = createLabel();
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "progressbar",
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      "aria-valuemin": "0",
      "aria-valuenow": props.value,
      "aria-valuemax": "100"
    }, otherProps), /*#__PURE__*/React.createElement("div", {
      className: "p-progressbar-value p-progressbar-value-animate",
      style: {
        width: props.value + '%',
        display: 'block',
        backgroundColor: props.color
      }
    }), label);
  };

  var createIndeterminate = function createIndeterminate() {
    var otherProps = ObjectUtils.findDiffKeys(props, ProgressBar.defaultProps);
    var className = classNames('p-progressbar p-component p-progressbar-indeterminate', props.className);
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "progressbar",
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React.createElement("div", {
      className: "p-progressbar-indeterminate-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-progressbar-value p-progressbar-value-animate",
      style: {
        backgroundColor: props.color
      }
    })));
  };

  React.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  if (props.mode === 'determinate') return createDeterminate();else if (props.mode === 'indeterminate') return createIndeterminate();else throw new Error(props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
}));
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = {
  __TYPE: 'ProgressBar',
  id: null,
  value: null,
  showValue: true,
  unit: '%',
  style: null,
  className: null,
  mode: 'determinate',
  displayValueTemplate: null,
  color: null
};

export { ProgressBar };
