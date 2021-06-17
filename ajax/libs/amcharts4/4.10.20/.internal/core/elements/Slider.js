/**
 * Slider is a scrollbar with just one selection grip.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Scrollbar } from "../../core/elements/Scrollbar";
import { registry } from "../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a slider - a version of scrollbar with just one grip.
 *
 * @see {@link ISliderEvents} for a list of available events
 * @see {@link ISliderAdapters} for a list of available Adapters
 */
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    /**
     * Constructor
     */
    function Slider() {
        var _this = _super.call(this) || this;
        _this.className = "Slider";
        _this.thumb.opacity = 0;
        _this.thumb.interactionsEnabled = false;
        _this.endGrip.opacity = 0;
        _this.endGrip.interactionsEnabled = false;
        _this.startGrip.events.on("drag", function () {
            _this.endGrip.x = _this.startGrip.x;
            _this.endGrip.y = _this.startGrip.y;
        });
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Slider.prototype, "__end", {
        /**
         * @return [description]
         */
        get: function () {
            return this._start;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "end", {
        /**
         * @return [description]
         */
        get: function () {
            return this._start;
        },
        /**
         * Relative position (0-1) of the end grip.
         *
         * @param position  Position (0-1)
         */
        set: function (position) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "start", {
        /**
         * @return Position (0-1)
         */
        get: function () {
            return this._start;
        },
        /**
         * Relative position (0-1) of the start grip.
         *
         * @param position  Position (0-1)
         */
        set: function (position) {
            if (!this._isBusy) {
                this.__start = position;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Slider;
}(Scrollbar));
export { Slider };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Slider"] = Slider;
//# sourceMappingURL=Slider.js.map