/**
 * Module that defines everything related to building 3D Columns.
 * It is a container which has column3D element which is a Rectangle3D.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column } from "./Column";
import { Rectangle3D } from "../../core/elements/3d/Rectangle3D";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates Column3Ds.
 *
 * @see {@link IColumn3DEvents} for a list of available events
 * @see {@link IColumn3DAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
var Column3D = /** @class */ (function (_super) {
    __extends(Column3D, _super);
    /**
     * Constructor
     */
    function Column3D() {
        var _this = _super.call(this) || this;
        _this.className = "Column3D";
        return _this;
    }
    /**
     * @ignore
     */
    Column3D.prototype.createAssets = function () {
        this.column3D = this.createChild(Rectangle3D);
        this.column3D.shouldClone = false;
        this.column3D.strokeOpacity = 0;
        // some dirty hack so that if user access column, it won't get error
        this.column = this.column3D;
    };
    /**
     * @ignore Exclude from docs
     */
    Column3D.prototype.validate = function () {
        _super.prototype.validate.call(this);
        if (this.column3D) {
            this.column3D.width = this.pixelWidth;
            this.column3D.height = this.pixelHeight;
            if (this.column3D.invalid) {
                this.column3D.validate();
            }
        }
    };
    /**
     * Copies all parameters from another [[Column3D]].
     *
     * @param source Source Column3D
     */
    Column3D.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.column3D) {
            this.column3D.copyFrom(source.column3D);
        }
    };
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    Column3D.prototype.setFill = function (value) {
        _super.prototype.setFill.call(this, value);
        this.column.fill = value;
    };
    return Column3D;
}(Column));
export { Column3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Column3D"] = Column3D;
//# sourceMappingURL=Column3D.js.map