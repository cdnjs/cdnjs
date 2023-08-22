import { AudioWorkletProcessor, Inputs, Outputs } from '/src/worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for vocal canceler and Update parameters on message event.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class VocalCancelerProcessor extends AudioWorkletProcessor {
    private depth;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
    /**
     * This method removes vocal part from audio on playing.
     * @param {number} dataL This argument is gain level for Left channel.
     * @param {number} dataR This argument is gain level for Right channel.
     * @return {number} Return value is audio data except vocal part.
     */
    private cancel;
}
//# sourceMappingURL=VocalCancelerProcessor.d.ts.map