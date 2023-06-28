"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokensClassProvider", {
    enumerable: true,
    get: function() {
        return TokensClassProvider;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _generateVKUITokensClassName = require("../helpers/generateVKUITokensClassName");
var TokensClassProvider = function(param) {
    var children = param.children, platform = param.platform, appearance = param.appearance;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, _react.Children.map(children, function(child) {
        if (/*#__PURE__*/ _react.isValidElement(child)) {
            return /*#__PURE__*/ _react.cloneElement(child, {
                className: (0, _vkjs.classNames)(child.props.className, (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance))
            });
        }
        return child;
    }));
};

//# sourceMappingURL=tokensClassProvider.js.map