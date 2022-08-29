/* *
 *
 *  (c) 2009-2021 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import A from '../../Core/Animation/AnimationUtilities.js';
var getDeferredAnimation = A.getDeferredAnimation;
import AnnotationChart from './AnnotationChart.js';
import AnnotationDefaults from './AnnotationDefaults.js';
import Controllable from './Controllables/Controllable.js';
var controllableProto = Controllable.prototype;
import ControllableRect from './Controllables/ControllableRect.js';
import ControllableCircle from './Controllables/ControllableCircle.js';
import ControllableEllipse from './Controllables/ControllableEllipse.js';
import ControllablePath from './Controllables/ControllablePath.js';
import ControllableImage from './Controllables/ControllableImage.js';
import ControllableLabel from './Controllables/ControllableLabel.js';
import ControlPoint from './ControlPoint.js';
import EventEmitter from './EventEmitter.js';
import MockPoint from './MockPoint.js';
import NavigationBindings from './NavigationBindings.js';
import PopupComposition from './Popup/PopupComposition.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, destroyObjectProperties = U.destroyObjectProperties, erase = U.erase, extend = U.extend, find = U.find, fireEvent = U.fireEvent, merge = U.merge, pick = U.pick, splat = U.splat, wrap = U.wrap;
/* *
 *
 *  Functions
 *
 * */
/**
 * Hide or show annotaiton attached to points.
 * @private
 */
function adjustVisibility(item) {
    var label = item.graphic, hasVisiblePoints = item.points.some(function (point) { return (point.series.visible !== false &&
        point.visible !== false); });
    if (label) {
        if (!hasVisiblePoints) {
            label.hide();
        }
        else if (label.visibility === 'hidden') {
            label.show();
        }
    }
}
/**
 * @private
 */
function getLabelsAndShapesOptions(baseOptions, newOptions) {
    var mergedOptions = {};
    ['labels', 'shapes'].forEach(function (name) {
        var someBaseOptions = baseOptions[name];
        if (someBaseOptions) {
            if (newOptions[name]) {
                mergedOptions[name] = splat(newOptions[name]).map(function (basicOptions, i) {
                    return merge(someBaseOptions[i], basicOptions);
                });
            }
            else {
                mergedOptions[name] = baseOptions[name];
            }
        }
    });
    return mergedOptions;
}
/* *
 *
 *  Class
 *
 * */
