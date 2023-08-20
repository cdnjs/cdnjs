/**
 * Envelope is a visual UI for controlling the audio volume and add fade-in and fade-out effects.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
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
type Options = EnvelopePluginOptions & typeof defaultOptions;
export type EnvelopePluginEvents = BasePluginEvents & {
    'fade-in-change': [time: number];
    'fade-out-change': [time: number];
    'volume-change': [volume: number];
};
declare class EnvelopePlugin extends BasePlugin<EnvelopePluginEvents, EnvelopePluginOptions> {
    protected options: Options;
    private polyline;
    private audioContext;
    private gainNode;
    private volume;
    private isFadingIn;
    private isFadingOut;
    private readonly naturalVolumeExponent;
    constructor(options: EnvelopePluginOptions);
    static create(options: EnvelopePluginOptions): EnvelopePlugin;
    destroy(): void;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private initSvg;
    private renderPolyline;
    private initWebAudio;
    private invertNaturalVolume;
    private naturalVolume;
    private setGainValue;
    private initFadeEffects;
    /** Get the current audio volume */
    getCurrentVolume(): number;
    /**
     * Set the fade-in start time.
     * @param time The time (in seconds) to set the fade-in start time to
     * @param moveFadeInEnd Whether to move the drag point to the new time (default: false)
     */
    setStartTime(time: number, moveFadeInEnd?: boolean): void;
    /** Set the fade-out end time.
     * @param time The time (in seconds) to set the fade-out end time to
     * @param moveFadeOutStart Whether to move the drag point to the new time (default: false)
     */
    setEndTime(time: number, moveFadeOutStart?: boolean): void;
    /** Set the fade-in end time.
     * @param time The time (in seconds) to set the fade-in end time to
     */
    setFadeInEnd(time: number): void;
    /** Set the fade-out start time.
     * @param time The time (in seconds) to set the fade-out start time to
     */
    setFadeOutStart(time: number): void;
    /** Set the volume of the audio */
    setVolume(volume: number): void;
}
export default EnvelopePlugin;
