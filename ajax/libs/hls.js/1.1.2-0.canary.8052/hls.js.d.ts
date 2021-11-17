declare class AbrController implements ComponentAPI {
    protected hls: Hls;
    private lastLoadedFragLevel;
    private _nextAutoLevel;
    private timer?;
    private onCheck;
    private fragCurrent;
    private partCurrent;
    private bitrateTestDelay;
    readonly bwEstimator: EwmaBandWidthEstimator;
    constructor(hls: Hls);
    protected registerListeners(): void;
    protected unregisterListeners(): void;
    destroy(): void;
    protected onFragLoading(event: Events.FRAG_LOADING, data: FragLoadingData): void;
    protected onLevelLoaded(event: Events.LEVEL_LOADED, data: LevelLoadedData): void;
    private _abandonRulesCheck;
    protected onFragLoaded(event: Events.FRAG_LOADED, { frag, part }: FragLoadedData): void;
    protected onFragBuffered(event: Events.FRAG_BUFFERED, data: FragBufferedData): void;
    protected onError(event: Events.ERROR, data: ErrorData): void;
    clearTimer(): void;
    get nextAutoLevel(): number;
    private getNextABRAutoLevel;
    private findBestLevel;
    set nextAutoLevel(nextLevel: number);
}

export declare type ABRControllerConfig = {
    abrEwmaFastLive: number;
    abrEwmaSlowLive: number;
    abrEwmaFastVoD: number;
    abrEwmaSlowVoD: number;
    abrEwmaDefaultEstimate: number;
    abrBandWidthFactor: number;
    abrBandWidthUpFactor: number;
    abrMaxWithRealBitrate: boolean;
    maxStarvationDelay: number;
    maxLoadingDelay: number;
};

