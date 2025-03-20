import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../../../lib/useIsomorphicLayoutEffect';
import styles from './EllipsisText.module.css';
/** Компонент ограничивает текстовый контент убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = ({ className, getRootRef, children, maxWidth, maxLines = 1, ...restProps })=>{
    const contentRef = useRef(null);
    useIsomorphicLayoutEffect(()=>{
        if (contentRef && contentRef.current) {
            contentRef.current.style.setProperty('-webkit-line-clamp', maxLines > 1 ? `${maxLines}` : '');
        }
    }, [
        contentRef,
        maxLines
    ]);
    return /*#__PURE__*/ _jsx("span", {
        ref: getRootRef,
        className: classNames(styles['EllipsisText'], className),
        ...restProps,
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            ref: contentRef,
            className: classNames(styles['EllipsisText__content'], maxLines > 1 && styles['EllipsisText__content--multiline']),
            children: children
        })
    });
};
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map