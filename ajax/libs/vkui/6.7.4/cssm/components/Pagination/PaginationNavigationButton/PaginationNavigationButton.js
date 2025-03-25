import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from '../../Button/Button';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
/**
 * @private
 */ const getButtonPropsFromPaginationNavigationButton = (opts)=>{
    const icon = opts.style !== 'caption' ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: opts.a11yLabel
            }),
            /*#__PURE__*/ _jsx(opts.Icon, {})
        ]
    }) : null;
    const caption = opts.style === 'caption' ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: opts.a11yLabel
            }),
            /*#__PURE__*/ _jsx("span", {
                "aria-hidden": "true",
                children: opts.caption
            })
        ]
    }) : opts.style !== 'icon' ? /*#__PURE__*/ _jsx("span", {
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
/**
 * @private
 */ export const PaginationNavigationButton = ({ renderNavigationButton, ...restProps })=>{
    const buttonProps = getButtonPropsFromPaginationNavigationButton(restProps);
    if (typeof renderNavigationButton === 'function') {
        return renderNavigationButton(buttonProps);
    }
    return /*#__PURE__*/ _jsx(Button, {
        ...buttonProps
    });
};

//# sourceMappingURL=PaginationNavigationButton.js.map