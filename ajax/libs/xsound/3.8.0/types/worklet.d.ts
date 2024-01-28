export type FrozenArray<T> = Array<T>;
export type Inputs = FrozenArray<FrozenArray<Float32Array>>;
export type Outputs = FrozenArray<FrozenArray<Float32Array>>;
export type Parameters = {
    [parameterName: string]: Float32Array;
};
/**
 * This class enables to use inline AudioWorklet.
 * @abstract
 */
export declare abstract class AudioWorkletProcessor {
    protected port: MessagePort;
    protected abstract process(inputs: Inputs, outputs: Outputs, parameters: Parameters): boolean;
}
/**
 * This function creates AudioWorklet script as Data URL.
 * @param {AudioWorkletGlobalScope.AudioWorkletProcessor} processor This argument is class that extends `AudioWorkletProcessor`.
 * @return {string} Return value is AudioWorklet script as Data URL.
 */
export declare function createModule(processor: new () => AudioWorkletProcessor): string;
/**
 * This function adds module as AudioWorklet.
 * @param {AudioContext} context This argument is instance of `AudioContext` for adding AudioWorklet module.
 * @param {AudioWorkletGlobalScope.AudioWorkletProcessor} processor This argument is class that extends `AudioWorkletProcessor`.
 * @param {WorkletOptions} options This argument is one of 'omit', 'same-origin', 'include'. The default value is 'same-origin'.
 * @return {Promise<void>} Return value is `Promise` that `addModule` returns.
 */
export declare function addAudioWorklet(context: AudioContext, processor: new () => AudioWorkletProcessor, options?: WorkletOptions): Promise<void>;
//# sourceMappingURL=worklet.d.ts.map