import React from 'react';

interface CommandParams {
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

type TemplateType = React.ReactNode | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);

export interface MenuItem {
    label?: string;
    icon?: string;
    url?: string;
    items?: MenuItem[] | MenuItem[][];
    expanded?: boolean;
    disabled?: boolean;
    target?: string;
    separator?: boolean;
    style?: object;
    className?: string;
    command?(e: CommandParams): void;
    template?: TemplateType;
    [key: string]: any;
}
