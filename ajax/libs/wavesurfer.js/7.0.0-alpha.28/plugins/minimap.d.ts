import BasePlugin from '../base-plugin.js';
import { type WaveSurferPluginParams, type WaveSurferOptions } from '../wavesurfer.js';
export type MinimapPluginOptions = {
    overlayColor?: string;
} & WaveSurferOptions;
declare const defaultOptions: {
    height: number;
    overlayColor: string;
};
export type MinimapPluginEvents = {
    ready: void;
};
declare class MinimapPlugin extends BasePlugin<MinimapPluginEvents, MinimapPluginOptions> {
    protected options: MinimapPluginOptions & typeof defaultOptions;
    private minimapWrapper;
    private miniWavesurfer;
    private overlay;
    constructor(options: MinimapPluginOptions);
    static create(options: MinimapPluginOptions): MinimapPlugin;
    init(params: WaveSurferPluginParams): void;
    private initMinimapWrapper;
    private initOverlay;
    private initMinimap;
    /** Unmount */
    destroy(): void;
}
export default MinimapPlugin;
