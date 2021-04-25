import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/menu' {

    type AppendToType = 'self' | HTMLElement | undefined | null;

    export interface MenuProps {
        id?: string;
        model?: MenuItem[];
        popup?: boolean;
        style?: object;
        className?: string;
        autoZIndex?: boolean;
        bazeZIndex?: number;
        appendTo?: AppendToType;
        transitionOptions?: object;
        onShow?(e: React.SyntheticEvent): void;
        onHide?(e: React.SyntheticEvent): void;
    }

    export class Menu extends React.Component<MenuProps, any> {
        public toggle(event: React.SyntheticEvent): void;
    }
}
