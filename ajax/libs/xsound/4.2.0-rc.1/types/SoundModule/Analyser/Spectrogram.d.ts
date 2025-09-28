import type { ChannelNumber } from '../../types';
import type { VisualizerParams, GraphicsStyles, SpectrumScale } from './Visualizer';
import { Visualizer } from './Visualizer';
export type SpectrogramParams = VisualizerParams & {
    size?: number;
    scale?: SpectrumScale;
    plotInterval?: number;
    readonly minFrequency?: number;
    readonly maxFrequency?: number;
};
/**
 * This private class visualizes spectrogram.
 */
export declare class Spectrogram extends Visualizer {
    private static readonly MIN_FREQUENCY;
    private static readonly MAX_FREQUENCY;
    private static readonly LOGARITHMIC_FREQUENCIES;
    private scale;
    private plotInterval;
    private timeOffset;
    private renderSize;
    private imagedata;
    private colorFromNumber;
    /**
     * This function maps unsigned int 8 bits to alpha value.
     * @param {Uint8Array[0]} data This argument is converted to alpha value based on mapping algorithm.
     * @return {string} Return value is alpha value between `0%` and `100%`.
     */
    static numberToAlpha(data: Uint8Array[0]): string;
    /**
     * @param {number} sampleRate This argument is sample rate.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     */
    constructor(sampleRate: number, channel: ChannelNumber);
    /**
     * This method gets or sets parameters for visualizing spectrogram.
     * This method is overloaded for type interface and type check.
     * @param {keyof SpectrogramParams|SpectrogramParams} params This argument is string if getter. Otherwise, setter.
     * @return {SpectrogramParams[keyof SpectrogramParams]|Spectrogram} Return value is parameter for visualizing spectrogram if getter.
     *     Otherwise, return value is for method chain.
     * @override
     */
    param(params: 'interval'): number;
    param(params: 'styles'): GraphicsStyles;
    param(params: 'size'): number;
    param(params: 'scale'): SpectrumScale;
    param(params: 'plotInterval'): number;
    param(params: 'minFrequency'): number;
    param(params: 'maxFrequency'): number;
    param(params: SpectrogramParams): Spectrogram;
    /**
     * This method sets function that converts number to color string.
     * @param {function} func This argument is function that converts number to color string;
     * @return {Spectrogram} Return value is for method chain.
     */
    setColorFromNumberFunction(func: ((data: Uint8Array[0]) => string) | null): Spectrogram;
    /**
     * This method visualizes spectrogram to Canvas.
     * @param {Uint8Array} data This argument is frequency domain data for spectrogram.
     * @override
     */
    protected visualizeOnCanvas(data: Uint8Array): void;
    /**
     * This method visualizes spectrogram to SVG.
     * @param {Uint8Array} data This argument is frequency domain data for spectrogram.
     * @override
     */
    protected visualizeBySVG(data: Uint8Array): void;
}
//# sourceMappingURL=Spectrogram.d.ts.map