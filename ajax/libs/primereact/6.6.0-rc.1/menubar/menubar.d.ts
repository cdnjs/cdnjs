import * as React from 'react';
import { MenuItem } from '../menuitem';

type MenubarStartTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

type MenubarEndTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

export interface MenubarProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    start?: MenubarStartTemplate;
    end?: MenubarEndTemplate;
}

export declare class Menubar extends React.Component<MenubarProps, any> { }
