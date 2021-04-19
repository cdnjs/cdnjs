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
    #private;
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
