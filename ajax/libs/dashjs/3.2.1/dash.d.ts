export = dashjs;
export as namespace dashjs;

declare namespace dashjs {
    interface Logger {
        debug(...params: any[]): void;
        info(...params: any[]): void;
        warn(...params: any[]): void;
        error(...params: any[]): void;
        fatal(...params: any[]): void;
    }

    const enum LogLevel {
        LOG_LEVEL_NONE = 0,
        LOG_LEVEL_FATAL = 1,
        LOG_LEVEL_ERROR = 2,
        LOG_LEVEL_WARNING = 3,
        LOG_LEVEL_INFO = 4,
        LOG_LEVEL_DEBUG = 5
    }

    interface Debug {
        getLogger(): Logger;
        setLogTimestampVisible(flag: boolean): void;
        setCalleeNameVisible(flag: boolean): void;
    }

    interface VideoModel { }

    interface ProtectionController {
        initializeForMedia(mediaInfo: ProtectionMediaInfo): void;
        createKeySession(initData: ArrayBuffer, cdmData: Uint8Array): void;
        removeKeySession(session: SessionToken): void;
        closeKeySession(session: SessionToken): void;
        setServerCertificate(serverCertificate: ArrayBuffer): void;
        setMediaElement(element: HTMLMediaElement): void;
        setSessionType(type: string): void;
        setRobustnessLevel(level: string): void;
        setProtectionData(protDataSet: ProtectionDataSet): void;
        getSupportedKeySystemsFromContentProtection(cps: any[]): SupportedKeySystem[];
        getKeySystems(): KeySystem[];
        setKeySystems(keySystems: KeySystem[]): void;
        stop(): void;
        reset(): void;
    }

    export interface OfflineRecord {
        id: string;
        progress: number;
        url: string;
        originalUrl: string;
        status: string;
    }

    interface OfflineController {
        loadRecordsFromStorage(): Promise<void>;
        getAllRecords(): OfflineRecord[];
        createRecord(manifestURL: string): Promise<string>;
        startRecord(id: string, mediaInfos: MediaInfo[]): void;
        stopRecord(id: string): void;
        resumeRecord(id: string): void;
        deleteRecord(id: string): void;
        getRecordProgression(id: string): number;
        resetRecords(): void;
        reset(): void;
    }

    export interface Bitrate {
        id?: string;
        width?: number;
        height?: number;
        bandwidth?: number;
        scanType?: string;
    }

    export type MediaType = 'video' | 'audio' | 'text' | 'fragmentedText' | 'embeddedText' | 'image';

    export class MediaInfo {
        id: string | null;
        index: number | null;
        type: MediaType | null;
        streamInfo: StreamInfo | null;
        representationCount: number;
        labels: string[];
        lang: string | null;
        viewpoint: any | undefined | null;
        accessibility: any[] | null;
        audioChannelConfiguration: any[] | null;
        roles: string[] | null;
        codec: string | null;
        mimeType: string | null;
        contentProtection: any | null;
        isText: boolean;
        KID: any | null;
        bitrateList: Bitrate[];
    }

    export class ProtectionMediaInfo {
        codec: string | null;
        contentProtection: any | null;
    }

    export class MediaPlayerSettingClass {
        debug?: {
            logLevel?: LogLevel;
            dispatchEvent?: boolean;
        };
        streaming?: {
            metricsMaxListDepth?: number;
            abandonLoadTimeout?: number;
            liveDelayFragmentCount?: number;
            liveDelay?: number;
            scheduleWhilePaused?: boolean;
            fastSwitchEnabled?: boolean;
            flushBufferAtTrackSwitch?: boolean;
            reuseExistingSourceBuffers?: boolean;
            calcSegmentAvailabilityRangeFromTimeline?: boolean,
            bufferPruningInterval?: number;
            bufferToKeep?: number;
            jumpGaps?: boolean;
            jumpLargeGaps?: boolean;
            smallGapLimit?: number;
            stableBufferTime?: number;
            bufferTimeAtTopQuality?: number;
            bufferTimeAtTopQualityLongForm?: number;
            longFormContentDurationThreshold?: number;
            wallclockTimeUpdateInterval?: number;
            lowLatencyEnabled?: boolean;
            keepProtectionMediaKeys?: boolean;
            useManifestDateHeaderTimeSource?: boolean;
            useSuggestedPresentationDelay?: boolean;
            useAppendWindow?: boolean,
            manifestUpdateRetryInterval?: number;
            stallThreshold?: number;
            filterUnsupportedEssentialProperties?: true
            utcSynchronization?: {
                backgroundAttempts?: number,
                timeBetweenSyncAttempts?: number,
                maximumTimeBetweenSyncAttempts?: number,
                minimumTimeBetweenSyncAttempts?: number,
                timeBetweenSyncAttemptsAdjustmentFactor?: number,
                maximumAllowedDrift?: number,
                enableBackgroundSyncAfterSegmentDownloadError?: boolean,
                defaultTimingSource?: {
                    scheme?: string,
                    value?: string
                }
            },
            liveCatchup?: {
                minDrift?: number;
                maxDrift?: number;
                playbackRate?: number;
                latencyThreshold?: number,
                playbackBufferMin?: number,
                enabled?: boolean
                mode?: string
            }
            lastBitrateCachingInfo?: {
                enabled?: boolean;
                ttl?: number;
            };
            lastMediaSettingsCachingInfo?: {
                enabled?: boolean;
                ttl?: number;
            };
            cacheLoadThresholds?: {
                video?: number;
                audio?: number;
            };
            trackSwitchMode?: {
                video?: TrackSwitchMode;
                audio?: TrackSwitchMode;
            }
            selectionModeForInitialTrack?: TrackSelectionMode
            fragmentRequestTimeout?: number;
            retryIntervals?: {
                'MPD'?:                       number;
                'XLinkExpansion'?:            number;
                'MediaSegment'?:              number;
                'InitializationSegment'?:     number;
                'BitstreamSwitchingSegment'?: number;
                'IndexSegment'?:              number;
                'other'?:                     number;
                'lowLatencyReductionFactor'?:  number;
            };
            retryAttempts?: {
                'MPD'?:                       number;
                'XLinkExpansion'?:            number;
                'MediaSegment'?:              number;
                'InitializationSegment'?:     number;
                'BitstreamSwitchingSegment'?: number;
                'IndexSegment'?:              number;
                'other'?:                     number;
                'lowLatencyMultiplyFactor'?:  number;
            };
            abr?: {
                movingAverageMethod?: 'slidingWindow' | 'ewma';
                ABRStrategy?: 'abrDynamic' | 'abrBola' | 'abrL2A' | 'abrLoLP' | 'abrThroughput';
                bandwidthSafetyFactor?: number;
                useDefaultABRRules?: boolean;
                useDeadTimeLatency?: boolean;
                limitBitrateByPortal?: boolean;
                usePixelRatioInLimitBitrateByPortal?: boolean;
                maxBitrate?: {
                    audio?: number;
                    video?: number;
                };
                minBitrate?: {
                    audio?: number;
                    video?: number;
                };
                maxRepresentationRatio?: {
                    audio?: number;
                    video?: number;
                };
                initialBitrate?: {
                    audio?: number;
                    video?: number;
                };
                initialRepresentationRatio?: {
                    audio?: number;
                    video?: number;
                };
                autoSwitchBitrate?: {
                    audio?: boolean;
                    video?: boolean;
                },
                fetchThroughputCalculationMode?: string;
            },
            cmcd?: {
                enabled?: boolean,
                sid?: string,
                cid?: string,
                rtp?: number,
                rtpSafetyFactor?: number
            }
        }
    }

