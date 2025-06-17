export declare interface AbrComponentAPI extends ComponentAPI {
    firstAutoLevel: number;
    forcedAutoLevel: number;
    nextAutoLevel: number;
    readonly bwEstimator?: EwmaBandWidthEstimator;
    resetEstimator(abrEwmaDefaultEstimate: number): any;
}

export declare class AbrController implements AbrComponentAPI {
    protected hls: Hls;
    private lastLevelLoadSec;
    private lastLoadedFragLevel;
    private firstSelection;
    private _nextAutoLevel;
    private nextAutoLevelKey;
    private audioTracksByGroup;
    private codecTiers;
    private timer;
    private fragCurrent;
    private partCurrent;
    private bitrateTestDelay;
    bwEstimator: EwmaBandWidthEstimator;
    constructor(hls: Hls);
    resetEstimator(abrEwmaDefaultEstimate?: number): void;
    private initEstimator;
    protected registerListeners(): void;
    protected unregisterListeners(): void;
    destroy(): void;
    protected onManifestLoading(event: Events.MANIFEST_LOADING, data: ManifestLoadingData): void;
    private onLevelsUpdated;
    private onMaxAutoLevelUpdated;
    protected onFragLoading(event: Events.FRAG_LOADING, data: FragLoadingData): void;
    protected onLevelSwitching(event: Events.LEVEL_SWITCHING, data: LevelSwitchingData): void;
    protected onError(event: Events.ERROR, data: ErrorData): void;
    private getTimeToLoadFrag;
    protected onLevelLoaded(event: Events.LEVEL_LOADED, data: LevelLoadedData): void;
    private _abandonRulesCheck;
    protected onFragLoaded(event: Events.FRAG_LOADED, { frag, part }: FragLoadedData): void;
    protected onFragBuffered(event: Events.FRAG_BUFFERED, data: FragBufferedData): void;
    private ignoreFragment;
    clearTimer(): void;
    get firstAutoLevel(): number;
    get forcedAutoLevel(): number;
    get nextAutoLevel(): number;
    private getAutoLevelKey;
    private getNextABRAutoLevel;
    private getStarvationDelay;
    private getBwEstimate;
    private findBestLevel;
    set nextAutoLevel(nextLevel: number);
}

export declare type ABRControllerConfig = {
    abrEwmaFastLive: number;
    abrEwmaSlowLive: number;
    abrEwmaFastVoD: number;
    abrEwmaSlowVoD: number;
    /**
     * Default bandwidth estimate in bits/s prior to collecting fragment bandwidth samples
     */
    abrEwmaDefaultEstimate: number;
    abrEwmaDefaultEstimateMax: number;
    abrBandWidthFactor: number;
    abrBandWidthUpFactor: number;
    abrMaxWithRealBitrate: boolean;
    maxStarvationDelay: number;
    maxLoadingDelay: number;
};

export declare class AttrList {
    [key: string]: any;
    constructor(attrs: string | Record<string, any>);
    get clientAttrs(): string[];
    decimalInteger(attrName: string): number;
    hexadecimalInteger(attrName: string): Uint8Array | null;
    hexadecimalIntegerAsNumber(attrName: string): number;
    decimalFloatingPoint(attrName: string): number;
    optionalFloat(attrName: string, defaultValue: number): number;
    enumeratedString(attrName: string): string | undefined;
    bool(attrName: string): boolean;
    decimalResolution(attrName: string): {
        width: number;
        height: number;
    } | undefined;
    static parseAttrList(input: string): Record<string, any>;
}

export declare type AudioPlaylistType = 'AUDIO';

export declare type AudioSelectionOption = {
    lang?: string;
    assocLang?: string;
    characteristics?: string;
    channels?: string;
    name?: string;
    audioCodec?: string;
    groupId?: string;
    default?: boolean;
};

export declare class AudioStreamController extends BaseStreamController implements NetworkComponentAPI {
    private videoBuffer;
    private videoTrackCC;
    private waitingVideoCC;
    private bufferedTrack;
    private switchingTrack;
    private trackId;
    private waitingData;
    private mainDetails;
    private flushing;
    private bufferFlushed;
    private cachedTrackLoadedData;
    constructor(hls: Hls, fragmentTracker: FragmentTracker, keyLoader: KeyLoader);
    protected onHandlerDestroying(): void;
    private _registerListeners;
    private _unregisterListeners;
    onInitPtsFound(event: Events.INIT_PTS_FOUND, { frag, id, initPTS, timescale }: InitPTSFoundData): void;
    startLoad(startPosition: number): void;
    doTick(): void;
    clearWaitingFragment(): void;
    protected resetLoadingState(): void;
    protected onTickEnd(): void;
    private doTickIdle;
    protected getMaxBufferLength(mainBufferLength?: number): number;
    onMediaDetaching(): void;
    onAudioTracksUpdated(event: Events.AUDIO_TRACKS_UPDATED, { audioTracks }: AudioTracksUpdatedData): void;
    onAudioTrackSwitching(event: Events.AUDIO_TRACK_SWITCHING, data: AudioTrackSwitchingData): void;
    onManifestLoading(): void;
    onLevelLoaded(event: Events.LEVEL_LOADED, data: LevelLoadedData): void;
    onAudioTrackLoaded(event: Events.AUDIO_TRACK_LOADED, data: TrackLoadedData): void;
    _handleFragmentLoadProgress(data: FragLoadedData): void;
    protected _handleFragmentLoadComplete(fragLoadedData: FragLoadedData): void;
    onBufferReset(): void;
    onBufferCreated(event: Events.BUFFER_CREATED, data: BufferCreatedData): void;
    onFragBuffered(event: Events.FRAG_BUFFERED, data: FragBufferedData): void;
    private onError;
    private onBufferFlushing;
    private onBufferFlushed;
    private _handleTransmuxComplete;
    private _bufferInitSegment;
    protected loadFragment(frag: Fragment, track: Level, targetBufferTime: number): void;
    private flushAudioIfNeeded;
    private completeAudioSwitch;
}

export declare class AudioTrackController extends BasePlaylistController {
    private tracks;
    private groupIds;
    private tracksInGroup;
    private trackId;
    private currentTrack;
    private selectDefaultTrack;
    constructor(hls: Hls);
    private registerListeners;
    private unregisterListeners;
    destroy(): void;
    protected onManifestLoading(): void;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
    protected onAudioTrackLoaded(event: Events.AUDIO_TRACK_LOADED, data: AudioTrackLoadedData): void;
    protected onLevelLoading(event: Events.LEVEL_LOADING, data: LevelLoadingData): void;
    protected onLevelSwitching(event: Events.LEVEL_SWITCHING, data: LevelSwitchingData): void;
    private switchLevel;
    protected onError(event: Events.ERROR, data: ErrorData): void;
    get allAudioTracks(): MediaPlaylist[];
    get audioTracks(): MediaPlaylist[];
    get audioTrack(): number;
    set audioTrack(newId: number);
    setAudioOption(audioOption: MediaPlaylist | AudioSelectionOption | undefined): MediaPlaylist | null;
    private setAudioTrack;
    private findTrackId;
    protected loadPlaylist(hlsUrlParameters?: HlsUrlParameters): void;
}

export declare interface AudioTrackLoadedData extends TrackLoadedData {
}

export declare interface AudioTracksUpdatedData {
    audioTracks: MediaPlaylist[];
}

export declare interface AudioTrackSwitchedData extends MediaPlaylist {
}

export declare interface AudioTrackSwitchingData extends MediaPlaylist {
}

export declare interface BackBufferData {
    bufferEnd: number;
}

export declare class BasePlaylistController implements NetworkComponentAPI {
    protected hls: Hls;
    protected timer: number;
    protected requestScheduled: number;
    protected canLoad: boolean;
    protected log: (msg: any) => void;
    protected warn: (msg: any) => void;
    constructor(hls: Hls, logPrefix: string);
    destroy(): void;
    protected clearTimer(): void;
    startLoad(): void;
    stopLoad(): void;
    protected switchParams(playlistUri: string, previous: LevelDetails | undefined, current: LevelDetails | undefined): HlsUrlParameters | undefined;
    protected loadPlaylist(hlsUrlParameters?: HlsUrlParameters): void;
    protected shouldLoadPlaylist(playlist: Level | MediaPlaylist | null | undefined): boolean;
    protected shouldReloadPlaylist(playlist: Level | MediaPlaylist | null | undefined): boolean;
    protected playlistLoaded(index: number, data: LevelLoadedData | AudioTrackLoadedData | TrackLoadedData, previousDetails?: LevelDetails): void;
    private getDeliveryDirectives;
    protected checkRetry(errorEvent: ErrorData): boolean;
}

export declare class BaseSegment {
    private _byteRange;
    private _url;
    readonly baseurl: string;
    relurl?: string;
    elementaryStreams: ElementaryStreams;
    constructor(baseurl: string);
    setByteRange(value: string, previous?: BaseSegment): void;
    get byteRange(): [number, number] | [];
    get byteRangeStartOffset(): number | undefined;
    get byteRangeEndOffset(): number | undefined;
    get url(): string;
    set url(value: string);
}

export declare class BaseStreamController extends TaskLoop implements NetworkComponentAPI {
    protected hls: Hls;
    protected fragPrevious: Fragment | null;
    protected fragCurrent: Fragment | null;
    protected fragmentTracker: FragmentTracker;
    protected transmuxer: TransmuxerInterface | null;
    protected _state: string;
    protected playlistType: PlaylistLevelType;
    protected media: HTMLMediaElement | null;
    protected mediaBuffer: Bufferable | null;
    protected config: HlsConfig;
    protected bitrateTest: boolean;
    protected lastCurrentTime: number;
    protected nextLoadPosition: number;
    protected startPosition: number;
    protected startTimeOffset: number | null;
    protected loadedmetadata: boolean;
    protected retryDate: number;
    protected levels: Array<Level> | null;
    protected fragmentLoader: FragmentLoader;
    protected keyLoader: KeyLoader;
    protected levelLastLoaded: Level | null;
    protected startFragRequested: boolean;
    protected decrypter: Decrypter;
    protected initPTS: RationalTimestamp[];
    protected buffering: boolean;
    protected onvseeking: EventListener | null;
    protected onvended: EventListener | null;
    private readonly logPrefix;
    protected log: (msg: any) => void;
    protected warn: (msg: any) => void;
    constructor(hls: Hls, fragmentTracker: FragmentTracker, keyLoader: KeyLoader, logPrefix: string, playlistType: PlaylistLevelType);
    protected doTick(): void;
    protected onTickEnd(): void;
    startLoad(startPosition: number): void;
    stopLoad(): void;
    pauseBuffering(): void;
    resumeBuffering(): void;
    protected _streamEnded(bufferInfo: BufferInfo, levelDetails: LevelDetails): boolean;
    protected getLevelDetails(): LevelDetails | undefined;
    protected onMediaAttached(event: Events.MEDIA_ATTACHED, data: MediaAttachedData): void;
    protected onMediaDetaching(): void;
    protected onMediaSeeking(): void;
    protected onMediaEnded(): void;
    protected onManifestLoaded(event: Events.MANIFEST_LOADED, data: ManifestLoadedData): void;
    protected onHandlerDestroying(): void;
    protected onHandlerDestroyed(): void;
    protected loadFragment(frag: Fragment, level: Level, targetBufferTime: number): void;
    private _loadFragForPlayback;
    protected clearTrackerIfNeeded(frag: Fragment): void;
    protected checkLiveUpdate(details: LevelDetails): void;
    protected flushMainBuffer(startOffset: number, endOffset: number, type?: SourceBufferName | null): void;
    protected _loadInitSegment(frag: Fragment, level: Level): void;
    private completeInitSegmentLoad;
    protected fragContextChanged(frag: Fragment | null): boolean;
    protected fragBufferedComplete(frag: Fragment, part: Part | null): void;
    protected seekToStartPos(): void;
    protected _handleFragmentLoadComplete(fragLoadedEndData: PartsLoadedData): void;
    protected _handleFragmentLoadProgress(frag: PartsLoadedData | FragLoadedData): void;
    protected _doFragLoad(frag: Fragment, level: Level, targetBufferTime?: number | null, progressCallback?: FragmentLoadProgressCallback): Promise<PartsLoadedData | FragLoadedData | null>;
    private doFragPartsLoad;
    private handleFragLoadError;
    protected _handleTransmuxerFlush(chunkMeta: ChunkMetadata): void;
    protected getCurrentContext(chunkMeta: ChunkMetadata): {
        frag: Fragment;
        part: Part | null;
        level: Level;
    } | null;
    protected bufferFragmentData(data: RemuxedTrack, frag: Fragment, part: Part | null, chunkMeta: ChunkMetadata, noBacktracking?: boolean): void;
    protected flushBufferGap(frag: Fragment): void;
    protected getFwdBufferInfo(bufferable: Bufferable | null, type: PlaylistLevelType): BufferInfo | null;
    protected getFwdBufferInfoAtPos(bufferable: Bufferable | null, pos: number, type: PlaylistLevelType): BufferInfo | null;
    protected getMaxBufferLength(levelBitrate?: number): number;
    protected reduceMaxBufferLength(threshold: number, fragDuration: number): boolean;
    protected getAppendedFrag(position: number, playlistType?: PlaylistLevelType): Fragment | null;
    protected getNextFragment(pos: number, levelDetails: LevelDetails): Fragment | null;
    protected isLoopLoading(frag: Fragment, targetBufferTime: number): boolean;
    protected getNextFragmentLoopLoading(frag: Fragment, levelDetails: LevelDetails, bufferInfo: BufferInfo, playlistType: PlaylistLevelType, maxBufLen: number): Fragment | null;
    mapToInitFragWhenRequired(frag: Fragment | null): typeof frag;
    getNextPart(partList: Part[], frag: Fragment, targetBufferTime: number): number;
    private loadedEndOfParts;
    protected getInitialLiveFragment(levelDetails: LevelDetails, fragments: Array<Fragment>): Fragment | null;
    protected getFragmentAtPosition(bufferEnd: number, end: number, levelDetails: LevelDetails): Fragment | null;
    protected synchronizeToLiveEdge(levelDetails: LevelDetails): void;
    protected alignPlaylists(details: LevelDetails, previousDetails: LevelDetails | undefined, switchDetails: LevelDetails | undefined): number;
    protected waitForCdnTuneIn(details: LevelDetails): boolean | 0;
    protected setStartPosition(details: LevelDetails, sliding: number): void;
    protected getLoadPosition(): number;
    private handleFragLoadAborted;
    protected resetFragmentLoading(frag: Fragment): void;
    protected onFragmentOrKeyLoadError(filterType: PlaylistLevelType, data: ErrorData): void;
    protected reduceLengthAndFlushBuffer(data: ErrorData): boolean;
    protected resetFragmentErrors(filterType: PlaylistLevelType): void;
    protected afterBufferFlushed(media: Bufferable, bufferType: SourceBufferName, playlistType: PlaylistLevelType): void;
    protected resetLoadingState(): void;
    protected resetStartWhenNotLoaded(level: Level | null): void;
    protected resetWhenMissingContext(chunkMeta: ChunkMetadata): void;
    protected removeUnbufferedFrags(start?: number): void;
    private updateLevelTiming;
    protected resetTransmuxer(): void;
    protected recoverWorkerError(data: ErrorData): void;
    set state(nextState: string);
    get state(): string;
}

