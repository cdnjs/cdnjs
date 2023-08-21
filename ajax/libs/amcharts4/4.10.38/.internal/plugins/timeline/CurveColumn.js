/**
 * Module that defines everything related to building CurveColumns.
 * It is a container which has CurveColumn element which is a Slice.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column } from "../../charts/elements/Column";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to create CurveColumns.
 *
 * @see {@link ICurveColumnEvents} for a list of available events
 * @see {@link ICurveColumnAdapters} for a list of available Adapters
 * @important
 */
var CurveColumn = /** @class */ (function (_super) {
    __extends(CurveColumn, _super);
    /**
     * Constructor
     */
    function CurveColumn() {
        var _this = _super.call(this) || this;
        _this.className = "CurveColumn";
        return _this;
    }
    /**
     * @ignore
     */
    CurveColumn.prototype.createAssets = function () {
        this.curveColumn = this.createChild(Sprite);
        this.CurveColumn = this.curveColumn; // because of an inital mistake, leave ref
        this.curveColumn.shouldClone = false;
        this.curveColumn.strokeOpacity = undefined;
        // some dirty hack so that if user access column, it won't get error
        this.column = this.curveColumn;
    };
    /**
     * Copies all parameters from another [[CurveColumn]].
     *
     * @param source Source CurveColumn
     */
    CurveColumn.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.curveColumn) {
            this.curveColumn.copyFrom(source.curveColumn);
        }
    };
    return CurveColumn;
}(Column));
export { CurveColumn };
/**
 * Regiscolumn system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveColumn"] = CurveColumn;
//# sourceMappingURL=CurveColumn.js.map