import './polyfills';
import { FunctionPlotOptions } from './types';
import { Chart, ChartMeta, ChartMetaMargin } from './chart';
import { registerGraphType } from './globals';
import { polyline, interval, scatter } from './graph-types';
/**
 * functionPlot is a function plotter of 2d functions.
 *
 * functionPlot creates an instance of {@link Chart} with the param options
 * and immediately calls {@link Chart#build} on it.
 *
 * `options` is augmented with additional internal computed data,
 * therefore, if you want to rerender graphs it's important to reuse
 * the same object to preserve state across builds.
 *
 * @param options The options sent to Chart
 */
declare function functionPlot(options: FunctionPlotOptions): Chart;
declare namespace functionPlot {
    var globals: import("./globals").TGlobals;
    var $eval: typeof import("./helpers/eval");
    var graphTypes: {
        interval: typeof interval;
        polyline: typeof polyline;
        scatter: typeof scatter;
    };
}
export default functionPlot;
export * from './types';
export { Chart, ChartMeta, ChartMetaMargin };
export { registerGraphType };
export { builtIn as EvalBuiltIn, interval as EvalInterval } from './helpers/eval';
export { TGlobals } from './globals';
export { interval as GraphTypeInterval, polyline as GraphTypePolyline, scatter as GraphTypeScatter } from './graph-types';
export { GraphTypePlotter, GraphTypeBuilder } from './graph-types/types';
export * from './helpers';
