import * as React from 'react';

type PanelHeaderTemplateType = React.ReactNode | ((options: PanelHeaderTemplateOptions) => React.ReactNode);

type PanelIconsTemplateType = React.ReactNode | ((props: PanelProps) => React.ReactNode);

interface PanelHeaderTemplateOptions {
    className: string;
    titleClassName: string;
    iconsClassName: string;
    togglerClassName: string;
    togglerIconClassName: string;
    onTogglerClick(event: React.MouseEvent<HTMLElement>): void;
    titleElement: JSX.Element;
    iconsElement: JSX.Element;
    togglerElement: JSX.Element;
    element: JSX.Element;
    props: PanelProps;
    collapsed: boolean;
}

interface PanelToggleParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    value: boolean;
}

export interface PanelProps {
    id?: string;
    header?: React.ReactNode;
    headerTemplate?: PanelHeaderTemplateType;
    toggleable?: boolean;
    style?: object;
    className?: string;
    collapsed?: boolean;
    expandIcon?: string;
    collapseIcon?: string;
    icons?: PanelIconsTemplateType;
    transitionOptions?: object;
    onExpand?(event: React.SyntheticEvent): void;
    onCollapse?(event: React.SyntheticEvent): void;
    onToggle?(e: PanelToggleParams): void;
}

export declare class Panel extends React.Component<PanelProps, any> { }
