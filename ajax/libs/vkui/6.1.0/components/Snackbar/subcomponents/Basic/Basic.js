import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../../hooks/useAdaptivity';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { Paragraph } from '../../../Typography/Paragraph/Paragraph';
import { Subhead } from '../../../Typography/Subhead/Subhead';
const stylesLayout = {
    none: "vkuiSnackbar--layout-none",
    vertical: "vkuiSnackbar--layout-vertical",
    horizontal: "vkuiSnackbar--layout-horizontal"
};
const sizeYClassNames = {
    none: "vkuiSnackbar--sizeY-none",
    regular: "vkuiSnackbar--sizeY-regular"
};
export function Basic(_param) {
    var { layout: layoutProps, action, after, before, mode, subtitle, children } = _param, restProps = _object_without_properties(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const layout = after || subtitle ? 'vertical' : 'none';
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSnackbar__body", stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && "vkuiSnackbar--mode-dark"),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiSnackbar__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiSnackbar__content",
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: "vkuiSnackbar__content-text",
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ _jsx(Subhead, {
                        className: "vkuiSnackbar__content-subtitle",
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiSnackbar__action",
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ _jsx("div", {
                className: "vkuiSnackbar__after",
                children: after
            })
        ]
    }));
}

//# sourceMappingURL=Basic.js.map