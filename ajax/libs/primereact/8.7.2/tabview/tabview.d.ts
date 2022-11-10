import * as React from 'react';

type TabPanelHeaderTemplateType = React.ReactNode | ((options: TabPanelHeaderTemplateOptions) => React.ReactNode);

interface TabPanelHeaderTemplateOptions {
    className: string;
    titleClassName: string;
    onClick(event: React.MouseEvent<HTMLElement>): void;
    onKeyDown(event: React.KeyboardEvent<HTMLElement>): void;
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
    closable?: boolean;
    style?: React.CSSProperties;
    className?: string;
    headerStyle?: React.CSSProperties;
    headerClassName?: string;
    contentStyle?: React.CSSProperties;
    contentClassName?: string;
    children?: React.ReactNode;
}

export declare class TabPanel extends React.Component<TabPanelProps, any> {}

interface TabViewTabChangeParams {
    originalEvent: React.SyntheticEvent;
    index: number;
}

interface TabViewTabCloseParams {
    originalEvent: React.SyntheticEvent;
    index: number;
}

export interface TabViewProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    activeIndex?: number;
    children?: React.ReactNode;
    panelContainerClassName?: string;
    panelContainerStyle?: React.CSSProperties;
    renderActiveOnly?: boolean;
    scrollable?: boolean;
    onBeforeTabChange?(e: TabViewTabChangeParams): void;
    onBeforeTabClose?(e: TabViewTabCloseParams): void;
    onTabChange?(e: TabViewTabChangeParams): void;
    onTabClose?(e: TabViewTabCloseParams): void;
}

// tslint:disable-next-line:max-classes-per-file
export declare class TabView extends React.Component<TabViewProps, any> {
    public reset(): void;
    public getElement(): HTMLDivElement;
}
