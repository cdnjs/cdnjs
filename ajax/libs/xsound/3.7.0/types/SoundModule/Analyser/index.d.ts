import { Connectable } from '../../interfaces';
import { ChannelNumber } from '../../types';
import { Visualizer, VisualizerParams, Color, GraphicsApi, Gradient, Gradients, Shape, Font, GraphicsStyles } from './Visualizer';
import { TimeOverview, TimeOverviewParams, CurrentTimeStyles, MouseEventTypes, DragMode, DragCallbackFunction } from './TimeOverview';
import { Time, TimeParams } from './Time';
import { FFT, FFTParams, SpectrumScale } from './FFT';
export type Domain = 'timeoverview' | 'time' | 'fft';
export type DataType = 'uint' | 'float';
export type FFTSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
export type { Visualizer, VisualizerParams, Color, GraphicsApi, Gradient, Gradients, Shape, Font, GraphicsStyles, TimeOverview, TimeOverviewParams, CurrentTimeStyles, MouseEventTypes, DragMode, DragCallbackFunction, Time, TimeParams, FFT, FFTParams, SpectrumScale };
export type AnalyserParams = {
    fftSize?: FFTSize;
    readonly frequencyBinCount?: number;
    minDecibels?: number;
    maxDecibels?: number;
    smoothingTimeConstant?: number;
};
/**
 * This private class manages 3 private classes (`TimeOverview`, `Time`, `FFT`) for visualizing sound wave.
 * @constructor
 * @implements {Connectable}
 */
export declare class Analyser implements Connectable {
    private analyser;
    private input;
    private timeOverviewL;
    private timeOverviewR;
    private time;
    private fft;
    private timeDomainAnimationId;
    private timeDomainTimerId;
    private frequencyDomainAnimationId;
    private frequencyDomainTimerId;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method visualizes sound wave.
     * @param {Domain} domain This argument is one of 'timeoverview', 'time', 'fft'.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     * @param {AudioBuffer} buffer This argument is instance of `AudioBuffer` (If domain is 'timeoverview', this argument is required).
     * @return {Analyser} Return value is for method chain.
     */
    start(domain: Domain, channel?: ChannelNumber, buffer?: AudioBuffer): Analyser;
    /**
     * This method stops visualizer.
     * @param {Domain} domain This argument is one of 'timeoverview', 'time', 'fft'.
     * @return {Analyser} Return value is for method chain.
     */
    stop(domain: Domain): Analyser;
    /**
     * This method gets or sets parameters for analyser.
     * This method is overloaded for type interface and type check.
     * @param {keyof AnalyserParams|AnalyserParams} params This argument is string if getter. Otherwise, setter.
     * @return {AnalyserParams[keyof AnalyserParams]|Analyser} Return value is parameter for analyser if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'fftSize'): number;
    param(params: 'frequencyBinCount'): number;
    param(params: 'minDecibels'): number;
    param(params: 'maxDecibels'): number;
    param(params: 'smoothingTimeConstant'): number;
    param(params: AnalyserParams): Analyser;
    /**
     * This method selects domain for visualization.
     * This method is overloaded for type interface and type check.
     * @param {Domain} domain This argument is one of 'timeoverview', 'time', 'fft'.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     * @return {TimeOverview|Time|FFT|Analyser} Return value is instance of selected `Visualizer` class.
     */
    domain(domain: 'timeoverview', channel?: ChannelNumber): TimeOverview;
    domain(domain: 'time', channel?: ChannelNumber): Time;
    domain(domain: 'fft', channel?: ChannelNumber): FFT;
    /**
     * This method gets instance of `AnalyserNode`.
     * @return {AnalyserNode}
     */
    get(): AnalyserNode;
    /** @override */
    get INPUT(): GainNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map