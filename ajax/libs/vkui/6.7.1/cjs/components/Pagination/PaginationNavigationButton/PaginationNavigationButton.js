"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginationNavigationButton", {
    enumerable: true,
    get: function() {
        return PaginationNavigationButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _Button = require("../../Button/Button");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
/**
 * @private
 */ const getButtonPropsFromPaginationNavigationButton = (opts)=>{
    const icon = opts.style !== 'caption' ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                children: opts.a11yLabel
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(opts.Icon, {})
        ]
    }) : null;
    const caption = opts.style === 'caption' ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                children: opts.a11yLabel
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                "aria-hidden": "true",
                children: opts.caption
            })
        ]
    }) : opts.style !== 'icon' ? /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
        "aria-hidden": "true",
        children: opts.caption
    }) : null;
    return {
        'size': 'l',
        'before': opts.type === 'prev' ? icon : null,
        'after': opts.type === 'next' ? icon : null,
        'appearance': opts.style === 'caption' ? 'neutral' : 'accent',
        'mode': 'tertiary',
        'disabled': opts.disabled,
        'onClick': opts.onClick,
        'children': caption,
        'data-page': opts['data-page']
    };
};
const PaginationNavigationButton = (_param)=>{
    var { renderNavigationButton } = _param, restProps = _object_without_properties._(_param, [
        "renderNavigationButton"
    ]);
    const buttonProps = getButtonPropsFromPaginationNavigationButton(restProps);
    if (typeof renderNavigationButton === 'function') {
        return renderNavigationButton(buttonProps);
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Button.Button, _object_spread._({}, buttonProps));
};

//# sourceMappingURL=PaginationNavigationButton.js.map