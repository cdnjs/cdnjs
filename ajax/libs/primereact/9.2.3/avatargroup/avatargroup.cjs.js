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

var AvatarGroupBase = {
  defaultProps: {
    __TYPE: 'AvatarGroup',
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, AvatarGroupBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, AvatarGroupBase.defaultProps);
  }
};

var AvatarGroup = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = AvatarGroupBase.getProps(inProps);
  var elementRef = React__namespace.useRef(null);
  var otherProps = AvatarGroupBase.getOtherProps(props);
  var className = utils.classNames('p-avatar-group p-component', props.className);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), props.children);
});
AvatarGroup.displayName = 'AvatarGroup';

exports.AvatarGroup = AvatarGroup;
