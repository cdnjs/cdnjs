import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class AudioModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=AudioModuleProcessor.d.ts.map