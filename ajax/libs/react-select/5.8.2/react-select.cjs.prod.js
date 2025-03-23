'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useStateManager = require('./useStateManager-ce23061c.cjs.prod.js');
var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var Select = require('./Select-36d15f93.cjs.prod.js');
var react = require('@emotion/react');
var createCache = require('@emotion/cache');
var index = require('./index-665c4ed8.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/createSuper');
require('@babel/runtime/helpers/toConsumableArray');
require('memoize-one');
require('@babel/runtime/helpers/typeof');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/defineProperty');
require('react-dom');
require('@floating-ui/dom');
require('use-isomorphic-layout-effect');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

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
var createCache__default = /*#__PURE__*/_interopDefault(createCache);

var StateManagedSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var baseSelectProps = useStateManager.useStateManager(props);
  return /*#__PURE__*/React__namespace.createElement(Select.Select, _extends({
    ref: ref
  }, baseSelectProps));
});
var StateManagedSelect$1 = StateManagedSelect;

var NonceProvider = (function (_ref) {
  var nonce = _ref.nonce,
    children = _ref.children,
    cacheKey = _ref.cacheKey;
  var emotionCache = React.useMemo(function () {
    return createCache__default["default"]({
      key: cacheKey,
      nonce: nonce
    });
  }, [cacheKey, nonce]);
  return /*#__PURE__*/React__namespace.createElement(react.CacheProvider, {
    value: emotionCache
  }, children);
});

exports.useStateManager = useStateManager.useStateManager;
exports.createFilter = Select.createFilter;
exports.defaultTheme = Select.defaultTheme;
exports.mergeStyles = Select.mergeStyles;
exports.components = index.components;
exports.NonceProvider = NonceProvider;
exports["default"] = StateManagedSelect$1;
