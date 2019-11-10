/*!
 * Plottable 3.0.0-beta.3 (https://github.com/palantir/plottable)
 * Copyright 2014-2017 Palantir Technologies
 * Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["Plottable"] = factory(require("d3"));
	else
		root["Plottable"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Array = __webpack_require__(94);
exports.Array = Array;
var Color = __webpack_require__(96);
exports.Color = Color;
var DOM = __webpack_require__(97);
exports.DOM = DOM;
var Math = __webpack_require__(28);
exports.Math = Math;
var Stacking = __webpack_require__(100);
exports.Stacking = Stacking;
var Window = __webpack_require__(102);
exports.Window = Window;
__export(__webpack_require__(95));
__export(__webpack_require__(11));
__export(__webpack_require__(98));
__export(__webpack_require__(99));
__export(__webpack_require__(40));
__export(__webpack_require__(101));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Animators = __webpack_require__(6);
var component_1 = __webpack_require__(5);
var drawer_1 = __webpack_require__(7);
var Utils = __webpack_require__(0);
var coerceD3_1 = __webpack_require__(11);
var makeEnum_1 = __webpack_require__(125);
var Plots = __webpack_require__(37);
exports.Renderer = makeEnum_1.makeEnum(["svg", "canvas"]);
var Plot = (function (_super) {
    __extends(Plot, _super);
    /**
     * A Plot draws some visualization of the inputted Datasets.
     *
     * @constructor
     */
    function Plot() {
        var _this = _super.call(this) || this;
        /**
         * Whether the backing datasets have changed since this plot's last render.
         */
        _this._dataChanged = false;
        _this._animate = false;
        /**
         * The Animators for this plot. Each plot exposes a set of "animator key" strings that
         * define how different parts of that particular Plot animates. For instance, Rectangle
         * Plots have a "rectangles" animator key which controls how the <rect>s are animated.
         * @see animator()
         *
         * There are two common animators that most Plots respect: "main" and "reset". In general,
         * Plots draw in two steps: first they "reset" their visual elements (e.g. scatter plots set
         * all the dots to size 0), and then they do the "main" animation into the correct visualization
         * (e.g. scatter plot dots grow to their specified size).
         */
        _this._animators = {};
        _this._overflowHidden = true;
        _this.addClass("plot");
        _this._datasetToDrawer = new Utils.Map();
        _this._attrBindings = d3.map();
        _this._attrExtents = d3.map();
        _this._includedValuesProvider = function (scale) { return _this._includedValuesForScale(scale); };
        _this._renderCallback = function (scale) { return _this.render(); };
        _this._onDatasetUpdateCallback = function () { return _this._onDatasetUpdate(); };
        _this._propertyBindings = d3.map();
        _this._propertyExtents = d3.map();
        var mainAnimator = new Animators.Easing().maxTotalDuration(Plot._ANIMATION_MAX_DURATION);
        _this.animator(Plots.Animator.MAIN, mainAnimator);
        _this.animator(Plots.Animator.RESET, new Animators.Null());
        return _this;
    }
    Plot.prototype.anchor = function (selection) {
        selection = coerceD3_1.coerceExternalD3(selection);
        _super.prototype.anchor.call(this, selection);
        this._dataChanged = true;
        this._cachedEntityStore = undefined;
        this._updateExtents();
        return this;
    };
    Plot.prototype._setup = function () {
        var _this = this;
        _super.prototype._setup.call(this);
        if (this._canvas != null) {
            this.element().node().appendChild(this._canvas.node());
        }
        this._renderArea = this.content().append("g").classed("render-area", true);
        this.datasets().forEach(function (dataset) { return _this._createNodesForDataset(dataset); });
    };
    Plot.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (this._canvas != null) {
            // update canvas width/height; this will also clear the canvas of any drawn elements so we should
            // be sure not to computeLayout() without a render() in the future.
            this._canvas.attr("width", this.width());
            this._canvas.attr("height", this.height());
        }
        return this;
    };
    Plot.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this._scales().forEach(function (scale) { return scale.offUpdate(_this._renderCallback); });
        this.datasets([]);
    };
    Plot.prototype._createNodesForDataset = function (dataset) {
        var drawer = this._datasetToDrawer.get(dataset);
        if (this.renderer() === "svg") {
            drawer.renderArea(this._renderArea.append("g"));
        }
        else {
            drawer.canvas(this._canvas);
        }
        return drawer;
    };
    Plot.prototype._createDrawer = function (dataset) {
        return new drawer_1.Drawer(dataset);
    };
    Plot.prototype._getAnimator = function (key) {
        if (this._animateOnNextRender()) {
            return this._animators[key] || new Animators.Null();
        }
        else {
            return new Animators.Null();
        }
    };
    Plot.prototype._onDatasetUpdate = function () {
        this._updateExtents();
        this._dataChanged = true;
        this._cachedEntityStore = undefined;
        this.render();
    };
    Plot.prototype.attr = function (attr, attrValue, scale) {
        if (attrValue == null) {
            return this._attrBindings.get(attr);
        }
        this._bindAttr(attr, attrValue, scale);
        this.render(); // queue a re-render upon changing projector
        return this;
    };
    Plot.prototype._bindProperty = function (property, valueOrFn, scale) {
        var binding = this._propertyBindings.get(property);
        var oldScale = binding != null ? binding.scale : null;
        var accessor = typeof valueOrFn === "function" ? valueOrFn : function () { return valueOrFn; };
        this._propertyBindings.set(property, { accessor: accessor, scale: scale });
        this._updateExtentsForProperty(property);
        if (oldScale != null) {
            this._uninstallScaleForKey(oldScale, property);
        }
        if (scale != null) {
            this._installScaleForKey(scale, property);
        }
    };
    Plot.prototype._bindAttr = function (attr, valueOrFn, scale) {
        var binding = this._attrBindings.get(attr);
        var oldScale = binding != null ? binding.scale : null;
        var accessor = typeof valueOrFn === "function" ? valueOrFn : function () { return valueOrFn; };
        this._attrBindings.set(attr, { accessor: accessor, scale: scale });
        this._updateExtentsForAttr(attr);
        if (oldScale != null) {
            this._uninstallScaleForKey(oldScale, attr);
        }
        if (scale != null) {
            this._installScaleForKey(scale, attr);
        }
    };
    Plot.prototype._generateAttrToProjector = function () {
        var h = {};
        this._attrBindings.each(function (binding, attr) {
            var accessor = binding.accessor;
            var scale = binding.scale;
            var fn = scale ? function (d, i, dataset) { return scale.scale(accessor(d, i, dataset)); } : accessor;
            h[attr] = fn;
        });
        var propertyProjectors = this._propertyProjectors();
        Object.keys(propertyProjectors).forEach(function (key) {
            if (h[key] == null) {
                h[key] = propertyProjectors[key];
            }
        });
        return h;
    };
    Plot.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        if (this._isAnchored) {
            this._paint();
            this._dataChanged = false;
        }
        return this;
    };
    Plot.prototype.animated = function (willAnimate) {
        if (willAnimate == null) {
            return this._animate;
        }
        this._animate = willAnimate;
        return this;
    };
    Plot.prototype.detach = function () {
        _super.prototype.detach.call(this);
        // make the domain resize
        this._updateExtents();
        return this;
    };
    /**
     * @returns {Scale[]} A unique array of all scales currently used by the Plot.
     */
    Plot.prototype._scales = function () {
        var scales = [];
        this._attrBindings.each(function (binding, attr) {
            var scale = binding.scale;
            if (scale != null && scales.indexOf(scale) === -1) {
                scales.push(scale);
            }
        });
        this._propertyBindings.each(function (binding, property) {
            var scale = binding.scale;
            if (scale != null && scales.indexOf(scale) === -1) {
                scales.push(scale);
            }
        });
        return scales;
    };
    /**
     * Updates the extents associated with each attribute, then autodomains all scales the Plot uses.
     */
    Plot.prototype._updateExtents = function () {
        var _this = this;
        this._attrBindings.each(function (_, attr) { return _this._updateExtentsForAttr(attr); });
        this._propertyExtents.each(function (_, property) { return _this._updateExtentsForProperty(property); });
        this._scales().forEach(function (scale) { return scale.addIncludedValuesProvider(_this._includedValuesProvider); });
    };
    Plot.prototype._updateExtentsForAttr = function (attr) {
        // Filters should never be applied to attributes
        this._updateExtentsForKey(attr, this._attrBindings, this._attrExtents, null);
    };
    Plot.prototype._updateExtentsForProperty = function (property) {
        this._updateExtentsForKey(property, this._propertyBindings, this._propertyExtents, this._filterForProperty(property));
    };
    Plot.prototype._filterForProperty = function (property) {
        return null;
    };
    Plot.prototype._updateExtentsForKey = function (key, bindings, extents, filter) {
        var _this = this;
        var accScaleBinding = bindings.get(key);
        if (accScaleBinding == null || accScaleBinding.accessor == null) {
            return;
        }
        extents.set(key, this.datasets().map(function (dataset) { return _this._computeExtent(dataset, accScaleBinding, filter); }));
    };
    Plot.prototype._computeExtent = function (dataset, accScaleBinding, filter) {
        var accessor = accScaleBinding.accessor;
        var scale = accScaleBinding.scale;
        if (scale == null) {
            return [];
        }
        var data = dataset.data();
        if (filter != null) {
            data = data.filter(function (d, i) { return filter(d, i, dataset); });
        }
        var appliedAccessor = function (d, i) { return accessor(d, i, dataset); };
        var mappedData = data.map(appliedAccessor);
        return scale.extentOfValues(mappedData);
    };
    /**
     * Override in subclass to add special extents, such as included values
     */
    Plot.prototype._extentsForProperty = function (property) {
        return this._propertyExtents.get(property);
    };
    Plot.prototype._includedValuesForScale = function (scale) {
        var _this = this;
        if (!this._isAnchored) {
            return [];
        }
        var includedValues = [];
        this._attrBindings.each(function (binding, attr) {
            if (binding.scale === scale) {
                var extents = _this._attrExtents.get(attr);
                if (extents != null) {
                    includedValues = includedValues.concat(d3.merge(extents));
                }
            }
        });
        this._propertyBindings.each(function (binding, property) {
            if (binding.scale === scale) {
                var extents = _this._extentsForProperty(property);
                if (extents != null) {
                    includedValues = includedValues.concat(d3.merge(extents));
                }
            }
        });
        return includedValues;
    };
    Plot.prototype.animator = function (animatorKey, animator) {
        if (animator === undefined) {
            return this._animators[animatorKey];
        }
        else {
            this._animators[animatorKey] = animator;
            return this;
        }
    };
    Plot.prototype.renderer = function (renderer) {
        var _this = this;
        if (renderer === undefined) {
            return this._canvas == null ? "svg" : "canvas";
        }
        else {
            if (this._canvas == null && renderer === "canvas") {
                // construct the canvas, remove drawer's renderAreas, set drawer's canvas
                this._canvas = d3.select(document.createElement("canvas")).classed("plot-canvas", true);
                if (this.element() != null) {
                    this.element().node().appendChild(this._canvas.node());
                }
                this._datasetToDrawer.forEach(function (drawer) {
                    if (drawer.renderArea() != null) {
                        drawer.renderArea().remove();
                    }
                    drawer.canvas(_this._canvas);
                });
                this.render();
            }
            else if (this._canvas != null && renderer == "svg") {
                this._canvas.remove();
                this._canvas = null;
                this._datasetToDrawer.forEach(function (drawer) {
                    drawer.renderArea(_this._renderArea.append("g"));
                });
                this.render();
            }
            return this;
        }
    };
    /**
     * Adds a Dataset to the Plot.
     *
     * @param {Dataset} dataset
     * @returns {Plot} The calling Plot.
     */
    Plot.prototype.addDataset = function (dataset) {
        this._addDataset(dataset);
        this._onDatasetUpdate();
        return this;
    };
    Plot.prototype._addDataset = function (dataset) {
        this._removeDataset(dataset);
        var drawer = this._createDrawer(dataset);
        this._datasetToDrawer.set(dataset, drawer);
        if (this._isSetup) {
            this._createNodesForDataset(dataset);
        }
        dataset.onUpdate(this._onDatasetUpdateCallback);
        return this;
    };
    /**
     * Removes a Dataset from the Plot.
     *
     * @param {Dataset} dataset
     * @returns {Plot} The calling Plot.
     */
    Plot.prototype.removeDataset = function (dataset) {
        this._removeDataset(dataset);
        this._onDatasetUpdate();
        return this;
    };
    Plot.prototype._removeDataset = function (dataset) {
        if (this.datasets().indexOf(dataset) === -1) {
            return this;
        }
        this._removeDatasetNodes(dataset);
        dataset.offUpdate(this._onDatasetUpdateCallback);
        this._datasetToDrawer.delete(dataset);
        return this;
    };
    Plot.prototype._removeDatasetNodes = function (dataset) {
        var drawer = this._datasetToDrawer.get(dataset);
        drawer.remove();
    };
    Plot.prototype.datasets = function (datasets) {
        var _this = this;
        var currentDatasets = [];
        this._datasetToDrawer.forEach(function (drawer, dataset) { return currentDatasets.push(dataset); });
        if (datasets == null) {
            return currentDatasets;
        }
        currentDatasets.forEach(function (dataset) { return _this._removeDataset(dataset); });
        datasets.forEach(function (dataset) { return _this._addDataset(dataset); });
        this._onDatasetUpdate();
        return this;
    };
    Plot.prototype._generateDrawSteps = function () {
        return [{ attrToProjector: this._generateAttrToProjector(), animator: new Animators.Null() }];
    };
    Plot.prototype._additionalPaint = function (time) {
        // no-op
    };
    /**
     * _buildLightweightPlotEntities constucts {LightweightPlotEntity[]} from
     * all the entities in the plot
     * @param {Dataset[]} [datasets] - datasets comprising this plot
     */
    Plot.prototype._buildLightweightPlotEntities = function (datasets) {
        var _this = this;
        var lightweightPlotEntities = [];
        datasets.forEach(function (dataset, datasetIndex) {
            var drawer = _this._datasetToDrawer.get(dataset);
            var validDatumIndex = 0;
            dataset.data().forEach(function (datum, datumIndex) {
                var position = _this._pixelPoint(datum, datumIndex, dataset);
                if (Utils.Math.isNaN(position.x) || Utils.Math.isNaN(position.y)) {
                    return;
                }
                var plot = _this;
                lightweightPlotEntities.push({
                    datum: datum,
                    get position() {
                        // only calculate position when needing to improve pan zoom performance #3159
                        return plot._pixelPoint.call(plot, datum, datumIndex, dataset);
                    },
                    index: datumIndex,
                    dataset: dataset,
                    datasetIndex: datasetIndex,
                    component: _this,
                    drawer: drawer,
                    validDatumIndex: validDatumIndex,
                });
                validDatumIndex++;
            });
        });
        return lightweightPlotEntities;
    };
    Plot.prototype._getDataToDraw = function () {
        var dataToDraw = new Utils.Map();
        this.datasets().forEach(function (dataset) { return dataToDraw.set(dataset, dataset.data()); });
        return dataToDraw;
    };
    Plot.prototype._paint = function () {
        var _this = this;
        var drawSteps = this._generateDrawSteps();
        var dataToDraw = this._getDataToDraw();
        var drawers = this.datasets().map(function (dataset) { return _this._datasetToDrawer.get(dataset); });
        if (this.renderer() === "canvas") {
            var canvas = this._canvas.node();
            var context_1 = canvas.getContext("2d");
            context_1.clearRect(0, 0, canvas.width, canvas.height);
        }
        this.datasets().forEach(function (ds, i) { return drawers[i].draw(dataToDraw.get(ds), drawSteps); });
        var times = this.datasets().map(function (ds, i) { return drawers[i].totalDrawTime(dataToDraw.get(ds), drawSteps); });
        var maxTime = Utils.Math.max(times, 0);
        this._additionalPaint(maxTime);
    };
    /**
     * Retrieves the drawn visual elements for the specified Datasets as a d3 Selection.
     *
     * @param {Dataset[]} [datasets] The Datasets to retrieve the Selections for.
     *   If not provided, Selections will be retrieved for all Datasets on the Plot.
     * @returns {d3.Selection}
     */
    Plot.prototype.selections = function (datasets) {
        var _this = this;
        if (datasets === void 0) { datasets = this.datasets(); }
        if (this.renderer() === "canvas") {
            return null;
        }
        else {
            var selections_1 = [];
            datasets.forEach(function (dataset) {
                var drawer = _this._datasetToDrawer.get(dataset);
                if (drawer == null) {
                    return;
                }
                drawer.renderArea().selectAll(drawer.selector()).each(function () {
                    selections_1.push(this);
                });
            });
            return d3.selectAll(selections_1);
        }
    };
    /**
     * Gets the Entities associated with the specified Datasets.
     *
     * @param {Dataset[]} datasets The Datasets to retrieve the Entities for.
     *   If not provided, returns defaults to all Datasets on the Plot.
     * @return {Plots.PlotEntity[]}
     */
    Plot.prototype.entities = function (datasets) {
        var _this = this;
        return this._getEntityStore(datasets).map(function (entity) { return _this._lightweightPlotEntityToPlotEntity(entity); });
    };
    /**
     * _getEntityStore returns the store of all Entities associated with the specified dataset
     *
     * @param {Dataset[]} [datasets] - The datasets with which to construct the store. If no datasets
     * are specified all datasets will be used.
     */
    Plot.prototype._getEntityStore = function (datasets) {
        var _this = this;
        if (datasets !== undefined) {
            var EntityStore_1 = new Utils.EntityArray();
            this._buildLightweightPlotEntities(datasets).forEach(function (entity) {
                EntityStore_1.add(entity);
            });
            return EntityStore_1;
        }
        else if (this._cachedEntityStore === undefined) {
            this._cachedEntityStore = new Utils.EntityArray();
            this._buildLightweightPlotEntities(this.datasets()).forEach(function (entity) {
                _this._cachedEntityStore.add(entity);
            });
        }
        return this._cachedEntityStore;
    };
    Plot.prototype._lightweightPlotEntityToPlotEntity = function (entity) {
        var plotEntity = {
            datum: entity.datum,
            position: entity.position,
            dataset: entity.dataset,
            datasetIndex: entity.datasetIndex,
            index: entity.index,
            component: entity.component,
            selection: entity.drawer.selectionForIndex(entity.validDatumIndex),
        };
        return plotEntity;
    };
    /**
     * Gets the PlotEntities at a particular Point.
     *
     * Each plot type determines how to locate entities at or near the query
     * point. For example, line and area charts will return the nearest entity,
     * but bar charts will only return the entities that fully contain the query
     * point.
     *
     * @param {Point} point The point to query.
     * @returns {PlotEntity[]} The PlotEntities at the particular point
     */
    Plot.prototype.entitiesAt = function (point) {
        throw new Error("plots must implement entitiesAt");
    };
    /**
     * Returns the {Plots.PlotEntity} nearest to the query point,
     * or undefined if no {Plots.PlotEntity} can be found.
     *
     * @param {Point} queryPoint
     * @param {bounds} Bounds The bounding box within which to search. By default, bounds is the bounds of
     * the chart, relative to the parent.
     * @returns {Plots.PlotEntity} The nearest PlotEntity, or undefined if no {Plots.PlotEntity} can be found.
     */
    Plot.prototype.entityNearest = function (queryPoint, bounds) {
        var _this = this;
        if (bounds === void 0) { bounds = this.bounds(); }
        var nearest = this._getEntityStore().entityNearest(queryPoint, function (entity) {
            return _this._entityVisibleOnPlot(entity, bounds);
        });
        return nearest === undefined ? undefined : this._lightweightPlotEntityToPlotEntity(nearest);
    };
    Plot.prototype._entityVisibleOnPlot = function (entity, chartBounds) {
        return !(entity.position.x < chartBounds.topLeft.x || entity.position.y < chartBounds.topLeft.y ||
            entity.position.x > chartBounds.bottomRight.x || entity.position.y > chartBounds.bottomRight.y);
    };
    Plot.prototype._uninstallScaleForKey = function (scale, key) {
        scale.offUpdate(this._renderCallback);
        scale.removeIncludedValuesProvider(this._includedValuesProvider);
    };
    Plot.prototype._installScaleForKey = function (scale, key) {
        scale.onUpdate(this._renderCallback);
        scale.addIncludedValuesProvider(this._includedValuesProvider);
    };
    Plot.prototype._propertyProjectors = function () {
        return {};
    };
    Plot._scaledAccessor = function (binding) {
        return binding.scale == null ?
            binding.accessor :
            function (d, i, ds) { return binding.scale.scale(binding.accessor(d, i, ds)); };
    };
    Plot.prototype._pixelPoint = function (datum, index, dataset) {
        return { x: 0, y: 0 };
    };
    Plot.prototype._animateOnNextRender = function () {
        return this._animate && this._dataChanged;
    };
    return Plot;
}(component_1.Component));
Plot._ANIMATION_MAX_DURATION = 600;
exports.Plot = Plot;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var TickGenerators = __webpack_require__(92);
exports.TickGenerators = TickGenerators;
__export(__webpack_require__(39));
__export(__webpack_require__(88));
__export(__webpack_require__(89));
__export(__webpack_require__(90));
__export(__webpack_require__(91));
__export(__webpack_require__(93));
// ---------------------------------------------------------
var categoryScale_1 = __webpack_require__(39);
var quantitativeScale_1 = __webpack_require__(10);
/**
 * Type guarded function to check if the scale implements the
 * `TransformableScale` interface. Unfortunately, there is no way to do
 * runtime interface typechecking, so we have to explicitly list all classes
 * that implement the interface.
 */
function isTransformable(scale) {
    return (scale instanceof quantitativeScale_1.QuantitativeScale ||
        scale instanceof categoryScale_1.Category);
}
exports.isTransformable = isTransformable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(41));
__export(__webpack_require__(44));
__export(__webpack_require__(117));
__export(__webpack_require__(18));
__export(__webpack_require__(46));
__export(__webpack_require__(48));
//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var RenderController = __webpack_require__(25);
var Utils = __webpack_require__(0);
var coerceD3_1 = __webpack_require__(11);
var makeEnum_1 = __webpack_require__(125);
exports.XAlignment = makeEnum_1.makeEnum(["left", "center", "right"]);
exports.YAlignment = makeEnum_1.makeEnum(["top", "center", "bottom"]);
/**
 * Components are the core logical units that build Plottable visualizations.
 *
 * This class deals with Component lifecycle (anchoring, getting a size, and rendering
 * infrastructure), as well as building the framework of DOM elements for all Components.
 */
var Component = (function () {
    function Component() {
        /**
         * Subclasses should set this to true in their constructor to prevent content from overflowing.
         */
        this._overflowHidden = false;
        /**
         * Origin of this Component relative to its parent.
         */
        this._origin = { x: 0, y: 0 };
        this._xAlignment = "left";
        this._yAlignment = "top";
        this._isSetup = false;
        this._isAnchored = false;
        this._cssClasses = new Utils.Set();
        /**
         * If .destroy() has been called on this Component.
         */
        this._destroyed = false;
        this._onAnchorCallbacks = new Utils.CallbackSet();
        this._onDetachCallbacks = new Utils.CallbackSet();
        this._cssClasses.add("component");
    }
    /**
     * Attaches the Component as a child of a given d3 Selection.
     *
     * @param {d3.Selection} selection.
     * @returns {Component} The calling Component.
     */
    Component.prototype.anchor = function (selection) {
        selection = coerceD3_1.coerceExternalD3(selection);
        if (this._destroyed) {
            throw new Error("Can't reuse destroy()-ed Components!");
        }
        if (this.isRoot()) {
            this._rootElement = selection;
            // rootElement gets the "plottable" CSS class
            this._rootElement.classed("plottable", true);
        }
        if (this._element != null) {
            // reattach existing element
            selection.node().appendChild(this._element.node());
        }
        else {
            this._element = selection.append("div");
            this._setup();
        }
        this._isAnchored = true;
        this._onAnchorCallbacks.callCallbacks(this);
        return this;
    };
    /**
     * Adds a callback to be called on anchoring the Component to the DOM.
     * If the Component is already anchored, the callback is called immediately.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    Component.prototype.onAnchor = function (callback) {
        if (this._isAnchored) {
            callback(this);
        }
        this._onAnchorCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called on anchoring the Component to the DOM.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    Component.prototype.offAnchor = function (callback) {
        this._onAnchorCallbacks.delete(callback);
        return this;
    };
    /**
     * Creates additional elements as necessary for the Component to function.
     * Called during anchor() if the Component's element has not been created yet.
     * Override in subclasses to provide additional functionality.
     */
    Component.prototype._setup = function () {
        var _this = this;
        if (this._isSetup) {
            return;
        }
        this._cssClasses.forEach(function (cssClass) {
            _this._element.classed(cssClass, true);
        });
        this._cssClasses = new Utils.Set();
        this._backgroundContainer = this._element.append("svg").classed("background-container", true);
        this._content = this._element.append("svg").classed("content", true);
        this._foregroundContainer = this._element.append("svg").classed("foreground-container", true);
        if (this._overflowHidden) {
            this._content.classed("component-overflow-hidden", true);
        }
        else {
            this._content.classed("component-overflow-visible", true);
        }
        this._isSetup = true;
    };
    /**
     * Given available space in pixels, returns the minimum width and height this Component will need.
     *
     * @param {number} availableWidth
     * @param {number} availableHeight
     * @returns {SpaceRequest}
     */
    Component.prototype.requestedSpace = function (availableWidth, availableHeight) {
        return {
            minWidth: 0,
            minHeight: 0,
        };
    };
    /**
     * Computes and sets the size, position, and alignment of the Component from the specified values.
     * If no parameters are supplied and the Component is a root node,
     * they are inferred from the size of the Component's element.
     *
     * @param {Point} [origin] Origin of the space offered to the Component.
     * @param {number} [availableWidth] Available width in pixels.
     * @param {number} [availableHeight] Available height in pixels.
     * @returns {Component} The calling Component.
     */
    Component.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        if (origin == null || availableWidth == null || availableHeight == null) {
            if (this._element == null) {
                throw new Error("anchor() must be called before computeLayout()");
            }
            else if (this._rootElement != null) {
                // retrieve height/width from rootElement
                origin = { x: 0, y: 0 };
                var elem = this._rootElement.node();
                availableWidth = Utils.DOM.elementWidth(elem);
                availableHeight = Utils.DOM.elementHeight(elem);
            }
            else {
                throw new Error("null arguments cannot be passed to computeLayout() on a non-root, unanchored node");
            }
        }
        var size = this._sizeFromOffer(availableWidth, availableHeight);
        this._width = size.width;
        this._height = size.height;
        var xAlignProportion = Component._xAlignToProportion[this._xAlignment];
        var yAlignProportion = Component._yAlignToProportion[this._yAlignment];
        this._origin = {
            x: origin.x + (availableWidth - this.width()) * xAlignProportion,
            y: origin.y + (availableHeight - this.height()) * yAlignProportion,
        };
        this._element.styles({
            left: this._origin.x + "px",
            height: this.height() + "px",
            top: this._origin.y + "px",
            width: this.width() + "px",
        });
        if (this._resizeHandler != null) {
            this._resizeHandler(size);
        }
        return this;
    };
    Component.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        var requestedSpace = this.requestedSpace(availableWidth, availableHeight);
        return {
            width: this.fixedWidth() ? Math.min(availableWidth, requestedSpace.minWidth) : availableWidth,
            height: this.fixedHeight() ? Math.min(availableHeight, requestedSpace.minHeight) : availableHeight,
        };
    };
    /**
     * Queues the Component for rendering.
     *
     * @returns {Component} The calling Component.
     */
    Component.prototype.render = function () {
        if (this._isAnchored && this._isSetup && this.width() >= 0 && this.height() >= 0) {
            RenderController.registerToRender(this);
        }
        return this;
    };
    Component.prototype._scheduleComputeLayout = function () {
        if (this._isAnchored && this._isSetup) {
            RenderController.registerToComputeLayoutAndRender(this);
        }
    };
    /**
     * Sets a callback that gets called when the component resizes. The size change
     * is not guaranteed to be reflected by the DOM at the time the callback is fired.
     *
     * @param {IResizeHandler} [resizeHandler] Callback to be called when component resizes
     */
    Component.prototype.onResize = function (resizeHandler) {
        this._resizeHandler = resizeHandler;
        return this;
    };
    /**
     * Renders the Component without waiting for the next frame. This method is a no-op on
     * Component, Table, and Group; render them immediately with .renderTo() instead.
     */
    Component.prototype.renderImmediately = function () {
        return this;
    };
    /**
     * Causes the Component to re-layout and render.
     *
     * @returns {Component} The calling Component.
     */
    Component.prototype.redraw = function () {
        if (this._isAnchored && this._isSetup) {
            if (this.isRoot()) {
                this._scheduleComputeLayout();
            }
            else {
                this.parent().redraw();
            }
        }
        return this;
    };
    /**
     * Tell this component to invalidate any caching. This function should be
     * called when a CSS change has occurred that could influence the layout
     * of the Component, such as changing the font size.
     *
     * Subclasses should override.
     */
    Component.prototype.invalidateCache = function () {
        // Core component has no caching.
    };
    /**
     * Renders the Component to a given HTML Element.
     *
     * @param {String|d3.Selection} element The element, a selector string for the element, or a d3.Selection for the element.
     * @returns {Component} The calling Component.
     */
    Component.prototype.renderTo = function (element) {
        this.detach();
        if (element != null) {
            var selection = void 0;
            if (typeof (element) === "string") {
                selection = d3.select(element);
            }
            else if (element instanceof Element) {
                selection = d3.select(element);
            }
            else {
                selection = coerceD3_1.coerceExternalD3(element);
            }
            if (!selection.node() || selection.node().nodeName == null) {
                throw new Error("Plottable requires a valid Element to renderTo");
            }
            if (selection.node().nodeName === "svg") {
                throw new Error("Plottable 3.x and later can only renderTo an HTML component; pass a div instead!");
            }
            this.anchor(selection);
        }
        if (this._element == null) {
            throw new Error("If a Component has never been rendered before, then renderTo must be given a node to render to, " +
                "or a d3.Selection, or a selector string");
        }
        RenderController.registerToComputeLayoutAndRender(this);
        // flush so that consumers can immediately attach to stuff we create in the DOM
        RenderController.flush();
        return this;
    };
    Component.prototype.xAlignment = function (xAlignment) {
        if (xAlignment == null) {
            return this._xAlignment;
        }
        xAlignment = xAlignment.toLowerCase();
        if (Component._xAlignToProportion[xAlignment] == null) {
            throw new Error("Unsupported alignment: " + xAlignment);
        }
        this._xAlignment = xAlignment;
        this.redraw();
        return this;
    };
    Component.prototype.yAlignment = function (yAlignment) {
        if (yAlignment == null) {
            return this._yAlignment;
        }
        yAlignment = yAlignment.toLowerCase();
        if (Component._yAlignToProportion[yAlignment] == null) {
            throw new Error("Unsupported alignment: " + yAlignment);
        }
        this._yAlignment = yAlignment;
        this.redraw();
        return this;
    };
    /**
     * Checks if the Component has a given CSS class.
     *
     * @param {string} cssClass The CSS class to check for.
     */
    Component.prototype.hasClass = function (cssClass) {
        if (cssClass == null) {
            return false;
        }
        if (this._element == null) {
            return this._cssClasses.has(cssClass);
        }
        else {
            return this._element.classed(cssClass);
        }
    };
    /**
     * Adds a given CSS class to the Component.
     *
     * @param {string} cssClass The CSS class to add.
     * @returns {Component} The calling Component.
     */
    Component.prototype.addClass = function (cssClass) {
        if (cssClass == null) {
            return this;
        }
        if (this._element == null) {
            this._cssClasses.add(cssClass);
        }
        else {
            this._element.classed(cssClass, true);
        }
        return this;
    };
    /**
     * Removes a given CSS class from the Component.
     *
     * @param {string} cssClass The CSS class to remove.
     * @returns {Component} The calling Component.
     */
    Component.prototype.removeClass = function (cssClass) {
        if (cssClass == null) {
            return this;
        }
        if (this._element == null) {
            this._cssClasses.delete(cssClass);
        }
        else {
            this._element.classed(cssClass, false);
        }
        return this;
    };
    /**
     * Checks if the Component has a fixed width or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    Component.prototype.fixedWidth = function () {
        return false;
    };
    /**
     * Checks if the Component has a fixed height or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    Component.prototype.fixedHeight = function () {
        return false;
    };
    /**
     * Detaches a Component from the DOM. The Component can be reused.
     *
     * This should only be used if you plan on reusing the calling Component. Otherwise, use destroy().
     *
     * @returns The calling Component.
     */
    Component.prototype.detach = function () {
        this.parent(null);
        if (this._isAnchored) {
            this._element.remove();
        }
        this._isAnchored = false;
        this._onDetachCallbacks.callCallbacks(this);
        return this;
    };
    /**
     * Adds a callback to be called when the Component is detach()-ed.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    Component.prototype.onDetach = function (callback) {
        this._onDetachCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when the Component is detach()-ed.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    Component.prototype.offDetach = function (callback) {
        this._onDetachCallbacks.delete(callback);
        return this;
    };
    Component.prototype.parent = function (parent) {
        if (parent === undefined) {
            return this._parent;
        }
        if (parent !== null && !parent.has(this)) {
            throw new Error("Passed invalid parent");
        }
        this._parent = parent;
        return this;
    };
    /**
     * @returns {Bounds} for the component in pixel space, where the topLeft
     * represents the component's minimum x and y values and the bottomRight represents
     * the component's maximum x and y values.
     */
    Component.prototype.bounds = function () {
        var topLeft = this.origin();
        return {
            topLeft: topLeft,
            bottomRight: {
                x: topLeft.x + this.width(),
                y: topLeft.y + this.height(),
            },
        };
    };
    /**
     * Removes a Component from the DOM and disconnects all listeners.
     */
    Component.prototype.destroy = function () {
        this._destroyed = true;
        this.detach();
    };
    /**
     * Gets the width of the Component in pixels.
     */
    Component.prototype.width = function () {
        return this._width;
    };
    /**
     * Gets the height of the Component in pixels.
     */
    Component.prototype.height = function () {
        return this._height;
    };
    /**
     * Gets the origin of the Component relative to its parent.
     *
     * @return {Point}
     */
    Component.prototype.origin = function () {
        return {
            x: this._origin.x,
            y: this._origin.y,
        };
    };
    /**
     * Gets the origin of the Component relative to the root Component.
     *
     * @return {Point}
     */
    Component.prototype.originToRoot = function () {
        var origin = this.origin();
        var ancestor = this.parent();
        while (ancestor != null) {
            var ancestorOrigin = ancestor.origin();
            origin.x += ancestorOrigin.x;
            origin.y += ancestorOrigin.y;
            ancestor = ancestor.parent();
        }
        return origin;
    };
    /**
     * Gets the root component of the hierarchy. If the provided
     * component is the root, that component will be returned.
     */
    Component.prototype.root = function () {
        var component = this;
        while (!component.isRoot()) {
            component = component.parent();
        }
        return component;
    };
    Component.prototype.isRoot = function () {
        return this.parent() == null;
    };
    /**
     * Gets the Selection containing the <g> in front of the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection}
     */
    Component.prototype.foreground = function () {
        return this._foregroundContainer;
    };
    /**
     * Gets the SVG that holds the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} content selection for the Component
     */
    Component.prototype.content = function () {
        return this._content;
    };
    /**
     * Returns the HTML Element at the root of this component's DOM tree.
     */
    Component.prototype.element = function () {
        return this._element;
    };
    /**
     * Returns the top-level user supplied element that roots the tree that this Component lives in.
     */
    Component.prototype.rootElement = function () {
        return this.root()._rootElement;
    };
    /**
     * Gets the Selection containing the <g> behind the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} background selection for the Component
     */
    Component.prototype.background = function () {
        return this._backgroundContainer;
    };
    return Component;
}());
Component._xAlignToProportion = {
    left: 0,
    center: 0.5,
    right: 1,
};
Component._yAlignToProportion = {
    top: 0,
    center: 0.5,
    bottom: 1,
};
exports.Component = Component;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(53));
__export(__webpack_require__(54));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var coerceD3_1 = __webpack_require__(11);
/**
 * A Drawer is responsible for actually committing the DrawSteps to the DOM. You first pass a renderArea
 * to the Drawer, which is the root DOM node holding all the drawing elements. Subclasses set an _svgElementName
 * which is an HTML/SVG tag name. Then you call .draw() with the DrawSteps to draw, and the Drawer will draw
 * to the DOM by clearing old DOM elements, adding new DOM elements, and then passing those DOM elements to
 * the animator, which will set the appropriate attributes on the DOM.
 *
 * "Drawing" in Plottable really means either:
 * (a) "making the DOM elements and their attributes correctly reflect the data being passed in", using SVG.
 * (b) "making draw commands to the Canvas element", using Canvas.
 */
var Drawer = (function () {
    /**
     * A Drawer draws svg elements based on the input Dataset.
     *
     * @constructor
     * @param {Dataset} dataset The dataset associated with this Drawer
     */
    function Drawer(dataset) {
        this._cachedSelectionValid = false;
        this._dataset = dataset;
        this._svgElementName = "path";
    }
    Drawer.prototype.canvas = function (canvas) {
        if (canvas === undefined) {
            return this._canvas;
        }
        canvas = coerceD3_1.coerceExternalD3(canvas);
        this._canvas = canvas;
        this._renderArea = null;
        this._cachedSelectionValid = false;
        return this;
    };
    Drawer.prototype.renderArea = function (area) {
        if (area === undefined) {
            return this._renderArea;
        }
        area = coerceD3_1.coerceExternalD3(area);
        this._renderArea = area;
        this._canvas = null;
        this._cachedSelectionValid = false;
        return this;
    };
    /**
     * Removes the Drawer and its renderArea
     */
    Drawer.prototype.remove = function () {
        if (this.renderArea() != null) {
            this.renderArea().remove();
        }
    };
    /**
     * Binds data to selection
     *
     * @param{any[]} data The data to be drawn
     */
    Drawer.prototype._bindSelectionData = function (data) {
        var dataElementsUpdate = this.selection().data(data);
        var dataElements = dataElementsUpdate
            .enter()
            .append(this._svgElementName)
            .merge(dataElementsUpdate);
        dataElementsUpdate.exit().remove();
        this._applyDefaultAttributes(dataElements);
    };
    Drawer.prototype._applyDefaultAttributes = function (selection) {
        if (this._className != null) {
            selection.classed(this._className, true);
        }
    };
    /**
     * Draws data using one step
     *
     * @param{AppliedDrawStep} step The step, how data should be drawn.
     */
    Drawer.prototype._drawStep = function (step) {
        var selection = this.selection();
        var colorAttributes = ["fill", "stroke"];
        colorAttributes.forEach(function (colorAttribute) {
            if (step.attrToAppliedProjector[colorAttribute] != null) {
                selection.attr(colorAttribute, step.attrToAppliedProjector[colorAttribute]);
            }
        });
        step.animator.animate(selection, step.attrToAppliedProjector);
        if (this._className != null) {
            this.selection().classed(this._className, true);
        }
    };
    Drawer.prototype._drawStepCanvas = function (data, step) {
        Utils.Window.warn("canvas rendering not yet implemented on " + this.constructor.name);
    };
    Drawer.prototype._appliedProjectors = function (attrToProjector) {
        var _this = this;
        var modifiedAttrToProjector = {};
        Object.keys(attrToProjector).forEach(function (attr) {
            modifiedAttrToProjector[attr] =
                function (datum, index) { return attrToProjector[attr](datum, index, _this._dataset); };
        });
        return modifiedAttrToProjector;
    };
    /**
     * Calculates the total time it takes to use the input drawSteps to draw the input data
     *
     * @param {any[]} data The data that would have been drawn
     * @param {Drawers.DrawStep[]} drawSteps The DrawSteps to use
     * @returns {number} The total time it takes to draw
     */
    Drawer.prototype.totalDrawTime = function (data, drawSteps) {
        var delay = 0;
        drawSteps.forEach(function (drawStep, i) {
            delay += drawStep.animator.totalTime(data.length);
        });
        return delay;
    };
    /**
     * Draws the data into the renderArea using the spefic steps and metadata
     *
     * @param{any[]} data The data to be drawn
     * @param{DrawStep[]} drawSteps The list of steps, which needs to be drawn
     */
    Drawer.prototype.draw = function (data, drawSteps) {
        var _this = this;
        var appliedDrawSteps = drawSteps.map(function (dr) {
            var attrToAppliedProjector = _this._appliedProjectors(dr.attrToProjector);
            return {
                attrToAppliedProjector: attrToAppliedProjector,
                animator: dr.animator,
            };
        });
        if (this._renderArea != null) {
            this._bindSelectionData(data);
            this._cachedSelectionValid = false;
            var delay_1 = 0;
            appliedDrawSteps.forEach(function (drawStep, i) {
                Utils.Window.setTimeout(function () { return _this._drawStep(drawStep); }, delay_1);
                delay_1 += drawStep.animator.totalTime(data.length);
            });
        }
        else if (this._canvas != null) {
            // don't support animations for now; just draw the last draw step immediately
            var lastDrawStep_1 = appliedDrawSteps[appliedDrawSteps.length - 1];
            Utils.Window.setTimeout(function () { return _this._drawStepCanvas(data, lastDrawStep_1); }, 0);
        }
        else {
            throw new Error("Drawer's canvas and renderArea are both null!");
        }
        return this;
    };
    Drawer.prototype.selection = function () {
        this.maybeRefreshCache();
        return this._cachedSelection;
    };
    /**
     * Returns the CSS selector for this Drawer's visual elements.
     */
    Drawer.prototype.selector = function () {
        return this._svgElementName;
    };
    /**
     * Returns the D3 selection corresponding to the datum with the specified index.
     */
    Drawer.prototype.selectionForIndex = function (index) {
        this.maybeRefreshCache();
        if (this._cachedSelectionNodes != null) {
            return d3.select(this._cachedSelectionNodes[index]);
        }
        else {
            return null;
        }
    };
    Drawer.prototype.maybeRefreshCache = function () {
        if (!this._cachedSelectionValid) {
            if (this._renderArea != null) {
                this._cachedSelection = this.renderArea().selectAll(this.selector());
                this._cachedSelectionNodes = this._cachedSelection.nodes();
            }
            else {
                this._cachedSelection = null;
                this._cachedSelectionNodes = null;
            }
            this._cachedSelectionValid = true;
        }
    };
    return Drawer;
}());
exports.Drawer = Drawer;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
/**
 * Creates a formatter for currency values.
 *
 * @param {number} [precision] The number of decimal places to show (default 2).
 * @param {string} [symbol] The currency symbol to use (default "$").
 * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
 *
 * @returns {Formatter} A formatter for currency values.
 */
function currency(precision, symbol, prefix) {
    if (precision === void 0) { precision = 2; }
    if (symbol === void 0) { symbol = "$"; }
    if (prefix === void 0) { prefix = true; }
    var fixedFormatter = fixed(precision);
    return function (d) {
        var formattedValue = fixedFormatter(Math.abs(d));
        if (formattedValue !== "") {
            if (prefix) {
                formattedValue = symbol + formattedValue;
            }
            else {
                formattedValue += symbol;
            }
            if (d < 0) {
                formattedValue = "-" + formattedValue;
            }
        }
        return formattedValue;
    };
}
exports.currency = currency;
/**
 * Creates a formatter that displays exactly [precision] decimal places.
 *
 * @param {number} [precision] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
 */
function fixed(precision) {
    if (precision === void 0) { precision = 3; }
    verifyPrecision(precision);
    return function (d) { return d.toFixed(precision); };
}
exports.fixed = fixed;
/**
 * Creates a formatter that formats numbers to show no more than
 * [maxNumberOfDecimalPlaces] decimal places. All other values are stringified.
 *
 * @param {number} [maxNumberOfDecimalPlaces] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter for general values.
 */
function general(maxNumberOfDecimalPlaces) {
    if (maxNumberOfDecimalPlaces === void 0) { maxNumberOfDecimalPlaces = 3; }
    verifyPrecision(maxNumberOfDecimalPlaces);
    return function (d) {
        if (typeof d === "number") {
            var multiplier = Math.pow(10, maxNumberOfDecimalPlaces);
            return String(Math.round(d * multiplier) / multiplier);
        }
        else {
            return String(d);
        }
    };
}
exports.general = general;
/**
 * Creates a formatter that stringifies its input.
 *
 * @returns {Formatter} A formatter that stringifies its input.
 */
function identity() {
    return function (d) { return String(d); };
}
exports.identity = identity;
/**
 * Creates a formatter for percentage values.
 * Multiplies the input by 100 and appends "%".
 *
 * @param {number} [precision] The number of decimal places to show (default 0).
 *
 * @returns {Formatter} A formatter for percentage values.
 */
function percentage(precision) {
    if (precision === void 0) { precision = 0; }
    var fixedFormatter = fixed(precision);
    return function (d) {
        var valToFormat = d * 100;
        // Account for float imprecision
        var valString = d.toString();
        var integerPowerTen = Math.pow(10, valString.length - (valString.indexOf(".") + 1));
        valToFormat = parseInt((valToFormat * integerPowerTen).toString(), 10) / integerPowerTen;
        return fixedFormatter(valToFormat) + "%";
    };
}
exports.percentage = percentage;
/**
 * Creates a formatter for values that displays [numberOfSignificantFigures] significant figures
 * and puts SI notation.
 *
 * @param {number} [numberOfSignificantFigures] The number of significant figures to show (default 3).
 *
 * @returns {Formatter} A formatter for SI values.
 */
function siSuffix(numberOfSignificantFigures) {
    if (numberOfSignificantFigures === void 0) { numberOfSignificantFigures = 3; }
    verifyPrecision(numberOfSignificantFigures);
    return function (d) { return d3.format("." + numberOfSignificantFigures + "s")(d); };
}
exports.siSuffix = siSuffix;
/**
 * Creates a formatter for values that displays abbreviated values
 * and uses standard short scale suffixes
 * - K - thousands - 10 ^ 3
 * - M - millions - 10 ^ 6
 * - B - billions - 10 ^ 9
 * - T - trillions - 10 ^ 12
 * - Q - quadrillions - 10 ^ 15
 *
 * Numbers with a magnitude outside of (10 ^ (-precision), 10 ^ 15) are shown using
 * scientific notation to avoid creating extremely long decimal strings.
 *
 * @param {number} [precision] the number of decimal places to show (default 3)
 * @returns {Formatter} A formatter with short scale formatting
 */
function shortScale(precision) {
    if (precision === void 0) { precision = 3; }
    verifyPrecision(precision);
    var suffixes = "KMBTQ";
    var exponentFormatter = d3.format("." + precision + "e");
    var fixedFormatter = d3.format("." + precision + "f");
    var max = Math.pow(10, (3 * (suffixes.length + 1)));
    var min = Math.pow(10, -precision);
    return function (num) {
        var absNum = Math.abs(num);
        if ((absNum < min || absNum >= max) && absNum !== 0) {
            return exponentFormatter(num);
        }
        var idx = -1;
        while (absNum >= Math.pow(1000, idx + 2) && idx < (suffixes.length - 1)) {
            idx++;
        }
        var output = "";
        if (idx === -1) {
            output = fixedFormatter(num);
        }
        else {
            output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
        }
        // catch rounding by the underlying d3 formatter
        if ((num > 0 && output.substr(0, 4) === "1000") || (num < 0 && output.substr(0, 5) === "-1000")) {
            if (idx < suffixes.length - 1) {
                idx++;
                output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
            }
            else {
                output = exponentFormatter(num);
            }
        }
        return output;
    };
}
exports.shortScale = shortScale;
/**
 * Creates a multi time formatter that displays dates.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
function multiTime() {
    // Formatter tiers going from shortest time scale to largest - these were taken from d3
    // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
    var candidateFormats = [
        {
            specifier: ".%L",
            predicate: function (d) { return d.getMilliseconds() !== 0; },
        },
        {
            specifier: ":%S",
            predicate: function (d) { return d.getSeconds() !== 0; },
        },
        {
            specifier: "%I:%M",
            predicate: function (d) { return d.getMinutes() !== 0; },
        },
        {
            specifier: "%I %p",
            predicate: function (d) { return d.getHours() !== 0; },
        },
        {
            specifier: "%a %d",
            predicate: function (d) { return d.getDay() !== 0 && d.getDate() !== 1; },
        },
        {
            specifier: "%b %d",
            predicate: function (d) { return d.getDate() !== 1; },
        },
        {
            specifier: "%b",
            predicate: function (d) { return d.getMonth() !== 0; },
        },
    ];
    return function (d) {
        var acceptableFormats = candidateFormats.filter(function (candidate) { return candidate.predicate(d); });
        var specifier = acceptableFormats.length > 0
            ? acceptableFormats[0].specifier
            : "%Y";
        return d3.timeFormat(specifier)(d);
    };
}
exports.multiTime = multiTime;
/**
 * Creates a time formatter that displays time/date using given specifier.
 *
 * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
 *
 * @param {string} [specifier] The specifier for the formatter.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
function time(specifier) {
    return d3.timeFormat(specifier);
}
exports.time = time;
function verifyPrecision(precision) {
    if (precision < 0 || precision > 20) {
        throw new RangeError("Formatter precision must be between 0 and 20");
    }
    if (precision !== Math.floor(precision)) {
        throw new RangeError("Formatter precision must be an integer");
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(69));
__export(__webpack_require__(70));
__export(__webpack_require__(71));
__export(__webpack_require__(72));
__export(__webpack_require__(73));
__export(__webpack_require__(74));
__export(__webpack_require__(75));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Interactions = __webpack_require__(13);
var Utils = __webpack_require__(0);
var scale_1 = __webpack_require__(17);
var QuantitativeScale = (function (_super) {
    __extends(QuantitativeScale, _super);
    /**
     * A QuantitativeScale is a Scale that maps number-like values to numbers.
     * It is invertible and continuous.
     *
     * @constructor
     */
    function QuantitativeScale() {
        var _this = _super.call(this) || this;
        _this._tickGenerator = function (scale) { return scale.defaultTicks(); };
        _this._padProportion = 0.05;
        _this._snappingDomainEnabled = true;
        _this._paddingExceptionsProviders = new Utils.Set();
        return _this;
    }
    QuantitativeScale.prototype.autoDomain = function () {
        this._domainMin = null;
        this._domainMax = null;
        _super.prototype.autoDomain.call(this);
        return this;
    };
    QuantitativeScale.prototype._autoDomainIfAutomaticMode = function () {
        if (this._domainMin != null && this._domainMax != null) {
            this._setDomain([this._domainMin, this._domainMax]);
            return;
        }
        var computedExtent = this._getExtent();
        if (this._domainMin != null) {
            var maxValue = computedExtent[1];
            if (this._domainMin >= maxValue) {
                maxValue = this._expandSingleValueDomain([this._domainMin, this._domainMin])[1];
            }
            this._setDomain([this._domainMin, maxValue]);
            return;
        }
        if (this._domainMax != null) {
            var minValue = computedExtent[0];
            if (this._domainMax <= minValue) {
                minValue = this._expandSingleValueDomain([this._domainMax, this._domainMax])[0];
            }
            this._setDomain([minValue, this._domainMax]);
            return;
        }
        _super.prototype._autoDomainIfAutomaticMode.call(this);
    };
    QuantitativeScale.prototype._getExtent = function () {
        var includedValues = this._getAllIncludedValues();
        var extent = this._defaultExtent();
        if (includedValues.length !== 0) {
            var combinedExtent = [
                Utils.Math.min(includedValues, extent[0]),
                Utils.Math.max(includedValues, extent[1]),
            ];
            extent = this._padDomain(combinedExtent);
        }
        if (this._domainMin != null) {
            extent[0] = this._domainMin;
        }
        if (this._domainMax != null) {
            extent[1] = this._domainMax;
        }
        return extent;
    };
    /**
     * Adds a padding exception provider.
     * If one end of the domain is set to an excepted value as a result of autoDomain()-ing,
     * that end of the domain will not be padded.
     *
     * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
     * @returns {QuantitativeScale} The calling QuantitativeScale.
     */
    QuantitativeScale.prototype.addPaddingExceptionsProvider = function (provider) {
        this._paddingExceptionsProviders.add(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    /**
     * Removes the padding exception provider.
     *
     * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
     * @returns {QuantitativeScale} The calling QuantitativeScale.
     */
    QuantitativeScale.prototype.removePaddingExceptionsProvider = function (provider) {
        this._paddingExceptionsProviders.delete(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.padProportion = function (padProportion) {
        if (padProportion == null) {
            return this._padProportion;
        }
        if (padProportion < 0) {
            throw new Error("padProportion must be non-negative");
        }
        this._padProportion = padProportion;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype._padDomain = function (domain) {
        var _this = this;
        if (domain[0].valueOf() === domain[1].valueOf()) {
            return this._expandSingleValueDomain(domain);
        }
        if (this._padProportion === 0) {
            return domain;
        }
        var p = this._padProportion / 2;
        var min = domain[0];
        var max = domain[1];
        var minExistsInExceptions = false;
        var maxExistsInExceptions = false;
        this._paddingExceptionsProviders.forEach(function (provider) {
            var values = provider(_this);
            values.forEach(function (value) {
                if (value.valueOf() === min.valueOf()) {
                    minExistsInExceptions = true;
                }
                if (value.valueOf() === max.valueOf()) {
                    maxExistsInExceptions = true;
                }
            });
        });
        var originalDomain = this._backingScaleDomain();
        this._backingScaleDomain(domain);
        var newMin = minExistsInExceptions ? min : this.invert(this.scale(min) - (this.scale(max) - this.scale(min)) * p);
        var newMax = maxExistsInExceptions ? max : this.invert(this.scale(max) + (this.scale(max) - this.scale(min)) * p);
        this._backingScaleDomain(originalDomain);
        if (this._snappingDomainEnabled) {
            return this._niceDomain([newMin, newMax]);
        }
        return ([newMin, newMax]);
    };
    QuantitativeScale.prototype.snappingDomainEnabled = function (snappingDomainEnabled) {
        if (snappingDomainEnabled == null) {
            return this._snappingDomainEnabled;
        }
        this._snappingDomainEnabled = snappingDomainEnabled;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype._expandSingleValueDomain = function (singleValueDomain) {
        return singleValueDomain;
    };
    /**
     * Computes the domain value corresponding to a supplied range value.
     *
     * @param {number} value: A value from the Scale's range.
     * @returns {D} The domain value corresponding to the supplied range value.
     */
    QuantitativeScale.prototype.invert = function (value) {
        throw new Error("Subclasses should override invert");
    };
    QuantitativeScale.prototype.domain = function (values) {
        if (values != null) {
            this._domainMin = values[0];
            this._domainMax = values[1];
        }
        return _super.prototype.domain.call(this, values);
    };
    QuantitativeScale.prototype.domainMin = function (domainMin) {
        if (domainMin == null) {
            return this.domain()[0];
        }
        this._domainMin = domainMin;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.domainMax = function (domainMax) {
        if (domainMax == null) {
            return this.domain()[1];
        }
        this._domainMax = domainMax;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.extentOfValues = function (values) {
        // HACKHACK: TS1.4 doesn't consider numbers to be Number-like (valueOf() returning number), so D can't be typed correctly
        var extent = d3.extent(values.filter(function (value) { return Utils.Math.isValidNumber(+value); }));
        if (extent[0] == null || extent[1] == null) {
            return [];
        }
        else {
            return extent;
        }
    };
    QuantitativeScale.prototype.zoom = function (magnifyAmount, centerValue) {
        var _this = this;
        var magnifyTransform = function (rangeValue) { return _this.invert(Interactions.zoomAt(rangeValue, magnifyAmount, centerValue)); };
        this.domain(this.range().map(magnifyTransform));
    };
    QuantitativeScale.prototype.pan = function (translateAmount) {
        var _this = this;
        var translateTransform = function (rangeValue) { return _this.invert(rangeValue + translateAmount); };
        this.domain(this.range().map(translateTransform));
    };
    QuantitativeScale.prototype.scaleTransformation = function (value) {
        throw new Error("Subclasses should override scaleTransformation");
    };
    QuantitativeScale.prototype.invertedTransformation = function (value) {
        throw new Error("Subclasses should override invertedTransformation");
    };
    QuantitativeScale.prototype.getTransformationDomain = function () {
        throw new Error("Subclasses should override getTransformationDomain");
    };
    QuantitativeScale.prototype._setDomain = function (values) {
        var isNaNOrInfinity = function (x) { return Utils.Math.isNaN(x) || x === Infinity || x === -Infinity; };
        if (isNaNOrInfinity(values[0]) || isNaNOrInfinity(values[1])) {
            Utils.Window.warn("Warning: QuantitativeScales cannot take NaN or Infinity as a domain value. Ignoring.");
            return;
        }
        _super.prototype._setDomain.call(this, values);
    };
    /**
     * Gets the array of tick values generated by the default algorithm.
     */
    QuantitativeScale.prototype.defaultTicks = function () {
        throw new Error("Subclasses should override _getDefaultTicks");
    };
    /**
     * Gets an array of tick values spanning the domain.
     *
     * @returns {D[]}
     */
    QuantitativeScale.prototype.ticks = function () {
        return this._tickGenerator(this);
    };
    /**
     * Given a domain, expands its domain onto "nice" values, e.g. whole
     * numbers.
     */
    QuantitativeScale.prototype._niceDomain = function (domain, count) {
        throw new Error("Subclasses should override _niceDomain");
    };
    QuantitativeScale.prototype._defaultExtent = function () {
        throw new Error("Subclasses should override _defaultExtent");
    };
    QuantitativeScale.prototype.tickGenerator = function (generator) {
        if (generator == null) {
            return this._tickGenerator;
        }
        else {
            this._tickGenerator = generator;
            return this;
        }
    };
    return QuantitativeScale;
}(scale_1.Scale));
QuantitativeScale._DEFAULT_NUM_TICKS = 10;
exports.QuantitativeScale = QuantitativeScale;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var d3 = __webpack_require__(1);
/**
 * Coerce possibly external d3 instance into our own instance of d3 so we can use d3-selection-multi.
 * See https://github.com/d3/d3-selection-multi/issues/11 for why we have to do this.
 *
 * Any public facing API that accepts a d3 selection should first pass that user-supplied selection
 * through here - this ensures all selection objects that go through the Plottable codebase are "vetted".
 */
function coerceExternalD3(externalD3Selection) {
    // if .attrs isn't defined; convert the selection
    if (externalD3Selection.attrs == null) {
        if (externalD3Selection.nodes == null) {
            // nodes isn't defined; this is probably a d3v3 selection. handle it accordingly
            var nodes_1 = [];
            externalD3Selection.each(function () {
                nodes_1.push(this);
            });
            return d3.selectAll(nodes_1);
        }
        else {
            return d3.selectAll(externalD3Selection.nodes());
        }
    }
    else {
        return externalD3Selection;
    }
}
exports.coerceExternalD3 = coerceExternalD3;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(66));
__export(__webpack_require__(67));
__export(__webpack_require__(68));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(76));
__export(__webpack_require__(77));
__export(__webpack_require__(32));
__export(__webpack_require__(78));
__export(__webpack_require__(79));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Interaction = (function () {
    function Interaction() {
        var _this = this;
        this._anchorCallback = function (component) { return _this._anchor(component); };
        this._enabled = true;
    }
    Interaction.prototype._anchor = function (component) {
        this._isAnchored = true;
    };
    Interaction.prototype._unanchor = function () {
        this._isAnchored = false;
    };
    /**
     * Attaches this Interaction to a Component.
     * If the Interaction was already attached to a Component, it first detaches itself from the old Component.
     *
     * @param {Component} component
     * @returns {Interaction} The calling Interaction.
     */
    Interaction.prototype.attachTo = function (component) {
        this._disconnect();
        this._componentAttachedTo = component;
        this._connect();
        return this;
    };
    Interaction.prototype._connect = function () {
        if (this.enabled() && this._componentAttachedTo != null && !this._isAnchored) {
            this._componentAttachedTo.onAnchor(this._anchorCallback);
        }
    };
    /**
     * Detaches this Interaction from the Component.
     * This Interaction can be reused.
     *
     * @param {Component} component
     * @returns {Interaction} The calling Interaction.
     */
    Interaction.prototype.detachFrom = function (component) {
        this._disconnect();
        this._componentAttachedTo = null;
        return this;
    };
    Interaction.prototype._disconnect = function () {
        if (this._isAnchored) {
            this._unanchor();
        }
        if (this._componentAttachedTo != null) {
            this._componentAttachedTo.offAnchor(this._anchorCallback);
        }
    };
    Interaction.prototype.enabled = function (enabled) {
        if (enabled == null) {
            return this._enabled;
        }
        this._enabled = enabled;
        if (this._enabled) {
            this._connect();
        }
        else {
            this._disconnect();
        }
        return this;
    };
    /**
     * Translates an <svg>-coordinate-space point to Component-space coordinates.
     *
     * @param {Point} p A Point in <svg>-space coordinates.
     * @return {Point} The same location in Component-space coordinates.
     */
    Interaction.prototype._translateToComponentSpace = function (p) {
        var origin = this._componentAttachedTo.originToRoot();
        return {
            x: p.x - origin.x,
            y: p.y - origin.y,
        };
    };
    /**
     * Checks whether a Component-coordinate-space Point is inside the Component.
     *
     * @param {Point} p A Point in Compoennt-space coordinates.
     * @return {boolean} Whether or not the point is inside the Component.
     */
    Interaction.prototype._isInsideComponent = function (p) {
        return 0 <= p.x && 0 <= p.y
            && p.x <= this._componentAttachedTo.width()
            && p.y <= this._componentAttachedTo.height();
    };
    return Interaction;
}());
exports.Interaction = Interaction;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var plot_1 = __webpack_require__(2);
var XYPlot = (function (_super) {
    __extends(XYPlot, _super);
    /**
     * An XYPlot is a Plot that displays data along two primary directions, X and Y.
     *
     * @constructor
     * @param {Scale} xScale The x scale to use.
     * @param {Scale} yScale The y scale to use.
     */
    function XYPlot() {
        var _this = _super.call(this) || this;
        _this._autoAdjustXScaleDomain = false;
        _this._autoAdjustYScaleDomain = false;
        _this._deferredRendering = false;
        _this._cachedDomainX = [null, null];
        _this._cachedDomainY = [null, null];
        _this.addClass("xy-plot");
        _this._adjustYDomainOnChangeFromXCallback = function (scale) { return _this._adjustYDomainOnChangeFromX(); };
        _this._adjustXDomainOnChangeFromYCallback = function (scale) { return _this._adjustXDomainOnChangeFromY(); };
        var _deltaX = 0;
        var _deltaY = 0;
        var _scalingX = 1;
        var _scalingY = 1;
        var _lastSeenDomainX = [null, null];
        var _lastSeenDomainY = [null, null];
        var _timeoutReference = 0;
        var _deferredRenderingTimeout = 500;
        var _registerDeferredRendering = function () {
            if (_this._renderArea == null) {
                return;
            }
            _this._renderArea.attr("transform", "translate(" + _deltaX + ", " + _deltaY + ")" +
                "scale(" + _scalingX + ", " + _scalingY + ")");
            clearTimeout(_timeoutReference);
            _timeoutReference = setTimeout(function () {
                _this._cachedDomainX = _lastSeenDomainX;
                _this._cachedDomainY = _lastSeenDomainY;
                _deltaX = 0;
                _deltaY = 0;
                _scalingX = 1;
                _scalingY = 1;
                _this.render();
                _this._renderArea.attr("transform", "translate(0, 0) scale(1, 1)");
            }, _deferredRenderingTimeout);
        };
        var _lazyDomainChangeCallbackX = function (scale) {
            if (!_this._isAnchored) {
                return;
            }
            _lastSeenDomainX = scale.domain();
            _scalingX = (scale.scale(_this._cachedDomainX[1]) - scale.scale(_this._cachedDomainX[0])) /
                (scale.scale(_lastSeenDomainX[1]) - scale.scale(_lastSeenDomainX[0])) || 1;
            _deltaX = scale.scale(_this._cachedDomainX[0]) - scale.scale(_lastSeenDomainX[0]) || 0;
            _registerDeferredRendering();
        };
        var _lazyDomainChangeCallbackY = function (scale) {
            if (!_this._isAnchored) {
                return;
            }
            _lastSeenDomainY = scale.domain();
            _scalingY = (scale.scale(_this._cachedDomainY[1]) - scale.scale(_this._cachedDomainY[0])) /
                (scale.scale(_lastSeenDomainY[1]) - scale.scale(_lastSeenDomainY[0])) || 1;
            _deltaY = scale.scale(_this._cachedDomainY[0]) - scale.scale(_lastSeenDomainY[0]) * _scalingY || 0;
            _registerDeferredRendering();
        };
        _this._renderCallback = function (scale) {
            if (_this.deferredRendering() && _this.x() && _this.x().scale === scale) {
                _lazyDomainChangeCallbackX(scale);
            }
            else if (_this.deferredRendering() && _this.y() && _this.y().scale === scale) {
                _lazyDomainChangeCallbackY(scale);
            }
            else {
                _this.render();
            }
        };
        return _this;
    }
    XYPlot.prototype.deferredRendering = function (deferredRendering) {
        if (deferredRendering == null) {
            return this._deferredRendering;
        }
        if (deferredRendering && this._isAnchored) {
            if (this.x() && this.x().scale) {
                this._cachedDomainX = this.x().scale.domain();
            }
            if (this.y() && this.y().scale) {
                this._cachedDomainY = this.y().scale.domain();
            }
        }
        this._deferredRendering = deferredRendering;
        return this;
    };
    XYPlot.prototype.x = function (x, xScale) {
        if (x == null) {
            return this._propertyBindings.get(XYPlot._X_KEY);
        }
        this._bindProperty(XYPlot._X_KEY, x, xScale);
        var width = this.width();
        if (xScale != null && width != null) {
            xScale.range([0, width]);
        }
        if (this._autoAdjustYScaleDomain) {
            this._updateYExtentsAndAutodomain();
        }
        this.render();
        return this;
    };
    XYPlot.prototype.y = function (y, yScale) {
        if (y == null) {
            return this._propertyBindings.get(XYPlot._Y_KEY);
        }
        this._bindProperty(XYPlot._Y_KEY, y, yScale);
        var height = this.height();
        if (yScale != null && height != null) {
            if (yScale instanceof Scales.Category) {
                yScale.range([0, height]);
            }
            else {
                yScale.range([height, 0]);
            }
        }
        if (this._autoAdjustXScaleDomain) {
            this._updateXExtentsAndAutodomain();
        }
        this.render();
        return this;
    };
    XYPlot.prototype._filterForProperty = function (property) {
        if (property === "x" && this._autoAdjustXScaleDomain) {
            return this._makeFilterByProperty("y");
        }
        else if (property === "y" && this._autoAdjustYScaleDomain) {
            return this._makeFilterByProperty("x");
        }
        return null;
    };
    XYPlot.prototype._makeFilterByProperty = function (property) {
        var binding = this._propertyBindings.get(property);
        if (binding != null) {
            var accessor_1 = binding.accessor;
            var scale_1 = binding.scale;
            if (scale_1 != null) {
                return function (datum, index, dataset) {
                    var range = scale_1.range();
                    return Utils.Math.inRange(scale_1.scale(accessor_1(datum, index, dataset)), range[0], range[1]);
                };
            }
        }
        return null;
    };
    XYPlot.prototype._uninstallScaleForKey = function (scale, key) {
        _super.prototype._uninstallScaleForKey.call(this, scale, key);
        var adjustCallback = key === XYPlot._X_KEY ? this._adjustYDomainOnChangeFromXCallback
            : this._adjustXDomainOnChangeFromYCallback;
        scale.offUpdate(adjustCallback);
    };
    XYPlot.prototype._installScaleForKey = function (scale, key) {
        _super.prototype._installScaleForKey.call(this, scale, key);
        var adjustCallback = key === XYPlot._X_KEY ? this._adjustYDomainOnChangeFromXCallback
            : this._adjustXDomainOnChangeFromYCallback;
        scale.onUpdate(adjustCallback);
    };
    XYPlot.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.x().scale) {
            this.x().scale.offUpdate(this._adjustYDomainOnChangeFromXCallback);
        }
        if (this.y().scale) {
            this.y().scale.offUpdate(this._adjustXDomainOnChangeFromYCallback);
        }
        return this;
    };
    XYPlot.prototype.autorangeMode = function (autorangeMode) {
        if (autorangeMode == null) {
            if (this._autoAdjustXScaleDomain) {
                return "x";
            }
            if (this._autoAdjustYScaleDomain) {
                return "y";
            }
            return "none";
        }
        switch (autorangeMode) {
            case "x":
                this._autoAdjustXScaleDomain = true;
                this._autoAdjustYScaleDomain = false;
                this._adjustXDomainOnChangeFromY();
                break;
            case "y":
                this._autoAdjustXScaleDomain = false;
                this._autoAdjustYScaleDomain = true;
                this._adjustYDomainOnChangeFromX();
                break;
            case "none":
                this._autoAdjustXScaleDomain = false;
                this._autoAdjustYScaleDomain = false;
                break;
            default:
                throw new Error("Invalid scale name '" + autorangeMode + "', must be 'x', 'y' or 'none'");
        }
        return this;
    };
    XYPlot.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        var xBinding = this.x();
        var xScale = xBinding && xBinding.scale;
        if (xScale != null) {
            xScale.range([0, this.width()]);
        }
        var yBinding = this.y();
        var yScale = yBinding && yBinding.scale;
        if (yScale != null) {
            if (yScale instanceof Scales.Category) {
                yScale.range([0, this.height()]);
            }
            else {
                yScale.range([this.height(), 0]);
            }
        }
        return this;
    };
    XYPlot.prototype._updateXExtentsAndAutodomain = function () {
        this._updateExtentsForProperty("x");
        var xScale = this.x().scale;
        if (xScale != null) {
            xScale.autoDomain();
        }
    };
    XYPlot.prototype._updateYExtentsAndAutodomain = function () {
        this._updateExtentsForProperty("y");
        var yScale = this.y().scale;
        if (yScale != null) {
            yScale.autoDomain();
        }
    };
    /**
     * Adjusts the domains of both X and Y scales to show all data.
     * This call does not override the autorange() behavior.
     *
     * @returns {XYPlot} The calling XYPlot.
     */
    XYPlot.prototype.showAllData = function () {
        this._updateXExtentsAndAutodomain();
        this._updateYExtentsAndAutodomain();
        return this;
    };
    XYPlot.prototype._adjustYDomainOnChangeFromX = function () {
        if (!this._projectorsReady()) {
            return;
        }
        if (this._autoAdjustYScaleDomain) {
            this._updateYExtentsAndAutodomain();
        }
    };
    XYPlot.prototype._adjustXDomainOnChangeFromY = function () {
        if (!this._projectorsReady()) {
            return;
        }
        if (this._autoAdjustXScaleDomain) {
            this._updateXExtentsAndAutodomain();
        }
    };
    XYPlot.prototype._projectorsReady = function () {
        var xBinding = this.x();
        var yBinding = this.y();
        return xBinding != null &&
            xBinding.accessor != null &&
            yBinding != null &&
            yBinding.accessor != null;
    };
    XYPlot.prototype._pixelPoint = function (datum, index, dataset) {
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        return { x: xProjector(datum, index, dataset), y: yProjector(datum, index, dataset) };
    };
    XYPlot.prototype._getDataToDraw = function () {
        var _this = this;
        var dataToDraw = _super.prototype._getDataToDraw.call(this);
        var definedFunction = function (d, i, dataset) {
            var positionX = plot_1.Plot._scaledAccessor(_this.x())(d, i, dataset);
            var positionY = plot_1.Plot._scaledAccessor(_this.y())(d, i, dataset);
            return Utils.Math.isValidNumber(positionX) &&
                Utils.Math.isValidNumber(positionY);
        };
        this.datasets().forEach(function (dataset) {
            dataToDraw.set(dataset, dataToDraw.get(dataset).filter(function (d, i) { return definedFunction(d, i, dataset); }));
        });
        return dataToDraw;
    };
    return XYPlot;
}(plot_1.Plot));
XYPlot._X_KEY = "x";
XYPlot._Y_KEY = "y";
exports.XYPlot = XYPlot;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(36));
__export(__webpack_require__(22));
__export(__webpack_require__(37));
__export(__webpack_require__(80));
__export(__webpack_require__(38));
__export(__webpack_require__(81));
__export(__webpack_require__(82));
__export(__webpack_require__(83));
__export(__webpack_require__(84));
__export(__webpack_require__(85));
__export(__webpack_require__(86));
__export(__webpack_require__(87));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
var Scale = (function () {
    /**
     * A Scale is a function (in the mathematical sense) that maps values from a domain to a range.
     *
     * @constructor
     */
    function Scale() {
        this._autoDomainAutomatically = true;
        this._domainModificationInProgress = false;
        this._callbacks = new Utils.CallbackSet();
        this._includedValuesProviders = new Utils.Set();
    }
    /**
     * Given an array of potential domain values, computes the extent of those values.
     *
     * @param {D[]} values
     * @returns {D[]} The extent of the input values.
     */
    Scale.prototype.extentOfValues = function (values) {
        return []; // this should be overwritten
    };
    Scale.prototype._getAllIncludedValues = function () {
        var _this = this;
        var providerArray = [];
        this._includedValuesProviders.forEach(function (provider) {
            var extents = provider(_this);
            providerArray = providerArray.concat(extents);
        });
        return providerArray;
    };
    Scale.prototype._getExtent = function () {
        return []; // this should be overwritten
    };
    /**
     * Adds a callback to be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.onUpdate = function (callback) {
        this._callbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.offUpdate = function (callback) {
        this._callbacks.delete(callback);
        return this;
    };
    Scale.prototype._dispatchUpdate = function () {
        this._callbacks.callCallbacks(this);
    };
    /**
     * Sets the Scale's domain so that it spans the Extents of all its ExtentsProviders.
     *
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.autoDomain = function () {
        this._autoDomainAutomatically = true;
        this._setDomain(this._getExtent());
        return this;
    };
    Scale.prototype._autoDomainIfAutomaticMode = function () {
        if (this._autoDomainAutomatically) {
            this.autoDomain();
        }
    };
    /**
     * Computes the range value corresponding to a given domain value.
     *
     * @param {D} value
     * @returns {R} The range value corresponding to the supplied domain value.
     */
    Scale.prototype.scale = function (value) {
        throw new Error("Subclasses should override scale");
    };
    Scale.prototype.domain = function (values) {
        if (values == null) {
            return this._getDomain();
        }
        else {
            this._autoDomainAutomatically = false;
            this._setDomain(values);
            return this;
        }
    };
    Scale.prototype._getDomain = function () {
        throw new Error("Subclasses should override _getDomain");
    };
    Scale.prototype._setDomain = function (values) {
        if (!this._domainModificationInProgress) {
            this._domainModificationInProgress = true;
            this._backingScaleDomain(values);
            this._dispatchUpdate();
            this._domainModificationInProgress = false;
        }
    };
    Scale.prototype._backingScaleDomain = function (values) {
        throw new Error("Subclasses should override _backingDomain");
    };
    Scale.prototype.range = function (values) {
        if (values == null) {
            return this._getRange();
        }
        else {
            this._setRange(values);
            return this;
        }
    };
    Scale.prototype._getRange = function () {
        throw new Error("Subclasses should override _getRange");
    };
    Scale.prototype._setRange = function (values) {
        throw new Error("Subclasses should override _setRange");
    };
    /**
     * Adds an IncludedValuesProvider to the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.addIncludedValuesProvider = function (provider) {
        this._includedValuesProviders.add(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    /**
     * Removes the IncludedValuesProvider from the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.removeIncludedValuesProvider = function (provider) {
        this._includedValuesProviders.delete(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    return Scale;
}());
exports.Scale = Scale;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(118));
__export(__webpack_require__(119));
__export(__webpack_require__(120));
__export(__webpack_require__(121));
//# sourceMappingURL=index.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var component_1 = __webpack_require__(5);
var Formatters = __webpack_require__(8);
var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
exports.AxisOrientation = makeEnum_1.makeEnum(["bottom", "left", "right", "top"]);
var Axis = (function (_super) {
    __extends(Axis, _super);
    /**
     * Constructs an Axis.
     * An Axis is a visual representation of a Scale.
     *
     * @constructor
     * @param {Scale} scale
     * @param {AxisOrientation} orientation Orientation of this Axis.
     */
    function Axis(scale, orientation) {
        var _this = _super.call(this) || this;
        _this._endTickLength = 5;
        _this._innerTickLength = 5;
        _this._tickLabelPadding = 10;
        _this._margin = 15;
        _this._showEndTickLabels = false;
        _this._annotationsEnabled = false;
        _this._annotationTierCount = 1;
        if (scale == null || orientation == null) {
            throw new Error("Axis requires a scale and orientation");
        }
        _this._scale = scale;
        _this.orientation(orientation);
        _this._setDefaultAlignment();
        _this.addClass("axis");
        if (_this.isHorizontal()) {
            _this.addClass("x-axis");
        }
        else {
            _this.addClass("y-axis");
        }
        _this.formatter(Formatters.identity());
        _this._rescaleCallback = function (newScale) { return _this._rescale(); };
        _this._scale.onUpdate(_this._rescaleCallback);
        _this._annotatedTicks = [];
        _this._annotationFormatter = Formatters.identity();
        return _this;
    }
    Axis.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._scale.offUpdate(this._rescaleCallback);
    };
    Axis.prototype._computeWidth = function () {
        // to be overridden by subclass logic
        return this._maxLabelTickLength();
    };
    Axis.prototype._computeHeight = function () {
        // to be overridden by subclass logic
        return this._maxLabelTickLength();
    };
    Axis.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var requestedWidth = 0;
        var requestedHeight = 0;
        if (this.isHorizontal()) {
            requestedHeight = this._computeHeight() + this._margin;
            if (this.annotationsEnabled()) {
                var tierHeight = this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
                requestedHeight += tierHeight * this.annotationTierCount();
            }
        }
        else {
            requestedWidth = this._computeWidth() + this._margin;
            if (this.annotationsEnabled()) {
                var tierHeight = this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
                requestedWidth += tierHeight * this.annotationTierCount();
            }
        }
        return {
            minWidth: requestedWidth,
            minHeight: requestedHeight,
        };
    };
    Axis.prototype.fixedHeight = function () {
        return this.isHorizontal();
    };
    Axis.prototype.fixedWidth = function () {
        return !this.isHorizontal();
    };
    Axis.prototype._rescale = function () {
        // default implementation; subclasses may call redraw() here
        this.render();
    };
    Axis.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (this.isHorizontal()) {
            this._scale.range([0, this.width()]);
        }
        else {
            this._scale.range([this.height(), 0]);
        }
        return this;
    };
    Axis.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._tickMarkContainer = this.content().append("g")
            .classed(Axis.TICK_MARK_CLASS + "-container", true);
        this._tickLabelContainer = this.content().append("g")
            .classed(Axis.TICK_LABEL_CLASS + "-container", true);
        this._baseline = this.content().append("line").classed("baseline", true);
        this._annotationContainer = this.content().append("g")
            .classed("annotation-container", true);
        this._annotationContainer.append("g").classed("annotation-line-container", true);
        this._annotationContainer.append("g").classed("annotation-circle-container", true);
        this._annotationContainer.append("g").classed("annotation-rect-container", true);
        var annotationLabelContainer = this._annotationContainer.append("g").classed("annotation-label-container", true);
        var typesetterContext = new Typesetter.SvgContext(annotationLabelContainer.node());
        this._annotationMeasurer = new Typesetter.CacheMeasurer(typesetterContext);
        this._annotationWriter = new Typesetter.Writer(this._annotationMeasurer, typesetterContext);
    };
    /*
     * Function for generating tick values in data-space (as opposed to pixel values).
     * To be implemented by subclasses.
     */
    Axis.prototype._getTickValues = function () {
        return [];
    };
    /**
     * Render tick marks, baseline, and annotations. Should be super called by subclasses and then overridden to draw
     * other relevant aspects of this Axis.
     */
    Axis.prototype.renderImmediately = function () {
        var tickMarkValues = this._getTickValues();
        var tickMarksUpdate = this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS).data(tickMarkValues);
        var tickMarks = tickMarksUpdate
            .enter()
            .append("line")
            .classed(Axis.TICK_MARK_CLASS, true)
            .merge(tickMarksUpdate);
        tickMarks.attrs(this._generateTickMarkAttrHash());
        d3.select(tickMarks.nodes()[0]).classed(Axis.END_TICK_MARK_CLASS, true)
            .attrs(this._generateTickMarkAttrHash(true));
        d3.select(tickMarks.nodes()[tickMarkValues.length - 1]).classed(Axis.END_TICK_MARK_CLASS, true)
            .attrs(this._generateTickMarkAttrHash(true));
        tickMarksUpdate.exit().remove();
        this._baseline.attrs(this._generateBaselineAttrHash());
        if (this.annotationsEnabled()) {
            this._drawAnnotations();
        }
        else {
            this._removeAnnotations();
        }
        return this;
    };
    Axis.prototype.annotatedTicks = function (annotatedTicks) {
        if (annotatedTicks == null) {
            return this._annotatedTicks;
        }
        this._annotatedTicks = annotatedTicks;
        this.render();
        return this;
    };
    Axis.prototype.annotationFormatter = function (annotationFormatter) {
        if (annotationFormatter == null) {
            return this._annotationFormatter;
        }
        this._annotationFormatter = annotationFormatter;
        this.render();
        return this;
    };
    Axis.prototype.annotationsEnabled = function (annotationsEnabled) {
        if (annotationsEnabled == null) {
            return this._annotationsEnabled;
        }
        this._annotationsEnabled = annotationsEnabled;
        this.redraw();
        return this;
    };
    Axis.prototype.annotationTierCount = function (annotationTierCount) {
        if (annotationTierCount == null) {
            return this._annotationTierCount;
        }
        if (annotationTierCount < 0) {
            throw new Error("annotationTierCount cannot be negative");
        }
        this._annotationTierCount = annotationTierCount;
        this.redraw();
        return this;
    };
    Axis.prototype._drawAnnotations = function () {
        var _this = this;
        var labelPadding = Axis._ANNOTATION_LABEL_PADDING;
        var measurements = new Utils.Map();
        var annotatedTicks = this._annotatedTicksToRender();
        annotatedTicks.forEach(function (annotatedTick) {
            var measurement = _this._annotationMeasurer.measure(_this.annotationFormatter()(annotatedTick));
            var paddedMeasurement = {
                width: measurement.width + 2 * labelPadding,
                height: measurement.height + 2 * labelPadding,
            };
            measurements.set(annotatedTick, paddedMeasurement);
        });
        var tierHeight = this._annotationMeasurer.measure().height + 2 * labelPadding;
        var annotationToTier = this._annotationToTier(measurements);
        var hiddenAnnotations = new Utils.Set();
        var axisHeight = this.isHorizontal() ? this.height() : this.width();
        var axisHeightWithoutMarginAndAnnotations = this._coreSize();
        var numTiers = Math.min(this.annotationTierCount(), Math.floor((axisHeight - axisHeightWithoutMarginAndAnnotations) / tierHeight));
        annotationToTier.forEach(function (tier, annotation) {
            if (tier === -1 || tier >= numTiers) {
                hiddenAnnotations.add(annotation);
            }
        });
        var bindElements = function (selection, elementName, className) {
            var elementsUpdate = selection.selectAll("." + className).data(annotatedTicks);
            var elements = elementsUpdate
                .enter()
                .append(elementName)
                .classed(className, true)
                .merge(elementsUpdate);
            elementsUpdate.exit().remove();
            return elements;
        };
        var offsetF = function (d) {
            switch (_this.orientation()) {
                case "bottom":
                case "right":
                    return annotationToTier.get(d) * tierHeight + axisHeightWithoutMarginAndAnnotations;
                case "top":
                case "left":
                    return axisHeight - axisHeightWithoutMarginAndAnnotations - annotationToTier.get(d) * tierHeight;
            }
        };
        var positionF = function (d) { return _this._scale.scale(d); };
        var visibilityF = function (d) { return hiddenAnnotations.has(d) ? "hidden" : "visible"; };
        var secondaryPosition;
        switch (this.orientation()) {
            case "bottom":
            case "right":
                secondaryPosition = 0;
                break;
            case "top":
                secondaryPosition = this.height();
                break;
            case "left":
                secondaryPosition = this.width();
                break;
        }
        var isHorizontal = this.isHorizontal();
        bindElements(this._annotationContainer.select(".annotation-line-container"), "line", Axis.ANNOTATION_LINE_CLASS)
            .attrs({
            "x1": isHorizontal ? positionF : secondaryPosition,
            "x2": isHorizontal ? positionF : offsetF,
            "y1": isHorizontal ? secondaryPosition : positionF,
            "y2": isHorizontal ? offsetF : positionF,
            visibility: visibilityF,
        });
        bindElements(this._annotationContainer.select(".annotation-circle-container"), "circle", Axis.ANNOTATION_CIRCLE_CLASS)
            .attrs({
            cx: isHorizontal ? positionF : secondaryPosition,
            cy: isHorizontal ? secondaryPosition : positionF,
            r: 3,
        });
        var rectangleOffsetF = function (d) {
            switch (_this.orientation()) {
                case "bottom":
                case "right":
                    return offsetF(d);
                case "top":
                case "left":
                    return offsetF(d) - measurements.get(d).height;
            }
        };
        bindElements(this._annotationContainer.select(".annotation-rect-container"), "rect", Axis.ANNOTATION_RECT_CLASS)
            .attrs({
            x: isHorizontal ? positionF : rectangleOffsetF,
            y: isHorizontal ? rectangleOffsetF : positionF,
            width: isHorizontal ? function (d) { return measurements.get(d).width; } : function (d) { return measurements.get(d).height; },
            height: isHorizontal ? function (d) { return measurements.get(d).height; } : function (d) { return measurements.get(d).width; },
            visibility: visibilityF,
        });
        var annotationWriter = this._annotationWriter;
        var annotationFormatter = this.annotationFormatter();
        var annotationLabels = bindElements(this._annotationContainer.select(".annotation-label-container"), "g", Axis.ANNOTATION_LABEL_CLASS);
        annotationLabels.selectAll(".text-container").remove();
        annotationLabels.attrs({
            transform: function (d) {
                var xTranslate = isHorizontal ? positionF(d) : rectangleOffsetF(d);
                var yTranslate = isHorizontal ? rectangleOffsetF(d) : positionF(d);
                return "translate(" + xTranslate + "," + yTranslate + ")";
            },
            visibility: visibilityF,
        })
            .each(function (annotationLabel) {
            annotationWriter.write(annotationFormatter(annotationLabel), isHorizontal ? measurements.get(annotationLabel).width : measurements.get(annotationLabel).height, isHorizontal ? measurements.get(annotationLabel).height : measurements.get(annotationLabel).width, {
                xAlign: "center",
                yAlign: "center",
                textRotation: isHorizontal ? 0 : 90,
            }, d3.select(this).node());
        });
    };
    Axis.prototype._annotatedTicksToRender = function () {
        var _this = this;
        var scaleRange = this._scale.range();
        return Utils.Array.uniq(this.annotatedTicks().filter(function (tick) {
            if (tick == null) {
                return false;
            }
            return Utils.Math.inRange(_this._scale.scale(tick), scaleRange[0], scaleRange[1]);
        }));
    };
    /**
     * Retrieves the size of the core pieces.
     *
     * The core pieces include the labels, the end tick marks, the inner tick marks, and the tick label padding.
     */
    Axis.prototype._coreSize = function () {
        var relevantDimension = this.isHorizontal() ? this.height() : this.width();
        var axisHeightWithoutMargin = this.isHorizontal() ? this._computeHeight() : this._computeWidth();
        return Math.min(axisHeightWithoutMargin, relevantDimension);
    };
    Axis.prototype._annotationTierHeight = function () {
        return this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
    };
    Axis.prototype._annotationToTier = function (measurements) {
        var _this = this;
        var annotationTiers = [[]];
        var annotationToTier = new Utils.Map();
        var dimension = this.isHorizontal() ? this.width() : this.height();
        this._annotatedTicksToRender().forEach(function (annotatedTick) {
            var position = _this._scale.scale(annotatedTick);
            var length = measurements.get(annotatedTick).width;
            if (position < 0 || position + length > dimension) {
                annotationToTier.set(annotatedTick, -1);
                return;
            }
            var tierHasCollision = function (testTier) { return annotationTiers[testTier].some(function (testTick) {
                var testPosition = _this._scale.scale(testTick);
                var testLength = measurements.get(testTick).width;
                return position + length >= testPosition && position <= testPosition + testLength;
            }); };
            var tier = 0;
            while (tierHasCollision(tier)) {
                tier++;
                if (annotationTiers.length === tier) {
                    annotationTiers.push([]);
                }
            }
            annotationTiers[tier].push(annotatedTick);
            annotationToTier.set(annotatedTick, tier);
        });
        return annotationToTier;
    };
    Axis.prototype._removeAnnotations = function () {
        this._annotationContainer.selectAll(".annotation-line").remove();
        this._annotationContainer.selectAll(".annotation-circle").remove();
        this._annotationContainer.selectAll(".annotation-rect").remove();
        this._annotationContainer.selectAll(".annotation-label").remove();
    };
    Axis.prototype._generateBaselineAttrHash = function () {
        var baselineAttrHash = {
            "x1": 0,
            "y1": 0,
            "x2": 0,
            "y2": 0,
        };
        switch (this._orientation) {
            case "bottom":
                baselineAttrHash["x2"] = this.width();
                break;
            case "top":
                baselineAttrHash["x2"] = this.width();
                baselineAttrHash["y1"] = this.height();
                baselineAttrHash["y2"] = this.height();
                break;
            case "left":
                baselineAttrHash["x1"] = this.width();
                baselineAttrHash["x2"] = this.width();
                baselineAttrHash["y2"] = this.height();
                break;
            case "right":
                baselineAttrHash["y2"] = this.height();
                break;
        }
        return baselineAttrHash;
    };
    Axis.prototype._generateTickMarkAttrHash = function (isEndTickMark) {
        var _this = this;
        if (isEndTickMark === void 0) { isEndTickMark = false; }
        var tickMarkAttrHash = {
            "x1": 0,
            "y1": 0,
            "x2": 0,
            "y2": 0,
        };
        var scalingFunction = function (d) { return _this._scale.scale(d); };
        if (this.isHorizontal()) {
            tickMarkAttrHash["x1"] = scalingFunction;
            tickMarkAttrHash["x2"] = scalingFunction;
        }
        else {
            tickMarkAttrHash["y1"] = scalingFunction;
            tickMarkAttrHash["y2"] = scalingFunction;
        }
        var tickLength = isEndTickMark ? this._endTickLength : this._innerTickLength;
        switch (this._orientation) {
            case "bottom":
                tickMarkAttrHash["y2"] = tickLength;
                break;
            case "top":
                tickMarkAttrHash["y1"] = this.height();
                tickMarkAttrHash["y2"] = this.height() - tickLength;
                break;
            case "left":
                tickMarkAttrHash["x1"] = this.width();
                tickMarkAttrHash["x2"] = this.width() - tickLength;
                break;
            case "right":
                tickMarkAttrHash["x2"] = tickLength;
                break;
        }
        return tickMarkAttrHash;
    };
    Axis.prototype._setDefaultAlignment = function () {
        switch (this._orientation) {
            case "bottom":
                this.yAlignment("top");
                break;
            case "top":
                this.yAlignment("bottom");
                break;
            case "left":
                this.xAlignment("right");
                break;
            case "right":
                this.xAlignment("left");
                break;
        }
    };
    /**
     * Get whether this axis is horizontal (orientation is "top" or "bottom") or vertical.
     * @returns {boolean} - true for horizontal, false for vertical.
     */
    Axis.prototype.isHorizontal = function () {
        return this._orientation === "top" || this._orientation === "bottom";
    };
    /**
     * Get the scale that this axis is associated with.
     * @returns {Scale<D, number>}
     */
    Axis.prototype.getScale = function () {
        return this._scale;
    };
    Axis.prototype.formatter = function (formatter) {
        if (formatter == null) {
            return this._formatter;
        }
        this._formatter = formatter;
        this.redraw();
        return this;
    };
    Axis.prototype.innerTickLength = function (length) {
        if (length == null) {
            return this._innerTickLength;
        }
        else {
            if (length < 0) {
                throw new Error("inner tick length must be positive");
            }
            this._innerTickLength = length;
            this.redraw();
            return this;
        }
    };
    Axis.prototype.endTickLength = function (length) {
        if (length == null) {
            return this._endTickLength;
        }
        else {
            if (length < 0) {
                throw new Error("end tick length must be positive");
            }
            this._endTickLength = length;
            this.redraw();
            return this;
        }
    };
    /**
     * Gets the maximum pixel length over all ticks on this axis.
     * @returns {number}
     */
    Axis.prototype._maxLabelTickLength = function () {
        if (this.showEndTickLabels()) {
            return Math.max(this.innerTickLength(), this.endTickLength());
        }
        else {
            return this.innerTickLength();
        }
    };
    Axis.prototype.tickLabelPadding = function (padding) {
        if (padding == null) {
            return this._tickLabelPadding;
        }
        else {
            if (padding < 0) {
                throw new Error("tick label padding must be positive");
            }
            this._tickLabelPadding = padding;
            this.redraw();
            return this;
        }
    };
    Axis.prototype.margin = function (size) {
        if (size == null) {
            return this._margin;
        }
        else {
            if (size < 0) {
                throw new Error("margin size must be positive");
            }
            this._margin = size;
            this.redraw();
            return this;
        }
    };
    Axis.prototype.orientation = function (orientation) {
        if (orientation == null) {
            return this._orientation;
        }
        else {
            // ensure backwards compatibility for older versions that supply orientation in different cases
            var newOrientationLC = orientation.toLowerCase();
            if (newOrientationLC !== "top" &&
                newOrientationLC !== "bottom" &&
                newOrientationLC !== "left" &&
                newOrientationLC !== "right") {
                throw new Error("unsupported orientation");
            }
            this._orientation = newOrientationLC;
            this.redraw();
            return this;
        }
    };
    Axis.prototype.showEndTickLabels = function (show) {
        if (show == null) {
            return this._showEndTickLabels;
        }
        this._showEndTickLabels = show;
        this.render();
        return this;
    };
    Axis.prototype._showAllTickMarks = function () {
        this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS)
            .each(function () {
            d3.select(this).style("visibility", "inherit");
        });
    };
    Axis.prototype._showAllTickLabels = function () {
        this._tickLabelContainer.selectAll("." + Axis.TICK_LABEL_CLASS)
            .each(function () {
            d3.select(this).style("visibility", "inherit");
        });
    };
    /**
     * Responsible for hiding any tick labels that break out of the bounding
     * container.
     */
    Axis.prototype._hideOverflowingTickLabels = function () {
        var boundingBox = this.element().node().getBoundingClientRect();
        var tickLabels = this._tickLabelContainer.selectAll("." + Axis.TICK_LABEL_CLASS);
        if (tickLabels.empty()) {
            return;
        }
        tickLabels.each(function (d, i) {
            if (!Utils.DOM.clientRectInside(this.getBoundingClientRect(), boundingBox)) {
                d3.select(this).style("visibility", "hidden");
            }
        });
    };
    /**
     * Hides the Tick Marks which have no corresponding Tick Labels
     */
    Axis.prototype._hideTickMarksWithoutLabel = function () {
        var visibleTickMarks = this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS);
        var visibleTickLabels = this._tickLabelContainer
            .selectAll("." + Axis.TICK_LABEL_CLASS)
            .filter(function (d, i) {
            var visibility = d3.select(this).style("visibility");
            return (visibility === "inherit") || (visibility === "visible");
        });
        var labelNumbersShown = visibleTickLabels.data();
        visibleTickMarks.each(function (e, i) {
            if (labelNumbersShown.indexOf(e) === -1) {
                d3.select(this).style("visibility", "hidden");
            }
        });
    };
    Axis.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._annotationMeasurer.reset();
    };
    return Axis;
}(component_1.Component));
/**
 * The css class applied to each end tick mark (the line on the end tick).
 */
Axis.END_TICK_MARK_CLASS = "end-tick-mark";
/**
 * The css class applied to each tick mark (the line on the tick).
 */
Axis.TICK_MARK_CLASS = "tick-mark";
/**
 * The css class applied to each tick label (the text associated with the tick).
 */
Axis.TICK_LABEL_CLASS = "tick-label";
/**
 * The css class applied to each annotation line, which extends from the axis to the rect.
 */
Axis.ANNOTATION_LINE_CLASS = "annotation-line";
/**
 * The css class applied to each annotation rect, which surrounds the annotation label.
 */
Axis.ANNOTATION_RECT_CLASS = "annotation-rect";
/**
 * The css class applied to each annotation circle, which denotes which tick is being annotated.
 */
Axis.ANNOTATION_CIRCLE_CLASS = "annotation-circle";
/**
 * The css class applied to each annotation label, which shows the formatted annotation text.
 */
Axis.ANNOTATION_LABEL_CLASS = "annotation-label";
Axis._ANNOTATION_LABEL_PADDING = 4;
exports.Axis = Axis;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

/**
 * Specifies if Plottable should show warnings.
 */
exports.SHOW_WARNINGS = true;
/**
 * Specifies if Plottable should add <title> elements to text.
 */
exports.ADD_TITLE_ELEMENTS = true;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
var Dispatcher = (function () {
    function Dispatcher() {
        this._eventToProcessingFunction = {};
        this._eventNameToCallbackSet = {};
        this._connected = false;
    }
    Dispatcher.prototype._hasNoCallbacks = function () {
        var eventNames = Object.keys(this._eventNameToCallbackSet);
        for (var i = 0; i < eventNames.length; i++) {
            if (this._eventNameToCallbackSet[eventNames[i]].size !== 0) {
                return false;
            }
        }
        return true;
    };
    Dispatcher.prototype._connect = function () {
        var _this = this;
        if (this._connected) {
            return;
        }
        Object.keys(this._eventToProcessingFunction).forEach(function (event) {
            var processingFunction = _this._eventToProcessingFunction[event];
            document.addEventListener(event, processingFunction);
        });
        this._connected = true;
    };
    Dispatcher.prototype._disconnect = function () {
        var _this = this;
        if (this._connected && this._hasNoCallbacks()) {
            Object.keys(this._eventToProcessingFunction).forEach(function (event) {
                var processingFunction = _this._eventToProcessingFunction[event];
                document.removeEventListener(event, processingFunction);
            });
            this._connected = false;
        }
    };
    Dispatcher.prototype._addCallbackForEvent = function (eventName, callback) {
        if (this._eventNameToCallbackSet[eventName] == null) {
            this._eventNameToCallbackSet[eventName] = new Utils.CallbackSet();
        }
        this._eventNameToCallbackSet[eventName].add(callback);
        this._connect();
    };
    Dispatcher.prototype._removeCallbackForEvent = function (eventName, callback) {
        if (this._eventNameToCallbackSet[eventName] != null) {
            this._eventNameToCallbackSet[eventName].delete(callback);
        }
        this._disconnect();
    };
    Dispatcher.prototype._callCallbacksForEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbackSet = this._eventNameToCallbackSet[eventName];
        if (callbackSet != null) {
            callbackSet.callCallbacks.apply(callbackSet, args);
        }
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Animators = __webpack_require__(6);
var Formatters = __webpack_require__(8);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var quantitativeScale_1 = __webpack_require__(10);
var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
var Plots = __webpack_require__(16);
var plot_1 = __webpack_require__(2);
var xyPlot_1 = __webpack_require__(15);
exports.BarOrientation = makeEnum_1.makeEnum(["vertical", "horizontal"]);
var Bar = (function (_super) {
    __extends(Bar, _super);
    /**
     * A Bar Plot draws bars growing out from a baseline to some value
     *
     * @constructor
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    function Bar(orientation) {
        if (orientation === void 0) { orientation = "vertical"; }
        var _this = _super.call(this) || this;
        _this._labelFormatter = Formatters.identity();
        _this._labelsEnabled = false;
        _this._hideBarsIfAnyAreTooWide = true;
        _this._barPixelWidth = 0;
        _this.addClass("bar-plot");
        if (orientation !== "vertical" && orientation !== "horizontal") {
            throw new Error(orientation + " is not a valid orientation for Plots.Bar");
        }
        _this._isVertical = orientation === "vertical";
        _this.animator("baseline", new Animators.Null());
        _this.attr("fill", new Scales.Color().range()[0]);
        _this.attr("width", function () { return _this._barPixelWidth; });
        _this._labelConfig = new Utils.Map();
        _this._baselineValueProvider = function () { return [_this.baselineValue()]; };
        _this._updateBarPixelWidthCallback = function () { return _this._updateBarPixelWidth(); };
        return _this;
    }
    Bar.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
            xScale.onUpdate(this._updateBarPixelWidthCallback);
        }
        this._updateValueScale();
        return this;
    };
    Bar.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
            yScale.onUpdate(this._updateBarPixelWidthCallback);
        }
        this._updateValueScale();
        return this;
    };
    /**
     * Gets the orientation of the plot
     *
     * @return "vertical" | "horizontal"
     */
    Bar.prototype.orientation = function () {
        return this._isVertical ? "vertical" : "horizontal";
    };
    Bar.prototype.render = function () {
        this._updateBarPixelWidth();
        this._updateExtents();
        _super.prototype.render.call(this);
        return this;
    };
    Bar.prototype._createDrawer = function (dataset) {
        return new Drawers.Rectangle(dataset);
    };
    Bar.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._baseline = this._renderArea.append("line").classed("baseline", true);
    };
    Bar.prototype.baselineValue = function (value) {
        if (value == null) {
            if (this._baselineValue != null) {
                return this._baselineValue;
            }
            if (!this._projectorsReady()) {
                return 0;
            }
            var valueScale = this._isVertical ? this.y().scale : this.x().scale;
            if (!valueScale) {
                return 0;
            }
            if (valueScale instanceof Scales.Time) {
                return new Date(0);
            }
            return 0;
        }
        this._baselineValue = value;
        this._updateValueScale();
        this.render();
        return this;
    };
    Bar.prototype.addDataset = function (dataset) {
        _super.prototype.addDataset.call(this, dataset);
        this._updateBarPixelWidth();
        return this;
    };
    Bar.prototype._addDataset = function (dataset) {
        dataset.onUpdate(this._updateBarPixelWidthCallback);
        _super.prototype._addDataset.call(this, dataset);
        return this;
    };
    Bar.prototype.removeDataset = function (dataset) {
        dataset.offUpdate(this._updateBarPixelWidthCallback);
        _super.prototype.removeDataset.call(this, dataset);
        this._updateBarPixelWidth();
        return this;
    };
    Bar.prototype._removeDataset = function (dataset) {
        dataset.offUpdate(this._updateBarPixelWidthCallback);
        _super.prototype._removeDataset.call(this, dataset);
        return this;
    };
    Bar.prototype.datasets = function (datasets) {
        if (datasets == null) {
            return _super.prototype.datasets.call(this);
        }
        _super.prototype.datasets.call(this, datasets);
        this._updateBarPixelWidth();
        return this;
    };
    Bar.prototype.labelsEnabled = function (enabled) {
        if (enabled == null) {
            return this._labelsEnabled;
        }
        else {
            this._labelsEnabled = enabled;
            this.render();
            return this;
        }
    };
    Bar.prototype.labelFormatter = function (formatter) {
        if (formatter == null) {
            return this._labelFormatter;
        }
        else {
            this._labelFormatter = formatter;
            this.render();
            return this;
        }
    };
    Bar.prototype._createNodesForDataset = function (dataset) {
        var drawer = _super.prototype._createNodesForDataset.call(this, dataset);
        if (drawer.renderArea() != null) {
            drawer.renderArea().classed(Bar._BAR_AREA_CLASS, true);
        }
        var labelArea = this._renderArea.append("g").classed(Bar._LABEL_AREA_CLASS, true);
        var context = new Typesetter.SvgContext(labelArea.node());
        var measurer = new Typesetter.CacheMeasurer(context);
        var writer = new Typesetter.Writer(measurer, context);
        this._labelConfig.set(dataset, { labelArea: labelArea, measurer: measurer, writer: writer });
        return drawer;
    };
    Bar.prototype._removeDatasetNodes = function (dataset) {
        _super.prototype._removeDatasetNodes.call(this, dataset);
        var labelConfig = this._labelConfig.get(dataset);
        if (labelConfig != null) {
            labelConfig.labelArea.remove();
            this._labelConfig.delete(dataset);
        }
    };
    /**
     * Returns the PlotEntity nearest to the query point according to the following algorithm:
     *   - If the query point is inside a bar, returns the PlotEntity for that bar.
     *   - Otherwise, gets the nearest PlotEntity by the primary direction (X for vertical, Y for horizontal),
     *     breaking ties with the secondary direction.
     * Returns undefined if no PlotEntity can be found.
     *
     * @param {Point} queryPoint
     * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
     */
    Bar.prototype.entityNearest = function (queryPoint) {
        var _this = this;
        var minPrimaryDist = Infinity;
        var minSecondaryDist = Infinity;
        var queryPtPrimary = this._isVertical ? queryPoint.x : queryPoint.y;
        var queryPtSecondary = this._isVertical ? queryPoint.y : queryPoint.x;
        // SVGRects are positioned with sub-pixel accuracy (the default unit
        // for the x, y, height & width attributes), but user selections (e.g. via
        // mouse events) usually have pixel accuracy. We add a tolerance of 0.5 pixels.
        var tolerance = 0.5;
        var chartBounds = this.bounds();
        var closest;
        this._getEntityStore().forEach(function (entity) {
            if (!_this._entityVisibleOnPlot(entity, chartBounds)) {
                return;
            }
            var primaryDist = 0;
            var secondaryDist = 0;
            var plotPt = _this._pixelPoint(entity.datum, entity.index, entity.dataset);
            // if we're inside a bar, distance in both directions should stay 0
            var barBBox = Utils.DOM.elementBBox(entity.drawer.selectionForIndex(entity.validDatumIndex));
            if (!Utils.DOM.intersectsBBox(queryPoint.x, queryPoint.y, barBBox, tolerance)) {
                var plotPtPrimary = _this._isVertical ? plotPt.x : plotPt.y;
                primaryDist = Math.abs(queryPtPrimary - plotPtPrimary);
                // compute this bar's min and max along the secondary axis
                var barMinSecondary = _this._isVertical ? barBBox.y : barBBox.x;
                var barMaxSecondary = barMinSecondary + (_this._isVertical ? barBBox.height : barBBox.width);
                if (queryPtSecondary >= barMinSecondary - tolerance && queryPtSecondary <= barMaxSecondary + tolerance) {
                    // if we're within a bar's secondary axis span, it is closest in that direction
                    secondaryDist = 0;
                }
                else {
                    var plotPtSecondary = _this._isVertical ? plotPt.y : plotPt.x;
                    secondaryDist = Math.abs(queryPtSecondary - plotPtSecondary);
                }
            }
            // if we find a closer bar, record its distance and start new closest lists
            if (primaryDist < minPrimaryDist
                || primaryDist === minPrimaryDist && secondaryDist < minSecondaryDist) {
                closest = entity;
                minPrimaryDist = primaryDist;
                minSecondaryDist = secondaryDist;
            }
        });
        if (closest !== undefined) {
            return this._lightweightPlotEntityToPlotEntity(closest);
        }
        else {
            return undefined;
        }
    };
    Bar.prototype._entityVisibleOnPlot = function (entity, bounds) {
        var chartWidth = bounds.bottomRight.x - bounds.topLeft.x;
        var chartHeight = bounds.bottomRight.y - bounds.topLeft.y;
        var xRange = { min: 0, max: chartWidth };
        var yRange = { min: 0, max: chartHeight };
        var attrToProjector = this._generateAttrToProjector();
        var datum = entity.datum, index = entity.index, dataset = entity.dataset;
        var barBBox = {
            x: attrToProjector["x"](datum, index, dataset),
            y: attrToProjector["y"](datum, index, dataset),
            width: attrToProjector["width"](datum, index, dataset),
            height: attrToProjector["height"](datum, index, dataset),
        };
        return Utils.DOM.intersectsBBox(xRange, yRange, barBBox);
    };
    /**
     * Gets the Entities at a particular Point.
     *
     * @param {Point} p
     * @returns {PlotEntity[]}
     */
    Bar.prototype.entitiesAt = function (p) {
        return this._entitiesIntersecting(p.x, p.y);
    };
    Bar.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        return this._entitiesIntersecting(dataXRange, dataYRange);
    };
    Bar.prototype._entitiesIntersecting = function (xValOrRange, yValOrRange) {
        var _this = this;
        var intersected = [];
        this._getEntityStore().forEach(function (entity) {
            var selection = entity.drawer.selectionForIndex(entity.validDatumIndex);
            if (Utils.DOM.intersectsBBox(xValOrRange, yValOrRange, Utils.DOM.elementBBox(selection))) {
                intersected.push(_this._lightweightPlotEntityToPlotEntity(entity));
            }
        });
        return intersected;
    };
    Bar.prototype._updateValueScale = function () {
        if (!this._projectorsReady()) {
            return;
        }
        var valueScale = this._isVertical ? this.y().scale : this.x().scale;
        if (valueScale instanceof quantitativeScale_1.QuantitativeScale) {
            var qscale = valueScale;
            qscale.addPaddingExceptionsProvider(this._baselineValueProvider);
            qscale.addIncludedValuesProvider(this._baselineValueProvider);
        }
    };
    Bar.prototype._additionalPaint = function (time) {
        var _this = this;
        var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
        var scaledBaseline = primaryScale.scale(this.baselineValue());
        var baselineAttr = {
            "x1": this._isVertical ? 0 : scaledBaseline,
            "y1": this._isVertical ? scaledBaseline : 0,
            "x2": this._isVertical ? this.width() : scaledBaseline,
            "y2": this._isVertical ? scaledBaseline : this.height(),
        };
        this._getAnimator("baseline").animate(this._baseline, baselineAttr);
        this.datasets().forEach(function (dataset) { return _this._labelConfig.get(dataset).labelArea.selectAll("g").remove(); });
        if (this._labelsEnabled) {
            Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
        }
    };
    /**
     * Makes sure the extent takes into account the widths of the bars
     */
    Bar.prototype._extentsForProperty = function (property) {
        var _this = this;
        var extents = _super.prototype._extentsForProperty.call(this, property);
        var accScaleBinding;
        if (property === "x" && this._isVertical) {
            accScaleBinding = this.x();
        }
        else if (property === "y" && !this._isVertical) {
            accScaleBinding = this.y();
        }
        else {
            return extents;
        }
        if (!(accScaleBinding && accScaleBinding.scale && accScaleBinding.scale instanceof quantitativeScale_1.QuantitativeScale)) {
            return extents;
        }
        var scale = accScaleBinding.scale;
        // To account for inverted domains
        extents = extents.map(function (extent) { return d3.extent([
            scale.invert(scale.scale(extent[0]) - _this._barPixelWidth / 2),
            scale.invert(scale.scale(extent[0]) + _this._barPixelWidth / 2),
            scale.invert(scale.scale(extent[1]) - _this._barPixelWidth / 2),
            scale.invert(scale.scale(extent[1]) + _this._barPixelWidth / 2),
        ]); });
        return extents;
    };
    Bar.prototype._drawLabels = function () {
        var _this = this;
        var dataToDraw = this._getDataToDraw();
        var labelsTooWide = false;
        this.datasets().forEach(function (dataset) { return labelsTooWide = labelsTooWide || _this._drawLabel(dataToDraw.get(dataset), dataset); });
        if (this._hideBarsIfAnyAreTooWide && labelsTooWide) {
            this.datasets().forEach(function (dataset) { return _this._labelConfig.get(dataset).labelArea.selectAll("g").remove(); });
        }
    };
    Bar.prototype._drawLabel = function (data, dataset) {
        var _this = this;
        var attrToProjector = this._generateAttrToProjector();
        var labelConfig = this._labelConfig.get(dataset);
        var labelArea = labelConfig.labelArea;
        var measurer = labelConfig.measurer;
        var writer = labelConfig.writer;
        var drawLabel = function (d, i) {
            var valueAccessor = _this._isVertical ? _this.y().accessor : _this.x().accessor;
            var value = valueAccessor(d, i, dataset);
            var valueScale = _this._isVertical ? _this.y().scale : _this.x().scale;
            var scaledValue = valueScale != null ? valueScale.scale(value) : value;
            var scaledBaseline = valueScale != null ? valueScale.scale(_this.baselineValue()) : _this.baselineValue();
            var barWidth = attrToProjector["width"](d, i, dataset);
            var barHeight = attrToProjector["height"](d, i, dataset);
            var text = _this._labelFormatter(valueAccessor(d, i, dataset));
            var measurement = measurer.measure(text);
            var xAlignment = "center";
            var yAlignment = "center";
            var labelContainerOrigin = {
                x: attrToProjector["x"](d, i, dataset),
                y: attrToProjector["y"](d, i, dataset),
            };
            var containerWidth = barWidth;
            var containerHeight = barHeight;
            var labelOrigin = {
                x: labelContainerOrigin.x,
                y: labelContainerOrigin.y,
            };
            var showLabelOnBar;
            if (_this._isVertical) {
                labelOrigin.x += containerWidth / 2 - measurement.width / 2;
                var barY = attrToProjector["y"](d, i, dataset);
                var effectiveBarHeight = barHeight;
                if (barY + barHeight > _this.height()) {
                    effectiveBarHeight = _this.height() - barY;
                }
                else if (barY < 0) {
                    effectiveBarHeight = barY + barHeight;
                }
                var offset = Bar._LABEL_PADDING;
                showLabelOnBar = measurement.height + 2 * offset <= effectiveBarHeight;
                if (showLabelOnBar) {
                    if (scaledValue < scaledBaseline) {
                        labelContainerOrigin.y += offset;
                        yAlignment = "top";
                        labelOrigin.y += offset;
                    }
                    else {
                        labelContainerOrigin.y -= offset;
                        yAlignment = "bottom";
                        labelOrigin.y += containerHeight - offset - measurement.height;
                    }
                }
                else {
                    containerHeight = barHeight + offset + measurement.height;
                    if (scaledValue <= scaledBaseline) {
                        labelContainerOrigin.y -= offset + measurement.height;
                        yAlignment = "top";
                        labelOrigin.y -= offset + measurement.height;
                    }
                    else {
                        yAlignment = "bottom";
                        labelOrigin.y += barHeight + offset;
                    }
                }
            }
            else {
                labelOrigin.y += containerHeight / 2 - measurement.height / 2;
                var barX = attrToProjector["x"](d, i, dataset);
                var effectiveBarWidth = barWidth;
                if (barX + barWidth > _this.width()) {
                    effectiveBarWidth = _this.width() - barX;
                }
                else if (barX < 0) {
                    effectiveBarWidth = barX + barWidth;
                }
                var offset = Bar._LABEL_PADDING;
                showLabelOnBar = measurement.width + 2 * offset <= effectiveBarWidth;
                if (showLabelOnBar) {
                    if (scaledValue < scaledBaseline) {
                        labelContainerOrigin.x += offset;
                        xAlignment = "left";
                        labelOrigin.x += offset;
                    }
                    else {
                        labelContainerOrigin.x -= offset;
                        xAlignment = "right";
                        labelOrigin.x += containerWidth - offset - measurement.width;
                    }
                }
                else {
                    containerWidth = barWidth + offset + measurement.width;
                    if (scaledValue < scaledBaseline) {
                        labelContainerOrigin.x -= offset + measurement.width;
                        xAlignment = "left";
                        labelOrigin.x -= offset + measurement.width;
                    }
                    else {
                        xAlignment = "right";
                        labelOrigin.x += barWidth + offset;
                    }
                }
            }
            var labelContainer = labelArea.append("g").attr("transform", "translate(" + labelContainerOrigin.x + ", " + labelContainerOrigin.y + ")");
            if (showLabelOnBar) {
                labelContainer.classed("on-bar-label", true);
                var color = attrToProjector["fill"](d, i, dataset);
                var dark = Utils.Color.contrast("white", color) * 1.6 < Utils.Color.contrast("black", color);
                labelContainer.classed(dark ? "dark-label" : "light-label", true);
            }
            else {
                labelContainer.classed("off-bar-label", true);
            }
            var hideLabel = labelOrigin.x < 0 ||
                labelOrigin.y < 0 ||
                labelOrigin.x + measurement.width > _this.width() ||
                labelOrigin.y + measurement.height > _this.height();
            labelContainer.style("visibility", hideLabel ? "hidden" : "inherit");
            var writeOptions = {
                xAlign: xAlignment,
                yAlign: yAlignment,
            };
            writer.write(text, containerWidth, containerHeight, writeOptions, labelContainer.node());
            var tooWide = _this._isVertical
                ? barWidth < (measurement.width + Bar._LABEL_PADDING * 2)
                : barHeight < (measurement.height + Bar._LABEL_PADDING * 2);
            return tooWide;
        };
        var labelTooWide = data.map(drawLabel);
        return labelTooWide.some(function (d) { return d; });
    };
    Bar.prototype._generateDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var resetAttrToProjector = this._generateAttrToProjector();
            var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
            var scaledBaseline_1 = primaryScale.scale(this.baselineValue());
            var positionAttr = this._isVertical ? "y" : "x";
            var dimensionAttr = this._isVertical ? "height" : "width";
            resetAttrToProjector[positionAttr] = function () { return scaledBaseline_1; };
            resetAttrToProjector[dimensionAttr] = function () { return 0; };
            drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Bar.prototype._generateAttrToProjector = function () {
        // Primary scale/direction: the "length" of the bars
        // Secondary scale/direction: the "width" of the bars
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
        var primaryAttr = this._isVertical ? "y" : "x";
        var secondaryAttr = this._isVertical ? "x" : "y";
        var scaledBaseline = primaryScale.scale(this.baselineValue());
        var positionF = this._isVertical ? plot_1.Plot._scaledAccessor(this.x()) : plot_1.Plot._scaledAccessor(this.y());
        var widthF = attrToProjector["width"];
        var originalPositionFn = this._isVertical ? plot_1.Plot._scaledAccessor(this.y()) : plot_1.Plot._scaledAccessor(this.x());
        var heightF = function (d, i, dataset) {
            return Math.abs(scaledBaseline - originalPositionFn(d, i, dataset));
        };
        attrToProjector["width"] = this._isVertical ? widthF : heightF;
        attrToProjector["height"] = this._isVertical ? heightF : widthF;
        attrToProjector[secondaryAttr] = function (d, i, dataset) {
            return positionF(d, i, dataset) - widthF(d, i, dataset) / 2;
        };
        attrToProjector[primaryAttr] = function (d, i, dataset) {
            var originalPos = originalPositionFn(d, i, dataset);
            // If it is past the baseline, it should start at the baselin then width/height
            // carries it over. If it's not past the baseline, leave it at original position and
            // then width/height carries it to baseline
            return (originalPos > scaledBaseline) ? scaledBaseline : originalPos;
        };
        return attrToProjector;
    };
    /**
     * Computes the barPixelWidth of all the bars in the plot.
     *
     * If the position scale of the plot is a CategoryScale and in bands mode, then the rangeBands function will be used.
     * If the position scale of the plot is a QuantitativeScale, then the bar width is equal to the smallest distance between
     * two adjacent data points, padded for visualisation.
     */
    Bar.prototype._getBarPixelWidth = function () {
        if (!this._projectorsReady()) {
            return 0;
        }
        var barPixelWidth;
        var barScale = this._isVertical ? this.x().scale : this.y().scale;
        if (barScale instanceof Scales.Category) {
            barPixelWidth = barScale.rangeBand();
        }
        else {
            var barAccessor_1 = this._isVertical ? this.x().accessor : this.y().accessor;
            var numberBarAccessorData = d3.set(Utils.Array.flatten(this.datasets().map(function (dataset) {
                return dataset.data().map(function (d, i) { return barAccessor_1(d, i, dataset); })
                    .filter(function (d) { return d != null; })
                    .map(function (d) { return d.valueOf(); });
            }))).values().map(function (value) { return +value; });
            numberBarAccessorData.sort(function (a, b) { return a - b; });
            var scaledData = numberBarAccessorData.map(function (datum) { return barScale.scale(datum); });
            var barAccessorDataPairs = d3.pairs(scaledData);
            var barWidthDimension = this._isVertical ? this.width() : this.height();
            barPixelWidth = Utils.Math.min(barAccessorDataPairs, function (pair, i) {
                return Math.abs(pair[1] - pair[0]);
            }, barWidthDimension * Bar._SINGLE_BAR_DIMENSION_RATIO);
            barPixelWidth *= Bar._BAR_WIDTH_RATIO;
        }
        return barPixelWidth;
    };
    Bar.prototype._updateBarPixelWidth = function () {
        this._barPixelWidth = this._getBarPixelWidth();
    };
    Bar.prototype.entities = function (datasets) {
        if (datasets === void 0) { datasets = this.datasets(); }
        if (!this._projectorsReady()) {
            return [];
        }
        var entities = _super.prototype.entities.call(this, datasets);
        return entities;
    };
    Bar.prototype._pixelPoint = function (datum, index, dataset) {
        var attrToProjector = this._generateAttrToProjector();
        var rectX = attrToProjector["x"](datum, index, dataset);
        var rectY = attrToProjector["y"](datum, index, dataset);
        var rectWidth = attrToProjector["width"](datum, index, dataset);
        var rectHeight = attrToProjector["height"](datum, index, dataset);
        var x;
        var y;
        var originalPosition = (this._isVertical ? plot_1.Plot._scaledAccessor(this.y()) : plot_1.Plot._scaledAccessor(this.x()))(datum, index, dataset);
        var scaledBaseline = (this._isVertical ? this.y().scale : this.x().scale).scale(this.baselineValue());
        if (this._isVertical) {
            x = rectX + rectWidth / 2;
            y = originalPosition <= scaledBaseline ? rectY : rectY + rectHeight;
        }
        else {
            x = originalPosition >= scaledBaseline ? rectX + rectWidth : rectX;
            y = rectY + rectHeight / 2;
        }
        return { x: x, y: y };
    };
    Bar.prototype._uninstallScaleForKey = function (scale, key) {
        scale.offUpdate(this._updateBarPixelWidthCallback);
        _super.prototype._uninstallScaleForKey.call(this, scale, key);
    };
    Bar.prototype._getDataToDraw = function () {
        var dataToDraw = new Utils.Map();
        var attrToProjector = this._generateAttrToProjector();
        this.datasets().forEach(function (dataset) {
            var data = dataset.data().filter(function (d, i) { return Utils.Math.isValidNumber(attrToProjector["x"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["y"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["width"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["height"](d, i, dataset)); });
            dataToDraw.set(dataset, data);
        });
        return dataToDraw;
    };
    return Bar;
}(xyPlot_1.XYPlot));
Bar._BAR_WIDTH_RATIO = 0.95;
Bar._SINGLE_BAR_DIMENSION_RATIO = 0.4;
Bar._BAR_AREA_CLASS = "bar-area";
Bar._LABEL_AREA_CLASS = "bar-label-text-area";
Bar._LABEL_PADDING = 10;
exports.Bar = Bar;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Formatters = __webpack_require__(8);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
var axis_1 = __webpack_require__(19);
exports.TimeInterval = makeEnum_1.makeEnum([
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
]);
/**
 * Possible orientations for a Time Axis.
 */
exports.TimeAxisOrientation = makeEnum_1.makeEnum(["top", "bottom"]);
exports.TierLabelPosition = makeEnum_1.makeEnum(["between", "center"]);
var Time = (function (_super) {
    __extends(Time, _super);
    /**
     * Constructs a Time Axis.
     *
     * A Time Axis is a visual representation of a Time Scale.
     *
     * @constructor
     * @param {Scales.Time} scale
     * @param {AxisOrientation} orientation Orientation of this Time Axis. Time Axes can only have "top" or "bottom"
     * orientations.
     */
    function Time(scale, orientation) {
        var _this = _super.call(this, scale, orientation) || this;
        _this._maxTimeIntervalPrecision = null;
        _this._tierLabelPositions = [];
        _this.addClass("time-axis");
        _this.tickLabelPadding(5);
        _this.axisConfigurations(Time._DEFAULT_TIME_AXIS_CONFIGURATIONS);
        _this.annotationFormatter(Formatters.time("%a %b %d, %Y"));
        return _this;
    }
    Time.prototype.tierLabelPositions = function (newPositions) {
        if (newPositions == null) {
            return this._tierLabelPositions;
        }
        else {
            if (!newPositions.every(function (pos) { return pos.toLowerCase() === "between" || pos.toLowerCase() === "center"; })) {
                throw new Error("Unsupported position for tier labels");
            }
            this._tierLabelPositions = newPositions;
            this.redraw();
            return this;
        }
    };
    Time.prototype.maxTimeIntervalPrecision = function (newPrecision) {
        if (newPrecision == null) {
            return this._maxTimeIntervalPrecision;
        }
        else {
            this._maxTimeIntervalPrecision = newPrecision;
            this.redraw();
            return this;
        }
    };
    /**
     * Returns the current `TimeAxisConfiguration` used to render the axes.
     *
     * Note that this is only valid after the axis had been rendered and the
     * most precise valid configuration is determined from the available space
     * and maximum precision constraints.
     *
     * @returns {TimeAxisConfiguration} The currently used `TimeAxisConfiguration` or `undefined`.
     */
    Time.prototype.currentAxisConfiguration = function () {
        return this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex];
    };
    Time.prototype.axisConfigurations = function (configurations) {
        if (configurations == null) {
            return this._possibleTimeAxisConfigurations;
        }
        this._possibleTimeAxisConfigurations = configurations;
        this._numTiers = Utils.Math.max(this._possibleTimeAxisConfigurations.map(function (config) { return config.length; }), 0);
        if (this._isAnchored) {
            this._setupDomElements();
        }
        var oldLabelPositions = this.tierLabelPositions();
        var newLabelPositions = [];
        for (var i = 0; i < this._numTiers; i++) {
            newLabelPositions.push(oldLabelPositions[i] || "between");
        }
        this.tierLabelPositions(newLabelPositions);
        this.redraw();
        return this;
    };
    /**
     * Gets the index of the most precise TimeAxisConfiguration that will fit in the current width.
     */
    Time.prototype._getMostPreciseConfigurationIndex = function () {
        var _this = this;
        var mostPreciseIndex = this._possibleTimeAxisConfigurations.length;
        this._possibleTimeAxisConfigurations.forEach(function (interval, index) {
            if (index < mostPreciseIndex && interval.every(function (tier) {
                return _this._checkTimeAxisTierConfiguration(tier);
            })) {
                mostPreciseIndex = index;
            }
        });
        if (mostPreciseIndex === this._possibleTimeAxisConfigurations.length) {
            Utils.Window.warn("zoomed out too far: could not find suitable interval to display labels");
            --mostPreciseIndex;
        }
        return mostPreciseIndex;
    };
    Time.prototype.orientation = function (orientation) {
        if (orientation && (orientation.toLowerCase() === "right" || orientation.toLowerCase() === "left")) {
            throw new Error(orientation + " is not a supported orientation for TimeAxis - only horizontal orientations are supported");
        }
        return _super.prototype.orientation.call(this, orientation); // maintains getter-setter functionality
    };
    Time.prototype._computeHeight = function () {
        var textHeight = this._measurer.measure().height;
        this._tierHeights = [];
        for (var i = 0; i < this._numTiers; i++) {
            this._tierHeights.push(textHeight + this.tickLabelPadding() +
                ((this._tierLabelPositions[i]) === "between" ? 0 : this._maxLabelTickLength()));
        }
        return d3.sum(this._tierHeights);
    };
    Time.prototype._getIntervalLength = function (config) {
        var startDate = this._scale.domain()[0];
        var d3Interval = Scales.Time.timeIntervalToD3Time(config.interval);
        var endDate = d3Interval.offset(startDate, config.step);
        if (endDate > this._scale.domain()[1]) {
            // this offset is too large, so just return available width
            return this.width();
        }
        // measure how much space one date can get
        var stepLength = Math.abs(this._scale.scale(endDate) - this._scale.scale(startDate));
        return stepLength;
    };
    Time.prototype._maxWidthForInterval = function (config) {
        return this._measurer.measure(config.formatter(Time._LONG_DATE)).width;
    };
    /**
     * Check if tier configuration fits in the current width and satisfied the
     * max TimeInterval precision limit.
     */
    Time.prototype._checkTimeAxisTierConfiguration = function (config) {
        // Use the sorted index to determine if the teir configuration contains a
        // time interval that is too precise for the maxTimeIntervalPrecision
        // setting (if set).
        if (this._maxTimeIntervalPrecision != null) {
            var precisionLimit = Time._SORTED_TIME_INTERVAL_INDEX[this._maxTimeIntervalPrecision];
            var configPrecision = Time._SORTED_TIME_INTERVAL_INDEX[config.interval];
            if (precisionLimit != null && configPrecision != null && configPrecision < precisionLimit) {
                return false;
            }
        }
        var worstWidth = this._maxWidthForInterval(config) + 2 * this.tickLabelPadding();
        return Math.min(this._getIntervalLength(config), this.width()) >= worstWidth;
    };
    Time.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        // Makes sure that the size it requires is a multiple of tier sizes, such that
        // we have no leftover tiers
        var size = _super.prototype._sizeFromOffer.call(this, availableWidth, availableHeight);
        var tierHeights = this._tierHeights.reduce(function (prevValue, currValue, index, arr) {
            return (prevValue + currValue > size.height) ? prevValue : (prevValue + currValue);
        });
        var nonCoreHeight = this.margin() + (this.annotationsEnabled() ? this.annotationTierCount() * this._annotationTierHeight() : 0);
        size.height = Math.min(size.height, tierHeights + nonCoreHeight);
        return size;
    };
    Time.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._setupDomElements();
    };
    Time.prototype._setupDomElements = function () {
        this.content().selectAll("." + Time.TIME_AXIS_TIER_CLASS).remove();
        this._tierLabelContainers = [];
        this._tierMarkContainers = [];
        this._tierBaselines = [];
        this._tickLabelContainer.remove();
        this._baseline.remove();
        for (var i = 0; i < this._numTiers; ++i) {
            var tierContainer = this.content().append("g").classed(Time.TIME_AXIS_TIER_CLASS, true);
            this._tierLabelContainers.push(tierContainer.append("g").classed(axis_1.Axis.TICK_LABEL_CLASS + "-container", true));
            this._tierMarkContainers.push(tierContainer.append("g").classed(axis_1.Axis.TICK_MARK_CLASS + "-container", true));
            this._tierBaselines.push(tierContainer.append("line").classed("baseline", true));
        }
        var context = new Typesetter.SvgContext(this._tierLabelContainers[0].node());
        this._measurer = new Typesetter.CacheMeasurer(context);
    };
    Time.prototype._getTickIntervalValues = function (config) {
        return this._scale.tickInterval(config.interval, config.step);
    };
    Time.prototype._getTickValues = function () {
        var _this = this;
        return this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex].reduce(function (ticks, config) { return ticks.concat(_this._getTickIntervalValues(config)); }, []);
    };
    Time.prototype._cleanTiers = function () {
        for (var index = 0; index < this._tierLabelContainers.length; index++) {
            this._tierLabelContainers[index].selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).remove();
            this._tierMarkContainers[index].selectAll("." + axis_1.Axis.TICK_MARK_CLASS).remove();
            this._tierBaselines[index].style("visibility", "hidden");
        }
    };
    Time.prototype._getTickValuesForConfiguration = function (config) {
        var tickPos = this._scale.tickInterval(config.interval, config.step);
        var domain = this._scale.domain();
        var tickPosValues = tickPos.map(function (d) { return d.valueOf(); }); // can't indexOf with objects
        if (tickPosValues.indexOf(domain[0].valueOf()) === -1) {
            tickPos.unshift(domain[0]);
        }
        if (tickPosValues.indexOf(domain[1].valueOf()) === -1) {
            tickPos.push(domain[1]);
        }
        return tickPos;
    };
    Time.prototype._renderTierLabels = function (container, config, index) {
        var _this = this;
        var tickPos = this._getTickValuesForConfiguration(config);
        var labelPos = [];
        if (this._tierLabelPositions[index] === "between" && config.step === 1) {
            tickPos.map(function (datum, i) {
                if (i + 1 >= tickPos.length) {
                    return;
                }
                labelPos.push(new Date((tickPos[i + 1].valueOf() - tickPos[i].valueOf()) / 2 + tickPos[i].valueOf()));
            });
        }
        else {
            labelPos = tickPos;
        }
        var tickLabelsUpdate = container.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).data(labelPos, function (d) { return String(d.valueOf()); });
        var tickLabelsEnter = tickLabelsUpdate
            .enter()
            .append("g")
            .classed(axis_1.Axis.TICK_LABEL_CLASS, true);
        tickLabelsEnter.append("text");
        var xTranslate = (this._tierLabelPositions[index] === "center" || config.step === 1) ? 0 : this.tickLabelPadding();
        var yTranslate;
        if (this.orientation() === "bottom") {
            yTranslate = d3.sum(this._tierHeights.slice(0, index + 1)) - this.tickLabelPadding();
        }
        else {
            if (this._tierLabelPositions[index] === "center") {
                yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding() - this._maxLabelTickLength();
            }
            else {
                yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding();
            }
        }
        var tickLabels = tickLabelsUpdate.merge(tickLabelsEnter);
        var textSelection = tickLabels.selectAll("text");
        if (textSelection.size() > 0) {
            textSelection.attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");
        }
        tickLabelsUpdate.exit().remove();
        tickLabels.attr("transform", function (d) { return "translate(" + _this._scale.scale(d) + ",0)"; });
        var anchor = (this._tierLabelPositions[index] === "center" || config.step === 1) ? "middle" : "start";
        tickLabels.selectAll("text").text(config.formatter).style("text-anchor", anchor);
    };
    Time.prototype._renderTickMarks = function (tickValues, index) {
        var tickMarksUpdate = this._tierMarkContainers[index].selectAll("." + axis_1.Axis.TICK_MARK_CLASS).data(tickValues);
        var tickMarks = tickMarksUpdate
            .enter()
            .append("line")
            .classed(axis_1.Axis.TICK_MARK_CLASS, true)
            .merge(tickMarksUpdate);
        var attr = this._generateTickMarkAttrHash();
        var offset = this._tierHeights.slice(0, index).reduce(function (translate, height) { return translate + height; }, 0);
        if (this.orientation() === "bottom") {
            attr["y1"] = offset;
            attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.innerTickLength() : this._tierHeights[index]);
        }
        else {
            attr["y1"] = this.height() - offset;
            attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ?
                this.innerTickLength() : this._tierHeights[index]));
        }
        tickMarks.attrs(attr);
        if (this.orientation() === "bottom") {
            attr["y1"] = offset;
            attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.endTickLength() : this._tierHeights[index]);
        }
        else {
            attr["y1"] = this.height() - offset;
            attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ?
                this.endTickLength() : this._tierHeights[index]));
        }
        d3.select(tickMarks.nodes()[0]).attrs(attr);
        d3.select(tickMarks.nodes()[tickMarks.size() - 1]).attrs(attr);
        // Add end-tick classes to first and last tick for CSS customization purposes
        d3.select(tickMarks.nodes()[0]).classed(axis_1.Axis.END_TICK_MARK_CLASS, true);
        d3.select(tickMarks.nodes()[tickMarks.size() - 1]).classed(axis_1.Axis.END_TICK_MARK_CLASS, true);
        tickMarksUpdate.exit().remove();
    };
    Time.prototype._renderLabellessTickMarks = function (tickValues) {
        var tickMarksUpdate = this._tickMarkContainer.selectAll("." + axis_1.Axis.TICK_MARK_CLASS).data(tickValues);
        var tickMarks = tickMarksUpdate
            .enter()
            .append("line")
            .classed(axis_1.Axis.TICK_MARK_CLASS, true)
            .merge(tickMarksUpdate);
        var attr = this._generateTickMarkAttrHash();
        attr["y2"] = (this.orientation() === "bottom") ? this.tickLabelPadding() : this.height() - this.tickLabelPadding();
        tickMarks.attrs(attr);
        tickMarksUpdate.exit().remove();
    };
    Time.prototype._generateLabellessTicks = function () {
        if (this._mostPreciseConfigIndex < 1) {
            return [];
        }
        return this._getTickIntervalValues(this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex - 1][0]);
    };
    Time.prototype.renderImmediately = function () {
        var _this = this;
        this._mostPreciseConfigIndex = this._getMostPreciseConfigurationIndex();
        var tierConfigs = this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex];
        this._cleanTiers();
        tierConfigs.forEach(function (config, i) {
            return _this._renderTierLabels(_this._tierLabelContainers[i], config, i);
        });
        var tierTicks = tierConfigs.map(function (config, i) {
            return _this._getTickValuesForConfiguration(config);
        });
        var baselineOffset = 0;
        for (var i = 0; i < Math.max(tierConfigs.length, 1); ++i) {
            var attr = this._generateBaselineAttrHash();
            attr["y1"] += (this.orientation() === "bottom") ? baselineOffset : -baselineOffset;
            attr["y2"] = attr["y1"];
            this._tierBaselines[i].attrs(attr).style("visibility", "inherit");
            baselineOffset += this._tierHeights[i];
        }
        var labelLessTicks = [];
        var domain = this._scale.domain();
        var totalLength = this._scale.scale(domain[1]) - this._scale.scale(domain[0]);
        if (this._getIntervalLength(tierConfigs[0]) * 1.5 >= totalLength) {
            labelLessTicks = this._generateLabellessTicks();
        }
        this._renderLabellessTickMarks(labelLessTicks);
        this._hideOverflowingTiers();
        for (var i = 0; i < tierConfigs.length; ++i) {
            this._renderTickMarks(tierTicks[i], i);
            this._hideOverlappingAndCutOffLabels(i);
        }
        if (this.annotationsEnabled()) {
            this._drawAnnotations();
        }
        else {
            this._removeAnnotations();
        }
        return this;
    };
    Time.prototype._hideOverflowingTiers = function () {
        var _this = this;
        var availableHeight = this.height();
        var usedHeight = 0;
        this.content()
            .selectAll("." + Time.TIME_AXIS_TIER_CLASS)
            .attr("visibility", function (d, i) {
            usedHeight += _this._tierHeights[i];
            return usedHeight <= availableHeight ? "inherit" : "hidden";
        });
    };
    Time.prototype._hideOverlappingAndCutOffLabels = function (index) {
        var _this = this;
        var boundingBox = this.element().node().getBoundingClientRect();
        var isInsideBBox = function (tickBox) {
            return (Math.floor(boundingBox.left) <= Math.ceil(tickBox.left) &&
                Math.floor(boundingBox.top) <= Math.ceil(tickBox.top) &&
                Math.floor(tickBox.right) <= Math.ceil(boundingBox.left + _this.width()) &&
                Math.floor(tickBox.bottom) <= Math.ceil(boundingBox.top + _this.height()));
        };
        var visibleTickMarks = this._tierMarkContainers[index]
            .selectAll("." + axis_1.Axis.TICK_MARK_CLASS)
            .filter(function (d, i) {
            var visibility = d3.select(this).style("visibility");
            return visibility === "visible" || visibility === "inherit";
        });
        // We use the ClientRects because x1/x2 attributes are not comparable to ClientRects of labels
        var visibleTickMarkRects = visibleTickMarks.nodes().map(function (mark) { return mark.getBoundingClientRect(); });
        var visibleTickLabels = this._tierLabelContainers[index]
            .selectAll("." + axis_1.Axis.TICK_LABEL_CLASS)
            .filter(function (d, i) {
            var visibility = d3.select(this).style("visibility");
            return visibility === "visible" || visibility === "inherit";
        });
        var lastLabelClientRect;
        visibleTickLabels.each(function (d, i) {
            var clientRect = this.getBoundingClientRect();
            var tickLabel = d3.select(this);
            var leadingTickMark = visibleTickMarkRects[i];
            var trailingTickMark = visibleTickMarkRects[i + 1];
            var isOverlappingLastLabel = (lastLabelClientRect != null && Utils.DOM.clientRectsOverlap(clientRect, lastLabelClientRect));
            var isOverlappingLeadingTickMark = (leadingTickMark != null && Utils.DOM.clientRectsOverlap(clientRect, leadingTickMark));
            var isOverlappingTrailingTickMark = (trailingTickMark != null && Utils.DOM.clientRectsOverlap(clientRect, trailingTickMark));
            if (!isInsideBBox(clientRect) || isOverlappingLastLabel || isOverlappingLeadingTickMark || isOverlappingTrailingTickMark) {
                tickLabel.style("visibility", "hidden");
            }
            else {
                lastLabelClientRect = clientRect;
                tickLabel.style("visibility", "inherit");
            }
        });
    };
    Time.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Time;
}(axis_1.Axis));
/**
 * The CSS class applied to each Time Axis tier
 */
Time.TIME_AXIS_TIER_CLASS = "time-axis-tier";
Time._SORTED_TIME_INTERVAL_INDEX = (_a = {},
    _a[exports.TimeInterval.second] = 0,
    _a[exports.TimeInterval.minute] = 1,
    _a[exports.TimeInterval.hour] = 2,
    _a[exports.TimeInterval.day] = 3,
    _a[exports.TimeInterval.week] = 4,
    _a[exports.TimeInterval.month] = 5,
    _a[exports.TimeInterval.year] = 6,
    _a);
Time._DEFAULT_TIME_AXIS_CONFIGURATIONS = [
    [
        { interval: exports.TimeInterval.second, step: 1, formatter: Formatters.time("%I:%M:%S %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.second, step: 5, formatter: Formatters.time("%I:%M:%S %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.second, step: 10, formatter: Formatters.time("%I:%M:%S %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.second, step: 15, formatter: Formatters.time("%I:%M:%S %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.second, step: 30, formatter: Formatters.time("%I:%M:%S %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.minute, step: 1, formatter: Formatters.time("%I:%M %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.minute, step: 5, formatter: Formatters.time("%I:%M %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.minute, step: 10, formatter: Formatters.time("%I:%M %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.minute, step: 15, formatter: Formatters.time("%I:%M %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.minute, step: 30, formatter: Formatters.time("%I:%M %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.hour, step: 1, formatter: Formatters.time("%I %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.hour, step: 3, formatter: Formatters.time("%I %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.hour, step: 6, formatter: Formatters.time("%I %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.hour, step: 12, formatter: Formatters.time("%I %p") },
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y") },
    ],
    [
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%a %e") },
        { interval: exports.TimeInterval.month, step: 1, formatter: Formatters.time("%B %Y") },
    ],
    [
        { interval: exports.TimeInterval.day, step: 1, formatter: Formatters.time("%e") },
        { interval: exports.TimeInterval.month, step: 1, formatter: Formatters.time("%B %Y") },
    ],
    [
        { interval: exports.TimeInterval.month, step: 1, formatter: Formatters.time("%B") },
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.month, step: 1, formatter: Formatters.time("%b") },
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.month, step: 3, formatter: Formatters.time("%b") },
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.month, step: 6, formatter: Formatters.time("%b") },
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 1, formatter: Formatters.time("%y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 5, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 25, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 50, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 100, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 200, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 500, formatter: Formatters.time("%Y") },
    ],
    [
        { interval: exports.TimeInterval.year, step: 1000, formatter: Formatters.time("%Y") },
    ],
];
Time._LONG_DATE = new Date(9999, 8, 29, 12, 59, 9999);
exports.Time = Time;
var _a;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var coerceD3_1 = __webpack_require__(11);
var component_1 = __webpack_require__(5);
/*
 * ComponentContainer class encapsulates Table and ComponentGroup's shared functionality.
 * It will not do anything if instantiated directly.
 */
var ComponentContainer = (function (_super) {
    __extends(ComponentContainer, _super);
    function ComponentContainer() {
        var _this = _super.call(this) || this;
        _this._detachCallback = function (component) { return _this.remove(component); };
        return _this;
    }
    ComponentContainer.prototype.anchor = function (selection) {
        var _this = this;
        selection = coerceD3_1.coerceExternalD3(selection);
        _super.prototype.anchor.call(this, selection);
        this._forEach(function (c) { return c.anchor(_this.element()); });
        return this;
    };
    ComponentContainer.prototype.render = function () {
        this._forEach(function (c) { return c.render(); });
        return this;
    };
    /**
     * Checks whether the specified Component is in the ComponentContainer.
     */
    ComponentContainer.prototype.has = function (component) {
        throw new Error("has() is not implemented on ComponentContainer");
    };
    ComponentContainer.prototype._adoptAndAnchor = function (component) {
        component.parent(this);
        component.onDetach(this._detachCallback);
        if (this._isAnchored) {
            component.anchor(this.element());
        }
    };
    /**
     * Removes the specified Component from the ComponentContainer.
     */
    ComponentContainer.prototype.remove = function (component) {
        if (this.has(component)) {
            component.offDetach(this._detachCallback);
            this._remove(component);
            component.detach();
            this.redraw();
        }
        return this;
    };
    /**
     * Carry out the actual removal of a Component.
     * Implementation dependent on the type of container.
     *
     * @return {boolean} true if the Component was successfully removed, false otherwise.
     */
    ComponentContainer.prototype._remove = function (component) {
        return false;
    };
    /**
     * Invokes a callback on each Component in the ComponentContainer.
     */
    ComponentContainer.prototype._forEach = function (callback) {
        throw new Error("_forEach() is not implemented on ComponentContainer");
    };
    /**
     * Destroys the ComponentContainer and all Components within it.
     */
    ComponentContainer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._forEach(function (c) { return c.destroy(); });
    };
    ComponentContainer.prototype.invalidateCache = function () {
        this._forEach(function (c) { return c.invalidateCache(); });
    };
    return ComponentContainer;
}(component_1.Component));
exports.ComponentContainer = ComponentContainer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
var RenderPolicies = __webpack_require__(31);
/**
 * The RenderController is responsible for enqueueing and synchronizing
 * layout and render calls for Components.
 *
 * Layout and render calls occur inside an animation callback
 * (window.requestAnimationFrame if available).
 *
 * RenderController.flush() immediately lays out and renders all Components currently enqueued.
 *
 * To always have immediate rendering (useful for debugging), call
 * ```typescript
 * Plottable.RenderController.setRenderPolicy(
 *   new Plottable.RenderPolicies.Immediate()
 * );
 * ```
 */
var _componentsNeedingRender = new Utils.Set();
var _componentsNeedingComputeLayout = new Utils.Set();
var _animationRequested = false;
var _isCurrentlyFlushing = false;
exports.Policy = makeEnum_1.makeEnum(["immediate", "animationFrame", "timeout"]);
var _renderPolicy = new RenderPolicies.AnimationFrame();
function renderPolicy(renderPolicy) {
    if (renderPolicy == null) {
        return _renderPolicy;
    }
    switch (renderPolicy) {
        case exports.Policy.immediate:
            _renderPolicy = new RenderPolicies.Immediate();
            break;
        case exports.Policy.animationFrame:
            _renderPolicy = new RenderPolicies.AnimationFrame();
            break;
        case exports.Policy.timeout:
            _renderPolicy = new RenderPolicies.Timeout();
            break;
        default:
            Utils.Window.warn("Unrecognized renderPolicy: " + renderPolicy);
    }
}
exports.renderPolicy = renderPolicy;
/**
 * Enqueues the Component for rendering.
 *
 * @param {Component} component
 */
function registerToRender(component) {
    if (_isCurrentlyFlushing) {
        Utils.Window.warn("Registered to render while other components are flushing: request may be ignored");
    }
    _componentsNeedingRender.add(component);
    requestRender();
}
exports.registerToRender = registerToRender;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 */
function registerToComputeLayoutAndRender(component) {
    _componentsNeedingComputeLayout.add(component);
    _componentsNeedingRender.add(component);
    requestRender();
}
exports.registerToComputeLayoutAndRender = registerToComputeLayoutAndRender;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 * @deprecated This method has been renamed to `RenderController.registerToComputeLayoutAndRender()`.
 */
function registerToComputeLayout(component) {
    registerToComputeLayoutAndRender(component);
}
exports.registerToComputeLayout = registerToComputeLayout;
function requestRender() {
    // Only run or enqueue flush on first request.
    if (!_animationRequested) {
        _animationRequested = true;
        _renderPolicy.render();
    }
}
/**
 * Renders all Components waiting to be rendered immediately
 * instead of waiting until the next frame. Flush is idempotent (given there are no intermediate registrations).
 *
 * Useful to call when debugging.
 */
function flush() {
    if (_animationRequested) {
        // Layout
        _componentsNeedingComputeLayout.forEach(function (component) { return component.computeLayout(); });
        // Top level render; Containers will put their children in the toRender queue
        _componentsNeedingRender.forEach(function (component) { return component.render(); });
        _isCurrentlyFlushing = true;
        var failed_1 = new Utils.Set();
        _componentsNeedingRender.forEach(function (component) {
            try {
                component.renderImmediately();
            }
            catch (err) {
                // throw error with timeout to avoid interrupting further renders
                window.setTimeout(function () {
                    throw err;
                }, 0);
                failed_1.add(component);
            }
        });
        _componentsNeedingComputeLayout = new Utils.Set();
        _componentsNeedingRender = failed_1;
        _animationRequested = false;
        _isCurrentlyFlushing = false;
    }
}
exports.flush = flush;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
function circle() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolCircle).size(Math.PI * Math.pow(symbolSize / 2, 2))(null); };
}
exports.circle = circle;
function square() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolSquare).size(Math.pow(symbolSize, 2))(null); };
}
exports.square = square;
function cross() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolCross).size((5 / 9) * Math.pow(symbolSize, 2))(null); };
}
exports.cross = cross;
function diamond() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolDiamond).size(Math.tan(Math.PI / 6) * Math.pow(symbolSize, 2) / 2)(null); };
}
exports.diamond = diamond;
function triangle() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolTriangle).size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2))(null); };
}
exports.triangle = triangle;
// copied from https://github.com/d3/d3-shape/blob/e2e57722004acba754ed9edff020282682450c5c/src/symbol/star.js#L3
var ka = 0.89081309152928522810;
function star() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolStar).size(ka * Math.pow(symbolSize / 2, 2))(null); };
}
exports.star = star;
// copied from https://github.com/d3/d3-shape/blob/c35b2303eb4836aba3171642f01c2653e4228b9c/src/symbol/wye.js#L2
var a = ((1 / Math.sqrt(12)) / 2 + 1) * 3;
function wye() {
    return function (symbolSize) { return d3.symbol().type(d3.symbolWye).size(a * Math.pow(symbolSize / 2.4, 2))(null); };
}
exports.wye = wye;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Interactions = __webpack_require__(13);
var Utils = __webpack_require__(0);
var coerceD3_1 = __webpack_require__(11);
var _1 = __webpack_require__(30);
var selectionBoxLayer_1 = __webpack_require__(35);
var DragBoxLayer = (function (_super) {
    __extends(DragBoxLayer, _super);
    /**
     * Constructs a DragBoxLayer.
     *
     * A DragBoxLayer is a SelectionBoxLayer with a built-in Drag Interaction.
     * A drag gesture will set the Bounds of the box.
     * If resizing is enabled using resizable(true), the edges of box can be repositioned.
     *
     * @constructor
     */
    function DragBoxLayer() {
        var _this = _super.call(this) || this;
        _this._detectionRadius = 3;
        _this._resizable = false;
        _this._movable = false;
        _this._hasCorners = true;
        _this.addClass("drag-box-layer");
        _this._dragInteraction = new Interactions.Drag();
        _this._setUpCallbacks();
        _this._dragInteraction.attachTo(_this);
        _this._dragStartCallbacks = new Utils.CallbackSet();
        _this._dragCallbacks = new Utils.CallbackSet();
        _this._dragEndCallbacks = new Utils.CallbackSet();
        return _this;
    }
    DragBoxLayer.prototype._setUpCallbacks = function () {
        var _this = this;
        var resizingEdges;
        var topLeft;
        var bottomRight;
        var lastEndPoint;
        var DRAG_MODES = {
            newBox: 0,
            resize: 1,
            move: 2,
        };
        var mode = DRAG_MODES.newBox;
        var onDragStartCallback = function (startPoint) {
            resizingEdges = _this._getResizingEdges(startPoint);
            var bounds = _this.bounds();
            var isInsideBox = bounds.topLeft.x <= startPoint.x && startPoint.x <= bounds.bottomRight.x &&
                bounds.topLeft.y <= startPoint.y && startPoint.y <= bounds.bottomRight.y;
            if (_this.boxVisible() && (resizingEdges.top || resizingEdges.bottom || resizingEdges.left || resizingEdges.right)) {
                mode = DRAG_MODES.resize;
            }
            else if (_this.boxVisible() && _this.movable() && isInsideBox) {
                mode = DRAG_MODES.move;
            }
            else {
                mode = DRAG_MODES.newBox;
                _this._setBounds({
                    topLeft: startPoint,
                    bottomRight: startPoint,
                });
                if (_this._xBoundsMode === _1.PropertyMode.VALUE && _this.xScale() != null) {
                    _this._setXExtent([_this.xScale().invert(startPoint.x), _this.xScale().invert(startPoint.x)]);
                }
                if (_this._yBoundsMode === _1.PropertyMode.VALUE && _this.yScale() != null) {
                    _this._setYExtent([_this.yScale().invert(startPoint.y), _this.yScale().invert(startPoint.y)]);
                }
                _this.render();
            }
            _this.boxVisible(true);
            bounds = _this.bounds();
            // copy points so changes to topLeft and bottomRight don't mutate bounds
            topLeft = { x: bounds.topLeft.x, y: bounds.topLeft.y };
            bottomRight = { x: bounds.bottomRight.x, y: bounds.bottomRight.y };
            lastEndPoint = startPoint;
            _this._dragStartCallbacks.callCallbacks(bounds);
        };
        var onDragCallback = function (startPoint, endPoint) {
            switch (mode) {
                case DRAG_MODES.newBox:
                    bottomRight.x = endPoint.x;
                    bottomRight.y = endPoint.y;
                    break;
                case DRAG_MODES.resize:
                    if (resizingEdges.bottom) {
                        bottomRight.y = endPoint.y;
                    }
                    else if (resizingEdges.top) {
                        topLeft.y = endPoint.y;
                    }
                    if (resizingEdges.right) {
                        bottomRight.x = endPoint.x;
                    }
                    else if (resizingEdges.left) {
                        topLeft.x = endPoint.x;
                    }
                    break;
                case DRAG_MODES.move:
                    var dx = endPoint.x - lastEndPoint.x;
                    var dy = endPoint.y - lastEndPoint.y;
                    topLeft.x += dx;
                    topLeft.y += dy;
                    bottomRight.x += dx;
                    bottomRight.y += dy;
                    lastEndPoint = endPoint;
                    break;
            }
            _this._setBounds({
                topLeft: topLeft,
                bottomRight: bottomRight,
            });
            if (_this._xBoundsMode === _1.PropertyMode.VALUE && _this.xScale() != null) {
                _this._setXExtent([_this.xScale().invert(topLeft.x), _this.xScale().invert(bottomRight.x)]);
            }
            if (_this._yBoundsMode === _1.PropertyMode.VALUE && _this.yScale() != null) {
                _this._setYExtent([_this.yScale().invert(topLeft.y), _this.yScale().invert(bottomRight.y)]);
            }
            _this.render();
            _this._dragCallbacks.callCallbacks(_this.bounds());
        };
        var onDragEndCallback = function (startPoint, endPoint) {
            if (mode === DRAG_MODES.newBox && startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
                _this.boxVisible(false);
            }
            _this._dragEndCallbacks.callCallbacks(_this.bounds());
        };
        this._dragInteraction.onDragStart(onDragStartCallback);
        this._dragInteraction.onDrag(onDragCallback);
        this._dragInteraction.onDragEnd(onDragEndCallback);
        this._disconnectInteraction = function () {
            _this._dragInteraction.offDragStart(onDragStartCallback);
            _this._dragInteraction.offDrag(onDragCallback);
            _this._dragInteraction.offDragEnd(onDragEndCallback);
            _this._dragInteraction.detachFrom(_this);
        };
    };
    DragBoxLayer.prototype._setup = function () {
        var _this = this;
        _super.prototype._setup.call(this);
        var createLine = function () { return _this._box.append("line").styles({
            opacity: 0,
            stroke: "pink",
            "pointer-events": "visibleStroke",
        }); };
        this._detectionEdgeT = createLine().classed("drag-edge-tb", true);
        this._detectionEdgeB = createLine().classed("drag-edge-tb", true);
        this._detectionEdgeL = createLine().classed("drag-edge-lr", true);
        this._detectionEdgeR = createLine().classed("drag-edge-lr", true);
        if (this._hasCorners) {
            var createCorner = function () { return _this._box.append("circle")
                .styles({
                opacity: 0,
                fill: "pink",
                "pointer-events": "visibleFill",
            }); };
            this._detectionCornerTL = createCorner().classed("drag-corner-tl", true);
            this._detectionCornerTR = createCorner().classed("drag-corner-tr", true);
            this._detectionCornerBL = createCorner().classed("drag-corner-bl", true);
            this._detectionCornerBR = createCorner().classed("drag-corner-br", true);
        }
    };
    DragBoxLayer.prototype._getResizingEdges = function (p) {
        var edges = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
        if (!this.resizable()) {
            return edges;
        }
        var bounds = this.bounds();
        var t = bounds.topLeft.y;
        var b = bounds.bottomRight.y;
        var l = bounds.topLeft.x;
        var r = bounds.bottomRight.x;
        var rad = this._detectionRadius;
        if (l - rad <= p.x && p.x <= r + rad) {
            edges.top = (t - rad <= p.y && p.y <= t + rad);
            edges.bottom = (b - rad <= p.y && p.y <= b + rad);
        }
        if (t - rad <= p.y && p.y <= b + rad) {
            edges.left = (l - rad <= p.x && p.x <= l + rad);
            edges.right = (r - rad <= p.x && p.x <= r + rad);
        }
        return edges;
    };
    DragBoxLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        if (this.boxVisible()) {
            var bounds = this.bounds();
            var t = bounds.topLeft.y;
            var b = bounds.bottomRight.y;
            var l = bounds.topLeft.x;
            var r = bounds.bottomRight.x;
            this._detectionEdgeT.attrs({
                "x1": l, "y1": t, "x2": r, "y2": t,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeB.attrs({
                "x1": l, "y1": b, "x2": r, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeL.attrs({
                "x1": l, "y1": t, "x2": l, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeR.attrs({
                "x1": r, "y1": t, "x2": r, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            if (this._hasCorners) {
                this._detectionCornerTL.attrs({ cx: l, cy: t, r: this._detectionRadius });
                this._detectionCornerTR.attrs({ cx: r, cy: t, r: this._detectionRadius });
                this._detectionCornerBL.attrs({ cx: l, cy: b, r: this._detectionRadius });
                this._detectionCornerBR.attrs({ cx: r, cy: b, r: this._detectionRadius });
            }
        }
        return this;
    };
    DragBoxLayer.prototype.detectionRadius = function (r) {
        if (r == null) {
            return this._detectionRadius;
        }
        if (r < 0) {
            throw new Error("detection radius cannot be negative.");
        }
        this._detectionRadius = r;
        this.render();
        return this;
    };
    DragBoxLayer.prototype.resizable = function (canResize) {
        if (canResize == null) {
            return this._resizable;
        }
        this._resizable = canResize;
        this._setResizableClasses(canResize);
        return this;
    };
    // Sets resizable classes. Overridden by subclasses that only resize in one dimension.
    DragBoxLayer.prototype._setResizableClasses = function (canResize) {
        if (canResize && this.enabled()) {
            this.addClass("x-resizable");
            this.addClass("y-resizable");
        }
        else {
            this.removeClass("x-resizable");
            this.removeClass("y-resizable");
        }
    };
    DragBoxLayer.prototype.movable = function (movable) {
        if (movable == null) {
            return this._movable;
        }
        this._movable = movable;
        this._setMovableClass();
        return this;
    };
    DragBoxLayer.prototype._setMovableClass = function () {
        if (this.movable() && this.enabled()) {
            this.addClass("movable");
        }
        else {
            this.removeClass("movable");
        }
    };
    /**
     * Sets the callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDragStart = function (callback) {
        this._dragStartCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDragStart = function (callback) {
        this._dragStartCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDrag = function (callback) {
        this._dragCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDrag = function (callback) {
        this._dragCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDragEnd = function (callback) {
        this._dragEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDragEnd = function (callback) {
        this._dragEndCallbacks.delete(callback);
        return this;
    };
    /**
     * Gets the internal Interactions.Drag of the DragBoxLayer.
     */
    DragBoxLayer.prototype.dragInteraction = function () {
        return this._dragInteraction;
    };
    DragBoxLayer.prototype.enabled = function (enabled) {
        if (enabled == null) {
            return this._dragInteraction.enabled();
        }
        this._dragInteraction.enabled(enabled);
        this._setResizableClasses(this.resizable());
        this._setMovableClass();
        return this;
    };
    DragBoxLayer.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this._dragStartCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
        this._dragCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
        this._dragEndCallbacks.forEach(function (callback) { return _this._dragEndCallbacks.delete(callback); });
        this._disconnectInteraction();
    };
    DragBoxLayer.prototype.detach = function () {
        this._resetState();
        this._dragInteraction.detachFrom(this);
        _super.prototype.detach.call(this);
        return this;
    };
    DragBoxLayer.prototype.anchor = function (selection) {
        selection = coerceD3_1.coerceExternalD3(selection);
        this._dragInteraction.attachTo(this);
        _super.prototype.anchor.call(this, selection);
        return this;
    };
    DragBoxLayer.prototype._resetState = function () {
        this.bounds({
            topLeft: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
        });
    };
    return DragBoxLayer;
}(selectionBoxLayer_1.SelectionBoxLayer));
exports.DragBoxLayer = DragBoxLayer;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var nativeMath = window.Math;
/**
 * Checks if x is between a and b.
 *
 * @param {number} x The value to test if in range
 * @param {number} a The beginning of the (inclusive) range
 * @param {number} b The ending of the (inclusive) range
 * @return {boolean} Whether x is in [a, b]
 */
function inRange(x, a, b) {
    return (nativeMath.min(a, b) <= x && x <= nativeMath.max(a, b));
}
exports.inRange = inRange;
/**
 * Clamps x to the range [min, max].
 *
 * @param {number} x The value to be clamped.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @return {number} A clamped value in the range [min, max].
 */
function clamp(x, min, max) {
    return nativeMath.min(nativeMath.max(min, x), max);
}
exports.clamp = clamp;
function max(array, firstArg, secondArg) {
    var accessor = typeof (firstArg) === "function" ? firstArg : null;
    var defaultValue = accessor == null ? firstArg : secondArg;
    /* tslint:disable:ban */
    var maxValue = accessor == null ? d3.max(array) : d3.max(array, accessor);
    /* tslint:enable:ban */
    return maxValue !== undefined ? maxValue : defaultValue;
}
exports.max = max;
function min(array, firstArg, secondArg) {
    var accessor = typeof (firstArg) === "function" ? firstArg : null;
    var defaultValue = accessor == null ? firstArg : secondArg;
    /* tslint:disable:ban */
    var minValue = accessor == null ? d3.min(array) : d3.min(array, accessor);
    /* tslint:enable:ban */
    return minValue !== undefined ? minValue : defaultValue;
}
exports.min = min;
/**
 * Returns true **only** if x is NaN
 */
function isNaN(n) {
    return n !== n;
}
exports.isNaN = isNaN;
/**
 * Returns true if the argument is a number, which is not NaN
 * Numbers represented as strings do not pass this function
 */
function isValidNumber(n) {
    return typeof n === "number" && !isNaN(n) && isFinite(n);
}
exports.isValidNumber = isValidNumber;
/**
 * Generates an array of consecutive, strictly increasing numbers
 * in the range [start, stop) separeted by step
 */
function range(start, stop, step) {
    if (step === void 0) { step = 1; }
    if (step === 0) {
        throw new Error("step cannot be 0");
    }
    var length = nativeMath.max(nativeMath.ceil((stop - start) / step), 0);
    var range = [];
    for (var i = 0; i < length; ++i) {
        range[i] = start + step * i;
    }
    return range;
}
exports.range = range;
/**
 * Returns the square of the distance between two points
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {number} dist(p1, p2)^2
 */
function distanceSquared(p1, p2) {
    return nativeMath.pow(p2.y - p1.y, 2) + nativeMath.pow(p2.x - p1.x, 2);
}
exports.distanceSquared = distanceSquared;
function degreesToRadians(degree) {
    return degree / 360 * nativeMath.PI * 2;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Returns if the point is within the bounds. Points along
 * the bounds are considered "within" as well.
 * @param {Point} p Point in considerations.
 * @param {Bounds} bounds Bounds within which to check for inclusion.
 */
function within(p, bounds) {
    return bounds.topLeft.x <= p.x
        && bounds.bottomRight.x >= p.x
        && bounds.topLeft.y <= p.y
        && bounds.bottomRight.y >= p.y;
}
exports.within = within;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

;
var AbstractMeasurer = (function () {
    function AbstractMeasurer(ruler) {
        if (ruler.createRuler != null) {
            this.ruler = ruler.createRuler();
        }
        else {
            this.ruler = ruler;
        }
    }
    AbstractMeasurer.prototype.measure = function (text) {
        if (text === void 0) { text = AbstractMeasurer.HEIGHT_TEXT; }
        return this.ruler(text);
    };
    return AbstractMeasurer;
}());
/**
 * A string representing the full ascender/descender range of your text.
 *
 * Note that this is really only applicable to western alphabets. If you are
 * using a different locale language such as arabic or chinese, you may want
 * to override this.
 */
AbstractMeasurer.HEIGHT_TEXT = "bdpql";
exports.AbstractMeasurer = AbstractMeasurer;
//# sourceMappingURL=abstractMeasurer.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(27));
__export(__webpack_require__(57));
__export(__webpack_require__(58));
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(59));
__export(__webpack_require__(60));
__export(__webpack_require__(61));
__export(__webpack_require__(62));
__export(__webpack_require__(35));
__export(__webpack_require__(63));
__export(__webpack_require__(64));
__export(__webpack_require__(65));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
var RenderController = __webpack_require__(25);
/**
 * Renders Components immediately after they are enqueued.
 * Useful for debugging, horrible for performance.
 */
var Immediate = (function () {
    function Immediate() {
    }
    Immediate.prototype.render = function () {
        RenderController.flush();
    };
    return Immediate;
}());
exports.Immediate = Immediate;
/**
 * The default way to render, which only tries to render every frame
 * (usually, 1/60th of a second).
 */
var AnimationFrame = (function () {
    function AnimationFrame() {
    }
    AnimationFrame.prototype.render = function () {
        Utils.DOM.requestAnimationFramePolyfill(RenderController.flush);
    };
    return AnimationFrame;
}());
exports.AnimationFrame = AnimationFrame;
/**
 * Renders with `setTimeout()`.
 * Generally an inferior way to render compared to `requestAnimationFrame`,
 * but useful for browsers that don't suppoort `requestAnimationFrame`.
 */
var Timeout = (function () {
    function Timeout() {
        this._timeoutMsec = Utils.DOM.SCREEN_REFRESH_RATE_MILLISECONDS;
    }
    Timeout.prototype.render = function () {
        setTimeout(RenderController.flush, this._timeoutMsec);
    };
    return Timeout;
}());
exports.Timeout = Timeout;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dispatchers = __webpack_require__(12);
var Utils = __webpack_require__(0);
var interaction_1 = __webpack_require__(14);
var Key = (function (_super) {
    __extends(Key, _super);
    function Key() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._keyPressCallbacks = {};
        _this._keyReleaseCallbacks = {};
        _this._mouseMoveCallback = function (point) { return false; }; // HACKHACK: registering a listener
        _this._downedKeys = new Utils.Set();
        _this._keyDownCallback = function (keyCode, event) { return _this._handleKeyDownEvent(keyCode, event); };
        _this._keyUpCallback = function (keyCode) { return _this._handleKeyUpEvent(keyCode); };
        return _this;
    }
    Key.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._positionDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._positionDispatcher.onMouseMove(this._mouseMoveCallback);
        this._keyDispatcher = Dispatchers.Key.getDispatcher();
        this._keyDispatcher.onKeyDown(this._keyDownCallback);
        this._keyDispatcher.onKeyUp(this._keyUpCallback);
    };
    Key.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._positionDispatcher.offMouseMove(this._mouseMoveCallback);
        this._positionDispatcher = null;
        this._keyDispatcher.offKeyDown(this._keyDownCallback);
        this._keyDispatcher.offKeyUp(this._keyUpCallback);
        this._keyDispatcher = null;
    };
    Key.prototype._handleKeyDownEvent = function (keyCode, event) {
        var p = this._translateToComponentSpace(this._positionDispatcher.lastMousePosition());
        if (this._isInsideComponent(p) && !event.repeat) {
            if (this._keyPressCallbacks[keyCode]) {
                this._keyPressCallbacks[keyCode].callCallbacks(keyCode);
            }
            this._downedKeys.add(keyCode);
        }
    };
    Key.prototype._handleKeyUpEvent = function (keyCode) {
        if (this._downedKeys.has(keyCode) && this._keyReleaseCallbacks[keyCode]) {
            this._keyReleaseCallbacks[keyCode].callCallbacks(keyCode);
        }
        this._downedKeys.delete(keyCode);
    };
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.onKeyPress = function (keyCode, callback) {
        if (!this._keyPressCallbacks[keyCode]) {
            this._keyPressCallbacks[keyCode] = new Utils.CallbackSet();
        }
        this._keyPressCallbacks[keyCode].add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.offKeyPress = function (keyCode, callback) {
        this._keyPressCallbacks[keyCode].delete(callback);
        if (this._keyPressCallbacks[keyCode].size === 0) {
            delete this._keyPressCallbacks[keyCode];
        }
        return this;
    };
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.onKeyRelease = function (keyCode, callback) {
        if (!this._keyReleaseCallbacks[keyCode]) {
            this._keyReleaseCallbacks[keyCode] = new Utils.CallbackSet();
        }
        this._keyReleaseCallbacks[keyCode].add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.offKeyRelease = function (keyCode, callback) {
        this._keyReleaseCallbacks[keyCode].delete(callback);
        if (this._keyReleaseCallbacks[keyCode].size === 0) {
            delete this._keyReleaseCallbacks[keyCode];
        }
        return this;
    };
    return Key;
}(interaction_1.Interaction));
exports.Key = Key;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var componentContainer_1 = __webpack_require__(24);
var Group = (function (_super) {
    __extends(Group, _super);
    /**
     * Constructs a Group.
     *
     * A Group contains Components that will be rendered on top of each other.
     * Components added later will be rendered above Components already in the Group.
     *
     * @constructor
     * @param {Component[]} [components=[]] Components to be added to the Group.
     */
    function Group(components) {
        if (components === void 0) { components = []; }
        var _this = _super.call(this) || this;
        _this._components = [];
        _this.addClass("component-group");
        components.forEach(function (c) { return _this.append(c); });
        return _this;
    }
    Group.prototype._forEach = function (callback) {
        this.components().forEach(callback);
    };
    /**
     * Checks whether the specified Component is in the Group.
     */
    Group.prototype.has = function (component) {
        return this._components.indexOf(component) >= 0;
    };
    Group.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var requests = this._components.map(function (c) { return c.requestedSpace(offeredWidth, offeredHeight); });
        return {
            minWidth: Utils.Math.max(requests, function (request) { return request.minWidth; }, 0),
            minHeight: Utils.Math.max(requests, function (request) { return request.minHeight; }, 0),
        };
    };
    Group.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        var _this = this;
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        this._forEach(function (component) {
            component.computeLayout({ x: 0, y: 0 }, _this.width(), _this.height());
        });
        return this;
    };
    Group.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        return {
            width: availableWidth,
            height: availableHeight,
        };
    };
    Group.prototype.fixedWidth = function () {
        return this._components.every(function (c) { return c.fixedWidth(); });
    };
    Group.prototype.fixedHeight = function () {
        return this._components.every(function (c) { return c.fixedHeight(); });
    };
    /**
     * @return {Component[]} The Components in this Group.
     */
    Group.prototype.components = function () {
        return this._components.slice();
    };
    /**
     * Adds a Component to this Group.
     * The added Component will be rendered above Components already in the Group.
     */
    Group.prototype.append = function (component) {
        if (component != null && !this.has(component)) {
            component.detach();
            this._components.push(component);
            this._adoptAndAnchor(component);
            this.redraw();
        }
        return this;
    };
    Group.prototype._remove = function (component) {
        var removeIndex = this._components.indexOf(component);
        if (removeIndex >= 0) {
            this._components.splice(removeIndex, 1);
            return true;
        }
        return false;
    };
    return Group;
}(componentContainer_1.ComponentContainer));
exports.Group = Group;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var component_1 = __webpack_require__(5);
var PropertyMode;
(function (PropertyMode) {
    PropertyMode[PropertyMode["VALUE"] = 0] = "VALUE";
    PropertyMode[PropertyMode["PIXEL"] = 1] = "PIXEL";
})(PropertyMode || (PropertyMode = {}));
var GuideLineLayer = (function (_super) {
    __extends(GuideLineLayer, _super);
    function GuideLineLayer(orientation) {
        var _this = _super.call(this) || this;
        _this._mode = PropertyMode.VALUE;
        if (orientation !== GuideLineLayer.ORIENTATION_VERTICAL && orientation !== GuideLineLayer.ORIENTATION_HORIZONTAL) {
            throw new Error(orientation + " is not a valid orientation for GuideLineLayer");
        }
        _this._orientation = orientation;
        _this._overflowHidden = true;
        _this.addClass("guide-line-layer");
        if (_this._isVertical()) {
            _this.addClass("vertical");
        }
        else {
            _this.addClass("horizontal");
        }
        _this._scaleUpdateCallback = function () {
            _this._syncPixelPositionAndValue();
            _this.render();
        };
        return _this;
    }
    GuideLineLayer.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._guideLine = this.content().append("line").classed("guide-line", true);
    };
    GuideLineLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        return {
            width: availableWidth,
            height: availableHeight,
        };
    };
    GuideLineLayer.prototype._isVertical = function () {
        return this._orientation === GuideLineLayer.ORIENTATION_VERTICAL;
    };
    GuideLineLayer.prototype.fixedWidth = function () {
        return true;
    };
    GuideLineLayer.prototype.fixedHeight = function () {
        return true;
    };
    GuideLineLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (this.scale() != null) {
            if (this._isVertical()) {
                this.scale().range([0, this.width()]);
            }
            else {
                this.scale().range([this.height(), 0]);
            }
        }
        return this;
    };
    GuideLineLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        this._syncPixelPositionAndValue();
        this._guideLine.attrs({
            "x1": this._isVertical() ? this.pixelPosition() : 0,
            "y1": this._isVertical() ? 0 : this.pixelPosition(),
            "x2": this._isVertical() ? this.pixelPosition() : this.width(),
            "y2": this._isVertical() ? this.height() : this.pixelPosition(),
        });
        return this;
    };
    // sets pixelPosition() or value() based on the other, depending on which was the last one set
    GuideLineLayer.prototype._syncPixelPositionAndValue = function () {
        if (this.scale() == null) {
            return;
        }
        if (this._mode === PropertyMode.VALUE && this.value() != null) {
            this._pixelPosition = this.scale().scale(this.value());
        }
        else if (this._mode === PropertyMode.PIXEL && this.pixelPosition() != null) {
            this._value = this.scale().invert(this.pixelPosition());
        }
    };
    GuideLineLayer.prototype._setPixelPositionWithoutChangingMode = function (pixelPosition) {
        this._pixelPosition = pixelPosition;
        if (this.scale() != null) {
            this._value = this.scale().invert(this.pixelPosition());
        }
        this.render();
    };
    GuideLineLayer.prototype.scale = function (scale) {
        if (scale == null) {
            return this._scale;
        }
        var previousScale = this._scale;
        if (previousScale != null) {
            previousScale.offUpdate(this._scaleUpdateCallback);
        }
        this._scale = scale;
        this._scale.onUpdate(this._scaleUpdateCallback);
        this._syncPixelPositionAndValue();
        this.redraw();
        return this;
    };
    GuideLineLayer.prototype.value = function (value) {
        if (value == null) {
            return this._value;
        }
        this._value = value;
        this._mode = PropertyMode.VALUE;
        this._syncPixelPositionAndValue();
        this.render();
        return this;
    };
    GuideLineLayer.prototype.pixelPosition = function (pixelPosition) {
        if (pixelPosition == null) {
            return this._pixelPosition;
        }
        if (!Utils.Math.isValidNumber(pixelPosition)) {
            throw new Error("pixelPosition must be a finite number");
        }
        this._pixelPosition = pixelPosition;
        this._mode = PropertyMode.PIXEL;
        this._syncPixelPositionAndValue();
        this.render();
        return this;
    };
    GuideLineLayer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.scale() != null) {
            this.scale().offUpdate(this._scaleUpdateCallback);
        }
    };
    return GuideLineLayer;
}(component_1.Component));
GuideLineLayer.ORIENTATION_VERTICAL = "vertical";
GuideLineLayer.ORIENTATION_HORIZONTAL = "horizontal";
exports.GuideLineLayer = GuideLineLayer;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var component_1 = __webpack_require__(5);
var PropertyMode;
(function (PropertyMode) {
    PropertyMode[PropertyMode["VALUE"] = 0] = "VALUE";
    PropertyMode[PropertyMode["PIXEL"] = 1] = "PIXEL";
})(PropertyMode = exports.PropertyMode || (exports.PropertyMode = {}));
var SelectionBoxLayer = (function (_super) {
    __extends(SelectionBoxLayer, _super);
    function SelectionBoxLayer() {
        var _this = _super.call(this) || this;
        _this._boxVisible = false;
        _this._boxBounds = {
            topLeft: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
        };
        _this._xBoundsMode = PropertyMode.PIXEL;
        _this._yBoundsMode = PropertyMode.PIXEL;
        _this.addClass("selection-box-layer");
        _this._adjustBoundsCallback = function () {
            _this.render();
        };
        _this._overflowHidden = true;
        _this._xExtent = [undefined, undefined];
        _this._yExtent = [undefined, undefined];
        return _this;
    }
    SelectionBoxLayer.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._box = this.content().append("g").classed("selection-box", true).remove();
        this._boxArea = this._box.append("rect").classed("selection-area", true);
    };
    SelectionBoxLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        return {
            width: availableWidth,
            height: availableHeight,
        };
    };
    SelectionBoxLayer.prototype.bounds = function (newBounds) {
        if (newBounds == null) {
            return this._getBounds();
        }
        this._setBounds(newBounds);
        this._xBoundsMode = PropertyMode.PIXEL;
        this._yBoundsMode = PropertyMode.PIXEL;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._setBounds = function (newBounds) {
        var topLeft = {
            x: Math.min(newBounds.topLeft.x, newBounds.bottomRight.x),
            y: Math.min(newBounds.topLeft.y, newBounds.bottomRight.y),
        };
        var bottomRight = {
            x: Math.max(newBounds.topLeft.x, newBounds.bottomRight.x),
            y: Math.max(newBounds.topLeft.y, newBounds.bottomRight.y),
        };
        this._boxBounds = {
            topLeft: topLeft,
            bottomRight: bottomRight,
        };
    };
    SelectionBoxLayer.prototype._getBounds = function () {
        return {
            topLeft: {
                x: this._xBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.topLeft.x :
                    (this._xScale == null ?
                        0 :
                        Math.min(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                y: this._yBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.topLeft.y :
                    (this._yScale == null ?
                        0 :
                        Math.min(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1]))),
            },
            bottomRight: {
                x: this._xBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.bottomRight.x :
                    (this._xScale == null ?
                        0 :
                        Math.max(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                y: this._yBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.bottomRight.y :
                    (this._yScale == null ?
                        0 :
                        Math.max(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1]))),
            },
        };
    };
    SelectionBoxLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        if (this._boxVisible) {
            var bounds = this.bounds();
            var t = bounds.topLeft.y;
            var b = bounds.bottomRight.y;
            var l = bounds.topLeft.x;
            var r = bounds.bottomRight.x;
            if (!(Utils.Math.isValidNumber(t) &&
                Utils.Math.isValidNumber(b) &&
                Utils.Math.isValidNumber(l) &&
                Utils.Math.isValidNumber(r))) {
                throw new Error("bounds have not been properly set");
            }
            this._boxArea.attrs({
                x: l, y: t, width: r - l, height: b - t,
            });
            this.content().node().appendChild(this._box.node());
        }
        else {
            this._box.remove();
        }
        return this;
    };
    SelectionBoxLayer.prototype.boxVisible = function (show) {
        if (show == null) {
            return this._boxVisible;
        }
        this._boxVisible = show;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.fixedWidth = function () {
        return true;
    };
    SelectionBoxLayer.prototype.fixedHeight = function () {
        return true;
    };
    SelectionBoxLayer.prototype.xScale = function (xScale) {
        if (xScale == null) {
            return this._xScale;
        }
        if (this._xScale != null) {
            this._xScale.offUpdate(this._adjustBoundsCallback);
        }
        this._xScale = xScale;
        this._xBoundsMode = PropertyMode.VALUE;
        this._xScale.onUpdate(this._adjustBoundsCallback);
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.yScale = function (yScale) {
        if (yScale == null) {
            return this._yScale;
        }
        if (this._yScale != null) {
            this._yScale.offUpdate(this._adjustBoundsCallback);
        }
        this._yScale = yScale;
        this._yBoundsMode = PropertyMode.VALUE;
        this._yScale.onUpdate(this._adjustBoundsCallback);
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.xExtent = function (xExtent) {
        // Explicit typing for Typescript 1.4
        if (xExtent == null) {
            return this._getXExtent();
        }
        this._setXExtent(xExtent);
        this._xBoundsMode = PropertyMode.VALUE;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._getXExtent = function () {
        return this._xBoundsMode === PropertyMode.VALUE ?
            this._xExtent :
            (this._xScale == null ?
                [undefined, undefined] :
                [
                    this._xScale.invert(this._boxBounds.topLeft.x),
                    this._xScale.invert(this._boxBounds.bottomRight.x),
                ]);
    };
    SelectionBoxLayer.prototype._setXExtent = function (xExtent) {
        this._xExtent = xExtent;
    };
    SelectionBoxLayer.prototype.yExtent = function (yExtent) {
        // Explicit typing for Typescript 1.4
        if (yExtent == null) {
            return this._getYExtent();
        }
        this._setYExtent(yExtent);
        this._yBoundsMode = PropertyMode.VALUE;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._getYExtent = function () {
        return this._yBoundsMode === PropertyMode.VALUE ?
            this._yExtent :
            (this._yScale == null ?
                [undefined, undefined] :
                [
                    this._yScale.invert(this._boxBounds.topLeft.y),
                    this._yScale.invert(this._boxBounds.bottomRight.y),
                ]);
    };
    SelectionBoxLayer.prototype._setYExtent = function (yExtent) {
        this._yExtent = yExtent;
    };
    SelectionBoxLayer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this._xScale != null) {
            this.xScale().offUpdate(this._adjustBoundsCallback);
        }
        if (this._yScale != null) {
            this.yScale().offUpdate(this._adjustBoundsCallback);
        }
    };
    return SelectionBoxLayer;
}(component_1.Component));
exports.SelectionBoxLayer = SelectionBoxLayer;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var Plots = __webpack_require__(16);
var linePlot_1 = __webpack_require__(38);
var plot_1 = __webpack_require__(2);
var Area = (function (_super) {
    __extends(Area, _super);
    /**
     * An Area Plot draws a filled region (area) between Y and Y0.
     *
     * @constructor
     */
    function Area() {
        var _this = _super.call(this) || this;
        _this.addClass("area-plot");
        _this.y0(0); // default
        _this.attr("fill-opacity", 0.25);
        _this.attr("fill", new Scales.Color().range()[0]);
        _this._lineDrawers = new Utils.Map();
        return _this;
    }
    Area.prototype._setup = function () {
        var _this = this;
        _super.prototype._setup.call(this);
        this._lineDrawers.forEach(function (d) { return d.renderArea(_this._renderArea.append("g")); });
    };
    Area.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
        }
        if (yScale != null) {
            var y0 = this.y0().accessor;
            if (y0 != null) {
                this._bindProperty(Area._Y0_KEY, y0, yScale);
            }
            this._updateYScale();
        }
        return this;
    };
    Area.prototype.y0 = function (y0) {
        if (y0 == null) {
            return this._propertyBindings.get(Area._Y0_KEY);
        }
        var yBinding = this.y();
        var yScale = yBinding && yBinding.scale;
        this._bindProperty(Area._Y0_KEY, y0, yScale);
        this._updateYScale();
        this.render();
        return this;
    };
    Area.prototype._onDatasetUpdate = function () {
        _super.prototype._onDatasetUpdate.call(this);
        this._updateYScale();
    };
    Area.prototype.addDataset = function (dataset) {
        _super.prototype.addDataset.call(this, dataset);
        return this;
    };
    Area.prototype._addDataset = function (dataset) {
        var _this = this;
        var lineDrawer = new Drawers.Line(dataset, function () { return _this._d3LineFactory(dataset); });
        if (this._isSetup) {
            lineDrawer.renderArea(this._renderArea.append("g"));
        }
        this._lineDrawers.set(dataset, lineDrawer);
        _super.prototype._addDataset.call(this, dataset);
        return this;
    };
    Area.prototype._removeDatasetNodes = function (dataset) {
        _super.prototype._removeDatasetNodes.call(this, dataset);
        this._lineDrawers.get(dataset).remove();
    };
    Area.prototype._additionalPaint = function () {
        var _this = this;
        var drawSteps = this._generateLineDrawSteps();
        var dataToDraw = this._getDataToDraw();
        this.datasets().forEach(function (dataset) { return _this._lineDrawers.get(dataset).draw(dataToDraw.get(dataset), drawSteps); });
    };
    Area.prototype._generateLineDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var attrToProjector = this._generateLineAttrToProjector();
            attrToProjector["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), this._getResetYFunction());
            drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateLineAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Area.prototype._generateLineAttrToProjector = function () {
        var lineAttrToProjector = this._generateAttrToProjector();
        lineAttrToProjector["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), plot_1.Plot._scaledAccessor(this.y()));
        return lineAttrToProjector;
    };
    Area.prototype._createDrawer = function (dataset) {
        return new Drawers.Area(dataset);
    };
    Area.prototype._generateDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var attrToProjector = this._generateAttrToProjector();
            attrToProjector["d"] = this._constructAreaProjector(plot_1.Plot._scaledAccessor(this.x()), this._getResetYFunction(), plot_1.Plot._scaledAccessor(this.y0()));
            drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Area.prototype._updateYScale = function () {
        var extents = this._propertyExtents.get("y0");
        var extent = Utils.Array.flatten(extents);
        var uniqExtentVals = Utils.Array.uniq(extent);
        var constantBaseline = uniqExtentVals.length === 1 ? uniqExtentVals[0] : null;
        var yBinding = this.y();
        var yScale = (yBinding && yBinding.scale);
        if (yScale == null) {
            return;
        }
        if (this._constantBaselineValueProvider != null) {
            yScale.removePaddingExceptionsProvider(this._constantBaselineValueProvider);
            this._constantBaselineValueProvider = null;
        }
        if (constantBaseline != null) {
            this._constantBaselineValueProvider = function () { return [constantBaseline]; };
            yScale.addPaddingExceptionsProvider(this._constantBaselineValueProvider);
        }
    };
    Area.prototype._getResetYFunction = function () {
        return plot_1.Plot._scaledAccessor(this.y0());
    };
    Area.prototype._propertyProjectors = function () {
        var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
        propertyToProjectors["d"] = this._constructAreaProjector(plot_1.Plot._scaledAccessor(this.x()), plot_1.Plot._scaledAccessor(this.y()), plot_1.Plot._scaledAccessor(this.y0()));
        return propertyToProjectors;
    };
    Area.prototype.selections = function (datasets) {
        var _this = this;
        if (datasets === void 0) { datasets = this.datasets(); }
        var allSelections = _super.prototype.selections.call(this, datasets).nodes();
        var lineDrawers = datasets.map(function (dataset) { return _this._lineDrawers.get(dataset); })
            .filter(function (drawer) { return drawer != null; });
        lineDrawers.forEach(function (ld, i) { return allSelections.push(ld.selectionForIndex(i).node()); });
        return d3.selectAll(allSelections);
    };
    Area.prototype._constructAreaProjector = function (xProjector, yProjector, y0Projector) {
        var _this = this;
        var definedProjector = function (d, i, dataset) {
            var positionX = plot_1.Plot._scaledAccessor(_this.x())(d, i, dataset);
            var positionY = plot_1.Plot._scaledAccessor(_this.y())(d, i, dataset);
            return Utils.Math.isValidNumber(positionX) && Utils.Math.isValidNumber(positionY);
        };
        return function (datum, index, dataset) {
            // just runtime error if user passes curveBundle to area plot
            var curveFactory = _this._getCurveFactory();
            var areaGenerator = d3.area()
                .x(function (innerDatum, innerIndex) { return xProjector(innerDatum, innerIndex, dataset); })
                .y1(function (innerDatum, innerIndex) { return yProjector(innerDatum, innerIndex, dataset); })
                .y0(function (innerDatum, innerIndex) { return y0Projector(innerDatum, innerIndex, dataset); })
                .curve(curveFactory)
                .defined(function (innerDatum, innerIndex) { return definedProjector(innerDatum, innerIndex, dataset); });
            return areaGenerator(datum);
        };
    };
    return Area;
}(linePlot_1.Line));
Area._Y0_KEY = "y0";
exports.Area = Area;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Animator;
(function (Animator) {
    Animator.MAIN = "main";
    Animator.RESET = "reset";
})(Animator = exports.Animator || (exports.Animator = {}));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Animators = __webpack_require__(6);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var quantitativeScale_1 = __webpack_require__(10);
var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
var Plots = __webpack_require__(16);
var plot_1 = __webpack_require__(2);
var xyPlot_1 = __webpack_require__(15);
var CURVE_NAME_MAPPING = {
    linear: d3.curveLinear,
    linearClosed: d3.curveLinearClosed,
    step: d3.curveStep,
    stepBefore: d3.curveStepBefore,
    stepAfter: d3.curveStepAfter,
    basis: d3.curveBasis,
    basisOpen: d3.curveBasisOpen,
    basisClosed: d3.curveBasisClosed,
    bundle: d3.curveBundle,
    cardinal: d3.curveCardinal,
    cardinalOpen: d3.curveCardinalOpen,
    cardinalClosed: d3.curveCardinalClosed,
    monotone: d3.curveMonotoneX,
};
/**
 * Known curve types that line and area plot's .curve() methods understand
 */
exports.CurveName = makeEnum_1.makeEnum([
    "linear",
    "linearClosed",
    "step",
    "stepBefore",
    "stepAfter",
    "basis",
    "basisOpen",
    "basisClosed",
    "bundle",
    "cardinal",
    "cardinalOpen",
    "cardinalClosed",
    "monotone",
]);
var Line = (function (_super) {
    __extends(Line, _super);
    /**
     * A Line Plot draws line segments starting from the first data point to the next.
     *
     * @constructor
     */
    function Line() {
        var _this = _super.call(this) || this;
        _this._curve = "linear";
        _this._autorangeSmooth = false;
        _this._croppedRenderingEnabled = true;
        _this._downsamplingEnabled = false;
        _this.addClass("line-plot");
        var animator = new Animators.Easing();
        animator.stepDuration(plot_1.Plot._ANIMATION_MAX_DURATION);
        animator.easingMode("expInOut");
        animator.maxTotalDuration(plot_1.Plot._ANIMATION_MAX_DURATION);
        _this.animator(Plots.Animator.MAIN, animator);
        _this.attr("stroke", new Scales.Color().range()[0]);
        _this.attr("stroke-width", "2px");
        return _this;
    }
    Line.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        else {
            if (xScale == null) {
                _super.prototype.x.call(this, x);
            }
            else {
                _super.prototype.x.call(this, x, xScale);
            }
            this._setScaleSnapping();
            return this;
        }
    };
    Line.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
            this._setScaleSnapping();
            return this;
        }
    };
    Line.prototype.autorangeMode = function (autorangeMode) {
        if (autorangeMode == null) {
            return _super.prototype.autorangeMode.call(this);
        }
        _super.prototype.autorangeMode.call(this, autorangeMode);
        this._setScaleSnapping();
        return this;
    };
    Line.prototype.autorangeSmooth = function (autorangeSmooth) {
        if (autorangeSmooth == null) {
            return this._autorangeSmooth;
        }
        this._autorangeSmooth = autorangeSmooth;
        this._setScaleSnapping();
        return this;
    };
    Line.prototype._setScaleSnapping = function () {
        if (this.autorangeMode() === "x" && this.x() && this.x().scale && this.x().scale instanceof quantitativeScale_1.QuantitativeScale) {
            this.x().scale.snappingDomainEnabled(!this.autorangeSmooth());
        }
        if (this.autorangeMode() === "y" && this.y() && this.y().scale && this.y().scale instanceof quantitativeScale_1.QuantitativeScale) {
            this.y().scale.snappingDomainEnabled(!this.autorangeSmooth());
        }
    };
    Line.prototype.curve = function (curve) {
        if (curve == null) {
            return this._curve;
        }
        this._curve = curve;
        this.render();
        return this;
    };
    Line.prototype.downsamplingEnabled = function (downsampling) {
        if (downsampling == null) {
            return this._downsamplingEnabled;
        }
        this._downsamplingEnabled = downsampling;
        return this;
    };
    Line.prototype.croppedRenderingEnabled = function (croppedRendering) {
        if (croppedRendering == null) {
            return this._croppedRenderingEnabled;
        }
        this._croppedRenderingEnabled = croppedRendering;
        this.render();
        return this;
    };
    Line.prototype._createDrawer = function (dataset) {
        var _this = this;
        return new Drawers.Line(dataset, function () { return _this._d3LineFactory(dataset); });
    };
    Line.prototype._extentsForProperty = function (property) {
        var extents = _super.prototype._extentsForProperty.call(this, property);
        if (!this._autorangeSmooth) {
            return extents;
        }
        if (this.autorangeMode() !== property) {
            return extents;
        }
        if (this.autorangeMode() !== "x" && this.autorangeMode() !== "y") {
            return extents;
        }
        var edgeIntersectionPoints = this._getEdgeIntersectionPoints();
        var includedValues;
        if (this.autorangeMode() === "y") {
            includedValues = edgeIntersectionPoints.left.concat(edgeIntersectionPoints.right).map(function (point) { return point.y; });
        }
        else {
            includedValues = edgeIntersectionPoints.top.concat(edgeIntersectionPoints.bottom).map(function (point) { return point.x; });
        }
        return extents.map(function (extent) { return d3.extent(d3.merge([extent, includedValues])); });
    };
    Line.prototype._getEdgeIntersectionPoints = function () {
        var _this = this;
        if (!(this.y().scale instanceof quantitativeScale_1.QuantitativeScale && this.x().scale instanceof quantitativeScale_1.QuantitativeScale)) {
            return {
                left: [],
                right: [],
                top: [],
                bottom: [],
            };
        }
        var yScale = this.y().scale;
        var xScale = this.x().scale;
        var intersectionPoints = {
            left: [],
            right: [],
            top: [],
            bottom: [],
        };
        var leftX = xScale.scale(xScale.domain()[0]);
        var rightX = xScale.scale(xScale.domain()[1]);
        var bottomY = yScale.scale(yScale.domain()[0]);
        var topY = yScale.scale(yScale.domain()[1]);
        this.datasets().forEach(function (dataset) {
            var data = dataset.data();
            var x1, x2, y1, y2;
            var prevX, prevY, currX, currY;
            for (var i = 1; i < data.length; i++) {
                prevX = currX || xScale.scale(_this.x().accessor(data[i - 1], i - 1, dataset));
                prevY = currY || yScale.scale(_this.y().accessor(data[i - 1], i - 1, dataset));
                currX = xScale.scale(_this.x().accessor(data[i], i, dataset));
                currY = yScale.scale(_this.y().accessor(data[i], i, dataset));
                // If values crossed left edge
                if ((prevX < leftX) === (leftX <= currX)) {
                    x1 = leftX - prevX;
                    x2 = currX - prevX;
                    y2 = currY - prevY;
                    y1 = x1 * y2 / x2;
                    intersectionPoints.left.push({
                        x: leftX,
                        y: yScale.invert(prevY + y1),
                    });
                }
                // If values crossed right edge
                if ((prevX < rightX) === (rightX <= currX)) {
                    x1 = rightX - prevX;
                    x2 = currX - prevX;
                    y2 = currY - prevY;
                    y1 = x1 * y2 / x2;
                    intersectionPoints.right.push({
                        x: rightX,
                        y: yScale.invert(prevY + y1),
                    });
                }
                // If values crossed upper edge
                if ((prevY < topY) === (topY <= currY)) {
                    x2 = currX - prevX;
                    y1 = topY - prevY;
                    y2 = currY - prevY;
                    x1 = y1 * x2 / y2;
                    intersectionPoints.top.push({
                        x: xScale.invert(prevX + x1),
                        y: topY,
                    });
                }
                // If values crossed lower edge
                if ((prevY < bottomY) === (bottomY <= currY)) {
                    x2 = currX - prevX;
                    y1 = bottomY - prevY;
                    y2 = currY - prevY;
                    x1 = y1 * x2 / y2;
                    intersectionPoints.bottom.push({
                        x: xScale.invert(prevX + x1),
                        y: bottomY,
                    });
                }
            }
        });
        return intersectionPoints;
    };
    Line.prototype._getResetYFunction = function () {
        // gets the y-value generator for the animation start point
        var yDomain = this.y().scale.domain();
        var domainMax = Math.max(yDomain[0], yDomain[1]);
        var domainMin = Math.min(yDomain[0], yDomain[1]);
        // start from zero, or the closest domain value to zero
        // avoids lines zooming on from offscreen.
        var startValue = (domainMax < 0 && domainMax) || (domainMin > 0 && domainMin) || 0;
        var scaledStartValue = this.y().scale.scale(startValue);
        return function (d, i, dataset) { return scaledStartValue; };
    };
    Line.prototype._generateDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var attrToProjector = this._generateAttrToProjector();
            attrToProjector["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), this._getResetYFunction());
            drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Line.prototype._generateAttrToProjector = function () {
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        Object.keys(attrToProjector).forEach(function (attribute) {
            if (attribute === "d") {
                return;
            }
            var projector = attrToProjector[attribute];
            attrToProjector[attribute] = function (data, i, dataset) {
                return data.length > 0 ? projector(data[0], i, dataset) : null;
            };
        });
        return attrToProjector;
    };
    Line.prototype.entitiesAt = function (point) {
        var entity = this.entityNearestByXThenY(point);
        if (entity != null) {
            return [entity];
        }
        else {
            return [];
        }
    };
    Line.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        return this.entities().filter(function (entity) {
            var datum = entity.datum, index = entity.index, dataset = entity.dataset;
            var x = xProjector(datum, index, dataset);
            var y = yProjector(datum, index, dataset);
            return dataXRange.min <= x && x <= dataXRange.max && dataYRange.min <= y && y <= dataYRange.max;
        });
    };
    /**
     * Returns the PlotEntity nearest to the query point by X then by Y, or undefined if no PlotEntity can be found.
     *
     * @param {Point} queryPoint
     * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
     */
    Line.prototype.entityNearestByXThenY = function (queryPoint) {
        var _this = this;
        var minXDist = Infinity;
        var minYDist = Infinity;
        var closest;
        var chartBounds = this.bounds();
        this.entities().forEach(function (entity) {
            if (!_this._entityVisibleOnPlot(entity, chartBounds)) {
                return;
            }
            var xDist = Math.abs(queryPoint.x - entity.position.x);
            var yDist = Math.abs(queryPoint.y - entity.position.y);
            if (xDist < minXDist || xDist === minXDist && yDist < minYDist) {
                closest = entity;
                minXDist = xDist;
                minYDist = yDist;
            }
        });
        return closest;
    };
    Line.prototype._propertyProjectors = function () {
        var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
        propertyToProjectors["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), plot_1.Plot._scaledAccessor(this.y()));
        return propertyToProjectors;
    };
    Line.prototype._constructLineProjector = function (xProjector, yProjector) {
        var _this = this;
        return function (datum, index, dataset) {
            return _this._d3LineFactory(dataset, xProjector, yProjector)(datum);
        };
    };
    /**
     * Return a d3.Line whose .x, .y, and .defined accessors are hooked up to the xProjector and yProjector
     * after they've been fed the dataset, and whose curve is configured to this plot's curve.
     * @param dataset
     * @param xProjector
     * @param yProjector
     * @returns {Line<[number,number]>}
     * @private
     */
    Line.prototype._d3LineFactory = function (dataset, xProjector, yProjector) {
        var _this = this;
        if (xProjector === void 0) { xProjector = plot_1.Plot._scaledAccessor(this.x()); }
        if (yProjector === void 0) { yProjector = plot_1.Plot._scaledAccessor(this.y()); }
        var definedProjector = function (d, i, dataset) {
            var positionX = plot_1.Plot._scaledAccessor(_this.x())(d, i, dataset);
            var positionY = plot_1.Plot._scaledAccessor(_this.y())(d, i, dataset);
            return positionX != null && !Utils.Math.isNaN(positionX) &&
                positionY != null && !Utils.Math.isNaN(positionY);
        };
        return d3.line()
            .x(function (innerDatum, innerIndex) { return xProjector(innerDatum, innerIndex, dataset); })
            .y(function (innerDatum, innerIndex) { return yProjector(innerDatum, innerIndex, dataset); })
            .curve(this._getCurveFactory())
            .defined(function (innerDatum, innerIndex) { return definedProjector(innerDatum, innerIndex, dataset); });
    };
    ;
    Line.prototype._getCurveFactory = function () {
        var curve = this.curve();
        if (typeof curve === "string") {
            var maybeCurveFunction = CURVE_NAME_MAPPING[curve];
            if (maybeCurveFunction == null) {
                // oops; name is wrong - default to linear instead
                return CURVE_NAME_MAPPING["linear"];
            }
            else {
                return maybeCurveFunction;
            }
        }
        else {
            return curve;
        }
    };
    /**
     * Line plots represent each dataset with a single <path> element, so we wrap the dataset data in a single element array.
     * @returns {Map<Dataset, any[]>}
     * @private
     */
    Line.prototype._getDataToDraw = function () {
        var _this = this;
        var dataToDraw = new Utils.Map();
        this.datasets().forEach(function (dataset) {
            var data = dataset.data();
            if (!_this._croppedRenderingEnabled && !_this._downsamplingEnabled) {
                dataToDraw.set(dataset, [data]);
                return;
            }
            var filteredDataIndices = data.map(function (d, i) { return i; });
            if (_this._croppedRenderingEnabled) {
                filteredDataIndices = _this._filterCroppedRendering(dataset, filteredDataIndices);
            }
            if (_this._downsamplingEnabled) {
                filteredDataIndices = _this._filterDownsampling(dataset, filteredDataIndices);
            }
            dataToDraw.set(dataset, [filteredDataIndices.map(function (d, i) { return data[d]; })]);
        });
        return dataToDraw;
    };
    Line.prototype._filterCroppedRendering = function (dataset, indices) {
        var _this = this;
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        var data = dataset.data();
        var filteredDataIndices = [];
        var pointInViewport = function (x, y) {
            return Utils.Math.inRange(x, 0, _this.width()) &&
                Utils.Math.inRange(y, 0, _this.height());
        };
        for (var i = 0; i < indices.length; i++) {
            var currXPoint = xProjector(data[indices[i]], indices[i], dataset);
            var currYPoint = yProjector(data[indices[i]], indices[i], dataset);
            var shouldShow = pointInViewport(currXPoint, currYPoint);
            if (!shouldShow && indices[i - 1] != null && data[indices[i - 1]] != null) {
                var prevXPoint = xProjector(data[indices[i - 1]], indices[i - 1], dataset);
                var prevYPoint = yProjector(data[indices[i - 1]], indices[i - 1], dataset);
                shouldShow = shouldShow || pointInViewport(prevXPoint, prevYPoint);
            }
            if (!shouldShow && indices[i + 1] != null && data[indices[i + 1]] != null) {
                var nextXPoint = xProjector(data[indices[i + 1]], indices[i + 1], dataset);
                var nextYPoint = yProjector(data[indices[i + 1]], indices[i + 1], dataset);
                shouldShow = shouldShow || pointInViewport(nextXPoint, nextYPoint);
            }
            if (shouldShow) {
                filteredDataIndices.push(indices[i]);
            }
        }
        return filteredDataIndices;
    };
    Line.prototype._filterDownsampling = function (dataset, indices) {
        if (indices.length === 0) {
            return [];
        }
        var data = dataset.data();
        var scaledXAccessor = plot_1.Plot._scaledAccessor(this.x());
        var scaledYAccessor = plot_1.Plot._scaledAccessor(this.y());
        var filteredIndices = [indices[0]];
        var indexOnCurrentSlope = function (i, currentSlope) {
            var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
            var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
            var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            if (currentSlope === Infinity) {
                return Math.floor(p1x) === Math.floor(p2x);
            }
            else {
                var expectedP2y = p1y + (p2x - p1x) * currentSlope;
                return Math.floor(p2y) === Math.floor(expectedP2y);
            }
        };
        for (var i = 0; i < indices.length - 1;) {
            var indexFirst = indices[i];
            var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
            var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
            var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var currentSlope = (Math.floor(p1x) === Math.floor(p2x)) ? Infinity : (p2y - p1y) / (p2x - p1x);
            var indexMin = indices[i];
            var minScaledValue = (currentSlope === Infinity) ? p1y : p1x;
            var indexMax = indexMin;
            var maxScaledValue = minScaledValue;
            var firstIndexOnCurrentSlope = true;
            while (i < indices.length - 1 && (firstIndexOnCurrentSlope || indexOnCurrentSlope(i, currentSlope))) {
                i++;
                firstIndexOnCurrentSlope = false;
                var currScaledValue = currentSlope === Infinity ? scaledYAccessor(data[indices[i]], indices[i], dataset) :
                    scaledXAccessor(data[indices[i]], indices[i], dataset);
                if (currScaledValue > maxScaledValue) {
                    maxScaledValue = currScaledValue;
                    indexMax = indices[i];
                }
                if (currScaledValue < minScaledValue) {
                    minScaledValue = currScaledValue;
                    indexMin = indices[i];
                }
            }
            var indexLast = indices[i];
            if (indexMin !== indexFirst) {
                filteredIndices.push(indexMin);
            }
            if (indexMax !== indexMin && indexMax !== indexFirst) {
                filteredIndices.push(indexMax);
            }
            if (indexLast !== indexFirst && indexLast !== indexMin && indexLast !== indexMax) {
                filteredIndices.push(indexLast);
            }
        }
        return filteredIndices;
    };
    return Line;
}(xyPlot_1.XYPlot));
exports.Line = Line;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Interactions = __webpack_require__(13);
var Utils = __webpack_require__(0);
var scale_1 = __webpack_require__(17);
var TRANSFORMATION_SPACE = [0, 1];
var Category = (function (_super) {
    __extends(Category, _super);
    /**
     * A Category Scale maps strings to numbers.
     *
     * @constructor
     */
    function Category() {
        var _this = _super.call(this) || this;
        _this._range = [0, 1];
        _this._d3Scale = d3.scaleBand();
        _this._d3Scale.range(TRANSFORMATION_SPACE);
        _this._d3TransformationScale = d3.scaleLinear();
        _this._d3TransformationScale.domain(TRANSFORMATION_SPACE);
        var d3InnerPadding = 0.3;
        _this._innerPadding = Category._convertToPlottableInnerPadding(d3InnerPadding);
        _this._outerPadding = Category._convertToPlottableOuterPadding(0.5, d3InnerPadding);
        return _this;
    }
    /**
     * Return a clone of this category scale that holds the same pan/zoom, padding, domain and range, but
     * without any included values providers.
     */
    Category.prototype.cloneWithoutProviders = function () {
        var scale = new Category()
            .domain(this.domain())
            .range(this.range())
            .innerPadding(this.innerPadding())
            .outerPadding(this.outerPadding());
        scale._d3TransformationScale.domain(this._d3TransformationScale.domain());
        return scale;
    };
    Category.prototype.extentOfValues = function (values) {
        return Utils.Array.uniq(values);
    };
    Category.prototype._getExtent = function () {
        return Utils.Array.uniq(this._getAllIncludedValues());
    };
    Category.prototype.domain = function (values) {
        return _super.prototype.domain.call(this, values);
    };
    /**
     * Returns domain values that lie inside the given range.
     * @param range
     * @returns {string[]}
     */
    Category.prototype.invertRange = function (range) {
        var _this = this;
        if (range === void 0) { range = this.range(); }
        var rangeBand = this._d3Scale.bandwidth();
        var domainStartNormalized = this.invertedTransformation(range[0]);
        var domainEndNormalized = this.invertedTransformation(range[1]);
        var domain = this._d3Scale.domain();
        // map ["a", "b", "c"] to the normalized center position (e.g. [0.25, .5, 0.75]). We add
        // half the rangeBand to consider the center of the bars
        var normalizedDomain = domain.map(function (d) { return _this._d3Scale(d) + rangeBand / 2; });
        var domainStart = d3.bisect(normalizedDomain, domainStartNormalized);
        var domainEnd = d3.bisect(normalizedDomain, domainEndNormalized);
        return domain.slice(domainStart, domainEnd);
    };
    Category.prototype.range = function (values) {
        return _super.prototype.range.call(this, values);
    };
    Category._convertToPlottableInnerPadding = function (d3InnerPadding) {
        return 1 / (1 - d3InnerPadding) - 1;
    };
    Category._convertToPlottableOuterPadding = function (d3OuterPadding, d3InnerPadding) {
        return d3OuterPadding / (1 - d3InnerPadding);
    };
    Category.prototype._setBands = function () {
        var d3InnerPadding = 1 - 1 / (1 + this.innerPadding());
        var d3OuterPadding = this.outerPadding() / (1 + this.innerPadding());
        this._d3Scale.paddingInner(d3InnerPadding);
        this._d3Scale.paddingOuter(d3OuterPadding);
    };
    /**
     * Returns the width of the range band.
     *
     * @returns {number} The range band width
     */
    Category.prototype.rangeBand = function () {
        return this._rescaleBand(this._d3Scale.bandwidth());
    };
    /**
     * Returns the step width of the scale.
     *
     * The step width is the pixel distance between adjacent values in the domain.
     *
     * @returns {number}
     */
    Category.prototype.stepWidth = function () {
        // todo consider replacing this with _d3Scale.step()
        return this._rescaleBand(this._d3Scale.bandwidth() * (1 + this.innerPadding()));
    };
    Category.prototype.innerPadding = function (innerPadding) {
        if (innerPadding == null) {
            return this._innerPadding;
        }
        this._innerPadding = innerPadding;
        this.range(this.range());
        this._dispatchUpdate();
        return this;
    };
    Category.prototype.outerPadding = function (outerPadding) {
        if (outerPadding == null) {
            return this._outerPadding;
        }
        this._outerPadding = outerPadding;
        this.range(this.range());
        this._dispatchUpdate();
        return this;
    };
    Category.prototype.scale = function (value) {
        // Determine the middle of the range band for the value
        var untransformed = this._d3Scale(value) + this._d3Scale.bandwidth() / 2;
        // Convert to screen space
        return this._d3TransformationScale(untransformed);
    };
    Category.prototype.zoom = function (magnifyAmount, centerValue) {
        var _this = this;
        var magnifyTransform = function (rangeValue) {
            return _this._d3TransformationScale.invert(Interactions.zoomAt(rangeValue, magnifyAmount, centerValue));
        };
        this._d3TransformationScale.domain(this._d3TransformationScale.range().map(magnifyTransform));
        this._dispatchUpdate();
    };
    Category.prototype.pan = function (translateAmount) {
        var _this = this;
        var translateTransform = function (rangeValue) {
            return _this._d3TransformationScale.invert(rangeValue + translateAmount);
        };
        this._d3TransformationScale.domain(this._d3TransformationScale.range().map(translateTransform));
        this._dispatchUpdate();
    };
    Category.prototype.scaleTransformation = function (value) {
        return this._d3TransformationScale(value);
    };
    Category.prototype.invertedTransformation = function (value) {
        return this._d3TransformationScale.invert(value);
    };
    Category.prototype.getTransformationDomain = function () {
        return this._d3TransformationScale.domain();
    };
    Category.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    Category.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            this._setBands();
            return this;
        }
    };
    Category.prototype._getRange = function () {
        return this._range;
    };
    Category.prototype._setRange = function (values) {
        this._range = values;
        this._d3TransformationScale.range(values);
        this._setBands();
    };
    /**
     * Converts a width or height in *Transformation Space* into *Screen Space*.
     */
    Category.prototype._rescaleBand = function (band) {
        return Math.abs(this._d3TransformationScale(band) - this._d3TransformationScale(0));
    };
    return Category;
}(scale_1.Scale));
exports.Category = Category;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

/**
 * Shim for ES6 set.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
var Set = (function () {
    function Set() {
        if (typeof window.Set === "function") {
            this._es6Set = new window.Set();
        }
        else {
            this._values = [];
        }
        this.size = 0;
    }
    Set.prototype.add = function (value) {
        if (this._es6Set != null) {
            this._es6Set.add(value);
            this.size = this._es6Set.size;
            return this;
        }
        if (!this.has(value)) {
            this._values.push(value);
            this.size = this._values.length;
        }
        return this;
    };
    Set.prototype.delete = function (value) {
        if (this._es6Set != null) {
            var deleted = this._es6Set.delete(value);
            this.size = this._es6Set.size;
            return deleted;
        }
        var index = this._values.indexOf(value);
        if (index !== -1) {
            this._values.splice(index, 1);
            this.size = this._values.length;
            return true;
        }
        return false;
    };
    Set.prototype.has = function (value) {
        if (this._es6Set != null) {
            return this._es6Set.has(value);
        }
        return this._values.indexOf(value) !== -1;
    };
    Set.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        if (this._es6Set != null) {
            var callbackWrapper = function (value, value2) { return callback.call(thisArg, value, value2, _this); };
            this._es6Set.forEach(callbackWrapper, thisArg);
            return;
        }
        this._values.forEach(function (value) {
            callback.call(thisArg, value, value, _this);
        });
    };
    return Set;
}());
exports.Set = Set;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(115));
__export(__webpack_require__(114));
//# sourceMappingURL=index.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = __webpack_require__(18);
var characterMeasurer_1 = __webpack_require__(43);
var CacheCharacterMeasurer = (function (_super) {
    __extends(CacheCharacterMeasurer, _super);
    function CacheCharacterMeasurer(ruler, useGuards) {
        var _this = _super.call(this, ruler, useGuards) || this;
        _this.cache = new utils_1.Cache(function (c) {
            return _this._measureCharacterNotFromCache(c);
        });
        return _this;
    }
    CacheCharacterMeasurer.prototype._measureCharacterNotFromCache = function (c) {
        return _super.prototype._measureCharacter.call(this, c);
    };
    CacheCharacterMeasurer.prototype._measureCharacter = function (c) {
        return this.cache.get(c);
    };
    CacheCharacterMeasurer.prototype.reset = function () {
        this.cache.clear();
    };
    return CacheCharacterMeasurer;
}(characterMeasurer_1.CharacterMeasurer));
exports.CacheCharacterMeasurer = CacheCharacterMeasurer;
//# sourceMappingURL=cacheCharacterMeasurer.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var measurer_1 = __webpack_require__(45);
var CharacterMeasurer = (function (_super) {
    __extends(CharacterMeasurer, _super);
    function CharacterMeasurer() {
        return _super.apply(this, arguments) || this;
    }
    CharacterMeasurer.prototype._measureCharacter = function (c) {
        return _super.prototype._measureLine.call(this, c);
    };
    CharacterMeasurer.prototype._measureLine = function (line) {
        var _this = this;
        var charactersDimensions = line.split("").map(function (c) { return _this._measureCharacter(c); });
        return {
            height: charactersDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.height); }, 0),
            width: charactersDimensions.reduce(function (acc, dim) { return acc + dim.width; }, 0),
        };
    };
    return CharacterMeasurer;
}(measurer_1.Measurer));
exports.CharacterMeasurer = CharacterMeasurer;
//# sourceMappingURL=characterMeasurer.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(29));
__export(__webpack_require__(42));
__export(__webpack_require__(116));
__export(__webpack_require__(43));
__export(__webpack_require__(45));
//# sourceMappingURL=index.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractMeasurer_1 = __webpack_require__(29);
var Measurer = (function (_super) {
    __extends(Measurer, _super);
    function Measurer(ruler, useGuards) {
        if (useGuards === void 0) { useGuards = false; }
        var _this = _super.call(this, ruler) || this;
        _this.useGuards = useGuards;
        return _this;
    }
    // Guards assures same line height and width of whitespaces on both ends.
    Measurer.prototype._addGuards = function (text) {
        return abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT + text + abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT;
    };
    Measurer.prototype._measureLine = function (line, forceGuards) {
        if (forceGuards === void 0) { forceGuards = false; }
        var useGuards = this.useGuards || forceGuards || /^[\t ]$/.test(line);
        var measuredLine = useGuards ? this._addGuards(line) : line;
        var measuredLineDimensions = _super.prototype.measure.call(this, measuredLine);
        measuredLineDimensions.width -= useGuards ? (2 * this.getGuardWidth()) : 0;
        return measuredLineDimensions;
    };
    Measurer.prototype.measure = function (text) {
        var _this = this;
        if (text === void 0) { text = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        if (text.trim() === "") {
            return { width: 0, height: 0 };
        }
        var linesDimensions = text.trim().split("\n").map(function (line) { return _this._measureLine(line); });
        return {
            height: linesDimensions.reduce(function (acc, dim) { return acc + dim.height; }, 0),
            width: linesDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.width); }, 0),
        };
    };
    Measurer.prototype.getGuardWidth = function () {
        if (this.guardWidth == null) {
            this.guardWidth = _super.prototype.measure.call(this).width;
        }
        return this.guardWidth;
    };
    return Measurer;
}(abstractMeasurer_1.AbstractMeasurer));
exports.Measurer = Measurer;
//# sourceMappingURL=measurer.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(122));
__export(__webpack_require__(47));
//# sourceMappingURL=index.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var Utils = __webpack_require__(18);
var Wrapper = (function () {
    function Wrapper() {
        this.maxLines(Infinity);
        this.textTrimming("ellipsis");
        this.allowBreakingWords(true);
        this._tokenizer = new Utils.Tokenizer();
        this._breakingCharacter = "-";
    }
    Wrapper.prototype.maxLines = function (noLines) {
        if (noLines == null) {
            return this._maxLines;
        }
        else {
            this._maxLines = noLines;
            return this;
        }
    };
    Wrapper.prototype.textTrimming = function (option) {
        if (option == null) {
            return this._textTrimming;
        }
        else {
            if (option !== "ellipsis" && option !== "none") {
                throw new Error(option + " - unsupported text trimming option.");
            }
            this._textTrimming = option;
            return this;
        }
    };
    Wrapper.prototype.allowBreakingWords = function (allow) {
        if (allow == null) {
            return this._allowBreakingWords;
        }
        else {
            this._allowBreakingWords = allow;
            return this;
        }
    };
    Wrapper.prototype.wrap = function (text, measurer, width, height) {
        var _this = this;
        if (height === void 0) { height = Infinity; }
        var initialWrappingResult = {
            noBrokeWords: 0,
            noLines: 0,
            originalText: text,
            truncatedText: "",
            wrappedText: "",
        };
        var state = {
            availableLines: Math.min(Math.floor(height / measurer.measure().height), this._maxLines),
            availableWidth: width,
            canFitText: true,
            currentLine: "",
            wrapping: initialWrappingResult,
        };
        var lines = text.split("\n");
        return lines.reduce(function (s, line, i) {
            return _this.breakLineToFitWidth(s, line, i !== lines.length - 1, measurer);
        }, state).wrapping;
    };
    Wrapper.prototype.breakLineToFitWidth = function (state, line, hasNextLine, measurer) {
        var _this = this;
        if (!state.canFitText && state.wrapping.truncatedText !== "") {
            state.wrapping.truncatedText += "\n";
        }
        var tokens = this._tokenizer.tokenize(line);
        state = tokens.reduce(function (s, token) {
            return _this.wrapNextToken(token, s, measurer);
        }, state);
        var wrappedText = Utils.StringMethods.trimEnd(state.currentLine);
        state.wrapping.noLines += +(wrappedText !== "");
        if (state.wrapping.noLines === state.availableLines && this._textTrimming !== "none" && hasNextLine) {
            // Note: no need to add more ellipses, they were added in `wrapNextToken`
            state.canFitText = false;
        }
        else {
            state.wrapping.wrappedText += wrappedText;
        }
        state.currentLine = "\n";
        return state;
    };
    Wrapper.prototype.canFitToken = function (token, width, measurer) {
        var _this = this;
        var possibleBreaks = this._allowBreakingWords ?
            token.split("").map(function (c, i) { return (i !== token.length - 1) ? c + _this._breakingCharacter : c; })
            : [token];
        return (measurer.measure(token).width <= width) || possibleBreaks.every(function (c) { return measurer.measure(c).width <= width; });
    };
    Wrapper.prototype.addEllipsis = function (line, width, measurer) {
        if (this._textTrimming === "none") {
            return {
                remainingToken: "",
                wrappedToken: line,
            };
        }
        var truncatedLine = line.substring(0).trim();
        var lineWidth = measurer.measure(truncatedLine).width;
        var ellipsesWidth = measurer.measure("...").width;
        var prefix = (line.length > 0 && line[0] === "\n") ? "\n" : "";
        if (width <= ellipsesWidth) {
            var periodWidth = ellipsesWidth / 3;
            var numPeriodsThatFit = Math.floor(width / periodWidth);
            return {
                remainingToken: line,
                wrappedToken: prefix + "...".substr(0, numPeriodsThatFit),
            };
        }
        while (lineWidth + ellipsesWidth > width) {
            truncatedLine = Utils.StringMethods.trimEnd(truncatedLine.substr(0, truncatedLine.length - 1));
            lineWidth = measurer.measure(truncatedLine).width;
        }
        return {
            remainingToken: Utils.StringMethods.trimEnd(line.substring(truncatedLine.length), "-").trim(),
            wrappedToken: prefix + truncatedLine + "...",
        };
    };
    Wrapper.prototype.wrapNextToken = function (token, state, measurer) {
        if (!state.canFitText ||
            state.availableLines === state.wrapping.noLines ||
            !this.canFitToken(token, state.availableWidth, measurer)) {
            return this.finishWrapping(token, state, measurer);
        }
        var remainingToken = token;
        while (remainingToken) {
            var result = this.breakTokenToFitInWidth(remainingToken, state.currentLine, state.availableWidth, measurer);
            state.currentLine = result.line;
            remainingToken = result.remainingToken;
            if (remainingToken != null) {
                state.wrapping.noBrokeWords += +result.breakWord;
                ++state.wrapping.noLines;
                if (state.availableLines === state.wrapping.noLines) {
                    var ellipsisResult = this.addEllipsis(state.currentLine, state.availableWidth, measurer);
                    state.wrapping.wrappedText += ellipsisResult.wrappedToken;
                    state.wrapping.truncatedText += ellipsisResult.remainingToken + remainingToken;
                    state.currentLine = "\n";
                    return state;
                }
                else {
                    state.wrapping.wrappedText += Utils.StringMethods.trimEnd(state.currentLine);
                    state.currentLine = "\n";
                }
            }
        }
        return state;
    };
    Wrapper.prototype.finishWrapping = function (token, state, measurer) {
        // Token is really long, but we have a space to put part of the word.
        if (state.canFitText &&
            state.availableLines !== state.wrapping.noLines &&
            this._allowBreakingWords &&
            this._textTrimming !== "none") {
            var res = this.addEllipsis(state.currentLine + token, state.availableWidth, measurer);
            state.wrapping.wrappedText += res.wrappedToken;
            state.wrapping.truncatedText += res.remainingToken;
            state.wrapping.noBrokeWords += +(res.remainingToken.length < token.length);
            state.wrapping.noLines += +(res.wrappedToken.length > 0);
            state.currentLine = "";
        }
        else {
            state.wrapping.truncatedText += token;
        }
        state.canFitText = false;
        return state;
    };
    /**
     * Breaks single token to fit current line.
     * If token contains only whitespaces then they will not be populated to next line.
     */
    Wrapper.prototype.breakTokenToFitInWidth = function (token, line, availableWidth, measurer, breakingCharacter) {
        if (breakingCharacter === void 0) { breakingCharacter = this._breakingCharacter; }
        if (measurer.measure(line + token).width <= availableWidth) {
            return {
                breakWord: false,
                line: line + token,
                remainingToken: null,
            };
        }
        if (token.trim() === "") {
            return {
                breakWord: false,
                line: line,
                remainingToken: "",
            };
        }
        if (!this._allowBreakingWords) {
            return {
                breakWord: false,
                line: line,
                remainingToken: token,
            };
        }
        var fitTokenLength = 0;
        while (fitTokenLength < token.length) {
            if (measurer.measure(line + token.substring(0, fitTokenLength + 1) + breakingCharacter).width <= availableWidth) {
                ++fitTokenLength;
            }
            else {
                break;
            }
        }
        var suffix = "";
        if (fitTokenLength > 0) {
            suffix = breakingCharacter;
        }
        return {
            breakWord: fitTokenLength > 0,
            line: line + token.substring(0, fitTokenLength) + suffix,
            remainingToken: token.substring(fitTokenLength),
        };
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;
//# sourceMappingURL=wrapper.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(123));
//# sourceMappingURL=index.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(55));
__export(__webpack_require__(56));
__export(__webpack_require__(23));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
var Dataset = (function () {
    /**
     * A Dataset contains an array of data and some metadata.
     * Changes to the data or metadata will cause anything subscribed to the Dataset to update.
     *
     * @constructor
     * @param {any[]} [data=[]] The data for this Dataset.
     * @param {any} [metadata={}] An object containing additional information.
     */
    function Dataset(data, metadata) {
        if (data === void 0) { data = []; }
        if (metadata === void 0) { metadata = {}; }
        this._data = data;
        this._metadata = metadata;
        this._callbacks = new Utils.CallbackSet();
    }
    /**
     * Adds a callback to be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback.
     * @returns {Dataset} The calling Dataset.
     */
    Dataset.prototype.onUpdate = function (callback) {
        this._callbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback
     * @returns {Dataset} The calling Dataset.
     */
    Dataset.prototype.offUpdate = function (callback) {
        this._callbacks.delete(callback);
        return this;
    };
    Dataset.prototype.data = function (data) {
        if (data == null) {
            return this._data;
        }
        else {
            this._data = data;
            this._callbacks.callCallbacks(this);
            return this;
        }
    };
    Dataset.prototype.metadata = function (metadata) {
        if (metadata == null) {
            return this._metadata;
        }
        else {
            this._metadata = metadata;
            this._callbacks.callCallbacks(this);
            return this;
        }
    };
    return Dataset;
}());
exports.Dataset = Dataset;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

/*
 * WARNING: The js output of this expression is searched by string (yes, I know) and replaced with a
 * real version number during the dist phase for for npm module publishing. Modifying this line should
 * be accompanied by modifying the "sed-version" task in package.json accordingly.
 */
exports.version = "3.0.0-beta.4";


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 *
 * @fileoverview manually add d3-selection-multi to d3 default bundle. Most of this code is
 * copied from d3-selection-multi@1.0.0.
 * See https://github.com/d3/d3-selection-multi/issues/11 for why we have to do this
 */

var d3 = __webpack_require__(1);
var d3Selection = d3;
var d3Transition = d3;
function attrsFunction(selection, map) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_1 in x)
            s.attr(name_1, x[name_1]);
    });
}
function attrsObject(selection, map) {
    for (var name_2 in map)
        selection.attr(name_2, map[name_2]);
    return selection;
}
function selection_attrs(map) {
    return (typeof map === "function" ? attrsFunction : attrsObject)(this, map);
}
function stylesFunction(selection, map, priority) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_3 in x)
            s.style(name_3, x[name_3], priority);
    });
}
function stylesObject(selection, map, priority) {
    for (var name_4 in map)
        selection.style(name_4, map[name_4], priority);
    return selection;
}
function selection_styles(map, priority) {
    return (typeof map === "function" ? stylesFunction : stylesObject)(this, map, priority == null ? "" : priority);
}
function propertiesFunction(selection, map) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_5 in x)
            s.property(name_5, x[name_5]);
    });
}
function propertiesObject(selection, map) {
    for (var name_6 in map)
        selection.property(name_6, map[name_6]);
    return selection;
}
function selection_properties(map) {
    return (typeof map === "function" ? propertiesFunction : propertiesObject)(this, map);
}
function attrsFunction$1(transition, map) {
    return transition.each(function () {
        var x = map.apply(this, arguments), t = d3Selection.select(this).transition(transition);
        for (var name_7 in x)
            t.attr(name_7, x[name_7]);
    });
}
function attrsObject$1(transition, map) {
    for (var name_8 in map)
        transition.attr(name_8, map[name_8]);
    return transition;
}
function transition_attrs(map) {
    return (typeof map === "function" ? attrsFunction$1 : attrsObject$1)(this, map);
}
function stylesFunction$1(transition, map, priority) {
    return transition.each(function () {
        var x = map.apply(this, arguments), t = d3Selection.select(this).transition(transition);
        for (var name_9 in x)
            t.style(name_9, x[name_9], priority);
    });
}
function stylesObject$1(transition, map, priority) {
    for (var name_10 in map)
        transition.style(name_10, map[name_10], priority);
    return transition;
}
function transition_styles(map, priority) {
    return (typeof map === "function" ? stylesFunction$1 : stylesObject$1)(this, map, priority == null ? "" : priority);
}
d3Selection.selection.prototype.attrs = selection_attrs;
d3Selection.selection.prototype.styles = selection_styles;
d3Selection.selection.prototype.properties = selection_properties;
d3Transition.transition.prototype.attrs = transition_attrs;
d3Transition.transition.prototype.styles = transition_styles;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3Ease = __webpack_require__(103);
var coerceD3_1 = __webpack_require__(11);
var makeEnum_1 = __webpack_require__(125);
var EASE_NAME_MAPPING = {
    linear: d3Ease.easeLinear,
    quad: d3Ease.easeQuad,
    quadIn: d3Ease.easeQuadIn,
    quadOut: d3Ease.easeQuadOut,
    quadInOut: d3Ease.easeQuadInOut,
    cubic: d3Ease.easeCubic,
    cubicIn: d3Ease.easeCubicIn,
    cubicOut: d3Ease.easeCubicOut,
    cubicInOut: d3Ease.easeCubicInOut,
    poly: d3Ease.easePoly,
    polyIn: d3Ease.easePolyIn,
    polyOut: d3Ease.easePolyOut,
    polyInOut: d3Ease.easePolyInOut,
    sin: d3Ease.easeSin,
    sinIn: d3Ease.easeSinIn,
    sinOut: d3Ease.easeSinOut,
    sinInOut: d3Ease.easeSinInOut,
    exp: d3Ease.easeExp,
    expIn: d3Ease.easeExpIn,
    expOut: d3Ease.easeExpOut,
    expInOut: d3Ease.easeExpInOut,
    circle: d3Ease.easeCircle,
    circleIn: d3Ease.easeCircleIn,
    circleOut: d3Ease.easeCircleOut,
    circleInOut: d3Ease.easeCircleInOut,
    bounce: d3Ease.easeBounce,
    bounceIn: d3Ease.easeBounceIn,
    bounceOut: d3Ease.easeBounceOut,
    bounceInOut: d3Ease.easeBounceInOut,
    back: d3Ease.easeBack,
    backIn: d3Ease.easeBackIn,
    backOut: d3Ease.easeBackOut,
    backInOut: d3Ease.easeBackInOut,
    elastic: d3Ease.easeElastic,
    elasticIn: d3Ease.easeElasticIn,
    elasticOut: d3Ease.easeElasticOut,
    elasticInOut: d3Ease.easeElasticInOut,
};
exports.EaseName = makeEnum_1.makeEnum([
    "linear",
    "quad",
    "quadIn",
    "quadOut",
    "quadInOut",
    "cubic",
    "cubicIn",
    "cubicOut",
    "cubicInOut",
    "poly",
    "polyIn",
    "polyOut",
    "polyInOut",
    "sin",
    "sinIn",
    "sinOut",
    "sinInOut",
    "exp",
    "expIn",
    "expOut",
    "expInOut",
    "circle",
    "circleIn",
    "circleOut",
    "circleInOut",
    "bounce",
    "bounceIn",
    "bounceOut",
    "bounceInOut",
    "back",
    "backIn",
    "backOut",
    "backInOut",
    "elastic",
    "elasticIn",
    "elasticOut",
    "elasticInOut",
]);
/**
 * An Animator with easing and configurable durations and delays.
 */
var Easing = (function () {
    /**
     * Constructs the default animator
     *
     * @constructor
     */
    function Easing() {
        this._startDelay = Easing._DEFAULT_START_DELAY_MILLISECONDS;
        this._stepDuration = Easing._DEFAULT_STEP_DURATION_MILLISECONDS;
        this._stepDelay = Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS;
        this._maxTotalDuration = Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS;
        this._easingMode = Easing._DEFAULT_EASING_MODE;
    }
    Easing.prototype.totalTime = function (numberOfSteps) {
        var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
        return this.startDelay() + adjustedIterativeDelay * (Math.max(numberOfSteps - 1, 0)) + this.stepDuration();
    };
    Easing.prototype.animate = function (selection, attrToAppliedProjector) {
        var _this = this;
        selection = coerceD3_1.coerceExternalD3(selection);
        var numberOfSteps = selection.size();
        var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
        return selection.transition()
            .ease(this._getEaseFactory())
            .duration(this.stepDuration())
            .delay(function (d, i) { return _this.startDelay() + adjustedIterativeDelay * i; })
            .attrs(attrToAppliedProjector);
    };
    Easing.prototype.startDelay = function (startDelay) {
        if (startDelay == null) {
            return this._startDelay;
        }
        else {
            this._startDelay = startDelay;
            return this;
        }
    };
    Easing.prototype.stepDuration = function (stepDuration) {
        if (stepDuration == null) {
            return Math.min(this._stepDuration, this._maxTotalDuration);
        }
        else {
            this._stepDuration = stepDuration;
            return this;
        }
    };
    Easing.prototype.stepDelay = function (stepDelay) {
        if (stepDelay == null) {
            return this._stepDelay;
        }
        else {
            this._stepDelay = stepDelay;
            return this;
        }
    };
    Easing.prototype.maxTotalDuration = function (maxTotalDuration) {
        if (maxTotalDuration == null) {
            return this._maxTotalDuration;
        }
        else {
            this._maxTotalDuration = maxTotalDuration;
            return this;
        }
    };
    Easing.prototype.easingMode = function (easingMode) {
        if (easingMode == null) {
            return this._easingMode;
        }
        else {
            this._easingMode = easingMode;
            return this;
        }
    };
    Easing.prototype._getEaseFactory = function () {
        var ease = this.easingMode();
        if (typeof ease === "string") {
            var maybeEaseFunction = EASE_NAME_MAPPING[ease];
            if (maybeEaseFunction == null) {
                // oops; name is wrong - default to linear instead
                return EASE_NAME_MAPPING["linear"];
            }
            else {
                return maybeEaseFunction;
            }
        }
        else {
            return ease;
        }
    };
    /**
     * Adjust the iterative delay, such that it takes into account the maxTotalDuration constraint
     */
    Easing.prototype._getAdjustedIterativeDelay = function (numberOfSteps) {
        var stepStartTimeInterval = this.maxTotalDuration() - this.stepDuration();
        stepStartTimeInterval = Math.max(stepStartTimeInterval, 0);
        var maxPossibleIterativeDelay = stepStartTimeInterval / Math.max(numberOfSteps - 1, 1);
        return Math.min(this.stepDelay(), maxPossibleIterativeDelay);
    };
    return Easing;
}());
/**
 * The default starting delay of the animation in milliseconds
 */
Easing._DEFAULT_START_DELAY_MILLISECONDS = 0;
/**
 * The default duration of one animation step in milliseconds
 */
Easing._DEFAULT_STEP_DURATION_MILLISECONDS = 300;
/**
 * The default maximum start delay between each step of an animation
 */
Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS = 15;
/**
 * The default maximum total animation duration
 */
Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS = Infinity;
/**
 * The default easing of the animation
 */
Easing._DEFAULT_EASING_MODE = "expOut";
exports.Easing = Easing;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var coerceD3_1 = __webpack_require__(11);
/**
 * An animator implementation with no animation. The attributes are
 * immediately set on the selection.
 */
var Null = (function () {
    function Null() {
    }
    Null.prototype.totalTime = function (selection) {
        return 0;
    };
    Null.prototype.animate = function (selection, attrToAppliedProjector) {
        selection = coerceD3_1.coerceExternalD3(selection);
        return selection.attrs(attrToAppliedProjector);
    };
    return Null;
}());
exports.Null = Null;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Utils = __webpack_require__(0);
var axis_1 = __webpack_require__(19);
var Category = (function (_super) {
    __extends(Category, _super);
    /**
     * Constructs a Category Axis.
     *
     * A Category Axis is a visual representation of a Category Scale.
     *
     * @constructor
     * @param {Scales.Category} scale
     * @param {AxisOrientation} [orientation="bottom"] Orientation of this Category Axis.
     */
    function Category(scale, orientation) {
        if (orientation === void 0) { orientation = "bottom"; }
        var _this = _super.call(this, scale, orientation) || this;
        /**
         * The rotation angle of tick label text. Only 0, 90, -90 are supported
         */
        _this._tickLabelAngle = 0;
        /**
         * The shear angle of the tick label text. Only values -80 <= x <= 80 are supported
         */
        _this._tickLabelShearAngle = 0;
        _this.addClass("category-axis");
        return _this;
    }
    Object.defineProperty(Category.prototype, "_wrapper", {
        /**
         * A Wrapper configured according to the other properties on this axis.
         * @returns {Typesetter.Wrapper}
         */
        get: function () {
            var wrapper = new Typesetter.Wrapper();
            if (this._tickLabelMaxLines != null) {
                wrapper.maxLines(this._tickLabelMaxLines);
            }
            return wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "_writer", {
        /**
         * A Writer attached to this measurer and wrapper.
         * @returns {Typesetter.Writer}
         */
        get: function () {
            return new Typesetter.Writer(this._measurer, this._typesetterContext, this._wrapper);
        },
        enumerable: true,
        configurable: true
    });
    Category.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._typesetterContext = new Typesetter.SvgContext(this._tickLabelContainer.node());
        this._measurer = new Typesetter.CacheMeasurer(this._typesetterContext);
    };
    Category.prototype._rescale = function () {
        return this.redraw();
    };
    /**
     * Compute space requirements for this Category Axis. Category Axes have two primary space requirements:
     *
     * 1) width/height needed by the tick lines (including annotations, padding, and margins).
     * 2) width/height needed by the tick text.
     *
     * We requested space is the sum of the lines and text.
     * @param offeredWidth
     * @param offeredHeight
     * @returns {any}
     */
    Category.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var widthRequiredByTicks = this.isHorizontal() ? 0 : this._tickSpaceRequired() + this.margin();
        var heightRequiredByTicks = this.isHorizontal() ? this._tickSpaceRequired() + this.margin() : 0;
        if (this._scale.domain().length === 0) {
            return {
                minWidth: 0,
                minHeight: 0,
            };
        }
        if (this.annotationsEnabled()) {
            var tierTotalHeight = this._annotationTierHeight() * this.annotationTierCount();
            if (this.isHorizontal()) {
                heightRequiredByTicks += tierTotalHeight;
            }
            else {
                widthRequiredByTicks += tierTotalHeight;
            }
        }
        var measureResult = this._measureTickLabels(offeredWidth, offeredHeight);
        return {
            minWidth: measureResult.usedWidth + widthRequiredByTicks,
            minHeight: measureResult.usedHeight + heightRequiredByTicks,
        };
    };
    Category.prototype._coreSize = function () {
        var relevantDimension = this.isHorizontal() ? this.height() : this.width();
        var relevantRequestedSpaceDimension = this.isHorizontal() ?
            this.requestedSpace(this.width(), this.height()).minHeight :
            this.requestedSpace(this.width(), this.height()).minWidth;
        var marginAndAnnotationSize = this.margin() + this._annotationTierHeight();
        var axisHeightWithoutMargin = relevantRequestedSpaceDimension - marginAndAnnotationSize;
        return Math.min(axisHeightWithoutMargin, relevantDimension);
    };
    Category.prototype._getTickValues = function () {
        return this.getDownsampleInfo().domain;
    };
    /**
     * Take the scale and drop ticks at regular intervals such that the resultant ticks are all a reasonable minimum
     * distance apart. Return the resultant ticks to render, as well as the new stepWidth between them.
     *
     * @param {Scales.Category} scale - The scale being downsampled. Defaults to this Axis' scale.
     * @return {DownsampleInfo} an object holding the resultant domain and new stepWidth.
     */
    Category.prototype.getDownsampleInfo = function (scale, domain) {
        if (scale === void 0) { scale = this._scale; }
        if (domain === void 0) { domain = scale.invertRange(); }
        // account for how shearing tightens the space between vertically oriented ticks
        var shearFactor = this._tickLabelAngle === 0 ? 1 : 1 / Math.cos(this._tickLabelShearAngle / 180 * Math.PI);
        var shearedMinimumWidth = Category._MINIMUM_WIDTH_PER_LABEL_PX * shearFactor;
        var downsampleRatio = Math.ceil(shearedMinimumWidth / scale.stepWidth());
        return {
            domain: domain.filter(function (d, i) { return i % downsampleRatio === 0; }),
            stepWidth: downsampleRatio * scale.stepWidth(),
        };
    };
    Category.prototype.tickLabelAngle = function (angle) {
        if (angle == null) {
            return this._tickLabelAngle;
        }
        if (angle !== 0 && angle !== 90 && angle !== -90) {
            throw new Error("Angle " + angle + " not supported; only 0, 90, and -90 are valid values");
        }
        this._tickLabelAngle = angle;
        this.redraw();
        return this;
    };
    Category.prototype.tickLabelShearAngle = function (angle) {
        if (angle == null) {
            return this._tickLabelShearAngle;
        }
        if (angle < -80 || angle > 80) {
            throw new Error("Angle " + angle + " not supported; Must be between [-80, 80]");
        }
        this._tickLabelShearAngle = angle;
        this.redraw();
        return this;
    };
    /**
     * Set or get the tick label's max width on this axis. When set, tick labels will be truncated with ellipsis to be
     * at most `tickLabelMaxWidth()` pixels wide. This ensures the axis doesn't grow to an undesirable width.
     *
     * Passing no arguments retrieves the value, while passing a number sets the value. Pass undefined to un-set the max
     * width.
     * @param maxWidth
     * @returns {number | this}
     */
    Category.prototype.tickLabelMaxWidth = function (maxWidth) {
        // allow user to un-set tickLabelMaxWidth by passing in null or undefined explicitly
        if (arguments.length === 0) {
            return this._tickLabelMaxWidth;
        }
        this._tickLabelMaxWidth = maxWidth;
        this.redraw();
        return this;
    };
    /**
     * Set or get the tick label's max number of wrapped lines on this axis. By default, a Category Axis will line-wrap
     * long tick labels onto multiple lines in order to fit the width of the axis. When set, long tick labels will be
     * rendered on at most `tickLabelMaxLines()` lines. This ensures the axis doesn't grow to an undesirable height.
     *
     * Passing no arguments retrieves the value, while passing a number sets the value. Pass undefined to un-set the
     * max lines.
     * @param maxLines
     * @returns {number | this}
     */
    Category.prototype.tickLabelMaxLines = function (maxLines) {
        // allow user to un-set tickLabelMaxLines by passing in null or undefined explicitly
        if (arguments.length === 0) {
            return this._tickLabelMaxLines;
        }
        this._tickLabelMaxLines = maxLines;
        this.redraw();
        return this;
    };
    /**
     * Return the space required by the ticks, padding included.
     * @returns {number}
     */
    Category.prototype._tickSpaceRequired = function () {
        return this._maxLabelTickLength() + this.tickLabelPadding();
    };
    /**
     * Write ticks to the DOM.
     * @param {Plottable.Scales.Category} scale The scale this axis is representing.
     * @param {d3.Selection} ticks The tick elements to write.
     */
    Category.prototype._drawTicks = function (stepWidth, ticks) {
        var self = this;
        var xAlign;
        var yAlign;
        switch (this.tickLabelAngle()) {
            case 0:
                xAlign = { left: "right", right: "left", top: "center", bottom: "center" };
                yAlign = { left: "center", right: "center", top: "bottom", bottom: "top" };
                break;
            case 90:
                xAlign = { left: "center", right: "center", top: "right", bottom: "left" };
                yAlign = { left: "top", right: "bottom", top: "center", bottom: "center" };
                break;
            case -90:
                xAlign = { left: "center", right: "center", top: "left", bottom: "right" };
                yAlign = { left: "bottom", right: "top", top: "center", bottom: "center" };
                break;
        }
        ticks.each(function (d) {
            var container = d3.select(this);
            var width = self.isHorizontal() ? stepWidth : self.width() - self._tickSpaceRequired();
            var height = self.isHorizontal() ? self.height() - self._tickSpaceRequired() : stepWidth;
            var writeOptions = {
                xAlign: xAlign[self.orientation()],
                yAlign: yAlign[self.orientation()],
                textRotation: self.tickLabelAngle(),
                textShear: self.tickLabelShearAngle(),
            };
            if (self._tickLabelMaxWidth != null) {
                // for left-oriented axes, we must move the ticks by the amount we've cut off in order to keep the text
                // aligned with the side of the ticks
                if (self.orientation() === "left" && width > self._tickLabelMaxWidth) {
                    var cutOffWidth = width - self._tickLabelMaxWidth;
                    var newTransform = container.attr("transform") + " translate(" + cutOffWidth + ", 0)";
                    container.attr("transform", newTransform);
                }
                width = Math.min(width, self._tickLabelMaxWidth);
            }
            self._writer.write(self.formatter()(d), width, height, writeOptions, container.node());
        });
    };
    /**
     * Measures the size of the tick labels without making any (permanent) DOM changes.
     *
     * @param {number} axisWidth Width available for this axis.
     * @param {number} axisHeight Height available for this axis.
     * @param {Plottable.Scales.Category} scale The scale this axis is representing.
     * @param {string[]} ticks The strings that will be printed on the ticks.
     */
    Category.prototype._measureTickLabels = function (axisWidth, axisHeight) {
        var _this = this;
        var thisScale = this._scale;
        // set up a test scale to simulate rendering ticks with the given width and height.
        var scale = thisScale.cloneWithoutProviders()
            .range([0, this.isHorizontal() ? axisWidth : axisHeight]);
        var _a = this.getDownsampleInfo(scale), domain = _a.domain, stepWidth = _a.stepWidth;
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        // the width (x-axis specific) available to a single tick label.
        var width = axisWidth - this._tickSpaceRequired(); // default for left/right
        if (this.isHorizontal()) {
            width = stepWidth; // defaults to the band width
            if (this._tickLabelAngle !== 0) {
                width = axisHeight - this._tickSpaceRequired(); // use the axis height
            }
            // HACKHACK: Wrapper fails under negative circumstances
            width = Math.max(width, 0);
        }
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        // the height (y-axis specific) available to a single tick label.
        var height = stepWidth; // default for left/right
        if (this.isHorizontal()) {
            height = axisHeight - this._tickSpaceRequired();
            if (this._tickLabelAngle !== 0) {
                height = axisWidth - this._tickSpaceRequired();
            }
            // HACKHACK: Wrapper fails under negative circumstances
            height = Math.max(height, 0);
        }
        if (this._tickLabelMaxWidth != null) {
            width = Math.min(width, this._tickLabelMaxWidth);
        }
        var wrappingResults = domain.map(function (s) {
            return _this._wrapper.wrap(_this.formatter()(s), _this._measurer, width, height);
        });
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        var widthFn = (this.isHorizontal() && this._tickLabelAngle === 0) ? d3.sum : Utils.Math.max;
        var heightFn = (this.isHorizontal() && this._tickLabelAngle === 0) ? Utils.Math.max : d3.sum;
        var usedWidth = widthFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).width; }, 0);
        var usedHeight = heightFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).height; }, 0);
        // If the tick labels are rotated, reverse usedWidth and usedHeight
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        if (this._tickLabelAngle !== 0) {
            _b = [usedHeight, usedWidth], usedWidth = _b[0], usedHeight = _b[1];
        }
        return {
            usedWidth: usedWidth,
            usedHeight: usedHeight,
        };
        var _b;
    };
    Category.prototype.renderImmediately = function () {
        var _this = this;
        _super.prototype.renderImmediately.call(this);
        var catScale = this._scale;
        var _a = this.getDownsampleInfo(catScale), domain = _a.domain, stepWidth = _a.stepWidth;
        // Give each tick a stepWidth of space which will partition the entire axis evenly
        var availableTextSpace = stepWidth;
        if (this.isHorizontal() && this._tickLabelMaxWidth != null) {
            availableTextSpace = Math.min(availableTextSpace, this._tickLabelMaxWidth);
        }
        var getTickLabelTransform = function (d, i) {
            // scale(d) will give the center of the band, so subtract half of the text width to get the left (top-most)
            // coordinate that the tick label should be transformed to.
            var tickLabelEdge = catScale.scale(d) - availableTextSpace / 2;
            var x = _this.isHorizontal() ? tickLabelEdge : 0;
            var y = _this.isHorizontal() ? 0 : tickLabelEdge;
            return "translate(" + x + "," + y + ")";
        };
        var tickLabelsUpdate = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).data(domain);
        var tickLabels = tickLabelsUpdate
            .enter()
            .append("g")
            .classed(axis_1.Axis.TICK_LABEL_CLASS, true)
            .merge(tickLabelsUpdate);
        tickLabelsUpdate.exit().remove();
        tickLabels.attr("transform", getTickLabelTransform);
        // erase all text first, then rewrite
        tickLabels.text("");
        this._drawTicks(stepWidth, tickLabels);
        var xTranslate = this.orientation() === "right" ? this._tickSpaceRequired() : 0;
        var yTranslate = this.orientation() === "bottom" ? this._tickSpaceRequired() : 0;
        this._tickLabelContainer.attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");
        // hide ticks and labels that overflow the axis
        this._showAllTickMarks();
        this._showAllTickLabels();
        this._hideTickMarksWithoutLabel();
        return this;
    };
    Category.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (!this.isHorizontal()) {
            this._scale.range([0, this.height()]);
        }
        return this;
    };
    Category.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Category;
}(axis_1.Axis));
/**
 * How many pixels to give labels at minimum before downsampling takes effect.
 */
Category._MINIMUM_WIDTH_PER_LABEL_PX = 15;
exports.Category = Category;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Formatters = __webpack_require__(8);
var Utils = __webpack_require__(0);
var axis_1 = __webpack_require__(19);
var Numeric = (function (_super) {
    __extends(Numeric, _super);
    /**
     * Constructs a Numeric Axis.
     *
     * A Numeric Axis is a visual representation of a QuantitativeScale.
     *
     * @constructor
     * @param {QuantitativeScale} scale
     * @param {AxisOrientation} orientation Orientation of this Numeric Axis.
     */
    function Numeric(scale, orientation) {
        var _this = _super.call(this, scale, orientation) || this;
        _this._tickLabelPositioning = "center";
        _this._usesTextWidthApproximation = false;
        _this.formatter(Formatters.general());
        return _this;
    }
    Numeric.prototype._setup = function () {
        _super.prototype._setup.call(this);
        var context = new Typesetter.SvgContext(this._tickLabelContainer.node(), axis_1.Axis.TICK_LABEL_CLASS);
        this._measurer = new Typesetter.CacheMeasurer(context);
        this._wrapper = new Typesetter.Wrapper().maxLines(1);
    };
    Numeric.prototype._computeWidth = function () {
        var maxTextWidth = this._usesTextWidthApproximation ? this._computeApproximateTextWidth() : this._computeExactTextWidth();
        if (this._tickLabelPositioning === "center") {
            return this._maxLabelTickLength() + this.tickLabelPadding() + maxTextWidth;
        }
        else {
            return Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + maxTextWidth);
        }
    };
    Numeric.prototype._computeExactTextWidth = function () {
        var _this = this;
        var tickValues = this._getTickValues();
        var textLengths = tickValues.map(function (v) {
            var formattedValue = _this.formatter()(v);
            return _this._measurer.measure(formattedValue).width;
        });
        return Utils.Math.max(textLengths, 0);
    };
    Numeric.prototype._computeApproximateTextWidth = function () {
        var _this = this;
        var tickValues = this._getTickValues();
        var mWidth = this._measurer.measure("M").width;
        var textLengths = tickValues.map(function (v) {
            var formattedValue = _this.formatter()(v);
            return formattedValue.length * mWidth;
        });
        return Utils.Math.max(textLengths, 0);
    };
    Numeric.prototype._computeHeight = function () {
        var textHeight = this._measurer.measure().height;
        if (this._tickLabelPositioning === "center") {
            return this._maxLabelTickLength() + this.tickLabelPadding() + textHeight;
        }
        else {
            return Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + textHeight);
        }
    };
    Numeric.prototype._getTickValues = function () {
        var scale = this._scale;
        var domain = scale.domain();
        var min = domain[0] <= domain[1] ? domain[0] : domain[1];
        var max = domain[0] >= domain[1] ? domain[0] : domain[1];
        return scale.ticks().filter(function (i) { return i >= min && i <= max; });
    };
    Numeric.prototype._rescale = function () {
        if (!this._isSetup) {
            return;
        }
        if (!this.isHorizontal()) {
            var reComputedWidth = this._computeWidth();
            if (reComputedWidth > this.width() || reComputedWidth < (this.width() - this.margin())) {
                this.redraw();
                return;
            }
        }
        this.render();
    };
    Numeric.prototype.renderImmediately = function () {
        var _this = this;
        _super.prototype.renderImmediately.call(this);
        var tickLabelAttrHash = {
            x: 0,
            y: 0,
            dx: "0em",
            dy: "0.3em",
        };
        var tickMarkLength = this._maxLabelTickLength();
        var tickLabelPadding = this.tickLabelPadding();
        var tickLabelTextAnchor = "middle";
        var labelGroupTransformX = 0;
        var labelGroupTransformY = 0;
        var labelGroupShiftX = 0;
        var labelGroupShiftY = 0;
        if (this.isHorizontal()) {
            switch (this._tickLabelPositioning) {
                case "left":
                    tickLabelTextAnchor = "end";
                    labelGroupTransformX = -tickLabelPadding;
                    labelGroupShiftY = tickLabelPadding;
                    break;
                case "center":
                    labelGroupShiftY = tickMarkLength + tickLabelPadding;
                    break;
                case "right":
                    tickLabelTextAnchor = "start";
                    labelGroupTransformX = tickLabelPadding;
                    labelGroupShiftY = tickLabelPadding;
                    break;
            }
        }
        else {
            switch (this._tickLabelPositioning) {
                case "top":
                    tickLabelAttrHash["dy"] = "-0.3em";
                    labelGroupShiftX = tickLabelPadding;
                    labelGroupTransformY = -tickLabelPadding;
                    break;
                case "center":
                    labelGroupShiftX = tickMarkLength + tickLabelPadding;
                    break;
                case "bottom":
                    tickLabelAttrHash["dy"] = "1em";
                    labelGroupShiftX = tickLabelPadding;
                    labelGroupTransformY = tickLabelPadding;
                    break;
            }
        }
        var tickMarkAttrHash = this._generateTickMarkAttrHash();
        switch (this.orientation()) {
            case "bottom":
                tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                tickLabelAttrHash["dy"] = "0.95em";
                labelGroupTransformY = tickMarkAttrHash["y1"] + labelGroupShiftY;
                break;
            case "top":
                tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                tickLabelAttrHash["dy"] = "-.25em";
                labelGroupTransformY = tickMarkAttrHash["y1"] - labelGroupShiftY;
                break;
            case "left":
                tickLabelTextAnchor = "end";
                labelGroupTransformX = tickMarkAttrHash["x1"] - labelGroupShiftX;
                tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                break;
            case "right":
                tickLabelTextAnchor = "start";
                labelGroupTransformX = tickMarkAttrHash["x1"] + labelGroupShiftX;
                tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                break;
        }
        var tickLabelValues = this._getTickValues();
        var tickLabelsUpdate = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).data(tickLabelValues);
        tickLabelsUpdate.exit().remove();
        var tickLabels = tickLabelsUpdate
            .enter()
            .append("text")
            .classed(axis_1.Axis.TICK_LABEL_CLASS, true)
            .merge(tickLabelsUpdate);
        tickLabels.style("text-anchor", tickLabelTextAnchor)
            .style("visibility", "inherit")
            .attrs(tickLabelAttrHash)
            .text(function (s) { return _this.formatter()(s); });
        var labelGroupTransform = "translate(" + labelGroupTransformX + ", " + labelGroupTransformY + ")";
        this._tickLabelContainer.attr("transform", labelGroupTransform);
        this._showAllTickMarks();
        if (!this.showEndTickLabels()) {
            this._hideEndTickLabels();
        }
        this._hideOverflowingTickLabels();
        this._hideOverlappingTickLabels();
        if (this._tickLabelPositioning !== "center") {
            this._hideTickMarksWithoutLabel();
        }
        return this;
    };
    Numeric.prototype.tickLabelPosition = function (position) {
        if (position == null) {
            return this._tickLabelPositioning;
        }
        else {
            var positionLC = position.toLowerCase();
            if (this.isHorizontal()) {
                if (!(positionLC === "left" || positionLC === "center" || positionLC === "right")) {
                    throw new Error(positionLC + " is not a valid tick label position for a horizontal NumericAxis");
                }
            }
            else {
                if (!(positionLC === "top" || positionLC === "center" || positionLC === "bottom")) {
                    throw new Error(positionLC + " is not a valid tick label position for a vertical NumericAxis");
                }
            }
            this._tickLabelPositioning = positionLC;
            this.redraw();
            return this;
        }
    };
    Numeric.prototype.usesTextWidthApproximation = function (enable) {
        if (enable == null) {
            return this._usesTextWidthApproximation;
        }
        else {
            this._usesTextWidthApproximation = enable;
            return this;
        }
    };
    Numeric.prototype._hideEndTickLabels = function () {
        var boundingBox = this.element().node().getBoundingClientRect();
        var tickLabels = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS);
        if (tickLabels.size() === 0) {
            return;
        }
        var firstTickLabel = tickLabels.nodes()[0];
        if (!Utils.DOM.clientRectInside(firstTickLabel.getBoundingClientRect(), boundingBox)) {
            d3.select(firstTickLabel).style("visibility", "hidden");
        }
        var lastTickLabel = tickLabels.nodes()[tickLabels.size() - 1];
        if (!Utils.DOM.clientRectInside(lastTickLabel.getBoundingClientRect(), boundingBox)) {
            d3.select(lastTickLabel).style("visibility", "hidden");
        }
    };
    Numeric.prototype._hideOverlappingTickLabels = function () {
        var visibleTickLabels = this._tickLabelContainer
            .selectAll("." + axis_1.Axis.TICK_LABEL_CLASS)
            .filter(function (d, i) {
            var visibility = d3.select(this).style("visibility");
            return (visibility === "inherit") || (visibility === "visible");
        });
        var visibleTickLabelRects = visibleTickLabels.nodes().map(function (label) { return label.getBoundingClientRect(); });
        var interval = 1;
        while (!this._hasOverlapWithInterval(interval, visibleTickLabelRects) && interval < visibleTickLabelRects.length) {
            interval += 1;
        }
        visibleTickLabels.each(function (d, i) {
            var tickLabel = d3.select(this);
            if (i % interval !== 0) {
                tickLabel.style("visibility", "hidden");
            }
        });
    };
    /**
     * The method is responsible for evenly spacing the labels on the axis.
     * @return test to see if taking every `interval` recrangle from `rects`
     *         will result in labels not overlapping
     *
     * For top, bottom, left, right positioning of the thicks, we want the padding
     * between the labels to be 3x, such that the label will be  `padding` distance
     * from the tick and 2 * `padding` distance (or more) from the next tick:
     * see https://github.com/palantir/plottable/pull/1812
     */
    Numeric.prototype._hasOverlapWithInterval = function (interval, rects) {
        var padding = (this._tickLabelPositioning === "center")
            ? this.tickLabelPadding()
            : this.tickLabelPadding() * 3;
        var rectsWithPadding = rects.map(function (rect) { return Utils.DOM.expandRect(rect, padding); });
        for (var i = 0; i < rectsWithPadding.length - interval; i += interval) {
            var currRect = rectsWithPadding[i];
            var nextRect = rectsWithPadding[i + interval];
            if (Utils.DOM.clientRectsOverlap(currRect, nextRect)) {
                return false;
            }
        }
        return true;
    };
    Numeric.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Numeric;
}(axis_1.Axis));
exports.Numeric = Numeric;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guideLineLayer_1 = __webpack_require__(34);
var Interactions = __webpack_require__(13);
var Utils = __webpack_require__(0);
var DragLineLayer = (function (_super) {
    __extends(DragLineLayer, _super);
    function DragLineLayer(orientation) {
        var _this = _super.call(this, orientation) || this;
        _this._detectionRadius = 3;
        _this._enabled = true;
        _this.addClass("drag-line-layer");
        _this.addClass("enabled");
        _this._dragInteraction = new Interactions.Drag();
        _this._dragInteraction.attachTo(_this);
        var onLine = function (p) {
            return (_this._isVertical() &&
                _this.pixelPosition() - _this.detectionRadius() <= p.x &&
                p.x <= _this.pixelPosition() + _this.detectionRadius()) ||
                (!_this._isVertical() &&
                    _this.pixelPosition() - _this.detectionRadius() <= p.y &&
                    p.y <= _this.pixelPosition() + _this.detectionRadius());
        };
        var dragging = false;
        var interactionDragStartCallback = function (start) {
            if (onLine(start)) {
                dragging = true;
                _this._dragStartCallbacks.callCallbacks(_this);
            }
        };
        _this._dragInteraction.onDragStart(interactionDragStartCallback);
        var interactionDragCallback = function (start, end) {
            if (dragging) {
                _this._setPixelPositionWithoutChangingMode(_this._isVertical() ? end.x : end.y);
                _this._dragCallbacks.callCallbacks(_this);
            }
        };
        _this._dragInteraction.onDrag(interactionDragCallback);
        var interactionDragEndCallback = function (start, end) {
            if (dragging) {
                dragging = false;
                _this._dragEndCallbacks.callCallbacks(_this);
            }
        };
        _this._dragInteraction.onDragEnd(interactionDragEndCallback);
        _this._disconnectInteraction = function () {
            _this._dragInteraction.offDragStart(interactionDragStartCallback);
            _this._dragInteraction.offDrag(interactionDragCallback);
            _this._dragInteraction.offDragEnd(interactionDragEndCallback);
            _this._dragInteraction.detachFrom(_this);
        };
        _this._dragStartCallbacks = new Utils.CallbackSet();
        _this._dragCallbacks = new Utils.CallbackSet();
        _this._dragEndCallbacks = new Utils.CallbackSet();
        return _this;
    }
    DragLineLayer.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._detectionEdge = this.content().append("line").styles({
            opacity: 0,
            stroke: "pink",
            "pointer-events": "visibleStroke",
        }).classed("drag-edge", true);
    };
    DragLineLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        this._detectionEdge.attrs({
            "x1": this._isVertical() ? this.pixelPosition() : 0,
            "y1": this._isVertical() ? 0 : this.pixelPosition(),
            "x2": this._isVertical() ? this.pixelPosition() : this.width(),
            "y2": this._isVertical() ? this.height() : this.pixelPosition(),
            "stroke-width": this._detectionRadius * 2,
        });
        return this;
    };
    DragLineLayer.prototype.detectionRadius = function (detectionRadius) {
        if (detectionRadius == null) {
            return this._detectionRadius;
        }
        if (detectionRadius < 0) {
            throw new Error("detection radius cannot be negative.");
        }
        this._detectionRadius = detectionRadius;
        this.render();
        return this;
    };
    DragLineLayer.prototype.enabled = function (enabled) {
        if (enabled == null) {
            return this._enabled;
        }
        this._enabled = enabled;
        if (enabled) {
            this.addClass("enabled");
        }
        else {
            this.removeClass("enabled");
        }
        this._dragInteraction.enabled(enabled);
        return this;
    };
    /**
     * Sets the callback to be called when dragging starts.
     * The callback will be passed the calling DragLineLayer.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.onDragStart = function (callback) {
        this._dragStartCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging starts.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.offDragStart = function (callback) {
        this._dragStartCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called during dragging.
     * The callback will be passed the calling DragLineLayer.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.onDrag = function (callback) {
        this._dragCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called during dragging.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.offDrag = function (callback) {
        this._dragCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called when dragging ends.
     * The callback will be passed the calling DragLineLayer.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.onDragEnd = function (callback) {
        this._dragEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging ends.
     *
     * @param {DragLineCallback<D>} callback
     * @returns {DragLineLayer<D>} The calling DragLineLayer.
     */
    DragLineLayer.prototype.offDragEnd = function (callback) {
        this._dragEndCallbacks.delete(callback);
        return this;
    };
    DragLineLayer.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this._dragStartCallbacks.forEach(function (callback) { return _this._dragStartCallbacks.delete(callback); });
        this._dragCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
        this._dragEndCallbacks.forEach(function (callback) { return _this._dragEndCallbacks.delete(callback); });
        this._disconnectInteraction();
    };
    return DragLineLayer;
}(guideLineLayer_1.GuideLineLayer));
exports.DragLineLayer = DragLineLayer;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var quantitativeScale_1 = __webpack_require__(10);
var component_1 = __webpack_require__(5);
var Gridlines = (function (_super) {
    __extends(Gridlines, _super);
    /**
     * @constructor
     * @param {QuantitativeScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
     * @param {QuantitativeScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
     */
    function Gridlines(xScale, yScale) {
        var _this = this;
        if (xScale != null && !(quantitativeScale_1.QuantitativeScale.prototype.isPrototypeOf(xScale))) {
            throw new Error("xScale needs to inherit from Scale.QuantitativeScale");
        }
        if (yScale != null && !(quantitativeScale_1.QuantitativeScale.prototype.isPrototypeOf(yScale))) {
            throw new Error("yScale needs to inherit from Scale.QuantitativeScale");
        }
        _this = _super.call(this) || this;
        _this.addClass("gridlines");
        _this._xScale = xScale;
        _this._yScale = yScale;
        _this._renderCallback = function (scale) { return _this.render(); };
        if (_this._xScale) {
            _this._xScale.onUpdate(_this._renderCallback);
        }
        if (_this._yScale) {
            _this._yScale.onUpdate(_this._renderCallback);
        }
        return _this;
    }
    Gridlines.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this._xScale) {
            this._xScale.offUpdate(this._renderCallback);
        }
        if (this._yScale) {
            this._yScale.offUpdate(this._renderCallback);
        }
        return this;
    };
    Gridlines.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._xLinesContainer = this.content().append("g").classed("x-gridlines", true);
        this._yLinesContainer = this.content().append("g").classed("y-gridlines", true);
    };
    Gridlines.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        this._redrawXLines();
        this._redrawYLines();
        return this;
    };
    Gridlines.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (this._xScale != null) {
            this._xScale.range([0, this.width()]);
        }
        if (this._yScale != null) {
            this._yScale.range([this.height(), 0]);
        }
        return this;
    };
    Gridlines.prototype._redrawXLines = function () {
        var _this = this;
        if (this._xScale) {
            var xTicks = this._xScale.ticks();
            var getScaledXValue = function (tickVal) { return _this._xScale.scale(tickVal); };
            var xLinesUpdate = this._xLinesContainer.selectAll("line").data(xTicks);
            var xLines = xLinesUpdate.enter().append("line").merge(xLinesUpdate);
            xLines.attr("x1", getScaledXValue)
                .attr("y1", 0)
                .attr("x2", getScaledXValue)
                .attr("y2", this.height())
                .classed("zeroline", function (t) { return t === 0; });
            xLinesUpdate.exit().remove();
        }
    };
    Gridlines.prototype._redrawYLines = function () {
        var _this = this;
        if (this._yScale) {
            var yTicks = this._yScale.ticks();
            var getScaledYValue = function (tickVal) { return _this._yScale.scale(tickVal); };
            var yLinesUpdate = this._yLinesContainer.selectAll("line").data(yTicks);
            var yLines = yLinesUpdate.enter().append("line").merge(yLinesUpdate);
            yLines.attr("x1", 0)
                .attr("y1", getScaledYValue)
                .attr("x2", this.width())
                .attr("y2", getScaledYValue)
                .classed("zeroline", function (t) { return t === 0; });
            yLinesUpdate.exit().remove();
        }
    };
    return Gridlines;
}(component_1.Component));
exports.Gridlines = Gridlines;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Typesetter = __webpack_require__(4);
var Configs = __webpack_require__(20);
var Formatters = __webpack_require__(8);
var Utils = __webpack_require__(0);
var component_1 = __webpack_require__(5);
var InterpolatedColorLegend = (function (_super) {
    __extends(InterpolatedColorLegend, _super);
    /**
     * Creates an InterpolatedColorLegend.
     *
     * The InterpolatedColorLegend consists of a sequence of swatches that show the
     * associated InterpolatedColor Scale sampled at various points.
     * Two labels show the maximum and minimum values of the InterpolatedColor Scale.
     *
     * @constructor
     * @param {Scales.InterpolatedColor} interpolatedColorScale
     */
    function InterpolatedColorLegend(interpolatedColorScale) {
        var _this = _super.call(this) || this;
        _this._textPadding = 5;
        if (interpolatedColorScale == null) {
            throw new Error("InterpolatedColorLegend requires a interpolatedColorScale");
        }
        _this._scale = interpolatedColorScale;
        _this._redrawCallback = function (scale) { return _this.redraw(); };
        _this._scale.onUpdate(_this._redrawCallback);
        _this._formatter = Formatters.general();
        _this._orientation = "horizontal";
        _this._expands = false;
        _this.addClass("legend");
        _this.addClass("interpolated-color-legend");
        return _this;
    }
    InterpolatedColorLegend.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._scale.offUpdate(this._redrawCallback);
    };
    InterpolatedColorLegend.prototype.formatter = function (formatter) {
        if (formatter === undefined) {
            return this._formatter;
        }
        this._formatter = formatter;
        this.redraw();
        return this;
    };
    InterpolatedColorLegend.prototype.expands = function (expands) {
        if (expands == null) {
            return this._expands;
        }
        this._expands = expands;
        this.redraw();
        return this;
    };
    InterpolatedColorLegend._ensureOrientation = function (orientation) {
        orientation = orientation.toLowerCase();
        if (orientation === "horizontal" || orientation === "left" || orientation === "right") {
            return orientation;
        }
        else {
            throw new Error("\"" + orientation + "\" is not a valid orientation for InterpolatedColorLegend");
        }
    };
    InterpolatedColorLegend.prototype.orientation = function (orientation) {
        if (orientation == null) {
            return this._orientation;
        }
        else {
            this._orientation = InterpolatedColorLegend._ensureOrientation(orientation);
            this.redraw();
            return this;
        }
    };
    InterpolatedColorLegend.prototype.fixedWidth = function () {
        return !this.expands() || this._isVertical();
    };
    InterpolatedColorLegend.prototype.fixedHeight = function () {
        return !this.expands() || !this._isVertical();
    };
    InterpolatedColorLegend.prototype._generateTicks = function (numSwatches) {
        if (numSwatches === void 0) { numSwatches = InterpolatedColorLegend._DEFAULT_NUM_SWATCHES; }
        var domain = this._scale.domain();
        if (numSwatches === 1) {
            return [domain[0]];
        }
        var slope = (domain[1] - domain[0]) / (numSwatches - 1);
        var ticks = [];
        for (var i = 0; i < numSwatches; i++) {
            ticks.push(domain[0] + slope * i);
        }
        return ticks;
    };
    InterpolatedColorLegend.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._swatchContainer = this.content().append("g").classed("swatch-container", true);
        this._swatchBoundingBox = this.content().append("rect").classed("swatch-bounding-box", true);
        this._lowerLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
        this._upperLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
        var context = new Typesetter.SvgContext(this.content().node());
        this._measurer = new Typesetter.Measurer(context);
        this._wrapper = new Typesetter.Wrapper();
        this._writer = new Typesetter.Writer(this._measurer, context, this._wrapper);
    };
    InterpolatedColorLegend.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var _this = this;
        var textHeight = this._measurer.measure().height;
        var padding = textHeight;
        var domain = this._scale.domain();
        var labelWidths = domain.map(function (d) { return _this._measurer.measure(_this._formatter(d)).width; });
        var desiredHeight;
        var desiredWidth;
        var numSwatches = InterpolatedColorLegend._DEFAULT_NUM_SWATCHES;
        if (this._isVertical()) {
            var longestWidth = Utils.Math.max(labelWidths, 0);
            desiredWidth = padding + textHeight + this._textPadding + longestWidth + this._textPadding;
            desiredHeight = numSwatches * textHeight;
        }
        else {
            desiredHeight = padding + textHeight + padding;
            desiredWidth = this._textPadding + labelWidths[0] + numSwatches * textHeight
                + labelWidths[1] + this._textPadding;
        }
        return {
            minWidth: desiredWidth,
            minHeight: desiredHeight,
        };
    };
    InterpolatedColorLegend.prototype._isVertical = function () {
        return this._orientation !== "horizontal";
    };
    InterpolatedColorLegend.prototype.renderImmediately = function () {
        var _this = this;
        _super.prototype.renderImmediately.call(this);
        var domain = this._scale.domain();
        var text0 = this._formatter(domain[0]);
        var text0Width = this._measurer.measure(text0).width;
        var text1 = this._formatter(domain[1]);
        var text1Width = this._measurer.measure(text1).width;
        var textHeight = this._measurer.measure().height;
        var textPadding = this._textPadding;
        var upperLabelShift = { x: 0, y: 0 };
        var lowerLabelShift = { x: 0, y: 0 };
        var lowerWriteOptions = {
            xAlign: "center",
            yAlign: "center",
            textRotation: 0,
        };
        var upperWriteOptions = {
            xAlign: "center",
            yAlign: "center",
            textRotation: 0,
        };
        var swatchWidth;
        var swatchHeight;
        var swatchX;
        var swatchY;
        var boundingBoxAttr = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        var padding;
        var numSwatches;
        if (this._isVertical()) {
            numSwatches = Math.floor(this.height());
            var longestTextWidth_1 = Math.max(text0Width, text1Width);
            padding = (this.width() - longestTextWidth_1 - 2 * this._textPadding) / 2;
            swatchWidth = Math.max(this.width() - padding - 2 * textPadding - longestTextWidth_1, 0);
            swatchHeight = 1;
            swatchY = function (d, i) { return _this.height() - (i + 1); };
            upperWriteOptions.yAlign = "top";
            upperLabelShift.y = 0;
            lowerWriteOptions.yAlign = "bottom";
            lowerLabelShift.y = 0;
            if (this._orientation === "left") {
                swatchX = function (d, i) { return textPadding + longestTextWidth_1 + textPadding; };
                upperWriteOptions.xAlign = "right";
                upperLabelShift.x = -(padding + swatchWidth + textPadding);
                lowerWriteOptions.xAlign = "right";
                lowerLabelShift.x = -(padding + swatchWidth + textPadding);
            }
            else {
                swatchX = function (d, i) { return padding; };
                upperWriteOptions.xAlign = "left";
                upperLabelShift.x = padding + swatchWidth + textPadding;
                lowerWriteOptions.xAlign = "left";
                lowerLabelShift.x = padding + swatchWidth + textPadding;
            }
            boundingBoxAttr["width"] = swatchWidth;
            boundingBoxAttr["height"] = numSwatches * swatchHeight;
        }
        else {
            padding = Math.max(textPadding, (this.height() - textHeight) / 2);
            numSwatches = Math.max(Math.floor(this.width() - textPadding * 4 - text0Width - text1Width), 0);
            swatchWidth = 1;
            swatchHeight = Math.max((this.height() - 2 * padding), 0);
            swatchX = function (d, i) { return Math.floor(text0Width + 2 * textPadding) + i; };
            swatchY = function (d, i) { return padding; };
            upperWriteOptions.xAlign = "right";
            upperLabelShift.x = -textPadding;
            lowerWriteOptions.xAlign = "left";
            lowerLabelShift.x = textPadding;
            boundingBoxAttr["y"] = padding;
            boundingBoxAttr["width"] = numSwatches * swatchWidth;
            boundingBoxAttr["height"] = swatchHeight;
        }
        boundingBoxAttr["x"] = swatchX(null, 0); // position of the first swatch
        this._upperLabel.text(""); // clear the upper label
        this._writer.write(text1, this.width(), this.height(), upperWriteOptions, this._upperLabel.node());
        var upperTranslateString = "translate(" + upperLabelShift.x + ", " + upperLabelShift.y + ")";
        this._upperLabel.attr("transform", upperTranslateString);
        this._lowerLabel.text(""); // clear the lower label
        this._writer.write(text0, this.width(), this.height(), lowerWriteOptions, this._lowerLabel.node());
        var lowerTranslateString = "translate(" + lowerLabelShift.x + ", " + lowerLabelShift.y + ")";
        this._lowerLabel.attr("transform", lowerTranslateString);
        this._swatchBoundingBox.attrs(boundingBoxAttr);
        var ticks = this._generateTicks(numSwatches);
        var swatchesUpdate = this._swatchContainer.selectAll("rect.swatch").data(ticks);
        var rects = swatchesUpdate.enter().append("rect").classed("swatch", true);
        ;
        var swatches = swatchesUpdate.merge(rects);
        swatchesUpdate.exit().remove();
        swatches.attrs({
            fill: function (d, i) { return _this._scale.scale(d); },
            width: swatchWidth,
            height: swatchHeight,
            x: swatchX,
            y: swatchY,
            "shape-rendering": "crispEdges",
        });
        if (Configs.ADD_TITLE_ELEMENTS) {
            rects.append("title").text(function (d) { return _this._formatter(d); });
        }
        return this;
    };
    return InterpolatedColorLegend;
}(component_1.Component));
InterpolatedColorLegend._DEFAULT_NUM_SWATCHES = 11;
/**
 * The css class applied to the legend labels.
 */
InterpolatedColorLegend.LEGEND_LABEL_CLASS = "legend-label";
exports.InterpolatedColorLegend = InterpolatedColorLegend;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Typesetter = __webpack_require__(4);
var component_1 = __webpack_require__(5);
var Label = (function (_super) {
    __extends(Label, _super);
    /**
     * A Label is a Component that displays a single line of text.
     *
     * @constructor
     * @param {string} [displayText=""] The text of the Label.
     * @param {number} [angle=0] The angle of the Label in degrees (-90/0/90). 0 is horizontal.
     */
    function Label(displayText, angle) {
        if (displayText === void 0) { displayText = ""; }
        if (angle === void 0) { angle = 0; }
        var _this = _super.call(this) || this;
        _this.addClass("label");
        _this.text(displayText);
        _this.angle(angle);
        _this.xAlignment("center").yAlignment("center");
        _this._padding = 0;
        return _this;
    }
    Label.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var desiredWH = this._measurer.measure(this._text);
        var desiredWidth = (this.angle() === 0 ? desiredWH.width : desiredWH.height) + 2 * this.padding();
        var desiredHeight = (this.angle() === 0 ? desiredWH.height : desiredWH.width) + 2 * this.padding();
        return {
            minWidth: desiredWidth,
            minHeight: desiredHeight,
        };
    };
    Label.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._textContainer = this.content().append("g");
        var context = new Typesetter.SvgContext(this._textContainer.node());
        this._measurer = new Typesetter.CacheMeasurer(context);
        this._wrapper = new Typesetter.Wrapper();
        this._writer = new Typesetter.Writer(this._measurer, context, this._wrapper);
        this.text(this._text);
    };
    Label.prototype.text = function (displayText) {
        if (displayText == null) {
            return this._text;
        }
        else {
            if (typeof displayText !== "string") {
                throw new Error("Label.text() only takes strings as input");
            }
            this._text = displayText;
            this.redraw();
            return this;
        }
    };
    Label.prototype.angle = function (angle) {
        if (angle == null) {
            return this._angle;
        }
        else {
            angle %= 360;
            if (angle > 180) {
                angle -= 360;
            }
            else if (angle < -180) {
                angle += 360;
            }
            if (angle === -90 || angle === 0 || angle === 90) {
                this._angle = angle;
            }
            else {
                throw new Error(angle + " is not a valid angle for Label");
            }
            this.redraw();
            return this;
        }
    };
    Label.prototype.padding = function (padAmount) {
        if (padAmount == null) {
            return this._padding;
        }
        else {
            padAmount = +padAmount;
            if (padAmount < 0) {
                throw new Error(padAmount + " is not a valid padding value. Cannot be less than 0.");
            }
            this._padding = padAmount;
            this.redraw();
            return this;
        }
    };
    Label.prototype.fixedWidth = function () {
        return true;
    };
    Label.prototype.fixedHeight = function () {
        return true;
    };
    Label.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        // HACKHACK Typesetter.remove existing content - #21 on Typesetter.
        this._textContainer.selectAll("g").remove();
        var textMeasurement = this._measurer.measure(this._text);
        var heightPadding = Math.max(Math.min((this.height() - textMeasurement.height) / 2, this.padding()), 0);
        var widthPadding = Math.max(Math.min((this.width() - textMeasurement.width) / 2, this.padding()), 0);
        this._textContainer.attr("transform", "translate(" + widthPadding + "," + heightPadding + ")");
        var writeWidth = this.width() - 2 * widthPadding;
        var writeHeight = this.height() - 2 * heightPadding;
        var writeOptions = {
            xAlign: this.xAlignment(),
            yAlign: this.yAlignment(),
            textRotation: this.angle(),
        };
        this._writer.write(this._text, writeWidth, writeHeight, writeOptions);
        return this;
    };
    Label.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Label;
}(component_1.Component));
exports.Label = Label;
var TitleLabel = (function (_super) {
    __extends(TitleLabel, _super);
    /**
     * @constructor
     * @param {string} [text]
     * @param {number} [angle] One of -90/0/90. 0 is horizontal.
     */
    function TitleLabel(text, angle) {
        var _this = _super.call(this, text, angle) || this;
        _this.addClass(TitleLabel.TITLE_LABEL_CLASS);
        return _this;
    }
    return TitleLabel;
}(Label));
TitleLabel.TITLE_LABEL_CLASS = "title-label";
exports.TitleLabel = TitleLabel;
var AxisLabel = (function (_super) {
    __extends(AxisLabel, _super);
    /**
     * @constructor
     * @param {string} [text]
     * @param {number} [angle] One of -90/0/90. 0 is horizontal.
     */
    function AxisLabel(text, angle) {
        var _this = _super.call(this, text, angle) || this;
        _this.addClass(AxisLabel.AXIS_LABEL_CLASS);
        return _this;
    }
    return AxisLabel;
}(Label));
AxisLabel.AXIS_LABEL_CLASS = "axis-label";
exports.AxisLabel = AxisLabel;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Configs = __webpack_require__(20);
var Formatters = __webpack_require__(8);
var SymbolFactories = __webpack_require__(26);
var Utils = __webpack_require__(0);
var component_1 = __webpack_require__(5);
/**
 * The Legend's row representations. Stores positioning information
 * and column data.
 */
var LegendRow = (function () {
    function LegendRow(
        /**
         * Columns within the row
         * @param {LegendColumn<any>[]} columns
         */
        columns, 
        /**
         * Padding applied below the row. Affects the spacing between rows. Defaults to 0.
         * @param {bottomPadding} number
         */
        bottomPadding, 
        /**
         * Sets the maximum allowable width of this column.
         * @param {number} maxWidth
         */
        maxWidth) {
        if (columns === void 0) { columns = []; }
        if (bottomPadding === void 0) { bottomPadding = 0; }
        if (maxWidth === void 0) { maxWidth = Infinity; }
        this.columns = columns;
        this.bottomPadding = bottomPadding;
        this.maxWidth = maxWidth;
    }
    /**
     * Adds a column to the list of columns within the row. May readjust the size of the
     * column to fit within the row
     *
     * @param {LegendColumn<any>} column
     */
    LegendRow.prototype.addColumn = function (column) {
        var desiredColumnWidth = column.width;
        // choose the smaller of 1) remaining space, 2) desired width
        var widthRemaining = this.getWidthAvailable();
        column.width = Math.min(widthRemaining, desiredColumnWidth);
        this.columns.push(column);
    };
    /**
     * Returns the bounds the column, relative to the row.
     * @param {number} columnIndex The index of the column in question
     * @returns {Bounds} bounds
     */
    LegendRow.prototype.getBounds = function (columnIndex) {
        var column = this.columns[columnIndex];
        var columnXOffset = 0;
        for (var i = 0; i < columnIndex; i++) {
            columnXOffset += this.columns[i].width;
        }
        return {
            topLeft: { x: columnXOffset, y: 0 },
            bottomRight: {
                x: columnXOffset + column.width,
                y: column.height,
            },
        };
    };
    /**
     * Returns the height of the row, including the bottomPadding.
     * @return {number} height
     */
    LegendRow.prototype.getHeight = function () {
        return Utils.Math.max(this.columns.map(function (_a) {
            var height = _a.height;
            return height;
        }), 0) + this.bottomPadding;
    };
    /**
     * Returns the current width of the row constrained by maxWidth, if set.
     * @returns {number} width
     */
    LegendRow.prototype.getWidth = function () {
        return Math.min(this.columns.reduce(function (sum, _a) {
            var width = _a.width;
            return sum + width;
        }, 0), this.maxWidth);
    };
    /**
     * Returns the remaining width available in the row based on the maximum
     * width of this row.
     * @returns {number} widthRemaining
     */
    LegendRow.prototype.getWidthAvailable = function () {
        var widthConsumed = this.getWidth();
        return Math.max(this.maxWidth - widthConsumed, 0);
    };
    return LegendRow;
}());
/**
 * Stores LegendRows. Useful for calculating and maintaining
 * positioning information about the Legend.
 */
var LegendTable = (function () {
    function LegendTable(maxWidth, maxHeight, padding, rows) {
        if (maxWidth === void 0) { maxWidth = Infinity; }
        if (maxHeight === void 0) { maxHeight = Infinity; }
        if (padding === void 0) { padding = 0; }
        if (rows === void 0) { rows = []; }
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.padding = padding;
        this.rows = rows;
    }
    LegendTable.prototype.addRow = function (row) {
        row.maxWidth = this.maxWidth - this.padding * 2;
        this.rows.push(row);
    };
    /**
     * Returns the bounds of the column relative to the parent and siblings of the
     * column.
     *
     * @param {number} rowIndex The parent row containing the desired column.
     * @param {number} columnIndex The column to calculate bounds.
     * @returns {Bounds}
     */
    LegendTable.prototype.getColumnBounds = function (rowIndex, columnIndex) {
        var rowBounds = this.getRowBounds(rowIndex);
        var columnBounds = this.rows[rowIndex].getBounds(columnIndex);
        columnBounds.topLeft.x += rowBounds.topLeft.x;
        columnBounds.bottomRight.x += rowBounds.topLeft.x;
        columnBounds.topLeft.y += rowBounds.topLeft.y;
        columnBounds.bottomRight.y += rowBounds.topLeft.y;
        return columnBounds;
    };
    /**
     * Returns the bounds relative to the parent and siblings of the row.
     *
     * @param {number} rowIndex The row to calculate bounds
     * @returns {Bounds}
     */
    LegendTable.prototype.getRowBounds = function (rowIndex) {
        var rowXOffset = this.padding;
        var rowYOffset = this.padding;
        for (var i = 0; i < rowIndex; i++) {
            rowYOffset += this.rows[i].getHeight();
        }
        var rowBounds = {
            topLeft: { x: rowXOffset, y: rowYOffset },
            bottomRight: {
                x: rowXOffset + this.rows[rowIndex].getWidth(),
                y: rowYOffset + this.rows[rowIndex].getHeight(),
            },
        };
        return rowBounds;
    };
    /**
     * Returns the height of the Table, constrained by a maximum height, if set.
     * The height includes the padding, if set.
     * @returns {number} height
     */
    LegendTable.prototype.getHeight = function () {
        return Math.min(this.rows.reduce(function (sum, row) { return sum + row.getHeight(); }, 0) + this.padding * 2, this.maxHeight);
    };
    /**
     * Returns the width of the table, constrained by the maximum width, if set.
     * The width includes the padding, if set.
     * @returns {number} width
     */
    LegendTable.prototype.getWidth = function () {
        return Math.min(Utils.Math.max(this.rows.map(function (row) { return row.getWidth(); }), 0) + this.padding * 2, this.maxWidth);
    };
    return LegendTable;
}());
var Legend = (function (_super) {
    __extends(Legend, _super);
    /**
     * The Legend consists of a series of entries, each with a color and label taken from the Color Scale.
     *
     * @constructor
     * @param {Scale.Color} scale
     */
    function Legend(colorScale) {
        var _this = _super.call(this) || this;
        _this._padding = 5;
        _this._rowBottomPadding = 3;
        _this.addClass("legend");
        _this.maxEntriesPerRow(1);
        if (colorScale == null) {
            throw new Error("Legend requires a colorScale");
        }
        _this._colorScale = colorScale;
        _this._redrawCallback = function (scale) { return _this.redraw(); };
        _this._colorScale.onUpdate(_this._redrawCallback);
        _this._formatter = Formatters.identity();
        _this.maxLinesPerEntry(1);
        _this.xAlignment("right").yAlignment("top");
        _this.comparator(function (a, b) {
            var formattedText = _this._colorScale.domain().slice().map(function (d) { return _this._formatter(d); });
            return formattedText.indexOf(a) - formattedText.indexOf(b);
        });
        _this._symbolFactoryAccessor = function () { return SymbolFactories.circle(); };
        _this._symbolOpacityAccessor = function () { return 1; };
        return _this;
    }
    Legend.prototype._setup = function () {
        _super.prototype._setup.call(this);
        var fakeLegendRow = this.content().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
        var fakeLegendEntry = fakeLegendRow.append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
        fakeLegendEntry.append("text");
        var context = new Typesetter.SvgContext(fakeLegendRow.node(), null, Configs.ADD_TITLE_ELEMENTS);
        this._measurer = new Typesetter.Measurer(context);
        this._wrapper = new Typesetter.Wrapper().maxLines(this.maxLinesPerEntry());
        this._writer = new Typesetter.Writer(this._measurer, context, this._wrapper);
    };
    Legend.prototype.formatter = function (formatter) {
        if (formatter == null) {
            return this._formatter;
        }
        this._formatter = formatter;
        this.redraw();
        return this;
    };
    Legend.prototype.maxEntriesPerRow = function (maxEntriesPerRow) {
        if (maxEntriesPerRow == null) {
            return this._maxEntriesPerRow;
        }
        else {
            this._maxEntriesPerRow = maxEntriesPerRow;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.maxLinesPerEntry = function (maxLinesPerEntry) {
        if (maxLinesPerEntry == null) {
            return this._maxLinesPerEntry;
        }
        else {
            this._maxLinesPerEntry = maxLinesPerEntry;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.maxWidth = function (maxWidth) {
        if (maxWidth == null) {
            return this._maxWidth;
        }
        else {
            this._maxWidth = maxWidth;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.comparator = function (comparator) {
        if (comparator == null) {
            return this._comparator;
        }
        else {
            this._comparator = comparator;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.colorScale = function (colorScale) {
        if (colorScale != null) {
            this._colorScale.offUpdate(this._redrawCallback);
            this._colorScale = colorScale;
            this._colorScale.onUpdate(this._redrawCallback);
            this.redraw();
            return this;
        }
        else {
            return this._colorScale;
        }
    };
    Legend.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._colorScale.offUpdate(this._redrawCallback);
    };
    Legend.prototype._buildLegendTable = function (width, height) {
        var _this = this;
        var textHeight = this._measurer.measure().height;
        var table = new LegendTable(width, height, this._padding);
        var entryNames = this._colorScale.domain().slice().sort(function (a, b) { return _this._comparator(_this._formatter(a), _this._formatter(b)); });
        var row = new LegendRow();
        table.addRow(row);
        row.bottomPadding = this._rowBottomPadding;
        entryNames.forEach(function (name, index) {
            if (row.columns.length / 2 === _this.maxEntriesPerRow()) {
                // we add two columns per entry, a symbol column and a name column
                // if the current row is full, according to the number of entries
                // we're allowed to have per row, we need to allocate new space
                row = new LegendRow();
                row.bottomPadding = _this._rowBottomPadding;
                table.addRow(row);
            }
            var availableWidth = row.getWidthAvailable();
            var formattedName = _this._formatter(name);
            // this is the width of the series name without any line wrapping
            // it is the most optimal presentation of the name
            var unwrappedNameWidth = _this._measurer.measure(formattedName).width;
            var willBeSquished = (availableWidth - textHeight - unwrappedNameWidth) < 0;
            if (willBeSquished && row.columns.length > 1) {
                // adding the entry to this row will squish this
                // entry. The row already contains entries so create
                // a new row to add this entry to for optimal display
                row = new LegendRow();
                row.bottomPadding = _this._rowBottomPadding;
                table.addRow(row);
            }
            var symbolColumn = { width: textHeight, height: textHeight, data: { name: name, type: "symbol" } };
            row.addColumn(symbolColumn);
            // the space consumed by the name field is the minimum of the space available in the table
            // and the actual width consumed by the name
            availableWidth = row.getWidthAvailable();
            var usedNameWidth = Math.min(availableWidth, unwrappedNameWidth);
            _this._wrapper.maxLines(_this.maxLinesPerEntry());
            var numberOfRows = _this._wrapper.wrap(formattedName, _this._measurer, usedNameWidth).noLines;
            var nameColumnHeight = numberOfRows * textHeight;
            var nameColumn = { width: usedNameWidth, height: nameColumnHeight, data: { name: name, type: "text" } };
            row.addColumn(nameColumn);
        });
        return table;
    };
    Legend.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        // if max width is set, the table is guaranteed to be at most maxWidth wide.
        // if max width is not set, the table will be as wide as the longest untruncated row
        var table = this._buildLegendTable(Utils.Math.min([this.maxWidth(), offeredWidth], offeredWidth), offeredHeight);
        return {
            minHeight: table.getHeight(),
            minWidth: table.getWidth(),
        };
    };
    /**
     * Gets the Entities (representing Legend entries) at a particular point.
     * Returns an empty array if no Entities are present at that location.
     *
     * @param {Point} p
     * @returns {Entity<Legend>[]}
     */
    Legend.prototype.entitiesAt = function (p) {
        var _this = this;
        if (!this._isSetup) {
            return [];
        }
        var table = this._buildLegendTable(this.width(), this.height());
        return table.rows.reduce(function (entity, row, rowIndex) {
            if (entity.length !== 0) {
                // we've already found the nearest entity; just return it.
                return entity;
            }
            var rowBounds = table.getRowBounds(rowIndex);
            var withinRow = Utils.Math.within(p, rowBounds);
            if (!withinRow) {
                // the nearest entity isn't within this row, continue;
                return entity;
            }
            return row.columns.reduce(function (entity, column, columnIndex) {
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                var withinColumn = Utils.Math.within(p, columnBounds);
                if (withinColumn) {
                    var rowElement = _this.content().selectAll("." + Legend.LEGEND_ROW_CLASS).nodes()[rowIndex];
                    // HACKHACK The 2.x API chooses the symbol element as the "selection" to return, regardless of what
                    // was actually selected
                    var entryElement = d3.select(rowElement)
                        .selectAll("." + Legend.LEGEND_ENTRY_CLASS).nodes()[Math.floor(columnIndex / 2)];
                    var symbolElement = d3.select(entryElement).select("." + Legend.LEGEND_SYMBOL_CLASS);
                    // HACKHACK The 2.x API returns the center {x, y} of the symbol as the position.
                    var rowTranslate = Utils.DOM.getTranslateValues(d3.select(rowElement));
                    var symbolTranslate = Utils.DOM.getTranslateValues(symbolElement);
                    return [{
                            datum: column.data.name,
                            position: {
                                x: rowTranslate[0] + symbolTranslate[0],
                                y: rowTranslate[1] + symbolTranslate[1],
                            },
                            selection: d3.select(entryElement),
                            component: _this,
                        }];
                }
                return entity;
            }, entity);
        }, []);
    };
    Legend.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        var table = this._buildLegendTable(this.width(), this.height());
        // clear content from previous renders
        this.content().selectAll("*").remove();
        var rowsUpdate = this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).data(table.rows);
        var rows = rowsUpdate
            .enter()
            .append("g")
            .classed(Legend.LEGEND_ROW_CLASS, true)
            .merge(rowsUpdate);
        rowsUpdate.exit().remove();
        rows.attr("transform", function (row, rowIndex) {
            var rowBounds = table.getRowBounds(rowIndex);
            return "translate(" + rowBounds.topLeft.x + ", " + rowBounds.topLeft.y + ")";
        });
        var self = this;
        rows.each(function (row, rowIndex) {
            var symbolEntryPairs = [];
            for (var i = 0; i < row.columns.length; i += 2) {
                symbolEntryPairs.push([row.columns[i], row.columns[i + 1]]);
            }
            var entriesUpdate = d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS).data(symbolEntryPairs);
            var entriesEnter = entriesUpdate
                .enter()
                .append("g")
                .classed(Legend.LEGEND_ENTRY_CLASS, true)
                .merge(entriesUpdate);
            entriesEnter.append("path")
                .attr("d", function (symbolEntryPair, columnIndex) {
                var symbol = symbolEntryPair[0];
                return self.symbol()(symbol.data.name, rowIndex)(symbol.height * 0.6);
            })
                .attr("transform", function (symbolEntryPair, i) {
                var symbol = symbolEntryPair[0];
                var columnIndex = table.rows[rowIndex].columns.indexOf(symbol);
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                return "translate(" + (columnBounds.topLeft.x + symbol.width / 2) + ", " + symbol.height / 2 + ")";
            })
                .attr("fill", function (symbolEntryPair) { return self._colorScale.scale(symbolEntryPair[0].data.name); })
                .attr("opacity", function (symbolEntryPair, _columnIndex) {
                return self.symbolOpacity()(symbolEntryPair[0].data.name, rowIndex);
            })
                .classed(Legend.LEGEND_SYMBOL_CLASS, true);
            entriesEnter.append("g").classed("text-container", true)
                .attr("transform", function (symbolEntryPair, i) {
                var entry = symbolEntryPair[1];
                var columnIndex = table.rows[rowIndex].columns.indexOf(entry);
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                return "translate(" + columnBounds.topLeft.x + ", 0)";
            })
                .each(function (symbolEntryPair, i, rowIndex) {
                var textContainer = d3.select(this);
                var column = symbolEntryPair[1];
                var writeOptions = {
                    xAlign: "left",
                    yAlign: "top",
                    textRotation: 0,
                };
                self._writer.write(self._formatter(column.data.name), column.width, self.height(), writeOptions, textContainer.node());
            });
            entriesUpdate.exit().remove();
        });
        return this;
    };
    Legend.prototype.symbol = function (symbol) {
        if (symbol == null) {
            return this._symbolFactoryAccessor;
        }
        else {
            this._symbolFactoryAccessor = symbol;
            this.render();
            return this;
        }
    };
    Legend.prototype.symbolOpacity = function (symbolOpacity) {
        if (symbolOpacity == null) {
            return this._symbolOpacityAccessor;
        }
        else if (typeof symbolOpacity === "number") {
            this._symbolOpacityAccessor = function () { return symbolOpacity; };
        }
        else {
            this._symbolOpacityAccessor = symbolOpacity;
        }
        this.render();
        return this;
    };
    Legend.prototype.fixedWidth = function () {
        return true;
    };
    Legend.prototype.fixedHeight = function () {
        return true;
    };
    return Legend;
}(component_1.Component));
/**
 * The css class applied to each legend row
 */
Legend.LEGEND_ROW_CLASS = "legend-row";
/**
 * The css class applied to each legend entry
 */
Legend.LEGEND_ENTRY_CLASS = "legend-entry";
/**
 * The css class applied to each legend symbol
 */
Legend.LEGEND_SYMBOL_CLASS = "legend-symbol";
exports.Legend = Legend;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plot_1 = __webpack_require__(2);
var Utils = __webpack_require__(0);
var group_1 = __webpack_require__(33);
var PlotGroup = (function (_super) {
    __extends(PlotGroup, _super);
    function PlotGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlotGroup.prototype.entityNearest = function (point) {
        var closestPlotEntity;
        var minDistSquared = Infinity;
        this.components().forEach(function (plotComponent) {
            // we know it's a Plot since .append() throws a runtime error otherwise
            var plot = plotComponent;
            var candidatePlotEntity = plot.entityNearest(point);
            if (candidatePlotEntity == null) {
                return;
            }
            var distSquared = Utils.Math.distanceSquared(candidatePlotEntity.position, point);
            if (distSquared <= minDistSquared) {
                minDistSquared = distSquared;
                closestPlotEntity = candidatePlotEntity;
            }
        });
        return closestPlotEntity;
    };
    /**
     * Adds a Plot to this Plot Group.
     * The added Plot will be rendered above Plots already in the Group.
     */
    PlotGroup.prototype.append = function (plot) {
        if (plot != null && !(plot instanceof plot_1.Plot)) {
            throw new Error("Plot Group only accepts plots");
        }
        _super.prototype.append.call(this, plot);
        return this;
    };
    return PlotGroup;
}(group_1.Group));
exports.PlotGroup = PlotGroup;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var componentContainer_1 = __webpack_require__(24);
var Table = (function (_super) {
    __extends(Table, _super);
    /**
     * A Table combines Components in the form of a grid. A
     * common case is combining a y-axis, x-axis, and the plotted data via
     * ```typescript
     * new Table([[yAxis, plot],
     *            [null,  xAxis]]);
     * ```
     *
     * @constructor
     * @param {Component[][]} [rows=[]] A 2-D array of Components to be added to the Table.
     *   null can be used if a cell is empty.
     */
    function Table(rows) {
        if (rows === void 0) { rows = []; }
        var _this = _super.call(this) || this;
        _this._rowPadding = 0;
        _this._columnPadding = 0;
        _this._rows = [];
        _this._rowWeights = [];
        _this._columnWeights = [];
        _this._nRows = 0;
        _this._nCols = 0;
        _this._calculatedLayout = null;
        _this.addClass("table");
        rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                if (component != null) {
                    _this.add(component, rowIndex, colIndex);
                }
            });
        });
        return _this;
    }
    Table.prototype._forEach = function (callback) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] != null) {
                    callback(this._rows[r][c]);
                }
            }
        }
    };
    /**
     * Checks whether the specified Component is in the Table.
     */
    Table.prototype.has = function (component) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] === component) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns the Component at the specified row and column index.
     *
     * @param {number} rowIndex
     * @param {number} columnIndex
     * @returns {Component} The Component at the specified position, or null if no Component is there.
     */
    Table.prototype.componentAt = function (rowIndex, columnIndex) {
        if (rowIndex < 0 || rowIndex >= this._nRows || columnIndex < 0 || columnIndex >= this._nCols) {
            return null;
        }
        return this._rows[rowIndex][columnIndex];
    };
    ;
    /**
     * Adds a Component in the specified row and column position.
     *
     * For example, instead of calling `new Table([[a, b], [null, c]])`, you
     * could call
     * var table = new Plottable.Components.Table();
     * table.add(a, 0, 0);
     * table.add(b, 0, 1);
     * table.add(c, 1, 1);
     *
     * @param {Component} component The Component to be added.
     * @param {number} row
     * @param {number} col
     * @returns {Table} The calling Table.
     */
    Table.prototype.add = function (component, row, col) {
        if (component == null) {
            throw Error("Cannot add null to a table cell");
        }
        if (!this.has(component)) {
            var currentComponent = this._rows[row] && this._rows[row][col];
            if (currentComponent != null) {
                throw new Error("cell is occupied");
            }
            component.detach();
            this._nRows = Math.max(row + 1, this._nRows);
            this._nCols = Math.max(col + 1, this._nCols);
            this._padTableToSize(this._nRows, this._nCols);
            this._rows[row][col] = component;
            this._adoptAndAnchor(component);
            this.redraw();
        }
        return this;
    };
    Table.prototype._remove = function (component) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] === component) {
                    this._rows[r][c] = null;
                    return true;
                }
            }
        }
        return false;
    };
    Table.prototype._iterateLayout = function (availableWidth, availableHeight, isFinalOffer) {
        if (isFinalOffer === void 0) { isFinalOffer = false; }
        /*
         * Given availableWidth and availableHeight, figure out how to allocate it between rows and columns using an iterative algorithm.
         *
         * For both dimensions, keeps track of "guaranteedSpace", which the fixed-size components have requested, and
         * "proportionalSpace", which is being given to proportionally-growing components according to the weights on the table.
         * Here is how it works (example uses width but it is the same for height). First, columns are guaranteed no width, and
         * the free width is allocated to columns based on their colWeights. Then, in determineGuarantees, every component is
         * offered its column's width and may request some amount of it, which increases that column's guaranteed
         * width. If there are some components that were not satisfied with the width they were offered, and there is free
         * width that has not already been guaranteed, then the remaining width is allocated to the unsatisfied columns and the
         * algorithm runs again. If all components are satisfied, then the remaining width is allocated as proportional space
         * according to the colWeights.
         *
         * The guaranteed width for each column is monotonically increasing as the algorithm iterates. Since it is deterministic
         * and monotonically increasing, if the freeWidth does not change during an iteration it implies that no further progress
         * is possible, so the algorithm will not continue iterating on that dimension's account.
         *
         * If the algorithm runs more than 5 times, we stop and just use whatever we arrived at. It's not clear under what
         * circumstances this will happen or if it will happen at all. A message will be printed to the console if this occurs.
         *
         */
        var rows = this._rows;
        var cols = d3.transpose(this._rows);
        var availableWidthAfterPadding = availableWidth - this._columnPadding * (this._nCols - 1);
        var availableHeightAfterPadding = availableHeight - this._rowPadding * (this._nRows - 1);
        var rowWeights = Table._calcComponentWeights(this._rowWeights, rows, function (c) { return (c == null) || c.fixedHeight(); });
        var colWeights = Table._calcComponentWeights(this._columnWeights, cols, function (c) { return (c == null) || c.fixedWidth(); });
        // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
        // so that they will get some initial space allocated to work with
        var heuristicColWeights = colWeights.map(function (c) { return c === 0 ? 0.5 : c; });
        var heuristicRowWeights = rowWeights.map(function (c) { return c === 0 ? 0.5 : c; });
        var colProportionalSpace = Table._calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding);
        var rowProportionalSpace = Table._calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);
        var guaranteedWidths = Utils.Array.createFilledArray(0, this._nCols);
        var guaranteedHeights = Utils.Array.createFilledArray(0, this._nRows);
        var freeWidth;
        var freeHeight;
        var nIterations = 0;
        var guarantees;
        var wantsWidth;
        var wantsHeight;
        while (true) {
            var offeredHeights = Utils.Array.add(guaranteedHeights, rowProportionalSpace);
            var offeredWidths = Utils.Array.add(guaranteedWidths, colProportionalSpace);
            guarantees = this._determineGuarantees(offeredWidths, offeredHeights, isFinalOffer);
            guaranteedWidths = guarantees.guaranteedWidths;
            guaranteedHeights = guarantees.guaranteedHeights;
            wantsWidth = guarantees.wantsWidthArr.some(function (x) { return x; });
            wantsHeight = guarantees.wantsHeightArr.some(function (x) { return x; });
            var lastFreeWidth = freeWidth;
            var lastFreeHeight = freeHeight;
            freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
            freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
            var xWeights = void 0;
            if (wantsWidth) {
                xWeights = guarantees.wantsWidthArr.map(function (x) { return x ? 0.1 : 0; });
                xWeights = Utils.Array.add(xWeights, colWeights);
            }
            else {
                xWeights = colWeights;
            }
            var yWeights = void 0;
            if (wantsHeight) {
                yWeights = guarantees.wantsHeightArr.map(function (x) { return x ? 0.1 : 0; });
                yWeights = Utils.Array.add(yWeights, rowWeights);
            }
            else {
                yWeights = rowWeights;
            }
            colProportionalSpace = Table._calcProportionalSpace(xWeights, freeWidth);
            rowProportionalSpace = Table._calcProportionalSpace(yWeights, freeHeight);
            nIterations++;
            var canImproveWidthAllocation = freeWidth > 0 && freeWidth !== lastFreeWidth;
            var canImproveHeightAllocation = freeHeight > 0 && freeHeight !== lastFreeHeight;
            if (!(canImproveWidthAllocation || canImproveHeightAllocation)) {
                break;
            }
            if (nIterations > 5) {
                break;
            }
        }
        // Redo the proportional space one last time, to ensure we use the real weights not the wantsWidth/Height weights
        freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
        freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
        colProportionalSpace = Table._calcProportionalSpace(colWeights, freeWidth);
        rowProportionalSpace = Table._calcProportionalSpace(rowWeights, freeHeight);
        return {
            colProportionalSpace: colProportionalSpace,
            rowProportionalSpace: rowProportionalSpace,
            guaranteedWidths: guarantees.guaranteedWidths,
            guaranteedHeights: guarantees.guaranteedHeights,
            wantsWidth: wantsWidth,
            wantsHeight: wantsHeight,
        };
    };
    Table.prototype._determineGuarantees = function (offeredWidths, offeredHeights, isFinalOffer) {
        if (isFinalOffer === void 0) { isFinalOffer = false; }
        var requestedWidths = Utils.Array.createFilledArray(0, this._nCols);
        var requestedHeights = Utils.Array.createFilledArray(0, this._nRows);
        var columnNeedsWidth = Utils.Array.createFilledArray(false, this._nCols);
        var rowNeedsHeight = Utils.Array.createFilledArray(false, this._nRows);
        this._rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                var spaceRequest;
                if (component != null) {
                    spaceRequest = component.requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
                }
                else {
                    spaceRequest = {
                        minWidth: 0,
                        minHeight: 0,
                    };
                }
                var columnWidth = isFinalOffer ? Math.min(spaceRequest.minWidth, offeredWidths[colIndex]) : spaceRequest.minWidth;
                requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], columnWidth);
                var rowHeight = isFinalOffer ? Math.min(spaceRequest.minHeight, offeredHeights[rowIndex]) : spaceRequest.minHeight;
                requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], rowHeight);
                var componentNeedsWidth = spaceRequest.minWidth > offeredWidths[colIndex];
                columnNeedsWidth[colIndex] = columnNeedsWidth[colIndex] || componentNeedsWidth;
                var componentNeedsHeight = spaceRequest.minHeight > offeredHeights[rowIndex];
                rowNeedsHeight[rowIndex] = rowNeedsHeight[rowIndex] || componentNeedsHeight;
            });
        });
        return {
            guaranteedWidths: requestedWidths,
            guaranteedHeights: requestedHeights,
            wantsWidthArr: columnNeedsWidth,
            wantsHeightArr: rowNeedsHeight,
        };
    };
    Table.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        this._calculatedLayout = this._iterateLayout(offeredWidth, offeredHeight);
        return {
            minWidth: d3.sum(this._calculatedLayout.guaranteedWidths),
            minHeight: d3.sum(this._calculatedLayout.guaranteedHeights),
        };
    };
    Table.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        var _this = this;
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        var lastLayoutWidth = d3.sum(this._calculatedLayout.guaranteedWidths);
        var lastLayoutHeight = d3.sum(this._calculatedLayout.guaranteedHeights);
        var layout = this._calculatedLayout;
        if (lastLayoutWidth > this.width() || lastLayoutHeight > this.height()) {
            layout = this._iterateLayout(this.width(), this.height(), true);
        }
        var childYOrigin = 0;
        var rowHeights = Utils.Array.add(layout.rowProportionalSpace, layout.guaranteedHeights);
        var colWidths = Utils.Array.add(layout.colProportionalSpace, layout.guaranteedWidths);
        this._rows.forEach(function (row, rowIndex) {
            var childXOrigin = 0;
            row.forEach(function (component, colIndex) {
                // recursively compute layout
                if (component != null) {
                    component.computeLayout({ x: childXOrigin, y: childYOrigin }, colWidths[colIndex], rowHeights[rowIndex]);
                }
                childXOrigin += colWidths[colIndex] + _this._columnPadding;
            });
            childYOrigin += rowHeights[rowIndex] + _this._rowPadding;
        });
        return this;
    };
    Table.prototype.rowPadding = function (rowPadding) {
        if (rowPadding == null) {
            return this._rowPadding;
        }
        if (!Utils.Math.isValidNumber(rowPadding) || rowPadding < 0) {
            throw Error("rowPadding must be a non-negative finite value");
        }
        this._rowPadding = rowPadding;
        this.redraw();
        return this;
    };
    Table.prototype.columnPadding = function (columnPadding) {
        if (columnPadding == null) {
            return this._columnPadding;
        }
        if (!Utils.Math.isValidNumber(columnPadding) || columnPadding < 0) {
            throw Error("columnPadding must be a non-negative finite value");
        }
        this._columnPadding = columnPadding;
        this.redraw();
        return this;
    };
    Table.prototype.rowWeight = function (index, weight) {
        if (weight == null) {
            return this._rowWeights[index];
        }
        if (!Utils.Math.isValidNumber(weight) || weight < 0) {
            throw Error("rowWeight must be a non-negative finite value");
        }
        this._rowWeights[index] = weight;
        this.redraw();
        return this;
    };
    Table.prototype.columnWeight = function (index, weight) {
        if (weight == null) {
            return this._columnWeights[index];
        }
        if (!Utils.Math.isValidNumber(weight) || weight < 0) {
            throw Error("columnWeight must be a non-negative finite value");
        }
        this._columnWeights[index] = weight;
        this.redraw();
        return this;
    };
    Table.prototype.fixedWidth = function () {
        var cols = d3.transpose(this._rows);
        return Table._fixedSpace(cols, function (c) { return (c == null) || c.fixedWidth(); });
    };
    Table.prototype.fixedHeight = function () {
        return Table._fixedSpace(this._rows, function (c) { return (c == null) || c.fixedHeight(); });
    };
    Table.prototype._padTableToSize = function (nRows, nCols) {
        for (var i = 0; i < nRows; i++) {
            if (this._rows[i] === undefined) {
                this._rows[i] = [];
                this._rowWeights[i] = null;
            }
            for (var j = 0; j < nCols; j++) {
                if (this._rows[i][j] === undefined) {
                    this._rows[i][j] = null;
                }
            }
        }
        for (var j = 0; j < nCols; j++) {
            if (this._columnWeights[j] === undefined) {
                this._columnWeights[j] = null;
            }
        }
    };
    Table._calcComponentWeights = function (setWeights, componentGroups, fixityAccessor) {
        // If the row/col weight was explicitly set, then return it outright
        // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
        // then weight is 0, otherwise weight is 1
        return setWeights.map(function (w, i) {
            if (w != null) {
                return w;
            }
            var fixities = componentGroups[i].map(fixityAccessor);
            var allFixed = fixities.reduce(function (a, b) { return a && b; }, true);
            return allFixed ? 0 : 1;
        });
    };
    Table._calcProportionalSpace = function (weights, freeSpace) {
        var weightSum = d3.sum(weights);
        if (weightSum === 0) {
            return Utils.Array.createFilledArray(0, weights.length);
        }
        else {
            return weights.map(function (w) { return freeSpace * w / weightSum; });
        }
    };
    Table._fixedSpace = function (componentGroup, fixityAccessor) {
        var all = function (bools) { return bools.reduce(function (a, b) { return a && b; }, true); };
        var groupIsFixed = function (components) { return all(components.map(fixityAccessor)); };
        return all(componentGroup.map(groupIsFixed));
    };
    return Table;
}(componentContainer_1.ComponentContainer));
exports.Table = Table;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dragBoxLayer_1 = __webpack_require__(27);
var XDragBoxLayer = (function (_super) {
    __extends(XDragBoxLayer, _super);
    /**
     * An XDragBoxLayer is a DragBoxLayer whose size can only be set in the X-direction.
     * The y-values of the bounds() are always set to 0 and the height() of the XDragBoxLayer.
     *
     * @constructor
     */
    function XDragBoxLayer() {
        var _this = _super.call(this) || this;
        _this.addClass("x-drag-box-layer");
        _this._hasCorners = false;
        return _this;
    }
    XDragBoxLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        // set correct bounds when width/height changes
        this._setBounds(this.bounds());
        return this;
    };
    XDragBoxLayer.prototype._setBounds = function (newBounds) {
        _super.prototype._setBounds.call(this, {
            topLeft: { x: newBounds.topLeft.x, y: 0 },
            bottomRight: { x: newBounds.bottomRight.x, y: this.height() },
        });
    };
    XDragBoxLayer.prototype._setResizableClasses = function (canResize) {
        if (canResize && this.enabled()) {
            this.addClass("x-resizable");
        }
        else {
            this.removeClass("x-resizable");
        }
    };
    XDragBoxLayer.prototype.yScale = function (yScale) {
        if (yScale == null) {
            return _super.prototype.yScale.call(this);
        }
        throw new Error("yScales cannot be set on an XDragBoxLayer");
    };
    XDragBoxLayer.prototype.yExtent = function (yExtent) {
        if (yExtent == null) {
            return _super.prototype.yExtent.call(this);
        }
        throw new Error("XDragBoxLayer has no yExtent");
    };
    return XDragBoxLayer;
}(dragBoxLayer_1.DragBoxLayer));
exports.XDragBoxLayer = XDragBoxLayer;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dragBoxLayer_1 = __webpack_require__(27);
var YDragBoxLayer = (function (_super) {
    __extends(YDragBoxLayer, _super);
    /**
     * A YDragBoxLayer is a DragBoxLayer whose size can only be set in the Y-direction.
     * The x-values of the bounds() are always set to 0 and the width() of the YDragBoxLayer.
     *
     * @constructor
     */
    function YDragBoxLayer() {
        var _this = _super.call(this) || this;
        _this.addClass("y-drag-box-layer");
        _this._hasCorners = false;
        return _this;
    }
    YDragBoxLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        // set correct bounds when width/height changes
        this._setBounds(this.bounds());
        return this;
    };
    YDragBoxLayer.prototype._setBounds = function (newBounds) {
        _super.prototype._setBounds.call(this, {
            topLeft: { x: 0, y: newBounds.topLeft.y },
            bottomRight: { x: this.width(), y: newBounds.bottomRight.y },
        });
    };
    YDragBoxLayer.prototype._setResizableClasses = function (canResize) {
        if (canResize && this.enabled()) {
            this.addClass("y-resizable");
        }
        else {
            this.removeClass("y-resizable");
        }
    };
    YDragBoxLayer.prototype.xScale = function (xScale) {
        if (xScale == null) {
            return _super.prototype.xScale.call(this);
        }
        throw new Error("xScales cannot be set on an YDragBoxLayer");
    };
    YDragBoxLayer.prototype.xExtent = function (xExtent) {
        if (xExtent == null) {
            return _super.prototype.xExtent.call(this);
        }
        throw new Error("YDragBoxLayer has no xExtent");
    };
    return YDragBoxLayer;
}(dragBoxLayer_1.DragBoxLayer));
exports.YDragBoxLayer = YDragBoxLayer;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dispatcher_1 = __webpack_require__(21);
var Key = (function (_super) {
    __extends(Key, _super);
    /**
     * This constructor should not be invoked directly.
     *
     * @constructor
     */
    function Key() {
        var _this = _super.call(this) || this;
        _this._eventToProcessingFunction[Key._KEYDOWN_EVENT_NAME] = function (e) { return _this._processKeydown(e); };
        _this._eventToProcessingFunction[Key._KEYUP_EVENT_NAME] = function (e) { return _this._processKeyup(e); };
        return _this;
    }
    /**
     * Gets a Key Dispatcher. If one already exists it will be returned;
     * otherwise, a new one will be created.
     *
     * @return {Dispatchers.Key}
     */
    Key.getDispatcher = function () {
        var dispatcher = document[Key._DISPATCHER_KEY];
        if (dispatcher == null) {
            dispatcher = new Key();
            document[Key._DISPATCHER_KEY] = dispatcher;
        }
        return dispatcher;
    };
    Key.prototype._processKeydown = function (event) {
        this._callCallbacksForEvent(Key._KEYDOWN_EVENT_NAME, event.keyCode, event);
    };
    Key.prototype._processKeyup = function (event) {
        this._callCallbacksForEvent(Key._KEYUP_EVENT_NAME, event.keyCode, event);
    };
    /**
     * Registers a callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.onKeyDown = function (callback) {
        this._addCallbackForEvent(Key._KEYDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes the callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.offKeyDown = function (callback) {
        this._removeCallbackForEvent(Key._KEYDOWN_EVENT_NAME, callback);
        return this;
    };
    /** Registers a callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.onKeyUp = function (callback) {
        this._addCallbackForEvent(Key._KEYUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes the callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.offKeyUp = function (callback) {
        this._removeCallbackForEvent(Key._KEYUP_EVENT_NAME, callback);
        return this;
    };
    return Key;
}(dispatcher_1.Dispatcher));
Key._DISPATCHER_KEY = "__Plottable_Dispatcher_Key";
Key._KEYDOWN_EVENT_NAME = "keydown";
Key._KEYUP_EVENT_NAME = "keyup";
exports.Key = Key;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var dispatcher_1 = __webpack_require__(21);
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    /**
     * This constructor not be invoked directly.
     *
     * @constructor
     */
    function Mouse(component) {
        var _this = _super.call(this) || this;
        _this._translator = Utils.getTranslator(component);
        _this._lastMousePosition = { x: -1, y: -1 };
        var processMoveCallback = function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEMOVE_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Mouse._MOUSEOVER_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEMOVE_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEOUT_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEDOWN_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEDOWN_EVENT_NAME); };
        _this._eventToProcessingFunction[Mouse._MOUSEUP_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEUP_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Mouse._WHEEL_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._WHEEL_EVENT_NAME); };
        _this._eventToProcessingFunction[Mouse._DBLCLICK_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._DBLCLICK_EVENT_NAME); };
        return _this;
    }
    /**
     * Get a Mouse Dispatcher for the component tree.
     * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
     *
     * @param {SVGElement} elem
     * @return {Dispatchers.Mouse}
     */
    Mouse.getDispatcher = function (component) {
        var element = component.root().rootElement();
        var dispatcher = element[Mouse._DISPATCHER_KEY];
        if (dispatcher == null) {
            dispatcher = new Mouse(component);
            element[Mouse._DISPATCHER_KEY] = dispatcher;
        }
        return dispatcher;
    };
    /**
     * Registers a callback to be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseMove = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseMove = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseDown = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseDown = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseUp = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseUp = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onWheel = function (callback) {
        this._addCallbackForEvent(Mouse._WHEEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offWheel = function (callback) {
        this._removeCallbackForEvent(Mouse._WHEEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onDblClick = function (callback) {
        this._addCallbackForEvent(Mouse._DBLCLICK_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offDblClick = function (callback) {
        this._removeCallbackForEvent(Mouse._DBLCLICK_EVENT_NAME, callback);
        return this;
    };
    /**
     * Computes the mouse position from the given event, and if successful
     * calls all the callbacks in the provided callbackSet.
     */
    Mouse.prototype._measureAndDispatch = function (component, event, eventName, scope) {
        if (scope === void 0) { scope = "element"; }
        if (scope !== "page" && scope !== "element") {
            throw new Error("Invalid scope '" + scope + "', must be 'element' or 'page'");
        }
        if (scope === "page" || this.eventInside(component, event)) {
            var newMousePosition = this._translator.computePosition(event.clientX, event.clientY);
            if (newMousePosition != null) {
                this._lastMousePosition = newMousePosition;
                this._callCallbacksForEvent(eventName, this.lastMousePosition(), event);
            }
        }
    };
    Mouse.prototype.eventInside = function (component, event) {
        return this._translator.isInside(component, event);
    };
    /**
     * Returns the last computed mouse position in <svg> coordinate space.
     *
     * @return {Point}
     */
    Mouse.prototype.lastMousePosition = function () {
        return this._lastMousePosition;
    };
    return Mouse;
}(dispatcher_1.Dispatcher));
Mouse._DISPATCHER_KEY = "__Plottable_Dispatcher_Mouse";
Mouse._MOUSEOVER_EVENT_NAME = "mouseover";
Mouse._MOUSEMOVE_EVENT_NAME = "mousemove";
Mouse._MOUSEOUT_EVENT_NAME = "mouseout";
Mouse._MOUSEDOWN_EVENT_NAME = "mousedown";
Mouse._MOUSEUP_EVENT_NAME = "mouseup";
Mouse._WHEEL_EVENT_NAME = "wheel";
Mouse._DBLCLICK_EVENT_NAME = "dblclick";
exports.Mouse = Mouse;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var dispatcher_1 = __webpack_require__(21);
var Touch = (function (_super) {
    __extends(Touch, _super);
    /**
     * This constructor should not be invoked directly.
     *
     * @param {SVGElement} svg The root <svg> to attach to.
     */
    function Touch(component) {
        var _this = _super.call(this) || this;
        _this._translator = Utils.getTranslator(component);
        _this._eventToProcessingFunction[Touch._TOUCHSTART_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Touch._TOUCHSTART_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Touch._TOUCHMOVE_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Touch._TOUCHMOVE_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Touch._TOUCHEND_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Touch._TOUCHEND_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Touch._TOUCHCANCEL_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Touch._TOUCHCANCEL_EVENT_NAME, "page"); };
        return _this;
    }
    /**
     * Gets a Touch Dispatcher for the component.
     * If one already exists, it will be returned; otherwise, a new one will be created.
     *
     * @param component
     * @return {Dispatchers.Touch}
     */
    Touch.getDispatcher = function (component) {
        var svg = component.root().rootElement();
        var dispatcher = svg[Touch._DISPATCHER_KEY];
        if (dispatcher == null) {
            dispatcher = new Touch(component);
            svg[Touch._DISPATCHER_KEY] = dispatcher;
        }
        return dispatcher;
    };
    /**
     * Registers a callback to be called when a touch starts.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.onTouchStart = function (callback) {
        this._addCallbackForEvent(Touch._TOUCHSTART_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a touch starts.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.offTouchStart = function (callback) {
        this._removeCallbackForEvent(Touch._TOUCHSTART_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when the touch position changes.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.onTouchMove = function (callback) {
        this._addCallbackForEvent(Touch._TOUCHMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the touch position changes.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.offTouchMove = function (callback) {
        this._removeCallbackForEvent(Touch._TOUCHMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a touch ends.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.onTouchEnd = function (callback) {
        this._addCallbackForEvent(Touch._TOUCHEND_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a touch ends.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.offTouchEnd = function (callback) {
        this._removeCallbackForEvent(Touch._TOUCHEND_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a touch is cancelled.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.onTouchCancel = function (callback) {
        this._addCallbackForEvent(Touch._TOUCHCANCEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a touch is cancelled.
     *
     * @param {TouchCallback} callback
     * @return {Dispatchers.Touch} The calling Touch Dispatcher.
     */
    Touch.prototype.offTouchCancel = function (callback) {
        this._removeCallbackForEvent(Touch._TOUCHCANCEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Computes the Touch position from the given event, and if successful
     * calls all the callbacks in the provided callbackSet.
     */
    Touch.prototype._measureAndDispatch = function (component, event, eventName, scope) {
        if (scope === void 0) { scope = "element"; }
        if (scope !== "page" && scope !== "element") {
            throw new Error("Invalid scope '" + scope + "', must be 'element' or 'page'");
        }
        if (scope === "element" && !this.eventInside(component, event)) {
            return;
        }
        var touches = event.changedTouches;
        var touchPositions = {};
        var touchIdentifiers = [];
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i];
            var touchID = touch.identifier;
            var newTouchPosition = this._translator.computePosition(touch.clientX, touch.clientY);
            if (newTouchPosition != null) {
                touchPositions[touchID] = newTouchPosition;
                touchIdentifiers.push(touchID);
            }
        }
        ;
        if (touchIdentifiers.length > 0) {
            this._callCallbacksForEvent(eventName, touchIdentifiers, touchPositions, event);
        }
    };
    Touch.prototype.eventInside = function (component, event) {
        return this._translator.isInside(component, event);
    };
    return Touch;
}(dispatcher_1.Dispatcher));
Touch._DISPATCHER_KEY = "__Plottable_Dispatcher_Touch";
Touch._TOUCHSTART_EVENT_NAME = "touchstart";
Touch._TOUCHMOVE_EVENT_NAME = "touchmove";
Touch._TOUCHEND_EVENT_NAME = "touchend";
Touch._TOUCHCANCEL_EVENT_NAME = "touchcancel";
exports.Touch = Touch;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = __webpack_require__(7);
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._className = "arc fill";
        _this._svgElementName = "path";
        return _this;
    }
    Arc.prototype._applyDefaultAttributes = function (selection) {
        _super.prototype._applyDefaultAttributes.call(this, selection);
        selection.style("stroke", "none");
    };
    return Arc;
}(drawer_1.Drawer));
exports.Arc = Arc;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = __webpack_require__(7);
var ArcOutline = (function (_super) {
    __extends(ArcOutline, _super);
    function ArcOutline(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._className = "arc outline";
        _this._svgElementName = "path";
        return _this;
    }
    ArcOutline.prototype._applyDefaultAttributes = function (selection) {
        _super.prototype._applyDefaultAttributes.call(this, selection);
        selection.style("fill", "none");
    };
    return ArcOutline;
}(drawer_1.Drawer));
exports.ArcOutline = ArcOutline;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var drawer_1 = __webpack_require__(7);
var Area = (function (_super) {
    __extends(Area, _super);
    function Area(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._className = "area";
        _this._svgElementName = "path";
        return _this;
    }
    Area.prototype._applyDefaultAttributes = function (selection) {
        _super.prototype._applyDefaultAttributes.call(this, selection);
        selection.style("stroke", "none");
    };
    Area.prototype.selectionForIndex = function (index) {
        return d3.select(this.selection().node());
    };
    return Area;
}(drawer_1.Drawer));
exports.Area = Area;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var drawer_1 = __webpack_require__(7);
var Line = (function (_super) {
    __extends(Line, _super);
    /**
     * @param dataset
     * @param _d3LineFactory A callback that gives this Line Drawer a d3.Line object which will be
     * used to draw with.
     */
    function Line(dataset, d3LineFactory) {
        var _this = _super.call(this, dataset) || this;
        _this._d3LineFactory = d3LineFactory;
        _this._className = "line";
        _this._svgElementName = "path";
        return _this;
    }
    Line.prototype._applyDefaultAttributes = function (selection) {
        _super.prototype._applyDefaultAttributes.call(this, selection);
        selection.style("fill", "none");
    };
    Line.prototype.selectionForIndex = function (index) {
        return d3.select(this.selection().node());
    };
    /**
     *
     * @param data Data to draw. The data will be passed through the line factory in order to get applied
     * onto the canvas.
     * @param step
     * @private
     */
    Line.prototype._drawStepCanvas = function (data, step) {
        var context = this.canvas().node().getContext("2d");
        var d3Line = this._d3LineFactory();
        var attrToAppliedProjector = step.attrToAppliedProjector;
        var resolvedAttrs = Object.keys(attrToAppliedProjector).reduce(function (obj, attrName) {
            obj[attrName] = attrToAppliedProjector[attrName](data, 0);
            return obj;
        }, {});
        context.save();
        context.beginPath();
        d3Line.context(context);
        d3Line(data[0]);
        if (resolvedAttrs["stroke-width"]) {
            context.lineWidth = parseFloat(resolvedAttrs["stroke-width"]);
        }
        if (resolvedAttrs["stroke"]) {
            var strokeColor = d3.color(resolvedAttrs["stroke"]);
            if (resolvedAttrs["opacity"]) {
                strokeColor.opacity = resolvedAttrs["opacity"];
            }
            context.strokeStyle = strokeColor.rgb().toString();
            context.stroke();
        }
        context.restore();
    };
    return Line;
}(drawer_1.Drawer));
exports.Line = Line;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var drawer_1 = __webpack_require__(7);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._svgElementName = "rect";
        return _this;
    }
    Rectangle.prototype._drawStepCanvas = function (data, step) {
        var context = this.canvas().node().getContext("2d");
        var attrToAppliedProjector = step.attrToAppliedProjector;
        context.save();
        data.forEach(function (point, index) {
            var resolvedAttrs = Object.keys(attrToAppliedProjector).reduce(function (obj, attrName) {
                obj[attrName] = attrToAppliedProjector[attrName](point, index);
                return obj;
            }, {});
            context.beginPath();
            context.rect(resolvedAttrs["x"], resolvedAttrs["y"], resolvedAttrs["width"], resolvedAttrs["height"]);
            if (resolvedAttrs["stroke-width"]) {
                context.lineWidth = resolvedAttrs["stroke-width"];
            }
            if (resolvedAttrs["stroke"]) {
                var strokeColor = d3.color(resolvedAttrs["stroke"]);
                if (resolvedAttrs["opacity"]) {
                    strokeColor.opacity = resolvedAttrs["opacity"];
                }
                context.strokeStyle = strokeColor.rgb().toString();
                context.stroke();
            }
            if (resolvedAttrs["fill"]) {
                var fillColor = d3.color(resolvedAttrs["fill"]);
                if (resolvedAttrs["opacity"]) {
                    fillColor.opacity = resolvedAttrs["opacity"];
                }
                context.fillStyle = fillColor.rgb().toString();
                context.fill();
            }
        });
        context.restore();
    };
    return Rectangle;
}(drawer_1.Drawer));
exports.Rectangle = Rectangle;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = __webpack_require__(7);
var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._svgElementName = "line";
        return _this;
    }
    return Segment;
}(drawer_1.Drawer));
exports.Segment = Segment;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = __webpack_require__(7);
var Symbol = (function (_super) {
    __extends(Symbol, _super);
    function Symbol(dataset) {
        var _this = _super.call(this, dataset) || this;
        _this._svgElementName = "path";
        _this._className = "symbol";
        return _this;
    }
    return Symbol;
}(drawer_1.Drawer));
exports.Symbol = Symbol;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dispatchers = __webpack_require__(12);
var Utils = __webpack_require__(0);
var interaction_1 = __webpack_require__(14);
var Click = (function (_super) {
    __extends(Click, _super);
    function Click() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickedDown = false;
        _this._doubleClicking = false;
        _this._onClickCallbacks = new Utils.CallbackSet();
        _this._onDoubleClickCallbacks = new Utils.CallbackSet();
        /**
         * Note: we bind to mousedown, mouseup, touchstart and touchend because browsers
         * have a 300ms delay between touchstart and click to allow for scrolling cancelling etc.
         */
        _this._mouseDownCallback = function (p, event) { return _this._handleClickDown(p, event); };
        _this._mouseUpCallback = function (p, event) { return _this._handleClickUp(p, event); };
        _this._dblClickCallback = function (p, event) { return _this._handleDblClick(p, event); };
        _this._touchStartCallback = function (ids, idToPoint, event) { return _this._handleClickDown(idToPoint[ids[0]], event); };
        _this._touchEndCallback = function (ids, idToPoint, event) { return _this._handleClickUp(idToPoint[ids[0]], event); };
        _this._touchCancelCallback = function (ids, idToPoint) { return _this._clickedDown = false; };
        return _this;
    }
    Click.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(component);
        this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
        this._mouseDispatcher.onDblClick(this._dblClickCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(component);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
        this._touchDispatcher.onTouchEnd(this._touchEndCallback);
        this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
    };
    Click.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
        this._mouseDispatcher.offDblClick(this._dblClickCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher.offTouchEnd(this._touchEndCallback);
        this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
        this._touchDispatcher = null;
    };
    Click.prototype._handleClickDown = function (p, event) {
        var translatedP = this._translateToComponentSpace(p);
        if (this._isInsideComponent(translatedP)) {
            this._clickedDown = true;
            this._clickedPoint = translatedP;
        }
    };
    Click.prototype._handleClickUp = function (p, event) {
        var _this = this;
        var translatedP = this._translateToComponentSpace(p);
        if (this._clickedDown && Click._pointsEqual(translatedP, this._clickedPoint)) {
            setTimeout(function () {
                if (!_this._doubleClicking) {
                    _this._onClickCallbacks.callCallbacks(translatedP, event);
                }
            }, 0);
        }
        this._clickedDown = false;
    };
    Click.prototype._handleDblClick = function (p, event) {
        var _this = this;
        var translatedP = this._translateToComponentSpace(p);
        this._doubleClicking = true;
        this._onDoubleClickCallbacks.callCallbacks(translatedP, event);
        setTimeout(function () { return _this._doubleClicking = false; }, 0);
    };
    Click._pointsEqual = function (p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
    };
    /**
     * Adds a callback to be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.onClick = function (callback) {
        this._onClickCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.offClick = function (callback) {
        this._onClickCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.onDoubleClick = function (callback) {
        this._onDoubleClickCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.offDoubleClick = function (callback) {
        this._onDoubleClickCallbacks.delete(callback);
        return this;
    };
    return Click;
}(interaction_1.Interaction));
exports.Click = Click;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dispatchers = __webpack_require__(12);
var Utils = __webpack_require__(0);
var interaction_1 = __webpack_require__(14);
var Drag = (function (_super) {
    __extends(Drag, _super);
    function Drag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dragging = false;
        _this._constrainedToComponent = true;
        _this._dragStartCallbacks = new Utils.CallbackSet();
        _this._dragCallbacks = new Utils.CallbackSet();
        _this._dragEndCallbacks = new Utils.CallbackSet();
        _this._mouseDownCallback = function (p, e) { return _this._startDrag(p, e); };
        _this._mouseMoveCallback = function (p, e) { return _this._doDrag(p, e); };
        _this._mouseUpCallback = function (p, e) { return _this._endDrag(p, e); };
        _this._touchStartCallback = function (ids, idToPoint, e) { return _this._startDrag(idToPoint[ids[0]], e); };
        _this._touchMoveCallback = function (ids, idToPoint, e) { return _this._doDrag(idToPoint[ids[0]], e); };
        _this._touchEndCallback = function (ids, idToPoint, e) { return _this._endDrag(idToPoint[ids[0]], e); };
        return _this;
    }
    Drag.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(this._componentAttachedTo);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
        this._touchDispatcher.onTouchMove(this._touchMoveCallback);
        this._touchDispatcher.onTouchEnd(this._touchEndCallback);
    };
    Drag.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher.offTouchMove(this._touchMoveCallback);
        this._touchDispatcher.offTouchEnd(this._touchEndCallback);
        this._touchDispatcher = null;
    };
    Drag.prototype._translateAndConstrain = function (p) {
        var translatedP = this._translateToComponentSpace(p);
        if (!this._constrainedToComponent) {
            return translatedP;
        }
        return {
            x: Utils.Math.clamp(translatedP.x, 0, this._componentAttachedTo.width()),
            y: Utils.Math.clamp(translatedP.y, 0, this._componentAttachedTo.height()),
        };
    };
    Drag.prototype._startDrag = function (point, event) {
        if (event instanceof MouseEvent && event.button !== 0) {
            return;
        }
        var translatedP = this._translateToComponentSpace(point);
        if (this._isInsideComponent(translatedP)) {
            event.preventDefault();
            this._dragging = true;
            this._dragOrigin = translatedP;
            this._dragStartCallbacks.callCallbacks(this._dragOrigin);
        }
    };
    Drag.prototype._doDrag = function (point, event) {
        if (this._dragging) {
            this._dragCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
        }
    };
    Drag.prototype._endDrag = function (point, event) {
        if (event instanceof MouseEvent && event.button !== 0) {
            return;
        }
        if (this._dragging) {
            this._dragging = false;
            this._dragEndCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
        }
    };
    Drag.prototype.constrainedToComponent = function (constrainedToComponent) {
        if (constrainedToComponent == null) {
            return this._constrainedToComponent;
        }
        this._constrainedToComponent = constrainedToComponent;
        return this;
    };
    /**
     * Adds a callback to be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDragStart = function (callback) {
        this._dragStartCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDragStart = function (callback) {
        this._dragStartCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDrag = function (callback) {
        this._dragCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDrag = function (callback) {
        this._dragCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDragEnd = function (callback) {
        this._dragEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDragEnd = function (callback) {
        this._dragEndCallbacks.delete(callback);
        return this;
    };
    return Drag;
}(interaction_1.Interaction));
exports.Drag = Drag;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Dispatchers = __webpack_require__(12);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var Interactions = __webpack_require__(13);
var interaction_1 = __webpack_require__(14);
/**
 * Performs a zoom transformation of the `value` argument scaled by the
 * `zoom` argument about the point defined by the `center` argument.
 */
function zoomAt(value, zoom, center) {
    return center - (center - value) * zoom;
}
exports.zoomAt = zoomAt;
var PanZoom = (function (_super) {
    __extends(PanZoom, _super);
    /**
     * A PanZoom Interaction updates the domains of an x-scale and/or a y-scale
     * in response to the user panning or zooming.
     *
     * @constructor
     * @param {TransformableScale} [xScale] The x-scale to update on panning/zooming.
     * @param {TransformableScale} [yScale] The y-scale to update on panning/zooming.
     */
    function PanZoom(xScale, yScale) {
        var _this = _super.call(this) || this;
        _this._wheelCallback = function (p, e) { return _this._handleWheelEvent(p, e); };
        _this._touchStartCallback = function (ids, idToPoint, e) { return _this._handleTouchStart(ids, idToPoint, e); };
        _this._touchMoveCallback = function (ids, idToPoint, e) { return _this._handlePinch(ids, idToPoint, e); };
        _this._touchEndCallback = function (ids, idToPoint, e) { return _this._handleTouchEnd(ids, idToPoint, e); };
        _this._touchCancelCallback = function (ids, idToPoint, e) { return _this._handleTouchEnd(ids, idToPoint, e); };
        _this._panEndCallbacks = new Utils.CallbackSet();
        _this._zoomEndCallbacks = new Utils.CallbackSet();
        _this._xScales = new Utils.Set();
        _this._yScales = new Utils.Set();
        _this._dragInteraction = new Interactions.Drag();
        _this._setupDragInteraction();
        _this._touchIds = d3.map();
        _this._minDomainExtents = new Utils.Map();
        _this._maxDomainExtents = new Utils.Map();
        _this._minDomainValues = new Utils.Map();
        _this._maxDomainValues = new Utils.Map();
        if (xScale != null) {
            _this.addXScale(xScale);
        }
        if (yScale != null) {
            _this.addYScale(yScale);
        }
        return _this;
    }
    /**
     * Pans the chart by a specified amount
     *
     * @param {Plottable.Point} [translateAmount] The amount by which to translate the x and y scales.
     */
    PanZoom.prototype.pan = function (translateAmount) {
        var _this = this;
        this.xScales().forEach(function (xScale) {
            xScale.pan(_this._constrainedTranslation(xScale, translateAmount.x));
        });
        this.yScales().forEach(function (yScale) {
            yScale.pan(_this._constrainedTranslation(yScale, translateAmount.y));
        });
    };
    /**
     * Zooms the chart by a specified amount around a specific point
     *
     * @param {number} [maginfyAmount] The percentage by which to zoom the x and y scale.
     * A value of 0.9 zooms in by 10%. A value of 1.1 zooms out by 10%. A value of 1 has
     * no effect.
     * @param {Plottable.Point} [centerValue] The center in pixels around which to zoom.
     * By default, `centerValue` is the center of the x and y range of each scale.
     */
    PanZoom.prototype.zoom = function (zoomAmount, centerValue) {
        this.xScales().forEach(function (xScale) {
            var range = xScale.range();
            var xCenter = centerValue === undefined
                ? (range[1] - range[0]) / 2
                : centerValue.x;
            xScale.zoom(zoomAmount, xCenter);
        });
        this.yScales().forEach(function (yScale) {
            var range = yScale.range();
            var yCenter = centerValue === undefined
                ? (range[1] - range[0]) / 2
                : centerValue.y;
            yScale.zoom(zoomAmount, yCenter);
        });
    };
    PanZoom.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._dragInteraction.attachTo(component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._mouseDispatcher.onWheel(this._wheelCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(this._componentAttachedTo);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
        this._touchDispatcher.onTouchMove(this._touchMoveCallback);
        this._touchDispatcher.onTouchEnd(this._touchEndCallback);
        this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
    };
    PanZoom.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offWheel(this._wheelCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher.offTouchMove(this._touchMoveCallback);
        this._touchDispatcher.offTouchEnd(this._touchEndCallback);
        this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
        this._touchDispatcher = null;
        this._dragInteraction.detachFrom(this._componentAttachedTo);
    };
    PanZoom.prototype._handleTouchStart = function (ids, idToPoint, e) {
        for (var i = 0; i < ids.length && this._touchIds.size() < 2; i++) {
            var id = ids[i];
            this._touchIds.set(id.toString(), this._translateToComponentSpace(idToPoint[id]));
        }
    };
    PanZoom.prototype._handlePinch = function (ids, idToPoint, e) {
        var _this = this;
        if (this._touchIds.size() < 2) {
            return;
        }
        var oldPoints = this._touchIds.values();
        if (!this._isInsideComponent(this._translateToComponentSpace(oldPoints[0])) || !this._isInsideComponent(this._translateToComponentSpace(oldPoints[1]))) {
            return;
        }
        var oldCornerDistance = PanZoom._pointDistance(oldPoints[0], oldPoints[1]);
        if (oldCornerDistance === 0) {
            return;
        }
        ids.forEach(function (id) {
            if (_this._touchIds.has(id.toString())) {
                _this._touchIds.set(id.toString(), _this._translateToComponentSpace(idToPoint[id]));
            }
        });
        var points = this._touchIds.values();
        var newCornerDistance = PanZoom._pointDistance(points[0], points[1]);
        if (newCornerDistance === 0) {
            return;
        }
        var magnifyAmount = oldCornerDistance / newCornerDistance;
        var normalizedPointDiffs = points.map(function (point, i) {
            return { x: (point.x - oldPoints[i].x) / magnifyAmount, y: (point.y - oldPoints[i].y) / magnifyAmount };
        });
        var oldCenterPoint = PanZoom.centerPoint(oldPoints[0], oldPoints[1]);
        var centerX = oldCenterPoint.x;
        var centerY = oldCenterPoint.y;
        this.xScales().forEach(function (xScale) {
            var constrained = _this._constrainedZoom(xScale, magnifyAmount, centerX);
            centerX = constrained.centerPoint;
            magnifyAmount = constrained.zoomAmount;
        });
        this.yScales().forEach(function (yScale) {
            var constrained = _this._constrainedZoom(yScale, magnifyAmount, centerY);
            centerY = constrained.centerPoint;
            magnifyAmount = constrained.zoomAmount;
        });
        var constrainedPoints = oldPoints.map(function (oldPoint, i) {
            return {
                x: normalizedPointDiffs[i].x * magnifyAmount + oldPoint.x,
                y: normalizedPointDiffs[i].y * magnifyAmount + oldPoint.y,
            };
        });
        var translateAmount = {
            x: centerX - ((constrainedPoints[0].x + constrainedPoints[1].x) / 2),
            y: centerY - ((constrainedPoints[0].y + constrainedPoints[1].y) / 2),
        };
        this.zoom(magnifyAmount, { x: centerX, y: centerY });
        this.pan(translateAmount);
    };
    PanZoom.centerPoint = function (point1, point2) {
        var leftX = Math.min(point1.x, point2.x);
        var rightX = Math.max(point1.x, point2.x);
        var topY = Math.min(point1.y, point2.y);
        var bottomY = Math.max(point1.y, point2.y);
        return { x: (leftX + rightX) / 2, y: (bottomY + topY) / 2 };
    };
    PanZoom._pointDistance = function (point1, point2) {
        var leftX = Math.min(point1.x, point2.x);
        var rightX = Math.max(point1.x, point2.x);
        var topY = Math.min(point1.y, point2.y);
        var bottomY = Math.max(point1.y, point2.y);
        return Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(bottomY - topY, 2));
    };
    PanZoom.prototype._handleTouchEnd = function (ids, idToPoint, e) {
        var _this = this;
        ids.forEach(function (id) {
            _this._touchIds.remove(id.toString());
        });
        if (this._touchIds.size() > 0) {
            this._zoomEndCallbacks.callCallbacks();
        }
    };
    PanZoom.prototype._handleWheelEvent = function (p, e) {
        var _this = this;
        var translatedP = this._translateToComponentSpace(p);
        if (this._isInsideComponent(translatedP)) {
            e.preventDefault();
            var deltaPixelAmount = e.deltaY * (e.deltaMode ? PanZoom._PIXELS_PER_LINE : 1);
            var zoomAmount_1 = Math.pow(2, deltaPixelAmount * .002);
            var centerX_1 = translatedP.x;
            var centerY_1 = translatedP.y;
            this.xScales().forEach(function (xScale) {
                var constrained = _this._constrainedZoom(xScale, zoomAmount_1, centerX_1);
                centerX_1 = constrained.centerPoint;
                zoomAmount_1 = constrained.zoomAmount;
            });
            this.yScales().forEach(function (yScale) {
                var constrained = _this._constrainedZoom(yScale, zoomAmount_1, centerY_1);
                centerY_1 = constrained.centerPoint;
                zoomAmount_1 = constrained.zoomAmount;
            });
            this.zoom(zoomAmount_1, { x: centerX_1, y: centerY_1 });
            this._zoomEndCallbacks.callCallbacks();
        }
    };
    /**
     * When scale ranges are reversed (i.e. range[1] < range[0]), we must alter the
     * the calculations we do in screen space to constrain pan and zoom. This method
     * returns `true` if the scale is reversed.
     */
    PanZoom.prototype._isRangeReversed = function (scale) {
        var range = scale.range();
        return range[1] < range[0];
    };
    PanZoom.prototype._constrainedZoom = function (scale, zoomAmount, centerPoint) {
        zoomAmount = this._constrainZoomExtents(scale, zoomAmount);
        return this._constrainZoomValues(scale, zoomAmount, centerPoint);
    };
    PanZoom.prototype._constrainZoomExtents = function (scale, zoomAmount) {
        var extentIncreasing = zoomAmount > 1;
        var boundingDomainExtent = extentIncreasing ? this.maxDomainExtent(scale) : this.minDomainExtent(scale);
        if (boundingDomainExtent == null) {
            return zoomAmount;
        }
        var _a = scale.getTransformationDomain(), scaleDomainMin = _a[0], scaleDomainMax = _a[1];
        var domainExtent = Math.abs(scaleDomainMax - scaleDomainMin);
        var compareF = extentIncreasing ? Math.min : Math.max;
        return compareF(zoomAmount, boundingDomainExtent / domainExtent);
    };
    PanZoom.prototype._constrainZoomValues = function (scale, zoomAmount, centerPoint) {
        // when zooming in, we don't have to worry about overflowing domain
        if (zoomAmount <= 1) {
            return { centerPoint: centerPoint, zoomAmount: zoomAmount };
        }
        var reversed = this._isRangeReversed(scale);
        var minDomain = this.minDomainValue(scale);
        var maxDomain = this.maxDomainValue(scale);
        // if no constraints set, we're done
        if (minDomain == null && maxDomain == null) {
            return { centerPoint: centerPoint, zoomAmount: zoomAmount };
        }
        var _a = scale.getTransformationDomain(), scaleDomainMin = _a[0], scaleDomainMax = _a[1];
        if (maxDomain != null) {
            // compute max range point if zoom applied
            var maxRange = scale.scaleTransformation(maxDomain);
            var currentMaxRange = scale.scaleTransformation(scaleDomainMax);
            var testMaxRange = zoomAt(currentMaxRange, zoomAmount, centerPoint);
            // move the center point to prevent max overflow, if necessary
            if (testMaxRange > maxRange != reversed) {
                centerPoint = this._getZoomCenterForTarget(currentMaxRange, zoomAmount, maxRange);
            }
        }
        if (minDomain != null) {
            // compute min range point if zoom applied
            var minRange = scale.scaleTransformation(minDomain);
            var currentMinRange = scale.scaleTransformation(scaleDomainMin);
            var testMinRange = zoomAt(currentMinRange, zoomAmount, centerPoint);
            // move the center point to prevent min overflow, if necessary
            if (testMinRange < minRange != reversed) {
                centerPoint = this._getZoomCenterForTarget(currentMinRange, zoomAmount, minRange);
            }
        }
        // add fallback to prevent overflowing both min and max
        if (maxDomain != null && maxDomain != null) {
            var maxRange = scale.scaleTransformation(maxDomain);
            var currentMaxRange = scale.scaleTransformation(scaleDomainMax);
            var testMaxRange = zoomAt(currentMaxRange, zoomAmount, centerPoint);
            var minRange = scale.scaleTransformation(minDomain);
            var currentMinRange = scale.scaleTransformation(scaleDomainMin);
            var testMinRange = zoomAt(currentMinRange, zoomAmount, centerPoint);
            // If we overflow both, use some algebra to solve for centerPoint and
            // zoomAmount that will make the domain match the min/max exactly.
            // Algebra brought to you by Wolfram Alpha.
            if (testMaxRange > maxRange != reversed || testMinRange < minRange != reversed) {
                var denominator = (currentMaxRange - currentMinRange + minRange - maxRange);
                if (denominator === 0) {
                    // In this case the domains already match, so just return no-op values.
                    centerPoint = (currentMaxRange + currentMinRange) / 2;
                    zoomAmount = 1;
                }
                else {
                    centerPoint = (currentMaxRange * minRange - currentMinRange * maxRange) / denominator;
                    zoomAmount = (maxRange - minRange) / (currentMaxRange - currentMinRange);
                }
            }
        }
        return { centerPoint: centerPoint, zoomAmount: zoomAmount };
    };
    /**
     * Returns the `center` value to be used with `zoomAt` that will produce the
     * `target` value given the same `value` and `zoom` arguments. Algebra
     * brought to you by Wolfram Alpha.
     */
    PanZoom.prototype._getZoomCenterForTarget = function (value, zoom, target) {
        return (value * zoom - target) / (zoom - 1);
    };
    PanZoom.prototype._setupDragInteraction = function () {
        var _this = this;
        this._dragInteraction.constrainedToComponent(false);
        var lastDragPoint;
        this._dragInteraction.onDragStart(function () { return lastDragPoint = null; });
        this._dragInteraction.onDrag(function (startPoint, endPoint) {
            if (_this._touchIds.size() >= 2) {
                return;
            }
            var translateAmount = {
                x: (lastDragPoint == null ? startPoint.x : lastDragPoint.x) - endPoint.x,
                y: (lastDragPoint == null ? startPoint.y : lastDragPoint.y) - endPoint.y,
            };
            _this.pan(translateAmount);
            lastDragPoint = endPoint;
        });
        this._dragInteraction.onDragEnd(function () { return _this._panEndCallbacks.callCallbacks(); });
    };
    /**
     * Returns a new translation value that respects domain min/max value
     * constraints.
     */
    PanZoom.prototype._constrainedTranslation = function (scale, translation) {
        var _a = scale.getTransformationDomain(), scaleDomainMin = _a[0], scaleDomainMax = _a[1];
        var reversed = this._isRangeReversed(scale);
        if (translation > 0 !== reversed) {
            var bound = this.maxDomainValue(scale);
            if (bound != null) {
                var currentMaxRange = scale.scaleTransformation(scaleDomainMax);
                var maxRange = scale.scaleTransformation(bound);
                translation = (reversed ? Math.max : Math.min)(currentMaxRange + translation, maxRange) - currentMaxRange;
            }
        }
        else {
            var bound = this.minDomainValue(scale);
            if (bound != null) {
                var currentMinRange = scale.scaleTransformation(scaleDomainMin);
                var minRange = scale.scaleTransformation(bound);
                translation = (reversed ? Math.min : Math.max)(currentMinRange + translation, minRange) - currentMinRange;
            }
        }
        return translation;
    };
    PanZoom.prototype._nonLinearScaleWithExtents = function (scale) {
        return this.minDomainExtent(scale) != null && this.maxDomainExtent(scale) != null && !(scale instanceof Scales.Linear) && !(scale instanceof Scales.Time);
    };
    PanZoom.prototype.xScales = function (xScales) {
        var _this = this;
        if (xScales == null) {
            var scales_1 = [];
            this._xScales.forEach(function (xScale) {
                scales_1.push(xScale);
            });
            return scales_1;
        }
        this._xScales = new Utils.Set();
        xScales.forEach(function (xScale) {
            _this.addXScale(xScale);
        });
        return this;
    };
    PanZoom.prototype.yScales = function (yScales) {
        var _this = this;
        if (yScales == null) {
            var scales_2 = [];
            this._yScales.forEach(function (yScale) {
                scales_2.push(yScale);
            });
            return scales_2;
        }
        this._yScales = new Utils.Set();
        yScales.forEach(function (yScale) {
            _this.addYScale(yScale);
        });
        return this;
    };
    /**
     * Adds an x scale to this PanZoom Interaction
     *
     * @param {TransformableScale} An x scale to add
     * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
     */
    PanZoom.prototype.addXScale = function (xScale) {
        this._xScales.add(xScale);
        return this;
    };
    /**
     * Removes an x scale from this PanZoom Interaction
     *
     * @param {TransformableScale} An x scale to remove
     * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
     */
    PanZoom.prototype.removeXScale = function (xScale) {
        this._xScales.delete(xScale);
        this._minDomainExtents.delete(xScale);
        this._maxDomainExtents.delete(xScale);
        this._minDomainValues.delete(xScale);
        this._maxDomainValues.delete(xScale);
        return this;
    };
    /**
     * Adds a y scale to this PanZoom Interaction
     *
     * @param {TransformableScale} A y scale to add
     * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
     */
    PanZoom.prototype.addYScale = function (yScale) {
        this._yScales.add(yScale);
        return this;
    };
    /**
     * Removes a y scale from this PanZoom Interaction
     *
     * @param {TransformableScale} A y scale to remove
     * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
     */
    PanZoom.prototype.removeYScale = function (yScale) {
        this._yScales.delete(yScale);
        this._minDomainExtents.delete(yScale);
        this._maxDomainExtents.delete(yScale);
        this._minDomainValues.delete(yScale);
        this._maxDomainValues.delete(yScale);
        return this;
    };
    PanZoom.prototype.minDomainExtent = function (scale, minDomainExtent) {
        if (minDomainExtent == null) {
            return this._minDomainExtents.get(scale);
        }
        if (minDomainExtent.valueOf() < 0) {
            throw new Error("extent must be non-negative");
        }
        var maxExtentForScale = this.maxDomainExtent(scale);
        if (maxExtentForScale != null && maxExtentForScale.valueOf() < minDomainExtent.valueOf()) {
            throw new Error("minDomainExtent must be smaller than maxDomainExtent for the same Scale");
        }
        if (this._nonLinearScaleWithExtents(scale)) {
            Utils.Window.warn("Panning and zooming with extents on a nonlinear scale may have unintended behavior.");
        }
        this._minDomainExtents.set(scale, minDomainExtent);
        return this;
    };
    PanZoom.prototype.maxDomainExtent = function (scale, maxDomainExtent) {
        if (maxDomainExtent == null) {
            return this._maxDomainExtents.get(scale);
        }
        if (maxDomainExtent.valueOf() <= 0) {
            throw new Error("extent must be positive");
        }
        var minExtentForScale = this.minDomainExtent(scale);
        if (minExtentForScale != null && maxDomainExtent.valueOf() < minExtentForScale.valueOf()) {
            throw new Error("maxDomainExtent must be larger than minDomainExtent for the same Scale");
        }
        if (this._nonLinearScaleWithExtents(scale)) {
            Utils.Window.warn("Panning and zooming with extents on a nonlinear scale may have unintended behavior.");
        }
        this._maxDomainExtents.set(scale, maxDomainExtent);
        return this;
    };
    PanZoom.prototype.minDomainValue = function (scale, minDomainValue) {
        if (minDomainValue == null) {
            return this._minDomainValues.get(scale);
        }
        this._minDomainValues.set(scale, minDomainValue);
        return this;
    };
    PanZoom.prototype.maxDomainValue = function (scale, maxDomainValue) {
        if (maxDomainValue == null) {
            return this._maxDomainValues.get(scale);
        }
        this._maxDomainValues.set(scale, maxDomainValue);
        return this;
    };
    /**
     * Uses the current domain of the scale to apply a minimum and maximum
     * domain value for that scale.
     *
     * This constrains the pan/zoom interaction to show no more than the domain
     * of the scale.
     */
    PanZoom.prototype.setMinMaxDomainValuesTo = function (scale) {
        this._minDomainValues.delete(scale);
        this._maxDomainValues.delete(scale);
        var _a = scale.getTransformationDomain(), domainMin = _a[0], domainMax = _a[1];
        this.minDomainValue(scale, domainMin);
        this.maxDomainValue(scale, domainMax);
        return this;
    };
    /**
     * Adds a callback to be called when panning ends.
     *
     * @param {PanCallback} callback
     * @returns {this} The calling PanZoom Interaction.
     */
    PanZoom.prototype.onPanEnd = function (callback) {
        this._panEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when panning ends.
     *
     * @param {PanCallback} callback
     * @returns {this} The calling PanZoom Interaction.
     */
    PanZoom.prototype.offPanEnd = function (callback) {
        this._panEndCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when zooming ends.
     *
     * @param {ZoomCallback} callback
     * @returns {this} The calling PanZoom Interaction.
     */
    PanZoom.prototype.onZoomEnd = function (callback) {
        this._zoomEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when zooming ends.
     *
     * @param {ZoomCallback} callback
     * @returns {this} The calling PanZoom Interaction.
     */
    PanZoom.prototype.offZoomEnd = function (callback) {
        this._zoomEndCallbacks.delete(callback);
        return this;
    };
    return PanZoom;
}(interaction_1.Interaction));
/**
 * The number of pixels occupied in a line.
 */
PanZoom._PIXELS_PER_LINE = 120;
exports.PanZoom = PanZoom;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dispatchers = __webpack_require__(12);
var Utils = __webpack_require__(0);
var interaction_1 = __webpack_require__(14);
var Pointer = (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._overComponent = false;
        _this._pointerEnterCallbacks = new Utils.CallbackSet();
        _this._pointerMoveCallbacks = new Utils.CallbackSet();
        _this._pointerExitCallbacks = new Utils.CallbackSet();
        _this._mouseMoveCallback = function (p, e) { return _this._handleMouseEvent(p, e); };
        _this._touchStartCallback = function (ids, idToPoint, e) { return _this._handleTouchEvent(idToPoint[ids[0]], e); };
        return _this;
    }
    Pointer.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(this._componentAttachedTo);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
    };
    Pointer.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher = null;
    };
    Pointer.prototype._handleMouseEvent = function (p, e) {
        var insideSVG = this._mouseDispatcher.eventInside(this._componentAttachedTo, e);
        this._handlePointerEvent(p, insideSVG);
    };
    Pointer.prototype._handleTouchEvent = function (p, e) {
        var insideSVG = this._touchDispatcher.eventInside(this._componentAttachedTo, e);
        this._handlePointerEvent(p, insideSVG);
    };
    Pointer.prototype._handlePointerEvent = function (p, insideSVG) {
        var translatedP = this._translateToComponentSpace(p);
        var overComponent = this._isInsideComponent(translatedP);
        if (overComponent && insideSVG) {
            if (!this._overComponent) {
                this._pointerEnterCallbacks.callCallbacks(translatedP);
            }
            this._pointerMoveCallbacks.callCallbacks(translatedP);
        }
        else if (this._overComponent) {
            this._pointerExitCallbacks.callCallbacks(translatedP);
        }
        this._overComponent = overComponent && insideSVG;
    };
    /**
     * Adds a callback to be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerEnter = function (callback) {
        this._pointerEnterCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerEnter = function (callback) {
        this._pointerEnterCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerMove = function (callback) {
        this._pointerMoveCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerMove = function (callback) {
        this._pointerMoveCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerExit = function (callback) {
        this._pointerExitCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerExit = function (callback) {
        this._pointerExitCallbacks.delete(callback);
        return this;
    };
    return Pointer;
}(interaction_1.Interaction));
exports.Pointer = Pointer;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var barPlot_1 = __webpack_require__(22);
var plot_1 = __webpack_require__(2);
var ClusteredBar = (function (_super) {
    __extends(ClusteredBar, _super);
    /**
     * A ClusteredBar Plot groups bars across Datasets based on the primary value of the bars.
     *   On a vertical ClusteredBar Plot, the bars with the same X value are grouped.
     *   On a horizontal ClusteredBar Plot, the bars with the same Y value are grouped.
     *
     * @constructor
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    function ClusteredBar(orientation) {
        if (orientation === void 0) { orientation = "vertical"; }
        var _this = _super.call(this, orientation) || this;
        _this._clusterOffsets = new Utils.Map();
        return _this;
    }
    ClusteredBar.prototype._generateAttrToProjector = function () {
        var _this = this;
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        // the width is constant, so set the inner scale range to that
        var innerScale = this._makeInnerScale();
        var innerWidthF = function (d, i) { return innerScale.rangeBand(); };
        attrToProjector["width"] = this._isVertical ? innerWidthF : attrToProjector["width"];
        attrToProjector["height"] = !this._isVertical ? innerWidthF : attrToProjector["height"];
        var xAttr = attrToProjector["x"];
        var yAttr = attrToProjector["y"];
        attrToProjector["x"] = this._isVertical ?
            function (d, i, ds) { return xAttr(d, i, ds) + _this._clusterOffsets.get(ds); } :
            function (d, i, ds) { return xAttr(d, i, ds); };
        attrToProjector["y"] = this._isVertical ?
            function (d, i, ds) { return yAttr(d, i, ds); } :
            function (d, i, ds) { return yAttr(d, i, ds) + _this._clusterOffsets.get(ds); };
        return attrToProjector;
    };
    ClusteredBar.prototype._updateClusterPosition = function () {
        var _this = this;
        var innerScale = this._makeInnerScale();
        this.datasets().forEach(function (d, i) { return _this._clusterOffsets.set(d, innerScale.scale(String(i)) - innerScale.rangeBand() / 2); });
    };
    ClusteredBar.prototype._makeInnerScale = function () {
        var innerScale = new Scales.Category();
        innerScale.domain(this.datasets().map(function (d, i) { return String(i); }));
        var widthProjector = plot_1.Plot._scaledAccessor(this.attr("width"));
        innerScale.range([0, widthProjector(null, 0, null)]);
        return innerScale;
    };
    ClusteredBar.prototype._getDataToDraw = function () {
        this._updateClusterPosition();
        return _super.prototype._getDataToDraw.call(this);
    };
    return ClusteredBar;
}(barPlot_1.Bar));
exports.ClusteredBar = ClusteredBar;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Animators = __webpack_require__(6);
var Formatters = __webpack_require__(8);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var plot_1 = __webpack_require__(2);
var Pie = (function (_super) {
    __extends(Pie, _super);
    /**
     * @constructor
     */
    function Pie() {
        var _this = _super.call(this) || this;
        _this._startAngle = 0;
        _this._endAngle = 2 * Math.PI;
        _this._labelFormatter = Formatters.identity();
        _this._labelsEnabled = false;
        _this.innerRadius(0);
        _this.outerRadius(function () {
            var pieCenter = _this._pieCenter();
            return Math.min(Math.max(_this.width() - pieCenter.x, pieCenter.x), Math.max(_this.height() - pieCenter.y, pieCenter.y));
        });
        _this.addClass("pie-plot");
        _this.attr("fill", function (d, i) { return String(i); }, new Scales.Color());
        _this._strokeDrawers = new Utils.Map();
        return _this;
    }
    Pie.prototype._setup = function () {
        var _this = this;
        _super.prototype._setup.call(this);
        this._strokeDrawers.forEach(function (d) { return d.renderArea(_this._renderArea.append("g")); });
    };
    Pie.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        var pieCenter = this._pieCenter();
        this._renderArea.attr("transform", "translate(" + pieCenter.x + "," + pieCenter.y + ")");
        var radiusLimit = Math.min(Math.max(this.width() - pieCenter.x, pieCenter.x), Math.max(this.height() - pieCenter.y, pieCenter.y));
        if (this.innerRadius().scale != null) {
            this.innerRadius().scale.range([0, radiusLimit]);
        }
        if (this.outerRadius().scale != null) {
            this.outerRadius().scale.range([0, radiusLimit]);
        }
        return this;
    };
    Pie.prototype.addDataset = function (dataset) {
        _super.prototype.addDataset.call(this, dataset);
        return this;
    };
    Pie.prototype._addDataset = function (dataset) {
        if (this.datasets().length === 1) {
            Utils.Window.warn("Only one dataset is supported in Pie plots");
            return this;
        }
        this._updatePieAngles();
        var strokeDrawer = new Drawers.ArcOutline(dataset);
        if (this._isSetup) {
            strokeDrawer.renderArea(this._renderArea.append("g"));
        }
        this._strokeDrawers.set(dataset, strokeDrawer);
        _super.prototype._addDataset.call(this, dataset);
        return this;
    };
    Pie.prototype.removeDataset = function (dataset) {
        _super.prototype.removeDataset.call(this, dataset);
        return this;
    };
    Pie.prototype._removeDatasetNodes = function (dataset) {
        _super.prototype._removeDatasetNodes.call(this, dataset);
        this._strokeDrawers.get(dataset).remove();
    };
    Pie.prototype._removeDataset = function (dataset) {
        _super.prototype._removeDataset.call(this, dataset);
        this._startAngles = [];
        this._endAngles = [];
        return this;
    };
    Pie.prototype.selections = function (datasets) {
        var _this = this;
        if (datasets === void 0) { datasets = this.datasets(); }
        var allSelections = _super.prototype.selections.call(this, datasets).nodes();
        datasets.forEach(function (dataset) {
            var drawer = _this._strokeDrawers.get(dataset);
            if (drawer == null) {
                return;
            }
            drawer.renderArea().selectAll(drawer.selector()).each(function () {
                allSelections.push(this);
            });
        });
        return d3.selectAll(allSelections);
    };
    Pie.prototype._onDatasetUpdate = function () {
        _super.prototype._onDatasetUpdate.call(this);
        this._updatePieAngles();
        this.render();
    };
    Pie.prototype._createDrawer = function (dataset) {
        return new Drawers.Arc(dataset);
    };
    Pie.prototype.entities = function (datasets) {
        var _this = this;
        if (datasets === void 0) { datasets = this.datasets(); }
        var entities = _super.prototype.entities.call(this, datasets);
        return entities.map(function (entity) {
            entity.position.x += _this.width() / 2;
            entity.position.y += _this.height() / 2;
            var stroke = _this._strokeDrawers.get(entity.dataset).selectionForIndex(entity.index);
            var piePlotEntity = entity;
            piePlotEntity.strokeSelection = stroke;
            return piePlotEntity;
        });
    };
    Pie.prototype.sectorValue = function (sectorValue, scale) {
        if (sectorValue == null) {
            return this._propertyBindings.get(Pie._SECTOR_VALUE_KEY);
        }
        this._bindProperty(Pie._SECTOR_VALUE_KEY, sectorValue, scale);
        this._updatePieAngles();
        this.render();
        return this;
    };
    Pie.prototype.innerRadius = function (innerRadius, scale) {
        if (innerRadius == null) {
            return this._propertyBindings.get(Pie._INNER_RADIUS_KEY);
        }
        this._bindProperty(Pie._INNER_RADIUS_KEY, innerRadius, scale);
        this.render();
        return this;
    };
    Pie.prototype.outerRadius = function (outerRadius, scale) {
        if (outerRadius == null) {
            return this._propertyBindings.get(Pie._OUTER_RADIUS_KEY);
        }
        this._bindProperty(Pie._OUTER_RADIUS_KEY, outerRadius, scale);
        this.render();
        return this;
    };
    Pie.prototype.startAngle = function (angle) {
        if (angle == null) {
            return this._startAngle;
        }
        else {
            this._startAngle = angle;
            this._updatePieAngles();
            this.render();
            return this;
        }
    };
    Pie.prototype.endAngle = function (angle) {
        if (angle == null) {
            return this._endAngle;
        }
        else {
            this._endAngle = angle;
            this._updatePieAngles();
            this.render();
            return this;
        }
    };
    Pie.prototype.labelsEnabled = function (enabled) {
        if (enabled == null) {
            return this._labelsEnabled;
        }
        else {
            this._labelsEnabled = enabled;
            this.render();
            return this;
        }
    };
    Pie.prototype.labelFormatter = function (formatter) {
        if (formatter == null) {
            return this._labelFormatter;
        }
        else {
            this._labelFormatter = formatter;
            this.render();
            return this;
        }
    };
    /*
     * Gets the Entities at a particular Point.
     *
     * @param {Point} p
     * @param {PlotEntity[]}
     */
    Pie.prototype.entitiesAt = function (queryPoint) {
        var center = { x: this.width() / 2, y: this.height() / 2 };
        var adjustedQueryPoint = { x: queryPoint.x - center.x, y: queryPoint.y - center.y };
        var index = this._sliceIndexForPoint(adjustedQueryPoint);
        return index == null ? [] : [this.entities()[index]];
    };
    Pie.prototype._propertyProjectors = function () {
        var _this = this;
        var attrToProjector = _super.prototype._propertyProjectors.call(this);
        var innerRadiusAccessor = plot_1.Plot._scaledAccessor(this.innerRadius());
        var outerRadiusAccessor = plot_1.Plot._scaledAccessor(this.outerRadius());
        attrToProjector["d"] = function (datum, index, ds) {
            return d3.arc().innerRadius(innerRadiusAccessor(datum, index, ds))
                .outerRadius(outerRadiusAccessor(datum, index, ds))
                .startAngle(_this._startAngles[index])
                .endAngle(_this._endAngles[index])(datum, index);
        };
        return attrToProjector;
    };
    Pie.prototype._updatePieAngles = function () {
        if (this.sectorValue() == null) {
            return;
        }
        if (this.datasets().length === 0) {
            return;
        }
        var sectorValueAccessor = plot_1.Plot._scaledAccessor(this.sectorValue());
        var dataset = this.datasets()[0];
        var data = this._getDataToDraw().get(dataset);
        var pie = d3.pie().sort(null).startAngle(this._startAngle).endAngle(this._endAngle)
            .value(function (d, i) { return sectorValueAccessor(d, i, dataset); })(data);
        this._startAngles = pie.map(function (slice) { return slice.startAngle; });
        this._endAngles = pie.map(function (slice) { return slice.endAngle; });
    };
    Pie.prototype._pieCenter = function () {
        var a = this._startAngle < this._endAngle ? this._startAngle : this._endAngle;
        var b = this._startAngle < this._endAngle ? this._endAngle : this._startAngle;
        var sinA = Math.sin(a);
        var cosA = Math.cos(a);
        var sinB = Math.sin(b);
        var cosB = Math.cos(b);
        var hTop;
        var hBottom;
        var wRight;
        var wLeft;
        /**
         *  The center of the pie is computed using the sine and cosine of the start angle and the end angle
         *  The sine indicates whether the start and end fall on the right half or the left half of the pie
         *  The cosine indicates whether the start and end fall on the top or the bottom half of the pie
         *  Different combinations provide the different heights and widths the pie needs from the center to the sides
         */
        if (sinA >= 0 && sinB >= 0) {
            if (cosA >= 0 && cosB >= 0) {
                hTop = cosA;
                hBottom = 0;
                wLeft = 0;
                wRight = sinB;
            }
            else if (cosA < 0 && cosB < 0) {
                hTop = 0;
                hBottom = -cosB;
                wLeft = 0;
                wRight = sinA;
            }
            else if (cosA >= 0 && cosB < 0) {
                hTop = cosA;
                hBottom = -cosB;
                wLeft = 0;
                wRight = sinA;
            }
            else if (cosA < 0 && cosB >= 0) {
                hTop = 1;
                hBottom = 1;
                wLeft = 1;
                wRight = Math.max(sinA, sinB);
            }
        }
        else if (sinA >= 0 && sinB < 0) {
            if (cosA >= 0 && cosB >= 0) {
                hTop = Math.max(cosA, cosB);
                hBottom = 1;
                wLeft = 1;
                wRight = 1;
            }
            else if (cosA < 0 && cosB < 0) {
                hTop = 0;
                hBottom = 1;
                wLeft = -sinB;
                wRight = sinA;
            }
            else if (cosA >= 0 && cosB < 0) {
                hTop = cosA;
                hBottom = 1;
                wLeft = -sinB;
                wRight = 1;
            }
            else if (cosA < 0 && cosB >= 0) {
                hTop = cosB;
                hBottom = 1;
                wLeft = 1;
                wRight = sinA;
            }
        }
        else if (sinA < 0 && sinB >= 0) {
            if (cosA >= 0 && cosB >= 0) {
                hTop = 1;
                hBottom = 0;
                wLeft = -sinA;
                wRight = sinB;
            }
            else if (cosA < 0 && cosB < 0) {
                hTop = 1;
                hBottom = Math.max(-cosA, -cosB);
                wLeft = 1;
                wRight = 1;
            }
            else if (cosA >= 0 && cosB < 0) {
                hTop = 1;
                hBottom = -cosB;
                wLeft = -sinA;
                wRight = 1;
            }
            else if (cosA < 0 && cosB >= 0) {
                hTop = 1;
                hBottom = -cosA;
                wLeft = 1;
                wRight = sinB;
            }
        }
        else if (sinA < 0 && sinB < 0) {
            if (cosA >= 0 && cosB >= 0) {
                hTop = cosB;
                hBottom = 0;
                wLeft = -sinA;
                wRight = 0;
            }
            else if (cosA < 0 && cosB < 0) {
                hTop = 0;
                hBottom = -cosA;
                wLeft = -sinB;
                wRight = 0;
            }
            else if (cosA >= 0 && cosB < 0) {
                hTop = 1;
                hBottom = 1;
                wLeft = Math.max(cosA, -cosB);
                wRight = 1;
            }
            else if (cosA < 0 && cosB >= 0) {
                hTop = cosB;
                hBottom = -cosA;
                wLeft = 1;
                wRight = 0;
            }
        }
        return {
            x: wLeft + wRight == 0 ? 0 : (wLeft / (wLeft + wRight)) * this.width(),
            y: hTop + hBottom == 0 ? 0 : (hTop / (hTop + hBottom)) * this.height(),
        };
    };
    Pie.prototype._getDataToDraw = function () {
        var dataToDraw = _super.prototype._getDataToDraw.call(this);
        if (this.datasets().length === 0) {
            return dataToDraw;
        }
        var sectorValueAccessor = plot_1.Plot._scaledAccessor(this.sectorValue());
        var ds = this.datasets()[0];
        var data = dataToDraw.get(ds);
        var filteredData = data.filter(function (d, i) { return Pie._isValidData(sectorValueAccessor(d, i, ds)); });
        dataToDraw.set(ds, filteredData);
        return dataToDraw;
    };
    Pie._isValidData = function (value) {
        return Utils.Math.isValidNumber(value) && value >= 0;
    };
    Pie.prototype._pixelPoint = function (datum, index, dataset) {
        var scaledValueAccessor = plot_1.Plot._scaledAccessor(this.sectorValue());
        if (!Pie._isValidData(scaledValueAccessor(datum, index, dataset))) {
            return { x: NaN, y: NaN };
        }
        var innerRadius = plot_1.Plot._scaledAccessor(this.innerRadius())(datum, index, dataset);
        var outerRadius = plot_1.Plot._scaledAccessor(this.outerRadius())(datum, index, dataset);
        var avgRadius = (innerRadius + outerRadius) / 2;
        var pie = d3.pie()
            .sort(null)
            .value(function (d, i) {
            var value = scaledValueAccessor(d, i, dataset);
            return Pie._isValidData(value) ? value : 0;
        }).startAngle(this._startAngle).endAngle(this._endAngle)(dataset.data());
        var startAngle = pie[index].startAngle;
        var endAngle = pie[index].endAngle;
        var avgAngle = (startAngle + endAngle) / 2;
        return { x: avgRadius * Math.sin(avgAngle), y: -avgRadius * Math.cos(avgAngle) };
    };
    Pie.prototype._additionalPaint = function (time) {
        var _this = this;
        this._renderArea.select(".label-area").remove();
        if (this._labelsEnabled) {
            Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
        }
        var drawSteps = this._generateStrokeDrawSteps();
        var dataToDraw = this._getDataToDraw();
        this.datasets().forEach(function (dataset) { return _this._strokeDrawers.get(dataset).draw(dataToDraw.get(dataset), drawSteps); });
    };
    Pie.prototype._generateStrokeDrawSteps = function () {
        var attrToProjector = this._generateAttrToProjector();
        return [{ attrToProjector: attrToProjector, animator: new Animators.Null() }];
    };
    Pie.prototype._sliceIndexForPoint = function (p) {
        var pointRadius = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
        var pointAngle = Math.acos(-p.y / pointRadius);
        if (p.x < 0) {
            pointAngle = Math.PI * 2 - pointAngle;
        }
        var index;
        for (var i = 0; i < this._startAngles.length; i++) {
            if (this._startAngles[i] < pointAngle && this._endAngles[i] > pointAngle) {
                index = i;
                break;
            }
        }
        if (index !== undefined) {
            var dataset = this.datasets()[0];
            var datum = dataset.data()[index];
            var innerRadius = this.innerRadius().accessor(datum, index, dataset);
            var outerRadius = this.outerRadius().accessor(datum, index, dataset);
            if (pointRadius > innerRadius && pointRadius < outerRadius) {
                return index;
            }
        }
        return null;
    };
    Pie.prototype._drawLabels = function () {
        var _this = this;
        var attrToProjector = this._generateAttrToProjector();
        var labelArea = this._renderArea.append("g").classed("label-area", true);
        var context = new Typesetter.SvgContext(labelArea.node());
        var measurer = new Typesetter.CacheMeasurer(context);
        var writer = new Typesetter.Writer(measurer, context);
        var dataset = this.datasets()[0];
        var data = this._getDataToDraw().get(dataset);
        data.forEach(function (datum, datumIndex) {
            var value = _this.sectorValue().accessor(datum, datumIndex, dataset);
            if (!Utils.Math.isValidNumber(value)) {
                return;
            }
            value = _this._labelFormatter(value);
            var measurement = measurer.measure(value);
            var theta = (_this._endAngles[datumIndex] + _this._startAngles[datumIndex]) / 2;
            var outerRadius = _this.outerRadius().accessor(datum, datumIndex, dataset);
            if (_this.outerRadius().scale) {
                outerRadius = _this.outerRadius().scale.scale(outerRadius);
            }
            var innerRadius = _this.innerRadius().accessor(datum, datumIndex, dataset);
            if (_this.innerRadius().scale) {
                innerRadius = _this.innerRadius().scale.scale(innerRadius);
            }
            var labelRadius = (outerRadius + innerRadius) / 2;
            var x = Math.sin(theta) * labelRadius - measurement.width / 2;
            var y = -Math.cos(theta) * labelRadius - measurement.height / 2;
            var corners = [
                { x: x, y: y },
                { x: x, y: y + measurement.height },
                { x: x + measurement.width, y: y },
                { x: x + measurement.width, y: y + measurement.height },
            ];
            var showLabel = corners.every(function (corner) {
                return Math.abs(corner.x) <= _this.width() / 2 && Math.abs(corner.y) <= _this.height() / 2;
            });
            if (showLabel) {
                var sliceIndices = corners.map(function (corner) { return _this._sliceIndexForPoint(corner); });
                showLabel = sliceIndices.every(function (index) { return index === datumIndex; });
            }
            var color = attrToProjector["fill"](datum, datumIndex, dataset);
            var dark = Utils.Color.contrast("white", color) * 1.6 < Utils.Color.contrast("black", color);
            var g = labelArea.append("g").attr("transform", "translate(" + x + "," + y + ")");
            var className = dark ? "dark-label" : "light-label";
            g.classed(className, true);
            g.style("visibility", showLabel ? "inherit" : "hidden");
            writer.write(value, measurement.width, measurement.height, {
                xAlign: "center",
                yAlign: "center",
            }, g.node());
        });
    };
    return Pie;
}(plot_1.Plot));
Pie._INNER_RADIUS_KEY = "inner-radius";
Pie._OUTER_RADIUS_KEY = "outer-radius";
Pie._SECTOR_VALUE_KEY = "sector-value";
exports.Pie = Pie;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Typesetter = __webpack_require__(4);
var Animators = __webpack_require__(6);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var plot_1 = __webpack_require__(2);
var xyPlot_1 = __webpack_require__(15);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    /**
     * A Rectangle Plot displays rectangles based on the data.
     * The left and right edges of each rectangle can be set with x() and x2().
     *   If only x() is set the Rectangle Plot will attempt to compute the correct left and right edge positions.
     * The top and bottom edges of each rectangle can be set with y() and y2().
     *   If only y() is set the Rectangle Plot will attempt to compute the correct top and bottom edge positions.
     *
     * @constructor
     * @param {Scale.Scale} xScale
     * @param {Scale.Scale} yScale
     */
    function Rectangle() {
        var _this = _super.call(this) || this;
        _this._labelsEnabled = false;
        _this._label = null;
        _this.animator("rectangles", new Animators.Null());
        _this.addClass("rectangle-plot");
        _this.attr("fill", new Scales.Color().range()[0]);
        return _this;
    }
    Rectangle.prototype._createDrawer = function (dataset) {
        return new Drawers.Rectangle(dataset);
    };
    Rectangle.prototype._generateAttrToProjector = function () {
        var _this = this;
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        // Copy each of the different projectors.
        var xAttr = plot_1.Plot._scaledAccessor(this.x());
        var x2Attr = attrToProjector[Rectangle._X2_KEY];
        var yAttr = plot_1.Plot._scaledAccessor(this.y());
        var y2Attr = attrToProjector[Rectangle._Y2_KEY];
        var xScale = this.x().scale;
        var yScale = this.y().scale;
        if (x2Attr != null) {
            attrToProjector["width"] = function (d, i, dataset) { return Math.abs(x2Attr(d, i, dataset) - xAttr(d, i, dataset)); };
            attrToProjector["x"] = function (d, i, dataset) { return Math.min(x2Attr(d, i, dataset), xAttr(d, i, dataset)); };
        }
        else {
            attrToProjector["width"] = function (d, i, dataset) { return _this._rectangleWidth(xScale); };
            attrToProjector["x"] = function (d, i, dataset) { return xAttr(d, i, dataset) - 0.5 * attrToProjector["width"](d, i, dataset); };
        }
        if (y2Attr != null) {
            attrToProjector["height"] = function (d, i, dataset) { return Math.abs(y2Attr(d, i, dataset) - yAttr(d, i, dataset)); };
            attrToProjector["y"] = function (d, i, dataset) {
                return Math.max(y2Attr(d, i, dataset), yAttr(d, i, dataset)) - attrToProjector["height"](d, i, dataset);
            };
        }
        else {
            attrToProjector["height"] = function (d, i, dataset) { return _this._rectangleWidth(yScale); };
            attrToProjector["y"] = function (d, i, dataset) { return yAttr(d, i, dataset) - 0.5 * attrToProjector["height"](d, i, dataset); };
        }
        // Clean up the attributes projected onto the SVG elements
        delete attrToProjector[Rectangle._X2_KEY];
        delete attrToProjector[Rectangle._Y2_KEY];
        return attrToProjector;
    };
    Rectangle.prototype._generateDrawSteps = function () {
        return [{ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("rectangles") }];
    };
    Rectangle.prototype._updateExtentsForProperty = function (property) {
        _super.prototype._updateExtentsForProperty.call(this, property);
        if (property === "x") {
            _super.prototype._updateExtentsForProperty.call(this, "x2");
        }
        else if (property === "y") {
            _super.prototype._updateExtentsForProperty.call(this, "y2");
        }
    };
    Rectangle.prototype._filterForProperty = function (property) {
        if (property === "x2") {
            return _super.prototype._filterForProperty.call(this, "x");
        }
        else if (property === "y2") {
            return _super.prototype._filterForProperty.call(this, "y");
        }
        return _super.prototype._filterForProperty.call(this, property);
    };
    Rectangle.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
        }
        if (xScale != null) {
            var x2Binding = this.x2();
            var x2 = x2Binding && x2Binding.accessor;
            if (x2 != null) {
                this._bindProperty(Rectangle._X2_KEY, x2, xScale);
            }
        }
        // The x and y scales should render in bands with no padding for category scales
        if (xScale instanceof Scales.Category) {
            xScale.innerPadding(0).outerPadding(0);
        }
        return this;
    };
    Rectangle.prototype.x2 = function (x2) {
        if (x2 == null) {
            return this._propertyBindings.get(Rectangle._X2_KEY);
        }
        var xBinding = this.x();
        var xScale = xBinding && xBinding.scale;
        this._bindProperty(Rectangle._X2_KEY, x2, xScale);
        this.render();
        return this;
    };
    Rectangle.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
        }
        if (yScale != null) {
            var y2Binding = this.y2();
            var y2 = y2Binding && y2Binding.accessor;
            if (y2 != null) {
                this._bindProperty(Rectangle._Y2_KEY, y2, yScale);
            }
        }
        // The x and y scales should render in bands with no padding for category scales
        if (yScale instanceof Scales.Category) {
            yScale.innerPadding(0).outerPadding(0);
        }
        return this;
    };
    Rectangle.prototype.y2 = function (y2) {
        if (y2 == null) {
            return this._propertyBindings.get(Rectangle._Y2_KEY);
        }
        var yBinding = this.y();
        var yScale = yBinding && yBinding.scale;
        this._bindProperty(Rectangle._Y2_KEY, y2, yScale);
        this.render();
        return this;
    };
    /**
     * Gets the PlotEntities at a particular Point.
     *
     * @param {Point} point The point to query.
     * @returns {PlotEntity[]} The PlotEntities at the particular point
     */
    Rectangle.prototype.entitiesAt = function (point) {
        var attrToProjector = this._generateAttrToProjector();
        return this.entities().filter(function (entity) {
            var datum = entity.datum;
            var index = entity.index;
            var dataset = entity.dataset;
            var x = attrToProjector["x"](datum, index, dataset);
            var y = attrToProjector["y"](datum, index, dataset);
            var width = attrToProjector["width"](datum, index, dataset);
            var height = attrToProjector["height"](datum, index, dataset);
            return x <= point.x && point.x <= x + width && y <= point.y && point.y <= y + height;
        });
    };
    Rectangle.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        return this._entitiesIntersecting(dataXRange, dataYRange);
    };
    Rectangle.prototype._entityBBox = function (datum, index, dataset, attrToProjector) {
        return {
            x: attrToProjector["x"](datum, index, dataset),
            y: attrToProjector["y"](datum, index, dataset),
            width: attrToProjector["width"](datum, index, dataset),
            height: attrToProjector["height"](datum, index, dataset),
        };
    };
    Rectangle.prototype._entitiesIntersecting = function (xValOrRange, yValOrRange) {
        var _this = this;
        var intersected = [];
        var attrToProjector = this._generateAttrToProjector();
        this.entities().forEach(function (entity) {
            if (Utils.DOM.intersectsBBox(xValOrRange, yValOrRange, _this._entityBBox(entity.datum, entity.index, entity.dataset, attrToProjector))) {
                intersected.push(entity);
            }
        });
        return intersected;
    };
    Rectangle.prototype.label = function (label) {
        if (label == null) {
            return this._label;
        }
        this._label = label;
        this.render();
        return this;
    };
    Rectangle.prototype.labelsEnabled = function (enabled) {
        if (enabled == null) {
            return this._labelsEnabled;
        }
        else {
            this._labelsEnabled = enabled;
            this.render();
            return this;
        }
    };
    Rectangle.prototype._propertyProjectors = function () {
        var attrToProjector = _super.prototype._propertyProjectors.call(this);
        if (this.x2() != null) {
            attrToProjector["x2"] = plot_1.Plot._scaledAccessor(this.x2());
        }
        if (this.y2() != null) {
            attrToProjector["y2"] = plot_1.Plot._scaledAccessor(this.y2());
        }
        return attrToProjector;
    };
    Rectangle.prototype._pixelPoint = function (datum, index, dataset) {
        var attrToProjector = this._generateAttrToProjector();
        var rectX = attrToProjector["x"](datum, index, dataset);
        var rectY = attrToProjector["y"](datum, index, dataset);
        var rectWidth = attrToProjector["width"](datum, index, dataset);
        var rectHeight = attrToProjector["height"](datum, index, dataset);
        var x = rectX + rectWidth / 2;
        var y = rectY + rectHeight / 2;
        return { x: x, y: y };
    };
    Rectangle.prototype._rectangleWidth = function (scale) {
        if (scale instanceof Scales.Category) {
            return scale.rangeBand();
        }
        else {
            var accessor_1 = scale === this.x().scale ? this.x().accessor : this.y().accessor;
            var accessorData = d3.set(Utils.Array.flatten(this.datasets().map(function (dataset) {
                return dataset.data().map(function (d, i) { return accessor_1(d, i, dataset).valueOf(); });
            }))).values().map(function (value) { return +value; });
            // Get the absolute difference between min and max
            var min = Utils.Math.min(accessorData, 0);
            var max = Utils.Math.max(accessorData, 0);
            var scaledMin = scale.scale(min);
            var scaledMax = scale.scale(max);
            return (scaledMax - scaledMin) / Math.abs(max - min);
        }
    };
    Rectangle.prototype._getDataToDraw = function () {
        var dataToDraw = new Utils.Map();
        var attrToProjector = this._generateAttrToProjector();
        this.datasets().forEach(function (dataset) {
            var data = dataset.data().filter(function (d, i) { return Utils.Math.isValidNumber(attrToProjector["x"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["y"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["width"](d, i, dataset)) &&
                Utils.Math.isValidNumber(attrToProjector["height"](d, i, dataset)); });
            dataToDraw.set(dataset, data);
        });
        return dataToDraw;
    };
    Rectangle.prototype._additionalPaint = function (time) {
        var _this = this;
        this._renderArea.selectAll(".label-area").remove();
        if (this._labelsEnabled && this.label() != null) {
            Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
        }
    };
    Rectangle.prototype._drawLabels = function () {
        var _this = this;
        var dataToDraw = this._getDataToDraw();
        this.datasets().forEach(function (dataset, i) { return _this._drawLabel(dataToDraw, dataset, i); });
    };
    Rectangle.prototype._drawLabel = function (dataToDraw, dataset, datasetIndex) {
        var _this = this;
        var attrToProjector = this._generateAttrToProjector();
        var labelArea = this._renderArea.append("g").classed("label-area", true);
        var context = new Typesetter.SvgContext(labelArea.node());
        var measurer = new Typesetter.CacheMeasurer(context);
        var writer = new Typesetter.Writer(measurer, context);
        var xRange = this.x().scale.range();
        var yRange = this.y().scale.range();
        var xMin = Math.min.apply(null, xRange);
        var xMax = Math.max.apply(null, xRange);
        var yMin = Math.min.apply(null, yRange);
        var yMax = Math.max.apply(null, yRange);
        var data = dataToDraw.get(dataset);
        data.forEach(function (datum, datumIndex) {
            var label = "" + _this.label()(datum, datumIndex, dataset);
            var measurement = measurer.measure(label);
            var x = attrToProjector["x"](datum, datumIndex, dataset);
            var y = attrToProjector["y"](datum, datumIndex, dataset);
            var width = attrToProjector["width"](datum, datumIndex, dataset);
            var height = attrToProjector["height"](datum, datumIndex, dataset);
            if (measurement.height <= height && measurement.width <= width) {
                var horizontalOffset = (width - measurement.width) / 2;
                var verticalOffset = (height - measurement.height) / 2;
                x += horizontalOffset;
                y += verticalOffset;
                var xLabelRange = { min: x, max: x + measurement.width };
                var yLabelRange = { min: y, max: y + measurement.height };
                if (xLabelRange.min < xMin || xLabelRange.max > xMax || yLabelRange.min < yMin || yLabelRange.max > yMax) {
                    return;
                }
                if (_this._overlayLabel(xLabelRange, yLabelRange, datumIndex, datasetIndex, dataToDraw)) {
                    return;
                }
                var color = attrToProjector["fill"](datum, datumIndex, dataset);
                var dark = Utils.Color.contrast("white", color) * 1.6 < Utils.Color.contrast("black", color);
                var g = labelArea.append("g").attr("transform", "translate(" + x + "," + y + ")");
                var className = dark ? "dark-label" : "light-label";
                g.classed(className, true);
                writer.write(label, measurement.width, measurement.height, {
                    xAlign: "center",
                    yAlign: "center",
                }, g.node());
            }
        });
    };
    Rectangle.prototype._overlayLabel = function (labelXRange, labelYRange, datumIndex, datasetIndex, dataToDraw) {
        var attrToProjector = this._generateAttrToProjector();
        var datasets = this.datasets();
        for (var i = datasetIndex; i < datasets.length; i++) {
            var dataset = datasets[i];
            var data = dataToDraw.get(dataset);
            for (var j = (i === datasetIndex ? datumIndex + 1 : 0); j < data.length; j++) {
                if (Utils.DOM.intersectsBBox(labelXRange, labelYRange, this._entityBBox(data[j], j, dataset, attrToProjector))) {
                    return true;
                }
            }
        }
        return false;
    };
    return Rectangle;
}(xyPlot_1.XYPlot));
Rectangle._X2_KEY = "x2";
Rectangle._Y2_KEY = "y2";
exports.Rectangle = Rectangle;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animators = __webpack_require__(6);
var SymbolFactories = __webpack_require__(26);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var Utils = __webpack_require__(0);
var Plots = __webpack_require__(16);
var plot_1 = __webpack_require__(2);
var xyPlot_1 = __webpack_require__(15);
var Scatter = (function (_super) {
    __extends(Scatter, _super);
    /**
     * A Scatter Plot draws a symbol at each data point.
     *
     * @constructor
     */
    function Scatter() {
        var _this = _super.call(this) || this;
        _this.addClass("scatter-plot");
        var animator = new Animators.Easing();
        animator.startDelay(5);
        animator.stepDuration(250);
        animator.maxTotalDuration(plot_1.Plot._ANIMATION_MAX_DURATION);
        _this.animator(Plots.Animator.MAIN, animator);
        _this.attr("opacity", 0.6);
        _this.attr("fill", new Scales.Color().range()[0]);
        _this.size(6);
        var circleSymbolFactory = SymbolFactories.circle();
        _this.symbol(function () { return circleSymbolFactory; });
        return _this;
    }
    Scatter.prototype._buildLightweightPlotEntities = function (datasets) {
        var _this = this;
        var lightweightPlotEntities = _super.prototype._buildLightweightPlotEntities.call(this, datasets);
        return lightweightPlotEntities.map(function (lightweightPlotEntity) {
            var diameter = plot_1.Plot._scaledAccessor(_this.size())(lightweightPlotEntity.datum, lightweightPlotEntity.index, lightweightPlotEntity.dataset);
            lightweightPlotEntity.diameter = diameter;
            return lightweightPlotEntity;
        });
    };
    Scatter.prototype._createDrawer = function (dataset) {
        return new Drawers.Symbol(dataset);
    };
    Scatter.prototype.size = function (size, scale) {
        if (size == null) {
            return this._propertyBindings.get(Scatter._SIZE_KEY);
        }
        this._bindProperty(Scatter._SIZE_KEY, size, scale);
        this.render();
        return this;
    };
    Scatter.prototype.symbol = function (symbol) {
        if (symbol == null) {
            return this._propertyBindings.get(Scatter._SYMBOL_KEY);
        }
        this._propertyBindings.set(Scatter._SYMBOL_KEY, { accessor: symbol });
        this.render();
        return this;
    };
    Scatter.prototype._generateDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var resetAttrToProjector = this._generateAttrToProjector();
            var symbolProjector_1 = plot_1.Plot._scaledAccessor(this.symbol());
            resetAttrToProjector["d"] = function (datum, index, dataset) { return symbolProjector_1(datum, index, dataset)(0); };
            drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Scatter.prototype._entityVisibleOnPlot = function (entity, bounds) {
        var xRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
        var yRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        var translatedBbox = {
            x: entity.position.x - entity.diameter,
            y: entity.position.y - entity.diameter,
            width: entity.diameter,
            height: entity.diameter,
        };
        return Utils.DOM.intersectsBBox(xRange, yRange, translatedBbox);
    };
    Scatter.prototype._propertyProjectors = function () {
        var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        var sizeProjector = plot_1.Plot._scaledAccessor(this.size());
        propertyToProjectors["transform"] = function (datum, index, dataset) {
            return "translate(" + xProjector(datum, index, dataset) + "," + yProjector(datum, index, dataset) + ")";
        };
        var symbolProjector = plot_1.Plot._scaledAccessor(this.symbol());
        propertyToProjectors["d"] = function (datum, index, dataset) {
            return symbolProjector(datum, index, dataset)(sizeProjector(datum, index, dataset));
        };
        return propertyToProjectors;
    };
    Scatter.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        return this.entities().filter(function (entity) {
            var datum = entity.datum;
            var index = entity.index;
            var dataset = entity.dataset;
            var x = xProjector(datum, index, dataset);
            var y = yProjector(datum, index, dataset);
            return dataXRange.min <= x && x <= dataXRange.max && dataYRange.min <= y && y <= dataYRange.max;
        });
    };
    /**
     * Gets the Entities at a particular Point.
     *
     * @param {Point} p
     * @returns {PlotEntity[]}
     */
    Scatter.prototype.entitiesAt = function (p) {
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        var sizeProjector = plot_1.Plot._scaledAccessor(this.size());
        return this.entities().filter(function (entity) {
            var datum = entity.datum;
            var index = entity.index;
            var dataset = entity.dataset;
            var x = xProjector(datum, index, dataset);
            var y = yProjector(datum, index, dataset);
            var size = sizeProjector(datum, index, dataset);
            return x - size / 2 <= p.x && p.x <= x + size / 2 && y - size / 2 <= p.y && p.y <= y + size / 2;
        });
    };
    return Scatter;
}(xyPlot_1.XYPlot));
Scatter._SIZE_KEY = "size";
Scatter._SYMBOL_KEY = "symbol";
exports.Scatter = Scatter;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animators = __webpack_require__(6);
var Drawers = __webpack_require__(9);
var Scales = __webpack_require__(3);
var plot_1 = __webpack_require__(2);
var xyPlot_1 = __webpack_require__(15);
var Segment = (function (_super) {
    __extends(Segment, _super);
    /**
     * A Segment Plot displays line segments based on the data.
     *
     * @constructor
     */
    function Segment() {
        var _this = _super.call(this) || this;
        _this.addClass("segment-plot");
        _this.attr("stroke", new Scales.Color().range()[0]);
        _this.attr("stroke-width", "2px");
        return _this;
    }
    Segment.prototype._createDrawer = function (dataset) {
        return new Drawers.Segment(dataset);
    };
    Segment.prototype._generateDrawSteps = function () {
        return [{ attrToProjector: this._generateAttrToProjector(), animator: new Animators.Null() }];
    };
    Segment.prototype._updateExtentsForProperty = function (property) {
        _super.prototype._updateExtentsForProperty.call(this, property);
        if (property === "x") {
            _super.prototype._updateExtentsForProperty.call(this, "x2");
        }
        else if (property === "y") {
            _super.prototype._updateExtentsForProperty.call(this, "y2");
        }
    };
    Segment.prototype._filterForProperty = function (property) {
        if (property === "x2") {
            return _super.prototype._filterForProperty.call(this, "x");
        }
        else if (property === "y2") {
            return _super.prototype._filterForProperty.call(this, "y");
        }
        return _super.prototype._filterForProperty.call(this, property);
    };
    Segment.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
            var x2Binding = this.x2();
            var x2 = x2Binding && x2Binding.accessor;
            if (x2 != null) {
                this._bindProperty(Segment._X2_KEY, x2, xScale);
            }
        }
        return this;
    };
    Segment.prototype.x2 = function (x2) {
        if (x2 == null) {
            return this._propertyBindings.get(Segment._X2_KEY);
        }
        var xBinding = this.x();
        var xScale = xBinding && xBinding.scale;
        this._bindProperty(Segment._X2_KEY, x2, xScale);
        this.render();
        return this;
    };
    Segment.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
            var y2Binding = this.y2();
            var y2 = y2Binding && y2Binding.accessor;
            if (y2 != null) {
                this._bindProperty(Segment._Y2_KEY, y2, yScale);
            }
        }
        return this;
    };
    Segment.prototype.y2 = function (y2) {
        if (y2 == null) {
            return this._propertyBindings.get(Segment._Y2_KEY);
        }
        var yBinding = this.y();
        var yScale = yBinding && yBinding.scale;
        this._bindProperty(Segment._Y2_KEY, y2, yScale);
        this.render();
        return this;
    };
    Segment.prototype._propertyProjectors = function () {
        var attrToProjector = _super.prototype._propertyProjectors.call(this);
        attrToProjector["x1"] = plot_1.Plot._scaledAccessor(this.x());
        attrToProjector["x2"] = this.x2() == null ? plot_1.Plot._scaledAccessor(this.x()) : plot_1.Plot._scaledAccessor(this.x2());
        attrToProjector["y1"] = plot_1.Plot._scaledAccessor(this.y());
        attrToProjector["y2"] = this.y2() == null ? plot_1.Plot._scaledAccessor(this.y()) : plot_1.Plot._scaledAccessor(this.y2());
        return attrToProjector;
    };
    Segment.prototype.entitiesAt = function (point) {
        var entity = this.entityNearest(point);
        if (entity != null) {
            return [entity];
        }
        else {
            return [];
        }
    };
    Segment.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        return this._entitiesIntersecting(dataXRange, dataYRange);
    };
    Segment.prototype._entitiesIntersecting = function (xRange, yRange) {
        var _this = this;
        var intersected = [];
        var attrToProjector = this._generateAttrToProjector();
        this.entities().forEach(function (entity) {
            if (_this._lineIntersectsBox(entity, xRange, yRange, attrToProjector)) {
                intersected.push(entity);
            }
        });
        return intersected;
    };
    Segment.prototype._lineIntersectsBox = function (entity, xRange, yRange, attrToProjector) {
        var _this = this;
        var x1 = attrToProjector["x1"](entity.datum, entity.index, entity.dataset);
        var x2 = attrToProjector["x2"](entity.datum, entity.index, entity.dataset);
        var y1 = attrToProjector["y1"](entity.datum, entity.index, entity.dataset);
        var y2 = attrToProjector["y2"](entity.datum, entity.index, entity.dataset);
        // check if any of end points of the segment is inside the box
        if ((xRange.min <= x1 && x1 <= xRange.max && yRange.min <= y1 && y1 <= yRange.max) ||
            (xRange.min <= x2 && x2 <= xRange.max && yRange.min <= y2 && y2 <= yRange.max)) {
            return true;
        }
        var startPoint = { x: x1, y: y1 };
        var endPoint = { x: x2, y: y2 };
        var corners = [
            { x: xRange.min, y: yRange.min },
            { x: xRange.min, y: yRange.max },
            { x: xRange.max, y: yRange.max },
            { x: xRange.max, y: yRange.min },
        ];
        var intersections = corners.filter(function (point, index) {
            if (index !== 0) {
                // return true if border formed by conecting current corner and previous corner intersects with the segment
                return _this._lineIntersectsSegment(startPoint, endPoint, point, corners[index - 1]) &&
                    _this._lineIntersectsSegment(point, corners[index - 1], startPoint, endPoint);
            }
            return false;
        });
        return intersections.length > 0;
    };
    Segment.prototype._lineIntersectsSegment = function (point1, point2, point3, point4) {
        /* tslint:disable no-shadowed-variable */
        var calcOrientation = function (point1, point2, point) {
            return (point2.x - point1.x) * (point.y - point2.y) - (point2.y - point1.y) * (point.x - point2.x);
        };
        /* tslint:enable no-shadowed-variable */
        // point3 and point4 are on different sides of line formed by point1 and point2
        return calcOrientation(point1, point2, point3) * calcOrientation(point1, point2, point4) < 0;
    };
    return Segment;
}(xyPlot_1.XYPlot));
Segment._X2_KEY = "x2";
Segment._Y2_KEY = "y2";
exports.Segment = Segment;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Animators = __webpack_require__(6);
var Utils = __webpack_require__(0);
var areaPlot_1 = __webpack_require__(36);
var plot_1 = __webpack_require__(2);
var StackedArea = (function (_super) {
    __extends(StackedArea, _super);
    /**
     * @constructor
     */
    function StackedArea() {
        var _this = _super.call(this) || this;
        _this._baselineValue = 0;
        _this._stackingOrder = "bottomup";
        _this.addClass("stacked-area-plot");
        _this.attr("fill-opacity", 1);
        _this._stackingResult = new Utils.Map();
        _this._stackedExtent = [];
        _this._baselineValueProvider = function () { return [_this._baselineValue]; };
        _this.croppedRenderingEnabled(false);
        return _this;
    }
    StackedArea.prototype.croppedRenderingEnabled = function (croppedRendering) {
        if (croppedRendering == null) {
            return _super.prototype.croppedRenderingEnabled.call(this);
        }
        if (croppedRendering) {
            // HACKHACK #3032: cropped rendering doesn't currently work correctly on StackedArea
            Utils.Window.warn("Warning: Stacked Area Plot does not support cropped rendering.");
            return this;
        }
        return _super.prototype.croppedRenderingEnabled.call(this, croppedRendering);
    };
    StackedArea.prototype._getAnimator = function (key) {
        return new Animators.Null();
    };
    StackedArea.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._baseline = this._renderArea.append("line").classed("baseline", true);
    };
    StackedArea.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
        }
        this._updateStackExtentsAndOffsets();
        return this;
    };
    StackedArea.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
        }
        this._updateStackExtentsAndOffsets();
        return this;
    };
    StackedArea.prototype.stackingOrder = function (stackingOrder) {
        if (stackingOrder == null) {
            return this._stackingOrder;
        }
        this._stackingOrder = stackingOrder;
        this._onDatasetUpdate();
        return this;
    };
    StackedArea.prototype.downsamplingEnabled = function (downsampling) {
        if (downsampling == null) {
            return _super.prototype.downsamplingEnabled.call(this);
        }
        Utils.Window.warn("Warning: Stacked Area Plot does not support downsampling");
        return this;
    };
    StackedArea.prototype._additionalPaint = function () {
        var scaledBaseline = this.y().scale.scale(this._baselineValue);
        var baselineAttr = {
            "x1": 0,
            "y1": scaledBaseline,
            "x2": this.width(),
            "y2": scaledBaseline,
        };
        this._getAnimator("baseline").animate(this._baseline, baselineAttr);
    };
    StackedArea.prototype._updateYScale = function () {
        var yBinding = this.y();
        var scale = (yBinding && yBinding.scale);
        if (scale == null) {
            return;
        }
        scale.addPaddingExceptionsProvider(this._baselineValueProvider);
        scale.addIncludedValuesProvider(this._baselineValueProvider);
    };
    StackedArea.prototype._onDatasetUpdate = function () {
        this._updateStackExtentsAndOffsets();
        _super.prototype._onDatasetUpdate.call(this);
        return this;
    };
    StackedArea.prototype._updateExtentsForProperty = function (property) {
        _super.prototype._updateExtentsForProperty.call(this, property);
        if ((property === "x" || property === "y") && this._projectorsReady()) {
            this._updateStackExtentsAndOffsets();
        }
    };
    StackedArea.prototype._extentsForProperty = function (attr) {
        var primaryAttr = "y";
        if (attr === primaryAttr) {
            return [this._stackedExtent];
        }
        else {
            return _super.prototype._extentsForProperty.call(this, attr);
        }
    };
    StackedArea.prototype._updateStackExtentsAndOffsets = function () {
        if (!this._projectorsReady()) {
            return;
        }
        var datasets = this.datasets();
        var keyAccessor = this.x().accessor;
        var valueAccessor = this.y().accessor;
        var filter = this._filterForProperty("y");
        this._checkSameDomain(datasets, keyAccessor);
        this._stackingResult = Utils.Stacking.stack(datasets, keyAccessor, valueAccessor, this._stackingOrder);
        this._stackedExtent = Utils.Stacking.stackedExtent(this._stackingResult, keyAccessor, filter);
    };
    StackedArea.prototype._checkSameDomain = function (datasets, keyAccessor) {
        var keySets = datasets.map(function (dataset) {
            return d3.set(dataset.data().map(function (datum, i) { return keyAccessor(datum, i, dataset).toString(); })).values();
        });
        var domainKeys = StackedArea._domainKeys(datasets, keyAccessor);
        if (keySets.some(function (keySet) { return keySet.length !== domainKeys.length; })) {
            Utils.Window.warn("the domains across the datasets are not the same. Plot may produce unintended behavior.");
        }
    };
    /**
     * Given an array of Datasets and the accessor function for the key, computes the
     * set reunion (no duplicates) of the domain of each Dataset. The keys are stringified
     * before being returned.
     *
     * @param {Dataset[]} datasets The Datasets for which we extract the domain keys
     * @param {Accessor<any>} keyAccessor The accessor for the key of the data
     * @return {string[]} An array of stringified keys
     */
    StackedArea._domainKeys = function (datasets, keyAccessor) {
        var domainKeys = d3.set();
        datasets.forEach(function (dataset) {
            dataset.data().forEach(function (datum, index) {
                domainKeys.add(keyAccessor(datum, index, dataset));
            });
        });
        return domainKeys.values();
    };
    StackedArea.prototype._propertyProjectors = function () {
        var _this = this;
        var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
        var yAccessor = this.y().accessor;
        var xAccessor = this.x().accessor;
        var normalizedXAccessor = function (datum, index, dataset) {
            return Utils.Stacking.normalizeKey(xAccessor(datum, index, dataset));
        };
        var stackYProjector = function (d, i, dataset) {
            return _this.y().scale.scale(+yAccessor(d, i, dataset) + _this._stackingResult.get(dataset).get(normalizedXAccessor(d, i, dataset)).offset);
        };
        var stackY0Projector = function (d, i, dataset) {
            return _this.y().scale.scale(_this._stackingResult.get(dataset).get(normalizedXAccessor(d, i, dataset)).offset);
        };
        propertyToProjectors["d"] = this._constructAreaProjector(plot_1.Plot._scaledAccessor(this.x()), stackYProjector, stackY0Projector);
        return propertyToProjectors;
    };
    StackedArea.prototype._pixelPoint = function (datum, index, dataset) {
        var pixelPoint = _super.prototype._pixelPoint.call(this, datum, index, dataset);
        var xValue = this.x().accessor(datum, index, dataset);
        var yValue = this.y().accessor(datum, index, dataset);
        var scaledYValue = this.y().scale.scale(+yValue + this._stackingResult.get(dataset).get(Utils.Stacking.normalizeKey(xValue)).offset);
        return { x: pixelPoint.x, y: scaledYValue };
    };
    return StackedArea;
}(areaPlot_1.Area));
exports.StackedArea = StackedArea;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Typesetter = __webpack_require__(4);
var Utils = __webpack_require__(0);
var barPlot_1 = __webpack_require__(22);
var StackedBar = (function (_super) {
    __extends(StackedBar, _super);
    /**
     * A StackedBar Plot stacks bars across Datasets based on the primary value of the bars.
     *   On a vertical StackedBar Plot, the bars with the same X value are stacked.
     *   On a horizontal StackedBar Plot, the bars with the same Y value are stacked.
     *
     * @constructor
     * @param {Scale} xScale
     * @param {Scale} yScale
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    function StackedBar(orientation) {
        if (orientation === void 0) { orientation = "vertical"; }
        var _this = _super.call(this, orientation) || this;
        _this.addClass("stacked-bar-plot");
        _this._stackingOrder = "bottomup";
        _this._stackingResult = new Utils.Map();
        _this._stackedExtent = [];
        return _this;
    }
    StackedBar.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
        }
        this._updateStackExtentsAndOffsets();
        return this;
    };
    StackedBar.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
        }
        this._updateStackExtentsAndOffsets();
        return this;
    };
    StackedBar.prototype.stackingOrder = function (stackingOrder) {
        if (stackingOrder == null) {
            return this._stackingOrder;
        }
        this._stackingOrder = stackingOrder;
        this._onDatasetUpdate();
        return this;
    };
    StackedBar.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._labelArea = this._renderArea.append("g").classed(barPlot_1.Bar._LABEL_AREA_CLASS, true);
        var context = new Typesetter.SvgContext(this._labelArea.node());
        this._measurer = new Typesetter.CacheMeasurer(context);
        this._writer = new Typesetter.Writer(this._measurer, context);
    };
    StackedBar.prototype._drawLabels = function () {
        var _this = this;
        _super.prototype._drawLabels.call(this);
        // remove all current labels before redrawing
        this._labelArea.selectAll("g").remove();
        var baselineValue = +this.baselineValue();
        var primaryScale = this._isVertical ? this.x().scale : this.y().scale;
        var secondaryScale = this._isVertical ? this.y().scale : this.x().scale;
        var _a = Utils.Stacking.stackedExtents(this._stackingResult), maximumExtents = _a.maximumExtents, minimumExtents = _a.minimumExtents;
        var barWidth = this._getBarPixelWidth();
        var anyTooWide = [];
        var drawLabel = function (text, measurement, labelPosition) {
            var x = labelPosition.x, y = labelPosition.y;
            var height = measurement.height, width = measurement.width;
            var tooWide = _this._isVertical
                ? (width > barWidth - (2 * StackedBar._LABEL_PADDING))
                : (height > barWidth - (2 * StackedBar._LABEL_PADDING));
            var hideLabel = x < 0
                || y < 0
                || x + width > _this.width()
                || y + height > _this.height()
                || tooWide;
            if (!hideLabel) {
                var labelContainer = _this._labelArea.append("g").attr("transform", "translate(" + x + ", " + y + ")");
                labelContainer.classed("stacked-bar-label", true);
                var writeOptions = {
                    xAlign: "center",
                    yAlign: "center",
                };
                _this._writer.write(text, measurement.width, measurement.height, writeOptions, labelContainer.node());
            }
            return tooWide;
        };
        maximumExtents.forEach(function (maximum) {
            if (maximum.extent !== baselineValue) {
                // only draw sums for values not at the baseline
                var text = _this.labelFormatter()(maximum.extent);
                var measurement = _this._measurer.measure(text);
                var primaryTextMeasurement = _this._isVertical ? measurement.width : measurement.height;
                var secondaryTextMeasurement = _this._isVertical ? measurement.height : measurement.width;
                var x = _this._isVertical
                    ? primaryScale.scale(maximum.axisValue) - primaryTextMeasurement / 2
                    : secondaryScale.scale(maximum.extent) + StackedBar._STACKED_BAR_LABEL_PADDING;
                var y = _this._isVertical
                    ? secondaryScale.scale(maximum.extent) - secondaryTextMeasurement - StackedBar._STACKED_BAR_LABEL_PADDING
                    : primaryScale.scale(maximum.axisValue) - primaryTextMeasurement / 2;
                anyTooWide.push(drawLabel(text, measurement, { x: x, y: y }));
            }
        });
        minimumExtents.forEach(function (minimum) {
            if (minimum.extent !== baselineValue) {
                var text = _this.labelFormatter()(minimum.extent);
                var measurement = _this._measurer.measure(text);
                var primaryTextMeasurement = _this._isVertical ? measurement.width : measurement.height;
                var secondaryTextMeasurement = _this._isVertical ? measurement.height : measurement.width;
                var x = _this._isVertical
                    ? primaryScale.scale(minimum.axisValue) - primaryTextMeasurement / 2
                    : secondaryScale.scale(minimum.extent) - secondaryTextMeasurement - StackedBar._STACKED_BAR_LABEL_PADDING;
                var y = _this._isVertical
                    ? secondaryScale.scale(minimum.extent) + StackedBar._STACKED_BAR_LABEL_PADDING
                    : primaryScale.scale(minimum.axisValue) - primaryTextMeasurement / 2;
                anyTooWide.push(drawLabel(text, measurement, { x: x, y: y }));
            }
        });
        if (anyTooWide.some(function (d) { return d; })) {
            this._labelArea.selectAll("g").remove();
        }
    };
    StackedBar.prototype._generateAttrToProjector = function () {
        var _this = this;
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        var valueAttr = this._isVertical ? "y" : "x";
        var keyAttr = this._isVertical ? "x" : "y";
        var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
        var primaryAccessor = this._propertyBindings.get(valueAttr).accessor;
        var keyAccessor = this._propertyBindings.get(keyAttr).accessor;
        var normalizedKeyAccessor = function (datum, index, dataset) {
            return Utils.Stacking.normalizeKey(keyAccessor(datum, index, dataset));
        };
        var getStart = function (d, i, dataset) {
            return primaryScale.scale(_this._stackingResult.get(dataset).get(normalizedKeyAccessor(d, i, dataset)).offset);
        };
        var getEnd = function (d, i, dataset) {
            return primaryScale.scale(+primaryAccessor(d, i, dataset) +
                _this._stackingResult.get(dataset).get(normalizedKeyAccessor(d, i, dataset)).offset);
        };
        var heightF = function (d, i, dataset) {
            return Math.abs(getEnd(d, i, dataset) - getStart(d, i, dataset));
        };
        attrToProjector[this._isVertical ? "height" : "width"] = heightF;
        var attrFunction = function (d, i, dataset) {
            return +primaryAccessor(d, i, dataset) < 0 ? getStart(d, i, dataset) : getEnd(d, i, dataset);
        };
        attrToProjector[valueAttr] = function (d, i, dataset) {
            return _this._isVertical ? attrFunction(d, i, dataset) : attrFunction(d, i, dataset) - heightF(d, i, dataset);
        };
        return attrToProjector;
    };
    StackedBar.prototype._onDatasetUpdate = function () {
        this._updateStackExtentsAndOffsets();
        _super.prototype._onDatasetUpdate.call(this);
        return this;
    };
    StackedBar.prototype._updateExtentsForProperty = function (property) {
        _super.prototype._updateExtentsForProperty.call(this, property);
        if ((property === "x" || property === "y") && this._projectorsReady()) {
            this._updateStackExtentsAndOffsets();
        }
    };
    StackedBar.prototype._extentsForProperty = function (attr) {
        var primaryAttr = this._isVertical ? "y" : "x";
        if (attr === primaryAttr) {
            return [this._stackedExtent];
        }
        else {
            return _super.prototype._extentsForProperty.call(this, attr);
        }
    };
    StackedBar.prototype._updateStackExtentsAndOffsets = function () {
        if (!this._projectorsReady()) {
            return;
        }
        var datasets = this.datasets();
        var keyAccessor = this._isVertical ? this.x().accessor : this.y().accessor;
        var valueAccessor = this._isVertical ? this.y().accessor : this.x().accessor;
        var filter = this._filterForProperty(this._isVertical ? "y" : "x");
        this._stackingResult = Utils.Stacking.stack(datasets, keyAccessor, valueAccessor, this._stackingOrder);
        this._stackedExtent = Utils.Stacking.stackedExtent(this._stackingResult, keyAccessor, filter);
    };
    StackedBar.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return StackedBar;
}(barPlot_1.Bar));
StackedBar._STACKED_BAR_LABEL_PADDING = 5;
exports.StackedBar = StackedBar;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = __webpack_require__(0);
var barPlot_1 = __webpack_require__(22);
var plot_1 = __webpack_require__(2);
var Waterfall = (function (_super) {
    __extends(Waterfall, _super);
    function Waterfall() {
        var _this = _super.call(this) || this;
        _this._connectorsEnabled = false;
        _this.addClass("waterfall-plot");
        return _this;
    }
    Waterfall.prototype.connectorsEnabled = function (enabled) {
        if (enabled == null) {
            return this._connectorsEnabled;
        }
        this._connectorsEnabled = enabled;
        return this;
    };
    Waterfall.prototype.total = function (total) {
        if (total == null) {
            return this._propertyBindings.get(Waterfall._TOTAL_KEY);
        }
        this._bindProperty(Waterfall._TOTAL_KEY, total, null);
        return this;
    };
    Waterfall.prototype._additionalPaint = function (time) {
        var _this = this;
        this._connectorArea.selectAll("line").remove();
        if (this._connectorsEnabled) {
            Utils.Window.setTimeout(function () { return _this._drawConnectors(); }, time);
        }
    };
    Waterfall.prototype._createNodesForDataset = function (dataset) {
        var drawer = _super.prototype._createNodesForDataset.call(this, dataset);
        this._connectorArea = this._renderArea.append("g").classed(Waterfall._CONNECTOR_AREA_CLASS, true);
        return drawer;
    };
    Waterfall.prototype._extentsForProperty = function (attr) {
        var primaryAttr = "y";
        if (attr === primaryAttr) {
            return [this._extent];
        }
        else {
            return _super.prototype._extentsForProperty.call(this, attr);
        }
    };
    Waterfall.prototype._generateAttrToProjector = function () {
        var _this = this;
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        var yScale = this.y().scale;
        var totalAccessor = plot_1.Plot._scaledAccessor(this.total());
        var yAttr = this.attr("y");
        if (yAttr == null) {
            attrToProjector["y"] = function (d, i, dataset) {
                var currentValue = _this.y().accessor(d, i, dataset);
                var isTotal = totalAccessor(d, i, dataset);
                if (isTotal) {
                    return Math.min(yScale.scale(currentValue), yScale.scale(0));
                }
                else {
                    var currentSubtotal = _this._subtotals[i];
                    if (i === 0) {
                        if (currentValue < 0) {
                            return yScale.scale(currentSubtotal - currentValue);
                        }
                        else {
                            return yScale.scale(currentSubtotal);
                        }
                    }
                    var priorSubtotal = _this._subtotals[i - 1];
                    if (currentSubtotal > priorSubtotal) {
                        return yScale.scale(currentSubtotal);
                    }
                    else {
                        return yScale.scale(priorSubtotal);
                    }
                }
            };
        }
        var heightAttr = this.attr("height");
        if (heightAttr == null) {
            attrToProjector["height"] = function (d, i, dataset) {
                var isTotal = totalAccessor(d, i, dataset);
                var currentValue = _this.y().accessor(d, i, dataset);
                if (isTotal) {
                    return Math.abs(yScale.scale(currentValue) - yScale.scale(0));
                }
                else {
                    var currentSubtotal = _this._subtotals[i];
                    if (i === 0) {
                        return Math.abs(yScale.scale(currentSubtotal) - yScale.scale(currentSubtotal - currentValue));
                    }
                    else {
                        var priorSubtotal = _this._subtotals[i - 1];
                        return Math.abs(yScale.scale(currentSubtotal) - yScale.scale(priorSubtotal));
                    }
                }
            };
        }
        attrToProjector["class"] = function (d, i, dataset) {
            var baseClass = "";
            if (_this.attr("class") != null) {
                baseClass = _this.attr("class").accessor(d, i, dataset) + " ";
            }
            var isTotal = totalAccessor(d, i, dataset);
            if (isTotal) {
                return baseClass + Waterfall._BAR_TOTAL_CLASS;
            }
            else {
                var delta = _this.y().accessor(d, i, dataset);
                return baseClass + (delta > 0 ? Waterfall._BAR_GROWTH_CLASS : Waterfall._BAR_DECLINE_CLASS);
            }
        };
        return attrToProjector;
    };
    Waterfall.prototype._onDatasetUpdate = function () {
        this._updateSubtotals();
        _super.prototype._onDatasetUpdate.call(this);
        return this;
    };
    Waterfall.prototype._calculateSubtotalsAndExtent = function (dataset) {
        var _this = this;
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        var total = 0;
        var hasStarted = false;
        dataset.data().forEach(function (datum, index) {
            var currentValue = _this.y().accessor(datum, index, dataset);
            var isTotal = _this.total().accessor(datum, index, dataset);
            if (!isTotal || index === 0) {
                total += currentValue;
            }
            _this._subtotals.push(total);
            if (total < min) {
                min = total;
            }
            if (total > max) {
                max = total;
            }
            if (isTotal) {
                if (currentValue < min) {
                    min = currentValue;
                }
                if (currentValue > max) {
                    max = currentValue;
                }
            }
            if (!hasStarted && isTotal) {
                var startTotal = currentValue - total;
                for (var i = 0; i < _this._subtotals.length; i++) {
                    _this._subtotals[i] += startTotal;
                }
                hasStarted = true;
                total += startTotal;
                min += startTotal;
                max += startTotal;
            }
        });
        this._extent = [min, max];
    };
    Waterfall.prototype._drawConnectors = function () {
        var attrToProjector = this._generateAttrToProjector();
        var dataset = this.datasets()[0];
        for (var datumIndex = 1; datumIndex < dataset.data().length; datumIndex++) {
            var prevIndex = datumIndex - 1;
            var datum = dataset.data()[datumIndex];
            var prevDatum = dataset.data()[prevIndex];
            var x = attrToProjector["x"](prevDatum, prevIndex, dataset);
            var x2 = attrToProjector["x"](datum, datumIndex, dataset) + attrToProjector["width"](datum, datumIndex, dataset);
            var y = attrToProjector["y"](datum, datumIndex, dataset);
            if ((this._subtotals[datumIndex] > 0 && this._subtotals[datumIndex] > this._subtotals[prevIndex]) ||
                (this._subtotals[datumIndex] < 0 && this._subtotals[datumIndex] >= this._subtotals[prevIndex])) {
                y = attrToProjector["y"](datum, datumIndex, dataset) + attrToProjector["height"](datum, datumIndex, dataset);
            }
            this._connectorArea.append("line").classed(Waterfall._CONNECTOR_CLASS, true)
                .attr("x1", x).attr("x2", x2).attr("y1", y).attr("y2", y);
        }
    };
    Waterfall.prototype._updateSubtotals = function () {
        var datasets = this.datasets();
        if (datasets.length > 0) {
            var dataset = datasets[datasets.length - 1];
            this._subtotals = new Array();
            this._calculateSubtotalsAndExtent(dataset);
        }
    };
    return Waterfall;
}(barPlot_1.Bar));
Waterfall._BAR_DECLINE_CLASS = "waterfall-decline";
Waterfall._BAR_GROWTH_CLASS = "waterfall-growth";
Waterfall._BAR_TOTAL_CLASS = "waterfall-total";
Waterfall._CONNECTOR_CLASS = "connector";
Waterfall._CONNECTOR_AREA_CLASS = "connector-area";
Waterfall._TOTAL_KEY = "total";
exports.Waterfall = Waterfall;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var scale_1 = __webpack_require__(17);
var Color = (function (_super) {
    __extends(Color, _super);
    /**
     * A Color Scale maps string values to color hex values expressed as a string.
     *
     * @constructor
     * @param {string} [scaleType] One of "Category10"/"Category20"/"Category20b"/"Category20c".
     *   (see https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors)
     *   If not supplied, reads the colors defined using CSS -- see plottable.css.
     */
    function Color(scaleType) {
        var _this = _super.call(this) || this;
        var scale;
        switch (scaleType) {
            case null:
            case undefined:
                if (Color._plottableColorCache == null) {
                    Color._plottableColorCache = Color._getPlottableColors();
                }
                scale = d3.scaleOrdinal().range(Color._plottableColorCache);
                break;
            case "Category10":
            case "category10":
            case "10":
                scale = d3.scaleOrdinal(d3.schemeCategory10);
                break;
            case "Category20":
            case "category20":
            case "20":
                scale = d3.scaleOrdinal(d3.schemeCategory20);
                break;
            case "Category20b":
            case "category20b":
            case "20b":
                scale = d3.scaleOrdinal(d3.schemeCategory20b);
                break;
            case "Category20c":
            case "category20c":
            case "20c":
                scale = d3.scaleOrdinal(d3.schemeCategory20c);
                break;
            default:
                throw new Error("Unsupported ColorScale type");
        }
        _this._d3Scale = scale;
        return _this;
    }
    Color.prototype.extentOfValues = function (values) {
        return Utils.Array.uniq(values);
    };
    // Duplicated from OrdinalScale._getExtent - should be removed in #388
    Color.prototype._getExtent = function () {
        return Utils.Array.uniq(this._getAllIncludedValues());
    };
    Color.invalidateColorCache = function () {
        Color._plottableColorCache = null;
    };
    Color._getPlottableColors = function () {
        var plottableDefaultColors = [];
        var colorTester = d3.select("body").append("plottable-color-tester");
        var defaultColorHex = Utils.Color.colorTest(colorTester, "");
        var i = 0;
        var colorHex = Utils.Color.colorTest(colorTester, "plottable-colors-0");
        while (colorHex != null && i < this._MAXIMUM_COLORS_FROM_CSS) {
            if (colorHex === defaultColorHex && colorHex === plottableDefaultColors[plottableDefaultColors.length - 1]) {
                break;
            }
            plottableDefaultColors.push(colorHex);
            i++;
            colorHex = Utils.Color.colorTest(colorTester, "plottable-colors-" + i);
        }
        colorTester.remove();
        return plottableDefaultColors;
    };
    /**
     * Returns the color-string corresponding to a given string.
     * If there are not enough colors in the range(), a lightened version of an existing color will be used.
     *
     * @param {string} value
     * @returns {string}
     */
    Color.prototype.scale = function (value) {
        var color = this._d3Scale(value);
        var index = this.domain().indexOf(value);
        var numLooped = Math.floor(index / this.range().length);
        var modifyFactor = Math.log(numLooped * Color._LOOP_LIGHTEN_FACTOR + 1);
        return Utils.Color.lightenColor(color, modifyFactor);
    };
    Color.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    Color.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    Color.prototype._getRange = function () {
        return this._d3Scale.range();
    };
    Color.prototype._setRange = function (values) {
        this._d3Scale.range(values);
    };
    return Color;
}(scale_1.Scale));
Color._LOOP_LIGHTEN_FACTOR = 1.6;
// The maximum number of colors we are getting from CSS stylesheets
Color._MAXIMUM_COLORS_FROM_CSS = 256;
exports.Color = Color;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var scale_1 = __webpack_require__(17);
var InterpolatedColor = (function (_super) {
    __extends(InterpolatedColor, _super);
    /**
     * An InterpolatedColor Scale maps numbers to color hex values, expressed as strings.
     *
     * @param {string} [scaleType="linear"] One of "linear"/"log"/"sqrt"/"pow".
     */
    function InterpolatedColor(scaleType) {
        if (scaleType === void 0) { scaleType = "linear"; }
        var _this = _super.call(this) || this;
        switch (scaleType) {
            case "linear":
                _this._colorScale = d3.scaleLinear();
                break;
            case "log":
                _this._colorScale = d3.scaleLog();
                break;
            case "sqrt":
                _this._colorScale = d3.scaleSqrt();
                break;
            case "pow":
                _this._colorScale = d3.scalePow();
                break;
        }
        if (_this._colorScale == null) {
            throw new Error("unknown QuantitativeScale scale type " + scaleType);
        }
        _this.range(InterpolatedColor.REDS);
        return _this;
    }
    InterpolatedColor.prototype.extentOfValues = function (values) {
        var extent = d3.extent(values);
        if (extent[0] == null || extent[1] == null) {
            return [];
        }
        else {
            return extent;
        }
    };
    /**
     * Generates the converted QuantitativeScale.
     */
    InterpolatedColor.prototype._d3InterpolatedScale = function () {
        return this._colorScale.range([0, 1]).interpolate(this._interpolateColors());
    };
    /**
     * Generates the d3 interpolator for colors.
     */
    InterpolatedColor.prototype._interpolateColors = function () {
        var colors = this._colorRange;
        if (colors.length < 2) {
            throw new Error("Color scale arrays must have at least two elements.");
        }
        ;
        return function (a, b) {
            return function (t) {
                // Clamp t parameter to [0,1]
                t = Math.max(0, Math.min(1, t));
                // Determine indices for colors
                var tScaled = t * (colors.length - 1);
                var i0 = Math.floor(tScaled);
                var i1 = Math.ceil(tScaled);
                var frac = (tScaled - i0);
                // Interpolate in the L*a*b color space
                return d3.interpolateLab(colors[i0], colors[i1])(frac);
            };
        };
    };
    InterpolatedColor.prototype._resetScale = function () {
        this._d3Scale = this._d3InterpolatedScale();
        this._autoDomainIfAutomaticMode();
        this._dispatchUpdate();
    };
    InterpolatedColor.prototype.autoDomain = function () {
        // InterpolatedColorScales do not pad
        var includedValues = this._getAllIncludedValues();
        if (includedValues.length > 0) {
            this._setDomain([Utils.Math.min(includedValues, 0), Utils.Math.max(includedValues, 0)]);
        }
        return this;
    };
    InterpolatedColor.prototype.scale = function (value) {
        return this._d3Scale(value);
    };
    InterpolatedColor.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    InterpolatedColor.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    InterpolatedColor.prototype._getRange = function () {
        return this._colorRange;
    };
    InterpolatedColor.prototype._setRange = function (range) {
        this._colorRange = range;
        this._resetScale();
    };
    return InterpolatedColor;
}(scale_1.Scale));
InterpolatedColor.REDS = [
    "#FFFFFF",
    "#FFF6E1",
    "#FEF4C0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#B10026",
];
InterpolatedColor.BLUES = [
    "#FFFFFF",
    "#CCFFFF",
    "#A5FFFD",
    "#85F7FB",
    "#6ED3EF",
    "#55A7E0",
    "#417FD0",
    "#2545D3",
    "#0B02E1",
];
InterpolatedColor.POSNEG = [
    "#0B02E1",
    "#2545D3",
    "#417FD0",
    "#55A7E0",
    "#6ED3EF",
    "#85F7FB",
    "#A5FFFD",
    "#CCFFFF",
    "#FFFFFF",
    "#FFF6E1",
    "#FEF4C0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#B10026",
];
exports.InterpolatedColor = InterpolatedColor;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var quantitativeScale_1 = __webpack_require__(10);
var Linear = (function (_super) {
    __extends(Linear, _super);
    /**
     * @constructor
     */
    function Linear() {
        var _this = _super.call(this) || this;
        _this._d3Scale = d3.scaleLinear();
        return _this;
    }
    Linear.prototype._defaultExtent = function () {
        return [0, 1];
    };
    Linear.prototype._expandSingleValueDomain = function (singleValueDomain) {
        if (singleValueDomain[0] === singleValueDomain[1]) {
            return [singleValueDomain[0] - 1, singleValueDomain[1] + 1];
        }
        return singleValueDomain;
    };
    Linear.prototype.scale = function (value) {
        return this._d3Scale(value);
    };
    Linear.prototype.scaleTransformation = function (value) {
        return this.scale(value);
    };
    Linear.prototype.invertedTransformation = function (value) {
        return this.invert(value);
    };
    Linear.prototype.getTransformationDomain = function () {
        return this.domain();
    };
    Linear.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    Linear.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    Linear.prototype._getRange = function () {
        return this._d3Scale.range();
    };
    Linear.prototype._setRange = function (values) {
        this._d3Scale.range(values);
    };
    Linear.prototype.invert = function (value) {
        return this._d3Scale.invert(value);
    };
    Linear.prototype.defaultTicks = function () {
        return this._d3Scale.ticks(Linear._DEFAULT_NUM_TICKS);
    };
    Linear.prototype._niceDomain = function (domain, count) {
        return this._d3Scale.copy().domain(domain).nice(count).domain();
    };
    return Linear;
}(quantitativeScale_1.QuantitativeScale));
exports.Linear = Linear;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var Scales = __webpack_require__(3);
var quantitativeScale_1 = __webpack_require__(10);
var ModifiedLog = (function (_super) {
    __extends(ModifiedLog, _super);
    /**
     * A ModifiedLog Scale acts as a regular log scale for large numbers.
     * As it approaches 0, it gradually becomes linear.
     * Consequently, a ModifiedLog Scale can process 0 and negative numbers.
     *
     * For x >= base, scale(x) = log(x).
     *
     * For 0 < x < base, scale(x) will become more and more
     * linear as it approaches 0.
     *
     * At x == 0, scale(x) == 0.
     *
     * For negative values, scale(-x) = -scale(x).
     *
     * The range and domain for the scale should also be set, using the
     * range() and domain() accessors, respectively.
     *
     * For `range`, provide a two-element array giving the minimum and
     * maximum of values produced when scaling.
     *
     * For `domain` provide a two-element array giving the minimum and
     * maximum of the values that will be scaled.
     *
     * @constructor
     * @param {number} [base=10]
     *        The base of the log. Must be > 1.
     *
     */
    function ModifiedLog(base) {
        if (base === void 0) { base = 10; }
        var _this = _super.call(this) || this;
        _this._d3Scale = d3.scaleLinear();
        _this._base = base;
        _this._pivot = _this._base;
        _this._setDomain(_this._defaultExtent());
        if (base <= 1) {
            throw new Error("ModifiedLogScale: The base must be > 1");
        }
        return _this;
    }
    /**
     * Returns an adjusted log10 value for graphing purposes.  The first
     * adjustment is that negative values are changed to positive during
     * the calculations, and then the answer is negated at the end.  The
     * second is that, for values less than 10, an increasingly large
     * (0 to 1) scaling factor is added such that at 0 the value is
     * adjusted to 1, resulting in a returned result of 0.
     */
    ModifiedLog.prototype._adjustedLog = function (x) {
        var negationFactor = x < 0 ? -1 : 1;
        x *= negationFactor;
        if (x < this._pivot) {
            x += (this._pivot - x) / this._pivot;
        }
        x = Math.log(x) / Math.log(this._base);
        x *= negationFactor;
        return x;
    };
    ModifiedLog.prototype._invertedAdjustedLog = function (x) {
        var negationFactor = x < 0 ? -1 : 1;
        x *= negationFactor;
        x = Math.pow(this._base, x);
        if (x < this._pivot) {
            x = (this._pivot * (x - 1)) / (this._pivot - 1);
        }
        x *= negationFactor;
        return x;
    };
    ModifiedLog.prototype.scale = function (x) {
        return this._d3Scale(this._adjustedLog(x));
    };
    ModifiedLog.prototype.invert = function (x) {
        return this._invertedAdjustedLog(this._d3Scale.invert(x));
    };
    ModifiedLog.prototype.scaleTransformation = function (value) {
        return this.scale(value);
    };
    ModifiedLog.prototype.invertedTransformation = function (value) {
        return this.invert(value);
    };
    ModifiedLog.prototype.getTransformationDomain = function () {
        return this.domain();
    };
    ModifiedLog.prototype._getDomain = function () {
        return this._untransformedDomain;
    };
    ModifiedLog.prototype._setDomain = function (values) {
        this._untransformedDomain = values;
        var transformedDomain = [this._adjustedLog(values[0]), this._adjustedLog(values[1])];
        _super.prototype._setDomain.call(this, transformedDomain);
    };
    ModifiedLog.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    ModifiedLog.prototype.ticks = function () {
        // Say your domain is [-100, 100] and your pivot is 10.
        // then we're going to draw negative log ticks from -100 to -10,
        // linear ticks from -10 to 10, and positive log ticks from 10 to 100.
        var middle = function (x, y, z) { return [x, y, z].sort(function (a, b) { return a - b; })[1]; };
        var min = Utils.Math.min(this._untransformedDomain, 0);
        var max = Utils.Math.max(this._untransformedDomain, 0);
        var negativeLower = min;
        var negativeUpper = middle(min, max, -this._pivot);
        var positiveLower = middle(min, max, this._pivot);
        var positiveUpper = max;
        var negativeLogTicks = this._logTicks(-negativeUpper, -negativeLower).map(function (x) { return -x; }).reverse();
        var positiveLogTicks = this._logTicks(positiveLower, positiveUpper);
        var linearMin = Math.max(min, -this._pivot);
        var linearMax = Math.min(max, this._pivot);
        var linearTicks = d3.scaleLinear().domain([linearMin, linearMax]).ticks(this._howManyTicks(linearMin, linearMax));
        var ticks = negativeLogTicks.concat(linearTicks).concat(positiveLogTicks);
        // If you only have 1 tick, you can't tell how big the scale is.
        if (ticks.length <= 1) {
            ticks = d3.scaleLinear().domain([min, max]).ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
        }
        return ticks;
    };
    /**
     * Return an appropriate number of ticks from lower to upper.
     *
     * This will first try to fit as many powers of this.base as it can from
     * lower to upper.
     *
     * If it still has ticks after that, it will generate ticks in "clusters",
     * e.g. [20, 30, ... 90, 100] would be a cluster, [200, 300, ... 900, 1000]
     * would be another cluster.
     *
     * This function will generate clusters as large as it can while not
     * drastically exceeding its number of ticks.
     */
    ModifiedLog.prototype._logTicks = function (lower, upper) {
        var _this = this;
        var nTicks = this._howManyTicks(lower, upper);
        if (nTicks === 0) {
            return [];
        }
        var startLogged = Math.floor(Math.log(lower) / Math.log(this._base));
        var endLogged = Math.ceil(Math.log(upper) / Math.log(this._base));
        var bases = d3.range(endLogged, startLogged, -Math.ceil((endLogged - startLogged) / nTicks));
        var multiples = d3.range(this._base, 1, -(this._base - 1)).map(Math.floor);
        var uniqMultiples = Utils.Array.uniq(multiples);
        var clusters = bases.map(function (b) { return uniqMultiples.map(function (x) { return Math.pow(_this._base, b - 1) * x; }); });
        var flattened = Utils.Array.flatten(clusters);
        var filtered = flattened.filter(function (x) { return lower <= x && x <= upper; });
        var sorted = filtered.sort(function (x, y) { return x - y; });
        return sorted;
    };
    /**
     * How many ticks does the range [lower, upper] deserve?
     *
     * e.g. if your domain was [10, 1000] and I asked _howManyTicks(10, 100),
     * I would get 1/2 of the ticks. The range 10, 100 takes up 1/2 of the
     * distance when plotted.
     */
    ModifiedLog.prototype._howManyTicks = function (lower, upper) {
        var adjustedMin = this._adjustedLog(Utils.Math.min(this._untransformedDomain, 0));
        var adjustedMax = this._adjustedLog(Utils.Math.max(this._untransformedDomain, 0));
        var adjustedLower = this._adjustedLog(lower);
        var adjustedUpper = this._adjustedLog(upper);
        var proportion = (adjustedUpper - adjustedLower) / (adjustedMax - adjustedMin);
        var ticks = Math.ceil(proportion * Scales.ModifiedLog._DEFAULT_NUM_TICKS);
        return ticks;
    };
    ModifiedLog.prototype._niceDomain = function (domain, count) {
        return domain;
    };
    ModifiedLog.prototype._defaultExtent = function () {
        return [0, this._base];
    };
    ModifiedLog.prototype._expandSingleValueDomain = function (singleValueDomain) {
        if (singleValueDomain[0] === singleValueDomain[1]) {
            var singleValue = singleValueDomain[0];
            if (singleValue > 0) {
                return [singleValue / this._base, singleValue * this._base];
            }
            else if (singleValue === 0) {
                return [-this._base, this._base];
            }
            else {
                return [singleValue * this._base, singleValue / this._base];
            }
        }
        return singleValueDomain;
    };
    ModifiedLog.prototype._getRange = function () {
        return this._d3Scale.range();
    };
    ModifiedLog.prototype._setRange = function (values) {
        this._d3Scale.range(values);
    };
    ModifiedLog.prototype.defaultTicks = function () {
        return this._d3Scale.ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
    };
    return ModifiedLog;
}(quantitativeScale_1.QuantitativeScale));
exports.ModifiedLog = ModifiedLog;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Utils = __webpack_require__(0);
/**
 * Creates a TickGenerator using the specified interval.
 *
 * Generates ticks at multiples of the interval while also including the domain boundaries.
 *
 * @param {number} interval
 * @returns {TickGenerator}
 */
function intervalTickGenerator(interval) {
    if (interval <= 0) {
        throw new Error("interval must be positive number");
    }
    return function (s) {
        var domain = s.domain();
        var low = Math.min(domain[0], domain[1]);
        var high = Math.max(domain[0], domain[1]);
        var firstTick = Math.ceil(low / interval) * interval;
        var numTicks = Math.floor((high - firstTick) / interval) + 1;
        var lowTicks = low % interval === 0 ? [] : [low];
        var middleTicks = Utils.Math.range(0, numTicks).map(function (t) { return firstTick + t * interval; });
        var highTicks = high % interval === 0 ? [] : [high];
        return lowTicks.concat(middleTicks).concat(highTicks);
    };
}
exports.intervalTickGenerator = intervalTickGenerator;
/**
 * Creates a TickGenerator returns only integer tick values.
 *
 * @returns {TickGenerator}
 */
function integerTickGenerator() {
    return function (s) {
        var defaultTicks = s.defaultTicks();
        return defaultTicks.filter(function (tick, i) { return (tick % 1 === 0) || (i === 0) || (i === defaultTicks.length - 1); });
    };
}
exports.integerTickGenerator = integerTickGenerator;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = __webpack_require__(1);
var timeAxis_1 = __webpack_require__(23);
var quantitativeScale_1 = __webpack_require__(10);
var Time = (function (_super) {
    __extends(Time, _super);
    /**
     * A Time Scale maps Date objects to numbers.
     *
     * @constructor
     */
    function Time() {
        var _this = _super.call(this) || this;
        _this._d3Scale = d3.scaleTime();
        _this.autoDomain();
        return _this;
    }
    /**
     * Returns an array of ticks values separated by the specified interval.
     *
     * @param {string} interval A string specifying the interval unit.
     * @param {number?} [step] The number of multiples of the interval between consecutive ticks.
     * @return {Date[]}
     */
    Time.prototype.tickInterval = function (interval, step) {
        if (step === void 0) { step = 1; }
        // temporarily creats a time scale from our linear scale into a time scale so we can get access to its api
        var tempScale = d3.scaleTime();
        var d3Interval = Time.timeIntervalToD3Time(interval).every(step);
        tempScale.domain(this.domain());
        tempScale.range(this.range());
        return tempScale.ticks(d3Interval);
    };
    Time.prototype._setDomain = function (values) {
        if (values[1] < values[0]) {
            throw new Error("Scale.Time domain values must be in chronological order");
        }
        return _super.prototype._setDomain.call(this, values);
    };
    Time.prototype._defaultExtent = function () {
        return [new Date("1970-01-01"), new Date("1970-01-02")];
    };
    Time.prototype._expandSingleValueDomain = function (singleValueDomain) {
        var startTime = singleValueDomain[0].getTime();
        var endTime = singleValueDomain[1].getTime();
        if (startTime === endTime) {
            var startDate = new Date(startTime);
            startDate.setDate(startDate.getDate() - 1);
            var endDate = new Date(endTime);
            endDate.setDate(endDate.getDate() + 1);
            return [startDate, endDate];
        }
        return singleValueDomain;
    };
    Time.prototype.scale = function (value) {
        return this._d3Scale(value);
    };
    Time.prototype.scaleTransformation = function (value) {
        return this.scale(new Date(value));
    };
    Time.prototype.invertedTransformation = function (value) {
        return this.invert(value).getTime();
    };
    Time.prototype.getTransformationDomain = function () {
        var dates = this.domain();
        return [dates[0].valueOf(), dates[1].valueOf()];
    };
    Time.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    Time.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    Time.prototype._getRange = function () {
        return this._d3Scale.range();
    };
    Time.prototype._setRange = function (values) {
        this._d3Scale.range(values);
    };
    Time.prototype.invert = function (value) {
        return this._d3Scale.invert(value);
    };
    Time.prototype.defaultTicks = function () {
        return this._d3Scale.ticks(Time._DEFAULT_NUM_TICKS);
    };
    Time.prototype._niceDomain = function (domain) {
        return this._d3Scale.copy().domain(domain).nice().domain();
    };
    /**
     * Transforms the Plottable TimeInterval string into a d3 time interval equivalent.
     * If the provided TimeInterval is incorrect, the default is d3.timeYear
     */
    Time.timeIntervalToD3Time = function (timeInterval) {
        switch (timeInterval) {
            case timeAxis_1.TimeInterval.second:
                return d3.timeSecond;
            case timeAxis_1.TimeInterval.minute:
                return d3.timeMinute;
            case timeAxis_1.TimeInterval.hour:
                return d3.timeHour;
            case timeAxis_1.TimeInterval.day:
                return d3.timeDay;
            case timeAxis_1.TimeInterval.week:
                return d3.timeWeek;
            case timeAxis_1.TimeInterval.month:
                return d3.timeMonth;
            case timeAxis_1.TimeInterval.year:
                return d3.timeYear;
            default:
                throw Error("TimeInterval specified does not exist: " + timeInterval);
        }
    };
    return Time;
}(quantitativeScale_1.QuantitativeScale));
exports.Time = Time;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var nativeArray = window.Array;
/**
 * Takes two arrays of numbers and adds them together
 *
 * @param {number[]} aList The first array of numbers
 * @param {number[]} bList The second array of numbers
 * @return {number[]} An array of numbers where x[i] = aList[i] + bList[i]
 */
function add(aList, bList) {
    if (aList.length !== bList.length) {
        throw new Error("attempted to add arrays of unequal length");
    }
    return aList.map(function (_, i) { return aList[i] + bList[i]; });
}
exports.add = add;
/**
 * Take an array of values, and return the unique values.
 * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
 *
 * @param {T[]} values The values to find uniqueness for
 * @return {T[]} The unique values
 */
function uniq(arr) {
    var seen = d3.set();
    var result = [];
    arr.forEach(function (x) {
        if (!seen.has(String(x))) {
            seen.add(String(x));
            result.push(x);
        }
    });
    return result;
}
exports.uniq = uniq;
/**
 * @param {T[][]} a The 2D array that will have its elements joined together.
 * @return {T[]} Every array in a, concatenated together in the order they appear.
 */
function flatten(a) {
    return nativeArray.prototype.concat.apply([], a);
}
exports.flatten = flatten;
/**
 * Creates an array of length `count`, filled with value or (if value is a function), value()
 *
 * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
 * @param {number} count The length of the array to generate
 * @return {any[]}
 */
function createFilledArray(value, count) {
    var out = [];
    for (var i = 0; i < count; i++) {
        out[i] = typeof (value) === "function" ? value(i) : value;
    }
    return out;
}
exports.createFilledArray = createFilledArray;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var set_1 = __webpack_require__(40);
/**
 * A set of callbacks which can be all invoked at once.
 * Each callback exists at most once in the set (based on reference equality).
 * All callbacks should have the same signature.
 */
var CallbackSet = (function (_super) {
    __extends(CallbackSet, _super);
    function CallbackSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallbackSet.prototype.callCallbacks = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.forEach(function (callback) {
            callback.apply(_this, args);
        });
        return this;
    };
    return CallbackSet;
}(set_1.Set));
exports.CallbackSet = CallbackSet;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var nativeMath = window.Math;
/**
 * Return contrast ratio between two colors
 * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
 * chroma.js may be found here: https://github.com/gka/chroma.js
 * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
 * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
function contrast(a, b) {
    var l1 = luminance(a) + 0.05;
    var l2 = luminance(b) + 0.05;
    return l1 > l2 ? l1 / l2 : l2 / l1;
}
exports.contrast = contrast;
/**
 * Returns a brighter copy of this color. Each channel is multiplied by 0.7 ^ -factor.
 * Channel values are capped at the maximum value of 255, and the minimum value of 30.
 */
function lightenColor(color, factor) {
    var brightened = d3.color(color).brighter(factor);
    return brightened.rgb().toString();
}
exports.lightenColor = lightenColor;
/**
 * Gets the Hex Code of the color resulting by applying the className CSS class to the
 * colorTester selection. Returns null if the tester is transparent.
 *
 * @param {d3.Selection<void>} colorTester The d3 selection to apply the CSS class to
 * @param {string} className The name of the class to be applied
 * @return {string} The hex code of the computed color
 */
function colorTest(colorTester, className) {
    colorTester.classed(className, true);
    // Use regex to get the text inside the rgb parentheses
    var colorStyle = colorTester.style("background-color");
    if (colorStyle === "transparent") {
        return null;
    }
    var rgb = /\((.+)\)/.exec(colorStyle)[1]
        .split(",")
        .map(function (colorValue) {
        var colorNumber = +colorValue;
        var hexValue = colorNumber.toString(16);
        return colorNumber < 16 ? "0" + hexValue : hexValue;
    });
    if (rgb.length === 4 && rgb[3] === "00") {
        return null;
    }
    var hexCode = "#" + rgb.join("");
    colorTester.classed(className, false);
    return hexCode;
}
exports.colorTest = colorTest;
/**
 * Return relative luminance (defined here: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
 * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
 * chroma.js may be found here: https://github.com/gka/chroma.js
 * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
 */
function luminance(color) {
    var rgb = d3.rgb(color);
    var lum = function (x) {
        x = x / 255;
        return x <= 0.03928 ? x / 12.92 : nativeMath.pow((x + 0.055) / 1.055, 2.4);
    };
    var r = lum(rgb.r);
    var g = lum(rgb.g);
    var b = lum(rgb.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var nativeMath = window.Math;
/**
 * Returns whether the child is in fact a child of the parent
 */
function contains(parent, child) {
    var maybeParent = child;
    while (maybeParent != null && maybeParent !== parent) {
        maybeParent = maybeParent.parentNode;
    }
    return maybeParent === parent;
}
exports.contains = contains;
/**
 * Gets the bounding box of an element.
 * @param {d3.Selection} element
 * @returns {SVGRed} The bounding box.
 */
function elementBBox(element) {
    var bbox;
    // HACKHACK: Firefox won't correctly measure nodes with style "display: none" or their descendents (FF Bug 612118).
    try {
        bbox = element.node().getBBox();
    }
    catch (err) {
        bbox = { x: 0, y: 0, width: 0, height: 0 };
    }
    return bbox;
}
exports.elementBBox = elementBBox;
/**
 * Screen refresh rate which is assumed to be 60fps
 */
exports.SCREEN_REFRESH_RATE_MILLISECONDS = 1000 / 60;
/**
 * Polyfill for `window.requestAnimationFrame`.
 * If the function exists, then we use the function directly.
 * Otherwise, we set a timeout on `SCREEN_REFRESH_RATE_MILLISECONDS` and then perform the function.
 *
 * @param {() => void} callback The callback to call in the next animation frame
 */
function requestAnimationFramePolyfill(callback) {
    if (window.requestAnimationFrame != null) {
        window.requestAnimationFrame(callback);
    }
    else {
        setTimeout(callback, exports.SCREEN_REFRESH_RATE_MILLISECONDS);
    }
}
exports.requestAnimationFramePolyfill = requestAnimationFramePolyfill;
/**
 * Calculates the width of the element.
 * The width includes the padding and the border on the element's left and right sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The width of the element.
 */
function elementWidth(elementOrSelection) {
    var element = elementOrSelection instanceof d3.selection
        ? elementOrSelection.node()
        : elementOrSelection;
    var style = window.getComputedStyle(element);
    return _parseStyleValue(style, "width")
        + _parseStyleValue(style, "padding-left")
        + _parseStyleValue(style, "padding-right")
        + _parseStyleValue(style, "border-left-width")
        + _parseStyleValue(style, "border-right-width");
}
exports.elementWidth = elementWidth;
/**
 * Calculates the height of the element.
 * The height includes the padding the and the border on the element's top and bottom sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The height of the element
 */
function elementHeight(elementOrSelection) {
    var element = elementOrSelection instanceof d3.selection
        ? elementOrSelection.node()
        : elementOrSelection;
    var style = window.getComputedStyle(element);
    return _parseStyleValue(style, "height")
        + _parseStyleValue(style, "padding-top")
        + _parseStyleValue(style, "padding-bottom")
        + _parseStyleValue(style, "border-top-width")
        + _parseStyleValue(style, "border-bottom-width");
}
exports.elementHeight = elementHeight;
// taken from the BNF at https://www.w3.org/TR/SVG/coords.html
var WSP = "\\s";
var NUMBER = "(?:[-+]?[0-9]*\\.?[0-9]+)";
var COMMA_WSP = "(?:(?:" + WSP + "+,?" + WSP + "*)|(?:," + WSP + "*))";
var TRANSLATE_REGEX = new RegExp("translate" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")(?:" + COMMA_WSP + "(" + NUMBER + "))?" + WSP + "*\\)");
var ROTATE_REGEX = new RegExp("rotate" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")" + WSP + "*\\)");
var SCALE_REGEX = new RegExp("scale" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")(?:" + COMMA_WSP + "(" + NUMBER + "))?" + WSP + "*\\)");
/**
 * Accepts selections whose .transform contain a "translate(a, b)" and extracts the a and b
 */
function getTranslateValues(el) {
    var match = TRANSLATE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var translateX = match[1], _a = match[2], translateY = _a === void 0 ? 0 : _a;
        return [+translateX, +translateY];
    }
    else {
        return [0, 0];
    }
}
exports.getTranslateValues = getTranslateValues;
/**
 * Accepts selections whose .transform contain a "rotate(angle)" and returns the angle
 */
function getRotate(el) {
    var match = ROTATE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var rotation = match[1];
        return +rotation;
    }
    else {
        return 0;
    }
}
exports.getRotate = getRotate;
function getScaleValues(el) {
    var match = SCALE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var scaleX = match[1], scaleY = match[2];
        return [+scaleX, scaleY == null ? +scaleX : +scaleY];
    }
    else {
        return [0, 0];
    }
}
exports.getScaleValues = getScaleValues;
/**
 * Checks if the first ClientRect overlaps the second.
 *
 * @param {ClientRect} clientRectA The first ClientRect
 * @param {ClientRect} clientRectB The second ClientRect
 * @returns {boolean} If the ClientRects overlap each other.
 */
function clientRectsOverlap(clientRectA, clientRectB) {
    if (nativeMath.floor(clientRectA.right) <= nativeMath.ceil(clientRectB.left)) {
        return false;
    }
    if (nativeMath.ceil(clientRectA.left) >= nativeMath.floor(clientRectB.right)) {
        return false;
    }
    if (nativeMath.floor(clientRectA.bottom) <= nativeMath.ceil(clientRectB.top)) {
        return false;
    }
    if (nativeMath.ceil(clientRectA.top) >= nativeMath.floor(clientRectB.bottom)) {
        return false;
    }
    return true;
}
exports.clientRectsOverlap = clientRectsOverlap;
/**
 * Return a new ClientRect that is the old ClientRect expanded by amount in all directions.
 * @param rect
 * @param amount
 */
function expandRect(rect, amount) {
    return {
        left: rect.left - amount,
        top: rect.top - amount,
        right: rect.right + amount,
        bottom: rect.bottom + amount,
        width: rect.width + amount * 2,
        height: rect.height + amount * 2,
    };
}
exports.expandRect = expandRect;
/**
 * Returns true if and only if innerClientRect is inside outerClientRect.
 *
 * @param {ClientRect} innerClientRect The first ClientRect
 * @param {ClientRect} outerClientRect The second ClientRect
 * @returns {boolean} If and only if the innerClientRect is inside outerClientRect.
 */
function clientRectInside(innerClientRect, outerClientRect) {
    return (nativeMath.floor(outerClientRect.left) <= nativeMath.ceil(innerClientRect.left) &&
        nativeMath.floor(outerClientRect.top) <= nativeMath.ceil(innerClientRect.top) &&
        nativeMath.floor(innerClientRect.right) <= nativeMath.ceil(outerClientRect.right) &&
        nativeMath.floor(innerClientRect.bottom) <= nativeMath.ceil(outerClientRect.bottom));
}
exports.clientRectInside = clientRectInside;
/**
 * Returns true if the supplied coordinates or Ranges intersect or are contained by bbox.
 *
 * @param {number | Range} xValOrRange The x coordinate or Range to test
 * @param {number | Range} yValOrRange The y coordinate or Range to test
 * @param {SVGRect} bbox The bbox
 * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
 * testing intersection
 *
 * @returns {boolean} True if the supplied coordinates or Ranges intersect or are
 * contained by bbox, false otherwise.
 */
function intersectsBBox(xValOrRange, yValOrRange, bbox, tolerance) {
    if (tolerance === void 0) { tolerance = 0.5; }
    var xRange = _parseRange(xValOrRange);
    var yRange = _parseRange(yValOrRange);
    // SVGRects are positioned with sub-pixel accuracy (the default unit
    // for the x, y, height & width attributes), but user selections (e.g. via
    // mouse events) usually have pixel accuracy. A tolerance of half-a-pixel
    // seems appropriate.
    return bbox.x + bbox.width >= xRange.min - tolerance &&
        bbox.x <= xRange.max + tolerance &&
        bbox.y + bbox.height >= yRange.min - tolerance &&
        bbox.y <= yRange.max + tolerance;
}
exports.intersectsBBox = intersectsBBox;
/**
 * Create a Range from a number or an object with "min" and "max" defined.
 *
 * @param {any} input The object to parse
 *
 * @returns {Range} The generated Range
 */
function _parseRange(input) {
    if (typeof (input) === "number") {
        var value = input;
        return { min: value, max: value };
    }
    var range = input;
    if (range instanceof Object && "min" in range && "max" in range) {
        return range;
    }
    throw new Error("input '" + input + "' can't be parsed as an Range");
}
function _parseStyleValue(style, property) {
    var value = style.getPropertyValue(property);
    var parsedValue = parseFloat(value);
    return parsedValue || 0;
}


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Math = __webpack_require__(28);
/**
 * Array-backed implementation of {EntityStore}
 */
var EntityArray = (function () {
    function EntityArray() {
        this._entities = [];
    }
    EntityArray.prototype.add = function (entity) {
        this._entities.push(entity);
    };
    /**
     * Iterates through array of of entities and computes the closest point using
     * the standard Euclidean distance formula.
     */
    EntityArray.prototype.entityNearest = function (queryPoint, filter) {
        var closestDistanceSquared = Infinity;
        var closestPointEntity;
        this._entities.forEach(function (entity) {
            if (filter !== undefined && !filter(entity)) {
                return;
            }
            var distanceSquared = Math.distanceSquared(entity.position, queryPoint);
            if (distanceSquared < closestDistanceSquared) {
                closestDistanceSquared = distanceSquared;
                closestPointEntity = entity;
            }
        });
        if (closestPointEntity === undefined) {
            return undefined;
        }
        return closestPointEntity;
    };
    EntityArray.prototype.map = function (callback) {
        return this._entities.map(function (entity) { return callback(entity); });
    };
    EntityArray.prototype.forEach = function (callback) {
        return this._entities.forEach(callback);
    };
    return EntityArray;
}());
exports.EntityArray = EntityArray;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Math = __webpack_require__(28);
/**
 * Shim for ES6 map.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
var Map = (function () {
    function Map() {
        if (typeof window.Map === "function") {
            this._es6Map = new window.Map();
        }
        else {
            this._keyValuePairs = [];
        }
    }
    Map.prototype.set = function (key, value) {
        if (Math.isNaN(key)) {
            throw new Error("NaN may not be used as a key to the Map");
        }
        if (this._es6Map != null) {
            this._es6Map.set(key, value);
            return this;
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                this._keyValuePairs[i].value = value;
                return this;
            }
        }
        this._keyValuePairs.push({ key: key, value: value });
        return this;
    };
    Map.prototype.get = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.get(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                return this._keyValuePairs[i].value;
            }
        }
        return undefined;
    };
    Map.prototype.has = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.has(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                return true;
            }
        }
        return false;
    };
    Map.prototype.forEach = function (callbackFn, thisArg) {
        var _this = this;
        if (this._es6Map != null) {
            var callbackWrapper = function (value, key) { return callbackFn.call(thisArg, value, key, _this); };
            this._es6Map.forEach(callbackWrapper, thisArg);
            return;
        }
        this._keyValuePairs.forEach(function (keyValuePair) {
            callbackFn.call(thisArg, keyValuePair.value, keyValuePair.key, _this);
        });
    };
    Map.prototype.delete = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.delete(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                this._keyValuePairs.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    return Map;
}());
exports.Map = Map;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var makeEnum_1 = __webpack_require__(125);
/**
 * Option type for stacking direction. By default, stacked bar and area charts
 * put the first data series at the bottom of the axis ("bottomup"), but this
 * can be reversed with the "topdown" option, which produces a stacking order
 * that matches the order of series in the legend.
 */
exports.IStackingOrder = makeEnum_1.makeEnum(["topdown", "bottomup"]);
var nativeMath = window.Math;
/**
 * Computes the StackingResult (value and offset) for each data point in each Dataset.
 *
 * @param {Dataset[]} datasets The Datasets to be stacked on top of each other in the order of stacking
 * @param {Accessor<any>} keyAccessor Accessor for the key of the data
 * @param {Accessor<number>} valueAccessor Accessor for the value of the data
 * @param {IStackingOrder} stackingOrder The order of stacking (default "bottomup")
 * @return {StackingResult} value and offset for each datapoint in each Dataset
 */
function stack(datasets, keyAccessor, valueAccessor, stackingOrder) {
    if (stackingOrder === void 0) { stackingOrder = "bottomup"; }
    var positiveOffsets = d3.map();
    var negativeOffsets = d3.map();
    var datasetToKeyToStackedDatum = new Utils.Map();
    if (stackingOrder === "topdown") {
        datasets = datasets.slice();
        datasets.reverse();
    }
    datasets.forEach(function (dataset) {
        var keyToStackedDatum = new Utils.Map();
        dataset.data().forEach(function (datum, index) {
            var key = normalizeKey(keyAccessor(datum, index, dataset));
            var value = +valueAccessor(datum, index, dataset);
            var offset;
            var offsetMap = (value >= 0) ? positiveOffsets : negativeOffsets;
            if (offsetMap.has(key)) {
                offset = offsetMap.get(key);
                offsetMap.set(key, offset + value);
            }
            else {
                offset = 0;
                offsetMap.set(key, value);
            }
            keyToStackedDatum.set(key, {
                offset: offset,
                value: value,
                axisValue: keyAccessor(datum, index, dataset),
            });
        });
        datasetToKeyToStackedDatum.set(dataset, keyToStackedDatum);
    });
    return datasetToKeyToStackedDatum;
}
exports.stack = stack;
/**
 * Computes the maximum and minimum extents of each stack individually.
 *
 * @param {GenericStackingResult} stackingResult The value and offset information for each datapoint in each dataset
 * @return { { maximumExtents: Utils.Map<D, number>, minimumExtents: Utils.Map<D, number> } } The maximum and minimum extents
 * of each individual stack.
 */
function stackedExtents(stackingResult) {
    var maximumExtents = new Utils.Map();
    var minimumExtents = new Utils.Map();
    stackingResult.forEach(function (stack) {
        stack.forEach(function (datum, key) {
            // correctly handle negative bar stacks
            var maximalValue = Utils.Math.max([datum.offset + datum.value, datum.offset], datum.offset);
            var minimalValue = Utils.Math.min([datum.offset + datum.value, datum.offset], datum.offset);
            if (!maximumExtents.has(key)) {
                maximumExtents.set(key, { extent: maximalValue, axisValue: datum.axisValue });
            }
            else if (maximumExtents.get(key).extent < maximalValue) {
                maximumExtents.set(key, { extent: maximalValue, axisValue: datum.axisValue });
            }
            if (!minimumExtents.has(key)) {
                minimumExtents.set(key, { extent: minimalValue, axisValue: datum.axisValue });
            }
            else if (minimumExtents.get(key).extent > (minimalValue)) {
                minimumExtents.set(key, { extent: minimalValue, axisValue: datum.axisValue });
            }
        });
    });
    return { maximumExtents: maximumExtents, minimumExtents: minimumExtents };
}
exports.stackedExtents = stackedExtents;
/**
 * Computes the total extent over all data points in all Datasets, taking stacking into consideration.
 *
 * @param {StackingResult} stackingResult The value and offset information for each datapoint in each dataset
 * @param {Accessor<any>} keyAccessor Accessor for the key of the data existent in the stackingResult
 * @param {Accessor<boolean>} filter A filter for data to be considered when computing the total extent
 * @return {[number, number]} The total extent
 */
function stackedExtent(stackingResult, keyAccessor, filter) {
    var extents = [];
    stackingResult.forEach(function (stackedDatumMap, dataset) {
        dataset.data().forEach(function (datum, index) {
            if (filter != null && !filter(datum, index, dataset)) {
                return;
            }
            var stackedDatum = stackedDatumMap.get(normalizeKey(keyAccessor(datum, index, dataset)));
            extents.push(stackedDatum.value + stackedDatum.offset);
        });
    });
    var maxStackExtent = Utils.Math.max(extents, 0);
    var minStackExtent = Utils.Math.min(extents, 0);
    return [nativeMath.min(minStackExtent, 0), nativeMath.max(0, maxStackExtent)];
}
exports.stackedExtent = stackedExtent;
/**
 * Normalizes a key used for stacking
 *
 * @param {any} key The key to be normalized
 * @return {string} The stringified key
 */
function normalizeKey(key) {
    return String(key);
}
exports.normalizeKey = normalizeKey;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var d3 = __webpack_require__(1);
var Utils = __webpack_require__(0);
var _TRANSLATOR_KEY = "__Plottable_ClientTranslator";
function getTranslator(component) {
    // The Translator works by first calculating the offset to root of the chart and then calculating
    // the offset from the component to the root. It is imperative that the _measurementElement
    // be added to the root of the hierarchy and nowhere else.
    var root = component.root().rootElement().node();
    var translator = root[_TRANSLATOR_KEY];
    if (translator == null) {
        var measurer = document.createElementNS(root.namespaceURI, "svg");
        measurer.setAttribute("class", "measurer");
        measurer.setAttribute("style", "opacity: 0; visibility: hidden; position: absolute; width: 1px; height: 1px;");
        root.appendChild(measurer);
        translator = new Translator(d3.select(measurer));
        root[_TRANSLATOR_KEY] = translator;
    }
    return translator;
}
exports.getTranslator = getTranslator;
/**
 * Applies position as a style and attribute to the svg element
 * as the position of the element varies by the type of parent.
 * When nested within an SVG, the attribute position is respected.
 * When nested within an HTML, the style position is respected.
 */
function move(node, x, y) {
    node.styles({ left: x + "px", top: y + "px" });
    node.attrs({ x: "" + x, y: "" + y });
}
var Translator = (function () {
    function Translator(measurementElement) {
        this._measurementElement = measurementElement;
    }
    /**
     * Computes the position relative to the component. Converts screen clientX/clientY
     * coordinates to the coordinates relative to the measurementElement, taking into
     * account transform() factors from CSS or SVG up the DOM tree.
     */
    Translator.prototype.computePosition = function (clientX, clientY) {
        // get the origin
        move(this._measurementElement, 0, 0);
        var mrBCR = this._measurementElement.node().getBoundingClientRect();
        var origin = { x: mrBCR.left, y: mrBCR.top };
        // calculate the scale
        move(this._measurementElement, Translator.SAMPLE_DISTANCE, Translator.SAMPLE_DISTANCE);
        mrBCR = this._measurementElement.node().getBoundingClientRect();
        var testPoint = { x: mrBCR.left, y: mrBCR.top };
        // invalid measurements -- SVG might not be in the DOM
        if (origin.x === testPoint.x || origin.y === testPoint.y) {
            return null;
        }
        var scaleX = (testPoint.x - origin.x) / Translator.SAMPLE_DISTANCE;
        var scaleY = (testPoint.y - origin.y) / Translator.SAMPLE_DISTANCE;
        // get the true cursor position
        move(this._measurementElement, ((clientX - origin.x) / scaleX), ((clientY - origin.y) / scaleY));
        mrBCR = this._measurementElement.node().getBoundingClientRect();
        var trueCursorPosition = { x: mrBCR.left, y: mrBCR.top };
        var scaledPosition = {
            x: (trueCursorPosition.x - origin.x) / scaleX,
            y: (trueCursorPosition.y - origin.y) / scaleY,
        };
        return scaledPosition;
    };
    Translator.prototype.isInside = function (component, e) {
        return Utils.DOM.contains(component.root().rootElement().node(), e.target);
    };
    return Translator;
}());
Translator.SAMPLE_DISTANCE = 100;
exports.Translator = Translator;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

var Configs = __webpack_require__(20);
/**
 * Print a warning message to the console, if it is available.
 *
 * @param {string} The warnings to print
 */
function warn(warning) {
    if (!Configs.SHOW_WARNINGS) {
        return;
    }
    /* tslint:disable:no-console */
    if (window.console != null) {
        if (window.console.warn != null) {
            console.warn(warning);
        }
        else if (window.console.log != null) {
            console.log(warning);
        }
    }
    /* tslint:enable:no-console */
}
exports.warn = warn;
/**
 * Is like setTimeout, but activates synchronously if time=0
 * We special case 0 because of an observed issue where calling setTimeout causes visible flickering.
 * We believe this is because when requestAnimationFrame calls into the paint function, as soon as that function finishes
 * evaluating, the results are painted to the screen. As a result, if we want something to occur immediately but call setTimeout
 * with time=0, then it is pushed to the call stack and rendered in the next frame, so the component that was rendered via
 * setTimeout appears out-of-sync with the rest of the plot.
 */
function setTimeout(f, time) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (time === 0) {
        f(args);
        return -1;
    }
    else {
        return window.setTimeout(f, time, args);
    }
}
exports.setTimeout = setTimeout;
/**
 * Sends a deprecation warning to the console. The warning includes the name of the deprecated method,
 * version number of the deprecation, and an optional message.
 *
 * To be used in the first line of a deprecated method.
 *
 * @param {string} callingMethod The name of the method being deprecated
 * @param {string} version The version when the tagged method became obsolete
 * @param {string?} message Optional message to be shown with the warning
 */
function deprecated(callingMethod, version, message) {
    if (message === void 0) { message = ""; }
    warn("Method " + callingMethod + " has been deprecated in version " + version +
        ". Please refer to the release notes. " + message);
}
exports.deprecated = deprecated;


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_linear__ = __webpack_require__(110);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeLinear", function() { return __WEBPACK_IMPORTED_MODULE_0__src_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_quad__ = __webpack_require__(112);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuad", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubic__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubic", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_poly__ = __webpack_require__(111);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePoly", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_sin__ = __webpack_require__(113);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSin", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_exp__ = __webpack_require__(109);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExp", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_circle__ = __webpack_require__(106);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircle", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_bounce__ = __webpack_require__(105);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounce", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_back__ = __webpack_require__(104);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBack", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_elastic__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElastic", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["c"]; });





















/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return backInOut; });
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = bounceIn;
/* harmony export (immutable) */ __webpack_exports__["a"] = bounceOut;
/* harmony export (immutable) */ __webpack_exports__["c"] = bounceInOut;
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = circleIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = circleOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = circleInOut;
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cubicIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = cubicOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicInOut;
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return elasticIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elasticOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return elasticInOut; });
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = expIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = expOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = expInOut;
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = linear;
function linear(t) {
  return +t;
}


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return polyIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return polyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return polyInOut; });
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = quadIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = quadOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = quadInOut;
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sinIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = sinOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = sinInOut;
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var DEFAULT_FILL_COLOR = "#444";
/**
 * A typesetter context for HTML5 Canvas.
 *
 * Due to the Canvas API, you must explicitly define the line height, and any
 * styling for the font must also be explicitly defined in the optional
 * `ICanvasFontStyle` object.
 */
var CanvasContext = (function () {
    function CanvasContext(ctx, lineHeight, style) {
        if (lineHeight === void 0) { lineHeight = 10; }
        if (style === void 0) { style = {}; }
        var _this = this;
        this.ctx = ctx;
        this.lineHeight = lineHeight;
        this.style = style;
        this.createRuler = function () {
            return function (text) {
                _this.ctx.font = _this.style.font;
                var width = _this.ctx.measureText(text).width;
                return { width: width, height: _this.lineHeight };
            };
        };
        this.createPen = function (_text, transform, ctx) {
            if (ctx == null) {
                ctx = _this.ctx;
            }
            ctx.save();
            ctx.translate(transform.translate[0], transform.translate[1]);
            ctx.rotate(transform.rotate * Math.PI / 180.0);
            return _this.createCanvasPen(ctx);
        };
        if (this.style.fill === undefined) {
            this.style.fill = DEFAULT_FILL_COLOR;
        }
    }
    CanvasContext.prototype.createCanvasPen = function (ctx) {
        var _this = this;
        return {
            destroy: function () {
                ctx.restore();
            },
            write: function (line, anchor, xOffset, yOffset) {
                ctx.textAlign = anchor;
                if (_this.style.font != null) {
                    ctx.font = _this.style.font;
                }
                if (_this.style.fill != null) {
                    ctx.fillStyle = _this.style.fill;
                    ctx.fillText(line, xOffset, yOffset);
                }
                if (_this.style.stroke != null) {
                    ctx.strokeStyle = _this.style.fill;
                    ctx.strokeText(line, xOffset, yOffset);
                }
            },
        };
    };
    return CanvasContext;
}());
exports.CanvasContext = CanvasContext;
//# sourceMappingURL=canvas.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var SvgUtils = (function () {
    function SvgUtils() {
    }
    /**
     * Appends an SVG element with the specified tag name to the provided element.
     * The variadic classnames are added to the new element.
     *
     * Returns the new element.
     */
    SvgUtils.append = function (element, tagName) {
        var classNames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            classNames[_i - 2] = arguments[_i];
        }
        var child = SvgUtils.create.apply(SvgUtils, [tagName].concat(classNames));
        element.appendChild(child);
        return child;
    };
    /**
     * Creates and returns a new SVGElement with the attached classnames.
     */
    SvgUtils.create = function (tagName) {
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        var element = document.createElementNS(SvgUtils.SVG_NS, tagName);
        SvgUtils.addClasses.apply(SvgUtils, [element].concat(classNames));
        return element;
    };
    /**
     * Adds the variadic classnames to the element
     */
    SvgUtils.addClasses = function (element) {
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        classNames = classNames.filter(function (c) { return c != null; });
        if (element.classList != null) {
            classNames.forEach(function (className) {
                element.classList.add(className);
            });
        }
        else {
            // IE 11 does not support classList
            element.setAttribute("class", classNames.join(" "));
        }
    };
    /**
     * Returns the width/height of svg element's bounding box
     */
    SvgUtils.getDimensions = function (element) {
        // using feature detection, safely return the bounding box dimensions of the
        // provided svg element
        if (element.getBBox) {
            try {
                var _a = element.getBBox(), width = _a.width, height = _a.height;
                // copy to prevent NoModificationAllowedError
                return { width: width, height: height };
            }
            catch (err) {
            }
        }
        // if can't get valid bbox, return 0,0
        return { height: 0, width: 0 };
    };
    return SvgUtils;
}());
SvgUtils.SVG_NS = "http://www.w3.org/2000/svg";
exports.SvgUtils = SvgUtils;
/**
 * A typesetter context for SVG.
 *
 * @param element - The CSS font styles applied to `element` will determine the
 * size of text measurements. Also the default text block container.
 * @param className - added to new text blocks
 * @param addTitleElement - enable title tags to be added to new text blocks.
 */
var SvgContext = (function () {
    function SvgContext(element, className, addTitleElement) {
        if (addTitleElement === void 0) { addTitleElement = false; }
        var _this = this;
        this.element = element;
        this.className = className;
        this.addTitleElement = addTitleElement;
        this.createRuler = function () {
            var _a = _this.getTextElements(_this.element), parentElement = _a.parentElement, containerElement = _a.containerElement, textElement = _a.textElement;
            return function (text) {
                parentElement.appendChild(containerElement);
                textElement.textContent = text;
                var dimensions = SvgUtils.getDimensions(textElement);
                parentElement.removeChild(containerElement); // element.remove() doesn't work in IE11
                return dimensions;
            };
        };
        this.createPen = function (text, transform, element) {
            if (element == null) {
                element = _this.element;
            }
            var textContainer = SvgUtils.append(element, "g", "text-container", _this.className);
            // attach optional title
            if (_this.addTitleElement) {
                SvgUtils.append(textContainer, "title").textContent = text;
                textContainer.setAttribute("title", text);
            }
            // create and transform text block group
            var textBlockGroup = SvgUtils.append(textContainer, "g", "text-area");
            textBlockGroup.setAttribute("transform", "translate(" + transform.translate[0] + "," + transform.translate[1] + ")" +
                ("rotate(" + transform.rotate + ")"));
            return _this.createSvgLinePen(textBlockGroup);
        };
    }
    SvgContext.prototype.setAddTitleElement = function (addTitleElement) {
        this.addTitleElement = addTitleElement;
    };
    SvgContext.prototype.createSvgLinePen = function (textBlockGroup) {
        return {
            write: function (line, anchor, xOffset, yOffset) {
                var element = SvgUtils.append(textBlockGroup, "text", "text-line");
                element.textContent = line;
                element.setAttribute("text-anchor", anchor);
                element.setAttribute("transform", "translate(" + xOffset + "," + yOffset + ")");
                element.setAttribute("y", "-0.25em");
            },
        };
    };
    SvgContext.prototype.getTextElements = function (element) {
        // if element is already a text element, return it
        if (element.tagName === "text") {
            var parentElement = element.parentElement;
            if (parentElement == null) {
                parentElement = element.parentNode;
            }
            // must be removed from parent since we re-add it on every measurement
            parentElement.removeChild(element);
            return {
                containerElement: element,
                parentElement: parentElement,
                textElement: element,
            };
        }
        // if element has a text element descendent, select it and return it
        var selected = element.querySelector("text");
        if (selected != null) {
            var parentElement = element.parentElement;
            if (parentElement == null) {
                parentElement = element.parentNode;
            }
            // must be removed from parent since we re-add it on every measurement
            parentElement.removeChild(element);
            return {
                containerElement: element,
                parentElement: parentElement,
                textElement: selected,
            };
        }
        // otherwise create a new text element
        var created = SvgUtils.create("text", this.className);
        return {
            containerElement: created,
            parentElement: element,
            textElement: created,
        };
    };
    return SvgContext;
}());
exports.SvgContext = SvgContext;
//# sourceMappingURL=svg.js.map

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = __webpack_require__(18);
var abstractMeasurer_1 = __webpack_require__(29);
var cacheCharacterMeasurer_1 = __webpack_require__(42);
var CacheMeasurer = (function (_super) {
    __extends(CacheMeasurer, _super);
    function CacheMeasurer(ruler) {
        var _this = _super.call(this, ruler) || this;
        _this.dimCache = new utils_1.Cache(function (s) {
            return _this._measureNotFromCache(s);
        });
        return _this;
    }
    CacheMeasurer.prototype._measureNotFromCache = function (s) {
        return _super.prototype.measure.call(this, s);
    };
    CacheMeasurer.prototype.measure = function (s) {
        if (s === void 0) { s = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        return this.dimCache.get(s);
    };
    CacheMeasurer.prototype.reset = function () {
        this.dimCache.clear();
        _super.prototype.reset.call(this);
    };
    return CacheMeasurer;
}(cacheCharacterMeasurer_1.CacheCharacterMeasurer));
exports.CacheMeasurer = CacheMeasurer;
//# sourceMappingURL=cacheMeasurer.js.map

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var contexts_1 = __webpack_require__(41);
var measurers_1 = __webpack_require__(44);
var wrappers_1 = __webpack_require__(46);
var writers_1 = __webpack_require__(48);
/**
 * This is a convenience interface for typesetting strings using the default
 * measurer/wrapper/writer setup.
 */
var Typesetter = (function () {
    function Typesetter(context) {
        this.context = context;
        this.measurer = new measurers_1.CacheMeasurer(this.context);
        this.wrapper = new wrappers_1.Wrapper();
        this.writer = new writers_1.Writer(this.measurer, this.context, this.wrapper);
    }
    Typesetter.svg = function (element, className, addTitleElement) {
        return new Typesetter(new contexts_1.SvgContext(element, className, addTitleElement));
    };
    Typesetter.canvas = function (ctx, lineHeight, style) {
        return new Typesetter(new contexts_1.CanvasContext(ctx, lineHeight, style));
    };
    /**
     * Wraps the given string into the width/height and writes it into the
     * canvas or SVG (depending on context).
     *
     * Delegates to `Writer.write` using the internal `ITypesetterContext`.
     */
    Typesetter.prototype.write = function (text, width, height, options, into) {
        this.writer.write(text, width, height, options, into);
    };
    /**
     * Clears the `Measurer`'s CacheMeasurer.
     *
     * Call this if your font style changee in SVG.
     */
    Typesetter.prototype.clearMeasurerCache = function () {
        this.measurer.reset();
    };
    return Typesetter;
}());
exports.Typesetter = Typesetter;
//# sourceMappingURL=typesetter.js.map

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var Cache = (function () {
    /**
     * @constructor
     *
     * @param {string} compute The function whose results will be cached.
     */
    function Cache(compute) {
        this.cache = {};
        this.compute = compute;
    }
    /**
     * Attempt to look up k in the cache, computing the result if it isn't
     * found.
     *
     * @param {string} k The key to look up in the cache.
     * @return {T} The value associated with k; the result of compute(k).
     */
    Cache.prototype.get = function (k) {
        if (!this.cache.hasOwnProperty(k)) {
            this.cache[k] = this.compute(k);
        }
        return this.cache[k];
    };
    /**
     * Reset the cache empty.
     *
     * @return {Cache<T>} The calling Cache.
     */
    Cache.prototype.clear = function () {
        this.cache = {};
        return this;
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var Methods = (function () {
    function Methods() {
    }
    /**
     * Check if two arrays are equal by strict equality.
     */
    Methods.arrayEq = function (a, b) {
        // Technically, null and undefined are arrays too
        if (a == null || b == null) {
            return a === b;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {any} a Object to check against b for equality.
     * @param {any} b Object to check against a for equality.
     *
     * @returns {boolean} whether or not two objects share the same keys, and
     *          values associated with those keys. Values will be compared
     *          with ===.
     */
    Methods.objEq = function (a, b) {
        if (a == null || b == null) {
            return a === b;
        }
        var keysA = Object.keys(a).sort();
        var keysB = Object.keys(b).sort();
        var valuesA = keysA.map(function (k) { return a[k]; });
        var valuesB = keysB.map(function (k) { return b[k]; });
        return Methods.arrayEq(keysA, keysB) && Methods.arrayEq(valuesA, valuesB);
    };
    Methods.strictEq = function (a, b) {
        return a === b;
    };
    /**
     * Shim for _.defaults
     */
    Methods.defaults = function (target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var result = Object(target);
        objects.forEach(function (obj) {
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        result[key] = obj[key];
                    }
                }
            }
        });
        return result;
    };
    return Methods;
}());
exports.Methods = Methods;
//# sourceMappingURL=methods.js.map

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var StringMethods = (function () {
    function StringMethods() {
    }
    /**
     * Treat all sequences of consecutive spaces as a single " ".
     */
    StringMethods.combineWhitespace = function (str) {
        return str.replace(/[ \t]+/g, " ");
    };
    StringMethods.isNotEmptyString = function (str) {
        return str && str.trim() !== "";
    };
    StringMethods.trimStart = function (str, splitter) {
        if (!str) {
            return str;
        }
        var chars = str.split("");
        var reduceFunction = splitter ? function (s) { return s.split(splitter).some(StringMethods.isNotEmptyString); }
            : StringMethods.isNotEmptyString;
        return chars.reduce(function (s, c) { return reduceFunction(s + c) ? s + c : s; }, "");
    };
    StringMethods.trimEnd = function (str, c) {
        if (!str) {
            return str;
        }
        var reversedChars = str.split("");
        reversedChars.reverse();
        reversedChars = StringMethods.trimStart(reversedChars.join(""), c).split("");
        reversedChars.reverse();
        return reversedChars.join("");
    };
    return StringMethods;
}());
exports.StringMethods = StringMethods;
//# sourceMappingURL=stringMethods.js.map

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var Tokenizer = (function () {
    function Tokenizer() {
        this.WordDividerRegExp = new RegExp("\\W");
        this.WhitespaceRegExp = new RegExp("\\s");
    }
    Tokenizer.prototype.tokenize = function (line) {
        var _this = this;
        return line.split("").reduce(function (tokens, c) {
            return tokens.slice(0, -1).concat(_this.shouldCreateNewToken(tokens[tokens.length - 1], c));
        }, [""]);
    };
    Tokenizer.prototype.shouldCreateNewToken = function (token, newCharacter) {
        if (!token) {
            return [newCharacter];
        }
        var lastCharacter = token[token.length - 1];
        if (this.WhitespaceRegExp.test(lastCharacter) && this.WhitespaceRegExp.test(newCharacter)) {
            return [token + newCharacter];
        }
        else if (this.WhitespaceRegExp.test(lastCharacter) || this.WhitespaceRegExp.test(newCharacter)) {
            return [token, newCharacter];
        }
        else if (!(this.WordDividerRegExp.test(lastCharacter) || this.WordDividerRegExp.test(newCharacter))) {
            return [token + newCharacter];
        }
        else if (lastCharacter === newCharacter) {
            return [token + newCharacter];
        }
        else {
            return [token, newCharacter];
        }
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wrapper_1 = __webpack_require__(47);
var SingleLineWrapper = (function (_super) {
    __extends(SingleLineWrapper, _super);
    function SingleLineWrapper() {
        return _super.apply(this, arguments) || this;
    }
    SingleLineWrapper.prototype.wrap = function (text, measurer, width, height) {
        var _this = this;
        if (height === void 0) { height = Infinity; }
        var lines = text.split("\n");
        if (lines.length > 1) {
            throw new Error("SingleLineWrapper is designed to work only on single line");
        }
        var wrapFN = function (w) { return _super.prototype.wrap.call(_this, text, measurer, w, height); };
        var result = wrapFN(width);
        if (result.noLines < 2) {
            return result;
        }
        var left = 0;
        var right = width;
        for (var i = 0; i < SingleLineWrapper.NO_WRAP_ITERATIONS && right > left; ++i) {
            var currentWidth = (right + left) / 2;
            var currentResult = wrapFN(currentWidth);
            if (this.areSameResults(result, currentResult)) {
                right = currentWidth;
                result = currentResult;
            }
            else {
                left = currentWidth;
            }
        }
        return result;
    };
    SingleLineWrapper.prototype.areSameResults = function (one, two) {
        return one.noLines === two.noLines && one.truncatedText === two.truncatedText;
    };
    return SingleLineWrapper;
}(wrapper_1.Wrapper));
SingleLineWrapper.NO_WRAP_ITERATIONS = 5;
exports.SingleLineWrapper = SingleLineWrapper;
//# sourceMappingURL=singleLineWrapper.js.map

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */

var utils_1 = __webpack_require__(18);
var DEFAULT_WRITE_OPTIONS = {
    textRotation: 0,
    textShear: 0,
    xAlign: "left",
    yAlign: "top",
};
var Writer = (function () {
    function Writer(_measurer, _penFactory, _wrapper) {
        this._measurer = _measurer;
        this._penFactory = _penFactory;
        this._wrapper = _wrapper;
    }
    Writer.prototype.measurer = function (newMeasurer) {
        this._measurer = newMeasurer;
        return this;
    };
    Writer.prototype.wrapper = function (newWrapper) {
        this._wrapper = newWrapper;
        return this;
    };
    Writer.prototype.penFactory = function (newPenFactory) {
        this._penFactory = newPenFactory;
        return this;
    };
    /**
     * Writes the text into the container. If no container is specified, the pen's
     * default container will be used.
     */
    Writer.prototype.write = function (text, width, height, options, container) {
        if (options === void 0) { options = {}; }
        // apply default options
        options = utils_1.Methods.defaults({}, DEFAULT_WRITE_OPTIONS, options);
        // validate input
        if (Writer.SupportedRotation.indexOf(options.textRotation) === -1) {
            throw new Error("unsupported rotation - " + options.textRotation +
                ". Supported rotations are " + Writer.SupportedRotation.join(", "));
        }
        if (options.textShear != null && options.textShear < -80 || options.textShear > 80) {
            throw new Error("unsupported shear angle - " + options.textShear + ". Must be between -80 and 80");
        }
        var orientHorizontally = Math.abs(Math.abs(options.textRotation) - 90) > 45;
        var primaryDimension = orientHorizontally ? width : height;
        var secondaryDimension = orientHorizontally ? height : width;
        // compute shear parameters
        var shearDegrees = options.textShear;
        var shearRadians = shearDegrees * Math.PI / 180;
        var lineHeight = this._measurer.measure().height;
        var shearShift = lineHeight * Math.tan(shearRadians);
        // When we apply text shear, the primary axis grows and the secondary axis
        // shrinks, due to trigonometry. The text shear feature uses the normal
        // wrapping logic with a subsituted bounding box of the corrected size
        // (computed below). When rendering the wrapped lines, we rotate the text
        // container by the text rotation angle AND the shear angle then carefully
        // offset each one so that they are still aligned to the primary alignment
        // option.
        var shearCorrectedPrimaryDimension = primaryDimension / Math.cos(shearRadians) - Math.abs(shearShift);
        var shearCorrectedSecondaryDimension = secondaryDimension * Math.cos(shearRadians);
        // normalize and wrap text
        var normalizedText = utils_1.StringMethods.combineWhitespace(text);
        var wrappedText = this._wrapper ?
            this._wrapper.wrap(normalizedText, this._measurer, shearCorrectedPrimaryDimension, shearCorrectedSecondaryDimension).wrappedText : normalizedText;
        var lines = wrappedText.split("\n");
        // correct the intial x/y offset of the text container accounting shear and alignment
        var shearCorrectedXOffset = Writer.XOffsetFactor[options.xAlign] *
            shearCorrectedPrimaryDimension * Math.sin(shearRadians);
        var shearCorrectedYOffset = Writer.YOffsetFactor[options.yAlign] *
            (shearCorrectedSecondaryDimension - lines.length * lineHeight);
        var shearCorrection = shearCorrectedXOffset - shearCorrectedYOffset;
        // compute transform
        var translate = [0, 0];
        var rotate = options.textRotation + shearDegrees;
        switch (options.textRotation) {
            case 90:
                translate = [width + shearCorrection, 0];
                break;
            case -90:
                translate = [-shearCorrection, height];
                break;
            case 180:
                translate = [width, height + shearCorrection];
                break;
            default:
                translate = [0, -shearCorrection];
                break;
        }
        // create a new pen and write the lines
        var linePen = this._penFactory.createPen(text, { translate: translate, rotate: rotate }, container);
        this.writeLines(lines, linePen, shearCorrectedPrimaryDimension, lineHeight, shearShift, options.xAlign);
        if (linePen.destroy != null) {
            linePen.destroy();
        }
    };
    Writer.prototype.writeLines = function (lines, linePen, width, lineHeight, shearShift, xAlign) {
        lines.forEach(function (line, i) {
            var shearOffset = (shearShift > 0) ? (i + 1) * shearShift : (i) * shearShift;
            var xOffset = shearOffset + width * Writer.XOffsetFactor[xAlign];
            var anchor = Writer.AnchorConverter[xAlign];
            linePen.write(line, anchor, xOffset, (i + 1) * lineHeight);
        });
    };
    return Writer;
}());
Writer.SupportedRotation = [-90, 0, 180, 90];
Writer.AnchorConverter = {
    center: "middle",
    left: "start",
    right: "end",
};
Writer.XOffsetFactor = {
    center: 0.5,
    left: 0,
    right: 1,
};
Writer.YOffsetFactor = {
    bottom: 1,
    center: 0.5,
    top: 0,
};
exports.Writer = Writer;
//# sourceMappingURL=writer.js.map

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// HACKHACK d3-selection-multi doesn't play well with default "d3" package in a
// bundler environment (e.g. webpack) - see https://github.com/d3/d3-selection-multi/issues/11
// we add it manually to the default "d3" bundle
__webpack_require__(52);
var Animators = __webpack_require__(6);
exports.Animators = Animators;
var Axes = __webpack_require__(49);
exports.Axes = Axes;
var Components = __webpack_require__(30);
exports.Components = Components;
var Configs = __webpack_require__(20);
exports.Configs = Configs;
var Formatters = __webpack_require__(8);
exports.Formatters = Formatters;
var RenderController = __webpack_require__(25);
exports.RenderController = RenderController;
var RenderPolicies = __webpack_require__(31);
exports.RenderPolicies = RenderPolicies;
var SymbolFactories = __webpack_require__(26);
exports.SymbolFactories = SymbolFactories;
var Dispatchers = __webpack_require__(12);
exports.Dispatchers = Dispatchers;
var Drawers = __webpack_require__(9);
exports.Drawers = Drawers;
var Interactions = __webpack_require__(13);
exports.Interactions = Interactions;
var Plots = __webpack_require__(16);
exports.Plots = Plots;
var Scales = __webpack_require__(3);
exports.Scales = Scales;
var Utils = __webpack_require__(0);
exports.Utils = Utils;
__export(__webpack_require__(19));
var timeAxis_1 = __webpack_require__(23);
exports.TimeInterval = timeAxis_1.TimeInterval;
__export(__webpack_require__(5));
__export(__webpack_require__(24));
__export(__webpack_require__(50));
var version_1 = __webpack_require__(51);
exports.version = version_1.version;
__export(__webpack_require__(21));
__export(__webpack_require__(7));
__export(__webpack_require__(14));
__export(__webpack_require__(32));
__export(__webpack_require__(15));
__export(__webpack_require__(2));
__export(__webpack_require__(10));
__export(__webpack_require__(17));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */

function makeEnum(values) {
    return values.reduce(function (obj, v) {
        obj[v] = v;
        return obj;
    }, {});
}
exports.makeEnum = makeEnum;


/***/ })
/******/ ]);
});