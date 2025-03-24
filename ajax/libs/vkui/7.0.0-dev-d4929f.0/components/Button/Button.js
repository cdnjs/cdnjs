'use client';
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
    s: "Button__sizeS--3Dkyt",
    m: "Button__sizeM--ZTeBb",
    l: "Button__sizeL--EABEE"
};
const stylesMode = {
    primary: "Button__modePrimary--c-g-g",
    secondary: "Button__modeSecondary--C-xEG",
    tertiary: "Button__modeTertiary--HOglP",
    outline: "Button__modeOutline--oIePF",
    link: "Button__modeLink--k6ham"
};
const stylesAppearance = {
    'accent': "Button__appearanceAccent--8A-yh",
    'positive': "Button__appearancePositive--gRj6W",
    'negative': "Button__appearanceNegative--N5nZF",
    'neutral': "Button__appearanceNeutral--XRHTD",
    'overlay': "Button__appearanceOverlay--TrYzK",
    'accent-invariable': "Button__appearanceAccentInvariable--0ezO0"
};
const stylesAlign = {
    left: "Button__alignLeft--1Yn4S",
    right: "Button__alignRight--vFWsv"
};
const sizeYClassNames = {
    none: "Button__sizeYNone--sxld2",
    regular: "Button__sizeYRegular--Nh6PS"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */ export const Button = (_param)=>{
    var { size = 's', mode = 'primary', appearance = 'accent', stretched = false, align = 'center', children, before, after, getRootRef, loading, onClick, className, disableSpinnerAnimation, rounded, disabled } = _param, restProps = _object_without_properties(_param, [
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
        "rounded",
        "disabled"
    ]);
    const hasIconOnly = !children && Boolean(after) !== Boolean(before);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        hoverMode: "Button__hover--LqgJX",
        activeMode: "Button__active--kv7U7",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        disabled: loading || disabled
    }, restProps), {
        onClick: loading ? undefined : onClick,
        className: classNames(className, "Button__host---UG3X", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], align !== 'center' && stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && "Button__ios--RDQ9O", stretched && "Button__stretched--rvNCZ", hasIconOnly && !stretched && "Button__singleIcon--OW9du", loading && "Button__loading--EQAt2", rounded && "Button__rounded--3BmEw", disabled && "Button__disabled--Tl9fh"),
        getRootRef: getRootRef,
        children: [
            loading && /*#__PURE__*/ _jsx(Spinner, {
                size: "s",
                className: "Button__spinner--ZExvW",
                disableAnimation: disableSpinnerAnimation,
                noColor: true
            }),
            /*#__PURE__*/ _jsxs("span", {
                className: "Button__in--eLI0n",
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                        className: "Button__before--120rq",
                        role: "presentation",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined,
                        children: before
                    }),
                    hasReactNode(children) && /*#__PURE__*/ _jsx("span", {
                        className: "Button__content--EKXmF",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined,
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                        className: "Button__after--605H2",
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