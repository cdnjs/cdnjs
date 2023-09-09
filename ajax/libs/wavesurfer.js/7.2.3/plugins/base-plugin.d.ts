import EventEmitter from './event-emitter.js';
import type WaveSurfer from './wavesurfer.js';
export type BasePluginEvents = {
    destroy: [];
};
export type GenericPlugin = BasePlugin<BasePluginEvents, unknown>;
export declare class BasePlugin<EventTypes extends BasePluginEvents, Options> extends EventEmitter<EventTypes> {
    protected wavesurfer?: WaveSurfer;
    protected subscriptions: (() => void)[];
    protected options: Options;
    constructor(options: Options);
    onInit(): void;
    init(wavesurfer: WaveSurfer): void;
    destroy(): void;
}
export default BasePlugin;
