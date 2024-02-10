import { Selection } from 'd3-selection';
import { FunctionPlotOptions } from '../types.js';
import { Chart } from '../index.js';
export default function annotations(options: {
    owner: Chart;
}): (parentSelection: Selection<any, FunctionPlotOptions, any, any>) => void;
