import BasePlugin from '../base-plugin.js';
import type { WaveSurferPluginParams } from '../index.js';
export type EnvelopePluginOptions = {
    startTime?: number;
    endTime?: number;
    fadeInEnd?: number;
    fadeOutStart?: number;
    volume?: number;
    lineWidth?: string;
    lineColor?: string;
    dragPointSize?: number;
    dragPointFill?: string;
    dragPointStroke?: string;
};
declare const defaultOptions: {
    startTime: number;
    endTime: number;
    fadeInEnd: number;
    fadeOutStart: number;
    lineWidth: number;
    lineColor: string;
    dragPointSize: number;
    dragPointFill: string;
    dragPointStroke: string;
};
type EnvelopePluginEvents = {
    'fade-in-change': {
        time: number;
    };
    'fade-out-change': {
        time: number;
    };
    'volume-change': {
        volume: number;
    };
};
declare class EnvelopePlugin extends BasePlugin<EnvelopePluginEvents, EnvelopePluginOptions> {
    protected options: EnvelopePluginOptions & typeof defaultOptions;
    private svg;
    private audioContext;
    private gainNode;
    private volume;
    private isFadingIn;
    private isFadingOut;
    constructor(params: WaveSurferPluginParams, options: EnvelopePluginOptions);
    private makeDraggable;
    private renderPolyline;
    private initSvg;
    destroy(): void;
    private initWebAudio;
    private naturalVolume;
    private onVolumeChange;
    private initFadeEffects;
    getCurrentVolume(): number;
}
export default EnvelopePlugin;
