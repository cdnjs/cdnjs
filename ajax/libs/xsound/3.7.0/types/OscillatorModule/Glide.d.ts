import { Statable } from '../interfaces';
export type GlideType = 'linear' | 'exponential';
export type GlideParams = {
    state?: boolean;
    type?: GlideType;
    time?: number;
};
/**
 * This private class is for oscillator glide.
 * @constructor
 * @implements {Statable}
 */
export declare class Glide implements Statable {
    private context;
    private type;
    private time;
    private prevFrequency;
    private nextFrequency;
    private isActive;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method sets frequencies for glide.
     * @param {number} frequency This argument is next frequency for glide.
     */
    ready(frequency: number): void;
    /**
     * This method starts glide.
     * @param {OscillatorNode} oscillator This argument is instance of `OscillatorNode`.
     * @param {number} startTime This argument is start time for glide.
     */
    start(oscillator: OscillatorNode, startTime?: number): void;
    /**
     * This method stops glide. Moreover, This method prepares for next glide.
     */
    stop(): void;
    /**
     * This method gets or sets parameters for glide.
     * @param {keyof GlideParams|GlideParams} params This argument is string if getter. Otherwise, setter.
     * @return {GlideParams[keyof GlideParams]|Glide} Return value is parameter for glide if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'type'): GlideType;
    param(params: 'time'): number;
    param(params: GlideParams): Glide;
    /**
     * This method gets glide parameters as associative array.
     * @return {GlideParams}
     */
    params(): Required<GlideParams>;
    /**
     * This method gets glide state. If returns `true`, glide is active.
     * @return {boolean}
     */
    state(): boolean;
    /**
     * This method activates glide.
     * @return {Glide} Return value is for method chain.
     */
    activate(): Glide;
    /**
     * This method deactivates glide.
     * @return {Glide} Return value is for method chain.
     */
    deactivate(): Glide;
}
//# sourceMappingURL=Glide.d.ts.map