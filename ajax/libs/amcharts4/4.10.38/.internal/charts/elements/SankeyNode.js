/**
 * SankeyNode module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagramNode } from "./FlowDiagramNode";
import { LabelBullet } from "./LabelBullet";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a node in a Sankey Diagram.
 *
 * A Sankey node is a block with a value, which represents its size on the
 * diagram.
 *
 * Nodes are connected via [[SankeyLink]] elements.
 *
 * @see {@link ISankeyNodeEvents} for a list of available events
 * @see {@link ISankeyNodeAdapters} for a list of available Adapters
 * @important
 */
var SankeyNode = /** @class */ (function (_super) {
    __extends(SankeyNode, _super);
    /**
     * Constructor
     */
    function SankeyNode() {
        var _this = _super.call(this) || this;
        /**
         * [nextInCoord description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.nextInCoord = 0;
        /**
         * [nextOutCoord description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.nextOutCoord = 0;
        _this.className = "SankeyNode";
        _this.width = 10;
        _this.height = 10;
        var nameLabel = _this.createChild(LabelBullet);
        nameLabel.shouldClone = false;
        //@should we auto update these locations if position is changed?
        nameLabel.locationX = 1;
        nameLabel.locationY = 0.5;
        nameLabel.label.text = "{name}";
        //nameLabel.label.textElement.hideOversized = false;
        nameLabel.width = 150;
        nameLabel.height = 150;
        nameLabel.label.horizontalCenter = "left";
        nameLabel.label.padding(0, 5, 0, 5);
        _this.nameLabel = nameLabel;
        var valueLabel = _this.createChild(LabelBullet);
        valueLabel.shouldClone = false;
        valueLabel.label.hideOversized = false;
        valueLabel.locationX = 0.5;
        valueLabel.locationY = 0.5;
        valueLabel.width = 150;
        valueLabel.height = 150;
        //valueLabel.label.text = "{value}";
        valueLabel.label.horizontalCenter = "middle";
        _this.valueLabel = valueLabel;
        var hiddenState = _this.hiddenState;
        hiddenState.properties.fill = new InterfaceColorSet().getFor("disabledBackground");
        hiddenState.properties.opacity = 0.5;
        hiddenState.properties.visible = true;
        _this.background.hiddenState.copyFrom(hiddenState);
        return _this;
    }
    /**
     * Invalidates all links, attached to this node.
     *
     * @ignore Exclude from docs
     */
    SankeyNode.prototype.invalidateLinks = function () {
        var _this = this;
        _super.prototype.invalidateLinks.call(this);
        this.nextInCoord = 0;
        this.nextOutCoord = 0;
        var chart = this.chart;
        if (chart) {
            var orientation_1 = chart.orientation;
            if (this._incomingSorted) {
                $iter.each(this._incomingSorted, function (dataItem) {
                    var link = dataItem.link;
                    var value = dataItem.getWorkingValue("value");
                    if ($type.isNumber(value)) {
                        link.parent = _this.chart.linksContainer;
                        var x = void 0;
                        var y = void 0;
                        var angle = void 0;
                        if (orientation_1 == "horizontal") {
                            x = _this.pixelX + _this.dx;
                            y = _this.nextInCoord + _this.pixelY + _this.dy;
                            angle = 0;
                        }
                        else {
                            y = _this.pixelY + _this.dy;
                            x = _this.nextInCoord + _this.pixelX + _this.dx;
                            angle = 90;
                        }
                        link.endX = x;
                        link.endY = y;
                        link.startAngle = angle;
                        link.endAngle = angle;
                        link.gradient.rotation = angle;
                        link.linkWidth = value * chart.valueHeight;
                        if (!dataItem.fromNode) {
                            if (orientation_1 == "horizontal") {
                                link.maxWidth = 200;
                                link.startX = _this.pixelX + _this.dx - link.maxWidth;
                                link.startY = link.endY;
                            }
                            else {
                                link.maxHeight = 200;
                                link.startX = link.endX;
                                link.startY = _this.pixelY + _this.dy - link.maxHeight;
                            }
                            // TODO is this needed ?
                            $utils.used(link.gradient);
                            link.fill = dataItem.toNode.color;
                            var stop_1 = link.gradient.stops.getIndex(0);
                            if (stop_1) {
                                if (link.colorMode == "gradient") {
                                    stop_1.color = _this.color;
                                }
                                stop_1.opacity = 0;
                                link.fill = link.gradient;
                                link.stroke = link.gradient;
                                link.gradient.validate();
                            }
                        }
                        //link.validate();
                        _this.nextInCoord += link.linkWidth;
                    }
                });
            }
            if (this._outgoingSorted) {
                $iter.each(this._outgoingSorted, function (dataItem) {
                    var link = dataItem.link;
                    link.parent = _this.chart.linksContainer;
                    var value = dataItem.getWorkingValue("value");
                    if ($type.isNumber(value)) {
                        var x = void 0;
                        var y = void 0;
                        var angle = void 0;
                        if (orientation_1 == "horizontal") {
                            angle = 0;
                            x = _this.pixelX + _this.pixelWidth + _this.dx - 1;
                            y = _this.nextOutCoord + _this.pixelY + _this.dy;
                        }
                        else {
                            angle = 90;
                            x = _this.nextOutCoord + _this.pixelX + _this.dx;
                            y = _this.pixelY + _this.pixelHeight + _this.dy - 1;
                        }
                        link.startX = x;
                        link.startY = y;
                        link.startAngle = angle;
                        link.endAngle = angle;
                        link.gradient.rotation = angle;
                        link.linkWidth = value * _this.chart.valueHeight;
                        if (!dataItem.toNode) {
                            if (orientation_1 == "horizontal") {
                                link.maxWidth = 200;
                                link.endX = _this.pixelX + link.maxWidth + _this.dx;
                                link.endY = link.startY;
                            }
                            else {
                                link.maxHeight = 200;
                                link.endX = link.startX;
                                link.endY = _this.pixelY + link.maxHeight + _this.dy;
                            }
                            link.opacity = _this.opacity;
                            var stop_2 = link.gradient.stops.getIndex(1);
                            if (stop_2) {
                                if (link.colorMode == "gradient") {
                                    stop_2.color = _this.color;
                                }
                                stop_2.opacity = 0;
                                link.fill = link.gradient;
                                link.stroke = link.gradient;
                                link.gradient.validate();
                            }
                        }
                        //link.validate();
                        _this.nextOutCoord += link.linkWidth;
                    }
                });
            }
        }
        this.positionBullet(this.nameLabel);
        this.positionBullet(this.valueLabel);
    };
    /**
     * Positions the bullet so it is centered within the node element.
     *
     * @param bullet  Target bullet
     */
    SankeyNode.prototype.positionBullet = function (bullet) {
        if (bullet) {
            bullet.x = this.measuredWidth * bullet.locationX;
            bullet.y = this.measuredHeight * bullet.locationY;
        }
    };
    Object.defineProperty(SankeyNode.prototype, "level", {
        /**
         * @return Level
         */
        get: function () {
            return this.getPropertyValue("level");
        },
        /**
         * A level node is displayed at. (0 - ...)
         *
         * Levels are measured from left to right.
         *
         * The nodes in the left-most column will have `level = 0`.
         *
         * Nodes in second column - `level = 1`, etc.
         *
         * @param value  Level
         */
        set: function (value) {
            this.setPropertyValue("level", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties and labels from another [[SankeyNode]].
     *
     * @param source  Source node
     */
    SankeyNode.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.nameLabel.copyFrom(source.nameLabel);
        this.valueLabel.copyFrom(source.valueLabel);
    };
    return SankeyNode;
}(FlowDiagramNode));
export { SankeyNode };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SankeyNode"] = SankeyNode;
//# sourceMappingURL=SankeyNode.js.map