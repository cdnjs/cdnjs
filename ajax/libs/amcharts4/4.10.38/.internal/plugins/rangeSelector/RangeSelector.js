/**
 * Base class for axis range selector classes.
 */
import { __extends } from "tslib";
import { Validatable } from "../../core/utils/Validatable";
import { registry } from "../../core/Registry";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Language } from "../../core/utils/Language";
import selectorCSS from "./RangeSelectorCSS";
import * as $dom from "../../core/utils/DOM";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for axis-specific range selectors.
 */
var RangeSelector = /** @class */ (function (_super) {
    __extends(RangeSelector, _super);
    /**
     * Constructor
     */
    function RangeSelector() {
        var _this = _super.call(this) || this;
        /**
         * An instance of [[Language]].
         */
        _this._language = new MutableValueDisposer();
        /**
         * Prefix for class names applied to control elements.
         */
        _this._classPrefix = "amcharts-range-selector";
        /**
         * If set to `true` [[RangeSelector]] will load it's own external CSS when
         * instantiated.
         */
        _this._defaultStyles = true;
        /**
         * Holds references to various HTML elements control consists of.
         */
        _this._elements = {};
        /**
         * Position of the selector.
         */
        _this._position = "bottom";
        /**
         * A tabindex to apply to control.
         */
        _this._tabindex = 0;
        _this.className = "RangeSelector";
        _this._disposers.push(_this._language);
        _this.invalidate();
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)draws the control.
     *
     * @ignore Exclude from docs
     */
    RangeSelector.prototype.validate = function () {
        this.draw();
        _super.prototype.validate.call(this);
    };
    /**
     * Draws the control.
     *
     * @ignore
     */
    RangeSelector.prototype.draw = function () {
        if (this.defaultStyles) {
            this.loadDefaultCSS();
        }
        // Selector wrapper
        if (!this._elements.wrapper) {
            this._elements.wrapper = document.createElement("div");
            this._elements.wrapper.className = this.classPrefix + "-wrapper " + this.classPrefix + "-" + this.position;
            this.container.appendChild(this._elements.wrapper);
        }
    };
    /**
     * Destroys the control and all its elements.
     */
    RangeSelector.prototype.dispose = function () {
        if (!this._disposed) {
            _super.prototype.dispose.call(this);
            if (this._element && this._element.parentNode) {
                this._element.parentNode.removeChild(this._element);
            }
            if (this._elements.wrapper && this._elements.wrapper.parentNode) {
                this._elements.wrapper.parentNode.removeChild(this._elements.wrapper);
            }
        }
    };
    Object.defineProperty(RangeSelector.prototype, "container", {
        /**
         * @return Container
         */
        get: function () {
            return this._container;
        },
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
        set: function (container) {
            this._container = container;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "position", {
        /**
         * @return Position
         */
        get: function () {
            return this._position;
        },
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
        set: function (value) {
            if (this._position != value) {
                var prevPosition = this._position;
                this._position = value;
                this.dispatchImmediately("positionset", {
                    type: "positionset",
                    position: value,
                    prevPosition: prevPosition
                });
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "defaultStyles", {
        /**
         * @return Should RangeSelector load its own CSS?
         */
        get: function () {
            return this._defaultStyles;
        },
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
        set: function (value) {
            if (this._defaultStyles != value) {
                this._defaultStyles = value;
                if (value) {
                    this.loadDefaultCSS();
                }
            }
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the default CSS.
     *
     * @ignore Exclude from docs
     */
    RangeSelector.prototype.loadDefaultCSS = function () {
        this._disposers.push(selectorCSS($dom.getShadowRoot(this.container), this.classPrefix));
        if (this._element) {
            this._element.style.display = "";
        }
    };
    Object.defineProperty(RangeSelector.prototype, "tabindex", {
        /**
         * @return Tab index
         */
        get: function () {
            return this._tabindex;
        },
        /**
         * A tab index for the menu.
         *
         * Tab index will influence the order in which elements on the chart and
         * the whole page are selected when pressing TAB key.
         *
         * @param value Tab index
         */
        set: function (value) {
            this._tabindex = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "language", {
        /**
         * @return A [[Language]] instance to be used
         */
        get: function () {
            var _this = this;
            var language = this._language.get();
            if (language == null) {
                language = new Language();
                // Maybe use one from axis?
                if (this._axis) {
                    return this._axis.language;
                }
                // TODO code duplication with `set language()`
                this._language.set(language, language.events.on("localechanged", function (ev) {
                    _this.invalidate();
                }));
            }
            return language;
        },
        /**
         * A [[Language]] instance.
         *
         * @param value An instance of [[Language]]
         */
        set: function (value) {
            var _this = this;
            this._language.set(value, value.events.on("localechanged", function (ev) {
                _this.invalidate();
            }));
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "classPrefix", {
        /**
         * @return Class name prefix
         */
        get: function () {
            return this._classPrefix;
        },
        /**
         * Class name prefix.
         *
         * @default "amexport"
         * @param value Class name prefix
         */
        set: function (value) {
            this._classPrefix = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "axis", {
        /**
         * @return Axis
         */
        get: function () {
            return this._axis;
        },
        /**
         * A target axis to use range selector for.
         *
         * @param  value  Axis
         */
        set: function (value) {
            if (this._axis != value) {
                this._axis = value;
                this.prepAxis();
                this.language = value.language;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    RangeSelector.prototype.prepAxis = function () {
        var _this = this;
        if (this._axis) {
            this._disposers.push(this._axis.events.on("beforedisposed", function (ev) {
                _this.dispose();
            }));
        }
    };
    return RangeSelector;
}(Validatable));
export { RangeSelector };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RangeSelector"] = RangeSelector;
//# sourceMappingURL=RangeSelector.js.map