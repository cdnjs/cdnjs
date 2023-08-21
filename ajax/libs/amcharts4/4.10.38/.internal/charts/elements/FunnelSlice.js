/**
 * Module that defines everything related to building Funnel slices.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import * as $utils from "../../core/utils/Utils";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to create [[FunnelSlice]] elements.
 *
 * @see {@link IFunnelSliceEvents} for a list of available events
 * @see {@link IFunnelSliceAdapters} for a list of available adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
var FunnelSlice = /** @class */ (function (_super) {
    __extends(FunnelSlice, _super);
    /**
     * Constructor
     */
    function FunnelSlice() {
        var _this = _super.call(this) || this;
        _this.slice = _this.createChild(Sprite);
        _this.slice.shouldClone = false;
        _this.slice.setElement(_this.paper.add("path"));
        _this.slice.isMeasured = false;
        _this.orientation = "vertical";
        _this.bottomWidth = percent(100);
        _this.topWidth = percent(100);
        _this.isMeasured = false;
        _this.width = 10;
        _this.height = 10;
        _this.expandDistance = 0;
        _this.className = "FunnelSlice";
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     */
    FunnelSlice.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var pt = this.pixelPaddingTop;
        var pb = this.pixelPaddingBottom;
        var pr = this.pixelPaddingRight;
        var pl = this.pixelPaddingLeft;
        var w = this.pixelWidth - pr - pl;
        var h = this.pixelHeight - pt - pb;
        var ed = this.expandDistance;
        var path = "";
        if (this.orientation == "vertical") {
            var tw = $utils.relativeToValue(this.topWidth, w);
            var bw = $utils.relativeToValue(this.bottomWidth, w);
            var tl = { x: (w - tw) / 2 + pl, y: pt };
            var tr = { x: (w + tw) / 2 + pl, y: pt };
            var br = { x: (w + bw) / 2 + pl, y: pt + h };
            var bl = { x: (w - bw) / 2 + pl, y: pt + h };
            var cpr = { x: tr.x + (br.x - tr.x) / 2 + ed * h, y: tr.y + 0.5 * h };
            var cpl = { x: tl.x + (bl.x - tl.x) / 2 - ed * h, y: tl.y + 0.5 * h };
            var qp1 = $path.lineTo(br);
            var qp2 = $path.lineTo(tl);
            if (ed != 0) {
                qp1 = $path.quadraticCurveTo(br, cpr);
                qp2 = $path.quadraticCurveTo(tl, cpl);
            }
            path = $path.moveTo(tl) + $path.lineTo(tr) + qp1 + $path.lineTo(bl) + qp2;
            this.tickPoint = { x: tr.x + (br.x - tr.x) / 2, y: tr.y + (br.y - tr.y) / 2 };
        }
        else {
            var tw = $utils.relativeToValue(this.topWidth, h);
            var bw = $utils.relativeToValue(this.bottomWidth, h);
            var tt = { x: pl, y: (h - tw) / 2 + pt };
            var tb = { x: pl, y: (h + tw) / 2 + pt };
            var bt = { x: pl + w, y: (h - bw) / 2 + pt };
            var bb = { x: pl + w, y: (h + bw) / 2 + pt };
            var cpr = { y: tt.y + (bt.y - tt.y) / 2 - ed * w, x: tt.x + 0.5 * w };
            var cpl = { y: tb.y + (bb.y - tb.y) / 2 + ed * w, x: tb.x + 0.5 * w };
            var qp1 = $path.lineTo(bt);
            var qp2 = $path.lineTo(tb);
            if (ed != 0) {
                qp1 = $path.quadraticCurveTo(bt, cpr);
                qp2 = $path.quadraticCurveTo(tb, cpl);
            }
            path = $path.moveTo(tb) + $path.lineTo(tt) + qp1 + $path.lineTo(bb) + qp2;
            this.tickPoint = { y: tb.y + (bb.y - tb.y) / 2, x: tb.x + (bb.x - tb.x) / 2 };
        }
        this.slice.path = path;
        this.invalidateLayout();
    };
    FunnelSlice.prototype.getPoint = function (locationX, locationY) {
        var pt = this.pixelPaddingTop;
        var pb = this.pixelPaddingBottom;
        var pr = this.pixelPaddingRight;
        var pl = this.pixelPaddingLeft;
        var w = this.pixelWidth - pr - pl;
        var h = this.pixelHeight - pt - pb;
        if (this.orientation == "vertical") {
            var tw = $utils.relativeToValue(this.topWidth, w);
            var bw = $utils.relativeToValue(this.bottomWidth, w);
            var tl = { x: (w - tw) / 2 + pl, y: pt };
            var tr = { x: (w + tw) / 2 + pl, y: pt };
            var br = { x: (w + bw) / 2 + pl, y: pt + h };
            var bl = { x: (w - bw) / 2 + pl, y: pt + h };
            var mlx = tl.x + (bl.x - tl.x) * locationY;
            var mrx = tr.x + (br.x - tr.x) * locationY;
            return { x: mlx + (mrx - mlx) * locationX, y: tr.y + (br.y - tr.y) * locationY };
        }
        else {
            var tw = $utils.relativeToValue(this.topWidth, h);
            var bw = $utils.relativeToValue(this.bottomWidth, h);
            var tt = { x: pl, y: (h - tw) / 2 + pt };
            var tb = { x: pl, y: (h + tw) / 2 + pt };
            var bt = { x: pl + w, y: (h - bw) / 2 + pt };
            var bb = { x: pl + w, y: (h + bw) / 2 + pt };
            var mty = tt.y + (bt.y - tt.y) * locationX;
            var mby = tb.y + (bb.y - tb.y) * locationX;
            return { y: mty + (mby - mty) * locationY, x: tt.x + (bt.x - tt.x) * locationX };
        }
    };
    Object.defineProperty(FunnelSlice.prototype, "bottomWidth", {
        /**
         * @return bottom width
         */
        get: function () {
            return this.getPropertyValue("bottomWidth");
        },
        /**
         * Bottom width in pixels or percent.
         *
         * IMPORTANT: this setting might be used to set dimensions if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param value  Bottom width
         */
        set: function (value) {
            this.setPercentProperty("bottomWidth", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "topWidth", {
        /**
         * @return Top width
         */
        get: function () {
            return this.getPropertyValue("topWidth");
        },
        /**
         * Top width in pixels or percent.
         *
         * IMPORTANT: this setting might be used to set dimensions if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param value  Top width
         */
        set: function (value) {
            this.setPercentProperty("topWidth", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "orientation", {
        /**
         * @return Orientation
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
         * Orientation of the funnel slice: "horizontal" or "vertical".
         *
         * IMPORTANT: this setting might be used to set orintation if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param value  Orientation
         */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "expandDistance", {
        /**
         * @return expandDistance
         */
        get: function () {
            return this.getPropertyValue("expandDistance");
        },
        /**
         * A relative distance slice's sides should be bent to. It's relative to the
         * height of the slice.
         *
         * Zero (default) will mean the sides will be perfectly straight.
         *
         * Positive value will make them bend outwards, resulting in "puffed" slices.
         *
         * Negative values will make them bend inwards.
         *
         * @default 0
         * @param {number}
         */
        set: function (value) {
            this.setPropertyValue("expandDistance", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all parameters from another [[Sprite]].
     *
     * @param source Source Sprite
     */
    FunnelSlice.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.slice) {
            this.slice.copyFrom(source.slice);
        }
    };
    return FunnelSlice;
}(Container));
export { FunnelSlice };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FunnelSlice"] = FunnelSlice;
//# sourceMappingURL=FunnelSlice.js.map