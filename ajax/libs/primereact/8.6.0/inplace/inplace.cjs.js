'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var button = require('primereact/button');
var utils = require('primereact/utils');

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
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

var InplaceDisplay = function InplaceDisplay(props) {
  return props.children;
};
var InplaceContent = function InplaceContent(props) {
  return props.children;
};
var Inplace = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(props.active),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeState = _React$useState2[0],
      setActiveState = _React$useState2[1];

  var elementRef = React__namespace.useRef(null);
  var active = props.onToggle ? props.active : activeState;

  var shouldUseInplaceContent = function shouldUseInplaceContent(child) {
    return child && child.props.__TYPE === 'InplaceContent';
  };

  var shouldUseInplaceDisplay = function shouldUseInplaceDisplay(child) {
    return child && child.props.__TYPE === 'InplaceDisplay';
  };

  var open = function open(event) {
    if (props.disabled) {
      return;
    }

    props.onOpen && props.onOpen(event);

    if (props.onToggle) {
      props.onToggle({
        originalEvent: event,
        value: true
      });
    } else {
      setActiveState(true);
    }
  };

  var close = function close(event) {
    props.onClose && props.onClose(event);

    if (props.onToggle) {
      props.onToggle({
        originalEvent: event,
        value: false
      });
    } else {
      setActiveState(false);
    }
  };

  var onDisplayKeyDown = function onDisplayKeyDown(event) {
    if (event.key === 'Enter') {
      open(event);
      event.preventDefault();
    }
  };

  var createDisplay = function createDisplay(content) {
    var otherProps = utils.ObjectUtils.findDiffKeys(content.props, InplaceDisplay.defaultProps);
    var className = utils.classNames('p-inplace-display', {
      'p-disabled': props.disabled
    });
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      className: className
    }, otherProps, {
      onClick: open,
      onKeyDown: onDisplayKeyDown,
      tabIndex: props.tabIndex,
      "aria-label": props.ariaLabel
    }), content);
  };

  var createCloseButton = function createCloseButton() {
    if (props.closable) {
      return /*#__PURE__*/React__namespace.createElement(button.Button, {
        type: "button",
        className: "p-inplace-content-close",
        icon: "pi pi-times",
        onClick: close,
        "aria-label": api.localeOption('close')
      });
    }

    return null;
  };

  var createContent = function createContent(content) {
    var otherProps = utils.ObjectUtils.findDiffKeys(content.props, InplaceContent.defaultProps);
    var closeButton = createCloseButton();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      className: "p-inplace-content"
    }, otherProps), content, closeButton);
  };

  var createChildren = function createChildren() {
    return React__namespace.Children.map(props.children, function (child) {
      if (active && shouldUseInplaceContent(child)) {
        return createContent(child);
      } else if (!active && shouldUseInplaceDisplay(child)) {
        return createDisplay(child);
      }
    });
  };

  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = utils.ObjectUtils.findDiffKeys(props, Inplace.defaultProps);
  var children = createChildren();
  var className = utils.classNames('p-inplace p-component', {
    'p-inplace-closable': props.closable
  }, props.className);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    className: className
  }, otherProps), children);
});
InplaceDisplay.displayName = 'InplaceDisplay';
InplaceDisplay.defaultProps = {
  __TYPE: 'InplaceDisplay'
};
InplaceContent.displayName = 'InplaceContent';
InplaceContent.defaultProps = {
  __TYPE: 'InplaceContent'
};
Inplace.displayName = 'Inplace';
Inplace.defaultProps = {
  __TYPE: 'Inplace',
  style: null,
  className: null,
  active: false,
  closable: false,
  disabled: false,
  tabIndex: 0,
  ariaLabel: null,
  onOpen: null,
  onClose: null,
  onToggle: null
};

exports.Inplace = Inplace;
exports.InplaceContent = InplaceContent;
exports.InplaceDisplay = InplaceDisplay;
