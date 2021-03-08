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
    /**
     * Flag to indicate when player has finished playing all Ads.
     *
     * Type of Ads could be: pre-roll, mid-roll, post-roll or combination of them.
     * @type boolean
     * @memberof Ads
     */
    adsEnded: boolean;
    /**
     * Flag to indicate that individual Ad has been played.
     *
     * @type boolean
     * @memberof Ads
     */
    adsDone: boolean;
    /**
     * Flag to indicate that current Ad is being played.
     *
     * @type boolean
     * @memberof Ads
     */
    adsActive: boolean;
    /**
     * Flag to indicate that Ads are ready to being played.
     *
     * @type boolean
     * @memberof Ads
     */
    adsStarted: boolean;
    /**
     * Element to present changes in current time while Ad is being played.
     *
     * @type number
     * @memberof Ads
     */
    intervalTimer: number;
    /**
     * Store the current Ad's volume level.
     *
     * @type number
     * @memberof Ads
     */
    adsVolume: number;
    /**
     * Flag to indicate if Ad is currently muted or not.
     *
     * @type boolean
     * @memberof Ads
     */
    adsMuted: boolean;
    /**
     * Store the current Ad's duration.
     *
     * @type number
     * @memberof Ads
     */
    adsDuration: number;
    /**
     * Store the current Ad's current time position to be passed in the `timeupdate` event.
     *
     * @type number
     * @memberof Ads
     */
    adsCurrentTime: number;
    /**
     * Object which handles playing ads after they've been received from the server.
     *
     * @see https://tinyurl.com/ybjas4ut
     * @type google.ima.AdsManager
     * @memberof Ads
     */
    adsManager: any;
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Captions
     */
    private player;
    /**
     * Instance of Media object to execute actions once Ad has ended/skipped.
     *
     * @type Media
     * @memberof Ads
     */
    private media;
    /**
     * Native video/audio tag to execute native events.
     *
     * @type HTMLMediaElement
     * @memberof Ads
     */
    private element;
    /**
     * List of IMA SDK events to be executed.
     *
     * @type string[]
     * @memberof Ads
     */
    private events;
    /**
     * The VAST/VPAID URL to play Ads.
     *
     * @type string|string[]
     * @memberof Ads
     */
    private ads;
    /**
     * Promise to start all IMA SDK elements, once the library has been loaded.
     *
     * @type Promise<any>
     * @memberof Ads
     */
    private promise;
    /**
     * Object which allows to request ads from ad servers or a dynamic ad insertion stream.
     *
     * @see https://tinyurl.com/ycwp4ufd
     * @type google.ima.AdsLoader
     * @memberof Ads
     */
    private adsLoader;
    /**
     * Element in which Ads will be created.
     *
     * @type HTMLDivElement
     * @memberof Ads
     */
    private adsContainer?;
    /**
     * Container to display Ads.
     *
     * @see https://tinyurl.com/ya3zksso
     * @type google.ima.adDisplayContainer
     * @memberof Ads
     */
    private adDisplayContainer;
    /**
     * Object containing the data used to request ads from the server.
     *
     * @see https://tinyurl.com/ya8bxjf4
     * @type google.ima.adsRequest
     * @memberof Ads
     */
    private adsRequest;
    /**
     * Flag to indicate if Ad should be played automatically with sound
     *
     * @type boolean
     * @memberof Ads
     */
    private autoStart;
    /**
     * Flag to indicate if Ad should be played automatically without sound
     *
     * @private
     * @type {boolean}
     * @memberof Ads
     */
    private autoStartMuted;
    /**
     * Flag to indicate if player requested play.
     *
     * This will help if the play was triggered before Ads were ready.
     * @private
     * @type boolean
     * @memberof Ads
     */
    private playTriggered;
    /**
     * Configuration elements passed to Ads, including IMA SDK location
     *
     * @private
     * @type Options
     * @memberof Ads
     */
    private adsOptions;
    /**
     * Current Ad; used when passing a list of Ads
     *
     * @private
     * @type number
     * @memberof Ads
     */
    private currentAdsIndex;
    /**
     * Store original volume from media.
     *
     * @private
     * @type number
     * @memberof Ads
     */
    private originalVolume;
    /**
     *
     *
     * @private
     * @type {*}
     * @memberof Ads
     */
    private preloadContent;
    /**
     * Timer to update media's `currentTime`
     *
     * @private
     * @type number
     * @memberof Ads
     */
    private lastTimePaused;
    /**
     * List of media sources from the `media` element.
     *
     * @private
     * @type Source[]
     * @memberof Ads
     */
    private mediaSources;
    /**
     * Flag to execute `loadedmetadata` and `resize` once.
     *
     * @private
     * @type boolean
     * @memberof Ads
     */
    private mediaStarted;
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
     * @param {?number} width       The new width of the Ad's container.
     * @param {?number} height      The new height of the Ad's container.
     * @memberof Ads
     */
    resizeAds(width?: number, height?: number): void;
    /**
     * Update the `playTriggered` flag
     *
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
}
export default Ads;
