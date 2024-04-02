import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Chevron } from './Chevron/Chevron';
import styles from './SimpleCell.module.css';
const sizeYClassNames = {
    none: styles['SimpleCell--sizeY-none'],
    ['compact']: styles['SimpleCell--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = ({ badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, expandable, multiline, subhead, subtitle, extraSubtitle, className, chevronSize = 'm', ...restProps })=>{
    const platform = usePlatform();
    const hasChevron = expandable === 'always' || expandable === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        className: classNames(styles['SimpleCell'], sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && styles['SimpleCell--mult'], className)
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['SimpleCell__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['SimpleCell__middle']
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
        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__extraSubtitle'])
    }, extraSubtitle)), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        weight: "3",
        className: styles['SimpleCell__indicator']
    }, indicator), hasAfter && /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['SimpleCell__after'], 'vkuiInternalSimpleCell__after')
    }, after, hasChevron && /*#__PURE__*/ React.createElement(Chevron, {
        size: chevronSize,
        className: styles['SimpleCell__chevronIcon']
    })));
};

//# sourceMappingURL=SimpleCell.js.map