/**
 * ChordNode module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagramNode } from "./FlowDiagramNode";
import { AxisLabelCircular } from "../axes/AxisLabelCircular";
import { registry } from "../../core/Registry";
import { Slice } from "../../core/elements/Slice";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import { Bullet } from "../elements/Bullet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a node in a Chord Diagram.
 *
 * A Chord node is a block with a value, which represents its size on the
 * diagram.
 *
 * Nodes are connected via [[ChordLink]] elements.
 *
 * @see {@link IChordNodeEvents} for a list of available events
 * @see {@link IChordNodeAdapters} for a list of available Adapters
 * @important
 */
var ChordNode = /** @class */ (function (_super) {
    __extends(ChordNode, _super);
    /**
     * Constructor
     */
    function ChordNode() {
        var _this = _super.call(this) || this;
        _this.className = "ChordNode";
        var label = _this.createChild(AxisLabelCircular);
        label.location = 0.5;
        label.radius = 5;
        label.text = "{name}";
        label.zIndex = 1;
        label.shouldClone = false;
        _this.label = label;
        _this.layout = "none";
        _this.events.on("positionchanged", _this.updateRotation, _this, false);
        _this.isMeasured = false;
        _this.slice = _this.createChild(Slice);
        _this.slice.isMeasured = false;
        var hiddenState = _this.hiddenState;
        hiddenState.properties.fill = new InterfaceColorSet().getFor("disabledBackground");
        hiddenState.properties.opacity = 0.5;
        hiddenState.properties.visible = true;
        _this.setStateOnChildren = false;
        _this.slice.hiddenState.properties.visible = true;
        _this.adapter.add("tooltipX", function (tooltipX, target) {
            return target.slice.ix * (target.slice.radius - (target.slice.radius - target.slice.pixelInnerRadius) / 2);
        });
        _this.adapter.add("tooltipY", function (tooltipY, target) {
            return target.slice.iy * (target.slice.radius - (target.slice.radius - target.slice.pixelInnerRadius) / 2);
        });
        return _this;
    }
    /**
     * Invalidates all links, attached to this node.
     *
     * @ignore Exclude from docs
     */
    ChordNode.prototype.invalidateLinks = function () {
        var _this = this;
        _super.prototype.invalidateLinks.call(this);
        var label = this.label;
        var slice = this.slice;
        var chart = this.chart;
        if (chart && slice) {
            var sum = this.total;
            var arc_1 = slice.arc;
            var sliceStartAngle_1 = slice.startAngle;
            this.children.each(function (child) {
                if (child instanceof Bullet) {
                    var locationX = child.locationX;
                    if (!$type.isNumber(locationX)) {
                        locationX = 0.5;
                    }
                    var locationY = child.locationY;
                    if (!$type.isNumber(locationY)) {
                        locationY = 1;
                    }
                    var childAngle = sliceStartAngle_1 + arc_1 * locationX;
                    var childRadius = locationY * slice.radius;
                    child.x = childRadius * $math.cos(childAngle);
                    child.y = childRadius * $math.sin(childAngle);
                }
            });
            var labelAngle = sliceStartAngle_1 + arc_1 * label.location;
            var startAngle = sliceStartAngle_1 + (1 - sum / this.adjustedTotal) * arc_1 * 0.5; // if value of a node is > then sum of the links, add to center link
            if ($type.isNaN(startAngle)) {
                startAngle = sliceStartAngle_1;
            }
            label.fixPosition(labelAngle, slice.radius);
            this.nextAngle = startAngle;
            if (this._outgoingSorted) {
                $iter.each(this._outgoingSorted, function (dataItem) {
                    var link = dataItem.link;
                    link.parent = _this.chart.linksContainer;
                    var value = dataItem.getWorkingValue("value");
                    if ($type.isNumber(value)) {
                        if (chart.nonRibbon) {
                            var percentWidth = link.percentWidth;
                            if (!$type.isNumber(percentWidth)) {
                                percentWidth = 5;
                            }
                            percentWidth = percentWidth / 100;
                            link.startAngle = sliceStartAngle_1 + arc_1 / 2 - arc_1 / 2 * percentWidth;
                            link.arc = arc_1 * percentWidth;
                        }
                        else {
                            link.arc = value * chart.valueAngle;
                            link.startAngle = _this.nextAngle;
                            _this.nextAngle += link.arc;
                        }
                        if (!dataItem.toNode) {
                            link.endAngle = link.startAngle;
                        }
                        link.radius = slice.pixelInnerRadius;
                    }
                    //link.validate();
                });
            }
            if (this._incomingSorted) {
                $iter.each(this._incomingSorted, function (dataItem) {
                    var link = dataItem.link;
                    link.radius = slice.pixelInnerRadius;
                    if (chart.nonRibbon) {
                        var percentWidth = link.percentWidth;
                        if (!$type.isNumber(percentWidth)) {
                            percentWidth = 5;
                        }
                        percentWidth = percentWidth / 100;
                        link.endAngle = sliceStartAngle_1 + arc_1 / 2 - arc_1 / 2 * percentWidth;
                        link.arc = arc_1 * percentWidth;
                    }
                    else {
                        link.endAngle = _this.nextAngle;
                        var value = dataItem.getWorkingValue("value");
                        if ($type.isNumber(value)) {
                            link.arc = value * chart.valueAngle; // yes, this is needed
                            _this.nextAngle += link.arc;
                        }
                    }
                    if (!dataItem.fromNode) {
                        link.startAngle = link.endAngle;
                    }
                    //link.validate();
                });
            }
        }
    };
    /**
     * @ignore
     * updates slice start angle so that when we drag a node it would face the center
     */
    ChordNode.prototype.updateRotation = function () {
        var slice = this.slice;
        var mAngle = this.trueStartAngle + slice.arc / 2;
        var radius = slice.radius;
        var tx = radius * $math.cos(mAngle);
        var ty = radius * $math.sin(mAngle);
        var angle = $math.getAngle({ x: tx + this.pixelX, y: ty + this.pixelY });
        slice.startAngle = this.trueStartAngle + (angle - mAngle);
        this.dx = -this.pixelX;
        this.dy = -this.pixelY;
    };
    /**
     * Copies properties and labels from another [[ChordNode]].
     *
     * @param source  Source node
     */
    ChordNode.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.label.copyFrom(source.label);
        this.slice.copyFrom(source.slice);
    };
    return ChordNode;
}(FlowDiagramNode));
export { ChordNode };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ChordNode"] = ChordNode;
//# sourceMappingURL=ChordNode.js.map