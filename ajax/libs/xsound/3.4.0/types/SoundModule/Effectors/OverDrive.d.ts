import { Effector } from '/src/SoundModule/Effectors/Effector';
export type OverDriveParams = {
    state?: boolean;
    drive?: number;
    level?: number;
};
/**
 * Effector's subclass for OverDrive.
 * @constructor
 * @extends {Effector}
 */
export declare class OverDrive extends Effector {
    private shaper;
    private inputShaper;
    private outputShaper;
    private inputGain;
    private outputGain;
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
     * This method gets or sets parameters for overdrive effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof OverDriveParams|OverDriveParams} params This argument is string if getter. Otherwise, setter.
     * @return {OverDriveParams[keyof OverDriveParams]|OverDrive} Return value is parameter for overdrive effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'drive'): number;
    param(params: 'level'): number;
    param(params: OverDriveParams): OverDrive;
    /** @override */
    params(): Required<OverDriveParams>;
    /** @override */
    activate(): OverDrive;
    /** @override */
    deactivate(): OverDrive;
}
//# sourceMappingURL=OverDrive.d.ts.map