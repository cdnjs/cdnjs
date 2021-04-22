import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace Menubar {

    type StartTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

    type EndTemplate = React.ReactNode | ((props: MenubarProps) => React.ReactNode);

    interface MenubarProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        start?: StartTemplate;
        end?: EndTemplate;
    }
}

export declare class Menubar extends React.Component<Menubar.MenubarProps, any> { }
