import PlayerComponent from '../interfaces/component';
import SettingsItem from '../interfaces/settings/item';
import Player from '../player';
/**
 * Closed Captions element.
 *
 * @description Using `<track>` tags, this class allows the displaying of both local and remote captions/subtitles
 * bypassing CORS, and without the use of the `crossorigin` attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 * @see https://www.html5rocks.com/en/tutorials/track/basics/
 * @class Captions
 * @implements PlayerComponent
 */
declare class Captions implements PlayerComponent {
    #private;
    /**
     * Create an instance of Captions.
     *
     * @param {Player} player
     * @returns {Captions}
     * @memberof Captions
     */
    constructor(player: Player, position: string, layer: string);
    /**
     * Create a button and a container to display captions if tracks are detected.
     *
     * @inheritDoc
     * @memberof Captions
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Captions
     */
    destroy(): void;
    /**
     * Add list of available captions in the `Settings` menu.
     *
     * @see [[Settings.addSettings]]
     * @returns {SettingsItem|object}
     * @memberof Captions
     */
    addSettings(): SettingsItem | object;
    /**
     * Parse WebVTT text from external domain to emulate native cues
     *
     * @private
     * @param {string} webvttText
     * @returns {Cue[]}
     * @memberof Captions
     */
    private _getCuesFromText;
    /**
     * Store native cues in new container to be read by player.
     *
     * @private
     * @param {TextTrack} track
     * @returns {Cue[]}
     * @memberof Captions
     */
    private _getNativeCues;
    /**
     * Display current caption based on the current timestamp.
     *
     * @memberof Captions
     */
    private _show;
    /**
     * Turn captions off.
     *
     * It removed the class from the captions container to hide any text displayed.
     *
     * @private
     * @memberof Captions
     */
    private _hide;
    /**
     * Search track text position using binary search algorithm.
     *
     * It determines the position of the track based on the media's current time.
     * @see https://www.geeksforgeeks.org/binary-search/
     * @private
     * @param {Cue[]} tracks
     * @param {number} currentTime
     * @returns {number}
     * @memberof Captions
     */
    private _search;
    /**
     * Clean HTML text.
     *
     * Prevents the triggering of script code coming from captions' text, removed styles and
     * also any potential events prefixed with `on`.
     *
     * @private
     * @param {string} html
     * @returns {string}
     * @memberof Captions
     */
    private _sanitize;
    /**
     * Store valid URL and cues from `track` tags that returned content.
     *
     * If a `track` element has a `default` value, make sure it is being displayed.
     *
     * @private
     * @param {number} index
     * @param {string} language
     * @param {string} trackUrl
     * @param {boolean} [showTrack=false]
     * @memberof Captions
     */
    private _prepareTrack;
    private _formatMenuItems;
}
export default Captions;
