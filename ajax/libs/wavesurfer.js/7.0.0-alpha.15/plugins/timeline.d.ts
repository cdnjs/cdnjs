import BasePlugin from '../base-plugin.js';
import { WaveSurferPluginParams } from '../index.js';
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
type TimelinePluginEvents = {
    ready: void;
};
declare class TimelinePlugin extends BasePlugin<TimelinePluginEvents, TimelinePluginOptions> {
    private wrapper;
    protected options: TimelinePluginOptions & typeof defaultOptions;
    constructor(params: WaveSurferPluginParams, options: TimelinePluginOptions);
    /** Unmount */
    destroy(): void;
    private initWrapper;
    private formatTime;
    private defaultTimeInterval;
    defaultPrimaryLabelInterval(pxPerSec: number): number;
    defaultSecondaryLabelInterval(pxPerSec: number): number;
    private initTimeline;
}
export default TimelinePlugin;
