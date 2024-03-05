import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { RootComponent } from '../RootComponent/RootComponent';
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
 */ export const Tabbar = (_param)=>{
    var { plain = false, mode } = _param, restProps = _object_without_properties(_param, [
        "plain",
        "mode"
    ]);
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames('vkuiInternalTabbar', "vkuiTabbar", platform === 'ios' && "vkuiTabbar--ios", getItemsLayoutClassName(mode, restProps.children), !plain && "vkuiTabbar--shadow")
    }, restProps));
};

//# sourceMappingURL=Tabbar.js.map