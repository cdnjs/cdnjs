import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import styles from './ActionSheet.module.css';
const stopPropagation = (e)=>e.stopPropagation();
export const ActionSheetDropdownSheet = ({ children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
toggleRef, className, ...restProps })=>{
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FocusTrap, {
        ...restProps,
        onClick: stopPropagation,
        className: classNames(styles['ActionSheet'], platform === 'ios' && styles['ActionSheet--ios'], closing ? styles['ActionSheet--closing'] : styles['ActionSheet--opening'], sizeY === 'compact' && styles['ActionSheet--sizeY-compact'], className),
        children: children
    });
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map