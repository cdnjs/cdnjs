import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class MediaModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=MediaModuleProcessor.d.ts.map