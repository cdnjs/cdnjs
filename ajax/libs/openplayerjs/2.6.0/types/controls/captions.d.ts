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
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Captions
     */
    private player;
    /**
     * Button to toggle captions.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Captions
     */
    private button;
    /**
     * Container to display captions.
     *
     * @private
     * @type HTMLDivElement
     * @memberof Captions
     */
    private captions;
    /**
     * Container to display captions options if `detachMenus` is set as `true`.
     *
     * @private
     * @type HTMLDivElement
     * @memberof Captions
     */
    private menu;
    /**
     * Events that will be triggered in Caption element:
     *  - button (for the caption toggle element)
     *  - global (for dynamic elements)
     *  - media (to update captions on `timeupdate`, instead of using `oncuechanged`)
     *
     * @private
     * @type EventsList
     * @memberof Captions
     */
    private events;
    /**
     * List of cues associated with a specific language.
     *
     * @private
     * @type CueList
     * @memberof Captions
     */
    private tracks;
    /**
     * List of tracks found in current media.
     *
     * @private
     * @type TextTrack[]
     * @memberof Captions
     */
    private trackList;
    /**
     * List of remote/local track sources in case no cues are detected natively.
     *
     * @private
     * @type TrackURL
     * @memberof Captions
     */
    private trackUrlList;
    /**
     * Whether tracks were found in current media or not.
     *
     * @private
     * @type boolean
     * @memberof Captions
     */
    private hasTracks;
    /**
     * Current track (either specified by `default` attribute or chosen by the user).
     *
     * @private
     * @type TextTrack
     * @memberof Captions
     */
    private current?;
    /**
     * Initial language to be used to render captions when turned on, and
     * also as a default value in the `Settings` component.
     *
     * @see [[Captions.addSettings]]
     * @private
     * @type string
     * @memberof Captions
     */
    private default;
    /**
     * Determine if a submenu must be created with the CC button, instead of using the Settings menu.
     *
     * @private
     * @type boolean
     * @memberof Captions
     */
    private detachMenu;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Captions
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Captions
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
