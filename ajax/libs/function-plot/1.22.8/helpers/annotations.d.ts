import { Selection } from 'd3-selection';
import { FunctionPlotOptions } from '../types';
import { Chart } from '../index';
export default function annotations(options: {
    owner: Chart;
}): (parentSelection: Selection<any, FunctionPlotOptions, any, any>) => void;
