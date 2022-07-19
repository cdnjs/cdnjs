import { Chart } from "../index";
import { FunctionPlotDatum } from '../types';
declare const sampler: (chart: Chart, d: FunctionPlotDatum, range: [number, number], nSamples: number) => any;
export default sampler;
