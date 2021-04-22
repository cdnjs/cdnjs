import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace ContextMenu {

    interface ContextMenuProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        global?: boolean;
        autoZIndex?: boolean;
        baseZIndex?: number;
        appendTo?: HTMLElement | string;
        transitionOptions?: object;
        onShow?(e: React.SyntheticEvent): void;
        onHide?(e: React.SyntheticEvent): void;
    }
}

export declare class ContextMenu extends React.Component<ContextMenu.ContextMenuProps, any> {
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
}
