/**
 * Zoom plugin
 *
 * Zoom in or out on the waveform when scrolling the mouse wheel
 *
 * @author HoodyHuo (https://github.com/HoodyHuo)
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
    scale?: number;
};
declare const defaultOptions: {
    scale: number;
};
export type ZoomPluginEvents = BasePluginEvents;
declare class ZoomPlugin extends BasePlugin<ZoomPluginEvents, ZoomPluginOptions> {
    protected options: ZoomPluginOptions & typeof defaultOptions;
    private wrapper;
    private container;
    constructor(options?: ZoomPluginOptions);
    static create(options?: ZoomPluginOptions): ZoomPlugin;
    onInit(): void;
    private onWheel;
    destroy(): void;
}
export default ZoomPlugin;
