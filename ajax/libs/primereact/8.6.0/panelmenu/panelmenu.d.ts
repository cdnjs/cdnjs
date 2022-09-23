import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

export interface PanelMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    multiple?: boolean;
    transitionOptions?: CSSTransitionProps;
    children?: React.ReactNode;
}

export declare class PanelMenu extends React.Component<PanelMenuProps, any> {
    public getElement(): HTMLDivElement;
}
