import * as React from 'react';

declare namespace Chart {
    interface ChartProps {
        id?: string;
        type?: string;
        data?: object;
        options?: object;
        width?: string;
        height?: string;
        style?: object;
        className?: string;
    }
}

export declare class Chart extends React.Component<Chart.ChartProps, any> { }
