/*!
Plottable v0.2.0 (https://github.com/palantir/plottable)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

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
var Component = (function () {
    function Component() {
        this.registeredInteractions = [];
        this.boxes = [];
        this.clipPathEnabled = false;
        this.rowWeightVal = 0;
        this.colWeightVal = 0;
        this.rowMinimumVal = 0;
        this.colMinimumVal = 0;
        this.xOffsetVal = 0;
        this.yOffsetVal = 0;
        this.xAlignProportion = 0;
        this.yAlignProportion = 0;
        this.cssClasses = ["component"];
    }
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

        this.hitBox.style("fill", "#ffffff").style("opacity", 0);
        this.registeredInteractions.forEach(function (r) {
            return r.anchor(_this.hitBox);
        });
        return this;
    };

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

    Component.prototype.xOffset = function (offset) {
        this.xOffsetVal = offset;
        return this;
    };

    Component.prototype.yOffset = function (offset) {
        this.yOffsetVal = offset;
        return this;
    };

    Component.prototype.computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
        var _this = this;
        if (xOrigin == null || yOrigin == null || availableWidth == null || availableHeight == null) {
            if (this.element == null) {
                throw new Error("anchor must be called before computeLayout");
            } else if (this.element.node().nodeName === "svg") {
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

        if (this.colWeight() === 0 && this.colMinimum() !== 0) {
            xPosition += (availableWidth - this.colMinimum()) * this.xAlignProportion;
            xPosition += this.xOffsetVal;

            availableWidth = availableWidth > this.colMinimum() ? this.colMinimum() : availableWidth;
        }

        if (this.rowWeight() === 0 && this.rowMinimum() !== 0) {
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

    Component.prototype.render = function () {
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
        var clipPathId = Component.clipPathId++;
        this.element.attr("clip-path", "url(#clipPath" + clipPathId + ")");
        var clipPathParent = this.element.append("clipPath").attr("id", "clipPath" + clipPathId);
        this.addBox("clip-rect", clipPathParent);
    };

    Component.prototype.registerInteraction = function (interaction) {
        this.registeredInteractions.push(interaction);
        if (this.element != null) {
            interaction.anchor(this.hitBox);
        }
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

    Component.prototype.rowWeight = function (newVal) {
        if (newVal != null) {
            this.rowWeightVal = newVal;
            return this;
        } else {
            return this.rowWeightVal;
        }
    };

    Component.prototype.colWeight = function (newVal) {
        if (newVal != null) {
            this.colWeightVal = newVal;
            return this;
        } else {
            return this.colWeightVal;
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
    Component.clipPathId = 0;
    return Component;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Scale = (function () {
    function Scale(scale) {
        this.broadcasterCallbacks = [];
        this.scale = scale;
    }
    Scale.prototype.public = function (value) {
        return this.scale(value);
    };

    Scale.prototype.domain = function (values) {
        var _this = this;
        if (values != null) {
            this.scale.domain(values);
            this.broadcasterCallbacks.forEach(function (b) {
                return b(_this);
            });
            return this;
        } else {
            return this.scale.domain();
        }
    };

    Scale.prototype.range = function (values) {
        if (values != null) {
            this.scale.range(values);
            return this;
        } else {
            return this.scale.range();
        }
    };

    Scale.prototype.copy = function () {
        return new Scale(this.scale.copy());
    };

    Scale.prototype.registerListener = function (callback) {
        this.broadcasterCallbacks.push(callback);
        return this;
    };
    return Scale;
})();

var QuantitiveScale = (function (_super) {
    __extends(QuantitiveScale, _super);
    function QuantitiveScale(scale) {
        _super.call(this, scale);
    }
    QuantitiveScale.prototype.invert = function (value) {
        return this.scale.invert(value);
    };

    QuantitiveScale.prototype.ticks = function (count) {
        return this.scale.ticks(count);
    };

    QuantitiveScale.prototype.copy = function () {
        return new QuantitiveScale(this.scale.copy());
    };

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
    LinearScale.prototype.copy = function () {
        return new LinearScale(this.scale.copy());
    };
    return LinearScale;
})(QuantitiveScale);

var ColorScale = (function (_super) {
    __extends(ColorScale, _super);
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
var Interaction = (function () {
    function Interaction(componentToListenTo) {
        this.componentToListenTo = componentToListenTo;
    }
    Interaction.prototype.anchor = function (hitBox) {
        this.hitBox = hitBox;
    };

    Interaction.prototype.registerWithComponent = function () {
        this.componentToListenTo.registerInteraction(this);
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
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(text, orientation) {
        if (typeof text === "undefined") { text = ""; }
        if (typeof orientation === "undefined") { orientation = "horizontal"; }
        _super.call(this);
        this.classed(Label.CSS_CLASS, true);
        this.setText(text);
        if (orientation === "horizontal" || orientation === "vertical-left" || orientation === "vertical-right") {
            this.orientation = orientation;
        } else {
            throw new Error(orientation + " is not a valid orientation for LabelComponent");
        }
        this.xAlign("CENTER").yAlign("CENTER");
    }
    Label.prototype.anchor = function (element) {
        _super.prototype.anchor.call(this, element);
        this.textElement = this.element.append("text");
        this.setText(this.text);
        return this;
    };

    Label.prototype.setText = function (text) {
        this.text = text;
        if (this.element != null) {
            this.textElement.text(text);
            this.measureAndSetTextSize();
        }
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

        this.textElement.attr("dy", 0);
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
                xShift = -xShift - this.textLength;
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
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(dataset) {
        if (typeof dataset === "undefined") { dataset = { seriesName: "", data: [] }; }
        _super.call(this);
        _super.prototype.rowWeight.call(this, 1);
        _super.prototype.colWeight.call(this, 1);
        this.clipPathEnabled = true;

        this.dataset = dataset;
        this.classed(Renderer.CSS_CLASS, true);
    }
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

    XYRenderer.prototype.invertXYSelectionArea = function (pixelArea) {
        var xMin = this.xScale.invert(pixelArea.xMin);
        var xMax = this.xScale.invert(pixelArea.xMax);
        var yMin = this.yScale.invert(pixelArea.yMin);
        var yMax = this.yScale.invert(pixelArea.yMax);
        var dataArea = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
        return dataArea;
    };

    XYRenderer.prototype.getSelectionFromArea = function (dataArea) {
        var _this = this;
        var filterFunction = function (d) {
            var x = _this.xAccessor(d);
            var y = _this.yAccessor(d);
            return Utils.inRange(x, dataArea.xMin, dataArea.xMax) && Utils.inRange(y, dataArea.yMin, dataArea.yMax);
        };
        return this.dataSelection.filter(filterFunction);
    };

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
    function BarRenderer(dataset, xScale, yScale, xAccessor, x2Accessor, yAccessor) {
        _super.call(this, dataset, xScale, yScale, xAccessor, yAccessor);
        this.barPaddingPx = 1;
        this.classed(BarRenderer.CSS_CLASS, true);

        var yDomain = this.yScale.domain();
        if (!Utils.inRange(0, yDomain[0], yDomain[1])) {
            var newMin = 0;
            var newMax = yDomain[1];
            this.yScale.widenDomain([newMin, newMax]);
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
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(rows) {
        if (typeof rows === "undefined") { rows = []; }
        _super.call(this);
        this.rowPadding = 0;
        this.colPadding = 0;
        this.guessRowWeight = true;
        this.guessColWeight = true;
        this.classed(Table.CSS_CLASS, true);
        var cleanOutNulls = function (c) {
            return c == null ? new Component() : c;
        };
        rows = rows.map(function (row) {
            return row.map(cleanOutNulls);
        });
        this.rows = rows;
        this.cols = d3.transpose(this.rows);
    }
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
        this.cols = d3.transpose(this.rows);
        return this;
    };

    Table.prototype.padTableToSize = function (nRows, nCols) {
        for (var i = 0; i < nRows; i++) {
            if (this.rows[i] === undefined) {
                this.rows[i] = [];
            }
            for (var j = 0; j < nCols; j++) {
                if (this.rows[i][j] === undefined) {
                    this.rows[i][j] = new Component();
                }
            }
        }
    };

    Table.prototype.anchor = function (element) {
        var _this = this;
        _super.prototype.anchor.call(this, element);

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

        var freeWidth = this.availableWidth - this.colMinimum();
        var freeHeight = this.availableHeight - this.rowMinimum();
        if (freeWidth < 0 || freeHeight < 0) {
            throw new Error("Insufficient Space");
        }

        var rowProportionalSpace = Table.rowProportionalSpace(this.rows, freeHeight);
        var colProportionalSpace = Table.colProportionalSpace(this.cols, freeWidth);

        var sumPair = function (p) {
            return p[0] + p[1];
        };
        var rowHeights = d3.zip(rowProportionalSpace, this.rowMinimums).map(sumPair);
        var colWidths = d3.zip(colProportionalSpace, this.colMinimums).map(sumPair);

        var childYOffset = 0;
        this.rows.forEach(function (row, rowIndex) {
            var childXOffset = 0;
            row.forEach(function (component, colIndex) {
                component.computeLayout(childXOffset, childYOffset, colWidths[colIndex], rowHeights[rowIndex]);
                childXOffset += colWidths[colIndex] + _this.colPadding;
            });
            childYOffset += rowHeights[rowIndex] + _this.rowPadding;
        });
        return this;
    };

    Table.rowProportionalSpace = function (rows, freeHeight) {
        return Table.calculateProportionalSpace(rows, freeHeight, function (c) {
            return c.rowWeight();
        });
    };
    Table.colProportionalSpace = function (cols, freeWidth) {
        return Table.calculateProportionalSpace(cols, freeWidth, function (c) {
            return c.colWeight();
        });
    };
    Table.calculateProportionalSpace = function (componentGroups, freeSpace, spaceAccessor) {
        var weights = componentGroups.map(function (group) {
            return d3.max(group, spaceAccessor);
        });
        var weightSum = d3.sum(weights);
        if (weightSum === 0) {
            var numGroups = componentGroups.length;
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
        this.rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                component.render();
            });
        });
        return this;
    };

    Table.prototype.rowWeight = function (newVal) {
        if (newVal != null || !this.guessRowWeight) {
            this.guessRowWeight = false;
            return _super.prototype.rowWeight.call(this, newVal);
        } else {
            var componentWeights = this.rows.map(function (r) {
                return r.map(function (c) {
                    return c.rowWeight();
                });
            });
            var biggestWeight = d3.max(componentWeights.map(function (ws) {
                return d3.max(ws);
            }));
            return biggestWeight > 0 ? 1 : 0;
        }
    };

    Table.prototype.colWeight = function (newVal) {
        if (newVal != null || !this.guessColWeight) {
            this.guessColWeight = false;
            return _super.prototype.colWeight.call(this, newVal);
        } else {
            var componentWeights = this.rows.map(function (r) {
                return r.map(function (c) {
                    return c.colWeight();
                });
            });
            var biggestWeight = d3.max(componentWeights.map(function (ws) {
                return d3.max(ws);
            }));
            return biggestWeight > 0 ? 1 : 0;
        }
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
            this.colMinimums = this.cols.map(function (col) {
                return d3.max(col, function (r) {
                    return r.colMinimum();
                });
            });
            return d3.sum(this.colMinimums) + this.colPadding * (this.cols.length - 1);
        }
    };

    Table.prototype.padding = function (rowPadding, colPadding) {
        this.rowPadding = rowPadding;
        this.colPadding = colPadding;
        return this;
    };
    Table.CSS_CLASS = "table";
    return Table;
})(Component);
var ScaleDomainCoordinator = (function () {
    function ScaleDomainCoordinator(scales) {
        var _this = this;
        this.scales = scales;
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
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend(colorScale) {
        _super.call(this);
        this.classed(Legend.CSS_CLASS, true);
        this.colMinimum(120);
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

        this.element.selectAll("." + Legend.SUBELEMENT_CLASS).remove();
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
var Axis = (function (_super) {
    __extends(Axis, _super);
    function Axis(scale, orientation, formatter) {
        var _this = this;
        _super.call(this);
        this.scale = scale;
        this.orientation = orientation;
        this.formatter = formatter;
        this.classed(Axis.CSS_CLASS, true);
        this.clipPathEnabled = true;
        this.isXAligned = this.orientation === "bottom" || this.orientation === "top";
        this.d3axis = d3.svg.axis().scale(this.scale.scale).orient(this.orientation);
        if (this.formatter == null) {
            this.formatter = d3.format(".3s");
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
        this.axisElement = this.element.append("g").classed("axis", true);
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
    };

    Axis.prototype.zoom = function (translatePair, scale) {
        return this.render();
    };
    Axis.CSS_CLASS = "axis";
    Axis.yWidth = 50;
    Axis.xHeight = 30;
    return Axis;
})(Component);

var XAxis = (function (_super) {
    __extends(XAxis, _super);
    function XAxis(scale, orientation, formatter) {
        if (typeof formatter === "undefined") { formatter = null; }
        _super.call(this, scale, orientation, formatter);
        _super.prototype.rowMinimum.call(this, Axis.xHeight);
    }
    return XAxis;
})(Axis);

var YAxis = (function (_super) {
    __extends(YAxis, _super);
    function YAxis(scale, orientation, formatter) {
        if (typeof formatter === "undefined") { formatter = null; }
        _super.call(this, scale, orientation, formatter);
        _super.prototype.colMinimum.call(this, Axis.yWidth);
    }
    return YAxis;
})(Axis);
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
    return ComponentGroup;
})(Component);
//# sourceMappingURL=plottable.js.map
