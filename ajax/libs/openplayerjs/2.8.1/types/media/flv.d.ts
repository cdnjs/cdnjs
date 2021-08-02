import Source from '../interfaces/source';
import Native from './native';
/**
 * FLV Media.
 *
 * @description Class that handles FLV and RTMP files using flv.js within the player
 * @see https://github.com/bilibili/flv.js
 * @class FlvMedia
 */
declare class FlvMedia extends Native {
    #private;
    /**
     * Creates an instance of FlvMedia.
     *
     * @param {HTMLMediaElement} element
     * @param {Source} mediaSource
     * @memberof FlvMedia
     */
    constructor(element: HTMLMediaElement, mediaSource: Source, options?: object);
    /**
     * Provide support via flv.js for modern browsers only
     *
     * @inheritDoc
     * @memberof FlvMedia
     */
    canPlayType(mimeType: string): boolean;
    /**
     *
     * @inheritDoc
     * @memberof FlvMedia
     */
    load(): void;
    /**
     *
     * @inheritDoc
     * @memberof FlvMedia
     */
    destroy(): void;
    /**
     *
     * @inheritDoc
     * @memberof FlvMedia
     */
    set src(media: Source);
    get levels(): any;
    set level(level: number);
    get level(): number;
    /**
     * Setup Flv player with options and config.
     *
     * Some of the options/events will be overriden to improve performance and user's experience.
     *
     * @private
     * @memberof FlvMedia
     */
    private _create;
    /**
     * Custom FLV events
     *
     * These events can be attached to the original node using addEventListener and the name of the event,
     * using or not flvjs.Events object
     * @see https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjsevents
     * @see https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjserrortypes
     * @see https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjserrordetails
     * @param {string} event The name of the FLV event
     * @param {any} data The data passed to the event, could be an object or an array
     * @memberof FlvMedia
     */
    private _assign;
    /**
     * Destroy flvjs player instance.
     *
     * @memberof FlvMedia
     */
    private _revoke;
}
export default FlvMedia;
