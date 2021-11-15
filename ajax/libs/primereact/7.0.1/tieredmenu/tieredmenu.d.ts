import * as React from 'react';
import { MenuItem } from '../menuitem';

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
    transitionOptions?: object;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
}

export declare class TieredMenu extends React.Component<TieredMenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
}
