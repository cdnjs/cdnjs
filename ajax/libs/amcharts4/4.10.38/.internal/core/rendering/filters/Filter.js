/**
 * This module contains a base class for an SVG filter.
 *
 * Filters can be used to decorate, change and transform just about any DOM
 * element.
 *
 * A Filter works by applying one or more effects (primitives) to SVG element.
 *
 * For more information on how SVG filters work, refer to
 * [this MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Filters_Tutorial).
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
import { Animation, AnimationDisposer } from "../../utils/Animation";
import { List } from "../../utils/List";
import * as $object from "../../utils/Object";
import * as $iter from "../../utils/Iterator";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base filter class.
 *
 * This class while can be instantiated will not do anything. It is just a base
 * functionality for any other "real" filters to extend.
 *
 * Filters can be used to decorate, change and transform just about any DOM
 * element.
 *
 * A Filter works by applying one or more effects (primitives) to SVG element.
 *
 * For more information on how SVG filters work, refer to
 * [this MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Filters_Tutorial).
 *
 * @todo Example
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    /**
     * Constructor
     */
    function Filter() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A storage for Filter property/value pairs.
         *
         * @ignore Exclude from docs
         * @see {@link FilterProperties}
         */
        _this.properties = {};
        /**
         * Identifies if this object is a "template" and should not be treated as
         * real object that is drawn or actually used in the chart.
         */
        _this.isTemplate = false;
        /**
         * [_scale description]
         *
         * @todo Description
         */
        _this._scale = 1;
        /**
         * [_nonScaling description]
         *
         * @todo Description
         */
        _this._nonScaling = true;
        _this.className = "Filter";
        // Create a list to hold primitives (effect elements)
        _this.filterPrimitives = new List();
        _this.properties.filterUnits = "objectBoundingBox";
        // Automatically add added primitives to `_disposers` so they are discarded
        // when Filter object is destroyed (disposed)
        _this.filterPrimitives.events.on("inserted", function (ev) {
            _this._disposers.push(ev.newValue);
        });
        // Set default dimensions
        _this.width = 120;
        _this.height = 120;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Appends actual filter elements to the filter group.
     *
     * @ignore Exclude from docs
     * @param filterElement An SVG `<group>` element to add filter element to
     */
    Filter.prototype.appendPrimitives = function (filterElement) {
        $iter.each(this.filterPrimitives.iterator(), function (filterPrimitive) {
            filterElement.add(filterPrimitive);
        });
    };
    /**
     * Uses Transitions filter's values from current to target. This is used to
     * smoothly appear filter, rather than it pop into effect.
     *
     * @ignore Exclude from docs
     * @param animationOptions  Animation options
     * @param duration          Duration in milliseconds
     * @param easing            Easing function
     * @return Animation instance
     */
    Filter.prototype.animate = function (animationOptions, duration, easing) {
        var animation = new Animation(this, animationOptions, duration, easing).start();
        return animation;
    };
    Object.defineProperty(Filter.prototype, "width", {
        /**
         * @return Width (%)
         */
        get: function () {
            return this.properties["width"];
        },
        /**
         * Width of the filter element in percent.
         *
         * If the filter is designed to "bleed out" of the original target element,
         * like for example a shadow, you need this bigger than 100, or the
         * non-fitting parts will be clipped.
         *
         * @default 120
         * @param value Width (px)
         */
        set: function (value) {
            this.properties["width"] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "height", {
        /**
         * @return Height
         */
        get: function () {
            return this.properties["height"];
        },
        /**
         * Height of the filter element in percent.
         *
         * If the filter is designed to "bleed out" of the original target element,
         * like for example a shadow, you need this bigger than 100, or the
         * non-fitting parts will be clipped.
         *
         * @default 120
         * @param value Height (%)
         */
        set: function (value) {
            this.properties["height"] = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties from another [[Filter]] object.
     *
     * @param filter Source [[Filter]] object
     */
    Filter.prototype.copyFrom = function (filter) {
        var _this = this;
        _super.prototype.copyFrom.call(this, filter);
        $object.each(filter.properties, function (key, value) {
            _this[key] = value;
        });
    };
    Object.defineProperty(Filter.prototype, "paper", {
        /**
         * @return Paper
         */
        get: function () {
            if (this._paper) {
                return this._paper;
            }
            return getGhostPaper();
        },
        /**
         * Sets [[Paper]] instance to create filter's elements in.
         *
         * @ignore Exclude from docs
         * @param paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "animations", {
        /**
         * All animations currently in play.
         *
         * @ignore Exclude from docs
         * @return List of animations
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
    Object.defineProperty(Filter.prototype, "scale", {
        /**
         * @ignore Exclude from docs
         */
        get: function () {
            return this._scale;
        },
        /**
         * [[Sprite]] uses this method to inform filter about it's scale.
         *
         * @ignore Exclude from docs
         */
        set: function (value) {
            this._scale = value;
            this.updateScale();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates filter properties which depend on scale.
     *
     * @ignore Exclude from docs
     */
    Filter.prototype.updateScale = function () {
        // Dummy method for extending classes to override.
    };
    Object.defineProperty(Filter.prototype, "filterUnits", {
        /**
         * @return Filter units
         */
        get: function () {
            return this.properties.filterUnits;
        },
        /**
         * Which units are used when drawing filter.
         *
         * Use `"userSpaceOnUse"` when applying filters on a perfectly straight line.
         *
         * @since 4.9.17
         * @default objectBoundingBox
         * @param value Filter units
         */
        set: function (value) {
            this.properties.filterUnits = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "nonScaling", {
        /**
         * @return Non scaling?
         */
        get: function () {
            return this._nonScaling;
        },
        /**
         * If a filter is non scaling, it will look the same even if the sprite is
         * scaled, otherwise filter will scale together with a [[Sprite]].
         *
         * @default false
         * @param value  Non scaling?
         */
        set: function (value) {
            this._nonScaling = value;
            if (!value) {
                this._scale = 1;
            }
            this.updateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "sprite", {
        /**
         * A target element this filter is currently attached to.
         *
         * We need to keep track of it because one filter can be used for just one
         * element, so we have to remove it from the old "parent" when attaching to
         * the new one.
         *
         * @ignore Exclude from docs
         * @param value  Target element
         */
        set: function (value) {
            this.setSprite(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets filter's target element.
     *
     * @ignore Exclude from docs
     * @param value  Element filter is being attached to
     */
    Filter.prototype.setSprite = function (value) {
        if (this._sprite && this._sprite != value) {
            this._sprite.filters.removeValue(this);
        }
        this._sprite = value;
    };
    return Filter;
}(BaseObject));
export { Filter };
//# sourceMappingURL=Filter.js.map