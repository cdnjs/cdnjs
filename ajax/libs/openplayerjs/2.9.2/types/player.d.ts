import 'core-js/features/array/find';
import 'core-js/features/array/from';
import 'core-js/features/object/assign';
import 'core-js/features/object/keys';
import 'core-js/features/promise';
import 'custom-event-polyfill';
import Controls from './controls';
import Track from './interfaces/captions/track';
import ControlItem from './interfaces/control-item';
import CustomMedia from './interfaces/custom-media';
import EventsList from './interfaces/events-list';
import PlayerInstanceList from './interfaces/instance';
import PlayerOptions from './interfaces/player-options';
import Source from './interfaces/source';
import Media from './media';
import Ads from './media/ads';
import './utils/closest';
/**
 * OpenPlayerJS.
 *
 * @description This class generates controls to play native media (such as MP4, MP3, HLS, M(PEG-DASH),
 * and have a unified look-and-feel on all modern browsers (including IE11)
 * @class Player
 */
declare class Player {
    #private;
    /**
     * Collection of OpenPlayer instances.
     *
     * @type PlayerInstanceList
     * @memberof Player
     */
    static instances: PlayerInstanceList;
    /**
     * Collection of additional (non-native) media
     *
     * @type CustomMedia
     * @memberof Player
     */
    static customMedia: CustomMedia;
    /**
     * Convert all the video/audio tags with `op-player` class in a OpenMedia player instance.
     *
     * @memberof Player
     */
    static init(): void;
    /**
     * Add new media types, such as iframe API players (YouTube, Vimeo, Dailymotion, etc.)
     *
     * @param {string} name  The name of the media, which will be used to determine options when configuring player
     * @param {string} mimeType  The pseudo MIME type associated with media (generally, will be `video/x-[name]`)
     * @param {(url: string) => string} valid  A callback to determine if a match was found between the MIME type and media source
     * @param {object} media  The object that will contain all the native methods/setters/getters to play media
     * @memberof Player
     */
    static addMedia(name: string, mimeType: string, valid: (url: string) => string, media: any): void;
    /**
     * Button to play media.
     *
     * @type HTMLButtonElement
     * @memberof Player
     */
    playBtn: HTMLButtonElement;
    /**
     * Element to indicate that media is being loaded.
     *
     * Only applies for `Media` object, since `Ads` does not need it.
     * @type HTMLSpanElement
     * @memberof Player
     */
    loader: HTMLSpanElement;
    /**
     * Adapter to toggle between different players.
     * Useful for Chromecast integration.
     *
     * @type unknown
     * @memberof Player
     */
    proxy: any;
    /**
     * Create an instance of Player.
     *
     * @param {(HTMLMediaElement|string)} element  A video/audio tag or its identifier.
     * @param {PlayerOptions} playerOptions  Options to enhance Hls and Dash players, among other things.
     * @returns {Player}
     * @memberof Player
     */
    constructor(element: HTMLMediaElement | string, options?: PlayerOptions);
    /**
     * Create all the markup and events needed for the player.
     *
     * Note that no controls will be created if user is trying to instantiate a video element
     * in an iPhone, because iOS will only use QuickTime as a default constrain.
     * @memberof Player
     */
    init(): Promise<void>;
    /**
     * Load media.
     *
     * HLS and M(PEG)-DASH perform more operations during loading if browser does not support them natively.
     * @memberof Player
     */
    load(): Promise<void> | void;
    /**
     * Play media.
     *
     * If Ads are detected, different methods than the native ones are triggered with this operation.
     * @memberof Player
     */
    play(): Promise<void>;
    /**
     * Pause media.
     *
     * If Ads are detected, different methods than the native ones are triggered with this operation.
     * @memberof Player
     */
    pause(): void;
    /**
     * Destroy OpenMedia Player instance (including all events associated) and return the
     * video/audio tag to its original state.
     *
     * @memberof Player
     */
    destroy(): void;
    /**
     * Retrieve the parent element (with `op-player` class) of the native video/audio tag.
     *
     * This element is mostly useful to attach other player component's markup in a place
     * different than the controls bar.
     * @returns {HTMLElement}
     * @memberof Player
     */
    getContainer(): HTMLElement;
    /**
     * Retrieve an instance of the controls object used in the player instance.
     *
     * This element is mostly useful to attach other player component's markup in the controls bar.
     * @returns {Controls}
     * @memberof Player
     */
    getControls(): Controls;
    /**
     * Retrieve an instance of the custom controls invoked in the player instance.
     *
     * @returns {ControlItem[]}
     * @memberof Player
     */
    getCustomControls(): ControlItem[];
    /**
     * Retrieve the original video/audio tag.
     *
     * This element is useful to attach different events in other player's components.
     * @returns {HTMLMediaElement}
     * @memberof Player
     */
    getElement(): HTMLMediaElement;
    /**
     * Retrieve the events attached to the player.
     *
     * This list does not include individual events associated with other player's components.
     * @returns {EventsList}
     * @memberof Player
     */
    getEvents(): EventsList;
    /**
     * Retrieve the list of config options associated with the player..
     *
     * @returns {PlayerOptions}
     * @memberof Player
     */
    getOptions(): PlayerOptions;
    /**
     * Retrieve the current media object (could be Ads or any other media type).
     *
     * @returns {(Ads|Media)}
     * @memberof Player
     */
    activeElement(): Ads | Media;
    /**
     * Check if current media is an instance of a native media type.
     *
     * @returns {boolean}
     * @memberof Player
     */
    isMedia(): boolean;
    /**
     * Check if current media is an instance of an Ad.
     *
     * @returns {boolean}
     * @memberof Player
     */
    isAd(): boolean;
    /**
     * Retrieve an instance of the `Media` object.
     *
     * @returns {Media}
     * @memberof Player
     */
    getMedia(): Media;
    /**
     * Retrieve an instance of the `Ads` object.
     *
     * @returns {Ads}
     * @memberof Player
     */
    getAd(): Ads;
    /**
     * Append a new `<track>` tag to the video/audio tag and dispatch event
     * so it gets registered/loaded in the player, via `controlschanged` event.
     *
     * @param {Track} args
     * @memberof Player
     */
    addCaptions(args: Track): void;
    /**
     * Add new custom control to the list to be rendered.
     *
     * @param {ControlItem} args
     * @memberof Player
     */
    addControl(args: ControlItem): void;
    /**
     * Remove a control to the list (whether custom or not).
     *
     * @param {string} controlName
     * @memberof Player
     */
    removeControl(controlName: string): void;
    /**
     * Load media and events depending of media type.
     *
     * @memberof Player
     */
    _prepareMedia(): Promise<void>;
    enableDefaultPlayer(): void;
    loadAd(src: string | string[]): Promise<void>;
    /**
     * Set a Source object to the current media.
     *
     * @memberof Player
     */
    set src(media: Source[]);
    /**
     * Retrieve the current Source list associated with the player.
     *
     * @type Source[]
     * @memberof Player
     * @readonly
     */
    get src(): Source[];
    /**
     * Retrieve current player's unique identifier.
     *
     * @type string
     * @memberof Player
     * @readonly
     */
    get id(): string;
    /**
     * Check if the element passed in the constructor is a valid video/audio tag
     * with 'op-player__media' class (at the very least, since `op-player` works
     * for automatic instantiation)
     *
     * @private
     * @memberof Player
     * @return {boolean}
     */
    private _isValid;
    /**
     * Wrap media instance within a DIV tag.
     *
     * It detects also whether the user is using a mouse, or TAB for accessibility purposes.
     * @private
     * @memberof Player
     */
    private _wrapInstance;
    /**
     * Build HTML markup for media controls.
     *
     * @memberof Player
     */
    private _createControls;
    /**
     * Generate a unique identifier for the current player instance, if no `id` attribute was detected.
     *
     * @private
     * @memberof Player
     */
    private _createUID;
    /**
     * Create a Play button in the main player's container.
     *
     * Also, it creates a loader element, that will be displayed when seeking/waiting for media.
     * @memberof Player
     */
    private _createPlayButton;
    /**
     * Set events to show/hide play button and loader element, and to use the player using keyboard
     * for accessibility purposes.
     *
     * @private
     * @memberof Player
     */
    private _setEvents;
    /**
     * Attempt to autoplay media depending on browser's capabilities.
     *
     * It does not consider auto playing Ads since that workflow is established already as part
     * of that object.
     * @see [[Ads.constructor]]
     * @private
     * @memberof Player
     */
    private _autoplay;
    /**
     * Merge user's configuration with default configuration.
     *
     * It deals with complex config elements, like `labels` and `controls`.
     * @param playerOptions
     * @private
     * @memberof Player
     */
    private _mergeOptions;
    private _enableKeyBindings;
}
export default Player;
