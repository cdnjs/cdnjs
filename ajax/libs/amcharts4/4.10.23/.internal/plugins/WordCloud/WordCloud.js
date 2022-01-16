/**
 * WordCloud chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, SerialChartDataItem } from "../../charts/types/SerialChart";
import { WordCloudSeries } from "./WordCloudSeries";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[WordCloud]].
 *
 * @see {@link DataItem}
 */
var WordCloudDataItem = /** @class */ (function (_super) {
    __extends(WordCloudDataItem, _super);
    /**
     * Constructor
     */
    function WordCloudDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "WordCloudDataItem";
        _this.applyTheme();
        return _this;
    }
    return WordCloudDataItem;
}(SerialChartDataItem));
export { WordCloudDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class for "percent-based" chart types like Pie and Funnel.
 *
 * @see {@link IWordCloudEvents} for a list of available Events
 * @see {@link IWordCloudAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/wordcloud/} for documentation
 */
var WordCloud = /** @class */ (function (_super) {
    __extends(WordCloud, _super);
    /**
     * Constructor
     */
    function WordCloud() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "WordCloud";
        _this.seriesContainer.isMeasured = true;
        _this.seriesContainer.layout = "absolute";
        _this._usesData = true;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates a new [[PercentSeries]].
     *
     * @return New series
     */
    WordCloud.prototype.createSeries = function () {
        return new WordCloudSeries();
    };
    return WordCloud;
}(SerialChart));
export { WordCloud };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @hidden
 */
registry.registeredClasses["WordCloud"] = WordCloud;
registry.registeredClasses["WordCloudDataItem"] = WordCloudDataItem;
//# sourceMappingURL=WordCloud.js.map