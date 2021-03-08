import Source from '../interfaces/source';
import Native from './native';
/**
 * HLS Media.
 *
 * @description Class that handles M3U8 files using hls.js within the player
 * @see https://github.com/video-dev/hls.js/
 * @class HlsMedia
 */
declare class HlsMedia extends Native {
    /**
     * Instance of hls.js player.
     *
     * @type Hls
     * @memberof HlsMedia
     */
    private player;
    /**
     * Hls events that will be triggered in Player.
     *
     * @see https://github.com/video-dev/hls.js/blob/master/src/events.js
     * @type EventsList
     * @memberof HlsMedia
     */
    private events;
    /**
     * Time in milliseconds to attempt to recover media after an error.
     *
     * @type number
     * @memberof HlsMedia
     */
    private recoverDecodingErrorDate;
    /**
     * Time in milliseconds to attempt to swap audio codec after an error.
     *
     * @type number
     * @memberof HlsMedia
     */
    private recoverSwapAudioCodecDate;
    /**
     * Hls options to be passed to the Hls instance.
     *
     * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning
     * @private
     * @type object
     * @memberof HlsMedia
     */
    private options;
    /**
     * Flag to indicate if `autoplay` attribute was set
     *
     * @private
     * @type boolean
     * @memberof HlsMedia
     */
    private autoplay;
    /**
     * Creates an instance of HlsMedia.
     *
     * @param {HTMLMediaElement} element
     * @param {Source} mediaSource
     * @memberof HlsMedia
     */
    constructor(element: HTMLMediaElement, mediaSource: Source, autoplay?: boolean, options?: object);
    /**
     * Provide support via hls.js if browser does not have native support for HLS
     *
     * @inheritDoc
     * @memberof HlsMedia
     */
    canPlayType(mimeType: string): boolean;
    /**
     *
     * @inheritDoc
     * @memberof HlsMedia
     */
    load(): void;
    /**
     *
     * @inheritDoc
     * @memberof HlsMedia
     */
    destroy(): void;
    /**
     *
     * @inheritDoc
     * @memberof HlsMedia
     */
    set src(media: Source);
    get levels(): any;
    set level(level: number);
    get level(): number;
    /**
     * Setup Hls player with options.
     *
     * Some of the options/events will be overriden to improve performance and user's experience.
     *
     * @private
     * @memberof HlsMedia
     */
    private _create;
    /**
     * Custom HLS events
     *
     * These events can be attached to the original node using addEventListener and the name of the event,
     * using or not Hls.Events object
     * @see https://github.com/video-dev/hls.js/blob/master/src/events.js
     * @see https://github.com/video-dev/hls.js/blob/master/src/errors.js
     * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#runtime-events
     * @see https://github.com/video-dev/hls.js/blob/master/docs/API.md#errors
     * @param {string} event The name of the HLS event
     * @param {any} data The data passed to the event, could be an object or an array
     * @memberof HlsMedia
     */
    private _assign;
    /**
     * Remove all hls.js events and destroy hlsjs player instance.
     *
     * @memberof HlsMedia
     */
    private _revoke;
}
export default HlsMedia;
