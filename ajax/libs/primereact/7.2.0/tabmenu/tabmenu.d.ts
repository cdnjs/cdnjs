import * as React from 'react';
import { MenuItem } from '../menuitem';

interface TabMenuTabChangeParams {
    originalEvent: React.SyntheticEvent;
    value: MenuItem;
    index: number;
}

export interface TabMenuProps {
    id?: string;
    model?: MenuItem[];
    activeIndex?: number;
    style?: object;
    className?: string;
    onTabChange?(e: TabMenuTabChangeParams): void;
}

export declare class TabMenu extends React.Component<TabMenuProps, any> { }
