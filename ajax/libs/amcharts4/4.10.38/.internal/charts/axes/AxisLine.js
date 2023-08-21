/**
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
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw Axis line.
 *
 * @see {@link IAxisLineEvents} for a list of available events
 * @see {@link IAxisLineAdapters} for a list of available Adapters
 */
var AxisLine = /** @class */ (function (_super) {
    __extends(AxisLine, _super);
    /**
     * Constructor
     */
    function AxisLine() {
        var _this = _super.call(this) || this;
        _this.className = "AxisLine";
        _this.element = _this.paper.add("path");
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("grid");
        _this.strokeOpacity = 0.15;
        _this.pixelPerfect = true;
        _this.fill = color();
        _this.applyTheme();
        _this.interactionsEnabled = false;
        return _this;
        //this.element.moveTo({ x: 0, y: 0 });
    }
    return AxisLine;
}(Sprite));
export { AxisLine };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisLine"] = AxisLine;
//# sourceMappingURL=AxisLine.js.map