/**
 * Plugin which enables annotation functionality for charts.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { fabric } from "../../fabric/fabric.js";
import { AnnotationIcons } from "./AnnotationIcons";
import { Plugin } from "../../core/utils/Plugin";
import { ExportMenu } from "../../core/export/ExportMenu";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { getInteraction } from "../../core/interaction/Interaction";
import { keyboard } from "../../core/utils/Keyboard";
import * as $math from "../../core/utils/Math";
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
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    /**
     * Constructor
     */
    function Annotation() {
        var _this = 
        // Nothing to do here
        _super.call(this) || this;
        /**
         * Indicates if Sprite is currently in annotating mode.
         */
        _this._active = false;
        /**
         * Currently selected tool.
         */
        _this._currentTool = "draw";
        /**
         * Current color in use.
         */
        _this._currentColor = color("#c00");
        /**
         * Currently selected weight/width.
         */
        _this._currentWidth = 2;
        /**
         * Currently selected opacity.
         */
        _this._currentOpacity = 0.8;
        /**
         * Font size.
         */
        _this._currentFontSize = 20;
        /**
         * Font weight.
         */
        _this._currentFontWeight = 400;
        /**
         * Color selection.
         */
        _this._colors = [];
        /**
         * Available line widths.
         */
        _this._widths = [];
        /**
         * Available opacities.
         */
        _this._opacities = [];
        /**
         * Available font sizes.
         */
        _this._fontSizes = [];
        /**
         * Available font weights.
         */
        _this._fontWeights = [];
        /**
         * Menu enabled?
         */
        _this._useMenu = true;
        /**
         * Did plugin create own menu or reusing existing ExportMenu?
         */
        _this._ownMenu = true;
        _this._pointerDown = false;
        _this._exportInited = false;
        /**
         * List of icons to use in annotation
         */
        _this.icons = [];
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
        _this.autoSize = false;
        // Set default colors
        _this._colors = [
            color("#000"),
            color("#fff"),
            color("#c00"),
            color("#0c0"),
            color("#00c")
        ];
        // Set defaults
        _this._widths = [1, 2, 4, 10];
        _this._opacities = [0.2, 0.4, 0.6, 0.8, 1];
        // Set default font sizes
        _this._fontSizes = [10, 15, 20, 30];
        _this._fontWeights = [200, 300, 400, 800];
        // Add default icons
        _this.icons = [
            AnnotationIcons.pin,
            AnnotationIcons.heart,
            AnnotationIcons.check,
            AnnotationIcons.like,
            AnnotationIcons.dislike,
            AnnotationIcons.tag,
            AnnotationIcons.attention,
            AnnotationIcons.smiley
        ];
        return _this;
    }
    Annotation.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initExporting();
        if (this._data) {
            this.loadData();
        }
    };
    /**
     * Initializes menus for the annotation.
     *
     * Will try to use existing [[ExportMenu]] if present.
     */
    Annotation.prototype.initExporting = function () {
        var _this = this;
        var target = this.target;
        // Create an export menu if it does not yet exist
        if (this.useMenu) {
            if (!target.exporting.menu) {
                target.exporting.menu = new ExportMenu();
                target.exporting.menu.items[0].menu = [];
                this._ownMenu = true;
            }
            else {
                target.exporting.menu.invalidate();
                this._ownMenu = false;
            }
        }
        // Update indicator when menu is created
        target.exporting.events.once("menucreated", this.updateIndicator);
        target.events.on("sizechanged", this.sizeAnnotations, this);
        // Create DEL key handler
        getInteraction().body.events.on("keyup", function (ev) {
            if (_this.active && keyboard.isKey(ev.event, "del")) {
                _this.deleteSelected();
            }
        });
        // Update/show SVG annotation if currently in annotation mode and user
        // triggers export.
        target.exporting.events.on("exportstarted", function (ev) {
            if (_this.active) {
                _this.updateSVG();
                _this.fabric.wrapperEl.style.display = "none";
                _this._group.style.display = "";
            }
        });
        target.exporting.events.on("exportfinished", function (ev) {
            if (_this.active) {
                _this._group.style.display = "none";
                _this.fabric.wrapperEl.style.display = "block";
            }
        });
        // Generate a unique id for indicator
        this._indicatorId = registry.getUniqueId();
        if (this.useMenu) {
            // Add annotation menu
            target.exporting.menu.items[0].menu.push({
                label: target.language.translateAny("Annotate"),
                type: "custom",
                options: {
                    callback: this.handleClick,
                    callbackTarget: this
                }
            });
            // Color list
            var colors = [];
            var _loop_1 = function (i) {
                colors.push({
                    type: "custom",
                    svg: AnnotationIcons.ok,
                    color: this_1.colors[i],
                    options: {
                        callback: function () {
                            _this.setColor(_this.colors[i]);
                        }
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.colors.length; i++) {
                _loop_1(i);
            }
            // Width list
            var widths = [];
            var _loop_2 = function (i) {
                widths.push({
                    type: "custom",
                    label: this_2.widths[i] + "px",
                    options: {
                        callback: function () {
                            _this.setWidth(_this.widths[i]);
                        }
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i < this.widths.length; i++) {
                _loop_2(i);
            }
            // Opacity list
            var opacities = [];
            var _loop_3 = function (i) {
                opacities.push({
                    type: "custom",
                    label: "<span style=\"opacity: " + this_3.opacities[i] + "\">" + (this_3.opacities[i] * 100) + "%</span>",
                    options: {
                        callback: function () {
                            _this.setOpacity(_this.opacities[i]);
                        }
                    }
                });
            };
            var this_3 = this;
            for (var i = 0; i < this.opacities.length; i++) {
                _loop_3(i);
            }
            // Font sizes
            var fontSizes = [];
            var _loop_4 = function (i) {
                fontSizes.push({
                    type: "custom",
                    label: "" + this_4.fontSizes[i],
                    options: {
                        callback: function () {
                            _this.setFontSize(_this.fontSizes[i]);
                        }
                    }
                });
            };
            var this_4 = this;
            for (var i = 0; i < this.fontSizes.length; i++) {
                _loop_4(i);
            }
            // Font weights
            var fontWeights = [];
            var _loop_5 = function (i) {
                fontWeights.push({
                    type: "custom",
                    label: "" + this_5.fontWeights[i],
                    options: {
                        callback: function () {
                            _this.setFontWeight(_this.fontWeights[i]);
                        }
                    }
                });
            };
            var this_5 = this;
            for (var i = 0; i < this.fontWeights.length; i++) {
                _loop_5(i);
            }
            // Icons
            var icons = [];
            var _loop_6 = function (i) {
                icons.push({
                    type: "custom",
                    svg: this_6.icons[i],
                    options: {
                        callback: function () {
                            _this.addIcon(_this.icons[i]);
                        }
                    }
                });
            };
            var this_6 = this;
            for (var i = 0; i < this.icons.length; i++) {
                _loop_6(i);
            }
            // Construct main menu item
            var id = this._indicatorId;
            //let mainitem = this.target.exporting.menu.createSvgElement(0, "custom", AnnotationIcons.select).outerHTML;
            var mainitem = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 24 24\"></svg>";
            mainitem += "<span class=\"" + id + "_color\" style=\"display: block; background-color: " + this.currentColor.hex + "; width: 1.2em; height: 1.2em; margin: 0.2em auto 0.4em auto;\"></span>";
            // Add annotation tools menu
            this._menu = {
                hidden: !this.active,
                // icon: AnnotationIcons.select,
                label: mainitem,
                id: this._indicatorId,
                menu: [{
                        type: "custom",
                        svg: AnnotationIcons.tools,
                        label: target.language.translateAny("Tools"),
                        menu: [{
                                type: "custom",
                                svg: AnnotationIcons.select,
                                label: target.language.translateAny("Select"),
                                options: {
                                    callback: this.select,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.draw,
                                label: target.language.translateAny("Draw"),
                                options: {
                                    callback: this.draw,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.line,
                                label: target.language.translateAny("Line"),
                                options: {
                                    callback: this.line,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.arrow,
                                label: target.language.translateAny("Arrow"),
                                options: {
                                    callback: this.arrow,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.width,
                                label: target.language.translateAny("Weight"),
                                menu: widths
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.delete,
                                label: target.language.translateAny("Delete"),
                                options: {
                                    callback: this.delete,
                                    callbackTarget: this
                                }
                            }]
                    }, {
                        type: "custom",
                        svg: AnnotationIcons.text,
                        label: target.language.translateAny("Text"),
                        menu: [{
                                type: "custom",
                                svg: AnnotationIcons.textAdd,
                                label: target.language.translateAny("Add"),
                                options: {
                                    callback: this.addText,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.textWeight,
                                label: target.language.translateAny("Weight"),
                                menu: fontWeights
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.textSize,
                                label: target.language.translateAny("Size"),
                                menu: fontSizes
                            }]
                    }, {
                        type: "custom",
                        svg: AnnotationIcons.colors,
                        label: target.language.translateAny("Color"),
                        menu: colors
                    }, {
                        type: "custom",
                        svg: AnnotationIcons.opacity,
                        label: target.language.translateAny("Opacity"),
                        menu: opacities
                    }, {
                        type: "custom",
                        svg: AnnotationIcons.icon,
                        label: target.language.translateAny("Icon"),
                        menu: icons
                    }, {
                        type: "custom",
                        svg: AnnotationIcons.more,
                        label: target.language.translateAny("More"),
                        menu: [
                            {
                                type: "custom",
                                svg: AnnotationIcons.done,
                                label: target.language.translateAny("Done"),
                                options: {
                                    callback: this.deactivate,
                                    callbackTarget: this
                                }
                            }, {
                                type: "custom",
                                svg: AnnotationIcons.discard,
                                label: target.language.translateAny("Discard"),
                                options: {
                                    callback: this.discard,
                                    callbackTarget: this
                                }
                            }
                        ]
                    }]
            };
            target.exporting.menu.items.push(this._menu);
        }
        this._exportInited = true;
    };
    /**
     * Toggles annotation mode on click of the related menu item.
     *
     * @ignore
     * @param  options  Options
     */
    Annotation.prototype.handleClick = function (options) {
        this.active = !this.active;
    };
    Object.defineProperty(Annotation.prototype, "fabric", {
        /**
         * Returns an instance of Fabric's `Canvas`.
         * @return Canvas
         */
        get: function () {
            var _this = this;
            // Init canvas if not yet done
            if (!this._fabric) {
                // Creae <canvas> element
                var canvas = document.createElement("canvas");
                canvas.width = this.target.pixelWidth;
                canvas.height = this.target.pixelHeight;
                canvas.style.position = "absolute";
                canvas.style.top = "0";
                canvas.style.left = "0";
                this.target.svgContainer.SVGContainer.appendChild(canvas);
                // Create Fabric representation of the canvas
                this._fabric = new fabric.Canvas(canvas, {
                    //isDrawingMode: true,
                    containerClass: "am4plugins_annotation_canvas_container"
                });
                this.fabric.wrapperEl.style.position = "absolute";
                this.fabric.wrapperEl.style.top = "0";
                this.fabric.wrapperEl.style.left = "0";
                // Set up events for deletion
                this.fabric.on("selection:created", function (ev) {
                    if (_this.currentTool == "delete") {
                        _this.deleteSelected();
                    }
                });
                // Set up events for drawing lines/arrows
                this._fabric.on("mouse:down", function (ev) {
                    if (_this.currentTool != "line" && _this.currentTool != "arrow") {
                        return;
                    }
                    // Line
                    _this._pointerDown = true;
                    var pointer = _this._fabric.getPointer(ev.e);
                    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
                    _this._currentLine = new fabric.Line(points, {
                        strokeWidth: _this.currentWidth,
                        fill: _this.currentColor.hex,
                        stroke: _this.currentColor.hex,
                        opacity: _this.currentOpacity,
                        originX: "center",
                        originY: "center"
                    });
                    _this._fabric.add(_this._currentLine);
                    // Arrowhead
                    if (_this.currentTool == "arrow") {
                        _this._currentArrowhead = new fabric.Triangle({
                            width: 10,
                            height: 10,
                            strokeWidth: _this.currentWidth,
                            fill: _this.currentColor.hex,
                            stroke: _this.currentColor.hex,
                            opacity: _this.currentOpacity,
                            left: pointer.x - 5,
                            top: pointer.y - 10,
                            originX: "center",
                            originY: "center",
                            angle: 0
                        });
                        _this._fabric.add(_this._currentArrowhead);
                    }
                });
                this._fabric.on("mouse:move", function (ev) {
                    if (!_this._pointerDown || (_this.currentTool != "line" && _this.currentTool != "arrow")) {
                        return;
                    }
                    var pointer = _this._fabric.getPointer(ev.e);
                    _this._currentLine.set({ x2: pointer.x, y2: pointer.y });
                    // Move and rotate arrowhead
                    if (_this.currentTool == "arrow") {
                        var angle = $math.getAngle({ x: _this._currentLine.x1, y: _this._currentLine.y1 }, { x: _this._currentLine.x2, y: _this._currentLine.y2 });
                        _this._currentArrowhead.set({
                            left: pointer.x,
                            top: pointer.y,
                            angle: angle + 90
                        });
                    }
                    _this._fabric.renderAll();
                });
                this._fabric.on("mouse:up", function (ev) {
                    _this._pointerDown = false;
                });
                // Load data if necessary
                if (this._data) {
                    this.loadData();
                }
            }
            return this._fabric;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "group", {
        /**
         * A `<g>` that holds SVG representation of the annotations in chart overlay.
         *
         * @return  Group element
         */
        get: function () {
            if (!this._group) {
                //this.group = this.target.svgContainer.container.dom.appendChild(document.createElement("g"));
                this._group = this.target.paper.add("g").node;
                this._group.style.pointerEvents = "none";
                this._group.setAttribute("clip-path", this.target.dom.getAttribute("clip-path"));
                this.target.svgContainer.container.dom.appendChild(this._group);
            }
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activates annotation mode.
     */
    Annotation.prototype.activate = function () {
        this.active = true;
        this.updateTool();
        this.fabric.wrapperEl.style.display = "block";
        this.group.style.display = "none";
    };
    /**
     * Deactivates annotation mode.
     */
    Annotation.prototype.deactivate = function () {
        this.active = false;
        this.updateTool();
        this.fabric.wrapperEl.style.display = "none";
        this.updateSVG();
        this.group.style.display = "";
    };
    /**
     * Updates SVG overlay to display annotations when in non-annotation mode.
     *
     * @todo Set contents properly (not use innerHTML)
     */
    Annotation.prototype.updateSVG = function () {
        var svg = this.fabric.toSVG();
        var matches = svg.replace(/[\n\r]*/g, "").match(/<g.*<\/g>/g);
        if (matches) {
            this.group.innerHTML = matches[0];
        }
        else {
            this.group.innerHTML = "";
        }
    };
    Object.defineProperty(Annotation.prototype, "active", {
        /**
         * @return Active?
         */
        get: function () {
            return this._active;
        },
        /**
         * Seting to `true` puts the chart in annotation mode.
         *
         * Setting to `false` returns chart to regular mode of operation.
         *
         * @default false
         * @param  value  Active?
         */
        set: function (value) {
            if (this._active != value) {
                this._active = value;
                if (value) {
                    this.activate();
                    if (this.useMenu) {
                        this.target.exporting.menu.showBranch(this._menu);
                    }
                }
                else {
                    this.deactivate();
                    if (this.useMenu) {
                        this.target.exporting.menu.hideBranch(this._menu);
                    }
                }
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentColor", {
        /**
         * @return Color
         */
        get: function () {
            return this._currentColor;
        },
        /**
         * Currently selected color.
         *
         * @default #000
         * @param  value  Color
         */
        set: function (value) {
            if (this._currentColor != value) {
                this._currentColor = value;
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "colors", {
        /**
         * @return Colors
         */
        get: function () {
            return this._colors;
        },
        /**
         * List of colors to show in selection.
         *
         * @param  value  Colors
         */
        set: function (value) {
            if (this._colors != value) {
                this._colors = value;
                this.updateIndicator();
                this.setColor(this._currentColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentWidth", {
        /**
         * @return Width
         */
        get: function () {
            return this._currentWidth;
        },
        /**
         * Currently selected width.
         *
         * @default 1
         * @param  value  Width
         */
        set: function (value) {
            if (this._currentWidth != value) {
                this._currentWidth = value;
                this.updateIndicator();
                this.setWidth(this._currentWidth);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "widths", {
        /**
         * @return Widths
         */
        get: function () {
            return this._widths;
        },
        /**
         * List of widths in pixels for line and free-draw tool.
         *
         * @param  value  Widths
         */
        set: function (value) {
            if (this._widths != value) {
                this._widths = value;
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentOpacity", {
        /**
         * @return Opacity
         */
        get: function () {
            return this._currentOpacity;
        },
        /**
         * Currently selected opacity.
         *
         * @default 1
         * @param  value  Opacity
         */
        set: function (value) {
            if (this._currentOpacity != value) {
                this._currentOpacity = value;
                this.updateIndicator();
                this.setOpacity(this._currentOpacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "opacities", {
        /**
         * @return Opacities
         */
        get: function () {
            return this._opacities;
        },
        /**
         * List of opacities available for selection.
         *
         * @param  value  Opacities
         */
        set: function (value) {
            if (this._opacities != value) {
                this._opacities = value;
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentFontSize", {
        /**
         * @return Font size
         */
        get: function () {
            return this._currentFontSize;
        },
        /**
         * Currently selected font size.
         *
         * @default 10
         * @param  value  Font size
         */
        set: function (value) {
            if (this._currentFontSize != value) {
                this._currentFontSize = value;
                this.updateIndicator();
                this.setFontSize(this._currentFontSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "fontSizes", {
        /**
         * @return Font sizes
         */
        get: function () {
            return this._fontSizes;
        },
        /**
         * List of available font sizes.
         *
         * @param  value  Font sizes
         */
        set: function (value) {
            if (this._fontSizes != value) {
                this._fontSizes = value;
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentFontWeight", {
        /**
         * @return Font weight
         */
        get: function () {
            return this._currentFontWeight;
        },
        /**
         * Currently selected font weight.
         *
         * @default 400
         * @param  value  Font weight
         */
        set: function (value) {
            if (this._currentFontWeight != value) {
                this._currentFontWeight = value;
                this.updateIndicator();
                //this.setFontWeight(this._currentFontWeight);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "fontWeights", {
        /**
         * @return Font weights
         */
        get: function () {
            return this._fontWeights;
        },
        /**
         * List of available font weights.
         *
         * @param  value  Font weights
         */
        set: function (value) {
            if (this._fontWeights != value) {
                this._fontWeights = value;
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "currentTool", {
        /**
         * @return Tool
         */
        get: function () {
            return this._currentTool;
        },
        /**
         * Currently selected tool.
         *
         * @default select
         * @param  value  Tool
         */
        set: function (value) {
            if (this._currentTool != value) {
                this._currentTool = value;
                this.updateTool();
                this.updateIndicator();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initiates tool.
     */
    Annotation.prototype.updateTool = function () {
        switch (this.currentTool) {
            case "select":
                this.select();
                break;
            case "draw":
                this.draw();
                break;
            case "delete":
                this.delete();
                break;
            case "line":
                this.line();
                break;
            case "arrow":
                this.arrow();
                break;
        }
    };
    /**
     * Updates currently selected tool/color indicator.
     */
    Annotation.prototype.updateIndicator = function () {
        if (this.indicator) {
            // Update tool icon
            var container = this.indicator.getElementsByTagName("a")[0];
            var newicon = this.target.exporting.menu.createSvgElement(0, "custom", AnnotationIcons[this.currentTool]);
            var oldicon = this.indicator.getElementsByTagName("svg")[0];
            container.insertBefore(newicon, oldicon);
            container.removeChild(oldicon);
            // Update color
            this.indicator.getElementsByClassName(this._indicatorId + "_color")[0].style.backgroundColor = this.currentColor.hex;
        }
    };
    Object.defineProperty(Annotation.prototype, "indicator", {
        /**
         * Current tool/color indicator element.
         *
         * @return  Indicator
         */
        get: function () {
            return document.getElementById(this._indicatorId);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets color.
     *
     * @param  value  Color
     */
    Annotation.prototype.setColor = function (value) {
        this.currentColor = value;
        var brushColor = color(value);
        brushColor.alpha = this.currentOpacity;
        this.fabric.freeDrawingBrush.color = brushColor.rgba;
        // Update selected objects
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].isType("textbox") || (selected[i].isType("path") && selected[i].fill)) {
                selected[i].set("fill", value.hex);
            }
            else if (selected[i].isType("triangle")) {
                selected[i].set("stroke", value.hex);
                selected[i].set("fill", value.hex);
            }
            else if (selected[i].getSrc) {
                this.setIconFill(selected[i]);
            }
            else {
                selected[i].set("stroke", value.hex);
            }
        }
        this.fabric.requestRenderAll();
    };
    /**
     * Sets line width.
     *
     * @param  value  Width
     */
    Annotation.prototype.setWidth = function (value) {
        this.currentWidth = value;
        this.fabric.freeDrawingBrush.width = value;
        // Update selected objects
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            selected[i].set("strokeWidth", value);
        }
        this.fabric.requestRenderAll();
    };
    /**
     * Sets opacity.
     *
     * @param  value  Opacity
     */
    Annotation.prototype.setOpacity = function (value) {
        this.currentOpacity = value;
        var brushColor = color(this.currentColor);
        brushColor.alpha = this.currentOpacity;
        this.fabric.freeDrawingBrush.color = brushColor.rgba;
        // Update selected objects
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].isType("path")) {
                selected[i].set("stroke", this.currentColor.hex);
            }
            selected[i].set("opacity", value);
        }
        this.fabric.requestRenderAll();
    };
    /**
     * Sets font size.
     *
     * @param  value  Font size
     */
    Annotation.prototype.setFontSize = function (value) {
        this.currentFontSize = value;
        // Update selected objects
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].text) {
                selected[i].set("fontSize", value);
            }
        }
        this.fabric.requestRenderAll();
    };
    /**
     * Sets font weight.
     *
     * @param  value  Font weight
     */
    Annotation.prototype.setFontWeight = function (value) {
        this.currentFontWeight = value;
        // Update selected objects
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].text) {
                selected[i].set("fontWeight", value);
            }
        }
        this.fabric.requestRenderAll();
    };
    /**
     * Does nothing.
     */
    Annotation.prototype.underConstruction = function () {
        alert("This feature is not yet implemented");
    };
    /**
     * Puts annotator in object selection mode.
     */
    Annotation.prototype.select = function () {
        this.currentTool = "select";
        this.fabric.isDrawingMode = false;
        this.fabric.selection = true;
    };
    /**
     * Puts annotator in free-drawing mode.
     */
    Annotation.prototype.draw = function () {
        this.currentTool = "draw";
        this.fabric.isDrawingMode = true;
        this.fabric.selection = false;
        var brushColor = color(this.currentColor);
        brushColor.alpha = this.currentOpacity;
        this.fabric.freeDrawingBrush.color = brushColor.rgba;
        this.fabric.freeDrawingBrush.width = this.currentWidth;
    };
    /**
     * Puts annotator in line drawing mode.
     */
    Annotation.prototype.line = function () {
        this.currentTool = "line";
        this.fabric.isDrawingMode = false;
        this.fabric.selection = false;
    };
    /**
     * Puts annotator in arrow drawing mode.
     */
    Annotation.prototype.arrow = function () {
        this.currentTool = "arrow";
        this.fabric.isDrawingMode = false;
        this.fabric.selection = false;
    };
    /**
     * Adds an editable text object to canvas.
     */
    Annotation.prototype.addText = function () {
        this.fabric.isDrawingMode = false;
        this.fabric.selection = true;
        this.select();
        var text = new fabric.Textbox(this.target.language.translateAny("Type..."), {
            //left: this.target.pixelWidth / 2,
            //top: this.target.pixelHeight / 2,
            fontSize: this.currentFontSize,
            fontWeight: this.currentFontWeight,
            fill: this.currentColor.hex,
            opacity: this.currentOpacity
        });
        this.fabric.add(text);
        this.fabric.centerObject(text);
        text.enterEditing();
        text.selectAll();
        this.fabric.setActiveObject(text);
    };
    /**
     * Adds an image to canvas.
     */
    Annotation.prototype.addIcon = function (url) {
        var _this = this;
        this.fabric.isDrawingMode = false;
        this.fabric.selection = true;
        this.select();
        fabric.loadSVGFromString(url, function (res) {
            for (var i = 0; i < res.length; i++) {
                _this.fabric.add(res[i]);
                _this.fabric.centerObject(res[i]);
                _this.fabric.setActiveObject(res[i]);
                _this.fabric.setActiveObject(res[i]);
                res[i].opacity = _this.currentOpacity;
                res[i].fill = _this.currentColor.hex;
            }
        });
        // fabric.Image.fromElement(element, (img: any) => {
        // 	console.log(img)
        // 	this.fabric.add(img);
        // 	this.fabric.centerObject(img);
        // 	this.fabric.setActiveObject(img);
        // 	// img.fill = this.currentColor.hex;
        // 	//this.fabric.requestRenderAll();
        // 	img.opacity = this.currentOpacity;
        // 	this.setIconFill(img);
        // });
    };
    /**
     * Attemps to set a fill to the SVG icon.
     * @param  img  Fabric image reference
     */
    Annotation.prototype.setIconFill = function (img) {
        var src = img.getSrc();
        var svg = "";
        if (src.match(/;base64\,/)) {
            try {
                svg = atob(src.replace(/^.*;base64\,/g, ""));
                svg = svg.replace(/fill="[^"]+"/, "");
                svg = svg.replace(/\/>/g, " fill=\"" + this.currentColor.hex + "\" \/>");
                src = src.replace(/(^.*;base64\,).*$/, "$1") + btoa(svg);
                img.setSrc(src);
            }
            catch (e) {
                return;
            }
        }
        else if (src.match(/^data:/)) {
            svg = src.replace(/^data:[^,]*\,/, "");
            svg = svg.replace(/fill="[^"]+"/, "");
            svg = svg.replace(/\/>/g, " fill=\"" + this.currentColor.hex + "\" \/>");
            src = src.replace(/(^.*;base64\,).*$/, "$1") + svg;
            img.setSrc(src);
        }
    };
    /**
     * Puts annotator in object deletion mode
     */
    Annotation.prototype.delete = function () {
        this.currentTool = "delete";
        this.fabric.isDrawingMode = false;
    };
    /**
     * Clears all annotations.
     */
    Annotation.prototype.clear = function () {
        this.fabric.clear();
    };
    /**
     * Clears all annotations and exits annotation mode.
     */
    Annotation.prototype.discard = function () {
        this.fabric.clear();
        this.updateSVG();
        this.deactivate();
    };
    /**
     * Deletes selected objects
     */
    Annotation.prototype.deleteSelected = function () {
        var selected = this.fabric.getActiveObjects();
        for (var i = 0; i < selected.length; i++) {
            this.fabric.remove(selected[i]);
        }
        this.fabric.requestRenderAll();
    };
    Object.defineProperty(Annotation.prototype, "data", {
        /**
         * @return Data
         */
        get: function () {
            if (this._fabric) {
                return this.fabric.toObject();
            }
            else {
                return this._data;
            }
        },
        /**
         * Set or get annotation data.
         *
         * @since 4.5.6
         * @param  value  Data
         */
        set: function (value) {
            this._data = value;
            if (this._fabric || this._exportInited) {
                // Canvas is ready, update now
                this.loadData();
            }
            else {
                // Canvas is not yeat ready, just save data for later
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "useMenu", {
        /**
         * @return Use menu?
         */
        get: function () {
            return this._useMenu;
        },
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
        set: function (value) {
            this._useMenu = value;
            if (!value && this.target.exporting.menu) {
                if (this._ownMenu) {
                    this.target.exporting.menu.items[0].menu = [];
                    this.target.exporting.menu.invalidate();
                }
                else {
                    this.target.exporting.menu.items[0].menu.pop();
                    this.target.exporting.menu.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads data onto canvas.
     */
    Annotation.prototype.loadData = function () {
        var _this = this;
        this.fabric.loadFromJSON(this._data, function (e) {
            _this.updateSVG();
            _this._data = undefined;
        });
    };
    /**
     * Resizes annotation as per trget chart size.
     */
    Annotation.prototype.sizeAnnotations = function () {
        if (this.autoSize) {
            if (!this._originalBbox) {
                var bbox = this.group.getBBox();
                this._originalBbox = {
                    width: bbox.width,
                    height: bbox.height
                };
            }
            //console.log(bbox.width);
            var w = this.target.pixelWidth;
            var h = this.target.pixelHeight;
            var dx = (w / this._originalBbox.width);
            var dy = (h / this._originalBbox.height);
            var data = this.data;
            for (var i = 0; i < data.objects.length; i++) {
                var item = data.objects[i];
                item.left *= dx;
                item.top *= dy;
            }
            this.data = data;
            this._originalBbox = {
                width: w,
                height: h
            };
        }
    };
    return Annotation;
}(Plugin));
export { Annotation };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Annotation"] = Annotation;
//# sourceMappingURL=Annotation.js.map