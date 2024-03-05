"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InfoRow", {
    enumerable: true,
    get: function() {
        return InfoRow;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Headline = require("../Typography/Headline/Headline");
const _Subhead = require("../Typography/Subhead/Subhead");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const InfoRow = (_param)=>{
    var { header, children, className } = _param, restProps = _object_without_properties._(_param, [
        "header",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Headline.Headline, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "span",
        className: (0, _vkjs.classNames)("vkuiInfoRow", className),
        weight: "3"
    }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        Component: "strong",
        className: "vkuiInfoRow__header"
    }, header, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, " ")), children);
};

//# sourceMappingURL=InfoRow.js.map