declare type Bufferable = {
    buffered: TimeRanges;
};

export declare interface BufferAppendedData {
    type: SourceBufferName;
    frag: Fragment;
    part: Part | null;
    chunkMeta: ChunkMetadata;
    parent: PlaylistLevelType;
    timeRanges: Partial<Record<SourceBufferName, TimeRanges>>;
}

export declare interface BufferAppendingData {
    type: SourceBufferName;
    frag: Fragment;
    part: Part | null;
    chunkMeta: ChunkMetadata;
    parent: PlaylistLevelType;
    data: Uint8Array;
}

export declare interface BufferCodecsData {
    video?: Track;
    audio?: Track;
}

export declare class BufferController implements ComponentAPI {
    private details;
    private _objectUrl;
    private operationQueue;
    private listeners;
    private hls;
    bufferCodecEventsExpected: number;
    private _bufferCodecEventsTotal;
    media: HTMLMediaElement | null;
    mediaSource: MediaSource | null;
    private lastMpegAudioChunk;
    private appendSource;
    appendErrors: {
        audio: number;
        video: number;
        audiovideo: number;
    };
    tracks: TrackSet;
    pendingTracks: TrackSet;
    sourceBuffer: SourceBuffers;
    protected log: (msg: any) => void;
    protected warn: (msg: any, obj?: any) => void;
    protected error: (msg: any, obj?: any) => void;
    constructor(hls: Hls);
    hasSourceTypes(): boolean;
    destroy(): void;
    protected registerListeners(): void;
    protected unregisterListeners(): void;
    private _initSourceBuffer;
    private onManifestLoading;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
    protected onMediaAttaching(event: Events.MEDIA_ATTACHING, data: MediaAttachingData): void;
    private _onEndStreaming;
    private _onStartStreaming;
    protected onMediaDetaching(): void;
    protected onBufferReset(): void;
    private resetBuffer;
    protected onBufferCodecs(event: Events.BUFFER_CODECS, data: BufferCodecsData): void;
    protected appendChangeType(type: any, mimeType: any): void;
    protected onBufferAppending(event: Events.BUFFER_APPENDING, eventData: BufferAppendingData): void;
    protected onBufferFlushing(event: Events.BUFFER_FLUSHING, data: BufferFlushingData): void;
    protected onFragParsed(event: Events.FRAG_PARSED, data: FragParsedData): void;
    private onFragChanged;
    protected onBufferEos(event: Events.BUFFER_EOS, data: BufferEOSData): void;
    protected onLevelUpdated(event: Events.LEVEL_UPDATED, { details }: LevelUpdatedData): void;
    trimBuffers(): void;
    flushBackBuffer(currentTime: number, targetDuration: number, targetBackBufferPosition: number): void;
    flushFrontBuffer(currentTime: number, targetDuration: number, targetFrontBufferPosition: number): void;
    /**
     * Update Media Source duration to current level duration or override to Infinity if configuration parameter
     * 'liveDurationInfinity` is set to `true`
     * More details: https://github.com/video-dev/hls.js/issues/355
     */
    private updateMediaElementDuration;
    updateSeekableRange(levelDetails: any): void;
    protected checkPendingTracks(): void;
    protected createSourceBuffers(tracks: TrackSet): void;
    private _onMediaSourceOpen;
    private _onMediaSourceClose;
    private _onMediaSourceEnded;
    private _onMediaEmptied;
    private get mediaSrc();
    private _onSBUpdateStart;
    private _onSBUpdateEnd;
    private _onSBUpdateError;
    private removeExecutor;
    private appendExecutor;
    private blockBuffers;
    private getSourceBufferTypes;
    private addBufferListener;
    private removeBufferListeners;
}

export declare type BufferControllerConfig = {
    appendErrorMaxRetry: number;
    backBufferLength: number;
    frontBufferFlushThreshold: number;
    liveDurationInfinity: boolean;
    /**
     * @deprecated use backBufferLength
     */
    liveBackBufferLength: number | null;
};

export declare interface BufferCreatedData {
    tracks: TrackSet;
}

export declare interface BufferEOSData {
    type?: SourceBufferName;
}

export declare interface BufferFlushedData {
    type: SourceBufferName;
}

export declare interface BufferFlushingData {
    startOffset: number;
    endOffset: number;
    endOffsetSubtitles?: number;
    type: SourceBufferName | null;
}

export declare type BufferInfo = {
    len: number;
    start: number;
    end: number;
    nextStart?: number;
};

export declare class CapLevelController implements ComponentAPI {
    private hls;
    private autoLevelCapping;
    private firstLevel;
    private media;
    private restrictedLevels;
    private timer;
    private clientRect;
    private streamController?;
    constructor(hls: Hls);
    setStreamController(streamController: StreamController): void;
    destroy(): void;
    protected registerListeners(): void;
    protected unregisterListener(): void;
    protected onFpsDropLevelCapping(event: Events.FPS_DROP_LEVEL_CAPPING, data: FPSDropLevelCappingData): void;
    protected onMediaAttaching(event: Events.MEDIA_ATTACHING, data: MediaAttachingData): void;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
    private onLevelsUpdated;
    protected onBufferCodecs(event: Events.BUFFER_CODECS, data: BufferCodecsData): void;
    protected onMediaDetaching(): void;
    detectPlayerSize(): void;
    getMaxLevel(capLevelIndex: number): number;
    startCapping(): void;
    stopCapping(): void;
    getDimensions(): {
        width: number;
        height: number;
    };
    get mediaWidth(): number;
    get mediaHeight(): number;
    get contentScaleFactor(): number;
    private isLevelAllowed;
    static getMaxLevelByMediaSize(levels: Array<Level>, width: number, height: number): number;
}

export declare type CapLevelControllerConfig = {
    capLevelToPlayerSize: boolean;
};

/**
 * Keep a CEA-608 screen of 32x15 styled characters
 * @constructor
 */
declare class CaptionScreen {
    rows: Row[];
    currRow: number;
    nrRollUpRows: number | null;
    lastOutputScreen: CaptionScreen | null;
    logger: CaptionsLogger;
    constructor(logger: CaptionsLogger);
    reset(): void;
    equals(other: CaptionScreen): boolean;
    copy(other: CaptionScreen): void;
    isEmpty(): boolean;
    backSpace(): void;
    clearToEndOfRow(): void;
    /**
     * Insert a character (without styling) in the current row.
     */
    insertChar(char: number): void;
    setPen(styles: Partial<PenStyles>): void;
    moveCursor(relPos: number): void;
    setCursor(absPos: number): void;
    setPAC(pacData: PACData): void;
    /**
     * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
     */
    setBkgData(bkgData: Partial<PenStyles>): void;
    setRollUpRows(nrRows: number | null): void;
    rollUp(): void;
    /**
     * Get all non-empty rows with as unicode text.
     */
    getDisplayText(asOneRow?: boolean): string;
    getTextAndFormat(): Row[];
}

declare class CaptionsLogger {
    time: number | null;
    verboseLevel: VerboseLevel;
    log(severity: VerboseLevel, msg: string | (() => string)): void;
}

export declare class ChunkMetadata {
    readonly level: number;
    readonly sn: number;
    readonly part: number;
    readonly id: number;
    readonly size: number;
    readonly partial: boolean;
    readonly transmuxing: HlsChunkPerformanceTiming;
    readonly buffering: {
        [key in SourceBufferName]: HlsChunkPerformanceTiming;
    };
    constructor(level: number, sn: number, id: number, size?: number, part?: number, partial?: boolean);
}

/**
 * Controller to deal with Common Media Client Data (CMCD)
 * @see https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf
 */
export declare class CMCDController implements ComponentAPI {
    private hls;
    private config;
    private media?;
    private sid?;
    private cid?;
    private useHeaders;
    private includeKeys?;
    private initialized;
    private starved;
    private buffering;
    private audioBuffer?;
    private videoBuffer?;
    constructor(hls: Hls);
    private registerListeners;
    private unregisterListeners;
    destroy(): void;
    private onMediaAttached;
    private onMediaDetached;
    private onBufferCreated;
    private onWaiting;
    private onPlaying;
    /**
     * Create baseline CMCD data
     */
    private createData;
    /**
     * Apply CMCD data to a request.
     */
    private apply;
    /**
     * Apply CMCD data to a manifest request.
     */
    private applyPlaylistData;
    /**
     * Apply CMCD data to a segment request
     */
    private applyFragmentData;
    /**
     * The CMCD object type.
     */
    private getObjectType;
    /**
     * Get the highest bitrate.
     */
    private getTopBandwidth;
    /**
     * Get the buffer length for a media type in milliseconds
     */
    private getBufferLength;
    /**
     * Create a playlist loader
     */
    private createPlaylistLoader;
    /**
     * Create a playlist loader
     */
    private createFragmentLoader;
}

export declare type CMCDControllerConfig = {
    sessionId?: string;
    contentId?: string;
    useHeaders?: boolean;
    includeKeys?: string[];
};

export declare interface ComponentAPI {
    destroy(): void;
}

export declare class ContentSteeringController implements NetworkComponentAPI {
    private readonly hls;
    private log;
    private loader;
    private uri;
    private pathwayId;
    private pathwayPriority;
    private timeToLoad;
    private reloadTimer;
    private updated;
    private started;
    private enabled;
    private levels;
    private audioTracks;
    private subtitleTracks;
    private penalizedPathways;
    constructor(hls: Hls);
    private registerListeners;
    private unregisterListeners;
    startLoad(): void;
    stopLoad(): void;
    clearTimeout(): void;
    destroy(): void;
    removeLevel(levelToRemove: Level): void;
    private onManifestLoading;
    private onManifestLoaded;
    private onManifestParsed;
    private onError;
    filterParsedLevels(levels: Level[]): Level[];
    private getLevelsForPathway;
    private updatePathwayPriority;
    private getPathwayForGroupId;
    private clonePathways;
    private loadSteeringManifest;
    private scheduleRefresh;
}

export declare type ContentSteeringOptions = {
    uri: string;
    pathwayId: string;
};

export declare interface CuesInterface {
    newCue(track: TextTrack | null, startTime: number, endTime: number, captionScreen: CaptionScreen): VTTCue[];
}

export declare interface CuesParsedData {
    type: 'captions' | 'subtitles';
    cues: any;
    track: string;
}

export declare class DateRange {
    attr: AttrList;
    private _startDate;
    private _endDate?;
    private _badValueForSameId?;
    constructor(dateRangeAttr: AttrList, dateRangeWithSameId?: DateRange);
    get id(): string;
    get class(): string;
    get startDate(): Date;
    get endDate(): Date | null;
    get duration(): number | null;
    get plannedDuration(): number | null;
    get endOnNext(): boolean;
    get isValid(): boolean;
}

declare interface DecryptData {
    uri: string;
    method: string;
    keyFormat: string;
    keyFormatVersions: number[];
    iv: Uint8Array | null;
    key: Uint8Array | null;
    keyId: Uint8Array | null;
    pssh: Uint8Array | null;
    encrypted: boolean;
    isCommonEncryption: boolean;
}

declare class Decrypter {
    private logEnabled;
    private removePKCS7Padding;
    private subtle;
    private softwareDecrypter;
    private key;
    private fastAesKey;
    private remainderData;
    private currentIV;
    private currentResult;
    private useSoftware;
    constructor(config: HlsConfig, { removePKCS7Padding }?: {
        removePKCS7Padding?: boolean | undefined;
    });
    destroy(): void;
    isSync(): boolean;
    flush(): Uint8Array | null;
    reset(): void;
    decrypt(data: Uint8Array | ArrayBuffer, key: ArrayBuffer, iv: ArrayBuffer): Promise<ArrayBuffer>;
    softwareDecrypt(data: Uint8Array, key: ArrayBuffer, iv: ArrayBuffer): ArrayBuffer | null;
    webCryptoDecrypt(data: Uint8Array, key: ArrayBuffer, iv: ArrayBuffer): Promise<ArrayBuffer>;
    private onWebCryptoError;
    private getValidChunk;
    private logOnce;
}

