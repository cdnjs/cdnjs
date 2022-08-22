import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

type MenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface MenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    popup?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: MenuAppendToType;
    transitionOptions?: CSSTransitionProps;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class Menu extends React.Component<MenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
    public getElement(): HTMLDivElement;
    public getTarget(): EventTarget | null;
}
