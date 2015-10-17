/*!
Plottable v0.2.1 (https://github.com/palantir/plottable)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

///<reference path="reference.ts" />
var Utils;
(function (Utils) {
    function inRange(x, a, b) {
        return (Math.min(a, b) <= x && x <= Math.max(a, b));
    }
    Utils.inRange = inRange;

    function getBBox(element) {
        return element.node().getBBox();
    }
    Utils.getBBox = getBBox;

    /** Truncates a text string to a max length, given the element in which to draw the text
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

    function getTextHeight(textElement) {
        var originalText = textElement.text();
        textElement.text("bqpdl");
        var height = Utils.getBBox(textElement).height;
        textElement.text(originalText);
        return height;
    }
    Utils.getTextHeight = getTextHeight;
})(Utils || (Utils = {}));
///<reference path="reference.ts" />
var Component = (function () {
    function Component() {
        this.registeredInteractions = [];
        this.boxes = [];
        this.clipPathEnabled = false;
        this.fixedWidthVal = true;
        this.fixedHeightVal = true;
        this.rowMinimumVal = 0;
        this.colMinimumVal = 0;
        this.xOffsetVal = 0;
        this.yOffsetVal = 0;
        this.xAlignProportion = 0;
        this.yAlignProportion = 0;
        this.cssClasses = ["component"];
    }
    /**
    * Attaches the Component to a DOM element. Usually only directly invoked on root-level Components.
    * @param {D3.Selection} element A D3 selection consisting of the element to anchor to.
    * @returns {Component} The calling component.
    */
    Component.prototype.anchor = function (element) {
        var _this = this;
        if (element.node().childNodes.length > 0) {
            throw new Error("Can't anchor to a non-empty element");
        }
        this.element = element;
        if (this.clipPathEnabled) {
            this.generateClipPath();
        }
        ;
        this.cssClasses.forEach(function (cssClass) {
            _this.element.classed(cssClass, true);
        });
        this.cssClasses = null;

        this.hitBox = this.addBox("hit-box");
        this.addBox("bounding-box");

        this.hitBox.style("fill", "#ffffff").style("opacity", 0); // We need to set these so Chrome will register events
        this.registeredInteractions.forEach(function (r) {
            return r.anchor(_this.hitBox);
        });
        return this;
    };

    /**
    * Computes the size, position, and alignment from the specified values.
    * If no parameters are supplied and the component is a root node,
    * they are inferred from the size of the component's element.
    * @param {number} xOrigin
    * @param {number} yOrigin
    * @param {number} availableWidth
    * @param {number} availableHeight
    * @returns {Component} The calling Component.
    */
    Component.prototype.computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
        var _this = this;
        if (xOrigin == null || yOrigin == null || availableWidth == null || availableHeight == null) {
            if (this.element == null) {
                throw new Error("anchor must be called before computeLayout");
            } else if (this.element.node().nodeName === "svg") {
                // we are the root node, let's guess width and height for convenience
                xOrigin = 0;
                yOrigin = 0;
                availableWidth = parseFloat(this.element.attr("width"));
                availableHeight = parseFloat(this.element.attr("height"));
            } else {
                throw new Error("null arguments cannot be passed to computeLayout() on a non-root (non-<svg>) node");
            }
        }
        this.xOrigin = xOrigin;
        this.yOrigin = yOrigin;
        var xPosition = this.xOrigin;
        var yPosition = this.yOrigin;

        if (this.colMinimum() !== 0 && this.isFixedWidth()) {
            // The component has free space, so it makes sense to think about how to position or offset it
            xPosition += (availableWidth - this.colMinimum()) * this.xAlignProportion;
            xPosition += this.xOffsetVal;

            // Decrease size so hitbox / bounding box and children are sized correctly
            availableWidth = availableWidth > this.colMinimum() ? this.colMinimum() : availableWidth;
        }

        if (this.rowMinimum() !== 0 && this.isFixedHeight()) {
            yPosition += (availableHeight - this.rowMinimum()) * this.yAlignProportion;
            yPosition += this.yOffsetVal;
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
    * @returns {Component} The calling Component.
    */
    Component.prototype.render = function () {
        return this;
    };

    Component.prototype.renderTo = function (element) {
        // When called on top-level-component, a shortcut for component.anchor(svg).computeLayout().render()
        if (this.element == null) {
            this.anchor(element);
        }
        ;
        if (this.element !== element) {
            throw new Error("Can't renderTo a different element than was anchored to");
        }
        this.computeLayout().render();
        return this;
    };

    /**
    * Sets the x alignment of the Component.
    * @param {string} alignment The x alignment of the Component (one of LEFT/CENTER/RIGHT).
    * @returns {Component} The calling Component.
    */
    Component.prototype.xAlign = function (alignment) {
        if (alignment === "LEFT") {
            this.xAlignProportion = 0;
        } else if (alignment === "CENTER") {
            this.xAlignProportion = 0.5;
        } else if (alignment === "RIGHT") {
            this.xAlignProportion = 1;
        } else {
            throw new Error("Unsupported alignment");
        }
        return this;
    };

    /**
    * Sets the y alignment of the Component.
    * @param {string} alignment The y alignment of the Component (one of TOP/CENTER/BOTTOM).
    * @returns {Component} The calling Component.
    */
    Component.prototype.yAlign = function (alignment) {
        if (alignment === "TOP") {
            this.yAlignProportion = 0;
        } else if (alignment === "CENTER") {
            this.yAlignProportion = 0.5;
        } else if (alignment === "BOTTOM") {
            this.yAlignProportion = 1;
        } else {
            throw new Error("Unsupported alignment");
        }
        return this;
    };

    /**
    * Sets the x offset of the Component.
    * @param {number} offset The desired x offset, in pixels.
    * @returns {Component} The calling Component.
    */
    Component.prototype.xOffset = function (offset) {
        this.xOffsetVal = offset;
        return this;
    };

    /**
    * Sets the y offset of the Component.
    * @param {number} offset The desired y offset, in pixels.
    * @returns {Component} The calling Component.
    */
    Component.prototype.yOffset = function (offset) {
        this.yOffsetVal = offset;
        return this;
    };

    Component.prototype.addBox = function (className, parentElement) {
        if (this.element == null) {
            throw new Error("Adding boxes before anchoring is currently disallowed");
        }
        var parentElement = parentElement == null ? this.element : parentElement;
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
        var clipPathParent = this.element.append("clipPath").attr("id", "clipPath" + clipPathId);
        this.addBox("clip-rect", clipPathParent);
    };

    /**
    * Attaches an Interaction to the Component, so that the Interaction will listen for events on the Component.
    * @param {Interaction} interaction The Interaction to attach to the Component.
    * @return {Component} The calling Component.
    */
    Component.prototype.registerInteraction = function (interaction) {
        // Interactions can be registered before or after anchoring. If registered before, they are
        // pushed to this.registeredInteractions and registered during anchoring. If after, they are
        // registered immediately
        this.registeredInteractions.push(interaction);
        if (this.element != null) {
            interaction.anchor(this.hitBox);
        }
        return this;
    };

    Component.prototype.classed = function (cssClass, addClass) {
        if (addClass == null) {
            if (this.element == null) {
                return (this.cssClasses.indexOf(cssClass) !== -1);
            } else {
                return this.element.classed(cssClass);
            }
        } else {
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
            this.rowMinimumVal = newVal;
            return this;
        } else {
            return this.rowMinimumVal;
        }
    };

    Component.prototype.colMinimum = function (newVal) {
        if (newVal != null) {
            this.colMinimumVal = newVal;
            return this;
        } else {
            return this.colMinimumVal;
        }
    };

    /**
    * Checks if the Component has a fixed width or scales to fill available space.
    * Returns true by default on the base Component class.
    * @return {boolean} Whether the component has a fixed width.
    */
    Component.prototype.isFixedWidth = function () {
        return this.fixedWidthVal;
    };

    /**
    * Checks if the Component has a fixed height or scales to fill available space.
    * Returns true by default on the base Component class.
    * @return {boolean} Whether the component has a fixed height.
    */
    Component.prototype.isFixedHeight = function () {
        return this.fixedHeightVal;
    };
    Component.clipPathId = 0;
    return Component;
})();
///<reference path="reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Scale = (function () {
    /**
    * Creates a new Scale.
    * @constructor
    * @param {D3.Scale.Scale} scale The D3 scale backing the Scale.
    */
    function Scale(scale) {
        this.broadcasterCallbacks = [];
        this.scale = scale;
    }
    Scale.prototype.domain = function (values) {
        var _this = this;
        if (values == null) {
            return this.scale.domain();
        } else {
            this.scale.domain(values);
            this.broadcasterCallbacks.forEach(function (b) {
                return b(_this);
            });
            return this;
        }
    };

    Scale.prototype.range = function (values) {
        if (values == null) {
            return this.scale.range();
        } else {
            this.scale.range(values);
            return this;
        }
    };

    /**
    * Creates a copy of the Scale with the same domain and range but without any registered listeners.
    * @returns {Scale} A copy of the calling Scale.
    */
    Scale.prototype.copy = function () {
        return new Scale(this.scale.copy());
    };

    /**
    * Registers a callback to be called when the scale's domain is changed.
    * @param {IBroadcasterCallback} callback A callback to be called when the Scale's domain changes.
    * @returns {Scale} The Calling Scale.
    */
    Scale.prototype.registerListener = function (callback) {
        this.broadcasterCallbacks.push(callback);
        return this;
    };
    return Scale;
})();