export declare class AttrList {
    [key: string]: any;
    constructor(attrs: string | Record<string, any>);
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

declare class AudioStreamController extends BaseStreamController implements NetworkComponentAPI {
    private videoBuffer;
    private videoTrackCC;
    private waitingVideoCC;
    private audioSwitch;
    private trackId;
    private waitingData;
    private mainDetails;
    private bufferFlushed;
    constructor(hls: Hls, fragmentTracker: FragmentTracker);
    protected onHandlerDestroying(): void;
    private _registerListeners;
    private _unregisterListeners;
    onInitPtsFound(event: Events.INIT_PTS_FOUND, { frag, id, initPTS }: InitPTSFoundData): void;
    startLoad(startPosition: number): void;
    doTick(): void;
    clearWaitingFragment(): void;
    protected onTickEnd(): void;
    private doTickIdle;
    protected getMaxBufferLength(): number;
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
    private onBufferFlushed;
    private _handleTransmuxComplete;
    private _bufferInitSegment;
    protected loadFragment(frag: Fragment, trackDetails: LevelDetails, targetBufferTime: number): void;
    private completeAudioSwitch;
}

declare class AudioTrackController extends BasePlaylistController {
    private tracks;
    private groupId;
    private tracksInGroup;
    private trackId;
    private trackName;
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
    get audioTracks(): MediaPlaylist[];
    get audioTrack(): number;
    set audioTrack(newId: number);
    private setAudioTrack;
    private selectInitialTrack;
    private findTrackId;
    protected loadPlaylist(hlsUrlParameters?: HlsUrlParameters): void;
}

export declare interface AudioTrackLoadedData extends TrackLoadedData {
}

export declare interface AudioTracksUpdatedData {
    audioTracks: MediaPlaylist[];
}

export declare interface AudioTrackSwitchedData {
    id: number;
}

export declare interface AudioTrackSwitchingData {
    id: number;
    name: string;
    groupId: string;
    type: MediaPlaylistType | 'main';
    url: string;
}

export declare interface BackBufferData {
    bufferEnd: number;
}

declare class BasePlaylistController implements NetworkComponentAPI {
    protected hls: Hls;
    protected timer: number;
    protected canLoad: boolean;
    protected retryCount: number;
    protected log: (msg: any) => void;
    protected warn: (msg: any) => void;
    constructor(hls: Hls, logPrefix: string);
    destroy(): void;
    protected onError(event: Events.ERROR, data: ErrorData): void;
    protected clearTimer(): void;
    startLoad(): void;
    stopLoad(): void;
    protected switchParams(playlistUri: string, previous?: LevelDetails): HlsUrlParameters | undefined;
    protected loadPlaylist(hlsUrlParameters?: HlsUrlParameters): void;
    protected shouldLoadTrack(track: MediaPlaylist): boolean;
    protected playlistLoaded(index: number, data: LevelLoadedData | AudioTrackLoadedData | TrackLoadedData, previousDetails?: LevelDetails): void;
    private getDeliveryDirectives;
    protected retryLoadingOrFail(errorEvent: ErrorData): boolean;
}

export declare class BaseSegment {
    private _byteRange;
    private _url;
    readonly baseurl: string;
    relurl?: string;
    elementaryStreams: ElementaryStreams;
    constructor(baseurl: string);
    setByteRange(value: string, previous?: BaseSegment): void;
    get byteRange(): number[];
    get byteRangeStartOffset(): number;
    get byteRangeEndOffset(): number;
    get url(): string;
    set url(value: string);
}

declare class BaseStreamController extends TaskLoop implements NetworkComponentAPI {
    protected hls: Hls;
    protected fragPrevious: Fragment | null;
    protected fragCurrent: Fragment | null;
    protected fragmentTracker: FragmentTracker;
    protected transmuxer: TransmuxerInterface | null;
    protected _state: string;
    protected media?: any;
    protected mediaBuffer?: any;
    protected config: HlsConfig;
    protected bitrateTest: boolean;
    protected lastCurrentTime: number;
    protected nextLoadPosition: number;
    protected startPosition: number;
    protected loadedmetadata: boolean;
    protected fragLoadError: number;
    protected retryDate: number;
    protected levels: Array<Level> | null;
    protected fragmentLoader: FragmentLoader;
    protected levelLastLoaded: number | null;
    protected startFragRequested: boolean;
    protected decrypter: Decrypter;
    protected initPTS: Array<number>;
    protected onvseeking: EventListener | null;
    protected onvended: EventListener | null;
    private readonly logPrefix;
    protected log: (msg: any) => void;
    protected warn: (msg: any) => void;
    constructor(hls: Hls, fragmentTracker: FragmentTracker, logPrefix: string);
    protected doTick(): void;
    protected onTickEnd(): void;
    startLoad(startPosition: number): void;
    stopLoad(): void;
    protected _streamEnded(bufferInfo: any, levelDetails: any): boolean;
    protected onMediaAttached(event: Events.MEDIA_ATTACHED, data: MediaAttachingData): void;
    protected onMediaDetaching(): void;
    protected onMediaSeeking(): void;
    protected onMediaEnded(): void;
    onKeyLoaded(event: Events.KEY_LOADED, data: KeyLoadedData): void;
    protected onHandlerDestroying(): void;
    protected onHandlerDestroyed(): void;
    protected loadKey(frag: Fragment, details: LevelDetails): void;
    protected loadFragment(frag: Fragment, levelDetails: LevelDetails, targetBufferTime: number): void;
    private _loadFragForPlayback;
    protected flushMainBuffer(startOffset: number, endOffset: number, type?: SourceBufferName | null): void;
    protected _loadInitSegment(frag: Fragment): void;
    protected fragContextChanged(frag: Fragment | null): boolean;
    protected fragBufferedComplete(frag: Fragment, part: Part | null): void;
    protected _handleFragmentLoadComplete(fragLoadedEndData: PartsLoadedData): void;
    protected _handleFragmentLoadProgress(frag: FragLoadedData): void;
    protected _doFragLoad(frag: Fragment, details?: LevelDetails, targetBufferTime?: number | null, progressCallback?: FragmentLoadProgressCallback): Promise<PartsLoadedData | FragLoadedData | null>;
    private doFragPartsLoad;
    private handleFragLoadError;
    protected _handleTransmuxerFlush(chunkMeta: ChunkMetadata): void;
    protected getCurrentContext(chunkMeta: ChunkMetadata): {
        frag: Fragment;
        part: Part | null;
        level: Level;
    } | null;
    protected bufferFragmentData(data: RemuxedTrack, frag: Fragment, part: Part | null, chunkMeta: ChunkMetadata): void;
    protected flushBufferGap(frag: Fragment): void;
    protected getFwdBufferInfo(bufferable: Bufferable, type: PlaylistLevelType): {
        len: number;
        start: number;
        end: number;
        nextStart?: number;
    } | null;
    protected getMaxBufferLength(levelBitrate?: number): number;
    protected reduceMaxBufferLength(threshold?: number): boolean;
    protected getNextFragment(pos: number, levelDetails: LevelDetails): Fragment | null;
    getNextPart(partList: Part[], frag: Fragment, targetBufferTime: number): number;
    private loadedEndOfParts;
    protected getInitialLiveFragment(levelDetails: LevelDetails, fragments: Array<Fragment>): Fragment | null;
    protected getFragmentAtPosition(bufferEnd: number, end: number, levelDetails: LevelDetails): Fragment | null;
    protected synchronizeToLiveEdge(levelDetails: LevelDetails): void;
    protected alignPlaylists(details: LevelDetails, previousDetails?: LevelDetails): number;
    protected waitForCdnTuneIn(details: LevelDetails): boolean;
    protected setStartPosition(details: LevelDetails, sliding: number): void;
    protected getLoadPosition(): number;
    private handleFragLoadAborted;
    protected resetFragmentLoading(frag: Fragment): void;
    protected onFragmentOrKeyLoadError(filterType: PlaylistLevelType, data: ErrorData): void;
    protected afterBufferFlushed(media: Bufferable, bufferType: SourceBufferName, playlistType: PlaylistLevelType): void;
    protected resetLoadingState(): void;
    protected resetLiveStartWhenNotLoaded(level: number): boolean;
    private updateLevelTiming;
    protected resetTransmuxer(): void;
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

declare class BufferController implements ComponentAPI {
    private details;
    private _objectUrl;
    private operationQueue;
    private listeners;
    private hls;
    bufferCodecEventsExpected: number;
    private _bufferCodecEventsTotal;
    media: HTMLMediaElement | null;
    mediaSource: MediaSource | null;
    appendError: number;
    tracks: TrackSet;
    pendingTracks: TrackSet;
    sourceBuffer: SourceBuffers;
    constructor(hls: Hls);
    hasSourceTypes(): boolean;
    destroy(): void;
    protected registerListeners(): void;
    protected unregisterListeners(): void;
    private _initSourceBuffer;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
    protected onMediaAttaching(event: Events.MEDIA_ATTACHING, data: MediaAttachingData): void;
    protected onMediaDetaching(): void;
    protected onBufferReset(): void;
    protected onBufferCodecs(event: Events.BUFFER_CODECS, data: BufferCodecsData): void;
    protected appendChangeType(type: any, mimeType: any): void;
    protected onBufferAppending(event: Events.BUFFER_APPENDING, eventData: BufferAppendingData): void;
    protected onBufferFlushing(event: Events.BUFFER_FLUSHING, data: BufferFlushingData): void;
    protected onFragParsed(event: Events.FRAG_PARSED, data: FragParsedData): void;
    private onFragChanged;
    protected onBufferEos(event: Events.BUFFER_EOS, data: BufferEOSData): void;
    protected onLevelUpdated(event: Events.LEVEL_UPDATED, { details }: LevelUpdatedData): void;
    flushBackBuffer(): void;
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
    liveDurationInfinity: boolean;
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

declare class CapLevelController implements ComponentAPI {
    autoLevelCapping: number;
    firstLevel: number;
    media: HTMLVideoElement | null;
    restrictedLevels: Array<number>;
    timer: number | undefined;
    private hls;
    private streamController?;
    clientRect: {
        width: number;
        height: number;
    } | null;
    constructor(hls: Hls);
    setStreamController(streamController: StreamController): void;
    destroy(): void;
    protected registerListeners(): void;
    protected unregisterListener(): void;
    protected onFpsDropLevelCapping(event: Events.FPS_DROP_LEVEL_CAPPING, data: FPSDropLevelCappingData): void;
    protected onMediaAttaching(event: Events.MEDIA_ATTACHING, data: MediaAttachingData): void;
    protected onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
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
    static get contentScaleFactor(): number;
    static isLevelAllowed(level: number, restrictedLevels?: Array<number>): boolean;
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
    log(severity: VerboseLevel, msg: string): void;
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
 * CMCD
 */
declare interface CMCD {
    /**
     * Encoded bitrate
     *
     * The encoded bitrate of the audio or video object being requested. This may not be known precisely by the player; however,
     * it MAY be estimated based upon playlist/manifest declarations. If the playlist declares both peak and average bitrate values,
     * the peak value should be transmitted.
     *
     * Integer kbps
     */
    br?: number;
    /**
     * Object duration
     *
     * The playback duration in milliseconds of the object being requested. If a partial segment is being requested, then this value
     * MUST indicate the playback duration of that part and not that of its parent segment. This value can be an approximation of the
     * estimated duration if the explicit value is not known.
     *
     * Integer milliseconds
     */
    d?: number;
    /**
     * Object type
     *
     * The media type of the current object being requested:
     * - `m` = text file, such as a manifest or playlist
     * - `a` = audio only
     * - `v` = video only
     * - `av` = muxed audio and video
     * - `i` = init segment
     * - `c` = caption or subtitle
     * - `tt` = ISOBMFF timed text track
     * - `k` = cryptographic key, license or certificate.
     * - `o` = other
     *
     * If the object type being requested is unknown, then this key MUST NOT be used.
     */
    ot?: CMCDObjectType;
    /**
     * Top bitrate
     *
     * The highest bitrate rendition in the manifest or playlist that the client is allowed to play, given current codec, licensing and
     * sizing constraints.
     *
     * Integer Kbps
     */
    tb?: number;
    /**
     * Buffer length
     *
     * The buffer length associated with the media object being requested. This value MUST be rounded to the nearest 100 ms. This key SHOULD only be
     * sent with an object type of ‘a’, ‘v’ or ‘av’.
     *
     * Integer milliseconds
     */
    bl?: number;
    /**
     * Deadline
     *
     * Deadline from the request time until the first sample of this Segment/Object needs to be available in order to not create a buffer underrun or
     * any other playback problems. This value MUST be rounded to the nearest 100ms. For a playback rate of 1, this may be equivalent to the player’s
     * remaining buffer length.
     *
     * Integer milliseconds
     */
    dl?: number;
    /**
     * Measured mtp CMCD throughput
     *
     * The throughput between client and server, as measured by the client and MUST be rounded to the nearest 100 kbps. This value, however derived,
     * SHOULD be the value that the client is using to make its next Adaptive Bitrate switching decision. If the client is connected to multiple
     * servers concurrently, it must take care to report only the throughput measured against the receiving server. If the client has multiple concurrent
     * connections to the server, then the intent is that this value communicates the aggregate throughput the client sees across all those connections.
     *
     * Integer kbps
     */
    mtp?: number;
    /**
     * Next object request
     *
     * Relative path of the next object to be requested. This can be used to trigger pre-fetching by the CDN. This MUST be a path relative to the current
     * request. This string MUST be URLEncoded. The client SHOULD NOT depend upon any pre-fetch action being taken - it is merely a request for such a
     * pre-fetch to take place.
     *
     * String
     */
    nor?: string;
    /**
     * Next range request
     *
     * If the next request will be a partial object request, then this string denotes the byte range to be requested. If the ‘nor’ field is not set, then the
     * object is assumed to match the object currently being requested. The client SHOULD NOT depend upon any pre-fetch action being taken – it is merely a
     * request for such a pre-fetch to take place. Formatting is similar to the HTTP Range header, except that the unit MUST be ‘byte’, the ‘Range:’ prefix is
     * NOT required and specifying multiple ranges is NOT allowed. Valid combinations are:
     *
     * - `"\<range-start\>-"`
     * - `"\<range-start\>-\<range-end\>"`
     * - `"-\<suffix-length\>"`
     *
     * String
     */
    nrr?: string;
    /**
     * Startup
     *
     * Key is included without a value if the object is needed urgently due to startup, seeking or recovery after a buffer-empty event. The media SHOULD not be
     * rendering when this request is made. This key MUST not be sent if it is FALSE.
     *
     * Boolean
     */
    su?: boolean;
    /**
     * Content ID
     *
     * A unique string identifying the current content. Maximum length is 64 characters. This value is consistent across multiple different
     * sessions and devices and is defined and updated at the discretion of the service provider.
     *
     * String
     */
    cid?: string;
    /**
     * Playback rate
     *
     * `1` if real-time, `2` if double speed, `0` if not playing. SHOULD only be sent if not equal to `1`.
     *
     * Decimal
     */
    pr?: number;
    /**
     * Streaming format
     *
     * The streaming format that defines the current request.
     *
     * - `d` = MPEG DASH
     * - `h` = HTTP Live Streaming (HLS)
     * - `s` = Smooth Streaming
     * - `o` = other
     *
     * If the streaming format being requested is unknown, then this key MUST NOT be used.
     */
    sf?: CMCDStreamingFormat;
    /**
     * Session ID
     *
     * A GUID identifying the current playback session. A playback session typically ties together segments belonging to a single media asset.
     * Maximum length is 64 characters. It is RECOMMENDED to conform to the UUID specification.
     *
     * String
     */
    sid?: string;
    /**
     * Stream type
     * - `v` = all segments are available – e.g., VOD
     * - `l` = segments become available over time – e.g., LIVE
     */
    st?: CMCDStreamType;
    /**
     * CMCD version
     *
     * The version of this specification used for interpreting the defined key names and values. If this key is omitted, the client and server MUST
     * interpret the values as being defined by version 1. Client SHOULD omit this field if the version is 1.
     *
     * Integer
     */
    v?: number;
    /**
     * Buffer starvation
     *
     * Key is included without a value if the buffer was starved at some point between the prior request and this object request,
     * resulting in the player being in a rebuffering state and the video or audio playback being stalled. This key MUST NOT be
     * sent if the buffer was not starved since the prior request.
     *
     * If the object type `ot` key is sent along with this key, then the `bs` key refers to the buffer associated with the particular
     * object type. If no object type is communicated, then the buffer state applies to the current session.
     *
     * Boolean
     */
    bs?: boolean;
    /**
     * Requested maximum throughput
     *
     * The requested maximum throughput that the client considers sufficient for delivery of the asset. Values MUST be rounded to the
     * nearest 100kbps. For example, a client would indicate that the current segment, encoded at 2Mbps, is to be delivered at no more
     * than 10Mbps, by using rtp=10000.
     *
     * Note: This can benefit clients by preventing buffer saturation through over-delivery and can also deliver a community benefit
     * through fair-share delivery. The concept is that each client receives the throughput necessary for great performance, but no more.
     * The CDN may not support the rtp feature.
     *
     * Integer kbps
     */
    rtp?: number;
}

/**
 * Controller to deal with Common Media Client Data (CMCD)
 * @see https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf
 */
declare class CMCDController implements ComponentAPI {
    private hls;
    private config;
    private media?;
    private sid?;
    private cid?;
    private useHeaders;
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
    /**
     * Generate a random v4 UUI
     *
     * @returns {string}
     */
    static uuid(): string;
    /**
     * Serialize a CMCD data object according to the rules defined in the
     * section 3.2 of
     * [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf).
     */
    static serialize(data: CMCD): string;
    /**
     * Convert a CMCD data object to request headers according to the rules
     * defined in the section 2.1 and 3.2 of
     * [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf).
     */
    static toHeaders(data: CMCD): Partial<CMCDHeaders>;
    /**
     * Convert a CMCD data object to query args according to the rules
     * defined in the section 2.2 and 3.2 of
     * [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf).
     */
    static toQuery(data: CMCD): string;
    /**
     * Append query args to a uri.
     */
    static appendQueryToUri(uri: any, query: any): any;
}

export declare type CMCDControllerConfig = {
    sessionId?: string;
    contentId?: string;
    useHeaders?: boolean;
};

/**
 * CMCD Headers
 */
declare interface CMCDHeaders {
    'CMCD-Object': string;
    'CMCD-Request': string;
    'CMCD-Session': string;
    'CMCD-Status': string;
}

/**
 * CMCD Object Type
 */
declare enum CMCDObjectType {
    MANIFEST = "m",
    AUDIO = "a",
    VIDEO = "v",
    MUXED = "av",
    INIT = "i",
    CAPTION = "c",
    TIMED_TEXT = "tt",
    KEY = "k",
    OTHER = "o"
}

/**
 * CMCD Streaming Format
 */
declare enum CMCDStreamingFormat {
    DASH = "d",
    HLS = "h",
    SMOOTH = "s",
    OTHER = "o"
}

/**
 * CMCD Streaming Type
 */
declare enum CMCDStreamType {
    VOD = "v",
    LIVE = "l"
}

declare interface ComponentAPI {
    destroy(): void;
}

export declare interface CuesInterface {
    newCue(track: TextTrack | null, startTime: number, endTime: number, captionScreen: CaptionScreen): VTTCue[];
}

export declare interface CuesParsedData {
    type: 'captions' | 'subtitles';
    cues: any;
    track: string;
}

declare class Decrypter {
    private logEnabled;
    private observer;
    private config;
    private removePKCS7Padding;
    private subtle;
    private softwareDecrypter;
    private key;
    private fastAesKey;
    private remainderData;
    private currentIV;
    private currentResult;
    constructor(observer: HlsEventEmitter, config: HlsConfig, { removePKCS7Padding }?: {
        removePKCS7Padding?: boolean | undefined;
    });
    destroy(): void;
    isSync(): boolean;
    flush(): Uint8Array | void;
    reset(): void;
    decrypt(data: Uint8Array | ArrayBuffer, key: ArrayBuffer, iv: ArrayBuffer, callback: (decryptedData: ArrayBuffer) => void): void;
    softwareDecrypt(data: Uint8Array, key: ArrayBuffer, iv: ArrayBuffer): ArrayBuffer | null;
    webCryptoDecrypt(data: Uint8Array, key: ArrayBuffer, iv: ArrayBuffer): Promise<ArrayBuffer>;
    private onWebCryptoError;
    private getValidChunk;
    private logOnce;
}

export declare type DRMSystemOptions = {
    audioRobustness?: string;
    videoRobustness?: string;
};

export declare interface ElementaryStreamInfo {
    startPTS: number;
    endPTS: number;
    startDTS: number;
    endDTS: number;
    partial?: boolean;
}

export declare type ElementaryStreams = Record<ElementaryStreamTypes, ElementaryStreamInfo | null>;

export declare enum ElementaryStreamTypes {
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
declare class EMEController implements ComponentAPI {
    private hls;
    private _widevineLicenseUrl?;
    private _licenseXhrSetup?;
    private _licenseResponseCallback?;
    private _emeEnabled;
    private _requestMediaKeySystemAccess;
    private _drmSystemOptions;
    private _config;
    private _mediaKeysList;
    private _media;
    private _hasSetMediaKeys;
    private _requestLicenseFailureCount;
    private mediaKeysPromise;
    private _onMediaEncrypted;
    /**
     * @constructs
     * @param {Hls} hls Our Hls.js instance
     */
    constructor(hls: Hls);
    destroy(): void;
    private _registerListeners;
    private _unregisterListeners;
    /**
     * @param {string} keySystem Identifier for the key-system, see `KeySystems` enum
     * @returns {string} License server URL for key-system (if any configured, otherwise causes error)
     * @throws if a unsupported keysystem is passed
     */
    getLicenseServerUrl(keySystem: KeySystems): string;
    /**
     * Requests access object and adds it to our list upon success
     * @private
     * @param {string} keySystem System ID (see `KeySystems`)
     * @param {Array<string>} audioCodecs List of required audio codecs to support
     * @param {Array<string>} videoCodecs List of required video codecs to support
     * @throws When a unsupported KeySystem is passed
     */
    private _attemptKeySystemAccess;
    get requestMediaKeySystemAccess(): MediaKeyFunc;
    /**
     * Handles obtaining access to a key-system
     * @private
     * @param {string} keySystem
     * @param {MediaKeySystemAccess} mediaKeySystemAccess https://developer.mozilla.org/en-US/docs/Web/API/MediaKeySystemAccess
     */
    private _onMediaKeySystemAccessObtained;
    /**
     * Handles key-creation (represents access to CDM). We are going to create key-sessions upon this
     * for all existing keys where no session exists yet.
     *
     * @private
     */
    private _onMediaKeysCreated;
    /**
     * @private
     * @param {*} keySession
     */
    private _onNewMediaKeySession;
    /**
     * @private
     * @param {MediaKeySession} keySession
     * @param {ArrayBuffer} message
     */
    private _onKeySessionMessage;
    /**
     * @private
     * @param e {MediaEncryptedEvent}
     */
    private onMediaEncrypted;
    /**
     * @private
     */
    private _attemptSetMediaKeys;
    /**
     * @private
     */
    private _generateRequestWithPreferredKeySession;
    /**
     * @private
     * @param {string} url License server URL
     * @param {ArrayBuffer} keyMessage Message data issued by key-system
     * @param {function} callback Called when XHR has succeeded
     * @returns {XMLHttpRequest} Unsent (but opened state) XHR object
     * @throws if XMLHttpRequest construction failed
     */
    private _createLicenseXhr;
    /**
     * @private
     * @param {XMLHttpRequest} xhr
     * @param {string} url License server URL
     * @param {ArrayBuffer} keyMessage Message data issued by key-system
     * @param {function} callback Called when XHR has succeeded
     */
    private _onLicenseRequestReadyStageChange;
    /**
     * @private
     * @param {MediaKeysListItem} keysListItem
     * @param {ArrayBuffer} keyMessage
     * @returns {ArrayBuffer} Challenge data posted to license server
     * @throws if KeySystem is unsupported
     */
    private _generateLicenseRequestChallenge;
    /**
     * @private
     * @param keyMessage
     * @param callback
     */
    private _requestLicense;
    onMediaAttached(event: Events.MEDIA_ATTACHED, data: MediaAttachedData): void;
    onMediaDetached(): void;
    onManifestParsed(event: Events.MANIFEST_PARSED, data: ManifestParsedData): void;
}

export declare type EMEControllerConfig = {
    licenseXhrSetup?: (xhr: XMLHttpRequest, url: string) => void;
    licenseResponseCallback?: (xhr: XMLHttpRequest, url: string) => ArrayBuffer;
    emeEnabled: boolean;
    widevineLicenseUrl?: string;
    drmSystemOptions: DRMSystemOptions;
    requestMediaKeySystemAccessFunc: MediaKeyFunc | null;
};

export declare interface ErrorData {
    type: ErrorTypes;
    details: ErrorDetails;
    fatal: boolean;
    buffer?: number;
    bytes?: number;
    context?: PlaylistLoaderContext;
    error?: Error;
    event?: keyof HlsListeners | 'demuxerWorker';
    frag?: Fragment;
    level?: number | undefined;
    levelRetry?: boolean;
    loader?: Loader<LoaderContext>;
    networkDetails?: any;
    mimeType?: string;
    reason?: string;
    response?: LoaderResponse;
    url?: string;
    parent?: PlaylistLevelType;
    err?: {
        message: string;
    };
}

/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */
export declare enum ErrorDetails {
    KEY_SYSTEM_NO_KEYS = "keySystemNoKeys",
    KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess",
    KEY_SYSTEM_NO_SESSION = "keySystemNoSession",
    KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed",
    KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData",
    MANIFEST_LOAD_ERROR = "manifestLoadError",
    MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut",
    MANIFEST_PARSING_ERROR = "manifestParsingError",
    MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError",
    LEVEL_EMPTY_ERROR = "levelEmptyError",
    LEVEL_LOAD_ERROR = "levelLoadError",
    LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut",
    LEVEL_SWITCH_ERROR = "levelSwitchError",
    AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError",
    AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut",
    SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError",
    SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut",
    FRAG_LOAD_ERROR = "fragLoadError",
    FRAG_LOAD_TIMEOUT = "fragLoadTimeOut",
    FRAG_DECRYPT_ERROR = "fragDecryptError",
    FRAG_PARSING_ERROR = "fragParsingError",
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

/**
 * @readonly
 * @enum {string}
 */
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
    ERROR = "hlsError",
    DESTROYING = "hlsDestroying",
    KEY_LOADING = "hlsKeyLoading",
    KEY_LOADED = "hlsKeyLoaded",
    LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached",
    BACK_BUFFER_REACHED = "hlsBackBufferReached"
}

declare class EwmaBandWidthEstimator {
    private defaultEstimate_;
    private minWeight_;
    private minDelayMs_;
    private slow_;
    private fast_;
    constructor(slow: number, fast: number, defaultEstimate: number);
    update(slow: number, fast: number): void;
    sample(durationMs: number, numBytes: number): void;
    canEstimate(): boolean;
    getEstimate(): number;
    destroy(): void;
}

declare type ExtendedSourceBuffer = SourceBuffer & {
    ended?: boolean;
    changeType?: (type: string) => void;
};

declare class FPSController implements ComponentAPI {
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

export declare interface FragLoadingData {
    frag: Fragment;
    part?: Part;
    targetBufferTime: number | null;
}

export declare class Fragment extends BaseSegment {
    private _decryptdata;
    rawProgramDateTime: string | null;
    programDateTime: number | null;
    tagList: Array<string[]>;
    duration: number;
    sn: number | 'initSegment';
    levelkey?: LevelKey;
    readonly type: PlaylistLevelType;
    loader: Loader<FragmentLoaderContext> | null;
    level: number;
    cc: number;
    startPTS?: number;
    endPTS?: number;
    appendedPTS?: number;
    startDTS: number;
    endDTS: number;
    start: number;
    deltaPTS?: number;
    maxStartPTS?: number;
    minEndPTS?: number;
    stats: LoadStats;
    urlId: number;
    data?: Uint8Array;
    bitrateTest: boolean;
    title: string | null;
    initSegment: Fragment | null;
    constructor(type: PlaylistLevelType, baseurl: string);
    get decryptdata(): LevelKey | null;
    get end(): number;
    get endProgramDateTime(): number | null;
    get encrypted(): boolean;
    /**
     * Utility method for parseLevelPlaylist to create an initialization vector for a given segment
     * @param {number} segmentNumber - segment number to generate IV with
     * @returns {Uint8Array}
     */
    createInitializationVector(segmentNumber: number): Uint8Array;
    /**
     * Utility method for parseLevelPlaylist to get a fragment's decryption data from the currently parsed encryption key data
     * @param levelkey - a playlist's encryption info
     * @param segmentNumber - the fragment's segment number
     * @returns {LevelKey} - an object to be applied as a fragment's decryptdata
     */
    setDecryptDataFromLevelKey(levelkey: LevelKey, segmentNumber: number): LevelKey;
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

export declare type FragmentLoaderConfig = {
    fLoader?: FragmentLoaderConstructor;
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
}

declare type FragmentLoadProgressCallback = (result: FragLoadedData) => void;

declare enum FragmentState {
    NOT_LOADED = "NOT_LOADED",
    BACKTRACKED = "BACKTRACKED",
    APPENDING = "APPENDING",
    PARTIAL = "PARTIAL",
    OK = "OK"
}

declare class FragmentTracker implements ComponentAPI {
    private activeFragment;
    private activeParts;
    private fragments;
    private timeRanges;
    private bufferPadding;
    private hls;
    constructor(hls: Hls);
    private _registerListeners;
    private _unregisterListeners;
    destroy(): void;
    /**
     * Return a Fragment with an appended range that matches the position and levelType.
     * If not found any Fragment, return null
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
    detectEvictedFragments(elementaryStream: SourceBufferName, timeRange: TimeRanges, playlistType?: PlaylistLevelType): void;
    /**
     * Checks if the fragment passed in is loaded in the buffer properly
     * Partially loaded fragments will be registered as a partial fragment
     */
    private detectPartialFragments;
    fragBuffered(frag: Fragment): void;
    private getBufferedTimes;
    /**
     * Gets the partial fragment for a certain time
     */
    getPartialFragment(time: number): Fragment | null;
    getState(fragment: Fragment): FragmentState;
    backtrack(frag: Fragment, data?: FragLoadedData): FragLoadedData | null;
    getBacktrackData(fragment: Fragment): FragLoadedData | null;
    private isTimeBuffered;
    private onFragLoaded;
    private onBufferAppended;
    private onFragBuffered;
    private hasFragment;
    removeFragmentsInRange(start: number, end: number, playlistType: PlaylistLevelType): void;
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
    samples: MetadataSample[];
}

export declare interface FragParsingUserdataData {
    id: string;
    frag: Fragment;
    samples: UserdataSample[];
}

/**
 * @module Hls
 * @class
 * @constructor
 */
declare class Hls implements HlsEventEmitter {
    private static defaultConfig?;
    readonly config: HlsConfig;
    readonly userConfig: Partial<HlsConfig>;
    private coreComponents;
    private networkControllers;
    private _emitter;
    private _autoLevelCapping;
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
    static get version(): string;
    static isSupported(): boolean;
    static get Events(): typeof Events;
    static get ErrorTypes(): typeof ErrorTypes;
    static get ErrorDetails(): typeof ErrorDetails;
    static get DefaultConfig(): HlsConfig;
    /**
     * @type {HlsConfig}
     */
    static set DefaultConfig(defaultConfig: HlsConfig);
    /**
     * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
     *
     * @constructs Hls
     * @param {HlsConfig} config
     */
    constructor(userConfig?: Partial<HlsConfig>);
    createController(ControllerClass: any, fragmentTracker: any, components: any): any;
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
     * @param {HTMLMediaElement} media
     */
    attachMedia(media: HTMLMediaElement): void;
    /**
     * Detach Hls.js from the media
     */
    detachMedia(): void;
    /**
     * Set the source URL. Can be relative or absolute.
     * @param {string} url
     */
    loadSource(url: string): void;
    /**
     * Start loading data from the stream source.
     * Depending on default config, client starts loading automatically when a source is set.
     *
     * @param {number} startPosition Set the start position to stream from
     * @default -1 None (from earliest point)
     */
    startLoad(startPosition?: number): void;
    /**
     * Stop loading of any stream data.
     */
    stopLoad(): void;
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
    removeLevel(levelIndex: any, urlId?: number): void;
    /**
     * @type {Level[]}
     */
    get levels(): Array<Level>;
    /**
     * Index of quality level currently played
     * @type {number}
     */
    get currentLevel(): number;
    /**
     * Set quality level index immediately .
     * This will flush the current buffer to replace the quality asap.
     * That means playback will interrupt at least shortly to re-buffer and re-sync eventually.
     * @type {number} -1 for automatic level selection
     */
    set currentLevel(newLevel: number);
    /**
     * Index of next quality level loaded as scheduled by stream controller.
     * @type {number}
     */
    get nextLevel(): number;
    /**
     * Set quality level index for next loaded data.
     * This will switch the video quality asap, without interrupting playback.
     * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
     * @type {number} -1 for automatic level selection
     */
    set nextLevel(newLevel: number);
    /**
     * Return the quality level of the currently or last (of none is loaded currently) segment
     * @type {number}
     */
    get loadLevel(): number;
    /**
     * Set quality level index for next loaded data in a conservative way.
     * This will switch the quality without flushing, but interrupt current loading.
     * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
     * @type {number} newLevel -1 for automatic level selection
     */
    set loadLevel(newLevel: number);
    /**
     * get next quality level loaded
     * @type {number}
     */
    get nextLoadLevel(): number;
    /**
     * Set quality level of next loaded segment in a fully "non-destructive" way.
     * Same as `loadLevel` but will wait for next switch (until current loading is done).
     * @type {number} level
     */
    set nextLoadLevel(level: number);
    /**
     * Return "first level": like a default level, if not set,
     * falls back to index of first level referenced in manifest
     * @type {number}
     */
    get firstLevel(): number;
    /**
     * Sets "first-level", see getter.
     * @type {number}
     */
    set firstLevel(newLevel: number);
    /**
     * Return start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number}
     */
    get startLevel(): number;
    /**
     * set  start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number} newLevel
     */
    set startLevel(newLevel: number);
    /**
     * Get the current setting for capLevelToPlayerSize
     *
     * @type {boolean}
     */
    get capLevelToPlayerSize(): boolean;
    /**
     * set  dynamically set capLevelToPlayerSize against (`CapLevelController`)
     *
     * @type {boolean}
     */
    set capLevelToPlayerSize(shouldStartCapping: boolean);
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */
    get autoLevelCapping(): number;
    /**
     * get bandwidth estimate
     * @type {number}
     */
    get bandwidthEstimate(): number;
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */
    set autoLevelCapping(newLevel: number);
    /**
     * True when automatic level selection enabled
     * @type {boolean}
     */
    get autoLevelEnabled(): boolean;
    /**
     * Level set manually (if any)
     * @type {number}
     */
    get manualLevel(): number;
    /**
     * min level selectable in auto mode according to config.minAutoBitrate
     * @type {number}
     */
    get minAutoLevel(): number;
    /**
     * max level selectable in auto mode according to autoLevelCapping
     * @type {number}
     */
    get maxAutoLevel(): number;
    /**
     * next automatically selected quality level
     * @type {number}
     */
    get nextAutoLevel(): number;
    /**
     * this setter is used to force next auto level.
     * this is useful to force a switch down in auto mode:
     * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
     * forced value is valid for one fragment. upon succesful frag loading at forced level,
     * this value will be resetted to -1 by ABR controller.
     * @type {number}
     */
    set nextAutoLevel(nextLevel: number);
    /**
     * @type {AudioTrack[]}
     */
    get audioTracks(): Array<MediaPlaylist>;
    /**
     * index of the selected audio track (index in audio track lists)
     * @type {number}
     */
    get audioTrack(): number;
    /**
     * selects an audio track, based on its index in audio track lists
     * @type {number}
     */
    set audioTrack(audioTrackId: number);
    /**
     * get alternate subtitle tracks list from playlist
     * @type {MediaPlaylist[]}
     */
    get subtitleTracks(): Array<MediaPlaylist>;
    /**
     * index of the selected subtitle track (index in subtitle track lists)
     * @type {number}
     */
    get subtitleTrack(): number;
    get media(): HTMLMediaElement | null;
    /**
     * select an subtitle track, based on its index in subtitle track lists
     * @type {number}
     */
    set subtitleTrack(subtitleTrackId: number);
    /**
     * @type {boolean}
     */
    get subtitleDisplay(): boolean;
    /**
     * Enable/disable subtitle display rendering
     * @type {boolean}
     */
    set subtitleDisplay(value: boolean);
    /**
     * get mode for Low-Latency HLS loading
     * @type {boolean}
     */
    get lowLatencyMode(): boolean;
    /**
     * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
     * @type {boolean}
     */
    set lowLatencyMode(mode: boolean);
    /**
     * position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
     * @type {number}
     */
    get liveSyncPosition(): number | null;
    /**
     * estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
     * returns 0 before first playlist is loaded
     * @type {number}
     */
    get latency(): number;
    /**
     * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
     * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
     * returns 0 before first playlist is loaded
     * @type {number}
     */
    get maxLatency(): number;
    /**
     * target distance from the edge as calculated by the latency controller
     * @type {number}
     */
    get targetLatency(): number | null;
    /**
     * the rate at which the edge of the current live playlist is advancing or 1 if there is none
     * @type {number}
     */
    get drift(): number | null;
    /**
     * set to true when startLoad is called before MANIFEST_PARSED event
     * @type {boolean}
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
    enableSoftwareAES: boolean;
    minAutoBitrate: number;
    loader: {
        new (confg: HlsConfig): Loader<LoaderContext>;
    };
    fetchSetup?: (context: LoaderContext, initParams: any) => Request;
    xhrSetup?: (xhr: XMLHttpRequest, url: string) => void;
    audioStreamController?: typeof AudioStreamController;
    audioTrackController?: typeof AudioTrackController;
    subtitleStreamController?: typeof SubtitleStreamController;
    subtitleTrackController?: typeof SubtitleTrackController;
    timelineController?: typeof TimelineController;
    emeController?: typeof EMEController;
    cmcd?: CMCDControllerConfig;
    cmcdController?: typeof CMCDController;
    abrController: typeof AbrController;
    bufferController: typeof BufferController;
    capLevelController: typeof CapLevelController;
    fpsController: typeof FPSController;
    progressive: boolean;
    lowLatencyMode: boolean;
} & ABRControllerConfig & BufferControllerConfig & CapLevelControllerConfig & EMEControllerConfig & FPSControllerConfig & FragmentLoaderConfig & LevelControllerConfig & MP4RemuxerConfig & PlaylistLoaderConfig & StreamControllerConfig & LatencyControllerConfig & TimelineControllerConfig & TSDemuxerConfig;

export declare interface HlsEventEmitter {
    on<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    once<E extends keyof HlsListeners, Context = undefined>(event: E, listener: HlsListeners[E], context?: Context): void;
    removeAllListeners<E extends keyof HlsListeners>(event?: E): void;
    off<E extends keyof HlsListeners, Context = undefined>(event: E, listener?: HlsListeners[E], context?: Context, once?: boolean): void;
    listeners<E extends keyof HlsListeners>(event: E): HlsListeners[E][];
    emit<E extends keyof HlsListeners>(event: E, name: E, eventObject: Parameters<HlsListeners[E]>[1]): boolean;
    listenerCount<E extends keyof HlsListeners>(event: E): number;
}

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
    [Events.ERROR]: (event: Events.ERROR, data: ErrorData) => void;
    [Events.DESTROYING]: (event: Events.DESTROYING) => void;
    [Events.KEY_LOADING]: (event: Events.KEY_LOADING, data: KeyLoadingData) => void;
    [Events.KEY_LOADED]: (event: Events.KEY_LOADED, data: KeyLoadedData) => void;
    [Events.LIVE_BACK_BUFFER_REACHED]: (event: Events.LIVE_BACK_BUFFER_REACHED, data: LiveBackBufferData) => void;
    [Events.BACK_BUFFER_REACHED]: (event: Events.BACK_BUFFER_REACHED, data: BackBufferData) => void;
}

export declare interface HlsPerformanceTiming {
    start: number;
    end: number;
}

export declare interface HlsProgressivePerformanceTiming extends HlsPerformanceTiming {
    first: number;
}

export declare enum HlsSkip {
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

declare interface ILogFunction {
    (message?: any, ...optionalParams: any[]): void;
}

declare interface ILogger {
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
}

export declare interface KeyLoadingData {
    frag: Fragment;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
export declare enum KeySystems {
    WIDEVINE = "com.widevine.alpha",
    PLAYREADY = "com.microsoft.playready"
}

export declare type LatencyControllerConfig = {
    liveSyncDurationCount: number;
    liveMaxLatencyDurationCount: number;
    liveSyncDuration?: number;
    liveMaxLatencyDuration?: number;
    maxLiveSyncPlaybackRate: number;
};

export declare class Level {
    readonly attrs: LevelAttributes;
    readonly audioCodec: string | undefined;
    readonly bitrate: number;
    readonly codecSet: string;
    readonly height: number;
    readonly id: number;
    readonly name: string | undefined;
    readonly videoCodec: string | undefined;
    readonly width: number;
    readonly unknownCodecs: string[] | undefined;
    audioGroupIds?: string[];
    details?: LevelDetails;
    fragmentError: number;
    loadError: number;
    loaded?: {
        bytes: number;
        duration: number;
    };
    realBitrate: number;
    textGroupIds?: string[];
    url: string[];
    private _urlId;
    constructor(data: LevelParsed);
    get maxBitrate(): number;
    get uri(): string;
    get urlId(): number;
    set urlId(value: number);
}

export declare interface LevelAttributes extends AttrList {
    AUDIO?: string;
    AUTOSELECT?: string;
    'AVERAGE-BANDWIDTH'?: string;
    BANDWIDTH?: string;
    BYTERANGE?: string;
    'CLOSED-CAPTIONS'?: string;
    CODECS?: string;
    DEFAULT?: string;
    FORCED?: string;
    'FRAME-RATE'?: string;
    LANGUAGE?: string;
    NAME?: string;
    'PROGRAM-ID'?: string;
    RESOLUTION?: string;
    SUBTITLES?: string;
    TYPE?: string;
    URI?: string;
}

export declare type LevelControllerConfig = {
    startLevel?: number;
};

export declare class LevelDetails {
    PTSKnown: boolean;
    alignedSliding: boolean;
    averagetargetduration?: number;
    endCC: number;
    endSN: number;
    fragments: Fragment[];
    fragmentHint?: Fragment;
    partList: Part[] | null;
    live: boolean;
    ageHeader: number;
    advancedDateTime?: number;
    updated: boolean;
    advanced: boolean;
    availabilityDelay?: number;
    misses: number;
    needSidxRanges: boolean;
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
    constructor(baseUrl: any);
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

export declare class LevelKey {
    private _uri;
    method: string | null;
    keyFormat: string | null;
    keyFormatVersions: string | null;
    keyID: string | null;
    key: Uint8Array | null;
    iv: Uint8Array | null;
    static fromURL(baseUrl: string, relativeUrl: string): LevelKey;
    static fromURI(uri: string): LevelKey;
    private constructor();
    get uri(): string | null;
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
    level?: number;
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

export declare interface LevelSwitchingData extends Omit<Level, '_urlId'> {
    level: number;
}

export declare interface LevelUpdatedData {
    details: LevelDetails;
    level: number;
}

/**
 * Deprecated; please use BackBufferData
 */
export declare interface LiveBackBufferData extends BackBufferData {
}

export declare interface Loader<T extends LoaderContext> {
    destroy(): void;
    abort(): void;
    load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<T>): void;
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
    context: T;
    stats: LoaderStats;
}

export declare interface LoaderCallbacks<T extends LoaderContext> {
    onSuccess: LoaderOnSuccess<T>;
    onError: LoaderOnError<T>;
    onTimeout: LoaderOnTimeout<T>;
    onAbort?: LoaderOnAbort<T>;
    onProgress?: LoaderOnProgress<T>;
}

export declare interface LoaderConfiguration {
    maxRetry: number;
    timeout: number;
    retryDelay: number;
    maxRetryDelay: number;
    highWaterMark: number;
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
}, context: T, networkDetails: any) => void;

export declare type LoaderOnProgress<T extends LoaderContext> = (stats: LoaderStats, context: T, data: string | ArrayBuffer, networkDetails: any) => void;

export declare type LoaderOnSuccess<T extends LoaderContext> = (response: LoaderResponse, stats: LoaderStats, context: T, networkDetails: any) => void;

export declare type LoaderOnTimeout<T extends LoaderContext> = (stats: LoaderStats, context: T, networkDetails: any) => void;

export declare interface LoaderResponse {
    url: string;
    data: string | ArrayBuffer;
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
    levels: LevelParsed[];
    networkDetails: any;
    sessionData: Record<string, AttrList> | null;
    stats: LoaderStats;
    subtitles?: MediaPlaylist[];
    url: string;
}

export declare interface ManifestLoadingData {
    url: string;
}

export declare interface ManifestParsedData {
    levels: Level[];
    audioTracks: MediaPlaylist[];
    subtitleTracks: MediaPlaylist[];
    firstLevel: number;
    stats: LoaderStats;
    audio: boolean;
    video: boolean;
    altAudio: boolean;
}

export declare interface MediaAttachedData {
    media: HTMLMediaElement;
}

export declare interface MediaAttachingData {
    media: HTMLMediaElement;
}

export declare type MediaKeyFunc = (keySystem: KeySystems, supportedConfigurations: MediaKeySystemConfiguration[]) => Promise<MediaKeySystemAccess>;

export declare interface MediaPlaylist extends LevelParsed {
    autoselect: boolean;
    default: boolean;
    forced: boolean;
    groupId?: string;
    id: number;
    instreamId?: string;
    lang?: string;
    name: string;
    type: MediaPlaylistType | 'main';
}

export declare type MediaPlaylistType = MainPlaylistType | SubtitlePlaylistType;

export declare interface MetadataSample {
    pts: number;
    dts: number;
    len?: number;
    data: Uint8Array;
}

export declare type MP4RemuxerConfig = {
    stretchShortVideoTrack: boolean;
    maxAudioFramesDrift: number;
};

declare interface NetworkComponentAPI extends ComponentAPI {
    startLoad(startPosition: number): void;
    stopLoad(): void;
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

declare class PenState {
    foreground: string;
    underline: boolean;
    italics: boolean;
    background: string;
    flash: boolean;
    constructor(foreground?: string, underline?: boolean, italics?: boolean, background?: string, flash?: boolean);
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

export declare enum PlaylistContextType {
    MANIFEST = "manifest",
    LEVEL = "level",
    AUDIO_TRACK = "audioTrack",
    SUBTITLE_TRACK = "subtitleTrack"
}

export declare enum PlaylistLevelType {
    MAIN = "main",
    AUDIO = "audio",
    SUBTITLE = "subtitle"
}

export declare type PlaylistLoaderConfig = {
    pLoader?: PlaylistLoaderConstructor;
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
    loader?: Loader<PlaylistLoaderContext>;
    type: PlaylistContextType;
    level: number | null;
    id: number | null;
    groupId: string | null;
    isSidxRequest?: boolean;
    levelDetails?: LevelDetails;
    deliveryDirectives: HlsUrlParameters | null;
}

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

/**
 * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
 * @constructor
 */
declare class Row {
    chars: StyledUnicodeChar[];
    pos: number;
    currPenState: PenState;
    cueStartTime?: number;
    logger: CaptionsLogger;
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

export declare type SourceBufferName = 'video' | 'audio' | 'audiovideo';

declare type SourceBuffers = Partial<Record<SourceBufferName, ExtendedSourceBuffer>>;

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
    private stalled;
    private couldBacktrack;
    private audioCodecSwitch;
    private videoBuffer;
    constructor(hls: Hls, fragmentTracker: FragmentTracker);
    private _registerListeners;
    protected _unregisterListeners(): void;
    protected onHandlerDestroying(): void;
    startLoad(startPosition: number): void;
    stopLoad(): void;
    protected doTick(): void;
    protected onTickEnd(): void;
    private doTickIdle;
    protected loadFragment(frag: Fragment, levelDetails: LevelDetails, targetBufferTime: number): void;
    private getAppendedFrag;
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
     * @private
     */
    private seekToStartPos;
    private _getAudioCodec;
    private _loadBitrateTestFrag;
    private _handleTransmuxComplete;
    private _bufferInitSegment;
    private backtrack;
    private checkFragmentChanged;
    get nextLevel(): number;
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
    constructor(uchar?: string, foreground?: string, underline?: boolean, italics?: boolean, background?: string, flash?: boolean);
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

declare class SubtitleStreamController extends BaseStreamController implements NetworkComponentAPI {
    protected levels: Array<Level>;
    private currentTrackId;
    private tracksBuffered;
    private mainDetails;
    constructor(hls: Hls, fragmentTracker: FragmentTracker);
    protected onHandlerDestroying(): void;
    private _registerListeners;
    private _unregisterListeners;
    startLoad(): void;
    onManifestLoading(): void;
    onLevelLoaded(event: Events.LEVEL_LOADED, data: LevelLoadedData): void;
    onSubtitleFragProcessed(event: Events.SUBTITLE_FRAG_PROCESSED, data: SubtitleFragProcessed): void;
    onBufferFlushing(event: Events.BUFFER_FLUSHING, data: BufferFlushingData): void;
    onError(event: Events.ERROR, data: ErrorData): void;
    onSubtitleTracksUpdated(event: Events.SUBTITLE_TRACKS_UPDATED, { subtitleTracks }: SubtitleTracksUpdatedData): void;
    onSubtitleTrackSwitch(event: Events.SUBTITLE_TRACK_SWITCH, data: TrackSwitchedData): void;
    onSubtitleTrackLoaded(event: Events.SUBTITLE_TRACK_LOADED, data: TrackLoadedData): void;
    _handleFragmentLoadComplete(fragLoadedData: FragLoadedData): void;
    doTick(): void;
    protected loadFragment(frag: Fragment, levelDetails: LevelDetails, targetBufferTime: number): void;
    get mediaBufferTimeRanges(): TimeRange[];
}

declare class SubtitleTrackController extends BasePlaylistController {
    private media;
    private tracks;
    private groupId;
    private tracksInGroup;
    private trackId;
    private selectDefaultTrack;
    private queuedDefaultTrack;
    private trackChangeListener;
    private asyncPollTrackChange;
    private useTextTrackPolling;
    private subtitlePollingInterval;
    subtitleDisplay: boolean;
    constructor(hls: Hls);
    destroy(): void;
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
    protected onError(event: Events.ERROR, data: ErrorData): void;
    /** get alternate subtitle tracks list from playlist **/
    get subtitleTracks(): MediaPlaylist[];
    /** get/set index of the selected subtitle track (based on index in subtitle track lists) **/
    get subtitleTrack(): number;
    set subtitleTrack(newId: number);
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
    /**
     * @returns {boolean}
     */
    hasInterval(): boolean;
    /**
     * @returns {boolean}
     */
    hasNextTick(): boolean;
    /**
     * @param {number} millis Interval time (ms)
     * @returns {boolean} True when interval has been scheduled, false when already scheduled (no effect)
     */
    setInterval(millis: number): boolean;
    /**
     * @returns {boolean} True when interval was cleared, false when none was set (no effect)
     */
    clearInterval(): boolean;
    /**
     * @returns {boolean} True when timeout was cleared, false when none was set (no effect)
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

declare class TimelineController implements ComponentAPI {
    private hls;
    private media;
    private config;
    private enabled;
    private Cues;
    private textTracks;
    private tracks;
    private initPTS;
    private timescale;
    private unparsedVttFrags;
    private captionsTracks;
    private nonNativeCaptionsTracks;
    private cea608Parser1;
    private cea608Parser2;
    private lastSn;
    private prevCC;
    private vttCCs;
    private captionsProperties;
    constructor(hls: Hls);
    destroy(): void;
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
    enableCEA708Captions: boolean;
    enableWebVTT: boolean;
    enableIMSC1: boolean;
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

declare interface TimeRange {
    start: number;
    end: number;
}

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
    private hls;
    private id;
    private observer;
    private frag;
    private part;
    private worker;
    private onwmsg?;
    private transmuxer;
    private onTransmuxComplete;
    private onFlush;
    constructor(hls: Hls, id: PlaylistLevelType, onTransmuxComplete: (transmuxResult: TransmuxerResult) => void, onFlush: (chunkMeta: ChunkMetadata) => void);
    destroy(): void;
    push(data: ArrayBuffer, initSegmentData: Uint8Array | undefined, audioCodec: string | undefined, videoCodec: string | undefined, frag: Fragment, part: Part | null, duration: number, accurateTimeOffset: boolean, chunkMeta: ChunkMetadata, defaultInitPTS?: number): void;
    flush(chunkMeta: ChunkMetadata): void;
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

export declare interface UserdataSample {
    pts: number;
    bytes: Uint8Array;
}

declare enum VerboseLevel {
    ERROR = 0,
    TEXT = 1,
    WARNING = 2,
    INFO = 2,
    DEBUG = 3,
    DATA = 3
}

export { }
