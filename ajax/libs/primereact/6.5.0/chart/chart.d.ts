import * as React from 'react';

export interface ChartProps {
    id?: string;
    type?: string;
    data?: object;
    options?: object;
    plugins?: any[];
    width?: string;
    height?: string;
    style?: object;
    className?: string;
}

export declare class Chart extends React.Component<ChartProps, any> { }
