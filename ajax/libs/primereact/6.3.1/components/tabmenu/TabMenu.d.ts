import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/tabmenu' {

    interface TabChangeParams {
        originalEvent: React.SyntheticEvent;
        value: MenuItem;
    }

    export interface TabMenuProps {
        id?: string;
        model?: MenuItem[];
        activeItem?: MenuItem;
        style?: object;
        className?: string;
        onTabChange?(e: TabChangeParams): void;
    }

    export class TabMenu extends React.Component<TabMenuProps, any> { }
}
