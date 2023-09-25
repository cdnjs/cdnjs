"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginationPageButton", {
    enumerable: true,
    get: function() {
        return PaginationPageButton;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../../Tappable/Tappable");
var _Text = require("../../Typography/Text/Text");
var _utils = require("../utils");
var _usePaginationPageClasses = require("./usePaginationPageClasses");
var PaginationPageButton = function(_param) {
    var _param_isCurrent = _param.isCurrent, isCurrent = _param_isCurrent === void 0 ? false : _param_isCurrent, _param_getPageAriaLabel = _param.getPageAriaLabel, getPageAriaLabel = _param_getPageAriaLabel === void 0 ? _utils.getPageAriaLabelDefault : _param_getPageAriaLabel, children = _param.children, className = _param.className, disabled = _param.disabled, restProps = _object_without_properties._(_param, [
        "isCurrent",
        "getPageAriaLabel",
        "children",
        "className",
        "disabled"
    ]);
    var paginationClassNames = (0, _usePaginationPageClasses.usePaginationPageClassNames)({
        isCurrent: isCurrent,
        disabled: disabled
    });
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)(paginationClassNames, className),
        activeMode: "vkuiPaginationPage--state-active",
        hoverMode: "vkuiPaginationPage--state-hover",
        hasActive: !isCurrent,
        hasHover: !isCurrent,
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        "aria-label": getPageAriaLabel(children, isCurrent),
        disabled: disabled
    }, restProps), /*#__PURE__*/ _react.createElement(_Text.Text, {
        normalize: false
    }, children));
};

//# sourceMappingURL=PaginationPageButton.js.map