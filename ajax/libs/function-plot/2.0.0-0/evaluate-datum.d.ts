import { Chart } from './index.js';
import { FunctionPlotDatum } from './types.js';
/**
 * Decides which sampler function to call based on the options
 * of `data`
 *
 * @param {Object} chart Chart instance which is orchestrating this sampling operation
 * @param {Object} d a.k.a a single item from `data`
 * @returns [number, number]
 */
declare function builtInEvaluate(chart: Chart, d: FunctionPlotDatum): any[];
declare function intervalEvaluate(chart: Chart, d: FunctionPlotDatum): any[];
declare function asyncIntervalEvaluate(chart: Chart, d: FunctionPlotDatum): Promise<any[]>;
export { builtInEvaluate, intervalEvaluate, asyncIntervalEvaluate };
