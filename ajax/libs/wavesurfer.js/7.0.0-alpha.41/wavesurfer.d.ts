import { type RendererStyleOptions } from './renderer.js';
import Player from './player.js';
import type { GenericPlugin } from './base-plugin.js';
export type WaveSurferOptions = {
    /** HTML element or CSS selector */
    container: HTMLElement | string;
    /** The height of the waveform in pixels */
    height?: number;
    /** The color of the waveform */
    waveColor?: string;
    /** The color of the progress mask */
    progressColor?: string;
    /** The color of the playpack cursor */
    cursorColor?: string;
    /** The cursor width */
    cursorWidth?: number;
    /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth?: number;
    /** Spacing between bars in pixels */
    barGap?: number;
    /** Rounded borders for bars */
    barRadius?: number;
    /** A vertical scaling factor for the waveform */
    barHeight?: number;
    /** Minimum pixels per second of audio (i.e. zoom level) */
    minPxPerSec?: number;
    /** Stretch the waveform to fill the container, true by default */
    fillParent?: boolean;
    /** Audio URL */
    url?: string;
    /** Pre-computed audio data */
    peaks?: Float32Array[] | Array<number[]>;
    /** Pre-computed duration */
    duration?: number;
    /** Use an existing media element instead of creating one */
    media?: HTMLMediaElement;
    /** Play the audio on load */
    autoplay?: boolean;
    /** Pass false to disable clicks on the waveform */
    interact?: boolean;
    /** Hide the scrollbar */
    hideScrollbar?: boolean;
    /** Audio rate */
    audioRate?: number;
    /** Keep scroll in the center of the waveform during playback */
    autoCenter?: boolean;
    /** The list of plugins to initialize on start */
    plugins?: GenericPlugin[];
};
declare const defaultOptions: {
    height: number;
    waveColor: string;
    progressColor: string;
    cursorWidth: number;
    minPxPerSec: number;
    fillParent: boolean;
    interact: boolean;
    autoCenter: boolean;
};
export type WaveSurferEvents = {
    /** When audio starts loading */
    load: [url: string];
    /** When the audio has been decoded */
    decode: [duration: number];
    /** When the media element has loaded enough to play */
    canplay: [duration: number];
    /** When the audio is both decoded and can play */
    ready: [duration: number];
    /** When a waveform is drawn */
    redraw: [];
    /** When the audio starts playing */
    play: [];
    /** When the audio pauses */
    pause: [];
    /** When the audio finishes playing */
    finish: [];
    /** On audio position change, fires continuously during playback */
    timeupdate: [currentTime: number];
    /** An alias of timeupdate but only when the audio is playing */
    audioprocess: [currentTime: number];
    /** When the user seeks to a new position */
    seeking: [currentTime: number];
    /** When a user interaction (i.e. a click on the waveform) happens */
    interaction: [];
    /** When the zoom level changes */
    zoom: [minPxPerSec: number];
    /** Just before the waveform is destroyed so you can clean up your events */
    destroy: [];
};
declare class WaveSurfer extends Player<WaveSurferEvents> {
    options: WaveSurferOptions & typeof defaultOptions;
    private fetcher;
    private renderer;
    private timer;
    private plugins;
    private decodedData;
    private canPlay;
    /** Create a new WaveSurfer instance */
    static create(options: WaveSurferOptions): WaveSurfer;
    /** Create a new WaveSurfer instance */
    constructor(options: WaveSurferOptions);
    setOptions(options: Partial<RendererStyleOptions>): void;
    private initPlayerEvents;
    private initRendererEvents;
    private initTimerEvents;
    private initReadyEvent;
    private initPlugins;
    /** Register a wavesurfer.js plugin */
    registerPlugin<T extends GenericPlugin>(plugin: T): T;
    /** Get all registered plugins */
    getActivePlugins(): GenericPlugin[];
    /** Load an audio file by URL, with optional pre-decoded audio data */
    load(url: string, channelData?: WaveSurferOptions['peaks'], duration?: number): Promise<void>;
    private renderAudio;
    /** Zoom in or out */
    zoom(minPxPerSec: number): void;
    /** Get the decoded audio data */
    getDecodedData(): AudioBuffer | null;
    /** Get the duration of the audio in seconds */
    getDuration(): number;
    /** Toggle if the waveform should react to clicks */
    toggleInteraction(isInteractive: boolean): void;
    /** Seeks to a percentage of audio as [0..1] (0 = beginning, 1 = end) */
    seekTo(progress: number): void;
    /** Play or pause the audio */
    playPause(): Promise<void>;
    /** Stop the audio and go to the beginning */
    stop(): void;
    /** Skip N or -N seconds from the current positions */
    skip(seconds: number): void;
    /** Empty the waveform by loading a tiny silent audio */
    empty(): void;
    /** Unmount wavesurfer */
    destroy(): void;
}
export default WaveSurfer;
