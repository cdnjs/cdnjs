import CustomMedia from './interfaces/custom-media';
import Level from './interfaces/level';
import PlayerOptions from './interfaces/player-options';
import Source from './interfaces/source';
/**
 * Media element.
 *
 * @description Class that creates the Media Component in the player.
 * `Media` is the visual/audio entity that results from playing  a valid source (MP4, MP3, M3U8, MPD, etc.)
 * @class Media
 */
declare class Media {
    #private;
    /**
     * Create an instance of Media.
     *
     * @param {HTMLMediaElement} element
     * @param {object} options
     * @param {boolean} autoplay
     * @param {CustomMedia} customMedia
     * @returns {Media}
     * @memberof Media
     */
    constructor(element: HTMLMediaElement, options: PlayerOptions, autoplay: boolean, customMedia: CustomMedia);
    /**
     * Check if player can play the current media type (MIME type).
     *
     * @param {string} mimeType  A valid MIME type, that can include codecs.
     * @see [[Native.canPlayType]]
     * @returns {boolean}
     */
    canPlayType(mimeType: string): boolean;
    /**
     * Check media associated and process it according to its type.
     *
     * It requires to run with Promises to avoid racing errors between execution of the action
     * and the time the potential libraries are loaded completely.
     * It will loop the media list found until it reached the first element that can be played.
     *
     * If none of them can be played, automatically the method destroys the `Media` object.
     *
     * @see [[Native.load]]
     */
    load(): Promise<void>;
    /**
     * Wrapper for `play` method.
     *
     * It returns a Promise to avoid browser's race issues when attempting to pause media.
     * @see https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
     * @see [[Native.play]]
     * @returns {Promise<void>}
     * @memberof Media
     */
    play(): Promise<void>;
    /**
     * Wrapper for `pause` method.
     *
     * It checks if play Promise has been resolved in order to trigger pause
     * to avoid browser's race issues.
     * @see https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
     * @see [[Native.pause]]
     * @memberof Media
     */
    pause(): Promise<void>;
    /**
     * Invoke `destroy` method of current media type.
     *
     * Streaming that uses hls.js or dash.js libraries require to destroy their players and
     * their custom events.
     * @memberof Media
     */
    destroy(): void;
    /**
     * Set one or more media sources.
     *
     * @param {string|object|object[]} media
     * @see [[Native.src]]
     * @memberof Media
     */
    set src(media: Source[]);
    /**
     * Get all media associated with element
     *
     * @see [[Native.src]]
     * @type Source[]
     * @memberof Media
     * @readonly
     */
    get src(): Source[];
    /**
     * Get the current media being played.
     *
     * @type Source
     * @memberof Media
     * @readonly
     */
    get current(): Source;
    /**
     * Set the list of media associated with the current player.
     *
     * @param {Source[]} sources
     * @memberof Media
     */
    set mediaFiles(sources: Source[]);
    /**
     * Get the list of media associated with the current player.
     *
     * @type Source[]
     * @memberof Media
     * @readonly
     */
    get mediaFiles(): Source[];
    /**
     *
     * @see [[Native.volume]]
     * @memberof Media
     */
    set volume(value: number);
    /**
     *
     * @see [[Native.volume]]
     * @type number
     * @memberof Media
     * @readonly
     */
    get volume(): number;
    /**
     *
     * @see [[Native.muted]]
     * @memberof Media
     */
    set muted(value: boolean);
    /**
     *
     * @see [[Native.muted]]
     * @type boolean
     * @memberof Media
     * @readonly
     */
    get muted(): boolean;
    /**
     *
     * @see [[Native.playbackRate]]
     * @memberof Media
     */
    set playbackRate(value: number);
    /**
     *
     * @see [[Native.playbackRate]]
     * @type number
     * @memberof Media
     * @readonly
     */
    get playbackRate(): number;
    /**
     *
     * @see [[Native.defaultPlaybackRate]]
     * @memberof Media
     */
    set defaultPlaybackRate(value: number);
    /**
     *
     * @see [[Native.defaultPlaybackRate]]
     * @type number
     * @memberof Media
     * @readonly
     */
    get defaultPlaybackRate(): number;
    /**
     *
     * @see [[Native.currentTime]]
     * @memberof Media
     */
    set currentTime(value: number);
    /**
     *
     * @see [[Native.currentTime]]
     * @type number
     * @memberof Media
     * @readonly
     */
    get currentTime(): number;
    /**
     *
     * @see [[Native.duration]]
     * @type number
     * @memberof Media
     * @readonly
     */
    get duration(): number;
    /**
     *
     * @see [[Native.paused]]
     * @type boolean
     * @memberof Media
     * @readonly
     */
    get paused(): boolean;
    /**
     *
     * @see [[Native.ended]]
     * @type boolean
     * @memberof Media
     * @readonly
     */
    get ended(): boolean;
    /**
     *
     * @memberof Media
     */
    set loaded(loaded: boolean);
    /**
     *
     * @type boolean
     * @memberof Media
     */
    get loaded(): boolean;
    /**
     *
     * @memberof Media
     */
    set level(value: number | string | Level);
    /**
     *
     * @memberof Media
     * @readonly
     */
    get level(): number | string | Level;
    /**
     *
     * @memberof Media
     * @readonly
     */
    get levels(): any;
    /**
     *
     * @memberof Media
     * @readonly
     */
    get instance(): any;
    /**
     * Gather all media sources within the video/audio/iframe tags.
     *
     * It will be grouped inside the `mediaFiles` array. This method basically mimics
     * the native behavior when multiple sources are associated with an element, and
     * the browser takes care of selecting the most appropriate one.
     * @returns {Source[]}
     * @memberof Media
     */
    private _getMediaFiles;
    /**
     * Instantiate media object according to current media type.
     *
     * @param {Source} media
     * @returns {(HlsMedia|DashMedia|HTML5Media|any)}
     * @memberof Media
     */
    private _invoke;
}
export default Media;
