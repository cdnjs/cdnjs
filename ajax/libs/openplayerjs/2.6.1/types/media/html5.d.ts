import Source from '../interfaces/source';
import Native from './native';
/**
 * HTML5 Media.
 *
 * @description Class that wraps the native HTML5 media methods
 * @class NativeMedia
 */
declare class HTML5Media extends Native {
    private currentLevel;
    private levelList;
    private isStreaming;
    /**
     * Creates an instance of NativeMedia.
     *
     * @param {HTMLMediaElement} element
     * @param {Source} mediaFile
     * @returns {NativeMedia}
     * @memberof NativeMedia
     */
    constructor(element: HTMLMediaElement, mediaFile: Source);
    /**
     *
     * @inheritDoc
     * @memberof NativeMedia
     */
    canPlayType(mimeType: string): boolean;
    /**
     *
     * @inheritDoc
     * @memberof HTML5Media
     */
    load(): void;
    /**
     *
     * @inheritDoc
     * @returns {HTML5Media}
     * @memberof HTML5Media
     */
    destroy(): HTML5Media;
    get levels(): object[];
    set level(level: any);
    get level(): any;
    /**
     *
     * @inheritDoc
     */
    set src(media: Source);
    private _isDvrEnabled;
    private _readMediadataInfo;
}
export default HTML5Media;
