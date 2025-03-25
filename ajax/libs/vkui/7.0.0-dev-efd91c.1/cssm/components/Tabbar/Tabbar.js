'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Tabbar.module.css";
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
 */ export const Tabbar = ({ plain = false, mode, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames('vkuiInternalTabbar', styles.host, platform === 'ios' && styles.ios, getItemsLayoutClassName(mode, restProps.children), !plain && styles.shadow),
        ...restProps
    });
};

//# sourceMappingURL=Tabbar.js.map