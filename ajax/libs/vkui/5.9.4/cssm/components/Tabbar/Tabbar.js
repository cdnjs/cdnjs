import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { RootComponent } from '../RootComponent/RootComponent';
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
 */ export const Tabbar = ({ shadow = true, mode, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames('vkuiInternalTabbar', styles['Tabbar'], platform === Platform.IOS && styles['Tabbar--ios'], getItemsLayoutClassName(mode, restProps.children), shadow && styles['Tabbar--shadow']),
        ...restProps
    });
};

//# sourceMappingURL=Tabbar.js.map