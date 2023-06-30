import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class OneshotModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=OneshotModuleProcessor.d.ts.map