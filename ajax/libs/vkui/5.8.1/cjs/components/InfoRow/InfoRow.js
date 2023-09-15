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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var InfoRow = function(_param) /*#__PURE__*/ {
    var header = _param.header, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "header",
        "children",
        "className"
    ]);
    return _react.createElement(_Headline.Headline, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "span",
        className: (0, _vkjs.classNames)("vkuiInfoRow", className),
        weight: "3"
    }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        Component: "strong",
        className: "vkuiInfoRow__header"
    }, header, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, "\xa0")), children);
};

//# sourceMappingURL=InfoRow.js.map