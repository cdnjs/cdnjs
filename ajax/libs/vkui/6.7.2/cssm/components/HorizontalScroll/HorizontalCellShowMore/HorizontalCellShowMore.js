import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const HorizontalCellShowMore = ({ className, style, getRef, getRootRef, compensateLastCellIndent, height, size = 's', children = size === 's' ? 'Все' : 'Показать все', centered = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        style: style,
        className: classNames(styles['HorizontalCellShowMore'], compensateLastCellIndent && styles['HorizontalCellShowMore--compensate-last-cell-indent'], centered && styles['HorizontalCellShowMore--centered'], sizeClassNames[size], className),
        ref: getRootRef,
        children: /*#__PURE__*/ _jsxs(Tappable, {
            style: size === 's' ? undefined : {
                height
            },
            className: styles['HorizontalCellShowMore__body'],
            getRootRef: getRef,
            activeMode: "opacity",
            hoverMode: "opacity",
            ...restProps,
            children: [
                /*#__PURE__*/ _jsx(Icon28ChevronRightCircle, {
                    className: styles['HorizontalCellShowMore__icon'],
                    fill: "currentColor"
                }),
                /*#__PURE__*/ _jsx(Subhead, {
                    className: styles['HorizontalCellShowMore__text'],
                    weight: "2",
                    children: children
                })
            ]
        })
    });
};

//# sourceMappingURL=HorizontalCellShowMore.js.map