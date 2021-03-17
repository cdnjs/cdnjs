import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';

interface MenubarProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    start?: ((props: object) => any | any) | JSX.Element;
    end?: ((props: object) => any | any) | JSX.Element;
}

export class Menubar extends React.Component<MenubarProps,any> {}