var QuantitiveScale = (function (_super) {
    __extends(QuantitiveScale, _super);
    /**
    * Creates a new QuantitiveScale.
    * @constructor
    * @param {D3.Scale.QuantitiveScale} scale The D3 QuantitiveScale backing the QuantitiveScale.
    */
    function QuantitiveScale(scale) {
        _super.call(this, scale);
    }
    /**
    * Retrieves the domain value corresponding to a supplied range value.
    * @param {number} value: A value from the Scale's range.
    * @returns {number} The domain value corresponding to the supplied range value.
    */
    QuantitiveScale.prototype.invert = function (value) {
        return this.scale.invert(value);
    };

    /**
    * Generates tick values.
    * @param {number} count The number of ticks to generate.
    * @returns {any[]} The generated ticks.
    */
    QuantitiveScale.prototype.ticks = function (count) {
        return this.scale.ticks(count);
    };

    /**
    * Creates a copy of the QuantitiveScale with the same domain and range but without any registered listeners.
    * @returns {QuantitiveScale} A copy of the calling QuantitiveScale.
    */
    QuantitiveScale.prototype.copy = function () {
        return new QuantitiveScale(this.scale.copy());
    };

    /**
    * Expands the QuantitiveScale's domain to cover the new region.
    * @param {number} newDomain The additional domain to be covered by the QuantitiveScale.
    * @returns {QuantitiveScale} The scale.
    */
    QuantitiveScale.prototype.widenDomain = function (newDomain) {
        var currentDomain = this.domain();
        var wideDomain = [Math.min(newDomain[0], currentDomain[0]), Math.max(newDomain[1], currentDomain[1])];
        this.domain(wideDomain);
        return this;
    };
    return QuantitiveScale;
})(Scale);

