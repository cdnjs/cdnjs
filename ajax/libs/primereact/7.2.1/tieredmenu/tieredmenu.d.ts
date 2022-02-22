import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

type TieredMenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface TieredMenuProps {
    id?: string;
    model?: MenuItem[];
    popup?: boolean;
    style?: object;
    className?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: TieredMenuAppendToType;
    transitionOptions?: CSSTransitionProps;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
}

export declare class TieredMenu extends React.Component<TieredMenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
}
