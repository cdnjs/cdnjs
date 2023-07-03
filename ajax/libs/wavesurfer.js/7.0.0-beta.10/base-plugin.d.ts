import EventEmitter, { type GeneralEventTypes } from './event-emitter.js';
import type WaveSurfer from './wavesurfer.js';
export type GenericPlugin = BasePlugin<GeneralEventTypes, unknown>;
export declare class BasePlugin<EventTypes extends GeneralEventTypes, Options> extends EventEmitter<EventTypes> {
    protected wavesurfer?: WaveSurfer;
    protected subscriptions: (() => void)[];
    protected options: Options;
    constructor(options: Options);
    onInit(): void;
    init(wavesurfer: WaveSurfer): void;
    destroy(): void;
}
export default BasePlugin;