    export interface MediaPlayerClass {
        initialize(view?: HTMLElement, source?: string, autoPlay?: boolean): void;
        on(type: AstInFutureEvent['type'], listener: (e: AstInFutureEvent) => void, scope?: object): void;
        on(type: BufferEvent['type'], listener: (e: BufferEvent) => void, scope?: object): void;
        on(type: CaptionRenderedEvent['type'], listener: (e: CaptionRenderedEvent) => void, scope?: object): void;
        on(type: CaptionContainerResizeEvent['type'], listener: (e: CaptionContainerResizeEvent) => void, scope?: object): void;
        on(type: DynamicToStaticEvent['type'], listener: (e: DynamicToStaticEvent) => void, scope?: object): void;
        on(type: ErrorEvent['type'], listener: (e: ErrorEvent) => void, scope?: object): void;
        on(type: FragmentLoadingCompletedEvent['type'], listener: (e: FragmentLoadingCompletedEvent) => void, scope?: object): void;
        on(type: FragmentLoadingAbandonedEvent['type'], listener: (e: FragmentLoadingAbandonedEvent) => void, scope?: object): void;
        on(type: KeyErrorEvent['type'], listener: (e: KeyErrorEvent) => void, scope?: object): void;
        on(type: KeyMessageEvent['type'], listener: (e: KeyMessageEvent) => void, scope?: object): void;
        on(type: KeySessionClosedEvent['type'], listener: (e: KeySessionClosedEvent) => void, scope?: object): void;
        on(type: KeySessionEvent['type'], listener: (e: KeySessionEvent) => void, scope?: object): void;
        on(type: KeyStatusesChangedEvent['type'], listener: (e: KeyStatusesChangedEvent) => void, scope?: object): void;
        on(type: KeySystemSelectedEvent['type'], listener: (e: KeySystemSelectedEvent) => void, scope?: object): void;
        on(type: LicenseRequestCompleteEvent['type'], listener: (e: LicenseRequestCompleteEvent) => void, scope?: object): void;
        on(type: LogEvent['type'], listener: (e: LogEvent) => void, scope?: object): void;
        on(type: ManifestLoadedEvent['type'], listener: (e: ManifestLoadedEvent) => void, scope?: object): void;
        on(type: MetricEvent['type'], listener: (e: MetricEvent) => void, scope?: object): void;
        on(type: MetricChangedEvent['type'], listener: (e: MetricChangedEvent) => void, scope?: object): void;
        on(type: OfflineRecordEvent['type'], listener: (e: OfflineRecordEvent) => void, scope?: object): void;
        on(type: OfflineRecordLoademetadataEvent['type'], listener: (e: OfflineRecordLoademetadataEvent) => void, scope?: object): void;
        on(type: PeriodSwitchEvent['type'], listener: (e: PeriodSwitchEvent) => void, scope?: object): void;
        on(type: PlaybackErrorEvent['type'], listener: (e: PlaybackErrorEvent) => void, scope?: object): void;
        on(type: PlaybackPausedEvent['type'], listener: (e: PlaybackPausedEvent) => void, scope?: object): void;
        on(type: PlaybackPlayingEvent['type'], listener: (e: PlaybackPlayingEvent) => void, scope?: object): void;
        on(type: PlaybackRateChangedEvent['type'], listener: (e: PlaybackRateChangedEvent) => void, scope?: object): void;
        on(type: PlaybackSeekingEvent['type'], listener: (e: PlaybackSeekingEvent) => void, scope?: object): void;
        on(type: PlaybackStartedEvent['type'], listener: (e: PlaybackStartedEvent) => void, scope?: object): void;
        on(type: PlaybackTimeUpdatedEvent['type'], listener: (e: PlaybackTimeUpdatedEvent) => void, scope?: object): void;
        on(type: ProtectionCreatedEvent['type'], listener: (e: ProtectionCreatedEvent) => void, scope?: object): void;
        on(type: ProtectionDestroyedEvent['type'], listener: (e: ProtectionDestroyedEvent) => void, scope?: object): void;
        on(type: QualityChangeRenderedEvent['type'], listener: (e: QualityChangeRenderedEvent) => void, scope?: object): void;
        on(type: QualityChangeRequestedEvent['type'], listener: (e: QualityChangeRequestedEvent) => void, scope?: object): void;
        on(type: StreamInitializedEvent['type'], listener: (e: StreamInitializedEvent) => void, scope?: object): void;
        on(type: TextTracksAddedEvent['type'], listener: (e: TextTracksAddedEvent) => void, scope?: object): void;
        on(type: TtmlParsedEvent['type'], listener: (e: TtmlParsedEvent) => void, scope?: object): void;
        on(type: TtmlToParseEvent['type'], listener: (e: TtmlToParseEvent) => void, scope?: object): void;
        on(type: string, listener: (e: Event) => void, scope?: object): void;
        off(type: string, listener: (e: any) => void, scope?: object): void;
        extend(parentNameString: string, childInstance: object, override: boolean): void;
        attachView(element: HTMLElement): void;
        attachSource(urlOrManifest: string | object): void;
        isReady(): boolean;
        play(): void;
        isPaused(): boolean;
        pause(): void;
        isSeeking(): boolean;
        isDynamic(): boolean;
        seek(value: number): void;
        setPlaybackRate(value:number): void;
        getPlaybackRate(): number;
        setMute(value: boolean): void;
        isMuted(): boolean;
        setVolume(value: number): void;
        getVolume(): number;
        time(streamId?: string): number;
        duration(): number;
        timeAsUTC(): number;
        durationAsUTC(): number;
        getActiveStream(): Stream | null;
        getDVRWindowSize(): number;
        getDVRSeekOffset(value: number): number;
        convertToTimeCode(value: number): string;
        formatUTC(time: number, locales: string, hour12: boolean, withDate?: boolean): string;
        getVersion(): string;
        getDebug(): Debug;
        getBufferLength(type: MediaType): number;
        getVideoModel(): VideoModel;
        getTTMLRenderingDiv(): HTMLDivElement | null;
        getVideoElement(): HTMLVideoElement;
        getSource(): string | object;
        getTopBitrateInfoFor(type: MediaType): BitrateInfo;
        setAutoPlay(value: boolean): void;
        getAutoPlay(): boolean;
        getDashMetrics(): DashMetrics;
        getDashAdapter(): DashAdapter;
        getQualityFor(type: MediaType): number;
        setQualityFor(type: MediaType, value: number): void;
        updatePortalSize(): void;
        enableText(enable: boolean): void;
        setTextTrack(idx: number): void;
        getTextDefaultLanguage(): string | undefined;
        setTextDefaultLanguage(lang: string): void;
        getTextDefaultEnabled(): boolean | undefined;
        setTextDefaultEnabled(enable: boolean): void;
        provideThumbnail(time: number, callback: (thumbnail: Thumbnail | null) => void): void;
        getBitrateInfoListFor(type: MediaType): BitrateInfo[];
        getStreamsFromManifest(manifest: object): StreamInfo[];
        getTracksFor(type: MediaType): MediaInfo[];
        getTracksForTypeFromManifest(type: MediaType, manifest: object, streamInfo: StreamInfo): MediaInfo[];
        getCurrentTrackFor(type: MediaType): MediaInfo | null;
        setInitialMediaSettingsFor(type: MediaType, value: MediaSettings): void;
        getInitialMediaSettingsFor(type: MediaType): MediaSettings;
        setCurrentTrack(track: MediaInfo): void;
        getTrackSwitchModeFor(type: MediaType): TrackSwitchMode;
        setTrackSwitchModeFor(type: MediaType, mode: TrackSwitchMode): void;
        setSelectionModeForInitialTrack(mode: TrackSelectionMode): void;
        getSelectionModeForInitialTrack(): TrackSelectionMode;
        retrieveManifest(url: string, callback: (manifest: object | null, error: any) => void): void;
        addUTCTimingSource(schemeIdUri: string, value: string): void;
        removeUTCTimingSource(schemeIdUri: string, value: string): void;
        clearDefaultUTCTimingSources(): void;
        restoreDefaultUTCTimingSources(): void;
        setXHRWithCredentialsForType(type: string, value: boolean): void;
        getXHRWithCredentialsForType(type: string): boolean;
        getProtectionController(): ProtectionController;
        attachProtectionController(value: ProtectionController): void;
        setProtectionData(value: ProtectionDataSet): void;
        registerLicenseRequestFilter(filter: RequestFilter),
        registerLicenseResponseFilter(filter: ResponseFilter),
        unregisterLicenseRequestFilter(filter: RequestFilter),
        unregisterLicenseResponseFilter(filter: ResponseFilter),
        getOfflineController(): OfflineController;
        enableManifestDateHeaderTimeSource(value: boolean): void;
        displayCaptionsOnTop(value: boolean): void;
        attachTTMLRenderingDiv(div: HTMLDivElement): void;
        getCurrentTextTrackIndex(): number;
        preload(): void;
        reset(): void;
        addABRCustomRule(type: string, rulename: string, rule: object): void;
        removeABRCustomRule(rulename: string): void;
        removeAllABRCustomRule(): void;
        getCurrentLiveLatency(): number;
        enableForcedTextStreaming(value: boolean): void;
        isTextEnabled(): boolean;
        getAverageThroughput(value: number): void;
        getSettings(): MediaPlayerSettingClass;
        updateSettings(settings: MediaPlayerSettingClass): void;
        resetSettings(): void;
    }

