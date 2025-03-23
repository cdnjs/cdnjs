"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginationPageEllipsis", {
    enumerable: true,
    get: function() {
        return PaginationPageEllipsis;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Text = require("../../Typography/Text/Text");
const _usePaginationPageClasses = require("./usePaginationPageClasses");
const PaginationPageEllipsis = (_param)=>{
    var { className, disabled } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "disabled"
    ]);
    const paginationClassNames = (0, _usePaginationPageClasses.usePaginationPageClassNames)({
        isCurrent: false,
        disabled
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)(paginationClassNames, "vkuiPaginationPage--type-ellipsis", className)
    }, restProps), {
        children: "…"
    }));
};

//# sourceMappingURL=PaginationPageEllipsis.js.map