/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { __extends } from "tslib";
import { Series, SeriesDataItem } from "../../charts/series/Series";
import { registry } from "../../core/Registry";
import { ListTemplate, ListDisposer, List } from "../../core/utils/List";
import { ForceDirectedNode } from "./ForceDirectedNode";
import { Disposer } from "../../core/utils/Disposer";
import { ForceDirectedLink } from "./ForceDirectedLink";
import { ColorSet } from "../../core/utils/ColorSet";
import * as d3force from "d3-force";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
import * as $array from "../../core/utils/Array";
import { Percent, percent } from "../../core/utils/Percent";
import { MouseCursorStyle } from "../../core/interaction/Mouse";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ForceDirectedSeries]].
 *
 * @see {@link DataItem}
 * @since 4.3.8
 */
var ForceDirectedSeriesDataItem = /** @class */ (function (_super) {
    __extends(ForceDirectedSeriesDataItem, _super);
    /**
     * Constructor
     */
    function ForceDirectedSeriesDataItem() {
        var _this = _super.call(this) || this;
        /**
         * Have all children already been initialized?
         */
        _this.childrenInited = false;
        _this.className = "ForceDirectedSeriesDataItem";
        _this.hasChildren.children = true;
        _this.childLinks = new List();
        _this.applyTheme();
        return _this;
    }
    /**
     * Shows the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param fields    A list of fields to set values of
     */
    ForceDirectedSeriesDataItem.prototype.show = function (duration, delay, fields) {
        this._visible = true;
        if (this.node) {
            this.node.isActive = true;
        }
        return;
    };
    /**
     * @ignore
     */
    ForceDirectedSeriesDataItem.prototype.dispatchVisibility = function (visible) {
        if (this.events.isEnabled("visibilitychanged")) {
            var event_1 = {
                type: "visibilitychanged",
                target: this,
                visible: visible
            };
            this.events.dispatchImmediately("visibilitychanged", event_1);
        }
    };
    /**
     * Hides the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param toValue   A value to set to `fields` when hiding
     * @param fields    A list of data fields to set value to `toValue`
     */
    ForceDirectedSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        this._visible = false;
        if (this.events.isEnabled("visibilitychanged")) {
            var event_2 = {
                type: "visibilitychanged",
                target: this,
                visible: false
            };
            this.events.dispatchImmediately("visibilitychanged", event_2);
        }
        if (this.node) {
            this.node.isActive = false;
        }
        return;
    };
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            var value = this.values.value.value;
            if (!$type.isNumber(value)) {
                if (this.children) {
                    value = 0;
                    this.children.each(function (child) {
                        value += child.value;
                    });
                }
            }
            return value;
        },
        /**
         * Numeric value of the item.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "node", {
        /**
         * An element, related to this data item. (node)
         *
         * @readonly
         * @return node element
         */
        get: function () {
            var _this = this;
            if (!this._node) {
                var component_1 = this.component;
                var node_1 = component_1.nodes.create();
                node_1.draggable = true;
                this._node = node_1;
                this._disposers.push(node_1);
                this._disposers.push(new Disposer(function () {
                    component_1.nodes.removeValue(node_1);
                }));
                this.addSprite(node_1);
                node_1.visible = this.visible;
                node_1.hiddenState.properties.visible = true;
                // Apply accessibility
                if (component_1.itemsFocusable()) {
                    this.component.role = "menu";
                    node_1.role = "menuitem";
                    node_1.focusable = true;
                }
                else {
                    this.component.role = "list";
                    node_1.role = "listitem";
                    node_1.focusable = false;
                }
                // Apply screen reader label
                if (node_1.focusable) {
                    node_1.events.once("focus", function (ev) {
                        node_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
                    }, undefined, false);
                    node_1.events.once("blur", function (ev) {
                        node_1.readerTitle = "";
                    }, undefined, false);
                }
                if (node_1.hoverable) {
                    node_1.events.once("over", function (ev) {
                        node_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
                    }, undefined, false);
                    node_1.events.once("out", function (ev) {
                        node_1.readerTitle = "";
                    }, undefined, false);
                }
            }
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "level", {
        /**
         * Depth level in the series hierarchy.
         *
         * The top-level item will have level set at 0. Its children will have
         * level 1, and so on.
         *
         * @readonly
         * @return Level
         */
        get: function () {
            if (!this.parent) {
                return 0;
            }
            else {
                return this.parent.level + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "percent", {
        /**
         * Percent value of a node.
         *
         * @since 4.9.0
         * @return Percent
         */
        get: function () {
            if (this.parent) {
                return this.value / this.parent.value * 100;
            }
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "color", {
        /**
         * @return Color
         */
        get: function () {
            var color = this.properties.color;
            if (color == undefined) {
                if (this.parent) {
                    color = this.parent.color;
                }
            }
            if (color == undefined) {
                if (this.component) {
                    color = this.component.colors.getIndex(this.component.colors.step * this.index);
                }
            }
            return color;
        },
        /**
         * Item's color.
         *
         * If not set, will use parent's color, or, if that is not set either,
         * automatically assigned color from chart's color set. (`chart.colors`)
         *
         * @param value  : Color | LinearGradient | RadialGradient | Pattern
         */
        set: function (value) {
            this.setProperty("color", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "linkWith", {
        /**
         * @return Link list
         */
        get: function () {
            return this.properties.linkWith;
        },
        /**
         * An array of id's of other nodes outside of the child/parent tree to link
         * with.
         *
         * @param  value  Link list
         */
        set: function (value) {
            this.setProperty("linkWith", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "hiddenInLegend", {
        /**
         * @return Hidden in legend?
         */
        get: function () {
            return this.properties.hiddenInLegend;
        },
        /**
         * Should dataItem (node) be hidden in legend?
         *
         * @param value Visible in legend?
         */
        set: function (value) {
            this.setProperty("hiddenInLegend", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "collapsed", {
        /**
         * @return Collapsed?
         */
        get: function () {
            return this.properties.collapsed;
        },
        /**
         * Indicates whether node should start off as collapsed.
         *
         * This can be used to specify whether node should start off as collapsed
         * via data.
         *
         * To toggle actual node, use its `isActive` property instead.
         *
         * @param  value  Collapsed?
         */
        set: function (value) {
            this.setProperty("collapsed", value);
            this.node.isActive = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "fixed", {
        /**
         * @return Fixed?
         */
        get: function () {
            return this.properties.fixed;
        },
        /**
         * Is this node fixed (immovable)?
         *
         * @since 4.6.2
         * @param  value  Fixed?
         */
        set: function (value) {
            this.setProperty("fixed", value);
            if (this.component) {
                this.component.handleFixed(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "children", {
        /**
         * @return Item's children
         */
        get: function () {
            return this.properties.children;
        },
        /**
         * A list of item's sub-children.
         *
         * @param children  Item's children
         */
        set: function (children) {
            this.setProperty("children", children);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a marker used in the legend for this slice.
     *
     * @ignore Exclude from docs
     * @param marker  Marker container
     */
    ForceDirectedSeriesDataItem.prototype.createLegendMarker = function (marker) {
        this.component.createLegendMarker(marker, this);
        if (!this.node.isActive) {
            this.hide();
        }
    };
    Object.defineProperty(ForceDirectedSeriesDataItem.prototype, "legendDataItem", {
        /**
         * @return Legend data item
         */
        get: function () {
            return this._legendDataItem;
        },
        /**
         * A legend's data item, that corresponds to this data item.
         *
         * @param value  Legend data item
         */
        set: function (value) {
            this._legendDataItem = value;
            if (value.label) {
                value.label.dataItem = this;
            }
            if (value.valueLabel) {
                value.valueLabel.dataItem = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ForceDirectedSeriesDataItem;
}(SeriesDataItem));
export { ForceDirectedSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a [[ForceDirectedTree]] chart.
 *
 * @see {@link IForceDirectedSeriesEvents} for a list of available Events
 * @see {@link IForceDirectedSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/ForceDirectedTree/} For more information
 * @todo Example
 * @since 4.3.8
 * @important
 */
var ForceDirectedSeries = /** @class */ (function (_super) {
    __extends(ForceDirectedSeries, _super);
    /**
     * Constructor
     */
    function ForceDirectedSeries() {
        var _this = _super.call(this) || this;
        _this._tick = 0;
        _this.className = "ForceDirectedSeries";
        _this.d3forceSimulation = d3force.forceSimulation();
        _this.maxRadius = percent(8);
        _this.minRadius = percent(1);
        _this.width = percent(100);
        _this.height = percent(100);
        _this.colors = new ColorSet();
        _this.colors.step = 2;
        _this.width = percent(100);
        _this.height = percent(100);
        _this.manyBodyStrength = -15;
        _this.centerStrength = 0.8;
        _this.showOnTick = 10;
        _this.baseValue = 0;
        _this.setPropertyValue("dragFixedNodes", false);
        _this.setPropertyValue("velocityDecay", 0.4);
        _this.events.on("maxsizechanged", function () {
            _this.updateRadiuses(_this.dataItems);
            _this.updateLinksAndNodes();
            _this.dataItems.each(function (dataItem) {
                _this.handleFixed(dataItem);
            });
            var d3forceSimulation = _this.d3forceSimulation;
            var w = $math.max($math.max(50, _this.innerWidth), _this.innerWidth);
            var h = $math.max($math.max(50, _this.innerHeight), _this.innerHeight);
            if (d3forceSimulation) {
                d3forceSimulation.force("x", d3force.forceX().x(w / 2).strength(_this.centerStrength * 100 / w));
                d3forceSimulation.force("y", d3force.forceY().y(h / 2).strength(_this.centerStrength * 100 / h));
                if (d3forceSimulation.alpha() < 0.4) {
                    d3forceSimulation.alpha(0.4);
                    d3forceSimulation.restart();
                }
            }
        });
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns maximum value from all supplied data items.
     *
     * @ignore
     * @param   dataItems  List of data items
     * @param   max        Default max
     * @return             Max
     */
    ForceDirectedSeries.prototype.getMaxValue = function (dataItems, max) {
        var _this = this;
        dataItems.each(function (dataItem) {
            if (dataItem.value > max) {
                max = dataItem.value;
            }
            if (dataItem.children) {
                var cmax = _this.getMaxValue(dataItem.children, max);
                if (cmax > max) {
                    max = cmax;
                }
            }
        });
        return max;
    };
    /**
     * Returns maximum value from all supplied data items.
     *
     * @ignore
     * @param   dataItems  List of data items
     * @param   max        Default max
     * @return             Max
     */
    ForceDirectedSeries.prototype.getMinValue = function (dataItems, min) {
        var _this = this;
        dataItems.each(function (dataItem) {
            if (dataItem.value < min) {
                min = dataItem.value;
            }
            if (dataItem.children) {
                var cmin = _this.getMaxValue(dataItem.children, min);
                if (cmin < min) {
                    min = cmin;
                }
            }
        });
        return min;
    };
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    ForceDirectedSeries.prototype.validateDataItems = function () {
        var _this = this;
        if (this.chart.__disabled) {
            _super.prototype.validateDataItems.call(this);
            return;
        }
        this._dataDisposers.push(new ListDisposer(this.links));
        this._maxValue = this.getMaxValue(this.dataItems, 0);
        this._minValue = this.getMinValue(this.dataItems, this._maxValue);
        this.forceLinks = [];
        this.colors.reset();
        var index = 0;
        var radius = Math.min(this.innerHeight / 3, this.innerWidth / 3);
        if (this.dataItems.length <= 1) {
            radius = 0;
        }
        this.dataItems.each(function (dataItem) {
            var angle = index / _this.dataItems.length * 360;
            var node = dataItem.node;
            var xField = node.propertyFields.x;
            var yField = node.propertyFields.y;
            if (xField && $type.hasValue(dataItem.dataContext[xField])) {
                node.x = dataItem.dataContext[xField];
            }
            else {
                node.x = _this.innerWidth / 2 + radius * $math.cos(angle);
            }
            if (yField && $type.hasValue(dataItem.dataContext[yField])) {
                node.y = dataItem.dataContext[yField];
            }
            else {
                node.y = _this.innerHeight / 2 + radius * $math.sin(angle);
            }
            dataItem.node.fill = dataItem.color;
            dataItem.node.stroke = dataItem.color;
            index++;
            _this.initNode(dataItem);
        });
        if (this.dataFields.linkWith) {
            this.dataItems.each(function (dataItem) {
                _this.processLinkWith(dataItem);
            });
        }
        var d3forceSimulation = this.d3forceSimulation;
        d3forceSimulation.on("tick", function () {
            _this.updateLinksAndNodes();
        });
        // helps to avoid initial scatter
        for (var i = 0; i < 10; i++) {
            //d3forceSimulation.tick();
        }
        d3forceSimulation.alphaDecay(1 - Math.pow(0.001, 1 / 600));
        this.chart.feedLegend();
        _super.prototype.validateDataItems.call(this);
    };
    /**
     * @ignore
     */
    ForceDirectedSeries.prototype.handleFixed = function (dataItem) {
        var _this = this;
        var node = dataItem.node;
        var xField = node.propertyFields.x;
        var yField = node.propertyFields.y;
        if (xField && $type.hasValue(dataItem.dataContext[xField])) {
            node.x = dataItem.dataContext[xField];
        }
        if (yField && $type.hasValue(dataItem.dataContext[yField])) {
            node.y = dataItem.dataContext[yField];
        }
        if (dataItem.fixed) {
            if (node.x instanceof Percent) {
                node.fx = $utils.relativeToValue(node.x, this.innerWidth);
            }
            else {
                node.fx = node.x;
            }
            if (node.y instanceof Percent) {
                node.fy = $utils.relativeToValue(node.y, this.innerHeight);
            }
            else {
                node.fy = node.y;
            }
            node.draggable = this.dragFixedNodes;
            node.validate(); // for links to redraw
        }
        else {
            node.fx = undefined;
            node.fy = undefined;
            node.draggable = true;
        }
        if (dataItem && dataItem.children) {
            dataItem.children.each(function (di) {
                _this.handleFixed(di);
            });
        }
    };
    /**
     * @ignore
     * @todo description
     */
    ForceDirectedSeries.prototype.updateNodeList = function () {
        var d3forceSimulation = this.d3forceSimulation;
        d3forceSimulation.nodes(this.nodes.values);
        this._linkForce = d3force.forceLink(this.forceLinks);
        d3forceSimulation.force("link", this._linkForce);
        this._collisionForce = d3force.forceCollide();
        d3forceSimulation.force("collision", this._collisionForce);
        var w = $math.max(50, this.innerWidth);
        var h = $math.max(50, this.innerHeight);
        d3forceSimulation.force("x", d3force.forceX().x(w / 2).strength(this.centerStrength * 100 / w));
        d3forceSimulation.force("y", d3force.forceY().y(h / 2).strength(this.centerStrength * 100 / h));
    };
    /**
     * @ignore
     * @todo description
     */
    ForceDirectedSeries.prototype.updateLinksAndNodes = function () {
        var _this = this;
        if (this._tick < this.showOnTick) {
            this._tick++;
            this.opacity = 0;
        }
        else if (this._tick == this.showOnTick) {
            this.opacity = 1;
            this._tick++;
        }
        if (this._linkForce) {
            this._linkForce.distance(function (linkDatum) {
                return _this.getDistance(linkDatum);
            });
            this._linkForce.strength(function (linkDatum) {
                return _this.getStrength(linkDatum);
            });
        }
        if (this._collisionForce) {
            this._collisionForce.radius(function (node) {
                if (node instanceof ForceDirectedNode) {
                    var radius = node.circle.pixelRadius;
                    if (!node.outerCircle.__disabled && !node.outerCircle.disabled && node.outerCircle.visible) {
                        radius = (radius + 3) * node.outerCircle.scale;
                    }
                    return radius + node.paddingRadius;
                }
                return 1;
            });
        }
        this.d3forceSimulation.force("manybody", d3force.forceManyBody().strength(function (node) {
            if (node instanceof ForceDirectedNode) {
                return node.circle.pixelRadius * _this.manyBodyStrength;
            }
            return _this.manyBodyStrength;
        }));
    };
    /**
     * @ignore
     * @todo description
     */
    ForceDirectedSeries.prototype.getDistance = function (linkDatum) {
        var source = linkDatum.source;
        var target = linkDatum.target;
        var distance = 0;
        if (target.dataItem && source.dataItem) {
            var link = source.linksWith.getKey(target.uid);
            if (link) {
                distance = link.distance;
            }
            if (!source.isActive) {
                distance = 1;
            }
            if (target.isHidden) {
                return 0;
            }
            return (distance * (source.circle.pixelRadius + target.circle.pixelRadius));
        }
        return distance;
    };
    /**
     * @ignore
     * @todo description
     */
    ForceDirectedSeries.prototype.getStrength = function (linkDatum) {
        var source = linkDatum.source;
        var target = linkDatum.target;
        var strength = 0;
        var link = source.linksWith.getKey(target.uid);
        if (link) {
            strength = link.strength;
        }
        if (target.isHidden) {
            return 0;
        }
        return strength;
    };
    /**
     * Handler for drag end event.
     *
     * @ignore
     */
    ForceDirectedSeries.prototype.nodeDragEnded = function () {
        this.d3forceSimulation.alphaTarget(0);
    };
    /**
     * Handler for drag start event.
     *
     * @ignore
     */
    ForceDirectedSeries.prototype.nodeDragStarted = function () {
        this.d3forceSimulation.alpha(0.1);
        this.d3forceSimulation.restart();
    };
    /**
     * Resets positions of whole tree.
     *
     * @ignore
     */
    ForceDirectedSeries.prototype.restartSimulation = function () {
        if (this.d3forceSimulation.alpha() <= 0.3) {
            this.d3forceSimulation.alpha(0.3);
            this.d3forceSimulation.restart();
        }
    };
    /**
     * @ignore
     */
    ForceDirectedSeries.prototype.updateRadiuses = function (dataItems) {
        var _this = this;
        dataItems.each(function (dataItem) {
            _this.updateRadius(dataItem);
            if (dataItem.childrenInited) {
                _this.updateRadiuses(dataItem.children);
            }
        });
    };
    /**
     * @ignore
     */
    ForceDirectedSeries.prototype.updateRadius = function (dataItem) {
        var node = dataItem.node;
        var minSide = (this.innerWidth + this.innerHeight) / 2;
        var minRadius = $utils.relativeToValue(this.minRadius, minSide);
        var maxRadius = $utils.relativeToValue(this.maxRadius, minSide);
        var baseValue = this.baseValue;
        if (baseValue == null) {
            baseValue = this._minValue;
        }
        var radius = minRadius + (dataItem.value - baseValue) / (this._maxValue - baseValue) * (maxRadius - minRadius);
        if (!$type.isNumber(radius)) {
            radius = minRadius;
        }
        //if(!node.circle.isHidden){
        node.circle.radius = radius;
        //}
        node.outerCircle.radius = radius + 3;
        node.circle.states.getKey("active").properties.radius = radius;
        node.circle.defaultState.properties.radius = radius;
    };
    /**
     * Initializes node.
     *
     * @ignore
     */
    ForceDirectedSeries.prototype.initNode = function (dataItem) {
        var _this = this;
        var node = dataItem.node;
        node.parent = this;
        this.updateRadius(dataItem);
        //let nodeIndex = this.nodes.indexOf(dataItem.node);
        if (!dataItem.children || dataItem.children.length == 0) {
            node.outerCircle.disabled = true;
            node.circle.interactionsEnabled = true;
            node.cursorOverStyle = MouseCursorStyle.default;
        }
        else {
            node.cursorOverStyle = MouseCursorStyle.pointer;
        }
        if (this.dataItemsInvalid && (dataItem.level >= this.maxLevels - 1 || dataItem.collapsed)) {
            node.isActive = false;
            this.updateNodeList();
            return;
        }
        if (!node.isActive) {
            node.hide(0);
        }
        this.handleFixed(dataItem);
        if (dataItem.children) {
            var index_1 = 0;
            dataItem.childrenInited = true;
            if (this.dataItems.length == 1 && dataItem.level == 0) {
                this.colors.next();
            }
            dataItem.children.each(function (child) {
                /*
                let link = this.links.create();
                link.parent = this;
                link.zIndex = -1;
                dataItem.childLinks.push(link);
                link.source = dataItem.node;
                let childIndex = this.nodes.indexOf(child.node);
                link.target = child.node;
                child.parentLink = link;

                this._forceLinks.push({ source: nodeIndex, target: childIndex });
                */
                var link = node.linkWith(child.node);
                child.parentLink = link;
                var radius = 2 * node.circle.pixelRadius + child.node.circle.pixelRadius;
                var angle = index_1 / dataItem.children.length * 360;
                child.node.x = node.pixelX + radius * $math.cos(angle);
                child.node.y = node.pixelY + radius * $math.sin(angle);
                child.node.circle.radius = 0;
                var color;
                var diColor = child.properties.color;
                if ($type.hasValue(diColor)) {
                    color = diColor;
                }
                else {
                    if (_this.dataItems.length == 1 && dataItem.level == 0) {
                        color = _this.colors.next();
                    }
                    else {
                        color = dataItem.color;
                    }
                }
                child.color = color;
                child.node.fill = color;
                child.node.stroke = color;
                child.parentLink.stroke = color;
                child.node.fill = child.node.fill;
                child.node.stroke = child.node.stroke;
                _this.initNode(child);
                index_1++;
            });
        }
        node.isActive = true;
        node.show(0);
        this.updateNodeList();
    };
    /**
     * @ignore
     * @todo description
     */
    ForceDirectedSeries.prototype.processLinkWith = function (dataItem) {
        var _this = this;
        if (dataItem.linkWith) {
            $array.each(dataItem.linkWith, function (id, index) {
                var dataItemToConnect = _this.getDataItemById(_this.dataItems, id);
                if (dataItemToConnect) {
                    dataItem.node.linkWith(dataItemToConnect.node, _this.linkWithStrength);
                }
            });
        }
        if (dataItem.children) {
            dataItem.children.each(function (child) {
                _this.processLinkWith(child);
            });
        }
    };
    /**
     * Returns a [[ForceDirectedSeriesDataItem]] related to node by specific id.
     *
     * @param   dataItems  List of data items to search in
     * @param   id         Id to search for
     * @return             Data item
     */
    ForceDirectedSeries.prototype.getDataItemById = function (dataItems, id) {
        for (var i = dataItems.length - 1; i >= 0; i--) {
            var dataItem = dataItems.getIndex(i);
            if (dataItem.id == id) {
                return dataItem;
            }
            if (dataItem.children) {
                var di = this.getDataItemById(dataItem.children, id);
                if (di) {
                    return di;
                }
            }
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    ForceDirectedSeries.prototype.createDataItem = function () {
        return new ForceDirectedSeriesDataItem();
    };
    Object.defineProperty(ForceDirectedSeries.prototype, "nodes", {
        /**
         * A list of nodes in series.
         *
         * @return  Node list
         */
        get: function () {
            if (!this._nodes) {
                var node = this.createNode();
                node.applyOnClones = true;
                this._disposers.push(node);
                this._nodes = new ListTemplate(node);
                this._disposers.push(new ListDisposer(this._nodes));
            }
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "links", {
        /**
         * A list of links between nodes.
         *
         * @return  Link list
         */
        get: function () {
            if (!this._links) {
                var link = this.createLink();
                link.applyOnClones = true;
                this._disposers.push(link);
                this._links = new ListTemplate(link);
                this._disposers.push(new ListDisposer(this._links));
            }
            return this._links;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new node.
     */
    ForceDirectedSeries.prototype.createNode = function () {
        return new ForceDirectedNode();
    };
    /**
     * Creates a new link.
     */
    ForceDirectedSeries.prototype.createLink = function () {
        return new ForceDirectedLink();
    };
    Object.defineProperty(ForceDirectedSeries.prototype, "minRadius", {
        /**
         * @return Minimum radius (px or percent)
         */
        get: function () {
            return this.getPropertyValue("minRadius");
        },
        /**
         * Smallest possible radius in pixels of the node circle.
         *
         * If set in percent, it radius will be calculated from average width and
         * height of series.
         *
         * @default Percent(1)
         * @param  value  Minimum radius (px or percent)
         */
        set: function (value) {
            this.setPropertyValue("minRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "baseValue", {
        /**
         * @return Minimum value
         */
        get: function () {
            return this.getPropertyValue("baseValue");
        },
        /**
         * Base value. If you set it to null, real minimum value of your data will be used.
         *
         * @default 0
         * @param  value  Minimum value
         */
        set: function (value) {
            this.setPropertyValue("baseValue", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "maxRadius", {
        /**
         * @return Maximum radius (px or Percent)
         */
        get: function () {
            return this.getPropertyValue("maxRadius");
        },
        /**
         * Biggest possible radius in pixels of the node circle.
         *
         * If set in percent, it radius will be calculated from average width and
         * height of series.
         *
         * @default Percent(8)
         * @param  value  Maximum radius (px or Percent)
         */
        set: function (value) {
            this.setPropertyValue("maxRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "colors", {
        /**
         * @return Color set
         */
        get: function () {
            return this.getPropertyValue("colors");
        },
        /**
         * A color set to be used for nodes.
         *
         * iIt works like this:
         *
         * The first level with more than one node, assigns different colors to all
         * nodes in this list. Their child nodes inherit the color.
         *
         * For example, if the top level has one node with three children, the top
         * node will get first color, the first child will get second color, etc.
         *
         * If there are two top nodes, the first top node gets first color, the
         * second top node gets the second color. Their subsequent children inherit
         * colors.
         *
         * @param value  Color set
         */
        set: function (value) {
            this.setPropertyValue("colors", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "maxLevels", {
        /**
         * @return Number of levels
         */
        get: function () {
            return this.getPropertyValue("maxLevels");
        },
        /**
         * Number of levels to be displayed initially.
         *
         * @param  value  Number of levels
         */
        set: function (value) {
            this.setPropertyValue("maxLevels", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "manyBodyStrength", {
        /**
         * @return  Body push/attrack strength
         */
        get: function () {
            return this.getPropertyValue("manyBodyStrength");
        },
        /**
         * Relative strength each node pushes (or attracts) other nodes (it is
         * multiplied by `node.circle.radius` for big nodes to push stronger).
         *
         * Positive value will make nodes attract each other, while negative will
         * push away each other. The bigger the negative number is, the more
         * scattered nodes will be.
         *
         * Available value range: `-XX` to `XX`.
         *
         * @default -15
         * @param  value  Body push/attrack strength
         */
        set: function (value) {
            if (this.setPropertyValue("manyBodyStrength", value)) {
                this.restartSimulation();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "centerStrength", {
        /**
         * @return  Stregth of attraction to center
         */
        get: function () {
            return this.getPropertyValue("centerStrength");
        },
        /**
         * Relative strength each child node is pushes (or attracted) to the center
         * of the chart.
         *
         * Positive value will make nodes to be attracted to center, while negative
         * will push them away.
         *
         * Available value range: `-50` to `50`.
         *
         * @default 0.8
         * @param  value  Stregth of attraction to center
         */
        set: function (value) {
            if (this.setPropertyValue("centerStrength", value)) {
                this.restartSimulation();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "linkWithStrength", {
        /**
         * @return Strength
         */
        get: function () {
            return this.getPropertyValue("linkWithStrength");
        },
        /**
         * Relative attraction strength between the nodes connected with `linkWith`.
         *
         * @since 4.4.8
         * @param  value  Strength
         * @default undefined
         */
        set: function (value) {
            if (this.setPropertyValue("linkWithStrength", value)) {
                this.restartSimulation();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "velocityDecay", {
        /**
         * @return Velocity decay
         */
        get: function () {
            return this.getPropertyValue("velocityDecay");
        },
        /**
         * The bigger the number the more slowly the nodes will move. Think of it as
         * friction.
         *
         * @since 4.9.2
         * @param  value  Velocity decay
         * @default 0.4
         */
        set: function (value) {
            if (this.setPropertyValue("velocityDecay", value)) {
                this.d3forceSimulation.velocityDecay(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedSeries.prototype, "dragFixedNodes", {
        /**
         * @return Allow drag fixed nodes?
         */
        get: function () {
            return this.getPropertyValue("dragFixedNodes");
        },
        /**
         * Specifies if user can drag fixed nodes.
         *
         * @since 4.9.0
         * @default false
         * @param  value  Allow drag fixed nodes?
         */
        set: function (value) {
            var _this = this;
            if (this.setPropertyValue("dragFixedNodes", value)) {
                this.dataItems.each(function (dataItem) {
                    _this.handleFixed(dataItem);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param marker    Container
     * @param dataItem  Data item
     */
    ForceDirectedSeries.prototype.createLegendMarker = function (marker, dataItem) {
        marker.children.each(function (child) {
            var node = dataItem.node;
            if (child instanceof RoundedRectangle) {
                child.cornerRadius(40, 40, 40, 40);
            }
            child.defaultState.properties.fill = node.fill;
            child.defaultState.properties.stroke = node.stroke;
            child.defaultState.properties.fillOpacity = node.fillOpacity;
            child.defaultState.properties.strokeOpacity = node.strokeOpacity;
            child.fill = node.fill;
            child.stroke = node.stroke;
            child.fillOpacity = node.fillOpacity;
            child.strokeOpacity = node.strokeOpacity;
            if (child.fill == undefined) {
                child.__disabled = true;
            }
            var legendDataItem = marker.dataItem;
            legendDataItem.color = node.fill;
            legendDataItem.colorOrig = node.fill;
            node.events.on("propertychanged", function (ev) {
                if (ev.property == "fill") {
                    child.__disabled = false;
                    if (!child.isActive) {
                        child.fill = node.fill;
                    }
                    child.defaultState.properties.fill = node.fill;
                    legendDataItem.color = node.fill;
                    legendDataItem.colorOrig = node.fill;
                }
                if (ev.property == "stroke") {
                    if (!child.isActive) {
                        child.stroke = node.stroke;
                    }
                    child.defaultState.properties.stroke = node.stroke;
                }
            }, undefined, false);
        });
    };
    Object.defineProperty(ForceDirectedSeries.prototype, "showOnTick", {
        /**
         * @return Number of ticks to delay rendering
         */
        get: function () {
            return this.getPropertyValue("showOnTick");
        },
        /**
         * Renders series hidden until Xth tick.
         *
         * @default 10
         * @since 4.10.17
         * @param value Number of ticks to delay rendering
         */
        set: function (value) {
            this.setPropertyValue("showOnTick", value);
        },
        enumerable: true,
        configurable: true
    });
    return ForceDirectedSeries;
}(Series));
export { ForceDirectedSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ForceDirectedSeries"] = ForceDirectedSeries;
registry.registeredClasses["ForceDirectedSeriesDataItem"] = ForceDirectedSeriesDataItem;
//# sourceMappingURL=ForceDirectedSeries.js.map