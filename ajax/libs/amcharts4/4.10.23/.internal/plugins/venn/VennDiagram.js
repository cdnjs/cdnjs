/**
 * Venn Diagram module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentChart, PercentChartDataItem } from "../../charts/types/PercentChart";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[VennDiagram]].
 *
 * @see {@link DataItem}
 */
var VennDiagramDataItem = /** @class */ (function (_super) {
    __extends(VennDiagramDataItem, _super);
    /**
     * Constructor
     */
    function VennDiagramDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "VennDiagramDataItem";
        _this.applyTheme();
        return _this;
    }
    return VennDiagramDataItem;
}(PercentChartDataItem));
export { VennDiagramDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Venn Diagram.
 *
 * Venn diagram uses Ben Frederickson's [venn.js](https://github.com/benfred/venn.js).
 *
 * @see {@link IVennDiagramEvents} for a list of available Events
 * @see {@link IVennDiagramAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/venn/} for documentation
 * @important
 * @since 4.9.0
 */
var VennDiagram = /** @class */ (function (_super) {
    __extends(VennDiagram, _super);
    /**
     * Constructor
     */
    function VennDiagram() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "VennDiagram";
        _this.seriesContainer.layout = "horizontal";
        _this.padding(15, 15, 15, 15);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    VennDiagram.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Venn Diagram");
        }
    };
    /**
     * @ignore
     */
    VennDiagram.prototype.setLegend = function (legend) {
        _super.prototype.setLegend.call(this, legend);
        if (legend) {
            legend.valueLabels.template.disabled = true;
        }
    };
    return VennDiagram;
}(PercentChart));
export { VennDiagram };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["VennDiagram"] = VennDiagram;
registry.registeredClasses["VennDiagramDataItem"] = VennDiagramDataItem;
//# sourceMappingURL=VennDiagram.js.map