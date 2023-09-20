import { Effector } from '/src/SoundModule/Effectors/Effector';
export type FuzzParams = {
    state?: boolean;
    drive?: number;
    level?: number;
};
/**
 * Effector's subclass for Fuzz.
 * @constructor
 * @extends {Effector}
 */
export declare class Fuzz extends Effector {
    private positiveShaper;
    private negativeShaper;
    private positiveInputGain;
    private negativeInputGain;
    private positiveOutputGain;
    private negativeOutputGain;
    private outFilter;
    private driveInput;
    private level;
    private drive;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    start(_startTime?: number): void;
    /** @override */
    stop(_stopTime?: number, _releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for fuzz effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof FuzzParams|FuzzParams} params This argument is string if getter. Otherwise, setter.
     * @return {FuzzParams[keyof FuzzParams]|Fuzz} Return value is parameter for fuzz effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'drive'): number;
    param(params: 'level'): number;
    param(params: FuzzParams): Fuzz;
    /** @override */
    params(): Required<FuzzParams>;
    /** @override */
    activate(): Fuzz;
    /** @override */
    deactivate(): Fuzz;
}
//# sourceMappingURL=Fuzz.d.ts.map