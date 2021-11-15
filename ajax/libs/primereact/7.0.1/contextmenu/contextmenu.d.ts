import * as React from 'react';
import { MenuItem } from '../menuitem';

type ContextMenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface ContextMenuProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    global?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: ContextMenuAppendToType;
    transitionOptions?: object;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
}

export declare class ContextMenu extends React.Component<ContextMenuProps, any> {
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
}
