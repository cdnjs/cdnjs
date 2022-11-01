import * as React from 'react';

export interface ChartProps {
    id?: string;
    type?: string;
    data?: object;
    options?: object;
    plugins?: any[];
    width?: string;
    height?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export declare class Chart extends React.Component<ChartProps, any> {
    public getCanvas(): HTMLCanvasElement;
    public getChart(): any;
    public getBase64Image(): any;
    public generateLegend(): string;
    public refresh(): void;
    public getElement(): HTMLDivElement;
}
