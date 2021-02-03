/**
 * Defines Pictorial Stacked Series.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PyramidSeries, PyramidSeriesDataItem } from "./PyramidSeries";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import { percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo: sequenced?
/**
 * Defines a [[DataItem]] for [[PictorialStackedSeries]].
 *
 * @see {@link DataItem}
 */
var PictorialStackedSeriesDataItem = /** @class */ (function (_super) {
    __extends(PictorialStackedSeriesDataItem, _super);
    /**
     * Constructor
     */
    function PictorialStackedSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PictorialStackedSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return PictorialStackedSeriesDataItem;
}(PyramidSeriesDataItem));
export { PictorialStackedSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a PictorialStacked series on a [[SlicedChart]].
 *
 * @see {@link IPictorialStackedSeriesEvents} for a list of available Events
 * @see {@link IPictorialStackedSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
var PictorialStackedSeries = /** @class */ (function (_super) {
    __extends(PictorialStackedSeries, _super);
    /**
     * Constructor
     */
    function PictorialStackedSeries() {
        var _this = _super.call(this) || this;
        _this.className = "PictorialStackedSeries";
        _this.topWidth = percent(100);
        _this.bottomWidth = percent(100);
        _this.valueIs = "height";
        _this.applyTheme();
        _this.startLocation = 0;
        _this.endLocation = 1;
        _this.align = "center";
        _this.valign = "middle";
        _this._maskSprite = _this.slicesContainer.createChild(Sprite);
        _this._maskSprite.visible = false;
        _this._maskSprite.zIndex = 100;
        _this._maskSprite.shouldClone = false;
        return _this;
    }
    /**
     * Sizes the mask to fit the series.
     *
     * @ignore
     */
    PictorialStackedSeries.prototype.validateDataElements = function () {
        var maxWidth = this.slicesContainer.maxWidth;
        var maxHeight = this.slicesContainer.maxHeight;
        var maskSprite = this._maskSprite;
        //maskSprite.validatePosition(); // for some reason size of the maskSprite is 0x0 after we removed validatePosition in afterdraw
        var pictureWidth = maskSprite.measuredWidth / maskSprite.scale;
        var pictureHeight = maskSprite.measuredHeight / maskSprite.scale;
        var scale = $math.min(maxHeight / pictureHeight, maxWidth / pictureWidth);
        if (scale == Infinity) {
            scale = 1; // can't return here, won't draw legend properly
        }
        scale = $math.max(0.001, scale);
        var startLocation = this.startLocation;
        var endLocation = this.endLocation;
        var newWidth = $math.min(maxWidth, pictureWidth * scale);
        var newHeight = $math.min(maxHeight, pictureHeight * scale);
        maskSprite.scale = scale;
        if (this.orientation == "vertical") {
            this.topWidth = newWidth + 4;
            this.bottomWidth = newWidth + 4;
            this.pyramidHeight = newHeight * (endLocation - startLocation);
            maskSprite.x = maxWidth / 2;
            maskSprite.y = newHeight / 2;
        }
        else {
            this.topWidth = newHeight + 4;
            this.bottomWidth = newHeight + 4;
            this.pyramidHeight = newWidth * (endLocation - startLocation);
            maskSprite.valign = "middle";
            maskSprite.x = newWidth / 2;
            maskSprite.y = maxHeight / 2;
        }
        maskSprite.verticalCenter = "middle";
        maskSprite.horizontalCenter = "middle";
        _super.prototype.validateDataElements.call(this);
        var y;
        var x;
        if (this.orientation == "vertical") {
            if (this.valign == "bottom") {
                y = (maxHeight - newHeight);
            }
            if (this.valign == "middle") {
                y = (maxHeight - newHeight) / 2;
            }
            if (this.valign == "top") {
                y = 0;
            }
            if (this.align == "left") {
                x = -(maxWidth - newWidth) / 2;
            }
            if (this.align == "center") {
                x = 0;
            }
            if (this.align == "right") {
                x = (maxWidth - newWidth) / 2;
            }
            this.slices.template.dy = startLocation * newHeight;
            if (this.alignLabels) {
                this.slicesContainer.dx = x;
            }
        }
        else {
            if (this.valign == "bottom") {
                y = (maxHeight - newHeight) / 2;
            }
            if (this.valign == "middle") {
                y = 0;
            }
            if (this.valign == "top") {
                y = -(maxHeight - newHeight) / 2;
            }
            if (this.align == "left") {
                x = 0;
            }
            if (this.align == "center") {
                x = (maxWidth - newWidth) / 2;
            }
            if (this.align == "right") {
                x = (maxWidth - newWidth);
            }
            this.slices.template.dx = startLocation * newWidth;
            if (this.alignLabels) {
                this.slicesContainer.dy = y;
            }
        }
        this.slicesContainer.x = x;
        this.labelsContainer.x = x;
        this.ticksContainer.x = x;
        this.slicesContainer.y = y;
        this.labelsContainer.y = y;
        this.ticksContainer.y = y;
        if (newWidth > 0 && newHeight > 0) {
            this.slicesContainer.mask = maskSprite;
        }
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    PictorialStackedSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Pyramid Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    PictorialStackedSeries.prototype.createDataItem = function () {
        return new PictorialStackedSeriesDataItem();
    };
    Object.defineProperty(PictorialStackedSeries.prototype, "maskSprite", {
        /**
         * A [[Sprite]] element that is used as a series mask.
         *
         * If set, this element's shape will be used to apply shape to the whole
         * stacked pictorial series.
         *
         * You can use this element's `path` property to set an SVG path for the
         * shape:
         *
         * ```TypeScript
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * series.maskSprite.path = iconPath;
         * ```
         * ```JavaScript
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * series.maskSprite.path = iconPath;
         * ```
         * ```JSON
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * {
         *   // ...
         *   "series": [{
         *     "type": "PictorialStackedSeries",
         *     // ...
         *     "maskSprite": {
         *       "path": iconPath
         *     }
         *   }]
         * }
         * ```
         *
         * @return Mask sprite
         */
        get: function () {
            return this._maskSprite;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inits FunnelSlice.
     *
     * @param slice to init
     */
    PictorialStackedSeries.prototype.initSlice = function (slice) {
        _super.prototype.initSlice.call(this, slice);
        var hs = slice.states.getKey("hover");
        if (hs) {
            hs.properties.expandDistance = 0;
        }
    };
    Object.defineProperty(PictorialStackedSeries.prototype, "startLocation", {
        /**
         * @return  Start location
         */
        get: function () {
            return this.getPropertyValue("startLocation");
        },
        /**
         * Relative location to start series from.
         *
         * Range of values: 0 to 1.
         *
         * This setting indicates where actual slices will start relatively to the
         * whole height/width of the series.
         *
         * For example, if we want slices to start at 30% from the top/left of the
         * series, we can set `startLocation = 0.3`.
         *
         * To fill shape outside of the location range, use background of the
         * property `slicesContainer`.
         *
         * ```TypeScript
         * series.startLocation = 0.2;
         * series.endLocation = 0.8;
         * series.slicesContainer.background.fill = am4core.color("#eee");
         * ```
         * ```JavaScript
         * series.startLocation = 0.2;
         * series.endLocation = 0.8;
         * series.slicesContainer.background.fill = am4core.color("#eee");
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "startLocation": 0.2,
         *     "endLocation": 0.8,
         *     "slicesContainer": {
         *       "background": {
         *         "fill": "#eee"
         *       }
         *     }
         *   }]
         * }
         * ```
         *
         * @default 0
         * @since 4.1.13
         * @param  value  Start location
         */
        set: function (value) {
            if (this.setPropertyValue("startLocation", value)) {
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PictorialStackedSeries.prototype, "endLocation", {
        /**
         * @return End location
         */
        get: function () {
            return this.getPropertyValue("endLocation");
        },
        /**
         * Relative location to end series at.
         *
         * Range of values: 0 to 1.
         *
         * This setting indicates where actual slices will end relatively to the
         * whole height/width of the series.
         *
         * For example, if we want slices to end at 70% from the top/left of the
         * series, we can set `endLocation = 0.7`.
         *
         * To fill shape outside of the location range, use background of the
         * property `slicesContainer`.
         *
         * ```TypeScript
         * series.startLocation = 0.2;
         * series.endLocation = 0.8;
         * series.slicesContainer.background.fill = am4core.color("#eee");
         * ```
         * ```JavaScript
         * series.startLocation = 0.2;
         * series.endLocation = 0.8;
         * series.slicesContainer.background.fill = am4core.color("#eee");
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "startLocation": 0.2,
         *     "endLocation": 0.8,
         *     "slicesContainer": {
         *       "background": {
         *         "fill": "#eee"
         *       }
         *     }
         *   }]
         * }
         * ```
         *
         * @default 1
         * @since 4.1.13
         * @param  value  End location
         */
        set: function (value) {
            if (this.setPropertyValue("endLocation", value)) {
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    return PictorialStackedSeries;
}(PyramidSeries));
export { PictorialStackedSeries };
/**
 * bboxter class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PictorialStackedSeries"] = PictorialStackedSeries;
registry.registeredClasses["PictorialStackedSeriesDataItem"] = PictorialStackedSeriesDataItem;
//# sourceMappingURL=PictorialStackedSeries.js.map