export default FFT;
/**
 * Calculate FFT - Based on https://github.com/corbanbrook/dsp.js
 *
 * @param {Number} bufferSize Buffer size
 * @param {Number} sampleRate Sample rate
 * @param {Function} windowFunc Window function
 * @param {Number} alpha Alpha channel
 */
declare class FFT {
    constructor(bufferSize: any, sampleRate: any, windowFunc: any, alpha: any);
    bufferSize: any;
    sampleRate: any;
    bandwidth: number;
    sinTable: Float32Array;
    cosTable: Float32Array;
    windowValues: Float32Array;
    reverseTable: Uint32Array;
    peakBand: number;
    peak: number;
    calculateSpectrum(buffer: any): Float32Array;
}