    export interface MediaPlayerFactory {
        create(): MediaPlayerClass;
    }

    export function MediaPlayer(): MediaPlayerFactory;

    export namespace MediaPlayer {
        export const events: MediaPlayerEvents;
        export const errors: MediaPlayerErrors;
    }

    interface MediaPlayerErrors {
        MANIFEST_LOADER_PARSING_FAILURE_ERROR_CODE:          10;
        MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE:          11;
        XLINK_LOADER_LOADING_FAILURE_ERROR_CODE:             12;
        SEGMENTS_UPDATE_FAILED_ERROR_CODE:                   13;
        SEGMENTS_UNAVAILABLE_ERROR_CODE:                     14;
        SEGMENT_BASE_LOADER_ERROR_CODE:                      15;
        TIME_SYNC_FAILED_ERROR_CODE:                         16;
        FRAGMENT_LOADER_LOADING_FAILURE_ERROR_CODE:          17;
        FRAGMENT_LOADER_NULL_REQUEST_ERROR_CODE:             18;
        URL_RESOLUTION_FAILED_GENERIC_ERROR_CODE:            19;
        APPEND_ERROR_CODE:                                   20;
        REMOVE_ERROR_CODE:                                   21;
        DATA_UPDATE_FAILED_ERROR_CODE:                       22;
        CAPABILITY_MEDIASOURCE_ERROR_CODE:                   23;
        CAPABILITY_MEDIAKEYS_ERROR_CODE:                     24;
        DOWNLOAD_ERROR_ID_MANIFEST_CODE:                     25;
        DOWNLOAD_ERROR_ID_CONTENT_CODE:                      27;
        DOWNLOAD_ERROR_ID_INITIALIZATION_CODE:               28;
        DOWNLOAD_ERROR_ID_XLINK_CODE:                        29;
        MANIFEST_ERROR_ID_PARSE_CODE:                        31;
        MANIFEST_ERROR_ID_NOSTREAMS_CODE:                    32;
        TIMED_TEXT_ERROR_ID_PARSE_CODE:                      33;
        MANIFEST_ERROR_ID_MULTIPLEXED_CODE:                  34;
        MEDIASOURCE_TYPE_UNSUPPORTED_CODE:                   35;
        MEDIA_KEYERR_CODE:                                  100;
        MEDIA_KEYERR_UNKNOWN_CODE:                          101;
        MEDIA_KEYERR_CLIENT_CODE:                           102;
        MEDIA_KEYERR_SERVICE_CODE:                          103;
        MEDIA_KEYERR_OUTPUT_CODE:                           104;
        MEDIA_KEYERR_HARDWARECHANGE_CODE:                   105;
        MEDIA_KEYERR_DOMAIN_CODE:                           106;
        MEDIA_KEY_MESSAGE_ERROR_CODE:                       107;
        MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE:          108;
        SERVER_CERTIFICATE_UPDATED_ERROR_CODE:              109;
        KEY_STATUS_CHANGED_EXPIRED_ERROR_CODE:              110;
        MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE: 111;
        KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE:                112;
        KEY_SESSION_CREATED_ERROR_CODE:                     113;
        MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE:              114;
        // MSS errors
        MSS_NO_TFRF_CODE:                                   200;
        MSS_UNSUPPORTED_CODEC_CODE:                         201;
        // Offline errors
        OFFLINE_ERROR:                                      11000;
        INDEXEDDB_QUOTA_EXCEED_ERROR:                       11001;
        INDEXEDDB_INVALID_STATE_ERROR:                      11002;
        INDEXEDDB_NOT_READABLE_ERROR:                       11003;
        INDEXEDDB_NOT_FOUND_ERROR:                          11004;
        INDEXEDDB_NETWORK_ERROR:                            11005;
        INDEXEDDB_DATA_ERROR:                               11006;
        INDEXEDDB_TRANSACTION_INACTIVE_ERROR:               11007;
        INDEXEDDB_NOT_ALLOWED_ERROR:                        11008;
        INDEXEDDB_NOT_SUPPORTED_ERROR:                      11009;
        INDEXEDDB_VERSION_ERROR:                            11010;
        INDEXEDDB_TIMEOUT_ERROR:                            11011;
        INDEXEDDB_ABORT_ERROR:                              11012;
        INDEXEDDB_UNKNOWN_ERROR:                            11013;
    }

