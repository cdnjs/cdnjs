import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace Menu {

    interface MenuProps {
        id?: string;
        model?: MenuItem[];
        popup?: boolean;
        style?: object;
        className?: string;
        autoZIndex?: boolean;
        bazeZIndex?: number;
        appendTo?: HTMLElement | string;
        transitionOptions?: object;
        onShow?(e: React.SyntheticEvent): void;
        onHide?(e: React.SyntheticEvent): void;
    }
}

export declare class Menu extends React.Component<Menu.MenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
}
