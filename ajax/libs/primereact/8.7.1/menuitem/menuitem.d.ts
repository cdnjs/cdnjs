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
}

type MenuItemTemplateType = React.ReactNode | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);

export interface MenuItem {
    id?: string;
    label?: string;
    icon?: any;
    url?: string;
    items?: MenuItem[] | MenuItem[][];
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    target?: string;
    separator?: boolean;
    style?: React.CSSProperties;
    className?: string;
    command?(e: MenuItemCommandParams): void;
    template?: MenuItemTemplateType;
    data?: any;
}
