import * as React from 'react';

declare module 'primereact/tabview' {

    type HeaderTemplateType = React.ReactNode | ((options: HeaderTemplateOptions) => React.ReactNode);

    interface HeaderTemplateOptions {
        className: string;
        titleClassName: string;
        onClick(event: React.MouseEvent<HTMLElement>): void;
        leftIconElement: JSX.Element;
        titleElement: JSX.Element;
        rightIconElement: JSX.Element;
        element: JSX.Element;
        props: TabPanelProps;
        index: number;
        selected: boolean;
        ariaControls: string;
    }

    export interface TabPanelProps {
        header?: React.ReactNode;
        headerTemplate?: HeaderTemplateType;
        leftIcon?: string;
        rightIcon?: string;
        disabled?: boolean;
        headerStyle?: object;
        headerClassName?: string;
        contentStyle?: object;
        contentClassName?: string;
    }

    export class TabPanel extends React.Component<TabPanelProps, any> { }

    interface TabChangeParams {
        originalEvent: React.SyntheticEvent;
        index: number;
    }

    export interface TabViewProps {
        id?: string;
        activeIndex?: number;
        style?: object;
        className?: string;
        renderActiveOnly?: boolean;
        onTabChange?(e: TabChangeParams): void;
    }

    // tslint:disable-next-line:max-classes-per-file
    export class TabView extends React.Component<TabViewProps, any> { }
}