declare type DRMSystemConfiguration = {
    licenseUrl: string;
    serverCertificateUrl?: string;
    generateRequest?: (this: Hls, initDataType: string, initData: ArrayBuffer | null, keyContext: MediaKeySessionContext) => {
        initDataType: string;
        initData: ArrayBuffer | null;
    } | undefined | never;
};

export declare type DRMSystemOptions = {
    audioRobustness?: string;
    videoRobustness?: string;
    audioEncryptionScheme?: string | null;
    videoEncryptionScheme?: string | null;
    persistentState?: MediaKeysRequirement;
    distinctiveIdentifier?: MediaKeysRequirement;
    sessionTypes?: string[];
    sessionType?: string;
};

export declare type DRMSystemsConfiguration = Partial<Record<KeySystems, DRMSystemConfiguration>>;

export declare interface ElementaryStreamInfo {
    startPTS: number;
    endPTS: number;
    startDTS: number;
    endDTS: number;
    partial?: boolean;
}

export declare type ElementaryStreams = Record<ElementaryStreamTypes, ElementaryStreamInfo | null>;

export declare const enum ElementaryStreamTypes {
    AUDIO = "audio",
    VIDEO = "video",
    AUDIOVIDEO = "audiovideo"
}

/**
 * Controller to deal with encrypted media extensions (EME)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API
 *
 * @class
 * @constructor
 */
export declare class EMEController implements ComponentAPI {
    static CDMCleanupPromise: Promise<void> | void;
    private readonly hls;
    private readonly config;
    private media;
    private keyFormatPromise;
    private keySystemAccessPromises;
    private _requestLicenseFailureCount;
    private mediaKeySessions;
    private keyIdToKeySessionPromise;
    private setMediaKeysQueue;
    private debug;
    private log;
    private warn;
    private error;
    constructor(hls: Hls);
    destroy(): void;
    private registerListeners;
    private unregisterListeners;
    private getLicenseServerUrl;
    private getLicenseServerUrlOrThrow;
    private getServerCertificateUrl;
    private attemptKeySystemAccess;
    private requestMediaKeySystemAccess;
    private getMediaKeysPromise;
    private createMediaKeySessionContext;
    private renewKeySession;
    private getKeyIdString;
    private updateKeySession;
    selectKeySystemFormat(frag: Fragment): Promise<KeySystemFormats>;
    private getKeyFormatPromise;
    loadKey(data: KeyLoadedData): Promise<MediaKeySessionContext>;
    private throwIfDestroyed;
    private handleError;
    private getKeySystemForKeyPromise;
    private getKeySystemSelectionPromise;
    private onMediaEncrypted;
    private onWaitingForKey;
    private attemptSetMediaKeys;
    private generateRequestWithPreferredKeySession;
    private onKeyStatusChange;
    private fetchServerCertificate;
    private setMediaKeysServerCertificate;
    private renewLicense;
    private unpackPlayReadyKeyMessage;
    private setupLicenseXHR;
    private requestLicense;
    private onMediaAttached;
    private onMediaDetached;
    private onManifestLoading;
    private onManifestLoaded;
    private removeSession;
}

export declare type EMEControllerConfig = {
    licenseXhrSetup?: (this: Hls, xhr: XMLHttpRequest, url: string, keyContext: MediaKeySessionContext, licenseChallenge: Uint8Array) => void | Uint8Array | Promise<Uint8Array | void>;
    licenseResponseCallback?: (this: Hls, xhr: XMLHttpRequest, url: string, keyContext: MediaKeySessionContext) => ArrayBuffer;
    emeEnabled: boolean;
    widevineLicenseUrl?: string;
    drmSystems: DRMSystemsConfiguration;
    drmSystemOptions: DRMSystemOptions;
    requestMediaKeySystemAccessFunc: MediaKeyFunc | null;
};

export declare const enum ErrorActionFlags {
    None = 0,
    MoveAllAlternatesMatchingHost = 1,
    MoveAllAlternatesMatchingHDCP = 2,
    SwitchToSDR = 4
}

export declare class ErrorController implements NetworkComponentAPI {
    private readonly hls;
    private playlistError;
    private penalizedRenditions;
    private log;
    private warn;
    private error;
    constructor(hls: Hls);
    private registerListeners;
    private unregisterListeners;
    destroy(): void;
    startLoad(startPosition: number): void;
    stopLoad(): void;
    private getVariantLevelIndex;
    private onManifestLoading;
    private onLevelUpdated;
    private onError;
    private keySystemError;
    private getPlaylistRetryOrSwitchAction;
    private getFragRetryOrSwitchAction;
    private getLevelSwitchAction;
    onErrorOut(event: Events.ERROR, data: ErrorData): void;
    private sendAlternateToPenaltyBox;
    private switchLevel;
}

export declare interface ErrorData {
    type: ErrorTypes;
    details: ErrorDetails;
    error: Error;
    fatal: boolean;
    errorAction?: IErrorAction;
    buffer?: number;
    bytes?: number;
    chunkMeta?: ChunkMetadata;
    context?: PlaylistLoaderContext;
    event?: keyof HlsListeners | 'demuxerWorker';
    frag?: Fragment;
    part?: Part | null;
    level?: number | undefined;
    levelRetry?: boolean;
    loader?: Loader<LoaderContext>;
    networkDetails?: any;
    stats?: LoaderStats;
    mimeType?: string;
    reason?: string;
    response?: LoaderResponse;
    url?: string;
    parent?: PlaylistLevelType;
    sourceBufferName?: SourceBufferName;
    /**
     * @deprecated Use ErrorData.error
     */
    err?: {
        message: string;
    };
}

export declare enum ErrorDetails {
    KEY_SYSTEM_NO_KEYS = "keySystemNoKeys",
    KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess",
    KEY_SYSTEM_NO_SESSION = "keySystemNoSession",
    KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense",
    KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed",
    KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed",
    KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed",
    KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed",
    KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted",
    KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError",
    MANIFEST_LOAD_ERROR = "manifestLoadError",
    MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut",
    MANIFEST_PARSING_ERROR = "manifestParsingError",
    MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError",
    LEVEL_EMPTY_ERROR = "levelEmptyError",
    LEVEL_LOAD_ERROR = "levelLoadError",
    LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut",
    LEVEL_PARSING_ERROR = "levelParsingError",
    LEVEL_SWITCH_ERROR = "levelSwitchError",
    AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError",
    AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut",
    SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError",
    SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut",
    FRAG_LOAD_ERROR = "fragLoadError",
    FRAG_LOAD_TIMEOUT = "fragLoadTimeOut",
    FRAG_DECRYPT_ERROR = "fragDecryptError",
    FRAG_PARSING_ERROR = "fragParsingError",
    FRAG_GAP = "fragGap",
    REMUX_ALLOC_ERROR = "remuxAllocError",
    KEY_LOAD_ERROR = "keyLoadError",
    KEY_LOAD_TIMEOUT = "keyLoadTimeOut",
    BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError",
    BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError",
    BUFFER_APPEND_ERROR = "bufferAppendError",
    BUFFER_APPENDING_ERROR = "bufferAppendingError",
    BUFFER_STALLED_ERROR = "bufferStalledError",
    BUFFER_FULL_ERROR = "bufferFullError",
    BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole",
    BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall",
    INTERNAL_EXCEPTION = "internalException",
    INTERNAL_ABORTED = "aborted",
    UNKNOWN = "unknown"
}

export declare enum ErrorTypes {
    NETWORK_ERROR = "networkError",
    MEDIA_ERROR = "mediaError",
    KEY_SYSTEM_ERROR = "keySystemError",
    MUX_ERROR = "muxError",
    OTHER_ERROR = "otherError"
}

export declare enum Events {
    MEDIA_ATTACHING = "hlsMediaAttaching",
    MEDIA_ATTACHED = "hlsMediaAttached",
    MEDIA_DETACHING = "hlsMediaDetaching",
    MEDIA_DETACHED = "hlsMediaDetached",
    BUFFER_RESET = "hlsBufferReset",
    BUFFER_CODECS = "hlsBufferCodecs",
    BUFFER_CREATED = "hlsBufferCreated",
    BUFFER_APPENDING = "hlsBufferAppending",
    BUFFER_APPENDED = "hlsBufferAppended",
    BUFFER_EOS = "hlsBufferEos",
    BUFFER_FLUSHING = "hlsBufferFlushing",
    BUFFER_FLUSHED = "hlsBufferFlushed",
    MANIFEST_LOADING = "hlsManifestLoading",
    MANIFEST_LOADED = "hlsManifestLoaded",
    MANIFEST_PARSED = "hlsManifestParsed",
    LEVEL_SWITCHING = "hlsLevelSwitching",
    LEVEL_SWITCHED = "hlsLevelSwitched",
    LEVEL_LOADING = "hlsLevelLoading",
    LEVEL_LOADED = "hlsLevelLoaded",
    LEVEL_UPDATED = "hlsLevelUpdated",
    LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated",
    LEVELS_UPDATED = "hlsLevelsUpdated",
    AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated",
    AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching",
    AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched",
    AUDIO_TRACK_LOADING = "hlsAudioTrackLoading",
    AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded",
    SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated",
    SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared",
    SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch",
    SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading",
    SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded",
    SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed",
    CUES_PARSED = "hlsCuesParsed",
    NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound",
    INIT_PTS_FOUND = "hlsInitPtsFound",
    FRAG_LOADING = "hlsFragLoading",
    FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted",
    FRAG_LOADED = "hlsFragLoaded",
    FRAG_DECRYPTED = "hlsFragDecrypted",
    FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment",
    FRAG_PARSING_USERDATA = "hlsFragParsingUserdata",
    FRAG_PARSING_METADATA = "hlsFragParsingMetadata",
    FRAG_PARSED = "hlsFragParsed",
    FRAG_BUFFERED = "hlsFragBuffered",
    FRAG_CHANGED = "hlsFragChanged",
    FPS_DROP = "hlsFpsDrop",
    FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping",
    MAX_AUTO_LEVEL_UPDATED = "hlsMaxAutoLevelUpdated",
    ERROR = "hlsError",
    DESTROYING = "hlsDestroying",
    KEY_LOADING = "hlsKeyLoading",
    KEY_LOADED = "hlsKeyLoaded",
    LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached",
    BACK_BUFFER_REACHED = "hlsBackBufferReached",
    STEERING_MANIFEST_LOADED = "hlsSteeringManifestLoaded"
}

declare class EwmaBandWidthEstimator {
    private defaultEstimate_;
    private minWeight_;
    private minDelayMs_;
    private slow_;
    private fast_;
    private defaultTTFB_;
    private ttfb_;
    constructor(slow: number, fast: number, defaultEstimate: number, defaultTTFB?: number);
    update(slow: number, fast: number): void;
    sample(durationMs: number, numBytes: number): void;
    sampleTTFB(ttfb: number): void;
    canEstimate(): boolean;
    getEstimate(): number;
    getEstimateTTFB(): number;
    destroy(): void;
}

declare type ExtendedSourceBuffer = SourceBuffer & {
    ended?: boolean;
    ending?: boolean;
    changeType?: (type: string) => void;
};

export declare class FPSController implements ComponentAPI {
    private hls;
    private isVideoPlaybackQualityAvailable;
    private timer?;
    private media;
    private lastTime;
    private lastDroppedFrames;
    private lastDecodedFrames;
    private streamController;
    constructor(hls: Hls);
    setStreamController(streamController: StreamController): void;
    protected registerListeners(): void;
    protected unregisterListeners(): void;
    destroy(): void;
    protected onMediaAttaching(event: Events.MEDIA_ATTACHING, data: MediaAttachingData): void;
    checkFPS(video: HTMLVideoElement, decodedFrames: number, droppedFrames: number): void;
    checkFPSInterval(): void;
}

export declare type FPSControllerConfig = {
    capLevelOnFPSDrop: boolean;
    fpsDroppedMonitoringPeriod: number;
    fpsDroppedMonitoringThreshold: number;
};

export declare interface FPSDropData {
    currentDropped: number;
    currentDecoded: number;
    totalDroppedFrames: number;
}

export declare interface FPSDropLevelCappingData {
    droppedLevel: number;
    level: number;
}

export declare interface FragBufferedData {
    stats: LoadStats;
    frag: Fragment;
    part: Part | null;
    id: string;
}

export declare interface FragChangedData {
    frag: Fragment;
}

export declare interface FragDecryptedData {
    frag: Fragment;
    payload: ArrayBuffer;
    stats: {
        tstart: number;
        tdecrypt: number;
    };
}

export declare interface FragLoadedData {
    frag: Fragment;
    part: Part | null;
    payload: ArrayBuffer;
    networkDetails: unknown;
}

export declare interface FragLoadEmergencyAbortedData {
    frag: Fragment;
    part: Part | null;
    stats: LoaderStats;
}

declare interface FragLoadFailResult extends ErrorData {
    frag: Fragment;
    part?: Part;
    response?: {
        data: any;
        code: number;
        text: string;
        url: string;
    };
    networkDetails: any;
}

export declare interface FragLoadingData {
    frag: Fragment;
    part?: Part;
    targetBufferTime: number | null;
}

/**
 * Object representing parsed data from an HLS Segment. Found in {@link hls.js#LevelDetails.fragments}.
 */
