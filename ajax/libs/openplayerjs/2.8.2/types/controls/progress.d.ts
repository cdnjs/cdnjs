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
    #private;
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
