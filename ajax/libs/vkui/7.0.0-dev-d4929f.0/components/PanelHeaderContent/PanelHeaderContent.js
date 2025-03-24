'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Text } from "../Typography/Text/Text.js";
const platformClassNames = {
    ios: "PanelHeaderContent__ios--JjX9A",
    android: "PanelHeaderContent__android--tqRRJ",
    vkcom: "PanelHeaderContent__vkcom--dcrMZ"
};
const sizeYClassNames = {
    none: "PanelHeaderContent__sizeYNone--mD3-W",
    compact: "PanelHeaderContent__sizeYCompact--XL3m-"
};
const PanelHeaderChildren = ({ hasSubtitle, hasBefore, children })=>{
    const platform = usePlatform();
    return hasSubtitle || hasBefore ? /*#__PURE__*/ _jsx(Text, {
        className: "PanelHeaderContent__childrenText--HgLJC",
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined,
        children: children
    }) : /*#__PURE__*/ _jsx("div", {
        className: "PanelHeaderContent__childrenIn--BX9-J",
        children: children
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */ export const PanelHeaderContent = (_param)=>{
    var { aside, subtitle, before, children, onClick } = _param, restProps = _object_without_properties(_param, [
        "aside",
        "subtitle",
        "before",
        "children",
        "onClick"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const InComponent = onClick ? Tappable : 'div';
    const rootProps = onClick ? {} : restProps;
    const platform = usePlatform();
    const inProps = onClick ? _object_spread_props(_object_spread({}, restProps), {
        onClick,
        activeEffectDelay: 200,
        hasActive: platform === 'ios',
        activeMode: 'opacity'
    }) : {};
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, rootProps), {
        baseClassName: classNames("PanelHeaderContent__host--bbeVQ", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: "PanelHeaderContent__before--DiXNM",
                children: before
            }),
            /*#__PURE__*/ _jsxs(InComponent, _object_spread_props(_object_spread({}, inProps), {
                className: classNames("PanelHeaderContent__in--S4E9v", !before && platform !== 'android' && "PanelHeaderContent__inCentered--UZ-Nd"),
                children: [
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Footnote, {
                        className: "PanelHeaderContent__subtitle--Fx0-g",
                        children: subtitle
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "PanelHeaderContent__children--YeTxK",
                        children: [
                            /*#__PURE__*/ _jsx(PanelHeaderChildren, {
                                hasSubtitle: hasReactNode(subtitle),
                                hasBefore: hasReactNode(before),
                                children: children
                            }),
                            hasReactNode(aside) && /*#__PURE__*/ _jsx("div", {
                                className: "PanelHeaderContent__aside--4qaW5",
                                children: aside
                            })
                        ]
                    }),
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: "PanelHeaderContent__width---4-lF"
                    })
                ]
            }))
        ]
    }));
};

//# sourceMappingURL=PanelHeaderContent.js.map