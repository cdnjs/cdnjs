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
import { MediaModuleProcessor } from './MediaModuleProcessor';
export type MediaModuleParams = SoundModuleParams & {
    autoplay?: boolean;
    playbackRate?: number;
    currentTime?: number;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    readonly duration?: number;
};
export { MediaModuleProcessor };
/**
 * This class processes sound data from `HTMLMediaElement`.
 * Namely, this class enables to create audio player that has higher features from `HTMLMediaElement`.
 * But, this class is disadvantage to play many one shot audios.
 * In that case, developer should use `OneshotModule`.
 */
export declare class MediaModule extends SoundModule {
    private source;
    private media;
    private ext;
    private autoplay;
    private mediaSource;
    private sourceBuffer;
    private file;
    private mimeType;
    private listeners;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method gets `HTMLMediaElement` and selects media format. In addition, this method adds event listeners that are defined by `HTMLMediaElement`.
     * @property {HTMLAudioElement|HTMLVideoElement} media This argument is either `HTMLAudioElement` or `HTMLVideoElement`.
     * @property {Array<string>} formats This argument is usable media format. For example, 'wav', 'ogg', 'webm', 'mp4' ...etc.
     * @property {boolean} autoplay This argument is in order to determine autoplay. The default value is `false`.
     * @property {{ [eventType: string]: (event: Event | Error) => void }} listeners This argument is event listeners that are defined by `HTMLMediaElement`.
     * @return {MediaModule} Return value is for method chain.
     */
    setup(params: {
        media: HTMLAudioElement | HTMLVideoElement;
        formats?: string[];
        autoplay?: boolean;
        listeners?: {
            [eventType: string]: (event: Event | Error) => void;
        };
    }): MediaModule;
    /**
     * This method prepares for playing media anytime after loading media resource.
     * @param {string} src This argument is Object URL or file name for media resource.
     * @param {string} mimeType This argument is required in case of audio streaming.
     * @return {MediaModule} Return value is for method chain.
     */
    ready(src: string, mimeType?: string): MediaModule;
    /**
     * This method starts media from designated time.
     * @param {number} position This argument is time that media is started at. The default value is `0`.
     * @param {function} errorCallback This argument is invoked on failure.
     * @return {MediaModule} Return value is for method chain.
     */
    start(position?: number, errorCallback?: (error: Error) => void): MediaModule;
    /**
     * This method stops media.
     * @param {function} successCallback This argument is invoked on success.
     * @param {function} errorCallback This argument is invoked on failure.
     * @return {MediaModule} Return value is for method chain.
     */
    stop(successCallback?: () => void, errorCallback?: (error: Error) => void): MediaModule;
    /**
     * This method gets or sets parameters for media module.
     * This method is overloaded for type interface and type check.
     * @param {keyof MediaModuleParams|MediaModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {MediaModuleParams[keyof MediaModuleParams]|MediaModule} Return value is parameter for media module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: 'autoplay'): boolean;
    param(params: 'playbackRate'): number;
    param(params: 'currentTime'): number;
    param(params: 'controls'): boolean;
    param(params: 'loop'): boolean;
    param(params: 'muted'): boolean;
    param(params: 'duration'): boolean;
    param(params: 'duration'): boolean;
    param(params: MediaModuleParams): MediaModule;
    /**
     * This method gets instance of `MediaElementAudioSourceNode`.
     * @return {MediaElementAudioSourceNode|null}
     */
    get(): MediaElementAudioSourceNode | null;
    /**
     * This method determines whether instance of `HTMLMediaElement` exists.
     * @return {boolean} If instance of `HTMLMediaElement` already exists, this value is `true`. Otherwise, this value is `false`.
     */
    hasMedia(): boolean;
    /**
     * This method determines whether instance of `MediaElementAudioSourceNode` exists.
     * @return {boolean} If instance of `MediaElementAudioSourceNode` already exists, this value is `true`. Otherwise, this value is `false`.
     */
    hasSource(): boolean;
    /**
     * This method determines whether media is paused.
     * @return {boolean} If media is paused, this value is `true`. Otherwise, this value is `false`.
     */
    paused(): boolean;
    /**
     * This method gets or sets fade-in time.
     * @param {number} time This argument is fade-in time. If this argument is omitted, this method is getter.
     * @return {number|MediaModule} Return value is fade-in time. Otherwise, return value is for method chain.
     */
    fadeIn(time?: number): number | MediaModule;
    /**
     * This method gets or sets fade-out time.
     * @param {number} time This argument is fade-out time. If this argument is omitted, this method is getter.
     * @return {number|MediaModule} Return value is fade-out time. Otherwise, return value is for method chain.
     */
    fadeOut(time?: number): number | MediaModule;
    /**
     * This method requests Picture In Picture (PIP).
     * @return {Promise<PictureInPictureWindow>} Return value is `Promise`.
     */
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    /**
     * This method exits from Picture In Picture (PIP).
     * @return {Promise<void>} Return value is `Promise`.
     */
    exitPictureInPicture(): Promise<void>;
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
    on(startTime?: number): MediaModule;
    /** @override */
    off(stopTime?: number): MediaModule;
    /** @override */
    suspend(): MediaModule;
    /** @override */
    mix(): MediaModule;
    /** @override */
    demix(): MediaModule;
    /**
     * This method gets media module parameters as associative array.
     * @return {MediaModuleParams}
     * @override
     */
    params(): Required<MediaModuleParams>;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): GainNode;
    /**
     * This method is event listener for `MediaSource`
     * @param {Event} event This argument is instance of `Event`.
     */
    private onSourceOpen;
    /**
     * This method is event listener for `MediaSource`
     * @param {Event} event This argument is instance of `Event`.
     */
    private onSourceEnded;
    /**
     * This method is event listener for `MediaSource`
     * @param {Event} event This argument is instance of `Event`.
     */
    private onSourceClose;
    /**
     * This method is event listener for `SourceBuffer`
     * @param {Event} event This argument is instance of `Event`.
     */
    private onSourceBufferUpdateEnd;
    /**
     * This method is event listener for `SourceBuffer`
     * @param {Event} event This argument is instance of `Event`.
     */
    private onSourceBufferError;
}
//# sourceMappingURL=index.d.ts.map