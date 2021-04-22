import * as React from 'react';

declare namespace TabPanel {

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

    interface TabPanelProps {
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
}

export declare class TabPanel extends React.Component<TabPanel.TabPanelProps, any> { }

declare namespace TabView {

    interface TabChangeParams {
        originalEvent: React.SyntheticEvent;
        index: number;
    }

    interface TabViewProps {
        id?: string;
        activeIndex?: number;
        style?: object;
        className?: string;
        renderActiveOnly?: boolean;
        onTabChange?(e: TabChangeParams): void;
    }
}

// tslint:disable-next-line:max-classes-per-file
export declare class TabView extends React.Component<TabView.TabViewProps, any> { }
