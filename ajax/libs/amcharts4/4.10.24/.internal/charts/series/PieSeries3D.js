/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { __extends } from "tslib";
import { PieSeries, PieSeriesDataItem } from "../series/PieSeries";
import { Slice3D } from "../../core/elements/3d/Slice3D";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieSeries3D]].
 *
 * @see {@link DataItem}
 */
var PieSeries3DDataItem = /** @class */ (function (_super) {
    __extends(PieSeries3DDataItem, _super);
    /**
     * Constructor
     */
    function PieSeries3DDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PieSeries3DDataItem";
        _this.values.depthValue = {};
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(PieSeries3DDataItem.prototype, "depthValue", {
        /**
         * @return Depth
         */
        get: function () {
            return this.values["depthValue"].value;
        },
        /**
         * Slice depth (height).
         *
         * @param value  Depth
         */
        set: function (value) {
            this.setValue("depthValue", value);
        },
        enumerable: true,
        configurable: true
    });
    return PieSeries3DDataItem;
}(PieSeriesDataItem));
export { PieSeries3DDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a slice series on a 3D pie chart.
 *
 * @see {@link IPieSeries3DEvents} for a list of available Events
 * @see {@link IPieSeries3DAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var PieSeries3D = /** @class */ (function (_super) {
    __extends(PieSeries3D, _super);
    /**
     * Constructor
     */
    function PieSeries3D() {
        var _this = _super.call(this) || this;
        _this.className = "PieSeries3D";
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object
     * @see {@link DataItem}
     * @return Data Item
     */
    PieSeries3D.prototype.createDataItem = function () {
        return new PieSeries3DDataItem();
    };
    /**
     * creates slice
     */
    PieSeries3D.prototype.createSlice = function () {
        return new Slice3D();
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    PieSeries3D.prototype.validateDataElement = function (dataItem) {
        var slice = dataItem.slice;
        var depth = this.depth;
        if (!$type.isNumber(depth)) {
            depth = this.chart.depth;
        }
        var depthPercent = dataItem.values.depthValue.percent;
        if (!$type.isNumber(depthPercent)) {
            depthPercent = 100;
        }
        slice.depth = depthPercent * depth / 100;
        var angle = this.angle;
        if (!$type.isNumber(angle)) {
            angle = this.chart.angle;
        }
        slice.angle = angle;
        _super.prototype.validateDataElement.call(this, dataItem);
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    PieSeries3D.prototype.validate = function () {
        _super.prototype.validate.call(this);
        for (var i = this._workingStartIndex; i < this._workingEndIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            var slice = dataItem.slice;
            var startAngle = slice.startAngle;
            // find quarter
            //q0 || q1
            if ((startAngle >= -90 && startAngle < 90)) {
                slice.toFront();
            }
            //q2 || q3
            else if ((startAngle >= 90)) {
                slice.toBack();
            }
        }
    };
    Object.defineProperty(PieSeries3D.prototype, "depth", {
        /**
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth (height) of the pie slice in pixels.
         *
         * @param value  Depth (px)
         */
        set: function (value) {
            this.setPropertyValue("depth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries3D.prototype, "angle", {
        /**
         * @return Angle
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * Angle of the view point of the 3D pie. (0-360)
         *
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("angle", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Positions series bullet.
     *
     * @ignore Exclude from docs
     * @param bullet  Bullet
     */
    PieSeries3D.prototype.positionBullet = function (bullet) {
        _super.prototype.positionBullet.call(this, bullet);
        var dataItem = bullet.dataItem;
        var slice = dataItem.slice;
        bullet.y = bullet.pixelY - slice.depth;
    };
    return PieSeries3D;
}(PieSeries));
export { PieSeries3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PieSeries3D"] = PieSeries3D;
registry.registeredClasses["PieSeries3DDataItem"] = PieSeries3DDataItem;
//# sourceMappingURL=PieSeries3D.js.map