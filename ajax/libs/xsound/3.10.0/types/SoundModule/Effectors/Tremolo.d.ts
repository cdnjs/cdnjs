import { Effector } from './Effector';
export type TremoloParams = {
    state?: boolean;
    type?: OscillatorType;
    depth?: number;
    rate?: number;
};
/**
 * Effector's subclass for Tremolo.
 * @constructor
 * @extends {Effector}
 */
export declare class Tremolo extends Effector {
    private amplitude;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    stop(stopTime?: number, releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for tremolo effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof TremoloParams|TremoloParams} params This argument is string if getter. Otherwise, setter.
     * @return {TremoloParams[keyof TremoloParams]|Tremolo} Return value is parameter for tremolo effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'type'): OscillatorType;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: TremoloParams): Tremolo;
    /** @override */
    params(): Required<TremoloParams>;
    /** @override */
    activate(): Tremolo;
    /** @override */
    deactivate(): Tremolo;
}
//# sourceMappingURL=Tremolo.d.ts.map