var LinearScale = (function (_super) {
    __extends(LinearScale, _super);
    function LinearScale(scale) {
        _super.call(this, scale == null ? d3.scale.linear() : scale);
        this.domain([Infinity, -Infinity]);
    }
    /**
    * Creates a copy of the LinearScale with the same domain and range but without any registered listeners.
    * @returns {LinearScale} A copy of the calling LinearScale.
    */
    LinearScale.prototype.copy = function () {
        return new LinearScale(this.scale.copy());
    };
    return LinearScale;
})(QuantitiveScale);

var ColorScale = (function (_super) {
    __extends(ColorScale, _super);
    /**
    * Creates a ColorScale.
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
            default:
                throw new Error("Unsupported ColorScale type");
        }
        _super.call(this, scale);
    }
    return ColorScale;
})(Scale);
///<reference path="reference.ts" />
var Interaction = (function () {
    function Interaction(componentToListenTo) {
        this.componentToListenTo = componentToListenTo;
    }
    Interaction.prototype.anchor = function (hitBox) {
        this.hitBox = hitBox;
    };

    Interaction.prototype.registerWithComponent = function () {
        this.componentToListenTo.registerInteraction(this);
        // It would be nice to have a call to this in the Interaction constructor, but
        // can't do this right now because that depends on listenToHitBox being callable, which depends on the subclass
        // constructor finishing first.
    };
    return Interaction;
})();

var PanZoomInteraction = (function (_super) {
    __extends(PanZoomInteraction, _super);
    function PanZoomInteraction(componentToListenTo, renderers, xScale, yScale) {
        var _this = this;
        _super.call(this, componentToListenTo);
        this.xScale = xScale;
        this.yScale = yScale;
        this.zoom = d3.behavior.zoom();
        this.zoom.x(this.xScale.scale);
        this.zoom.y(this.yScale.scale);
        this.zoom.on("zoom", function () {
            return _this.rerenderZoomed();
        });

        this.registerWithComponent();
    }
    PanZoomInteraction.prototype.anchor = function (hitBox) {
        _super.prototype.anchor.call(this, hitBox);
        this.zoom(hitBox);
    };

    PanZoomInteraction.prototype.rerenderZoomed = function () {
        // HACKHACK since the d3.zoom.x modifies d3 scales and not our TS scales, and the TS scales have the
        // event listener machinery, let's grab the domain out of the d3 scale and pipe it back into the TS scale
        var xDomain = this.xScale.scale.domain();
        var yDomain = this.yScale.scale.domain();
        this.xScale.domain(xDomain);
        this.yScale.domain(yDomain);
    };
    return PanZoomInteraction;
})(Interaction);

var AreaInteraction = (function (_super) {
    __extends(AreaInteraction, _super);
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
        this.registerWithComponent();
    }
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
        if (!this.dragInitialized)
            return;

        this.dragInitialized = false;
        if (this.callbackToCall == null)
            return;
        var xMin = Math.min(this.origin[0], this.location[0]);
        var xMax = Math.max(this.origin[0], this.location[0]);
        var yMin = Math.min(this.origin[1], this.location[1]);
        var yMax = Math.max(this.origin[1], this.location[1]);
        var pixelArea = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
        this.callbackToCall(pixelArea);
    };

    AreaInteraction.prototype.clearBox = function () {
        this.dragBox.attr("height", 0).attr("width", 0);
        return this;
    };

    AreaInteraction.prototype.anchor = function (hitBox) {
        _super.prototype.anchor.call(this, hitBox);
        var cname = AreaInteraction.CLASS_DRAG_BOX;
        var element = this.componentToListenTo.element;
        this.dragBox = element.append("rect").classed(cname, true).attr("x", 0).attr("y", 0);
        hitBox.call(this.dragBehavior);
        return this;
    };
    AreaInteraction.CLASS_DRAG_BOX = "drag-box";
    return AreaInteraction;
})(Interaction);

var ZoomCallbackGenerator = (function () {
    function ZoomCallbackGenerator() {
        this.xScaleMappings = [];
        this.yScaleMappings = [];
    }
    ZoomCallbackGenerator.prototype.addXScale = function (listenerScale, targetScale) {
        if (targetScale == null) {
            targetScale = listenerScale;
        }
        this.xScaleMappings.push([listenerScale, targetScale]);
        return this;
    };

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
///<reference path="reference.ts" />
var Label = (function (_super) {
    __extends(Label, _super);
    /**
    * Creates a Label.
    * @constructor
    * @param {string} [text] The text of the Label.
    * @param {string} [orientation] The orientation of the Label (horizontal/vertical-left/vertical-right).
    */
    function Label(text, orientation) {
        if (typeof text === "undefined") { text = ""; }
        if (typeof orientation === "undefined") { orientation = "horizontal"; }
        _super.call(this);
        this.classed(Label.CSS_CLASS, true);
        this.setText(text);
        if (orientation === "horizontal" || orientation === "vertical-left" || orientation === "vertical-right") {
            this.orientation = orientation;
            if (orientation === "horizontal") {
                this.fixedWidthVal = false;
            } else {
                this.fixedHeightVal = false;
            }
        } else {
            throw new Error(orientation + " is not a valid orientation for LabelComponent");
        }
        this.xAlign("CENTER").yAlign("CENTER"); // the defaults
    }
    Label.prototype.anchor = function (element) {
        _super.prototype.anchor.call(this, element);
        this.textElement = this.element.append("text");
        this.setText(this.text);
        return this;
    };

    /**
    * Sets the text on the Label.
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
        var bbox = Utils.getBBox(this.textElement);
        this.textHeight = bbox.height;
        this.textLength = bbox.width;
        if (this.orientation === "horizontal") {
            this.rowMinimum(this.textHeight);
        } else {
            this.colMinimum(this.textHeight);
        }
    };

    Label.prototype.truncateTextAndRemeasure = function (availableLength) {
        var shortText = Utils.truncateTextToLength(this.text, availableLength, this.textElement);
        this.textElement.text(shortText);
        this.measureAndSetTextSize();
    };

    Label.prototype.computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);

        this.textElement.attr("dy", 0); // Reset this so we maintain idempotence
        var bbox = Utils.getBBox(this.textElement);
        this.textElement.attr("dy", -bbox.y);

        var xShift = 0;
        var yShift = 0;

        if (this.orientation === "horizontal") {
            this.truncateTextAndRemeasure(this.availableWidth);
            xShift = (this.availableWidth - this.textLength) * this.xAlignProportion;
        } else {
            this.truncateTextAndRemeasure(this.availableHeight);
            xShift = (this.availableHeight - this.textLength) * this.yAlignProportion;

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
    Label.CSS_CLASS = "label";
    return Label;
})(Component);

var TitleLabel = (function (_super) {
    __extends(TitleLabel, _super);
    function TitleLabel(text, orientation) {
        _super.call(this, text, orientation);
        this.classed(TitleLabel.CSS_CLASS, true);
    }
    TitleLabel.CSS_CLASS = "title-label";
    return TitleLabel;
})(Label);

var AxisLabel = (function (_super) {
    __extends(AxisLabel, _super);
    function AxisLabel(text, orientation) {
        _super.call(this, text, orientation);
        this.classed(AxisLabel.CSS_CLASS, true);
    }
    AxisLabel.CSS_CLASS = "axis-label";
    return AxisLabel;
})(Label);
///<reference path="reference.ts" />
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    /**
    * Creates a Renderer.
    * @constructor
    * @param {IDataset} [dataset] The dataset associated with the Renderer.
    */
    function Renderer(dataset) {
        if (typeof dataset === "undefined") { dataset = { seriesName: "", data: [] }; }
        _super.call(this);
        this.clipPathEnabled = true;
        this.fixedWidthVal = false;
        this.fixedHeightVal = false;

        this.dataset = dataset;
        this.classed(Renderer.CSS_CLASS, true);
    }
    /**
    * Sets a new dataset on the Renderer.
    * @param {IDataset} dataset The new dataset to be associated with the Renderer.
    * @returns {Renderer} The calling Renderer.
    */
    Renderer.prototype.data = function (dataset) {
        this.renderArea.classed(this.dataset.seriesName, false);
        this.dataset = dataset;
        this.renderArea.classed(dataset.seriesName, true);
        return this;
    };

    Renderer.prototype.anchor = function (element) {
        _super.prototype.anchor.call(this, element);
        this.renderArea = element.append("g").classed("render-area", true).classed(this.dataset.seriesName, true);
        return this;
    };
    Renderer.CSS_CLASS = "renderer";
    return Renderer;
})(Component);

