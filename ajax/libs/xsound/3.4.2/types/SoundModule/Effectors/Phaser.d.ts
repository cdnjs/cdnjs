import { Effector } from '/src/SoundModule/Effectors/Effector';
export type PhaserNumberOfStages = 0 | 2 | 4 | 8 | 12 | 24;
export type PhaserParams = {
    state?: boolean;
    stage?: PhaserNumberOfStages;
    frequency?: number;
    resonance?: number;
    depth?: number;
    rate?: number;
    mix?: number;
};
/**
 * Effector's subclass for Phaser.
 * @constructor
 * @extends {Effector}
 */
export declare class Phaser extends Effector {
    static MAX_STAGES: number;
    private numberOfStages;
    private filters;
    private mix;
    private depthRate;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    stop(stopTime?: number, releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for phaser effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof PhaserParams|PhaserParams} params This argument is string if getter. Otherwise, setter.
     * @return {PhaserParams[keyof PhaserParams]|Phaser} Return value is parameter for phaser effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'stage'): PhaserNumberOfStages;
    param(params: 'frequency'): number;
    param(params: 'resonance'): number;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: 'mix'): number;
    param(params: PhaserParams): Phaser;
    /** @override */
    params(): Required<PhaserParams>;
    /** @override */
    activate(): Phaser;
    /** @override */
    deactivate(): Phaser;
}
//# sourceMappingURL=Phaser.d.ts.map