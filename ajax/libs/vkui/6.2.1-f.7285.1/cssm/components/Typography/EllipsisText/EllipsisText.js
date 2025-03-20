import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import styles from './EllipsisText.module.css';
/** Компонент ограничивает текстовый контент убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = ({ className, getRootRef, children, maxWidth, ...restProps })=>/*#__PURE__*/ _jsx("span", {
        ref: getRootRef,
        className: classNames(styles['EllipsisText'], className),
        ...restProps,
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            className: styles['EllipsisText__content'],
            children: children
        })
    });
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map