;

var XYRenderer = (function (_super) {
    __extends(XYRenderer, _super);
    /**
    * Creates an XYRenderer.
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
        this.classed(XYRenderer.CSS_CLASS);

        this.xAccessor = (xAccessor != null) ? xAccessor : XYRenderer.defaultXAccessor;
        this.yAccessor = (yAccessor != null) ? yAccessor : XYRenderer.defaultYAccessor;

        this.xScale = xScale;
        this.yScale = yScale;

        var data = dataset.data;

        var xDomain = d3.extent(data, this.xAccessor);
        this.xScale.widenDomain(xDomain);
        var yDomain = d3.extent(data, this.yAccessor);
        this.yScale.widenDomain(yDomain);

        this.xScale.registerListener(function () {
            return _this.rescale();
        });
        this.yScale.registerListener(function () {
            return _this.rescale();
        });
    }
    XYRenderer.prototype.computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
        this.xScale.range([0, this.availableWidth]);
        this.yScale.range([this.availableHeight, 0]);
        return this;
    };

    /**
    * Converts a SelectionArea with pixel ranges to one with data ranges.
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

    /**
    * Gets the data in a selected area.
    * @param {SelectionArea} dataArea The selected area.
    * @returns {D3.UpdateSelection} The data in the selected area.
    */
    XYRenderer.prototype.getSelectionFromArea = function (dataArea) {
        var _this = this;
        var filterFunction = function (d) {
            var x = _this.xAccessor(d);
            var y = _this.yAccessor(d);
            return Utils.inRange(x, dataArea.xMin, dataArea.xMax) && Utils.inRange(y, dataArea.yMin, dataArea.yMax);
        };
        return this.dataSelection.filter(filterFunction);
    };

    /**
    * Gets the indices of data in a selected area
    * @param {SelectionArea} dataArea The selected area.
    * @returns {number[]} An array of the indices of datapoints in the selected area.
    */
    XYRenderer.prototype.getDataIndicesFromArea = function (dataArea) {
        var _this = this;
        var filterFunction = function (d) {
            var x = _this.xAccessor(d);
            var y = _this.yAccessor(d);
            return Utils.inRange(x, dataArea.xMin, dataArea.xMax) && Utils.inRange(y, dataArea.yMin, dataArea.yMax);
        };
        var results = [];
        this.dataset.data.forEach(function (d, i) {
            if (filterFunction(d)) {
                results.push(i);
            }
        });
        return results;
    };

    XYRenderer.prototype.rescale = function () {
        if (this.element != null) {
            this.render();
        }
    };
    XYRenderer.CSS_CLASS = "xy-renderer";

    XYRenderer.defaultXAccessor = function (d) {
        return d.x;
    };
    XYRenderer.defaultYAccessor = function (d) {
        return d.y;
    };
    return XYRenderer;
})(Renderer);

