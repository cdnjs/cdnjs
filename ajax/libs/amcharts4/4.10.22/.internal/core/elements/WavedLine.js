/**
 * Functionality for drawing waved lines.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Line } from "./Line";
import { color } from "../utils/Color";
import { wavedLine } from "../rendering/Smoothing";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a waved line.
 *
 * @see {@link IWavedLineEvents} for a list of available events
 * @see {@link IWavedLineAdapters} for a list of available Adapters
 */
var WavedLine = /** @class */ (function (_super) {
    __extends(WavedLine, _super);
    /**
     * Constructor
     */
    function WavedLine() {
        var _this = _super.call(this) || this;
        _this.className = "WavedLine";
        _this.element = _this.paper.add("path");
        _this.waveLength = 16;
        _this.waveHeight = 4;
        _this.tension = 0.8;
        _this.pixelPerfect = false;
        _this.fill = color();
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the waved line.
     *
     * @ignore Exclude from docs
     */
    WavedLine.prototype.draw = function () {
        //super.draw();
        var p1 = { x: this.x1, y: this.y1 };
        var p2 = { x: this.x2, y: this.y2 };
        this.path = $path.moveTo(p1) + wavedLine(p1, p2, this.waveLength, this.waveHeight, this.tension, true);
    };
    Object.defineProperty(WavedLine.prototype, "waveLength", {
        /**
         * @return Wave length (px)
         */
        get: function () {
            return this.getPropertyValue("waveLength");
        },
        /**
         * Wave length in pixels.
         *
         * @default 16
         * @param value  Wave length (px)
         */
        set: function (value) {
            this.setPropertyValue("waveLength", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedLine.prototype, "waveHeight", {
        /**
         * @return Wave height (px)
         */
        get: function () {
            return this.getPropertyValue("waveHeight");
        },
        /**
         * Wave height in pixels.
         *
         * @default 4
         * @param value  Wave height (px)
         */
        set: function (value) {
            this.setPropertyValue("waveHeight", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedLine.prototype, "tension", {
        /**
         * @return Tension
         */
        get: function () {
            return this.getPropertyValue("tension");
        },
        /**
         * Tension of the wave.
         *
         * @default 0.8
         * @param value  Tension
         */
        set: function (value) {
            this.setPropertyValue("tension", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    return WavedLine;
}(Line));
export { WavedLine };
//# sourceMappingURL=WavedLine.js.map