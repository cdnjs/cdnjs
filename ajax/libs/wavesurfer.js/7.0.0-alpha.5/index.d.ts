import EventEmitter, { type GeneralEventTypes } from './event-emitter.js';
import BasePlugin from './base-plugin.js';
export type WaveSurferOptions = {
    /** HTML element or CSS selector */
    container: HTMLElement | string | null;
    /** Height of the waveform in pixels */
    height?: number;
    /** The color of the waveform */
    waveColor?: string;
    /** The color of the progress mask */
    progressColor?: string;
    /** If set, the waveform will be rendered in bars like so: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth?: number;
    /** Spacing between bars in pixels */
    barGap?: number;
    /** Rounded borders for bars */
    barRadius?: number;
    /** Minimum pixels per second of audio (zoom) */
    minPxPerSec?: number;
    /** Audio URL */
    url?: string;
    /** Pre-computed audio data */
    channelData?: Float32Array[];
    /** Pre-computed duration */
    duration?: number;
    /** Use an existing media element instead of creating one */
    media?: HTMLMediaElement;
    /** Play the audio on load */
    autoplay?: boolean;
};
export type WaveSurferEvents = {
    decode: {
        duration: number;
    };
    canplay: {
        duration: number;
    };
    play: void;
    pause: void;
    audioprocess: {
        currentTime: number;
    };
    seek: {
        time: number;
    };
};
export type WaveSurferPluginParams = {
    wavesurfer: WaveSurfer;
    container: HTMLElement;
};
export declare class WaveSurfer extends EventEmitter<WaveSurferEvents> {
    private options;
    private fetcher;
    private decoder;
    private renderer;
    private player;
    private timer;
    private plugins;
    private subscriptions;
    private channelData;
    private duration;
    /** Create a new WaveSurfer instance */
    static create(options: WaveSurferOptions): WaveSurfer;
    /** Create a new WaveSurfer instance */
    constructor(options: WaveSurferOptions);
    private initPlayerEvents;
    private initRendererEvents;
    private initTimerEvents;
    /** Unmount wavesurfer */
    destroy(): void;
    /** Load an audio file by URL, with optional pre-decoded audio data */
    load(url: string, channelData?: Float32Array[], duration?: number): Promise<void>;
    /** Zoom in or out */
    zoom(minPxPerSec: number): void;
    /** Start playing the audio */
    play(): void;
    /** Pause the audio */
    pause(): void;
    /** Skip to a time position in seconds */
    seekTo(time: number): void;
    /** Check if the audio is playing */
    isPlaying(): boolean;
    /** Get the duration of the audio in seconds */
    getDuration(): number;
    /** Get the current audio position in seconds */
    getCurrentTime(): number;
    /** Get the audio volume */
    getVolume(): number;
    /** Set the audio volume */
    setVolume(volume: number): void;
    /** Get the audio muted state */
    getMuted(): boolean;
    /** Mute or unmute the audio */
    setMuted(muted: boolean): void;
    /** Get playback rate */
    getPlaybackRate(): number;
    /** Set playback rate, with an optional parameter to NOT preserve the pitch if false */
    setPlaybackRate(rate: number, preservePitch?: boolean): void;
    /** Register and initialize a plugin */
    registerPlugin<T extends BasePlugin<GeneralEventTypes>>(CustomPlugin: new (params: WaveSurferPluginParams) => T): T;
    /** Get the decoded audio data */
    getAudioData(): Float32Array[] | null;
}
export default WaveSurfer;
