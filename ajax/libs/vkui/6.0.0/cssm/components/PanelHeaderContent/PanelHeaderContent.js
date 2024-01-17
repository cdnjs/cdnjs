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
    return hasStatus || hasBefore ? /*#__PURE__*/ React.createElement(Text, {
        className: styles['PanelHeaderContent__childrenText'],
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined
    }, children) : /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__children-in']
    }, children);
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
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...rootProps,
        baseClassName: classNames(styles['PanelHeaderContent'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeaderContent__before']
    }, before), /*#__PURE__*/ React.createElement(InComponent, {
        ...inProps,
        className: classNames(styles['PanelHeaderContent__in'], !before && platform !== 'android' && styles['PanelHeaderContent__in--centered'])
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