import Despot from "../../util/Despot";
import Recorder from "./recorder";
import { VideomailClientOptions } from "../../types/options";
import { AudioProcessCB } from "../../util/html/media/AudioRecorder";
interface StopParams {
    aboutToInitialize: boolean;
    switchingFacingMode: any;
}
declare class UserMedia extends Despot {
    private recorder;
    private rawVisualUserMedia;
    private paused;
    private recording;
    private audioRecorder?;
    private currentVisualStream?;
    private onPlayReached;
    private onLoadedMetaDataReached;
    private playingPromiseReached;
    constructor(recorder: Recorder, options: VideomailClientOptions);
    private attachMediaStream;
    private setVisualStream;
    private hasEnded;
    private hasInvalidDimensions;
    private logEvent;
    private outputEvent;
    unloadRemainingEventListeners(): void;
    private audioRecord;
    init(localMediaStream: MediaStream, videoCallback: () => void, audioCallback: AudioProcessCB, endedEarlyCallback: (err: any) => void, switchingFacingMode?: ConstrainDOMString): void;
    isReady(): boolean;
    stop(visualStream?: MediaStream, params?: StopParams): void;
    createCanvas(): HTMLCanvasElement;
    getVideoHeight(): number | undefined;
    getVideoWidth(): number | undefined;
    hasVideoWidth(): boolean | 0 | undefined;
    getRawWidth(responsive: boolean): number | undefined;
    getRawHeight(responsive: boolean): number;
    getRawVisuals(): HTMLVideoElement | null | undefined;
    pause(): void;
    isPaused(): boolean;
    resume(): void;
    record(): void;
    isRecording(): boolean;
    getAudioSampleRate(): number;
    getCharacteristics(): {
        audioSampleRate: number;
        muted: boolean | undefined;
        width: number | undefined;
        height: number | undefined;
        videoWidth: number | undefined;
        videoHeight: number | undefined;
    };
}
export default UserMedia;
