import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import styles from './PanelHeaderContent.module.css';
const platformClassNames = {
    ios: styles['PanelHeaderContent--ios'],
    android: styles['PanelHeaderContent--android'],
    vkcom: styles['PanelHeaderContent--vkcom']
};
const sizeYClassNames = {
    none: styles['PanelHeaderContent--sizeY-none'],
    compact: styles['PanelHeaderContent--sizeY-compact']
};
const PanelHeaderChildren = ({ hasStatus, hasBefore, children })=>{
    const platform = usePlatform();
    return hasStatus || hasBefore ? /*#__PURE__*/ _jsx(Text, {
        className: styles['PanelHeaderContent__childrenText'],
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined,
        children: children
    }) : /*#__PURE__*/ _jsx("div", {
        className: styles['PanelHeaderContent__children-in'],
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
        baseClassName: classNames(styles['PanelHeaderContent'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles['PanelHeaderContent__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs(InComponent, {
                ...inProps,
                className: classNames(styles['PanelHeaderContent__in'], !before && platform !== 'android' && styles['PanelHeaderContent__in--centered']),
                children: [
                    hasReactNode(status) && /*#__PURE__*/ _jsx(Footnote, {
                        className: styles['PanelHeaderContent__status'],
                        children: status
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['PanelHeaderContent__children'],
                        children: [
                            /*#__PURE__*/ _jsx(PanelHeaderChildren, {
                                hasStatus: hasReactNode(status),
                                hasBefore: hasReactNode(before),
                                children: children
                            }),
                            hasReactNode(aside) && /*#__PURE__*/ _jsx("div", {
                                className: styles['PanelHeaderContent__aside'],
                                children: aside
                            })
                        ]
                    }),
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: styles['PanelHeaderContent__width']
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=PanelHeaderContent.js.map