import * as React from 'react';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var Tag = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;
  var elementRef = React.useRef(null);
  var otherProps = ObjectUtils.findDiffKeys(props, Tag.defaultProps);
  var className = classNames('p-tag p-component', (_classNames = {}, _defineProperty(_classNames, "p-tag-".concat(props.severity), props.severity !== null), _defineProperty(_classNames, 'p-tag-rounded', props.rounded), _classNames), props.className);
  var icon = IconUtils.getJSXIcon(props.icon, {
    className: 'p-tag-icon'
  }, {
    props: props
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), icon, /*#__PURE__*/React.createElement("span", {
    className: "p-tag-value"
  }, props.value), /*#__PURE__*/React.createElement("span", null, props.children));
});
Tag.displayName = 'Tag';
Tag.defaultProps = {
  __TYPE: 'Tag',
  value: null,
  severity: null,
  rounded: false,
  icon: null,
  style: null,
  className: null
};

export { Tag };
