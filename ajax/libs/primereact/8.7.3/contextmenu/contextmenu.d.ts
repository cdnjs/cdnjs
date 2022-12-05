import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

type ContextMenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface ContextMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    global?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: ContextMenuAppendToType;
    transitionOptions?: CSSTransitionProps;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class ContextMenu extends React.Component<ContextMenuProps, any> {
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
    public getElement(): HTMLDivElement;
}
