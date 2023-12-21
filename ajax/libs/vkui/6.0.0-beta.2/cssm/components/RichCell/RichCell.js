import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { RichCellIcon } from './RichCellIcon/RichCellIcon';
import styles from './RichCell.module.css';
const sizeYClassNames = {
    none: styles['RichCell--sizeY-none'],
    ['compact']: styles['RichCell--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export const RichCell = ({ subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        className: classNames(styles['RichCell'], !multiline && styles['RichCell--text-ellipsis'], sizeY !== 'regular' && sizeYClassNames[sizeY], className)
    }, before && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__content']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__content-before']
    }, subhead && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "div",
        className: styles['RichCell__subhead']
    }, subhead), /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__children']
    }, children), text && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__text']
    }, text), caption && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "div",
        className: styles['RichCell__caption']
    }, caption)), (after || afterCaption) && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__content-after']
    }, after && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__after-children']
    }, after), afterCaption && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__after-caption']
    }, afterCaption))), bottom && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__bottom']
    }, bottom), actions && /*#__PURE__*/ React.createElement("div", {
        className: styles['RichCell__actions']
    }, actions)));
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map