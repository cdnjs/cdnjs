import BasePlugin from '../base-plugin.js';
import { type WaveSurferPluginParams, type WaveSurferOptions } from '../index.js';
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
declare class TimelinePlugin extends BasePlugin<MinimapPluginEvents, MinimapPluginOptions> {
    protected options: MinimapPluginOptions & typeof defaultOptions;
    private minimapWrapper;
    private miniWavesurfer;
    private overlay;
    constructor(params: WaveSurferPluginParams, options: MinimapPluginOptions);
    private initMinimapWrapper;
    private initOverlay;
    private initMinimap;
    /** Unmount */
    destroy(): void;
}
export default TimelinePlugin;
