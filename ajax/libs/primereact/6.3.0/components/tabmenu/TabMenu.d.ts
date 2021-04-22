import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace TabMenu {

    interface TabChangeParams {
        originalEvent: React.SyntheticEvent;
        value: MenuItem;
    }

    interface TabMenuProps {
        id?: string;
        model?: MenuItem[];
        activeItem?: MenuItem;
        style?: object;
        className?: string;
        onTabChange?(e: TabChangeParams): void;
    }
}

export declare class TabMenu extends React.Component<TabMenu.TabMenuProps, any> { }
