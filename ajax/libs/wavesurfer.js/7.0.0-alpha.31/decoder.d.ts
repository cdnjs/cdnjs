declare class Decoder {
    audioCtx: AudioContext | null;
    private initAudioContext;
    constructor();
    decode(audioData: ArrayBuffer): Promise<AudioBuffer>;
    destroy(): void;
}
export default Decoder;
