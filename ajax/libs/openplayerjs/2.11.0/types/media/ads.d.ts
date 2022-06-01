import { AdsOptions } from '../interfaces';
import Player from '../player';
declare class Ads {
    #private;
    loadPromise: unknown;
    loadedAd: boolean;
    constructor(player: Player, ads: string | string[], autostart?: boolean, autostartMuted?: boolean, options?: AdsOptions);
    load(force?: boolean): void;
    play(): Promise<void>;
    pause(): void;
    destroy(): void;
    resizeAds(width?: number, height?: number): void;
    getAdsManager(): unknown;
    getAdsLoader(): any;
    started(): boolean;
    set src(source: string | string[]);
    set isDone(value: boolean);
    set playRequested(value: boolean);
    set volume(value: number);
    get volume(): number;
    set muted(value: boolean);
    get muted(): boolean;
    set currentTime(value: number);
    get currentTime(): number;
    get duration(): number;
    get paused(): boolean;
    get ended(): boolean;
    private _assign;
    private _error;
    private _loaded;
    private _start;
    private _initNotDoneAds;
    private _contentEndedListener;
    private _onContentPauseRequested;
    private _onContentResumeRequested;
    private _loadedMetadataHandler;
    private _resumeMedia;
    private _requestAds;
    /**
     * Internal callback to request Ads.
     *
     * @memberof Ads
     */
    private _contentLoadedAction;
    private _resetAdsAfterManualBreak;
    private _prepareMedia;
    private _setMediaVolume;
    private _handleClickInContainer;
    private _handleResizeAds;
    private _handleSkipAds;
}
export default Ads;
