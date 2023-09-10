/**
 * The Hover plugin follows the mouse and shows a timestamp
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type HoverPluginOptions = {
    lineColor?: string;
    lineWidth?: string | number;
    labelColor?: string;
    labelSize?: string | number;
    labelBackground?: string;
};
declare const defaultOptions: {
    lineWidth: number;
    labelSize: number;
};
export type HoverPluginEvents = BasePluginEvents & {
    hover: [relX: number];
};
declare class HoverPlugin extends BasePlugin<HoverPluginEvents, HoverPluginOptions> {
    protected options: HoverPluginOptions & typeof defaultOptions;
    private wrapper;
    private label;
    private unsubscribe;
    constructor(options?: HoverPluginOptions);
    static create(options?: HoverPluginOptions): HoverPlugin;
    private addUnits;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private formatTime;
    private onPointerMove;
    private onPointerLeave;
    /** Unmount */
    destroy(): void;
}
export default HoverPlugin;
