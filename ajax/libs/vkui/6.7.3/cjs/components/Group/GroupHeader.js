"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupHeader", {
    enumerable: true,
    get: function() {
        return GroupHeader;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const GroupHeader = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread._({
        className: (0, _vkjs.classNames)(className, "vkuiGroup__header")
    }, restProps));
};
GroupHeader.displayName = 'GroupHeader';

//# sourceMappingURL=GroupHeader.js.map