    interface MediaPlayerEvents {
        AST_IN_FUTURE: 'astInFuture';
        BUFFER_EMPTY: 'bufferStalled';
        BUFFER_LEVEL_STATE_CHANGED: 'bufferStateChanged';
        BUFFER_LOADED: 'bufferLoaded';
        CAN_PLAY: 'canPlay';
        CAPTION_RENDERED: 'captionRendered';
        CAPTION_CONTAINER_RESIZE: 'captionContainerResize';
        CONFORMANCE_VIOLATION: 'conformanceViolation'
        DYNAMIC_TO_STATIC: 'dynamicToStatic';
        ERROR: 'error';
        FRAGMENT_LOADING_ABANDONED: 'fragmentLoadingAbandoned';
        FRAGMENT_LOADING_COMPLETED: 'fragmentLoadingCompleted';
        FRAGMENT_LOADING_STARTED: 'fragmentLoadingStarted';
        KEY_ADDED: 'public_keyAdded';
        KEY_ERROR: 'public_keyError';
        KEY_MESSAGE: 'public_keyMessage';
        KEY_SESSION_CLOSED: 'public_keySessionClosed';
        KEY_SESSION_CREATED: 'public_keySessionCreated';
        KEY_SESSION_REMOVED: 'public_keySessionRemoved';
        KEY_STATUSES_CHANGED: 'public_keyStatusesChanged';
        KEY_SYSTEM_SELECTED: 'public_keySystemSelected';
        LICENSE_REQUEST_COMPLETE: 'public_licenseRequestComplete';
        LOG: 'log';
        MANIFEST_LOADED: 'manifestLoaded';
        METRICS_CHANGED: 'metricsChanged';
        METRIC_ADDED: 'metricAdded';
        METRIC_CHANGED: 'metricChanged';
        METRIC_UPDATED: 'metricUpdated';
        OFFLINE_RECORD_FINISHED: 'public_offlineRecordFinished';
        OFFLINE_RECORD_LOADEDMETADATA: 'public_offlineRecordLoadedmetadata';
        OFFLINE_RECORD_STARTED: 'public_offlineRecordStarted';
        OFFLINE_RECORD_STOPPED: 'public_offlineRecordStopped';
        PERIOD_SWITCH_COMPLETED: 'periodSwitchCompleted';
        PERIOD_SWITCH_STARTED: 'periodSwitchStarted';
        PLAYBACK_ENDED: 'playbackEnded';
        PLAYBACK_ERROR: 'playbackError';
        PLAYBACK_METADATA_LOADED: 'playbackMetaDataLoaded';
        PLAYBACK_NOT_ALLOWED: 'playbackNotAllowed';
        PLAYBACK_PAUSED: 'playbackPaused';
        PLAYBACK_PLAYING: 'playbackPlaying';
        PLAYBACK_PROGRESS: 'playbackProgress';
        PLAYBACK_RATE_CHANGED: 'playbackRateChanged';
        PLAYBACK_SEEKED: 'playbackSeeked';
        PLAYBACK_SEEKING: 'playbackSeeking';
        PLAYBACK_STALLED: 'playbackStalled';
        PLAYBACK_STARTED: 'playbackStarted';
        PLAYBACK_TIME_UPDATED: 'playbackTimeUpdated';
        PLAYBACK_WAITING: 'playbackWaiting';
        PROTECTION_CREATED: 'public_protectioncreated';
        PROTECTION_DESTROYED: 'public_protectiondestroyed';
        TRACK_CHANGE_RENDERED: 'trackChangeRendered';
        QUALITY_CHANGE_RENDERED: 'qualityChangeRendered';
        QUALITY_CHANGE_REQUESTED: 'qualityChangeRequested';
        STREAM_INITIALIZED: 'streamInitialized';
        TEXT_TRACKS_ADDED: 'allTextTracksAdded';
        TEXT_TRACK_ADDED: 'textTrackAdded';
        TTML_PARSED: 'ttmlParsed';
        TTML_TO_PARSE: 'ttmlToParse';
    }

