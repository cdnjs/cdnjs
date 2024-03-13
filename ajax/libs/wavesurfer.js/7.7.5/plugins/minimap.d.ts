/**
 * Minimap is a tiny copy of the main waveform serving as a navigation tool.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
import { type WaveSurferOptions } from '../wavesurfer.js';
export type MinimapPluginOptions = {
    overlayColor?: string;
    insertPosition?: InsertPosition;
} & Partial<WaveSurferOptions>;
declare const defaultOptions: {
    height: number;
    overlayColor: string;
    insertPosition: string;
};
export type MinimapPluginEvents = BasePluginEvents & {
    ready: [];
    interaction: [];
};
declare class MinimapPlugin extends BasePlugin<MinimapPluginEvents, MinimapPluginOptions> {
    protected options: MinimapPluginOptions & typeof defaultOptions;
    private minimapWrapper;
    private miniWavesurfer;
    private overlay;
    private container;
    constructor(options: MinimapPluginOptions);
    static create(options: MinimapPluginOptions): MinimapPlugin;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private initMinimapWrapper;
    private initOverlay;
    private initMinimap;
    private getOverlayWidth;
    private onRedraw;
    private onScroll;
    private initWaveSurferEvents;
    /** Unmount */
    destroy(): void;
}
export default MinimapPlugin;
