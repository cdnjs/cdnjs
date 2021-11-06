'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useStateManager = require('./useStateManager-0234c6e5.cjs.dev.js');
var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var base_dist_reactSelect = require('./Select-29cf2afc.cjs.dev.js');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _inherits = require('@babel/runtime/helpers/inherits');
var index = require('./index-b950ee42.cjs.dev.js');
var react = require('@emotion/react');
var createCache = require('@emotion/cache');
var memoizeOne = require('memoize-one');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/toConsumableArray');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/typeof');
require('@babel/runtime/helpers/defineProperty');
require('react-dom');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefault(_extends);
var React__default = /*#__PURE__*/_interopDefault(React);
var _classCallCheck__default = /*#__PURE__*/_interopDefault(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefault(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefault(_inherits);
var createCache__default = /*#__PURE__*/_interopDefault(createCache);
var memoizeOne__default = /*#__PURE__*/_interopDefault(memoizeOne);

var StateManagedSelect = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var baseSelectProps = useStateManager.useStateManager(props);
  return /*#__PURE__*/React__default['default'].createElement(base_dist_reactSelect.Select, _extends__default['default']({
    ref: ref
  }, baseSelectProps));
});

var NonceProvider = /*#__PURE__*/function (_Component) {
  _inherits__default['default'](NonceProvider, _Component);

  var _super = index._createSuper(NonceProvider);

  function NonceProvider(props) {
    var _this;

    _classCallCheck__default['default'](this, NonceProvider);

    _this = _super.call(this, props);

    _this.createEmotionCache = function (nonce, key) {
      return createCache__default['default']({
        nonce: nonce,
        key: key
      });
    };

    _this.createEmotionCache = memoizeOne__default['default'](_this.createEmotionCache);
    return _this;
  }

  _createClass__default['default'](NonceProvider, [{
    key: "render",
    value: function render() {
      var emotionCache = this.createEmotionCache(this.props.nonce, this.props.cacheKey);
      return /*#__PURE__*/React__default['default'].createElement(react.CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  }]);

  return NonceProvider;
}(React.Component);

exports.useStateManager = useStateManager.useStateManager;
exports.createFilter = base_dist_reactSelect.createFilter;
exports.defaultTheme = base_dist_reactSelect.defaultTheme;
exports.mergeStyles = base_dist_reactSelect.mergeStyles;
exports.components = index.components;
exports.NonceProvider = NonceProvider;
exports.default = StateManagedSelect;
