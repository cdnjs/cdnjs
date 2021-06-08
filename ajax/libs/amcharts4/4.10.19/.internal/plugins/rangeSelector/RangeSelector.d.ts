/**
 * Base class for axis range selector classes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Axis } from "../../charts/axes/Axis";
import { AxisRenderer } from "../../charts/axes/AxisRenderer";
import { Validatable, IValidatableEvents } from "../../core/utils/Validatable";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Language } from "../../core/utils/Language";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines events for [[RangeSelector]].
 */
export interface IRangeSelectorEvents extends IValidatableEvents {
    /**
     * Invoked when position of the control changes.
     */
    positionset: {
        prevPosition: "top" | "bottom" | "left" | "right";
        position: "top" | "bottom" | "left" | "right";
    };
    /**
     * Invoked when control is drawn.
     */
    drawn: {};
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for axis-specific range selectors.
 */
export declare class RangeSelector extends Validatable {
    /**
     * Defines available events.
     */
    _events: IRangeSelectorEvents;
    /**
     * An instance of [[Language]].
     */
    protected _language: MutableValueDisposer<Language>;
    /**
     * Reference to DOM element that holds the control element.
     */
    protected _container: $type.Optional<HTMLElement>;
    /**
     * Control element.
     */
    protected _element: $type.Optional<HTMLElement>;
    /**
     * Prefix for class names applied to control elements.
     */
    protected _classPrefix: string;
    /**
     * If set to `true` [[RangeSelector]] will load it's own external CSS when
     * instantiated.
     */
    protected _defaultStyles: boolean;
    /**
     * Holds references to various HTML elements control consists of.
     */
    protected _elements: {
        wrapper?: HTMLElement;
    };
    /**
     * Position of the selector.
     */
    protected _position: "top" | "bottom" | "left" | "right";
    /**
     * A tabindex to apply to control.
     */
    protected _tabindex: number;
    /**
     * Reference to target axis.
     *
     * @ignore
     */
    _axis: Axis<AxisRenderer>;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)draws the control.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Draws the control.
     *
     * @ignore
     */
    draw(): void;
    /**
     * Destroys the control and all its elements.
     */
    dispose(): void;
    /**
     * Getters and setters
     */
    /**
     * An HTML container to place the control in.
     *
     * A container must be an HTML element, because the control itself is HTML, and
     * cannot be placed into SVG.
     *
     * @param container Reference to container element
     */
    /**
    * @return Container
    */
    container: $type.Optional<HTMLElement>;
    /**
     * Position of the selector.
     *
     * Available options: `"top"`, `"bottom"`, `"left"` (default), and `"right"`.
     *
     * NOTE: since the control is always placed in the external container, this
     * setting does actually affect where the control is placed but rather
     * default CSS that affects how specific elements are arranged.
     *
     * For example, when setting position to `"top"` or `"bottom"`, the control
     * will be arranged in a horizontal fashion.
     *
     * Similarly, for `"left"` and `"right"` the control will arrange itself
     * vertically, which is more suitable for narrow containers.
     *
     * @default "left"
     * @param  value  Position
     */
    /**
    * @return Position
    */
    position: "top" | "bottom" | "left" | "right";
    /**
     * Indicates whether [[RangeSelector]] should load external CSS to style
     * itself.
     *
     * If set to `false`, the elements will not be styled, and will rely on some
     * external CSS.
     *
     * @default true
     * @param Should RangeSelector load its own CSS?
     */
    /**
    * @return Should RangeSelector load its own CSS?
    */
    defaultStyles: boolean;
    /**
     * Loads the default CSS.
     *
     * @ignore Exclude from docs
     */
    loadDefaultCSS(): void;
    /**
     * A tab index for the menu.
     *
     * Tab index will influence the order in which elements on the chart and
     * the whole page are selected when pressing TAB key.
     *
     * @param value Tab index
     */
    /**
    * @return Tab index
    */
    tabindex: number;
    /**
     * A [[Language]] instance.
     *
     * @param value An instance of [[Language]]
     */
    /**
    * @return A [[Language]] instance to be used
    */
    language: Language;
    /**
     * Class name prefix.
     *
     * @default "amexport"
     * @param value Class name prefix
     */
    /**
    * @return Class name prefix
    */
    classPrefix: string;
    /**
     * A target axis to use range selector for.
     *
     * @param  value  Axis
     */
    /**
    * @return Axis
    */
    axis: this["_axis"];
    protected prepAxis(): void;
}
