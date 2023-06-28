import * as React from 'react';
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import styles from './Spinner.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo(({ size ='regular' , 'aria-label': ariaLabel = 'Загружается...' , className , ...restProps })=>{
    const SpinnerIcon = {
        small: Icon16Spinner,
        regular: Icon24Spinner,
        medium: Icon32Spinner,
        large: Icon44Spinner
    }[size];
    return /*#__PURE__*/ React.createElement("span", {
        role: "status",
        "aria-label": ariaLabel,
        ...restProps,
        className: classNames(styles['Spinner'], className)
    }, /*#__PURE__*/ React.createElement(SpinnerIcon, {
        className: styles['Spinner__self']
    }));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map