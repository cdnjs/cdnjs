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

var Divider = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var horizontal = props.layout === 'horizontal';
  var vertical = props.layout === 'vertical';
  var otherProps = utils.ObjectUtils.findDiffKeys(props, Divider.defaultProps);
  var className = utils.classNames("p-divider p-component p-divider-".concat(props.layout, " p-divider-").concat(props.type), {
    'p-divider-left': horizontal && (!props.align || props.align === 'left'),
    'p-divider-right': horizontal && props.align === 'right',
    'p-divider-center': horizontal && props.align === 'center' || vertical && (!props.align || props.align === 'center'),
    'p-divider-top': vertical && props.align === 'top',
    'p-divider-bottom': vertical && props.align === 'bottom'
  }, props.className);
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
    style: props.style,
    role: "separator"
  }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-divider-content"
  }, props.children));
});
Divider.displayName = 'Divider';
Divider.defaultProps = {
  __TYPE: 'Divider',
  align: null,
  layout: 'horizontal',
  type: 'solid',
  style: null,
  className: null
};

exports.Divider = Divider;
