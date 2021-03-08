import PlayerComponent from '../interfaces/component';
import Player from '../player';
/**
 * Play/pause element.
 *
 * @description This class controls the state of the media, by playing or pausing it, and
 * when it ends, updates the state to replay the current media.
 * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player#PlayPause
 * @class Play
 * @implements PlayerComponent
 */
declare class Play implements PlayerComponent {
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Play
     */
    private player;
    /**
     * Button to play/pause media.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Play
     */
    private button;
    /**
     * Events that will be triggered in Play element:
     *  - controls (when `controlschanged` event is being triggered)
     *  - media (to toggle button's class and play/pause media)
     *
     * @private
     * @see [[Controls._buildElements]]
     * @type EventsList
     * @memberof Play
     */
    private events;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Play
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Play
     */
    private position;
    /**
     * Layer where the control item will be placed
     *
     * @private
     * @type {string}
     * @memberof Play
     */
    private layer;
    /**
     * Create an instance of Play.
     *
     * @param {Player} player
     * @returns {Play}
     * @memberof Play
     */
    constructor(player: Player, position: string, layer: string);
    /**
     *
     * @inheritDoc
     * @memberof Play
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Play
     */
    destroy(): void;
    /**
     * Use the `Enter` and space bar keys to play/pause.
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Play
     */
    private _keydownEvent;
}
export default Play;
