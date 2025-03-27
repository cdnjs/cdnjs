import AudioSample from "audio-sample";
import { VideomailClientOptions } from "../../../types/options";
import UserMedia from "../../../wrappers/visuals/userMedia";
export type AudioProcessCB = (audioSample: AudioSample) => void;
declare class AudioRecorder {
    private scriptProcessor?;
    private audioInput?;
    private vcAudioContext?;
    private readonly userMedia;
    private readonly options;
    constructor(userMedia: UserMedia, options: VideomailClientOptions);
    private hasAudioContext;
    private getAudioContext;
    private onAudioProcess;
    init(localMediaStream: MediaStream): void;
    record(cb: AudioProcessCB): void;
    stop(): void;
    getSampleRate(): number;
}
export default AudioRecorder;
