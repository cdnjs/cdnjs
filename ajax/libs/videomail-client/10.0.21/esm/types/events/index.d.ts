import Response from "superagent/lib/node/response";
import VideomailError from "../../util/error/VideomailError";
import { FormReadyParams } from "../../wrappers/container";
import RecordingStats from "../RecordingStats";
import Videomail from "../Videomail";
export interface UserMediaReadyParams {
    switchingFacingMode?: ConstrainDOMString | undefined;
    recordWhenReady?: boolean | undefined;
    paused?: boolean | undefined;
}
export interface ErrorParams {
    exc?: unknown;
    err?: VideomailError;
}
export interface RecordingParams {
    framesCount: number;
}
export interface StoppingParams {
    limitReached?: boolean | undefined;
}
export interface ProgressParams {
    frameProgress: string;
    sampleProgress?: string | undefined;
}
export interface PreviewParams {
    key?: string;
    width?: number | undefined;
    height?: number | undefined;
    hasAudio: boolean;
}
export interface StoppedParams {
    recordingStats?: RecordingStats | undefined;
}
export interface SubmittedParams {
    videomail: Videomail;
    response: Response;
}
export interface ValidatingParams {
    targetName?: any;
    event?: any;
}
export interface InvalidParams {
    whyInvalid?: string;
    invalidData?: Record<string, string>;
}
interface VideomailEvents {
    ASKING_WEBCAM_PERMISSION: () => void;
    BEGIN_AUDIO_ENCODING: () => void;
    BEGIN_VIDEO_ENCODING: () => void;
    BLOCKING: () => void;
    BUILT: () => void;
    CONNECTED: () => void;
    CONNECTING: () => void;
    COUNTDOWN: () => void;
    DISABLING_AUDIO: () => void;
    DISCONNECTED: () => void;
    ENABLING_AUDIO: () => void;
    ERROR: (params: ErrorParams) => void;
    EVENT_EMITTED: () => void;
    FIRST_FRAME_SENT: () => void;
    FORM_READY: (params: FormReadyParams) => void;
    GOING_BACK: () => void;
    HIDE: () => void;
    INVALID: (params: InvalidParams) => void;
    INVISIBLE: () => void;
    LOADED_META_DATA: () => void;
    LOADING_USER_MEDIA: () => void;
    NOTIFYING: () => void;
    PAUSED: () => void;
    PREVIEW: (params?: PreviewParams) => void;
    PREVIEW_SHOWN: () => void;
    PROGRESS: (params: ProgressParams) => void;
    RECORDING: (params: RecordingParams) => void;
    REPLAY_SHOWN: () => void;
    RESETTING: () => void;
    RESUMING: () => void;
    SENDING_FIRST_FRAME: () => void;
    SERVER_READY: () => void;
    STARTING_OVER: () => void;
    STOPPED: (params: StoppedParams) => void;
    STOPPING: (params: StoppingParams) => void;
    SUBMITTED: (params: SubmittedParams) => void;
    SUBMITTING: () => void;
    SWITCH_FACING_MODE: () => void;
    UNLOADING: () => void;
    USER_MEDIA_READY: (params: UserMediaReadyParams) => void;
    VALID: () => void;
    VALIDATING: (params?: ValidatingParams) => void;
    VISIBLE: () => void;
}
export default VideomailEvents;
