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
    #private;
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
