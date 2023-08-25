import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import styles from './Tabbar.module.css';
const getItemsLayoutClassName = (itemsLayout, children)=>{
    switch(itemsLayout){
        case 'horizontal':
            return 'vkuiInternalTabbar--layout-horizontal';
        case 'vertical':
            return 'vkuiInternalTabbar--layout-vertical';
        default:
            return React.Children.count(children) > 2 ? getItemsLayoutClassName('vertical', []) : getItemsLayoutClassName('horizontal', []);
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */ export const Tabbar = ({ children, shadow = true, mode, className, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames('vkuiInternalTabbar', styles['Tabbar'], platform === Platform.IOS && styles['Tabbar--ios'], getItemsLayoutClassName(mode, children), shadow && styles['Tabbar--shadow'], className),
        ...restProps
    }, children);
};

//# sourceMappingURL=Tabbar.js.map