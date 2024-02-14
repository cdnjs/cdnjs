import { Selection } from 'd3-selection';
import { Chart } from '../index.js';
import { Interval, FunctionPlotDatum, FunctionPlotScale } from '../types.js';
export declare function createPathD(xScale: FunctionPlotScale, yScale: FunctionPlotScale, minWidthHeight: number, points: Array<[Interval, Interval]>, closed: boolean): string;
export default function interval(chart: Chart): (selection: Selection<any, FunctionPlotDatum, any, any>) => void;
