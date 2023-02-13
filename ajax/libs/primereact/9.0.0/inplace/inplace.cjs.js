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

var InplaceDisplayBase = {
  defaultProps: {
    __TYPE: 'InplaceDisplay',
    children: undefined
  },
  getOtherProps: function getOtherProps(display) {
    return utils.ObjectUtils.getComponentDiffProps(display, InplaceDisplayBase.defaultProps);
  }
};
var InplaceContentBase = {
  defaultProps: {
    __TYPE: 'InplaceContent',
    children: undefined
  },
  getOtherProps: function getOtherProps(content) {
    return utils.ObjectUtils.getComponentDiffProps(content, InplaceContentBase.defaultProps);
  }
};
var InplaceBase = {
  defaultProps: {
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
    onToggle: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, InplaceBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, InplaceBase.defaultProps);
  }
};

var InplaceDisplay = function InplaceDisplay(props) {
  return props.children;
};
var InplaceContent = function InplaceContent(props) {
  return props.children;
};
var Inplace = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = InplaceBase.getProps(inProps);
  var _React$useState = React__namespace.useState(props.active),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeState = _React$useState2[0],
    setActiveState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var active = props.onToggle ? props.active : activeState;
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
    var otherProps = InplaceDisplayBase.getOtherProps(content);
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
    var otherProps = InplaceContentBase.getOtherProps(content);
    var closeButton = createCloseButton();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      className: "p-inplace-content"
    }, otherProps), content, closeButton);
  };
  var createChildren = function createChildren() {
    var validChildTypes = ['InplaceContent', 'InplaceDisplay'];
    return React__namespace.Children.map(props.children, function (child) {
      if (active && utils.ObjectUtils.isValidChild(child, 'InplaceContent', validChildTypes)) {
        return createContent(child);
      } else if (!active && utils.ObjectUtils.isValidChild(child, 'InplaceDisplay', validChildTypes)) {
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
  var otherProps = InplaceBase.getOtherProps(props);
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
InplaceContent.displayName = 'InplaceContent';
Inplace.displayName = 'Inplace';

exports.Inplace = Inplace;
exports.InplaceContent = InplaceContent;
exports.InplaceDisplay = InplaceDisplay;
