/**
 * Windowed Spectrogram plugin - Optimized for very long audio files
 *
 * Only renders frequency data in a sliding window around the current viewport,
 * keeping memory usage constant regardless of audio length.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
export type WindowedSpectrogramPluginOptions = {
    /** Selector of element or element in which to render */
    container?: string | HTMLElement;
    /** Number of samples to fetch to FFT. Must be a power of 2. */
    fftSamples?: number;
    /** Height of the spectrogram view in CSS pixels */
    height?: number;
    /** Set to true to display frequency labels. */
    labels?: boolean;
    labelsBackground?: string;
    labelsColor?: string;
    labelsHzColor?: string;
    /** Size of the overlapping window. Must be < fftSamples. */
    noverlap?: number;
    /** The window function to be used. */
    windowFunc?: 'bartlett' | 'bartlettHann' | 'blackman' | 'cosine' | 'gauss' | 'hamming' | 'hann' | 'lanczoz' | 'rectangular' | 'triangular';
    /** Some window functions have this extra value. (Between 0 and 1) */
    alpha?: number;
    /** Min frequency to scale spectrogram. */
    frequencyMin?: number;
    /** Max frequency to scale spectrogram. */
    frequencyMax?: number;
    /** Sample rate of the audio when using pre-computed spectrogram data. */
    sampleRate?: number;
    /** Frequency scale type */
    scale?: 'linear' | 'logarithmic' | 'mel' | 'bark' | 'erb';
    /** Gain in dB */
    gainDB?: number;
    /** Range in dB */
    rangeDB?: number;
    /** Color map */
    colorMap?: number[][] | 'gray' | 'igray' | 'roseus';
    /** Render a spectrogram for each channel independently when true. */
    splitChannels?: boolean;
    /** Window size in seconds (how much data to keep in memory) */
    windowSize?: number;
    /** Buffer size in pixels (how much extra to render beyond viewport) */
    bufferSize?: number;
    /** Enable progressive background loading of all segments (default: true) */
    progressiveLoading?: boolean;
    /** Use web worker for FFT calculations (default: true) */
    useWebWorker?: boolean;
};
export type WindowedSpectrogramPluginEvents = BasePluginEvents & {
    ready: [];
    click: [relativeX: number];
    progress: [progress: number];
};
declare class WindowedSpectrogramPlugin extends BasePlugin<WindowedSpectrogramPluginEvents, WindowedSpectrogramPluginOptions> {
    private container;
    private wrapper;
    private labelsEl;
    private canvasContainer;
    private colorMap;
    private fftSamples;
    private height;
    private noverlap;
    private windowFunc;
    private alpha;
    private frequencyMin;
    private frequencyMax;
    private gainDB;
    private rangeDB;
    private scale;
    private windowSize;
    private bufferSize;
    private progressiveLoading;
    private useWebWorker;
    private segments;
    private buffer;
    private currentPosition;
    private pixelsPerSecond;
    private isRendering;
    private renderTimeout;
    private fft;
    private numMelFilters;
    private numLogFilters;
    private numBarkFilters;
    private numErbFilters;
    private progressiveLoadTimeout;
    private isProgressiveLoading;
    private nextProgressiveSegmentTime;
    private worker;
    private workerPromises;
    static create(options?: WindowedSpectrogramPluginOptions): WindowedSpectrogramPlugin;
    constructor(options: WindowedSpectrogramPluginOptions);
    private initializeWorker;
    onInit(): void;
    private createWrapper;
    private createCanvas;
    private handleRedraw;
    private updateSegmentPositions;
    private scheduleSegmentQualityUpdate;
    private qualityUpdateTimeout;
    private updateVisibleSegmentQuality;
    private getScrollLeft;
    private getViewportWidth;
    private handleScroll;
    private updatePosition;
    private scheduleRender;
    private renderVisibleWindow;
    private generateSegments;
    private findUncoveredTimeRanges;
    private startProgressiveLoading;
    private progressiveLoadNextSegment;
    private _stopProgressiveLoading;
    /** Get the current loading progress as a percentage (0-100) */
    getLoadingProgress(): number;
    private emitProgress;
    private calculateFrequencies;
    private calculateFrequenciesWithWorker;
    private calculateFrequenciesMainThread;
    private renderSegment;
    private renderChannelToCanvas;
    private clearAllSegments;
    private getFilterBank;
    private _onWrapperClick;
    private freqType;
    private unitType;
    private getLabelFrequency;
    private loadLabels;
    render(audioData: AudioBuffer): Promise<void>;
    destroy(): void;
    private getWidth;
    private getPixelsPerSecond;
    /** Stop progressive loading if it's currently running */
    stopProgressiveLoading(): void;
    /** Restart progressive loading from the beginning */
    restartProgressiveLoading(): void;
}
export default WindowedSpectrogramPlugin;