var LineRenderer = (function (_super) {
    __extends(LineRenderer, _super);
    /**
    * Creates a LineRenderer.
    * @constructor
    * @param {IDataset} dataset The dataset to render.
    * @param {QuantitiveScale} xScale The x scale to use.
    * @param {QuantitiveScale} yScale The y scale to use.
    * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
    * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
    */
    function LineRenderer(dataset, xScale, yScale, xAccessor, yAccessor) {
        _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
        this.classed(LineRenderer.CSS_CLASS, true);
    }
    LineRenderer.prototype.anchor = function (element) {
        _super.prototype.anchor.call(this, element);
        this.path = this.renderArea.append("path");
        return this;
    };

    LineRenderer.prototype.render = function () {
        var _this = this;
        _super.prototype.render.call(this);
        this.line = d3.svg.line().x(function (datum) {
            return _this.xScale.scale(_this.xAccessor(datum));
        }).y(function (datum) {
            return _this.yScale.scale(_this.yAccessor(datum));
        });
        this.dataSelection = this.path.classed("line", true).classed(this.dataset.seriesName, true).datum(this.dataset.data);
        this.path.attr("d", this.line);
        return this;
    };
    LineRenderer.CSS_CLASS = "line-renderer";
    return LineRenderer;
})(XYRenderer);

var CircleRenderer = (function (_super) {
    __extends(CircleRenderer, _super);
    /**
    * Creates a CircleRenderer.
    * @constructor
    * @param {IDataset} dataset The dataset to render.
    * @param {QuantitiveScale} xScale The x scale to use.
    * @param {QuantitiveScale} yScale The y scale to use.
    * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
    * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
    * @param {number} [size] The radius of the circles, in pixels.
    */
    function CircleRenderer(dataset, xScale, yScale, xAccessor, yAccessor, size) {
        if (typeof size === "undefined") { size = 3; }
        _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
        this.classed(CircleRenderer.CSS_CLASS, true);
        this.size = size;
    }
    CircleRenderer.prototype.render = function () {
        var _this = this;
        _super.prototype.render.call(this);
        this.dataSelection = this.renderArea.selectAll("circle").data(this.dataset.data);
        this.dataSelection.enter().append("circle");
        this.dataSelection.attr("cx", function (datum) {
            return _this.xScale.scale(_this.xAccessor(datum));
        }).attr("cy", function (datum) {
            return _this.yScale.scale(_this.yAccessor(datum));
        }).attr("r", this.size);
        this.dataSelection.exit().remove();
        return this;
    };
    CircleRenderer.CSS_CLASS = "circle-renderer";
    return CircleRenderer;
})(XYRenderer);

