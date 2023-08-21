/**
 * Module that defines everything related to building Curved Columns.
 * It is a container which has CurvedColumn element which is a Sprite.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column } from "./Column";
import { Sprite } from "../../core/Sprite";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import { registry } from "../../core/Registry";
import * as $smoothing from "../../core/rendering/Smoothing";
import { percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates CurvedColumns.
 *
 * @see {@link ICurvedColumnEvents} for a list of available events
 * @see {@link ICurvedColumnAdapters} for a list of available Adapters
 * @important
 */
var CurvedColumn = /** @class */ (function (_super) {
    __extends(CurvedColumn, _super);
    /**
     * Constructor
     */
    function CurvedColumn() {
        var _this = _super.call(this) || this;
        _this.className = "CurvedColumn";
        return _this;
    }
    /**
     * [createAssets description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    CurvedColumn.prototype.createAssets = function () {
        this.curvedColumn = this.createChild(Sprite);
        this.curvedColumn.shouldClone = false;
        this.setPropertyValue("tension", 0.7);
        this.width = percent(120);
        this.height = percent(120);
        // some dirty hack so that if user access column, it won't get error
        this.column = this.curvedColumn;
    };
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    CurvedColumn.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.realWidth;
        var h = this.realHeight;
        var x = this.realX - this.pixelX;
        var y = this.realY - this.pixelY;
        var points;
        // TODO can this be removed ?
        $utils.used(this.width);
        var tensionX = 1;
        var tensionY = 1;
        if (this.orientation == "vertical") {
            tensionX = this.tension;
            points = [{ x: 0, y: h + y }, { x: w / 2, y: y }, { x: w, y: h + y }];
        }
        else {
            tensionY = this.tension;
            h = Math.abs(h);
            points = [{ x: x, y: h }, { x: x + w, y: h / 2 }, { x: x, y: 0 }];
        }
        var path = $path.moveTo(points[0]) + new $smoothing.Tension(tensionX, tensionY).smooth(points);
        this.column.path = path;
    };
    /**
     * Copies all parameters from another [[CurvedColumn]].
     *
     * @param source  Source CurvedColumn
     */
    CurvedColumn.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.curvedColumn) {
            this.curvedColumn.copyFrom(source.curvedColumn);
        }
    };
    Object.defineProperty(CurvedColumn.prototype, "tension", {
        /**
         * @return Tension (0-1)
         */
        get: function () {
            return this.getPropertyValue("tension");
        },
        /**
         * Horizontal tension of the curve.
         *
         * Tension defines how "lose" the line will be.
         *
         * 1 is the maximum tension which would result in pointy columns with
         * straight edges.
         *
         * The smaller the tension th wider the column will be.
         *
         * @default 0.7
         * @param value tension (0-1)
         */
        set: function (value) {
            this.setPropertyValue("tension", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurvedColumn.prototype, "orientation", {
        /**
         * Orientation
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
         * Orientation of the column.
         *
         * Available options: "vertical" (default) and "horizontal".
         *
         * @default "vertical"
         * @param value  Orientation
         */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return CurvedColumn;
}(Column));
export { CurvedColumn };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurvedColumn"] = CurvedColumn;
//# sourceMappingURL=CurvedColumn.js.map