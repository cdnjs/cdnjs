import { Chart } from './index';
import { FunctionPlotDatum } from './types';
/**
 * Decides which sampler function to call based on the options
 * of `data`
 *
 * @param {Object} chart Chart instance which is orchestrating this sampling operation
 * @param {Object} d a.k.a a single item from `data`
 * @returns {Array}
 */
declare function evaluate(chart: Chart, d: FunctionPlotDatum): any;
export default evaluate;
