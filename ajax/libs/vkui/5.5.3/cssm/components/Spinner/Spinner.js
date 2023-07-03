import * as React from 'react';
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Spinner.module.css';
const warn = warnOnce('Spinner');
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo(({ size ='regular' , children ='Загружается...' , // TODO [>=6]: Удалить автоматическое приведение aria-label
'aria-label': ariaLabel = 'Загружается...' , className , ...restProps })=>{
    const SpinnerIcon = {
        small: Icon16Spinner,
        regular: Icon24Spinner,
        medium: Icon32Spinner,
        large: Icon44Spinner
    }[size];
    // TODO [>=6]: Удалить варнинг
    if (process.env.NODE_ENV === 'development') {
        if (ariaLabel && !children) {
            warn('a11y: Пожалуйста, передавайте ваш текст для ассистивных технологий в children вместо aria-label.');
        }
    }
    return /*#__PURE__*/ React.createElement("span", {
        role: "status",
        ...restProps,
        className: classNames(styles['Spinner'], className)
    }, /*#__PURE__*/ React.createElement(SpinnerIcon, {
        className: styles['Spinner__self']
    }), /*#__PURE__*/ React.createElement(VisuallyHidden, null, children ?? ariaLabel));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map