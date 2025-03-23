import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    compact: styles['SimpleCell--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = ({ badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, expandable, multiline, subhead, subtitle, extraSubtitle, className, chevronSize = 'm', ...restProps })=>{
    const platform = usePlatform();
    const hasChevron = expandable === 'always' || expandable === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...restProps,
        className: classNames(styles['SimpleCell'], restProps.disabled && styles['SimpleCell--disabled'], sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && styles['SimpleCell--mult'], className),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['SimpleCell__before'], platform === 'ios' && styles['SimpleCell__before--ios']),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['SimpleCell__middle'],
                children: [
                    subhead && /*#__PURE__*/ _jsx(Subhead, {
                        Component: "span",
                        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__subhead']),
                        children: subhead
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['SimpleCell__content'],
                        children: [
                            badgeBeforeTitle && /*#__PURE__*/ _jsx("span", {
                                className: styles['SimpleCell__badge'],
                                children: badgeBeforeTitle
                            }),
                            /*#__PURE__*/ _jsx(Headline, {
                                Component: "span",
                                className: styles['SimpleCell__children'],
                                weight: "3",
                                children: children
                            }),
                            hasReactNode(badgeAfterTitle) && /*#__PURE__*/ _jsx("span", {
                                className: styles['SimpleCell__badge'],
                                children: badgeAfterTitle
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsxs("div", {
                        className: styles['SimpleCell__content'],
                        children: [
                            badgeBeforeSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: styles['SimpleCell__badge'],
                                children: badgeBeforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Footnote, {
                                normalize: false,
                                className: classNames(styles['SimpleCell__text'], styles['SimpleCell__subtitle']),
                                children: subtitle
                            }),
                            badgeAfterSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: styles['SimpleCell__badge'],
                                children: badgeAfterSubtitle
                            })
                        ]
                    }),
                    extraSubtitle && /*#__PURE__*/ _jsx(Footnote, {
                        className: classNames(styles['SimpleCell__text'], styles['SimpleCell__extraSubtitle']),
                        children: extraSubtitle
                    })
                ]
            }),
            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                weight: "3",
                className: styles['SimpleCell__indicator'],
                children: indicator
            }),
            hasAfter && /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles['SimpleCell__after'], 'vkuiInternalSimpleCell__after'),
                children: [
                    after,
                    hasChevron && /*#__PURE__*/ _jsx(Chevron, {
                        size: chevronSize,
                        className: styles['SimpleCell__chevronIcon']
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=SimpleCell.js.map