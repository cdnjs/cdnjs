import { SoundModule, SoundModuleParams } from '/src/SoundModule';
import { OneshotModuleProcessor } from '/src/OneshotModule/OneshotModuleProcessor';
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
export type OneshotErrorText = 'error' | 'timeout' | 'decode';
export type OneshotSetting = {
    bufferIndex: number;
    playbackRate?: number;
    loop?: boolean;
    loopStart?: number;
    loopEnd?: number;
    volume?: number;
};
export type OneshotSettings = OneshotSetting[];
export type OneshotModuleParams = SoundModuleParams & {
    transpose?: number;
};
export { OneshotModuleProcessor };
/**
 * This subclass is for playing one-shot audio
 * @constructor
 * @extends {SoundModule}
 */
export declare class OneshotModule extends SoundModule {
    private sources;
    private resources;
    private buffers;
    private volumes;
    private states;
    private settings;
    private startTime;
    private duration;
    private transpose;
    private loadError;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method creates instances of `AudioBuffer` by Ajax.
     * @property {Array<string>|Array<AudioBuffer>} resources This argument is array that contains URL or instance of `AudioBuffer` for audio resources.
     * @property {OneshotSettings} settings This argument is settings (such as `playbackRate`, `loop` ... etc) each audio sources.
     * @property {number} timeout This argument is timeout of Ajax. The default value is 60000 msec (1 minutes).
     * @property {function} successCallback This argument is invoked on success;
     * @property {function} errorCallback This argument is invoked on failure.
     * @property {function} progressCallback This argument is invoked during receiving audio data.
     * @property {OneshotModule} Return value is for method chain.
     */
    setup(params: {
        resources: string[] | AudioBuffer[];
        settings: OneshotSettings;
        timeout?: number;
        successCallback?(event: ProgressEvent, buffers: AudioBuffer[]): void;
        errorCallback?(event: ProgressEvent | Error, textStatus: OneshotErrorText): void;
        progressCallback?(event: ProgressEvent): void;
    }): OneshotModule;
    /**
     * This method schedules playing audio.
     * @param {number} startTime This argument is start time. The default value is 0.
     * @param {number} duration This argument is duration. The default value is 0.
     * @return {OneshotModule} Return value is for method chain.
     */
    ready(startTime?: number, duration?: number): OneshotModule;
    /**
     * This method starts one-shot audio.
     * @param {Array<number>} indexes This argument selects instance of `AudioBufferSourceNode`.
     * @return {OneshotModule} Return value is for method chain.
     */
    start(indexes: number[]): OneshotModule;
    /**
     * This method stops one-shot audio.
     * @param {Array<number>} indexes This argument selects instance of `AudioBufferSourceNode`.
     * @return {OneshotModule} Return value is for method chain.
     */
    stop(indexes: number[]): OneshotModule;
    /**
     * This method gets or sets parameters for one-shot module.
     * This method is overloaded for type interface and type check.
     * @param {keyof OneshotModuleParams|OneshotModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {OneshotModuleParams[keyof OneshotModuleParams]|OneshotModule} Return value is parameter for one-shot module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: 'transpose'): number;
    param(params: OneshotModuleParams): OneshotModule;
    /**
     * This method gets instance of `AudioBuffer` or array that contains the all of `AudioBuffer`s.
     * This method is overloaded for type interface and type check.
     * @param {number} index This argument selects instance of `AudioBuffer`.
     * @return {AudioBuffer|AudioBuffer[]}
     */
    get(index: number): AudioBuffer;
    get(): AudioBuffer[];
    /**
     * This method resets settings.
     * @param {number} index This argument selects target setting.
     * @param {keyof OneshotSetting} paramName This argument is one-shot parameter name.
     * @param {OneshotSetting} param This argument is one-shot parameter value.
     * @return {OneshotModule} Return value is for method chain.
     */
    reset(index: number, paramName: keyof OneshotSetting, param: number | boolean): OneshotModule;
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
    on(startTime?: number): OneshotModule;
    /** @override */
    off(stopTime?: number): OneshotModule;
    /** @override */
    suspend(): OneshotModule;
    /** @override */
    mix(): OneshotModule;
    /** @override */
    demix(): OneshotModule;
    /**
     * This method gets one-shot module parameters as associative array.
     * @return {OneshotModuleParams}
     * @override
     */
    params(): Required<OneshotModuleParams>;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
    /**
     * This method gets `ArrayBuffer` and creates instance of `AudioBuffer`.
     * @property {string} url This argument is resource URL for one-shot audio.
     * @property {number} index This argument is in order to assign instance of `AudioBuffer`.
     * @property {number} timeout This argument is timeout of Ajax. The default value is 60000 msec (1 minutes).
     * @property {function} successCallback This argument is invoked on success;
     * @property {function} errorCallback This argument is invoked on failure.
     * @property {function} progressCallback This argument is invoked during receiving audio data.
     */
    private load;
}
//# sourceMappingURL=index.d.ts.map