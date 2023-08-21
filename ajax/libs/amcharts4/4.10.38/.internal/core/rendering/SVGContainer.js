/**
 * This functionality is related to the HTML wrapper that houses `<svg>` tag.
 */
import { Popup } from "../elements/Popup";
import { Modal } from "../elements/Modal";
import { ListTemplate, ListDisposer } from "../utils/List";
import * as $utils from "../utils/Utils";
import * as $dom from "../utils/DOM";
import * as $array from "../utils/Array";
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
export var svgContainers = [];
/**
 * A class used to create an HTML wrapper for the SVG contents.
 */
var SVGContainer = /** @class */ (function () {
    /**
     * Constructor
     *
     * * Creates an HTML wrapper for SVG
     */
    function SVGContainer(htmlElement, ghost) {
        var _this = this;
        /**
         * Indicates if this object has already been deleted. Any
         * destruction/disposal code should take this into account when deciding
         * wheter to run potentially costly disposal operations if they already have
         * been run.
         */
        this._disposed = false;
        /**
         * If this component is in a separate HTML container, `autoResize` means the
         * module will constantly measure container's size and adopt contents to it.
         */
        this.autoResize = true;
        /**
         * Holds list of references to [[Sprite]] objects that should not be exported
         * when exporting chart to an image.
         *
         * @ignore
         */
        this.nonExportableSprites = [];
        /**
         * List of objects that need to be disposed when this one is disposed.
         */
        this._disposers = [];
        this.cssScale = 1;
        // This is needed so that it won't resize while printing, so that way printing works correctly.
        this._printing = false;
        // Log parent HTML element
        this.htmlElement = htmlElement;
        if (!ghost) {
            this._printing = false;
            this.initSensor();
            this._disposers.push($dom.addEventListener(window, "beforeprint", function () {
                _this._printing = true;
            }));
            this._disposers.push($dom.addEventListener(window, "afterprint", function () {
                _this._printing = false;
            }));
        }
        // Adds to containers array
        svgContainers.push(this);
        /**
         * Create child div for the container - it will have svg node
         * It might seem that this container is not necessay, however having it solves
         * a problems with mouse position detection and some other.
         */
        var svgContainer = document.createElement("div");
        var style = svgContainer.style;
        style.width = "100%";
        style.height = "100%";
        style.position = "relative";
        htmlElement.appendChild(svgContainer);
        this.SVGContainer = svgContainer;
    }
    /**
     * (Re)Initializes a resize sensor.
     */
    SVGContainer.prototype.initSensor = function () {
        var _this = this;
        if (this.resizeSensor) {
            this.resizeSensor.dispose();
        }
        var callback = function () {
            if (_this.autoResize && !_this._printing) {
                _this.measure();
            }
        };
        this.resizeSensor = new ResizeSensor(this.htmlElement, callback);
        this._disposers.push(this.resizeSensor);
    };
    /**
     * Measures size of parent HTML element.
     *
     * @ignore Exclude from docs
     */
    SVGContainer.prototype.measure = function () {
        var width = $utils.width(this.htmlElement);
        var height = $utils.height(this.htmlElement);
        var container = this.container;
        if (container) {
            if (this.width != width || this.height != height) {
                this.width = width;
                this.height = height;
                if (width > 0) {
                    container.maxWidth = width;
                }
                if (height > 0) {
                    container.maxHeight = height;
                }
                $dom.fixPixelPerfect(this.SVGContainer);
            }
            if (!container.maxWidth) {
                container.maxWidth = 0;
            }
            if (!container.maxHeight) {
                container.maxHeight = 0;
            }
            this.cssScale = 1;
            this.checkTransform(this.htmlElement);
        }
    };
    Object.defineProperty(SVGContainer.prototype, "container", {
        /**
         * @return Container
         */
        get: function () {
            return this._container;
        },
        /**
         * A [[Container]] element which is placed into container.
         *
         * @param container  Container
         */
        set: function (container) {
            this._container = container;
            this.measure();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    SVGContainer.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Removes this container from SVG container list in system, which
     * effectively disables size change monitoring for it.
     */
    SVGContainer.prototype.dispose = function () {
        if (!this._disposed) {
            $array.remove(svgContainers, this);
        }
        $array.each(this._disposers, function (item) {
            item.dispose();
        });
    };
    Object.defineProperty(SVGContainer.prototype, "hideOverflow", {
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
        set: function (value) {
            if (value) {
                this.SVGContainer.style.overflow = "hidden";
            }
            else {
                this.SVGContainer.style.overflow = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGContainer.prototype, "modal", {
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
        get: function () {
            if (!$type.hasValue(this._modal)) {
                // Create new modal
                this._modal = new Modal();
                this._modal.container = this.SVGContainer;
                // Add to disposers
                this._disposers.push(this._modal);
            }
            return this._modal;
        },
        enumerable: true,
        configurable: true
    });
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
    SVGContainer.prototype.openModal = function (text, title) {
        // Hide previous modal
        this.closeModal();
        // Create modal
        var modal = this.modal;
        modal.content = text;
        modal.readerTitle = title || "";
        modal.title = title || "";
        modal.open();
        return modal;
    };
    /**
     * Hides modal window if there is one currently open.
     */
    SVGContainer.prototype.closeModal = function () {
        if (this._modal) {
            this.modal.close();
        }
    };
    Object.defineProperty(SVGContainer.prototype, "popups", {
        /**
         * A list of popups for this chart.
         *
         * @return Popups
         */
        get: function () {
            if (!$type.hasValue(this._popups)) {
                // Create popup template
                var popupTemplate = new Popup();
                popupTemplate.container = this.SVGContainer;
                // Create the list
                this._popups = new ListTemplate(popupTemplate);
                // Add to disposers
                this._disposers.push(new ListDisposer(this._popups));
                this._disposers.push(this._popups.template);
            }
            return this._popups;
        },
        enumerable: true,
        configurable: true
    });
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
    SVGContainer.prototype.openPopup = function (text, title) {
        var popup = this.popups.create();
        popup.content = text;
        if ($type.hasValue(title)) {
            popup.title = title;
        }
        popup.open();
        return popup;
    };
    /**
     * Closes all currently open popup windows
     */
    SVGContainer.prototype.closeAllPopups = function () {
        this.popups.each(function (popup) {
            popup.close();
        });
    };
    Object.defineProperty(SVGContainer.prototype, "readerAlertElement", {
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
        get: function () {
            if (!$type.hasValue(this._readerAlertElement)) {
                // Create element
                var div = document.createElement("div");
                div.setAttribute("role", "alert");
                div.style.zIndex = "-100000";
                div.style.opacity = "0";
                div.style.position = "absolute";
                div.style.top = "0";
                this.SVGContainer.appendChild(div);
                this._readerAlertElement = div;
            }
            return this._readerAlertElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Triggers screen reader read out a message.
     *
     * @since 4.9.2
     * @param  text  Alert text
     */
    SVGContainer.prototype.readerAlert = function (text) {
        this.readerAlertElement.innerHTML = text;
    };
    /**
     * ==========================================================================
     * OTHER STUFF
     * ==========================================================================
     * @hidden
     */
    SVGContainer.prototype.checkTransform = function (div) {
        if (window.getComputedStyle) {
            if (div && div.style) {
                var style = window.getComputedStyle(div, null);
                if (style) {
                    var matrix = style.getPropertyValue("-webkit-transform") ||
                        style.getPropertyValue("-moz-transform") ||
                        style.getPropertyValue("-ms-transform") ||
                        style.getPropertyValue("-o-transform") ||
                        style.getPropertyValue("transform");
                    if (matrix && matrix !== "none") {
                        var values = matrix.split('(')[1].split(')')[0].split(',');
                        var a = Number(values[0]);
                        var b = Number(values[1]);
                        var scale = Math.sqrt(a * a + b * b);
                        if (!isNaN(scale)) {
                            this.cssScale *= scale;
                        }
                    }
                }
            }
            if (div.parentNode && div.parentNode instanceof HTMLElement) {
                this.checkTransform(div.parentNode);
            }
        }
    };
    return SVGContainer;
}());
export { SVGContainer };
//# sourceMappingURL=SVGContainer.js.map