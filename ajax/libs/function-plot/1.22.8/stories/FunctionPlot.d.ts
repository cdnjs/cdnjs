import React from 'react';
import { FunctionPlotOptions } from '../types';
export interface FunctionPlotProps {
    options?: FunctionPlotOptions;
}
export declare const FunctionPlot: React.FC<FunctionPlotProps>;
export declare const Render: React.FC<{
    id?: string;
    content: string;
    noCode?: boolean;
}>;
