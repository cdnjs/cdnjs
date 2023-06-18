declare class Player {
    protected media: HTMLMediaElement;
    private isExternalMedia;
    private hasPlayedOnce;
    private subscriptions;
    constructor({ media, autoplay }: {
        media?: HTMLMediaElement;
        autoplay?: boolean;
    });
    on(event: keyof HTMLMediaElementEventMap, callback: () => void, options?: AddEventListenerOptions): () => void;
    destroy(): void;
    loadUrl(src: string): void;
    getCurrentTime(): number;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    seekTo(time: number): void;
    getDuration(): number;
    getVolume(): number;
    setVolume(volume: number): void;
    getMuted(): boolean;
    setMuted(muted: boolean): void;
    getPlaybackRate(): number;
    setPlaybackRate(rate: number, preservePitch?: boolean): void;
    getMediaElement(): HTMLMediaElement;
}
export default Player;
