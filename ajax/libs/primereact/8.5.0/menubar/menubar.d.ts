import * as React from 'react';
import { MenuItem } from '../menuitem';

type MenubarStartTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

type MenubarEndTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

export interface MenubarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    start?: MenubarStartTemplate;
    end?: MenubarEndTemplate;
    children?: React.ReactNode;
}

export declare class Menubar extends React.Component<MenubarProps, any> {
    public getElement(): HTMLDivElement;
    public getRootMenu(): HTMLElement;
    public getMenuButton(): HTMLElement;
}
