import { Statable } from '../../interfaces';
import { ChannelNumber } from '../../types';
export type Color = string;
export type GraphicsApi = 'canvas' | 'svg' | '';
export type Gradient = {
    offset: number;
    color: string;
};
export type Gradients = Gradient[];
export type Shape = 'line' | 'rect';
export type Font = {
    family?: string;
    size?: string;
    style?: string;
    weight?: string;
};
export type GraphicsStyles = {
    shape?: Shape;
    gradients?: Gradients;
    wave?: Color;
    grid?: Color;
    text?: Color;
    font?: Font;
    width?: number;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};
export type VisualizerParams = {
    interval?: number;
    styles?: GraphicsStyles;
};
/**
 * This private class is superclass for visualizer class (`TimeOverview`, `Time`, `FFT`).
 * @constructor
 * @abstract
 * @implements {Statable}
 */
export declare abstract class Visualizer implements Statable {
    static readonly XMLNS: "http://www.w3.org/2000/svg";
    static readonly XLINK: "http://www.w3.org/1999/xlink";
    protected static SVG_LINEAR_GRADIENT_ID_TIME_OVERVIEW: string;
    protected static SVG_LINEAR_GRADIENT_ID_TIME: string;
    protected static SVG_LINEAR_GRADIENT_ID_FFT: string;
    protected sampleRate: number;
    protected channel: ChannelNumber;
    protected isActive: boolean;
    protected graphics: GraphicsApi;
    protected canvas: HTMLCanvasElement | null;
    protected context: CanvasRenderingContext2D | null;
    protected svg: SVGSVGElement | null;
    protected interval: number;
    protected styles: GraphicsStyles;
    /**
     * @param {number} sampleRate This argument is sample rate.
     */
    constructor(sampleRate: number, channel: ChannelNumber);
    /**
     * This method sets up for using Canvas or SVG.
     * @param {HTMLCanvasElement|SVGSVGElement} element This argument is either `HTMLCanvasElement` or `SVGSVGElement`.
     * @return {Visualizer} Return value is for method chain.
     */
    setup(element: HTMLCanvasElement | SVGSVGElement): Visualizer;
    /**
     * This method visualizes sound wave to Canvas or SVG. This method conceals difference of API for visualization.
     * @param {Uint8Array|Float32Array} data This argument is sound data for visualization.
     * @param {number} minDecibels This argument is parameter for spectrum. The default value is -100 dB.
     * @param {number} maxDecibels This argument is parameter for spectrum. The default value is -30 dB.
     * @return {Visualizer} Return value is for method chain.
     */
    start(data: Uint8Array | Float32Array, minDecibels?: number, maxDecibels?: number): Visualizer;
    /**
     * This method gets or sets parameters for visualization.
     * This method is overloaded for type interface and type check.
     * @param {keyof VisualizerParams|VisualizerParams} params This argument is string if getter. Otherwise, setter.
     * @return {VisualizerParams[keyof VisualizerParams]} Return value is parameter for visualization if getter.
     */
    param(params: 'interval'): number;
    param(params: 'styles'): GraphicsStyles;
    param(params: VisualizerParams): void;
    /**
     * This method gets instance of `HTMLCanvasElement` or `SVGSVGElement`.
     * @return {HTMLCanvasElement|SVGSVGElement|null}
     */
    get(): HTMLCanvasElement | SVGSVGElement | null;
    /**
     * This method clears graphics.
     * @return {Visualizer} Return value is for method chain.
     */
    clear(): Visualizer;
    /**
     * This method creates visualized graphics as string (Data URL or SVG).
     * @return {string}
     */
    create(): string;
    /**
     * This method gets visualizer state. If returns `true`, visualizer is active.
     * @return {boolean}
     */
    state(): boolean;
    /**
     * This method activates visualizer.
     * @return {Visualizer} Return value is for method chain.
     */
    activate(): Visualizer;
    /**
     * This method deactivates visualizer.
     * @return {Visualizer} Return value is for method chain.
     */
    deactivate(): Visualizer;
    /**
     * This method visualizes time domain data (`Float32Array`) to Canvas.
     * @param {CanvasRenderingContext2D} context This argument is instance of `CanvasRenderingContext2D`.
     * @param {Float32Array} data This argument is time domain data.
     * @param {number} innerWidth This argument is width of visualization area.
     * @param {number} innerHeight This argument is height of visualization area.
     * @param {number} middle This argument is middle of visualization area.
     * @param {number} numberOfPlots This argument is interval for visualization.
     */
    protected visualizeTimeDomainFloat32ArrayOnCanvas(context: CanvasRenderingContext2D, data: Float32Array, innerWidth: number, innerHeight: number, middle: number, numberOfPlots?: number): void;
    /**
     * This method visualizes time domain data (`Float32Array`) to SVG.
     * @param {Float32Array} data This argument is time domain data.
     * @param {number} innerWidth This argument is width of visualization area.
     * @param {number} innerHeight This argument is height of visualization area.
     * @param {number} middle This argument is middle of visualization area.
     * @param {number} numberOfPlots This argument is interval for visualization.
     * @param {string} linearGradientId This argument is `id` attribute for `SVGLinearGradientElement`.
     * @return {SVGPathElement|SVGGElement} This value is instance of `SVGPathElement` or `SVGGElement`.
     */
    protected visualizeTimeDomainFloat32ArrayBySVG(data: Float32Array, innerWidth: number, innerHeight: number, middle: number, numberOfPlots: number, linearGradientId: string): SVGPathElement | SVGGElement | null;
    /**
     * This method creates elements for SVG linear gradient.
     * @param {string} linearGradientId This argument is `id` attribute for `SVGLinearGradientElement`.
     * @return {SVGDefsElement} This value is as instance of `SVGDefsElement`.
     */
    protected createSVGLinearGradient(linearGradientId: string): SVGDefsElement | null;
    /**
     * This method creates string for font styles.
     * @return {string}
     */
    protected createFontString(): string;
    /** @abstract */
    protected abstract visualizeOnCanvas(data: Uint8Array | Float32Array, minDecibels?: number, maxDecibels?: number): void;
    /** @abstract */
    protected abstract visualizeBySVG(data: Uint8Array | Float32Array, minDecibels?: number, maxDecibels?: number): void;
}
//# sourceMappingURL=Visualizer.d.ts.map