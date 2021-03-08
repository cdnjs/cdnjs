import DashOptions from '../interfaces/dash-options';
import Source from '../interfaces/source';
import Native from './native';
/**
 * M(PEG)-DASH Media.
 *
 * @description Class that handles MPD files using dash.js within the player
 * @see https://github.com/Dash-Industry-Forum/dash.js/
 * @see https://github.com/Dash-Industry-Forum/dash.js/wiki/Migration-3.0
 * @class DashMedia
 */
declare class DashMedia extends Native {
    /**
     * Instance of dashjs player.
     *
     * @type dashjs
     * @memberof DashMedia
     */
    private player;
    /**
     * DashJS events that will be triggered in Player.
     *
     * @see http://cdn.dashjs.org/latest/jsdoc/MediaPlayerEvents.html
     * @type EventsList
     * @memberof DashMedia
     */
    private events;
    private options?;
    /**
     * Creates an instance of DashMedia.
     *
     * @param {HTMLMediaElement} element
     * @param {Source} mediaSource
     * @memberof DashMedia
     */
    constructor(element: HTMLMediaElement, mediaSource: Source, options?: DashOptions);
    /**
     *
     * @inheritDoc
     * @memberof DashMedia
     */
    canPlayType(mimeType: string): boolean;
    /**
     *
     * @inheritDoc
     * @memberof DashMedia
     */
    load(): void;
    /**
     *
     * @inheritDoc
     * @memberof DashMedia
     */
    destroy(): void;
    /**
     *
     * @inheritDoc
     * @memberof DashMedia
     */
    set src(media: Source);
    get levels(): any;
    set level(level: number);
    get level(): number;
    /**
     * Custom M(PEG)-DASH events
     *
     * These events can be attached to the original node using addEventListener and the name of the event,
     * not using dashjs.MediaPlayer.events object
     * @see http://cdn.dashjs.org/latest/jsdoc/MediaPlayerEvents.html
     * @param {dashjs.MediaPlayerEvents.events} event
     */
    private _assign;
    /**
     * Remove all dash.js events and destroy dashjs player instance.
     *
     * @memberof DashMedia
     */
    private _revoke;
    /**
     * Set player with proper configuration to have better performance.
     *
     * Also, considers the addition of DRM settings.
     *
     * @memberof DashMedia
     */
    private _preparePlayer;
}
export default DashMedia;
