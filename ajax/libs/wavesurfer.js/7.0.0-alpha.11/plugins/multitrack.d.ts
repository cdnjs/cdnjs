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
        id: string | number;
        time: number;
        label?: string;
        color?: string;
    }>;
}>;
type MultitrackOptions = {
    container: HTMLElement;
    minPxPerSec: number;
} & WaveSurferOptions;
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
    private onSeek;
    private onDrag;
    private findCurrentTracks;
    private startSync;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    destroy(): void;
}
export default MultiTrack;
