import * as React from 'react';

declare module 'primereact/panel' {

    type HeaderTemplateType = React.ReactNode | ((options: HeaderTemplateOptions) => React.ReactNode);

    type IconsTemplateType = React.ReactNode | ((props: PanelProps) => React.ReactNode);

    interface HeaderTemplateOptions {
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

    interface ToggleParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        value: boolean;
    }

    export interface PanelProps {
        id?: string;
        header?: React.ReactNode;
        headerTemplate?: HeaderTemplateType;
        toggleable?: boolean;
        style?: object;
        className?: string;
        collapsed?: boolean;
        expandIcon?: string;
        collapseIcon?: string;
        icons?: IconsTemplateType;
        transitionOptions?: object;
        onExpand?(event: React.SyntheticEvent): void;
        onCollapse?(event: React.SyntheticEvent): void;
        onToggle?(e: ToggleParams): void;
    }

    export class Panel extends React.Component<PanelProps, any> { }
}
