import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Spinner } from "../Spinner/Spinner.js";
import { Tappable } from "../Tappable/Tappable.js";
const stylesSize = {
    s: "vkuiButton__sizeS",
    m: "vkuiButton__sizeM",
    l: "vkuiButton__sizeL"
};
const stylesMode = {
    primary: "vkuiButton__modePrimary",
    secondary: "vkuiButton__modeSecondary",
    tertiary: "vkuiButton__modeTertiary",
    outline: "vkuiButton__modeOutline",
    link: "vkuiButton__modeLink"
};
const stylesAppearance = {
    'accent': "vkuiButton__appearanceAccent",
    'positive': "vkuiButton__appearancePositive",
    'negative': "vkuiButton__appearanceNegative",
    'neutral': "vkuiButton__appearanceNeutral",
    'overlay': "vkuiButton__appearanceOverlay",
    'accent-invariable': "vkuiButton__appearanceAccentInvariable"
};
const stylesAlign = {
    left: "vkuiButton__alignLeft",
    center: "vkuiButton__alignCenter",
    right: "vkuiButton__alignRight"
};
const sizeYClassNames = {
    none: "vkuiButton__sizeYNone",
    regular: "vkuiButton__sizeYRegular"
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
        hoverMode: "vkuiButton__hover",
        activeMode: "vkuiButton__active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside"
    }, restProps), {
        onClick: loading ? undefined : onClick,
        className: classNames(className, "vkuiButton__host", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiButton__ios", stretched && "vkuiButton__stretched", hasIcons && "vkuiButton__withIcon", hasIconOnly && !stretched && "vkuiButton__singleIcon", loading && "vkuiButton__loading", rounded && "vkuiButton__rounded"),
        getRootRef: getRootRef,
        children: [
            loading && /*#__PURE__*/ _jsx(Spinner, {
                size: "s",
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