    export interface Event {
        type: string;
    }

    export interface AstInFutureEvent extends Event {
        type: MediaPlayerEvents['AST_IN_FUTURE'];
        delay: number;
    }

    export interface BufferEvent extends Event {
        type: MediaPlayerEvents['BUFFER_EMPTY' | 'BUFFER_LOADED'];
        mediaType: MediaType;
    }

    export interface BufferStateChangedEvent extends Event {
        type: MediaPlayerEvents['BUFFER_LEVEL_STATE_CHANGED'];
        mediaType: MediaType;
        sender: object;
        state: 'bufferStalled' | 'bufferLoaded';
        streamInfo: StreamInfo;
    }

    export interface GenericErrorEvent extends Event {
        type: MediaPlayerEvents['ERROR'];
        error: 'capability' | 'mediasource' | 'key_session' | 'key_message';
        event: string;
    }

    export interface DownloadErrorEvent extends Event {
        type: MediaPlayerEvents['ERROR'];
        error: 'download';
        event: {
            id: string;
            url: string;
            request: XMLHttpRequest;
        };
    }

    export interface ManifestErrorEvent extends Event {
        type: MediaPlayerEvents['ERROR'];
        error: 'manifestError';
        event: {
            id: string;
            message: string;
            manifest?: object;
            event?: string;
        };
    }

    export interface TimedTextErrorEvent extends Event {
        type: MediaPlayerEvents['ERROR'];
        error: 'cc';
        event: {
            id: string;
            message: string;
            cc: string;
        };
    }

