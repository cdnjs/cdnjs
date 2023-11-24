import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Text } from '../Typography/Text/Text';
import styles from './PanelHeaderContent.module.css';
const platformClassNames = {
    ios: styles['PanelHeaderContent--ios'],
    android: styles['PanelHeaderContent--android'],
    vkcom: styles['PanelHeaderContent--vkcom']
};
const PanelHeaderChildren = ({ hasStatus, hasBefore, children })=>{
    const platform = usePlatform();
    if (platform === Platform.VKCOM) {
        return /*#__PURE__*/ React.createElement(Text, {
            className: styles['PanelHeaderContent__childrenText'],
            Component: "div",
            weight: "2"
        }, children);
    }
    return hasStatus || hasBefore ? /*#__PURE__*/ React.createElement(Headline, {
        className: styles['PanelHeaderContent__childrenText'],
        Component: "div",
        weight: "2"
    }, children) : /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__children-in']
    }, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */ export const PanelHeaderContent = ({ aside, status, before, children, onClick, ...restProps })=>{
    const InComponent = onClick ? Tappable : 'div';
    const rootProps = onClick ? {} : restProps;
    const platform = usePlatform();
    const inProps = onClick ? {
        ...restProps,
        onClick,
        activeEffectDelay: 200,
        hasActive: platform === Platform.IOS,
        activeMode: 'opacity'
    } : {};
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...rootProps,
        baseClassName: classNames(styles['PanelHeaderContent'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android)
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__before']
    }, before), /*#__PURE__*/ React.createElement(InComponent, {
        ...inProps,
        className: classNames(styles['PanelHeaderContent__in'], !before && platform !== Platform.ANDROID && styles['PanelHeaderContent__in--centered'])
    }, hasReactNode(status) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['PanelHeaderContent__status']
    }, status), /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__children']
    }, /*#__PURE__*/ React.createElement(PanelHeaderChildren, {
        hasStatus: hasReactNode(status),
        hasBefore: hasReactNode(before)
    }, children), hasReactNode(aside) && /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__aside']
    }, aside)), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__width']
    })));
};

//# sourceMappingURL=PanelHeaderContent.js.map