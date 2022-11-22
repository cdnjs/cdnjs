import { Selection } from 'd3-selection';
import { Chart } from '../index';
import { FunctionPlotDatum } from '../types';
export default function interval(chart: Chart): (selection: Selection<any, FunctionPlotDatum, any, any>) => void;
