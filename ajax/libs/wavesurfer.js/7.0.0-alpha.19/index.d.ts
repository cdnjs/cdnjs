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
    /** The color of the playpack cursor */
    cursorColor?: string;
    /** The cursor with */
    cursorWidth?: number;
    /** If set, the waveform will be rendered in bars like so: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth?: number;
    /** Spacing between bars in pixels */
    barGap?: number;
    /** Rounded borders for bars */
    barRadius?: number;
    /** Minimum pixels per second of audio (zoom) */
    minPxPerSec?: number;
    /** Stretch the waveform to fill the container, true by default */
    fillParent?: boolean;
    /** Audio URL */
    url?: string;
    /** Pre-computed audio data */
    peaks?: Float32Array[];
    /** Pre-computed duration */
    duration?: number;
    /** Use an existing media element instead of creating one */
    media?: HTMLMediaElement;
    /** Play the audio on load */
    autoplay?: boolean;
    /** Is the waveform clickable? */
    interactive?: boolean;
    /** Hide scrollbar **/
    noScrollbar?: boolean;
};
export type WaveSurferEvents = {
    decode: {
        duration: number;
    };
    canplay: {
        duration: number;
    };
    ready: {
        duration: number;
    };
    play: void;
    pause: void;
    timeupdate: {
        currentTime: number;
    };
    seeking: {
        currentTime: number;
    };
    seekClick: {
        currentTime: number;
    };
    destroy: void;
};
export type WaveSurferPluginParams = {
    wavesurfer: WaveSurfer;
    container: HTMLElement;
    wrapper: HTMLElement;
};
declare class WaveSurfer extends EventEmitter<WaveSurferEvents> {
    private options;
    private fetcher;
    private decoder;
    private renderer;
    private player;
    private timer;
    private plugins;
    private subscriptions;
    private decodedData;
    /** Create a new WaveSurfer instance */
    static create(options: WaveSurferOptions): WaveSurfer;
    /** Create a new WaveSurfer instance */
    constructor(options: WaveSurferOptions);
    private initPlayerEvents;
    private initRendererEvents;
    private initTimerEvents;
    private initReadyEvent;
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
    registerPlugin<T extends BasePlugin<GeneralEventTypes, Options>, Options>(CustomPlugin: new (params: WaveSurferPluginParams, options: Options) => T, options: Options): T;
    /** Get the decoded audio data */
    getDecodedData(): AudioBuffer | null;
    /** Get the raw media element */
    getMediaElement(): HTMLMediaElement | null;
    /** Unmount wavesurfer */
    destroy(): void;
}
export default WaveSurfer;
