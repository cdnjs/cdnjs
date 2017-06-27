/*!
Plottable v0.7.0 (https://github.com/palantir/plottable)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Utils) {
        /**
        * Checks if x is between a and b.
        */
        function inRange(x, a, b) {
            return (Math.min(a, b) <= x && x <= Math.max(a, b));
        }
        Utils.inRange = inRange;

        /**
        * Gets the bounding box of an element.
        * @param {D3.Selection} element
        * @returns {SVGRed} The bounding box.
        */
        function getBBox(element) {
            return element.node().getBBox();
        }
        Utils.getBBox = getBBox;

        /**
        * Truncates a text string to a max length, given the element in which to draw the text
        *
        * @param {string} text: The string to put in the text element, and truncate
        * @param {D3.Selection} element: The element in which to measure and place the text
        * @param {number} length: How much space to truncate text into
        * @returns {string} text - the shortened text
        */
        function truncateTextToLength(text, length, element) {
            var originalText = element.text();
            element.text(text);
            var bbox = Utils.getBBox(element);
            var textLength = bbox.width;
            if (textLength < length) {
                element.text(originalText);
                return text;
            }
            element.text(text + "...");
            var textNode = element.node();
            var dotLength = textNode.getSubStringLength(textNode.textContent.length - 3, 3);
            if (dotLength > length) {
                element.text(originalText);
                return "";
            }

            var numChars = text.length;
            for (var i = 1; i < numChars; i++) {
                var testLength = textNode.getSubStringLength(0, i);
                if (testLength + dotLength > length) {
                    element.text(originalText);
                    return text.substr(0, i - 1).trim() + "...";
                }
            }
        }
        Utils.truncateTextToLength = truncateTextToLength;

        /**
        * Gets the height of a text element, as rendered.
        *
        * @param {D3.Selection} textElement
        * @return {number} The height of the text element, in pixels.
        */
        function getTextHeight(textElement) {
            var originalText = textElement.text();
            textElement.text("bqpdl");
            var height = Utils.getBBox(textElement).height;
            textElement.text(originalText);
            return height;
        }
        Utils.getTextHeight = getTextHeight;

        function getSVGPixelWidth(svg) {
            var width = svg.node().clientWidth;

            if (width === 0) {
                var widthAttr = svg.attr("width");

                if (widthAttr.indexOf("%") !== -1) {
                    var ancestorNode = svg.node().parentNode;
                    while (ancestorNode != null && ancestorNode.clientWidth === 0) {
                        ancestorNode = ancestorNode.parentNode;
                    }
                    if (ancestorNode == null) {
                        throw new Error("Could not compute width of element");
                    }
                    width = ancestorNode.clientWidth * parseFloat(widthAttr) / 100;
                } else {
                    width = parseFloat(widthAttr);
                }
            }

            return width;
        }
        Utils.getSVGPixelWidth = getSVGPixelWidth;
    })(Plottable.Utils || (Plottable.Utils = {}));
    var Utils = Plottable.Utils;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
