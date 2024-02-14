import { Selection } from 'd3-selection';
import { Chart } from '../index.js';
import { FunctionPlotDatum } from '../types.js';
export default function Scatter(chart: Chart): (selection: Selection<any, FunctionPlotDatum, any, any>) => void;
