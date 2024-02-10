import { FunctionPlotDatum, FunctionPlotScale, FunctionPlotOptionsAxis } from '../types.js';
export type SamplerParams = {
    d: FunctionPlotDatum;
    range: [number, number];
    xScale: FunctionPlotScale;
    yScale: FunctionPlotScale;
    xAxis: FunctionPlotOptionsAxis;
    yAxis: FunctionPlotOptionsAxis;
    nSamples: number;
    nGroups?: number;
};
export type TInterval = {
    lo: number;
    hi: number;
};
export type IntervalSamplerResultSingle = [TInterval, TInterval] | null;
export type IntervalSamplerResultGroup = Array<IntervalSamplerResultSingle>;
export type IntervalSamplerResult = Array<IntervalSamplerResultGroup>;
export type SamplerFn = (samplerParams: SamplerParams) => Array<any>;
export type AsyncSamplerFn = (samplerParams: SamplerParams) => Promise<Array<any>>;
