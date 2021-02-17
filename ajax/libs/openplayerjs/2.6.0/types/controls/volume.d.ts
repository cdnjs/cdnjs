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
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Settings
     */
    private player;
    /**
     * Mute button.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Volume
     */
    private button;
    /**
     * Container for volume elements (display and slider input).
     *
     * @private
     * @type HTMLDivElement
     * @memberof Volume
     */
    private container;
    /**
     * Element that displays the media's current volume level.
     *
     * @private
     * @type HTMLProgressElement
     * @memberof Volume
     */
    private display;
    /**
     * Element that allows changing media's current volume.
     *
     * @private
     * @type HTMLInputElement
     * @memberof Volume
     */
    private slider;
    /**
     * Events that will be triggered in Volume element:
     *  - button (to toggle mute in media).
     *  - media (to alter volume level and modify mute's icon depending of the volume level).
     *  - slider (events to be triggered when clicking or sliding volume rail to modify volume level).
     *
     * @private
     * @type EventsList
     * @memberof Volume
     */
    private events;
    /**
     * Storage of volume value to restore it when toggling mute.
     *
     * @private
     * @type number
     * @memberof Volume
     */
    private volume;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Volume
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Volume
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
     * Use the up and down arrow keys to manipulate volume.
     *
     * @private
     * @param {KeyboardEvent} e
     * @memberof Volume
     */
    private _keydownEvent;
}
export default Volume;
