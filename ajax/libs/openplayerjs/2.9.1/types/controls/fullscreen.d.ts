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
    #private;
    /**
     * Flag to determine if fullscreen is available natively.
     *
     * @type boolean
     * @memberof Fullscreen
     */
    fullScreenEnabled: boolean;
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
     * Callback to toggle fullscreen for browsers that do not support native Fullscreen API.
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
     * Use the `Enter` and space bar keys to go fullscreen if the focus is on player.
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Fullscreen
     */
    private _keydownEvent;
}
export default Fullscreen;
