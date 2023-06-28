/**
 * @typedef {Object} SpectrogramPluginParams
 * @property {string|HTMLElement} container Selector of element or element in
 * which to render
 * @property {number} fftSamples=512 Number of samples to fetch to FFT. Must be
 * a power of 2.
 * @property {boolean} splitChannels=false Render with separate spectrograms for
 * the channels of the audio
 * @property {number} height=fftSamples/2 Height of the spectrogram view in CSS
 * pixels
 * @property {boolean} labels Set to true to display frequency labels.
 * @property {number} noverlap Size of the overlapping window. Must be <
 * fftSamples. Auto deduced from canvas size by default.
 * @property {string} windowFunc='hann' The window function to be used. One of
 * these: `'bartlett'`, `'bartlettHann'`, `'blackman'`, `'cosine'`, `'gauss'`,
 * `'hamming'`, `'hann'`, `'lanczoz'`, `'rectangular'`, `'triangular'`
 * @property {?number} alpha Some window functions have this extra value.
 * (Between 0 and 1)
 * @property {number} pixelRatio=wavesurfer.params.pixelRatio to control the
 * size of the spectrogram in relation with its canvas. 1 = Draw on the whole
 * canvas. 2 = Draw on a quarter (1/2 the length and 1/2 the width)
 * @property {number} frequencyMin=0 Min frequency to scale spectrogram.
 * @property {number} frequencyMax=12000 Max frequency to scale spectrogram.
 * Set this to samplerate/2 to draw whole range of spectrogram.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('spectrogram')`
 * @property {?number[][]} colorMap A 256 long array of 4-element arrays.
 * Each entry should contain a float between 0 and 1 and specify
 * r, g, b, and alpha.
 */
/**
 * Render a spectrogram visualisation of the audio.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import SpectrogramPlugin from 'wavesurfer.spectrogram.js';
 *
 * // commonjs
 * var SpectrogramPlugin = require('wavesurfer.spectrogram.js');
 *
 * // if you are using <script> tags
 * var SpectrogramPlugin = window.WaveSurfer.spectrogram;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     SpectrogramPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
export default class SpectrogramPlugin implements PluginClass {
    /**
     * Spectrogram plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {SpectrogramPluginParams} params Parameters used to initialise the plugin
     * @return {PluginDefinition} An object representing the plugin.
     */
    static create(params: SpectrogramPluginParams): PluginDefinition;
    constructor(params: any, ws: any);
    params: any;
    wavesurfer: any;
    util: any;
    frequenciesDataUrl: any;
    _onScroll: (e: any) => void;
    _onRender: () => void;
    _onWrapperClick: (e: any) => void;
    _onReady: () => void;
    container: any;
    colorMap: any;
    width: any;
    pixelRatio: any;
    fftSamples: any;
    height: any;
    noverlap: any;
    windowFunc: any;
    alpha: any;
    splitChannels: any;
    channels: number;
    frequencyMin: any;
    frequencyMax: any;
    init(): void;
    destroy(): void;
    wrapper: HTMLElement | null | undefined;
    createWrapper(): void;
    labelsEl: HTMLCanvasElement | undefined;
    _wrapperClickHandler(event: any): void;
    createCanvas(): void;
    canvas: HTMLCanvasElement | undefined;
    spectrCc: CanvasRenderingContext2D | null | undefined;
    render(): void;
    updateCanvasStyle(): void;
    drawSpectrogram(frequenciesData: any, my: any): void;
    getFrequencies(callback: any): void;
    buffer: any;
    loadFrequenciesData(url: any): any;
    freqType(freq: any): string | number;
    unitType(freq: any): "KHz" | "Hz";
    loadLabels(bgFill: any, fontSizeFreq: any, fontSizeUnit: any, fontType: any, textColorFreq: any, textColorUnit: any, textAlign: any, container: any): void;
    updateScroll(e: any): void;
    resample(oldMatrix: any): Uint8Array[];
}
export type SpectrogramPluginParams = {
    /**
     * Selector of element or element in
     * which to render
     */
    container: string | HTMLElement;
    /**
     * =512 Number of samples to fetch to FFT. Must be
     * a power of 2.
     */
    fftSamples: number;
    /**
     * =false Render with separate spectrograms for
     * the channels of the audio
     */
    splitChannels: boolean;
    /**
     * =fftSamples/2 Height of the spectrogram view in CSS
     * pixels
     */
    height: number;
    /**
     * Set to true to display frequency labels.
     */
    labels: boolean;
    /**
     * Size of the overlapping window. Must be <
     * fftSamples. Auto deduced from canvas size by default.
     */
    noverlap: number;
    /**
     * ='hann' The window function to be used. One of
     * these: `'bartlett'`, `'bartlettHann'`, `'blackman'`, `'cosine'`, `'gauss'`,
     * `'hamming'`, `'hann'`, `'lanczoz'`, `'rectangular'`, `'triangular'`
     */
    windowFunc: string;
    /**
     * Some window functions have this extra value.
     * (Between 0 and 1)
     */
    alpha: number | null;
    /**
     * =wavesurfer.params.pixelRatio to control the
     * size of the spectrogram in relation with its canvas. 1 = Draw on the whole
     * canvas. 2 = Draw on a quarter (1/2 the length and 1/2 the width)
     */
    pixelRatio: number;
    /**
     * =0 Min frequency to scale spectrogram.
     */
    frequencyMin: number;
    /**
     * =12000 Max frequency to scale spectrogram.
     * Set this to samplerate/2 to draw whole range of spectrogram.
     */
    frequencyMax: number;
    /**
     * Set to true to manually call
     * `initPlugin('spectrogram')`
     */
    deferInit: boolean | null;
    /**
     * A 256 long array of 4-element arrays.
     * Each entry should contain a float between 0 and 1 and specify
     * r, g, b, and alpha.
     */
    colorMap: number[][] | null;
};
