/**
 * Minimap is a tiny copy of the main waveform serving as a navigation tool.
 */
import BasePlugin, { type WaveSurferPluginParams } from '../base-plugin.js';
import { type WaveSurferOptions } from '../wavesurfer.js';
export type MinimapPluginOptions = {
    overlayColor?: string;
    insertPosition?: InsertPosition;
} & WaveSurferOptions;
declare const defaultOptions: {
    height: number;
    overlayColor: string;
    insertPosition: string;
};
export type MinimapPluginEvents = {
    ready: [];
    interaction: [];
};
declare class MinimapPlugin extends BasePlugin<MinimapPluginEvents, MinimapPluginOptions> {
    protected options: MinimapPluginOptions & typeof defaultOptions;
    private minimapWrapper;
    private miniWavesurfer;
    private overlay;
    constructor(options: MinimapPluginOptions);
    static create(options: MinimapPluginOptions): MinimapPlugin;
    /** Called by wavesurfer, don't call manually */
    init(params: WaveSurferPluginParams): void;
    private initMinimapWrapper;
    private initOverlay;
    private initMinimap;
    /** Unmount */
    destroy(): void;
}
export default MinimapPlugin;
