import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Text } from "../Typography/Text/Text.js";
import styles from "./PanelHeaderContent.module.css";
const platformClassNames = {
    ios: styles.ios,
    android: styles.android,
    vkcom: styles.vkcom
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const PanelHeaderChildren = ({ hasStatus, hasBefore, children })=>{
    const platform = usePlatform();
    return hasStatus || hasBefore ? /*#__PURE__*/ _jsx(Text, {
        className: styles.childrenText,
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined,
        children: children
    }) : /*#__PURE__*/ _jsx("div", {
        className: styles.childrenIn,
        children: children
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */ export const PanelHeaderContent = ({ aside, status, before, children, onClick, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const InComponent = onClick ? Tappable : 'div';
    const rootProps = onClick ? {} : restProps;
    const platform = usePlatform();
    const inProps = onClick ? {
        ...restProps,
        onClick,
        activeEffectDelay: 200,
        hasActive: platform === 'ios',
        activeMode: 'opacity'
    } : {};
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...rootProps,
        baseClassName: classNames(styles.host, platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs(InComponent, {
                ...inProps,
                className: classNames(styles.in, !before && platform !== 'android' && styles.inCentered),
                children: [
                    hasReactNode(status) && /*#__PURE__*/ _jsx(Footnote, {
                        className: styles.status,
                        children: status
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.children,
                        children: [
                            /*#__PURE__*/ _jsx(PanelHeaderChildren, {
                                hasStatus: hasReactNode(status),
                                hasBefore: hasReactNode(before),
                                children: children
                            }),
                            hasReactNode(aside) && /*#__PURE__*/ _jsx("div", {
                                className: styles.aside,
                                children: aside
                            })
                        ]
                    }),
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: styles.width
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=PanelHeaderContent.js.map