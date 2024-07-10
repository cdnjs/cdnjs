import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
const platformClassNames = {
    ios: "vkuiPanelHeaderContent--ios",
    android: "vkuiPanelHeaderContent--android",
    vkcom: "vkuiPanelHeaderContent--vkcom"
};
const sizeYClassNames = {
    none: "vkuiPanelHeaderContent--sizeY-none",
    compact: "vkuiPanelHeaderContent--sizeY-compact"
};
const PanelHeaderChildren = ({ hasStatus, hasBefore, children })=>{
    const platform = usePlatform();
    return hasStatus || hasBefore ? /*#__PURE__*/ _jsx(Text, {
        className: "vkuiPanelHeaderContent__childrenText",
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined,
        children: children
    }) : /*#__PURE__*/ _jsx("div", {
        className: "vkuiPanelHeaderContent__children-in",
        children: children
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */ export const PanelHeaderContent = (_param)=>{
    var { aside, status, before, children, onClick } = _param, restProps = _object_without_properties(_param, [
        "aside",
        "status",
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
        baseClassName: classNames("vkuiPanelHeaderContent", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: "vkuiPanelHeaderContent__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs(InComponent, _object_spread_props(_object_spread({}, inProps), {
                className: classNames("vkuiPanelHeaderContent__in", !before && platform !== 'android' && "vkuiPanelHeaderContent__in--centered"),
                children: [
                    hasReactNode(status) && /*#__PURE__*/ _jsx(Footnote, {
                        className: "vkuiPanelHeaderContent__status",
                        children: status
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiPanelHeaderContent__children",
                        children: [
                            /*#__PURE__*/ _jsx(PanelHeaderChildren, {
                                hasStatus: hasReactNode(status),
                                hasBefore: hasReactNode(before),
                                children: children
                            }),
                            hasReactNode(aside) && /*#__PURE__*/ _jsx("div", {
                                className: "vkuiPanelHeaderContent__aside",
                                children: aside
                            })
                        ]
                    }),
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiPanelHeaderContent__width"
                    })
                ]
            }))
        ]
    }));
};

//# sourceMappingURL=PanelHeaderContent.js.map