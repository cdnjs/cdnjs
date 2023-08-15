import * as React from 'react';
import { Icon16Chevron } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import styles from './MiniInfoCell.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */ export const MiniInfoCell = ({ before, after, children, mode = 'base', textWrap = 'nowrap', expandable = false, className, ...restProps })=>{
    const cellClasses = classNames(styles['MiniInfoCell'], {
        nowrap: styles['MiniInfoCell--textWrap-nowrap'],
        full: styles['MiniInfoCell--textWrap-full'],
        short: styles['MiniInfoCell--textWrap-short']
    }[textWrap], mode !== 'base' && ({
        add: styles['MiniInfoCell--mode-add'],
        accent: styles['MiniInfoCell--mode-accent'],
        more: styles['MiniInfoCell--mode-more']
    })[mode], className);
    const cellContent = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", {
        className: styles['MiniInfoCell__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['MiniInfoCell__middle']
    }, /*#__PURE__*/ React.createElement(Paragraph, {
        className: styles['MiniInfoCell__content'],
        weight: mode === 'more' ? '2' : undefined
    }, children), expandable && /*#__PURE__*/ React.createElement(Icon16Chevron, null)), hasReactNode(after) && /*#__PURE__*/ React.createElement("span", {
        className: styles['MiniInfoCell__after']
    }, after));
    return restProps.onClick ? /*#__PURE__*/ React.createElement(Tappable, {
        Component: "div",
        role: "button",
        ...restProps,
        className: cellClasses
    }, cellContent) : /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: cellClasses
    }, cellContent);
};

//# sourceMappingURL=MiniInfoCell.js.map