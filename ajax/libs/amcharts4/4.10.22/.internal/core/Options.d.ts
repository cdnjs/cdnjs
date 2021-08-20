/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ILocale } from "./utils/Language";
/**
 * Defines system-wide options for amCharts 4.
 *
 * Accessible via singleton object `am4core.options`.
 *
 * Options set here are will be applicable to all charts created afterwards.
 *
 * E.g.:
 *
 * ```TypeScript
 * am4core.options.autoSetClassName = true;
 * ```
 * ```JavaScript
 * am4core.options.autoSetClassName = true;
 * ```
 */
export interface Options {
    /**
     * Console output enabled.
     */
    verbose: boolean;
    /**
     * @ignore
     */
    commercialLicense: boolean;
    /**
     * amCharts will add `class` property to some elements. All those class names
     * will be prefixed by `classNamePrefix`.
     *
     * @default "amcharts-"
     */
    classNamePrefix: string;
    /**
     * Normally, the chart will create its elements without any `className`
     * attributes.
     *
     * If you set this to `true`, it will set class names that will reflect
     * the actual class this the SVG element corresponds to.
     *
     * The className will contain class prefixed with `amcharts-`. (prefix is
     * configurable via `classNamePrefix`)
     *
     * E.g. `"amcharts-button"`.
     *
     * @default false
     */
    autoSetClassName: boolean;
    /**
     * A default locale to auto-apply to all new charts created.
     */
    defaultLocale?: ILocale;
    /**
     * When multi-segment lines ([[Polyline]]) are drawn some points may be
     * simplified if they are closer than `minPolylineStep`.
     *
     * The bigger this value, the more simplified lines will come out.
     *
     * This setting will effect [[LineSeries]] and derivative classes.
     *
     * IMPORTANT: This setting is not compatible with [[StepLineSeries]].
     *
     * @default 0.5
     * @since 4.2.5
     */
    minPolylineStep?: number;
    /**
     * Whether the chart should only display when its container is visible
     * on the document viewport.
     *
     * This setting can be combined with `queue` for better performance.
     *
     * NOTE: if your charts are located in the scrollable container, make sure
     * you also set `viewportTarget` to a reference for that container.
     *
     * @default false
     * @since 4.5.0
     */
    onlyShowOnViewport: boolean;
    /**
     * A reference to the HTML element to be used as a secondary viewport for
     * charts.
     *
     * Use this if you are placing charts in a scrollable container and using
     * with `onlyShowOnViewport = true`.
     *
     * @since 4.7.4
     */
    viewportTarget?: HTMLElement | HTMLElement[];
    /**
     * Whether to queue all charts rendering. One chart will be rendered at a time. The next
     * chart starts to render after the previous chart's ready event.
     *
     * This setting can be combined with `onlyShowOnViewport` for better performance.
     *
     * @default false
     * @since 4.5.0
     */
    queue: boolean;
    /**
     * Whether to automatically dispose the charts when they're removed from the DOM.
     *
     * @default false
     * @since 4.9.25
     */
    autoDispose: boolean;
    /**
     * List of applied licenses.
     *
     * @type {String[]}
     */
    licenses: String[];
    /**
     * Should error modals be suppressed from displaying.
     *
     * Errors might originate from setting validation code, or generic JS-thrown
     * errors.
     *
     * @since 4.9.13
     * @default false
     */
    suppressErrors: boolean;
    /**
     * Should warnings be suppressed from displaying.
     *
     * @since 4.9.29
     * @default false
     */
    suppressWarnings: boolean;
    /**
     * Set this to `false` to effectivly disable all animations on all charts
     * regardless of themes used or individual animation properties.
     *
     * @since 4.9.14
     * @default false
     */
    animationsEnabled: boolean;
    /**
     * If set, amCharts will use this as a nonce-parameter for all dynamically
     * created stylesheets, so it can be addressed in `Content-Security-Policy`
     * headers.
     *
     * @since 4.9.17
     */
    nonce: string;
    /**
     * When charts are created using `am4core.createDeferred()`, this parameter
     * determines number of milliseconds to wait between creation of each chart.
     *
     * @default 100
     * @since 4.10.0
     */
    deferredDelay: number;
    /**
     * Should hovering of objects be disabled when some other element is being
     * transfored, e.g. dragged or resized.
     *
     * Available options:
     * * `"never"` (default) - hovers are never disabled.
     * * `"touch"` - hovers are disabled only if transforming via touch screen.
     * *`"always"` - hovers are disabled on all transforming actions.
     *
     * @default "never"
     * @since 4.10.1
     */
    disableHoverOnTransform: "never" | "touch" | "always";
    /**
     * A precision (number of decimals) to be used for paths/lines/points
     * when `pixelPerfect = true`.
     *
     * @default 0
     * @since 4.10.11
     */
    pixelPerfectPrecision: number;
}
/**
 * Global options.
 */
export declare const options: Options;
