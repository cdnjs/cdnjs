import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './ScreenSpinner.module.css';
export const ScreenSpinnerLoader = ({ size = 'large', children = 'Пожалуйста, подождите...', ...restProps })=>{
    return /*#__PURE__*/ _jsx(Spinner, {
        className: styles['ScreenSpinner__spinner'],
        size: size,
        noColor: true,
        ...restProps,
        children: children
    });
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map