import * as React from 'react';

export interface RowProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export declare class Row extends React.Component<RowProps, any> {}
