import BasePlugin, { type WaveSurferPluginParams } from '../base-plugin.js';
export type TimelinePluginOptions = {
    /** The height of the timeline in pixels, defaults to 20 */
    height?: number;
    /** HTML container for the timeline, defaults to wavesufer's container */
    container?: HTMLElement;
    /** The duration of the timeline in seconds, defaults to wavesurfer's duration */
    duration?: number;
    /** Interval between ticks in seconds */
    timeInterval?: number;
    /** Interval between numeric labels */
    primaryLabelInterval?: number;
    /** Interval between secondary numeric labels */
    secondaryLabelInterval?: number;
};
declare const defaultOptions: {
    height: number;
};
export type TimelinePluginEvents = {
    ready: [];
};
declare class TimelinePlugin extends BasePlugin<TimelinePluginEvents, TimelinePluginOptions> {
    private timelineWrapper;
    protected options: TimelinePluginOptions & typeof defaultOptions;
    constructor(options: TimelinePluginOptions);
    static create(options: TimelinePluginOptions): TimelinePlugin;
    /** Called by wavesurfer, don't call manually */
    init(params: WaveSurferPluginParams): void;
    /** Unmount */
    destroy(): void;
    private initTimelineWrapper;
    private formatTime;
    private defaultTimeInterval;
    private defaultPrimaryLabelInterval;
    private defaultSecondaryLabelInterval;
    private initTimeline;
}
export default TimelinePlugin;
