import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Spinner } from '../Spinner/Spinner';
import { ScreenSpinnerContext } from './context';
import styles from './ScreenSpinner.module.css';
export const ScreenSpinnerLoader = ({ size = 'large', children, ...restProps })=>{
    const { caption } = React.useContext(ScreenSpinnerContext);
    // TODO [>=7]: см. https://github.com/VKCOM/VKUI/pull/7505#discussion_r1754153438
    const a11yText = children ? children : caption ?? 'Пожалуйста, подождите...';
    return /*#__PURE__*/ _jsx(Spinner, {
        className: classNames(styles['ScreenSpinner__spinner'], !caption && styles['ScreenSpinner__spinner--transition']),
        size: size,
        noColor: true,
        ...restProps,
        children: a11yText
    });
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map