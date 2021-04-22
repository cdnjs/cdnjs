import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace SlideMenu {

    interface SlideMenuProps {
        id?: string;
        model?: MenuItem[];
        popup?: boolean;
        style?: object;
        className?: string;
        easing?: string;
        effectDuration?: number;
        backLabel?: string;
        menuWidth?: number;
        viewportHeight?: number;
        autoZIndex?: boolean;
        baseZIndex?: number;
        appendTo?: HTMLElement | string;
        transitionOptions?: object;
        onShow?(e: React.SyntheticEvent): void;
        onHide?(e: React.SyntheticEvent): void;
    }
}

export declare class SlideMenu extends React.Component<SlideMenu.SlideMenuProps, any> {
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
    public toggle(event: React.SyntheticEvent): void;
}
