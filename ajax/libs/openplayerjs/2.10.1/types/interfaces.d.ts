export interface Cue {
    readonly endTime: number;
    readonly identifier: string;
    readonly settings: Record<string, unknown>;
    readonly startTime: number;
    readonly text: string;
}
export interface CueList {
    [language: string]: Cue[];
}
export interface TrackURL {
    [code: string]: string;
}
export interface Track {
    readonly srclang: string;
    readonly src: string;
    /**
     * Possible values (although, OpenPlayerJS only supports the first one):
     *  - `subtitles`
     *  - `captions`
     *  - `descriptions`
     *  - `chapters`
     *  - `metadata`
     *
     * @see https://mzl.la/2HyGCbg
     */
    readonly kind: string;
    readonly default: boolean;
    readonly label: string;
}
export interface SettingsSubItem {
    key: string;
    label?: string;
}
export interface SettingsItem {
    /**
     * Specific class name to be used for:
     *  - Event listeners and dispatchers
     *  - Specific styling
     */
    readonly className: string;
    /**
     * Identifier to indicate the initial value of `Settings` element when created.
     *
     * This element must exist in the `submenu` attribute (if not empty).
     */
    readonly default: string;
    /**
     * Unique identifier to avoid collisions with other items.
     */
    readonly key: string;
    /**
     * Human-readable name of the item.
     */
    readonly name: string;
    /**
     * List of elements to generate a submenu linked to item.
     */
    subitems?: SettingsSubItem[];
}
export interface SettingsSubMenu {
    [key: string]: string;
}
export interface Source {
    src: string;
    type: string;
}
export interface AdsOptions {
    readonly src: string | string[];
    readonly vpaidMode?: 'enabled' | 'disabled' | 'insecure';
    readonly autoPlayAdBreaks?: boolean;
    customClick?: {
        enabled: boolean;
        label: string;
    };
    audioSkip?: {
        enabled: boolean;
        label: string;
        remainingLabel: string;
        element?: string | HTMLElement;
    };
    readonly debug?: boolean;
    readonly enablePreloading?: boolean;
    readonly language?: string;
    readonly loop?: boolean;
    readonly numRedirects?: number;
    readonly publisherId?: string | number;
    sdkPath?: string;
    readonly sessionId?: string;
}
export interface PlayerComponent {
    custom?: boolean;
    /**
     * Create HTML and insert it into OpenPlayer's DOM.
     *
     * This method must include its events setup.
     */
    create(): void;
    /**
     * Remove HTML associated to specific OpenPlayer's element.
     *
     * This method must include the removal of its previously set events.
     */
    destroy(): void;
    addSettings?: () => SettingsItem | unknown;
}
export interface ControlItem {
    readonly icon: string;
    readonly title: string;
    readonly id: string;
    readonly showInAds: boolean;
    position: 'right' | 'left' | 'middle' | string;
    layer?: 'top' | 'center' | 'bottom' | 'main' | string;
    custom?: boolean;
    content?: string;
    subitems?: {
        id: string;
        label: string;
        title?: string;
        icon?: string;
        click(): void;
    }[];
    click(event: Event): void;
    init?(player: unknown): void;
    destroy?(player: unknown): void;
    mouseenter?(event: Event): void;
    mouseleave?(event: Event): void;
    keydown?(event: Event): void;
    blur?(event: Event): void;
    focus?(event: Event): void;
}
export interface CustomMedia {
    /**
     * Store all the native methods to play custom media
     */
    media: {
        [key: string]: any;
    };
    /**
     * Store name of media to be used as key for configuration options
     */
    optionsKey: {
        [key: string]: string;
    };
    /**
     * Store callbacks to determine MIME type based on URL
     */
    rules: ((mediaUrl: string) => string)[];
}
export interface EventsList {
    [key: string]: any;
}
export interface Level {
    /**
     * Media's height to display level based on standards:
     *  - 8K
     *  - 4K
     *  - 1440p
     *  - 1080p
     *  - 720p
     *  - 480p
     *  - 360p
     *  - 240p
     *  - 144p
     */
    readonly height: number;
    readonly id: string;
    readonly label: string;
}
export declare type PlayerLayers = {
    left?: string[];
    middle?: string[];
    right?: string[];
    main?: string[];
    'top-right'?: string[];
    'top-middle'?: string[];
    'top-left'?: string[];
    'bottom-right'?: string[];
    'bottom-middle'?: string[];
    'bottom-left'?: string[];
};
export declare type Languages = {
    [key: string]: string;
};
export declare type PlayerLabels = {
    auto?: string;
    captions?: string;
    click?: string;
    fullscreen?: string;
    lang?: Languages;
    levels?: string;
    live?: string;
    mediaLevels?: string;
    mute?: string;
    off?: string;
    pause?: string;
    play?: string;
    progressRail?: string;
    progressSlider?: string;
    settings?: string;
    speed?: string;
    speedNormal?: string;
    tap?: string;
    toggleCaptions?: string;
    unmute?: string;
    volume?: string;
    volumeControl?: string;
    volumeSlider?: string;
};
export interface PlayerOptions {
    dash?: unknown;
    hls?: unknown;
    flv?: unknown;
    ads?: AdsOptions;
    controls?: {
        alwaysVisible?: boolean;
        layers?: PlayerLayers;
    };
    defaultLevel?: string;
    detachMenus?: boolean;
    forceNative?: boolean;
    height?: number | string;
    hidePlayBtnTimer?: number;
    labels?: PlayerLabels;
    live?: {
        showLabel?: boolean;
        showProgress?: boolean;
    };
    media?: {
        pauseOnClick?: boolean;
    };
    mode?: 'responsive' | 'fill' | 'fit';
    onError?: (e: unknown) => void;
    pauseOthers?: boolean;
    progress?: {
        duration?: number;
        showCurrentTimeOnly?: boolean;
    };
    showLoaderOnInit?: boolean;
    startTime?: number;
    startVolume?: number;
    step?: number;
    width?: number | string;
    [key: string]: unknown;
}
export interface FullscreenDocument extends Document {
    mozFullScreenEnabled?: boolean;
    msFullscreenEnabled?: boolean;
    webkitSupportsFullscreen?: boolean;
    webkitFullscreenEnabled?: boolean;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
    webkitCancelFullScreen?: () => void;
}
export interface FullscreenElement extends HTMLElement {
    webkitRequestFullScreen?: () => void;
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
    webkitCancelFullScreen?: () => void;
    webkitEnterFullscreen?: () => void;
}
