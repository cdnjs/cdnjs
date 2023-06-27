import EventEmitter, { type GeneralEventTypes } from './event-emitter.js';
import WaveSurfer, { type WaveSurferPluginParams } from './wavesurfer.js';
export declare class BasePlugin<EventTypes extends GeneralEventTypes, Options> extends EventEmitter<EventTypes> {
    protected wavesurfer?: WaveSurfer;
    protected container?: HTMLElement;
    protected wrapper?: HTMLElement;
    protected subscriptions: (() => void)[];
    protected options: Options;
    constructor(options: Options);
    init(params: WaveSurferPluginParams): void;
    destroy(): void;
}
export default BasePlugin;
