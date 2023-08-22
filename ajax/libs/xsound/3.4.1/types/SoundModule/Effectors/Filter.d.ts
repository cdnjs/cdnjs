import { Effector } from '/src/SoundModule/Effectors/Effector';
export type FilterParams = {
    state?: boolean;
    type?: BiquadFilterType;
    frequency?: number;
    Q?: number;
    gain?: number;
    range?: number;
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
};
/**
 * Effector's subclass for Filter.
 * @constructor
 * @extends {Effector}
 */
export declare class Filter extends Effector {
    private filter;
    private maxFrequency;
    private range;
    private attack;
    private decay;
    private sustain;
    private release;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    start(startTime?: number): void;
    /** @override */
    stop(stopTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for filter effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof FilterParams|FilterParams} params This argument is string if getter. Otherwise, setter.
     * @return {FilterParams[keyof FilterParams]|Filter} Return value is parameter for filter effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'type'): BiquadFilterType;
    param(params: 'frequency'): number;
    param(params: 'Q'): number;
    param(params: 'gain'): number;
    param(params: 'range'): number;
    param(params: 'attack'): number;
    param(params: 'decay'): number;
    param(params: 'sustain'): number;
    param(params: 'release'): number;
    param(params: FilterParams): Filter;
    /** @override */
    params(): Required<FilterParams>;
    /** @override */
    activate(): Filter;
    /** @override */
    deactivate(): Filter;
}
//# sourceMappingURL=Filter.d.ts.map