import type { SoundModuleParams } from '../SoundModule';
import type { OscillatorParams, OscillatorCustomType } from './Oscillator';
import type { Analyser } from '../SoundModule/Analyser';
import type { Recorder } from '../SoundModule/Recorder';
import type { Autopanner } from '../SoundModule/Effectors/Autopanner';
import type { BitCrusher } from '../SoundModule/Effectors/BitCrusher';
import type { Chorus } from '../SoundModule/Effectors/Chorus';
import type { Compressor } from '../SoundModule/Effectors/Compressor';
import type { Delay } from '../SoundModule/Effectors/Delay';
import type { EnvelopeGenerator } from '../SoundModule/Effectors/EnvelopeGenerator';
import type { Equalizer } from '../SoundModule/Effectors/Equalizer';
import type { Filter } from '../SoundModule/Effectors/Filter';
import type { Flanger } from '../SoundModule/Effectors/Flanger';
import type { Fuzz } from '../SoundModule/Effectors/Fuzz';
import type { Listener } from '../SoundModule/Effectors/Listener';
import type { NoiseGate } from '../SoundModule/Effectors/NoiseGate';
import type { NoiseSuppressor } from '../SoundModule/Effectors/NoiseSuppressor';
import type { OverDrive } from '../SoundModule/Effectors/OverDrive';
import type { Panner } from '../SoundModule/Effectors/Panner';
import type { Phaser } from '../SoundModule/Effectors/Phaser';
import type { PitchShifter } from '../SoundModule/Effectors/PitchShifter';
import type { Preamp } from '../SoundModule/Effectors/Preamp';
import type { Reverb } from '../SoundModule/Effectors/Reverb';
import type { Ringmodulator } from '../SoundModule/Effectors/Ringmodulator';
import type { Stereo } from '../SoundModule/Effectors/Stereo';
import type { Tremolo } from '../SoundModule/Effectors/Tremolo';
import type { VocalCanceler } from '../SoundModule/Effectors/VocalCanceler';
import type { Wah } from '../SoundModule/Effectors/Wah';
import type { GlideParams, GlideType } from './Glide';
import { SoundModule } from '../SoundModule';
import { OscillatorModuleProcessor } from './OscillatorModuleProcessor';
import { Glide } from './Glide';
import { Oscillator } from './Oscillator';
export type { Glide, GlideParams, GlideType, Oscillator, OscillatorParams, OscillatorCustomType };
export { OscillatorModuleProcessor };
export type OscillatorModuleParams = SoundModuleParams & {
    oscillator?: {
        glide: GlideParams;
        params: OscillatorParams[];
    };
};
/**
 * This class manages instances of `Oscillator` for creating sound.
 */
export declare class OscillatorModule extends SoundModule {
    private sources;
    private glide;
    private startTime;
    private duration;
    /**
     * @param {AudioContext} context This argument is in order to use the interfaces of Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method creates instances of `Oscillator`.
     * @param {Array<boolean>} states This argument is array that contains initial state in instance of `Oscillator`.
     * @return {OscillatorModule} Return value is for method chain.
     */
    setup(states: boolean[]): OscillatorModule;
    /**
     * This method schedules the time of start and stop.
     * @param {number} startTime This argument is start time. The default value is `currentTime` in instance of `AudioContext`
     * @param {number} duration This argument is duration. The default value is 0.
     * @return {OscillatorModule} Return value is for method chain.
     */
    ready(startTime?: number, duration?: number): OscillatorModule;
    /**
     * This method starts some sounds that are active at the same time.
     * @param {Array<number>} frequencies This argument each oscillator frequency. The default value is 0 Hz.
     * @return {OscillatorModule} Return value is for method chain.
     */
    start(frequencies: number[]): OscillatorModule;
    /**
     * This method stops active sounds.
     * @return {OscillatorModule} Return value is for method chain.
     */
    stop(): OscillatorModule;
    /**
     * This method gets or sets parameters for oscillator module.
     * This method is overloaded for type interface and type check.
     * @param {keyof OscillatorModuleParams|OscillatorModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {OscillatorModuleParams[keyof OscillatorModuleParams]|OscillatorModule} Return value is parameter for oscillator module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: OscillatorModuleParams): OscillatorModule;
    /**
     * This method gets instance of `Oscillator` or array that contains the all of `Oscillator`s.
     * This method is overloaded for type interface and type check.
     * @param {number} index This argument selects instance of `Oscillator`.
     * @return {Oscillator|Array<Oscillator>}
     */
    get(index: number): Oscillator;
    get(): Oscillator[];
    /**
     * This method returns the number of `Oscillator`s.
     * @return {number}
     */
    length(): number;
    /**
     * This method gets instance of `Module` (Analyser, Recorder, Effector ... etc).
     * @param {ModuleName|'glide'} moduleName This argument selects module.
     * @return {Module|Glide}
     */
    module(moduleName: 'analyser'): Analyser;
    module(moduleName: 'recorder'): Recorder;
    module(moduleName: 'autopanner'): Autopanner;
    module(moduleName: 'bitcrusher'): BitCrusher;
    module(moduleName: 'chorus'): Chorus;
    module(moduleName: 'compressor'): Compressor;
    module(moduleName: 'delay'): Delay;
    module(moduleName: 'envelopegenerator'): EnvelopeGenerator;
    module(moduleName: 'equalizer'): Equalizer;
    module(moduleName: 'filter'): Filter;
    module(moduleName: 'flanger'): Flanger;
    module(moduleName: 'fuzz'): Fuzz;
    module(moduleName: 'listener'): Listener;
    module(moduleName: 'noisegate'): NoiseGate;
    module(moduleName: 'noisesuppressor'): NoiseSuppressor;
    module(moduleName: 'overdrive'): OverDrive;
    module(moduleName: 'panner'): Panner;
    module(moduleName: 'phaser'): Phaser;
    module(moduleName: 'pitchshifter'): PitchShifter;
    module(moduleName: 'preamp'): Preamp;
    module(moduleName: 'reverb'): Reverb;
    module(moduleName: 'ringmodulator'): Ringmodulator;
    module(moduleName: 'stereo'): Stereo;
    module(moduleName: 'tremolo'): Tremolo;
    module(moduleName: 'vocalcanceler'): VocalCanceler;
    module(moduleName: 'wah'): Wah;
    module(moduleName: 'glide'): Glide;
    /** @override */
    on(startTime?: number): OscillatorModule;
    /** @override */
    off(stopTime?: number): OscillatorModule;
    /** @override */
    suspend(): OscillatorModule;
    /** @override */
    mix(): OscillatorModule;
    /** @override */
    demix(): OscillatorModule;
    /**
     * This method gets oscillator module parameters as associative array.
     * @return {OscillatorModuleParams}
     * @override
     */
    params(): Required<OscillatorModuleParams>;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map