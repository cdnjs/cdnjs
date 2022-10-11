/**
 * Plugin which enables annotation functionality for charts.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { fabric } from "../../fabric/fabric.js";
import { Plugin } from "../../core/utils/Plugin";
import { IExportCustomOptions } from "../../core/export/Export";
import { Color } from "../../core/utils/Color";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A plugin which automatically groups [[PercenSeries]] slices that are smaller
 * than certain percent into one "Other" slice.
 *
 * By pushing an instance of [[Annnotation]] into `plugin` list of
 * any [[Chart]], it automatically applies the functionality.
 *
 * Example:
 *
 * ```TypeScript
 * let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
 * ```
 * ```JavaScript
 * let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
 * ```
 * ```JSON
 * {
 *   "plugins": [{
 *     "type": "Annotation"
 *   }]
 * }
 * ```
 *
 * @since 4.5.5
 *
 * @todo resolve translations
 * @todo change mouse cursors based on context/tool
 * @todo better line selection on click
 * @todo arrow support
 * @todo undo/redo
 * @todo reposition/resize annotations on chart resize
 * @todo make annotations hold on IE (when in not annotation mode)
 */
export declare class Annotation extends Plugin {
    /**
     * Indicates if Sprite is currently in annotating mode.
     */
    private _active;
    /**
     * A reference to menu item that holds annotation tools.
     */
    private _menu;
    /**
     * An ID of an element that represents the currently selected tool indicator.
     */
    private _indicatorId;
    /**
     * Currently selected tool.
     */
    private _currentTool;
    /**
     * Current color in use.
     */
    private _currentColor;
    /**
     * Currently selected weight/width.
     */
    private _currentWidth;
    /**
     * Currently selected opacity.
     */
    private _currentOpacity;
    /**
     * Font size.
     */
    private _currentFontSize;
    /**
     * Font weight.
     */
    private _currentFontWeight;
    /**
     * Color selection.
     */
    private _colors;
    /**
     * Available line widths.
     */
    private _widths;
    /**
     * Available opacities.
     */
    private _opacities;
    /**
     * Available font sizes.
     */
    private _fontSizes;
    /**
     * Available font weights.
     */
    private _fontWeights;
    /**
     * Menu enabled?
     */
    private _useMenu;
    /**
     * Did plugin create own menu or reusing existing ExportMenu?
     */
    private _ownMenu;
    /**
     * A Fabric's Canvas element.
     *
     * @see {@link http://fabricjs.com/docs/fabric.Canvas.html}
     */
    private _fabric;
    /**
     * Reference to `<g>` element that holds annotation objects.
     */
    private _group;
    private _pointerDown;
    private _currentLine;
    private _currentArrowhead;
    private _data;
    private _exportInited;
    /**
     * List of icons to use in annotation
     */
    icons: Array<string>;
    /**
     * Logs orinal size of the chart so that annotations can be repositioned
     * relatively when that changes.
     * @type {number}
     */
    private _originalBbox;
    /**
     * If set to `true` plugin will try to reposition annotation relatively when
     * size of the chart chanages.
     *
     * This feature is experimental. Use at your own risk.
     *
     * @default false
     * @since 4.7.19
     * @type {boolean}
     */
    autoSize: boolean;
    /**
     * Constructor
     */
    constructor();
    init(): void;
    /**
     * Initializes menus for the annotation.
     *
     * Will try to use existing [[ExportMenu]] if present.
     */
    protected initExporting(): void;
    /**
     * Toggles annotation mode on click of the related menu item.
     *
     * @ignore
     * @param  options  Options
     */
    handleClick(options: IExportCustomOptions): void;
    /**
     * Returns an instance of Fabric's `Canvas`.
     * @return Canvas
     */
    readonly fabric: fabric.Canvas;
    /**
     * A `<g>` that holds SVG representation of the annotations in chart overlay.
     *
     * @return  Group element
     */
    readonly group: SVGGElement;
    /**
     * Activates annotation mode.
     */
    activate(): void;
    /**
     * Deactivates annotation mode.
     */
    deactivate(): void;
    /**
     * Updates SVG overlay to display annotations when in non-annotation mode.
     *
     * @todo Set contents properly (not use innerHTML)
     */
    private updateSVG;
    /**
     * Seting to `true` puts the chart in annotation mode.
     *
     * Setting to `false` returns chart to regular mode of operation.
     *
     * @default false
     * @param  value  Active?
     */
    /**
    * @return Active?
    */
    active: boolean;
    /**
     * Currently selected color.
     *
     * @default #000
     * @param  value  Color
     */
    /**
    * @return Color
    */
    currentColor: Color;
    /**
     * List of colors to show in selection.
     *
     * @param  value  Colors
     */
    /**
    * @return Colors
    */
    colors: Array<Color>;
    /**
     * Currently selected width.
     *
     * @default 1
     * @param  value  Width
     */
    /**
    * @return Width
    */
    currentWidth: number;
    /**
     * List of widths in pixels for line and free-draw tool.
     *
     * @param  value  Widths
     */
    /**
    * @return Widths
    */
    widths: Array<number>;
    /**
     * Currently selected opacity.
     *
     * @default 1
     * @param  value  Opacity
     */
    /**
    * @return Opacity
    */
    currentOpacity: number;
    /**
     * List of opacities available for selection.
     *
     * @param  value  Opacities
     */
    /**
    * @return Opacities
    */
    opacities: Array<number>;
    /**
     * Currently selected font size.
     *
     * @default 10
     * @param  value  Font size
     */
    /**
    * @return Font size
    */
    currentFontSize: number;
    /**
     * List of available font sizes.
     *
     * @param  value  Font sizes
     */
    /**
    * @return Font sizes
    */
    fontSizes: Array<number>;
    /**
     * Currently selected font weight.
     *
     * @default 400
     * @param  value  Font weight
     */
    /**
    * @return Font weight
    */
    currentFontWeight: number;
    /**
     * List of available font weights.
     *
     * @param  value  Font weights
     */
    /**
    * @return Font weights
    */
    fontWeights: Array<number>;
    /**
     * Currently selected tool.
     *
     * @default select
     * @param  value  Tool
     */
    /**
    * @return Tool
    */
    currentTool: string;
    /**
     * Initiates tool.
     */
    private updateTool;
    /**
     * Updates currently selected tool/color indicator.
     */
    private updateIndicator;
    /**
     * Current tool/color indicator element.
     *
     * @return  Indicator
     */
    readonly indicator: HTMLElement;
    /**
     * Sets color.
     *
     * @param  value  Color
     */
    setColor(value: Color): void;
    /**
     * Sets line width.
     *
     * @param  value  Width
     */
    setWidth(value: number): void;
    /**
     * Sets opacity.
     *
     * @param  value  Opacity
     */
    setOpacity(value: number): void;
    /**
     * Sets font size.
     *
     * @param  value  Font size
     */
    setFontSize(value: number): void;
    /**
     * Sets font weight.
     *
     * @param  value  Font weight
     */
    setFontWeight(value: number): void;
    /**
     * Does nothing.
     */
    underConstruction(): void;
    /**
     * Puts annotator in object selection mode.
     */
    select(): void;
    /**
     * Puts annotator in free-drawing mode.
     */
    draw(): void;
    /**
     * Puts annotator in line drawing mode.
     */
    line(): void;
    /**
     * Puts annotator in arrow drawing mode.
     */
    arrow(): void;
    /**
     * Adds an editable text object to canvas.
     */
    addText(): void;
    /**
     * Adds an image to canvas.
     */
    addIcon(url: string): void;
    /**
     * Attemps to set a fill to the SVG icon.
     * @param  img  Fabric image reference
     */
    setIconFill(img: fabric.Image): void;
    /**
     * Puts annotator in object deletion mode
     */
    delete(): void;
    /**
     * Clears all annotations.
     */
    clear(): void;
    /**
     * Clears all annotations and exits annotation mode.
     */
    discard(): void;
    /**
     * Deletes selected objects
     */
    deleteSelected(): void;
    /**
     * Set or get annotation data.
     *
     * @since 4.5.6
     * @param  value  Data
     */
    /**
    * @return Data
    */
    data: any;
    /**
     * If set to `false` the plugin will not create own menu nor will add its
     * items to existing Export menu.
     *
     * In such case, annotation functionality will be available only via API.
     *
     * @since 4.8.0
     * @default true
     * @param  value  Use menu?
     */
    /**
    * @return Use menu?
    */
    useMenu: boolean;
    /**
     * Loads data onto canvas.
     */
    private loadData;
    /**
     * Resizes annotation as per trget chart size.
     */
    private sizeAnnotations;
}
