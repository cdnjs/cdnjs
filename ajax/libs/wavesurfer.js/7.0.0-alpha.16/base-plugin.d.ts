import EventEmitter, { type GeneralEventTypes } from './event-emitter.js';
import type { WaveSurfer, WaveSurferPluginParams } from './index.js';
export declare class BasePlugin<EventTypes extends GeneralEventTypes, Options> extends EventEmitter<EventTypes> {
    protected wavesurfer: WaveSurfer;
    protected container: ShadowRoot | HTMLElement;
    protected wrapper: HTMLElement;
    protected subscriptions: (() => void)[];
    protected options: Options;
    constructor(params: WaveSurferPluginParams, options: Options);
    destroy(): void;
}
export default BasePlugin;
