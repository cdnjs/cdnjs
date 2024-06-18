import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { useAppearance } from '../../../hooks/useAppearance';
import { focusVisiblePresetModeClassNames } from '../../../hooks/useFocusVisibleClassName';
import { Tappable } from '../../Tappable/Tappable';
import { ImageBaseContext } from '../context';
import { validateOverlayIcon } from '../validators';
import styles from './ImageBaseOverlay.module.css';
/**
 * Интерактивный оверлей над картинкой.
 */ export const ImageBaseOverlay = ({ className, theme: themeProp, visibility: visibilityProp, children, onClick: onClickProp, ...restProps })=>{
    const appearance = useAppearance();
    const hasPointer = useAdaptivityHasPointer();
    const theme = themeProp ?? appearance;
    const visibility = visibilityProp ?? (hasPointer ? 'on-hover' : 'always');
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
    const onClick = onClickProp ?? visibility === 'on-hover' ? noop : undefined;
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        className: classNames(styles['ImageBaseOverlay'], visibility === 'always' && styles['ImageBaseOverlay--visible'], theme === 'light' && styles['ImageBaseOverlay--theme-light'], theme === 'dark' && styles['ImageBaseOverlay--theme-dark'], className),
        hasHover: visibility === 'on-hover',
        hoverMode: visibility === 'on-hover' ? styles['ImageBaseOverlay--visible'] : undefined,
        focusVisibleMode: classNames(focusVisiblePresetModeClassNames['inside'], styles['ImageBaseOverlay--visible']),
        hasActive: false,
        onClick: onClick
    }, children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map