import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { RichCellIcon } from './RichCellIcon/RichCellIcon';
import styles from './RichCell.module.css';
const sizeYClassNames = {
    none: styles['RichCell--sizeY-none'],
    compact: styles['RichCell--sizeY-compact']
};
const alignAfterClassNames = {
    start: styles['RichCell__content-after--align-start'],
    center: styles['RichCell__content-after--align-center'],
    end: styles['RichCell__content-after--align-end']
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export const RichCell = ({ subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className, afterAlign = 'start', ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const afterRender = ()=>{
        if (!after && !afterCaption) {
            return;
        }
        return /*#__PURE__*/ _jsxs("div", {
            className: classNames(styles['RichCell__content-after'], alignAfterClassNames[afterAlign]),
            children: [
                after && /*#__PURE__*/ _jsx("div", {
                    className: styles['RichCell__after-children'],
                    children: after
                }),
                afterCaption && /*#__PURE__*/ _jsx("div", {
                    className: styles['RichCell__after-caption'],
                    children: afterCaption
                })
            ]
        });
    };
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...restProps,
        className: classNames(styles['RichCell'], !multiline && styles['RichCell--text-ellipsis'], sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles['RichCell__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['RichCell__in'],
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['RichCell__content'],
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: styles['RichCell__content-before'],
                                children: [
                                    subhead && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: styles['RichCell__subhead'],
                                        children: subhead
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: styles['RichCell__children'],
                                        children: children
                                    }),
                                    text && /*#__PURE__*/ _jsx("div", {
                                        className: styles['RichCell__text'],
                                        children: text
                                    }),
                                    caption && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: styles['RichCell__caption'],
                                        children: caption
                                    })
                                ]
                            }),
                            afterAlign === 'start' && afterRender()
                        ]
                    }),
                    bottom && /*#__PURE__*/ _jsx("div", {
                        className: styles['RichCell__bottom'],
                        children: bottom
                    }),
                    actions && /*#__PURE__*/ _jsx("div", {
                        className: styles['RichCell__actions'],
                        children: actions
                    })
                ]
            }),
            afterAlign !== 'start' && afterRender()
        ]
    });
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map