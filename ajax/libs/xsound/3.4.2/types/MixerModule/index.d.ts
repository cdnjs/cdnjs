import { SoundModule, SoundModuleParams } from '/src/SoundModule';
import { MixerModuleProcessor } from '/src/MixerModule/MixerModuleProcessor';
import { Analyser } from '/src/SoundModule/Analyser';
import { Recorder } from '/src/SoundModule/Recorder';
import { Autopanner } from '/src/SoundModule/Effectors/Autopanner';
import { BitCrusher } from '/src/SoundModule/Effectors/BitCrusher';
import { Chorus } from '/src/SoundModule/Effectors/Chorus';
import { Compressor } from '/src/SoundModule/Effectors/Compressor';
import { Delay } from '/src/SoundModule/Effectors/Delay';
import { EnvelopeGenerator } from '/src/SoundModule/Effectors/EnvelopeGenerator';
import { Equalizer } from '/src/SoundModule/Effectors/Equalizer';
import { Filter } from '/src/SoundModule/Effectors/Filter';
import { Flanger } from '/src/SoundModule/Effectors/Flanger';
import { Fuzz } from '/src/SoundModule/Effectors/Fuzz';
import { Listener } from '/src/SoundModule/Effectors/Listener';
import { NoiseGate } from '/src/SoundModule/Effectors/NoiseGate';
import { NoiseSuppressor } from '/src/SoundModule/Effectors/NoiseSuppressor';
import { OverDrive } from '/src/SoundModule/Effectors/OverDrive';
import { Panner } from '/src/SoundModule/Effectors/Panner';
import { Phaser } from '/src/SoundModule/Effectors/Phaser';
import { PitchShifter } from '/src/SoundModule/Effectors/PitchShifter';
import { Preamp } from '/src/SoundModule/Effectors/Preamp';
import { Reverb } from '/src/SoundModule/Effectors/Reverb';
import { Ringmodulator } from '/src/SoundModule/Effectors/Ringmodulator';
import { Stereo } from '/src/SoundModule/Effectors/Stereo';
import { Tremolo } from '/src/SoundModule/Effectors/Tremolo';
import { VocalCanceler } from '/src/SoundModule/Effectors/VocalCanceler';
import { Wah } from '/src/SoundModule/Effectors/Wah';
export { MixerModuleProcessor };
/**
 * This class is for mixing sound sources (instance of `SoundModule` subclass).
 * @constructor
 * @extends {SoundModule}
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