import { Effector } from '/src/SoundModule/Effectors/Effector';
export type ReverbErrorText = 'error' | 'timeout' | 'decode';
export type ReverbParams = {
    state?: boolean;
    buffer?: number | AudioBuffer | null;
    dry?: number;
    wet?: number;
    tone?: number;
};
/**
 * Effector's subclass for Reverb.
 * @constructor
 * @extends {Effector}
 */
export declare class Reverb extends Effector {
    private convolver;
    private dry;
    private wet;
    private tone;
    private rirs;
    private loadError;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for reverb effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof ReverbParams|ReverbParams} params This argument is string if getter. Otherwise, setter.
     * @return {ReverbParams[keyof ReverbParams]|Reverb} Return value is parameter for reverb effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'buffer'): AudioBuffer | null;
    param(params: 'dry'): number;
    param(params: 'wet'): number;
    param(params: 'tone'): number;
    param(params: ReverbParams): Reverb;
    /**
     * This method sets instance of `AudioBuffer` to `ConvolverNode`.
     * @param {ArrayBuffer|AudioBuffer} impulse This argument is in order to convolve impulse response.
     *     This argument is instance of `AudioBuffer` or `ArrayBuffer` for impulse response.
     * @param {function} errorCallback This argument is invoked on decode failure.
     * @return {Reverb} Return value is for method chain.
     */
    add(impulse: ArrayBuffer | AudioBuffer, errorCallback?: (error: Error) => void): Reverb;
    /**
     * This method creates and appends to Reverb presets instance of `AudioBuffer` by Ajax.
     * @property {Array<string>|Array<AudioBuffer>} rirs This argument is array that contains URL or instance of `AudioBuffer` for impulse response.
     * @property {number} timeout This argument is timeout of Ajax. The default value is 60000 msec (1 minutes).
     * @property {function} successCallback This argument is invoked on success.
     * @property {function} errorCallback This argument is invoked on failure.
     * @property {function} progressCallback This argument is invoked during receiving audio data.
     */
    preset(params: {
        rirs: string[] | AudioBuffer[];
        timeout?: number;
        successCallback?(event: ProgressEvent): void;
        errorCallback?(event: ProgressEvent | Error, textStatus: ReverbErrorText): void;
        progressCallback?(event: ProgressEvent): void;
    }): void;
    /** @override */
    params(): Required<Omit<ReverbParams, 'buffer'>>;
    /** @override */
    activate(): Reverb;
    /** @override */
    deactivate(): Reverb;
    /**
     * This method retrives `ArrayBuffer` and creates instance of `AudioBuffer`.
     * @property {string} url This argument is resource URL for one-shot audio.
     * @property {number} index This argument is in order to assign instance of `AudioBuffer`.
     * @property {number} timeout This argument is Ajax timeout.
     * @property {function} successCallback This argument is invoked on success.
     * @property {function} errorCallback This argument is invoked on failure
     * @property {function} progressCallback This argument is invoked during receiving audio data.
     */
    private load;
}
//# sourceMappingURL=Reverb.d.ts.map