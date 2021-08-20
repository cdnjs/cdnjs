/**
 * Axis Bullet module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a positioned bullet (element) on an Axis.
 *
 * ```TypeScript
 * let range = dateAxis.axisRanges.create();
 * range.date = new Date(2018, 0, 5);
 *
 * let flag = new am4plugins_bullets.FlagBullet();
 * flag.label.text = "Hello";
 *
 * range.bullet = flag;
 * ```
 * ```JavaScript
 * var range = dateAxis.axisRanges.create();
 * range.date = new Date(2018, 0, 5);
 *
 * var flag = new am4plugins_bullets.FlagBullet();
 * flag.label.text = "Hello";
 *
 * range.bullet = flag;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "xAxes": [{
 *     "type": "DateAxis",
 *     // ...
 *     "axisRanges": [{
 *       "date": new Date(2018, 0, 5),
 *       "bullet: {
 *         "type": "FlagBullet",
 *         "label": {
 *           "text": "Hello"
 *         }
 *       }
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.5.9
 * @see {@link IAxisBulletEvents} for a list of available events
 * @see {@link IAxisBulletAdapters} for a list of available Adapters
 * @important
 */
var AxisBullet = /** @class */ (function (_super) {
    __extends(AxisBullet, _super);
    function AxisBullet() {
        var _this = _super.call(this) || this;
        _this.className = "AxisBullet";
        _this.location = 0.5;
        _this.isMeasured = false;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisBullet.prototype, "location", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("location");
        },
        /**
         * Relative position within cell/range.
         *
         * Value range is from from `0` (beginning) to `1` (end).
         *
         * NOTE: `location` is relative to the parent axis range's scope, i.e.
         * between its `date` and `endDate` for [[DateAxis]], or `value`/`endValue`
         * ([[ValueAxis]]), or `category`/`endCategory` ([[categoryAxis]]).
         *
         * ```TypeScript
         * let range = dateAxis.axisRanges.create();
         * range.date = new Date(2018, 0, 5);
         * range.endDate = new Date(2018, 0, 6);
         *
         * let bullet = new am4charts.AxisBullet();
         * bullet.location = 1;
         *
         * let flag = bullet.createChild(am4plugins_bullets.FlagBullet);
         * flag.label.text = "Hello";
         * ```
         * ```JavaScript
         * var range = dateAxis.axisRanges.create();
         * range.date = new Date(2018, 0, 5);
         * range.endDate = new Date(2018, 0, 6);
         *
         * var bullet = new am4charts.AxisBullet();
         * bullet.location = 1;
         *
         * var flag = bullet.createChild(am4plugins_bullets.FlagBullet);
         * flag.label.text = "Hello";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     "type": "DateAxis",
         *     // ...
         *     "axisRanges": [{
         *       "date": new Date(2018, 0, 5),
         *       "endDate": new Date(2018, 0, 6),
         *       "bullet: {
         *         "type": "AxisBullet",
         *         "location": 1,
         *         "children": [{
         *           "type": "FlagBullet",
         *           "label": {
         *             "text": "Hello"
         *           }
         *         }]
         *       }
         *     }]
         *   }]
         * }
         * ```
         *
         * @default 0.5
         * @param  value  Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("location", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    AxisBullet.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.axis) {
            this.axis.invalidateDataItems();
        }
        return changed;
    };
    return AxisBullet;
}(Container));
export { AxisBullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisBullet"] = AxisBullet;
//# sourceMappingURL=AxisBullet.js.map