/**
 * An annotation class which serves as a container for items like labels or
 * shapes. Created items are positioned on the chart either by linking them to
 * existing points or created mock points
 *
 * @class
 * @name Highcharts.Annotation
 *
 * @param {Highcharts.Chart} chart
 *        A chart instance
 * @param {Highcharts.AnnotationsOptions} userOptions
 *        The annotation options
 */
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    /* *
     *
     *  Constructors
     *
     * */
    function Annotation(chart, userOptions) {
        var _this = _super.call(this) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.annotation = void 0;
        _this.coll = 'annotations';
        _this.collection = void 0;
        _this.animationConfig = void 0;
        _this.graphic = void 0;
        _this.group = void 0;
        _this.labelCollector = void 0;
        _this.labelsGroup = void 0;
        _this.shapesGroup = void 0;
        /**
         * The chart that the annotation belongs to.
         *
         * @name Highcharts.Annotation#chart
         * @type {Highcharts.Chart}
         */
        _this.chart = chart;
        /**
         * The array of points which defines the annotation.
         * @private
         * @name Highcharts.Annotation#points
         * @type {Array<Highcharts.Point>}
         */
        _this.points = [];
        /**
         * The array of control points.
         * @private
         * @name Highcharts.Annotation#controlPoints
         * @type {Array<Annotation.ControlPoint>}
         */
        _this.controlPoints = [];
        _this.coll = 'annotations';
        /**
         * The array of labels which belong to the annotation.
         * @private
         * @name Highcharts.Annotation#labels
         * @type {Array<Highcharts.AnnotationLabelType>}
         */
        _this.labels = [];
        /**
         * The array of shapes which belong to the annotation.
         * @private
         * @name Highcharts.Annotation#shapes
         * @type {Array<Highcharts.AnnotationShapeType>}
         */
        _this.shapes = [];
        /**
         * The options for the annotations.
         *
         * @name Highcharts.Annotation#options
         * @type {Highcharts.AnnotationsOptions}
         */
        _this.options = merge(_this.defaultOptions, userOptions);
        /**
         * The user options for the annotations.
         *
         * @name Highcharts.Annotation#userOptions
         * @type {Highcharts.AnnotationsOptions}
         */
        _this.userOptions = userOptions;
        // Handle labels and shapes - those are arrays
        // Merging does not work with arrays (stores reference)
        var labelsAndShapes = getLabelsAndShapesOptions(_this.options, userOptions);
        _this.options.labels = labelsAndShapes.labels;
        _this.options.shapes = labelsAndShapes.shapes;
        /**
         * The callback that reports to the overlapping-labels module which
         * labels it should account for.
         * @private
         * @name Highcharts.Annotation#labelCollector
         * @type {Function}
         */
        /**
         * The group svg element.
         *
         * @name Highcharts.Annotation#group
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's shapes.
         *
         * @name Highcharts.Annotation#shapesGroup
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's labels.
         *
         * @name Highcharts.Annotation#labelsGroup
         * @type {Highcharts.SVGElement}
         */
        _this.init(chart, _this.options);
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    Annotation.compose = function (ChartClass, PointerClass, SVGRendererClass) {
        AnnotationChart.compose(Annotation, ChartClass, PointerClass);
        ControllableLabel.compose(SVGRendererClass);
        ControllablePath.compose(ChartClass, SVGRendererClass);
        NavigationBindings.compose(Annotation, ChartClass);
        PopupComposition.compose(NavigationBindings, PointerClass);
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    Annotation.prototype.addClipPaths = function () {
        this.setClipAxes();
        if (this.clipXAxis &&
            this.clipYAxis &&
            this.options.crop // #15399
        ) {
            this.clipRect = this.chart.renderer.clipRect(this.getClipBox());
        }
    };
    /**
     * @private
     */
    Annotation.prototype.addLabels = function () {
        var _this = this;
        var labelsOptions = (this.options.labels || []);
        labelsOptions.forEach(function (labelOptions, i) {
            var label = _this.initLabel(labelOptions, i);
            merge(true, labelsOptions[i], label.options);
        });
    };
    /**
     * @private
     */
    Annotation.prototype.addShapes = function () {
        var _this = this;
        var shapes = this.options.shapes || [];
        shapes.forEach(function (shapeOptions, i) {
            var shape = _this.initShape(shapeOptions, i);
            merge(true, shapes[i], shape.options);
        });
    };
    /**
     * Destroy the annotation. This function does not touch the chart
     * that the annotation belongs to (all annotations are kept in
     * the chart.annotations array) - it is recommended to use
     * {@link Highcharts.Chart#removeAnnotation} instead.
     * @private
     */
    Annotation.prototype.destroy = function () {
        var chart = this.chart, destroyItem = function (item) {
            item.destroy();
        };
        this.labels.forEach(destroyItem);
        this.shapes.forEach(destroyItem);
        this.clipXAxis = null;
        this.clipYAxis = null;
        erase(chart.labelCollectors, this.labelCollector);
        _super.prototype.destroy.call(this);
        controllableProto.destroy.call(this);
        destroyObjectProperties(this, chart);
    };
    /**
     * Destroy a single item.
     * @private
     */
    Annotation.prototype.destroyItem = function (item) {
        // erase from shapes or labels array
        erase(this[item.itemType + 's'], item);
        item.destroy();
    };
    /**
     * @private
     */
    Annotation.prototype.getClipBox = function () {
        if (this.clipXAxis && this.clipYAxis) {
            return {
                x: this.clipXAxis.left,
                y: this.clipYAxis.top,
                width: this.clipXAxis.width,
                height: this.clipYAxis.height
            };
        }
    };
    /**
     * Initialize the annotation.
     * @private
     */
    Annotation.prototype.init = function (_annotationOrChart, _userOptions, _index) {
        var chart = this.chart, animOptions = this.options.animation;
        this.linkPoints();
        this.addControlPoints();
        this.addShapes();
        this.addLabels();
        this.setLabelCollector();
        this.animationConfig = getDeferredAnimation(chart, animOptions);
    };
    /**
     * Initialisation of a single label
     * @private
     */
    Annotation.prototype.initLabel = function (labelOptions, index) {
        var options = merge(this.options.labelOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, labelOptions), label = new ControllableLabel(this, options, index);
        label.itemType = 'label';
        this.labels.push(label);
        return label;
    };
    /**
     * Initialisation of a single shape
     * @private
     * @param {Object} shapeOptions
     * a confg object for a single shape
     * @param {number} index
     * annotation may have many shapes, this is the shape's index saved in
     * shapes.index.
     */
    Annotation.prototype.initShape = function (shapeOptions, index) {
        var options = merge(this.options.shapeOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, shapeOptions), shape = new (Annotation.shapesMap[options.type])(this, options, index);
        shape.itemType = 'shape';
        this.shapes.push(shape);
        return shape;
    };
    /**
     * @private
     */
    Annotation.prototype.redraw = function (animation) {
        this.linkPoints();
        if (!this.graphic) {
            this.render();
        }
        if (this.clipRect) {
            this.clipRect.animate(this.getClipBox());
        }
        this.redrawItems(this.shapes, animation);
        this.redrawItems(this.labels, animation);
        controllableProto.redraw.call(this, animation);
    };
    /**
     * Redraw a single item.
     * @private
     */
    Annotation.prototype.redrawItem = function (item, animation) {
        item.linkPoints();
        if (!item.shouldBeDrawn()) {
            this.destroyItem(item);
        }
        else {
            if (!item.graphic) {
                this.renderItem(item);
            }
            item.redraw(pick(animation, true) && item.graphic.placed);
            if (item.points.length) {
                adjustVisibility(item);
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.redrawItems = function (items, animation) {
        var i = items.length;
        // needs a backward loop
        // labels/shapes array might be modified
        // due to destruction of the item
        while (i--) {
            this.redrawItem(items[i], animation);
        }
    };
    /**
     * See {@link Highcharts.Chart#removeAnnotation}.
     * @private
     */
    Annotation.prototype.remove = function () {
        // Let chart.update() remove annoations on demand
        return this.chart.removeAnnotation(this);
    };
    /**
     * @private
     */
    Annotation.prototype.render = function () {
        var renderer = this.chart.renderer;
        this.graphic = renderer
            .g('annotation')
            .attr({
            opacity: 0,
            zIndex: this.options.zIndex,
            visibility: this.options.visible ?
                'inherit' :
                'hidden'
        })
            .add();
        this.shapesGroup = renderer
            .g('annotation-shapes')
            .add(this.graphic);
        if (this.options.crop) { // #15399
            this.shapesGroup.clip(this.chart.plotBoxClip);
        }
        this.labelsGroup = renderer
            .g('annotation-labels')
            .attr({
            // hideOverlappingLabels requires translation
            translateX: 0,
            translateY: 0
        })
            .add(this.graphic);
        this.addClipPaths();
        if (this.clipRect) {
            this.graphic.clip(this.clipRect);
        }
        // Render shapes and labels before adding events (#13070).
        this.renderItems(this.shapes);
        this.renderItems(this.labels);
        this.addEvents();
        controllableProto.render.call(this);
    };
    /**
     * @private
     */
    Annotation.prototype.renderItem = function (item) {
        item.render(item.itemType === 'label' ?
            this.labelsGroup :
            this.shapesGroup);
    };
    /**
     * @private
     */
    Annotation.prototype.renderItems = function (items) {
        var i = items.length;
        while (i--) {
            this.renderItem(items[i]);
        }
    };
    /**
     * @private
     */
    Annotation.prototype.setClipAxes = function () {
        var xAxes = this.chart.xAxis, yAxes = this.chart.yAxis, linkedAxes = (this.options.labels || [])
            .concat(this.options.shapes || [])
            .reduce(function (axes, labelOrShape) {
            var point = labelOrShape &&
                (labelOrShape.point ||
                    (labelOrShape.points && labelOrShape.points[0]));
            return [
                xAxes[point && point.xAxis] || axes[0],
                yAxes[point && point.yAxis] || axes[1]
            ];
        }, []);
        this.clipXAxis = linkedAxes[0];
        this.clipYAxis = linkedAxes[1];
    };
    /**
     * @private
     */
    Annotation.prototype.setControlPointsVisibility = function (visible) {
        var setItemControlPointsVisibility = function (item) {
            item.setControlPointsVisibility(visible);
        };
        controllableProto.setControlPointsVisibility.call(this, visible);
        this.shapes.forEach(setItemControlPointsVisibility);
        this.labels.forEach(setItemControlPointsVisibility);
    };
    /**
     * @private
     */
    Annotation.prototype.setLabelCollector = function () {
        var annotation = this;
        annotation.labelCollector = function () {
            return annotation.labels.reduce(function (labels, label) {
                if (!label.options.allowOverlap) {
                    labels.push(label.graphic);
                }
                return labels;
            }, []);
        };
        annotation.chart.labelCollectors.push(annotation.labelCollector);
    };
    /**
     * Set an annotation options.
     * @private
     * @param {Highcharts.AnnotationsOptions} userOptions
     *        User options for an annotation
     */
    Annotation.prototype.setOptions = function (userOptions) {
        this.options = merge(this.defaultOptions, userOptions);
    };
    /**
     * Set the annotation's visibility.
     * @private
     * @param {boolean} [visible]
     * Whether to show or hide an annotation. If the param is omitted, the
     * annotation's visibility is toggled.
     */
    Annotation.prototype.setVisibility = function (visible) {
        var options = this.options, navigation = this.chart.navigationBindings, visibility = pick(visible, !options.visible);
        this.graphic.attr('visibility', visibility ? 'inherit' : 'hidden');
        if (!visibility) {
            this.setControlPointsVisibility(false);
            if (navigation.activeAnnotation === this &&
                navigation.popup &&
                navigation.popup.formType === 'annotation-toolbar') {
                fireEvent(navigation, 'closePopup');
            }
        }
        options.visible = visibility;
    };
    /**
     * Updates an annotation.
     *
     * @function Highcharts.Annotation#update
     *
     * @param {Partial<Highcharts.AnnotationsOptions>} userOptions
     *        New user options for the annotation.
     *
     */
    Annotation.prototype.update = function (userOptions, redraw) {
        var chart = this.chart, labelsAndShapes = getLabelsAndShapesOptions(this.userOptions, userOptions), userOptionsIndex = chart.annotations.indexOf(this), options = merge(true, this.userOptions, userOptions);
        options.labels = labelsAndShapes.labels;
        options.shapes = labelsAndShapes.shapes;
        this.destroy();
        this.constructor(chart, options);
        // Update options in chart options, used in exporting (#9767):
        chart.options.annotations[userOptionsIndex] = options;
        this.isUpdating = true;
        if (pick(redraw, true)) {
            chart.redraw();
        }
        fireEvent(this, 'afterUpdate');
        this.isUpdating = false;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * @private
     */
    Annotation.ControlPoint = ControlPoint;
    /**
     * @private
     */
    Annotation.MockPoint = MockPoint;
    /**
     * An object uses for mapping between a shape type and a constructor.
     * To add a new shape type extend this object with type name as a key
     * and a constructor as its value.
     */
    Annotation.shapesMap = {
        'rect': ControllableRect,
        'circle': ControllableCircle,
        'ellipse': ControllableEllipse,
        'path': ControllablePath,
        'image': ControllableImage
    };
    /**
     * @private
     */
    Annotation.types = {};
    return Annotation;
}(EventEmitter));
merge(true, Annotation.prototype, Controllable.prototype, 
// restore original Annotation implementation after mixin overwrite:
merge(Annotation.prototype, {
    /**
     * List of events for `annotation.options.events` that should not be
     * added to `annotation.graphic` but to the `annotation`.
     *
     * @private
     * @type {Array<string>}
     */
    nonDOMEvents: ['add', 'afterUpdate', 'drag', 'remove'],
    defaultOptions: AnnotationDefaults
}));
/* *
 *
 *  Default Export
 *
 * */
export default Annotation;
/* *
 *
 *  API Options
 *
 * */
/**
 * Possible directions for draggable annotations. An empty string (`''`)
 * makes the annotation undraggable.
 *
 * @typedef {''|'x'|'xy'|'y'} Highcharts.AnnotationDraggableValue
 * @requires modules/annotations
 */
/**
 * @private
 * @typedef {
 *          Highcharts.AnnotationControllableCircle|
 *          Highcharts.AnnotationControllableImage|
 *          Highcharts.AnnotationControllablePath|
 *          Highcharts.AnnotationControllableRect
 *     } Highcharts.AnnotationShapeType
 * @requires modules/annotations
 */
/**
 * @private
 * @typedef {
 *          Highcharts.AnnotationControllableLabel
 *     } Highcharts.AnnotationLabelType
 * @requires modules/annotations
 */
/**
 * A point-like object, a mock point or a point used in series.
 * @private
 * @typedef {
 *          Highcharts.AnnotationMockPoint|
 *          Highcharts.Point
 *     } Highcharts.AnnotationPointType
 * @requires modules/annotations
 */
/**
 * Shape point as string, object or function.
 *
 * @typedef {
 *          string|
 *          Highcharts.AnnotationMockPointOptionsObject|
 *          Highcharts.AnnotationMockPointFunction
 *     } Highcharts.AnnotationShapePointOptions
 */
(''); // keeps doclets above in JS file
