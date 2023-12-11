import { Chart } from './index';
import { FunctionPlotDatum } from './types';
declare const utils: {
    linspace: (lo: number, hi: number, n: number) => number[];
    logspace: (lo: number, hi: number, n: number) => number[];
    isValidNumber: (v: number) => boolean;
    space: (chart: Chart, range: [number, number], n: number) => any;
    getterSetter: (config: any, option: string) => void;
    sgn: (v: number) => 1 | 0 | -1;
    color: (data: FunctionPlotDatum, index: number) => string;
};
export default utils;
