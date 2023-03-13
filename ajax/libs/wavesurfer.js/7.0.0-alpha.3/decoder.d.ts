declare class Decoder {
    audioCtx: AudioContext | null;
    constructor();
    decode(audioData: ArrayBuffer): Promise<{
        duration: number;
        channelData: Float32Array[];
    }>;
    destroy(): void;
}
export default Decoder;
