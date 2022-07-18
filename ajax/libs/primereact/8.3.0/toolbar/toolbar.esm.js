import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Toolbar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
  var otherProps = ObjectUtils.findDiffKeys(props, Toolbar.defaultProps);
  var toolbarClass = classNames('p-toolbar p-component', props.className);
  var left = ObjectUtils.getJSXElement(props.left, props);
  var right = ObjectUtils.getJSXElement(props.right, props);
  React.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: toolbarClass,
    style: props.style,
    role: "toolbar"
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-left"
  }, left), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-right"
  }, right));
}));
Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
  __TYPE: 'Toolbar',
  id: null,
  style: null,
  className: null,
  left: null,
  right: null
};

export { Toolbar };
