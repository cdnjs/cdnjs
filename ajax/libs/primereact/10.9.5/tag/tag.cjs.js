'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
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

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

var classes = {
  value: 'p-tag-value',
  icon: 'p-tag-icon',
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames('p-tag p-component', _defineProperty(_defineProperty({}, "p-tag-".concat(props.severity), props.severity !== null), 'p-tag-rounded', props.rounded));
  }
};
var styles = "\n@layer primereact {\n    .p-tag {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-tag-icon,\n    .p-tag-value,\n    .p-tag-icon.pi {\n        line-height: 1.5;\n    }\n    \n    .p-tag.p-tag-rounded {\n        border-radius: 10rem;\n    }\n}\n";
var TagBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Tag',
    value: null,
    severity: null,
    rounded: false,
    icon: null,
    style: null,
    className: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Tag = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = TagBase.getProps(inProps, context);
  var _TagBase$setMetaData = TagBase.setMetaData({
      props: props
    }),
    ptm = _TagBase$setMetaData.ptm,
    cx = _TagBase$setMetaData.cx,
    isUnstyled = _TagBase$setMetaData.isUnstyled;
  componentbase.useHandleStyle(TagBase.css.styles, isUnstyled, {
    name: 'tag'
  });
  var elementRef = React__namespace.useRef(null);
  var iconProps = mergeProps({
    className: cx('icon')
  }, ptm('icon'));
  var icon = utils.IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
    props: props
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    ref: elementRef,
    className: utils.classNames(props.className, cx('root')),
    style: props.style
  }, TagBase.getOtherProps(props), ptm('root'));
  var valueProps = mergeProps({
    className: cx('value')
  }, ptm('value'));
  return /*#__PURE__*/React__namespace.createElement("span", rootProps, icon, /*#__PURE__*/React__namespace.createElement("span", valueProps, props.value), /*#__PURE__*/React__namespace.createElement("span", null, props.children));
});
Tag.displayName = 'Tag';

exports.Tag = Tag;
