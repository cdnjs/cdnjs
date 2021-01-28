import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';

interface MenubarProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    start?: ((props: object) => any | any);
    end?: ((props: object) => any | any)
}

export class Menubar extends React.Component<MenubarProps,any> {}
