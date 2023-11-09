import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import styles from './ActionSheet.module.css';
const stopPropagation = (e)=>e.stopPropagation();
export const ActionSheetDropdownSheet = ({ children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
toggleRef, className, ...restProps })=>{
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(FocusTrap, {
        ...restProps,
        onClick: stopPropagation,
        className: classNames(styles['ActionSheet'], platform === Platform.IOS && styles['ActionSheet--ios'], closing && styles['ActionSheet--closing'], sizeY === SizeType.COMPACT && styles['ActionSheet--sizeY-compact'], className)
    }, children);
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map