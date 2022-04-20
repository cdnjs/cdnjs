import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

export interface PanelMenuProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    multiple?: boolean;
    transitionOptions?: CSSTransitionProps;
    children?: React.ReactNode;
}

export declare class PanelMenu extends React.Component<PanelMenuProps, any> { }
