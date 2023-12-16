import { Selection } from 'd3-selection';
import { FunctionPlotDatum } from '../types';
import { Chart } from '../chart';
/**
 * GraphTypeBuilder is the returned Plotter instance, this function is called
 * every time there's an update in the canvas, it corresponds to the `my` function
 * described in detail in https://bost.ocks.org/mike/chart/
 *
 * @param {Chart} Is a reference to the Chart instance.
 */
type GraphTypePlotter = (selection: Selection<any, FunctionPlotDatum, any, any>) => any;
/**
 * GraphTypeBuilder is a graph type builder, functionPlot uses the standard d3 reusable char pattern,
 * it corresponds to the `chart` function descripbed in detail in https://bost.ocks.org/mike/chart/
 *
 * @param {Chart} Is a reference to the Chart instance.
 */
type GraphTypeBuilder = (chart: Chart) => GraphTypePlotter;
export { GraphTypePlotter, GraphTypeBuilder };
