'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames('vkuiInternalTabbar', "Tabbar__host--dizrZ", platform === 'ios' && "Tabbar__ios--NaxFW", getItemsLayoutClassName(mode, restProps.children), !plain && "Tabbar__shadow--EAhHj")
    }, restProps));
};

//# sourceMappingURL=Tabbar.js.map