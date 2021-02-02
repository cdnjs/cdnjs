/**
 * FlowDiagramNode module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { visualProperties } from "../../core/Sprite";
import { List } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $iter from "../../core/utils/Iterator";
import * as $string from "../../core/utils/String";
import * as $order from "../../core/utils/Order";
import * as $number from "../../core/utils/Number";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
import * as $object from "../../core/utils/Object";
import { LegendSettings } from "../Legend";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a node in a Flow Diagram.
 *
 * A Flow node is a block with a value, which represents its size on the
 * diagram.
 *
 * Nodes are connected via [[FlowLink]] elements.
 *
 * @see {@link IFlowDiagramNodeEvents} for a list of available events
 * @see {@link IFlowDiagramNodeAdapters} for a list of available Adapters
 * @important
 */
var FlowDiagramNode = /** @class */ (function (_super) {
    __extends(FlowDiagramNode, _super);
    /**
     * Constructor
     */
    function FlowDiagramNode() {
        var _this = _super.call(this) || this;
        /**
         * Settings for the appearance of the related legend items.
         */
        _this.legendSettings = new LegendSettings();
        _this.className = "FlowDiagramNode";
        _this.isMeasured = false;
        // TODO can this be removed ?
        new InterfaceColorSet();
        _this.draggable = true;
        _this.inert = true;
        _this.setStateOnChildren = true;
        _this.events.on("positionchanged", _this.invalidateLinks, _this, false);
        _this.events.on("sizechanged", _this.invalidateLinks, _this, false);
        return _this;
        //this.events.on("hit", this.handleHit, this, false);
    }
    /**
     * @ignore
     */
    FlowDiagramNode.prototype.handleHit = function (event) {
        if (this.isHidden || this.isHiding) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    /**
     * Shows hidden node.
     *
     * @param duration  Duration of reveal animation (ms)
     * @return Animation
     */
    FlowDiagramNode.prototype.show = function (duration) {
        var animation = _super.prototype.show.call(this, duration);
        this.outgoingDataItems.each(function (dataItem) {
            if (!dataItem.toNode || (dataItem.toNode && !dataItem.toNode.isHidden)) {
                dataItem.setWorkingValue("value", dataItem.getValue("value"), duration);
            }
        });
        this.incomingDataItems.each(function (dataItem) {
            if (!dataItem.fromNode || (dataItem.fromNode && !dataItem.fromNode.isHidden)) {
                dataItem.setWorkingValue("value", dataItem.getValue("value"), duration);
            }
        });
        return animation;
    };
    /**
     * Hides node.
     *
     * @param duration  Duration of hiding animation (ms)
     * @return Animation
     */
    FlowDiagramNode.prototype.hide = function (duration) {
        var animation = _super.prototype.hide.call(this, duration);
        this.outgoingDataItems.each(function (dataItem) {
            dataItem.setWorkingValue("value", 0, duration);
        });
        this.incomingDataItems.each(function (dataItem) {
            dataItem.setWorkingValue("value", 0, duration);
        });
        return animation;
    };
    /**
     * Marks node as invalid, for redrawal in the next update cycle.
     *
     * @ignore Exclude from docs
     */
    FlowDiagramNode.prototype.validate = function () {
        if (!this.isDisposed()) {
            _super.prototype.validate.call(this);
            this.invalidateLinks();
        }
    };
    /**
     * Invalidates all links, attached to this node.
     *
     * @ignore Exclude from docs
     */
    FlowDiagramNode.prototype.invalidateLinks = function () {
        var _this = this;
        this.outgoingDataItems.each(function (dataItem) {
            var link = dataItem.link;
            if (link.colorMode == "fromNode") {
                link.fill = link.dataItem.fromNode.color;
            }
            if (link.colorMode == "gradient") {
                link.fill = link.gradient;
                link.stroke = link.gradient;
                var stop_1 = link.gradient.stops.getIndex(0);
                if (stop_1) {
                    stop_1.color = _this.color;
                    link.gradient.validate();
                }
            }
        });
        this.incomingDataItems.each(function (dataItem) {
            var link = dataItem.link;
            if (link.colorMode == "toNode") {
                link.fill = link.dataItem.toNode.color;
            }
            if (link.colorMode == "gradient") {
                link.fill = link.gradient;
                link.stroke = link.gradient;
                var stop_2 = link.gradient.stops.getIndex(1);
                if (stop_2) {
                    stop_2.color = _this.color;
                    link.gradient.validate();
                }
            }
        });
    };
    Object.defineProperty(FlowDiagramNode.prototype, "incomingDataItems", {
        /**
         * List of incoming items (links).
         *
         * @readonly
         * @return Incoming items
         */
        get: function () {
            var _this = this;
            if (!this._incomingDataItems) {
                var incomingDataItems = new List();
                incomingDataItems.events.on("inserted", function () {
                    if (_this.chart.sortBy == "name") {
                        _this._incomingSorted = $iter.sort(_this._incomingDataItems.iterator(), function (x, y) { return $string.order(x.fromName, y.fromName); });
                    }
                    else if (_this.chart.sortBy == "value") {
                        _this._incomingSorted = $iter.sort(_this._incomingDataItems.iterator(), function (x, y) { return $order.reverse($number.order(x.value, y.value)); });
                    }
                    else {
                        _this._incomingSorted = _this._incomingDataItems.iterator();
                    }
                }, undefined, false);
                this._incomingDataItems = incomingDataItems;
            }
            return this._incomingDataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "outgoingDataItems", {
        /**
         * List of outgoing items (links).
         *
         * @readonly
         * @return Outgoing items
         */
        get: function () {
            var _this = this;
            if (!this._outgoingDataItems) {
                var outgoingDataItems = new List();
                outgoingDataItems.events.on("inserted", function () {
                    if (_this.chart.sortBy == "name") {
                        _this._outgoingSorted = $iter.sort(_this._outgoingDataItems.iterator(), function (x, y) { return $string.order(x.fromName, y.fromName); });
                    }
                    else if (_this.chart.sortBy == "value") {
                        _this._outgoingSorted = $iter.sort(_this._outgoingDataItems.iterator(), function (x, y) { return $order.reverse($number.order(x.value, y.value)); });
                    }
                    else {
                        _this._outgoingSorted = _this._outgoingDataItems.iterator();
                    }
                }, undefined, false);
                this._outgoingDataItems = outgoingDataItems;
            }
            return this._outgoingDataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "name", {
        /**
         * @return Name
         */
        get: function () {
            return this.getPropertyValue("name");
        },
        /**
         * A name of the node.
         *
         * @param value  Name
         */
        set: function (value) {
            this.setPropertyValue("name", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "total", {
        /**
         * @return Value
         */
        get: function () {
            return this.getPropertyValue("total");
        },
        /**
         * Sum of all incoming+outgoing link values
         *
         * @param value  Value
         */
        set: function (value) {
            this.setPropertyValue("total", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "totalIncoming", {
        /**
         * @return Value
         */
        get: function () {
            return this.getPropertyValue("totalIncoming");
        },
        /**
         * Sum of all incomming link values.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setPropertyValue("totalIncoming", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "totalOutgoing", {
        /**
         * @return Value
         */
        get: function () {
            return this.getPropertyValue("totalOutgoing");
        },
        /**
         * Sum of all outgoing link values.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setPropertyValue("totalOutgoing", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlowDiagramNode.prototype, "color", {
        /**
         * @return Color
         */
        get: function () {
            return this.getPropertyValue("color");
        },
        /**
         * Node's color.
         *
         * @param value  Color
         */
        set: function (value) {
            this.setColorProperty("color", value);
            if (this._background) {
                this._background.fill = value;
            }
            this.fill = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    FlowDiagramNode.prototype.createLegendMarker = function (marker) {
        var w = marker.pixelWidth;
        var h = marker.pixelHeight;
        marker.removeChildren();
        var column = marker.createChild(RoundedRectangle);
        column.shouldClone = false;
        $object.copyProperties(this, column, visualProperties);
        column.stroke = this.fill;
        column.copyFrom(this);
        column.padding(0, 0, 0, 0); // if columns will have padding (which is often), legend marker will be very narrow
        column.width = w;
        column.height = h;
        var legendDataItem = marker.dataItem;
        legendDataItem.color = column.fill;
        legendDataItem.colorOrig = column.fill;
    };
    Object.defineProperty(FlowDiagramNode.prototype, "legendDataItem", {
        /**
         * @return Data item
         */
        get: function () {
            return this._legendDataItem;
        },
        /**
         * Legend data item that corresponds to this series.
         *
         * @param value  Data item
         */
        set: function (value) {
            this._legendDataItem = value;
            this._legendDataItem.itemContainer.deepInvalidate();
        },
        enumerable: true,
        configurable: true
    });
    return FlowDiagramNode;
}(Container));
export { FlowDiagramNode };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FlowDiagramNode"] = FlowDiagramNode;
//# sourceMappingURL=FlowDiagramNode.js.map