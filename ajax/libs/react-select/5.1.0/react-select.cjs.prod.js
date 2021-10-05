"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _extends = require("@babel/runtime/helpers/extends"), React = require("react"), base_dist_reactSelect = require("./Select-72c224ed.cjs.prod.js"), useStateManager = require("./useStateManager-2d9c84be.cjs.prod.js"), _classCallCheck = require("@babel/runtime/helpers/classCallCheck"), _createClass = require("@babel/runtime/helpers/createClass"), _inherits = require("@babel/runtime/helpers/inherits"), index = require("./index-bbe8c082.cjs.prod.js"), react = require("@emotion/react"), createCache = require("@emotion/cache"), memoizeOne = require("memoize-one");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/objectWithoutProperties"), 
require("@babel/runtime/helpers/slicedToArray"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/defineProperty"), 
require("react-dom");

var _extends__default = _interopDefault(_extends), React__default = _interopDefault(React), _classCallCheck__default = _interopDefault(_classCallCheck), _createClass__default = _interopDefault(_createClass), _inherits__default = _interopDefault(_inherits), createCache__default = _interopDefault(createCache), memoizeOne__default = _interopDefault(memoizeOne), StateManagedSelect = React__default.default.forwardRef((function(props, ref) {
  var baseSelectProps = useStateManager.useStateManager(props);
  return React__default.default.createElement(base_dist_reactSelect.Select, _extends__default.default({
    ref: ref
  }, baseSelectProps));
})), NonceProvider = function(_Component) {
  _inherits__default.default(NonceProvider, _Component);
  var _super = index._createSuper(NonceProvider);
  function NonceProvider(props) {
    var _this;
    return _classCallCheck__default.default(this, NonceProvider), (_this = _super.call(this, props)).createEmotionCache = function(nonce, key) {
      return createCache__default.default({
        nonce: nonce,
        key: key
      });
    }, _this.createEmotionCache = memoizeOne__default.default(_this.createEmotionCache), 
    _this;
  }
  return _createClass__default.default(NonceProvider, [ {
    key: "render",
    value: function() {
      var emotionCache = this.createEmotionCache(this.props.nonce, this.props.cacheKey);
      return React__default.default.createElement(react.CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  } ]), NonceProvider;
}(React.Component);

exports.createFilter = base_dist_reactSelect.createFilter, exports.defaultTheme = base_dist_reactSelect.defaultTheme, 
exports.mergeStyles = base_dist_reactSelect.mergeStyles, exports.components = index.components, 
exports.NonceProvider = NonceProvider, exports.default = StateManagedSelect;
