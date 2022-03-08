import { LitElement } from "lit";
import { TemplateResult } from "lit/html.js";
export declare enum PlayerState {
    Destroyed = "destroyed",
    Error = "error",
    Frozen = "frozen",
    Loading = "loading",
    Paused = "paused",
    Playing = "playing",
    Stopped = "stopped"
}
export declare enum PlayMode {
    Bounce = "bounce",
    Normal = "normal"
}
export declare enum PlayerEvents {
    Complete = "complete",
    Destroyed = "destroyed",
    Error = "error",
    Frame = "frame",
    Freeze = "freeze",
    Load = "load",
    Loop = "loop",
    Pause = "pause",
    Play = "play",
    Ready = "ready",
    Rendered = "rendered",
    Stop = "stop"
}
/**
 * Parse a resource into a JSON object or a URL string
 */
export declare function parseSrc(src: string | object): string | object;
/**
 * LottiePlayer web component class
 *
 * @export
 * @class LottiePlayer
 * @extends {LitElement}
 */
export declare class LottiePlayer extends LitElement {
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
    renderer: "svg";
    /**
     * seeker
     */
    seeker: any;
    /**
     * Animation speed.
     */
    speed: number;
    /**
     * Bodymovin JSON data or URL to JSON.
     */
    src?: string;
    /**
     * Enable web workers
     */
    webworkers?: boolean;
    /**
     * Animation container.
     */
    protected container: HTMLElement;
    private _io;
    private _lottie?;
    private _prevState?;
    private _counter;
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(src: string | object): Promise<void>;
    /**
     * Returns the lottie-web instance used in the component.
     */
    getLottie(): any;
    /**
     * Start playing animation.
     */
    play(): void;
    /**
     * Pause animation play.
     */
    pause(): void;
    /**
     * Stops animation play.
     */
    stop(): void;
    /**
     * Destroy animation and lottie-player element.
     */
    destroy(): void;
    /**
     * Seek to a given frame.
     */
    seek(value: number | string): void;
    /**
     * Snapshot the current frame as SVG.
     *
     * If 'download' argument is boolean true, then a download is triggered in browser.
     */
    snapshot(download?: boolean): string | void;
    /**
     * Sets animation play speed.
     *
     * @param value Playback speed.
     */
    setSpeed(value?: number): void;
    /**
     * Animation play direction.
     *
     * @param value Direction values.
     */
    setDirection(value: number): void;
    /**
     * Sets the looping of the animation.
     *
     * @param value Whether to enable looping. Boolean true enables looping.
     */
    setLooping(value: boolean): void;
    /**
     * Toggle playing state.
     */
    togglePlay(): void;
    /**
     * Toggles animation looping.
     */
    toggleLooping(): void;
    /**
     * Resize animation.
     */
    resize(): void;
    /**
     * Returns the styles for the component.
     */
    static get styles(): import("lit").CSSResult;
    /**
     * Cleanup on component destroy.
     */
    disconnectedCallback(): void;
    render(): TemplateResult | void;
    /**
     * Initialize everything on component first render.
     */
    protected firstUpdated(): void;
    protected renderControls(): TemplateResult;
    /**
     * Handle visibility change events.
     */
    private _onVisibilityChange;
    /**
     * Handles click and drag actions on the progress track.
     */
    private _handleSeekChange;
    private _attachEventListeners;
    /**
     * Freeze animation play.
     * This internal state pauses animation and is used to differentiate between
     * user requested pauses and component instigated pauses.
     */
    private freeze;
}
//# sourceMappingURL=lottie-player.d.ts.map