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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _generateVKUITokensClassName = require("../helpers/generateVKUITokensClassName");
const TokensClassProvider = ({ children, platform, appearance })=>{
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, _react.Children.map(children, (child)=>{
        if (/*#__PURE__*/ _react.isValidElement(child)) {
            return /*#__PURE__*/ _react.cloneElement(child, {
                className: (0, _vkjs.classNames)(child.props.className, (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance))
            });
        }
        return child;
    }));
};

//# sourceMappingURL=tokensClassProvider.js.map