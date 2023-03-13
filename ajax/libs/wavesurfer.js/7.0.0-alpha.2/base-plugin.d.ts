import EventEmitter, { type GeneralEventTypes } from './event-emitter.js';
import type { WaveSurfer, WaveSurferPluginParams } from './index.js';
export declare class BasePlugin<EventTypes extends GeneralEventTypes> extends EventEmitter<EventTypes> {
    protected wavesurfer: WaveSurfer;
    protected renderer: WaveSurfer['renderer'];
    protected subscriptions: (() => void)[];
    constructor(params: WaveSurferPluginParams);
    destroy(): void;
}
export default BasePlugin;
