import { type WaveSurferOptions } from '../index.js';
type MultitrackTracks = Array<{
    id: string | number;
    url?: string;
    peaks?: WaveSurferOptions['peaks'];
    draggable?: boolean;
    startPosition: number;
    startCue?: number;
    endCue?: number;
    markers?: Array<{
        time: number;
        label?: string;
        color?: string;
    }>;
    regions?: Array<{
        startTime: number;
        endTime: number;
        label?: string;
        color?: string;
    }>;
    options?: WaveSurferOptions;
}>;
type MultitrackOptions = {
    container: HTMLElement;
    minPxPerSec?: number;
    cursorColor?: string;
    cursorWidth?: number;
    trackBackground?: string;
    trackBorderColor?: string;
    rightButtonDrag?: boolean;
    onTrackPositionUpdate?: (id: string | number, startPosition: number) => void;
};
declare class MultiTrack {
    private tracks;
    private options;
    private audios;
    private wavesurfers;
    private durations;
    private currentTime;
    private maxDuration;
    private rendering;
    private isDragging;
    private frameRequest;
    static create(tracks: MultitrackTracks, options: MultitrackOptions): MultiTrack;
    constructor(tracks: MultitrackTracks, options: MultitrackOptions);
    private initAudios;
    private initWavesurfers;
    private initTimeline;
    private updatePosition;
    private onDrag;
    private onMove;
    private findCurrentTracks;
    private startSync;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    seekTo(time: number): void;
    zoom(pxPerSec: number): void;
    destroy(): void;
}
export default MultiTrack;
