/**
 * Module, defining Axis Renderer for horizontal 3D axes.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererX } from "../axes/AxisRendererX";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Renderer for horizontal 3D axis.
 *
 * @see {@link IAxisRendererX3DEvents} for a list of available events
 * @see {@link IAxisRendererX3DAdapters} for a list of available Adapters
 */
var AxisRendererX3D = /** @class */ (function (_super) {
    __extends(AxisRendererX3D, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererX3D() {
        var _this = _super.call(this) || this;
        /**
         * A related chart.
         *
         * @todo Description
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "AxisRendererX3D";
        _this._disposers.push(_this._chart);
        _this.applyTheme();
        return _this;
    }
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererX3D.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        if (grid.element) {
            var dx = this.chart.dx3D || 0;
            var dy = this.chart.dy3D || 0;
            var h = this.getHeight();
            grid.path = $path.moveTo({ x: dx, y: dy }) + $path.lineTo({ x: dx, y: h + dy }) + $path.lineTo({ x: 0, y: h });
        }
        this.positionItem(grid, point);
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererX3D.prototype.updateBaseGridElement = function () {
        _super.prototype.updateBaseGridElement.call(this);
        var h = this.getHeight();
        var dx = this.chart.dx3D || 0;
        var dy = this.chart.dy3D || 0;
        this.baseGrid.path = $path.moveTo({ x: dx, y: dy }) + $path.lineTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: h });
    };
    Object.defineProperty(AxisRendererX3D.prototype, "chart", {
        /**
         * @ignore Exclude from docs
         * @return Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * Chart, associated with the Axis.
         *
         * @ignore Exclude from docs
         * @param value Chart
         */
        set: function (chart) {
            if (chart) {
                this._chart.set(chart, chart.events.on("propertychanged", this.handle3DChanged, this, false));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Invoked when 3D-related settings change, like depth or angle.
     *
     * @param event Event
     */
    AxisRendererX3D.prototype.handle3DChanged = function (event) {
        if (event.property == "depth" || event.property == "angle") {
            this.invalidate();
        }
    };
    return AxisRendererX3D;
}(AxisRendererX));
export { AxisRendererX3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererX3D"] = AxisRendererX3D;
//# sourceMappingURL=AxisRendererX3D.js.map