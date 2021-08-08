/**
 * Popup class is used to display information over chart area.
 */
import { Adapter } from "../utils/Adapter";
import { BaseObjectEvents } from "../Base";
import { Sprite } from "../Sprite";
import { InteractionObject } from "../interaction/InteractionObject";
import { Percent } from "../utils/Percent";
import { Align } from "../defs/Align";
import { VerticalAlign } from "../defs/VerticalAlign";
import { IPoint } from "../defs/IPoint";
import { Optional } from "../utils/Type";
import * as $type from "../utils/Type";
/**
 * Represents a list of available adapters for Export.
 */
export interface IPopupAdapters {
    /**
     * Applied to the class prefixes.
     */
    classPrefix: string;
    /**
     * Applied to popup content before it is shown.
     */
    content: string;
    /**
     * Applied to popup title before it is shown.
     */
    title: string;
    /**
     * Applied to the screen reader title.
     */
    readerTitle: string;
    /**
     * Applied to default `defaultStyles` property before it is retrieved.
     */
    defaultStyles: boolean;
    /**
     * Applied to default `showCurtain` property before it is retrieved.
     */
    showCurtain: boolean;
    /**
     * Applied to default `draggable` property before it is retrieved.
     */
    draggable: boolean;
    /**
     * Applied to `closable` property before it is retrieved.
     */
    closable: boolean;
    /**
     * Applied to `dynamicResize` property before it is retrieved.
     */
    dynamicResize: boolean;
    /**
     * Applied to `fitTo` property before it's retrieved.
     *
     * @ignore Feature not yet implemented
     */
    fitTo: "none" | "container" | "window";
    /**
     * Applied to horizontal alignment of the popup.
     */
    align: Optional<Align>;
    /**
     * Applied to vertical alignment of the popup.
     */
    verticalAlign: Optional<VerticalAlign>;
    /**
     * Applied to `left` position value.
     */
    left: number | Percent;
    /**
     * Applied to `right` position value.
     */
    right: number | Percent;
    /**
     * Applied to `top` position value.
     */
    top: number | Percent;
    /**
     * Applied to `bottom` position value.
     */
    bottom: number | Percent;
    /**
     * Applied to class names list that are added as class for various popup
     * elements.
     */
    classNames: {
        wrapperClass: string;
        titleClass: string;
        headerClass: string;
        contentClass: string;
        insideClass: string;
        curtainClass: string;
        closeClass: string;
    };
}
/**
 * Defines events for Popup.
 */
export interface IPopupEvents {
    /**
     * Invoked when Popup is opened.
     */
    opened: {};
    /**
     * Invoked when Popup is closed.
     */
    closed: {};
}
/**
 * Shows an HTML popup which covers window or a chart area.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/popups-and-modals/} For examples and docs on Popups and Modals.
 * @todo Positioning over whole window
 */
