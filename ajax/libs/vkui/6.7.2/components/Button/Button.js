import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { Spinner } from '../Spinner/Spinner';
import { Tappable } from '../Tappable/Tappable';
const stylesSize = {
    s: "vkuiButton--size-s",
    m: "vkuiButton--size-m",
    l: "vkuiButton--size-l"
};
const stylesMode = {
    primary: "vkuiButton--mode-primary",
    secondary: "vkuiButton--mode-secondary",
    tertiary: "vkuiButton--mode-tertiary",
    outline: "vkuiButton--mode-outline",
    link: "vkuiButton--mode-link"
};
const stylesAppearance = {
    'accent': "vkuiButton--appearance-accent",
    'positive': "vkuiButton--appearance-positive",
    'negative': "vkuiButton--appearance-negative",
    'neutral': "vkuiButton--appearance-neutral",
    'overlay': "vkuiButton--appearance-overlay",
    'accent-invariable': "vkuiButton--appearance-accent-invariable"
};
const stylesAlign = {
    left: "vkuiButton--align-left",
    center: "vkuiButton--align-center",
    right: "vkuiButton--align-right"
};
const sizeYClassNames = {
    none: "vkuiButton--sizeY-none",
    regular: "vkuiButton--sizeY-regular"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */ export const Button = (_param)=>{
    var { size = 's', mode = 'primary', appearance = 'accent', stretched = false, align = 'center', children, before, after, getRootRef, loading, onClick, className, disableSpinnerAnimation, rounded } = _param, restProps = _object_without_properties(_param, [
        "size",
        "mode",
        "appearance",
        "stretched",
        "align",
        "children",
        "before",
        "after",
        "getRootRef",
        "loading",
        "onClick",
        "className",
        "disableSpinnerAnimation",
        "rounded"
    ]);
    const hasIcons = Boolean(before || after);
    const hasIconOnly = !children && Boolean(after) !== Boolean(before);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        hoverMode: "vkuiButton--hover",
        activeMode: "vkuiButton--active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside"
    }, restProps), {
        onClick: loading ? undefined : onClick,
        className: classNames(className, "vkuiButton", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading", rounded && "vkuiButton--rounded"),
        getRootRef: getRootRef,
        children: [
            loading && /*#__PURE__*/ _jsx(Spinner, {
                size: "small",
                className: "vkuiButton__spinner",
                disableAnimation: disableSpinnerAnimation
            }),
            /*#__PURE__*/ _jsxs("span", {
                className: "vkuiButton__in",
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                        className: "vkuiButton__before",
                        role: "presentation",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined,
                        children: before
                    }),
                    hasReactNode(children) && /*#__PURE__*/ _jsx("span", {
                        className: "vkuiButton__content",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined,
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                        className: "vkuiButton__after",
                        role: "presentation",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'after' : undefined,
                        children: after
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=Button.js.map