var BarRenderer = (function (_super) {
    __extends(BarRenderer, _super);
    /**
    * Creates a BarRenderer.
    * @constructor
    * @param {IDataset} dataset The dataset to render.
    * @param {QuantitiveScale} xScale The x scale to use.
    * @param {QuantitiveScale} yScale The y scale to use.
    * @param {IAccessor} [xAccessor] A function for extracting the start position of each bar from the data.
    * @param {IAccessor} [x2Accessor] A function for extracting the end position of each bar from the data.
    * @param {IAccessor} [yAccessor] A function for extracting height of each bar from the data.
    */
    function BarRenderer(dataset, xScale, yScale, xAccessor, x2Accessor, yAccessor) {
        _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
        this.barPaddingPx = 1;
        this.classed(BarRenderer.CSS_CLASS, true);

        var yDomain = this.yScale.domain();
        if (!Utils.inRange(0, yDomain[0], yDomain[1])) {
            var newMin = 0;
            var newMax = yDomain[1];
            this.yScale.widenDomain([newMin, newMax]); // TODO: make this handle reversed scales
        }

        this.x2Accessor = (x2Accessor != null) ? x2Accessor : BarRenderer.defaultX2Accessor;

        var x2Extent = d3.extent(dataset.data, this.x2Accessor);
        this.xScale.widenDomain(x2Extent);
    }
    BarRenderer.prototype.render = function () {
        var _this = this;
        _super.prototype.render.call(this);
        var yRange = this.yScale.range();
        var maxScaledY = Math.max(yRange[0], yRange[1]);

        this.dataSelection = this.renderArea.selectAll("rect").data(this.dataset.data);
        this.dataSelection.enter().append("rect");
        this.dataSelection.attr("x", function (d) {
            return _this.xScale.scale(_this.xAccessor(d)) + _this.barPaddingPx;
        }).attr("y", function (d) {
            return _this.yScale.scale(_this.yAccessor(d));
        }).attr("width", function (d) {
            return (_this.xScale.scale(_this.x2Accessor(d)) - _this.xScale.scale(_this.xAccessor(d)) - 2 * _this.barPaddingPx);
        }).attr("height", function (d) {
            return maxScaledY - _this.yScale.scale(_this.yAccessor(d));
        });
        this.dataSelection.exit().remove();
        return this;
    };
    BarRenderer.CSS_CLASS = "bar-renderer";
    BarRenderer.defaultX2Accessor = function (d) {
        return d.x2;
    };
    return BarRenderer;
})(XYRenderer);
///<reference path="reference.ts" />
var Table = (function (_super) {
    __extends(Table, _super);
    /**
    * Creates a Table.
    * @constructor
    * @param {Component[][]} [rows] A 2-D array of the Components to place in the table.
    * null can be used if a cell is empty.
    */
    function Table(rows) {
        if (typeof rows === "undefined") { rows = []; }
        _super.call(this);
        this.rowPadding = 0;
        this.colPadding = 0;
        this.classed(Table.CSS_CLASS, true);
        var cleanOutNulls = function (c) {
            return c == null ? new Component() : c;
        };
        rows = rows.map(function (row) {
            return row.map(cleanOutNulls);
        });
        this.rows = rows;
        this.rowWeights = this.rows.map(function () {
            return null;
        });
        this.colWeights = d3.transpose(this.rows).map(function () {
            return null;
        });
    }
    /**
    * Adds a Component in the specified cell.
    * @param {number} row The row in which to add the Component.
    * @param {number} col The column in which to add the Component.
    * @param {Component} component The Component to be added.
    */
    Table.prototype.addComponent = function (row, col, component) {
        if (this.element != null) {
            throw new Error("addComponent cannot be called after anchoring (for the moment)");
        }

        this.padTableToSize(row + 1, col + 1);

        var currentComponent = this.rows[row][col];
        if (currentComponent.constructor.name !== "Component") {
            throw new Error("addComponent cannot be called on a cell where a component already exists (for the moment)");
        }

        this.rows[row][col] = component;
        return this;
    };

    Table.prototype.padTableToSize = function (nRows, nCols) {
        for (var i = 0; i < nRows; i++) {
            if (this.rows[i] === undefined) {
                this.rows[i] = [];
                this.rowWeights[i] = null;
            }
            for (var j = 0; j < nCols; j++) {
                if (this.rows[i][j] === undefined) {
                    this.rows[i][j] = new Component();
                }
            }
        }
        for (j = 0; j < nCols; j++) {
            if (this.colWeights[j] === undefined) {
                this.colWeights[j] = null;
            }
        }
    };

    Table.prototype.anchor = function (element) {
        var _this = this;
        _super.prototype.anchor.call(this, element);

        // recursively anchor children
        this.rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                component.anchor(_this.element.append("g"));
            });
        });
        return this;
    };

    Table.prototype.computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
        var _this = this;
        _super.prototype.computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);

        // calculate the amount of free space by recursive col-/row- Minimum() calls
        var freeWidth = this.availableWidth - this.colMinimum();
        var freeHeight = this.availableHeight - this.rowMinimum();
        if (freeWidth < 0 || freeHeight < 0) {
            throw new Error("Insufficient Space");
        }

        var cols = d3.transpose(this.rows);
        var rowWeights = Table.calcComponentWeights(this.rowWeights, this.rows, function (c) {
            return c.isFixedHeight();
        });
        var colWeights = Table.calcComponentWeights(this.colWeights, cols, function (c) {
            return c.isFixedWidth();
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
                component.computeLayout(childXOffset, childYOffset, colWidths[colIndex], rowHeights[rowIndex]);
                childXOffset += colWidths[colIndex] + _this.colPadding;
            });
            childYOffset += rowHeights[rowIndex] + _this.rowPadding;
        });
        return this;
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

    Table.prototype.render = function () {
        // recursively render children
        this.rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                component.render();
            });
        });
        return this;
    };

    /**
    * Sets the row and column padding on the Table.
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
                    return r.rowMinimum();
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
                return d3.max(col, function (r) {
                    return r.colMinimum();
                });
            });
            return d3.sum(this.colMinimums) + this.colPadding * (cols.length - 1);
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

    Table.prototype.isFixedWidth = function () {
        var cols = d3.transpose(this.rows);
        return Table.fixedSpace(cols, function (c) {
            return c.isFixedWidth();
        });
    };

    Table.prototype.isFixedHeight = function () {
        return Table.fixedSpace(this.rows, function (c) {
            return c.isFixedHeight();
        });
    };
    Table.CSS_CLASS = "table";
    return Table;
})(Component);
///<reference path="reference.ts" />
var ScaleDomainCoordinator = (function () {
    function ScaleDomainCoordinator(scales) {
        var _this = this;
        this.scales = scales;
        /* This class is responsible for maintaining coordination between linked scales.
        It registers event listeners for when one of its scales changes its domain. When the scale
        does change its domain, it re-propogates the change to every linked scale.
        */
        this.rescaleInProgress = false;
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
///<reference path="reference.ts" />
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend(colorScale) {
        _super.call(this);
        this.classed(Legend.CSS_CLASS, true);
        this.colMinimum(120); // the default width
        this.colorScale = colorScale;
        this.xAlign("RIGHT").yAlign("TOP");
        this.xOffset(5).yOffset(5);
    }
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
        var fakeLegendEl = this.element.append("g").classed(Legend.SUBELEMENT_CLASS, true);
        var textHeight = Utils.getTextHeight(fakeLegendEl.append("text"));
        fakeLegendEl.remove();
        return textHeight;
    };

    Legend.prototype.render = function () {
        _super.prototype.render.call(this);
        var domain = this.colorScale.domain();
        var textHeight = this.measureTextHeight();
        var availableWidth = this.colMinimum() - textHeight - Legend.MARGIN;

        this.element.selectAll("." + Legend.SUBELEMENT_CLASS).remove(); // hackhack to ensure it always rerenders properly
        var legend = this.element.selectAll("." + Legend.SUBELEMENT_CLASS).data(domain);
        var legendEnter = legend.enter().append("g").classed(Legend.SUBELEMENT_CLASS, true).attr("transform", function (d, i) {
            return "translate(0," + i * textHeight + ")";
        });
        legendEnter.append("rect").attr("x", Legend.MARGIN).attr("y", Legend.MARGIN).attr("width", textHeight - Legend.MARGIN * 2).attr("height", textHeight - Legend.MARGIN * 2);
        legendEnter.append("text").attr("x", textHeight).attr("y", Legend.MARGIN + textHeight / 2);
        legend.selectAll("rect").attr("fill", this.colorScale.scale);
        legend.selectAll("text").text(function (d, i) {
            return Utils.truncateTextToLength(d, availableWidth, d3.select(this));
        });
        return this;
    };
    Legend.CSS_CLASS = "legend";
    Legend.SUBELEMENT_CLASS = "legend-row";
    Legend.MARGIN = 5;
    return Legend;
})(Component);
///<reference path="reference.ts" />
var Axis = (function (_super) {
    __extends(Axis, _super);
    /**
    * Creates an Axis.
    * @constructor
    * @param {Scale} scale The Scale to base the Axis on.
    * @param {string} orientation The orientation of the Axis (top/bottom/left/right)
    * @param {any} [formatter] a D3 formatter
    */
    function Axis(scale, orientation, formatter) {
        var _this = this;
        _super.call(this);
        this.scale = scale;
        this.classed(Axis.CSS_CLASS, true);
        this.clipPathEnabled = true;
        this.orientation = orientation;
        this.isXAligned = this.orientation === "bottom" || this.orientation === "top";
        this.d3axis = d3.svg.axis().scale(this.scale.scale).orient(this.orientation);
        if (formatter == null) {
            this.formatter = d3.format(".3s");
        } else {
            this.formatter = formatter;
        }
        this.d3axis.tickFormat(this.formatter);

        this.cachedScale = 1;
        this.cachedTranslate = 0;
        this.scale.registerListener(function () {
            return _this.rescale();
        });
    }
    Axis.axisXTransform = function (selection, x) {
        selection.attr("transform", function (d) {
            return "translate(" + x(d) + ",0)";
        });
    };

    Axis.axisYTransform = function (selection, y) {
        selection.attr("transform", function (d) {
            return "translate(0," + y(d) + ")";
        });
    };

    Axis.prototype.anchor = function (element) {
        _super.prototype.anchor.call(this, element);
        this.axisElement = this.element.append("g").classed("axis", true); // TODO: remove extraneous sub-element
        return this;
    };

    Axis.prototype.transformString = function (translate, scale) {
        var translateS = this.isXAligned ? "" + translate : "0," + translate;
        return "translate(" + translateS + ")";
    };

    Axis.prototype.render = function () {
        if (this.orientation === "left") {
            this.axisElement.attr("transform", "translate(" + Axis.yWidth + ", 0)");
        }
        ;
        if (this.orientation === "top") {
            this.axisElement.attr("transform", "translate(0," + Axis.xHeight + ")");
        }
        ;
        var domain = this.scale.domain();
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
        if (this.scale.ticks != null) {
            var scale = this.scale;
            var nTicks = 10;
            var ticks = scale.ticks(nTicks);
            var numericDomain = scale.domain();
            var interval = numericDomain[1] - numericDomain[0];
            var cleanTick = function (n) {
                return Math.abs(n / interval / nTicks) < 0.0001 ? 0 : n;
            };
            ticks = ticks.map(cleanTick);
            this.d3axis.tickValues(ticks);
        }

        this.axisElement.call(this.d3axis);
        var bbox = this.axisElement.node().getBBox();
        if (bbox.height > this.availableHeight || bbox.width > this.availableWidth) {
            this.axisElement.classed("error", true);
        }
        return this;
    };

    Axis.prototype.rescale = function () {
        return (this.element != null) ? this.render() : null;
        // short circuit, we don't care about perf.
    };
    Axis.CSS_CLASS = "axis";

    Axis.yWidth = 50;
    Axis.xHeight = 30;
    return Axis;
})(Component);

