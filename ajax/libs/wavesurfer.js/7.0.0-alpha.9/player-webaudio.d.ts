import Player from './player.js';
declare class WebAudioPlayer extends Player {
    audioCtx: AudioContext | null;
    sourceNode: MediaElementAudioSourceNode | null;
    destroy(): void;
    loadUrl(url: string): void;
}
export default WebAudioPlayer;
