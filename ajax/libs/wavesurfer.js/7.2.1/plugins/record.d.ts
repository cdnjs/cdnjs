/**
 * Record audio from the microphone with a real-time waveform preview
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type RecordPluginOptions = {
    /** The MIME type to use when recording audio */
    mimeType?: MediaRecorderOptions['mimeType'];
    /** The audio bitrate to use when recording audio, defaults to 128000 to avoid a VBR encoding. */
    audioBitsPerSecond?: MediaRecorderOptions['audioBitsPerSecond'];
    /** Whether to render the recorded audio, true by default */
    renderRecordedAudio?: boolean;
};
export type RecordPluginEvents = BasePluginEvents & {
    'record-start': [];
    'record-end': [blob: Blob];
};
declare class RecordPlugin extends BasePlugin<RecordPluginEvents, RecordPluginOptions> {
    private stream;
    private mediaRecorder;
    /** Create an instance of the Record plugin */
    constructor(options: RecordPluginOptions);
    /** Create an instance of the Record plugin */
    static create(options?: RecordPluginOptions): RecordPlugin;
    private renderMicStream;
    /** Request access to the microphone and start monitoring incoming audio */
    startMic(): Promise<MediaStream>;
    /** Stop monitoring incoming audio */
    stopMic(): void;
    /** Start recording audio from the microphone */
    startRecording(): Promise<void>;
    /** Check if the audio is being recorded */
    isRecording(): boolean;
    /** Stop the recording */
    stopRecording(): void;
    /** Destroy the plugin */
    destroy(): void;
}
export default RecordPlugin;
