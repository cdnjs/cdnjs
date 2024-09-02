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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../../Tappable/Tappable");
const _Text = require("../../Typography/Text/Text");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const _utils = require("../utils");
const _usePaginationPageClasses = require("./usePaginationPageClasses");
const getTappablePropsFromPaginationPage = (opts)=>{
    const { isCurrent = false, getPageLabel = _utils.getPageLabelDefault, children, className, disabled, sizeY } = opts, restProps = _object_without_properties._(opts, [
        "isCurrent",
        "getPageLabel",
        "children",
        "className",
        "disabled",
        "sizeY"
    ]);
    const pageClassNames = (0, _usePaginationPageClasses.getPaginationPageClassNames)({
        isCurrent,
        disabled,
        sizeY
    });
    return _object_spread._({
        'className': (0, _vkjs.classNames)(pageClassNames, className),
        'activeMode': "vkuiPaginationPage--state-active",
        'hoverMode': "vkuiPaginationPage--state-hover",
        'focusVisibleMode': 'outside',
        'aria-current': isCurrent ? true : undefined,
        'disabled': disabled,
        'children': /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Text.Text, {
            normalize: false,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_VisuallyHidden.VisuallyHidden, {
                    children: [
                        getPageLabel(isCurrent),
                        " "
                    ]
                }),
                children
            ]
        }),
        'data-page': children
    }, restProps);
};
const PaginationPageButton = (_param)=>{
    var { renderPageButton } = _param, restProps = _object_without_properties._(_param, [
        "renderPageButton"
    ]);
    const tappableProps = getTappablePropsFromPaginationPage(restProps);
    if (typeof renderPageButton === 'function') {
        return renderPageButton(tappableProps);
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, _object_spread._({}, tappableProps));
};

//# sourceMappingURL=PaginationPageButton.js.map