export declare class Fragment extends BaseSegment {
    private _decryptdata;
    rawProgramDateTime: string | null;
    programDateTime: number | null;
    tagList: Array<string[]>;
    duration: number;
    sn: number | 'initSegment';
    levelkeys?: {
        [key: string]: LevelKey;
    };
    readonly type: PlaylistLevelType;
    loader: Loader<FragmentLoaderContext> | null;
    keyLoader: Loader<KeyLoaderContext> | null;
    level: number;
    cc: number;
    startPTS?: number;
    endPTS?: number;
    startDTS: number;
    endDTS: number;
    start: number;
    deltaPTS?: number;
    maxStartPTS?: number;
    minEndPTS?: number;
    stats: LoadStats;
    data?: Uint8Array;
    bitrateTest: boolean;
    title: string | null;
    initSegment: Fragment | null;
    endList?: boolean;
    gap?: boolean;
    urlId: number;
    constructor(type: PlaylistLevelType, baseurl: string);
    get decryptdata(): LevelKey | null;
    get end(): number;
    get endProgramDateTime(): number | null;
    get encrypted(): boolean;
    setKeyFormat(keyFormat: KeySystemFormats): void;
    abortRequests(): void;
    setElementaryStreamInfo(type: ElementaryStreamTypes, startPTS: number, endPTS: number, startDTS: number, endDTS: number, partial?: boolean): void;
    clearElementaryStreamInfo(): void;
}

declare class FragmentLoader {
    private readonly config;
    private loader;
    private partLoadTimeout;
    constructor(config: HlsConfig);
    destroy(): void;
    abort(): void;
    load(frag: Fragment, onProgress?: FragmentLoadProgressCallback): Promise<FragLoadedData>;
    loadPart(frag: Fragment, part: Part, onProgress: FragmentLoadProgressCallback): Promise<FragLoadedData>;
    private updateStatsFromPart;
    private resetLoader;
}

/**
 * @deprecated use fragLoadPolicy.default
 */
export declare type FragmentLoaderConfig = {
    fragLoadingTimeOut: number;
    fragLoadingMaxRetry: number;
    fragLoadingRetryDelay: number;
    fragLoadingMaxRetryTimeout: number;
};

export declare interface FragmentLoaderConstructor {
    new (confg: HlsConfig): Loader<FragmentLoaderContext>;
}

export declare interface FragmentLoaderContext extends LoaderContext {
    frag: Fragment;
    part: Part | null;
    resetIV?: boolean;
}

declare type FragmentLoadProgressCallback = (result: FragLoadedData | PartsLoadedData) => void;

declare const enum FragmentState {
    NOT_LOADED = "NOT_LOADED",
    APPENDING = "APPENDING",
    PARTIAL = "PARTIAL",
    OK = "OK"
}

declare class FragmentTracker implements ComponentAPI {
    private activePartLists;
    private endListFragments;
    private fragments;
    private timeRanges;
    private bufferPadding;
    private hls;
    private hasGaps;
    constructor(hls: Hls);
    private _registerListeners;
    private _unregisterListeners;
    destroy(): void;
    /**
     * Return a Fragment or Part with an appended range that matches the position and levelType
     * Otherwise, return null
     */
    getAppendedFrag(position: number, levelType: PlaylistLevelType): Fragment | Part | null;
    /**
     * Return a buffered Fragment that matches the position and levelType.
     * A buffered Fragment is one whose loading, parsing and appending is done (completed or "partial" meaning aborted).
     * If not found any Fragment, return null
     */
    getBufferedFrag(position: number, levelType: PlaylistLevelType): Fragment | null;
    /**
     * Partial fragments effected by coded frame eviction will be removed
     * The browser will unload parts of the buffer to free up memory for new buffer data
     * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
     */
    detectEvictedFragments(elementaryStream: SourceBufferName, timeRange: TimeRanges, playlistType: PlaylistLevelType, appendedPart?: Part | null): void;
    /**
     * Checks if the fragment passed in is loaded in the buffer properly
     * Partially loaded fragments will be registered as a partial fragment
     */
    detectPartialFragments(data: FragBufferedData): void;
    private removeParts;
    fragBuffered(frag: Fragment, force?: true): void;
    private getBufferedTimes;
    /**
     * Gets the partial fragment for a certain time
     */
    getPartialFragment(time: number): Fragment | null;
    isEndListAppended(type: PlaylistLevelType): boolean;
    getState(fragment: Fragment): FragmentState;
    private isTimeBuffered;
    private onFragLoaded;
    private onBufferAppended;
    private onFragBuffered;
    private hasFragment;
    hasParts(type: PlaylistLevelType): boolean;
    removeFragmentsInRange(start: number, end: number, playlistType: PlaylistLevelType, withGapOnly?: boolean, unbufferedOnly?: boolean): void;
    removeFragment(fragment: Fragment): void;
    removeAllFragments(): void;
}

export declare interface FragParsedData {
    frag: Fragment;
    part: Part | null;
}

export declare interface FragParsingInitSegmentData {
}

export declare interface FragParsingMetadataData {
    id: string;
    frag: Fragment;
    details: LevelDetails;
    samples: MetadataSample[];
}

export declare interface FragParsingUserdataData {
    id: string;
    frag: Fragment;
    details: LevelDetails;
    samples: UserdataSample[];
}

export declare type HdcpLevel = (typeof HdcpLevels)[number];

declare const HdcpLevels: readonly ["NONE", "TYPE-0", "TYPE-1", null];

/**
 * The `Hls` class is the core of the HLS.js library used to instantiate player instances.
 * @public
 */
declare class Hls implements HlsEventEmitter {
    private static defaultConfig;
    /**
     * The runtime configuration used by the player. At instantiation this is combination of `hls.userConfig` merged over `Hls.DefaultConfig`.
     */
    readonly config: HlsConfig;
    /**
     * The configuration object provided on player instantiation.
     */
    readonly userConfig: Partial<HlsConfig>;
    private coreComponents;
    private networkControllers;
    private started;
    private _emitter;
    private _autoLevelCapping;
    private _maxHdcpLevel;
    private abrController;
    private bufferController;
    private capLevelController;
    private latencyController;
    private levelController;
    private streamController;
    private audioTrackController;
    private subtitleTrackController;
    private emeController;
    private cmcdController;
    private _media;
    private url;
    private triggeringException?;
    /**
     * Get the video-dev/hls.js package version.
     */
    static get version(): string;
    /**
     * Check if the required MediaSource Extensions are available.
     */
    static isMSESupported(): boolean;
    /**
     * Check if MediaSource Extensions are available and isTypeSupported checks pass for any baseline codecs.
     */
    static isSupported(): boolean;
    /**
     * Get the MediaSource global used for MSE playback (ManagedMediaSource, MediaSource, or WebKitMediaSource).
     */
    static getMediaSource(): typeof MediaSource | undefined;
    static get Events(): typeof Events;
    static get ErrorTypes(): typeof ErrorTypes;
    static get ErrorDetails(): typeof ErrorDetails;
    /**
     * Get the default configuration applied to new instances.
     */
    static get DefaultConfig(): HlsConfig;
    /**
     * Replace the default configuration applied to new instances.
     */
    static set DefaultConfig(defaultConfig: HlsConfig);
    /**
     * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
     * @param userConfig - Configuration options applied over `Hls.DefaultConfig`
     */
    constructor(userConfig?: Partial<HlsConfig>);
    createController(ControllerClass: any, components: any): any;
    on<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    once<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    removeAllListeners<E extends keyof HlsListeners>(event?: E | undefined): void;
    off<E extends keyof HlsListeners, Context = undefined>(event: E, listener?: HlsListeners[E] | undefined, context?: Context, once?: boolean | undefined): void;
    listeners<E extends keyof HlsListeners>(event: E): HlsListeners[E][];
    emit<E extends keyof HlsListeners>(event: E, name: E, eventObject: Parameters<HlsListeners[E]>[1]): boolean;
    trigger<E extends keyof HlsListeners>(event: E, eventObject: Parameters<HlsListeners[E]>[1]): boolean;
    listenerCount<E extends keyof HlsListeners>(event: E): number;
    /**
     * Dispose of the instance
     */
    destroy(): void;
    /**
     * Attaches Hls.js to a media element
     */
    attachMedia(media: HTMLMediaElement): void;
    /**
     * Detach Hls.js from the media
     */
    detachMedia(): void;
    /**
     * Set the source URL. Can be relative or absolute.
     */
    loadSource(url: string): void;
    /**
     * Start loading data from the stream source.
     * Depending on default config, client starts loading automatically when a source is set.
     *
     * @param startPosition - Set the start position to stream from.
     * Defaults to -1 (None: starts from earliest point)
     */
    startLoad(startPosition?: number): void;
    /**
     * Stop loading of any stream data.
     */
    stopLoad(): void;
    /**
     * Resumes stream controller segment loading after `pauseBuffering` has been called.
     */
    resumeBuffering(): void;
    /**
     * Prevents stream controller from loading new segments until `resumeBuffering` is called.
     * This allows for media buffering to be paused without interupting playlist loading.
     */
    pauseBuffering(): void;
    /**
     * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
     */
    swapAudioCodec(): void;
    /**
     * When the media-element fails, this allows to detach and then re-attach it
     * as one call (convenience method).
     *
     * Automatic recovery of media-errors by this process is configurable.
     */
    recoverMediaError(): void;
    removeLevel(levelIndex: number): void;
    /**
     * @returns an array of levels (variants) sorted by HDCP-LEVEL, RESOLUTION (height), FRAME-RATE, CODECS, VIDEO-RANGE, and BANDWIDTH
     */
    get levels(): Level[];
    /**
     * Index of quality level (variant) currently played
     */
    get currentLevel(): number;
    /**
     * Set quality level index immediately. This will flush the current buffer to replace the quality asap. That means playback will interrupt at least shortly to re-buffer and re-sync eventually. Set to -1 for automatic level selection.
     */
    set currentLevel(newLevel: number);
    /**
     * Index of next quality level loaded as scheduled by stream controller.
     */
    get nextLevel(): number;
    /**
     * Set quality level index for next loaded data.
     * This will switch the video quality asap, without interrupting playback.
     * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
     * @param newLevel - Pass -1 for automatic level selection
     */
    set nextLevel(newLevel: number);
    /**
     * Return the quality level of the currently or last (of none is loaded currently) segment
     */
    get loadLevel(): number;
    /**
     * Set quality level index for next loaded data in a conservative way.
     * This will switch the quality without flushing, but interrupt current loading.
     * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
     * @param newLevel - Pass -1 for automatic level selection
     */
    set loadLevel(newLevel: number);
    /**
     * get next quality level loaded
     */
    get nextLoadLevel(): number;
    /**
     * Set quality level of next loaded segment in a fully "non-destructive" way.
     * Same as `loadLevel` but will wait for next switch (until current loading is done).
     */
    set nextLoadLevel(level: number);
    /**
     * Return "first level": like a default level, if not set,
     * falls back to index of first level referenced in manifest
     */
    get firstLevel(): number;
    /**
     * Sets "first-level", see getter.
     */
    set firstLevel(newLevel: number);
    /**
     * Return the desired start level for the first fragment that will be loaded.
     * The default value of -1 indicates automatic start level selection.
     * Setting hls.nextAutoLevel without setting a startLevel will result in
     * the nextAutoLevel value being used for one fragment load.
     */
    get startLevel(): number;
    /**
     * set  start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     */
    set startLevel(newLevel: number);
    /**
     * Whether level capping is enabled.
     * Default value is set via `config.capLevelToPlayerSize`.
     */
    get capLevelToPlayerSize(): boolean;
    /**
     * Enables or disables level capping. If disabled after previously enabled, `nextLevelSwitch` will be immediately called.
     */
    set capLevelToPlayerSize(shouldStartCapping: boolean);
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     */
    get autoLevelCapping(): number;
    /**
     * Returns the current bandwidth estimate in bits per second, when available. Otherwise, `NaN` is returned.
     */
    get bandwidthEstimate(): number;
    set bandwidthEstimate(abrEwmaDefaultEstimate: number);
    /**
     * get time to first byte estimate
     * @type {number}
     */
    get ttfbEstimate(): number;
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     */
    set autoLevelCapping(newLevel: number);
    get maxHdcpLevel(): HdcpLevel;
    set maxHdcpLevel(value: HdcpLevel);
    /**
     * True when automatic level selection enabled
     */
    get autoLevelEnabled(): boolean;
    /**
     * Level set manually (if any)
     */
    get manualLevel(): number;
    /**
     * min level selectable in auto mode according to config.minAutoBitrate
     */
    get minAutoLevel(): number;
    /**
     * max level selectable in auto mode according to autoLevelCapping
     */
    get maxAutoLevel(): number;
    get firstAutoLevel(): number;
    /**
     * next automatically selected quality level
     */
    get nextAutoLevel(): number;
    /**
     * this setter is used to force next auto level.
     * this is useful to force a switch down in auto mode:
     * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
     * forced value is valid for one fragment. upon successful frag loading at forced level,
     * this value will be resetted to -1 by ABR controller.
     */
    set nextAutoLevel(nextLevel: number);
    /**
     * get the datetime value relative to media.currentTime for the active level Program Date Time if present
     */
    get playingDate(): Date | null;
    get mainForwardBufferInfo(): BufferInfo | null;
    /**
     * Find and select the best matching audio track, making a level switch when a Group change is necessary.
     * Updates `hls.config.audioPreference`. Returns the selected track, or null when no matching track is found.
     */
    setAudioOption(audioOption: MediaPlaylist | AudioSelectionOption | undefined): MediaPlaylist | null;
    /**
     * Find and select the best matching subtitle track, making a level switch when a Group change is necessary.
     * Updates `hls.config.subtitlePreference`. Returns the selected track, or null when no matching track is found.
     */
    setSubtitleOption(subtitleOption: MediaPlaylist | SubtitleSelectionOption | undefined): MediaPlaylist | null;
    /**
     * Get the complete list of audio tracks across all media groups
     */
    get allAudioTracks(): Array<MediaPlaylist>;
    /**
     * Get the list of selectable audio tracks
     */
    get audioTracks(): Array<MediaPlaylist>;
    /**
     * index of the selected audio track (index in audio track lists)
     */
    get audioTrack(): number;
    /**
     * selects an audio track, based on its index in audio track lists
     */
    set audioTrack(audioTrackId: number);
    /**
     * get the complete list of subtitle tracks across all media groups
     */
    get allSubtitleTracks(): Array<MediaPlaylist>;
    /**
     * get alternate subtitle tracks list from playlist
     */
    get subtitleTracks(): Array<MediaPlaylist>;
    /**
     * index of the selected subtitle track (index in subtitle track lists)
     */
    get subtitleTrack(): number;
    get media(): HTMLMediaElement | null;
    /**
     * select an subtitle track, based on its index in subtitle track lists
     */
    set subtitleTrack(subtitleTrackId: number);
    /**
     * Whether subtitle display is enabled or not
     */
    get subtitleDisplay(): boolean;
    /**
     * Enable/disable subtitle display rendering
     */
    set subtitleDisplay(value: boolean);
    /**
     * get mode for Low-Latency HLS loading
     */
    get lowLatencyMode(): boolean;
    /**
     * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
     */
    set lowLatencyMode(mode: boolean);
    /**
     * Position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
     * @returns null prior to loading live Playlist
     */
    get liveSyncPosition(): number | null;
    /**
     * Estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
     * @returns 0 before first playlist is loaded
     */
    get latency(): number;
    /**
     * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
     * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
     * @returns 0 before first playlist is loaded
     */
    get maxLatency(): number;
    /**
     * target distance from the edge as calculated by the latency controller
     */
    get targetLatency(): number | null;
    /**
     * the rate at which the edge of the current live playlist is advancing or 1 if there is none
     */
    get drift(): number | null;
    /**
     * set to true when startLoad is called before MANIFEST_PARSED event
     */
    get forceStartLoad(): boolean;
}
export default Hls;