var XAxis = (function (_super) {
    __extends(XAxis, _super);
    /**
    * Creates an XAxis (a horizontal Axis).
    * @constructor
    * @param {Scale} scale The Scale to base the Axis on.
    * @param {string} orientation The orientation of the Axis (top/bottom/left/right)
    * @param {any} [formatter] a D3 formatter
    */
    function XAxis(scale, orientation, formatter) {
        if (typeof formatter === "undefined") { formatter = null; }
        _super.call(this, scale, orientation, formatter);
        _super.prototype.rowMinimum.call(this, Axis.xHeight);
        this.fixedWidthVal = false;
    }
    return XAxis;
})(Axis);

var YAxis = (function (_super) {
    __extends(YAxis, _super);
    /**
    * Creates a YAxis (a vertical Axis).
    * @constructor
    * @param {Scale} scale The Scale to base the Axis on.
    * @param {string} orientation The orientation of the Axis (top/bottom/left/right)
    * @param {any} [formatter] a D3 formatter
    */
    function YAxis(scale, orientation, formatter) {
        if (typeof formatter === "undefined") { formatter = null; }
        _super.call(this, scale, orientation, formatter);
        _super.prototype.colMinimum.call(this, Axis.yWidth);
        this.fixedHeightVal = false;
    }
    return YAxis;
})(Axis);
///<reference path="reference.ts" />
var ComponentGroup = (function (_super) {
    __extends(ComponentGroup, _super);
    function ComponentGroup(components) {
        if (typeof components === "undefined") { components = []; }
        _super.call(this);
        this.components = components;
    }
    ComponentGroup.prototype.addComponent = function (c) {
        this.components.push(c);
        if (this.element != null) {
            c.anchor(this.element.append("g"));
        }
        return this;
    };

    ComponentGroup.prototype.anchor = function (element) {
        var _this = this;
        _super.prototype.anchor.call(this, element);
        this.components.forEach(function (c) {
            return c.anchor(_this.element.append("g"));
        });
        return this;
    };

    ComponentGroup.prototype.computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
        var _this = this;
        _super.prototype.computeLayout.call(this, xOrigin, yOrigin, availableWidth, availableHeight);
        this.components.forEach(function (c) {
            c.computeLayout(_this.xOrigin, _this.yOrigin, _this.availableWidth, _this.availableHeight);
        });
        return this;
    };

    ComponentGroup.prototype.render = function () {
        _super.prototype.render.call(this);
        this.components.forEach(function (c) {
            return c.render();
        });
        return this;
    };

    ComponentGroup.prototype.isFixedWidth = function () {
        var widthFixities = this.components.map(function (c) {
            return c.isFixedWidth();
        });
        return widthFixities.reduce(function (a, b) {
            return a && b;
        });
    };

    ComponentGroup.prototype.isFixedHeight = function () {
        var heightFixities = this.components.map(function (c) {
            return c.isFixedHeight();
        });
        return heightFixities.reduce(function (a, b) {
            return a && b;
        });
    };
    return ComponentGroup;
})(Component);
//# sourceMappingURL=plottable.js.map
