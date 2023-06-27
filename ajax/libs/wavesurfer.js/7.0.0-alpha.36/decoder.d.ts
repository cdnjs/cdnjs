declare class Decoder {
    audioCtx: AudioContext | null;
    private initAudioContext;
    constructor();
    decode(audioData: ArrayBuffer): Promise<AudioBuffer>;
    createBuffer(channelData: Float32Array[] | Array<number[]>, duration: number): AudioBuffer;
    destroy(): void;
}
export default Decoder;
