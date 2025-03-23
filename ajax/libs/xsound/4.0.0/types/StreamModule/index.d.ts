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
import { StreamModuleProcessor } from './StreamModuleProcessor';
export interface MediaStreamTrackAudioSourceNode extends AudioNode {
}
export type StreamModuleParams = SoundModuleParams & {
    output?: boolean;
    track?: boolean;
};
export { StreamModuleProcessor };
/**
 * This class is for processing sound data from WebRTC.
 */
export declare class StreamModule extends SoundModule {
    private sources;
    private stream;
    private constraints;
    private output;
    private track;
    private paused;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method sets up for using WebRTC.
     * @param {MediaStreamConstraints} constraints This argument is object based on `MediaStreamConstraints` dictionary.
     * @return {StreamModule} Return value is for method chain.
     */
    setup(constraints?: MediaStreamConstraints): StreamModule;
    /**
     * This method opens devices or sets instance of `MediaStream`.
     * @property {MediaStream} stream This argument is instance of `MediaStream`.
     * @property {function} successCallback This argument is invoked on success.
     * @property {function} errorCallback This argument is invoked on failure.
     * @return {Promise<MediaStream|Error>} Return value is `Promise` that `getUserMedia` returns.
     */
    ready(params?: {
        stream?: MediaStream;
        successCallback?: (stream: MediaStream) => void;
        errorCallback?: (error: Error) => void;
    }): Promise<MediaStream | Error>;
    /**
     * This method starts streaming.
     * @return {StreamModule} Return value is for method chain.
     */
    start(): StreamModule;
    /**
     * This method stops streaming.
     * @return {StreamModule} Return value is for method chain.
     */
    stop(): StreamModule;
    /**
     * This method gets or sets parameters for stream module.
     * This method is overloaded for type interface and type check.
     * @param {keyof StreamModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {StreamModuleParams[keyof StreamModuleParams]|StreamModule} Return value is parameter for stream module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: 'output'): boolean;
    param(params: 'track'): boolean;
    param(params: StreamModuleParams): StreamModule;
    /**
     * This method gets instance of `MediaStreamAudioSourceNode` or `MediaStreamTrackAudioSourceNode` or that array contains these.
     * This method is overloaded for type interface and type check.
     * @param {number} index This argument selects instance of `MediaStreamAudioSourceNode` or `MediaStreamTrackAudioSourceNode`.
     * @return {MediaStreamAudioSourceNode|MediaStreamTrackAudioSourceNode}
     */
    get(index: number): MediaStreamAudioSourceNode | MediaStreamTrackAudioSourceNode;
    get(): MediaStreamAudioSourceNode[] | MediaStreamTrackAudioSourceNode[];
    /**
     * This method gets instance of `MediaStream`.
     * @return {MediaStream|null}
     */
    getStream(): MediaStream | null;
    /**
     * This method stops microphone and camera by stopping instances of `MediaStreamTrack`.
     * @return {StreamModule} Return value is for method chain.
     */
    clear(): StreamModule;
    /**
     * This method stops microphone by stopping instances of `MediaStreamTrack`.
     * @return {StreamModule} Return value is for method chain.
     */
    clearAudioDevices(): StreamModule;
    /**
     * This method stops camera by stopping instances of `MediaStreamTrack`.
     * @return {StreamModule} Return value is for method chain.
     */
    clearVideoDevices(): StreamModule;
    /**
     * This method gets available devices as array that contains instance of `MediaDeviceInfo`.
     * @return {Promise<MediaDeviceInfo[]|void>} Return value is `Promise` that has array contains instance of `MediaDeviceInfo`.
     */
    devices(): Promise<MediaDeviceInfo[] | void>;
    /**
     * This method determines whether streaming is active.
     * @return {boolean} If streaming is active, this value is `true`. Otherwise, this value is `false`.
     */
    streaming(): boolean;
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
    on(startTime?: number): StreamModule;
    /** @override */
    off(stopTime?: number): StreamModule;
    /** @override */
    suspend(): StreamModule;
    /** @override */
    mix(): StreamModule;
    /** @override */
    demix(): StreamModule;
    /**
     * This method gets stream module parameters as associative array.
     * @return {StreamModuleParams}
     * @override
     */
    params(): Required<StreamModuleParams>;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map