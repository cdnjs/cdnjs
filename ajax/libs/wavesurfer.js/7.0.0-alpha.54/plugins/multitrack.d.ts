/**
 * Multitrack isn't a plugin, but rather a helper class for creating a multitrack audio player.
 * Individual tracks are synced and played together. They can be dragged to set their start position.
 */
import { type WaveSurferOptions } from '../wavesurfer.js';
import { type EnvelopePluginOptions } from './envelope.js';
import EventEmitter from '../event-emitter.js';
export type TrackId = string | number;
export type TrackOptions = {
    id: TrackId;
    url?: string;
    peaks?: WaveSurferOptions['peaks'];
    draggable?: boolean;
    startPosition: number;
    startCue?: number;
    endCue?: number;
    fadeInEnd?: number;
    fadeOutStart?: number;
    volume?: number;
    markers?: Array<{
        time: number;
        label?: string;
        color?: string;
    }>;
    intro?: {
        endTime: number;
        label?: string;
        color?: string;
    };
    options?: WaveSurferOptions;
};
export type MultitrackOptions = {
    container: HTMLElement;
    minPxPerSec?: number;
    cursorColor?: string;
    cursorWidth?: number;
    trackBackground?: string;
    trackBorderColor?: string;
    rightButtonDrag?: boolean;
    envelopeOptions?: EnvelopePluginOptions;
};
export type MultitrackEvents = {
    canplay: [];
    'start-position-change': [{
        id: TrackId;
        startPosition: number;
    }];
    'start-cue-change': [{
        id: TrackId;
        startCue: number;
    }];
    'end-cue-change': [{
        id: TrackId;
        endCue: number;
    }];
    'fade-in-change': [{
        id: TrackId;
        fadeInEnd: number;
    }];
    'fade-out-change': [{
        id: TrackId;
        fadeOutStart: number;
    }];
    'volume-change': [{
        id: TrackId;
        volume: number;
    }];
    'intro-end-change': [{
        id: TrackId;
        endTime: number;
    }];
    drop: [{
        id: TrackId;
    }];
};
export type MultitrackTracks = Array<TrackOptions>;
declare class MultiTrack extends EventEmitter<MultitrackEvents> {
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
    private timer;
    private subscriptions;
    private timeline;
    static create(tracks: MultitrackTracks, options: MultitrackOptions): MultiTrack;
    constructor(tracks: MultitrackTracks, options: MultitrackOptions);
    private initDurations;
    private initAudio;
    private initAllAudios;
    private initWavesurfer;
    private initAllWavesurfers;
    private initTimeline;
    private updatePosition;
    private setIsDragging;
    private onDrag;
    private findCurrentTracks;
    private startSync;
    play(): void;
    pause(): void;
    isPlaying(): boolean;
    getCurrentTime(): number;
    /** Position percentage from 0 to 1 */
    seekTo(position: number): void;
    /** Set time in seconds */
    setTime(time: number): void;
    zoom(pxPerSec: number): void;
    addTrack(track: TrackOptions): void;
    destroy(): void;
    setSinkId(sinkId: string): Promise<void[]>;
}
export default MultiTrack;
