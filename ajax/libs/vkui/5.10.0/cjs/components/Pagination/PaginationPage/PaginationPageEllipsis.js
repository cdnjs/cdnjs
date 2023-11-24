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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Text = require("../../Typography/Text/Text");
var _usePaginationPageClasses = require("./usePaginationPageClasses");
var PaginationPageEllipsis = function(_param) {
    var className = _param.className, disabled = _param.disabled, restProps = _object_without_properties._(_param, [
        "className",
        "disabled"
    ]);
    var paginationClassNames = (0, _usePaginationPageClasses.usePaginationPageClassNames)({
        isCurrent: false,
        disabled: disabled
    });
    return /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
        className: (0, _vkjs.classNames)(paginationClassNames, "vkuiPaginationPage--type-ellipsis", className)
    }, restProps), "…");
};

//# sourceMappingURL=PaginationPageEllipsis.js.map