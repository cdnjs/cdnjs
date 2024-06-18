import * as React from 'react';
import { Icon28ChevronRightCircle } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Subhead } from '../../Typography/Subhead/Subhead';
import styles from './HorizontalCellShowMore.module.css';
const sizeClassNames = {
    s: styles['HorizontalCellShowMore--size-s'],
    m: styles['HorizontalCellShowMore--size-m'],
    l: styles['HorizontalCellShowMore--size-l']
};
export const HorizontalCellShowMore = ({ className, style, getRef, getRootRef, compensateLastCellIndent, height, size = 's', children = size === 's' ? 'Все' : 'Показать все', ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        style: style,
        className: classNames(styles['HorizontalCellShowMore'], compensateLastCellIndent && styles['HorizontalCellShowMore--compensate-last-cell-indent'], sizeClassNames[size], className),
        ref: getRootRef
    }, /*#__PURE__*/ React.createElement(Tappable, {
        style: size === 's' ? undefined : {
            height
        },
        className: styles['HorizontalCellShowMore__body'],
        getRootRef: getRef,
        activeMode: "opacity",
        hoverMode: "opacity",
        ...restProps
    }, /*#__PURE__*/ React.createElement(Icon28ChevronRightCircle, {
        className: styles['HorizontalCellShowMore__icon'],
        fill: "currentColor"
    }), /*#__PURE__*/ React.createElement(Subhead, {
        className: styles['HorizontalCellShowMore__text'],
        weight: "2"
    }, children)));
};

//# sourceMappingURL=HorizontalCellShowMore.js.map