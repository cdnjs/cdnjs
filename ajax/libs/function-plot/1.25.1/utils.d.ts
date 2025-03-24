import { FunctionPlotDatum, FunctionPlotOptionsAxis } from './types';
declare const utils: {
    linspace: (lo: number, hi: number, n: number) => number[];
    logspace: (lo: number, hi: number, n: number) => number[];
    isValidNumber: (v: number) => boolean;
    space: (axis: FunctionPlotOptionsAxis, range: [number, number], n: number) => any;
    getterSetter: (config: any, option: string) => void;
    sgn: (v: number) => 0 | 1 | -1;
    clamp: (v: number, vMin: number, vMax: number) => number;
    color: (data: FunctionPlotDatum, index: number) => string;
    /**
     * Infinity is a value that is close to Infinity but not Infinity, it can fit in a JS number.
     */
    infinity: () => number;
};
export default utils;
