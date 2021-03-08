import PlayerComponent from '../interfaces/component';
import Player from '../player';
/**
 * Time element.
 *
 * @description Class that renders media's current time and duration in human-readable format
 * (hh:mm:ss), and if media is a live streaming, a `Live Broadcast` message will be displayed.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration
 * @class Time
 * @implements PlayerComponent
 */
declare class Time implements PlayerComponent {
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Time
     */
    private player;
    /**
     * Element that displays media's current time being played.
     *
     * It will change to `Live Broadcast` if duration is Infinity.
     * @private
     * @type {HTMLTimeElement}
     * @memberof Time
     */
    private current;
    /**
     * Element that separates current time and duration labels.
     *
     * It will be hidden if duration is Infinity.
     * @private
     * @type {HTMLSpanElement}
     * @memberof Time
     */
    private delimiter;
    /**
     * Element that displays media's total duration.
     *
     * It will be hidden if duration is Infinity.
     * @private
     * @type {HTMLTimeElement}
     * @memberof Time
     */
    private duration;
    /**
     * Element that encloses all elements to show time
     *
     * @private
     * @type {HTMLSpanElement}
     * @memberof Time
     */
    private container;
    /**
     * Events that will be triggered in Time element:
     *  - controls (to reset time properly when `controlschanged` event is triggered).
     *  - media (to set current time and duration in `loadedmetadata`, `progress` and `timeupdate` events).
     *
     * @private
     * @type EventsList
     * @memberof Time
     */
    private events;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Time
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Time
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
     * Create an instance of Time.
     *
     * @param {Player} player
     * @returns {Time}
     * @memberof Time
     */
    constructor(player: Player, position: string, layer: string);
    /**
     * When no duration (Infinity) is detected, the `Live Broadcast` will be displayed.
     *
     * @inheritDoc
     * @memberof Time
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Time
     */
    destroy(): void;
}
export default Time;
