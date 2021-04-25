import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/contextmenu' {

    type AppendToType = 'self' | HTMLElement | undefined | null;

    export interface ContextMenuProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        global?: boolean;
        autoZIndex?: boolean;
        baseZIndex?: number;
        appendTo?: AppendToType;
        transitionOptions?: object;
        onShow?(e: React.SyntheticEvent): void;
        onHide?(e: React.SyntheticEvent): void;
    }

    export class ContextMenu extends React.Component<ContextMenuProps, any> {
        public show(event: React.SyntheticEvent): void;
        public hide(event: React.SyntheticEvent): void;
    }
}
