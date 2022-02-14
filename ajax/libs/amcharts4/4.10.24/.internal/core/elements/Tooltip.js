/**
 * Provides functionality used to creating and showing tooltips (balloons).
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { registry } from "../../core/Registry";
import { PointedRectangle } from "./PointedRectangle";
import { Label } from "../elements/Label";
import { Animation } from "../utils/Animation";
import { color } from "../utils/Color";
import { DropShadowFilter } from "../rendering/filters/DropShadowFilter";
import * as $math from "../utils/Math";
import * as $ease from "../utils/Ease";
import * as $utils from "../utils/Utils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Tooltip displays text and/or multimedia information in a balloon over chart
 * area.
 * @see {@link ITooltipEvents} for a list of available events
 * @see {@link ITooltipAdapters} for a list of available Adapters
 */
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    /**
     * Constructor
     */
    function Tooltip() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Holds numeric boundary values. Calculated from the `boundingContainer`.
         * @ignore
         */
        _this._boundingRect = { x: -40000, y: -40000, width: 80000, height: 80000 };
        /**
         * Coordinates tooltip's pointer (stem) should point to.
         */
        _this._pointTo = { x: 0, y: 0 };
        /**
         * If set to `true` the pointer/stem of the Tooltip will not go outside
         * Tooltip's width or height depending on pointer's orientation.
         *
         * @default false
         */
        _this.fitPointerToBounds = false;
        /**
         * If `tooltipOrientation` is vertical, it can be drawn below or above point
         * We need to know this when solving overlapping.
         */
        _this._verticalOrientation = "up";
        /**
         * @ignore
         */
        _this.fixDoc = true;
        _this.className = "Tooltip";
        _this.isMeasured = false;
        _this.getFillFromObject = true;
        _this.margin(5, 5, 5, 5);
        _this.defaultState.transitionDuration = 1;
        _this.hiddenState.transitionDuration = 1;
        // Create chrome/background
        var background = _this.background;
        background.interactionsEnabled = false;
        background.fillOpacity = 0.9;
        background.strokeWidth = 1;
        background.strokeOpacity = 1;
        background.stroke = color("#ffffff");
        background.cornerRadius = 3;
        background.pointerLength = 6;
        background.pointerBaseWidth = 10;
        var dropShadow = new DropShadowFilter();
        dropShadow.dy = 1;
        dropShadow.dx = 1;
        dropShadow.opacity = 0.5;
        background.filters.push(dropShadow);
        _this.autoTextColor = true;
        // Create text element
        var label = _this.createChild(Label);
        label.shouldClone = false;
        _this.label = label;
        label.padding(7, 12, 4, 12);
        label.interactionsEnabled = false;
        label.horizontalCenter = "middle";
        label.fill = color("#ffffff");
        _this._disposers.push(label);
        _this.label.events.on("sizechanged", _this.drawBackground, _this);
        _this.label.zIndex = 1; // @todo remove this line when bg sorting is solved
        // Set defaults
        _this.pointerOrientation = "vertical";
        _this.animationDuration = 0;
        _this.animationEasing = $ease.cubicOut;
        _this.setPropertyValue("showInViewport", false);
        // Set accessibility options
        _this.role = "tooltip";
        _this.visible = false;
        _this.opacity = 0;
        _this.x = 0;
        _this.y = 0;
        _this.events.on("visibilitychanged", _this.handleVisibility, _this);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Tooltip.prototype.handleVisibility = function () {
        if (this.visible) {
            this.label.invalidate();
        }
    };
    Object.defineProperty(Tooltip.prototype, "getStrokeFromObject", {
        /**
         * Specifies if tooltip background should get stroke color from the sprite it is pointing to.
         *
         * @return {boolean}
         * @default false
         */
        get: function () {
            return this.getPropertyValue("getStrokeFromObject");
        },
        /**
         * Specifies if tooltip background should get stroke color from the sprite it is pointing to.
         *
         * @param value boolean
         */
        set: function (value) {
            this.setPropertyValue("getStrokeFromObject", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "autoTextColor", {
        /**
         * @return {boolean}
         */
        get: function () {
            return this.getPropertyValue("autoTextColor");
        },
        /**
         * Specifies if text color should be chosen automatically for a better
         * readability.
         *
         * IMPORTANT: this feature is generally ignored, if `getFillFromObject = false`.
         *
         * If inheriting of `fill` color from object tooltip is displayed for is
         * disabled, this feature will not work. If you are explicitly setting a
         * color for tooltip background, you may set a color for its label as well
         * using `tooltip.label.fill` property.
         *
         *
         * @param value boolean
         */
        set: function (value) {
            this.setPropertyValue("autoTextColor", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "keepTargetHover", {
        /**
         * @return Keep target hovered?
         */
        get: function () {
            return this.getPropertyValue("keepTargetHover");
        },
        /**
         * If this tooltip is displayed on hover on some other object, keep that
         * element hovered if hovering on the tooltip.
         *
         * @default false
         * @since 4.1.13
         * @param  value  Keep target hovered?
         */
        set: function (value) {
            var _this = this;
            if (this.setPropertyValue("keepTargetHover", value, true)) {
                if (value) {
                    this.hoverable = true;
                    this.background.interactionsEnabled = true;
                    this._disposers.push(this.events.on("over", function (ev) {
                        if (_this.targetSprite && _this.targetSprite.hoverable) {
                            _this.targetSprite.isHover = true;
                        }
                    }));
                    this._disposers.push(this.events.on("out", function (ev) {
                        if (_this.targetSprite && _this.targetSprite.hoverable) {
                            //this.hideTooltip();
                            //this.targetSprite.handleOut();
                            _this.targetSprite.isHover = false;
                        }
                    }));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "showInViewport", {
        /**
         * @return Force showing tooltip?
         */
        get: function () {
            return this.getPropertyValue("showInViewport");
        },
        /**
         * Normally, a tooltip will hide itself if it is pointing to a coordinate
         * that is outside viewport.
         *
         * Setting this setting to `true` will override that and make tooltip
         * appear next to the viewport edge closest to the target point.
         *
         * @default false
         * @since 4.5.7
         * @param  value  Force showing tooltip?
         */
        set: function (value) {
            this.setPropertyValue("showInViewport", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "getFillFromObject", {
        /**
         * Specifies if tooltip background should get fill color from the sprite it is pointing to.
         *
         * @return {boolean}
         * @default true
         */
        get: function () {
            return this.getPropertyValue("getFillFromObject");
        },
        /**
         * @param value boolean
         */
        set: function (value) {
            this.setPropertyValue("getFillFromObject", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns a background element.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    Tooltip.prototype.createBackground = function () {
        return new PointedRectangle();
    };
    Object.defineProperty(Tooltip.prototype, "pointerOrientation", {
        /**
         * @return Orientation
         */
        get: function () {
            return this.getPropertyValue("pointerOrientation");
        },
        /**
         * Pointer orientation: `"horizontal"`, `"vertical"`, `"up"`, `"down"`,
         * `"right"`, or `"left"`.
         *
         * Options`"horizontal"` or `"vertical"` are location-aware, meaning they
         * will change position of the Tooltip based on the target point's position
         * in relation to chart center.
         *
         * Options `"up"`, `"down"`, `"right"`, `"left"` are static and will point
         * in the specified direction regardless of the position, even if that means
         * going out of chart/screen bounds.
         *
         * IMPORTANT: in some situations, like having multiple tooltips stacked for
         * multiple series, the `"up"` and `"down"` values might be ignored in order
         * to make tooltip overlap algorithm work.
         *
         * @default "vertical"
         * @param  value  Orientation
         */
        set: function (value) {
            this.setPropertyValue("pointerOrientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "animationDuration", {
        /**
         * @return Orientation
         */
        get: function () {
            return this.getPropertyValue("animationDuration");
        },
        /**
         * Duration in milliseconds for the animation to take place when the tooltip
         * is moving from one place to another.
         *
         * @default 0
         * @param value  number
         */
        set: function (value) {
            this.setPropertyValue("animationDuration", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "animationEasing", {
        /**
         * @return {Function}
         */
        get: function () {
            return this.getPropertyValue("animationEasing");
        },
        /**
         * Tooltip animation (moving from one place to another) easing function.
         *
         * @default $ease.cubicOut
         * @param value (value: number) => number
         */
        set: function (value) {
            this.setPropertyValue("animationEasing", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "html", {
        /**
         * @return HTML content
         */
        get: function () {
            return this.label.html;
        },
        /**
         * HTML content for the Tooltip.
         *
         * Provided value will be used as is, without applying any further
         * formatting to it.
         *
         * @param value  HTML content
         */
        set: function (value) {
            if (this.label.html != value) {
                this.label.html = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "text", {
        /**
         * @return SVG text
         */
        get: function () {
            return this.label.text;
        },
        /**
         * SVG text content for the Tooltip.
         *
         * Text can have a number of formatting options supported by
         * [[TextFormatter]].
         *
         * @param value  SVG text
         */
        set: function (value) {
            if (this.label.text != value) {
                this.label.text = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates the Tooltip.
     *
     * @ignore Exclude from docs
     */
    Tooltip.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var label = this.label;
        if (label.invalid) {
            label.validate();
        }
        var x = this._pointTo.x;
        var y = this._pointTo.y;
        var boundingRect = this._boundingRect;
        var textW = label.measuredWidth;
        var textH = label.measuredHeight;
        var pointerLength = this.background.pointerLength;
        var textX;
        var textY;
        if (this.ignoreBounds) {
            boundingRect = undefined;
        }
        // try to handle if text is wider than br
        if (boundingRect && this.fixDoc && textW > boundingRect.width) {
            // TODO maybe this isn't needed ?
            $utils.spritePointToDocument({ x: boundingRect.x, y: boundingRect.y }, this.parent);
            var p1 = $utils.spritePointToDocument({ x: boundingRect.x + boundingRect.width, y: boundingRect.y + boundingRect.height }, this.parent);
            var documentWidth = document.body.offsetWidth;
            // TODO maybe this isn't needed ?
            $utils.used(document.body.offsetHeight);
            if (p1.x > documentWidth / 2) {
                boundingRect.x = boundingRect.width - textW;
            }
            else {
                boundingRect.width = boundingRect.x + textW;
            }
        }
        var pointerOrientation = this.pointerOrientation;
        // horizontal
        if (pointerOrientation == "horizontal" || pointerOrientation == "left" || pointerOrientation == "right") {
            textY = -textH / 2;
            if (pointerOrientation == "horizontal") {
                if (boundingRect && x > boundingRect.x + boundingRect.width / 2) {
                    textX = -textW / 2 - pointerLength;
                }
                else {
                    textX = textW / 2 + pointerLength;
                }
            }
            else if (pointerOrientation == "left") {
                textX = textW / 2 + pointerLength;
            }
            else {
                textX = -textW / 2 - pointerLength;
            }
        }
        // vertical pointer
        else {
            if (boundingRect) {
                textX = $math.fitToRange(0, boundingRect.x - x + textW / 2, boundingRect.x - x + boundingRect.width - textW / 2);
            }
            if (pointerOrientation == "vertical") {
                if (boundingRect && y > boundingRect.y + textH + pointerLength) {
                    textY = -textH - pointerLength;
                    this._verticalOrientation = "up";
                }
                else {
                    textY = pointerLength;
                    this._verticalOrientation = "down";
                }
            }
            else if (pointerOrientation == "down") {
                textY = -textH - pointerLength;
                this._verticalOrientation = "up";
            }
            else {
                textY = pointerLength;
                this._verticalOrientation = "down";
            }
        }
        if (boundingRect) {
            textY = $math.fitToRange(textY, boundingRect.y - y, boundingRect.y + boundingRect.height - textH - y);
        }
        label.x = textX;
        label.y = textY;
        this.drawBackground();
    };
    /**
     * Overrides functionality from the superclass.
     *
     * @ignore Exclude from docs
     */
    Tooltip.prototype.updateBackground = function () {
        this.group.addToBack(this.background.group);
    };
    /**
     * Draws Tooltip background (chrome, background and pointer/stem).
     *
     * @ignore Exclude from docs
     */
    Tooltip.prototype.drawBackground = function () {
        var label = this.label;
        var background = this.background;
        var textWidth = label.measuredWidth;
        var textHeight = label.measuredHeight;
        var boundingRect = this._boundingRect;
        var bgWidth = textWidth;
        var bgX = label.pixelX - textWidth / 2;
        var bgHeight = textHeight;
        var bgY = label.pixelY;
        var x = this._pointTo.x;
        var y = this._pointTo.y;
        var boundX1 = boundingRect.x - x;
        var boundX2 = boundX1 + boundingRect.width;
        var boundY1 = boundingRect.y - y;
        var boundY2 = boundY1 + boundingRect.height;
        background.x = bgX;
        background.y = bgY;
        background.width = bgWidth;
        background.height = bgHeight;
        if (this.fitPointerToBounds) {
            background.pointerX = $math.fitToRange(-background.x, boundX1 - background.x, boundX2 - background.x);
            background.pointerY = $math.fitToRange(-background.y, boundY1 - background.y, boundY2 - background.y);
        }
        else {
            background.pointerX = -background.x;
            background.pointerY = -background.y;
        }
        background.validate();
    };
    /**
     *
     */
    Tooltip.prototype.delayedPointTo = function (point, instantly) {
        var _this = this;
        if (this._pointToDisposer) {
            this._pointToDisposer.dispose();
        }
        this._pointToDisposer = registry.events.once("exitframe", function () {
            _this.pointTo(point, instantly);
        });
        this.addDisposer(this._pointToDisposer);
    };
    /**
     * Set nes tooltip's anchor point and moves whole tooltip.
     *
     * @param x  X coordinate
     * @param y  Y coordinate
     */
    Tooltip.prototype.pointTo = function (point, instantly) {
        if (this._pointTo.x != point.x || this._pointTo.y != point.y) {
            this._pointTo = point;
            this.invalidate();
            // this helps to avoid strange animation from nowhere on initial show or when balloon was hidden already
            if (!this.visible || instantly) {
                this.moveTo(this._pointTo);
                if (this._animation) {
                    this._animation.kill();
                }
            }
            else {
                // helps to avoid flicker on top/left corner
                if (this.pixelX == 0 && this.pixelY == 0) {
                    this.moveTo(this._pointTo);
                }
                else {
                    if (this._animation) {
                        this._animation.kill();
                    }
                    this._animation = new Animation(this, [{ property: "x", to: point.x, from: this.pixelX }, { property: "y", to: point.y, from: this.pixelY }], this.animationDuration, this.animationEasing).start();
                }
            }
        }
    };
    /**
     * Sets numeric boundaries Tooltip needs to obey (so it does not go outside
     * specific area).
     *
     * @ignore Exclude from docs
     * @param rectangle Boundary rectangle
     */
    Tooltip.prototype.setBounds = function (rectangle) {
        var oldRect = this._boundingRect;
        if (oldRect.x != rectangle.x || oldRect.y != rectangle.y || oldRect.width != rectangle.width || oldRect.height != rectangle.height) {
            this._boundingRect = rectangle;
            this.invalidate();
        }
    };
    Object.defineProperty(Tooltip.prototype, "boundingContainer", {
        /**
         * Sets a [[Container]] instance to be used when calculating numeric
         * boundaries for the Tooltip.
         *
         * @ignore Exclude from docs
         * @param container  Boundary container
         */
        set: function (container) {
            this._boundingContainer = container;
            // TODO remove closures ?
            container.events.on("sizechanged", this.updateBounds, this);
            container.events.on("positionchanged", this.updateBounds, this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates numeric boundaries for the Tooltip, based on the
     * `boundingCountrainer`.
     */
    Tooltip.prototype.updateBounds = function () {
        var boundingContainer = this._boundingContainer;
        // to global
        var rect = $utils.spriteRectToSvg({
            x: boundingContainer.pixelX,
            y: boundingContainer.pixelY,
            width: boundingContainer.maxWidth,
            height: boundingContainer.maxHeight
        }, boundingContainer);
        this.setBounds(rect);
    };
    Object.defineProperty(Tooltip.prototype, "ignoreBounds", {
        /**
         * @return Ignore chart bounds?
         */
        get: function () {
            return this.getPropertyValue("ignoreBounds");
        },
        /**
         * Normally, a tooltip's position will be adjusted so it always fits into
         * chart's coundaries.
         *
         * Setting this to `false` will disable such checks and will allow tooltip
         * to "bleed over" the edge of the chart.
         *
         * @default false
         * @since 4.10.8
         * @param  value  Ignore chart bounds?
         */
        set: function (value) {
            this.setPropertyValue("ignoreBounds", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "verticalOrientation", {
        /**
         * If tooltipOrientation is vertical, it can be drawn below or above point.
         * We need to know this when solving overlapping.
         *
         * @ignore Exclude from docs
         * @return "up" | "down"
         */
        get: function () {
            return this._verticalOrientation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "tooltip", {
        /**
         * To avoid stackoverflow
         * @ignore
         */
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    Tooltip.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.label.copyFrom(source.label);
        if (source._boundingRect) {
            this._boundingRect = source._boundingRect;
        }
    };
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    Tooltip.prototype.asFunction = function (field) {
        return field == "animationEasing" || _super.prototype.asIs.call(this, field);
    };
    return Tooltip;
}(Container));
export { Tooltip };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Tooltip"] = Tooltip;
//# sourceMappingURL=Tooltip.js.map