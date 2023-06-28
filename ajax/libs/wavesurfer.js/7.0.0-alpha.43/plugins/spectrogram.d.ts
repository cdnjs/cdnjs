import BasePlugin from '../base-plugin.js';
export type SpectrogramPluginOptions = {
    waveColor?: string;
    lineWidth?: number;
};
export type SpectrogramPluginEvents = {
    startRecording: void;
    stopRecording: void;
};
declare class SpectrogramPlugin extends BasePlugin<SpectrogramPluginEvents, SpectrogramPluginOptions> {
    private mediaSpectrogramer;
    private recordedUrl;
    static create(options?: SpectrogramPluginOptions): SpectrogramPlugin;
    private loadBlob;
    private processFrequencyData;
    render(stream: MediaStream): () => void;
    private cleanUp;
    startSpectrograming(): Promise<void>;
    isSpectrograming(): boolean;
    stopSpectrograming(): void;
    getSpectrogramedUrl(): string;
    destroy(): void;
}
export default SpectrogramPlugin;