export declare class Popup extends BaseObjectEvents {
    /**
     * Defines available events.
     */
    _events: IPopupEvents;
    /**
     * Defines available adapters.
     */
    _adapter: IPopupAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<Popup, IPopupAdapters>;
    /**
     * A reference to an HTML element to be used for container. If not set, popup
     * will cover the whole window.
     */
    container: $type.Optional<HTMLElement | Document>;
    /**
     * A parent element this Popup belongs to.
     */
    sprite: $type.Optional<Sprite>;
    /**
     * Holds references to various HTML elements, Popup consists of.
     */
    protected _elements: {
        wrapper?: HTMLElement;
        title?: HTMLElement;
        header?: HTMLElement;
        content?: HTMLElement;
        close?: HTMLElement;
        curtain?: HTMLElement;
    };
    /**
     * Holdes Interaction objects for various Popup's elements.
     */
    protected _IOs: {
        wrapper?: InteractionObject;
        content?: InteractionObject;
        header?: InteractionObject;
        close?: InteractionObject;
        curtain?: InteractionObject;
    };
    /**
     * Contents of popup window.
     */
    protected _content: string;
    /**
     * Title of the popup window.
     */
    protected _title: string;
    /**
     * Prefix to apply to class names for popup elements.
     */
    protected _classPrefix: string;
    /**
     * If set to `true` [[Popup]] will use default styles.
     */
    protected _defaultStyles: boolean;
    /**
     * If set to `true` [[Popup]] will dim out all chart content behind it by
     * showing a semi-transparent fill. (curtain)
     */
    protected _showCurtain: boolean;
    /**
     * Indicates whether popup can be dragged.
     */
    protected _draggable: boolean;
    /**
     * Horizontal position of the content window.
     */
    protected _align: Optional<Align>;
    /**
     * Resize popup as images are being loaded.
     */
    protected _dynamicResize: boolean;
    /**
     * Vertical position of the content window.
     */
    protected _verticalAlign: Optional<VerticalAlign>;
    /**
     * Shift in position of the element. (used for dragging)
     */
    protected _shift: IPoint;
    /**
     * Temporary shift in position of the element. (used for dragging)
     */
    protected _tempShift: IPoint;
    /**
     * "left" position of the popup content.
     */
    protected _left: number | Percent;
    /**
     * "right" position of the popup content.
     */
    protected _right: number | Percent;
    /**
     * "top" position of the popup content.
     */
    protected _top: number | Percent;
    /**
     * "bottom" position of the popup content.
     */
    protected _bottom: number | Percent;
    /**
     * A title for screen readers. It is very highly recommended to set that title
     * so that people using screen reader tools can get an immediate summary of
     * the information in the popup.
     */
    _readerTitle: string;
    /**
     * Is popup closable?
     */
    private _closable;
    /**
     * Was CSS already loaded?
     */
    private _cssLoaded;
    /**
     * If set to other than "none" will try to re-adjust the position of the
     * popop to fit within chart container or browser window.
     *
     * @ignore Feature not yet implemented
     * @todo Implement
     */
    private _fitTo;
    /**
     * Used to log original value of `interactionsEnabled` so that it can be restored
     * after temporarily disabling it.
     */
    private _spriteInteractionsEnabled;
    /**
     * Identifies if this object is a "template" and should not be treated as
     * real object that is drawn or actually used in the chart.
     *
     * @ignore Exclude from docs
     */
    isTemplate: boolean;
    /**
     * Indicates if the element was already sized and should not be measured for
     * size again, saving some precious resources.
     */
    private _sized;
    /**
     * Cached bounding rectangle info.
     */
    private _bbox;
    /**
     * Constructor
     */
    constructor();
    /**
     * Shows popup window.
     */
    open(): void;
    /**
     * Hides popup window.
     */
    close(): void;
    /**
     * Destroy (dispose) popup.
     */
    dispose(): void;
    /**
     * Positions content element in the center of popup based on its actual size.
     *
     * @ignore Exclude from docs
     */
    positionElement(forceResize?: boolean): void;
    protected setupDragging(): void;
    protected toStyle(value: number | Percent): string | null;
    /**
     * A prefix that is applied to class names of various popup elements.
     *
     * @return Class name prefix
     */
    /**
    * @param value Class name prefix
    */
    classPrefix: string;
    /**
     * Returns raw prefix (without adapters applied).
     *
     * @ignore Exclude from docs
     * @return Class name prefix
     */
    readonly classPrefixRaw: string;
    /**
     * Popup content.
     *
     * Popup content can be any valid HTML, including CSS.
     *
     * @param value Popup content
     */
    /**
    * @return Popup content
    */
    content: string;
    protected getClassNames(): {
        wrapperClass: string;
        titleClass: string;
        headerClass: string;
        contentClass: string;
        insideClass: string;
        curtainClass: string;
        closeClass: string;
    };
    /**
     * Creates content element.
     */
    protected createContentElement(): void;
    /**
     * Popup title.
     *
     * Popup title can be any valid HTML, including CSS.
     *
     * @param value  Popup title
     */
    /**
    * @return Popup title
    */
    title: string;
    /**
     * A title for screen readers. It is very highly recommended to set that title
     * so that people using screen reader tools can get an immediate summary of
     * the information in the popup.
     *
     * @param value  Reader title
     */
    /**
    * @return Popup content
    */
    readerTitle: string;
    /**
     * Is popup closable?
     *
     * If it is, it can be closed in a number of ways, e.g. by hitting ESC key,
     * clicking curtain, or clicking the close button.
     *
     * If it is not closable, the only way to close it is via `close()` call.
     *
     * @param value Closable?
     */
    /**
    * @return Closable?
    */
    closable: boolean;
    /**
     * If set to other than "none" will try to re-adjust the position of the
     * popop to fit within chart container or browser window.
     *
     * @ignore
     * @todo Implement
     * @default "window"
     * @param value  Fit option
     */
    /**
    * @ignore
    * @todo Implement
    * @return Fit option
    */
    fitTo: "none" | "container" | "window";
    /**
     * Should popup use default CSS?
     *
     * If default CSS is disabled, an external CSS should handle the look of the
     * popup, since it will look quite out of place otherwise.
     *
     * @default true
     * @param Use default CSS?
     */
    /**
    * @return Use default CSS?
    */
    defaultStyles: boolean;
    /**
     * Should popup use dim out all content behind it?
     *
     * @default false
     * @param Show curtain?
     */
    /**
    * @return Show curtain?
    */
    showCurtain: boolean;
    /**
     * Creates curtain element.
     */
    protected createCurtainElement(): void;
    /**
     * Can the popup be dragged with a pointer?
     *
     * @default false
     * @param Show curtain?
     */
    /**
    * @return Show curtain?
    */
    draggable: boolean;
    /**
     * Resize popup as images are being loaded.
     *
     * @default true
     * @since 4.9.17
     * @param Resize dynamically?
     */
    /**
    * @return Resize dynamically?
    */
    dynamicResize: boolean;
    /**
     * Horizontal positioning of the content window.
     *
     * Available options: "left", "center" (default), "right", and "none".
     *
     * @default "center"
     * @param Horizontal position
     */
    /**
    * @return Horizontal position
    */
    align: Align;
    /**
     * Vertical positioning of the content window.
     *
     * Available options: "top", "middle" (default), "bottom", and "none".
     *
     * @default "middle"
     * @param Vertical position
     */
    /**
    * @return Vertical position
    */
    verticalAlign: VerticalAlign;
    /**
     * "left" coordinate of a non-aligned (`align = "none"`) popup.
     *
     * Can be either absolute pixel value, or relative (`Percent`).
     *
     * Setting this property will automatically set `align` to "none".
     *
     * NOTE: The position is relative to the chart container.
     *
     * @param Left
     */
    /**
    * @return Left
    */
    left: number | Percent;
    /**
     * "right" coordinate of a non-aligned (`align = "none"`) popup.
     *
     * Can be either absolute pixel value, or relative (`Percent`).
     *
     * Setting this property will automatically set `align` to "none".
     *
     * NOTE: The position is relative to the chart container.
     *
     * @param Right
     */
    /**
    * @return Right
    */
    right: number | Percent;
    /**
     * "top" coordinate of a non-aligned (`verticalAlign = "none"`) popup.
     *
     * Can be either absolute pixel value, or relative (`Percent`).
     *
     * Setting this property will automatically set `verticalAlign` to "none".
     *
     * NOTE: The position is relative to the chart container.
     *
     * @param Top
     */
    /**
    * @return Top
    */
    top: number | Percent;
    /**
     * "bottom" coordinate of a non-aligned (`verticalAlign = "none"`) popup.
     *
     * Can be either absolute pixel value, or relative (`Percent`).
     *
     * Setting this property will automatically set `verticalAlign` to "none".
     *
     * NOTE: The position is relative to the chart container.
     *
     * @param Bottom
     */
    /**
    * @return Bottom
    */
    bottom: number | Percent;
    /**
     * Returns an object with references to various elements of the Popup.
     *
     * * `wrapper`
     * * `title`
     * * `content`
     * * `close`
     * * `curtain`
     */
    readonly elements: {
        wrapper?: HTMLElement;
        title?: HTMLElement;
        content?: HTMLElement;
        close?: HTMLElement;
        curtain?: HTMLElement;
    };
    /**
     * Loads popup CSS.
     *
     * @ignore Exclude from docs
     */
    loadDefaultCSS(): void;
    /**
     * If popup is closable, this method adds various events to popup elements.
     */
    protected applyEvents(): void;
    /**
     * Disables interactivity on parent chart.
     */
    protected disablePointers(): void;
    /**
     * Releases temporarily disabled pointers on parent chart.
     */
    protected releasePointers(): void;
    /**
     * Sets screen reader related settings.
     */
    protected applyReaderSettings(): void;
    /**
     * Copies all properties and related data from different element.
     *
     * @param object Source element
     */
    copyFrom(source: this): void;
}