export declare interface HlsChunkPerformanceTiming extends HlsPerformanceTiming {
    executeStart: number;
    executeEnd: number;
}

export declare type HlsConfig = {
    debug: boolean | ILogger;
    enableWorker: boolean;
    workerPath: null | string;
    enableSoftwareAES: boolean;
    minAutoBitrate: number;
    ignoreDevicePixelRatio: boolean;
    preferManagedMediaSource: boolean;
    loader: {
        new (confg: HlsConfig): Loader<LoaderContext>;
    };
    fLoader?: FragmentLoaderConstructor;
    pLoader?: PlaylistLoaderConstructor;
    fetchSetup?: (context: LoaderContext, initParams: any) => Request;
    xhrSetup?: (xhr: XMLHttpRequest, url: string) => Promise<void> | void;
    audioStreamController?: typeof AudioStreamController;
    audioTrackController?: typeof AudioTrackController;
    subtitleStreamController?: typeof SubtitleStreamController;
    subtitleTrackController?: typeof SubtitleTrackController;
    timelineController?: typeof TimelineController;
    emeController?: typeof EMEController;
    cmcd?: CMCDControllerConfig;
    cmcdController?: typeof CMCDController;
    contentSteeringController?: typeof ContentSteeringController;
    useMediaCapabilities: boolean;
    abrController: typeof AbrController;
    bufferController: typeof BufferController;
    capLevelController: typeof CapLevelController;
    errorController: typeof ErrorController;
    fpsController: typeof FPSController;
    progressive: boolean;
    lowLatencyMode: boolean;
} & ABRControllerConfig & BufferControllerConfig & CapLevelControllerConfig & EMEControllerConfig & FPSControllerConfig & LevelControllerConfig & MP4RemuxerConfig & StreamControllerConfig & SelectionPreferences & LatencyControllerConfig & MetadataControllerConfig & TimelineControllerConfig & TSDemuxerConfig & HlsLoadPolicies & FragmentLoaderConfig & PlaylistLoaderConfig;

export declare interface HlsEventEmitter {
    on<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    once<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    removeAllListeners<E extends keyof HlsListeners>(event?: E): void;
    off<E extends keyof HlsListeners, Context = undefined>(event: E, listener?: HlsListeners[E], context?: Context, once?: boolean): void;
    listeners<E extends keyof HlsListeners>(event: E): HlsListeners[E][];
    emit<E extends keyof HlsListeners>(event: E, name: E, eventObject: Parameters<HlsListeners[E]>[1]): boolean;
    listenerCount<E extends keyof HlsListeners>(event: E): number;
}

/**
 * Defines each Event type and payload by Event name. Used in {@link hls.js#HlsEventEmitter} to strongly type the event listener API.
 */
export declare interface HlsListeners {
    [Events.MEDIA_ATTACHING]: (event: Events.MEDIA_ATTACHING, data: MediaAttachingData) => void;
    [Events.MEDIA_ATTACHED]: (event: Events.MEDIA_ATTACHED, data: MediaAttachedData) => void;
    [Events.MEDIA_DETACHING]: (event: Events.MEDIA_DETACHING) => void;
    [Events.MEDIA_DETACHED]: (event: Events.MEDIA_DETACHED) => void;
    [Events.BUFFER_RESET]: (event: Events.BUFFER_RESET) => void;
    [Events.BUFFER_CODECS]: (event: Events.BUFFER_CODECS, data: BufferCodecsData) => void;
    [Events.BUFFER_CREATED]: (event: Events.BUFFER_CREATED, data: BufferCreatedData) => void;
    [Events.BUFFER_APPENDING]: (event: Events.BUFFER_APPENDING, data: BufferAppendingData) => void;
    [Events.BUFFER_APPENDED]: (event: Events.BUFFER_APPENDED, data: BufferAppendedData) => void;
    [Events.BUFFER_EOS]: (event: Events.BUFFER_EOS, data: BufferEOSData) => void;
    [Events.BUFFER_FLUSHING]: (event: Events.BUFFER_FLUSHING, data: BufferFlushingData) => void;
    [Events.BUFFER_FLUSHED]: (event: Events.BUFFER_FLUSHED, data: BufferFlushedData) => void;
    [Events.MANIFEST_LOADING]: (event: Events.MANIFEST_LOADING, data: ManifestLoadingData) => void;
    [Events.MANIFEST_LOADED]: (event: Events.MANIFEST_LOADED, data: ManifestLoadedData) => void;
    [Events.MANIFEST_PARSED]: (event: Events.MANIFEST_PARSED, data: ManifestParsedData) => void;
    [Events.LEVEL_SWITCHING]: (event: Events.LEVEL_SWITCHING, data: LevelSwitchingData) => void;
    [Events.LEVEL_SWITCHED]: (event: Events.LEVEL_SWITCHED, data: LevelSwitchedData) => void;
    [Events.LEVEL_LOADING]: (event: Events.LEVEL_LOADING, data: LevelLoadingData) => void;
    [Events.LEVEL_LOADED]: (event: Events.LEVEL_LOADED, data: LevelLoadedData) => void;
    [Events.LEVEL_UPDATED]: (event: Events.LEVEL_UPDATED, data: LevelUpdatedData) => void;
    [Events.LEVEL_PTS_UPDATED]: (event: Events.LEVEL_PTS_UPDATED, data: LevelPTSUpdatedData) => void;
    [Events.LEVELS_UPDATED]: (event: Events.LEVELS_UPDATED, data: LevelsUpdatedData) => void;
    [Events.AUDIO_TRACKS_UPDATED]: (event: Events.AUDIO_TRACKS_UPDATED, data: AudioTracksUpdatedData) => void;
    [Events.AUDIO_TRACK_SWITCHING]: (event: Events.AUDIO_TRACK_SWITCHING, data: AudioTrackSwitchingData) => void;
    [Events.AUDIO_TRACK_SWITCHED]: (event: Events.AUDIO_TRACK_SWITCHED, data: AudioTrackSwitchedData) => void;
    [Events.AUDIO_TRACK_LOADING]: (event: Events.AUDIO_TRACK_LOADING, data: TrackLoadingData) => void;
    [Events.AUDIO_TRACK_LOADED]: (event: Events.AUDIO_TRACK_LOADED, data: AudioTrackLoadedData) => void;
    [Events.SUBTITLE_TRACKS_UPDATED]: (event: Events.SUBTITLE_TRACKS_UPDATED, data: SubtitleTracksUpdatedData) => void;
    [Events.SUBTITLE_TRACKS_CLEARED]: (event: Events.SUBTITLE_TRACKS_CLEARED) => void;
    [Events.SUBTITLE_TRACK_SWITCH]: (event: Events.SUBTITLE_TRACK_SWITCH, data: SubtitleTrackSwitchData) => void;
    [Events.SUBTITLE_TRACK_LOADING]: (event: Events.SUBTITLE_TRACK_LOADING, data: TrackLoadingData) => void;
    [Events.SUBTITLE_TRACK_LOADED]: (event: Events.SUBTITLE_TRACK_LOADED, data: SubtitleTrackLoadedData) => void;
    [Events.SUBTITLE_FRAG_PROCESSED]: (event: Events.SUBTITLE_FRAG_PROCESSED, data: SubtitleFragProcessedData) => void;
    [Events.CUES_PARSED]: (event: Events.CUES_PARSED, data: CuesParsedData) => void;
    [Events.NON_NATIVE_TEXT_TRACKS_FOUND]: (event: Events.NON_NATIVE_TEXT_TRACKS_FOUND, data: NonNativeTextTracksData) => void;
    [Events.INIT_PTS_FOUND]: (event: Events.INIT_PTS_FOUND, data: InitPTSFoundData) => void;
    [Events.FRAG_LOADING]: (event: Events.FRAG_LOADING, data: FragLoadingData) => void;
    [Events.FRAG_LOAD_EMERGENCY_ABORTED]: (event: Events.FRAG_LOAD_EMERGENCY_ABORTED, data: FragLoadEmergencyAbortedData) => void;
    [Events.FRAG_LOADED]: (event: Events.FRAG_LOADED, data: FragLoadedData) => void;
    [Events.FRAG_DECRYPTED]: (event: Events.FRAG_DECRYPTED, data: FragDecryptedData) => void;
    [Events.FRAG_PARSING_INIT_SEGMENT]: (event: Events.FRAG_PARSING_INIT_SEGMENT, data: FragParsingInitSegmentData) => void;
    [Events.FRAG_PARSING_USERDATA]: (event: Events.FRAG_PARSING_USERDATA, data: FragParsingUserdataData) => void;
    [Events.FRAG_PARSING_METADATA]: (event: Events.FRAG_PARSING_METADATA, data: FragParsingMetadataData) => void;
    [Events.FRAG_PARSED]: (event: Events.FRAG_PARSED, data: FragParsedData) => void;
    [Events.FRAG_BUFFERED]: (event: Events.FRAG_BUFFERED, data: FragBufferedData) => void;
    [Events.FRAG_CHANGED]: (event: Events.FRAG_CHANGED, data: FragChangedData) => void;
    [Events.FPS_DROP]: (event: Events.FPS_DROP, data: FPSDropData) => void;
    [Events.FPS_DROP_LEVEL_CAPPING]: (event: Events.FPS_DROP_LEVEL_CAPPING, data: FPSDropLevelCappingData) => void;
    [Events.MAX_AUTO_LEVEL_UPDATED]: (event: Events.MAX_AUTO_LEVEL_UPDATED, data: MaxAutoLevelUpdatedData) => void;
    [Events.ERROR]: (event: Events.ERROR, data: ErrorData) => void;
    [Events.DESTROYING]: (event: Events.DESTROYING) => void;
    [Events.KEY_LOADING]: (event: Events.KEY_LOADING, data: KeyLoadingData) => void;
    [Events.KEY_LOADED]: (event: Events.KEY_LOADED, data: KeyLoadedData) => void;
    [Events.LIVE_BACK_BUFFER_REACHED]: (event: Events.LIVE_BACK_BUFFER_REACHED, data: LiveBackBufferData) => void;
    [Events.BACK_BUFFER_REACHED]: (event: Events.BACK_BUFFER_REACHED, data: BackBufferData) => void;
    [Events.STEERING_MANIFEST_LOADED]: (event: Events.STEERING_MANIFEST_LOADED, data: SteeringManifestLoadedData) => void;
}

export declare type HlsLoadPolicies = {
    fragLoadPolicy: LoadPolicy;
    keyLoadPolicy: LoadPolicy;
    certLoadPolicy: LoadPolicy;
    playlistLoadPolicy: LoadPolicy;
    manifestLoadPolicy: LoadPolicy;
    steeringManifestLoadPolicy: LoadPolicy;
};

export declare interface HlsPerformanceTiming {
    start: number;
    end: number;
}

export declare interface HlsProgressivePerformanceTiming extends HlsPerformanceTiming {
    first: number;
}

export declare const enum HlsSkip {
    No = "",
    Yes = "YES",
    v2 = "v2"
}

export declare class HlsUrlParameters {
    msn?: number;
    part?: number;
    skip?: HlsSkip;
    constructor(msn?: number, part?: number, skip?: HlsSkip);
    addDirectives(uri: string): string | never;
}

