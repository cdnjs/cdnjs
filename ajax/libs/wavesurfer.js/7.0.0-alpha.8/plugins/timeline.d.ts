import BasePlugin from '../base-plugin.js';
import { WaveSurferPluginParams } from '../index.js';
type TimelinePluginOptions = {
    height?: number;
    timeInterval?: number;
    primaryLabelInterval?: number;
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
