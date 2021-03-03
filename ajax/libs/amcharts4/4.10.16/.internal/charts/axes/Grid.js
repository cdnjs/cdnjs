/**
 * A module defining functionality for axis grid elements.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Displays an axis grid line.
 *
 * @see {@link IGridEvents} for a list of available events
 * @see {@link IGridAdapters} for a list of available Adapters
 * @todo Review: container is better, as we'll be able to attach something to the grid, also with 3d charts we might need some additional elements
 * @important
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    /**
     * Constructor
     */
    function Grid() {
        var _this = _super.call(this) || this;
        _this.className = "Grid";
        _this.element = _this.paper.add("path");
        _this.location = 0.5;
        _this.isMeasured = false;
        _this.above = false;
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("grid");
        _this.pixelPerfect = true;
        _this.strokeOpacity = 0.15;
        _this.fill = color(); // "none";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Grid.prototype, "location", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("location");
        },
        /**
         * Location within axis cell to place grid line on.
         *
         * * 0 - start
         * * 0.5 - middle
         * * 1 - end
         *
         * @param value  Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("location", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "above", {
        /**
         * @return Draw above series?
         */
        get: function () {
            return this.getPropertyValue("above");
        },
        /**
         * Normally fill goes below series. Set this to `true` to go above.
         *
         * @default false
         * @since 4.5.9
         * @param  value  Draw above series?
         */
        set: function (value) {
            this.setPropertyValue("above", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    Grid.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.axis) {
            this.axis.invalidateDataItems();
        }
        return changed;
    };
    return Grid;
}(Sprite));
export { Grid };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Grid"] = Grid;
/**
 * Add default responsive rules
 */
/**
 * Disable grid on smaller charts
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.maybeXS,
    state: function (target, stateId) {
        if (target instanceof Grid) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=Grid.js.map