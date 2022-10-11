/**
 * Chord diagram module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagram, FlowDiagramDataItem } from "./FlowDiagram";
import { percent } from "../../core/utils/Percent";
import { Container } from "../../core/Container";
import { registry } from "../../core/Registry";
import { ChordNode } from "../elements/ChordNode";
import { ChordLink } from "../elements/ChordLink";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo rearange notes after dragged
/**
 * Defines a [[DataItem]] for [[ChordDiagram]].
 *
 * @see {@link DataItem}
 */
var ChordDiagramDataItem = /** @class */ (function (_super) {
    __extends(ChordDiagramDataItem, _super);
    /**
     * Constructor
     */
    function ChordDiagramDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ChordDiagramDataItem";
        _this.applyTheme();
        return _this;
    }
    return ChordDiagramDataItem;
}(FlowDiagramDataItem));
export { ChordDiagramDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Chord Diagram chart.
 *
 * @see {@link IChordDiagramEvents} for a list of available Events
 * @see {@link IChordDiagramAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/chord-diagram/} for documentation
 * @important
 */
var ChordDiagram = /** @class */ (function (_super) {
    __extends(ChordDiagram, _super);
    /**
     * Constructor
     */
    function ChordDiagram() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * [valueAngle description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.valueAngle = 0;
        _this.className = "ChordDiagram";
        _this.startAngle = -90;
        _this.endAngle = 270;
        _this.radius = percent(80);
        _this.innerRadius = -15;
        _this.nodePadding = 5;
        var chordContainer = _this.chartContainer.createChild(Container);
        chordContainer.align = "center";
        chordContainer.valign = "middle";
        chordContainer.shouldClone = false;
        chordContainer.layout = "absolute";
        _this.chordContainer = chordContainer;
        _this.nodesContainer.parent = chordContainer;
        _this.linksContainer.parent = chordContainer;
        _this.chartContainer.events.on("maxsizechanged", _this.invalidate, _this, false);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Redraws the chart.
     *
     * @ignore Exclude from docs
     */
    ChordDiagram.prototype.validate = function () {
        var _this = this;
        var chartContainer = this.chartContainer;
        var endAngle = this.endAngle;
        var startAngle = this.startAngle + this.nodePadding / 2;
        var rect = $math.getArcRect(this.startAngle, this.endAngle, 1);
        var innerRect = { x: 0, y: 0, width: 0, height: 0 };
        rect = $math.getCommonRectangle([rect, innerRect]);
        var maxRadius = Math.min(chartContainer.innerWidth / rect.width, chartContainer.innerHeight / rect.height);
        if (!$type.isNumber(maxRadius)) {
            maxRadius = 0;
        }
        var radius = $utils.relativeRadiusToValue(this.radius, maxRadius);
        var pixelInnerRadius = $utils.relativeRadiusToValue(this.innerRadius, radius, true);
        var total = this.dataItem.values.value.sum;
        var count = 0;
        var newTotal = 0;
        $iter.each(this._sorted, function (strNode) {
            var node = strNode[1];
            _this.getNodeValue(node);
            count++;
            var value = node.total;
            if (node.total / total < _this.minNodeSize) {
                value = total * _this.minNodeSize;
            }
            newTotal += value;
        });
        this.valueAngle = (endAngle - this.startAngle - this.nodePadding * count) / newTotal;
        $iter.each(this._sorted, function (strNode) {
            var node = strNode[1];
            var slice = node.slice;
            slice.radius = radius;
            slice.innerRadius = pixelInnerRadius;
            var value = node.total;
            if (node.total / total < _this.minNodeSize) {
                value = total * _this.minNodeSize;
            }
            node.adjustedTotal = value;
            var arc;
            if (_this.nonRibbon) {
                arc = (endAngle - _this.startAngle) / count - _this.nodePadding;
            }
            else {
                arc = _this.valueAngle * value;
            }
            slice.arc = arc;
            slice.startAngle = startAngle;
            node.trueStartAngle = startAngle;
            node.parent = _this.nodesContainer;
            node.validate(); // otherwise flickers - nodes are already created, but not yet positioned etc.
            startAngle += arc + _this.nodePadding;
        });
        this.chordContainer.definedBBox = { x: radius * rect.x, y: radius * rect.y, width: radius * rect.width, height: radius * rect.height };
        this.chordContainer.invalidateLayout();
        _super.prototype.validate.call(this);
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    ChordDiagram.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Chord diagram");
        }
    };
    /**
     * Creates and returns a new data item.
     *
     * @return Data item
     */
    ChordDiagram.prototype.createDataItem = function () {
        return new ChordDiagramDataItem();
    };
    Object.defineProperty(ChordDiagram.prototype, "startAngle", {
        /**
         * @return Start angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Starting angle of the Radar face. (degrees)
         *
         * Normally, a circular radar face begins (the radial axis is drawn) at the
         * top center. (at -90 degrees)
         *
         * You can use `startAngle` to change this setting.
         *
         * E.g. setting this to 0 will make the radial axis start horizontally to
         * the right, as opposed to vertical.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set those to lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
         * looks like a quarter of a circle.
         *
         * @default -90
         * @param value  Start angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("startAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChordDiagram.prototype, "endAngle", {
        /**
         * @return End angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * Starting angle of the Radar face. (degrees)
         *
         * Normally, a circular radar face ends (the radial axis is drawn) exactly
         * where it has started, forming a full 360 circle. (at 270 degrees)
         *
         * You can use `endAngle` to end the circle somewhere else.
         *
         * E.g. setting this to 180 will make the radar face end at horizontal line
         * to the left off the center.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set those to lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
         * looks like a quarter of a circle.
         *
         * @default -90
         * @param value  End angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChordDiagram.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the Radar face.
         *
         * This can either be in absolute pixel value, or relative [[Percent]].
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChordDiagram.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the Chord nodes.
         *
         * This can either be in absolute pixel value, or relative [[Percent]].
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChordDiagram.prototype, "nonRibbon", {
        /**
         * @return Non-ribbon
         */
        get: function () {
            return this.getPropertyValue("nonRibbon");
        },
        /**
         *
         * If you set this to true, all the lines will be of the same width. This is done by making middleLine of a ChordLink visible.
         *
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("nonRibbon", value, true);
            this.links.template.middleLine.strokeOpacity = 1;
            this.links.template.link.fillOpacity = 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    ChordDiagram.prototype.createNode = function () {
        var node = new ChordNode();
        this._disposers.push(node);
        return node;
    };
    /**
     * @ignore
     */
    ChordDiagram.prototype.createLink = function () {
        var link = new ChordLink();
        this._disposers.push(link);
        return link;
    };
    return ChordDiagram;
}(FlowDiagram));
export { ChordDiagram };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ChordDiagram"] = ChordDiagram;
//# sourceMappingURL=ChordDiagram.js.map