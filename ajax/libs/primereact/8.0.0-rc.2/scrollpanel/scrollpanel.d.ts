import * as React from 'react';

export interface ScrollPanelProps {
    id?: string;
    style?: object;
    className?: string;
    children?: React.ReactNode;
}

export declare class ScrollPanel extends React.Component<ScrollPanelProps, any> { }
