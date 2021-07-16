import React from 'react';

interface MenuItemCommandParams {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
}

interface MenuItemOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    labelClassName: string;
    iconClassName: string;
    element: React.ReactNode;
    props: any;
    [key: string]: any;
}

type MenuItemTemplateType = React.ReactNode | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);

export interface MenuItem {
    label?: string;
    icon?: any;
    url?: string;
    items?: MenuItem[] | MenuItem[][];
    expanded?: boolean;
    disabled?: boolean;
    target?: string;
    separator?: boolean;
    style?: object;
    className?: string;
    command?(e: MenuItemCommandParams): void;
    template?: MenuItemTemplateType;
    [key: string]: any;
}
