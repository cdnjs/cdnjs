import * as React from 'react';
import { MenuItem } from '../menuitem';

export interface PanelMenuProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    multiple?: boolean;
    transitionOptions?: object;
}

export declare class PanelMenu extends React.Component<PanelMenuProps, any> { }
