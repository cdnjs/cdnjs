import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';
import {SyntheticEvent} from "react";

interface SlideMenuProps {
    id?: string;
    model?: MenuItem[];
    popup?: boolean;
    style?: object;
    className?: string;
    easing?: string;
    effectDuration?: number;
    backLabel?: string;
    menuWidth?: number;
    viewportHeight?: number;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: any;
    onShow?(e: Event): void;
    onHide?(e: Event): void;
}

export class SlideMenu extends React.Component<SlideMenuProps,any> {
    public show(event:SyntheticEvent):void;
    public hide(event:SyntheticEvent):void;
    public toggle(event:SyntheticEvent):void;
}
