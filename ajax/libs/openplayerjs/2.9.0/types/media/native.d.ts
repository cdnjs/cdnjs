import Level from '../interfaces/level';
import Source from '../interfaces/source';
/**
 * Native Media.
 *
 * @description Class that mimics the HTML5 MediaElement's standard methods.
 * All the methods are available for the different types of media; the exceptions
 * are the getter/setter of a source, load it and determine if media can be played,
 * since each one of the media types handle those in a different way.
 *
 * @abstract
 * @class Native
 */
declare abstract class Native {
    #private;
    /**
     * Native video/audio tag.
     *
     * @type HTMLMediaElement
     * @memberof Native
     */
    element: HTMLMediaElement;
    /**
     * The current media source element.
     *
     * @type Source
     * @memberof Native
     */
    media: Source;
    /**
     * Promise to be resolved once media starts playing to avoid race issues.
     *
     * @type Promise<any>
     * @memberof Native
     */
    promise: Promise<unknown>;
    /**
     * Create an instance of Native.
     *
     * @param {HTMLMediaElement} element The `video/audio` source.
     * @param {Source} media The `Media` instance.
     * @memberof Native
     */
    constructor(element: HTMLMediaElement, media: Source);
    /**
     * Check if player can play the current media type (MIME type).
     *
     * @abstract
     * @param {string} mimeType
     * @returns {boolean}
     * @memberof Native
     */
    abstract canPlayType(mimeType: string): boolean;
    /**
     * Prepare current media to be played.
     *
     * @abstract
     * @memberof Native
     */
    abstract load(): void;
    /**
     * Execute any callbacks to destroy the current media element.
     *
     * @abstract
     * @returns {any}
     * @memberof Native
     */
    abstract destroy(): any;
    /**
     * Set a new media source.
     *
     * @abstract
     * @memberof Native
     */
    abstract set src(media: Source);
    /**
     * Return the current media source.
     *
     * @abstract
     * @returns {Source}
     * @memberof Native
     */
    abstract get src(): Source;
    /**
     *
     * @abstract
     * @memberof Media
     */
    abstract set level(value: number | string | Record<string, unknown>);
    /**
     *
     * @abstract
     * @memberof Media
     */
    abstract get level(): number | string;
    /**
     *
     * @abstract
     * @memberof Media
     */
    abstract get levels(): Level[];
    /**
     *
     * @memberof Media
     */
    set instance(customPlayer: any);
    /**
     *
     * @returns {any}
     * @memberof Media
     */
    get instance(): any;
    /**
     * Play current media.
     *
     * @memberof Native
     */
    play(): Promise<void>;
    /**
     * Pause current media.
     *
     * @memberof Native
     */
    pause(): void;
    /**
     * Set the current media's volume level.
     *
     * @memberof Native
     */
    set volume(value: number);
    /**
     * Retrieve current media's volume level.
     *
     * @returns {number}
     * @memberof Native
     */
    get volume(): number;
    /**
     * Set the current media's muted status.
     *
     * @memberof Native
     */
    set muted(value: boolean);
    /**
     * Retrieve the current media's muted status.
     *
     * @returns {boolean}
     * @memberof Native
     */
    get muted(): boolean;
    /**
     * Set the current media's playback rate.
     *
     * @memberof Native
     */
    set playbackRate(value: number);
    /**
     * Retrieve the current media's playback rate.
     *
     * @returns {number}
     * @memberof Native
     */
    get playbackRate(): number;
    /**
     * Set the current media's playback rate.
     *
     * @memberof Native
     */
    set defaultPlaybackRate(value: number);
    /**
     * Retrieve the current media's playback rate.
     *
     * @returns {number}
     * @memberof Native
     */
    get defaultPlaybackRate(): number;
    /**
     * Set the current media's current time position.
     *
     * @memberof Native
     */
    set currentTime(value: number);
    /**
     * Retrieve the current media's current time position.
     *
     * @returns {number}
     * @memberof Native
     */
    get currentTime(): number;
    /**
     * Retrieve the current media's current duration.
     *
     * @returns {number}
     * @memberof Native
     */
    get duration(): number;
    /**
     * Retrieve the current media's paused status.
     *
     * @returns {boolean}
     * @memberof Native
     */
    get paused(): boolean;
    /**
     * * Retrieve the current media's ended status.
     *
     * @returns {boolean}
     * @memberof Native
     */
    get ended(): boolean;
}
export default Native;
