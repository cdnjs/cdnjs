/**
 * Record audio from the microphone, render a waveform and download the audio.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type RecordPluginOptions = {
    mimeType?: MediaRecorderOptions['mimeType'];
    audioBitsPerSecond?: MediaRecorderOptions['audioBitsPerSecond'];
};
export type RecordPluginEvents = BasePluginEvents & {
    startRecording: [];
    stopRecording: [];
};
declare class RecordPlugin extends BasePlugin<RecordPluginEvents, RecordPluginOptions> {
    private mediaRecorder;
    private recordedUrl;
    private savedCursorWidth;
    private savedInteractive;
    static create(options?: RecordPluginOptions): RecordPlugin;
    private preventInteraction;
    private restoreInteraction;
    onInit(): void;
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
