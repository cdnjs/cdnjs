import type { SoundModuleParams } from '../SoundModule';
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
import { SoundModule } from '../SoundModule';
import { MixerModuleProcessor } from './MixerModuleProcessor';
export { MixerModuleProcessor };
/**
 * This class is for mixing sound sources (instance of `SoundModule` subclass).
 */
export declare class MixerModule extends SoundModule {
    private sources;
    private gainNodes;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method defines noop for the same API.
     */
    setup(): MixerModule;
    /**
     * This method defines noop for the same API.
     */
    ready(): MixerModule;
    /**
     * This method mixes sound sources (instance of `SoundModule` subclass).
     * @param {Array<SoundModule>} sources This argument is array that contains sound sources.
     * @param {Array<number>} gains This argument is array for each sound source volume.
     * @return {MixerModule} Return value is for method chain.
     */
    start(sources: SoundModule[], gains?: number[]): MixerModule;
    /**
     * This method demixes sound sources (instance of `SoundModule` subclass).
     * @return {MixerModule} Return value is for method chain.
     */
    stop(): MixerModule;
    /**
     * This method gets or sets parameters for mixer module.
     * This method is overloaded for type interface and type check.
     * @param {keyof SoundModuleParams|SoundModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {SoundModuleParams[keyof SoundModuleParams]|MixerModule} Return value is parameter for mixer module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: SoundModuleParams): MixerModule;
    /**
     * This method gets array that contains instance of `SoundModule` subclass.
     * @return {Array<SoundModule>}
     */
    get(): SoundModule[];
    /**
     * This method gets instance of `Module` (Analyser, Recorder, Effector ... etc).
     * @param {ModuleName} moduleName This argument selects module.
     * @return {Module}
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
    /** @override */
    on(startTime?: number): MixerModule;
    /** @override */
    off(stopTime?: number): MixerModule;
    /** @override */
    suspend(): MixerModule;
    /** @override */
    mix(): MixerModule;
    /** @override */
    demix(): MixerModule;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map