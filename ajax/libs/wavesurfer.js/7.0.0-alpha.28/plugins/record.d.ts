import BasePlugin from '../base-plugin.js';
import type { WaveSurferPluginParams } from '../wavesurfer.js';
export type RecordPluginOptions = {
    waveColor?: string;
    lineWidth?: number;
};
export type RecordPluginEvents = {
    startRecording: void;
    stopRecording: void;
};
declare class RecordPlugin extends BasePlugin<RecordPluginEvents, RecordPluginOptions> {
    private mediaRecorder;
    private recordedUrl;
    static create(options?: RecordPluginOptions): RecordPlugin;
    init(params: WaveSurferPluginParams): void;
    private loadBlob;
    render(stream: MediaStream): () => void;
    private cleanUp;
    startRecording(): Promise<void>;
    isRecording(): boolean;
    stopRecording(): void;
    getRecordedUrl(): string;
    destroy(): void;
}
export default RecordPlugin;
