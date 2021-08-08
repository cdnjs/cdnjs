/**
 * Pattern module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { getGhostPaper } from "../Paper";
import { List, ListDisposer } from "../../utils/List";
import { Animation, AnimationDisposer } from "../../utils/Animation";
import { registry } from "../../Registry";
import { InterfaceColorSet } from "../../utils/InterfaceColorSet";
import * as $iter from "../../utils/Iterator";
import * as $object from "../../utils/Object";
import * as $type from "../../utils/Type";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define patterns.
 */
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    //public propertyValues = new Dictionary<PatternProperties, any>();
    /**
     * Constructor
     */
    function Pattern() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * List of elements the pattern consists of.
         */
        _this._elements = new List();
        /**
         * A storage for Filter property/value pairs.
         *
         * @ignore Exclude from docs
         * @see {@link PatternProperties}
         */
        _this.properties = {};
        _this.className = "Pattern";
        // Set defaults
        _this.width = 10;
        _this.height = 10;
        _this.x = 0;
        _this.y = 0;
        _this.patternUnits = "userSpaceOnUse";
        var interfaceColors = new InterfaceColorSet();
        _this.backgroundFill = interfaceColors.getFor("background");
        _this.backgroundOpacity = 0;
        _this.fillOpacity = 1;
        _this.fill = interfaceColors.getFor("alternativeBackground");
        _this.stroke = interfaceColors.getFor("alternativeBackground");
        _this.strokeOpacity = 1;
        _this.strokeWidth = 1;
        _this.shapeRendering = "crispEdges";
        _this.rotation = 0;
        // Create main group to store pattern elements inelements
        _this.element = _this.paper.addGroup("pattern");
        _this.id = "pattern-" + registry.getUniqueId();
        _this.element.attr({ "id": _this.id });
        _this._disposers.push(_this.element);
        // Make elements disposable
        _this._disposers.push(new ListDisposer(_this._elements));
        // Request again to trigger getter/setter code
        _this.patternUnits = _this.patternUnits;
        _this.width = _this.width;
        _this.height = _this.height;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the pattern.
     */
    Pattern.prototype.draw = function () {
        var _this = this;
        var patternElement = this.element;
        if (patternElement) {
            patternElement.removeChildNodes();
            var background = this.paper.add("rect");
            background.attr({ "width": this.width, "height": this.height, "shape-rendering": "crispEdges", "fill": this.backgroundFill.hex, "fill-opacity": this.backgroundOpacity, "stroke": this.backgroundFill.hex, "stroke-opacity": 0 });
            patternElement.add(background);
            patternElement.attr({ "x": this.x, "y": this.y, "width": this.width, "height": this.height, "stroke": this.stroke.hex, "fill": this.fill.hex, "fill-opacity": this.fillOpacity, "stroke-opacity": this.strokeOpacity, "stroke-width": this.strokeWidth, "shape-rendering": this.shapeRendering, "patternUnits": this.patternUnits, "stroke-dasharray": this.strokeDasharray });
            $iter.each(this._elements.iterator(), function (element) {
                element.rotation = _this.rotation;
                element.rotationX = _this.properties["rotationX"];
                element.rotationY = _this.properties["rotationY"];
                _this.element.add(element);
            });
        }
    };
    /**
     * Animate pattern properties.
     *
     * @see {@link Animation}
     * @param animationOptions  Animation options
     * @param duration          Duration (ms)
     * @param easing            Easing function
     * @return Animation instance
     */
    Pattern.prototype.animate = function (animationOptions, duration, easing) {
        return new Animation(this, animationOptions, duration, easing).start();
    };
    /**
     * Adds an element to the pattern.
     *
     * @param element  Element
     */
    Pattern.prototype.addElement = function (element) {
        this._elements.push(element);
        this._disposers.push(element);
    };
    /**
     * Remove an element from the pattern.
     *
     * @param element  Element
     */
    Pattern.prototype.removeElement = function (element) {
        this._elements.removeValue(element);
        this.removeDispose(element);
    };
    Object.defineProperty(Pattern.prototype, "elements", {
        /**
         * Returns the list of SVG elements comprising the pattern.
         *
         * @return Pattern elements
         */
        get: function () {
            return this._elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "fillOpacity", {
        /**
         * @return Opacity (0-1)
         */
        get: function () {
            return this.properties["fillOpacity"];
        },
        /**
         * Pattern fill opacity. (0-1)
         *
         * @param value  Opacity (0-1)
         */
        set: function (value) {
            this.properties["fillOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "fill", {
        /**
         * @return Fill color
         */
        get: function () {
            return this.properties["fill"];
        },
        /**
         * Fill color of the pattern.
         *
         * @param value  Fill color
         */
        set: function (value) {
            this.properties["fill"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "backgroundFill", {
        /**
         * @return Background color
         */
        get: function () {
            return this.properties["backgroundFill"];
        },
        /**
         * Pattern background fill color.
         *
         * @param value  Background color
         */
        set: function (value) {
            this.properties["backgroundFill"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "backgroundOpacity", {
        /**
         * @return Background opacity (0-1)
         */
        get: function () {
            return this.properties["backgroundOpacity"];
        },
        /**
         * Pattern backgorund opacity. (0-1)
         *
         * @param value  Background opacity (0-1)
         */
        set: function (value) {
            this.properties["backgroundOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "stroke", {
        /**
         * @return Color
         */
        get: function () {
            return this.properties["stroke"];
        },
        /**
         * Pattern stroke (border) color.
         *
         * @param value  Color
         */
        set: function (value) {
            this.properties["stroke"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "strokeOpacity", {
        /**
         * @return Opacity (0-1)
         */
        get: function () {
            return this.properties["strokeOpacity"];
        },
        /**
         * Pattern stroke opacity. (0-1)
         *
         * @param value  Opacity (0-1)
         */
        set: function (value) {
            this.properties["strokeOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "strokeWidth", {
        /**
         * @return Stroke thickness (px)
         */
        get: function () {
            return this.properties["strokeWidth"];
        },
        /**
         * Pattern stroke thickness in pixels.
         *
         * @param value  Stroke thickness (px)
         */
        set: function (value) {
            this.properties["strokeWidth"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "shapeRendering", {
        get: function () {
            return this.properties["shapeRendering"];
        },
        /**
         * Shape rendering
         * @param value [description]
         */
        set: function (value) {
            this.properties["shapeRendering"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "rotation", {
        /**
         * @return Rotation
         */
        get: function () {
            return this.properties["rotation"];
        },
        /**
         * Pattern rotation in degrees.
         *
         * @param value  Rotation
         */
        set: function (value) {
            this.properties["rotation"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "patternUnits", {
        /**
         * @return Units
         */
        get: function () {
            return this.properties["patternUnits"];
        },
        /**
         * Pattern measuring units.
         *
         * Available options: "userSpaceOnUse" | "objectBoundingBox".
         *
         * @param value  Units
         */
        set: function (value) {
            this.properties["patternUnits"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "width", {
        /**
         * @return Width (px)
         */
        get: function () {
            return this.properties["width"];
        },
        /**
         * Pattern width in pixels.
         *
         * @param value  Width (px)
         */
        set: function (value) {
            this.properties["width"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "height", {
        /**
         * @return Height (px)
         */
        get: function () {
            return this.properties["height"];
        },
        /**
         * Pattern height in pixels.
         *
         * @param value Height (px)
         */
        set: function (value) {
            this.properties["height"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "x", {
        /**
         * @return X (px)
         */
        get: function () {
            return this.properties["x"];
        },
        /**
         * X position. (pixels)
         *
         * @param value X (px)
         */
        set: function (value) {
            this.properties["x"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "y", {
        /**
         * @return Y (px)
         */
        get: function () {
            return this.properties["y"];
        },
        /**
         * Y position (px).
         *
         * @param value Y (px)
         */
        set: function (value) {
            this.properties["y"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "paper", {
        /**
         * @ignore Exclude from docs
         * @return Paper
         */
        get: function () {
            if (this._paper) {
                return this._paper;
            }
            return getGhostPaper();
        },
        /**
         * [[Paper]] instance to draw pattern in.
         *
         * @ignore Exclude from docs
         * @param paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
                this.draw();
                paper.appendDef(this.element);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties from another Pattern instance.
     *
     * @param source  Source pattern
     */
    Pattern.prototype.copyFrom = function (source) {
        var _this = this;
        _super.prototype.copyFrom.call(this, source);
        $object.each(source.properties, function (key, value) {
            _this[key] = value;
        });
    };
    Object.defineProperty(Pattern.prototype, "animations", {
        /**
         * A list of animations currently running on the patter.
         *
         * @ignore Exclude from docs
         * @return Animation list
         */
        get: function () {
            if (!this._animations) {
                this._animations = [];
                this._disposers.push(new AnimationDisposer(this._animations));
            }
            return this._animations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "strokeDasharray", {
        /**
         * @return `stroke-dasharray`
         */
        get: function () {
            return this.properties["strokeDashArray"];
        },
        /**
         * A `stroke-dasharray` for the stroke (outline).
         *
         * "Dasharray" allows setting rules to make lines dashed, dotted, etc.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more info on `stroke-dasharray`
         * @param value  `stroke-dasharray`
         */
        set: function (value) {
            this.properties["strokeDashArray"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    Pattern.prototype.processConfig = function (config) {
        if (config) {
            // Set up series
            if ($type.hasValue(config.elements) && $type.isArray(config.elements)) {
                for (var i = 0, len = config.elements.length; i < len; i++) {
                    var element = config.elements[i];
                    if ($type.hasValue(element["type"])) {
                        var sprite = this.createEntryInstance(element);
                        if (sprite instanceof BaseObject) {
                            sprite.config = element;
                        }
                        this.addElement($type.hasValue(element["typeProperty"])
                            ? sprite[element["typeProperty"]]
                            : sprite.element);
                    }
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return Pattern;
}(BaseObject));
export { Pattern };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Pattern"] = Pattern;
//# sourceMappingURL=Pattern.js.map