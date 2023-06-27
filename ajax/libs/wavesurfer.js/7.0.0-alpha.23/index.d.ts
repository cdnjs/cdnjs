import Player from './player.js';
import { type GeneralEventTypes } from './event-emitter.js';
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
    interact?: boolean;
    /** Hide scrollbar **/
    hideScrollbar?: boolean;
    /** Audio rate */
    audioRate?: number;
    /** Keep scroll to the center of the waveform during playback */
    autoCenter?: boolean;
    /** Initialize plugins */
    plugins: BasePlugin<GeneralEventTypes, unknown>[];
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
    zoom: {
        minPxPerSec: number;
    };
    destroy: void;
};
export type WaveSurferPluginParams = {
    wavesurfer: WaveSurfer;
    container: HTMLElement;
    wrapper: HTMLElement;
};
declare class WaveSurfer extends Player<WaveSurferEvents> {
    options: WaveSurferOptions & typeof defaultOptions;
    private fetcher;
    private decoder;
    private renderer;
    private timer;
    private plugins;
    private decodedData;
    private canPlay;
    /** Create a new WaveSurfer instance */
    static create(options: WaveSurferOptions): WaveSurfer;
    /** Create a new WaveSurfer instance */
    constructor(options: WaveSurferOptions);
    private initPlayerEvents;
    private initRendererEvents;
    private initTimerEvents;
    private initReadyEvent;
    private initPlugins;
    /** Register a wavesurfer.js plugin */
    registerPlugin(plugin: BasePlugin<GeneralEventTypes, unknown>): void;
    /** Load an audio file by URL, with optional pre-decoded audio data */
    load(url: string, channelData?: Float32Array[], duration?: number): Promise<void>;
    /** Zoom in or out */
    zoom(minPxPerSec: number): void;
    /** Get the decoded audio data */
    getDecodedData(): AudioBuffer | null;
    getDuration(): number;
    /** Toggle if the waveform should react to clicks */
    toggleInteractive(isInteractive: boolean): void;
    /** Unmount wavesurfer */
    destroy(): void;
}
export default WaveSurfer;
