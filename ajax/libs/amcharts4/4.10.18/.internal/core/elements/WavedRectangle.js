/**
 * Functionality for drawing rectangles with waved edges.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Rectangle } from "./Rectangle";
import { wavedLine } from "../rendering/Smoothing";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with waved edges.
 *
 * @see {@link IWavedRectangleEvents} for a list of available events
 * @see {@link IWavedRectangleAdapters} for a list of available Adapters
 */
var WavedRectangle = /** @class */ (function (_super) {
    __extends(WavedRectangle, _super);
    /**
     * Constructor
     */
    function WavedRectangle() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "WavedRectangle";
        // Add path element
        _this.element = _this.paper.add("path");
        // Set defaults
        _this.waveLength = 16;
        _this.waveHeight = 4;
        _this.tension = 0.8;
        _this.setPropertyValue("wavedLeft", true);
        _this.setPropertyValue("wavedRight", true);
        _this.setPropertyValue("wavedTop", true);
        _this.setPropertyValue("wavedBottom", true);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the waved rectangle.
     *
     * @ignore Exclude from docs
     */
    WavedRectangle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.pixelWidth;
        var h = this.pixelHeight;
        if (w > 0 && h > 0) {
            var p1 = { x: 0, y: 0 };
            var p2 = { x: w, y: 0 };
            var p3 = { x: w, y: h };
            var p4 = { x: 0, y: h };
            var waveLengthH = Math.min(w, this.waveLength);
            var waveHeightH = Math.min(h, this.waveHeight);
            var waveLengthV = Math.min(h, this.waveLength);
            var waveHeightV = Math.min(w, this.waveHeight);
            var td = "";
            var rd = "";
            var bd = "";
            var ld = "";
            if (this.wavedTop) {
                td = wavedLine(p1, p2, waveLengthH, waveHeightH, this.tension, true);
            }
            if (this.wavedRight) {
                rd = wavedLine(p2, p3, waveLengthV, waveHeightV, this.tension, true);
            }
            if (this.wavedBottom) {
                bd = wavedLine(p3, p4, waveLengthH, waveHeightH, this.tension, true);
            }
            if (this.wavedLeft) {
                ld = wavedLine(p4, p1, waveLengthV, waveHeightV, this.tension, true);
            }
            this.path = $path.moveTo(p1) + td + $path.lineTo(p2) + rd + $path.lineTo(p3) + bd + $path.lineTo(p4) + ld + "z";
        }
    };
    Object.defineProperty(WavedRectangle.prototype, "waveLength", {
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
    Object.defineProperty(WavedRectangle.prototype, "waveHeight", {
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
    /**
     * Sets which side should be waved or not. If particular side is set to
     * `false`, a straight line will be drawn on that side.
     *
     * @param top     Top waved?
     * @param right   Right side waved?
     * @param bottom  Bottom Waved?
     * @param left    Left side waved?
     */
    WavedRectangle.prototype.setWavedSides = function (top, right, bottom, left) {
        this.wavedTop = top;
        this.wavedRight = right;
        this.wavedBottom = bottom;
        this.wavedLeft = left;
    };
    Object.defineProperty(WavedRectangle.prototype, "tension", {
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
    Object.defineProperty(WavedRectangle.prototype, "wavedRight", {
        /**
         * @return Wave right side?
         */
        get: function () {
            return this.getPropertyValue("wavedRight");
        },
        /**
         * Specifies if right side should be waved.
         *
         * @default true
         * @param value Waved?
         */
        set: function (value) {
            this.setPropertyValue("wavedRight", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedRectangle.prototype, "wavedLeft", {
        /**
         * @return Wave left side?
         */
        get: function () {
            return this.getPropertyValue("wavedLeft");
        },
        /**
         * Specifies if left side should be waved.
         *
         * @default true
         * @param value Waved?
         */
        set: function (value) {
            this.setPropertyValue("wavedLeft", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedRectangle.prototype, "wavedTop", {
        /**
         * @return Wave top side?
         */
        get: function () {
            return this.getPropertyValue("wavedTop");
        },
        /**
         * Specifies if top side should be waved.
         *
         * @default true
         * @param value Waved?
         */
        set: function (value) {
            this.setPropertyValue("wavedTop", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedRectangle.prototype, "wavedBottom", {
        /**
         * @return Wave bottom side?
         */
        get: function () {
            return this.getPropertyValue("wavedBottom");
        },
        /**
         * Specifies if bottom side should be waved.
         *
         * @default true
         * @param value Waved?
         */
        set: function (value) {
            this.setPropertyValue("wavedBottom", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return WavedRectangle;
}(Rectangle));
export { WavedRectangle };
//# sourceMappingURL=WavedRectangle.js.map