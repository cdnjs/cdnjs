import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

type TieredMenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface TieredMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    popup?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: TieredMenuAppendToType;
    transitionOptions?: CSSTransitionProps;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class TieredMenu extends React.Component<TieredMenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
    public getElement(): HTMLDivElement;
}
