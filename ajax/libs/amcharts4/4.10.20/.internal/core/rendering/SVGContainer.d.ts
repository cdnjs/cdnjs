/**
 * This functionality is related to the HTML wrapper that houses `<svg>` tag.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { Sprite } from "../Sprite";
import { IDisposer } from "../utils/Disposer";
import { Popup } from "../elements/Popup";
import { Modal } from "../elements/Modal";
import { ListTemplate } from "../utils/List";
import * as $type from "../utils/Type";
import { ResizeSensor } from "../utils/ResizeSensor";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A array of all SVG Containers (one SVG container per chart instance).
 *
 * @ignore Exclude from docs
 */
export declare const svgContainers: Array<SVGContainer>;
/**
 * A class used to create an HTML wrapper for the SVG contents.
 */
export declare class SVGContainer implements IDisposer {
    /**
     * Indicates if this object has already been deleted. Any
     * destruction/disposal code should take this into account when deciding
     * wheter to run potentially costly disposal operations if they already have
     * been run.
     */
    protected _disposed: boolean;
    /**
     * Width of HTML element.
     */
    width: $type.Optional<number>;
    /**
     * Height of HTML element.
     */
    height: $type.Optional<number>;
    /**
     * A [[Container]] element which is placed into container.
     */
    protected _container: $type.Optional<Container>;
    /**
     * A parent HTML container that SVG wrapper element is placed in.
     */
    htmlElement: HTMLElement;
    /**
     * If this component is in a separate HTML container, `autoResize` means the
     * module will constantly measure container's size and adopt contents to it.
     */
    autoResize: Boolean;
    /**
     * A `<div>` element which acts as a wrapper/holder for the SVG element.
     */
    SVGContainer: HTMLDivElement;
    /**
     * A `<div>` element which acts as a placeholder for accesibility reader
     * alert.
     */
    private _readerAlertElement;
    /**
     * A reference to ResizeSensor object which monitors changes of div size.
     *
     * @deprecated
     * @ignore
     */
    resizeSensor: ResizeSensor;
    /**
     * Holds list of references to [[Sprite]] objects that should not be exported
     * when exporting chart to an image.
     *
     * @ignore
     */
    nonExportableSprites: Sprite[];
    /**
     * Holds [[Modal]] object.
     *
     * @ignore Exclude from docs
     */
    protected _modal: $type.Optional<Modal>;
    /**
     * Holds [[Popup]] objects.
     *
     * @ignore Exclude from docs
     */
    protected _popups: $type.Optional<ListTemplate<Popup>>;
    /**
     * List of objects that need to be disposed when this one is disposed.
     */
    protected _disposers: Array<IDisposer>;
    cssScale: number;
    protected _printing: boolean;
    /**
     * Constructor
     *
     * * Creates an HTML wrapper for SVG
     */
    constructor(htmlElement: HTMLElement, ghost?: boolean);
    /**
     * (Re)Initializes a resize sensor.
     */
    initSensor(): void;
    /**
     * Measures size of parent HTML element.
     *
     * @ignore Exclude from docs
     */
    measure(): void;
    /**
     * A [[Container]] element which is placed into container.
     *
     * @param container  Container
     */
    /**
    * @return Container
    */
    container: $type.Optional<Container>;
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    isDisposed(): boolean;
    /**
     * Removes this container from SVG container list in system, which
     * effectively disables size change monitoring for it.
     */
    dispose(): void;
    /**
     * Indicates if chart container should have its style set
     * to `overflow: hidden`.
     *
     * Normally, we don't want that, so that certain elements, such as tooltips,
     * would be able to go outside chart area.
     *
     * There is one issue though. Some browsers ignore SVG masks and would
     * display scrollbars if chart elements, that go outside chart area extend
     * outside window.
     *
     * This is especially true for [[MapChart]], which can have its elements
     * extend very widely when zoomed in. Even if those parts are not visible
     * because of SVG masks, some browsers might still display window scrollbars.
     *
     * This is why we set this setting to `true` in [[MapChart]].
     *
     * Other charts use default of `false`.
     */
    hideOverflow: boolean;
    /**
     * ==========================================================================
     * MODAL/POPUP RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns a [[Modal]] instance, associated with this chart.
     * (elements top parent)
     *
     * Accessing modal does not make it appear. To make a modal appear, use
     * `showModal()` method.
     *
     * @see {@link Modal} for more information about using Modal windows
     * @return Modal instance
     */
    readonly modal: Modal;
    /**
     * Opens a modal window with specific content (`text` parameter) and,
     * optionally, `title`.
     *
     * The `text` parameter can contain HTML content.
     *
     * @see {@link Modal} for more information about using Modal windows
     * @param text   Modal contents
     * @param title  Title for the modal window
     */
    openModal(text: string, title?: string): Modal;
    /**
     * Hides modal window if there is one currently open.
     */
    closeModal(): void;
    /**
     * A list of popups for this chart.
     *
     * @return Popups
     */
    readonly popups: ListTemplate<Popup>;
    /**
     * Creates, opens, and returns a new [[Popup]] window.
     *
     * `text` can be any valid HTML.
     *
     * `title` is currently not supported.
     *
     * @param text   Popup contents
     * @param title  Popup title
     * @return Popup instance
     */
    openPopup(text: string, title?: string): Popup;
    /**
     * Closes all currently open popup windows
     */
    closeAllPopups(): void;
    /**
     * ==========================================================================
     * ACCESSIBILITY STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * A `<div>` element used as as placeholder to trigger screen alerts.
     *
     * @sunce 4.9.2
     * @return Element
     */
    readonly readerAlertElement: HTMLDivElement;
    /**
     * Triggers screen reader read out a message.
     *
     * @since 4.9.2
     * @param  text  Alert text
     */
    readerAlert(text: string): void;
    /**
     * ==========================================================================
     * OTHER STUFF
     * ==========================================================================
     * @hidden
     */
    protected checkTransform(div: HTMLElement): void;
}
