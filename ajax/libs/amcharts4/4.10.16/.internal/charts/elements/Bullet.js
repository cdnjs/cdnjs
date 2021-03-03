/**
 * Module that defines everything related to building bullets.
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
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates bullets.
 *
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    /**
     * Constructor
     */
    function Bullet() {
        var _this = _super.call(this) || this;
        _this.className = "Bullet";
        _this.isMeasured = false;
        _this.tooltipX = 0;
        _this.tooltipY = 0;
        _this.layout = "none";
        _this.applyOnClones = true;
        _this.copyToLegendMarker = true;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Bullet.prototype, "locationX", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("locationX");
        },
        /**
         * Relative horizontal location within cell. (0-1)
         *
         * @param value  Location (0-1)
         */
        set: function (value) {
            if (this.setPropertyValue("locationX", value)) {
                var dataItem = this.dataItem;
                if (dataItem && dataItem.component) {
                    dataItem.component.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "locationY", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("locationY");
        },
        /**
         * Relative vertical location within cell. (0-1)
         *
         * @param value  Location (0-1)
         */
        set: function (value) {
            if (this.setPropertyValue("locationY", value)) {
                var dataItem = this.dataItem;
                if (dataItem && dataItem.component) {
                    dataItem.component.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "xField", {
        /**
         * @return [description]
         */
        get: function () {
            return this.getPropertyValue("xField");
        },
        /**
         * [xField description]
         *
         * @todo Description
         * @param value  [description]
         */
        set: function (value) {
            this.setPropertyValue("xField", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "yField", {
        /**
         * @return [description]
         */
        get: function () {
            return this.getPropertyValue("yField");
        },
        /**
         * [yField description]
         *
         * Description
         * @param value  [description]
         */
        set: function (value) {
            this.setPropertyValue("yField", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "isDynamic", {
        /**
         * @return Redraw on data change?
         */
        get: function () {
            return this.getPropertyValue("isDynamic");
        },
        /**
         * Indicates if the bullet is "dynamic".
         *
         * In most cases the bullets remain the same, even if the underlying data
         * changes.
         *
         * However, in cases where bullet also displays a label, or its size depends
         * on data, it also needs to be redrawn when the underlying data changes.
         *
         * Only those bullets that have set `isDynamic = true` will be redrawn each
         * time data changes. Regular bullets will be reused as they are.
         *
         * @default false
         * @param value  Redraw on data change?
         */
        set: function (value) {
            this.setPropertyValue("isDynamic", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "copyToLegendMarker", {
        /**
         * @return Redraw on data change?
         */
        get: function () {
            return this.getPropertyValue("copyToLegendMarker");
        },
        /**
         * Indicates if the bullet should be copied to legend marker
         *
         * @default false
         * @param value  Redraw on data change?
         */
        set: function (value) {
            this.setPropertyValue("copyToLegendMarker", value);
        },
        enumerable: true,
        configurable: true
    });
    return Bullet;
}(Container));
export { Bullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Bullet"] = Bullet;
/**
 * Add default responsive rules
 */
/**
 * Hide bullets
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.isXS,
    state: function (target, stateId) {
        if (target instanceof Bullet) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=Bullet.js.map