import type { CanvasHTMLAttributes, ReactNode, MouseEvent } from 'react';
import type { ChartType, ChartData, ChartOptions, Plugin, InteractionItem } from 'chart.js';
export interface Props extends CanvasHTMLAttributes<HTMLCanvasElement> {
    id?: string;
    className?: string;
    height?: number;
    width?: number;
    redraw?: boolean;
    type: ChartType;
    data: ChartData | ((canvas: HTMLCanvasElement) => ChartData);
    options?: ChartOptions;
    fallbackContent?: ReactNode;
    plugins?: Plugin[];
    getDatasetAtEvent?: (dataset: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
    getElementAtEvent?: (element: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
    getElementsAtEvent?: (elements: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
}
