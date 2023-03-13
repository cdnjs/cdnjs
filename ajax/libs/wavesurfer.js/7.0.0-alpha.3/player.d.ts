declare class Player {
    protected media: HTMLMediaElement;
    private isExternalMedia;
    constructor({ media }: {
        media?: HTMLMediaElement;
    });
    on(event: keyof HTMLMediaElementEventMap, callback: () => void): () => void;
    destroy(): void;
    loadUrl(src: string): void;
    getCurrentTime(): number;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    seekTo(time: number): void;
}
export default Player;
