import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';
import {SyntheticEvent} from "react";

interface ContextMenuProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    global?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: any;
    onShow?(e: Event): void;
    onHide?(e: Event): void;
}

export class ContextMenu extends React.Component<ContextMenuProps,any> {
    public show(event:SyntheticEvent):void;
    public hide(event:SyntheticEvent):void;
}
