import Level from '../interfaces/level';
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
    #private;
    /**
     * Creates an instance of HlsMedia.
     *
     * @param {HTMLMediaElement} element
     * @param {Source} mediaSource
     * @memberof HlsMedia
     */
    constructor(element: HTMLMediaElement, mediaSource: Source, autoplay?: boolean, options?: unknown);
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
    get levels(): Level[];
    set level(level: number);
    get level(): number;
    /**
     * Setup Hls player with options.
     *
     * Some of the options/events will be overridden to improve performance and user's experience.
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
     * Remove all hls.js events and destroy hls.js player instance.
     *
     * @memberof HlsMedia
     */
    private _revoke;
    private _play;
    private _pause;
}
export default HlsMedia;