// This file contains open source utilities, along with their copyright notices
var Plottable;
(function (Plottable) {
    (function (OSUtils) {
        

        function sortedIndex(val, arr, accessor) {
            var low = 0;
            var high = arr.length;
            while (low < high) {
                /* tslint:disable:no-bitwise */
                var mid = (low + high) >>> 1;

                /* tslint:enable:no-bitwise */
                var x = accessor == null ? arr[mid] : accessor(arr[mid]);
                if (x < val) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            return low;
        }
        OSUtils.sortedIndex = sortedIndex;
        ;
    })(Plottable.OSUtils || (Plottable.OSUtils = {}));
    var OSUtils = Plottable.OSUtils;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Component = (function () {
        function Component() {
            this.interactionsToRegister = [];
            this.boxes = [];
            this.clipPathEnabled = false;
            this._fixedWidth = true;
            this._fixedHeight = true;
            this._rowMinimum = 0;
            this._colMinimum = 0;
            this.isTopLevelComponent = false;
            this._xOffset = 0;
            this._yOffset = 0;
            this._xAlignProportion = 0;
            this._yAlignProportion = 0;
            this.cssClasses = ["component"];
        }
        /**
        * Attaches the Component to a DOM element. Usually only directly invoked on root-level Components.
        *
        * @param {D3.Selection} element A D3 selection consisting of the element to anchor to.
        * @returns {Component} The calling component.
        */
        Component.prototype._anchor = function (element) {
            var _this = this;
            if (element.node().childNodes.length > 0) {
                throw new Error("Can't anchor to a non-empty element");
            }
            if (element.node().nodeName === "svg") {
                // svg node gets the "plottable" CSS class
                this.rootSVG = element;
                this.rootSVG.classed("plottable", true);
                this.element = element.append("g");
                this.isTopLevelComponent = true;
            } else {
                this.element = element;
            }

            this.cssClasses.forEach(function (cssClass) {
                _this.element.classed(cssClass, true);
            });
            this.cssClasses = null;

            this.backgroundContainer = this.element.append("g").classed("background-container", true);
            this.content = this.element.append("g").classed("content", true);
            this.foregroundContainer = this.element.append("g").classed("foreground-container", true);
            this.boxContainer = this.element.append("g").classed("box-container", true);

            if (this.clipPathEnabled) {
                this.generateClipPath();
            }
            ;

            this.addBox("bounding-box");

            this.interactionsToRegister.forEach(function (r) {
                return _this.registerInteraction(r);
            });
            this.interactionsToRegister = null;
            return this;
        };

        /**
        * Computes the size, position, and alignment from the specified values.
        * If no parameters are supplied and the component is a root node,
        * they are inferred from the size of the component's element.
        *
        * @param {number} xOrigin
        * @param {number} yOrigin
        * @param {number} availableWidth
        * @param {number} availableHeight
        * @returns {Component} The calling Component.
        */
        Component.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
            var _this = this;
            if (xOrigin == null || yOrigin == null || availableWidth == null || availableHeight == null) {
                if (this.element == null) {
                    throw new Error("anchor must be called before computeLayout");
                } else if (this.isTopLevelComponent) {
                    // we are the root node, retrieve height/width from root SVG
                    xOrigin = 0;
                    yOrigin = 0;
                    availableWidth = parseFloat(this.rootSVG.attr("width"));
                    availableHeight = parseFloat(this.rootSVG.attr("height"));
                } else {
                    throw new Error("null arguments cannot be passed to _computeLayout() on a non-root node");
                }
            }
            this.xOrigin = xOrigin;
            this.yOrigin = yOrigin;
            var xPosition = this.xOrigin;
            var yPosition = this.yOrigin;

            xPosition += (availableWidth - this.colMinimum()) * this._xAlignProportion;
            xPosition += this._xOffset;
            if (this.colMinimum() !== 0 && this.isFixedWidth()) {
                // Decrease size so hitbox / bounding box and children are sized correctly
                availableWidth = availableWidth > this.colMinimum() ? this.colMinimum() : availableWidth;
            }

            yPosition += (availableHeight - this.rowMinimum()) * this._yAlignProportion;
            yPosition += this._yOffset;
            if (this.rowMinimum() !== 0 && this.isFixedHeight()) {
                availableHeight = availableHeight > this.rowMinimum() ? this.rowMinimum() : availableHeight;
            }

            this.availableWidth = availableWidth;
            this.availableHeight = availableHeight;
            this.element.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            this.boxes.forEach(function (b) {
                return b.attr("width", _this.availableWidth).attr("height", _this.availableHeight);
            });
            return this;
        };

        /**
        * Renders the component.
        *
        * @returns {Component} The calling Component.
        */
        Component.prototype._render = function () {
            return this;
        };

        Component.prototype.renderTo = function (element) {
            // When called on top-level-component, a shortcut for component._anchor(svg)._computeLayout()._render()
            if (this.element == null) {
                this._anchor(element);
            }
            this._computeLayout()._render();
            return this;
        };

        /**
        * Sets the x alignment of the Component.
        *
        * @param {string} alignment The x alignment of the Component (one of LEFT/CENTER/RIGHT).
        * @returns {Component} The calling Component.
        */
        Component.prototype.xAlign = function (alignment) {
            alignment = alignment.toLowerCase();
            if (alignment === "left") {
                this._xAlignProportion = 0;
            } else if (alignment === "center") {
                this._xAlignProportion = 0.5;
            } else if (alignment === "right") {
                this._xAlignProportion = 1;
            } else {
                throw new Error("Unsupported alignment");
            }
            return this;
        };

        /**
        * Sets the y alignment of the Component.
        *
        * @param {string} alignment The y alignment of the Component (one of TOP/CENTER/BOTTOM).
        * @returns {Component} The calling Component.
        */
        Component.prototype.yAlign = function (alignment) {
            alignment = alignment.toLowerCase();
            if (alignment === "top") {
                this._yAlignProportion = 0;
            } else if (alignment === "center") {
                this._yAlignProportion = 0.5;
            } else if (alignment === "bottom") {
                this._yAlignProportion = 1;
            } else {
                throw new Error("Unsupported alignment");
            }
            return this;
        };

        /**
        * Sets the x offset of the Component.
        *
        * @param {number} offset The desired x offset, in pixels.
        * @returns {Component} The calling Component.
        */
        Component.prototype.xOffset = function (offset) {
            this._xOffset = offset;
            return this;
        };

        /**
        * Sets the y offset of the Component.
        *
        * @param {number} offset The desired y offset, in pixels.
        * @returns {Component} The calling Component.
        */
        Component.prototype.yOffset = function (offset) {
            this._yOffset = offset;
            return this;
        };

        Component.prototype.addBox = function (className, parentElement) {
            if (this.element == null) {
                throw new Error("Adding boxes before anchoring is currently disallowed");
            }
            var parentElement = parentElement == null ? this.boxContainer : parentElement;
            var box = parentElement.append("rect");
            if (className != null) {
                box.classed(className, true);
            }
            ;
            this.boxes.push(box);
            if (this.availableWidth != null && this.availableHeight != null) {
                box.attr("width", this.availableWidth).attr("height", this.availableHeight);
            }
            return box;
        };

        Component.prototype.generateClipPath = function () {
            // The clip path will prevent content from overflowing its component space.
            var clipPathId = Component.clipPathId++;
            this.element.attr("clip-path", "url(#clipPath" + clipPathId + ")");
            var clipPathParent = this.boxContainer.append("clipPath").attr("id", "clipPath" + clipPathId);
            this.addBox("clip-rect", clipPathParent);
        };

        /**
        * Attaches an Interaction to the Component, so that the Interaction will listen for events on the Component.
        *
        * @param {Interaction} interaction The Interaction to attach to the Component.
        * @return {Component} The calling Component.
        */
        Component.prototype.registerInteraction = function (interaction) {
            // Interactions can be registered before or after anchoring. If registered before, they are
            // pushed to this.interactionsToRegister and registered during anchoring. If after, they are
            // registered immediately
            if (this.element != null) {
                if (this.hitBox == null) {
                    this.hitBox = this.addBox("hit-box");
                    this.hitBox.style("fill", "#ffffff").style("opacity", 0); // We need to set these so Chrome will register events
                }
                interaction._anchor(this.hitBox);
            } else {
                this.interactionsToRegister.push(interaction);
            }
            return this;
        };

        Component.prototype.classed = function (cssClass, addClass) {
            if (addClass == null) {
                if (cssClass == null) {
                    return false;
                } else if (this.element == null) {
                    return (this.cssClasses.indexOf(cssClass) !== -1);
                } else {
                    return this.element.classed(cssClass);
                }
            } else {
                if (cssClass == null) {
                    return this;
                }
                if (this.element == null) {
                    var classIndex = this.cssClasses.indexOf(cssClass);
                    if (addClass && classIndex === -1) {
                        this.cssClasses.push(cssClass);
                    } else if (!addClass && classIndex !== -1) {
                        this.cssClasses.splice(classIndex, 1);
                    }
                } else {
                    this.element.classed(cssClass, addClass);
                }
                return this;
            }
        };

        Component.prototype.rowMinimum = function (newVal) {
            if (newVal != null) {
                this._rowMinimum = newVal;
                return this;
            } else {
                return this._rowMinimum;
            }
        };

        Component.prototype.colMinimum = function (newVal) {
            if (newVal != null) {
                this._colMinimum = newVal;
                return this;
            } else {
                return this._colMinimum;
            }
        };

        /**
        * Checks if the Component has a fixed width or scales to fill available space.
        * Returns true by default on the base Component class.
        *
        * @return {boolean} Whether the component has a fixed width.
        */
        Component.prototype.isFixedWidth = function () {
            return this._fixedWidth;
        };

        /**
        * Checks if the Component has a fixed height or scales to fill available space.
        * Returns true by default on the base Component class.
        *
        * @return {boolean} Whether the component has a fixed height.
        */
        Component.prototype.isFixedHeight = function () {
            return this._fixedHeight;
        };

        /**
        * Merges this Component with another Component, returning a ComponentGroup.
        * There are four cases:
        * Component + Component: Returns a ComponentGroup with both components inside it.
        * ComponentGroup + Component: Returns the ComponentGroup with the Component appended.
        * Component + ComponentGroup: Returns the ComponentGroup with the Component prepended.
        * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with two ComponentGroups inside it.
        *
        * @param {Component} c The component to merge in.
        * @return {ComponentGroup}
        */
        Component.prototype.merge = function (c) {
            var cg;
            if (Plottable.ComponentGroup.prototype.isPrototypeOf(c)) {
                cg = c;
                cg._addComponentToGroup(this, true);
                return cg;
            } else {
                cg = new Plottable.ComponentGroup([this, c]);
                return cg;
            }
        };
        Component.clipPathId = 0;
        return Component;
    })();
    Plottable.Component = Component;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale = (function () {
        /**
        * Creates a new Scale.
        *
        * @constructor
        * @param {D3.Scale.Scale} scale The D3 scale backing the Scale.
        */
        function Scale(scale) {
            this._broadcasterCallbacks = [];
            this._d3Scale = scale;
        }
        /**
        * Returns the range value corresponding to a given domain value.
        *
        * @param value {any} A domain value to be scaled.
        * @returns {any} The range value corresponding to the supplied domain value.
        */
        Scale.prototype.scale = function (value) {
            return this._d3Scale(value);
        };

        Scale.prototype.domain = function (values) {
            var _this = this;
            if (values == null) {
                return this._d3Scale.domain();
            } else {
                this._d3Scale.domain(values);
                this._broadcasterCallbacks.forEach(function (b) {
                    return b(_this);
                });
                return this;
            }
        };

        Scale.prototype.range = function (values) {
            if (values == null) {
                return this._d3Scale.range();
            } else {
                this._d3Scale.range(values);
                return this;
            }
        };

        /**
        * Creates a copy of the Scale with the same domain and range but without any registered listeners.
        *
        * @returns {Scale} A copy of the calling Scale.
        */
        Scale.prototype.copy = function () {
            return new Scale(this._d3Scale.copy());
        };

        /**
        * Registers a callback to be called when the scale's domain is changed.
        *
        * @param {IBroadcasterCallback} callback A callback to be called when the Scale's domain changes.
        * @returns {Scale} The Calling Scale.
        */
        Scale.prototype.registerListener = function (callback) {
            this._broadcasterCallbacks.push(callback);
            return this;
        };
        return Scale;
    })();
    Plottable.Scale = Scale;

    var OrdinalScale = (function (_super) {
        __extends(OrdinalScale, _super);
        /**
        * Creates a new OrdinalScale. Domain and Range are set later.
        *
        * @constructor
        */
        function OrdinalScale() {
            _super.call(this, d3.scale.ordinal());
            this.END_PADDING = 0.5;
            this._range = [0, 1];
        }
        OrdinalScale.prototype.domain = function (values) {
            var _this = this;
            if (values == null) {
                return this._d3Scale.domain();
            } else {
                this._d3Scale.domain(values);
                this._broadcasterCallbacks.forEach(function (b) {
                    return b(_this);
                });
                this._d3Scale.rangePoints(this.range(), 2 * this.END_PADDING); // d3 scale takes total padding
                return this;
            }
        };

        OrdinalScale.prototype.range = function (values) {
            if (values == null) {
                return this._range;
            } else {
                this._range = values;
                this._d3Scale.rangePoints(values, 2 * this.END_PADDING); // d3 scale takes total padding
                return this;
            }
        };
        return OrdinalScale;
    })(Scale);
    Plottable.OrdinalScale = OrdinalScale;

    var QuantitiveScale = (function (_super) {
        __extends(QuantitiveScale, _super);
        /**
        * Creates a new QuantitiveScale.
        *
        * @constructor
        * @param {D3.Scale.QuantitiveScale} scale The D3 QuantitiveScale backing the QuantitiveScale.
        */
        function QuantitiveScale(scale) {
            _super.call(this, scale);
            this.lastRequestedTickCount = 10;
        }
        /**
        * Retrieves the domain value corresponding to a supplied range value.
        *
        * @param {number} value: A value from the Scale's range.
        * @returns {number} The domain value corresponding to the supplied range value.
        */
        QuantitiveScale.prototype.invert = function (value) {
            return this._d3Scale.invert(value);
        };

        /**
        * Creates a copy of the QuantitiveScale with the same domain and range but without any registered listeners.
        *
        * @returns {QuantitiveScale} A copy of the calling QuantitiveScale.
        */
        QuantitiveScale.prototype.copy = function () {
            return new QuantitiveScale(this._d3Scale.copy());
        };

        /**
        * Expands the QuantitiveScale's domain to cover the new region.
        *
        * @param {number[]} newDomain The additional domain to be covered by the QuantitiveScale.
        * @returns {QuantitiveScale} The scale.
        */
        QuantitiveScale.prototype.widenDomain = function (newDomain) {
            var currentDomain = this.domain();
            var wideDomain = [Math.min(newDomain[0], currentDomain[0]), Math.max(newDomain[1], currentDomain[1])];
            this.domain(wideDomain);
            return this;
        };

        /**
        * Expands the QuantitiveScale's domain to cover the data given.
        * Passes an accessor through to the native d3 code.
        *
        * @param data The data to operate on.
        * @param [accessor] The accessor to get values out of the data
        * @returns {QuantitiveScale} The scale.
        */
        QuantitiveScale.prototype.widenDomainOnData = function (data, accessor) {
            var extent = d3.extent(data, accessor);
            this.widenDomain(extent);
            return this;
        };

        QuantitiveScale.prototype.interpolate = function (factory) {
            if (factory == null) {
                return this._d3Scale.interpolate();
            }
            this._d3Scale.interpolate(factory);
            return this;
        };

        /**
        * Sets the range of the QuantitiveScale and sets the interpolator to d3.interpolateRound.
        *
        * @param {number[]} values The new range value for the range.
        */
        QuantitiveScale.prototype.rangeRound = function (values) {
            this._d3Scale.rangeRound(values);
            return this;
        };

        QuantitiveScale.prototype.clamp = function (clamp) {
            if (clamp == null) {
                return this._d3Scale.clamp();
            }
            this._d3Scale.clamp(clamp);
            return this;
        };

        /**
        * Extends the scale's domain so it starts and ends with "nice" values.
        *
        * @param {number} [count] The number of ticks that should fit inside the new domain.
        */
        QuantitiveScale.prototype.nice = function (count) {
            this._d3Scale.nice(count);
            this.domain(this._d3Scale.domain()); // nice() can change the domain, so update all listeners
            return this;
        };

        /**
        * Generates tick values.
        *
        * @param {number} [count] The number of ticks to generate.
        * @returns {any[]} The generated ticks.
        */
        QuantitiveScale.prototype.ticks = function (count) {
            if (count != null) {
                this.lastRequestedTickCount = count;
            }
            return this._d3Scale.ticks(this.lastRequestedTickCount);
        };

        /**
        * Gets a tick formatting function for displaying tick values.
        *
        * @param {number} count The number of ticks to be displayed
        * @param {string} [format] A format specifier string.
        * @returns {(n: number) => string} A formatting function.
        */
        QuantitiveScale.prototype.tickFormat = function (count, format) {
            return this._d3Scale.tickFormat(count, format);
        };

        /**
        * Pads out the domain of the scale by a specified ratio.
        *
        * @param {number} [padProportion] Proportionally how much bigger the new domain should be (0.05 = 5% larger)
        * @returns {QuantitiveScale} The calling QuantitiveScale.
        */
        QuantitiveScale.prototype.padDomain = function (padProportion) {
            if (typeof padProportion === "undefined") { padProportion = 0.05; }
            var currentDomain = this.domain();
            var extent = currentDomain[1] - currentDomain[0];
            var newDomain = [currentDomain[0] - padProportion / 2 * extent, currentDomain[1] + padProportion / 2 * extent];
            this.domain(newDomain);
            return this;
        };
        return QuantitiveScale;
    })(Scale);
    Plottable.QuantitiveScale = QuantitiveScale;

    var LinearScale = (function (_super) {
        __extends(LinearScale, _super);
        function LinearScale(scale) {
            _super.call(this, scale == null ? d3.scale.linear() : scale);
            this.domain([Infinity, -Infinity]);
        }
        /**
        * Creates a copy of the LinearScale with the same domain and range but without any registered listeners.
        *
        * @returns {LinearScale} A copy of the calling LinearScale.
        */
        LinearScale.prototype.copy = function () {
            return new LinearScale(this._d3Scale.copy());
        };
        return LinearScale;
    })(QuantitiveScale);
    Plottable.LinearScale = LinearScale;

    var ColorScale = (function (_super) {
        __extends(ColorScale, _super);
        /**
        * Creates a ColorScale.
        *
        * @constructor
        * @param {string} [scaleType] the type of color scale to create (Category10/Category20/Category20b/Category20c)
        */
        function ColorScale(scaleType) {
            var scale;
            switch (scaleType) {
                case "Category10":
                case "category10":
                case "10":
                    scale = d3.scale.category10();
                    break;
                case "Category20":
                case "category20":
                case "20":
                    scale = d3.scale.category20();
                    break;
                case "Category20b":
                case "category20b":
                case "20b":
                    scale = d3.scale.category20b();
                    break;
                case "Category20c":
                case "category20c":
                case "20c":
                    scale = d3.scale.category20c();
                    break;
                case null:
                case undefined:
                    scale = d3.scale.ordinal();
                    break;
                default:
                    throw new Error("Unsupported ColorScale type");
            }
            _super.call(this, scale);
        }
        return ColorScale;
    })(Scale);
    Plottable.ColorScale = ColorScale;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Interaction = (function () {
        /**
        * Creates an Interaction.
        *
        * @constructor
        * @param {Component} componentToListenTo The component to listen for interactions on.
        */
        function Interaction(componentToListenTo) {
            this.componentToListenTo = componentToListenTo;
        }
        Interaction.prototype._anchor = function (hitBox) {
            this.hitBox = hitBox;
        };

        /**
        * Registers the Interaction on the Component it's listening to.
        * This needs to be called to activate the interaction.
        */
        Interaction.prototype.registerWithComponent = function () {
            this.componentToListenTo.registerInteraction(this);
            return this;
        };
        return Interaction;
    })();
    Plottable.Interaction = Interaction;

    var PanZoomInteraction = (function (_super) {
        __extends(PanZoomInteraction, _super);
        /**
        * Creates a PanZoomInteraction.
        *
        * @constructor
        * @param {Component} componentToListenTo The component to listen for interactions on.
        * @param {QuantitiveScale} xScale The X scale to update on panning/zooming.
        * @param {QuantitiveScale} yScale The Y scale to update on panning/zooming.
        */
        function PanZoomInteraction(componentToListenTo, xScale, yScale) {
            var _this = this;
            _super.call(this, componentToListenTo);
            this.xScale = xScale;
            this.yScale = yScale;
            this.zoom = d3.behavior.zoom();
            this.zoom.x(this.xScale._d3Scale);
            this.zoom.y(this.yScale._d3Scale);
            this.zoom.on("zoom", function () {
                return _this.rerenderZoomed();
            });
        }
        PanZoomInteraction.prototype._anchor = function (hitBox) {
            _super.prototype._anchor.call(this, hitBox);
            this.zoom(hitBox);
        };

        PanZoomInteraction.prototype.rerenderZoomed = function () {
            // HACKHACK since the d3.zoom.x modifies d3 scales and not our TS scales, and the TS scales have the
            // event listener machinery, let's grab the domain out of the d3 scale and pipe it back into the TS scale
            var xDomain = this.xScale._d3Scale.domain();
            var yDomain = this.yScale._d3Scale.domain();
            this.xScale.domain(xDomain);
            this.yScale.domain(yDomain);
        };
        return PanZoomInteraction;
    })(Interaction);
    Plottable.PanZoomInteraction = PanZoomInteraction;

    var AreaInteraction = (function (_super) {
        __extends(AreaInteraction, _super);
        /**
        * Creates an AreaInteraction.
        *
        * @param {Component} componentToListenTo The component to listen for interactions on.
        */
        function AreaInteraction(componentToListenTo) {
            var _this = this;
            _super.call(this, componentToListenTo);
            this.dragInitialized = false;
            this.origin = [0, 0];
            this.location = [0, 0];
            this.dragBehavior = d3.behavior.drag();
            this.dragBehavior.on("dragstart", function () {
                return _this.dragstart();
            });
            this.dragBehavior.on("drag", function () {
                return _this.drag();
            });
            this.dragBehavior.on("dragend", function () {
                return _this.dragend();
            });
        }
        /**
        * Adds a callback to be called when the AreaInteraction triggers.
        *
        * @param {(a: SelectionArea) => any} cb The function to be called. Takes in a SelectionArea in pixels.
        * @returns {AreaInteraction} The calling AreaInteraction.
        */
        AreaInteraction.prototype.callback = function (cb) {
            this.callbackToCall = cb;
            return this;
        };

        AreaInteraction.prototype.dragstart = function () {
            this.clearBox();
            var availableWidth = parseFloat(this.hitBox.attr("width"));
            var availableHeight = parseFloat(this.hitBox.attr("height"));

            // the constraint functions ensure that the selection rectangle will not exceed the hit box
            var constraintFunction = function (min, max) {
                return function (x) {
                    return Math.min(Math.max(x, min), max);
                };
            };
            this.constrainX = constraintFunction(0, availableWidth);
            this.constrainY = constraintFunction(0, availableHeight);
        };

        AreaInteraction.prototype.drag = function () {
            if (!this.dragInitialized) {
                this.origin = [d3.event.x, d3.event.y];
                this.dragInitialized = true;
            }

            this.location = [this.constrainX(d3.event.x), this.constrainY(d3.event.y)];
            var width = Math.abs(this.origin[0] - this.location[0]);
            var height = Math.abs(this.origin[1] - this.location[1]);
            var x = Math.min(this.origin[0], this.location[0]);
            var y = Math.min(this.origin[1], this.location[1]);
            this.dragBox.attr("x", x).attr("y", y).attr("height", height).attr("width", width);
        };

        AreaInteraction.prototype.dragend = function () {
            if (!this.dragInitialized) {
                return;
            }

            this.dragInitialized = false;
            if (this.callbackToCall == null) {
                return;
            }

            var xMin = Math.min(this.origin[0], this.location[0]);
            var xMax = Math.max(this.origin[0], this.location[0]);
            var yMin = Math.min(this.origin[1], this.location[1]);
            var yMax = Math.max(this.origin[1], this.location[1]);
            var pixelArea = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
            this.callbackToCall(pixelArea);
        };

        /**
        * Clears the highlighted drag-selection box drawn by the AreaInteraction.
        *
        * @returns {AreaInteraction} The calling AreaInteraction.
        */
        AreaInteraction.prototype.clearBox = function () {
            this.dragBox.attr("height", 0).attr("width", 0);
            return this;
        };

        AreaInteraction.prototype._anchor = function (hitBox) {
            _super.prototype._anchor.call(this, hitBox);
            var cname = AreaInteraction.CLASS_DRAG_BOX;
            var background = this.componentToListenTo.backgroundContainer;
            this.dragBox = background.append("rect").classed(cname, true).attr("x", 0).attr("y", 0);
            hitBox.call(this.dragBehavior);
            return this;
        };
        AreaInteraction.CLASS_DRAG_BOX = "drag-box";
        return AreaInteraction;
    })(Interaction);
    Plottable.AreaInteraction = AreaInteraction;

    var ZoomCallbackGenerator = (function () {
        function ZoomCallbackGenerator() {
            this.xScaleMappings = [];
            this.yScaleMappings = [];
        }
        /**
        * Adds listen-update pair of X scales.
        *
        * @param {QuantitiveScale} listenerScale An X scale to listen for events on.
        * @param {QuantitiveScale} [targetScale] An X scale to update when events occur.
        * If not supplied, listenerScale will be updated when an event occurs.
        * @returns {ZoomCallbackGenerator} The calling ZoomCallbackGenerator.
        */
        ZoomCallbackGenerator.prototype.addXScale = function (listenerScale, targetScale) {
            if (targetScale == null) {
                targetScale = listenerScale;
            }
            this.xScaleMappings.push([listenerScale, targetScale]);
            return this;
        };

        /**
        * Adds listen-update pair of Y scales.
        *
        * @param {QuantitiveScale} listenerScale A Y scale to listen for events on.
        * @param {QuantitiveScale} [targetScale] A Y scale to update when events occur.
        * If not supplied, listenerScale will be updated when an event occurs.
        * @returns {ZoomCallbackGenerator} The calling ZoomCallbackGenerator.
        */
        ZoomCallbackGenerator.prototype.addYScale = function (listenerScale, targetScale) {
            if (targetScale == null) {
                targetScale = listenerScale;
            }
            this.yScaleMappings.push([listenerScale, targetScale]);
            return this;
        };

        ZoomCallbackGenerator.prototype.updateScale = function (referenceScale, targetScale, pixelMin, pixelMax) {
            var originalDomain = referenceScale.domain();
            var newDomain = [referenceScale.invert(pixelMin), referenceScale.invert(pixelMax)];
            var sameDirection = (newDomain[0] < newDomain[1]) === (originalDomain[0] < originalDomain[1]);
            if (!sameDirection) {
                newDomain.reverse();
            }
            targetScale.domain(newDomain);
        };

        /**
        * Generates a callback that can be passed to Interactions.
        *
        * @returns {(area: SelectionArea) => void} A callback that updates the scales previously specified.
        */
        ZoomCallbackGenerator.prototype.getCallback = function () {
            var _this = this;
            return function (area) {
                _this.xScaleMappings.forEach(function (sm) {
                    _this.updateScale(sm[0], sm[1], area.xMin, area.xMax);
                });
                _this.yScaleMappings.forEach(function (sm) {
                    _this.updateScale(sm[0], sm[1], area.yMin, area.yMax);
                });
            };
        };
        return ZoomCallbackGenerator;
    })();
    Plottable.ZoomCallbackGenerator = ZoomCallbackGenerator;

    var MousemoveInteraction = (function (_super) {
        __extends(MousemoveInteraction, _super);
        function MousemoveInteraction(componentToListenTo) {
            _super.call(this, componentToListenTo);
        }
        MousemoveInteraction.prototype._anchor = function (hitBox) {
            var _this = this;
            _super.prototype._anchor.call(this, hitBox);
            hitBox.on("mousemove", function () {
                var xy = d3.mouse(hitBox.node());
                var x = xy[0];
                var y = xy[1];
                _this.mousemove(x, y);
            });
        };

        MousemoveInteraction.prototype.mousemove = function (x, y) {
            return;
        };
        return MousemoveInteraction;
    })(Interaction);
    Plottable.MousemoveInteraction = MousemoveInteraction;

    var CrosshairsInteraction = (function (_super) {
        __extends(CrosshairsInteraction, _super);
        function CrosshairsInteraction(renderer) {
            var _this = this;
            _super.call(this, renderer);
            this.renderer = renderer;
            renderer.xScale.registerListener(function () {
                return _this.rescale();
            });
            renderer.yScale.registerListener(function () {
                return _this.rescale();
            });
        }
        CrosshairsInteraction.prototype._anchor = function (hitBox) {
            _super.prototype._anchor.call(this, hitBox);
            var container = this.renderer.foregroundContainer.append("g").classed("crosshairs", true);
            this.circle = container.append("circle").classed("centerpoint", true);
            this.xLine = container.append("path").classed("x-line", true);
            this.yLine = container.append("path").classed("y-line", true);
            this.circle.attr("r", 5);
        };

        CrosshairsInteraction.prototype.mousemove = function (x, y) {
            this.lastx = x;
            this.lasty = y;
            var domainX = this.renderer.xScale.invert(x);
            var data = this.renderer._data;
            var xA = this.renderer._getAppliedAccessor(this.renderer._xAccessor);
            var yA = this.renderer._getAppliedAccessor(this.renderer._yAccessor);
            var dataIndex = Plottable.OSUtils.sortedIndex(domainX, data, xA);
            dataIndex = dataIndex > 0 ? dataIndex - 1 : 0;
            var dataPoint = data[dataIndex];

            var dataX = xA(dataPoint, dataIndex);
            var dataY = yA(dataPoint, dataIndex);
            var pixelX = this.renderer.xScale.scale(dataX);
            var pixelY = this.renderer.yScale.scale(dataY);
            this.circle.attr("cx", pixelX).attr("cy", pixelY);

            var width = this.renderer.availableWidth;
            var height = this.renderer.availableHeight;
            this.xLine.attr("d", "M 0 " + pixelY + " L " + width + " " + pixelY);
            this.yLine.attr("d", "M " + pixelX + " 0 L " + pixelX + " " + height);
        };

        CrosshairsInteraction.prototype.rescale = function () {
            if (this.lastx != null) {
                this.mousemove(this.lastx, this.lasty);
            }
        };
        return CrosshairsInteraction;
    })(MousemoveInteraction);
    Plottable.CrosshairsInteraction = CrosshairsInteraction;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Label = (function (_super) {
        __extends(Label, _super);
        /**
        * Creates a Label.
        *
        * @constructor
        * @param {string} [text] The text of the Label.
        * @param {string} [orientation] The orientation of the Label (horizontal/vertical-left/vertical-right).
        */
        function Label(text, orientation) {
            if (typeof text === "undefined") { text = ""; }
            if (typeof orientation === "undefined") { orientation = "horizontal"; }
            _super.call(this);
            this.classed("label", true);
            this.setText(text);
            orientation = orientation.toLowerCase();
            if (orientation === "horizontal" || orientation === "vertical-left" || orientation === "vertical-right") {
                this.orientation = orientation;
                if (orientation === "horizontal") {
                    this._fixedWidth = false;
                } else {
                    this._fixedHeight = false;
                }
            } else {
                throw new Error(orientation + " is not a valid orientation for LabelComponent");
            }
            this.xAlign("CENTER").yAlign("CENTER"); // the defaults
        }
        Label.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.textElement = this.content.append("text");
            this.setText(this.text);
            return this;
        };

        /**
        * Sets the text on the Label.
        *
        * @param {string} text The new text for the Label.
        * @returns {Label} The calling Label.
        */
        Label.prototype.setText = function (text) {
            this.text = text;
            if (this.element != null) {
                this.textElement.text(text);
                this.measureAndSetTextSize();
            }
            return this;
        };

        Label.prototype.measureAndSetTextSize = function () {
            var bbox = Plottable.Utils.getBBox(this.textElement);
            this.textHeight = bbox.height;
            this.textLength = bbox.width;
            if (this.orientation === "horizontal") {
                this.rowMinimum(this.textHeight);
            } else {
                this.colMinimum(this.textHeight);
            }
        };

        Label.prototype.truncateTextAndRemeasure = function (availableLength) {
            var shortText = Plottable.Utils.truncateTextToLength(this.text, availableLength, this.textElement);
            this.textElement.text(shortText);
            this.measureAndSetTextSize();
        };

        Label.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
            _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
            this.element.attr("transform", "translate(" + this.xOrigin + "," + this.yOrigin + ")");

            // We need to undo translation on the original element, since that effects
            // alignment, but we are going to do that manually on the text element.
            this.textElement.attr("dy", 0); // Reset this so we maintain idempotence
            var bbox = Plottable.Utils.getBBox(this.textElement);
            this.textElement.attr("dy", -bbox.y);

            var xShift = 0;
            var yShift = 0;

            if (this.orientation === "horizontal") {
                this.truncateTextAndRemeasure(this.availableWidth);
                xShift = (this.availableWidth - this.textLength) * this._xAlignProportion;
            } else {
                this.truncateTextAndRemeasure(this.availableHeight);
                xShift = (this.availableHeight - this.textLength) * this._yAlignProportion;

                if (this.orientation === "vertical-right") {
                    this.textElement.attr("transform", "rotate(90)");
                    yShift = -this.textHeight;
                } else {
                    this.textElement.attr("transform", "rotate(-90)");
                    xShift = -xShift - this.textLength; // flip xShift
                }
            }

            this.textElement.attr("x", xShift);
            this.textElement.attr("y", yShift);
            return this;
        };
        return Label;
    })(Plottable.Component);
    Plottable.Label = Label;

    var TitleLabel = (function (_super) {
        __extends(TitleLabel, _super);
        function TitleLabel(text, orientation) {
            _super.call(this, text, orientation);
            this.classed("title-label", true);
        }
        return TitleLabel;
    })(Label);
    Plottable.TitleLabel = TitleLabel;

    var AxisLabel = (function (_super) {
        __extends(AxisLabel, _super);
        function AxisLabel(text, orientation) {
            _super.call(this, text, orientation);
            this.classed("axis-label", true);
        }
        return AxisLabel;
    })(Label);
    Plottable.AxisLabel = AxisLabel;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Renderer = (function (_super) {
        __extends(Renderer, _super);
        // A perf-efficient approach to rendering scale changes would be to transform
        // the container rather than re-render. In the event that the data is changed,
        // it will be necessary to do a regular rerender.
        /**
        * Creates a Renderer.
        *
        * @constructor
        * @param {IDataset} [dataset] The dataset associated with the Renderer.
        */
        function Renderer(dataset) {
            _super.call(this);
            this._rerenderUpdateSelection = false;
            // A perf-efficient manner of rendering would be to calculate attributes only
            // on new nodes, and assume that old nodes (ie the update selection) can
            // maintain their current attributes. If we change the metadata or an
            // accessor function, then this property will not be true, and we will need
            // to recompute attributes on the entire update selection.
            this._requireRerender = false;
            this.clipPathEnabled = true;
            this._fixedWidth = false;
            this._fixedHeight = false;
            this.classed("renderer", true);
            if (dataset != null) {
                this.dataset(dataset);
            }
            this.colorAccessor(Renderer.defaultColorAccessor);
        }
        /**
        * Sets a new dataset on the Renderer.
        *
        * @param {IDataset} dataset The new dataset to be associated with the Renderer.
        * @returns {Renderer} The calling Renderer.
        */
        Renderer.prototype.dataset = function (dataset) {
            this.data(dataset.data);
            this.metadata(dataset.metadata);
            return this;
        };

        Renderer.prototype.metadata = function (metadata) {
            var oldCSSClass = this._metadata != null ? this._metadata.cssClass : null;
            this.classed(oldCSSClass, false);
            this._metadata = metadata;
            this.classed(this._metadata.cssClass, true);
            this._rerenderUpdateSelection = true;
            this._requireRerender = true;
            return this;
        };

        Renderer.prototype.data = function (data) {
            this._data = data;
            this._requireRerender = true;
            return this;
        };

        Renderer.prototype._render = function () {
            this._paint();
            this._requireRerender = false;
            this._rerenderUpdateSelection = false;
            return this;
        };

        Renderer.prototype.colorAccessor = function (a) {
            this._colorAccessor = a;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        Renderer.prototype._paint = function () {
            // no-op
        };

        Renderer.prototype.autorange = function () {
            // no-op
            return this;
        };

        Renderer.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.renderArea = this.content.append("g").classed("render-area", true);
            return this;
        };

        Renderer.prototype._getAppliedAccessor = function (accessor) {
            var _this = this;
            if (typeof (accessor) === "function") {
                return function (d, i) {
                    return accessor(d, i, _this._metadata);
                };
            } else if (typeof (accessor) === "string") {
                return function (d, i) {
                    return d[accessor];
                };
            } else {
                return function (d, i) {
                    return accessor;
                };
            }
        };
        Renderer.defaultColorAccessor = function (d) {
            return "#1f77b4";
        };
        return Renderer;
    })(Plottable.Component);
    Plottable.Renderer = Renderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var CategoryRenderer = (function (_super) {
        __extends(CategoryRenderer, _super);
        /**
        * Creates a CategoryRenderer with an Ordinal x scale and Quantitive y scale.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {OrdinalScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
        * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
        */
        function CategoryRenderer(dataset, xScale, yScale, xAccessor, yAccessor) {
            var _this = this;
            _super.call(this, dataset);
            this.autorangeDataOnLayout = true;
            this.classed("category-renderer", true);

            this.xScale = xScale;
            this.yScale = yScale;

            this._xAccessor = (xAccessor != null) ? xAccessor : "x"; // default
            this._yAccessor = (yAccessor != null) ? yAccessor : "y"; // default

            this.xScale.registerListener(function () {
                return _this.rescale();
            });
            this.yScale.registerListener(function () {
                return _this.rescale();
            });
        }
        CategoryRenderer.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
            _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
            this.xScale.range([0, this.availableWidth]);
            this.yScale.range([this.availableHeight, 0]);
            if (this.autorangeDataOnLayout) {
                this.autorange();
            }
            return this;
        };

        CategoryRenderer.prototype.autorange = function () {
            var _this = this;
            _super.prototype.autorange.call(this);
            var data = this._data;
            var xA = function (d) {
                return _this._getAppliedAccessor(_this._xAccessor)(d, null);
            };
            this.xScale.domain(data.map(xA));

            var yA = function (d) {
                return _this._getAppliedAccessor(_this._yAccessor)(d, null);
            };
            var yDomain = d3.extent(data, yA);
            this.yScale.widenDomain(yDomain);
            return this;
        };

        CategoryRenderer.prototype.rescale = function () {
            if (this.element != null) {
                this._render();
            }
        };
        return CategoryRenderer;
    })(Plottable.Renderer);
    Plottable.CategoryRenderer = CategoryRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var XYRenderer = (function (_super) {
        __extends(XYRenderer, _super);
        /**
        * Creates an XYRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {QuantitiveScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
        * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
        */
        function XYRenderer(dataset, xScale, yScale, xAccessor, yAccessor) {
            var _this = this;
            _super.call(this, dataset);
            this.autorangeDataOnLayout = true;
            this.classed("xy-renderer", true);

            this._xAccessor = (xAccessor != null) ? xAccessor : XYRenderer.defaultXAccessor;
            this._yAccessor = (yAccessor != null) ? yAccessor : XYRenderer.defaultYAccessor;

            this.xScale = xScale;
            this.yScale = yScale;

            this.xScale.registerListener(function () {
                return _this.rescale();
            });
            this.yScale.registerListener(function () {
                return _this.rescale();
            });
        }
        XYRenderer.prototype.xAccessor = function (accessor) {
            this._xAccessor = accessor;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        XYRenderer.prototype.yAccessor = function (accessor) {
            this._yAccessor = accessor;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        XYRenderer.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
            _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
            this.xScale.range([0, this.availableWidth]);
            this.yScale.range([this.availableHeight, 0]);
            if (this.autorangeDataOnLayout) {
                this.autorange();
            }
            return this;
        };

        XYRenderer.prototype.autorange = function () {
            var _this = this;
            _super.prototype.autorange.call(this);
            var data = this._data;
            var xA = function (d) {
                return _this._getAppliedAccessor(_this._xAccessor)(d, null);
            };
            var xDomain = d3.extent(data, xA);
            this.xScale.widenDomain(xDomain);

            var yA = function (d) {
                return _this._getAppliedAccessor(_this._yAccessor)(d, null);
            };
            var yDomain = d3.extent(data, yA);
            this.yScale.widenDomain(yDomain);
            return this;
        };

        /**
        * Converts a SelectionArea with pixel ranges to one with data ranges.
        *
        * @param {SelectionArea} pixelArea The selected area, in pixels.
        * @returns {SelectionArea} The corresponding selected area in the domains of the scales.
        */
        XYRenderer.prototype.invertXYSelectionArea = function (pixelArea) {
            var xMin = this.xScale.invert(pixelArea.xMin);
            var xMax = this.xScale.invert(pixelArea.xMax);
            var yMin = this.yScale.invert(pixelArea.yMin);
            var yMax = this.yScale.invert(pixelArea.yMax);
            var dataArea = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
            return dataArea;
        };

        XYRenderer.prototype.getDataFilterFunction = function (dataArea) {
            var xA = this._getAppliedAccessor(this._xAccessor);
            var yA = this._getAppliedAccessor(this._yAccessor);
            var filterFunction = function (d, i) {
                var x = xA(d, i);
                var y = yA(d, i);
                return Plottable.Utils.inRange(x, dataArea.xMin, dataArea.xMax) && Plottable.Utils.inRange(y, dataArea.yMin, dataArea.yMax);
            };
            return filterFunction;
        };

        /**
        * Gets the data in a selected area.
        *
        * @param {SelectionArea} dataArea The selected area.
        * @returns {D3.UpdateSelection} The data in the selected area.
        */
        XYRenderer.prototype.getSelectionFromArea = function (dataArea) {
            var filterFunction = this.getDataFilterFunction(dataArea);
            return this.dataSelection.filter(filterFunction);
        };

        /**
        * Gets the indices of data in a selected area
        *
        * @param {SelectionArea} dataArea The selected area.
        * @returns {number[]} An array of the indices of datapoints in the selected area.
        */
        XYRenderer.prototype.getDataIndicesFromArea = function (dataArea) {
            var filterFunction = this.getDataFilterFunction(dataArea);
            var results = [];
            this._data.forEach(function (d, i) {
                if (filterFunction(d, i)) {
                    results.push(i);
                }
            });
            return results;
        };

        XYRenderer.prototype.rescale = function () {
            if (this.element != null) {
                this._render();
            }
        };
        XYRenderer.defaultXAccessor = "x";
        XYRenderer.defaultYAccessor = "y";
        return XYRenderer;
    })(Plottable.Renderer);
    Plottable.XYRenderer = XYRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var CircleRenderer = (function (_super) {
        __extends(CircleRenderer, _super);
        /**
        * Creates a CircleRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {QuantitiveScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
        * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
        * @param {IAccessor} [rAccessor] A function for extracting radius values from the data.
        */
        function CircleRenderer(dataset, xScale, yScale, xAccessor, yAccessor, rAccessor) {
            _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
            this._rAccessor = (rAccessor != null) ? rAccessor : CircleRenderer.defaultRAccessor;
            this.classed("circle-renderer", true);
        }
        CircleRenderer.prototype.rAccessor = function (a) {
            this._rAccessor = a;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        CircleRenderer.prototype._paint = function () {
            var _this = this;
            _super.prototype._paint.call(this);
            var cx = function (d, i) {
                return _this.xScale.scale(_this._getAppliedAccessor(_this._xAccessor)(d, i));
            };
            var cy = function (d, i) {
                return _this.yScale.scale(_this._getAppliedAccessor(_this._yAccessor)(d, i));
            };
            var r = this._getAppliedAccessor(this._rAccessor);
            var color = this._getAppliedAccessor(this._colorAccessor);
            this.dataSelection = this.renderArea.selectAll("circle").data(this._data);
            this.dataSelection.enter().append("circle");
            this.dataSelection.attr("cx", cx).attr("cy", cy).attr("r", r).attr("fill", color);
            this.dataSelection.exit().remove();
        };
        CircleRenderer.defaultRAccessor = 3;
        return CircleRenderer;
    })(Plottable.XYRenderer);
    Plottable.CircleRenderer = CircleRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var LineRenderer = (function (_super) {
        __extends(LineRenderer, _super);
        /**
        * Creates a LineRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {QuantitiveScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
        * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
        */
        function LineRenderer(dataset, xScale, yScale, xAccessor, yAccessor) {
            _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
            this.classed("line-renderer", true);
        }
        LineRenderer.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.path = this.renderArea.append("path").classed("line", true);
            return this;
        };

        LineRenderer.prototype._paint = function () {
            var _this = this;
            _super.prototype._paint.call(this);
            var xA = this._getAppliedAccessor(this._xAccessor);
            var yA = this._getAppliedAccessor(this._yAccessor);
            var cA = this._getAppliedAccessor(this._colorAccessor);
            this.line = d3.svg.line().x(function (d, i) {
                return _this.xScale.scale(xA(d, i));
            }).y(function (d, i) {
                return _this.yScale.scale(yA(d, i));
            });
            this.dataSelection = this.path.datum(this._data);
            this.path.attr("d", this.line).attr("stroke", cA);
        };
        return LineRenderer;
    })(Plottable.XYRenderer);
    Plottable.LineRenderer = LineRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var BarRenderer = (function (_super) {
        __extends(BarRenderer, _super);
        /**
        * Creates a BarRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {QuantitiveScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting the start position of each bar from the data.
        * @param {IAccessor} [dxAccessor] A function for extracting the width of each bar from the data.
        * @param {IAccessor} [yAccessor] A function for extracting height of each bar from the data.
        */
        function BarRenderer(dataset, xScale, yScale, xAccessor, dxAccessor, yAccessor) {
            _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
            this.barPaddingPx = 1;
            this.classed("bar-renderer", true);

            this.dxAccessor = (dxAccessor != null) ? dxAccessor : BarRenderer.defaultDxAccessor;
        }
        BarRenderer.prototype.autorange = function () {
            _super.prototype.autorange.call(this);
            var xA = this._getAppliedAccessor(this._xAccessor);
            var dxA = this._getAppliedAccessor(this.dxAccessor);
            var x2Accessor = function (d) {
                return xA(d, null) + dxA(d, null);
            };
            var x2Extent = d3.extent(this._data, x2Accessor);
            this.xScale.widenDomain(x2Extent);
            return this;
        };

        BarRenderer.prototype._paint = function () {
            var _this = this;
            _super.prototype._paint.call(this);
            var yRange = this.yScale.range();
            var maxScaledY = Math.max(yRange[0], yRange[1]);

            this.dataSelection = this.renderArea.selectAll("rect").data(this._data);
            var xdr = this.xScale.domain()[1] - this.xScale.domain()[0];
            var xrr = this.xScale.range()[1] - this.xScale.range()[0];
            this.dataSelection.enter().append("rect");

            var xA = this._getAppliedAccessor(this._xAccessor);
            var xFunction = function (d, i) {
                var x = xA(d, i);
                var scaledX = _this.xScale.scale(x);
                return scaledX + _this.barPaddingPx;
            };

            var yA = this._getAppliedAccessor(this._yAccessor);
            var yFunction = function (d, i) {
                var y = yA(d, i);
                var scaledY = _this.yScale.scale(y);
                return scaledY;
            };

            var dxA = this._getAppliedAccessor(this.dxAccessor);
            var widthFunction = function (d, i) {
                var dx = dxA(d, i);
                var scaledDx = _this.xScale.scale(dx);
                var scaledOffset = _this.xScale.scale(0);
                return scaledDx - scaledOffset - 2 * _this.barPaddingPx;
            };

            var heightFunction = function (d, i) {
                return maxScaledY - yFunction(d, i);
            };

            this.dataSelection.attr("x", xFunction).attr("y", yFunction).attr("width", widthFunction).attr("height", heightFunction).attr("fill", this._getAppliedAccessor(this._colorAccessor));
            this.dataSelection.exit().remove();
        };
        BarRenderer.defaultDxAccessor = "dx";
        return BarRenderer;
    })(Plottable.XYRenderer);
    Plottable.BarRenderer = BarRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var SquareRenderer = (function (_super) {
        __extends(SquareRenderer, _super);
        /**
        * Creates a SquareRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {QuantitiveScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
        * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
        * @param {IAccessor} [rAccessor] A function for extracting radius values from the data.
        */
        function SquareRenderer(dataset, xScale, yScale, xAccessor, yAccessor, rAccessor) {
            _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
            this._rAccessor = (rAccessor != null) ? rAccessor : SquareRenderer.defaultRAccessor;
            this.classed("square-renderer", true);
        }
        SquareRenderer.prototype.rAccessor = function (a) {
            this._rAccessor = a;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        SquareRenderer.prototype._paint = function () {
            var _this = this;
            _super.prototype._paint.call(this);
            var xA = this._getAppliedAccessor(this._xAccessor);
            var yA = this._getAppliedAccessor(this._yAccessor);
            var rA = this._getAppliedAccessor(this._rAccessor);
            var cA = this._getAppliedAccessor(this._colorAccessor);
            var xFn = function (d, i) {
                return _this.xScale.scale(xA(d, i)) - rA(d, i);
            };

            var yFn = function (d, i) {
                return _this.yScale.scale(yA(d, i)) - rA(d, i);
            };

            this.dataSelection = this.renderArea.selectAll("rect").data(this._data);
            this.dataSelection.enter().append("rect");
            this.dataSelection.attr("x", xFn).attr("y", yFn).attr("width", rA).attr("height", rA).attr("fill", cA);
            this.dataSelection.exit().remove();
        };
        SquareRenderer.defaultRAccessor = 3;
        return SquareRenderer;
    })(Plottable.XYRenderer);
    Plottable.SquareRenderer = SquareRenderer;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Table = (function (_super) {
        __extends(Table, _super);
        /**
        * Creates a Table.
        *
        * @constructor
        * @param {Component[][]} [rows] A 2-D array of the Components to place in the table.
        * null can be used if a cell is empty.
        */
        function Table(rows) {
            if (typeof rows === "undefined") { rows = []; }
            _super.call(this);
            this.rowPadding = 0;
            this.colPadding = 0;
            this.classed("table", true);
            this.rows = rows;
            this.nRows = rows.length;
            this.nCols = rows.length > 0 ? d3.max(rows, function (r) {
                return r.length;
            }) : 0;
            this.rowWeights = this.rows.map(function () {
                return null;
            });
            this.colWeights = d3.transpose(this.rows).map(function () {
                return null;
            });
        }
        /**
        * Adds a Component in the specified cell.
        *
        * @param {number} row The row in which to add the Component.
        * @param {number} col The column in which to add the Component.
        * @param {Component} component The Component to be added.
        */
        Table.prototype.addComponent = function (row, col, component) {
            if (this.element != null) {
                throw new Error("addComponent cannot be called after anchoring (for the moment)");
            }

            this.nRows = Math.max(row, this.nRows);
            this.nCols = Math.max(col, this.nCols);
            this.padTableToSize(this.nRows + 1, this.nCols + 1);

            var currentComponent = this.rows[row][col];
            if (currentComponent != null) {
                throw new Error("addComponent cannot be called on a cell where a component already exists (for the moment)");
            }

            this.rows[row][col] = component;
            return this;
        };

        Table.prototype._anchor = function (element) {
            var _this = this;
            _super.prototype._anchor.call(this, element);

            // recursively anchor children
            this.rows.forEach(function (row, rowIndex) {
                row.forEach(function (component, colIndex) {
                    if (component != null) {
                        component._anchor(_this.content.append("g"));
                    }
                });
            });
            return this;
        };

        Table.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
            var _this = this;
            _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);

            // calculate the amount of free space by recursive col-/row- Minimum() calls
            var freeWidth = this.availableWidth - this.colMinimum();
            var freeHeight = this.availableHeight - this.rowMinimum();
            if (freeWidth < 0 || freeHeight < 0) {
                throw new Error("Insufficient Space");
            }

            var cols = d3.transpose(this.rows);
            var rowWeights = Table.calcComponentWeights(this.rowWeights, this.rows, function (c) {
                return (c == null) || c.isFixedHeight();
            });
            var colWeights = Table.calcComponentWeights(this.colWeights, cols, function (c) {
                return (c == null) || c.isFixedWidth();
            });

            // distribute remaining height to rows
            var rowProportionalSpace = Table.calcProportionalSpace(rowWeights, freeHeight);
            var colProportionalSpace = Table.calcProportionalSpace(colWeights, freeWidth);

            var sumPair = function (p) {
                return p[0] + p[1];
            };
            var rowHeights = d3.zip(rowProportionalSpace, this.rowMinimums).map(sumPair);
            var colWidths = d3.zip(colProportionalSpace, this.colMinimums).map(sumPair);

            var childYOffset = 0;
            this.rows.forEach(function (row, rowIndex) {
                var childXOffset = 0;
                row.forEach(function (component, colIndex) {
                    // recursively compute layout
                    if (component != null) {
                        component._computeLayout(childXOffset, childYOffset, colWidths[colIndex], rowHeights[rowIndex]);
                    }
                    childXOffset += colWidths[colIndex] + _this.colPadding;
                });
                childYOffset += rowHeights[rowIndex] + _this.rowPadding;
            });
            return this;
        };

        Table.prototype._render = function () {
            // recursively render children
            this.rows.forEach(function (row, rowIndex) {
                row.forEach(function (component, colIndex) {
                    if (component != null) {
                        component._render();
                    }
                });
            });
            return this;
        };

        /**
        * Sets the row and column padding on the Table.
        *
        * @param {number} rowPadding The padding above and below each row, in pixels.
        * @param {number} colPadding the padding to the left and right of each column, in pixels.
        * @returns {Table} The calling Table.
        */
        Table.prototype.padding = function (rowPadding, colPadding) {
            this.rowPadding = rowPadding;
            this.colPadding = colPadding;
            return this;
        };

        /**
        * Sets the layout weight of a particular row.
        * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
        *
        * @param {number} index The index of the row.
        * @param {number} weight The weight to be set on the row.
        * @returns {Table} The calling Table.
        */
        Table.prototype.rowWeight = function (index, weight) {
            this.rowWeights[index] = weight;
            return this;
        };

        /**
        * Sets the layout weight of a particular column.
        * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
        *
        * @param {number} index The index of the column.
        * @param {number} weight The weight to be set on the column.
        * @returns {Table} The calling Table.
        */
        Table.prototype.colWeight = function (index, weight) {
            this.colWeights[index] = weight;
            return this;
        };

        Table.prototype.rowMinimum = function (newVal) {
            if (newVal != null) {
                throw new Error("Row minimum cannot be directly set on Table");
            } else {
                this.rowMinimums = this.rows.map(function (row) {
                    return d3.max(row, function (r) {
                        return (r == null) ? 0 : r.rowMinimum();
                    });
                });
                return d3.sum(this.rowMinimums) + this.rowPadding * (this.rows.length - 1);
            }
        };

        Table.prototype.colMinimum = function (newVal) {
            if (newVal != null) {
                throw new Error("Col minimum cannot be directly set on Table");
            } else {
                var cols = d3.transpose(this.rows);
                this.colMinimums = cols.map(function (col) {
                    return d3.max(col, function (c) {
                        return (c == null) ? 0 : c.colMinimum();
                    });
                });
                return d3.sum(this.colMinimums) + this.colPadding * (cols.length - 1);
            }
        };

        Table.prototype.isFixedWidth = function () {
            var cols = d3.transpose(this.rows);
            return Table.fixedSpace(cols, function (c) {
                return (c == null) || c.isFixedWidth();
            });
        };

        Table.prototype.isFixedHeight = function () {
            return Table.fixedSpace(this.rows, function (c) {
                return (c == null) || c.isFixedHeight();
            });
        };

        Table.prototype.padTableToSize = function (nRows, nCols) {
            for (var i = 0; i < nRows; i++) {
                if (this.rows[i] === undefined) {
                    this.rows[i] = [];
                    this.rowWeights[i] = null;
                }
                for (var j = 0; j < nCols; j++) {
                    if (this.rows[i][j] === undefined) {
                        this.rows[i][j] = null;
                    }
                }
            }
            for (j = 0; j < nCols; j++) {
                if (this.colWeights[j] === undefined) {
                    this.colWeights[j] = null;
                }
            }
        };

        Table.calcComponentWeights = function (setWeights, componentGroups, fixityAccessor) {
            // If the row/col weight was explicitly set, then return it outright
            // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
            // then weight is 0, otherwise weight is 1
            return setWeights.map(function (w, i) {
                if (w != null) {
                    return w;
                }
                var fixities = componentGroups[i].map(fixityAccessor);
                var allFixed = fixities.reduce(function (a, b) {
                    return a && b;
                });
                return allFixed ? 0 : 1;
            });
        };

        Table.calcProportionalSpace = function (weights, freeSpace) {
            var weightSum = d3.sum(weights);
            if (weightSum === 0) {
                var numGroups = weights.length;
                return weights.map(function (w) {
                    return freeSpace / numGroups;
                });
            } else {
                return weights.map(function (w) {
                    return freeSpace * w / weightSum;
                });
            }
        };

        Table.fixedSpace = function (componentGroup, fixityAccessor) {
            var all = function (bools) {
                return bools.reduce(function (a, b) {
                    return a && b;
                });
            };
            var groupIsFixed = function (components) {
                return all(components.map(fixityAccessor));
            };
            return all(componentGroup.map(groupIsFixed));
        };
        return Table;
    })(Plottable.Component);
    Plottable.Table = Table;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var ScaleDomainCoordinator = (function () {
        /**
        * Creates a ScaleDomainCoordinator.
        *
        * @constructor
        * @param {Scale[]} scales A list of scales whose domains should be linked.
        */
        function ScaleDomainCoordinator(scales) {
            var _this = this;
            /* This class is responsible for maintaining coordination between linked scales.
            It registers event listeners for when one of its scales changes its domain. When the scale
            does change its domain, it re-propogates the change to every linked scale.
            */
            this.rescaleInProgress = false;
            this.scales = scales;
            this.scales.forEach(function (s) {
                return s.registerListener(function (sx) {
                    return _this.rescale(sx);
                });
            });
        }
        ScaleDomainCoordinator.prototype.rescale = function (scale) {
            if (this.rescaleInProgress) {
                return;
            }
            this.rescaleInProgress = true;
            var newDomain = scale.domain();
            this.scales.forEach(function (s) {
                return s.domain(newDomain);
            });
            this.rescaleInProgress = false;
        };
        return ScaleDomainCoordinator;
    })();
    Plottable.ScaleDomainCoordinator = ScaleDomainCoordinator;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Legend = (function (_super) {
        __extends(Legend, _super);
        /**
        * Creates a Legend.
        *
        * @constructor
        * @param {ColorScale} colorScale
        */
        function Legend(colorScale) {
            _super.call(this);
            this.classed("legend", true);
            this.colMinimum(120); // the default width
            this.colorScale = colorScale;
            this.xAlign("RIGHT").yAlign("TOP");
            this.xOffset(5).yOffset(5);
        }
        Legend.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.legendBox = this.content.append("rect").classed("legend-box", true);
            return this;
        };

        /**
        * Assigns a new ColorScale to the Legend.
        *
        * @param {ColorScale} scale
        * @returns {Legend} The calling Legend.
        */
        Legend.prototype.scale = function (scale) {
            this.colorScale = scale;
            return this;
        };

        Legend.prototype.rowMinimum = function (newVal) {
            if (newVal != null) {
                throw new Error("Row minimum cannot be directly set on Legend");
            } else {
                var textHeight = this.measureTextHeight();
                return this.colorScale.domain().length * textHeight;
            }
        };

        Legend.prototype.measureTextHeight = function () {
            // note: can't be called before anchoring atm
            var fakeLegendEl = this.content.append("g").classed(Legend.SUBELEMENT_CLASS, true);
            var textHeight = Plottable.Utils.getTextHeight(fakeLegendEl.append("text"));
            fakeLegendEl.remove();
            return textHeight;
        };

        Legend.prototype._render = function () {
            _super.prototype._render.call(this);
            this.legendBox.attr("height", this.rowMinimum()).attr("width", this.colMinimum()); //HACKHACK #223
            var domain = this.colorScale.domain();
            var textHeight = this.measureTextHeight();
            var availableWidth = this.colMinimum() - textHeight - Legend.MARGIN;
            var r = textHeight - Legend.MARGIN * 2 - 2;

            this.content.selectAll("." + Legend.SUBELEMENT_CLASS).remove(); // hackhack to ensure it always rerenders properly
            var legend = this.content.selectAll("." + Legend.SUBELEMENT_CLASS).data(domain);
            var legendEnter = legend.enter().append("g").classed(Legend.SUBELEMENT_CLASS, true).attr("transform", function (d, i) {
                return "translate(0," + i * textHeight + ")";
            });
            legendEnter.append("circle").attr("cx", Legend.MARGIN + r / 2).attr("cy", Legend.MARGIN + r / 2).attr("r", r);
            legendEnter.append("text").attr("x", textHeight).attr("y", Legend.MARGIN + textHeight / 2);
            legend.selectAll("circle").attr("fill", this.colorScale._d3Scale);
            legend.selectAll("text").text(function (d, i) {
                return Plottable.Utils.truncateTextToLength(d, availableWidth, d3.select(this));
            });
            return this;
        };
        Legend.SUBELEMENT_CLASS = "legend-row";
        Legend.MARGIN = 5;
        return Legend;
    })(Plottable.Component);
    Plottable.Legend = Legend;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var StandardChart = (function (_super) {
        __extends(StandardChart, _super);
        function StandardChart() {
            _super.call(this);
            this.xTable = new Plottable.Table();
            this.yTable = new Plottable.Table();
            this.centerComponent = new Plottable.ComponentGroup();
            this.xyTable = new Plottable.Table().addComponent(0, 0, this.yTable).addComponent(1, 1, this.xTable).addComponent(0, 1, this.centerComponent);
            this.addComponent(1, 0, this.xyTable);
        }
        StandardChart.prototype.yAxis = function (y) {
            if (y != null) {
                if (this._yAxis != null) {
                    throw new Error("yAxis already assigned!");
                }
                this._yAxis = y;
                this.yTable.addComponent(0, 1, this._yAxis);
                return this;
            } else {
                return this._yAxis;
            }
        };

        StandardChart.prototype.xAxis = function (x) {
            if (x != null) {
                if (this._xAxis != null) {
                    throw new Error("xAxis already assigned!");
                }
                this._xAxis = x;
                this.xTable.addComponent(0, 0, this._xAxis);
                return this;
            } else {
                return this._xAxis;
            }
        };

        StandardChart.prototype.yLabel = function (y) {
            if (y != null) {
                if (this._yLabel != null) {
                    if (typeof (y) === "string") {
                        this._yLabel.setText(y);
                        return this;
                    } else {
                        throw new Error("yLabel already assigned!");
                    }
                }
                if (typeof (y) === "string") {
                    y = new Plottable.AxisLabel(y, "vertical-left");
                }
                this._yLabel = y;
                this.yTable.addComponent(0, 0, this._yLabel);
                return this;
            } else {
                return this._yLabel;
            }
        };

        StandardChart.prototype.xLabel = function (x) {
            if (x != null) {
                if (this._xLabel != null) {
                    if (typeof (x) === "string") {
                        this._xLabel.setText(x);
                        return this;
                    } else {
                        throw new Error("xLabel already assigned!");
                    }
                }
                if (typeof (x) === "string") {
                    x = new Plottable.AxisLabel(x, "horizontal");
                }
                this._xLabel = x;
                this.xTable.addComponent(1, 0, this._xLabel);
                return this;
            } else {
                return this._xLabel;
            }
        };

        StandardChart.prototype.titleLabel = function (x) {
            if (x != null) {
                if (this._titleLabel != null) {
                    if (typeof (x) === "string") {
                        this._titleLabel.setText(x);
                        return this;
                    } else {
                        throw new Error("titleLabel already assigned!");
                    }
                }
                if (typeof (x) === "string") {
                    x = new Plottable.TitleLabel(x, "horizontal");
                }
                this._titleLabel = x;
                this.addComponent(0, 0, this._titleLabel);
                return this;
            } else {
                return this._titleLabel;
            }
        };

        StandardChart.prototype.addCenterComponent = function (c) {
            this.centerComponent.merge(c);
            return this;
        };
        return StandardChart;
    })(Plottable.Table);
    Plottable.StandardChart = StandardChart;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var CategoryBarRenderer = (function (_super) {
        __extends(CategoryBarRenderer, _super);
        /**
        * Creates a CategoryBarRenderer.
        *
        * @constructor
        * @param {IDataset} dataset The dataset to render.
        * @param {OrdinalScale} xScale The x scale to use.
        * @param {QuantitiveScale} yScale The y scale to use.
        * @param {IAccessor} [xAccessor] A function for extracting the start position of each bar from the data.
        * @param {IAccessor} [widthAccessor] A function for extracting the width position of each bar, in pixels, from the data.
        * @param {IAccessor} [yAccessor] A function for extracting height of each bar from the data.
        */
        function CategoryBarRenderer(dataset, xScale, yScale, xAccessor, widthAccessor, yAccessor) {
            _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
            this.classed("bar-renderer", true);
            this._widthAccessor = (widthAccessor != null) ? widthAccessor : 10; // default width is 10px
        }
        /**
        * Sets the width accessor.
        *
        * @param {any} accessor The new width accessor.
        * @returns {CategoryBarRenderer} The calling CategoryBarRenderer.
        */
        CategoryBarRenderer.prototype.widthAccessor = function (accessor) {
            this._widthAccessor = accessor;
            this._requireRerender = true;
            this._rerenderUpdateSelection = true;
            return this;
        };

        CategoryBarRenderer.prototype._paint = function () {
            var _this = this;
            _super.prototype._paint.call(this);
            var yRange = this.yScale.range();
            var maxScaledY = Math.max(yRange[0], yRange[1]);

            this.dataSelection = this.renderArea.selectAll("rect").data(this._data);
            var xdr = this.xScale.domain()[1] - this.xScale.domain()[0];
            var xrr = this.xScale.range()[1] - this.xScale.range()[0];
            this.dataSelection.enter().append("rect");

            var widthFunction = this._getAppliedAccessor(this._widthAccessor);

            var xA = this._getAppliedAccessor(this._xAccessor);
            var xFunction = function (d, i) {
                var x = xA(d, i);
                var scaledX = _this.xScale.scale(x);
                return scaledX - widthFunction(d, i) / 2;
            };

            var yA = this._getAppliedAccessor(this._yAccessor);
            var yFunction = function (d, i) {
                var y = yA(d, i);
                var scaledY = _this.yScale.scale(y);
                return scaledY;
            };

            var heightFunction = function (d, i) {
                return maxScaledY - yFunction(d, i);
            };

            this.dataSelection.attr("x", xFunction).attr("y", yFunction).attr("width", widthFunction).attr("height", heightFunction).attr("fill", this._getAppliedAccessor(this._colorAccessor));
            this.dataSelection.exit().remove();
        };
        return CategoryBarRenderer;
    })(Plottable.CategoryRenderer);
    Plottable.CategoryBarRenderer = CategoryBarRenderer;
})(Plottable || (Plottable = {}));
/// <reference path="utils.ts" />
/// <reference path="osUtils.ts" />
/// <reference path="component.ts" />
/// <reference path="scale.ts" />
//grunt-start
/// <reference path="axis.ts" />
/// <reference path="interaction.ts" />
/// <reference path="label.ts" />
/// <reference path="renderer.ts" />
/// <reference path="categoryRenderer.ts" />
/// <reference path="xyRenderer.ts" />
/// <reference path="circleRenderer.ts" />
/// <reference path="lineRenderer.ts" />
/// <reference path="barRenderer.ts" />
/// <reference path="squareRenderer.ts" />
/// <reference path="table.ts" />
/// <reference path="coordinator.ts" />
/// <reference path="legend.ts" />
/// <reference path="chart.ts" />
/// <reference path="categoryBarRenderer.ts" />
//grunt-end
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Axis = (function (_super) {
        __extends(Axis, _super);
        /**
        * Creates an Axis.
        *
        * @constructor
        * @param {Scale} scale The Scale to base the Axis on.
        * @param {string} orientation The orientation of the Axis (top/bottom/left/right)
        * @param {any} [formatter] a D3 formatter
        */
        function Axis(axisScale, orientation, formatter) {
            var _this = this;
            _super.call(this);
            this._showEndTickLabels = false;
            this.tickPositioning = "center";
            this.axisScale = axisScale;
            orientation = orientation.toLowerCase();
            this.d3Axis = d3.svg.axis().scale(axisScale._d3Scale).orient(orientation);
            this.classed("axis", true);
            if (formatter == null) {
                formatter = d3.format(".3s");
            }
            this.d3Axis.tickFormat(formatter);
            this.axisScale.registerListener(function () {
                return _this.rescale();
            });
        }
        Axis.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.axisElement = this.content.append("g").classed("axis", true);
            return this;
        };

        Axis.prototype._render = function () {
            if (this.orient() === "left") {
                this.axisElement.attr("transform", "translate(" + Axis.yWidth + ", 0)");
            }
            ;
            if (this.orient() === "top") {
                this.axisElement.attr("transform", "translate(0," + Axis.xHeight + ")");
            }
            ;
            var domain = this.d3Axis.scale().domain();
            var extent = Math.abs(domain[1] - domain[0]);
            var min = +d3.min(domain);
            var max = +d3.max(domain);
            var newDomain;
            var standardOrder = domain[0] < domain[1];
            if (typeof (domain[0]) === "number") {
                newDomain = standardOrder ? [min - extent, max + extent] : [max + extent, min - extent];
            } else {
                newDomain = standardOrder ? [new Date(min - extent), new Date(max + extent)] : [new Date(max + extent), new Date(min - extent)];
            }

            // hackhack Make tiny-zero representations not look terrible, by rounding them to 0
            if (this.axisScale.ticks != null) {
                var scale = this.axisScale;
                var nTicks = 10;
                var ticks = scale.ticks(nTicks);
                var numericDomain = scale.domain();
                var interval = numericDomain[1] - numericDomain[0];
                var cleanTick = function (n) {
                    return Math.abs(n / interval / nTicks) < 0.0001 ? 0 : n;
                };
                ticks = ticks.map(cleanTick);
                this.d3Axis.tickValues(ticks);
            }

            this.axisElement.call(this.d3Axis);

            this.axisElement.selectAll(".tick").select("text").style("visibility", "visible");

            return this;
        };

        Axis.prototype.showEndTickLabels = function (show) {
            if (show == null) {
                return this._showEndTickLabels;
            }
            this._showEndTickLabels = show;
            return this;
        };

        Axis.prototype._hideCutOffTickLabels = function () {
            var _this = this;
            var availableWidth = this.availableWidth;
            var availableHeight = this.availableHeight;
            var tickLabels = this.axisElement.selectAll(".tick").select("text");

            var boundingBox = this.element.select(".bounding-box")[0][0].getBoundingClientRect();

            var isInsideBBox = function (tickBox) {
                return (boundingBox.left <= tickBox.left && boundingBox.top <= tickBox.top && tickBox.right <= boundingBox.left + _this.availableWidth && tickBox.bottom <= boundingBox.top + _this.availableHeight);
            };

            tickLabels.each(function (d) {
                if (!isInsideBBox(this.getBoundingClientRect())) {
                    d3.select(this).style("visibility", "hidden");
                }
            });

            return this;
        };

        Axis.prototype._hideOverlappingTickLabels = function () {
            var tickLabels = this.axisElement.selectAll(".tick").select("text");
            var lastLabelClientRect;

            function boxesOverlap(boxA, boxB) {
                if (boxA.right < boxB.left) {
                    return false;
                }
                if (boxA.left > boxB.right) {
                    return false;
                }
                if (boxA.bottom < boxB.top) {
                    return false;
                }
                if (boxA.top > boxB.bottom) {
                    return false;
                }
                return true;
            }

            tickLabels.each(function (d) {
                var clientRect = this.getBoundingClientRect();
                if (lastLabelClientRect != null && boxesOverlap(clientRect, lastLabelClientRect)) {
                    d3.select(this).style("visibility", "hidden");
                } else {
                    lastLabelClientRect = clientRect;
                    d3.select(this).style("visibility", "visible");
                }
            });
        };

        Axis.prototype.rescale = function () {
            return (this.element != null) ? this._render() : null;
            // short circuit, we don't care about perf.
        };

        Axis.prototype.scale = function (newScale) {
            if (newScale == null) {
                return this.axisScale;
            } else {
                this.axisScale = newScale;
                this.d3Axis.scale(newScale._d3Scale);
                return this;
            }
        };

        Axis.prototype.tickLabelPosition = function (position) {
            if (position == null) {
                return this.tickPositioning;
            } else {
                this.tickPositioning = position;
                return this;
            }
        };

        Axis.prototype.orient = function (newOrient) {
            if (newOrient == null) {
                return this.d3Axis.orient();
            } else {
                this.d3Axis.orient(newOrient);
                return this;
            }
        };

        Axis.prototype.ticks = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (args == null || args.length === 0) {
                return this.d3Axis.ticks();
            } else {
                this.d3Axis.ticks(args);
                return this;
            }
        };

        Axis.prototype.tickValues = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            if (args == null) {
                return this.d3Axis.tickValues();
            } else {
                this.d3Axis.tickValues(args);
                return this;
            }
        };

        Axis.prototype.tickSize = function (inner, outer) {
            if (inner != null && outer != null) {
                this.d3Axis.tickSize(inner, outer);
                return this;
            } else if (inner != null) {
                this.d3Axis.tickSize(inner);
                return this;
            } else {
                return this.d3Axis.tickSize();
            }
        };

        Axis.prototype.innerTickSize = function (val) {
            if (val == null) {
                return this.d3Axis.innerTickSize();
            } else {
                this.d3Axis.innerTickSize(val);
                return this;
            }
        };

        Axis.prototype.outerTickSize = function (val) {
            if (val == null) {
                return this.d3Axis.outerTickSize();
            } else {
                this.d3Axis.outerTickSize(val);
                return this;
            }
        };

        Axis.prototype.tickPadding = function (val) {
            if (val == null) {
                return this.d3Axis.tickPadding();
            } else {
                this.d3Axis.tickPadding(val);
                return this;
            }
        };

        Axis.prototype.tickFormat = function (formatter) {
            if (formatter == null) {
                return this.d3Axis.tickFormat();
            } else {
                this.d3Axis.tickFormat(formatter);
                return this;
            }
        };
        Axis.yWidth = 50;
        Axis.xHeight = 30;
        return Axis;
    })(Plottable.Component);
    Plottable.Axis = Axis;

    var XAxis = (function (_super) {
        __extends(XAxis, _super);
        /**
        * Creates an XAxis (a horizontal Axis).
        *
        * @constructor
        * @param {Scale} scale The Scale to base the Axis on.
        * @param {string} orientation The orientation of the Axis (top/bottom)
        * @param {any} [formatter] a D3 formatter
        */
        function XAxis(scale, orientation, formatter) {
            if (typeof formatter === "undefined") { formatter = null; }
            var orientation = orientation.toLowerCase();
            if (orientation !== "top" && orientation !== "bottom") {
                throw new Error(orientation + " is not a valid orientation for XAxis");
            }
            _super.call(this, scale, orientation, formatter);
            _super.prototype.rowMinimum.call(this, Axis.xHeight);
            this._fixedWidth = false;
            this.tickLabelPosition("center");
        }
        XAxis.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.axisElement.classed("x-axis", true);
            return this;
        };

        XAxis.prototype.tickLabelPosition = function (position) {
            if (position == null) {
                return _super.prototype.tickLabelPosition.call(this);
            } else {
                var positionLC = position.toLowerCase();
                if (positionLC === "left" || positionLC === "center" || positionLC === "right") {
                    if (positionLC !== "center") {
                        this.tickSize(12); // longer than default tick size
                    }
                    return _super.prototype.tickLabelPosition.call(this, positionLC);
                } else {
                    throw new Error(position + " is not a valid tick label position for XAxis");
                }
            }
        };

        XAxis.prototype._render = function () {
            _super.prototype._render.call(this);
            if (this.tickLabelPosition() !== "center") {
                var tickTextLabels = this.axisElement.selectAll("text");
                tickTextLabels.attr("y", "0px");

                if (this.orient() === "bottom") {
                    tickTextLabels.attr("dy", "1em");
                } else {
                    tickTextLabels.attr("dy", "-0.25em");
                }

                if (this.tickLabelPosition() === "right") {
                    tickTextLabels.attr("dx", "0.2em").style("text-anchor", "start");
                } else if (this.tickLabelPosition() === "left") {
                    tickTextLabels.attr("dx", "-0.2em").style("text-anchor", "end");
                }
            }
            this._hideOverlappingTickLabels();
            if (!this.showEndTickLabels()) {
                this._hideCutOffTickLabels();
            }
            return this;
        };
        return XAxis;
    })(Axis);
    Plottable.XAxis = XAxis;

    var YAxis = (function (_super) {
        __extends(YAxis, _super);
        /**
        * Creates a YAxis (a vertical Axis).
        *
        * @constructor
        * @param {Scale} scale The Scale to base the Axis on.
        * @param {string} orientation The orientation of the Axis (left/right)
        * @param {any} [formatter] a D3 formatter
        */
        function YAxis(scale, orientation, formatter) {
            if (typeof formatter === "undefined") { formatter = null; }
            orientation = orientation.toLowerCase();
            if (orientation !== "left" && orientation !== "right") {
                throw new Error(orientation + " is not a valid orientation for YAxis");
            }
            _super.call(this, scale, orientation, formatter);
            _super.prototype.colMinimum.call(this, Axis.yWidth);
            this._fixedHeight = false;
            this.tickLabelPosition("middle");
        }
        YAxis.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.axisElement.classed("y-axis", true);
            return this;
        };

        YAxis.prototype.tickLabelPosition = function (position) {
            if (position == null) {
                return _super.prototype.tickLabelPosition.call(this);
            } else {
                var positionLC = position.toLowerCase();
                if (positionLC === "top" || positionLC === "middle" || positionLC === "bottom") {
                    if (positionLC !== "middle") {
                        this.tickSize(30); // longer than default tick size
                    }
                    return _super.prototype.tickLabelPosition.call(this, positionLC);
                } else {
                    throw new Error(position + " is not a valid tick label position for YAxis");
                }
            }
        };

        YAxis.prototype._render = function () {
            _super.prototype._render.call(this);
            if (this.tickLabelPosition() !== "middle") {
                var tickTextLabels = this.axisElement.selectAll("text");
                tickTextLabels.attr("x", "0px");

                if (this.orient() === "left") {
                    tickTextLabels.attr("dx", "-0.25em");
                } else {
                    tickTextLabels.attr("dx", "0.25em");
                }

                if (this.tickLabelPosition() === "top") {
                    tickTextLabels.attr("dy", "-0.3em");
                } else if (this.tickLabelPosition() === "bottom") {
                    tickTextLabels.attr("dy", "1em");
                }
            }
            this._hideOverlappingTickLabels();
            if (!this.showEndTickLabels()) {
                this._hideCutOffTickLabels();
            }
            return this;
        };
        return YAxis;
    })(Axis);
    Plottable.YAxis = YAxis;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var ComponentGroup = (function (_super) {
        __extends(ComponentGroup, _super);
        /**
        * Creates a ComponentGroup.
        *
        * @constructor
        * @param {Component[]} [components] The Components in the ComponentGroup.
        */
        function ComponentGroup(components) {
            if (typeof components === "undefined") { components = []; }
            _super.call(this);
            this.classed("component-group", true);
            this.components = components;
        }
        ComponentGroup.prototype._addComponentToGroup = function (c, prepend) {
            if (typeof prepend === "undefined") { prepend = false; }
            if (prepend) {
                this.components.unshift(c);
            } else {
                this.components.push(c);
            }
            if (this.element != null) {
                c._anchor(this.content.insert("g", "g"));
            }
            return this;
        };

        ComponentGroup.prototype.merge = function (c) {
            this._addComponentToGroup(c);
            return this;
        };

        ComponentGroup.prototype._anchor = function (element) {
            var _this = this;
            _super.prototype._anchor.call(this, element);
            this.components.forEach(function (c) {
                return c._anchor(_this.content.insert("g", "g"));
            });
            return this;
        };

        ComponentGroup.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
            var _this = this;
            _super.prototype._computeLayout.call(this, xOrigin, yOrigin, availableWidth, availableHeight);
            this.components.forEach(function (c) {
                c._computeLayout(0, 0, _this.availableWidth, _this.availableHeight);
            });
            return this;
        };

        ComponentGroup.prototype._render = function () {
            _super.prototype._render.call(this);
            this.components.forEach(function (c) {
                return c._render();
            });
            return this;
        };

        ComponentGroup.prototype.isFixedWidth = function () {
            return this.components.every(function (c) {
                return c.isFixedWidth();
            });
        };

        ComponentGroup.prototype.isFixedHeight = function () {
            return this.components.every(function (c) {
                return c.isFixedHeight();
            });
        };
        return ComponentGroup;
    })(Plottable.Component);
    Plottable.ComponentGroup = ComponentGroup;
})(Plottable || (Plottable = {}));
///<reference path="reference.ts" />
var Plottable;
(function (Plottable) {
    var Gridlines = (function (_super) {
        __extends(Gridlines, _super);
        /**
        * Creates a set of Gridlines.
        * @constructor
        *
        * @param {QuantitiveScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
        * @param {QuantitiveScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
        */
        function Gridlines(xScale, yScale) {
            var _this = this;
            _super.call(this);
            this.classed("gridlines", true);
            this.xScale = xScale;
            this.yScale = yScale;
            if (this.xScale != null) {
                this.xScale.registerListener(function () {
                    return _this.redrawXLines();
                });
            }
            if (this.yScale != null) {
                this.yScale.registerListener(function () {
                    return _this.redrawYLines();
                });
            }
        }
        Gridlines.prototype._anchor = function (element) {
            _super.prototype._anchor.call(this, element);
            this.xLinesContainer = this.content.append("g").classed("x-gridlines", true);
            this.yLinesContainer = this.content.append("g").classed("y-gridlines", true);
            return this;
        };

        Gridlines.prototype._render = function () {
            _super.prototype._render.call(this);
            this.redrawXLines();
            this.redrawYLines();
            return this;
        };

        Gridlines.prototype.redrawXLines = function () {
            var _this = this;
            if (this.xScale != null && this.element != null) {
                var xTicks = this.xScale.ticks();
                var getScaledXValue = function (tickVal) {
                    return _this.xScale.scale(tickVal);
                };
                var xLines = this.xLinesContainer.selectAll("line").data(xTicks);
                xLines.enter().append("line");
                xLines.attr("x1", getScaledXValue).attr("y1", 0).attr("x2", getScaledXValue).attr("y2", this.availableHeight);
                xLines.exit().remove();
            }
        };

        Gridlines.prototype.redrawYLines = function () {
            var _this = this;
            if (this.yScale != null && this.element != null) {
                var yTicks = this.yScale.ticks();
                var getScaledYValue = function (tickVal) {
                    return _this.yScale.scale(tickVal);
                };
                var yLines = this.yLinesContainer.selectAll("line").data(yTicks);
                yLines.enter().append("line");
                yLines.attr("x1", 0).attr("y1", getScaledYValue).attr("x2", this.availableWidth).attr("y2", getScaledYValue);
                yLines.exit().remove();
            }
        };
        return Gridlines;
    })(Plottable.Component);
    Plottable.Gridlines = Gridlines;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    ;
})(Plottable || (Plottable = {}));
