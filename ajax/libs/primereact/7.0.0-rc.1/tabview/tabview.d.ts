import * as React from 'react';

type TabPanelHeaderTemplateType = React.ReactNode | ((options: TabPanelHeaderTemplateOptions) => React.ReactNode);

interface TabPanelHeaderTemplateOptions {
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
    headerTemplate?: TabPanelHeaderTemplateType;
    leftIcon?: string;
    rightIcon?: string;
    disabled?: boolean;
    headerStyle?: object;
    headerClassName?: string;
    contentStyle?: object;
    contentClassName?: string;
}

export declare class TabPanel extends React.Component<TabPanelProps, any> { }

interface TabViewTabChangeParams {
    originalEvent: React.SyntheticEvent;
    index: number;
}

export interface TabViewProps {
    id?: string;
    activeIndex?: number;
    style?: object;
    className?: string;
    renderActiveOnly?: boolean;
    scrollable?: boolean;
    onTabChange?(e: TabViewTabChangeParams): void;
}

// tslint:disable-next-line:max-classes-per-file
export declare class TabView extends React.Component<TabViewProps, any> { }
