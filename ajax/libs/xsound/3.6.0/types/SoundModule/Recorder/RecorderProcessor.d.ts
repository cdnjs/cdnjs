import { AudioWorkletProcessor, Inputs } from '../../worklet';
export type RecorderProcessorMessageEventData = {
    inputs: Inputs;
};
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method (sends input audio data to main thread) for recording audio.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class RecorderProcessor extends AudioWorkletProcessor {
    static readonly BUFFER_SIZE: 128;
    constructor();
    /** @override */
    protected process(inputs: Inputs): boolean;
}
//# sourceMappingURL=RecorderProcessor.d.ts.map