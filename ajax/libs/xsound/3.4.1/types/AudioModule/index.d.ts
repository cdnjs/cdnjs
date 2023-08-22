import { SoundModule, SoundModuleParams } from '/src/SoundModule';
import { AudioModuleProcessor } from '/src/AudioModule/AudioModuleProcessor';
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
export type AudioBufferSprite = {
    [spriteName: string]: AudioBuffer;
};
export type AudioModuleParams = SoundModuleParams & {
    playbackRate?: number;
    detune?: number;
    loop?: boolean;
    currentTime?: number;
    readonly duration?: number;
    readonly sampleRate?: number;
    readonly numberOfChannels?: number;
};
export { AudioModuleProcessor };
/**
 * This subclass is for playing single audio.
 * This class enables to create audio player that has higher features than `HTMLAudioElement`.
 * But, this class is disadvantage to play many one shot audios.
 * In that case, developer should use `OneshotModule`.
 * @constructor
 * @extends {SoundModule}
 */
export declare class AudioModule extends SoundModule {
    private source;
    private buffer;
    private currentTime;
    private stopped;
    private decodeCallback;
    private updateCallback;
    private endedCallback;
    private errorCallback;
    private updateId;
    /**
     * @param {AudioContext} context This argument is in order to use the interfaces of Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method sets up envelope generator for fade-in and fade-out.
     * @return {AudioModule} Return value is for method chain.
     */
    setup(callbacks?: {
        decodeCallback?(buffer: AudioBuffer): void;
        updateCallback?(source: AudioBufferSourceNode, currentTime: number): void;
        endedCallback?(source: AudioBufferSourceNode, currentTime: number): void;
        errorCallback?(error: Error): void;
    }): AudioModule;
    /**
     * This method decodes instance of `ArrayBuffer` to `ArrayBuffer` or sets instanceof `AudioBuffer`.
     * @param {ArrayBuffer|AudioBuffer} buffer This argument is instance of `ArrayBuffer` or `AudioBuffer`.
     *     If this is `ArrayBuffer`, this method executes decode.
     * @return {AudioModule} Return value is for method chain.
     */
    ready(buffer: ArrayBuffer | AudioBuffer): AudioModule;
    /**
     * This method starts audio from designated time.
     * @param {number} startTime This argument is time that audio is started at. The default value is `0`.
     * @param {number} endTime This argument is time that audio is ended at. The default value is audio duration.
     * @return {AudioModule} This is returned for method chain.
     */
    start(startTime?: number, endTime?: number): AudioModule;
    /**
     * This method stops audio.
     * @return {AudioModule} Return value is for method chain.
     */
    stop(): AudioModule;
    /**
     * This method gets or sets parameters for audio module.
     * This method is overloaded for type interface and type check.
     * @param {keyof AudioModuleParams|AudioModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {AudioModuleParams[keyof AudioModuleParams]|AudioModule} Return value is parameter for audio module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: 'playbackRate'): number;
    param(params: 'detune'): number;
    param(params: 'loop'): boolean;
    param(params: 'currentTime'): number;
    param(params: 'duration'): number;
    param(params: 'sampleRate'): number;
    param(params: 'numberOfChannels'): number;
    param(params: 'numberOfChannels'): number;
    param(params: AudioModuleParams): AudioModule;
    /**
     * This method gets instance of `AudioBufferSourceNode`.
     * @return {AudioBufferSourceNode}
     */
    get(): AudioBufferSourceNode;
    /**
     * This method rewinds audio.
     * @return {AudioModule} Return value is for method chain.
     */
    end(): AudioModule;
    /**
     * This method determines whether instance of `AudioBuffer` exists.
     * @return {boolean} If instance of `AudioBuffer` already exists, this value is `true`. Otherwise, this value is `false`.
     */
    has(): boolean;
    /**
     * This method determines whether audio is paused.
     * @return {boolean} If audio is paused, this value is `true`. Otherwise, this value is `false`.
     */
    paused(): boolean;
    /**
     * This method gets or sets fade-in time.
     * @param {number} time This argument is fade-in time. If this argument is omitted, this method is getter.
     * @return {number|AudioModule} Return value is fade-in time. Otherwise, return value is for method chain.
     */
    fadeIn(time?: number): number | AudioModule;
    /**
     * This method gets or sets fade-out time.
     * @param {number} time This argument is fade-out time. If this argument is omitted, this method is getter.
     * @return {number|AudioModule} Return value is fade-out time. Otherwise, return value is for method chain.
     */
    fadeOut(time?: number): number | AudioModule;
    /**
     *  This method slices instance of `AudioBuffer`.
     *  @param {number} startTime This argument is start time [sec] on `AudioBuffer`.
     *  @param {number} endTime This argument is end time [sec] on `AudioBuffer`.
     *  @return {AudioBuffer} Return value is sliced `AudioBuffer`.
     */
    slice(startTime?: number, endTime?: number): AudioBuffer | null;
    /**
     *  This method sprites audio.
     *  @param {Object.<string, Array<number>>} sprites This argument is associative array that contains sprite times.
     *  @return {AudioBufferSprite} Return value is associative array that contains sprited `AudioBuffer`.
     */
    sprite(sprites: {
        [spriteName: string]: [number, number];
    }): AudioBufferSprite | null;
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
    on(startTime?: number): AudioModule;
    /** @override */
    off(stopTime?: number): AudioModule;
    /** @override */
    suspend(): AudioModule;
    /** @override */
    mix(): AudioModule;
    /** @override */
    demix(): AudioModule;
    /**
     * This method gets audio module parameters as associative array.
     * @return {AudioModuleParams}
     * @override
     */
    params(): Required<AudioModuleParams>;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map