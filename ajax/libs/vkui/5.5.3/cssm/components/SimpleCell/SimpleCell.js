import * as React from 'react';
import { Icon24Chevron } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './SimpleCell.module.css';
const platformClassNames = {
    ios: classNames(styles['SimpleCell--ios'], 'vkuiInternalSimpleCell--ios'),
    android: styles['SimpleCell--android'],
    vkcom: styles['SimpleCell--vkcom']
};
const sizeYClassNames = {
    none: classNames(styles['SimpleCell--sizeY-none'], 'vkuiInternalSimpleCell--sizeY-none'),
    [SizeType.COMPACT]: classNames(styles['SimpleCell--sizeY-compact'], 'vkuiInternalSimpleCell--sizeY-compact'),
    [SizeType.REGULAR]: styles['SimpleCell--sizeY-regular']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = ({ badgeBeforeTitle , badgeAfterTitle , badgeBeforeSubtitle , badgeAfterSubtitle , before , indicator , children , after , expandable , multiline , subhead , subtitle , extraSubtitle , className , ...restProps })=>{
    const platform = usePlatform();
    const hasAfter = hasReactNode(after) || expandable && platform === Platform.IOS;
    const { sizeY ='none'  } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        className: classNames(styles['SimpleCell'], 'vkuiInternalSimpleCell', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeYClassNames[sizeY], multiline && styles['SimpleCell--mult'], className)
    }, before, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['SimpleCell__main'], 'vkuiInternalSimpleCell__main')
    }, subhead && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "span",
        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__subhead'])
    }, subhead), /*#__PURE__*/ React.createElement("div", {
        className: styles['SimpleCell__content']
    }, badgeBeforeTitle && /*#__PURE__*/ React.createElement("span", {
        className: styles['SimpleCell__badge']
    }, badgeBeforeTitle), /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        className: styles['SimpleCell__children'],
        weight: "3"
    }, children), hasReactNode(badgeAfterTitle) && /*#__PURE__*/ React.createElement("span", {
        className: styles['SimpleCell__badge']
    }, badgeAfterTitle)), subtitle && /*#__PURE__*/ React.createElement("div", {
        className: styles['SimpleCell__content']
    }, badgeBeforeSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: styles['SimpleCell__badge']
    }, badgeBeforeSubtitle), /*#__PURE__*/ React.createElement(Footnote, {
        normalize: false,
        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__subtitle'])
    }, subtitle), badgeAfterSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: styles['SimpleCell__badge']
    }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/ React.createElement(Footnote, {
        normalize: false,
        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__extraSubtitle'])
    }, extraSubtitle)), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        weight: "3",
        className: styles['SimpleCell__indicator']
    }, indicator), hasAfter && /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['SimpleCell__after'], 'vkuiInternalSimpleCell__after')
    }, after, expandable && platform === Platform.IOS && /*#__PURE__*/ React.createElement(Icon24Chevron, null)));
};

//# sourceMappingURL=SimpleCell.js.map