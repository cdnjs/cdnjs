import PlayerComponent from '../interfaces/component';
import Player from '../player';
/**
 * Volume controller element.
 *
 * @description This class controls the media's volume level using `semantic markup`,
 * such as input range and progress elements.
 * @see https://codepen.io/mi-lee/post/an-overview-of-html5-semantics
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume
 * @see https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player#Volume
 * @class Volume
 * @implements PlayerComponent
 */
declare class Volume implements PlayerComponent {
    #private;
    /**
     * Create an instance of Volume.
     *
     * @param {Player} player
     * @returns {Volume}
     */
    constructor(player: Player, position: string, layer: string);
    /**
     *
     * @inheritDoc
     * @memberof Volume
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Volume
     */
    destroy(): void;
    /**
     * Use the `Enter` and space bar keys to manipulate volume.
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Volume
     */
    private _keydownEvent;
}
export default Volume;
