/**
 * Zoom control module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Button } from "../../core/elements/Button";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
import { MutableValueDisposer, MultiDisposer } from "../../core/utils/Disposer";
import { keyboard } from "../../core/utils/Keyboard";
import { getInteraction } from "../../core/interaction/Interaction";
import { percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a control for zooming the map.
 *
 * @see {@link IZoomControlEvents} for a list of available events
 * @see {@link IZoomControlAdapters} for a list of available Adapters
 * @important
 */
var ZoomControl = /** @class */ (function (_super) {
    __extends(ZoomControl, _super);
    /**
     * Constructor
     */
    function ZoomControl() {
        var _this = _super.call(this) || this;
        /**
         * A target map.
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "ZoomControl";
        _this.align = "right";
        _this.valign = "bottom";
        _this.layout = "vertical";
        _this.padding(5, 5, 5, 5);
        var interfaceColors = new InterfaceColorSet();
        var plusButton = _this.createChild(Button);
        plusButton.shouldClone = false;
        plusButton.label.text = "+";
        //plusButton.fontFamily = "Verdana";
        _this.plusButton = plusButton;
        var slider = _this.createChild(Container);
        slider.shouldClone = false;
        slider.background.fill = interfaceColors.getFor("alternativeBackground");
        slider.background.fillOpacity = 0.05;
        slider.background.events.on("hit", _this.handleBackgroundClick, _this, false);
        slider.events.on("sizechanged", _this.updateThumbSize, _this, false);
        _this.slider = slider;
        var thumb = slider.createChild(Button);
        thumb.shouldClone = false;
        thumb.padding(0, 0, 0, 0);
        thumb.draggable = true;
        thumb.events.on("drag", _this.handleThumbDrag, _this, false);
        _this.thumb = thumb;
        var minusButton = _this.createChild(Button);
        minusButton.shouldClone = false;
        minusButton.label.text = "-";
        //minusButton.fontFamily = "Verdana";
        _this.minusButton = minusButton;
        // Set roles
        _this.thumb.role = "slider";
        _this.thumb.readerLive = "polite";
        // Set reader text
        _this.thumb.readerTitle = _this.language.translate("Use arrow keys to zoom in and out");
        _this.minusButton.readerTitle = _this.language.translate("Press ENTER to zoom in");
        _this.plusButton.readerTitle = _this.language.translate("Press ENTER to zoom out");
        _this.applyTheme();
        _this.events.on("propertychanged", function (event) {
            if (event.property == "layout") {
                _this.fixLayout();
            }
        }, undefined, false);
        _this._disposers.push(_this._chart);
        _this.fixLayout();
        return _this;
    }
    /**
     * @ignore
     */
    ZoomControl.prototype.fixLayout = function () {
        var plusButton = this.plusButton;
        var minusButton = this.minusButton;
        var thumb = this.thumb;
        var slider = this.slider;
        plusButton.x = undefined;
        plusButton.y = undefined;
        minusButton.x = undefined;
        minusButton.y = undefined;
        thumb.x = undefined;
        thumb.y = undefined;
        slider.x = undefined;
        slider.y = undefined;
        plusButton.padding(6, 10, 6, 10);
        minusButton.padding(6, 10, 6, 10);
        minusButton.label.align = "center";
        minusButton.label.valign = "middle";
        plusButton.label.align = "center";
        plusButton.label.valign = "middle";
        if (this.layout == "vertical") {
            this.width = 40;
            this.height = undefined;
            minusButton.width = percent(100);
            minusButton.height = undefined;
            thumb.width = percent(100);
            thumb.height = undefined;
            plusButton.width = percent(100);
            plusButton.height = undefined;
            slider.width = percent(100);
            minusButton.marginTop = 1;
            plusButton.marginBottom = 2;
            slider.height = 0;
            minusButton.toFront();
            plusButton.toBack();
            thumb.minX = 0;
            thumb.maxX = 0;
            thumb.minY = 0;
        }
        else if (this.layout == "horizontal") {
            this.height = 40;
            this.width = undefined;
            minusButton.height = percent(100);
            minusButton.width = undefined;
            plusButton.height = percent(100);
            plusButton.width = undefined;
            thumb.height = percent(100);
            thumb.width = undefined;
            thumb.minX = 0;
            thumb.minY = 0;
            thumb.maxY = 0;
            slider.height = percent(100);
            slider.width = 0;
            minusButton.toBack();
            plusButton.toFront();
        }
    };
    /**
     * Handles zoom operation after clicking on the slider background.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    ZoomControl.prototype.handleBackgroundClick = function (event) {
        var sprite = event.target;
        var y = event.spritePoint.y;
        var chart = this.chart;
        var maxPower = Math.log(chart.maxZoomLevel) / Math.LN2;
        var minPower = Math.log(chart.minZoomLevel) / Math.LN2;
        var power = (sprite.pixelHeight - y) / sprite.pixelHeight * (minPower + (maxPower - minPower));
        var zoomLevel = Math.pow(2, power);
        chart.zoomToGeoPoint(chart.zoomGeoPoint, zoomLevel);
    };
    Object.defineProperty(ZoomControl.prototype, "chart", {
        /**
         * @return Map/chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * A main chart/map that this zoom control is for.
         *
         * @param chart  Map/chart
         */
        set: function (chart) {
            var _this = this;
            this._chart.set(chart, new MultiDisposer([
                chart.events.on("maxsizechanged", this.updateThumbSize, this, false),
                chart.events.on("zoomlevelchanged", this.updateThumb, this, false),
                this.minusButton.events.on("hit", function () { chart.zoomOut(chart.zoomGeoPoint); }, chart, false),
                getInteraction().body.events.on("keyup", function (ev) {
                    if (_this.topParent.hasFocused) {
                        // ENTER is now handled globally
                        if (keyboard.isKey(ev.event, "plus")) {
                            chart.zoomIn();
                        }
                        else if (keyboard.isKey(ev.event, "minus")) {
                            chart.zoomOut();
                        }
                    }
                }, chart),
                this.plusButton.events.on("hit", function () { chart.zoomIn(chart.zoomGeoPoint); }, chart, false)
            ]));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the slider's thumb size based on the available zoom space.
     *
     * @ignore Exclude from docs
     */
    ZoomControl.prototype.updateThumbSize = function () {
        var chart = this.chart;
        if (chart) {
            var slider = this.slider;
            var thumb = this.thumb;
            if (this.layout == "vertical") {
                thumb.minHeight = Math.min(this.slider.pixelHeight, 20);
                thumb.height = slider.pixelHeight / this.stepCount;
                thumb.maxY = slider.pixelHeight - thumb.pixelHeight;
                if (thumb.pixelHeight <= 1) {
                    thumb.visible = false;
                }
                else {
                    thumb.visible = true;
                }
            }
            else {
                thumb.minWidth = Math.min(this.slider.pixelWidth, 20);
                thumb.width = slider.pixelWidth / this.stepCount;
                thumb.maxX = slider.pixelWidth - thumb.pixelWidth;
                if (thumb.pixelWidth <= 1) {
                    thumb.visible = false;
                }
                else {
                    thumb.visible = true;
                }
            }
        }
    };
    /**
     * Updates thumb according to current zoom position from map.
     *
     * @ignore Exclude from docs
     */
    ZoomControl.prototype.updateThumb = function () {
        var slider = this.slider;
        var chart = this.chart;
        var thumb = this.thumb;
        if (!thumb.isDown) {
            var step = (Math.log(chart.zoomLevel) - Math.log(this.chart.minZoomLevel)) / Math.LN2;
            if (this.layout == "vertical") {
                thumb.y = slider.pixelHeight - (slider.pixelHeight - thumb.pixelHeight) * step / this.stepCount - thumb.pixelHeight;
            }
            else {
                thumb.x = slider.pixelWidth * step / this.stepCount;
            }
        }
    };
    /**
     * Zooms the actual map when slider position changes.
     *
     * @ignore Exclude from docs
     */
    ZoomControl.prototype.handleThumbDrag = function () {
        var slider = this.slider;
        var chart = this.chart;
        var thumb = this.thumb;
        var step;
        var minStep = Math.log(this.chart.minZoomLevel) / Math.LN2;
        if (this.layout == "vertical") {
            step = this.stepCount * (slider.pixelHeight - thumb.pixelY - thumb.pixelHeight) / (slider.pixelHeight - thumb.pixelHeight);
        }
        else {
            step = this.stepCount * thumb.pixelX / slider.pixelWidth;
        }
        step = minStep + step;
        var zoomLevel = Math.pow(2, step);
        chart.zoomToGeoPoint(undefined, zoomLevel, false, 0);
    };
    Object.defineProperty(ZoomControl.prototype, "stepCount", {
        /**
         * Returns the step countfor the slider grid according to map's min and max
         * zoom level settings.
         *
         * @ignore Exclude from docs
         * @return Step count
         */
        get: function () {
            return Math.log(this.chart.maxZoomLevel) / Math.LN2 - Math.log(this.chart.minZoomLevel) / Math.LN2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a background element for slider control.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    ZoomControl.prototype.createBackground = function () {
        return new RoundedRectangle();
    };
    return ZoomControl;
}(Container));
export { ZoomControl };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ZoomControl"] = ZoomControl;
//# sourceMappingURL=ZoomControl.js.map