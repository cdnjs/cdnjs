/**
 * Text class deals with all text placed on chart.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { DataItem } from "../DataItem";
import { TextValign } from "../defs/TextValign";
import { TextAlign } from "../defs/TextAlign";
import { IRectangle } from "../defs/IRectangle";
import { AMElement } from "../rendering/AMElement";
import { Group } from "../rendering/Group";
import { MultiDisposer } from "../utils/Disposer";
import { Color } from "../utils/Color";
import { Pattern } from "../rendering/fills/Pattern";
import { LinearGradient } from "../rendering/fills/LinearGradient";
import { RadialGradient } from "../rendering/fills/RadialGradient";
import * as $type from "../utils/Type";
import { Paper } from "../rendering/Paper";
/**
 * Defines properties for [[Text]].
 */
export interface ILabelProperties extends IContainerProperties {
    /**
     * Horizontal align of the text.
     *
     * @default "start"
     */
    textAlign?: TextAlign;
    /**
     * Vertical align of the text.
     *
     * @default "top"
     */
    textValign?: TextValign;
    /**
     * A plain text content.
     */
    text?: string;
    /**
     * Should the lines wrap if they do not fit into max width?
     *
     * @default false
     */
    wrap?: boolean;
    /**
     * Should the text be selectable>
     *
     * @default false
     */
    selectable?: boolean;
    /**
     * HTML content.
     */
    html?: string;
    /**
     * Should the lines be truncated (optionally with ellipsis) if they do not
     * fit into max width?
     *
     * @default false
     */
    truncate?: boolean;
    /**
     * If `truncate` is enabled, should Label try to break only on full words
     * (`true`), or whenever needed, including middle of the word. (`false`)
     *
     * @default true
     */
    fullWords?: boolean;
    /**
     * If lines are truncated, this ellipsis will be added at the end.
     *
     * @default "…"
     */
    ellipsis?: string;
    /**
     * Hide text of it does not fit into element's dimensions?
     *
     * @default false
     */
    hideOversized?: boolean;
    /**
     * If set to `true` square-bracket formatting blocks will be treated as
     * regular text.
     *
     * @default false
     */
    ignoreFormatting?: boolean;
    /**
     * Path string along which text should be arranged
     */
    path?: string;
    /**
     * Relative label location on path.
     */
    locationOnPath?: number;
    /**
     * A ratio to calculate text baseline. Ralative distance from the bottom of
     * the label.
     *
     * @default -0.27
     */
    baseLineRatio?: number;
}
/**
 * Text line information.
 *
 * Objects used to hold cached information about lines in a Text element.
 */
export interface ITextLineInfo {
    /**
     * Measurements for the bounding box of the line.
     */
    "bbox"?: IRectangle;
    /**
     * A reference to an SVG `<g>` element that holds line elements.
     */
    "element"?: Group;
    /**
     * Indicates if line contains more than one element, e.g. has multiple
     * formatted blocks.
     */
    "complex"?: boolean;
    "text"?: string;
    "style"?: string;
}
/**
 * Defines events for [[Text]].
 */
export interface ILabelEvents extends IContainerEvents {
}
/**
 * Adapters for [[Text]].
 *
 * Includes both the [[Adapter]] definitions and properties.
 *
 * @see {@link Adapter}
 */
