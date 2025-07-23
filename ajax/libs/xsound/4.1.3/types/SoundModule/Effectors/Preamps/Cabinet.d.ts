import { Effector } from '../Effector';
export type CabinetParams = {
    state?: boolean;
};
/**
 * Effector's subclass for Cabinet.
 */
export declare class Cabinet extends Effector {
    private lowpass;
    private notch;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for cabinet.
     * This method is overloaded for type interface and type check.
     * @param {keyof CabinetParams|CabinetParams} params This argument is string if getter. Otherwise, setter.
     * @return {CabinetParams[keyof CabinetParams]} Return value is parameter for cabinet if getter.
     */
    param(params: 'state'): boolean;
    param(params: CabinetParams): void;
    /** @override */
    params(): Required<CabinetParams>;
}
//# sourceMappingURL=Cabinet.d.ts.map