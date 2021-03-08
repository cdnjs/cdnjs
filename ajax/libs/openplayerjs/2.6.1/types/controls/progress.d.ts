import PlayerComponent from '../interfaces/component';
import Player from '../player';
/**
 * Progress bar element.
 *
 * @description This class creates a progress bar to track how much time media has been played,
 * downloaded and its current time, using `semantic markup`, such as input range and progress elements.
 * @see https://codepen.io/mi-lee/post/an-overview-of-html5-semantics
 * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player#Progress
 * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges
 * @class Progress
 * @implements PlayerComponent
 */
declare class Progress implements PlayerComponent {
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Progress
     */
    private player;
    /**
     * Container for progress bar elements (buffered, played and slider input).
     *
     * @private
     * @type HTMLDivElement
     * @memberof Progress
     */
    private progress;
    /**
     * Element that allows changing media's current position (time).
     *
     * @private
     * @type HTMLInputElement
     * @memberof Progress
     */
    private slider;
    /**
     * Element that displays the media's downloaded amount.
     *
     * @private
     * @type HTMLProgressElement
     * @memberof Progress
     */
    private buffer;
    /**
     * Element that displays the media's played time.
     *
     * @private
     * @type HTMLProgressElement
     * @memberof Progress
     */
    private played;
    /**
     * Element that displays the current media time when hovering in the progress bar.
     *
     * @private
     * @type HTMLSpanElement
     * @memberof Progress
     */
    private tooltip;
    /**
     * Events that will be triggered in Progress element:
     *  - container (to display tooltip when hovering in the progress bar)
     *  - global (to hide tooltip once user moves out of the progress bar)
     *  - media (to capture different states of the current time and duration in the time rail)
     *  - slider (events to be triggered when clicking or sliding time rail)
     *
     * @private
     * @type EventsList
     * @memberof Progress
     */
    private events;
    /**
     * Flag that pauses and then plays media properly (if media was played) when
     * clicking in the progress bar.
     *
     * @private
     * @type {boolean}
     * @memberof Progress
     */
    private forcePause;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Progress
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Progress
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
     * Create an instance of Progress.
     *
     * @param {Player} player
     * @returns {Progress}
     * @memberof Progress
     */
    constructor(player: Player, position: string, layer: string);
    /**
     *
     * @inheritDoc
     * @memberof Progress
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Progress
     */
    destroy(): void;
    /**
     * Use the left and right arrow keys to manipulate current media time.
     *
     * Also, the `Home` and `End` keys to restart or end media.
     * @private
     * @param {KeyboardEvent} e
     * @memberof Progress
     */
    private _keydownEvent;
}
export default Progress;
