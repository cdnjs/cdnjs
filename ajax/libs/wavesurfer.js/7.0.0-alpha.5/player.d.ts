declare class Player {
    protected media: HTMLMediaElement;
    private isExternalMedia;
    private hasPlayedOnce;
    constructor({ media, autoplay }: {
        media?: HTMLMediaElement;
        autoplay?: boolean;
    });
    on(event: keyof HTMLMediaElementEventMap, callback: () => void): () => void;
    destroy(): void;
    loadUrl(src: string): void;
    getCurrentTime(): number;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    seekTo(time: number): void;
    getVolume(): number;
    setVolume(volume: number): void;
    getMuted(): boolean;
    setMuted(muted: boolean): void;
    getPlaybackRate(): number;
    setPlaybackRate(rate: number, preservePitch?: boolean): void;
}
export default Player;
