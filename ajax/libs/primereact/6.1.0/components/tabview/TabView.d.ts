import * as React from 'react';

interface TabPanelProps {
    header?: any;
    leftIcon?: string;
    rightIcon?: string;
    disabled?: boolean;
    headerStyle?: any;
    headerClassName?: string;
    contentStyle?: any;
    contentClassName?: string;
}

export class TabPanel extends React.Component<TabPanelProps,any> {}

interface TabViewProps {
    id?: string;
    activeIndex?: number;
    style?: any;
    className?: string;
    renderActiveOnly?: boolean;
    onTabChange?(e: {originalEvent: Event, index: number}): void;
}

// tslint:disable-next-line:max-classes-per-file
export class TabView extends React.Component<TabViewProps,any> {}
