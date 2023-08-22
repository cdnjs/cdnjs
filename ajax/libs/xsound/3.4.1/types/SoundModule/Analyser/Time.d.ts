import { ChannelNumber } from '/src/types';
import { DataType } from '/src/SoundModule/Analyser';
import { Visualizer, VisualizerParams, GraphicsStyles } from '/src/SoundModule/Analyser/Visualizer';
export type TimeParams = VisualizerParams & {
    type?: DataType;
    textInterval?: number;
};
/**
 * This private class visualizes sound wave in time domain.
 * @constructor
 * @extends {Visualizer}
 */
export declare class Time extends Visualizer {
    private type;
    private textInterval;
    /**
     * @param {number} sampleRate This argument is sample rate.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     */
    constructor(sampleRate: number, channel: ChannelNumber);
    /** @override */
    setup(element: HTMLCanvasElement | SVGSVGElement): Time;
    /**
     * This method gets or sets parameters for visualizing sound wave.
     * This method is overloaded for type interface and type check.
     * @param {keyof TimeParams|TimeParams} params This argument is string if getter. Otherwise, setter.
     * @return {TimeParams[keyof TimeParams]|Time} Return value is parameter for visualizing sound wave if getter.
     *     Otherwise, return value is for method chain.
     * @override
     */
    param(params: 'interval'): number;
    param(params: 'styles'): GraphicsStyles;
    param(params: 'type'): DataType;
    param(params: 'textInterval'): number;
    param(params: TimeParams): Time;
    /** @override */
    clear(): Time;
    /** @override */
    activate(): Time;
    /** @override */
    deactivate(): Time;
    /**
     * This method visualizes sound wave in time domain to Canvas.
     * @param {Uint8Array|Float32Array} data This argument is sound data for visualization.
     * @override
     */
    protected visualizeOnCanvas(data: Uint8Array | Float32Array, _minDecibels?: number, _maxDecibels?: number): void;
    /**
     * This method visualizes sound wave in time domain to SVG.
     * @param {Uint8Array|Float32Array} data This argument is sound data for visualization.
     * @override
     */
    protected visualizeBySVG(data: Uint8Array | Float32Array, _minDecibels?: number, _maxDecibels?: number): void;
}
//# sourceMappingURL=Time.d.ts.map