import Options from '../interfaces/ads/options';
import Player from '../player';
/**
 * Ads Media.
 *
 * @description This class implements Google IMA SDK v3.0 to display VAST and VPAID advertisements
 * @see https://developers.google.com/interactive-media-ads/
 * @class Ads
 */
declare class Ads {
    #private;
    loadPromise: unknown;
    loadedAd: boolean;
    /**
     * Create an instance of Ads.
     *
     * @param {Player} player
     * @param {string|string[]} ads
     * @param {any} labels
     * @param {boolean} autoStart
     * @param {Options} options
     * @returns {Ads}
     * @memberof Ads
     */
    constructor(player: Player, ads: string | string[], autoStart?: boolean, autoStartMuted?: boolean, options?: Options);
    /**
     * Create the Ads container and loader to process the Ads URL provided.
     *
     * @param {bool} force
     * @memberof Ads
     */
    load(force?: boolean): void;
    /**
     * Start playing/resume Ad if `adsManager` is active.
     *
     * @memberof Ads
     */
    play(): Promise<void>;
    /**
     * Pause Ad if `adsManager` is active.
     *
     * @memberof Ads
     */
    pause(): void;
    /**
     * Execute any callbacks to destroy Ads.
     *
     * @memberof Ads
     */
    destroy(): void;
    /**
     * Change dimensions of Ad.
     *
     * @param {?number} width
     * @param {?number} height
     * @memberof Ads
     */
    resizeAds(width?: number, height?: number): void;
    /**
     * Obtain an instance of the IMA adsManager.
     *
     * @returns {google.ima.AdsManager}
     * @memberof Ads
     */
    getAdsManager(): any;
    /**
     * Flag if the ad has started or not.
     *
     * @returns {boolean}
     * @memberof Ads
     */
    started(): boolean;
    set src(source: string | string[]);
    set isDone(value: boolean);
    /**
     * Update the `playTriggered` flag
     *
     * @param {boolean} value
     * @memberof Ads
     */
    set playRequested(value: boolean);
    /**
     * Set the current Ad's volume level.
     *
     * @memberof Ads
     */
    set volume(value: number);
    /**
     * Retrieve current Ad's volume level.
     *
     * @returns {number}
     * @memberof Ads
     */
    get volume(): number;
    /**
     * Set the current Ad's muted status.
     *
     * @memberof Ads
     */
    set muted(value: boolean);
    /**
     * Retrieve the current Ad's muted status.
     *
     * @returns {boolean}
     * @memberof Ads
     */
    get muted(): boolean;
    /**
     * Set the current Ad's current time position.
     *
     * @memberof Ads
     */
    set currentTime(value: number);
    /**
     * Retrieve the current Ad's current time position.
     *
     * @returns {number}
     * @memberof Ads
     */
    get currentTime(): number;
    /**
     * Retrieve the current Ad's duration.
     *
     * @returns {number}
     * @memberof Ads
     */
    get duration(): number;
    /**
     * Retrieve the current Ad's paused status.
     *
     * @returns {boolean}
     * @memberof Ads
     */
    get paused(): boolean;
    /**
     * Retrieve the current Ad's ended status.
     *
     * @returns {boolean}
     * @memberof Ads
     */
    get ended(): boolean;
    /**
     * Dispatch IMA SDK's events via OpenPlayer.
     *
     * @param {any} event
     * @memberof Ads
     */
    private _assign;
    /**
     * Dispatch an IMA SDK error that will destroy the Ads instance and resume original media.
     *
     * If more than one URL for Ads was found, attempt to play it.
     *
     * @see https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError.ErrorCode
     * @param {any} event
     * @memberof Ads
     */
    private _error;
    /**
     * Callback to be executed once IMA SDK manager is loaded.
     *
     * @param {any} adsManagerLoadedEvent
     * @memberof Ads
     */
    private _loaded;
    /**
     * Callback to be executed to start playing Ad.
     *
     * @param {any} manager
     * @memberof Ads
     */
    private _start;
    /**
     * Resume Ads if not done
     *
     * @memberof Ads
     */
    private _initNotDoneAds;
    /**
     * Callback to be executed once the Ad has ended.
     *
     * @memberof Ads
     */
    private _contentEndedListener;
    /**
     * Callback to be executed once the Ad has been paused.
     *
     * @memberof Ads
     */
    private _onContentPauseRequested;
    /**
     * Callback to be executed once the Ad has been resumed.
     *
     * @private
     * @memberof Ads
     */
    private _onContentResumeRequested;
    /**
     * Update the current time to mimic the default Ad Playback.
     *
     * @private
     * @memberof Ads
     */
    private _loadedMetadataHandler;
    /**
     * Callback to resume original media.
     *
     * This can happen when Ad is being skipped or has ended.
     * @memberof Ads
     */
    private _resumeMedia;
    /**
     * Setup final attributes to the Ad before playing it, which include initial dimensions and capabilities
     * to autoplay Ad or not.
     *
     * @memberof Ads
     */
    private _requestAds;
    /**
     * Internal callback to request Ads.
     *
     * @memberof Ads
     */
    private _contentLoadedAction;
    /**
     * Reset Ads Player after manual ad break.
     *
     * If we have set `autoPlayAdBreaks` to `false`, destroy the adsManager to prevent post rolls
     * and reset the SDK.
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/faq#8
     *
     * @memberof Ads
     */
    private _resetAdsAfterManualBreak;
    /**
     * Remove event for `loadedmetadata` and set the player to resume regular media.
     *
     * @memberof Ads
     */
    private _prepareMedia;
    private _setMediaVolume;
    private _handleClickInContainer;
    private _handleResizeAds;
}
export default Ads;
