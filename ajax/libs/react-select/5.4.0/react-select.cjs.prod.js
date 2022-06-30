"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var useStateManager = require("./useStateManager-e7ac419f.cjs.prod.js"), _extends = require("@babel/runtime/helpers/extends"), React = require("react"), base_dist_reactSelect = require("./Select-0478e6f3.cjs.prod.js"), _classCallCheck = require("@babel/runtime/helpers/classCallCheck"), _createClass = require("@babel/runtime/helpers/createClass"), _inherits = require("@babel/runtime/helpers/inherits"), index = require("./index-3df9f8fb.cjs.prod.js"), react = require("@emotion/react"), createCache = require("@emotion/cache"), memoizeOne = require("memoize-one");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  return e && Object.keys(e).forEach((function(k) {
    if ("default" !== k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: !0,
        get: function() {
          return e[k];
        }
      });
    }
  })), n.default = e, Object.freeze(n);
}

require("@babel/runtime/helpers/slicedToArray"), require("@babel/runtime/helpers/objectWithoutProperties"), 
require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/defineProperty"), 
require("react-dom");

var _extends__default = _interopDefault(_extends), React__namespace = _interopNamespace(React), _classCallCheck__default = _interopDefault(_classCallCheck), _createClass__default = _interopDefault(_createClass), _inherits__default = _interopDefault(_inherits), createCache__default = _interopDefault(createCache), memoizeOne__default = _interopDefault(memoizeOne), StateManagedSelect = React.forwardRef((function(props, ref) {
  var baseSelectProps = useStateManager.useStateManager(props);
  return React__namespace.createElement(base_dist_reactSelect.Select, _extends__default.default({
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
      return React__namespace.createElement(react.CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  } ]), NonceProvider;
}(React.Component);

exports.useStateManager = useStateManager.useStateManager, exports.createFilter = base_dist_reactSelect.createFilter, 
exports.defaultTheme = base_dist_reactSelect.defaultTheme, exports.mergeStyles = base_dist_reactSelect.mergeStyles, 
exports.components = index.components, exports.NonceProvider = NonceProvider, exports.default = StateManagedSelect;
