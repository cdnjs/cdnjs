import EventEmitter from './event-emitter.js';
type WebAudioPlayerEvents = {
    loadedmetadata: [];
    canplay: [];
    play: [];
    pause: [];
    seeking: [];
    timeupdate: [];
    volumechange: [];
    emptied: [];
    ended: [];
};
/**
 * A Web Audio buffer player emulating the behavior of an HTML5 Audio element.
 */
declare class WebAudioPlayer extends EventEmitter<WebAudioPlayerEvents> {
    private audioContext;
    private gainNode;
    private bufferNode;
    private autoplay;
    private playStartTime;
    private playedDuration;
    private _muted;
    private buffer;
    currentSrc: string;
    paused: boolean;
    crossOrigin: string | null;
    constructor(audioContext?: AudioContext);
    load(): Promise<void>;
    get src(): string;
    set src(value: string);
    private _play;
    private _pause;
    play(): Promise<void>;
    pause(): void;
    setSinkId(deviceId: string): Promise<void>;
    get playbackRate(): number;
    set playbackRate(value: number);
    get currentTime(): number;
    set currentTime(value: number);
    get duration(): number;
    get volume(): number;
    set volume(value: number);
    get muted(): boolean;
    set muted(value: boolean);
    /** Get the GainNode used to play the audio. Can be used to attach filters. */
    getGainNode(): GainNode;
}
export default WebAudioPlayer;