    export interface MediaPlayerErrorEvent extends Event {
        type: MediaPlayerEvents['ERROR'];
        error: {
            code: MediaPlayerErrors['MANIFEST_LOADER_PARSING_FAILURE_ERROR_CODE'] |
                  MediaPlayerErrors['MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE'] |
                  MediaPlayerErrors['XLINK_LOADER_LOADING_FAILURE_ERROR_CODE'] |
                  MediaPlayerErrors['SEGMENTS_UPDATE_FAILED_ERROR_CODE'] |
                  MediaPlayerErrors['SEGMENTS_UNAVAILABLE_ERROR_CODE'] |
                  MediaPlayerErrors['SEGMENT_BASE_LOADER_ERROR_CODE'] |
                  MediaPlayerErrors['TIME_SYNC_FAILED_ERROR_CODE'] |
                  MediaPlayerErrors['FRAGMENT_LOADER_LOADING_FAILURE_ERROR_CODE'] |
                  MediaPlayerErrors['FRAGMENT_LOADER_NULL_REQUEST_ERROR_CODE'] |
                  MediaPlayerErrors['URL_RESOLUTION_FAILED_GENERIC_ERROR_CODE'] |
                  MediaPlayerErrors['APPEND_ERROR_CODE'] |
                  MediaPlayerErrors['REMOVE_ERROR_CODE'] |
                  MediaPlayerErrors['DATA_UPDATE_FAILED_ERROR_CODE'] |
                  MediaPlayerErrors['CAPABILITY_MEDIASOURCE_ERROR_CODE'] |
                  MediaPlayerErrors['CAPABILITY_MEDIAKEYS_ERROR_CODE'] |
                  MediaPlayerErrors['DOWNLOAD_ERROR_ID_MANIFEST_CODE'] |
                  MediaPlayerErrors['DOWNLOAD_ERROR_ID_CONTENT_CODE'] |
                  MediaPlayerErrors['DOWNLOAD_ERROR_ID_INITIALIZATION_CODE'] |
                  MediaPlayerErrors['DOWNLOAD_ERROR_ID_XLINK_CODE'] |
                  MediaPlayerErrors['MANIFEST_ERROR_ID_PARSE_CODE'] |
                  MediaPlayerErrors['MANIFEST_ERROR_ID_NOSTREAMS_CODE'] |
                  MediaPlayerErrors['TIMED_TEXT_ERROR_ID_PARSE_CODE'] |
                  MediaPlayerErrors['MANIFEST_ERROR_ID_MULTIPLEXED_CODE'] |
                  MediaPlayerErrors['MEDIASOURCE_TYPE_UNSUPPORTED_CODE'] |
                  // Protection errors
                  MediaPlayerErrors['MEDIA_KEYERR_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_UNKNOWN_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_CLIENT_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_SERVICE_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_OUTPUT_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_HARDWARECHANGE_CODE'] |
                  MediaPlayerErrors['MEDIA_KEYERR_DOMAIN_CODE'] |
                  MediaPlayerErrors['MEDIA_KEY_MESSAGE_ERROR_CODE'] |
                  MediaPlayerErrors['MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE'] |
                  MediaPlayerErrors['SERVER_CERTIFICATE_UPDATED_ERROR_CODE'] |
                  MediaPlayerErrors['KEY_STATUS_CHANGED_EXPIRED_ERROR_CODE'] |
                  MediaPlayerErrors['MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE'] |
                  MediaPlayerErrors['KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE'] |
                  MediaPlayerErrors['KEY_SESSION_CREATED_ERROR_CODE'] |
                  MediaPlayerErrors['MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE'] |
                  // Offline errors
                  MediaPlayerErrors['OFFLINE_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_QUOTA_EXCEED_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_INVALID_STATE_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_NOT_READABLE_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_NOT_FOUND_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_NETWORK_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_DATA_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_TRANSACTION_INACTIVE_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_NOT_ALLOWED_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_NOT_SUPPORTED_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_VERSION_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_TIMEOUT_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_ABORT_ERROR'] |
                  MediaPlayerErrors['INDEXEDDB_UNKNOWN_ERROR'] |
                  // MSS errors
                  MediaPlayerErrors['MSS_NO_TFRF_CODE'] |
                  MediaPlayerErrors['MSS_UNSUPPORTED_CODEC_CODE'],
            message: string,
            data: object,
        }
    }

    export type ErrorEvent = GenericErrorEvent | DownloadErrorEvent | ManifestErrorEvent | TimedTextErrorEvent | MediaPlayerErrorEvent;

    export interface CaptionRenderedEvent extends Event {
        type: MediaPlayerEvents['CAPTION_RENDERED'];
        captionDiv: HTMLDivElement;
        currentTrackIdx: number;
    }

    export interface CaptionContainerResizeEvent extends Event {
        type: MediaPlayerEvents['CAPTION_CONTAINER_RESIZE'];
    }

    export interface DynamicToStaticEvent extends Event {
        type: MediaPlayerEvents['DYNAMIC_TO_STATIC'];
    }    
    export interface FragmentLoadingCompletedEvent extends Event {
        type: MediaPlayerEvents['FRAGMENT_LOADING_COMPLETED'];
        request: FragmentRequest;
        response: ArrayBuffer;
        sender: object;
    }

    export interface FragmentLoadingAbandonedEvent extends Event {
        type: MediaPlayerEvents['FRAGMENT_LOADING_ABANDONED'];
        streamProcessor: object;
        request: object;
        mediaType: MediaType;
    }

    export class KeyError {
        constructor(sessionToken: SessionToken, errorString: string);
        sessionToken: SessionToken;
        error: string;
    }

    export interface KeyErrorEvent extends Event {
        type: MediaPlayerEvents['KEY_ERROR'];
        data: KeyError;
    }

    export class KeyMessage {
        constructor(sessionToken: SessionToken, message: ArrayBuffer, defaultURL: string, messageType?: string);
        sessionToken: SessionToken;
        message: ArrayBuffer;
        defaultURL: string;
        messageType: string;
    }

    export interface KeyMessageEvent extends Event {
        type: MediaPlayerEvents['KEY_MESSAGE'];
        data: KeyMessage;
    }

    export interface KeySessionClosedEvent extends Event {
        type: MediaPlayerEvents['KEY_SESSION_CLOSED' | 'KEY_SESSION_REMOVED'];
        data: string | null;
        error?: string;
    }

    export interface KeySessionEvent extends Event {
        type: MediaPlayerEvents['KEY_SESSION_CREATED'];
        data: SessionToken | null;
        error?: string;
    }

    export interface KeyStatusesChangedEvent extends Event {
        type: MediaPlayerEvents['KEY_STATUSES_CHANGED'];
        data: SessionToken;
    }

    export interface KeySystemSelectedEvent extends Event {
        type: MediaPlayerEvents['KEY_SYSTEM_SELECTED'];
        data: object | null;
        error?: string;
    }

    export interface LicenseRequestCompleteEvent extends Event {
        type: MediaPlayerEvents['LICENSE_REQUEST_COMPLETE'];
        data: {
            sessionToken: SessionToken;
            messageType: string;
        };
        error?: string;
    }

    export interface LogEvent extends Event {
        type: MediaPlayerEvents['LOG'];
        message: string;
    }

    export interface ManifestLoadedEvent extends Event {
        type: MediaPlayerEvents['MANIFEST_LOADED'];
        data: object;
    }

