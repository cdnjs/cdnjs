interface RecordingStats {
    waitingTime?: number | undefined;
    avgFps?: number | undefined;
    wantedFps?: number;
    avgInterval?: number;
    wantedInterval?: number;
    intervalSum?: number;
    framesCount?: number;
    videoType?: string;
    samplesCount?: number;
    sampleRate?: number;
}
export default RecordingStats;
