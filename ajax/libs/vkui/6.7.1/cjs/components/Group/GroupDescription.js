"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupDescription", {
    enumerable: true,
    get: function() {
        return GroupDescription;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Footnote = require("../Typography/Footnote/Footnote");
const GroupDescription = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, _object_spread._({
        className: (0, _vkjs.classNames)(className, "vkuiGroup__description")
    }, restProps));
};
GroupDescription.displayName = 'GroupDescription';

//# sourceMappingURL=GroupDescription.js.map