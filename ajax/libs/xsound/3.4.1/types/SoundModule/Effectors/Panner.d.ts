import { Effector } from '/src/SoundModule/Effectors/Effector';
export type Position3D = {
    x: number;
    y: number;
    z: number;
};
export type PannerParams = {
    state?: boolean;
    x?: number;
    y?: number;
    z?: number;
    ox?: number;
    oy?: number;
    oz?: number;
    refDistance?: number;
    maxDistance?: number;
    rolloffFactor?: number;
    coneInnerAngle?: number;
    coneOuterAngle?: number;
    coneOuterGain?: number;
    panningModel: PanningModelType;
    distanceModel: DistanceModelType;
};
/**
 * Effector's subclass for Panner.
 * @constructor
 * @extends {Effector}
 */
export declare class Panner extends Effector {
    private panner;
    private positions;
    private orientations;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for panner.
     * This method is overloaded for type interface and type check.
     * @param {keyof PannerParams|PannerParams} params This argument is string if getter. Otherwise, setter.
     * @return {PannerParams[keyof PannerParams]|PannerParams} Return value is parameter for panner if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'x'): number;
    param(params: 'y'): number;
    param(params: 'z'): number;
    param(params: 'ox'): number;
    param(params: 'oy'): number;
    param(params: 'oz'): number;
    param(params: 'refDistance'): number;
    param(params: 'maxDistance'): number;
    param(params: 'rolloffFactor'): number;
    param(params: 'coneInnerAngle'): number;
    param(params: 'coneOuterAngle'): number;
    param(params: 'coneOuterGain'): number;
    param(params: 'panningModel'): PanningModelType;
    param(params: 'distanceModel'): DistanceModelType;
    param(params: PannerParams): Panner;
    /** @override */
    params(): Required<PannerParams>;
    /** @override */
    activate(): Panner;
    /** @override */
    deactivate(): Panner;
}
//# sourceMappingURL=Panner.d.ts.map