import PlayerComponent from '../interfaces/component';
import Player from '../player';
/**
 * Fullscreen element.
 *
 * @description Following the Fullscreen API, this class toggles media dimensions to present video
 * using the user's entire screen, even when the player is playing Ads.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player#Fullscreen
 * @class Fullscreen
 * @implements PlayerComponent
 */
declare class Fullscreen implements PlayerComponent {
    /**
     * Flag to determine if fullscreen is available natively.
     *
     * @type boolean
     * @memberof Fullscreen
     */
    fullScreenEnabled: boolean;
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Fullscreen
     */
    private player;
    /**
     * Flag to determine if media is currently being played in fullscreen mode.
     *
     * @private
     * @type boolean
     * @memberof Fullscreen
     */
    private isFullscreen;
    /**
     * Button to toggle fullscreen effect.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Fullscreen
     */
    private button;
    /**
     * List of events when fullscreen change is fired.
     *
     * @private
     * @type string[]
     * @memberof Fullscreen
     */
    private fullscreenEvents;
    /**
     * Storage for user's full screen width.
     *
     * @private
     * @type number
     * @memberof Fullscreen
     */
    private fullscreenWidth;
    /**
     * Storage for user's full screen height.
     *
     * @private
     * @type number
     * @memberof Fullscreen
     */
    private fullscreenHeight;
    /**
     * Callback when user clicks Fullscreen button.
     *
     * @private
     * @memberof Fullscreen
     */
    private clickEvent;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Fullscreen
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Fullscreen
     */
    private position;
    /**
     * Layer where the control item will be placed
     *
     * @private
     * @type {string}
     * @memberof Captions
     */
    private layer;
    /**
     * Create an instance of Fullscreen.
     *
     * @param {Player} player
     * @returns {Fullscreen}
     * @memberof Fullscreen
     */
    constructor(player: Player, position: string, layer: string);
    /**
     * Create a button and set global events to toggle fullscreen.
     *
     * @inheritDoc
     * @memberof Fullscreen
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Fullscreen
     */
    destroy(): void;
    /**
     * Enter/cancel fullscreen depending of browser's capabilities.
     *
     * If browser does not support native Fullscreen API, player will adjust the video
     * and its parent container's dimensions via width and height styles.
     * @memberof Fullscreen
     */
    toggleFullscreen(): void;
    /**
     * Callback to toggle fullscreen for browsers thta do not support native Fullscreen API.
     *
     * @private
     * @memberof Fullscreen
     */
    private _fullscreenChange;
    /**
     * Update the `data-fullscreen` of the player's container and toggle button's class
     * depending if player is on fullscreen mode or not.
     *
     * @private
     * @param {boolean} state  Whether media is fullscreen or not
     * @memberof Fullscreen
     */
    private _setFullscreenData;
    /**
     * Set dimensions for the video tag and player's container.
     *
     * @private
     * @param {?number} width The width of the media
     * @param {?number} height The height of the media
     * @memberof Fullscreen
     */
    private _resize;
    /**
     * Use the `F` key to go fullscreen if the focus is on player.
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Fullscreen
     */
    private _keydownEvent;
}
export default Fullscreen;
