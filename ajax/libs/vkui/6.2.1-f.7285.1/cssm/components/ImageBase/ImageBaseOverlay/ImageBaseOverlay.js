import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useKeyboard } from '../../../components/Clickable/useKeyboard';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { useAppearance } from '../../../hooks/useAppearance';
import { useExternRef } from '../../../hooks/useExternRef';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { ImageBaseContext } from '../context';
import { validateOverlayIcon } from '../validators';
import { useNonInteractiveOverlayProps } from './hooks';
import styles from './ImageBaseOverlay.module.css';
const ImageBaseOverlayInteractive = ({ children, className, getRootRef, disableInteractive, overlayShown, ...restProps })=>{
    const { focusVisible, ...focusEvents } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'inside'
    });
    const keyboardHandlers = useKeyboard();
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = React.useContext(ImageBaseContext);
            validateOverlayIcon(size, {
                name: 'children',
                value: children
            });
        }
    }
    return /*#__PURE__*/ _jsx("div", {
        ...restProps,
        tabIndex: 0,
        role: "button",
        className: classNames(styles['ImageBaseOverlay--clickable'], (focusVisible || overlayShown) && styles['ImageBaseOverlay--visible'], focusVisibleClassNames, className),
        ref: getRootRef,
        ...focusEvents,
        ...keyboardHandlers,
        children: children
    });
};
const ImageBaseOverlayNonInteractive = ({ className, getRootRef, disableInteractive, overlayShown: overlayShownProps, ...restProps })=>{
    const rootRef = useExternRef(getRootRef);
    const { shown: overlayShown, onClick: onOverlayClick } = useNonInteractiveOverlayProps(rootRef);
    return /*#__PURE__*/ _jsx("div", {
        ...restProps,
        ref: rootRef,
        className: classNames((overlayShown || overlayShownProps) && styles['ImageBaseOverlay--visible'], className),
        onClick: onOverlayClick
    });
};
/**
 * Оверлей над картинкой.
 */ export const ImageBaseOverlay = ({ className, theme: themeProp, visibility: visibilityProp, ...restProps })=>{
    const appearance = useAppearance();
    const hasPointer = useAdaptivityHasPointer();
    const theme = themeProp ?? appearance;
    const visibility = visibilityProp ?? (hasPointer ? 'on-hover' : 'always');
    const commonClassNames = classNames(styles['ImageBaseOverlay'], theme === 'light' && styles['ImageBaseOverlay--theme-light'], theme === 'dark' && styles['ImageBaseOverlay--theme-dark'], className);
    const commonProps = {
        className: commonClassNames,
        overlayShown: visibility === 'always'
    };
    // Не делаем деструктуризацию пропа, потому что Typescript не вывозит
    if (restProps.disableInteractive) {
        return /*#__PURE__*/ _jsx(ImageBaseOverlayNonInteractive, {
            ...restProps,
            ...commonProps
        });
    }
    return /*#__PURE__*/ _jsx(ImageBaseOverlayInteractive, {
        ...restProps,
        ...commonProps
    });
};
ImageBaseOverlay.displayName = 'ImageBaseOverlay';

//# sourceMappingURL=ImageBaseOverlay.js.map