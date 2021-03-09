import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';
import {SyntheticEvent} from "react";

interface TieredMenuProps {
    id?: string;
    model?: MenuItem[];
    popup?: boolean;
    style?: object;
    className?: string;
    autoZIndex?: boolean;
    bazeZIndex?: number;
    appendTo?: any;
    onShow?(e: Event): void;
    onHide?(e: Event): void;
}

export class TieredMenu extends React.Component<TieredMenuProps, any> {
    public toggle(event: SyntheticEvent): void;
}
