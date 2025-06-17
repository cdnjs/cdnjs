/**
 * Zoom plugin
 *
 * Zoom in or out on the waveform when scrolling the mouse wheel
 *
 * @author HoodyHuo (https://github.com/HoodyHuo)
 * @author Chris Morbitzer (https://github.com/cmorbitzer)
 * @author Sam Hulick (https://github.com/ffxsam)
 * @autor Gustav Sollenius (https://github.com/gustavsollenius)
 *
 * @example
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     ZoomPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
import { BasePlugin, BasePluginEvents } from '../base-plugin.js';
export type ZoomPluginOptions = {
    /**
     * The amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
     *
     * @default 0.5
     */
    scale?: number;
    maxZoom?: number;
    /**
     * The amount the wheel or trackpad needs to be moved before zooming the waveform. Set this value to 0 to have totally
     * fluid zooming (this has a high CPU cost).
     *
     * @default 5
     */
    deltaThreshold?: number;
    /**
     * Whether to zoom into the waveform using a consistent exponential factor instead of a linear scale.
     * Exponential zooming ensures the zoom steps feel uniform regardless of scale.
     * When disabled, the zooming is linear and influenced by the `scale` parameter.
     *
     * @default false
     */
    exponentialZooming?: boolean;
    /**
     * Number of steps required to zoom from the initial zoom level to `maxZoom`.
     *
     * @default 20
     */
    iterations?: number;
};
declare const defaultOptions: {
    scale: number;
    deltaThreshold: number;
    exponentialZooming: boolean;
    iterations: number;
};
export type ZoomPluginEvents = BasePluginEvents;
declare class ZoomPlugin extends BasePlugin<ZoomPluginEvents, ZoomPluginOptions> {
    protected options: ZoomPluginOptions & typeof defaultOptions;
    private wrapper;
    private container;
    private accumulatedDelta;
    private pointerTime;
    private oldX;
    private endZoom;
    private startZoom;
    constructor(options?: ZoomPluginOptions);
    static create(options?: ZoomPluginOptions): ZoomPlugin;
    onInit(): void;
    private onWheel;
    private calculateNewZoom;
    destroy(): void;
}
export default ZoomPlugin;
