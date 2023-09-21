import { Connectable, Statable } from '../interfaces';
export type OscillatorCustomType = {
    real: Float32Array;
    imag: Float32Array;
};
export type OscillatorParams = {
    state?: boolean;
    type?: OscillatorType | OscillatorCustomType;
    octave?: number;
    fine?: number;
    volume?: number;
};
/**
 * This private class is entity for oscillator.
 * @constructor
 * @implements {Connectable}
 * @implements {Statable}
 */
export declare class Oscillator implements Connectable, Statable {
    static readonly OCTAVE: 1200;
    private context;
    private source;
    private volume;
    private octave;
    private fine;
    private custom;
    private isActive;
    private paused;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     * @param {boolean} state This argument is initial state.
     */
    constructor(context: AudioContext, state: boolean);
    /**
     * This method connects `AudioNode`s.
     * @param {AudioNode} output This argument is instance of `AudioNode` as output.
     */
    ready(output: AudioNode): void;
    /**
     * This method starts sound.
     * @param {number} startTime This argument is start time.
     */
    start(startTime?: number): void;
    /**
     * This method stops sound.
     * @param {number} stopTime This argument is stop time.
     */
    stop(stopTime?: number): void;
    /**
     * This method gets or sets parameters for oscillator.
     * @param {keyof OscillatorParams|OscillatorParams} params This argument is string if getter. Otherwise, setter.
     * @return {OscillatorParams[keyof OscillatorParams]} Return value is parameter for oscillator if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'type'): OscillatorType | OscillatorCustomType;
    param(params: 'octave'): number;
    param(params: 'fine'): number;
    param(params: 'volume'): number;
    param(params: OscillatorParams): Oscillator;
    /**
     * This method gets instance of `OscillatorNode`.
     * @return {OscillatorNode}
     */
    get(): OscillatorNode;
    /** @override */
    state(): boolean;
    /** @override */
    activate(): Oscillator;
    /** @override */
    deactivate(): Oscillator;
    /**
     * This method gets oscillator parameters as associative array.
     * @return {OscillatorParams}
     */
    params(): Required<OscillatorParams>;
    /** @override */
    get INPUT(): OscillatorNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=Oscillator.d.ts.map