/**
 * Spectrogram plugin
 *
 * Render a spectrogram visualisation of the audio.
 *
 * @author Pavel Denisov (https://github.com/akreal)
 * @see https://github.com/wavesurfer-js/wavesurfer.js/pull/337
 *
 * @example
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
/**
 * Spectrogram plugin for wavesurfer.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type SpectrogramPluginOptions = {
    /** Selector of element or element in which to render */
    container?: string | HTMLElement;
    /** Number of samples to fetch to FFT. Must be a power of 2. */
    fftSamples?: number;
    /** Height of the spectrogram view in CSS pixels */
    height?: number;
    /** Set to true to display frequency labels. */
    labels?: boolean;
    labelsBackground?: string;
    labelsColor?: string;
    labelsHzColor?: string;
    /** Size of the overlapping window. Must be < fftSamples. Auto deduced from canvas size by default. */
    noverlap?: number;
    /** The window function to be used. */
    windowFunc?: 'bartlett' | 'bartlettHann' | 'blackman' | 'cosine' | 'gauss' | 'hamming' | 'hann' | 'lanczoz' | 'rectangular' | 'triangular';
    /** Some window functions have this extra value. (Between 0 and 1) */
    alpha?: number;
    /** Min frequency to scale spectrogram. */
    frequencyMin?: number;
    /** Max frequency to scale spectrogram. Set this to samplerate/2 to draw whole range of spectrogram. */
    frequencyMax?: number;
    /**
     * A 256 long array of 4-element arrays. Each entry should contain a float between 0 and 1 and specify r, g, b, and alpha.
     * Each entry should contain a float between 0 and 1 and specify r, g, b, and alpha.
     */
    colorMap?: number[][];
    /** Render a spectrogram for each channel independently when true. */
    splitChannels?: boolean;
};
export type SpectrogramPluginEvents = BasePluginEvents & {
    ready: [];
    click: [relativeX: number];
};
declare class SpectrogramPlugin extends BasePlugin<SpectrogramPluginEvents, SpectrogramPluginOptions> {
    static create(options?: SpectrogramPluginOptions): SpectrogramPlugin;
    constructor(options: SpectrogramPluginOptions);
    onInit(): void;
    destroy(): void;
    loadFrequenciesData(url: string | URL): Promise<void>;
    private createWrapper;
    private createCanvas;
    private render;
    private drawSpectrogram;
    private getFrequencies;
    private freqType;
    private unitType;
    private loadLabels;
    private resample;
}
export default SpectrogramPlugin;
