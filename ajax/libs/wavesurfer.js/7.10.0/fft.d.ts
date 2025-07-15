/**
 * FFT (Fast Fourier Transform) implementation
 * Based on https://github.com/corbanbrook/dsp.js
 *
 * Centralized FFT functionality for spectrogram plugins
 */
export declare const ERB_A: number;
export declare function hzToMel(hz: number): number;
export declare function melToHz(mel: number): number;
export declare function hzToLog(hz: number): number;
export declare function logToHz(log: number): number;
export declare function hzToBark(hz: number): number;
export declare function barkToHz(bark: number): number;
export declare function hzToErb(hz: number): number;
export declare function erbToHz(erb: number): number;
export declare function hzToScale(hz: number, scale: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb'): number;
export declare function scaleToHz(scale: number, scaleType: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb'): number;
export declare function applyFilterBank(fftPoints: Float32Array, filterBank: number[][]): Float32Array;
export declare function createFilterBankForScale(scale: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb', numFilters: number, fftSamples: number, sampleRate: number): number[][] | null;
export declare const COLOR_MAPS: {
    gray: () => number[][];
    igray: () => number[][];
    roseus: () => number[][];
};
/**
 * Set up color map based on options
 */
export declare function setupColorMap(colorMap?: number[][] | 'gray' | 'igray' | 'roseus'): number[][];
/**
 * Format frequency value for display
 */
export declare function freqType(freq: number): string;
/**
 * Get frequency unit for display
 */
export declare function unitType(freq: number): string;
/**
 * Get frequency value for label at given index
 */
export declare function getLabelFrequency(index: number, labelIndex: number, frequencyMin: number, frequencyMax: number, scale: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb'): number;
/**
 * Create wrapper click handler for relative position calculation
 */
export declare function createWrapperClickHandler(wrapper: HTMLElement, emit: (event: string, ...args: any[]) => void): (e: MouseEvent) => void;
/**
 * Calculate FFT - Based on https://github.com/corbanbrook/dsp.js
 */
declare function FFT(bufferSize: number, sampleRate: number, windowFunc: string, alpha: number): void;
export declare class FFT {
    constructor(bufferSize: number, sampleRate: number, windowFunc: string, alpha: number);
    calculateSpectrum(buffer: Float32Array): Float32Array;
}
export { FFT };
export default FFT;
