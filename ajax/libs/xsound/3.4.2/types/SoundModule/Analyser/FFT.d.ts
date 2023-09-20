import { ChannelNumber } from '/src/types';
import { DataType } from '/src/SoundModule/Analyser';
import { Visualizer, VisualizerParams, GraphicsStyles } from '/src/SoundModule/Analyser/Visualizer';
export type SpectrumScale = 'linear' | 'logarithmic';
export type FFTParams = VisualizerParams & {
    type?: DataType;
    size?: number;
    textInterval?: number;
    scale?: SpectrumScale;
    readonly minFrequency?: number;
    readonly maxFrequency?: number;
};
/**
 * This private class visualizes spectrum.
 * @constructor
 * @extends {Visualizer}
 */
export declare class FFT extends Visualizer {
    private static readonly MIN_FREQUENCY;
    private static readonly MAX_FREQUENCY;
    private static readonly LOGARITHMIC_FREQUENCIES;
    private type;
    private size;
    private textInterval;
    private scale;
    /**
     * @param {number} sampleRate This argument is sample rate.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     */
    constructor(sampleRate: number, channel: ChannelNumber);
    /** @override */
    setup(element: HTMLCanvasElement | SVGSVGElement): FFT;
    /**
     * This method gets or sets parameters for visualizing spectrum.
     * This method is overloaded for type interface and type check.
     * @param {keyof FFTParams|FFTParams} params This argument is string if getter. Otherwise, setter.
     * @return {FFTParams[keyof FFTParams]|FFT} Return value is parameter for visualizing spectrum if getter.
     *     Otherwise, return value is for method chain.
     * @override
     */
    param(params: 'interval'): number;
    param(params: 'styles'): GraphicsStyles;
    param(params: 'type'): DataType;
    param(params: 'size'): number;
    param(params: 'textInterval'): number;
    param(params: 'scale'): SpectrumScale;
    param(params: 'minFrequency'): number;
    param(params: 'maxFrequency'): number;
    param(params: FFTParams): FFT;
    /** @override */
    clear(): FFT;
    /** @override */
    activate(): FFT;
    /** @override */
    deactivate(): FFT;
    /**
     * This method visualizes spectrum to Canvas.
     * @param {Uint8Array|Float32Array} data This argument is frequency domain data for spectrum.
     * @param {number} minDecibels This argument is in order to determine dB range of spectrum. The default value is -100 dB.
     * @param {number} maxDecibels This argument is in order to determine db range of spectrum. The default value is -30 dB.
     * @override
     */
    protected visualizeOnCanvas(data: Uint8Array | Float32Array, minDecibels?: number, maxDecibels?: number): void;
    /**
     * This method visualizes spectrum to SVG.
     * @param {Uint8Array|Float32Array} data This argument is frequency domain data for spectrum.
     * @param {number} minDecibels This argument is in order to determine dB range of spectrum. Default value is -100 dB.
     * @param {number} maxDecibels This argument is in order to determine db range of spectrum. Default value is -30 dB.
     * @override
     */
    protected visualizeBySVG(data: Uint8Array | Float32Array, minDecibels?: number, maxDecibels?: number): void;
}
//# sourceMappingURL=FFT.d.ts.map