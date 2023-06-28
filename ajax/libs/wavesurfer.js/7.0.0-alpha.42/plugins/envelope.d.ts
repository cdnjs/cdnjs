/**
 * Envelope is a visual UI for controlling the audio volume and add fade-in and fade-out effects.
 */
import BasePlugin, { type WaveSurferPluginParams } from '../base-plugin.js';
export type EnvelopePluginOptions = {
    fadeInStart?: number;
    fadeInEnd?: number;
    fadeOutStart?: number;
    fadeOutEnd?: number;
    volume?: number;
    lineWidth?: string;
    lineColor?: string;
    dragPointSize?: number;
    dragPointFill?: string;
    dragPointStroke?: string;
};
declare const defaultOptions: {
    fadeInStart: number;
    fadeOutEnd: number;
    fadeInEnd: number;
    fadeOutStart: number;
    lineWidth: number;
    lineColor: string;
    dragPointSize: number;
    dragPointFill: string;
    dragPointStroke: string;
};
export type EnvelopePluginEvents = {
    'fade-in-change': [time: number];
    'fade-out-change': [time: number];
    'volume-change': [volume: number];
};
declare class EnvelopePlugin extends BasePlugin<EnvelopePluginEvents, EnvelopePluginOptions> {
    protected options: EnvelopePluginOptions & typeof defaultOptions;
    private svg;
    private audioContext;
    private gainNode;
    private volume;
    private isFadingIn;
    private isFadingOut;
    constructor(options: EnvelopePluginOptions);
    static create(options: EnvelopePluginOptions): EnvelopePlugin;
    /** Called by wavesurfer, don't call manually */
    init(params: WaveSurferPluginParams): void;
    private makeDraggable;
    private renderPolyline;
    private initSvg;
    destroy(): void;
    private initWebAudio;
    private naturalVolume;
    private onVolumeChange;
    private initFadeEffects;
    getCurrentVolume(): number;
    setStartTime(time: number): void;
    setEndTime(time: number): void;
}
export default EnvelopePlugin;