export declare type IErrorAction = {
    action: NetworkErrorAction;
    flags: ErrorActionFlags;
    retryCount?: number;
    retryConfig?: RetryConfig;
    hdcpLevel?: HdcpLevel;
    nextAutoLevel?: number;
    resolved?: boolean;
};

declare interface ILogFunction {
    (message?: any, ...optionalParams: any[]): void;
}

export declare interface ILogger {
    trace: ILogFunction;
    debug: ILogFunction;
    log: ILogFunction;
    warn: ILogFunction;
    info: ILogFunction;
    error: ILogFunction;
}

export declare interface InitPTSFoundData {
    id: string;
    frag: Fragment;
    initPTS: number;
    timescale: number;
}

declare interface InitSegmentData {
    tracks?: TrackSet;
    initPTS: number | undefined;
    timescale: number | undefined;
}

export declare interface KeyLoadedData {
    frag: Fragment;
    keyInfo: KeyLoaderInfo;
}

declare class KeyLoader implements ComponentAPI {
    private readonly config;
    keyUriToKeyInfo: {
        [keyuri: string]: KeyLoaderInfo;
    };
    emeController: EMEController | null;
    constructor(config: HlsConfig);
    abort(type?: PlaylistLevelType): void;
    detach(): void;
    destroy(): void;
    createKeyLoadError(frag: Fragment, details: ErrorDetails | undefined, error: Error, networkDetails?: any, response?: {
        url: string;
        data: undefined;
        code: number;
        text: string;
    }): LoadError;
    loadClear(loadingFrag: Fragment, encryptedFragments: Fragment[]): void | Promise<void>;
    load(frag: Fragment): Promise<KeyLoadedData>;
    loadInternal(frag: Fragment, keySystemFormat?: KeySystemFormats): Promise<KeyLoadedData>;
    loadKeyEME(keyInfo: KeyLoaderInfo, frag: Fragment): Promise<KeyLoadedData>;
    loadKeyHTTP(keyInfo: KeyLoaderInfo, frag: Fragment): Promise<KeyLoadedData>;
    private resetLoader;
}

declare interface KeyLoaderContext extends LoaderContext {
    keyInfo: KeyLoaderInfo;
    frag: Fragment;
}

declare interface KeyLoaderInfo {
    decryptdata: LevelKey;
    keyLoadPromise: Promise<KeyLoadedData> | null;
    loader: Loader<KeyLoaderContext> | null;
    mediaKeySessionContext: MediaKeySessionContext | null;
}

export declare interface KeyLoadingData {
    frag: Fragment;
}

