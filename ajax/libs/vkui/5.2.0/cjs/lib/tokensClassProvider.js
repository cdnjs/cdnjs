"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokensClassProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _generateVKUITokensClassName = require("../helpers/generateVKUITokensClassName");
var TokensClassProvider = function TokensClassProvider(_ref) {
  var children = _ref.children,
    platform = _ref.platform,
    appearance = _ref.appearance;
  return /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _vkjs.classNames)(child.props.className, (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance))
      });
    }
    return child;
  }));
};
exports.TokensClassProvider = TokensClassProvider;
//# sourceMappingURL=tokensClassProvider.js.map