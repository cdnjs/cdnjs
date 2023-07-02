import { LitElement, CSSResult } from 'lit';
import { TemplateResult } from 'lit/html.js';
import { AnimationItem } from 'lottie-web';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare enum PlayerState {
    Destroyed = "destroyed",
    Error = "error",
    Frozen = "frozen",
    Loading = "loading",
    Ready = "ready",
    Paused = "paused",
    Playing = "playing",
    Stopped = "stopped"
}
declare enum PlayMode {
    Bounce = "bounce",
    Normal = "normal"
}
interface Versions {
    lottiePlayerVersion: string;
    lottieWebVersion: string;
}
interface InternalPlayerState {
    background: string;
    currentState: PlayerState;
    frame: number;
    seeker: number;
    autoplay: boolean;
    direction: number;
    hover: boolean;
    intermission: number;
    loop: boolean;
    count?: number;
    playMode: PlayMode;
    speed: number;
}
/**
 * LottiePlayer web component class
 *
 */
declare class LottiePlayer extends LitElement {
    /**
     * Autoplay animation on load.
     */
    autoplay: boolean;
    /**
     * Background color.
     */
    background?: string;
    /**
     * Show controls.
     */
    controls: boolean;
    /**
     * Number of times to loop animation.
     */
    count?: number;
    /**
     * Player state.
     */
    currentState: PlayerState;
    /**
     * Animation description for screen readers.
     */
    description: string;
    /**
     * Direction of animation.
     */
    direction: number;
    /**
     * Disable checking if the Lottie is valid before loading
     */
    disableCheck?: boolean;
    /**
     * Disable using shadow dom as the root
     */
    disableShadowDOM: boolean;
    /**
     * Whether to play on mouse hover
     */
    hover: boolean;
    /**
     * Intermission
     */
    intermission: number;
    /**
     * Whether to loop animation.
     */
    loop: boolean;
    /**
     * Play mode.
     */
    mode: PlayMode;
    /**
     * Aspect ratio to pass to lottie-web.
     */
    preserveAspectRatio: string;
    /**
     * Renderer to use.
     */
    renderer: 'svg' | 'canvas';
    /**
     * seeker
     */
    seeker: number;
    /**
     * Animation speed.
     */
    speed: number;
    /**
     * Bodymovin JSON data or URL to JSON.
     */
    src?: string;
    /**
     * Viewbox size for renderer settings
     */
    viewBoxSize?: string;
    /**
     * Enable web workers
     */
    webworkers?: boolean;
    /**
     * Animation container.
     */
    protected container: HTMLElement;
    private _counter;
    private _io;
    private _lottie?;
    /**
     * Destroy animation and lottie-player element.
     */
    destroy(): void;
    /**
     * Cleanup on component destroy.
     */
    disconnectedCallback(): void;
    /**
     * Returns the lottie-web instance used in the component.
     */
    getLottie(): any;
    /**
     * Returns the lottie-web version and this player's version
     */
    getVersions(): Versions;
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(src: string | AnimationItem): Promise<void>;
    /**
     * Pause animation play.
     */
    pause(): void;
    /**
     * Start playing animation.
     */
    play(): void;
    getState(): InternalPlayerState;
    render(): TemplateResult | void;
    /**
     * Resize animation.
     */
    resize(): void;
    /**
     * Seek to a given frame.
     */
    seek(value: number | string): void;
    /**
     * Animation play direction.
     *
     * @param value - Direction values.
     */
    setDirection(value: 1 | -1): void;
    /**
     * Sets the looping of the animation.
     *
     * @param value - Whether to enable looping. Boolean true enables looping.
     */
    setLooping(value: boolean): void;
    /**
     * Sets animation play speed.
     *
     * @param value - Playback speed.
     */
    setSpeed(value?: number): void;
    /**
     * Snapshot the current frame as SVG.
     *
     * If 'download' argument is boolean true, then a download is triggered in browser.
     */
    snapshot(download?: boolean): string;
    /**
     * Stops animation play.
     */
    stop(): void;
    /**
     * Toggles animation looping.
     */
    toggleLooping(): void;
    /**
     * Toggle playing state.
     */
    togglePlay(): void;
    /**
     * Returns the styles for the component.
     */
    static get styles(): CSSResult;
    protected createRenderRoot(): Element | ShadowRoot;
    /**
     * Initialize everything on component first render.
     */
    protected firstUpdated(): Promise<void>;
    protected renderControls(): TemplateResult;
    private _attachEventListeners;
    /**
     * Freeze animation play.
     * This internal state pauses animation and is used to differentiate between
     * user requested pauses and component instigated pauses.
     */
    private _freeze;
    /**
     * Handles click and drag actions on the progress track.
     */
    private _handleSeekChange;
    /**
     * Handle visibility change events.
     */
    private _onVisibilityChange;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

/**
 * TGSPlayer web component class
 *
 * @export
 * @class TGSPlayer
 * @extends {LottiePlayer}
 */
declare class TGSPlayer extends LottiePlayer {
    /**
     * Strict format checks for TGS.
     */
    strict: boolean;
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(src: string | AnimationItem): Promise<void>;
    /**
     * Returns the styles for the component.
     */
    static get styles(): CSSResult;
    protected formatCheck(data: any): string[];
    private checkLayer;
    private checkItems;
}

export { TGSPlayer };
