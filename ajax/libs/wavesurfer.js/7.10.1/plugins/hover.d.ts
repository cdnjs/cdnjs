/**
 * The Hover plugin follows the mouse and shows a timestamp
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type HoverPluginOptions = {
    /** The hover cursor color (playback cursor and progress mask colors used as falllback in this order)
     */
    lineColor?: string;
    /**
     * The hover cursor width (pixels used if no units specified)
     * @default 1
     */
    lineWidth?: string | number;
    /** The color of the label text */
    labelColor?: string;
    /**
     * The font size of the label text (pixels used if no units specified)
     * @default 11
     */
    labelSize?: string | number;
    /** The background color of the label */
    labelBackground?: string;
    /**
     * Whether to display the label to the left of the cursor if possible
     * @default false
     */
    labelPreferLeft?: boolean;
    /** Custom function to customize the displayed label text (m:ss used if not specified) */
    formatTimeCallback?: (seconds: number) => string;
};
declare const defaultOptions: {
    lineWidth: number;
    labelSize: number;
    labelPreferLeft: boolean;
    formatTimeCallback(seconds: number): string;
};
export type HoverPluginEvents = BasePluginEvents & {
    hover: [relX: number];
};
declare class HoverPlugin extends BasePlugin<HoverPluginEvents, HoverPluginOptions> {
    protected options: HoverPluginOptions & typeof defaultOptions;
    private wrapper;
    private label;
    private lastPointerMove;
    private unsubscribe;
    constructor(options?: HoverPluginOptions);
    static create(options?: HoverPluginOptions): HoverPlugin;
    private addUnits;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private onPointerMove;
    private onPointerLeave;
    /** Unmount */
    destroy(): void;
}
export default HoverPlugin;