export declare const enum KeySystemFormats {
    CLEARKEY = "org.w3.clearkey",
    FAIRPLAY = "com.apple.streamingkeydelivery",
    PLAYREADY = "com.microsoft.playready",
    WIDEVINE = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
export declare const enum KeySystems {
    CLEARKEY = "org.w3.clearkey",
    FAIRPLAY = "com.apple.fps",
    PLAYREADY = "com.microsoft.playready",
    WIDEVINE = "com.widevine.alpha"
}

export declare type LatencyControllerConfig = {
    liveSyncDurationCount: number;
    liveMaxLatencyDurationCount: number;
    liveSyncDuration?: number;
    liveMaxLatencyDuration?: number;
    maxLiveSyncPlaybackRate: number;
};

export declare class Level {
    readonly _attrs: LevelAttributes[];
    readonly audioCodec: string | undefined;
    readonly bitrate: number;
    readonly codecSet: string;
    readonly url: string[];
    readonly frameRate: number;
    readonly height: number;
    readonly id: number;
    readonly name: string;
    readonly videoCodec: string | undefined;
    readonly width: number;
    details?: LevelDetails;
    fragmentError: number;
    loadError: number;
    loaded?: {
        bytes: number;
        duration: number;
    };
    realBitrate: number;
    supportedPromise?: Promise<MediaDecodingInfo>;
    supportedResult?: MediaDecodingInfo;
    private _avgBitrate;
    private _audioGroups?;
    private _subtitleGroups?;
    private readonly _urlId;
    constructor(data: LevelParsed | MediaPlaylist);
    get maxBitrate(): number;
    get averageBitrate(): number;
    get attrs(): LevelAttributes;
    get codecs(): string;
    get pathwayId(): string;
    get videoRange(): VideoRange;
    get score(): number;
    get uri(): string;
    hasAudioGroup(groupId: string | undefined): boolean;
    hasSubtitleGroup(groupId: string | undefined): boolean;
    get audioGroups(): (string | undefined)[] | undefined;
    get subtitleGroups(): (string | undefined)[] | undefined;
    addGroupId(type: string, groupId: string | undefined): void;
    get urlId(): number;
    set urlId(value: number);
    get audioGroupIds(): (string | undefined)[] | undefined;
    get textGroupIds(): (string | undefined)[] | undefined;
    get audioGroupId(): string | undefined;
    get textGroupId(): string | undefined;
    addFallback(): void;
}

export declare interface LevelAttributes extends AttrList {
    'ALLOWED-CPC'?: string;
    AUDIO?: string;
    'AVERAGE-BANDWIDTH'?: string;
    BANDWIDTH?: string;
    'CLOSED-CAPTIONS'?: string;
    CODECS?: string;
    'FRAME-RATE'?: string;
    'HDCP-LEVEL'?: 'TYPE-0' | 'TYPE-1' | 'NONE';
    'PATHWAY-ID'?: string;
    RESOLUTION?: string;
    SCORE?: string;
    'STABLE-VARIANT-ID'?: string;
    SUBTITLES?: string;
    'SUPPLEMENTAL-CODECS'?: string;
    VIDEO?: string;
    'VIDEO-RANGE'?: VideoRange;
}

export declare type LevelControllerConfig = {
    startLevel?: number;
};

/**
 * Object representing parsed data from an HLS Media Playlist. Found in {@link hls.js#Level.details}.
 */
export declare class LevelDetails {
    PTSKnown: boolean;
    alignedSliding: boolean;
    averagetargetduration?: number;
    endCC: number;
    endSN: number;
    fragments: Fragment[];
    fragmentHint?: Fragment;
    partList: Part[] | null;
    dateRanges: Record<string, DateRange>;
    live: boolean;
    ageHeader: number;
    advancedDateTime?: number;
    updated: boolean;
    advanced: boolean;
    availabilityDelay?: number;
    misses: number;
    startCC: number;
    startSN: number;
    startTimeOffset: number | null;
    targetduration: number;
    totalduration: number;
    type: string | null;
    url: string;
    m3u8: string;
    version: number | null;
    canBlockReload: boolean;
    canSkipUntil: number;
    canSkipDateRanges: boolean;
    skippedSegments: number;
    recentlyRemovedDateranges?: string[];
    partHoldBack: number;
    holdBack: number;
    partTarget: number;
    preloadHint?: AttrList;
    renditionReports?: AttrList[];
    tuneInGoal: number;
    deltaUpdateFailed?: boolean;
    driftStartTime: number;
    driftEndTime: number;
    driftStart: number;
    driftEnd: number;
    encryptedFragments: Fragment[];
    playlistParsingError: Error | null;
    variableList: VariableMap | null;
    hasVariableRefs: boolean;
    constructor(baseUrl: string);
    reloaded(previous: LevelDetails | undefined): void;
    get hasProgramDateTime(): boolean;
    get levelTargetDuration(): number;
    get drift(): number;
    get edge(): number;
    get partEnd(): number;
    get fragmentEnd(): number;
    get age(): number;
    get lastPartIndex(): number;
    get lastPartSn(): number;
}

export declare class LevelKey implements DecryptData {
    readonly uri: string;
    readonly method: string;
    readonly keyFormat: string;
    readonly keyFormatVersions: number[];
    readonly encrypted: boolean;
    readonly isCommonEncryption: boolean;
    iv: Uint8Array | null;
    key: Uint8Array | null;
    keyId: Uint8Array | null;
    pssh: Uint8Array | null;
    static clearKeyUriToKeyIdMap(): void;
    constructor(method: string, uri: string, format: string, formatversions?: number[], iv?: Uint8Array | null);
    isSupported(): boolean;
    getDecryptData(sn: number | 'initSegment'): LevelKey | null;
}

export declare interface LevelLoadedData {
    details: LevelDetails;
    id: number;
    level: number;
    networkDetails: any;
    stats: LoaderStats;
    deliveryDirectives: HlsUrlParameters | null;
}

export declare interface LevelLoadingData {
    id: number;
    level: number;
    pathwayId: string | undefined;
    url: string;
    deliveryDirectives: HlsUrlParameters | null;
}

export declare interface LevelParsed {
    attrs: LevelAttributes;
    audioCodec?: string;
    bitrate: number;
    details?: LevelDetails;
    height?: number;
    id?: number;
    name: string;
    textCodec?: string;
    unknownCodecs?: string[];
    url: string;
    videoCodec?: string;
    width?: number;
}

export declare interface LevelPTSUpdatedData {
    details: LevelDetails;
    level: Level;
    drift: number;
    type: string;
    frag: Fragment;
    start: number;
    end: number;
}

export declare interface LevelsUpdatedData {
    levels: Array<Level>;
}

export declare interface LevelSwitchedData {
    level: number;
}

export declare interface LevelSwitchingData {
    level: number;
    attrs: LevelAttributes;
    details: LevelDetails | undefined;
    bitrate: number;
    averageBitrate: number;
    maxBitrate: number;
    realBitrate: number;
    width: number;
    height: number;
    codecSet: string;
    audioCodec: string | undefined;
    videoCodec: string | undefined;
    audioGroups: (string | undefined)[] | undefined;
    subtitleGroups: (string | undefined)[] | undefined;
    loaded: {
        bytes: number;
        duration: number;
    } | undefined;
    loadError: number;
    fragmentError: number;
    name: string | undefined;
    id: number;
    uri: string;
    url: string[];
    urlId: 0;
    audioGroupIds: (string | undefined)[] | undefined;
    textGroupIds: (string | undefined)[] | undefined;
}

export declare interface LevelUpdatedData {
    details: LevelDetails;
    level: number;
}

/**
 * @deprecated Use BackBufferData
 */
export declare interface LiveBackBufferData extends BackBufferData {
}

export declare interface Loader<T extends LoaderContext> {
    destroy(): void;
    abort(): void;
    load(context: T, config: LoaderConfiguration, callbacks: LoaderCallbacks<T>): void;
    /**
     * `getCacheAge()` is called by hls.js to get the duration that a given object
     * has been sitting in a cache proxy when playing live.  If implemented,
     * this should return a value in seconds.
     *
     * For HTTP based loaders, this should return the contents of the "age" header.
     *
     * @returns time object being lodaded
     */
    getCacheAge?: () => number | null;
    getResponseHeader?: (name: string) => string | null;
    context: T | null;
    stats: LoaderStats;
}

export declare interface LoaderCallbacks<T extends LoaderContext> {
    onSuccess: LoaderOnSuccess<T>;
    onError: LoaderOnError<T>;
    onTimeout: LoaderOnTimeout<T>;
    onAbort?: LoaderOnAbort<T>;
    onProgress?: LoaderOnProgress<T>;
}

export declare type LoaderConfig = {
    maxTimeToFirstByteMs: number;
    maxLoadTimeMs: number;
    timeoutRetry: RetryConfig | null;
    errorRetry: RetryConfig | null;
};

export declare interface LoaderConfiguration {
    loadPolicy: LoaderConfig;
    /**
     * @deprecated use LoaderConfig timeoutRetry and errorRetry maxNumRetry
     */
    maxRetry: number;
    /**
     * @deprecated use LoaderConfig maxTimeToFirstByteMs and maxLoadTimeMs
     */
    timeout: number;
    /**
     * @deprecated use LoaderConfig timeoutRetry and errorRetry retryDelayMs
     */
    retryDelay: number;
    /**
     * @deprecated use LoaderConfig timeoutRetry and errorRetry maxRetryDelayMs
     */
    maxRetryDelay: number;
    highWaterMark?: number;
}

export declare interface LoaderContext {
    url: string;
    responseType: string;
    headers?: Record<string, string>;
    rangeStart?: number;
    rangeEnd?: number;
    progressData?: boolean;
}

export declare type LoaderOnAbort<T extends LoaderContext> = (stats: LoaderStats, context: T, networkDetails: any) => void;

export declare type LoaderOnError<T extends LoaderContext> = (error: {
    code: number;
    text: string;
}, context: T, networkDetails: any, stats: LoaderStats) => void;

export declare type LoaderOnProgress<T extends LoaderContext> = (stats: LoaderStats, context: T, data: string | ArrayBuffer, networkDetails: any) => void;

export declare type LoaderOnSuccess<T extends LoaderContext> = (response: LoaderResponse, stats: LoaderStats, context: T, networkDetails: any) => void;

export declare type LoaderOnTimeout<T extends LoaderContext> = (stats: LoaderStats, context: T, networkDetails: any) => void;

export declare interface LoaderResponse {
    url: string;
    data?: string | ArrayBuffer | Object;
    code?: number;
    text?: string;
}

declare class LoadError extends Error {
    readonly data: FragLoadFailResult;
    constructor(data: FragLoadFailResult);
}

export declare interface LoaderStats {
    aborted: boolean;
    loaded: number;
    retry: number;
    total: number;
    chunkCount: number;
    bwEstimate: number;
    loading: HlsProgressivePerformanceTiming;
    parsing: HlsPerformanceTiming;
    buffering: HlsProgressivePerformanceTiming;
}

export declare type LoadPolicy = {
    default: LoaderConfig;
};

export declare class LoadStats implements LoaderStats {
    aborted: boolean;
    loaded: number;
    retry: number;
    total: number;
    chunkCount: number;
    bwEstimate: number;
    loading: HlsProgressivePerformanceTiming;
    parsing: HlsPerformanceTiming;
    buffering: HlsProgressivePerformanceTiming;
}

export declare type MainPlaylistType = AudioPlaylistType | 'VIDEO';

export declare interface ManifestLoadedData {
    audioTracks: MediaPlaylist[];
    captions?: MediaPlaylist[];
    contentSteering: ContentSteeringOptions | null;
    levels: LevelParsed[];
    networkDetails: any;
    sessionData: Record<string, AttrList> | null;
    sessionKeys: LevelKey[] | null;
    startTimeOffset: number | null;
    stats: LoaderStats;
    subtitles?: MediaPlaylist[];
    url: string;
    variableList: VariableMap | null;
}

export declare interface ManifestLoadingData {
    url: string;
}

export declare interface ManifestParsedData {
    levels: Level[];
    audioTracks: MediaPlaylist[];
    subtitleTracks: MediaPlaylist[];
    sessionData: Record<string, AttrList> | null;
    sessionKeys: LevelKey[] | null;
    firstLevel: number;
    stats: LoaderStats;
    audio: boolean;
    video: boolean;
    altAudio: boolean;
}

declare interface MaxAutoLevelUpdatedData {
    autoLevelCapping: number;
    levels: Level[] | null;
    maxAutoLevel: number;
    minAutoLevel: number;
    maxHdcpLevel: HdcpLevel;
}

export declare interface MediaAttachedData {
    media: HTMLMediaElement;
    mediaSource?: MediaSource;
}

export declare interface MediaAttachingData {
    media: HTMLMediaElement;
}

export declare interface MediaAttributes extends AttrList {
    'ASSOC-LANGUAGE'?: string;
    AUTOSELECT?: 'YES' | 'NO';
    CHANNELS?: string;
    CHARACTERISTICS?: string;
    DEFAULT?: 'YES' | 'NO';
    FORCED?: 'YES' | 'NO';
    'GROUP-ID': string;
    'INSTREAM-ID'?: string;
    LANGUAGE?: string;
    NAME: string;
    'PATHWAY-ID'?: string;
    'STABLE-RENDITION-ID'?: string;
    TYPE?: 'AUDIO' | 'VIDEO' | 'SUBTITLES' | 'CLOSED-CAPTIONS';
    URI?: string;
}

export declare type MediaDecodingInfo = {
    supported: boolean;
    configurations: readonly MediaDecodingConfiguration[];
    decodingInfoResults: readonly MediaCapabilitiesDecodingInfo[];
    error?: Error;
};

export declare type MediaKeyFunc = (keySystem: KeySystems, supportedConfigurations: MediaKeySystemConfiguration[]) => Promise<MediaKeySystemAccess>;

export declare interface MediaKeySessionContext {
    keySystem: KeySystems;
    mediaKeys: MediaKeys;
    decryptdata: LevelKey;
    mediaKeysSession: MediaKeySession;
    keyStatus: MediaKeyStatus;
    licenseXhr?: XMLHttpRequest;
    _onmessage?: (this: MediaKeySession, ev: MediaKeyMessageEvent) => any;
    _onkeystatuseschange?: (this: MediaKeySession, ev: Event) => any;
}

export declare interface MediaPlaylist {
    attrs: MediaAttributes;
    audioCodec?: string;
    autoselect: boolean;
    bitrate: number;
    channels?: string;
    characteristics?: string;
    details?: LevelDetails;
    height?: number;
    default: boolean;
    forced: boolean;
    groupId: string;
    id: number;
    instreamId?: string;
    lang?: string;
    assocLang?: string;
    name: string;
    textCodec?: string;
    unknownCodecs?: string[];
    type: MediaPlaylistType | 'main';
    url: string;
    videoCodec?: string;
    width?: number;
}

export declare type MediaPlaylistType = MainPlaylistType | SubtitlePlaylistType;

export declare type MetadataControllerConfig = {
    enableDateRangeMetadataCues: boolean;
    enableEmsgMetadataCues: boolean;
    enableID3MetadataCues: boolean;
};

export declare interface MetadataSample {
    pts: number;
    dts: number;
    duration: number;
    len?: number;
    data: Uint8Array;
    type: MetadataSchema;
}

export declare const enum MetadataSchema {
    audioId3 = "org.id3",
    dateRange = "com.apple.quicktime.HLS",
    emsg = "https://aomedia.org/emsg/ID3"
}

export declare type MP4RemuxerConfig = {
    stretchShortVideoTrack: boolean;
    maxAudioFramesDrift: number;
};

export declare interface NetworkComponentAPI extends ComponentAPI {
    startLoad(startPosition: number): void;
    stopLoad(): void;
    pauseBuffering?(): void;
    resumeBuffering?(): void;
}

export declare const enum NetworkErrorAction {
    DoNothing = 0,
    SendEndCallback = 1,// Reserved for future use
    SendAlternateToPenaltyBox = 2,
    RemoveAlternatePermanently = 3,// Reserved for future use
    InsertDiscontinuity = 4,// Reserved for future use
    RetryRequest = 5
}

export declare interface NonNativeTextTrack {
    _id?: string;
    label: any;
    kind: string;
    default: boolean;
    closedCaptions?: MediaPlaylist;
    subtitleTrack?: MediaPlaylist;
}

export declare interface NonNativeTextTracksData {
    tracks: Array<NonNativeTextTrack>;
}

declare interface PACData {
    row: number;
    indent: number | null;
    color: string | null;
    underline: boolean;
    italics: boolean;
}

/**
 * Object representing parsed data from an HLS Partial Segment. Found in {@link hls.js#LevelDetails.partList}.
 */
export declare class Part extends BaseSegment {
    readonly fragOffset: number;
    readonly duration: number;
    readonly gap: boolean;
    readonly independent: boolean;
    readonly relurl: string;
    readonly fragment: Fragment;
    readonly index: number;
    stats: LoadStats;
    constructor(partAttrs: AttrList, frag: Fragment, baseurl: string, index: number, previous?: Part);
    get start(): number;
    get end(): number;
    get loaded(): boolean;
}

declare interface PartsLoadedData {
    frag: Fragment;
    part: Part | null;
    partsLoaded?: FragLoadedData[];
}

export declare type PathwayClone = {
    'BASE-ID': string;
    ID: string;
    'URI-REPLACEMENT': UriReplacement;
};

declare class PenState {
    foreground: string;
    underline: boolean;
    italics: boolean;
    background: string;
    flash: boolean;
    reset(): void;
    setStyles(styles: Partial<PenStyles>): void;
    isDefault(): boolean;
    equals(other: PenState): boolean;
    copy(newPenState: PenState): void;
    toString(): string;
}

declare type PenStyles = {
    foreground: string | null;
    underline: boolean;
    italics: boolean;
    background: string;
    flash: boolean;
};

export declare const enum PlaylistContextType {
    MANIFEST = "manifest",
    LEVEL = "level",
    AUDIO_TRACK = "audioTrack",
    SUBTITLE_TRACK = "subtitleTrack"
}

export declare const enum PlaylistLevelType {
    MAIN = "main",
    AUDIO = "audio",
    SUBTITLE = "subtitle"
}

/**
 * @deprecated use manifestLoadPolicy.default and playlistLoadPolicy.default
 */
export declare type PlaylistLoaderConfig = {
    manifestLoadingTimeOut: number;
    manifestLoadingMaxRetry: number;
    manifestLoadingRetryDelay: number;
    manifestLoadingMaxRetryTimeout: number;
    levelLoadingTimeOut: number;
    levelLoadingMaxRetry: number;
    levelLoadingRetryDelay: number;
    levelLoadingMaxRetryTimeout: number;
};

export declare interface PlaylistLoaderConstructor {
    new (confg: HlsConfig): Loader<PlaylistLoaderContext>;
}

export declare interface PlaylistLoaderContext extends LoaderContext {
    type: PlaylistContextType;
    level: number | null;
    id: number | null;
    groupId?: string;
    pathwayId?: string;
    levelDetails?: LevelDetails;
    deliveryDirectives: HlsUrlParameters | null;
}

declare type RationalTimestamp = {
    baseTime: number;
    timescale: number;
};

declare interface RemuxedMetadata {
    samples: MetadataSample[];
}

declare interface RemuxedTrack {
    data1: Uint8Array;
    data2?: Uint8Array;
    startPTS: number;
    endPTS: number;
    startDTS: number;
    endDTS: number;
    type: SourceBufferName;
    hasAudio: boolean;
    hasVideo: boolean;
    independent?: boolean;
    firstKeyFrame?: number;
    firstKeyFramePTS?: number;
    nb: number;
    transferredData1?: ArrayBuffer;
    transferredData2?: ArrayBuffer;
    dropped?: number;
}

declare interface RemuxedUserdata {
    samples: UserdataSample[];
}

declare interface RemuxerResult {
    audio?: RemuxedTrack;
    video?: RemuxedTrack;
    text?: RemuxedUserdata;
    id3?: RemuxedMetadata;
    initSegment?: InitSegmentData;
    independent?: boolean;
}

export declare type RetryConfig = {
    maxNumRetry: number;
    retryDelayMs: number;
    maxRetryDelayMs: number;
    backoff?: 'exponential' | 'linear';
    shouldRetry?: (retryConfig: RetryConfig | null | undefined, retryCount: number, isTimeout: boolean, loaderResponse: LoaderResponse | undefined, retry: boolean) => boolean;
};

/**
 * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
 * @constructor
 */
declare class Row {
    chars: StyledUnicodeChar[];
    pos: number;
    currPenState: PenState;
    cueStartTime: number | null;
    private logger;
    constructor(logger: CaptionsLogger);
    equals(other: Row): boolean;
    copy(other: Row): void;
    isEmpty(): boolean;
    /**
     *  Set the cursor to a valid column.
     */
    setCursor(absPos: number): void;
    /**
     * Move the cursor relative to current position.
     */
    moveCursor(relPos: number): void;
    /**
     * Backspace, move one step back and clear character.
     */
    backSpace(): void;
    insertChar(byte: number): void;
    clearFromPos(startPos: number): void;
    clear(): void;
    clearToEndOfRow(): void;
    getTextString(): string;
    setPenStyles(styles: Partial<PenStyles>): void;
}

export declare type SelectionPreferences = {
    videoPreference?: VideoSelectionOption;
    audioPreference?: AudioSelectionOption;
    subtitlePreference?: SubtitleSelectionOption;
};

export declare type SourceBufferName = 'video' | 'audio' | 'audiovideo';

declare type SourceBuffers = Partial<Record<SourceBufferName, ExtendedSourceBuffer>>;

export declare type SteeringManifest = {
    VERSION: 1;
    TTL: number;
    'RELOAD-URI'?: string;
    'PATHWAY-PRIORITY': string[];
    'PATHWAY-CLONES'?: PathwayClone[];
};

export declare interface SteeringManifestLoadedData {
    steeringManifest: SteeringManifest;
    url: string;
}

declare class StreamController extends BaseStreamController implements NetworkComponentAPI {
    private audioCodecSwap;
    private gapController;
    private level;
    private _forceStartLoad;
    private altAudio;
    private audioOnly;
    private fragPlaying;
    private onvplaying;
    private onvseeked;
    private fragLastKbps;
    private couldBacktrack;
    private backtrackFragment;
    private audioCodecSwitch;
    private videoBuffer;
    constructor(hls: Hls, fragmentTracker: FragmentTracker, keyLoader: KeyLoader);
    private _registerListeners;
    protected _unregisterListeners(): void;
    protected onHandlerDestroying(): void;
    startLoad(startPosition: number): void;
    stopLoad(): void;
    protected doTick(): void;
    protected onTickEnd(): void;
    private doTickIdle;
    protected loadFragment(frag: Fragment, level: Level, targetBufferTime: number): void;
    private getBufferedFrag;
    private followingBufferedFrag;
    immediateLevelSwitch(): void;
    /**
     * try to switch ASAP without breaking video playback:
     * in order to ensure smooth but quick level switching,
     * we need to find the next flushable buffer range
     * we should take into account new segment fetch time
     */
    nextLevelSwitch(): void;
    private abortCurrentFrag;
    protected flushMainBuffer(startOffset: number, endOffset: number): void;
    protected onMediaAttached(event: Events.MEDIA_ATTACHED, data: MediaAttachedData): void;
    protected onMediaDetaching(): void;
    private onMediaPlaying;
    private onMediaSeeked;
    private onManifestLoading;
    private onManifestParsed;
    private onLevelLoading;
    private onLevelLoaded;
    protected _handleFragmentLoadProgress(data: FragLoadedData): void;
    private onAudioTrackSwitching;
    private onAudioTrackSwitched;
    private onBufferCreated;
    private onFragBuffered;
    private onError;
    private checkBuffer;
    private onFragLoadEmergencyAborted;
    private onBufferFlushed;
    private onLevelsUpdated;
    swapAudioCodec(): void;
    /**
     * Seeks to the set startPosition if not equal to the mediaElement's current time.
     */
    protected seekToStartPos(): void;
    private _getAudioCodec;
    private _loadBitrateTestFrag;
    private _handleTransmuxComplete;
    private _bufferInitSegment;
    getMainFwdBufferInfo(): BufferInfo | null;
    private backtrack;
    private checkFragmentChanged;
    get nextLevel(): number;
    get currentFrag(): Fragment | null;
    get currentProgramDateTime(): Date | null;
    get currentLevel(): number;
    get nextBufferedFrag(): Fragment | null;
    get forceStartLoad(): boolean;
}

export declare type StreamControllerConfig = {
    autoStartLoad: boolean;
    startPosition: number;
    defaultAudioCodec?: string;
    initialLiveManifestSize: number;
    maxBufferLength: number;
    maxBufferSize: number;
    maxBufferHole: number;
    highBufferWatchdogPeriod: number;
    nudgeOffset: number;
    nudgeMaxRetry: number;
    maxFragLookUpTolerance: number;
    maxMaxBufferLength: number;
    startFragPrefetch: boolean;
    testBandwidth: boolean;
};

/**
 * Unicode character with styling and background.
 * @constructor
 */
declare class StyledUnicodeChar {
    uchar: string;
    penState: PenState;
    reset(): void;
    setChar(uchar: string, newPenState: PenState): void;
    setPenState(newPenState: PenState): void;
    equals(other: StyledUnicodeChar): boolean;
    copy(newChar: StyledUnicodeChar): void;
    isEmpty(): boolean;
}

declare interface SubtitleFragProcessed {
    success: boolean;
    frag: Fragment;
}

export declare interface SubtitleFragProcessedData {
    success: boolean;
    frag: Fragment;
    error?: Error;
}

export declare type SubtitlePlaylistType = 'SUBTITLES' | 'CLOSED-CAPTIONS';

export declare type SubtitleSelectionOption = {
    lang?: string;
    assocLang?: string;
    characteristics?: string;
    name?: string;
    groupId?: string;
    default?: boolean;
    forced?: boolean;
};

export declare class SubtitleStreamController extends BaseStreamController implements NetworkComponentAPI {
    private currentTrackId;
    private tracksBuffered;
    private mainDetails;
    constructor(hls: Hls, fragmentTracker: FragmentTracker, keyLoader: KeyLoader);
    protected onHandlerDestroying(): void;
    private _registerListeners;
    private _unregisterListeners;
    startLoad(startPosition: number): void;
    onManifestLoading(): void;
    onMediaDetaching(): void;
    onLevelLoaded(event: Events.LEVEL_LOADED, data: LevelLoadedData): void;
    onSubtitleFragProcessed(event: Events.SUBTITLE_FRAG_PROCESSED, data: SubtitleFragProcessed): void;
    onBufferFlushing(event: Events.BUFFER_FLUSHING, data: BufferFlushingData): void;
    onFragBuffered(event: Events.FRAG_BUFFERED, data: FragBufferedData): void;
    onError(event: Events.ERROR, data: ErrorData): void;
    onSubtitleTracksUpdated(event: Events.SUBTITLE_TRACKS_UPDATED, { subtitleTracks }: SubtitleTracksUpdatedData): void;
    onSubtitleTrackSwitch(event: Events.SUBTITLE_TRACK_SWITCH, data: TrackSwitchedData): void;
    onSubtitleTrackLoaded(event: Events.SUBTITLE_TRACK_LOADED, data: TrackLoadedData): void;
    _handleFragmentLoadComplete(fragLoadedData: FragLoadedData): void;
    doTick(): void;
    protected getMaxBufferLength(mainBufferLength?: number): number;
    protected loadFragment(frag: Fragment, level: Level, targetBufferTime: number): void;
    get mediaBufferTimeRanges(): Bufferable;
}

export declare class SubtitleTrackController extends BasePlaylistController {
    private media;
    private tracks;
    private groupIds;
    private tracksInGroup;
    private trackId;
    private currentTrack;
    private selectDefaultTrack;
    private queuedDefaultTrack;
    private asyncPollTrackChange;
    private useTextTrackPolling;
    private subtitlePollingInterval;
    private _subtitleDisplay;
    constructor(hls: Hls);
    destroy(): void;
    get subtitleDisplay(): boolean;
    set subtitleDisplay(value: boolean);
    private registerListeners;
    private unregisterListeners;
    protected onMediaAttached(event: Events.MEDIA_ATTACHED, data: MediaAttachedData): void;
    private pollTrackChange;
    protected onMediaDetaching(): void;
    protected onManifestLoading(): void;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
    protected onSubtitleTrackLoaded(event: Events.SUBTITLE_TRACK_LOADED, data: TrackLoadedData): void;
    protected onLevelLoading(event: Events.LEVEL_LOADING, data: LevelLoadingData): void;
    protected onLevelSwitching(event: Events.LEVEL_SWITCHING, data: LevelSwitchingData): void;
    private switchLevel;
    private findTrackId;
    private findTrackForTextTrack;
    protected onError(event: Events.ERROR, data: ErrorData): void;
    get allSubtitleTracks(): MediaPlaylist[];
    /** get alternate subtitle tracks list from playlist **/
    get subtitleTracks(): MediaPlaylist[];
    /** get/set index of the selected subtitle track (based on index in subtitle track lists) **/
    get subtitleTrack(): number;
    set subtitleTrack(newId: number);
    setSubtitleOption(subtitleOption: MediaPlaylist | SubtitleSelectionOption | undefined): MediaPlaylist | null;
    protected loadPlaylist(hlsUrlParameters?: HlsUrlParameters): void;
    /**
     * Disables the old subtitleTrack and sets current mode on the next subtitleTrack.
     * This operates on the DOM textTracks.
     * A value of -1 will disable all subtitle tracks.
     */
    private toggleTrackModes;
    /**
     * This method is responsible for validating the subtitle index and periodically reloading if live.
     * Dispatches the SUBTITLE_TRACK_SWITCH event, which instructs the subtitle-stream-controller to load the selected track.
     */
    private setSubtitleTrack;
    private onTextTracksChanged;
}

export declare interface SubtitleTrackLoadedData extends TrackLoadedData {
}

export declare interface SubtitleTracksUpdatedData {
    subtitleTracks: MediaPlaylist[];
}

export declare interface SubtitleTrackSwitchData {
    id: number;
    name?: string;
    groupId?: string;
    type?: MediaPlaylistType | 'main';
    url?: string;
}

/**
 * @ignore
 * Sub-class specialization of EventHandler base class.
 *
 * TaskLoop allows to schedule a task function being called (optionnaly repeatedly) on the main loop,
 * scheduled asynchroneously, avoiding recursive calls in the same tick.
 *
 * The task itself is implemented in `doTick`. It can be requested and called for single execution
 * using the `tick` method.
 *
 * It will be assured that the task execution method (`tick`) only gets called once per main loop "tick",
 * no matter how often it gets requested for execution. Execution in further ticks will be scheduled accordingly.
 *
 * If further execution requests have already been scheduled on the next tick, it can be checked with `hasNextTick`,
 * and cancelled with `clearNextTick`.
 *
 * The task can be scheduled as an interval repeatedly with a period as parameter (see `setInterval`, `clearInterval`).
 *
 * Sub-classes need to implement the `doTick` method which will effectively have the task execution routine.
 *
 * Further explanations:
 *
 * The baseclass has a `tick` method that will schedule the doTick call. It may be called synchroneously
 * only for a stack-depth of one. On re-entrant calls, sub-sequent calls are scheduled for next main loop ticks.
 *
 * When the task execution (`tick` method) is called in re-entrant way this is detected and
 * we are limiting the task execution per call stack to exactly one, but scheduling/post-poning further
 * task processing on the next main loop iteration (also known as "next tick" in the Node/JS runtime lingo).
 */
declare class TaskLoop {
    private readonly _boundTick;
    private _tickTimer;
    private _tickInterval;
    private _tickCallCount;
    constructor();
    destroy(): void;
    protected onHandlerDestroying(): void;
    protected onHandlerDestroyed(): void;
    hasInterval(): boolean;
    hasNextTick(): boolean;
    /**
     * @param millis - Interval time (ms)
     * @eturns True when interval has been scheduled, false when already scheduled (no effect)
     */
    setInterval(millis: number): boolean;
    /**
     * @returns True when interval was cleared, false when none was set (no effect)
     */
    clearInterval(): boolean;
    /**
     * @returns True when timeout was cleared, false when none was set (no effect)
     */
    clearNextTick(): boolean;
    /**
     * Will call the subclass doTick implementation in this main loop tick
     * or in the next one (via setTimeout(,0)) in case it has already been called
     * in this tick (in case this is a re-entrant call).
     */
    tick(): void;
    tickImmediate(): void;
    /**
     * For subclass to implement task logic
     * @abstract
     */
    protected doTick(): void;
}

export declare class TimelineController implements ComponentAPI {
    private hls;
    private media;
    private config;
    private enabled;
    private Cues;
    private textTracks;
    private tracks;
    private initPTS;
    private unparsedVttFrags;
    private captionsTracks;
    private nonNativeCaptionsTracks;
    private cea608Parser1?;
    private cea608Parser2?;
    private lastCc;
    private lastSn;
    private lastPartIndex;
    private prevCC;
    private vttCCs;
    private captionsProperties;
    constructor(hls: Hls);
    destroy(): void;
    private initCea608Parsers;
    addCues(trackName: string, startTime: number, endTime: number, screen: CaptionScreen, cueRanges: Array<[number, number]>): void;
    private onInitPtsFound;
    private getExistingTrack;
    createCaptionsTrack(trackName: string): void;
    private createNativeTrack;
    private createNonNativeTrack;
    private createTextTrack;
    private onMediaAttaching;
    private onMediaDetaching;
    private onManifestLoading;
    private _cleanTracks;
    private onSubtitleTracksUpdated;
    private onManifestLoaded;
    private closedCaptionsForLevel;
    private onFragLoading;
    private onFragLoaded;
    private _parseIMSC1;
    private _parseVTTs;
    private _fallbackToIMSC1;
    private _appendCues;
    private onFragDecrypted;
    private onSubtitleTracksCleared;
    private onFragParsingUserdata;
    onBufferFlushing(event: Events.BUFFER_FLUSHING, { startOffset, endOffset, endOffsetSubtitles, type }: BufferFlushingData): void;
    private extractCea608Data;
}

export declare type TimelineControllerConfig = {
    cueHandler: CuesInterface;
    enableWebVTT: boolean;
    enableIMSC1: boolean;
    enableCEA708Captions: boolean;
    captionsTextTrack1Label: string;
    captionsTextTrack1LanguageCode: string;
    captionsTextTrack2Label: string;
    captionsTextTrack2LanguageCode: string;
    captionsTextTrack3Label: string;
    captionsTextTrack3LanguageCode: string;
    captionsTextTrack4Label: string;
    captionsTextTrack4LanguageCode: string;
    renderTextTracksNatively: boolean;
};

export declare interface Track {
    id: 'audio' | 'main';
    buffer?: SourceBuffer;
    container: string;
    codec?: string;
    initSegment?: Uint8Array;
    levelCodec?: string;
    metadata?: any;
}

export declare interface TrackLoadedData {
    details: LevelDetails;
    id: number;
    groupId: string;
    networkDetails: any;
    stats: LoaderStats;
    deliveryDirectives: HlsUrlParameters | null;
}

export declare interface TrackLoadingData {
    id: number;
    groupId: string;
    url: string;
    deliveryDirectives: HlsUrlParameters | null;
}

export declare interface TrackSet {
    audio?: Track;
    video?: Track;
    audiovideo?: Track;
}

declare interface TrackSwitchedData {
    id: number;
}

declare class TransmuxerInterface {
    error: Error | null;
    private hls;
    private id;
    private observer;
    private frag;
    private part;
    private useWorker;
    private workerContext;
    private onwmsg?;
    private transmuxer;
    private onTransmuxComplete;
    private onFlush;
    constructor(hls: Hls, id: PlaylistLevelType, onTransmuxComplete: (transmuxResult: TransmuxerResult) => void, onFlush: (chunkMeta: ChunkMetadata) => void);
    resetWorker(): void;
    destroy(): void;
    push(data: ArrayBuffer, initSegmentData: Uint8Array | undefined, audioCodec: string | undefined, videoCodec: string | undefined, frag: Fragment, part: Part | null, duration: number, accurateTimeOffset: boolean, chunkMeta: ChunkMetadata, defaultInitPTS?: RationalTimestamp): void;
    flush(chunkMeta: ChunkMetadata): void;
    private transmuxerError;
    private handleFlushResult;
    private onWorkerMessage;
    private configureTransmuxer;
    private handleTransmuxComplete;
}

declare interface TransmuxerResult {
    remuxResult: RemuxerResult;
    chunkMeta: ChunkMetadata;
}

export declare type TSDemuxerConfig = {
    forceKeyFrameOnDiscontinuity: boolean;
};

export declare type UriReplacement = {
    HOST?: string;
    PARAMS?: {
        [queryParameter: string]: string;
    };
    'PER-VARIANT-URIS'?: {
        [stableVariantId: string]: string;
    };
    'PER-RENDITION-URIS'?: {
        [stableRenditionId: string]: string;
    };
};

export declare interface UserdataSample {
    pts: number;
    bytes?: Uint8Array;
    type?: number;
    payloadType?: number;
    uuid?: string;
    userData?: string;
    userDataBytes?: Uint8Array;
}

export declare type VariableMap = Record<string, string>;

declare const enum VerboseLevel {
    ERROR = 0,
    TEXT = 1,
    WARNING = 2,
    INFO = 2,
    DEBUG = 3,
    DATA = 3
}

declare type VideoRange = (typeof VideoRangeValues)[number];

declare const VideoRangeValues: readonly ["SDR", "PQ", "HLG"];

export declare type VideoSelectionOption = {
    preferHDR?: boolean;
    allowedVideoRanges?: Array<VideoRange>;
};

export { }
