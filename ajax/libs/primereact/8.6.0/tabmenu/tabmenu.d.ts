import * as React from 'react';
import { MenuItem } from '../menuitem';

interface TabMenuTabChangeParams {
    originalEvent: React.SyntheticEvent;
    value: MenuItem;
    index: number;
}

export interface TabMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    activeIndex?: number;
    onTabChange?(e: TabMenuTabChangeParams): void;
    children?: React.ReactNode;
}

export declare class TabMenu extends React.Component<TabMenuProps, any> {
    public getElement(): HTMLDivElement;
}