    export interface MetricEvent extends Event {
        type: MediaPlayerEvents['METRIC_ADDED' | 'METRIC_UPDATED'];
        mediaType: MediaType;
        metric: MetricType;
        value: object;
    }

    export interface MetricChangedEvent extends Event {
        type: MediaPlayerEvents['METRIC_CHANGED'];
        mediaType: MediaType;
    }

    export interface OfflineRecordEvent extends Event {
        type: MediaPlayerEvents['OFFLINE_RECORD_FINISHED' | 'OFFLINE_RECORD_STARTED' | 'OFFLINE_RECORD_STOPPED' | 'OFFLINE_RECORD_STOPPED'];
        id: string;
    }

    export interface OfflineRecordLoademetadataEvent extends Event {
        type: MediaPlayerEvents['OFFLINE_RECORD_LOADEDMETADATA'];
        madiaInfos: MediaInfo[];
    }

    export interface PeriodSwitchEvent extends Event {
        type: MediaPlayerEvents['PERIOD_SWITCH_COMPLETED' | 'PERIOD_SWITCH_STARTED'];
        toStreamInfo: StreamInfo | null;
        fromStreamInfo?: StreamInfo | null;
    }

    export interface PlaybackErrorEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_ERROR'];
        error: string;
    }

    export interface PlaybackPausedEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_PAUSED'];
        ended: boolean | null;
    }

    export interface PlaybackPlayingEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_PLAYING'];
        playingTime: number | null;
    }

    export interface PlaybackRateChangedEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_RATE_CHANGED'];
        playbackRate: number | null;
    }

    export interface PlaybackSeekingEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_SEEKING'];
        seekTime: number | null;
    }

    export interface PlaybackStartedEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_STARTED'];
        startTime: number | null;
    }

    export interface PlaybackTimeUpdatedEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_TIME_UPDATED'];
        time: number | null;
        timeToEnd: number;
    }

    export interface PlaybackWaitingEvent extends Event {
        type: MediaPlayerEvents['PLAYBACK_WAITING'];
        playingTime: number | null;
    }

    export interface ProtectionCreatedEvent extends Event {
        type: MediaPlayerEvents['PROTECTION_CREATED'];
        controller: object;
        manifest: object;
    }

    export interface ProtectionDestroyedEvent extends Event {
        type: MediaPlayerEvents['PROTECTION_DESTROYED'];
        data: string;
    }

    export interface TrackChangeRenderedEvent extends Event {
        type: MediaPlayerEvents['TRACK_CHANGE_RENDERED'];
        mediaType: MediaType;
        oldMediaInfo: MediaInfo;
        newMediaInfo: MediaInfo;
    }

    export interface QualityChangeRenderedEvent extends Event {
        type: MediaPlayerEvents['QUALITY_CHANGE_RENDERED'];
        mediaType: MediaType;
        oldQuality: number;
        newQuality: number;
    }

    export interface QualityChangeRequestedEvent extends Event {
        type: MediaPlayerEvents['QUALITY_CHANGE_REQUESTED'];
        mediaType: MediaType;
        oldQuality: number;
        newQuality: number;
        streamInfo: StreamInfo | null;
        reason: {
            name?: string;
            droppedFrames?: number;
        } | null;
    }

    export interface StreamInitializedEvent extends Event {
        type: MediaPlayerEvents['STREAM_INITIALIZED'];
        streamInfo: StreamInfo;
        error: Error | null;
    }

    export interface TextTracksAddedEvent extends Event {
        type: MediaPlayerEvents['TEXT_TRACKS_ADDED'];
        enabled: boolean;
        index: number;
        tracks: TextTrackInfo[];
    }

    export interface TtmlParsedEvent extends Event {
        type: MediaPlayerEvents['TTML_PARSED'];
        ttmlString: string;
        ttmlDoc: object;
    }

    export interface TtmlToParseEvent extends Event {
        type: MediaPlayerEvents['TTML_TO_PARSE'];
        content: object;
    }

    export class BitrateInfo {
        mediaType: 'video' | 'audio' | 'image';
        bitrate: number;
        width: number;
        height: number;
        scanType: string;
        qualityIndex: number;
    }

    export interface FragmentRequest {
        action: string;
        availabilityEndTime: number;
        availabilityStartTime: Date;
        bytesLoaded: number;
        bytesTotal: number;
        delayLoadingTime: number;
        duration: number;
        firstByteDate: Date;
        index: number;
        mediaInfo: MediaInfo;
        mediaType: MediaType;
        quality: number;
        representationId: string;
        requestStartDate: Date;
        requestEndDate: Date | null;
        responseType: string;
        serviceLocation: string;
        startTime: number;
        timescale: number;
        type: 'InitializationSegment' | 'MediaSegment';
        url: string;
    }

    export interface MediaSettings {
        lang?: string;
        viewpoint?: any;
        audioChannelConfiguration?: any[];
        accessibility?: any;
        role?: string;
    }

    export interface SessionToken {
        session: MediaKeySession;
        initData: any;
        getSessionID(): string;
        getExpirationTime(): number;
        getKeyStatuses(): MediaKeyStatusMap;
        getSessionType(): string;
    }

    export interface Stream {
        initialize(streamInfo: StreamInfo, protectionController: ProtectionController): void;
        activate(MediaSource: MediaSource): void;
        deactivate(): void;
        getDuration(): number;
        getStartTime(): number;
        getId(): string;
        getStreamInfo(): StreamInfo | null;
        getBitrateListFor(type: MediaType): BitrateInfo[];
        updateData(updatedStreamInfo: StreamInfo): void;
        reset(): void;
    }

    export interface IManifestInfo {
        DVRWindowSize: number;
        availableFrom: Date;
        duration: number;
        isDynamic: boolean;
        loadedTime: Date;
        maxFragmentDuration: number;
        minBufferTime: number;
        protocol?: string;
    }

    export class StreamInfo {
        id: string;
        index: number;
        start: number;
        duration: number;
        manifestInfo: IManifestInfo;
        isLast: boolean;
    }

    export interface ICurrentRepresentationSwitch {
        mt: number;
        t: Date;
    }

    export interface IBufferState {
        target: number;
        state: string;
    }

    export interface DashMetrics {
        getCurrentRepresentationSwitch(type: MediaType): ICurrentRepresentationSwitch;
        getCurrentBufferState(type: MediaType): IBufferState;
        getCurrentBufferLevel(type: MediaType): number;
        getCurrentHttpRequest(type: MediaType): object;
        getHttpRequests(type: MediaType): object[];
        getCurrentDroppedFrames(): IDroppedFrames;
        getCurrentSchedulingInfo(type: MediaType): object;
        getCurrentDVRInfo(type: MediaType): IDVRInfo[];
        getCurrentManifestUpdate(): any;
        getLatestFragmentRequestHeaderValueByID(id: string): string;
        getLatestMPDRequestHeaderValueByID(type: MediaType, id: string): string;
    }

    export interface DashAdapter {
        getBandwidthForRepresentation(representationId: string, periodIdx: number): number;
        getIndexForRepresentation(representationId: string, periodIdx: number): number;

        /**
         * This method returns the current max index based on what is defined in the MPD.
         *
         * @param bufferType String 'audio' or 'video',
         * @param periodIdx Make sure this is the period index not id
         */
        getMaxIndexForBufferType(bufferType: MediaType, periodIdx: number): number;
    }

    export interface ProtectionDataSet {
        [keySystemName: string]: ProtectionData;
    }

    export interface ProtectionData {
        /**
         * A license server URL to use with this key system.
         * When specified as a string, a single URL will be used regardless of message type.
         * When specified as an object, the object will have property names for each message
         * type with the corresponding property value being the URL to use for
         * messages of that type
         */
        serverURL?: string | { [P in MediaKeyMessageType]: string };

        /** headers to add to the http request */
        httpRequestHeaders?: object;

        /**
         * Defines a set of clear keys that are available to the key system.
         * Object properties are base64-encoded keyIDs (with no padding).
         * Corresponding property values are keys, base64-encoded (no padding).
         */
        clearkeys?: { [key: string]: string };

        /** Priority level of the key system to be selected (0 is the highest prority, -1 for undefined priority) */
        priority?: number;
    }

    export interface KeySystem {
        systemString: string;
        uuid: string;
        schemeIdURI: string;
        getInitData(cp: object): ArrayBuffer;
        getRequestHeadersFromMessage(message: ArrayBuffer): object | null;
        getLicenseRequestFromMessage(message: ArrayBuffer): Uint8Array;
        getLicenseServerURLFromInitData(initData: ArrayBuffer): string | null;
        getCDMData(): ArrayBuffer | null;
        getSessionId(): string | null;
    }

    export interface SupportedKeySystem {
        ks: KeySystem;
        initData: ArrayBuffer;
        cdmData: ArrayBuffer | null;
        sessionId: string | null;
    }

    export interface LicenseRequest {
        url: string;
        method: string;
        responseType: string;
        headers: object;
        withCredentials: boolean;
        messageType: string;
        sessionId: string;
        data: ArrayBuffer;
    }

    export interface LicenseResponse {
        url: string;
        headers: object;
        data: ArrayBuffer;
    }

    export type RequestFilter = (request: LicenseRequest) => Promise<any>;
    export type ResponseFilter = (response: LicenseResponse) => Promise<any>;

    export interface IBufferLevel {
        level: number;
        t: Date;
    }

    export interface IBufferState {
        state: string;
        target: number;
    }

    export interface IDVRInfo {
        manifestInfo: IManifestInfo;
        range: {
            start: number;
            end: number;
        };
        time: number;
    }

    export interface IDroppedFrames {
        droppedFrames: number;
        time: Date;
    }

    export class MetricsList {
        BufferLevel: IBufferLevel[];
        BufferState: IBufferState[];
        DVBErrors: any[];
        DVRInfo: IDVRInfo[];
        DroppedFrames: IDroppedFrames[];
        HttpList: any[];
        ManifestUpdate: any[];
        PlayList: any[];
        RepSwitchList: any[];
        RequestsQueue: RequestsQueue | null;
        SchedulingInfo: any[];
        TcpList: any[];
    }

    export class RequestsQueue {
        /**
         * Array of all of the requests that have begun to load.
         * This request may not make it into the executed queue if it is abandon due to ABR rules for example.
         */
        loadingRequests: any[];
        /**
         * Array of the the requests that have completed
         */
        executedRequests: any[];
    }

    export class TextTrackInfo {
        captionData: CaptionData[] | null;
        label: string | null;
        lang: string | null;
        index: number;
        isTTML: boolean;
        defaultTrack: boolean;
        kind: string;
        roles: string[] | null;
        isFragmented: boolean;
        isEmbedded: boolean;
    }

    export interface CaptionData {
        start: number;
        end: number;
        data?: string;
        styles?: {
            align?: string;
            line?: string;
            position?: string;
            size?: string;
        };
        type?: string;
        cueID?: string;
        isd?: object;
        images?: string[];
        embeddedImages?: { [id: string]: string };
    }

    export interface Thumbnail {
        url: string;
        width: number;
        height: number;
        x: number;
        y: number;
    }

    export type MetricType = 'ManifestUpdate' | 'RequestsQueue';
    export type TrackSwitchMode = 'alwaysReplace' | 'neverReplace';
    export type TrackSelectionMode = 'highestBitrate' | 'highestEfficiency' | 'widestRange';
    export function supportsMediaSource(): boolean;

}
