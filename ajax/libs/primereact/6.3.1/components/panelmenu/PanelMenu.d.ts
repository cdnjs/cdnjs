import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/panelmenu' {

    export interface PanelMenuProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        multiple?: boolean;
        transitionOptions?: object;
    }

    export class PanelMenu extends React.Component<PanelMenuProps, any> { }
}
