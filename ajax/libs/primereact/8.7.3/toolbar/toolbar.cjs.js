'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
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

var Toolbar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, Toolbar.defaultProps);
  var toolbarClass = utils.classNames('p-toolbar p-component', props.className);
  var left = utils.ObjectUtils.getJSXElement(props.left, props);
  var right = utils.ObjectUtils.getJSXElement(props.right, props);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: toolbarClass,
    style: props.style,
    role: "toolbar"
  }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-toolbar-group-left"
  }, left), /*#__PURE__*/React__namespace.createElement("div", {
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

exports.Toolbar = Toolbar;
