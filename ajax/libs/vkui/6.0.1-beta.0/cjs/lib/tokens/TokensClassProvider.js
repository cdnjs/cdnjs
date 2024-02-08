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
const _useTokenClassName = require("./useTokenClassName");
const InjectTokenClassNameToChild = ({ children })=>{
    const tokensClassName = (0, _useTokenClassName.useTokensClassName)();
    return /*#__PURE__*/ _react.cloneElement(children, {
        className: (0, _vkjs.classNames)(tokensClassName, children.props.className)
    });
};
const TokensClassProvider = ({ children })=>{
    return _react.Children.map(children, (child)=>{
        if (/*#__PURE__*/ _react.isValidElement(child)) {
            return /*#__PURE__*/ _react.createElement(InjectTokenClassNameToChild, null, child);
        }
        return child;
    });
};

//# sourceMappingURL=TokensClassProvider.js.map