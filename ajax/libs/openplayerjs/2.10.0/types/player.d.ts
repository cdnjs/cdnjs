import Controls from './controls';
import { ControlItem, CustomMedia, EventsList, PlayerOptions, Source, Track } from './interfaces';
import Media from './media';
import Ads from './media/ads';
declare class Player {
    #private;
    static instances: {
        [id: string]: Player;
    };
    static customMedia: CustomMedia;
    static init(): void;
    static addMedia(name: string, mimeType: string, valid: (url: string) => string, media: Source): void;
    loader: HTMLSpanElement;
    playBtn: HTMLButtonElement;
    proxy: any;
    constructor(element: HTMLMediaElement | string, options?: PlayerOptions);
    init(): Promise<void>;
    load(): Promise<void> | void;
    play(): Promise<void>;
    pause(): void;
    destroy(): void;
    getContainer(): HTMLElement;
    getControls(): Controls;
    getCustomControls(): ControlItem[];
    getElement(): HTMLMediaElement;
    /**
     * Retrieve the events attached to the player.
     *
     * This list does not include individual events associated with other player's components.
     * @returns {EventsList}
     * @memberof Player
     */
    getEvents(): EventsList;
    getOptions(): PlayerOptions;
    activeElement(): Ads | Media;
    isMedia(): boolean;
    isAd(): boolean;
    getMedia(): Media;
    getAd(): Ads;
    addCaptions(args: Track): void;
    addControl(args: ControlItem): void;
    removeControl(controlName: string): void;
    _prepareMedia(): Promise<void>;
    enableDefaultPlayer(): void;
    loadAd(src: string | string[]): Promise<void>;
    set src(media: Source[]);
    get src(): Source[];
    get id(): string;
    private _isValid;
    private _wrapInstance;
    private _createControls;
    private _createUID;
    private _createPlayButton;
    private _setEvents;
    private _autoplay;
    private _mergeOptions;
    private _enableKeyBindings;
}
export default Player;