export interface ILabelAdapters extends IContainerAdapters, ILabelProperties {
    /**
     * Applied to the final formatted label text.
     */
    textOutput: string;
    /**
     * Applied to the final formatted label HTML.
     */
    htmlOutput: string;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Text is used to display highly configurable, data-enabled textual elements.
 *
 * ## Data Binding
 *
 * A Text element can dynamically parse and populate its contents with values
 * from a [[DataItem]].
 *
 * To activate such binding, set element's `dataItem` property.
 *
 * When activated, text contents will be parsed for special tags, e.g.:
 *
 * ```TypeScript
 * label.dataItem = myDataItem;
 * label.text = "The title is: {title}";
 * ```
 * ```JavaScript
 * label.dataItem = myDataItem;
 * label.text = "The title is: {title}";
 * ```
 *
 * The above will automatically replace "{title}" in the string with the
 * actual data value from `myDataItem`.
 *
 * Note, that most often dataItem is set by the Component.
 *
 *
 * @see {@link ILabelEvents} for a list of available events
 * @see {@link ILabelAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-strings/} for info on string formatting and data binding
 * @todo Vertical align
 * @important
 */
export declare class Label extends Container {
    /**
     * Defines available properties.
     */
    _properties: ILabelProperties;
    /**
     * Defines Adapter type.
     */
    _adapter: ILabelAdapters;
    /**
     * Defines available events.
     */
    _events: ILabelEvents;
    /**
     * Indicates if the whole text does not fit into max dimenstions set for it.
     */
    isOversized: boolean;
    /**
     * Currently formatted text, read only.
     */
    currentText: string;
    /**
     * Current format to be used for outputing text.
     */
    protected _currentFormat: string;
    /**
     * [_sourceDataItemEvents description]
     *
     * @todo Description
     */
    protected _sourceDataItemEvents: MultiDisposer;
    protected _prevStatus: string;
    /**
     * SVG path element.
     *
     * @ignore Exclude from docs
     */
    pathElement: $type.Optional<AMElement>;
    /**
     * SVG textpath element.
     *
     * @ignore Exclude from docs
     */
    textPathElement: $type.Optional<Group>;
    /**
     * Constructor
     */
    constructor();
    /**
     * A placeholder method that is called **after** element finishes drawing
     * itself.
     *
     * @ignore Exclude from docs
     */
    protected afterDraw(): void;
    /**
     * Sets [[Paper]] instance to use to draw elements.
     * @ignore
     * @param paper Paper
     * @return true if paper was changed, false, if it's the same
     */
    setPaper(paper: Paper): boolean;
    /**
     * @ignore
     */
    protected handleValidate(): void;
    /**
     * @ignore
     */
    protected handleMaxSize(): void;
    /**
     * [arrange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    arrange(): void;
    /**
     * Updates current text according to data item and supported features.
     * Returns `true` if current text has changed.
     *
     * @return Text changed?
     */
    protected updateCurrentText(): boolean;
    /**
     * Hard invalidate means the text will be redrawn even if it hasn't changed.
     * This is used when we change `fontSize`, `fontFamily`, or for some other
     * reasons.
     */
    hardInvalidate(): void;
    /**
     * Gets line bbox, uses caching to save cpu
     * @ignore
     */
    protected getLineBBox(lineInfo: ITextLineInfo): void;
    /**
     * Draws the textual label.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Hides element if it does not fit into available space
     */
    private maybeHideOversized;
    /**
     * Aligns the lines horizontally and vertically, based on properties.
     *
     * @ignore Exclude from docs
     */
    alignSVGText(): void;
    /**
     * Produces an SVG line element with formatted text.
     *
     * @ignore Exclude from docs
     * @param text    Text to wrap into line
     * @param y       Current line vertical position
     * @return A DOM element
     * @todo Implement HTML support
     */
    getSVGLineElement(text: string, y?: number): Group;
    /**
     * An RTL (right-to-left) setting.
     *
     * RTL may affect alignment, text, and other visual properties.
     *
     * If you set this on a top-level chart object, it will be used for all
     * child elements, e.g. labels, unless they have their own `rtl` setting
     * set directly on them.
     *
     * @param value  `true` for to use RTL
     */
    /**
    * @return RTL?
    */
    rtl: boolean;
    /**
     * Resets cached BBox.
     *
     * @ignore Exclude from docs
     */
    resetBBox(): void;
    /**
     * Creates and returns an HTML line element (`<div>`).
     *
     * @ignore Exclude from docs
     * @param text  Text to add
     * @return `<div>` element reference
     */
    getHTMLLineElement(text: string): HTMLElement;
    /**
     * Applies specific styles to text to make it not selectable, unless it is
     * explicitly set as `selectable`.
     *
     * @ignore Exclude from docs
     * @todo Set styles via AMElement
     */
    setStyles(): void;
    /**
     * Hides unused lines
     */
    protected hideUnused(index: number): void;
    /**
     * An SVG text.
     *
     * Please note that setting `html` will override this setting if browser
     * supports `foreignObject` in SGV, such as most modern browsers excluding
     * IEs.
     *
     * @param value  SVG Text
     */
    /**
    * @return SVG text
    */
    text: string;
    /**
     * An SVG path string to position text along. If set, the text will follow
     * the curvature of the path.
     *
     * Location along the path can be set using `locationOnPath`.
     *
     * IMPORTANT: Only SVG text can be put on path. If you are using HTML text
     * this setting will be ignored.
     *
     * @since 4.1.2
     * @param  value  Path
     */
    /**
    * @return Path
    */
    path: string;
    /**
     * Relative label location on `path`. Value range is from 0 (beginning)
     * to 1 (end).
     *
     * Works only if you set `path` setting to an SVG path.
     *
     * @since 4.1.2
     * @default 0
     * @param  value  Relatvie location on path
     */
    /**
    * @return Relatvie location on path
    */
    locationOnPath: number;
    /**
     * A ratio to calculate text baseline. Ralative distance from the bottom of
     * the label.
     *
     * @since 4.4.2
     * @default -0.27
     * @param  value  Base line ratio
     */
    /**
    * @return Base line ratio
    */
    baseLineRatio: number;
    /**
     * Enables or disables autowrapping of text.
     *
     * @param value  Auto-wrapping enabled
     */
    /**
    * @return Auto-wrap enabled or not
    */
    wrap: boolean;
    /**
     * Indicates if text lines need to be truncated if they do not fit, using
     * configurable `ellipsis` string.
     *
     * `truncate` overrides `wrap` if both are set to `true`.
     *
     * NOTE: For HTML text, this setting **won't** trigger a parser and actual
     * line truncation with ellipsis. It will just hide everything that goes
     * outside the label.
     *
     * @param value  trincate text?
     */
    /**
    * @return Truncate text?
    */
    truncate: boolean;
    /**
     * If `truncate` is enabled, should Label try to break only on full words
     * (`true`), or whenever needed, including middle of the word. (`false`)
     *
     * @default true
     * @param value  Truncate on full words?
     */
    /**
    * @return Truncate on full words?
    */
    fullWords: boolean;
    /**
     * Ellipsis character to use if `truncate` is enabled.
     *
     * @param value Ellipsis string
     * @default "..."
     */
    /**
    * @return Ellipsis string
    */
    ellipsis: string;
    /**
     * Forces the text to be selectable. This setting will be ignored if the
     * object has some kind of interaction attached to it, such as it is
     * `draggable`, `swipeable`, `resizable`.
     *
     * @param value  Text selectable?
     * @default false
     */
    /**
    * @return Text selectable?
    */
    selectable: boolean;
    /**
     * Horizontal text alignment.
     *
     * Available choices:
     * * "start"
     * * "middle"
     * * "end"
     *
     * @param value  Alignment
     */
    /**
    * @return Alignment
    */
    textAlign: TextAlign;
    /**
     * Vertical text alignment.
     *
     * @ignore Exclude from docs (not used)
     * @param value  Alignment
     * @deprecated
     */
    /**
    * @ignore Exclude from docs (not used)
    * @return Alignment
    * @deprecated
    */
    textValign: TextValign;
    /**
     * Raw HTML to be used as text.
     *
     * NOTE: HTML text is subject to browser support. It relies on browsers
     * supporting SVG `foreignObject` nodes. Some browsers (read IEs) do not
     * support it. On those browsers, the text will fall back to basic SVG text,
     * striping out all HTML markup and styling that goes with it.
     *
     * For more information about `foreignObject` and its browser compatibility
     * refer to [this page](https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject#Browser_compatibility).
     *
     * @param value HTML text
     */
    /**
    * @return HTML content
    */
    html: string;
    protected setFill(value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>): void;
    /**
     * Indicates whether the whole text should be hidden if it does not fit into
     * its allotted space.
     *
     * @param value  Hide if text does not fit?
     */
    /**
    * @return Hide if text does not fit?
    */
    hideOversized: boolean;
    /**
     * If set to `true` square-bracket formatting blocks will be treated as
     * regular text.
     *
     * @default false
     * @param value  Ignore formatting?
     */
    /**
    * @return Ignore formatting?
    */
    ignoreFormatting: boolean;
    /**
     * Override `mesaureElement` so it does not get measure again, because
     * internal `_bbox` is being updated by measuring routines in Text itself.
     */
    measureElement(): void;
    /**
     * Returns information about a line element.
     *
     * @ignore Exclude from docs
     * @param index  Line index
     * @return Line info object
     */
    getLineInfo(index: number): ITextLineInfo;
    /**
     * Adds a line to line info cache.
     *
     * @ignore Exclude from docs
     * @param line     Line info object
     * @param index    Insert at specified index
     */
    addLineInfo(line: ITextLineInfo, index: number): void;
    /**
     * Checks if line cache is initialized and initializes it.
     */
    private initLineCache;
    /**
     * Sets a [[DataItem]] to use for populating dynamic sections of the text.
     *
     * Check the description for [[Text]] class, for data binding.
     *
     * @param dataItem Data item
     */
    setDataItem(dataItem: DataItem): void;
    /**
     * Returns available horizontal space.
     *
     * @ignore Exclude from docs
     * @return Available width (px)
     */
    readonly availableWidth: number;
    /**
     * Returns available vertical space.
     *
     * @return Available height (px)
     */
    readonly availableHeight: number;
    getSvgElement(text: string, style?: string, parent?: Group): AMElement;
    /**
     * Invalidates the whole element, including layout AND all its child
     * elements.
     */
    deepInvalidate(): void;
    /**
     * Screen reader title of the element.
     *
     * @param value Title
     */
    /**
    * @return Title
    */
    readerTitle: string;
}
