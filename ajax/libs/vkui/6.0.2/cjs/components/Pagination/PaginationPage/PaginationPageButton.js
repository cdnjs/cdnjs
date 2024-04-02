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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../../Tappable/Tappable");
const _Text = require("../../Typography/Text/Text");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const _utils = require("../utils");
const _usePaginationPageClasses = require("./usePaginationPageClasses");
const PaginationPageButton = (_param)=>{
    var { isCurrent = false, getPageLabel = _utils.getPageLabelDefault, children, className, disabled } = _param, restProps = _object_without_properties._(_param, [
        "isCurrent",
        "getPageLabel",
        "children",
        "className",
        "disabled"
    ]);
    const paginationClassNames = (0, _usePaginationPageClasses.usePaginationPageClassNames)({
        isCurrent,
        disabled
    });
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)(paginationClassNames, className),
        activeMode: "vkuiPaginationPage--state-active",
        hoverMode: "vkuiPaginationPage--state-hover",
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        disabled: disabled
    }, restProps), /*#__PURE__*/ _react.createElement(_Text.Text, {
        normalize: false
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, getPageLabel(isCurrent), " "), children));
};

//# sourceMappingURL=PaginationPageButton.js.map