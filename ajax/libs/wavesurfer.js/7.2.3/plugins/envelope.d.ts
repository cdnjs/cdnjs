/**
 * Envelope is a visual UI for controlling the audio volume and add fade-in and fade-out effects.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type EnvelopePoint = {
    id?: string;
    time: number;
    volume: number;
};
export type EnvelopePluginOptions = {
    points?: EnvelopePoint[];
    volume?: number;
    lineWidth?: string;
    lineColor?: string;
    dragLine?: boolean;
    dragPointSize?: number;
    dragPointSizeMobile?: number;
    dragPointFill?: string;
    dragPointStroke?: string;
    /** Deprecated. Use `points` instead. */
    fadeInStart?: number;
    /** Deprecated. Use `points` instead. */
    fadeInEnd?: number;
    /** Deprecated. Use `points` instead. */
    fadeOutStart?: number;
    /** Deprecated. Use `points` instead. */
    fadeOutEnd?: number;
};
declare const defaultOptions: {
    points: EnvelopePoint[];
    lineWidth: number;
    lineColor: string;
    dragPointSize: number;
    dragPointSizeMobile: number;
    dragPointFill: string;
    dragPointStroke: string;
};
type Options = EnvelopePluginOptions & typeof defaultOptions;
export type EnvelopePluginEvents = BasePluginEvents & {
    'points-change': [newPoints: EnvelopePoint[]];
    'volume-change': [volume: number];
};
declare class EnvelopePlugin extends BasePlugin<EnvelopePluginEvents, EnvelopePluginOptions> {
    protected options: Options;
    private polyline;
    private points;
    private throttleTimeout;
    private ac;
    private gain;
    /**
     * Create a new Envelope plugin.
     */
    constructor(options: EnvelopePluginOptions);
    static create(options: EnvelopePluginOptions): EnvelopePlugin;
    /**
     * Add an envelope point with a given time and volume.
     */
    addPoint(point: EnvelopePoint): void;
    /**
     * Remove an envelope point.
     */
    removePoint(point: EnvelopePoint): void;
    /**
     * Get all envelope points. Should not be modified directly.
     */
    getPoints(): EnvelopePoint[];
    /**
     * Set new envelope points.
     */
    setPoints(newPoints: EnvelopePoint[]): void;
    /**
     * Destroy the plugin instance.
     */
    destroy(): void;
    /**
     * Get the envelope volume.
     */
    getCurrentVolume(): number;
    /**
     * Set the envelope volume. 0..1 (more than 1 will boost the volume).
     */
    setVolume(floatValue: number): void;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private initAudioContext;
    private emitPoints;
    private initPolyline;
    private addPolyPoint;
    private onTimeUpdate;
    /**
     * Deprecated: use `setPoints` instead.
     */
    setStartTime(): void;
    /**
     * Deprecated: use `setPoints` instead.
     */
    setEndTime(): void;
    /**
     * Deprecated: use `setPoints` instead.
     */
    setFadeInEnd(): void;
    /**
     * Deprecated: use `setPoints` instead.
     */
    setFadeOutStart(): void;
}
export default EnvelopePlugin;
